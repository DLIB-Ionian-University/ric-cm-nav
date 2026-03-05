<script setup>
import { useMainStore } from '@/stores/store'

// access the `store` variable anywhere in the component ✨
const store = useMainStore()
console.log(JSON.stringify(store))
</script>

<template>
  <div>
    <h1>Entities Hierarchy</h1>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col" class="thick">Code</th>
          <th scope="col" class="thick">Name</th>
          <th scope="col" class="thick">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.getEntities">
          <th scope="row">{{ item["ID"] }}</th>
          <td>{{ item["Name"] }}</td>
          <td>{{ item["Definition"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.thick {
  font-weight: bold;
  min-width: 150px;
}
</style>
