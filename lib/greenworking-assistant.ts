import { GoogleGenAI } from "@google/genai";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export const GREENWORKING_SYSTEM_PROMPT = `Sos el asistente comercial y técnico de **Green Working S.A.**, empresa argentina de ingeniería e infraestructura tecnológica corporativa.

## Tu rol
- Atender consultas de clientes potenciales y actuales con calidez, claridad y profesionalismo B2B.
- Hablar en español rioplatense (Argentina): cercano pero corporativo; podés usar "vos" con respeto.
- Escuchar primero, empatizar si hay urgencia o frustración, y después orientar con soluciones concretas.
- Hacer preguntas de calificación cuando falte contexto (empresa, ubicación, plazo, criticidad, alcance).
- Nunca inventar precios, plazos contractuales ni certificaciones que no estén abajo.
- Si piden cotización formal, invitá al formulario de diagnóstico técnico de la web o a contacto directo.

## Servicios principales
1. **Centro de cómputos, redes y Data Centers**: diseño, racks, pasillo frío/caliente, piso técnico, monitoreo ambiental.
2. **Fibra óptica**: tendidos aéreos/subterráneos, fusión por arco voltaico, certificación OTDR, mantenimiento 24/7.
3. **Electricidad y energía crítica**: UPS modulares, grupos electrógenos, tableros TTA, calidad de energía, paneles solares, iluminación.
4. **Telecomunicaciones**: radioenlaces, Wi‑Fi corporativo, telefonía IP.
5. **Seguridad electrónica**: CCTV IP, control de accesos biométrico, intrusión, detección de incendio.
6. **Refrigeración y HVAC**: precisión para salas técnicas, VRF, equipos paquete, mantenimiento industrial.
7. **Flota y soporte de campo**: móviles 4x4 equipados, SLA, cobertura nacional.
8. **Proyectos en entornos extremos**: minería en altura, Oil & Gas, Patagonia.

## Cobertura
- **Sede central**: Humboldt 324, Ramos Mejía, Provincia de Buenos Aires.
- Operación en todo el país con nodos en GBA, Cuyo, Centro, Litoral y Patagonia.

## Contacto oficial
- WhatsApp: +54 011 3370 9716 → https://wa.me/541133709716
- Email: info@greenworking.com.ar
- Instagram: @greenworkingsa
- LinkedIn: Greenworkingsa / greenworking-sa

## Soporte y SLA
- Guardias técnicas 24/7 para clientes con póliza.
- SLA de respuesta en sitio típico: 2 a 4 horas para abonados corporativos (según contrato).

## Estilo de respuesta
- Respuestas concisas: 2–5 párrafos cortos o viñetas cuando ayude.
- Usá **negritas** solo para conceptos clave (markdown).
- Links en formato [texto](url) cuando compartas WhatsApp, email o redes.
- Si no sabés algo específico, decilo con honestidad y ofrecé derivar a un ingeniero humano.
- Ante emergencias activas, priorizá WhatsApp y mencioná soporte 24/7.`;

interface Intent {
  keywords: string[];
  response: string;
}

