import { CheckoutData } from "../CheckoutWizard";
import { Building2 } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
}

const FIRMS = [
    { id: "FundedNext", name: "FundedNext" },
    { id: "FundingPips", name: "FundingPips" },
    { id: "FTMO", name: "FTMO" },
];

export function StepChooseFirm({ data, updateData, onNext }: Props) {
    const handleSelect = (firm: string) => {
        updateData({ propFirm: firm });
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Choose Your Prop Firm</h2>
            <p className="text-slate-500 mb-6 text-sm">Select the prop firm you purchased your evaluation from</p>

            <div className="space-y-4">
                {FIRMS.map((firm) => (
                    <button
                        key={firm.id}
                        onClick={() => handleSelect(firm.id)}
                        className={`w-full flex items-center p-4 rounded-xl border transition-all ${data.propFirm === firm.id
                            ? "border-[#2563EB] bg-[#2563EB]/5 shadow-sm text-[#2563EB] font-bold"
                            : "border-gray-200 hover:border-[#2563EB]/50 bg-gray-50/50 hover:bg-white text-slate-700 font-semibold"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${data.propFirm === firm.id ? "bg-[#2563EB] text-white" : "bg-white border border-gray-200 shadow-sm text-slate-400"}`}>
                            <Building2 className="w-5 h-5" />
                        </div>
                        <span>{firm.name}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={!data.propFirm}
                className="w-full mt-8 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
            >
                Continue
            </button>
        </div>
    );
}
