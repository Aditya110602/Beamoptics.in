"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/nextRouterCompat";
import { assetSrc } from "@/lib/assetSrc";
import homeHeroImage from "../assets/images/home/hero-science.webp";
import ctaLabTeamImage from "../assets/images/home/cta-lab-team.webp";
import expertisePartnershipsImage from "../assets/images/home/expertise-partnerships.webp";
import expertiseTechnologyImage from "../assets/images/home/expertise-technology.webp";
import expertiseTeamImage from "../assets/images/home/expertise-team.webp";
import publicHealthScreeningImage from "../assets/images/home/hero-science1.webp";
import dairyIndustryImage from "../assets/images/industries/dairy.webp";
import veterinaryIndustryImage from "../assets/images/industries/veterinary.webp";
import pharmaIndustryImage from "../assets/images/industries/pharmaceutical.webp";
import edibleOilIndustryImage from "../assets/images/industries/edible-premium-oils.png";
import diagnosticFtirMilkCutoutImage from "../assets/images/services/diagnostic/FTIR Milk Analyzer-cutout.webp";
import diagnosticFtirPgCutoutImage from "../assets/images/services/diagnostic/ftir-pg-glycerin-machine-cutout.webp";
import analyticsHbCutoutImage from "../assets/images/services/analytics/HB-machine-cutout.webp";
import analyticsHba1cCutoutImage from "../assets/images/services/analytics/HBA1c-Machine-cutout.webp";

const HOME_HERO_RESET_EVENT = "bo:home-hero-reset";
const homeHeroImageSrc = assetSrc(homeHeroImage);
const ctaLabTeamImageSrc = assetSrc(ctaLabTeamImage);
const expertisePartnershipsImageSrc = assetSrc(expertisePartnershipsImage);
const expertiseTechnologyImageSrc = assetSrc(expertiseTechnologyImage);
const expertiseTeamImageSrc = assetSrc(expertiseTeamImage);
const publicHealthScreeningImageSrc = assetSrc(publicHealthScreeningImage);
const dairyIndustryImageSrc = assetSrc(dairyIndustryImage);
const veterinaryIndustryImageSrc = assetSrc(veterinaryIndustryImage);
const pharmaIndustryImageSrc = assetSrc(pharmaIndustryImage);
const edibleOilIndustryImageSrc = assetSrc(edibleOilIndustryImage);
const diagnosticFtirMilkCutoutImageSrc = assetSrc(diagnosticFtirMilkCutoutImage);
const diagnosticFtirPgCutoutImageSrc = assetSrc(diagnosticFtirPgCutoutImage);
const analyticsHbCutoutImageSrc = assetSrc(analyticsHbCutoutImage);
const analyticsHba1cCutoutImageSrc = assetSrc(analyticsHba1cCutoutImage);

const HERO_SLIDES = [
  {
    image: diagnosticFtirMilkCutoutImageSrc,
    alt: "FTIR Milk Analyzer",
    name: "FTIR Milk Analyzer",
    tag: "Milk quality and adulteration checks",
    scale: 1.08,
  },
  {
    image: diagnosticFtirPgCutoutImageSrc,
    alt: "FTIR PG / Glycerin Analyzer",
    name: "FTIR PG / Glycerin Analyzer",
    tag: "Rapid toxic impurity risk screening",
    scale: 1.1,
  },
  {
    image: analyticsHbCutoutImageSrc,
    alt: "RedCheck Hb",
    name: "RedCheck Hb",
    tag: "Portable anaemia screening support",
    scale: 1.04,
  },
  {
    image: analyticsHba1cCutoutImageSrc,
    alt: "RedCheck HbA1c",
    name: "RedCheck HbA1c",
    tag: "Average sugar monitoring for diabetes care",
    scale: 1.2,
  },
];

const CORE_PILLARS = [
  {
    title: "Advanced Photonics and Spectroscopy",
    copy: "Core capability across FTIR, NIR, and UV-VIS technologies for accurate, non-destructive analytical workflows.",
  },
  {
    title: "Precision Optical System Design",
    copy: "In-house optical architecture for stable light handling, repeatable signal quality, and field-ready performance.",
  },
  {
    title: "Embedded Electronics and Sensor Integration",
    copy: "Integrated electronics, sensing layers, and controls engineered for reliable deployment in real operating conditions.",
  },
  {
    title: "Multi-Spectral Analysis",
    copy: "Multi-channel spectral analytics designed to improve detection confidence across complex liquid quality signatures.",
  },
  {
    title: "Sensor Fusion and AI Analytics",
    copy: "Predictive AI and sensor fusion pipelines that transform raw spectra into practical, decision-ready intelligence.",
  },
];

const MISSION_VISION = [
  {
    title: "Our Mission",
    copy: "To democratize advanced analytical science by developing affordable, non-destructive, and AI-driven instrumentation. We are committed to securing the global supply chain through relentless innovation in FTIR spectroscopy and sensor fusion, ensuring purity and quality from the farm to the consumer.",
  },
  {
    title: "Our Vision",
    copy: "To become a leading global provider of precision optical diagnostic systems that improve safety, quality, and accessibility. We envision a future where fast, non-destructive, and data-driven quality assurance is accessible across food, healthcare, and industrial supply chains.",
  },
];

const INDUSTRIES_IMPACT = [
  {
    title: "Healthcare and Diagnostics",
    short: "Portable screening and institutional diagnostics",
    copy: "Supports anaemia and preventive diagnostics programs for primary care centers, district hospitals, and institutional healthcare.",
    image: publicHealthScreeningImageSrc,
    chip: "Health Diagnostics",
    imagePosition: "center 36%",
  },
  {
    title: "Pharmaceuticals and Drug Safety",
    short: "Rapid impurity and toxicity risk checks",
    copy: "FTIR-enabled analytical workflows for impurity screening and quality validation in pharma and formulation environments.",
    image: pharmaIndustryImageSrc,
    chip: "Drug Safety",
    imagePosition: "center",
  },
  {
    title: "Food and Dairy Industry",
    short: "Milk and food adulteration detection",
    copy: "Protects consumer safety through rapid adulteration detection and quality checks across dairy and food processing workflows.",
    image: dairyIndustryImageSrc,
    chip: "Food Quality",
    imagePosition: "center",
  },
  {
    title: "Edible and Premium Oils",
    short: "Purity and adulteration screening",
    copy: "Delivers fast spectral analysis for edible and premium oils to strengthen product integrity and market confidence.",
    image: edibleOilIndustryImageSrc,
    chip: "Oil Purity",
    imagePosition: "center 55%",
  },
  {
    title: "Industrial Quality Control",
    short: "Process liquid validation and compliance",
    copy: "Enables consistent liquid analysis for production quality assurance, incoming checks, and process-level verification.",
    image: homeHeroImageSrc,
    chip: "Industrial QA",
    imagePosition: "center",
  },
  {
    title: "Research and Laboratories",
    short: "Analytical studies and method development",
    copy: "Supports labs and R&D teams with spectral datasets and rapid test workflows for method development and validation.",
    image: veterinaryIndustryImageSrc,
    chip: "Lab Research",
    imagePosition: "center",
  },
];

