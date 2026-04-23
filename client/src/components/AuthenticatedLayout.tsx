import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { useTracker } from '../features/tracker/TrackerContext';

export const AuthenticatedLayout = () => {
  const { logout } = useAuth();
  const { searchQuery, setSearchQuery } = useTracker();
  const location = useLocation();

  const isTopicsPage = location.pathname === '/topics';

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'Overview';
    if (path === '/topics') return 'Topics';
    if (path === '/progress') return 'Progress';
    if (path === '/profile') return 'Profile';
    return '';
  };

  return (
    <div className="flex h-screen overflow-hidden selection-primary">
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full w-[240px] border-r border-[#2a2a2a] bg-[#0f0f0f] flex flex-col justify-between py-6 z-50">
        <div>
          {/* Brand */}
          <div className="px-6 mb-8 flex items-center gap-element-gap text-indigo-500 font-bold text-xl tracking-tight">
            <span className="material-symbols-outlined text-indigo-500">code</span>
            <span>DSA Tracker</span>
            <span className="text-xs text-on-surface-variant font-normal ml-2">v1.0.4</span>
          </div>
          {/* Nav Links */}
          <ul className="flex flex-col gap-1 font-['Inter'] text-sm font-medium">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 pl-4 py-3 transition-all duration-150 ${isActive
                    ? 'text-indigo-500 border-l-2 border-indigo-500 bg-[#161616]'
                    : 'text-neutral-400 hover:bg-[#161616] hover:text-neutral-100'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/topics"
                className={({ isActive }) =>
                  `flex items-center gap-3 pl-4 py-3 transition-all duration-150 ${isActive
                    ? 'text-indigo-500 border-l-2 border-indigo-500 bg-[#161616]'
                    : 'text-neutral-400 hover:bg-[#161616] hover:text-neutral-100'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">list_alt</span>
                Topics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/progress"
                className={({ isActive }) =>
                  `flex items-center gap-3 pl-4 py-3 transition-all duration-150 ${isActive
                    ? 'text-indigo-500 border-l-2 border-indigo-500 bg-[#161616]'
                    : 'text-neutral-400 hover:bg-[#161616] hover:text-neutral-100'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                Progress
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Footer info */}
        <div className="px-2 pb-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 pl-4 py-3 transition-all duration-150 rounded-md mx-2 ${isActive
                ? 'text-indigo-500 bg-[#161616] border border-indigo-500/30'
                : 'text-neutral-400 hover:bg-[#161616] hover:text-neutral-100'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span className="font-medium">Profile</span>
          </NavLink>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="ml-[240px] flex-1 flex flex-col h-full bg-[#0a0a0a] overflow-y-auto">
        {/* TopAppBar */}
        <header className="sticky top-0 right-0 left-[240px] h-14 border-b border-[#2a2a2a] bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center justify-between px-8 z-40 shrink-0">
          <div className="flex items-center gap-8">
            <h1 className="font-headline-lg text-on-surface">{getPageTitle()}</h1>
            {isTopicsPage && (
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-[18px]">search</span>
                <input
                  className="bg-[#161616] border border-[#2a2a2a] text-neutral-200 text-sm rounded-md pl-9 pr-4 py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-150 w-64 placeholder:text-neutral-600"
                  placeholder="Search problems..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-element-gap">
            {/* Icons removed as per request */}
          </div>
        </header>

        <div className="p-8 max-w-[1200px] w-full mx-auto flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
