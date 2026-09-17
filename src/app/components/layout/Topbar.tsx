"use client";

import Image from "next/image";
import { Menu, Settings, Bell, Mail, ChevronDown } from "lucide-react";

export type TopbarProps = {
  userName?: string;
  userRole?: string;
  avatarSrc?: string;
  notificationsCount?: number;
  messagesCount?: number;
  onMenuClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
};

export default function Topbar({
  userName = "Admin",
  userRole = "Admin",
  avatarSrc = "/images/avatar.svg",
  notificationsCount = 8,
  messagesCount = 5,
  onMenuClick,
  onSettingsClick,
  onNotificationsClick,
  onMessagesClick,
  onProfileClick,
  className = "",
}: TopbarProps) {
  return (
    <header
      className={`flex h-16 w-full items-center justify-between border-b border-[#232B3B] bg-[#131926] px-6 ${className}`}
    >
      {/* ---------------- Left: Hamburger Menu ---------------- */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8B97AB] transition-colors hover:bg-white/5 hover:text-white"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      {/* ---------------- Right: Controls & User Profile ---------------- */}
      <div className="flex items-center gap-5">
        {/* Settings Icon */}
        <button
          type="button"
          onClick={onSettingsClick}
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8B97AB] transition-colors hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-5 w-5" strokeWidth={1.8} />
        </button>

        {/* Notifications Icon with Badge */}
        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#8B97AB] transition-colors hover:bg-white/5 hover:text-white"
        >
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          {notificationsCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5B921] px-1 text-[10px] font-bold leading-none text-[#131926]">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* Messages Icon with Badge */}
        <button
          type="button"
          onClick={onMessagesClick}
          aria-label="Messages"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#8B97AB] transition-colors hover:bg-white/5 hover:text-white"
        >
          <Mail className="h-5 w-5" strokeWidth={1.8} />
          {messagesCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5B921] px-1 text-[10px] font-bold leading-none text-[#131926]">
              {messagesCount}
            </span>
          )}
        </button>

        {/* Vertical Divider */}
        <div className="mx-1 h-6 w-[1px] bg-[#232B3B]" />

        {/* User Profile */}
        <button
          type="button"
          onClick={onProfileClick}
          className="group flex items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors hover:bg-white/5"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#232B3B] bg-[#1A2234]">
            <Image
              src={avatarSrc}
              alt={userName}
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold leading-tight text-white">
              {userName}
            </span>
            <span className="mt-0.5 text-[11px] leading-tight text-[#8B97AB]">
              {userRole}
            </span>
          </div>
          <ChevronDown
            className="ml-1 h-4 w-4 text-[#8B97AB] transition-colors group-hover:text-white"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </header>
  );
}
