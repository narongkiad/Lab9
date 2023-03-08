import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

import App from './App.vue'
import router from './router'

import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'


const firebaseConfig = {
  apiKey: 'AIzaSyBGrU8y-tQXOR4zgvb6KCxf-Bh2CuA0lZo',
  authDomain: 'fir-932b2.firebaseapp.com',
  projectId: 'fir-932b2',
  storageBucket: 'fir-932b2.appspot.com',
  messagingSenderId: '737136466492',
  appId: '1:737136466492:web:c399f26099cf94a1828139'
}
//const auth = getAuth(app);
const vuetify = createVuetify({
  components,
  directives
})

const initfriebase = initializeApp(firebaseConfig);
export const db = getFirestore(initfriebase);
const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
