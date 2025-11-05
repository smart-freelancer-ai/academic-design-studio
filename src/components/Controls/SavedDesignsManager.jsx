import React, { useState, useEffect } from 'react';
import { useDesign } from '../../contexts/DesignContext';
import { Trash2, Download, Eye } from 'lucide-react';

const SavedDesignsManager = () => {
  const { getSavedDesigns, loadDesign, saveDesign } = useDesign();
  const [designs, setDesigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshDesigns = () => {
    setDesigns(getSavedDesigns());
  };

  useEffect(() => {
    refreshDesigns();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التصميم؟')) {
      const updatedDesigns = designs.filter(d => d.id !== id);
      localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns));
      setDesigns(updatedDesigns);
    }
  };

  const handleLoad = (id) => {
    loadDesign(id);
    setIsModalOpen(false);
  };

  const handleExport = (design) => {
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `${design.name.replace(/\s/g, '-')}-${design.id}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <>
      <button
        onClick={() => {
          saveDesign();
          refreshDesigns();
        }}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 shadow-md mb-3"
      >
        حفظ التصميم الحالي
      </button>

      <button
        onClick={() => {
          refreshDesigns();
          setIsModalOpen(true);
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 shadow-md"
      >
        إدارة التصاميم المحفوظة ({designs.length})
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">التصاميم المحفوظة</h2>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {designs.length === 0 ? (
                <p className="text-gray-500 text-center py-10">لا توجد تصاميم محفوظة بعد.</p>
              ) : (
                designs.map((design) => (
                  <div key={design.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{design.name}</p>
                      <p className="text-sm text-gray-500">تم الحفظ: {new Date(design.timestamp).toLocaleDateString('ar-EG')}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleLoad(design.id)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                        title="تحميل"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleExport(design)}
                        className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                        title="تصدير (JSON)"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(design.id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-150"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedDesignsManager;
