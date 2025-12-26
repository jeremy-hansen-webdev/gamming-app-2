import GenreList from './GenreList';
import type { GenreListProps } from './GenreList';

export function Sidebar({ onClick }: GenreListProps) {
  return (
    <>
      <nav className="">
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
    </>
  );
}
