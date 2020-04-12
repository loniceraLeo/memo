import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Archive from "../views/Archive.vue"
import notfound from "../components/elements/notfound.vue"
import note from "@/views/note.vue"
import post from "@/views/post.vue"
import comment from "@/views/comment.vue"
import friend from "@/views/friend.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: post
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: '/archive',
    name: "archive",
    component: Archive
  },
  {
    path: '/note',
    name: 'Note',
    component: note
  },
  {
    path: '/comment',
    name: 'Comment',
    component: comment
  },
  {
    path: '/friend',
    name: 'Friend',
    component: friend
  },
  {
    path: '*',
    component: notfound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
