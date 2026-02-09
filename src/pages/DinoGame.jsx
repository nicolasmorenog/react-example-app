import { useEffect, useRef } from 'react';
import '../styles/dino-game.css';

const DinoGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const groundY = 150;
    const dinoSize = 40;
    const gravity = 0.6;
    const jumpVelocity = -11;

    let animationId = null;
    let lastTime = 0;
    let speed = 6;
    let score = 0;
    let best = Number(localStorage.getItem('dinoBest') || 0);

    const game = {
      started: false,
      gameOver: false,
      nextSpawn: 900,
    };

    const dino = {
      x: 50,
      y: groundY - dinoSize,
      w: dinoSize,
      h: dinoSize,
      vy: 0,
      jumping: false,
    };

    let obstacles = [];
    let spawnTimer = 0;

    const reset = () => {
      speed = 6;
      score = 0;
      spawnTimer = 0;
      game.nextSpawn = 900 + Math.random() * 700;
      obstacles = [];
      dino.y = groundY - dinoSize;
      dino.vy = 0;
      dino.jumping = false;
    };

    const jump = () => {
      if (!game.started) game.started = true;
      if (game.gameOver) return;
      if (!dino.jumping) {
        dino.vy = jumpVelocity;
        dino.jumping = true;
      }
    };

    const handleKey = (event) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        if (game.gameOver) {
          game.gameOver = false;
          game.started = false;
          reset();
        }
        jump();
      }
    };

    const handlePointer = () => {
      if (game.gameOver) {
        game.gameOver = false;
        game.started = false;
        reset();
      }
      jump();
    };

    const isColliding = (a, b) => {
      return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#0f1b33';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.strokeStyle = '#6c8fb8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 12);
      ctx.lineTo(canvas.width, groundY + 12);
      ctx.stroke();

      // Dino
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

      // Obstacles
      ctx.fillStyle = '#3b92cc';
      obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      });

      // Score
      ctx.fillStyle = '#d3e0ee';
      ctx.font = '16px system-ui';
      ctx.fillText(`Score: ${Math.floor(score)}`, 16, 24);
      ctx.fillText(`Best: ${Math.floor(best)}`, 16, 44);

      if (!game.started && !game.gameOver) {
        ctx.fillStyle = '#d3e0ee';
        ctx.font = '18px system-ui';
        ctx.fillText('Presiona espacio o toca para jugar', 140, 90);
      }

      if (game.gameOver) {
        ctx.fillStyle = '#ff6b6b';
        ctx.font = '22px system-ui';
        ctx.fillText('Game Over', 280, 90);
        ctx.font = '16px system-ui';
        ctx.fillText('Presiona espacio o toca para reiniciar', 190, 115);
      }
    };

    const update = (timestamp) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      if (game.started && !game.gameOver) {
        score += delta * 0.01;
        speed += delta * 0.0004;

        dino.vy += gravity;
        dino.y += dino.vy;
        if (dino.y >= groundY - dinoSize) {
          dino.y = groundY - dinoSize;
          dino.vy = 0;
          dino.jumping = false;
        }

        spawnTimer += delta;
        if (spawnTimer >= game.nextSpawn) {
          const height = 26 + Math.random() * 18;
          const width = 16 + Math.random() * 12;
          obstacles.push({
            x: canvas.width + 20,
            y: groundY - height + 4,
            w: width,
            h: height,
          });
          spawnTimer = 0;
          game.nextSpawn = 800 + Math.random() * 700;
        }

        obstacles.forEach((obs) => {
          obs.x -= speed;
        });
        obstacles = obstacles.filter((obs) => obs.x + obs.w > -10);

        for (const obs of obstacles) {
          if (isColliding(dino, obs)) {
            game.gameOver = true;
            game.started = false;
            if (score > best) {
              best = score;
              localStorage.setItem('dinoBest', String(Math.floor(best)));
            }
            break;
          }
        }
      }

      draw();
      animationId = requestAnimationFrame(update);
    };

    reset();
    draw();
    animationId = requestAnimationFrame(update);

    window.addEventListener('keydown', handleKey);
    canvas.addEventListener('pointerdown', handlePointer);

    return () => {
      window.removeEventListener('keydown', handleKey);
      canvas.removeEventListener('pointerdown', handlePointer);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="dino-page">
      <h2>Dino Runner</h2>
      <p>Una versión simple del juego del dinosaurio de Chrome.</p>
      <div className="dino-canvas-wrap">
        <canvas ref={canvasRef} width={700} height={200} />
      </div>
    </section>
  );
};

export default DinoGame;
