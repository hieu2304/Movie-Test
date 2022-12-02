import React, { useEffect, useState } from "react";
import axios from "../axios";
import BrowseItem from "../components/BrowseItem";
import Loading from "../components/Loading";
import { truncateByLength } from "../helper";

function Browse({ type = "movie" }) {
    const [isLoading, setIsLoading] = useState(false);
    const [movieData, setMovieData] = useState([]);
    const [currentMovieData, setCurrentMovieData] = useState([]);
    const [currentMoviePage, setCurrentMoviePage] = useState(1);

    const loadMore = () => {
        if (type === "movie") {
            axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=9a1fc638397541056dd18c70ea21b96b&page=${
                        currentMoviePage + 1
                    }`
                )
                .then((res) => {
                    setCurrentMovieData((prev) => [
                        ...prev,
                        ...res.data.results,
                    ]);
                    setMovieData(res.data);
                    setIsLoading(true);
                })
                .catch(() => {
                    setIsLoading(true);
                });
        } else {
            axios
                .get(
                    `https://api.themoviedb.org/3/discover/tv?api_key=9a1fc638397541056dd18c70ea21b96b&page=${currentMoviePage + 1}`
                )
                .then((res) => {
                    setCurrentMovieData((prev) => [
                        ...prev,
                        ...res.data.results,
                    ]);
                    setMovieData(res.data);
                    setIsLoading(true);
                })
                .catch(() => {
                    setIsLoading(true);
                });
        }

        setCurrentMoviePage((prev) => prev + 1);
    };
    //▼ Fetch data ▼
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Browse`;
        if (type === "movie") {
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?api_key=9a1fc638397541056dd18c70ea21b96b&page=${1}`)
                .then((res) => {
                    setCurrentMovieData((prev) => [
                        ...prev,
                        ...res.data.results,
                    ]);
                    setMovieData(res.data);
                    setIsLoading(true);
                })
                .catch(() => {
                    setIsLoading(true);
                });
        } else {
            axios
                .get(`https://api.themoviedb.org/3/discover/tv?api_key=9a1fc638397541056dd18c70ea21b96b&page=${1}`)
                .then((res) => {
                    setCurrentMovieData((prev) => [
                        ...prev,
                        ...res.data.results,
                    ]);
                    setMovieData(res.data);
                    setIsLoading(true);
                })
                .catch(() => {
                    setIsLoading(true);
                });
        }
    }, [type]);
    //▲ Fetch data ▲
    return (
        <div className="p-browse">
            <Loading nameClass={isLoading ? "is-fadeout" : ""} />

            <div className="l-container">
                <h3 className="p-browse__title c-title js-dark-here">
                    {type === "movie" ? "Movies" : "Tv Shows"}
                </h3>
                <div className="p-browse__content row">
                    {currentMovieData && currentMovieData.length ? (
                        currentMovieData.map((item, index) => (
                            <div
                                className="p-browse__content__item"
                                key={index}
                            >
                                <BrowseItem
                                    imgSrc={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    title={item.title}
                                    overview={truncateByLength(
                                        item.overview,
                                        150
                                    )}
                                    id={item.id}
                                    cat={item?.genres && item.genres.map(u => u.name).join(', ')}
                                />
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>

                {movieData && movieData.totalPages ? (
                    movieData.totalPages > currentMoviePage ? (
                        <span
                            className="c-btn c-btn--loadmore"
                            onClick={() => loadMore()}
                        >
                            Load more
                        </span>
                    ) : (
                        <></>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Browse;
