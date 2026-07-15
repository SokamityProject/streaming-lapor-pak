/**
 * Skrip setup Android TV untuk proyek Capacitor.
 * Dijalankan SETELAH `npx cap add android` / `npx cap sync android`.
 *
 * Yang dilakukan:
 * 1. Menambahkan uses-feature leanback & touchscreen (tidak wajib) -> syarat app Android TV
 * 2. Menambahkan android:banner pada <application> -> banner di home screen TV
 * 3. Mengunci orientasi MainActivity ke landscape
 * 4. Menambahkan kategori LEANBACK_LAUNCHER -> app muncul di launcher Android TV
 * 5. Menyalin resources/banner.png -> android/app/src/main/res/drawable/tv_banner.png
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
const bannerSrc = path.join(root, 'resources', 'banner.png');
const drawableDir = path.join(root, 'android', 'app', 'src', 'main', 'res', 'drawable');
const bannerDest = path.join(drawableDir, 'tv_banner.png');

if (!fs.existsSync(manifestPath)) {
  console.error('[tv-setup] GAGAL: AndroidManifest.xml tidak ditemukan. Jalankan "npx cap add android" dulu.');
  process.exit(1);
}

let manifest = fs.readFileSync(manifestPath, 'utf8');
let changed = false;

// 1. uses-feature untuk Android TV (sebelum <application>)
if (!manifest.includes('android.software.leanback')) {
  manifest = manifest.replace(
    '    <application',
    '    <uses-feature android:name="android.software.leanback" android:required="false" />\n' +
    '    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />\n\n' +
    '    <application'
  );
  changed = true;
  console.log('[tv-setup] uses-feature leanback & touchscreen ditambahkan.');
}

// 2. Banner TV pada <application>
if (!manifest.includes('android:banner')) {
  manifest = manifest.replace(
    '<application\n',
    '<application\n        android:banner="@drawable/tv_banner"\n'
  );
  changed = true;
  console.log('[tv-setup] android:banner ditambahkan pada <application>.');
}

// 3. Kunci orientasi landscape pada MainActivity
if (!manifest.includes('android:screenOrientation')) {
  manifest = manifest.replace(
    'android:name=".MainActivity"',
    'android:name=".MainActivity"\n            android:screenOrientation="sensorLandscape"'
  );
  changed = true;
  console.log('[tv-setup] Orientasi landscape dikunci pada MainActivity.');
}

// 4. Kategori LEANBACK_LAUNCHER agar muncul di launcher Android TV
if (!manifest.includes('LEANBACK_LAUNCHER')) {
  manifest = manifest.replace(
    '<category android:name="android.intent.category.LAUNCHER" />',
    '<category android:name="android.intent.category.LAUNCHER" />\n' +
    '                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />'
  );
  changed = true;
  console.log('[tv-setup] Kategori LEANBACK_LAUNCHER ditambahkan.');
}

if (changed) {
  fs.writeFileSync(manifestPath, manifest, 'utf8');
  console.log('[tv-setup] AndroidManifest.xml diperbarui.');
} else {
  console.log('[tv-setup] AndroidManifest.xml sudah terkonfigurasi, tidak ada perubahan.');
}

// 5. Salin banner
if (fs.existsSync(bannerSrc)) {
  fs.mkdirSync(drawableDir, { recursive: true });
  fs.copyFileSync(bannerSrc, bannerDest);
  console.log('[tv-setup] Banner disalin ke res/drawable/tv_banner.png.');
} else {
  console.error('[tv-setup] GAGAL: resources/banner.png tidak ditemukan. Banner wajib ada.');
  process.exit(1);
}

console.log('[tv-setup] Selesai. Proyek siap untuk Android TV.');
