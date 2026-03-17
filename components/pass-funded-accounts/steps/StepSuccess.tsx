import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    orderId: string;
}

export function StepSuccess({ orderId }: Props) {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown === 0) {
            router.push('/dashboard');
        }
    }, [countdown, router]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden max-w-2xl mx-auto">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 relative group">
                    <div className="absolute inset-0 bg-emerald-400 rounded-[2rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>

                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Order Successful!</h2>
                <p className="text-base font-medium text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for your purchase. Your evaluation passing service order has been received and is now being processed by our team.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-10 w-full max-w-sm mx-auto">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="font-mono text-lg font-bold text-slate-900">{orderId}</p>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-6 sm:p-8 mb-10 w-full text-left relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-indigo-500/10"></div>
                    <h3 className="text-indigo-900 font-bold flex items-center gap-2 mb-3 text-lg">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                        What happens next?
                    </h3>
                    <p className="text-sm font-medium text-indigo-900/70 leading-relaxed mb-5 pl-8">
                        You will receive an email shortly with your login credentials and further instructions to start your challenge tracking.
                    </p>
                    <div className="pl-8 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
                        <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest">
                            Redirecting to dashboard in {countdown}s
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard"
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-10 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 group"
                >
                    <span className="tracking-wide">Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
