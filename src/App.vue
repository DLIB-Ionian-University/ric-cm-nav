<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Network } from 'lucide-vue-next'
// import HelloWorld from './components/HelloWorld.vue'

const route = useRoute()

function isSectionActive(section) {
  const path = route.path
  if (section === 'entities') return path === '/entities' || path === '/entitycard'
  if (section === 'attributes') return path === '/attributes' || path === '/attributecard'
  if (section === 'relations') return path === '/relations' || path === '/relationcard'
  if (section === 'relation-attributes') {
    return path === '/relation-attributes' || path === '/relationattributecard'
  }
  return false
}
</script>

<template>
  <main role="main" class="container">
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center gap-2">
          <span class="app-icon-wrap">
            <Network class="app-icon" :size="18" :stroke-width="2.1" />
          </span>
          <span>RiC-CM NavTool</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('entities') }" to="/entities">
                Entities
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('attributes') }"
                to="/attributes">
                Attributes
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('relations') }"
                to="/relations">
                Relations
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('relation-attributes') }"
                to="/relation-attributes">
                Relation Attributes
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="jumbotron">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.app-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.app-icon-wrap {
  width: 1.4rem;
  height: 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  background: #eef3ff;
  color: #3457d5;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
}

.nav-link-active {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}
</style>
