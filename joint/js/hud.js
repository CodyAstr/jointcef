(function(){
    function $(id){ return document.getElementById(id); }
    function fmtMoney(n){ return String(Math.max(0, Math.floor(Number(n)||0))).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
    function clamp(v){ v=Number(v); if(isNaN(v)) v=0; return Math.max(0, Math.min(100, v)); }

    var state = { name:"Igor Orlov", id:67, hp:100, armor:100, food:100, money:49198, liveClock:true };

    function applyBars(){
        $("fill-health").style.width = clamp(state.hp)+"%";
        $("fill-armor").style.width  = clamp(state.armor)+"%";
        $("fill-food").style.width   = clamp(state.food)+"%";
        $("hud-health").textContent = Math.round(clamp(state.hp));
        $("hud-armor").textContent  = Math.round(clamp(state.armor));
        $("hud-food").textContent   = Math.round(clamp(state.food));
    }
    function applyTop(){
        $("hud-name").textContent = state.name;
        $("hud-id").textContent = state.id;
        $("hud-money").textContent = fmtMoney(state.money);
    }
    function tickClock(){
        if(!state.liveClock) return;
        var d = new Date();
        function p(n){ return String(n).padStart(2,"0"); }
        $("hud-time").textContent = p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
        $("hud-date").textContent = p(d.getDate())+"."+p(d.getMonth()+1)+"."+String(d.getFullYear()).slice(2);
    }

    window.HUD = {
        set: function(d){
            if(!d) return;
            if(d.name   !== undefined) state.name  = d.name;
            if(d.id     !== undefined) state.id    = d.id;
            if(d.hp     !== undefined) state.hp    = d.hp;
            if(d.armor  !== undefined) state.armor = d.armor;
            if(d.food   !== undefined) state.food  = d.food;
            if(d.money  !== undefined) state.money = d.money;
            applyTop(); applyBars();
        },
        setTime: function(time, date){
            state.liveClock = false;
            if(time !== undefined) $("hud-time").textContent = time;
            if(date !== undefined) $("hud-date").textContent = date;
        },
        useLiveClock: function(on){ state.liveClock = !!on; if(on) tickClock(); }
    };

    try {
        function bind(name, fn){
            if(window.cef && typeof window.cef.on === "function"){ window.cef.on(name, fn); return; }
            window.addEventListener(name, function(ev){ fn(ev && ev.detail); });
        }
        bind("hud:update", function(raw){
            var d; try { d = (typeof raw === "object") ? raw : JSON.parse(String(raw||"{}")); } catch(e){ d = {}; }
            window.HUD.set(d);
            if(d.time !== undefined || d.date !== undefined) window.HUD.setTime(d.time, d.date);
        });
    } catch(e){}

    applyTop(); applyBars(); tickClock();
    setInterval(tickClock, 1000);
})();
