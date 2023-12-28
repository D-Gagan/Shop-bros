document.addEventListener('DOMContentLoaded', function () {
    const billingContainer = document.getElementById('billing-content');
    const totalPayableElement = document.getElementById('total-payable');

    // This function will be called from app.js to update the billing details
    window.updateBillingContent = function (purchasedItemsData, items) {
        billingContainer.innerHTML = '<h2>Billing Details</h2>';

        let totalCost = 0;

        for (const itemId in purchasedItemsData) {
            const item = items.find(i => i.id === parseInt(itemId));
            const quantity = purchasedItemsData[itemId].quantity;

            const purchasedItemElement = document.createElement('div');
            purchasedItemElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="billing-item-image">
                ${item.name} x${quantity}
            `;
            billingContainer.appendChild(purchasedItemElement);

            totalCost += purchasedItemsData[itemId].totalCost;
        }

        const totalCostElementBilling = document.createElement('div');
        totalCostElementBilling.classList.add('total-cost');
        totalCostElementBilling.innerHTML = `<strong>Total Cost:</strong> $${totalCost.toFixed(2)}`;
        billingContainer.appendChild(totalCostElementBilling);

        // Calculate and display total payable amount
        const taxRate = 0.1; // 10% tax rate for example
        const totalPayable = totalCost + (totalCost * taxRate);
        totalPayableElement.innerHTML = `Total Payable: $${totalPayable.toFixed(2)}`;
    };
});
