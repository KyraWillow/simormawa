<template>
  <div>
    <div class="fh"><h2 class="pt">Pengguna</h2><a-button type="primary" @click="openCreate">+ Tambah User</a-button></div>
    <a-table :dataSource="users" :loading="loading" rowKey="id">
      <a-table-column title="Nama" dataIndex="name" />
      <a-table-column title="Email" dataIndex="email" />
      <a-table-column title="Role" dataIndex="role" />
      <a-table-column title="Status"><template #default="{ record }"><a-tag :color="record.isActive ? 'green' : 'red'">{{ record.isActive ? 'Aktif' : 'Nonaktif' }}</a-tag></template></a-table-column>
      <a-table-column title="Aksi"><template #default="{ record }">
        <a-space>
          <a-button size="small" @click="openEdit(record)">Edit</a-button>
          <a-popconfirm :title="record.isActive ? 'Nonaktifkan user ini?' : 'Aktifkan user ini?'" @confirm="toggleActive(record)">
            <a-button size="small" :danger="record.isActive">{{ record.isActive ? 'Nonaktifkan' : 'Aktifkan' }}</a-button>
          </a-popconfirm>
          <a-popconfirm title="Hapus user ini secara permanen?" okText="Hapus" okType="danger" @confirm="handleDelete(record)">
            <a-button size="small" danger>Hapus</a-button>
          </a-popconfirm>
        </a-space>
      </template></a-table-column>
    </a-table>

    <a-modal v-model:open="showModal" :title="isEdit ? 'Edit User' : 'Tambah User'" @ok="handleSave" :confirmLoading="saving">
      <div class="fg"><label>Nama</label><input v-model="form.name" class="fi" /></div>
      <div class="fg"><label>Email</label><input v-model="form.email" class="fi" type="email" /></div>
      <div class="fg"><label>Role</label>
        <a-select v-model:value="form.role" style="width:100%">
          <a-select-option value="BPH">BPH</a-select-option>
          <a-select-option value="Kadiv">Kadiv</a-select-option>
          <a-select-option value="PIC/Staff">PIC/Staff</a-select-option>
          <a-select-option value="Bendahara">Bendahara</a-select-option>
          <a-select-option value="Sekretaris">Sekretaris</a-select-option>
          <a-select-option value="Admin">Admin</a-select-option>
        </a-select>
      </div>
      <div class="fg" v-if="!isEdit"><label>Password (min 12 karakter)</label><input v-model="form.password" type="password" class="fi" /></div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'

const loading = ref(false); const saving = ref(false)
const users = ref<any[]>([])
const showModal = ref(false); const isEdit = ref(false)
const form = ref({ id:'', name:'', email:'', role:'', password:'' })
const auth = useAuthStore()

onMounted(async () => { loading.value=true; try { users.value = await userApi.list() } catch {} finally { loading.value=false } })

const openCreate = () => {
  isEdit.value = false
  form.value = { id:'', name:'', email:'', role:'BPH', password:'' }
  showModal.value = true
}

const openEdit = (u:any) => {
  isEdit.value = true
  form.value = { id:u.id, name:u.name, email:u.email, role:u.role, password:'' }
  showModal.value = true
}

const handleSave = async () => {
  if (!form.value.name || !form.value.email || !form.value.role) {
    message.warning('Nama, email, dan role harus diisi'); return
  }
  if (!isEdit.value && (!form.value.password || form.value.password.length < 12)) {
    message.warning('Password minimal 12 karakter'); return
  }
  saving.value = true
  try {
    if (isEdit.value) {
      await userApi.update(form.value.id, { name:form.value.name, email:form.value.email, role:form.value.role })
      message.success('User diupdate')
    } else {
      await userApi.create({ name:form.value.name, email:form.value.email, role:form.value.role, password:form.value.password })
      message.success('User dibuat')
    }
    showModal.value = false
    users.value = await userApi.list()
  } catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
  finally { saving.value = false }
}

const toggleActive = async (u:any) => {
  try {
    await userApi.deactivate(u.id)
    const baru = (await userApi.list()).find((x:any)=>x.id===u.id)
    message.success(baru?.isActive ? 'User diaktifkan' : 'User dinonaktifkan')
    users.value = await userApi.list()
  } catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
}

const handleDelete = async (u:any) => {
  try {
    await userApi.delete(u.id)
    message.success('User berhasil dihapus')
    users.value = await userApi.list()
  } catch (err:any) { message.error(err?.response?.data?.message || 'Gagal menghapus user') }
}
</script>

<style scoped>
.fh { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
.pt { font-size:1.5rem; font-weight:700; color:#112D4E; margin:0; }
.fg { display:flex; flex-direction:column; gap:4px; margin-bottom:16px; }
.fg label { font-size:0.8rem; font-weight:600; color:#112D4E; }
.fi { height:36px; padding:0 10px; border-radius:6px; border:1px solid #DBE2EF; font-size:0.9rem; outline:none; width:100%; box-sizing:border-box; }
.fi:focus { border-color:#3F72AF; }
</style>