import { useMemo, useState } from 'react';
import { ContextMenu } from '../../src/index';
import { getOptions } from '../data';
import './ContextData.css';

export default function ContextData() {
  const options = useMemo(() => getOptions(), []);

  const [message, setMessage] = useState('');

  function clicked(ev) {
    const { context, action } = ev;
    setMessage(
      action
        ? `${action.id} for ${context.type || 'task'} ${context.id}`
        : 'closed',
    );
  }

  const items = useMemo(
    () => [
      { id: -1, name: 'Disabled', disabled: true },
      { id: 1, name: 'Project A', type: 'project' },
      { id: 2, name: 'Task 1.0' },
      { id: 3, name: 'Project B', type: 'project' },
      { id: 4, name: 'Task 2.1' },
      { id: 5, name: 'Task 2.2' },
    ],
    [],
  );

  function getItem(id) {
    const item = items.find((a) => a.id == id);
    if (item && item.disabled) return null;
    return item;
  }

  return (
    <>
      <div className="wx-JDOOrRxQ demo-status">{message}</div>

      <div className="wx-JDOOrRxQ demo-box">
        <h3>Context menu can be limited to specific HTML elements</h3>
        <p>Some items are disabled</p>
        <ContextMenu
          options={options}
          at="point"
          resolver={getItem}
          onClick={clicked}
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-context-id={item.id}
              className={
                'wx-JDOOrRxQ ' + (item.disabled ? 'item disabled' : 'item')
              }
            >
              {item.name}
            </div>
          ))}
        </ContextMenu>
      </div>
    </>
  );
}
