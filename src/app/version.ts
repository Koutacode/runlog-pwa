// This module exposes the application version injected by the Vite config.
// The __APP_VERSION__ global is provided via the define option in vite.config.ts.
declare const __APP_VERSION__: string;

export const APP_VERSION: string = __APP_VERSION__;