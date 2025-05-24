export function prettyLog(obj, title = null) {
  // Create a colorful console group
  const groupStyle = [
    'background: linear-gradient(to right, #4a00e0, #8e2de2)',
    'color: white',
    'padding: 4px 8px',
    'border-radius: 4px',
    'font-weight: bold'
  ].join(';');

  // Open console group with optional title
  if (title) {
    console.groupCollapsed(`%c${title}`, groupStyle);
  } else {
    console.groupCollapsed('%cObject', groupStyle);
  }

  // Log each property with different colors
  for (const [key, value] of Object.entries(obj)) {
    const keyStyle = 'color: #8e2de2; font-weight: bold';
    const valueStyle = typeof value === 'string' 
      ? 'color: #4CAF50' 
      : 'color: #2196F3';

    console.log(`%c${key}:`, keyStyle, `%c${JSON.stringify(value, null, 2)}`, valueStyle);
  }

  // Also log the complete object in a collapsed group
  console.groupCollapsed('%cComplete Object', 'color: #888');
  console.dir(obj, { depth: null, colors: true });
  console.groupEnd();

  console.groupEnd();
}