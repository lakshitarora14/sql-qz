<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import MyWorker from './csvParserWorker?worker'
import Papa from 'papaparse'

const state = reactive({
  isSearchLoading: false as Boolean,
  isParseLoading: false as Boolean,
  parsedData: [] as Array<Record<string, any>>,
  generatedColumns: [] as Array<Record<string, any>>
})

const fileList = ref([])

function handleFileUpload(event: Event) {
  const worker = new Worker(new URL('./csvParserWorker.js', import.meta.url))
  // const parseWorker = new MyWorker()
  console.log('parseWorker', worker)
  worker.postMessage(event.target.files[0])
  worker.onmessage = (res) => {
    console.log(res.data)
    state.parsedData = res.data
  }
  // state.isParseLoading = true
  // const file = event.target.files[0]
  // Papa.parse(file, {
  //   skipEmptyLines: true,
  //   header: true,
  //   complete: (results) => {
  //     console.log(results)
  //     state.parsedData = results.data
  //     state.generatedColumns = generateColumns(state.parsedData[0])
  //     state.isParseLoading = false
  //   }
  // })
}

function generateColumns(data: Record<string, any>) {
  const result = []
  Object.keys(data).forEach((key) => {
    console.log(key)
    result.push({
      key: key,
      dataKey: key,
      title: key,
      width: 150
    })
  })
  return result
}

const handleBeforeUpload = (file) => {
  fileList.value = [file]
  console.log('1', fileList.value)
  return false // Prevent uploading immediately
}

const handleError = (error) => {
  console.log('error', error)
}
const handleUploadSuccess = () => {
  // upload.uploadFiles[0]
  debugger
  console.log('2', fileList.value[0])
  const file = fileList.value[0]
  Papa.parse(file, {
    skipEmptyLines: true,
    header: true,
    complete: (results) => {
      console.log(results)
      state.parsedData = results.data
      console.log(results.data)
      state.generatedColumns = generateColumns(state.parsedData[0])
      state.isParseLoading = false
    }
  })
}
</script>

<template>
  <div class="text-gray-500">
    <input type="file" accept=".csv" @change="handleFileUpload($event)" />

    <el-upload
      drag
      action=""
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleError"
      :limit="1"
      accept=".csv"
    >
      <el-icon :size="'5rem'"><UploadFilled /></el-icon>
      <div class="">Drop csv file here or <span class="text-blue-400">click to upload</span></div>
      <template #tip>
        <div class="">Drop Csv Files</div>
      </template>
    </el-upload>
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="state.generatedColumns"
          :data="state.parsedData"
          :width="width"
          :height="height"
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<style scoped></style>
