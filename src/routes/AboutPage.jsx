"use client";

import { useEffect, useState } from "react";
import { Link } from "@/lib/nextRouterCompat";
import { assetSrc } from "@/lib/assetSrc";
import heroImage from "../assets/images/home/hero-science.webp";
import companyProfileBgImage from "../assets/images/about/company-profile-bg.webp";
import factoryImage from "../assets/images/about/factory.webp";
import linkedinIcon from "../assets/icons/connect/linkedin.svg";
import emailIcon from "../assets/icons/connect/email.svg";
import phoneIcon from "../assets/icons/connect/phone.svg";
import supportIcon from "../assets/icons/connect/support.svg";

const heroImageSrc = assetSrc(heroImage);
const companyProfileBgImageSrc = assetSrc(companyProfileBgImage);
const factoryImageSrc = assetSrc(factoryImage);
const linkedinIconSrc = assetSrc(linkedinIcon);
const emailIconSrc = assetSrc(emailIcon);
const phoneIconSrc = assetSrc(phoneIcon);
const supportIconSrc = assetSrc(supportIcon);

const CONNECT_ITEMS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "BeamOptics Scientific Pvt. Ltd.",
    href: "https://www.linkedin.com/company/beamoptics-scientific-pvt-ltd/",
    action: "View LinkedIn",
    icon: linkedinIconSrc,
  },
  {
    id: "email",
    label: "Email",
    value: "info@beamoptics.in",
    href: "mailto:info@beamoptics.in",
    action: "Send Email",
    icon: emailIconSrc,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91-9975568458",
    href: "tel:+919975568458",
    action: "Call Now",
    icon: phoneIconSrc,
  },
  {
    id: "contact",
    label: "Support",
    value: "Pune and CBD Belapur",
    href: "/contact#locations",
    action: "Visit Contact Page",
    icon: supportIconSrc,
  },
];

