import React, { useState } from 'react';
import { Trophy, Award, Search, User, Calendar, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { studentAchievements } from '../data/schoolData';
import { AchievementCategory, AchievementLevel, StudentAchievement } from '../types/school';

interface AchievementsSectionProps {
  achievements?: StudentAchievement[];
  onSelectAchievement: (achievement: StudentAchievement) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onSelectAchievement,
}) => {
  const currentAchievements = achievements || studentAchievements;
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('Semua');
  const [selectedLevel, setSelectedLevel] = useState<AchievementLevel>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: AchievementCategory[] = [
    'Semua',
    'Sains & Robotika',
    'Bahasa & Debat',
    'Olahraga',
    'Karya Ilmiah',
    'Seni & Desain',
  ];

  const levels: AchievementLevel[] = ['Semua', 'Internasional', 'Nasional', 'Provinsi'];

  const filteredAchievements = currentAchievements.filter((ach) => {
    const matchesCategory =
      selectedCategory === 'Semua' || ach.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'Semua' || ach.level === selectedLevel;
    const matchesQuery =
      ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ach.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ach.studentNames.some((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      ach.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesQuery;
  });

  return (
    <section id="prestasi" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <span>Rekapitulasi Prestasi Siswa Terverifikasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Prestasi & Kejuaraan Siswa
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Dokumentasi kebanggaan pencapaian siswa SMPS Surya Mandala dalam perlombaan gerak jalan HUT RI, 
              kepramukaan penggalang, penuturan cerita rakyat NTT, dan kelulusan 100% ke jenjang menengah atas.
            </p>
          </div>

          {/* Key Quantitative Achievement Counter */}
          <div className="flex items-center gap-6 bg-stone-50 border border-stone-200 p-3 px-5 rounded-lg shrink-0">
            <div>
              <span className="text-xl font-bold text-stone-900 tabular-nums">100%</span>
              <span className="block text-[11px] text-stone-500 font-medium">Lulusan Melanjutkan</span>
            </div>
            <div className="h-8 w-px bg-stone-200" />
            <div>
              <span className="text-xl font-bold text-emerald-800 tabular-nums">Juara</span>
              <span className="block text-[11px] text-stone-500 font-medium">Tingkat Kec. & Gugus</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-3 mb-8 bg-stone-50 p-4 rounded-lg border border-stone-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Bidang:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Instant Search */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari siswa, olimpiade, pembimbing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
            </div>
          </div>

          {/* Level Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60 text-xs">
            <span className="text-stone-500 font-medium">Tingkat Kompetisi:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-emerald-800 text-white font-medium'
                    : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((ach) => (
            <article
              key={ach.id}
              onClick={() => onSelectAchievement(ach)}
              className="cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-emerald-700/50 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {ach.image && (
                <div className="relative h-44 overflow-hidden bg-stone-100 border-b border-stone-200">
                  <img
                    src={ach.image}
                    alt={ach.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded font-medium">
                    {ach.level}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs p-2 rounded shadow-xs font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="truncate">{ach.award}</span>
                  </div>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="text-emerald-800 font-semibold">{ach.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ach.dateAchieved}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {ach.title}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-100">
                  <div className="text-xs text-stone-700">
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider">
                      Nama Siswa & Kelas
                    </span>
                    <span className="font-semibold">{ach.studentNames.join(', ')}</span>
                    <span className="text-stone-500 text-[11px] block">{ach.gradeAndMajor}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span className="text-[11px] font-mono text-stone-400">
                      Ref: {ach.certificateRef}
                    </span>
                    <span className="text-emerald-700 font-medium inline-flex items-center gap-1 group-hover:underline">
                      Lihat Verifikasi <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12 bg-stone-50 rounded-lg border border-dashed border-stone-300">
            <Award className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-stone-700">
              Tidak ada data prestasi yang cocok dengan kombinasi filter Anda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSelectedLevel('Semua');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-emerald-800 underline"
            >
              Tampilkan Semua Prestasi
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
