import { CheckoutData } from "../CheckoutWizard";
import { Target, CheckCircle2 } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepScope({ data, updateData, onNext, onBack }: Props) {
    const handleSelect = (scope: "Step 1 Only" | "Full Pass") => {
        updateData({ scope });
    };

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <Target className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Service Scope</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Select the phases of the evaluation you need us to pass.
                </p>
            </div>

            <div className="space-y-4 relative z-10 w-full max-w-md mx-auto">
                {/* Step 1 Only */}
                <button
                    onClick={() => handleSelect("Step 1 Only")}
                    className={`w-full text-left p-6 sm:p-7 rounded-[1.5rem] border-2 transition-all duration-300 relative group ${data.scope === "Step 1 Only"
                        ? "border-slate-900 bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -translate-y-0.5"
                        : "border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                >
                    <div className="flex items-center gap-5 sm:gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${data.scope === "Step 1 Only" ? "bg-white/10 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"}`}>
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <div className={`font-black text-lg tracking-tight mb-1 transition-colors ${data.scope === "Step 1 Only" ? "text-white" : "text-slate-900"}`}>Phase 1 Only</div>
                            <div className={`text-sm font-medium transition-colors ${data.scope === "Step 1 Only" ? "text-slate-300" : "text-slate-500"}`}>We&apos;ll pass the first phase of your evaluation</div>
                        </div>
                    </div>
                </button>

                {/* Full Pass */}
                <button
                    onClick={() => handleSelect("Full Pass")}
                    className={`w-full text-left p-6 sm:p-7 rounded-[1.5rem] border-2 transition-all duration-300 relative group ${data.scope === "Full Pass"
                        ? "border-slate-900 bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -translate-y-0.5"
                        : "border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                >
                    <div className="flex items-center gap-5 sm:gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${data.scope === "Full Pass" ? "bg-white/10 text-emerald-400" : "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"}`}>
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <div className={`font-black text-lg tracking-tight mb-1 transition-colors ${data.scope === "Full Pass" ? "text-white" : "text-slate-900"}`}>Full Pass (Phase 1 + 2)</div>
                            <div className={`text-sm font-medium transition-colors ${data.scope === "Full Pass" ? "text-slate-300" : "text-slate-500"}`}>We&apos;ll pass both phases to get you funded</div>
                        </div>
                    </div>
                </button>
            </div>

            <button
                onClick={onNext}
                disabled={!data.scope}
                className="w-full mt-10 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10 group max-w-md mx-auto"
            >
                <span className="tracking-wide">Continue to Packages</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10 max-w-md mx-auto block"
            >
                Back to Account Size
            </button>
        </div>
    );
}
