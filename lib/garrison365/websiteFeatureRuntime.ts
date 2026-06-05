// @ts-nocheck
// Shared Garrison365 website feature runtime. Keep this file mechanically synced across template repos.

type WebsiteFeaturePayload = Record<string, any>;

const GARRISON365_RUNTIME_VERSION = "2026-06-05-shared-runtime-draft-published";

const WEBSITE_FEATURE_ALIASES: Record<string, string> = {
  ai_agent: "ai_agent",
  chat: "ai_agent",
  book_class: "book_class",
  buy_classes: "buy_classes",
  schedule: "class_schedule",
  class_schedule: "class_schedule",
  classes: "classes_catalog",
  classes_catalog: "classes_catalog",
  pricing: "pricing",
  info: "location_map",
  location: "location_map",
  location_map: "location_map",
  promo_banners: "promo_banner",
  promo_banner: "promo_banner",
  promo_carousel_bar: "promo_banner",
  announcement_bar: "announcement_bar",
  lead_capture: "lead_capture",
  lead_capture_form: "lead_capture",
  faq: "faq",
  reviews: "reviews",
  testimonials: "reviews",
  press: "press_logos",
  press_logos: "press_logos",
  instructors: "instructors",
  teachers: "instructors",
  media_carousel: "media_carousel",
  hero: "media_carousel",
  member_portal: "member_portal",
  programs: "programs",
};

const TOGGLEABLE_COMPONENTS = new Set([
  "classes_catalog",
  "class_schedule",
  "ai_agent",
  "book_class",
  "buy_classes",
  "pricing",
  "media_carousel",
  "lead_capture",
  "location_map",
  "promo_banner",
  "faq",
  "reviews",
  "press_logos",
  "instructors",
  "member_portal",
  "programs",
  "announcement_bar",
]);

function shouldAutoMarkSection(feature: string) {
  return TOGGLEABLE_COMPONENTS.has(canonicalFeatureName(feature));
}

function ensureSectionMarkers(node: Element, feature: string) {
  const el = node as HTMLElement;
  if (!el || !shouldAutoMarkSection(feature)) return;
  el.setAttribute("data-garrison-section-ready", "true");

  if (
    !el.querySelector('[data-garrison-section-field="title"]') &&
    !el.querySelector("[data-garrison-section-title]")
  ) {
    const titleNode = el.querySelector(
      'h1, h2, h3, [data-garrison-text], [class*="title"], [class*="heading"], [class*="headline"]',
    ) as HTMLElement | null;
    if (titleNode) {
      titleNode.setAttribute("data-garrison-section-title", "true");
      titleNode.setAttribute("data-garrison-section-field", "title");
    }
  }

  if (
    !el.querySelector('[data-garrison-section-field="cta"]') &&
    !el.querySelector("[data-garrison-section-cta]")
  ) {
    const ctaNode = el.querySelector(
      'a, button, [role="button"], [class*="cta"], [class*="btn"]',
    ) as HTMLElement | null;
    if (ctaNode) {
      ctaNode.setAttribute("data-garrison-section-cta", "true");
      ctaNode.setAttribute("data-garrison-section-field", "cta");
      if (ctaNode.tagName === "A") {
        ctaNode.setAttribute("data-garrison-section-cta-href", "true");
      }
    }
  }

  if (!el.querySelector("[data-garrison-section-item]")) {
    el.querySelectorAll(
      'article, li, [class*="card"], [class*="item"], [class*="tile"], [class*="plan"], [class*="class"]',
    ).forEach((item, index) => {
      if (index < 24 && item !== el) {
        (item as HTMLElement).setAttribute(
          "data-garrison-section-item",
          "true",
        );
      }
    });
  }
}

function canonicalFeatureName(value?: string | null) {
  if (!value) return "";
  return WEBSITE_FEATURE_ALIASES[value] || value;
}

