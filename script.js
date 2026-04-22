/* ============================================================
   CRISE DOS 20 — Lógica da Aplicação
   ============================================================ */

// ============================================================
// DADOS — VERSÃO 1
// ============================================================

const IMAGES_V1 = [
  { src: 'media/images/img11.png' },
  { src: 'media/images/img12.png' },
  { src: 'media/images/img13.png' },
  { src: 'media/images/img14.png' },
  { src: 'media/images/img15.png' },
  { src: 'media/images/img16.png' },
  { src: 'media/images/img18.png' },
  { src: 'media/images/img19.png' },
  { src: 'media/images/img20.png' },
  { src: 'media/images/img21.png' },
  { src: 'media/images/img22.png' },
  { src: 'media/images/img23.png' },
  { src: 'media/images/img25.png' },
  { src: 'media/images/img27.png' },
  { src: 'media/images/img28.png' },
  { src: 'media/images/img_est01.png' },
];

// ============================================================
// DADOS — VERSÃO 2
// Capítulos = marcas de tempo dentro de um único vídeo (como YouTube)
// ============================================================

// Capítulos com timestamps reais do vídeo crise_dos_20.mp4 (4:02 = 242s)
// 0:26=26s | 1:44=104s | 2:09=129s | 2:56=176s | 3:23=203s
const CHAPTERS_V2 = [
  {
    title: 'Vinte e Perdido',
    theme: 'Toda a gente diz que os 20 são os melhores anos da tua vida.',
    start: 0,
  },
  {
    title: 'O Convite',
    theme: 'Redes sociais, candidaturas, a rejeição silenciosa.',
    start: 26,   // 0:26
  },
  {
    title: 'A Caminhada',
    theme: 'Toda a gente parece estar dentro de uma vida que funciona.',
    start: 104,  // 1:44
  },
  {
    title: 'A Cobrança',
    theme: 'E eu? Onde estou eu?',
    start: 129,  // 2:09
  },
  {
    title: 'O Casamento',
    theme: 'Rodeado de gente. Completamente sozinho.',
    start: 176,  // 2:56
  },
  {
    title: 'O Fim',
    theme: 'E vai ser outro dia igual. E está bem.',
    start: 203,  // 3:23
  },
];

// Legendas alinhadas com o vídeo crise_dos_20.mp4 (4:02)
// Baseadas na análise frame a frame — substituíveis por ficheiro .srt
const DEFAULT_SUBS_V2 = [
  // 0:00 — abertura (Kalu ao espelho)
  { start:   0, end:   6, text: '"Vinte e Perdido"' },

  // 0:15 — Kalu vê mensagem no telemóvel
  { start:  13, end:  25, text: 'Mano! Vou casar! 🎉 Quero que sejas padrinho!' },

  // 0:26 — feed das redes sociais
  { start:  26, end:  36, text: 'Nova fase. A vida tá boa! 🚗 — 487 likes' },
  { start:  37, end:  46, text: 'Trabalho duro, recompensa certa. ✈️' },

  // 0:45 — mesa de cozinha, mensagem da mãe
  { start:  48, end:  59, text: 'Aquece isso. Hoje ligas àquela empresa? 🤍 — Mãe' },

  // 1:00 — sofá, computador fechado
  { start:  63, end:  74, text: 'Quarenta e três candidaturas. A frase que já decorei de tanto ler.' },

  // 1:15 — email de rejeição no telemóvel
  { start:  76, end:  83, text: 'A sua candidatura — Resultado' },
  { start:  84, end:  96, text: 'O coração acelera sempre. Mesmo quando já sabes o que vem a seguir.' },
  { start:  97, end: 104, text: '...avançámos com outro candidato.' },

  // 1:30 — café com o amigo (diálogo)
  { start: 105, end: 114, text: 'Miguel: "Mano, já tens namorada? E o emprego, como está?"' },
  { start: 115, end: 124, text: 'Kalu: "Ando em processos. As coisas estão a andar."' },
  { start: 125, end: 132, text: 'Os dois sabemos que isso não significa nada.' },

  // 1:44 — caminhada na rua (A Caminhada)
  { start: 134, end: 146, text: 'Toda a gente parece estar dentro de uma vida que funciona.' },
  { start: 147, end: 158, text: 'E eu pareço estar do lado de fora da vitrine, a ver.' },

  // 2:00 — telemóvel com "Eu não."
  { start: 159, end: 170, text: 'Janeiro. Fevereiro. Março. Os meses mudam. Eu não.' },

  // 2:09 — quarto escuro, cobrança da família (A Cobrança)
  { start: 171, end: 182, text: 'Cheguei a casa. Não acendi a luz. Fiquei assim um bocado.' },

  // 2:30 — rua, a escrever no telemóvel
  { start: 183, end: 193, text: 'Não liguei a ninguém. Não havia nada a dizer.' },

  // 2:45 — ginásio
  { start: 194, end: 202, text: 'Saí antes do fim. Ninguém reparou.' },

  // 3:23 — ecrã escuro com telemóvel (O Fim)
  { start: 203, end: 212, text: 'Ainda não tenho emprego. Ainda sou solteiro. Ainda não sei onde estarei daqui a um ano.' },

  // 3:35 — resolução
  { start: 213, end: 227, text: 'Mas amanhã vou acordar. Vou desligar o alarme. E vai ser outro dia igual. E está bem. Por agora, está bem.' },

  // 3:30 — estatísticas (texto já no vídeo, sem legenda sobreposta)

  // 3:45 — texto final
  { start: 228, end: 242, text: 'Ele não desistiu. Só ainda não chegou. E isso também é coragem.' },
];

