"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface DataParticle {
  mesh: THREE.Mesh;
  zPos: number;
  speed: number;
  active: boolean;
}

export function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const connectActionRef = useRef<(() => void) | null>(null);
  
  // Estados para el flujo de conexión en React
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Cargar GSAP dinámicamente para evitar errores de bundler
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gsap) {
      setGsapLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Solo iniciar Three.js cuando GSAP haya cargado completamente
    if (!gsapLoaded || !mountRef.current) return;

    const gsap = (window as any).gsap;
    let animationFrameId: number;
    let isConnected = false;
    let mouseX = 0;
    let mouseY = 0;

    // --- CONFIGURACIÓN BÁSICA ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061014, 0.04);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-2, 1, 12);

    const targetX = window.innerWidth > 768 ? 4 : 0;
    camera.lookAt(targetX, -1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // --- CONTROLES ORBITALES ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 3;
    controls.minAzimuthAngle = -Math.PI / 3;
    controls.maxAzimuthAngle = Math.PI / 3;
    controls.enableZoom = true;
    controls.minDistance = 6;
    controls.maxDistance = 18;
    controls.target.set(targetX, -1, 0);

    // --- LUCES ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const monitorLight = new THREE.PointLight(0x0ea5e9, 5, 12);
    monitorLight.position.set(targetX - 2, 0.5, -0.5);
    scene.add(monitorLight);

    const ceilingLight = new THREE.SpotLight(0xffffff, 8, 20, Math.PI / 3, 0.8, 1);
    ceilingLight.position.set(targetX, 6, 1);
    ceilingLight.target.position.set(targetX, -2, 0);
    ceilingLight.castShadow = true;
    scene.add(ceilingLight);
    scene.add(ceilingLight.target);

    const fiberLight = new THREE.PointLight(0x10b981, 0, 8);
    scene.add(fiberLight);

    const wallLogoLight = new THREE.SpotLight(0x10b981, 2, 8, Math.PI / 2.2, 0.5, 1);
    wallLogoLight.position.set(targetX - 7.5, 3.8, 3.0);
    wallLogoLight.target.position.set(targetX - 8.85, 2.2, 3.0);
    wallLogoLight.castShadow = true;
    wallLogoLight.shadow.bias = -0.002;
    scene.add(wallLogoLight);
    scene.add(wallLogoLight.target);

    // --- GRUPOS ---
    const officeGroup = new THREE.Group();
    officeGroup.position.x = targetX;
    scene.add(officeGroup);

    const cableGroup = new THREE.Group();
    cableGroup.position.set(targetX + 1, 0.5, 8);
    cableGroup.rotation.y = -Math.PI / 6;
    cableGroup.rotation.x = Math.PI / 12;
    scene.add(cableGroup);

    // --- ENTORNO: LA OFICINA ---
    const deskGeo = new THREE.BoxGeometry(14, 0.4, 5);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1a1c20, roughness: 0.6, metalness: 0.3 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -2.2, 0);
    desk.receiveShadow = true;
    officeGroup.add(desk);

    const wallGeo = new THREE.PlaneGeometry(35, 15);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0a0f14, roughness: 0.9 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 0, -2.5);
    wall.receiveShadow = true;
    officeGroup.add(wall);

    // Paneles decorativos
    for (let i = 0; i < 6; i++) {
      const panelGeo = new THREE.BoxGeometry(2, 4, 0.1);
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x111820, roughness: 1 });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(-6 + (i * 2.5), 1, -2.4);
      officeGroup.add(panel);
    }

    // Pared lateral izquierda
    const leftWallGeo = new THREE.PlaneGeometry(25, 15);
    const leftWallMat = new THREE.MeshStandardMaterial({ color: 0x080c10, roughness: 0.9 });
    const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWall.position.set(-9, 0, 10);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    officeGroup.add(leftWall);

    // Paneles decorativos en la pared lateral izquierda
    for (let i = 0; i < 3; i++) {
      const panelGeo = new THREE.BoxGeometry(2, 4, 0.1);
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x0c1218, roughness: 1 });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(-8.9, 1, -1.0 + (i * 4.0));
      panel.rotation.y = Math.PI / 2;
      officeGroup.add(panel);
    }

    // Logo Greenworking en 3D
    const logoPanelGroup = new THREE.Group();
    logoPanelGroup.position.set(-8.85, 2.2, 3.0);
    logoPanelGroup.rotation.y = Math.PI / 2;
    
    // Panel de acrílico oscuro pulido
    const logoBaseGeo = new THREE.BoxGeometry(4.6, 2.6, 0.15);
    const logoBaseMat = new THREE.MeshStandardMaterial({ color: 0x05090b, metalness: 0.95, roughness: 0.05 });
    const logoBase = new THREE.Mesh(logoBaseGeo, logoBaseMat);
    logoBase.castShadow = true;
    logoBase.receiveShadow = true;
    logoPanelGroup.add(logoBase);

    // Soportes de acero inoxidable (Standoffs)
    const standoffGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.22, 16);
    const standoffMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 1.0, roughness: 0.1 });
    
    const offsets = [
      { x: -2.1, y: 1.15 },
      { x: 2.1, y: 1.15 },
      { x: -2.1, y: -1.15 },
      { x: 2.1, y: -1.15 }
    ];
    
    offsets.forEach(offset => {
      const standoff = new THREE.Mesh(standoffGeo, standoffMat);
      standoff.rotation.x = Math.PI / 2;
      standoff.position.set(offset.x, offset.y, -0.06);
      logoPanelGroup.add(standoff);
    });

    // Artefacto de Iluminación LED superior
    const fixtureGroup = new THREE.Group();
    fixtureGroup.position.set(0, 1.55, 0.15);
    
    const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.8, 16);
    const barMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8, roughness: 0.3 });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.rotation.z = Math.PI / 2;
    fixtureGroup.add(bar);
    
    const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 16);
    const arm1 = new THREE.Mesh(armGeo, barMat);
    arm1.rotation.x = Math.PI / 2;
    arm1.position.set(-1.4, 0, -0.15);
    const arm2 = arm1.clone();
    arm2.position.x = 1.4;
    fixtureGroup.add(arm1, arm2);
    
    const ledStripGeo = new THREE.CylinderGeometry(0.018, 0.018, 3.6, 16);
    const ledStripMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledStrip = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStrip.rotation.z = Math.PI / 2;
    ledStrip.position.y = -0.04;
    fixtureGroup.add(ledStrip);
    
    logoPanelGroup.add(fixtureGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    const logoUrl = '/greenworking-soluciones-tecnologicas-logo-green-vf-1.png';
    const logoTexture = textureLoader.load(logoUrl);
    
    const logoGeo = new THREE.PlaneGeometry(4.0, 2.02);
    const logoMat = new THREE.MeshStandardMaterial({ 
      map: logoTexture, 
      transparent: true,
      alphaTest: 0.15,
      emissive: 0x10b981,
      emissiveMap: logoTexture,
      emissiveIntensity: 0.1,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.z = 0.08;
    logoPanelGroup.add(logoMesh);
    officeGroup.add(logoPanelGroup);

    // Setup de Videos para Monitores Duales
    const video1 = document.createElement('video');
    video1.src = '/Portada Facebook Servicios Autolavado Moderno Azul (1).mp4';
    video1.loop = true;
    video1.muted = true;
    video1.playsInline = true;
    video1.autoplay = true;
    video1.setAttribute('crossorigin', 'anonymous');
    video1.setAttribute('webkit-playsinline', 'true');
    video1.preload = 'auto';
    video1.load();
    video1.play().catch(e => console.log("Video 1 background play failed:", e));

    const video2 = document.createElement('video');
    video2.src = '/Portada Facebook Servicios Autolavado Moderno Azul (2).mp4';
    video2.loop = true;
    video2.muted = true;
    video2.playsInline = true;
    video2.autoplay = true;
    video2.setAttribute('crossorigin', 'anonymous');
    video2.setAttribute('webkit-playsinline', 'true');
    video2.preload = 'auto';
    video2.load();
    video2.play().catch(e => console.log("Video 2 background play failed:", e));

    const videoTexture1 = new THREE.VideoTexture(video1);
    videoTexture1.colorSpace = THREE.SRGBColorSpace;
    const videoTexture2 = new THREE.VideoTexture(video2);
    videoTexture2.colorSpace = THREE.SRGBColorSpace;

    // Setup de Monitores Duales
    const createMonitor = (x: number, y: number, z: number, rotY: number, initialColor: number) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      group.rotation.y = rotY;

      const standGeo = new THREE.CylinderGeometry(0.08, 0.2, 0.8);
      const standMat = new THREE.MeshStandardMaterial({color: 0x222222});
      const stand = new THREE.Mesh(standGeo, standMat);
      stand.position.y = -0.4;
      group.add(stand);

      const monitorGeo = new THREE.BoxGeometry(3.5, 2, 0.15);
      const monitorMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const monitor = new THREE.Mesh(monitorGeo, monitorMat);
      group.add(monitor);

      const screenGeo = new THREE.PlaneGeometry(3.3, 1.8);
      const screenMat = new THREE.MeshBasicMaterial({ color: initialColor });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = 0.08;
      group.add(screen);

      return group;
    };

    const monitor1 = createMonitor(-3.5, -0.6, -1.2, Math.PI / 8, 0x064e3b); // Fondo verde inicial
    const monitor2 = createMonitor(0, -0.6, -1.4, -Math.PI / 16, 0x082f49); // Fondo azul inicial
    officeGroup.add(monitor1, monitor2);

    // Pantalla Grande (Arriba)
    const bigScreenGroup = new THREE.Group();
    bigScreenGroup.position.set(-1.75, 1.8, -2.3); 

    const bigMonitorGeo = new THREE.BoxGeometry(6, 3.2, 0.1);
    const bigMonitorMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const bigMonitor = new THREE.Mesh(bigMonitorGeo, bigMonitorMat);
    bigScreenGroup.add(bigMonitor);

    const bigScreenMat = new THREE.MeshStandardMaterial({ 
      color: 0x050505,
      map: logoTexture,
      emissive: 0x10b981,
      emissiveMap: logoTexture,
      emissiveIntensity: 0,
      transparent: true,
      alphaTest: 0.15,
      roughness: 0.1,
      metalness: 0.8
    });
    const bigScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 2.93), bigScreenMat);
    bigScreenMesh.position.z = 0.06;
    bigScreenGroup.add(bigScreenMesh);
    officeGroup.add(bigScreenGroup);

    // Teclado y Ratón
    const kbGeo = new THREE.BoxGeometry(1.6, 0.05, 0.5);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(-1.5, -1.97, 0.8);
    keyboard.rotation.y = 0.1;
    officeGroup.add(keyboard);

    const mouseGeo = new THREE.BoxGeometry(0.2, 0.06, 0.35);
    const mouse = new THREE.Mesh(mouseGeo, kbMat);
    mouse.position.set(-0.4, -1.97, 0.8);
    mouse.rotation.y = -0.1;
    officeGroup.add(mouse);

    // Planta y Taza
    const mugGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(-4.5, -1.85, 0.8);
    officeGroup.add(mug);

    const potGeo = new THREE.CylinderGeometry(0.3, 0.2, 0.4);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(5.5, -1.8, 0.5);
    officeGroup.add(pot);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
    for(let i = 0; i < 4; i++) {
      const leafGeo = new THREE.DodecahedronGeometry(0.3 + Math.random() * 0.1);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(5.5 + (Math.random() - 0.5) * 0.4, -1.4 + Math.random() * 0.3, 0.5 + (Math.random() - 0.5) * 0.4);
      officeGroup.add(leaf);
    }

    // Rack de Servidores
    const rackGroup = new THREE.Group();
    rackGroup.position.set(5, 0, -1.5);
    
    const rackBodyGeo = new THREE.BoxGeometry(2, 4.4, 1.5);
    const rackBodyMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.6, roughness: 0.3 });
    const rackBody = new THREE.Mesh(rackBodyGeo, rackBodyMat);
    rackGroup.add(rackBody);

    const serverLeds: THREE.MeshBasicMaterial[] = [];
    for(let i = 0; i < 8; i++) {
      const serverGeo = new THREE.BoxGeometry(1.8, 0.3, 1.4);
      const serverMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });
      const server = new THREE.Mesh(serverGeo, serverMat);
      server.position.set(0, 1.8 - (i * 0.5), 0.06);
      rackGroup.add(server);

      const sLedGeo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
      const sLedMat = new THREE.MeshBasicMaterial({ color: 0x059669 });
      const sLed = new THREE.Mesh(sLedGeo, sLedMat);
      sLed.position.set(0.7, 1.8 - (i * 0.5), 0.77);
      rackGroup.add(sLed);
      serverLeds.push(sLedMat);
    }
    officeGroup.add(rackGroup);

    // Switch Central
    const routerGeo = new THREE.BoxGeometry(2.5, 0.6, 2);
    const routerMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.6 });
    const router = new THREE.Mesh(routerGeo, routerMat);
    router.position.set(2, -1.7, 0); 
    router.castShadow = true;
    officeGroup.add(router);

    const portGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 32);
    const portMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 });
    const port = new THREE.Mesh(portGeo, portMat);
    port.rotation.x = Math.PI / 2;
    port.position.set(2, -1.7, 1); 
    officeGroup.add(port);

    const ledGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const ledMat1 = new THREE.MeshBasicMaterial({ color: 0xef4444 }); 
    const led1 = new THREE.Mesh(ledGeo, ledMat1);
    led1.position.set(2.9, -1.6, 1.05);
    officeGroup.add(led1);

    // --- CABLE DE FIBRA ÓPTICA ---
    const coreLength = 12;
    const coreGeo = new THREE.CylinderGeometry(0.04, 0.04, coreLength, 16);
    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0xa7f3d0,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.rotation.x = Math.PI / 2;
    core.position.z = coreLength / 2;
    cableGroup.add(core);

    const cladLength = 10;
    const cladding = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, cladLength, 16),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.1, transmission: 0.9, thickness: 0.1 })
    );
    cladding.rotation.x = Math.PI / 2;
    cladding.position.z = 1.0 + (cladLength / 2);
    cableGroup.add(cladding);

    const kevlarLength = 8.5;
    const kevlar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, kevlarLength, 32),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 1.0, wireframe: true })
    );
    kevlar.rotation.x = Math.PI / 2;
    kevlar.position.z = 2.0 + (kevlarLength / 2);
    cableGroup.add(kevlar);

    const kevlarBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, kevlarLength, 16),
      new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.9 })
    );
    kevlarBase.rotation.x = Math.PI / 2;
    kevlarBase.position.z = kevlar.position.z;
    cableGroup.add(kevlarBase);

    const innerJacketLength = 7;
    const innerJacket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, innerJacketLength, 32),
      new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.6 })
    );
    innerJacket.rotation.x = Math.PI / 2;
    innerJacket.position.z = 3.0 + (innerJacketLength / 2);
    cableGroup.add(innerJacket);

    const outerJacketLength = 15;
    const outerJacket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, outerJacketLength, 32),
      new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.8 })
    );
    outerJacket.rotation.x = Math.PI / 2;
    outerJacket.position.z = 4.0 + (outerJacketLength / 2);
    cableGroup.add(outerJacket);

    // --- PARTÍCULAS (Flujo) ---
    const dataParticles: DataParticle[] = [];
    const particleGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });

    for(let i = 0; i < 20; i++) {
      const particle = new THREE.Mesh(particleGeo, particleMat.clone());
      particle.position.z = Math.random() * 8; 
      cableGroup.add(particle);
      dataParticles.push({
        mesh: particle,
        zPos: particle.position.z,
        speed: 0.05 + Math.random() * 0.12,
        active: false
      });
    }

    const portTarget = new THREE.Vector3(targetX + 2, -1.7, 1.2);
    const initialCablePos = new THREE.Vector3(targetX + 1, 0.5, 8);
    const initialCableRot = new THREE.Vector3(Math.PI / 12, -Math.PI / 6, 0);
    const pluggedCablePos = new THREE.Vector3(portTarget.x, portTarget.y, portTarget.z - 0.2);
    const pluggedCableRot = new THREE.Vector3(0, 0, 0);

    // --- INTERACCIÓN POR CLIC (PUENTE CON REACT) ---
    connectActionRef.current = () => {
      setStatus('connecting');
      
      // Animar el cable hacia el switch
      gsap.to(cableGroup.position, {
        x: pluggedCablePos.x,
        y: pluggedCablePos.y,
        z: pluggedCablePos.z,
        duration: 2.2,
        ease: "power2.inOut"
      });
      
      gsap.to(cableGroup.rotation, {
        x: pluggedCableRot.x,
        y: pluggedCableRot.y,
        z: pluggedCableRot.z,
        duration: 2.2,
        ease: "power2.inOut"
      });

      // Animar la cámara interactiva hacia el conector
      controls.enabled = false;
      gsap.to(camera.position, {
        x: targetX + 1.2,
        y: -1.0,
        z: 4.5,
        duration: 2.2,
        ease: "power2.inOut"
      });
      
      gsap.to(controls.target, {
        x: targetX + 2,
        y: -1.7,
        z: 1,
        duration: 2.2,
        ease: "power2.inOut",
        onComplete: () => {
          isConnected = true;
          setStatus('connected');
          controls.enabled = true;

          // Encender LEDs del rack y el switch
          ledMat1.color.setHex(0x10b981);
          serverLeds.forEach(mat => mat.color.setHex(0x34d399));

          // Activar monitores de oficina y reproducir videos
          const screen1Mesh = monitor1.children[2] as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
          screen1Mesh.material.color.setHex(0xffffff);
          screen1Mesh.material.map = videoTexture1;
          screen1Mesh.material.needsUpdate = true;
          video1.play().catch(e => {});

          const screen2Mesh = monitor2.children[2] as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
          screen2Mesh.material.color.setHex(0xffffff);
          screen2Mesh.material.map = videoTexture2;
          screen2Mesh.material.needsUpdate = true;
          video2.play().catch(e => {});

          // Brillo en texturas de marca del rack / pantallas
          gsap.to(bigScreenMat, { emissiveIntensity: 1, duration: 1.5 });
          gsap.to(bigScreenMat.color, { r: 1, g: 1, b: 1, duration: 1.5 });
          
          gsap.to(logoMat, { emissiveIntensity: 1.2, duration: 1.0 });
          gsap.to(wallLogoLight, { intensity: 18, duration: 1.8 });

          // Brillo central de fibra óptica en cable
          gsap.to(coreMat, { emissiveIntensity: 3, duration: 1.0 });
          gsap.to(coreMat.color, { r: 0.1, g: 0.9, b: 0.5, duration: 1.0 });

          // Activar partículas dentro de la fibra
          dataParticles.forEach(p => {
            p.active = true;
            (p.mesh.material as THREE.MeshBasicMaterial).opacity = 1;
          });
        }
      });
    };

    // --- EVENTOS GENERALES ---
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      const newTargetX = window.innerWidth > 768 ? 4 : 0;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      controls.update(); 

      // Partículas y LEDs parpadeantes si está conectado
      if (isConnected) {
        dataParticles.forEach(data => {
          if (data.active) {
            data.zPos -= data.speed * delta * 80;
            if (data.zPos < 0) data.zPos = 8 + Math.random() * 2;
            data.mesh.position.z = data.zPos;
          }
        });

        serverLeds.forEach((mat, index) => {
          mat.color.setHex(Math.sin(time * 5 + index) > 0.5 ? 0x10b981 : 0x064e3b);
        });

        logoMat.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- LIMPIEZA ---
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      try {
        video1.pause();
        video1.src = '';
        video1.load();
        video2.pause();
        video2.src = '';
        video2.load();
      } catch (e) {
        console.log("Error cleaning up videos:", e);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [gsapLoaded]);

  // Manejador del botón en React (Desplazamiento suave nativo)
  const handleConnectClick = () => {
    if (!gsapLoaded) return;
    
    if (status === 'connected') {
      const nextSection = document.getElementById('propuesta');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (status === 'idle') {
      connectActionRef.current?.();
    }
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('propuesta');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#061014]">
      <section className="relative w-full h-screen overflow-hidden bg-[#061014] text-white font-sans">
        
        {/* Estilos CSS personalizados */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 12px rgba(16, 185, 129, 0.2), inset 0 0 6px rgba(16, 185, 129, 0.08);
              border-color: rgba(16, 185, 129, 0.35);
              background: rgba(6, 78, 59, 0.01);
            }
            50% {
              box-shadow: 0 0 24px rgba(16, 185, 129, 0.5), inset 0 0 10px rgba(16, 185, 129, 0.15);
              border-color: rgba(52, 211, 153, 0.8);
              background: rgba(6, 78, 59, 0.04);
            }
          }
          @keyframes pulseConnecting {
            0%, 100% {
              box-shadow: 0 0 12px rgba(245, 158, 11, 0.2), inset 0 0 6px rgba(245, 158, 11, 0.08);
              border-color: rgba(245, 158, 11, 0.35);
              background: rgba(120, 53, 4, 0.01);
            }
            50% {
              box-shadow: 0 0 24px rgba(245, 158, 11, 0.5), inset 0 0 10px rgba(245, 158, 11, 0.15);
              border-color: rgba(251, 191, 36, 0.8);
              background: rgba(120, 53, 4, 0.04);
            }
          }
          @keyframes pulseConnected {
            0%, 100% {
              box-shadow: 0 0 18px rgba(16, 185, 129, 0.4), inset 0 0 8px rgba(16, 185, 129, 0.15);
              border-color: rgba(52, 211, 153, 0.6);
              background: rgba(6, 78, 59, 0.05);
            }
            50% {
              box-shadow: 0 0 32px rgba(16, 185, 129, 0.8), inset 0 0 15px rgba(16, 185, 129, 0.3);
              border-color: rgba(110, 231, 183, 0.95);
              background: rgba(6, 78, 59, 0.12);
            }
          }
          @keyframes ledPulse {
            0%, 100% {
              opacity: 0.6;
              filter: drop-shadow(0 0 3px rgba(52, 211, 153, 0.7)) drop-shadow(0 0 6px rgba(52, 211, 153, 0.3));
              transform: scale(0.95);
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.95)) drop-shadow(0 0 18px rgba(52, 211, 153, 0.6));
              transform: scale(1.08);
            }
          }
          @keyframes ledPulseAmber {
            0%, 100% {
              opacity: 0.6;
              filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.7)) drop-shadow(0 0 6px rgba(251, 191, 36, 0.3));
              transform: scale(0.95);
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.95)) drop-shadow(0 0 18px rgba(251, 191, 36, 0.6));
              transform: scale(1.1);
            }
          }
          @keyframes ledActiveSteady {
            0%, 100% {
              filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.8)) drop-shadow(0 0 15px rgba(52, 211, 153, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(52, 211, 153, 1)) drop-shadow(0 0 28px rgba(52, 211, 153, 0.8));
            }
          }
          @keyframes laserSweep {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .btn-cyber-idle {
            animation: pulseGlow 3s infinite ease-in-out;
            border-width: 1px !important;
          }
          .btn-cyber-idle:hover {
            transform: translateY(-1px);
          }
          .btn-cyber-connecting {
            animation: pulseConnecting 1.2s infinite ease-in-out;
            border-width: 1px !important;
          }
          .btn-cyber-connected {
            animation: pulseConnected 2s infinite ease-in-out;
            border-width: 1px !important;
          }
          .led-active {
            animation: ledPulse 1.8s infinite ease-in-out;
          }
          .led-connecting {
            animation: ledPulseAmber 0.6s infinite ease-in-out;
          }
          .led-connected {
            animation: ledActiveSteady 1.5s infinite ease-in-out;
          }
          .laser-sweep-bg {
            background: linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.1) 30%, rgba(52, 211, 153, 0.3) 50%, rgba(52, 211, 153, 0.1) 70%, transparent);
            background-size: 200% 100%;
            animation: laserSweep 3.5s infinite linear;
          }
          .laser-sweep-bg-connecting {
            background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1) 30%, rgba(251, 191, 36, 0.35) 50%, rgba(251, 191, 36, 0.1) 70%, transparent);
            background-size: 200% 100%;
            animation: laserSweep 1.2s infinite linear;
          }
          .laser-sweep-bg-connected {
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.08) 70%, transparent);
            background-size: 200% 100%;
            animation: laserSweep 5s infinite linear;
          }
          .tech-bg-grid {
            background-image: linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
            background-size: 8px 8px;
          }
          .tech-bg-grid-connecting {
            background-image: linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px);
            background-size: 8px 8px;
          }
          .tech-bg-grid-connected {
            background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
            background-size: 6px 6px;
          }
          @keyframes gridFlow {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 40px;
            }
          }
          .grid-floor-animated {
            animation: gridFlow 4.5s infinite linear;
          }
          @keyframes ledGlowPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
              box-shadow: 0 0 6px #10b981, 0 0 12px rgba(16, 185, 129, 0.6);
            }
            50% {
              transform: scale(1.25);
              opacity: 1;
              box-shadow: 0 0 12px #34d399, 0 0 24px rgba(52, 211, 153, 0.9);
            }
          }
          .led-glow-node {
            animation: ledGlowPulse 2.2s infinite ease-in-out;
          }
        `}} />

        {/* Contenedor del Canvas 3D */}
        <div ref={mountRef} className="absolute inset-0 z-0 cursor-move" />

        {/* Capa de Interfaz de Usuario UI */}
        <div className="relative z-10 flex items-center h-full w-full p-8 md:p-16 lg:p-24 pointer-events-none">
          
          {/* Contenedor del texto (Alineado a la izquierda) */}
          <div className="max-w-2xl w-full pointer-events-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-emerald-500/30 rounded-full bg-emerald-950/40 backdrop-blur-md text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Infraestructura Greenworking Lista
            </div>
            
            <h1 className="group/title text-2xl sm:text-3xl md:text-[2.25rem] lg:text-[2.75rem] font-extrabold tracking-tight mb-5 leading-tight cursor-default">
              <span className="text-white group-hover/title:text-emerald-400 transition-colors duration-500">
                Infraestructura tecnológica para <br />
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-300 group-hover/title:text-white transition-all duration-500">
                empresas que no pueden detenerse.
              </span>
            </h1>
            
            <p className="text-zinc-300 text-xs md:text-sm mb-8 leading-relaxed font-normal tracking-wide text-justify max-w-lg drop-shadow-md opacity-90">
              Conectamos, protegemos y sostenemos la operación de tu organización mediante soluciones integrales de alto rendimiento en redes, data centers, energía crítica y soporte de primer nivel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button 
                onClick={handleConnectClick}
                disabled={!gsapLoaded}
                className={`group relative px-5 py-2.5 text-white font-bold rounded-lg overflow-hidden flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-lg active:translate-y-[1px] active:scale-[0.98] ${
                  !gsapLoaded ? 'bg-gray-800/10 border border-gray-700/30 cursor-not-allowed opacity-50' :
                  status === 'idle' ? 'btn-cyber-idle border backdrop-blur-[2px]' : 
                  status === 'connecting' ? 'btn-cyber-connecting border backdrop-blur-[2px]' : 
                  'btn-cyber-connected border backdrop-blur-[2px] text-white hover:bg-emerald-500/10'
                }`}
                style={{ minWidth: '220px' }}
              >
                {/* Sci-Fi Decorative Grid Background */}
                <div className={`absolute inset-0 z-0 opacity-20 transition-opacity duration-500 ${
                  status === 'idle' ? 'tech-bg-grid' :
                  status === 'connecting' ? 'tech-bg-grid-connecting' :
                  'tech-bg-grid-connected opacity-15'
                }`} />
                
                {/* Laser Sweep Overlay */}
                <div className={`absolute inset-0 z-0 pointer-events-none opacity-45 ${
                  status === 'idle' ? 'laser-sweep-bg' :
                  status === 'connecting' ? 'laser-sweep-bg-connecting' :
                  'laser-sweep-bg-connected opacity-20'
                }`} />

                {/* Cyber brackets in corners */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-all duration-300 ${
                  status === 'idle' ? 'border-emerald-400/70 group-hover:border-emerald-300' :
                  status === 'connecting' ? 'border-amber-400/70' :
                  'border-white/70'
                }`} />
                <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-all duration-300 ${
                  status === 'idle' ? 'border-emerald-400/70 group-hover:border-emerald-300' :
                  status === 'connecting' ? 'border-amber-400/70' :
                  'border-white/70'
                }`} />
                <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-all duration-300 ${
                  status === 'idle' ? 'border-emerald-400/70 group-hover:border-emerald-300' :
                  status === 'connecting' ? 'border-amber-400/70' :
                  'border-white/70'
                }`} />
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-all duration-300 ${
                  status === 'idle' ? 'border-emerald-400/70 group-hover:border-emerald-300' :
                  status === 'connecting' ? 'border-amber-400/70' :
                  'border-white/70'
                }`} />

                {/* Tactical Meta Info */}
                <span className={`relative z-10 font-mono text-[7.5px] tracking-[0.18em] font-semibold transition-colors duration-300 uppercase ${
                  status === 'idle' ? 'text-emerald-400/70 group-hover:text-emerald-300/95' :
                  status === 'connecting' ? 'text-amber-400/70' :
                  'text-white/70'
                }`}>
                  {status === 'idle' && 'SYS.LINK // SW.CTRL'}
                  {status === 'connecting' && 'ESTABLISHING CONNECTION...'}
                  {status === 'connected' && 'SECURE NETWORK ENCRYPTED'}
                </span>

                {/* Core Interactive Layout (LED + Label) */}
                <div className="relative z-10 flex items-center justify-center gap-2.5 mt-0.5">
                  
                  {/* Physical LED Status Light Indicator */}
                  <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    status === 'idle' ? 'border-emerald-500/30 bg-emerald-950/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]' :
                    status === 'connecting' ? 'border-amber-500/30 bg-amber-950/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]' :
                    'border-white/30 bg-emerald-900/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full relative transition-all duration-500 ${
                      status === 'idle' ? 'bg-emerald-500 led-active' :
                      status === 'connecting' ? 'bg-amber-500 led-connecting' :
                      'bg-emerald-300 led-connected'
                    }`}>
                      <div className="absolute top-[0.8px] left-[0.8px] w-0.5 h-0.5 bg-white/90 rounded-full filter blur-[0.05px]" />
                    </div>
                  </div>

                  {/* Main Label */}
                  <span className={`text-[10.5px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-300 ${
                    status === 'idle' ? 'text-white/90 group-hover:text-emerald-400' :
                    status === 'connecting' ? 'text-amber-400 group-hover:text-amber-300' :
                    'text-white group-hover:text-emerald-250'
                  }`}>
                    {(!gsapLoaded || status === 'idle') && (
                      <>
                        {gsapLoaded ? 'Conectar al Switch' : 'Iniciando...'}
                        {gsapLoaded && (
                          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        )}
                      </>
                    )}
                    {status === 'connecting' && (
                      <span className="flex items-center gap-1.5">
                        Conectando
                        <svg className="animate-spin h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                    )}
                    {status === 'connected' && (
                      <span className="flex items-center gap-1.5 text-white">
                        Ingresar a la Red
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </button>
              
              <a 
                href="#servicios" 
                className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white font-sans font-semibold text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                Conocer Soluciones
              </a>
            </div>
          </div>
        </div>

        {/* Diagonal notch at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none overflow-hidden z-20">
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d12] via-[#061014]/90 to-transparent" />
          
          <svg className="absolute bottom-0 left-0 w-full h-12 text-[#080d12] fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,0 L600,0 L640,24 L800,24 L840,0 L1440,0 L1440,48 L0,48 Z" />
          </svg>

          <svg className="absolute bottom-0 left-0 w-full h-12" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path 
              d="M0,0 L600,0 L640,24 L800,24 L840,0 L1440,0" 
              fill="none" 
              stroke="url(#transitionLaserGradient)" 
              strokeWidth="2" 
              className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]"
            />
            <defs>
              <linearGradient id="transitionLaserGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="25%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="42%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="58%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute bottom-6 left-[44.4%] w-1.5 h-1.5 rounded-full bg-emerald-400 led-glow-node" />
          <div className="absolute bottom-6 right-[44.4%] w-1.5 h-1.5 rounded-full bg-emerald-400 led-glow-node" />

          {/* Botón de bajar interactivo y dinámico */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto">
            <button 
              onClick={handleScrollDown}
              className="group flex flex-col items-center focus:outline-none transition-all duration-300 hover:-translate-y-0.5 relative pt-4"
              aria-label="Desplazarse hacia abajo"
            >
              {/* Etiqueta flotante "Bajar" que aparece al pasar el mouse */}
              <span className="absolute top-0 text-[8px] font-mono tracking-[0.25em] text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 uppercase pointer-events-none select-none filter drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]">
                Bajar
              </span>

              {/* Tres círculos verticales con animación de rebote y brillo */}
              <div className="flex flex-col gap-1 items-center mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 group-hover:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-300 animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 group-hover:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300 animate-pulse delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300 animate-bounce" />
              </div>
              
              {/* Indicador de flecha sutil */}
              <svg 
                className="w-4 h-4 text-emerald-400/70 group-hover:text-emerald-300 transition-colors duration-300 mt-1 filter drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
