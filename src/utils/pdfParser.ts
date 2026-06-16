import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

/**
 * Extracts text content from a PDF file.
 * @param {File} file - The PDF file to extract text from.
 * @returns {Promise<string>} - The extracted text content.
 */
export const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
        const pdfjs = await import('pdfjs-dist');
        // Set up the worker
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map(item => ('str' in item ? item.str : ''))
                .join(' ');
            fullText += pageText + '\n';
        }

        return fullText.trim();
    } catch {
        throw new Error('Failed to extract text from PDF. Please try again or paste text manually if available.');
    }
};
