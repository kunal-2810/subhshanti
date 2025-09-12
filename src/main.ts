import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

router.afterEach((to) => {
  // Set document title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string;
  }

  // Set meta description
  const description = document.querySelector('meta[name="description"]');
  if (description && to.meta && to.meta.description) {
    description.setAttribute('content', to.meta.description as string);
  }

  // Set meta keywords
  const keywords = document.querySelector('meta[name="keywords"]');
  if (keywords && to.meta && to.meta.keywords) {
    keywords.setAttribute('content', to.meta.keywords as string);
  }

  // Set Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && to.meta && to.meta.title) {
    ogTitle.setAttribute('content', to.meta.title as string);
  }
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && to.meta && to.meta.ogImage) {
    ogImage.setAttribute('content', to.meta.ogImage as string);
  }
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && to.meta && to.meta.description) {
    ogDescription.setAttribute('content', to.meta.description as string);
  }
  const ogSiteName = document.querySelector('meta[property="og:site_name"]');
  if (ogSiteName && to.meta && to.meta.ogSiteName) {
    ogSiteName.setAttribute('content', to.meta.ogSiteName as string);
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
