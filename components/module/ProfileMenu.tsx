import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { MenuItems } from "@/types";
import SignOutButton from "./SignOutButton";

interface ProfileMenuProps {
  menuItems: MenuItems[];
  avatar?: string;
}

export default function ProfileMenu({ menuItems, avatar }: ProfileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { isAdmin } = useAuth();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={"/avatar.png" || avatar}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {menuItems.map(({ href, icon, label }) => {
          return (
            <Link key={href} href={href} className="outline-none">
              <MenuItem
                onClick={closeMenu}
                className="flex items-center gap-2 rounded"
              >
                {icon}
                <span>{label}</span>
              </MenuItem>
            </Link>
          );
        })}

        {isAdmin ? (
          <Link href="/admin/dashboard" className="outline-none">
            <MenuItem
              onClick={closeMenu}
              className="flex items-center gap-2 rounded"
            >
              <RectangleGroupIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </MenuItem>
          </Link>
        ) : null}

        <SignOutButton>
          <MenuItem>
            <p className="flex items-center gap-2 rounded">
              <PowerIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </p>
          </MenuItem>
        </SignOutButton>
      </MenuList>
    </Menu>
  );
}
