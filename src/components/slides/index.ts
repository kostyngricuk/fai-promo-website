import type { FC } from 'react';
import AnatomySlide from './AnatomySlide';
import CreateSlide from './CreateSlide';
import CtaSlide from './CtaSlide';
import InstallSlide from './InstallSlide';
import IntroSlide from './IntroSlide';
import PlanSlide from './PlanSlide';
import ProblemSlide from './ProblemSlide';
import ReviewSlide from './ReviewSlide';
import RulesSlide from './RulesSlide';
import SavePlanSlide from './SavePlanSlide';
import SourcesSlide from './SourcesSlide';
import TrainSlide from './TrainSlide';
import type { SlideProps } from './types';

export interface SlideEntry {
  id: string;
  Component: FC<SlideProps>;
  /**
   * Slides with a terminal signal their own completion; the rest are given a
   * fixed beat. Auto-play uses this to pick a dwell time.
   */
  hasTerminal: boolean;
}

/** Deck order. Adding a slide here is the only edit needed to extend the deck. */
export const SLIDES: readonly SlideEntry[] = [
  { id: 'intro', Component: IntroSlide, hasTerminal: false },
  { id: 'problem', Component: ProblemSlide, hasTerminal: false },
  { id: 'sources', Component: SourcesSlide, hasTerminal: false },
  { id: 'install', Component: InstallSlide, hasTerminal: true },
  { id: 'create', Component: CreateSlide, hasTerminal: true },
  { id: 'anatomy', Component: AnatomySlide, hasTerminal: false },
  { id: 'plan', Component: PlanSlide, hasTerminal: true },
  { id: 'save-plan', Component: SavePlanSlide, hasTerminal: true },
  { id: 'review', Component: ReviewSlide, hasTerminal: true },
  { id: 'train', Component: TrainSlide, hasTerminal: true },
  { id: 'rules', Component: RulesSlide, hasTerminal: false },
  { id: 'cta', Component: CtaSlide, hasTerminal: false }
];

export type { SlideProps };
