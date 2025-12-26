// SidebarContent.tsx

import GenreList from './GenreList';
import type { GenreListProps } from './GenreList';

export function SidebarContent({ onClick }: GenreListProps) {
  return (
    <div className="relative mt-8 pt-4 rounded-2xl flex grow flex-col gap-y-5 overflow-y-auto bg-amber-400 dark:bg-zinc-900 px-6 pb-4 ring-1 ring-white/10">
      <nav className="relative flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <GenreList onClick={onClick} />
            </ul>
          </li>
          <li>
            <ul role="list" className="-mx-2 mt-2 space-y-1"></ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
