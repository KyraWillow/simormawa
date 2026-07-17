import * as fs from 'fs';
import * as path from 'path';

interface Rule {
  path: string;
  roles?: string[];
  public?: boolean;
}

const rules: Rule[] = [
  { path: "src/modules/auth/interfaces/controllers/login.controller.ts", public: true },
  { path: "src/modules/user/interfaces/controllers/create-user.controller.ts", roles: ["ADMIN","BPH"] },
  { path: "src/modules/user/interfaces/controllers/update-user.controller.ts", roles: ["ADMIN","BPH"] },
  { path: "src/modules/user/interfaces/controllers/deactivate-user.controller.ts", roles: ["ADMIN","BPH"] },
  { path: "src/modules/user/interfaces/controllers/find-users.controller.ts", roles: ["ADMIN","BPH"] },
  { path: "src/modules/user/interfaces/controllers/find-user-by-id.controller.ts", roles: ["ADMIN","BPH"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/create-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/update-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/delete-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/assign-pic.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/update-status-work-program.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/find-work-program-list.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","SEKRETARIS","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/find-work-program-by-id.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","SEKRETARIS","ADMIN"] },
  { path: "src/modules/WorkProgram/interfaces/controllers/dashboard-work-program.controller.ts", roles: ["BPH","KADIV","ADMIN"] },
  { path: "src/modules/Evaluation/interfaces/controllers/evaluation.controller.ts", roles: ["BPH","KADIV"] },
  { path: "src/modules/Fee/interfaces/controllers/budget.controller.ts", roles: ["BPH","KADIV","BENDAHARA"] },
  { path: "src/modules/Kas/interfaces/controllers/kas.controller.ts", roles: ["BPH","BENDAHARA"] },
  { path: "src/modules/ProgressReport/interfaces/controllers/report.controller.ts", roles: ["BPH","KADIV","PIC_STAFF"] },
  { path: "src/modules/Document/interfaces/controllers/document.controller.ts", roles: ["BPH","KADIV","PIC_STAFF","SEKRETARIS","ADMIN"] },
  { path: "src/modules/Kak/kak.controller.ts", public: true },
];

function rel(base: string): string {
  const depth = base.split('/').length - 1;
  return '../'.repeat(depth);
}

for (const r of rules) {
  const fullPath = path.join(process.cwd(), r.path);
  let content = fs.readFileSync(fullPath, 'utf-8');

  if (content.includes('UseGuards') || r.public) {
    console.log('SKIP', path.basename(r.path), r.public ? '(public)' : '(already guarded)');
    continue;
  }

  const cl = rel(r.path);
  let roleImportPath: string;
  if (r.path.startsWith('src/modules/user/')) {
    roleImportPath = cl + 'domain/user.entity';
  } else {
    roleImportPath = cl + 'user/domain/user.entity';
    if (r.path.startsWith('src/modules/auth/')) {
      roleImportPath = '../../../user/domain/user.entity';
    }
  }

  const guardsImport = `import { UseGuards } from '@nestjs/common';\nimport { AuthGuard } from '@nestjs/passport';\nimport { RolesGuard } from '${cl}auth/infrastructure/roles.guard';\nimport { Roles } from '${cl}auth/infrastructure/roles.decorator';\nimport { Role } from '${roleImportPath}';\n`;

  const classMatch = content.match(/export class (\w+Controller)/);
  if (!classMatch) {
    console.log('FAIL: no class in', r.path);
    continue;
  }

  const decoratorText = `@UseGuards(AuthGuard('jwt'), RolesGuard)\n@Roles(${r.roles!.map((role) => 'Role.' + role).join(', ')})\n`;

  const lastImport = content.lastIndexOf('import ');
  const endOfLine = content.indexOf('\n', lastImport);
  content = content.slice(0, endOfLine + 1) + '\n' + guardsImport + content.slice(endOfLine + 1);
  content = content.replace(classMatch[0], decoratorText + classMatch[0]);

  fs.writeFileSync(fullPath, content);
  console.log('GUARDED', path.basename(r.path), `[${r.roles!.join(', ')}]`);
}
