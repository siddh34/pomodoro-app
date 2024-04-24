import { useEffect } from "react";

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
    isTimerStarted: boolean;
    constTime: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
    value,
    onChange,
    label,
    isTimerStarted,
    constTime
}) => {
    useEffect(() => {
        // Your effect logic here
        console.log(isTimerStarted)
    }, [isTimerStarted]);

    return (
        <div>
            <label
                htmlFor="number-input"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <input
                type="number"
                id="number-input"
                value={!isTimerStarted ? value : constTime}
                onChange={(e) => {
                    let inputValue = Number(e.target.value);
                    if (!Number.isInteger(inputValue)) {
                        inputValue = Math.round(inputValue);
                    }
                    if (inputValue <= 0) {
                        onChange(1 * 60);
                    } else if (inputValue >= 120) {
                        onChange(120 * 60);
                    } else {
                        onChange(inputValue * 60);
                    }
                }}
                disabled={isTimerStarted}
                aria-describedby="helper-text-explanation"
                className="bg-gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Pomodoro duration in minutes"
                required
            />
        </div>
    );
};

export default NumberInput;
