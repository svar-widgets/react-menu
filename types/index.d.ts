import type { ReactNode, FC } from 'react';
import type { TPosition } from '@svar-ui/lib-dom';

export type { TPosition } from '@svar-ui/lib-dom';

export type TID = string | number;

export interface IMenuOption {
  id?: TID;
  text?: string;
  subtext?: string;
  handler?: (ev: IMenuOptionClick) => void;
  data?: IMenuOption[];
  css?: string;
  icon?: string;
  disabled?: boolean;
  type?: string | FC<any>; // @deprecated use `comp` instead. Will be removed in v3.0
  comp?: string | FC<any>;
}

export interface IMenuOptionClick {
  context?: any;
  action: IMenuOption | null; // @deprecated use `option` instead. Will be removed in v3.0
  option: IMenuOption | null;
  event?: MouseEvent;
}

// props passed to a custom option component registered by registerMenuItem
export interface IMenuItemProps {
  option: IMenuOption;
  item: IMenuOption; // @deprecated use `option` instead. Will be removed in v3.0
}

export type TMenuResolver = (item: any, event: MouseEvent) => any;
export type TMenuFilter = (option: IMenuOption, item: any) => boolean;
export type TMenuMount = (callback: () => void) => void;

export declare const Menu: FC<{
  options?: IMenuOption[];
  left?: number;
  top?: number;
  at?: TPosition;
  parent?: HTMLElement | null;
  mount?: TMenuMount | null;
  context?: any;
  css?: string;
  onClick?: (ev: IMenuOptionClick) => void;
}>;

export declare const MenuBar: FC<{
  css?: string;
  menuCss?: string;
  options?: IMenuOption[];
  onClick?: (ev: IMenuOptionClick) => void;
}>;

export declare const DropDownMenu: FC<{
  options?: IMenuOption[];
  at?: TPosition;
  css?: string;
  children?: ReactNode;
  onClick?: (ev: IMenuOptionClick) => void;
}>;

export declare const ContextMenu: FC<{
  options?: IMenuOption[];
  at?: TPosition;
  resolver?: TMenuResolver | null;
  dataKey?: string;
  filter?: TMenuFilter | null;
  css?: string;
  children?: ReactNode;
  onClick?: (ev: IMenuOptionClick) => void;
}>;

export declare const ActionMenu: FC<{
  options?: IMenuOption[];
  at?: TPosition;
  resolver?: TMenuResolver | null;
  dataKey?: string;
  filter?: TMenuFilter | null;
  css?: string;
  children?: ReactNode;
  onClick?: (ev: IMenuOptionClick) => void;
}>;

export declare function registerMenuItem(
  type: string,
  handler: FC<IMenuItemProps>,
): void;
