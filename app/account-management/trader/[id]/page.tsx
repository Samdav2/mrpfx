import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft, Award, TrendingUp, AlertTriangle, Briefcase,
    DollarSign, Activity, CheckCircle2, Shield, Calendar,
    BarChart3, Target, Crosshair
} from 'lucide-react';

// Reusing the mock data structure but with extended dashboard statistics
const managerProfiles: Record<string, any> = {
    'managerA': {
        name: 'Master Trader A',
        type: 'Conservative',
        winRate: '85%',
        monthlyRoi: '4-6%',
        maxDrawdown: '3%',
        totalTrades: '1,240',
        profitFactor: '2.14',
        avgTradeDuration: '4.2 Days',
        bestTrade: '+$1,450',
        worstTrade: '-$320',
        strategy: 'Low-risk algorithmic hedging with strict stop losses.',
        description: 'Master Trader A employs a highly conservative strategy focused on wealth preservation. Utilizing proprietary algorithmic hedging techniques, this manager aims for consistent, low-volatility returns. Every position is strictly protected by hard stop losses, ensuring drawdowns remain minimal. Ideal for capital preservation.',
        history: [
            { id: 1, pair: 'EUR/USD', type: 'BUY', size: '2.00', openPrice: '1.08450', closePrice: '1.08750', profit: '+$600', date: 'Oct 24, 2024', status: 'Win' },
            { id: 2, pair: 'GBP/USD', type: 'SELL', size: '1.50', openPrice: '1.26500', closePrice: '1.26200', profit: '+$450', date: 'Oct 23, 2024', status: 'Win' },
            { id: 3, pair: 'USD/JPY', type: 'BUY', size: '2.00', openPrice: '149.500', closePrice: '149.400', profit: '-$133', date: 'Oct 21, 2024', status: 'Loss' },
            { id: 4, pair: 'AUD/USD', type: 'BUY', size: '3.00', openPrice: '0.65200', closePrice: '0.65500', profit: '+$900', date: 'Oct 19, 2024', status: 'Win' },
            { id: 5, pair: 'EUR/GBP', type: 'SELL', size: '4.00', openPrice: '0.86500', closePrice: '0.86400', profit: '+$400', date: 'Oct 18, 2024', status: 'Win' },
        ]
    },
    'managerB': {
        name: 'Pro Trader B',
        type: 'Balanced',
        winRate: '78%',
        monthlyRoi: '8-12%',
        maxDrawdown: '7%',
        totalTrades: '3,100',
        profitFactor: '1.85',
        avgTradeDuration: '1.5 Days',
        bestTrade: '+$2,800',
        worstTrade: '-$950',
        strategy: 'Intraday trend following with dynamic position sizing.',
        description: 'Pro Trader B utilizes a balanced approach, capturing medium-term trends while managing risk dynamically. This strategy involves intraday trading, capitalizing on market momentum during peak volume hours. It offers a solid middle ground between steady growth and calculated risk-taking.',
        history: [
            { id: 1, pair: 'XAU/USD', type: 'BUY', size: '1.00', openPrice: '2024.50', closePrice: '2030.00', profit: '+$550', date: 'Oct 24, 2024', status: 'Win' },
            { id: 2, pair: 'GBP/JPY', type: 'SELL', size: '2.50', openPrice: '188.500', closePrice: '187.900', profit: '+$1,500', date: 'Oct 23, 2024', status: 'Win' },
            { id: 3, pair: 'EUR/USD', type: 'BUY', size: '3.00', openPrice: '1.08200', closePrice: '1.08050', profit: '-$450', date: 'Oct 22, 2024', status: 'Loss' },
            { id: 4, pair: 'US30', type: 'BUY', size: '0.50', openPrice: '38150', closePrice: '38250', profit: '+$500', date: 'Oct 20, 2024', status: 'Win' },
            { id: 5, pair: 'USD/CAD', type: 'SELL', size: '2.00', openPrice: '1.35500', closePrice: '1.35100', profit: '+$800', date: 'Oct 18, 2024', status: 'Win' },
        ]
    },
    'managerC': {
        name: 'Elite Trader C',
        type: 'Aggressive',
        winRate: '72%',
        monthlyRoi: '15-25%',
        maxDrawdown: '15%',
        totalTrades: '4,850',
        profitFactor: '1.65',
        avgTradeDuration: '4 Hours',
        bestTrade: '+$5,200',
        worstTrade: '-$1,800',
        strategy: 'High-frequency scalping during volatile market sessions.',
        description: 'Elite Trader C is designed for investors seeking maximum growth. Employing aggressive, high-frequency scalping techniques, this manager targets short-term volatility bursts across major pairs and indices. While drawdowns are naturally higher, the potential for rapid portfolio expansion is significant.',
        history: [
            { id: 1, pair: 'NAS100', type: 'BUY', size: '2.00', openPrice: '17550', closePrice: '17600', profit: '+$1,000', date: 'Oct 24, 2024', status: 'Win' },
            { id: 2, pair: 'US30', type: 'SELL', size: '1.50', openPrice: '38400', closePrice: '38250', profit: '+$2,250', date: 'Oct 24, 2024', status: 'Win' },
            { id: 3, pair: 'XAU/USD', type: 'BUY', size: '3.00', openPrice: '2015.00', closePrice: '2010.00', profit: '-$1,500', date: 'Oct 23, 2024', status: 'Loss' },
            { id: 4, pair: 'GBP/JPY', type: 'BUY', size: '4.00', openPrice: '187.200', closePrice: '187.800', profit: '+$2,400', date: 'Oct 23, 2024', status: 'Win' },
            { id: 5, pair: 'EUR/JPY', type: 'SELL', size: '5.00', openPrice: '160.500', closePrice: '160.800', profit: '-$1,500', date: 'Oct 22, 2024', status: 'Loss' },
        ]
    }
};

