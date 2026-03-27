'use client';

import { useRouter, useParams } from 'next/navigation';
import TraderForm from '@/components/admin/traders/TraderForm';
import { traderService, Trader, TraderUpdate, TraderCreate } from '@/services/trader.service';
import { SuccessModal, ErrorModal, ConfirmModal } from '@/components/admin/Modals';
import { useState, useEffect } from 'react';

export default function EditTraderPage() {
    const router = useRouter();
    const params = useParams();
    const traderId = params.trader_id as string;

    const [trader, setTrader] = useState<Trader | null>(null);
    const [loading, setLoading] = useState(true);
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        const fetchTrader = async () => {
            try {
                const response: any = await traderService.getAllTraders();
                let traders: Trader[] = [];
                if (Array.isArray(response)) {
                    traders = response;
                } else if (response && response.data && Array.isArray(response.data)) {
                    traders = response.data;
                } else if (response && response.traders && Array.isArray(response.traders)) {
                    traders = response.traders;
                }

                const found = traders.find(t => t.trader_id === traderId);
                if (found) {
                    setTrader(found);
                } else {
                    setErrorModal({ isOpen: true, message: 'Trader not found.' });
                }
            } catch (error) {
                console.error('Failed to fetch trader:', error);
                setErrorModal({ isOpen: true, message: 'Failed to fetch trader details.' });
            } finally {
                setLoading(false);
            }
        };
        if (traderId) fetchTrader();
    }, [traderId]);

    const handleSubmit = async (data: TraderCreate | TraderUpdate) => {
        try {
            await traderService.updateTrader(traderId, data as TraderUpdate);
            setSuccessModal({ isOpen: true, message: 'Trader updated successfully!' });
        } catch (error: any) {
            console.error('Failed to update trader:', error);
            const detail = error.response?.data?.detail || 'Failed to update trader.';
            setErrorModal({ isOpen: true, message: detail });
            throw error;
        }
    };

    const handleDelete = async () => {
        try {
            await traderService.deleteTrader(traderId);
            setConfirmDelete(false);
            setSuccessModal({ isOpen: true, message: 'Trader deleted successfully!' });
        } catch (error) {
            console.error('Failed to delete trader:', error);
            setErrorModal({ isOpen: true, message: 'Failed to delete trader.' });
        }
    };

    const handleSuccessClose = () => {
        setSuccessModal({ isOpen: false, message: '' });
        router.push('/admin/traders');
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-gray-400">Loading trader details...</p>
            </div>
        );
    }

    if (!trader && !loading) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400">Trader not found.</p>
                <button
                    onClick={() => router.push('/admin/traders')}
                    className="mt-4 text-purple-400 hover:underline"
                >
                    Back to Traders
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Edit Trader: {trader?.name}</h1>
                    <p className="text-gray-400 text-sm mt-1">Update trader details and metrics.</p>
                </div>
            </div>

            <TraderForm
                initialData={trader!}
                onSubmit={handleSubmit}
                onDelete={() => setConfirmDelete(true)}
                isEditing={true}
            />

            <ConfirmModal
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title="Delete Trader"
                message="Are you sure you want to delete this trader? This action cannot be undone."
                isDestructive={true}
            />

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
