/**
 * Terminal transcripts as data.
 *
 * The old demo stored terminal output as HTML strings inside the translation
 * table, which meant every locale had to re-type the markup. Here a transcript
 * is a typed array of lines, so a translator only touches the words.
 */

/** Colour roles available inside a transcript. Mapped to CSS in terminal.css. */
export type Tone = 'green' | 'amber' | 'red' | 'muted' | 'bold';

export interface TermSpan {
  text: string;
  tone?: Tone;
}

export type TermLine =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; delay: number; spans: TermSpan[] };

export type TermScript = readonly TermLine[];

/** A coloured fragment of an output line. */
export const s = (text: string, tone?: Tone): TermSpan => ({ text, tone });

/** A line the user "types". The caret runs through it character by character. */
export const cmd = (text: string): TermLine => ({ kind: 'cmd', text });

/** A line the program prints, `delay` ms after the previous one appeared. */
export const out = (delay: number, ...parts: Array<TermSpan | string>): TermLine => ({
  kind: 'out',
  delay,
  spans: parts.map(part => (typeof part === 'string' ? { text: part } : part))
});

/** A blank line used as a beat between blocks of output. */
export const gap = (delay = 300): TermLine => out(delay, ' ');
