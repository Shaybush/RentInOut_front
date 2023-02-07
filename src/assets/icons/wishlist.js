import React from "react";

const WishList = ({color = "black", width = "20px", height = "20px"}) => {
    return (
        <svg
            aria-hidden="true"
            className="transition duration-75"
            width={width}
            height={height}
            fill={color}
            viewBox="0 0 20 20"
        >
            <path
                d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
        </svg>
    );
};

export default WishList;
