const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentYear = 2025;
const currentDate = new Date(2025, 1, 8); // Set to Feb 8, 2025

function getFeeStatus(month, year) {
    const monthDate = new Date(year, months.indexOf(month), 1);
    
    if (monthDate > currentDate) {
        return {
            status: 'Pending',
            color: 'bg-yellow-100 border-yellow-400 text-yellow-700',
            showButton: true
        };
    } else if (monthDate.getFullYear() === currentDate.getFullYear() && 
              monthDate.getMonth() <= currentDate.getMonth()) {
        return {
            status: 'Paid',
            color: 'bg-green-100 border-green-400 text-green-700',
            showButton: false
        };
    } else if (monthDate < currentDate) {
        return {
            status: 'PAID',
            color: 'bg-green-100 border-green-400 text-green-700',
            showButton: false
        };
    }
}

function createMonthCard(month, year) {
    const status = getFeeStatus(month, year);
    const monthCard = document.createElement('div');
    monthCard.className = `month-card p-4 rounded-lg border ${status.color}`;
    
    monthCard.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <h3 class="font-semibold">${month} ${year}</h3>
                <span class="text-sm font-medium">${status.status}</span>
            </div>
            ${status.showButton ? `
                <button class="pay-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Pay now
                </button>
            ` : ''}
        </div>
    `;
    
    if(status.showButton){
        const payButton = monthCard.querySelector('.pay-button');
        payButton.addEventListener('click',()=>processPayment(month,year));
    }
    return monthCard;
}

function processPayment(month,year){
    fetch('/payment/pay-fee',{
        method: 'POST',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({month,year})
    })
    .then(response => response.json())
    .then(data=>{
        if(data.success){
            alert(`Payment for ${month} ${year} successfull !`);
            updateMonthsGrid(currentYear);
            updateYearSummary(currentYear);
        }
        else{
            alert(`Payment failed: ${data.message}`);
        }
    })
    .catch(error =>console.error('Error:',error));
}

function updateMonthsGrid(year) {
    const grid = document.getElementById('monthsGrid');
    grid.innerHTML = '';
    
    months.forEach(month => {
        const monthCard = createMonthCard(month, year);
        grid.appendChild(monthCard);
    });
}

function updateYearSummary(year) {
    let totalPaid, pendingAmount;
    
    if (year < currentDate.getFullYear()) {
        totalPaid = '₹96,000';
        pendingAmount = '₹0';
    } else if (year === currentDate.getFullYear()) {
        totalPaid = '₹48,000';
        pendingAmount = '₹4,000';
    } else {
        totalPaid = '₹0';
        pendingAmount = '₹96,000';
    }
    
    document.getElementById('totalPaid').textContent = totalPaid;
    document.getElementById('pendingAmount').textContent = pendingAmount;
}

function changeYear(change) {
    currentYear += change;
    document.getElementById('currentYear').textContent = currentYear;
    updateMonthsGrid(currentYear);
    updateYearSummary(currentYear);
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateMonthsGrid(currentYear);
    updateYearSummary(currentYear);
});