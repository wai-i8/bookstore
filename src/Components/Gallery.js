import { useEffect, useRef, useState } from "react";

const Gallery = (props) => {
  const imgs = [
    "https://s26162.pcdn.co/wp-content/uploads/2018/12/11-bookstores-6-three-lives-2.w710.h473.2x.jpg",
    "https://www.chinadailyhk.com/attachments/image/92/212/183/520397_217250/520397_217250_800_auto_jpg.jpg",
    "https://booksandbao.com/wp-content/uploads/2020/11/kitazawa-bookstore-feature-1000x563.jpg.webp",
    "https://retailinasia.com/wp-content/uploads/2020/01/bookstore.jpg",
  ];

  const [indexOfCurrentImg, setIndexOfCurrentImg] = useState(0);
  const [isRightClick, setIsRightClick] = useState(true);
  const rightButtonRef = useRef();
  let imgTransition = {
    transform: `translateX(-${indexOfCurrentImg}00%`,
  };
  useEffect(() => {
    let interval = setInterval(() => rightButtonRef.current.click(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (indexOfCurrentImg === imgs.length) {
      setTimeout(() => {
        rightButtonRef.current.click();
      }, 600);
    }
  }, [indexOfCurrentImg, imgs.length]);

  if (indexOfCurrentImg === 0 && isRightClick) {
    imgTransition = {
      ...imgTransition,
      transition: "none",
    };
  }
  const imgList = imgs.map((img, index) => {
    return (
      <li className={`gallery__li`}>
        <img src={img} alt="carousel-img" className="gallery__img" />
      </li>
    );
  });

  const fakeImgList = [
    ...imgList,
    <li className={`gallery__li`}>
      <img src={imgs[0]} alt="carousel-img" className="gallery__img" />
    </li>,
  ];

  const indexDots = imgs.map((img, index) => {
    return (
      <button
        className={`gallery__index-dot ${
          indexOfCurrentImg === index && "gallery__index-dot--active"
        }`}
        onClick={() => setIndexOfCurrentImg(index)}
      >
        &nbsp;
      </button>
    );
  });

  const rightMoveHandler = () => {
    setIsRightClick(true);
    setIndexOfCurrentImg((prevState) => {
      if (prevState === imgs.length) {
        return 0;
      }
      return prevState + 1;
    });
  };

  const leftMoveHandler = () => {
    setIsRightClick(false);
    if (indexOfCurrentImg === 0) {
      return;
    }
    setIndexOfCurrentImg((prevState) => {
      return prevState - 1;
    });
  };

  return (
    <div className="gallery">
      <div className="gallery__carousel">
        <ul className="gallery__ul" style={imgTransition}>
          {fakeImgList}
        </ul>
        <span className="gallery__caption">Welcome to My BookStore</span>
        <button className="gallery__left-button" onClick={leftMoveHandler}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="gallery__right-button"
          onClick={rightMoveHandler}
          ref={rightButtonRef}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <div className="gallery__index">{indexDots}</div>
      </div>
    </div>
  );
};

export default Gallery;
