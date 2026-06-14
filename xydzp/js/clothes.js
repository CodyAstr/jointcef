cef.on("show_clothes_buy", () => {
    document.getElementById("clothes").style = "display: block;";
    cef.set_focus(true);
});

cef.on("update_menu_clothes", (skinPrice, skinId) => {
    document.getElementById("skin_id").innerHTML = `Одежда №${skinId}`;
    document.getElementById("skin_price").innerHTML = `${skinPrice} руб`;    
});

cef.on("hide_clothes_menu", () => {
    close_clothes();
});

function close_clothes() {
    document.getElementById("clothes").style = "display: none;";
    cef.set_focus(false);
}

function clothes_event(ev_id) {
    cef.emit("clothes_callback", ev_id);
}