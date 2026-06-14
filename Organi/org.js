function showGiveRang() {
    updateList(0);
    updateColors();
    document.getElementsByTagName("li")[0].style = "color: #000; background: #fff;";
}

function showMembersOnline() {
    updateList(1);
    updateColors();
    document.getElementsByTagName("li")[1].style = "color: #000; background: #fff;";
}

function showCars() {
    updateList(2);
    updateColors();
    document.getElementsByTagName("li")[2].style = "color: #000; background: #fff;";    
}

function showInvite() {
    updateList(3);
    updateColors();
    document.getElementsByTagName("li")[3].style = "color: #000; background: #fff;";    
}

function playerInfo() {
    updateList(4);
    updateColors();
    document.getElementsByTagName("li")[4].style = "color: #000; background: #fff;";    
}

function fracclose() {
    document.getElementById("fractionMenu").style = "display: none;";
    cef.set_focus(false);
}

function removeFracMember() {
    let test = document.querySelectorAll('.memberItemOnl'); 
    test.forEach( e => e.remove() );
}

function updateList(listId) {
    document.getElementById("mainList").style = "display: none;";
    document.getElementById("membersListOnline").style = "display: none;";
    document.getElementById("wageList").style = "display: none;";
    document.getElementById("carList").style = "display: none;";
    document.getElementById("geoList").style = "display: none;";

    document.getElementById("idWarn").value = '';
    document.getElementById("warnReason").value = '';

    removeFracMember();

    switch(listId) {
        case 0: { document.getElementById("mainList").style = "display: block;"; break; }
        case 1: { document.getElementById("membersListOnline").style = "display: block;"; cef.emit("cef_get_org_onl"); break; }
        case 2: { document.getElementById("carList").style = "display: block;"; break; }    
        case 3: { document.getElementById("wageList").style = "display: block;"; break; }
        case 4: { document.getElementById("geoList").style = "display: block;"; break; }
    }
}

function updateColors() {
    document.getElementsByTagName("li")[0].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[1].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[2].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[3].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[4].style = "color: #fff; background: #ffffff15;";
}

cef.on("cef_show_org", (fractionName) => {
    document.getElementById("fractionMenu").style = "display: block;";
    document.getElementById("fracName").innerHTML = `${fractionName}`;

    showGiveRang();

    cef.set_focus(true);
});   

cef.on("cef_show_pl_info", (text) => {
        var frame_b = document.getElementById("geoList");

        let div = document.createElement('div');
        div.className = "memberItemOnl";
        div.id = "memberItemOnl";
        div.style = "width: 81.5%;";
        frame_b.append(div);

        let online = document.createElement('span');
        online.className = "memberItemList";
        online.innerHTML = `${text}`;
        div.append(online);
});

cef.on("cef_show_org_onl", (stateOnline, plName, plRang, plPost) => {
    var frame_b = document.getElementById("membersListOnline");

        let div = document.createElement('div');
        div.className = "memberItemOnl";
        div.id = "memberItemOnl";
        frame_b.append(div);

        let online = document.createElement('span');
        online.className = "memberItemList";
        online.innerHTML = `${stateOnline}`;
        div.append(online);

        let pl_name = document.createElement('span');
        pl_name.className = "memberItemList";
        pl_name.innerHTML = `${plName}`;
        div.append(pl_name);

        let pl_rang = document.createElement('span');
        pl_rang.className = "memberItemList";
        pl_rang.innerHTML = `${plPost} [${plRang}]`;
        div.append(pl_rang);
})

function givePost() {
    let warnId = document.getElementById("idWarn").value;
    let warnReason = document.getElementById("warnReason").value;

    if(warnId === '') return;
    if(warnReason === '') return;

    cef.emit("cef_edit_org", 1, warnId, warnReason);
}

function giveRang() {
    let warnId = document.getElementById("idWarn").value;
    let warnReason = document.getElementById("warnReason").value;

    if(warnId === '') return;
    if(warnReason === '') return;

    cef.emit("cef_edit_org", 2, warnId, warnReason);
}

function invite() {
    let plId = document.getElementById("uvalId").value;

    if(plId == '') return;
    
    cef.emit("cef_org_invite", 1, plId);    
}

function uninvite() {
    let plId = document.getElementById("uvalId").value;

    if(plId == '') return;
    
    cef.emit("cef_org_invite", 2, plId);    
}

function searchInfo() {
    let plId = document.getElementById("searchId").value;

    removeFracMember();

    if(plId == '') return;
    
    cef.emit("cef_get_info_org", plId);    
}
