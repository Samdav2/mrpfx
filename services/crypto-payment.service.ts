import { cryptoPaymentsService as existingCryptoService } from '../lib/crypto-payments';
import api from '@/lib/api';

export interface CryptoPayment {
    payment_id: string;
    payment_status: string;
    pay_address: string;
    price_amount: number;
    price_currency: string;
    pay_amount: number;
    pay_currency: string;
    order_id: string;
    order_description: string;
    ipn_callback_url: string;
    created_at: string;
    updated_at: string;
    purchase_id: string;
    smart_contract: string;
    network: string;
    network_precision: number;
    time_limit: string;
    burning_percent: string;
    expiration_estimate_date: string;
    is_fixed_rate: boolean;
    is_fee_paid_by_user: boolean;
    valid_until: string;
    type: string;
    payin_extra_id?: string;
}

export const cryptoPaymentService = {
    getPaymentStatus: async (paymentId: string) => {
        return existingCryptoService.forceUpdateStatus(paymentId).then(res => ({ payment_status: res.status }));
    },
    getAvailableCurrencies: async () => {
        return existingCryptoService.getCurrencies().then(currencies => ({ currencies }));
    },
    getEstimatedPrice: async (amount: number, currencyFrom: string, currencyTo: string) => {
        return existingCryptoService.getEstimate(amount, currencyFrom, currencyTo);
    },
    createInvoice: async (data: any) => {
        return existingCryptoService.createInvoice(data);
    },
    createDirectPayment: async (data: any) => {
        return existingCryptoService.createPayment(data);
    }
};
