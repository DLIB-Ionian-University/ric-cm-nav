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
    <!-- <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"></li>
        <li class="breadcrumb-item" v-for="i in (store.getEntityInfo).entity.ancestors">
          <a href="#" @click="store.selectEntity(i.code)">{{ i.code }} {{ i.name }}</a>
        </li>
        <li class="breadcrumb-item">{{ (store.getEntityInfo).entity.code }} {{ (store.getEntityInfo).entity.name }}</li>
      </ol>
    </nav> -->
    <div class="row">
      <div class="col-sm-10 col">
        <h1>{{ (store.getRelationInfo).relation.ID }} {{ (store.getRelationInfo).relation.Name }} </h1>
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
                  <h5 class="mb-1">Cardinality</h5>
                </div>
                <p class="mb-1">{{ (store.getRelationInfo).relation["Cardinality"] }}</p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Definition</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation.Definition.split('||')">
                  {{ i }}</p>
              </div>
              <div class=" list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Scope Notes</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation['Scope Notes'].split('||') ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Examples</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation['Examples'].split('||')  ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start"
                v-if="(store.getRelationInfo).relation['BroadRels'].length == 0">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Broader relations</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation['Broader relations'].split('||')   ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start"
                v-if="(store.getRelationInfo).relation['BroadRels'].length > 0">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Broader relations</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation['BroadRels']">
                  <a class="link-primary pnter" @click="store.selectRelation(i['code'])">
                    {{ i["code"] }} {{ i["name"] }}
                  </a>
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start"
                v-if="(store.getRelationInfo).relation['NarrowRels'].length == 0">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Narrower relations</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation['Narrower relations'].split('||')    ">
                  {{ i }}
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start"
                v-if="(store.getRelationInfo).relation['NarrowRels'].length > 0">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Narrower relations</h5>
                </div>
                <p class="mb-1" v-for="i in (store.getRelationInfo).relation['NarrowRels']    ">
                  <a class="link-primary pnter" @click="store.selectRelation(i['code'])">
                    {{ i["code"] }} {{ i["name"] }}
                  </a>
                </p>
              </div>
              <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Inverse</h5>
                </div>
                <p class="mb-1">
                  <a class="link-primary pnter"
                    @click="store.selectRelation((store.getRelationInfo).relation['Inverse']['ID'])">
                    {{ (store.getRelationInfo).relation["Inverse"]["ID"] }} {{
          (store.getRelationInfo).relation["Inverse"]["Name"] }}
                  </a>

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
              <h5 class="mb-1">Domain</h5>
            </div>
            <div class="overflow-auto fullheight">
              <ul>
                <li class="nav-item" v-for="i in (store.getRelationInfo).relation['DomainEntities']">
                  <a class="link-primary pnter" @click="store.selectEntity(i['code'])">
                    {{ i['code'] + " " + i['name'] }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Range</h5>
            </div>
            <div class="overflow-auto fullheight">
              <ul>
                <li class="nav-item" v-for="i in (store.getRelationInfo).relation['RangeEntities']">
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
