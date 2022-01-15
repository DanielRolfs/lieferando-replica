let names = [];
let prices = [];
let amounts = [];
let i = 0;

let total = 0;
let finalSum = 0;
let product1InBasket = '';
let countProducts = 1;

function addToBasket(name, price) {

    if (names.includes(name)) {
        let index = names.indexOf(name);
        amounts[index]++;
    } else {
        names.push(name);
        prices.push(price);
        amounts.push(1);
    }
    updateShoppingBasket();
}


function updateShoppingBasket() {
    let content = document.getElementById('basket');
    content.innerHTML = '';
    let subTotal = 0;
    let newtotal = 0; 
    let restAmountNeedet = 0;
    countProducts = 0;
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const price = prices[i];
        const amount = amounts[i];
        const totalAmounts = price * amount;
      
    subTotal = subTotal + totalAmounts;
    newtotal = subTotal + 2.5;
    restAmountNeedet = 10 - subTotal;

        content.innerHTML += `
            <div class="displayflex width100pc">
            
                <div class="basketAmount">${amount}x </div>
                
                <div class="between width100pc">
                    <div class="between widthx displayflex">
                        <div>${name}</div>
                        
                        <div class="displayflex">
                        <button class="adjustButton" onclick="addToBasket('${name}',${price})">+</button>
                        <button class="adjustButton" onclick="deleteSingleItem(${i})">-</button>
                        </div>
                    </div>

                    <div>
                    ${totalAmounts} €
                    <button class="deleteButton" onclick="deleteItem(${i})"></button>
                    </div>
                </div>
            </div>
            `;
        }

        

    if (amounts.length == 0) {
        let total = document.getElementById('sum');
        total.innerHTML = '';
        total.innerHTML += `
        <div class="emptyBasket" id="basket">
                <div>
                    <img src="img/basket.png">
                </div>
                <div>
                    <p class="centerText">Wähle leckere Gerichte aus der Karte und bestelle Dein Menü</p>
                </div>

                <div class="line"></div>

                <div class="flex between width100pc">
                    <div>
                        <p>Sub-total</p>
                    </div>
                    <div>
                        <p>0,00€</p>
                    </div>
                </div>
                <div class="flex between width100pc">
                    <p class="bold">
                        Total
                    </p>
                    <p class="bold">
                        0,00€
                    </p>
                </div>

                <div class="line"></div>

                <div>
                    <p>Sorry, you can't order yet. Hans im Glück has set a minimum order amount of 10,00 € (excl.
                        delivery costs)</p>
                </div>
                

                <div class="width100pc">
                    <div class="disabledOrderButton">
                        <p>Order</p>
                    </div>
                </div>
            </div>
        `;
        } else {

            let total = document.getElementById('sum');
            total.innerHTML = '';
            total.innerHTML += `
            <div class="line"></div>
            
            <div class="flex between">
            <div>
                <p>Sub-total</p>
            </div>
            <div>
                <p>${subTotal}€</p>
            </div>
            </div>

            <div class="flex between width100">
            <div>
                <p>Delivery Costs</p>
            </div>
            <div>
                <p>2,50€</p>
            </div>
            </div>

            <div class="flex between width100">
            <p class="bold">
                Total
            </p>
            <p class="bold">
            ${newtotal}€
            </p>
            </div>

            <div class="line"></div>
            `; 
            

            if (subTotal >= 10) {
                total.innerHTML += `
               <p>You have reached the minimum order amount of 10,00 € to checkout.</p>
               
                <div class="activeOrderButton">
                    <p>Order</p>
                </div>
                `; 
            } else {
                total.innerHTML += `
                <div class="flex between">
                    <p class="bold green">
                        Amount needet to reach the minimum order value
                    </p>
                    <p class="bold green">
                        ${restAmountNeedet}€
                    </p>
                </div>

                <div class="line"></div>
                
                <div>
                    <p>Sorry, you can't order yet. Hans im Glück has set a minimum order amount of 10,00 € (excl.
                        delivery costs)</p>
                </div>
                <div class="width100pc">
                    <div class="disabledOrderButton">
                        <p>Order</p>
                    </div>
                </div>
                `; 
            }
        }
    
}


function deleteItem(i) {
    names.splice(i);
    prices.splice(i);
    amounts.splice(i);
    updateShoppingBasket();
}

function deleteSingleItem(i) {
    if (amounts[i] == 1) {
        deleteItem(i);
    } else {
        amounts[i]--;
        updateShoppingBasket();
    }
}