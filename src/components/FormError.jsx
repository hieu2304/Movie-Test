import React from "react";

function FormError({ text = "" }) {
    return <div className="c-form__warning"> ✤ {text}</div>;
}

export default FormError;
