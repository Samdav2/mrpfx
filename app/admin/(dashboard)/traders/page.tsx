'use client';

import { useState, useEffect } from 'react';
import TraderList from '@/components/admin/traders/TraderList';
import { traderService, Trader } from '@/services/trader.service';
import { ConfirmModal, SuccessModal, ErrorModal } from '@/components/admin/Modals';

export default function TradersPage() {
    const [traders, setTraders] = useState<Trader[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean, traderId: string | null }>({ isOpen: false, traderId: null });
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const fetchTraders = async () => {
        setLoading(true);
        try {
            const response: any = await traderService.getAllTraders();
            if (Array.isArray(response)) {
                setTraders(response);
            } else if (response && response.data && Array.isArray(response.data)) {
                setTraders(response.data);
            } else if (response && response.traders && Array.isArray(response.traders)) {
                setTraders(response.traders);
            }
        } catch (error) {
            console.error('Failed to fetch traders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTraders();
    }, []);

    const handleDeleteClick = (id: string) => {
        setConfirmDelete({ isOpen: true, traderId: id });
    };

    const handleDelete = async () => {
        if (!confirmDelete.traderId) return;
        try {
            await traderService.deleteTrader(confirmDelete.traderId);
            setConfirmDelete({ isOpen: false, traderId: null });
            setSuccessModal({ isOpen: true, message: 'Trader deleted successfully!' });
            fetchTraders();
        } catch (error) {
            console.error('Failed to delete trader:', error);
            setErrorModal({ isOpen: true, message: 'Failed to delete trader.' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Trader Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage platform traders and their performance history.</p>
                </div>
            </div>

            <TraderList
                traders={traders}
                loading={loading}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onDelete={handleDeleteClick}
            />

            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, traderId: null })}
                onConfirm={handleDelete}
                title="Delete Trader"
                message="Are you sure you want to delete this trader? This will also remove all their performance history. This action cannot be undone."
                isDestructive={true}
            />

            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={() => setSuccessModal({ isOpen: false, message: '' })}
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
