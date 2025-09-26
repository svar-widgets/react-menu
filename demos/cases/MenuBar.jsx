import { useMemo, useState, useCallback } from 'react';
import { MenuBar as MenuBarComponent } from '../../src/index';
import { getMenuBarOptions } from '../data';

export default function MenuBar() {
  const options = useMemo(() => getMenuBarOptions(), []);
  const [message, setMessage] = useState('');

  const clicked = useCallback((ev) => {
    const option = ev.option;
    setMessage(option ? `clicked on ${option.id}` : 'closed');
  }, []);

  return (
    <>
      <MenuBarComponent options={options} onClick={clicked} />
      <div className="wx-gtwHRzsQ demo-status">{message}</div>
    </>
  );
}
