import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type InputBaseProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
};

interface TextInputProps extends InputBaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  leftIcon?: React.ReactNode;
}

interface DatePickerProps extends InputBaseProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  className?: string;
}

interface SelectProps extends InputBaseProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

interface ButtonSelectProps extends InputBaseProps {
  options: { label: string; value: string; variant?: 'primary' | 'error' | 'secondary' }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

interface TextAreaProps extends InputBaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("text-label-md font-bold text-on-surface-variant/80 capitalize tracking-wide block ml-xs mb-1.5", className)}>
    {children}
  </label>
);

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-error mt-1 ml-xs animate-fade-in">{children}</p>
);

export const Input = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, error, icon, leftIcon, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("w-full", containerClassName)}>
        {label && <Label>{label}</Label>}
        <div className="relative flex items-center group">
          {icon && (
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/50 group-focus-within:text-primary transition-colors">
              {icon}
            </span>
          )}
          {leftIcon && (
            <div className="absolute left-3 text-on-surface-variant/50 group-focus-within:text-primary transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-body-md shadow-sm placeholder:text-on-surface-variant/30 text-on-surface',
              (icon || leftIcon) ? 'pl-10 pr-3' : 'px-3',
              error && 'border-error focus:border-error focus:ring-error/5',
              className
            )}
            {...props}
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

export const DatePicker = React.forwardRef<any, DatePickerProps>(
  ({ className, label, error, value, onChange, placeholder, containerClassName }, ref) => {
    const dateValue = value ? new Date(value) : null;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && <Label>{label}</Label>}
        <div className="relative group">
          <ReactDatePicker
            ref={ref}
            selected={dateValue}
            onChange={(date: Date | null) => {
              if (onChange && date) {
                onChange(date.toISOString());
              }
            }}
            placeholderText={placeholder}
            className={cn(
              'w-full py-2.5 pl-10 pr-3 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-body-md shadow-sm placeholder:text-on-surface-variant/30 text-on-surface',
              error && 'border-error focus:border-error focus:ring-error/5',
              className
            )}
            dateFormat="MMM dd, yyyy"
          />
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/50 group-focus-within:text-primary transition-colors pointer-events-none" />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

export const ButtonSelect = React.forwardRef<any, ButtonSelectProps>(
  ({ className, label, error, options, value, onChange, containerClassName }, ref) => {
    return (
      <div className={cn("w-full", containerClassName)} ref={ref}>
        {label && <Label>{label}</Label>}
        <div className={cn("flex gap-ds-md", className)}>
          {options.map((opt) => {
            const isActive = value === opt.value;
            const variant = opt.variant || 'primary';
            
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange?.(opt.value)}
                className={cn(
                  "flex-1 py-2 rounded-xl border transition-all font-label-md text-label-md",
                  isActive 
                    ? variant === 'error' 
                      ? "bg-error-container border-error text-error font-bold"
                      : variant === 'secondary'
                        ? "bg-secondary-container border-secondary text-secondary font-bold"
                        : "bg-white border-primary text-primary font-bold"
                    : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, containerClassName, value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
      <div className={cn("w-full relative", containerClassName)} ref={containerRef}>
        {label && <Label>{label}</Label>}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'w-full flex items-center justify-between py-2.5 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-body-md shadow-sm font-medium text-left text-on-surface',
              error && 'border-error focus:border-error focus:ring-error/5',
              className
            )}
          >
            <span className="truncate text-on-surface">{selectedOption?.label}</span>
            <ChevronDown className={cn("h-4 w-4 text-on-surface-variant/50 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 z-[60] bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-level2 py-1 animate-fade-in">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    if (onChange) {
                      const event = {
                        target: { value: opt.value, name: props.name }
                      } as React.ChangeEvent<HTMLSelectElement>;
                      onChange(event);
                    }
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-3 py-2 text-left text-body-md hover:bg-surface-container-low transition-colors",
                    value === opt.value ? "text-primary font-bold bg-primary/5" : "text-on-surface"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Hidden select for form integration if needed */}
        <select ref={ref} value={value} onChange={onChange} className="hidden" {...props}>
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("w-full", containerClassName)}>
        {label && <Label>{label}</Label>}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-body-md shadow-sm min-h-[100px] placeholder:text-on-surface-variant/30 text-on-surface',
            error && 'border-error focus:border-error focus:ring-error/5',
            className
          )}
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Input.displayName = 'Input';
DatePicker.displayName = 'DatePicker';
ButtonSelect.displayName = 'ButtonSelect';
Select.displayName = 'Select';
TextArea.displayName = 'TextArea';
