/**
 * CYBERSECURITY & HACKING TERMINAL & MEMORY GAME - JAVASCRIPT
 * Desarrollado con JavaScript puro (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. SISTEMA DE AUDIO CIBERNÉTICO (Web Audio API - Sin dependencias externas)
  // ==========================================================================
  class CyberAudio {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    initContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Sonido al pulsar teclas o botones
    playClick() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    // Sonido al voltear carta
    playFlip() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }

    // Sonido de acierto (par emparejado)
    playMatch() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde C mayor cibernético

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.26);
      });
    }

    // Sonido de fallo
    playMismatch() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    }

    // Sonido de victoria final
    playVictory() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const fanfare = [440, 554.37, 659.25, 880, 1108.73];
      fanfare.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.12);

        gain.gain.setValueAtTime(0.18, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.42);
      });
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }
  }

  const audio = new CyberAudio();

  // ==========================================================================
  // 2. EFECTO DE LLUVIA DIGITAL MATRIX (CANVAS)
  // ==========================================================================
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = '01ABCDEF0123456789$#%*&<>~={}+-/:_';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(6, 8, 12, 0.06)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    let matrixInterval = setInterval(drawMatrix, 40);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    });
  }

  // ==========================================================================
  // 3. PANTALLA DE LOGIN (TERMINAL CLI SIMULADA)
  // ==========================================================================
  const loginSection = document.getElementById('login-section');
  const gameSection = document.getElementById('game-section');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginFeedback = document.getElementById('login-feedback');
  const btnAutofill = document.getElementById('btn-autofill');
  const btnLogout = document.getElementById('btn-logout');

  // Credenciales válidas
  const VALID_USER = 'admin';
  const VALID_PASS = 'admin';

  // Botón Autofill / Bypass rápido para comodidad de prueba
  btnAutofill.addEventListener('click', () => {
    audio.playClick();
    usernameInput.value = VALID_USER;
    passwordInput.value = VALID_PASS;
    loginFeedback.textContent = '> [BYPASS] Credenciales "admin / admin" cargadas en el buffer.';
    loginFeedback.className = 'terminal-feedback';
  });

  // Procesamiento del formulario de login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    audio.playClick();

    const userVal = usernameInput.value.trim().toLowerCase();
    const passVal = passwordInput.value.trim();

    loginFeedback.textContent = '> [AUTENTICANDO] Verificando firma criptográfica en el servidor...';
    loginFeedback.className = 'terminal-feedback';

    setTimeout(() => {
      if (userVal === VALID_USER && passVal === VALID_PASS) {
        // Acceso Exitoso
        loginFeedback.textContent = '> [ACCESO CONCEDIDO] Privilegios ROOT otorgados. Abriendo Mainframe...';
        loginFeedback.className = 'terminal-feedback success';
        audio.playMatch();

        setTimeout(() => {
          loginSection.classList.add('hidden');
          gameSection.classList.remove('hidden');
          initGame();
        }, 1200);
      } else {
        // Acceso Denegado
        loginFeedback.textContent = '> [ACCESO DENEGADO] Credenciales inválidas. Intento registrado en /var/log/auth.log';
        loginFeedback.className = 'terminal-feedback error';
        audio.playMismatch();
        passwordInput.value = '';
        passwordInput.focus();
      }
    }, 600);
  });

  // Botón de Cerrar Sesión / Bloquear Terminal
  btnLogout.addEventListener('click', () => {
    audio.playClick();
    gameSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
    loginFeedback.textContent = '> [TERMINAL BLOQUEADA] Sesión cerrada de forma segura.';
    loginFeedback.className = 'terminal-feedback';
    stopTimer();
  });

  // ==========================================================================
  // 4. MINIJUEGO DE MEMORIA (CYBER MEMORY CIPHER)
  // ==========================================================================
  // Herramientas de Ciberseguridad & Hacking
  const cyberTools = [
    {
      id: 'flipper',
      name: 'Flipper Zero',
      icon: '🐬',
      category: 'hardware',
      catName: 'Hardware Pentest',
      desc: 'Dispositivo multi-herramienta para análisis RFID, NFC, Sub-1GHz e infrarrojo.'
    },
    {
      id: 'rubberducky',
      name: 'Rubber Ducky',
      icon: '🦆',
      category: 'hardware',
      catName: 'BadUSB Attack',
      desc: 'Inyector de pulsaciones de teclado a alta velocidad para pruebas de penetración física.'
    },
    {
      id: 'wireshark',
      name: 'Wireshark',
      icon: '🦈',
      category: 'network',
      catName: 'Packet Analyzer',
      desc: 'Analizador de protocolos de red para inspección profunda de tráfico en tiempo real.'
    },
    {
      id: 'nmap',
      name: 'Nmap',
      icon: '🌐',
      category: 'network',
      catName: 'Network Scanner',
      desc: 'Escáner de redes líder para descubrimiento de puertos, servicios y vulnerabilidades.'
    },
    {
      id: 'metasploit',
      name: 'Metasploit',
      icon: '💀',
      category: 'software',
      catName: 'Exploit Framework',
      desc: 'Plataforma para desarrollo, prueba y ejecución segura de exploits.'
    },
    {
      id: 'burpsuite',
      name: 'Burp Suite',
      icon: '🟠',
      category: 'software',
      catName: 'Web Pentesting',
      desc: 'Suite de seguridad para auditorías e interceptación proxy de aplicaciones web.'
    },
    {
      id: 'shodan',
      name: 'Shodan',
      icon: '👁️',
      category: 'recon',
      catName: 'OSINT Search',
      desc: 'Motor de búsqueda especializado en dispositivos y servidores conectados a Internet.'
    },
    {
      id: 'snort',
      name: 'Snort',
      icon: '🐗',
      category: 'recon',
      catName: 'IDS / IPS Shield',
      desc: 'Sistema de detección y prevención de intrusiones en redes informáticas.'
    }
  ];

  // Elementos del DOM del Juego
  const gameBoard = document.getElementById('game-board');
  const movesDisplay = document.getElementById('moves-display');
  const timeDisplay = document.getElementById('time-display');
  const pairsDisplay = document.getElementById('pairs-display');
  const accuracyDisplay = document.getElementById('accuracy-display');
  const terminalEventLog = document.getElementById('terminal-event-log');
  const btnRestart = document.getElementById('btn-restart');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const soundStatus = document.getElementById('sound-status');

  // Modal de Victoria
  const victoryModal = document.getElementById('victory-modal');
  const finalTime = document.getElementById('final-time');
  const finalMoves = document.getElementById('final-moves');
  const finalRating = document.getElementById('final-rating');
  const finalAccuracy = document.getElementById('final-accuracy');
  const btnPlayAgain = document.getElementById('btn-play-again');

  // Estado del juego
  let cards = [];
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard = null;
  let secondCard = null;
  let moves = 0;
  let matchedPairs = 0;
  const totalPairs = cyberTools.length; // 8 pares = 16 cartas

  // Timer
  let timerInterval = null;
  let secondsElapsed = 0;
  let gameStarted = false;

  // Toggle de Sonido
  btnSoundToggle.addEventListener('click', () => {
    const isEnabled = audio.toggle();
    soundIcon.textContent = isEnabled ? '🔊' : '🔇';
    soundStatus.textContent = isEnabled ? 'ON' : 'OFF';
  });

  // Algoritmo de mezcla Fisher-Yates
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Inicializar o reiniciar partida
  function initGame() {
    stopTimer();
    secondsElapsed = 0;
    moves = 0;
    matchedPairs = 0;
    gameStarted = false;
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    updateHUD();
    timeDisplay.textContent = '00:00';
    terminalEventLog.textContent = 'Mainframe reiniciado. Selecciona dos tarjetas criptográficas para comenzar.';
    victoryModal.classList.add('hidden');

    // Duplicar herramientas para formar parejas (16 cartas en total)
    const deck = shuffle([...cyberTools, ...cyberTools]);

    // Limpiar tablero
    gameBoard.innerHTML = '';

    // Renderizar cartas
    deck.forEach((tool, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('memory-card');
      cardElement.dataset.toolId = tool.id;
      cardElement.dataset.toolName = tool.name;
      cardElement.dataset.index = index;
      cardElement.setAttribute('tabindex', '0');
      cardElement.setAttribute('role', 'button');
      cardElement.setAttribute('aria-label', `Tarjeta de memoria ${index + 1}`);

      cardElement.innerHTML = `
        <div class="card-inner">
          <!-- Cara Oculta (Dorso con circuito y candado) -->
          <div class="card-face front">
            <span class="front-cipher-icon">🛡️</span>
            <span class="front-code-tag">NODE_${String(index + 1).padStart(2, '0')}</span>
          </div>

          <!-- Cara Revelada (Anverso con herramienta) -->
          <div class="card-face back">
            <span class="tool-icon">${tool.icon}</span>
            <h3 class="tool-name">${tool.name}</h3>
            <span class="tool-badge ${tool.category}">${tool.catName}</span>
          </div>
        </div>
      `;

      // Eventos de clic y teclado
      cardElement.addEventListener('click', () => handleCardFlip(cardElement, tool));
      cardElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardFlip(cardElement, tool);
        }
      });

      gameBoard.appendChild(cardElement);
    });

    cards = document.querySelectorAll('.memory-card');
  }

  // Manejador del giro de cartas
  function handleCardFlip(card, tool) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains('matched') || card.classList.contains('flipped')) return;

    // Iniciar temporizador en la primera interacción
    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }

    card.classList.add('flipped');
    audio.playFlip();

    if (!hasFlippedCard) {
      // Primera carta seleccionada
      hasFlippedCard = true;
      firstCard = card;
      terminalEventLog.textContent = `[ESCANEANDO] Nodo 1: ${tool.name}. Selecciona el segundo nodo...`;
      return;
    }

    // Segunda carta seleccionada
    secondCard = card;
    moves++;
    updateHUD();

    checkForMatch();
  }

  // Verificar si hay coincidencia
  function checkForMatch() {
    const isMatch = firstCard.dataset.toolId === secondCard.dataset.toolId;

    if (isMatch) {
      disableMatchedCards();
    } else {
      unflipCards();
    }
  }

  // Si coinciden: bloquearlas en estado "matched"
  function disableMatchedCards() {
    lockBoard = true;
    matchedPairs++;
    updateHUD();

    const toolName = firstCard.dataset.toolName;
    terminalEventLog.textContent = `[MATCH CONFIRMADO] ¡Par de ${toolName} descifrado con éxito!`;

    setTimeout(() => {
      audio.playMatch();
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      resetTurn();

      // Comprobar victoria
      if (matchedPairs === totalPairs) {
        handleVictory();
      }
    }, 400);
  }

  // Si no coinciden: animar error y voltear de nuevo
  function unflipCards() {
    lockBoard = true;
    audio.playMismatch();

    firstCard.classList.add('shake');
    secondCard.classList.add('shake');

    terminalEventLog.textContent = '[ERROR DE LLAVE] Discrepancia criptográfica. Reintentando...';

    setTimeout(() => {
      firstCard.classList.remove('shake', 'flipped');
      secondCard.classList.remove('shake', 'flipped');
      resetTurn();
    }, 950);
  }

  // Restablecer variables del turno
  function resetTurn() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Actualizar indicadores del HUD
  function updateHUD() {
    movesDisplay.textContent = moves;
    pairsDisplay.textContent = `${matchedPairs} / ${totalPairs}`;

    // Cálculo de precisión
    if (moves > 0) {
      const accuracy = Math.round((matchedPairs / moves) * 100);
      accuracyDisplay.textContent = `${accuracy}%`;
    } else {
      accuracyDisplay.textContent = '100%';
    }
  }

  // Temporizador
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      secondsElapsed++;
      const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
      const secs = String(secondsElapsed % 60).padStart(2, '0');
      timeDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  // Gestión de Victoria
  function handleVictory() {
    stopTimer();
    audio.playVictory();

    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const secs = String(secondsElapsed % 60).padStart(2, '0');
    const timeFormatted = `${mins}:${secs}`;

    // Rango de estrellas según movimientos
    let stars = '★☆☆ (CADETE)';
    if (moves <= 12) {
      stars = '★★★ (HACKER ELITE)';
    } else if (moves <= 18) {
      stars = '★★☆ (ESPECIALISTA)';
    }

    const accuracy = Math.round((totalPairs / moves) * 100);

    // Llenar datos en el modal
    finalTime.textContent = timeFormatted;
    finalMoves.textContent = moves;
    finalRating.textContent = stars;
    finalAccuracy.textContent = `${accuracy}%`;

    terminalEventLog.textContent = '>>> [MISIÓN CUMPLIDA] Todos los sistemas han sido descifrados satisfactoriamente.';

    setTimeout(() => {
      victoryModal.classList.remove('hidden');
    }, 600);
  }

  // Event Listeners de Botones de Reinicio
  btnRestart.addEventListener('click', () => {
    audio.playClick();
    initGame();
  });

  btnPlayAgain.addEventListener('click', () => {
    audio.playClick();
    initGame();
  });

});
