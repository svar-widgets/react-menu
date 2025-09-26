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

  function setMenu(ev, option, trigger) {
    // if the option has a submenu, show it and enable hover mode
    if (option.data && option.data.length) {
      if (active && trigger) {
        // second click on option with submenu disables hover mode
        setActive(null);
      } else {
        setMenuOptions(option.data);
        setActive(option.id);
        menu.current.show(ev, option);
      }
    } else {
      // hide the submenu
      menu.current.show(null);
      // if it was the click action, dispatch it and end hover mode
      if (trigger) {
        // [deprecated] action will be deprecated in 3.0
        onClick && onClick({ action: option, option });
        setActive(null);
      } else {
        // do not remove active flag, to preserve the hover mode
        setActive(-1);
      }
    }
  }

  function onHover(ev, option) {
    if (active) setMenu(ev, option);
  }

  return (
    <>
      <div className={`wx-UfhPCLL4 wx-menubar ${css}`}>
        {finalOptions.map((option) => (
          <button
            key={option.id}
            className={`wx-UfhPCLL4 wx-option ${active === option.id ? 'wx-active' : ''}`}
            onMouseEnter={(ev) => onHover(ev, option)}
            onClick={(ev) => setMenu(ev, option, true)}
          >
            {option.text}
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
