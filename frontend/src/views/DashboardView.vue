<template>
  <div>
    <h2 class="pt">Dashboard</h2>
    <h3 style="margin-bottom:12px;color:#112D4E">Program Kerja</h3>
    <a-row :gutter="[16,16]" style="margin-bottom:32px">
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Total" :value="stats.total" /></a-card></a-col>
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Aktif" :value="stats.active" value-style="color:#3F72AF" /></a-card></a-col>
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Selesai" :value="stats.completed" value-style="color:#52c41a" /></a-card></a-col>
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Ditunda" :value="stats.onHold" value-style="color:#faad14" /></a-card></a-col>
    </a-row>
    <h3 style="margin-bottom:12px;color:#112D4E">Anggaran</h3>
    <a-row :gutter="[16,16]">
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Total Anggaran" :value="bdg.total" /></a-card></a-col>
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Nilai" :value="bdg.totalAmount" :precision="0" prefix="Rp" /></a-card></a-col>
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Disetujui" :value="bdg.approved" value-style="color:#52c41a" /></a-card></a-col>
      <a-col :xs="12" :sm="6"><a-card><a-statistic title="Draft" :value="bdg.draft" value-style="color:#faad14" /></a-card></a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { workProgramApi, budgetApi } from '@/services/api'

const stats = ref({ total:0, active:0, completed:0, onHold:0, notStarted:0, inProgress:0 })
const bdg = ref({ total:0, totalAmount:0, draft:0, submitted:0, approved:0, rejected:0 })

onMounted(async () => {
  try { stats.value = await workProgramApi.dashboard(); bdg.value = await budgetApi.dashboard() } catch {}
})
</script>

<style scoped>
.pt { font-size:1.5rem; font-weight:700; color:#112D4E; margin-bottom:1.5rem; }
</style>