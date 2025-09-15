import { forwardRef, useRef, useCallback, useImperativeHandle } from 'react';
import ActionMenu from './ActionMenu.jsx';

const ContextMenu = forwardRef(function ContextMenu(props, ref) {
  const {
    options,
    at = 'bottom',
    resolver = null,
    dataKey = 'contextId',
    filter = null,
    css = '',
    children,
  } = props;

  const onClick = props.onClick ?? props.onclick;

  const menu = useRef(null);

  const show = useCallback((ev, obj) => {
    menu.current.show(ev, obj);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show],
  );

  return (
    <>
      {children ? (
        <span onContextMenu={show} data-menu-ignore="true">
          {children}
        </span>
      ) : null}

      <ActionMenu
        css={css}
        at={at}
        options={options}
        resolver={resolver}
        dataKey={dataKey}
        filter={filter}
        ref={menu}
        onClick={onClick}
      />
    </>
  );
});

export default ContextMenu;
