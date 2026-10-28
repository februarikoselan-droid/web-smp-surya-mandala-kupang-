import {
  DailyScheduleItem,
  SchoolActivity,
  StudentAchievement,
  SchoolFacility,
  SchoolProgram,
  PublicTransparencyMetric,
  BudgetAllocation,
  PublicDocument,
  PublicInquiry,
  AlumniRecord
} from '../types/school';

// Authentic images reflecting Indonesian community school ("sekolah rakyat") in Kupang, NTT
export const schoolImages = {
  heroCampus: '/src/assets/images/hero_smp_surya_mandala_1793208894892.jpg',
  classroom: '/src/assets/images/classroom_learning_smp_1793208896542.jpg',
  library: '/src/assets/images/reading_corner_library_1793208897708.jpg',
  ceremony: '/src/assets/images/ceremony_activities_smp_1793208897945.jpg',
  alumni: '/src/assets/images/alumni_community_ntt_1793208898780.jpg',
};

export const schoolGeneralInfo = {
  name: 'SMPS SURYA MANDALA',
  jenjang: 'Sekolah Menengah Pertama (SMP) Swasta',
  naungan: 'Kementerian Pendidikan dan Kebudayaan',
  npsn: '69830131',
  akreditasi: 'C (SK No. 760/BAN-SM/SK/2019 · 09 September 2019)',
  skPendirian: 'DIS.PPO 801/33/2013 (17 Juli 2013)',
  skOperasional: 'DIS.PPO.801/SEK/233/2013 (17 Juli 2013)',
  statusSertifikasi: 'Belum Bersertifikat',
  kepalaSekolah: 'Bendelina Mata',
  operator: 'Bernadetha Berlindis Sati Blikololong',
  address: 'Jl. Timor Raya Gang Monitor, Kelurahan Oesapa, Kec. Kelapa Lima, Kota Kupang, Nusa Tenggara Timur',
  kelurahan: 'Oesapa',
  kecamatan: 'Kec. Kelapa Lima',
  kabKota: 'Kota Kupang',
  provinsi: 'Nusa Tenggara Timur (NTT)',
  email: 'ntt.smpsuryamandalakupang@yahoo.com',
  jamOperasional: 'Senin – Sabtu: 07.00 – 13.00 WITA',
  totalSiswa: 84,
  totalPendidik: 2, // Sesuai data pokok resmi sekolah
  rasioGuruSiswa: '1 : 42',
  kelulusanMelanjutkan: '100% Siswa Lulus Melanjutkan ke SMA/SMK',
  motto: 'Ketulusan Mendidik, Mencerdaskan Anak Bangsa di Pesisir Kupang'
};

export const dailyRoutineSchedule: DailyScheduleItem[] = [
  {
    id: 'sch-1',
    timeSlot: '07.00 - 07.25 WITA',
    title: 'Apel Pagi, Doa Bersama & Gotong Royong Kebersihan',
    category: 'Rutinitas',
    location: 'Halaman Sekolah & Teras Kelas',
    description: 'Siswa dan guru berkumpul di halaman sekolah beralas kerikil untuk menyanyikan lagu Indonesia Raya, doa pagi bersama, serta menyapu pekarangan kelas.',
    coordinator: 'Bendelina Mata (Kepala Sekolah)'
  },
  {
    id: 'sch-2',
    timeSlot: '07.25 - 09.30 WITA',
    title: 'Sesi Pembelajaran Jam Ke-1 s/d Ke-3 (Bahasa & Literasi Dasar)',
    category: 'Pembelajaran',
    location: 'Ruang Kelas VII, VIII, IX',
    description: 'Pembelajaran Bahasa Indonesia, penguatan kemampuan membaca pemahaman, menulis karangan, dan tata bahasa dengan buku tematik bantuan Kemendikbud.',
    coordinator: 'Guru Mata Pelajaran'
  },
  {
    id: 'sch-3',
    timeSlot: '09.30 - 09.50 WITA',
    title: 'Istirahat Pagi & Sarapan Bersama di Bawah Pohon',
    category: 'Istirahat',
    location: 'Halaman Sekolah & Teras Depan',
    description: 'Istirahat sejenak, siswa menyantap bekal rumahan bersama di teras sekolah yang dinaungi pepohonan rindang.',
    coordinator: 'Bernadetha Berlindis Sati Blikololong'
  },
  {
    id: 'sch-4',
    timeSlot: '09.50 - 11.45 WITA',
    title: 'Sesi Pembelajaran Jam Ke-4 s/d Ke-6 (Matematika & IPA Lingkungan)',
    category: 'Pembelajaran',
    location: 'Ruang Kelas Sederhana',
    description: 'Praktek berhitung sederhana, pemahaman konsep dasar sains lingkungan pesisir Oesapa, dan pemeliharaan keanekaragaman hayati sekitar teluk Kupang.',
    coordinator: 'Dewan Pendidik SMPS Surya Mandala'
  },
  {
    id: 'sch-5',
    timeSlot: '11.45 - 13.00 WITA',
    title: 'Pengembangan Budi Pekerti, Seni Budaya & Pramuka',
    category: 'Pengembangan',
    location: 'Halaman Utama & Sudut Baca',
    description: 'Kegiatan ekstrakurikuler kepramukaan penggalang, latihan tari daerah Timor NTT, dan bimbingan akhlak serta toleransi persaudaraan.',
    coordinator: 'Tim Pendidik & Pembina Pramuka'
  }
];

