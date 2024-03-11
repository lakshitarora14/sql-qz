<script setup lang="ts">
import { reactive, onBeforeUnmount } from 'vue'
import { Search, UploadFilled } from '@element-plus/icons-vue'
import Worker from './../worker?worker'

// @ts-ignore
import Papa from 'papaparse'

const worker = new Worker()

const state = reactive({
  isSearchLoading: false as Boolean,
  isParseLoading: false as Boolean,
  parsedData: [] as Array<Record<string, any>>,
  generatedColumns: [] as Array<Record<string, any>>,
  searchQuery: '' as string,
  searchColumnFilter: '' as string,
  filteredData: [] as Array<Record<string, any>>,
  searchMode: false as Boolean,
  rowCount: 0 as number,
  filteredRowCount: 0 as number
})

function search() {
  if (!state.searchColumnFilter.length) {
    // @ts-ignore
    ElNotification({
      title: 'Error',
      message: 'Column to filter data not provided.',
      duration: 2000,
      type: 'error',
      position: 'bottom-right'
    })
    return
  }
  state.isSearchLoading = true
  worker.postMessage({
    data: JSON.stringify(state.parsedData),
    searchQuery: state.searchQuery,
    searchColumnFilter: state.searchColumnFilter
  })
  worker.onmessage = (e) => {
    state.searchMode = true
    state.isSearchLoading = false
    state.filteredData = e.data.result
    state.filteredRowCount = e.data.count
  }
}

function clearData() {
  state.searchMode = false
  state.searchQuery = ''
  state.searchColumnFilter = ''
  state.filteredData.length = 0
  state.filteredRowCount = 0
}

function generateColumns(data: Record<string, any>) {
  const result: Array<Record<string, any>> = []
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

let count = 0
function handleBeforeUpload(file: any) {
  state.isParseLoading = true
  Papa.parse(file, {
    header: true,
    worker: true,
    skipEmptyLines: true,
    complete: function (results: any) {
      state.parsedData = results.data
      state.generatedColumns = generateColumns(state.parsedData[0])
      worker.postMessage({
        task: 'count',
        data: JSON.stringify(state.parsedData)
      })
      worker.onmessage = (e) => {
        state.rowCount = e.data
      }
      state.isParseLoading = false
    }
  })
  return false
}

onBeforeUnmount(() => {
  worker.terminate()
})
</script>

<template>
  <div class="outer text-gray-500">
    <div class="overflow-y-auto mx-20 mt-4">
      <el-upload drag action="" :before-upload="handleBeforeUpload" :limit="1" accept=".csv">
        <el-icon :size="'4rem'"><UploadFilled /></el-icon>
        <div class="">Drop csv file here or <span class="text-blue-400">click to upload</span></div>
      </el-upload>
    </div>
    <div class="mx-20">
      <div class="grid-cols-12 grid items-center mb-4 mt-2">
        <el-input
          v-model="state.searchQuery"
          placeholder="Search..."
          @keydown.enter="search"
          :suffix-icon="Search"
          class="pr-2 col-span-6"
        />
        <el-select
          v-model="state.searchColumnFilter"
          class="pr-2 col-span-2"
          placeholder="Select Column"
        >
          <el-option
            v-for="item in state.generatedColumns"
            :default-first-option="true"
            :key="item.key"
            :label="item.title"
            :value="item.key"
          />
        </el-select>
        <el-button
          type="primary"
          plain
          class="col-span-1"
          :loading="state.isSearchLoading"
          @click="search"
        >
          Search
        </el-button>
        <el-button type="info" plain class="col-span-1" @click="clearData">
          Clear Search
        </el-button>
        <span class="col-span-2 ml-2"
          >Total no of records : {{ state.searchMode ? state.filteredRowCount : state.rowCount }}
        </span>
      </div>
      <el-auto-resizer class="border rounded-md">
        <template #default="{ height, width }">
          <el-table-v2
            v-loading="state.isParseLoading || state.isSearchLoading"
            :columns="state.generatedColumns"
            :data="state.searchMode ? state.filteredData : state.parsedData"
            :width="width"
            :height="height"
          />
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
  display: grid;
  grid-template-rows: 18vh 70vh;
  height: 10vh;
}
</style>
