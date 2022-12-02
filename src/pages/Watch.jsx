import React, { useEffect } from "react";
import Plyr from "plyr";
import { useDispatch, useSelector } from "react-redux";
import { getMovieVideo, getTvideo } from "../actions/stream.action";
import Loading from "../components/Loading";
import { SwapLeftOutlined } from "@ant-design/icons";
import { history } from "./../helper";
import WatchController from "../components/WatchController";
import { Link } from "react-router-dom";
import qs from "query-string";
import { getMovieInfo } from "../actions/movie.action";
let player = null;
function Watch({ match, location }) {
    const dispatch = useDispatch();
    const { id } = match.params;
    const { season, episode } = qs.parse(location.search);
    const videoSources = useSelector((state) => state.stream.data);
    const isLoading = useSelector((state) => state.stream.isLoading);
    const error = useSelector((state) => state.stream.error);
    const movieInfo = useSelector((state) => state.movie.data);
    useEffect(() => {
        document.title = `Stream`;
        if (!id) {
            history.push(`/movie/${id}`);
        } else {
            if (!episode || !season) {
                dispatch(getMovieVideo(id));
            } else {
                dispatch(getTvideo(id, season, episode));
                dispatch(getMovieInfo(id));
            }
        }
    }, [dispatch, episode, season, id]);

    useEffect(() => {
        if (videoSources.length) {
            if (player) player.destroy();
            player = new Plyr("#player");
            const videoSettings = {
                type: "video",
                sources: videoSources,
            };
            player.source = videoSettings;
        }
    }, [videoSources]);

    return (
        <div className="p-watch js-fullheight">
            <Loading nameClass={isLoading ? "" : "is-fadeout"} />
            {error ? (
                <>
                    <p className="c-message">
                        {error}
                        <Link to={`/movie/${id}`} className="u-color--main">
                            {" "}
                            Back to detail
                        </Link>
                    </p>
                </>
            ) : (
                <>
                    <video id="player" playsInline controls>
                        <source
                            src={videoSources.length && videoSources[0].src}
                            type="video/mp4"
                        />
                    </video>

                    {season && episode ? (
                        <WatchController
                            title={movieInfo.title}
                            seasons={
                                movieInfo.tvShow && movieInfo.tvShow.seasons
                            }
                            currentSeason={season}
                            currentEp={episode}
                            id={id}
                        />
                    ) : (
                        <></>
                    )}
                    <div className="p-watch__back">
                        <SwapLeftOutlined
                            onClick={() => {
                                history.push(`/movie/${id}`);
                            }}
                        />
                        <p>Back to detail {episode}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Watch;
