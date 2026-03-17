import { CheckoutData } from "../CheckoutWizard";
import { AlertTriangle, Info } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepMT5Details({ data, updateData, onNext, onBack }: Props) {
    const isValid = data.loginId.length > 3 && data.password.length > 3 && data.serverName.length > 3;

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <Info className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">MT5 Information</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Provide your MetaTrader 5 account credentials to link your challenge.
                </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-100/50 rounded-2xl p-4 mb-6 flex gap-4 items-center relative z-10">
                <div className="flex-shrink-0">
                    <Info className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-xs text-amber-900/80 font-semibold leading-relaxed">
                    Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days
                </span>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/50 rounded-2xl p-4 mb-8 flex gap-4 items-start relative z-10 transition-all duration-300 hover:bg-amber-50">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    <span className="font-bold block mb-1">Warning:</span>
                    Do not trade on this account after submitting your credentials. Any trading activity will void your package benefits.
                </p>
            </div>

            <div className="space-y-5 relative z-10">
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">MT5 Login ID</label>
                    <input
                        type="text"
                        value={data.loginId}
                        onChange={(e) => updateData({ loginId: e.target.value })}
                        placeholder="Enter your MT5 login ID"
                        className="w-full bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-all duration-300"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">MT5 Password</label>
                    <input
                        type="text"
                        value={data.password}
                        onChange={(e) => updateData({ password: e.target.value })}
                        placeholder="Enter your MT5 password"
                        className="w-full bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-all duration-300"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">MT5 Server</label>
                    <input
                        type="text"
                        value={data.serverName}
                        onChange={(e) => updateData({ serverName: e.target.value })}
                        placeholder="e.g. FundedNext-Server"
                        className="w-full bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-all duration-300"
                    />
                </div>
            </div>

            <div className="mt-8 flex items-start gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 relative z-10">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <p className="text-xs text-indigo-900/80 font-medium leading-relaxed">
                    Your credentials are securely encrypted and only used by our professional traders to execute your evaluation. We never share your information with third parties.
                </p>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10 group"
            >
                <span className="tracking-wide">Continue to Additional Info</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10"
            >
                Back to Details
            </button>
        </div>
    );
}
