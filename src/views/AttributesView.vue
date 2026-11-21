<script setup>
import { computed, reactive } from 'vue';
import { Braces, Database, Search, Shapes, X } from 'lucide-vue-next';
import { useMainStore } from '@/stores/store';
import { useLabels } from '@/composables/useLabels';
import '@/assets/catalog-pages.css';

const store = useMainStore();
const { t } = useLabels();
const filters = reactive({ code: '', name: '', description: '', entities: '' });
const entityNames = computed(() => Object.fromEntries((store.data.entities || []).map((entity) => [entity.ID, entity.Name || ''])));
const hierarchyText = (code) => [code, entityNames.value[code], ...(store.data.descendants?.[code] || []).flatMap((id) => [id, entityNames.value[id]])].join(' ').toLowerCase();
const includes = (value, query) => !query.trim() || (value || '').toLowerCase().includes(query.trim().toLowerCase());
const filteredAttributes = computed(() => store.getAttributes.filter((item) => includes(item.ID, filters.code) && includes(item.Name, filters.name) && includes(item.Definition, filters.description) && includes((item.entities || []).map((entity) => hierarchyText(entity.code)).join(' '), filters.entities)));
const coveredEntities = computed(() => new Set(store.getAttributes.flatMap((item) => (item.entities || []).map((entity) => entity.code))).size);
const valueSchemas = computed(() => new Set(store.getAttributes.flatMap((item) => Array.isArray(item['Value schema']) ? item['Value schema'] : [item['Value schema']]).filter(Boolean)).size);
</script>

<template>
  <section class="catalog-page">
    <header class="catalog-hero"><div class="catalog-hero-icon"><Braces :size="27" /></div><div><span class="catalog-eyebrow">{{ t('attributesView.eyebrow') }}</span><h1>{{ t('attributesView.title') }}</h1><p>{{ t('attributesView.intro') }}</p></div></header>
    <div class="attribute-layout">
      <div class="catalog-shell">
        <div class="catalog-toolbar"><div class="catalog-toolbar-copy"><strong>{{ t('attributesView.results', { count: filteredAttributes.length }) }}</strong><span>{{ t('attributesView.browseHint') }}</span></div><Search :size="20" class="toolbar-icon" /></div>
        <div class="catalog-table-wrap"><table class="table table-sm catalog-table">
          <thead><tr><th class="catalog-code-column">{{ t('common.code') }}</th><th class="catalog-text-column">{{ t('common.name') }}</th><th class="catalog-text-column">{{ t('common.description') }}</th><th class="catalog-text-column">{{ t('nav.entities') }}</th></tr><tr>
            <th><div class="input-group input-group-sm"><input v-model="filters.code" class="form-control" :placeholder="t('common.searchCode')"><button class="catalog-clear" @click="filters.code=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
            <th><div class="input-group input-group-sm"><input v-model="filters.name" class="form-control" :placeholder="t('common.searchName')"><button class="catalog-clear" @click="filters.name=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
            <th><div class="input-group input-group-sm"><input v-model="filters.description" class="form-control" :placeholder="t('common.searchDescription')"><button class="catalog-clear" @click="filters.description=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
            <th><div class="input-group input-group-sm"><input v-model="filters.entities" class="form-control" :placeholder="t('attributesView.searchEntities')"><button class="catalog-clear" @click="filters.entities=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
          </tr></thead>
          <tbody><tr v-for="item in filteredAttributes" :key="item.ID"><th><button class="catalog-code" @click="store.selectAttribute(item.ID)">{{ item.ID }}</button></th><td>{{ item.Name }}</td><td>{{ item.Definition }}</td><td><ul class="catalog-chips"><li v-for="entity in item.entities" :key="entity.code"><button class="catalog-chip" @click="store.selectEntity(entity.code)">{{ entity.code }} {{ entity.name }}</button></li></ul></td></tr></tbody>
        </table><p v-if="!filteredAttributes.length" class="catalog-empty">{{ t('common.noResults') }}</p></div>
      </div>
      <aside class="overview-card"><span class="overview-kicker">{{ t('attributesView.overview') }}</span><div class="overview-stat"><span class="stat-icon"><Braces :size="19" /></span><div><strong>{{ store.getAttributes.length }}</strong><small>{{ t('nav.attributes') }}</small></div></div><div class="overview-stat"><span class="stat-icon"><Shapes :size="19" /></span><div><strong>{{ coveredEntities }}</strong><small>{{ t('attributesView.entitiesCovered') }}</small></div></div><div class="overview-stat"><span class="stat-icon"><Database :size="19" /></span><div><strong>{{ valueSchemas }}</strong><small>{{ t('attributesView.valueSchemas') }}</small></div></div></aside>
    </div>
  </section>
</template>

<style scoped>
.attribute-layout{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:1.2rem;align-items:start}.toolbar-icon{color:var(--catalog-blue)}.overview-card{position:sticky;top:1rem;overflow:hidden;border:1px solid var(--catalog-line);border-radius:18px;background:linear-gradient(160deg,#0b57d0,#073b91);color:#fff;box-shadow:0 14px 40px rgba(22,65,120,.14)}.overview-kicker{display:block;padding:1rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.17);font-size:.76rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.overview-stat{display:flex;align-items:center;gap:.75rem;padding:1rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.12)}.overview-stat:last-child{border-bottom:0}.stat-icon{display:grid;place-items:center;width:2.25rem;height:2.25rem;border-radius:10px;background:rgba(255,255,255,.13)}.overview-stat strong,.overview-stat small{display:block}.overview-stat strong{font:700 1.35rem/1 Georgia,serif}.overview-stat small{margin-top:.25rem;opacity:.76}@media(max-width:900px){.attribute-layout{grid-template-columns:1fr}.overview-card{position:static;display:grid;grid-template-columns:repeat(3,1fr)}.overview-kicker{grid-column:1/-1}}@media(max-width:560px){.overview-card{grid-template-columns:1fr}.overview-kicker{grid-column:auto}}
</style>
