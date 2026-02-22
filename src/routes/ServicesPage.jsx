"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "@/lib/nextRouterCompat";
import { assetSrc } from "@/lib/assetSrc";
import diagnosticFtirMilkImage from "../assets/images/services/diagnostic/FTIR Milk Analyzer-cutout.webp";
import diagnosticFtirPgImage from "../assets/images/services/diagnostic/ftir-pg-glycerin-machine-cutout.webp";
import analyticsHbImage from "../assets/images/services/analytics/HB-machine-cutout.webp";
import analyticsHba1cImage from "../assets/images/services/analytics/HBA1c-Machine-cutout.webp";
import analyticsLateralFlowImage from "../assets/images/services/analytics/lateral-flow.webp";
import redcheckHbTestStripImage from "../assets/images/services/analytics/RedCheck HB Test Strip (50T).webp";
import redcheckHba1cTestStripImage from "../assets/images/services/analytics/RedCheck HBA1c Test Strip (25T).webp";
import diagnosticHeroLabImage from "../assets/images/home/facility.webp";
import analyticalHeroLabImage from "../assets/images/home/cta-lab-team.webp";

const diagnosticFtirMilkImageSrc = assetSrc(diagnosticFtirMilkImage);
const diagnosticFtirPgImageSrc = assetSrc(diagnosticFtirPgImage);
const analyticsHbImageSrc = assetSrc(analyticsHbImage);
const analyticsHba1cImageSrc = assetSrc(analyticsHba1cImage);
const analyticsLateralFlowImageSrc = assetSrc(analyticsLateralFlowImage);
const redcheckHbTestStripImageSrc = assetSrc(redcheckHbTestStripImage);
const redcheckHba1cTestStripImageSrc = assetSrc(redcheckHba1cTestStripImage);
const diagnosticHeroLabImageSrc = assetSrc(diagnosticHeroLabImage);
const analyticalHeroLabImageSrc = assetSrc(analyticalHeroLabImage);

const redcheckHbBrochure = "/assets/brochures/redcheck-hb-analyzer.pdf";
const redcheckHba1cBrochure = "/assets/brochures/redcheck-hba1c-analyzer.pdf";
const ftirPgBrochure = "/assets/brochures/ftir-pg-glycerin.pdf";

const SERVICE_CATALOG = [
  {
    id: "diagnostic",
    title: "Diagnostic",
    intro:
      "Point-of-care diagnostic solutions with test kits for routine screening.",
    products: [
      {
        id: "redcheck-hb-device",
        name: "RedCheck Hb Device",
        categoryTag: "Diagnostic",
        short:
          "Portable hemoglobin analyzer with 5-second results for point-of-care anemia screening.",
        details: [
          "Working principle: absorbance photometry at isosbestic point 525/880 nm.",
          "Sample volume: 8 uL. Test range: 0-25 g/dL with CV <3%.",
          "Memory up to 1000 tests with USB and Bluetooth connectivity.",
          "Battery supports more than 500 tests per charge (Li-ion 3.7V, 1000 mAh).",
        ],
        imageUrl: analyticsHbImageSrc,
        brochureUrl: redcheckHbBrochure,
        alt: "RedCheck Hb Device",
      },
      {
        id: "redcheck-hba1c-device",
        name: "RedCheck HbA1c Device",
        categoryTag: "Diagnostic",
        short:
          "Compact HbA1c analyzer for Average Sugar tracking .",
        details: [
          "Test principle: boronate affinity chromatography.",
          "Measuring range: 4.0% to 14.0% HbA1c with precision <3%.",
          "Sample type: finger-prick or venous blood; sample volume: 4 uL.",
          "Reading time: 5 minutes, memory: 1000 tests, power: 4 AAA batteries or USB.",
        ],
        imageUrl: analyticsHba1cImageSrc,
        brochureUrl: redcheckHba1cBrochure,
        alt: "RedCheck HbA1c Device",
      },
      {
        id: "portable-lateral-flow-analyzer",
        name: "Portable Lateral Flow Analyzer",
        categoryTag: "Diagnostic",
        short:
          "Portable reader for objective interpretation of lateral-flow test cassettes.",
        details: [
          "Reduces manual visual reading variation.",
          "Improves consistency across operators and locations.",
          "Supports digital capture for traceable reporting.",
        ],
        imageUrl: analyticsLateralFlowImageSrc,
        brochureUrl: null,
        alt: "Portable Lateral Flow Analyzer",
      },
      {
        id: "redcheck-hb-test-strips-50t",
        name: "RedCheck Hb Test Strips (50T)",
        categoryTag: "Test Kit",
        short:
          "Single-use test strips for RedCheck Hb screening .",
        details: [
          "Pack size: 50 test strips.",
          "Supports regular hemoglobin screening operations.",
          "Designed for consistent use in routine testing runs.",
        ],
        imageUrl: redcheckHbTestStripImageSrc,
        brochureUrl: null,
        alt: "RedCheck Hb Test Strips (50T)",
      },
      {
        id: "redcheck-hba1c-test-kit-25t",
        name: "RedCheck HbA1c Test Kit (25T)",
        categoryTag: "Test Kit",
        short:
          "HbA1c test kit format intended for periodic diabetes monitoring .",
        details: [
          "Pack size: 25 tests.",
          "Suited for clinic and lab follow-up testing.",
          "Supports practical day-to-day HbA1c checks.",
        ],
        imageUrl: redcheckHba1cTestStripImageSrc,
        brochureUrl: null,
        alt: "RedCheck HbA1c Test Kit (25T)",
      },
      {
        id: "somatic-cell-test-cassettes",
        name: "Somatic Cell Test Cassettes",
        categoryTag: "Test Kit",
        short:
          "Cassette-based format for somatic cell related testing requirements.",
        details: [
          "Built for routine screening use cases.",
          "Simple consumable format for regular lab handling.",
          "Supports repeat testing programs and workflow continuity.",
        ],
        imageUrl: null,
        hideMedia: true,
        brochureUrl: null,
        alt: "Somatic Cell Test Cassettes",
      },
    ],
  },
  {
    id: "analytical",
    title: "Analytical",
    intro:
      "Laboratory analytical solutions for milk composition and contamination screening.",
    products: [
      {
        id: "ftir-milk-analyzer",
        name: "FTIR Milk Analyzer",
        categoryTag: "Analytical",
        short:
          "FTIR Analyzer for milk composition and adulterant screening at Milk collection centers.",
        details: [
          "Sample types: raw cow milk, raw buffalo milk, and raw mixed milk.",
          "Testing time: 30 seconds with sample volume below 5 ml.",
          "Range: Fat 0-13%, SNF 0-15%, Protein 0-8%.",
          "Targeted adulterants include urea, sucrose, maltodextrin, ammonium sulphate, sodium carbonate, glucose, and sodium nitrate.",
        ],
        imageUrl: diagnosticFtirMilkImageSrc,
        brochureUrl: null,
        alt: "FTIR Milk Analyzer",
      },
      {
        id: "ftir-pg-glycerine-analyzer",
        name: "FTIR PG / Glycerine Analyzer",
        categoryTag: "Analytical",
        short:
          "FTIR liquid analyzer for propylene glycol and glycerin purity screening.",
        details: [
          "Detects diethylene glycol (DEG) adulteration above 1%.",
          "Sample test total time below 5 minutes; sample volume: 14 uL.",
          "Display: 4.3 inch resistive touchscreen with USB data interface.",
          "Weight approx. 7 kg; warm-up time around 30 minutes.",
        ],
        imageUrl: diagnosticFtirPgImageSrc,
        brochureUrl: ftirPgBrochure,
        alt: "FTIR PG / Glycerine Analyzer",
      },
      {
        id: "mbrt-machine",
        name: "Methylene Blue Reduction Test (MBRT) Analyzer",
        categoryTag: "Analytical",
        short:
          "Rapid microbial quality screening instrument for raw and pasteurized milk samples using the Methylene Blue Reduction Test (MBRT) method.",
        details: [
          "Measurement principle: absorbance photometry using methylene blue indicator dye.",
          "Predicts MBRT results early by monitoring dye reduction and decolourisation kinetics.",
          "Designed for milk collection centers, chilling centers, dairy plants, and quality control laboratories.",
          "Key specs: 16 channels, 37.0C +/- 0.5C IS 1479 Standard, 5 inch capacitive touchscreen Display , Ethernet/USB/Wi-Fi.",
        ],
        imageUrl: null,
        brochureUrl: null,
        alt: "Methylene Blue Reduction Test MBRT Analyzer",
      },
    ],
  },
];

