import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recoveryEmail } from "./../actions/forgot.action";
import { validateEmail } from "../helper/validator";
import FormError from "../components/FormError";
import Alert from "../components/Alert";
import { FORGOT_RESET } from "../types/forgot.type";

function ForgotPassword() {
    const resMessage = useSelector((state) => state.forgot.resMessage);
    const isSendFailed = useSelector((state) => state.forgot.isSendFailed);

    
    const [email, setEmail] = useState("");
    const dispath = useDispatch();
    const [errorEmail, setErrorEmail] = useState(false);

    const isForgot = useSelector((state) => state.forgot.sendRecovery);
    const handleSend = () => {
        if (!errorEmail && email !== "") {
            dispath(recoveryEmail(email));
        }
    };

    const handleEmail = (e) => {
        let value = e.target.value;
        if (value.length >= 0) {
            setEmail(value);
            if (validateEmail(value) === true) {
                setErrorEmail(false);
            } else {
                setErrorEmail(true);
            }
        }
    };
    useEffect(() => {
        dispath({
            type: FORGOT_RESET,
        });
    }, [dispath]);
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
                        <h3 className="c-form__title">Forgot Password</h3>
                        <form action="">
                            <div className="c-form__group">
                                <input
                                    className="c-form__input"
                                    type="text"
                                    value={email}
                                    onChange={(e) => handleEmail(e)}
                                    required
                                />
                                <label className="c-form__label">Email</label>
                            </div>
                            {errorEmail && (
                                <FormError text="Email must be valid" />
                            )}
                            <div className="c-form__actions">
                                <button
                                    className={`${
                                        errorEmail || email.length <= 0
                                            ? "c-btn--disabled "
                                            : ""
                                    }c-btn  c-btn--primary`}
                                    type="button"
                                    onClick={() => handleSend()}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                        {
                            // !isForgot && (
                            // <h3 className="c-form__text">
                            //     Please wait while we sending reset password to your email...
                            // </h3>)
                        }
                        {isForgot && (
                            <span
                                className="c-form__text"
                                style={{
                                    display: "block",
                                    marginTop: "10px",
                                    fontSize: "1.4rem",
                                }}
                            >
                                Email was send successful, Click the link on
                                email to reset password !
                            </span>
                        )}
                        {}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
