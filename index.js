const departmentsURL = 'http://localhost:3000/departments/';
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
            
            let itemsDiv = document.createElement('div')
			depWithItems.items.forEach(item => appendItem(item, itemsDiv));
            
            let newItemForm = document.createElement('form')

            let itemInput = document.createElement('input')
            itemInput.type = 'text'
            itemInput.placeholder = 'Item name'

            let addButton = document.createElement('input') //make this button work
            addButton.className = 'form-button'
            addButton.type = 'submit'
            addButton.value = 'Add Item'

            newItemForm.append(itemInput, addButton)

			depDiv.append(depH2, itemsDiv, newItemForm);
			cardContainer.append(depDiv);
		});
};

const appendItem = (item, itemsDiv) => {
    let itemDiv = document.createElement('div')
    itemDiv.className = 'item'

    let deleteButton = document.createElement('button') //make this button work
    deleteButton.className = 'delete-button'
    deleteButton.innerText = 'X'

	let itemName = document.createElement('p');
	itemName.innerText = item.name;

    itemDiv.append(deleteButton, itemName);
    itemsDiv.append(itemDiv)
};
