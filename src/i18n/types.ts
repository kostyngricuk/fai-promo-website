import type { TermScript } from './term';

export interface NoteCopy {
  title: string;
  body: string;
}

export interface FileCopy {
  /** File path — never translated, it is a real path. */
  name: string;
  body: string;
}

export interface ChipCopy {
  label: string;
  /** Highlighted chip — the one hard requirement. */
  on?: boolean;
}

export interface SourceRow {
  key: string;
  value: string;
}

export interface StatCopy {
  value: number;
  label: string;
  suffix?: string;
}

export interface UiCopy {
  play: string;
  pause: string;
  prev: string;
  next: string;
  navLabel: string;
  languageLabel: string;
  /** e.g. "Slide 3" — used for the progress-mark aria-labels. */
  slide: (n: number) => string;
}

export interface Dictionary {
  ui: UiCopy;
  intro: {
    kicker: string;
    kickerDim: string;
    /** One entry per visual line — each gets its own split-text stagger. */
    headline: readonly string[];
    lede: string;
    hint: string;
  };
  problem: {
    heading: string;
    lede: string;
    notes: readonly NoteCopy[];
  };
  sources: {
    heading: string;
    lede: string;
    thReads: string;
    thLearns: string;
    rows: readonly SourceRow[];
  };
  install: {
    heading: string;
    lede: string;
    chips: readonly ChipCopy[];
    note: string;
    path: string;
    script: TermScript;
  };
  create: {
    heading: string;
    lede: string;
    path: string;
    script: TermScript;
  };
  anatomy: {
    heading: string;
    files: readonly FileCopy[];
    note: string;
    sections: readonly string[];
    /** 1-based section numbers to highlight. */
    highlight: readonly number[];
    foot: string;
  };
  plan: {
    heading: string;
    lede: string;
    body: string;
    path: string;
    script: TermScript;
  };
  savePlan: {
    heading: string;
    lede: string;
    body: string;
    path: string;
    script: TermScript;
  };
  review: {
    heading: string;
    notes: readonly NoteCopy[];
    body: string;
    path: string;
    script: TermScript;
  };
  train: {
    heading: string;
    lede: string;
    body: string;
    path: string;
    script: TermScript;
    /** Counted up when the slide opens, above the transcript. */
    stats: readonly StatCopy[];
  };
  rules: {
    heading: string;
    notes: readonly NoteCopy[];
  };
  cta: {
    heading: string;
    commands: readonly string[];
    lede: string;
    link: string;
  };
}
