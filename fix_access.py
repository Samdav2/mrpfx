import re

with open('/home/rehack/mrp_frontend/components/home/AccessSection.tsx', 'r') as f:
    content = f.read()

# Add MentorshipCourse
old_icon_end = '''            {/* Door */}
            <rect x="20" y="30" width="8" height="7" rx="1" fill="#DBEAFE" />
        </svg>
    )
};'''

new_icon_end = '''            {/* Door */}
            <rect x="20" y="30" width="8" height="7" rx="1" fill="#DBEAFE" />
        </svg>
    ),

    // 15. Mentorship Course — Video play button inside a screen
    MentorshipCourse: () => (
        <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
            <circle cx="24" cy="24" r="23" fill="#2563EB" />
            <rect x="12" y="14" width="24" height="20" rx="3" fill="white" />
            <polygon points="20,19 20,29 29,24" fill="#2563EB" />
        </svg>
    )
};'''

content = content.replace(old_icon_end, new_icon_end)

new_array = '''const accessItems = [
    {
        title: "VIP Signals",
        description: "Get elite trade setups & VIP signals.",
        icon: <CustomIcons.VIPSignals />,
        iconBg: "bg-transparent",
        href: "/vip-signals-group",
        buttonStyle: "dark"
    },
    {
        title: "Free Signals",
        description: "Access winning trades for free.",
        icon: <CustomIcons.FreeSignals />,
        iconBg: "bg-transparent",
        href: "/free-signals-group",
        buttonStyle: "light"
    },
    {
        title: "Mentorship Course",
        description: "Learn to trade like a professional.",
        icon: <CustomIcons.MentorshipCourse />,
        iconBg: "bg-transparent",
        href: "/mentorship-course",
        buttonStyle: "dark"
    },
    {
        title: "Account Management",
        description: "Manage multiple trading accounts in one place.",
        icon: <CustomIcons.AccountMgmt />,
        iconBg: "bg-transparent",
        href: "/support",
        buttonStyle: "dark"
    },
    {
        title: "Copy Trading",
        description: "Automate profitable trades from top traders.",
        icon: <CustomIcons.CopyTrading />,
        iconBg: "bg-transparent",
        href: "/",
        buttonStyle: "dark"
    },
    {
        title: "Pass Funded Accounts",
        description: "System helps you pass prop firm challenges.",
        icon: <CustomIcons.PassFunded />,
        iconBg: "bg-transparent",
        href: "/",
        buttonStyle: "dark"
    },
    {
        title: "VIP Bots",
        description: "Automate your trades with premium robots.",
        icon: <CustomIcons.VIPBots />,
        iconBg: "bg-transparent",
        href: "/all-vip-resources",
        buttonStyle: "dark"
    },
    {
        title: "Free Bots",
        description: "Use free bots for automate trading.",
        icon: <CustomIcons.FreeBots />,
        iconBg: "bg-transparent",
        href: "/free-signals-group",
        buttonStyle: "light"
    },
    {
        title: "VIP Indicators",
        description: "Premium custom indicators + locators.",
        icon: <CustomIcons.PaidIndicators />,
        iconBg: "bg-transparent",
        href: "/all-vip-resources",
        buttonStyle: "light"
    },
    {
        title: "Forex Books",
        description: "Improve your knowledge with our curated guides.",
        icon: <CustomIcons.ForexBooks />,
        iconBg: "bg-transparent",
        href: "/shop",
        buttonStyle: "light",
        buttonText: "Get Started"
    },
    {
        title: "Trade Journal",
        description: "Track and analyze your trades.",
        icon: <CustomIcons.TradeJournal />,
        iconBg: "bg-transparent",
        href: "/",
        buttonStyle: "dark"
    },
    {
        title: "Risk Calculator",
        description: "Calculate exact lot size plus risk management.",
        icon: <CustomIcons.RiskCalc />,
        iconBg: "bg-transparent",
        href: "/",
        buttonStyle: "light"
    },
    {
        title: "Dr. Trade AI Trading",
        description: "Level up with AI-boosted trading management.",
        icon: <CustomIcons.AITrading />,
        iconBg: "bg-transparent",
        href: "/all-vip-resources",
        buttonStyle: "light"
    },
    {
        title: "Recommended Broker",
        description: "Trade with top-rated brokers and exclusive offers.",
        icon: <CustomIcons.Broker />,
        iconBg: "bg-transparent",
        href: "https://one.exnesstrack.net/a/0z72b5esoc",
        buttonStyle: "light",
        buttonText: "Get Started"
    }
];'''

# Replace the array using regex
content = re.sub(r'const accessItems = \[\s*\{.*?\}\s*\];', new_array, content, flags=re.DOTALL)

with open('/home/rehack/mrp_frontend/components/home/AccessSection.tsx', 'w') as f:
    f.write(content)
print("Updated successfully")
