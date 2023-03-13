function ActionButton({ action, text }) {
  return (
    <button
      className="bttnFunctional"
      onClick={action}
    >
      {text}
    </button>
  );
}

export default ActionButton;

// () => action()
