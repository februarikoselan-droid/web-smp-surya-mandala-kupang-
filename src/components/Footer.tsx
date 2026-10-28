import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { schoolGeneralInfo } from '../data/schoolData';

interface FooterProps {
  generalInfo?: typeof schoolGeneralInfo;
  onOpenPPDB: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ generalInfo, onOpenPPDB, onOpenAdmin }) => {
  const info = generalInfo || schoolGeneralInfo;
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <span className="text-lg font-bold text-white tracking-tight block">
              {info.name}
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Sekolah Menengah Pertama swasta yang berdedikasi mencerdaskan anak bangsa di wilayah Kelurahan Oesapa dan Kecamatan Kelapa Lima, Kota Kupang, Nusa Tenggara Timur.
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <div>NPSN: <span className="text-white font-mono">{info.npsn}</span></div>
              <div>Akreditasi: <span className="text-emerald-400 font-semibold">{info.akreditasi}</span></div>
              <div>Kepala Sekolah: <span className="text-white">{info.kepalaSekolah}</span></div>
              <div>Operator: <span className="text-white">{info.operator}</span></div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#kegiatan" className="hover:text-white transition-colors">
                  Kegiatan Harian & Apel Sekolah
                </a>
              </li>
              <li>
                <a href="#prestasi" className="hover:text-white transition-colors">
                  Prestasi & Capaian Murid
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-white transition-colors">
                  Fasilitas Ruang Belajar & Halaman
                </a>
              </li>
              <li>
                <a href="#alumni" className="hover:text-white transition-colors">
                  Jejaring & Penjaringan Alumni
                </a>
              </li>
              <li>
                <a href="#transparansi" className="hover:text-white transition-colors">
                  Transparansi Dana Bantuan BOS
                </a>
              </li>
              {onOpenAdmin && (
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="text-emerald-400 hover:text-emerald-300 font-medium underline inline-flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Portal Admin / Edit Konten</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Alamat & Kontak Resmi
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{info.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="break-all">{info.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{info.jamOperasional}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: PPDB & Partisipasi Alumni */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pendaftaran Siswa Baru
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Menerima pendaftaran murid baru jenjang SMP kelas VII tanpa biaya pendaftaran.
            </p>
            <button
              onClick={onOpenPPDB}
              className="w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-md transition-colors text-center"
            >
              Daftar Murid Baru (Kelas VII)
            </button>
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kemendikbudristek RI</span>
              </span>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-400 hover:text-white underline"
                >
                  Login Operator
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} {info.name}, Kelurahan {info.kelurahan}, {info.kabKota}, NTT.
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>SK Pendirian: {info.skPendirian}</span>
            <span>·</span>
            <span>SK Operasional: {info.skOperasional}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
