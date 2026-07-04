// unpack.js — Usage: node unpack.js stagehaus-files.json
const fs = require('fs');
const path = require('path');

const bundleFile = process.argv[2];
if (!bundleFile) { console.error('Usage: node unpack.js stagehaus-files.json'); process.exit(1); }

const files = JSON.parse(fs.readFileSync(bundleFile, 'utf8'));
console.log(`\n⬡ StageHaus — Unpacking ${files.length} files...\n`);

files.forEach(f => {
  fs.mkdirSync(path.dirname(f.path), { recursive: true });
  fs.writeFileSync(f.path, f.content, 'utf8');
  console.log('  ✓', f.path);
});

console.log('\n✓ Done! Next steps:');
console.log('  cd stagehaus-v2 && npm install && npm start');
console.log('  → http://localhost:8080\n');
