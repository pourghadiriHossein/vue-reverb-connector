import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher
const echo = new Echo({
  broadcaster: import.meta.env.VITE_BROADCATSER,
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  wssPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  authEndpoint: import.meta.env.VITE_AUTH_END_POINT,
  auth: {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TEMP_BEARER_TOKEN}`,
    },
  },
})
export default echo
