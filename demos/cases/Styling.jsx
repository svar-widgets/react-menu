import { useMemo } from 'react';
import { Button } from '@svar-ui/react-core';
import { MenuBar, DropDownMenu } from '../../src/index';
import { getMenuBarOptions } from '../data';
import './Styling.css';

function Styling() {
  const options = [
    { id: 1, text: 'Add User', subtext: 'Ctrl+A' },
    { id: 2, text: 'Refresh', subtext: 'Ctrl+R' },
    { id: 3, text: 'Delete User' },
  ];

  const options1 = [
    { id: 1, text: 'Add User', subtext: 'Ctrl+A' },
    { id: 2, text: 'Refresh', subtext: 'Ctrl+R' },
    { id: 3, text: 'Delete User', css: 'danger' },
  ];

  const options2 = useMemo(() => getMenuBarOptions(), []);

  return (
    <>
      <div className="wx-dXAQDMmf demo-box">
        <h3>Style for menu bar</h3>
        <MenuBar css="custom-bar" menuCss="custom-menu" options={options2} />
      </div>
      <div className="wx-dXAQDMmf demo-box">
        <h3>Style for dropdown menu</h3>
        <DropDownMenu options={options} css="custom-menu">
          <Button type="primary">Click me</Button>
        </DropDownMenu>
      </div>
      <div className="wx-dXAQDMmf demo-box">
        <h3>Style for menu option</h3>
        <DropDownMenu options={options1}>
          <Button type="primary">Click me</Button>
        </DropDownMenu>
      </div>
    </>
  );
}

export default Styling;
