document.getElementById('addStockBtn').addEventListener('click', addStock);

function addStock() {
    const stockSymbol = document.getElementById('stockSymbol').value.toUpperCase();
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value).toFixed(2);
    const purchaseYear = document.getElementById('purchaseYear').value;

    if (stockSymbol && purchasePrice && purchaseYear) {
        getStockData(stockSymbol).then(stockData => {
            if (stockData) {
                const portfolioList = document.getElementById('portfolioList');
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="stock-info">
                        <span>${stockSymbol} - $${stockData.price}</span>
                        <span>Purchase Price: $${purchasePrice}</span>
                        <span>Year of Purchase: ${purchaseYear}</span>
                    </div>
                    <button class="remove-btn" onclick="removeStock(this)">Remove</button>
                `;
                portfolioList.appendChild(listItem);
                clearInputs();
                animateAddition(listItem);
            } else {
                alert('Invalid stock symbol. Please try again.');
            }
        });
    } else {
        alert('Please enter all the details.');
    }
}

function removeStock(button) {
    const listItem = button.parentNode;
    listItem.style.transition = 'opacity 0.5s';
    listItem.style.opacity = '0';
    setTimeout(() => listItem.parentNode.removeChild(listItem), 500);
}

async function getStockData(symbol) {
    const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            return {
                symbol: symbol,
                price: parseFloat(data['Global Quote']['05. price']).toFixed(2)
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

function animateAddition(element) {
    element.style.transition = 'opacity 0.5s';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

function clearInputs() {
    document.getElementById('stockSymbol').value = '';
    document.getElementById('purchasePrice').value = '';
    document.getElementById('purchaseYear').value = '';
}
