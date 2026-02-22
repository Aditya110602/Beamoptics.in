"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "@/lib/nextRouterCompat";
import { assetSrc } from "@/lib/assetSrc";
import { FlaskConical, HeartPulse, Milk, PawPrint, UtensilsCrossed } from "lucide-react";
import industriesHeroImage from "../assets/images/industries/hero.webp";
import dairyImage from "../assets/images/industries/dairy.webp";
import foodProductsImage from "../assets/images/industries/food-products.webp";
import veterinaryImage from "../assets/images/industries/veterinary.webp";
import pharmaceuticalImage from "../assets/images/industries/pharmaceutical.webp";
import humanDiagnosticsImage from "../assets/images/industries/Human-health.webp";

const industriesHeroImageSrc = assetSrc(industriesHeroImage);
const dairyImageSrc = assetSrc(dairyImage);
const foodProductsImageSrc = assetSrc(foodProductsImage);
const veterinaryImageSrc = assetSrc(veterinaryImage);
const pharmaceuticalImageSrc = assetSrc(pharmaceuticalImage);
const humanDiagnosticsImageSrc = assetSrc(humanDiagnosticsImage);

const INDUSTRIES = [
  {
    id: "dairy",
    title: "Dairy",
    badge: "Export-Grade Milk Integrity",
    image: dairyImageSrc,
    metricLabel: "Dairy",
    intro:
      "India is the world's largest milk producer, yet export barriers remain due to contamination across the supply chain. BEAM's indigenous FTIR platform works as a digital guardian at Bulk Milk Collection Centers (BMCs).",
    points: [
      "Detects 14+ adulterants including urea and palm oil to support export-quality compliance.",
      "Provides automated microbial load analysis to replace subjective manual interpretation.",
      "Converts a manual process into a traceable, data-driven quality control workflow.",
      "Reduces milk wastage, strengthens public health safety, and helps restore global trust in Indian milk.",
    ],
  },
  {
    id: "food-products",
    title: "Food Products",
    badge: "National Food Surveillance",
    image: foodProductsImageSrc,
    metricLabel: "Food",
    intro:
      "Food safety is a national health priority, but conventional testing remains slow and manual. BEAM provides the rapid-testing backbone for large-scale enforcement aligned with FSSAI surveillance and state modernization initiatives.",
    points: [
      "Rapid screening platforms deliver high-accuracy checks for toxins and contaminants.",
      "Supports faster field-to-lab decision cycles for food quality and safety operations.",
      "Strengthens consistency and traceability across distributed testing locations.",
      "Helps ensure what reaches the Indian plate is safe, pure, and quality-assured.",
    ],
  },
  {
    id: "veterinary",
    title: "Veterinary",
    badge: "Animal Health & Farmer Income",
    image: veterinaryImageSrc,
    metricLabel: "Veterinary",
    intro:
      "Bovine mastitis causes around $50 billion in global annual losses and affects more than 30% of India's 30 crore cattle. BEAM replaces subjective testing with a Somatic Cell Count workflow that is up to 10x more convenient.",
    points: [
      "Enables early disease detection before spread impacts herd productivity.",
      "Delivers practical, field-ready results that support faster treatment decisions.",
      "Supports mobile-ready reporting to improve actionability for farmer workflows.",
      "Directly aligns with the Rashtriya Gokul Mission to improve rural income and dairy health outcomes.",
    ],
  },
  {
    id: "pharmaceutical",
    title: "Pharmaceutical",
    badge: "Solvent Purity & Patient Safety",
    image: pharmaceuticalImageSrc,
    metricLabel: "Pharma",
    intro:
      "Toxic solvent adulteration risk, including DEG contamination in cough syrups, threatens patient safety and industry trust. BEAM's precision screening enables rapid and reliable pre-release quality checks for syrups and solvents.",
    points: [
      "Detects toxic impurity risk before products move to market.",
      "Supports faster quality release decisions with standardized testing output.",
      "Strengthens QA control for high-consequence pharmaceutical workflows.",
      "Provides a critical defense layer for CDSCO and state drug-control lab ecosystems.",
    ],
  },
  {
    id: "public-health",
    title: "Public Health",
    badge: "Primary Healthcare Screening at Scale",
    image: humanDiagnosticsImageSrc,
    metricLabel: "Public Health",
    intro:
      "Anaemia and diabetes require accessible, high-volume grassroots screening. BEAM's portable RedCheck platform is designed for schools, anganwadis, and PHCs to bring hospital-grade performance into field deployment.",
    points: [
      "Supports long-term glucose monitoring and rapid hemoglobin estimation workflows.",
      "Portable architecture is designed for high-throughput frontline screening programs.",
      "Enables consistent screening quality in remote and decentralized care environments.",
      "Directly aligned with the Anaemia Mukt Bharat mission for national scale health impact.",
    ],
  },
];