const COMPANY_PROFILE_SECTIONS = [
  {
    number: "1",
    title: "Company Overview",
    variant: "paragraphs",
    items: [
      "BeamOptics Scientific Pvt. Ltd. is an India-based technology company focused on advanced optics, diagnostics, and analytical instrumentation.",
      "The company develops innovative solutions for healthcare, pharmaceutical, food safety, and industrial liquid analysis using precision optics and spectroscopy technologies.",
      "BeamOptics delivers high-accuracy, affordable, and field-ready diagnostic solutions aligned with national healthcare and quality-control initiatives.",
    ],
  },
  {
    number: "2",
    title: "Vision & Mission",
    variant: "paragraphs",
    items: [
      "Vision: To become a leading global provider of precision optical diagnostic systems that improve safety, quality, and accessibility.",
      "Mission: Develop indigenous analytical instruments, support government healthcare programs, enable rapid adulteration detection, and drive innovation through FTIR and intelligent analytics.",
    ],
  },
  {
    number: "3",
    title: "Core Technology Expertise",
    variant: "chips",
    items: [
      "FTIR Spectroscopy-based Liquid Analysis",
      "Precision Optical System Design",
      "Embedded Electronics & Sensor Integration",
      "Diagnostic Algorithm Development",
      "Spectral Fingerprint Analysis",
    ],
  },
  {
    number: "4",
    title: "Product & Solution Portfolio",
    variant: "paragraphs",
    items: [
      "Healthcare Diagnostics: RedCheck Hemoglobin Meter, HbA1c Testing Solutions for institutional healthcare.",
      "Analytical & Spectroscopy Solutions: FTIR-based Liquid Analyzers, Milk and Oil Adulteration Detection Systems, Toxicity Screening Platforms.",
      "Custom Engineering & OEM Solutions including optical subsystem design, spectroscopy modules, and contract product development.",
    ],
  },
  {
    number: "5",
    title: "Industries Served",
    variant: "chips",
    items: [
      "Healthcare & Diagnostics",
      "Pharmaceuticals & Drug Safety",
      "Food & Dairy Industry",
      "Edible & Premium Oils",
      "Industrial Quality Control",
      "Research & Laboratories",
    ],
  },
  {
    number: "6",
    title: "Government & Institutional Focus",
    variant: "paragraphs",
    items: [
      "Solutions aligned with national healthcare and food safety initiatives such as anemia screening and preventive diagnostics.",
      "Designed for district hospitals, government labs, public health programs, and institutional deployments.",
    ],
  },
  {
    number: "7",
    title: "Research & Innovation",
    variant: "chips",
    items: [
      "Indigenous FTIR platform development",
      "Spectral fingerprint database creation",
      "AI-assisted analytics",
      "Cost-optimized optical engineering",
    ],
  },
  {
    number: "8",
    title: "Manufacturing & Quality Approach",
    variant: "paragraphs",
    items: [
      "Designed and developed in India with focus on reliability and field robustness.",
      "Modular architecture, precision optics alignment, and long-term calibration stability.",
    ],
  },
  {
    number: "9",
    title: "Strategic Strengths",
    variant: "chips",
    items: [
      "Expertise in optics and diagnostics integration",
      "Indigenous technology development",
      "Government program alignment",
      "Multi-industry applications using a single platform",
    ],
  },
  {
    number: "10",
    title: "Leadership & Team",
    variant: "paragraphs",
    items: [
      "Led by a multidisciplinary team with expertise in optics, spectroscopy, diagnostics, electronics manufacturing, and industrial product development.",
    ],
  },
  {
    number: "11",
    title: "Future Roadmap",
    variant: "chips",
    items: [
      "Expansion of FTIR-based analytical platforms",
      "Advanced adulteration detection systems",
      "AI-enabled spectral analytics",
      "Scaling institutional healthcare diagnostics and global expansion",
    ],
  },
];

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      setScrollProgress((prev) => (Math.abs(prev - p) < 0.001 ? prev : p));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const linkedinItem = CONNECT_ITEMS.find((item) => item.id === "linkedin");

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        #company-profile,#connect{scroll-margin-top:108px}
        .ab-page{--ink:#071b33;--blue:#0f7bd2;--cyan:#27c8ff;--body:#334155;font-family:'Manrope',sans-serif;color:var(--body);overflow-x:hidden;background:radial-gradient(circle at 10% 10%,#dff6ff 0,transparent 34%),radial-gradient(circle at 90% 80%,#d4ebff 0,transparent 36%),linear-gradient(180deg,#f7fcff,#fff 42%,#f7fbff)}
        .ab-shell{width:min(1180px,calc(100% - 48px));margin:0 auto}
        .ab-progress{position:fixed;left:0;top:0;height:3px;width:calc(var(--p) * 100%);z-index:40;background:linear-gradient(90deg,var(--blue),var(--cyan));box-shadow:0 2px 10px #0f7bd277}
        .ab-label{display:inline-flex;align-items:center;gap:8px;padding:6px 13px;border-radius:999px;border:1px solid #9ddcff;background:#eaf8ff;color:#0369a1;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
        .ab-label::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--cyan)}
        .ab-title{margin-top:14px;font-family:'Manrope',sans-serif;font-size:clamp(30px,5vw,64px);line-height:1.03;letter-spacing:-.01em;color:var(--ink)}
        .ab-title em{font-style:normal;color:var(--blue)}
        .ab-copy{margin-top:14px;font-size:15px;line-height:1.82;color:#40566f}
        .ab-line{margin-top:16px;width:58px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--blue),var(--cyan))}
        .ab-hero{position:relative;overflow:hidden;min-height:560px;display:flex;align-items:center}
        .ab-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center;display:block;image-rendering:auto}
        .ab-hero-overlay{position:absolute;inset:0;background:linear-gradient(125deg,rgba(9,29,57,.9) 0%,rgba(3,105,161,.8) 58%,rgba(34,211,238,.55) 100%)}
        .ab-hero::before{content:'';position:absolute;width:420px;height:420px;border-radius:50%;right:clamp(-110px,-4vw,-40px);top:clamp(20px,7vw,70px);background:radial-gradient(circle,rgba(251,191,36,.34),rgba(251,191,36,0) 70%);pointer-events:none;z-index:0}
        .ab-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.2) 1px,transparent 1px);background-size:36px 36px;opacity:.19;animation:ab-grid 24s linear infinite;pointer-events:none;z-index:0}
        @keyframes ab-grid{from{background-position:0 0}to{background-position:36px 36px}}
        .ab-hero-grid{position:relative;z-index:1;padding:88px 0;display:block;max-width:960px}
        .ab-crumb{color:#ffffffc7;font-size:13px;margin-bottom:16px}
        .ab-crumb a{color:#ffffffc7;text-decoration:none}
        .ab-crumb a:hover{color:#fff}
        .ab-hero h1{font-family:'Manrope',sans-serif;color:#fff;font-size:clamp(38px,6vw,74px);line-height:1.04;max-width:920px;text-shadow:0 12px 32px rgba(2,6,23,.28)}
        .ab-hero h1 em{font-style:normal;color:#38bdf8}
        .ab-hero p{margin-top:16px;color:#ffffffde;max-width:760px;font-size:16px;line-height:1.76}
        .ab-chip-row{margin-top:24px;display:flex;flex-wrap:wrap;gap:10px}
        .ab-chip{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.38);background:rgba(15,23,42,.42);color:#fff;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;backdrop-filter:blur(2px)}
        .ab-chip::before{content:'';width:7px;height:7px;border-radius:50%;background:#38bdf8}
        .ab-cert-wrap,.ab-cta-wrap{padding:86px 0}
        .ab-profile{position:relative;overflow:hidden;padding:96px 0}
        .ab-profile::before{content:'';position:absolute;inset:0;background:url('${companyProfileBgImageSrc}') center/cover no-repeat;transform:scale(1.05);filter:saturate(1.05) contrast(1.04);z-index:-2}
        .ab-profile::after{content:'';position:absolute;inset:0;background:linear-gradient(108deg,rgba(5,18,36,.86) 0%,rgba(9,39,72,.74) 46%,rgba(2,132,199,.54) 100%),radial-gradient(circle at 82% 24%,rgba(125,211,252,.28),transparent 40%);z-index:-1}
        .ab-profile-panel{max-width:980px;border-radius:22px;border:1px solid rgba(191,219,254,.72);background:linear-gradient(160deg,rgba(255,255,255,.95),rgba(247,252,255,.92));backdrop-filter:blur(3px);padding:30px 28px;box-shadow:0 28px 58px rgba(2,6,23,.34)}
        .ab-profile-title{margin-top:14px;font-family:'Manrope',sans-serif;font-size:clamp(28px,4vw,44px);line-height:1.12;color:var(--ink)}
        .ab-profile-copy{margin-top:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .ab-profile-block{position:relative;overflow:hidden;border-radius:16px;border:1px solid #d5e7f7;background:linear-gradient(170deg,#ffffff,#f4faff);padding:15px 14px 14px;box-shadow:0 12px 26px #0f234012}
        .ab-profile-block::before{content:'';position:absolute;left:0;top:0;right:0;height:3px;background:linear-gradient(90deg,#0ea5e9,#22d3ee)}
        .ab-profile-block:nth-child(3n)::before{background:linear-gradient(90deg,#0284c7,#38bdf8)}
        .ab-profile-block:nth-child(4n)::before{background:linear-gradient(90deg,#0f7bd2,#22d3ee)}
        .ab-profile-block-head{display:block}
        .ab-profile-block h3{font-family:'Manrope',sans-serif;font-size:18px;line-height:1.2;color:var(--ink)}
        .ab-profile-block-body{margin-top:10px;display:grid;gap:8px}
        .ab-profile-block-body p{font-size:14px;line-height:1.76;color:#334155}
        .ab-profile-chip-list{margin-top:10px;display:flex;flex-wrap:wrap;gap:8px}
        .ab-profile-chip-list li{list-style:none;display:inline-flex;align-items:center;padding:7px 11px;border-radius:999px;border:1px solid #b9def8;background:linear-gradient(160deg,#f7fcff,#eef8ff);color:#0f2f4d;font-size:12px;line-height:1.45;font-weight:600}
        .ab-title-simple{margin-top:14px;font-family:'Manrope',sans-serif;font-weight:800;font-size:clamp(28px,4vw,42px);line-height:1.15;letter-spacing:0;color:var(--ink);font-variant-numeric:lining-nums proportional-nums;font-feature-settings:'onum' 0,'lnum' 1,'pnum' 1}
        .ab-connect-shell{position:relative;overflow:hidden;border-radius:26px;border:1px solid #b6ddf9;background:radial-gradient(circle at 12% 0%,#22d3ee30,transparent 38%),radial-gradient(circle at 88% 100%,#0f7bd224,transparent 44%),linear-gradient(140deg,#f8fdff,#eaf6ff 52%,#f5fbff);padding:32px;box-shadow:0 22px 46px #0f234029}
        .ab-connect-shell::before{content:'';position:absolute;left:-160px;top:-80px;width:360px;height:220px;transform:rotate(-12deg);background:linear-gradient(90deg,#22d3ee2b,#38bdf800);filter:blur(10px);pointer-events:none}
        .ab-connect-shell::after{content:'';position:absolute;right:-160px;bottom:-90px;width:360px;height:220px;transform:rotate(14deg);background:linear-gradient(90deg,#0f7bd236,#22d3ee00);filter:blur(10px);pointer-events:none}
        .ab-connect-head{position:relative;z-index:1}
        .ab-connect-intro{max-width:740px}
        .ab-connect-title{max-width:760px}
        .ab-connect-title em{font-style:normal;color:#0ea5e9}
        .ab-connect-tags{margin-top:14px;display:flex;flex-wrap:wrap;gap:8px}
        .ab-connect-tags span{display:inline-flex;align-items:center;padding:7px 11px;border-radius:999px;border:1px solid #9ed9fb;background:#f1f9ff;color:#0369a1;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
        .ab-connect-stage{position:relative;z-index:1;margin-top:22px;display:grid;grid-template-columns:.95fr 1.05fr;gap:14px;align-items:stretch}
        .ab-connect-feature{position:relative;overflow:hidden;border-radius:18px;border:1px solid #9ed9fb;background:linear-gradient(160deg,#0b3a6e,#0f7bd2 64%,#22d3ee);color:#fff;padding:20px;box-shadow:0 18px 30px #0f7bd233;display:flex;flex-direction:column}
        .ab-connect-feature::after{content:'';position:absolute;right:-90px;top:-50px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,#ffffff36,transparent 68%);pointer-events:none}
        .ab-connect-feature small{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;border:1px solid #ffffff55;background:#ffffff22;font-size:10px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;z-index:1}
        .ab-connect-feature small img{width:14px;height:14px;object-fit:contain;filter:brightness(0) invert(1)}
        .ab-connect-feature h3{margin-top:12px;font-family:'Manrope',sans-serif;font-size:26px;line-height:1.16;z-index:1}
        .ab-connect-feature p{margin-top:10px;font-size:14px;line-height:1.7;color:#e0f2fe;z-index:1}
        .ab-connect-feature a{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;padding:11px 14px;border-radius:10px;background:#fff;color:#0369a1;font-weight:700;font-size:12px;text-decoration:none;z-index:1;transition:transform .2s ease,box-shadow .2s ease}
        .ab-connect-feature a:hover{transform:translateY(-2px);box-shadow:0 10px 18px #0b27453b}
        .ab-connect-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .ab-connect-item{position:relative;overflow:hidden;border-radius:14px;border:1px solid #d6eaf9;background:linear-gradient(180deg,#fff,#f8fcff);padding:14px;box-shadow:0 10px 20px #0f234012;display:grid;gap:10px;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
        .ab-connect-item::before{content:'';position:absolute;inset:0 auto auto 0;height:3px;width:100%;background:linear-gradient(90deg,#0ea5e9,#22d3ee);opacity:0;transition:opacity .2s ease}
        .ab-connect-item:hover{transform:translateY(-4px);border-color:#93d5fb;box-shadow:0 18px 26px #0f7bd220}
        .ab-connect-item:hover::before{opacity:1}
        .ab-connect-top{display:grid;grid-template-columns:38px 1fr;gap:10px;align-items:center}
        .ab-connect-badge{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(140deg,var(--blue),var(--cyan));box-shadow:0 8px 16px #0f7bd22b;transition:transform .2s ease}
        .ab-connect-item:hover .ab-connect-badge{transform:scale(1.08) rotate(-5deg)}
        .ab-connect-badge img{width:18px;height:18px;object-fit:contain;filter:brightness(0) invert(1)}
        .ab-connect-meta strong{display:block;font-family:'Manrope',sans-serif;color:var(--ink);font-size:16px;line-height:1.2}
        .ab-connect-meta span{display:block;margin-top:4px;font-size:13px;color:#475569;line-height:1.6}
        .ab-connect-link{display:inline-flex;align-items:center;justify-content:center;padding:10px 12px;border-radius:10px;border:1px solid #bae6fd;background:#f7fcff;color:#0369a1;font-size:12px;font-weight:700;text-decoration:none;transition:background .2s ease,transform .2s ease}
        .ab-connect-link:hover{background:#eff8ff;transform:translateY(-1px)}
        .ab-cta{border-radius:22px;overflow:hidden;border:1px solid #ffffff40;background:linear-gradient(120deg,#061628f2,#0a2f58db),url('${factoryImageSrc}') center/cover;padding:36px 32px;box-shadow:0 24px 48px #02061744;color:#fff;position:relative}
        .ab-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 16% 20%,#27c8ff42,transparent 40%),radial-gradient(circle at 86% 80%,#22d3ee52,transparent 44%)}
        .ab-cta h2,.ab-cta p,.ab-cta-row{position:relative;z-index:1}
        .ab-cta h2{font-family:'Manrope',sans-serif;font-size:clamp(30px,4.4vw,52px);line-height:1.05;max-width:760px}
        .ab-cta p{margin-top:14px;max-width:760px;color:#ffffffd9;font-size:15px;line-height:1.78}
        .ab-cta-row{margin-top:20px;display:flex;gap:10px;flex-wrap:wrap}
        .ab-btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;transition:transform .2s ease,background .2s ease}
        .ab-btn-main{background:#fff;color:var(--blue)}
        .ab-btn-ghost{border:1px solid #ffffff8f;background:#ffffff14;color:#fff}
        .ab-btn:hover{transform:translateY(-2px)}
        @media (hover:none) and (pointer:coarse){.ab-hero::after{animation:none;opacity:.12}.ab-chip,.ab-profile-panel{backdrop-filter:none}.ab-connect-shell::before,.ab-connect-shell::after{display:none}.ab-connect-item,.ab-connect-feature a,.ab-connect-link,.ab-btn{transition:none}.ab-connect-item:hover,.ab-btn:hover,.ab-connect-feature a:hover,.ab-connect-link:hover{transform:none}}
        @media (max-width:1080px){.ab-connect-stage{grid-template-columns:1fr}.ab-profile-panel{padding:24px 20px}.ab-profile-copy{grid-template-columns:1fr}}
        @media (max-width:760px){.ab-shell{width:min(1180px,calc(100% - 32px))}.ab-hero{min-height:500px}.ab-hero-grid{padding:72px 0}.ab-cert-wrap,.ab-cta-wrap{padding:68px 0}.ab-connect-grid,.ab-connect-stage{grid-template-columns:1fr}.ab-connect-shell{padding:18px}.ab-connect-feature h3{font-size:22px}.ab-connect-tags{gap:6px}.ab-profile-chip-list li{width:100%;justify-content:flex-start}.ab-cta{padding:28px 20px}}
      `}</style>

      <main className="ab-page" style={{ "--p": scrollProgress }}>
        <div className="ab-progress" aria-hidden="true" />

        <section className="ab-hero">
          <img
            src={heroImageSrc}
            alt=""
            aria-hidden="true"
            className="ab-hero-bg"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="ab-hero-overlay" aria-hidden="true" />
          <div className="ab-shell ab-hero-grid">
            <div>
              <p className="ab-crumb"><Link to="/">Home</Link> / About Us</p>
              <h1>Building the future of <em>Precision Optics and DeepTech Diagnostics</em></h1>
              <p>
                BEAM combines spectroscopy, engineering discipline, and ISO 13485 certified practices
                to deliver dependable quality intelligence for modern labs.
              </p>
              <div className="ab-chip-row">
                <span className="ab-chip">ISO 13485 Certified</span>
                <span className="ab-chip">Research-Led Team</span>
                <span className="ab-chip">In-House Manufacturing Team</span>
                <span className="ab-chip">Diagnostic + Analytical</span>
              </div>
            </div>
          </div>
        </section>

        <section id="company-profile" className="ab-profile">
          <div className="ab-shell">
            <article className="ab-profile-panel">
              <span className="ab-label">Company Profile</span>
              <h2 className="ab-profile-title">Precision instrumentation with a practical quality mission</h2>
              <div className="ab-line" />
              <div className="ab-profile-copy">
                {COMPANY_PROFILE_SECTIONS.map((section) => (
                  <article className="ab-profile-block" key={section.number}>
                    <header className="ab-profile-block-head">
                      <h3>{section.title}</h3>
                    </header>

                    {section.variant === "chips" ? (
                      <ul className="ab-profile-chip-list">
                        {section.items.map((item, index) => (
                          <li key={`${section.number}-${index}`}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="ab-profile-block-body">
                        {section.items.map((item, index) => (
                          <p key={`${section.number}-${index}`}>{item}</p>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="connect" className="ab-cert-wrap">
          <div className="ab-shell">
            <div className="ab-connect-shell">
              <div className="ab-connect-head">
                <h2 className="ab-title-simple ab-connect-title">Connect and collaborate with <em>BeamOptics</em></h2>
                <div className="ab-line" />
                <p className="ab-copy ab-connect-intro">
                  Stay connected for product updates, scientific insights, and team announcements.
                  Follow our official page and reach us directly for collaborations.
                </p>
                <div className="ab-connect-tags">
                  <span>Product Updates</span>
                  <span>Partnership Enquiries</span>
                  <span>Direct Support</span>
                </div>
              </div>
              <div className="ab-connect-stage">
                <aside className="ab-connect-feature">
                  <small>
                    <img src={linkedinItem?.icon || linkedinIconSrc} alt="" aria-hidden="true" />
                    Official LinkedIn
                  </small>
                  <h3>{linkedinItem?.value || "BEAM Scientific Pvt. Ltd."}</h3>
                  <p>
                    Follow our latest machine launches, testing updates, and company milestones on
                    LinkedIn.
                  </p>
                  <a href={linkedinItem?.href || "#"} target="_blank" rel="noreferrer">
                    Visit LinkedIn Profile
                  </a>
                </aside>
                <div className="ab-connect-grid">
                  {CONNECT_ITEMS.map((item) => (
                    <article className="ab-connect-item" key={item.id}>
                      <div className="ab-connect-top">
                        <span className="ab-connect-badge">
                          <img src={item.icon} alt="" aria-hidden="true" />
                        </span>
                        <div className="ab-connect-meta">
                          <strong>{item.label}</strong>
                          <span>{item.value}</span>
                        </div>
                      </div>
                      {item.href.startsWith("/") ? (
                        <Link to={item.href} className="ab-connect-link">
                          {item.action}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="ab-connect-link"
                          target={item.id === "linkedin" ? "_blank" : undefined}
                          rel={item.id === "linkedin" ? "noreferrer" : undefined}
                        >
                          {item.action}
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ab-cta-wrap">
          <div className="ab-shell">
            <div className="ab-cta">
              <h2>Ready to build your next quality system?</h2>
              <p>
                Share your workflow and sample profile. Our team will map the right BEAM
                diagnostics and analytics setup for your lab.
              </p>
              <div className="ab-cta-row">
                <Link to="/services" className="ab-btn ab-btn-main">Explore Services</Link>
                <Link to="/contact" className="ab-btn ab-btn-ghost">Talk to Team</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
