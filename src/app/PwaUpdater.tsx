import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import UpdateDialog from '../ui/components/UpdateDialog';

/**
 * PwaUpdater listens for service worker updates and prompts the user to reload
 * when a new version is available. The service worker registration is
 * configured to prompt rather than auto reload so that the user can decide
 * when to update. Once the update is accepted the new worker takes control
 * immediately and the page reloads.
 */
export default function PwaUpdater() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateSW, setUpdateSW] = useState<null | ((reload?: boolean) => void)>(null);

  useEffect(() => {
    const unregister = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        // Optionally notify the user that the app can be used offline.
      },
    });
    setUpdateSW(() => unregister);

    // Periodically check for updates while the app is open.
    const interval = setInterval(() => {
      unregister?.(false);
    }, 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <UpdateDialog
      open={needRefresh}
      onClose={() => setNeedRefresh(false)}
      onUpdate={() => {
        // Force the waiting worker to become active and reload the page.
        updateSW?.(true);
      }}
    />
  );
}