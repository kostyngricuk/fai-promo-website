import type { Dictionary } from './types';
import { cmd, gap, out, s } from './term';

export const en: Dictionary = {
  ui: {
    play: 'Auto-play',
    pause: 'Pause',
    prev: 'Previous slide',
    next: 'Next slide',
    navLabel: 'Slide navigation',
    languageLabel: 'Language',
    slide: n => `Slide ${n}`
  },

  intro: {
    kicker: 'a plugin for Claude Code',
    kickerDim: 'github.com/kostyngricuk/fai',
    headline: ['One agent per feature.', 'It knows the rules', 'your code does not say.'],
    lede:
      'FAI builds a small expert for each part of your app. It learns the feature once. ' +
      'Then it helps you plan, review and ship changes to it.',
    hint: 'press → to move, or click Auto-play'
  },

  problem: {
    heading: 'A normal AI assistant starts from zero every time.',
    lede:
      'It reads your code and writes a plan that looks great. The plan is clear, confident ' +
      'and wrong about how your business actually works.',
    notes: [
      {
        title: 'It does not know why a rule is there',
        body: 'The reason sits in a ticket from eight months ago.'
      },
      {
        title: 'It brings back code you deleted on purpose',
        body: 'Nothing in the repo says “we removed this for a reason”.'
      },
      {
        title: 'It forgets the files that must change together',
        body: 'The text keys, the types, the place where the new thing gets registered.'
      },
      {
        title: 'It breaks a rule it never saw',
        body: 'Like: only one discount per order. That is checked in exactly one file.'
      }
    ]
  },

  sources: {
    heading: 'Each agent learns from four places.',
    lede:
      'Three of them are already in your project. The fourth one is you — and that is the one ' +
      'that matters most.',
    thReads: 'It reads',
    thLearns: 'And learns',
    rows: [
      { key: 'your code', value: 'Which files matter, and where each rule is checked' },
      { key: 'git history', value: 'Why things are like this, and what was tried and dropped' },
      { key: 'tickets, PRs', value: 'What the feature is for, and what is still open' },
      { key: 'you', value: 'The rules nobody ever wrote down' }
    ]
  },

  install: {
    heading: 'Two commands to install.',
    lede:
      'Nothing is copied into your repo. The plugin stays in Claude Code. Only the notes your ' +
      'agents write end up in your project.',
    chips: [
      { label: 'Claude Code · needed', on: true },
      { label: 'git · nice to have' },
      { label: 'gh CLI · optional' },
      { label: 'Linear, Jira · optional' }
    ],
    note: 'If a tool is missing, FAI prints a note and keeps going. It never fails.',
    path: '~/projects/acme-shop',
    script: [
      cmd('/plugin marketplace add kostyngricuk/khdev'),
      out(420, s('✓', 'green'), ' added ', s('khdev', 'bold')),
      gap(260),
      cmd('/plugin install fai@khdev'),
      out(480, s('✓', 'green'), ' installed ', s('fai', 'bold'), ' — 5 commands ready'),
      out(220, '  /fai:create      teach it a feature'),
      out(120, '  /fai:plan        plan a ticket'),
      out(120, '  /fai:save-plan   save the plan for later'),
      out(120, '  /fai:review      review your changes'),
      out(120, '  /fai:train       keep the agents up to date'),
      gap(320),
      out(60, s('no setup — folders are made when they are needed', 'muted'))
    ]
  },

  create: {
    heading: 'It reads everything first, then asks you a few things.',
    lede:
      'It looks through the code, the git history and the tickets it finds there. Only then does ' +
      'it ask you — at most four questions, and each one points at a real line of code. ' +
      'No vague “anything I should know?”.',
    path: '~/projects/acme-shop',
    script: [
      cmd('/fai:create checkout'),
      out(380, s('reading', 'muted'), '  screens · data · tests, texts, config'),
      out(420, s('✓', 'green'), ' 31 files found'),
      out(280, s('history', 'muted'), '  142 commits · 9 tickets mentioned'),
      out(
        400,
        s('!', 'amber'),
        ' ',
        s('STACKABLE_PROMO_CAP', 'bold'),
        ' was deleted in 8f21ac3 ',
        s('(never came back)', 'muted')
      ),
      out(300, s('tickets', 'muted'), '  TID-902, TID-1187 read from Linear'),
      gap(500),
      out(60, s('?', 'green'), ' promo.ts:84 allows only one discount per order.'),
      out(120, '  Is that a real rule, or old leftover code?'),
      out(540, s('›', 'green'), ' real rule — legal, never change it'),
      gap(440),
      out(60, s('✓', 'green'), ' .fai/features/checkout.md ', s('· the notes', 'muted')),
      out(140, s('✓', 'green'), ' .claude/agents/fai-checkout.md ', s('· the name tag', 'muted'))
    ]
  },

  anatomy: {
    heading: 'An agent is just two files.',
    files: [
      {
        name: '.fai/features/checkout.md',
        body:
          'Everything it knows. Plain text — you can read it in a pull request and fix it by hand.'
      },
      {
        name: '.claude/agents/fai-checkout.md',
        body:
          'Five lines. It holds no knowledge. It only lets Claude Code find the agent by name.'
      }
    ],
    note: 'Commit both. What the agent learns belongs to the team, not to one laptop.',
    sections: [
      'What this feature is',
      'How it is built',
      'Which files do what',
      'How data moves',
      'The business rules',
      'Patterns to reuse',
      'Done, still open, and “do not add this back”',
      'Tests',
      'Commands to check your work',
      'How you name commits and PRs',
      'Nearby features and where this one ends',
      'Outside systems it talks to',
      'How to write a plan here',
      'How to review a change here',
      'What it learned over time'
    ],
    highlight: [5, 7],
    foot: 'Any assistant could work out the rest from the code. Lines 5 and 7 it cannot.'
  },

  plan: {
    heading: 'Agents work one after another, not at the same time.',
    lede: 'The second agent sees what the first one decided. So the steps fit together instead of clashing.',
    body:
      'Each agent plans only its own part. If it needs something from another feature, it says ' +
      'exactly what it needs. If it disagrees, it says that too.',
    path: '~/projects/acme-shop',
    script: [
      cmd('/fai:plan TID-1234'),
      out(420, s('ticket', 'muted'), '  “Gift cards at checkout”'),
      out(
        380,
        s('agents', 'muted'),
        '  ',
        s('fai-checkout', 'green'),
        ' · ',
        s('fai-pricing', 'green'),
        ' ',
        s('(2 of 6)', 'muted')
      ),
      gap(480),
      out(60, s('1 ▸ fai-checkout', 'bold'), ' ', s('plans its part', 'muted')),
      out(440, s('2 ▸ fai-pricing', 'bold'), ' ', s('reads that, then plans its part', 'muted')),
      gap(520),
      out(60, s('✓', 'green'), ' 9 steps, in the right order, each with an owner'),
      out(220, s('▸', 'green'), ' what the two parts agreed on'),
      out(130, '  ', s('checkout sends the gift card event,', 'muted')),
      out(130, '  ', s('pricing uses it before it counts discounts', 'muted')),
      out(320, s('▸', 'amber'), ' risks and open questions'),
      out(130, '  ', s('pricing thinks step 4 should come later', 'muted'))
    ]
  },

  savePlan: {
    heading: 'Stop today. Pick it up next week.',
    lede:
      'The plan is saved as a file with a checklist. Next time, open it, find the first unchecked ' +
      'box and keep going.',
    body:
      'Every fact in the plan names a file and a line — including facts like “this does not exist yet”.',
    path: '.fai/plans/feat-1234.md',
    script: [
      cmd('/fai:save-plan TID-1234'),
      out(440, s('✓', 'green'), ' saved to .fai/plans/feat-1234.md'),
      gap(380),
      out(60, s('ticket:', 'muted'), ' TID-1234'),
      out(90, s('agents:', 'muted'), ' checkout, pricing'),
      out(90, s('status:', 'muted'), ' in progress'),
      gap(340),
      out(60, s('Checklist', 'bold')),
      out(220, s('[x]', 'green'), ' 1 · add the gift card type ', s('— checkout', 'muted')),
      out(190, s('[x]', 'green'), ' 2 · send the event ', s('— checkout', 'muted')),
      out(
        190,
        s('[ ]', 'amber'),
        ' 3 · use it before discounts ',
        s('— pricing', 'muted'),
        ' ',
        s('← start here', 'amber')
      ),
      out(150, s('[ ] 4 · update the texts and types together', 'muted'))
    ]
  },

  review: {
    heading: 'Two reviewers look at your changes.',
    notes: [
      {
        title: 'Your feature agents',
        body:
          'They catch broken business rules, deleted code coming back, and files you forgot to change.'
      },
      {
        title: 'A normal code reviewer',
        body: 'It catches bugs, security issues, slow code and missing tests.'
      }
    ],
    body: 'You get one list, sorted by how bad each thing is. Nothing is saved to disk.',
    path: 'diff · 6 files',
    script: [
      cmd('/fai:review'),
      out(440, s('checking', 'muted'), '  fai-checkout · fai-pricing · code review'),
      gap(500),
      out(60, s('CRITICAL', 'red'), ' ', s('promo.ts:91', 'bold')),
      out(130, '  now allows 2 discounts per order. You told us'),
      out(130, '  this is a legal rule: only one.'),
      out(400, s('HIGH', 'amber'), '     ', s('constants.ts:12', 'bold')),
      out(130, '  STACKABLE_PROMO_CAP is back. It was removed'),
      out(130, '  on purpose in 8f21ac3.'),
      out(400, s('MEDIUM', 'amber'), '   ', s('summary.tsx:40', 'bold')),
      out(130, '  new text added, but no translation key'),
      out(380, s('LOW', 'green'), '      ', s('rates.ts:118', 'bold')),
      out(130, '  same lookup repeated inside the loop')
    ]
  },

  train: {
    heading: 'It checks its old notes against today’s code.',
    lede:
      'Every note is marked: still true, out of date, gone, or new. You see the whole list and ' +
      'approve it before anything is written.',
    body:
      'Run /fai:train with no name to update every agent at once. Do it after a merge, or once a week.',
    path: '6 agents',
    stats: [
      { value: 62, label: 'notes still true' },
      { value: 11, label: 'changes proposed' },
      { value: 4, label: 'agents touched', suffix: ' / 6' }
    ],
    script: [
      cmd('/fai:train'),
      out(440, s('check', 'muted'), '  4 of 6 agents have new commits'),
      out(320, s('skip', 'muted'), '   fai-auth, fai-search ', s('(nothing changed)', 'muted')),
      gap(480),
      out(60, s('agent          still true  old  gone  new', 'bold')),
      out(220, 'fai-checkout          22    ', s('3', 'amber'), '     ', s('1', 'red'), '    ', s('4', 'green')),
      out(150, 'fai-pricing           17    ', s('1', 'amber'), '     0    ', s('2', 'green')),
      out(150, 'fai-cart              14    0     0    ', s('1', 'green')),
      out(150, 'fai-shipping           9    ', s('2', 'amber'), '     0    0'),
      gap(420),
      out(60, s('?', 'green'), ' apply 11 changes to 4 agents? ', s('[y/n]', 'muted')),
      out(540, s('›', 'green'), ' y'),
      out(380, s('✓', 'green'), ' done — your own notes were kept')
    ]
  },

  rules: {
    heading: 'Five rules FAI always follows.',
    notes: [
      {
        title: 'It only reads your tickets',
        body:
          'It never comments, never changes a status, never merges. An agent that can write to ' +
          'your tracker will do it at the worst moment.'
      },
      {
        title: 'Every claim points at a line',
        body:
          'No guessing. It also writes down what does not exist, so the next agent does not invent it.'
      },
      {
        title: 'It knows when it is out of date',
        body:
          'Each agent remembers the commit it learned from. If the code disagrees with it, the code wins.'
      },
      {
        title: 'Missing tools are fine',
        body:
          'No git, no gh, no tracker, no test runner — it still runs and tells you what it could not check.'
      },
      {
        title: 'It asks before it writes',
        body: 'You approve every change to a file you may have edited yourself.'
      }
    ]
  },

  cta: {
    heading: 'Try it on any project.',
    commands: [
      '/plugin marketplace add kostyngricuk/khdev',
      '/plugin install fai@khdev',
      '/fai:create checkout'
    ],
    lede:
      'What stays in your project is a folder of notes and plans — the knowledge your team has ' +
      'been keeping in its head.',
    link: 'github.com/kostyngricuk/fai'
  }
};

export default en;
