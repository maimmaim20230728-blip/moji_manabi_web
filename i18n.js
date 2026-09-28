/* 書き順のおさらい・そよぎ 多言語テーブル(そよぎアプリ・キット v1・12言語)
   ・window.MOJI_I18N = { ja, en, de, fr, es, it, pt, nl, sv, ko, zh, ar }
   ・キー構造は全言語で完全一致(_check.js が ja を正として構造・配列要素数を機械照合)
   ・🔴 BUILDER: 文言は ja と en の両方に同じキーで足す。画面固有は screen.<画面id>.* に置く。
     de〜ar の10言語は、翻訳Workflowで差し替えるまで en を自動で流用する(末尾の仮置き)
   ・{n} などのプレースホルダは app.js/screens が実値に差し替える(訳文でも記号のまま残す)
   ・set.lang は言語切替ラベルなので全言語 'ことば / Language' 固定
   ・ar は RTL。app.js が document.dir='rtl' にする
   ・ひらがな: 本人が読む操作文言はひらがな主体。相手に見せる文(みせる画面等)は漢字で曖昧さを消す */
(function(){
'use strict';

/* ============ ja(正) ============ */
var ja = {
  app: { name:'書き順のおさらい・そよぎ', short:'書き順のおさらい', tagline:'×を出さない、今日の分だけの学び直し。' },
  nav: { home:'ホーム', list:'なぞる', today:'きょう', set:'せってい' },
  common: {
    ok:'OK', cancel:'やめる', save:'ほぞんする', del:'けす', back:'もどる', close:'とじる',
    yes:'はい', no:'いいえ', add:'ついか', edit:'なおす', next:'つぎ', prev:'まえ', done:'できた',
    saved:'ほぞんしました ✓', saveFail:'ほぞんできませんでした', storageFull:'いっぱいで ほぞんできません',
    deleted:'けしました', delConfirm:'ほんとうに けしますか?', empty:'まだ なにも ありません',
    optional:'ぜんぶ 書かなくても だいじょうぶです。', today:'きょう',
    photo: {
      camera:'カメラで とる', roll:'しゃしんから えらぶ',
      cropTitle:'しゃしんを 切りとる', cropHint:'ゆびで うごかすか、やじるしで あわせて、スライダーで 大きさを かえます。',
      zoom:'大きさ', panUp:'うえへ', panDown:'したへ', panLeft:'ひだりへ', panRight:'みぎへ',
      make:'これで きめる', fail:'しゃしんを よみこめませんでした'
    }
  },
  set: {
    hNormal:'ふだんの せってい',
    hBackup:'きしゅへんこう(バックアップ)',
    fs:'もじの大きさ', fsSizes:['ふつう','大きい','とても大きい'],
    lang:'ことば / Language',
    theme:'いろ', themes:['みどり','みずいろ','しろ','くろ'],
    bgm:'BGM', bgms:['なし','みどりの音','あおの音'],
    sound:'タップ音', on:'ON', off:'OFF',
    bkHint:'あたらしい スマホに うつるときは、「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。',
    bkExport:'かきだす', bkImport:'よみこむ',
    exported:'かきだしました ✓', imported:'よみこみました ✓', importFail:'よみこめませんでした',
    importConfirm:'いまの ないようは、ファイルの ないように おきかわります。よみこみますか?',
    note:'なぞった字の きろくと せっていは、この端末の中だけに ほぞんされます。どこにも 送られません。',
    privacy:'プライバシーポリシー',
    credit:'アプリ開発：介護と支援の相談どころ そよぎ',
    srcLabel:'書き順のデータ:',
    srcShare:'この アプリの 書き順データも、同じ ライセンスです。',
    srcGrade:'入れた字と 年ごとの 分け方: 小学校学習指導要領(平成29年告示)の 漢字の配当表',
    srcReading:'読み(音・訓 1つずつ): 常用漢字表(平成22年内閣告示)を もとに しています。'
  },
  screen: {
    home: {
      title:'書き順のおさらい',
      lead:'小学校で習う漢字1026字を、書き順の とおりに ゆびで なぞります。',
      btnList:'漢字を なぞる',
      btnToday:'きょう やった字',
      hint:'できたか どうかの 判定は しません。点数も 出ません。すきな字を、すきなだけ。',
      source:'書き順のデータ: KanjiVG (CC BY-SA 3.0)'
    },
    list: {
      title:'なぞる字を えらぶ',
      sub:'小学校で習う漢字1026字を、習う年ごとに 分けて 並べています。',
      noData:'書き順のデータが ありません。',
      gradesLabel:'習う年',
      grades:['1年','2年','3年','4年','5年','6年'],
      findLabel:'字を 1つ いれて さがす',
      findGo:'ひらく',
      findEmpty:'字を 1つ いれてください。',
      findNone:'「{c}」は はいっていません。小学校で習う漢字だけです。'
    },
    trace: {
      title:'なぞる',
      on:'音',
      kun:'訓',
      sep:'：',
      none:'なし',
      speak:'よみあげ',
      noVoice:'よみあげが できませんでした',
      stroke:'{n}画め(ぜんぶで {m}画)',
      how:'うすい線が うごいたら、その上を ゆびで なぞります。',
      last:'さいごの画です。',
      prev:'まえの画',
      next:'つぎの画',
      replay:'もういちど みる',
      clear:'なぞりを けす',
      done:'できた',
      doneToast:'きょうの字に いれました ✓',
      nextChar:'つぎの字へ',
      toList:'いちらんへ',
      noSel:'まず 字を えらんでください。'
    },
    today: {
      title:'きょう やった字',
      hint:'ここに 出るのは きょうの分だけです。日が かわると 新しく なります。',
      empty:'きょうは まだ なぞっていません。',
      tapHint:'字を おすと、もういちど なぞれます。',
      go:'なぞりに いく'
    }
  }
};

/* ============ en ============ */
var en = {
  app: { name:'Stroke Order Review - SOYOGI', short:'Stroke Order Review', tagline:'No wrong marks. Relearning, just today\'s share.' },
  nav: { home:'Home', list:'Trace', today:'Today', set:'Settings' },
  common: {
    ok:'OK', cancel:'Cancel', save:'Save', del:'Delete', back:'Back', close:'Close',
    yes:'Yes', no:'No', add:'Add', edit:'Edit', next:'Next', prev:'Previous', done:'Done',
    saved:'Saved ✓', saveFail:'Could not save', storageFull:'Storage is full, could not save',
    deleted:'Deleted', delConfirm:'Really delete this?', empty:'Nothing here yet',
    optional:'You do not have to fill in everything.', today:'Today',
    photo: {
      camera:'Take a photo', roll:'Choose from photos',
      cropTitle:'Crop the photo', cropHint:'Drag with a finger or use the arrows, then change the size with the slider.',
      zoom:'Size', panUp:'Up', panDown:'Down', panLeft:'Left', panRight:'Right',
      make:'Use this', fail:'Could not load the photo'
    }
  },
  set: {
    hNormal:'Everyday settings',
    hBackup:'Changing phones (backup)',
    fs:'Text size', fsSizes:['Normal','Large','Very large'],
    lang:'ことば / Language',
    theme:'Color', themes:['Green','Light blue','White','Black'],
    bgm:'Music', bgms:['None','Green tone','Blue tone'],
    sound:'Tap sound', on:'ON', off:'OFF',
    bkHint:'When you move to a new phone, tap "Export" to save a file, then tap "Import" on the new phone.',
    bkExport:'Export', bkImport:'Import',
    exported:'Exported ✓', imported:'Imported ✓', importFail:'Could not import',
    importConfirm:'Your current entries will be replaced with the file\'s contents. Import it?',
    note:'The kanji you traced and your settings are stored only on this device. Nothing is sent anywhere.',
    privacy:'Privacy policy',
    credit:'Developed by SOYOGI, a care and support consultation service',
    srcLabel:'Stroke order data:',
    srcShare:'The stroke data in this app is under the same license.',
    srcGrade:'The kanji and how they are grouped by year: the kanji allocation table in Japan\'s Course of Study for Elementary Schools (2017 notice)',
    srcReading:'Readings (one On and one Kun each) are based on the Joyo Kanji table (Japanese Cabinet notice, 2010).'
  },
  screen: {
    home: {
      title:'Stroke Order Review',
      lead:'Trace the 1,026 kanji taught in Japanese elementary school (a basic level) with your finger, one stroke at a time, in the right order.',
      btnList:'Trace a kanji',
      btnToday:'Kanji I traced today',
      hint:'Nothing is judged and no score is shown. Any kanji, as many times as you like.',
      source:'Stroke data: KanjiVG (CC BY-SA 3.0)'
    },
    list: {
      title:'Choose a kanji to trace',
      sub:'The 1,026 kanji taught in Japanese elementary school (a basic level), grouped by the year they are taught.',
      noData:'No stroke data is available.',
      gradesLabel:'Year taught',
      grades:['Year 1','Year 2','Year 3','Year 4','Year 5','Year 6'],
      findLabel:'Find a kanji (type or paste one)',
      findGo:'Open',
      findEmpty:'Please enter one kanji.',
      findNone:'"{c}" is not in this app. It has only the kanji taught in Japanese elementary school.'
    },
    trace: {
      title:'Trace',
      on:'On',
      kun:'Kun',
      sep:': ',
      none:'none',
      speak:'Read aloud',
      noVoice:'Could not read it aloud',
      stroke:'Stroke {n} of {m}',
      how:'When the light line moves, trace over it with your finger.',
      last:'This is the last stroke.',
      prev:'Previous stroke',
      next:'Next stroke',
      replay:'Show again',
      clear:'Erase my tracing',
      done:'Done',
      doneToast:'Added to today\'s kanji ✓',
      nextChar:'Next kanji',
      toList:'Back to the list',
      noSel:'Please choose a kanji first.'
    },
    today: {
      title:'Kanji I traced today',
      hint:'Only today\'s kanji are shown here. The list starts fresh on a new day.',
      empty:'You have not traced anything yet today.',
      tapHint:'Tap a kanji to trace it again.',
      go:'Go and trace'
    }
  }
};

var TBL = { ja: ja, en: en };
/* 翻訳の差し込み用: en の複製に訳を重ねる(足りないキーは en のまま) */
function mergeDeep(t, s){ for(var k in s){ if(s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])){ if(!t[k] || typeof t[k] !== 'object') t[k] = {}; mergeDeep(t[k], s[k]); } else t[k] = s[k]; } return t; }
/* ---- de: 翻訳 ---- */
TBL.de = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Kanji-Strichfolge - SOYOGI",
    "short": "Kanji-Strichfolge",
    "tagline": "Nichts wird als falsch markiert. Nur die Wiederholung für heute."
  },
  "nav": {
    "home": "Start",
    "list": "Nachzeichnen",
    "today": "Heute",
    "set": "Einstellungen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "del": "Löschen",
    "back": "Zurück",
    "close": "Schließen",
    "yes": "Ja",
    "no": "Nein",
    "add": "Hinzufügen",
    "edit": "Bearbeiten",
    "next": "Weiter",
    "prev": "Vorherige",
    "done": "Fertig",
    "saved": "Gespeichert ✓",
    "saveFail": "Speichern nicht möglich",
    "storageFull": "Der Speicher ist voll. Speichern nicht möglich",
    "deleted": "Gelöscht",
    "delConfirm": "Wirklich löschen?",
    "empty": "Noch nichts vorhanden",
    "optional": "Sie müssen nicht alles ausfüllen.",
    "today": "Heute",
    "photo": {
      "camera": "Foto aufnehmen",
      "roll": "Aus Fotos auswählen",
      "cropTitle": "Foto zuschneiden",
      "cropHint": "Verschieben Sie das Bild mit dem Finger oder mit den Pfeilen und ändern Sie die Größe mit dem Schieberegler.",
      "zoom": "Größe",
      "panUp": "Oben",
      "panDown": "Unten",
      "panLeft": "Links",
      "panRight": "Rechts",
      "make": "Übernehmen",
      "fail": "Das Foto konnte nicht geladen werden"
    }
  },
  "set": {
    "hNormal": "Grundeinstellungen",
    "hBackup": "Smartphone wechseln (Sicherung)",
    "fs": "Schriftgröße",
    "fsSizes": [
      "Normal",
      "Groß",
      "Sehr groß"
    ],
    "lang": "ことば / Language",
    "theme": "Farbe",
    "themes": [
      "Grün",
      "Hellblau",
      "Weiß",
      "Schwarz"
    ],
    "bgm": "Musik",
    "bgms": [
      "Keine",
      "Grüner Klang",
      "Blauer Klang"
    ],
    "sound": "Tippton",
    "on": "Ein",
    "off": "Aus",
    "bkHint": "Wenn Sie zu einem neuen Smartphone wechseln, tippen Sie auf „Exportieren“, um eine Datei zu speichern. Tippen Sie dann auf dem neuen Smartphone auf „Importieren“.",
    "bkExport": "Exportieren",
    "bkImport": "Importieren",
    "exported": "Exportiert ✓",
    "imported": "Importiert ✓",
    "importFail": "Import nicht möglich",
    "importConfirm": "Ihre aktuellen Einträge werden durch den Inhalt der Datei ersetzt. Möchten Sie importieren?",
    "note": "Die nachgezeichneten Kanji und Ihre Einstellungen werden nur auf diesem Gerät gespeichert. Nichts wird irgendwohin gesendet.",
    "privacy": "Datenschutzerklärung",
    "credit": "App-Entwicklung: SOYOGI, ein Ort für Beratung zu Pflege und Unterstützung",
    "srcLabel": "Daten zur Strichfolge:",
    "srcShare": "Die Strichdaten dieser App stehen unter derselben Lizenz.",
    "srcGrade": "Enthaltene Kanji und Einteilung nach Jahren: die Zuordnungstabelle der Kanji im japanischen Lehrplan für Grundschulen (Bekanntmachung 2017)",
    "srcReading": "Die Lesungen (je eine On- und eine Kun-Lesung) beruhen auf der Jōyō-Kanji-Tabelle (Bekanntmachung des japanischen Kabinetts, 2010)."
  },
  "screen": {
    "home": {
      "title": "Kanji-Strichfolge",
      "lead": "Sie zeichnen die 1.026 Kanji, die in der japanischen Grundschule gelernt werden (Grundniveau), mit dem Finger in der richtigen Strichfolge nach.",
      "btnList": "Kanji nachzeichnen",
      "btnToday": "Heute geübte Kanji",
      "hint": "Es wird nicht beurteilt, ob etwas gelungen ist. Punkte gibt es auch nicht. Beliebige Kanji, so oft Sie möchten.",
      "source": "Daten zur Strichfolge: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Kanji zum Nachzeichnen auswählen",
      "sub": "Die 1.026 Kanji der japanischen Grundschule (Grundniveau), geordnet nach dem Jahr, in dem sie gelernt werden.",
      "noData": "Es sind keine Daten zur Strichfolge vorhanden.",
      "gradesLabel": "Lernjahr",
      "grades": [
        "Klasse 1",
        "Klasse 2",
        "Klasse 3",
        "Klasse 4",
        "Klasse 5",
        "Klasse 6"
      ],
      "findLabel": "Kanji suchen (eines eingeben oder einfügen)",
      "findGo": "Öffnen",
      "findEmpty": "Bitte geben Sie ein Kanji ein.",
      "findNone": "„{c}“ ist in dieser App nicht enthalten. Sie enthält nur die Kanji der japanischen Grundschule."
    },
    "trace": {
      "title": "Nachzeichnen",
      "on": "On-Lesung",
      "kun": "Kun-Lesung",
      "sep": ": ",
      "none": "keine",
      "speak": "Vorlesen",
      "noVoice": "Vorlesen war nicht möglich",
      "stroke": "Strich {n} von {m}",
      "how": "Wenn sich die blasse Linie bewegt, zeichnen Sie sie mit dem Finger nach.",
      "last": "Das ist der letzte Strich.",
      "prev": "Vorheriger Strich",
      "next": "Nächster Strich",
      "replay": "Noch einmal ansehen",
      "clear": "Zeichnung löschen",
      "done": "Fertig",
      "doneToast": "Zu den heutigen Kanji hinzugefügt ✓",
      "nextChar": "Nächstes Kanji",
      "toList": "Zur Liste",
      "noSel": "Bitte wählen Sie zuerst ein Kanji aus."
    },
    "today": {
      "title": "Heute geübte Kanji",
      "hint": "Hier werden nur die Kanji von heute angezeigt. An einem neuen Tag beginnt die Liste neu.",
      "empty": "Heute haben Sie noch nichts nachgezeichnet.",
      "tapHint": "Tippen Sie auf ein Kanji, um es noch einmal nachzuzeichnen.",
      "go": "Zum Nachzeichnen"
    }
  }
});
/* ---- /de ---- */
/* ---- fr: 翻訳 ---- */
TBL.fr = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Revoir les traits - SOYOGI",
    "short": "Revoir les traits",
    "tagline": "Aucune marque d'erreur. Juste la révision du jour."
  },
  "nav": {
    "home": "Accueil",
    "list": "Tracer",
    "today": "Aujourd'hui",
    "set": "Réglages"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "del": "Supprimer",
    "back": "Retour",
    "close": "Fermer",
    "yes": "Oui",
    "no": "Non",
    "add": "Ajouter",
    "edit": "Modifier",
    "next": "Suivant",
    "prev": "Précédent",
    "done": "Terminé",
    "saved": "Enregistré ✓",
    "saveFail": "Impossible d'enregistrer",
    "storageFull": "Mémoire pleine, impossible d'enregistrer",
    "deleted": "Supprimé",
    "delConfirm": "Voulez-vous vraiment supprimer ?",
    "empty": "Rien pour le moment",
    "optional": "Il n'est pas nécessaire de tout remplir.",
    "today": "Aujourd'hui",
    "photo": {
      "camera": "Prendre une photo",
      "roll": "Choisir dans les photos",
      "cropTitle": "Recadrer la photo",
      "cropHint": "Déplacez avec le doigt ou avec les flèches, puis changez la taille avec le curseur.",
      "zoom": "Taille",
      "panUp": "Haut",
      "panDown": "Bas",
      "panLeft": "Gauche",
      "panRight": "Droite",
      "make": "Valider",
      "fail": "Impossible de charger la photo"
    }
  },
  "set": {
    "hNormal": "Réglages courants",
    "hBackup": "Changer de téléphone (sauvegarde)",
    "fs": "Taille du texte",
    "fsSizes": [
      "Normale",
      "Grande",
      "Très grande"
    ],
    "lang": "ことば / Language",
    "theme": "Couleur",
    "themes": [
      "Vert",
      "Bleu clair",
      "Blanc",
      "Noir"
    ],
    "bgm": "Musique",
    "bgms": [
      "Aucune",
      "Son vert",
      "Son bleu"
    ],
    "sound": "Son au toucher",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Pour passer à un nouveau téléphone, appuyez sur \"Exporter\" pour enregistrer un fichier, puis appuyez sur \"Importer\" sur le nouveau téléphone.",
    "bkExport": "Exporter",
    "bkImport": "Importer",
    "exported": "Exporté ✓",
    "imported": "Importé ✓",
    "importFail": "Impossible d'importer",
    "importConfirm": "Vos données actuelles seront remplacées par le contenu du fichier. Importer le fichier ?",
    "note": "Les kanji tracés et vos réglages sont enregistrés uniquement sur cet appareil. Rien n'est envoyé ailleurs.",
    "privacy": "Politique de confidentialité",
    "credit": "Application développée par SOYOGI, espace de conseil pour les soins et l'accompagnement",
    "srcLabel": "Données de l'ordre des traits :",
    "srcShare": "Les données de traits de cette application sont sous la même licence.",
    "srcGrade": "Kanji retenus et répartition par année : la table de répartition des kanji du programme officiel de l'école primaire au Japon (publié en 2017)",
    "srcReading": "Lectures (une on et une kun pour chaque kanji) : d'après la table des kanji d'usage courant (Jōyō kanji, avis du Cabinet japonais, 2010)."
  },
  "screen": {
    "home": {
      "title": "Revoir les traits",
      "lead": "Tracez avec le doigt les 1 026 kanji appris à l'école primaire au Japon (niveau de base), en suivant l'ordre des traits.",
      "btnList": "Tracer un kanji",
      "btnToday": "Kanji tracés aujourd'hui",
      "hint": "Rien n'est évalué et aucun score ne s'affiche. Les kanji que vous aimez, autant que vous le voulez.",
      "source": "Données de l'ordre des traits : KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Choisir un kanji à tracer",
      "sub": "Les 1 026 kanji appris à l'école primaire au Japon (niveau de base), classés selon l'année où on les apprend.",
      "noData": "Aucune donnée d'ordre des traits.",
      "gradesLabel": "Année d'apprentissage",
      "grades": [
        "1re année",
        "2e année",
        "3e année",
        "4e année",
        "5e année",
        "6e année"
      ],
      "findLabel": "Chercher un kanji (en saisir ou en coller un)",
      "findGo": "Ouvrir",
      "findEmpty": "Saisissez un kanji.",
      "findNone": "« {c} » ne figure pas dans cette application. Elle ne contient que les kanji appris à l'école primaire au Japon."
    },
    "trace": {
      "title": "Tracer",
      "on": "On",
      "kun": "Kun",
      "sep": " : ",
      "none": "aucune",
      "speak": "Lire à voix haute",
      "noVoice": "Impossible de lire à voix haute",
      "stroke": "Trait {n} sur {m}",
      "how": "Quand la ligne pâle se déplace, repassez dessus avec le doigt.",
      "last": "C'est le dernier trait.",
      "prev": "Trait précédent",
      "next": "Trait suivant",
      "replay": "Revoir",
      "clear": "Effacer le tracé",
      "done": "C'est fait",
      "doneToast": "Ajouté aux kanji du jour ✓",
      "nextChar": "Kanji suivant",
      "toList": "Retour à la liste",
      "noSel": "Choisissez d'abord un kanji."
    },
    "today": {
      "title": "Kanji tracés aujourd'hui",
      "hint": "Seuls les kanji du jour s'affichent ici. La liste se renouvelle chaque jour.",
      "empty": "Vous n'avez encore rien tracé aujourd'hui.",
      "tapHint": "Touchez un kanji pour le tracer à nouveau.",
      "go": "Aller tracer"
    }
  }
});
/* ---- /fr ---- */
/* ---- es: 翻訳 ---- */
TBL.es = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Repaso de trazos - SOYOGI",
    "short": "Repaso de trazos",
    "tagline": "Sin marcas de error. Solo el repaso de hoy."
  },
  "nav": {
    "home": "Inicio",
    "list": "Trazar",
    "today": "Hoy",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Borrar",
    "back": "Volver",
    "close": "Cerrar",
    "yes": "Sí",
    "no": "No",
    "add": "Agregar",
    "edit": "Editar",
    "next": "Siguiente",
    "prev": "Anterior",
    "done": "Listo",
    "saved": "Guardado ✓",
    "saveFail": "No se pudo guardar",
    "storageFull": "Almacenamiento lleno. No se pudo guardar",
    "deleted": "Borrado",
    "delConfirm": "¿Borrar de verdad?",
    "empty": "Todavía no hay nada",
    "optional": "No hace falta completarlo todo.",
    "today": "Hoy",
    "photo": {
      "camera": "Tomar una foto",
      "roll": "Elegir de las fotos",
      "cropTitle": "Recortar la foto",
      "cropHint": "Mover con el dedo o ajustar con las flechas, y cambiar el tamaño con el control deslizante.",
      "zoom": "Tamaño",
      "panUp": "Arriba",
      "panDown": "Abajo",
      "panLeft": "Izquierda",
      "panRight": "Derecha",
      "make": "Usar esta",
      "fail": "No se pudo cargar la foto"
    }
  },
  "set": {
    "hNormal": "Ajustes habituales",
    "hBackup": "Cambio de teléfono (copia de seguridad)",
    "fs": "Tamaño del texto",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muy grande"
    ],
    "lang": "ことば / Language",
    "theme": "Color",
    "themes": [
      "Verde",
      "Azul claro",
      "Blanco",
      "Negro"
    ],
    "bgm": "Música",
    "bgms": [
      "Ninguna",
      "Sonido verde",
      "Sonido azul"
    ],
    "sound": "Sonido al tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Al pasar a un teléfono nuevo, tocar «Exportar» para guardar un archivo y luego tocar «Importar» en el teléfono nuevo.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "No se pudo importar",
    "importConfirm": "El contenido actual se reemplazará por el del archivo. ¿Importarlo?",
    "note": "Los kanji trazados y los ajustes se guardan solo en este dispositivo. No se envía nada a ningún lugar.",
    "privacy": "Política de privacidad",
    "credit": "Desarrollado por SOYOGI, servicio de consulta sobre cuidados y apoyo",
    "srcLabel": "Datos del orden de trazos:",
    "srcShare": "Los datos de trazos de esta app tienen la misma licencia.",
    "srcGrade": "Kanji incluidos y su agrupación por año: la tabla de asignación de kanji del plan de estudios oficial de primaria de Japón (aviso de 2017)",
    "srcReading": "Lecturas (una on y una kun de cada kanji): basadas en la tabla de kanji de uso común (Jōyō kanji, aviso del Gabinete de Japón, 2010)."
  },
  "screen": {
    "home": {
      "title": "Repaso de trazos",
      "lead": "Trazar con el dedo, siguiendo el orden de los trazos, los 1026 kanji que se aprenden en la escuela primaria de Japón (nivel básico).",
      "btnList": "Trazar un kanji",
      "btnToday": "Kanji trazados hoy",
      "hint": "No se evalúa si sale bien o no. Tampoco hay puntuación. Cualquier kanji, tantas veces como se quiera.",
      "source": "Datos del orden de trazos: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Elegir un kanji para trazar",
      "sub": "Los 1026 kanji que se aprenden en la escuela primaria de Japón (nivel básico), agrupados por el año en que se aprenden.",
      "noData": "No hay datos del orden de trazos.",
      "gradesLabel": "Año en que se aprenden",
      "grades": [
        "Año 1",
        "Año 2",
        "Año 3",
        "Año 4",
        "Año 5",
        "Año 6"
      ],
      "findLabel": "Buscar un kanji (escribir o pegar uno)",
      "findGo": "Abrir",
      "findEmpty": "Hay que escribir un kanji.",
      "findNone": "«{c}» no está en esta app. Solo tiene los kanji que se aprenden en la escuela primaria de Japón."
    },
    "trace": {
      "title": "Trazar",
      "on": "On",
      "kun": "Kun",
      "sep": ": ",
      "none": "ninguna",
      "speak": "Leer en voz alta",
      "noVoice": "No se pudo leer en voz alta",
      "stroke": "Trazo {n} de {m}",
      "how": "Cuando se mueva la línea tenue, repasarla con el dedo.",
      "last": "Es el último trazo.",
      "prev": "Trazo anterior",
      "next": "Trazo siguiente",
      "replay": "Ver otra vez",
      "clear": "Borrar lo trazado",
      "done": "Listo",
      "doneToast": "Agregado a los kanji de hoy ✓",
      "nextChar": "Siguiente kanji",
      "toList": "Ir a la lista",
      "noSel": "Primero hay que elegir un kanji."
    },
    "today": {
      "title": "Kanji trazados hoy",
      "hint": "Aquí solo aparecen los de hoy. Con un nuevo día, la lista empieza de cero.",
      "empty": "Todavía no hay kanji trazados hoy.",
      "tapHint": "Tocar un kanji para trazarlo otra vez.",
      "go": "Ir a trazar"
    }
  }
});
/* ---- /es ---- */
/* ---- it: 翻訳 ---- */
TBL.it = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Ripasso dei tratti - SOYOGI",
    "short": "Ripasso dei tratti",
    "tagline": "Nessun segno di errore. Solo il ripasso di oggi."
  },
  "nav": {
    "home": "Home",
    "list": "Ricalca",
    "today": "Oggi",
    "set": "Impostazioni"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annulla",
    "save": "Salva",
    "del": "Elimina",
    "back": "Indietro",
    "close": "Chiudi",
    "yes": "Sì",
    "no": "No",
    "add": "Aggiungi",
    "edit": "Modifica",
    "next": "Successivo",
    "prev": "Precedente",
    "done": "Fatto",
    "saved": "Salvato ✓",
    "saveFail": "Impossibile salvare",
    "storageFull": "Memoria piena, impossibile salvare",
    "deleted": "Eliminato",
    "delConfirm": "Vuole davvero eliminarlo?",
    "empty": "Non c'è ancora niente",
    "optional": "Non è necessario compilare tutto.",
    "today": "Oggi",
    "photo": {
      "camera": "Scatta una foto",
      "roll": "Scegli dalle foto",
      "cropTitle": "Ritaglia la foto",
      "cropHint": "Sposti la foto con il dito o usi le frecce, poi cambi la dimensione con il cursore.",
      "zoom": "Dimensione",
      "panUp": "Su",
      "panDown": "Giù",
      "panLeft": "Sinistra",
      "panRight": "Destra",
      "make": "Usa questa",
      "fail": "Impossibile caricare la foto"
    }
  },
  "set": {
    "hNormal": "Impostazioni generali",
    "hBackup": "Cambio di telefono (backup)",
    "fs": "Dimensione del testo",
    "fsSizes": [
      "Normale",
      "Grande",
      "Molto grande"
    ],
    "lang": "ことば / Language",
    "theme": "Colore",
    "themes": [
      "Verde",
      "Azzurro",
      "Bianco",
      "Nero"
    ],
    "bgm": "Musica",
    "bgms": [
      "Nessuna",
      "Suono verde",
      "Suono blu"
    ],
    "sound": "Suono al tocco",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Quando passa a un nuovo telefono, tocchi «Esporta» per salvare un file, poi sul nuovo telefono tocchi «Importa».",
    "bkExport": "Esporta",
    "bkImport": "Importa",
    "exported": "Esportato ✓",
    "imported": "Importato ✓",
    "importFail": "Impossibile importare",
    "importConfirm": "I contenuti attuali verranno sostituiti con quelli del file. Vuole importarlo?",
    "note": "I kanji ricalcati e le impostazioni vengono salvati solo su questo dispositivo. Non viene inviato niente da nessuna parte.",
    "privacy": "Informativa sulla privacy",
    "credit": "App sviluppata da SOYOGI, servizio di consulenza su assistenza e sostegno",
    "srcLabel": "Dati sull'ordine dei tratti:",
    "srcShare": "Anche i dati dei tratti di questa app hanno la stessa licenza.",
    "srcGrade": "Kanji inclusi e divisione per anno: la tabella di assegnazione dei kanji delle indicazioni ufficiali per la scuola elementare in Giappone (2017)",
    "srcReading": "Letture (una on e una kun per ciascun kanji): basate sulla tabella dei kanji di uso comune (Jōyō kanji, avviso del Consiglio dei ministri giapponese, 2010)."
  },
  "screen": {
    "home": {
      "title": "Ripasso dei tratti",
      "lead": "Ricalchi con il dito i 1026 kanji insegnati alla scuola elementare in Giappone (livello base), un tratto alla volta, seguendo l'ordine di scrittura.",
      "btnList": "Ricalca un kanji",
      "btnToday": "Kanji ricalcati oggi",
      "hint": "Non viene valutato se è venuto bene o no. Non ci sono punteggi. I kanji che preferisce, quante volte vuole.",
      "source": "Dati sull'ordine dei tratti: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Scelga un kanji da ricalcare",
      "sub": "I 1026 kanji insegnati alla scuola elementare in Giappone (livello base), divisi per l'anno in cui si imparano.",
      "noData": "Non ci sono dati sull'ordine dei tratti.",
      "gradesLabel": "Anno in cui si imparano",
      "grades": [
        "Anno 1",
        "Anno 2",
        "Anno 3",
        "Anno 4",
        "Anno 5",
        "Anno 6"
      ],
      "findLabel": "Cerchi un kanji (ne scriva o incolli uno)",
      "findGo": "Apri",
      "findEmpty": "Scriva un kanji.",
      "findNone": "«{c}» non è in questa app. Contiene solo i kanji insegnati alla scuola elementare in Giappone."
    },
    "trace": {
      "title": "Ricalca",
      "on": "Lettura on",
      "kun": "Lettura kun",
      "sep": ": ",
      "none": "nessuna",
      "speak": "Leggi ad alta voce",
      "noVoice": "Impossibile leggere ad alta voce",
      "stroke": "Tratto {n} di {m}",
      "how": "Quando la linea chiara si muove, ci passi sopra con il dito.",
      "last": "Questo è l'ultimo tratto.",
      "prev": "Tratto precedente",
      "next": "Tratto successivo",
      "replay": "Guarda di nuovo",
      "clear": "Cancella la traccia",
      "done": "Fatto",
      "doneToast": "Aggiunto ai kanji di oggi ✓",
      "nextChar": "Kanji successivo",
      "toList": "Torna all'elenco",
      "noSel": "Prima scelga un kanji."
    },
    "today": {
      "title": "Kanji ricalcati oggi",
      "hint": "Qui compaiono solo i kanji di oggi. Quando cambia il giorno, l'elenco ricomincia da capo.",
      "empty": "Oggi non ha ancora ricalcato nessun kanji.",
      "tapHint": "Tocchi un kanji per ricalcarlo di nuovo.",
      "go": "Vai a ricalcare"
    }
  }
});
/* ---- /it ---- */
/* ---- pt: 翻訳 ---- */
TBL.pt = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Revisão dos traços - SOYOGI",
    "short": "Revisão dos traços",
    "tagline": "Sem marcas de erro. Só a revisão de hoje."
  },
  "nav": {
    "home": "Início",
    "list": "Traçar",
    "today": "Hoje",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Apagar",
    "back": "Voltar",
    "close": "Fechar",
    "yes": "Sim",
    "no": "Não",
    "add": "Adicionar",
    "edit": "Editar",
    "next": "Seguinte",
    "prev": "Anterior",
    "done": "Feito",
    "saved": "Guardado ✓",
    "saveFail": "Não foi possível guardar",
    "storageFull": "Sem espaço. Não foi possível guardar",
    "deleted": "Apagado",
    "delConfirm": "Apagar mesmo?",
    "empty": "Ainda não há nada",
    "optional": "Não é preciso preencher tudo.",
    "today": "Hoje",
    "photo": {
      "camera": "Tirar uma foto",
      "roll": "Escolher das fotos",
      "cropTitle": "Recortar a foto",
      "cropHint": "Mover com o dedo ou usar as setas para ajustar, e mudar o tamanho com a barra deslizante.",
      "zoom": "Tamanho",
      "panUp": "Cima",
      "panDown": "Baixo",
      "panLeft": "Esquerda",
      "panRight": "Direita",
      "make": "Usar esta",
      "fail": "Não foi possível carregar a foto"
    }
  },
  "set": {
    "hNormal": "Ajustes do dia a dia",
    "hBackup": "Mudar de smartphone (cópia de segurança)",
    "fs": "Tamanho do texto",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muito grande"
    ],
    "lang": "ことば / Language",
    "theme": "Cor",
    "themes": [
      "Verde",
      "Azul-claro",
      "Branco",
      "Preto"
    ],
    "bgm": "Música",
    "bgms": [
      "Nenhuma",
      "Som verde",
      "Som azul"
    ],
    "sound": "Som ao tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Ao mudar para um novo smartphone, tocar em \"Exportar\" para guardar uma cópia dos dados e, depois, tocar em \"Importar\" no novo smartphone.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "Não foi possível importar",
    "importConfirm": "O conteúdo atual vai ser substituído pelo conteúdo do ficheiro. Importar?",
    "note": "Os kanji traçados e os ajustes ficam guardados só neste dispositivo. Nada é enviado para fora.",
    "privacy": "Política de privacidade",
    "credit": "Desenvolvimento da app: SOYOGI, serviço de consulta sobre cuidados e apoio",
    "srcLabel": "Dados da ordem dos traços:",
    "srcShare": "Os dados dos traços desta app têm a mesma licença.",
    "srcGrade": "Kanji incluídos e divisão por ano: a tabela de distribuição dos kanji do programa oficial da escola primária no Japão (publicado em 2017)",
    "srcReading": "Leituras (uma on e uma kun de cada kanji): com base na tabela de kanji de uso comum (Jōyō kanji, aviso do Conselho de Ministros do Japão, 2010)."
  },
  "screen": {
    "home": {
      "title": "Revisão dos traços",
      "lead": "Traçar com o dedo os 1026 kanji aprendidos na escola primária no Japão (nível básico), seguindo a ordem dos traços.",
      "btnList": "Traçar kanji",
      "btnToday": "Kanji traçados hoje",
      "hint": "Não há avaliação de acerto nem pontuação. O kanji que quiser, quantas vezes quiser.",
      "source": "Dados da ordem dos traços: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Escolher um kanji para traçar",
      "sub": "Os 1026 kanji aprendidos na escola primária no Japão (nível básico), agrupados pelo ano em que se aprendem.",
      "noData": "Não há dados da ordem dos traços.",
      "gradesLabel": "Ano em que se aprendem",
      "grades": [
        "1.º ano",
        "2.º ano",
        "3.º ano",
        "4.º ano",
        "5.º ano",
        "6.º ano"
      ],
      "findLabel": "Procurar um kanji (escrever ou colar um)",
      "findGo": "Abrir",
      "findEmpty": "Escrever um kanji.",
      "findNone": "«{c}» não está nesta app. Só tem os kanji aprendidos na escola primária no Japão."
    },
    "trace": {
      "title": "Traçar",
      "on": "Leitura on",
      "kun": "Leitura kun",
      "sep": ": ",
      "none": "nenhuma",
      "speak": "Ler em voz alta",
      "noVoice": "Não foi possível ler em voz alta",
      "stroke": "Traço {n} de {m}",
      "how": "Quando a linha clara se mover, traçar por cima dela com o dedo.",
      "last": "Este é o último traço.",
      "prev": "Traço anterior",
      "next": "Traço seguinte",
      "replay": "Ver de novo",
      "clear": "Apagar o traçado",
      "done": "Feito",
      "doneToast": "Adicionado aos kanji de hoje ✓",
      "nextChar": "Kanji seguinte",
      "toList": "Ir para a lista",
      "noSel": "Primeiro, escolher um kanji."
    },
    "today": {
      "title": "Kanji traçados hoje",
      "hint": "Aqui aparecem só os kanji de hoje. Num novo dia, a lista recomeça.",
      "empty": "Ainda não há kanji traçados hoje.",
      "tapHint": "Tocar num kanji para voltar a traçar.",
      "go": "Ir traçar"
    }
  }
});
/* ---- /pt ---- */
/* ---- nl: 翻訳 ---- */
TBL.nl = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Schrijfvolgorde - SOYOGI",
    "short": "Schrijfvolgorde",
    "tagline": "Geen kruisjes voor fouten. Alleen de herhaling van vandaag."
  },
  "nav": {
    "home": "Start",
    "list": "Overtrekken",
    "today": "Vandaag",
    "set": "Instellingen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuleren",
    "save": "Opslaan",
    "del": "Verwijderen",
    "back": "Terug",
    "close": "Sluiten",
    "yes": "Ja",
    "no": "Nee",
    "add": "Toevoegen",
    "edit": "Aanpassen",
    "next": "Volgende",
    "prev": "Vorige",
    "done": "Klaar",
    "saved": "Opgeslagen ✓",
    "saveFail": "Kon niet opslaan",
    "storageFull": "Het geheugen is vol, kon niet opslaan",
    "deleted": "Verwijderd",
    "delConfirm": "Wilt u dit echt verwijderen?",
    "empty": "Hier staat nog niets",
    "optional": "U hoeft niet alles in te vullen.",
    "today": "Vandaag",
    "photo": {
      "camera": "Foto maken",
      "roll": "Kiezen uit foto's",
      "cropTitle": "Foto bijsnijden",
      "cropHint": "Verschuif met uw vinger of gebruik de pijlen, en verander de grootte met de schuifregelaar.",
      "zoom": "Grootte",
      "panUp": "Omhoog",
      "panDown": "Omlaag",
      "panLeft": "Naar links",
      "panRight": "Naar rechts",
      "make": "Dit gebruiken",
      "fail": "Kon de foto niet laden"
    }
  },
  "set": {
    "hNormal": "Gewone instellingen",
    "hBackup": "Nieuwe telefoon (back-up)",
    "fs": "Tekstgrootte",
    "fsSizes": [
      "Normaal",
      "Groot",
      "Heel groot"
    ],
    "lang": "ことば / Language",
    "theme": "Kleur",
    "themes": [
      "Groen",
      "Lichtblauw",
      "Wit",
      "Zwart"
    ],
    "bgm": "Muziek",
    "bgms": [
      "Geen",
      "Groene toon",
      "Blauwe toon"
    ],
    "sound": "Tikgeluid",
    "on": "AAN",
    "off": "UIT",
    "bkHint": "Gaat u over naar een nieuwe telefoon? Tik dan op ‘Exporteren’ om een bestand op te slaan, en tik daarna op de nieuwe telefoon op ‘Importeren’.",
    "bkExport": "Exporteren",
    "bkImport": "Importeren",
    "exported": "Geëxporteerd ✓",
    "imported": "Geïmporteerd ✓",
    "importFail": "Kon niet importeren",
    "importConfirm": "Uw huidige gegevens worden vervangen door de inhoud van het bestand. Wilt u importeren?",
    "note": "De overgetrokken kanji en uw instellingen worden alleen op dit apparaat bewaard. Er wordt niets verstuurd.",
    "privacy": "Privacybeleid",
    "credit": "App ontwikkeld door SOYOGI, een adviespunt voor zorg en ondersteuning",
    "srcLabel": "Gegevens over de schrijfvolgorde:",
    "srcShare": "De streekgegevens in deze app vallen onder dezelfde licentie.",
    "srcGrade": "Opgenomen kanji en indeling per jaar: de tabel met de verdeling van de kanji uit het Japanse leerplan voor de basisschool (bekendmaking 2017)",
    "srcReading": "Lezingen (één on- en één kun-lezing per kanji): gebaseerd op de Jōyō-kanjitabel (bekendmaking van het Japanse kabinet, 2010)."
  },
  "screen": {
    "home": {
      "title": "Schrijfvolgorde",
      "lead": "Trek de 1026 kanji die op de Japanse basisschool worden geleerd (basisniveau) met uw vinger over, in de juiste schrijfvolgorde.",
      "btnList": "Kanji overtrekken",
      "btnToday": "Vandaag overgetrokken kanji",
      "hint": "Er wordt niet beoordeeld of het goed is, en er zijn geen punten. Elke kanji die u wilt, zo vaak als u wilt.",
      "source": "Gegevens over de schrijfvolgorde: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Kies een kanji om over te trekken",
      "sub": "De 1026 kanji die op de Japanse basisschool worden geleerd (basisniveau), ingedeeld naar het jaar waarin ze worden geleerd.",
      "noData": "Er zijn geen gegevens over de schrijfvolgorde.",
      "gradesLabel": "Jaar waarin ze worden geleerd",
      "grades": [
        "Jaar 1",
        "Jaar 2",
        "Jaar 3",
        "Jaar 4",
        "Jaar 5",
        "Jaar 6"
      ],
      "findLabel": "Kanji zoeken (typ of plak er één)",
      "findGo": "Openen",
      "findEmpty": "Voer één kanji in.",
      "findNone": "‘{c}’ staat niet in deze app. Er staan alleen kanji in die op de Japanse basisschool worden geleerd."
    },
    "trace": {
      "title": "Overtrekken",
      "on": "On-lezing",
      "kun": "Kun-lezing",
      "sep": ": ",
      "none": "geen",
      "speak": "Voorlezen",
      "noVoice": "Voorlezen lukte niet",
      "stroke": "Streek {n} (in totaal {m})",
      "how": "Als de lichte lijn beweegt, trekt u die met uw vinger over.",
      "last": "Dit is de laatste streek.",
      "prev": "Vorige streek",
      "next": "Volgende streek",
      "replay": "Nog eens bekijken",
      "clear": "Overtrekken wissen",
      "done": "Klaar",
      "doneToast": "Toegevoegd aan de kanji van vandaag ✓",
      "nextChar": "Volgende kanji",
      "toList": "Naar de lijst",
      "noSel": "Kies eerst een kanji."
    },
    "today": {
      "title": "Vandaag overgetrokken kanji",
      "hint": "Hier ziet u alleen de kanji van vandaag. Op een nieuwe dag begint de lijst opnieuw.",
      "empty": "U hebt vandaag nog niets overgetrokken.",
      "tapHint": "Tik op een kanji om die nog eens over te trekken.",
      "go": "Ga overtrekken"
    }
  }
});
/* ---- /nl ---- */
/* ---- sv: 翻訳 ---- */
TBL.sv = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Streckordningen igen - SOYOGI",
    "short": "Streckordningen igen",
    "tagline": "Inga felmarkeringar. Bara dagens repetition."
  },
  "nav": {
    "home": "Hem",
    "list": "Spåra",
    "today": "Idag",
    "set": "Inställningar"
  },
  "common": {
    "ok": "OK",
    "cancel": "Avbryt",
    "save": "Spara",
    "del": "Ta bort",
    "back": "Tillbaka",
    "close": "Stäng",
    "yes": "Ja",
    "no": "Nej",
    "add": "Lägg till",
    "edit": "Ändra",
    "next": "Nästa",
    "prev": "Förra",
    "done": "Klar",
    "saved": "Sparat ✓",
    "saveFail": "Det gick inte att spara",
    "storageFull": "Minnet är fullt, det gick inte att spara",
    "deleted": "Borttaget",
    "delConfirm": "Vill du verkligen ta bort det här?",
    "empty": "Här finns inget än",
    "optional": "Du behöver inte fylla i allt.",
    "today": "Idag",
    "photo": {
      "camera": "Ta ett foto",
      "roll": "Välj bland foton",
      "cropTitle": "Beskär fotot",
      "cropHint": "Flytta med fingret eller pilarna, och ändra storleken med reglaget.",
      "zoom": "Storlek",
      "panUp": "Upp",
      "panDown": "Ner",
      "panLeft": "Vänster",
      "panRight": "Höger",
      "make": "Använd det här",
      "fail": "Det gick inte att läsa in fotot"
    }
  },
  "set": {
    "hNormal": "Vanliga inställningar",
    "hBackup": "Byta telefon (säkerhetskopia)",
    "fs": "Textstorlek",
    "fsSizes": [
      "Normal",
      "Stor",
      "Mycket stor"
    ],
    "lang": "ことば / Language",
    "theme": "Färg",
    "themes": [
      "Grön",
      "Ljusblå",
      "Vit",
      "Svart"
    ],
    "bgm": "Musik",
    "bgms": [
      "Ingen",
      "Grön klang",
      "Blå klang"
    ],
    "sound": "Tryckljud",
    "on": "PÅ",
    "off": "AV",
    "bkHint": "När du byter till en ny telefon: tryck på ”Exportera” för att spara en fil, och tryck sedan på ”Importera” i den nya telefonen.",
    "bkExport": "Exportera",
    "bkImport": "Importera",
    "exported": "Exporterat ✓",
    "imported": "Importerat ✓",
    "importFail": "Det gick inte att importera",
    "importConfirm": "Det du har nu ersätts med innehållet i filen. Vill du importera?",
    "note": "De kanji du har spårat och dina inställningar sparas bara på den här enheten. Inget skickas någonstans.",
    "privacy": "Integritetspolicy",
    "credit": "Apputveckling: SOYOGI, en plats för rådgivning om omsorg och stöd",
    "srcLabel": "Data för skrivordning:",
    "srcShare": "Streckdata i den här appen har samma licens.",
    "srcGrade": "Vilka kanji som ingår och indelningen per år: tabellen över kanji i den japanska läroplanen för grundskolan (kungjord 2017)",
    "srcReading": "Läsningar (en on- och en kun-läsning per kanji): bygger på tabellen över Jōyō-kanji (den japanska regeringens kungörelse, 2010)."
  },
  "screen": {
    "home": {
      "title": "Streckordningen igen",
      "lead": "Spåra de 1 026 kanji som lärs ut i den japanska grundskolan (grundnivå) med fingret, ett drag i taget, i rätt skrivordning.",
      "btnList": "Spåra ett kanji",
      "btnToday": "Kanji jag spårat idag",
      "hint": "Inget bedöms och inga poäng visas. Vilka kanji du vill, så många gånger du vill.",
      "source": "Data för skrivordning: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "Välj ett kanji att spåra",
      "sub": "De 1 026 kanji som lärs ut i den japanska grundskolan (grundnivå), ordnade efter året då de lärs ut.",
      "noData": "Det finns ingen data för skrivordningen.",
      "gradesLabel": "År då de lärs ut",
      "grades": [
        "Årskurs 1",
        "Årskurs 2",
        "Årskurs 3",
        "Årskurs 4",
        "Årskurs 5",
        "Årskurs 6"
      ],
      "findLabel": "Sök ett kanji (skriv eller klistra in ett)",
      "findGo": "Öppna",
      "findEmpty": "Skriv ett kanji.",
      "findNone": "”{c}” finns inte i den här appen. Den har bara kanji som lärs ut i den japanska grundskolan."
    },
    "trace": {
      "title": "Spåra",
      "on": "On-läsning",
      "kun": "Kun-läsning",
      "sep": ": ",
      "none": "ingen",
      "speak": "Läs upp",
      "noVoice": "Det gick inte att läsa upp",
      "stroke": "Drag {n} av {m}",
      "how": "När den ljusa linjen rör sig, följ den med fingret.",
      "last": "Det här är det sista draget.",
      "prev": "Förra draget",
      "next": "Nästa drag",
      "replay": "Visa igen",
      "clear": "Sudda ut spåret",
      "done": "Klar",
      "doneToast": "Tillagt i dagens kanji ✓",
      "nextChar": "Nästa kanji",
      "toList": "Till listan",
      "noSel": "Välj först ett kanji."
    },
    "today": {
      "title": "Kanji jag spårat idag",
      "hint": "Här visas bara dagens kanji. När det blir en ny dag börjar listan om.",
      "empty": "Du har inte spårat något ännu idag.",
      "tapHint": "Tryck på ett kanji för att spåra det igen.",
      "go": "Börja spåra"
    }
  }
});
/* ---- /sv ---- */
/* ---- ko: 翻訳 ---- */
TBL.ko = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "필순 다시 보기 - SOYOGI",
    "short": "필순 다시 보기",
    "tagline": "× 표시 없이, 오늘 할 만큼만 다시 배워요."
  },
  "nav": {
    "home": "홈",
    "list": "따라 쓰기",
    "today": "오늘",
    "set": "설정"
  },
  "common": {
    "ok": "확인",
    "cancel": "취소",
    "save": "저장",
    "del": "삭제",
    "back": "뒤로",
    "close": "닫기",
    "yes": "네",
    "no": "아니요",
    "add": "추가",
    "edit": "수정",
    "next": "다음",
    "prev": "이전",
    "done": "다 했어요",
    "saved": "저장했어요 ✓",
    "saveFail": "저장하지 못했어요",
    "storageFull": "저장 공간이 가득 차서 저장할 수 없어요",
    "deleted": "삭제했어요",
    "delConfirm": "정말 삭제할까요?",
    "empty": "아직 아무것도 없어요",
    "optional": "전부 쓰지 않아도 괜찮아요.",
    "today": "오늘",
    "photo": {
      "camera": "카메라로 찍기",
      "roll": "사진에서 고르기",
      "cropTitle": "사진 자르기",
      "cropHint": "손가락으로 움직이거나 화살표로 맞추고, 슬라이더로 크기를 바꿔요.",
      "zoom": "크기",
      "panUp": "위로",
      "panDown": "아래로",
      "panLeft": "왼쪽으로",
      "panRight": "오른쪽으로",
      "make": "이걸로 정하기",
      "fail": "사진을 불러오지 못했어요"
    }
  },
  "set": {
    "hNormal": "평소 설정",
    "hBackup": "기기 변경(백업)",
    "fs": "글자 크기",
    "fsSizes": [
      "보통",
      "크게",
      "아주 크게"
    ],
    "lang": "ことば / Language",
    "theme": "색",
    "themes": [
      "초록",
      "하늘색",
      "흰색",
      "검정"
    ],
    "bgm": "배경음악",
    "bgms": [
      "없음",
      "초록의 소리",
      "파랑의 소리"
    ],
    "sound": "터치음",
    "on": "ON",
    "off": "OFF",
    "bkHint": "새 스마트폰으로 옮길 때는 '내보내기'로 파일을 저장한 다음, 새 스마트폰에서 '가져오기'를 눌러 주세요.",
    "bkExport": "내보내기",
    "bkImport": "가져오기",
    "exported": "내보냈어요 ✓",
    "imported": "가져왔어요 ✓",
    "importFail": "가져오지 못했어요",
    "importConfirm": "지금 내용은 파일 내용으로 바뀌어요. 가져올까요?",
    "note": "따라 쓴 글자 기록과 설정은 이 기기 안에만 저장돼요. 어디에도 보내지 않아요.",
    "privacy": "개인정보 처리방침",
    "credit": "앱 개발: 돌봄과 지원 상담소 SOYOGI",
    "srcLabel": "필순 데이터:",
    "srcShare": "이 앱의 필순 데이터도 같은 라이선스를 따라요.",
    "srcGrade": "넣은 한자와 학년별 구분: 일본 초등학교 학습지도요령(2017년 고시)의 학년별 한자 배당표",
    "srcReading": "읽기(음독·훈독 하나씩): 일본 상용한자표(2010년 내각 고시)를 바탕으로 했어요."
  },
  "screen": {
    "home": {
      "title": "필순 다시 보기",
      "lead": "일본 초등학교에서 배우는 한자 1,026자를 필순대로 손가락으로 따라 써요.",
      "btnList": "한자 따라 쓰기",
      "btnToday": "오늘 쓴 글자",
      "hint": "잘했는지 판정하지 않아요. 점수도 나오지 않아요. 좋아하는 글자를 원하는 만큼.",
      "source": "필순 데이터: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "따라 쓸 글자 고르기",
      "sub": "일본 초등학교에서 배우는 한자 1,026자를 배우는 학년별로 나누어 두었어요.",
      "noData": "필순 데이터가 없어요.",
      "gradesLabel": "배우는 학년",
      "grades": [
        "1학년",
        "2학년",
        "3학년",
        "4학년",
        "5학년",
        "6학년"
      ],
      "findLabel": "한자 한 글자를 넣어서 찾기",
      "findGo": "열기",
      "findEmpty": "한자를 한 글자 넣어 주세요.",
      "findNone": "'{c}'은(는) 이 앱에 없어요. 일본 초등학교에서 배우는 한자만 있어요."
    },
    "trace": {
      "title": "따라 쓰기",
      "on": "음독",
      "kun": "훈독",
      "sep": ": ",
      "none": "없음",
      "speak": "읽어 주기",
      "noVoice": "읽어 주지 못했어요",
      "stroke": "{n}번째 획 (모두 {m}획)",
      "how": "연한 선이 움직이면 그 위를 손가락으로 따라 써요.",
      "last": "마지막 획이에요.",
      "prev": "이전 획",
      "next": "다음 획",
      "replay": "다시 보기",
      "clear": "따라 쓴 선 지우기",
      "done": "다 했어요",
      "doneToast": "오늘의 글자에 넣었어요 ✓",
      "nextChar": "다음 글자로",
      "toList": "목록으로",
      "noSel": "먼저 글자를 골라 주세요."
    },
    "today": {
      "title": "오늘 쓴 글자",
      "hint": "여기에는 오늘 것만 나와요. 날짜가 바뀌면 새로 시작돼요.",
      "empty": "오늘은 아직 따라 쓰지 않았어요.",
      "tapHint": "글자를 누르면 다시 따라 쓸 수 있어요.",
      "go": "따라 쓰러 가기"
    }
  }
});
/* ---- /ko ---- */
/* ---- zh: 翻訳 ---- */
TBL.zh = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "笔顺复习 - SOYOGI",
    "short": "笔顺复习",
    "tagline": "不打叉，只重学今天这一点。"
  },
  "nav": {
    "home": "首页",
    "list": "描字",
    "today": "今天",
    "set": "设置"
  },
  "common": {
    "ok": "确定",
    "cancel": "取消",
    "save": "保存",
    "del": "删除",
    "back": "返回",
    "close": "关闭",
    "yes": "是",
    "no": "否",
    "add": "添加",
    "edit": "修改",
    "next": "下一个",
    "prev": "上一个",
    "done": "完成",
    "saved": "已保存 ✓",
    "saveFail": "无法保存",
    "storageFull": "存储空间已满，无法保存",
    "deleted": "已删除",
    "delConfirm": "确定要删除吗？",
    "empty": "还没有任何内容",
    "optional": "不必全部填写也没关系。",
    "today": "今天",
    "photo": {
      "camera": "用相机拍摄",
      "roll": "从照片中选择",
      "cropTitle": "裁剪照片",
      "cropHint": "用手指拖动或用箭头调整位置，再用滑块改变大小。",
      "zoom": "大小",
      "panUp": "向上",
      "panDown": "向下",
      "panLeft": "向左",
      "panRight": "向右",
      "make": "就用这张",
      "fail": "无法读取照片"
    }
  },
  "set": {
    "hNormal": "日常设置",
    "hBackup": "更换手机（备份）",
    "fs": "文字大小",
    "fsSizes": [
      "普通",
      "大",
      "特大"
    ],
    "lang": "ことば / Language",
    "theme": "颜色",
    "themes": [
      "绿色",
      "浅蓝",
      "白色",
      "黑色"
    ],
    "bgm": "背景音乐",
    "bgms": [
      "无",
      "绿色之音",
      "蓝色之音"
    ],
    "sound": "点击音",
    "on": "开",
    "off": "关",
    "bkHint": "换新手机时，请先点“导出”保存文件，再在新手机上点“导入”。",
    "bkExport": "导出",
    "bkImport": "导入",
    "exported": "已导出 ✓",
    "imported": "已导入 ✓",
    "importFail": "无法导入",
    "importConfirm": "现在的内容将被文件的内容替换。要导入吗？",
    "note": "描过的字的记录和设置只保存在这台设备里，不会发送到任何地方。",
    "privacy": "隐私政策",
    "credit": "应用开发：护理与支援咨询处 SOYOGI",
    "srcLabel": "笔顺数据：",
    "srcShare": "本应用的笔顺数据也采用相同的许可。",
    "srcGrade": "收录的字及按年级的划分：日本《小学学习指导要领》（2017年告示）中的各年级汉字分配表",
    "srcReading": "读音（音读、训读各一个）：依据日本《常用汉字表》（2010年内阁告示）。"
  },
  "screen": {
    "home": {
      "title": "笔顺复习",
      "lead": "按照笔顺，用手指描日本小学所学的1026个汉字。",
      "btnList": "描汉字",
      "btnToday": "今天描过的字",
      "hint": "不判断写得对不对，也没有分数。喜欢的字，想描多少次都可以。",
      "source": "笔顺数据：KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "选择要描的字",
      "sub": "日本小学所学的1026个汉字，按学习的年级分开排列。",
      "noData": "没有笔顺数据。",
      "gradesLabel": "学习的年级",
      "grades": [
        "1年级",
        "2年级",
        "3年级",
        "4年级",
        "5年级",
        "6年级"
      ],
      "findLabel": "输入一个字来查找",
      "findGo": "打开",
      "findEmpty": "请输入一个字。",
      "findNone": "“{c}”不在本应用中。这里只有日本小学所学的汉字。"
    },
    "trace": {
      "title": "描字",
      "on": "音读",
      "kun": "训读",
      "sep": "：",
      "none": "无",
      "speak": "朗读",
      "noVoice": "无法朗读",
      "stroke": "第{n}画（共{m}画）",
      "how": "浅色的线动起来后，用手指沿着它描。",
      "last": "这是最后一画。",
      "prev": "上一画",
      "next": "下一画",
      "replay": "再看一次",
      "clear": "擦掉描过的线",
      "done": "完成",
      "doneToast": "已加入今天的字 ✓",
      "nextChar": "下一个字",
      "toList": "回到列表",
      "noSel": "请先选择一个字。"
    },
    "today": {
      "title": "今天描过的字",
      "hint": "这里只显示今天的字。到了新的一天会重新开始。",
      "empty": "今天还没有描字。",
      "tapHint": "点一下字，可以再描一次。",
      "go": "去描字"
    }
  }
});
/* ---- /zh ---- */
/* ---- ar: 翻訳 ---- */
TBL.ar = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "مراجعة ترتيب الخطوط - SOYOGI",
    "short": "مراجعة ترتيب الخطوط",
    "tagline": "بلا علامات خطأ. تعلّم من جديد بقدر اليوم فقط."
  },
  "nav": {
    "home": "الرئيسية",
    "list": "تتبّع",
    "today": "اليوم",
    "set": "الإعدادات"
  },
  "common": {
    "ok": "موافق",
    "cancel": "إلغاء",
    "save": "حفظ",
    "del": "حذف",
    "back": "رجوع",
    "close": "إغلاق",
    "yes": "نعم",
    "no": "لا",
    "add": "إضافة",
    "edit": "تعديل",
    "next": "التالي",
    "prev": "السابق",
    "done": "تمّ",
    "saved": "تم الحفظ ✓",
    "saveFail": "تعذّر الحفظ",
    "storageFull": "المساحة ممتلئة، تعذّر الحفظ",
    "deleted": "تم الحذف",
    "delConfirm": "هل تريد الحذف حقًا؟",
    "empty": "لا يوجد شيء بعد",
    "optional": "ليس عليك أن تملأ كل شيء.",
    "today": "اليوم",
    "photo": {
      "camera": "التقاط صورة",
      "roll": "الاختيار من الصور",
      "cropTitle": "قصّ الصورة",
      "cropHint": "حرّك الصورة بإصبعك أو استخدم الأسهم، ثم غيّر الحجم بشريط التمرير.",
      "zoom": "الحجم",
      "panUp": "لأعلى",
      "panDown": "لأسفل",
      "panLeft": "لليسار",
      "panRight": "لليمين",
      "make": "اعتماد هذه",
      "fail": "تعذّر تحميل الصورة"
    }
  },
  "set": {
    "hNormal": "الإعدادات المعتادة",
    "hBackup": "تغيير الهاتف (نسخة احتياطية)",
    "fs": "حجم الخط",
    "fsSizes": [
      "عادي",
      "كبير",
      "كبير جدًا"
    ],
    "lang": "ことば / Language",
    "theme": "اللون",
    "themes": [
      "أخضر",
      "أزرق فاتح",
      "أبيض",
      "أسود"
    ],
    "bgm": "الموسيقى",
    "bgms": [
      "بدون",
      "نغمة خضراء",
      "نغمة زرقاء"
    ],
    "sound": "صوت النقر",
    "on": "تشغيل",
    "off": "إيقاف",
    "bkHint": "عند الانتقال إلى هاتف جديد، اضغط على «تصدير» لحفظ ملف، ثم اضغط على «استيراد» في الهاتف الجديد.",
    "bkExport": "تصدير",
    "bkImport": "استيراد",
    "exported": "تم التصدير ✓",
    "imported": "تم الاستيراد ✓",
    "importFail": "تعذّر الاستيراد",
    "importConfirm": "سيُستبدَل المحتوى الحالي بمحتوى الملف. هل تريد الاستيراد؟",
    "note": "تُحفَظ الحروف التي تتبّعتها وإعداداتك على هذا الجهاز فقط. ولا يُرسَل أي شيء إلى أي مكان.",
    "privacy": "سياسة الخصوصية",
    "credit": "تطوير التطبيق: SOYOGI، مكان للاستشارة في الرعاية والدعم",
    "srcLabel": "بيانات ترتيب الخطوط:",
    "srcShare": "بيانات الخطوط في هذا التطبيق متاحة بالترخيص نفسه أيضًا.",
    "srcGrade": "الحروف المدرجة وتقسيمها حسب السنة: جدول توزيع الكانجي في منهج المدرسة الابتدائية في اليابان (إعلان 2017)",
    "srcReading": "القراءات (قراءة أون وقراءة كون لكل حرف): مبنية على جدول الكانجي الشائعة الاستخدام (جويو كانجي، إعلان مجلس الوزراء الياباني، 2010)."
  },
  "screen": {
    "home": {
      "title": "مراجعة ترتيب الخطوط",
      "lead": "تتبّع بإصبعك حروف الكانجي الـ1026 التي تُدرَّس في المدرسة الابتدائية في اليابان (المستوى الأساسي)، بحسب ترتيب الخطوط.",
      "btnList": "تتبّع حرف كانجي",
      "btnToday": "حروف اليوم",
      "hint": "لا يوجد حكم على الصواب أو الخطأ، ولا تظهر أي درجات. أي حرف تحبه، بقدر ما تحب.",
      "source": "بيانات ترتيب الخطوط: KanjiVG (CC BY-SA 3.0)"
    },
    "list": {
      "title": "اختر حرفًا لتتبّعه",
      "sub": "حروف الكانجي الـ1026 التي تُدرَّس في المدرسة الابتدائية في اليابان (المستوى الأساسي)، مقسّمة حسب السنة التي تُدرَّس فيها.",
      "noData": "لا توجد بيانات لترتيب الخطوط.",
      "gradesLabel": "سنة الدراسة",
      "grades": [
        "الصف 1",
        "الصف 2",
        "الصف 3",
        "الصف 4",
        "الصف 5",
        "الصف 6"
      ],
      "findLabel": "ابحث عن حرف كانجي (اكتب حرفًا واحدًا أو الصقه)",
      "findGo": "فتح",
      "findEmpty": "من فضلك اكتب حرفًا واحدًا.",
      "findNone": "«{c}» غير موجود في هذا التطبيق. فيه فقط حروف الكانجي التي تُدرَّس في المدرسة الابتدائية في اليابان."
    },
    "trace": {
      "title": "تتبّع",
      "on": "قراءة أون",
      "kun": "قراءة كون",
      "sep": ": ",
      "none": "لا يوجد",
      "speak": "قراءة صوتية",
      "noVoice": "تعذّرت القراءة الصوتية",
      "stroke": "الخط {n} من أصل {m}",
      "how": "عندما يتحرك الخط الفاتح، تتبّعه بإصبعك.",
      "last": "هذا هو الخط الأخير.",
      "prev": "الخط السابق",
      "next": "الخط التالي",
      "replay": "عرض مجددًا",
      "clear": "مسح التتبّع",
      "done": "تمّ",
      "doneToast": "أُضيف إلى حروف اليوم ✓",
      "nextChar": "الحرف التالي",
      "toList": "إلى القائمة",
      "noSel": "من فضلك اختر حرفًا أولًا."
    },
    "today": {
      "title": "الحروف التي تتبّعتها اليوم",
      "hint": "يظهر هنا ما تتبّعته اليوم فقط. وعندما يأتي يوم جديد، تبدأ القائمة من جديد.",
      "empty": "لم تتتبّع أي حرف اليوم بعد.",
      "tapHint": "اضغط على حرف لتتبّعه مرة أخرى.",
      "go": "ابدأ التتبّع"
    }
  }
});
/* ---- /ar ---- */
/* 翻訳前の仮置き: de〜ar は en を流用する(翻訳Workflowで各言語を書いたらこの行より上に追加し、ここは残してよい) */
['de','fr','es','it','pt','nl','sv','ko','zh','ar'].forEach(function(l){
  if(!TBL[l]) TBL[l] = JSON.parse(JSON.stringify(en));
});
window.MOJI_I18N = TBL;
})();
