/* ============================================================
   CRISE DOS 20 — Lógica da Aplicação
   ============================================================ */

// --- DADOS DAS CENAS ---

const SCENES = [
  {
    id: 0,
    title: 'O Dia Que Não Começa',
    theme: 'Toda a gente diz que os 20 são os melhores anos da tua vida.',
    type: 'video',
    video: 'media/videos/Kalu_part1.mp4',
    narration: 'media/audio/narration1.mp3',
    // Vídeo: 2min 2s = 122s. Timing estimado com base no guião.
    // Ajusta os valores start/end se o ritmo do vídeo for diferente.
    subtitles: [
      { start:   0, end:  14, text: 'Toda a gente diz que os 20 são os melhores anos da tua vida.' },
      { start:  14, end:  27, text: 'Ninguém te conta como é quando não parece assim.' },
      // Feed do telemóvel
      { start:  40, end:  51, text: '«Nova fase. A vida tá boa!» — 487 gostos' },
      { start:  51, end:  62, text: '«6h e já treinei. Sem desculpas!» — 312 gostos' },
      { start:  62, end:  72, text: '«Trabalho duro, recompensa certa.»' },
      // Pousa o telemóvel
      { start:  74, end:  87, text: 'Às vezes fecho o telemóvel e fico a olhar para o nada.' },
      { start:  87, end: 100, text: 'Não porque estou a pensar. Mas porque não consigo pensar em nada.' },
      // Computador, fecha, deita-se
      { start: 108, end: 122, text: 'Hoje não. Amanhã começo de novo.' },
    ],
  },
  {
    id: 1,
    title: 'O Convite',
    theme: 'E eu? Onde estou eu?',
    type: 'gallery',
    images: [
      { src: 'media/images/img11.png', caption: 'Encontro apenas razões para me sentir para trás.' },
      { src: 'media/images/img12.png', caption: 'Toda a gente avança e eu fico parado.' },
      { src: 'media/images/img13.png', caption: 'Eu tenho 23 e ainda peço boleia à minha mãe.' },
      { src: 'media/images/img14.png', caption: 'Fácil de dizer quando o trabalho apareceu.' },
      { src: 'media/images/img15.png', caption: 'Fecho o telemóvel. Mas as imagens ficam.' },
      { src: 'media/images/img16.png', caption: 'A pergunta que aparece em todas as refeições.' },
      { src: 'media/images/img18.png', caption: 'Toda a gente tem um filho de alguém que já conseguiu.' },
      { src: 'media/images/img19.png', caption: 'Dezembro é o mês das perguntas que ninguém devia fazer.' },
      { src: 'media/images/img20.png', caption: 'O coração acelera sempre. Mesmo quando já sabes.' },
      { src: 'media/images/img21.png', caption: 'A frase que já decorei de tanto ler.' },
      { src: 'media/images/img22.png', caption: 'Não chorei. Só fiquei assim por uns minutos.' },
      { src: 'media/images/img23.png', caption: 'Quarenta e três candidaturas. Zero respostas positivas.' },
      { src: 'media/images/img25.png', caption: 'Hoje ele usa fato e eu uso as mesmas calças de há três dias.' },
      { src: 'media/images/img27.png', caption: 'Fiquei aqui sentado uma hora sem perceber porquê.' },
      { src: 'media/images/img28.png', caption: 'Toda a gente tem pressa. Eu já não sei para onde ir.' },
      { src: 'media/images/img_est01.png', caption: 'Os meses mudam. Eu não.' },
    ],
    narration: 'media/audio/narration2.mp3',
  },
  {
    id: 2,
    title: 'Um Dia de Cada Vez',
    theme: 'Um bom dia de cada vez.',
    type: 'video',
    video: 'media/videos/video2.mp4',
    narration: 'media/audio/narration3.mp3',
    // Timing estimado — ajusta quando gravares o vídeo.
    subtitles: [
      { start:  0, end: 10, text: 'Há dias em que paro de tentar perceber tudo de uma vez.' },
      { start: 10, end: 18, text: 'E só... fico.' },
      { start: 24, end: 35, text: 'Fui porque precisava. E isso também conta.' },
      { start: 48, end: 62, text: 'Ainda não tenho emprego. Ainda sou solteiro.' },
      { start: 62, end: 75, text: 'Ainda não sei onde estarei daqui a um ano.' },
      { start: 75, end: 88, text: 'Mas hoje foi um bom dia.' },
      { start: 88, end: 104, text: 'E talvez seja isso — um bom dia de cada vez.' },
      { start: 110, end: 130, text: 'Para quem está nos 20 e sente que ficou para trás — não ficaste. Só estás no teu próprio ritmo.' },
    ],
  },
];

