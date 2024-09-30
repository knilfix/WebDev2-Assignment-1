// upload.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the form data to your server
            // For this example, we'll just log the data to the console
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            alert('Product uploaded successfully!');
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;

        // Basic validation
        const requiredFields = ['productName', 'productImage', 'price', 'description', 'storeName'];
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        // Price validation
        const price = document.getElementById('price');
        if (parseFloat(price.value) <= 0) {
            isValid = false;
            price.classList.add('error');
        }

        // Discount validation
        const discount = document.getElementById('discount');
        if (discount.value && (parseFloat(discount.value) < 0 || parseFloat(discount.value) > 100)) {
            isValid = false;
            discount.classList.add('error');
        }

        if (!isValid) {
            alert('Please fill in all required fields correctly.');
        }

        return isValid;
    }
});