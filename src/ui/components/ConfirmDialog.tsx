interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  yesText?: string;
  noText?: string;
  onYes: () => void;
  onNo: () => void;
}

export default function ConfirmDialog({ open, title, message, yesText = 'はい', noText = 'いいえ', onYes, onNo }: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', display: 'grid', placeItems: 'center', zIndex: 9999 }}>
      <div style={{ width: 'min(520px, 92vw)', background: '#111', color: '#fff', borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{title}</div>
        <div style={{ opacity: 0.9, marginBottom: 16 }}>{message}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onNo} style={{ padding: '10px 14px', borderRadius: 12 }}>
            {noText}
          </button>
          <button onClick={onYes} style={{ padding: '10px 14px', borderRadius: 12, fontWeight: 800 }}>
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}