export const todayActivities: SchoolActivity[] = [
  {
    id: 'act-1',
    title: 'Apel Pagi Khidmat & Pembacaan Teks Pancasila Bersama',
    date: 'Hari Ini, 28 Oktober 2026',
    time: '07.00 - 07.30 WITA',
    category: 'Karakter & Sosial',
    location: 'Halaman Sekolah SMPS Surya Mandala, Gang Monitor',
    leadTeacher: 'Bendelina Mata (Kepala Sekolah)',
    studentParticipantCount: 84,
    summary: 'Seluruh 84 siswa berkumpul dengan seragam putih-biru lengkap untuk menumbuhkan rasa cinta tanah air dan disiplin belajar.',
    detailedObjectives: [
      'Penanaman nilai budi pekerti dan saling menghargai antar sesama kawan',
      'Pemeriksaan kerapian seragam dan kebersihan kuku/tangan siswa',
      'Pemberian amanat pentingnya melanjutkan sekolah ke jenjang SMA/SMK'
    ],
    transparencyNotes: 'Kegiatan rutin tanpa dipungut biaya apapun; dipimpin langsung oleh Kepala Sekolah bersama seluruh siswa.',
    documentationImage: schoolImages.ceremony,
    status: 'Sedang Berlangsung'
  },
  {
    id: 'act-2',
    title: 'Pemanfaatan Sudut Baca & Gerakan Gemar Membaca Buku Bantuan',
    date: 'Hari Ini, 28 Oktober 2026',
    time: '10.00 - 11.30 WITA',
    category: 'Akademik',
    location: 'Ruang Sudut Baca SMPS Surya Mandala',
    leadTeacher: 'Bernadetha Berlindis Sati Blikololong',
    studentParticipantCount: 28,
    summary: 'Siswa kelas VIII membaca bergantian buku ilmu pengetahuan dan kumpulan dongeng cerita rakyat Nusantara.',
    detailedObjectives: [
      'Meningkatkan daya serap kosakata bahasa Indonesia siswa',
      'Membiasakan budaya membaca mandiri 20 menit sebelum pulang',
      'Perawatan dan penyusunan kembali buku pada rak kayu sederhana'
    ],
    transparencyNotes: 'Koleksi buku berasal dari bantuan BOS Kinerja Kemendikbud dan sumbangan ikatan alumni peduli pendidikan.',
    documentationImage: schoolImages.library,
    status: 'Terjadwal Hari Ini'
  },
  {
    id: 'act-3',
    title: 'Aksi Bersih Lingkungan Pesisir & Gotong Royong Oesapa Berseri',
    date: '26 Oktober 2026',
    time: '07.30 - 09.00 WITA',
    category: 'Karakter & Sosial',
    location: 'Kawasan Sekitar Gang Monitor & Lingkungan Pesisir Oesapa',
    leadTeacher: 'Tim Guru SMPS Surya Mandala',
    studentParticipantCount: 65,
    summary: 'Siswa bergotong-royong mengumpulkan sampah plastik di sepanjang jalan akses sekolah dan menanam bibit bunga di pot teras sekolah.',
    detailedObjectives: [
      'Menumbuhkan kepedulian nyata terhadap kebersihan pesisir Kupang',
      'Mengajarkan pemilahan sampah organik dan anorganik sederhana',
      'Membangun rasa memiliki lingkungan sekolah yang nyaman dan asri'
    ],
    transparencyNotes: 'Peralatan sapu lidi dan karung disediakan sekolah dari dana operasional pemeliharaan lingkungan.',
    documentationImage: schoolImages.heroCampus,
    status: 'Selesai'
  },
  {
    id: 'act-4',
    title: 'Latihan Kepramukaan Penggalang: Tali-Temali & Sandi Dasar',
    date: '24 Oktober 2026',
    time: '14.00 - 16.00 WITA',
    category: 'Ekstrakurikuler',
    location: 'Halaman Sekolah SMPS Surya Mandala',
    leadTeacher: 'Pembina Pramuka Relawan & Alumni',
    studentParticipantCount: 45,
    summary: 'Latihan mingguan kepramukaan untuk melatih jiwa kepemimpinan, kemandirian, dan kerjasama tim siswa SMP.',
    detailedObjectives: [
      'Penguasaan 5 simpul tali dasar untuk kegunaan tenda darurat',
      'Latihan semaphore dan sandi kotak untuk ketajaman berpikir',
      'Pembentukan karakter saling tolong-menolong tanpa membedakan'
    ],
    transparencyNotes: 'Didampingi oleh kakak-kakak alumni yang kini aktif di gugus depan penegak SMA Kota Kupang secara sukarela.',
    documentationImage: schoolImages.classroom,
    status: 'Selesai'
  }
];

