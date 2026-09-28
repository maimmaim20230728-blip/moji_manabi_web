'use strict';
/* 画面: なぞる字を えらぶ(一覧)
   ・data/kanji.js の window.MOJI_KANJI(小学校で習う1026字・grade 1〜6)を、年ごとのタブ(1〜6)で切りかえて大きなボタンで並べる。
     並びは配当表のまま。タブを切りかえたときは字の並び(グリッド)だけを作り直す(1つの年で最大202字)
   ・最後に開いたタブは api.save('grade', n) = 保存キー moji.grade(1〜6 の整数)に覚える。
     バックアップ(かきだす/よみこむ)はシェルが moji. のキーを丸ごと扱うので、形は変えない。読むときに 1〜6 の整数でなければ 1 にする
   ・タブの列の数は、名前が入りきる数(6 → 3 → 2 → 1)を実寸で選ぶ(言語・もじの大きさ・画面の幅で変わる)
   ・字で さがす: 字を1つ入れる(貼り付けも可・先頭の1字を使う)と、その字の なぞる画面を開く。入っていない字なら、その旨を欄の下に短く出す
   ・タップ → 選んだ字のコードを api.save('cur') に置いて trace 画面へ(画面同士は状態を共有しないので保存経由)
   ・きょう なぞった字には小さな印(点数ではない・今日の分だけ)。進み具合の数(◯/202 など)は出さない */
