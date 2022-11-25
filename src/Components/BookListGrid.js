import { Fragment, useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import BookListGridItem from "./BookListGridItem";
import NotFound from "../Pages/NotFound";
import BookInfo from "./BookInfo";
import Backdrop from "./Backdrop";

const BookListGrid = (props) => {
  const [books, setBooks] = useState(null);
  const [bookDetail, setbookDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [listTitle, setListTitle] = useState({
    iconClass: "",
    text: "",
  });

  let booklistType = useParams().booklistType;
  if (props.booklistType && !booklistType) {
    booklistType = props.booklistType;
  }

  let listedBookItems = books;
  let icon = <i className={listTitle.iconClass}></i>;
  let title = listTitle.text;

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetch data fail!");
      }
      const data = await response.json();
      return data;
    };
    if (booklistType) {
      fetchData(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/title/${booklistType}.json`
      )
        .then((titleData) => {
          if (titleData) {
            setListTitle(titleData);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      fetchData(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/booklists/${booklistType}.json`
      )
        .then((bookData) => {
          if (bookData) {
            let bookList = [];
            for (let key in bookData) {
              bookList.push({ ...bookData[key], key: key });
            }
            setBooks(bookList);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [booklistType]);

  const onClickHandler = (book) => {
    setbookDetail(book);
  };

  const BookList = books ? (
    listedBookItems.map((book) => {
      return (
        <BookListGridItem
          book={book}
          key={book.key}
          showDetail={onClickHandler}
        />
      );
    })
  ) : (
    <NotFound />
  );

  const imagesRef = useRef(null);
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;
          if (!newImgSrc) {
            console.error("Image source is invalid");
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node); // detach the observer when done
        }
      });
    });
    intObs.observe(node);
  }, []);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(
      ".book-list__item.lazy-loading"
    );
    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, books]);

  return (
    <Fragment>
      {bookDetail && (
        <Backdrop close={() => setbookDetail(null)}>
          <BookInfo book={bookDetail} close={() => setbookDetail(null)} />
        </Backdrop>
      )}
      {!isLoading && (
        <div className="margin-bottom-medium">
          <div className="book-list book-list--grid">
            {listedBookItems && (
              <div className="book-list__title book-list__title--grid-item">
                <h1>
                  {icon} {title}
                </h1>
                {booklistType && !props.showBackToHome && (
                  <Link to="/" className="btn btn-purple">
                    返回主頁
                  </Link>
                )}
              </div>
            )}
            {BookList}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookListGrid;
