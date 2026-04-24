interface LoadingScreenProps {
  label: string;
}

export const LoadingScreen = ({ label }: LoadingScreenProps) => (
  <div className="flex min-h-screen items-center justify-center px-6 bg-[#0a0a0a]">
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-container-high border-t-primary" />
      <div className="flex flex-col gap-2">
        <p className="font-headline-lg text-on-surface">DSA.sheet</p>
        <p className="text-body-md text-on-surface-variant">{label}</p>
      </div>
    </div>
  </div>
);
