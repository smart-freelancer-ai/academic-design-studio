import React, { useState } from 'react';
import { useDesign } from '../../contexts/DesignContext';
import { generateContent } from '../../api/ai';
import { Wand2, Loader2 } from 'lucide-react';

const AIGenerator = () => {
    const { setDesignData } = useDesign();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("الرجاء إدخال وصف للمحتوى الأكاديمي المطلوب.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Call the AI API to generate structured content
            const generatedData = await generateContent(prompt);

            if (generatedData.error) {
                setError(`خطأ في التوليد: ${generatedData.error}`);
            } else {
                // The generated data is the new design data (JSON structure)
                setDesignData(generatedData);
                setPrompt(''); // Clear prompt on success
            }
        } catch (err) {
            setError("حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 border border-academic-purple/20 rounded-lg bg-academic-purple/5 mb-6">
            <h4 className="text-md font-bold text-academic-purple mb-3 flex items-center gap-2">
                <Wand2 size={18} />
                توليد المحتوى بالذكاء الاصطناعي
            </h4>
            
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-academic-purple focus:border-academic-purple"
                rows="3"
                placeholder="صف المحتوى الأكاديمي المطلوب (مثال: إعلان عن مؤتمر دولي حول الذكاء الاصطناعي في دبي)."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
            />
            
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-academic-purple text-white font-semibold rounded-md hover:bg-academic-purple/90 transition duration-200 disabled:bg-gray-400"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        جاري التوليد...
                    </>
                ) : (
                    <>
                        <Wand2 size={18} />
                        توليد المحتوى
                    </>
                )}
            </button>

            {error && (
                <p className="mt-3 text-sm text-red-600 bg-red-100 p-2 rounded-md">
                    {error}
                </p>
            )}
        </div>
    );
};

export default AIGenerator;
