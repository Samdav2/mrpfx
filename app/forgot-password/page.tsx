import ForgotPasswordPage from '@/components/auth/ForgotPasswordPage';
import { Suspense } from 'react';

export default function ForgotPasswordRoute() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ForgotPasswordPage />
            </Suspense>
        </main>
    );
}
