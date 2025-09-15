import { useState } from 'react';
import { Button } from '@svar-ui/react-core';
import { DropDownMenu } from '../../src/index';
import { getOptions } from '../data';

const options = getOptions();

function DropDown() {
  const [message, setMessage] = useState('');

  function clicked(ev) {
    const action = ev.action;
    setMessage(action ? `clicked on ${action.id}` : 'closed');
  }

  return (
    <>
      <div className="wx-x7Np1rPq demo-status">{message}</div>

      <div className="wx-x7Np1rPq demo-box">
        <h3>Dropdown menu, default</h3>
        <DropDownMenu options={options} onClick={clicked}>
          <Button type="primary">Click me</Button>
        </DropDownMenu>
      </div>

      <div className="wx-x7Np1rPq demo-box">
        <h3>Dropdown menu, fit to button</h3>
        <DropDownMenu options={options} at="bottom-fit" onClick={clicked}>
          <Button type="primary">Click me and check the menu size</Button>
        </DropDownMenu>
      </div>

      <div className="wx-x7Np1rPq demo-box">
        <h3>Dropdown menu, right</h3>
        <DropDownMenu options={options} onClick={clicked} at="right">
          <Button type="primary">Click me</Button>
        </DropDownMenu>
      </div>

      <div className="wx-x7Np1rPq demo-box">
        <h3>Dropdown menu from icon</h3>
        <DropDownMenu options={options} onClick={clicked} at="right">
          <Button icon="wxi-calendar" />
        </DropDownMenu>
      </div>
    </>
  );
}

export default DropDown;