(function(){
  var GRADES = [1, 2, 3, 4, 5, 6];
  function todayKey(){
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function todayList(api){
    var t = api.load('today', null);
    var list = (t && t.d === todayKey() && Array.isArray(t.list)) ? t.list : [];
    /* よみこんだバックアップが変でも、書き順データにある字(文字列)だけを使う */
    var chars = (window.MOJI_KANJI || []).map(function(k){ return k.char; });
    return list.filter(function(ch){ return typeof ch === 'string' && chars.indexOf(ch) >= 0; });
  }
  /* 覚えたタブ: 1〜6 の整数だけを認める(よみこんだファイルが変でも 1 に戻す) */
  function savedGrade(api){
    var g = api.load('grade', 1);
    return (typeof g === 'number' && GRADES.indexOf(g) >= 0) ? g : 1;
  }
  /* 字で さがす: 前後の空白を除き、先頭の1字(サロゲートペアも1字)。互換漢字・全角などは NFKC でそろえる */
  function firstChar(v){
    var s = String(v == null ? '' : v).trim();
    try{ if(s.normalize) s = s.normalize('NFKC'); }catch(_){}
    return Array.from(s)[0] || '';
  }
  function findByChar(ch){
    var data = window.MOJI_KANJI || [];
    for(var i = 0; i < data.length; i++) if(data[i].char === ch) return data[i];
    return null;
  }
  /* タブの名前が入りきる列の数を実寸で選ぶ(はみ出す・44px 未満なら列を減らす) */
  function fitTabs(row){
    if(!row || !row.style || typeof row.querySelectorAll !== 'function') return;
    var tabs = row.querySelectorAll('.grade-tab'), cols = [6, 3, 2, 1];
    for(var i = 0; i < cols.length; i++){
      row.style.gridTemplateColumns = 'repeat(' + cols[i] + ', minmax(0, 1fr))';
      var over = false;
      for(var j = 0; j < tabs.length; j++){
        var b = tabs[j];
        if(b.scrollWidth > b.clientWidth + 1 || (b.clientWidth > 0 && b.clientWidth < 44)){ over = true; break; }
      }
      if(!over) return;
    }
  }
  if(typeof window !== 'undefined' && window.addEventListener){
    window.addEventListener('resize', function(){
      try{ fitTabs(document.querySelector('#scr-list .grade-tabs')); }catch(_){}
    });
  }

  window.SCREENS.register('list', {
    render: function(c, api){
      var T = api.T;
      c.appendChild(api.el('h1', 'scr-title', T('screen.list.title')));
      c.appendChild(api.el('p', 'hint', T('screen.list.sub')));
      var all = window.MOJI_KANJI || [];
      if(!all.length){ c.appendChild(api.el('p', 'empty', T('screen.list.noData'))); return; }

      function openKanji(k){
        api.save('cur', k.code);
        api.go('trace');
      }

      /* ---- 字で さがす ---- */
      var find = api.el('div', 'kanji-find');
      var lab = api.el('label', 'find-label', T('screen.list.findLabel'));
      lab.setAttribute('for', 'kanji-find-in');
      find.appendChild(lab);
      var frow = api.el('div', 'find-row');
      var inp = api.el('input', 'find-in');
      inp.setAttribute('id', 'kanji-find-in');
      inp.setAttribute('type', 'text');
      inp.setAttribute('lang', 'ja');
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('autocapitalize', 'off');
      inp.setAttribute('spellcheck', 'false');
      inp.setAttribute('enterkeyhint', 'go');
      inp.setAttribute('aria-describedby', 'kanji-find-msg');
      var goB = api.el('button', 'btn find-go', T('screen.list.findGo'));
      frow.appendChild(inp); frow.appendChild(goB);
      find.appendChild(frow);
      var msg = api.el('p', 'find-msg');
      msg.setAttribute('id', 'kanji-find-msg');
      msg.setAttribute('role', 'status');
      msg.setAttribute('aria-live', 'polite');
      find.appendChild(msg);
      c.appendChild(find);

      function search(){
        var ch = firstChar(inp.value);
        if(!ch){ msg.textContent = T('screen.list.findEmpty'); return; }
        var k = findByChar(ch);
        if(!k){ msg.textContent = T('screen.list.findNone').replace('{c}', ch); return; }
        msg.textContent = '';
        openKanji(k);
      }
      api.Tap.bind(goB, search);
      /* Enter でも開く。日本語の変換を決める Enter(isComposing / keyCode 229)では開かない */
      inp.addEventListener('keydown', function(e){
        if(!e || e.key !== 'Enter' || e.isComposing || e.keyCode === 229) return;
        if(e.preventDefault) e.preventDefault();
        search();
      });

      /* ---- 年のタブ(1〜6) ---- */
      var cur = savedGrade(api);
      var names = T('screen.list.grades');
      var row = api.el('div', 'grade-tabs');
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', T('screen.list.gradesLabel'));
      var tabBtns = [];
      GRADES.forEach(function(g, i){
        var b = api.el('button', 'grade-tab', (Array.isArray(names) && names[i]) ? names[i] : String(g));
        b.setAttribute('data-grade', String(g));
        api.Tap.bind(b, function(){
          if(g === cur) return;
          cur = g;
          api.save('grade', g);
          paintTabs();
          fillGrid();
        });
        tabBtns.push(b);
        row.appendChild(b);
      });
      c.appendChild(row);

      var grid = api.el('div', 'kanji-grid');
      c.appendChild(grid);

      function paintTabs(){
        tabBtns.forEach(function(b, i){
          var on = (GRADES[i] === cur);
          b.classList.toggle('on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      }
      function fillGrid(){
        grid.textContent = '';
        var done = todayList(api);
        var frag = (typeof document.createDocumentFragment === 'function') ? document.createDocumentFragment() : grid;
        all.forEach(function(k){
          if(k.grade !== cur) return;
          var b = api.el('button', 'kanji-btn' + (done.indexOf(k.char) >= 0 ? ' done' : ''), k.char);
          b.setAttribute('data-code', k.code);
          b.setAttribute('aria-label', k.char);
          api.Tap.bind(b, function(){ openKanji(k); });
          frag.appendChild(b);
        });
        if(frag !== grid) grid.appendChild(frag);
      }
      paintTabs();
      fillGrid();
      fitTabs(row);
    }
  });
})();
