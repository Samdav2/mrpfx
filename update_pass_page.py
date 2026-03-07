import re

with open("app/pass-funded-accounts/page.tsx", "r") as f:
    content = f.read()

# 1. flex-col md:flex-row to flex-row
content = content.replace(
    'className="w-full max-w-5xl mx-auto flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden mb-16 border border-gray-200"',
    'className="w-full max-w-5xl mx-auto flex flex-row shadow-xl rounded-xl overflow-hidden mb-16 border border-gray-200"'
)

# 2. Divider line always visible
content = content.replace(
    '<div className="hidden md:block w-px bg-gray-200"></div>',
    '<div className="block w-px bg-gray-200 shrink-0"></div>'
)

# 3. Guaranteed Pass column top
guaranteed_top_old = """<div className="flex-1 flex flex-col bg-white">
                                    <div className="text-center py-4 bg-[#f8fafc] font-bold text-[#2A2A72] text-xl border-b border-gray-100">
                                        Guaranteed Pass
                                    </div>

                                    <div className="p-4 md:p-6 flex flex-col gap-6">"""

guaranteed_top_new = """<div className="flex-1 flex flex-col bg-white w-1/2">
                                    <div className="text-center py-3 md:py-4 px-1 md:px-2 bg-[#f8fafc] border-b border-gray-100 flex flex-col items-center justify-center min-h-[90px] md:min-h-[100px]">
                                        <div className="flex flex-col xl:flex-row items-center gap-1 xl:gap-2">
                                            <span className="font-bold text-[#2A2A72] text-sm sm:text-lg md:text-xl">Guaranteed Pass</span>
                                            <span className="bg-[#5c6bc0] text-white text-[8px] md:text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wide whitespace-nowrap">Most Popular 👍</span>
                                        </div>
                                        <span className="text-[10px] md:text-sm text-[#4b5563] mt-1 md:mt-2 font-medium leading-tight px-1">Full refund if we don't pass your evaluation</span>
                                    </div>

                                    <div className="p-2 sm:p-4 md:p-6 flex flex-col gap-4 md:gap-6">"""

content = content.replace(guaranteed_top_old, guaranteed_top_new)

# 4. Remove elements from Card 1
card1_top_old = """<div className="bg-[#2e377f] p-5 text-left relative">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <h3 className="text-white text-lg font-bold">Guaranteed Pass</h3>
                                                    <span className="bg-[#5c6bc0] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide">Most Popular</span>
                                                </div>
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">2-Step Challenge <span className="font-normal text-sm opacity-90 ml-1">Step 1 Pass Only</span></h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Full refund if we don't pass your evaluation</p>
                                            </div>"""

card1_top_new = """<div className="bg-[#2e377f] p-3 md:p-5 text-left relative">
                                                <h4 className="text-white text-sm sm:text-base md:text-[20px] font-bold tracking-tight leading-snug">2-Step Challenge <span className="block xl:inline font-normal text-[10px] sm:text-xs md:text-sm opacity-90 xl:ml-1 mt-0.5 xl:mt-0">Step 1 Pass Only</span></h4>
                                            </div>"""

content = content.replace(card1_top_old, card1_top_new)


# 5. Guaranteed Card 2 Title
card2_top_old = """<div className="bg-[#2e377f] p-5 text-left">
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">2-Step Challenge</h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Full (Step 1 + Step 2)</p>
                                            </div>"""

card2_top_new = """<div className="bg-[#2e377f] p-3 md:p-5 text-left">
                                                <h4 className="text-white text-sm sm:text-base md:text-[20px] font-bold tracking-tight leading-snug">2-Step Challenge <span className="block xl:inline font-normal text-[10px] sm:text-xs md:text-sm opacity-90 xl:ml-1 mt-0.5 xl:mt-0">Full (Step 1 + Step 2)</span></h4>
                                            </div>"""

content = content.replace(card2_top_old, card2_top_new)


# 6. Standard Pass column top
standard_top_old = """<div className="flex-1 flex flex-col bg-[#f0f4f8]">
                                    <div className="text-center py-4 bg-[#e2e8f0]/80 font-medium text-[#4b5563] text-xl border-b border-gray-200">
                                        Standard Pass
                                    </div>

                                    <div className="p-4 md:p-6 flex flex-col gap-6">"""

