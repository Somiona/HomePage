import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import "../../styles/bio/_scroll_down.scss";

interface IScrollDown {
    className?: string;
}

const ScrollDown: FC<IScrollDown> = ({ className }) => (
    <div className={`scroll-down-icon ${className}`}>
        <FontAwesomeIcon icon={faChevronDown} />
    </div>
);

export default ScrollDown;
