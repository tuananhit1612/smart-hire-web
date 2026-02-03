// @ts-ignore
import { toPng } from 'html-to-image';
// @ts-ignore
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, fileName: string = 'cv-document.pdf'): Promise<boolean> => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        alert("Không tìm thấy nội dung CV để xuất!");
        return false;
    }

    try {
        console.log(`Starting export for ${elementId}...`);

        // 1. Create a temporary container for the clone
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '-10000px';
        container.style.left = '0';
        container.style.width = '210mm'; // Force A4 width context
        // Ensure white background for the container
        container.style.backgroundColor = '#ffffff';
        container.style.zIndex = '-1000';
        document.body.appendChild(container);

        // 2. Clone the element
        const clone = element.cloneNode(true) as HTMLElement;
        // Reset any potential transforms or margins that might break capture
        clone.style.transform = 'none';
        clone.style.margin = '0';
        clone.style.boxShadow = 'none';
        // Force text color to simple RGB if needed, or rely on html-to-image handling it

        container.appendChild(clone);

        // 3. Wait a bit for the DOM to settle (images, fonts)
        await new Promise(resolve => setTimeout(resolve, 500));

        // 4. Capture using html-to-image
        const dataUrl = await toPng(clone, {
            quality: 1.0,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
            cacheBust: true,
        });

        // 5. Cleanup
        document.body.removeChild(container);

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210;
        const pageHeight = 297;

        // Calculate Image Height based on ratio
        // We need to know the original size. 
        // We can get it from the container before removing, or load the image to check.
        // Loading image is safer to get exact captured ratio.
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(fileName);
        console.log("Export success!");
        return true;
    } catch (error) {
        console.error('PDF Export failed:', error);
        return false;
    }
};
