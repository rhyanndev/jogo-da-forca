// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import './assets/css/keyboard.css';

function Keyboard() {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].includes(key)) {
        console.log(`Tecla ${key} pressionada`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleClick = (key) => {
    console.log(`Tecla ${key} clicada`);
  };

  return (
    <div className='keyboard'>
<button onClick={() => handleClick('A')}>A</button>
<button onClick={() => handleClick('B')}>B</button>
<button onClick={() => handleClick('C')}>C</button>
<button onClick={() => handleClick('D')}>D</button>
<button onClick={() => handleClick('E')}>E</button>
<button onClick={() => handleClick('F')}>F</button>
<button onClick={() => handleClick('G')}>G</button>
<button onClick={() => handleClick('H')}>H</button>
<button onClick={() => handleClick('I')}>I</button>
<button onClick={() => handleClick('J')}>J</button>
<button onClick={() => handleClick('K')}>K</button>
<button onClick={() => handleClick('L')}>L</button>
<button onClick={() => handleClick('M')}>M</button>
<button onClick={() => handleClick('N')}>N</button>
<button onClick={() => handleClick('O')}>O</button>
<button onClick={() => handleClick('P')}>P</button>
<button onClick={() => handleClick('Q')}>Q</button>
<button onClick={() => handleClick('R')}>R</button>
<button onClick={() => handleClick('S')}>S</button>
<button onClick={() => handleClick('T')}>T</button>
<button onClick={() => handleClick('U')}>U</button>
<button onClick={() => handleClick('V')}>V</button>
<button onClick={() => handleClick('W')}>W</button>
<button onClick={() => handleClick('X')}>X</button>
<button onClick={() => handleClick('Y')}>Y</button>
<button onClick={() => handleClick('Z')}>Z</button>
    </div>
  );
}

export default Keyboard;