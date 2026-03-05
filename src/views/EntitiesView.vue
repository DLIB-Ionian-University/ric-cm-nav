<script setup>
import { useMainStore } from '@/stores/store'
const searchvalue = defineModel()
// access the `store` variable anywhere in the component ✨
const store = useMainStore()
// console.log(JSON.stringify(store))
function clearSearch() {
  searchvalue.value = "";
  store.searchTable("entities", "");
}
</script>

<template>
  <div>
    <h1>Entities</h1>
    <div class="row">
      <div class="col-sm-8 col">
        <div class="row justify-content-end">
          <div class="col-sm-5 col">
            <div class="input-group">
              <input type="text" class="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon"
                placeholder="Search.." v-model="searchvalue"
                v-on:keyup.enter="store.searchTable('entities', searchvalue.toLowerCase())">
              <span class="input-group-text" id="btnGroupAddon"
                @click="store.searchTable('entities', searchvalue.toLowerCase())"><i class="bi bi-search"></i></span>
              <span class="input-group-text" id="btnGroupAddon" @click="clearSearch()"><i
                  class="bi bi-x-circle"></i></span>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in store.getEntities">
                <th scope="row">
                  <a class="link-primary pnter" @click="store.selectEntity(item['ID'])">{{ item["ID"] }}</a>
                </th>
                <td class="minwidth">
                  {{ item["Name"] }}
                </td>
                <td class="minwidth">{{ item["Definition"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-sm-4 col">
        <div class="list-group">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Hierarchy of Entities</h5>
            </div>
            <div class="overflow-auto fullheight">
              <ul v-for="itm1 in store.data.ent_hierarchy">
                <li class=" nav-item"> <a class="link-primary pnter" @click="store.selectEntity(itm1['code'])">{{
                  itm1['code'] + " " + itm1['name'] }}</a>
                  <ul v-for="itm2 in itm1.children">
                    <li class="nav-item"> <a class="link-primary pnter" @click="store.selectEntity(itm2['code'])">{{
                      itm2['code'] + " " + itm2['name'] }}</a>
                      <ul v-for="itm3 in itm2.children">
                        <li class="nav-item"> <a class="link-primary pnter" @click="store.selectEntity(itm3['code'])">{{
                          itm3['code'] + " " + itm3['name'] }}</a>
                          <ul v-for="itm4 in itm3.children">
                            <li class="nav-item"> <a class="link-primary pnter"
                                @click="store.selectEntity(itm4['code'])">{{
                                  itm4['code'] + " " + itm4['name'] }}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
  min-width: 180px;
}

.pnter {
  cursor: pointer;
}
</style>
