<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import Papa from 'papaparse'

const state = reactive({
  isSearchLoading: false as Boolean,
  isParseLoading: false as Boolean,
  parsedData: [] as Array<Record<string, any>>,
  generatedColumns: [] as Array<Record<string, any>>
})

function generateColumns(data: Record<string, any>) {
  const result = []
  Object.keys(data).forEach((key) => {
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
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      state.parsedData = results.data
      state.generatedColumns = generateColumns(state.parsedData[0])
    }
  })
  return false
}
</script>

<template>
  <div class="text-gray-500">
    <el-upload drag action="" :before-upload="handleBeforeUpload" :limit="1" accept=".csv">
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
