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

  function handleClick(ev) {
    setParent(null);
    onClick && onClick(ev);
  }

  const show = useCallback((ev) => {
    setParent(ev.target);
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

  const parentKeyRef = useRef(0);
  const lastParentRef = useRef(parent);
  useEffect(() => {
    if (lastParentRef.current !== parent) {
      parentKeyRef.current += 1;
      lastParentRef.current = parent;
    }
  }, [parent]);

  return (
    <>
      <span onClick={showAt} data-menu-ignore="true">
        {children}
      </span>
      {parent ? (
        <Portal>
          <Menu
            key={parentKeyRef.current}
            css={css}
            at={at}
            parent={parent}
            options={options}
            onClick={handleClick}
          />
        </Portal>
      ) : null}
    </>
  );
});

export default DropDownMenu;
