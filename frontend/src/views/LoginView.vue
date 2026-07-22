<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  console.log('handleLogin called', email.value, password.value)
  if (!email.value || !password.value) {
    message.warning('Email dan kata sandi harus diisi')
    return
  }
  loading.value = true
  try {
    const res = await auth.login(email.value, password.value)
    console.log('login success', res)
    message.success('Login berhasil')
    router.push('/dashboard')
  } catch (err: any) {
    console.error('login error', err)
    const msg = err?.response?.data?.message || err?.message || 'Email atau kata sandi salah'
    message.error(msg)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-layout">
    <div class="login-image">
      <div class="image-content">
        <div class="big-logo">SIMORAWA</div>
        <p class="tagline">Sistem Informasi Manajemen Program Kerja HIMA</p>
        <div class="dots">
          <span v-for="i in 24" :key="i" class="dot" :style="{ animationDelay: i * 0.12 + 's' }"></span>
        </div>
      </div>
    </div>
    <div class="login-form-panel">
      <div class="form-container">
        <div class="form-header">
          <img src="/assets/simormawa.png" alt="SIMORAWA" class="header-logo" />
          <h1 class="form-title">Masuk</h1>
          <p class="form-subtitle">Masuk ke akun Simormawa Anda</p>
        </div>
        <div class="login-form">
          <div class="field-group">
            <label class="field-label">Email</label>
            <input v-model="email" type="email" class="field-input" placeholder="nama@student.uisi.ac.id" />
          </div>
          <div class="field-group">
            <label class="field-label">Kata Sandi</label>
            <input v-model="password" type="password" class="field-input" placeholder="Kata sandi" @keyup.enter="handleLogin" />
          </div>
          <button class="btn-primary" :disabled="loading" @click="handleLogin">
            <span v-if="loading">Memproses...</span>
            <span v-else>Masuk</span>
          </button>
        </div>
        <div class="form-footer">
          <span>Belum punya akun? </span><button class="btn-link">Daftar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-layout { display: flex; height: 100vh; width: 100%; }
.login-image {
  flex: 0 0 50%; height: 100%;
  background: linear-gradient(135deg, #112D4E 0%, #1a3a6b 30%, #3F72AF 70%, #5e9ed6 100%);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.image-content { text-align: center; padding: 3rem; z-index: 1; }
.big-logo { font-size: 2.25rem; font-weight: 800; color: #F9F7F7; letter-spacing: 0.15em; margin-bottom: 0.75rem; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.tagline { font-size: 0.875rem; color: rgba(249,247,247,0.75); max-width: 300px; margin: 0 auto; line-height: 1.5; }
.dots { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 2rem; max-width: 240px; margin-left: auto; margin-right: auto; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(249,247,247,0.15); animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.6; } }
.login-form-panel {
  flex: 0 0 50%; display: flex; align-items: center; justify-content: center;
  background: #F9F7F7; padding: 2rem;
}
.form-container { width: 100%; max-width: 400px; }
.form-header { text-align: center; margin-bottom: 2rem; }
.header-logo { width: 64px; height: 64px; border-radius: 12px; margin-bottom: 1rem; }
.form-title { font-size: 1.5rem; font-weight: 700; color: #112D4E; }
.form-subtitle { font-size: 0.875rem; color: #3F72AF; }

.login-form { display: flex; flex-direction: column; gap: 1.25rem; }
.field-group { display: flex; flex-direction: column; gap: 0.375rem; }
.field-label { font-size: 0.875rem; font-weight: 600; color: #112D4E; }
.field-input {
  height: 48px; padding: 0 12px; border-radius: 8px;
  border: 1px solid #DBE2EF; font-size: 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff; color: #112D4E;
}
.field-input:focus { border-color: #3F72AF; box-shadow: 0 0 0 2px rgba(63,114,175,0.1); }
.field-input::placeholder { color: #999; }

.btn-primary {
  height: 48px; border-radius: 8px; font-size: 1rem; font-weight: 600;
  background: #3F72AF; color: #fff; border: none;
  cursor: pointer; transition: background 0.2s;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-primary:hover { background: #112D4E; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.form-footer { text-align: center; font-size: 0.875rem; color: #112D4E; margin-top: 1rem; }
.btn-link { background: none; border: none; color: #3F72AF; font-weight: 600; cursor: pointer; font-size: 0.875rem; padding: 0; font-family: inherit; }
.btn-link:hover { text-decoration: underline; }

@media (max-width: 767px) { .login-image { display: none; } .login-form-panel { flex: 0 0 100%; } }
</style>
