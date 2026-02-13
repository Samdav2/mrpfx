import ResetPasswordPage from '@/components/auth/ResetPasswordPage';
import { Suspense } from 'react';

export default function ResetPasswordRoute() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordPage />
            </Suspense>
        </main>
    );
}