export default async function TraderProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id: managerId } = await params;
    const profile = managerProfiles[managerId];

    if (!profile) {
        notFound();
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen pt-[120px] pb-24 font-sans font-dm-sans selection:bg-blue-200">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#e0e7ff] to-[#f8fafc] z-0 pointer-events-none"></div>

            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Navigation Back */}
                <div className="mb-8">
                    <Link href="/account-management" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1E3A8A] transition-colors group">
                        <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Account Management
                    </Link>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-12 mb-8 relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 w-full">
                        <div className="flex items-center mb-6 md:mb-0">
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-lg text-white mr-6">
                                <Award className="h-10 w-10" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-[#0A1128] font-palanquin-dark tracking-tight mb-2">
                                    {profile.name}
                                </h1>
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1E3A8A] font-semibold text-sm rounded-full border border-blue-100">
                                        <Shield className="h-3.5 w-3.5 mr-1.5" />
                                        {profile.type} Strategy
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 font-semibold text-sm rounded-full border border-green-100">
                                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                        Verified Trader
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-left md:text-right bg-blue-50/50 p-4 rounded-xl border border-blue-100 min-w-[200px]">
                            <p className="text-sm font-medium text-gray-500 mb-1">Estimated Monthly ROI</p>
                            <p className="text-3xl font-bold text-[#1E3A8A]">{profile.monthlyRoi}</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 relative z-10 w-full max-w-3xl">
                        <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 flex items-center">
                            <Target className="h-5 w-5 mr-2 text-blue-600" />
                            Strategy Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-[16px]">
                            {profile.description}
                        </p>
                    </div>
                </div>

                {/* Statistics Grid */}
                <h2 className="text-2xl font-bold text-[#0A1128] mb-6 font-palanquin-dark">Performance Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {/* Stat Card 1 */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mb-4 text-green-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Win Rate</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.winRate}</p>
                    </div>
                    {/* Stat Card 2 */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Max Drawdown</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.maxDrawdown}</p>
                    </div>
                    {/* Stat Card 3 */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Profit Factor</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.profitFactor}</p>
                    </div>
                    {/* Stat Card 4 */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-600">
                            <Briefcase className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Trades</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.totalTrades}</p>
                    </div>
                </div>

                {/* Additional Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Best Trade</p>
                            <p className="text-xl font-bold text-green-600">{profile.bestTrade}</p>
                        </div>
                        <Activity className="h-8 w-8 text-green-100" />
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Worst Trade</p>
                            <p className="text-xl font-bold text-red-500">{profile.worstTrade}</p>
                        </div>
                        <Activity className="h-8 w-8 text-red-100" />
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Trade Duration</p>
                            <p className="text-xl font-bold text-[#1a1a1a]">{profile.avgTradeDuration}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-gray-200" />
                    </div>
                </div>

                {/* Trading History Table */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden mb-12">
                    <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-xl font-bold text-[#0A1128] font-palanquin-dark flex items-center">
                            <Crosshair className="h-5 w-5 mr-2 text-indigo-600" />
                            Recent Trading History
                        </h2>
                        <span className="text-sm text-gray-500 font-medium">Last 5 Closed Positions</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Symbol</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Size (Lots)</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Open Price</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Close Price</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Profit/Loss</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {profile.history.map((t: any) => (
                                    <tr key={t.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="py-4 px-6 text-sm font-medium text-gray-600 whitespace-nowrap">{t.date}</td>
                                        <td className="py-4 px-6 text-sm font-bold text-[#1a1a1a] whitespace-nowrap">{t.pair}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${t.type === 'BUY' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                                                }`}>
                                                {t.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-600 whitespace-nowrap">{t.size}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-600 whitespace-nowrap">{t.openPrice}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-600 whitespace-nowrap">{t.closePrice}</td>
                                        <td className={`py-4 px-6 text-sm font-bold text-right whitespace-nowrap ${t.status === 'Win' ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            {t.profit}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
                        <p className="text-xs text-gray-500">End of recent history sample. Full historical breakdown is available to active managed accounts.</p>
                    </div>
                </div>

                {/* Return CTA */}
                <div className="flex justify-center mb-12">
                    <Link href="/account-management" className="px-8 py-3.5 bg-[#2546A8] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl text-center transition-all shadow-md transform hover:-translate-y-0.5">
                        Select This Manager & Connect Account
                    </Link>
                </div>

            </div>
        </div>
    );
}
