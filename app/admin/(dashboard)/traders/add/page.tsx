'use client';

import { useRouter } from 'next/navigation';
import TraderForm from '@/components/admin/traders/TraderForm';
import { traderService, TraderCreate, TraderUpdate } from '@/services/trader.service';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';
import { useState } from 'react';

export default function AddTraderPage() {
    const router = useRouter();
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const handleSubmit = async (data: TraderCreate | TraderUpdate) => {
        try {
            await traderService.createTrader(data as TraderCreate);
            setSuccessModal({ isOpen: true, message: 'Trader created successfully!' });
        } catch (error: any) {
            console.error('Failed to create trader:', error);
            const detail = error.response?.data?.detail || 'Failed to create trader.';
            setErrorModal({ isOpen: true, message: detail });
            throw error;
        }
    };

    const handleSuccessClose = () => {
        setSuccessModal({ isOpen: false, message: '' });
        router.push('/admin/traders');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Add New Trader</h1>
                    <p className="text-gray-400 text-sm mt-1">Enter the trader's details and performance metrics.</p>
                </div>
            </div>

            <TraderForm onSubmit={handleSubmit} />

            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={handleSuccessClose}
                message={successModal.message}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ isOpen: false, message: '' })}
                message={errorModal.message}
            />
        </div>
    );
}