// ============================================================
// ESTADO
// ============================================================

const v1State = {
  images:    [],
  idx:       0,
  playing:   false,
  intervalMs: 5000,
  animFrame: null,
  startTime: 0,
  dragFrom:  null,
};

const v2State = {
  chapters:      [],
  activeChapter: 0,
  videoSrc:      'media/videos/crise_dos_20.mp4',
  videoBlobUrl:  null,
  audioSrc:      null,         // caminho padrão ou blob URL do áudio carregado
  audioBlobUrl:  null,         // apenas para revogação do blob
  subtitles:     [],
  subtitlesOn:   false,
  audioOn:       false,
  toastTimer:    null,
};

// ============================================================
// UTIL
// ============================================================

const $ = id => document.getElementById(id);

function fmt(s) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function showScreen(which) {
  ['intro', 'v1', 'v2'].forEach(id =>
    $(`screen-${id}`).classList.toggle('active', id === which)
  );
}

function startVersion(v) {
  if (v === 1) startV1();
  else         startV2();
}

function goHome() {
  $('v1-music').pause();
  v1StopTimer();
  $('v2-video').pause();
  const aud = $('v2-audio');
  aud.pause();
  aud.src = '';
  if (v2State.audioBlobUrl) { URL.revokeObjectURL(v2State.audioBlobUrl); v2State.audioBlobUrl = null; }
  v2State.audioSrc = null;
  if (document.fullscreenElement) document.exitFullscreen();
  showScreen('intro');
}

// ============================================================
// VERSÃO 1 — SLIDESHOW
// ============================================================

function initV1() {
  $('v1-btn-home').addEventListener('click', goHome);
  $('v1-nav-prev').addEventListener('click', () => v1Goto(v1State.idx - 1, true));
  $('v1-nav-next').addEventListener('click', () => v1Goto(v1State.idx + 1, true));
  $('v1-btn-prev').addEventListener('click', () => v1Goto(v1State.idx - 1, true));
  $('v1-btn-next').addEventListener('click', () => v1Goto(v1State.idx + 1, true));
  $('v1-btn-play').addEventListener('click', v1TogglePlay);
  $('v1-btn-upload').addEventListener('click', () => $('v1-file-input').click());
  $('v1-file-input').addEventListener('change', v1OnUpload);
  $('v1-btn-music').addEventListener('click', v1ToggleMusic);

  document.addEventListener('keydown', e => {
    if (!$('screen-v1').classList.contains('active')) return;
    if (e.key === 'ArrowRight') v1Goto(v1State.idx + 1, true);
    if (e.key === 'ArrowLeft')  v1Goto(v1State.idx - 1, true);
    if (e.key === ' ') { e.preventDefault(); v1TogglePlay(); }
    if (e.key === 'Escape') goHome();
  });
}

function startV1() {
  v1State.images  = IMAGES_V1.map(img => ({ ...img }));
  v1State.idx     = 0;
  v1State.playing = false;
  showScreen('v1');
  v1RenderStrip();
  v1ShowImage(0);
  const music = $('v1-music');
  music.volume = 0.3;
  music.currentTime = 0;
  music.play().catch(() => {});
  v1State.playing = true;
  v1UpdatePlayBtn();
  v1StartTimer();
}

