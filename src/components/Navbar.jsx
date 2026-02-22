"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@/lib/nextRouterCompat";
import { assetSrc } from "@/lib/assetSrc";
import BeamLogo from "../assets/images/Logo.webp";

const HOME_HERO_RESET_EVENT = "bo:home-hero-reset";
const SERVICES_FORCE_NAV_EVENT = "bo:services-force-nav";
const beamLogoSrc = assetSrc(BeamLogo);
const INDUSTRIES_NAV_ITEMS = [
  { label: "Dairy", href: "/industries/dairy" },
  { label: "Food Products", href: "/industries/food-products" },
  { label: "Veterinary", href: "/industries/veterinary" },
  { label: "Pharmaceutical", href: "/industries/pharmaceutical" },
  { label: "Public Health", href: "/industries/public-health" },
];

const NAV_LINKS = [
  { label: "Home",       href: "/"           },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Company Profile", href: "/about#company-profile" },
      { label: "Connect",         href: "/about#connect"         },
    ],
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Diagnostic",                 href: "/services#diagnostic" },
      { label: "Analytical",                 href: "/services#analytical" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: INDUSTRIES_NAV_ITEMS,
  },
  { label: "Contact Us", href: "/contact" },
];

/* ── Icons ─────────────────────────────────────────────────────────── */
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const location = useLocation();
  const activePath = location.pathname || "/";

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled,       setScrolled]       = useState(false);
  const [logoError,      setLogoError]      = useState(false);
  const timerRef = useRef(null);
  const lockedScrollYRef = useRef(0);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => {
      const nextScrolled = window.scrollY > 6;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* robust body lock for mobile drawer to prevent stale non-scrollable state */
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const unlockBodyScroll = () => {
      if (body.dataset.boScrollLock !== "1") return;
      const offsetY = Math.abs(parseInt(body.style.top || "0", 10)) || lockedScrollYRef.current;

      delete body.dataset.boScrollLock;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
      body.style.touchAction = "";
      html.style.overflow = "";
      window.scrollTo({ top: offsetY, left: 0, behavior: "auto" });
    };

    if (mobileOpen) {
      lockedScrollYRef.current = window.scrollY || window.pageYOffset || 0;
      const scrollbarGap = Math.max(window.innerWidth - html.clientWidth, 0);

      body.dataset.boScrollLock = "1";
      body.style.position = "fixed";
      body.style.top = `-${lockedScrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;
      body.style.touchAction = "none";
      html.style.overflow = "hidden";
    } else {
      unlockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [mobileOpen]);

  /* ensure drawer never remains open/locked when viewport returns to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
        setMobileExpanded(null);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* sync active page on URL changes and always reset mobile drawer state */
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  /* when mobile drawer opens, pre-expand the active dropdown section */
  useEffect(() => {
    if (!mobileOpen) return;
    const activeMenu = NAV_LINKS.find((link) => link.dropdown && isLinkActive(link));
    setMobileExpanded(activeMenu ? activeMenu.label : null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen, activePath]);

  const openDrop  = (label) => { clearTimeout(timerRef.current); setActiveDropdown(label); };
  const closeDrop = ()      => { timerRef.current = setTimeout(() => setActiveDropdown(null), 150); };

  const handleNavClick = (href) => {
    setMobileOpen(false);
    setMobileExpanded(null);

    if (location.pathname === "/services" && href.startsWith("/services#")) {
      const targetHash = href.slice("/services".length);
      window.dispatchEvent(
        new CustomEvent(SERVICES_FORCE_NAV_EVENT, {
          detail: { hash: targetHash },
        })
      );
    }

    if (href === "/" || href === "/Home") {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobileViewport = window.matchMedia("(max-width: 1024px)").matches;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: reduceMotion || isMobileViewport ? "auto" : "smooth",
      });
      window.dispatchEvent(new CustomEvent(HOME_HERO_RESET_EVENT));
    }
  };

  const handleMobileParentClick = (link) => {
    setMobileExpanded((prev) => (prev === link.label ? null : link.label));
  };

  const isLinkActive = (link) => {
    if (activePath === link.href) return true;
    if (link.dropdown) {
      return activePath.startsWith(`${link.href}/`) || activePath.startsWith(`${link.href}#`);
    }
    return false;
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ NAVBAR ════════════════════════════════════════════════ */
        .nb {
          background: #fff;
          font-family: 'Manrope', sans-serif;
          transition: box-shadow .32s ease;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .nb.nb-soft    { background: rgba(255, 255, 255, .92); }
        .nb.nb-solid   { background: rgba(255, 255, 255, .98); }
        .nb.nb-s       { box-shadow: 0 4px 24px rgba(3,105,161,.13); }
        .nb:not(.nb-s) { box-shadow: 0 1px 0 #e5e7eb; }
        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          height: 74px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .nb-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo-img {
          height: 54px;
          width: auto;
          max-width: 220px;
          object-fit: contain;
          display: block;
          transition: opacity .2s;
        }
        .nb-logo-img:hover { opacity: .88; }

        /* text fallback */
        .nb-logo-txt  { display: flex; flex-direction: column; line-height: 1; }
        .nb-logo-b    { font-size: 22px; font-weight: 800; letter-spacing: .08em; color: #0f172a; }
        .nb-logo-o    { font-size: 10px; font-weight: 600; letter-spacing: .22em; color: #0ea5e9; text-transform: uppercase; margin-top: 2px; }

        /* ── Desktop list ── */
        .nb-list {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
        }
        .nb-item { position: relative; }

        /* ── Nav link ── */
        .nb-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 5px;
          height: 74px;
          padding: 0 18px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: .02em;
          color: #374151;
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          white-space: nowrap;
          transition: color .22s ease;
        }

        /* sliding underline — collapsed at center by default */
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          right: 50%;
          height: 3px;
          background: linear-gradient(90deg, #0284c7, #22d3ee);
          border-radius: 3px 3px 0 0;
          transition: left .26s cubic-bezier(.4,0,.2,1),
                      right .26s cubic-bezier(.4,0,.2,1);
        }

        /* hover: expand underline */
        .nb-link:hover { color: #0284c7; }
        .nb-link:hover::after { left: 14px; right: 14px; }
        .nb-link:focus-visible {
          color: #0284c7;
          outline: none;
        }
        .nb-link:focus-visible::after { left: 14px; right: 14px; }

        /* ACTIVE: underline fully expanded — only on the clicked link */
        .nb-link.nb-act {
          color: #0284c7;
        }
        .nb-link.nb-act::after {
          left: 14px;
          right: 14px;
        }

        /* chevron */
        .nb-chev {
          display: flex;
          align-items: center;
          transition: transform .26s cubic-bezier(.4,0,.2,1);
        }
        .nb-item.nb-open .nb-chev { transform: rotate(180deg); }

        /* ── Dropdown ── */
        .nb-drop {
          position: absolute;
          top: calc(100% - 1px);
          left: 0;
          min-width: 225px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-top: 3px solid #0284c7;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 20px 50px rgba(3,105,161,.13), 0 4px 14px rgba(0,0,0,.07);
          z-index: 9999;
          overflow: hidden;
          animation: dropIn .22s cubic-bezier(.4,0,.2,1) both;
          transform-origin: top center;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px) scaleY(.94); }
          to   { opacity: 1; transform: translateY(0)     scaleY(1);   }
        }

        .nb-di {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'Manrope', sans-serif;
          color: #4b5563;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: color .18s, background .18s, border-left-color .18s, padding-left .18s;
        }
        .nb-di::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #d1d5db;
          flex-shrink: 0;
          transition: background .18s, transform .18s;
        }
        .nb-di:hover {
          color: #0284c7;
          background: #f0f9ff;
          border-left-color: #22d3ee;
          padding-left: 22px;
        }
        .nb-di:hover::before {
          background: #22d3ee;
          transform: scale(1.35);
        }
        .nb-di:not(:last-child) { border-bottom: 1px solid #f3f4f6; }

        /* ── Hamburger ── */
        .nb-ham {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          background: none;
          cursor: pointer;
          color: #374151;
          flex-shrink: 0;
          transition: all .2s;
        }
        .nb-ham:hover { background: #f0f9ff; border-color: #0ea5e9; color: #0284c7; }

        /* ══ MOBILE OVERLAY ════════════════════════════════════════ */
        .mo {
          display: none;
          position: fixed; inset: 0;
          background: rgba(2, 6, 23, .36);
          z-index: 99990;
          opacity: 0;
          transition: opacity .2s ease;
          pointer-events: none;
        }
        .mo.mo-o { opacity: 1; pointer-events: auto; }

        /* ══ MOBILE DRAWER ═════════════════════════════════════════ */
        .dr {
          display: none;
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(320px, 92vw);
          background: #fff;
          z-index: 99999;
          box-shadow: -4px 0 24px rgba(2, 6, 23, .16);
          transform: translate3d(100%, 0, 0);
          transition: transform .22s cubic-bezier(.4,0,.2,1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          pointer-events: none;
          backface-visibility: hidden;
          contain: layout paint;
        }
        .dr.dr-o { transform: translate3d(0, 0, 0); pointer-events: auto; }

        /* drawer header */
        .dr-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: linear-gradient(135deg, #0369a1, #1bacd6);
          position: sticky; top: 0; z-index: 1;
        }
        .dr-logo-img {
          height: 40px; width: auto; max-width: 150px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .dr-logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .dr-x {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.15);
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 6px;
          cursor: pointer; color: #fff;
          transition: background .2s;
        }
        .dr-x:hover { background: rgba(255,255,255,.3); }

        /* drawer nav */
        .dr-nav { padding: 6px 0; }

        .dr-lnk {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px; font-weight: 600; letter-spacing: .02em;
          color: #1e293b;
          width: 100%;
          border: none;
          border-bottom: 1px solid #f1f5f9;
          background: #fff;
          text-align: left;
          cursor: pointer; text-decoration: none;
          transition: color .2s, background .2s, padding-left .2s;
        }
        .dr-lnk:hover         { color: #0284c7; background: #f0f9ff; padding-left: 26px; }
        .dr-lnk.nb-act        { color: #0284c7; background: #f0f9ff; border-left: 3px solid #0284c7; }

        .dr-chv { transition: transform .25s; color: #94a3b8; }
        .dr-chv.r { transform: rotate(180deg); color: #0284c7; }

        .dr-sub {
          overflow: hidden; max-height: 0;
          background: #f8fafc;
          transition: max-height .22s ease;
          border-bottom: 1px solid #e5e7eb;
        }
        .dr-sub.o { max-height: 320px; }

        .dr-sub-lnk {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 20px 11px 28px;
          font-family: 'Manrope', sans-serif;
          font-size: 13px; color: #475569;
          text-decoration: none;
          border-bottom: 1px solid #f1f5f9;
          transition: color .18s, background .18s, padding-left .18s;
        }
        .dr-sub-lnk::before {
          content: ''; width: 5px; height: 5px;
          background: #0ea5e9; border-radius: 50%; flex-shrink: 0;
          transition: transform .18s;
        }
        .dr-sub-lnk:hover {
          color: #0284c7;
          background: #e0f2fe;
          padding-left: 34px;
        }
        .dr-sub-lnk:hover::before { transform: scale(1.4); }


        /* ══ RESPONSIVE ════════════════════════════════════════════ */
        @media (max-width: 1060px) {
          .nb-inner  { padding: 0 24px; }
          .nb-link   { padding: 0 13px; font-size: 14.5px; }
          .nb-link.nb-act::after,
          .nb-link:hover::after { left: 10px; right: 10px; }
        }
        @media (max-width: 1024px) {
          .nb-list { display: none !important; }
          .nb-ham  { display: flex  !important; }
          .mo      { display: block !important; }
          .dr      { display: block !important; }
          .nb {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }
        @media (max-width: 480px) {
          .nb-inner    { padding: 0 16px; }
          .nb-logo-img { height: 44px; }
        }
      `}</style>

      {/* ══ STICKY HEADER (navbar only, no topbar) ══ */}
      <header className="sticky top-0 z-[1000]">
        <nav className={`nb${scrolled ? " nb-s nb-solid" : " nb-soft"}`}>
          <div className="nb-inner">

            {/* Logo */}
            <Link to="/" className="nb-logo" onClick={() => handleNavClick("/")}>
              {!logoError ? (
                <img
                  src={beamLogoSrc}
                  alt="BEAM"
                  className="nb-logo-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setLogoError(true)}
                  draggable={false}
                />
              ) : (
                <div className="nb-logo-txt">
                  <span className="nb-logo-b">BEAM</span>
                  <span className="nb-logo-o">OPTICS</span>
                </div>
              )}
            </Link>

            {/* Desktop Nav */}
            <ul className="nb-list">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className={`nb-item${activeDropdown === link.label ? " nb-open" : ""}`}
                  onMouseEnter={() => link.dropdown && openDrop(link.label)}
                  onMouseLeave={link.dropdown ? closeDrop : undefined}
                >
                  <Link
                    to={link.href}
                    className={`nb-link${isLinkActive(link) ? " nb-act" : ""}`}
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                    {link.dropdown && (
                      <span className="nb-chev"><ChevronDown /></span>
                    )}
                  </Link>

                  {link.dropdown && activeDropdown === link.label && (
                    <div className="nb-drop">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={`${link.label}-${sub.label}`}
                          to={sub.href}
                          className="nb-di"
                          onClick={() => handleNavClick(sub.href)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Hamburger */}
            <button className="nb-ham focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div className={`mo${mobileOpen ? " mo-o" : ""}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile drawer */}
      <div className={`dr ${mobileOpen ? " dr-o" : ""}`}>

        <div className="dr-head">
          <Link to="/" className="dr-logo-link" onClick={() => handleNavClick("/")}>
            {!logoError ? (
              <img
                src={beamLogoSrc}
                alt="BEAM"
                className="dr-logo-img"
                onError={() => setLogoError(true)}
                draggable={false}
              />
            ) : (
              <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:18, fontWeight:800, letterSpacing:".08em", color:"#fff" }}>BEAM</span>
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:9, fontWeight:600, letterSpacing:".22em", color:"#bae6fd", textTransform:"uppercase" }}>OPTICS</span>
              </div>
            )}
          </Link>
          <button className="dr-x focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70" onClick={() => setMobileOpen(false)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <nav className="dr-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <button
                  type="button"
                  className={`dr-lnk${isLinkActive(link) ? " nb-act" : ""}`}
                  onClick={() => handleMobileParentClick(link)}
                >
                  <span>{link.label}</span>
                  <span className={`dr-chv${mobileExpanded === link.label ? " r" : ""}`}>
                    <ChevronDown />
                  </span>
                </button>
              ) : (
                <Link
                  to={link.href}
                  className={`dr-lnk${isLinkActive(link) ? " nb-act" : ""}`}
                  onClick={() => handleNavClick(link.href)}
                >
                  <span>{link.label}</span>
                </Link>
              )}

              {link.dropdown && (
                <div className={`dr-sub${mobileExpanded === link.label ? " o" : ""}`}>
                  <Link
                    to={link.href}
                    className="dr-sub-lnk"
                    onClick={() => handleNavClick(link.href)}
                  >
                    {`${link.label} Overview`}
                  </Link>
                  {link.dropdown.map((sub) => (
                    <Link
                      key={`${link.label}-${sub.label}`}
                      to={sub.href}
                      className="dr-sub-lnk"
                      onClick={() => handleNavClick(sub.href)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

      </div>
    </>
  );
}
