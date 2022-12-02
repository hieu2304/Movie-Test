import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="c-footer footer ">
            <div className="p-footer ">
                <div className="p-footer__content">
                    <div className="p-footer__title">
                        <span className="p-footer__title__line"></span>
                    </div>
                    <div className="l-container">
                        <ul className="p-footer__breadcrumb">
                            <li>
                                <Link to="/browse/movie">Movie</Link>
                            </li>
                            <li>
                                <Link to="/browse/tv">Tv Show</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="p-footer__copyright">
                    Copyright © 2022, HAMBURGER MOVIE(BY HIEU DANG). All Rights Reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
