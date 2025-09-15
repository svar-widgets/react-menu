import { useMemo, useState, useRef } from 'react';
import ActionMenu from './ActionMenu.jsx';
import { prepareMenuData } from '../helpers';
import './MenuBar.css';

function MenuBar(props) {
  const { css = '', menuCss = '', options, onClick } = props;

  const finalOptions = useMemo(() => prepareMenuData(options), [options]);

  const [active, setActive] = useState(false);
  const [menuOptions, setMenuOptions] = useState([]);

  const menu = useRef(null);

  function doClick(ev) {
    setActive(null);
    onClick && onClick(ev);
  }

  function setMenu(ev, item, trigger) {
    // if the item has a submenu, show it and enable hover mode
    if (item.data && item.data.length) {
      if (active && trigger) {
        // second click on item with submenu disables hover mode
        setActive(null);
      } else {
        setMenuOptions(item.data);
        setActive(item.id);
        menu.current.show(ev, item);
      }
    } else {
      // hide the submenu
      menu.current.show(null);
      // if it was the click action, dispatch it and end hover mode
      if (trigger) {
        onClick && onClick({ action: item });
        setActive(null);
      } else {
        // do not remove active flag, to preserve the hover mode
        setActive(-1);
      }
    }
  }

  function onHover(ev, item) {
    if (active) setMenu(ev, item);
  }

  return (
    <>
      <div className={`wx-UfhPCLL4 wx-menubar ${css}`}>
        {finalOptions.map((item) => (
          <button
            key={item.id}
            className={`wx-UfhPCLL4 wx-item ${active === item.id ? 'wx-active' : ''}`}
            onMouseEnter={(ev) => onHover(ev, item)}
            onClick={(ev) => setMenu(ev, item, true)}
          >
            {item.text}
          </button>
        ))}
      </div>

      <ActionMenu
        css={menuCss}
        onClick={doClick}
        options={menuOptions}
        ref={menu}
      />
    </>
  );
}

export default MenuBar;
