import { createContext, useContext } from 'react';

export interface DeckContextValue {
  /** True when the visitor asked the OS for less motion. Slides render statically. */
  reduceMotion: boolean;
  /**
   * Called by the slide once its entrance choreography has played out.
   * Auto-play waits for this before starting its dwell timer, so a slide with a
   * long terminal transcript is never cut off mid-sentence.
   */
  sceneDone: () => void;
}

export const DeckContext = createContext<DeckContextValue>({
  reduceMotion: false,
  sceneDone: () => {}
});

export function useDeck(): DeckContextValue {
  return useContext(DeckContext);
}
