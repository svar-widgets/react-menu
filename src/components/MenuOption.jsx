import { useMemo, useRef, useCallback } from 'react';
import { getItemHandler } from '../helpers';
import './MenuOption.css';

function MenuOption({ onClick, onShow, option }) {
  const element = useRef(null);

  const onHover = useCallback(() => {
    onShow(option.data ? option.id : false, element.current);
  }, [onShow, option]);

  const SubComponent = useMemo(() => {
    return option && option.comp ? getItemHandler(option.comp) : null;
  }, [option]);

  return (
    <div
      ref={element}
      className={`wx-cDCz9rZQ wx-option ${option.css || ''}`}
      data-id={option.id}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {option.icon ? (
        <i className={`wx-cDCz9rZQ wx-icon ${option.icon}`}></i>
      ) : null}
      {option.comp ? (
        SubComponent ? (
          <SubComponent item={option} option={option} />
        ) : null
      ) : (
        <span className="wx-cDCz9rZQ wx-value"> {option.text} </span>
      )}
      {option.subtext ? (
        <span className="wx-cDCz9rZQ wx-subtext">{option.subtext}</span>
      ) : null}
      {option.data ? (
        <i className="wx-cDCz9rZQ wx-sub-icon wxi-angle-right"></i>
      ) : null}
    </div>
  );
}

export default MenuOption;
