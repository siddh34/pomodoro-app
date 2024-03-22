interface ButtonProps {
  color: string;
  isDisabled: boolean;
  textInside: string;
}

function button(props: ButtonProps) {
  const { color, isDisabled, textInside } = props;

  if (isDisabled === true) {
    return (
        <button className={`flex items-center bg-${color} opacity-50`} disabled>
            <span>{textInside}</span>
        </button>
    );
  }

  return (
    <button className={`flex items-center bg-${color}`}>
      <span>{textInside}</span>
    </button>
  );
}

export default button