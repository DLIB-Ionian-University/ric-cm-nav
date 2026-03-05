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
    <div class="row">
      <div class="col-sm-10 col">
        <h1>{{ (store.getAttributeInfo).attribute.ID }} {{ (store.getAttributeInfo).attribute.Name }} </h1>
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
                <p class="mb-1" v-for="i in (store.getAttributeInfo).attribute.Definition.split('||') ">
                  {{ i }}</p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Scope</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getAttributeInfo).attribute.Scope.split('||')  ">
                  {{ i }}</p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Specifications</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getAttributeInfo).attribute.Specifications.split('||')    ">
                  {{ i }}</p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Repeatability</h5>
                </div>
                <p class="mb-1">
                  {{ (store.getAttributeInfo).attribute.Repeatability }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Extensibility</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getAttributeInfo).attribute.Extensibility.split('||') ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Value schema</h5>
                </div>
                <ul>
                  <li class="nav-item" v-for="i in (store.getAttributeInfo).attribute['Value schema']">
                    {{ i }}
                  </li>
                </ul>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Examples</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getAttributeInfo).attribute['Example'].split('||')    ">
                  {{ i }}
                </p>
                <p class="mb-1" v-for="i in (store.getAttributeInfo).attribute['Examples'].split('||')  ">
                  {{ i }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3 col">
        <div class="list-group">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Domain/Entities</h5>
            </div>
            <div class="overflow-auto fullheight">
              <ul>
                <li class="nav-item" v-for="i in (store.getAttributeInfo).attribute['entities']">
                  <a class="link-primary pnter" @click="store.selectEntity(i['code'])">
                    {{ i['code'] + " " + i['name'] }}
                  </a>
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
