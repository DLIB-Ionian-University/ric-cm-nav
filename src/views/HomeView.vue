<script setup>
import { RouterLink } from "vue-router";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  FlaskConical,
  Layers3,
  MapPin,
  Network,
  Play,
  Share2,
  Tag,
  Users,
  Workflow,
} from "lucide-vue-next";
import { useLabels } from "@/composables/useLabels";

const { t } = useLabels();

const learningPaths = [
  {
    key: "entities",
    route: "/entities",
    icon: Layers3,
    titleKey: "nav.entities",
    descriptionKey: "home.entitiesDescription",
    actionKey: "home.exploreEntities",
  },
  {
    key: "attributes",
    route: "/attributes",
    icon: Tag,
    titleKey: "nav.attributes",
    descriptionKey: "home.attributesDescription",
    actionKey: "home.exploreAttributes",
  },
  {
    key: "relations",
    route: "/relations",
    icon: Share2,
    titleKey: "nav.relations",
    descriptionKey: "home.relationsDescription",
    actionKey: "home.exploreRelations",
  },
  {
    key: "playground",
    route: "/modeling-playground",
    icon: FlaskConical,
    titleKey: "nav.modelingPlayground",
    descriptionKey: "home.playgroundDescription",
    actionKey: "home.goToPlayground",
  },
];
</script>

<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">
            <Network :size="18" :stroke-width="2.2" />
            {{ t("home.eyebrow") }}
          </p>
          <h1>{{ t("home.title") }}</h1>
          <span class="title-rule" aria-hidden="true"></span>
          <p class="hero-description">{{ t("home.description") }}</p>
          <div class="hero-actions">
            <RouterLink class="home-button home-button-primary" to="/entities">
              {{ t("home.startExploring") }}
              <ArrowRight :size="19" />
            </RouterLink>
            <RouterLink class="home-button home-button-secondary" to="/modeling-playground">
              {{ t("home.openPlayground") }}
              <Play :size="17" fill="currentColor" />
            </RouterLink>
          </div>
        </div>

        <div class="concept-map" role="img" :aria-label="t('home.graphAria')">
          <div class="map-glow" aria-hidden="true"></div>
          <svg class="map-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 50 C38 34 31 25 20 19" />
            <path d="M50 50 C35 50 26 50 15 50" />
            <path d="M50 50 C38 67 31 76 21 82" />
            <path d="M50 50 C62 34 70 24 82 19" />
            <path d="M50 50 C65 50 74 50 86 50" />
            <path d="M50 50 C62 67 69 76 80 82" />
          </svg>

          <div class="concept-node concept-node-core">
            <Network :size="28" :stroke-width="1.8" />
            <strong>{{ t("home.modelName") }}</strong>
            <small>{{ t("home.modelSubtitle") }}</small>
          </div>
          <div class="concept-node node-record">
            <FileText :size="25" />
            <span>{{ t("home.record") }}</span>
          </div>
          <div class="concept-node node-agent">
            <Users :size="25" />
            <span>{{ t("home.agent") }}</span>
          </div>
          <div class="concept-node node-place">
            <MapPin :size="25" />
            <span>{{ t("home.place") }}</span>
          </div>
          <div class="concept-node node-event">
            <CalendarDays :size="25" />
            <span>{{ t("home.event") }}</span>
          </div>
          <div class="concept-node node-record-set">
            <Workflow :size="25" />
            <span>{{ t("home.recordSet") }}</span>
          </div>
          <div class="concept-node node-function">
            <Layers3 :size="25" />
            <span>{{ t("home.function") }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="learning-section">
      <div class="learning-heading">
        <div>
          <p class="section-kicker">RiC-CM</p>
          <h2>{{ t("home.choosePath") }}</h2>
        </div>
        <p>{{ t("home.pathIntro") }}</p>
      </div>

      <div class="learning-grid">
        <RouterLink
          v-for="(item, index) in learningPaths"
          :key="item.key"
          :to="item.route"
          class="learning-card"
          :style="{ '--delay': `${index * 80}ms` }"
        >
          <span class="learning-icon"><component :is="item.icon" :size="25" /></span>
          <h3>{{ t(item.titleKey) }}</h3>
          <p>{{ t(item.descriptionKey) }}</p>
          <span class="card-action">
            {{ t(item.actionKey) }}
            <ArrowRight :size="17" />
          </span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  --home-navy: #071a43;
  --home-blue: #0b57d0;
  --home-blue-bright: #1479f8;
  --home-ice: #f1f7ff;
  --home-line: #c9ddf7;
  width: calc(100vw - 2rem);
  margin-left: calc(50% - 50vw + 1rem);
  color: var(--home-navy);
  background: #fff;
  overflow: hidden;
}

