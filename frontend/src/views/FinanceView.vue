<template>
  <div>
    <div class="fh">
      <h2 class="pt">Keuangan</h2>
      <div style="display:flex;gap:8px">
        <a-button v-if="auth.hasRole('Bendahara', 'Admin')" @click="downloadXlsx">Export XLSX</a-button>
        <a-button v-if="auth.hasRole('BPH', 'Kadiv', 'Bendahara', 'Admin')" type="primary" @click="openCreate">+ Buat Anggaran</a-button>
      </div>
    </div>

    <a-row :gutter="[16,16]" style="margin-bottom:24px">
      <a-col :span="6"><a-card><a-statistic title="Total Anggaran" :value="dash.total" /></a-card></a-col>
      <a-col :span="6"><a-card><a-statistic title="Nilai" :value="dash.totalAmount" :precision="0" prefix="Rp" /></a-card></a-col>
      <a-col :span="6"><a-card><a-statistic title="Disetujui" :value="dash.approved" value-style="color:#52c41a" /></a-card></a-col>
      <a-col :span="6"><a-card><a-statistic title="Draft" :value="dash.draft" value-style="color:#faad14" /></a-card></a-col>
    </a-row>

    <h3 style="margin-bottom:12px;color:#112D4E">Kas</h3>
    <a-row :gutter="[16,16]" style="margin-bottom:24px">
      <a-col :span="12"><a-card><a-statistic title="Saldo Kas" :value="kasData.balance" :precision="0" prefix="Rp" :value-style="{color: kasData.balance >= 0 ? '#3F72AF' : '#f5222d'}" /></a-card></a-col>
      <a-col :span="12">
        <a-card>
          <div style="display:flex;gap:8px">
            <a-button v-if="auth.hasRole('BPH', 'Bendahara', 'Admin')" type="primary" size="small" @click="openTx('pemasukan')">+ Pemasukan</a-button>
            <a-button v-if="auth.hasRole('BPH', 'Bendahara', 'Admin')" size="small" @click="openTx('pengeluaran')" :disabled="kasData.balance <= 0">- Pengeluaran</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-table :dataSource="kasData.transactions" rowKey="id" size="small" :loading="loadingKas">
      <a-table-column title="Tipe" dataIndex="type">
        <template #default="{record}"><a-tag :color="record.type==='pemasukan'?'green':'red'">{{record.type}}</a-tag></template>
      </a-table-column>
      <a-table-column title="Jumlah" dataIndex="amount"><template #default="{record}">Rp {{record.amount?.toLocaleString('id-ID')}}</template></a-table-column>
      <a-table-column title="Keterangan" dataIndex="description" ellipsis />
      <a-table-column title="Tanggal" dataIndex="transactionDate" />
    </a-table>

    <h3 style="margin:24px 0 12px;color:#112D4E">Anggaran</h3>
    <a-table :dataSource="list" :loading="loading" rowKey="id">
      <a-table-column title="Proker" dataIndex="workProgramId" ellipsis />
      <a-table-column title="Nilai" dataIndex="totalAmount"><template #default="{record}">Rp {{record.totalAmount?.toLocaleString('id-ID')}}</template></a-table-column>
      <a-table-column title="Status"><template #default="{record}"><a-tag :color="sc(record.status)">{{record.status}}</a-tag></template></a-table-column>
      <a-table-column title="Aksi"><template #default="{record}">
        <a-space>
          <a-button size="small" @click="submitBudget(record.id)" v-if="record.status==='draft'">Submit</a-button>
          <a-button size="small" @click="approveBudget(record.id,'approved')" v-if="record.status==='submitted' && auth.hasRole('BPH','Admin')" type="primary">Setuju</a-button>
          <a-button size="small" @click="approveBudget(record.id,'rejected')" v-if="record.status==='submitted' && auth.hasRole('BPH','Admin')" danger>Tolak</a-button>
          <span v-if="record.status==='approved' && auth.hasRole('BPH','Admin')" style="color:#52c41a">✓ Disetujui</span>
          <span v-else-if="record.status==='rejected'" style="color:#f5222d">✗ Ditolak</span>
        </a-space>
      </template></a-table-column>
    </a-table>

    <a-modal v-model:open="showTx" :title="txType==='pemasukan'?'Pemasukan':'Pengeluaran'" @ok="handleTx" :confirmLoading="savingTx">
      <div class="fg"><label>Jumlah (Rp)</label><input v-model="txForm._amountDisplay" type="text" class="fi" @input="onAmountInput" /></div>
      <div class="fg"><label>Keterangan</label><textarea v-model="txForm.description" class="fi" rows="2"></textarea></div>
    </a-modal>

    <a-modal v-model:open="showCreate" title="Buat Anggaran" @ok="handleCreate" :confirmLoading="saving" width="600px">
      <div class="fg"><label>Program Kerja</label>
        <a-select v-model:value="form.workProgramId" style="width:100%" placeholder="Pilih proker">
          <a-select-option v-for="wp in prokerList" :key="wp.id" :value="wp.id">{{wp.name}}</a-select-option>
        </a-select>
      </div>
      <div class="fg"><label>Pengaju</label>
        <a-select v-model:value="form.submittedBy" style="width:100%" placeholder="Pilih pengaju">
          <a-select-option v-for="u in userList" :key="u.id" :value="u.id">{{u.name}} ({{u.role}})</a-select-option>
        </a-select>
      </div>
      <div style="margin:16px 0;font-weight:600">Rincian Anggaran</div>
      <div v-for="(item,i) in form.items" :key="i" class="ic">
        <div style="display:flex;justify-content:space-between"><b>Item {{i+1}}</b><a-button size="small" danger @click="form.items.splice(i,1)">Hapus</a-button></div>
        <div class="fg"><label>Nama Item</label><input v-model="item.itemName" class="fi" /></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
          <div class="fg"><label>Jumlah</label><input v-model.number="item.quantity" type="number" min="1" class="fi" /></div>
          <div class="fg"><label>Satuan</label><input v-model="item.unit" class="fi" /></div>
          <div class="fg"><label>Harga</label><input v-model="item._priceDisplay" type="text" class="fi" @input="onPriceInput(item, $event)" /></div>
        </div>
        <div style="text-align:right;color:#3F72AF;font-weight:600">Rp {{(item.quantity*item.unitPrice).toLocaleString('id-ID')}}</div>
      </div>
      <a-button @click="addItem" type="dashed" block>+ Tambah Item</a-button>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api, { budgetApi, workProgramApi, userApi, kasApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'

const auth = useAuthStore()

const list = ref<any[]>([])
const dash = ref({ total:0, totalAmount:0, draft:0, submitted:0, approved:0, rejected:0 })
const prokerList = ref<any[]>([])
const userList = ref<any[]>([])
const loading = ref(false)
const showCreate = ref(false)
const saving = ref(false)
const form = ref({ workProgramId:'', submittedBy:'', items:[] as any[] })

const kasData = ref({ id:'', balance:0, transactions:[] as any[] })
const loadingKas = ref(false)
const showTx = ref(false)
const savingTx = ref(false)
const txType = ref('pemasukan')
const txForm = ref({ amount: 0, description: '', _amountDisplay: '0' })

const onAmountInput = (e: Event) => {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  txForm.value.amount = parseInt(raw) || 0
  txForm.value._amountDisplay = txForm.value.amount.toLocaleString('id-ID');
  (e.target as HTMLInputElement).value = txForm.value._amountDisplay
}

const sc = (s:string) => ({ draft:'default', submitted:'processing', approved:'success', rejected:'error' })[s] || 'default'
const addItem = () => form.value.items.push({itemName:'', quantity:1, unit:'', unitPrice:0, _priceDisplay:'0'})

const openCreate = async () => {
  prokerList.value = await workProgramApi.list()
  userList.value = await userApi.list()
  form.value = { workProgramId:'', submittedBy:'', items:[{itemName:'', quantity:1, unit:'', unitPrice:0, _priceDisplay:'0'}] }
  showCreate.value = true
}

const onPriceInput = (item: any, e: Event) => {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  item.unitPrice = parseInt(raw) || 0
  item._priceDisplay = item.unitPrice.toLocaleString('id-ID');
  (e.target as HTMLInputElement).value = item._priceDisplay
}

const openTx = (type:string) => {
  txType.value = type
  txForm.value = { amount: 0, description: '', _amountDisplay: '0' }
  showTx.value = true
}

onMounted(async () => {
  loading.value = true
  try {
    list.value = await budgetApi.list()
  } catch (e) {
    console.error('Gagal memuat daftar anggaran:', e)
  }
  try {
    dash.value = await budgetApi.dashboard()
  } catch (e) {
    console.error('Gagal memuat dashboard anggaran:', e)
  }
  try {
    kasData.value = await kasApi.find()
  } catch (e) {
    console.error('Gagal memuat data kas:', e)
  }
  loading.value = false
})

const handleCreate = async () => {
  if (!form.value.workProgramId || !form.value.submittedBy) { message.warning('Pilih proker dan pengaju'); return }
  saving.value = true
  try {
    await budgetApi.create(form.value)
    message.success('Anggaran dibuat')
    showCreate.value = false
    list.value = await budgetApi.list(); dash.value = await budgetApi.dashboard()
  } catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
  finally { saving.value = false }
}

const submitBudget = async (id:string) => {
  try { await budgetApi.submit(id); message.success('Disubmit'); list.value = await budgetApi.list(); dash.value = await budgetApi.dashboard() }
  catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
}

const approveBudget = async (id:string, action:string) => {
  try { await budgetApi.approve(id, action); message.success(action==='approved'?'Disetujui':'Ditolak'); list.value = await budgetApi.list(); dash.value = await budgetApi.dashboard() }
  catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
}

const handleTx = async () => {
  if (txForm.value.amount <= 0 || !txForm.value.description) {
    message.warning('Isi jumlah dan keterangan'); return
  }
  savingTx.value = true
  try {
    kasData.value = await kasApi.recordTransaction({
      type: txType.value, amount: txForm.value.amount,
      description: txForm.value.description, createdBy: auth.user?.id || '',
    })
    const kas = await kasApi.find()
    kasData.value = kas
    message.success('Transaksi berhasil')
    showTx.value = false
  } catch (err:any) { message.error(err?.response?.data?.message || 'Gagal') }
  finally { savingTx.value = false }
}

const downloadXlsx = async () => {
  try {
    const res = await api.get('/export/budgets/xlsx', { responseType: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([res.data]))
    a.download = 'budgets-' + new Date().toISOString().slice(0,10) + '.xlsx'
    a.click()
    URL.revokeObjectURL(a.href)
    message.success('Export XLSX berhasil')
  } catch (err) {
    message.error('Gagal export XLSX')
  }
}
</script>

<style scoped>
.fh { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
.pt { font-size:1.5rem; font-weight:700; color:#112D4E; margin:0; }
.fg { display:flex; flex-direction:column; gap:4px; margin-bottom:12px; }
.fg label { font-size:0.8rem; font-weight:600; color:#112D4E; }
.fi { height:36px; padding:0 10px; border-radius:6px; border:1px solid #DBE2EF; font-size:0.9rem; outline:none; width:100%; box-sizing:border-box; }
.fi:focus { border-color:#3F72AF; }
.ic { border:1px solid #DBE2EF; border-radius:8px; padding:12px; margin-bottom:8px; }
</style>