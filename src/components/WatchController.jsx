import React, { useEffect, useState } from "react";
import $ from "jquery";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    BarsOutlined,
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { truncateByLength } from "./../helper";

function WatchController({ id, title, seasons, currentSeason, currentEp }) {
    const [episodes, setEpisodes] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(currentSeason);

    const findSeasonByValue = (value) => {
        const rs = seasons.find((item) => item.seasonNumber === value);
        return rs ? rs.episodes : null;
    };

    const handleSeasonClick = (value) => {
        setSelectedSeason(value);
        setEpisodes(findSeasonByValue(Number(value)));
        $(".c-watch-controller__season").addClass("is-fadeout");
        $(".c-watch-controller__episode").addClass("is-show");
    };
    const handleBackClick = () => {
        $(".c-watch-controller__season").removeClass("is-fadeout");
        $(".c-watch-controller__episode").removeClass("is-show");
    };
    useEffect(() => {
        $(".c-watch-controller").removeClass("is-show");
        $(".js-controller-open").on("click", function () {
            $(".c-watch-controller").addClass("is-show");
        });
        $(".js-controller-close").on("click", function () {
            $(".c-watch-controller").removeClass("is-show");
        });

        if (seasons && seasons.length && currentSeason) {
            const rs = seasons.find(
                (item) => item.seasonNumber === Number(currentSeason)
            );
            setEpisodes(rs ? rs.episodes : null);
        }
    }, [id, currentSeason, currentEp, seasons]);

    return (
        <div className="c-watch-controller">
            <div className="c-watch-controller__icon js-controller-open">
                <BarsOutlined />
            </div>
            <div className="c-watch-controller__content">
                <div className="c-watch-controller__season">
                    <div className="c-watch-controller__season__close js-controller-close">
                        <CloseOutlined />
                    </div>
                    <div className="c-watch-controller__title">
                        <h3>{title}</h3>
                    </div>
                    <ul className="c-watch-controller__list">
                        {seasons && seasons.length ? (
                            seasons.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li
                                        className="c-watch-controller__item"
                                        onClick={() =>
                                            handleSeasonClick(item.seasonNumber)
                                        }
                                    >
                                        <div className="c-watch-controller__item__checked">
                                            {Number(item.seasonNumber) ===
                                            Number(currentSeason) ? (
                                                <CheckOutlined />
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        {item.name}
                                        <ArrowRightOutlined className="c-watch-controller__item__icon" />
                                    </li>
                                </React.Fragment>
                            ))
                        ) : (
                            <p className="c-message">No data available</p>
                        )}
                    </ul>
                </div>
                <div className="c-watch-controller__episode">
                    <div className="c-watch-controller__title">
                        <ArrowLeftOutlined
                            onClick={(e) => handleBackClick(e)}
                        />
                        <h3>Season {selectedSeason}</h3>
                    </div>
                    <ul className="c-watch-controller__list">
                        {episodes && episodes.length ? (
                            episodes.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li
                                        className={`c-watch-controller__item ${
                                            Number(currentEp) ===
                                            item.episodeNumber
                                                ? "is-active"
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            to={`/movie/${id}/watch?season=${selectedSeason}&episode=${item.episodeNumber}`}
                                        >
                                            {item.episodeNumber +
                                                ". " +
                                                truncateByLength(
                                                    item.overview || "",
                                                    200
                                                )}
                                        </Link>
                                    </li>
                                </React.Fragment>
                            ))
                        ) : (
                            <p className="c-message">No data available</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default WatchController;
