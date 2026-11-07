export type Project = {
  title: string;
  description: string;
  live: string;
  github?: string;
};

export type PaletteId = "black" | "charcoal" | "hint";

export type Palette = {
  id: PaletteId;
  name: string;
  swatch: [string, string];
};