function v1ShowImage(idx) {
  const n = v1State.images.length;
  if (!n) return;
  idx = ((idx % n) + n) % n;
  v1State.idx = idx;
  const item = v1State.images[idx];
  const img = $('v1-img');
  const ph  = $('v1-placeholder');
  img.style.opacity = '0';
  const tmp = new Image();
  tmp.onload = () => {
    img.src = item.blobUrl || item.src;
    img.style.display = '';
    ph.style.display  = 'none';
    requestAnimationFrame(() => { img.style.opacity = '1'; });
  };
  tmp.onerror = () => {
    img.style.display = 'none';
    ph.style.display  = 'flex';
  };
  tmp.src = item.blobUrl || item.src;
  $('v1-counter').textContent    = `${idx + 1} / ${n}`;
  $('v1-slide-info').textContent = `Slide ${idx + 1} de ${n}`;
  document.querySelectorAll('.v1-thumb').forEach((t, i) =>
    t.classList.toggle('active', i === idx)
  );
  v1ScrollToThumb(idx);
}

function v1Goto(idx, resetTimer) {
  const n = v1State.images.length;
  if (!n) return;
  idx = ((idx % n) + n) % n;
  v1ShowImage(idx);
  if (resetTimer && v1State.playing) v1RestartTimer();
}

function v1TogglePlay() {
  v1State.playing = !v1State.playing;
  const music = $('v1-music');
  if (v1State.playing) {
    music.play().catch(() => {});
    v1StartTimer();
  } else {
    music.pause();
    v1StopTimer();
  }
  v1UpdatePlayBtn();
}

function v1UpdatePlayBtn() {
  const btn    = $('v1-btn-play');
  const status = $('v1-music-status');
  if (v1State.playing) {
    btn.innerHTML = '&#9646;&#9646;';
    btn.title = 'Pausar';
    status.textContent = '♫ A reproduzir';
    status.classList.add('playing');
  } else {
    btn.innerHTML = '&#9654;';
    btn.title = 'Reproduzir';
    status.textContent = '♫ Em pausa';
    status.classList.remove('playing');
  }
}

function v1ToggleMusic() {
  const music  = $('v1-music');
  const btn    = $('v1-btn-music');
  const status = $('v1-music-status');
  music.muted  = !music.muted;
  if (music.muted) {
    btn.innerHTML = '&#128263;';
    btn.title     = 'Ativar música';
    btn.className = 'ctrl-btn music-off';
    status.textContent = '♫ Sem música';
    status.classList.remove('playing');
  } else {
    btn.innerHTML = '&#127925;';
    btn.title     = 'Retirar música';
    btn.className = 'ctrl-btn music-on';
    if (v1State.playing) {
      status.textContent = '♫ A reproduzir';
      status.classList.add('playing');
    }
  }
}

function v1StartTimer() {
  v1StopTimer();
  v1State.startTime = performance.now();
  v1AnimTimer();
}

function v1RestartTimer() {
  v1State.startTime = performance.now();
}

function v1StopTimer() {
  if (v1State.animFrame) {
    cancelAnimationFrame(v1State.animFrame);
    v1State.animFrame = null;
  }
  $('v1-progress-fill').style.width = '0%';
}

function v1AnimTimer() {
  if (!v1State.playing) return;
  v1State.animFrame = requestAnimationFrame(now => {
    const elapsed = now - v1State.startTime;
    const pct = Math.min(elapsed / v1State.intervalMs, 1) * 100;
    $('v1-progress-fill').style.width = pct + '%';
    if (elapsed >= v1State.intervalMs) {
      v1Goto(v1State.idx + 1, false);
      v1State.startTime = performance.now();
    }
    v1AnimTimer();
  });
}

function v1OnUpload(e) {
  Array.from(e.target.files).forEach(file => {
    v1State.images.push({ src: file.name, blobUrl: URL.createObjectURL(file) });
  });
  v1RenderStrip();
  e.target.value = '';
}

