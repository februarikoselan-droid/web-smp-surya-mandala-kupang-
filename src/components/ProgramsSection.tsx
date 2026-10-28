import React from 'react';
import { BookOpen, GraduationCap, Compass, Globe, Sparkles, ChevronRight, Check } from 'lucide-react';
import { schoolPrograms } from '../data/schoolData';
import { SchoolProgram } from '../types/school';

interface ProgramsSectionProps {
  onSelectProgram: (program: SchoolProgram) => void;
  onOpenPPDB: () => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectProgram,
  onOpenPPDB,
}) => {
  return (
    <section id="program" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <span>Kurikulum Unggulan & Pengembangan Siswa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Program Pendidikan & Jalur Keunggulan
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Kurikulum terintegrasi yang memadukan kedalaman saintifik, kemahiran bilingual global, 
              jiwa kewirausahaan hijau, dan penanaman budi pekerti luhur.
            </p>
          </div>

          <button
            onClick={onOpenPPDB}
            className="px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-800/40 rounded-md hover:bg-emerald-50 transition-colors shrink-0"
          >
            Konsultasi Jalur Peminatan
          </button>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schoolPrograms.map((prog, idx) => (
            <article
              key={prog.id}
              onClick={() => onSelectProgram(prog)}
              className="cursor-pointer bg-stone-50/70 rounded-lg border border-stone-200 hover:border-emerald-700/60 hover:bg-white hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {prog.badgeKicker}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {prog.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 font-medium">
                    Sasaran: {prog.targetAudience}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {prog.description}
                </p>

                {/* Core Competencies preview */}
                <div className="pt-2">
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-2">
                    Capaian Kompetensi Inti
                  </h4>
                  <ul className="space-y-1.5">
                    {prog.coreCompetencies.slice(0, 3).map((comp, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Mitra Institusi Terhubung:</span>
                  <span className="text-stone-700 font-medium truncate">
                    {prog.partnerInstitutions.join(', ')}
                  </span>
                </div>

                <div className="text-emerald-800 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Silabus & Detail</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
