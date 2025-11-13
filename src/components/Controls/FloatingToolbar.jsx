import React from 'react';
import { Bold, Italic, Underline, AlignRight, AlignCenter, AlignLeft, Text, Minus, Plus } from 'lucide-react';

const FloatingToolbar = ({ position, onAction, isVisible, currentStyle }) => {
  if (!isVisible) return null;

  const style = {
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -120%)', // Position above the element
  };

  const buttons = [
    { icon: Bold, action: 'bold', label: 'Bold', isActive: currentStyle.fontWeight === 'bold' },
    { icon: Italic, action: 'italic', label: 'Italic', isActive: currentStyle.fontStyle === 'italic' },
    { icon: Underline, action: 'underline', label: 'Underline', isActive: currentStyle.textDecoration === 'underline' },
    // Alignment is complex to implement without a dedicated structure, so we'll focus on text styling for now
    // { icon: AlignRight, action: 'alignRight', label: 'Align Right' },
    // { icon: AlignCenter, action: 'alignCenter', label: 'Align Center' },
    // { icon: AlignLeft, action: 'alignLeft', label: 'Align Left' },
    // Size controls will be implemented with value passing
    // { icon: Plus, action: 'increaseSize', label: 'Increase Size' },
    // { icon: Minus, action: 'decreaseSize', label: 'Decrease Size' },
    // Color Picker Placeholder
    <input
      key="color-picker"
      type="color"
      value={currentStyle.color || '#000000'}
      onChange={(e) => onAction('color', e.target.value)}
      className="w-8 h-8 p-0 border-none cursor-pointer"
      title="Color"
    />,
    // Font Size Controls
    <button
      key="size-up"
      onClick={() => onAction('size', `${parseInt(currentStyle.fontSize || '16px') + 2}px`)}
      className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-150"
      title="Increase Size"
    >
      <Plus size={16} />
    </button>,
    <button
      key="size-down"
      onClick={() => onAction('size', `${Math.max(10, parseInt(currentStyle.fontSize || '16px') - 2)}px`)}
      className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-150"
      title="Decrease Size"
    >
      <Minus size={16} />
    </button>,
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
          className={`p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-150 ${button.isActive ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`}
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