function v1RenderStrip() {
  const strip = $('v1-strip');
  strip.innerHTML = '';
  v1State.images.forEach((item, i) => {
    const thumb = document.createElement('div');
    thumb.className = `v1-thumb${i === v1State.idx ? ' active' : ''}`;
    thumb.draggable = true;

    const img = document.createElement('img');
    img.src     = item.blobUrl || item.src;
    img.alt     = `Slide ${i + 1}`;
    img.loading = 'lazy';

    const num = document.createElement('span');
    num.className   = 'thumb-num';
    num.textContent = i + 1;

    thumb.appendChild(img);
    thumb.appendChild(num);
    thumb.addEventListener('click', () => v1Goto(i, true));

    thumb.addEventListener('dragstart', ev => {
      v1State.dragFrom = i;
      thumb.classList.add('dragging');
      ev.dataTransfer.effectAllowed = 'move';
      ev.dataTransfer.setData('text/plain', String(i));
    });
    thumb.addEventListener('dragend', () => {
      thumb.classList.remove('dragging');
      strip.querySelectorAll('.v1-thumb').forEach(t => t.classList.remove('drag-over'));
    });
    thumb.addEventListener('dragover', ev => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'move';
      strip.querySelectorAll('.v1-thumb').forEach(t => t.classList.remove('drag-over'));
      thumb.classList.add('drag-over');
    });
    thumb.addEventListener('drop', ev => {
      ev.preventDefault();
      const from = v1State.dragFrom;
      const to   = i;
      if (from === null || from === to) return;
      const moved = v1State.images.splice(from, 1)[0];
      v1State.images.splice(to, 0, moved);
      if (v1State.idx === from)                          v1State.idx = to;
      else if (from < v1State.idx && to >= v1State.idx) v1State.idx--;
      else if (from > v1State.idx && to <= v1State.idx) v1State.idx++;
      v1State.dragFrom = null;
      v1RenderStrip();
      const n = v1State.images.length;
      $('v1-counter').textContent    = `${v1State.idx + 1} / ${n}`;
      $('v1-slide-info').textContent = `Slide ${v1State.idx + 1} de ${n}`;
    });

    strip.appendChild(thumb);
  });
}

function v1ScrollToThumb(idx) {
  const wrap  = $('v1-strip-wrap');
  const thumb = wrap.querySelectorAll('.v1-thumb')[idx];
  if (!thumb) return;
  wrap.scrollTo({ left: thumb.offsetLeft - wrap.offsetWidth / 2 + thumb.offsetWidth / 2, behavior: 'smooth' });
}

// ============================================================
// VERSÃO 2 — NARRATIVA ENRIQUECIDA
// Modelo: um único vídeo com capítulos (como YouTube)
// ============================================================

function initV2() {
  $('v2-btn-home').addEventListener('click', goHome);

  const video = $('v2-video');
  video.addEventListener('click',          v2TogglePlay);
  video.addEventListener('timeupdate',     v2OnTimeUpdate);
  video.addEventListener('play',           () => v2SetPlayState(true));
  video.addEventListener('pause',          () => v2SetPlayState(false));
  video.addEventListener('ended',          () => v2SetPlayState(false));
  video.addEventListener('loadedmetadata', () => { v2UpdateTime(); v2RenderChapterMarkers(); });
  video.addEventListener('progress',       v2UpdateBuffered);

  $('v2-btn-pp').addEventListener('click',  v2TogglePlay);
  $('v2-big-play').addEventListener('click', v2TogglePlay);

  const bg = $('v2-progress-bg');
  bg.addEventListener('click',      v2Seek);
  bg.addEventListener('mousemove',  e => {
    const rect = bg.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const th   = $('v2-progress-thumb');
    th.style.left    = (pct * 100) + '%';
    th.style.opacity = '1';
  });
  bg.addEventListener('mouseleave', () => { $('v2-progress-thumb').style.opacity = '0'; });

  $('v2-btn-mute').addEventListener('click', v2ToggleMute);
  $('v2-vol').addEventListener('input',      v2OnVol);
  $('v2-btn-fs').addEventListener('click',   v2ToggleFs);

  // Fullscreen: actualiza ícone do botão
  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    $('v2-btn-fs').innerHTML = isFs ? '&#x2715;' : '&#x26F6;';
    $('v2-btn-fs').title     = isFs ? 'Sair do ecrã inteiro' : 'Ecrã inteiro';
  });

  // Botões separados: Adicionar vs Ativar
  $('v2-btn-add-subs').addEventListener('click',    () => $('v2-srt-input').click());
  $('v2-btn-toggle-subs').addEventListener('click', v2ToggleSubs);
  $('v2-btn-add-aud').addEventListener('click',     () => $('v2-audio-input').click());
  $('v2-btn-toggle-aud').addEventListener('click',  v2ToggleAud);
  $('v2-btn-upload-vid').addEventListener('click',  () => $('v2-video-input').click());

  $('v2-video-input').addEventListener('change', v2OnVideoUpload);
  $('v2-srt-input').addEventListener('change',   v2OnSrtUpload);
  $('v2-audio-input').addEventListener('change', v2OnAudioUpload);

  document.addEventListener('keydown', e => {
    if (!$('screen-v2').classList.contains('active')) return;
    if (e.key === ' ') { e.preventDefault(); v2TogglePlay(); }
    if (e.key === 'Escape' && !document.fullscreenElement) goHome();
  });
}

