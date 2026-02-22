"use client";

import { useEffect } from "react";
import { useLocation } from "@/lib/nextRouterCompat";

const SECTION_BLOCKS = [
  "main section",
  ".hm-hero",
  ".hm-trust",
  ".hm-highlights",
  ".hm-industries",
  ".hm-about",
  ".hm-process",
  ".hm-cta",
  ".ab-hero",
  ".ab-story",
  ".ab-stats-wrap",
  ".ab-mv-wrap",
  ".ab-values-wrap",
  ".ab-team-wrap",
  ".ab-cert-wrap",
  ".ab-cta-wrap",
  ".sv-hero",
  ".sv-quick",
  ".sv-section",
  ".sv-cta-wrap",
  ".ct-hero",
  ".ct-methods",
  ".ct-main",
  ".ct-map-wrap",
  ".in-hero",
  ".in-main",
  ".in-section",
].join(",");

const STAGGER_GRID_ITEMS = [
  ".hm-pillar-grid > *",
  ".hm-impact-grid > *",
  ".hm-edge-grid > *",
  ".hm-exp-grid > *",
  ".hm-purpose-grid > *",
  ".ab-team-grid > *",
  ".ab-connect-grid > *",
  ".sv-quick-grid > *",
  ".ct-method-grid > *",
  ".ct-office-grid > *",
  ".ct-link-grid > *",
].join(",");

const CARD_BLOCKS = [
  ".hm-trust-item",
  ".hm-highlight-card",
  ".hm-ind-card",
  ".hm-step",
  ".ab-mv-card",
  ".ab-val",
  ".ab-tm-card",
  ".ab-cert-item",
  ".sv-quick-card",
  ".sv-card",
  ".sv-cta",
  ".ct-method-card",
  ".ct-panel",
  ".ct-office",
  ".ct-link",
  ".ct-map-card",
  ".in-side",
  ".in-option",
  ".in-metric",
  STAGGER_GRID_ITEMS,
].join(",");

const DETAIL_BLOCKS = [
  ".hm-hero-panel",
  ".ab-team-header",
  ".ab-tree-node",
  ".ab-tree-trunk",
  ".ab-tree-branch",
  ".sv-chip-row",
  ".sv-cat-tabs",
  ".sv-head-sub",
  ".ct-form",
  ".ct-field",
  ".ct-submit",
  ".ct-map-head",
  ".in-hero-inner",
  ".in-title",
  ".in-sub",
  ".in-card",
  ".in-copy",
].join(",");

const TARGET_SELECTORS = [
  SECTION_BLOCKS,
  CARD_BLOCKS,
  DETAIL_BLOCKS,
].join(",");

function getSiblingIndex(element) {
  const parent = element.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.children);
  return Math.max(0, siblings.indexOf(element));
}

function isAnimatableElement(element) {
  if (!element) return false;
  if (element.classList.contains("sm-ignore")) return false;
  if (element.closest(".sv-modal-root")) return false;
  return true;
}

function collectTargets(root = document) {
  return Array.from(root.querySelectorAll(TARGET_SELECTORS))
    .filter((element, index, all) => all.indexOf(element) === index)
    .filter(isAnimatableElement);
}

export default function ScrollAnimator() {
  const location = useLocation();

  useEffect(() => {
    const ready = new Set();
    let sectionIndex = 0;

    const isCompactViewport =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 980px), (hover: none) and (pointer: coarse)").matches;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const saveDataEnabled =
      typeof navigator !== "undefined" &&
      navigator.connection &&
      navigator.connection.saveData;

    const lowPowerDevice =
      typeof navigator !== "undefined" &&
      ((typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4) ||
        (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4));

    if (prefersReducedMotion || saveDataEnabled || lowPowerDevice) {
      collectTargets().forEach((element) => {
        element.classList.remove("sm-reveal");
        element.classList.remove("sm-in");
        element.classList.remove("sm-stagger-item");
        element.style.removeProperty("--sm-delay");
        element.style.removeProperty("--sm-duration");
        element.style.removeProperty("--sm-x");
        element.style.removeProperty("--sm-y");
        element.style.removeProperty("--sm-scale");
        element.style.removeProperty("--sm-rotate");
      });
      return undefined;
    }

    const canUseObserver = "IntersectionObserver" in window;

    const observer = canUseObserver
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("sm-in");
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: isCompactViewport ? 0.06 : 0.14,
            rootMargin: isCompactViewport ? "0px 0px 6% 0px" : "0px 0px -10% 0px",
          }
        )
      : null;

    const registerElement = (element, elementIndex = 0, reset = false) => {
      if (!isAnimatableElement(element)) return;
      if (ready.has(element) && !reset) return;

      const isSection = element.matches(SECTION_BLOCKS);
      const isCard = element.matches(CARD_BLOCKS);
      const siblingIndex = getSiblingIndex(element);
      const itemIndex = isCard ? siblingIndex : elementIndex;

      const sectionDelayStep = isCompactViewport ? 34 : 56;
      const cardDelayStep = isCompactViewport ? 36 : 54;
      const maxSectionDelay = isCompactViewport ? 190 : 280;
      const maxItemDelay = isCompactViewport ? 220 : 340;
      const delay = isSection
        ? Math.min(sectionIndex * sectionDelayStep, maxSectionDelay)
        : Math.min(itemIndex * cardDelayStep, maxItemDelay);

      if (isSection) sectionIndex += 1;

      let x = 0;
      let y = isSection ? 20 : 16;
      let scale = 0.995;
      let rotate = 0;

      if (isCard) {
        x = 0;
        y = 14;
        scale = 0.995;
        rotate = 0;
        element.classList.add("sm-stagger-item");
      } else {
        element.classList.remove("sm-stagger-item");
      }

      if (element.matches(".hm-hero, .ab-hero, .sv-hero, .ct-hero, .in-hero")) {
        x = 0;
        y = 22;
        scale = 1;
        rotate = 0;
      }

      const duration = isSection
        ? (isCompactViewport ? 300 : 340)
        : (isCompactViewport ? 260 : 300);

      element.style.setProperty("--sm-delay", `${delay}ms`);
      element.style.setProperty("--sm-duration", `${duration}ms`);
      element.style.setProperty("--sm-x", `${x}px`);
      element.style.setProperty("--sm-y", `${y}px`);
      element.style.setProperty("--sm-scale", `${scale}`);
      element.style.setProperty("--sm-rotate", `${rotate}deg`);
      element.classList.add("sm-reveal");
      if (reset) {
        element.classList.remove("sm-in");
      }

      ready.add(element);

      if (observer) {
        observer.observe(element);
      } else {
        element.classList.add("sm-in");
      }
    };

    const initializeTargets = () => {
      const targets = collectTargets();
      sectionIndex = 0;
      targets.forEach((element, index) => registerElement(element, index, true));
    };

    initializeTargets();

    return () => {
      if (observer) observer.disconnect();
    };
  }, [location.pathname, location.hash]);

  return null;
}
