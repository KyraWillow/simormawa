<template>
  <div>
    <h2 class="page-title">{{ isEdit ? 'Edit Program Kerja' : 'Buat Program Kerja' }}</h2>
    <div class="form-card">
      <div class="field-group">
        <label class="field-label">Nama</label>
        <input v-model="form.name" class="field-input" placeholder="Nama program kerja" />
      </div>
      <div class="field-group">
        <label class="field-label">Deskripsi</label>
        <textarea v-model="form.description" class="field-textarea" rows="4" placeholder="Deskripsi program kerja"></textarea>
      </div>
      <div class="field-group">
        <label class="field-label">PIC</label>
        <a-select v-model:value="form.picId" style="width:100%" placeholder="Pilih PIC">
          <a-select-option v-for="u in userList" :key="u.id" :value="u.id">{{ u.name }} ({{ u.role }})</a-select-option>
        </a-select>
      </div>
      <div class="field-group">
        <label class="field-label">Deadline</label>
        <input v-model="form.deadlineStr" type="date" class="field-input" />
      </div>

      <hr style="border:none;border-top:1px solid #DBE2EF;margin:8px 0" />

      <h3 style="margin:0 0 8px;color:#112D4E;font-size:1rem">Rincian Anggaran</h3>
      <div v-for="(item, i) in form.budgetItems" :key="i" class="budget-row">
        <input v-model="item.itemName" class="fi-sm" placeholder="Nama item" />
        <input v-model.number="item.quantity" type="number" min="1" class="fi-sm" placeholder="Qty" style="width:60px" />
        <input v-model="item.unit" class="fi-sm" placeholder="Satuan" style="width:70px" />
        <input v-model.number="item.unitPrice" type="number" min="0" class="fi-sm" placeholder="Harga" style="width:100px" />
        <span style="font-size:0.85rem;font-weight:600;color:#112D4E;min-width:80px;text-align:right">{{ formatRp(item.quantity * item.unitPrice) }}</span>
        <a-button size="small" danger @click="form.budgetItems.splice(i,1)" v-if="form.budgetItems.length>1">×</a-button>
      </div>
      <a-button type="dashed" size="small" @click="form.budgetItems.push({itemName:'',quantity:1,unit:'',unitPrice:0})">+ Tambah Item</a-button>
      <div v-if="form.budgetItems.length" style="margin-top:8px;font-size:0.9rem;font-weight:600;color:#112D4E">
        Total Anggaran: {{ formatRp(form.budgetItems.reduce((s,i)=>s+i.quantity*i.unitPrice,0)) }}
      </div>

      <button class="btn-primary" :disabled="saving" @click="handleSubmit" style="margin-top:16px">
        {{ saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { workProgramApi, budgetApi, userApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const saving = ref(false)
const isEdit = ref(!!route.params.id)
const userList = ref<any[]>([])

const form = ref({
  id: '',
  name: '',
  description: '',
  picId: '',
  deadlineStr: '',
  budgetItems: [] as { itemName: string; quantity: number; unit: string; unitPrice: number }[],
})

const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

onMounted(async () => {
  try { userList.value = await userApi.list() } catch {}
  if (isEdit.value) {
    try {
      const d = await workProgramApi.byId(route.params.id as string)
      form.value.id = d.id
      form.value.name = d.name
      form.value.description = d.description
      form.value.picId = d.picId
      form.value.deadlineStr = d.deadline?.slice(0, 10) || ''

      try {
        const budgets = await budgetApi.list(d.id)
        const budgetList = Array.isArray(budgets) ? budgets : (budgets?.data || [])
        if (budgetList.length > 0) {
          const activeBudget = budgetList[0]
          form.value.budgetItems = activeBudget.items.map((i: any) => ({
            itemName: i.itemName,
            quantity: i.quantity,
            unit: i.unit || 'unit',
            unitPrice: i.unitPrice,
          }))
        }
      } catch { /* abaikan jika gagal fetch budget */ }
    } catch { message.error('Gagal memuat data') }
  }
})

const handleSubmit = async () => {
  if (!form.value.name || !form.value.description || !form.value.picId || !form.value.deadlineStr) {
    message.warning('Semua field harus diisi'); return
  }
  saving.value = true
  try {
    const payload = {
      name: form.value.name,
      description: form.value.description,
      picId: form.value.picId,
      deadline: new Date(form.value.deadlineStr).toISOString(),
    }

    if (isEdit.value) {
      await workProgramApi.update(form.value.id, payload)
      if (form.value.budgetItems.length > 0) {
        const validItems = form.value.budgetItems.filter(i => i.itemName && i.quantity > 0 && i.unitPrice >= 0)
        if (validItems.length > 0) {
          try {
            await budgetApi.create({
              workProgramId: form.value.id,
              submittedBy: auth.user?.id,
              items: validItems.map(i => ({ itemName: i.itemName, quantity: i.quantity, unit: i.unit || 'unit', unitPrice: i.unitPrice })),
            })
          } catch { /* budget opsional */ }
        }
      }
      message.success('Program kerja diperbarui')
    } else {
      const res = await workProgramApi.create(payload)
      const wpId = res.id || res.data?.id
      if (wpId && form.value.budgetItems.length > 0) {
        const validItems = form.value.budgetItems.filter(i => i.itemName && i.quantity > 0 && i.unitPrice >= 0)
        if (validItems.length > 0) {
          try {
            await budgetApi.create({
              workProgramId: wpId,
              submittedBy: auth.user?.id,
              items: validItems.map(i => ({ itemName: i.itemName, quantity: i.quantity, unit: i.unit || 'unit', unitPrice: i.unitPrice })),
            })
          } catch { /* budget opsional */ }
        }
      }
      message.success('Program kerja berhasil dibuat')
    }
    router.push('/work-programs')
  } catch (err: any) {
    message.error(err?.response?.data?.message || 'Gagal')
  } finally { saving.value = false }
}
</script>

<style scoped>
.page-title { font-size: 1.5rem; font-weight: 700; color: #112D4E; margin-bottom: 1.5rem; }
.form-card {
  background: white; border-radius: 8px; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1.25rem;
}
.field-group { display: flex; flex-direction: column; gap: 0.375rem; }
.field-label { font-size: 0.875rem; font-weight: 600; color: #112D4E; }
.field-input {
  height: 44px; padding: 0 12px; border-radius: 8px;
  border: 1px solid #DBE2EF; font-size: 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  outline: none; transition: border-color 0.2s;
  background: #fff; color: #112D4E;
}
.field-input:focus { border-color: #3F72AF; box-shadow: 0 0 0 2px rgba(63,114,175,0.1); }
.field-textarea {
  padding: 10px 12px; border-radius: 8px;
  border: 1px solid #DBE2EF; font-size: 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  outline: none; resize: vertical; background: #fff; color: #112D4E;
}
.field-textarea:focus { border-color: #3F72AF; box-shadow: 0 0 0 2px rgba(63,114,175,0.1); }
.budget-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.fi-sm {
  height: 32px; padding: 0 8px; border-radius: 6px;
  border: 1px solid #DBE2EF; font-size: 0.85rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  outline: none; background: #fff; color: #112D4E;
}
.fi-sm:focus { border-color: #3F72AF; }
.btn-primary {
  height: 44px; border-radius: 8px; font-size: 1rem; font-weight: 600;
  background: #3F72AF; color: #fff; border: none;
  cursor: pointer; transition: background 0.2s;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-primary:hover { background: #112D4E; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
