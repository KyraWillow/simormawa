<template>
  <a-spin :spinning="loading">
    <div v-if="data" class="lpj">
      <div class="lpj-h">
        <h2 class="pt">LPJ — {{ data.workProgram.name }}</h2>
        <div style="display:flex;gap:8px">
          <a-button type="primary" ghost @click="downloadPdf">Download PDF</a-button>
          <a-button @click="$router.back()">Kembali</a-button>
        </div>
      </div>

      <a-card title="Informasi Program Kerja" style="margin-bottom:16px">
        <p><strong>Status:</strong> <a-tag :color="sc(data.workProgram.status)">{{ data.workProgram.status }}</a-tag></p>
        <p><strong>PIC:</strong> {{ data.workProgram.picName }} ({{ data.workProgram.picEmail }})</p>
        <p><strong>Deadline:</strong> {{ new Date(data.workProgram.deadline).toLocaleDateString('id-ID') }}</p>
      </a-card>

      <a-card title="Anggaran" style="margin-bottom:16px">
        <a-table :dataSource="data.anggaran.items" rowKey="item_name" size="small" :pagination="false">
          <a-table-column title="Item" dataIndex="item_name" />
          <a-table-column title="Qty" dataIndex="quantity" />
          <a-table-column title="Satuan" dataIndex="unit" />
          <a-table-column title="Harga" dataIndex="unit_price">
            <template #default="{record}">{{ formatRp(record.unit_price) }}</template>
          </a-table-column>
          <a-table-column title="Total" dataIndex="total_price">
            <template #default="{record}">{{ formatRp(record.total_price) }}</template>
          </a-table-column>
          <a-table-column title="Status" dataIndex="budgetStatus">
            <template #default="{record}"><a-tag :color="record.budgetStatus==='approved'?'green':'orange'">{{ record.budgetStatus }}</a-tag></template>
          </a-table-column>
        </a-table>
        <div style="margin-top:12px;display:flex;gap:24px">
          <span><strong>Total Anggaran:</strong> {{ formatRp(data.anggaran.totalAnggaran) }}</span>
          <span><strong>Realisasi:</strong> {{ formatRp(data.anggaran.totalRealisasi) }}</span>
          <span><strong>Sisa:</strong> <span :style="{color: data.anggaran.selisih >= 0 ? '#52c41a' : '#ff4d4f'}">{{ formatRp(Math.abs(data.anggaran.selisih)) }}</span></span>
        </div>
      </a-card>

      <a-card title="Mutasi Kas Terkait" style="margin-bottom:16px">
        <a-table :dataSource="data.kasTransactions" rowKey="date" size="small" :pagination="false">
          <a-table-column title="Tipe" dataIndex="type">
            <template #default="{record}"><a-tag :color="record.type==='pemasukan'?'green':'red'">{{ record.type }}</a-tag></template>
          </a-table-column>
          <a-table-column title="Jumlah" dataIndex="amount">
            <template #default="{record}">{{ formatRp(record.amount) }}</template>
          </a-table-column>
          <a-table-column title="Deskripsi" dataIndex="description" ellipsis />
          <a-table-column title="Tanggal" dataIndex="date" />
        </a-table>
      </a-card>

      <a-card title="Laporan Progres">
        <a-table :dataSource="data.progressReports" rowKey="submittedAt" size="small" :pagination="false">
          <a-table-column title="Progres" dataIndex="progressPct">
            <template #default="{record}"><a-progress :percent="record.progressPct" size="small" /></template>
          </a-table-column>
          <a-table-column title="Deskripsi" dataIndex="description" ellipsis />
          <a-table-column title="Kendala" dataIndex="obstacles" ellipsis />
          <a-table-column title="Waktu" dataIndex="submittedAt" />
        </a-table>
      </a-card>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api, { workProgramApi } from '@/services/api'
import { message } from 'ant-design-vue'

const route = useRoute()
const loading = ref(false)
const data = ref<any>(null)
const sc = (s:string) => ({ NOT_STARTED:'default', IN_PROGRESS:'processing', COMPLETED:'success', ON_HOLD:'warning' })[s] || 'default'
const formatRp = (n:number) => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0 }).format(n)

const downloadPdf = async () => {
  try {
    const res = await api.get(`/export/lpj/${route.params.id}/pdf`, { responseType: 'blob' })
    const a = document.createElement('a')
    const blob = new Blob([res.data], { type: 'application/pdf' })
    a.href = URL.createObjectURL(blob)
    a.download = `LPJ-${data.value?.workProgram?.name?.replace(/\s+/g, '_') || 'laporan'}.pdf`
    a.click()
    URL.revokeObjectURL(a.href)
  } catch { message.error('Gagal download PDF') }
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    data.value = await workProgramApi.lpj(id)
  } catch (err:any) {
    message.error(err?.response?.data?.message || 'Gagal memuat LPJ')
    data.value = null
  } finally { loading.value = false }
})
</script>

<style scoped>
.lpj-h { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
.pt { font-size:1.5rem; font-weight:700; color:#112D4E; margin:0; }
</style>