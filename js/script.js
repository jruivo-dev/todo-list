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
				<button>X</button>
		</li>`
  }).join("");
  console.log(html);
  list.innerHTML = html;
}


shoppingForm.addEventListener('submit', addItem)

list.addEventListener('itemsUpdated', updateItems);