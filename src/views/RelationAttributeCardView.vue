<script setup>
import { useMainStore } from '@/stores/store'

const store = useMainStore()

function splitParts(value) {
  return (value || "")
    .split("||")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function schemaParts(value) {
  return (value || "")
    .split(/;|\|\|/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-sm-10 col">
        <h1>{{ (store.getRelattributeInfo).relattribute.ID }} {{ (store.getRelattributeInfo).relattribute.Name }}</h1>
      </div>
      <div class="col-sm-2 col text-end"></div>
    </div>

    <div class="row">
      <div class="col-sm-12 col">
        <div class="list-group">
          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Definition</h5>
            </div>
            <p class="mb-1" v-for="i in splitParts((store.getRelattributeInfo).relattribute.Definition)">
              {{ i }}
            </p>
          </div>

          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Scope Notes</h5>
            </div>
            <p class="mb-1" v-for="i in splitParts((store.getRelattributeInfo).relattribute['Scope Notes'])">
              {{ i }}
            </p>
          </div>

          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Specifications</h5>
            </div>
            <p class="mb-1" v-for="i in splitParts((store.getRelattributeInfo).relattribute.Specifications)">
              {{ i }}
            </p>
          </div>

          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Repeatability</h5>
            </div>
            <p class="mb-1">{{ (store.getRelattributeInfo).relattribute.Repeatability }}</p>
          </div>

          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Extensibility</h5>
            </div>
            <p class="mb-1" v-for="i in splitParts((store.getRelattributeInfo).relattribute.Extensibility)">
              {{ i }}
            </p>
          </div>

          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Value Schema</h5>
            </div>
            <ul class="schema-chip-list">
              <li class="schema-chip-item" v-for="schemaPart in schemaParts((store.getRelattributeInfo).relattribute['Value schema'])">
                <span class="schema-chip">{{ schemaPart }}</span>
              </li>
            </ul>
          </div>

          <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Examples</h5>
            </div>
            <p class="mb-1" v-for="i in splitParts((store.getRelattributeInfo).relattribute.Examples)">
              {{ i }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schema-chip-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.schema-chip-item {
  margin: 0;
}

.schema-chip {
  display: inline-block;
  padding: 0.18rem 0.48rem;
  border: 1px solid #dbe4ff;
  border-radius: 999px;
  background: #f6f8ff;
  font-size: 0.88rem;
  line-height: 1.2;
}
</style>
