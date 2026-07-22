<template>
  <div>
    <h2 class="pt">Notifikasi</h2>
    <a-table :dataSource="list" :loading="loading" rowKey="id">
      <a-table-column title="Judul" dataIndex="title" />
      <a-table-column title="Pesan" dataIndex="message" ellipsis />
      <a-table-column title="Status">
        <template #default="{ record }">
          <a-tag :color="record.isRead ? 'default' : 'blue'">{{ record.isRead ? 'Terbaca' : 'Baru' }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="Waktu" dataIndex="createdAt" />
      <a-table-column title="Aksi">
        <template #default="{ record }">
          <a-button v-if="!record.isRead" size="small" @click="markRead(record.id)">Tandai terbaca</a-button>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { notificationApi } from '@/services/api'
import { message } from 'ant-design-vue'

const loading = ref(false)
const list = ref<any[]>([])

onMounted(async () => {
  loading.value = true
  try {
    const res = await notificationApi.list()
    list.value = res.data || []
  } catch {} finally { loading.value = false }
})

const markRead = async (id: string) => {
  try {
    await notificationApi.markRead(id)
    message.success('Ditandai terbaca')
    const res = await notificationApi.list()
    list.value = res.data || []
  } catch {}
}
</script>

<style scoped>
.pt { font-size:1.5rem; font-weight:700; color:#112D4E; margin-bottom:1.5rem; }
</style>