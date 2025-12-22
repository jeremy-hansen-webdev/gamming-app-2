// Shared types for sidebar components

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
}

export interface Team {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

export interface SidebarContentProps {
  navigation: NavItem[];
  teams: Team[];
}

export interface GenreListProps {
  onClick: (id: number) => void;
}