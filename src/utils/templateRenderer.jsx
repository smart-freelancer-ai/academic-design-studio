import React, { useState, useRef } from 'react';
import FloatingToolbar from '../components/Controls/FloatingToolbar';
import { useDesign } from '../contexts/DesignContext';

// هذا المكون هو مثال بسيط لكيفية تحويل كائن JSON إلى مكون React
// سيتم توسيعه لاحقاً ليشمل جميع أنواع الأقسام المطلوبة
const EditableText = ({ value, path, className, style }) => {
  const ref = useRef(null);
  const { updateDesignData } = useDesign();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const handleToolbarAction = (action) => {
    // Logic to update style based on action
    // This is a placeholder for more complex style manipulation
    console.log(`Action: ${action} on path: ${path}`);
  };

  const handleClick = () => {
    setIsEditing(true);
    setIsToolbarVisible(true);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setToolbarPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  const handleBlur = () => {
    // Delay hiding the toolbar to allow clicks on it
    setTimeout(() => {
      setIsEditing(false);
      setIsToolbarVisible(false);
    }, 100);
    updateDesignData(path, text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  if (isEditing) {
    return (
      <>
        <input
          ref={ref}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full bg-yellow-100 border border-yellow-500 p-1 rounded ${className}`}
          style={style}
          autoFocus
        />
        <FloatingToolbar
          position={toolbarPosition}
          onAction={handleToolbarAction}
          isVisible={isToolbarVisible}
        />
      </>
    );
  }

  return (
    <span
      ref={ref}
      className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${className}`}
      style={style}
      onClick={handleClick}
    >
      {value}
    </span>
  );
};
  const { updateDesignData } = useDesign();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    updateDesignData(path, text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-yellow-100 border border-yellow-500 p-1 rounded ${className}`}
        style={style}
        autoFocus
      />
    );
  }

  return (
    <span
      className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${className}`}
      style={style}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </span>
  );
};

const SectionRenderer = ({ section, path }) => {
  const { type, content, style } = section;
  const contentPath = `${path}.content`;
  const baseStyle = {
    padding: '20px',
    margin: '10px 0',
    borderRadius: '8px',
    textAlign: style.layout || 'right',
    backgroundColor: style.color || '#f8f9fa',
    color: '#212529',
  };

  switch (type) {
    case 'quote':
      return (
        <div style={{ ...baseStyle, borderRight: '5px solid #ffd700', fontStyle: 'italic' }}>
          <EditableText value={content.text} path={`${contentPath}.text`} className="text-lg" />
        </div>
      );
    case 'list':
      return (
        <div style={baseStyle}>
          <h3 className="text-xl font-bold mb-3"><EditableText value={content.text} path={`${contentPath}.text`} /></h3>
          <ul className="list-none p-0">
            {content.listItems.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <i className={`${item.icon} ml-2 text-blue-600`}></i>
                <EditableText value={item.label} path={`${contentPath}.listItems[${index}].label`} />
              </li>
            ))}
          </ul>
        </div>
      );
    case 'offer':
      return (
        <div style={{ ...baseStyle, display: 'grid', gridTemplateColumns: style.layout === 'split-2' ? '1fr 1fr' : '1fr', gap: '20px' }}>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3"><EditableText value={content.text} path={`${contentPath}.text`} /></h3>
            <ul className="list-disc pr-5">
              {content.listItems.map((item, index) => (
                <li key={index} className="mb-1"><EditableText value={item.label} path={`${contentPath}.listItems[${index}].label`} /></li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-yellow-100 text-center rounded-lg shadow border-2 border-yellow-500">
            <p className="text-2xl font-extrabold text-yellow-700"><EditableText value={content.discount} path={`${contentPath}.discount`} /></p>
          </div>
        </div>
      );
    default:
      return <div style={baseStyle}>محتوى غير مدعوم: {type}</div>;
  }
};

export const renderTemplate = (templateData) => {
  if (!templateData || !templateData.type) {
    return <div className="text-center p-10 text-gray-500">الرجاء اختيار قالب لبدء التصميم.</div>;
  }

  const { title, style, header, sections, cta } = templateData;

  const containerStyle = {
    width: '800px',
    backgroundColor: style.backgroundColor || '#ffffff',
    color: style.secondaryColor || '#212529',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    fontFamily: style.fontFamily || 'Tajawal, sans-serif',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={{ padding: '30px', textAlign: 'center', borderBottom: `2px solid ${style.primaryColor || '#ffd700'}` }}>
        <img src={header.logoUrl} alt="Logo" style={{ width: '100px', margin: '0 auto 10px auto' }} />
        <h1 style={{ color: style.primaryColor || '#ffd700', fontSize: '2.5rem', margin: 0 }}>
          <EditableText value={header.mainTitle} path="header.mainTitle" />
        </h1>
        <p className="text-lg mt-1">
          <EditableText value={header.subtitle} path="header.subtitle" />
        </p>
      </header>

      {/* Sections */}
      <main className="p-5">
        {sections && sections.map((section, index) => (
          <SectionRenderer key={index} section={section} path={`sections[${index}]`} />
        ))}
      </main>

      {/* CTA */}
      {cta && (
        <footer style={{ padding: '20px', textAlign: 'center', backgroundColor: style.primaryColor || '#ffd700', color: style.backgroundColor || '#000000' }}>
          <a href={cta.linkUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-bold no-underline">
          <EditableText value={cta.label} path="cta.label" />
        </a>
            (<EditableText value={cta.contactNumber} path="cta.contactNumber" />)
        </footer>
      )}
    </div>
  );
};
