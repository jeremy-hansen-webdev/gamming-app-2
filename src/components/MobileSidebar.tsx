// MobileSidebar.tsx
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '../entities/layoutConfit';
import { SidebarContent } from './SidebarContent';

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

interface MobileSidebarProps {
  open: boolean;
  onClose: (open: boolean) => void;
  navigation: NavItem[];
  teams: Team[];
  onGenreClick: (id: number) => void; // ✅ add this
}

export function MobileSidebar({
  open,
  onClose,
  navigation,
  teams,
  onGenreClick, // ✅ receive it
}: MobileSidebarProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
        >
          <TransitionChild>
            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="size-6 text-white" />
              </button>
            </div>
          </TransitionChild>

          {/* ✅ pass all props SidebarContent needs */}
          <SidebarContent
            navigation={navigation}
            teams={teams}
            onGenreClick={onGenreClick}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
