/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailyActivitiesSection } from './components/DailyActivitiesSection';
import { AchievementsSection } from './components/AchievementsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AlumniSection } from './components/AlumniSection';
import { TransparencyHubSection } from './components/TransparencyHubSection';
import { DetailModal } from './components/DetailModal';
import { PPDBModal } from './components/PPDBModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import {
  SchoolActivity,
  StudentAchievement,
  SchoolFacility,
  SchoolProgram
} from './types/school';
import {
  schoolGeneralInfo,
  todayActivities,
  studentAchievements,
  schoolFacilities,
  initialAlumniList,
  budgetAllocations,
  initialAspirasiList
} from './data/schoolData';
import { api, SchoolContentState } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('kegiatan');
  const [isPPDBOpen, setIsPPDBOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Live dynamic state synced with backend Express server
  const [content, setContent] = useState<SchoolContentState>({
    generalInfo: schoolGeneralInfo,
    todayActivities: todayActivities,
    studentAchievements: studentAchievements,
    schoolFacilities: schoolFacilities,
    alumniList: initialAlumniList,
    budgetAllocations: budgetAllocations,
    aspirasiList: initialAspirasiList
  });

  // Fetch live content from backend on mount
  const fetchLiveContent = async () => {
    try {
      const data = await api.getContent();
      if (data && data.generalInfo) {
        setContent(data);
      }
    } catch (err) {
      console.log('Using local fallback state, server initializing...');
    }
  };

  useEffect(() => {
    fetchLiveContent();
  }, []);

  // Modal State for inspecting items
  const [selectedItem, setSelectedItem] = useState<
    SchoolActivity | StudentAchievement | SchoolFacility | SchoolProgram | null
  >(null);
  const [modalType, setModalType] = useState<
    'activity' | 'achievement' | 'facility' | 'program' | null
  >(null);

  const handleOpenDetail = (
    item: SchoolActivity | StudentAchievement | SchoolFacility | SchoolProgram,
    type: 'activity' | 'achievement' | 'facility' | 'program'
  ) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPPDB={() => setIsPPDBOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section: Live profile of SMPS Surya Mandala Kupang, NTT */}
        <HeroSection
          generalInfo={content.generalInfo}
          onExploreActivities={() => scrollToSection('kegiatan')}
          onExploreAlumni={() => scrollToSection('alumni')}
          onExploreTransparency={() => scrollToSection('transparansi')}
          onOpenPPDB={() => setIsPPDBOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 1. Kegiatan Harian: Dynamic activities from backend */}
        <DailyActivitiesSection
          activities={content.todayActivities}
          onSelectActivity={(act) => handleOpenDetail(act, 'activity')}
        />

        {/* 2. Prestasi Siswa: Dynamic achievements from backend */}
        <AchievementsSection
          achievements={content.studentAchievements}
          onSelectAchievement={(ach) => handleOpenDetail(ach, 'achievement')}
        />

        {/* 3. Fasilitas: Dynamic facilities from backend */}
        <FacilitiesSection
          facilities={content.schoolFacilities}
          onSelectFacility={(fac) => handleOpenDetail(fac, 'facility')}
        />

        {/* 4. Fitur Menjaring Alumni: Dynamic alumni tracer synced with backend */}
        <AlumniSection
          alumniData={content.alumniList}
          onAlumniRegistered={fetchLiveContent}
        />

        {/* 5. Pusat Transparansi: Dynamic budget & inquiries from backend */}
        <TransparencyHubSection
          budgetData={content.budgetAllocations}
          aspirasiData={content.aspirasiList}
          onInquirySubmitted={fetchLiveContent}
        />
      </main>

      {/* Official Footer with Complete School Legalities & Admin Link */}
      <Footer
        generalInfo={content.generalInfo}
        onOpenPPDB={() => setIsPPDBOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Item Detail Inspection Modal */}
      <DetailModal
        item={selectedItem}
        type={modalType}
        onClose={handleCloseDetail}
      />

      {/* Pendaftaran Murid Baru Modal */}
      <PPDBModal
        isOpen={isPPDBOpen}
        onClose={() => setIsPPDBOpen(false)}
      />

      {/* Full-featured Admin & Operator Panel for Content Management */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        content={content}
        onContentUpdated={(updated) => setContent(updated)}
      />
    </div>
  );
}
