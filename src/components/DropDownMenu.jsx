import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Portal } from '@svar-ui/react-core';
import Menu from './Menu.jsx';

const DropDownMenu = forwardRef(function DropDownMenu(props, ref) {
  const { options, at = 'bottom', css = '', children, onClick } = props;

  const [parent, setParent] = useState(null);

  // Ref to the event that triggered the menu, used to
  // prevent the menu from closing immediately after opening
  const showEventRef = useRef(null);

  function handleClick(ev) {
    setParent(null);
    onClick && onClick(ev);
  }

  function handleCancel(ev) {
    // Prevent closing from the event that opened the menu
    if (showEventRef.current === ev) {
      showEventRef.current = null;
      return;
    }
    setParent(null);
    // [deprecated] action will be deprecated in 3.0
    onClick && onClick({ action: null, option: null });
  }

  const show = useCallback((ev) => {
    setParent(ev.target);
    showEventRef.current = ev.nativeEvent || ev;
    ev.preventDefault();
  }, []);

  useImperativeHandle(ref, () => ({ show }), [show]);

  function showAt(ev) {
    let target = ev.target;
    while (!target.dataset.menuIgnore) {
      setParent(target);
      target = target.parentNode;
    }
  }

  return (
    <>
      <span onClick={showAt} data-menu-ignore="true">
        {children}
      </span>
      {parent ? (
        <Portal>
          <Menu
            css={css}
            at={at}
            parent={parent}
            options={options}
            onClick={handleClick}
            onCancel={handleCancel}
          />
        </Portal>
      ) : null}
    </>
  );
});

export default DropDownMenu;
