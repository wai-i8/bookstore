import NewsBar from "../Components/NewsBar";
import Gallery from "../Components/Gallery";
import BookList from "../Components/BookList";
import BookListGrid from "../Components/BookListGrid";
import NewsLetterAdv from "../Components/NewsletterAdv";
import { Fragment, useState, useRef, useCallback, useEffect } from "react";

const Home = (props) => {
  const [showBtnToTop, setShowBtnToTop] = useState(false);
  const galleryRef = useRef(null);

  const galleryObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio <= 0) {
          setShowBtnToTop(true);
        } else {
          setShowBtnToTop(false);
        }
      });
    });
    intObs.observe(node);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    galleryRef.current = document.querySelector(".gallery");
    galleryObserver(galleryRef.current);
  }, [galleryObserver]);

  return (
    <Fragment>
      <NewsBar />
      <Gallery />
      <BookList booklistType="latestbook" id="latestbook" />
      <BookList booklistType="history" />
      <BookList booklistType="love" />
      <BookListGrid booklistType="travel" showBackToHome />
      <NewsLetterAdv />
      {showBtnToTop && (
        <button className="btn-to-top" onClick={scrollToTop}>
          <i className="fa-solid fa-angle-up "></i>
        </button>
      )}
    </Fragment>
  );
};

export default Home;
