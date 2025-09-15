import { useState } from 'react';
import { Button, Text } from '@svar-ui/react-core';
import './ButtonMenuItem.css';

function ButtonMenuItem({ item }) {
  const [value, setValue] = useState('');

  return (
    <div onClick={(ev) => ev.preventDefault()} className="wx-gAIg336n">
      <div style={{ width: '120px', paddingRight: '8px' }}>
        <Text
          placeholder={item.name}
          value={value}
          onChange={({ value }) => setValue(value)}
        />
      </div>
      <Button icon="wxi-delete" type="primary" onClick={() => setValue('')} />
    </div>
  );
}

export default ButtonMenuItem;
