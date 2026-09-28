'use strict';
/* 画面: ホーム
   ・大ボタン2つ(なぞる字を えらぶ → list / きょう やった字 → today)。判定も点数も無いことをここで言う
   ・文言は api.T('screen.home.*')。操作は api.Tap.bind(click禁止) */
(function(){
  function bigBtn(api, ico, label, cls){
    var b = api.el('button', 'big-btn' + (cls ? ' ' + cls : ''));
    b.appendChild(api.el('span', 'ico', ico));
    b.appendChild(api.el('span', 'lbl', label));
    return b;
  }
  window.SCREENS.register('home', {
    render: function(c, api){
      c.appendChild(api.el('h1', 'scr-title', api.T('screen.home.title')));
      c.appendChild(api.el('p', 'tagline', api.T('app.tagline')));
      c.appendChild(api.el('p', 'note', api.T('screen.home.lead')));

      var b1 = bigBtn(api, '✍', api.T('screen.home.btnList'), 'primary');
      api.Tap.bind(b1, function(){ api.go('list'); });
      c.appendChild(b1);

      var b2 = bigBtn(api, '☀', api.T('screen.home.btnToday'));
      api.Tap.bind(b2, function(){ api.go('today'); });
      c.appendChild(b2);

      c.appendChild(api.el('p', 'hint', api.T('screen.home.hint')));
      c.appendChild(api.el('p', 'hint', api.T('screen.home.source')));
    }
  });
})();
