import { CheckoutData } from "../CheckoutWizard";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const SIZES = [50000, 100000, 200000, 500000];

export function StepAccountSize({ data, updateData, onNext }: Props) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Select Account Size</h2>
            <p className="text-slate-500 mb-6 text-sm">Choose your evaluation account size</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SIZES.map((size) => (
                    <button
                        key={size}
                        onClick={() => updateData({ accountSize: size })}
                        className={`p-8 rounded-xl border transition-all flex flex-col items-center justify-center ${data.accountSize === size
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                            }`}
                    >
                        <span className="text-gray-400 text-sm mb-1">$</span>
                        <span className="text-2xl font-bold">${size.toLocaleString()}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={!data.accountSize}
                className="w-full mt-8 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
            >
                Continue
            </button>
        </div>
    );
}
