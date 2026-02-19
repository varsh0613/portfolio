// FloatingParticlesBackground.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";

const FloatingParticlesBackground = ({
  particleCount = 50,
  particleSize = 2,
  particleOpacity = 0.6,
  glowIntensity = 10,
  movementSpeed = 0.5,
  mouseInfluence = 100,
  backgroundColor = "#000000",
  particleColor = "#FFFFFF",
  mouseGravity = "none", // "none" | "attract" | "repel"
  gravityStrength = 50,
  glowAnimation = "ease", // "instant" | "ease" | "spring"
  particleInteraction = false,
  interactionType = "bounce", // "bounce" | "merge"
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Initialize particles
  const initializeParticles = useCallback(
    (width, height) => {
      return Array.from({ length: particleCount }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        size: Math.random() * particleSize + 1,
        opacity: particleOpacity,
        baseOpacity: particleOpacity,
        mass: Math.random() * 0.5 + 0.5,
        id: index,
      }));
    },
    [particleCount, particleSize, particleOpacity, movementSpeed]
  );

  const redistributeParticles = useCallback((width, height) => {
    particlesRef.current.forEach((particle) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
    });
  }, []);

  // Update particle positions
  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouse = mouseRef.current;

    particlesRef.current.forEach((particle, index) => {
      // Distance to mouse
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseInfluence && distance > 0) {
        const force = (mouseInfluence - distance) / mouseInfluence;
        const nx = dx / distance;
        const ny = dy / distance;
        const gForce = force * (gravityStrength * 0.001);

        if (mouseGravity === "attract") {
          particle.vx += nx * gForce;
          particle.vy += ny * gForce;
        } else if (mouseGravity === "repel") {
          particle.vx -= nx * gForce;
          particle.vy -= ny * gForce;
        }

        particle.opacity = Math.min(1, particle.baseOpacity + force * 0.4);

        const targetGlow = 1 + force * 2;
        const currentGlow = particle.glowMultiplier || 1;

        if (glowAnimation === "instant") particle.glowMultiplier = targetGlow;
        else if (glowAnimation === "ease")
          particle.glowMultiplier =
            currentGlow + (targetGlow - currentGlow) * 0.15;
        else if (glowAnimation === "spring") {
          const springForce = (targetGlow - currentGlow) * 0.2;
          const damping = 0.85;
          particle.glowVelocity = (particle.glowVelocity || 0) * damping + springForce;
          particle.glowMultiplier = currentGlow + particle.glowVelocity;
        }
      } else {
        particle.opacity = Math.max(particle.baseOpacity * 0.3, particle.opacity - 0.02);
        const targetGlow = 1;
        const currentGlow = particle.glowMultiplier || 1;

        if (glowAnimation === "instant") particle.glowMultiplier = targetGlow;
        else if (glowAnimation === "ease")
          particle.glowMultiplier = Math.max(1, currentGlow + (targetGlow - currentGlow) * 0.08);
        else if (glowAnimation === "spring") {
          const springForce = (targetGlow - currentGlow) * 0.15;
          const damping = 0.9;
          particle.glowVelocity = (particle.glowVelocity || 0) * damping + springForce;
          particle.glowMultiplier = Math.max(1, currentGlow + particle.glowVelocity);
        }
      }

      // Particle interaction
      if (particleInteraction) {
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx2 = other.x - particle.x;
          const dy2 = other.y - particle.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const minDist = particle.size + other.size + 5;

          if (dist2 < minDist && dist2 > 0) {
            if (interactionType === "bounce") {
              const nx = dx2 / dist2;
              const ny = dy2 / dist2;
              const relVx = particle.vx - other.vx;
              const relVy = particle.vy - other.vy;
              const speed = relVx * nx + relVy * ny;
              if (speed < 0) return;
              const impulse = (2 * speed) / (particle.mass + other.mass);
              particle.vx -= impulse * other.mass * nx;
              particle.vy -= impulse * other.mass * ny;
              other.vx += impulse * particle.mass * nx;
              other.vy += impulse * particle.mass * ny;

              const overlap = minDist - dist2;
              particle.x -= nx * overlap * 0.5;
              particle.y -= ny * overlap * 0.5;
              other.x += nx * overlap * 0.5;
              other.y += ny * overlap * 0.5;
            } else if (interactionType === "merge") {
              const mergeForce = (minDist - dist2) / minDist;
              particle.glowMultiplier = (particle.glowMultiplier || 1) + mergeForce * 0.5;
              other.glowMultiplier = (other.glowMultiplier || 1) + mergeForce * 0.5;
              const attractForce = mergeForce * 0.01;
              particle.vx += dx2 * attractForce;
              particle.vy += dy2 * attractForce;
              other.vx -= dx2 * attractForce;
              other.vy -= dy2 * attractForce;
            }
          }
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx += (Math.random() - 0.5) * 0.001;
      particle.vy += (Math.random() - 0.5) * 0.001;
      particle.vx *= 0.999;
      particle.vy *= 0.999;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
    });
  }, [
    mouseInfluence,
    mouseGravity,
    gravityStrength,
    glowAnimation,
    particleInteraction,
    interactionType,
  ]);

  // Draw particles
  const drawParticles = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      particlesRef.current.forEach((particle) => {
        ctx.save();
        const glow = particle.glowMultiplier || 1;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = glowIntensity * glow * 2;
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    },
    [particleColor, glowIntensity]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    updateParticles();
    drawParticles(ctx);
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    setCanvasSize({ width: rect.width, height: rect.height });
    if (particlesRef.current.length > 0) redistributeParticles(rect.width, rect.height);
  }, [redistributeParticles]);

  // Initialize & animate
  useEffect(() => {
    resizeCanvas();
    particlesRef.current = initializeParticles(canvasSize.width, canvasSize.height);
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [animate, initializeParticles, resizeCanvas, canvasSize.width, canvasSize.height, handleMouseMove]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default FloatingParticlesBackground;
