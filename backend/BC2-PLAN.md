# BC2: Program Kerja — Plan & Progress

## FR Scope
- FR-004: CRUD program kerja + template KAK digital
- FR-005: Tampilkan daftar & detail proker (aktif, terjadwal, selesai)
- FR-006: Update & tampilkan status real-time (Belum Mulai, Berjalan, Selesai, Ditunda)
- FR-007: Tugaskan PIC + deadline
- FR-008: Unggahan dokumen pendukung (laporan, foto, KAK)
- FR-016: Dashboard monitoring progres seluruh proker aktif

## File yang Dibutuhkan

### Fase 1: Domain
- [ ] 1. `domain/program-kerja.entity.ts` — Enum Status, Props, Entity, validate, create, updateStatus, assignPIC, uploadDokumen
- [ ] 2. `domain/program-kerja.errors.ts` — ProkerNotFound, InvalidStatusTransition
- [ ] 3. `domain/events/proker-created.event.ts`

### Fase 2: Ports
- [ ] 4. `application/ports/program-kerja.repository.port.ts` — Abstract class

### Fase 3: Application
- [ ] 5. `commands/create-proker/create-proker.command.ts`
- [ ] 6. `commands/create-proker/create-proker.service.ts`
- [ ] 7. `commands/update-proker/update-proker.command.ts`
- [ ] 8. `commands/update-proker/update-proker.service.ts`
- [ ] 9. `commands/update-status-proker/update-status-proker.command.ts`
- [ ] 10. `commands/update-status-proker/update-status-proker.service.ts`
- [ ] 11. `commands/delete-proker/delete-proker.command.ts`
- [ ] 12. `commands/delete-proker/delete-proker.service.ts`
- [ ] 13. `commands/assign-pic/assign-pic.command.ts`
- [ ] 14. `commands/assign-pic/assign-pic.service.ts`
- [ ] 15. `queries/find-proker-list/find-proker-list.query.ts`
- [ ] 16. `queries/find-proker-list/find-proker-list.handler.ts`
- [ ] 17. `queries/find-proker-by-id/find-proker-by-id.query.ts`
- [ ] 18. `queries/find-proker-by-id/find-proker-by-id.handler.ts`
- [ ] 19. `queries/dashboard-monitoring/dashboard-monitoring.query.ts`
- [ ] 20. `queries/dashboard-monitoring/dashboard-monitoring.handler.ts`

### Fase 4: Infrastructure
- [ ] 21. `infrastructure/program-kerja.persistence.ts`
- [ ] 22. `infrastructure/program-kerja.mapper.ts`
- [ ] 23. `infrastructure/program-kerja.repository.ts`

### Fase 5: Interfaces
- [ ] 24-30. DTOs + Controllers (sesuai use case)

### Fase 6: Module
- [ ] 31. `program-kerja.module.ts`

---

## Progress
```
████████████████████ ░░░░░░░░░░░░░░░░░░░░ 0/31 (0%)
```
