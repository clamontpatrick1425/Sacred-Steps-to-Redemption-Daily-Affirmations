/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { getCurrentCalendarDayOfYear, getWeekByNumber } from './data/weeksData';
import { storageService, WalkStats } from './services/storageService';
import { sacredAudio } from './services/audioService';

import { MobileHeader } from './components/layout/MobileHeader';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { DailyWalkView } from './components/daily/DailyWalkView';
import { LibraryView } from './components/library/LibraryView';
import { SacredSanctuary } from './components/sanctuary/SacredSanctuary';
import { SpecialFeaturesView } from './components/features/SpecialFeaturesView';
import { JournalView } from './components/journal/JournalView';
import { RescueModal } from './components/rescue/RescueModal';
import { RestoreModal } from './components/layout/RestoreModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  const [currentDayNumber, setCurrentDayNumber] = useState<number>(() => {
    return getCurrentCalendarDayOfYear();
  });
  const [isRescueOpen, setIsRescueOpen] = useState<boolean>(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState<boolean>(false);
  const [walkStats, setWalkStats] = useState<WalkStats>(() => storageService.getWalkStats());

  useEffect(() => {
    setIsAmbientPlaying(sacredAudio.isPlaying());
    setWalkStats(storageService.getWalkStats());
  }, []);

  const handleToggleAmbient = () => {
    const newState = sacredAudio.toggleAmbient('dawn-cathedral');
    setIsAmbientPlaying(newState);
  };

  const handleToggleGraceMode = () => {
    const nextState = !walkStats.graceActive;
    storageService.setGraceMode(nextState);
    setWalkStats(storageService.getWalkStats());
    if (nextState) {
      sacredAudio.playSacredChime();
    }
  };

  const handleSelectDay = (dayNum: number) => {
    setCurrentDayNumber(dayNum);
    setActiveTab('today');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToWeekFromRescue = (weekNum: number) => {
    const week = getWeekByNumber(weekNum);
    if (week && week.days.length > 0) {
      setCurrentDayNumber(week.days[0].dayNumber);
      setActiveTab('today');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2B2B2B] flex flex-col font-sans-sacred selection:bg-[#D4AF37]/20 selection:text-[#1C2A39]">
      {/* Top Mobile/Desktop Header */}
      <MobileHeader
        onOpenRescue={() => setIsRescueOpen(true)}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
        graceActive={walkStats.graceActive}
        onToggleGraceMode={handleToggleGraceMode}
        onOpenRestore={() => setIsRestoreOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto pb-24">
        {activeTab === 'today' && (
          <DailyWalkView
            currentDayNumber={currentDayNumber}
            onSelectDay={setCurrentDayNumber}
            graceActive={walkStats.graceActive}
            onDismissGrace={() => {
              storageService.setGraceMode(false);
              setWalkStats(storageService.getWalkStats());
            }}
          />
        )}

        {activeTab === 'library' && (
          <LibraryView onSelectDay={handleSelectDay} />
        )}

        {activeTab === 'sanctuary' && (
          <SacredSanctuary />
        )}

        {activeTab === 'features' && (
          <SpecialFeaturesView />
        )}

        {activeTab === 'journal' && (
          <JournalView onSelectDay={handleSelectDay} />
        )}
      </main>

      {/* Emergency Rescue Bottom Sheet Modal (1 tap accessible) */}
      <RescueModal
        isOpen={isRescueOpen}
        onClose={() => setIsRescueOpen(false)}
        onJumpToWeek={handleJumpToWeekFromRescue}
      />

      {/* Restore Access & Data Backup Modal */}
      <RestoreModal
        isOpen={isRestoreOpen}
        onClose={() => setIsRestoreOpen(false)}
        onDataRestored={() => setWalkStats(storageService.getWalkStats())}
      />

      {/* Fixed Bottom Tab Navigation */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    </div>
  );
}
