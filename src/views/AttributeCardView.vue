<script setup>
import { computed } from 'vue';
import { BookOpen, Boxes, CircleDot, FileText, Layers3, RefreshCw, Settings, Tag } from 'lucide-vue-next';
import { useMainStore } from '@/stores/store';
import { useLabels } from '@/composables/useLabels';
import '@/assets/detail-pages.css';
const store=useMainStore(); const {t}=useLabels();
const item=computed(()=>store.getAttributeInfo.attribute);
const parts=(v)=>String(v||'').split(/\|\||\r?\n/).map(x=>x.trim()).filter(Boolean);
const schemas=computed(()=>Array.isArray(item.value['Value schema'])?item.value['Value schema']:parts(item.value['Value schema']));
</script>
<template><article class="detail-page">
  <nav class="detail-breadcrumb"><button @click="$router.push('/attributes')">{{ t('nav.attributes') }}</button><span>/</span><span>{{ item.ID }}</span></nav>
  <header class="detail-hero"><div class="detail-title-row"><span class="detail-code">{{ item.ID }}</span><h1>{{ item.Name }}</h1></div><p v-if="parts(item.Definition)[0]" class="detail-summary">{{ parts(item.Definition)[0] }}</p></header>
  <div class="detail-grid"><div class="detail-stack">
    <section class="detail-panel"><div class="detail-section"><h2 class="detail-heading"><BookOpen :size="21"/>{{ t('common.definition') }}</h2><p v-for="x in parts(item.Definition)" :key="x">{{ x }}</p></div></section>
    <section class="detail-panel"><div class="detail-section"><h2 class="detail-heading"><CircleDot :size="21"/>{{ t('common.scope') }}</h2><p v-for="x in parts(item.Scope)" :key="x">{{ x }}</p></div></section>
    <section class="detail-panel"><div class="detail-section"><h2 class="detail-heading"><Settings :size="21"/>{{ t('common.specifications') }}</h2><p v-for="x in parts(item.Specifications)" :key="x">{{ x }}</p></div></section>
    <section class="detail-panel example-box"><div class="detail-section"><h2 class="detail-heading"><FileText :size="21"/>{{ t('common.examples') }}</h2><p v-for="x in [...parts(item.Example),...parts(item.Examples)]" :key="x">{{ x }}</p></div></section>
  </div><aside class="detail-stack detail-side">
    <div class="meta-card"><div class="meta-row"><RefreshCw :size="20"/><span><small>{{ t('common.repeatability') }}</small><strong>{{ item.Repeatability }}</strong></span></div><div class="meta-row"><Layers3 :size="20"/><span><small>{{ t('common.extensibility') }}</small><strong>{{ item.Extensibility }}</strong></span></div><div class="meta-row"><Tag :size="20"/><span><small>{{ t('common.valueSchema') }}</small><span class="detail-chips"><span v-for="x in schemas" :key="x" class="detail-chip">{{ x }}</span></span></span></div></div>
    <section class="detail-panel"><h2 class="side-title"><Boxes :size="20"/>{{ t('attributeCard.appliesTo') }}</h2><div class="side-body"><ul class="detail-chips"><li v-for="x in item.entities" :key="x.code"><button class="detail-chip" @click="store.selectEntity(x.code)">{{ x.code }} {{ x.name }}</button></li></ul></div></section>
  </aside></div>
</article></template>
<style scoped>.meta-card{overflow:hidden;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 8px 24px rgba(22,65,120,.055)}.meta-row{display:flex;gap:.7rem;padding:1rem;border-bottom:1px solid var(--line);color:var(--blue)}.meta-row:last-child{border:0}.meta-row>span{min-width:0;flex:1}.meta-row small,.meta-row strong{display:block}.meta-row small{margin-bottom:.35rem;color:#6b7d93;font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.meta-row strong{color:#163d6c}.meta-row .detail-chips{margin-top:.25rem}</style>