.hero-section {
  position: relative;
  border-bottom: 1px solid var(--home-line);
  background-color: #f8fbff;
  background-image:
    linear-gradient(rgba(20, 121, 248, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 121, 248, 0.055) 1px, transparent 1px),
    radial-gradient(circle at 75% 42%, rgba(63, 151, 255, 0.16), transparent 34%);
  background-size: 28px 28px, 28px 28px, auto;
}

.hero-grid {
  width: min(1500px, 100%);
  min-height: 575px;
  margin: 0 auto;
  padding: 4.7rem clamp(1.5rem, 4vw, 4.75rem) 4rem;
  display: grid;
  grid-template-columns: minmax(380px, 0.88fr) minmax(560px, 1.12fr);
  align-items: center;
  gap: clamp(2rem, 4vw, 5rem);
}

.hero-copy {
  position: relative;
  z-index: 2;
  animation: rise-in 650ms ease-out both;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 1.2rem;
  color: var(--home-blue);
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.hero-copy h1,
.learning-heading h2 {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--home-navy);
  letter-spacing: -0.035em;
}

.hero-copy h1 {
  max-width: 680px;
  margin: 0;
  font-size: clamp(3.1rem, 5.1vw, 5.7rem);
  font-weight: 700;
  line-height: 0.98;
}

.title-rule {
  display: block;
  width: 7rem;
  height: 0.42rem;
  margin: 1.8rem 0 1.55rem;
  border-radius: 999px;
  background: var(--home-blue-bright);
}

.hero-description {
  max-width: 610px;
  margin: 0;
  color: #2d466c;
  font-size: clamp(1rem, 1.35vw, 1.22rem);
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
}

.home-button {
  min-height: 3.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.8rem 1.35rem;
  border: 2px solid var(--home-blue);
  border-radius: 0.65rem;
  font-weight: 750;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(11, 87, 208, 0.18);
}

.home-button-primary {
  color: #fff;
  background: var(--home-blue);
}

.home-button-primary:hover {
  color: #fff;
  background: #0848ad;
}

.home-button-secondary {
  color: var(--home-blue);
  background: rgba(255, 255, 255, 0.82);
}

.home-button-secondary:hover {
  color: #0848ad;
  background: #fff;
}

.concept-map {
  position: relative;
  min-height: 510px;
  animation: map-in 800ms 120ms ease-out both;
}

.map-glow {
  position: absolute;
  inset: 20% 12%;
  border-radius: 50%;
  background: rgba(77, 160, 255, 0.12);
  filter: blur(30px);
}