const INDUSTRY_MAP = Object.fromEntries(INDUSTRIES.map((item) => [item.id, item]));
const INDUSTRY_ICON_MAP = {
  dairy: Milk,
  "food-products": UtensilsCrossed,
  veterinary: PawPrint,
  pharmaceutical: FlaskConical,
  "public-health": HeartPulse,
};

function normalizeIndustryId(value) {
  const key = (value || "").trim().toLowerCase();
  if (!key) return "";
  if (key === "human-diagnostics" || key === "human-dx" || key === "health") return "public-health";
  if (key === "public-healthcare") return "public-health";
  return key;
}

export default function IndustriesPage() {
  const { industryId } = useParams();
  const navigate = useNavigate();
  const sectionRefs = useRef({});
  const [activeId, setActiveId] = useState("dairy");
  const [stickyTop, setStickyTop] = useState(104);

  const scrollToSection = useCallback((id, preferredBehavior = "smooth") => {
    const node = sectionRefs.current[id];
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = Math.max(node.getBoundingClientRect().top + window.scrollY - stickyTop - 10, 0);
    window.scrollTo({
      top,
      left: 0,
      behavior: reduceMotion ? "auto" : preferredBehavior,
    });
  }, [stickyTop]);

  const scrollToSectionWithRetry = useCallback((id, preferredBehavior = "smooth") => {
    scrollToSection(id, preferredBehavior);
    window.setTimeout(() => scrollToSection(id, "auto"), 120);
    window.setTimeout(() => scrollToSection(id, "auto"), 280);
  }, [scrollToSection]);

  useEffect(() => {
    const updateStickyOffset = () => {
      const header = document.querySelector("header.sticky");
      const headerHeight = header?.getBoundingClientRect().height || 86;
      setStickyTop(Math.round(headerHeight + 16));
    };

    updateStickyOffset();
    window.addEventListener("resize", updateStickyOffset);
    return () => window.removeEventListener("resize", updateStickyOffset);
  }, []);

  useEffect(() => {
    const parsed = normalizeIndustryId(industryId);
    if (industryId && !INDUSTRY_MAP[parsed]) {
      navigate("/industries/dairy", { replace: true, scroll: false });
      return;
    }

    const next = INDUSTRY_MAP[parsed] ? parsed : "dairy";
    setActiveId(next);

    if (!industryId) return;
    window.requestAnimationFrame(() => scrollToSectionWithRetry(next, "auto"));
  }, [industryId, navigate, scrollToSectionWithRetry]);

  useEffect(() => {
    const nodes = INDUSTRIES.map((item) => sectionRefs.current[item.id]).filter(Boolean);
    if (!nodes.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.getAttribute("data-industry-id");
        if (id && INDUSTRY_MAP[id]) {
          setActiveId((prev) => (prev === id ? prev : id));
        }
      },
      {
        threshold: 0.45,
        rootMargin: "-16% 0px -36% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleOptionClick = (id) => {
    if (!INDUSTRY_MAP[id]) return;
    setActiveId(id);
    navigate(`/industries/${id}`, { scroll: false });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.requestAnimationFrame(() =>
      scrollToSectionWithRetry(id, reduceMotion ? "auto" : "smooth")
    );
  };

  return (
    <>
      <style>{`
        :root {
          --in-blue-900: #071d37;
          --in-blue-700: #0a4f83;
          --in-blue-600: #0a6eb0;
          --in-cyan-500: #11b5df;
          --in-cyan-400: #4fd8ff;
          --in-amber-400: #fbbf24;
          --in-slate-700: #334155;
          --in-slate-600: #475569;
          --in-slate-200: #e2e8f0;
          --in-bg: #eef7ff;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .in-page {
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 9% 14%, rgba(94, 228, 255, 0.2), rgba(94, 228, 255, 0) 34%),
            radial-gradient(circle at 94% 90%, rgba(10, 110, 176, 0.18), rgba(10, 110, 176, 0) 38%),
            linear-gradient(180deg, #f8fcff 0%, var(--in-bg) 100%);
          color: var(--in-slate-700);
          font-family: "Manrope", sans-serif;
        }
        .in-page::before,
        .in-page::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 420px;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(36px);
          opacity: 0.35;
          pointer-events: none;
          animation: inFloat 14s ease-in-out infinite alternate;
        }
        .in-page::before {
          top: 340px;
          right: -160px;
          background: radial-gradient(circle, rgba(79, 216, 255, 0.52), rgba(79, 216, 255, 0));
        }
        .in-page::after {
          top: 940px;
          left: -180px;
          background: radial-gradient(circle, rgba(10, 110, 176, 0.34), rgba(10, 110, 176, 0));
          animation-delay: 1.2s;
        }

        .in-shell {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .in-hero {
          position: relative;
          overflow: hidden;
          min-height: 640px;
          display: flex;
          align-items: center;
          background-image:
            linear-gradient(122deg, rgba(4, 18, 36, 0.92) 0%, rgba(9, 63, 108, 0.84) 54%, rgba(8, 132, 168, 0.72) 100%),
            url('${industriesHeroImageSrc}');
          background-size: cover;
          background-position: center;
        }
        .in-hero::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          right: clamp(-110px, -4vw, -40px);
          top: clamp(20px, 7vw, 70px);
          background: radial-gradient(circle, rgba(251,191,36,.34), rgba(251,191,36,0) 70%);
          pointer-events: none;
        }

        .in-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          opacity: 0.2;
          animation: inGrid 24s linear infinite;
          pointer-events: none;
        }

        @keyframes inGrid {
          from { background-position: 0 0; }
          to { background-position: 36px 36px; }
        }
        @keyframes inFloat {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-40px) translateX(20px); }
        }

        .in-hero-inner {
          position: relative;
          z-index: 1;
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 92px 0 84px;
        }

        .in-crumb {
          color: rgba(255,255,255,.75);
          font-size: 13px;
          margin-bottom: 16px;
        }
        .in-crumb a { color: rgba(255,255,255,.75); text-decoration: none; }
        .in-crumb a:hover { color: #fff; }

        .in-title {
          font-family: "Manrope", sans-serif;
          color: #fff;
          font-size: clamp(38px, 6vw, 72px);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.02em;
          max-width: 900px;
          text-shadow: 0 12px 30px rgba(2, 6, 23, 0.24);
        }
        .in-title em {
          color: var(--in-cyan-400);
          font-style: normal;
        }

        .in-sub {
          margin-top: 16px;
          max-width: 780px;
          color: rgba(255,255,255,.9);
          line-height: 1.72;
          font-size: 16px;
        }

        .in-hero-pills {
          margin-top: 22px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .in-hero-pill {
          border: 1px solid rgba(255,255,255,.38);
          background: rgba(2, 12, 28, 0.44);
          border-radius: 999px;
          color: #e9f8ff;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          backdrop-filter: blur(3px);
        }

        .in-main {
          padding: 62px 0 92px;
        }

        .in-layout {
          display: grid;
          grid-template-columns: 294px 1fr;
          gap: 28px;
          align-items: start;
        }

        .in-side {
          position: sticky;
          top: var(--in-sticky-top, 104px);
          border: 1px solid rgba(186,230,253,.9);
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.95), rgba(240,249,255,.92)),
            radial-gradient(circle at 90% 0%, rgba(79, 216, 255, 0.18), rgba(79, 216, 255, 0) 40%);
          box-shadow: 0 18px 32px rgba(2, 22, 44, 0.12);
          backdrop-filter: blur(5px);
          overflow: hidden;
        }

        .in-side-head {
          padding: 14px 16px;
          border-bottom: 1px solid #e2e8f0;
          background: rgba(240, 249, 255, 0.9);
          color: #0f3358;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .in-option {
          width: 100%;
          border: none;
          border-bottom: 1px solid #eef2f7;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          text-align: left;
          color: #4a647d;
          font-size: 15px;
          cursor: pointer;
          transition: background .22s ease, color .22s ease, padding-left .22s ease;
        }
        .in-option:last-child { border-bottom: none; }
        .in-option:hover {
          background: #edf9ff;
          color: #0f649f;
          padding-left: 17px;
        }
        .in-option.in-on {
          background: linear-gradient(90deg, #dff2ff, #ebfcff);
          color: #0f517f;
          font-weight: 700;
        }
        .in-option-icon {
          width: 30px;
          height: 30px;
          display: inline-grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(10,110,176,.12);
          color: #0a6eb0;
          flex-shrink: 0;
        }

        .in-option-icon svg {
          width: 18px;
          height: 18px;
          stroke-width: 2.25;
        }

        .in-content {
          display: grid;
          gap: 22px;
        }

        .in-section {
          position: relative;
          overflow: hidden;
          scroll-margin-top: calc(var(--in-sticky-top, 104px) + 8px);
          border: 1px solid rgba(10,110,176,.24);
          border-radius: 24px;
          padding: 22px;
          background:
            linear-gradient(160deg, rgba(255,255,255,.96), rgba(244,251,255,.94)),
            radial-gradient(circle at 100% 0%, rgba(79,216,255,.16), rgba(79,216,255,0) 42%);
          box-shadow: 0 16px 32px rgba(6,24,46,.09);
          transition: border-color .24s ease, box-shadow .24s ease, transform .24s ease;
        }
        .in-section::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #0a6eb0, #11b5df, #fbbf24);
        }
        .in-section.in-active {
          border-color: rgba(17,181,223,.56);
          box-shadow: 0 24px 38px rgba(4,30,60,.14);
          transform: translateY(-2px);
        }
        .in-section:hover {
          transform: translateY(-2px);
        }

        .in-card {
          display: grid;
          grid-template-columns: minmax(0, .96fr) minmax(0, 1.04fr);
          gap: 18px;
          align-items: stretch;
        }
        .in-card.in-rev .in-media { order: 2; }
        .in-card.in-rev .in-copy  { order: 1; }

        .in-media {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(7,29,55,.22);
          min-height: 304px;
          box-shadow: 0 16px 30px rgba(3,18,40,.2);
        }
        .in-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(2,6,23,0) 56%, rgba(2,6,23,.58) 100%),
            radial-gradient(circle at 90% 10%, rgba(255,255,255,.22), rgba(255,255,255,0) 34%);
          pointer-events: none;
        }
        .in-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }
        .in-section:hover .in-media img { transform: scale(1.03); }

        .in-media-badge {
          position: absolute;
          left: 12px;
          top: 12px;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.45);
          background: rgba(5, 23, 44, .72);
          color: #fff;
          padding: 6px 10px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
        }


        .in-copy {
          border: 1px solid rgba(10,110,176,.24);
          border-radius: 18px;
          background:
            linear-gradient(180deg, #ffffff, #f8fcff),
            radial-gradient(circle at 0% 0%, rgba(79,216,255,.12), rgba(79,216,255,0) 42%);
          padding: 18px 18px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8);
        }

        .in-copy-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .in-kicker {
          color: #0f649f;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .11em;
          text-transform: uppercase;
        }

        .in-copy-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(17,181,223,.5);
          background: rgba(17,181,223,.12);
          color: #0b7098;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 5px 9px;
          flex-shrink: 0;
        }
        .in-h3 {
          margin-top: 8px;
          font-family: "Manrope", sans-serif;
          font-size: clamp(26px, 2.4vw, 36px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -.01em;
          color: var(--in-blue-900);
        }
        .in-intro {
          margin-top: 10px;
          color: #475569;
          line-height: 1.7;
          font-size: 15px;
        }

        .in-list {
          margin-top: 14px;
          padding-left: 0;
          list-style: none;
          display: grid;
          gap: 8px;
          color: #334155;
          font-size: 14px;
          line-height: 1.62;
        }

        .in-list li {
          position: relative;
          padding-left: 18px;
        }

        .in-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: .54em;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(180deg, #11b5df, #0a6eb0);
          box-shadow: 0 0 0 3px rgba(17,181,223,.15);
        }

        @media (max-width: 1120px) {
          .in-layout {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .in-side {
            position: static;
          }
        }

        @media (max-width: 980px) {
          .in-layout {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .in-card {
            grid-template-columns: 1fr;
          }
          .in-card.in-rev .in-media,
          .in-card.in-rev .in-copy {
            order: initial;
          }
          .in-media {
            min-height: 240px;
          }
        }

        @media (max-width: 720px) {
          .in-shell,
          .in-hero-inner {
            width: min(1220px, calc(100% - 30px));
          }
          .in-hero {
            min-height: 540px;
          }
          .in-hero-inner {
            padding: 78px 0 68px;
          }
          .in-title {
            font-size: clamp(32px, 9vw, 50px);
          }
          .in-main {
            padding: 50px 0 76px;
          }
          .in-section {
            border-radius: 20px;
            padding: 14px;
          }
          .in-copy {
            padding: 14px 13px 13px;
          }
          .in-h3 {
            font-size: clamp(24px, 8vw, 34px);
          }
          .in-hero-pills {
            gap: 8px;
          }
          .in-hero-pill {
            font-size: 10.5px;
            padding: 7px 10px;
          }
        }

        @media (hover: none) and (pointer: coarse) {
          .in-page::before,
          .in-page::after,
          .in-hero::after {
            animation: none;
          }

          .in-page::before,
          .in-page::after {
            filter: none;
            opacity: 0.2;
          }

          .in-hero-pill,
          .in-side {
            backdrop-filter: none;
          }

          .in-option,
          .in-section,
          .in-media img {
            transition: none;
          }

          .in-option:hover,
          .in-section:hover {
            transform: none;
          }

          .in-option:hover {
            padding-left: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .in-page::before,
          .in-page::after,
          .in-hero::after,
          .in-media img {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <main className="in-page" style={{ "--in-sticky-top": `${stickyTop}px` }}>
        <section className="in-hero">
          <div className="in-hero-inner">
            <p className="in-crumb">
              <Link to="/">Home</Link> / Industries
            </p>
            <h1 className="in-title">
              Industries We <em>Empower</em>
            </h1>
            <p className="in-sub">
              Driving India&apos;s Deep-Tech Revolution through Precision Optics and
              mission-ready diagnostic intelligence.
            </p>
            <div className="in-hero-pills">
              {INDUSTRIES.map((industry) => (
                <span key={industry.id} className="in-hero-pill">
                  {industry.metricLabel}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="in-main">
          <div className="in-shell">
            <div className="in-layout">
              <aside className="in-side">
                <div className="in-side-head">Industries We Empower</div>
                {INDUSTRIES.map((industry) => {
                  const OptionIcon = INDUSTRY_ICON_MAP[industry.id] || HeartPulse;
                  return (
                    <button
                      key={industry.id}
                      type="button"
                      className={`in-option${activeId === industry.id ? " in-on" : ""}`}
                      onClick={() => handleOptionClick(industry.id)}
                    >
                      <span className="in-option-icon">
                        <OptionIcon />
                      </span>
                      <span>{industry.title}</span>
                    </button>
                  );
                })}
              </aside>

              <div className="in-content">
                {INDUSTRIES.map((industry, idx) => (
                  <section
                    key={industry.id}
                    id={`in-${industry.id}`}
                    data-industry-id={industry.id}
                    ref={(node) => {
                      sectionRefs.current[industry.id] = node;
                    }}
                    className={`in-section${activeId === industry.id ? " in-active" : ""}`}
                  >
                    <div className={`in-card${idx % 2 === 1 ? " in-rev" : ""}`}>
                      <div className="in-media">
                        <img src={industry.image} alt={industry.title} loading="lazy" decoding="async" />
                        <span className="in-media-badge">{industry.badge}</span>
                      </div>

                      <article className="in-copy">
                        <div>
                          <div className="in-copy-top">
                            <p className="in-kicker">Industry Focus</p>
                            <span className="in-copy-chip">{industry.metricLabel}</span>
                          </div>
                          <h2 className="in-h3">{industry.title}</h2>
                          <p className="in-intro">{industry.intro}</p>
                          <ul className="in-list">
                            {industry.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </div>
                  </section>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