export const studentAchievements: StudentAchievement[] = [
  {
    id: 'ach-1',
    title: 'Juara Harapan I Lomba Gerak Jalan Ketepatan Waktu Tingkat SMP',
    competition: 'Peringatan Hari Kemerdekaan Republik Indonesia ke-79',
    organizer: 'Kecamatan Kelapa Lima & Dispora Kota Kupang',
    award: 'Juara Harapan I & Regu Terdisiplin',
    studentNames: ['Regu Putra-Putri SMPS Surya Mandala (18 Siswa)'],
    gradeAndMajor: 'Gabungan Siswa Kelas VII – IX',
    mentor: 'Bendelina Mata & Pendidik Pembina',
    year: 2024,
    dateAchieved: '15 Agustus 2024',
    category: 'Olahraga',
    level: 'Kota',
    description: 'Dengan perlengkapan seragam putih-biru sederhana namun bersemangat juang tinggi, siswa SMPS Surya Mandala mampu menempuh rute 5 km dengan ketepatan waktu tinggi dan kerapian barisan yang menuai pujian warga.',
    impactAndTakeaways: 'Membuktikan bahwa dengan keterbatasan sarana, kedisiplinan dan rasa percaya diri siswa tetap bersinar di tingkat kecamatan dan kota.',
    image: schoolImages.ceremony,
    certificateRef: 'SK-HUT-RI-KLP-LIMA-2024'
  },
  {
    id: 'ach-2',
    title: '100% Kelulusan & Seluruh Lulusan Melanjutkan ke SMA/SMK',
    competition: 'Asesmen Sumatif Akhir Jenjang SMP Kota Kupang',
    organizer: 'Dinas Pendidikan dan Kebudayaan Kota Kupang',
    award: 'Tingkat Kelulusan Sempurna 100%',
    studentNames: ['Seluruh 27 Siswa Angkatan Lulusan 2024'],
    gradeAndMajor: 'Kelas IX SMPS Surya Mandala',
    mentor: 'Bendelina Mata & Bernadetha Berlindis Sati Blikololong',
    year: 2024,
    dateAchieved: '10 Juni 2024',
    category: 'Karya Ilmiah',
    level: 'Kota',
    description: 'Semua siswa kelas IX berhasil menuntaskan seluruh mata pelajaran dan lulus dengan predikat baik. Yang paling membanggakan, seluruh siswa berhasil difasilitasi mendaftar dan diterima di SMK & SMA di Kota Kupang.',
    impactAndTakeaways: 'Mencegah terjadinya anak putus sekolah di wilayah Kelurahan Oesapa, membuka harapan masa depan yang lebih baik bagi keluarga.',
    image: schoolImages.classroom,
    certificateRef: 'DISDIK-KUPANG-LULUS-2024'
  },
  {
    id: 'ach-3',
    title: 'Juara 2 Lomba Menuturkan Cerita Rakyat NTT Gugus Kelapa Lima',
    competition: 'Festival Literasi Siswa SMP Tingkat Gugus Oesapa',
    organizer: 'Musyawarah Kerja Kepala Sekolah (MKKS) SMP Kota Kupang',
    award: 'Juara 2 Cerita Rakyat Tradisional',
    studentNames: ['Maria Yuliana Koro'],
    gradeAndMajor: 'Kelas VIII SMPS Surya Mandala',
    mentor: 'Ibu Bendelina Mata',
    year: 2023,
    dateAchieved: '28 Oktober 2023',
    category: 'Bahasa & Debat',
    level: 'Kota',
    description: 'Menampilkan dongeng asal-usul Teluk Kupang dan kearifan lokal suku Rote-Timor dengan artikulasi vokal yang jernih, penuh penghayatan, dan pakaian adat sederhana tenun NTT.',
    impactAndTakeaways: 'Menghidupkan kembali kebanggaan generasi muda terhadap warisan lisan leluhur Nusa Tenggara Timur.',
    image: schoolImages.library,
    certificateRef: 'MKKS-LIT-NTT-2023-018'
  },
  {
    id: 'ach-4',
    title: 'Apresiasi Partisipasi Aktif Gerakan Pramuka Peduli Lingkungan',
    competition: 'Kemah Bakti Pramuka Penggalang Kwarran Kelapa Lima',
    organizer: 'Kwartir Ranting Gerakan Pramuka Kelapa Lima, Kota Kupang',
    award: 'Piagam Penghargaan Kontingen Berdedikasi',
    studentNames: ['Pasukan Penggalang Surya Mandala (12 Siswa)'],
    gradeAndMajor: 'Kelas VII & VIII',
    mentor: 'Pembina Gudep SMPS Surya Mandala',
    year: 2023,
    dateAchieved: '14 November 2023',
    category: 'Seni & Desain',
    level: 'Kota',
    description: 'Berhasil menyelesaikan misi penanaman pohon mangrove di pesisir Oesapa serta menampilkan atraksi api unggun dengan kekompakan tinggi.',
    impactAndTakeaways: 'Membangun jejaring persahabatan dengan siswa-siswi dari sekolah lain di Kota Kupang.',
    image: schoolImages.ceremony,
    certificateRef: 'KWARRAN-KL-PRAMUKA-2023'
  }
];

