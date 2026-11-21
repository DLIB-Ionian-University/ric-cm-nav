<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ExternalLink, FileText, FlaskConical, Info, Landmark, Network, UserRound } from 'lucide-vue-next'
import { useMainStore } from '@/stores/store'
import { useLabels } from '@/composables/useLabels'

const route = useRoute()
const router = useRouter()
const store = useMainStore()
const { t, localeOptions } = useLabels()

const cardRouteToListRoute = {
  '/entitycard': '/entities',
  '/attributecard': '/attributes',
  '/relationcard': '/relations',
  '/relationattributecard': '/relation-attributes',
}

const isCardRoute = computed(() => Object.prototype.hasOwnProperty.call(cardRouteToListRoute, route.path))

const cardRouteTitle = computed(() => {
  if (route.path === '/entitycard') return t('cards.entity')
  if (route.path === '/attributecard') return t('cards.attribute')
  if (route.path === '/relationcard') return t('cards.relation')
  if (route.path === '/relationattributecard') return t('cards.relationAttribute')
  return 'Card'
})

function closeCardPopup() {
  const fallbackRoute = cardRouteToListRoute[route.path] || '/entities'
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push(fallbackRoute)
  }
}

function isSectionActive(section) {
  const path = route.path
  if (section === 'entities') return path === '/entities' || path === '/entitycard'
  if (section === 'attributes') return path === '/attributes' || path === '/attributecard'
  if (section === 'relations') return path === '/relations' || path === '/relationcard'
  if (section === 'relation-attributes') {
    return path === '/relation-attributes' || path === '/relationattributecard'
  }
  if (section === 'modeling-playground') return path === '/modeling-playground' || path === '/nav-playground'
  return false
}

function onLocaleChange(event) {
  store.setLocale(event.target.value)
}
</script>

