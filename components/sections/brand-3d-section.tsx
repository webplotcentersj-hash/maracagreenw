"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Brand3DSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const connectActionRef = useRef<(() => void) | null>(null);
  const navigateRef = useRef<((view: string) => void) | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [activeView, setActiveView] = useState('MAIN');
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Cargar GSAP dinámicamente
  useEffect(() => {
    if ((window as any).gsap) {
      setGsapLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Simular progreso de carga estética
  useEffect(() => {
    if (gsapLoaded) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gsapLoaded]);

  useEffect(() => {
    if (!gsapLoaded || !mountRef.current || loadingProgress < 100) return;

    const gsap = (window as any).gsap;
    let animationFrameId: number;
    let isConnected = false;
    let isLightOn = false;

    // --- ELEMENTOS DE VIDEO HTML PARA TEXTURAS DE PANTALLAS ---
    const createHiddenVideo = (src: string) => {
      const video = document.createElement('video');
      video.src = src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('webkit-playsinline', 'true');
      video.crossOrigin = 'anonymous';
      video.style.position = 'absolute';
      video.style.width = '0px';
      video.style.height = '0px';
      video.style.opacity = '0';
      document.body.appendChild(video);
      return video;
    };

    // Usaremos videos livianos locales
    const videoMeeting = createHiddenVideo('/3.mp4');
    const videoExec = createHiddenVideo('/Portada Facebook Servicios Autolavado Moderno Azul.mp4');
    const videoOpen = createHiddenVideo('/Portada Facebook Servicios Autolavado Moderno Azul (1).mp4');
    const videoNoc = createHiddenVideo('/Portada Facebook Servicios Autolavado Moderno Azul (2).mp4');

    // Inicializar texturas de video
    const textureMeeting = new THREE.VideoTexture(videoMeeting);
    textureMeeting.colorSpace = THREE.SRGBColorSpace;
    textureMeeting.minFilter = THREE.LinearFilter;
    textureMeeting.magFilter = THREE.LinearFilter;

    const textureExec = new THREE.VideoTexture(videoExec);
    textureExec.colorSpace = THREE.SRGBColorSpace;
    textureExec.minFilter = THREE.LinearFilter;
    textureExec.magFilter = THREE.LinearFilter;

    const textureOpen = new THREE.VideoTexture(videoOpen);
    textureOpen.colorSpace = THREE.SRGBColorSpace;
    textureOpen.minFilter = THREE.LinearFilter;
    textureOpen.magFilter = THREE.LinearFilter;

    const textureNoc = new THREE.VideoTexture(videoNoc);
    textureNoc.colorSpace = THREE.SRGBColorSpace;
    textureNoc.minFilter = THREE.LinearFilter;
    textureNoc.magFilter = THREE.LinearFilter;

    // --- CONFIGURACIÓN BÁSICA ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040b0f, 0.025); 

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);
    camera.position.set(-2, 1.5, 12);

    const targetX = window.innerWidth > 768 ? 3 : 0;
    camera.lookAt(targetX, -1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // --- CONTROLES ORBITALES ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minPolarAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 1.2; 
    controls.maxAzimuthAngle = Math.PI / 1.2;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 40; 
    controls.target.set(targetX, -1, 0);

    // --- LUCES AMBIENTALES Y DE SECTORES ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); 
    scene.add(ambientLight);

    const emergencyLight = new THREE.PointLight(0x0ea5e9, 1.5, 25);
    emergencyLight.position.set(0, 4, 0);
    scene.add(emergencyLight);

    const openSpaceLight = new THREE.PointLight(0xffffff, 0, 30);
    openSpaceLight.position.set(-6, 5, 0);
    scene.add(openSpaceLight);

    const meetingRoomLight = new THREE.PointLight(0xe0f2fe, 0, 20);
    meetingRoomLight.position.set(-15, 4, -2);
    scene.add(meetingRoomLight);

    const execOfficeLight = new THREE.PointLight(0xfff8e7, 0, 20);
    execOfficeLight.position.set(-5, 4, -11);
    scene.add(execOfficeLight);

    const serverRoomLight = new THREE.PointLight(0x10b981, 0.5, 15); 
    serverRoomLight.position.set(5, 3, -4);
    scene.add(serverRoomLight);

    // Centro de Operaciones (NOC)
    const nocLight = new THREE.PointLight(0x0ea5e9, 0, 20);
    nocLight.position.set(13, 4, -6);
    scene.add(nocLight);

    const fiberLight = new THREE.PointLight(0x34d399, 0, 10);
    scene.add(fiberLight);

    // --- GRUPOS PRINCIPALES ---
    const officeGroup = new THREE.Group();
    officeGroup.position.x = targetX - 2; 
    scene.add(officeGroup);

    const cableGroup = new THREE.Group();
    cableGroup.position.set(targetX + 1, 0.5, 8);
    cableGroup.rotation.y = -Math.PI / 6;
    cableGroup.rotation.x = Math.PI / 12;
    scene.add(cableGroup);

    // ==========================================
    // MATERIALES COMUNES (Reutilizables)
    // ==========================================
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x070a0d, roughness: 0.15, metalness: 0.4 });
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x11151a, roughness: 0.8 });
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x0a0d12, roughness: 0.7, metalness: 0.2 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.4 });
    const screenOff = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.2 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x2d1b11, roughness: 0.6 });
    const ledCeilingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0 });
    const execLampMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2, emissive: 0xfff8e7, emissiveIntensity: 0 });
    const leatherMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.4 });
    
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0.2, roughness: 0.05, transmission: 0.9, thickness: 0.5, transparent: true
    });

    // ==========================================
    // ESTRUCTURA DEL EDIFICIO
    // ==========================================
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), floorMat);
    floor.rotation.x = -Math.PI / 2; floor.position.y = -2.4; floor.receiveShadow = true;
    officeGroup.add(floor);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), ceilingMat);
    ceiling.rotation.x = Math.PI / 2; ceiling.position.y = 5.5;
    officeGroup.add(ceiling);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(60, 8, 0.5), wallMat);
    backWall.position.set(0, 1.6, -15);
    officeGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8, 60), wallMat);
    leftWall.position.set(-25, 1.6, 0);
    officeGroup.add(leftWall);

    for(let i=0; i<4; i++) {
        for(let j=0; j<2; j++) {
            if (i === 3 && j === 0) continue; // Omitimos columna en NOC

            const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 8, 0.8), pillarMat);
            pillar.position.set(-18 + (i * 12), 1.6, -8 + (j * 12));
            pillar.castShadow = true;
            officeGroup.add(pillar);
        }
    }

    const ceilingLeds: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const ledPanel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 15), ledCeilingMat);
      ledPanel.position.set(-15 + (i * 8), 5.4, -4);
      officeGroup.add(ledPanel);
      ceilingLeds.push(ledPanel);
    }

    // ==========================================
    // INTERRUPTOR DE LUZ
    // ==========================================
    const switchGroup = new THREE.Group();
    switchGroup.position.set(-6.4, 0.5, -7.6); 
    switchGroup.rotation.y = Math.PI / 2;

    const sBase = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.05), new THREE.MeshStandardMaterial({color: 0x222222}));
    switchGroup.add(sBase);
    const sToggle = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.1), new THREE.MeshStandardMaterial({color: 0xdddddd}));
    sToggle.position.z = 0.04;
    sToggle.rotation.x = -Math.PI / 6; 
    switchGroup.add(sToggle);
    const sLedInd = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), new THREE.MeshBasicMaterial({color: 0xef4444}));
    sLedInd.position.set(0, 0.15, 0.04);
    switchGroup.add(sLedInd);

    officeGroup.add(switchGroup);

    // ==========================================
    // 1. SALA DE REUNIONES
    // ==========================================
    const createMeetingRoom = () => {
        const group = new THREE.Group();
        group.position.set(-16, -2.4, -4);

        const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(10, 7.9, 0.1), glassMat);
        frontGlass.position.set(0, 3.95, 4);
        group.add(frontGlass);
        const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.9, 8), glassMat);
        sideGlass.position.set(5, 3.95, 0);
        group.add(sideGlass);

        const frame1 = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.2, 0.2), darkMetal);
        frame1.position.set(0, 0.1, 4);
        group.add(frame1);

        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(5, 0.1, 2), woodMat);
        tableTop.position.set(0, 1.2, 0);
        const tableBase = new THREE.Mesh(new THREE.BoxGeometry(3, 1.1, 0.5), darkMetal);
        tableBase.position.set(0, 0.55, 0);
        group.add(tableTop, tableBase);

        const chairGeo = new THREE.BoxGeometry(0.6, 1, 0.6);
        for(let i=0; i<3; i++) {
            const chair1 = new THREE.Mesh(chairGeo, darkMetal);
            chair1.position.set(-1.5 + (i * 1.5), 0.5, -1.5);
            const chair2 = new THREE.Mesh(chairGeo, darkMetal);
            chair2.position.set(-1.5 + (i * 1.5), 0.5, 1.5);
            group.add(chair1, chair2);
        }

        const tvBase = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 0.2), darkMetal);
        tvBase.position.set(0, 2.5, -3.9);
        const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), screenOff);
        tvScreen.position.set(0, 2.5, -3.79);
        group.add(tvBase, tvScreen);

        return { group, tvScreen };
    };
    const meetingRoom = createMeetingRoom();
    officeGroup.add(meetingRoom.group);

    // ==========================================
    // 2. OFICINA EJECUTIVA
    // ==========================================
    const createExecOffice = () => {
        const group = new THREE.Group();
        group.position.set(-5, -2.4, -11);

        const premiumWoodMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.6 });
        const rugMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 1.0 }); 
        const plantPotMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2 });
        const plantLeafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 });

        const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(8, 7.9, 0.1), glassMat);
        frontGlass.position.set(0, 3.95, 4);
        group.add(frontGlass);

        const rug = new THREE.Mesh(new THREE.BoxGeometry(7, 0.02, 5), rugMat);
        rug.position.set(0, 0.01, 0);
        group.add(rug);

        for(let i=0; i<25; i++) {
            const slat = new THREE.Mesh(new THREE.BoxGeometry(0.15, 7.9, 0.1), premiumWoodMat);
            slat.position.set(-3.5 + (i * 0.3), 3.95, -3.9);
            group.add(slat);
        }

        const deskMain = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 1.2), premiumWoodMat);
        deskMain.position.set(0, 1.4, 0);
        const deskSide = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 2.5), premiumWoodMat);
        deskSide.position.set(-1.15, 1.4, -0.65);
        const deskModestyPanel = new THREE.Mesh(new THREE.BoxGeometry(3.3, 1.4, 0.05), premiumWoodMat);
        deskModestyPanel.position.set(0, 0.7, 0.55);
        const deskLeg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.4, 1.1), darkMetal);
        deskLeg.position.set(1.6, 0.7, 0);
        group.add(deskMain, deskSide, deskModestyPanel, deskLeg);

        const chairGroup = new THREE.Group();
        chairGroup.position.set(0, 0, -1.2);
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 0.7), leatherMat);
        seat.position.y = 0.8;
        const back = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.15), leatherMat);
        back.position.set(0, 1.4, -0.3);
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.3, 0.8), darkMetal);
        base.position.y = 0.4;
        chairGroup.add(seat, back, base);
        group.add(chairGroup);

        const guestChairGeo = new THREE.BoxGeometry(0.65, 0.8, 0.65);
        const guestChair1 = new THREE.Mesh(guestChairGeo, leatherMat);
        guestChair1.position.set(-0.8, 0.4, 1.8); guestChair1.rotation.y = Math.PI;
        const guestChair2 = new THREE.Mesh(guestChairGeo, leatherMat);
        guestChair2.position.set(0.8, 0.4, 1.8); guestChair2.rotation.y = Math.PI;
        group.add(guestChair1, guestChair2);

        const plantGroup = new THREE.Group();
        plantGroup.position.set(3.5, 0, -3);
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.8), plantPotMat);
        pot.position.y = 0.4;
        plantGroup.add(pot);
        for(let i=0; i<6; i++) {
            const leaf = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + Math.random()*0.2), plantLeafMat);
            leaf.position.set((Math.random()-0.5)*0.6, 0.9 + Math.random()*0.8, (Math.random()-0.5)*0.6);
            plantGroup.add(leaf);
        }
        group.add(plantGroup);

        const lampGroup = new THREE.Group();
        lampGroup.position.set(-3, 0, 2);
        const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1), darkMetal);
        const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3), darkMetal);
        lampPole.position.y = 1.5;
        const lampRing = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.02, 16, 100), execLampMat);
        lampRing.position.set(0, 3, 0.2); lampRing.rotation.x = Math.PI / 4;
        lampGroup.add(lampBase, lampPole, lampRing);
        group.add(lampGroup);

        const screenMonitorGroup = new THREE.Group();
        screenMonitorGroup.position.set(0, 1.55, 0.2); screenMonitorGroup.rotation.y = Math.PI; 
        const screenBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.3), darkMetal);
        const screenStand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4), darkMetal);
        screenStand.position.y = 0.2;
        const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.65), screenOff);
        screen.position.set(0, 0.4, 0.03); 
        screenMonitorGroup.add(screenBase, screenStand, screen);
        group.add(screenMonitorGroup);

        return { group, screen };
    };
    const execOffice = createExecOffice();
    officeGroup.add(execOffice.group);

    // ==========================================
    // 3. OPEN SPACE 
    // ==========================================
    const openScreens: THREE.Mesh[] = [];
    const createWorkstation = (x: number, z: number, rotY: number) => {
      const group = new THREE.Group();
      group.position.set(x, -2.4, z);
      group.rotation.y = rotY;

      // 1. Escritorio (Superficie de madera clara satinada con bordes oscuros)
      const deskTop = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.1, 1.2), 
        new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.35 })
      );
      deskTop.position.y = 1.2;
      group.add(deskTop);

      // Patas de escritorio metálicas
      const legGeo = new THREE.BoxGeometry(0.08, 1.2, 0.08);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
      
      const leg1 = new THREE.Mesh(legGeo, legMat);
      leg1.position.set(-1.15, 0.6, -0.5);
      const leg2 = new THREE.Mesh(legGeo, legMat);
      leg2.position.set(1.15, 0.6, -0.5);
      const leg3 = new THREE.Mesh(legGeo, legMat);
      leg3.position.set(-1.15, 0.6, 0.5);
      const leg4 = new THREE.Mesh(legGeo, legMat);
      leg4.position.set(1.15, 0.6, 0.5);
      group.add(leg1, leg2, leg3, leg4);

      // 2. Divisor acústico de fondo (Gris azulado corporativo elegante con bisel de metal)
      const divider = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.8, 0.05), 
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
      ); 
      divider.position.set(0, 1.6, -0.58);
      group.add(divider);
      
      const dividerTrim = new THREE.Mesh(
        new THREE.BoxGeometry(2.52, 0.03, 0.07),
        new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0ea5e9, emissiveIntensity: 0.2 }) // Pequeño neón decorativo
      );
      dividerTrim.position.set(0, 2.0, -0.58);
      group.add(dividerTrim);

      // 3. MODELADO DE LA NOTEBOOK REALISTA (Ultrabook Premium de aluminio espacial)
      const laptopGroup = new THREE.Group();
      laptopGroup.position.set(0, 1.25, -0.1); // Apoyada en el centro de trabajo

      const laptopAluminiumMat = new THREE.MeshStandardMaterial({
        color: 0x8a95a5, // Gris espacial de aluminio cepillado
        metalness: 0.8,
        roughness: 0.28
      });
      
      const keyboardDarkMat = new THREE.MeshStandardMaterial({
        color: 0x14181f, // Teclado negro
        roughness: 0.6
      });

      // A. Base inferior (Cuerpo de la laptop con teclado y trackpad)
      const laptopBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.012, 0.38), 
        laptopAluminiumMat
      );
      laptopGroup.add(laptopBase);

      // Detalle rebajado del teclado (basin)
      const keyboardBasin = new THREE.Mesh(
        new THREE.BoxGeometry(0.49, 0.004, 0.19),
        new THREE.MeshStandardMaterial({ color: 0x0f1115, roughness: 0.8 })
      );
      keyboardBasin.position.set(0, 0.005, -0.06);
      laptopGroup.add(keyboardBasin);

      // Teclado físico procedural en 3D
      const keyRows = 5;
      const keysPerRow = 14;
      const keyW = 0.45 / keysPerRow;
      const keyH = 0.006;
      const keyD = 0.15 / keyRows;
      const keySpacing = 0.002;
      const xStart = -((keysPerRow * keyW + (keysPerRow - 1) * keySpacing) / 2);
      const zStart = -0.06 - ((keyRows * keyD + (keyRows - 1) * keySpacing) / 2);

      for (let r = 0; r < keyRows; r++) {
        for (let c = 0; c < keysPerRow; c++) {
          const isSpacebar = (r === 4 && c >= 4 && c <= 9);
          if (isSpacebar) {
            if (c === 4) {
              const spacebarW = keyW * 6 + keySpacing * 5;
              const spacebarX = xStart + 4 * (keyW + keySpacing) + spacebarW / 2;
              const spacebarZ = zStart + r * (keyD + keySpacing) + keyD / 2;
              const spacebar = new THREE.Mesh(
                new THREE.BoxGeometry(spacebarW, keyH, keyD),
                keyboardDarkMat
              );
              spacebar.position.set(spacebarX, 0.008, spacebarZ);
              laptopGroup.add(spacebar);
            }
            continue;
          }
          
          const keyMesh = new THREE.Mesh(
            new THREE.BoxGeometry(keyW, keyH, keyD),
            keyboardDarkMat
          );
          const xPos = xStart + c * (keyW + keySpacing) + keyW / 2;
          const zPos = zStart + r * (keyD + keySpacing) + keyD / 2;
          keyMesh.position.set(xPos, 0.008, zPos);
          laptopGroup.add(keyMesh);
        }
      }

      // Detalle del trackpad integrado (ligeramente rebajado con borde sutil)
      const trackpad = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.001, 0.09), 
        new THREE.MeshStandardMaterial({ color: 0x7e8b9b, roughness: 0.4 })
      );
      trackpad.position.set(0, 0.006, 0.1);
      laptopGroup.add(trackpad);

      // B. Bisagra física de aluminio cepillado
      const laptopHinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.48, 16),
        new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.9, roughness: 0.3 })
      );
      laptopHinge.rotation.z = Math.PI / 2;
      laptopHinge.position.set(0, 0.006, -0.18);
      laptopGroup.add(laptopHinge);

      // C. LED de encendido sutil
      const laptopLed = new THREE.Mesh(
        new THREE.SphereGeometry(0.005, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      laptopLed.position.set(0.26, 0.006, 0.1);
      laptopGroup.add(laptopLed);

      // D. Pantalla / Tapa (Pivota en la bisagra trasera)
      const screenGroup = new THREE.Group();
      screenGroup.position.set(0, 0.006, -0.18); 
      screenGroup.rotation.x = -0.26; // Abierta ergonómicamente a 105 grados

      // La tapa de aluminio
      const laptopLid = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.36, 0.012), 
        laptopAluminiumMat
      );
      laptopLid.position.y = 0.18; 
      screenGroup.add(laptopLid);

      // Bisel de pantalla negro elegante
      const screenBezel = new THREE.Mesh(
        new THREE.BoxGeometry(0.53, 0.34, 0.002), 
        new THREE.MeshStandardMaterial({ color: 0x090d12, roughness: 0.7 })
      );
      screenBezel.position.set(0, 0.18, 0.006);
      screenGroup.add(screenBezel);

      // Display LCD de video
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.50, 0.31), 
        screenOff
      );
      screen.position.set(0, 0.18, 0.008); 
      screenGroup.add(screen);
      openScreens.push(screen); 

      laptopGroup.add(screenGroup);
      group.add(laptopGroup);

      // 4. Silla de oficina ergonómica (Base, pistón y respaldo con detalles de cuero negro)
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0, 0, 0.75);

      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.5), leatherMat);
      seat.position.y = 0.6;
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.08), leatherMat);
      back.position.set(0, 1.0, 0.22);
      const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6), darkMetal);
      piston.position.y = 0.3;
      const starBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.5), darkMetal);
      starBase.position.y = 0.02;
      chairGroup.add(seat, back, piston, starBase);
      group.add(chairGroup);

      return group;
    };

    const positions = [
        [-6, -2, 0], [-9, -2, 0], [-12, -2, 0],
        [-6, 1, Math.PI], [-9, 1, Math.PI], [-12, 1, Math.PI],
        [-6, 4, 0], [-9, 4, 0]
    ];
    positions.forEach(pos => officeGroup.add(createWorkstation(pos[0], pos[1], pos[2])));

    // ==========================================
    // 4. DATA CENTER
    // ==========================================
    const serverRoomGroup = new THREE.Group();
    serverRoomGroup.position.set(5, -2.4, -4);
    officeGroup.add(serverRoomGroup);

    const srFrontGlass = new THREE.Mesh(new THREE.BoxGeometry(8, 7.9, 0.1), glassMat);
    srFrontGlass.position.set(0, 3.95, 2);
    serverRoomGroup.add(srFrontGlass);
    
    const srSideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.9, 6), glassMat);
    srSideGlass.position.set(4, 3.95, -1);
    serverRoomGroup.add(srSideGlass);

    // --- FUNCIÓN DE ENMARCADO TÁCTICO DE LOGOS PREMIUM (Evita distorsión y aporta realismo tridimensional) ---
    const createFramedLogo = (width: number, height: number, material: THREE.Material, borderColorHex: number) => {
      const group = new THREE.Group();
      
      // 1. Relación de aspecto física de la imagen (594x300 = 1.98)
      const imageAspectRatio = 1.98;
      
      // Proporción del logotipo con respecto al vidrio (margen interno o padding elegante del 65%)
      let logoWidth = width * 0.65;
      let logoHeight = logoWidth / imageAspectRatio;
      const maxHeight = height * 0.65;
      if (logoHeight > maxHeight) {
        logoHeight = maxHeight;
        logoWidth = logoHeight * imageAspectRatio;
      }
      
      // 2. Vidrio trasero ahumado reflectivo de alta gama (Acrílico corporativo)
      const glassGeo = new THREE.BoxGeometry(width, height, 0.03);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x080f14,
        roughness: 0.08,
        metalness: 0.9,
        transmission: 0.65,
        thickness: 1.0,
        transparent: true,
        opacity: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.z = 0;
      group.add(glassMesh);
      
      // 3. Bisel metálico perimetral tridimensional (Marco de aluminio anodizado gris espacial)
      const borderThickness = 0.03;
      const borderDepth = 0.05;
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937, // Gris espacial oscuro
        roughness: 0.35,
        metalness: 0.85
      });
      
      // Barra superior
      const topBar = new THREE.Mesh(new THREE.BoxGeometry(width + borderThickness * 2, borderThickness, borderDepth), metalMat);
      topBar.position.set(0, height / 2 + borderThickness / 2, 0);
      group.add(topBar);
      
      // Barra inferior
      const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(width + borderThickness * 2, borderThickness, borderDepth), metalMat);
      bottomBar.position.set(0, -height / 2 - borderThickness / 2, 0);
      group.add(bottomBar);
      
      // Barra izquierda
      const leftBar = new THREE.Mesh(new THREE.BoxGeometry(borderThickness, height, borderDepth), metalMat);
      leftBar.position.set(-width / 2 - borderThickness / 2, 0, 0);
      group.add(leftBar);
      
      // Barra derecha
      const rightBar = new THREE.Mesh(new THREE.BoxGeometry(borderThickness, height, borderDepth), metalMat);
      rightBar.position.set(width / 2 + borderThickness / 2, 0, 0);
      group.add(rightBar);
      
      // 4. Pernos de acero inoxidable (Standoffs espaciadores) en las 4 esquinas del vidrio
      const boltRadius = 0.025;
      const boltHeight = 0.06;
      const boltMat = new THREE.MeshStandardMaterial({
        color: 0xe5e7eb, // Metal satinado brillante
        roughness: 0.15,
        metalness: 0.95
      });
      const boltGeo = new THREE.CylinderGeometry(boltRadius, boltRadius, boltHeight, 16);
      boltGeo.rotateX(Math.PI / 2); // Orientar en Z para que apunte a la pared
      
      const offset = Math.min(width, height) * 0.08; // Margen para los pernos desde los bordes
      const boltPositions = [
        [-width / 2 + offset, height / 2 - offset],
        [width / 2 - offset, height / 2 - offset],
        [-width / 2 + offset, -height / 2 + offset],
        [width / 2 - offset, -height / 2 + offset]
      ];
      
      boltPositions.forEach(([bx, by]) => {
        const boltMesh = new THREE.Mesh(boltGeo, boltMat);
        boltMesh.position.set(bx, by, -0.015);
        group.add(boltMesh);
      });
      
      // 5. Brillo de neón trasero (Glow contra la pared)
      const glowGeo = new THREE.BoxGeometry(width - 0.02, height - 0.02, 0.01);
      const glowMat = new THREE.MeshBasicMaterial({
        color: borderColorHex,
        transparent: true,
        opacity: 0.5,
        depthWrite: false
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.z = -0.025; // Ubicado detrás del vidrio ahumado
      group.add(glowMesh);
      
      // 6. Logotipo propiamente dicho centrado y suspendido en el vidrio sin distorsión
      const logoGeo = new THREE.PlaneGeometry(logoWidth, logoHeight);
      const logoMesh = new THREE.Mesh(logoGeo, material);
      logoMesh.position.z = 0.016; // Flotando en frente del vidrio
      group.add(logoMesh);
      
      return group;
    };

    // Cargar logo de Greenworking localmente
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    const logoTexture = textureLoader.load('/greenworking-soluciones-tecnologicas-logo-green-vf-1.png');
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    
    // Logo 1: Data Center (Server Room)
    const logoMat = new THREE.MeshStandardMaterial({ 
      map: logoTexture, transparent: true, emissive: 0x22c55e, emissiveMap: logoTexture, emissiveIntensity: 0.1 
    });
    const framedLogo = createFramedLogo(3.0, 1.5, logoMat, 0x22c55e);
    framedLogo.position.set(0, 4.5, -3.9);
    serverRoomGroup.add(framedLogo);

    // Cartel luminoso 2: Sala de Reuniones (Encima de la pantalla de TV)
    const meetingLogoMat = new THREE.MeshStandardMaterial({
      map: logoTexture, transparent: true, emissive: 0x22c55e, emissiveMap: logoTexture, emissiveIntensity: 0.1
    });
    const meetingLogo = createFramedLogo(1.6, 0.8, meetingLogoMat, 0x22c55e);
    meetingLogo.position.set(0, 4.2, -3.85);
    meetingRoom.group.add(meetingLogo);

    // Cartel luminoso 3: Oficina Ejecutiva (Sobre los listones de madera detrás del escritorio)
    const execLogoMat = new THREE.MeshStandardMaterial({
      map: logoTexture, transparent: true, emissive: 0x10b981, emissiveMap: logoTexture, emissiveIntensity: 0.1
    });
    const execLogo = createFramedLogo(1.8, 0.9, execLogoMat, 0x10b981);
    execLogo.position.set(0, 4.3, -3.8);
    execOffice.group.add(execLogo);

    // Cartel luminoso 4: Open Space (Cartel Colgante suspendido de cables tensores)
    const openLogoMat = new THREE.MeshStandardMaterial({
      map: logoTexture, transparent: true, emissive: 0x22c55e, emissiveMap: logoTexture, emissiveIntensity: 0.1
    });
    const openLogoGroup = new THREE.Group();
    openLogoGroup.position.set(-9, 3.8, 1.5);
    const openLogoMesh = createFramedLogo(2.2, 1.1, openLogoMat, 0x22c55e);
    openLogoMesh.position.set(0, 0, 0);
    const hanger1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5), darkMetal);
    hanger1.position.set(-1.2, 0.75, 0);
    const hanger2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5), darkMetal);
    hanger2.position.set(1.2, 0.75, 0);
    openLogoGroup.add(openLogoMesh, hanger1, hanger2);
    officeGroup.add(openLogoGroup);


    const serverLeds: THREE.Material[] = [];
    for(let j = 0; j < 3; j++) {
      const rackGroup = new THREE.Group();
      rackGroup.position.set(-2 + (j * 2.5), 0, -2);
      
      const rackBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 5, 1.5), darkMetal);
      rackBody.position.y = 2.5;
      rackGroup.add(rackBody);

      for(let i = 0; i < 8; i++) {
        const server = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.3, 1.3), new THREE.MeshStandardMaterial({ color: 0x1f2937 }));
        server.position.set(0, 0.8 + (i * 0.5), 0.1);
        rackGroup.add(server);

        const sLed = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0x059669 }));
        sLed.position.set(0.5, 0.8 + (i * 0.5), 0.76);
        rackGroup.add(sLed);
        serverLeds.push(sLed.material);
      }
      serverRoomGroup.add(rackGroup);
    }

    const routerX_Relative = 4; 
    const router = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 1.5), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.8 }));
    router.position.set(routerX_Relative, -1.7, -0.5); 
    officeGroup.add(router);

    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32), new THREE.MeshStandardMaterial({ color: 0x000000 }));
    port.rotation.x = Math.PI / 2; port.position.set(routerX_Relative, -1.7, 0.3); 
    officeGroup.add(port);

    const ledMat1 = new THREE.MeshBasicMaterial({ color: 0xef4444 }); 
    const led1 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), ledMat1);
    led1.position.set(routerX_Relative + 0.7, -1.6, 0.35);
    officeGroup.add(led1);

    // ==========================================
    // 5. NOC (SALA DE CONTROL)
    // ==========================================
    const nocScreenMats: THREE.MeshStandardMaterial[] = [];
    const createNOCRoom = () => {
        const group = new THREE.Group();
        group.position.set(15, -2.4, -6);

        const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.9, 10), glassMat);
        frontGlass.position.set(-6, 3.95, 0);
        group.add(frontGlass);

        // VIDEO WALL GIGANTE
        const videoWallGroup = new THREE.Group();
        videoWallGroup.position.set(5.8, 3.5, 0);
        videoWallGroup.rotation.y = -Math.PI / 2;
        
        for (let i = 0; i < 3; i++) { 
            for (let j = 0; j < 2; j++) { 
                const mat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2 });
                nocScreenMats.push(mat);
                
                const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.8), mat);
                const border = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.9, 0.1), darkMetal);
                
                screen.position.set(-3.2 + i * 3.2, -1 + j * 1.9, 0.06);
                border.position.set(-3.2 + i * 3.2, -1 + j * 1.9, 0);
                
                videoWallGroup.add(screen);
                videoWallGroup.add(border);
            }
        }
        group.add(videoWallGroup);

        // ESTACIONES DE MONITOREO
        for(let i=0; i<2; i++) { 
            const deskGroup = new THREE.Group();
            deskGroup.position.set(1, 0, -2.5 + (i * 5));

            const desk = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 1.5), darkMetal);
            desk.position.set(0, 1.2, 0);
            deskGroup.add(desk);

            const chair = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.8), leatherMat);
            chair.position.set(-1.5, 0.6, 0);
            deskGroup.add(chair);

            for(let k=0; k<3; k++) {
                const mat = new THREE.MeshStandardMaterial({ color: 0x050505 });
                nocScreenMats.push(mat);
                const monitor = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), mat);
                monitor.position.set(0.6, 1.6, -1 + (k * 1));
                monitor.rotation.y = Math.PI / 2; 
                
                if(k===0) monitor.rotation.y = Math.PI/2 - 0.3;
                if(k===2) monitor.rotation.y = Math.PI/2 + 0.3;

                deskGroup.add(monitor);
            }
            group.add(deskGroup);
        }

        return group;
    }
    const nocRoom = createNOCRoom();
    officeGroup.add(nocRoom);

    // Cartel luminoso 5: Centro de Operaciones - NOC (En la pared de fondo, perfectamente enmarcado)
    const nocLogoMat = new THREE.MeshStandardMaterial({
      map: logoTexture, transparent: true, emissive: 0x0ea5e9, emissiveMap: logoTexture, emissiveIntensity: 0.1
    });
    const nocLogo = createFramedLogo(2.4, 1.2, nocLogoMat, 0x0ea5e9);
    nocLogo.position.set(0, 5.2, -4.8);
    nocRoom.add(nocLogo);

    // ==========================================
    // CABLE DE FIBRA ÓPTICA
    // ==========================================
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xa7f3d0, emissive: 0x059669, emissiveIntensity: 0.5, transparent: true, opacity: 0.9 });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 12, 16), coreMat);
    core.rotation.x = Math.PI / 2; core.position.z = 6;
    cableGroup.add(core);

    const cladding = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 10, 16), new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.1, transmission: 0.9 }));
    cladding.rotation.x = Math.PI / 2; cladding.position.z = 6.0;
    cableGroup.add(cladding);

    const kevlar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 8.5, 32), new THREE.MeshStandardMaterial({ color: 0x0284c7, wireframe: true }));
    kevlar.rotation.x = Math.PI / 2; kevlar.position.z = 6.25;
    cableGroup.add(kevlar);

    const kevlarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 8.5, 16), new THREE.MeshStandardMaterial({ color: 0x0369a1 }));
    kevlarBase.rotation.x = Math.PI / 2; kevlarBase.position.z = 6.25;
    cableGroup.add(kevlarBase);

    const innerJacket = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 7, 32), new THREE.MeshStandardMaterial({ color: 0xd1d5db }));
    innerJacket.rotation.x = Math.PI / 2; innerJacket.position.z = 6.5;
    cableGroup.add(innerJacket);

    const outerJacket = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 15, 32), new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.8 }));
    outerJacket.rotation.x = Math.PI / 2; outerJacket.position.z = 11.5;
    cableGroup.add(outerJacket);

    const dataParticles: any[] = [];
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    for(let i = 0; i < 20; i++) {
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), particleMat.clone());
      particle.position.z = Math.random() * 8; 
      cableGroup.add(particle);
      dataParticles.push({ mesh: particle, zPos: particle.position.z, speed: 0.05 + Math.random() * 0.12, active: false });
    }

    gsap.to(cableGroup.position, { y: "+=0.2", x: "-=0.1", duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(cableGroup.rotation, { x: "+=0.05", y: "-=0.05", duration: 2.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // ==========================================
    // INTERACCIÓN: RAYCASTER PARA EL INTERRUPTOR
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const turnOnGeneralLights = (duration = 1) => {
      isLightOn = true;
      gsap.to(sToggle.rotation, { x: Math.PI/6, duration: 0.2 });
      gsap.to(sLedInd.material, { color: 0x22c55e, duration: 0.2 });
      
      gsap.to(ambientLight, { intensity: 0.8, duration: duration });
      gsap.to(ledCeilingMat, { emissiveIntensity: 2, duration: duration });
    };

    const turnOffGeneralLights = (duration = 1) => {
      isLightOn = false;
      gsap.to(sToggle.rotation, { x: -Math.PI/6, duration: 0.2 });
      gsap.to(sLedInd.material, { color: 0xef4444, duration: 0.2 });
      
      gsap.to(ambientLight, { intensity: 0.15, duration: duration });
      gsap.to(ledCeilingMat, { emissiveIntensity: 0, duration: duration });
    };

    const onMouseClick = (event: MouseEvent) => {
        if((event.target as HTMLElement).tagName === 'BUTTON' || (event.target as HTMLElement).closest('button')) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([switchGroup], true);
        if (intersects.length > 0) {
            isLightOn ? turnOffGeneralLights() : turnOnGeneralLights();
        }
    };

    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects([switchGroup], true);
        document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    window.addEventListener('click', onMouseClick);
    window.addEventListener('mousemove', onMouseMove);

    // ==========================================
    // SISTEMA DE NAVEGACIÓN DE OFICINAS
    // ==========================================
    const locations: Record<string, { cam: { x: number, y: number, z: number }, tgt: { x: number, y: number, z: number } }> = {
        MAIN: { cam: { x: targetX - 5, y: 7, z: 22 }, tgt: { x: targetX - 4, y: 0, z: -4 } },
        MEETING: { cam: { x: targetX - 18, y: -0.5, z: -1 }, tgt: { x: targetX - 18, y: -0.5, z: -4 } },
        EXEC: { cam: { x: targetX - 6, y: 1.2, z: -5.5 }, tgt: { x: targetX - 6, y: -0.5, z: -11 } },
        DATACENTER: { cam: { x: targetX + 1, y: -0.5, z: -0.5 }, tgt: { x: targetX + 5, y: 0.5, z: -4 } },
        NOC: { cam: { x: targetX + 7, y: 1, z: -6 }, tgt: { x: targetX + 13, y: 0.5, z: -6 } }
    };

    navigateRef.current = (loc) => {
        const dest = locations[loc];
        if(!dest) return;
        
        gsap.to(camera.position, { x: dest.cam.x, y: dest.cam.y, z: dest.cam.z, duration: 2.5, ease: "power2.inOut" });
        gsap.to(controls.target, { x: dest.tgt.x, y: dest.tgt.y, z: dest.tgt.z, duration: 2.5, ease: "power2.inOut" });
    };

    // --- SECUENCIA DE CONEXIÓN ---
    const absolutePortTargetX = officeGroup.position.x + routerX_Relative;
    const portTarget = new THREE.Vector3(absolutePortTargetX, -1.7, 0.5);

    connectActionRef.current = () => {
      gsap.killTweensOf(cableGroup.position);
      gsap.killTweensOf(cableGroup.rotation);
      
      const tl = gsap.timeline({
        onComplete: () => {
          isConnected = true; 
          setStatus('connected'); 
          
          ledMat1.color.setHex(0x10b981);
          serverLeds.forEach((mat: any) => mat.color.setHex(0x34d399));
          
          fiberLight.position.copy(portTarget);
          gsap.to(fiberLight, { intensity: 10, duration: 0.3, yoyo: true, repeat: 1 });
          gsap.to(fiberLight, { intensity: 3, duration: 0.5, delay: 0.6 });
          
          if (!isLightOn) {
             turnOnGeneralLights(2); 
          }

          gsap.to(serverRoomLight, { intensity: 6, duration: 1 });
          
          // Encendido secuencial y pulsado en cascada de todos los carteles luminosos de marca
          const brandLogoMats = [logoMat, meetingLogoMat, execLogoMat, openLogoMat, nocLogoMat];
          brandLogoMats.forEach(mat => {
            gsap.to(mat, { emissiveIntensity: 2, duration: 0.5 });
            gsap.to(mat, { emissiveIntensity: 1, duration: 1.5, delay: 0.5 });
          });
          
          // --- ENCENDIDO DE PANTALLAS DE PC CON VIDEOS ACTIVOS ---
          
          // 1. Sala de Reuniones TV
          videoMeeting.play().catch(err => console.log('Video Meeting error:', err));
          meetingRoom.tvScreen.material = new THREE.MeshStandardMaterial({
            map: textureMeeting,
            emissive: 0xffffff,
            emissiveMap: textureMeeting,
            emissiveIntensity: 0.8,
            roughness: 0.2
          });
          gsap.to(meetingRoomLight, { intensity: 5, duration: 1.5, delay: 1 });
          
          // 2. Oficina Ejecutiva
          videoExec.play().catch(err => console.log('Video Exec error:', err));
          execOffice.screen.material = new THREE.MeshStandardMaterial({
            map: textureExec,
            emissive: 0xffffff,
            emissiveMap: textureExec,
            emissiveIntensity: 0.8,
            roughness: 0.2
          });
          gsap.to(execOfficeLight, { intensity: 8, duration: 1.5, delay: 1.2 });
          gsap.to(execLampMat, { emissiveIntensity: 2, duration: 1, delay: 1.4 });

          // 3. Open Space Escritorios
          videoOpen.play().catch(err => console.log('Video Open error:', err));
          gsap.to(openSpaceLight, { intensity: 6, duration: 1.5, delay: 0.5 });
          openScreens.forEach((scr, index) => {
              scr.material = new THREE.MeshStandardMaterial({
                map: textureOpen,
                emissive: 0xffffff,
                emissiveMap: textureOpen,
                emissiveIntensity: 0.6,
                roughness: 0.2
              });
          });

          // 4. Sala NOC (Centro de Operaciones) con Video Wall Inteligente
          videoNoc.play().catch(err => console.log('Video NOC error:', err));
          gsap.to(nocLight, { intensity: 6, duration: 1.5, delay: 0.7 });
          const techColors = [0x0ea5e9, 0x10b981, 0x3b82f6]; // Colores de red
          nocScreenMats.forEach((mat, index) => {
              const randColor = techColors[Math.floor(Math.random() * techColors.length)];
              mat.map = textureNoc;
              mat.emissiveMap = textureNoc;
              mat.needsUpdate = true;
              gsap.to(mat, { emissiveIntensity: 1.2, duration: 0.4, delay: 1 + (index * 0.1) });
              mat.emissive.setHex(randColor);
              mat.color.setHex(randColor);
          });

          // Activar partículas
          gsap.to(coreMat, { emissiveIntensity: 4, duration: 0.5 });
          gsap.to(coreMat.color, { r: 0.1, g: 0.9, b: 0.5, duration: 0.5 });
          dataParticles.forEach(p => { p.active = true; p.mesh.material.opacity = 1; });

          navigateRef.current!('MAIN');
          setActiveView('MAIN');
          gsap.to(scene.fog, { density: 0.015, duration: 5 }); 
        }
      });

      tl.to(cableGroup.position, { x: portTarget.x, y: portTarget.y, z: portTarget.z + 4, duration: 1.5, ease: "power2.inOut" }, 0);
      tl.to(cableGroup.rotation, { x: 0, y: 0, z: 0, duration: 1.5, ease: "power2.inOut" }, 0);
      tl.to(cableGroup.position, { z: portTarget.z - 0.2, duration: 0.5, ease: "power1.in" }, "+=0.1");
    };

    // --- BUCLE DE RENDER ---
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      if (!isConnected) {
        const newTargetX = window.innerWidth > 768 ? 3 : 0;
        officeGroup.position.x = newTargetX - 2;
        controls.target.set(newTargetX, -1, 0);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      controls.update(); 
      
      if(isConnected) {
        dataParticles.forEach(data => {
          if (data.active) {
            data.zPos -= data.speed * delta * 80;
            if (data.zPos < 0) data.zPos = 8 + Math.random() * 2;
            data.mesh.position.z = data.zPos;
          }
        });

        serverLeds.forEach((mat: any, index) => {
          mat.color.setHex( Math.sin(time * 5 + index) > 0.5 ? 0x10b981 : 0x064e3b );
        });
        
        const pulseVal = 0.8 + Math.sin(time * 2) * 0.2;
        logoMat.emissiveIntensity = pulseVal;
        meetingLogoMat.emissiveIntensity = pulseVal;
        execLogoMat.emissiveIntensity = pulseVal;
        openLogoMat.emissiveIntensity = pulseVal;
        nocLogoMat.emissiveIntensity = pulseVal;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- DESMONTAJE Y LIMPIEZA ---
    return () => {
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      
      // Detener y remover videos para evitar fugas de memoria
      [videoMeeting, videoExec, videoOpen, videoNoc].forEach(v => {
        try {
          v.pause();
          v.src = "";
          v.load();
          if (v.parentNode) {
            v.parentNode.removeChild(v);
          }
        } catch(e) {
          console.log('Video cleanup error:', e);
        }
      });

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();

      document.body.style.cursor = 'default';
    };
  }, [gsapLoaded, loadingProgress]);

  const handleConnectClick = () => {
    if (status !== 'idle' || !gsapLoaded) return;
    setStatus('connecting');
    if (connectActionRef.current) {
      connectActionRef.current();
    }
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    if(navigateRef.current) {
        navigateRef.current(view);
    }
  };

  // Botón para cerrar y volver al sitio convencional (limpiando el URL hash)
  const handleClose = () => {
    window.location.hash = '';
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#040b0f] text-white font-sans z-[100] flex flex-col items-center justify-center">
      <style>
        {`
          .btn-glow { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); transition: all 0.3s ease; }
          .btn-glow:hover { box-shadow: 0 0 35px rgba(34, 197, 94, 0.7); }
          .btn-connected { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); background-color: #059669 !important; border: 1px solid #34d399; }
          .nav-btn { transition: all 0.2s; }
          .nav-btn:hover { background-color: rgba(255,255,255,0.1); transform: scale(1.1); }
          .nav-active { background-color: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #10b981; }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>

      {/* Pantalla de Carga Futurista */}
      {(!gsapLoaded || loadingProgress < 100) && (
        <div className="absolute inset-0 bg-[#040b0f] z-[110] flex flex-col items-center justify-center gap-6 p-8">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Logo de Carga */}
            <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping duration-1000"></div>
            <div className="absolute inset-2 border-2 border-emerald-400/40 border-t-emerald-400 rounded-full animate-spin duration-700"></div>
            <svg className="w-10 h-10 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              
<path strokeLinecap="round" strokeLinejoin="round" d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2 max-w-sm text-center">
            <h3 className="text-sm font-semibold tracking-widest text-emerald-400 uppercase">GW_VIRTUAL_LAB // INICIANDO</h3>
            <p className="text-[11px] font-medium text-gray-500 font-mono">INICIALIZANDO MOTOR GRÁFICO 3D...</p>
            {/* Barra de Progreso */}
            <div className="w-48 h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-100 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-emerald-400/60 font-mono mt-1">{loadingProgress}%</span>
          </div>
        </div>
      )}

      {/* Lienzo 3D */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing w-full h-full" />

      {/* Botón de Cierre HUD */}
      <div className="absolute top-6 right-6 z-20 pointer-events-auto">
        <button 
          onClick={handleClose}
          className="px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold font-mono text-emerald-400 bg-slate-950/80 border border-emerald-500/30 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:bg-emerald-500 hover:text-[#061014] hover:border-emerald-400 active:translate-y-0.5 flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          Volver al Sitio
        </button>
      </div>

      {/* Menú de Navegación Lateral */}
      {status === 'connected' && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 pointer-events-auto bg-[#0a1218]/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800/80 shadow-2xl">
          <button 
            onClick={() => handleNavigate('MAIN')} 
            title="Vista General" 
            className={`nav-btn p-3 rounded-xl border border-transparent ${activeView === 'MAIN' ? 'nav-active' : 'text-gray-400 hover:text-white'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
          <button 
            onClick={() => handleNavigate('MEETING')} 
            title="Sala de Reuniones" 
            className={`nav-btn p-3 rounded-xl border border-transparent ${activeView === 'MEETING' ? 'nav-active' : 'text-gray-400 hover:text-white'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </button>
          <button 
            onClick={() => handleNavigate('EXEC')} 
            title="Oficina Ejecutiva" 
            className={`nav-btn p-3 rounded-xl border border-transparent ${activeView === 'EXEC' ? 'nav-active' : 'text-gray-400 hover:text-white'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </button>
          <button 
            onClick={() => handleNavigate('DATACENTER')} 
            title="Data Center" 
            className={`nav-btn p-3 rounded-xl border border-transparent ${activeView === 'DATACENTER' ? 'nav-active' : 'text-gray-400 hover:text-white'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
          </button>
          <button 
            onClick={() => handleNavigate('NOC')} 
            title="Centro de Operaciones (NOC)" 
            className={`nav-btn p-3 rounded-xl border border-transparent ${activeView === 'NOC' ? 'nav-active' : 'text-gray-400 hover:text-white'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      )}

      {/* Botón Central de Conexión */}
      <main className="relative z-10 flex items-end justify-center h-full w-full p-8 md:p-16 pointer-events-none">
        <div className="pointer-events-auto mb-8 flex flex-col items-center gap-3">
          {status === 'idle' && gsapLoaded && (
            <div className="px-4 py-1.5 rounded-full bg-[#0a1218]/90 border border-emerald-500/20 backdrop-blur-sm text-emerald-400 font-mono text-[10px] tracking-wider uppercase animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              Conectar Red de Fibra para Energizar la Oficina
            </div>
          )}
          <button 
            onClick={handleConnectClick}
            disabled={status !== 'idle' || !gsapLoaded}
            className={`group relative p-6 text-white font-bold rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 pointer-events-auto ${
              !gsapLoaded ? 'bg-gray-700 cursor-not-allowed opacity-50' :
              status === 'idle' ? 'bg-green-600 btn-glow scale-100 active:scale-95' : 
              status === 'connecting' ? 'bg-green-800 animate-pulse' : 
              'btn-connected scale-100'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {(!gsapLoaded || status === 'idle') && (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
              )}
              {status === 'connecting' && (
                <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {status === 'connected' && (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </span>
            
            {status === 'idle' && gsapLoaded && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
