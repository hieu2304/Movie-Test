import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Detail1 from "./Detail1";
import Detail2 from "./Detail2";

function Detail({ id }) {
    const movieInfo = useSelector((state) => state.movie.data);
    const type = useSelector((state) => state.movie.type);

    return (
        <>
            <section className="p-detail">
                <Detail1
                    id={id}
                    type={type}
                    mediaId={movieInfo.id}
                    title={movieInfo.title}
                    cat={movieInfo.genres && movieInfo.genres.map(u => u.name).join(', ')}
                    description={movieInfo.overview}
                    poster={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
                    actors={
                        movieInfo.credits ?
                            movieInfo.credits.map((item) => item.name).join(", ")
                        : "Faker, Daxua, Neymar"
                    }
                    year={movieInfo.release_date}
                    movieInfo={movieInfo}
                />
                {movieInfo.video &&
                    (movieInfo.videos.length ? (
                        <Detail2
                            type={movieInfo.videos[0].site}
                            videoID={movieInfo.videos[0].key}
                            poster={movieInfo.posterPath}
                        />
                    ) : (
                        <></>
                    ))}

                <div className="p-detail3 u-fade">
                    <div className="l-container">
                            <div className="p-detail3__notlogin">
                                <p>
                                    You must be{" "}
                                    <Link to="/login">logged in</Link> to see
                                    comment
                                </p>
                            </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Detail;
