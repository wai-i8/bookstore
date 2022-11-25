const Backdrop = (props) => {
  return (
    <div className={`${props.colorClass ?? "backdrop"}`} onClick={props.close}>
      {props.children}
    </div>
  );
};

export default Backdrop;
