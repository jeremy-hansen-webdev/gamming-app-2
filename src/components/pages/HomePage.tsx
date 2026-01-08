import { useState } from 'react';
import { navigation, teams } from '../../entities/layoutConfit';
import { MobileSidebar } from '../MobileSidebar';
import { DesktopSidebar } from '../DesktopSidebar';
import { Topbar } from '../TopBar';
import NavBar from '../NavBar';
import { Outlet } from 'react-router-dom';

interface AppShellProps {
  children?: React.ReactNode;
}

const HomePage = ({ children }: AppShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="bg-zinc-800">
        <NavBar />
        {/* Mobile sidebar */}
        <MobileSidebar
          open={sidebarOpen}
          onClose={setSidebarOpen}
          navigation={navigation}
          teams={teams}
        />

        {/* Desktop sidebar */}
        <DesktopSidebar />

        <div className="lg:pl-72">
          {/* Top bar */}
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

          {/* Main content */}
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children ?? (
                <div>
                  <Outlet />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
