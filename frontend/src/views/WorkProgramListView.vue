<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">Program Kerja</h2>
      <div style="display:flex;gap:8px">
        <a-button v-if="auth.hasRole('Admin')" @click="downloadXlsx">Export XLSX</a-button>
        <a-button v-if="auth.hasRole('Kadiv', 'Admin')" type="primary" @click="$router.push('/work-programs/create')">+ Buat Proker</a-button>
      </div>
    </div>
    <a-table :dataSource="list" :loading="loading" rowKey="id">
      <a-table-column title="Nama" dataIndex="name" />
      <a-table-column title="Deskripsi" dataIndex="description" ellipsis />
      <a-table-column title="Status">
        <template #default="{ record }">
          <a-select :disabled="!auth.hasRole('Kadiv', 'PIC/Staff', 'Admin')" :value="record.status" size="small" style="width:140px" @change="(v)=>updateStatus(record.id,v)">
            <a-select-option value="NOT_STARTED">Belum Mulai</a-select-option>
            <a-select-option value="IN_PROGRESS">Berjalan</a-select-option>
            <a-select-option value="ON_HOLD">Ditunda</a-select-option>
            <a-select-option value="COMPLETED">Selesai</a-select-option>
          </a-select>
        </template>
      </a-table-column>
      <a-table-column title="Deadline" dataIndex="deadline" />
      <a-table-column title="Aksi">
        <template #default="{ record }">
          <a-space>
            <a-button size="small" @click="$router.push('/work-programs/'+record.id)">Detail</a-button>
            <a-button v-if="auth.hasRole('Kadiv', 'Admin')" size="small" @click="$router.push('/work-programs/'+record.id+'/edit')">Edit</a-button>
            <a-popconfirm v-if="auth.hasRole('Kadiv', 'Admin')" title="Hapus proker ini?" @confirm="handleDelete(record.id)">
              <a-button size="small" danger>Hapus</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api, { workProgramApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)
const list = ref<any[]>([])

onMounted(async () => {
  loading.value = true
  try { list.value = await workProgramApi.list() }
  catch {} finally { loading.value = false }
})

const updateStatus = async (id:string, status:string) => {
  try {
    await workProgramApi.updateStatus(id, status)
    message.success('Status diperbarui')
    list.value = await workProgramApi.list()
  } catch (err:any) {
    message.error(err?.response?.data?.message || 'Gagal update status')
  }
}

const handleDelete = async (id:string) => {
  try {
    await workProgramApi.delete(id)
    message.success('Proker dihapus')
    list.value = await workProgramApi.list()
  } catch (err:any) {
    message.error(err?.response?.data?.message || 'Gagal hapus')
  }
}

const downloadXlsx = async () => {
  try {
    const res = await api.get('/export/work-programs/xlsx', { responseType: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([res.data]))
    a.download = 'work-programs-' + new Date().toISOString().slice(0,10) + '.xlsx'
    a.click()
    URL.revokeObjectURL(a.href)
    message.success('Export XLSX berhasil')
  } catch (err) {
    message.error('Gagal export XLSX')
  }
}
</script>

<style scoped>
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
.page-title { font-size:1.5rem; font-weight:700; color:#112D4E; margin:0; }
</style>