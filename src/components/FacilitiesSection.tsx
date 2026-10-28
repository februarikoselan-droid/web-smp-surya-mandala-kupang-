import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle2, Users, Maximize2, Wrench, ChevronRight } from 'lucide-react';
import { schoolFacilities } from '../data/schoolData';
import { FacilityCategory, SchoolFacility } from '../types/school';

interface FacilitiesSectionProps {
  facilities?: SchoolFacility[];
  onSelectFacility: (facility: SchoolFacility) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  facilities,
  onSelectFacility,
}) => {
  const currentFacilities = facilities || schoolFacilities;
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory>('Semua');

  const categories: FacilityCategory[] = [
    'Semua',
    'Laboratorium',
    'Perpustakaan',
    'Olahraga',
    'Pembelajaran',
  ];

  const filteredFacilities = currentFacilities.filter((fac) => {
    return selectedCategory === 'Semua' || fac.category === selectedCategory;
  });

  return (
    <section id="fasilitas" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <span>Sarana, Prasarana & Transparansi Kondisi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Fasilitas & Sarana Belajar Siswa
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Sarana belajar sederhana, sejuk, dan tertata rapi di Kelurahan Oesapa. Setiap ruang kelas, 
              sudut baca literasi, dan halaman upacara dirawat dengan penuh gotong royong agar 84 siswa dapat belajar dengan tenang.
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFacilities.map((fac) => (
            <article
              key={fac.id}
              onClick={() => onSelectFacility(fac)}
              className="cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                <img
                  src={fac.image}
                  alt={fac.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded font-medium">
                  {fac.category}
                </div>
                <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {fac.conditionStatus}
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded text-white">
                  <h3 className="text-lg font-bold leading-snug">
                    {fac.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-200 mt-1">
                    <span>{fac.location}</span>
                    <span>·</span>
                    <span className="tabular-nums">{fac.areaSize}</span>
                    <span>·</span>
                    <span className="tabular-nums">Kapasitas: {fac.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Fitur & Standar Keunggulan
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {fac.keyFeatures.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                    <span className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-stone-400" />
                      <span>Inspeksi Terakhir: <strong className="text-stone-700">{fac.lastInspectionDate}</strong></span>
                    </span>
                    <span className="truncate">
                      Penanggung Jawab: <span className="text-stone-700 font-medium">{fac.roomCustodian.split('&')[0]}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-stone-400">
                      ID: {fac.id.toUpperCase()}
                    </span>
                    <button className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Spesifikasi Lengkap & Log Inventaris <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
