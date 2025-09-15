import { useMemo, useState } from 'react';
import { Button } from '@svar-ui/react-core';
import { Menu } from '../../src/index';
import { getOptions } from '../data';
import './BasicInit.css';

function BasicInit() {
  const options = useMemo(() => getOptions(), []);

  const [menu1, setMenu1] = useState(null);
  const [menu2, setMenu2] = useState(null);
  const [menu3, setMenu3] = useState(null);

  const [message, setMessage] = useState('');

  function clicked(ev) {
    const action = ev.action;
    setMessage(action ? `clicked on ${action.id}` : 'closed');
    setMenu1(null);
    setMenu2(null);
    setMenu3(null);
  }

  return (
    <>
      <div className="wx-L5Tl56Yt demo-status">{message}</div>

      <div className="wx-L5Tl56Yt demo-box">
        <h3>Bottom menu</h3>
        <Button type="primary" onClick={(ev) => setMenu1(ev.target)}>
          Click me
        </Button>
        {menu1 ? (
          <Menu options={options} parent={menu1} onClick={clicked} />
        ) : null}
      </div>

      <div className="wx-L5Tl56Yt demo-box">
        <h3>Right-side menu</h3>
        <Button type="primary" onClick={(ev) => setMenu2(ev.target)}>
          Click me
        </Button>
        {menu2 ? (
          <Menu options={options} parent={menu2} onClick={clicked} at="right" />
        ) : null}
      </div>

      <div className="wx-L5Tl56Yt demo-box">
        <h3>Menu at cursor</h3>
        <div className="wx-L5Tl56Yt box" onClick={(ev) => setMenu3(ev)}>
          Click me
        </div>
        {menu3 ? (
          <Menu
            options={options}
            left={menu3.clientX + 5}
            top={menu3.clientY + 5}
            onClick={clicked}
            at="right"
          />
        ) : null}
      </div>
    </>
  );
}

export default BasicInit;
