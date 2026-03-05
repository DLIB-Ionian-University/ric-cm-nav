<script setup>
import { useMainStore } from '@/stores/store'

const searchvalue = defineModel()
// access the `store` variable anywhere in the component ✨
const store = useMainStore()
// console.log(JSON.stringify(store))

function clearSearch() {
  searchvalue.value = "";
  store.searchTable("relations", "");
}


</script>

<template>
  <div>
    <h1>Relations</h1>
    <div class="row justify-content-end">
      <div class="col-sm-5 col">
        <div class="input-group">
          <input type="text" class="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon"
            placeholder="Search.." v-model="searchvalue"
            v-on:keyup.enter="store.searchTable('relations', searchvalue.toLowerCase())">
          <span class="input-group-text" id="btnGroupAddon"
            @click="store.searchTable('relations', searchvalue.toLowerCase())"><i class="bi bi-search"></i></span>
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
            <th scope="col" class="thick minwidth">Domain</th>
            <th scope="col" class="thick minwidth">Range</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.getRelations  ">
            <th scope="row">
              <a class="link-primary pnter" @click="store.selectRelation(item['code'])">{{ item["code"] }}</a>
            </th>
            <td class="minwidth">
              {{ item["name"] }}
            </td>
            <td class="minwidth">
              <ul v-for="itm in item.v">
                <li class="nav-item">
                  <a class="link-primary pnter" @click="store.selectEntity(itm['DomainID'])">{{
                    itm["DomainID"] + " " + itm["DomainName"] }}</a>
                </li>
              </ul>
            </td>
            <td class="minwidth">
              <ul v-for="itm in item.v">
                <li class="nav-item">
                  <a class="link-primary pnter" @click="store.selectEntity(itm['RangeID'])">{{
                    itm["RangeID"] + " " + itm["RangeName"] }}</a>
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
