import { CheckoutData } from "../CheckoutWizard";
import { Info, FileText } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepAdditionalInfo({ data, updateData, onNext, onBack }: Props) {
    // API requires whatsapp and telegram. I'll make them required here.
    const isValid = data.whatsapp.length > 3 && data.telegram.length > 3;

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <FileText className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Additional Info</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Provide contact details and any special instructions for our traders.
                </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-100/50 rounded-2xl p-4 mb-8 flex gap-4 items-center relative z-10">
                <div className="flex-shrink-0">
                    <Info className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-xs text-amber-900/80 font-semibold leading-relaxed">
                    Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days
                </span>
            </div>

            <div className="space-y-5 relative z-10">
                {/* Contact Info (Required by API) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">WhatsApp Number *</label>
                        <input
                            type="text"
                            value={data.whatsapp}
                            onChange={(e) => updateData({ whatsapp: e.target.value })}
                            placeholder="+1 234 567 8900"
                            className="w-full bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Telegram Handle *</label>
                        <input
                            type="text"
                            value={data.telegram}
                            onChange={(e) => updateData({ telegram: e.target.value })}
                            placeholder="@username"
                            className="w-full bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-all duration-300"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Trader Notes (Optional)</label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => updateData({ notes: e.target.value })}
                        placeholder={`Include any relevant information such as:
- Specific drawdown limits or rules
- News trading restrictions
- Preferred trading times
- Maximum spread requirements
- Any other special considerations`}
                        rows={6}
                        className="w-full bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-all duration-300 resize-none leading-relaxed"
                    />
                    <p className="text-[11px] font-semibold text-slate-400 mt-3 ml-1">
                        Providing detailed information helps our traders execute your evaluation more effectively.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex items-start gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 relative z-10 transition-all duration-300 hover:bg-indigo-50">
                <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-900/80 leading-relaxed font-medium">
                    <span className="font-bold text-indigo-900 block mb-1">Pro Tip</span>
                    Include information about your challenge rules, especially if there are restrictions on news trading, maximum daily loss, or specific trading hours required.
                </p>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10"
            >
                <span className="tracking-wide">Continue to Review</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10"
            >
                Back to MT5 Details
            </button>
        </div>
    );
}
