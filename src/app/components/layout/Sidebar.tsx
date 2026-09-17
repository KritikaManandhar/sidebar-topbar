"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Waypoints,
  MapPinned,
  BedDouble,
  UserRound,
  ListChecks,
  CalendarCheck,
  BookOpen,
  Users,
  Shield,
  FileText,
  CloudSun,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation Data                                                    */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const defaultNavigation: NavSection[] = [
  {
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutGrid }],
  },
  {
    title: "MANAGE",
    items: [
      { label: "Trails", href: "/admin/trails", icon: Waypoints },
      { label: "Regions", href: "/admin/regions", icon: MapPinned },
      { label: "Hotels & Stays", href: "/admin/hotels", icon: BedDouble },
      { label: "Guides", href: "/admin/guides", icon: UserRound },
      { label: "Itineraries", href: "/admin/itineraries", icon: ListChecks },
      { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
      { label: "Stories & Community", href: "/admin/stories", icon: BookOpen },
    ],
  },
  {
    title: "USERS & SYSTEM",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Roles & Permissions", href: "/admin/roles", icon: Shield },
      { label: "Reviews & Reports", href: "/admin/reviews", icon: FileText },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Weather", href: "/admin/weather", icon: CloudSun },
      { label: "Analytics", href: "/admin/analytics", icon: LineChart },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Props                                                              */
/* ------------------------------------------------------------------ */

export type SidebarProps = {
  logoSrc?: string;
  promoImageSrc?: string;
  websiteUrl?: string;
  collapsed?: boolean;
  onCollapseToggle?: (collapsed: boolean) => void;
  navigation?: NavSection[];
  className?: string;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function Sidebar({
  logoSrc = "/images/logo.svg",
  promoImageSrc = "/images/explore-himalayas.svg",
  websiteUrl = "https://example.com",
  collapsed: externalCollapsed,
  onCollapseToggle,
  navigation = defaultNavigation,
  className = "",
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Allow controlled or uncontrolled state
  const isCollapsed = externalCollapsed ?? internalCollapsed;

  const handleToggle = () => {
    const nextState = !isCollapsed;
    setInternalCollapsed(nextState);
    onCollapseToggle?.(nextState);
  };

  return (
    <aside
      className={`flex h-screen flex-col border-r border-[#232B3B] bg-[#131926] px-3.5 pb-3 pt-4 transition-all duration-300 ${
        isCollapsed ? "w-[72px]" : "w-[248px]"
      } ${className}`}
    >
      {/* ---------------- Header ---------------- */}
      <div className="flex items-center gap-2.5 px-1 shrink-0">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={logoSrc}
            alt="The Himalayan Trail logo"
            width={36}
            height={36}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-[16px] font-bold leading-tight text-white">
              The Himalayan Trail
            </h1>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94A0B4]">
              ADMIN PANEL
            </p>
          </div>
        )}
      </div>

      {/* ---------------- Navigation ---------------- */}
      <nav className="mt-4 flex-1 overflow-y-auto pr-0.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#2C3650] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {navigation.map((section, index) => (
          <div
            key={section.title ?? `section-${index}`}
            className={index === 0 ? "" : "mt-3.5"}
          >
            {section.title && !isCollapsed && (
              <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#68758C]">
                {section.title}
              </p>
            )}

            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/admin" &&
                    (pathname === "/admin" || pathname === "/"));
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-1.5 text-[13px] transition-all ${
                        isActive
                          ? "border-[#2C3650] bg-[#1C2638] font-bold text-[#F5B921] shadow-sm"
                          : "border-transparent text-[#C3CBD9] hover:bg-white/5 hover:text-white font-medium"
                      } ${isCollapsed ? "justify-center px-0 py-2" : ""}`}
                    >
                      <Icon
                        strokeWidth={isActive ? 2 : 1.75}
                        className={`h-[17px] w-[17px] shrink-0 ${
                          isActive ? "text-[#F5B921]" : "text-[#8B97AB]"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate leading-none">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ---------------- Promo card ---------------- */}
      {!isCollapsed && (
        <div className="mt-2.5 rounded-xl border border-[#232C3E] bg-[#171E2D] p-2.5 shadow-md shrink-0">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={promoImageSrc}
              alt="Hiker on a Himalayan trail"
              width={400}
              height={220}
              className="h-[72px] w-full object-cover"
            />
          </div>

          <h2 className="mt-2 font-serif text-[13px] font-bold text-white">
            Explore The Himalayas
          </h2>

          <div className="mt-1.5 flex items-center justify-between">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-semibold text-[#F5B921] transition-opacity hover:opacity-80"
            >
              <ExternalLink className="h-[13px] w-[13px]" strokeWidth={2} />
              View Website
            </a>
            <ArrowRight className="h-3.5 w-3.5 text-[#F5B921]" strokeWidth={2} />
          </div>
        </div>
      )}

      {/* ---------------- Collapse Toggle ---------------- */}
      <div className="mt-2.5 border-t border-[#232B3B] pt-2 shrink-0">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex w-full items-center gap-2 px-2 text-[12px] font-medium text-[#C3CBD9] transition-colors hover:text-white ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-[#8B97AB]" strokeWidth={2} />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 text-[#8B97AB]" strokeWidth={2} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
