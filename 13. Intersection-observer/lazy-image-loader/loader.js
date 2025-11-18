const images = [
  'https://picsum.photos/id/1015/800/600',
  'https://picsum.photos/id/1024/800/600',
  'https://picsum.photos/id/1035/800/600',
  'https://picsum.photos/id/1040/800/600',
  'https://picsum.photos/id/1057/800/600',
  'https://picsum.photos/id/1069/800/600',
  'https://picsum.photos/id/1074/800/600',
  'https://picsum.photos/id/1084/800/600'
];

const root = document.getElementById('root');

images.forEach((src) => {
  const box = document.createElement('div');
  box.className = 'image-container';

  const img = document.createElement('img');
  img.dataset.src = src;

  box.appendChild(img);
  root.appendChild(box);
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;

      // or simulate api call
      img.onload = () => {
        img.classList.add('loaded');
      };

      obs.unobserve(img);
    }
  });
}, {});

document.querySelectorAll('img').forEach((img) => observer.observe(img));
