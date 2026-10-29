import React, { useState } from 'react';
import { Users, GraduationCap, HeartHandshake, BookOpen, Send, CheckCircle2, Search, MapPin, Sparkles, MessageSquareHeart } from 'lucide-react';
import { initialAlumniList, schoolImages } from '../data/schoolData';
import { AlumniRecord } from '../types/school';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

import { api } from '../services/api';

interface AlumniSectionProps {
  alumniData?: AlumniRecord[];
  onAlumniRegistered?: () => void;
}

export const AlumniSection: React.FC<AlumniSectionProps> = ({
  alumniData,
  onAlumniRegistered,
}) => {
  const [alumniList, setAlumniList] = useState<AlumniRecord[]>(alumniData || initialAlumniList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('Semua');

  // Sync when props change
  React.useEffect(() => {
    if (alumniData) {
      setAlumniList(alumniData);
    }
  }, [alumniData]);

  // Form State
  const [fullName, setFullName] = useState('');
  const [graduationYear, setGraduationYear] = useState('2022');
  const [currentEducationOrJob, setCurrentEducationOrJob] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Kota Kupang');
  const [contact, setContact] = useState('');
  const [inspiringMessage, setInspiringMessage] = useState('');
  const [contributionWillingness, setContributionWillingness] = useState<AlumniRecord['contributionWillingness']>('Berbagi Pengalaman / Motivasi');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmitAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !currentEducationOrJob.trim()) return;

    const newRecord: Omit<AlumniRecord, 'id' | 'verified'> = {
      fullName: fullName.trim(),
      graduationYear: parseInt(graduationYear, 10),
      currentEducationOrJob: currentEducationOrJob.trim(),
      currentLocation: currentLocation.trim() || 'Kota Kupang',
      phoneOrContact: contact.trim() || 'Tersimpan Rahasia',
      inspiringMessage: inspiringMessage.trim() || 'Tetap semangat belajar di SMPS Surya Mandala!',
      contributionWillingness,
    };

    try {
      const res = await api.addAlumni(newRecord);
      if (res.success && res.alumni) {
        setAlumniList([res.alumni, ...alumniList]);
      }
      if (onAlumniRegistered) onAlumniRegistered();
    } catch (err) {
      // Local fallback
      const fallback: AlumniRecord = {
        id: `alm-${Date.now()}`,
        verified: true,
        ...newRecord
      };
      setAlumniList([fallback, ...alumniList]);
    }

    setShowSuccessToast(true);

    // Reset Form
    setFullName('');
    setCurrentEducationOrJob('');
    setContact('');
    setInspiringMessage('');

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 8000);
  };

  const filteredAlumni = alumniList.filter((alm) => {
    const matchesYear = selectedYear === 'Semua' || alm.graduationYear.toString() === selectedYear;
    const matchesQuery =
      alm.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alm.currentEducationOrJob.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alm.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alm.inspiringMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesQuery;
  });

  const availableYears = ['Semua', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  return (
    <section id="alumni" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <Users className="w-4 h-4 text-emerald-800" />
              <span>Jejaring & Penelusuran Lulusan (Tracer Study)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Pojok Alumni SMPS Surya Mandala
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Wadah silaturahmi para lulusan sejak tahun 2013 hingga saat ini. Mari bersama merajut 
              kebersamaan, berbagi pengalaman kerja/kuliah, dan menginspirasi adik-adik kelas di Oesapa.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 p-3 px-5 rounded-lg shrink-0">
            <div>
              <span className="text-xl font-bold text-stone-900 tabular-nums">200+</span>
              <span className="block text-[11px] text-stone-500 font-medium">Lulusan Sejak 2013</span>
            </div>
            <div className="h-8 w-px bg-stone-200" />
            <div>
              <span className="text-xl font-bold text-emerald-800 tabular-nums">100%</span>
              <span className="block text-[11px] text-stone-500 font-medium">Jejaring Terbuka</span>
            </div>
          </div>
        </div>

        {/* Highlight Banner with Alumni Photo */}
        <div className="mb-10 rounded-xl overflow-hidden border border-stone-200 bg-stone-50 grid grid-cols-1 lg:grid-cols-12 shadow-xs">
          <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden bg-stone-100">
            <img
              src={normalizeImageUrl(schoolImages.alumni)}
              alt="Silaturahmi Alumni SMPS Surya Mandala"
              loading="lazy"
              onError={(e) => handleImageError(e)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-xs font-medium text-emerald-300">Temu Kasih Almamater</span>
              <p className="text-xs text-stone-200">
                Alumni berkunjung kembali ke teras sekolah menjumpai para guru di Oesapa.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Pesan Kepala Sekolah untuk Para Alumni
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1 leading-snug">
                "Pintu SMPS Surya Mandala Selalu Terbuka Lebar untuk Setiap Anak Didik Kami"
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Di mana pun kalian kini berada—baik yang sedang melanjutkan studi di SMA/SMK Kota Kupang, 
                kuliah di kampus, bekerja, maupun membuka usaha di tengah masyarakat—kalian adalah bukti 
                bahwa ketulusan belajar dapat membawa kita melangkah jauh. Mari isi formulir di bawah ini 
                agar kita dapat saling bertukar kabar dan mendukung adik-adik kelasmu.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-4 text-xs text-stone-500">
              <span className="font-semibold text-stone-800">Ibu Bendelina Mata</span>
              <span>·</span>
              <span>Kepala SMPS Surya Mandala</span>
              <span>·</span>
              <span className="text-emerald-800 font-medium">Jl. Timor Raya Gang Monitor</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Formulir Penjaringan Alumni & Direktori Alumni */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Kolom Kiri: Formulir Pendaftaran Alumni */}
          <div className="lg:col-span-5 bg-stone-50 rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
                <HeartHandshake className="w-5 h-5 text-emerald-800" />
                <span>Formulir Pendataan Alumni</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Bagi lulusan SMPS Surya Mandala dari semua angkatan, silakan mengisi data berikut untuk pemutakhiran buku alumni resmi sekolah.
              </p>
            </div>

            {showSuccessToast && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Terima Kasih, Data Alumni Berhasil Dicatat!</span>
                  <p className="mt-0.5 text-stone-700">
                    Nama Anda telah terdaftar dalam sistem jejaring alumni SMPS Surya Mandala. Salam hangat untuk keluarga!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitAlumni} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nama Lengkap Alumni *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Petrus Da Silva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Tahun Lulus SMP *
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  >
                    {availableYears.filter(y => y !== 'Semua').map((yr) => (
                      <option key={yr} value={yr}>
                        Lulusan Tahun {yr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Domisili Saat Ini
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Oesapa / Kota Kupang"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Sekolah Lanjutan / Kuliah / Pekerjaan Saat Ini *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMKN 2 Kupang / Mahasiswa Undana / Bekerja"
                  value={currentEducationOrJob}
                  onChange={(e) => setCurrentEducationOrJob(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  No. WhatsApp / Kontak (Untuk Grup Silaturahmi)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 0821-xxxx-xxxx"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Pesan Motivasi / Nasehat untuk Adik-Adik Kelas
                </label>
                <textarea
                  rows={2}
                  placeholder="Bagikan kata semangat atau kenangan belajar di Surya Mandala..."
                  value={inspiringMessage}
                  onChange={(e) => setInspiringMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Kesiapan Berkontribusi untuk Almamater
                </label>
                <select
                  value={contributionWillingness}
                  onChange={(e) => setContributionWillingness(e.target.value as AlumniRecord['contributionWillingness'])}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                >
                  <option value="Berbagi Pengalaman / Motivasi">Berbagi Pengalaman / Motivasi ke Siswa</option>
                  <option value="Donasi Buku & Alat Tulis">Donasi Buku Bacaan & Alat Tulis</option>
                  <option value="Bantuan Belajar Adik Kelas">Membantu Belajar / Les Adik Kelas</option>
                  <option value="Networking Alumni">Bergabung di Jejaring Kontak Alumni</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Data dikelola operator sekolah.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors"
                >
                  Daftarkan Diri Sebagai Alumni
                </button>
              </div>
            </form>
          </div>

          {/* Kolom Kanan: Direktori Jejak Alumni & Inspirasi */}
          <div className="lg:col-span-7 space-y-5">
            {/* Filter & Search Bar */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-xs font-semibold text-stone-500 mr-1 shrink-0">
                    Tahun Lulus:
                  </span>
                  {availableYears.slice(0, 6).map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap shrink-0 ${
                        selectedYear === yr
                          ? 'bg-emerald-800 text-white font-medium'
                          : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-60 shrink-0">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, sekolah, profesi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* List Alumni Cards */}
            <div className="space-y-4">
              {filteredAlumni.map((alm) => (
                <div
                  key={alm.id}
                  className="bg-white p-5 rounded-lg border border-stone-200 hover:border-stone-300 transition-all shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0">
                        {alm.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">
                          {alm.fullName}
                        </h4>
                        <div className="text-xs text-stone-500 flex items-center gap-2">
                          <span className="font-semibold text-emerald-800">
                            Lulusan Angkatan {alm.graduationYear}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {alm.currentLocation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600 bg-stone-50 px-2.5 py-1 rounded border border-stone-200/80 shrink-0 self-start sm:self-center">
                      <span className="text-[11px] text-stone-400 block sm:inline mr-1">Kontribusi:</span>
                      <strong className="text-stone-800">{alm.contributionWillingness}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-stone-700 bg-stone-50/70 p-3 rounded border border-stone-100">
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-0.5">
                      Aktivitas / Jenjang Saat Ini:
                    </span>
                    <p className="font-medium text-stone-800">
                      {alm.currentEducationOrJob}
                    </p>
                  </div>

                  {alm.inspiringMessage && (
                    <blockquote className="text-xs text-stone-600 italic border-l-2 border-emerald-600 pl-3 py-0.5">
                      "{alm.inspiringMessage}"
                    </blockquote>
                  )}
                </div>
              ))}

              {filteredAlumni.length === 0 && (
                <div className="p-8 text-center bg-stone-50 rounded-lg border border-dashed border-stone-300 text-xs text-stone-500">
                  Belum ada alumni yang sesuai dengan filter. Jadilah yang pertama mendaftarkan diri!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
