<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})
const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150
  }))

const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    )
  })

const columns = generateColumns(10)
const data = generateData(columns, 200)
</script>

<template>
  <div class="h-[calc(72vh-8rem)]">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="query.length ? columns : []"
          :data="query.length ? data : []"
          :width="width"
          :height="height"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<style scoped></style>
