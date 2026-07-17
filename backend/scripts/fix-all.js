const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'src');

const rolesMap = {
  'create-user': 'ADMIN, BPH',
  'update-user': 'ADMIN, BPH',
  'deactivate-user': 'ADMIN, BPH',
  'find-users': 'ADMIN, BPH',
  'find-user-by-id': 'ADMIN, BPH',
  'create-work-program': 'BPH, KADIV, ADMIN',
  'update-work-program': 'BPH, KADIV, ADMIN',
  'delete-work-program': 'BPH, KADIV, ADMIN',
  'assign-pic': 'BPH, KADIV, ADMIN',
  'update-status-work-program': 'BPH, KADIV, PIC_STAFF, ADMIN',
  'find-work-program-list': 'BPH, KADIV, PIC_STAFF, SEKRETARIS, ADMIN',
  'find-work-program-by-id': 'BPH, KADIV, PIC_STAFF, SEKRETARIS, ADMIN',
  'dashboard-work-program': 'BPH, KADIV, ADMIN',
  'evaluation': 'BPH, KADIV',
  'budget': 'BPH, KADIV, BENDAHARA',
  'kas': 'BPH, BENDAHARA',
  'report': 'BPH, KADIV, PIC_STAFF',
  'document': 'BPH, KADIV, PIC_STAFF, SEKRETARIS, ADMIN',
};

function relativeDepth(filePath) {
  const parts = filePath.split('/');
  return parts.length - 1;
}

const targets = [
  'modules/user/interfaces/controllers/update-user.controller.ts',
  'modules/user/interfaces/controllers/find-users.controller.ts',
  'modules/user/interfaces/controllers/find-user-by-id.controller.ts',
  'modules/user/interfaces/controllers/deactivate-user.controller.ts',
  'modules/WorkProgram/interfaces/controllers/create-work-program.controller.ts',
  'modules/WorkProgram/interfaces/controllers/update-work-program.controller.ts',
  'modules/WorkProgram/interfaces/controllers/delete-work-program.controller.ts',
  'modules/WorkProgram/interfaces/controllers/assign-pic.controller.ts',
  'modules/WorkProgram/interfaces/controllers/update-status-work-program.controller.ts',
  'modules/WorkProgram/interfaces/controllers/find-work-program-list.controller.ts',
  'modules/WorkProgram/interfaces/controllers/find-work-program-by-id.controller.ts',
  'modules/WorkProgram/interfaces/controllers/dashboard-work-program.controller.ts',
  'modules/Evaluation/interfaces/controllers/evaluation.controller.ts',
  'modules/Fee/interfaces/controllers/budget.controller.ts',
  'modules/Kas/interfaces/controllers/kas.controller.ts',
  'modules/ProgressReport/interfaces/controllers/report.controller.ts',
  'modules/Document/interfaces/controllers/document.controller.ts',
];

for (const t of targets) {
  const fp = path.join(base, t);
  let c = fs.readFileSync(fp, 'utf-8');

  // Fix: strip old/wrong guard imports
  const cleanLines = c.split('\n').filter(line => {
    if (line.includes('RolesGuard') || line.includes('Roles from') || line.includes('Role from')) {
      return line.startsWith('import { UseGuards') || line.startsWith('import { AuthGuard');
    }
    return true;
  }).join('\n');
  
  // Remove excessive newlines
  c = cleanLines.replace(/\n{4,}/g, '\n\n\n');

  // Determine correct relative path
  const depth = relativeDepth(t);
  // From the controller directory, go up (depth) levels to reach src/
  const up = '../'.repeat(depth);
  const isUser = t.startsWith('modules/user/');

  let authGuardPath = up + 'auth/infrastructure/roles.guard';
  let rolesDecPath = up + 'auth/infrastructure/roles.decorator';
  let roleEntPath = isUser ? up.slice(0, -3) + 'domain/user.entity' : up + 'user/domain/user.entity';

  // Special case adjustments
  if (t.startsWith('modules/user/')) {
    // user controllers: depth=5, up=5 → but from controllers/ need 4 up to src/
    // Actually: interfaces/controllers/ from modules/user/ depth = 5
    // To reach auth: ../../../auth/... (3 levels from modules/user/interfaces/controllers/)
    // Up from controllers: ../interfaces/ → ../../user/ → ../../../modules/ → ../../../auth/
    authGuardPath = '../../../auth/infrastructure/roles.guard';
    rolesDecPath = '../../../auth/infrastructure/roles.decorator';
    roleEntPath = '../../domain/user.entity';
  } else if (t.startsWith('modules/WorkProgram/')) {
    authGuardPath = '../../../auth/infrastructure/roles.guard';
    rolesDecPath = '../../../auth/infrastructure/roles.decorator';
    roleEntPath = '../../../user/domain/user.entity';
  } else if (t.startsWith('modules/Evaluation/')) {
    authGuardPath = '../../../../auth/infrastructure/roles.guard';
    rolesDecPath = '../../../../auth/infrastructure/roles.decorator';
    roleEntPath = '../../../../user/domain/user.entity';
  } else if (t.startsWith('modules/Fee/') || t.startsWith('modules/Kas/') || t.startsWith('modules/ProgressReport/') || t.startsWith('modules/Document/')) {
    authGuardPath = '../../../auth/infrastructure/roles.guard';
    rolesDecPath = '../../../auth/infrastructure/roles.decorator';
    roleEntPath = '../../../user/domain/user.entity';
  }

  // Find key for roles
  const key = Object.keys(rolesMap).find(k => t.includes(k));
  if (!key) {
    console.log('SKIP (no role key)', path.basename(t));
    continue;
  }
  const roleEntries = rolesMap[key].split(', ').map(r => 'Role.' + r).join(', ');

  // Build the complete new file
  const guardImports = `import { UseGuards } from '@nestjs/common';\nimport { AuthGuard } from '@nestjs/passport';\nimport { RolesGuard } from '${authGuardPath}';\nimport { Roles } from '${rolesDecPath}';\nimport { Role } from '${roleEntPath}';\n`;

  // Find last import line
  const importLines = c.split('\n').filter(l => l.trim().startsWith('import '));
  if (importLines.length === 0) {
    console.log('SKIP (no imports)', path.basename(t));
    continue;
  }
  const lastImportFull = importLines[importLines.length - 1];
  const insertPos = c.lastIndexOf(lastImportFull) + lastImportFull.length;

  c = c.slice(0, insertPos) + '\n' + guardImports + c.slice(insertPos);

  // Add decorators before class
  const classMatch = c.match(/export class (\w+)/);
  if (classMatch) {
    const dt = `@UseGuards(AuthGuard('jwt'), RolesGuard)\n@Roles(${roleEntries})\n`;
    if (!c.includes('@UseGuards')) {
      c = c.replace(classMatch[0], dt + classMatch[0]);
    }
  }

  // Clean up any remaining wrong old paths  
  c = c.replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\//g, '../../../');

  fs.writeFileSync(fp, c);
  console.log('OK', path.basename(t), `[${rolesMap[key]}]`);
}

console.log('\nAll fixed!');
