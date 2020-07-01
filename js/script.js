const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.shopping-list');

let items = [];


function addItem(e) {
  const item = e.target.item.value;
  if (!item) return;
  e.preventDefault();

  items.push({ item, id: Date.now(), checked: false });
  e.target.item.value = "";

  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function updateItems() {
  const html = items.map((item) => {
    return `<li>
				<input type="checkbox"/>
				<span>${item.item}</span>
				<button value=${item.id}>X</button>
		</li>`
  }).join("");
  list.innerHTML = html;
}

function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function importFromLocalStorage() {
  lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems) {
    items.push(...lsItems);
  }
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}


function handleDelete(e) {
  if (e.target.matches('button')) {
    const buttonId = parseFloat(e.target.value);
    items = items.filter(item => {
      return item.id !== buttonId;
    });
  }
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}


list.addEventListener('click', handleDelete);
shoppingForm.addEventListener('submit', addItem);

list.addEventListener('itemsUpdated', updateItems);
list.addEventListener('itemsUpdated', saveToLocalStorage);

importFromLocalStorage();