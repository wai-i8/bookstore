import { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/cart-Slice";

const BookInfo = (props) => {
  const dispatch = useDispatch();
  const quantityRef = useRef();

  const onClickHandler = () => {
    if (+quantityRef.current.value <= 0) {
      return;
    }
    dispatch(
      cartAction.addItem({
        ...props.book,
        quantity: +quantityRef.current.value,
      })
    );
    props.close();
  };
  return (
    <div className="book-info" onClick={(e) => e.stopPropagation()}>
      <div className="book-info__img">
        <img
          src={props.book.bookCover}
          className="book-list__item"
          alt="book"
        ></img>
      </div>
      <div className="book-info__text">
        <button className="book-info__close-tag" onClick={props.close}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <h2 className="border-bottom-basic margin-bottom-small">購買書籍</h2>
        <h3 className="font-500">{props.book.title}</h3>
        <span>{props.book.author}</span>
        <div className="flex-basic">
          {props.book.originalPrice && (
            <span className="font-line-through red-font margin-right-small">
              {`$${props.book.originalPrice}`}
            </span>
          )}
          <span> {`$${props.book.currentPrice}`}</span>
        </div>
        <div className="flex-basic">
          <input
            type="number"
            className="book-info__number-input margin-right-medium"
            placeholder="數量"
            step="1"
            min="1"
            max="10"
            ref={quantityRef}
            defaultValue="1"
          ></input>
          <button className="btn btn-purple" onClick={onClickHandler}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
