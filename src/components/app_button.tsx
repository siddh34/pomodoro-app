interface ButtonProps {
    color: "pink" | "blue" | "green" | "red";
    isDisabled: boolean;
    textInside: string;
}

const colorClasses = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
};

function AppButton(props: ButtonProps) {
    const { color, isDisabled, textInside } = props;

    const colorClass = colorClasses[color];

    if (isDisabled) {
        return (
            <button
                className={`flex items-center ${colorClass} opacity-50`}
                disabled
            >
                <span>{textInside}</span>
            </button>
        );
    }

    return (
        <button className={`flex items-center ${colorClass}`}>
            <span>{textInside}</span>
        </button>
    );
}

export default AppButton;
