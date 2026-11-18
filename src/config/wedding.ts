/**
 * Single source of truth for every wedding detail shown on the site.
 *
 * Wedding of Harshada Lonkar & Prakhar Gupta — 19–20 January 2027, Nagpur.
 *
 * Dates/times are written as local wall-clock time ("YYYY-MM-DDTHH:mm") in
 * `timeZone`; the site converts them correctly for every guest.
 */

export type Person = {
  /** Short display name used in the hero, intro and closing */
  name: string;
  /** Full name as written on the printed invitation */
  invitationName?: string;
  /** First name, used on the invitation card */
  firstName?: string;
  qualification?: string;
  /** Family home, shown in the couple section */
  address?: string;
  /** e.g. { relation: "Son of", names: ["Smt. …", "Sri. …"] } — names are shown in bold */
  parents?: { relation: string; names: string[] };
  intro?: string;
  /** Path under /public, e.g. "/images/couple/bride.jpg" */
  photo?: string;
};

export type Ceremony = {
  id: string;
  name: string;
  /** Optional regional/Sanskrit name shown as a small label */
  subtitle?: string;
  start: string;
  end?: string;
  /** id of an entry in `venues` */
  venueId: string;
  description?: string;
  /** Set false to hide the secondary (EST) time for this event */
  showSecondaryTime?: boolean;
  /** Spot within the venue, e.g. "Pool side" */
  place?: string;
  /** Theme / dress code, e.g. "Yellow" */
  theme?: string;
  /** Offer this event as a choice on the RSVP form */
  rsvp?: boolean;
  /** Illustration motif used when no photo/generated image exists */
  motif: "haldi" | "mehendi" | "sangeet" | "vivah" | "reception";
  photo?: string;
};

export type Venue = {
  id: string;
  name: string;
  address: string;
  /** Exact Google Maps link supplied by the family — used for "Get Directions" */
  mapUrl: string;
  photo?: string;
};

export type Credit = {
  role: string;
  name: string;
  /** Smaller line under the name, e.g. "by Santhosh Vemula" */
  byline?: string;
  description?: string;
  link?: { label: string; url: string };
  icon: "camera" | "lotus";
  /** Black-on-transparent logo under /public, shown in the medallion instead of the icon */
  logo?: { src: string; alt: string; width: number; height: number };
  /** Placeholder until the real details arrive — shown softly as "coming soon" */
  placeholder?: boolean;
};

export type GalleryImage = { src?: string; alt: string; shape?: "tall" | "wide" | "square" };

export type WeddingConfig = {
  isSample: boolean;
  invocation: string;
  timeZone: string;
  /** Second time zone shown beside every event time, for guests abroad (e.g. "America/New_York") */
  secondaryTimeZone?: string;
  bride: Person;
  groom: Person;
  /** Heading and line shown in the couple section */
  coupleHeading: string;
  coupleIntro?: string;
  /** Full invitation message (currently used for the link-preview description) */
  invitation?: string;
  /** The invitation card: the hosting family and their request */
  invitationCard: { hosts: string; request: string };
  weddingStart: string;
  ceremonies: Ceremony[];
  venues: Venue[];
  /** The ceremony (by id) whose venue the venue section shows */
  venueCeremonyId: string;
  /** The ceremony (by id) the countdown counts down to */
  countdownCeremonyId: string;
  gallery: GalleryImage[];
  credits: { heading: string; intro?: string; items: Credit[] };
  rsvp: {
    enabled: boolean;
    maxGuests: number;
    deadline?: string;
  };
  closing: {
    message: string;
    families?: string;
    blessing?: string;
    /** "With best compliments" courtesy block shown at the top of the closing section */
    compliments?: { heading: string; names: string[] };
    contacts: { label: string; phone: string }[];
  };
  music: { src: string; title: string; credit: string };
  site: { url: string };
};

export const wedding: WeddingConfig = {
  isSample: false,

  invocation: "Om Shri Ganeshaya Namah",
  timeZone: "Asia/Kolkata",

  bride: {
    name: "Harshada Lonkar",
    firstName: "Harshada",
    parents: { relation: "Daughter of", names: ["Shri. Ashok", "Smt. Vandan Lonkar"] },
  },

  groom: {
    name: "Prakhar Gupta",
    firstName: "Prakhar",
    parents: { relation: "Son of", names: ["Shri. Vijay Gupta", "Smt. Shweta Gupta"] },
  },

  coupleHeading: "",

  invitation:
    "Shri. Vijay Gupta & Smt. Shweta Gupta cordially request the honour of your presence at the wedding celebration of Prakhar and Harshada — 20 January 2027, Dhawan Celebration, Nagpur.",

  invitationCard: {
    hosts: "Shri. Vijay Gupta & Smt. Shweta Gupta",
    request: "Cordially request the honour of your presence at the wedding celebration of our beloved son",
  },

  /** The Wedding — drives the hero date and the countdown. */
  weddingStart: "2027-01-20T11:00",

  /** Display order on the timeline. */
  ceremonies: [
    {
      id: "haldi",
      name: "Haldi/Mandap",
      start: "2027-01-19T10:00",
      venueId: "dhawan",
      place: "Pool side",
      theme: "Yellow",
      motif: "haldi",
      rsvp: true,
    },
    {
      id: "sangeet",
      name: "Sangeet",
      start: "2027-01-19T19:00",
      venueId: "dhawan",
      place: "Open Lawn",
      theme: "Indo western",
      motif: "sangeet",
      rsvp: true,
    },
    {
      id: "wedding",
      name: "Wedding",
      start: "2027-01-20T11:00",
      venueId: "dhawan",
      place: "Amber Hall",
      theme: "Traditional",
      motif: "vivah",
      rsvp: true,
    },
    {
      id: "reception",
      name: "Reception",
      subtitle: "पारिवारिक स्नेह सम्मेलन",
      start: "2027-01-20T20:00",
      venueId: "dhawan",
      place: "Open Garden",
      motif: "reception",
    },
  ],

  venues: [
    {
      id: "dhawan",
      name: "Dhawan Celebration",
      address: "Gorewada Ring Road, Nagpur, Maharashtra 440013",
      mapUrl: "https://maps.app.goo.gl/sQ3QXfRcL9PPbTn37?g_st=ic",
    },
  ],

  venueCeremonyId: "wedding",
  countdownCeremonyId: "wedding",

  gallery: [],

  credits: { heading: "", items: [] },

  rsvp: {
    enabled: true,
    maxGuests: 10,
  },

  closing: {
    message: "Your presence and blessings will make our celebration truly special.\nWe can't wait to celebrate with you.",
    compliments: {
      heading: "With best compliments",
      names: ["Shri. Mahesh and Smt. Rajkumari Gupta", "Smt. Laxmi Hindustani", "Gupta Family"],
    },
    contacts: [],
  },

  music: {
    /** Path under /public to a licensed track, e.g. "/audio/shehnai.mp3". Empty hides the control. */
    src: "/audio/wedding-instrumental.mp3",
    title: "Wedding instrumental",
    /** Shown in the footer when set — CC BY tracks must credit the artist and licence */
    credit: "",
  },

  site: {
    /** Public URL once deployed — used for share links and social previews */
    url: "",
  },
};
