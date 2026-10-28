import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DB_FILE = path.resolve(__dirname, 'data', 'school_database.json');
const INITIAL_DB_FILE = path.resolve(__dirname, 'data', 'initialDatabase.json');

app.use(express.json({ limit: '10mb' }));

// Ensure database file exists
function loadDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      if (fs.existsSync(INITIAL_DB_FILE)) {
        const initialData = fs.readFileSync(INITIAL_DB_FILE, 'utf-8');
        fs.writeFileSync(DB_FILE, initialData, 'utf-8');
        return JSON.parse(initialData);
      }
      throw new Error('Initial database file not found');
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading database, resetting to fallback:', err);
    if (fs.existsSync(INITIAL_DB_FILE)) {
      const initialData = fs.readFileSync(INITIAL_DB_FILE, 'utf-8');
      fs.writeFileSync(DB_FILE, initialData, 'utf-8');
      return JSON.parse(initialData);
    }
    return {};
  }
}

function saveDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save database:', err);
    return false;
  }
}

// REST API ROUTES (/api/*)

// 1. Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = loadDatabase();
  const creds = db.adminCredentials || { username: 'admin', password: 'suryamandala2013' };

  if (username === creds.username && password === creds.password) {
    // Simple secure session token for operator/admin
    const token = `auth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return res.json({
      success: true,
      message: 'Login operator berhasil',
      token,
      user: {
        username: creds.username,
        role: 'Operator & Administrator Sekolah',
        schoolName: db.generalInfo?.name || 'SMPS SURYA MANDALA'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Username atau kata sandi tidak valid. Hubungi operator sekolah.'
  });
});

// Auth: Change password
app.post('/api/auth/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = loadDatabase();
  const creds = db.adminCredentials || { username: 'admin', password: 'suryamandala2013' };

  if (currentPassword !== creds.password) {
    return res.status(400).json({ success: false, message: 'Kata sandi saat ini salah.' });
  }

  if (!newPassword || newPassword.length < 5) {
    return res.status(400).json({ success: false, message: 'Kata sandi baru minimal 5 karakter.' });
  }

  db.adminCredentials.password = newPassword;
  saveDatabase(db);
  return res.json({ success: true, message: 'Kata sandi berhasil diperbarui.' });
});

// 2. Fetch full public content
app.get('/api/content', (req, res) => {
  const db = loadDatabase();
  // Strip admin credentials from public content response
  const { adminCredentials, ...publicData } = db;
  res.json(publicData);
});

// 3. Update General School Profile
app.put('/api/content/general-info', (req, res) => {
  const db = loadDatabase();
  const updatedInfo = req.body;
  db.generalInfo = {
    ...db.generalInfo,
    ...updatedInfo
  };
  saveDatabase(db);
  res.json({ success: true, message: 'Profil dan data pokok sekolah berhasil diperbarui', generalInfo: db.generalInfo });
});

// 4. Activities CRUD
app.post('/api/content/activities', (req, res) => {
  const db = loadDatabase();
  const newActivity = {
    id: `act-${Date.now()}`,
    ...req.body,
  };
  db.todayActivities = [newActivity, ...(db.todayActivities || [])];
  saveDatabase(db);
  res.json({ success: true, message: 'Kegiatan berhasil ditambahkan', activity: newActivity });
});

app.put('/api/content/activities/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = (db.todayActivities || []).findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Kegiatan tidak ditemukan' });
  }
  db.todayActivities[index] = { ...db.todayActivities[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, message: 'Kegiatan berhasil diperbarui', activity: db.todayActivities[index] });
});

app.delete('/api/content/activities/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  db.todayActivities = (db.todayActivities || []).filter((a: any) => a.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Kegiatan berhasil dihapus' });
});

// 5. Achievements CRUD
app.post('/api/content/achievements', (req, res) => {
  const db = loadDatabase();
  const newAchievement = {
    id: `ach-${Date.now()}`,
    ...req.body,
  };
  db.studentAchievements = [newAchievement, ...(db.studentAchievements || [])];
  saveDatabase(db);
  res.json({ success: true, message: 'Prestasi siswa berhasil ditambahkan', achievement: newAchievement });
});

app.put('/api/content/achievements/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = (db.studentAchievements || []).findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });
  }
  db.studentAchievements[index] = { ...db.studentAchievements[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, message: 'Prestasi berhasil diperbarui', achievement: db.studentAchievements[index] });
});

app.delete('/api/content/achievements/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  db.studentAchievements = (db.studentAchievements || []).filter((a: any) => a.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Prestasi berhasil dihapus' });
});

// 6. Facilities CRUD
app.post('/api/content/facilities', (req, res) => {
  const db = loadDatabase();
  const newFacility = {
    id: `fac-${Date.now()}`,
    ...req.body,
  };
  db.schoolFacilities = [...(db.schoolFacilities || []), newFacility];
  saveDatabase(db);
  res.json({ success: true, message: 'Fasilitas berhasil ditambahkan', facility: newFacility });
});

app.put('/api/content/facilities/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = (db.schoolFacilities || []).findIndex((f: any) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Fasilitas tidak ditemukan' });
  }
  db.schoolFacilities[index] = { ...db.schoolFacilities[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, message: 'Data fasilitas berhasil diperbarui', facility: db.schoolFacilities[index] });
});

app.delete('/api/content/facilities/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  db.schoolFacilities = (db.schoolFacilities || []).filter((f: any) => f.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Fasilitas berhasil dihapus' });
});

// 7. Alumni Tracer CRUD
app.post('/api/content/alumni', (req, res) => {
  const db = loadDatabase();
  const newAlumni = {
    id: `alm-${Date.now()}`,
    verified: true,
    ...req.body,
  };
  db.alumniList = [newAlumni, ...(db.alumniList || [])];
  saveDatabase(db);
  res.json({ success: true, message: 'Data alumni berhasil dicatat', alumni: newAlumni });
});

app.put('/api/content/alumni/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = (db.alumniList || []).findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Data alumni tidak ditemukan' });
  }
  db.alumniList[index] = { ...db.alumniList[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, message: 'Data alumni berhasil diperbarui', alumni: db.alumniList[index] });
});

app.delete('/api/content/alumni/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  db.alumniList = (db.alumniList || []).filter((a: any) => a.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Data alumni berhasil dihapus' });
});

// 8. Budget Allocations
app.put('/api/content/budget', (req, res) => {
  const db = loadDatabase();
  const { budgetAllocations } = req.body;
  if (Array.isArray(budgetAllocations)) {
    db.budgetAllocations = budgetAllocations;
    saveDatabase(db);
    return res.json({ success: true, message: 'Alokasi anggaran BOS berhasil diperbarui', budgetAllocations });
  }
  return res.status(400).json({ success: false, message: 'Data alokasi tidak valid' });
});

// 9. Aspirasi / Inquiries
app.post('/api/content/inquiries', (req, res) => {
  const db = loadDatabase();
  const count = (db.aspirasiList || []).length;
  const newInquiry = {
    id: `asp-${Date.now()}`,
    ticketNumber: `ASP-SMPS-${String(count + 44).padStart(3, '0')}`,
    timestamp: 'Baru Saja',
    status: 'Diterima & Diverifikasi',
    ...req.body,
  };
  db.aspirasiList = [newInquiry, ...(db.aspirasiList || [])];
  saveDatabase(db);
  res.json({ success: true, message: 'Aspirasi berhasil dikirim', inquiry: newInquiry });
});

app.put('/api/content/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = (db.aspirasiList || []).findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Aspirasi tidak ditemukan' });
  }
  db.aspirasiList[index] = { ...db.aspirasiList[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, message: 'Status aspirasi berhasil diperbarui', inquiry: db.aspirasiList[index] });
});

// 10. Reset to default initial database
app.post('/api/content/reset', (req, res) => {
  if (fs.existsSync(INITIAL_DB_FILE)) {
    const initialData = fs.readFileSync(INITIAL_DB_FILE, 'utf-8');
    fs.writeFileSync(DB_FILE, initialData, 'utf-8');
    return res.json({ success: true, message: 'Konten berhasil di-reset ke data pokok resmi awal', data: JSON.parse(initialData) });
  }
  return res.status(500).json({ success: false, message: 'Berkas data awal tidak ditemukan' });
});

// VITE INTEGRATION FOR DEV / PROD
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server SMPS Surya Mandala running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
