import React from "react";
import Item1 from "./../components/Item1";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
function List1({ subtitle, title, list, browseLink, browseTitle }) {
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
        infinite: list && list.length >= 4,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: list && list.length >= 3,
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
        <section className="p-top1 ">
            <div className="l-container">
                <div className="p-top1__title u-fade">
                    <h4 className="c-subtitle">{subtitle}</h4>
                    <h3 className="c-title">{title}</h3>
                </div>
                <div className="p-top1__content">
                    <Slider {...settings}>
                        {list.length &&
                            list.map((item, idx) => (
                                <Item1
                                    key={idx}
                                    id={item.id}
                                    image={item.poster_path && `https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    cat={item.genres && item.genres.join(", ")}
                                    name={item.title}
                                    type={item.movie ? "movie" : "tvshow"}
                                />
                            ))}
                    </Slider>
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

export default List1;
