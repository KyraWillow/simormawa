<template>
  <a-layout class="dashboard-layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible breakpoint="lg" class="sidebar">
      <div class="sidebar-header">
        <span v-if="!collapsed" class="sidebar-logo">SIMORAWA</span>
        <span v-else class="sidebar-logo-sm">SIM</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKey" theme="dark" mode="inline" @click="navigate">
        <a-menu-item key="/dashboard"><DashboardOutlined /><span>Dashboard</span></a-menu-item>
        <a-menu-item key="/work-programs"><FileTextOutlined /><span>Program Kerja</span></a-menu-item>
        <a-menu-item key="/evaluations" v-if="store.hasRole('BPH','Kadiv','Admin')"><CheckCircleOutlined /><span>Evaluasi</span></a-menu-item>
        <a-menu-item key="/users" v-if="store.hasRole('Admin')"><TeamOutlined /><span>Pengguna</span></a-menu-item>
        <a-menu-item key="/finance" v-if="store.hasRole('BPH','Bendahara','Admin')"><WalletOutlined /><span>Keuangan</span></a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="topbar">
        <div class="topbar-left">
          <a-breadcrumb><a-breadcrumb-item>{{ route.meta?.title || route.name }}</a-breadcrumb-item></a-breadcrumb>
        </div>
        <div class="topbar-right" ref="bellContainer">
          <a-badge :count="unreadCount" :overflow-count="99">
            <BellOutlined class="bell-icon" @click="togglePanel" />
          </a-badge>
          <div v-if="showPanel" class="notif-panel">
            <div class="notif-header">Notifikasi</div>
            <div v-if="unreadList.length === 0" class="notif-empty">Tidak ada notifikasi</div>
            <div v-for="n in unreadList" :key="n.id" class="notif-item" @click="handleClick(n)">
              <div class="notif-title">{{ n.title }}</div>
              <div v-if="n.message" class="notif-msg">{{ n.message }}</div>
            </div>
            <div class="notif-footer" @click="showPanel = false; router.push('/notifications')">Lihat semua</div>
          </div>
          <a-dropdown>
            <span class="user-trigger"><UserOutlined /> {{ store.user?.name }}</span>
            <template #overlay>
              <a-menu><a-menu-item @click="logout">Keluar</a-menu-item></a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { notificationApi } from '@/services/api'
import {
  DashboardOutlined, FileTextOutlined, CheckCircleOutlined,
  TeamOutlined, WalletOutlined, UserOutlined, BellOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
const store = useAuthStore()
const collapsed = ref(false)
const selectedKey = ref([route.path])
const unreadCount = ref(0)
const unreadList = ref<any[]>([])
const showPanel = ref(false)
const bellContainer = ref<HTMLElement | null>(null)
let pollInterval: any

const fetchUnread = async () => {
  try {
    const res = await notificationApi.unreadList()
    unreadList.value = res.data || []
    unreadCount.value = unreadList.value.length
  } catch {}
}

const togglePanel = () => {
  showPanel.value = !showPanel.value
  if (showPanel.value) fetchUnread()
}

const handleClickOutside = (e: MouseEvent) => {
  if (bellContainer.value && !bellContainer.value.contains(e.target as Node)) {
    showPanel.value = false
  }
}

onMounted(() => {
  fetchUnread()
  pollInterval = setInterval(fetchUnread, 30000)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  clearInterval(pollInterval)
  document.removeEventListener('click', handleClickOutside)
})

const handleClick = async (n: any) => {
  try { await notificationApi.markRead(n.id) } catch {}
  showPanel.value = false
  if (n.link) router.push(n.link)
  fetchUnread()
}

const navigate = ({ key }: { key: string }) => router.push(key)
const logout = () => { store.logout(); router.push('/login') }
</script>

<style scoped>
.dashboard-layout { min-height: 100vh; }
.sidebar { background: #112D4E; }
.sidebar-header { height: 64px; display: flex; align-items: center; justify-content: center; color: #F9F7F7; font-weight: 700; font-size: 1rem; }
.sidebar-logo { font-size: 1.125rem; letter-spacing: 0.05em; }
.sidebar-logo-sm { font-size: 0.875rem; }
:deep(.ant-menu-dark) { background: #112D4E; }
:deep(.ant-menu-item-selected) { background: #3F72AF !important; }
.topbar { background: #F9F7F7; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #DBE2EF; }
.topbar-left { display: flex; align-items: center; }
.topbar-right { display: flex; align-items: center; gap: 1rem; position: relative; }
.user-trigger { cursor: pointer; color: #112D4E; font-weight: 600; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem; }
.bell-icon { font-size: 1.25rem; color: #112D4E; cursor: pointer; }
.content { margin: 24px; min-height: calc(100vh - 112px); background: #F9F7F7; }
.notif-panel { position: absolute; top: 100%; right: 0; width: 340px; max-height: 420px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.15); z-index: 1000; overflow: hidden; margin-top: 4px; }
.notif-header { padding: 12px 16px; font-weight: 700; color: #112D4E; border-bottom: 1px solid #DBE2EF; }
.notif-empty { padding: 24px 16px; text-align: center; color: #999; font-size: 0.85rem; }
.notif-item { padding: 10px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0; transition: background .2s; }
.notif-item:hover { background: #F0F8FF; }
.notif-title { font-size: 0.85rem; font-weight: 600; color: #112D4E; }
.notif-msg { font-size: 0.75rem; color: #666; margin-top: 2px; white-space: normal; }
.notif-footer { padding: 10px 16px; text-align: center; font-size: 0.8rem; color: #3F72AF; cursor: pointer; border-top: 1px solid #DBE2EF; }
.notif-footer:hover { background: #F0F8FF; }
</style>