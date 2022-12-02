import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, customRedirect } from "./../actions/user.action";
import queryString from "query-string";

function VerifyEmail() {
    const dispath = useDispatch();

    const isVerify = useSelector((state) => state.auth.verify);

    const getCode = () => {
        const val = queryString.parse(window.location.search);
        return val.code;
    };
    useEffect(() => {
        let code = getCode();

        if (code && code.length > 0) {
            dispath(verifyEmail(code));
        } else {
            dispath(customRedirect("/"));
        }
    }, [dispath]);

    return (
        <div className="login">
            <span className="c-overlayer"> </span>
            <div className="login__content">
                <div className="c-form">
                    <h2 className="c-form__title c-form__title-mid">
                        Verify Email
                    </h2>
                    {!isVerify && (
                        <h3 className="c-form__text">
                            Please wait while we verifying your email...
                        </h3>
                    )}
                    {isVerify && (
                        <h3 className="c-form__text">
                            Email confirmation was successful! We will take you
                            to the login page !
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