const KNOWLEDGE_BASE: Intent[] = [
  {
    keywords: ["hola", "buen", "dia", "tarde", "noche", "saludos", "que tal", "alguien", "hey", "buenas"],
    response:
      "¡Hola! Gracias por escribirnos. Soy el asistente de **Green Working S.A.** y estoy para ayudarte con consultas sobre infraestructura tecnológica, energía crítica, redes, fibra, seguridad o climatización.\n\nContame brevemente qué necesitás resolver en tu empresa y, si podés, en qué ciudad o provincia estás operando.",
  },
  {
    keywords: ["servicio", "servicios", "que hacen", "ofrecen", "ingenieria", "portafolio", "solucion", "soluciones", "trabajos", "obra", "obras"],
    response:
      "En **Green Working** integramos ingeniería, instalación y soporte post-proyecto. Nuestros focos principales son:\n\n* **Redes y Data Centers**\n* **Fibra óptica certificada**\n* **Energía crítica (UPS, grupos electrógenos, tableros)**\n* **Telecomunicaciones y Wi‑Fi**\n* **CCTV y control de accesos**\n* **HVAC industrial y de precisión**\n\n¿Cuál de estas áreas es prioridad para tu organización ahora?",
  },
  {
    keywords: ["fibra", "optica", "optico", "tendido", "fusion", "fusiones", "otdr", "backbone"],
    response:
      "Somos especialistas en **fibra óptica** para planta externa e interna: canalizaciones, bandejas, fusión por arco voltaico (atenuación de empalme < 0.02 dB) y certificación OTDR.\n\nTambién damos mantenimiento correctivo con guardia para cortes de fibra.\n\n¿Necesitás interconectar sedes, un backbone nuevo o reparar un tendido existente?",
  },
  {
    keywords: ["data center", "datacenter", "sala tecnica", "salas tecnicas", "rack", "racks", "servidores"],
    response:
      "Diseñamos **Data Centers y salas técnicas** con pasillo frío/caliente, contención, monitoreo ambiental IP y piso técnico antiestático.\n\nTrabajamos bajo criterios de alta disponibilidad y eficiencia energética.\n\n¿Tu proyecto es una sala nueva, una ampliación o un rediseño de infraestructura existente?",
  },
  {
    keywords: ["energia", "ups", "critica", "bateria", "corte", "cortes", "grupo", "electrogeno", "tablero", "generador", "electricidad"],
    response:
      "En **energía crítica** implementamos UPS modulares, bancos de baterías, tableros de transferencia automática (TTA) y grupos electrógenos para continuidad operativa.\n\nTambién auditamos calidad de energía (armónicos, picos, factor de potencia).\n\n¿Qué cargas necesitás proteger: servidores, planta industrial, o ambas?",
  },
  {
    keywords: ["seguridad", "cctv", "camara", "camaras", "acceso", "accesos", "biometrico", "alarma", "intrusion"],
    response:
      "Instalamos **seguridad electrónica corporativa**: CCTV IP con analítica, control de accesos (RFID/biometría), intrusión perimetral y detección de incendio.\n\n¿Buscás reemplazar un sistema legacy o diseñar uno nuevo multi-sede?",
  },
  {
    keywords: ["clima", "climatizacion", "aire", "acondicionado", "precision", "hvac", "refrigeracion", "frio", "chiller"],
    response:
      "Ofrecemos **climatización de precisión** para salas técnicas y HVAC comercial/industrial: VRF, equipos paquete, condensadoras, mantenimiento predictivo y repuestos.\n\n¿Es para una sala de servidores, nave industrial o edificio corporativo?",
  },
  {
    keywords: ["sede", "sedes", "donde", "oficina", "cobertura", "alcance", "argentina", "ramos mejia", "interior", "provincia"],
    response:
      "Tenemos **cobertura en todo el país**. Nuestra sede central está en **Humboldt 324, Ramos Mejía (GBA)** y operamos con cuadrillas en Centro, Cuyo, Litoral y Patagonia.\n\n¿En qué localidad necesitás la intervención? Así te indico el camino más ágil.",
  },
  {
    keywords: ["urgencia", "urgencias", "soporte", "mantenimiento", "abono", "poliza", "guardia", "24/7", "sla", "emergencia", "caido", "caida", "sin servicio"],
    response:
      "Entiendo la criticidad. Para **incidentes activos** el canal más rápido es WhatsApp: [+54 011 3370 9716](https://wa.me/541133709716).\n\nClientes con póliza acceden a guardia **24/7** con SLA de respuesta en sitio desde **2 a 4 horas** (según contrato).\n\n¿Ya sos cliente con abono o es la primera consulta?",
  },
  {
    keywords: ["mineria", "minero", "puna", "petroleo", "gas", "oil", "industrial", "extrema", "patagonia", "altura"],
    response:
      "Tenemos experiencia en **entornos extremos**: minería en altura (Puna), Oil & Gas en Patagonia, shelters autónomos y equipamiento robusto para climas hostiles.\n\nNuestros equipos cuentan con certificaciones de altura y seguridad industrial.\n\n¿Podés contarme el tipo de sitio y la criticidad del servicio?",
  },
  {
    keywords: ["precio", "precios", "costo", "costos", "cotizacion", "cotizar", "presupuesto", "cuanto sale", "valor"],
    response:
      "Cada proyecto se dimensiona según alcance, criticidad, ubicación y plazos. Por eso no publicamos tarifas fijas.\n\nLo ideal es que un ingeniero evalúe tu caso. Podés:\n\n* Completar el **formulario de diagnóstico** en esta misma página\n* Escribirnos por WhatsApp: [+54 011 3370 9716](https://wa.me/541133709716)\n* Enviar mail a [info@greenworking.com.ar](mailto:info@greenworking.com.ar)\n\nSi me compartís empresa, ciudad y servicio requerido, te oriento qué datos conviene incluir en la solicitud.",
  },
  {
    keywords: ["contacto", "telefono", "mail", "correo", "llamar", "whatsapp", "instagram", "linkedin", "hablar", "comunicar", "humboldt"],
    response:
      "Estos son nuestros canales oficiales:\n\n* 💬 **WhatsApp**: [+54 011 3370 9716](https://wa.me/541133709716)\n* ✉️ **Email**: [info@greenworking.com.ar](mailto:info@greenworking.com.ar)\n* 📍 **Sede**: Humboldt 324, Ramos Mejía, Buenos Aires\n* 📱 **Redes**: [Instagram @greenworkingsa](https://www.instagram.com/greenworkingsa/) · [LinkedIn](https://www.linkedin.com/company/greenworking-sa/)\n\n¿Preferís que te ayude a armar un mensaje para el equipo comercial?",
  },
  {
    keywords: ["gracias", "excelente", "perfecto", "joya", "genial", "entendido", "ok", "listo", "buenisimo"],
    response:
      "¡Gracias a vos! Fue un gusto ayudarte. Si surge otra consulta sobre infraestructura, energía o soporte, escribime cuando quieras.\n\nTambién podés contactarnos directo por WhatsApp si necesitás avanzar con un ingeniero.",
  },
  {
    keywords: ["flota", "movil", "camioneta", "4x4", "campo", "logistica"],
    response:
      "Contamos con **flota corporativa 4x4** equipada para soporte en campo: fusión óptica, medición certificada y repuestos críticos.\n\nCoordinamos salidas desde nuestras bases a nivel nacional según SLA.\n\n¿Necesitás asistencia en sitio o planificás un despliegue nuevo?",
  },
];

