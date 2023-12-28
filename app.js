document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');

    // Sample items
    const items = [
        { id: 1, name: 'Item 1', price: 10, imageUrl: 'images/beautiful-men-fashion-shirt.jpg' },
        { id: 2, name: 'Item 2', price: 20, imageUrl: 'images/travelers-backpacks-shoes.jpg' },
        { id: 3, name: 'Item 3', price: 15, imageUrl: 'images/white-reusable-water-bottle.jpg' }
    ];

    // Object to store purchased items and quantities
    const purchasedItemsData = {};

    // Display items
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="item-image">
            <strong>${item.name}</strong> - $${item.price}
            <button onclick="addToPurchase(${item.id})">Add to Purchase</button>
        `;
        itemList.appendChild(itemElement);
    });

    window.showAbout = function () {
        hideAllSections();
        document.getElementById('about').style.display = 'block';
    };

    window.showBilling = function () {
        hideAllSections();
        document.getElementById('billing').style.display = 'block';
        updateBillingContent();
    };

    function hideAllSections() {
        document.getElementById('item-list').style.display = 'block';
        document.getElementById('about').style.display = 'none';
        document.getElementById('billing').style.display = 'none';
    }

    function updateBillingContent() {
        const billingContainer = document.getElementById('billing');
        billingContainer.innerHTML = '<h2>Billing Details</h2>';

        let totalCost = 0;

        for (const itemId in purchasedItemsData) {
            const item = items.find(i => i.id === parseInt(itemId));
            const quantity = purchasedItemsData[itemId].quantity;

            const purchasedItemElement = document.createElement('div');
            purchasedItemElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="purchased-item-image billing-item-image">
                ${item.name} x${quantity}
            `;
            billingContainer.appendChild(purchasedItemElement);

            totalCost += purchasedItemsData[itemId].totalCost;
        }

        const totalCostElementBilling = document.createElement('div');
        totalCostElementBilling.classList.add('total-cost');
        totalCostElementBilling.innerHTML = `<strong>Total Cost:</strong> $${totalCost.toFixed(2)}`;
        billingContainer.appendChild(totalCostElementBilling);
    }

    window.addToPurchase = function (itemId) {
        const selectedItem = items.find(item => item.id === itemId);

        if (!selectedItem) {
            console.error('Item not found.');
            return;
        }

        if (purchasedItemsData[itemId]) {
            purchasedItemsData[itemId].quantity += 1;
            purchasedItemsData[itemId].totalCost += selectedItem.price;
        } else {
            purchasedItemsData[itemId] = {
                quantity: 1,
                totalCost: selectedItem.price
            };
        }

        updateBillingContent();
    };
});
