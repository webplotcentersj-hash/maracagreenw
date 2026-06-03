import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Greenworking | Infraestructura Tecnológica para Empresas que no pueden detenerse",
  description: "Socio estratégico de infraestructura tecnológica integral para empresas. Cableado estructurado, tendido de fibra óptica, data centers, energía crítica, climatización técnica, seguridad electrónica y soporte técnico 24/7 en Argentina.",
  keywords: [
    "infraestructura tecnológica para empresas",
    "cableado estructurado",
    "redes empresariales",
    "redes corporativas",
    "instalación de fibra óptica",
    "tendido de fibra óptica",
    "data center",
    "infraestructura para data center",
    "sala de servidores",
    "energía crítica",
    "UPS para empresas",
    "respaldo energético",
    "continuidad operativa",
    "seguridad electrónica",
    "CCTV para empresas",
    "cámaras de seguridad para empresas",
    "control de acceso",
    "climatización técnica",
    "refrigeración para data center",
    "soporte técnico empresarial",
    "mantenimiento de infraestructura tecnológica",
    "monitoreo de infraestructura",
    "soluciones tecnológicas integrales"
  ],
  authors: [{ name: "Greenworking S.A." }],
  creator: "Greenworking S.A.",
  publisher: "Greenworking S.A.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://greenworking.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Greenworking | Infraestructura Tecnológica para Empresas que no pueden detenerse",
    description: "Socio estratégico de infraestructura tecnológica integral para empresas. Cableado estructurado, fibra óptica, data centers, energía crítica y soporte técnico 24/7.",
    url: "https://greenworking.com.ar",
    siteName: "Greenworking S.A.",
    images: [
      {
        url: "/wp-content/uploads/2024/07/greenworking-soluciones-tecnologicas-centros-de-computos-y-redes-infraestructura.webp",
        width: 1200,
        height: 630,
        alt: "Greenworking Soluciones Tecnológicas e Infraestructura Crítica",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenworking | Infraestructura Tecnológica para Empresas",
    description: "Conectamos, protegemos y sostenemos la operación de empresas mediante soluciones de infraestructura crítica.",
    images: ["/wp-content/uploads/2024/07/greenworking-soluciones-tecnologicas-centros-de-computos-y-redes-infraestructura.webp"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD structured data for advanced SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://greenworking.com.ar/#organization",
        "name": "Greenworking S.A.",
        "url": "https://greenworking.com.ar/",
        "logo": "https://greenworking.com.ar/wp-content/uploads/2024/05/greenworking-soluciones-tecnologicas-logo-02.png",
        "image": "https://greenworking.com.ar/wp-content/uploads/2024/07/greenworking-soluciones-tecnologicas-centros-de-computos-y-redes-infraestructura.webp",
        "description": "Socio estratégico de infraestructura tecnológica integral para empresas en Argentina. Especialistas en redes, data centers, energía crítica y soporte técnico.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Humboldt 324",
          "addressLocality": "Ramos Mejía",
          "addressRegion": "Buenos Aires",
          "postalCode": "B1704",
          "addressCountry": "AR"
        },
        "telephone": "+54-11-3974-0970",
        "priceRange": "$$$$",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/greenworking-sa/"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://greenworking.com.ar/#webpage",
        "url": "https://greenworking.com.ar/",
        "name": "Greenworking S.A. | Inicio",
        "isPartOf": {
          "@id": "https://greenworking.com.ar/#website"
        },
        "about": {
          "@id": "https://greenworking.com.ar/#organization"
        },
        "inLanguage": "es-AR"
      },
      {
        "@type": "WebSite",
        "@id": "https://greenworking.com.ar/#website",
        "url": "https://greenworking.com.ar/",
        "name": "Greenworking",
        "publisher": {
          "@id": "https://greenworking.com.ar/#organization"
        }
      }
    ]
  };

  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#061014] text-white`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
