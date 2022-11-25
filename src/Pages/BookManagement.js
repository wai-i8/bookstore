import { useRef } from "react";
import { useSelector } from "react-redux";

const BookManagement = (props) => {
  const titleRef = useRef();
  const typeRef = useRef();
  const authorRef = useRef();
  const originalPriceRef = useRef();
  const currentPriceRef = useRef();
  const bookCoverRef = useRef();

  const token = useSelector((state) => state.auth.token);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const bookInfo = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      type: typeRef.current.value,
      originalPrice: originalPriceRef.current.value
        ? originalPriceRef.current.value
        : null,
      currentPrice: currentPriceRef.current.value,
      bookCover: bookCoverRef.current.value,
    };
    const sendData = async () => {
      const response = await fetch(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/booklists/${bookInfo.type}.json?auth=${token}`,
        {
          method: "POST",
          body: JSON.stringify(bookInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("成功發送");
      } else {
        throw new Error("Something went wrong");
      }
    };
    sendData().catch((err) => alert(err.message));
  };

  return (
    <div className="book-management">
      <form
        action="#"
        className="form book-management__content"
        onSubmit={onSubmitHandler}
      >
        <div className="form__group book-management__content__title border-bottom-basic">
          <h2>新增書籍</h2>
        </div>
        <div className="form__group book-management__input--title">
          <input
            id="book-management__input--title"
            ref={titleRef}
            required
          ></input>
          <label htmlFor="book-management__input--title">書名</label>
        </div>
        <div className="form__group book-management__input--type">
          <select id="book-management__input--type" ref={typeRef} required>
            <option value="love">愛情小說</option>
            <option value="sciencefiction">科幻小說</option>
            <option value="history">歷史小說</option>
            <option value="horror">恐怖小說</option>
            <option value="detective">偵探小說</option>
            <option value="fantasy">奇幻小說</option>
            <option value="travel">旅遊書</option>
            <option value="latestbook">本週暢銷書籍</option>
          </select>
          <label htmlFor="book-management__input--type">種類</label>
        </div>
        <div className="form__group book-management__input--author">
          <input
            id="book-management__input--author"
            ref={authorRef}
            required
          ></input>
          <label htmlFor="book-management__input--author">作者</label>
        </div>
        <div className="form__group book-management__input--originalPrice">
          <input
            id="book-management__input--originalPrice"
            ref={originalPriceRef}
          ></input>
          <label htmlFor="book-management__input--originalPrice">原價</label>
        </div>
        <div className="form__group book-management__input--currentPrice">
          <input
            id="book-management__input--currentPrice"
            ref={currentPriceRef}
            required
          ></input>
          <label htmlFor="book-management__input--currentPrice">現價</label>
        </div>
        <div className="form__group book-management__input--bookCover">
          <input
            id="book-management__input--bookCover"
            ref={bookCoverRef}
            required
          ></input>
          <label htmlFor="book-management__input--bookCover">書封面</label>
        </div>
        <button type="submit" className="btn btn-purple">
          發送
        </button>
      </form>
    </div>
  );
};

export default BookManagement;
