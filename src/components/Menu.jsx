import {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { clickOutside, calculatePosition } from '@svar-ui/lib-dom';
import MenuOption from './MenuOption.jsx';
import { prepareMenuData } from '../helpers';
import './Menu.css';

function Menu({
  options,
  left = 0,
  top = 0,
  at = 'bottom',
  parent = null,
  mount = null,
  context = null,
  css = '',
  onClick,
}) {
  const [x, setX] = useState(-10000);
  const [y, setY] = useState(-10000);
  const [z, setZ] = useState(20);
  const [width, setWidth] = useState();

  const selfRef = useRef(null);
  const [showSub, setShowSub] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  const updatePosition = useCallback(() => {
    const result = calculatePosition(selfRef.current, parent, at, left, top);
    if (result) {
      setX(result.x);
      setY(result.y);
      setZ(result.z);
      setWidth(result.width);
    }
  }, [parent, at, left, top]);

  useEffect(() => {
    if (mount) mount(updatePosition);
  }, []);

  const onLeave = useCallback(() => {
    setShowSub(false);
  }, []);

  const cancel = useCallback(() => {
    // [deprecated] action will be deprecated in 3.0
    onClick && onClick({ action: null, option: null });
  }, [onClick]);

  const onShow = useCallback((id, el) => {
    setShowSub(id);
    setActiveOption(el);
  }, []);

  const finalOptions = useMemo(() => prepareMenuData(options), [options]);

  useEffect(() => {
    updatePosition();
  }, [parent, updatePosition]);

  useEffect(() => {
    if (!selfRef.current) return;
    return clickOutside(selfRef.current, { callback: cancel, modal: true })
      .destroy;
  }, [cancel]);

  return (
    <div
      ref={selfRef}
      data-wx-menu="true"
      className={`wx-XMmAGqVx wx-menu ${css}`}
      style={{
        position: 'absolute',
        top: y + 'px',
        left: x + 'px',
        width: width,
        zIndex: z,
      }}
      onMouseLeave={onLeave}
    >
      {finalOptions.map((option) => (
        <Fragment key={option.id}>
          {option.comp === 'separator' ? (
            <div className="wx-XMmAGqVx wx-separator"></div>
          ) : (
            <MenuOption
              option={option}
              onShow={onShow}
              onClick={(ev) => {
                if (!option.data && !ev.defaultPrevented) {
                  // [deprecated] action will be deprecated in 3.0
                  const pack = { context, action: option, option, event: ev };
                  if (option.handler) option.handler(pack);
                  onClick && onClick(pack);
                  ev.stopPropagation();
                }
              }}
            />
          )}
          {option.data && showSub === option.id ? (
            <Menu
              css={css}
              options={option.data}
              at="right-overlap"
              parent={activeOption}
              context={context}
              onClick={onClick}
            />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

export default Menu;
