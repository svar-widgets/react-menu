import { useState, useMemo, useCallback } from 'react';
import { ContextMenu } from '../../src/index';
import { getOptions } from '../data';
import './ActionHandler.css';

export default function ActionHandler() {
  const [message, setMessage] = useState('');

  const options = useMemo(() => getOptions(), []);

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

  const clicked = useCallback((ev) => {
    const { context, action } = ev;
    setMessage(
      action ? `${action.id} for ${context.type} ${context.id}` : 'closed',
    );
  }, []);

  const getItem = useCallback(
    (id) => {
      const item = items.find((a) => a.id == id);

      if (item.disabled) return null;
      return item;
    },
    [items],
  );

  const filterMenu = useCallback((menu, item) => {
    if (
      item.type === 'project' &&
      typeof menu.id === 'string' &&
      !menu.id.startsWith('add-task')
    )
      return false;

    return true;
  }, []);

  return (
    <>
      <div className="wx-PP9LCPOn demo-status">{message}</div>

      <div className="wx-PP9LCPOn demo-box">
        <h3>Custom rules for context menu</h3>
        <p>Some items disabled, taks and project menu differs</p>
        <ContextMenu
          options={options}
          resolver={getItem}
          filter={filterMenu}
          onClick={clicked}
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-context-id={item.id}
              className={`wx-PP9LCPOn item${item.disabled ? ' disabled' : ''}`}
            >
              {item.name}
            </div>
          ))}
        </ContextMenu>
      </div>
    </>
  );
}
