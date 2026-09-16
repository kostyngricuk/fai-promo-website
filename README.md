# FAI promo website

The FAI demo deck, rebuilt on [Astro](https://astro.build) with
[React Bits](https://www.reactbits.dev) for the motion work.

Twelve slides, keyboard and click navigation, auto-play, and an EN/RU language switch —
all on one statically rendered page hydrated by two React islands.

The two background greens are lighter than the banner's, and `--muted` is a shade
darker, so `--green` type clears 4.5:1 against the page.

## Running it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built output
npm run check    # astro check (TypeScript + Astro diagnostics)
```

## Layout

Files are grouped by kind, not by feature.

```
src/
├── pages/index.astro        the only page — <head>, then the islands
├── i18n/                    translations
│   ├── term.ts              typed terminal-transcript primitives (cmd/out/s/gap)
│   ├── types.ts             the Dictionary contract both locales satisfy
│   ├── en.ts                English — the source of truth
│   ├── ru.ts                Russian
│   └── index.ts             locale registry and lookup
├── styles/                  styles
│   ├── index.css            the one import; pulls in the rest, in order
│   ├── tokens.css           palette, type stacks, spacing
│   ├── base.css             element defaults
│   ├── deck.css             slide shell and layout primitives
│   ├── terminal.css         the terminal window and its tone classes
│   ├── content.css          cards, tables, chips, stats, the closing block
│   ├── rail.css             bottom navigation rail
│   ├── github-link.css      the corner repo link
│   └── reactbits.css        theme overrides for the vendored components
└── components/              components
    ├── Deck.tsx             the island: slide state, keyboard, auto-play, locale
    ├── Backdrop.tsx         the ambient WebGL layer (skipped without WebGL)
    ├── GitHubLink.astro     corner repo link — static, no hydration
    ├── Terminal.tsx         replays a transcript with a typing caret
    ├── Rail.tsx, LangSwitch.tsx, Heading.tsx, Kicker.tsx,
    │   NoteCard.tsx, FileCard.tsx, Stats.tsx, Reveal.tsx
    ├── DeckContext.ts       reduced-motion flag + "this slide has finished" signal
    ├── slides/              one file per slide, plus the ordered registry
    └── reactbits/           vendored React Bits components — see its README
```

## Adding a slide

1. Add its copy to `src/i18n/types.ts`, then to `en.ts` and `ru.ts`.
2. Write `src/components/slides/MySlide.tsx`.
3. Register it in `src/components/slides/index.ts` — position in that array is deck order.

## Adding a language

Add `src/i18n/xx.ts` satisfying `Dictionary`, then one entry in `LOCALES`
(`src/i18n/index.ts`). The switch in the rail picks it up automatically.

## Notes

- **Terminal transcripts are data, not markup.** `cmd()`, `out()` and `s()` in
  `src/i18n/term.ts` build typed lines, so translating a terminal means translating
  words rather than re-typing HTML.
- **Slides remount on every change.** `Deck` keys the active slide on
  `locale + slide id`; remounting is what replays the GSAP-driven entrances.
- **Auto-play waits for the slide.** A slide with a terminal reports completion
  through `DeckContext.sceneDone` before the dwell timer starts, so a long
  transcript is never cut off.
- **The backdrop can always be skipped.** `Threads` throws from its mount effect
  when no WebGL context is available. `Backdrop` probes first and wraps it in an
  error boundary, so a machine without WebGL simply gets a plain background.
- **`prefers-reduced-motion` is honoured throughout** — transcripts render complete,
  reveals are skipped, and the WebGL backdrop is not mounted at all.
