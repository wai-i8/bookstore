import useInput from "../Store/hooks";
import { useDispatch } from "react-redux";
import { authAction } from "../Store/auth-Slice";
import { useNavigate } from "react-router-dom";

const isNotEmpty = (value) => value.trim() !== "";

const SignInPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    resetHandler: resetEmail,
  } = useInput(isNotEmpty);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    resetHandler: resetpassword,
  } = useInput(isNotEmpty);

  let formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    try {
      const respond = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5X2pOCbJS4B7RCRfd9lnmfK9bT0EjbSg",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (respond.ok) {
        const result = await respond.json();
        dispatch(
          authAction.login({
            token: result.idToken,
            userId: result.localId,
            expiresIn: result.expiresIn,
          })
        );
        resetForm();
        navigate("/", { replace: true });
      } else {
        const result = await respond.json();
        throw new Error(result.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    resetEmail();
    resetpassword();
  };

  return (
    <div className="signin-page">
      <div className="signin-page__content">
        <div className="signin__type-selection">
          <button className="signin__type-selection--phone">驗證碼登入</button>
          <button className="signin__type-selection--email">電郵登入</button>
        </div>
        <form
          action="#"
          className="form signin__input"
          onSubmit={submitHandler}
        >
          <div className="form__group signin__input--email">
            <input
              type="email"
              placeholder={emailHasError ? "請輸入正確電郵地址" : "電郵地址"}
              id="signin__input--email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              className={emailHasError ? "input-invalid" : undefined}
              required
            ></input>
            <label htmlFor="signin__input--email">電郵地址</label>
          </div>
          <div className="form__group signin__input--password">
            <input
              type="password"
              placeholder={passwordHasError ? "請輸入正確密碼" : "密碼"}
              id="signin__input--password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              className={passwordHasError ? "input-invalid" : undefined}
              required
            ></input>
            <label htmlFor="signin__input--password">密碼</label>
          </div>
          <div className="form__group signin__input--submit">
            <button className="btn btn-purple" disabled={!formIsValid}>
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
