import React, { useState, useRef, useCallback } from 'react';
import { Button, ModalArea, SideArea, Popup } from '@svar-ui/react-core';
import { ActionMenu } from '../../src/index';
import { getProjects } from '../data';
import './MenuInAreas.css';

export default function MenuInAreas() {
  const options = getProjects();
  const [active, setActive] = useState(['a', 'b', 'c', 'd']);
  const byId = (id) => options.find((a) => a.id === id);

  function filterMenu(v, item) {
    if (v.id === active[item]) {
      v.icon = 'wxi-check';
    } else {
      v.icon = 'wxi-empty';
    }
    return true;
  }

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

  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const menu3 = useRef(null);
  const [modal, setModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className="wx-KhJ1Z5NC buttons">
        <Button onClick={() => setModal(true)} text={'Open modal'} />
        <Button onClick={() => setPopup(true)} text={'Open popup'} />
        <Button onClick={() => setSidebar(true)} text={'Open sidebar'} />
      </div>

      {popup ? (
        <Popup left={200} top={100} onCancel={() => setPopup(false)}>
          <div className="wx-KhJ1Z5NC demo-box">
            <h3>Action menu</h3>
            <p>Click on any button</p>
            <ActionMenu
              options={options}
              filter={filterMenu}
              onClick={clicked}
              ref={menu1}
            />
            {active.map((item, i) => (
              <React.Fragment key={i}>
                <Button
                  onClick={(ev) => menu1.current && menu1.current.show(ev, i)}
                  value={active[i]}
                >
                  {byId(item).text}
                </Button>
              </React.Fragment>
            ))}
          </div>
        </Popup>
      ) : null}

      {modal ? (
        <ModalArea>
          <div className="wx-KhJ1Z5NC toolbar">
            <Button icon="wxi-close" onClick={() => setModal(false)} />
          </div>
          <div className="wx-KhJ1Z5NC demo-box">
            <h3>Action menu</h3>
            <p>Click on any button</p>
            <ActionMenu
              options={options}
              filter={filterMenu}
              onClick={clicked}
              ref={menu2}
            />
            {active.map((item, i) => (
              <React.Fragment key={i}>
                <Button
                  onClick={(ev) => menu2.current && menu2.current.show(ev, i)}
                  value={active[i]}
                >
                  {byId(item).text}
                </Button>
              </React.Fragment>
            ))}
          </div>
        </ModalArea>
      ) : null}

      {sidebar ? (
        <SideArea onCancel={() => setSidebar(false)}>
          <div className="wx-KhJ1Z5NC toolbar">
            <Button icon="wxi-close" onClick={() => setSidebar(false)} />
          </div>
          <div className="wx-KhJ1Z5NC demo-box">
            <h3>Action menu</h3>
            <p>Click on any button</p>
            <ActionMenu
              options={options}
              at="left"
              filter={filterMenu}
              onClick={clicked}
              ref={menu3}
            />
            {active.map((item, i) => (
              <React.Fragment key={i}>
                <Button
                  onClick={(ev) => menu3.current && menu3.current.show(ev, i)}
                  value={active[i]}
                >
                  {byId(item).text}
                </Button>
              </React.Fragment>
            ))}
          </div>
        </SideArea>
      ) : null}
    </>
  );
}
