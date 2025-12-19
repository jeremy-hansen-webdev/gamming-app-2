// AppShell.tsx
'use client';

import { useState } from 'react';
import { navigation, teams } from '../entities/layoutConfit';
import { MobileSidebar } from './MobileSidebar';
import { DesktopSidebar } from './DesktopSidebar';
import { Topbar } from './TopBar';
import GameList from './GameList';

interface AppShellProps {
  children?: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='bg-zinc-800'>
      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={setSidebarOpen}
        navigation={navigation}
        teams={teams}
      />

      {/* Desktop sidebar */}
      <DesktopSidebar navigation={navigation} teams={teams} />

      <div className="lg:pl-72">
        {/* Top bar */}
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children ?? (
              <div>
                <GameList />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
