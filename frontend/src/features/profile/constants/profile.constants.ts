import {
  Briefcase,
  Building2,
  Calendar,
  CircleCheck,
  CreditCard,
  GraduationCap,
  IdCard,
  Link2,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  TrendingUp,
  User,
} from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "../components/brand-icon";
import type {
  EditableSectionId,
  ProfileNavItem,
  ProfileSectionConfig,
} from "../types/profile.types";

/**
 * The profile screens, as data.
 *
 * Every field on all three forms is declared here and the components render whatever
 * they find — so adding a field is one entry in this file, and the label, its icon,
 * the grid position, the stored key and the edit control can never drift apart the way
 * they do when twenty near-identical blocks of JSX are maintained by hand.
 */

/** The sidebar, in the design's order. `/profile` is Personal Details. */
export const profileNav: readonly ProfileNavItem[] = [
  {
    id: "personal",
    label: "Personal Details",
    hint: "Basic & contact information",
    href: "/profile",
    icon: User,
  },
  {
    id: "academic",
    label: "Academic Details",
    hint: "Education & qualifications",
    href: "/profile/academic",
    icon: GraduationCap,
  },
  {
    id: "payments",
    label: "Payment Details",
    hint: "Fees & transaction history",
    href: "/profile/payments",
    icon: CreditCard,
  },
  {
    /*
      The design labels this row "Work & education details" on three screens and
      "Work, skills & links" on the fourth. Taking the fourth: the card underneath it
      holds work and links and no education at all — education has its own section
      directly above, and repeating it here reads as a duplicate rather than a summary.
    */
    id: "professional",
    label: "Professional Information",
    hint: "Work, skills & links",
    href: "/profile/professional",
    icon: Briefcase,
  },
] as const;

export const profileAside = {
  title: "My Profile",
  subtitle: "Manage your personal information and preferences",
  /** Shown under the avatar until a name has been saved, exactly as the design does. */
  namePlaceholder: "Your Name",
  role: "Student",
} as const;

export const profileActions = {
  edit: "Edit Profile",
  save: "Save Changes",
  saving: "Saving…",
  cancel: "Cancel",
  signOut: "Log Out",
  saveError: "We couldn't save your changes. Please try again.",
} as const;

const personalSection: ProfileSectionConfig = {
  id: "personal",
  title: "Personal Details",
  subtitle: "Update your personal details and contact information",
  cards: [
    {
      id: "personal-information",
      title: "Personal Information",
      icon: User,
      fields: [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "First name",
          icon: User,
          autoComplete: "given-name",
        },
        {
          name: "lastName",
          label: "Last Name",
          placeholder: "Last name",
          icon: User,
          autoComplete: "family-name",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "you@example.com",
          icon: Mail,
          control: "email",
          autoComplete: "email",
        },
        {
          name: "contact",
          label: "Contact",
          placeholder: "Phone number",
          icon: Phone,
          control: "tel",
          autoComplete: "tel",
        },
        {
          name: "dateOfBirth",
          label: "Date of Birth",
          // A native date control supplies its own format hint, so a placeholder here
          // would only ever be read by a browser that ignores `type="date"`.
          placeholder: "",
          icon: Calendar,
          control: "date",
          autoComplete: "bday",
        },
        {
          name: "bio",
          label: "Bio",
          placeholder: "Tell us a little about yourself...",
          icon: PencilLine,
          control: "textarea",
          span: "full",
        },
      ],
    },
    {
      id: "location",
      title: "Location",
      icon: MapPin,
      fields: [
        {
          name: "city",
          label: "City",
          placeholder: "City",
          icon: MapPin,
          autoComplete: "address-level2",
        },
        {
          name: "state",
          label: "State",
          placeholder: "State",
          icon: MapPin,
          autoComplete: "address-level1",
        },
        {
          name: "country",
          label: "Country",
          placeholder: "Country",
          icon: MapPin,
          autoComplete: "country-name",
        },
        {
          name: "pincode",
          label: "Pincode",
          placeholder: "Postal code",
          icon: MapPin,
          autoComplete: "postal-code",
        },
      ],
    },
  ],
};

