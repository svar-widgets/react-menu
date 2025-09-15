import { useState } from 'react';
import { Button, Segmented } from '@svar-ui/react-core';
import { DropDownMenu } from '../../src/index';
import { getOptions } from '../data';
import './MenuPositions.css';

function MenuPositions() {
  const options = getOptions();

  const [at, setAt] = useState('right');
  const modes = [
    { id: 'right', label: 'right' },
    { id: 'left', label: 'left' },
    { id: 'top', label: 'top' },
    { id: 'bottom', label: 'bottom' },
    { id: 'bottom-right', label: 'bottom, right' },
    { id: 'bottom-left', label: 'bottom, left' },
  ];

  return (
    <div className="wx-ruKQQ13c demo-box">
      <h3>Supported menu positions</h3>
      <Segmented
        options={modes}
        value={at}
        onChange={({ value }) => setAt(value)}
      />

      <p>Click the button, menu will be shown at the selected position</p>

      <div
        className="wx-ruKQQ13c area"
        style={{ paddingLeft: 200, paddingTop: 100 }}
      >
        <DropDownMenu at={at} options={options}>
          <Button type="primary">Click me</Button>
        </DropDownMenu>
      </div>
    </div>
  );
}

export default MenuPositions;
