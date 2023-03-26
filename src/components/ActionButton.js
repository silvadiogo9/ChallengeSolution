import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ActionButton({
  type, action, text, icon, color,
}) {
  return (
    <button
      className="bttnFunctional"
      type={type}
      onClick={action}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: '22px', color }}
      />
      {text}
    </button>
  );
}

export default ActionButton;

// () => action()
