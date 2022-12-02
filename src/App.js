import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/user.action";
import { useEffect } from "react";

// Pages
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Recovery from "./pages/Recovery";
import VerifyEmail from "./pages/VerifyEmail";
import WatchLater from "./pages/WatchLater";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Watch from "./pages/Watch";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Browse from "./pages/Browse";
import PageNotFound from "./pages/404";

function App() {
    const location = useLocation();
    const dispath = useDispatch();
    useEffect(() => {
        dispath(loadUser());
    }, [dispath]);
    useEffect(() => {
        const header = document.querySelector(".c-header");
        const footer = document.querySelector(".c-footer");

        if (location.pathname.includes("/watch") && header && footer) {
            header.classList.add("is-hide");
            footer.classList.add("is-hide");
        } else {
            header.classList.remove("is-hide");
            footer.classList.remove("is-hide");
        }
    }, [location]);

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/verifyemail" component={VerifyEmail} />
                <Route path="/recovery" component={Recovery} />
                <Route path="/login" component={Login} />
                <Route path="/movie/:id/watch" component={Watch} />
                <Route path="/movie/:id" component={Movie} />
                <Route path="/search" component={Search} />
                <Route path="/register" component={Register} />
                <Route path="/mylist" component={WatchLater} />
                <Route path="/browse/movie" component={Browse} />
                <Route
                    path="/browse/tv"
                    component={() => <Browse type="tv" />}
                />
                <Route exact path="/" component={Home} />
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
