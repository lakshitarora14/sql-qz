<script setup lang="ts"></script>

<template>
  <div class="outer-container">
    <div class="flex justify-center items-center">
      <div class="ml-6">
        <div class="text-gray-500 text-8xl font-black mb-8">
          <div class="text-9xl mb-20 text-[#BF97f2]">SQL QZ</div>
          KEEP YOUR DATA <br />
          ORGANISED
        </div>
        <RouterLink class="mr-4" to="/sql">
          <el-button class="mt-12 outer-container__cover-button" size="large" type="info">
            SQL Parser</el-button
          >
        </RouterLink>
        <RouterLink to="/csv">
          <el-button size="large" class="mt-12 outer-container__cover-button" type="info">
            CSV Reader</el-button
          >
        </RouterLink>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <img src="@/assets/minified-cover.png" alt="cover image" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  &__cover-button {
    background: #6b7280;
    padding: 1.5rem;
    font-size: 2vh !important;
  }
}
</style>
