import { CheckoutData } from "../CheckoutWizard";
import { Layers } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const TYPES = [
    { id: "2-Step Challenge", name: "2-Step Challenge", desc: "Complete Phase 1, then Phase 2 to get funded" },
    { id: "1-Step Challenge", name: "1-Step Challenge", desc: "Single evaluation phase to get funded" },
];

export function StepChallengeType({ data, updateData, onNext, onBack }: Props) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Select Challenge Type</h2>
            <p className="text-slate-500 mb-6 text-sm">Choose your evaluation structure</p>

            <div className="space-y-4">
                {TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => updateData({ challengeType: type.id as any })}
                        className={`w-full text-left p-6 rounded-xl border transition-all ${data.challengeType === type.id
                            ? "border-[#2563EB] bg-[#2563EB]/5 shadow-sm"
                            : "border-gray-200 hover:border-[#2563EB]/50 bg-gray-50/50 hover:bg-white"
                            }`}
                    >
                        <div className="flex items-start">
                            <div className="mt-1 mr-4">
                                <Layers className={`w-6 h-6 ${data.challengeType === type.id ? "text-[#2563EB]" : "text-slate-400"}`} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-lg mb-1">{type.name}</div>
                                <div className="text-sm text-slate-500">{type.desc}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={!data.challengeType}
                className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10 group"
            >
                <span className="tracking-wide">Continue</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10"
            >
                Back to Dashboard
            </button>
        </div>
    );
}
