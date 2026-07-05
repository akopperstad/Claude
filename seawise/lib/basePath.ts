/**
 * Base path for static asset URLs referenced outside Next's own routing
 * (inline background-images, manual preloads). Next rewrites <Link>/router
 * paths under basePath automatically — raw CSS url()s it does not.
 * Empty in normal builds; "/Claude" on the GitHub Pages export.
 */
export const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