const academicSection: ProfileSectionConfig = {
  id: "academic",
  title: "Academic Details",
  subtitle: "Your education, qualifications, and enrollment details",
  cards: [
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      fields: [
        {
          name: "highestQualification",
          label: "Highest Qualification",
          placeholder: "e.g. B.Tech",
          icon: GraduationCap,
        },
        {
          name: "college",
          label: "College / University",
          placeholder: "Institution name",
          icon: Building2,
          autoComplete: "organization",
        },
        {
          name: "degree",
          label: "Degree / Course",
          placeholder: "e.g. Computer Science",
          icon: GraduationCap,
        },
        {
          name: "branch",
          label: "Branch / Specialization",
          placeholder: "e.g. Information Technology",
          icon: GraduationCap,
        },
        {
          name: "currentYear",
          label: "Current Year",
          placeholder: "e.g. 3rd Year",
          icon: Calendar,
        },
        {
          name: "expectedGraduation",
          label: "Expected Graduation",
          placeholder: "e.g. 2027",
          icon: Calendar,
        },
        {
          name: "cgpa",
          label: "CGPA / Percentage",
          placeholder: "e.g. 8.4 CGPA",
          icon: CircleCheck,
        },
        {
          name: "rollNumber",
          label: "Roll Number",
          placeholder: "Enrollment / roll number",
          icon: IdCard,
        },
      ],
    },
  ],
};

const professionalSection: ProfileSectionConfig = {
  id: "professional",
  /*
    The design's subtitle here reads "Your Education & Professional Journey" — title
    case where the other three are sentence case, and naming education on the one
    screen that holds none. Rewritten to match its own content and its siblings.
  */
  title: "Professional Information",
  subtitle: "Your work experience, skills, and professional links",
  cards: [
    {
      id: "professional-information",
      title: "Professional Information",
      icon: Briefcase,
      fields: [
        {
          name: "currentStatus",
          label: "Current Status",
          placeholder: "e.g. Student, Working Professional",
          icon: Briefcase,
        },
        {
          name: "organization",
          label: "College / Organization",
          placeholder: "Company name (if any)",
          icon: Building2,
          autoComplete: "organization",
        },
        {
          name: "designation",
          label: "Branch / Designation",
          placeholder: "e.g. SDE Intern",
          icon: Briefcase,
          autoComplete: "organization-title",
        },
        {
          // The only label in the design with no icon beside it — read as an omission
          // rather than an intention, since a single bare label in a grid of sixteen
          // reads as a rendering fault.
          name: "experience",
          label: "Experience",
          placeholder: "e.g. 0–1 years",
          icon: TrendingUp,
        },
      ],
    },
    {
      id: "links",
      /*
        Titled "Links & Resume" in the design, which promises an upload the mock never
        shows. Renamed to what it actually collects — a resume upload needs somewhere
        to put the file, which is a backend decision, not a layout one.
      */
      title: "Links",
      icon: Link2,
      fields: [
        {
          name: "linkedin",
          label: "LinkedIn",
          placeholder: "linkedin.com/in/username",
          icon: LinkedInIcon,
          control: "url",
        },
        {
          name: "github",
          label: "GitHub",
          placeholder: "github.com/username",
          icon: GitHubIcon,
          control: "url",
        },
        {
          name: "portfolio",
          label: "Portfolio",
          placeholder: "yourportfolio.com",
          icon: Link2,
          control: "url",
        },
      ],
    },
  ],
};

/** Looked up by route segment, so a page is one line and knows nothing about fields. */
export const profileSections: Record<EditableSectionId, ProfileSectionConfig> = {
  personal: personalSection,
  academic: academicSection,
  professional: professionalSection,
};

/** Every field name in a section — the basis of its empty record. */
export function sectionFieldNames(config: ProfileSectionConfig): readonly string[] {
  return config.cards.flatMap((card) => card.fields.map((field) => field.name));
}
