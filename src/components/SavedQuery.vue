<script setup lang="ts">
import { defineProps, reactive, onMounted } from 'vue'
import { useQueriesStore } from '@/stores/queries'
import { Edit, Delete, Check, Close, DArrowRight } from '@element-plus/icons-vue'

const queriesStore = useQueriesStore()

const state = reactive({
  isEdit: false as Boolean,
  tempName: '' as String,
  tempQuery: '' as String,
  previewMode: false as Boolean
})
const props = defineProps({
  query: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  state.tempName = props.query.name
  state.tempQuery = props.query.query
})

function clearChanges() {
  state.tempName = props.query.name
  state.tempQuery = props.query.query
  state.isEdit = false
}

function editSavedQuery() {
  state.isEdit = true
}

function deleteSavedQuery() {
  queriesStore.removeSavedQuery(props.query.id)
}

function saveChanges() {
  queriesStore.editSavedQuery(props.query.id, state.tempName, state.tempQuery)
  state.isEdit = false
}

function runQuery() {
  if (
    queriesStore.currentQueriesData.filter((query) => {
      if (query.name === props.query.name) {
        return query
      }
    })?.length
  ) {
    queriesStore.setCurrentTab(props.query.name)
    return
  }
  const item: any = queriesStore.savedQueriesData.find((query) => query.name === props.query.name)
  queriesStore.saveQueryToList('currentQueries', item)
  queriesStore.setCurrentTab(props.query.name)
}
</script>

<template>
  <div v-if="!state.isEdit" class="m-2 border p-2 rounded-md text-gray-700">
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="state.previewMode = !state.previewMode"
    >
      <div class="ml-2">{{ props.query.name }}</div>
      <div>
        <el-tooltip content="Run Query" :show-arrow="false">
          <el-button circle type="success" plain :icon="DArrowRight" @click.stop="runQuery">
          </el-button>
        </el-tooltip>
        <el-tooltip content="Edit" :show-arrow="false">
          <el-button :icon="Edit" type="info" plain circle @click="editSavedQuery" />
        </el-tooltip>
        <el-tooltip content="Delete" :show-arrow="false">
          <el-button :icon="Delete" type="danger" plain circle @click="deleteSavedQuery" />
        </el-tooltip>
      </div>
    </div>
    <div class="mt-2">
      <el-input
        v-if="state.previewMode"
        disabled
        v-model="state.tempQuery"
        :rows="3"
        type="textarea"
        placeholder="Query"
      />
    </div>
  </div>
  <div v-else class="m-2 border p-2 rounded-md">
    <div><el-input v-model="state.tempName" placeholder="Name" /></div>
    <div class="mt-2">
      <el-input v-model="state.tempQuery" :rows="3" type="textarea" placeholder="Query" />
    </div>
    <div class="flex items-center justify-end mt-2">
      <el-tooltip content="Save" :show-arrow="false">
        <el-button size="small" type="success" plain @click="saveChanges">
          <el-icon size="1.2rem"><Check /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="Cancel" :show-arrow="false">
        <el-button size="small" type="danger" plain @click="clearChanges">
          <el-icon size="1.2rem"><Close /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped></style>
