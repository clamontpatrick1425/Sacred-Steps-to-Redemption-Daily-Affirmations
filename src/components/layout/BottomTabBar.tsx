import React from 'react';
import { Sun, BookOpen, Waves, BookmarkCheck, BookMarked } from 'lucide-react';
import { ActiveTab } from '../../types';

interface BottomTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'today' as ActiveTab, label: 'Today', icon: Sun },
    { id: 'library' as ActiveTab, label: '52 Weeks', icon: BookOpen },
    { id: 'sanctuary' as ActiveTab, label: 'Sanctuary', icon: Waves },
    { id: 'features' as ActiveTab, label: 'Challenges', icon: BookMarked },
    { id: 'journal' as ActiveTab, label: 'Journal', icon: BookmarkCheck }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1C2A39]/95 backdrop-blur-md border-t border-[#D4AF37]/20 pb-safe shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all group ${
                isActive ? 'text-[#D4AF37]' : 'text-[#F9F6F0]/60 hover:text-[#F9F6F0]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105 stroke-[1.7]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full" />
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-1 truncate ${
                  isActive ? 'text-[#D4AF37] font-semibold' : 'text-[#F9F6F0]/70'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
