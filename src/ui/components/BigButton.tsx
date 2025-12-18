export default function BigButton(props: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'neutral';
}) {
  const { label, onClick, disabled, variant = 'primary' } = props;
  const gradient =
    variant === 'danger'
      ? 'linear-gradient(135deg, #ef4444, #b91c1c)'
      : variant === 'neutral'
      ? 'linear-gradient(135deg, #334155, #1f2937)'
      : 'linear-gradient(135deg, #22d3ee, #0ea5e9)';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        minHeight: 78,
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.08)',
        background: disabled ? '#374151' : gradient,
        color: '#fff',
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: 0.5,
        opacity: disabled ? 0.55 : 1,
        boxShadow: disabled ? 'none' : '0 16px 35px rgba(0,0,0,0.28)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.08s ease, box-shadow 0.1s ease',
        touchAction: 'manipulation',
      }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={e => !disabled && (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseLeave={e => !disabled && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {label}
    </button>
  );
}
