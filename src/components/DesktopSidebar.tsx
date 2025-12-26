import { SidebarContent } from './SidebarContent';

export interface GenreFilterProp {
  onGenreClick: (id: number) => void; // ✅ fixed shape
}

export function DesktopSidebar({ onGenreClick }: GenreFilterProp) {
  // ✅ fixed name
  return (
    <div className="hidden mt-20 bg-amber-300 dark:bg-zinc-700 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
        <SidebarContent onGenreClick={onGenreClick} navigation={[]} teams={[]} /> {/* TODO: Replace [] with actual navigation and teams data */}
      </div>
    </div>
  );
}
