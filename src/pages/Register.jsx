import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resetRegister, register } from "./../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { convertDateTime } from "../helper/converter";
import FormError from "../components/FormError";
import {
    validateEmail,
    validateUsername,
    validateDisplayName,
    validateDateOfBirth,
    validatePassword,
    validateConfirmPassword,
} from "../helper/validator";
import { clearError } from "../actions/error.action";

function Register() {
    const isRegister = useSelector((state) => state.auth.register);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispath = useDispatch();

    //can not use all with 1 state included json properties.
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorDisplayName, setErrorDisplayName] = useState(false);
    const [errorDateOfBirth, setErrorDateOfBirth] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const errorServer = useSelector((state) => state.error);

    const onKeyPress = (e) => {
        if (e.which === 13) {
            handleRegister();
        }
    };

    const handleRegister = () => {
        let newDateOfBirth = convertDateTime(
            dateOfBirth,
            "YYYY-MM-DD",
            "DD-MM-YYYY"
        );

        // please check before
        //setErrorValidator({ ...errorValidator });
        //if all error status are false = mean all are ok
        if (
            !errorUsername &&
            !errorEmail &&
            !errorDisplayName &&
            !errorDateOfBirth &&
            !errorPassword &&
            !errorConfirmPassword
        ) {
            if (
                username !== "" &&
                email !== "" &&
                displayName !== "" &&
                password !== "" &&
                confirmPassword !== ""
            ) {
                dispath(
                    register(
                        username,
                        displayName,
                        email,
                        password,
                        confirmPassword,
                        newDateOfBirth
                    )
                );
            }
        }
    };

    const handleUsername = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setUsername(value);
            if (validateUsername(value)) {
                setErrorUsername(false);
            } else {
                setErrorUsername(true);
            }
        }
    };
    const handleEmail = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setEmail(value);
            if (validateEmail(value)) {
                setErrorEmail(false);
            } else {
                setErrorEmail(true);
            }
        }
    };
    const handleDisplayName = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setDisplayName(value);
            if (validateDisplayName(value)) {
                setErrorDisplayName(false);
            } else {
                setErrorDisplayName(true);
            }
        }
    };
    const handleDateOfBirth = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setDateOfBirth(value);
            if (validateDateOfBirth(value)) {
                setErrorDateOfBirth(false);
            } else {
                setErrorDateOfBirth(true);
            }
        }
    };
    const handlePassword = (e) => {
        if (errorServer.id) {
            dispath(clearError());
        }
        let value = e.target.value;
        if (value.length >= 0) {
            setPassword(value);
            if (validatePassword(value)) {
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
            if (validateConfirmPassword(password, value)) {
                setErrorConfirmPassword(false);
            } else {
                setErrorConfirmPassword(true);
            }
        }
    };
    useEffect(() => {
        setTimeout(() => {
            dispath(resetRegister());
        }, 4000);
    }, [dispath, errorServer]);

    return (
        <div className="register">
            <div className="c-overlayer"> </div>
            <div className="register__content js-dark-here">
                <div className="c-form">
                    <h3 className="c-form__title">Register</h3>
                    <form action="">
                        <div className="c-form__group">
                            <input
                                className="c-form__input"
                                type="text"
                                value={username}
                                onChange={(e) => handleUsername(e)}
                                onKeyPress={(e) => onKeyPress(e)}
                                required
                            />
                            <label className="c-form__label">Username</label>
                        </div>
                        {errorUsername && (
                            <FormError text="Username must be alphanumeric, between 3 and 32 characters long" />
                        )}
                        <div className="c-form__group">
                            <input
                                className="c-form__input"
                                type="text"
                                value={email}
                                onChange={(e) => handleEmail(e)}
                                onKeyPress={(e) => onKeyPress(e)}
                                required
                            />
                            <label className="c-form__label">Email</label>
                        </div>
                        {errorEmail && <FormError text="Email must be valid" />}
                        <div className="c-form__group">
                            <input
                                className="c-form__input"
                                type="text"
                                value={displayName}
                                onChange={(e) => handleDisplayName(e)}
                                onKeyPress={(e) => onKeyPress(e)}
                                required
                            />
                            <label className="c-form__label">
                                Display name
                            </label>
                        </div>
                        {errorDisplayName && (
                            <FormError text="Display name must be less than 32 characters long" />
                        )}
                        <div className="c-form__group is-focus">
                            <input
                                className="c-form__input_date"
                                type="date"
                                min="1920-01-01"
                                max="2021-12-12"
                                value={dateOfBirth}
                                onChange={(e) => handleDateOfBirth(e)}
                                onKeyPress={(e) => onKeyPress(e)}
                                required
                            />
                            <label className="c-form__label">Birthday</label>
                        </div>
                        {errorDateOfBirth && (
                            <FormError text="Date of birth must be valid date and must not be after the current date" />
                        )}
                        <div className="c-form__group">
                            <input
                                className="c-form__input"
                                autoComplete="new-password"
                                type="password"
                                value={password}
                                onChange={(e) => handlePassword(e)}
                                onKeyPress={(e) => onKeyPress(e)}
                                required
                            />
                            <label className="c-form__label">Password</label>
                        </div>
                        {errorPassword && (
                            <FormError text="Password must be between 8 and 128 characters long" />
                        )}

                        <div className="c-form__group">
                            <input
                                className="c-form__input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPassword(e)}
                                onKeyPress={(e) => onKeyPress(e)}
                                required
                            />
                            <label className="c-form__label">
                                Retype password
                            </label>
                        </div>

                        {errorConfirmPassword && (
                            <FormError text="Passwords and confirm passwords do not match" />
                        )}
                        {errorServer.id === "REGISTER_FAIL" &&
                            (Array.isArray(errorServer.msg) ? (
                                errorServer.msg.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <FormError text={item.msg} />
                                    </React.Fragment>
                                ))
                            ) : (
                                <FormError text={errorServer.msg} />
                            ))}
                        {isRegister && (
                            <FormError text="Register successfully, Please check your mail box!" />
                        )}
                        <div className="c-form__actions">
                            <button
                                className={`c-btn ${
                                    errorUsername ||
                                    errorPassword ||
                                    errorConfirmPassword ||
                                    errorDateOfBirth ||
                                    errorDisplayName ||
                                    errorEmail ||
                                    username.length <= 0
                                        ? "c-btn--disabled "
                                        : ""
                                } c-btn--primary`}
                                type="button"
                                onClick={() => handleRegister()}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="c-form__below">
                        <Link to="/login">Already have a account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
