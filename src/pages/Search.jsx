import React, { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import SearchItem from "../components/SearchItem";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import {
    changeSearchKey,
    getFilter,
    getSearch,
} from "../actions/search.action";
import { catFilter } from "./../helper";
import Paginate from "../components/Paginate";
function Search({ location }) {
    const { search } = location;
    const searchKey = useSelector((state) => state.search.searchKey);
    const searchResults = useSelector((state) => state.search.data);
    const searchFilter = useSelector((state) => state.search.filter);
    const isFilter = useSelector((state) => state.search.isFilter);
    const [currentSearch, setCurrentSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();

    const onPageChange = (e, value) => {
        e.preventDefault();
        if (Number(value)) {
            setPage(value);
            dispatch(getSearch(searchKey, value));
        }
    };
    const handleSearchValue = (e) => {
        let value = e.target.value;
        dispatch(changeSearchKey(value));
    };
    const handleCatChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        setCat((state) => {
            return state.map((item) => {
                item.select = false;
                if (item.value === value) {
                    item.select = isChecked;
                }
                dispatch(getFilter(value));
                return item;
            });
        });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(getSearch(searchKey));
        setCurrentSearch(searchKey);
    };
    const [slideToggle, setSlideToggle] = useState(false);
    const toggleSlide = () => {
        setSlideToggle((prev) => !prev);
    };
    useEffect(() => {
        document.title = `Search`;
        if (search && search.length) {
            const searchVal = queryString.parse(search).q;
            dispatch(changeSearchKey(searchVal));
            dispatch(getSearch(searchVal));
            setCurrentSearch(searchVal);
        }
        setCat(catFilter);
    }, [dispatch, search, searchResults]);
    return (
        <div className="p-search">
            <div className="l-container">
                <div className="p-search__content js-dark-here">
                    <div className="p-search__left">
                        <h3>Search</h3>
                        <div className="p-search__filter">
                            <div
                                className="p-search__filter__control"
                                onClick={() => toggleSlide()}
                            >
                                <h4>Categories</h4>
                                <PlusOutlined className="plus" />
                                <MinusOutlined className="minus" />
                            </div>
                            <ul className={slideToggle ? "is-open" : ""}>
                                {cat.length &&
                                    cat.map((item) => (
                                        <li key={item.value}>
                                            <input
                                                type="radio"
                                                name={item.name}
                                                value={item.value}
                                                checked={item.select}
                                                onChange={(e) =>
                                                    handleCatChange(e)
                                                }
                                            />
                                            <span>{item.value}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="p-search__right">
                        <div className="p-search__top">
                            <div className="p-search__top__form">
                                <form
                                    action=""
                                    onSubmit={(e) => submitSearch(e)}
                                >
                                    <div
                                        className="search-icon"
                                        onClick={(e) => submitSearch(e)}
                                    >
                                        <SearchOutlined />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your film"
                                        onChange={(e) => handleSearchValue(e)}
                                        value={searchKey}
                                    />
                                </form>
                                {currentSearch && currentSearch.length ? (
                                    <p>
                                        Search for <b>{currentSearch}</b>
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="p-search__list row">
                            {isFilter
                                ? (searchFilter.results &&
                                      searchFilter.results.length &&
                                      searchFilter.results.map(
                                          (item, index) => (
                                              <React.Fragment key={index}>
                                                  <SearchItem
                                                      id={item.id}
                                                      image={item?.poster_path && `https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                                      name={item.title}
                                                      rated={item.popularity}
                                                      cat={item.map(u => u.name).join(', ')}
                                                      overview={
                                                          item.overview.substring(
                                                              0,
                                                              150
                                                          ) + "..."
                                                      }
                                                      type={
                                                          item.tvShow
                                                              ? "tvshow"
                                                              : "movie"
                                                      }
                                                  />
                                              </React.Fragment>
                                          )
                                      )) || (
                                      <p className="p-search__list--empty">
                                          No filter results found
                                      </p>
                                  )
                                : (searchResults.results &&
                                      searchResults.results.length &&
                                      searchResults.results.map(
                                          (item, index) => (
                                              <React.Fragment key={index}>
                                                  <SearchItem
                                                      id={item.id}
                                                      image={item?.poster_path && `https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                                      name={item.title}
                                                      rated={item.popularity}
                                                      actor="Faker, Daxua, Neymar"
                                                      cat={item?.genres && item.genres.map(u => u.name).join(', ')}
                                                      overview={
                                                          item.overview.substring(
                                                              0,
                                                              150
                                                          ) + "..."
                                                      }
                                                      type={
                                                          item.tvShow
                                                              ? "tvshow"
                                                              : "movie"
                                                      }
                                                  />
                                              </React.Fragment>
                                          )
                                      )) || (
                                      <p className="p-search__list--empty">
                                          No search results found
                                      </p>
                                  )}
                        </div>
                        <div className="p-search__paginate">
                            <Paginate
                                page={page}
                                totalPage={searchResults.totalPages || 0}
                                onPageChange={(e, value) =>
                                    onPageChange(e, value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
