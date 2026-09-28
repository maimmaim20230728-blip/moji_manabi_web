'use strict';
/* KanjiVG(https://github.com/KanjiVG/kanjivg ・CC BY-SA 3.0)から、小学校で最初に習う漢字80字のSVGを取得し、
   data/kanjivg/<code>.svg に保存したうえで、data/kanji1.js({char, code, on, kun, strokes:[path d…]})にまとめる。
   使い方: node data/_fetch_kanjivg.js   (既に取得済みのSVGは再取得しない)
   🔴 データの出典表示「KanjiVG (CC BY-SA 3.0)」は index.html(せってい)と README にある。消さない */
const fs = require('fs'), path = require('path'), https = require('https');

const OUT_DIR = path.join(__dirname, 'kanjivg');
const OUT_JS = path.join(__dirname, 'kanji1.js');
const BASE = 'https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/';

/* 字・音読み・訓読み(代表1つずつ。訓の送りがなは( )で示す。無いものは '') */
const LIST = [
  ['一','イチ','ひと(つ)'], ['右','ウ','みぎ'], ['雨','ウ','あめ'], ['円','エン','まる(い)'], ['王','オウ',''],
  ['音','オン','おと'], ['下','カ','した'], ['火','カ','ひ'], ['花','カ','はな'], ['貝','','かい'],
  ['学','ガク','まな(ぶ)'], ['気','キ',''], ['九','キュウ','ここの(つ)'], ['休','キュウ','やす(む)'], ['玉','ギョク','たま'],
  ['金','キン','かね'], ['空','クウ','そら'], ['月','ゲツ','つき'], ['犬','ケン','いぬ'], ['見','ケン','み(る)'],
  ['五','ゴ','いつ(つ)'], ['口','コウ','くち'], ['校','コウ',''], ['左','サ','ひだり'], ['三','サン','み(っつ)'],
  ['山','サン','やま'], ['子','シ','こ'], ['四','シ','よ(っつ)'], ['糸','シ','いと'], ['字','ジ','あざ'],
  ['耳','ジ','みみ'], ['七','シチ','なな(つ)'], ['車','シャ','くるま'], ['手','シュ','て'], ['十','ジュウ','とお'],
  ['出','シュツ','で(る)'], ['女','ジョ','おんな'], ['小','ショウ','ちい(さい)'], ['上','ジョウ','うえ'], ['森','シン','もり'],
  ['人','ジン','ひと'], ['水','スイ','みず'], ['正','セイ','ただ(しい)'], ['生','セイ','い(きる)'], ['青','セイ','あお'],
  ['夕','セキ','ゆう'], ['石','セキ','いし'], ['赤','セキ','あか'], ['千','セン','ち'], ['川','セン','かわ'],
  ['先','セン','さき'], ['早','ソウ','はや(い)'], ['草','ソウ','くさ'], ['足','ソク','あし'], ['村','ソン','むら'],
  ['大','ダイ','おお(きい)'], ['男','ダン','おとこ'], ['竹','チク','たけ'], ['中','チュウ','なか'], ['虫','チュウ','むし'],
  ['町','チョウ','まち'], ['天','テン',''], ['田','デン','た'], ['土','ド','つち'], ['二','ニ','ふた(つ)'],
  ['日','ニチ','ひ'], ['入','ニュウ','はい(る)'], ['年','ネン','とし'], ['白','ハク','しろ'], ['八','ハチ','や(っつ)'],
  ['百','ヒャク',''], ['文','ブン','ふみ'], ['木','モク','き'], ['本','ホン','もと'], ['名','メイ','な'],
  ['目','モク','め'], ['立','リツ','た(つ)'], ['力','リョク','ちから'], ['林','リン','はやし'], ['六','ロク','む(っつ)']
];

function codeOf(ch){ return ch.codePointAt(0).toString(16).padStart(5, '0'); }

function fetchText(url){
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return fetchText(res.headers.location).then(resolve, reject);
      if(res.statusCode !== 200){ res.resume(); return reject(new Error('HTTP ' + res.statusCode + ' ' + url)); }
      let s = ''; res.setEncoding('utf8'); res.on('data', d => { s += d; }); res.on('end', () => resolve(s));
    }).on('error', reject);
  });
}

/* SVG から <path … d="…"> を書き順(id の -sN)で抜く */
function strokesOf(svg){
  const out = [];
  for(const m of svg.matchAll(/<path\b([^>]*)\/?>/g)){
    const attrs = m[1];
    const d = (attrs.match(/\sd="([^"]+)"/) || [])[1];
    if(!d) continue;
    const n = Number((attrs.match(/-s(\d+)"/) || [,'0'])[1]);
    out.push({ n, d: d.replace(/\s+/g, ' ').trim() });
  }
  out.sort((a, b) => a.n - b.n);
  return out.map(x => x.d);
}

(async function main(){
  if(!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive:true });
  const data = [];
  let got = 0, fail = 0;
  for(const [ch, on, kun] of LIST){
    const code = codeOf(ch);
    const file = path.join(OUT_DIR, code + '.svg');
    let svg = null;
    if(fs.existsSync(file)) svg = fs.readFileSync(file, 'utf8');
    else {
      try{ svg = await fetchText(BASE + code + '.svg'); fs.writeFileSync(file, svg, 'utf8'); got++; }
      catch(e){ fail++; console.error('取得できず: ' + ch + ' ' + code + ' ' + e.message); continue; }
    }
    const strokes = strokesOf(svg);
    if(!strokes.length){ fail++; console.error('path が見つからない: ' + ch); continue; }
    data.push({ char: ch, code, on, kun, strokes });
  }
  const js = "'use strict';\n" +
    "/* 小学校で最初に習う漢字80字の書き順データ(自動生成: node data/_fetch_kanjivg.js)\n" +
    "   出典: KanjiVG https://github.com/KanjiVG/kanjivg (Ulrich Apel・CC BY-SA 3.0)。座標系は viewBox 0 0 109 109\n" +
    "   各要素 = { char, code(Unicode 16進5桁), on(音読み), kun(訓読み。送りがなは( )), strokes:[path d 文字列 … 書き順] } */\n" +
    'window.MOJI_KANJI1 = ' + JSON.stringify(data, null, 0).replace(/\},\{/g, '},\n{') + ';\n';
  fs.writeFileSync(OUT_JS, js, 'utf8');
  console.log('取得 ' + got + ' / 失敗 ' + fail + ' / 収録 ' + data.length + ' 字 → ' + OUT_JS);
})();
