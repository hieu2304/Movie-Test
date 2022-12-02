import React, { useEffect, useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { history } from "../helper";
import { changeSearchKey, getSearch } from "../actions/search.action";
function Header({ isDark = null }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const [isOpen, setisOpen] = useState(false);
    const searchKey = useSelector((state) => state.search.searchKey);
    const dispatch = useDispatch();

    const handleMenu = () => {
        setisOpen(!isOpen);
    };
    const handleSearchValue = (e) => {
        let value = e.target.value;
        dispatch(changeSearchKey(value));
    };
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getSearch(searchKey));
        history.push(`/search?q=${searchKey}`);
        setisOpen(false);
    };
    useEffect(() => {
        $("a").on("click", function () {
            setisOpen(false);
        });
    }, [user]);

    return (
        <>
            <header className={`c-header`}>
                <div
                    className={
                        isDark
                            ? "p-header js-header is-dark-2"
                            : "p-header js-header "
                    }
                >
                    <div className="p-header__content u-flex u-a-center u-between">
                        <Link to="/" className="p-header__logo">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/assets/img/logo.png"
                                }
                                alt=""
                            />
                        </Link>
                        <ul className="p-header__cgnav u-flex">
                            <li>
                                <Link to="/">HOME</Link>
                            </li>

                            <li>
                                <Link to="/browse/movie">MOVIES</Link>
                            </li>
                            <li>
                                <Link to="/browse/tv">TV SHOWS</Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/mylist">MY LIST</Link>
                                    </li>
                                    <li>
                                        <Link to="/history">HISTORY</Link>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                        </ul>
                        <div className="p-header__actions u-flex u-a-center">
                            <Link
                                to="/search"
                                className="p-header__actions--icon"
                            >
                                <SearchOutlined />
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="p-header__account u-flex u-a-center "
                                    >
                                        <p>LOGOUT</p>
                                    </Link>
                                    <Link
                                        to="/account"
                                        className="p-header__account u-flex u-a-center "
                                    >
                                        <p>ACCOUNT</p>
                                        <div className="icon-circle">
                                            <UserOutlined />
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="p-header__account u-flex u-a-center "
                                >
                                    <p>LOGIN</p>
                                    <div className="icon-circle">
                                        <UserOutlined />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className={`c-menusp ${isOpen ? "is-open" : ""}`}>
                        <div
                            className="c-menusp__controller js-bars"
                            onClick={() => handleMenu()}
                        >
                            <span className="c-line c-line1"></span>
                            <span className="c-line c-line2"></span>
                        </div>
                        <div className="c-menusp__content">
                            <div
                                className="c-menusp__blank js-blank"
                                onClick={() => handleMenu()}
                            ></div>
                            <div className="c-menusp__sidebar">
                                <div className="c-menusp__search">
                                    <SearchOutlined
                                        onClick={(e) => handleSearch(e)}
                                    />
                                    <form
                                        action=""
                                        onSubmit={(e) => handleSearch(e)}
                                    >
                                        <input
                                            type="text"
                                            value={searchKey}
                                            onChange={(e) =>
                                                handleSearchValue(e)
                                            }
                                        />
                                    </form>
                                </div>
                                <ul className="c-menusp__cgnav">
                                    <li>
                                        <Link to="/">HOME</Link>
                                    </li>

                                    <li>
                                        <Link to="/browse/movie">MOVIES</Link>
                                    </li>
                                    <li>
                                        <Link to="/browse/tv">TV SHOWS</Link>
                                    </li>
                                    {isAuthenticated ? (
                                        <>
                                            <li>
                                                <Link to="/mylist">
                                                    MY LIST
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/history">
                                                    HISTORY
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {user && user.role === "admin" && (
                                        <li>
                                            <Link to="/admin">ADMIN PAGE</Link>
                                        </li>
                                    )}
                                </ul>
                                <div className="c-menusp__actions">
                                    {isAuthenticated ? (
                                        <>
                                            <Link
                                                to="/login"
                                                className="p-header__account u-flex u-a-center "
                                            >
                                                <p>LOGOUT</p>
                                            </Link>
                                            <Link
                                                to="/account"
                                                className="p-header__account u-flex u-a-center "
                                            >
                                                <p>ACCOUNT</p>
                                                <div className="icon-circle">
                                                    <UserOutlined />
                                                </div>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="p-header__account u-flex u-a-center "
                                        >
                                            <p>LOGIN</p>
                                            <div className="icon-circle">
                                                <UserOutlined />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                <div className="c-menusp__footer u-flex u-a-center">
                                    <p>@hambuger </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
