import React, { useState, useContext } from 'react';
import { useDesign } from '../../contexts/DesignContext';
import ContentLibrary from './ContentLibrary';
import DesignAnalyzer from './DesignAnalyzer';
import SmartTextEditor from './SmartTextEditor';
import { 
  analyzeContext, 
  generateSmartText, 
  getSmartSuggestions 
} from '../../utils/aiHelper';

const AIAssistant = () => {
  const { designData, updateDesignData, currentTemplate } = useDesign();
  const [activeTab, setActiveTab] = useState('assistant'); // assistant | library | analyzer | editor
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // معالجة طلبات المستخدم
  const handleUserRequest = async (request) => {
    if (!request.trim()) return;

    setIsProcessing(true);
    
    // إضافة رسالة المستخدم
    const newMessage = {
      type: 'user',
      text: request,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newMessage]);

    // تحليل الطلب
    const context = analyzeContext(currentTemplate, designData.title);
    let response = '';
    let suggestions = [];

    // تحديد نوع الطلب
    const requestLower = request.toLowerCase();
    
    if (requestLower.includes('اقترح') || requestLower.includes('نص') || requestLower.includes('suggest') || requestLower.includes('text')) {
      // طلب اقتراحات نصية
      suggestions = getSmartSuggestions(context);
      response = `💡 إليك ${suggestions.length} اقتراحات للمحتوى:`;
    } else if (requestLower.includes('إنشاء') || requestLower.includes('محتوى') || requestLower.includes('create') || requestLower.includes('generate')) {
      // إنشاء محتوى تلقائي
      const preferences = {
        style: requestLower.includes('رسمي') || requestLower.includes('formal') ? 'formal' : 'creative',
        length: requestLower.includes('طويل') || requestLower.includes('long') ? 'long' : 'medium'
      };
      const generatedText = generateSmartText(context, preferences);
      response = `✨ تم إنشاء محتوى لك:`;
      suggestions = [generatedText];
    } else if (requestLower.includes('تحليل') || requestLower.includes('analyze') || requestLower.includes('تقييم')) {
      // طلب تحليل التصميم
      response = `📊 سأقوم بتحليل تصميمك. انتقل إلى تبويب "محلل التصميم" لرؤية التفاصيل.`;
      setActiveTab('analyzer');
    } else if (requestLower.includes('مكتبة') || requestLower.includes('library') || requestLower.includes('عبارات')) {
      // فتح المكتبة
      response = `📚 فتح مكتبة المحتوى الأكاديمي لك.`;
      setActiveTab('library');
    } else {
      // رد عام
      response = `👋 أنا مساعدك الذكي! يمكنني مساعدتك في:\n\n• اقتراح نصوص أكاديمية\n• تحليل جودة التصميم\n• الوصول لمكتبة المحتوى\n• إنشاء محتوى تلقائي\n\nما الذي تريد مساعدتك فيه؟`;
    }

    // إضافة رد المساعد
    const aiResponse = {
      type: 'ai',
      text: response,
      suggestions: suggestions,
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 500);

    setUserInput('');
  };

  const handleSelectContent = (content) => {
    updateDesignData({ title: content });
    setChatHistory(prev => [...prev, {
      type: 'system',
      text: `✅ تم إضافة النص: "${content.substring(0, 50)}..."`,
      timestamp: new Date()
    }]);
  };

  const applySuggestion = (suggestion) => {
    updateDesignData({ title: suggestion });
    setChatHistory(prev => [...prev, {
      type: 'system',
      text: `✅ تم تطبيق الاقتراح`,
      timestamp: new Date()
    }]);
  };

  const quickActions = [
    { id: 'suggest', label: 'اقترح نصوص', icon: '💡', action: () => handleUserRequest('اقترح نصوص مناسبة') },
    { id: 'generate', label: 'إنشاء محتوى', icon: '✨', action: () => handleUserRequest('إنشاء محتوى تلقائي') },
    { id: 'analyze', label: 'تحليل التصميم', icon: '📊', action: () => setActiveTab('analyzer') },
    { id: 'library', label: 'فتح المكتبة', icon: '📚', action: () => setActiveTab('library') }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* شريط التبويبات */}
      <div className="flex bg-gray-50 border-b-2 border-gray-200 p-2">
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex-1 p-3 border-none bg-transparent cursor-pointer text-sm font-medium text-gray-600 rounded-md transition-all ${activeTab === 'assistant' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
        >
          🤖 المساعد الذكي
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 p-3 border-none bg-transparent cursor-pointer text-sm font-medium text-gray-600 rounded-md transition-all ${activeTab === 'library' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
        >
          📚 مكتبة المحتوى
        </button>
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex-1 p-3 border-none bg-transparent cursor-pointer text-sm font-medium text-gray-600 rounded-md transition-all ${activeTab === 'analyzer' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
        >
          📊 محلل التصميم
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 p-3 border-none bg-transparent cursor-pointer text-sm font-medium text-gray-600 rounded-md transition-all ${activeTab === 'editor' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
        >
          ✏️ محرر ذكي
        </button>
      </div>

      {/* محتوى التبويبات */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'assistant' && (
          <div className="flex-1 flex flex-col h-full">
            {/* منطقة الدردشة */}
            <div className="flex-1 overflow-y-auto p-4">
              {chatHistory.length === 0 ? (
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">🤖</div>
                  <h3 className="m-0 mb-2 text-xl text-gray-800">مرحباً بك في المساعد الذكي</h3>
                  <p className="m-0 mb-8 text-sm text-gray-600">
                    أنا هنا لمساعدتك في إنشاء تصاميم أكاديمية متميزة!
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    {quickActions.map(action => (
                      <button
                        key={action.id}
                        onClick={action.action}
                        className="flex flex-col items-center gap-2 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:translate-y-[-2px] hover:shadow-lg"
                      >
                        <span className="text-3xl">{action.icon}</span>
                        <span className="text-sm text-gray-800 font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg max-w-[85%] ${message.type === 'user' ? 'self-end bg-blue-500 text-white ml-auto' : message.type === 'ai' ? 'self-start bg-gray-100 border border-gray-200' : 'self-center bg-green-50 border border-green-300 text-green-800 text-sm text-center'}`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.text.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-col gap-2 mt-3">
                          {message.suggestions.map((sugg, i) => (
                            <button
                              key={i}
                              onClick={() => applySuggestion(sugg)}
                              className="p-2 bg-white border border-blue-500 rounded-md cursor-pointer text-sm text-right text-gray-800 transition-all hover:bg-blue-500 hover:text-white"
                            >
                              {sugg}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="self-start bg-gray-100 border border-gray-200">
                      <div className="flex gap-1 p-2">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* شريط الإدخال */}
            <div className="flex gap-2 p-4 border-t-2 border-gray-200 bg-gray-50">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserRequest(userInput)}
                placeholder="اسألني أي شيء... 💬"
                className="flex-1 p-3 border-2 border-gray-300 rounded-full text-sm outline-none transition-colors focus:border-blue-500"
                disabled={isProcessing}
              />
              <button
                onClick={() => handleUserRequest(userInput)}
                className="w-12 h-12 rounded-full border-none bg-blue-500 text-white text-xl cursor-pointer transition-all hover:bg-blue-600 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isProcessing || !userInput.trim()}
              >
                🚀
              </button>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <ContentLibrary 
            onSelectContent={handleSelectContent}
            currentCategory={analyzeContext(currentTemplate).category}
          />
        )}

        {activeTab === 'analyzer' && (
          <DesignAnalyzer
            designData={{
              colors: designData.colors || {},
              fonts: designData.fonts || {},
              content: { title: designData.title || '' }
            }}
          />
        )}

        {activeTab === 'editor' && (
          <div className="p-4 overflow-y-auto">
            <h3 className="m-0 mb-2 text-lg text-gray-800">✏️ محرر النصوص الذكي</h3>
            <p className="m-0 mb-4 text-sm text-gray-600">
              يوفر المحرر اقتراحات ذكية وتحليل جودة النص تلقائياً
            </p>
            <SmartTextEditor
              value={designData.title || ''}
              onChange={(newValue) => updateDesignData({ title: newValue })}
              placeholder="ابدأ بكتابة محتوى التصميم..."
              currentTemplate={currentTemplate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;

