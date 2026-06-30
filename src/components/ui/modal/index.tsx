import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Button } from '../button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={cn(
          "relative w-full max-w-lg bg-surface-container-lowest md:rounded-3xl rounded-t-3xl shadow-2xl p-ds-xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in flex flex-col border-t md:border border-outline-variant/20",
          className
        )}
      >
        {/* Handle for mobile */}
        <div className="w-12 h-1 bg-outline-variant/30 rounded-full mx-auto mb-ds-lg md:hidden flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between mb-ds-xl flex-shrink-0">
          {title && <h2 className="text-display-lg text-on-surface font-bold">{title}</h2>}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="w-8 h-8 p-0 rounded-full text-on-surface-variant hover:bg-surface-container-low"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
