<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { onMounted, ref } from 'vue'
import echo from '@/services/echo'

const currentUser = ref(1)

if ('Notification' in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')
    } else {
      console.log('Notification permission denied.')
    }
  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('serviceWorker.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration.scope)

      if ('sync' in registration) {
        registration.sync.register('show-notifications').catch((error) => {
          console.error('Sync registration failed:', error)
        })
      }
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
    })
}

const notify = (message: string) => {
  if (Notification.permission === 'granted') {
    new Notification('New Alert', {
      body: message,
      icon: 'favicon.ico',
      requireInteraction: true,
    })
  } else {
    console.warn('Notification permission not granted')
  }
}

onMounted(() => {
  // echo.private(`alarm.${currentUser.value}`)
  //public channel
  // echo.channel(`alarm`).listen('AlarmEvent', (response) => {
  //   console.log('Received data:', response)
  //   notify(response.message)
  // })
  // private channel
  echo.private(`alarm.${currentUser.value}`).listen('AlarmEvent', (response) => {
    notify(response.message)
  })
})
</script>

<template>
  <div></div>
</template>
