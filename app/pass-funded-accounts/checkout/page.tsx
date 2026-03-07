import React from 'react';
import CheckoutWizard from '@/components/pass-funded-accounts/CheckoutWizard';

export const metadata = {
    title: 'Checkout | Pass Funded Accounts | Mr P Fx',
    description: 'Finalize your registration to pass your funded account.',
};

export default function PassFundedAccountsCheckoutPage() {
    return (
        <div className="bg-[#f8fafc] min-h-screen pt-20">
            <CheckoutWizard />
        </div>
    );
}
