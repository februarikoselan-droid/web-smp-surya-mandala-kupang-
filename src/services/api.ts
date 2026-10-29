// Client-side API Service for SMPS Surya Mandala
import {
  SchoolActivity,
  StudentAchievement,
  SchoolFacility,
  SchoolProgram,
  BudgetAllocation,
  PublicDocument,
  PublicInquiry,
  AlumniRecord
} from '../types/school';
import {
  schoolGeneralInfo,
  todayActivities,
  studentAchievements,
  schoolFacilities,
  initialAlumniList,
  budgetAllocations,
  initialAspirasiList
} from '../data/schoolData';

export interface SchoolContentState {
  generalInfo: {
    name: string;
    jenjang: string;
    naungan: string;
    npsn: string;
    akreditasi: string;
    skPendirian: string;
    skOperasional: string;
    statusSertifikasi: string;
    kepalaSekolah: string;
    operator: string;
    address: string;
    kelurahan: string;
    kecamatan: string;
    kabKota: string;
    provinsi: string;
    email: string;
    jamOperasional: string;
    totalSiswa: number;
    totalPendidik: number;
    rasioGuruSiswa: string;
    kelulusanMelanjutkan: string;
    motto: string;
  };
  todayActivities: SchoolActivity[];
  studentAchievements: StudentAchievement[];
  schoolFacilities: SchoolFacility[];
  alumniList: AlumniRecord[];
  budgetAllocations: BudgetAllocation[];
  aspirasiList: PublicInquiry[];
}

const STORAGE_KEY = 'smps_surya_mandala_content_v1';
const AUTH_KEY = 'smps_surya_mandala_auth_pw';

const defaultState: SchoolContentState = {
  generalInfo: schoolGeneralInfo,
  todayActivities: todayActivities,
  studentAchievements: studentAchievements,
  schoolFacilities: schoolFacilities,
  alumniList: initialAlumniList,
  budgetAllocations: budgetAllocations,
  aspirasiList: initialAspirasiList
};

function getLocalState(): SchoolContentState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return defaultState;
}

