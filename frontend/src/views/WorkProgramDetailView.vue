<template>
  <div>
    <a-spin :spinning="loading">
      <a-card v-if="item" style="margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Status: <a-tag :color="sc(item.status)">{{ item.status }}</a-tag></p>
            <p>PIC: {{ item.picName || item.picId }} | Deadline: {{ new Date(item.deadline).toLocaleDateString('id-ID') }}</p>
          </div>
          <a-button type="default" @click="$router.push('/work-programs/' + route.params.id + '/lpj')">LPJ</a-button>
        </div>
      </a-card>

      <a-card v-if="budgets.length > 0" style="margin-bottom:24px" title="Anggaran">
        <a-table :dataSource="budgets" rowKey="id" size="small" :pagination="false">
          <a-table-column title="Item" dataIndex="itemName" />
          <a-table-column title="Qty" dataIndex="quantity" />
          <a-table-column title="Satuan" dataIndex="unit" />
          <a-table-column title="Harga" dataIndex="unitPrice"><template #default="{record}">{{ formatRp(record.unitPrice) }}</template></a-table-column>
          <a-table-column title="Total" dataIndex="totalPrice"><template #default="{record}">{{ formatRp(record.totalPrice) }}</template></a-table-column>
          <a-table-column title="Status" dataIndex="budgetStatus"><template #default="{record}"><a-tag :color="scBud(record.budgetStatus)">{{ record.budgetStatus }}</a-tag></template></a-table-column>
        </a-table>
        <div style="margin-top:12px;text-align:right;font-weight:700;color:#112D4E;font-size:1rem">
          Total Anggaran: {{ formatRp(budgets.reduce((s,b) => s + (Number(b.total_price) || Number(b.totalPrice) || 0), 0)) }}
        </div>
      </a-card>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0">Laporan Progres</h3>
        <a-button v-if="auth.hasRole('PIC/Staff', 'Admin')" type="primary" size="small" @click="showForm=true">+ Laporkan Progres</a-button>
      </div>

      <a-table :dataSource="reports" rowKey="id" :loading="loadingRp" size="small">
        <a-table-column title="Progres" dataIndex="progressPct">
          <template #default="{record}"><a-progress :percent="record.progressPct" size="small" /></template>
        </a-table-column>
        <a-table-column title="Deskripsi" dataIndex="description" ellipsis />
        <a-table-column title="Kendala" dataIndex="obstacles" ellipsis />
        <a-table-column title="Waktu" dataIndex="submittedAt" />
      </a-table>

      <div style="display:flex;justify-content:space-between;align-items:center;margin:24px 0 16px">
        <h3 style="margin:0">Dokumen</h3>
        <div><a-button size="small" :href="KAK_DOWNLOAD_URL" target="_blank">Download Template KAK</a-button></div>
      </div>
      <div v-if="auth.hasRole('BPH', 'Kadiv', 'Sekretaris', 'PIC/Staff', 'Admin')" style="display:flex;gap:8px;margin-bottom:16px">
        <a-upload :before-upload="handleUpload" :show-upload-list="false" accept=".pdf,.jpg,.png,.doc,.docx">
          <a-button>+ Upload Dokumen</a-button>
        </a-upload>
      </div>
      <a-table :dataSource="docs" rowKey="id" size="small">
        <a-table-column title="File" dataIndex="fileName" ellipsis />
        <a-table-column title="Tipe" dataIndex="type" />
        <a-table-column title="Ukuran" dataIndex="fileSize"><template #default="{record}">{{(record.fileSize/1024).toFixed(1)}} KB</template></a-table-column>
        <a-table-column title="Aksi">
          <template #default="{record}">
            <a-button type="link" size="small" @click="downloadDoc(record)">Download</a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-spin>

    <a-modal v-model:open="showForm" title="Laporan Progres" @ok="submitReport" :confirmLoading="saving">
      <div class="fg"><label>Progres (%)</label><a-slider v-model:value="form.progressPct" :min="0" :max="100" /></div>
      <div class="fg"><label>Deskripsi</label><textarea v-model="form.description" class="fi" rows="3" placeholder="Apa yang sudah dikerjakan?"></textarea></div>
      <div class="fg"><label>Kendala (opsional)</label><textarea v-model="form.obstacles" class="fi" rows="2" placeholder="Ada hambatan?"></textarea></div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { workProgramApi, budgetApi, progressReportApi, documentApi, KAK_DOWNLOAD_URL } from '@/services/api'
