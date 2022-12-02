import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Detail from "../components/Detail";
import Loading from "../components/Loading";
import { history } from "../helper";
import { getMovieInfo } from "../actions/movie.action";
import List2 from "../components/List2";
import { getTvShow } from "../actions/film.action";
import { RESET_ERROR } from "../types/movie.type";
import Alert from "../components/Alert";
import { GET_WATCHLIST_RESET } from "../types/watchlist.type";
function Movie({ match }) {
    const resMessage = useSelector((state) => state.watchlist.resMessage);
    const isSendFailed = useSelector((state) => state.watchlist.isSendFailed);
    const dispatch = useDispatch();
    const listMovie = useSelector((state) => state.film.tv);
    const { id = null } = match.params;
    const error = useSelector((state) => state.movie.error);
    const [isLoading, setIsLoading] = useState(false);
    // let isAdding = useSelector((state) => state.watchlist.isAdding);
    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch({
            type: GET_WATCHLIST_RESET,
        });
        document.title = `Movie Details`;
        if (id) {
            dispatch(getMovieInfo(id));
        } else {
            history.push("/");
        }
        dispatch(getTvShow());
        setIsLoading(true);
    }, [dispatch, id]);

    useEffect(() => {
        if (error !== null) {
            history.push("/");
            dispatch({
                type: RESET_ERROR,
            });
        }
    }, [dispatch, error]);

    return (
        <>
            {isSendFailed !== null ? (
                <Alert
                    msg={resMessage}
                    type={isSendFailed ? "c-alert--error" : "c-alert--success"}
                />
            ) : (
                <></>
            )}
            <Loading nameClass={isLoading ? "is-fadeout" : ""} />
            <div className="pages-movie">
                <Detail id={id} />
                {listMovie.length && (
                    <List2
                        subtitle="Most watched movies by days"
                        title="TV Shows"
                        list={listMovie}
                        browseLink="/browse/tv"
                        browseTitle="BROWSE ALL TV SHOW"
                    />
                )}
            </div>
        </>
    );
}

export default Movie;
