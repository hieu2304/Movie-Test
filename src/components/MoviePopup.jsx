import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Episode from "./Episode";
function MoviePopup({ id, title, handlePopup, seasons }) {
    const [episodes, setEpisodes] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(null);
    const focus = (e) => {
        e.stopPropagation();
    };
    const findSeasonByValue = (value) => {
        const rs = seasons.find((item) => item.seasonNumber === value);
        return rs ? rs.episodes : null;
    };

    const handleSeason = (e) => {
        const value = e.target.value;
        setCurrentSeason(value);
        if (value === "default") {
            setEpisodes([]);
        } else {
            setEpisodes(findSeasonByValue(Number(value)));
        }
    };
    useEffect(() => {
        if (seasons && seasons.length) {
            setCurrentSeason(1);
            const rs = seasons.find((item) => item.seasonNumber === 1);
            setEpisodes(rs ? rs.episodes : null);
        }
    }, [id, seasons]);

    return (
        <div className="c-popup" onClick={() => handlePopup()}>
            <div className="p-popup">
                <div className="overlayer"></div>
                <div className="p-popup__content" onClick={(e) => focus(e)}>
                    <div className="c-close" onClick={() => handlePopup()}>
                        <CloseOutlined />
                    </div>
                    <h3 className="c-title p-popup__title">{title}</h3>
                    {seasons && seasons.length ? (
                        <React.Fragment>
                            <select
                                name=""
                                id=""
                                className="p-popup__season"
                                value={currentSeason || 5}
                                onChange={(e) => handleSeason(e)}
                            >
                                <option value="default">Default</option>
                                {seasons.map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <option value={item.seasonNumber}>
                                            {item.name}
                                        </option>
                                    </React.Fragment>
                                ))}
                            </select>

                            <h4 className="c-title4 p-popup__subtitle">
                                Episode
                            </h4>
                            <div className="p-popup__episode">
                                {(episodes &&
                                    episodes.map((item, index) => (
                                        <Episode
                                            key={index}
                                            index={index + 1}
                                            season={currentSeason}
                                            ep={item.episodeNumber}
                                            epName={item.name}
                                            id={id}
                                            image={item.stillPath}
                                            overview={item.overview}
                                        />
                                    ))) || (
                                    <p className="c-message">
                                        No data available
                                    </p>
                                )}
                            </div>
                        </React.Fragment>
                    ) : (
                        <p className="c-message">No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;
