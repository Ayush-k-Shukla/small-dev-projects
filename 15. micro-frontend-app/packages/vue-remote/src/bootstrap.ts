import { createApp } from 'vue';
import App from './App.vue';

const mount = (el: Element) => {
  const app = createApp(App);
  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('app');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };

