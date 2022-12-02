import React from "react";
import Item2 from "./../components/Item2";
import { Link } from "react-router-dom";
import Slider2 from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function List2({ subtitle, title, list, browseLink, browseTitle }) {
    const SampleNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <RightOutlined
                className={className + " u-fade"}
                onClick={onClick}
            />
        );
    };

    const SamplePrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <LeftOutlined className={className + " u-fade"} onClick={onClick} />
        );
    };
    var settings = {
        dots: true,
        infinite: list && list.length >= 6,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: list && list.length >= 4,
                    dots: true,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                    infinite: list && list.length >= 3,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: list && list.length >= 2,
                },
            },
        ],
    };
    return (
        <section className="p-top2 ">
            <div className="l-container">
                <div className="p-top2__title u-fade">
                    <h4 className="c-subtitle">{subtitle}</h4>
                    <h3 className="c-title">{title}</h3>
                </div>
                <div className="p-top2__content">
                    {list.length && (
                        <Slider2 {...settings}>
                            {list.map((item, idx) => (
                                <Item2
                                    key={idx}
                                    id={item._id}
                                    image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    cat={item.genres && item.genres.join(", ")}
                                    name={item.title}
                                    releaseDate={item.first_air_date}
                                    runtime={
                                        (item.movie && item.movie.runtime) ||
                                        (item.tvShow && item.tvShow.seasonCount)
                                    }
                                    rated={item.popularity}
                                    type={item.movie ? "movie" : "tvshow"}
                                />
                            ))}
                        </Slider2>
                    )}
                </div>
                {browseLink && browseTitle ? (
                    <Link
                        to={browseLink}
                        className="c-btn c-btn--primary c-more u-fade"
                    >
                        {browseTitle}
                    </Link>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
}

export default List2;
