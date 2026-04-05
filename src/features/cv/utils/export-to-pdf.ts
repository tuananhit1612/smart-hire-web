// @ts-ignore
import { toJpeg } from 'html-to-image';
// @ts-ignore
import jsPDF from 'jspdf';
import { getTemplateManifest } from '../components/cv-templates';

// ---------------------------------------------------------------------------
// PDF Export — renders a CV preview element into an A4 PDF
// ---------------------------------------------------------------------------

export interface ExportOptions {
    /** DOM element id of the CV preview wrapper */
    elementId: string;
    /** Desired file name (defaults to 'cv-document.pdf') */
    fileName?: string;
    /** Template slug – used to look up manifest page dimensions */
    templateId?: string;
    /** Image quality passed to html-to-image (0 – 1, default 1) */
    quality?: number;
    /** Device pixel ratio for hi-DPI captures (default 3) */
    pixelRatio?: number;
    /** Progress callback — receives a stage label + percentage (0–100) */
    onProgress?: (stage: string, percent: number) => void;
    /** If true, returns the PDF Blob instead of triggering browser download */
    returnBlob?: boolean;
}

export const exportToPDF = async (
    elementIdOrOptions: string | ExportOptions,
    fileNameLegacy: string = 'cv-document.pdf',
): Promise<Blob | boolean> => {
    // Support both legacy (elementId, fileName) and new options-object signatures
    const opts: ExportOptions =
        typeof elementIdOrOptions === 'string'
            ? { elementId: elementIdOrOptions, fileName: fileNameLegacy }
            : elementIdOrOptions;

    const {
        elementId,
        fileName = 'cv-document.pdf',
        templateId,
        quality = 0.85,
        pixelRatio = 2,
        onProgress,
    } = opts;

    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`[PDF Export] Element #${elementId} not found`);
        alert('Không tìm thấy nội dung CV để xuất!');
        return false;
    }

    // Resolve page size from TemplateManifest (fallback: A4)
    const manifest = templateId ? getTemplateManifest(templateId) : undefined;
    const pageWidthMm = manifest?.pageSize.widthMm ?? 210;
    const pageHeightMm = manifest?.pageSize.heightMm ?? 297;

    // Offscreen container for a clean capture
    let container: HTMLDivElement | null = null;

    try {
        console.log(`[PDF Export] Starting — elementId="${elementId}", template="${templateId ?? 'default'}"`);
        onProgress?.('Đang chuẩn bị...', 10);

        // 1. Create offscreen container
        container = document.createElement('div');
        Object.assign(container.style, {
            position: 'absolute',
            top: '-10000px',
            left: '0',
            width: `${pageWidthMm}mm`,
            backgroundColor: '#ffffff',
            zIndex: '-1000',
        });
        document.body.appendChild(container);

        // 2. Clone element — strip transform/shadow that break capture
        const clone = element.cloneNode(true) as HTMLElement;
        Object.assign(clone.style, {
            transform: 'none',
            margin: '0',
            boxShadow: 'none',
        });
        container.appendChild(clone);
        onProgress?.('Đang sao chép nội dung...', 25);

        // 3. Wait for fonts / images to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        // 4. Capture to JPEG via html-to-image to keep file size small (e.g. < 2MB)
        onProgress?.('Đang chụp ảnh CV...', 40);
        const dataUrl = await toJpeg(clone, {
            quality,
            pixelRatio,
            backgroundColor: '#ffffff',
            cacheBust: true,
        });
        onProgress?.('Đang tạo PDF...', 70);

        // 5. Build PDF with correct page dimensions
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pageWidthMm, pageHeightMm],
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const imgHeight = (imgProps.height * pageWidthMm) / imgProps.width;

        let heightLeft = imgHeight;
        let yOffset = 0;

        // First page
        pdf.addImage(dataUrl, 'JPEG', 0, yOffset, pageWidthMm, imgHeight);
        heightLeft -= pageHeightMm;

        // Additional pages (if CV is taller than one page)
        while (heightLeft > 0) {
            yOffset = -(imgHeight - heightLeft);
            pdf.addPage();
            pdf.addImage(dataUrl, 'JPEG', 0, yOffset, pageWidthMm, imgHeight);
            heightLeft -= pageHeightMm;
        }

        if (opts.returnBlob) {
            onProgress?.('Đang tạo dữ liệu tải lên...', 90);
            const blob = pdf.output('blob');
            onProgress?.('Hoàn tất!', 100);
            return blob;
        } else {
            onProgress?.('Đang tải file xuống...', 90);
            pdf.save(fileName);
            onProgress?.('Hoàn tất!', 100);
            return true;
        }
    } catch (error) {
        console.error('[PDF Export] Failed:', error);
        return false;
    } finally {
        // Always clean up the offscreen container
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }
};