const WHY_BEAM = [
  {
    title: "Optics and Diagnostics Integration",
    copy: "Deep integration of precision optics, diagnostics engineering, and analytics for stable, high-confidence field outcomes.",
  },
  {
    title: "Indigenous Technology Development",
    copy: "Designed and developed in India with strong in-house optics, spectroscopy, and embedded electronics capabilities.",
  },
  {
    title: "Government Program Alignment",
    copy: "Aligned with national healthcare and food safety initiatives, including district hospitals and institutional lab deployments.",
  },
  {
    title: "Single-Platform Multi-Industry Reach",
    copy: "A modular analytical platform adaptable across healthcare, pharma, food, oils, industrial quality, and research applications.",
  },
];

const DEPLOYMENT_OUTCOMES = [
  {
    title: "Designed and Built in India",
    copy: "Engineering and manufacturing approach focused on reliability, field robustness, and long-term serviceability.",
  },
  {
    title: "Modular and Calibration-Stable Architecture",
    copy: "Precision optics alignment with modular product architecture to maintain long-term calibration stability.",
  },
  {
    title: "Leadership and Team",
    copy: "Led by a multidisciplinary team across optics, spectroscopy, diagnostics, electronics manufacturing, and product development.",
  },
];

const MISSION_PRIORITIES = [
  {
    title: "Affordable Scientific Access",
    copy: "Democratize advanced analytical science through affordable instrumentation for real deployment needs.",
  },
  {
    title: "Non-Destructive Analysis",
    copy: "Enable non-destructive testing workflows that preserve sample integrity while improving quality control confidence.",
  },
  {
    title: "AI-Driven Sensor Fusion",
    copy: "Combine FTIR spectroscopy and sensor fusion with predictive AI for faster and more reliable analytical interpretation.",
  },
  {
    title: "Farm-to-Consumer Assurance",
    copy: "Strengthen global supply-chain purity and quality assurance from origin to final consumer.",
  },
];

const EXPERTISE_CARDS = [
  {
    title: "Exclusive Partnerships",
    copy: "We have forged exclusive, deep market, and distribution partnerships, ensuring that our solutions reach far and wide, giving us a unique advantage in the market.",
    image: expertisePartnershipsImageSrc,
    alt: "Exclusive partnerships",
    chip: "Partnerships",
    accent: "#2287d6",
    accentSoft: "rgba(34, 135, 214, 0.24)",
    chipFrom: "rgba(6, 53, 88, 0.9)",
    chipTo: "rgba(33, 134, 214, 0.92)",
  },
  {
    title: "Cutting-Edge Technology",
    copy: "BeamOptics develops FTIR-based optical instrumentation for reliable, repeatable analysis across healthcare, dairy quality, food safety, and pharmaceutical screening workflows.",
    image: expertiseTechnologyImageSrc,
    alt: "Cutting-edge technology",
    chip: "FTIR Innovation",
    accent: "#1aaece",
    accentSoft: "rgba(26, 174, 206, 0.24)",
    chipFrom: "rgba(4, 62, 88, 0.9)",
    chipTo: "rgba(24, 164, 196, 0.92)",
  },
  {
    title: "Exceptional Team",
    copy: "Our team has experts working in instrumentation and analytics for over a decade, bringing deep expertise and ensuring top-notch innovation and quality.",
    image: expertiseTeamImageSrc,
    alt: "Exceptional team",
    chip: "Expert Team",
    accent: "#2b8dc2",
    accentSoft: "rgba(43, 141, 194, 0.24)",
    chipFrom: "rgba(16, 59, 90, 0.9)",
    chipTo: "rgba(51, 127, 184, 0.92)",
  },
];

