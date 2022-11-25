import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="footer">
      <div className="footer__grid-container">
        <div className="footer__about">
          <a href="/" className="white-font">
            關於我們
          </a>
          <a href="/" className="white-font">
            支援
          </a>
          <a href="/" className="white-font">
            禮品卡
          </a>
          <a href="/" className="white-font">
            聯絡我們
          </a>
          <a href="/" className="white-font">
            退款和退貨政策
          </a>
        </div>
        <div className="footer__social-info">
          <span className="white-font">追蹤我們！</span>
          <div className="footer__social-info-icon">
            <a href="/">
              <i className="fa-brands fa-facebook white-font font-big"></i>
            </a>
            <a href="/">
              <i className="fa-brands fa-instagram white-font font-big"></i>
            </a>
            <a href="/">
              <i className="fa-brands fa-youtube white-font font-big"></i>
            </a>
          </div>
        </div>
        <div className="footer__payment">
          <span className="white-font">支付方法</span>
          <div className="footer__payment-icon">
            <a href="/">
              <i className="fa-brands fa-cc-visa white-font font-big"></i>
            </a>
            <a href="/">
              <i className="fa-brands fa-cc-mastercard white-font font-big"></i>
            </a>
            <a href="/">
              <i className="fa-brands fa-cc-paypal  white-font font-big"></i>
            </a>
          </div>
        </div>
        <div className="footer__privacy flex-basic">
          {isLoggedIn && (
            <Link to="bookmanagement" className="white-font">
              管理員選項
            </Link>
          )}
          <span className="text-align-center">
            github @jackiecheunq 2022 @ All Rights Reserved
          </span>
          <a href="/" className="white-font">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
