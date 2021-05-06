const departmentsURL = 'http://localhost:3000/departments/';
const itemsURL = 'http://localhost:3000/items/';
const cardContainer = document.querySelector('#card-container');

fetch(departmentsURL)
	.then(res => res.json())
	.then(departments => departments.forEach(department => getItems(department)));

const getItems = department => {
	fetch(departmentsURL + department.id)
		.then(res => res.json())
		.then(depWithItems => {
			let depDiv = document.createElement('div');
			depDiv.className = 'department-card';

			let depH2 = document.createElement('h2');
			depH2.innerText = depWithItems.name;

			let itemsDiv = document.createElement('div');
			depWithItems.items.forEach(item => appendItem(item, itemsDiv));

			let newItemForm = document.createElement('form');
			newItemForm.addEventListener('submit', event => {
				event.preventDefault();
				const newItemName = itemInput.value;
				const newItem = {
					name: newItemName,
					departmentId: department.id,
				};
				const postItemOptions = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
                    body: JSON.stringify(newItem)
				};

                fetch(itemsURL, postItemOptions)
                .then(res => res.json())
                .then(item => appendItem(item, itemsDiv))

                newItemForm.reset()
			});

			let itemInput = document.createElement('input');
			itemInput.type = 'text';
			itemInput.placeholder = 'Item name';

			let addButton = document.createElement('input'); //make this button work
			addButton.className = 'form-button';
			addButton.type = 'submit';
			addButton.value = 'Add Item';


			newItemForm.append(itemInput, addButton);

			depDiv.append(depH2, itemsDiv, newItemForm);
			cardContainer.append(depDiv);
		});
};

const appendItem = (item, itemsDiv) => {
	let itemDiv = document.createElement('div');
	itemDiv.className = 'item';

	let deleteButton = document.createElement('button'); //make this button work
	deleteButton.className = 'delete-button';
	deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', () => deleteItem(item, itemDiv))

	let itemName = document.createElement('p');
	itemName.innerText = item.name;

	itemDiv.append(deleteButton, itemName);
	itemsDiv.append(itemDiv);
};

function deleteItem(item, itemDiv){
    const deleteItemOptions = {
        method: 'DELETE'
    }
    fetch(itemsURL + item.id, deleteItemOptions)
    itemDiv.remove()
}
