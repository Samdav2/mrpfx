import VIPTradingIndicatorsPage from '@/components/vip/VIPTradingIndicatorsPage';

export const metadata = {
    title: 'VIP Trading Indicators | Mr P FX',
    description: 'Access professional indicator tools for Forex, Gold, and Indices. Premium signals for MT4 and MT5.',
};

export default function VIPTradingIndicatorsRoute() {
    return (
        <main>
            <VIPTradingIndicatorsPage />
        </main>
    );
}
