import { useState, useRef } from 'react';
import { ActionMenu } from '../../src/index';
import { Icon } from '@svar-ui/react-core';
import './CustomArea.css';

export default function CustomArea() {
  const options = [
    {
      text: 'Cut 111',
      icon: 'wxi wxi-content-cut',
    },
    {
      text: 'Copy',
      icon: 'wxi wxi-content-copy',
    },
    {
      text: 'Paste',
      icon: 'wxi wxi-content-paste',
    },
  ];

  const [message, setMessage] = useState('');
  const [submessage] = useState('');

  function clicked(ev) {
    const { context, action } = ev;
    setMessage(action ? `${action.id} for item #${context}` : 'closed');
  }

  const items = [
    { id: 1, type: 'project' },
    { id: 2, type: 'task' },
  ];

  const resolver = (id) => id;
  const innerResolver = (id) => (id[0] == 'b' ? id : null);
  const outerResolver = (id) => (id[0] == 'c' ? id : null);

  const menu = useRef(null);

  return (
    <>
      <div className="wx-JTc3FJgI demo-status">
        {message} {submessage}
      </div>

      <ActionMenu at="right" options={options} onClick={clicked} ref={menu} />
      <div className="wx-JTc3FJgI demo-box">
        <h3>Action menu, icons</h3>
        <p>Click on menu "button"</p>
        {items.map((item) => (
          <div className="wx-JTc3FJgI item" key={item.id}>
            <div className="wx-JTc3FJgI icon">
              <Icon
                css="wxi-menu"
                onClick={(ev) => menu.current && menu.current.show(ev, item.id)}
              />
            </div>
            <div className="wx-JTc3FJgI title">
              {item.type} {item.id}
            </div>
          </div>
        ))}
      </div>

      <div className="wx-JTc3FJgI demo-box">
        <h3>Action menu, limited to specific areas</h3>
        <p>Click on menu "button"</p>
        <ActionMenu
          at="right"
          options={options}
          onClick={clicked}
          resolver={resolver}
        >
          {items.map((item) => (
            <div className="wx-JTc3FJgI item" key={item.id}>
              <div data-context-id={item.id} className="wx-JTc3FJgI menu">
                menu
              </div>
              <div className="wx-JTc3FJgI title">
                {item.type} {item.id}
              </div>
            </div>
          ))}
        </ActionMenu>
      </div>

      <div className="wx-JTc3FJgI demo-box">
        <h3>Nested action menu, different menu for card and button areas</h3>
        <p>Click on menu "button" or on any card</p>
        <ActionMenu
          at="right"
          options={[{ id: 1, text: 'inner menu' }]}
          resolver={innerResolver}
        >
          <ActionMenu
            at="point"
            options={options}
            onClick={clicked}
            resolver={outerResolver}
          >
            {items.map((item) => (
              <div
                className="wx-JTc3FJgI item"
                data-context-id={'c' + item.id}
                key={item.id}
              >
                <div
                  data-context-id={'b' + item.id}
                  className="wx-JTc3FJgI menu"
                >
                  menu
                </div>
                <div className="wx-JTc3FJgI title">
                  {item.type} {item.id}
                </div>
              </div>
            ))}
          </ActionMenu>
        </ActionMenu>
      </div>
    </>
  );
}
