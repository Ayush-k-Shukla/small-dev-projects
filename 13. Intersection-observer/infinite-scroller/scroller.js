const list = document.getElementById('list');
const loader = document.getElementById('loading');

let count = 0;
let loading = false;

// Simulate API call
const fetchItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];
      for (let i = 0; i < 20; i++) {
        data.push(`Item ${count++}`);
      }
      resolve(data);
    }, 1000);
  });
};

const loadMore = async () => {
  if (loading) return;
  loading = true;

  const items = await fetchItems();

  items.forEach((text) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = text;
    list.appendChild(div);
  });

  loading = false;
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !loading) {
    loadMore();
  }
});

observer.observe(loader);

// Initial Load
loadMore();
