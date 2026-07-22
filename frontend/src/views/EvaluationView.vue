<template>
  <div>
    <div class="eval-header">
      <h2 class="page-title">Evaluasi</h2>
      <div style="display:flex;gap:8px">
        <a-button v-if="auth.hasRole('BPH', 'Admin')" @click="downloadXlsx('evaluations')">Export XLSX</a-button>
        <a-button v-if="auth.hasRole('BPH', 'Kadiv', 'Admin')" type="primary" @click="openCreate">+ Buat Evaluasi</a-button>
      </div>
    </div>
    <a-row :gutter="[16,16]" style="margin-bottom:24px">
      <a-col :span="6"><a-card><a-statistic title="Total" :value="dash.total" /></a-card></a-col>
      <a-col :span="6"><a-card><a-statistic title="Submitted" :value="dash.submitted" value-style="color:#52c41a" /></a-card></a-col>
      <a-col :span="6"><a-card><a-statistic title="Draft" :value="dash.draft" value-style="color:#faad14" /></a-card></a-col>
      <a-col :span="6"><a-card><a-statistic title="Rata-rata" :value="dash.averageScore" :precision="2" /></a-card></a-col>
    </a-row>
    <a-table :dataSource="list" :loading="loading" rowKey="id">
      <a-table-column title="Proker">
        <template #default="{record}">{{ getProkerName(record.workProgramId) }}</template>
      </a-table-column>
      <a-table-column title="Status">
        <template #default="{record}"><a-tag :color="record.status==='submitted'?'green':'orange'">{{record.status}}</a-tag></template>
      </a-table-column>
      <a-table-column title="Skor"><template #default="{record}">{{avgScore(record.indicators)}}</template></a-table-column>
      <a-table-column title="Aksi">
        <template #default="{record}">
          <a-space>
            <a-button v-if="record.status === 'draft' && auth.hasRole('BPH', 'Kadiv', 'Admin')" size="small" @click="openEdit(record)">
              {{ auth.hasRole('BPH') ? 'Beri Penilaian' : (auth.hasRole('Admin') ? 'Beri Penilaian / Edit' : 'Edit') }}
            </a-button>
            <a-button v-if="record.status === 'draft' && auth.hasRole('BPH', 'Kadiv', 'Admin')" size="small" type="primary" @click="openSubmit(record.id)">
              Submit
            </a-button>
            <span v-if="record.status === 'submitted'" style="color:#52c41a">✓ Disubmit</span>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <a-modal v-model:open="showCreate" :title="isEdit ? (auth.hasRole('BPH') ? 'Beri Penilaian Evaluasi' : 'Edit/Beri Penilaian Evaluasi') : 'Buat Evaluasi'" @ok="handleCreate" :confirmLoading="saving" width="600px">
      <div class="field-group"><label>Program Kerja</label>
        <a-select v-model:value="form.workProgramId" :disabled="isEdit" style="width:100%" placeholder="Pilih proker">
          <a-select-option v-for="wp in prokerList" :key="wp.id" :value="wp.id">{{wp.name}}</a-select-option>
        </a-select>
      </div>
      <div class="field-group"><label>Evaluator (Kadiv/BPH)</label>
        <a-select v-model:value="form.evaluatedBy" :disabled="isEdit" style="width:100%" placeholder="Pilih evaluator">
          <a-select-option v-for="u in userList" :key="u.id" :value="u.id">{{u.name}} ({{u.role}})</a-select-option>
        </a-select>
      </div>
      <div style="margin:16px 0;font-weight:600">Indikator Penilaian</div>
      <div v-for="(ind,i) in form.indicators" :key="i" class="indicator-card">
        <div style="display:flex;justify-content:space-between"><b>Indikator {{i+1}}</b><a-button v-if="!isEdit || auth.hasRole('Admin', 'Kadiv')" size="small" danger @click="form.indicators.splice(i,1)">Hapus</a-button></div>
        <div class="field-group"><label>Nama Indikator</label><input v-model="ind.indicatorName" :disabled="isEdit && !auth.hasRole('Admin', 'Kadiv')" class="fi" /></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div class="field-group"><label>Target</label><input v-model="ind.target" :disabled="isEdit && !auth.hasRole('Admin', 'Kadiv')" class="fi" /></div>
          <div class="field-group"><label>Realisasi</label><input v-model="ind.realisasi" :disabled="isEdit && !auth.hasRole('Admin', 'Kadiv')" class="fi" /></div>
        </div>
        <div class="field-group" v-if="auth.hasRole('BPH', 'Admin')"><label>Skor (1-5)</label><a-rate v-model:value="ind.score" :count="5" /></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px" v-if="!isEdit || auth.hasRole('Admin', 'Kadiv')">
        <a-button @click="addIndicator" type="dashed" style="flex:1">+ Tambah Indikator</a-button>
        <a-button @click="loadTemplate" type="default">Gunakan Template Standar</a-button>
      </div>
    </a-modal>

    <a-modal v-model:open="showSubmit" title="Submit Evaluasi" @ok="handleSubmit" :confirmLoading="submitting" width="500px">
      <div class="field-group">
        <label>Kesimpulan</label>
        <textarea v-model="submitForm.kesimpulan" class="fi" rows="3" style="height:auto;padding:8px" placeholder="Masukkan kesimpulan evaluasi..."></textarea>
      </div>
      <div class="field-group">
        <label>Rekomendasi</label>
        <textarea v-model="submitForm.rekomendasi" class="fi" rows="3" style="height:auto;padding:8px" placeholder="Masukkan rekomendasi evaluasi..."></textarea>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { evaluationApi, workProgramApi, userApi } from '@/services/api'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'

