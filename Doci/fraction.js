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
    updateList(3);
    updateColors();
    document.getElementsByTagName("li")[2].style = "color: #000; background: #fff;";    
}

function showInvite() {
    updateList(4);
    updateColors();
    document.getElementsByTagName("li")[3].style = "color: #000; background: #fff;";    
}

function showBlacklist() {
    updateList(5);
    updateColors();
    document.getElementsByTagName("li")[4].style = "color: #000; background: #fff;";    
}

function playerInfo() {
    updateList(6);
    updateColors();
    document.getElementsByTagName("li")[5].style = "color: #000; background: #fff;";    
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
    document.getElementById("settingList").style = "display: none;";
    document.getElementById("wageList").style = "display: none;";
    document.getElementById("carList").style = "display: none;";
    document.getElementById("warnList").style = "display: none;";
    document.getElementById("geoList").style = "display: none;";

    document.getElementById("idWarn").value = '';
    document.getElementById("warnReason").value = '';

    document.getElementById("plId").value = '';

    removeFracMember();

    switch(listId) {
        case 0: { document.getElementById("mainList").style = "display: block;"; break; }
        case 1: { document.getElementById("membersListOnline").style = "display: block;"; cef.emit("cef_get_onl"); break; }
        case 2: { document.getElementById("settingList").style = "display: block;"; break; }
        case 3: { document.getElementById("carList").style = "display: block;"; break; }    
        case 4: { document.getElementById("wageList").style = "display: block;"; break; }
        case 5: { document.getElementById("warnList").style = "display: block;"; break; }
        case 6: { document.getElementById("geoList").style = "display: block;"; break; }
    }
}

function updateColors() {
    document.getElementsByTagName("li")[0].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[1].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[2].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[3].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[4].style = "color: #fff; background: #ffffff15;";
    document.getElementsByTagName("li")[5].style = "color: #fff; background: #ffffff15;";
}

cef.on("cef_show_fraction", (fractionName) => {
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

cef.on("cef_show_onl", (stateOnline, plName, plRang, plPost, plNameRang) => {
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
        pl_rang.innerHTML = `${plPost}`;
        div.append(pl_rang);

        let last_login = document.createElement('span');
        last_login.className = "memberItemList";
        last_login.innerHTML = `${plNameRang} [${plRang}]`;
        div.append(last_login);    
})

function givePost() {
    let warnId = document.getElementById("idWarn").value;
    let warnReason = document.getElementById("warnReason").value;

    if(warnId == '') return;
    if(warnReason == '') return;

    cef.emit("cef_edit_member", 1, warnId, warnReason);
}

function giveNameRang() {
    let warnId = document.getElementById("idWarn").value;
    let warnReason = document.getElementById("warnReason").value;

    if(warnId == '') return;
    if(warnReason == '') return;

    cef.emit("cef_edit_member", 2, warnId, warnReason);
}

function giveRang() {
    let warnId = document.getElementById("idWarn").value;
    let warnReason = document.getElementById("warnReason").value;

    if(warnId == '') return;
    if(warnReason == '') return;

    cef.emit("cef_edit_member", 3, warnId, warnReason);
}

function addBlackList() {
    let plId = document.getElementById("plId").value;

    if(plId == '') return;
    
    cef.emit("cef_blacklist", 1, plId);
}

function removeBlackList() {
    let plId = document.getElementById("plId").value;

    if(plId == '') return;
    
    cef.emit("cef_blacklist", 2, plId);
}

function invite() {
    let plId = document.getElementById("uvalId").value;

    if(plId == '') return;
    
    cef.emit("cef_invite", 1, plId);    
}

function uninvite() {
    let plId = document.getElementById("uvalId").value;

    if(plId == '') return;
    
    cef.emit("cef_invite", 2, plId);    
}

function searchInfo() {
    let plId = document.getElementById("searchId").value;

    removeFracMember();

    if(plId == '') return;
    
    cef.emit("cef_get_info", plId);    
}
