<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { onMounted, ref } from 'vue'
import echo from '@/services/echo'

const currentUser = ref(1)

const notify = (data) => {
  toast(data, {
    autoClose: 3000,
  })
}
onMounted(() => {
  // echo.private(`alarm.${currentUser.value}`)
  //public channel
  // echo.channel(`alarm`).listen('AlarmEvent', (response) => {
  //   console.log('Received data:', response)
  //   notify(response.message)
  // })
  //private channel
  // echo.private(`alarm.${currentUser.value}`).listen('AlarmEvent', (response) => {
  //   notify(response.message)
  // })
})
</script>

<template>
  <div></div>
</template>
