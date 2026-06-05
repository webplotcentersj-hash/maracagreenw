"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { NewsCards, NewsCard } from "@/components/ui/news-cards";

const greenworkingPosts: NewsCard[] = [
  {
    id: "cableado-estructurado",
    title: "Qué es el cableado estructurado y por qué es clave para una empresa",
    category: "Redes Empresariales",
    subcategory: "Cableado Estructurado",
    timeAgo: "Hace 5 min",
    location: "Argentina",
    image: "/ss/Imagen25.png",
    gradientColors: ["from-emerald-500/10", "to-green-500/10"],
    content: [
      "En la era de la transformación digital, la infraestructura física de telecomunicaciones es los cimientos sobre los que se sostiene toda la operación de una compañía. El cableado estructurado es el método estandarizado para diseñar e instalar un sistema de cableado integrado que facilite la interconexión de redes de datos, voz y video de manera flexible y escalable.",
      "Uno de los principales beneficios de contar con un tendido de cableado estructurado certificado bajo la normativa internacional ANSI/TIA-568 es la drástica reducción del downtime (tiempo de inactividad). Los sistemas obsoletos o improvisados representan hasta el 70% de las caídas de red físicas en corporaciones, generando pérdidas millonarias y cuellos de botella críticos.",
      "La modularidad es otra ventaja competitiva insustituible. Con un diseño estructurado, realizar un movimiento, adición o cambio de puesto de trabajo en la oficina es una tarea sencilla que se ejecuta en minutos en el rack central (patchera), sin necesidad de canalizar nuevas líneas o alterar el funcionamiento del resto de la planta.",
      "Además, los estándares modernos de categorías de cable como Cat6A y Cat8 aseguran anchos de banda de 10Gbps a 40Gbps, permitiendo a las empresas desplegar tecnologías demandantes como videollamadas 4K, almacenamiento en la nube en tiempo real, inteligencia artificial en terminales y telemetría IP de alta definición con latencia prácticamente inexistente.",
      "Invertir en una instalación profesional certificada por ingenieros calificados no es un gasto, sino una protección de activos a largo plazo. Un sistema bien diseñado tiene una vida útil promedio de más de 15 años y revaloriza la infraestructura comercial de la empresa, preparándola para los desafíos tecnológicos del futuro."
    ]
  },
  {
    id: "energia-critica",
    title: "Cómo evitar interrupciones operativas por fallas eléctricas",
    category: "Energía Crítica",
    subcategory: "Sistemas UPS",
    timeAgo: "Hace 6 min",
    location: "Argentina",
    image: "/ss/Imagen31.png",
    gradientColors: ["from-amber-500/10", "to-orange-500/10"],
    content: [
      "Los fallos en el suministro eléctrico comercial son una de las principales amenazas silenciosas para las industrias y los centros de cómputo corporativos. Un simple microcorte de energía de pocos milisegundos puede corromper bases de datos críticas, colapsar líneas de montaje automatizadas y dejar fuera de servicio canales de atención al cliente durante horas.",
      "Para mitigar estos riesgos, las arquitecturas de energía crítica recurren a sistemas de alimentación ininterrumpida (UPS) trifásicos en configuración modular. Estos equipos garantizan que, ante cualquier anomalía de tensión comercial, la carga pase instantáneamente a las baterías sin tiempo de transferencia (0 ms), logrando un flujo de corriente puramente senoidal y de tensión estable.",
      "La modularidad en las UPS permite implementar redundancia N+1. Esto significa que si un módulo del equipo requiere mantenimiento preventivo o sufre un desperfecto físico, el resto de los módulos absorbe la demanda de forma transparente sin apagar los servidores y sin interrumpir la operación general.",
      "Además del respaldo químico por baterías, es fundamental la sincronización con grupos electrógenos de arranque automático equipados con tableros de transferencia automática (TTA). Estos dispositivos de conmutación coordinan el arranque del motor diésel y la transferencia de carga en menos de 10 segundos, sosteniendo la autonomía de la planta por días en contingencias prolongadas.",
      "El diseño de una red de energía eléctrica confiable debe contemplar auditorías periódicas y análisis de la calidad de la energía (medición de armónicos, picos de voltaje y caídas de tensión). En Green Working asesoramos e implementamos ingeniería de alta disponibilidad para asegurar que tu negocio continúe funcionando de forma ininterrumpida bajo cualquier circunstancia."
    ]
  },
  {
    id: "data-centers",
    title: "Qué necesita un data center para funcionar correctamente",
    category: "Data Centers",
    subcategory: "Infraestructura Física",
    timeAgo: "Hace 8 min",
    location: "Argentina",
    image: "/ss/Imagen43.jpg",
    gradientColors: ["from-blue-500/10", "to-cyan-500/10"],
    content: [
      "El diseño e instalación de un Data Center (Centro de Procesamiento de Datos) moderno va mucho más allá de ensamblar servidores en un gabinete metálico. Se trata de un ecosistema complejo donde la climatización de precisión, la distribución de energía limpia, la extinción de incendios y la seguridad perimetral deben coexistir en perfecto equilibrio.",
      "El primer pilar de un Data Center de alto desempeño es la gestión térmica de precisión. En lugar de enfriar la sala completa de manera ineficiente, los estándares internacionales (como TIA-942) recomiendan el confinamiento de pasillo frío y pasillo caliente. Esto evita la mezcla del aire climatizado con el aire caliente de escape de los servidores, reduciendo el consumo energético hasta un 40%.",
      "El segundo pilar es la distribución de energía redundante mediante PDUs inteligentes en cada rack, alimentadas por sistemas de UPS duales de caminos independientes (Path A y Path B). Esto garantiza que si un cable de alimentación o una fuente del servidor falla, el equipo siga activo de forma inalterable a través de su fuente secundaria.",
      "Asimismo, la seguridad ambiental es indispensable. Las salas críticas deben contar con sistemas de detección temprana por aspiración de humo (VESDA) y extinción mediante gases limpios no conductores (como el agente FM-200 o Novec 1230), los cuales apagan un posible conato de incendio en segundos sin dañar los componentes electrónicos y sin dejar residuos corrosivos.",
      "Finalmente, el monitoreo a tiempo real mediante protocolos DCIM (Data Center Infrastructure Management) y sensores IoT permite vigilar la humedad, temperatura local, flujo de aire, y consumo eléctrico de cada toma en tiempo real. Esta visibilidad proactiva previene fallas antes de que ocurran, asegurando la continuidad del negocio y el cumplimiento estricto de los acuerdos de nivel de servicio (SLAs)."
    ]
  }
];

const customStatusBars = [
  {
    id: "1",
    category: "Redes Empresariales",
    subcategory: "Cableado Estructurado",
    length: 3,
    opacity: 1,
  },
  {
    id: "2", 
    category: "Energía Crítica",
    subcategory: "Sistemas UPS",
    length: 2,
    opacity: 0.7,
  },
  {
    id: "3",
    category: "Data Centers",
    subcategory: "Infraestructura Física",
    length: 1,
    opacity: 0.4,
  }
];

export function BlogSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#080d12] text-white border-t border-slate-900 overflow-hidden">
      
      {/* Design glows */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/20 rounded-lg bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
              Centro de Conocimiento
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Blog
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
              Analizamos las tendencias técnicas, estándares internacionales y metodologías de protección que aseguran la máxima velocidad, estabilidad y seguridad de tus redes e instalaciones corporativas.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 flex-shrink-0 w-fit">
            <BookOpen className="w-4 h-4" />
            <span>Ver todos los artículos</span>
          </button>
        </div>

        {/* Premium Interactive News Cards Deck */}
        <NewsCards 
          title=""
          subtitle=""
          statusBars={customStatusBars}
          newsCards={greenworkingPosts}
          enableAnimations={true}
        />

      </div>
    </section>
  );
}
