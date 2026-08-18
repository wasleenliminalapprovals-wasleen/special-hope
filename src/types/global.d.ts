/**
 * Ambient module declaration for plain (non-module) CSS side-effect imports.
 *
 * Next.js compiles `import "./x.css"` at build time, but its shipped global
 * types only declare `*.module.css` / `*.module.sass` / `*.module.scss`
 * (see node_modules/next/types/global.d.ts). Without this declaration,
 * strict TypeScript setups (e.g. `noUncheckedSideEffectImports`) report:
 *   "Cannot find module or type declarations for side-effect import".
 *
 * `*.module.css` remains more specific than `*.css`, so CSS Modules keep
 * their typed class maps; plain stylesheets resolve as side-effect-only
 * modules, which is exactly how Next.js treats them.
 */
declare module "*.css";
