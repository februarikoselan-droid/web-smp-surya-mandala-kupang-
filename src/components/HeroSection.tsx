import React from 'react';
import { ArrowRight, FileCheck, ShieldCheck, Award, Users, BookOpen, GraduationCap, MapPin, HeartHandshake } from 'lucide-react';
import { schoolGeneralInfo, schoolImages } from '../data/schoolData';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

interface HeroSectionProps {
  generalInfo?: typeof schoolGeneralInfo;
  onExploreActivities: () => void;
  onExploreAlumni: () => void;
  onExploreTransparency: () => void;
  onOpenPPDB: () => void;
  onOpenAdmin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  generalInfo,
  onExploreActivities,
  onExploreAlumni,
  onExploreTransparency,
  onOpenPPDB,
  onOpenAdmin,
}) => {
  const info = generalInfo || schoolGeneralInfo;
  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Editorial metadata - strictly zero-pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-stone-500 mb-3 tracking-wide">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-emerald-800 font-semibold">{info.name}</span>
            <span aria-hidden="true">·</span>
            <span>NPSN {info.npsn}</span>
            <span aria-hidden="true">·</span>
            <span>{info.akreditasi}</span>
            <span aria-hidden="true">·</span>
            <span>Kel. {info.kelurahan}, {info.kabKota}</span>
          </div>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-emerald-800 text-[11px] font-mono flex items-center gap-1 underline transition-colors"
            >
              <span>[Akses Operator]</span>
            </button>
          )}
        </div>

        {/* 2-Column Split: Headline + Narrative & School Atmosphere Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Mendidik dengan Ketulusan, Membuka Masa Depan Anak Bangsa di Pesisir Kupang
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              {info.name} didirikan pada 17 Juli 2013 di bawah naungan {info.naungan}. 
              Berlokasi di {info.address}, kami membimbing {info.totalSiswa} siswa 
              dengan dedikasi {info.totalPendidik} tenaga pendidik profesional, memastikan setiap anak dapat menuntaskan pendidikan 
              dasar dan percaya diri melanjutkan studi ke jenjang SMA/SMK.
            </p>

            {/* School Leadership & Operator Identity Banner */}
            <div className="p-3.5 bg-stone-50 border border-stone-200/90 rounded-lg text-xs space-y-1.5 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase tracking-wider">Kepala Sekolah</span>
                  <strong className="text-stone-900 font-semibold">{info.kepalaSekolah}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase tracking-wider">Operator Dapodik</span>
                  <strong className="text-stone-900 font-semibold">{info.operator}</strong>
                </div>
              </div>
              <div className="pt-1.5 border-t border-stone-200/60 text-stone-500 flex flex-wrap items-center gap-2 text-[11px]">
                <span>SK Pendirian: {info.skPendirian}</span>
                <span>·</span>
                <span>SK Operasional: {info.skOperasional}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreActivities}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors shadow-xs"
              >
                <span>Kegiatan Sekolah</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAlumni}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>Jejaring & Penjaringan Alumni</span>
              </button>

              <button
                onClick={onExploreTransparency}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-stone-500" />
                <span>Transparansi Dana BOS</span>
              </button>

              <button
                onClick={onOpenPPDB}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-stone-700 border border-stone-300 hover:border-stone-400 rounded-md transition-colors"
              >
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>Pendaftaran Siswa Baru</span>
              </button>
            </div>
          </div>

          {/* Focal Image: Authentic Indonesian Community School */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shadow-sm group">
              <img
                src={normalizeImageUrl(schoolImages.heroCampus)}
                alt="Gedung SMPS Surya Mandala Kupang NTT"
                loading="eager"
                onError={(e) => handleImageError(e)}
                className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
                  {info.name} · {info.kabKota}
                </span>
                <p className="text-sm font-medium text-white leading-snug">
                  Suasana sekolah rakyat yang teduh dan bersahaja di Kelurahan {info.kelurahan}, {info.kecamatan}.
                </p>
                <div className="mt-2 text-xs text-stone-300 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{info.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Reality Strip */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Status Akreditasi</span>
            </div>
            <div className="text-2xl font-bold text-stone-900">
              {info.akreditasi.split('(')[0].trim()}
            </div>
            <p className="text-xs text-stone-500">No. SK BAN-S/M 760/2019</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Peserta Didik Aktif</span>
            </div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">
              {info.totalSiswa} Siswa
            </div>
            <p className="text-xs text-stone-500">Kelas VII, VIII, IX ({info.jenjang})</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Tenaga Pendidik Pokok</span>
            </div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">
              {info.totalPendidik} Guru Utama
            </div>
            <p className="text-xs text-stone-500">Didukung Pendidik Pengabdi</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Kelulusan Melanjutkan</span>
            </div>
            <div className="text-2xl font-bold text-emerald-800 tabular-nums">
              100% Siswa
            </div>
            <p className="text-xs text-stone-500">Melanjutkan ke SMA/SMK Kupang</p>
          </div>
        </div>
      </div>
    </section>
  );
};
