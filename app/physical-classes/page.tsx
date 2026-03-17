import PhysicalClassesPage from '@/components/mentorship/PhysicalClassesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Physical Classes Mentorship - MRPFX',
    description: 'Join our 1-Month Intensive Physical Trading Program and learn Forex and Synthetic Indices directly from professional traders.',
};

export default function PhysicalClassesRoute() {
    return <PhysicalClassesPage />;
}
