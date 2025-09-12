import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import TheFirstCrore from './pages/TheFirstCrore.vue';
import The10CroreGoal from './pages/The10CroreGoal.vue';
import The100Crore from './pages/The100Crore.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Subhshanti Wealth',
      ogImage: '/public/images/home-og.jpg',
      description: 'Welcome to Subhshanti Home Page. Discover our latest updates and offerings.',
      keywords: 'subhshanti, home, updates, offerings',
      ogSiteName: 'Subhshanti Wealth',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Home',
        'description': 'Welcome to Subhshanti Home Page. Discover our latest updates and offerings.'
      },
      scripts: []
    }
  },
  {
    path: '/the-first-crore',
    name: 'TheFirstCrore',
    component: TheFirstCrore,
    meta: {
      title: 'The First Crore | Subhshanti Wealth',
      ogImage: '/public/images/the-first-crore-og.jpg',
      description: 'Learn about The First Crore journey with Subhshanti. Insights, strategies, and stories to inspire your financial growth.',
      keywords: 'subhshanti, first crore, finance, growth, inspiration, stories',
      ogSiteName: 'The First Crore | Subhshanti Wealth',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'The First Crore',
        'description': 'Learn about The First Crore journey with Subhshanti. Insights, strategies, and stories to inspire your financial growth.'
      },
      scripts: []
    }
  },
  {
    path: '/the-10-crore-goal',
    name: 'The10CroreGoal',
    component: The10CroreGoal,
    meta: {
      title: 'The 10 Crore Goal | Subhshanti Wealth',
      ogImage: '/public/images/the-10-crore-goal-og.jpg',
      description: 'Explore the journey to achieving the 10 Crore goal with Subhshanti. Strategies, tips, and inspiration for your financial milestones.',
      keywords: 'subhshanti, 10 crore, finance, goal, strategies, inspiration, milestones',
      ogSiteName: 'The 10 Crore Goal | Subhshanti Wealth',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'The 10 Crore Goal',
        'description': 'Explore the journey to achieving the 10 Crore goal with Subhshanti. Strategies, tips, and inspiration for your financial milestones.'
      },
      scripts: []
    }
  },
  {
    path: '/the-100-crore-goal',
    name: '100+CroreAndBeyond',
    component: The100Crore,
    meta: {
      title: '100+ Crore and Beyond | Subhshanti Wealth',
      ogImage: '/public/images/the-100-crore-goal-og.jpg',
      description: 'Discover strategies, stories, and inspiration for achieving 100+ Crore and beyond with Subhshanti. Unlock your financial potential and legacy.',
      keywords: 'subhshanti, 100 crore, beyond, wealth, financial freedom, legacy, strategies, inspiration',
      ogSiteName: '100+ Crore and Beyond | Subhshanti Wealth',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': '100+ Crore and Beyond',
        'description': 'Discover strategies, stories, and inspiration for achieving 100+ Crore and beyond with Subhshanti. Unlock your financial potential and legacy.'
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
