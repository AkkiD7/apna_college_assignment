import React from 'react';

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export const ErrorState = ({ title, description, onRetry }: ErrorStateProps) => (
  <div className="bg-surface-container-lowest border border-error/20 rounded-lg flex flex-col items-center justify-center p-12 text-center">
    <span className="material-symbols-outlined text-error text-[48px] mb-4">error</span>
    <h2 className="font-headline-lg text-on-surface mb-2">{title}</h2>
    <p className="text-body-md text-on-surface-variant max-w-md mb-8">{description}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="bg-primary text-on-primary px-6 py-2 rounded-xl font-medium hover:bg-primary-fixed transition-all duration-150 active:scale-[0.98]"
      >
        Retry
      </button>
    )}
  </div>
);