const CATEGORY_MAP = Object.fromEntries(SERVICE_CATALOG.map((item) => [item.id, item]));
const HERO_TEXT_BACKGROUND = {
  diagnostic: diagnosticHeroLabImageSrc,
  analytical: analyticalHeroLabImageSrc,
};
const SERVICES_FORCE_NAV_EVENT = "bo:services-force-nav";

function normalizeHashToCategory(rawHash) {
  const key = rawHash.replace("#", "").trim().toLowerCase();
  if (!key) return "";
  if (key === "ivd") return "diagnostic";
  if (key === "diagnostics") return "diagnostic";
  if (key === "analytics" || key === "analytic") return "analytical";
  if (key === "analytical-instruments" || key === "instruments") return "analytical";
  if (
    key === "test-kits" ||
    key === "consumables" ||
    key === "kits" ||
    key === "test-kits-consumables"
  ) {
    return "diagnostic";
  }
  return key;
}

export default function ServicesPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("diagnostic");
  const [brokenImages, setBrokenImages] = useState({});
  const [visibleProducts, setVisibleProducts] = useState({});
  const catalogRef = useRef(null);
  const seqProgressRef = useRef(null);

  const activeCategoryData = useMemo(
    () => CATEGORY_MAP[activeCategory] || SERVICE_CATALOG[0],
    [activeCategory]
  );
  const heroTextImage = useMemo(
    () => HERO_TEXT_BACKGROUND[activeCategory] || diagnosticHeroLabImageSrc,
    [activeCategory]
  );

  const scrollToCatalog = useCallback((behavior = "smooth") => {
    const section = catalogRef.current || document.getElementById("sv-catalog");
    if (!section) return;

    const headerHeight = document.querySelector("header.sticky")?.getBoundingClientRect().height || 0;
    const top = Math.max(section.getBoundingClientRect().top + window.scrollY - headerHeight - 14, 0);

    window.scrollTo({ top, left: 0, behavior });
  }, []);

  const scrollToCatalogWithRetry = useCallback((behavior = "smooth") => {
    scrollToCatalog(behavior);
    window.setTimeout(() => scrollToCatalog("auto"), 110);
    window.setTimeout(() => scrollToCatalog("auto"), 260);
  }, [scrollToCatalog]);

  useEffect(() => {
    if (location.pathname !== "/services") return;

    const hashCategory = normalizeHashToCategory(location.hash);
    if (!CATEGORY_MAP[hashCategory]) return;

    setActiveCategory(hashCategory);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.requestAnimationFrame(() => {
      scrollToCatalogWithRetry(reduceMotion ? "auto" : "smooth");
    });
  }, [location.pathname, location.hash, scrollToCatalogWithRetry]);

  useEffect(() => {
    const onForceServicesNavigation = (event) => {
      if (window.location.pathname !== "/services") return;
      const forcedHash =
        typeof event?.detail?.hash === "string" ? event.detail.hash : window.location.hash;
      const hashCategory = normalizeHashToCategory(forcedHash);
      if (!CATEGORY_MAP[hashCategory]) return;

      setActiveCategory(hashCategory);
      window.history.replaceState({}, "", `${window.location.pathname}#${hashCategory}`);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.requestAnimationFrame(() => {
        scrollToCatalogWithRetry(reduceMotion ? "auto" : "smooth");
      });
    };

    window.addEventListener(SERVICES_FORCE_NAV_EVENT, onForceServicesNavigation);
    return () => window.removeEventListener(SERVICES_FORCE_NAV_EVENT, onForceServicesNavigation);
  }, [scrollToCatalogWithRetry]);

  useEffect(() => {
    let rafId = 0;

    const setProgress = (nextProgress) => {
      const node = seqProgressRef.current;
      if (!node) return;
      node.style.setProperty("--sv-progress", nextProgress.toFixed(4));
    };

    const updateProgress = () => {
      const section = catalogRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isCompactViewport = window.matchMedia("(max-width: 980px)").matches;
      if (reduceMotion || isCompactViewport) {
        setProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height + window.innerHeight;
      const seenDistance = window.innerHeight - rect.top;
      const progress = Math.max(0, Math.min(1, seenDistance / Math.max(totalScrollable, 1)));
      setProgress(progress);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateProgress();
        rafId = 0;
      });
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [activeCategory]);

  useEffect(() => {
    setVisibleProducts({});

    const rows = Array.from(document.querySelectorAll(".sv-item-row"));
    if (!rows.length) return undefined;

    const isCompactViewport = window.matchMedia("(max-width: 980px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || isCompactViewport || !("IntersectionObserver" in window)) {
      const allVisible = rows.reduce((acc, row) => {
        const id = row.getAttribute("data-product-id");
        if (id) acc[id] = true;
        return acc;
      }, {});
      setVisibleProducts(allVisible);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-product-id");
          if (id) {
            setVisibleProducts((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          }
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.26,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [activeCategory]);

  const markImageError = (id) => {
    setBrokenImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const setCategory = (categoryId, shouldScroll = false) => {
    if (!CATEGORY_MAP[categoryId]) return;

    setActiveCategory(categoryId);
    window.history.replaceState({}, "", `${window.location.pathname}#${categoryId}`);

    if (!shouldScroll) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToCatalogWithRetry(reduceMotion ? "auto" : "smooth");
  };

  return (
    <>
      <style>{`
        .sv-page {
          --sv-font-body: 'Manrope', sans-serif;
          --sv-blue-950: #081a32;
          --sv-blue-900: #0e2849;
          --sv-blue-700: #0369a1;
          --sv-blue-600: #0284c7;
          --sv-cyan-400: #22d3ee;
          --sv-cyan-300: #67e8f9;
          --sv-slate-700: #334155;
          --sv-slate-600: #475569;
          --sv-slate-200: #e2e8f0;
          --sv-slate-100: #f1f5f9;
          --sv-bg-soft: #f8fcff;
          --sv-success: #16a34a;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sv-page {
          background:
            radial-gradient(circle at 10% 8%, rgba(186, 230, 253, 0.3), rgba(186, 230, 253, 0) 36%),
            radial-gradient(circle at 92% 92%, rgba(125, 211, 252, 0.24), rgba(125, 211, 252, 0) 34%),
            linear-gradient(180deg, #ffffff 0%, var(--sv-bg-soft) 100%);
          color: var(--sv-slate-700);
          font-family: var(--sv-font-body);
          overflow-x: hidden;
        }

        .sv-page button,
        .sv-page a {
          font-family: var(--sv-font-body);
        }

        .sv-shell {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .sv-hero {
          --sv-hero-image: none;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 8% 12%, rgba(34, 211, 238, 0.25) 0%, rgba(34, 211, 238, 0) 42%),
            radial-gradient(circle at 90% 8%, rgba(2, 132, 199, 0.35) 0%, rgba(2, 132, 199, 0) 45%),
            linear-gradient(132deg, var(--sv-blue-950), var(--sv-blue-900) 50%, var(--sv-blue-700));
          min-height: 560px;
          display: flex;
          align-items: center;
        }

        .sv-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 46px 46px;
          opacity: 0.24;
          animation: sv-grid 20s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .sv-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(116deg, rgba(2, 11, 28, 0.74) 6%, rgba(9, 30, 57, 0.7) 48%, rgba(2, 132, 199, 0.5) 100%),
            var(--sv-hero-image);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.96;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes sv-grid {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-46px, -46px, 0); }
        }

        .sv-hero-inner {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 84px 0;
        }

        .sv-hero-content {
          position: relative;
          min-width: 0;
          max-width: 960px;
          padding: 0;
        }
        .sv-hero-content::before,
        .sv-hero-content::after {
          content: none;
        }

        .sv-hero-content > * {
          position: relative;
          z-index: 1;
        }

        .sv-crumb {
          color: rgba(255, 255, 255, 0.76);
          font-size: 13px;
          margin-bottom: 18px;
        }

        .sv-crumb a {
          color: rgba(255, 255, 255, 0.76);
          text-decoration: none;
        }

        .sv-crumb a:hover { color: #ffffff; }

        .sv-title {
          font-family: var(--sv-font-body);
          color: #ffffff;
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.01em;
          max-width: 920px;
        }

        .sv-title em {
          font-style: normal;
          color: var(--sv-cyan-400);
        }

        .sv-sub {
          margin-top: 18px;
          color: rgba(255,255,255,0.9);
          line-height: 1.78;
          font-size: clamp(14px, 2vw, 18px);
          max-width: 740px;
        }

        .sv-sub strong {
          color: #ffffff;
          font-weight: 800;
        }

        .sv-chip-row {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sv-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid rgba(255,255,255,0.38);
          background: rgba(255,255,255,0.14);
          border-radius: 999px;
          color: #ffffff;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
        }

        .sv-chip::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--sv-cyan-400);
        }

        .sv-chip:hover {
          background: rgba(255,255,255,0.24);
          transform: translateY(-1px);
        }

        .sv-chip.sv-chip-active {
          background: #ffffff;
          color: var(--sv-blue-700);
          border-color: #ffffff;
        }

        .sv-chip.sv-chip-active::before {
          background: var(--sv-success);
        }

        .sv-quick {
          padding: 28px 0 10px;
        }

        .sv-quick-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .sv-quick-card {
          text-align: left;
          border: 1px solid var(--sv-slate-200);
          border-radius: 14px;
          padding: 18px 18px;
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.08);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
        }

        .sv-quick-card:hover {
          transform: translateY(-3px);
          border-color: #bae6fd;
          box-shadow: 0 16px 30px rgba(2, 132, 199, 0.12);
        }

        .sv-quick-card.sv-quick-on {
          border-color: #7dd3fc;
          background: #f0f9ff;
        }

        .sv-quick-card h3 {
          font-family: var(--sv-font-body);
          font-size: 21px;
          color: var(--sv-blue-700);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .sv-quick-card p {
          margin-top: 8px;
          color: var(--sv-slate-600);
          line-height: 1.7;
          font-size: 14px;
        }

        .sv-section {
          padding: 62px 0 16px;
          background: transparent;
          position: relative;
          scroll-margin-top: 102px;
        }

        .sv-section::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 8% 12%, rgba(125, 211, 252, 0.12) 0%, rgba(125, 211, 252, 0) 36%),
            radial-gradient(circle at 92% 82%, rgba(34, 211, 238, 0.1) 0%, rgba(34, 211, 238, 0) 40%);
        }

        .sv-head-label {
          display: inline-block;
          color: var(--sv-blue-700);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid #bae6fd;
          background: #f0f9ff;
          border-radius: 999px;
          padding: 6px 12px;
          font-weight: 700;
        }

        .sv-head-title {
          margin-top: 12px;
          font-family: var(--sv-font-body);
          font-size: clamp(28px, 4vw, 42px);
          color: var(--sv-blue-900);
          line-height: 1.12;
        }

        .sv-head-title em {
          color: var(--sv-blue-600);
          font-style: normal;
        }

        .sv-head-line {
          width: 54px;
          height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--sv-blue-600), var(--sv-cyan-400));
          margin-top: 16px;
        }

        .sv-head-sub {
          margin-top: 14px;
          max-width: 820px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--sv-slate-600);
        }

        .sv-cat-tabs {
          margin-top: 18px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sv-tab {
          border: 1px solid var(--sv-slate-200);
          border-radius: 999px;
          background: #ffffff;
          color: var(--sv-slate-700);
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
        }

        .sv-tab:hover {
          border-color: #7dd3fc;
          color: var(--sv-blue-700);
        }

        .sv-tab.sv-tab-on {
          border-color: #7dd3fc;
          color: var(--sv-blue-700);
          background: #f0f9ff;
        }

        .sv-result-meta {
          margin-top: 10px;
          color: var(--sv-slate-600);
          font-size: 13px;
        }

        .sv-flow-head {
          margin-top: 18px;
          margin-bottom: 18px;
        }

        .sv-flow-title {
          font-family: var(--sv-font-body);
          font-size: clamp(24px, 3.4vw, 38px);
          color: var(--sv-blue-900);
          line-height: 1.15;
        }

        .sv-flow-note {
          margin-top: 8px;
          color: var(--sv-slate-600);
          line-height: 1.72;
          font-size: 14px;
          max-width: 780px;
        }

        .sv-flow-layout {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        .sv-seq-list {
          --sv-progress: 0;
          position: relative;
          display: grid;
          gap: 24px;
          z-index: 2;
        }

        .sv-item-shell {
          position: relative;
          border-radius: 0;
          padding: 16px 0;
          background: transparent;
          border: 0;
          box-shadow: none;
          backdrop-filter: none;
          overflow: visible;
          transition: none;
        }

        .sv-item-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          display: none;
          pointer-events: none;
        }

        .sv-item-shell::after {
          content: '';
          position: absolute;
          display: none;
          pointer-events: none;
        }

        .sv-item-shell-live,
        .sv-item-shell:hover {
          border-color: transparent;
          box-shadow: none;
        }

        .sv-seq-list::before {
          content: '';
          position: absolute;
          left: calc(50% - 1px);
          top: 10px;
          bottom: 10px;
          width: 2px;
          border-radius: 2px;
          background:
            repeating-linear-gradient(
              180deg,
              rgba(2, 132, 199, 0.28) 0 12px,
              rgba(2, 132, 199, 0.08) 12px 22px
            );
        }

        .sv-seq-list::after {
          content: '';
          position: absolute;
          left: calc(50% - 1px);
          top: 10px;
          width: 2px;
          height: calc((100% - 20px) * var(--sv-progress, 0));
          border-radius: 2px;
          background: linear-gradient(180deg, #67e8f9 0%, #22d3ee 55%, #0284c7 100%);
          background-size: 100% 220%;
          box-shadow: 0 0 12px rgba(14,165,233,0.35);
          transition: height 0.25s ease;
          animation: svFlowShift 6s linear infinite;
        }

        .sv-item-row {
          position: relative;
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 92px minmax(280px, 1fr);
          align-items: stretch;
          column-gap: 18px;
          min-height: 0;
          z-index: 2;
        }

        .sv-item-media {
          position: relative;
          background: transparent;
          border-radius: 0;
          border: 0;
          overflow: visible;
          width: 100%;
          max-width: 560px;
          justify-self: end;
          min-height: 245px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: none;
          opacity: 0;
          transform: translate3d(-26px, 0, 0) scale(0.985);
          transition: opacity 0.56s cubic-bezier(.22,.61,.36,1), transform 0.56s cubic-bezier(.22,.61,.36,1);
        }

        .sv-item-media::before {
          content: none;
        }

        .sv-item-media::after {
          content: none;
        }

        .sv-item-left .sv-item-media {
          grid-column: 1;
          justify-self: end;
        }
        .sv-item-left .sv-item-info  {
          grid-column: 3;
          justify-self: start;
        }
        .sv-item-mid { grid-column: 2; }

        .sv-item-right .sv-item-media {
          grid-column: 3;
          justify-self: start;
          transform: translate3d(26px, 0, 0) scale(0.985);
        }
        .sv-item-right .sv-item-info {
          grid-column: 1;
          justify-self: end;
          transform: translate3d(-26px, 0, 0) scale(0.99);
        }

        .sv-item-no-media {
          grid-template-columns: 92px minmax(280px, 1fr);
        }

        .sv-item-no-media .sv-item-media {
          display: none;
        }

        .sv-item-no-media .sv-item-mid {
          grid-column: 1;
        }

        .sv-item-no-media .sv-item-info {
          grid-column: 2;
          justify-self: start;
        }

        .sv-item-live .sv-item-media {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .sv-item-media:hover {
          box-shadow: none;
        }

        .sv-item-media img {
          width: auto;
          max-width: 94%;
          max-height: 236px;
          height: auto;
          object-fit: contain;
          background: transparent;
          padding: 0 6px;
          display: block;
          filter: drop-shadow(0 14px 20px rgba(56, 189, 248, 0.34));
          transition: transform 0.45s ease;
          transform: scale(1);
          transform-origin: center center;
          position: relative;
          z-index: 1;
        }

        .sv-item-row:hover .sv-item-media img {
          transform: scale(1.03) translateY(-2px);
        }

        .sv-media-fallback {
          height: 245px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sv-blue-900);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          background: transparent;
        }

        .sv-item-mid {
          position: relative;
          align-self: stretch;
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sv-item-node {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #ecfeff, #dbeafe);
          border: 1px solid rgba(14,116,144,0.24);
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.12);
          transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
          z-index: 2;
          position: relative;
          overflow: visible;
        }

        .sv-item-node-core {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0ea5e9;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.22);
        }

        .sv-item-node-core::before,
        .sv-item-node-core::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(14, 165, 233, 0.5);
          transform: translateY(-50%);
        }

        .sv-item-node-core::before { left: -14px; }
        .sv-item-node-core::after { right: -14px; }

        .sv-item-node::after {
          content: '';
          position: absolute;
          inset: -7px;
          border-radius: 19px;
          border: 1px solid rgba(14, 165, 233, 0.34);
          opacity: 0;
          transform: scale(0.72);
        }

        .sv-item-live .sv-item-node {
          background: linear-gradient(145deg, #67e8f9 0%, #0284c7 100%);
          border-color: rgba(14,116,144,0.2);
          animation: svNodePulse 0.7s cubic-bezier(.22,.61,.36,1) both;
        }

        .sv-item-live .sv-item-node .sv-item-node-core {
          background: #ffffff;
          box-shadow:
            0 0 0 5px rgba(255, 255, 255, 0.24),
            0 0 20px rgba(103, 232, 249, 0.95);
        }

        .sv-item-live .sv-item-node .sv-item-node-core::before,
        .sv-item-live .sv-item-node .sv-item-node-core::after {
          background: rgba(255, 255, 255, 0.85);
          animation: svOrbit 1.2s ease-in-out infinite;
        }

        .sv-item-live .sv-item-node .sv-item-node-core::after {
          animation-delay: 0.2s;
        }

        .sv-item-live .sv-item-node::after {
          animation: svNodeRing 0.9s cubic-bezier(.22,.61,.36,1) 0.06s both;
        }

        .sv-item-mid::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 58px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(14,116,144,0.12), rgba(14,165,233,0.92));
          transform: translateY(-50%) scaleX(0.12);
          transform-origin: left center;
          opacity: 0;
        }

        .sv-item-mid::before {
          content: '';
          position: absolute;
          left: calc(50% + 58px);
          top: 50%;
          border-style: solid;
          border-width: 6px 0 6px 9px;
          border-color: transparent transparent transparent rgba(14,116,144,0.82);
          transform: translateY(-50%) scale(0.4);
          transform-origin: left center;
          opacity: 0;
        }

        .sv-item-right .sv-item-mid::after {
          left: auto;
          right: 50%;
          background: linear-gradient(270deg, rgba(14,116,144,0.12), rgba(14,165,233,0.92));
          transform-origin: right center;
        }

        .sv-item-right .sv-item-mid::before {
          left: auto;
          right: calc(50% + 58px);
          border-width: 6px 9px 6px 0;
          border-color: transparent rgba(14,116,144,0.82) transparent transparent;
          transform-origin: right center;
        }

        .sv-item-live .sv-item-mid::after {
          animation: svArrowFlow 0.75s cubic-bezier(.22,.61,.36,1) forwards;
        }
        .sv-item-live .sv-item-mid::before {
          animation: svArrowPulse 0.66s cubic-bezier(.22,.61,.36,1) 0.1s forwards;
        }

        .sv-item-info {
          position: relative;
          width: 100%;
          max-width: 560px;
          height: 100%;
          border-radius: 20px;
          padding: 20px 22px;
          background:
            radial-gradient(circle at 4% 8%, rgba(186, 230, 253, 0.36), rgba(186, 230, 253, 0) 44%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(241, 249, 255, 0.84));
          border: 1.5px solid #8fd3f5;
          box-shadow: 0 14px 28px rgba(2, 132, 199, 0.12);
          opacity: 0;
          transform: translate3d(22px, 0, 0) scale(0.99);
          transition: opacity 0.56s cubic-bezier(.22,.61,.36,1), transform 0.56s cubic-bezier(.22,.61,.36,1), border-color 0.26s ease, box-shadow 0.26s ease;
          z-index: 5;
          isolation: isolate;
          display: flex;
          flex-direction: column;
        }

        .sv-item-live .sv-item-info {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .sv-item-right .sv-item-info {
          text-align: right;
        }

        .sv-item-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 8%;
          width: 84%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(14,165,233,0.92), transparent);
          transform: translateX(-95%);
          opacity: 0;
          pointer-events: none;
        }

        .sv-item-live .sv-item-info::before {
          animation: svBorderSweep 1.2s cubic-bezier(.22,.61,.36,1) 0.16s forwards;
        }

        .sv-item-row:hover .sv-item-info {
          border-color: #67c9f2;
          box-shadow: 0 18px 30px rgba(2, 132, 199, 0.18);
        }

        @keyframes svFlowShift {
          0% { background-position: 50% 0; }
          100% { background-position: 50% 220%; }
        }

        @keyframes svArrowFlow {
          0% {
            transform: translateY(-50%) scaleX(0.12);
            opacity: 0;
          }
          100% {
            transform: translateY(-50%) scaleX(1);
            opacity: 1;
          }
        }

        @keyframes svArrowPulse {
          0% {
            transform: translateY(-50%) scale(0.4);
            opacity: 0;
          }
          65% {
            transform: translateY(-50%) scale(1.08);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.96;
          }
        }

        @keyframes svNodePulse {
          0% {
            transform: scale(0.84);
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
          }
          60% {
            transform: scale(1.08);
            box-shadow: 0 10px 20px rgba(14,116,144,0.24);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 8px 16px rgba(15, 23, 42, 0.16);
          }
        }

        @keyframes svNodeRing {
          0% {
            opacity: 0;
            transform: scale(0.72);
          }
          35% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: scale(1.14);
          }
        }

        @keyframes svOrbit {
          0%, 100% {
            transform: translateY(-50%) scale(0.8);
            opacity: 0.65;
          }
          50% {
            transform: translateY(-50%) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes svBorderSweep {
          0% {
            transform: translateX(-95%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateX(95%);
            opacity: 0;
          }
        }

        @keyframes svAuraDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .7; }
          50% { transform: translate3d(-20px, 14px, 0) scale(1.08); opacity: 1; }
        }

        .sv-item-title {
          margin-top: 0;
          font-family: var(--sv-font-body);
          font-size: clamp(20px, 2.2vw, 30px);
          line-height: 1.18;
          color: var(--sv-blue-900);
          letter-spacing: -0.01em;
          text-wrap: balance;
        }

        .sv-item-copy {
          margin-top: 12px;
          color: var(--sv-slate-700);
          line-height: 1.76;
          font-size: 14px;
          padding-left: 12px;
          border-left: 3px solid rgba(56, 189, 248, 0.48);
          opacity: 0;
          transform: translate3d(0, 9px, 0);
        }

        .sv-item-live .sv-item-copy {
          animation: svCopyIn 0.58s cubic-bezier(.22,.61,.36,1) 0.14s forwards;
        }

        .sv-item-right .sv-item-copy {
          padding-left: 0;
          padding-right: 12px;
          border-left: 0;
          border-right: 3px solid rgba(56, 189, 248, 0.48);
        }

        .sv-item-list {
          margin-top: 12px;
          padding-left: 0;
          list-style: none;
          display: grid;
          gap: 8px;
          color: var(--sv-slate-700);
          font-size: 13px;
          line-height: 1.58;
        }

        .sv-item-list li {
          position: relative;
          padding: 0 0 0 18px;
          opacity: 0;
          transform: translate3d(10px, 0, 0);
        }

        .sv-item-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(180deg, #38bdf8, #0284c7);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.16);
        }

        .sv-item-right .sv-item-list li {
          text-align: right;
          padding-left: 0;
          padding-right: 18px;
          transform: translate3d(-10px, 0, 0);
        }

        .sv-item-right .sv-item-list li::before {
          left: auto;
          right: 0;
        }

        .sv-item-live .sv-item-list li {
          animation: svListLineIn 0.42s cubic-bezier(.22,.61,.36,1) forwards;
        }

        .sv-item-live .sv-item-list li:nth-child(1) { animation-delay: 0.22s; }
        .sv-item-live .sv-item-list li:nth-child(2) { animation-delay: 0.30s; }
        .sv-item-live .sv-item-list li:nth-child(3) { animation-delay: 0.38s; }
        .sv-item-live .sv-item-list li:nth-child(4) { animation-delay: 0.46s; }

        @keyframes svCopyIn {
          from {
            opacity: 0;
            transform: translate3d(0, 9px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes svListLineIn {
          from {
            opacity: 0;
            transform: translate3d(10px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .sv-item-brochure {
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 700;
          color: var(--sv-blue-700);
          border: 1.5px solid #8fd3f5;
          background: rgba(240, 249, 255, 0.35);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .sv-item-brochure:hover {
          background: rgba(224, 242, 254, 0.55);
          border-color: #38bdf8;
          transform: translateY(-1px);
        }

        .sv-item-actions {
          margin-top: auto;
          padding-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sv-item-right .sv-item-actions {
          justify-content: flex-end;
        }

        .sv-item-actions .sv-item-brochure {
          margin-top: 0;
        }

        .sv-item-contact {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          border: 1.5px solid var(--sv-blue-600);
          background: linear-gradient(130deg, var(--sv-blue-700), var(--sv-blue-600));
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .sv-item-brochure,
        .sv-item-contact {
          max-width: 100%;
          white-space: normal;
          text-align: center;
          line-height: 1.4;
        }

        .sv-item-contact:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 16px rgba(3, 105, 161, 0.24);
          filter: brightness(1.03);
        }

        .sv-cta-wrap {
          padding: 62px 0 86px;
        }

        .sv-cta {
          border-radius: 18px;
          padding: 34px 28px;
          background: linear-gradient(130deg, var(--sv-blue-950), var(--sv-blue-700) 58%, var(--sv-cyan-400));
          color: #ffffff;
          box-shadow: 0 18px 44px rgba(3, 105, 161, 0.22);
        }

        .sv-cta h3 {
          font-family: var(--sv-font-body);
          font-size: clamp(24px, 4vw, 34px);
          line-height: 1.16;
        }

        .sv-cta p {
          margin-top: 12px;
          max-width: 760px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.88);
          font-size: 15px;
        }

        .sv-cta-actions {
          margin-top: 20px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .sv-btn {
          text-decoration: none;
          border-radius: 9px;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 700;
          transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
        }

        .sv-btn-main {
          color: var(--sv-blue-700);
          background: #ffffff;
        }

        .sv-btn-main:hover { transform: translateY(-1px); }

        .sv-btn-ghost {
          color: #ffffff;
          border: 1.5px solid rgba(255,255,255,0.55);
          background: transparent;
          cursor: pointer;
        }

        .sv-btn-ghost:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.12);
        }

        @media (max-width: 980px) {
          .sv-hero::before,
          .sv-seq-list::after {
            animation: none;
          }

          .sv-hero-content {
            max-width: 100%;
            padding: 0;
          }

          .sv-flow-layout {
            grid-template-columns: 1fr;
          }

          .sv-seq-list {
            gap: 28px;
          }

          .sv-item-shell {
            padding: 14px 0;
          }

          .sv-seq-list::before,
          .sv-seq-list::after {
            left: 26px;
          }

          .sv-item-row {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 12px;
            padding-left: 64px;
            overflow: visible;
          }

          .sv-item-left .sv-item-media,
          .sv-item-left .sv-item-info,
          .sv-item-right .sv-item-media,
          .sv-item-right .sv-item-info {
            grid-column: auto;
            justify-self: stretch;
          }

          .sv-item-mid {
            grid-column: 1;
            grid-row: 1;
            position: absolute;
            left: -64px;
            top: 10px;
            width: 52px;
            height: 52px;
          }

          .sv-item-mid::after,
          .sv-item-mid::before {
            display: none;
          }

          .sv-item-media,
          .sv-item-info {
            max-width: none;
            opacity: 1;
            transform: none;
            transition: none;
          }

          .sv-item-right .sv-item-info,
          .sv-item-right .sv-item-list li {
            text-align: left;
          }

          .sv-item-right .sv-item-copy {
            padding-right: 0;
            padding-left: 12px;
            border-right: 0;
            border-left: 3px solid rgba(56, 189, 248, 0.48);
          }

          .sv-item-right .sv-item-list li {
            padding-right: 0;
            padding-left: 18px;
            transform: none;
          }

          .sv-item-right .sv-item-list li::before {
            right: auto;
            left: 0;
          }

          .sv-item-right .sv-item-actions {
            justify-content: flex-start;
          }

          .sv-item-live .sv-item-info::before,
          .sv-item-live .sv-item-node,
          .sv-item-live .sv-item-node .sv-item-node-core::before,
          .sv-item-live .sv-item-node .sv-item-node-core::after {
            animation: none;
          }

          .sv-item-node,
          .sv-item-node-core,
          .sv-item-node-core::before,
          .sv-item-node-core::after {
            transition: none;
          }

          .sv-item-copy,
          .sv-item-list li {
            opacity: 1;
            transform: none;
            animation: none;
          }

          .sv-item-media img {
            filter: drop-shadow(0 8px 12px rgba(56, 189, 248, 0.2));
          }
        }

        @media (max-width: 1024px), (hover: none) and (pointer: coarse) {
          .sv-hero::before,
          .sv-seq-list::after,
          .sv-item-shell::after,
          .sv-item-live .sv-item-info::before,
          .sv-item-live .sv-item-node,
          .sv-item-live .sv-item-node .sv-item-node-core::before,
          .sv-item-live .sv-item-node .sv-item-node-core::after {
            animation: none;
          }

          .sv-chip,
          .sv-quick-card,
          .sv-item-media,
          .sv-item-media img,
          .sv-item-info,
          .sv-item-copy,
          .sv-item-list li,
          .sv-item-node,
          .sv-item-node-core,
          .sv-item-node-core::before,
          .sv-item-node-core::after,
          .sv-item-node::after,
          .sv-item-mid::after,
          .sv-item-mid::before,
          .sv-item-shell,
          .sv-btn,
          .sv-tab {
            transition: none;
          }

          .sv-item-media img,
          .sv-quick-card:hover,
          .sv-chip:hover,
          .sv-btn:hover {
            transform: none;
          }

          .sv-item-copy,
          .sv-item-list li {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }

        @media (max-width: 720px) {
          .sv-shell,
          .sv-hero-inner {
            width: min(1180px, calc(100% - 32px));
          }

          .sv-hero {
            min-height: 500px;
          }

          .sv-hero-content {
            padding: 0;
          }

          .sv-quick-grid {
            grid-template-columns: 1fr;
          }

          .sv-seq-list {
            gap: 22px;
          }

          .sv-item-shell {
            border-radius: 0;
            padding: 10px 0;
          }

          .sv-seq-list::before,
          .sv-seq-list::after {
            left: 22px;
          }

          .sv-item-row {
            padding-left: 56px;
          }

          .sv-item-mid {
            grid-column: 1;
            grid-row: 1;
            left: -56px;
            top: 8px;
            width: 44px;
            height: 44px;
          }

          .sv-item-node {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }

          .sv-item-media,
          .sv-item-info {
            box-shadow: none;
          }

          .sv-item-media {
            min-height: 258px;
          }

          .sv-item-media img,
          .sv-media-fallback {
            height: 236px;
            max-height: 236px;
          }

          .sv-item-info {
            padding: 16px;
          }

          .sv-item-title {
            font-size: 22px;
          }

          .sv-item-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .sv-item-brochure,
          .sv-item-contact {
            width: 100%;
          }

          .sv-cta {
            padding: 28px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sv-item-media,
          .sv-item-media img,
          .sv-item-info,
          .sv-item-info::before,
          .sv-item-copy,
          .sv-item-list li,
          .sv-item-node,
          .sv-item-node-core,
          .sv-item-node-core::before,
          .sv-item-node-core::after,
          .sv-item-node::after,
          .sv-item-mid::after,
          .sv-item-mid::before,
          .sv-seq-list::after,
          .sv-item-shell::after,
          .sv-chip,
          .sv-quick-card,
          .sv-btn,
          .sv-tab {
            transition: none !important;
            animation: none !important;
          }

          .sv-hero::before {
            animation: none !important;
          }

          .sv-item-copy,
          .sv-item-list li {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <main className="sv-page">
        <section className="sv-hero" style={{ "--sv-hero-image": `url(${heroTextImage})` }}>
          <div className="sv-hero-inner">
            <div className="sv-hero-content">
              <p className="sv-crumb">
                <Link to="/">Home</Link> / Services
              </p>
              <h1 className="sv-title">
                Scientific solutions for <em>Diagnostic and Analytical workflows</em>
              </h1>
              <p className="sv-sub">
                Choose <strong>Diagnostic</strong> for point-of-care devices and kit-led screening,
                or <strong>Analytical</strong> for lab-grade instrumentation workflows.
              </p>
              <div className="sv-chip-row">
                {SERVICE_CATALOG.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`sv-chip${activeCategory === category.id ? " sv-chip-active" : ""}`}
                    onClick={() => setCategory(category.id, true)}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sv-quick">
          <div className="sv-shell">
            <div className="sv-quick-grid">
              {SERVICE_CATALOG.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`sv-quick-card${activeCategory === category.id ? " sv-quick-on" : ""}`}
                  onClick={() => setCategory(category.id, true)}
                >
                  <h3>
                    {category.title}
                  </h3>
                  <p>{category.intro}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="sv-catalog" className="sv-section" ref={catalogRef}>
          <div className="sv-shell">
            <span className="sv-head-label">Product Category</span>
            <h2 className="sv-head-title">
              {activeCategoryData.title} <em>Products</em>
            </h2>
            <div className="sv-head-line" />
            <p className="sv-head-sub">{activeCategoryData.intro}</p>

            <div className="sv-flow-layout">
              <div className="sv-seq-list" ref={seqProgressRef}>
                {activeCategoryData.products.map((product) => (
                  <div
                    key={product.id}
                    className={`sv-item-shell${visibleProducts[product.id] ? " sv-item-shell-live" : ""}`}
                  >
                    <article
                      data-product-id={product.id}
                      className={`sv-item-row sv-item-left${product.hideMedia ? " sv-item-no-media" : ""}${
                        visibleProducts[product.id] ? " sv-item-live" : ""
                      }`}
                    >
                      <div
                        className="sv-item-media"
                      >
                        {!product.imageUrl ? (
                          <div className="sv-media-fallback">Image is coming soon</div>
                        ) : brokenImages[product.id] ? (
                          <div className="sv-media-fallback">Image unavailable</div>
                        ) : (
                          <img
                            src={product.imageUrl}
                            alt={product.alt}
                            loading="lazy"
                            decoding="async"
                            onError={() => markImageError(product.id)}
                          />
                        )}
                      </div>

                      <div className="sv-item-mid" aria-hidden="true">
                        <span className="sv-item-node">
                          <span className="sv-item-node-core" />
                        </span>
                      </div>

                      <div className="sv-item-info">
                        <h3 className="sv-item-title">{product.name}</h3>
                        <p className="sv-item-copy">{product.short}</p>
                        <ul className="sv-item-list">
                          {product.details.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        <div className="sv-item-actions">
                          {product.brochureUrl ? (
                            <a
                              className="sv-item-brochure"
                              href={product.brochureUrl}
                              download
                              target="_blank"
                              rel="noreferrer"
                            >
                              Download Brochure
                            </a>
                          ) : null}
                          <Link to="/contact#contact-form" className="sv-item-contact">
                            Contact us for more information
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sv-cta-wrap">
          <div className="sv-shell">
            <div className="sv-cta">
              <h3>Need help selecting products across all categories?</h3>
              <p>
                Share your use case and expected test volume. We will help map the right products
                and setup across diagnostic and analytical workflows, including test kits.
              </p>
              <div className="sv-cta-actions">
                <Link to="/contact" className="sv-btn sv-btn-main">Talk to Team</Link>
                <button
                  type="button"
                  className="sv-btn sv-btn-ghost"
                  onClick={() =>
                    setCategory(activeCategory === "analytical" ? "diagnostic" : "analytical", true)
                  }
                >
                  {activeCategory === "analytical" ? "View Diagnostic" : "View Analytical"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
