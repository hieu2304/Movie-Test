import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openWatch } from "../actions/watch.action";
import { truncateByLength } from "./../helper";

function Episode({ season, ep, epName, id, image, overview, index }) {
    const dispatch = useDispatch();
    const handleWatch = () => {
        dispatch(openWatch());
    };

    return (
        <Link
            to={`/movie/${id}/watch?season=${season}&episode=${ep}`}
            className="c-popup__item u-flex"
            onClick={(e) => handleWatch(e)}
        >
            <div className="c-popup__item__left u-flex u-a-center">
                <div className="c-popup__item__ep">{index}</div>
                <div className="c-popup__item__image">
                    <p className="c-btn--play">
                        <CaretRightOutlined />
                    </p>
                    <img
                        src={
                            image ||
                            `${process.env.PUBLIC_URL}/assets/img/no-image.png`
                        }
                        alt=""
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="c-popup__item__right">
                <h4 className="c-title3"> {epName}</h4>
                <div className="c-popup__item__content">
                    {truncateByLength(overview || "")}
                </div>
            </div>
        </Link>
    );
}

export default Episode;
