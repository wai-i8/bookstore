import { Link } from "react-router-dom";

const Adv = (props) => {
  return (
    <div className="adv">
      <div className="adv__caption">
        <h1>Sign up for our Newsletter</h1>
        <h3>Tell us what books you love.</h3>
      </div>
      <Link to="signup" className="btn btn-purple">
        Sign Up
      </Link>
    </div>
  );
};

export default Adv;
