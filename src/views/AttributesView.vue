<script setup>
import { useMainStore } from '@/stores/store'
const searchvalue = defineModel()
// access the `store` variable anywhere in the component ✨
const store = useMainStore()
// console.log(JSON.stringify(store))
function clearSearch() {
  searchvalue.value = "";
  store.searchTable("attributes", "");
}
</script>

<template>
  <div>
    <h1>Attributes</h1>
    <div class="row justify-content-end">
      <div class="col-sm-5 col">
        <div class="input-group">
          <input type="text" class="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon"
            placeholder="Search.." v-model="searchvalue"
            v-on:keyup.enter="store.searchTable('attributes', searchvalue.toLowerCase())">
          <span class="input-group-text" id="btnGroupAddon"
            @click="store.searchTable('attributes', searchvalue.toLowerCase())"><i class="bi bi-search"></i></span>
          <span class="input-group-text" id="btnGroupAddon" @click="clearSearch()"><i class="bi bi-x-circle"></i></span>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col" class="thickcode">Code</th>
            <th scope="col" class="thick minwidth">Name</th>
            <th scope="col" class="thick minwidth">Description</th>
            <th scope="col" class="thick minwidth">Entities</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.getAttributes  ">
            <th scope="row">
              <a class="link-primary pnter" @click="store.selectAttribute(item['ID'])">{{ item["ID"] }}</a>
            </th>
            <td class="minwidth">
              {{ item["Name"] }}
            </td>
            <td class="minwidth">{{ item["Definition"] }}</td>
            <td class="minwidth">
              <ul v-for="itm in item.entities">
                <li class="nav-item">
                  <a class="link-primary pnter" @click="store.selectEntity(itm['code'])">{{
                    itm["code"] + " " + itm["name"] }}</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.thickcode {
  font-weight: bold;
  min-width: 100px;
}

.thick {
  font-weight: bold;
}

.minwidth {
  min-width: 200px;
}

.pnter {
  cursor: pointer;
}
</style>