function startV2() {
  v2State.chapters      = CHAPTERS_V2.map(c => ({ ...c }));
  v2State.activeChapter = 0;
  v2State.subtitles     = [];
  v2State.subtitlesOn   = false;
  v2State.audioOn       = false;
  v2State.videoBlobUrl  = null;
  v2State.audioBlobUrl  = null;
  v2State.audioSrc      = null;

  showScreen('v2');

  const video = $('v2-video');
  video.src = v2State.videoSrc;
  video.load();
  $('v2-upload-overlay').classList.add('hidden');

  $('v2-chapter-title-top').textContent = v2State.chapters[0].title;

  v2SetPlayState(false);
  v2UpdateTime();

  // Carrega legendas padrão do ficheiro SRT
  fetch('media/captions/crise_dos_20.srt')
    .then(r => { if (!r.ok) throw new Error(); return r.text(); })
    .then(text => {
      const subs = parseSRT(text);
      if (subs.length) {
        v2State.subtitles = subs;
        v2UpdateActionBar();
      }
    })
    .catch(() => {});

  // Carrega áudio padrão
  const defaultAudio = 'media/audio/crise_dos_20_audio.mp3';
  const aud = $('v2-audio');
  aud.src = defaultAudio;
  aud.load();
  v2State.audioSrc = defaultAudio;

  v2UpdateActionBar();
  v2RenderChapterList();
}

// ── Capítulos ─────────────────────────────────────────────

function v2SeekToChapter(idx) {
  const video = $('v2-video');
  const ch    = v2State.chapters[idx];
  video.currentTime = ch.start;
  const aud = $('v2-audio');
  if (aud.duration) aud.currentTime = ch.start;
  // Começa a reproduzir se estava parado
  if (video.paused) video.play().catch(() => {});
}

