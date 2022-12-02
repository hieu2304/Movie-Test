import React from "react";
function Loading({ nameClass = "" }) {
    return (
        <div className={`c-loading ${nameClass}`}>
            <div className="c-loading__content">
                <div className="c-loading__line "></div>
            </div>
        </div>
    );
}

export default Loading;