<template>
  <main role="main" class="container">
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
          <span class="app-icon-wrap">
            <Network class="app-icon" :size="18" :stroke-width="2.1" />
          </span>
          <span>{{ t('appTitle') }}</span>
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" :aria-label="t('common.close')">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('entities') }" to="/entities">
                {{ t('nav.entities') }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('attributes') }"
                to="/attributes">
                {{ t('nav.attributes') }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('relations') }"
                to="/relations">
                {{ t('nav.relations') }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('relation-attributes') }"
                to="/relation-attributes">
                {{ t('nav.relationAttributes') }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ 'nav-link-active': isSectionActive('modeling-playground') }"
                to="/modeling-playground">
                {{ t('nav.modelingPlayground') }}
              </RouterLink>
            </li>
          </ul>
          <div class="ms-lg-auto mt-2 mt-lg-0 d-flex align-items-center gap-2">
            <label for="locale" class="small text-muted mb-0">{{ t('nav.language') }}</label>
            <select id="locale" class="form-select form-select-sm" :value="store.locale" @change="onLocaleChange">
              <option v-for="opt in localeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <button type="button" class="btn btn-outline-secondary btn-sm d-flex align-items-center"
              data-bs-toggle="modal" data-bs-target="#aboutAppModal" :aria-label="t('about.title')">
              <Info :size="17" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="modal fade" id="aboutAppModal" tabindex="-1" aria-labelledby="aboutAppModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered about-modal-dialog">
        <div class="modal-content about-modal-content">
          <div class="modal-header about-modal-header">
            <div class="about-heading-wrap">
              <span class="about-main-icon">
                <Network :size="34" :stroke-width="1.9" />
              </span>
              <span class="about-heading-divider" aria-hidden="true"></span>
              <span>
                <h1 class="modal-title" id="aboutAppModalLabel">{{ t('about.title') }}</h1>
                <span class="about-subtitle">{{ t('about.subtitle') }}</span>
              </span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="t('common.close')"></button>
          </div>
          <div class="modal-body about-modal-body">
            <a class="about-info-card"
              href="https://www.ica.org/ica-network/expert-groups/egad/records-in-contexts-conceptual-model/"
              target="_blank" rel="noopener noreferrer">
              <span class="about-card-icon"><FileText :size="24" /></span>
              <span class="about-card-copy">
                <strong>{{ t('about.basedOn') }}</strong>
                <span>RiC-CM 1.0 — Records in Contexts Conceptual Model</span>
              </span>
              <ExternalLink class="about-external-icon" :size="19" />
            </a>

            <a class="about-info-card" href="https://ilam.ionio.gr/en/" target="_blank" rel="noopener noreferrer">
              <span class="about-card-icon"><Landmark :size="24" /></span>
              <span class="about-card-copy">
                <strong>{{ t('about.department') }}</strong>
                <span>{{ t('about.departmentName') }}</span>
              </span>
              <ExternalLink class="about-external-icon" :size="19" />
            </a>

            <a class="about-info-card" href="https://ilam.ionio.gr/en/research/laboratories/dliblab/"
              target="_blank" rel="noopener noreferrer">
              <span class="about-card-icon"><FlaskConical :size="24" /></span>
              <span class="about-card-copy">
                <strong>{{ t('about.laboratory') }}</strong>
                <span>{{ t('about.laboratoryName') }}</span>
              </span>
              <ExternalLink class="about-external-icon" :size="19" />
            </a>

            <a class="about-info-card about-creator-card" href="https://ilam.ionio.gr/en/staff/764-damigos/"
              target="_blank" rel="noopener noreferrer">
              <span class="about-card-icon"><UserRound :size="23" /></span>
              <span class="about-card-copy about-creator-copy">
                <strong>{{ t('about.createdBy') }}</strong>
                <span>Dr. Matthew Damigos</span>
              </span>
              <ExternalLink class="about-external-icon" :size="18" />
            </a>
          </div>
          <div class="modal-footer about-modal-footer">
            <a class="license-badge" href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
              rel="noopener noreferrer">CC BY 4.0</a>
            <div class="about-footer-actions">
              <button type="button" class="btn about-close-btn" data-bs-dismiss="modal">{{ t('common.close') }}</button>
              <RouterLink class="btn about-primary-btn" to="/entities" data-bs-dismiss="modal">
                {{ t('about.startExploring') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="jumbotron">
      <RouterView v-slot="{ Component }">
        <div v-if="isCardRoute" class="card-popup-wrap" role="dialog" aria-modal="true">
          <div class="card-popup-header">
            <h5 class="mb-0">{{ cardRouteTitle }}</h5>
            <button type="button" class="btn-close" :aria-label="t('common.close')" @click="closeCardPopup"></button>
          </div>
          <div class="card-popup-body">
            <component :is="Component" />
          </div>
        </div>
        <component :is="Component" v-else />
      </RouterView>
    </div>
  </main>
</template>

<style scoped>
.app-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.navbar {
  background: rgba(255, 255, 255, 0.97) !important;
  border-bottom: 1px solid #dce9fb;
  box-shadow: 0 5px 22px rgba(21, 72, 145, 0.07);
}

.navbar-brand {
  color: #0b1f49;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  padding: 0.25rem 0;
}

.navbar-brand:hover {
  color: #0b57d0;
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

.about-modal-dialog {
  width: min(820px, calc(100vw - 2rem));
  max-width: 820px;
}

.about-modal-content {
  position: relative;
  overflow: hidden;
  border: 1px solid #c9ddf7;
  border-radius: 1.25rem;
  box-shadow: 0 28px 80px rgba(7, 35, 84, 0.24);
}

.about-modal-content::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  z-index: 2;
  height: 0.65rem;
  background: linear-gradient(90deg, #12339a, #0b57d0 60%, #1686ff);
}

.about-modal-header {
  align-items: flex-start;
  padding: 2.25rem 2.4rem 1.55rem;
  border-bottom: 0;
}

.about-heading-wrap {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.about-main-icon {
  width: 4.5rem;
  height: 4.5rem;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #0b57d0;
  background: #e7f3ff;
}

.about-heading-divider {
  width: 1px;
  height: 3.7rem;
  flex: 0 0 auto;
  background: #8eb6e9;
}

.about-modal-header .modal-title {
  margin: 0;
  color: #071a43;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.about-subtitle {
  display: block;
  margin-top: 0.35rem;
  color: #304a71;
  font-size: 0.98rem;
  line-height: 1.45;
}

.about-modal-header .btn-close {
  flex: 0 0 auto;
  margin: 0;
}

.about-modal-body {
  padding: 0 2.4rem 1.5rem;
  display: grid;
  gap: 0.85rem;
}

.about-info-card {
  min-height: 6rem;
  padding: 1rem 1.15rem;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  border: 1px solid #b9d6f7;
  border-radius: 0.8rem;
  color: #071a43;
  background: linear-gradient(100deg, #f9fcff, #eaf5ff);
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.about-info-card:hover {
  color: #071a43;
  border-color: #609ee9;
  box-shadow: 0 10px 25px rgba(11, 87, 208, 0.11);
  transform: translateY(-2px);
}

.about-card-icon {
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #0b57d0;
  background: #dceeff;
}

.about-card-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.about-card-copy strong {
  color: #071a43;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.2rem;
  font-weight: 700;
}

.about-card-copy span {
  color: #243f67;
  line-height: 1.35;
}

.about-external-icon {
  flex: 0 0 auto;
  color: #0b57d0;
}

.about-creator-card {
  min-height: 4.25rem;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding-block: 0.65rem;
}

.about-creator-card .about-card-icon {
  width: 2.55rem;
  height: 2.55rem;
}

.about-creator-copy {
  flex-direction: row;
  align-items: baseline;
  gap: 0.85rem;
}

.about-creator-copy strong {
  padding-right: 0.85rem;
  border-right: 1px solid #9dbde5;
}

.about-modal-footer {
  padding: 1.2rem 2.4rem 1.45rem;
  justify-content: space-between;
  border-top: 1px solid #c9ddf7;
}

.license-badge {
  padding: 0.45rem 0.75rem;
  border: 1.5px solid #1646b5;
  border-radius: 0.5rem;
  color: #12358b;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.license-badge:hover {
  color: #0b57d0;
  background: #eef6ff;
}

.about-footer-actions {
  display: flex;
  gap: 0.7rem;
}

.about-close-btn,
.about-primary-btn {
  min-width: 8rem;
  padding: 0.62rem 1rem;
  border-radius: 0.55rem;
  font-weight: 700;
}

.about-close-btn {
  border: 1px solid #7ba9df;
  color: #0b3d91;
  background: #fff;
}

.about-close-btn:hover {
  color: #072c6a;
  background: #eef6ff;
}

.about-primary-btn {
  border: 1px solid #0b57d0;
  color: #fff;
  background: #0b57d0;
}

.about-primary-btn:hover {
  color: #fff;
  background: #0847ad;
}

@media (max-width: 600px) {
  .about-modal-header {
    padding: 1.8rem 1.15rem 1.2rem;
  }

  .about-heading-wrap {
    align-items: flex-start;
    gap: 0.75rem;
  }

  .about-main-icon {
    width: 3.2rem;
    height: 3.2rem;
  }

  .about-main-icon svg {
    width: 25px;
    height: 25px;
  }

  .about-heading-divider {
    display: none;
  }

  .about-subtitle {
    font-size: 0.83rem;
  }

  .about-modal-body {
    padding: 0 1.15rem 1.15rem;
  }

  .about-info-card {
    min-height: auto;
    padding: 0.8rem;
    gap: 0.75rem;
  }

  .about-card-icon {
    width: 2.55rem;
    height: 2.55rem;
  }

  .about-card-copy strong {
    font-size: 1.05rem;
  }

  .about-card-copy span {
    font-size: 0.82rem;
  }

  .about-creator-copy {
    flex-direction: column;
    gap: 0.1rem;
  }

  .about-creator-copy strong {
    padding-right: 0;
    border-right: 0;
  }

  .about-modal-footer {
    padding: 1rem 1.15rem 1.2rem;
    align-items: stretch;
  }

  .license-badge {
    align-self: center;
  }

  .about-footer-actions {
    width: 100%;
  }

  .about-close-btn,
  .about-primary-btn {
    min-width: 0;
    flex: 1;
  }
}

.card-popup-wrap {
  position: fixed;
  inset: 0;
  z-index: 2055;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.card-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.card-popup-body {
  flex: 1 1 auto;
  overflow: auto;
  padding: 1rem;
}
</style>