function setLocalState(state: SchoolContentState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

export const api = {
  // 1. Fetch full public content
  async getContent(): Promise<SchoolContentState> {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setLocalState(data);
        return data;
      }
    } catch (e) {
      // Fallback to local storage
    }
    return getLocalState();
  },

  // 2. Auth: Login
  async login(username: string, password: string) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback for static hosts
    }

    // Static / Local fallback check
    const savedPw = (typeof window !== 'undefined' && localStorage.getItem(AUTH_KEY)) || 'suryamandala2013';
    if (username === 'admin' && password === savedPw) {
      return {
        success: true,
        message: 'Login operator berhasil',
        token: `auth_${Date.now()}`,
        user: {
          username: 'admin',
          role: 'Operator & Administrator Sekolah',
          schoolName: 'SMPS SURYA MANDALA'
        }
      };
    }

    return {
      success: false,
      message: 'Username atau kata sandi tidak valid. Hubungi operator sekolah.'
    };
  },

  async changePassword(currentPassword: string, newPassword: string) {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback for static hosts
    }

    const savedPw = (typeof window !== 'undefined' && localStorage.getItem(AUTH_KEY)) || 'suryamandala2013';
    if (currentPassword !== savedPw) {
      return { success: false, message: 'Kata sandi saat ini salah.' };
    }
    if (!newPassword || newPassword.length < 5) {
      return { success: false, message: 'Kata sandi baru minimal 5 karakter.' };
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, newPassword);
    }
    return { success: true, message: 'Kata sandi berhasil diperbarui.' };
  },

  // 3. Update General Info
  async updateGeneralInfo(data: Partial<SchoolContentState['generalInfo']>) {
    const local = getLocalState();
    local.generalInfo = { ...local.generalInfo, ...data };
    setLocalState(local);

    try {
      const res = await fetch('/api/content/general-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Profil sekolah berhasil diperbarui', generalInfo: local.generalInfo };
  },

  // 4. Activities
  async addActivity(data: Omit<SchoolActivity, 'id'>) {
    const local = getLocalState();
    const newAct: SchoolActivity = {
      id: `act-${Date.now()}`,
      ...data
    };
    local.todayActivities = [newAct, ...(local.todayActivities || [])];
    setLocalState(local);

    try {
      const res = await fetch('/api/content/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Kegiatan berhasil ditambahkan', activity: newAct };
  },

  async updateActivity(id: string, data: Partial<SchoolActivity>) {
    const local = getLocalState();
    const idx = (local.todayActivities || []).findIndex(a => a.id === id);
    if (idx !== -1) {
      local.todayActivities[idx] = { ...local.todayActivities[idx], ...data };
      setLocalState(local);
    }

    try {
      const res = await fetch(`/api/content/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Kegiatan berhasil diperbarui' };
  },

  async deleteActivity(id: string) {
    const local = getLocalState();
    local.todayActivities = (local.todayActivities || []).filter(a => a.id !== id);
    setLocalState(local);

    try {
      const res = await fetch(`/api/content/activities/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Kegiatan berhasil dihapus' };
  },

  // 5. Achievements
  async addAchievement(data: Omit<StudentAchievement, 'id'>) {
    const local = getLocalState();
    const newAch: StudentAchievement = {
      id: `ach-${Date.now()}`,
      ...data
    };
    local.studentAchievements = [newAch, ...(local.studentAchievements || [])];
    setLocalState(local);

    try {
      const res = await fetch('/api/content/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Prestasi siswa berhasil ditambahkan', achievement: newAch };
  },

  async updateAchievement(id: string, data: Partial<StudentAchievement>) {
    const local = getLocalState();
    const idx = (local.studentAchievements || []).findIndex(a => a.id === id);
    if (idx !== -1) {
      local.studentAchievements[idx] = { ...local.studentAchievements[idx], ...data };
      setLocalState(local);
    }

    try {
      const res = await fetch(`/api/content/achievements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Prestasi berhasil diperbarui' };
  },

  async deleteAchievement(id: string) {
    const local = getLocalState();
    local.studentAchievements = (local.studentAchievements || []).filter(a => a.id !== id);
    setLocalState(local);

    try {
      const res = await fetch(`/api/content/achievements/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Prestasi berhasil dihapus' };
  },

  // 6. Facilities
  async addFacility(data: Omit<SchoolFacility, 'id'>) {
    const local = getLocalState();
    const newFac: SchoolFacility = {
      id: `fac-${Date.now()}`,
      ...data
    };
    local.schoolFacilities = [...(local.schoolFacilities || []), newFac];
    setLocalState(local);

    try {
      const res = await fetch('/api/content/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Fasilitas berhasil ditambahkan', facility: newFac };
  },

  async updateFacility(id: string, data: Partial<SchoolFacility>) {
    const local = getLocalState();
    const idx = (local.schoolFacilities || []).findIndex(f => f.id === id);
    if (idx !== -1) {
      local.schoolFacilities[idx] = { ...local.schoolFacilities[idx], ...data };
      setLocalState(local);
    }

    try {
      const res = await fetch(`/api/content/facilities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Data fasilitas berhasil diperbarui' };
  },

  async deleteFacility(id: string) {
    const local = getLocalState();
    local.schoolFacilities = (local.schoolFacilities || []).filter(f => f.id !== id);
    setLocalState(local);

    try {
      const res = await fetch(`/api/content/facilities/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Fasilitas berhasil dihapus' };
  },

  // 7. Alumni
  async addAlumni(data: Omit<AlumniRecord, 'id' | 'verified'>) {
    const local = getLocalState();
    const newAlm: AlumniRecord = {
      id: `alm-${Date.now()}`,
      verified: true,
      ...data
    };
    local.alumniList = [newAlm, ...(local.alumniList || [])];
    setLocalState(local);

    try {
      const res = await fetch('/api/content/alumni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Data alumni berhasil dicatat', alumni: newAlm };
  },

  async updateAlumni(id: string, data: Partial<AlumniRecord>) {
    const local = getLocalState();
    const idx = (local.alumniList || []).findIndex(a => a.id === id);
    if (idx !== -1) {
      local.alumniList[idx] = { ...local.alumniList[idx], ...data };
      setLocalState(local);
    }

    try {
      const res = await fetch(`/api/content/alumni/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Data alumni berhasil diperbarui' };
  },

  async deleteAlumni(id: string) {
    const local = getLocalState();
    local.alumniList = (local.alumniList || []).filter(a => a.id !== id);
    setLocalState(local);

    try {
      const res = await fetch(`/api/content/alumni/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Data alumni berhasil dihapus' };
  },

  // 8. Budget
  async updateBudget(budgetAllocations: BudgetAllocation[]) {
    const local = getLocalState();
    local.budgetAllocations = budgetAllocations;
    setLocalState(local);

    try {
      const res = await fetch('/api/content/budget', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgetAllocations })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Alokasi anggaran BOS berhasil diperbarui', budgetAllocations };
  },

  // 9. Inquiries
  async submitInquiry(data: { fullName: string; emailOrPhone: string; role: any; topic: any; message: string }) {
    const local = getLocalState();
    const count = (local.aspirasiList || []).length;
    const newInquiry: PublicInquiry = {
      id: `asp-${Date.now()}`,
      ticketNumber: `ASP-SMPS-${String(count + 45).padStart(3, '0')}`,
      timestamp: 'Baru Saja',
      status: 'Diterima & Diverifikasi',
      ...data
    };
    local.aspirasiList = [newInquiry, ...(local.aspirasiList || [])];
    setLocalState(local);

    try {
      const res = await fetch('/api/content/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Aspirasi berhasil dikirim', inquiry: newInquiry };
  },

  async updateInquiryStatus(id: string, status: 'Diterima & Diverifikasi' | 'Ditindaklanjuti') {
    const local = getLocalState();
    const idx = (local.aspirasiList || []).findIndex(a => a.id === id);
    if (idx !== -1) {
      local.aspirasiList[idx] = { ...local.aspirasiList[idx], status };
      setLocalState(local);
    }

    try {
      const res = await fetch(`/api/content/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Status aspirasi berhasil diperbarui' };
  },

  // 10. Reset
  async resetToDefault() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(AUTH_KEY);
    }

    try {
      const res = await fetch('/api/content/reset', { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {}

    return { success: true, message: 'Konten berhasil di-reset ke nilai awal resmi' };
  }
};
