## 2.6.2

### Fixes

- Menu components throw an error when rendered without options

## 2.6.1

- Using React Core v2.6.1

## 2.6.0

### Fixes

- Duplicate separators are auto removed

## 2.5.1

### Fixes

- ContextMenu doesn't open if the target changes
- DropdownMenu fails to close when clicked outside

## 2.5.0

### Fixes

- Incorrect submenu position when there is not enough space to the right
- Submenus are not shown on mobile devices

## Version 2.4.3

### Fixes

- Sourcemap included

## 2.4.1

### Fixes

- Correct path to icons and fonts

## Version 2.4

### Updates

- More options to precisely position and align ContextMenu, DropDownMenu, ActionMenu

### Fixes

- Incorrect position of Menus in relatively positioned container
- Incorrect position of Menus close to container edges

## Version 2.3.0

### New features

- TypeScript definitions

### Updates

API changes with backward compatibility until 3.0:

- `onClick` event of all menus: `action` parameter is renamed to `option`
- Option `type` property is renamed to `comp`
- Property `item` of a custom component, registered as menu option, is renamed to `option`

## Version 2.2.0

### Initial features

Provides all the same functionality as Svelte Menu 2.2.0