export const schoolFacilities: SchoolFacility[] = [
  {
    id: 'fac-1',
    name: 'Ruang Kelas Belajar Sederhana & Berventilasi Alami',
    category: 'Pembelajaran',
    image: schoolImages.classroom,
    capacity: '3 Ruang Kelas (Total 84 Siswa: VII, VIII, IX)',
    areaSize: '3 x 48 m²',
    location: 'Gedung Utama, Jl. Timor Raya Gang Monitor',
    conditionStatus: 'Optimal',
    lastInspectionDate: '10 Oktober 2026',
    roomCustodian: 'Bendelina Mata (Penanggung Jawab Sekolah)',
    keyFeatures: [
      'Meja dan bangku kayu panjang yang kokoh untuk dua siswa',
      'Papan tulis kapur dan papan tulis spidol (whiteboard) bersih',
      'Jendela kayu lebar menghadap taman untuk aliran angin sejuk alami pesisir Oesapa',
      'Gambar pahlawan nasional, teks Pancasila, dan jadwal piket harian'
    ],
    equipmentList: [
      '42 Set Meja dan Kursi Kayu Siswa',
      '3 Unit Papan Tulis Ganda (Chalkboard & Whiteboard)',
      'Lemari Arsip Buku Ajar Guru di Setiap Kelas',
      'Kotak P3K Sederhana di Dinding Kelas'
    ],
    transparencyProtocol: 'Perbaikan meja kursi yang rusak dilakukan secara swadaya bersama komite sekolah dengan bahan kayu lokal agar anak-anak selalu dapat belajar dengan nyaman.'
  },
  {
    id: 'fac-2',
    name: 'Sudut Baca Literasi & Rak Buku Bantuan Kemendikbud',
    category: 'Perpustakaan',
    image: schoolImages.library,
    capacity: '15 - 20 Siswa / Sesi',
    areaSize: '36 m²',
    location: 'Sayap Samping Ruang Guru',
    conditionStatus: 'Optimal',
    lastInspectionDate: '15 Oktober 2026',
    roomCustodian: 'Bernadetha Berlindis Sati Blikololong',
    keyFeatures: [
      'Koleksi buku tematik Kurikulum Nasional resmi untuk seluruh siswa',
      'Buku bacaan cerita rakyat NTT, ensiklopedia pengetahuan alam, dan majalah anak',
      'Meja baca kayu bersama untuk belajar kelompok setelah jam pulang sekolah',
      'Layanan peminjaman buku gratis tanpa pungutan jaminan'
    ],
    equipmentList: [
      '4 Unit Rak Buku Kayu Solid',
      '1 Set Meja Baca Panjang & Bangku Kayu',
      'Buku Paket Bantuan Kemendikbud RI (Lengkap Kelas VII, VIII, IX)',
      'Buku Cerita Donasi Komunitas Relawan Pendidikan Kupang'
    ],
    transparencyProtocol: 'Daftar buku inventaris tercatat pada buku induk perpustakaan dan dilaporkan rutin ke Sistem Informasi Perbukuan Kemendikbud.'
  },
  {
    id: 'fac-3',
    name: 'Halaman Upacara & Lapangan Olahraga Serbaguna',
    category: 'Olahraga',
    image: schoolImages.heroCampus,
    capacity: '120 Orang (Seluruh Siswa, Guru & Wali Murid)',
    areaSize: '350 m²',
    location: 'Halaman Depan Sekolah',
    conditionStatus: 'Sangat Baik (100% Siap Guna)',
    lastInspectionDate: '05 Oktober 2026',
    roomCustodian: 'Tim Sekolah & Pembina Olahraga',
    keyFeatures: [
      'Tiang bendera merah putih dari besi berdiri kokoh di tengah halaman',
      'Permukaan kerikil halus dan tanah padat yang terawat dan bersih dari sampah',
      'Pohon peneduh tropis yang teduh untuk berkumpul saat jam istirahat',
      'Dapat difungsikan sebagai lapangan voli mini dan arena senam kesegaran jasmani'
    ],
    equipmentList: [
      '1 Tiang Bendera Besi Standar Upacara',
      'Bola Voli, Bola Sepak & Net Portabel Sederhana',
      'Pengeras Suara Megafon Manual untuk Upacara Pagi',
      'Tong Sampah Pemilahan Swadaya di Sekeliling Halaman'
    ],
    transparencyProtocol: 'Kebersihan lapangan dijaga bersama melalui jadwal gotong royong piket siswa setiap hari Jumat pagi.'
  },
  {
    id: 'fac-4',
    name: 'Ruang Kantor Kepala Sekolah & Administrasi Operator',
    category: 'Pembelajaran',
    image: schoolImages.alumni,
    capacity: '6 - 10 Orang',
    areaSize: '24 m²',
    location: 'Pintu Depan Gedung Sekolah',
    conditionStatus: 'Optimal',
    lastInspectionDate: '12 Oktober 2026',
    roomCustodian: 'Bernadetha Berlindis Sati Blikololong (Operator Dapodik)',
    keyFeatures: [
      'Meja kerja Kepala Sekolah Ibu Bendelina Mata untuk konsultasi wali murid',
      'Meja administrasi operator untuk pemutakhiran data pokok pendidikan (Dapodik)',
      'Papan data dinding memuat struktur organisasi, kalender pendidikan, dan data siswa',
      'Tempat penerimaan tamu masyarakat, donatur, dan pendataan alumni'
    ],
    equipmentList: [
      '1 Unit Laptop untuk Penginputan Data Pokok Pendidikan (Dapodik)',
      'Printer Dokumen & Pindaian Surat',
      'Lemari Arsip Berkas Ijazah & Buku Induk Siswa',
      'Buku Tamu & Buku Register Penelusuran Alumni'
    ],
    transparencyProtocol: 'Segala pengurusan surat keterangan siswa, surat pindah, dan legalisir ijazah dilayani tanpa dipungut biaya apapun.'
  }
];

