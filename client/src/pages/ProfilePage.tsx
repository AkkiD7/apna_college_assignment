import React from 'react';
import { useAuth } from '../features/auth/AuthContext';

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto py-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Account Profile</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your account and preferences</p>
      </header>

      <section className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#2a2a2a] bg-[#161616] flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 text-[32px]">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-md text-on-surface">{user?.email.split('@')[0]}</h2>
            <p className="text-on-surface-variant text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</span>
              <p className="text-on-surface">{user?.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Account Type</span>
              <p className="text-on-surface">Standard Reviewer</p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#2a2a2a]">
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-error-container/10 border border-error/20 text-error hover:bg-error-container/20 px-6 py-2.5 rounded-xl transition-all duration-150 font-medium active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Sign Out from Account
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
        <h3 className="font-headline-md text-on-surface mb-4">Security</h3>
        <p className="text-on-surface-variant text-sm mb-6">Your password is encrypted and managed by our secure authentication service.</p>
        <button disabled className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          Change Password (Available soon)
        </button>
      </section>
    </div>
  );
};
