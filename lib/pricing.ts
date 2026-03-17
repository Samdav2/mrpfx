export function getCheckoutPrice(
    plan: "Standard Pass" | "Guaranteed Pass" | "",
    challengeType: "1-Step Challenge" | "2-Step Challenge",
    scope: "Step 1 Only" | "Full Pass" | "",
    accountSize: number
): number {
    if (!plan || !challengeType || !scope || !accountSize) return 0;

    // 1-Step always acts as Full Pass for pricing, regardless of what `scope` says
    const effectiveScope = challengeType === "1-Step Challenge" ? "Full Pass" : scope;

    if (plan === "Guaranteed Pass") {
        if (challengeType === "2-Step Challenge" && effectiveScope === "Step 1 Only") {
            const prices: Record<number, number> = { 50000: 800, 100000: 1200, 200000: 1700, 500000: 2500 };
            return prices[accountSize] || 0;
        }
        if (challengeType === "2-Step Challenge" && effectiveScope === "Full Pass") {
            const prices: Record<number, number> = { 50000: 1100, 100000: 1600, 200000: 2200, 500000: 3200 };
            return prices[accountSize] || 0;
        }
        if (challengeType === "1-Step Challenge") {
            const prices: Record<number, number> = { 50000: 1400, 100000: 1900, 200000: 2600, 500000: 3800 };
            return prices[accountSize] || 0;
        }
    }

    if (plan === "Standard Pass") {
        if (challengeType === "2-Step Challenge" && effectiveScope === "Step 1 Only") {
            const prices: Record<number, number> = { 50000: 490, 100000: 690, 200000: 990, 300000: 1390, 500000: 1790 }; // Added 500k as safety fallback, but original array had 300k
            return prices[accountSize] || 0;
        }
        if (challengeType === "2-Step Challenge" && effectiveScope === "Full Pass") {
            const prices: Record<number, number> = { 50000: 650, 100000: 850, 200000: 1290, 500000: 1790 };
            return prices[accountSize] || 0;
        }
        if (challengeType === "1-Step Challenge") {
            // Same as guaranteed
            const prices: Record<number, number> = { 50000: 1400, 100000: 1900, 200000: 2600, 500000: 3800 };
            return prices[accountSize] || 0;
        }
    }

    return 0;
}
