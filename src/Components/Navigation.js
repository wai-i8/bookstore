import { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Backdrop from "./Backdrop";
import SignIn from "../Pages/SignIn";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../Store/auth-Slice";
import ConfirmMessage from "./ConfirmMessage";

const Navigation = (props) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSignIn, setshowSignIn] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const numberOfCartItems = useSelector((state) => state.cart.items).length;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const naviToggle = useRef();
  let showNotification = false;
  if (numberOfCartItems >= 1) {
    showNotification = true;
  }

  const navRespondItemsOnClickHandler = () => {
    naviToggle.current.click();
  };
  const cartOnClickHandler = () => {
    setToggleCart((showState) => !showState);
  };

  const logoutHandler = () => {
    dispatch(authAction.logout());
  };
  const fictionlist = [
    {
      id: "detective",
      chineseName: "偵探小說",
    },
    { id: "sciencefiction", chineseName: "科幻小說" },
    { id: "horror", chineseName: "恐怖小說" },
    { id: "love", chineseName: "愛情小說" },
    { id: "history", chineseName: "歷史小說" },
    { id: "fanatsy", chineseName: "奇幻小說" },
  ];

  const nonfictionlist = [
    {
      id: "business",
      chineseName: "商業理財",
    },
    { id: "art&design", chineseName: "藝術設計" },
    { id: "soc", chineseName: "人文社科" },
    { id: "travel", chineseName: "旅遊" },
  ];

  const bookListOfRespondNav = (list) => {
    return list.map((book) => {
      return (
        <li>
          <Link
            to={`booklist/${book.id}`}
            onClick={navRespondItemsOnClickHandler}
          >
            {book.chineseName}
          </Link>
        </li>
      );
    });
  };

  return (
    <Fragment>
      <div className="navigation">
        <div className="navigation__flex-container--top">
          <div className="navigation__logo">
            <img
              src="https://cdn1.iconfinder.com/data/icons/city-outline-2/512/building_city_architecture_bookstore_book_store_shop_urban-512.png"
              alt="bookstore"
              className="navigation__icon"
            />
            <Link to="/" className="navigation__title">
              隨意書店
            </Link>
          </div>
          <form action="#" className="search">
            <input type="text" className="search__input" placeholder="搜索" />
            <button className="search__button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div className="navigation__user-info">
            {!isLoggedIn && <Link to="signup">註冊</Link>}
            {!isLoggedIn && (
              <button
                className="btn btn-purple"
                onClick={() => setshowSignIn(true)}
              >
                登入
              </button>
            )}
            {isLoggedIn && (
              <button className="btn btn-purple" onClick={logoutHandler}>
                登出
              </button>
            )}
            <button
              className="btn btn-tranparent navigation__cartIcon"
              onClick={cartOnClickHandler}
            >
              <i className="fa-solid fa-cart-arrow-down"></i>
              {showNotification && (
                <div className="navigation__notification">
                  {numberOfCartItems}
                </div>
              )}
            </button>
          </div>
          <div className="navigation-respond">
            <button
              className="btn btn-tranparent navigation__cartIcon margin-right-small"
              onClick={cartOnClickHandler}
            >
              <i className="fa-solid fa-cart-arrow-down"></i>
              {showNotification && (
                <div className="navigation__notification">
                  {numberOfCartItems}
                </div>
              )}
            </button>
            <input
              type="checkbox"
              className="navigation-respond__checkbox"
              id="navi-toggle"
              ref={naviToggle}
            />
            <label className="navigation-respond__button" htmlFor="navi-toggle">
              <span className="navigation-respond__icon"></span>
              <div></div>
            </label>
            <nav className="navigation-respond__nav">
              <div className="navigation-respond__content">
                <ul className="navigation-respond__list">
                  {!isLoggedIn && (
                    <li className="navigation-respond__item">
                      <Link to="signup" onClick={navRespondItemsOnClickHandler}>
                        註冊
                      </Link>
                    </li>
                  )}
                  {!isLoggedIn && (
                    <li className="navigation-respond__item">
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          navRespondItemsOnClickHandler();
                          setTimeout(() => setshowSignIn(true), 300);
                        }}
                      >
                        登入
                      </Link>
                    </li>
                  )}
                  {isLoggedIn && (
                    <li className="navigation-respond__item">
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          navRespondItemsOnClickHandler();
                          setTimeout(logoutHandler, 300);
                        }}
                      >
                        登出
                      </Link>
                    </li>
                  )}
                  <li className="navigation-respond__item">
                    <Link to="/" onClick={navRespondItemsOnClickHandler}>
                      禮品卡
                    </Link>
                  </li>
                  <li className="navigation-respond__item">
                    <Link
                      to="booklist/latestbook"
                      onClick={navRespondItemsOnClickHandler}
                    >
                      暢銷書
                    </Link>
                  </li>
                  <li className="navigation-respond__item">
                    <label htmlFor="fiction-toggle">小說</label>
                    <input
                      type="checkbox"
                      id="fiction-toggle"
                      className="navigation-respond__list-toggler"
                    />
                    <ul className="navigation-respond__toggled-list">
                      {bookListOfRespondNav(fictionlist)}
                    </ul>
                  </li>
                  <li className="navigation-respond__item">
                    <label htmlFor="nonfiction-toggle">非小說</label>
                    <input
                      type="checkbox"
                      id="nonfiction-toggle"
                      className="navigation-respond__list-toggler"
                    />
                    <ul className="navigation-respond__toggled-list">
                      {bookListOfRespondNav(nonfictionlist)}
                    </ul>
                  </li>
                  <li className="navigation-respond__item">
                    <Link to="/">青少年小說</Link>
                  </li>
                  <li className="navigation-respond__item">
                    <Link to="/">童書</Link>
                  </li>
                  <li className="navigation-respond__item">
                    <Link to="/">外語書</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="navigation__flex-container--bottom">
          <div className="navigation__category">
            <Link to="/">禮品卡</Link>
            <Link to="booklist/latestbook">暢銷書</Link>
            <Link to="/">新書到貨</Link>
            <div className="navigation__fiction">
              <span>小說</span>
              <div className="navigation__category-fiction">
                <ul className="navigation__category-fiction--list">
                  <li className="navigation__category-fiction--item">
                    <Link to="booklist/detective">偵探小說</Link>
                  </li>
                  <li className="navigation__category-fiction--item">
                    <Link to="booklist/sciencefiction">科幻小說</Link>
                  </li>
                  <li className="navigation__category-fiction--item">
                    <Link to="booklist/horror">恐怖小說</Link>
                  </li>
                  <li className="navigation__category-fiction--item">
                    <Link to="booklist/love">愛情小說</Link>
                  </li>
                  <li className="navigation__category-fiction--item">
                    <Link to="booklist/history">歷史小說</Link>
                  </li>
                  <li className="navigation__category-fiction--item">
                    <Link to="booklist/fantasy">奇幻小說</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navigation__non-fiction">
              <span>非小說</span>
              <div className="navigation__category-non-fiction">
                <ul className="navigation__category-non-fiction--list">
                  <li className="navigation__category-non-fiction--item">
                    商業理財
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    藝術設計
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    人文社科
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    心理勵志
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    宗教命理
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    自然科普
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    醫療保健
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    飲食
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    旅遊
                  </li>
                  <li className="navigation__category-non-fiction--item">
                    教科書
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/" onClick={navRespondItemsOnClickHandler}>
              青少年小說
            </Link>
            <Link to="/" onClick={navRespondItemsOnClickHandler}>
              童書
            </Link>
            <Link to="/" onClick={navRespondItemsOnClickHandler}>
              外語書
            </Link>
          </div>
        </div>
      </div>
      <div></div>
      {/* the above div is for maintaining the height of the nav */}
      {toggleCart && (
        <Backdrop
          close={() => setToggleCart(false)}
          colorClass="backdrop--transparent"
        >
          <Cart />
        </Backdrop>
      )}
      {showSignIn && (
        <Backdrop close={() => setshowSignIn(false)}>
          <SignIn close={() => setshowSignIn(false)} />
        </Backdrop>
      )}
      {showWelcome && (
        <Backdrop close={() => setShowWelcome(false)}>
          <ConfirmMessage
            message={
              "歡迎來到本網站，本網站內所有商品和帳號服務純屬虛構， 註冊帳號時請注意不要輸入真實信息，謝謝！"
            }
            close={() => {
              setShowWelcome(false);
            }}
            confirm={() => {
              setShowWelcome(false);
            }}
          />
        </Backdrop>
      )}
    </Fragment>
  );
};

export default Navigation;
