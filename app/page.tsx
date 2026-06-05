// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { Raleway, Nunito_Sans } from "next/font/google";
import siteData from "@/lib/site-data";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--pw-font-head",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--pw-font-body",
});

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting),
        ),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useReveal();
  const [navActive, setNavActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavActive(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const css = `
    :root {
      --pw-primary: #7B2FBE;
      --pw-primary-dark: #6320A0;
      --pw-primary-light: #9B4FDE;
      --pw-bg: #F8F0FF;
      --pw-surface: #F0E6FF;
      --pw-surface2: #E8D8FF;
      --pw-text: #1A0A2E;
      --pw-text-muted: #7A6A8A;
      --pw-border: rgba(123,47,190,0.14);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--pw-bg);
      color: var(--pw-text);
      font-family: var(--pw-font-body), 'Nunito Sans', sans-serif;
      overflow-x: hidden;
    }
    .pw-head { font-family: var(--pw-font-head), 'Raleway', sans-serif; }

    /* ── NAV ── */
    .pw-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 0 48px; height: 68px;
      display: flex; align-items: center; justify-content: space-between;
      transition: background 0.3s, border-color 0.3s;
      border-bottom: 1px solid transparent;
    }
    .pw-nav.active {
      background: rgba(248,240,255,0.96);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--pw-border);
    }
    .pw-logo {
      font-size: 26px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
      color: #FFF; transition: color 0.3s;
    }
    .pw-nav.active .pw-logo { color: var(--pw-text); }
    .pw-logo span { color: #C89BFF; transition: color 0.3s; }
    .pw-nav.active .pw-logo span { color: var(--pw-primary); }
    .pw-nav-links { display: flex; gap: 36px; list-style: none; }
    .pw-nav-links a {
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
      color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.2s;
    }
    .pw-nav.active .pw-nav-links a { color: var(--pw-text-muted); }
    .pw-nav-links a:hover { color: #FFF; }
    .pw-nav.active .pw-nav-links a:hover { color: var(--pw-primary); }
    .pw-nav-cta {
      background: rgba(255,255,255,0.18); color: #FFF;
      padding: 10px 24px; font-size: 12px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
      border-radius: 4px; border: 1px solid rgba(255,255,255,0.3);
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .pw-nav.active .pw-nav-cta {
      background: var(--pw-primary); color: #FFF; border-color: var(--pw-primary);
    }
    .pw-nav-cta:hover { background: var(--pw-primary); border-color: var(--pw-primary); }
    .pw-hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      background: none; border: none; padding: 4px;
    }
    .pw-hamburger span {
      display: block; width: 24px; height: 2px;
      background: #FFF; transition: background 0.3s;
    }
    .pw-nav.active .pw-hamburger span { background: var(--pw-text); }

    /* ── HERO — CINEMATIC TOP ── */
    .pw-hero-video {
      position: relative; height: 68vh; overflow: hidden; width: 100%;
    }
    .pw-hero-video video {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover;
    }
    .pw-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom,
        rgba(26,10,46,0.4) 0%,
        rgba(26,10,46,0.2) 40%,
        rgba(26,10,46,0.7) 100%);
    }
    .pw-hero-wordmark {
      position: absolute; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 12px;
    }
    .pw-wordmark-text {
      font-size: clamp(72px, 11vw, 160px);
      font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
      color: #FFF; line-height: 1;
    }
    .pw-wordmark-text .pw-accent { color: #C89BFF; }
    .pw-wordmark-sub {
      font-size: 14px; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase;
      color: rgba(255,255,255,0.7);
    }
    .pw-scroll-hint {
      position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
    }
    .pw-scroll-dot {
      width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.6);
      animation: pw-bounce 1.4s ease-in-out infinite;
    }
    .pw-scroll-dot:nth-child(2) { animation-delay: 0.2s; }
    .pw-scroll-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pw-bounce {
      0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
      40% { opacity: 1; transform: translateY(-6px); }
    }

    /* ── INTRO STRIP ── */
    .pw-intro {
      background: var(--pw-primary);
      padding: 56px 48px;
    }
    .pw-intro-inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
    }
    .pw-intro-headline {
      font-size: clamp(32px, 3vw, 46px); font-weight: 800; color: #FFF;
      line-height: 1.12; letter-spacing: 0.02em;
    }
    .pw-intro-body {
      font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.8); font-weight: 300;
    }

    /* ── SECTIONS ── */
    .pw-section { padding: 96px 48px; }
    .pw-section-inner { max-width: 1200px; margin: 0 auto; }
    .pw-section-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--pw-primary); margin-bottom: 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .pw-section-label::after {
      content: ''; display: block; width: 40px; height: 1px; background: var(--pw-border);
    }
    .pw-section-title {
      font-size: clamp(34px, 3.2vw, 48px); font-weight: 800; line-height: 1.1;
      color: var(--pw-text); margin-bottom: 20px;
    }
    .pw-section-sub {
      font-size: 17px; line-height: 1.7; color: var(--pw-text-muted); max-width: 520px; font-weight: 300;
    }

    /* ── PILLARS ── */
    .pw-pillars { background: var(--pw-surface); }
    .pw-pillars-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 20px; margin-top: 56px;
    }
    .pw-pillar-card {
      background: var(--pw-bg); border-radius: 16px; padding: 36px 28px;
      border: 1px solid var(--pw-border);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .pw-pillar-card:hover {
      box-shadow: 0 8px 32px rgba(123,47,190,0.12);
      transform: translateY(-4px);
    }
    .pw-pillar-icon {
      width: 48px; height: 48px; border-radius: 12px;
      background: linear-gradient(135deg, var(--pw-primary), var(--pw-primary-light));
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; margin-bottom: 20px;
    }
    .pw-pillar-title {
      font-size: 17px; font-weight: 800; color: var(--pw-text); margin-bottom: 12px;
    }
    .pw-pillar-desc { font-size: 14px; line-height: 1.7; color: var(--pw-text-muted); font-weight: 300; }

    /* ── PROGRAMS ── */
    .pw-programs-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 20px; margin-top: 56px;
    }
    .pw-program-card {
      background: var(--pw-surface); border-radius: 16px; padding: 32px 28px;
      border: 1px solid var(--pw-border);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .pw-program-card:hover {
      box-shadow: 0 8px 32px rgba(123,47,190,0.1);
      transform: translateY(-3px);
    }
    .pw-program-tag {
      font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--pw-primary); margin-bottom: 12px; display: block;
    }
    .pw-program-name { font-size: 19px; font-weight: 800; color: var(--pw-text); margin-bottom: 10px; }
    .pw-program-desc { font-size: 14px; line-height: 1.65; color: var(--pw-text-muted); margin-bottom: 20px; font-weight: 300; }
    .pw-program-meta {
      display: flex; gap: 16px; font-size: 11px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--pw-text-muted);
    }
    .pw-program-meta span { display: flex; align-items: center; gap: 6px; }
    .pw-program-meta span::before { content: '·'; color: var(--pw-primary); }
    .pw-program-meta span:first-child::before { display: none; }

    /* ── PRICING ── */
    .pw-pricing { background: var(--pw-surface); }
    .pw-pricing-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 20px; margin-top: 56px;
    }
    .pw-price-card {
      background: var(--pw-bg); border-radius: 20px; padding: 44px 36px;
      border: 1px solid var(--pw-border); position: relative;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .pw-price-card:hover {
      box-shadow: 0 12px 40px rgba(123,47,190,0.12);
      transform: translateY(-4px);
    }
    .pw-price-card.featured {
      border-color: var(--pw-primary);
      box-shadow: 0 12px 40px rgba(123,47,190,0.18);
    }
    .pw-price-badge {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: var(--pw-primary); color: #FFF;
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      padding: 4px 20px; border-radius: 20px; white-space: nowrap;
    }
    .pw-price-name {
      font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--pw-text-muted); margin-bottom: 16px;
    }
    .pw-price-amount {
      font-size: 56px; font-weight: 900; color: var(--pw-text); line-height: 1; margin-bottom: 4px;
    }
    .pw-price-amount span { font-size: 18px; font-weight: 300; color: var(--pw-text-muted); }
    .pw-price-desc { font-size: 13px; color: var(--pw-text-muted); margin-bottom: 28px; font-weight: 300; }
    .pw-price-features { list-style: none; margin-bottom: 32px; }
    .pw-price-features li {
      font-size: 14px; color: var(--pw-text-muted); padding: 9px 0;
      border-bottom: 1px solid var(--pw-border);
      display: flex; align-items: center; gap: 10px;
    }
    .pw-price-features li::before { content: '✓'; color: var(--pw-primary); font-weight: 700; }
    .pw-price-cta {
      display: block; text-align: center; text-decoration: none;
      padding: 14px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
      border: 2px solid rgba(123,47,190,0.25); color: var(--pw-text); border-radius: 8px;
      transition: all 0.2s;
    }
    .pw-price-cta:hover, .pw-price-card.featured .pw-price-cta {
      background: var(--pw-primary); border-color: var(--pw-primary); color: #FFF;
    }

    /* ── CTA ── */
    .pw-cta {
      background: linear-gradient(135deg, var(--pw-primary-dark) 0%, var(--pw-primary) 100%);
      padding: 100px 48px; text-align: center;
    }
    .pw-cta-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
      color: rgba(255,255,255,0.7); margin-bottom: 20px;
    }
    .pw-cta-title {
      font-size: clamp(36px, 4vw, 60px); font-weight: 800; line-height: 1.1;
      color: #FFF; margin-bottom: 24px;
    }
    .pw-cta-sub {
      font-size: 18px; line-height: 1.65; color: rgba(255,255,255,0.75);
      max-width: 480px; margin: 0 auto 44px; font-weight: 300;
    }
    .pw-btn-white {
      background: #FFF; color: var(--pw-primary);
      padding: 18px 48px; font-size: 14px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
      border-radius: 6px; transition: all 0.2s; display: inline-block;
    }
    .pw-btn-white:hover { background: var(--pw-bg); transform: translateY(-2px); }

    /* ── STATS STRIP ── */
    .pw-stats-strip {
      background: var(--pw-bg); border-top: 1px solid var(--pw-border);
      border-bottom: 1px solid var(--pw-border); padding: 48px;
    }
    .pw-stats-inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 40px; text-align: center;
    }
    .pw-strip-num {
      font-size: 48px; font-weight: 900; color: var(--pw-primary);
      display: block; margin-bottom: 6px;
    }
    .pw-strip-label {
      font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--pw-text-muted);
    }

    /* ── FOOTER ── */
    .pw-footer {
      background: var(--pw-text); padding: 48px 48px 32px;
    }
    .pw-footer-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 24px;
    }
    .pw-footer-logo {
      font-size: 22px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(248,240,255,0.9);
    }
    .pw-footer-logo span { color: #C89BFF; }
    .pw-footer-links { display: flex; gap: 24px; list-style: none; }
    .pw-footer-links a {
      font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(248,240,255,0.45); text-decoration: none; transition: color 0.2s;
    }
    .pw-footer-links a:hover { color: rgba(248,240,255,0.9); }
    .pw-footer-copy {
      font-size: 12px; color: rgba(248,240,255,0.35); text-align: center;
      max-width: 1200px; margin: 24px auto 0;
      padding-top: 24px; border-top: 1px solid rgba(248,240,255,0.08);
    }

    /* ── REVEAL ── */
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── MOBILE ── */
    @media (max-width: 960px) {
      .pw-nav { padding: 0 24px; }
      .pw-nav-links, .pw-nav-cta { display: none; }
      .pw-hamburger { display: flex; }
      .pw-hero-video { height: 56vh; }
      .pw-intro-inner { grid-template-columns: 1fr; gap: 24px; }
      .pw-pillars-grid { grid-template-columns: 1fr 1fr; }
      .pw-programs-grid { grid-template-columns: 1fr; }
      .pw-pricing-grid { grid-template-columns: 1fr; }
      .pw-stats-inner { grid-template-columns: repeat(2, 1fr); }
      .pw-section { padding: 64px 24px; }
      .pw-cta { padding: 64px 24px; }
      .pw-stats-strip { padding: 40px 24px; }
      .pw-intro { padding: 48px 24px; }
      .pw-footer { padding: 40px 24px 24px; }
      .pw-footer-inner { flex-direction: column; align-items: flex-start; }
    }
  `;

  const pillarIcons = ["🏋️", "🧠", "🤝", "🥗"];

  return (
    <main className={`${raleway.variable} ${nunitoSans.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── NAV ── */}
      <nav className={`pw-nav${navActive ? " active" : ""}`}>
        <div className="pw-logo pw-head" data-garrison-text="gym.name">
          <span>P</span>OWER
        </div>
        <ul className="pw-nav-links">
          <li>
            <a href="#approach" data-garrison-text="nav.approach">
              Approach
            </a>
          </li>
          <li>
            <a href="#programs" data-garrison-text="nav.programs">
              Programs
            </a>
          </li>
          <li>
            <a href="#pricing" data-garrison-text="nav.pricing">
              Pricing
            </a>
          </li>
          <li>
            <a href="#contact" data-garrison-text="nav.contact">
              Contact
            </a>
          </li>
        </ul>
        <a
          href="#trial"
          className="pw-nav-cta"
          data-garrison-href="brand.book_class_url"
          data-garrison-text="brand.hero_cta_text"
        >
          Free Trial
        </a>
        <button
          className="pw-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── HERO — CINEMATIC TOP ── */}
      <section
        className="pw-hero-video"
        data-garrison-component="media_carousel"
      >
        <video ref={videoRef} autoPlay muted loop playsInline>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
        <div className="pw-hero-overlay" />
        <div className="pw-hero-wordmark">
          <div
            className="pw-wordmark-text pw-head"
            data-garrison-text="gym.name"
          >
            <span className="pw-accent">P</span>OWER
          </div>
          <div className="pw-wordmark-sub" data-garrison-text="brand.tagline">
            Women&apos;s Strength Gym · Brooklyn, NY
          </div>
        </div>
        <div className="pw-scroll-hint">
          <div className="pw-scroll-dot" />
          <div className="pw-scroll-dot" />
          <div className="pw-scroll-dot" />
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section className="pw-intro" data-garrison-component="book_class">
        <div className="pw-intro-inner">
          <h2
            data-cg-el="hero_headline_1"
            data-garrison-text="brand.hero_headline"
            className="pw-intro-headline pw-head reveal"
          >
            Train Strong.
            <br />
            Live Loud.
          </h2>
          <p
            data-cg-el="hero_subtitle"
            data-garrison-text="brand.tagline"
            className="pw-intro-body reveal"
          >
            {siteData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="pw-stats-strip">
        <div className="pw-stats-inner">
          {siteData.stats.map((s, i) => (
            <div
              key={i}
              className="reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span
                className="pw-strip-num pw-head"
                data-garrison-text={`stats.${i}.value`}
              >
                {s.value}
              </span>
              <span
                className="pw-strip-label"
                data-garrison-text={`stats.${i}.label`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="pw-section pw-pillars" id="approach">
        <div className="pw-section-inner">
          <p
            className="pw-section-label reveal"
            data-garrison-text="sections.approach.kicker"
          >
            Our Approach
          </p>
          <h2
            className="pw-section-title pw-head reveal"
            data-garrison-text="sections.approach.title"
          >
            Built on four pillars
            <br />
            that actually work.
          </h2>
          <p
            className="pw-section-sub reveal"
            data-garrison-text="sections.approach.subtitle"
          >
            Everything we do is designed to help women get stronger — in body,
            mind, and community.
          </p>
          <div className="pw-pillars-grid">
            {siteData.pillars.map((p, i) => (
              <div
                className="pw-pillar-card reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="pw-pillar-icon">{pillarIcons[i]}</div>
                <div
                  className="pw-pillar-title"
                  data-garrison-text={`sections.approach.items.${i}.title`}
                >
                  {p.title}
                </div>
                <p
                  className="pw-pillar-desc"
                  data-garrison-text={`sections.approach.items.${i}.description`}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section
        className="pw-section"
        id="programs"
        data-garrison-component="classes_catalog"
      >
        <div className="pw-section-inner">
          <p
            className="pw-section-label reveal"
            data-garrison-text="sections.classes_catalog.kicker"
          >
            Programs
          </p>
          <h2
            className="pw-section-title pw-head reveal"
            data-garrison-text="sections.classes_catalog.title"
          >
            A program for every
            <br />
            woman, every goal.
          </h2>
          <div className="pw-programs-grid">
            {siteData.programs.map((p, i) => (
              <div
                className="pw-program-card reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span
                  className="pw-program-tag"
                  data-garrison-text={`sections.classes_catalog.items.${i}.tag`}
                >
                  {p.tag}
                </span>
                <div
                  className="pw-program-name"
                  data-garrison-text={`sections.classes_catalog.items.${i}.name`}
                >
                  {p.name}
                </div>
                <p
                  className="pw-program-desc"
                  data-garrison-text={`sections.classes_catalog.items.${i}.description`}
                >
                  {p.desc}
                </p>
                <div className="pw-program-meta">
                  <span
                    data-garrison-text={`sections.classes_catalog.items.${i}.duration`}
                  >
                    {p.duration}
                  </span>
                  <span
                    data-garrison-text={`sections.classes_catalog.items.${i}.format`}
                  >
                    {p.format}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        className="pw-section pw-pricing"
        id="pricing"
        data-garrison-component="pricing"
      >
        <div className="pw-section-inner">
          <p
            className="pw-section-label reveal"
            data-garrison-text="sections.pricing.kicker"
          >
            Membership
          </p>
          <h2
            className="pw-section-title pw-head reveal"
            data-garrison-text="sections.pricing.title"
          >
            Invest in your
            <br />
            strongest self.
          </h2>
          <div className="pw-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div
                className={`pw-price-card reveal${p.featured ? " featured" : ""}`}
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {p.featured && (
                  <div
                    className="pw-price-badge"
                    data-garrison-text={`sections.pricing.items.${i}.badge`}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  className="pw-price-name"
                  data-garrison-text={`sections.pricing.items.${i}.name`}
                >
                  {p.name}
                </div>
                <div
                  className="pw-price-amount"
                  data-garrison-text={`sections.pricing.items.${i}.price`}
                >
                  ${p.price}
                  <span>/mo</span>
                </div>
                <p
                  className="pw-price-desc"
                  data-garrison-text={`sections.pricing.items.${i}.description`}
                >
                  {p.desc}
                </p>
                <ul className="pw-price-features">
                  {p.features.map((f, j) => (
                    <li
                      key={j}
                      data-garrison-text={`sections.pricing.items.${i}.features.${j}`}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#trial"
                  className="pw-price-cta"
                  data-garrison-href="brand.buy_classes_url"
                  data-garrison-text="brand.buy_classes_cta"
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="pw-cta"
        id="trial"
        data-garrison-component="lead_capture"
      >
        <p
          className="pw-cta-label reveal"
          data-garrison-text="brand.intro_offer.badge"
        >
          First Week Free
        </p>
        <h2
          className="pw-cta-title pw-head reveal"
          data-garrison-text="brand.intro_offer.title"
        >
          Your strongest chapter
          <br />
          starts here.
        </h2>
        <p
          className="pw-cta-sub reveal"
          data-garrison-text="brand.intro_offer.subtitle"
        >
          {siteData.cta.subtitle}
        </p>
        <a
          href="#contact"
          className="pw-btn-white reveal"
          data-garrison-href="brand.book_class_url"
          data-garrison-text="brand.intro_offer.cta"
        >
          Claim Free Trial
        </a>
      </section>

      <div hidden aria-hidden="true">
        <div data-garrison-widget="ai_agent" />
        <div data-garrison-widget="class_schedule" />
        <div data-garrison-widget="pricing" />
        <div data-garrison-widget="classes_catalog" />
        <div data-garrison-widget="lead_capture" />
        <div data-garrison-widget="promo_banner" />
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="pw-footer"
        id="contact"
        data-garrison-component="location_map"
      >
        <div className="pw-footer-inner">
          <div className="pw-footer-logo pw-head">
            <span>P</span>OWER
          </div>
          <ul className="pw-footer-links">
            <li>
              <a href="#approach" data-garrison-text="footer.approach">
                Approach
              </a>
            </li>
            <li>
              <a href="#programs" data-garrison-text="footer.programs">
                Programs
              </a>
            </li>
            <li>
              <a href="#pricing" data-garrison-text="footer.pricing">
                Pricing
              </a>
            </li>
          </ul>
          <div
            style={{ fontSize: "13px", color: "rgba(248,240,255,0.45)" }}
            data-garrison-text="footer.contact"
          >
            {siteData.contact.address} · {siteData.contact.phone}
          </div>
        </div>
        <p className="pw-footer-copy" data-garrison-text="footer.copyright">
          © 2026 POWER Women&apos;s Gym. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