export const schoolPrograms: SchoolProgram[] = [
  {
    id: 'prog-1',
    title: 'Program Sekolah Terjangkau & Bantuan Biaya untuk Keluarga Pesisir',
    badgeKicker: 'Pendidikan Merata',
    targetAudience: 'Anak-anak Usia SMP di Oesapa & Sekitarnya',
    curriculumFramework: 'Pemberdayaan Pendidikan Inklusif Tanpa Beban Finansial Berat',
    duration: '3 Tahun Penuh (Kelas VII – IX)',
    description: 'Memastikan tidak ada anak usia 12–15 tahun di wilayah Kelurahan Oesapa dan Kecamatan Kelapa Lima yang putus sekolah karena kendala biaya. Kami memfasilitasi perlengkapan dan seragam bagi yang membutuhkan.',
    coreCompetencies: [
      'Tuntas belajar pendidikan dasar 9 tahun',
      'Pembiasaan disiplin dan kejujuran dalam kehidupan sehari-hari',
      'Kemandirian menyelesaikan tugas dengan bimbingan pendidik berdedikasi',
      'Rasa percaya diri yang setara dengan anak-anak dari sekolah lain'
    ],
    alumniOutcome: '100% siswa lulus berhasil melanjutkan ke SMA atau SMK impian mereka di Kota Kupang.',
    partnerInstitutions: ['Dinas Pendidikan & Kebudayaan Kota Kupang', 'Komite Sekolah Warga Oesapa', 'Gereja & Tokoh Masyarakat Setempat'],
    coordinator: 'Bendelina Mata (Kepala Sekolah)'
  },
  {
    id: 'prog-2',
    title: 'Penguatan Literasi Dasar, Membaca Pemahaman & Matematika Kehidupan',
    badgeKicker: 'Akademik Dasar',
    targetAudience: 'Seluruh 84 Siswa SMPS Surya Mandala',
    curriculumFramework: 'Kurikulum Nasional dengan Pendekatan Remedial Ramah Siswa',
    duration: 'Sepanjang Tahun Ajaran',
    description: 'Guru mendampingi secara intensif siswa yang membutuhkan bimbingan membaca, menulis, dan berhitung praktis dengan pendekatan sabar dan penuh kasih sayang.',
    coreCompetencies: [
      'Kemampuan membaca teks bacaan panjang dengan pemahaman baik',
      'Kecakapan berhitung angka, pecahan, dan perhitungan jual-beli sehari-hari',
      'Keberanian bertanya dan mengemukakan pendapat di depan kelas',
      'Pemahaman ilmu pengetahuan alam yang berkaitan dengan ekosistem laut & pesisir'
    ],
    alumniOutcome: 'Siswa memiliki modal kemampuan dasar yang kokoh saat masuk ke SMK teknik, pariwisata, maupun SMA.',
    partnerInstitutions: ['Komunitas Relawan Literasi NTT', 'Pusat Sumber Belajar Kota Kupang'],
    coordinator: 'Bernadetha Berlindis Sati Blikololong'
  },
  {
    id: 'prog-3',
    title: 'Budi Pekerti Luhur, Kerukunan Agama & Pembinaan Karakter Pramuka',
    badgeKicker: 'Karakter & Budi Pekerti',
    targetAudience: 'Siswa Kelas VII, VIII, IX',
    curriculumFramework: 'Pendidikan Karakter Berbasis Nilai Kekeluargaan NTT & Dasa Darma Pramuka',
    duration: 'Terintegrasi Setiap Hari',
    description: 'Mendidik anak-anak untuk saling menghormati perbedaan suku dan agama, bersikap sopan kepada orang tua, guru, dan tetangga, serta cinta pada kebersihan alam.',
    coreCompetencies: [
      'Toleransi antar-umat beragama yang harmonis dan rukun',
      'Kepedulian sosial terhadap kawan yang sedang kesusahan',
      'Kecakapan hidup mandiri melalui kepramukaan (tali-temali, tenda, pertolongan pertama)',
      'Pelestarian kearifan lokal budaya Timor dan tarian daerah'
    ],
    alumniOutcome: 'Alumni dikenal memiliki kepribadian santun, pekerja keras, dan loyal kepada almamater.',
    partnerInstitutions: ['Kwarran Pramuka Kelapa Lima', 'Kelurahan Oesapa'],
    coordinator: 'Guru Pembina Karakter'
  },
  {
    id: 'prog-4',
    title: 'Program Pendampingan Transisi & Pendaftaran PPDB ke SMA/SMK Kupang',
    badgeKicker: 'Layanan Masa Depan',
    targetAudience: 'Siswa Kelas IX Menjelang Kelulusan',
    curriculumFramework: 'Bimbingan Karir & Konseling Pendidikan Lanjutan',
    duration: 'Semester Genap (Januari – Juni)',
    description: 'Pihak sekolah mengawal proses pendaftaran sekolah lanjutan bagi setiap anak kelas IX. Operator dan Kepala Sekolah membantu pembuatan akun, verifikasi nilai rapor, hingga pendaftaran online agar tidak ada yang tertinggal.',
    coreCompetencies: [
      'Pengenalan jurusan vokasi di SMK (Teknik, Keperawatan, Pariwisata, Akuntansi)',
      'Pengenalan peminatan di SMA Negeri dan Swasta',
      'Kelengkapan berkas administrasi dan pendaftaran jalur afirmasi/zonasi',
      'Kesiapan mental beradaptasi di lingkungan sekolah baru yang lebih besar'
    ],
    alumniOutcome: 'Lulusan tersebar di berbagai sekolah ternama: SMKN 2 Kupang, SMAN 1, SMAN 5, SMKN 1, dan lainnya.',
    partnerInstitutions: ['SMKN 2 Kupang', 'SMAN 5 Kupang', 'SMK Pelayaran & Swasta Kupang'],
    coordinator: 'Bernadetha Berlindis Sati Blikololong & Bendelina Mata'
  }
];

