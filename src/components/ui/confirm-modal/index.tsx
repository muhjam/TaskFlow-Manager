import React from 'react';
import { Modal } from '../modal';
import { Button } from '../button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'error' | 'primary';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-ds-lg">
        <div className="flex gap-ds-md">
          <div className={`p-3 rounded-full h-fit flex-shrink-0 ${variant === 'error' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p className="text-body-md text-on-surface-variant pt-1 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-ds-sm">
          <Button variant="ghost" onClick={onClose} disabled={isLoading} size="sm">
            {cancelText}
          </Button>
          <Button 
            variant={variant} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            isLoading={isLoading}
            size="sm"
            className="font-bold"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