function featureEnabled(payload: WebsiteFeaturePayload, feature: string) {
  switch (feature) {
    case "ai_agent":
      return (
        payload.show_ai_agent !== false && payload.widgets_ai_chat !== false
      );
    case "book_class":
      return payload.show_book_class !== false;
    case "buy_classes":
      return payload.show_buy_classes !== false;
    case "pricing":
      return (
        payload.show_buy_classes !== false && payload.show_pricing !== false
      );
    case "promo_banner":
      return payload.show_promo_banner !== false;
    case "announcement_bar":
      return (
        payload.show_announcement_bar === true ||
        payload.announcement_enabled === true
      );
    case "lead_capture":
      return payload.show_lead_capture !== false;
    case "faq":
      return payload.show_faq !== false;
    case "reviews":
      return (
        payload.show_testimonials !== false && payload.show_reviews !== false
      );
    case "press_logos":
      return payload.show_press_logos !== false;
    case "media_carousel":
      return payload.show_media_carousel !== false;
    case "location_map":
      return payload.show_location_map !== false;
    case "instructors":
      return payload.show_instructors !== false;
    case "member_portal":
      return (
        payload.show_member_portal === true || payload.portal_enabled === true
      );
    case "programs":
      return (
        payload.show_programs === true || payload.widgets_programs === true
      );
    case "classes_catalog":
    case "class_schedule":
      return payload.show_schedule !== false && payload.show_classes !== false;
    default:
      return true;
  }
}

function ensureUniversalStyle() {
  if (document.getElementById("g365-universal-style")) return;
  const style = document.createElement("style");
  style.id = "g365-universal-style";
  style.textContent = `
    .g365-universal-section { padding: 72px 24px; background: color-mix(in srgb, var(--cg-bg, #0b0b0b) 94%, var(--cg-primary, #7c3aed) 6%); color: var(--cg-text, inherit); font-family: var(--cg-body-font, inherit); }
    .g365-universal-inner { max-width: 1120px; margin: 0 auto; }
    .g365-universal-kicker { color: var(--cg-primary, #7c3aed); text-transform: uppercase; letter-spacing: .18em; font-size: 12px; font-weight: 800; margin-bottom: 12px; }
    .g365-universal-title { font-family: var(--cg-heading-font, inherit); font-size: clamp(32px, 5vw, 58px); line-height: 1; margin: 0 0 18px; }
    .g365-universal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    .g365-universal-card { border: 1px solid color-mix(in srgb, currentColor 16%, transparent); border-radius: var(--cg-radius, 18px); padding: 22px; background: color-mix(in srgb, var(--cg-bg, #0b0b0b) 86%, currentColor 8%); }
    .g365-universal-card p { opacity: .72; line-height: 1.55; margin: 8px 0 0; }
    .g365-promo-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; display: flex; justify-content: center; align-items: center; gap: 18px; padding: 14px 20px; background: var(--g365-promo-bg, var(--cg-primary, #2d275f)); color: var(--g365-promo-text, #fff); font-weight: 900; text-transform: uppercase; letter-spacing: .08em; }
    .g365-promo-bar a, .g365-universal-btn { color: inherit; border: 1px solid currentColor; border-radius: 999px; padding: 9px 16px; text-decoration: none; }
    .g365-ai-agent { position: fixed; right: 20px; bottom: 78px; z-index: 61; width: min(380px, calc(100vw - 32px)); border-radius: 20px; overflow: hidden; box-shadow: 0 24px 70px rgba(0,0,0,.24); background: #fff; color: #111; }
    .g365-ai-agent iframe { width: 100%; height: 520px; border: 0; display: block; }
    .g365-ai-bubble { padding: 14px 16px; display: flex; gap: 12px; align-items: center; }
    .g365-ai-dot { width: 42px; height: 42px; border-radius: 999px; background: var(--cg-primary, #7c3aed); color: #fff; display: grid; place-items: center; font-weight: 900; flex: 0 0 auto; }
    .g365-intro-modal { position: fixed; inset: 0; z-index: 70; display: none; place-items: center; background: rgba(0,0,0,.38); padding: 24px; }
    .g365-intro-modal.active { display: grid; }
    .g365-intro-card { width: min(720px, 96vw); border-radius: 24px; overflow: hidden; background: var(--g365-offer-bg, #fff); color: var(--g365-offer-text, #241f5f); box-shadow: 0 32px 100px rgba(0,0,0,.32); padding: 42px; text-align: center; }
    .g365-intro-card h2 { font-size: clamp(42px, 8vw, 82px); line-height: .95; margin: 0 0 18px; }
    .g365-intro-card button, .g365-intro-card a { border: 0; border-radius: 999px; padding: 16px 28px; background: currentColor; color: var(--g365-offer-bg, #fff); text-decoration: none; text-transform: uppercase; font-weight: 900; letter-spacing: .12em; }
    .g365-intro-close { position: absolute; top: 18px; right: 22px; background: transparent !important; color: inherit !important; padding: 0 !important; font-size: 28px; }
    @media (max-width: 720px) { .g365-promo-bar { flex-direction: column; text-align: center; } .g365-ai-agent { left: 16px; right: 16px; bottom: 96px; width: auto; } }
  `;
  document.head.appendChild(style);
}