function useScrollReveal(threshold = 0.16) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(node);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, y = 18 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 620ms cubic-bezier(0.22,0.61,0.36,1) ${delay}ms, transform 620ms cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [brokenHeroSlides, setBrokenHeroSlides] = useState({});
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const activeHeroSlides = useMemo(
    () => HERO_SLIDES.filter((slide) => !brokenHeroSlides[slide.alt]),
    [brokenHeroSlides]
  );

  const hasHeroSlides = activeHeroSlides.length > 0;
  const activeHeroSlideIndex = hasHeroSlides ? activeHeroIndex % activeHeroSlides.length : 0;
  const currentHeroSlide = hasHeroSlides ? activeHeroSlides[activeHeroSlideIndex] : null;

  useEffect(() => {
    if (activeHeroSlides.length <= 1) {
      setActiveHeroIndex(0);
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    setActiveHeroIndex((prev) => prev % activeHeroSlides.length);
    const timer = window.setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % activeHeroSlides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [activeHeroSlides.length]);

  useEffect(() => {
    if (!hasHeroSlides) return;

    const shouldPreload =
      !window.matchMedia("(max-width: 900px)").matches && !navigator.connection?.saveData;
    if (!shouldPreload) return;

    const nextSlideIndex = (activeHeroSlideIndex + 1) % activeHeroSlides.length;
    const preloadTargets = [activeHeroSlides[activeHeroSlideIndex], activeHeroSlides[nextSlideIndex]];

    preloadTargets.forEach((slide) => {
      if (!slide?.image) return;
      const img = new Image();
      img.decoding = "async";
      img.src = slide.image;
    });
  }, [activeHeroSlideIndex, activeHeroSlides, hasHeroSlides]);

  useEffect(() => {
    const resetHeroToPrimary = () => setActiveHeroIndex(0);
    window.addEventListener(HOME_HERO_RESET_EVENT, resetHeroToPrimary);
    return () => window.removeEventListener(HOME_HERO_RESET_EVENT, resetHeroToPrimary);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --hm-ink: #072746;
          --hm-blue: #216ea8;
          --hm-cyan: #2b9ebf;
          --hm-deep: #091f3c;
          --hm-body: #3d5871;
          --hm-border: #c6e4f9;
          --hm-soft: #f2f9ff;
          --hm-font-body: "Manrope", "Segoe UI", sans-serif;
          --hm-font-display: "Manrope", "Segoe UI", sans-serif;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .hm-page {
          font-family: var(--hm-font-body);
          color: var(--hm-body);
          overflow-x: hidden;
          background:
            radial-gradient(circle at 8% 12%, rgba(173, 232, 255, 0.30), rgba(173, 232, 255, 0) 34%),
            radial-gradient(circle at 94% 20%, rgba(125, 211, 252, 0.24), rgba(125, 211, 252, 0) 34%),
            linear-gradient(180deg, #f9fdff 0%, #f4faff 52%, #f7fcff 100%);
        }

        .hm-shell {
          width: min(1160px, calc(100% - 44px));
          margin: 0 auto;
        }

        .hm-shell-compact {
          width: min(940px, calc(100% - 64px));
        }

        .hm-section {
          padding: 76px 0;
        }

        .hm-headline {
          margin: 0;
          font-family: var(--hm-font-display);
          color: var(--hm-ink);
          font-size: clamp(28px, 4.2vw, 50px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.01em;
          text-wrap: balance;
          white-space: normal;
          text-align: center;
        }

        .hm-headline em {
          color: #56c8f7;
          font-style: normal;
          font-weight: inherit;
        }

        .hm-headline-one-line {
          white-space: nowrap;
        }

        .hm-copy {
          margin-top: 14px;
          max-width: 860px;
          font-size: 15px;
          line-height: 1.82;
          color: #40566f;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        .hm-hero {
          position: relative;
          overflow: hidden;
          min-height: 680px;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        .hm-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          z-index: -4;
        }

        .hm-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(122deg, rgba(8, 30, 56, 0.88) 0%, rgba(11, 65, 110, 0.74) 56%, rgba(20, 124, 156, 0.58) 100%);
          z-index: -3;
        }

        .hm-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.14) 1px, transparent 1px);
          background-size: 36px 36px;
          animation: hmGrid 22s linear infinite;
          opacity: 0.16;
          z-index: -2;
          pointer-events: none;
        }

        .hm-hero-orb {
          position: absolute;
          border-radius: 50%;
          z-index: -1;
          pointer-events: none;
        }

        .hm-hero-orb-1 {
          width: 520px;
          height: 520px;
          right: -90px;
          top: -140px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.18), rgba(56, 189, 248, 0) 68%);
          animation: hmOrbA 15s ease-in-out infinite;
        }

        .hm-hero-orb-2 {
          width: 360px;
          height: 360px;
          left: 8%;
          bottom: -80px;
          background: radial-gradient(circle, rgba(16, 185, 216, 0.16), rgba(16, 185, 216, 0) 68%);
          animation: hmOrbB 17s ease-in-out infinite;
        }

        @keyframes hmGrid {
          from { background-position: 0 0; }
          to { background-position: 36px 36px; }
        }

        @keyframes hmOrbA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-12px, 10px, 0) scale(1.03); }
        }

        @keyframes hmOrbB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, -8px, 0) scale(1.02); }
        }

        .hm-hero-grid {
          display: grid;
          grid-template-columns: 1.16fr 0.84fr;
          gap: 22px;
          align-items: center;
          padding: 86px 0 74px;
          position: relative;
          z-index: 1;
        }

        .hm-hero-copy-block {
          max-width: 760px;
          padding: 0;
          border: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
        }

        .hm-hero h1 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #ffffff;
          font-size: clamp(38px, 5.1vw, 62px);
          font-weight: 600;
          line-height: 1.04;
          letter-spacing: -0.02em;
          text-wrap: pretty;
          text-shadow: 0 8px 18px rgba(2, 6, 23, 0.2);
          text-align: left;
          max-width: 730px;
        }

        .hm-hero-line {
          display: block;
          white-space: normal;
        }

        .hm-hero-line-accent {
          white-space: nowrap;
        }

        .hm-hero h1 em {
          color: transparent;
          background: linear-gradient(90deg, #8ceaff 0%, #4fcfff 52%, #26aaf4 100%);
          -webkit-background-clip: text;
          background-clip: text;
          font-style: normal;
          font-weight: 600;
          text-shadow: 0 6px 14px rgba(37, 180, 243, 0.28);
        }

        .hm-hero h2,
        .hm-hero p {
          max-width: 660px;
          font-family: var(--hm-font-body);
          color: #ffffffde;
          font-size: clamp(17px, 1.8vw, 24px);
          font-weight: 500;
          line-height: 1.56;
          letter-spacing: 0;
          text-align: left;
          margin-left: 0;
          margin-right: 0;
        }

        .hm-hero h2 {
          margin: 12px 0 0;
        }

        .hm-hero p {
          margin: 12px 0 0;
        }

        .hm-hero-media {
          position: relative;
          border-radius: 0;
          border: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          padding: 0;
          min-height: 0;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hm-hero-stage {
          position: relative;
          width: min(100%, 500px);
          height: clamp(260px, 33vw, 360px);
          min-height: 0;
          border-radius: 0;
          background: transparent;
          border: 0;
          overflow: visible;
        }

        .hm-hero-device {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 18px 24px rgba(2, 6, 23, 0.34));
          opacity: 0;
          transform: translate3d(0, 10px, 0) scale(calc(var(--hm-device-scale, 1) * 0.98));
          transition: opacity 520ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .hm-hero-device-on {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(var(--hm-device-scale, 1));
        }

        .hm-hero-meta {
          margin-top: 14px;
          text-align: center;
        }

        .hm-hero-meta strong {
          color: #ffffff;
          display: block;
          font-family: var(--hm-font-display);
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
        }

        .hm-hero-meta span {
          margin-top: 5px;
          display: block;
          color: rgba(231, 247, 255, 0.96);
          font-size: 13px;
          line-height: 1.55;
        }

        .hm-dot-row {
          margin-top: 14px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .hm-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: 0;
          background: rgba(255, 255, 255, 0.42);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hm-dot.hm-dot-on {
          background: #67e8f9;
          transform: scale(1.2);
        }

        .hm-identity {
          position: relative;
        }

        .hm-purpose {
          position: relative;
          padding-top: 42px;
          overflow: hidden;
        }

        .hm-purpose::before {
          content: "";
          position: absolute;
          width: 360px;
          height: 360px;
          right: -120px;
          top: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(83, 215, 255, 0.24), rgba(83, 215, 255, 0));
          pointer-events: none;
          animation: hmPurposeDrift 12s ease-in-out infinite;
        }

        .hm-purpose-head {
          text-align: center;
          max-width: 1040px;
          margin: 0 auto;
        }

        .hm-purpose .hm-headline {
          margin-top: 0;
          font-size: clamp(34px, 4.2vw, 56px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.015em;
          text-align: center;
        }

        .hm-purpose .hm-copy {
          margin-top: 12px;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.76;
          color: #4a647d;
          max-width: 900px;
        }

        .hm-purpose-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          grid-auto-rows: 1fr;
          align-items: stretch;
        }

        .hm-purpose-grid > div {
          height: 100%;
        }

        .hm-purpose-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid #b7dcf5;
          border-radius: 20px;
          background:
            radial-gradient(circle at 90% 8%, rgba(125, 211, 252, 0.22), rgba(125, 211, 252, 0) 42%),
            linear-gradient(165deg, #ffffff, #f2f9ff);
          padding: 20px 20px 18px;
          box-shadow: 0 14px 26px rgba(8, 36, 65, 0.08);
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
          animation: hmPurposeCardIn 620ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-delay: var(--mv-delay, 0ms);
        }

        .hm-purpose-card::before {
          content: "";
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #0f7ed3, #10b9d8);
          border-radius: 20px 20px 0 0;
        }

        .hm-purpose-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -48%;
          width: 34%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.42),
            rgba(255, 255, 255, 0)
          );
          transform: skewX(-14deg);
          opacity: 0;
          animation: hmPurposeSheen 7s ease-in-out infinite;
          animation-delay: calc(var(--mv-delay, 0ms) + 420ms);
          pointer-events: none;
          z-index: 0;
        }

        .hm-purpose-card:hover {
          transform: translateY(-4px);
          border-color: #7fc8f1;
          box-shadow: 0 20px 34px rgba(8, 36, 65, 0.14);
        }

        .hm-purpose-card h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          font-size: clamp(32px, 2.6vw, 40px);
          font-weight: 500;
          line-height: 1.1;
          color: #0a2c49;
          letter-spacing: -0.015em;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hm-purpose-card p {
          margin-top: 10px;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.8;
          color: #46617b;
          position: relative;
          z-index: 1;
        }

        @keyframes hmPurposeDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-18px, 12px, 0);
          }
        }

        @keyframes hmPurposeCardIn {
          from {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes hmPurposeSheen {
          0% {
            left: -48%;
            opacity: 0;
          }
          14% {
            opacity: 0.52;
          }
          34% {
            left: 130%;
            opacity: 0;
          }
          100% {
            left: 130%;
            opacity: 0;
          }
        }

        .hm-pillar-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          grid-auto-rows: 1fr;
          align-items: stretch;
        }

        .hm-pillar-grid > div {
          height: 100%;
        }

        .hm-pillar {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid #c6e5f8;
          border-radius: 16px;
          background: linear-gradient(165deg, #ffffff, #f3f9ff);
          padding: 18px;
          box-shadow: 0 12px 26px rgba(8, 36, 65, 0.09);
          overflow: hidden;
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }

        .hm-pillar::before {
          content: "";
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--hm-blue), var(--hm-cyan));
        }

        .hm-pillar:hover {
          transform: translateY(-4px);
          border-color: #9fd6f5;
          box-shadow: 0 18px 30px rgba(8, 36, 65, 0.14);
        }

        .hm-pillar h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          font-size: 23px;
          font-weight: 500;
          line-height: 1.2;
          color: #092743;
          min-height: 82px;
        }

        .hm-pillar p {
          margin-top: 10px;
          color: #49657f;
          line-height: 1.68;
          font-size: 14px;
          flex: 1;
        }

        .hm-impact {
          border-top: 1px solid #d7ecfb;
          border-bottom: 1px solid #d7ecfb;
          background:
            radial-gradient(circle at 92% 14%, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0) 36%),
            linear-gradient(180deg, #f3fbff, #eef8ff);
        }

        .hm-impact-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          align-items: stretch;
        }

        .hm-impact-card {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 520px;
          border-radius: 18px;
          border: 1px solid #bfdef5;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 16px 28px rgba(8, 36, 65, 0.1);
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }

        .hm-impact-card::before {
          content: "";
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #0f7ed3, #10b9d8);
          z-index: 2;
        }

        .hm-impact-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -42%;
          width: 42%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.34),
            rgba(255, 255, 255, 0)
          );
          transform: skewX(-16deg);
          opacity: 0;
          animation: hmImpactSheen 7s ease-in-out infinite;
          animation-delay: calc(var(--hm-card-index, 0) * 0.45s);
          pointer-events: none;
          z-index: 2;
        }

        @keyframes hmImpactSheen {
          0% { left: -42%; opacity: 0; }
          10% { opacity: 0.45; }
          28% { left: 126%; opacity: 0; }
          100% { left: 126%; opacity: 0; }
        }

        .hm-impact-card:hover {
          transform: translateY(-6px);
          border-color: #95cff2;
          box-shadow: 0 26px 36px rgba(8, 36, 65, 0.18);
        }

        .hm-impact-media {
          position: relative;
          min-height: 260px;
          height: 260px;
          flex: 0 0 260px;
          border-bottom: 1px solid #d8ecfb;
          overflow: hidden;
        }

        .hm-impact-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .hm-impact-card:hover .hm-impact-media img {
          transform: scale(1.04);
        }

        .hm-impact-chip {
          position: absolute;
          left: 12px;
          top: 12px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.54);
          background: rgba(3, 39, 68, 0.74);
          color: #dff5ff;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 11px;
          letter-spacing: 0.04em;
          transition: transform 0.24s ease, background 0.24s ease;
        }

        .hm-impact-card:hover .hm-impact-chip {
          transform: translateY(-2px);
          background: rgba(3, 39, 68, 0.88);
        }

        .hm-impact-body {
          padding: 16px;
          display: grid;
          grid-template-rows: auto auto 1fr;
          gap: 10px;
          flex: 1;
        }

        .hm-impact-body h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #072746;
          font-size: clamp(20px, 1.8vw, 26px);
          font-weight: 500;
          line-height: 1.14;
          letter-spacing: -0.015em;
          text-wrap: balance;
          min-height: 2.3em;
        }

        .hm-impact-body strong {
          display: block;
          color: #0f7ed3;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.5;
          min-height: 3em;
          text-wrap: balance;
        }

        .hm-impact-body p {
          margin-top: 0;
          color: #49657f;
          line-height: 1.62;
          font-size: 15px;
          font-weight: 600;
        }

        .hm-edge {
          border-top: 1px solid #d7ecfb;
          border-bottom: 1px solid #d7ecfb;
          background:
            linear-gradient(120deg, rgba(7, 31, 57, 0.96), rgba(8, 73, 122, 0.94) 56%, rgba(9, 126, 165, 0.9)),
            url('${homeHeroImageSrc}') center / cover no-repeat;
          color: #def3ff;
        }

        .hm-edge .hm-headline {
          color: #ffffff;
        }

        .hm-edge .hm-copy {
          color: rgba(230, 247, 255, 0.92);
        }

        .hm-edge-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          grid-auto-rows: 1fr;
          align-items: stretch;
        }

        .hm-edge-grid > div {
          height: 100%;
        }

        .hm-edge-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(186, 230, 253, 0.44);
          border-radius: 16px;
          padding: 16px;
          background: rgba(6, 33, 58, 0.45);
          box-shadow: 0 14px 24px rgba(2, 6, 23, 0.2);
          backdrop-filter: blur(2px);
        }

        .hm-edge-card h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #ffffff;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.18;
          min-height: 54px;
        }

        .hm-edge-card p {
          margin-top: 9px;
          color: rgba(224, 244, 255, 0.92);
          font-size: 14px;
          line-height: 1.65;
          flex: 1;
        }

        .hm-expertise {
          position: relative;
          overflow: hidden;
          padding: 60px 0 24px;
          background:
            radial-gradient(circle at 14% 10%, rgba(125, 211, 252, 0.24), rgba(125, 211, 252, 0) 40%),
            radial-gradient(circle at 84% 14%, rgba(56, 189, 248, 0.19), rgba(56, 189, 248, 0) 42%),
            linear-gradient(180deg, #f8fcff 0%, #eef8ff 46%, #f4faff 100%);
        }

        .hm-expertise::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(15, 126, 211, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 126, 211, 0.05) 1px, transparent 1px);
          background-size: 42px 42px;
          opacity: 0.32;
          pointer-events: none;
        }

        .hm-exp-head {
          text-align: center;
          position: relative;
          z-index: 1;
          max-width: 620px;
          margin: 0 auto;
        }

        .hm-exp-title {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #0f7ed3;
          font-size: clamp(34px, 4.6vw, 54px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.015em;
        }

        .hm-exp-title em {
          color: #56c8f7;
          font-style: normal;
          font-weight: inherit;
        }

        .hm-exp-line {
          display: inline-block;
          width: 96px;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, #0f7ed3, #10b9d8);
          margin-top: 10px;
        }

        .hm-exp-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          grid-auto-rows: 1fr;
          align-items: stretch;
          position: relative;
          z-index: 1;
        }

        .hm-exp-grid > div {
          height: 100%;
        }

        .hm-exp-card {
          border: 1px solid #afd8f3;
          border-radius: 20px;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(245, 251, 255, 0.98));
          box-shadow: 0 14px 26px rgba(8, 36, 65, 0.11);
          display: grid;
          grid-template-rows: 160px auto;
          min-height: 0;
          height: 100%;
          position: relative;
          isolation: isolate;
          transform-origin: center top;
          transition: transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.28s cubic-bezier(0.22, 0.61, 0.36, 1),
            border-color 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .hm-exp-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(255, 255, 255, 0.66);
          pointer-events: none;
          z-index: 3;
        }

        .hm-exp-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, var(--hm-exp-accent, #2a96da), rgba(125, 211, 252, 0.32)) top / 100% 3px no-repeat,
            radial-gradient(circle at 88% -10%, var(--hm-exp-accent-soft, rgba(56, 189, 248, 0.2)), rgba(56, 189, 248, 0) 50%);
          pointer-events: none;
          z-index: 1;
        }

        .hm-exp-card:hover {
          transform: translateY(-6px);
          border-color: var(--hm-exp-accent, #88c8ee);
          box-shadow: 0 20px 32px rgba(8, 36, 65, 0.14);
        }

        .hm-exp-media {
          position: relative;
          min-height: 0;
          height: 100%;
          overflow: hidden;
          z-index: 2;
        }

        .hm-exp-chip {
          position: absolute;
          left: 12px;
          top: 12px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.62);
          background: linear-gradient(135deg, var(--hm-exp-chip-from, rgba(3, 39, 68, 0.76)), var(--hm-exp-chip-to, rgba(15, 126, 211, 0.88)));
          color: #dff5ff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.03em;
          padding: 5px 10px;
          box-shadow: 0 8px 16px rgba(2, 24, 40, 0.28);
          transition: transform 0.24s ease, background 0.24s ease, box-shadow 0.24s ease;
          z-index: 2;
        }

        .hm-exp-chip::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 999px;
          margin-right: 6px;
          background: #dff5ff;
          box-shadow: 0 0 0 2px rgba(223, 245, 255, 0.24);
        }

        .hm-exp-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 84% 6%, var(--hm-exp-accent-soft, rgba(56, 189, 248, 0.18)), rgba(56, 189, 248, 0) 42%),
            linear-gradient(180deg, rgba(8, 36, 65, 0.02) 28%, rgba(8, 36, 65, 0.3) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .hm-exp-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.06) contrast(1.02);
          transform: scale(1.02);
          transition: transform 0.56s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .hm-exp-card:hover .hm-exp-media img {
          transform: scale(1.08);
        }

        .hm-exp-card:hover .hm-exp-chip {
          transform: translateY(-2px);
          box-shadow: 0 10px 18px rgba(2, 24, 40, 0.34);
        }

        .hm-exp-body {
          margin: 0;
          padding: 14px 14px 14px;
          border: 0;
          border-top: 1px solid #cfe5f7;
          border-radius: 0;
          background:
            radial-gradient(circle at 12% 0%, var(--hm-exp-accent-soft, rgba(56, 189, 248, 0.2)), rgba(255, 255, 255, 0) 40%),
            linear-gradient(180deg, rgba(230, 242, 251, 0.9) 0%, rgba(242, 248, 254, 0.94) 26%, rgba(250, 253, 255, 0.98) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 6px;
          position: relative;
          z-index: 2;
          transition: background 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .hm-exp-body::before {
          content: none;
        }

        .hm-exp-card:hover .hm-exp-body {
          background:
            radial-gradient(circle at 12% 0%, var(--hm-exp-accent-soft, rgba(56, 189, 248, 0.24)), rgba(255, 255, 255, 0) 42%),
            linear-gradient(180deg, rgba(228, 242, 252, 0.92) 0%, rgba(242, 248, 254, 0.95) 26%, rgba(251, 253, 255, 0.99) 100%);
        }

        .hm-exp-body h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #193651;
          font-size: clamp(17px, 1.35vw, 24px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-wrap: balance;
          min-height: 0;
          width: 100%;
          margin-left: 0;
          margin-right: 0;
          text-align: left;
        }

        .hm-exp-body p {
          margin: 0;
          color: #4d6985;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.52;
          width: 100%;
          margin-left: 0;
          margin-right: 0;
          min-height: 6.1em;
          text-align: left;
        }

        .hm-proof {
          padding: 24px 0 70px;
          background:
            radial-gradient(circle at 84% 12%, rgba(56, 189, 248, 0.12), rgba(56, 189, 248, 0) 34%),
            linear-gradient(180deg, #f7fcff 0%, #eef8ff 100%);
        }

        .hm-proof-head {
          text-align: center;
        }

        .hm-proof-title {
          margin: 0;
          font-family: var(--hm-font-display);
          color: var(--hm-ink);
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.01em;
        }

        .hm-proof-title em {
          color: #56c8f7;
          font-style: normal;
          font-weight: inherit;
        }

        .hm-proof-sub {
          margin: 10px auto 0;
          max-width: 760px;
          color: #4a647d;
          font-size: 15px;
          line-height: 1.72;
          font-weight: 600;
          text-align: center;
        }

        .hm-proof-grid {
          margin-top: 22px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          grid-auto-rows: 1fr;
          align-items: stretch;
        }

        .hm-proof-grid > div {
          height: 100%;
        }

        .hm-proof-card {
          height: 100%;
          border: 1px solid #c4e2f7;
          border-radius: 16px;
          background:
            radial-gradient(circle at 92% 8%, rgba(56, 189, 248, 0.18), rgba(56, 189, 248, 0) 36%),
            linear-gradient(160deg, #ffffff, #f3faff);
          padding: 18px;
          box-shadow: 0 12px 24px rgba(8, 36, 65, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }

        .hm-proof-card:hover {
          transform: translateY(-4px);
          border-color: #9fd3f4;
          box-shadow: 0 18px 30px rgba(8, 36, 65, 0.12);
        }

        .hm-proof-card h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #0d2b47;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.2;
          text-align: center;
          min-height: 58px;
        }

        .hm-proof-card p {
          margin: 10px 0 0;
          color: #4b6781;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.68;
          text-align: center;
        }

        .hm-vision {
          padding: 0 0 86px;
        }

        .hm-vision-stack {
          display: grid;
          gap: 18px;
        }

        .hm-roadmap-box,
        .hm-cta-box {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .hm-roadmap-box {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(34px, 4.8vw, 54px) 0;
          border-radius: 0;
          border-top: 1px solid #d7ecfb;
          border-bottom: 1px solid #d7ecfb;
          box-shadow: none;
          background:
            linear-gradient(120deg, rgba(7, 31, 57, 0.96), rgba(8, 73, 122, 0.94) 56%, rgba(9, 126, 165, 0.9)),
            url('${homeHeroImageSrc}') center / cover no-repeat;
          color: #def3ff;
        }

        .hm-roadmap-box > * {
          position: relative;
          z-index: 2;
        }

        .hm-cta-box {
          border-radius: 24px;
          border: 1px solid rgba(173, 226, 253, 0.34);
          box-shadow: 0 22px 38px rgba(2, 6, 23, 0.24);
          padding: 36px 34px;
          background:
            linear-gradient(118deg, rgba(6, 30, 55, 0.93), rgba(7, 74, 121, 0.9) 58%, rgba(6, 164, 195, 0.76)),
            url('${ctaLabTeamImageSrc}') center / cover no-repeat;
        }

        .hm-cta-box > * {
          position: relative;
          z-index: 2;
        }

        .hm-roadmap-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, rgba(125, 211, 252, 0.24), rgba(125, 211, 252, 0) 42%),
            radial-gradient(circle at 86% 84%, rgba(103, 232, 249, 0.2), rgba(103, 232, 249, 0) 44%);
          z-index: 1;
          pointer-events: none;
        }

        .hm-roadmap-box::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(92deg, rgba(5, 27, 52, 0.4) 0%, rgba(5, 27, 52, 0.16) 34%, rgba(8, 98, 145, 0.08) 100%);
          opacity: 1;
          z-index: 1;
          pointer-events: none;
        }

        .hm-cta-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, rgba(125, 211, 252, 0.3), rgba(125, 211, 252, 0) 42%),
            radial-gradient(circle at 86% 84%, rgba(103, 232, 249, 0.27), rgba(103, 232, 249, 0) 44%);
          z-index: 1;
        }

        .hm-roadmap-kicker {
          display: none;
        }

        .hm-roadmap-box h2 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #ffffff;
          font-size: clamp(32px, 4.5vw, 62px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.012em;
          max-width: 980px;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          text-wrap: balance;
          text-shadow: 0 8px 18px rgba(2, 6, 23, 0.28);
        }

        .hm-roadmap-box h2 em {
          font-style: normal;
          color: #56c8f7;
          background: none;
          text-shadow: none;
        }

        .hm-cta-box h2 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #f3fbff;
          font-size: clamp(36px, 4.8vw, 58px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.018em;
          max-width: 760px;
          text-align: left;
          text-shadow: 0 8px 18px rgba(2, 6, 23, 0.24);
        }

        .hm-vision-intro {
          margin: 10px auto 0;
          max-width: 860px;
          line-height: 1.72;
          color: rgba(230, 247, 255, 0.92);
          font-size: 15px;
          font-weight: 500;
          text-align: center;
          border-left: 0;
          padding-left: 0;
        }

        .hm-cta-copy {
          margin-top: 14px;
          max-width: 760px;
          line-height: 1.76;
          color: rgba(232, 248, 255, 0.94);
          font-size: 16px;
          text-align: left;
        }

        .hm-roadmap-grid {
          width: min(1160px, calc(100% - 44px));
          margin: 22px auto 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          grid-auto-rows: 1fr;
          align-items: stretch;
        }

        .hm-roadmap-grid > div {
          height: 100%;
        }

        .hm-roadmap-item {
          height: 100%;
          border: 1px solid rgba(186, 230, 253, 0.44);
          border-radius: 16px;
          background: rgba(6, 33, 58, 0.45);
          padding: 16px;
          box-shadow: 0 14px 24px rgba(2, 6, 23, 0.2);
          backdrop-filter: blur(2px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }

        .hm-roadmap-item:hover {
          transform: translateY(-3px);
          border-color: rgba(186, 230, 253, 0.68);
          box-shadow: 0 16px 28px rgba(2, 6, 23, 0.24);
        }

        .hm-roadmap-item h3 {
          margin: 0;
          font-family: var(--hm-font-display);
          color: #ffffff;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.18;
          min-height: 58px;
          text-align: left;
        }

        .hm-roadmap-item p {
          margin: 10px 0 0;
          max-width: none;
          color: rgba(224, 244, 255, 0.92);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.65;
          flex: 1;
          text-align: left;
        }

        .hm-vision-actions {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hm-vision-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          text-decoration: none;
          padding: 11px 18px;
          font-size: 17px;
          font-weight: 700;
          transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
        }

        .hm-vision-btn-main {
          background: #ffffff;
          color: #0b68a4;
          border: 1px solid #ffffff;
        }

        .hm-vision-btn-main:hover {
          transform: translateY(-1px);
          background: #f2f9ff;
        }

        .hm-vision-btn-ghost {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.64);
          background: rgba(255, 255, 255, 0.12);
        }

        .hm-vision-btn-ghost:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1120px) {
          .hm-hero-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .hm-hero-stage {
            width: min(100%, 460px);
          }

          .hm-pillar-grid,
          .hm-edge-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hm-impact-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hm-roadmap-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hm-purpose-grid {
            grid-template-columns: 1fr;
          }

          .hm-exp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hm-proof-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hm-impact-card {
            min-height: 500px;
          }
        }

        @media (max-width: 860px) {
          .hm-shell {
            width: min(1160px, calc(100% - 30px));
          }

          .hm-shell-compact {
            width: min(940px, calc(100% - 30px));
          }

          .hm-section {
            padding: 62px 0;
          }

          .hm-expertise {
            padding: 52px 0 18px;
          }

          .hm-hero {
            min-height: 620px;
          }

          .hm-hero-grid {
            padding: 74px 0 60px;
          }

          .hm-hero h1 {
            font-size: clamp(30px, 7.2vw, 46px);
          }

          .hm-hero h2,
          .hm-hero p {
            font-size: clamp(17px, 4.2vw, 22px);
          }

          .hm-hero-line-accent {
            white-space: normal;
          }

          .hm-hero-stage {
            width: min(100%, 340px);
            height: 250px;
          }

          .hm-hero-copy-block {
            max-width: 100%;
            padding: 0;
          }

          .hm-headline-one-line {
            white-space: normal;
          }

          .hm-purpose {
            padding-top: 20px;
          }

          .hm-purpose .hm-headline {
            font-size: clamp(30px, 7.8vw, 44px);
          }

          .hm-purpose .hm-copy {
            font-size: 15px;
          }

          .hm-purpose-card h3 {
            font-size: clamp(30px, 8.2vw, 42px);
          }

          .hm-pillar-grid,
          .hm-edge-grid {
            grid-template-columns: 1fr;
          }

          .hm-pillar h3 {
            min-height: 0;
          }

          .hm-edge-card h3,
          .hm-proof-card h3 {
            min-height: 0;
          }

          .hm-impact-grid {
            grid-template-columns: 1fr;
          }

          .hm-exp-grid {
            grid-template-columns: 1fr;
          }

          .hm-exp-card {
            min-height: 0;
            grid-template-rows: 176px auto;
          }

          .hm-exp-body {
            padding: 16px 16px 18px;
            justify-content: flex-start;
          }

          .hm-exp-body h3,
          .hm-exp-body p {
            min-height: 0;
            width: 100%;
          }

          .hm-proof-grid {
            grid-template-columns: 1fr;
          }

          .hm-impact-card {
            min-height: 0;
          }

          .hm-impact-media {
            min-height: 220px;
            height: 220px;
            flex-basis: 220px;
          }

          .hm-vision {
            padding-bottom: 72px;
          }

          .hm-cta-box {
            padding: 30px 20px;
          }

          .hm-roadmap-box h2,
          .hm-cta-box h2 {
            font-size: clamp(34px, 9vw, 50px);
            max-width: 100%;
          }

          .hm-vision-intro,
          .hm-cta-copy {
            max-width: 100%;
          }

          .hm-roadmap-grid {
            margin-top: 16px;
          }

          .hm-roadmap-item h3 {
            min-height: 0;
            font-size: clamp(22px, 6.6vw, 30px);
          }

          .hm-vision-actions {
            margin-top: 16px;
          }

        }

        @media (max-width: 560px) {
          .hm-headline {
            font-size: clamp(28px, 9vw, 42px);
          }

          .hm-copy {
            font-size: 15px;
          }

          .hm-expertise {
            padding: 46px 0 12px;
          }

          .hm-impact-body h3 {
            font-size: 24px;
            min-height: 0;
          }

          .hm-impact-body strong {
            min-height: 0;
          }

          .hm-exp-card {
            min-height: 0;
            grid-template-rows: 154px auto;
          }

          .hm-exp-media {
            min-height: 154px;
            height: 154px;
          }

          .hm-exp-body {
            padding: 14px 12px 16px;
          }

          .hm-exp-body h3 {
            font-size: 22px;
            min-height: 0;
          }

          .hm-exp-body p {
            font-size: 14px;
            min-height: 0;
          }

          .hm-hero h1,
          .hm-hero h2,
          .hm-hero p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .hm-purpose-card p {
            font-size: 14px;
          }

          .hm-proof-title {
            font-size: clamp(28px, 8.8vw, 40px);
          }

          .hm-proof-sub {
            font-size: 14px;
          }

          .hm-proof-card h3 {
            font-size: 22px;
          }

          .hm-vision-btn {
            width: 100%;
            font-size: 15px;
          }

          .hm-roadmap-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hm-hero::after,
          .hm-hero-orb,
          .hm-dot,
          .hm-impact-card,
          .hm-impact-card::after,
          .hm-impact-media img,
          .hm-purpose::before,
          .hm-purpose-card,
          .hm-purpose-card::after,
          .hm-pillar,
          .hm-exp-card,
          .hm-exp-media img,
          .hm-exp-chip,
          .hm-exp-body,
          .hm-proof-card,
          .hm-roadmap-item {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <main className="hm-page">
        <section className="hm-hero">
          <img
            src={homeHeroImageSrc}
            alt=""
            aria-hidden="true"
            className="hm-hero-bg"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="hm-hero-orb hm-hero-orb-1" aria-hidden="true" />
          <span className="hm-hero-orb hm-hero-orb-2" aria-hidden="true" />

          <div className="hm-shell hm-hero-grid">
            <Reveal>
              <div className="hm-hero-copy-block">
                <h1>
                  <span className="hm-hero-line">
                    Precision optics and
                  </span>
                  <span className="hm-hero-line hm-hero-line-accent">
                    <em>diagnostics deep-tech</em>
                  </span>
                  <span className="hm-hero-line">
                    company
                  </span>
                </h1>
                <h2>
                  Indigenous precision optics and diagnostic solutions, designed for Indian
                  deployment conditions.
                </h2>
                <p>
                  Supporting government and institutional workflows across health, dairy, food, and
                  veterinary programs with practical, field-ready systems.
                </p>
              </div>
            </Reveal>

            {hasHeroSlides ? (
              <Reveal delay={120}>
                <article className="hm-hero-media">
                  <div className="hm-hero-stage">
                    {activeHeroSlides.map((slide, index) => (
                      <img
                        key={slide.alt}
                        src={slide.image}
                        alt={slide.alt}
                        className={`hm-hero-device${index === activeHeroSlideIndex ? " hm-hero-device-on" : ""}`}
                        style={{ "--hm-device-scale": slide.scale || 1 }}
                        loading={index === activeHeroSlideIndex ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index === activeHeroSlideIndex ? "high" : "low"}
                        onError={() =>
                          setBrokenHeroSlides((prev) =>
                            prev[slide.alt] ? prev : { ...prev, [slide.alt]: true }
                          )
                        }
                      />
                    ))}
                  </div>

                  {currentHeroSlide ? (
                    <div className="hm-hero-meta">
                      <strong key={`${currentHeroSlide.alt}-name`}>{currentHeroSlide.name}</strong>
                      <span key={`${currentHeroSlide.alt}-tag`}>{currentHeroSlide.tag}</span>
                    </div>
                  ) : null}

                  <div className="hm-dot-row" role="group" aria-label="Product slider navigation">
                    {activeHeroSlides.map((slide, index) => (
                      <button
                        key={`${slide.alt}-dot`}
                        type="button"
                        className={`hm-dot${index === activeHeroSlideIndex ? " hm-dot-on" : ""}`}
                        onClick={() => setActiveHeroIndex(index)}
                        aria-label={`Show ${slide.name}`}
                        aria-pressed={index === activeHeroSlideIndex}
                      />
                    ))}
                  </div>
                </article>
              </Reveal>
            ) : null}
          </div>
        </section>

        <section className="hm-section hm-identity">
          <div className="hm-shell">
            <Reveal>
              <h2 className="hm-headline hm-headline-one-line">
                Built for <em>Accuracy</em>, Designed for <em>Deployment</em>
              </h2>
              <p className="hm-copy">
                BeamOptics Scientific Pvt. Ltd. is an emerging Indian deep-tech company
                specializing in precision photonics and instrumentation. We aim to become a global
                leader in precision optics by making sophisticated scientific tools accessible and
                affordable, while delivering high-accuracy, field-ready analytical and diagnostic
                solutions aligned with national healthcare and quality-control initiatives.
              </p>
            </Reveal>

            <div className="hm-pillar-grid">
              {CORE_PILLARS.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 90}>
                  <article className="hm-pillar">
                    <h3>{pillar.title}</h3>
                    <p>{pillar.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section hm-purpose">
          <div className="hm-shell">
            <Reveal>
              <div className="hm-purpose-head">
                <h2 className="hm-headline">Our <em>Vision</em> and Mission</h2>
              </div>
            </Reveal>

            <div className="hm-purpose-grid">
              {MISSION_VISION.map((item, index) => (
                <Reveal key={item.title} delay={index * 90}>
                  <article className="hm-purpose-card" style={{ "--mv-delay": `${120 + index * 140}ms` }}>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section hm-expertise">
          <div className="hm-shell hm-shell-compact">
            <Reveal>
              <div className="hm-exp-head">
                <h2 className="hm-exp-title">Our <em>Expertise</em></h2>
                <span className="hm-exp-line" />
              </div>
            </Reveal>

            <div className="hm-exp-grid">
              {EXPERTISE_CARDS.map((item, index) => (
                <Reveal key={item.title} delay={index * 90}>
                  <article
                    className="hm-exp-card"
                    style={{
                      "--hm-exp-accent": item.accent,
                      "--hm-exp-accent-soft": item.accentSoft,
                      "--hm-exp-chip-from": item.chipFrom,
                      "--hm-exp-chip-to": item.chipTo,
                    }}
                  >
                    <div className="hm-exp-media">
                      <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      <span className="hm-exp-chip">{item.chip}</span>
                    </div>
                    <div className="hm-exp-body">
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section hm-impact">
          <div className="hm-shell">
            <Reveal>
              <h2 className="hm-headline">Industries <em>Served</em></h2>
              <p className="hm-copy">
                BeamOptics serves healthcare and diagnostics, pharmaceuticals and drug safety, food
                and dairy, edible and premium oils, industrial quality control, and research
                laboratories through one adaptable analytical foundation.
              </p>
            </Reveal>

            <div className="hm-impact-grid">
              {INDUSTRIES_IMPACT.map((industry, index) => (
                <Reveal key={industry.title} delay={index * 80}>
                  <article
                    className="hm-impact-card"
                    style={{ "--hm-card-index": index }}
                    >
                    <div className="hm-impact-media">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: industry.imagePosition || "center" }}
                      />
                      <span className="hm-impact-chip">{industry.chip}</span>
                    </div>
                    <div className="hm-impact-body">
                      <h3>{industry.title}</h3>
                      <strong>{industry.short}</strong>
                      <p>{industry.copy}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section hm-edge">
          <div className="hm-shell">
            <Reveal>
              <h2 className="hm-headline"><em>Government</em> and <em>Institutional</em> Focus</h2>
              <p className="hm-copy">
                Solutions aligned with national healthcare and food safety initiatives such as
                anaemia screening and preventive diagnostics, designed for district hospitals,
                government labs, public health programs, and institutional deployments.
              </p>
            </Reveal>

            <div className="hm-edge-grid">
              {WHY_BEAM.map((point, index) => (
                <Reveal key={point.title} delay={index * 80}>
                  <article className="hm-edge-card">
                    <h3>{point.title}</h3>
                    <p>{point.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section hm-proof">
          <div className="hm-shell">
            <Reveal>
              <div className="hm-proof-head">
                <h2 className="hm-proof-title">Manufacturing, Quality, and <em>Leadership</em></h2>
                <p className="hm-proof-sub">
                  Designed and developed in India with modular, precision-focused engineering and a
                  multidisciplinary leadership team.
                </p>
              </div>
            </Reveal>

            <div className="hm-proof-grid">
              {DEPLOYMENT_OUTCOMES.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="hm-proof-card">
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-vision">
          <div className="hm-shell">
            <div className="hm-vision-stack">
              <Reveal>
                <div className="hm-roadmap-box">
                  <h2>End-to-End <em>Transparency</em></h2>
                  <p className="hm-vision-intro">
                    Democratizing advanced analytical science through affordable, non-destructive,
                    and AI-driven instrumentation.
                  </p>

                  <div className="hm-roadmap-grid">
                    {MISSION_PRIORITIES.map((item, index) => (
                      <div key={item.title} style={{ transitionDelay: `${index * 80}ms` }}>
                        <article className="hm-roadmap-item">
                          <h3>{item.title}</h3>
                          <p>{item.copy}</p>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={110}>
                <div className="hm-cta-box">
                  <h2>Ready to build your next quality system?</h2>
                  <p className="hm-cta-copy">
                    Share your workflow and sample profile. Our team will map the right BEAM
                    diagnostics and analytics setup for your lab.
                  </p>

                  <div className="hm-vision-actions">
                    <Link to="/services" className="hm-vision-btn hm-vision-btn-main">
                      Explore Services
                    </Link>
                    <Link to="/contact" className="hm-vision-btn hm-vision-btn-ghost">
                      Talk to Team
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
