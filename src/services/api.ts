// Client-side API Service for SMPS Surya Mandala Backend
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

export const api = {
  // 1. Fetch full public content
  async getContent(): Promise<SchoolContentState> {
    const res = await fetch('/api/content');
    if (!res.ok) {
      throw new Error('Gagal memuat data dari server');
    }
    return res.json();
  },

  // 2. Auth
  async login(username: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return res.json();
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return res.json();
  },

  // 3. Update General Info
  async updateGeneralInfo(data: Partial<SchoolContentState['generalInfo']>) {
    const res = await fetch('/api/content/general-info', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // 4. Activities
  async addActivity(data: Omit<SchoolActivity, 'id'>) {
    const res = await fetch('/api/content/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateActivity(id: string, data: Partial<SchoolActivity>) {
    const res = await fetch(`/api/content/activities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteActivity(id: string) {
    const res = await fetch(`/api/content/activities/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // 5. Achievements
  async addAchievement(data: Omit<StudentAchievement, 'id'>) {
    const res = await fetch('/api/content/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateAchievement(id: string, data: Partial<StudentAchievement>) {
    const res = await fetch(`/api/content/achievements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteAchievement(id: string) {
    const res = await fetch(`/api/content/achievements/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // 6. Facilities
  async addFacility(data: Omit<SchoolFacility, 'id'>) {
    const res = await fetch('/api/content/facilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateFacility(id: string, data: Partial<SchoolFacility>) {
    const res = await fetch(`/api/content/facilities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteFacility(id: string) {
    const res = await fetch(`/api/content/facilities/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // 7. Alumni
  async addAlumni(data: Omit<AlumniRecord, 'id' | 'verified'>) {
    const res = await fetch('/api/content/alumni', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateAlumni(id: string, data: Partial<AlumniRecord>) {
    const res = await fetch(`/api/content/alumni/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteAlumni(id: string) {
    const res = await fetch(`/api/content/alumni/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // 8. Budget
  async updateBudget(budgetAllocations: BudgetAllocation[]) {
    const res = await fetch('/api/content/budget', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budgetAllocations })
    });
    return res.json();
  },

  // 9. Inquiries
  async submitInquiry(data: { fullName: string; emailOrPhone: string; role: any; topic: any; message: string }) {
    const res = await fetch('/api/content/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateInquiryStatus(id: string, status: string) {
    const res = await fetch(`/api/content/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // 10. Reset
  async resetToDefault() {
    const res = await fetch('/api/content/reset', {
      method: 'POST'
    });
    return res.json();
  }
};
