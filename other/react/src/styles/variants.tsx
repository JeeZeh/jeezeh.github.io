export type variant = {
  background: string;
  borderColor: string;
};

export type variantName =
  | "github"
  | "soundcloud"
  | "flickr"
  | "youtube"
  | "behance";

export const defaultVariants: Record<variantName, variant> = {
  github: {
    background: "linear-gradient(-45deg, #575757, #7e7e7e)",
    borderColor: "#575757 !important",
  },
  soundcloud: {
    background: "linear-gradient(-45deg, #ff8800be, #fcc206cb)",
    borderColor: "#ff8800be !important",
  },
  flickr: {
    background: "linear-gradient(-45deg, #4d0ab9c2, #db29ffb9)",
    borderColor: "#8144d1c2 !important",
  },
  youtube: {
    background: "linear-gradient(-45deg, #b90a0abb, #ff2929c5)",
    borderColor: "#ff2929c5 !important",
  },
  behance: {
    background: "linear-gradient(-45deg, #0a41a8b2, #2974ffc4)",
    borderColor: "#2974ffc4 !important",
  },
};
