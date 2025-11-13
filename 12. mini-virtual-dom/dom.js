function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

function render(vnode) {
  if (typeof vnode === 'string') return document.createTextNode(vnode);

  const el = document.createElement(vnode.type);
  Object.entries(vnode.props).forEach(([k, v]) => el.setAttribute(k, v));

  vnode.children.map(render).forEach((child) => el.appendChild(child));
  return el;
}

/**
 * Not covering all scenarios
 */
function diff(parent, oldVNode, newVNode, index = 0) {
  const existingNode = parent.childNodes[index];

  if (newVNode === undefined) {
    if (existingNode) parent.removeChild(existingNode);
    return;
  }

  if (oldVNode === undefined) {
    parent.appendChild(render(newVNode));
    return;
  }

  if (typeof oldVNode === 'string' || typeof newVNode === 'string') {
    if (oldVNode !== newVNode) {
      parent.replaceChild(render(newVNode), existingNode);
    }
    return;
  }

  if (oldVNode.type !== newVNode.type) {
    parent.replaceChild(render(newVNode), existingNode);
    return;
  }

  updateAttributes(existingNode, oldVNode.props, newVNode.props);

  const maxLen = Math.max(oldVNode.children.length, newVNode.children.length);
  for (let i = 0; i < maxLen; i++) {
    diff(existingNode, oldVNode.children[i], newVNode.children[i], i);
  }
}

function updateAttributes(el, oldProps, newProps) {
  for (const name in oldProps) {
    if (!(name in newProps)) {
      el.removeAttribute(name);
    }
  }

  for (const [name, value] of Object.entries(newProps)) {
    if (el.getAttribute(name) !== value) {
      el.setAttribute(name, value);
    }
  }
}

// Use
const vdom1 = createElement(
  'div',
  { id: 'root' },
  createElement('h3', {}, 'DOM1'),
  createElement(
    'ul',
    {},
    createElement('li', {}, 'A'),
    createElement('li', {}, 'B'),
    createElement('li', {}, 'C')
  )
);

const vdom2 = createElement(
  'div',
  { id: 'root' },
  createElement('h3', {}, 'DOM2'),
  createElement(
    'ul',
    {},
    createElement('li', {}, 'A2'),
    createElement('li', {}, 'B2')
  )
);

const app = document.getElementById('app');
let currentVNode = vdom1;

// Initial render
app.appendChild(render(currentVNode));

// Register Update
document.getElementById('update').addEventListener('click', () => {
  const newVNode = currentVNode === vdom1 ? vdom2 : vdom1;
  diff(app, currentVNode, newVNode, 0);
  currentVNode = newVNode;
});
