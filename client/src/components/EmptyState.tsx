interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="surface-muted flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
    <p className="font-display text-2xl text-ink">{title}</p>
    <p className="mt-3 max-w-md text-sm text-slate-600">{description}</p>
  </div>
);

