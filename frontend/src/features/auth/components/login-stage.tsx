import Image from "next/image";

import { assets } from "@/config/site.config";

/**
 * The login screen's backdrop: the design's artwork, full-bleed behind the panel.
 *
 * **Full-bleed, not a left-hand column.** The render is composed for the whole
 * viewport — the student stands a quarter of the way in and the rest of the frame is
 * deliberately empty, unlit room, which is the space the form sits in. Cropping it to
 * a half and putting the panel beside it would throw away the composition and leave
 * the form on a flat colour instead of in the same room.
 *
 * Entirely decorative, so the whole thing is `aria-hidden` and out of the tab order,
 * and the image carries an empty `alt`: it says nothing the panel beside it does not.
 */
export function LoginStage() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/*
        Painted under the artwork rather than replaced by it. It shows for the frame or
        two before a 1440×911 render decodes, and it is matched to the artwork's own
        darkness and warm centre — so the page opens dark and settles, instead of
        flashing a flat panel and then swapping.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_26%_-8%,#161d28_0%,#0d121a_34%,#080a0e_62%,#060709_100%)]" />

      {/*
        `fill` + `object-cover`, anchored at 28% across rather than centred.

        The artwork is 1.58:1 and a desktop viewport is close enough that almost all of
        it shows. A portrait phone is not: `cover` there scales to the height and drops
        roughly two thirds of the width, and a centred crop keeps the empty half of the
        room and cuts the student out of frame entirely. 28% is where he stands, so the
        crop closes in on him instead.

        Vertically centred — the plinth already runs off the foot of the render, so
        anchoring to the bottom would only clip the beam off the top.
      */}
      <Image
        src={assets.loginStage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[28%_50%]"
      />

      {/*
        Under `lg` the panel sits *on* the artwork rather than in the empty half of it —
        the crop that keeps the student in frame is the same crop that puts him behind
        the heading — so the scene steps back behind a scrim.

        Graded rather than flat: heaviest across the middle third, where the form is,
        and lifting at both ends so the beam and the plinth still read. A flat wash
        dark enough for the copy flattens the whole render to a texture.

        `lg:bg-none` drops the gradient entirely above that: the render's right-hand
        side is already dark enough to carry white type, which is what it was composed
        for.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,8,0.55)_0%,rgba(10,7,8,0.85)_28%,rgba(10,7,8,0.85)_70%,rgba(10,7,8,0.5)_100%)] lg:bg-none" />
    </div>
  );
}
