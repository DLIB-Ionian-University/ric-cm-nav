<script setup>
import { useMainStore } from '@/stores/store'
import * as _ from "lodash";

// access the `store` variable anywhere in the component ✨
const store = useMainStore()
const rel_type_inv = {
  "Domain": "Range",
  "Range": "Domain",
}
</script>

<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"></li>
        <li class="breadcrumb-item" v-for="i in (store.getEntityInfo).entity.ancestors">
          <a href="#" @click="store.selectEntity(i.code)">{{ i.code }} {{ i.name }}</a>
        </li>
        <li class="breadcrumb-item">{{ (store.getEntityInfo).entity.code }} {{ (store.getEntityInfo).entity.name }}</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-sm-10 col">
        <h1>{{ (store.getEntityInfo).entity.code }} {{ (store.getEntityInfo).entity.name }} </h1>
      </div>
      <div class="col-sm-2 col text-end">
        <!-- <button type="button" class="btn btn-primary" @click="store.goBack">Back</button> -->
      </div>
    </div>
    <div class="row">
      <div class="col-sm-9 col">
        <div class="row">
          <div class="col-sm-12 col">
            <div class="list-group">
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Definition</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getEntityInfo).entity.definition.split('||')  ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Scope Notes</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getEntityInfo).entity.scopenotes.split('||')   ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Examples</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getEntityInfo).entity.examples.split('||')    ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Comments</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getEntityInfo).entity.comments.split('||')     ">
                  {{ i }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row topmargin">
          <div class="col-sm-4 col">
            <div class="list-group">
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Attributes</h5>
                </div>
                <div class="overflow-auto maxheight">
                  <ul v-for="itm1 in (store.getEntityInfo).entity.attributes">
                    <li class=" nav-item">
                      <a class="link-primary pnter" @click="store.selectEntity(itm1['code'])">
                        {{ itm1['code'] + " " + itm1['name'] }}
                      </a>
                      <ul v-for="itm2 in itm1.attributes">
                        <li class=" nav-item">
                          <a class="link-primary pnter" @click="store.selectAttribute(itm2['code'])">
                            {{ itm2['code'] + " " + itm2['name'] }}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-8 col">
            <div class="list-group">
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Relations</h5>
                </div>
                <div class="overflow-auto maxheight">
                  <table class="table table-sm">
                    <tr v-for="it in _.keys(_.groupBy((store.getEntityInfo).entity.relations, 'type'))">
                      <td>
                        <span class="thick"> As {{ it.toUpperCase() }}: </span>
                        <table class="table table-sm">
                          <thead>
                            <tr>
                              <th scope="col" class="thickcode">Code</th>
                              <th scope="col" class="minwidth">Name</th>
                              <th scope="col" class="minwidth">{{ rel_type_inv[it] }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in (_.groupBy((store.getEntityInfo).entity.relations, 'type'))[it]">
                              <th scope="row">
                                <a class="link-primary pnter" @click="store.selectRelation(item['Relation ID'])">
                                  {{ item['Relation ID'] }}
                                </a>
                              </th>
                              <td>
                                {{ item["Name"] }}
                              </td>
                              <td class="minwidth">
                                <a class="link-primary pnter"
                                  @click="store.selectEntity(item[rel_type_inv[it]]['code'])">
                                  {{ item[rel_type_inv[it]]["code"] }} {{ item[rel_type_inv[it]]["name"] }}</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3 col">
        <div class="list-group">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Descendants</h5>
            </div>
            <div class="overflow-auto fullheight">
              <ul
                v-for="   itm2 in _.filter((store.getEntityInfo).entity.levels, (o) => { return o['l2'] > 0 && o['l3'] == 0 && o['l4'] == 0 && o['code'] != null; })    ">
                <li class=" nav-item"> <a class="link-primary pnter" @click="store.selectEntity(itm2['code'])">{{
                  itm2['code'] + " " + itm2['name'] }}</a>
                  <ul v-for="   itm3 in
                    _.filter((store.getEntityInfo).entity.levels, (o) => {
                      return o['l2'] == itm2['l2']
                        && o['l3'] > 0 && o['l4'] == 0 && o['code'] != null;
                    })
        ">
                    <li class="nav-item"> <a class="link-primary pnter" @click="store.selectEntity(itm3['code'])">{{
                      itm3['code'] + " " + itm3['name'] }}</a>
                      <ul v-for="   itm4 in


                        _.filter((store.getEntityInfo).entity.levels, (o) => {
                          return o['l2'] == itm2['l2']
                            && o['l3'] == itm3['l3'] && o['l4'] > 0 && o['code'] != null;
                        })
        
        
        ">
                        <li class="nav-item"> <a class="link-primary pnter" @click="store.selectEntity(itm4['code'])">{{
                          itm4['code'] + " " + itm4['name'] }}</a>
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
      <!-- <div class="col-sm-1 col text-end">
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.thick {
  font-weight: bold;
  min-width: 150px;
}

.topmargin {
  padding-top: 1rem;
}

.thickcode {
  font-weight: bold;
  min-width: 100px;
}

.minwidth {
  font-weight: bold;
  min-width: 180px;
}

.pnter {
  cursor: pointer;
}

.maxheight {
  height: 500px;
}

.fullheight {
  height: 100%;
}
</style>
