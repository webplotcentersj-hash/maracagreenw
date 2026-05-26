"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent server-side window errors
const Brand3DSection = dynamic(
  () => import("./brand-3d-section"),
  { ssr: false }
);

export function Brand3DWrapper() {
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setShowBrand(window.location.hash === "#marca");
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange, { passive: true });
    
    // Fast polling backup to capture hash transitions intercepted by Next.js
    const interval = setInterval(handleHashChange, 200);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearInterval(interval);
    };
  }, []);

  if (!showBrand) return null;

  return <Brand3DSection />;
}