function v2UpdateActiveChapter(t) {
  let active = 0;
  for (let i = 0; i < v2State.chapters.length; i++) {
    if (t >= v2State.chapters[i].start) active = i;
  }
  if (active === v2State.activeChapter) return;
  v2State.activeChapter = active;
  const ch = v2State.chapters[active];
  $('v2-chapter-title-top').textContent = ch.title;
  v2ShowChapterToast(ch.title);
  // Atualiza destaque na lista sem re-render completo
  document.querySelectorAll('#v2-chapters-list .chapter-item').forEach((el, i) =>
    el.classList.toggle('active', i === active)
  );
  // Scroll suave para o capítulo activo
  const activeEl = document.querySelectorAll('#v2-chapters-list .chapter-item')[active];
  if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function v2ShowChapterToast(title) {
  const toast = $('v2-chapter-toast');
  toast.textContent = title;
  toast.classList.add('show');
  clearTimeout(v2State.toastTimer);
  v2State.toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function v2RenderChapterList() {
  const container = $('v2-chapters-list');
  container.innerHTML = '';
  v2State.chapters.forEach((ch, i) => {
    const active = i === v2State.activeChapter;
    const item   = document.createElement('div');
    item.className = `chapter-item${active ? ' active' : ''}`;
    item.innerHTML = `
      <div class="chapter-num">${i + 1}</div>
      <div class="chapter-info">
        <div class="chapter-title">${ch.title}</div>
        <div class="chapter-theme">${ch.theme}</div>
        <div class="chapter-time">${fmt(ch.start)}</div>
      </div>
    `;
    item.addEventListener('click', () => v2SeekToChapter(i));
    container.appendChild(item);
  });
}

function v2RenderChapterMarkers() {
  const video     = $('v2-video');
  const container = $('v2-chapter-marks');
  container.innerHTML = '';
  if (!video.duration) return;
  v2State.chapters.slice(1).forEach(ch => {
    const pct = (ch.start / video.duration) * 100;
    if (pct <= 0 || pct >= 100) return;
    const mark = document.createElement('div');
    mark.className = 'chapter-mark';
    mark.style.left = pct + '%';
    mark.title = ch.title;
    container.appendChild(mark);
  });
}

// ── Player ────────────────────────────────────────────────

function v2TogglePlay() {
  const video = $('v2-video');
  if (!video.src || video.src === window.location.href) {
    $('v2-video-input').click();
    return;
  }
  if (video.paused) {
    video.play().catch(() => {});
    if (v2State.audioOn) {
      const aud = $('v2-audio');
      aud.currentTime = video.currentTime;
      aud.play().catch(() => {});
    }
  } else {
    video.pause();
    $('v2-audio').pause();
  }
}

function v2SetPlayState(playing) {
  $('v2-big-play').classList.toggle('hidden', playing);
  $('v2-btn-pp').innerHTML = playing ? '&#9646;&#9646;' : '&#9654;';
  $('v2-btn-pp').title     = playing ? 'Pausar' : 'Reproduzir';
}

function v2Seek(e) {
  const video = $('v2-video');
  if (!video.duration) return;
  const rect = $('v2-progress-bg').getBoundingClientRect();
  const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const t    = pct * video.duration;
  video.currentTime = t;
  const aud = $('v2-audio');
  if (aud.duration) aud.currentTime = Math.min(t, aud.duration);
  v2SyncSubs(t);
}

function v2ToggleMute() {
  const video = $('v2-video');
  const aud   = $('v2-audio');
  const muted = !video.muted;
  video.muted = muted;
  aud.muted   = muted;
  $('v2-btn-mute').innerHTML = muted ? '&#128263;' : '&#128266;';
}

function v2OnVol() {
  const v = parseFloat($('v2-vol').value);
  $('v2-video').volume = v;
  $('v2-audio').volume = v;
}

function v2ToggleFs() {
  // Vai a fullscreen a coluna do player — controlo de saída está dentro
  if (!document.fullscreenElement) {
    $('v2-player-col').requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

function v2OnTimeUpdate() {
  const video = $('v2-video');
  if (!video.duration) return;
  const pct = (video.currentTime / video.duration) * 100;
  $('v2-progress-fg').style.width = pct + '%';
  v2UpdateTime();
  v2SyncSubs(video.currentTime);
  v2UpdateActiveChapter(video.currentTime);
  // Correção de drift do áudio
  const aud = $('v2-audio');
  if (v2State.audioOn && aud.src && !aud.paused && aud.duration) {
    if (Math.abs(aud.currentTime - video.currentTime) > 0.35) {
      aud.currentTime = video.currentTime;
    }
  }
}

function v2UpdateBuffered() {
  const video = $('v2-video');
  if (!video.duration || !video.buffered.length) return;
  const pct = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
  $('v2-progress-buffered').style.width = pct + '%';
}

function v2UpdateTime() {
  const video = $('v2-video');
  $('v2-time').textContent = `${fmt(video.currentTime || 0)} / ${fmt(video.duration || 0)}`;
}

// ── Legendas ─────────────────────────────────────────────

function v2SyncSubs(t) {
  const overlay = $('v2-sub-overlay');
  const subText = $('v2-sub-text');
  if (!v2State.subtitlesOn || !v2State.subtitles.length) {
    overlay.textContent = '';
    overlay.classList.remove('show');
    subText.textContent = '​';
    return;
  }
  const cue = v2State.subtitles.find(s => t >= s.start && t < s.end);
  if (cue) {
    overlay.textContent = cue.text;
    overlay.classList.add('show');
    subText.textContent = cue.text;
  } else {
    overlay.textContent = '';
    overlay.classList.remove('show');
    subText.textContent = '​';
  }
}

function v2ToggleSubs() {
  v2State.subtitlesOn = !v2State.subtitlesOn;
  v2UpdateActionBar();
  v2SyncSubs($('v2-video').currentTime || 0);
}

// ── Áudio ─────────────────────────────────────────────────

function v2ToggleAud() {
  v2State.audioOn = !v2State.audioOn;
  const aud   = $('v2-audio');
  const video = $('v2-video');
  if (v2State.audioOn && !video.paused) {
    aud.currentTime = video.currentTime;
    aud.play().catch(() => {});
  } else {
    aud.pause();
  }
  v2UpdateActionBar();
}

// ── Actualiza botões de acção ─────────────────────────────

function v2UpdateActionBar() {
  const hasSubs = v2State.subtitles.length > 0;
  const hasAud  = !!v2State.audioSrc;

  // — Legendas —
  const addSubs    = $('v2-btn-add-subs');
  const toggleSubs = $('v2-btn-toggle-subs');
  toggleSubs.hidden = !hasSubs;
  addSubs.classList.toggle('paired', hasSubs);
  if (hasSubs) {
    const on = v2State.subtitlesOn;
    toggleSubs.className = `ibtn-toggle ${on ? 'on' : 'off'}`;
    toggleSubs.innerHTML = on ? 'CC &#10003;' : 'CC';
    toggleSubs.title     = on ? 'Desativar legendas' : 'Ativar legendas';
  }

  // — Áudio —
  const addAud    = $('v2-btn-add-aud');
  const toggleAud = $('v2-btn-toggle-aud');
  toggleAud.hidden = !hasAud;
  addAud.classList.toggle('paired', hasAud);
  if (hasAud) {
    const on = v2State.audioOn;
    toggleAud.className = `ibtn-toggle ${on ? 'on' : 'off'}`;
    toggleAud.innerHTML = on ? '&#128266; On' : '&#128263; Off';
    toggleAud.title     = on ? 'Desativar áudio' : 'Ativar áudio';
  }
}

// ── Uploads ───────────────────────────────────────────────

function v2OnVideoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (v2State.videoBlobUrl) URL.revokeObjectURL(v2State.videoBlobUrl);
  v2State.videoBlobUrl = URL.createObjectURL(file);
  const video = $('v2-video');
  video.pause();
  video.src = v2State.videoBlobUrl;
  video.load();
  $('v2-upload-overlay').classList.add('hidden');
  $('v2-progress-fg').style.width       = '0%';
  $('v2-progress-buffered').style.width = '0%';
  v2SetPlayState(false);
  v2UpdateTime();
  e.target.value = '';
}

function v2OnSrtUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const subs = parseSRT(ev.target.result);
    if (!subs.length) return;
    v2State.subtitles   = subs;
    v2State.subtitlesOn = true;
    v2UpdateActionBar();
    v2SyncSubs($('v2-video').currentTime || 0);
  };
  reader.readAsText(file, 'utf-8');
  e.target.value = '';
}

function v2OnAudioUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (v2State.audioBlobUrl) URL.revokeObjectURL(v2State.audioBlobUrl);
  v2State.audioBlobUrl = URL.createObjectURL(file);
  v2State.audioSrc     = v2State.audioBlobUrl;
  const aud   = $('v2-audio');
  const video = $('v2-video');
  aud.src = v2State.audioSrc;
  aud.load();
  v2State.audioOn = true;
  if (!video.paused) {
    aud.currentTime = video.currentTime;
    aud.play().catch(() => {});
  }
  v2UpdateActionBar();
  e.target.value = '';
}

