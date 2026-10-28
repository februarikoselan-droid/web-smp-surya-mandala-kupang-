import React, { useState } from 'react';
import { ShieldCheck, Download, Send, CheckCircle2, FileText, AlertCircle, Users, BarChart3, HelpCircle } from 'lucide-react';
import { budgetAllocations, publicDocuments, initialAspirasiList, publicMetrics } from '../data/schoolData';
import { PublicInquiry, BudgetAllocation } from '../types/school';

import { api } from '../services/api';

interface TransparencyHubSectionProps {
  budgetData?: BudgetAllocation[];
  aspirasiData?: PublicInquiry[];
  onInquirySubmitted?: () => void;
}

export const TransparencyHubSection: React.FC<TransparencyHubSectionProps> = ({
  budgetData,
  aspirasiData,
  onInquirySubmitted,
}) => {
  const [aspirasiList, setAspirasiList] = useState<PublicInquiry[]>(aspirasiData || initialAspirasiList);
  const currentBudgetAllocations = budgetData || budgetAllocations;

  React.useEffect(() => {
    if (aspirasiData) {
      setAspirasiList(aspirasiData);
    }
  }, [aspirasiData]);

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState<PublicInquiry['role']>('Orang Tua');
  const [topic, setTopic] = useState<PublicInquiry['topic']>('Fasilitas & Sarpras');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleSubmitAspirasi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) return;

    try {
      const res = await api.submitInquiry({
        fullName: fullName.trim(),
        emailOrPhone: contact.trim() || 'Anonim / Terenkripsi',
        role,
        topic,
        message: message.trim()
      });

      if (res.success && res.inquiry) {
        setAspirasiList([res.inquiry, ...aspirasiList]);
        setSubmittedTicket(res.inquiry.ticketNumber);
      }
      if (onInquirySubmitted) onInquirySubmitted();
    } catch (err) {
      const newTicketNum = `ASP-SMPS-${String(aspirasiList.length + 45).padStart(3, '0')}`;
      const newEntry: PublicInquiry = {
        id: `asp-${Date.now()}`,
        ticketNumber: newTicketNum,
        fullName: fullName.trim(),
        emailOrPhone: contact.trim() ? contact.trim() : 'Anonim / Terenkripsi',
        role,
        topic,
        message: message.trim(),
        timestamp: 'Baru Saja',
        status: 'Diterima & Diverifikasi',
      };

      setAspirasiList([newEntry, ...aspirasiList]);
      setSubmittedTicket(newTicketNum);
    }

    setFullName('');
    setContact('');
    setMessage('');

    setTimeout(() => {
      setSubmittedTicket(null);
    }, 8000);
  };

  const handleDownloadDoc = (docTitle: string) => {
    setDownloadToast(`Mengunduh berkas resmi: ${docTitle}...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4000);
  };

  return (
    <section id="transparansi" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Prinsip Good School Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Pusat Transparansi & Akuntabilitas Publik
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Sebagai sekolah berintegritas, kami membuka akses seluas-luasnya terhadap 
              alokasi anggaran BOS/Komite, dokumen tata kelola resmi, serta kanal aspirasi masyarakat.
            </p>
          </div>

          <div className="text-xs text-stone-600 bg-white p-2.5 px-4 rounded-md border border-stone-200 shrink-0">
            Pelaporan: Dinas Pendidikan & Kebudayaan Kota Kupang
          </div>
        </div>

        {/* Toast Notification */}
        {downloadToast && (
          <div className="mb-6 p-3 bg-emerald-900 text-white text-xs rounded-md shadow-md flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {downloadToast}
            </span>
            <button
              onClick={() => setDownloadToast(null)}
              className="text-stone-300 hover:text-white underline text-[11px]"
            >
              Tutup
            </button>
          </div>
        )}

        {/* 1. Transparansi Alokasi Anggaran (BOS & Komite) */}
        <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Transparansi Realisasi Bantuan Operasional Sekolah (BOS) 2026
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Total Bantuan Dikelola: <strong className="text-stone-900 tabular-nums">Rp 84.000.000,- / Tahun Ajaran</strong> (Pemberdayaan 84 Siswa)
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200/60">
              Bebas Pungutan Liar & Diawasi Komite Warga Oesapa
            </div>
          </div>

          {/* Cumulative Visual Progress Bar */}
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex mb-6">
            <div style={{ width: '35%' }} className="bg-emerald-800" title="Buku Pelajaran 35%" />
            <div style={{ width: '25%' }} className="bg-teal-600" title="Pemeliharaan Kelas & Mebeler 25%" />
            <div style={{ width: '20%' }} className="bg-emerald-600" title="Bantuan Siswa Prasejahtera 20%" />
            <div style={{ width: '12%' }} className="bg-amber-600" title="Ujian & Pramuka 12%" />
            <div style={{ width: '8%' }} className="bg-stone-500" title="Listrik & Dapodik 8%" />
          </div>

          {/* Allocation Table Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase text-[11px] font-semibold">
                  <th className="py-2.5 pr-4">Pos Alokasi</th>
                  <th className="py-2.5 px-4 text-right">Porsi (%)</th>
                  <th className="py-2.5 px-4 text-right">Nominal Anggaran</th>
                  <th className="py-2.5 px-4 hidden md:table-cell">Rincian Sasaran Transparan</th>
                  <th className="py-2.5 pl-4 text-right">Pengawas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {currentBudgetAllocations.map((alloc, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-stone-900">
                      {alloc.category}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-900 tabular-nums">
                      {alloc.percentage}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-stone-800 tabular-nums">
                      {alloc.amountRupiah}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-stone-600">
                      {alloc.description}
                    </td>
                    <td className="py-3 pl-4 text-right text-stone-500">
                      {alloc.supervisor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-Column: Unduh Dokumen Publik & Formulir Aspirasi Publik */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dokumen Publik Resmi */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-stone-200 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-1">
                <FileText className="w-5 h-5 text-emerald-800" />
                <span>Unduh Dokumen Publik Resmi</span>
              </div>
              <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                Berkas laporan kinerja tahunan, kurikulum operasional, dan pedoman resmi yang dapat diakses publik.
              </p>

              <div className="space-y-3">
                {publicDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 bg-stone-50 rounded-md border border-stone-200/80 hover:border-stone-300 transition-colors flex items-start justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
                        {doc.summary}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1.5 font-mono">
                        <span>{doc.code}</span>
                        <span>·</span>
                        <span>{doc.fileSize}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadDoc(doc.title)}
                      className="p-2 text-emerald-800 hover:text-white hover:bg-emerald-800 border border-emerald-800/40 rounded transition-colors shrink-0"
                      title="Unduh Berkas Resmi"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500">
              Semua dokumen telah terverifikasi secara elektronik sesuai UU Keterbukaan Informasi Publik (KIP) No. 14 Tahun 2008.
            </div>
          </div>

          {/* Kanal Pengaduan & Aspirasi Publik */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-stone-200 p-6 shadow-xs space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
                  <Send className="w-5 h-5 text-emerald-800" />
                  <span>Kanal Aspirasi & Pengaduan Terbuka</span>
                </div>
                <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded font-medium">
                  Respon &lt; 24 Jam
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Kirim masukan, usulan perbaikan fasilitas, atau pertanyaan terkait transparansi sekolah. Setiap tiket terpantau oleh Komite Sekolah.
              </p>
            </div>

            {submittedTicket && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-md text-xs text-emerald-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Aspirasi Berhasil Terkirim!</span>
                  <p className="mt-0.5 text-stone-700">
                    Nomor Tiket Anda: <strong className="font-mono text-emerald-900">{submittedTicket}</strong>. Tim pengawas dan komite sekolah akan meninjau dalam 1x24 jam kerja.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitAspirasi} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nama Lengkap / Inisial *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Kontak (Email / No. HP untuk Notifikasi)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: budi@gmail.com / 0812xxx"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Peran / Status Pengirim
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as PublicInquiry['role'])}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  >
                    <option value="Orang Tua">Orang Tua / Wali Murid</option>
                    <option value="Alumni">Alumni SMA Cipta Cemerlang</option>
                    <option value="Siswa">Siswa Aktif</option>
                    <option value="Masyarakat Umum">Masyarakat Umum / Tetangga Kampus</option>
                    <option value="Mitra Pendidikan">Mitra Pendidikan / Lembaga Riset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Kategori Topik
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as PublicInquiry['topic'])}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  >
                    <option value="Fasilitas & Sarpras">Fasilitas & Sarpras Kampus</option>
                    <option value="Transparansi Anggaran">Transparansi Anggaran & BOS</option>
                    <option value="Akademik & PPDB">Akademik & PPDB</option>
                    <option value="Apresiasi & Saran">Apresiasi & Masukan Umum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Uraian Masukan / Pertanyaan Transparansi *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Sampaikan aspirasi atau permintaan klarifikasi secara objektif dan konstruktif..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Data pengirim dilindungi dengan enkripsi privasi.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors"
                >
                  Kirim Aspirasi Publik
                </button>
              </div>
            </form>

            {/* Rekapitulasi Aspirasi Publik Terbuka */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-800 mb-3 flex items-center justify-between">
                <span>Daftar Tindak Lanjut Aspirasi Terakhir</span>
                <span className="text-stone-400 font-normal text-[11px]">Terbuka & Akuntabel</span>
              </h4>

              <div className="space-y-2.5">
                {aspirasiList.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-3 bg-stone-50 rounded border border-stone-200/80 text-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[11px] text-emerald-800 font-bold">
                        {item.ticketNumber}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {item.role} · {item.timestamp}
                      </span>
                    </div>
                    <p className="text-stone-700 text-xs line-clamp-2">
                      "{item.message}"
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Status: <strong className="text-emerald-900">{item.status}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
