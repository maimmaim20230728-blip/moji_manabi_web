'use strict';
/* 画面: なぞる字を えらぶ(一覧)
   ・data/kanji1.js の window.MOJI_KANJI1(80字)を大きなボタンで並べる
   ・タップ → 選んだ字のコードを api.save('cur') に置いて trace 画面へ(画面同士は状態を共有しないので保存経由)
   ・きょう なぞった字には小さな印(点数ではない・今日の分だけ) */
(function(){
  function todayKey(){
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function todayList(api){
    var t = api.load('today', null);
    return (t && t.d === todayKey() && Array.isArray(t.list)) ? t.list : [];
  }
  window.SCREENS.register('list', {
    render: function(c, api){
      c.appendChild(api.el('h1', 'scr-title', api.T('screen.list.title')));
      c.appendChild(api.el('p', 'hint', api.T('screen.list.sub')));
      var data = window.MOJI_KANJI1 || [];
      if(!data.length){ c.appendChild(api.el('p', 'empty', api.T('screen.list.noData'))); return; }
      var done = todayList(api);
      var grid = api.el('div', 'kanji-grid');
      data.forEach(function(k){
        var b = api.el('button', 'kanji-btn' + (done.indexOf(k.char) >= 0 ? ' done' : ''), k.char);
        b.setAttribute('data-code', k.code);
        b.setAttribute('aria-label', k.char);
        api.Tap.bind(b, function(){
          api.save('cur', k.code);
          api.go('trace');
        });
        grid.appendChild(b);
      });
      c.appendChild(grid);
    }
  });
})();
