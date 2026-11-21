<script setup>
import { useMainStore } from '@/stores/store'
import { computed, reactive } from "vue";
import * as _ from "lodash";
import { useLabels } from '@/composables/useLabels';
import { Boxes, Search, X, GitBranch } from 'lucide-vue-next';

const store = useMainStore()
const { t } = useLabels()

const entityColumnFilters = reactive({
  code: "",
  name: "",
  description: "",
});

function clearEntityFilter(key) {
  entityColumnFilters[key] = "";
}

const filteredEntities = computed(() => {
  const codeKeyword = entityColumnFilters.code.trim().toLowerCase();
  const nameKeyword = entityColumnFilters.name.trim().toLowerCase();
  const descriptionKeyword = entityColumnFilters.description.trim().toLowerCase();

  return _.filter(_.orderBy(store.data.entities, ["ID"], ["asc"]), (item) => {
    return (
      (codeKeyword === "" || item["ID"].toLowerCase().indexOf(codeKeyword) > -1) &&
      (nameKeyword === "" || item["Name"].toLowerCase().indexOf(nameKeyword) > -1) &&
      (descriptionKeyword === "" || item["Definition"].toLowerCase().indexOf(descriptionKeyword) > -1)
    );
  });
});
</script>

<template>
  <section class="explorer-page">
    <header class="page-hero">
      <div class="hero-icon"><Boxes :size="27" /></div>
      <div><span class="eyebrow">{{ t('entitiesView.eyebrow') }}</span><h1>{{ t('entitiesView.title') }}</h1><p>{{ t('entitiesView.intro') }}</p></div>
    </header>
    <div class="explorer-grid">
      <div class="catalog-panel">
        <div class="panel-toolbar"><div><strong>{{ t('entitiesView.results', { count: filteredEntities.length }) }}</strong><span>{{ t('entitiesView.browseHint') }}</span></div><Search :size="20" /></div>
          <div class="entities-table-wrap">
            <table class="table table-sm entities-table">
              <thead>
                <tr>
                  <th scope="col" class="thickcode">{{ t('common.code') }}</th>
                  <th scope="col" class="thick minwidth">{{ t('common.name') }}</th>
                  <th scope="col" class="thick minwidth">{{ t('common.description') }}</th>
                </tr>
                <tr>
                  <th scope="col">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control form-control-sm" :placeholder="t('common.searchCode')"
                        v-model="entityColumnFilters.code">
                      <button class="filter-clear-btn" type="button" :aria-label="t('common.close')"
                        @click="clearEntityFilter('code')">
                        <X :size="15" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control form-control-sm" :placeholder="t('common.searchName')"
                        v-model="entityColumnFilters.name">
                      <button class="filter-clear-btn" type="button" :aria-label="t('common.close')"
                        @click="clearEntityFilter('name')">
                        <X :size="15" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control form-control-sm" :placeholder="t('common.searchDescription')"
                        v-model="entityColumnFilters.description">
                      <button class="filter-clear-btn" type="button" :aria-label="t('common.close')"
                        @click="clearEntityFilter('description')">
                        <X :size="15" />
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredEntities" :key="item.ID">
                  <th scope="row">
                    <button class="code-link" @click="store.selectEntity(item['ID'])">{{ item["ID"] }}</button>
                  </th>
                  <td class="minwidth">{{ item["Name"] }}</td>
                  <td class="minwidth">{{ item["Definition"] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <aside class="hierarchy-panel">
            <div class="hierarchy-heading"><span><GitBranch :size="19" /></span><div><h2>{{ t('entitiesView.hierarchy') }}</h2><small>{{ t('entitiesView.results', { count: store.data.entities.length }) }}</small></div></div>
            <div class="overflow-auto panel-scroll-height">
              <div class="entity-tree">
                <ul class="entity-root">
                  <li v-for="itm1 in store.data.ent_hierarchy" :key="itm1.code" class="entity-l1">
                    <a class="link-primary pnter entity-link entity-link-l1" @click="store.selectEntity(itm1['code'])">
                      {{ itm1['code'] + " " + itm1['name'] }}
                    </a>
                    <ul class="entity-level">
                      <li v-for="itm2 in itm1.children" :key="itm2.code" class="entity-l2">
                        <a class="link-primary pnter entity-link entity-link-l2" @click="store.selectEntity(itm2['code'])">
                          {{ itm2['code'] + " " + itm2['name'] }}
                        </a>
                        <ul class="entity-level">
                          <li v-for="itm3 in itm2.children" :key="itm3.code" class="entity-l3">
                            <a class="link-primary pnter entity-link entity-link-l3" @click="store.selectEntity(itm3['code'])">
                              {{ itm3['code'] + " " + itm3['name'] }}
                            </a>
                            <ul class="entity-level">
                              <li v-for="itm4 in itm3.children" :key="itm4.code" class="entity-l4">
                                <a class="link-primary pnter entity-link entity-link-l4"
                                  @click="store.selectEntity(itm4['code'])">
                                  {{ itm4['code'] + " " + itm4['name'] }}
                                </a>
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
      </aside>
    </div>
  </section>
</template>

<style scoped>
.explorer-page { --ink: #0b1f49; --blue: #0b57d0; --line: #d9e7f8; color: var(--ink); padding: 1.25rem 0 3rem; }
.page-hero { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.35rem; }
.hero-icon { display: grid; place-items: center; width: 3.25rem; height: 3.25rem; border-radius: 14px; color: var(--blue); background: linear-gradient(145deg,#e8f3ff,#f8fbff); border: 1px solid #cfe3fb; box-shadow: 0 8px 22px rgba(11,87,208,.1); }
.eyebrow { color: var(--blue); font-size: .72rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
.page-hero h1 { margin: .08rem 0 .15rem; font: 700 clamp(2rem,4vw,2.8rem)/1 Georgia,serif; }
.page-hero p { margin: 0; color: #5c6c84; }
.explorer-grid { display: grid; grid-template-columns: minmax(0,2.15fr) minmax(260px,.85fr); gap: 1.2rem; align-items: start; }
.catalog-panel,.hierarchy-panel { overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: rgba(255,255,255,.96); box-shadow: 0 14px 40px rgba(22,65,120,.08); }
.panel-toolbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.15rem; color: var(--blue); border-bottom: 1px solid var(--line); background: linear-gradient(100deg,#f5faff,#fff); }
.panel-toolbar div { display:flex; flex-direction:column; } .panel-toolbar span { color:#718096; font-size:.78rem; font-weight:400; }
.thickcode { font-weight: bold; min-width: 105px; }.thick { font-weight: bold; }.minwidth { min-width: 180px; }.pnter { cursor: pointer; }
.entities-table-wrap { height: 62vh; overflow: auto; }
.panel-scroll-height { height: 62vh; }
.entities-table { margin:0; }.entities-table thead th { background: #f8fbff; color:#45607f; font-size:.76rem; text-transform:uppercase; letter-spacing:.05em; border-color:var(--line); padding:.7rem .8rem; }
.entities-table thead tr:first-child th { position: sticky; top: 0; z-index: 3; }
.entities-table thead tr:nth-child(2) th { position: sticky; top: 2.75rem; z-index: 2; padding-top:0; }
.entities-table tbody td,.entities-table tbody th { padding:.85rem .8rem; border-color:#e8f0fa; vertical-align:top; color:#42546b; }.entities-table tbody tr:hover { background:#f6faff; }
.filter-clear-btn { display:grid; place-items:center; border:1px solid #cedced; border-left:0; background:#fff; color:#68809d; border-radius:0 .375rem .375rem 0; }.code-link { border:0; border-radius:7px; padding:.25rem .45rem; color:var(--blue); background:#eaf3ff; font-weight:800; cursor:pointer; }
.hierarchy-heading { display:flex; gap:.75rem; align-items:center; padding:1rem 1.1rem; border-bottom:1px solid var(--line); background:#0b57d0; color:white; }.hierarchy-heading>span { display:grid;place-items:center;width:2.15rem;height:2.15rem;border-radius:9px;background:rgba(255,255,255,.14); }.hierarchy-heading h2 { margin:0;font-size:1rem; }.hierarchy-heading small { opacity:.75; }
.entity-tree { padding: 1rem; }
.entity-root, .entity-level { list-style: none; margin: 0; padding-left: 0; }
.entity-l1 { background: #f8fbff; border: 1px solid #deebfa; border-radius: 10px; padding: 0.6rem 0.7rem; margin-bottom: 0.75rem; }
.entity-level { margin-top: 0.45rem; margin-left: 0.35rem; padding-left: 0.8rem; border-left: 2px solid #cbdff5; }
.entity-l2, .entity-l3, .entity-l4 { position: relative; margin: 0.35rem 0; padding-left: 0.75rem; }
.entity-l2::before, .entity-l3::before, .entity-l4::before { content: ""; position: absolute; left: -0.75rem; top: 0.62rem; width: 0.65rem; border-top: 2px solid #cbdff5; }
.entity-link { display: block; color:#274d7e; text-decoration: none; padding:.15rem; }
.entity-link-l1 { font-weight: 600; }
.entity-link-l2 { font-weight: 500; }
.entity-link-l3, .entity-link-l4 { font-size: 0.94rem; }
@media(max-width:900px){.explorer-grid{grid-template-columns:1fr}.panel-scroll-height{height:auto;max-height:55vh}.entities-table-wrap{height:58vh}}@media(max-width:576px){.page-hero{align-items:flex-start}.hero-icon{display:none}.explorer-page{padding-top:.5rem}.page-hero p{font-size:.9rem}}
</style>
