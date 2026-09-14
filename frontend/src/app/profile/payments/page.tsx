import type { Metadata } from "next";

import { PaymentDetailsView } from "@/features/profile";

export const metadata: Metadata = { title: "Payment Details" };

/**
 * `/profile/payments` — fees and transactions.
 *
 * The one section with no edit mode, and the one whose content is fixture data rather
 * than the student's own. See the feature README.
 */
export default function PaymentDetailsPage() {
  return <PaymentDetailsView />;
}
