<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import { Folder, FolderOpened, Document } from '@element-plus/icons-vue'
const state = reactive({
  expand: false
})

const props = defineProps({
  table: {
    type: Object,
    default: () => {},
    required: true
  }
})
</script>

<template>
  <div>
    <span class="cursor-pointer" @click="state.expand = !state.expand">
      <span v-if="!state.expand"
        ><el-icon><Folder /></el-icon>
      </span>
      <span v-else>
        <el-icon><FolderOpened /></el-icon
      ></span>
      {{ props.table.name }}
    </span>
    <div v-if="state.expand" class="border-l ml-6">
      <div v-for="column in props.table.items" :key="column.name" class="ml-2">
        <div class="mt-2">
          <span class="mr-2"
            ><el-icon><Document /></el-icon
          ></span>
          {{ column.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
