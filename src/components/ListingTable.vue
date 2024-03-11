<script setup lang="ts">
import { defineProps } from 'vue'
import { DATASET } from '@/datasets/sample'

const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})

function generateColumnsFromJson(data: Record<string, any>) {
  const result: Array<Record<string, any>> = []
  Object.keys(data).forEach((key) => {
    result.push({
      key: key,
      dataKey: key,
      title: key,
      width: key === 'bio' ? 950 : 150
    })
  })
  return result
}

const columns = generateColumnsFromJson(DATASET[0])
</script>

<template>
  <div class="h-[calc(72vh-8rem)]">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="props.query.length ? columns : []"
          :data="props.query.length ? DATASET : []"
          :width="width"
          :height="height"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<style scoped></style>
