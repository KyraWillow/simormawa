# BC2: WorkProgram — Plan & Progress

## FR Scope
- FR-004: CRUD program kerja + template KAK digital
- FR-005: Tampilkan daftar & detail proker (aktif, terjadwal, selesai)
- FR-006: Update & tampilkan status real-time (Belum Mulai, Berjalan, Selesai, Ditunda)
- FR-007: Tugaskan PIC + deadline
- FR-008: Unggahan dokumen pendukung (laporan, foto, KAK)
- FR-016: Dashboard monitoring progres seluruh proker aktif

## File yang Dibutuhkan

### Fase 1: Domain
- [x] 1. `domain/work-program.entity.ts` — ✅ Selesai
- [ ] 2. `domain/work-program.errors.ts` — ProkerNotFound, InvalidStatusTransition
- [ ] 3. `domain/events/work-program-created.event.ts`

### Fase 2: Ports
- [ ] 4. `application/ports/work-program.repository.port.ts` — Abstract class

### Fase 3: Application
- [ ] 5. `commands/create-work-program/create-work-program.command.ts`
- [ ] 6. `commands/create-work-program/create-work-program.service.ts`
- [ ] 7. `commands/update-work-program/update-work-program.command.ts`
- [ ] 8. `commands/update-work-program/update-work-program.service.ts`
- [ ] 9. `commands/update-status-work-program/update-status-work-program.command.ts`
- [ ] 10. `commands/update-status-work-program/update-status-work-program.service.ts`
- [ ] 11. `commands/delete-work-program/delete-work-program.command.ts`
- [ ] 12. `commands/delete-work-program/delete-work-program.service.ts`
- [ ] 13. `commands/assign-pic/assign-pic.command.ts`
- [ ] 14. `commands/assign-pic/assign-pic.service.ts`
- [ ] 15. `queries/find-work-program-list/find-work-program-list.query.ts`
- [ ] 16. `queries/find-work-program-list/find-work-program-list.handler.ts`
- [ ] 17. `queries/find-work-program-by-id/find-work-program-by-id.query.ts`
- [ ] 18. `queries/find-work-program-by-id/find-work-program-by-id.handler.ts`
- [ ] 19. `queries/dashboard-monitoring/dashboard-monitoring.query.ts`
- [ ] 20. `queries/dashboard-monitoring/dashboard-monitoring.handler.ts`

### Fase 4: Infrastructure
- [ ] 21. `infrastructure/work-program.persistence.ts`
- [ ] 22. `infrastructure/work-program.mapper.ts`
- [ ] 23. `infrastructure/work-program.repository.ts`

### Fase 5: Interfaces
- [ ] 24-30. DTOs + Controllers (sesuai use case)

### Fase 6: Module
- [ ] 31. `work-program.module.ts`

---

## Progress
```
██████░░░░░░░░░░░░░░░░░░░░░░░░░░ 1/31 (3%)
```

## Update Log
- 2026-07-10: Domain entity selesai (item 1)
