export type Preset = {
  label: string;
  getRange: () => { start: Date; end: Date };
};

export const PRESETS: Preset[] = [
  {
    label: "Last 1 Hour",
    getRange: () => {
      const end = new Date();
      const start = new Date(end.getTime() - 60 * 60 * 1000);
      return { start, end };
    },
  },
  {
    label: "Today",
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      return { start, end };
    },
  },
  {
    label: "Last 7 Days",
    getRange: () => {
      const end = new Date();
      const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
      return { start, end };
    },
  },
];
