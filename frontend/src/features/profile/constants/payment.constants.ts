import type { PaymentEntry, PaymentStat } from "../types/profile.types";

/**
 * The payment screen's content.
 *
 * **This is fixture data, not a student's real ledger.** There is no billing system to
 * read from, so the figures below are the design's. They live here rather than inline
 * in the table so that swapping them for a fetched response is a change to this file's
 * consumers only — the components already render whatever they are handed.
 *
 * Amounts are pre-formatted strings rather than numbers. That is deliberate *for
 * fixtures*: `₹1,00,000` is the Indian grouping, which `Intl.NumberFormat` produces
 * from the `en-IN` locale and a naive `toLocaleString()` does not. When these become
 * real numbers from an API, format them once at that boundary with `en-IN` rather than
 * hand-grouping them here.
 */

export const paymentCopy = {
  title: "Payment Details",
  subtitle: "Track your fees, dues, and past transactions",
  overviewTitle: "Payment Overview",
  historyTitle: "Payment History",
  /** Column headings, in order. The table renders exactly these. */
  columns: ["Date", "Description", "Amount", "Status", "Invoice"],
  /** Stands in the invoice cell for a payment that has not been made yet. */
  noInvoice: "—",
  download: "Download",
  /**
   * Shown under the table when an invoice is asked for. There is nowhere to fetch a
   * PDF from yet, and a download control that silently does nothing is read as a bug
   * rather than as a gap.
   */
  invoiceUnavailable:
    "Invoices will be downloadable once billing is connected.",
} as const;

export const paymentStats: readonly PaymentStat[] = [
  { id: "program", label: "Program", value: "SOT Catalyst — 2 Year" },
  { id: "total", label: "Total Fee", value: "₹1,00,000" },
  { id: "paid", label: "Amount Paid", value: "₹50,000" },
  { id: "due", label: "Amount Due", value: "₹50,000", emphasis: "due" },
  { id: "next-due", label: "Next Due Date", value: "15 Jan 2027" },
  { id: "status", label: "Status", value: "Partially Paid", emphasis: "status" },
] as const;

export const paymentHistory: readonly PaymentEntry[] = [
  {
    id: "installment-1",
    date: "10 Jul 2026",
    description: "Enrollment — 1st Installment",
    amount: "₹25,000",
    status: "paid",
  },
  {
    id: "installment-2",
    date: "10 Oct 2026",
    description: "2nd Installment",
    amount: "₹25,000",
    status: "paid",
  },
  {
    id: "installment-3",
    date: "15 Jan 2027",
    description: "3rd Installment",
    amount: "₹25,000",
    status: "pending",
  },
] as const;

/** Pill copy and colour per status. One place, so the table and the tiles agree. */
export const paymentStatusLabels: Record<PaymentEntry["status"], string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};