function upsertUniversal(id: string, enabled: boolean, html: string) {
  const existing = document.getElementById(id);
  if (!enabled) {
    existing?.remove();
    return null;
  }
  const wrapper = existing || document.createElement("div");
  wrapper.id = id;
  wrapper.innerHTML = html;
  if (!existing) document.body.appendChild(wrapper);
  return wrapper;
}

function sectionStyle(payload: WebsiteFeaturePayload, key: string) {
  return (payload.section_styles && payload.section_styles[key]) || {};
}

function cssColor(value: string) {
  if (!value) return value;
  return value.startsWith("#") ? value : "#" + value;
}

function sectionInlineStyle(style: any) {
  const rules = [];
  if (style.bg_color) rules.push("background:" + cssColor(style.bg_color));
  if (style.text_color) rules.push("color:" + cssColor(style.text_color));
  return rules.length ? ' style="' + rules.join(";") + '"' : "";
}

function sectionLayoutClass(style: any) {
  return (
    "g365-layout-" + String(style.layout || "grid").replace(/[^a-z0-9_-]/gi, "")
  );
}

function limitItems(items: any[], style: any, fallback: number) {
  const max = Number(style.max_items || fallback);
  return items.slice(0, Number.isFinite(max) && max > 0 ? max : fallback);
}

function renderSectionShell(
  key: string,
  kicker: string,
  title: string,
  style: any,
  body: string,
) {
  const cta = style.cta_label
    ? '<p><a class="g365-universal-btn" data-garrison-text="sections.' +
      key +
      '.cta" href="' +
      (style.cta_url || "#") +
      '">' +
      style.cta_label +
      "</a></p>"
    : "";
  return (
    '<section class="g365-universal-section ' +
    sectionLayoutClass(style) +
    '" data-garrison-component="' +
    key +
    '" data-garrison-rendered="true"' +
    sectionInlineStyle(style) +
    '><div class="g365-universal-inner"><p class="g365-universal-kicker" data-garrison-text="sections.' +
    key +
    '.kicker">' +
    kicker +
    '</p><h2 class="g365-universal-title" data-garrison-text="sections.' +
    key +
    '.title">' +
    (style.title || title) +
    "</h2>" +
    body +
    cta +
    "</div></section>"
  );
}

function markRenderedFeature(feature: string, rendered: boolean) {
  const id = "g365-rendered-" + feature;
  const existing = document.getElementById(id);
  if (!rendered) {
    existing?.remove();
    return;
  }
  const marker = existing || document.createElement("div");
  marker.id = id;
  marker.hidden = true;
  marker.setAttribute("aria-hidden", "true");
  marker.setAttribute("data-garrison-rendered-component", feature);
  if (!existing) document.body.appendChild(marker);
}

function resolveBinding(payload: WebsiteFeaturePayload, path: string) {
  const direct: Record<string, any> = {
    "gym.name": payload.gym_name,
    "brand.tagline": payload.tagline,
    "brand.hero_headline": payload.hero_headline,
    "brand.hero_cta_text": payload.hero_cta_text,
    "brand.book_class_url": payload.book_class_url,
    "brand.buy_classes_url": payload.buy_classes_url,
    "brand.buy_classes_cta": payload.buy_classes_cta || "Buy Classes",
    "brand.promo_text": payload.promo_text,
    "brand.promo_cta": payload.promo_cta,
    "brand.intro_offer.badge": payload.intro_offer_badge,
    "brand.intro_offer.title": payload.intro_offer_title,
    "brand.intro_offer.subtitle": payload.intro_offer_subtitle,
    "brand.intro_offer.cta": payload.intro_offer_cta,
    "sections.classes_catalog.title": payload.classes_headline,
    "sections.class_schedule.title": payload.schedule_headline,
    "sections.pricing.title": payload.pricing_headline,
    "sections.reviews.title": payload.reviews_headline,
    "sections.testimonials.title": payload.reviews_headline,
    "sections.faq.title": payload.faq_headline,
    "sections.instructors.title": payload.instructors_headline,
    "sections.press_logos.title": payload.press_headline,
    "sections.location.title": payload.location_headline,
    "sections.media_carousel.title": payload.media_carousel_headline,
  };
  if (
    direct[path] !== undefined &&
    direct[path] !== null &&
    direct[path] !== ""
  ) {
    return direct[path];
  }

  const content = payload.site_content || {};
  const value = path.split(".").reduce((acc: any, part) => {
    if (acc === undefined || acc === null) return undefined;
    return acc[part];
  }, content);
  return value;
}

