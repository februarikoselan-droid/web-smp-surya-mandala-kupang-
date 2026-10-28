import React, { useState } from 'react';
import { Clock, MapPin, User, Search, Calendar, ChevronRight, CheckCircle2, Info } from 'lucide-react';
import { dailyRoutineSchedule, todayActivities } from '../data/schoolData';
import { ActivityCategory, SchoolActivity } from '../types/school';

interface DailyActivitiesSectionProps {
  activities?: SchoolActivity[];
  onSelectActivity: (activity: SchoolActivity) => void;
}

export const DailyActivitiesSection: React.FC<DailyActivitiesSectionProps> = ({
  activities,
  onSelectActivity,
}) => {
  const currentActivities = activities || todayActivities;
  const [viewMode, setViewMode] = useState<'log' | 'routine'>('log');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ActivityCategory[] = [
    'Semua',
    'Akademik',
    'Laboratorium',
    'Ekstrakurikuler',
    'Karakter & Sosial',
    'Komite',
  ];

  const filteredActivities = currentActivities.filter((act) => {
    const matchesCategory =
      selectedCategory === 'Semua' || act.category === selectedCategory;
    const matchesQuery =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.leadTeacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="kegiatan" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <span>Agenda & Dinamika Pembelajaran</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Kegiatan Harian Sekolah
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Publikasi transparan seluruh kegiatan pembelajaran, apel pagi, pembinaan budi pekerti, dan ekstrakurikuler 
              yang berlangsung di lingkungan SMPS Surya Mandala, Kelurahan Oesapa, Kota Kupang.
            </p>
          </div>

          {/* View Mode Switcher: Segmented Control */}
          <div className="flex items-center p-1 bg-stone-200/80 rounded-md shrink-0">
            <button
              onClick={() => setViewMode('log')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewMode === 'log'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Log & Dokumentasi Kegiatan
            </button>
            <button
              onClick={() => setViewMode('routine')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewMode === 'routine'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Struktur Jadwal Rutin
            </button>
          </div>
        </div>

        {/* View 1: Log & Dokumentasi Kegiatan */}
        {viewMode === 'log' && (
          <div className="space-y-6">
            {/* Filter bar & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-stone-200">
              {/* Category Segmented Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Instant Search Input */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kegiatan, guru, lokasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                />
              </div>
            </div>

            {/* Activities Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((act) => {
                return (
                  <article
                    key={act.id}
                    onClick={() => onSelectActivity(act)}
                    className="cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    {act.documentationImage && (
                      <div className="relative h-44 overflow-hidden bg-stone-100 border-b border-stone-200">
                        <img
                          src={act.documentationImage}
                          alt={act.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-stone-800 text-xs px-2.5 py-1 rounded font-medium">
                          {act.category}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-xs px-2 py-0.5 rounded font-mono">
                          {act.status}
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Unboxed Metadata Line */}
                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                          <span className="font-medium text-stone-700">{act.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{act.time}</span>
                        </div>

                        <h3 className="text-base font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                          {act.title}
                        </h3>

                        <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {act.summary}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-stone-100">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span className="truncate">{act.location}</span>
                          </span>
                          <span className="shrink-0 font-medium text-stone-700">
                            {act.studentParticipantCount} Siswa
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span className="flex items-center gap-1.5 truncate">
                            <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span className="truncate">{act.leadTeacher}</span>
                          </span>
                          <span className="text-emerald-700 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Rincian <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-stone-300">
                <Info className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-700">
                  Tidak ditemukan kegiatan yang cocok dengan kriteria pencarian.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-800 underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* View 2: Jadwal Rutin Harian Sekolah */}
        {viewMode === 'routine' && (
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Jadwal Operasional Harian Sekolah (Senin – Sabtu: 07.00 – 13.00 WITA)
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Berlaku untuk seluruh jenjang kelas VII, VIII, dan IX di bawah bimbingan Kepala Sekolah & Guru.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>6 Jam Pembelajaran & Pembiasaan Karakter</span>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {dailyRoutineSchedule.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 hover:bg-stone-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-28 font-mono text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200/60 rounded px-2.5 py-1 text-center">
                      {item.timeSlot}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-0.5">
                        <span className="font-semibold text-stone-800">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-left sm:text-right text-xs text-stone-500 pl-12 sm:pl-0">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                      Penanggung Jawab
                    </span>
                    <span className="font-medium text-stone-700">{item.coordinator}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
