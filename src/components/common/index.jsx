import React from 'react';

/**
 * Reusable Button component with different variants
 * Supports primary, secondary, and danger variants
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  // Define button styles based on variant
  const baseStyles = 'px-4 py-2 rounded-xl font-medium transition-colors duration-200';
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark disabled:bg-gray-400',
    secondary:
      'bg-gray-200 text-text-primary hover:bg-gray-300 disabled:bg-gray-300',
    danger: 'bg-danger text-white hover:bg-red-700 disabled:bg-gray-400',
  };

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidthStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Loading spinner component for async operations
 */
export function Loader({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-4 border-border border-t-primary animate-spin`} />
    </div>
  );
}

/**
 * Confirmation Modal for delete actions
 */
export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isDangerous = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl shadow-lg p-6 max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant={isDangerous ? 'danger' : 'primary'}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Text input component with label and error handling
 */
export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-danger focus:ring-danger'
            : 'border-border focus:ring-primary'
        } disabled:bg-gray-100`}
        {...props}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
}

/**
 * Card component for consistent styling of content blocks
 */
export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-surface border border-border rounded-xl shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Badge component for status/tag display
 */
export function Badge({ children, variant = 'default', className = '' }) {
  const variantStyles = {
    default: 'bg-gray-100 text-text-primary',
    success: 'bg-green-100 text-success',
    warning: 'bg-yellow-100 text-warning',
    danger: 'bg-red-100 text-danger',
    primary: 'bg-blue-100 text-primary',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Empty state component for when no data exists
 */
export function EmptyState({ title, description, icon = '📭' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}
