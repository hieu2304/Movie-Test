import React, { useEffect, useState } from "react";

function Alert({ msg, type = "" }) {
    const [isHide, setIsHide] = useState(false);
    const handleClose = (e) => {
        e.stopPropagation();
        setIsHide(true);
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsHide(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`c-alert ${type} ${!isHide ? "is-show" : ""}`}>
            {msg}
            <span className="c-alert__close" onClick={(e) => handleClose(e)}>
                &#10006;
            </span>
        </div>
    );
}

export default Alert;
