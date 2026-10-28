import React from 'react';
import { X, MapPin, Calendar, Clock, User, Award, CheckCircle2, ShieldCheck, Wrench, ExternalLink, Sparkles } from 'lucide-react';
import { SchoolActivity, StudentAchievement, SchoolFacility, SchoolProgram } from '../types/school';

interface DetailModalProps {
  item: SchoolActivity | StudentAchievement | SchoolFacility | SchoolProgram | null;
  type: 'activity' | 'achievement' | 'facility' | 'program' | null;
  onClose: () => void;
}

const getItemTitle = (it: SchoolActivity | StudentAchievement | SchoolFacility | SchoolProgram): string => {
  if ('name' in it) return it.name;
  if ('title' in it) return it.title;
  return '';
};

const getItemCategory = (it: SchoolActivity | StudentAchievement | SchoolFacility | SchoolProgram): string => {
  if ('category' in it) return it.category;
  if ('badgeKicker' in it) return it.badgeKicker;
  return 'Detail Informasi';
};

const getItemImage = (it: SchoolActivity | StudentAchievement | SchoolFacility | SchoolProgram): string | undefined => {
  if ('image' in it) return it.image;
  if ('documentationImage' in it) return it.documentationImage;
  return undefined;
};

export const DetailModal: React.FC<DetailModalProps> = ({ item, type, onClose }) => {
  if (!item || !type) return null;

  const headerTitle = getItemTitle(item);
  const headerCategory = getItemCategory(item);
  const headerImage = getItemImage(item);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100/90 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
          aria-label="Tutup Detail"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header & Optional Hero Image */}
        {headerImage ? (
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-100">
            <img
              src={headerImage}
              alt={headerTitle}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300 block mb-1">
                {headerCategory}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                {headerTitle}
              </h2>
            </div>
          </div>
        ) : (
          <div className="p-6 pb-4 border-b border-stone-100">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 block mb-1">
              {headerCategory}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              {headerTitle}
            </h2>
          </div>
        )}

        {/* Content Body Based on Type */}
        <div className="p-6 space-y-6">
          {/* 1. School Activity Detail */}
          {type === 'activity' && (() => {
            const act = item as SchoolActivity;
            return (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="flex items-center gap-1 font-semibold text-stone-900">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" /> {act.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" /> {act.time}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" /> {act.location}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Ringkasan Kegiatan
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {act.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Target Capaian & Sasaran Belajar
                  </h4>
                  <ul className="space-y-2">
                    {act.detailedObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-lg">
                  <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Catatan Transparansi & Akuntabilitas
                  </h4>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {act.transparencyNotes}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>Guru Koordinator: <strong className="text-stone-800">{act.leadTeacher}</strong></span>
                  <span>Peserta: <strong className="text-stone-800">{act.studentParticipantCount} Siswa</strong></span>
                </div>
              </div>
            );
          })()}

          {/* 2. Student Achievement Detail */}
          {type === 'achievement' && (() => {
            const ach = item as StudentAchievement;
            return (
              <div className="space-y-5">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
                  <Award className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">{ach.award}</h3>
                    <p className="text-xs text-amber-900 mt-0.5">{ach.competition}</p>
                    <p className="text-[11px] text-amber-800 mt-1">Penyelenggara: {ach.organizer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider">Siswa Berprestasi</span>
                    <strong className="text-stone-900 block mt-0.5">{ach.studentNames.join(', ')}</strong>
                    <span className="text-stone-500">{ach.gradeAndMajor}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider">Guru Pembina / Mentor</span>
                    <strong className="text-stone-900 block mt-0.5">{ach.mentor}</strong>
                    <span className="text-stone-500 font-mono text-[11px]">Tahun {ach.year}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Deskripsi Karya & Penelitian
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Dampak & Rekomendasi Masa Depan
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {ach.impactAndTakeaways}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span>Nomor Registrasi Sertifikat:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ach.certificateRef}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* 3. School Facility Detail */}
          {type === 'facility' && (() => {
            const fac = item as SchoolFacility;
            return (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Lokasi Gedung</span>
                    <strong className="text-stone-800">{fac.location}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Luas Ruangan</span>
                    <strong className="text-stone-800">{fac.areaSize}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Kapasitas Siswa</span>
                    <strong className="text-stone-800">{fac.capacity}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Daftar Peralatan Utama & Standar Teknis
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {fac.equipmentList.map((eq, idx) => (
                      <div key={idx} className="p-2 bg-stone-50 border border-stone-200 rounded flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="text-stone-800 font-medium">{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-stone-600" />
                    Protokol Pemeliharaan & Transparansi
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {fac.transparencyProtocol}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Penanggung Jawab: {fac.roomCustodian}</span>
                    <span>Inspeksi: {fac.lastInspectionDate}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 4. School Program Detail */}
          {type === 'program' && (() => {
            const prog = item as SchoolProgram;
            return (
              <div className="space-y-5">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Kerangka Kurikulum:</span>
                    <span className="font-semibold text-stone-900 text-right">{prog.curriculumFramework}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Durasi Pembelajaran:</span>
                    <span className="font-semibold text-stone-900">{prog.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Koordinator Program:</span>
                    <span className="font-semibold text-emerald-800">{prog.coordinator}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Deskripsi Program
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Capaian Kompetensi Lulusan (Graduate Outcomes)
                  </h4>
                  <ul className="space-y-2">
                    {prog.coreCompetencies.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950 block mb-1">
                    Capaian Alumni Terbukti
                  </span>
                  <p className="text-emerald-900 leading-relaxed font-medium">
                    {prog.alumniOutcome}
                  </p>
                </div>

                <div>
                  <span className="text-stone-400 text-[11px] uppercase tracking-wider font-semibold block mb-1.5">
                    Mitra Kolaborasi Akademik
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {prog.partnerInstitutions.map((inst, idx) => (
                      <span key={idx} className="text-xs font-medium text-stone-700 bg-stone-100 px-2.5 py-1 rounded">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-stone-200 bg-stone-50 flex items-center justify-between rounded-b-xl">
          <span className="text-xs text-stone-500">
            SMPS SURYA MANDALA, Kota Kupang · Data Resmi Terverifikasi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-md transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
