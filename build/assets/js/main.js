$(".js-loading").fadeIn();
$(".js-line").stop().animate({ width: "100%" }, 2000);

$(window).on("load", function () {
    $(".js-loading").fadeOut();
});
window.customSlick = () => {
    try {
        if ($(".c-slide").length) {
            $(".c-slide").on(
                "init reInit beforeChange afterChange",
                function (event, slick, currentSlide, nextSlide) {
                    let current = currentSlide || 0;
                    let totalSlide = slick.slideCount || 3;
                    let slideSpeed = slick.slickGetOption("autoplaySpeed");
                    let border = $(".c-slide__border span");
                    //render number
                    if (event.type === "init") {
                        for (let i = 0; i < totalSlide; i++) {
                            let str = "<span>" + (i + 1) + "</span>";
                            $(str).appendTo(".c-slide__number");
                        }
                        //set total
                        $(".c-slide__total").text(totalSlide);
                        //set current slide
                        $(".c-slide__number")
                            .children()
                            .eq(current)
                            .addClass("is-current");
                        //start animation
                        border.stop().animate({ width: "100%" }, slideSpeed);
                    }

                    if (event.type === "beforeChange") {
                        border.stop().width("100%");
                        $(".c-slide__controller").addClass("is-move");
                        $(".c-slide__number")
                            .children()
                            .eq(current)
                            .stop()
                            .removeClass("is-current");
                        $(".c-slide__number")
                            .children()
                            .eq(current)
                            .stop()
                            .addClass("is-move");
                        $(".c-slide__number")
                            .children()
                            .eq(nextSlide)
                            .stop()
                            .addClass("is-current");
                    }
                    if (event.type === "afterChange") {
                        border.stop().width(0);
                        $(".c-slide__controller").stop().removeClass("is-move");
                        $(".c-slide__number").children().removeClass("is-move");
                        border.stop().animate({ width: "100%" }, slideSpeed);
                    }
                }
            );
            var slickOpts = {
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 3e3,
                speed: 1e3,
                fade: true,
                prevArrow: $(".c-slide__prev"),
                nextArrow: $(".c-slide__next"),
            };
            $(".c-slide").slick(slickOpts);
        }
    } catch (error) {
        // console.log(error);
    }
};

$(window).ready(() => {
    setFullHeight(".js-fullheight");
    setFullWidth(".js-fullwidth");
    fadeEffect();
    darkHeader();
    if ($(".home")) {
        window.customSlick();
    }
});
$(window).on("resize", function () {
    setFullHeight(".js-fullheight");
    setFullWidth(".js-fullwidth");
    removeMenuSP();
});
$(window).on("scroll", onScroll);
function removeMenuSP() {
    let windowWidth = $(window).width();
    if (windowWidth > 815) {
        $(".c-menusp").removeClass("is-open");
    }
}
function fadeEffect() {
    var scrollTop = $(window).scrollTop();
    var bottom = scrollTop + $(window).height();
    $(".u-fade").each(function () {
        if (bottom > $(this).offset().top + 50) {
            $(this).addClass("u-fade--show");
        } else {
            $(this).removeClass("u-fade--show");
        }
    });
}

function onScroll() {
    fadeEffect();
    darkHeader();
}
function darkHeader() {
    let currentPos = $(window).scrollTop();
    let $darkHere = $(".js-dark-here")
    let $header = $(".js-header")
    if ($header.length && $darkHere.length) {
        if (currentPos > $darkHere.offset().top) {
            $(".js-header").addClass("is-dark");
        } else {
            $(".js-header").removeClass("is-dark");
        }
    }
}
function setFullHeight(selector) {
    let windowHeight = $(window).height();
    $(selector).outerHeight(windowHeight);
}
function setFullWidth(selector) {
    let windowWidth = $(window).width();
    $(selector).outerWidth(windowWidth);
}
function setSticky(selector, parent) {
    var $window = $(window),
        $parent = $(parent),
        $el = $(selector);
    var windowTop = $window.scrollTop(),
        parentTop = $parent.offset().top,
        toParent = $el.parent().offset().top - $parent.offset().top,
        parentBottom = parentTop + $parent.height() + toParent,
        limit = windowTop + $el.height() + toParent;

    if (windowTop > parentTop && limit < parentBottom) {
        $el.removeClass("c-absolute");
        $el.addClass("c-fixed");
        $el.css({ top: toParent, bottom: "auto" });
    } else if (windowTop > parentTop && limit > parentBottom) {
        $el.removeClass("c-fixed");
        $el.addClass("c-absolute");
        $el.css({ top: "auto", bottom: "0" });
    } else {
        $el.removeClass("c-fixed");
        $el.removeClass("c-absolute");
        $el.css({ top: "auto", bottom: "auto" });
    }
}
