"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export default function Brand3DSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Usamos espacios literales para evitar problemas de codificación / CORS en TextureLoader
  const manualPages = [
    '/JPG MANUAL DE MARCA/Manual de marca-01.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-02.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-03.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-04.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-05.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-06.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-07.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-08.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-09.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-10.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-11.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-12.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-14.jpg',
    '/JPG MANUAL DE MARCA/Manual de marca-15.jpg'
  ];

  /** Medios de la pared sur del NOC (public/Agenda) */
  const AGENDA_ASSETS = {
    videoEscena: '/Agenda/escena-inicial.mp4',
    videoCinematic: '/Agenda/cinematic.mp4',
    posterBrand: '/Agenda/manual-marca-17.jpeg',
    posterCard: '/Agenda/Single_Rounded_Business_Card_4.png',
  } as const;

  const connectActionRef = useRef<(() => void) | null>(null);
  const navigateRef = useRef<((view: string) => void) | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [activeView, setActiveView] = useState('MAIN');
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [fullscreenAsset, setFullscreenAsset] = useState<{ type: 'image' | 'video'; src: string } | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const setFullscreenAssetRef = useRef<((asset: { type: 'image' | 'video'; src: string } | null) => void) | null>(null);
  setFullscreenAssetRef.current = setFullscreenAsset;
  const currentSpreadRef = useRef(0);
  currentSpreadRef.current = currentSpread;
  const activeViewRef = useRef(activeView);
  activeViewRef.current = activeView;

  // Estados para arrastre y zoom interactivo en el visor de pantalla completa (Pan & Zoom)
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const [isDraggingZoom, setIsDraggingZoom] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Limitar el arrastre para evitar que la imagen se pierda de la pantalla
  const clampOffset = (x: number, y: number, scale: number) => {
    if (scale <= 1) return { x: 0, y: 0 };
    // Permitir un desplazamiento proporcional al nivel de zoom
    const maxX = (window.innerWidth * (scale - 1)) / 2;
    const maxY = (window.innerHeight * (scale - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  };

  const handleZoomMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    setIsDraggingZoom(true);
    setDragStart({ x: e.clientX - zoomOffset.x, y: e.clientY - zoomOffset.y });
  };

  const handleZoomMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingZoom) return;
    e.preventDefault();
    const nextOffset = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
    setZoomOffset(clampOffset(nextOffset.x, nextOffset.y, zoomScale));
  };

  const handleZoomMouseUp = () => {
    setIsDraggingZoom(false);
  };

  // Soporte para dispositivos táctiles (móviles/tablets)
  const handleZoomTouchStart = (e: React.TouchEvent) => {
    if (zoomScale <= 1) return;
    setIsDraggingZoom(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - zoomOffset.x, y: touch.clientY - zoomOffset.y });
  };

  const handleZoomTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingZoom) return;
    const touch = e.touches[0];
    const nextOffset = { x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y };
    setZoomOffset(clampOffset(nextOffset.x, nextOffset.y, zoomScale));
  };

  const handleZoomTouchEnd = () => {
    setIsDraggingZoom(false);
  };

  const handleZoomWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.15;
    setZoomScale(prev => {
      const next = Math.max(1, Math.min(4, prev + (e.deltaY < 0 ? zoomFactor : -zoomFactor)));
      if (next === 1) {
        setZoomOffset({ x: 0, y: 0 });
      } else {
        setZoomOffset(prevOffset => clampOffset(prevOffset.x, prevOffset.y, next));
      }
      return next;
    });
  };

  const handleZoomIn = () => {
    setZoomScale(prev => {
      const next = Math.min(prev + 0.5, 4);
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setZoomOffset({ x: 0, y: 0 });
      } else {
        setZoomOffset(prevOffset => clampOffset(prevOffset.x, prevOffset.y, next));
      }
      return next;
    });
  };

  const handleZoomReset = () => {
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
  };

  const closeFullscreen = () => {
    setFullscreenAsset(null);
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
    setIsDraggingZoom(false);
  };

  const handleZoomPrevPage = () => {
    if (!fullscreenAsset) return;
    const currentIdx = manualPages.indexOf(fullscreenAsset.src);
    if (currentIdx > 0) {
      const newIdx = currentIdx - 1;
      const newSrc = manualPages[newIdx];
      setFullscreenAsset({ type: 'image', src: newSrc });
      
      const newSpread = Math.floor((newIdx + 1) / 2);
      setCurrentSpread(newSpread);
      currentSpreadRef.current = newSpread;
      (window as any).gw_update_book_pages?.();
      
      // Restablecer zoom
      setZoomScale(1);
      setZoomOffset({ x: 0, y: 0 });
    }
  };

  const handleZoomNextPage = () => {
    if (!fullscreenAsset) return;
    const currentIdx = manualPages.indexOf(fullscreenAsset.src);
    if (currentIdx !== -1 && currentIdx < manualPages.length - 1) {
      const newIdx = currentIdx + 1;
      const newSrc = manualPages[newIdx];
      setFullscreenAsset({ type: 'image', src: newSrc });
      
      const newSpread = Math.floor((newIdx + 1) / 2);
      setCurrentSpread(newSpread);
      currentSpreadRef.current = newSpread;
      (window as any).gw_update_book_pages?.();
      
      // Restablecer zoom
      setZoomScale(1);
      setZoomOffset({ x: 0, y: 0 });
    }
  };

  // Navegación por teclado en el visor de zoom
  useEffect(() => {
    if (!fullscreenAsset || fullscreenAsset.type !== 'image' || !manualPages.includes(fullscreenAsset.src)) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleZoomPrevPage();
      } else if (e.key === 'ArrowRight') {
        handleZoomNextPage();
      } else if (e.key === 'Escape') {
        closeFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenAsset]);

  // Optimización de Videos: Pausar/Reproducir según la vista activa para evitar lag extremo y liberar CPU/GPU
  useEffect(() => {
    if (status !== 'connected') return;

    // Pequeño delay para asegurar que los videos han sido agregados al DOM
    const timer = setTimeout(() => {
      const videos = document.querySelectorAll('.hidden-room-video');
      videos.forEach((videoEl) => {
        const v = videoEl as HTMLVideoElement;
        const room = v.getAttribute('data-video-room');
        
        let shouldPlay = false;
        if (activeView === 'MAIN') {
          // OPTIMIZACIÓN EXTREMA: En la vista general solo reproducimos el video del open space central (el más visible)
          // Los demás (exec, noc, camionetas, vp) quedan pausados para liberar CPU/GPU
          shouldPlay = (room === 'open');
        } else if (activeView === 'EXEC') {
          shouldPlay = (room === 'exec');
        } else if (activeView === 'NOC') {
          shouldPlay = (room === 'noc' || room === 'camioneta' || room === 'vp' || room === 'agenda');
        } else if (activeView === 'MEETING') {
          // La sala de reuniones tiene el libro interactivo, ningún video de fondo se necesita
          shouldPlay = false;
        }

        try {
          if (shouldPlay) {
            if (v.paused) v.play().catch(() => {});
          } else {
            if (!v.paused) v.pause();
          }
        } catch (e) {
          console.log('Video auto play/pause error:', e);
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [activeView, status]);

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
    let flipPageGroup: THREE.Group;
    let currentExecTexIdx = 0;
    let execScreenLed: THREE.Mesh | null = null;
    const nocScreenLeds: THREE.Mesh[] = [];
    const execPaths = [
      '/redes/Free_iPhone_16_Mockup_5%20(1).png',
      '/redes/de618761-5246-492d-9103-18d401280bf1%20(1)%20(2).png'
    ];

    const textureLoaderInit = new THREE.TextureLoader();
    textureLoaderInit.setCrossOrigin("anonymous");

    const nocScreenMats: THREE.MeshStandardMaterial[] = [];
    const interactiveScreens: THREE.Mesh[] = [];

    // --- ELEMENTOS DE VIDEO HTML PARA TEXTURAS DE PANTALLAS ---
    const createHiddenVideo = (src: string, room: string) => {
      const video = document.createElement('video');
      video.src = src;
      video.className = 'hidden-room-video';
      video.setAttribute('data-video-room', room);
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

    // currentSpreadRef.current se sincroniza automáticamente en el cuerpo del componente para evitar cierres obsoletos (stale closures)

    // Usaremos videos livianos locales
    const videoOpen = createHiddenVideo('/Portada Facebook Servicios Autolavado Moderno Azul (1).mp4', 'open');
    const videoNoc = createHiddenVideo('/Portada Facebook Servicios Autolavado Moderno Azul (2).mp4', 'noc');

    // --- RECURSOS NUEVOS DE LA CARPETA REDES (OFICINA EJECUTIVA) ---
    const textureRedes1 = textureLoaderInit.load('/redes/Free_iPhone_16_Mockup_5%20(1).png');
    textureRedes1.colorSpace = THREE.SRGBColorSpace;
    const textureRedes2 = textureLoaderInit.load('/redes/de618761-5246-492d-9103-18d401280bf1%20(1)%20(2).png');
    textureRedes2.colorSpace = THREE.SRGBColorSpace;

    const materialExec = new THREE.MeshStandardMaterial({
      color: 0x000000,
      map: textureRedes1,
      emissive: 0x000000,
      emissiveMap: textureRedes1,
      emissiveIntensity: 0,
      roughness: 0.2
    });

    // --- MANUAL DE MARCA EN IMÁGENES (PANTALLA DE REUNIONES REPRODUCTORA 3D) ---
    // manualPages se encuentra definido al inicio del archivo (file scope) para ser accesible desde el JSX de React

    // Optimización extrema: Caché de texturas para carga bajo demanda (lazy-loading)
    // Esto evita colapsar la VRAM de la GPU y elimina por completo el lag en el inicio
    const textureCache: Record<number, THREE.Texture> = {};
    const getOrLoadTexture = (index: number, onLoadCallback?: () => void) => {
      if (index < 0 || index >= manualPages.length) return null;
      if (textureCache[index]) {
        if (onLoadCallback) onLoadCallback();
        return textureCache[index];
      }
      
      const path = manualPages[index];
      const tex = textureLoaderInit.load(
        path,
        () => {
          // Recompilar shaders del material cuando la textura termine de cargarse
          if (onLoadCallback) onLoadCallback();
        },
        undefined,
        (err) => {
          console.error('Error al cargar la página:', path, err);
        }
      );
      tex.colorSpace = THREE.SRGBColorSpace;
      textureCache[index] = tex;
      return tex;
    };

    const leftPageMat = new THREE.MeshStandardMaterial({
      color: 0x11141a,
      roughness: 0.6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1
    });
    const rightPageMat = new THREE.MeshStandardMaterial({
      color: 0x11141a,
      roughness: 0.6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1
    });
    const flipPageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });


    const textureOpen = new THREE.VideoTexture(videoOpen);
    textureOpen.colorSpace = THREE.SRGBColorSpace;
    textureOpen.minFilter = THREE.LinearFilter;
    textureOpen.magFilter = THREE.LinearFilter;

    const materialOpen = new THREE.MeshStandardMaterial({
      color: 0x000000,
      map: textureOpen,
      emissive: 0x000000,
      emissiveMap: textureOpen,
      emissiveIntensity: 0,
      roughness: 0.2
    });

    const textureNoc = new THREE.VideoTexture(videoNoc);
    textureNoc.colorSpace = THREE.SRGBColorSpace;
    textureNoc.minFilter = THREE.LinearFilter;
    textureNoc.magFilter = THREE.LinearFilter;

    // --- NUEVOS RECURSOS DE LA CAMIONETA REAL ---
    const videoCamioneta1 = createHiddenVideo('/camionata/Ruta_de_San_Juan_Argentina_202605291229.mp4', 'camioneta');
    const videoCamioneta2 = createHiddenVideo('/camionata/Ruta_de_San_Juan_Argentina_202605291234.mp4', 'camioneta');

    const textureCamioneta1 = new THREE.VideoTexture(videoCamioneta1);
    textureCamioneta1.colorSpace = THREE.SRGBColorSpace;
    textureCamioneta1.minFilter = THREE.LinearFilter;
    textureCamioneta1.magFilter = THREE.LinearFilter;

    const textureCamioneta2 = new THREE.VideoTexture(videoCamioneta2);
    textureCamioneta2.colorSpace = THREE.SRGBColorSpace;
    textureCamioneta2.minFilter = THREE.LinearFilter;
    textureCamioneta2.magFilter = THREE.LinearFilter;

    const textureCamionetaImg = textureLoaderInit.load('/camionata/montaje%20camioneta01.png');
    textureCamionetaImg.colorSpace = THREE.SRGBColorSpace;

    // --- RECURSOS DE LA CAMIONETA 2 ---
    const videoCamioneta2_1 = createHiddenVideo('/camioneta%202/Rutas_de_San_Juan_Argentina_202605291345.mp4', 'camioneta');
    const videoCamioneta2_2 = createHiddenVideo('/camioneta%202/Rutas_de_San_Juan_Argentina_202605291347.mp4', 'camioneta');

    const textureCamioneta2_1 = new THREE.VideoTexture(videoCamioneta2_1);
    textureCamioneta2_1.colorSpace = THREE.SRGBColorSpace;
    textureCamioneta2_1.minFilter = THREE.LinearFilter;
    textureCamioneta2_1.magFilter = THREE.LinearFilter;

    const textureCamioneta2_2 = new THREE.VideoTexture(videoCamioneta2_2);
    textureCamioneta2_2.colorSpace = THREE.SRGBColorSpace;
    textureCamioneta2_2.minFilter = THREE.LinearFilter;
    textureCamioneta2_2.magFilter = THREE.LinearFilter;

    const textureCamionetaImg2 = textureLoaderInit.load('/camioneta%202/montaje%20camioneta02.png');
    textureCamionetaImg2.colorSpace = THREE.SRGBColorSpace;

    // --- RECURSOS NUEVOS DE LA CARPETA Vp (VÍA PÚBLICA) ---
    const videoVp1 = createHiddenVideo('/Vp/Via_publica_cinematic_202605291523.mp4', 'vp');
    const videoVp2 = createHiddenVideo('/Vp/que_gire_tipo_3_d_202605291527.mp4', 'vp');

    const textureVp1 = new THREE.VideoTexture(videoVp1);
    textureVp1.colorSpace = THREE.SRGBColorSpace;
    textureVp1.minFilter = THREE.LinearFilter;
    textureVp1.magFilter = THREE.LinearFilter;

    const textureVp2 = new THREE.VideoTexture(videoVp2);
    textureVp2.colorSpace = THREE.SRGBColorSpace;
    textureVp2.minFilter = THREE.LinearFilter;
    textureVp2.magFilter = THREE.LinearFilter;

    const textureVpImg1 = textureLoaderInit.load('/Vp/casco%2001.png');
    textureVpImg1.colorSpace = THREE.SRGBColorSpace;

    const textureVpImg2 = textureLoaderInit.load('/Vp/casco%2002.png');
    textureVpImg2.colorSpace = THREE.SRGBColorSpace;

    // --- RECURSOS NUEVOS DE LA CARPETA AGENDA (SALA NOC - PARED SUR) ---
    const videoAgenda1 = createHiddenVideo(AGENDA_ASSETS.videoEscena, 'agenda');
    const videoAgenda2 = createHiddenVideo(AGENDA_ASSETS.videoCinematic, 'agenda');

    const textureAgenda1 = new THREE.VideoTexture(videoAgenda1);
    textureAgenda1.colorSpace = THREE.SRGBColorSpace;
    textureAgenda1.minFilter = THREE.LinearFilter;
    textureAgenda1.magFilter = THREE.LinearFilter;

    const textureAgenda2 = new THREE.VideoTexture(videoAgenda2);
    textureAgenda2.colorSpace = THREE.SRGBColorSpace;
    textureAgenda2.minFilter = THREE.LinearFilter;
    textureAgenda2.magFilter = THREE.LinearFilter;

    const textureAgendaImg1 = textureLoaderInit.load(AGENDA_ASSETS.posterBrand);
    textureAgendaImg1.colorSpace = THREE.SRGBColorSpace;

    const textureAgendaImg2 = textureLoaderInit.load(AGENDA_ASSETS.posterCard);
    textureAgendaImg2.colorSpace = THREE.SRGBColorSpace;

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

        // 3D BOOK / MAGAZINE (MANUAL DE MARCA INTERACTIVO EN 3D)
        const bookGroup = new THREE.Group();
        bookGroup.position.set(0, 2.5, -3.9);
        
        // 1. Cubierta trasera de cuero premium
        const bookCover = new THREE.Mesh(
          new THREE.BoxGeometry(4.4, 1.25, 0.05),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 })
        );
        bookGroup.add(bookCover);

        // 2. Lomo central
        const spine = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 1.25, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x0f172a })
        );
        spine.position.z = 0.03;
        bookGroup.add(spine);

        // 3. Páginas principales: izquierda y derecha (anguladas en Y, con aspecto 16:9 perfecto sin estiramiento)
        const leftPageGroup = new THREE.Group();
        leftPageGroup.position.set(-0.03, 0, 0.03);
        leftPageGroup.rotation.y = 0.15;
        
        const leftPage = new THREE.Mesh(
          new THREE.PlaneGeometry(2.0, 1.125),
          leftPageMat
        );
        leftPage.frustumCulled = false;
        leftPage.position.set(-1.0, 0, 0.01);
        leftPage.userData = { isBookPage: true, side: 'left' };
        interactiveScreens.push(leftPage);
        leftPageGroup.add(leftPage);
        bookGroup.add(leftPageGroup);

        const rightPageGroup = new THREE.Group();
        rightPageGroup.position.set(0.03, 0, 0.03);
        rightPageGroup.rotation.y = -0.15;
        
        const rightPage = new THREE.Mesh(
          new THREE.PlaneGeometry(2.0, 1.125),
          rightPageMat
        );
        rightPage.frustumCulled = false;
        rightPage.position.set(1.0, 0, 0.01);
        rightPage.userData = { isBookPage: true, side: 'right' };
        interactiveScreens.push(rightPage);
        rightPageGroup.add(rightPage);
        bookGroup.add(rightPageGroup);

        // 4. Página giratoria animada en 3D
        flipPageGroup = new THREE.Group();
        flipPageGroup.position.set(0, 0, 0.032);
        
        const flipPage = new THREE.Mesh(
          new THREE.PlaneGeometry(2.0, 1.125),
          flipPageMat
        );
        flipPage.frustumCulled = false;
        flipPage.position.set(1.0, 0, 0); 
        flipPageGroup.add(flipPage);
        bookGroup.add(flipPageGroup);

        group.add(bookGroup);

        return { group };
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

        const screenHinge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.1), darkMetal);
        screenHinge.position.set(0, 0.4, -0.02);

        // Carcasa trasera de plástico/metal para dar volumen 3D real al monitor por detrás
        const screenBackCase = new THREE.Mesh(
          new THREE.BoxGeometry(1.17, 0.67, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.3, metalness: 0.7 })
        );
        screenBackCase.position.set(0, 0.4, 0);

        const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.65), materialExec);
        screen.frustumCulled = false;
        screen.position.set(0, 0.4, 0.041); 
        screen.userData = {
          isExecScreen: true
        };
        interactiveScreens.push(screen);

        const ledMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 1 });
        execScreenLed = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), ledMat);
        execScreenLed.position.set(0, 0.4, -0.041); 

        screenMonitorGroup.add(screenBase, screenStand, screenHinge, screenBackCase, screen, execScreenLed);
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
        materialOpen
      );
      screen.frustumCulled = false;
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


    const serverLedMat1 = new THREE.MeshBasicMaterial({ color: 0x059669 });
    const serverLedMat2 = new THREE.MeshBasicMaterial({ color: 0x059669 });
    const serverLedMat3 = new THREE.MeshBasicMaterial({ color: 0x059669 });
    const sharedServerMats = [serverLedMat1, serverLedMat2, serverLedMat3];

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

        const matIdx = (i + j) % 3;
        const sLed = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.05, 0.05), 
          sharedServerMats[matIdx]
        );
        sLed.position.set(0.5, 0.8 + (i * 0.5), 0.76);
        rackGroup.add(sLed);
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

    const createNOCRoom = () => {
        const group = new THREE.Group();
        group.position.set(15, -2.4, -6);

        const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.9, 10), glassMat);
        frontGlass.position.set(-6, 3.95, 0);
        group.add(frontGlass);

        // VIDEO WALL GIGANTE (TRASERO 3x2)
        const videoWallGroup = new THREE.Group();
        videoWallGroup.position.set(5.8, 3.5, 0);
        videoWallGroup.rotation.y = -Math.PI / 2;
        
        for (let i = 0; i < 3; i++) { 
            for (let j = 0; j < 2; j++) { 
                const screenIdx = nocScreenMats.length;
                const isEven = (screenIdx % 2 === 0);
                const initialTex = isEven ? textureCamionetaImg2 : textureCamionetaImg;
                const mat = new THREE.MeshStandardMaterial({ 
                    color: 0x000000, 
                    roughness: 0.2,
                    map: initialTex,
                    emissive: 0x000000,
                    emissiveMap: initialTex,
                    emissiveIntensity: 0
                });
                nocScreenMats.push(mat);
                
                const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.8), mat);
                screen.frustumCulled = false;
                const border = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.9, 0.1), darkMetal);
                
                screen.position.set(-3.2 + i * 3.2, -1 + j * 1.9, 0.06);
                border.position.set(-3.2 + i * 3.2, -1 + j * 1.9, 0);
                
                screen.userData = {
                  isInteractiveScreen: true,
                  screenIndex: nocScreenMats.length - 1
                };
                interactiveScreens.push(screen);
                
                videoWallGroup.add(screen);
                videoWallGroup.add(border);
            }
        }
        group.add(videoWallGroup);

        // NUEVO PANEL AUXILIAR DE PANTALLAS EN LA PARED DEL COSTADO (NORTE 2x2)
        const sideScreenGroup = new THREE.Group();
        sideScreenGroup.position.set(0, 3.5, -4.85); // Centrado en la pared norte
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const screenIdx = nocScreenMats.length;
                const initialTex = (screenIdx === 6 || screenIdx === 7) ? textureVpImg1 : textureVpImg2;
                const mat = new THREE.MeshStandardMaterial({ 
                    color: 0x000000, 
                    roughness: 0.2,
                    map: initialTex,
                    emissive: 0x000000,
                    emissiveMap: initialTex,
                    emissiveIntensity: 0
                });
                nocScreenMats.push(mat); // Índices 6, 7, 8, 9
                
                const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.2), mat);
                screen.frustumCulled = false;
                const border = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.3, 0.08), darkMetal);
                
                screen.position.set(-1.1 + i * 2.2, -0.7 + j * 1.4, 0.05);
                border.position.set(-1.1 + i * 2.2, -0.7 + j * 1.4, 0);
                
                screen.userData = {
                  isInteractiveScreen: true,
                  screenIndex: nocScreenMats.length - 1
                };
                interactiveScreens.push(screen);
                
                sideScreenGroup.add(screen);
                sideScreenGroup.add(border);
            }
        }
        group.add(sideScreenGroup);

        // NUEVO PANEL AUXILIAR DE PANTALLAS EN LA PARED OPUESTA (SUR 2x2) - AGENDA DE EVENTOS
        const sideScreenGroup2 = new THREE.Group();
        sideScreenGroup2.position.set(0, 3.5, 4.85); // Centrado en la pared sur
        sideScreenGroup2.rotation.y = Math.PI; // Orientado hacia el centro de la sala
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const screenIdx = nocScreenMats.length;
                const initialTex = (screenIdx === 10 || screenIdx === 11) ? textureAgendaImg1 : textureAgendaImg2;
                const mat = new THREE.MeshStandardMaterial({ 
                    color: 0x000000, 
                    roughness: 0.2,
                    map: initialTex,
                    emissive: 0x000000,
                    emissiveMap: initialTex,
                    emissiveIntensity: 0
                });
                nocScreenMats.push(mat); // Índices 10, 11, 12, 13
                
                const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.2), mat);
                screen.frustumCulled = false;
                const border = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.3, 0.08), darkMetal);
                
                screen.position.set(-1.1 + i * 2.2, -0.7 + j * 1.4, 0.05);
                border.position.set(-1.1 + i * 2.2, -0.7 + j * 1.4, 0);
                
                screen.userData = {
                  isInteractiveScreen: true,
                  screenIndex: nocScreenMats.length - 1
                };
                interactiveScreens.push(screen);
                
                sideScreenGroup2.add(screen);
                sideScreenGroup2.add(border);
            }
        }
        group.add(sideScreenGroup2);

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
                const mat = new THREE.MeshStandardMaterial({ 
                    color: 0x000000,
                    map: textureNoc,
                    emissive: 0x000000,
                    emissiveMap: textureNoc,
                    emissiveIntensity: 0
                });
                nocScreenMats.push(mat);

                const monitorGroup = new THREE.Group();
                monitorGroup.position.set(0.6, 1.25, -1 + (k * 1));

                const monitorBase = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.015, 0.15), darkMetal);
                monitorBase.position.y = 0.0075;

                const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3), darkMetal);
                monitorStand.position.y = 0.15;

                const monitorHinge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.05), darkMetal);
                monitorHinge.position.set(0, 0.3, -0.015);

                const monitorBackCase = new THREE.Mesh(
                  new THREE.BoxGeometry(0.92, 0.52, 0.04),
                  new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.6 })
                );
                monitorBackCase.position.set(0, 0.3, 0);

                const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), mat);
                monitorScreen.frustumCulled = false;
                monitorScreen.position.set(0, 0.3, 0.021);

                const mLedMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 1 });
                const monitorLed = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), mLedMat);
                monitorLed.position.set(0, 0.3, -0.021);

                monitorGroup.add(monitorBase, monitorStand, monitorHinge, monitorBackCase, monitorScreen, monitorLed);
                nocScreenLeds.push(monitorLed);

                monitorGroup.rotation.y = Math.PI / 2;
                if(k===0) monitorGroup.rotation.y = Math.PI/2 - 0.3;
                if(k===2) monitorGroup.rotation.y = Math.PI/2 + 0.3;

                deskGroup.add(monitorGroup);
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
    let startX = 0;
    let startY = 0;
    
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

    // ==========================================
    // SISTEMA DE CONTROL DE PÁGINAS DEL LIBRO 3D
    // ==========================================
    let isFlipping = false;
    let lastClickTime = 0;
    
    const updateBookPages = () => {
      const activeSpread = currentSpreadRef.current;
      const leftIdx = activeSpread * 2 - 1;
      const rightIdx = activeSpread * 2;
      
      if (leftIdx < 0) {
        if (leftPageMat.map !== null) {
          leftPageMat.map = null;
          leftPageMat.color.setHex(0x11141a);
          leftPageMat.emissive.setHex(0x000000);
          leftPageMat.needsUpdate = true;
        }
      } else {
        const tex = getOrLoadTexture(leftIdx, () => {
          leftPageMat.needsUpdate = true;
        });
        if (leftPageMat.map !== tex) {
          leftPageMat.map = tex;
          leftPageMat.color.setHex(0xffffff);
          leftPageMat.emissive.setHex(0xffffff);
          leftPageMat.emissiveMap = tex;
          leftPageMat.emissiveIntensity = 0.6;
          leftPageMat.needsUpdate = true;
        }
      }
      
      if (rightIdx >= manualPages.length) {
        if (rightPageMat.map !== null) {
          rightPageMat.map = null;
          rightPageMat.color.setHex(0x11141a);
          rightPageMat.emissive.setHex(0x000000);
          rightPageMat.needsUpdate = true;
        }
      } else {
        const tex = getOrLoadTexture(rightIdx, () => {
          rightPageMat.needsUpdate = true;
        });
        if (rightPageMat.map !== tex) {
          rightPageMat.map = tex;
          rightPageMat.color.setHex(0xffffff);
          rightPageMat.emissive.setHex(0xffffff);
          rightPageMat.emissiveMap = tex;
          rightPageMat.emissiveIntensity = 0.6;
          rightPageMat.needsUpdate = true;
        }
      }
    };

    // Cargar la portada de forma inmediata al iniciar para que el libro no se vea negro al inicio
    updateBookPages();

    const flipPageForward = () => {
      const activeSpread = currentSpreadRef.current;
      if (isFlipping || activeSpread >= 7) return;
      isFlipping = true;
      
      flipPageMat.opacity = 1;
      flipPageMat.transparent = false;
      
      const currentRightIdx = activeSpread * 2;
      const tex = getOrLoadTexture(currentRightIdx, () => {
        flipPageMat.needsUpdate = true;
      });
      flipPageMat.map = tex;
      flipPageMat.emissiveMap = tex;
      flipPageMat.emissiveIntensity = 0.6;
      flipPageMat.needsUpdate = true;
      
      rightPageMat.opacity = 0;
      rightPageMat.transparent = true;
      rightPageMat.needsUpdate = true;
      
      flipPageGroup.rotation.y = -0.15;
      flipPageGroup.position.z = 0.032;
      
      // Animar levantamiento en Z de la página para evitar Z-fighting y simular física real
      gsap.to(flipPageGroup.position, {
        z: 0.12,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: "power1.out"
      });
      
      gsap.to(flipPageGroup.rotation, {
        y: -Math.PI + 0.15,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: function() {
          if (flipPageGroup.rotation.y < -Math.PI / 2) {
            const nextLeftIdx = (activeSpread + 1) * 2 - 1;
            const nextTex = getOrLoadTexture(nextLeftIdx, () => {
              flipPageMat.needsUpdate = true;
            });
            if (flipPageMat.map !== nextTex) {
              flipPageMat.map = nextTex;
              flipPageMat.emissiveMap = nextTex;
              flipPageMat.needsUpdate = true;
            }
          }
        },
        onComplete: () => {
          const nextSpread = currentSpreadRef.current + 1;
          setCurrentSpread(nextSpread);
          currentSpreadRef.current = nextSpread;
          updateBookPages();
          
          rightPageMat.opacity = 1;
          rightPageMat.transparent = false;
          rightPageMat.needsUpdate = true;
          
          flipPageMat.opacity = 0;
          flipPageMat.transparent = true;
          flipPageMat.needsUpdate = true;
          
          flipPageGroup.position.z = 0.032;
          isFlipping = false;
        }
      });
    };

    const flipPageBackward = () => {
      const activeSpread = currentSpreadRef.current;
      if (isFlipping || activeSpread <= 0) return;
      isFlipping = true;
      
      flipPageMat.opacity = 1;
      flipPageMat.transparent = false;
      
      const currentLeftIdx = activeSpread * 2 - 1;
      const tex = getOrLoadTexture(currentLeftIdx, () => {
        flipPageMat.needsUpdate = true;
      });
      flipPageMat.map = tex;
      flipPageMat.emissiveMap = tex;
      flipPageMat.emissiveIntensity = 0.6;
      flipPageMat.needsUpdate = true;
      
      leftPageMat.opacity = 0;
      leftPageMat.transparent = true;
      leftPageMat.needsUpdate = true;
      
      flipPageGroup.rotation.y = -Math.PI + 0.15;
      flipPageGroup.position.z = 0.032;
      
      // Animar levantamiento en Z de la página para evitar Z-fighting y simular física real
      gsap.to(flipPageGroup.position, {
        z: 0.12,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: "power1.out"
      });
      
      gsap.to(flipPageGroup.rotation, {
        y: -0.15,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: function() {
          if (flipPageGroup.rotation.y > -Math.PI / 2) {
            const prevRightIdx = (activeSpread - 1) * 2;
            const prevTex = getOrLoadTexture(prevRightIdx, () => {
              flipPageMat.needsUpdate = true;
            });
            if (flipPageMat.map !== prevTex) {
              flipPageMat.map = prevTex;
              flipPageMat.emissiveMap = prevTex;
              flipPageMat.needsUpdate = true;
            }
          }
        },
        onComplete: () => {
          const prevSpread = currentSpreadRef.current - 1;
          setCurrentSpread(prevSpread);
          currentSpreadRef.current = prevSpread;
          updateBookPages();
          
          leftPageMat.opacity = 1;
          leftPageMat.transparent = false;
          leftPageMat.needsUpdate = true;
          
          flipPageMat.opacity = 0;
          flipPageMat.transparent = true;
          flipPageMat.needsUpdate = true;
          
          flipPageGroup.position.z = 0.032;
          isFlipping = false;
        }
      });
    };

    (window as any).gw_flip_forward = flipPageForward;
    (window as any).gw_flip_back = flipPageBackward;
    (window as any).gw_update_book_pages = updateBookPages;

    const onMouseDown = (event: MouseEvent) => {
        startX = event.clientX;
        startY = event.clientY;
    };

    const onMouseClick = (event: MouseEvent) => {
        if((event.target as HTMLElement).tagName === 'BUTTON' || (event.target as HTMLElement).closest('button')) return;

        // OPTIMIZACIÓN DE UX: Si el usuario arrastró el mouse más de 5 píxeles, asumimos que estaba rotando/arrastrando la cámara 3D,
        // por lo que ignoramos el clic para evitar que las pantallas se agranden involuntariamente.
        const diffX = Math.abs(event.clientX - startX);
        const diffY = Math.abs(event.clientY - startY);
        if (diffX > 5 || diffY > 5) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([switchGroup], true);
        if (intersects.length > 0) {
            isLightOn ? turnOffGeneralLights() : turnOnGeneralLights();
            return;
        }

        // Intersectar pantallas interactivas del NOC y Libro 3D
        if (isConnected) {
            const screenIntersects = raycaster.intersectObjects(interactiveScreens, true);
            if (screenIntersects.length > 0) {
                const hitScreen = screenIntersects[0].object as THREE.Mesh;
                
                if (hitScreen.userData.isBookPage) {
                    const side = hitScreen.userData.side;
                    const pageIdx = side === 'left' ? currentSpreadRef.current * 2 - 1 : currentSpreadRef.current * 2;
                    if (pageIdx >= 0 && pageIdx < manualPages.length) {
                        setFullscreenAssetRef.current?.({ type: 'image', src: manualPages[pageIdx] });
                    }
                    return;
                }

                if (hitScreen.userData.isExecScreen) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: execPaths[currentExecTexIdx] });
                    return;
                }

                const sIdx = hitScreen.userData.screenIndex;
                if (sIdx === 0) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: '/camioneta%202/montaje%20camioneta02.png' });
                } else if (sIdx === 1) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: '/camionata/montaje%20camioneta01.png' });
                } else if (sIdx === 2) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: '/camioneta%202/Rutas_de_San_Juan_Argentina_202605291345.mp4' });
                } else if (sIdx === 3) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: '/camionata/Ruta_de_San_Juan_Argentina_202605291229.mp4' });
                } else if (sIdx === 4) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: '/camioneta%202/Rutas_de_San_Juan_Argentina_202605291347.mp4' });
                } else if (sIdx === 5) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: '/camionata/Ruta_de_San_Juan_Argentina_202605291234.mp4' });
                } else if (sIdx === 6) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: '/Vp/Via_publica_cinematic_202605291523.mp4' });
                } else if (sIdx === 7) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: '/Vp/casco%2001.png' });
                } else if (sIdx === 8) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: '/Vp/que_gire_tipo_3_d_202605291527.mp4' });
                } else if (sIdx === 9) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: '/Vp/casco%2002.png' });
                } else if (sIdx === 10) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: AGENDA_ASSETS.videoEscena });
                } else if (sIdx === 11) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: AGENDA_ASSETS.posterBrand });
                } else if (sIdx === 12) {
                    setFullscreenAssetRef.current?.({ type: 'video', src: AGENDA_ASSETS.videoCinematic });
                } else if (sIdx === 13) {
                    setFullscreenAssetRef.current?.({ type: 'image', src: AGENDA_ASSETS.posterCard });
                }
            }
        }
    };

    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects([switchGroup], true);
        let hoverInteractive = intersects.length > 0;

        if (isConnected && !hoverInteractive) {
            const screenIntersects = raycaster.intersectObjects(interactiveScreens, true);
            if (screenIntersects.length > 0) {
                const hitScreen = screenIntersects[0].object as THREE.Mesh;
                if (hitScreen.userData.isBookPage) {
                    hoverInteractive = true;
                } else {
                    const sIdx = hitScreen.userData.screenIndex;
                    if (sIdx >= 0 && sIdx <= 13) {
                        hoverInteractive = true;
                    }
                }
            }
        }

        document.body.style.cursor = hoverInteractive ? 'pointer' : 'default';
    };

    window.addEventListener('mousedown', onMouseDown);
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
        NOC: { cam: { x: targetX + 10, y: 2.8, z: -2 }, tgt: { x: targetX + 15, y: 1.2, z: -6 } }
    };

    navigateRef.current = (loc) => {
        const dest = locations[loc];
        if(!dest) return;
        
        // Desactivar controles durante la animación de cámara para evitar conflictos (fighting) y lag entrecortado
        controls.enabled = false;
        
        gsap.to(camera.position, { 
          x: dest.cam.x, 
          y: dest.cam.y, 
          z: dest.cam.z, 
          duration: 2.5, 
          ease: "power2.inOut",
          onComplete: () => {
            controls.enabled = true; // Reactivar controles al finalizar el viaje
          }
        });
        gsap.to(controls.target, { 
          x: dest.tgt.x, 
          y: dest.tgt.y, 
          z: dest.tgt.z, 
          duration: 2.5, 
          ease: "power2.inOut" 
        });

        // OPTIMIZACIÓN EXTREMA: Intercambiar mapas de texturas en caliente.
        // Solo asignamos VideoTextures a las pantallas del NOC si estamos físicamente en la sala NOC.
        // De lo contrario, usamos texturas de imágenes estáticas que consumen 0 recursos de GPU y evitan tirones.
        if (isConnected) {
          const nocVideoScreens = [
            { idx: 2, tex: textureCamioneta2_1, fallback: textureCamionetaImg2 },
            { idx: 3, tex: textureCamioneta1, fallback: textureCamionetaImg },
            { idx: 4, tex: textureCamioneta2_2, fallback: textureCamionetaImg2 },
            { idx: 5, tex: textureCamioneta2, fallback: textureCamionetaImg },
            { idx: 6, tex: textureVp1, fallback: textureVpImg1 },
            { idx: 8, tex: textureVp2, fallback: textureVpImg2 },
            { idx: 10, tex: textureAgenda1, fallback: textureAgendaImg1 },
            { idx: 12, tex: textureAgenda2, fallback: textureAgendaImg2 }
          ];

          if (loc === 'NOC') {
            nocVideoScreens.forEach(scr => {
              const mat = nocScreenMats[scr.idx];
              if (mat) {
                mat.map = scr.tex;
                mat.emissiveMap = scr.tex;
                mat.needsUpdate = true;
              }
            });
          } else {
            nocVideoScreens.forEach(scr => {
              const mat = nocScreenMats[scr.idx];
              if (mat) {
                mat.map = scr.fallback;
                mat.emissiveMap = scr.fallback;
                mat.needsUpdate = true;
              }
            });
          }
        }
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
          sharedServerMats.forEach((mat) => mat.color.setHex(0x34d399));
          
          fiberLight.position.copy(portTarget);
          gsap.to(fiberLight, { intensity: 10, duration: 0.3, yoyo: true, repeat: 1 });
          gsap.to(fiberLight, { intensity: 3, duration: 0.5, delay: 0.6 });
          
          if (!isLightOn) {
             turnOnGeneralLights(2); 
          }

          gsap.to(serverRoomLight, { intensity: 6, duration: 1 });
          
          // Encendido secuencial escalonado de logotipos sin GSAP (Cero CPU)
          const brandLogoMats = [logoMat, meetingLogoMat, execLogoMat, openLogoMat, nocLogoMat];
          brandLogoMats.forEach((mat, idx) => {
            setTimeout(() => {
              mat.emissiveIntensity = 1.0;
            }, 500 + idx * 250);
          });
          
          // --- ENCENDIDO DE PANTALLAS DE PC CON VIDEOS ACTIVOS ---
          
          // 1. Sala de Reuniones TV
          // 1. Sala de Reuniones - Inicializar Libro de Marca 3D
          updateBookPages();
          gsap.to(meetingRoomLight, { intensity: 5, duration: 1.5, delay: 1 });
          
          // 2. Oficina Ejecutiva
          setTimeout(() => {
            materialExec.color.setHex(0xffffff);
            materialExec.emissive.setHex(0xffffff);
            materialExec.emissiveIntensity = 0.8;
          }, 1200);
          gsap.to(execOfficeLight, { intensity: 8, duration: 1.5, delay: 1.2 });
          
          setTimeout(() => {
            execLampMat.emissive.setHex(0xfff8e7);
            execLampMat.emissiveIntensity = 2.0;
          }, 1400);

          // 3. Open Space Escritorios
          gsap.to(openSpaceLight, { intensity: 6, duration: 1.5, delay: 0.5 });
          setTimeout(() => {
            materialOpen.color.setHex(0xffffff);
            materialOpen.emissive.setHex(0xffffff);
            materialOpen.emissiveIntensity = 0.6;
          }, 500);

          // 4. Sala NOC (Centro de Operaciones) con Video Wall Inteligente
          // La reproducción de videos se maneja de manera centralizada en el useEffect de activeView,
          // evitando la decodificación masiva de 9 videos simultáneamente al conectar.
          
          gsap.to(nocLight, { intensity: 6, duration: 1.5, delay: 0.7 });
          const techColors = [0x0ea5e9, 0x10b981, 0x3b82f6]; // Colores de red
          nocScreenMats.forEach((mat, index) => {
              if (index >= 0 && index <= 13) {
                  setTimeout(() => {
                      mat.emissive.setHex(0xffffff);
                      mat.emissiveIntensity = 1.0;
                      mat.color.setHex(0xffffff);
                  }, 1000 + Math.random() * 500);
              } else {
                  const randColor = techColors[Math.floor(Math.random() * techColors.length)];
                  setTimeout(() => {
                      mat.emissive.setHex(randColor);
                      mat.emissiveIntensity = 1.2;
                      mat.color.setHex(randColor);
                  }, 1000 + (index * 50));
              }
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
      if (isConnected) {
        dataParticles.forEach(data => {
          if (data.active) {
            data.zPos -= data.speed * delta * 80;
            if (data.zPos < 0) data.zPos = 8 + Math.random() * 2;
            data.mesh.position.z = data.zPos;
          }
        });

        const blinkTime = time * 8;
        serverLedMat1.color.setHex( Math.sin(blinkTime + 0) > 0.2 ? 0x10b981 : 0x064e3b );
        serverLedMat2.color.setHex( Math.sin(blinkTime + 1.5) > 0.2 ? 0x10b981 : 0x064e3b );
        serverLedMat3.color.setHex( Math.sin(blinkTime + 3.0) > 0.2 ? 0x10b981 : 0x064e3b );
        
        const pulseVal = 0.8 + Math.sin(time * 2) * 0.2;
        logoMat.emissiveIntensity = pulseVal;
        meetingLogoMat.emissiveIntensity = pulseVal;
        execLogoMat.emissiveIntensity = pulseVal;
        openLogoMat.emissiveIntensity = pulseVal;
        nocLogoMat.emissiveIntensity = pulseVal;
      }

      // Animar el LED del monitor ejecutivo (standby / activo)
      if (execScreenLed && execScreenLed.material) {
        const ledMat = execScreenLed.material as THREE.MeshBasicMaterial;
        if (!isConnected) {
          ledMat.opacity = 0.3 + 0.7 * Math.abs(Math.sin(time * 3));
          ledMat.color.setHex(0x34d399);
        } else {
          ledMat.opacity = 1.0;
          ledMat.color.setHex(0x34d399);
        }
      }

      // Animar los micro-LEDs del NOC
      nocScreenLeds.forEach((led, idx) => {
        if (led.material) {
          const ledMat = led.material as THREE.MeshBasicMaterial;
          if (isConnected) {
            ledMat.opacity = 0.15 + 0.85 * Math.abs(Math.sin(time * 12 + idx * 4.5));
          } else {
            ledMat.opacity = 0.05;
          }
        }
      });

      renderer.render(scene, camera);
    };

    renderer.compile(scene, camera);
    animate();

    // OPTIMIZACIÓN DE UX: Slideshow automatizado de redes en la oficina ejecutiva
    const execTextures = [textureRedes1, textureRedes2];
    const execSlideshowInterval = setInterval(() => {
      if (isConnected) {
        currentExecTexIdx = (currentExecTexIdx + 1) % execTextures.length;
        gsap.to(materialExec, {
          emissiveIntensity: 0.1,
          duration: 0.3,
          onComplete: () => {
            materialExec.map = execTextures[currentExecTexIdx];
            materialExec.emissiveMap = execTextures[currentExecTexIdx];
            materialExec.needsUpdate = true;
            gsap.to(materialExec, { emissiveIntensity: 0.8, duration: 0.5 });
          }
        });
      }
    }, 4000); // Cambiar de diapositiva cada 4 segundos

    // --- DESMONTAJE Y LIMPIEZA ---
    return () => {
      clearInterval(execSlideshowInterval);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      
      // Detener y remover videos para evitar fugas de memoria
      [videoOpen, videoNoc, videoCamioneta1, videoCamioneta2, videoCamioneta2_1, videoCamioneta2_2, videoVp1, videoVp2, videoAgenda1, videoAgenda2].forEach(v => {
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

      // Limpiar recursos de las texturas de la camioneta y la oficina
      try {
        textureRedes1.dispose();
        textureRedes2.dispose();
        textureOpen.dispose();
        textureNoc.dispose();
        textureCamioneta1.dispose();
        textureCamioneta2.dispose();
        textureCamionetaImg.dispose();
        textureCamioneta2_1.dispose();
        textureCamioneta2_2.dispose();
        textureCamionetaImg2.dispose();
        textureVp1.dispose();
        textureVp2.dispose();
        textureVpImg1.dispose();
        textureVpImg2.dispose();
        textureAgenda1.dispose();
        textureAgenda2.dispose();
        textureAgendaImg1.dispose();
        textureAgendaImg2.dispose();
        logoTexture.dispose();

        Object.values(textureCache).forEach((t: any) => t.dispose());
        leftPageMat.dispose();
        rightPageMat.dispose();
        flipPageMat.dispose();

        serverLedMat1.dispose();
        serverLedMat2.dispose();
        serverLedMat3.dispose();
      } catch (e) {
        console.log('Texture cleanup error:', e);
      }

      delete (window as any).gw_flip_forward;
      delete (window as any).gw_flip_back;
      delete (window as any).gw_update_book_pages;

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

  // Obtener el número real de página de las imágenes activas en el pliego para el HUD
  const getPageLabel = () => {
    const leftIdx = currentSpread * 2 - 1;
    const rightIdx = currentSpread * 2;

    const getNum = (idx: number) => {
      if (idx < 0 || idx >= manualPages.length) return '';
      const path = manualPages[idx];
      const match = path.match(/Manual de marca-(\d+)/);
      return match ? match[1] : '';
    };

    const leftNum = getNum(leftIdx);
    const rightNum = getNum(rightIdx);

    if (currentSpread === 0) {
      return `Portada / ${rightNum}`;
    }
    if (currentSpread === 7) {
      return `${leftNum} / Fin`;
    }
    return `${leftNum} / ${rightNum}`;
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
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

      {/* Guía NOC: pared sur con medios Agenda */}
      {activeView === 'NOC' && status === 'connected' && !fullscreenAsset && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none max-w-lg px-4">
          <p className="text-center font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-emerald-400/80 bg-[#0a1218]/85 border border-emerald-500/20 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-lg">
            NOC · Pared sur: agenda corporativa · Clic en pantallas para ampliar
          </p>
        </div>
      )}

      {/* Controles del Manual de Marca (Meeting Room) */}
      {activeView === 'MEETING' && status === 'connected' && (
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col md:flex-row gap-3 bg-[#0a1218]/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl items-center">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => (window as any).gw_flip_back?.()}
              disabled={currentSpread === 0}
              className="px-4 py-2 text-[11px] font-mono tracking-widest font-bold uppercase border border-emerald-500/20 text-emerald-400 bg-slate-900 rounded-xl hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              ◀ Ant
            </button>
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/80 px-2 min-w-[120px] text-center select-none">
              Pág. {getPageLabel()}
            </span>
            <button
              onClick={() => (window as any).gw_flip_forward?.()}
              disabled={currentSpread === 7}
              className="px-4 py-2 text-[11px] font-mono tracking-widest font-bold uppercase border border-emerald-500/20 text-emerald-400 bg-slate-900 rounded-xl hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              Sig ▶
            </button>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-800 mx-1"></div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const leftIdx = currentSpread * 2 - 1;
                if (leftIdx >= 0) {
                  setFullscreenAsset({ type: 'image', src: manualPages[leftIdx] });
                }
              }}
              disabled={currentSpread === 0}
              className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-emerald-400 bg-slate-950/80 border border-emerald-500/30 rounded-xl overflow-hidden hover:bg-emerald-500 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              🔍 Zoom Izq
            </button>
            <button
              onClick={() => {
                const rightIdx = currentSpread * 2;
                if (rightIdx < manualPages.length) {
                  setFullscreenAsset({ type: 'image', src: manualPages[rightIdx] });
                }
              }}
              disabled={currentSpread === 7}
              className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold font-mono text-emerald-400 bg-slate-950/80 border border-emerald-500/30 rounded-xl overflow-hidden hover:bg-emerald-500 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              🔍 Zoom Der
            </button>
          </div>
        </div>
      )}

      {/* Visor de Pantalla Completa para Camioneta / Libro Zoom */}
      {fullscreenAsset && (
        <div 
          onClick={closeFullscreen}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 p-4"
        >
          {/* Botón de cierre HUD */}
          <button 
            onClick={closeFullscreen}
            className="absolute top-6 right-6 p-3.5 rounded-2xl bg-[#0a1218]/90 border border-slate-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 pointer-events-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Navegación por flechas a los costados en el Zoom (para manualPages) */}
          {fullscreenAsset.type === 'image' && manualPages.includes(fullscreenAsset.src) && (
            <>
              {manualPages.indexOf(fullscreenAsset.src) > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomPrevPage();
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-[#0a1218]/85 border border-slate-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 pointer-events-auto active:scale-95 group z-[210] backdrop-blur-sm"
                  title="Página Anterior (Flecha Izquierda)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}
              
              {manualPages.indexOf(fullscreenAsset.src) < manualPages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomNextPage();
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-[#0a1218]/85 border border-slate-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 pointer-events-auto active:scale-95 group z-[210] backdrop-blur-sm"
                  title="Página Siguiente (Flecha Derecha)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
            </>
          )}
          
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-[95vw] max-h-[85vh] md:max-w-[85vw] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#060e14] shadow-2xl flex items-center justify-center p-2 backdrop-blur-sm"
          >
            {fullscreenAsset.type === 'image' ? (
              <div 
                className="relative overflow-hidden w-[90vw] h-[75vh] flex items-center justify-center cursor-grab active:cursor-grabbing select-none pointer-events-auto"
                onMouseDown={handleZoomMouseDown}
                onMouseMove={handleZoomMouseMove}
                onMouseUp={handleZoomMouseUp}
                onMouseLeave={handleZoomMouseUp}
                onTouchStart={handleZoomTouchStart}
                onTouchMove={handleZoomTouchMove}
                onTouchEnd={handleZoomTouchEnd}
                onTouchCancel={handleZoomTouchEnd}
                onWheel={handleZoomWheel}
              >
                <img 
                  src={fullscreenAsset.src} 
                  alt="Vista Zoom Manual" 
                  style={{
                    transform: `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})`,
                    transition: isDraggingZoom ? 'none' : 'transform 0.15s ease-out',
                    transformOrigin: 'center center'
                  }}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-inner select-none pointer-events-none"
                />
                
                {/* Controles de Zoom Flotantes */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#0a1218]/90 border border-slate-850 rounded-xl px-4 py-2 shadow-2xl backdrop-blur-md z-30 pointer-events-auto select-none">
                  <button 
                    onClick={handleZoomOut}
                    disabled={zoomScale <= 1}
                    className="p-1 rounded-lg border border-slate-700/60 text-emerald-400 hover:bg-emerald-500 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all font-bold text-xs"
                    title="Reducir Zoom"
                  >
                    ➖
                  </button>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold min-w-[45px] text-center">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button 
                    onClick={handleZoomIn}
                    disabled={zoomScale >= 4}
                    className="p-1 rounded-lg border border-slate-700/60 text-emerald-400 hover:bg-emerald-500 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all font-bold text-xs"
                    title="Aumentar Zoom"
                  >
                    ➕
                  </button>
                  <div className="w-px h-4 bg-slate-800"></div>
                  <button 
                    onClick={handleZoomReset}
                    className="p-1 rounded-lg border border-slate-700/60 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-[10px]"
                    title="Restablecer"
                  >
                    ↺
                  </button>
                </div>
              </div>
            ) : (
              <video 
                src={fullscreenAsset.src} 
                controls 
                autoPlay 
                loop 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-inner pointer-events-auto"
              />
            )}
          </div>
          <div className="mt-4 px-4 py-1.5 rounded-full bg-[#0a1218]/90 border border-slate-800 backdrop-blur-sm text-gray-400 font-mono text-[10px] uppercase tracking-widest select-none">
            {fullscreenAsset.type === 'image' && zoomScale > 1 ? "Arrastre para mover la imagen // Use la rueda del mouse para Zoom" : "Haga clic afuera para cerrar"}
          </div>
        </div>
      )}
    </div>
  );
}
