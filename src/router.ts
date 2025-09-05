import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home | Subhshanti',
      ogImage: '/public/images/home-og.jpg',
      description: 'Welcome to Subhshanti Home Page. Discover our latest updates and offerings.',
      keywords: 'subhshanti, home, updates, offerings',
      ogSiteName: 'Subhshanti',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Home',
        'description': 'Welcome to Subhshanti Home Page. Discover our latest updates and offerings.'
      },
      scripts: []
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
