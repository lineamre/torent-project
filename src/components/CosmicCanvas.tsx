import { useEffect, useRef } from 'react';

interface CosmicCanvasProps {
  theme?: string;
}

export default function CosmicCanvas({ theme = 'banana-cyber' }: CosmicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      color: string;
      vx: number;
      vy: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const getColors = () => {
      switch (theme) {
        case 'cosmic-gold':
          return ['#FFE600', '#FBBF24', '#F59E0B', '#FFFFFF'];
        case 'neon-matrix':
          return ['#00F2FE', '#00FF66', '#38BDF8', '#FFFFFF'];
        case 'void-amethyst':
          return ['#C084FC', '#E879F9', '#818CF8', '#FFFFFF'];
        default: // banana-cyber
          return ['#FFE600', '#FFF066', '#00F2FE', '#FF007F', '#FFFFFF'];
      }
    };

    const initParticles = () => {
      stars = [];
      const colors = getColors();
      const count = Math.min(140, Math.floor((width * height) / 10000));

      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.7 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.4,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const triggerShootingStar = () => {
      if (Math.random() < 0.015 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 7,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          active: true,
        });
      }
    };

    initParticles();

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient nebular glow
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        20,
        width * 0.5,
        height * 0.2,
        width * 0.6
      );
      grad.addColorStop(0, 'rgba(255, 230, 0, 0.04)');
      grad.addColorStop(0.5, 'rgba(147, 51, 234, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.alpha = star.baseAlpha + Math.sin(time * 30 * star.twinkleSpeed) * 0.25;
        const currentAlpha = Math.max(0.05, Math.min(1, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Subtle star glow for larger stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.25;
          ctx.fill();
        }
      });

      // Shooting stars
      triggerShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const sGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        sGrad.addColorStop(0, 'rgba(255, 230, 0, 0)');
        sGrad.addColorStop(1, `rgba(255, 240, 102, ${s.alpha})`);

        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      id="cosmic-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
