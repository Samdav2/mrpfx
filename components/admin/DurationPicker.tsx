
import { useState, useEffect } from 'react';

interface DurationPickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
}

const UNITS = [
    { label: 'Minutes', value: 'minute' },
    { label: 'Hours', value: 'hour' },
    { label: 'Days', value: 'day' },
    { label: 'Weeks', value: 'week' },
    { label: 'Months', value: 'month' },
    { label: 'Years', value: 'year' },
];

export default function DurationPicker({ value, onChange, label = "Duration", className = "" }: DurationPickerProps) {
    const [amount, setAmount] = useState<number | ''>('');
    const [unit, setUnit] = useState<string>('week');

    useEffect(() => {
        // Parse the initial value string (e.g., "10 weeks" or "10 week")
        if (value) {
            const match = value.match(/^(\d+)\s*([a-zA-Z]+)/);
            if (match) {
                setAmount(Number(match[1]));
                // Normalize unit: remove 's' if present to match singular option values
                const parsedUnit = match[2].toLowerCase().replace(/s$/, '');
                if (UNITS.some(u => u.value === parsedUnit)) {
                    setUnit(parsedUnit);
                }
            } else {
                // Determine if it is just a number
                const num = Number(value);
                if (!isNaN(num)) {
                    setAmount(num);
                }
            }
        }
    }, [value]);

    const handleUpdate = (newAmount: number | '', newUnit: string) => {
        setAmount(newAmount);
        setUnit(newUnit);
        if (newAmount === '' || newAmount === 0) {
            onChange('');
            return;
        }
        // Construct string. Append 's' if amount > 1
        const unitString = newAmount > 1 ? `${newUnit}s` : newUnit;
        onChange(`${newAmount} ${unitString}`);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="text-sm font-medium text-gray-400">{label}</label>
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <input
                        type="number"
                        min="0"
                        className="w-full bg-[#1F2937] text-white text-sm rounded-l-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600 border-r-gray-700"
                        value={amount}
                        onChange={(e) => handleUpdate(e.target.value === '' ? '' : Number(e.target.value), unit)}
                        placeholder="0"
                    />
                </div>
                <div className="relative w-1/3">
                    <select
                        className="w-full bg-[#1F2937] text-white text-sm rounded-r-lg px-3 py-2.5 outline-none border-l border-gray-700 focus:ring-1 focus:ring-purple-500 cursor-pointer appearance-none"
                        value={unit}
                        onChange={(e) => handleUpdate(amount, e.target.value)}
                    >
                        {UNITS.map((u) => (
                            <option key={u.value} value={u.value}>
                                {u.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
