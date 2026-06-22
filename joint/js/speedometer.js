(function(){
    function $(id){ return document.getElementById(id); }
    function clampPct(v){ v = Number(v); if(isNaN(v)) v = 0; return Math.max(0, Math.min(100, v)); }

    var speedo   = $("speedo");
    var arcSpeed = $("arc-speed");
    var arcFuel  = $("arc-fuel");
    var needle   = $("needle");

    var ARCs = (210 / 360) * 2 * Math.PI * 64;
    var Cf   = 2 * Math.PI * 40;
    var MAX_KMH = 240;

    arcSpeed.style.strokeDashoffset = ARCs;
    arcFuel.style.strokeDasharray   = Cf;
    arcFuel.style.strokeDashoffset  = Cf;

    (function buildTicks(){
        var g = $("ticks-speed");
        var ns = "http://www.w3.org/2000/svg";
        for(var i = 0; i <= 12; i++){
            var t = i / 12;
            var a = (225 + t * 210) * Math.PI / 180;
            var major = (i % 3 === 0);
            var rin = major ? 67 : 69;
            var rout = major ? 77 : 74;
            var ln = document.createElementNS(ns, "line");
            ln.setAttribute("x1", (80 + Math.cos(a) * rin).toFixed(2));
            ln.setAttribute("y1", (80 + Math.sin(a) * rin).toFixed(2));
            ln.setAttribute("x2", (80 + Math.cos(a) * rout).toFixed(2));
            ln.setAttribute("y2", (80 + Math.sin(a) * rout).toFixed(2));
            ln.setAttribute("class", major ? "tk major" : "tk");
            g.appendChild(ln);
        }
    })();

    function show(){ speedo.classList.add("show"); }
    function hide(){ speedo.classList.remove("show"); }

    function setSpeed(v){
        var s = Math.max(0, Number(v) || 0);
        var pct = Math.min(1, s / MAX_KMH);
        var col = (s >= 170) ? "#cf5a52" : (s >= 100) ? "#d98b3a" : "#4f9bf5";
        arcSpeed.style.strokeDashoffset = ARCs * (1 - pct);
        arcSpeed.style.stroke = col;
        needle.style.fill = col;
        needle.setAttribute("transform", "rotate(" + (225 + pct * 210).toFixed(2) + " 80 80)");
        $("sp-speed").textContent = Math.round(s);
    }

    function setFuel(v){
        var f = clampPct(v);
        arcFuel.style.strokeDashoffset = Cf * (1 - f / 100);
        arcFuel.style.stroke = (f <= 20) ? "#cf5a52" : (f <= 40) ? "#d98b3a" : "#5bb56a";
        $("sp-fuelp").textContent = Math.round(f);
    }

    function update(d){
        if(!d) return;
        if(d.speed !== undefined) setSpeed(d.speed);
        if(d.fuel  !== undefined) setFuel(d.fuel);
        if(d.vhp !== undefined){
            var h = clampPct(d.vhp);
            $("hp-fill").style.width = h + "%";
            $("hp-val").textContent = Math.round(h);
        }
        if(d.engine !== undefined) $("ind-engine").classList.toggle("on", !!Number(d.engine));
        if(d.lights !== undefined) $("ind-lights").classList.toggle("on", !!Number(d.lights));
        if(d.left   !== undefined) $("ind-left").classList.toggle("on",  !!Number(d.left));
        if(d.right  !== undefined) $("ind-right").classList.toggle("on", !!Number(d.right));
        if(d.mileage !== undefined) $("sp-mileage").textContent = d.mileage;
    }

    function bind(name, fn){
        if(window.cef && typeof window.cef.on === "function"){ window.cef.on(name, fn); return; }
        window.addEventListener(name, function(ev){ fn(ev && ev.detail); });
    }

    bind("ShowPlayerSpeed", show);
    bind("HidePlayerSpeed", hide);
    bind("speed:update", function(raw){
        var d; try { d = (typeof raw === "object") ? raw : JSON.parse(String(raw || "{}")); } catch(e){ d = {}; }
        update(d);
    });
})();
