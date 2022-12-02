import React from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function BrowseItem({ imgSrc, title, cat, id, overview }) {
    return (
        <div className="c-browse-item">
            <Link to={`/movie/${id}`} className="c-browse-item__img">
                <img src={imgSrc} alt={title} />
            </Link>
            <div className="c-browse-item__content">
                <div className="c-browse-item__content__img">
                    <img src={imgSrc} alt={title} loading="lazy" />
                    <span className="c-browse-item__cat">{cat}</span>
                </div>
                <div className="c-browse-item__info">
                    <Link to={`/movie/${id}`}>
                        <h3 className="c-browse-item__title">{title}</h3>
                    </Link>
                    <p className="c-browse-item__overview">{overview}</p>

                    <Link to={`/movie/${id}`} className="c-browse-item__action">
                        <PlayCircleOutlined /> Play
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BrowseItem;