// --- ESTADO ---

const state = {
  version:     1,
  sceneIdx:    0,
  subtitlesOn: false,
  audioOn:     false,
  imgIdx:      0,
  galTimer:    null,
  galAnimFrame: null,
  galInterval: 7000,   // ms por imagem
  galStartTime: 0,
};

// --- DOM ---

const $ = id => document.getElementById(id);

const D = {
  introScreen:  $('screen-intro'),
  playerScreen: $('screen-player'),
  // intro
  btnEnter:     document.querySelectorAll('.btn-enter'),
  // topbar
  btnHome:      $('btn-home'),
  vLabel:       $('v-label'),
  vNameLabel:   $('v-name-label'),
  sceneN:       $('scene-n'),
  // scene head
  sceneEyebrow: $('scene-eyebrow'),
  sceneTitle:   $('scene-title'),
  sceneTheme:   $('scene-theme'),
  // video
  panelVideo:   $('panel-video'),
  mainVideo:    $('main-video'),
  subOverlay:   $('sub-overlay'),
  bigPlay:      $('big-play'),
  btnPP:        $('btn-pp'),
  iconPlay:     $('icon-play'),
  iconPause:    $('icon-pause'),
  progressBg:   $('progress-bg'),
  progressFg:   $('progress-fg'),
  btnMute:      $('btn-mute'),
  volRange:     $('vol-range'),
  volPct:       $('vol-pct'),
  timeTxt:      $('time-txt'),
  btnFs:        $('btn-fs'),
  // gallery
  panelGallery: $('panel-gallery'),
  galImg:       $('gal-img'),
  galPlaceholder: $('gal-placeholder'),
  phName:       $('ph-name'),
  galCaption:   $('gal-caption'),
  btnGiPrev:    $('btn-gi-prev'),
  btnGiNext:    $('btn-gi-next'),
  galDots:      $('gal-dots'),
  galCounter:   $('gal-counter'),
  galTimerFill: $('gal-timer-fill'),
  // subtitles + audio
  subBar:       $('sub-bar'),
  subText:      $('sub-text'),
  interactBar:  $('interact-bar'),
  btnSubs:      $('btn-subs'),
  btnAud:       $('btn-aud'),
  // audio
  audMelody:    $('aud-melody'),
  audNarr:      $('aud-narr'),
  narrSrc:      $('narr-src'),
  // nav
  btnPrevScene: $('btn-prev-scene'),
  btnNextScene: $('btn-next-scene'),
  sceneDots:    document.querySelectorAll('.sdot'),
};

// --- INICIALIZAÇÃO ---

