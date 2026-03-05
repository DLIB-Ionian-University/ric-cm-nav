import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // component: HomeView,
      redirect: "/entities",
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/entities",
      name: "entities",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EntitiesView.vue"),
    },
    {
      path: "/attributes",
      name: "attributes",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AttributesView.vue"),
    },
    {
      path: "/relations",
      name: "relations",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RelationsView.vue"),
    },
    {
      path: "/relation-attributes",
      name: "relation-attributes",
      component: () => import("../views/RelationAttributesView.vue"),
    },
    {
      path: "/entitycard",
      name: "entitycard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EntityCardView.vue"),
    },
    {
      path: "/relationcard",
      name: "relationcard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RelationCardView.vue"),
    },
    {
      path: "/attributecard",
      name: "attributecard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AttributeCardView.vue"),
    },
    {
      path: "/relationattributecard",
      name: "relationattributecard",
      component: () => import("../views/RelationAttributeCardView.vue"),
    },
  ],
});

export default router;
