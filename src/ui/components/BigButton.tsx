export default function BigButton(props: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'neutral';
}) {
  const { label, onClick, disabled, variant = 'primary' } = props;
  const bg =
    variant === 'danger'
      ? '#b91c1c'
      : variant === 'neutral'
      ? '#1f2937'
      : '#0f766e';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        minHeight: 72,
        borderRadius: 16,
        border: 'none',
        background: disabled ? '#374151' : bg,
        color: '#fff',
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: 0.5,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}