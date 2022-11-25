const BookListGridItem = (props) => {
  return (
    <div className="book-list__grid-unit">
      <img
        data-src={props.book.bookCover}
        src={`https://picsum.photos/id/870/300/300?grayscale&blur=2`}
        className="book-list__item lazy-loading"
        alt="booklist-item"
      />
      <div className="book-list__book-info margin-left-medium">
        <h3 className="font-500">{props.book.title}</h3>
        <span>{props.book.author}</span>
        <div className="flex-basic">
          {props.book.originalPrice && (
            <span className="font-line-through red-font margin-right-small">
              {`$${props.book.originalPrice}`}
            </span>
          )}
          <span>{`$${props.book.currentPrice}`}</span>
        </div>
        <button
          className="btn btn-purple"
          onClick={() => props.showDetail(props.book)}
        >
          購買
        </button>
      </div>
    </div>
  );
};

export default BookListGridItem;
