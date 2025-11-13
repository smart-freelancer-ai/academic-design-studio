import React from 'react';
import { Bold, Italic, Underline, AlignRight, AlignCenter, AlignLeft, Text, Minus, Plus } from 'lucide-react';

const FloatingToolbar = ({ position, onAction, isVisible }) => {
  if (!isVisible) return null;

  const style = {
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -120%)', // Position above the element
  };

  const buttons = [
    { icon: Bold, action: 'bold', label: 'Bold' },
    { icon: Italic, action: 'italic', label: 'Italic' },
    { icon: Underline, action: 'underline', label: 'Underline' },
    { icon: AlignRight, action: 'alignRight', label: 'Align Right' },
    { icon: AlignCenter, action: 'alignCenter', label: 'Align Center' },
    { icon: AlignLeft, action: 'alignLeft', label: 'Align Left' },
    { icon: Plus, action: 'increaseSize', label: 'Increase Size' },
    { icon: Minus, action: 'decreaseSize', label: 'Decrease Size' },
    // Add color picker later
  ];

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 flex p-1 space-x-1 rtl:space-x-reverse"
      style={style}
    >
      {buttons.map((button) => (
        <button
          key={button.action}
          onClick={() => onAction(button.action)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-150"
          title={button.label}
        >
          <button.icon size={16} />
        </button>
      ))}
    </div>
  );
};

export default FloatingToolbar;
