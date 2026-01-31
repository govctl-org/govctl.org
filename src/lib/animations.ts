/**
 * Animation utilities for govctl.org
 * Using anime.js for performant, modular animations
 *
 * Philosophy: Animate what reinforces the message.
 * Phase discipline flow is the money shot.
 */

import { animate, stagger, createTimeline } from "animejs";

// ============================================================
// Phase Flow Animation
// Sequential reveal: spec → impl → test → stable
// ============================================================

export function animatePhaseFlow(container: HTMLElement) {
  const boxes = container.querySelectorAll(".phase-box");
  const arrows = container.querySelectorAll(".phase-arrow");

  if (boxes.length === 0) return;

  // Reset initial state
  boxes.forEach((box) => {
    (box as HTMLElement).style.opacity = "0";
    (box as HTMLElement).style.transform = "translateY(20px)";
  });
  arrows.forEach((arrow) => {
    (arrow as HTMLElement).style.opacity = "0";
  });

  // Create timeline for sequential reveal
  const tl = createTimeline({
    defaults: {
      ease: "outExpo",
    },
  });

  // Animate boxes with stagger
  tl.add(boxes, {
    opacity: [0, 1],
    translateY: [20, 0],
    delay: stagger(150),
    duration: 600,
  });

  // Animate arrows after boxes
  tl.add(
    arrows,
    {
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: stagger(150),
      duration: 400,
    },
    "-=400",
  );
}

// ============================================================
// Terminal Typewriter Effect
// Lines appear sequentially, simulating command execution
// ============================================================

export function animateTerminal(container: HTMLElement) {
  const lines = container.querySelectorAll(".terminal-line");

  if (lines.length === 0) return;

  // Reset initial state
  lines.forEach((line) => {
    (line as HTMLElement).style.opacity = "0";
  });

  animate(lines, {
    opacity: [0, 1],
    delay: stagger(120),
    duration: 300,
    ease: "linear",
  });
}

// ============================================================
// Hero Entrance Animation
// Fade in and slide up on page load
// ============================================================

export function animateHero(container: HTMLElement) {
  const title = container.querySelectorAll(".hero-title");
  const subtitle = container.querySelector(".hero-subtitle");
  const cta = container.querySelector(".hero-cta");
  const terminal = container.querySelector(".hero-terminal");

  const elements = [...Array.from(title), subtitle, cta, terminal].filter(
    Boolean,
  );

  if (elements.length === 0) return;

  // Reset initial state
  elements.forEach((el) => {
    if (el) {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
    }
  });

  animate(elements as HTMLElement[], {
    opacity: [0, 1],
    translateY: [30, 0],
    delay: stagger(100, { start: 100 }),
    duration: 800,
    ease: "outQuart",
  });
}

// ============================================================
// Scroll-triggered Product Cards
// Stagger entrance when scrolling into view
// ============================================================

export function animateProductCards(container: HTMLElement) {
  const cards = container.querySelectorAll(".product-card");

  if (cards.length === 0) return;

  // Reset initial state
  cards.forEach((card) => {
    (card as HTMLElement).style.opacity = "0";
    (card as HTMLElement).style.transform = "translateY(40px)";
  });

  animate(cards, {
    opacity: [0, 1],
    translateY: [40, 0],
    delay: stagger(100),
    duration: 600,
    ease: "outQuart",
  });
}

// ============================================================
// Comparison Section Animation
// Side by side reveal on scroll
// ============================================================

export function animateComparison(container: HTMLElement) {
  const without = container.querySelector(".comparison-without");
  const withBox = container.querySelector(".comparison-with");

  if (!without && !withBox) return;

  const elements = [without, withBox].filter(Boolean) as HTMLElement[];

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
  });

  animate(elements, {
    opacity: [0, 1],
    translateY: [30, 0],
    delay: stagger(150),
    duration: 600,
    ease: "outQuart",
  });
}

// ============================================================
// Feature Cards Animation
// Stagger entrance for grid items
// ============================================================

export function animateFeatureCards(container: HTMLElement) {
  const cards = container.querySelectorAll(".feature-card");

  if (cards.length === 0) return;

  cards.forEach((card) => {
    (card as HTMLElement).style.opacity = "0";
    (card as HTMLElement).style.transform = "translateY(20px)";
  });

  animate(cards, {
    opacity: [0, 1],
    translateY: [20, 0],
    delay: stagger(80),
    duration: 500,
    ease: "outQuart",
  });
}

// ============================================================
// Generic scroll-triggered animation setup
// Use IntersectionObserver for reliable scroll triggering
// ============================================================

export function setupScrollAnimation(
  selector: string,
  animateFn: (container: HTMLElement) => void,
  threshold = 0.2,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateFn(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold },
  );

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });
}
