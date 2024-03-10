import './assets/main.css'
// import {
//   CopyDocument,
//   Delete,
//   Folder,
//   FolderOpened,
//   Collection,
//   Document,
//   QuestionFilled,
//   VideoPlay
// } from '@element-plus/icons-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.component('CopyDocument', CopyDocument)
// app.component('Delete', Delete)
// app.component('Folder', Folder)
// app.component('FolderOpened', FolderOpened)
// app.component('Collection', Collection)
// app.component('Document', Document)
// app.component('QuestionFilled', QuestionFilled)
// app.component('VideoPlay', VideoPlay)
app.mount('#app')
