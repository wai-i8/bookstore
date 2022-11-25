import { Fragment, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BookListGrid from "./Components/BookListGrid";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import BookManagement from "./Pages/BookManagement";
import OrdersListPage from "./Pages/OrdersListPage";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./Store/auth-Slice";
import SignInPage from "./Pages/SignInPage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    let remainingTime;

    const calculateRemainingTime = (expirationTime) => {
      const currentTime = new Date().getTime();
      const remainingDuration = expirationTime - currentTime;
      return Math.round(remainingDuration / 1000);
    };

    dispatch(async (dispatch) => {
      if (loginInfo) {
        let { token, userId, expirationTime } = loginInfo;
        const retrieveStoredToken = () => {
          remainingTime = calculateRemainingTime(expirationTime);
          if (remainingTime <= 0) {
            localStorage.removeItem("loginInfo");
            return authAction.logout;
          }
          return authAction.login({
            token,
            userId,
            expiresIn: remainingTime,
          });
        };
        const authenticationAction = retrieveStoredToken();
        dispatch(authenticationAction);

        setTimeout(() => {
          dispatch(authAction.logout());
        }, remainingTime * 1000);
      }
    });
  }, [dispatch]);
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route exact path="booklist/:booklistType" element={<BookListGrid />} />
        <Route exact path="booklist" element={<Navigate to="/" replace />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="signin" element={<SignInPage />} />
        {isLoggedIn && (
          <Route exact path="bookmanagement" element={<BookManagement />} />
        )}
        <Route exact path="orderslist" element={<OrdersListPage />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
