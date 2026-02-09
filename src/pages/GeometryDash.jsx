import { useEffect, useRef, useState } from 'react';
import '../styles/geometry-dash.css';

const GeometryDash = () => {
  const canvasRef = useRef(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 400;
    const GROUND_Y = 320;
    const CEILING_Y = 50;

    // Game constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -11;
    const SHIP_GRAVITY = 0.25;
    const SHIP_LIFT = -0.5;
    const BASE_SPEED = 5;

    let animationId = null;
    let lastTime = 0;
    let speed = BASE_SPEED;
    let progress = 0;
    let bestProgress = Number(localStorage.getItem('gdBestProgress') || 0);

    const game = {
      started: false,
      gameOver: false,
      paused: false,
      practiceMode: practiceMode,
    };

    // Player modes
    const MODE = {
      CUBE: 'cube',
      SHIP: 'ship',
    };

    const player = {
      x: 100,
      y: GROUND_Y - 30,
      w: 30,
      h: 30,
      vy: 0,
      rotation: 0,
      mode: MODE.CUBE,
      onGround: false,
      holding: false,
    };

    let obstacles = [];
    let portals = [];
    let particles = [];
    let checkpoints = [];
    let currentCheckpoint = null;
    let levelOffset = 0;

    // Level generation
    const generateLevel = () => {
      obstacles = [];
      portals = [];
      checkpoints = [];
      levelOffset = 0;

      let currentX = 400;
      let currentMode = MODE.CUBE;

      // Generate sections
      for (let i = 0; i < 20; i++) {
        const sectionType = Math.random();

        if (sectionType < 0.3 && currentMode === MODE.CUBE) {
          // Add ship portal section
          portals.push({
            x: currentX,
            y: GROUND_Y - 60,
            w: 40,
            h: 60,
            type: 'ship',
          });
          currentMode = MODE.SHIP;
          currentX += 200;

          // Add ship obstacles (saws and blocks)
          for (let j = 0; j < 3; j++) {
            const obstacleType = Math.random();
            if (obstacleType < 0.5) {
              // Floating block
              obstacles.push({
                x: currentX,
                y: 150 + Math.random() * 100,
                w: 40,
                h: 40,
                type: 'block',
              });
            } else {
              // Saw on ceiling or ground
              obstacles.push({
                x: currentX,
                y: Math.random() < 0.5 ? CEILING_Y + 20 : GROUND_Y - 20,
                w: 30,
                h: 30,
                type: 'saw',
                rotation: 0,
              });
            }
            currentX += 250 + Math.random() * 100;
          }

          // Add cube portal to return
          portals.push({
            x: currentX,
            y: GROUND_Y - 60,
            w: 40,
            h: 60,
            type: 'cube',
          });
          currentMode = MODE.CUBE;
          currentX += 200;
        } else {
          // Cube section with spikes and blocks
          const numObstacles = 2 + Math.floor(Math.random() * 3);
          for (let j = 0; j < numObstacles; j++) {
            const obstacleType = Math.random();
            if (obstacleType < 0.6) {
              // Spike
              obstacles.push({
                x: currentX,
                y: GROUND_Y - 30,
                w: 30,
                h: 30,
                type: 'spike',
              });
            } else {
              // Block with spike on top
              obstacles.push({
                x: currentX,
                y: GROUND_Y - 60,
                w: 40,
                h: 30,
                type: 'block',
              });
              obstacles.push({
                x: currentX + 5,
                y: GROUND_Y - 90,
                w: 30,
                h: 30,
                type: 'spike',
              });
            }
            currentX += 200 + Math.random() * 150;
          }
        }

        // Add checkpoint in practice mode positions
        if (i % 3 === 0) {
          checkpoints.push({
            x: currentX - 100,
            y: GROUND_Y - 100,
            activated: false,
          });
        }

        currentX += 300;
      }

      // End portal
      portals.push({
        x: currentX + 500,
        y: GROUND_Y - 60,
        w: 40,
        h: 60,
        type: 'end',
      });
    };

    const reset = (useCheckpoint = false) => {
      speed = BASE_SPEED;
      progress = 0;
      levelOffset = 0;

      if (useCheckpoint && currentCheckpoint && game.practiceMode) {
        player.x = currentCheckpoint.x - 50;
        player.y = currentCheckpoint.y + 50;
        player.vy = 0;
        player.rotation = 0;
        player.mode = MODE.CUBE;
        levelOffset = currentCheckpoint.x - 400;
      } else {
        player.x = 100;
        player.y = GROUND_Y - 30;
        player.vy = 0;
        player.rotation = 0;
        player.mode = MODE.CUBE;
        currentCheckpoint = null;
        checkpoints.forEach((cp) => (cp.activated = false));
      }

      player.holding = false;
      particles = [];
    };

    const createParticles = (x, y, color, count = 5) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1.0,
          color: color,
        });
      }
    };

    const jump = () => {
      if (!game.started) game.started = true;
      if (game.gameOver || game.paused) return;

      player.holding = true;

      if (player.mode === MODE.CUBE && player.onGround) {
        player.vy = JUMP_FORCE;
        player.onGround = false;
        createParticles(player.x + player.w / 2, player.y + player.h, '#00ffff', 3);
      }
    };

    const release = () => {
      player.holding = false;
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        if (game.gameOver) {
          game.gameOver = false;
          game.started = false;
          setAttempts((a) => a + 1);
          reset(game.practiceMode);
          return;
        }
        jump();
      } else if (event.code === 'KeyR') {
        event.preventDefault();
        game.gameOver = false;
        game.started = false;
        setAttempts((a) => a + 1);
        reset(false);
      } else if (event.code === 'KeyP') {
        event.preventDefault();
        game.paused = !game.paused;
      } else if (event.code === 'KeyM') {
        event.preventDefault();
        game.practiceMode = !game.practiceMode;
        setPracticeMode(game.practiceMode);
        game.gameOver = false;
        game.started = false;
        reset(false);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        release();
      }
    };

    const handlePointerDown = () => {
      if (game.gameOver) {
        game.gameOver = false;
        game.started = false;
        setAttempts((a) => a + 1);
        reset(game.practiceMode);
        return;
      }
      jump();
    };

    const handlePointerUp = () => {
      release();
    };

    const checkCollision = (a, b) => {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    };

    const drawCube = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      // Glow effect
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 15;

      // Cube body
      ctx.fillStyle = '#00ffff';
      ctx.fillRect(-size / 2, -size / 2, size, size);

      // Inner detail
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-size / 4, -size / 4, size / 2, size / 2);

      ctx.restore();
    };

    const drawShip = (x, y, w, h, rotation) => {
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      // Glow effect
      ctx.shadowColor = '#ff6b35';
      ctx.shadowBlur = 15;

      // Ship body (triangle)
      ctx.fillStyle = '#ff6b35';
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(-w / 2, -h / 2);
      ctx.lineTo(-w / 2, h / 2);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-w / 6, 0, w / 6, 0, Math.PI * 2);
      ctx.fill();

      // Engine flames if holding
      if (player.holding) {
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(-w / 2, -h / 4);
        ctx.lineTo(-w / 2 - 15 - Math.random() * 10, 0);
        ctx.lineTo(-w / 2, h / 4);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const drawSpike = (x, y, w, h) => {
      ctx.fillStyle = '#ff3333';
      ctx.shadowColor = '#ff3333';
      ctx.shadowBlur = 5;

      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + w / 2, y);
      ctx.lineTo(x + w, y + h);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const drawBlock = (x, y, w, h) => {
      ctx.fillStyle = '#6666ff';
      ctx.shadowColor = '#6666ff';
      ctx.shadowBlur = 5;
      ctx.fillRect(x, y, w, h);

      // Border
      ctx.strokeStyle = '#9999ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.shadowBlur = 0;
    };

    const drawSaw = (x, y, w, h, rotation) => {
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(rotation);

      ctx.fillStyle = '#ff6666';
      ctx.shadowColor = '#ff6666';
      ctx.shadowBlur = 5;

      // Saw blade
      const spikes = 8;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes;
        const radius = i % 2 === 0 ? w / 2 : w / 3;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Center
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, w / 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.shadowBlur = 0;
    };

    const drawPortal = (portal) => {
      const colors = {
        ship: '#00aaff',
        cube: '#ffaa00',
        end: '#00ff00',
      };

      const color = colors[portal.type] || '#ffffff';

      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;

      // Portal rings
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3 - i;
        ctx.globalAlpha = 0.8 - i * 0.2;
        ctx.beginPath();
        ctx.ellipse(
          portal.x + portal.w / 2,
          portal.y + portal.h / 2,
          portal.w / 2 + i * 5,
          portal.h / 2 + i * 8,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
      ctx.shadowBlur = 0;
    };

    const drawBackground = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Grid background
      ctx.strokeStyle = '#1a1a3a';
      ctx.lineWidth = 1;
      const gridSize = 40;
      const offset = (levelOffset * 0.5) % gridSize;

      for (let x = -offset; x < CANVAS_WIDTH; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }

      for (let y = 0; y < CANVAS_HEIGHT; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Ground line
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Ceiling line (for ship mode)
      ctx.strokeStyle = '#ff6b35';
      ctx.beginPath();
      ctx.moveTo(0, CEILING_Y);
      ctx.lineTo(CANVAS_WIDTH, CEILING_Y);
      ctx.stroke();
    };

    const draw = () => {
      drawBackground();

      // Draw checkpoints
      checkpoints.forEach((cp) => {
        if (cp.activated || game.practiceMode) {
          const screenX = cp.x - levelOffset;
          if (screenX > -50 && screenX < CANVAS_WIDTH) {
            ctx.fillStyle = cp.activated ? '#00ff00' : '#666666';
            ctx.fillRect(screenX, cp.y, 10, 30);
            ctx.fillRect(screenX - 5, cp.y + 5, 20, 20);
          }
        }
      });

      // Draw portals
      portals.forEach((portal) => {
        const screenX = portal.x - levelOffset;
        if (screenX > -100 && screenX < CANVAS_WIDTH) {
          drawPortal({ ...portal, x: screenX });
        }
      });

      // Draw obstacles
      obstacles.forEach((obs) => {
        const screenX = obs.x - levelOffset;
        if (screenX > -100 && screenX < CANVAS_WIDTH) {
          if (obs.type === 'spike') {
            drawSpike(screenX, obs.y, obs.w, obs.h);
          } else if (obs.type === 'block') {
            drawBlock(screenX, obs.y, obs.w, obs.h);
          } else if (obs.type === 'saw') {
            drawSaw(screenX, obs.y, obs.w, obs.h, obs.rotation || 0);
          }
        }
      });

      // Draw particles
      particles.forEach((p) => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - levelOffset, p.y, 4, 4);
      });
      ctx.globalAlpha = 1;

      // Draw player
      if (player.mode === MODE.CUBE) {
        drawCube(player.x, player.y, player.w, player.rotation);
      } else {
        drawShip(player.x, player.y, player.w, player.h, player.rotation);
      }

      // UI
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px system-ui';
      ctx.fillText(`Progreso: ${Math.floor(progress)}%`, 16, 30);
      ctx.fillText(`Mejor: ${Math.floor(bestProgress)}%`, 16, 50);
      ctx.fillText(`Intento: ${attempts}`, 16, 70);

      if (game.practiceMode) {
        ctx.fillStyle = '#00ff00';
        ctx.fillText('MODO PRÁCTICA', 16, 90);
      }

      // Progress bar
      ctx.fillStyle = '#333333';
      ctx.fillRect(200, 20, 400, 10);
      ctx.fillStyle = '#00ffff';
      ctx.fillRect(200, 20, (progress / 100) * 400, 10);

      // Mode indicator
      ctx.fillStyle = player.mode === MODE.CUBE ? '#00ffff' : '#ff6b35';
      ctx.font = '14px system-ui';
      ctx.fillText(player.mode === MODE.CUBE ? 'MODO: CUBO' : 'MODO: NAVE', CANVAS_WIDTH - 120, 30);

      // Start message
      if (!game.started && !game.gameOver) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Presiona ESPACIO o CLIC para jugar', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.font = '16px system-ui';
        ctx.fillText('M: Modo práctica | P: Pausa | R: Reiniciar', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
        ctx.textAlign = 'left';
      }

      // Game over
      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#ff3333';
        ctx.font = '36px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px system-ui';
        ctx.fillText('Presiona ESPACIO o CLIC para reiniciar', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
        ctx.textAlign = 'left';
      }

      // Paused
      if (game.paused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#ffff00';
        ctx.font = '36px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSA', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.textAlign = 'left';
      }
    };

    const update = (timestamp) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      if (game.started && !game.gameOver && !game.paused) {
        // Update progress
        progress += (speed * delta) / 5000;
        if (progress > 100) progress = 100;

        // Update level offset
        levelOffset += speed;

        // Player physics based on mode
        if (player.mode === MODE.CUBE) {
          // Cube physics
          player.vy += GRAVITY;
          player.y += player.vy;

          // Ground collision
          if (player.y >= GROUND_Y - player.h) {
            player.y = GROUND_Y - player.h;
            player.vy = 0;
            player.onGround = true;
            player.rotation = Math.round(player.rotation / 90) * 90;
          } else {
            player.onGround = false;
            player.rotation += 5;
          }
        } else {
          // Ship physics
          if (player.holding) {
            player.vy += SHIP_LIFT;
          } else {
            player.vy += SHIP_GRAVITY;
          }

          // Limit velocity
          player.vy = Math.max(-6, Math.min(6, player.vy));
          player.y += player.vy;

          // Screen boundaries
          if (player.y < CEILING_Y) {
            player.y = CEILING_Y;
            player.vy = 0;
          }
          if (player.y > GROUND_Y - player.h) {
            player.y = GROUND_Y - player.h;
            player.vy = 0;
          }

          // Rotation based on velocity
          player.rotation = player.vy * 3;

          // Create particles when flying
          if (player.holding && Math.random() < 0.3) {
            createParticles(player.x - 10, player.y + player.h / 2, '#ff6b35', 1);
          }
        }

        // Update obstacles (saw rotation)
        obstacles.forEach((obs) => {
          if (obs.type === 'saw') {
            obs.rotation = (obs.rotation || 0) + 0.1;
          }
        });

        // Update particles
        particles = particles.filter((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          return p.life > 0;
        });

        // Check portal collisions
        portals.forEach((portal) => {
          if (checkCollision(player, { ...portal, x: portal.x - levelOffset })) {
            if (portal.type === 'ship' && player.mode === MODE.CUBE) {
              player.mode = MODE.SHIP;
              player.y = Math.max(CEILING_Y, Math.min(player.y, GROUND_Y - player.h));
              player.vy = 0;
              createParticles(player.x + player.w / 2, player.y + player.h / 2, '#00aaff', 10);
            } else if (portal.type === 'cube' && player.mode === MODE.SHIP) {
              player.mode = MODE.CUBE;
              player.vy = 0;
              createParticles(player.x + player.w / 2, player.y + player.h / 2, '#ffaa00', 10);
            } else if (portal.type === 'end') {
              game.gameOver = true;
              game.started = false;
              if (progress > bestProgress) {
                bestProgress = 100;
                localStorage.setItem('gdBestProgress', '100');
              }
            }
          }
        });

        // Check obstacle collisions
        for (const obs of obstacles) {
          const screenObs = { ...obs, x: obs.x - levelOffset };
          if (checkCollision(player, screenObs)) {
            if (game.practiceMode) {
              // Find last checkpoint
              const lastCp = checkpoints.filter((cp) => cp.activated).pop();
              if (lastCp) {
                currentCheckpoint = lastCp;
                reset(true);
                return;
              }
            }
            game.gameOver = true;
            game.started = false;
            if (progress > bestProgress) {
              bestProgress = progress;
              localStorage.setItem('gdBestProgress', String(Math.floor(bestProgress)));
            }
            break;
          }
        }

        // Check checkpoint collisions
        checkpoints.forEach((cp) => {
          const screenCp = { ...cp, x: cp.x - levelOffset, w: 10, h: 30 };
          if (!cp.activated && checkCollision(player, screenCp)) {
            cp.activated = true;
            currentCheckpoint = cp;
            createParticles(cp.x - levelOffset, cp.y, '#00ff00', 8);
          }
        });
      }

      draw();
      animationId = requestAnimationFrame(update);
    };

    // Initialize
    generateLevel();
    reset(false);
    draw();
    animationId = requestAnimationFrame(update);

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [practiceMode, attempts]);

  return (
    <section className="geometry-dash-page">
      <h2>Geometry Dash</h2>
      <p>Salta o vuela para evitar obstáculos. Usa portales para cambiar de modo.</p>
      <div className="gd-controls">
        <span className="gd-control">
          <kbd>ESPACIO</kbd> / <kbd>CLIC</kbd> Saltar/Volar
        </span>
        <span className="gd-control">
          <kbd>R</kbd> Reiniciar
        </span>
        <span className="gd-control">
          <kbd>P</kbd> Pausa
        </span>
        <span className="gd-control">
          <kbd>M</kbd> Modo Práctica
        </span>
      </div>
      <div className="gd-canvas-wrap">
        <canvas ref={canvasRef} width={800} height={400} />
      </div>
      <div className="gd-info">
        <p>
          <strong>Modo Cubo:</strong> Salta sobre obstáculos. El cubo rota en el aire.
        </p>
        <p>
          <strong>Modo Nave:</strong> Mantén presionado para subir, suelta para bajar.
        </p>
        <p>
          <strong>Portales:</strong> Azul = Nave, Amarillo = Cubo, Verde = Meta
        </p>
      </div>
    </section>
  );
};

export default GeometryDash;