export const publicMetrics: PublicTransparencyMetric[] = [
  {
    id: 'met-1',
    title: 'Akreditasi Sekolah',
    value: 'Peringkat C',
    subtext: 'No. SK 760/BAN-SM/SK/2019 (09 September 2019)',
    category: 'Legalitas',
    verificationSource: 'Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)'
  },
  {
    id: 'met-2',
    title: 'Jumlah Siswa Terdaftar',
    value: '84 Siswa',
    subtext: 'Kelas VII, VIII, IX (Rombongan Belajar Aktif)',
    category: 'Peserta Didik',
    verificationSource: 'Dapodik Kemendikbudristek RI 2026'
  },
  {
    id: 'met-3',
    title: 'Tenaga Pendidik Tercatat',
    value: '2 Guru Utama',
    subtext: 'Dipimpin Kepala Sekolah Ibu Bendelina Mata',
    category: 'Pendidik',
    verificationSource: 'Data Pokok Pendidikan (NPSN 69830131)'
  },
  {
    id: 'met-4',
    title: 'Tingkat Kelulusan & Melanjutkan',
    value: '100%',
    subtext: 'Seluruh Siswa Melanjutkan ke SMA/SMK',
    category: 'Hasil Belajar',
    verificationSource: 'Buku Induk Registrasi Kelulusan SMPS Surya Mandala'
  }
];

