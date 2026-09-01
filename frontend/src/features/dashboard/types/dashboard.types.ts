/**
 * One row of checklist items.
 *
 * The grouping is meaningful, not cosmetic: the rows are balanced by label length so
 * each line centres evenly. Flattening them into a single wrapping list would let the
 * browser break them wherever it liked.
 */
export type DashboardChecklistRow = {
  id: string;
  items: readonly string[];
};
