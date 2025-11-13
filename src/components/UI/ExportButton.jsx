import React, { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Download, Loader2, Code } from 'lucide-react';
import { useDesign } from '../../contexts/DesignContext';

const ExportButton = () => {
    const handleExportHTML = useCallback(() => {
        const htmlContent = document.getElementById('design-canvas').outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = (designData.title || 'تصميم-اكاديمي').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `${fileName}_${Date.now()}.html`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [designData.title]);

    const handleExport = useCallback(async () => {
        setIsProcessing(true);
        setIsExporting(true); // Hide controls

        // Wait for the state to update and controls to hide
        await new Promise(resolve => setTimeout(resolve, 50)); 

        try {
            const canvasElement = document.getElementById('design-canvas');
            if (!canvasElement) {
                throw new Error("Design canvas element not found.");
            }

            // Generate the canvas image
            const canvas = await html2canvas(canvasElement, {
                scale: 3, // High resolution export
                useCORS: true, // Handle external images
                allowTaint: true,
                backgroundColor: null, // Keep background transparent if possible
            });

            // Convert canvas to image URL
            const image = canvas.toDataURL('image/png');

            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = image;
            
            // Sanitize filename
            const fileName = (designData.title || 'تصميم-اكاديمي').replace(/[^a-z0-9]/gi, '_').toLowerCase();
            link.download = `${fileName}_${Date.now()}.png`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Export failed:", error);
            alert(`فشل التصدير: ${error.message}`);
        } finally {
            setIsExporting(false); // Show controls again
            setIsProcessing(false);
        }
    }, [designData.title, setIsExporting]);

    return (
        <div className="flex gap-2">
            <button
                onClick={handleExport}
                disabled={isProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-academic-blue text-white font-semibold rounded-lg shadow-md hover:bg-academic-blue/90 transition duration-200 disabled:bg-gray-400"
            >
                {isProcessing ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        جاري التصدير...
                    </>
                ) : (
                    <>
                        <Download size={20} />
                        تصدير كصورة PNG
                    </>
                )}
            </button>
            <button
                onClick={handleExportHTML}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
                title="تصدير كملف HTML"
            >
                <Code size={20} />
                HTML
            </button>
        </div>
    );
};

export default ExportButton;
