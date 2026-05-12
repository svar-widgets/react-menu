import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Portal } from '@svar-ui/react-core';
import { locateID } from '@svar-ui/lib-dom';
import Menu from './Menu.jsx';
import { filterMenu } from '../helpers';

const ActionMenu = forwardRef(function ActionMenu(props, ref) {
  const {
    options,
    at = 'bottom',
    resolver = null,
    dataKey = 'contextId',
    filter = null,
    css = '',
    children,
    onClick,
  } = props;

  const [item, setItem] = useState(null);
  const [parent, setParent] = useState(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  // Ref to the event that triggered the menu, used to
  // prevent the menu from closing immediately after opening
  const showEventRef = useRef(null);

  const attrName = useMemo(
    () =>
      `data-${dataKey.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`,
    [dataKey],
  );

  const filteredOptions = useMemo(() => {
    if (item !== null && filter) {
      return filterMenu(options, (v) => filter(v, item));
    }
    return options;
  }, [item, filter, options]);

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

  const show = useCallback(
    (ev, obj) => {
      if (!ev) {
        setParent(null);
        return;
      }

      if (ev.defaultPrevented) return;

      const target = ev.target;
      if (target && target.dataset && target.dataset.menuIgnore) return;

      // Close if the same target is clicked again
      if (parent && parent === target) {
        setParent(null);
        // Prevent browser context menu
        ev.preventDefault();
        return;
      }

      setLeft(ev.clientX + 1);
      setTop(ev.clientY + 1);

      let nextItem =
        typeof obj !== 'undefined' ? obj : locateID(target, attrName);
      if (resolver) {
        nextItem = resolver(nextItem, ev);
        if (!nextItem) return;
      }

      setItem(nextItem);
      setParent(target);

      showEventRef.current = ev.nativeEvent || ev;
      ev.preventDefault();
    },
    [parent, attrName, resolver],
  );

  useImperativeHandle(ref, () => ({ show }), [show]);

  return (
    <>
      {children ? (
        <span onClick={show} data-menu-ignore="true">
          {typeof children === 'function' ? children() : children}
        </span>
      ) : null}

      {parent ? (
        <Portal>
          <Menu
            key={parent}
            css={css}
            at={at}
            top={top}
            left={left}
            parent={parent}
            context={item}
            onClick={handleClick}
            onCancel={handleCancel}
            options={filteredOptions}
          />
        </Portal>
      ) : null}
    </>
  );
});

export default ActionMenu;