export const budgetAllocations: BudgetAllocation[] = [
  {
    category: 'Penyediaan Buku Teks Pelajaran & Bahan Bacaan Siswa',
    percentage: 35,
    amountRupiah: 'Rp 29.400.000',
    description: 'Pengadaan buku teks Kurikulum Nasional cetak Kemendikbud untuk dipinjamkan gratis kepada seluruh 84 siswa.',
    supervisor: 'Bernadetha Berlindis Sati Blikololong'
  },
  {
    category: 'Pemeliharaan Meja, Kursi, Papan Tulis & Kebersihan Ruang Kelas',
    percentage: 25,
    amountRupiah: 'Rp 21.000.000',
    description: 'Perbaikan mebeler kayu kelas, pengecatan dinding kapur, spidol/kapur tulis, dan perlengkapan sapu/kebersihan.',
    supervisor: 'Komite Sekolah & Pendidik'
  },
  {
    category: 'Bantuan Perlengkapan & Kebutuhan Siswa Prasejahtera',
    percentage: 20,
    amountRupiah: 'Rp 16.800.000',
    description: 'Subsidi buku tulis, pulpen, seragam pramuka, dan perlengkapan ujian untuk anak yatim dan keluarga nelayan Oesapa.',
    supervisor: 'Bendelina Mata (Kepala Sekolah)'
  },
  {
    category: 'Kegiatan Asesmen Ujian Sekolah, Pramuka & Peringatan Hari Besar',
    percentage: 12,
    amountRupiah: 'Rp 10.080.000',
    description: 'Penggandaan soal lembar kerja, perlengkapan apel 17 Agustus, dan kemah pramuka penggalang.',
    supervisor: 'Dewan Guru'
  },
  {
    category: 'Operasional Listrik, Air Bersih & Administrasi Pelaporan Dapodik',
    percentage: 8,
    amountRupiah: 'Rp 6.720.000',
    description: 'Pembayaran iuran listrik PLN, air galon/sumur higienis, dan kuota internet operator pelaporan Dapodik.',
    supervisor: 'Operator Sekolah'
  }
];

export const publicDocuments: PublicDocument[] = [
  {
    id: 'doc-1',
    title: 'Surat Keputusan Izin Operasional Sekolah (DIS.PPO.801/SEK/233/2013)',
    code: 'SK-OPERASIONAL-2013',
    publishedDate: '17 Juli 2013',
    fileSize: '1.2 MB (PDF)',
    summary: 'SK resmi dari Dinas Pendidikan Pemuda dan Olahraga Kota Kupang yang melegalkan operasional SMPS Surya Mandala.',
    downloadUrl: '#'
  },
  {
    id: 'doc-2',
    title: 'Sertifikat Akreditasi C dari BAN-S/M (No. 760/BAN-SM/SK/2019)',
    code: 'BAN-SM-760-2019',
    publishedDate: '09 September 2019',
    fileSize: '950 KB (PDF)',
    summary: 'Salinan resmi sertifikat akreditasi satuan pendidikan SMPS Surya Mandala oleh Badan Akreditasi Nasional.',
    downloadUrl: '#'
  },
  {
    id: 'doc-3',
    title: 'Profil Satuan Pendidikan Resmi & Data Pokok Pendidikan (Dapodik)',
    code: 'DAPODIK-69830131-2026',
    publishedDate: '01 Agustus 2026',
    fileSize: '1.4 MB (PDF)',
    summary: 'Rincian data NPSN 69830131, rekapitulasi 84 siswa, tenaga pendidik, dan inventaris sarpras ruang belajar.',
    downloadUrl: '#'
  },
  {
    id: 'doc-4',
    title: 'Laporan Penggunaan Dana Bantuan Operasional Sekolah (BOS)',
    code: 'LKP-BOS-SMPS-2026',
    publishedDate: '15 Oktober 2026',
    fileSize: '1.1 MB (PDF)',
    summary: 'Transparansi pertanggungjawaban dana bantuan operasional untuk penyediaan buku ajar dan pemeliharaan kelas.',
    downloadUrl: '#'
  }
];

