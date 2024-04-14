
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    const taxResult = document.getElementById('taxResult');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            calculateTax();
            modal.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function validateForm() {
        const grossIncome = document.getElementById('grossIncome');
        const extraIncome = document.getElementById('extraIncome');
        const deductions = document.getElementById('deductions');
        const age = document.getElementById('age');
        const grossIncomeError = document.getElementById('grossIncomeError');
        const extraIncomeError = document.getElementById('extraIncomeError');
        const deductionsError = document.getElementById('deductionsError');
        const ageError = document.getElementById('ageError');

        let valid = true;

        if (!grossIncome.value || grossIncome.value <= 0) {
            grossIncomeError.textContent = 'Gross Annual Income is required and must be greater than 0';
            grossIncomeError.style.display = 'inline-block';
            valid = false;
        } else {
            grossIncomeError.style.display = 'none';
        }

        if (extraIncome.value && extraIncome.value < 0) {
            extraIncomeError.textContent = 'Extra Income cannot be negative';
            extraIncomeError.style.display = 'inline-block';
            valid = false;
        } else {
            extraIncomeError.style.display = 'none';
        }

        if (deductions.value && deductions.value < 0) {
            deductionsError.textContent = 'Deductions cannot be negative';
            deductionsError.style.display = 'inline-block';
            valid = false;
        } else {
            deductionsError.style.display = 'none';
        }

        if (!age.value) {
            ageError.textContent = 'Age is required';
            ageError.style.display = 'inline-block';
            valid = false;
        } else {
            ageError.style.display = 'none';
        }

        return valid;
    }

    function calculateTax() {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;
        const age = document.getElementById('age').value;
        let taxRate;

        if (age === 'below40') {
            taxRate = 0.3;
        } else if (age === '40to60') {
            taxRate = 0.4;
        } else if (age === 'above60') {
            taxRate = 0.1;
        }

        const taxableIncome = grossIncome + extraIncome - deductions - 800000;

        let taxAmount = 0;
        if (taxableIncome > 0) {
            taxAmount = taxableIncome * taxRate;
        }

        taxResult.textContent = `Tax Amount: ${taxAmount.toFixed(2)} RS`;
    }
});