standard_top_new = """<div className="flex-1 flex flex-col bg-white w-1/2">
                                    <div className="text-center py-3 md:py-4 px-1 md:px-2 bg-[#f8fafc] border-b border-gray-100 flex flex-col items-center justify-center min-h-[90px] md:min-h-[100px]">
                                        <span className="font-bold text-[#2A2A72] text-sm sm:text-lg md:text-xl">Standard Pass</span>
                                        <span className="text-[10px] md:text-sm text-[#4b5563] mt-1 md:mt-2 font-medium leading-tight px-1">Professional evaluation passing service</span>
                                    </div>

                                    <div className="p-2 sm:p-4 md:p-6 flex flex-col gap-4 md:gap-6">"""

content = content.replace(standard_top_old, standard_top_new)


# 7. Standard Card 1 Title
standard_card1_top_old = """<div className="bg-[#2e377f] p-5 text-left relative">
                                                <h3 className="text-white text-lg font-bold mb-1">Standard Pass</h3>
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">2-Step Challenge <span className="font-normal text-sm opacity-90 ml-1">Full (Step 1 + Step 2)</span></h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Professional evaluation passing service</p>
                                            </div>"""

standard_card1_top_new = """<div className="bg-[#2e377f] p-3 md:p-5 text-left relative">
                                                <h4 className="text-white text-sm sm:text-base md:text-[20px] font-bold tracking-tight leading-snug">2-Step Challenge <span className="block xl:inline font-normal text-[10px] sm:text-xs md:text-sm opacity-90 xl:ml-1 mt-0.5 xl:mt-0">Full (Step 1 + Step 2)</span></h4>
                                            </div>"""

content = content.replace(standard_card1_top_old, standard_card1_top_new)


# 8. Standard Card 2 Title
standard_card2_top_old = """<div className="bg-[#2e377f] p-5 text-left">
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">1-Step Challenge</h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Full</p>
                                            </div>"""

standard_card2_top_new = """<div className="bg-[#2e377f] p-3 md:p-5 text-left">
                                                <h4 className="text-white text-sm sm:text-base md:text-[20px] font-bold tracking-tight leading-snug">1-Step Challenge <span className="block xl:inline font-normal text-[10px] sm:text-xs md:text-sm opacity-90 xl:ml-1 mt-0.5 xl:mt-0">Full</span></h4>
                                            </div>"""

content = content.replace(standard_card2_top_old, standard_card2_top_new)


# Update padding in content boxes to fit mobile beautifully
content = content.replace('<div className="p-5 text-left flex flex-col flex-1 bg-gray-50/50">', '<div className="p-3 md:p-5 text-left flex flex-col flex-1 bg-gray-50/50">')

# Shrink price labels for mobile
content = content.replace('<span className="text-[#334155] text-[14px] font-medium">', '<span className="text-[#334155] text-[11px] sm:text-[13px] md:text-[14px] font-medium">')
content = content.replace('<span className="text-[#1a1a1a] font-bold text-[15px]">', '<span className="text-[#1a1a1a] font-bold text-xs sm:text-sm md:text-[15px]">')

# Shrink check icons on mobile
content = content.replace('<Check className="h-4 w-4 text-[#3f51b5] mr-2 flex-shrink-0" />', '<Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#3f51b5] mr-1.5 md:mr-2 flex-shrink-0" />')
content = content.replace('<Check className="h-4 w-4 text-[#3f51b5] mr-2 mt-0.5 flex-shrink-0" />', '<Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#3f51b5] mr-1.5 md:mr-2 mt-0.5 flex-shrink-0" />')

# Shrink text under benefits
content = content.replace('<span className="text-[#334155] text-[13px] font-medium leading-tight">', '<span className="text-[#334155] text-[10px] sm:text-[12px] md:text-[13px] font-medium leading-tight">')
content = content.replace('<p className="text-[#1e293b] font-semibold text-sm mb-3">', '<p className="text-[#1e293b] font-semibold text-xs md:text-sm mb-2 md:mb-3">')

# Buttons size
content = content.replace('className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-auto shadow-sm text-center block text-[15px]"', 'className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-2 md:py-3 rounded-lg transition-colors duration-200 mt-auto shadow-sm text-center block text-xs sm:text-sm md:text-[15px]"')


with open("app/pass-funded-accounts/page.tsx", "w") as f:
    f.write(content)