function init() {
  D.btnEnter.forEach(btn =>
    btn.addEventListener('click', e => {
      e.stopPropagation();
      startVersion(+btn.dataset.version);
    })
  );

  D.btnHome.addEventListener('click', goHome);

  // Video
  D.bigPlay.addEventListener('click', togglePlay);
  D.btnPP.addEventListener('click', togglePlay);
  D.progressBg.addEventListener('click', seekVideo);
  D.btnMute.addEventListener('click', toggleMute);
  D.volRange.addEventListener('input', onVolChange);
  D.btnFs.addEventListener('click', toggleFullscreen);
  D.mainVideo.addEventListener('timeupdate', onTimeUpdate);
  D.mainVideo.addEventListener('play',   () => setPlayState(true));
  D.mainVideo.addEventListener('pause',  () => setPlayState(false));
  D.mainVideo.addEventListener('ended',  () => setPlayState(false));
  D.mainVideo.addEventListener('loadedmetadata', updateTimeTxt);

  // Gallery
  D.btnGiPrev.addEventListener('click', () => navGallery(-1));
  D.btnGiNext.addEventListener('click', () => navGallery(+1));

  // Interactive
  D.btnSubs.addEventListener('click', toggleSubs);
  D.btnAud.addEventListener('click',  toggleAud);

  // Scene nav
  D.btnPrevScene.addEventListener('click', () => changeScene(state.sceneIdx - 1));
  D.btnNextScene.addEventListener('click', () => changeScene(state.sceneIdx + 1));
  D.sceneDots.forEach(dot =>
    dot.addEventListener('click', () => changeScene(+dot.dataset.idx))
  );

  // Keyboard
  document.addEventListener('keydown', onKey);
}

// --- VERSÃO ---

function startVersion(v) {
  state.version     = v;
  state.sceneIdx    = 0;
  state.subtitlesOn = false;
  state.audioOn     = false;

  D.vLabel.textContent     = `VERSÃO ${v}`;
  D.vNameLabel.textContent = v === 1 ? 'Narrativa Visual' : 'Narrativa Interativa';

  if (v === 2) {
    D.subBar.classList.add('show');
    D.interactBar.classList.add('show');
    setBtnState(D.btnSubs, false, 'Adicionar Legendas');
    setBtnState(D.btnAud,  false, 'Ativar Áudio');
  } else {
    D.subBar.classList.remove('show');
    D.interactBar.classList.remove('show');
  }

  showScreen('player');

  // Melodia de fundo em V1
  if (v === 1) {
    D.audMelody.volume = 0.28;
    D.audMelody.play().catch(() => {});
  } else {
    D.audMelody.pause();
    D.audMelody.currentTime = 0;
  }

  loadScene(0);
}

function setBtnState(btn, on, label) {
  btn.className = `ibtn ${on ? 'on' : 'off'}`;
  btn.textContent = label;
}

// --- ECRÃS ---

function showScreen(which) {
  D.introScreen.classList.toggle('active', which === 'intro');
  D.playerScreen.classList.toggle('active', which === 'player');
}

function goHome() {
  stopAll();
  state.subtitlesOn = false;
  state.audioOn     = false;
  showScreen('intro');
}

function stopAll() {
  D.mainVideo.pause();
  D.audMelody.pause();
  D.audNarr.pause();
  clearGalTimer();
}

// --- CARREGAMENTO DE CENA ---

function loadScene(idx) {
  const scene = SCENES[idx];
  state.sceneIdx = idx;
  state.imgIdx   = 0;

  D.mainVideo.pause();
  clearGalTimer();
  D.audNarr.pause();

  // Header
  D.sceneN.textContent       = idx + 1;
  D.sceneEyebrow.textContent = `CENA ${idx + 1}`;
  D.sceneTitle.textContent   = scene.title;
  D.sceneTheme.textContent   = scene.theme;

  // Nav dots + botões
  D.btnPrevScene.disabled = idx === 0;
  D.btnNextScene.disabled = idx === SCENES.length - 1;
  D.sceneDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));

  // Limpar legendas
  D.subOverlay.textContent = '';
  D.subOverlay.classList.remove('show');
  D.subText.textContent = '\u200B';

  // Narração V2
  if (state.version === 2 && scene.narration) {
    D.narrSrc.src = scene.narration;
    D.audNarr.load();
    if (state.audioOn) D.audNarr.play().catch(() => {});
  }

  // Painel correto
  const isVideo = scene.type === 'video';
  D.panelVideo.style.display   = isVideo ? '' : 'none';
  D.panelGallery.style.display = isVideo ? 'none' : '';

  if (isVideo) {
    loadVideoScene(scene);
  } else {
    loadGalleryScene(scene);
  }
}

// --- VÍDEO ---

function loadVideoScene(scene) {
  D.mainVideo.src = scene.video;
  D.mainVideo.load();
  D.mainVideo.muted = true;  // vídeo sempre mudo; narração é separada
  setPlayState(false);
  updateTimeTxt();
}

