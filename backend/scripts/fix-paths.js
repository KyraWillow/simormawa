const fs = require('fs');
const path = require('path');

// Files with wrong paths (from build errors)
const files = [
  'src/modules/user/interfaces/controllers/update-user.controller.ts',
  'src/modules/user/interfaces/controllers/find-users.controller.ts',
  'src/modules/user/interfaces/controllers/find-user-by-id.controller.ts',
  'src/modules/user/interfaces/controllers/deactivate-user.controller.ts',
];

const base = process.cwd();

for (const f of files) {
  const fp = path.join(base, f);
  let c = fs.readFileSync(fp, 'utf-8');

  // Fix: ../../../.. → ../../../ (4 levels → 3 levels from controllers/)
  c = c.replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\//g, '../../../');
  c = c.replace(/\.\.\/\.\.\/\.\.\/\.\.\//g, '../../');

  fs.writeFileSync(fp, c);
  console.log('Fixed', path.basename(f));
}
