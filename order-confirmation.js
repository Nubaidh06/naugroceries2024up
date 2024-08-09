document.addEventListener('DOMContentLoaded', function() {
    // Load existing order items
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const summaryTable = document.querySelector('#order-summary tbody');
    const totalPriceElement = document.querySelector('#total-price');
    const orderForm = document.querySelector('#order-form');
    const successMessage = document.querySelector('#order-success-message');

    // Function to update the order summary table and total price
    function updateSummary() {
        summaryTable.innerHTML = ''; 
        let totalPrice = 0;
        orderItems.forEach(item => {
            // Create a row for each order item
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>Rs. ${item.pricePerUnit.toFixed(2)}</td>
                <td>Rs. ${(item.quantity * item.pricePerUnit).toFixed(2)}</td>
            `;
            summaryTable.appendChild(row);
            totalPrice += item.quantity * item.pricePerUnit;  // Calculate total price
        });
        totalPriceElement.textContent = `Rs. ${totalPrice.toFixed(2)}`;  // Display total price
    }

    updateSummary();

    // Handle form submission
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();  // 

        // Validate the form fields before placing the order
        if (validateOrderForm()) {
            successMessage.textContent = 'Thank you for your order, it has been placed successfully. Your order will arrive within 2 business days.';
            successMessage.style.display = 'block';

            orderForm.reset();

            localStorage.removeItem('orderItems');

            // Clear the order summary after placing the order
            updateSummary();
        } else {
            alert('Please fill out all required fields.');  // Show error message if form is invalid
        }
    });

    // Function to validate form fields
    function validateOrderForm() {
        const firstName = document.querySelector('#first-name').value;
        const lastName = document.querySelector('#last-name').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;
        const city = document.querySelector('#city').value;
        const postcode = document.querySelector('#postcode').value;
        const phone = document.querySelector('#phone').value;
        const deliveryDate = document.querySelector('#delivery-date').value;
        const paymentMethod = document.querySelector('#payment-method').value;

        // Ensure all required fields are filled
        return firstName && lastName && email && address && city && postcode && phone && deliveryDate && paymentMethod;
    }
});
