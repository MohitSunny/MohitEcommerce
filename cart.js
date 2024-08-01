document.addEventListener('DOMContentLoaded', function () {
    const cartTable = document.querySelector('.cart-table tbody');
    const cartTotalPrice = document.getElementById('cart-total-price');

    function updateCartTotal() {
        let total = 0;
        cartTable.querySelectorAll('tr').forEach(row => {
            const price = parseFloat(row.children[1].textContent.replace('$', ''));
            const quantity = parseInt(row.children[2].querySelector('input').value);
            const totalCell = row.children[3];
            const rowTotal = price * quantity;
            totalCell.textContent = `$${rowTotal.toFixed(2)}`;
            total += rowTotal;
        });
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    cartTable.addEventListener('input', function (event) {
        if (event.target.type === 'number') {
            updateCartTotal();
        }
    });

    cartTable.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            event.target.closest('tr').remove();
            updateCartTotal();
        }
    });

    updateCartTotal();
});