const auth = useAuthStore()

const list = ref<any[]>([])
const dash = ref({ total:0, submitted:0, draft:0, averageScore:0, scoreDistribution:{} })
const prokerList = ref<any[]>([])
const userList = ref<any[]>([])
const loading = ref(false)
const showCreate = ref(false)
const saving = ref(false)
const isEdit = ref(false)
const showSubmit = ref(false)
const submitting = ref(false)
const submitTargetId = ref('')
const submitForm = ref({ kesimpulan: '', rekomendasi: '' })

const form = ref({ workProgramId:'', evaluatedBy:'', indicators:[] as any[] })

const downloadXlsx = async (type: string) => {
  try {
    const res = await api.get(`/export/${type}/xlsx`, { responseType: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([res.data]))
    a.download = type + '-' + new Date().toISOString().slice(0,10) + '.xlsx'
    a.click()
    URL.revokeObjectURL(a.href)
  } catch {}
}

const avgScore = (indicators:any[]) => {
  if (!indicators?.length) return 0
  const s = indicators.reduce((a:number,i:any)=>a+i.score,0)
  return (s/indicators.length).toFixed(1)
}

const getProkerName = (id: string) => {
  const p = prokerList.value.find(x => x.id === id)
  return p ? p.name : id
}

const loadTemplate = () => {
  form.value.indicators = [
    { indicatorName: 'Realisasi Target Utama (KPI/KPA)', target: '100%', realisasi: '', score: 5 },
    { indicatorName: 'Kesesuaian Waktu & Rencana Kegiatan', target: '100%', realisasi: '', score: 5 },
    { indicatorName: 'Kesesuaian & Efisiensi Anggaran', target: '100%', realisasi: '', score: 5 },
    { indicatorName: 'Kinerja PIC & Panitia Pelaksana', target: 'Baik', realisasi: '', score: 5 }
  ]
}

const openCreate = async () => {
  prokerList.value = await workProgramApi.list()
  userList.value = await userApi.list()
  form.value = { workProgramId:'', evaluatedBy:'', indicators:[] }
  loadTemplate()
  isEdit.value = false
  showCreate.value = true
}

const addIndicator = () => form.value.indicators.push({indicatorName:'',target:'',realisasi:'',score:5})

onMounted(async () => {
  loading.value = true
  try {
    prokerList.value = await workProgramApi.list()
    list.value = await evaluationApi.list()
    dash.value = await evaluationApi.dashboard()
  } catch {} finally { loading.value = false }
})

const handleCreate = async () => {
  if (!form.value.workProgramId || !form.value.evaluatedBy) {
    message.warning('Pilih proker dan evaluator')
    return
  }
  saving.value = true
  try {
    await evaluationApi.create(form.value)
    message.success('Evaluasi dibuat')
    showCreate.value = false
    list.value = await evaluationApi.list()
    dash.value = await evaluationApi.dashboard()
  } catch (err:any) {
    message.error(err?.response?.data?.message || 'Gagal')
  } finally { saving.value = false }
}

const openEdit = async (record: any) => {
  prokerList.value = await workProgramApi.list()
  userList.value = await userApi.list()
  form.value = {
    workProgramId: record.workProgramId,
    evaluatedBy: record.evaluatedBy,
    indicators: record.indicators.map((ind: any) => ({
      indicatorName: ind.indicatorName,
      target: ind.target,
      realisasi: ind.realisasi,
      score: ind.score || 5
    }))
  }
  isEdit.value = true
  showCreate.value = true
}

const openSubmit = (id: string) => {
  submitTargetId.value = id
  submitForm.value = { kesimpulan: '', rekomendasi: '' }
  showSubmit.value = true
}

const handleSubmit = async () => {
  if (!submitForm.value.kesimpulan || !submitForm.value.rekomendasi) {
    message.warning('Lengkapi kesimpulan dan rekomendasi')
    return
  }
  submitting.value = true
  try {
    await evaluationApi.submit(submitTargetId.value, submitForm.value)
    message.success('Evaluasi disubmit')
    showSubmit.value = false
    list.value = await evaluationApi.list()
    dash.value = await evaluationApi.dashboard()
  } catch (err: any) {
    message.error(err?.response?.data?.message || 'Gagal submit')
  } finally { submitting.value = false }
}
</script>

<style scoped>
.eval-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
.page-title { font-size:1.5rem; font-weight:700; color:#112D4E; margin:0; }
.field-group { display:flex; flex-direction:column; gap:4px; margin-bottom:12px; }
.field-group label { font-size:0.8rem; font-weight:600; color:#112D4E; }
.fi { height:36px; padding:0 10px; border-radius:6px; border:1px solid #DBE2EF; font-size:0.9rem; outline:none; width:100%; box-sizing:border-box; }
.fi:focus { border-color:#3F72AF; }
.indicator-card { border:1px solid #DBE2EF; border-radius:8px; padding:12px; margin-bottom:8px; }
</style>