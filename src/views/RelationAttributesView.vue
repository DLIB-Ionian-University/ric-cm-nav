<script setup>
import { computed, ref } from 'vue';
import { ArrowUpRight, Link2, Search, SlidersHorizontal } from 'lucide-vue-next';
import { useMainStore } from '@/stores/store';
import { useLabels } from '@/composables/useLabels';
import '@/assets/catalog-pages.css';

const store = useMainStore();
const { t } = useLabels();
const query = ref('');
const schema = ref('');
const schemaParts = (value) => (Array.isArray(value) ? value : String(value || '').split(/;|\|\|/)).map((part) => String(part).trim()).filter(Boolean);
const allSchemas = computed(() => [...new Set((store.getRelattributes || []).flatMap((item) => schemaParts(item['Value schema'])))].sort());
const attributes = computed(() => (store.getRelattributes || []).filter((item) => {
  const text = [item.ID, item.Name, item.Definition, ...schemaParts(item['Value schema'])].join(' ').toLowerCase();
  return text.includes(query.value.trim().toLowerCase()) && (!schema.value || schemaParts(item['Value schema']).includes(schema.value));
}));
</script>

<template>
  <section class="catalog-page">
    <header class="catalog-hero"><div class="catalog-hero-icon"><Link2 :size="27" /></div><div><span class="catalog-eyebrow">{{ t('relationAttributesView.eyebrow') }}</span><h1>{{ t('relationAttributesView.title') }}</h1><p>{{ t('relationAttributesView.intro') }}</p></div></header>
    <div class="card-toolbar"><div class="catalog-toolbar-copy"><strong>{{ t('relationAttributesView.results', { count: attributes.length }) }}</strong><span>{{ t('relationAttributesView.browseHint') }}</span></div><div class="card-filters"><label class="search-field"><Search :size="17" /><input v-model="query" type="search" :placeholder="t('common.searchCatalog')"></label><label class="schema-field"><SlidersHorizontal :size="16" /><select v-model="schema" :aria-label="t('common.valueSchema')"><option value="">{{ t('common.allSchemas') }}</option><option v-for="item in allSchemas" :key="item">{{ item }}</option></select></label></div></div>
    <div class="attribute-cards"><article v-for="item in attributes" :key="item.ID" class="attribute-card" tabindex="0" @click="store.selectRelattribute(item.ID)" @keyup.enter="store.selectRelattribute(item.ID)"><div class="card-top"><span class="card-code">{{ item.ID }}</span><ArrowUpRight :size="19" /></div><h2>{{ item.Name }}</h2><p>{{ item.Definition }}</p><div class="card-meta"><span class="meta-label">{{ t('common.valueSchema') }}</span><div class="catalog-chips"><span v-for="part in schemaParts(item['Value schema'])" :key="part" class="catalog-chip static-chip">{{ part }}</span><span v-if="!schemaParts(item['Value schema']).length" class="catalog-chip static-chip">{{ t('relationAttributesView.noSchema') }}</span></div></div><div class="card-footer"><span>{{ t('relationAttributesView.openAttribute') }}</span><ArrowUpRight :size="16" /></div></article></div>
    <p v-if="!attributes.length" class="catalog-empty">{{ t('common.noResults') }}</p>
  </section>
</template>

<style scoped>
.card-toolbar{display:flex;align-items:center;justify-content:space-between;gap:1.25rem;margin-bottom:1.15rem;padding:1rem 1.15rem;border:1px solid var(--catalog-line);border-radius:16px;background:linear-gradient(100deg,#f5faff,#fff)}.card-filters{display:flex;gap:.65rem}.search-field,.schema-field{display:flex;align-items:center;gap:.5rem;min-width:220px;padding:.58rem .72rem;border:1px solid #cbdcf0;border-radius:10px;color:#6380a3;background:#fff}.search-field input,.schema-field select{width:100%;border:0;outline:0;color:#244466;background:transparent;font-size:.9rem}.attribute-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.attribute-card{display:flex;min-height:280px;flex-direction:column;padding:1.25rem;border:1px solid var(--catalog-line);border-radius:18px;background:#fff;box-shadow:0 10px 28px rgba(22,65,120,.07);cursor:pointer;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}.attribute-card:hover,.attribute-card:focus-visible{transform:translateY(-3px);border-color:#9fc5f1;box-shadow:0 16px 36px rgba(22,65,120,.12);outline:0}.card-top{display:flex;align-items:center;justify-content:space-between;color:var(--catalog-blue)}.card-code{padding:.3rem .55rem;border-radius:7px;background:#eaf3ff;font-weight:800}.attribute-card h2{margin:1rem 0 .55rem;color:#123a70;font:700 1.35rem/1.2 Georgia,serif}.attribute-card>p{flex:1;margin:0 0 1rem;color:#5c6c84;line-height:1.55}.card-meta{padding-top:.9rem;border-top:1px solid #e5eef9}.meta-label{display:block;margin-bottom:.5rem;color:#718096;font-size:.7rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.static-chip{cursor:default}.card-footer{display:flex;align-items:center;justify-content:space-between;margin:1rem -1.25rem -1.25rem;padding:.8rem 1.25rem;border-radius:0 0 17px 17px;color:var(--catalog-blue);background:#f7fbff;font-size:.86rem;font-weight:750}@media(max-width:820px){.card-toolbar{align-items:stretch;flex-direction:column}.card-filters{flex-wrap:wrap}.search-field,.schema-field{flex:1 1 220px}}@media(max-width:650px){.attribute-cards{grid-template-columns:1fr}}
</style>
