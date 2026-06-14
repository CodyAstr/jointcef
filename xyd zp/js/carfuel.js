var prices = [47, 49, 52, 48];
var select_fuel_id = 0, litres_value = 0;
var car_fuel = 0;
var player_money = 0;

function buyFuel() {
    if(player_money < prices[ select_fuel_id ] * litres_value) {
        document.getElementById("fuelBuy").style = "background: #f04245dd";
        document.getElementById("fuelBuy").innerHTML = "Недостаточно средств";

        setTimeout(resetError, 6000);
        
        return ;
    }
    cef.set_focus(false);
    document.getElementById("fuelBlock").style = "display: none;";

    cef.emit("car_fuel_buy", prices[ select_fuel_id ] * litres_value, litres_value, select_fuel_id);
    return ;
}

function resetError() {
    document.getElementById("fuelBuy").style = "background: #97c965dd";
    document.getElementById("fuelBuy").innerHTML = "Подтвердить"; 
}

document.getElementById("volume").onchange = function() {
    var fuel = document.getElementById("volume").value;
    var fprice = prices[ select_fuel_id ] * fuel;
    litres_value = fuel;
    document.getElementById("litres").innerHTML = `${fuel} литров`;
    document.getElementById("fuel_price").innerHTML = `${fprice} руб.`;

    if(fuel > 35) {
        document.getElementById("volume").value = car_fuel;
        litres_value = car_fuel;
        fprice = prices[ select_fuel_id ] * car_fuel;
        document.getElementById("litres").innerHTML = `${car_fuel} литров`;
        document.getElementById("fuel_price").innerHTML = `${fprice} руб.`;        
        return 1;
    }    
}

function select_fuel(fuel_id) {
    select_fuel_id = fuel_id;

    for(var i = 0; i < 4; i++) {
        if(i == fuel_id) {
            document.getElementById(`fuel_${fuel_id}`).className = "fuelType active_fuel";
            continue;
        }
        document.getElementById(`fuel_${i}`).className = "fuelType";
    }
    var fprice = prices[ select_fuel_id ] * litres_value;
    document.getElementById("fuel_price").innerHTML = `${fprice} руб.`;    
}

cef.on("show_fuel_panel", (playerMoney, currentFuel, price_1, price_2, price_3, price_4) => {
    document.getElementById("fuelBlock").style = "display: block;";
    cef.set_focus(true);

    player_money = playerMoney;
    car_fuel = currentFuel;

    prices = [price_1, price_2, price_3, price_4];
    document.getElementById("max_fuel").innerHTML = `Количество литров (${100 - currentFuel} л.)`;
});

function closeFuel() {
    cef.set_focus(false);
    document.getElementById("fuelBlock").style = "display: none;";
}