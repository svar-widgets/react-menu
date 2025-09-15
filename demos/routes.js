import ActionMenu from './cases/ActionMenu.jsx';
import BasicInit from './cases/BasicInit.jsx';
import Context from './cases/Context.jsx';
import ContextData from './cases/ContextData.jsx';
import CustomArea from './cases/CustomArea.jsx';
import CustomOptions from './cases/CustomOptions.jsx';
import DropDown from './cases/DropDown.jsx';
import MenuBar from './cases/MenuBar.jsx';
import MenuPositions from './cases/MenuPositions.jsx';
import Relative from './cases/Relative.jsx';
import MenuInAreas from './cases/MenuInAreas.jsx';
import Styling from './cases/Styling.jsx';

export const links = [
  ['/base/:skin', 'Menu basic', BasicInit],
  ['/bar/:skin', 'Menu bar', MenuBar],
  ['/dropdown/:skin', 'Dropdown menu', DropDown],
  ['/context/:skin', 'Context menu', Context],
  ['/action/:skin', 'Action menu for items', ActionMenu],
  ['/context-data/:skin', 'Context menu for items', ContextData],
  ['/custom-area/:skin', 'Custom activation area', CustomArea],
  ['/custom/:skin', 'Custom options', CustomOptions],
  ['/positions/:skin', 'Menu positions', MenuPositions],
  ['/relative/:skin', 'Relative scroll', Relative],
  ['/areas/:skin', 'Menu in modals', MenuInAreas],
  ['/styling/:skin', 'Styling', Styling],
];
