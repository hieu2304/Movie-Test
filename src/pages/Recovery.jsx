import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, customRedirect } from "./../actions/forgot.action";
import FormError from "../components/FormError";
import { clearError } from "../actions/error.action";
import queryString from "query-string";
import { validateConfirmPassword, validatePassword } from "../helper/validator";
import Alert from "../components/Alert";
import { SENDPASSWORD_RESET } from "../types/forgot.type";
function Recovery() {
    const dispath = useDispatch();

    const resMessage = useSelector((state) => state.forgot.resMessageReco);
    const isSendFailed = useSelector((state) => state.forgot.isSendFailedReco);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [codeRecovery,setCodeRecovery] =useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const errorServer = useSelector((state) => state.error);

    const handlePassword = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setPassword(value);
            if (validatePassword(value) === true) {
                setErrorPassword(false);
            } else {
                setErrorPassword(true);
            }
        }
    };
    const handleConfirmPassword = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setConfirmPassword(value);
            if (validateConfirmPassword(password, value) === true) {
                setErrorConfirmPassword(false);
            } else {
                setErrorConfirmPassword(true);
            }
        }
    };

    const getCode = () => {
        const val = queryString.parse(window.location.search);
        return val.code; // CurrentURL?code=value    return value
    };

    const handleClickPassword = () => {
        dispath(forgotPassword(codeRecovery, password, confirmPassword));
    }
    useEffect(() => {
        let code = getCode();
        setCodeRecovery(code);
        dispath({
            type: SENDPASSWORD_RESET,
        });
        if (!code) {
            dispath(customRedirect("/"));
        }
    },[dispath]);

    return (
        <>
        {isSendFailed !== null ? (
            <Alert
                msg={resMessage}
                type={isSendFailed ? "c-alert--error" : "c-alert--success"}
            />
        ) : (
            <></>
        )}
        <div className="login">
            <div className="c-overlayer"> </div>
            <div className="login__content js-dark-here">
                <div className="c-form">
                    <h3 className="c-form__title">Recovery Password</h3>
                    <form action="">
                        <div className="c-form__group">
                            <input
                                className="c-form__input"
                                type="password"
                                value={password}
                                onChange={(e) => handlePassword(e)}
                                required
                            />
                            <label className="c-form__label">
                                New password
                            </label>
                        </div>
                        {errorPassword && (
                            <FormError text="Password must be between 8 and 128 characters long" />
                        )}
                        <div className="c-form__group">
                            <label className="c-form__label">
                                Retype new password
                            </label>
                            <input
                                className="c-form__input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPassword(e)}
                            />
                        </div>
                        {errorConfirmPassword && (
                            <FormError text="Passwords and confirm passwords do not match" />
                        )}
                        <div className="c-form__actions">
                            <button
                                className="c-btn c-btn--primary"
                                type="button"
                                onClick={()=> handleClickPassword()}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Recovery;
