import BookListItem from "./BookListItem";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment, useRef } from "react";
import NotFound from "../Pages/NotFound";

const BookList = (props) => {
  const [books, setBooks] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [listTitle, setListTitle] = useState({
    iconClass: "",
    text: "",
  });
  let booklistType = props.booklistType;
  let icon = <i className={listTitle.iconClass}></i>;
  let title = listTitle.text;
  const galleryRef = useRef();

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetch data fail!");
      }
      const data = await response.json();
      return data;
    };
    try {
      fetchData(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/title/${booklistType}.json`
      ).then((titleData) => {
        setListTitle(titleData);
      });
      fetchData(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/booklists/${booklistType}.json`
      ).then((bookData) => {
        let bookList = [];
        for (let key in bookData) {
          bookList.push({ ...bookData[key], key: key });
        }
        setBooks(bookList);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }, [booklistType]);

  const listedBookItems = books ? (
    books.slice(0, 5).map((book) => {
      return <BookListItem key={book.key} img={book.bookCover} />;
    })
  ) : (
    <NotFound />
  );

  const numberOfBooks = books ? books.length : 0;
  const linkOfFullList = "booklist/" + props.booklistType;

  const scrollLeftHandler = () => {
    galleryRef.current.scrollLeft = galleryRef.current.scrollLeft - 10;
  };

  const scrollRightHandler = () => {
    galleryRef.current.scrollLeft = galleryRef.current.scrollLeft + 10;
  };

  return (
    <div className="book-list">
      <button className="book-list__left-button" onClick={scrollLeftHandler}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </button>
      <button className="book-list__right-button" onClick={scrollRightHandler}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </button>
      {isLoading ? (
        <p>is Loading...</p>
      ) : (
        <Fragment>
          <div className="book-list__title">
            <h1>
              {icon} {title}
            </h1>
            <Link to={linkOfFullList} className="btn btn-purple">
              完整列表（{numberOfBooks}本）
            </Link>
          </div>

          <div ref={galleryRef} className="book-list__gallery">
            <div className="book-list__gallery-content">{listedBookItems}</div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default BookList;
