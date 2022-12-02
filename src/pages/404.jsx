import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="p-404">
            <div className="l-container">
                <div className="p-404__content">
                    <h3>404</h3>
                    <p>
                        You didn't break the internet, but we can't find what
                        you are looking for.
                    </p>
                    <Link to="/" className="c-btn">
                        Go to the Home page
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
