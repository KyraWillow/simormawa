const fs = require('fs');
const path = require('path');

const rules = [
  { p: "src/modules/auth/interfaces/controllers/login.controller.ts", pub: true },
  { p: "src/modules/user/interfaces/controllers/create-user.controller.ts", roles: ["ADMIN","BPH"] },
  { p: "src/modules/user/interfaces/controllers/update-user.controller.ts", roles: ["ADMIN","BPH"] },
  { p: "src/modules/user/interfaces/controllers/deactivate-user.controller.ts", roles: ["ADMIN","BPH"] },
  { p: "src/modules/user/interfaces/controllers/find-users.controller.ts", roles: ["ADMIN","BPH"] },
  { p: "src/modules/user/interfaces/controllers/find-user-by-id.controller.ts", roles: ["ADMIN","BPH"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/create-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/update-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/delete-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/assign-pic.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/update-status-work-program.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/find-work-program-list.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","SEKRETARIS","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/find-work-program-by-id.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","SEKRETARIS","ADMIN"] },
  { p: "src/modules/WorkProgram/interfaces/controllers/dashboard-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { p: "src/modules/Evaluation/interfaces/controllers/evaluation.controller.ts", roles: ["BPH","KADIV"] },
  { p: "src/modules/Fee/interfaces/controllers/budget.controller.ts", roles: ["BPH","KADIV","BENDAHARA"] },
  { p: "src/modules/Kas/interfaces/controllers/kas.controller.ts", roles: ["BPH","BENDAHARA"] },
  { p: "src/modules/ProgressReport/interfaces/controllers/report.controller.ts", roles: ["BPH","KADIV","PIC_STAFF"] },
  { p: "src/modules/Document/interfaces/controllers/document.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","SEKRETARIS","ADMIN"] },
  { p: "src/modules/Kak/kak.controller.ts", pub: true },
];

function up(p) {
  const d = p.split('/').length - 1;
  return '../'.repeat(d);
}

const base = process.cwd();

for (const r of rules) {
  const fp = path.join(base, r.p);
  let c = fs.readFileSync(fp, 'utf-8');

  if (c.includes('UseGuards') || r.pub) {
    console.log('SKIP', path.basename(r.p), r.pub ? '(public)' : '(done)');
    continue;
  }

  const u = up(r.p);
  let rip;
  if (r.p.startsWith('src/modules/user/')) {
    rip = u + 'domain/user.entity';
  } else if (r.p.startsWith('src/modules/auth/')) {
    rip = '../../../user/domain/user.entity';
  } else {
    rip = u + 'user/domain/user.entity';
  }

  const gi = `import { UseGuards } from '@nestjs/common';\nimport { AuthGuard } from '@nestjs/passport';\nimport { RolesGuard } from '${u}auth/infrastructure/roles.guard';\nimport { Roles } from '${u}auth/infrastructure/roles.decorator';\nimport { Role } from '${rip}';\n`;

  const m = c.match(/export class (\w+)/);
  if (!m) { console.log('FAIL', path.basename(r.p)); continue; }

  const dt = `@UseGuards(AuthGuard('jwt'), RolesGuard)\n@Roles(${r.roles.map(r2 => 'Role.' + r2).join(', ')})\n`;

  const li = c.lastIndexOf('import ');
  const eol = c.indexOf('\n', li);
  c = c.slice(0, eol + 1) + '\n' + gi + c.slice(eol + 1);
  c = c.replace(m[0], dt + m[0]);

  fs.writeFileSync(fp, c);
  console.log('GUARDED', path.basename(r.p));
}

console.log('\nDone —', rules.length, 'controllers processed');
