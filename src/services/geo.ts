import type { Geo } from '../domain/types';

/**
 * getGeo returns the current position from the browser's geolocation API. If
 * geolocation is unavailable or fails it resolves to undefined. The
 * implementation requests high accuracy and has sensible timeouts.
 */
export async function getGeo(): Promise<Geo | undefined> {
  if (!navigator.geolocation) return undefined;
  return new Promise<Geo | undefined>(resolve => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      () => resolve(undefined),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 },
    );
  });
}