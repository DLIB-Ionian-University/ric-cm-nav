<script setup>
import { computed, reactive } from 'vue';
import { ArrowRight, GitMerge, X } from 'lucide-vue-next';
import { useMainStore } from '@/stores/store';
import { useLabels } from '@/composables/useLabels';
import '@/assets/catalog-pages.css';

const store = useMainStore();
const { t } = useLabels();
const filters = reactive({ code: '', name: '', domain: '', range: '' });
const entityNames = computed(() => Object.fromEntries((store.data.entities || []).map((entity) => [entity.ID, entity.Name || ''])));
const hierarchyText = (code) => [code, entityNames.value[code], ...(store.data.descendants?.[code] || []).flatMap((id) => [id, entityNames.value[id]])].join(' ').toLowerCase();
const includes = (value, query) => !query.trim() || (value || '').toLowerCase().includes(query.trim().toLowerCase());
const rows = computed(() => store.getRelations.map((item) => {
  const unique = (key, nameKey) => [...new Map((item.v || []).map((relation) => [relation[key], { id: relation[key], name: relation[nameKey] }])).values()];
  return { code: item.code, name: item.name, domains: unique('DomainID', 'DomainName'), ranges: unique('RangeID', 'RangeName') };
}).filter((item) => includes(item.code, filters.code) && includes(item.name, filters.name) && includes(item.domains.map((entity) => hierarchyText(entity.id)).join(' '), filters.domain) && includes(item.ranges.map((entity) => hierarchyText(entity.id)).join(' '), filters.range)));
</script>

<template>
  <section class="catalog-page">
    <header class="catalog-hero"><div class="catalog-hero-icon"><GitMerge :size="27" /></div><div><span class="catalog-eyebrow">{{ t('relationsView.eyebrow') }}</span><h1>{{ t('relationsView.title') }}</h1><p>{{ t('relationsView.intro') }}</p></div></header>
    <div class="catalog-shell">
      <div class="catalog-toolbar"><div class="catalog-toolbar-copy"><strong>{{ t('relationsView.results', { count: rows.length }) }}</strong><span>{{ t('relationsView.browseHint') }}</span></div><div class="direction-key"><span>{{ t('common.domain') }}</span><ArrowRight :size="16" /><span>{{ t('common.range') }}</span></div></div>
      <div class="catalog-table-wrap"><table class="table table-sm catalog-table">
        <thead><tr><th class="catalog-code-column">{{ t('common.code') }}</th><th class="catalog-text-column">{{ t('common.name') }}</th><th class="catalog-text-column">{{ t('common.domain') }}</th><th class="direction-column"><span class="visually-hidden">{{ t('relationsView.direction') }}</span></th><th class="catalog-text-column">{{ t('common.range') }}</th></tr><tr>
          <th><div class="input-group input-group-sm"><input v-model="filters.code" class="form-control" :placeholder="t('common.searchCode')"><button class="catalog-clear" @click="filters.code=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
          <th><div class="input-group input-group-sm"><input v-model="filters.name" class="form-control" :placeholder="t('common.searchName')"><button class="catalog-clear" @click="filters.name=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
          <th><div class="input-group input-group-sm"><input v-model="filters.domain" class="form-control" :placeholder="t('relationsView.searchDomain')"><button class="catalog-clear" @click="filters.domain=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th><th></th>
          <th><div class="input-group input-group-sm"><input v-model="filters.range" class="form-control" :placeholder="t('relationsView.searchRange')"><button class="catalog-clear" @click="filters.range=''" :aria-label="t('common.close')"><X :size="15" /></button></div></th>
        </tr></thead>
        <tbody><tr v-for="item in rows" :key="item.code"><th><button class="catalog-code" @click="store.selectRelation(item.code)">{{ item.code }}</button></th><td class="relation-name">{{ item.name }}</td><td><ul class="catalog-chips"><li v-for="entity in item.domains" :key="entity.id"><button class="catalog-chip" @click="store.selectEntity(entity.id)">{{ entity.id }} {{ entity.name }}</button></li></ul></td><td class="row-arrow"><ArrowRight :size="18" /></td><td><ul class="catalog-chips"><li v-for="entity in item.ranges" :key="entity.id"><button class="catalog-chip range-chip" @click="store.selectEntity(entity.id)">{{ entity.id }} {{ entity.name }}</button></li></ul></td></tr></tbody>
      </table><p v-if="!rows.length" class="catalog-empty">{{ t('common.noResults') }}</p></div>
    </div>
  </section>
</template>

<style scoped>
.direction-key{display:flex;align-items:center;gap:.5rem;padding:.4rem .65rem;border:1px solid #d1e3f7;border-radius:999px;color:#3e6087;background:#fff;font-size:.75rem;font-weight:700;text-transform:uppercase}.direction-column{width:42px;min-width:42px}.row-arrow{color:#75a7df!important;text-align:center;vertical-align:middle!important}.relation-name{color:#183b69!important;font-weight:650}.range-chip{border-color:#bfd8f4;background:#edf6ff}@media(max-width:760px){.direction-key,.direction-column,.row-arrow{display:none}}
</style>
