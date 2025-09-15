import { useMemo, useRef, useCallback } from 'react';
import { getItemHandler } from '../helpers';
import './MenuItem.css';

function MenuItem({ onClick, onShow, item }) {
  const element = useRef(null);

  const onHover = useCallback(() => {
    onShow(item.data ? item.id : false, element.current);
  }, [onShow, item]);

  const SvelteComponent = useMemo(() => {
    return item && item.type ? getItemHandler(item.type) : null;
  }, [item]);

  return (
    <div
      ref={element}
      className={`wx-cDCz9rZQ wx-item ${item.css || ''}`}
      data-id={item.id}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {item.icon ? (
        <i className={`wx-cDCz9rZQ wx-icon ${item.icon}`}></i>
      ) : null}
      {item.type ? (
        SvelteComponent ? (
          <SvelteComponent item={item} />
        ) : null
      ) : (
        <span className="wx-cDCz9rZQ wx-value"> {item.text} </span>
      )}
      {item.subtext ? (
        <span className="wx-cDCz9rZQ wx-subtext">{item.subtext}</span>
      ) : null}
      {item.data ? (
        <i className="wx-cDCz9rZQ wx-sub-icon wxi-angle-right"></i>
      ) : null}
    </div>
  );
}

export default MenuItem;
