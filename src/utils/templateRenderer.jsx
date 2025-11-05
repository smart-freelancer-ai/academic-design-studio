import React from 'react';

// هذا المكون هو مثال بسيط لكيفية تحويل كائن JSON إلى مكون React
// سيتم توسيعه لاحقاً ليشمل جميع أنواع الأقسام المطلوبة
const SectionRenderer = ({ section }) => {
  const { type, content, style } = section;
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
          <p className="text-lg">{content.text}</p>
        </div>
      );
    case 'list':
      return (
        <div style={baseStyle}>
          <h3 className="text-xl font-bold mb-3">{content.text}</h3>
          <ul className="list-none p-0">
            {content.listItems.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <i className={`${item.icon} ml-2 text-blue-600`}></i>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'offer':
      return (
        <div style={{ ...baseStyle, display: 'grid', gridTemplateColumns: style.layout === 'split-2' ? '1fr 1fr' : '1fr', gap: '20px' }}>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">{content.text}</h3>
            <ul className="list-disc pr-5">
              {content.listItems.map((item, index) => (
                <li key={index} className="mb-1">{item.label}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-yellow-100 text-center rounded-lg shadow border-2 border-yellow-500">
            <p className="text-2xl font-extrabold text-yellow-700">{content.discount}</p>
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
        <h1 style={{ color: style.primaryColor || '#ffd700', fontSize: '2.5rem', margin: 0 }}>{header.mainTitle}</h1>
        <p className="text-lg mt-1">{header.subtitle}</p>
      </header>

      {/* Sections */}
      <main className="p-5">
        {sections && sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </main>

      {/* CTA */}
      {cta && (
        <footer style={{ padding: '20px', textAlign: 'center', backgroundColor: style.primaryColor || '#ffd700', color: style.backgroundColor || '#000000' }}>
          <a href={cta.linkUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-bold no-underline">
            {cta.label} ({cta.contactNumber})
          </a>
        </footer>
      )}
    </div>
  );
};
