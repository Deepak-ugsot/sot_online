"use client";

import { useState } from "react";

import { profileActions } from "../constants/profile.constants";
import { saveSection } from "../services/profile.store";
import type {
  EditableSectionId,
  ProfileValues,
  RequestState,
} from "../types/profile.types";
import { useProfile } from "./use-profile";

export type ProfileSectionState = {
  /** What the fields should show: the draft while editing, the saved record otherwise. */
  values: ProfileValues;
  isEditing: boolean;
  isSaving: boolean;
  /** Set when a save failed. Cleared on the next attempt. */
  error: string | null;
  startEdit: () => void;
  cancel: () => void;
  save: () => void;
  setField: (name: string, value: string) => void;
};

/**
 * One editable section: its values, and the edit / save / cancel cycle around them.
 *
 * **The draft is `null` when not editing, not a copy of the saved values.** That is
 * what makes Cancel free — there is nothing to roll back, only a draft to throw away —
 * and it makes "am I editing?" and "what am I editing?" the same fact, so they cannot
 * disagree. A long-lived draft alongside a separate boolean is how a cancelled edit
 * comes back the next time the section is opened.
 *
 * Editing is per section, matching the design: `Edit Profile` sits beside one screen's
 * heading and its Save commits that screen's cards together. Payment Details has no
 * edit mode at all and so never calls this.
 */
export function useProfileSection(id: EditableSectionId): ProfileSectionState {
  const record = useProfile();
  const [draft, setDraft] = useState<ProfileValues | null>(null);
  const [status, setStatus] = useState<RequestState>("idle");
  const [error, setError] = useState<string | null>(null);

  const saved = record[id];

  const startEdit = () => {
    setError(null);
    setDraft({ ...saved });
  };

  const cancel = () => {
    setError(null);
    setStatus("idle");
    setDraft(null);
  };

  const setField = (name: string, value: string) => {
    setDraft((current) => (current ? { ...current, [name]: value } : current));
  };

  const save = () => {
    if (!draft) return;

    setStatus("pending");
    setError(null);

    try {
      saveSection(id, draft);
      setStatus("idle");
      // Dropping the draft is what returns the section to read-only, and the store now
      // holds these values — so the fields do not flicker back to the old ones.
      setDraft(null);
    } catch {
      // The draft is deliberately kept: the student's typing is the only copy of these
      // values, and clearing the form because a write failed would throw it away.
      setStatus("error");
      setError(profileActions.saveError);
    }
  };

  return {
    values: draft ?? saved,
    isEditing: draft !== null,
    isSaving: status === "pending",
    error,
    startEdit,
    cancel,
    save,
    setField,
  };
}
