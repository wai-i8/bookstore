const ConfirmMessage = (props) => {
  return (
    <div className="comfirm-message" onClick={(e) => e.stopPropagation()}>
      <button className="comfirm-message__close-tag" onClick={props.close}>
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
      {props.loading ? (
        <p>loading ... </p>
      ) : (
        <div className="comfirm-message__content">
          <h3>{props.message}</h3>
          <div className="comfirm-message__selection">
            <button className="btn btn-purple" onClick={props.confirm}>
              確認
            </button>
            <button className="btn btn-purple" onClick={props.close}>
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmMessage;
