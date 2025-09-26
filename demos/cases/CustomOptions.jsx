import { useMemo } from 'react';
import { Button } from '@svar-ui/react-core';
import { DropDownMenu, registerMenuItem } from '../../src/index';
import { getTeam } from '../data';
import ButtonMenuItem from '../custom/ButtonMenuItem.jsx';
import UserMenuItem from '../custom/UserMenuItem.jsx';

registerMenuItem('user', UserMenuItem);

function CustomOptions() {
  const styledOptions = useMemo(
    () => [
      { id: 1, text: 'Add User', subtext: 'Ctrl+A' },
      { id: 2, text: 'Refresh', subtext: 'Ctrl+R' },
      { id: 3, text: 'Delete User', css: 'danger' },
    ],
    [],
  );

  const options = useMemo(() => getTeam(), []);
  options[3].comp = ButtonMenuItem;

  return (
    <>
      <div className="wx-sQu70ANM demo-box">
        <h3>Styling menu options</h3>
        <p>Click the button</p>
        <DropDownMenu options={styledOptions}>
          <Button type="primary">Click me</Button>
        </DropDownMenu>
      </div>

      <div className="wx-sQu70ANM demo-box">
        <h3>Custom component as menu option</h3>
        <p>Click the button</p>
        <DropDownMenu options={options}>
          <Button type="primary">Select User</Button>
        </DropDownMenu>
      </div>
    </>
  );
}

export default CustomOptions;