import { message } from 'ant-design-vue'

const route = useRoute()
const auth = useAuthStore()
const loading = ref(false)
const loadingRp = ref(false)
const item = ref<any>(null)
const reports = ref<any[]>([])
const showForm = ref(false)
const saving = ref(false)
const docs = ref<any[]>([])
const budgets = ref<any[]>([])
const form = ref({ progressPct: 50, description: '', obstacles: '' })
const formatRp = (n:number) => !n ? 'Rp0' : new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0 }).format(n)
const sc = (s:string) => ({ NOT_STARTED:'default', IN_PROGRESS:'processing', COMPLETED:'success', ON_HOLD:'warning' })[s] || 'default'
const scBud = (s:string) => ({ draft:'default', submitted:'processing', approved:'success', rejected:'error' })[s] || 'default'

onMounted(async () => {
  const id = route.params.id as string
  loading.value = true
  
  try {
    item.value = await workProgramApi.byId(id)
  } catch (e) {
    console.error('Gagal memuat detail proker:', e)
  }
  
  try {
    reports.value = await progressReportApi.byWorkProgram(id)
  } catch (e) {
    console.error('Gagal memuat progres:', e)
  }
  
  try {
    docs.value = await documentApi.byWorkProgram(id)
  } catch (e) {
    console.error('Gagal memuat dokumen:', e)
  }
  
  try {
    const budRes = await budgetApi.list(id)
    const raw = Array.isArray(budRes) ? budRes : (budRes?.data || [])
    budgets.value = raw.flatMap((b:any) =>
      (b.items || []).map((i:any) => ({ ...i, totalPrice: i.quantity * i.unitPrice, budgetStatus: b.status }))
    )
  } catch (e) {
    console.error('Gagal memuat anggaran:', e)
  }
  
  loading.value = false
})

const submitReport = async () => {
  if (!form.value.description || form.value.description.length < 10) {
    message.warning('Deskripsi minimal 10 karakter'); return
  }
  saving.value = true
  try {
    await progressReportApi.create({
      workProgramId: route.params.id,
      submittedBy: auth.user?.id,
      progressPct: form.value.progressPct,
      description: form.value.description,
      obstacles: form.value.obstacles || undefined,
    })
    message.success('Laporan dikirim')
    showForm.value = false
    reports.value = await progressReportApi.byWorkProgram(route.params.id as string)
    form.value = { progressPct: 50, description: '', obstacles: '' }
  } catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
  finally { saving.value = false }
}

const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('workProgramId', route.params.id as string)
  formData.append('uploadedBy', auth.user?.id || '')
  formData.append('type', 'dokumen')
  try {
    await documentApi.upload(formData)
    message.success('Dokumen terupload')
    docs.value = await documentApi.byWorkProgram(route.params.id as string)
  } catch (err: any) {
    message.error(err?.response?.data?.message || 'Gagal upload')
  }
  return false
}

const downloadDoc = async (record: any) => {
  try {
    const blob = await documentApi.download(record.id)
    const url = window.URL.createObjectURL(new Blob([blob]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', record.fileName)
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
  } catch (err) {
    message.error('Gagal mengunduh dokumen')
  }
}
</script>

<style scoped>
.fg { display:flex; flex-direction:column; gap:4px; margin-bottom:16px; }
.fg label { font-size:0.8rem; font-weight:600; color:#112D4E; }
.fi { padding:8px 10px; border-radius:6px; border:1px solid #DBE2EF; font-size:0.9rem; outline:none; width:100%; box-sizing:border-box; font-family:inherit; }
.fi:focus { border-color:#3F72AF; }
</style>