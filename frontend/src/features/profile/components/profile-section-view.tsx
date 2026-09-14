"use client";

import { profileSections } from "../constants/profile.constants";
import { useProfileSection } from "../hooks/use-profile-section";
import type { EditableSectionId } from "../types/profile.types";
import { ProfileCard } from "./profile-card";
import { ProfileShell } from "./profile-shell";

/**
 * Any of the three editable profile screens.
 *
 * One component for all of them because they *are* the same screen: a heading, an edit
 * cycle, and a stack of cards full of labelled text fields. The only thing that differs
 * is which fields, and that is data — see `profileSections`. Written out three times,
 * the first restyle would have to be made three times and would be made twice.
 *
 * The route passes an id and nothing else, so a page stays one line and knows nothing
 * about fields, storage, or edit state.
 */
export function ProfileSectionView({ section }: { section: EditableSectionId }) {
  const config = profileSections[section];
  const state = useProfileSection(section);

  return (
    <ProfileShell title={config.title} subtitle={config.subtitle} edit={state}>
      {config.cards.map((card) => (
        <ProfileCard
          key={card.id}
          card={card}
          values={state.values}
          isEditing={state.isEditing}
          onChange={state.setField}
        />
      ))}
    </ProfileShell>
  );
}
