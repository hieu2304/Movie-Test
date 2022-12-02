import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopular } from "../helper/reusble";
import { truncateByLength } from "../helper";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";

const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <RightOutlined
            className={
                className + " c-mainvisuals__arrow c-mainvisuals__arrow--next"
            }
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <LeftOutlined
            className={
                className + " c-mainvisuals__arrow c-mainvisuals__arrow--prev"
            }
            onClick={onClick}
        />
    );
};

var settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};
function Mainvisuals() {
    const [popularList, setPopularList] = useState(null);

    useEffect(() => {
        getPopular()
            .then((res) => {
                setPopularList(res.data.results);
            })
            .catch(() => setPopularList(null));
    }, []);
    return (
        <div className="c-mainvisuals js-mainvisuals" data-anchor="1">
            <div className="c-mainvisuals__content js-fullheight">
                <Slider className="c-slide" {...settings}>
                    {popularList ? (
                        popularList.map((item, index) => (
                            <div className="c-slide__item" key={index}>
                                <span className="c-slide__item__blur"></span>
                                <img
                                    className="c-slide__image"
                                    src={
                                        `https://image.tmdb.org/t/p/w500/${item.poster_path}` ||
                                        `${process.env.PUBLIC_URL}/assets/img/no-image.png`
                                    }
                                    alt=""
                                    loading="lazy"
                                />
                                <div className="c-slide__info">
                                    <div className="c-slide__info__content">
                                        <span className="c-slide__label">
                                            POPULARITY
                                        </span>
                                        <h3 className="c-title1">
                                            {item.title}
                                        </h3>
                                        <p className="c-slide__description">
                                            {item.overview
                                                ? truncateByLength(
                                                      item.overview,
                                                      150
                                                  )
                                                : ""}
                                        </p>
                                        <div className="c-slide__actions">
                                            <Link
                                                to={`/movie/${item.id}`}
                                                className="c-btn"
                                            >
                                                PLAY FILM
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </Slider>
            </div>
        </div>
    );
}

export default Mainvisuals;