const URGENCY_WORDS = ["urgente", "urgencia", "emergencia", "caido", "caida", "critico", "ahora", "inmediato", "sin servicio", "help"];
const FRUSTRATION_WORDS = ["mal", "pesimo", "demora", "nadie responde", "enojado", "molesto", "problema grave"];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, " ");
}

function scoreIntent(intent: Intent, normalized: string, words: string[]) {
  let score = 0;
  for (const keyword of intent.keywords) {
    const cleanKeyword = normalize(keyword);
    if (cleanKeyword.includes(" ")) {
      if (normalized.includes(cleanKeyword)) score += 4;
    } else {
      for (const word of words) {
        if (word === cleanKeyword) score += 3;
        else if (word.length > 3 && cleanKeyword.length > 3 && (word.startsWith(cleanKeyword) || cleanKeyword.startsWith(word))) {
          score += 1;
        }
      }
    }
  }
  return score;
}

function detectTone(normalized: string) {
  const isUrgent = URGENCY_WORDS.some((w) => normalized.includes(w));
  const isFrustrated = FRUSTRATION_WORDS.some((w) => normalized.includes(w));
  return { isUrgent, isFrustrated };
}

export function getLocalAssistantResponse(userMessage: string, history: ChatTurn[] = []): string {
  const normalized = normalize(userMessage);
  const words = normalized.split(/\s+/).filter(Boolean);
  const { isUrgent, isFrustrated } = detectTone(normalized);

  if (isUrgent || isFrustrated) {
    return (
      (isFrustrated
        ? "Lamento que estés pasando por esta situación. Entiendo lo crítico que puede ser para tu operación.\n\n"
        : "Comprendo que es una situación urgente.\n\n") +
      "Para **respuesta inmediata**, escribinos por WhatsApp: [+54 011 3370 9716](https://wa.me/541133709716). Si tenés póliza de soporte, mencioná el número de cliente y la sede afectada.\n\nMientras tanto, contame qué servicio falló (red, energía, fibra, CCTV, clima) y en qué ubicación estás."
    );
  }

  let best: Intent | null = null;
  let maxScore = 0;
  const ranked: { intent: Intent; score: number }[] = [];

  for (const intent of KNOWLEDGE_BASE) {
    const score = scoreIntent(intent, normalized, words);
    if (score > 0) ranked.push({ intent, score });
    if (score > maxScore) {
      maxScore = score;
      best = intent;
    }
  }

  ranked.sort((a, b) => b.score - a.score);

  if (maxScore >= 4 && ranked.length >= 2 && ranked[0].score === ranked[1].score) {
    return (
      "Tu consulta toca varios frentes. Para orientarte mejor:\n\n" +
      ranked
        .slice(0, 2)
        .map((r) => `* ${r.intent.keywords[0].toUpperCase()}: puedo detallarte alcance, tiempos y próximos pasos.`)
        .join("\n") +
      "\n\n¿Cuál es la prioridad número uno para tu empresa hoy?"
    );
  }

  if (best && maxScore > 0) {
    const lastBot = [...history].reverse().find((m) => m.role === "assistant")?.content ?? "";
    if (lastBot && best.response === lastBot) {
      return "Para avanzar con tu caso, un ingeniero puede evaluarlo en detalle. ¿Querés que te indique cómo completar el formulario de diagnóstico o preferís contacto directo por [WhatsApp](https://wa.me/541133709716)?";
    }
    return best.response;
  }

  const lastUserTopics = history
    .filter((m) => m.role === "user")
    .slice(-3)
    .map((m) => normalize(m.content))
    .join(" ");

  if (lastUserTopics.includes("precio") || lastUserTopics.includes("cotiz")) {
    return "Sobre **cotización**: necesitamos alcance, ubicación y plazos. Podés completar el formulario de esta página o escribir a [info@greenworking.com.ar](mailto:info@greenworking.com.ar). ¿Querés que te liste qué datos técnicos conviene adjuntar?";
  }

  return (
    "Gracias por tu mensaje. Para ayudarte mejor, contame un poco más:\n\n" +
    "* ¿Qué servicio necesitás? (redes, fibra, energía, seguridad, HVAC)\n" +
    "* ¿En qué ciudad o provincia?\n" +
    "* ¿Es proyecto nuevo, mantenimiento o una urgencia?\n\n" +
    "También podés escribirnos directo por [WhatsApp](https://wa.me/541133709716) y un especialista te responde a la brevedad."
  );
}

export async function getGeminiAssistantReply(
  history: ChatTurn[],
  userMessage: string
): Promise<string | null> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const ai = new GoogleGenAI({ apiKey });

  const contents = [
    ...history.slice(-10).map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    })),
    { role: "user" as const, parts: [{ text: userMessage }] },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: GREENWORKING_SYSTEM_PROMPT,
        temperature: 0.65,
        maxOutputTokens: 700,
      },
    });

    return response.text?.trim() || null;
  } catch (error) {
    console.error("Gemini chat error", error);
    return null;
  }
}
