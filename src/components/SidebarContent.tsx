// SidebarContent.tsx
import GenreList from './GenreList';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
}

interface Team {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

type SidebarContentProps = {
  navigation: NavItem[];
  teams: Team[];
  onGenreClick: (id: number) => void;
};

export function SidebarContent({ onGenreClick }: SidebarContentProps) {
  return (
    <div className="relative mt-8 pt-4 rounded-2xl flex grow flex-col gap-y-5 overflow-y-auto bg-amber-400 dark:bg-zinc-900 px-6 pb-4 ring-1 ring-white/10">
      <nav className="relative flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {/* ✅ pass the click handler to GenreList */}
              <GenreList onClick={onGenreClick} />
            </ul>
          </li>

          <li>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {/* If you want, map navigation/teams here later */}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
