"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  dashboardHeading,
  dashboardMedia,
} from "../constants/dashboard.constants";
import { useDashboardReveal } from "../hooks/use-dashboard-reveal";
import { DashboardChecklist } from "./dashboard-checklist";

/**
 * "Your Career Dashboard" — a centred heading, two rows of ticked capabilities, and
 * the product screenshot beneath.
 *
 * **Centred from `700px` up, left-aligned below it.** Centring a list of seven ticked
 * items of very different lengths gives every row a different left edge, so the ticks
 * zig-zag down the column and there is no line for the eye to follow. That reads fine
 * as two balanced rows on a wide screen, where the items sit side by side; once they
 * stack on a phone it is just ragged. Left-aligned, the ticks form a single column.
 *
 * **`990px` is measured, not the checklist's own `700px`.** The first row's four items
 * come to about 819px of text plus three gaps; against a container of `min(1088, V − 48)`
 * and a gap of `clamp(24px, 4vw, 48px)` it stops fitting at about 986px of viewport.
 * Below that the row wraps, and a wrapped centred row is exactly the ragged case this
 * avoids — so the switch belongs where the rows stop fitting, not where the labels
 * stop wrapping. A first attempt at `700px` left tablets centred and ragged.
 */
export function DashboardSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useDashboardReveal(sectionRef);

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      aria-labelledby="dashboard-heading"
      className="relative bg-surface"
    >
      <div className="mx-auto flex max-w-[68rem] flex-col items-start gap-13 px-6 pt-18 pb-24 min-[990px]:items-center min-[700px]:pt-25 min-[700px]:pb-30">
        <div
          data-dashboard="heading"
          className="flex flex-col items-start gap-5 text-left min-[990px]:items-center min-[990px]:text-center"
        >
          <h2
            id="dashboard-heading"
            className="type-heading font-semibold text-[clamp(1.875rem,3.8vw,3.25rem)] text-ink"
          >
            {dashboardHeading.lead}{" "}
            <span className="font-accent font-medium text-brand">
              {dashboardHeading.accent}
            </span>
          </h2>
        </div>

        <DashboardChecklist />

        {/*
          The panel holds its aspect ratio so its box is reserved before the image
          loads — without it the reveal would fire against a zero-height element and
          the page would jump as the screenshot arrives.
        */}
        <div
          data-dashboard="media"
          style={{ aspectRatio: dashboardMedia.aspectRatio }}
          className="relative w-full max-w-[56.75rem] overflow-hidden rounded-xl"
        >
          <Image
            src={dashboardMedia.src}
            alt={dashboardMedia.alt}
            fill
            sizes="(min-width: 908px) 908px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
