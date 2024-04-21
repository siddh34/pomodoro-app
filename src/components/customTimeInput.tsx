interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
    value,
    onChange,
    label,
}) => (
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
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-describedby="helper-text-explanation"
            className="bg-gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="67"
            required
        />
    </div>
);

export default NumberInput;
