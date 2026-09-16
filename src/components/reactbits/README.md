# Vendored React Bits components

Source: <https://www.reactbits.dev> — `ts-default` variant, copied verbatim from
[DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) (MIT + Commons Clause).

**Do not edit these files.** React Bits is a copy-in library, so re-syncing a component means
overwriting the file. Everything this site needs to change about them is expressed from the
outside:

- colours and sizes → props (`StarBorder`, `GlareHover`, `Threads`, `ShinyText`, …)
- dark-theme defaults baked into the component CSS → overridden in
  `src/styles/reactbits.css`, which is scoped under `.deck` so it always wins on specificity.

| Component         | Used for                                                    |
| ----------------- | ----------------------------------------------------------- |
| `Threads`         | ambient WebGL background behind the whole deck               |
| `SplitText`       | every slide heading, revealed per word                       |
| `ShinyText`       | slide kickers and the intro hint                             |
| `GradientText`    | the closing call to action                                   |
| `CountUp`         | the `/fai:train` stat row                                    |
| `AnimatedContent` | directional reveals for columns and terminals                |
| `FadeContent`     | soft reveals for tables, lists and chips                     |
| `ClickSpark`      | click feedback across the deck surface                       |
| `Magnet`          | the rail controls                                            |
| `SpotlightCard`   | the note cards on the problem, review and rules slides       |
| `GlareHover`      | the two file cards on the anatomy slide                      |
| `StarBorder`      | the install block on the closing slide                       |
