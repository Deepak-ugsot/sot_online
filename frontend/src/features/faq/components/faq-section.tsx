"use client";

import { useRef, useState } from "react";

import {
  faqEntries,
  faqHeading,
  faqParagraph,
} from "../constants/faq.constants";
import { useFaqReveal } from "../hooks/use-faq-reveal";
import { FaqItem } from "./faq-item";
import { FaqPromo } from "./faq-promo";

/**
 * "Got Questions? We've Got Answers" — intro column on the left, accordion on the right.
 *
 * The accordion is **exclusive**: opening one row closes the others, and clicking an
 * open row closes it. That state lives here rather than in each row, because
 * "only one at a time" is a property of the set, not of any individual row.
 *
 * The first row starts open, matching the design.
 */
export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(faqEntries[0]?.id ?? null);

  useFaqReveal(sectionRef);

  return (
    <section
      id="faqs"
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="relative bg-surface"
    >
      {/*
        `84rem` — the page's shared measure, matching career, mentors, AI Mentor and
        Career OS.

        `px-6` all the way up rather than widening to `px-20` at `1000px`: the measure
        only reads as shared if the *content* lines up, and the mentors band opposite
        it pads by `px-6`. At `px-20` this section's content sat 112px narrower than
        that band inside an identically-sized container.
      */}
      <div className="mx-auto flex max-w-[84rem] flex-col items-start gap-12 px-6 pt-25 pb-30 min-[1000px]:flex-row min-[1000px]:gap-[7rem]">
        <div
          data-faq="intro"
          className="flex w-full flex-col justify-between gap-14 min-[1000px]:shrink min-[1000px]:basis-[32.75rem] min-[1000px]:self-stretch"
        >
          <div className="flex flex-col gap-4">
            <h2
              id="faq-heading"
              className="flex flex-col type-heading text-[clamp(1.875rem,4.7vw,4.25rem)] text-ink"
            >
              {/* Each line is `nowrap` — the design sets them as two deliberate
                  lines, and letting either wrap would turn the heading into three. */}
              <span className="whitespace-nowrap">{faqHeading.lead}</span>
              <span className="font-accent font-light whitespace-nowrap text-brand italic">
                {faqHeading.accent}
              </span>
            </h2>

            <p className="max-w-[32.75rem] font-display text-[19px] leading-[1.45] text-black/90">
              {faqParagraph}
            </p>
          </div>

          <FaqPromo />
        </div>

        <div
          data-faq="list"
          className="w-full border-t border-[#e5e5e5] min-[1000px]:flex-1"
        >
          {faqEntries.map((entry) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              isOpen={openId === entry.id}
              onToggle={() =>
                setOpenId((current) => (current === entry.id ? null : entry.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
