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
  const [filterGenreId, setFilterGenreId] = useState(0);
  const [search, setSearch] = useState('');

  const handleClickGenreFilter = (id: number) => {
    setFilterGenreId(id);
  };

  const handleSearchSubmit = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="bg-zinc-800">
      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={setSidebarOpen}
        navigation={navigation}
        teams={teams}
        onGenreClick={handleClickGenreFilter}
      />

      {/* Desktop sidebar */}
      <DesktopSidebar onGenreClick={handleClickGenreFilter} />

      <div className="lg:pl-72">
        {/* Top bar */}
        <Topbar
          onOpenSidebar={() => setSidebarOpen(true)}
          onSubmit={handleSearchSubmit}
        />

        {/* Main content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children ?? (
              <div>
                <GameList genreId={filterGenreId} searchValue={search} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