.map-edges {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.map-edges path {
  fill: none;
  stroke: #1769d5;
  stroke-width: 2.2;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;
  opacity: 0.9;
}

.concept-node {
  position: absolute;
  z-index: 2;
  width: 112px;
  min-height: 94px;
  padding: 0.75rem 0.55rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border: 2px solid #1769d5;
  border-radius: 50%;
  color: #0a4da8;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 8px 22px rgba(11, 87, 208, 0.12);
  text-align: center;
  transform: translate(-50%, -50%);
}

.concept-node span,
.concept-node strong {
  color: var(--home-navy);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.05;
}

.concept-node-core {
  left: 50%;
  top: 50%;
  width: 190px;
  min-height: 190px;
  padding: 1.5rem;
  border-width: 3px;
  background: linear-gradient(145deg, #fff, #eaf4ff);
}

.concept-node-core strong {
  font-size: 2rem;
}

.concept-node-core small {
  max-width: 130px;
  color: #385273;
  font-size: 0.72rem;
  line-height: 1.25;
}

.node-record { left: 20%; top: 19%; }
.node-agent { left: 15%; top: 50%; }
.node-place { left: 21%; top: 82%; }
.node-event { left: 82%; top: 19%; }
.node-record-set { left: 86%; top: 50%; }
.node-function { left: 80%; top: 82%; }

.learning-section {
  width: min(1500px, 100%);
  margin: 0 auto;
  padding: 3.7rem clamp(1.5rem, 4vw, 4.75rem) 5rem;
  background: #fff;
}

.learning-heading {
  display: grid;
  grid-template-columns: minmax(320px, 0.9fr) minmax(320px, 1.1fr);
  align-items: end;
  gap: 2rem;
  margin-bottom: 2.2rem;
}

.section-kicker {
  margin: 0 0 0.35rem;
  color: var(--home-blue);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.learning-heading h2 {
  margin: 0;
  font-size: clamp(2.35rem, 3.8vw, 4rem);
  font-weight: 700;
  line-height: 1.05;
}

.learning-heading > p {
  max-width: 660px;
  margin: 0 0 0.35rem;
  color: #4b6384;
  font-size: 1.05rem;
  line-height: 1.6;
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.learning-card {
  min-height: 270px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #c9ddf7;
  border-radius: 1rem;
  color: var(--home-navy);
  background: linear-gradient(155deg, #fff 35%, #edf6ff);
  box-shadow: 0 8px 24px rgba(26, 86, 168, 0.07);
  text-decoration: none;
  animation: rise-in 550ms var(--delay) ease-out both;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.learning-card:hover {
  color: var(--home-navy);
  transform: translateY(-5px);
  border-color: #6faaf1;
  box-shadow: 0 18px 35px rgba(26, 86, 168, 0.14);
}

.learning-icon {
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--home-blue);
  background: #dceeff;
}

.learning-card h3 {
  margin: 1.05rem 0 0.6rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.45rem;
  font-weight: 700;
}

.learning-card p {
  margin: 0;
  color: #415b7e;
  line-height: 1.55;
}

.card-action {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--home-blue);
  font-weight: 750;
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes map-in {
  from { opacity: 0; transform: translateX(25px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@media (max-width: 1100px) {
  .hero-grid {
    grid-template-columns: 1fr;
    padding-top: 3.5rem;
  }

  .hero-copy {
    max-width: 780px;
  }

  .concept-map {
    min-height: 520px;
  }

  .learning-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .home-page {
    width: 100%;
    margin: 3.25rem 0 0;
  }

  .hero-grid {
    min-height: auto;
    padding: 2.7rem 1rem 2rem;
  }

  .hero-copy h1 {
    font-size: clamp(2.65rem, 13vw, 4.2rem);
  }

  .hero-actions {
    flex-direction: column;
  }

  .home-button {
    width: 100%;
  }

  .concept-map {
    min-height: 390px;
    margin-inline: -0.5rem;
  }

  .concept-node {
    width: 82px;
    min-height: 74px;
    padding: 0.45rem;
  }

  .concept-node svg {
    width: 20px;
    height: 20px;
  }

  .concept-node span {
    font-size: 0.77rem;
  }

  .concept-node-core {
    width: 138px;
    min-height: 138px;
  }

  .concept-node-core strong {
    font-size: 1.45rem;
  }

  .concept-node-core small {
    font-size: 0.58rem;
  }

  .learning-section {
    padding: 3rem 1rem;
  }

  .learning-heading {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .learning-grid {
    grid-template-columns: 1fr;
  }

  .learning-card {
    min-height: 230px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .concept-map,
  .learning-card {
    animation: none;
  }

  .home-button,
  .learning-card {
    transition: none;
  }
}
</style>