function togglePlay() {
  if (D.mainVideo.paused) {
    D.mainVideo.play().catch(() => {});
  } else {
    D.mainVideo.pause();
  }
}

function setPlayState(playing) {
  D.bigPlay.classList.toggle('hidden', playing);
  D.iconPlay.style.display  = playing ? 'none' : '';
  D.iconPause.style.display = playing ? '' : 'none';
}

function seekVideo(e) {
  const rect    = D.progressBg.getBoundingClientRect();
  const pct     = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const newTime = pct * (D.mainVideo.duration || 0);
  D.mainVideo.currentTime = newTime;
  // Sincroniza narração com o vídeo
  if (state.audioOn && D.audNarr.duration) {
    D.audNarr.currentTime = Math.min(newTime, D.audNarr.duration);
  }
  // Atualiza legenda imediatamente (sem esperar pelo timeupdate)
  syncSubtitleOverlay(newTime);
}

function toggleMute() {
  const muted = !D.audMelody.muted;
  D.audMelody.muted = muted;
  D.audNarr.muted   = muted;
  D.btnMute.textContent = muted ? '🔇' : '🔊';
}

function onVolChange() {
  const v = parseFloat(D.volRange.value);
  D.audMelody.volume = v * 0.28;
  D.audNarr.volume   = v;
  D.volPct.textContent = Math.round(v * 100) + '%';
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    D.panelVideo.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

function onTimeUpdate() {
  const video = D.mainVideo;
  if (!video.duration) return;
  const pct = (video.currentTime / video.duration) * 100;
  D.progressFg.style.width = pct + '%';
  updateTimeTxt();
  syncSubtitleOverlay(video.currentTime);
}

function updateTimeTxt() {
  const c = D.mainVideo.currentTime || 0;
  const d = D.mainVideo.duration    || 0;
  D.timeTxt.textContent = `${fmt(c)} / ${fmt(d)}`;
}

function fmt(s) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function syncSubtitleOverlay(t) {
  if (state.version !== 2 || !state.subtitlesOn) {
    D.subOverlay.classList.remove('show');
    D.subText.textContent = '\u200B';
    return;
  }
  const scene = SCENES[state.sceneIdx];
  const cue = (scene.subtitles || []).find(s => t >= s.start && t < s.end);
  if (cue) {
    D.subOverlay.textContent = cue.text;
    D.subOverlay.classList.add('show');
    D.subText.textContent = cue.text;
  } else {
    D.subOverlay.classList.remove('show');
    D.subText.textContent = '\u200B';
  }
}

// --- GALERIA ---

function loadGalleryScene(scene) {
  // Criar dots
  D.galDots.innerHTML = '';
  scene.images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `gdot${i === 0 ? ' active' : ''}`;
    dot.title = `Imagem ${i + 1}`;
    dot.addEventListener('click', () => gotoImage(scene, i));
    D.galDots.appendChild(dot);
  });

  showImage(scene, 0);
  startGalTimer(scene);
}

function showImage(scene, idx) {
  state.imgIdx = idx;
  const item = scene.images[idx];

  D.galImg.style.opacity = '0';
  D.galPlaceholder.style.display = 'none';
  D.galImg.style.display = '';

  // Carregar imagem
  const tmpImg = new Image();
  tmpImg.onload = () => {
    D.galImg.src = item.src;
    requestAnimationFrame(() => {
      D.galImg.style.opacity = '1';
    });
    D.galPlaceholder.style.display = 'none';
  };
  tmpImg.onerror = () => {
    D.galImg.style.display = 'none';
    D.phName.textContent = item.src.split('/').pop();
    D.galPlaceholder.style.display = 'flex';
  };
  tmpImg.src = item.src;

  // Counter e dots
  D.galCounter.textContent = `${idx + 1} / ${scene.images.length}`;
  document.querySelectorAll('.gdot').forEach((d, i) =>
    d.classList.toggle('active', i === idx)
  );

  // Caption (V2 legendas)
  if (state.version === 2 && state.subtitlesOn) {
    D.galCaption.textContent = item.caption;
    D.galCaption.classList.add('show');
    D.subText.textContent = item.caption;
  } else {
    D.galCaption.classList.remove('show');
    D.subText.textContent = '\u200B';
  }
}

