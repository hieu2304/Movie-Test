import React, { useEffect } from "react";
import Plyr from "plyr";
let player = null;
function Detail2({ type, videoID }) {
    useEffect(() => {
        const videoSettings = {
            type: "video",
            sources: [
                {
                    src: videoID,
                    provider: type && type.toLowerCase(),
                },
            ],
        };
        if (player) player.destroy();
        player = new Plyr("#player");
        player.source = videoSettings;
    }, [type, videoID]);
    return (
        <div className="p-detail2 u-fade ">
            <div className="p-detail2__content">
                <div className="l-container">
                    <h3 className="c-title">Trailer</h3>
                </div>

                <video id="player" playsInline controls></video>
                {/* <Plyr source={videoSettings} /> */}
            </div>
        </div>
    );
}

export default Detail2;
