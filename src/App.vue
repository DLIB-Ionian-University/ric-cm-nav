<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <main role="main" class="container">
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">RiC-CM NavTool</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/entities">Entities</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/attributes">Attributes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/relations">Relations</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Relation Attributes</a>
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

<style scoped></style>
