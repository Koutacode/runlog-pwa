import { useEffect, useState } from 'react';

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function isStandalone(): boolean {
  return (
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    // iOS Safari specific
    (navigator as any).standalone === true
  );
}

export default function InstallButton() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEventLike | null>(null);
  const [installed, setInstalled] = useState<boolean>(isStandalone());
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    function onBIP(e: Event) {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEventLike);
    }
    function onInstalled() {
      setInstalled(true);
      setPromptEvent(null);
    }
    window.addEventListener('beforeinstallprompt', onBIP);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return null;

  return (
    <button
      onClick={async () => {
        if (!promptEvent) return;
        try {
          setInstalling(true);
          await promptEvent.prompt();
          await promptEvent.userChoice;
        } finally {
          setInstalling(false);
          setPromptEvent(null);
        }
      }}
      disabled={!promptEvent || installing}
      style={{
        width: '100%',
        height: 52,
        borderRadius: 12,
        border: '1px solid #164e63',
        background: !promptEvent ? '#1f2937' : '#0f766e',
        color: '#fff',
        fontWeight: 800,
        fontSize: 16,
        opacity: installing ? 0.7 : 1,
      }}
    >
      {!promptEvent ? 'インストール（準備中）' : installing ? 'インストール中…' : 'PWAをインストール'}
    </button>
  );
}