export const initialAspirasiList: PublicInquiry[] = [
  {
    id: 'asp-1',
    ticketNumber: 'ASP-SMPS-042',
    fullName: 'Yohanes Neno (Orang Tua Siswa)',
    emailOrPhone: '0813-3921-****',
    role: 'Orang Tua',
    topic: 'Fasilitas & Sarpras',
    message: 'Terima kasih atas bantuan buku cetak untuk anak kami di kelas VII. Jika memungkinkan, mohon penambahan kursi panjang di teras depan agar orang tua yang menjemput anak bisa duduk teduh.',
    timestamp: '25 Oktober 2026, 11.20 WITA',
    status: 'Ditindaklanjuti'
  },
  {
    id: 'asp-2',
    ticketNumber: 'ASP-SMPS-043',
    fullName: 'Marten Touselak (Tokoh Warga Oesapa)',
    emailOrPhone: 'marten.oes***@yahoo.com',
    role: 'Masyarakat Umum',
    topic: 'Apresiasi & Saran',
    message: 'Kami warga Oesapa sangat bersyukur ada SMPS Surya Mandala di lingkungan kami. Anak-anak yang kurang mampu tetap bisa bersekolah dan tidak berkeliaran di jalanan. Semangat selalu untuk Ibu Bendelina dan para guru.',
    timestamp: '27 Oktober 2026, 08.45 WITA',
    status: 'Diterima & Diverifikasi'
  }
];

// Rich, authentic Alumni database reflecting real pathways of graduates from SMPS Surya Mandala
export const initialAlumniList: AlumniRecord[] = [
  {
    id: 'alm-1',
    fullName: 'Petrus Da Silva',
    graduationYear: 2017,
    currentEducationOrJob: 'Lulusan SMKN 2 Kupang (Teknik Kendaraan Ringan) · Mekanik Bengkel Mandiri di Oesapa',
    currentLocation: 'Kelurahan Oesapa, Kota Kupang',
    phoneOrContact: '0821-4456-****',
    inspiringMessage: 'Jangan pernah malu bersekolah di sekolah sederhana. Di SMPS Surya Mandala saya diajarkan kejujuran dan kerja keras oleh Ibu Bendelina Mata. Itu modal paling berharga di dunia kerja.',
    contributionWillingness: 'Berbagi Pengalaman / Motivasi',
    verified: true
  },
  {
    id: 'alm-2',
    fullName: 'Maria Imaculata Bria',
    graduationYear: 2019,
    currentEducationOrJob: 'Mahasiswi Semester 7 FKIP Pendidikan Bahasa Inggris, Universitas Nusa Cendana (Undana)',
    currentLocation: 'Kota Kupang, NTT',
    phoneOrContact: 'maria.bria***@gmail.com',
    inspiringMessage: 'Dulu saya sering minder membaca di depan kelas, tapi guru-guru di Surya Mandala sangat sabar membimbing saya. Sekarang saya calon guru dan siap mengajar adik-adik di almamater saya tercinta.',
    contributionWillingness: 'Bantuan Belajar Adik Kelas',
    verified: true
  },
  {
    id: 'alm-3',
    fullName: 'Yulius Soleman Kause',
    graduationYear: 2021,
    currentEducationOrJob: 'Alumni SMAN 5 Kupang · Anggota Bintara Pelayaran & Wirausaha Ikan Segar Oesapa',
    currentLocation: 'Kec. Kelapa Lima, Kota Kupang',
    phoneOrContact: '0852-3987-****',
    inspiringMessage: 'Halaman berkerikil dan ruang kelas kami adalah tempat awal mimpi kami ditempa. Untuk adik-adik: dengarkan nasehat guru, rajinlah ke sekolah, masa depan ada di tangan kalian!',
    contributionWillingness: 'Donasi Buku & Alat Tulis',
    verified: true
  },
  {
    id: 'alm-4',
    fullName: 'Theresia Adelheid Nesi',
    graduationYear: 2023,
    currentEducationOrJob: 'Siswi Kelas XII SMKN 1 Kupang (Jurusan Perhotelan & Pariwisata)',
    currentLocation: 'Kota Kupang, NTT',
    phoneOrContact: 'theresia.nesi***@yahoo.com',
    inspiringMessage: 'Terima kasih SMPS Surya Mandala telah membantu pendaftaran saya ke SMK hingga bisa belajar perhotelan. Saya ingin adik-adik kelas tahu bahwa lulusan Surya Mandala bisa bersaing di mana saja!',
    contributionWillingness: 'Networking Alumni',
    verified: true
  }
];
