import { CtaButton } from "@/components/ui/cta-button";
import { faqPromo } from "../constants/faq.constants";

/**
 * The "Start Your Journey" card beneath the FAQ heading.
 *
 * The reference layers a background photo under a `white → pink` gradient, but that
 * gradient runs from 50% to 70% opacity across the whole card and leaves the image
 * essentially invisible. Rendering the gradient over a white ground reproduces the
 * design exactly and drops a request that buys nothing.
 */
export function FaqPromo() {
  return (
    <div className="relative w-full max-w-[25.9375rem] overflow-hidden rounded-3xl bg-white p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5)_50%,rgba(247,135,141,0.6)_75%,rgba(247,135,141,0.7)_100%)]"
      />

      <div className="relative z-10 flex max-w-[20.625rem] flex-col items-start gap-7">
        <div>
          <h3 className="mb-2 type-heading text-[30px] text-ink">
            {faqPromo.title}
          </h3>
          <p className="font-display text-base leading-[1.4] text-black/70">
            {faqPromo.description}
          </p>
        </div>

        <CtaButton href={faqPromo.cta.href} variant="inverse" size="lg" withIcon>
          {faqPromo.cta.label}
        </CtaButton>
      </div>
    </div>
  );
}
