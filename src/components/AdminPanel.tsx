import React, { useState } from 'react';
import {
  X,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Trophy,
  Building2,
  Users,
  DollarSign,
  KeyRound,
  RotateCcw,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { api, SchoolContentState } from '../services/api';
import {
  SchoolActivity,
  StudentAchievement,
  SchoolFacility,
  AlumniRecord,
  BudgetAllocation
} from '../types/school';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  content: SchoolContentState;
  onContentUpdated: (updatedContent: SchoolContentState) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  content,
  onContentUpdated,
}) => {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'profil' | 'kegiatan' | 'prestasi' | 'fasilitas' | 'alumni' | 'anggaran' | 'keamanan'>('profil');

  // Operation feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Profil Form State
  const [profileForm, setProfileForm] = useState(content.generalInfo);

  // 2. Activity Form State
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState<Omit<SchoolActivity, 'id'>>({
    title: '',
    date: 'Hari Ini, 28 Oktober 2026',
    time: '07.30 - 09.00 WITA',
    category: 'Akademik',
    location: 'Ruang Kelas SMPS Surya Mandala',
    leadTeacher: 'Bendelina Mata',
    studentParticipantCount: 28,
    summary: '',
    detailedObjectives: ['Tujuan pembelajaran 1', 'Tujuan pembelajaran 2'],
    transparencyNotes: 'Didanai melalui Bantuan Operasional Sekolah (BOS) tanpa pungutan siswa.',
    status: 'Terjadwal Hari Ini',
    documentationImage: '/images/classroom_learning_smp_1793208896542.jpg'
  });

  // 3. Achievement Form State
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Omit<StudentAchievement, 'id'>>({
    title: '',
    competition: '',
    organizer: 'Dinas Pendidikan & Kebudayaan Kota Kupang',
    award: 'Juara 1 Tingkat Gugus',
    studentNames: ['Nama Siswa'],
    gradeAndMajor: 'Kelas VIII',
    mentor: 'Bendelina Mata',
    year: 2024,
    dateAchieved: '20 Oktober 2024',
    category: 'Olahraga',
    level: 'Kota',
    description: '',
    impactAndTakeaways: 'Meningkatkan motivasi dan rasa percaya diri siswa di sekolah.',
    certificateRef: 'SK-SMPS-PRESTASI-2024',
    image: '/images/ceremony_activities_smp_1793208897945.jpg'
  });

  // 4. Facility Form State
  const [showAddFacility, setShowAddFacility] = useState(false);
  const [newFacility, setNewFacility] = useState<Omit<SchoolFacility, 'id'>>({
    name: '',
    category: 'Pembelajaran',
    image: '/images/classroom_learning_smp_1793208896542.jpg',
    capacity: '30 Siswa',
    areaSize: '48 m²',
    location: 'Gedung Utama',
    conditionStatus: 'Optimal',
    lastInspectionDate: '20 Oktober 2026',
    roomCustodian: 'Bernadetha Berlindis Sati Blikololong',
    keyFeatures: ['Meja dan kursi kayu rapi', 'Ventilasi udara alami'],
    equipmentList: ['Meja kayu siswa', 'Papan tulis'],
    transparencyProtocol: 'Pemeliharaan berkala bersama komite warga Oesapa.'
  });

  // 5. Password Change State
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwMessage, setPwMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSaving(true);
    try {
      const res = await api.login(username, password);
      if (res.success) {
        setIsLoggedIn(true);
        setPassword('');
        showToast('Login berhasil sebagai Operator Sekolah.');
      } else {
        setLoginError(res.message || 'Login gagal.');
      }
    } catch (err) {
      setLoginError('Koneksi ke backend terputus.');
    } finally {
      setIsSaving(false);
    }
  };

  const refreshData = async () => {
    try {
      const updated = await api.getContent();
      onContentUpdated(updated);
      setProfileForm(updated.generalInfo);
    } catch (err) {
      console.error(err);
    }
  };

  // 1. Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateGeneralInfo(profileForm);
      if (res.success) {
        showToast('Data pokok dan profil sekolah berhasil diperbarui!');
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal memperbarui profil.');
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Activities
  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title.trim()) return;
    setIsSaving(true);
    try {
      const res = await api.addActivity(newActivity);
      if (res.success) {
        showToast('Kegiatan baru berhasil diterbitkan ke website!');
        setShowAddActivity(false);
        setNewActivity({
          ...newActivity,
          title: '',
          summary: ''
        });
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menambahkan kegiatan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus kegiatan ini?')) return;
    setIsSaving(true);
    try {
      const res = await api.deleteActivity(id);
      if (res.success) {
        showToast('Kegiatan berhasil dihapus.');
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menghapus kegiatan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateActivityStatus = async (id: string, status: SchoolActivity['status']) => {
    setIsSaving(true);
    try {
      const res = await api.updateActivity(id, { status });
      if (res.success) {
        showToast(`Status kegiatan diubah menjadi: ${status}`);
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal mengubah status kegiatan.');
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Achievements
  const handleCreateAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchievement.title.trim()) return;
    setIsSaving(true);
    try {
      const res = await api.addAchievement(newAchievement);
      if (res.success) {
        showToast('Prestasi siswa berhasil dicatat!');
        setShowAddAchievement(false);
        setNewAchievement({
          ...newAchievement,
          title: '',
          competition: '',
          description: ''
        });
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menambahkan prestasi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!window.confirm('Hapus arsip prestasi ini?')) return;
    setIsSaving(true);
    try {
      const res = await api.deleteAchievement(id);
      if (res.success) {
        showToast('Prestasi berhasil dihapus.');
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menghapus.');
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Facilities
  const handleCreateFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacility.name.trim()) return;
    setIsSaving(true);
    try {
      const res = await api.addFacility(newFacility);
      if (res.success) {
        showToast('Data fasilitas berhasil ditambahkan!');
        setShowAddFacility(false);
        setNewFacility({
          ...newFacility,
          name: ''
        });
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menambahkan fasilitas.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFacility = async (id: string) => {
    if (!window.confirm('Hapus fasilitas ini?')) return;
    setIsSaving(true);
    try {
      const res = await api.deleteFacility(id);
      if (res.success) {
        showToast('Fasilitas berhasil dihapus.');
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menghapus.');
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Alumni Verification & Delete
  const handleDeleteAlumni = async (id: string) => {
    if (!window.confirm('Hapus data alumni ini?')) return;
    setIsSaving(true);
    try {
      const res = await api.deleteAlumni(id);
      if (res.success) {
        showToast('Data alumni berhasil dihapus.');
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal menghapus alumni.');
    } finally {
      setIsSaving(false);
    }
  };

  // 6. Reset Content
  const handleReset = async () => {
    if (!window.confirm('PERINGATAN: Apakah Anda yakin ingin me-reset seluruh konten kembali ke data pokok awal resmi sekolah?')) return;
    setIsSaving(true);
    try {
      const res = await api.resetToDefault();
      if (res.success) {
        showToast('Konten berhasil di-reset ke data pokok resmi awal.');
        await refreshData();
      }
    } catch (err) {
      showToast('Gagal me-reset database.');
    } finally {
      setIsSaving(false);
    }
  };

  // 7. Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage(null);
    try {
      const res = await api.changePassword(currentPw, newPw);
      if (res.success) {
        setPwMessage({ text: 'Kata sandi berhasil diperbarui!', isError: false });
        setCurrentPw('');
        setNewPw('');
      } else {
        setPwMessage({ text: res.message || 'Gagal mengubah kata sandi', isError: true });
      }
    } catch (err) {
      setPwMessage({ text: 'Kesalahan jaringan.', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative bg-white rounded-xl border border-stone-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight">
                Panel Pengelola Konten (Admin & Operator Sekolah)
              </h2>
              <span className="text-xs text-stone-300">
                SMPS SURYA MANDALA · Kelurahan Oesapa, Kota Kupang
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-1.5 text-xs text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors flex items-center gap-1.5"
                title="Keluar dari Panel Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-full transition-colors"
              aria-label="Tutup Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div className="bg-emerald-900 text-white text-xs py-2 px-4 flex items-center gap-2 justify-center shadow-inner shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Not Logged In: Login Form */}
        {!isLoggedIn && (
          <div className="p-6 sm:p-10 max-w-md mx-auto w-full my-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Masuk ke Panel Operator Sekolah
              </h3>
              <p className="text-xs text-stone-500">
                Hanya operator dan pengurus resmi SMPS Surya Mandala yang diizinkan mengedit isi konten website.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nama Pengguna (Username)
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Kata Sandi (Password)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                  placeholder="Masukkan kata sandi..."
                />
              </div>

              {/* Helpful Default Credentials Hint */}
              <div className="p-2.5 bg-stone-100 rounded text-[11px] text-stone-600 border border-stone-200">
                <span className="font-semibold text-stone-800">Akses Resmi Default:</span>
                <br />
                User: <code className="bg-white px-1 py-0.5 rounded font-mono text-emerald-800 font-bold">admin</code>
                {' · '}
                Kata Sandi: <code className="bg-white px-1 py-0.5 rounded font-mono text-emerald-800 font-bold">suryamandala2013</code>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors shadow-xs"
              >
                {isSaving ? 'Memverifikasi...' : 'Masuk ke Dashboard Pengelola'}
              </button>
            </form>
          </div>
        )}

        {/* Logged In Dashboard */}
        {isLoggedIn && (
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200 p-3 space-y-1 shrink-0 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1 md:gap-0">
              <button
                onClick={() => setActiveAdminTab('profil')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'profil' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Data Pokok Sekolah</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('kegiatan')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'kegiatan' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Kegiatan Harian ({content.todayActivities.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('prestasi')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'prestasi' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Trophy className="w-4 h-4 shrink-0" />
                <span>Prestasi Siswa ({content.studentAchievements.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('fasilitas')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'fasilitas' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Fasilitas ({content.schoolFacilities.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('alumni')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'alumni' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Alumni ({content.alumniList.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('anggaran')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'anggaran' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>Dana Bantuan BOS</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('keamanan')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeAdminTab === 'keamanan' ? 'bg-emerald-800 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <KeyRound className="w-4 h-4 shrink-0" />
                <span>Ganti Sandi & Reset</span>
              </button>
            </div>

            {/* Main Editor Canvas */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* TAB 1: DATA POKOK SEKOLAH */}
              {activeAdminTab === 'profil' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        Edit Data Pokok & Profil Satuan Pendidikan
                      </h3>
                      <p className="text-xs text-stone-500">
                        Perubahan akan langsung ter-update di beranda, header, dan footer website secara real-time.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Nama Sekolah
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          NPSN Resmi
                        </label>
                        <input
                          type="text"
                          value={profileForm.npsn}
                          onChange={(e) => setProfileForm({ ...profileForm, npsn: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Nama Kepala Sekolah
                        </label>
                        <input
                          type="text"
                          value={profileForm.kepalaSekolah}
                          onChange={(e) => setProfileForm({ ...profileForm, kepalaSekolah: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Nama Operator Sekolah
                        </label>
                        <input
                          type="text"
                          value={profileForm.operator}
                          onChange={(e) => setProfileForm({ ...profileForm, operator: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Jumlah Siswa Aktif
                        </label>
                        <input
                          type="number"
                          value={profileForm.totalSiswa}
                          onChange={(e) => setProfileForm({ ...profileForm, totalSiswa: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Jumlah Guru Utama
                        </label>
                        <input
                          type="number"
                          value={profileForm.totalPendidik}
                          onChange={(e) => setProfileForm({ ...profileForm, totalPendidik: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Status Akreditasi
                        </label>
                        <input
                          type="text"
                          value={profileForm.akreditasi}
                          onChange={(e) => setProfileForm({ ...profileForm, akreditasi: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          No. SK Pendirian
                        </label>
                        <input
                          type="text"
                          value={profileForm.skPendirian}
                          onChange={(e) => setProfileForm({ ...profileForm, skPendirian: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          No. SK Operasional
                        </label>
                        <input
                          type="text"
                          value={profileForm.skOperasional}
                          onChange={(e) => setProfileForm({ ...profileForm, skOperasional: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Alamat Lengkap Sekolah
                      </label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Email Resmi Sekolah
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Jam Operasional Sekolah
                        </label>
                        <input
                          type="text"
                          value={profileForm.jamOperasional}
                          onChange={(e) => setProfileForm({ ...profileForm, jamOperasional: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Motto & Prinsip Pelayanan
                      </label>
                      <input
                        type="text"
                        value={profileForm.motto}
                        onChange={(e) => setProfileForm({ ...profileForm, motto: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-stone-300 bg-white"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: KELOLA KEGIATAN HARIAN */}
              {activeAdminTab === 'kegiatan' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        Manajemen Kegiatan & Agenda Harian
                      </h3>
                      <p className="text-xs text-stone-500">
                        Tambah agenda apel, pembiasaan karakter, ekstrakurikuler, atau gotong royong.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddActivity(!showAddActivity)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showAddActivity ? 'Batal' : 'Tambah Kegiatan'}</span>
                    </button>
                  </div>

                  {/* Add Activity Form */}
                  {showAddActivity && (
                    <form onSubmit={handleCreateActivity} className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs">
                      <h4 className="font-bold text-stone-900">Formulir Kegiatan Baru</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Judul Kegiatan *</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Apel Pagi Bersama"
                            value={newActivity.title}
                            onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Kategori</label>
                          <select
                            value={newActivity.category}
                            onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value as any })}
                            className="w-full p-2 border rounded bg-white"
                          >
                            <option value="Akademik">Akademik</option>
                            <option value="Karakter & Sosial">Karakter & Sosial</option>
                            <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                            <option value="Komite">Komite</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Tanggal</label>
                          <input
                            type="text"
                            value={newActivity.date}
                            onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Waktu</label>
                          <input
                            type="text"
                            value={newActivity.time}
                            onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Lokasi</label>
                          <input
                            type="text"
                            value={newActivity.location}
                            onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Uraian Ringkasan Kegiatan</label>
                        <textarea
                          rows={2}
                          value={newActivity.summary}
                          onChange={(e) => setNewActivity({ ...newActivity, summary: e.target.value })}
                          className="w-full p-2 border rounded bg-white"
                          placeholder="Jelaskan dinamika jalannya kegiatan..."
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddActivity(false)}
                          className="px-3 py-1.5 border rounded"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="px-4 py-1.5 bg-emerald-800 text-white rounded font-semibold"
                        >
                          Simpan Kegiatan
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Activity Items List */}
                  <div className="space-y-3">
                    {content.todayActivities.map((act) => (
                      <div key={act.id} className="p-3.5 bg-white border border-stone-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-emerald-800">{act.category}</span>
                            <span>·</span>
                            <span className="text-stone-500">{act.date} ({act.time})</span>
                          </div>
                          <h4 className="font-bold text-stone-900">{act.title}</h4>
                          <p className="text-stone-600 line-clamp-1">{act.summary}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={act.status}
                            onChange={(e) => handleUpdateActivityStatus(act.id, e.target.value as any)}
                            className="p-1 border rounded bg-stone-50 text-[11px]"
                          >
                            <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                            <option value="Terjadwal Hari Ini">Terjadwal Hari Ini</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Mendatang">Mendatang</option>
                          </select>
                          <button
                            onClick={() => handleDeleteActivity(act.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                            title="Hapus Kegiatan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: KELOLA PRESTASI SISWA */}
              {activeAdminTab === 'prestasi' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        Manajemen Prestasi & Kejuaraan Murid
                      </h3>
                      <p className="text-xs text-stone-500">
                        Publikasikan lomba gerak jalan, kepramukaan, cerita daerah, atau kelulusan siswa.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddAchievement(!showAddAchievement)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showAddAchievement ? 'Batal' : 'Tambah Prestasi'}</span>
                    </button>
                  </div>

                  {showAddAchievement && (
                    <form onSubmit={handleCreateAchievement} className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs">
                      <h4 className="font-bold text-stone-900">Catat Prestasi Baru</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Judul Prestasi *</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Juara 1 Lomba Gerak Jalan"
                            value={newAchievement.title}
                            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Nama Ajang Lomba</label>
                          <input
                            type="text"
                            value={newAchievement.competition}
                            onChange={(e) => setNewAchievement({ ...newAchievement, competition: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Penghargaan / Medali</label>
                          <input
                            type="text"
                            value={newAchievement.award}
                            onChange={(e) => setNewAchievement({ ...newAchievement, award: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Tingkat</label>
                          <select
                            value={newAchievement.level}
                            onChange={(e) => setNewAchievement({ ...newAchievement, level: e.target.value as any })}
                            className="w-full p-2 border rounded bg-white"
                          >
                            <option value="Kota">Kota / Kecamatan</option>
                            <option value="Provinsi">Provinsi</option>
                            <option value="Nasional">Nasional</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Tahun</label>
                          <input
                            type="number"
                            value={newAchievement.year}
                            onChange={(e) => setNewAchievement({ ...newAchievement, year: Number(e.target.value) })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Nama Siswa / Regu</label>
                        <input
                          type="text"
                          value={newAchievement.studentNames.join(', ')}
                          onChange={(e) => setNewAchievement({ ...newAchievement, studentNames: [e.target.value] })}
                          className="w-full p-2 border rounded bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Deskripsi & Nilai Positif</label>
                        <textarea
                          rows={2}
                          value={newAchievement.description}
                          onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                          className="w-full p-2 border rounded bg-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAchievement(false)}
                          className="px-3 py-1.5 border rounded"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="px-4 py-1.5 bg-emerald-800 text-white rounded font-semibold"
                        >
                          Simpan Prestasi
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {content.studentAchievements.map((ach) => (
                      <div key={ach.id} className="p-3.5 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2 text-stone-500">
                            <span className="font-semibold text-emerald-800">{ach.award}</span>
                            <span>·</span>
                            <span>{ach.year}</span>
                          </div>
                          <h4 className="font-bold text-stone-900">{ach.title}</h4>
                          <p className="text-stone-600">{ach.studentNames.join(', ')} ({ach.gradeAndMajor})</p>
                        </div>
                        <button
                          onClick={() => handleDeleteAchievement(ach.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: KELOLA FASILITAS */}
              {activeAdminTab === 'fasilitas' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        Manajemen Fasilitas & Pemeliharaan Sarpras
                      </h3>
                      <p className="text-xs text-stone-500">
                        Kelola data ruang belajar, sudut baca, halaman upacara, dan status kelayakan.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddFacility(!showAddFacility)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showAddFacility ? 'Batal' : 'Tambah Fasilitas'}</span>
                    </button>
                  </div>

                  {showAddFacility && (
                    <form onSubmit={handleCreateFacility} className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs">
                      <h4 className="font-bold text-stone-900">Tambah Fasilitas Baru</h4>
                      <div>
                        <label className="block font-semibold mb-1">Nama Ruang / Fasilitas *</label>
                        <input
                          type="text"
                          required
                          value={newFacility.name}
                          onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                          className="w-full p-2 border rounded bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Kategori</label>
                          <select
                            value={newFacility.category}
                            onChange={(e) => setNewFacility({ ...newFacility, category: e.target.value as any })}
                            className="w-full p-2 border rounded bg-white"
                          >
                            <option value="Pembelajaran">Pembelajaran</option>
                            <option value="Perpustakaan">Perpustakaan / Baca</option>
                            <option value="Olahraga">Olahraga / Halaman</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Kapasitas</label>
                          <input
                            type="text"
                            value={newFacility.capacity}
                            onChange={(e) => setNewFacility({ ...newFacility, capacity: e.target.value })}
                            className="w-full p-2 border rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Kondisi</label>
                          <select
                            value={newFacility.conditionStatus}
                            onChange={(e) => setNewFacility({ ...newFacility, conditionStatus: e.target.value as any })}
                            className="w-full p-2 border rounded bg-white"
                          >
                            <option value="Optimal">Optimal</option>
                            <option value="Sangat Baik (100% Siap Guna)">Sangat Baik (100% Siap Guna)</option>
                            <option value="Pemeliharaan Rutin">Pemeliharaan Rutin</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddFacility(false)}
                          className="px-3 py-1.5 border rounded"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="px-4 py-1.5 bg-emerald-800 text-white rounded font-semibold"
                        >
                          Simpan Fasilitas
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {content.schoolFacilities.map((fac) => (
                      <div key={fac.id} className="p-3.5 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-semibold text-emerald-800">{fac.category}</span>
                          <h4 className="font-bold text-stone-900">{fac.name}</h4>
                          <p className="text-stone-500">
                            {fac.location} · {fac.areaSize} · Kondisi: <strong className="text-stone-800">{fac.conditionStatus}</strong>
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteFacility(fac.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: KELOLA ALUMNI */}
              {activeAdminTab === 'alumni' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        Manajemen & Verifikasi Pendaftaran Alumni
                      </h3>
                      <p className="text-xs text-stone-500">
                        Daftar alumni yang mendaftar online melalui formulir penelusuran lulusan (tracer study).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {content.alumniList.map((alm) => (
                      <div key={alm.id} className="p-3.5 bg-white border border-stone-200 rounded-lg flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-stone-900">{alm.fullName}</h4>
                            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold text-[11px]">
                              Lulusan {alm.graduationYear}
                            </span>
                            <span className="text-stone-400">· {alm.currentLocation}</span>
                          </div>
                          <p className="text-stone-700 font-medium">{alm.currentEducationOrJob}</p>
                          {alm.phoneOrContact && (
                            <p className="text-stone-500 font-mono text-[11px]">Kontak: {alm.phoneOrContact}</p>
                          )}
                          {alm.inspiringMessage && (
                            <p className="text-stone-600 italic">"{alm.inspiringMessage}"</p>
                          )}
                        </div>

                        <button
                          onClick={() => handleDeleteAlumni(alm.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded shrink-0"
                          title="Hapus Data Alumni"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: DANA BANTUAN BOS */}
              {activeAdminTab === 'anggaran' && (
                <div className="space-y-5">
                  <div className="border-b border-stone-200 pb-3">
                    <h3 className="text-base font-bold text-stone-900">
                      Transparansi Alokasi Dana Bantuan Operasional Sekolah (BOS)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Rincian pos penggunaan dana BOS yang dilaporkan secara terbuka kepada warga dan komite.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {content.budgetAllocations.map((alloc, idx) => (
                      <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between text-xs gap-3">
                        <div>
                          <span className="font-bold text-stone-900">{alloc.category}</span>
                          <p className="text-stone-600 text-[11px] mt-0.5">{alloc.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold font-mono text-emerald-800 text-sm">{alloc.percentage}%</span>
                          <span className="block font-mono text-stone-600 text-[11px]">{alloc.amountRupiah}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: KEAMANAN & RESET */}
              {activeAdminTab === 'keamanan' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-200 pb-3">
                    <h3 className="text-base font-bold text-stone-900">
                      Pengaturan Keamanan Akun & Pemulihan Sistem
                    </h3>
                    <p className="text-xs text-stone-500">
                      Ganti kata sandi login admin atau reset database kembali ke data pokok awal.
                    </p>
                  </div>

                  {/* Change Password Form */}
                  <form onSubmit={handleChangePassword} className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs max-w-md">
                    <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-emerald-800" />
                      Ganti Kata Sandi Operator
                    </h4>

                    {pwMessage && (
                      <div className={`p-2 rounded ${pwMessage.isError ? 'bg-rose-50 text-rose-800' : 'bg-emerald-50 text-emerald-800'}`}>
                        {pwMessage.text}
                      </div>
                    )}

                    <div>
                      <label className="block font-semibold mb-1">Kata Sandi Saat Ini</label>
                      <input
                        type="password"
                        required
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        className="w-full p-2 border rounded bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Kata Sandi Baru (Min. 5 karakter)</label>
                      <input
                        type="password"
                        required
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        className="w-full p-2 border rounded bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white rounded font-semibold"
                    >
                      Perbarui Kata Sandi
                    </button>
                  </form>

                  {/* Reset Database */}
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg space-y-2 text-xs">
                    <h4 className="font-bold text-rose-950 flex items-center gap-1.5">
                      <RotateCcw className="w-4 h-4 text-rose-700" />
                      Reset Konten ke Data Pokok Resmi Awal
                    </h4>
                    <p className="text-rose-800">
                      Fitur ini akan mengembalikan seluruh data sekolah (profil SMPS Surya Mandala, kegiatan harian, fasilitas, prestasi, dan alumni) ke kondisi awal resmi.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded font-semibold transition-colors mt-2"
                    >
                      Reset Seluruh Database ke Nilai Awal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 px-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>
            {isLoggedIn ? 'Status: Terhubung ke Server Backend (Port 3000)' : 'Akses Terbatas untuk Pengurus SMPS Surya Mandala'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-stone-300 bg-white hover:bg-stone-100 rounded text-stone-700 font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
