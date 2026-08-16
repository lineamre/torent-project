import { Sparkles, BookOpen, BookmarkCheck, Sun } from 'lucide-react';
import { sound } from '../utils/audio';
import { haptic } from '../utils/haptics';

interface AndroidBottomNavProps {
  activeTab: 'reading' | 'explorer' | 'journal' | 'daily';
  onTabChange: (tab: 'reading' | 'explorer' | 'journal' | 'daily') => void;
  journalCount?: number;
}

export default function AndroidBottomNav({
  activeTab,
  onTabChange,
  journalCount = 0,
}: AndroidBottomNavProps) {
  const tabs = [
    {
      id: 'reading' as const,
      label: 'Divination',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'explorer' as const,
      label: 'Grimoire',
      icon: BookOpen,
      badge: '78',
    },
    {
      id: 'daily' as const,
      label: 'Daily Draw',
      icon: Sun,
      badge: 'Solar',
    },
    {
      id: 'journal' as const,
      label: 'Journal',
      icon: BookmarkCheck,
      badge: journalCount > 0 ? journalCount : null,
    },
  ];

  return (
    <nav
      id="android-bottom-navigation"
      className="w-full bg-[#120D26]/95 border-t border-white/10 backdrop-blur-2xl px-2 py-1.5 flex items-center justify-around z-40 select-none shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`android-nav-tab-${tab.id}`}
            onClick={() => {
              haptic.tick();
              sound.playDeal();
              onTabChange(tab.id);
            }}
            className="group flex flex-col items-center justify-center flex-1 py-1 px-1 focus:outline-none transition-all"
          >
            {/* Material 3 Active Pill Container */}
            <div
              className={`relative px-5 py-1 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-[#FFE600] text-[#080612] shadow-[0_0_18px_rgba(255,230,0,0.35)] scale-105'
                  : 'text-[#9D94B8] hover:text-[#F5F3FF] group-hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />

              {/* Tonal Notification Badge */}
              {tab.badge !== null && !isActive && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40">
                  {tab.badge}
                </span>
              )}
            </div>

            {/* Material 3 Label */}
            <span
              className={`text-[11px] font-sans font-medium tracking-tight mt-1 transition-colors ${
                isActive ? 'text-[#FFE600] font-bold' : 'text-[#9D94B8]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
