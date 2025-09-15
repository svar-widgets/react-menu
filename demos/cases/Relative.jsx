import { useEffect, useRef } from 'react';
import { Button, popupContainer } from '@svar-ui/react-core';
import { DropDownMenu } from '../../src/index';
import './Relative.css';

export default function Relative() {
  const options = [
    { id: 1, text: 'Add User', subtext: 'Ctrl+A' },
    { id: 2, text: 'Refresh', subtext: 'Ctrl+R' },
    { id: 3, text: 'Delete User' },
  ];

  const popupContainerRef = useRef(null);

  useEffect(() => {
    popupContainer(popupContainerRef.current);
  }, []);

  return (
    <div className="wx-81VopRQQ wrapper">
      <div className="wx-81VopRQQ demo-box" ref={popupContainerRef}>
        <h3>Scroll relative to container</h3>
        <p>Click on the button and try to scroll</p>
        <DropDownMenu options={options}>
          <Button type="primary">Click me</Button>
        </DropDownMenu>

        <div style={{ height: '2000px' }}>&nbsp;</div>
      </div>

      <div className="wx-81VopRQQ spacer"></div>

      <div className="wx-81VopRQQ demo-box">
        <h3>Scroll relative to document</h3>
        <p>Click on the button and try to scroll</p>
        <DropDownMenu options={options}>
          <Button type="primary">Click me</Button>
        </DropDownMenu>

        <div style={{ height: '2000px' }}>&nbsp;</div>
      </div>
    </div>
  );
}
