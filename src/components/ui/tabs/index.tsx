import React from 'react';
import { cn } from '../../../utils/cn';

interface TabOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex bg-surface-container rounded-ds-lg p-1 shadow-sm", className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-ds-xs px-4 py-1.5 rounded-ds-md font-label-md text-label-md transition-all duration-200",
              isActive 
                ? "bg-surface-container-lowest text-primary shadow-sm" 
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
