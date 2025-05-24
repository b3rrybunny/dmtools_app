export function extractParenthesesContent(input) {
  const match = input.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
}

export function extractNumbersOutsideParentheses(input) {
  // Step 1: Remove everything inside parentheses (including parentheses)
  const withoutParentheses = input.replace(/\([^)]*\)/g, '').trim();
  
  // Step 2: Extract numbers (including negative numbers if needed)
  const numbers = withoutParentheses.match(/-?\d+/g);
  
  // Return the first number found (or null if none)
  return numbers ? numbers[0] : null;
}

export function rollDice(notation = '1d6 + 3') {
  // Remove all whitespace and parentheses
  const preCleanNotation = extractParenthesesContent(notation) || notation;
  const cleanNotation = preCleanNotation.replace(/\s|\(|\)/g, '');
  
  // Split into components (e.g., ["19d12", "+133"])
  const parts = cleanNotation.split(/(?=[+-])/);
  
  let total = 0;
  
  for (const part of parts) {
    if (part.includes('d')) {
      // Dice roll part (e.g., "19d12")
      const [count, sides] = part.split('d').map(Number);
      for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
      }
    } else {
      // Static modifier (e.g., "+133")
      total += Number(part);
    }
  }
  console.log('Rolled ' + cleanNotation + ': ' + total.toString());
  return total;
}

export function rollInit(dex = 10, adv = false, disadv = false) {
    if (adv) {
        const firstCheck = rollInit(dex);
        const secondCheck = rollInit(dex);
        if (firstCheck > secondCheck) {
            return (firstCheck);
        }
        else {
            return (secondCheck);
        }
    }
    if (disadv) {
        const firstCheck = rollInit(dex);
        const secondCheck = rollInit(dex);
        if (firstCheck < secondCheck) {
            return (firstCheck);
        }
        else {
            return (secondCheck);
        }
    }
    return (rollDice('1d20 + ' + dex.toString()))
}