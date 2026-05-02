/**
 * WHY THIS SCRIPT EXISTS — Turbopack + Windows + CSS "style" export condition bug
 *
 * Problem:
 *   tw-animate-css and shadcn ship their CSS files exclusively via the "style" export
 *   condition in their package.json exports map, e.g.:
 *
 *     "exports": {
 *       ".": { "style": "./dist/tw-animate.css" }
 *     }
 *
 *   In a standard Node.js / webpack environment, @tailwindcss/postcss resolves
 *   bare @import specifiers (e.g. @import 'tw-animate-css') by reading the "style"
 *   condition — this works fine.
 *
 *   However, Turbopack (the default bundler in Next.js 16 dev mode) runs the
 *   @tailwindcss/postcss plugin inside an isolated worker sandbox on Windows.
 *   That sandbox does NOT pass the "style" condition when resolving CSS imports,
 *   so it falls back to the "default" condition — which these packages don't export.
 *   Result: a cryptic build error ("not exported under condition style" or a JSON
 *   SyntaxError at position 135 in the PostCSS worker).
 *
 * Attempted alternatives that didn't work:
 *   - @import 'tw-animate-css'           → "style" condition missing → crash
 *   - @import 'tw-animate-css/dist/tw-animate.css'
 *                                        → not a valid exports key → crash
 *   - @import 'shadcn/tailwind.css'      → same issue
 *
 * This fix:
 *   Copy the CSS files from node_modules into app/ at install time so that
 *   globals.css can use relative imports (@import './tw-animate.css') which
 *   bypass the exports map entirely — Turbopack resolves relative paths fine.
 *
 * When can this be removed?
 *   When Next.js / Turbopack fixes the PostCSS worker to pass the "style" export
 *   condition on Windows. Track: https://github.com/vercel/next.js/issues/90860
 *   Once fixed: delete this script, remove the postinstall hook from package.json,
 *   remove the .gitignore entries, and restore globals.css to bare imports:
 *     @import 'tw-animate-css';
 *     @import 'shadcn/tailwind.css';
 */

import { copyFileSync } from 'node:fs'

copyFileSync('node_modules/tw-animate-css/dist/tw-animate.css', 'app/tw-animate.css')
copyFileSync('node_modules/shadcn/dist/tailwind.css', 'app/shadcn.css')
