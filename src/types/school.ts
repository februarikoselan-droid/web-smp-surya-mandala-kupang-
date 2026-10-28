export type ActivityCategory = 'Semua' | 'Akademik' | 'Laboratorium' | 'Ekstrakurikuler' | 'Karakter & Sosial' | 'Komite';

export interface DailyScheduleItem {
  id: string;
  timeSlot: string; // e.g. "06.45 - 07.15"
  title: string;
  category: 'Rutinitas' | 'Pembelajaran' | 'Istirahat' | 'Karakter' | 'Pengembangan';
  location: string;
  description: string;
  coordinator: string;
}

export interface SchoolActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  category: ActivityCategory;
  location: string;
  leadTeacher: string;
  studentParticipantCount: number;
  summary: string;
  detailedObjectives: string[];
  transparencyNotes: string;
  documentationImage?: string;
  status: 'Selesai' | 'Sedang Berlangsung' | 'Terjadwal Hari Ini' | 'Mendatang';
}

export type AchievementCategory = 'Semua' | 'Sains & Robotika' | 'Bahasa & Debat' | 'Seni & Desain' | 'Olahraga' | 'Karya Ilmiah';
export type AchievementLevel = 'Semua' | 'Internasional' | 'Nasional' | 'Provinsi' | 'Kota';

export interface StudentAchievement {
  id: string;
  title: string;
  competition: string;
  organizer: string;
  award: string; // e.g., "Medali Emas (Gold Medal)"
  studentNames: string[];
  gradeAndMajor: string; // e.g., "Kelas XII MIPA 1"
  mentor: string;
  year: number;
  dateAchieved: string;
  category: AchievementCategory;
  level: AchievementLevel;
  description: string;
  impactAndTakeaways: string;
  image?: string;
  certificateRef: string;
}

export type FacilityCategory = 'Semua' | 'Laboratorium' | 'Perpustakaan' | 'Olahraga' | 'Pembelajaran' | 'Kesehatan & Ekologi';

export interface SchoolFacility {
  id: string;
  name: string;
  category: FacilityCategory;
  image: string;
  capacity: string;
  areaSize: string;
  location: string;
  conditionStatus: 'Sangat Baik (100% Siap Guna)' | 'Optimal' | 'Pemeliharaan Rutin';
  lastInspectionDate: string;
  roomCustodian: string;
  keyFeatures: string[];
  equipmentList: string[];
  transparencyProtocol: string;
}

export interface SchoolProgram {
  id: string;
  title: string;
  badgeKicker: string;
  targetAudience: string;
  curriculumFramework: string;
  duration: string;
  description: string;
  coreCompetencies: string[];
  alumniOutcome: string;
  partnerInstitutions: string[];
  coordinator: string;
}

export interface PublicTransparencyMetric {
  id: string;
  title: string;
  value: string;
  subtext: string;
  category: string;
  verificationSource: string;
}

export interface BudgetAllocation {
  category: string;
  percentage: number;
  amountRupiah: string;
  description: string;
  supervisor: string;
}

export interface PublicDocument {
  id: string;
  title: string;
  code: string;
  publishedDate: string;
  fileSize: string;
  summary: string;
  downloadUrl: string;
}

export interface PublicInquiry {
  id: string;
  ticketNumber: string;
  fullName: string;
  emailOrPhone: string;
  role: 'Orang Tua' | 'Alumni' | 'Masyarakat Umum' | 'Siswa' | 'Mitra Pendidikan';
  topic: 'Fasilitas & Sarpras' | 'Transparansi Anggaran' | 'Akademik & PPDB' | 'Apresiasi & Saran';
  message: string;
  timestamp: string;
  status: 'Diterima & Diverifikasi' | 'Ditindaklanjuti';
}

export interface AlumniRecord {
  id: string;
  fullName: string;
  graduationYear: number;
  currentEducationOrJob: string;
  currentLocation: string;
  phoneOrContact?: string;
  inspiringMessage: string;
  contributionWillingness: 'Berbagi Pengalaman / Motivasi' | 'Donasi Buku & Alat Tulis' | 'Bantuan Belajar Adik Kelas' | 'Networking Alumni';
  verified: boolean;
}

