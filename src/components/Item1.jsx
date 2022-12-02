import { CaretRightFilled } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
function Item1({ id, image, cat, name, chapter }) {
    return (
        <div className="c-item u-fade">
            <div className="gutter">
                <img
                    className="c-item__image"
                    src={
                        image
                            ? image
                            : `${process.env.PUBLIC_URL}/assets/img/no-image.png`
                    }
                    alt=""
                    loading="lazy"
                />
                <div className="c-item__content">
                    <div className="is-hover">
                        <span className="c-item__label">{cat}</span>
                    </div>
                    <p className="c-item__name">{name}</p>
                    <div className="u-flex u-a-center">
                        <Link to={`/movie/${id}`} className="c-item__play">
                            <CaretRightFilled />
                        </Link>
                        <span className="c-item__chapter">{chapter}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item1;
