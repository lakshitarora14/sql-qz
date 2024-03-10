<script setup lang="ts">
import { reactive } from 'vue'
import { Search, FullScreen } from '@element-plus/icons-vue'

const state = reactive({
  searchQuery: '' as string,
  descriptionVisible: false as boolean
})

function expandDescription() {
  state.descriptionVisible = true
}
</script>

<template>
  <header>
    <div class="border rounded-md mx-2 h-[21vh]">
      <el-input
        v-model="state.searchQuery"
        class="px-2 mt-2"
        size="large"
        placeholder="Search..."
        :suffix-icon="Search"
      />
      <div>
        <div class="px-3 pt-2 font-bold text-gray-500 flex justify-between items-center">
          SELECT
          <el-tooltip :show-arrow="false" content="Open Query Assist" placement="bottom">
            <el-button
              :icon="FullScreen"
              size="small"
              circle
              plain
              type="info"
              @click="expandDescription"
            />
          </el-tooltip>
        </div>
        <div class="px-3 pt-2 text-gray-700 overflow-y-auto h-[calc(21vh-6rem)]">
          The <span class="text-pink-700">SELECT</span> command is used to select data from a
          database. The data returned is stored in a result table, called the result set.
        </div>
      </div>
    </div>
    <el-dialog title="Query Assist" v-model="state.descriptionVisible" width="40%">
      <div class="">
        <el-input
          v-model="state.searchQuery"
          class="px-2 mt-2"
          size="large"
          placeholder="Search..."
          :suffix-icon="Search"
        />
        <div class="m-2 mb-6">
          <div class="font-bold text-lg text-gray-500 mt-4">Select</div>
          <div class="text-gray-700 mt-2">
            The <span class="text-pink-700">SELECT</span> command is used to select data from a
            database. The data returned is stored in a result table, called the result set.
          </div>
          <div class="font-bold text-gray-500 mt-4">Syntax</div>
          <div class="border bg-gray-100 rounded-md p-4 mt-2">
            <span class="text-pink-700">SELECT</span> column1, column2, ...
            <br />
            <span class="text-pink-700">FROM</span> table_name;
          </div>
          <div class="font-bold text-gray-500 mt-4">Example</div>
          <div class="border bg-gray-100 rounded-md p-4 mt-2">
            <span class="text-pink-700">SELECT</span> CustomerName, City FROM Customers;
            <br />
            <span class="text-pink-700">SELECT</span> *
            <span class="text-pink-700">FROM</span> Customers;
          </div>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<style scoped></style>