function gotoImage(scene, idx) {
  showImage(scene, idx);
  restartGalTimer(scene);
}

function navGallery(dir) {
  const scene = SCENES[state.sceneIdx];
  const next  = (state.imgIdx + dir + scene.images.length) % scene.images.length;
  gotoImage(scene, next);
}

function startGalTimer(scene) {
  clearGalTimer();
  state.galStartTime = performance.now();
  animGalTimer(scene);
}

function animGalTimer(scene) {
  state.galAnimFrame = requestAnimationFrame(now => {
    const elapsed = now - state.galStartTime;
    const pct = Math.min(elapsed / state.galInterval, 1) * 100;
    D.galTimerFill.style.width = pct + '%';

    if (elapsed >= state.galInterval) {
      const next = (state.imgIdx + 1) % scene.images.length;
      showImage(scene, next);
      state.galStartTime = performance.now();
    }
    animGalTimer(scene);
  });
}

function clearGalTimer() {
  if (state.galAnimFrame) {
    cancelAnimationFrame(state.galAnimFrame);
    state.galAnimFrame = null;
  }
  D.galTimerFill.style.width = '0%';
}

function restartGalTimer(scene) {
  clearGalTimer();
  state.galStartTime = performance.now();
  animGalTimer(scene);
}

// --- CONTROLOS INTERATIVOS ---

function toggleSubs() {
  state.subtitlesOn = !state.subtitlesOn;
  setBtnState(D.btnSubs, state.subtitlesOn,
    state.subtitlesOn ? 'Remover Legendas' : 'Adicionar Legendas'
  );

  const scene = SCENES[state.sceneIdx];
  if (scene.type === 'gallery') {
    const item = scene.images[state.imgIdx];
    if (state.subtitlesOn) {
      D.galCaption.textContent = item.caption;
      D.galCaption.classList.add('show');
      D.subText.textContent = item.caption;
    } else {
      D.galCaption.classList.remove('show');
      D.subText.textContent = '\u200B';
    }
  } else {
    if (!state.subtitlesOn) {
      D.subOverlay.classList.remove('show');
      D.subText.textContent = '\u200B';
    }
  }
}

function toggleAud() {
  state.audioOn = !state.audioOn;
  setBtnState(D.btnAud, state.audioOn,
    state.audioOn ? 'Desativar Áudio' : 'Ativar Áudio'
  );

  if (state.audioOn) {
    D.audNarr.play().catch(() => {});
    // Reduz melodia de fundo para não competir
    D.audMelody.volume = 0.07;
  } else {
    D.audNarr.pause();
    D.audMelody.volume = 0.28;
  }
}

// --- NAVEGAÇÃO DE CENAS ---

function changeScene(idx) {
  if (idx < 0 || idx >= SCENES.length) return;

  const area = document.getElementById('media-area');
  area.style.opacity = '0';
  area.style.transition = 'opacity 0.3s';

  setTimeout(() => {
    loadScene(idx);
    area.style.opacity = '1';
  }, 300);
}

// --- TECLADO ---

function onKey(e) {
  if (!D.playerScreen.classList.contains('active')) return;
  const scene = SCENES[state.sceneIdx];

  switch (e.key) {
    case ' ':
    case 'k':
      if (scene.type === 'video') { e.preventDefault(); togglePlay(); }
      break;
    case 'ArrowRight':
      if (e.altKey) changeScene(state.sceneIdx + 1);
      else if (scene.type === 'gallery') navGallery(+1);
      break;
    case 'ArrowLeft':
      if (e.altKey) changeScene(state.sceneIdx - 1);
      else if (scene.type === 'gallery') navGallery(-1);
      break;
    case 'Escape':
      goHome();
      break;
  }
}

// --- ARRANQUE ---

document.addEventListener('DOMContentLoaded', init);
