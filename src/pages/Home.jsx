import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Mainvisuals from "../components/MainVisuals";
import PTop from "../components/PTop";

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        document.title = `App`;
        setIsLoading(true);
    }, [isLoading]);
    return (
        <>
            <Loading nameClass={isLoading ? "is-fadeout" : ""} />
            <Mainvisuals />
            <PTop />
        </>
    );
}

export default Home;
