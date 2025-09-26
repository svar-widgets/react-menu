import { useMemo, useState } from 'react';
import { ContextMenu } from '../../src/index';
import { getOptions } from '../data';
import './Context.css';

export default function Context() {
  const options = useMemo(() => getOptions(), []);
  const [message, setMessage] = useState('');

  function clicked(ev) {
    const option = ev.option;
    setMessage(option ? `clicked on ${option.id}` : 'closed');
  }

  return (
    <>
      <div className="wx-WCEK9S2T demo-status">{message}</div>

      <div className="wx-WCEK9S2T demo-box">
        <h3>Right click menu</h3>
        <ContextMenu options={options} onClick={clicked} at="point">
          <div className="wx-WCEK9S2T box">Click me (menu at cursor)</div>
        </ContextMenu>
      </div>

      <div className="wx-WCEK9S2T demo-box">
        <h3>Nested context menus</h3>
        <ContextMenu options={options} onClick={clicked} at="point">
          <div
            className="wx-WCEK9S2T double-box"
            style={{ padding: '20px', background: '#ddd' }}
          >
            Click me (outer menu)
            <br />
            <ContextMenu
              options={[{ id: 'inner', text: 'inner menu' }]}
              onClick={clicked}
              at="right"
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '150px',
                  padding: '10px',
                  background: '#fff',
                }}
              >
                (inner menu)
              </span>
            </ContextMenu>
            <br />
          </div>
        </ContextMenu>
      </div>
    </>
  );
}