// ── Parser SRT / VTT ─────────────────────────────────────

function parseSRT(raw) {
  const subs   = [];
  const blocks = raw.trim().replace(/\r\n/g, '\n').split(/\n{2,}/);
  for (const block of blocks) {
    const lines      = block.trim().split('\n');
    const timingLine = lines.find(l => l.includes('-->'));
    if (!timingLine) continue;
    const m = timingLine.match(
      /(\d{1,2}:\d{2}:\d{2}[,.:]\d+)\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,.:]\d+)/
    );
    if (!m) continue;
    const start = parseSRTTime(m[1]);
    const end   = parseSRTTime(m[2]);
    const ti    = lines.indexOf(timingLine);
    const text  = lines.slice(ti + 1).join(' ').replace(/<[^>]+>/g, '').trim();
    if (text) subs.push({ start, end, text });
  }
  return subs;
}

function parseSRTTime(t) {
  const clean = t.replace(',', '.');
  const [main, ms = '0'] = clean.split('.');
  const [h, min, s]      = main.split(':').map(Number);
  return h * 3600 + min * 60 + s + parseFloat('0.' + ms.padEnd(3, '0'));
}

// ============================================================
// ARRANQUE
// ============================================================

function init() {
  document.querySelectorAll('.btn-enter').forEach(btn =>
    btn.addEventListener('click', () => startVersion(+btn.dataset.version))
  );
  initV1();
  initV2();
}

document.addEventListener('DOMContentLoaded', init);
