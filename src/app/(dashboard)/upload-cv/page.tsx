import { Metadata } from 'next';
import { UploadCVPage } from '@/features/upload-cv';

export const metadata: Metadata = {
    title: 'Tải lên CV | SmartHire',
    description: 'Tải lên CV của bạn để AI phân tích và tìm kiếm công việc phù hợp nhất',
};

export default function UploadCVRoute() {
    return <UploadCVPage />;
}
