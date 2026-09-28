'use strict';
/* 画面: きょう やった字
   ・見せるのは今日の分だけ(点数・累計・達成率・比べる表示は出さない)。日付が変わると空になる
   ・保存キー moji.today = { d:'YYYY-MM-DD', list:['山', …] }(trace 画面の「できた」が書く)
   ・字をタップすると、その字を もういちど なぞれる */
(function(){
  function todayKey(){
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function codeOf(ch){
    var data = window.MOJI_KANJI || [];
    for(var i = 0; i < data.length; i++) if(data[i].char === ch) return data[i].code;
    return null;
  }
  window.SCREENS.register('today', {
    render: function(c, api){
      c.appendChild(api.el('h1', 'scr-title', api.T('screen.today.title')));
      var t = api.load('today', null);
      var list = (t && t.d === todayKey() && Array.isArray(t.list)) ? t.list : [];
      /* よみこんだバックアップが変でも、書き順データにある字(文字列)だけを1回ずつ出す */
      list = list.filter(function(ch, i){ return typeof ch === 'string' && codeOf(ch) !== null && list.indexOf(ch) === i; });
      c.appendChild(api.el('p', 'hint', api.T('screen.today.hint')));
      if(!list.length){
        c.appendChild(api.el('p', 'empty', api.T('screen.today.empty')));
        var go = api.el('button', 'btn primary wide', api.T('screen.today.go'));
        api.Tap.bind(go, function(){ api.go('list'); });
        c.appendChild(go);
        return;
      }
      var grid = api.el('div', 'kanji-grid');
      list.forEach(function(ch){
        var b = api.el('button', 'kanji-btn done', ch);
        var code = codeOf(ch);
        api.Tap.bind(b, function(){
          if(!code) return;
          api.save('cur', code);
          api.go('trace');
        });
        grid.appendChild(b);
      });
      c.appendChild(grid);
      c.appendChild(api.el('p', 'hint', api.T('screen.today.tapHint')));
    }
  });
})();
