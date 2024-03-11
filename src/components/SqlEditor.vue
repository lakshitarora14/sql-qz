<script setup lang="ts">
import { reactive, onMounted, defineEmits, ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { sql } from '@codemirror/lang-sql'
import { CopyDocument, FolderAdd, DataAnalysis, CircleClose } from '@element-plus/icons-vue'
import { useQueriesStore } from '@/stores/queries'

const queriesStore = useQueriesStore()

const emit = defineEmits(['on:search'])
const popupVisibleRef = ref(false)

const EDITOR_OPTIONS = {
  lineNumbers: true,
  line: true,
  indentWithTabs: true,
  smartIndent: true,
  autofocus: true,
  mode: 'text/x-sql',
  showHint: true
}

const state = reactive({
  sqlQuery: '' as string,
  saveName: '' as string,
  resetElForm: false as boolean
})

const props = defineProps({
  sqlQuery: {
    type: String,
    default: '',
    required: false
  }
})

onMounted(() => {
  state.sqlQuery = props.sqlQuery
})

function search() {
  if (!state.sqlQuery.length) {
    // @ts-ignore
    ElNotification({
      title: 'Error',
      message: 'Query is empty.',
      duration: 2000,
      type: 'error',
      position: 'bottom-right'
    })
    return
  }
  const query = {
    name: queriesStore.getCurrentTab,
    time: new Date().toLocaleString(),
    query: state.sqlQuery,
    message: '10 rows returned',
    duration: '0.1s'
  }
  queriesStore.saveQueryToList('queryHistory', query)
  emit('on:search', state.sqlQuery)
}
function clearSearch() {
  state.sqlQuery = ''
  emit('on:search', state.sqlQuery)
}
function saveQuery() {
  if (!state.sqlQuery.length) {
    // @ts-ignore
    ElNotification({
      title: 'Error',
      message: 'Query is empty.',
      duration: 2000,
      type: 'error',
      position: 'bottom-right'
    })
    return
  }
  if (
    queriesStore.savedQueriesData.filter((query) => {
      if (query.name === state.saveName) {
        return query
      }
    })?.length
  ) {
    // @ts-ignore
    ElNotification({
      title: 'Error',
      message: 'Query with same name already exists',
      duration: 2000,
      type: 'error',
      position: 'bottom-right'
    })
  } else {
    popupVisibleRef.value = false
    queriesStore.saveQueryToList('savedQueries', { name: state.saveName, query: state.sqlQuery })
    state.saveName = ''
  }
}
function exportQuery() {
  if (!state.sqlQuery.length) {
    return
  }
  // @ts-ignore
  ElNotification({
    title: 'Info',
    message: 'Export Query',
    duration: 2000,
    type: 'info',
    position: 'bottom-right'
  })
}
function copyQuery() {
  if (!state.sqlQuery.length) {
    return
  }
  navigator.clipboard.writeText(state.sqlQuery).then(() => {
    // @ts-ignore
    ElNotification({
      title: 'Success',
      message: 'Query Copied to Clipboard',
      duration: 2000,
      type: 'success',
      position: 'bottom-right'
    })
  })
}
</script>

<template>
  <div class="sql-outer">
    <div class="border rounded-sm mr-2">
      <codemirror
        v-model="state.sqlQuery"
        placeholder="Enter your SQL query here"
        :extensions="sql()"
        :style="{ height: '4rem' }"
        :options="EDITOR_OPTIONS"
        :disabled="false"
        @keydown.enter.prevent=""
      ></codemirror>
    </div>
    <div class="sql-outer__sql-buttons border-b">
      <el-button type="primary" class="w-full" @click="search">Search</el-button>
      <div class="flex pt-2 items-center justify-around">
        <el-tooltip content="Clear Query" :show-arrow="false">
          <el-button link @click="clearSearch">
            <el-icon><CircleClose /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="Copy Query" :show-arrow="false">
          <el-button link @click="copyQuery">
            <el-icon><CopyDocument /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="Save Query" :show-arrow="false">
          <div class="m-0 p-0">
            <el-popover :show-arrow="false" :visible="popupVisibleRef" :width="300" :height="200">
              <template #default>
                <el-input v-model="state.saveName" placeholder="Enter query name" />
                <div class="mt-2 flex justify-end">
                  <el-button
                    size="small"
                    @click="
                      () => {
                        popupVisibleRef = false
                        state.saveName = ''
                      }
                    "
                    >Cancel</el-button
                  >
                  <el-button size="small" type="primary" @click="saveQuery">Confirm</el-button>
                </div>
              </template>
              <template #reference>
                <el-button link @click="popupVisibleRef = true">
                  <el-icon><FolderAdd /></el-icon>
                </el-button>
              </template>
            </el-popover>
          </div>
        </el-tooltip>

        <el-tooltip content="Export Query" :show-arrow="false">
          <el-button link @click="exportQuery">
            <el-icon><DataAnalysis /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sql-outer {
  display: grid;
  grid-template-columns: 90% 10%;
}
</style>
