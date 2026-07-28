/**
 * Barrel exports for animated engineering drawing scenes.
 *
 * All scenes use "use client" for CSS-animated SVG rendering.
 * Import like: import SceneA_FloorPlan from "@/components/drawings";
 *
 * @see /plans/complete-build-plan.md (Phase 12 — Animated SVG Drawings)
 */

export { default as SceneA_FloorPlan } from "./SceneA_FloorPlan";
export { default as SceneB_SitePlan } from "./SceneB_SitePlan";
export { default as SceneC_Structural } from "./SceneC_Structural";
export { default as SceneD_ApprovalStamp } from "./SceneD_ApprovalStamp";
export { default as SceneE_MultiView } from "./SceneE_MultiView";

export * from "./DrawingSymbols";
