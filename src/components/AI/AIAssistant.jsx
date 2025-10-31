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
    <div style={styles.container}>
      {/* شريط التبويبات */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('assistant')}
          style={{
            ...styles.tab,
            ...(activeTab === 'assistant' ? styles.tabActive : {})
          }}
        >
          🤖 المساعد الذكي
        </button>
        <button
          onClick={() => setActiveTab('library')}
          style={{
            ...styles.tab,
            ...(activeTab === 'library' ? styles.tabActive : {})
          }}
        >
          📚 مكتبة المحتوى
        </button>
        <button
          onClick={() => setActiveTab('analyzer')}
          style={{
            ...styles.tab,
            ...(activeTab === 'analyzer' ? styles.tabActive : {})
          }}
        >
          📊 محلل التصميم
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          style={{
            ...styles.tab,
            ...(activeTab === 'editor' ? styles.tabActive : {})
          }}
        >
          ✏️ محرر ذكي
        </button>
      </div>

      {/* محتوى التبويبات */}
      <div style={styles.content}>
        {activeTab === 'assistant' && (
          <div style={styles.assistantPanel}>
            {/* منطقة الدردشة */}
            <div style={styles.chatArea}>
              {chatHistory.length === 0 ? (
                <div style={styles.welcomeMessage}>
                  <div style={styles.welcomeIcon}>🤖</div>
                  <h3 style={styles.welcomeTitle}>مرحباً بك في المساعد الذكي</h3>
                  <p style={styles.welcomeText}>
                    أنا هنا لمساعدتك في إنشاء تصاميم أكاديمية متميزة!
                  </p>
                  <div style={styles.quickActionsGrid}>
                    {quickActions.map(action => (
                      <button
                        key={action.id}
                        onClick={action.action}
                        style={styles.quickActionBtn}
                      >
                        <span style={styles.quickActionIcon}>{action.icon}</span>
                        <span style={styles.quickActionLabel}>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={styles.chatMessages}>
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.message,
                        ...(message.type === 'user' ? styles.messageUser : 
                            message.type === 'ai' ? styles.messageAI : 
                            styles.messageSystem)
                      }}
                    >
                      <div style={styles.messageText}>
                        {message.text.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div style={styles.suggestions}>
                          {message.suggestions.map((sugg, i) => (
                            <button
                              key={i}
                              onClick={() => applySuggestion(sugg)}
                              style={styles.suggestionBtn}
                            >
                              {sugg}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isProcessing && (
                    <div style={styles.messageAI}>
                      <div style={styles.typingIndicator}>
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* شريط الإدخال */}
            <div style={styles.inputArea}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserRequest(userInput)}
                placeholder="اسألني أي شيء... 💬"
                style={styles.input}
                disabled={isProcessing}
              />
              <button
                onClick={() => handleUserRequest(userInput)}
                style={styles.sendBtn}
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
          <div style={styles.editorPanel}>
            <h3 style={styles.editorTitle}>✏️ محرر النصوص الذكي</h3>
            <p style={styles.editorHint}>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tabs: {
    display: 'flex',
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
    padding: '0.5rem',
    gap: '0.5rem'
  },
  tab: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#6c757d',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  tabActive: {
    backgroundColor: '#3498db',
    color: 'white',
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  assistantPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem'
  },
  welcomeMessage: {
    textAlign: 'center',
    padding: '2rem 1rem'
  },
  welcomeIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  welcomeTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem',
    color: '#2c3e50'
  },
  welcomeText: {
    margin: '0 0 2rem 0',
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    maxWidth: '400px',
    margin: '0 auto'
  },
  quickActionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '/*:hover*/': {
      borderColor: '#3498db',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  },
  quickActionIcon: {
    fontSize: '2rem'
  },
  quickActionLabel: {
    fontSize: '0.85rem',
    color: '#2c3e50',
    fontWeight: '500'
  },
  chatMessages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  message: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    maxWidth: '85%'
  },
  messageUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    color: 'white',
    marginLeft: 'auto'
  },
  messageAI: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6'
  },
  messageSystem: {
    alignSelf: 'center',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    color: '#155724',
    fontSize: '0.85rem',
    textAlign: 'center'
  },
  messageText: {
    fontSize: '0.9rem',
    lineHeight: '1.5'
  },
  suggestions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '0.75rem'
  },
  suggestionBtn: {
    padding: '0.5rem 0.75rem',
    backgroundColor: 'white',
    border: '1px solid #3498db',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    textAlign: 'right',
    color: '#2c3e50',
    transition: 'all 0.2s',
    '/*:hover*/': {
      backgroundColor: '#3498db',
      color: 'white'
    }
  },
  typingIndicator: {
    display: 'flex',
    gap: '0.25rem',
    padding: '0.5rem'
  },
  inputArea: {
    display: 'flex',
    gap: '0.5rem',
    padding: '1rem',
    borderTop: '2px solid #e9ecef',
    backgroundColor: '#f8f9fa'
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '2px solid #dee2e6',
    borderRadius: '20px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    '/*:focus*/': {
      borderColor: '#3498db'
    }
  },
  sendBtn: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '/*:hover*/': {
      backgroundColor: '#2980b9',
      transform: 'scale(1.05)'
    },
    '/*:disabled*/': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed'
    }
  },
  editorPanel: {
    padding: '1rem',
    overflowY: 'auto'
  },
  editorTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    color: '#2c3e50'
  },
  editorHint: {
    margin: '0 0 1rem 0',
    fontSize: '0.85rem',
    color: '#6c757d'
  }
};

export default AIAssistant;

