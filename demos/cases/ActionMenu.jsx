import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Button } from '@svar-ui/react-core';
import { ActionMenu as LibActionMenu } from '../../src/index';
import { getProjects } from '../data';

export default function ActionMenu() {
  const options = useMemo(() => getProjects(), []);
  const [active, setActive] = useState(['a', 'b', 'c', 'd']);
  const byId = useCallback((id) => options.find((a) => a.id === id), [options]);

  const filterMenu = useCallback(
    (v, item) => {
      if (v.id === active[item]) {
        v.icon = 'wxi-check';
      } else {
        v.icon = 'wxi-empty';
      }
      return true;
    },
    [active],
  );

  const clicked = useCallback((ev) => {
    const { context, action } = ev;
    if (action) {
      setActive((prev) => {
        const next = [...prev];
        next[context] = action.id;
        return next;
      });
    }
  }, []);

  const menu = useRef(null);

  return (
    <div className="wx-pVgTKsrj demo-box">
      <h3>Action menu</h3>
      <p>Click on any button</p>
      <LibActionMenu
        options={options}
        filter={filterMenu}
        onClick={clicked}
        ref={menu}
      />
      {active.map((item, i) => (
        <React.Fragment key={i}>
          <Button
            onClick={(ev) => menu.current && menu.current.show(ev, i)}
            value={active[i]}
          >
            {byId(item).text}
          </Button>
          &nbsp;
        </React.Fragment>
      ))}
    </div>
  );
}
