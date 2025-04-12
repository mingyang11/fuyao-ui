import { CSSProperties, MouseEventHandler, PropsWithChildren } from 'react';
import './index.scss';
export interface ButtonProps extends PropsWithChildren {
    className?: string;
    style?: CSSProperties;
    type?: 'primary' | 'default';
    onClick?: MouseEventHandler;
}
declare function Button(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
export default Button;
