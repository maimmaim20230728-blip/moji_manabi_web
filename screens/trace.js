'use strict';
/* 画面: なぞる(1字)
   ・list/today 画面が api.save('cur', code) に置いた字を、data/kanji1.js(window.MOJI_KANJI1)から引く
   ・SVG(viewBox 0 0 109 109・KanjiVG座標)に全画を薄い線で描き、いまの画だけ stroke-dasharray のアニメで1画ずつ動かす
   ・その上に canvas を重ねて ゆびで なぞれる(判定はしない。「つぎの画」で進む)
   ・読み上げ = api.speak(訓読みがあれば訓・無ければ音・無ければ字そのもの)
   ・「できた」= moji.today に字を入れるだけ(点数・累計・達成率・失敗音なし) */
(function(){
  var NS = 'http://www.w3.org/2000/svg';

  function todayKey(){
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  /* 疑似DOM(スモーク)には createElementNS が無いので退避 */
  function svgEl(tag){
    return (typeof document.createElementNS === 'function') ? document.createElementNS(NS, tag) : document.createElement(tag);
  }
  function findKanji(code){
    var data = window.MOJI_KANJI1 || [];
    for(var i = 0; i < data.length; i++) if(data[i].code === code) return { k: data[i], i: i };
    return null;
  }
  function readingOf(k){
    if(k.kun) return k.kun.replace(/[()（）]/g, '');
    if(k.on) return k.on;
    return k.char;
  }
  function brandColor(){
    try{
      if(typeof getComputedStyle === 'function'){
        var v = getComputedStyle(document.body).getPropertyValue('--brand');
        if(v && v.trim()) return v.trim();
      }
    }catch(_){}
    return '#2e9e6b';
  }

  window.SCREENS.register('trace', {
    render: function(c, api){
      var T = api.T;
      c.appendChild(api.el('h1', 'scr-title', T('screen.trace.title')));

      var code = api.load('cur', null);
      var found = code ? findKanji(code) : null;
      if(!found){
        c.appendChild(api.el('p', 'empty', T('screen.trace.noSel')));
        var go = api.el('button', 'btn primary wide', T('screen.trace.toList'));
        api.Tap.bind(go, function(){ api.go('list'); });
        c.appendChild(go);
        return;
      }
      var k = found.k, m = k.strokes.length, idx = 0;

      /* ---- 字と読み ---- */
      var head = api.el('div', 'trace-head');
      head.appendChild(api.el('div', 'trace-char', k.char));
      var rd = api.el('div', 'trace-readings');
      rd.appendChild(api.el('div', 'reading', T('screen.trace.on') + '：' + (k.on || T('screen.trace.none'))));
      rd.appendChild(api.el('div', 'reading', T('screen.trace.kun') + '：' + (k.kun || T('screen.trace.none'))));
      var sp = api.el('button', 'btn', '🔊 ' + T('screen.trace.speak'));
      api.Tap.bind(sp, function(){ api.speak(readingOf(k), { lang:'ja', rate:0.9 }); });
      rd.appendChild(sp);
      head.appendChild(rd);
      c.appendChild(head);

      /* ---- 何画めか(進み具合の表示。点数ではない) ---- */
      var lbl = api.el('p', 'trace-stroke');
      c.appendChild(lbl);

      /* ---- 舞台: SVG(お手本) + canvas(なぞり) ---- */
      var stage = api.el('div', 'trace-stage');
      var svg = svgEl('svg');
      svg.setAttribute('viewBox', '0 0 109 109');
      svg.setAttribute('class', 'trace-svg');
      svg.setAttribute('aria-hidden', 'true');
      var paths = [];
      k.strokes.forEach(function(d, i){
        var p = svgEl('path');
        p.setAttribute('d', d);
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke-linecap', 'round');
        p.setAttribute('stroke-linejoin', 'round');
        p.setAttribute('class', 'st-todo');
        svg.appendChild(p);
        paths.push(p);
      });
      var dot = svgEl('circle');   // いまの画の書き出し位置
      dot.setAttribute('r', '3.2');
      dot.setAttribute('class', 'st-dot');
      svg.appendChild(dot);
      stage.appendChild(svg);

      var cv = api.el('canvas', 'trace-canvas');
      cv.style.touchAction = 'none';
      stage.appendChild(cv);
      c.appendChild(stage);
      c.appendChild(api.el('p', 'hint', T('screen.trace.how')));

      /* ---- canvas(ゆびの線) ---- */
      var ctx = null, drawing = null, cvSize = 0;
      function fit(){
        var r = stage.getBoundingClientRect ? stage.getBoundingClientRect() : { width:300 };
        var w = Math.max(1, Math.round(r.width || 300));
        var dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
        if(w === cvSize) return;
        cvSize = w;
        cv.width = Math.round(w * dpr); cv.height = Math.round(w * dpr);
        ctx = cv.getContext('2d');
        if(ctx && ctx.setTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if(ctx){ ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(6, w * 0.07); ctx.strokeStyle = brandColor(); }
      }
      function pos(e){
        var r = cv.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      }
      function clearCanvas(){
        if(!ctx) return;
        ctx.clearRect(0, 0, cvSize, cvSize);
      }
      cv.addEventListener('pointerdown', function(e){
        if(!e.isPrimary) return;
        fit();
        if(!ctx) return;
        if(e.preventDefault) e.preventDefault();
        drawing = e.pointerId;
        var p = pos(e);
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 0.1, p.y + 0.1); ctx.stroke();
      });
      cv.addEventListener('pointermove', function(e){
        if(drawing === null || e.pointerId !== drawing || !ctx) return;
        if(e.preventDefault) e.preventDefault();
        var p = pos(e);
        ctx.lineTo(p.x, p.y); ctx.stroke();
      });
      function endDraw(e){ if(drawing !== null && (!e || e.pointerId === drawing)) drawing = null; }
      cv.addEventListener('pointerup', endDraw);
      cv.addEventListener('pointercancel', endDraw);
      cv.addEventListener('pointerleave', endDraw);

      /* ---- お手本の表示と1画アニメ ---- */
      function animateCurrent(){
        var p = paths[idx];
        if(!p) return;
        try{
          if(typeof p.getTotalLength !== 'function') return;
          var L = p.getTotalLength();
          p.style.transition = 'none';
          p.style.strokeDasharray = String(L);
          p.style.strokeDashoffset = String(L);
          if(typeof p.getPointAtLength === 'function'){
            var pt = p.getPointAtLength(0);
            dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y));
            dot.style.display = '';
          }
          p.getBoundingClientRect();   // 反映を確定させてから動かす
          requestAnimationFrame(function(){
            p.style.transition = 'stroke-dashoffset 1.3s ease-out';
            p.style.strokeDashoffset = '0';
          });
        }catch(_){}
      }
      function paint(){
        paths.forEach(function(p, i){
          p.setAttribute('class', i < idx ? 'st-done' : (i === idx ? 'st-cur' : 'st-todo'));
          if(i !== idx){ p.style.transition = 'none'; p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; }
        });
        lbl.textContent = T('screen.trace.stroke').replace('{n}', String(idx + 1)).replace('{m}', String(m)) + (idx === m - 1 ? ' ' + T('screen.trace.last') : '');
        prevB.disabled = (idx === 0);
        nextB.disabled = (idx >= m - 1);
        nextB.classList.toggle('hidden', idx >= m - 1);
        doneB.classList.toggle('hidden', idx < m - 1);
        animateCurrent();
      }

      /* ---- 操作 ---- */
      var row1 = api.el('div', 'btn-row');
      var prevB = api.el('button', 'btn', '◀ ' + T('screen.trace.prev'));
      var nextB = api.el('button', 'btn primary', T('screen.trace.next') + ' ▶');
      var doneB = api.el('button', 'btn primary', '✓ ' + T('screen.trace.done'));
      api.Tap.bind(prevB, function(){ if(idx > 0){ idx--; paint(); } });
      api.Tap.bind(nextB, function(){ if(idx < m - 1){ idx++; paint(); } });
      row1.appendChild(prevB); row1.appendChild(nextB); row1.appendChild(doneB);
      c.appendChild(row1);

      var row2 = api.el('div', 'btn-row');
      var replayB = api.el('button', 'btn', T('screen.trace.replay'));
      var clearB = api.el('button', 'btn', T('screen.trace.clear'));
      api.Tap.bind(replayB, animateCurrent);
      api.Tap.bind(clearB, clearCanvas);
      row2.appendChild(replayB); row2.appendChild(clearB);
      c.appendChild(row2);

      /* できた → きょうの字に入れる(重複は入れない)。そのあと「つぎの字へ / いちらんへ」を出す */
      var after = api.el('div', 'btn-row hidden');
      var nextCharB = api.el('button', 'btn primary', T('screen.trace.nextChar') + ' ▶');
      var toListB = api.el('button', 'btn', T('screen.trace.toList'));
      api.Tap.bind(nextCharB, function(){
        var data = window.MOJI_KANJI1 || [];
        var n = data[(found.i + 1) % data.length];
        if(n){ api.save('cur', n.code); api.go('trace'); }
      });
      api.Tap.bind(toListB, function(){ api.go('list'); });
      after.appendChild(nextCharB); after.appendChild(toListB);
      c.appendChild(after);

      api.Tap.bind(doneB, function(){
        var t = api.load('today', null);
        if(!t || t.d !== todayKey() || !Array.isArray(t.list)) t = { d: todayKey(), list: [] };
        if(t.list.indexOf(k.char) < 0) t.list.push(k.char);
        if(!api.save('today', t)){ api.toast(T('common.storageFull')); return; }
        api.toast(T('screen.trace.doneToast'));
        after.classList.remove('hidden');
        try{ after.scrollIntoView({ block:'nearest' }); }catch(_){}
      });

      /* 初回描画(レイアウト確定後に canvas を実寸に) */
      paint();
      if(typeof requestAnimationFrame === 'function') requestAnimationFrame(fit); else fit();
    }
  });
})();
