import { NotAnotherCourseSection } from "@/features/not-another-course";

/**
 * Temporary isolation harness for the Not Another Course section. Not linked from
 * anywhere. Mirrors `dev/curriculum`.
 */
export default function NotAnotherCourseDevPage() {
  return (
    <main>
      <NotAnotherCourseSection />
    </main>
  );
}
