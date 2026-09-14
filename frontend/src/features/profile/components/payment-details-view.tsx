"use client";

import { Clock, CreditCard, Download } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  paymentCopy,
  paymentHistory,
  paymentStats,
  paymentStatusLabels,
} from "../constants/payment.constants";
import { ProfileShell } from "./profile-shell";
import { StatusPill } from "./status-pill";

/**
 * Payment Details: what the programme costs, what has been paid, and every transaction.
 *
 * **Read-only by design, and the only screen with no edit mode.** These figures are the
 * finance system's record of what was billed and received. An Edit button here would
 * invite a student to correct their own balance, and anything they typed would be
 * fiction the moment a real ledger arrived.
 *
 * It is also the only screen whose content is fixture data rather than the student's —
 * see `payment.constants.ts`.
 */
export function PaymentDetailsView() {
  /*
    Invoices have nowhere to come from yet. The control still renders, because it is
    part of the design and will work unchanged once billing is connected; pressing it
    says so rather than doing nothing, which is the version a student reports as broken.
  */
  const [invoiceNotice, setInvoiceNotice] = useState(false);

  return (
    <ProfileShell title={paymentCopy.title} subtitle={paymentCopy.subtitle}>
      <section
        aria-labelledby="payment-overview-title"
        className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)] sm:p-8"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <CreditCard className="h-5 w-5" />
          </span>
          <h2
            id="payment-overview-title"
            className="font-display text-[18px] font-semibold text-ink"
          >
            {paymentCopy.overviewTitle}
          </h2>
        </div>

        {/*
          A definition list, not a grid of divs: these are six label/value pairs, and
          `dl` is what tells a screen reader that "Amount Due" belongs to "₹50,000".
        */}
        <dl className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paymentStats.map((stat) => (
            <div
              key={stat.id}
              className={cn(
                "rounded-xl border px-4 py-3.5",
                stat.emphasis === "due"
                  ? "border-brand/35 bg-brand/[0.04]"
                  : "border-transparent bg-surface",
              )}
            >
              <dt className="font-display text-[12.5px] text-ink-muted">
                {stat.label}
              </dt>
              <dd
                className={cn(
                  "mt-1.5 font-display text-[17px] font-semibold",
                  stat.emphasis === "due" ? "text-brand" : "text-ink",
                )}
              >
                {stat.emphasis === "status" ? (
                  <StatusPill tone="neutral">{stat.value}</StatusPill>
                ) : (
                  stat.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="payment-history-title"
        className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)] sm:p-8"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <Clock className="h-5 w-5" />
          </span>
          <h2
            id="payment-history-title"
            className="font-display text-[18px] font-semibold text-ink"
          >
            {paymentCopy.historyTitle}
          </h2>
        </div>

        {/*
          The table scrolls inside its own box rather than widening the page. Five
          columns do not fit a phone, and a table that makes the whole layout scroll
          sideways takes the navigation with it.
        */}
        <div className="mt-7 -mx-1 overflow-x-auto px-1">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="bg-surface">
                {paymentCopy.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-3 font-display text-[11.5px] font-semibold tracking-[0.06em] text-ink-muted uppercase first:rounded-l-lg last:rounded-r-lg"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((entry) => (
                <tr key={entry.id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-4 font-display text-[14px] text-ink">
                    {entry.date}
                  </td>
                  <td className="px-4 py-4 font-display text-[14px] text-ink">
                    {entry.description}
                  </td>
                  <td className="px-4 py-4 font-display text-[14px] text-ink">
                    {entry.amount}
                  </td>
                  <td className="px-4 py-4">
                    <StatusPill tone={entry.status}>
                      {paymentStatusLabels[entry.status]}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-4">
                    {entry.status === "paid" ? (
                      <button
                        type="button"
                        onClick={() => setInvoiceNotice(true)}
                        className="inline-flex cursor-pointer items-center gap-1.5 font-display text-[13.5px] font-medium text-brand underline-offset-4 transition-colors duration-250 ease-cinematic hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        <Download aria-hidden="true" className="h-4 w-4" />
                        {paymentCopy.download}
                      </button>
                    ) : (
                      // The design's placeholder for a payment not yet made. Hidden
                      // from screen readers: an em dash read aloud in every third row
                      // is noise, and the Status column already said "Pending".
                      <span aria-hidden="true" className="text-ink-muted">
                        {paymentCopy.noInvoice}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {invoiceNotice && (
          <p
            role="status"
            className="mt-4 font-display text-[13px] text-ink-muted"
          >
            {paymentCopy.invoiceUnavailable}
          </p>
        )}
      </section>
    </ProfileShell>
  );
}
