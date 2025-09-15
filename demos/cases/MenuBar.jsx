import { useMemo, useState, useCallback } from 'react';
import { MenuBar as MenuBarComponent } from '../../src/index';
import { getMenuBarOptions } from '../data';

export default function MenuBar() {
  const options = useMemo(() => getMenuBarOptions(), []);
  const [message, setMessage] = useState('');

  const clicked = useCallback((ev) => {
    const action = ev.action;
    setMessage(action ? `clicked on ${action.id}` : 'closed');
  }, []);

  return (
    <>
      <MenuBarComponent options={options} onClick={clicked} />
      <div className="wx-gtwHRzsQ demo-status">{message}</div>
    </>
  );
}
