"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isFinalEndingRef = useRef<boolean>(false);

  // Create a circular particle texture with soft edges
  const createCircleTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.15, "rgba(255, 240, 240, 0.9)");
      gradient.addColorStop(0.4, "rgba(200, 150, 255, 0.4)");
      gradient.addColorStop(0.7, "rgba(100, 50, 200, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  };

  // Create a soft nebula cloud texture
  const createNebulaTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(200, 150, 255, 0.15)");
      gradient.addColorStop(0.3, "rgba(100, 50, 255, 0.08)");
      gradient.addColorStop(0.6, "rgba(50, 20, 150, 0.03)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030008, 0.0012);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
    camera.position.set(0, 150, 400);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particleTexture = createCircleTexture();
    const nebulaTexture = createNebulaTexture();

    // Group to hold the milky way
    const galaxyGroup = new THREE.Group();
    // Tilt the galaxy to give a diagonal milky way band across the sky
    galaxyGroup.rotation.x = Math.PI / 5;
    galaxyGroup.rotation.z = Math.PI / 6;
    scene.add(galaxyGroup);

    // ── Star Field (Milky Way) ──────────────────────
    const starsCount = 2000;
    const starsGeo = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      let x, y, z;
      
      if (Math.random() > 0.8) {
        // Background scattered stars
        x = (Math.random() - 0.5) * 2500;
        y = (Math.random() - 0.5) * 2500;
        z = (Math.random() - 0.5) * 2500;
      } else {
        // Galaxy disk & spiral arms
        const r = Math.pow(Math.random(), 1.5) * 1200; // Radius
        const theta = Math.random() * Math.PI * 2;
        const branch = i % 2;
        const branchAngle = (branch * Math.PI) + r * 0.003; // Spiral bend
        const angle = theta * 0.15 + branchAngle; // Constrain theta to form arms
        
        // Galactic bulge thickness
        const bulge = Math.exp(-r / 200) * 120;
        y = (Math.random() - 0.5) * (30 + bulge);
        
        x = Math.cos(angle) * r + (Math.random() - 0.5) * 80;
        z = Math.sin(angle) * r + (Math.random() - 0.5) * 80;
      }

      starsPositions[i * 3] = x;
      starsPositions[i * 3 + 1] = y;
      starsPositions[i * 3 + 2] = z;

      // Distance from core for coloring
      const dist = Math.sqrt(x*x + y*y + z*z);

      if (dist < 200) {
        // Core: Warm glowing amber/white
        starsColors[i * 3] = 1.0;
        starsColors[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        starsColors[i * 3 + 2] = 0.6 + Math.random() * 0.2;
      } else if (dist < 500) {
        // Mid-disk: Rose/Pink transitions
        starsColors[i * 3] = 0.9 + Math.random() * 0.1;
        starsColors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
        starsColors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
      } else {
        // Outer disk: Deep purples & blues
        starsColors[i * 3] = 0.4 + Math.random() * 0.3;
        starsColors[i * 3 + 1] = 0.3 + Math.random() * 0.2;
        starsColors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      }

      starsSizes[i] = Math.random() * 3 + 0.5;
    }

    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    starsGeo.setAttribute("color", new THREE.BufferAttribute(starsColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 3,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starsGeo, starsMaterial);
    galaxyGroup.add(stars);

    // ── Dust Lanes (Darker/Colorful particles) ──────────────────────────────
    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const r = Math.pow(Math.random(), 1.2) * 1000;
      const theta = Math.random() * Math.PI * 2;
      const branch = i % 2;
      const branchAngle = (branch * Math.PI) + r * 0.003;
      const angle = theta * 0.15 + branchAngle;
      
      const y = (Math.random() - 0.5) * 50;
      
      dustPositions[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 100;
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 100;

      // Deep purples and reds for dust
      dustColors[i * 3] = 0.5 + Math.random() * 0.3;
      dustColors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
      dustColors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });

    const dust = new THREE.Points(dustGeo, dustMaterial);
    galaxyGroup.add(dust);

    // ── Nebula Clouds (large soft blobs in the band) ────────────
    const nebulaCount = 40;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      const r = Math.pow(Math.random(), 1.2) * 900;
      const theta = Math.random() * Math.PI * 2;
      const angle = theta;
      
      const bulge = Math.exp(-r / 200) * 80;
      const y = (Math.random() - 0.5) * (20 + bulge);
      
      nebulaPositions[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 150;
      nebulaPositions[i * 3 + 1] = y;
      nebulaPositions[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 150;

      const dist = Math.sqrt(r*r + y*y);
      if (dist < 300) {
        // Bright core nebula
        nebulaColors[i * 3] = 1.0;
        nebulaColors[i * 3 + 1] = 0.6;
        nebulaColors[i * 3 + 2] = 0.3;
      } else {
        // Outer deep space nebula
        nebulaColors[i * 3] = 0.2 + Math.random() * 0.3;
        nebulaColors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        nebulaColors[i * 3 + 2] = 0.5 + Math.random() * 0.4;
      }
    }

    nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 200,
      map: nebulaTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.15,
      sizeAttenuation: true,
    });

    const nebula = new THREE.Points(nebulaGeo, nebulaMaterial);
    galaxyGroup.add(nebula);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - width / 2) * 0.1;
      mouseY = (event.clientY - height / 2) * 0.1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Track when final-ending is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFinalEndingRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );

    const finalSection = document.getElementById("final-ending");
    if (finalSection) {
      observer.observe(finalSection);
    }

    // Animation Loop
    let animationFrameId: number;
    let lastTime = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = Date.now();
      lastTime = now;

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Parallax effect by moving camera slightly
      camera.position.x = targetX;
      camera.position.y = 150 - targetY;
      camera.lookAt(scene.position);

      const speedMultiplier = isFinalEndingRef.current ? 0.25 : 1.0;

      // Rotate entire galaxy
      galaxyGroup.rotation.y += 0.0005 * speedMultiplier;

      // Twinkling effect via opacity modulation
      const targetOpacity = isFinalEndingRef.current ? 0.35 : 0.9;
      starsMaterial.opacity += (targetOpacity - starsMaterial.opacity) * 0.03;
      
      const dustTargetOpacity = isFinalEndingRef.current ? 0.1 : 0.3;
      dustMaterial.opacity += (dustTargetOpacity - dustMaterial.opacity) * 0.03;
      
      const nebulaTargetOpacity = isFinalEndingRef.current ? 0.05 : 0.15;
      nebulaMaterial.opacity += (nebulaTargetOpacity - nebulaMaterial.opacity) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (finalSection) {
        observer.unobserve(finalSection);
      }
      cancelAnimationFrame(animationFrameId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      starsGeo.dispose();
      starsMaterial.dispose();
      dustGeo.dispose();
      dustMaterial.dispose();
      nebulaGeo.dispose();
      nebulaMaterial.dispose();
      particleTexture.dispose();
      nebulaTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 w-screen h-screen overflow-hidden bg-[#030008] pointer-events-none"
    />
  );
}
