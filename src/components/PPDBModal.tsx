import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileCheck, Send, Clock, UserCheck, Heart } from 'lucide-react';
import { schoolGeneralInfo } from '../data/schoolData';

interface PPDBModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PPDBModal: React.FC<PPDBModalProps> = ({ isOpen, onClose }) => {
  const [applicantName, setApplicantName] = useState('');
  const [originSchool, setOriginSchool] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [needsAssistance, setNeedsAssistance] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !parentPhone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
          aria-label="Tutup PPDB"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <FileCheck className="w-4 h-4 text-emerald-800" />
            <span>Penerimaan Siswa Baru (PPDB) SMPS Surya Mandala</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
            Pendaftaran Masuk Kelas VII SMP Swasta Terjangkau
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Terbuka bagi seluruh lulusan SD/MI di Oesapa, Kelapa Lima, dan Kota Kupang dengan mengedepankan prinsip kemudahan, tanpa diskriminasi, dan bebas biaya pendaftaran.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Prinsip Penerimaan Siswa */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-xl font-bold text-emerald-800">Rp 0,-</span>
              <span className="block text-[11px] font-semibold text-stone-700 mt-0.5">Biaya Pendaftaran</span>
              <span className="text-[10px] text-stone-500">Gratis Formulir</span>
            </div>
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-xl font-bold text-stone-900 tabular-nums">30 Kursi</span>
              <span className="block text-[11px] font-semibold text-stone-700 mt-0.5">Daya Tampung Kelas VII</span>
              <span className="text-[10px] text-stone-500">1 Rombongan Belajar</span>
            </div>
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-xl font-bold text-emerald-800">BOS Penuh</span>
              <span className="block text-[11px] font-semibold text-stone-700 mt-0.5">Buku Ajar Dipinjamkan</span>
              <span className="text-[10px] text-stone-500">Bantuan Seragam Yatim</span>
            </div>
          </div>

          {/* Persyaratan Sederhana */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-800" />
              Syarat Pendaftaran Murid Baru
            </h4>
            <ul className="space-y-1 text-stone-600 list-disc list-inside">
              <li>Fotokopi Ijazah / Surat Keterangan Lulus (SKL) SD/MI (2 lembar)</li>
              <li>Fotokopi Kartu Keluarga (KK) & Akta Kelahiran anak (2 lembar)</li>
              <li>Pas foto ukuran 3x4 (2 lembar)</li>
              <li>Bagi pemegang KIP / PKH / Surat Keterangan Tidak Mampu dari Kelurahan dapat melampirkan untuk subsidi perlengkapan</li>
            </ul>
          </div>

          {/* Form Pra-Registrasi */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Formulir Pendaftaran & Sambung Rasa
            </h3>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  Pendaftaran Berhasil Dikirimkan!
                </div>
                <p className="text-stone-700">
                  Data calon murid <strong>{applicantName}</strong> telah diterima oleh Operator SMPS Surya Mandala (Ibu Bernadetha). Pihak sekolah akan menghubungi Bapak/Ibu <strong>{parentName}</strong> melalui nomor <strong>{parentPhone}</strong> untuk penyerahan berkas fisik di sekolah.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline"
                >
                  Daftarkan Murid Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Calon Murid *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Antonius Laka"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Asal SD / MI *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: SDI Oesapa / SDK Lasiana"
                      value={originSchool}
                      onChange={(e) => setOriginSchool(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Orang Tua / Wali Murid
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Bapak Markus Laka"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      No. WhatsApp / HP Orang Tua *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0812-xxxx-xxxx"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-200 rounded">
                  <input
                    type="checkbox"
                    id="needsHelp"
                    checked={needsAssistance}
                    onChange={(e) => setNeedsAssistance(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700"
                  />
                  <label htmlFor="needsHelp" className="text-stone-700 text-xs">
                    Keluarga kami membutuhkan bantuan seragam sekolah atau perlengkapan buku tulis.
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-stone-400">
                    Bisa juga mendaftar langsung di Jl. Timor Raya Gang Monitor.
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors"
                  >
                    Kirim Data Pendaftaran
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-stone-200 bg-stone-50 flex items-center justify-between rounded-b-xl text-xs text-stone-500">
          <span>
            Kepala Sekolah: {schoolGeneralInfo.kepalaSekolah}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-md transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