function applyTextAndHrefBindings(payload: WebsiteFeaturePayload) {
  document.querySelectorAll("[data-garrison-text]").forEach((node) => {
    const el = node as HTMLElement;
    const path = el.getAttribute("data-garrison-text") || "";
    const value = resolveBinding(payload, path);
    if (value === undefined || value === null || value === "") return;
    el.textContent = String(value);
  });

  document.querySelectorAll("[data-garrison-href]").forEach((node) => {
    const el = node as HTMLAnchorElement;
    const path = el.getAttribute("data-garrison-href") || "";
    const value = resolveBinding(payload, path);
    if (value === undefined || value === null || value === "") return;
    el.href = String(value);
  });
}

export function applyWebsiteFeatureRuntime(payload: WebsiteFeaturePayload) {
  ensureUniversalStyle();
  (window as any).GARRISON365_RUNTIME_VERSION = GARRISON365_RUNTIME_VERSION;
  applyTextAndHrefBindings(payload);

  const markerHost =
    document.getElementById("g365-widget-markers") ||
    document.createElement("div");
  markerHost.id = "g365-widget-markers";
  markerHost.hidden = true;
  markerHost.setAttribute("aria-hidden", "true");
  markerHost.setAttribute(
    "data-garrison-runtime-version",
    GARRISON365_RUNTIME_VERSION,
  );
  markerHost.innerHTML = Object.keys(WEBSITE_FEATURE_ALIASES)
    .map((name) => `<div data-garrison-widget="${name}"></div>`)
    .join("");
  if (!markerHost.parentNode) document.body.appendChild(markerHost);

  document.querySelectorAll("[data-garrison-component]").forEach((node) => {
    const el = node as HTMLElement;
    const feature = canonicalFeatureName(
      el.getAttribute("data-garrison-component"),
    );
    ensureSectionMarkers(el, feature);
    if (TOGGLEABLE_COMPONENTS.has(feature)) {
      el.style.display = featureEnabled(payload, feature) ? "" : "none";
    }
    if (feature && el.dataset.garrisonClickBound !== "true") {
      el.dataset.garrisonClickBound = "true";
      el.addEventListener("click", () => {
        window.parent?.postMessage(
          {
            type: "GARRISON365_COMPONENT_CLICK",
            payload: { component: feature },
          },
          "*",
        );
      });
    }
  });

  const siteContent = payload.site_content || {};

  const faqStyle = sectionStyle(payload, "faq");
  const faqItems = limitItems(
    siteContent.faq || [
      {
        question: "How do I book my first class?",
        answer:
          "Use the booking button and choose the best intro option for your schedule.",
      },
      {
        question: "Do beginners need experience?",
        answer:
          "No. The studio can guide new members into the right class level.",
      },
      {
        question: "Where is the studio located?",
        answer:
          payload.gym_address || "Add the studio address in Website settings.",
      },
    ],
    faqStyle,
    4,
  );
  const faqRendered =
    featureEnabled(payload, "faq") &&
    !document.querySelector('[data-garrison-component="faq"]');
  upsertUniversal(
    "g365-universal-faq",
    faqRendered,
    renderSectionShell(
      "faq",
      "FAQ",
      payload.faq_headline || "Questions, answered",
      faqStyle,
      '<div class="g365-universal-grid">' +
        faqItems
          .map(
            (item: any, index: number) =>
              '<article class="g365-universal-card"><strong data-garrison-text="sections.faq.items.' +
              index +
              '.question">' +
              (item.question || item) +
              '</strong><p data-garrison-text="sections.faq.items.' +
              index +
              '.answer">' +
              (item.answer || "Add the answer in Website content.") +
              "</p></article>",
          )
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("faq", faqRendered);

  const reviewStyle = sectionStyle(payload, "reviews");
  const reviews = limitItems(
    siteContent.reviews ||
      siteContent.testimonials || [
        {
          quote: "A polished, high-converting studio experience.",
          author: "Member review",
        },
        {
          quote: "Clear classes, easy booking, and a premium first impression.",
          author: "Studio client",
        },
      ],
    reviewStyle,
    3,
  );
  const reviewsRendered =
    featureEnabled(payload, "reviews") &&
    !document.querySelector(
      '[data-garrison-component="reviews"], [data-garrison-component="testimonials"]',
    );
  upsertUniversal(
    "g365-universal-reviews",
    reviewsRendered,
    renderSectionShell(
      "reviews",
      "Reviews",
      "Loved by members",
      reviewStyle,
      '<div class="g365-universal-grid">' +
        reviews
          .map(
            (item: any, index: number) =>
              '<article class="g365-universal-card"><strong data-garrison-text="sections.reviews.items.' +
              index +
              '.author">' +
              (item.author || item.name || "Member") +
              '</strong><p data-garrison-text="sections.reviews.items.' +
              index +
              '.quote">' +
              (item.quote || item.text || item.review || item) +
              "</p></article>",
          )
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("reviews", reviewsRendered);

  const pressStyle = sectionStyle(payload, "press");
  const pressItems = limitItems(
    siteContent.press ||
      siteContent.press_logos || ["Vogue", "Goop", "Shape", "Well+Good"],
    pressStyle,
    6,
  );
  const pressRendered =
    featureEnabled(payload, "press_logos") &&
    !document.querySelector(
      '[data-garrison-component="press_logos"], [data-garrison-component="press"]',
    );
  upsertUniversal(
    "g365-universal-press",
    pressRendered,
    renderSectionShell(
      "press_logos",
      "As seen in",
      "Trusted by the community",
      pressStyle,
      '<div class="g365-universal-grid">' +
        pressItems
          .map((item: any, index: number) => {
            const label = item.publication || item.name || item.logo || item;
            const quote = item.quote
              ? '<p data-garrison-text="sections.press_logos.items.' +
                index +
                '.quote">' +
                item.quote +
                "</p>"
              : "";
            return (
              '<article class="g365-universal-card"><strong data-garrison-text="sections.press_logos.items.' +
              index +
              '.label">' +
              label +
              "</strong>" +
              quote +
              "</article>"
            );
          })
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("press_logos", pressRendered);

  const instructorStyle = sectionStyle(payload, "instructors");
  const instructors = limitItems(
    siteContent.instructors || siteContent.featured_teachers || [],
    instructorStyle,
    4,
  );
  const instructorsRendered =
    featureEnabled(payload, "instructors") &&
    instructors.length > 0 &&
    !document.querySelector(
      '[data-garrison-component="instructors"], [data-garrison-component="teachers"]',
    );
  upsertUniversal(
    "g365-universal-instructors",
    instructorsRendered,
    renderSectionShell(
      "instructors",
      "Instructors",
      "Meet the team",
      instructorStyle,
      '<div class="g365-universal-grid">' +
        instructors
          .map(
            (item: any, index: number) =>
              '<article class="g365-universal-card"><strong data-garrison-text="sections.instructors.items.' +
              index +
              '.name">' +
              (item.website_name ||
                item.name ||
                item.full_name ||
                "Instructor") +
              '</strong><p data-garrison-text="sections.instructors.items.' +
              index +
              '.bio">' +
              (item.website_bio ||
                item.bio ||
                item.website_title ||
                item.role ||
                item.title ||
                "Certified studio instructor.") +
              "</p></article>",
          )
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("instructors", instructorsRendered);

  const locationStyle = sectionStyle(payload, "location");
  const locationContent = siteContent.location || {};
  const locationRendered =
    featureEnabled(payload, "location_map") &&
    !document.querySelector(
      '[data-garrison-component="location_map"], [data-garrison-component="info"]',
    );
  upsertUniversal(
    "g365-universal-location",
    locationRendered,
    renderSectionShell(
      "location_map",
      "Location",
      payload.location_headline || locationContent.title || "Find us near you",
      locationStyle,
      '<div class="g365-universal-card"><strong data-garrison-text="sections.location.name">' +
        (locationContent.name || payload.gym_name || "Studio") +
        '</strong><p data-garrison-text="sections.location.address">' +
        (locationContent.address ||
          payload.gym_address ||
          [payload.local_neighborhood, payload.local_city]
            .filter(Boolean)
            .join(", ") ||
          "Add address in Website settings.") +
        "</p>" +
        (payload.google_maps_url
          ? '<p><a class="g365-universal-btn" data-garrison-text="sections.location.cta" href="' +
            payload.google_maps_url +
            '">Open map</a></p>'
          : "") +
        "</div>",
    ),
  );
  markRenderedFeature("location_map", locationRendered);

  upsertUniversal(
    "g365-universal-promo",
    featureEnabled(payload, "promo_banner"),
    `<div class="g365-promo-bar" data-garrison-component="promo_banner" style="--g365-promo-bg:${payload.promo_bg_color || payload.primary_color || "#2d275f"};--g365-promo-text:${payload.promo_text_color || "#fff"}"><span data-garrison-text="brand.promo_text">${payload.promo_text || "New here? Unlock your intro offer."}</span><a data-garrison-text="brand.promo_cta" href="${payload.promo_url || payload.book_class_url || "#"}">${payload.promo_cta || "Claim offer"}</a></div>`,
  );
  markRenderedFeature("promo_banner", featureEnabled(payload, "promo_banner"));

  const modal = upsertUniversal(
    "g365-universal-intro-offer",
    featureEnabled(payload, "promo_banner") &&
      payload.show_intro_offer !== false,
    `<div class="g365-intro-modal active" data-garrison-component="intro_offer"><div class="g365-intro-card" style="--g365-offer-bg:${payload.intro_offer_bg_color || "#fff"};--g365-offer-text:${payload.intro_offer_text_color || "#241f5f"}"><button class="g365-intro-close" type="button">x</button><h2 data-garrison-text="brand.intro_offer.title">${payload.intro_offer_title || "Exclusive Intro Offer"}<br>${payload.intro_offer_badge || "Save Today"}</h2><p data-garrison-text="brand.intro_offer.subtitle">${payload.intro_offer_subtitle || "Enter your email to claim your exclusive offer."}</p><a data-garrison-text="brand.intro_offer.cta" href="${payload.book_class_url || payload.promo_url || "#"}">${payload.intro_offer_cta || "Claim my offer"}</a></div></div>`,
  );
  markRenderedFeature(
    "intro_offer",
    featureEnabled(payload, "promo_banner") &&
      payload.show_intro_offer !== false,
  );
  modal?.querySelector(".g365-intro-close")?.addEventListener("click", () => {
    modal.querySelector(".g365-intro-modal")?.classList.remove("active");
  });

  upsertUniversal(
    "g365-universal-ai",
    featureEnabled(payload, "ai_agent"),
    `<div class="g365-ai-agent" data-garrison-component="ai_agent">${payload.ai_agent_widget_url ? `<iframe src="${payload.ai_agent_widget_url}" title="AI sales agent"></iframe>` : `<div class="g365-ai-bubble"><div class="g365-ai-dot">AI</div><div><strong>${payload.ai_agent_name || "AI Sales Agent"}</strong><p>${payload.ai_agent_greeting || "Need help choosing a class or offer?"}</p></div></div>`}</div>`,
  );
  markRenderedFeature("ai_agent", featureEnabled(payload, "ai_agent"));

  const classItems = limitItems(
    siteContent.classes || siteContent.class_catalog || [],
    sectionStyle(payload, "classes_catalog"),
    6,
  );
  const classesRendered =
    featureEnabled(payload, "classes_catalog") &&
    classItems.length > 0 &&
    !document.querySelector(
      '[data-garrison-component="classes_catalog"], [data-garrison-component="classes"]',
    );
  upsertUniversal(
    "g365-universal-classes-catalog",
    classesRendered,
    renderSectionShell(
      "classes_catalog",
      "Classes",
      payload.classes_headline || "Explore classes",
      sectionStyle(payload, "classes_catalog"),
      '<div class="g365-universal-grid">' +
        classItems
          .map(
            (item: any, index: number) =>
              '<article class="g365-universal-card"><strong data-garrison-text="sections.classes_catalog.items.' +
              index +
              '.name">' +
              (item.website_name || item.name || "Class") +
              '</strong><p data-garrison-text="sections.classes_catalog.items.' +
              index +
              '.description">' +
              (item.website_description ||
                item.description ||
                item.difficulty_level ||
                "Configured class offering.") +
              "</p></article>",
          )
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("classes_catalog", classesRendered);

  const scheduleItems = limitItems(
    siteContent.schedule || siteContent.classes || [],
    sectionStyle(payload, "class_schedule"),
    4,
  );
  const scheduleRendered =
    featureEnabled(payload, "class_schedule") &&
    scheduleItems.length > 0 &&
    !document.querySelector(
      '[data-garrison-component="class_schedule"], [data-garrison-component="schedule"]',
    );
  upsertUniversal(
    "g365-universal-class-schedule",
    scheduleRendered,
    renderSectionShell(
      "class_schedule",
      "Schedule",
      payload.schedule_headline || "Book your next class",
      sectionStyle(payload, "class_schedule"),
      '<div class="g365-universal-grid">' +
        scheduleItems
          .map(
            (item: any, index: number) =>
              '<article class="g365-universal-card"><strong data-garrison-text="sections.class_schedule.items.' +
              index +
              '.name">' +
              (item.website_name || item.name || "Class") +
              '</strong><p data-garrison-text="sections.class_schedule.items.' +
              index +
              '.meta">' +
              (item.duration_minutes
                ? item.duration_minutes + " min"
                : "Schedule-ready") +
              (item.difficulty_level ? " · " + item.difficulty_level : "") +
              '</p><p><a class="g365-universal-btn" data-garrison-text="sections.class_schedule.cta" href="' +
              (payload.book_class_url || "#") +
              '">Book class</a></p></article>',
          )
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("class_schedule", scheduleRendered);

  const pricingItems = limitItems(
    siteContent.plans || siteContent.pricing || [],
    sectionStyle(payload, "pricing"),
    4,
  );
  const pricingRendered =
    featureEnabled(payload, "pricing") &&
    pricingItems.length > 0 &&
    !document.querySelector('[data-garrison-component="pricing"]');
  upsertUniversal(
    "g365-universal-pricing",
    pricingRendered,
    renderSectionShell(
      "pricing",
      "Pricing",
      payload.pricing_headline || "Choose your plan",
      sectionStyle(payload, "pricing"),
      '<div class="g365-universal-grid">' +
        pricingItems
          .map((item: any) => {
            const price =
              item.price || item.amount || item.formatted_price || "";
            return (
              '<article class="g365-universal-card"><strong data-garrison-text="sections.pricing.items.name">' +
              (item.website_name || item.name || "Plan") +
              '</strong><p data-garrison-text="sections.pricing.items.price">' +
              (price ? "$" + price + " " : "") +
              (item.billing_cycle || item.interval || "") +
              '</p><p data-garrison-text="sections.pricing.items.description">' +
              (item.website_description ||
                item.description ||
                "Configured membership option.") +
              "</p></article>"
            );
          })
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature("pricing", pricingRendered);

  upsertUniversal(
    "g365-universal-lead-capture",
    featureEnabled(payload, "lead_capture"),
    renderSectionShell(
      "lead_capture",
      "Start here",
      payload.lead_capture_title || "Claim your intro offer",
      sectionStyle(payload, "lead_capture"),
      '<div class="g365-universal-card"><p data-garrison-text="sections.lead_capture.subtitle">' +
        (payload.lead_capture_subtitle ||
          "Share your email and the studio will help you choose the right first class.") +
        '</p><form data-garrison-widget="lead_capture" style="display:flex;gap:10px;flex-wrap:wrap"><input aria-label="Email" placeholder="Email address" style="flex:1;min-width:220px;border:1px solid currentColor;border-radius:999px;padding:14px 16px;background:transparent;color:inherit" /><a class="g365-universal-btn" href="' +
        (payload.lead_capture_url ||
          payload.promo_url ||
          payload.book_class_url ||
          "#") +
        '" data-garrison-text="sections.lead_capture.cta">' +
        (payload.lead_capture_cta || payload.intro_offer_cta || "Send") +
        "</a></form></div>",
    ),
  );
  markRenderedFeature("lead_capture", featureEnabled(payload, "lead_capture"));

  const mediaItems = limitItems(
    siteContent.media ||
      siteContent.media_carousel ||
      siteContent.gallery ||
      [payload.hero_video_url, payload.hero_image_url, payload.logo_url].filter(
        Boolean,
      ),
    sectionStyle(payload, "media_carousel"),
    6,
  );
  upsertUniversal(
    "g365-universal-media-carousel",
    featureEnabled(payload, "media_carousel") && mediaItems.length > 0,
    renderSectionShell(
      "media_carousel",
      "Inside the studio",
      payload.media_carousel_headline || "See the experience",
      sectionStyle(payload, "media_carousel"),
      '<div class="g365-universal-grid">' +
        mediaItems
          .map((item: any) => {
            const url =
              typeof item === "string"
                ? item
                : item.url || item.src || item.image_url || item.video_url;
            const label =
              typeof item === "string"
                ? "Studio media"
                : item.alt || item.title || "Studio media";
            if (!url) return "";
            if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) {
              return (
                '<video data-garrison-component="media_carousel" src="' +
                url +
                '" muted loop playsinline controls style="width:100%;border-radius:18px;object-fit:cover;aspect-ratio:4/3"></video>'
              );
            }
            return (
              '<img data-garrison-component="media_carousel" src="' +
              url +
              '" alt="' +
              label +
              '" style="width:100%;border-radius:18px;object-fit:cover;aspect-ratio:4/3" />'
            );
          })
          .join("") +
        "</div>",
    ),
  );
  markRenderedFeature(
    "media_carousel",
    featureEnabled(payload, "media_carousel") && mediaItems.length > 0,
  );

  const memberPortalEnabled = featureEnabled(payload, "member_portal");
  const programsEnabled = featureEnabled(payload, "programs");
  const memberLinks = [];
  if (memberPortalEnabled) {
    memberLinks.push(
      `<article class="g365-universal-card" data-garrison-component="member_portal"><strong data-garrison-text="sections.member_portal.title">${payload.member_portal_title || "Member Portal"}</strong><p data-garrison-text="sections.member_portal.subtitle">${payload.member_portal_subtitle || "Members can manage bookings, plans, and account details."}</p><p><a class="g365-universal-btn" href="${payload.member_portal_url || payload.portal_url || (payload.base_url && payload.gym_slug ? payload.base_url + "/member/" + payload.gym_slug : "#")}">${payload.member_portal_cta || "Open portal"}</a></p></article>`,
    );
  }
  if (programsEnabled) {
    memberLinks.push(
      `<article class="g365-universal-card" data-garrison-component="programs"><strong data-garrison-text="sections.programs.title">${payload.programs_title || "Programs"}</strong><p data-garrison-text="sections.programs.subtitle">${payload.programs_subtitle || "Showcase workshops, challenges, and signature training tracks."}</p><p><a class="g365-universal-btn" href="${payload.programs_url || payload.programs_widget_url || (payload.base_url && payload.gym_slug ? payload.base_url + "/widgets/programs/" + payload.gym_slug : "#programs")}">${payload.programs_cta || "Explore programs"}</a></p></article>`,
    );
  }
  upsertUniversal(
    "g365-universal-member-links",
    memberLinks.length > 0,
    `<section class="g365-universal-section"><div class="g365-universal-inner"><p class="g365-universal-kicker">Account</p><h2 class="g365-universal-title">Member tools</h2><div class="g365-universal-grid">${memberLinks.join("")}</div></div></section>`,
  );
  markRenderedFeature("member_portal", memberPortalEnabled);
  markRenderedFeature("programs", programsEnabled);

  upsertUniversal(
    "g365-universal-announcement",
    featureEnabled(payload, "announcement_bar"),
    `<div class="g365-promo-bar" data-garrison-component="announcement_bar" style="top:0;bottom:auto;--g365-promo-bg:${payload.announcement_bg_color || payload.primary_color || "#7c3aed"};--g365-promo-text:${payload.announcement_text_color || "#fff"}"><span>${payload.announcement_text || "Studio announcement"}</span>${payload.announcement_url ? `<a href="${payload.announcement_url}">Learn more</a>` : ""}</div>`,
  );
  markRenderedFeature(
    "announcement_bar",
    featureEnabled(payload, "announcement_bar"),
  );
  // g365-final-component-bind: bind universal sections created during this pass.
  document.querySelectorAll("[data-garrison-component]").forEach((node) => {
    const el = node as HTMLElement;
    const feature = canonicalFeatureName(
      el.getAttribute("data-garrison-component"),
    );
    ensureSectionMarkers(el, feature);
    if (TOGGLEABLE_COMPONENTS.has(feature)) {
      el.style.display = featureEnabled(payload, feature) ? "" : "none";
    }
    if (feature && el.dataset.garrisonClickBound !== "true") {
      el.dataset.garrisonClickBound = "true";
      el.addEventListener("click", () => {
        window.parent?.postMessage(
          {
            type: "GARRISON365_COMPONENT_CLICK",
            payload: { component: feature },
          },
          "*",
        );
      });
    }
  });
}
