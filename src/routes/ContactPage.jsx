"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { assetSrc } from "@/lib/assetSrc";
import contactHeroImage from "../assets/images/contact/contact-hero.webp";

const contactHeroImageSrc = assetSrc(contactHeroImage);

const COMPANY_NAME = "BeamOptics Scientific Pvt. Ltd.";
const CONTACT_EMAIL = "info@beamoptics.in";
const CONTACT_PHONE = "+91-9975568458";
const CONTACT_PHONE_LINK = "+919975568458";
const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=+91-9975568458&text=Hi";
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.6217342337513!2d73.8287035!3d18.636076099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9b7d1ef18cf%3A0x7b5518210e624f2c!2sBEAM%20LLP!5e0!3m2!1sen!2sin!4v1709881203232!5m2!1sen!2sin";
const MAP_DIRECTIONS_LINK = "https://www.google.com/maps/search/?api=1&query=BEAM%20LLP";

const CONTACT_METHODS = [
  {
    icon: "call",
    title: "Call Us",
    value: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE_LINK}`,
  },
  {
    icon: "chat",
    title: "WhatsApp",
    value: CONTACT_PHONE,
    href: WHATSAPP_LINK,
    openInNewTab: true,
    online: true,
  },
  {
    icon: "mail",
    title: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: "pin_drop",
    title: "Visit Us",
    value: "Pune and CBD Belapur",
    href: "#locations",
  },
];
const CONTACT_ICON_MAP = {
  call: PhoneCall,
  chat: MessageCircle,
  mail: Mail,
  pin_drop: MapPin,
};

const OFFICE_LOCATIONS = [
  {
    title: "Head Office",
    address:
      "Pap J 188, J Block, 2nd Floor, Near Quality Forum Circle, Gawali Mata Chowk, Bhosari - 411026",
  },
  {
    title: "Technical Center Address",
    address:
      "301 Vishnu Commercial Complex, Plot No. 36, Sector 15, CBD Belapur, Pin Code - 400614",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");
    setFormStatus("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setFormError("Please fill Name, Email, and Message.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(payload.email);
    if (!isValidEmail) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const subject = `Contact Query - ${payload.name}`;
    const bodyLines = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Mobile No.: ${payload.phone || "Not provided"}`,
      "",
      "Message:",
      payload.message,
    ];

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    setFormStatus("Opening your email app...");
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ct-page {
          --ct-ink-950: #081a32;
          --ct-ink-900: #0e2849;
          --ct-blue-700: #0369a1;
          --ct-blue-600: #0284c7;
          --ct-cyan-400: #22d3ee;
          --ct-slate-700: #334155;
          --ct-slate-600: #475569;
          --ct-slate-300: #cbd5e1;
          --ct-slate-200: #e2e8f0;
          --ct-soft: #f4fbff;
          --ct-success: #16a34a;
          font-family: 'Manrope', sans-serif;
          color: var(--ct-slate-700);
          overflow-x: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #f7fcff 100%);
        }

        .ct-shell {
          width: min(1160px, calc(100% - 48px));
          margin: 0 auto;
        }

        .ct-hero {
          position: relative;
          min-height: 560px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-image:
            linear-gradient(120deg, rgba(8, 26, 50, 0.93) 0%, rgba(3, 105, 161, 0.82) 55%, rgba(34, 211, 238, 0.55) 100%),
            url('${contactHeroImageSrc}');
          background-size: cover;
          background-position: center;
        }

        .ct-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px);
          background-size: 34px 34px;
          opacity: 0.25;
          animation: ct-drift 24s linear infinite;
          pointer-events: none;
        }

        @keyframes ct-drift {
          from { background-position: 0 0; }
          to { background-position: 34px 34px; }
        }

        .ct-hero-inner {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 48px));
          margin: 0 auto;
          padding: 86px 0;
        }

        .ct-crumb {
          color: rgba(255, 255, 255, 0.72);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }

        .ct-hero-title {
          font-family: 'Manrope', sans-serif;
          color: #ffffff;
          font-size: clamp(34px, 6vw, 62px);
          line-height: 1.06;
          max-width: 760px;
          letter-spacing: -0.015em;
        }

        .ct-hero-title em {
          font-style: normal;
          color: var(--ct-cyan-400);
        }

        .ct-hero-copy {
          margin-top: 18px;
          max-width: 730px;
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.78;
          color: rgba(255, 255, 255, 0.9);
        }

        .ct-hero-actions {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ct-btn {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          padding: 12px 20px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }

        .ct-btn-main {
          background: #ffffff;
          color: var(--ct-blue-700);
          box-shadow: 0 12px 24px rgba(2, 6, 23, 0.22);
        }

        .ct-btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 30px rgba(2, 6, 23, 0.26);
        }

        .ct-btn-ghost {
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.62);
          background: rgba(255, 255, 255, 0.1);
        }

        .ct-btn-ghost:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.2);
        }

        .ct-online-pill {
          margin-left: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 7px 12px;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.42);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .ct-online-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.8);
          animation: ct-pulse 1.8s infinite;
        }

        @keyframes ct-pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.75); }
          70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .ct-methods {
          position: relative;
          margin-top: -44px;
          padding-bottom: 14px;
          z-index: 3;
        }

        .ct-method-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .ct-method-card {
          position: relative;
          text-decoration: none;
          color: inherit;
          border: 1px solid var(--ct-slate-200);
          background: #ffffff;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 12px 28px rgba(2, 132, 199, 0.09);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          display: grid;
          gap: 10px;
          min-height: 122px;
        }

        .ct-method-card:hover {
          transform: translateY(-3px);
          border-color: #bae6fd;
          box-shadow: 0 20px 36px rgba(2, 132, 199, 0.15);
        }

        .ct-method-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background: linear-gradient(140deg, var(--ct-blue-700), var(--ct-cyan-400));
        }

        .ct-method-icon svg {
          width: 20px;
          height: 20px;
          stroke-width: 2.2;
        }

        .ct-method-title {
          font-family: 'Manrope', sans-serif;
          color: var(--ct-ink-900);
          font-size: 17px;
          line-height: 1.25;
        }

        .ct-method-value {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ct-slate-600);
        }

        .ct-method-online {
          position: absolute;
          right: 14px;
          top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
          color: #166534;
          border-radius: 999px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 700;
        }

        .ct-main {
          padding: 46px 0 26px;
        }

        .ct-main-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 18px;
          align-items: start;
        }

        .ct-panel {
          background: #ffffff;
          border: 1px solid var(--ct-slate-200);
          border-radius: 16px;
          box-shadow: 0 12px 28px rgba(2, 132, 199, 0.08);
          padding: 24px;
        }

        .ct-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--ct-blue-700);
          border: 1px solid #bae6fd;
          background: #f0f9ff;
          border-radius: 999px;
          padding: 6px 12px;
        }

        .ct-title {
          margin-top: 13px;
          font-family: 'Manrope', sans-serif;
          color: var(--ct-ink-950);
          font-size: clamp(26px, 3.6vw, 38px);
          line-height: 1.15;
        }

        .ct-title em {
          color: var(--ct-blue-600);
          font-style: normal;
        }

        .ct-divider {
          width: 56px;
          height: 3px;
          border-radius: 3px;
          margin-top: 16px;
          background: linear-gradient(90deg, var(--ct-blue-600), var(--ct-cyan-400));
        }

        .ct-copy {
          margin-top: 14px;
          font-size: 14.5px;
          line-height: 1.8;
          color: var(--ct-slate-600);
        }

        .ct-company {
          margin-top: 20px;
          border: 1px solid #dbeafe;
          background: #f8fcff;
          border-radius: 12px;
          padding: 14px;
          display: grid;
          gap: 6px;
        }

        .ct-company h3 {
          font-family: 'Manrope', sans-serif;
          font-size: 18px;
          color: var(--ct-ink-900);
          line-height: 1.35;
        }

        .ct-company p {
          font-size: 13px;
          color: var(--ct-slate-600);
          line-height: 1.65;
        }

        .ct-office-grid {
          margin-top: 16px;
          display: grid;
          gap: 12px;
        }

        .ct-office {
          border: 1px solid var(--ct-slate-200);
          border-radius: 12px;
          padding: 14px;
          background: #ffffff;
        }

        .ct-office h4 {
          font-family: 'Manrope', sans-serif;
          font-size: 16px;
          color: var(--ct-ink-900);
          margin-bottom: 8px;
        }

        .ct-office p {
          font-size: 13.5px;
          color: var(--ct-slate-600);
          line-height: 1.7;
        }

        .ct-link-grid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .ct-link {
          border: 1px solid var(--ct-slate-200);
          border-radius: 10px;
          padding: 11px 10px;
          text-decoration: none;
          color: inherit;
          background: #ffffff;
          display: grid;
          justify-items: center;
          gap: 5px;
          transition: border-color 0.18s ease, transform 0.18s ease;
        }

        .ct-link:hover {
          transform: translateY(-2px);
          border-color: #bae6fd;
        }

        .ct-link-icon {
          color: var(--ct-blue-600);
        }

        .ct-link-icon svg {
          width: 21px;
          height: 21px;
          stroke-width: 2.2;
        }

        .ct-link span:last-child {
          font-size: 12px;
          font-weight: 700;
          color: var(--ct-slate-700);
        }

        .ct-form-title {
          font-family: 'Manrope', sans-serif;
          color: var(--ct-ink-900);
          font-size: 27px;
          line-height: 1.2;
        }

        .ct-form-copy {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.75;
          color: var(--ct-slate-600);
        }

        .ct-form {
          margin-top: 16px;
          display: grid;
          gap: 12px;
        }

        .ct-field {
          display: grid;
          gap: 6px;
        }

        .ct-field label {
          font-size: 13px;
          font-weight: 700;
          color: var(--ct-slate-700);
        }

        .ct-field input,
        .ct-field textarea {
          width: 100%;
          border: 1px solid var(--ct-slate-300);
          border-radius: 10px;
          padding: 11px 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          color: var(--ct-ink-900);
          background: #ffffff;
          outline: none;
          transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }

        .ct-field input:focus,
        .ct-field textarea:focus {
          border-color: var(--ct-blue-600);
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.18);
        }

        .ct-field textarea {
          min-height: 128px;
          resize: vertical;
        }

        .ct-meta {
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .ct-count {
          font-size: 12px;
          color: var(--ct-slate-600);
        }

        .ct-error,
        .ct-status {
          font-size: 12.5px;
          line-height: 1.45;
        }

        .ct-error {
          color: #b91c1c;
        }

        .ct-status {
          color: var(--ct-success);
        }

        .ct-submit {
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          background: linear-gradient(130deg, var(--ct-blue-700), var(--ct-blue-600));
          color: #ffffff;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .ct-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 24px rgba(2, 132, 199, 0.28);
        }

        .ct-note {
          margin-top: 6px;
          font-size: 12px;
          line-height: 1.6;
          color: var(--ct-slate-600);
        }

        .ct-map-wrap {
          padding: 10px 0 86px;
        }

        .ct-map-card {
          background: #ffffff;
          border: 1px solid var(--ct-slate-200);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(2, 132, 199, 0.08);
        }

        .ct-map-head {
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          background: linear-gradient(120deg, #f8fcff, #f0f9ff);
          border-bottom: 1px solid var(--ct-slate-200);
        }

        .ct-map-head h3 {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(20px, 3vw, 28px);
          color: var(--ct-ink-900);
        }

        .ct-map-link {
          text-decoration: none;
          color: var(--ct-blue-700);
          border: 1px solid #7dd3fc;
          background: #ffffff;
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 700;
        }

        .ct-map-link:hover {
          background: #f0f9ff;
        }

        .ct-map {
          width: 100%;
          height: 410px;
          border: 0;
          display: block;
        }

        @media (max-width: 1040px) {
          .ct-main-grid {
            grid-template-columns: 1fr;
          }

          .ct-method-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .ct-shell,
          .ct-hero-inner {
            width: min(1160px, calc(100% - 32px));
          }

          .ct-hero {
            min-height: 500px;
          }

          .ct-hero-inner {
            padding: 72px 0;
          }

          .ct-link-grid {
            grid-template-columns: 1fr;
          }

          .ct-method-grid {
            grid-template-columns: 1fr;
          }

          .ct-map {
            height: 340px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-hero::after,
          .ct-online-dot,
          .ct-btn,
          .ct-method-card,
          .ct-link,
          .ct-submit {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <main className="ct-page">
        <section className="ct-hero">
          <div className="ct-hero-inner">
            <p className="ct-crumb">BeamOptics / Contact Us</p>
            <h1 className="ct-hero-title">
              Let's discuss your <em>diagnostic and optics requirements</em>
            </h1>
            <p className="ct-hero-copy">
              Connect with the BeamOptics team for product details, technical assistance,
              deployment planning, or business inquiries.
            </p>
            <div className="ct-hero-actions">
              <a href={WHATSAPP_LINK} className="ct-btn ct-btn-main" target="_blank" rel="noreferrer">
                <MessageCircle size={18} strokeWidth={2.2} />
                Start WhatsApp Chat
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="ct-btn ct-btn-ghost">
                <Mail size={18} strokeWidth={2.2} />
                Send Email
              </a>
              <span className="ct-online-pill">
                <span className="ct-online-dot" />
                Support Online
              </span>
            </div>
          </div>
        </section>

        <section className="ct-methods">
          <div className="ct-shell ct-method-grid">
            {CONTACT_METHODS.map((method) => (
              (() => {
                const MethodIcon = CONTACT_ICON_MAP[method.icon] || PhoneCall;
                return (
                  <a
                    key={method.title}
                    href={method.href}
                    className="ct-method-card"
                    target={method.openInNewTab ? "_blank" : undefined}
                    rel={method.openInNewTab ? "noreferrer" : undefined}
                  >
                    <span className="ct-method-icon">
                      <MethodIcon />
                    </span>
                    <div>
                      <h3 className="ct-method-title">{method.title}</h3>
                      <p className="ct-method-value">{method.value}</p>
                    </div>
                    {method.online && (
                      <span className="ct-method-online">
                        <span className="ct-online-dot" />
                        Online
                      </span>
                    )}
                  </a>
                );
              })()
            ))}
          </div>
        </section>

        <section className="ct-main" id="locations">
          <div className="ct-shell ct-main-grid">
            <article className="ct-panel">
              <span className="ct-label">Official Contact Details</span>
              <h2 className="ct-title">
                Reach BeamOptics through <em>phone, WhatsApp, or email</em>
              </h2>
              <div className="ct-divider" />
              <p className="ct-copy">
                The details below are based on the latest BeamOptics contact page and are
                available for direct communication with the team.
              </p>

              <div className="ct-company">
                <h3>{COMPANY_NAME}</h3>
                <p>Precision optics and diagnostic solutions partner.</p>
              </div>

              <div className="ct-office-grid">
                {OFFICE_LOCATIONS.map((office) => (
                  <div key={office.title} className="ct-office">
                    <h4>{office.title}</h4>
                    <p>{office.address}</p>
                  </div>
                ))}
              </div>

              <div className="ct-link-grid">
                <a href={`tel:${CONTACT_PHONE_LINK}`} className="ct-link">
                  <span className="ct-link-icon">
                    <PhoneCall />
                  </span>
                  <span>Call: {CONTACT_PHONE}</span>
                </a>
                <a href={WHATSAPP_LINK} className="ct-link" target="_blank" rel="noreferrer">
                  <span className="ct-link-icon">
                    <MessageCircle />
                  </span>
                  <span>WhatsApp Chat</span>
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="ct-link">
                  <span className="ct-link-icon">
                    <Mail />
                  </span>
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>
            </article>

            <article className="ct-panel" id="contact-form">
              <h2 className="ct-form-title">Get in touch</h2>
              <p className="ct-form-copy">
                Submit your details and we will open an email draft with your message to
                <strong> {CONTACT_EMAIL}</strong>. We do not send spam.
              </p>

              <form className="ct-form" onSubmit={handleSubmit}>
                <div className="ct-field">
                  <label htmlFor="ct-name">Name *</label>
                  <input
                    id="ct-name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange("name")}
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-email">Email *</label>
                  <input
                    id="ct-email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-phone">Mobile No.</label>
                  <input
                    id="ct-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    autoComplete="tel"
                    placeholder="+91"
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-message">Message *</label>
                  <textarea
                    id="ct-message"
                    value={formData.message}
                    onChange={handleChange("message")}
                    placeholder="Write your requirement..."
                    maxLength={600}
                  />
                </div>

                <div className="ct-meta">
                  <p className="ct-count">{formData.message.length}/600</p>
                  {formError ? <p className="ct-error">{formError}</p> : null}
                  {!formError && formStatus ? <p className="ct-status">{formStatus}</p> : null}
                </div>

                <button type="submit" className="ct-submit">Submit Query</button>
                <p className="ct-note">
                  For urgent support, call or WhatsApp directly on {CONTACT_PHONE}.
                </p>
              </form>
            </article>
          </div>
        </section>

        <section className="ct-map-wrap">
          <div className="ct-shell">
            <div className="ct-map-card">
              <div className="ct-map-head">
                <h3>Find us on Google Maps</h3>
                <a
                  href={MAP_DIRECTIONS_LINK}
                  className="ct-map-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Directions
                </a>
              </div>
              <iframe
                title="BeamOptics office location"
                src={MAP_EMBED_URL}
                className="ct-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
