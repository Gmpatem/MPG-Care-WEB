import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  angle: number;
}

export function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, options?: { opacity?: number; particleCount?: number; noDither?: boolean; timeScale?: number; height?: string }) {
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false, timer: 0 });
  const boostRef = useRef(false);
  const boostTimerRef = useRef(0);
  const tRef = useRef(0);
  const isVisibleRef = useRef(true);

  const initParticles = useCallback((width: number, height: number, count: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        energy: Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = options?.particleCount || 8000;
    const TIME_SCALE = options?.timeScale || 1;
    const NO_DITHER = options?.noDither || false;
    const OPACITY = options?.opacity || 1;

    let w = window.innerWidth;
    let h = canvas.offsetHeight || window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    particlesRef.current = initParticles(w, h, PARTICLE_COUNT);

    // Dither canvas
    let canvas2: HTMLCanvasElement | null = null;
    let ctx2: CanvasRenderingContext2D | null = null;
    let ditherWidth = 0;
    let ditherHeight = 0;
    let cellSize = 0;
    let textPixels: ImageData | null = null;

    if (!NO_DITHER) {
      canvas2 = document.createElement('canvas');
      ctx2 = canvas2.getContext('2d');
      if (canvas2 && ctx2) {
        ditherWidth = Math.floor(w / 3);
        ditherHeight = Math.floor(h / 3);
        canvas2.width = ditherWidth;
        canvas2.height = ditherHeight;
        cellSize = ditherWidth / 80;

        // Draw text on dither canvas
        ctx2.fillStyle = '#040A14';
        ctx2.fillRect(0, 0, ditherWidth, ditherHeight);
        ctx2.font = `700 ${Math.floor(ditherWidth / 6)}px "Space Grotesk", sans-serif`;
        ctx2.fillStyle = '#FFFFFF';
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        ctx2.fillText('SYSTEMS', ditherWidth / 2, ditherHeight * 0.35);
        textPixels = ctx2.getImageData(0, 0, ditherWidth, ditherHeight);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * (w / rect.width);
      mouseRef.current.y = (e.clientY - rect.top) * (h / rect.height);
      mouseRef.current.active = true;
      mouseRef.current.timer = Date.now();

      // Spawn trail particles at mouse position
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * particlesRef.current.length);
        const p = particlesRef.current[idx];
        if (p) {
          p.x = mouseRef.current.x + (Math.random() - 0.5) * 40;
          p.y = mouseRef.current.y + (Math.random() - 0.5) * 40;
          p.energy = 1;
          p.vx = (Math.random() - 0.5) * 4;
          p.vy = (Math.random() - 0.5) * 4;
        }
      }
    };

    const handleClick = () => {
      boostRef.current = true;
      boostTimerRef.current = Date.now();
      particlesRef.current.forEach(p => {
        p.energy = 1;
        p.vx *= 2;
        p.vy *= 2;
      });
    };

    const handleResize = () => {
      w = window.innerWidth;
      h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      if (!NO_DITHER && canvas2 && ctx2) {
        ditherWidth = Math.floor(w / 3);
        ditherHeight = Math.floor(h / 3);
        canvas2.width = ditherWidth;
        canvas2.height = ditherHeight;
        cellSize = ditherWidth / 80;
        ctx2.fillStyle = '#040A14';
        ctx2.fillRect(0, 0, ditherWidth, ditherHeight);
        ctx2.font = `700 ${Math.floor(ditherWidth / 6)}px "Space Grotesk", sans-serif`;
        ctx2.fillStyle = '#FFFFFF';
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        ctx2.fillText('SYSTEMS', ditherWidth / 2, ditherHeight * 0.35);
        textPixels = ctx2.getImageData(0, 0, ditherWidth, ditherHeight);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // IntersectionObserver for visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = Date.now();
      const dt = 1;

      // Clear base canvas with trails
      ctx.fillStyle = `rgba(4, 10, 20, ${NO_DITHER ? 0.3 : 0.15})`;
      ctx.fillRect(0, 0, w, h);

      // Boost mode flash
      if (boostRef.current && now - boostTimerRef.current < 500) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, 0, w, h);
      } else if (boostRef.current) {
        boostRef.current = false;
      }

      // Update mouse active state
      if (mouseRef.current.active && now - mouseRef.current.timer > 100) {
        mouseRef.current.active = false;
      }

      const t = (tRef.current += 0.0003 * TIME_SCALE);
      const particles = particlesRef.current;

      // Update and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Noise field
        const nx = p.x * 0.005;
        const ny = p.y * 0.005;
        const angle1 = Math.sin(nx + t) * Math.cos(ny + t) * Math.PI * 2;
        const angle2 = Math.sin(nx * 2 + t * 1.5) * Math.cos(ny * 2 - t) * 0.5;
        const fieldAngle = angle1 + angle2;

        // Blend velocity toward field
        const targetVx = Math.cos(fieldAngle) * 1.5;
        const targetVy = Math.sin(fieldAngle) * 1.5;
        p.vx += (targetVx - p.vx) * 0.05;
        p.vy += (targetVy - p.vy) * 0.05;

        // Mouse repulsion
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100 * 0.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.energy = Math.min(p.energy + 0.1, 1);
          }
        }

        // Update position
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Decay energy
        p.energy *= 0.995;

        // Render particle
        const baseRadius = 2 + p.energy * 3;
        const energyThreshold = 0.5;
        const isHighEnergy = p.energy > energyThreshold;

        const r = isHighEnergy ? 98 : 43;
        const g = isHighEnergy ? 179 : 108;
        const b = isHighEnergy ? 237 : 176;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, baseRadius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.6 * OPACITY})`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${0.4 * OPACITY})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.1 * OPACITY})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, baseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dither projection
      if (!NO_DITHER && canvas2 && ctx2 && textPixels && cellSize > 0) {
        // Sample base canvas brightness at grid points
        const cols = Math.floor(ditherWidth / cellSize);
        const rows = Math.floor(ditherHeight / cellSize);

        ctx2.clearRect(0, 0, ditherWidth, ditherHeight);
        ctx2.fillStyle = '#040A14';
        ctx2.fillRect(0, 0, ditherWidth, ditherHeight);

        // Get base canvas pixel data
        const baseData = ctx.getImageData(0, 0, w * dpr, h * dpr).data;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const dx = Math.floor((col * cellSize / ditherWidth) * w * dpr);
            const dy = Math.floor((row * cellSize / ditherHeight) * h * dpr);
            const idx = (dy * w * dpr + dx) * 4;
            const brightness = (baseData[idx] + baseData[idx + 1] + baseData[idx + 2]) / 765;

            // Check if text exists at this grid point
            const tx = Math.floor(col * cellSize);
            const ty = Math.floor(row * cellSize);
            const tIdx = (ty * ditherWidth + tx) * 4;
            const hasText = textPixels.data[tIdx + 3] > 128;

            if (hasText && brightness > 0.05) {
              const voxelAlpha = Math.min(brightness * 2, 1) * 0.9;
              const cubeSize = cellSize * 0.7;
              const x = col * cellSize;
              const y = row * cellSize;

              // Draw 3D-ish voxel cube
              ctx2.fillStyle = `rgba(255, 255, 255, ${voxelAlpha})`;
              ctx2.fillRect(x - cubeSize / 2, y - cubeSize / 2, cubeSize, cubeSize);

              // Shadow
              ctx2.fillStyle = `rgba(0, 0, 0, 0.3)`;
              ctx2.fillRect(x - cubeSize / 2 + 2, y - cubeSize / 2 + 2, cubeSize, cubeSize);
            }
          }
        }

        // Composite dither canvas onto base canvas
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(canvas2, 0, 0, w, h);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [canvasRef, initParticles, options]);

  return null;
}
