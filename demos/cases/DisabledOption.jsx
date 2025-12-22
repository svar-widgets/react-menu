import { useState, useMemo } from 'react';
import { Button } from '@svar-ui/react-core';
import { ContextMenu, MenuBar } from '../../src/index';
import { getMenuBarOptions, getOptions } from '../data';

function disableEdit(options) {
  const option = options.find((o) => o.id === 'edit' || o.id === 'edit-task');
  if (option) option.disabled = true;
}

function DisabledOption() {
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const barOptions = useMemo(() => {
    const options = getMenuBarOptions().map((o) => ({ ...o }));
    if (disabled) disableEdit(options);
    return options;
  }, [disabled]);

  const options = useMemo(() => {
    const opts = getOptions().map((o) => ({ ...o }));
    if (disabled) disableEdit(opts);
    return opts;
  }, [disabled]);

  function clicked(ev) {
    const option = ev.option;
    setMessage(option ? `clicked on ${option.id}` : 'closed');
  }

  function switchDisabled() {
    setDisabled(!disabled);
  }

  return (
    <>
      <MenuBar options={barOptions} onclick={clicked} />
      <div className="demo-status">{message}</div>

      <div className="demo-box">
        <ContextMenu options={options} onclick={clicked} at="point">
          <div className="double-box">Click me ( context menu )</div>
        </ContextMenu>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <Button onClick={switchDisabled} type="primary">
          {(disabled ? 'Enable' : 'Disable') + ' edit option'}
        </Button>
      </div>
    </>
  );
}

export default DisabledOption;
