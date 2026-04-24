interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => (
  <div className="bg-surface-container-lowest border border-error/20 rounded-lg flex flex-col items-center justify-center p-12 text-center">
    <span className="material-symbols-outlined text-error text-[48px] mb-4">error</span>
    <h2 className="font-headline-lg text-on-surface mb-2">{title}</h2>
    <p className="text-body-md text-on-surface-variant max-w-md">{description}</p>
  </div>
);
