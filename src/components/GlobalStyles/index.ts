import './GlobalStyles.module.scss';
import {ReactElement} from "react";

interface GlobalStylesProps {
    children: ReactElement;
}

function GlobalStyles({children}: GlobalStylesProps): ReactElement {
    return children;
}

export default GlobalStyles;
