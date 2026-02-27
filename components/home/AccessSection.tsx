import React from 'react';
import Link from 'next/link';
import {
    RefreshCcw,
    GraduationCap,
    Bot,
    Laptop,
    Crown,
    Send,
    Calculator,
    FileText,
    Cpu,
    Activity,
    BarChart2,
    BookOpen,
    Landmark
} from 'lucide-react';

const accessItems = [
    {
        title: "Copy Trading",
        description: "Automate profitable trades from top traders.",
        icon: <RefreshCcw className="w-6 h-6 text-[#1e3a8a]" />,
        iconBg: "bg-blue-100",
        href: "/copy-trading",
        buttonStyle: "dark"
    },
    {
        title: "Pass Funded Accounts",
        description: "System helps you pass prop firm challenges.",
        icon: <GraduationCap className="w-6 h-6 text-[#1e3a8a]" />,
        iconBg: "bg-blue-100",
        href: "/pass-funded-accounts",
        buttonStyle: "dark"
    },
    {
        title: "Dr. Trade AI Trading",
        description: "Level up with AI-boosted trading management.",
        icon: <Bot className="w-6 h-6 text-blue-500" />,
        iconBg: "bg-blue-50",
        href: "/dr-trade-ai",
        buttonStyle: "light"
    },
    {
        title: "Account Management",
        description: "Manage multiple trading accounts in one place.",
        icon: <Laptop className="w-6 h-6 text-[#1e3a8a]" />,
        iconBg: "bg-blue-100",
        href: "/account-management",
        buttonStyle: "dark"
    },
    {
        title: "VIP Signals",
        description: "Get elite trade setups & VIP signals.",
        icon: <Crown className="w-6 h-6 text-yellow-500" />,
        iconBg: "bg-[#1e3a8a]",
        href: "/vip-signals-group",
        buttonStyle: "dark"
    },
    {
        title: "Free Signals",
        description: "Access winning trades for free.",
        icon: <Send className="w-6 h-6 text-blue-500" />,
        iconBg: "bg-blue-50",
        href: "/free-signals-group",
        buttonStyle: "light"
    },
    {
        title: "Risk Calculator",
        description: "Calculate exact lot size plus risk management.",
        icon: <Calculator className="w-6 h-6 text-gray-600" />,
        iconBg: "bg-gray-100",
        href: "/risk-calculator",
        buttonStyle: "light"
    },
    {
        title: "Trade Journal",
        description: "Track and analyze your trades.",
        icon: <FileText className="w-6 h-6 text-[#1e3a8a]" />,
        iconBg: "bg-blue-100",
        href: "/trade-journal",
        buttonStyle: "dark"
    },
    {
        title: "VIP Bots",
        description: "Automate your trades with premium robots.",
        icon: <Cpu className="w-6 h-6 text-white" />,
        iconBg: "bg-[#1e3a8a]",
        href: "/all-vip-resources",
        buttonStyle: "dark"
    },
    {
        title: "Free Bots",
        description: "Use free bots for automate trading.",
        icon: <Bot className="w-6 h-6 text-blue-800" />,
        iconBg: "bg-blue-100",
        href: "/all-vip-resources",
        buttonStyle: "light"
    },
    {
        title: "Paid Indicators",
        description: "Premium custom indicators + locators.",
        icon: <Activity className="w-6 h-6 text-blue-500" />,
        iconBg: "bg-blue-50",
        href: "/all-vip-resources",
        buttonStyle: "light"
    },
    {
        title: "Free Indicators",
        description: "Get access to top-rated free indicators.",
        icon: <BarChart2 className="w-6 h-6 text-blue-400" />,
        iconBg: "bg-blue-50",
        href: "/all-vip-resources",
        buttonStyle: "light"
    },
    {
        title: "Forex Books",
        description: "Improve your knowledge with our curated guides.",
        icon: <BookOpen className="w-6 h-6 text-[#1e3a8a]" />,
        iconBg: "bg-gray-100",
        href: "/books",
        buttonStyle: "light",
        buttonText: "Get Started"
    },
    {
        title: "Recommended Broker",
        description: "Trade with top-rated brokers and exclusive offers.",
        icon: <Landmark className="w-6 h-6 text-[#1e3a8a]" />,
        iconBg: "bg-blue-50",
        href: "/recommended-broker",
        buttonStyle: "light",
        buttonText: "Get Started"
    }
];

export default function AccessSection() {
    return (
        <section className="bg-[#f8f9fc] py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
                        Everything You Can Access Inside Mr P Fx
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {accessItems.map((item, index) => {
                        // The default grid has 4 columns.
                        // For the last 2 items (indices 12 and 13), make them span 2 columns on lg screens.
                        const isLastTwo = index === accessItems.length - 1 || index === accessItems.length - 2;

                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 ${isLastTwo ? 'lg:col-span-2' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-[#1a1a1a] text-[17px] leading-tight flex-1">
                                        {item.title}
                                    </h3>
                                </div>

                                <p className="text-gray-500 text-sm mb-6 flex-1 pr-2">
                                    {item.description}
                                </p>

                                <Link href={item.href} className="w-full mt-auto block">
                                    <button
                                        className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors duration-200 ${item.buttonStyle === 'dark'
                                            ? 'bg-[#1e3aa0] text-white hover:bg-[#152a7a]'
                                            : 'bg-[#eef2fc] text-[#1e3aa0] hover:bg-[#dfe6f7]'
                                            }`}
                                    >
                                        {item.buttonText || "Access"}
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
