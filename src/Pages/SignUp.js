import useInput from "../Store/hooks";
import { useDispatch } from "react-redux";
import { authAction } from "../Store/auth-Slice";
import { Link, useNavigate } from "react-router-dom";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value);
const isPasswordValid = (value) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
const isPhoneValid = (value) => /^[23569]\d{7}$/.test(value);
const SignUp = (props) => {
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    onBlurHandler: firstNameBlurHandler,
    resetHandler: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    onBlurHandler: lastNameBlurHandler,
    resetHandler: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: birthdayValue,
    isValid: birthdayIsValid,
    hasError: birthdayHasError,
    valueChangeHandler: birthdayChangeHandler,
    onBlurHandler: birthdayBlurHandler,
    resetHandler: resetBirthday,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    resetHandler: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    resetHandler: resetpassword,
  } = useInput(isPasswordValid);

  const {
    value: passwordConfirmValue,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    onBlurHandler: passwordConfirmBlurHandler,
    resetHandler: resetpasswordConfirm,
  } = useInput((value) => value === passwordValue);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    onBlurHandler: phoneBlurHandler,
    resetHandler: resetphone,
  } = useInput(isPhoneValid);

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    birthdayIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid &&
    phoneIsValid;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    let userId;
    let token;
    try {
      const signUpRespond = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5X2pOCbJS4B7RCRfd9lnmfK9bT0EjbSg",
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
      if (signUpRespond.ok) {
        const result = await signUpRespond.json();
        userId = result.localId;
        token = result.idToken;
      } else {
        throw new Error(signUpRespond.error.message ?? "No response");
      }

      const saveUserDataRespond = await fetch(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: emailValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            birthday: birthdayValue,
            phoneNumber: phoneValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (saveUserDataRespond.ok) {
        dispatch(authAction.login({ token, userId }));
        resetForm();
        navigate("/", { replace: true });
      } else {
        throw new Error(
          saveUserDataRespond
            ? saveUserDataRespond.error.message
            : "No response"
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    resetFirstName();
    resetLastName();
    resetBirthday();
    resetEmail();
    resetpassword();
    resetpasswordConfirm();
    resetphone();
  };

  return (
    <div className="signup">
      <div className="signup__title border-bottom-basic">
        <div className="signup__title__options-container">
          <h2 className="signup__title__company-name">隨意書店</h2>
        </div>
      </div>
      <form
        action="#"
        className="form signup__content"
        onSubmit={submitHandler}
      >
        <div className="form__group signup__content__caption">
          <h1>建立你的網上書店帳號</h1>
          <h3>
            已有帳號？<Link to="/signin">按此登入</Link>
          </h3>
        </div>
        <div className="form__group signup__input--lastname">
          <input
            placeholder={lastNameHasError ? "請輸入正確姓氏" : "姓氏"}
            id="signup__input--lastname"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastNameValue}
            className={lastNameHasError ? "input-invalid" : undefined}
            required
          ></input>
          <label htmlFor="signup__input--lastname">姓氏</label>
        </div>
        <div className="form__group signup__input--firstname">
          <input
            placeholder={firstNameHasError ? "請輸入正確名字" : "名字"}
            id="signup__input--firstname"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstNameValue}
            className={firstNameHasError ? "input-invalid" : undefined}
            required
          ></input>
          <label htmlFor="signup__input--firstname">名字</label>
        </div>
        <div className="form__group signup__input--birthday">
          <input
            type="date"
            id="signup__input--birthday"
            onChange={birthdayChangeHandler}
            onBlur={birthdayBlurHandler}
            value={birthdayValue}
            className={birthdayHasError ? "input-invalid" : undefined}
            min="1900-01-01"
            max={today}
            required
          ></input>
          <label htmlFor="signup__input--birthday">出生日期</label>
        </div>
        <div className="form__group signup__input--email">
          <input
            type="email"
            placeholder={emailHasError ? "請輸入正確電郵地址" : "電郵地址"}
            id="signup__input--email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={emailHasError ? "input-invalid" : undefined}
            required
          ></input>
          <label htmlFor="signup__input--email">
            {emailHasError ? "請輸入正確電郵地址" : "電郵地址"}
          </label>
        </div>
        <div className="form__group signup__input--password">
          <input
            type="password"
            placeholder={
              passwordHasError
                ? "請輸入八位或以上含有大寫和小寫英文字母密碼"
                : "密碼"
            }
            id="signup__input--password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={passwordHasError ? "input-invalid" : undefined}
            required
          ></input>
          <label htmlFor="signup__input--password">
            {passwordHasError
              ? "請輸入八位或以上含有大寫和小寫英文字母密碼"
              : "密碼"}
          </label>
        </div>
        <div className="form__group signup__input--password">
          <input
            type="password"
            placeholder={
              passwordConfirmHasError
                ? "請輸入與先前密碼相同的密碼"
                : "確認密碼"
            }
            id="signup__input--password-confirm"
            value={passwordConfirmValue}
            onChange={passwordConfirmChangeHandler}
            onBlur={passwordConfirmBlurHandler}
            className={passwordConfirmHasError ? "input-invalid" : undefined}
            required
          ></input>
          <label htmlFor="signup__input--password-confirm">
            {passwordConfirmHasError
              ? "請輸入與先前密碼相同的密碼"
              : "確認密碼"}
          </label>
        </div>
        <div className="form__group signup__input--phone-number">
          <input
            placeholder={
              phoneHasError ? "請輸入正確香港個人電話號碼" : "電話號碼"
            }
            id="phone-number"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            className={phoneHasError ? "input-invalid" : undefined}
            required
          ></input>
          <label htmlFor="signup__input--phone-number">
            {phoneHasError ? "請輸入正確香港個人電話號碼" : "電話號碼"}
          </label>
        </div>
        <div className="form__group signup__submit">
          <button
            type="submit"
            className="btn btn-purple"
            disabled={!formIsValid}
          >
            註冊
          </button>
        </div>
        <div className="form__group signup__reset">
          <button className="btn btn-purple" onClick={resetForm}>
            重設
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
