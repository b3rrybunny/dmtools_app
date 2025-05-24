function VerticalLine({ height = '100', color = 'black', margin = '0 10px' }) {
  return (
    <svg width="1" height={height} style={{ margin }}>
      <line x1="0" y1="0" x2="0" y2={height} stroke={color} strokeWidth="1" />
    </svg>
  );
}

export default VerticalLine;