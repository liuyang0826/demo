<script>
(function (config) {
  var ba = navigator.userAgent.toLowerCase(), da = window, ga = document, ha = ga.documentElement;

  function ja (a) {return -1 !== ba.indexOf(a);}

  var pa = /([a-z0-9]*\d+[a-z0-9]*)/;

  function qa () {
    var a = ra;
    if (!a) return null;
    var a = a.toLowerCase(), b = null;
    if (b = a.match(/angle \((.*)\)/)) a = b[1], a = a.replace(/\s*direct3d.*$/, "");
    a = a.replace(/\s*\([^\)]*wddm[^\)]*\)/, "");
    if (0 <= a.indexOf("intel")) {
      b = [ "Intel" ];
      0 <= a.indexOf("mobile") && b.push("Mobile");
      (0 <= a.indexOf("gma") || 0 <= a.indexOf("graphics media accelerator")) && b.push("GMA");
      if (0 <= a.indexOf("haswell")) {
        b.push("Haswell");
      } else if (0 <= a.indexOf("ivy")) {
        b.push("HD 4000");
      } else if (0 <= a.indexOf("sandy")) {
        b.push("HD 3000");
      } else if (0 <= a.indexOf("ironlake")) {
        b.push("HD");
      } else {
        0 <= a.indexOf("hd") && b.push("HD");
        var c = a.match(pa);
        c && b.push(c[1].toUpperCase());
      }
      return b = b.join(" ");
    }
    return 0 <= a.indexOf("nvidia") || 0 <= a.indexOf("quadro") || 0 <= a.indexOf("geforce") || 0 <= a.indexOf("nvs")
    ? (b =
    [ "nVidia" ], 0 <= a.indexOf("geforce") && b.push("geForce"), 0 <= a.indexOf("quadro") && b.push("Quadro"), 0 <= a.indexOf("nvs") && b.push("NVS"), a.match(/\bion\b/) && b.push("ION"), a.match(/gtx\b/)
    ? b.push("GTX")
    : a.match(/gts\b/) ? b.push("GTS") : a.match(/gt\b/) ? b.push("GT") : a.match(/gs\b/)
    ? b.push("GS")
    : a.match(/ge\b/) ?
    b.push("GE") : a.match(/fx\b/) && b.push("FX"), (c = a.match(pa)) && b.push(c[1].toUpperCase()
    .replace("GS", "")), 0 <= a.indexOf("titan") ? b.push("TITAN") : 0 <= a.indexOf("ti") && b.push("Ti"), b =
    b.join(" "))
    : 0 <= a.indexOf("amd") || 0 <= a.indexOf("ati") || 0 <= a.indexOf("radeon") || 0 <= a.indexOf("firegl") || 0 <= a.indexOf("firepro")
    ? (b = [ "AMD" ], 0 <= a.indexOf("mobil") && b.push("Mobility"), c =
    a.indexOf("radeon"), 0 <= c && b.push("Radeon"), 0 <= a.indexOf("firepro")
    ? b.push("FirePro")
    : 0 <= a.indexOf("firegl") && b.push("FireGL"), 0 <= a.indexOf("hd") &&
    b.push("HD"), 0 <= c && (a = a.substring(c)), (c = a.match(pa)) && b.push(c[1].toUpperCase().replace("HD", "")), b =
    b.join(" "))
    : a.substring(0, 100);
  }

  var sa = "microsoft basic render driver;vmware svga 3d;Intel 965GM;Intel B43;Intel G41;Intel G45;Intel G965;Intel GMA 3600;Intel Mobile 4;Intel Mobile 45;Intel Mobile 965".split(";"),
  ua = "ActiveXObject" in da,
  xa = "devicePixelRatio" in da && 1 < da.devicePixelRatio || ua && "matchMedia" in da && da.matchMedia("(min-resolution:144dpi)") && da.matchMedia("(min-resolution:144dpi)").matches,
  ya = ja("windows nt"),
  Aa = -1 !== ba.search(/windows nt [1-5]\./),
  Ba = -1 !== ba.search(/windows nt 5\.[12]/),
  Ca = Aa && !Ba;
  ja("windows nt 10");
  var Da = ja("windows phone"),
  Fa = ja("macintosh"),
  Ga = ja("Mb2345Browser"),
  Ha = ja("ipad;") || ja("ipad "),
  Ia = Ha && xa,
  Ja = ja("ipod touch;"),
  Ma = ja("iphone;") || ja("iphone "),
  Na = Ma || Ha || Ja,
  Oa = Na && -1 !== ba.search(/ os [456]_/);
  Na && ba.search(/ os [4-8]_/);
  Na && ba.search(/ os [78]_/);
  Na && ja("os 8_");
  var Pa = Na && ja("os 10_"), Ra = ja("android"), Sa = -1 !== ba.search(/android [123]/);
  ja("android 4");
  Ra && -1 === ba.search(/android [1-4]/) || ba.search(/android 4.4/);
  var Ua = Ra ? "android" : Na ? "ios" : ya ? "windows" : Fa ? "mac" : "other",
  Va = ua && !da.XMLHttpRequest,
  Wa = ua && !ga.querySelector,
  Xa = ua && !ga.addEventListener,
  Ya = ua && ja("msie 9"),
  Za = ua && ja("msie 10"),
  $a = ua && ja("rv:11"),
  ab = Xa || Ya,
  bb = ja("edge"),
  cb = ja("qtweb"),
  db = ja("ucbrowser"),
  eb = ja("alipay") || Ra && db,
  fb = ja("miuibrowser"),
  gb = ja("micromessenger"),
  hb = ja("mqqbrowser"),
  ib = ja("baidubrowser"),
  chrome = (ja("chrome") || ja("crios")) && !gb && !ib && !hb && !bb && !fb,
  jb = chrome && ja("chromium"),
  kb = chrome && !jb && 30 < parseInt(ba.split("chrome/")[1]),
  lb = ja("firefox"),
  mb = lb && 27 < parseInt(ba.split("firefox/")[1]),
  nb = (Fa || Na) && ja("safari") && ja("version/"),
  ob = Fa && nb && 7 < parseInt(ba.split("version/")[1]),
  pb = Na && ja("aliapp"),
  qb = Na && (!hb && !db && !gb && !chrome && !lb && !nb || pb && !db),
  rb = Ra || Na || Da || ja("mobile"),
  sb = da.navigator && da.navigator.msPointerEnabled && !!da.navigator.msMaxTouchPoints,
  tb = da.navigator && da.navigator.pointerEnabled && !!da.navigator.maxTouchPoints,
  ub = tb || sb,
  vb = "ontouchstart" in ga || ub,
  wb = function () {
    if (!rb) return da.devicePixelRatio || 1;
    var a = document.getElementsByTagName("meta");
    if (window.parent && window.parent !== window) {
      try {
        if (window.parent.location.origin === window.location.origin) {
          a =
          window.parent.document.getElementsByTagName("meta");
        } else {
          return 1;
        }
      } catch (b) {return 1;}
    }
    for (var c = a.length - 1; 0 <= c; c -= 1) {
      if ("viewport" === a[c].name) {
        var c = a[c].content, d;
        -1 !== c.indexOf("initial-scale") && (d = parseFloat(c.split("initial-scale=")[1]));
        a = -1 !== c.indexOf("minimum-scale") ? parseFloat(c.split("minimum-scale=")[1]) : 0;
        c = -1 !== c.indexOf("maximum-scale") ? parseFloat(c.split("maximum-scale=")[1]) : Infinity;
        if (d) {if (c >= a) return d > c ? c : d < a ? a : d;} else if (c >= a) return 1 <= a ? 1 : Math.min(c, 1);
        console && console.log && console.log("viewport\u53c2\u6570\u4e0d\u5408\u6cd5");
        return null;
      }
    }
  }(),
  xb = xa && (!rb || !!wb && 1 <= wb),
  yb = ua && "transition" in ha.style,
  zb = !!ga.createElementNS && !!ga.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
  Ab = ga.createElement("canvas"),
  Bb = !(!Ab || !Ab.getContext),
  Cb = window.URL || window.webkitURL,
  Db = !ua && !bb && !(db && Ra) && window.Worker && Cb && Cb.createObjectURL && window.Blob,
  Eb = "",
  ra = "",
  Fb = 0,
  Gb = window.forceWebGL ? { alpha: !0, antialias: !0, depth: !0 } : {
    alpha: !0,
    antialias: !0,
    depth: !0,
    failIfMajorPerformanceCaveat: !0,
    preserveDrawingBuffer: !0,
    stencil: !0
  },
  Hb = function () {
    if (!window.forceWebGL && (!Bb || !Db || qb && pb && !db)) return !1;
    for (var a = [ "webgl", "experimental-webgl", "moz-webgl" ], b = null, c = 0; c < a.length; c += 1) {
      try {b = Ab.getContext(a[c], Gb);} catch (d) {}
      if (b) {
        if (b.drawingBufferWidth !== Ab.width || b.drawingBufferHeight !== Ab.height) break;
        if (window.forceWebGL) return Eb = a[c], Fb = Infinity, !0;
        if (!b.getShaderPrecisionFormat ||
        !b.getParameter || !b.getExtension) {
          break;
        }
        Fb = b.getParameter(b.MAX_RENDERBUFFER_SIZE);
        var e = b.getParameter(b.MAX_VIEWPORT_DIMS);
        if (!e) break;
        Fb = Math.min(Fb, e[0], e[1]);
        nb && "mac" === Ua && (Fb = Math.min(Fb, 4096));
        e = Math.max(screen.width, screen.height);
        xb && (e *= Math.min(2, window.devicePixelRatio || 1));
        if (e > Fb) break;
        if (23 > b.getShaderPrecisionFormat(35632, 36338).precision || 23 > b.getShaderPrecisionFormat(35633, 36338).precision) break;
        ra = b.getExtension("WEBGL_debug_renderer_info") ? b.getParameter(37446) : null;
        if ((b = qa()) &&
        -1 !== sa.indexOf(b)) {
          break;
        }
        Eb = a[c];
        return !0;
      }
    }
    return !1;
  }(),
  Ib = Hb && (kb || mb || ob) && ("mac" === Ua || "windows" === Ua) && !rb,
  Jb = !Bb || cb || Da || rb && lb || Ya || Oa || Ia || Ja || Sa || ja("gt-n710") || Ca,
  Kb = !Jb && !Ib,
  Lb = Ib ? "vw" : Jb ? "d" : Kb ? "dv" : "v",
  Mb = ja("webkit"),
  Nb = "WebKitCSSMatrix" in da && "m11" in new window.WebKitCSSMatrix,
  Qb = "MozPerspective" in ha.style,
  Rb = "OTransition" in ha.style,
  Sb = yb || Nb || Qb || Rb,
  Tb = void 0 !== config[8] ? config[8] : !0,
  Ub = void 0 !== config[9] ? config[9] : !0,
  Vb = void 0 !== config[10] ? config[10] : !0,
  Wb = void 0 !== config[11] ? config[11] :
  !0,
  Xb = void 0 !== config[12] ? config[12] : null,
  Yb = !zb && rb && Bb,
  Zb = !0;
  try {
    if ("undefined" === typeof da.localStorage) {
      Zb = !1;
    } else {
      var $b = (new Date).getTime() + "";
      da.localStorage.setItem("_test", $b);
      da.localStorage.getItem("_test") !== $b && (Zb = !1);
      da.localStorage.removeItem("_test");
    }
  } catch (ac) {Zb = !1;}
  var bc = parseInt(ba.split("chrome/")[1]), cc = Tb && Bb;
  config.l = {
    Dia: Ha,
    Eia: Ma,
    size: Ma ? 100 : Ra ? 200 : 500,
    EA: Fa,
    Npa: ya,
    HF: Na,
    Hta: Pa,
    Dk: Ra,
    bea: Sa,
    CY: eb,
    nt: Ua,
    jE: ib,
    dma: hb,
    PG: nb,
    K3: gb,
    wq: ua,
    Gh: Va,
    xq: Wa,
    MZ: Ya,
    LZ: Za,
    ee: Xa,
    OZ: ab,
    Hia: $a,
    Lga: bb,
    Kia: ua && !$a,
    hka: Ga,
    Fq: Zb,
    Ph: cc && Zb && Wb && !rb && chrome,
    lf: Xb,
    geolocation: rb || ua && !Xa || bb,
    epa: db,
    rH: db && !chrome,
    chrome: chrome,
    RE: xa && chrome,
    rM: lb,
    Y: rb,
    qka: rb && Mb,
    b0: rb && Nb,
    pka: rb && da.opera,
    nd: xa,
    zH: wb,
    ma: xb,
    hf: vb,
    d0: sb,
    GO: tb,
    X0: ub,
    bfa: chrome && 57 <= bc,
    cfa: !rb && chrome && 64 <= bc,
    I3: Mb,
    Iia: yb,
    J3: Nb,
    oha: Qb,
    fla: Rb,
    hE: Sb,
    gn: zb,
    Vk: Bb,
    ct: Db,
    px: Vb,
    cf: Ib,
    F3: Eb,
    G3: Gb,
    fN: ra,
    fka: Fb,
    iqa: !1,
    iM: Tb,
    uE: Tb && !Jb,
    sea: Tb ? Lb : "d",
    sX: Tb ? Hb : !1,
    bH: cc,
    ap: Tb && Hb,
    Nta: Tb && (!Jb || Hb),
    hn: Ub && !!da.WebSocket && !ib,
    wua: Yb,
    nla: Bb || Yb ? "c" : "d"
  };
  var dc = config;
  config = void 0;
  var ec = {
    overlay: [ "style" ],
    "AMap.IndoorMap": [ "AMap.CustomLayer", "cvector" ],
    "AMap.IndoorMap3D": [ "Map3D" ],
    "AMap.MarkerList": [ "AMap.TplUtils" ],
    Map3D: [ "vectorlayer", "wgl", "AMap.CustomLayer" ],
    "AMap.Heatmap": [ "AMap.CustomLayer" ],
    "AMap.DistrictLayer": [ "MVT" ],
    "AMap.GltfLoader": [ "AMap.CustomLayer", "Map3D" ]
  };
  window.AMap ? (window.AMap.version = "1543554788938", window.AMap.uH = { nI: function (a) {a(dc);} }) : window.AMap =
  { version: "1543554788938", uH: { nI: function (a) {a(dc);} } };
  dc.Ci = "1543554788938";
  dc.As = ec;
  dc.bG = "raster";
  for (var fc = document.head || document.getElementsByTagName("head")[0], gc = ".vml{behavior:url(#default#VML);display:inline-block;position:absolute}.amap-custom{top:0;left:0;position:absolute}.amap-container img{max-width:none!important;max-height:none!important}.amap-container{touch-action:none;position:relative;overflow:hidden;background:#fcf9f2 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0AgMAAAC2uDcZAAAADFBMVEX////////////////1pQ5zAAAABHRSTlMAgP/AWuZC2AAAAVhJREFUeAFiYGAQYGDEQjAB2rcDC4BiGIqiU7abdKlO2QkeIClyPsDHweMKtOPHIJ1Op6/w7Y4fdqfT6VpndzqdrnV2p9PpWmd3Oj3qWndSoKp+2J1Op7vr7E6n07XO7nQ6XevsTqfTtc7udPo4/f787E6n0911dqfT6VpndzqdrnV2p9PpWmd3Ot27Ce8m6HS6u85dR6fTtU7r6HS61mkdnU7XOrvT6XTvJuxOp9PddXan0+laZ3c6na51dDpd67SOTqd7N+HdBJ1Od9e56+h0utZpHZ1O1zq70+l0rbM7nU73bsLudDrdXWd3Ol3rtI5Op2ud1tHpdK3TOjqd7t2EdxN0Ot1dZ3c6na51dqfT6VpndzqdrnV2p9Pp3k3Q6XR3nbuOTqdrndbR6XSt0zo6na51Wken072bsDudTnfX2Z1Op2ud3el0utbZnU7XOq2j0+t0uncTD1gO4zoT5doZAAAAAElFTkSuQmCC);-ms-touch-action:none}.amap-drags,.amap-layers{width:100%;height:100%;position:absolute;overflow:hidden}.amap-layer img{pointer-events:none}.amap-e,.amap-maps{width:100%;height:100%}.amap-maps,.amap-e,.amap-layers,.amap-tile,.amap-tile-container{position:absolute;left:0;top:0;overflow:hidden}.amap-context{position:absolute;left:0;top:0}.amap-overlays,.amap-markers,.amap-marker{position:absolute;left:0;top:0}.amap-layers{z-index:0}.amap-overlays{z-index:110;cursor:default}.amap-markers{z-index:120}.amap-controls{z-index:150}.amap-copyright{position:absolute;display:block!important;left:77px;height:16px;bottom:0;padding-bottom:3px;font-size:11px;font-family:Arial,sans-serif;z-index:160}.amap-logo{position:absolute;bottom:1px;left:1px;z-index:160;height:20px}.amap-logo img{width:73px!important;height:20px!important;border:0;vertical-align:baseline!important}.amap-icon{position:relative;z-index:1;overflow:hidden}.amap-icon img{position:absolute;z-index:-1}.amap-marker-label{position:absolute;z-index:2;border:1px solid blue;background-color:white;white-space:nowrap;cursor:default;padding:3px;font-size:12px;line-height:14px}.amap-info{position:absolute;left:0;z-index:140;width:320px}.amap-menu{position:absolute;z-index:140;_width:100px}.amap-info-close{position:absolute;right:5px;_right:12px;+right:11px;top:5px;_top:2px;+top:2px;color:#c3c3c3;text-decoration:none;font:bold 16px/14px Tahoma,Verdana,sans-serif;width:14px;height:14px}.amap-info-outer,.amap-menu-outer{box-shadow:0 3px 14px rgba(0,0,100,0.6);background:none repeat scroll 0 0 white;border-radius:2px;padding:1px;text-align:left;border:#c0c0c0 solid 1px}.amap-info-outer:hover,.amap-menu-outer:hover{box-shadow:0 3px 14px rgba(0,0,0,0.75)}.amap-info-content{background:#fff;border:1px solid #ccc;padding:10px 18px 10px 10px;+margin:0 10px;+padding:10px 0;line-height:1.4;overflow:auto}.amap-marker-content{position:relative}.amap-info{_width:320px}.amap-menu{_width:100px}.amap-info-sharp{height:23px;margin:0 auto;overflow:hidden;position:relative;top:-1px;width:30px;background-image:url(../../theme/v1.3/sharp.png);_background-image:url(../../theme/v1.3/sharp.gif)}.amap-menu-outer{margin:0;padding:0;list-style-type:none}ul.amap-menu-outer li{cursor:pointer;height:35px;line-height:35px;word-break:break-all;padding:0 10px;font-size:12px;white-space:nowrap}ul.amap-menu-outer li a{text-decoration:none;font-size:13px;margin:0 5px;color:#000;padding:5px 5px}ul.amap-menu-outer li:hover{background-color:#f3f3ee}.amap-overlay-text-container{display:block;width:auto;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;padding:2px 3px;border:1px solid #ccc;border-radius:3px}.amap-overlay-text-container.amap-overlay-text-empty{display:none}".replace(/url\((['"]?)(?:\.\.\/)+/g, "url($1" +
  dc[2].split(",")[0] + "/"), hc = null, ic = 0, jc = fc.childNodes.length; ic < jc; ic++) {
    if (1 === fc.childNodes[ic].nodeType) {
      hc =
      fc.childNodes[ic];
      break;
    }
  }
  if (gc) {
    if (fc) {
      var kc = document.createElement("style");
      kc.setAttribute("type", "text/css");
      kc.setAttribute("class", "AMap.style");
      kc.styleSheet ? kc.styleSheet.cssText = gc : kc.innerHTML = gc;
      hc ? fc.insertBefore(kc, hc) : fc.appendChild(kc);
    } else {
      document.write("<style type='text/css'>" + gc + "</style>");
    }
  }
  var g = g || { Ba: { ge: 0, lp: [], zi: {} } }, z = { q: {}, control: {}, A: {} };
  g.Dsa = function (a) {
    var b = Function;
    return function () {return (new b("return " + a))();};
  }();
  g.CLASS_NAME = "AMap";
  g.c = g.BuryPoint = {};
  g.c.add =
  g.BuryPoint.add =
  function (a, b, c) {a.ZZ || a.B || !(a = a.CLASS_NAME) || (a = a.replace("AMap.", ""), g.Fx.vn(a, b, c));};
  var lc = { lang: 1, baseRender: 1, overlayRender: 1, viewMode: 1 };
  g.c.ra =
  g.BuryPoint.addOptions =
  function (a, b) {
    if (!a.hla) {
      if (b && (b.innerLayer || b.innerOverlay)) {
        a.ZZ = !0;
      } else {
        a.hla = !0;
        var c = a.CLASS_NAME;
        if (c) {
          c = c.replace("AMap.", "");
          g.Fx.vn(c);
          b = b || {};
          for (var d in b) b.hasOwnProperty(d) && ("Map" === c && d in lc ? g.Fx.vn(c, d, b[d]) : g.Fx.vn(c, d));
        }
      }
    }
  };
  g.Z = function () {};
  g.Z.extend = g.Z.extend = function (a) {
    function b () {}

    function c () {
      var a = this.initialize || this.r;
      a && a.apply(this, arguments);
      if (!d && this.Nh) {
        a = document.createElement("style");
        a.setAttribute("type", "text/css");
        this.CLASS_NAME && a.setAttribute("class", this.CLASS_NAME);
        this.Nh = this.Nh.replace(/url\((['"]?)(?:\.\.\/)*/g, "url($1" + g.w.Db + "/");
        a.styleSheet ? a.styleSheet.cssText = this.Nh : a.innerHTML = this.Nh;
        for (var b = document.head || document.getElementsByTagName("head")[0], c = null, e = 0, f = b.childNodes.length; e < f; e++) {
          if (1 ===
          b.childNodes[e].nodeType) {
            c = b.childNodes[e];
            break;
          }
        }
        c ? b.insertBefore(a, c) : b.appendChild(a);
      }
      d = !0;
    }

    var d = !1;
    b.prototype = this.prototype;
    var e = new b;
    e.constructor = c;
    c.prototype = e;
    c.prototype.Oh = c.prototype["super"] = function (a) {return a.callee.oa.apply(this, a);};
    for (var f in this) this.hasOwnProperty(f) && "prototype" !== f && (c[f] = this[f]);
    a.z2 && (g.extend(c, a.z2), a.z2 = null);
    a.ga && (g.extend.apply(null, [ e ].concat(a.ga)), a.ga = null);
    a.C && e.C && (a.C = g.extend({}, e.C, a.C));
    var h = e.constructor.Zia, k = {};
    if (void 0 !== h) {
      for (f in h) {
        h.hasOwnProperty(f) &&
        (k[h[f]] = f);
      }
    }
    for (f in a) {
      if (Object.prototype.hasOwnProperty.call(a, f)) {
        var l = f, m = f;
        h && k[f] && (m = k[f]);
        "function" === typeof a[l] && "function" === typeof e[m] && (a[l].oa = e[m]);
      }
    }
    g.extend(e, a);
    a.toString && (e.toString = a.toString);
    c.Lc = this.prototype;
    return c;
  };
  g.Z.wb = g.Z.include = function (a) {g.extend(this.prototype, a);};
  g.extend = function (a) {
    var b = Array.prototype.slice.call(arguments, 1), c, d, e, f;
    d = 0;
    for (e = b.length; d < e; d += 1) {
      if (f =
      b[d] || {}, Object.assign) {
        Object.assign(a, f);
      } else {
        for (c in f) {
          Object.prototype.hasOwnProperty.call(f, c) && (a[c] =
          f[c]);
        }
      }
    }
    return a;
  };
  g.Z.Dg = function (a) {
    for (var b in a) {
      if (a.hasOwnProperty(b)) {
        var c = a[b];
        if ("string" === typeof c) {
          this.prototype[b] && (this.prototype[c] =
          this.prototype[b]);
        } else {
          for (var d = 0, e = c.length; d < e; d++) {
            this.prototype[b] && (this.prototype[c[d]] =
            this.prototype[b]);
          }
        }
      }
    }
  };
  g.Fx = {
    zi: {}, getKey: function (a, b) {
      a = a || "";
      return void 0 !== b && a ? a + "@" + b : a;
    }, vn: function (a, b, c) {
      this.zi[a] || (this.zi[a] = {});
      b = this.getKey(b, c);
      void 0 == this.zi[a][b] && (this.zi[a][b] = 0);
    }, send: function () {
      var a = [], b;
      for (b in this.zi) {
        if (this.zi.hasOwnProperty(b)) {
          var c = this.zi[b], d = [], e;
          for (e in c) c.hasOwnProperty(e) && 0 == c[e] && (d.push(e), c[e] = 1);
          d.length && a.push(b + "~" + d.join(","));
        }
      }
      a.length && (a =
      [
        "type=nfl",
        "k=" + g.w.key,
        "m=" + (g.l.Y ? 1 : 0),
        "pf=" + g.l.nt,
        "v=" + g.w.Op,
        "branch=JSAPI",
        "log=" + a.join("!")
      ], a = g.w.Sb + "://webapi.amap.com/count?" +
      a.join("&"), new g.bb.qb(a));
    }
  };
  setInterval(function () {g.Fx.send();}, 1E4);
  g.na = {
    h: function (a, b, c, d, e) {
      if (this.Vd(a, b, c || this)) return this;
      var f = this.Ke = this.Ke || {};
      f[a] = f[a] || [];
      e ? f[a].unshift({ rb: b, Ze: c || this, bj: d }) : f[a].push({ rb: b, Ze: c || this, bj: d });
      "complete" === a && this.sa && this.o(a);
      return this;
    }, Vd: function (a, b, c) {
      var d = this.Ke;
      if (b && c) {
        if (d && a in d && d[a]) {
          for (var e = 0; e < d[a].length; e +=
          1) {
            if (d[a][e].rb === b && d[a][e].Ze === c) return !0;
          }
        }
        return !1;
      }
      return d && a in d && d[a] && 0 < d[a].length;
    }, I: function (a, b, c) {
      if (!this.Vd(a)) return this;
      var d = this.Ke;
      if (d && d[a]) {
        for (var e = 0; e < d[a].length; e +=
        1) {
          if (!(d[a][e].rb !== b && "mv" !== b || c && d[a][e].Ze !== c)) {
            d[a].splice(e, 1);
            d[a].length || (d[a] = null);
            break;
          }
        }
      }
      return this;
    }, eG: function (a, b) {
      if (!this.Vd(a)) return this;
      var c = this.Ke;
      if (c && c[a]) {
        for (var d = 0; d < c[a].length; d += 1) {
          if (!b || c[a][d].Ze === b) {
            c[a].splice(d, 1);
            c[a].length || (c[a] = null);
            break;
          }
        }
      }
      return this;
    }, o: function (a, b) {
      if (!this.Vd(a)) return this;
      var c = { type: a };
      b || "string" !== typeof b && "number" !== typeof b && "boolean" !== typeof b ? g.a.KF(b) ? c.value = b : c =
      g.extend(c, b) : c.value = b;
      for (var d = [].concat(this.Ke[a]), e =
      0; e < d.length; e +=
           1) {
        d[e].rb && (d[e].rb.call(d[e].Ze || this, c), d[e] && d[e].bj && this.Ke[a] && this.Ke[a].splice(e, 1));
      }
      return this;
    }, Pi: function (a) {
      a ? this.Ke && this.Ke[a] && (this.Ke[a] = null) : this.Ke = null;
      return this;
    }
  };
  g.na.on || (g.na.on = g.na.h);
  g.na.off || (g.na.off = g.na.I);
  g.na.emit || (g.na.emit = g.na.o);
  g.Ie = {
    set: function (a, b, c) {
      var d = this.mk;
      if (d && d[a]) {
        var d = d[a], e = "set" + this.oZ(a);
        if (d[e]) {
          var f = !1;
          !0 == d.B ? f = !0 : d.B = !0;
          d[e](b, c);
          f || (d.B = !1);
          c || this.AG(a, b);
        } else {
          d.set(a, b, c);
        }
      } else {
        (this.Le = this.Le || {})[a] = b, c || this.AG(a, b);
      }
    },
    oZ: function () {
      var a = {};
      return function (b) {
        a[b] || (a[b] = b[0].toUpperCase() + b.substr(1));
        return a[b];
      };
    }(),
    get: function (a, b, c) {
      var d, e = this.mk;
      d = "get" + this.oZ(a);
      if (e && e[a]) {
        return c = e[a], c[d]
        ? (a = !1, !0 == c.B ? a = !0 : c.B = !0, b = c[d](b), a || (c.B = !1), b)
        : c.get(a, b);
      }
      if (!c && this[d]) {
        return a = !1, !0 ==
        this.B ? a = !0 : this.B = !0, b = this[d](b), a || (this.B = !1), b;
      }
      if (this.Le && this.Le.hasOwnProperty(a)) return this.Le[a];
    },
    W: function (a, b, c) {
      this.mk || (this.mk = {});
      this.mk[a] !== b && (b.h(a, function (b) {this.AG(a, b);}, this), this.mk[a] = b, c || this.AG(a));
    },
    ze: function (a, b, c) {for (var d = 0; d < a.length; d += 1) this.W(a[d], b, !c);},
    ek: function (a) {this.mk && this.mk[a] && (this.mk[a].I(a, "mv", this), this.mk[a] = void 0);},
    gp: function () {if (this.mk) for (var a in this.mk) this.mk.hasOwnProperty(a) && this.ek(a);},
    AG: function (a, b) {
      var c = a + "Changed";
      if (this[c]) this[c](b);
      this.o(a, b);
    },
    Rta: function (a, b, c) {
      var d = new (g.Z.extend({ ga: [ g.na, g.Ie ] }));
      d.Vra = function () {
        for (var b = !0, e = 0; e < a.length; e += 1) d.get(a[e]) || (b = !1);
        b && (d.gp(), c());
      };
      for (var e = 0; e < a.length; e += 1) d.W(a[e], b);
    },
    Wf: function (a, b) {
      var c, d;
      for (c in a) a.hasOwnProperty(c) && (d = a[c], this.set(c, d, b));
    }
  };
  g.w = {
    localStorage: !0,
    gE: 500,
    xe: !0,
    $d: {
      dark: "#202020",
      blue_night: "#090d20",
      test: "#033447",
      mapv: "#000001",
      techblue: "#000b11",
      insight: "#19212a",
      "default": "#fcf9f2"
    },
    vua: "dark light blue darkblue fresh grey midblue".split(" "),
    key: "fbc043611829448a8d799c0a5fef544a",
    Sb: "http",
    Ld: [ 115.423412, 39.442759, 117.514625, 41.060816, 116.405285, 39.904989 ],
    Gd: "http://restapi.amap.com",
    Db: "http://webapi.amap.com",
    rG: "http://gaode.com",
    gt: "http://m.amap.com",
    FA: "http://webrd0{1,2,3,4}.is.autonavi.com/appmaptile?lang=[lang]&size=1&scale=1&style=8&x=[x]&y=[y]&z=[z]",
    WF: "http://wprd0{1,2,3,4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x=[x]&y=[y]&z=[z]&scl=1&ltype=3",
    lP: "http://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x=[x]&y=[y]&z=[z]",
    LG: "http://webst0{1,2,3,4}.is.autonavi.com/appmaptile?x=[x]&y=[y]&z=[z]&lang=zh_cn&size=1&scale=1&style=8",
    MG: "http://wprd0{1,2,3,4}.is.autonavi.com/appmaptile?x=[x]&y=[y]&z=[z]&lang=zh_cn&size=1&scl=1&style=8&ltype=11",
    zB: "http://wprd0{1,2,3,4}.is.autonavi.com/appmaptile?lang=[lang]&size=1&style=7&x=[x]&y=[y]&z=[z]",
    xH: "http://vector.amap.com",
    rx: "vdata.amap.com",
    sQ: "ws"
  };

  function mc (a) {
    g.Z.As = a.As;
    g.l = a.l;
    g.bG = a.bG;
    g.Ola = a[7];
    a.l = null;
    g.w.Db = a[2].split(",")[0];
    g.w.Ci = a.Ci;
    g.w.BA = a.BA;
    var b = g.w.Sb = g.w.Db.split(":")[0];
    "https" === b && (g.w.sQ = "wss", g.w.Gd = g.w.Gd.replace("http", "https"), g.w.FA =
    g.w.FA.replace("http", "https"), g.w.WF = g.w.WF.replace("http", "https"), g.w.lP =
    g.w.lP.replace("http", "https"), g.w.LG = g.w.LG.replace("http", "https"), g.w.MG =
    g.w.MG.replace("http", "https"), g.w.zB = g.w.zB.replace("http", "https"), g.w.xH =
    g.w.xH.replace("http", "https"));
    var c = window.location.href;
    0 !== c.indexOf("http") && window.parent && window.parent !== window && (c = window.parent.location.href);
    g.w.Gsa = c;
    c = encodeURIComponent(c);
    g.w.Qp = c;
    g.w.Jh = g.w.Db + "/theme/v1.3/markers/" + (g.l.nd ? "b" : "n");
    var d = document.createElement("style");
    d.type = "text/css";
    g.w.aga = "url(" + b + "://webapi.amap.com/theme/v1.3/openhand.cur),default";
    var e = ".amap-container{cursor:" + g.w.aga + ";}.amap-drag{cursor:url(" + b + "://webapi.amap.com/theme/v1.3/closedhand.cur),default;}";
    d.styleSheet ? (b = function () {try {d.styleSheet.cssText = e;} catch (a) {}},
    d.styleSheet.disabled ? setTimeout(b, 10) : b()) : d.appendChild(document.createTextNode(e));
    (document.head || document.getElementsByTagName("head")[0]).appendChild(d);
    g.w.mode = Number(a[3]);
    g.w.Ld = a[1];
    g.w.key = a[0];
    g.w.Op = a[4];
    g.w.yc = a[5];
    g.w.Nda = a[6];
  }

  window.AMap && window.AMap.uH && window.AMap.uH.nI && window.AMap.uH.nI(mc);
  g.pl = { ys: Math.PI / 180, gma: 180 / Math.PI, gM: 6378137 };
  (function () {
    function a (a) {return "undefined" === typeof a ? "" : a;}

    g.mh = {
      eia: function (b) {
        b.name = a(b.name);
        var c = [ b.y, b.x, b.name ];
        if (g.l.Y) {
          var d = [ g.w.gt + "/callAPP?", "src=jsapi_q" ];
          d.push("&ios=" + encodeURIComponent("viewMap?sourceApplication=jsapi_q&dev=0&poiname=" + b.name + "&lat=" + b.y + "&lon=" + b.x));
          d.push("&android=" + encodeURIComponent("androidamap?action=shorturl&q=" + c.join(",") + "&sourceApplication=jsapi_q"));
          d.push("&wp=" + encodeURIComponent("viewMap?sourceApplication=jsapi_q&dev=0&poiname=" + b.name + "&lat=" +
          b.y + "&lon=" + b.x));
          d.push("&mo=" + encodeURIComponent(g.w.gt + "?q=" + c.join(",") + "&callapp=0&sourceApplication=jsapi_q"));
          return d.join("");
        }
        return g.w.rG + "?q=" + c.join(",") + "&src=jsapi_q";
      }, cZ: function (b) {
        b.name = a(b.name);
        b.address = a(b.address);
        b.x = a(b.x);
        b.y = a(b.y);
        var c = [ b.id, b.y, b.x, b.name, b.address ];
        if (g.l.Y) {
          var d = [ g.w.gt + "/callAPP?", "src=jsapi_p" ];
          d.push("&ios=" + encodeURIComponent("multiPointShow?sourceApplication=jsapi_p&dev=0&q=" + [
            b.y,
            b.x,
            b.name,
            b.address,
            b.id
          ].join() + "&title=" + b.name));
          d.push("&android=" +
          encodeURIComponent("androidamap?action=shorturl&p=" + c.join(",") + "&sourceApplication=jsapi_p"));
          d.push("&wp=" + encodeURIComponent("multiPointShow?sourceApplication=jsapi_p&dev=0&q=" + [
            b.y,
            b.x,
            b.name,
            b.address,
            b.id
          ].join() + "&title=" + b.name));
          return d.join("");
        }
        return g.w.rG + "?p=" + c.join(",") + "&src=jsapi_p";
      }, aZ: function (b) {
        if (g.l.Y) {
          var c = [ g.w.gt + "/callAPP?", "src=jsapi_detail" ];
          c.push("&ios=" + encodeURIComponent("viewPOIDetail?sourceApplication=jsapi_detail&poiid=" + b.id));
          b.name = a(b.name);
          b.x = a(b.x);
          b.y =
          a(b.y);
          c.push("&android=" + encodeURIComponent("androidamap?action=openFeature&featureName=PoiDetail&poiid=" + b.id + "&poiname=" + b.name + "&x=" + b.x + "&y=" + b.y + "&sourceApplication=jsapi_detail"));
          c.push("&wp=" + encodeURIComponent("viewPOIDetail?sourceApplication=jsapi_detail&poiid=" + b.id));
          c.push("&mo=" + encodeURIComponent(g.w.gt + "/detail/index/poiid=" + b.id + "&sourceApplication=jsapi_detail"));
          return c.join("");
        }
        return g.w.rG + "/detail/" + b.id + "?src=jsapi_detail";
      }, $M: function (b) {
        b.sname = a(b.sname);
        "" === b.sname &&
        (b.sname = "\u8d77\u70b9");
        b.dname = a(b.dname);
        "" === b.dname && (b.dname = "\u7ec8\u70b9");
        b.mcount = a(b.mcount);
        b.my = a(b.my);
        b.mx = a(b.mx);
        b.mname = a(b.mname);
        var c = [ b.sy, b.sx, b.sname, b.dy, b.dx, b.dname, b.m, b.t, b.mcount, b.my, b.mx, b.mname ];
        if (g.l.Y) {
          var d = [ g.w.gt + "/callAPP?", "src=jsapi_r_" + b.t ];
          d.push("&ios=" + encodeURIComponent("path?sourceApplication=jsapi_r_" + b.t + "&dev=0&slat=" + b.sy + "&slon=" + b.sx + "&sname=" + b.sname + "&dlat=" + b.dy + "&dlon=" + b.dx + "&dname=" + b.dname + "&m=" + b.m + "&t=" + b.t + "&vian=0&vialons=&vialats=&vianames="));
          var e = b.t;
          0 === b.t ? e = 2 : 2 === b.t && (e = 4);
          d.push("&android=" + encodeURIComponent("androidamap://route?sourceApplication=jsapi_r_" + b.t + "&slat=" + b.sy + "&slon=" + b.sx + "&sname=" + b.sname + "&dlat=" + b.dy + "&dlon=" + b.dx + "&dname=" + b.dname + "&dev=0&" + b.m + "&t=" + e));
          d.push("&wp=" + encodeURIComponent("path?sourceApplication=jsapi_r_" + b.t + "&dev=0&slat=" + b.sy + "&slon=" + b.sx + "&sname=" + b.sname + "&dlat=" + b.dy + "&dlon=" + b.dx + "&dname=" + b.dname + "&m=" + b.m + "&t=" + b.t + "&vian=0&vialons=&vialats=&vianames="));
          d.push("&mo=" + encodeURIComponent(g.w.gt +
          "/?r=" + c.join(",") + "&callapp=0&sourceApplication=jsapi_r_" + b.t));
          return d.join("");
        }
        return g.w.rG + "?r=" + c.join(",") + "src=jsapi_r_" + b.t;
      }, dr: function (a) {g.l.Y ? window.location.href = a : window.open(a);}
    };
  })();
  "function" !== typeof Object.keys && (Object.keys = function (a) {
    var b = [], c;
    for (c in a) a.hasOwnProperty(c) && b.push(c);
    return b;
  });
  g.a = {
    CLASS_NAME: "AMap.Util",
    cH: [],
    wa: 268435456,
    pn: [ 215440491, 106744817 ],
    A3: function () {
      var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
      return function (b, c) {
        var d = [], e;
        c = c || a.length;
        if (b) {
          for (e = 0; e < b; e++) d[e] = a[0 | Math.random() * c];
        } else {
          var f;
          d[8] = d[13] = d[18] = d[23] = "-";
          d[14] = "4";
          for (e = 0; 36 > e; e++) d[e] || (f = 0 | 16 * Math.random(), d[e] = a[19 === e ? f & 3 | 8 : f]);
        }
        return d.join("");
      };
    }(),
    aA: {
      start: function (a) {
        a.startTime = new Date;
        a.a3 = [];
        var b = (new Date).getTime();
        a.id = requestAnimationFrame(function d () {
          var e =
          (new Date).getTime();
          a.a3.push(e - b);
          b = e;
          a.id = requestAnimationFrame(d);
        });
      }, cancel: function (a) {a.id && cancelAnimationFrame(a.id);}, stop: function (a) {
        a.Ofa = new Date - a.startTime;
        this.cancel(a);
        a.aA = Math.round(1E3 / (a.Ofa / (a.a3.length + 1)));
      }
    },
    lZ: function (a, b, c) {
      var d = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : !1;
      if (a === b) return b;
      switch (3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "linear") {
        case "ease":
          c = g.du.SE(0.25, 0.1, 0.25, 1)(c);
          break;
        case "ease-in":
          c = g.du.SE(0.42, 0, 1, 1)(c);
          break;
        case "ease-out":
          c =
          g.du.SE(0, 0, 0.58, 1)(c);
          break;
        case "ease-in-out":
          c = g.du.SE(0.42, 0, 0.58, 1)(c);
      }
      var e = a + (b - a) * c;
      d && (e >>= 0);
      return e;
    },
    createObjectURL: function (a) {
      var b = 1 < arguments.length && void 0 !== arguments[1]
      ? arguments[1]
      : "text/javascript; charset=utf-8", c = null;
      try {c = (window.URL || window.webkitURL).createObjectURL(new Blob([ a ], { type: b }));} catch (d) {c = null;}
      return c;
    },
    revokeObjectURL: function (a) {(window.URL || window.webkitURL).revokeObjectURL(a);},
    Ira: function (a) {
      for (var b = {}, c = 0, d = a.length; c < d; c++) b[a[c]] = c;
      return b;
    },
    eA: function (a) {
      var b =
      {};
      if (g.a.Yi(a, "object")) for (var c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
      return b;
    },
    Tf: function (a, b) {for (var c = 0, d = b.length; c < d; c += 1) a.push(b[c]);},
    create: "function" === typeof Object.create ? Object.create : function (a, b) {
      function c () {}

      c.prototype = a;
      var d = new c, e;
      for (e in b) b.hasOwnProperty(e) && (d[e] = b[e]);
      return d;
    },
    jb: function (a) {
      if ("object" === typeof a && null !== a) {
        if (a.m0 || this.Yi(a, "Float32Array") || this.Yi(a, "Uint16Array")) return a;
        var b = this.isArray(a) ? [] : {}, c;
        for (c in a) a.hasOwnProperty(c) && (b[c] = g.a.jb(a[c]));
        return b;
      }
      return a;
    },
    j_: function (a) {return (a | 0) === a;},
    Fna: "function" === typeof Object.setPrototypeOf ? Object.setPrototypeOf : function (a, b) {
      for (var c in b) {
        a[c] =
        b[c];
      }
    },
    Hh: function (a) {return "function" === typeof a;},
    gea: function (a) {
      for (var b = 1 < arguments.length && void 0 !== arguments[1]
      ? arguments[1]
      : "webgl", c = [], d = 0, e = a.length; d < e; d += 2) {
        var f = parseInt(a.substr(d, 2), 16);
        if ("webgl" === b || "rgba" === b && 0 === d) f = this.jd(f / 255, 3);
        c.push(f);
      }
      c.push(c.shift());
      return c;
    },
    Mq: function () {},
    keys: "function" === typeof Object.keys ? Object.keys :
    function (a) {
      var b = [], c;
      for (c in a) a.hasOwnProperty(c) && b.push(c);
      return b;
    },
    map: function (a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, d = [];
      if (a && a.length) {
        g.a.Lb(a, function () {
          for (var e = arguments.length, f = Array(e), h = 0; h < e; h++) {
            f[h] =
            arguments[h];
          }
          d[f[1]] = b.apply(c || a, f);
        });
      } else {
        return a;
      }
      return d;
    },
    forEach: function (a, b) {
      if (a && a.length) {
        var c = a.length;
        if (0 < c && (b(a[0], 0), 1 < c)) {
          b(a[1], 1);
          for (var d = 2; d < c; d++) b(a[d], d);
        }
      }
    },
    Lb: function (a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ?
      arguments[2] : null;
      if (a && a.length) for (var d = 0, e = a.length; d < e && !1 !== b.call(c, a[d], d, a); d++) ;
    },
    find: function (a, b) {
      for (var c = 2 < arguments.length && void 0 !== arguments[2]
      ? arguments[2]
      : null, d = 0, e = a.length; d < e; d++) {
        if ("function" === typeof b) {if (b.call(c, a[d], d, a)) return a[d];} else if (a[d] === b) return a[d];
      }
      return null;
    },
    KF: function (a) {
      return "object" === typeof HTMLElement
      ? a instanceof HTMLElement
      : a && "object" === typeof a && 1 === a.nodeType && "string" === typeof a.nodeName;
    },
    Qt: function (a, b) {
      var c = "ASDFGHJKLQWERTYUIO!sdfghjkleiu3~yr5-P&mq9`%zCN*b=8@^xpVM",
      d, e;
      "v5" < (b || "v5") ? (d = c.length, e = 512) : (d = 27, c = c.substr(0, 27), e = 333);
      var f, h, k, l, m;
      h = [];
      k = NaN;
      l = 0;
      for (m = a.length; l < m; l++) f = a[l], f = c.indexOf(f), isNaN(k) ? k = f * d : (h.push(k + f - e), k = NaN);
      return h;
    },
    nna: function (a, b) {
      for (var c = 1, c = 512 < b.length
      ? Math.round(Math.pow(b.length, 0.5))
      : b.length, d = Math.ceil(b.length / c), e = 0; e < d; e += 1) {
        var f = c * e, h = f + c;
        h > b.length && (h = b.length);
        for (; f < h; f += 1) a(b[f]);
      }
    },
    dsa: function (a) {
      if (/^rgba\(/.test(a)) return this.wt(a);
      var b = a = this.yE(a);
      "#" === a[0] && (a = a.substring(1), 3 === a.length && (a =
      a.replace(/./g, function (a) {return a + a;})), b = this.Rp(8 === a.length ? a : "ff" + a));
      return this.wt(b);
    },
    yE: function (a) {
      var b = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      return "string" === typeof a ? b[a.toLowerCase()] ? b[a.toLowerCase()] : a : a;
    },
    UE: function (a, b, c) {
      var d, e;
      d = Math.floor(c / 2);
      e = c - d;
      d = (1 << d) - 1 << e;
      e = (1 <<
      e) - 1;
      return [ c, a & d | b & e, b & d | a & e ];
    },
    VE: function (a) {return a ? encodeURIComponent(a) : "";},
    Ed: function (a, b, c, d) {
      c = a[b].i[c];
      if ("undefined" === typeof c) return null;
      a = a[b].s;
      if ("number" === typeof c) return a[c];
      for (; "undefined" === typeof c[d.toString()] && !(d -= 1, 3 > d);) ;
      d = c[d.toString()];
      return "number" === typeof d ? a[d] : null;
    },
    wt: function (a) {
      a = a.split(",");
      a[0] = parseFloat(a[0].split("rgba(")[1]) / 255;
      a[1] = parseFloat(a[1]) / 255;
      a[2] = parseFloat(a[2]) / 255;
      a[3] = parseFloat(a[3]);
      return a;
    },
    ana: function (a) {
      a = a.split(",");
      a[0] =
      parseFloat(a[0].split("rgb(")[1]) / 255;
      a[1] = parseFloat(a[1]) / 255;
      a[2] = parseFloat(a[2]) / 255;
      return a;
    },
    hP: function (a) {return "rgba(" + 255 * a[0] + "," + 255 * a[1] + "," + 255 * a[2] + "," + a[3] + ")";},
    ufa: function (a) {return this.hP(this.eo(a));},
    eo: function (a) {
      if (a instanceof Array) return 3 == a.length && a.push(1), a;
      a = this.yE(a);
      if (0 == a.indexOf("#")) {
        if (7 == a.length) return this.vt(a.substr(1));
        if (9 == a.length) return a = a.substr(1), this.Gj(a.substr(6) + a.substr(0, 6));
      } else {
        if (0 == a.indexOf("rgb(")) return a = this.ana(a), a.push(1), a;
        if (0 == a.indexOf("rgba(")) return this.wt(a);
      }
    },
    M1: function (a) {return g.a.Rp("ff" + a);},
    Rp: function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c += 2) b.push(parseInt(a.substr(c, 2), 16));
      b.push((b.shift() / 255).toFixed(2));
      return "rgba(" + b.join(",") + ")";
    },
    vt: function (a) {return g.a.Gj("ff" + a);},
    Gj: function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c += 2) b.push(parseInt(a.substr(c, 2), 16) / 255);
      b.push(b.shift());
      return b;
    },
    Eo: function (a) {
      for (var b in a) if (a.hasOwnProperty(b)) return !1;
      return !0;
    },
    Um: function (a, b) {
      0 <= b && a.splice(b, 1);
      return a;
    },
    Hv: function (a, b) {
      var c = g.a.indexOf(a, b);
      return g.a.Um(a, c);
    },
    filter: function (a, b, c) {
      var d = [];
      g.a.Lb(a, function (a, f) {b.call(c, a, f) && d.push(a);});
      return d;
    },
    indexOf: function (a, b) {
      if (!a || !a.length) return -1;
      if (a.indexOf) return a.indexOf(b);
      for (var c = 0; c < a.length; c += 1) if (a[c] === b) return c;
      return -1;
    },
    Tga: function (a, b) {
      return a.endsWith ? a.endsWith(b) : a.length < b.length
      ? !1
      : a.substr(a.length - b.length) == b ? !0 : !1;
    },
    bind: function () {
      var a = !1;
      Function.prototype.bind && (a = !0);
      return function (b, c) {
        var d = 2 < arguments.length ?
        Array.prototype.slice.call(arguments, 2) : null;
        return a ? d ? (d.unshift(c), b.bind.apply(b, d)) : b.bind(c) : function () {return b.apply(c, d || arguments);};
      };
    }(),
    Hb: function (a, b) {
      b = b || {};
      a.C = g.extend({}, a.C, b);
      return a.C;
    },
    tY: function () {return !1;},
    join: function (a, b) {
      if (a.join) return a.join(b);
      var c = [], d;
      for (d in a) a.hasOwnProperty(d) && c.push(d + "=" + (a[d] || ""));
      return c.join(b);
    },
    RY: function (a, b) {return (a || "") + Math.round(Math.random() * Math.pow(10, b || 6));},
    Tb: function () {
      var a = 0;
      return function (b) {
        b._amap_id || (a += 1, b._amap_id =
        a);
        return b._amap_id;
      };
    }(),
    Pga: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    Ce: Date.now ? function () {return Date.now();} : function () {return (new Date).getTime();},
    OF: function (a, b, c, d) {
      var e;
      if (d) {
        var f = 0, h, k = this.Ce;
        e = function () {
          h = k();
          if (h - f < b) return !1;
          f = h;
          a.apply(c, arguments);
        };
      } else {
        var l, m, n;
        n = function () {
          l = !1;
          m && (e.apply(c, m), m = !1);
        };
        e = function () {l ? m = arguments : (l = !0, a.apply(c, arguments), setTimeout(n, b));};
      }
      return e;
    },
    jd: function (a, b) {return a === a << 0 ? a : +parseFloat(a).toFixed(b || 0);},
    isArray: Array.isArray ?
    Array.isArray : function (a) {return this.Yi(a, "array");},
    Yi: function (a, b) {
      return Object.prototype.toString.call(a).split(" ")[1].slice(0, -1)
      .toLowerCase() === b.toLowerCase();
    },
    ga: "function" === typeof Array.prototype.ga
    ? function (a, b) {return a.ga(b);}
    : function (a, b) {return -1 !== this.indexOf(a, b);},
    D2: function (a) {
      var b = 0;
      if (0 === a.length) return b;
      for (var c, d = 0, e = a.length; d < e; d += 1) c = a.charCodeAt(d), b = (b << 5) - b + c, b &= b;
      return b;
    },
    osa: function (a, b) {
      b = b ? Math.ceil(parseInt(b.substr(6)) / 24) : 1;
      for (var c = "", d = 0, e = a.length; d <
      e; d++) {
        c += String.fromCharCode((a.charCodeAt(d) - 256 - b + 65535) % 65535);
      }
      return c;
    },
    dga: function (a, b) {
      var c = (a + "").slice(-2), d = (b + "").slice(-2);
      a = a.slice(0, -2);
      b = b.slice(0, -2);
      var e = parseInt((d + c).slice(1)), f = Math.ceil(e / 250) % 2 ? 1 : -1, d = parseInt("1" + d) / 3E3;
      a -= parseInt("1" + c) / 3E3 * f;
      b -= d * (1 < e / 500 ? 1 : -1);
      return new g.U(parseFloat(a).toFixed(5), parseFloat(b).toFixed(5));
    },
    p0: function (a) {return "undefined" !== typeof JSON && JSON.stringify ? g.a.D2(JSON.stringify(a)) : null;},
    Qva: function (a, b) {
      if (b || !a.hasOwnProperty("_amap_hash")) {
        var c =
        g.a.p0(a);
        c && (a._amap_hash = c);
      }
      return a._amap_hash;
    },
    iepngFix: function (a) {
      function b () {
        for (var a; c.length;) a = c.shift(), window.DD_belatedPNG.fixPng(a);
        d.KN = !0;
      }

      this.W0 || (this.W0 = [], this.KN = !1);
      var c = this.W0, d = this;
      if ("img" === a.tagName.toLowerCase()) {
        c.push(a);
      } else {
        a = a.getElementsByTagName("*");
        for (var e = 0; e < a.length; e += 1) c.push(a[e]);
      }
      window.DD_belatedPNG && this.KN ? setTimeout(function () {b();}, 100) : this.KN || g.pb.load("AMap.FixPng", b);
    },
    Ha: function (a) {
      if (g.a.isArray(a)) {
        if (g.a.isArray(a[0])) {
          for (var b = 0; b < a.length; b +=
          1) {
            a[b] = g.a.Ha(a[b]);
          }
        } else if (b = typeof a[0], "string" === b || "number" === b) return new g.U(a[0], a[1]);
      }
      return a;
    },
    Oo: function (a) {return g.a.isArray(a) ? new g.gd(a[0], a[1]) : a;}
  };
  (function () {
    function a (a) {window.clearTimeout(a);}

    function b (a) {
      var b, c, d = [ "webkit", "moz", "o", "ms" ];
      for (b = 0; b < d.length && !c; b += 1) c = window[d[b] + a];
      return c;
    }

    function c (a) {
      var b = +new Date, c = Math.max(0, (g.l.Dk ? 50 : 20) - (b - d));
      d = b + c;
      return window.setTimeout(a, c);
    }

    var d = 0,
    e = window.requestAnimationFrame || b("RequestAnimationFrame") || c,
    f = window.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || a;
    g.a.Fc = function (a, b, c, d) {
      if (c) {
        b ? g.a.bind(a, b).call(b, d) : a();
      } else {
        return e(function () {
          b ?
          g.a.bind(a, b).call(b, d) : a();
        });
      }
    };
    g.a.Bh = function (a) {a && f.call(window, a);};
  })();
  g.a.HG =
  window.requestIdleCallback
  ? window.requestIdleCallback.bind(window)
  : function (a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, c = g.a.Ce();
    return setTimeout(function () {
      a({
        didTimeout: !1,
        timeRemaining: function () {return Math.max(0, 70 - (g.a.Ce() - c));}
      });
    }, b.timeout || 0);
  };
  g.a.EL = window.cancelIdleCallback ? window.cancelIdleCallback.bind(window) : function (a) {clearTimeout(a);};
  (function (a) {
    var b = 1, c = {};
    a.a.Dna = function (a, b) {
      if (c[a]) {
        var f = c[a];
        f.sB = 1;
        f.result = b;
        if (f.Kl) {
          for (var h = f.Kl, k = 0, l = h.length; k < l; k++) h[k].call(null, b);
          f.Kl = null;
        }
      }
    };
    a.a.jfa = function (a) {c[a] = null;};
    a.a.Fpa = function (a, b) {
      if (c[a]) {
        var f = c[a];
        0 < f.sB ? b(null, f.result) : (f.Kl || (f.Kl = []), f.Kl.push(b));
      } else {
        b(null, a);
      }
    };
    a.a.TM = function (d, e) {
      var f = navigator.geolocation;
      if (!a.l.HF || "https:" === document.location.protocol) return d(null, f);
      var h;
      e && e.Gpa && (h = "f" + b++, c[h] = { sB: 0 });
      var k = null, l = !1;
      e && e.timeout && (k = setTimeout(function () {
        k =
        void 0;
        d({ code: 3, info: "TIME_OUT", message: "Get geolocation time out." });
        l = !0;
      }, e.timeout));
      f.getCurrentPosition(function () {
        l || (clearTimeout(k), k =
        void 0, d(null, f));
      }, function (b) {
        l || (clearTimeout(k), k = void 0, 2 === b.code && 0 < b.message.indexOf("permission")
        ? a.pb.load("AMap.GeoRemoteLoc", function () {d(null, a.r4, h);})
        : d(null, f));
      }, { timeout: 1E3 });
      return h;
    };
  })(g);
  (function (a) {
    var b = a.Z.extend({ ga: [ a.na ], r: function () {} });
    a.Gi = new b;
  })(g);
  (function (a) {
    var b = a.Z.extend({
      ga: [ a.na ],
      r: function () {this.w9();},
      w9: function () {a.Gi && a.Gi.h("vecTileParsed.buildings", this.c9, this);},
      i_: function (a) {return a.map.MT;},
      TY: function (a) {return this.i_(a) ? a.map.zJ : null;},
      Ana: function (a, b) {
        if (b) {
          var e = b.map;
          e && (e.zJ ? e.zJ.toString() : "") !== (a ? a.toString() : "") && (e.zJ = a || [], e.set("display", 0));
        }
      },
      e2: function (a, b) {
        if (b) {
          var e = b.map;
          e && e.MT !== a && (e.MT = a, e.set("display", 0));
        }
      },
      Yqa: function () {},
      IT: function (a, b) {
        if (a) {
          for (var e = 0, f = a.length; e < f; e++) {
            a[e] && 0 > b.indexOf(a[e]) &&
            b.push(a[e]);
          }
        }
      },
      xY: function (b) {
        if (!b) return null;
        b = b.map.xa;
        for (var d = 0, e = b.length; d < e; d++) {
          if (a.q.rh && b[d] instanceof a.q.rh && b[d].ka && b[d].ka.length && (-1 !== b[d].ka.indexOf("building") || -1 !== b[d].ka.indexOf("poilabel")) && b[d].sa) {
            var f = b[d].X.get("tiles", null, !0);
            if (f && f.length) return b[d];
          }
        }
        return null;
      },
      tha: function (a) {
        if (a = this.xY(a)) {
          if (a = a.X.get("tiles", null, !0)) a = a[0]; else return null;
          if (!a || !a.length) return null;
          for (var b = [], e = 0, f = a.length; e < f; e++) {
            var h = a[e];
            h.Rd && h.Rd.te && this.IT(h.Rd.te, b);
          }
          return b;
        }
      },
      c9: function (a) {
        if (a.xn && a.xn.Rd) {
          var b = a.xn.Rd.te;
          if (b) {
            var e = [];
            this.IT(b, e);
            this.o("vecTileParsed.builds.found", { pX: e, xn: a.xn });
          }
        }
      }
    });
    a.Uh = new b;
  })(g);
  (function (a) {
    function b () {
      return {
        checkup: function () {
          var a = Array.prototype.slice.call(arguments, 0);
          a.pop()(null, a);
        }
      };
    }

    function c (a) {
      return {
        injectCode: function (b, c) {
          var d = null, e = null;
          try {d = (new Function("self", b))(a);} catch (f) {console.error("error", e), e = f.toString();}
          c(e, d);
        }
      };
    }

    function d (a) {
      function b (c, d) {
        function e (a, b, c) {
          a = { fx: Date.now(), Tw: h, error: a, result: b, Ko: !1, Kj: !1 };
          if (c) for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
          d(a);
        }

        var f = c.qN, h = c.Tw, l = c.PL, m = c.Az, n = c.hea || [], p = a._wkHandlers[f];
        p
        ? p[l] ? m ?
        p[l].apply(p, n.concat(e)) : e(null, p[l].apply(p, n)) : e("Unknown cmd: " + l)
        : e("Can not find handler for: " + f);
      }

      var c = [], d = null, e = null;
      for (d in this._wkHandlers) -1 !== d.indexOf("_def_") && (e = this._wkHandlers.rua = d);
      "function" === typeof this._wkHandlers[e].r && this._wkHandlers[e].r.call(this._wkHandlers[e]);
      a.is = function (a) {c.push.apply(c, a);};
      a.addEventListener("message", function (d) {
        function e (b) {
          if (t) {
            t.push(b);
            var d = !!b.Ko;
            d || n++;
            b = n >= h || b.Kj;
            if (d || b) {
              d = 1 < t.length ? { Wma: t } : t[0];
              d.fx = Date.now();
              d.zva = p;
              if (c.length) {
                try {
                  a.postMessage(d,
                  c);
                } catch (f) {a.postMessage(d), console.error(f);}
                c.length = 0;
              } else {
                a.postMessage(d);
              }
              t.length = 0;
              b && (e = t = null);
            }
          } else {
            console.error("Seemed callback already sent!!", b, b.result.vc);
          }
        }

        var f = d.data;
        d = f.Tma || [ f ];
        for (var h = d.length, n = 0, p = Date.now() - f.fx, t = [], f = 0; f < h; f++) b(d[f], e);
      }, !1);
    }

    function e (d, h) {
      this.C = a.extend({ batchSend: !0, lazy: !1, libPolyfills: null }, h);
      this.Xn = [];
      this.ay = this.C.clientId || "w" + f++;
      this.C.onReady && this.nO(this.C.onReady);
      this.IC = this.n8();
      if ("function" === typeof d) {
        var m = {};
        m[this.IC] = d;
        d = m;
      }
      d[e.dN] =
      c;
      d[this.TS()] = b;
      this.XC = d;
      this.Wy(null);
      this.C.lazy || this.vv();
      a.eN || !1 === this.C.hostWorker || (a.eN = this);
      this.Em && this.Em.r && this.Em.r.call(this.Em);
    }

    var f = 1, h = 1;
    a.extend(e, {
      dN: "_g_", Ona: function (a) {
        if (!a.Q5) {
          var b = [];
          a.addEventListener("message", function (a) {
            a = a.data;
            a = a.Wma || [ a ];
            for (var c = 0, d = a.length; c < d; c++) {
              var e = a[c], f;
              a:{
                f = e.Tw;
                for (var k = !e.Kj, h = 0, w = b.length; h < w; h++) {
                  var v = b[h];
                  if (f === v.Tw) {
                    k || b.splice(h, 1);
                    f = v;
                    break a;
                  }
                }
                f = void 0;
              }
              f && f.Az(e.error, e.result, !0);
            }
          }, !1);
          a.E5 = b;
          a.Q5 = !0;
        }
      }
    });
    a.extend(e.prototype,
    {
      n8: function () {return "_def_" + this.ay;},
      TS: function () {return "_cln_" + this.ay;},
      qca: function () {
        var a = Array.prototype.slice.call(arguments, 0);
        this.CV = a;
        if (this.av) {
          for (var b = 0, c = this.av.length; b < c; b++) this.av[b].apply(null, a);
          this.av.length = 0;
        }
      },
      is: function (a) {this.ica && this.Xn.push.apply(this.Xn, a);},
      nO: function (a) {this.CV ? a.apply(null, this.CV) : (this.av || (this.av = []), this.av.push(a));},
      vv: function (b) {
        var c = this;
        if (!c.VR) {
          c.VR = !0;
          var d = function (d, e) {
            d && a.l.ct && console.warn(d);
            c.qca.call(c, d, e);
            b && b(d, e);
          };
          a.l.ct ? this.gca(function (a, b) {
            b ? this.C9(b, function (a, c) {
              a ? d(a) : (this.Wy(c), this.gL =
              c, this.Xn.length = 0, this.Em = null, d(null, { tea: b, Opa: c }));
            }) : d("Worker start failed!");
          }) : d("Worker not supported!");
        }
      },
      Re: function (b, c) {
        var d = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : a.a.Mq, f = this;
        b = b || f.IC;
        var h = {};
        if (a.a.Yi(c, "object")) {
          var q = "return {", s;
          for (s in c) {
            if (c.hasOwnProperty(s)) {
              var r = c[s],
              q = "function" === typeof r ? q + ("\n\t" + s + ": " + r.toString() + ",") : "object" === typeof r
              ? q + ("\n\t" + s + ": " + JSON.stringify(r) +
              ",")
              : q + ("\n\t" + s + ": \"" + r + "\",");
            }
          }
          c = new Function(q + "\n}");
        }
        f.AR(b, c, h);
        f.Wy(null, h);
        f.nO(function (a) {
          a ? d(a) : f.gL ? (a =
          f.ZS(c, f.mJ(f.ay, b), !0), f.gL.sendMessage(e.dN + ":injectCode", a, function (a, b) {
            a || f.Wy(f.gL, h);
            d(a, b);
          })) : d("Worker msger missing!!");
        });
      },
      mJ: function (a, b) {
        if (!a || !b) throw Error("clientId or ns missing!!");
        return a + "_" + b;
      },
      G8: function (a, b, c) {
        function d () {
          var b = Array.prototype.slice.call(arguments, 0);
          c.sendMessage.apply(c, [ a ].concat(b));
        }

        var e = this;
        if (!c) {
          return function () {
            b.apply(e.Em, arguments);
            e.VR || "untilCall" === e.C.lazy && e.vv();
          };
        }
        d._proxy2Worker = !0;
        return d;
      },
      F6: function (a) {
        var b = {}, c;
        for (c in a) a.hasOwnProperty(c) && this.AR(c, a[c], b);
        return b;
      },
      AR: function (a, b, c) {
        b = b.call(null, !1);
        for (var d in b) b.hasOwnProperty(d) && (c[a + ":" + d] = b[d], a === this.IC && (c[d] = b[d]));
      },
      Wy: function (a, b) {
        if (!b) {
          this.Em || (this.Em = this.F6(this.XC)), b =
          this.Em;
        } else if (this.Em) for (var c in b) b.hasOwnProperty(c) && (this.Em[c] = b[c]);
        for (c in b) {
          if (b.hasOwnProperty(c)) {
            var d = b[c];
            "function" === typeof d && (this[c] = this.G8(c, d, a));
          }
        }
        this.ica =
        !!a;
      },
      ZS: function (a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
        d = a.toString(),
        e,
        d = d.replace(/^function([^\(]*)\(/, function () {
          e = "_prep_h" + h++;
          return "function " + e + "(";
        });
        return e
        ? "\n\t\t\t\t" + d + "\n\t\t\t\tif (self._wkHandlers['" + b + "'] && " + !c + ") {\n\t\t\t\t\tthrow new Error('" + b + " already exists!')\n\t\t\t\t} else {\n\t\t\t\t\tif (" + c + " && self._wkHandlers['" + b + "']) {\n\t\t\t\t\t\tvar handlerFunObj = " + e + ".call(null, self) || {}\n\n\t\t\t\t\t\tif (typeof Object.assign === 'function') {\n\t\t\t\t\t\t\tObject.assign(self._wkHandlers['" +
        b + "'], handlerFunObj)\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tfor (var key in handlerFunObj) {\n\t\t\t\t\t\t\t\tif (handlerFunObj.hasOwnProperty(key)) {\n\t\t\t\t\t\t\t\t\tself._wkHandlers['" + b + "'][key] = handlerFunObj[key]\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tself._wkHandlers['" + b + "'] = " + e + ".call(null, self) || {}\t\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t" + e + " = null;\n\t\t\t"
        : (console.error("No function match!!"), !1);
      },
      gca: function (a) {
        var b = this.ay, c = [], d;
        for (d in this.XC) {
          if (this.XC.hasOwnProperty(d)) {
            var f = this.ZS(this.XC[d], this.mJ(b, d));
            f && c.push(f);
          }
        }
        b = this.C.libPolyfills || [];
        d = 0;
        for (f = b.length; d < f; d++) b[d] = "(" + b[d].toString() + ")(self);";
        var h = b.join(";\n") + ";\n" + c.join(";\n"), c = this.C.hostWorker, s = this;
        c && c !== s ? c.nO(function (b, c) {
          b
          ? a.call(s, b)
          : c.Opa.sendMessage(e.dN + ":injectCode", h, function (b) {b ? a.call(s, b) : a.call(s, null, c.tea);});
        }) : a.call(s, null, s.qda(h));
      },
      qda: function (b) {
        b = [ "self._wkHandlers={};", b, "(" + d.toString() + ")(self)" ].join("");
        var c;
        try {
          var e =
          a.a.createObjectURL(b);
          c = new Worker(e);
          setTimeout(function () {
            a.a.revokeObjectURL(e);
            e = null;
          }, 3E3);
        } catch (f) {return;}
        return c;
      },
      s7: function (b) {
        var c = 1, d = b.E5, e = this, f = !!e.C.batchSend;
        return function (h) {
          var s = Array.prototype.slice.call(arguments, 1),
          r = "function" === typeof s[s.length - 1] ? s.pop() : null,
          u = e.ay,
          w = h.split(":"),
          v = e.IC;
          1 < w.length && (h = w[1], v = w[0]);
          s = { fx: a.a.Ce(), qN: e.mJ(u, v), Az: !!r, Tw: u + "_" + c++, PL: h, hea: s };
          r && d.push({ PL: s.PL, qN: s.qN, fx: s.fx, Tw: s.Tw, Az: r });
          f ? e.h6(b, s) : e.Zu(b, s);
        };
      },
      Zu: function (a, b) {
        if (this.Xn.length) {
          try {
            a.postMessage(b,
            this.Xn);
          } catch (c) {a.postMessage(b), console.error(c);}
          this.Xn.length = 0;
        } else {
          a.postMessage(b);
        }
      },
      h6: function (b, c) {
        b.dK || (b.dK = []);
        b.dK.push(c);
        if (!b.wV) {
          var d = this;
          b.wV = setTimeout(function () {
            b.wV = null;
            var c = b.dK;
            c.length && (d.Zu(b, 1 === c.length ? c[0] : { fx: a.a.Ce(), Tma: c }), c.length = 0);
          }, 0);
        }
      },
      ida: function (a) {
        var b = this;
        a.addEventListener("error", function (a) {
          console.error(a);
          b.Wy(null);
        }, !1);
        e.Ona(a);
      },
      C9: function (a, b) {
        var c = this;
        c.ida(a);
        var d = this.s7(a);
        if (e.c7) {
          b.call(c, null, { sendMessage: d });
        } else {
          e.c7 = !0;
          var f =
          [
            c.TS() + ":checkup",
            Math.random().toFixed(5) + "",
            Math.round(1E3 * Math.random()),
            !1,
            function (a, e) {
              var h = !0;
              if (a || !e || e.length !== f.length - 2) {
                h =
                !1;
              } else {
                for (var k = 0, w = e.length; k < w; k++) {
                  if (e[k] !== f[k + 1]) {
                    h = !1;
                    break;
                  }
                }
              }
              h ? b.call(c, null, { sendMessage: d }) : (console.error(a), b.call(c, "Self checkup failed!!"));
            }
          ];
          d.apply(c, f);
        }
      }
    });
    a.ur = e;
  })(g);
  (function () {
    if (!g.oe) {
      g.oe = { Je: {}, oA: {} };
      var a = g.oe, b = g.oe.Je, c = g.a, d = g.w;
      b.start =
      function (b) {a.oA[b.id] = { J: b.J, time: { WZ: c.Ce() }, Lea: function () {return c.Ce() - this.time.WZ;} };};
      b.end = function (b) {
        var d = a.oA[b.id], e = d.time, d = c.bind(d.Lea, d), l = b.index, m = b.key;
        "function" !== typeof b.yc && (b.yc = function () {});
        if (void 0 === e[m]) {
          void 0 === l ? e[m] = d() : (e[m] = [], e[m][l] =
          d());
        } else if (void 0 !== l && void 0 === e[m][l]) e[m][l] = d(); else return b.yc(Error("Duplicate Invoke"));
        b.yc(null);
      };
      b.push = function (b) {
        var c = a.oA[b.id].time,
        d = b.key, e = b.Yd;
        "function" !== typeof b.yc && (b.yc = function () {});
        if (void 0 === c[d]) c[d] = e; else return b.yc(Error("Duplicate Invoke"));
        b.yc(null);
      };
      b.send = function (b) {
        var c = d.Sb + "://webapi.amap.com/count?", k = g.extend(e({ J: a.oA[b.id].J }), b.params || {}), l = g.a;
        b.params && b.params.rs && !b.params.type && (b = a.oA[b.id].time, delete b.WZ, k = g.extend(k, b));
        b = [];
        for (var m in k) l.isArray(k[m]) ? b.push([ m, k[m].join("-") ].join("=")) : b.push([ m, k[m] ].join("="));
        b.push("jl=" + (d.BA ? 1 : 0));
        if (l.Yi(window.performance, "performance") &&
        l.Yi(window.performance.getEntriesByType, "function")) {
          var n = 0,
          p = [ "webapi.amap.com", "100.69.169.127", "localhost" ],
          q = [ "/maps", "/css" ];
          l.Lb(window.performance.getEntriesByType("resource"), function (a) {
            var b = void 0, c = void 0;
            a.name.match(/:\/\/([^:?#/]+)/) && (b = RegExp.$1);
            a.name.match(/[^\/](\/[^/?#:]+)/) && (c = RegExp.$1);
            b && c && l.ga(p, b) && l.ga(q, c) && (n += parseInt(a.responseEnd - a.startTime));
          });
          0 !== n && b.push("sd=" + n);
        }
        new g.bb.qb(c + b.join("&"));
      };
      var e = function (a) {
        var b = g.l;
        a = g.g.JY(a.J);
        return {
          type: "q",
          resolution: a.width +
          "*" + a.height,
          k: d.key,
          u: d.Qp,
          iw: b.cf ? 1 : 0,
          cw: b.sX ? 1 : 0,
          gc: b.fN,
          m: b.Y ? 1 : 0,
          cv: b.uE ? 1 : 0,
          pf: b.nt,
          dpr: window.devicePixelRatio,
          screenwidth: screen.width,
          scale: b.zH || 0,
          detect: b.ma ? 1 : 0,
          v: d.Op
        };
      };
    }
  })();
  (function () {
    if (g.l.ct && !g.JH) {
      var a = g.a.eA({ w: "Conf", extend: "extend", l: "Browser", Qt: "uncodeCoords" });
      g.JH = function () {
        var b = new g.ur(function () {
          return {
            r: function () {
              this.Du = { Zi: 0, pt: 0 };
              this.Bj = {};
              this.Im = [];
              this.Vn = {};
              this.Li = {};
              this.Br = 0;
              this.lU = 500;
            },
            gh: function (a, b) {
              var e = a.Ec, f = a.bf, h = "building" === a.ka[0];
              (f && e !== this.Du.pt && this.Du.pt || !f && !h && e !== this.Du.Zi && this.Du.Zi) && this.Lda(!!f);
              f ? this.Du.pt = e : h || (this.Du.Zi = e);
              this.Jja(a, b);
            },
            Lda: function (a) {
              if (a) {
                this.wR();
              } else if (!a && Object.keys(this.Bj).length) {
                for (var b in this.Bj) {
                  this.Bj.hasOwnProperty(b) &&
                  (a = this.Bj[b], a.vr || a.abort());
                }
              }
            },
            Goa: function () {this.Br > this.lU && this.WO(Object.keys(this.Li).slice(0, Math.floor(this.lU / 2)));},
            WO: function (a) {
              for (var b = 0, e = a.length; b < e; b++) delete this.Li[a[b]];
              this.Br -= a.length;
            },
            TL: function (a) {
              var b = a.ka;
              a = a.bf;
              var e = new XMLHttpRequest;
              e.Qo = "";
              e.lB = [ (new Date).getTime(), a ? 1 : 0, b.join("|") ].join("-");
              return e;
            },
            FZ: function (a, b, e) {
              var f = this, h = a.xb, k = a.bf, l = [], m = h.filter(function (a) {
                var b = f.Li[a.key];
                if (b) {
                  if (b.cU) return !0;
                  l.push(a.key);
                }
                return !1;
              }), n = !1;
              if (m.length && ((n =
              m.length === h.length) || "function" !== typeof b || b(a, m), !k)) {
                var p = [];
                m.forEach(function (a) {
                  a = a.key;
                  p.push.apply(p, f.Li[a]);
                  delete f.Li[a];
                });
                this.Br -= m.length;
                this.Oq(this.extend({}, a, { KB: p, Ec: a.Ec, Qj: n }), e);
              }
              !k && l.length && this.WO(l);
              this.Goa();
              return n;
            },
            Jja: function (a, b) {
              function e (e, f) {
                var m = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1;
                if (p.Bj[q.lB] || p.t9(q)) {
                  var n = e.split("|");
                  f && (n[0] = f + n[0]);
                  var t = n, x = "";
                  n[n.length - 1] && (x = n[n.length - 1], t = n.splice(0, n.length - 1));
                  if (k) {
                    for (var n = 0, y = t.length; n <
                    y; n++) {
                      if (t[n]) {
                        var A = JSON.parse(t[n]);
                        if (A.length) {
                          var F = A[0].split("-").slice(0, -1).join("/");
                          p.Li[F] ? p.Li[F].push(A) : (p.Li[F] = [ A ], p.Br++);
                          m && (p.Li[F].cU = !0);
                        }
                      }
                    }
                  } else {
                    p.Oq(p.extend({}, a, { KB: t, Ec: h, Qj: m, DN: !0 }), b);
                  }
                  return x;
                }
                s || (p.qk(l, b), s = !0);
              }

              var f = this, h = a.Ec, k = a.bf, l = a.xb, m = a.url;
              if (!this.FZ(a, function (a, b) {
                var c = a.xb, d = a.url, e = d.match(/&t=([^&]+)/)[1].split(";");
                b.reverse().forEach(function (a) {
                  a = c.indexOf(a);
                  -1 !== a && e.splice(a, 1);
                });
                a.url = d.replace(/&t=[^&]+/, "&t=" + e.join(";"));
              }, b)) {
                if (this.fz() &&
                (this.wR(), k)) {
                  this.qk(l, b);
                  return;
                }
                var n = 0, p = this, q = this.TL(a);
                k ? this.Im.push(q) : (this.Bj[q.lB] = q, q.xb = l, q.yc = b);
                var s = !1;
                q.onreadystatechange = function () {
                  if (4 === q.readyState && 0 === q.status) {
                    q.vr || (q.vr = !0, f.qk(l, b), q.onreadystatechange =
                    null, k ? f.HV(q) : delete f.Bj[q.lB]), q =
                    null;
                  } else if (!q.vr) {
                    if (3 === q.readyState) {
                      var h = q.responseText.substring(n);
                      q.Qo = e(h, q.Qo);
                      n = q.responseText.length;
                    } else {
                      4 === q.readyState && (h = q.responseText.substring(n), a.fg && (h +=
                      "|"), e(h, q.Qo, !0), q.Qo = "", k ? f.HV(q) : delete f.Bj[q.lB],
                      q = null);
                    }
                  }
                };
                q.onerror = function () {};
                q.open("GET", m, !0);
                q.send();
                k && (q.Y2 = l.map(function (a) {return a.key;}));
              }
            },
            RA: function (a) {
              function b (d, p, s) {
                var r = [ s, d, p ].join("/");
                d = e.filter(function (a) {return a.key === r;})[0];
                18 < k && !n && (r += "/" + k);
                if (d && "loaded" !== d.status && -1 !== m.indexOf(t)) {
                  if ("limg" === t) {
                    p = h[1], d.Oc =
                    p, "string" === typeof p.b && (p.b = v.gy(p.b)), s = "", (s =
                    "object" === typeof p.u ? p.u.url : p.u) && (p.u = { url: s, oj: "limg-" + d.key + "-" + f });
                  } else {
                    p = {
                      lj: d.ta,
                      dk: r,
                      Da: h,
                      Cc: t,
                      sL: a.ms,
                      qA: "building" === t,
                      Ih: "poilabel" === t || "roadlabel" ===
                      t || "building" === t && q
                    };
                    if ("poilabel" === t || "roadlabel" === t) p.Oc = d.Oc;
                    t === m[m.length - 1] && (d.status = "loaded");
                    l.push(p);
                  }
                }
              }

              var e = a.xb,
              f = a.QN,
              h = a.Lz,
              k = a.Ec,
              l = a.md,
              m = a.ka,
              n = a.cf,
              p = a.hN,
              q = a.xe,
              s = h[0].split("-"),
              r = parseInt(s[1]),
              u = parseInt(s[2]),
              w = parseInt(s[0]),
              v = this,
              t = s[3],
              s = Math.pow(2, w);
              10 > w && (r <= p && b(r + s, u, w), r >= s - p && b(r - s, u, w));
              b(r, u, w);
            },
            HV: function (a) {for (var b = this.Im.length - 1; 0 <= b; b--) this.Im[b] === a && this.Im.splice(b, 1);},
            t9: function (a) {
              for (var b = 0, e = this.Im.length; b < e; b++) if (this.Im[b] === a) return !0;
              return !1;
            },
            fz: function () {return Object.keys(this.Bj).length ? !0 : !1;},
            wR: function () {
              if (this.Im.length) {
                for (var a = this.Im.length - 1; 0 <= a; a--) {
                  var b = this.Im[a];
                  b.vr || b.abort();
                  b.Y2 && this.WO(b.Y2);
                }
                this.Im.length = 0;
              }
            },
            qk: function (a, b) {b(null, { xb: a, q_: !0, disabled: this.disabled }, { Kj: !0 });}
          };
        }, { batchSend: !1 });
        b.Re(null, new Function("\n     return {\n      " + a.Conf + ": " + JSON.stringify(g.w) + ",\n      " + a.extend + ": " + g.extend.toString() + ",\n      " + a.Browser + ": " + JSON.stringify(g.l) + ",\n      " + a.uncodeCoords + ": " +
        g.a.Qt.toString() + "\n     }"));
        return b;
      };
    }
  })();
  g.g = {
    CLASS_NAME: "DomUtil",
    get: function (a) {return "string" === typeof a ? document.getElementById(a) : a;},
    tA: function (a, b, c) {
      return a.parentNode == b
      ? !0
      : a.parentNode && a.parentNode !== document.body && !g.g.Ul(a.parentNode, c) ? g.g.tA(a.parentNode, b) : !1;
    },
    Sv: function (a) {
      if (!a) return [ 0, 0 ];
      var b = a.clientWidth, c = a.clientHeight;
      b && c || !a.childNodes[0] || (b = b || a.childNodes[0].clientWidth, c = c || a.childNodes[0].clientHeight);
      window.opera && (b = Math.max(b, a.childNodes[0].scrollWidth), c = Math.max(c, a.childNodes[0].scrollHeight));
      return [ b, c ];
    },
    cua: function (a, b) {
      var c = document.head || document.getElementsByTagName("head")[0];
      if (c) {
        var d = document.createElement("link");
        d.setAttribute("rel", "stylesheet");
        d.setAttribute("type", "text/css");
        d.setAttribute("href", a);
        b ? c.appendChild(d) : c.insertBefore(d, c.firstChild);
      } else {
        document.write("<link rel='stylesheet' href='" + a + "'/>");
      }
    },
    Ed: function (a, b) {
      var c = a.style[b];
      !c && a.currentStyle && (c = a.currentStyle[b]);
      c && "auto" !== c || !document.defaultView || (c = (c = document.defaultView.getComputedStyle(a,
      null)) ? c[b] : null);
      c && "auto" !== c || "height" !== b || (c = a.clientHeight + "px");
      c && "auto" !== c || "width" !== b || (c = a.clientWidth + "px");
      return "auto" === c ? null : c;
    },
    tF: function (a) {
      if (a) {
        return new g.gd(a.clientWidth || document.body.clientWidth, a.clientHeight || (g.l.wq
        ? "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
        : document.body.clientHeight), !0);
      }
    },
    JY: function (a) {return new g.gd(a.clientWidth, a.clientHeight);},
    cN: function (a) {
      var b = 0, c = 0, d = a, e = document.body, f = document.documentElement,
      h, k = g.l.xq;
      do {
        b += d.offsetTop || 0;
        c += d.offsetLeft || 0;
        b += parseInt(g.g.Ed(d, "borderTopWidth"), 10) || 0;
        c += parseInt(g.g.Ed(d, "borderLeftWidth"), 10) || 0;
        h = g.g.Ed(d, "position");
        if (d.offsetParent === e && "absolute" === h) break;
        if ("fixed" === h) {
          b += e.scrollTop || f.scrollTop || 0;
          c += e.scrollLeft || f.scrollLeft || 0;
          break;
        }
        d = d.offsetParent;
      } while (d);
      d = a;
      do {
        if (d === e) break;
        b -= d.scrollTop || 0;
        c -= d.scrollLeft || 0;
        g.g.tga() || !g.l.I3 && !k || (c +=
        d.scrollWidth - d.clientWidth, k && "hidden" !== g.g.Ed(d, "overflow-y") && "hidden" !== g.g.Ed(d, "overflow") &&
        (c += 17));
        d = d.parentNode;
      } while (d);
      return new g.G(c, b);
    },
    tga: function () {
      g.g.I7 || (g.g.I7 = !0, g.g.H7 = "ltr" === g.g.Ed(document.body, "direction"));
      return g.g.H7;
    },
    create: function (a, b, c) {
      a = document.createElement(a);
      c && (a.className = c);
      b && b.appendChild(a);
      return a;
    },
    ZX: function () {
      document.selection && document.selection.empty && document.selection.empty();
      this.oba || (this.oba = document.onselectstart, document.onselectstart = g.a.tY);
    },
    mY: function () {},
    zoa: function (a, b, c) {c ? this.Ma(a, b) : this.Xa(a, b);},
    Ul: function (a, b) {
      if (a &&
      b) {
        return 0 < a.className.length && RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className);
      }
    },
    Ma: function (a, b) {
      a && b && (a.classList && a.classList.add
      ? a.classList.add(b)
      : g.g.Ul(a, b) || (a.className += (a.className ? " " : "") + b));
    },
    sna: function (a, b) {a && (a.className = b || "");},
    Xa: function (a, b) {
      function c (a, c) {return c === b ? "" : a;}

      a && b && (a.classList && a.classList.remove ? a.classList.remove(b) : a.className =
      a.className.replace(/(\S+)\s*/g, c).replace(/(^\s+|\s+$)/, ""));
    },
    YY: function (a, b) {
      return 1 === b ? "" : "opacity" in a.style ? "opacity:" + b : 8 <=
      document.documentMode
      ? "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(opacity=" + Math.ceil(100 * b) + ")'"
      : "filter:alpha(opacity=" + Math.ceil(100 * b) + ")";
    },
    Xo: function (a, b) {
      if (a.style) {
        if ("opacity" in a.style) {
          a.style.opacity =
          b;
        } else if ("filter" in a.style) {
          var c = Math.round(100 * b);
          a.style.filter = "";
          100 !== c && (a.style.filter = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + c + ")");
        }
      }
    },
    JP: function (a) {
      for (var b = document.documentElement.style, c = 0; c < a.length; c +=
      1) {
        if (a[c] in b) return a[c];
      }
      return !1;
    },
    mZ: function (a) {
      var b =
      g.l.J3;
      return "translate" + (b ? "3d" : "") + "(" + a.x + "px," + a.y + "px" + ((b ? ",0" : "") + ")");
    },
    sta: function (a, b) {return g.g.mZ(b.add(b.Fd(-1 * a))) + (" scale(" + a + ") ");},
    i2: function (a, b, c) {
      a.ci = b;
      !c && g.l.hE
      ? (b = g.g.mZ(b), c = a.style[g.g.Hf].split("rotate"), 1 < c.length ? (c[0] = b, a.style[g.g.Hf] =
      c.join("rotate")) : a.style[g.g.Hf] = b, g.l.b0 && (a.style.WebkitBackfaceVisibility = "hidden"))
      : (a.style.left = b.x + "px", a.style.top = b.y + "px");
    },
    de: function (a) {
      a.ci || (a.ci = a.style.left ? new g.G(parseInt(a.style.left), parseInt(a.style.top)) : new g.G(0,
      0));
      return a.ci;
    },
    Hva: function (a, b) {
      a = a instanceof Array ? a : [ a ];
      for (var c = 0; c < a.length; c += 1) a[c].style.cssText = b;
    },
    b2: function (a, b) {
      ";" !== b[b.length - 1] && (b += ";");
      return b.toLowerCase() !== a.style.cssText.replace(/ /g, "").toLowerCase() ? (a.style.cssText = b, !0) : !1;
    },
    Ra: function (a, b) {
      a = a instanceof Array ? a : [ a ];
      for (var c = 0; c < a.length; c += 1) for (var d in b) b.hasOwnProperty(d) && (a[c].style[d] = b[d]);
      return this;
    },
    fB: function (a) {for (; a.childNodes.length;) a.removeChild(a.childNodes[0]);},
    remove: function (a) {
      a && a.parentNode &&
      a.parentNode.removeChild(a);
    },
    rotate: function (a, b, c) {
      var d = g.g.Hf;
      c = c || { x: a.clientWidth / 2, y: a.clientHeight / 2 };
      d
      ? (a.style[d] = "" + (" rotate(" + b + "deg)"), a.style[g.g.er[d] + "-origin"] = c.x + "px " + c.y + "px")
      : (d = Math.cos(b * Math.PI / 180), b = Math.sin(b * Math.PI / 180), a.style.filter =
      "progid:DXImageTransform.Microsoft.Matrix()", 0 < a.filters.length && (a = a.filters.item(0), a.Dx =
      -c.x * d + c.y * b + c.x, a.Dy = -c.x * b - c.y * d + c.y, a.M11 = a.M22 = d, a.M12 = -(a.M21 = b)));
    },
    hZ: function (a, b, c) {
      var d = g.g.Hf;
      c = c || {
        x: a.clientWidth / 2, y: a.clientHeight /
        2
      };
      return d
      ? g.g.er[d] + ":" + ("" + (" rotate(" + b + "deg)")) + ";" + (g.g.er[d] + "-origin:" + c.x + "px " + c.y + "px")
      : "";
    },
    wn: function (a, b, c) {
      a.width = b;
      a.height = c;
    },
    getElementsByClassName: function (a, b, c) {
      b = b || "*";
      c = c || document;
      if (c.getElementsByClassName) return c.getElementsByClassName(a);
      b = c.getElementsByTagName(b);
      a = RegExp("(^|\\s)" + a + "(\\s|$)");
      c = [];
      for (var d = 0, e; d < b.length; d++) e = b[d], a.test(e.className) && c.push(e);
      return c;
    },
    fillText: function (a, b) {
      if (a) {
        return void 0 !== a.textContent ? a.textContent = b : void 0 !== a.innerText ?
        a.innerText = b : a.innerHTML = b, a;
      }
    }
  };
  (function () {
    var a = g.g.JP([ "userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect" ]), b;
    g.extend(g.g, {
      ZX: function () {
        g.D.h(window, "selectstart", g.D.preventDefault);
        if (a) {
          var c = document.documentElement.style;
          "none" !== c[a] && (b = c[a], c[a] = "none");
        }
      },
      mY: function () {
        g.D.I(window, "selectstart", g.D.preventDefault);
        a && "none" !== b && (document.documentElement.style[a] = b, b = "none");
      },
      lga: function () {g.D.h(window, "dragstart", g.D.preventDefault);},
      Rga: function () {g.D.I(window, "dragstart", g.D.preventDefault);}
    });
  })();
  g.g.Hf = g.g.JP([ "WebkitTransform", "OTransform", "MozTransform", "msTransform", "transform" ]);
  g.g.er =
  {
    transform: "transform",
    WebkitTransform: "-webkit-transform",
    OTransform: "-o-transform",
    MozTransform: "-moz-transform",
    msTransform: "-ms-transform"
  };
  g.g.hC = g.g.JP([ "webkitTransition", "transition", "OTransition", "MozTransition", "msTransition" ]);
  g.g.Hqa = "webkitTransition" === g.g.hC || "OTransition" === g.g.hC ? g.g.hC + "End" : "transitionend";
  g.D = {
    h: function (a, b, c, d) {
      function e (b) {
        b = b || window.event;
        b.target = b.target || b.srcElement;
        return c.call(d || a, b, k);
      }

      var f = g.a.Tb(a) + "_" + g.a.Tb(c) + "_" + g.a.Tb(d || a), h = b + f;
      if (a[h]) return this;
      var k = b;
      g.l.rM && "mousewheel" === b && (b = "DOMMouseScroll");
      if (g.l.wq && ("mouseover" === b || "mouseout" === b)) {
        var l = e;
        b = "mouseover" === b ? "mouseenter" : "mouseleave";
        e = function (a) {l(a);};
      }
      if (g.l.X0 && 0 === b.indexOf("touch")) return a[h] = e, this.Tda(a, b, e, f);
      g.l.hf && "dblclick" === b && this.Rda && this.Rda(a, e, f);
      "addEventListener" in a ? a.addEventListener(b,
      e, !1) : "attachEvent" in a ? a.attachEvent("on" + b, e) : a["on" + b] = e;
      a[h] = e;
      return this;
    },
    bj: function (a, b, c, d) {
      var e = this;
      this.h(a, b, function h (k) {
        e.I(a, b, h, d);
        return c.call(d || a, k || window.event, b);
      }, d);
    },
    I: function (a, b, c, d) {
      c = g.a.Tb(a) + "_" + g.a.Tb(c) + "_" + g.a.Tb(d || a);
      d = b + c;
      var e = a[d];
      g.l.rM && "mousewheel" === b && (b = "DOMMouseScroll");
      !g.l.wq || "mouseover" !== b && "mouseout" !== b || (b = "mouseover" === b ? "mouseenter" : "mouseleave");
      g.l.X0 && -1 < b.indexOf("touch") ? this.yma(a, b, c) : g.l.hf && "dblclick" === b && this.uma ? this.uma(a, c) :
      "removeEventListener" in a ? a.removeEventListener(b, e, !1) : "detachEvent" in a && -1 === b.indexOf("touch")
      ? e && a.detachEvent("on" + b, e)
      : a["on" + b] = null;
      a[d] = void 0;
      return this;
    },
    Nva: function (a, b) {
      var c = document.createEvent("MouseEvents");
      c.initMouseEvent(a, !0, !0, window, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null);
      b.target.dispatchEvent(c);
    },
    stopPropagation: function (a) {
      a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
      return this;
    },
    boa: function (a) {
      var b = g.D.stopPropagation;
      g.l.hf && (g.D.h(a,
      "touchstart", b, this), g.D.h(a, "touchmove", b, this), g.D.h(a, "touchend", b, this));
      g.l.Y || (g.D.h(a, "mousedown", b, this), g.D.h(a, "mouseup", b, this), g.D.h(a, "mousemove", b, this));
      g.l.GO && (g.D.h(a, "pointerdown", b, this), g.D.h(a, "pointerup", b, this), g.D.h(a, "pointermove", b, this));
      g.l.d0 && (g.D.h(a, "MSPointerDown", b, this), g.D.h(a, "MSPointerUp", b, this), g.D.h(a, "MSPointerMove", b, this));
    },
    preventDefault: function (a) {
      a.preventDefault ? a.preventDefault() : a.returnValue = !1;
      return this;
    },
    stop: function (a) {return g.D.preventDefault(a).stopPropagation(a);},
    rna: function (a) {
      return a && a.getBoundingClientRect ? (a.iI = a.getBoundingClientRect(), a.jR =
      [ a.clientLeft, a.clientTop ], !0) : !1;
    },
    ipa: function (a) {a.iI && (a.iI = null, a.jR = null);},
    Xga: function (a, b) {
      var c = b.iI || b.getBoundingClientRect(), d = b.jR || [ b.clientLeft, b.clientTop ];
      return new g.G(a.clientX - c.left - d[0], a.clientY - c.top - d[1]);
    },
    Pk: function (a, b) {
      if (b && b.getBoundingClientRect) return this.Xga(a, b);
      var c = document.body,
      d = document.documentElement,
      c = new g.G(g.l.hf ? a.pageX : a.clientX + (c.scrollLeft || d.scrollLeft), g.l.hf ?
      a.pageY : a.clientY + (c.scrollTop || d.scrollTop));
      return b ? c.Wa(g.g.cN(b)) : c;
    },
    n_: function (a) {return 1 === a.which || 0 === a.button || 1 === a.button;}
  };
  g.extend(g.D, {
    cK: [], oU: !1, Tda: function (a, b, c, d) {
      switch (b) {
        case "touchstart":
          return this.Wda(a, b, c, d);
        case "touchend":
          return this.Uda(a, b, c, d);
        case "touchmove":
          return this.Vda(a, b, c, d);
      }
    }, Ym: function (a) {
      if (g.l.GO) return a;
      switch (a) {
        case "pointerdown":
          return "MSPointerDown";
        case "pointerup":
          return "MSPointerUp";
        case "pointercancel":
          return "MSPointerCancel";
        case "pointermove":
          return "MSPointerMove";
      }
    }, Wda: function (a, b, c, d) {
      function e (a) {
        for (var b = !1, d = 0; d < f.length; d += 1) {
          if (f[d].pointerId === a.pointerId) {
            b = !0;
            break;
          }
        }
        b || f.push(a);
        a.touches = f.slice();
        a.changedTouches = [ a ];
        c(a);
      }

      var f = this.cK;
      a["_amap_touchstart" + d] = e;
      a.addEventListener(this.Ym("pointerdown"), e, !1);
      this.oU || (a =
      function (a) {
        for (var b = 0; b < f.length; b += 1) {
          if (f[b].pointerId === a.pointerId) {
            f.splice(b, 1);
            break;
          }
        }
      }, document.documentElement.addEventListener(this.Ym("pointerup"), a, !1), document.documentElement.addEventListener(this.Ym("pointercancel"), a, !1), this.oU =
      !0);
      return this;
    }, Vda: function (a, b, c, d) {
      function e (a) {
        if (a.pointerType !== a.MSPOINTER_TYPE_MOUSE ||
        0 !== a.buttons) {
          for (var b = 0; b < f.length; b += 1) {
            if (f[b].pointerId === a.pointerId) {
              f[b] = a;
              break;
            }
          }
          a.touches = f.slice();
          a.changedTouches = [ a ];
          c(a);
        }
      }

      var f = this.cK;
      a["_amap_touchmove" + d] = e;
      a.addEventListener(this.Ym("pointermove"), e, !1);
      return this;
    }, Uda: function (a, b, c, d) {
      function e (a) {
        for (var b = 0; b < f.length; b += 1) {
          if (f[b].pointerId === a.pointerId) {
            f.splice(b, 1);
            break;
          }
        }
        a.touches = f.slice();
        a.changedTouches = [ a ];
        c(a);
      }

      var f = this.cK;
      a["_amap_touchend" + d] = e;
      a.addEventListener(this.Ym("pointerup"), e, !1);
      a.addEventListener(this.Ym("pointercancel"),
      e, !1);
      return this;
    }, yma: function (a, b, c) {
      c = a["_amap_" + b + c];
      switch (b) {
        case "touchstart":
          a.removeEventListener(this.Ym("pointerdown"), c, !1);
          break;
        case "touchmove":
          a.removeEventListener(this.Ym("pointermove"), c, !1);
          break;
        case "touchend":
          a.removeEventListener(this.Ym("pointerup"), c, !1), a.removeEventListener(this.Ym("pointercancel"), c, !1);
      }
      return this;
    }
  });
  (function () {
    function a (a) {
      var b = a.target || a.srcElement;
      b.sR && f(b.sR);
      b.sR = e(function () {
        var c = b.Fn;
        if (c && c.En) for (var d = 0; d < c.En.length; d += 1) c.En[d].call(c, a);
      });
    }

    function b () {
      var b = this.contentDocument.defaultView;
      b.Fn = this.O5;
      b.addEventListener("resize", a);
      a.call(b, { target: b });
    }

    var c = document.attachEvent, d = navigator.userAgent.match(/(Trident|Edge)/), e = g.a.Fc, f = g.a.Bh;
    g.extend(g.D, {
      Yda: function (e, f) {
        if (!e.En) {
          if (e.En = [], c) {
            e.Fn = e, e.attachEvent("onresize", a);
          } else {
            "static" === window.getComputedStyle(e).position &&
            (e.style.position = "relative");
            var l = e.Fn = document.createElement("object");
            l.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;");
            l.O5 = e;
            l.onload = b;
            l.type = "text/html";
            d && e.appendChild(l);
            l.data = "about:blank";
            d || e.appendChild(l);
          }
        }
        e.En.push(f);
      }, cva: function (b, d) {
        b.En.splice(b.En.indexOf(d), 1);
        b.En.length || (c
        ? b.detachEvent("onresize", a)
        : (b.Fn.contentDocument.defaultView.removeEventListener("resize",
        a), b.Fn = !b.removeChild(b.Fn)));
      }, kfa: function (a) {
        a.En = null;
        if (a.Fn) {
          var b = a.Fn;
          b.parentNode === a && b.parentNode.removeChild(b);
          a.Fn = null;
        }
      }
    });
  })();
  g.pb = {
    rka: g.w.Db + "/maps", As: g.Z.As, YN: 0, Ew: [], vs: {}, Ig: function (a, b) {
      function c () {
        d += 1;
        d === e.length && b && b();
      }

      a.length || b();
      for (var d = 0, e = [], f = 0; f < a.length; f += 1) {
        var h = this.As[a[f]];
        if (h) for (var k = 0; k < h.length; k += 1) e.push(h[k]);
        e.push(a[f]);
      }
      for (f = 0; f < e.length; f += 1) this.pM(e[f], c);
    }, uA: function (a) {
      for (var b = 0; b < a.length; b += 1) if (1 !== this.Mz(a[b]).status) return !1;
      return !0;
    }, pM: function (a, b) {
      var c = this.Mz(a);
      if (1 === c.status) {
        b && b();
      } else {
        b && c.wv.push(b);
        try {
          if (g.l.Fq && window.localStorage) {
            var d = window.localStorage["_AMap_" +
            a];
            d && (d = JSON.parse(d), d.version === g.w.Ci
            ? (window._jsload_(a, d.script, !0), d.css && window._cssload_(a, d.css, !0))
            : window.localStorage.removeItem("_AMap_" + a));
          }
        } catch (e) {}
        if (0 === c.status) {
          this.bma(a);
          var f = this;
          f.YN || (f.YN = 1, window.setTimeout(function () {
            f.YN = 0;
            var a = f.rka + "/modules?v=" + g.w.Op + "&key=" + g.w.key + "&m=" + f.Ew.join(",") + "&vrs=" + g.w.Ci;
            g.pb.yr(f.Ew.join(","));
            f.Ew = [];
            c.SG = f.Qja(a);
          }, 1));
          c.status = -1;
        }
      }
    }, yr: function (a) {
      a = g.w.Gd + "/v3/log/init?" + [ "s=rsv3&product=JsModule&key=" + g.w.key, "m=" + a ].join("&");
      new g.bb.qb(a, { callback: "callback" });
    }, load: function (a, b) {
      var c = this.As[a];
      if (c) {
        for (var d = [], e = 0; e < c.length; e += 1) d.push(c[e]);
        d.push(a);
        for (var f = 0, c = function () {
          f += 1;
          f === d.length && b && b();
        }, e = 0; e < d.length; e += 1) {
          this.pM(d[e], c);
        }
      } else {
        this.pM(a, b);
      }
    }, bma: function (a) {
      for (var b = 0; b < this.Ew.length; b += 1) if (this.Ew[b] === a) return;
      this.Ew.push(a);
    }, jm: function (a, b) {
      var c = this.Mz(a);
      try {eval(b);} catch (d) {return;}
      c.status = 1;
      for (var e = 0, f = c.wv.length; e < f; e += 1) c.wv[e]();
      c.wv = [];
    }, Wra: function (a, b) {
      var c = this;
      c.timeout =
      setTimeout(function () {1 !== c.vs[a].status ? (c.remove(a), c.load(a, b)) : clearTimeout(c.timeout);}, 5E3);
    }, Mz: function (a) {
      this.vs[a] || (this.vs[a] = {}, this.vs[a].status = 0, this.vs[a].wv = []);
      return this.vs[a];
    }, remove: function (a) {this.vs[a] = null;}, Qja: function (a) {
      g.w.mode && (a += "&mode=" + g.w.mode);
      var b = document.createElement("script");
      b.charset = "utf-8";
      a && 0 === a.indexOf(g.w.Db) && (b.crossOrigin = "Anonymous");
      b.src = a;
      document.body.appendChild(b);
      return b;
    }
  };
  window._jsload_ = function (a, b, c) {
    var d = g.pb.Mz(a);
    d.SG && 0 <= g.a.indexOf(document.body.childNodes, d.SG) && document.body.removeChild(d.SG);
    d.SG = null;
    try {
      if (!c && window.localStorage && b && "" !== b && g.l.Fq) {
        var e = window.localStorage["_AMap_" + a],
        e = e || "{}",
        e = JSON.parse(e);
        e.version !== g.w.Ci || e.script ? window.localStorage.setItem("_AMap_" + a, JSON.stringify({
          version: g.w.Ci,
          script: b
        })) : window.localStorage.setItem("_AMap_" + a, JSON.stringify({ version: g.w.Ci, script: b, css: e.css }));
      }
    } catch (f) {}
    g.pb.jm(a, b);
  };
  window._cssload_ = function (a, b, c) {
    try {
      !c && window.localStorage && b && "" !== b && g.l.Fq && window.localStorage.setItem("_AMap_" + a, JSON.stringify({
        css: b,
        version: g.w.Ci
      }));
    } catch (d) {}
    var e = document.createElement("style");
    e.type = "text/css";
    -1 === g.w.Db.indexOf("webapi.amap.com") && (b = b.replace(/webapi.amap.com/gi, g.w.Db.split("://")[1]));
    "https" === g.w.Sb && (b = b.replace(/http:/gi, "https:"));
    e.styleSheet ? (a = function () {try {e.styleSheet.cssText = b;} catch (a) {}}, e.styleSheet.disabled
    ? setTimeout(a, 10)
    : a()) : e.appendChild(document.createTextNode(b));
    a = document.head || document.getElementsByTagName("head")[0];
    2 > a.childNodes.length ? a.appendChild(e) : a.insertBefore(e, a.childNodes[1]);
  };
  (function (a) {
    var b = g.l;
    if (!g.indexedDB && b.Ph) {
      var c = a.indexedDB || a.webkitIndexedDB || a.msIndexedDB || a.mozIndexedDB,
      d = a.IDBKeyRange || a.twa || a.qua || a.pua;
      if (c) {
        var e = g.a, f = null;
        a = "amap-jsapi" + (a.kqa ? "-debug" : "");
        var h = g.extend({}, g.na), k;
        try {
          k = c.open(a), k.onsuccess = function () {
            f = this.result;
            h.o("dbReady", { status: "success" });
          }, k.onerror = function () {h.o("dbReady", { status: "error" });}, k.onblocked =
          function () {h.o("dbReady", { status: "blocked" });}, k.onupgradeneeded = function (a) {
            a.currentTarget.result.createObjectStore("tile",
            { keyPath: "tileKey" });
          };
        } catch (l) {b.Ph = !1;} finally {if (!b.Ph) return;}
        var b = function (a) {
          return function () {
            try {return a.apply(this, arguments);} catch (b) {
              var c = arguments[arguments.length - 1];
              "function" === typeof c && setTimeout(function () {c({ code: 4, Bsa: b });}, 1);
            }
          };
        },
        m = b(function (a, b) {
          return null === f
          ? (setTimeout(function () {b && b({ code: 3 });}, 1), null)
          : f.transaction("tile", a).objectStore("tile");
        });
        g.indexedDB = {
          qz: function (a, b) {
            f ? "function" === typeof a && a() : h.h("dbReady", function (c) {
              "success" === c.status ? "function" === typeof a &&
              a() : "function" === typeof b && b({ code: 3, status: status });
            });
          },
          count: b(function (a) {
            var b = this, c = arguments;
            this.qz(function () {b.yr.apply(b, c);}, a);
          }),
          yr: b(function (a) {
            var b = m("readonly", a).count();
            b.onsuccess = function () {a(null, b.result);};
            b.onerror = function () {a({ code: 7 });};
          }),
          get: b(function (a, b, c) {
            var d = this,
            e = setTimeout(function () {e && (e = null, c && c({ code: 7 }));}, b.timeout || 1E3);
            this.qz(function () {d.d8.call(d, a, function (a, b) {e && (clearTimeout(e), e = null, c(a, b));});}, c);
          }),
          d8: b(function (a, b) {
            var c = m("readonly", b);
            if (e.isArray(a)) {
              var d,
              f;
              (function () {
                function e (b) {
                  var f = c.get(a[b]);
                  f.onsuccess = function (a) {
                    a.target.result && (d[b] = a.target.result);
                    h();
                  };
                  f.onerror = h;
                }

                function h () {
                  f++;
                  f === a.length && b(null, d);
                }

                d = [];
                for (var k = f = 0, l = a.length; k < l; k++) e(k);
              })();
            } else {
              var h = c.get(a);
              h.onsuccess = function (a) {b && b(null, a.target.result);};
              h.onerror = function () {b && b({ code: 1 });};
            }
          }),
          add: b(function (a, b) {
            var c = this, d = arguments;
            this.qz(function () {c.S5.apply(c, d);}, b);
          }),
          S5: b(function (a, b) {
            function c () {0 === --f && b(null);}

            e.isArray(a) || (a = [ a ]);
            var d = a.length, f = d,
            h = 0, k = Math.ceil(d / 5), l = setInterval(function () {
              if (h++ < k) {
                var e = 5 * h;
                e > d && (e = d);
                for (var f = m("readwrite", b), r = 5 * (h - 1); r < e; r++) {
                  var A = f.put(a[r]);
                  A.onsuccess = A.onerror = c;
                }
              } else {
                clearInterval(l);
              }
            }, 32);
          }),
          remove: b(function (a, b) {
            var c = this, d = arguments;
            this.qz(function () {c.xca.apply(c, d);}, b);
          }),
          xca: b(function (a, b) {
            var c = m("readwrite", b);
            e.isArray(a) || (a = [ a ]);
            a = a.sort();
            c.openCursor(d.bound(a[0], a[a.length - 1])).onsuccess = function (c) {
              if (c = c.target.result) {
                if (e.ga(c.value.tileKey, a)) c["delete"]();
                for (var d = -1, f =
                0, h = a.length; f < h; f++) {
                  if (a[f] > c.value.tileKey) {
                    d = f;
                    break;
                  }
                }
                c["continue"](a[d]);
              } else {
                b && b(null);
              }
            };
          }),
          clear: b(function (a) {
            var b = this, c = arguments;
            this.qz(function () {b.yC.apply(b, c);}, a);
          }),
          yC: b(function (a) {
            var b = m("readwrite", a).clear();
            b.onsuccess = function () {a && a(null);};
            b.onerror = function () {a && a({ code: 2 });};
          })
        };
      } else {
        b.Ph = !1;
      }
    }
  })(window);
  (function () {
    function a (a) {u.data.keys = u.data.keys.filter(function (b) {return !s.ga(a, b);}).concat(a);}

    function b (a) {
      var b = g.w.Ci + "|" + a.dk.replace(/\//g, ",") + "|" + (a.cf ? "w" : "v") + "|", c;
      c = a.ma;
      var d = a.xe;
      c = [ c ? 1 : 0, q.Y ? 1 : 0, d ? 1 : 0 ].join();
      return b + c + "|" + m(a.url);
    }

    function c () {u.data.keys.length >= u.SH && d();}

    function d () {
      var a = u.data.keys.length, b = Math.floor(a / 2);
      a > u.SH && (b = Math.floor(a - u.SH / 2));
      a = u.data.keys.slice(0, b);
      u.data.keys = u.data.keys.slice(b + 1);
      r.remove(a, function (a) {a && 3 === a.code && (q.Ph = !1);});
    }

    function e () {
      var a =
      0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : s.Mq;
      k();
      v.setItem(u.key, u.data, !0);
      f(a);
    }

    function f (a) {
      q.Ph && r && r.clear(function (b) {
        b && 3 === b.code && (q.Ph = !1);
        a();
      });
    }

    function h () {
      k();
      var a = v.getItem(u.key, !0);
      a && (a.wH === u.data.wH && a.UW === u.data.UW ? u.data = a : e());
    }

    function k () {
      u.data = { wH: q.lf, UW: g.w.Ci, keys: [], Ye: {}, Ql: {} };
      u.fr = {};
    }

    function l (a) {a && (u.data.wH = a, q.lf = a);}

    function m (a) {
      var b = "limg";
      /flds=([^&]+)/.test(a) && (b = RegExp.$1);
      return b;
    }

    function n (a) {
      if ("object" === typeof a && null !== a) {
        var b = [];
        if (s.isArray(a)) {
          if (Object.keys(a).length == a.length) {
            b =
            a.map(function (a) {return n(a);});
          } else {
            b.push("__arrayObject");
            var c = {}, d;
            for (d in a) (0 > parseInt(d) || isNaN(parseInt(d))) && a.hasOwnProperty(d) && (c[d] = n(a[d]));
            b.push(c);
            b.push(a.map(function (a) {return n(a);}));
          }
        } else if (s.Yi(a, "Float32Array")) {
          b.push("__Float32Array"), b.push(Array.prototype.slice.call(a));
        } else if (s.Yi(a, "Uint16Array")) {
          b.push("__Uint16Array"), b.push(Array.prototype.slice.call(a));
        } else {
          for (d in b =
          {}, a) {
            a.hasOwnProperty(d) && (b[d] = n(a[d]));
          }
        }
        return b;
      }
      return a;
    }

    function p (a) {
      if ("object" === typeof a && null !== a) {
        var b = {};
        if (s.isArray(a)) {
          if ("__Float32Array" === a[0]) {
            b =
            new Float32Array(a[1]);
          } else if ("__Uint16Array" === a[0]) {
            b =
            new Uint16Array(a[1]);
          } else if ("__arrayObject" === a[0]) {
            b = p(a[2]);
            a = a[1];
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
          } else {
            b = a.map(function (a) {return p(a);});
          }
        } else {
          for (c in a) a.hasOwnProperty(c) && (b[c] = p(a[c]));
        }
        return b;
      }
      return a;
    }

    var q = g.l, s = g.a;
    if (!g.tj && q.Ph) {
      var r = g.indexedDB, u = { SH: 1E3, key: "_AMap_data.tileKeys" }, w = [], v = {
        getItem: function (a,
                           b) {
          var c = localStorage.getItem(a);
          if (c && b) {
            var d;
            try {d = JSON.parse(c);} catch (e) {d = null;}
            c = d;
          }
          return c;
        }, setItem: function (a, b, c) {
          var d = b;
          c && (d = JSON.stringify(b), 1.5 < d.length / 1024 / 1024 && Object.keys(b.Ql).length && (b.Ql = {}, d =
          JSON.stringify(b)));
          try {localStorage.setItem(a, d);} catch (f) {e();}
        }
      };
      g.tj = {
        clear: e, get: function (c, d) {
          function f (a) {
            var b = { tN: l, a0: E, lua: v, Ye: u.data.Ye };
            a && C.length && (/\|limg/.test(C[0]) ? b.J_ =
            a.map(function (a) {return JSON.parse(a.data);}).filter(function (a) {return a && a.key;}) : b.md = h(a));
            d && d(null,
            b);
            v.length && (l = [], E = []);
          }

          function h (a) {
            var b = [];
            m(c.url)
            .split(",")
            .forEach(function (c) {
              a.forEach(function (a) {
                if (a = JSON.parse(a.data[c])) {
                  var d = a.lj;
                  a.lj = new g.qm(d.z, d.x, d.y);
                  a.lj.S = d.S;
                  b.push(a);
                }
              });
            });
            return b;
          }

          var k = "FS" === c.type;
          if (!q.Fq || !(k || q.Ph && 0 !== u.data.keys.length)) return d({ code: 1 });
          var l = [], v = [], C = [], E = [], D = [];
          c.soa.forEach(function (a) {
            var d = !1, e = b({ dk: a.key, url: c.url, cf: c.cf, ma: c.q.ma, xe: c.xe });
            k && (w.push(e), u.data.Ql[e] && (l.push(a), C.push(e), D.push({ data: p(u.data.Ql[e]), tileKey: e }),
            d = !0));
            d || (q.Ph && s.ga(u.data.keys, e) ? (C.push(e), v.push(a)) : E.push(a));
          });
          if (k && 0 === v.length || 0 === C.length) return f(D);
          k && D.length && D.forEach(function (a) {
            a = s.indexOf(C, a.tileKey);
            C.splice(a, 1);
          });
          r.get(C, { timeout: c.timeout || 1E3 }, function (b, c) {
            if (b || c.length !== C.length) {
              b && 3 === b.code
              ? q.Ph = !1
              : e(), E = v, v = [], f(null);
            } else {
              if (k) {
                for (var d = c.length - 1; 0 <= d; d--) {
                  var h = c[d];
                  h && h.data ? u.data.Ql[h.tileKey] = n(h.data) : E.push(v.splice(d, 1)[0]);
                }
              }
              l = v;
              v = [];
              f(c);
              a(C);
            }
          });
          (E.length || v.length) && f(D);
        }, ip: function (a) {
          a.xb.forEach(function (c) {
            c =
            b({ dk: c.key, url: a.url, cf: a.cf, ma: a.q.ma, xe: a.xe });
            u.fr[c] && delete u.fr[c];
          });
        }, set: function (a, c) {
          a.lf && a.lf !== u.data.wH && (l(a.lf), e(), c && c({ code: 2 }));
          !a.Oc && a.md ? a.md.forEach(function (c) {
            var d = b({
              dk: c.dk,
              url: a.url,
              cf: a.cf,
              ma: a.q.ma,
              xe: a.xe
            });
            if (q.Ph || s.ga(w, d)) {
              var e = u.fr[d] || {};
              e[c.Cc] = c.Da;
              u.fr[d] = e;
            }
          }) : a.data && a.data.forEach(function (c) {
            var d = b({
              dk: c.key,
              url: a.url,
              cf: a.cf,
              ma: a.q.ma,
              xe: a.xe
            });
            if (q.Ph || s.ga(w, d)) u.fr[d] = c.data;
          });
          u.data.Ye = { "x-vd-v": a["x-vd-v"], tv: a.tv, bgc: a.bgc };
        }, flush: function () {
          var a =
          !0;
          return function () {
            var b = this;
            if (a) {
              if (Object.keys(u.data.Ql).length) for (var c in u.data.Ql) u.data.Ql.hasOwnProperty(c) && !s.ga(w, c) && delete u.data.Ql[c];
              q.Ph ? r.count(function (a, c) {
                a || (c !== u.data.keys.length ? (u.data.keys.length && (u.data.keys =
                []), f(function () {b.NC(!0);})) : b.NC(!0));
              }) : b.NC(!0);
              a = !1;
            } else {
              b.NC();
            }
          };
        }(), NC: function () {
          var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !1,
          b = {},
          d = [],
          f = Object.keys(u.fr),
          h = [];
          f.length ? (f.forEach(function (a) {
            var c = u.fr[a];
            a.split("|").pop().split(",").every(function (a) {
              return "limg" ===
              a ? !0 : c && void 0 !== c[a];
            }) ? (s.ga(u.data.keys, a) || (h.push(a), d.push({
              tileKey: a,
              data: c
            })), s.ga(w, a) && void 0 === u.data.Ql[a] && (u.data.Ql[a] = c)) : b[a] = c;
          }), d.length && (q.Ph ? r.add(d, function (a) {
            a ? 3 !== a.code ? e() : q.Ph = !1 : (u.data.keys =
            u.data.keys.concat(h), v.setItem(u.key, u.data, !0), c());
          }) : v.setItem(u.key, u.data, !0)), u.fr = b) : (a && v.setItem(u.key, u.data, !0), c());
        }
      };
      h();
    }
  })();
  g.U = g.Z.extend({
    r: function (a, b, c) {
      var d = parseFloat(b), e = parseFloat(a);
      if (isNaN(a) || isNaN(b)) throw"Invalid Object: LngLat(" + e + ", " + d + ")";
      !0 !== c && (d = Math.max(Math.min(d, 90), -90), e = (e + 180) % 360 + (-180 > e || 180 === e ? 180 : -180));
      this.P = d;
      this.R = e;
    },
    PM: function () {return g.a.jd(this.R, 6);},
    MM: function () {return g.a.jd(this.P, 6);},
    add: function (a, b) {return new g.U(this.R + a.R, this.P + a.P, b);},
    Wa: function (a, b) {return new g.U(this.R - a.R, this.P - a.P, b);},
    Uc: function (a, b) {return new g.U(this.R / a, this.P / a, b);},
    Fd: function (a, b) {
      return new g.U(this.R *
      a, this.P * a, b);
    },
    be: function (a) {return g.pp.distance(this, a);},
    offset: function (a, b) {
      if (isNaN(a) || isNaN(b)) return !1;
      var c = 2 * Math.asin(Math.sin(Math.round(a) / 12756274) / Math.cos(this.P * Math.PI / 180)),
      c = this.R + 180 * c / Math.PI,
      d = 2 * Math.asin(Math.round(b) / 12756274);
      return new g.U(c, this.P + 180 * d / Math.PI);
    },
    eb: function (a) {
      a = g.a.Ha(a);
      return a instanceof g.U ? 1E-9 >= Math.max(Math.abs(this.P - a.P), Math.abs(this.R - a.R)) : !1;
    },
    toString: function () {return g.a.jd(this.R, 6) + "," + g.a.jd(this.P, 6);},
    gl: function () {
      return [
        this.R,
        this.P
      ];
    },
    jb: function () {
      var a = this.controlPoints, b = new g.U(this.R, this.P);
      a && (b.controlPoints = [].concat(a));
      return b;
    }
  });
  g.U.Sha = function (a, b, c) {
    c = c + 1 || Math.round(Math.abs(a.R - b.R));
    if (!c || 0.001 > Math.abs(a.R - b.R)) return [];
    var d = [],
    e = Math.PI,
    f = g.pl.ys,
    h = g.pl.gma,
    k = Math.asin,
    l = Math.sqrt,
    m = Math.sin,
    n = Math.pow,
    p = Math.cos,
    q = Math.atan2,
    s = a.P * f;
    a = a.R * f;
    var r = b.P * f;
    b = b.R * f;
    for (var k = 2 * k(l(n(m((s - r) / 2), 2) + p(s) * p(r) * n(m((a - b) / 2), 2))), u, w, v, t, f = 1; f < c; f +=
    1) {
      u = 1 / c * f, w = m((1 - u) * k) / m(k), v = m(u * k) / m(k), u = w * p(s) * p(a) + v * p(r) * p(b), t =
      w * p(s) * m(a) + v * p(r) * m(b), w = w * m(s) + v * m(r), w = q(w, l(n(u, 2) + n(t, 2))), u = q(t, u), b > a
      ? (u < a && (u += 2 * e), u > b && (u -= 2 * e))
      :
      (u > a && (u -= 2 * e), u < b && (u += 2 * e)), d.push(new g.U(u * h, w * h, !0));
    }
    return d;
  };
  g.U.Dg({
    PM: "getLng",
    MM: "getLat",
    add: "add",
    Wa: "subtract",
    Uc: "divideBy",
    Fd: "multiplyBy",
    be: "distance",
    offset: "offset",
    eb: "equals",
    toString: "toString"
  });
  g.le = g.Z.extend({
    r: function () {
      this.CLASS_NAME = "AMap.Bounds";
      var a = null, b = null;
      if (1 === arguments.length && arguments[0] instanceof Array) {
        a =
        new g.U(arguments[0][0], arguments[0][1], !0), b =
        new g.U(arguments[0][2], arguments[0][3], !0);
      } else if (2 === arguments.length) {
        a = g.a.Ha(arguments[0]), b =
        g.a.Ha(arguments[1]);
      } else if (4 === arguments.length) {
        a = new g.U(arguments[0], arguments[1]), b =
        new g.U(arguments[2], arguments[3]);
      } else if (0 === arguments.length) {
        a = new g.U(-180, -90), b =
        new g.U(180, 90);
      } else {
        throw"Invalid Object: Bounds(" +
        arguments.join(",") + ")";
      }
      this.pc = a;
      this.$b = b;
    },
    Ss: function () {return this.pc;},
    Yv: function () {return this.$b;},
    Vi: function () {return new g.U(this.pc.R, this.$b.P, !0);},
    Zm: function () {return new g.U(this.$b.R, this.pc.P, !0);},
    contains: function (a) {
      var b = this.pc, c = this.$b, d;
      if (a instanceof g.zn) return this.OP().contains(a);
      a instanceof g.le ? (d = a.pc, a = a.$b) : d = a = g.a.Ha(a);
      var e = d.R, f = b.R, h = a.R, k = c.R;
      f > k && (k += 360, 0 > e && (e += 360), 0 > h && (h += 360));
      return d.P >= b.P && a.P <= c.P && e >= f && h <= k;
    },
    Pf: function (a) {
      var b = this.pc, c = this.$b,
      d = a.pc;
      a = a.$b;
      var e = a.R >= b.R && d.R <= c.R;
      return a.P >= b.P && d.P <= c.P && e;
    },
    $g: function () {
      return new g.U(this.pc.R > this.$b.R
      ? (this.pc.R + this.$b.R + 360) / 2 % 360
      : (this.pc.R + this.$b.R) / 2, (this.pc.P + this.$b.P) / 2);
    },
    extend: function (a) {
      this.pc.R = Math.min(this.pc.R, a.R);
      this.pc.P = Math.min(this.pc.P, a.P);
      this.$b.R = Math.max(this.$b.R, a.R);
      this.$b.P = Math.max(this.$b.P, a.P);
      return this;
    },
    hpa: function (a) {return this.extend(a.pc).extend(a.$b);},
    toString: function () {return this.pc.toString() + ";" + this.$b.toString();},
    jb: function () {
      return new g.le(this.pc.jb(),
      this.$b.jb());
    },
    eb: function (a) {return a instanceof g.le ? this.pc.eb(a.pc) && this.$b.eb(a.$b) : !1;},
    ti: function () {return Math.abs(this.$b.R - this.pc.R);},
    ri: function () {return Math.abs(this.pc.P - this.$b.P);},
    OP: function (a) {
      var b = [ this.Ss(), this.Zm(), this.Yv(), this.Vi() ];
      a && b.push(this.Ss());
      return new g.zn(b);
    },
    woa: function (a) {return new g.Xe(a.ac(this.Vi(), 20), a.ac(this.Zm(), 20));},
    IM: function (a, b) {return this.OP(b).IM(a);},
    FM: function (a) {return this.woa(a).$g();}
  });
  g.le.Dg({
    Ss: "getSouthWest",
    Yv: "getNorthEast",
    Vi: "getNorthWest",
    Zm: "getSouthEast",
    contains: "contains",
    Pf: "intersects",
    $g: "getCenter",
    extend: "extend"
  });
  g.G = g.Z.extend({
    r: function (a, b, c) {
      if (isNaN(a) || isNaN(b)) throw"Invalid Object: Pixel(" + a + ", " + b + ")";
      this.x = c ? Math.round(a) : Number(a);
      this.y = c ? Math.round(b) : Number(b);
    },
    Qe: function () {return this.x;},
    Ud: function () {return this.y;},
    add: function (a, b) {return new g.G(this.x + a.x, this.y + a.y, b);},
    Wa: function (a, b) {return new g.G(this.x - a.x, this.y - a.y, b);},
    Uc: function (a, b) {return new g.G(this.x / a, this.y / a, b);},
    Fd: function (a, b) {return new g.G(this.x * a, this.y * a, b);},
    be: function (a) {
      var b = a.x - this.x;
      a = a.y - this.y;
      return Math.sqrt(b *
      b + a * a);
    },
    floor: function () {return new g.G(Math.floor(this.x), Math.floor(this.y));},
    round: function () {return new g.G(this.x, this.y, !0);},
    eb: function (a) {return a instanceof g.G && this.x === a.x && this.y === a.y;},
    jb: function (a) {return new g.G(this.x, this.y, a);},
    toString: function () {return this.x + "," + this.y;},
    gl: function () {return [ this.x, this.y ];},
    length: function () {return Math.sqrt(this.x * this.x + this.y * this.y);},
    direction: function () {
      var a = this.x, b = this.y;
      if (0 === a && 0 === b) return null;
      if (0 === a) {
        return 0 < b ? Math.PI / 2 : -Math.PI /
        2;
      }
      var c = 180 * Math.atan(b / a) / Math.PI;
      return 0 > a && 0 < b ? c + 180 : 0 > a && 0 > b ? c + 180 : 0 < a && 0 > b ? c + 360 : c;
    },
    us: function (a) {
      var b = this.length(), c = a.length();
      return b && c ? 180 * Math.acos((this.x * a.x + this.y * a.y) / c / b) / Math.PI : null;
    },
    toFixed: function (a) {
      this.x = g.a.jd(this.x, a);
      this.y = g.a.jd(this.y, a);
      return this;
    }
  });
  g.G.Dg({
    Qe: "getX",
    Ud: "getY",
    add: "add",
    Wa: "subtract",
    Uc: "divideBy",
    Fd: "multiplyBy",
    be: "distance",
    eb: "equals",
    toString: "toString"
  });
  g.gd = g.Z.extend({
    r: function (a, b, c) {
      if (isNaN(a) || isNaN(b)) throw"Invalid Object: Size(" + a + ", " + b + ")";
      this.width = c ? Math.round(a) : Number(a);
      this.height = c ? Math.round(b) : Number(b);
    },
    jb: function () {return new g.gd(this.width, this.height);},
    ti: function () {return this.width;},
    ri: function () {return this.height;},
    xB: function () {return new g.G(this.ti(), this.ri());},
    contains: function (a) {return Math.abs(a.x) <= Math.abs(this.width) && Math.abs(a.y) <= Math.abs(this.height);},
    eb: function (a) {
      return a instanceof g.gd && this.width ===
      a.width && this.height === a.height;
    },
    toString: function () {return this.ti() + "," + this.ri();}
  });
  g.gd.Dg({ ti: "getWidth", ri: "getHeight", toString: "toString" });
  g.zn = g.Z.extend({
    r: function (a) {
      this.CLASS_NAME = "AMap.ArrayBounds";
      a = g.a.Ha(a);
      this.path = [];
      for (var b = 0; b < a.length; b += 1) this.path.push([ a[b].R, a[b].P ]);
      this.bounds = this.Ld = a;
    },
    contains: function (a, b) {
      if (a instanceof g.zn) return g.pp.isRingInRing(a.path, this.path);
      a instanceof g.G ? a = [ a.x, a.y ] : a instanceof g.U && (a = [ a.R, a.P ]);
      return g.ed.ud(a, this.path, b);
    },
    toBounds: function () {
      for (var a = new g.le(180, 90, -180, -90), b = this.Ld.length - 1; 0 <= b; b -=
      1) {
        a.extend(this.Ld[b]);
      }
      return a;
    },
    IM: function (a) {
      for (var b = [], c = 0; c <
      this.path.length; c += 1) {
        b[c] = a.ac(this.path[c], 20);
      }
      return b;
    },
    FM: function (a) {return this.toBounds().FM(a);},
    $g: function () {return this.toBounds().$g();}
  });
  g.zn.Dg({ contains: "contains", $g: "getCenter" });
  g.h4 = g.zn.extend({
    r: function (a) {
      this.CLASS_NAME = "AMap.CoordsBounds";
      this.path = a;
      if (a[0] instanceof g.G) {
        this.path = [];
        for (var b = 0; b < a.length; b += 1) this.path.push([ a[b].x, a[b].y ]);
      }
      this.bounds = this.Ld = a;
    }
  });
  g.Xe = g.Z.extend({
    r: function () {
      if (2 === arguments.length) {
        this.Qb = arguments[0], this.ld =
        arguments[1];
      } else if (1 === arguments.length && arguments[0] instanceof Array || 4 === arguments.length) {
        var a = arguments[0] instanceof Array
        ? arguments[0]
        : arguments;
        this.Qb = new g.G(a[0], a[1]);
        this.ld = new g.G(a[2], a[3]);
      } else {
        throw"Invalid Object: PixelBounds(" + arguments.join(",") + ")";
      }
    },
    $g: function (a) {return new g.G((this.Qb.x + this.ld.x) / 2, (this.Qb.y + this.ld.y) / 2, a);},
    contains: function (a) {
      var b;
      a instanceof g.Xe ? (b = a.Qb, a = a.ld) : b =
      a;
      return b.x > this.Qb.x && a.x < this.ld.x && b.y > this.Qb.y && a.y < this.ld.y;
    },
    ti: function () {return this.ld.x - this.Qb.x;},
    ri: function () {return this.ld.y - this.Qb.y;},
    Pf: function (a, b) {
      b || 0 === b || (b = 20);
      var c = this.Qb, d = this.ld, e = a.Qb, f = a.ld, h = f.y >= c.y - b && e.y <= d.y + b;
      return f.x >= c.x - b && e.x <= d.x + b && h;
    },
    toString: function () {return this.Qb + ";" + this.ld;},
    jb: function () {return new g.Xe(this.Qb.jb(), this.ld.jb());}
  });
  g.H = {};
  g.H.vL =
  function (a) {
    for (var b = [ Infinity, Infinity, -Infinity, -Infinity ], c = 0, d = a.length; c < d; c +=
    1) {
      g.H.XE(b, a[c]);
    }
    return b;
  };
  g.H.dX = function (a, b, c) {
    var d = Math.min.apply(null, a);
    a = Math.max.apply(null, a);
    var e = Math.min.apply(null, b);
    b = Math.max.apply(null, b);
    return g.H.Tfa(d, a, e, b, c);
  };
  g.H.buffer = function (a, b) {
    a[0] -= b;
    a[1] -= b;
    a[2] += b;
    a[3] += b;
  };
  g.H.jb = function (a) {return a.slice();};
  g.H.ud = function (a, b) {return a[0] <= b[0] && b[0] <= a[2] && a[1] <= b[1] && b[1] <= a[3];};
  g.H.IX = function (a, b) {return a[0] <= b[0] && b[2] <= a[2] && a[1] <= b[1] && b[3] <= a[3];};
  g.H.hsa = function () {return [ Infinity, Infinity, -Infinity, -Infinity ];};
  g.H.Tfa =
  function (a, b, c, d, e) {
    return "undefined" !== typeof e ? (e[0] = a, e[2] = b, e[1] = c, e[3] = d, e) : [
      a,
      c,
      b,
      d
    ];
  };
  g.H.empty = function (a) {
    a[0] = a[1] = Infinity;
    a[2] = a[3] = -Infinity;
    return a;
  };
  g.H.eb = function (a, b) {return a[0] === b[0] && a[2] === b[2] && a[1] === b[1] && a[3] === b[3];};
  g.H.extend = function (a, b) {
    b[0] < a[0] && (a[0] = b[0]);
    b[2] > a[2] && (a[2] = b[2]);
    b[1] < a[1] && (a[1] = b[1]);
    b[3] > a[3] && (a[3] = b[3]);
  };
  g.H.XE = function (a, b) {
    b[0] < a[0] && (a[0] = b[0]);
    b[0] > a[2] && (a[2] = b[0]);
    b[1] < a[1] && (a[1] = b[1]);
    b[1] > a[3] && (a[3] = b[1]);
  };
  g.H.Vsa = function (a) {return [ a[0], a[1] ];};
  g.H.Wsa = function (a) {return [ a[2], a[1] ];};
  g.H.$g = function (a) {return [ (a[0] + a[2]) / 2, (a[1] + a[3]) / 2 ];};
  g.H.gta = function (a, b, c, d, e) {
    var f = b * d[0] / 2;
    d = b * d[1] / 2;
    b = Math.cos(c);
    c = Math.sin(c);
    f = [ -f, -f, f, f ];
    d = [ -d, d, -d, d ];
    var h, k, l;
    for (h = 0; 4 > h; h += 1) k = f[h], l = d[h], f[h] = a[0] + k * b - l * c, d[h] = a[1] + k * c + l * b;
    return g.H.dX(f, d, e);
  };
  g.H.ri = function (a) {return a[3] - a[1];};
  g.H.tta = function (a) {return [ a[2] - a[0], a[3] - a[1] ];};
  g.H.xta = function (a) {return [ a[0], a[3] ];};
  g.H.yta = function (a) {return [ a[2], a[3] ];};
  g.H.ti = function (a) {return a[2] - a[0];};
  g.H.Pf = function (a, b) {return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];};
  g.H.Eo = function (a) {return a[2] < a[0] || a[3] < a[1];};
  g.H.normalize = function (a, b) {return [ (b[0] - a[0]) / (a[2] - a[0]), (b[1] - a[1]) / (a[3] - a[1]) ];};
  g.H.Cva = function (a, b) {
    var c = (a[2] - a[0]) / 2 * (b - 1), d = (a[3] - a[1]) / 2 * (b - 1);
    a[0] -= c;
    a[2] += c;
    a[1] -= d;
    a[3] += d;
  };
  g.H.touches =
  function (a, b) {return g.H.Pf(a, b) && (a[0] === b[2] || a[2] === b[0] || a[1] === b[3] || a[3] === b[1]);};
  g.H.transform = function (a, b, c) {
    a = [ a[0], a[1], a[0], a[3], a[2], a[1], a[2], a[3] ];
    b(a, a, 2);
    return g.H.dX([ a[0], a[2], a[4], a[6] ], [ a[1], a[3], a[5], a[7] ], c);
  };
  g.le.wb({
    r: function () {
      var a = g.le.prototype.r;
      return function () {
        a.apply(this, arguments);
        this.southwest = this.pc;
        this.northeast = this.$b;
      };
    }(), extend: function () {
      var a = g.le.prototype.extend;
      return function () {
        a.apply(this, arguments);
        this.pc.lng = this.pc.R;
        this.pc.lat = this.pc.P;
        this.$b.lng = this.$b.R;
        this.$b.lat = this.$b.P;
        return this;
      };
    }()
  });
  g.U.wb({
    r: function () {
      var a = g.U.prototype.r;
      return function () {
        a.apply(this, arguments);
        this.lng = parseFloat(this.R.toFixed(6));
        this.lat = parseFloat(this.P.toFixed(6));
      };
    }()
  });
  g.iC = g.Z.extend({
    r: function (a, b, c, d) {
      this.uR = a;
      this.JR = b;
      this.XR = c;
      this.rS = d;
    }, transform: function (a, b) {return this.qW(a.jb(), b);}, qW: function (a, b) {
      b = b || 1;
      a.x = b * (this.uR * a.x + this.JR);
      a.y = b * (this.XR * a.y + this.rS);
      return a;
    }, jpa: function (a, b) {
      b = b || 1;
      return new g.G((a.x / b - this.JR) / this.uR, (a.y / b - this.rS) / this.XR);
    }
  });
  g.Dn = g.Z.extend({
    r: function (a) {
      this.RH = a.MAX_LATITUDE || 85.0511287798;
      a.project && a.unproject && (this.ac = a.project, this.kh = a.unproject);
    }
  });
  g.Dn.UQ = { ac: function (a) {return new g.G(a.R, a.P);}, kh: function (a, b) {return new g.U(a.x, a.y, b);} };
  g.Dn.h5 =
  new g.Dn({
    MAX_LATITUDE: 85.0511287798,
    project: function (a) {
      var b = Math.PI / 180, c = this.RH, c = Math.max(Math.min(c, a.P), -c);
      a = a.R * b;
      b = Math.log(Math.tan(Math.PI / 4 + c * b / 2));
      return new g.G(a, b, !1);
    },
    unproject: function (a, b) {
      var c = 180 / Math.PI;
      return new g.U(a.x * c, (2 * Math.atan(Math.exp(a.y)) - Math.PI / 2) * c, b);
    }
  });
  g.Dn.WQ = {
    RH: 85.0840591556,
    ZH: 6356752.3142,
    YH: 6378137,
    ac: function (a) {
      var b = Math.PI / 180, c = this.RH, d = Math.max(Math.min(c, a.P), -c), e = this.YH, c = this.ZH;
      a = a.R * b * e;
      b *= d;
      e = c / e;
      e = Math.sqrt(1 - e * e);
      d = e * Math.sin(b);
      d = Math.pow((1 - d) / (1 + d), 0.5 * e);
      b = Math.tan(0.5 * (0.5 * Math.PI - b)) / d;
      b = -c * Math.log(b);
      return new g.G(a, b);
    },
    kh: function (a, b) {
      for (var c = 180 / Math.PI, d = this.YH, e = this.ZH, f = a.x * c / d, d = e / d, d = Math.sqrt(1 - d * d), e = Math.exp(-a.y / e), h = Math.PI / 2 - 2 * Math.atan(e), k = 15, l = 0.1; 1E-7 < Math.abs(l) && (k -=
      1, 0 < k);) {
        l = d * Math.sin(h),
        l = Math.PI / 2 - 2 * Math.atan(e * Math.pow((1 - l) / (1 + l), 0.5 * d)) - h, h += l;
      }
      return new g.U(f, h * c, b);
    }
  };
  g.lh = {};
  g.lh.RB = {
    AA: function (a, b) {
      var c = this.ef.ac(a), d = this.scale(b);
      return this.AB.qW(c, d);
    },
    aB: function (a, b, c) {
      b = this.scale(b);
      a = this.AB.jpa(a, b);
      return this.ef.kh(a, c);
    },
    ac: function (a) {return this.ef.ac(a);},
    scale: function (a) {return 256 << a;},
    wo: function (a) {return 12756274 * Math.PI / (256 * Math.pow(2, a));}
  };
  g.lh.KH =
  g.extend({}, g.lh.RB, {
    code: "EPSG:3857",
    ef: g.Dn.h5,
    AB: new g.iC(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),
    ac: function (a) {return this.ef.ac(a).Fd(6378137);}
  });
  g.lh.DQ = g.extend({}, g.lh.RB, {
    code: "EPSG:3395", ef: g.Dn.WQ, AB: function () {
      var a = g.Dn.WQ;
      return new g.iC(0.5 / (Math.PI * a.YH), 0.5, -0.5 / (Math.PI * a.ZH), 0.5);
    }()
  });
  g.lh.EQ = g.extend({}, g.lh.RB, { code: "EPSG:4326", ef: g.Dn.UQ, AB: new g.iC(1 / 360, 0.5, -1 / 360, 0.25) });
  g.lh.Dqa = g.extend({}, g.lh.RB, { ef: g.Dn.UQ, AB: new g.iC(1, 0, 1, 0) });
  g.VF = {
    ac: function (a, b) {
      a = g.a.Ha(a);
      return this.li.AA(a, b || this.get("zoom"));
    },
    kh: function (a, b, c) {return this.li.aB(a, b || this.get("zoom"), c);},
    $ta: function (a, b) {return this.ac(a, b);},
    Ssa: function (a, b) {return this.kh(a, b);},
    fo: function (a, b, c) {
      g.c.add(this, "containerToLngLat");
      var d = this.get("size").xB().Uc(2);
      if (a.eb(d) && !c) return this.get("center");
      a = this.Mf(a, b, c);
      return this.we(a);
    },
    Eq: function (a, b) {
      g.c.add(this, "lngLatToContainer");
      var c = 0;
      b && (c = "string" === typeof b ? Math.round(parseFloat(b) / 0.14929107086948487) :
      b);
      var d = this.Pb(a);
      return this.ve(d, null, c);
    },
    Pb: function (a) {
      a = g.a.Ha(a);
      return this.ac(a, 20);
    },
    we: function (a) {return a ? this.kh(a, 20) : a;},
    RF: function (a) {
      a = g.a.Ha(a);
      return this.ac(a, 20).Wa(g.a.Ub);
    },
    K_: function (a, b) {
      b || (a = g.a.Ha(a));
      var c = [], d = !1;
      void 0 === a[0].length && (d = !0);
      for (var c = [], e = 0, f = a.length; e < f; e += 1) {
        if (d) {
          var h = this.ac(a[e], 20).Wa(g.a.Ub);
          c[e] = [ h.x, h.y ];
        } else {
          c[e] = this.K_(a[e], !0);
        }
      }
      return c;
    },
    pha: function (a) {return this.kh(a.add(g.a.Ub), 20);},
    Tsa: function (a) {return this.ve(a.add(g.a.Ub));},
    ata: function (a) {
      return a ?
      this.ac(this.get("center"), a) : this.get("centerPixel");
    },
    Rqa: function (a) {return (new g.G(a.x + 2.0037508342789244E7, 2.0037508342789244E7 - a.y)).Uc(0.14929107086948487);},
    E0: function (a) {return new g.G(0.14929107086948487 * a.x - 2.0037508342789244E7, 2.0037508342789244E7 - 0.14929107086948487 * a.y);}
  };
  z.mC =
  g.Z.extend({
    ga: [ g.na, g.Ie ],
    C: { center: new g.U(116.397128, 39.916527), zoom: 13, rotation: 0, crs: "EPSG3857" },
    r: function (a) {
      this.CLASS_NAME = "AMap.View2D";
      g.c.ra(this, a);
      a = a || {};
      a.center && (a.center = g.a.Ha(a.center));
      this.C = a;
    }
  });
  z.Yb = g.Z.extend({
    ga: [ g.na, g.Ie, g.VF ],
    C: {
      features: "all",
      showLabel: !0,
      dragEnable: !0,
      showIndoorMap: g.l.Y ? !1 : !0,
      lang: "zh_cn",
      keyboardEnable: !0,
      doubleClickZoom: !0,
      gridMapForeign: !1,
      scrollWheel: !0,
      zoomEnable: !0,
      jogEnable: !0,
      continuousZoomEnable: !0,
      resizeEnable: !1,
      animateEnable: !0,
      rotateEnable: !1,
      labelzIndex: 99,
      showFog: !0,
      touchZoom: !0,
      zooms: [ 3, g.l.Y ? g.l.nd ? 19 : 20 : 18 ],
      defaultCursor: "",
      limitBounds: null,
      logoUrl: g.w.Db + "/theme/v1.3/logo@1x.png",
      logoUrlRetina: g.w.Db + "/theme/v1.3/logo@2x.png",
      copyright: "\x3c!--v1.4.11--\x3e &copy " +
      (new Date).getFullYear() + " AutoNavi ",
      isHotspot: !g.l.Y,
      baseRender: g.l.sea,
      overlayRender: g.l.nla,
      mapStyle: "normal",
      showBuildingBlock: g.l.cf,
      crs: "EPSG3857",
      rotation: 0,
      pitch: 0,
      yaw: 0,
      scale: 1,
      center: new g.U(116.397128, 39.916527),
      zoom: 13,
      detectRetina: !0,
      pitchEnable: !1,
      buildingAnimation: !1,
      maxPitch: 83,
      turboMode: !0,
      preloadMode: !0,
      workerMode: !0
    },
    poiOnAMAP: function (a) {
      g.c.add(this, "poiOnAMAP");
      var b = {}, c = g.a.Ha(a.location);
      b.id = a.id;
      c && (b.y = c.P, b.x = c.R);
      b.name = a.name;
      b.address = a.address;
      g.mh.dr(g.mh.cZ(b));
    },
    detailOnAMAP: function (a) {
      g.c.add(this, "detailOnAMAP");
      var b = {}, c = g.a.Ha(a.location);
      b.id = a.id;
      c && (b.y = c.P, b.x = c.R);
      b.name = a.name;
      g.mh.dr(g.mh.aZ(b));
    },
    setLabelzIndex: function (a) {
      g.c.add(this, "setLabelzIndex");
      return this.set("labelzIndex", a);
    },
    getLabelzIndex: function () {return this.get("labelzIndex", null, !0);},
    setMapStyle: function (a) {
      g.c.add(this, "setMapStyle");
      -1 === a.indexOf("amap://styles/")
      ? (this.set("styleUrl", "", !0), this.set("mapStyle", a))
      : this.set("styleUrl", a);
      this.ZN();
    },
    getMapStyle: function () {
      return this.get("styleUrl") ||
      this.get("mapStyle", null, !0);
    },
    getFeatures: function () {return this.get("features", null, !0);},
    setFeatures: function (a) {
      g.c.add(this, "setFeatures");
      this.set("features", a);
    },
    setLang: function (a) {
      g.c.add(this, "setLang", a);
      "en" !== a && "zh_cn" !== a && "zh_en" !== a || a === this.get("lang", null, !0) || (this.set("lang", a), this.Xi && this.Xi.K1(this));
    },
    getLang: function () {return this.get("lang", null, !0);},
    setCity: function (a, b) {
      g.c.add(this, "setCity");
      var c = this;
      (new g.bb.qb(g.w.Gd + "/v3/config/district?subdistrict=0&extensions=all&key=" +
      g.w.key + "&s=rsv3&output=json&keywords=" + a, { callback: "callback" })).h("complete", function (d) {
        var e = d.districts;
        if (e && e.length) {
          d = e[0];
          /[^\w]+/.test(a) && (e = g.a.find(e, function (b) {return b.name === a;})) && e !== d && (d = e);
          try {
            var f = d.center.split(","), h;
            switch (d.level) {
              case "city":
                h = 10;
                break;
              case "province":
                h = 7;
                break;
              case "district":
                h = 12;
                break;
              case "country":
                h = 4;
                break;
              default:
                h = 12;
            }
            -1 !== d.name.indexOf("\u5e02") && (h = 10);
            c.B = !0;
            c.setZoomAndCenter(h, new g.U(f[0], f[1]), !0);
            c.B = !1;
            b && b.call(c, f, h);
          } catch (k) {}
        }
      }, this);
    },
    getScreenShot: function (a, b) {
      g.c.add(this, "getScreenShot");
      return this.map && g.l.Vk ? this.map.jZ(a, b) : "";
    },
    getCity: function (a, b) {
      g.c.add(this, "getCity");
      var c = g.w.Gd + "/v3/geocode/regeo?&extensions=&&key=" + g.w.key + "&s=rsv3&output=json&location=" + (b || this.get("center", null, !0));
      (new g.bb.qb(c, { callback: "callback", sv: !0, Cc: "REGEO" })).h("complete", function (b) {
        b = b.regeocode.addressComponent;
        a({
          province: b.province,
          city: b.city instanceof Array ? "" : b.city,
          citycode: b.citycode instanceof Array ? "" : b.citycode,
          district: b.district instanceof
          Array ? "" : b.district
        });
      }, this);
    },
    r: function (a, b) {
      this.id = g.a.Tb(this);
      this.CLASS_NAME = "AMap.Map";
      g.c.ra(this, b);
      this.B = !0;
      b = b || {};
      b.mapStyle && -1 !== b.mapStyle.indexOf("amap://styles/")
      ? (b.styleUrl = b.mapStyle, delete b.mapStyle)
      : b.styleUrl = "amap://styles/normal";
      b.bgColor && g.extend(g.w.$d, b.bgColor);
      b.maxPitch && (b.maxPitch = Math.min(this.C.maxPitch, Math.max(b.maxPitch, 0)));
      b.pitch && (b.pitch = Math.min(b.maxPitch || this.C.maxPitch, Math.max(b.pitch, 0)));
      "3D" !== b.viewMode && (b.pitch = 0);
      g.w.sE = b.buildingColor ||
      null;
      b.mobile && (g.l.Y = !0);
      b.noPoi && (g.w.Cka = !0);
      b.editEnable && (b.nolimg = !0, b.showIndoorMap = !1);
      void 0 !== b.nolimg && (b.nolimg_param = b.nolimg);
      "3D" === b.viewMode && g.l.ap && void 0 === b.showBuildingBlock && !0 === b.showBuildingBlock;
      this.hn = !!b.enableSocket;
      b.server && (g.w.Gd = b.server);
      b.vdataUrl && (g.w.rx = b.vdataUrl);
      if ("string" === typeof a) {
        if (a =
        this.J = document.getElementById(a), !a) {
          return;
        }
      } else {
        "DIV" === a.tagName && (this.J = a);
      }
      if (this.J.sI) {
        var c = this.J.sI;
        c.B = !0;
        c.destroy();
        c.B = !1;
      }
      g.oe.Je.start({ id: this.id, J: this.J });
      this.J.sI = this;
      var c = this.C.zooms[1], d = this.C.zooms[0];
      b.zooms ? (b.zooms[0] = Math.max(d, b.zooms[0]), !0 === b.expandZoomRange && (c =
      g.l.Y ? g.l.nd ? 19 : 20 : 20), b.zooms[1] = Math.min(c, b.zooms[1])) : b.zooms = [ d, c ];
      b.forceZooms && (b.zooms = b.forceZooms);
      b = this.Sea(b);
      c = this.getSize(!0);
      b.center && (b.center = g.a.Ha(b.center));
      this.li = this.Ufa(b.crs || this.C.crs, b.center || this.C.center);
      this.lea(c, b);
      d = b.lang;
      "en" !== d && "zh_cn" !== d && "zh_en" !== d && (b.lang = "zh_cn");
      g.g.Hf || (b.rotation = 0, b.pitch = 0, b.rotateEnable = !1);
      g.l.ct ? !1 !==
      b.workerMode && (z.Yb.yr ? (b.workerMode = !1, z.Yb.yr++) : z.Yb.yr = 1) : (b.workerMode = !1, b.preloadMode =
      !1);
      b.layers && (d = b.layers, delete b.layers, b.layers = d);
      g.a.Hb(this, b);
      this.Wf(this.C);
      "rotateEnable" in b || "3D" !== b.viewMode || !g.l.ap || this.set("rotateEnable", !0);
      "pitchEnable" in b || "3D" !== b.viewMode || !g.l.ap || this.set("pitchEnable", !0);
      b.forceVector && (g.l.cf ? this.set("baseRender", "vw") : this.set("baseRender", "v"));
      b.disableVector && this.set("baseRender", "d");
      "dom" === b.renderer && (this.set("baseRender", "d"), this.set("overlayRender",
      "d"));
      b.baseRender && this.set("baseRender", b.baseRender);
      c = Math.max(c.width, c.height);
      g.l.ma && (c *= Math.min(2, window.devicePixelRatio || 1));
      "vw" === this.get("baseRender") && c > g.l.fka && this.set("baseRender", "dv");
      c = this.get("zoom", null, !0);
      d = this.get("zooms");
      c > d[1] ? c = d[1] : c < d[0] && (c = d[0]);
      this.set("zoom", c);
      this.C.zoom = c;
      this.Vfa(this.C);
      this.HL();
      var e = this;
      this.Wf({ overlays: [], infos: {}, controls: {} });
      var f = [];
      b.gridMapForeign && f.push("gridmap");
      b.forceVector && (f.push("vectorlayer"), f.push("overlay"));
      "3D" === b.viewMode && g.l.ap && f.push("Map3D");
      b.editEnable && (f.push("edit"), f.push("labelDir"));
      g.l.Vk && (f.push("AMap.IndoorMap"), -1 !== f.indexOf("Map3D") && f.push("AMap.IndoorMap3D"));
      this.ma = g.l.ma && this.get("detectRetina");
      this.x3(b);
      this.B = !1;
      this.Sja(function () {
        g.pb.Ig(f, function () {
          if (!e.get("destroy")) {
            var b = new g.Yb(a, e);
            if (g.se) {
              var c = (g.se[0] || g.se).stylemaps["50001:1"].browserStyle[0].split("&");
              b.rC = [ c[0], c[4] ];
            }
            b.ze("zoom center centerCoords rotation yaw pitch resolution".split(" "), e.view,
            !0);
            b.h("complete", function () {this.o("complete");}, e, !0);
            b.li = e.li;
            e.ze([ "zoomSlow", "panTo", "targetLevel", "render" ], b);
            b.ze([ "size", "bounds" ], e);
            e.loaded = !0;
            e.o("coreMapCreated");
            g.l.Vk && e.Pda();
            e.B = !0;
            "3D" === e.view.type && (e.AmbientLight || (e.AmbientLight =
            new g.ku.uQ([ 1, 1, 1 ], 0.9)), e.DirectionLight || (e.DirectionLight =
            new g.ku.CQ([ 0, -1, 1 ], [ 1, 1, 1 ], 0.1)));
            e.B = !1;
          }
        });
      });
    },
    Sja: function (a) {
      function b () {
        var a = AMap.anole, b = {}, c = [], d = 0, e = void 0;
        if (a) {
          for (var a = a.replace(/\?/g, ":").replace(/\//g, "&"), e = a.split(""),
               f = 0, q = e.length; f < q; f++) {
            void 0 === b[e[f]] && (b[e[f]] = d++, c.push(e[f]));
          }
          c.reverse();
          a = a.replace(/./g, function (a) {return c[b[a]];});
          g.se = eval(a);
          e = a = c = b = null;
          delete AMap.anole;
        }
      }

      if (g.l.ee || g.se) {
        a();
      } else {
        var c = !0;
        try {
          var d = JSON.parse(localStorage.getItem("_AMap_anole"));
          d && d.version === g.l.lf && d.script ? eval(d.script) : c = !1;
        } catch (e) {c = !1;}
        if (c) {
          b(), a();
        } else {
          var f = document.createElement("script");
          f.jsa = "anonymous";
          f.id = "amap_anole_js";
          f.src = g.w.Sb + "://vdata.amap.com/style?v=" + g.w.Op + "&key=" + g.w.key + "&mapstyle=normal";
          c = document;
          (c.head || c.getElementsByTagName("head")[0] || c.body).appendChild(f);
          f.onload =
          function () {
            if (!g.se) {
              if (g.l.Fq) {
                var c = {
                  version: g.l.lf,
                  script: "AMap['anole']=" + JSON.stringify(AMap.anole)
                };
                localStorage.setItem("_AMap_anole", JSON.stringify(c));
              }
              b();
            }
            a();
            f.parentNode.removeChild(f);
          };
        }
      }
    },
    getViewMode_: function () {return this.view.type;},
    vha: function (a, b, c) {
      var d = new g.U(a[4], a[5]);
      if ((a = new g.le(a[0], a[1], a[2], a[3])) && b && d) {
        for (var e = c[1]; e > c[0]; e -= 1) {
          var f = this.ac(a.pc, e), h = this.ac(a.$b, e);
          if (Math.abs(h.x -
          f.x) < b.width && Math.abs(f.y - h.y) < b.height) {
            break;
          }
        }
        return [ d, Math.min(e + 1, c[1]) ];
      }
      return null;
    },
    lea: function (a, b) {
      if (!(b && b.center && b.zoom)) {
        var c = this.vha(g.w.Ld, a, b.zooms);
        b.center = b.center || c && c[0];
        "number" !== typeof b.zoom && (b.zoom = c && c[1]);
      }
    },
    Ufa: function (a, b) {
      if (b instanceof g.U) {
        if ("string" === typeof a) {
          switch (a) {
            case "EPSG3395":
              return g.lh.DQ;
            case "EPSG4326":
              return g.lh.EQ;
          }
          return g.lh.KH;
        }
        if (a.pointToLngLat && a.lngLatToPoint) {
          return {
            aB: a.pointToLngLat,
            AA: a.lngLatToPoint,
            wo: a.getResolution
          };
        }
        throw"illegal projection";
      }
      var c = this.get("zoom", null, !0);
      return { wo: function (a) {return Math.pow(2, c - a);}, AA: function () {}, aB: function () {} };
    },
    Mna: function (a, b) {
      this.su && this.su.stop();
      var c = [ "pitch", "rotation", "zoom", "center" ], d = {}, e = !1, f;
      for (f in a) {
        if (a.hasOwnProperty(f) && -1 !== g.a.indexOf(c, f)) {
          var h = this.get(f);
          void 0 === h || h === a[f] || h.eb && h.eb(a[f]) || (d[f] = this.get(f), e = !0);
        }
      }
      e && (this.su = new g.Fi(d, a, null, 0), this.su.transition = function (a, c, e) {
        e /= b || 300;
        if (1 <= e) return c;
        var f = {}, h;
        for (h in d) {
          d.hasOwnProperty(h) && (f[h] = "center" ===
          h ? a[h].add(c[h].Wa(a[h]).Fd(e)) : a[h] + (c[h] - a[h]) * e);
        }
        return f;
      }, this.su.Lo = function (b) {
        b === a && (this.su.stop(), this.od = null);
        for (var c in b) {
          b.hasOwnProperty(c) && ("center" === c
          ? (this.B = !0, this.setCenter(b[c], !0), this.B = !1)
          : this.set(c, b[c]));
        }
      }, this.su.jm(this));
    },
    Vfa: function (a) {
      "3D" === this.get("viewMode") && g.l.ap ? (this.set("baseRender", "vw"), this.view =
      new g.hI(this, a)) : this.view = new g.mC(this, a);
      this.QZ();
    },
    QZ: function () {this.Ih = "d" < this.get("baseRender") || "3D" === this.view.type;},
    featuresChanged: function () {this.HL();},
    ZN: function () {
      this.HL();
      this.wP();
    },
    wP: function () {
      if (this.Tk) {
        var a = !0;
        this.B = !0;
        var b = this.getMapStyle();
        if (!1 === this.get("showIndoorMap") || "normal" !== b && "amap://styles/normal" !== b) a = !1;
        b = this.getLayers();
        this.B = !1;
        for (var c in b) b.hasOwnProperty(c) && "AMap.IndoorMap" === b[c].CLASS_NAME && b[c] !== this.Tk && (a = !1);
        this.Tk.getMap() !== this && this.Tk.setMap(this);
        this.Tk.set("visible", a);
      }
    },
    HL: function () {
      this.x3();
      if (this.view && "3D" !== this.view.type) {
        var a = this.get("baseRender");
        if (a && !("dv" < a)) {
          var b = this.get("features",
          null, !0);
          this.B = !0;
          var c = this.getMapStyle();
          this.B = !1;
          var d = this.get("editEnable");
          b && c && (g.l.uE && (d || "all" !== b || "normal" !== c && "amap://styles/normal" !== c)
          ? (this.set("baseRender", "v"), this.uO = a)
          : this.uO && (this.set("baseRender", this.uO), this.uO = null));
          this.QZ();
        }
      }
    },
    Pda: function () {
      var a = this;
      !a.Tk && a.J && (a.indoorMap =
      a.Tk = new AMap.IndoorMap({ innerLayer: !0 }), a.wP(), g.a.Fc(function () {
        a.o("indoor_create", { target: a });
        a.set("display");
      }));
    },
    layersChanged: function () {
      this.B = !0;
      var a = this.getLayers();
      this.cG = this.B =
      !1;
      for (var b = 0; b < a.length; b += 1) {
        a[b].B = !0, a[b].getMap() !== this && a[b].setMap(this), a[b].B =
        !1, a[b].cG && (this.cG = !0);
      }
      this.wP();
    },
    getMapNumber: function () {if (this.map) return this.map.eB();},
    getAdcode: function () {
      g.c.add(this, "getAdcode");
      return g.w.Nda;
    },
    x3: function () {
      function a () {
        var a = !1;
        g.a.Lb(b.C.layers, function (b) {if (!b.BJ && b.constructor === z.q.ib) return a = !0, !1;}, b);
        if (g.a.ga([ "d", "dv" ], b.get("baseRender")) || !g.a.ga([
          "normal",
          "amap://styles/normal"
        ], b.get("mapStyle")) || "3D" === b.get("viewMode") && 0 < b.get("pitch") ||
        "all" !== b.get("features") || b.get("editEnable") || !b.get("turboMode")) {
          a = !1;
        }
        return a;
      }

      if (!this.l1) {
        var b = this, c = a(), d = this.get("rasterLayer");
        if (d && !c) {
          this.fj(d), this.set("rasterLayer", void 0);
        } else if (!d && c && this.get("layers")) {
          d = new z.q.ib({ innerLayer: !0, map: this, ej: !0, zIndex: 0 });
          d.lja = !0;
          if (this.C.layers) {
            var e = null;
            g.a.Lb(this.C.layers, function (a) {
              a instanceof z.q.ib && !a.BJ && (null === e || a.get("zIndex") > e.get("zIndex")) && (e =
              a);
            });
            e && d.ze([ "zIndex", "opacity", "zooms", "visible" ], e);
          }
          this.set("rasterLayer",
          d, !0);
        }
      }
    },
    Sea: function (a) {
      a || (a = {});
      if (a.hasOwnProperty("defaultLayer")) {
        a.layers = [ a.defaultLayer ];
        var b = a.defaultLayer;
        b.kL = !0;
        this.set("defaultLayer", b, !0);
      }
      a.layers && 0 !== a.layers.length ? this.set("defaultLayer", a.layers[0], !0) : (b =
      new z.q.ib({ innerLayer: !0 }), a.layers = [ b ], b.kL = !0, this.set("defaultLayer", b, !0));
      if (b = a.view) {
        b.C.rotation && (a.rotation = b.C.rotation), b.C.center && (a.center =
        b.C.center), b.C.zoom && (a.zoom = Math.max(a.zooms[0], Math.min(a.zooms[1], b.C.zoom))), b.C.crs && (a.crs =
        b.C.crs);
      }
      a.level && !a.zoom &&
      (a.zoom = a.level);
      return a;
    },
    setLimitBounds: function (a) {
      g.c.add(this, "setLimitBounds");
      a instanceof g.zn && (a.B = !0, a = a.toBounds(), a.B = !1);
      a instanceof g.le || (a = null);
      this.set("limitBounds", a);
    },
    clearLimitBounds: function () {
      g.c.add(this, "clearLimitBounds");
      this.set("limitBounds", null);
    },
    getLimitBounds: function () {
      g.c.add(this, "getLimitBounds");
      return this.get("limitBounds", null, !0);
    },
    fE: function (a) {
      var b = this.get("layers");
      0 <= g.a.indexOf(b, a) || (b.push(a), this.set("layers", b));
    },
    sz: function (a) {
      var b = this.get("overlays");
      0 <= g.a.indexOf(b, a) || (a instanceof z.A.pm
      ? (this.get("overlays")
      .push(a), this.zv instanceof z.A.pm && (this.zv.B = !0, this.zv.close(), this.zv.B = !1), this.zv =
      a, this.set("contextmenu", a, !0))
      : (a instanceof z.A.ye && (this.Uk instanceof z.A.ye && this.Kw(this.Uk), this.Uk = a), this.get("overlays")
      .push(a)), this.o("overlays"));
    },
    fj: function (a) {
      var b = this.get("layers");
      a = g.a.indexOf(b, a);
      -1 !== a && this.set("layers", g.a.Um(b, a));
    },
    Kw: function (a) {
      var b = this.get("overlays");
      this.set("overlays", g.a.Um(b, g.a.indexOf(b, a)));
    },
    getTileCoordByLngLat: function (a, b, c) {
      b = b || 256;
      this.B = !0;
      c = c || Math.round(this.getZoom());
      this.B = !1;
      a = this.ac(a, c);
      c = new g.qm(c, Math.floor(a.x / b), Math.floor(a.y / b));
      c.Wz = a.x % b;
      c.Xz = a.y % b;
      return c;
    },
    setZoom: function (a, b) {
      g.c.add(this, "setZoom");
      a = this.Zz(a);
      var c = this.get("zooms");
      a > c[1] && (a = c[1]);
      a < c[0] && (a = c[0]);
      this.get("zoomEnable") && (b || !this.loaded
      ? (this.set("zoom", a), this.o("zoomstart"), this.o("zoomchange"), this.o("zoomend"))
      : this.set("zoomSlow", a));
    },
    getZoom: function () {
      g.c.add(this, "getZoom");
      return this.Zz(this.get("targetLevel") || this.get("zoom", null, !0));
    },
    getCenter: function () {
      g.c.add(this, "getCenter");
      return this.get("center", null, !0);
    },
    setCenter: function (a, b) {
      g.c.add(this, "setCenter");
      a = g.a.Ha(a);
      b || !this.loaded ? (this.o("movestart"), this.set("center", a), this.o("mapmove"), this.map
      ? this.map.o("moveend")
      : this.o("moveend")) : (this.B = !0, this.panTo(a), this.B = !1);
    },
    getCoordsBound: function () {return this.view.Nk();},
    getCoordsBoundByZoom: function (a) {return this.view.sha(a);},
    setRotation: function () {
      var a =
      0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
      g.c.add(this, "setRotation");
      !g.l.ee && this.get("rotateEnable") && this.set("rotation", a);
    },
    getRotation: function () {
      g.c.add(this, "getRotation");
      return this.get("rotation");
    },
    setPitch: function (a) {
      g.c.add(this, "setPitch");
      a = Math.min(this.get("maxPitch"), Math.max(a, 0));
      "3D" === this.view.type && this.get("pitchEnable") && this.set("pitch", a);
    },
    getPitch: function () {
      g.c.add(this, "getRotation");
      return "3D" === this.view.type ? this.get("pitch") : 0;
    },
    getStatus: function () {
      g.c.add(this,
      "getStatus");
      for (var a = "isHotspot pitchEnable dragEnable zoomEnable keyboardEnable jogEnable doubleClickZoom scrollWheel resizeEnable touchZoom rotateEnable animateEnable".split(" "), b = {}, c = 0; c < a.length; c +=
      1) {
        b[a[c]] = this.get(a[c], null, !0);
      }
      return b;
    },
    setStatus: function (a) {
      g.c.add(this, "setStatus");
      for (var b in a) {
        a.hasOwnProperty(b) && -1 !== "isHotspot,pitchEnable,dragEnable,keyboardEnable,doubleClickZoom,scrollWheel,zoomEnable,jogEnable,continuousZoomEnable,resizeEnable,animateEnable,rotateEnable,touchZoom".indexOf(b) &&
        this.set(b, a[b]);
      }
    },
    getResolution: function (a, b) {
      g.c.add(this, "getResolution");
      var c = (a = g.a.Ha(a)) ? a.P : this.get("center", null, !0).P;
      return this.li.wo(b || this.get("zoom")) * Math.cos(c * Math.PI / 180);
    },
    getScale: function (a) {
      g.c.add(this, "getScale");
      this.B = !0;
      a = this.getResolution() * (a || 96) / 0.0254;
      this.B = !1;
      return a;
    },
    getDefaultCursor: function () {
      g.c.add(this, "getDefaultCursor");
      return this.get("defaultCursor", null, !0) || "url(" + g.w.Db + "/theme/v1.3/openhand.cur),default";
    },
    setDefaultCursor: function (a) {
      g.c.add(this,
      "setDefaultCursor");
      return this.set("defaultCursor", a, !0);
    },
    zoomIn: function (a) {
      g.c.add(this, "zoomIn");
      this.B = !0;
      this.setZoom(this.getZoom() + 1, a);
      this.B = !1;
    },
    zoomOut: function (a) {
      g.c.add(this, "zoomOut");
      this.B = !0;
      this.setZoom(this.getZoom() - 1, a);
      this.B = !1;
    },
    Zz: function (a) {return this.view && "3D" === this.view.type ? g.a.jd(a, 4) : Math.round(a);},
    setZoomAndCenter: function (a, b, c) {
      g.c.add(this, "setZoomAndCenter");
      b = g.a.Ha(b);
      a = this.Zz(a);
      var d = this.get("zooms");
      a > d[1] && (a = d[1]);
      a < d[0] && (a = d[0]);
      this.B = !0;
      this.loaded ?
      this.set("zoomAndCenter", [ a, b, c ]) : (this.setZoom(a, !0), this.setCenter(b, !0));
      this.B = !1;
    },
    clearMap: function () {
      g.c.add(this, "clearMap");
      for (var a = this.get("overlays"), b = 0; b < a.length; b += 1) a[b].set("map", null, !0);
      this.set("overlays", []);
      if (this.map && this.map.xa) {
        for (a = this.map.xa, b = a.length - 1; 0 <= b; b -=
        1) {
          if (a[b].X instanceof z.q.LH) {
            var c = a[b].X;
            c.B = !0;
            c.setMap(null);
            c.B = !1;
          }
        }
      }
    },
    destroy: function () {
      g.c.add(this, "destroy");
      this.Tk && (this.Tk.setMap(), this.indoorMap = this.Tk = null);
      this.set("overlays", []);
      this.set("layers",
      []);
      var a = this.get("controls");
      a.remove = [];
      for (var b in a.kd) a.kd.hasOwnProperty(b) && a.remove.push(a.kd[b]);
      a.kd = [];
      a.add = [];
      this.set("controls", a);
      this.set("destroy", !0);
      this.sa = !1;
      this.gp();
      this.J = null;
      z.Yb.yr--;
    },
    addControl: function (a) {
      g.c.add(this, "addControl");
      var b = g.a.Tb(a), c = this.get("controls") || {};
      c.kd = c.kd || {};
      c.kd[b] || (c.kd[b] = a);
      c.add = c.add || [];
      c.add.push(a);
      this.set("controls", c);
    },
    removeControl: function (a) {
      g.c.add(this, "removeControl");
      var b = g.a.Tb(a), c = this.get("controls") || {};
      c.kd =
      c.kd || {};
      c.kd[b] && delete c.kd[b];
      c.remove = c.remove || [];
      c.remove.push(a);
      this.set("controls", c);
    },
    clearControl: function () {
      g.c.add(this, "clearControl");
      var a = this.get("controls") || {};
      a.remove = a.remove || [];
      a.kd = a.kd || {};
      for (var b in a.kd) a.kd.hasOwnProperty(b) && (a.remove.push(a.kd[b]), delete a.kd[b]);
      this.set("controls", a);
    },
    plugin: function (a, b) {
      g.c.add(this, "setPitch");
      "string" === typeof a && (a = [ a ]);
      g.pb.Ig(a, b);
      return this;
    },
    clearInfoWindow: function () {
      g.c.add(this, "clearInfoWindow");
      var a = this.get("overlays");
      a && 0 !== a.length && this.Uk && (this.Uk.B = !0, this.Uk.close(), this.Uk.B = !1);
    },
    remove: function (a) {
      g.c.add(this, "remove");
      a instanceof Array || (a = [ a ]);
      for (var b = 0; b < a.length; b += 1) {
        var c = a[b];
        c.B = !0;
        c.getMap && c.getMap() === this && (c.close ? c.close() : c.setMap && c.setMap(null));
        c.B = !1;
      }
    },
    add: function (a) {
      g.c.add(this, "add");
      a instanceof Array || (a = [ a ]);
      for (var b = 0; b < a.length; b += 1) {
        var c = a[b];
        c.B = !0;
        if (c.getMap && c.getMap() !== this) if (c.open) continue; else c.setMap && c.setMap(this);
        c.B = !1;
      }
    },
    getAllOverlays: function (a, b) {
      g.c.add(this,
      "getAllOverlays");
      var c = this.get("overlays");
      if (a) {
        for (var d = "amap." + a.toLowerCase(), e = [], f = 0; f < c.length; f +=
        1) {
          d !== c[f].CLASS_NAME.toLowerCase() || !b && (c[f].qa || c[f].isOfficial) || e.push(c[f]);
        }
        return e;
      }
      if (!b) {
        e = [];
        for (f = 0; f < c.length; f += 1) c[f].qa || c[f].isOfficial || e.push(c[f]);
        c = e;
      }
      d = this.get("layers");
      e = [];
      if (d) for (var f = 0, h = d.length; f < h; f += 1) d[f] instanceof z.q.LH && e.push(d[f]);
      return c.concat(e);
    },
    triggerResize: function () {this.map && this.map.CK();},
    refreshSize: function () {this.BC = this.zha();},
    zha: function () {return g.g.JY(this.J);},
    getSize: function () {
      g.c.add(this, "getSize");
      (!this.BC || 10 > this.BC.width * this.BC.height) && this.refreshSize();
      return this.BC;
    },
    getContainer: function () {
      g.c.add(this, "getContainer");
      return this.J;
    },
    panTo: function (a) {
      g.c.add(this, "panTo");
      a = g.a.Ha(a);
      this.loaded ? this.set("panTo", a) : (this.B = !0, this.setCenter(a), this.B = !1);
    },
    panBy: function (a, b, c) {
      g.c.add(this, "panBy");
      this.B = !0;
      var d = this.get("rotation") * Math.PI / 180, e = a * Math.cos(d) + Math.sin(d) * b;
      a = -Math.sin(d) * a + Math.cos(d) * b;
      b = this.loaded && this.map && this.map.od ?
      this.map.od.K2 : this.get("centerCoords");
      d = Math.pow(2, 20 - this.getZoom());
      e = b.add(new g.G(-e * d, -a * d));
      e = this.we(e);
      !this.loaded || c ? this.setCenter(e, c) : this.set("panTo", e);
      this.B = !1;
    },
    setFitView: function (a, b, c, d) {
      g.c.add(this, "setFitView");
      this.B = !0;
      var e = this.get("size"), f = e.height;
      if (!e.width || !f) return !0;
      if (a = this.ZY(a)) {
        if (c = this.jF(a, 0, new g.G(40, 40), c, d)) {
          b =
          b || !this.getBounds()
          .contains(a.$g()) || g.l.Y && 1 < Math.abs(c[0] + this.get("zoom", null, !0)), this.setZoomAndCenter(c[0], c[1], b);
        }
        this.B = !1;
        return a;
      }
    },
    ZY: function (a) {
      if (a) {
        if (a instanceof z.A.qh) {
          a =
          [ a ];
        } else {if (!(a instanceof Array)) return null;}
      } else {
        this.B = !0, a = this.getAllOverlays(), this.B = !1;
      }
      if (a) {
        for (var b, c = 0; c < a.length; c += 1) {
          var d = a[c];
          if (d.get("visible") && !(d instanceof z.A.ye || d instanceof z.A.pm)) {
            d.B = !0;
            var e = d.getBounds();
            d.B = !1;
            e && (b = b ? e.hpa(b) : e);
          }
        }
        return b;
      }
    },
    getBounds: function (a) {
      g.c.add(this, "getBounds");
      var b = this.view.bd();
      return a && b.toBounds ? (b.B = !0, a = b.toBounds(), b.B = !1, a) : b;
    },
    setBounds: function (a, b, c, d, e, f) {
      g.c.add(this, "setBounds");
      c = this.jF(a, b, c, e, f);
      d = d || g.l.Y && 1 < Math.abs(c[0] + b - this.get("zoom", null, !0));
      this.B = !0;
      this.setZoomAndCenter(c[0], c[1], d);
      this.B = !1;
      return a;
    },
    PY: function (a, b, c, d, e) {
      a = this.ZY(a);
      return this.jF(a, b, c, d, e);
    },
    getCoordsBoundByZoomIn3D: function (a) {
      this.iE || (this.iE = new g.hI);
      this.B = !0;
      var b = this.getRotation(), c = this.getPitch(), d = this.getSize(!0).jb();
      this.B = !1;
      a = { size: d, zoom: a, rotation: b, pitch: c, centerCoords: this.get("centerCoords") };
      this.iE.Wf(a, !0);
      this.iE.jp();
      return this.iE.Nk();
    },
    jF: function (a, b, c,
                  d, e) {
      b = b ? Number(b) : 0;
      this.B = !0;
      var f = this.getRotation(), h = this.getPitch(), k = this.getSize(!0).jb(), l = this.view.type;
      this.B = !1;
      var m = a.FM(this);
      a = a.IM(this);
      this.vz || (this.vz = "3D" === l ? new g.hI : new g.mC);
      this.vz.Wf({ size: k, zoom: 3, rotation: f, pitch: h, centerCoords: m }, !0);
      var n = h = 0;
      d ? (n = d[0], c = d[1], h = d[2], d = d[3], k.width -= h + d, k.height -= n + c, h = (h - d) / 2, n =
      (n - c) / 2) : c && (k.width -= 2 * c.x, k.height -= 2 * c.y);
      e = e || (g.l.Y ? 17 : 18);
      c = this.get("zooms");
      d = c[0];
      var p = Infinity, q = Infinity;
      do {
        this.vz.Wf({ zoom: d }, !0);
        "3D" === l && this.vz.jp();
        for (var q = p = Infinity, s = -Infinity, r = -Infinity, u = 0; u < a.length; u +=
        1) {
          var w = this.vz.ve(a[u]),
          p = Math.min(p, w.x),
          s = Math.max(s, w.x),
          q = Math.min(q, w.y),
          r = Math.max(r, w.y);
        }
        p = s - p;
        q = r - q;
        if (p > k.width || q > k.height) {
          d -= 1;
          break;
        }
        d += 1;
      } while (d <= c[1]);
      d = Math.min(c[1], e, Math.max(c[0], d + b));
      d = Math.floor(d);
      b = Math.pow(2, 20 - d);
      e = f * Math.PI / 180;
      f = h * Math.cos(e) + Math.sin(e) * n;
      e = -Math.sin(e) * h + Math.cos(e) * n;
      m = m.Wa(new g.G(f * b, e * b));
      m = this.kh(m, 20);
      return [ d, m ];
    },
    setLayers: function (a) {
      g.c.add(this, "setLayers");
      for (var b = 0; b < a.length; b +=
      1) {
        a[b].set("map", this, !0);
      }
      this.set("layers", a);
    },
    getLayers: function () {
      g.c.add(this, "getLayers");
      return this.get("layers", null, !0);
    },
    getDefaultLayer: function () {
      g.c.add(this, "getDefaultLayer");
      return this.get("defaultLayer", null, !0);
    },
    setDefaultLayer: function (a) {
      g.c.add(this, "setDefaultLayer");
      this.B = !0;
      a.kL = !0;
      var b = this.get("defaultLayer"), c = this.get("layers");
      if (b) {
        if (a === b) return;
        b.kL = !1;
        c = g.a.Um(c, g.a.indexOf(c, b));
      }
      this.set("defaultLayer", a, !0);
      c.push(a);
      this.setLayers(c);
      this.B = !1;
    },
    pixelToLngLat: function (a,
                             b) {
      g.c.add(this, "pixelToLngLat");
      return this.kh(a, b);
    },
    lnglatToPixel: function (a, b) {
      g.c.add(this, "lnglatToPixel");
      return this.ac(a, b);
    },
    drawPolyline: function (a) {
      g.c.add(this, "drawPolyline");
      this.set("draw", "polyline");
      this.set("drawStyle", a || { strokeColor: "#006600", gb: 0.9 });
    },
    render: function (a) {
      g.c.add(this, "render");
      this.map && this.map.set("display", a ? 1 : 0);
    },
    setMask: function (a) {
      g.c.add(this, "setMask");
      this.set("mask", a);
      this.map && this.map.set("display");
    },
    drawPolygon: function (a) {
      g.c.add(this, "drawPolygon");
      this.set("draw", "polygon");
      this.set("drawStyle", a || { strokeColor: "#006600", gb: 0.9, fillColor: "#FFAA00", Od: 0.9 });
    },
    drawCircle: function (a) {
      g.c.add(this, "drawCircle");
      this.set("draw", "circle");
      this.set("drawStyle", a || { strokeColor: "#006600", gb: 0.9, fillColor: "#006600", Od: 0.9 });
    },
    sF: function () {return this.view.sF();},
    getCameraState: function () {
      g.c.add(this, "getCameraState");
      if (this.view && "3D" == this.view.type) return this.view.IY();
    },
    endDraw: function () {this.set("draw", null);},
    isGoogleTileVisible: function () {
      return this.map &&
      this.map.DJ();
    },
    ve: function (a, b, c) {
      g.c.add(this, "p20ToContainer");
      return this.view.ve(a, b, c);
    },
    Mf: function (a, b, c) {
      g.c.add(this, "containerToP20");
      return this.view.Mf(a, b, c);
    },
    getObject3DByContainerPos: function (a, b, c) {
      g.c.add(this, "getObject3DByContainerPos");
      if ("2D" === this.view.type || !this.map || !this.map.O) return null;
      this.B = !0;
      this.view.Mf(a);
      var d = this.view.LY(a),
      e = this.map.O.NO,
      f = this.view.Jc,
      h = this.get("zoom", null, !0),
      h = Math.pow(2, 20 - h);
      b = b || this.getLayers();
      this.B = !1;
      for (var k = [], l = 0; l < b.length; l +=
      1) {
        var m = b[l];
        m instanceof z.q.jk && (m = m.un(e, d, f, h, a)) && k.push(m);
      }
      return c ? k : k.length ? (k.sort(function (a, b) {return a.Dd - b.Dd;}), {
        index: k[0].index,
        point: k[0].$A,
        distance: k[0].Dd,
        object: k[0].object
      }) : null;
    }
  });
  z.Yb.Dg({
    RF: "lngLatToGeodeticCoord",
    pha: "geodeticCoordToLngLat",
    jF: "getFitZoomAndCenterByBounds",
    PY: "getFitZoomAndCenterByOverlays",
    Eq: "lnglatTocontainer",
    lnglatTocontainer: "lngLatToContainer",
    fo: "containTolnglat",
    containTolnglat: "containerToLngLat",
    Pb: "lngLatToP20",
    we: "p20ToLngLat",
    ve: "p20ToContainer",
    Mf: "containerToP20",
    ac: "project",
    kh: "unproject"
  });
  z.Yb.wb({
    isHotspotChanged: function () {
      if ("undefined" !== typeof this.hA && (this.ofa(), this.get("isHotspot"))) {
        var a = this.get("layers", null, !0);
        a && a.length && !this.hA && this.cG && this.ala();
      }
    }, ala: function () {
      if (this.Xi) {
        this.IZ();
      } else {
        var a = this;
        this.B = !0;
        this.plugin("AMap.HotSpot", function () {
          if (!a.hA) {
            if (!a.Xi) {
              var b = new g.oh;
              new z.A.ye({ innerOverlay: !0 });
              a.Xi = b;
            }
            a.IZ();
          }
        });
        this.B = !1;
      }
    }, ofa: function () {this.Xi && this.Cia();}, x0: function (a) {
      a.type = "hotspotover";
      a.isIndoorPOI = !1;
      this.o("hotspotover", a);
    }, v0: function (a) {
      a.type =
      "hotspotclick";
      a.isIndoorPOI = !1;
      this.o("hotspotclick", a);
    }, w0: function (a) {
      a.type = "hotspotout";
      a.isIndoorPOI = !1;
      this.o("hotspotout", a);
    }, IZ: function () {
      var a = this.Xi;
      this.Xi.B = !0;
      this.Xi.setMap(this);
      this.Xi.B = !1;
      a.h("mouseover", this.x0, this);
      a.h("click", this.v0, this);
      a.h("mouseout", this.w0, this);
    }, Cia: function () {
      var a = this.Xi;
      a.I("mouseover", this.x0, this);
      a.I("click", this.v0, this);
      a.I("mouseout", this.w0, this);
      this.Xi.B = !0;
      this.Xi.setMap(null);
      this.Xi.B = !1;
      this.Xi = null;
    }
  });
  z.event = {
    V: function (a, b, c, d) {
      g.D.h(a, b, c, d);
      return new g.TB(0, a, b, c, d);
    },
    Qda: function () {},
    addListener: function (a, b, c, d) {
      g.a.Hh(a.addListener) ? a.addListener(b, c, d) : (a.Vd || (a.Vd =
      g.na.Vd), g.na.h.call(a, b, c, d));
      return new g.TB(1, a, b, c, d);
    },
    nv: function (a, b, c, d) {
      g.a.Hh(a.nv) ? a.nv(b, c, d) : (a.Vd || (a.Vd = g.na.Vd), g.na.h.call(a, b, c, d, !0));
      return new g.TB(1, a, b, c, d);
    },
    xE: function (a) {g.a.Hh(a.xE) ? a.xE() : g.na.Pi.call(a);},
    qs: function (a, b) {g.a.Hh(a.qs) ? a.qs(b) : g.na.Pi.call(a, b);},
    removeListener: function (a) {
      a instanceof
      g.TB && (g.a.Hh(a.vi.removeListener) ? a.vi.removeListener(a) : 0 === a.type
      ? g.D.I(a.vi, a.mM, a.nN, a.Ze)
      : 1 === a.type && (a.vi.Vd || (a.vi.Vd = g.na.Vd), g.na.I.call(a.vi, a.mM, a.nN, a.Ze)));
    },
    M: function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      g.a.Hh(a.M) ? a.M.apply(a, c) : (a.Vd || (a.Vd = g.na.Vd), g.na.o.apply(a, c));
    }
  };
  g.TB = g.Z.extend({
    r: function (a, b, c, d, e) {
      this.type = a;
      this.vi = b;
      this.mM = c;
      this.nN = d;
      this.Ze = e;
    }
  });
  var nc = {
    V: "addDomListener",
    Qda: "addDomListenerOnce",
    addListener: "addListener",
    nv: "addListenerOnce",
    xE: "clearInstanceListeners",
    qs: "clearListeners",
    removeListener: "removeListener",
    M: "trigger"
  }, oc;
  for (oc in nc) nc.hasOwnProperty(oc) && (z.event[nc[oc]] = z.event[oc]);
  g.event = z.event;
  z.q.Hc = g.Z.extend({
    ga: [ g.na, g.Ie ],
    r: function (a) {
      (new Date).getTime();
      this.CLASS_NAME = this.CLASS_NAME || "AMap.Layer";
      g.a.Hb(this, a);
      this.C.map && (a = this.C.map, delete this.C.map, this.C.map = a);
      this.Wf(this.C);
    },
    getContainer: function () {
      g.c.add(this, "getContainer");
      if (this.q && this.q.N) return this.q.N.Ui();
    },
    getZooms: function () {return this.get("zooms", null, !0);},
    setOpacity: function (a) {
      g.c.add(this, "setOpacity");
      a !== this.get("opacity", null, !0) && this.set("opacity", a);
    },
    getOpacity: function () {
      return this.get("opacity",
      null, !0);
    },
    show: function () {
      g.c.add(this, "show");
      this.set("visible", !0);
      this.Lq && this.q.e.layersChanged();
    },
    hide: function () {
      g.c.add(this, "hide");
      this.set("visible", !1);
      this.Lq && this.q.e.layersChanged();
    },
    setMap: function (a) {
      g.c.add(this, "setMap");
      var b = this.get("map");
      a ? (b && a !== b && b.fj(this), this.set("map", a)) : b && (b.fj(this), this.set("map", null, !0), this.gi =
      !1, this.Uf && this.Uf());
    },
    getMap: function () {
      g.c.add(this, "getMap");
      return this.get("map", null, !0);
    },
    mapChanged: function () {
      var a = this.get("map");
      a && a.fE(this);
    },
    setzIndex: function (a) {
      g.c.add(this, "setzIndex");
      this.set("zIndex", a);
    },
    getzIndex: function () {return this.get("zIndex", null, !0);}
  });
  z.q.ib = z.q.Hc.extend({
    C: {
      tileSize: 256,
      visible: !0,
      opacity: 1,
      zIndex: 0,
      noLimg: 1,
      zooms: [ 3, 20 ],
      getTileUrl: g.l.Y ? g.w.zB : g.w.FA,
      errorUrl: g.a.Pga,
      detectRetina: !0,
      className: "amap-layer",
      mapNumber: "",
      merge: !1,
      sort: !1,
      cacheSize: g.l.size
    }, r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.TileLayer";
      g.c.ra(this, a);
      (a = a || {}) && a.tileUrl && (a.getTileUrl = a.tileUrl);
      this.Zea(a);
      var b = a.zooms;
      b && b[1] >= this.Vj[0]
      ? (b[0] < this.Vj[0] && (b[0] = this.Vj[0]), b[1] > this.Vj[1] && (b[1] = this.Vj[1]))
      : a.zooms = [ this.Vj[0], this.Vj[1] ];
      arguments.callee.oa.call(this, a);
      a.ej && (this.ej = !0);
      this.BJ = !this.at();
    }, setTextIndex: function (a) {
      g.c.add(this, "setTextIndex");
      this.set("textIndex", a);
    }, at: function () {
      if (this.get("createTile")) return !1;
      var a = this.get("getTileUrl");
      return a && a !== g.w.FA && a !== g.w.zB ? !1 : !0;
    }, wX: function () {
      if (!this.at()) return !1;
      var a = this.get("map");
      return a && a.Ih && "zh_cn" === a.get("lang") && !this.noVector ? !0 : !1;
    }, dZ: function (a) {
      var b = g.w.WF;
      g.l.ma && this.get("detectRetina") && (b = g.w.WF.replace("scl=1", "scl=2"));
      a && (b = b.replace("ltype=3",
      "ltype=11"));
      return b;
    }, yg: function (a) {
      var b = this.wX(), c = this.get("map");
      this.at() && this.set("mapNumber", "GS(2018)1709");
      if (this.ej) return new g.q.ib(this, a, this.yp(this.dZ(!0)), this.C.maxDataZoom, !0);
      if (b) {
        if (this.Lq = !0, g.q.rh) {
          if ("dv" === c.get("baseRender") && !this.get("watermark")) {
            var b = c.get("showBuildingBlock"), d = new g.q.ib(this, a, this.yp(this.dZ(!b)), void 0, !0);
            b && (d.ak = new g.q.qd(new z.q.ib({ zooms: [ 16, 20 ], innerLayer: !0 }), a, [ "building" ]), d.ak.type =
            "\u697c\u5757\u56fe\u5c42", d.ak.ze([
              "visible",
              "opacity", "zIndex"
            ], d, !0), d.ak.zz(c.get("mapStyle") || "normal"));
            d.type = "\u6805\u683c\u5e95\u56fe";
            return d;
          }
          if ("v" <= c.get("baseRender") || this.get("watermark")) {
            return "3D" == a.F.view.type ? (c =
            new g.q.qd(this, a, [ "region", "road" ]), c.type = "\u77e2\u91cf\u5e95\u56fe", b =
            new z.q.ib({ zooms: [ 17, 20 ], zIndex: 50, innerLayer: !0 }), c.ak =
            new g.q.qd(b, a, [ "building" ]), c.ak.Se = 17, c.ak.type = "\u697c\u5757\u56fe\u5c42", c.ak.dw =
            1, c.ak.ze([ "visible", "merge", "sort", "opacity" ], c, !0), b.W("rejectMapMask", this, !0)) : (c =
            new g.q.qd(this,
            a, [ "region", "building", "road" ]), c.type = "\u77e2\u91cf\u5e95\u56fe"), a.rea = c;
          }
        } else {
          return [ "vectorlayer", "overlay" ];
        }
      } else {
        return this.Lq =
        !1, new g.q.ib(this, a, null, this.C.maxDataZoom);
      }
    }, getTileUrlChanged: function () {
      var a = this.get("getTileUrl");
      if (a === g.w.FA || a === g.w.zB || a === g.w.LG) this.cG = !0;
      "string" === typeof a && (a = this.yp(a));
      this.set("tileFun", a);
    }, Zea: function (a) {
      this.Vj || (this.Vj = [ this.C.zooms[0], this.C.zooms[1] ]);
      var b;
      a.hasOwnProperty("detectRetina") && !1 === a.detectRetina && (b = !0);
      g.l.Y && g.l.ma && this.C.detectRetina &&
      !b && (this.Vj[1] -= 1);
    }, getTiles: function () {
      g.c.add(this, "getTiles");
      var a = this.get("tiles", null, !0);
      if (a && a.length) a = a[0]; else return [];
      for (var b = [], c, d = 0; d < a.length; d += 1) {
        a[d].key && (c =
        a[d].key.split("/"), b.push("" + c[1] + "," + c[2]));
      }
      return b;
    }, reload: function () {
      g.c.add(this, "reload");
      this.set("reload", 1);
    }, So: function () {
      this.B = !0;
      var a = this.get("map", null, !0);
      this.setMap(null);
      this.gi = !1;
      this.setMap(a);
      this.B = !1;
    }, setTileUrl: function (a) {
      g.c.add(this, "setTileUrl");
      this.wX() ? (this.set("getTileUrl", a), this.So()) :
      this.set("getTileUrl", a);
    }, yp: function (a) {
      var b = this, c, d, e;
      return function (f, h, k) {
        f = (f + Math.pow(2, k)) % Math.pow(2, k);
        if ("number" !== typeof (f + h + k)) return null;
        var l = b.get("map"), m = "zh_cn";
        l && (m = l.get("lang") || "zh_cn");
        k = a.replace("[x]", f).replace("[y]", h).replace("[z]", k).replace("[lang]", m);
        if (!c) {
          if (d = a.match(/\{.*\}/)) e = d.toString().replace("{", "").replace("}", ""), e = e.split(",");
          c = !0;
        }
        e && e.length && (k = k.replace(d, e[Math.abs(f + h) % e.length]));
        return k;
      };
    }, getTileUrl: function (a, b, c) {
      g.c.add(this, "getTileUrl");
      return this.get("tileFun", null, !0)(a, b, c);
    }, getZooms: function (a) {
      a || g.c.add(this, "getZooms");
      return this.get("zooms", null, !0);
    }
  });
  z.q.ib.bR =
  z.q.ib.extend({
    C: {
      getTileUrl: g.w.lP,
      zooms: [ 3, 20 ],
      zIndex: 2,
      maxDataZoom: 18,
      detectRetina: !1,
      mapNumber: "GS(2019)3913",
      className: "amap-layer amap-satellite",
      cacheSize: g.l.size
    }, r: function (a) {
      this.CLASS_NAME = "AMap.TileLayer.Satellite";
      g.c.ra(this, a);
      this.Vj = [ 3, 20 ];
      arguments.callee.oa.apply(this, arguments);
    }
  });
  z.q.ib.$Q = z.q.ib.extend({
    C: {
      getTileUrl: g.w.LG,
      zooms: [ 3, 20 ],
      zIndex: 3,
      type: "overlayer",
      maxDataZoom: 18,
      className: "amap-layer amap-roadnet",
      cacheSize: g.l.size
    }, r: function (a) {
      this.CLASS_NAME = "AMap.TileLayer.RoadNet";
      g.c.ra(this, a);
      this.Vj = [ 3, 20 ];
      arguments.callee.oa.apply(this, arguments);
    }, yg: function (a) {
      if (this.get("map").Ih) {
        this.Lq = !0;
        var b = g.w.MG;
        g.l.ma && this.get("detectRetina") && (b = g.w.MG.replace("scl=1", "scl=2"));
        a = new g.q.ib(this, a, this.yp(b), this.C.maxDataZoom);
      } else {
        this.Lq = !1, a = new g.q.ib(this,
        a);
      }
      return a;
    }
  });
  z.q.ib.fR = z.q.ib.extend({
    C: {
      getTileUrl: function (a, b, c) {return g.w.Sb + "://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&t=1&zoom=" + (17 - c) + "&x=" + a + "&y=" + b;},
      zooms: [ 6, 20 ],
      zIndex: 4,
      type: "overlayer",
      autoRefresh: !1,
      interval: 180,
      maxDataZoom: 17,
      alwaysRender: !g.l.RE,
      className: "amap-layer amap-traffic",
      cacheSize: g.l.size
    }, r: function (a) {
      this.CLASS_NAME = "AMap.TileLayer.Traffic";
      g.c.ra(this, a);
      this.Vj = [ 6, 20 ];
      arguments.callee.oa.apply(this, arguments);
      this.B = !0;
      this.startRefresh();
      this.B = !1;
    }, stopRefresh: function () {
      g.c.add(this,
      "stopRefresh");
      this.BG && (clearInterval(this.BG), this.BG = null);
    }, startRefresh: function () {
      g.c.add(this, "startRefresh");
      if (this.get("autoRefresh") && !this.BG) {
        var a = this;
        this.BG = setInterval(function () {
          a.B = !0;
          a.reload();
          a.B = !1;
          a.o("refresh");
        }, Math.max(1E3 * (this.get("interval") || 180), 1E4));
      }
    }, reload: function () {
      g.c.add(this, "reload");
      g.a.Fc(function () {this.set("reload");}, this);
    }, Uf: function () {
      this.B = !0;
      this.stopRefresh();
      this.get("map") && this.get("map").I("zoomstart", this.reload, this);
      this.B = !1;
    }, yg: function (a) {
      var b =
      this.get("map"), b = a.F;
      b.h("zoomstart", this.reload, this);
      return "d" !== b.get("baseRender") ? g.q.ru ? a = new g.q.ru(this, a) : [ "vt" ] : a =
      new g.q.ib(this, a, null, this.C.maxDataZoom);
    }
  });
  z.q.ib.Ex =
  z.q.ib.extend({
    C: {
      zooms: [ 3, 20 ],
      zIndex: 12,
      detectRetina: !1,
      className: "amap-layer amap-flexible",
      cacheSize: g.l.size
    }, r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.TileLayer.Flexible";
      g.c.ra(this, a);
      this.mja = !0;
      arguments.callee.oa.call(this, a);
    }, setCreateTile: function (a) {
      g.c.add(this, "setCreateTile");
      "function" === typeof a && a !== this.get("createTile") && this.set("createTile", a);
    }, getCreateTile: function () {return this.get("createTile", null, !0);}
  });
  z.q.ib.x5 = z.q.ib.Ex.extend({
    C: {
      zooms: [ 3, 20 ],
      zIndex: 12,
      tileSize: 512,
      detectRetina: !1,
      className: "amap-layer amap-wms",
      cacheSize: g.l.size,
      url: "",
      params: ""
    }, r: function (a) {
      this.CLASS_NAME = "AMap.TileLayer.WMS";
      g.c.ra(this, a);
      arguments.callee.oa.call(this, a);
      this.Rt();
      var b = this, c = this.get("tileSize");
      this.set("createTile", function (a, e, f, h, k) {
        var l = Math.pow(2, 20 - f) * c;
        f = new g.G(l * a, l * (e + 1));
        a = new g.G(l * (a + 1), l * e);
        e = g.VF.E0(f);
        a = g.VF.E0(a);
        var m = document.createElement("img");
        "3D" === b.np && (m.crossOrigin = "anonymous");
        m.src = this.url + "&BBOX=" + e + "," + a;
        g.D.h(m, "load", function () {h(m);});
        g.D.h(m, "error", function () {k(m);});
      });
    }, Rt: function () {
      var a = this.get("url", null, !0), b = this.get("params", null, !0), c = this.get("tileSize");
      b.WIDTH = c;
      b.HEIGHT = c;
      b.CRS = b.CRS || "EPSG:3857";
      b.REQUEST = "GetMap";
      b.SERVICE = "WMS";
      b.FORMAT = b.FORMAT || "image/png";
      b.TRANSPARENT = void 0 === b.TRANSPARENT ? "true" : b.TRANSPARENT;
      delete b.BBOX;
      this.url = a + "?" + g.a.join(b, "&");
      this.B = !0;
      this.reload();
      this.B = !1;
    }, setUrl: function (a) {
      g.c.add(this, "setUrl");
      this.set("url",
      a, !0);
      this.Rt();
    }, getUrl: function () {
      g.c.add(this, "getUrl");
      return this.get("url", null, !0);
    }, setParams: function (a) {
      g.c.add(this, "setParams");
      g.extend(this.get("params", null, !0), a || {});
      this.Rt();
    }, getParams: function () {
      g.c.add(this, "getParams");
      return this.get("params", null, !0);
    }
  });
  z.q.ib.y5 = z.q.ib.Ex.extend({
    C: {
      zooms: [ 3, 20 ],
      tileSize: 256,
      zIndex: 12,
      detectRetina: !1,
      className: "amap-layer amap-wmts",
      cacheSize: g.l.size
    }, r: function (a) {
      this.CLASS_NAME = "AMap.TileLayer.WMTS";
      g.c.ra(this, a);
      arguments.callee.oa.call(this, a);
      this.Rt();
      var b = this;
      this.get("tileSize");
      this.set("createTile", function (a, d, e, f, h) {
        var k = document.createElement("img");
        "3D" === b.np && (k.crossOrigin = "anonymous");
        k.src = this.url + "&TileMatrix=" + e + "&TileRow=" + d + "&TileCol=" + a;
        g.D.h(k, "load", function () {f(k);});
        g.D.h(k, "error",
        function () {h(k);});
      });
    }, Rt: function () {
      var a = this.get("url", null, !0), b = this.get("params", null, !0);
      b.TileMatrixSet = b.TileMatrixSet || "EPSG:3857";
      b.Request = "GetTile";
      b.Service = "WMTS";
      b.Format = b.Format || "image/png";
      this.url = a + "?" + g.a.join(b, "&");
      this.B = !0;
      this.reload();
      this.B = !1;
    }, setUrl: function (a) {
      g.c.add(this, "setUrl");
      this.set("url", a, !0);
      this.Rt();
    }, getUrl: function () {
      g.c.add(this, "getUrl");
      return this.get("url", null, !0);
    }, setParams: function (a) {
      g.c.add(this, "setParams");
      g.extend(this.get("params", null, !0),
      a || {});
      this.Rt();
    }, getParams: function () {
      g.c.add(this, "getParams");
      return this.get("params", null, !0);
    }
  });
  z.q.ib.Hx = z.q.ib.Ex.extend({
    C: { detectRetina: !0, zooms: [ 10, 18 ], zIndex: 2 }, r: function (a) {
      arguments.callee.oa.apply(this, arguments);
      var b = this;
      this.set("createTile", function (a, d, e, f, h) {
        function k (a, c, d) {
          var e = "zh_cn";
          b && b.get && l && (e = l.get("lang") || "zh_cn");
          return g.w.Sb + "://grid.amap.com/grid/" + d + "/" + a + "/" + c + "?src=jsapi&key=" + g.w.key + "&lang=" + e + "&dpiType=" + (g.l.nd
          ? "wprd"
          : "webrd");
        }

        var l = b.e || b.get("map");
        l.zp || (l.zp = new g.Yb.Hx(l.map));
        if (l.zp.vB(a, d, e)) {
          h();
        } else {
          var m = document.createElement("img");
          "3D" ===
          b.np && (m.crossOrigin = "anonymous");
          m.src = k(a, d, e);
          g.D.h(m, "load", function () {f(m);});
          g.D.h(m, "error", function () {h(m);});
        }
      });
    }
  });
  z.q.Sc =
  z.q.Hc.extend({
    C: { visible: !0, zooms: [ 3, 25 ], type: "overlay", zIndex: 5, alwaysRender: !0 },
    r: function (a) {
      this.ZZ = !0;
      arguments.callee.oa.apply(this, arguments);
    },
    yg: function (a) {return new g.q.Sc(this, a);}
  });
  z.q.a4 =
  z.q.Hc.extend({
    C: { zooms: [ 14, 20 ], zIndex: 8, visible: !0, merge: !0, sort: !1 },
    r: function (a) {
      this.CLASS_NAME = "AMap.Buildings";
      g.c.ra(this, a);
      a = a || {};
      a.zooms && (a.zooms[0] = Math.max(14, a.zooms[0]));
      arguments.callee.oa.apply(this, arguments);
    },
    at: function () {return !1;},
    yg: function (a) {if (g.l.uE) return a = new g.q.u5(this, a), a.dw = this.get("heightFactor") || 1, a;},
    setStyle: function (a) {
      this.set("customStyle", a);
      g.c.add(this, "setStyle");
    }
  });
  z.q.IH = z.q.Hc.extend({
    C: { visible: !0, zooms: [ 3, g.l.Y ? 20 : 18 ], opacity: 1, type: "overlay", zIndex: 6 },
    r: function (a) {arguments.callee.oa.apply(this, arguments);},
    yg: function (a) {return g.q.Ix ? new g.q.Ix(this, a) : [ "imagelayer" ];},
    getMap: function () {
      g.c.add(this, "getMap");
      return this.Le.map;
    },
    show: function () {
      g.c.add(this, "show");
      this.set("visible", !0);
      this.o("options");
    },
    getOpacity: function () {
      g.c.add(this, "getOpacity");
      return this.get("opacity", null, !0);
    },
    setOpacity: function (a) {
      g.c.add(this, "setOpacity");
      this.set("opacity",
      a);
    },
    getBounds: function () {
      g.c.add(this, "getBounds");
      return this.get("bounds", null, !0).jb();
    },
    setBounds: function (a) {
      g.c.add(this, "setBounds");
      this.o("bounds", a);
      this.B = !0;
      this.setOptions({ bounds: a });
      this.B = !1;
    },
    hide: function () {
      g.c.add(this, "hide");
      this.set("visible", !1);
      this.o("options");
    },
    setOptions: function (a) {
      g.c.add(this, "setOptions");
      this.Wf(a);
      this.o("options");
    },
    getOptions: function () {
      g.c.add(this, "getOptions");
      var a = {}, b;
      for (b in this.C) this.C.hasOwnProperty(b) && (a[b] = this.get(b));
      return a;
    },
    getElement: function () {
      return this.q.N ?
      this.q.N.Rb : this.q.al ? this.q.al.Rb : null;
    }
  });
  z.q.Ix = z.q.IH.extend({
    r: function (a) {
      this.CLASS_NAME = "AMap.ImageLayer";
      g.c.ra(this, a);
      a && a.url && (a.__source__ = a.url);
      arguments.callee.oa.apply(this, arguments);
    }, getImageUrl: function () {
      g.c.add(this, "getImageUrl");
      return this.get("__source__");
    }, setImageUrl: function (a) {
      g.c.add(this, "setImageUrl");
      return this.set("__source__", a);
    }
  });
  z.q.w5 = z.q.IH.extend({
    r: function (a) {
      this.CLASS_NAME = "AMap.VideoLayer";
      g.c.ra(this, a);
      a && a.url && (a.__source__ = a.url);
      arguments.callee.oa.apply(this, arguments);
    }, getVideoUrl: function () {
      g.c.add(this, "getVideoUrl");
      return this.get("__source__");
    }, setVideoUrl: function (a) {
      g.c.add(this, "setVideoUrl");
      return this.set("__source__", a);
    }
  });
  z.q.c4 = z.q.IH.extend({
    r: function (a) {
      this.CLASS_NAME = "AMap.CanvasLayer";
      g.c.ra(this, a);
      a && a.canvas && (a.__source__ = a.canvas);
      arguments.callee.oa.apply(this, arguments);
    }, getCanvas: function () {
      g.c.add(this, "getCanvas");
      return this.get("__source__");
    }, setCanvas: function (a) {
      g.c.add(this, "setCanvas");
      return this.set("__source__", a);
    }, reFresh: function () {this.q && (this.q.uB = !0, this.q.set("display"));}
  });
  z.q.N4 = z.q.Hc.extend({
    C: {
      visible: !0,
      zooms: [ 3, g.l.Y ? 20 : 18 ],
      type: "overlay",
      zIndex: 5,
      cursor: "pointer",
      alwaysRender: !0,
      stable: !0,
      bubble: !0,
      rejectMapMask: !0,
      className: "amap-mass"
    }, r: function (a, b) {
      this.CLASS_NAME = "AMap.MassMarks";
      g.c.ra(this, b);
      g.l.Vk && (this.wi = !0, b.size && (b.size = g.a.Oo(b.size)), this.B =
      !0, this.setData(a), g.a.Hb(this, b), b.style
      ? (this.Wf(this.C, !0), this.setStyle(b.style))
      : this.setStyle(this.C), this.B = !1);
    }, clear: function () {
      g.c.add(this, "clear");
      this.set("dataSources", "");
    }, getStyle: function () {
      g.c.add(this,
      "getStyle");
      return this.el;
    }, setStyle: function (a) {
      g.c.add(this, "setStyle");
      if (a instanceof Array) {
        for (var b = 0; b < a.length; b += 1) {
          a[b].rotation_ =
          Math.PI * (a[b].rotation || 0) / 180, a[b].size = g.a.Oo(a[b].size), a.Ue =
          Math.max(a.Ue || 0, a[b].size.width + a[b].anchor.x), a.Bf =
          Math.max(a.Ue || 0, a[b].size.height + a[b].anchor.y);
        }
        this.el = a;
      } else {
        a.size && (a.size = g.a.Oo(a.size)), a.rotation_ =
        Math.PI * (a.rotation || 0) / 180, this.Wf(a, !0), this.el =
        { anchor: this.get("anchor"), url: this.get("url"), size: this.get("size"), rotation_: this.get("rotation_") },
        this.el.Ue = this.el.size.width + this.el.anchor.x, this.el.Bf = this.el.size.height + this.el.anchor.y;
      }
      this.o("style");
    }, setData: function (a) {
      g.c.add(this, "setData");
      this.set("dataSources", a);
    }, getData: function () {
      g.c.add(this, "getData");
      return this.get("datas") || this.get("dataSources");
    }, setMap: function (a) {
      g.c.add(this, "setMap");
      g.l.Vk && (a
      ? (this.get("map") && this.get("map").fj(this), this.set("map", a))
      : this.get("map") && (this.get("map").fj(this), this.set("map", null, !0), this.gi = !1, this.Uf && this.Uf()));
    }, yg: function (a) {
      return g.pb.uA([ "cvector" ]) ?
      (a = new g.q.Sc(this, a), this.W("datas", a), a) : [ "cvector" ];
    }
  });
  z.q.LH = z.q.Ix.extend({
    r: function (a, b, c) {
      this.CLASS_NAME = "AMap.GroundImage";
      g.c.ra(this, c);
      c = c || {};
      this.gg = !0;
      var d = parseFloat(c.opacity);
      isNaN(d) && (d = 1);
      arguments.callee.oa.call(this, {
        url: a,
        bounds: b,
        clickable: c.clickable,
        opacity: d,
        map: c.map,
        zooms: c.zooms || [ 3, 20 ]
      });
      this.CLASS_NAME = "AMap.GroundImage";
    },
    Qka: function (a) {this.get("bounds").contains(a.lnglat) && (a.target = this, this.o("click", a));},
    Rka: function (a) {this.get("bounds").contains(a.lnglat) && (a.target = this, this.o("dblclick", a));},
    setMap: function (a) {
      g.c.add(this,
      "setMap");
      a
      ? (this.get("map") && (this.get("map")
      .fj(this), this.DX && z.event.removeListener(this.DX), this.UX && z.event.removeListener(this.UX)), this.set("map", a))
      : this.get("map") && (this.get("map").fj(this), this.Le.map = null);
    },
    mapChanged: function () {
      this.get("map") && (this.get("map").fE(this), this.get("clickable") && (this.DX =
      z.event.addListener(this.get("map"), "click", this.Qka, this), this.UX =
      z.event.addListener(this.get("map"), "dblclick", this.Rka, this)));
    }
  });
  z.A.qh = g.Z.extend({
    ga: [ g.na, g.Ie, { Ha: g.a.Ha } ],
    C: { extData: {}, bubble: !1, clickable: !0, draggable: !1 },
    r: function () {this.gD = g.a.Tb(this);},
    jta: function () {return this.gD;},
    Xra: function () {
      this.B = !0;
      this.get("map", null, !0) && this.setMap(this.get("map"));
      this.B = !1;
    },
    mapChanged: function () {this.get("map", null, !0) && this.get("map", null, !0).sz(this);},
    tM: function (a) {
      var b = 0;
      a && (b = "string" === typeof a ? Math.round(parseFloat(a) / 0.14929107086948487) : a);
      return b;
    },
    setHeight: function (a) {
      this.height = a = a || 0;
      a = this.tM(a);
      this.set("altitude",
      a);
    },
    getHeight: function () {return this.height;},
    show: function () {
      g.c.add(this, "show");
      this.set("visible", !0);
    },
    hide: function () {
      g.c.add(this, "hide");
      this.set("visible", !1);
    },
    setMap: function (a) {
      g.c.add(this, "setMap");
      a !== this.get("map", null, !0) && (a ? (this.get("map", null, !0) && this.get("map", null, !0)
      .Kw(this), this.set("map", a)) : this.get("map", null, !0) && (this.get("map", null, !0)
      .Kw(this), this.set("map", null, !0)));
    },
    getMap: function () {
      g.c.add(this, "getMap");
      return this.get("map", null, !0);
    },
    setExtData: function (a) {
      g.c.add(this,
      "setExtData");
      this.set("extData", a);
    },
    getExtData: function () {
      g.c.add(this, "getExtData");
      return this.get("extData", null, !0);
    }
  });
  z.A.Sc = z.A.qh.extend({
    r: function (a) {z.A.Sc.Lc.r.apply(this, arguments);}, show: function () {
      g.c.add(this, "show");
      this.set("visible", !0);
      this.o("show", { type: "show", target: this });
    }, hide: function () {
      g.c.add(this, "hide");
      this.set("visible", !1);
      this.o("hide", { type: "hide", target: this });
    }, getVisible: function () {
      g.c.add(this, "getVisible");
      return this.get("visible", null, !0);
    }, getOptions: function () {
      g.c.add(this, "getOptions");
      var a = {},
      b = "map zIndex strokeColor strokeOpacity strokeWeight strokeStyle strokeDasharray extData bubble clickable".split(" "),
      c = "isOutline outlineColor geodesic path lineJoin lineCap borderWeight showDir dirColor dirImg".split(" "),
      d = [ "fillColor", "fillOpacity", "path", "lineJoin", "texture" ],
      e = [ "center", "radius", "texture" ],
      f = [ "bounds", "texture" ],
      h = [];
      this instanceof z.A.Ob && (h = b.concat(c));
      this instanceof z.A.tc && (h = b.concat(d));
      this instanceof z.A.qg && (h = b.concat(e).concat(d));
      this instanceof z.A.pr && (h = b.concat(e).concat(d));
      this instanceof z.A.tr && (h = b.concat(d).concat(f));
      for (b = 0; b < h.length; b += 1) {
        a[h[b]] = this.get(h[b], null,
        !0);
      }
      return a;
    }, setOptions: function (a) {
      g.c.add(this, "setOptions");
      a.hasOwnProperty("path") && (a.path && a.path.length || (a.path = []), a.path = this.Ha(a.path));
      a.center && (a.center = this.Ha(a.center));
      var b;
      a.hasOwnProperty("map") && (b = a.map, delete a.map);
      this.Wf(a);
      void 0 !== b && (this.setMap(b), a.map = b);
      this.o("options");
      this.o("change", { type: "change", target: this });
    }, setzIndex: function (a) {
      g.c.add(this, "setzIndex");
      this.set("zIndex", a);
    }, getzIndex: function () {
      g.c.add(this, "getzIndex");
      return this.get("zIndex", null,
      !0);
    }, setDraggable: function (a) {
      g.c.add(this, "setDraggable");
      this.set("draggable", a);
    }
  });
  z.A.eC = z.A.Sc.extend({
    C: {
      visible: !0,
      zIndex: 10,
      strokeColor: "#006600",
      strokeOpacity: 0.9,
      strokeWeight: 3,
      strokeStyle: "solid",
      strokeDasharray: [ 10, 5 ],
      lineJoin: "miter",
      lineCap: "butt",
      path: []
    }, r: function (a) {z.A.eC.Lc.r.apply(this, arguments);}, setPath: function (a, b) {
      g.c.add(this, "setPath");
      a && a.length || (a = []);
      a = this.Ha(a);
      this.set("path", a);
      this.o("change", { type: "change", target: this });
      b || this.o("setPath");
      this.A && this.A.get("deltaPos") && this.A.set("deltaPos", [ 0, 0 ]);
    }, getPath: function () {
      g.c.add(this, "getPath");
      var a = this.get("path", null, !0);
      this.A && this.A.get("deltaPos") && (a = this.A.pJ(a, this.A.get("deltaPos")));
      return a;
    }, bd: function () {
      var a = this.get("path");
      if (!a || !a.length) return null;
      a[0] instanceof g.U && (a = [ a ]);
      for (var b = new g.le(180, 90, -180, -90), c = 0; c < a.length; c +=
      1) {
        for (var d = a[c], e = d.length - 1; 0 <= e; e -= 1) b.extend(d[e]);
      }
      return b;
    }
  });
  z.A.eC.Dg({ bd: "getBounds" });
  z.A.ph =
  g.Z.extend({
    ga: [ g.na, g.Ie ],
    C: {
      size: new g.gd(36, 36),
      imageOffset: new g.G(0, 0),
      image: g.w.Db + "/theme/v1.3/markers/0.png",
      imageSize: null
    },
    r: function (a) {
      this.CLASS_NAME = "AMap.Icon";
      g.c.ra(this, a);
      a = a || {};
      a.size && (a.size = g.a.Oo(a.size));
      a.imageSize && (a.imageSize = g.a.Oo(a.imageSize));
      g.a.Hb(this, a);
      this.Wf(this.C);
    },
    setImageSize: function (a) {
      g.c.add(this, "setImageSize");
      a = g.a.Oo(a);
      this.set("imageSize", a);
    },
    getImageSize: function () {
      g.c.add(this, "getImageSize");
      return this.get("imageSize", null, !0);
    }
  });
  z.A.L4 =
  g.Z.extend({
    ga: [ g.na, g.Ie ], C: { coords: [], type: "" }, r: function (a) {
      this.CLASS_NAME = "AMap.MarkerShape";
      g.c.ra(this, a);
      g.a.Hb(this, a);
      this.Wf(this.C);
    }
  });
  z.A.lb = z.A.qh.extend({
    C: {
      cursor: "pointer",
      visible: !0,
      zIndex: 100,
      angle: 0,
      textAlign: "left",
      verticalAlign: "top",
      autoRotation: !1,
      opacity: 1,
      offset: new g.G(-9, -31),
      size: new g.G(19, 33),
      raiseOnDrag: !1,
      topWhenClick: !1,
      topWhenMouseOver: !1,
      animation: "AMAP_ANIMATION_NONE"
    }, r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.Marker";
      g.c.ra(this, a);
      a = a || {};
      this.gg = !0;
      this.p$ = g.a.Tb(this);
      this.B = !0;
      a.position && (a.position = this.Ha(a.position));
      a.height && this.setHeight(a.height);
      g.a.Hb(this, a);
      g.l.ee && (this.C.angle =
      0);
      this.Wf(this.C, !0);
      this.mapChanged();
      this.B = !1;
    }, getId: function () {
      g.c.add(this, "getId");
      return this.p$;
    }, setRaiseOnDrag: function (a) {
      g.c.add(this, "setRaiseOnDrag");
      this.set("raiseOnDrag", a);
    }, setPosition: function (a, b) {
      g.c.add(this, "setPosition");
      a = this.Ha(a);
      void 0 !== b && (this.B = !0, this.setHeight(b), this.B = !1);
      this.set("position", a);
    }, getPosition: function () {
      g.c.add(this, "getPosition");
      return this.get("position", null, !0);
    }, getBounds: function () {
      var a = this.get("position", null, !0).jb();
      return new g.le(a,
      a.jb());
    }, mapChanged: function () {
      this.ek("zoom");
      var a = this.get("map", null, !0);
      a && (this.get("position", null, !0) || this.set("position", a.get("center")), a.sz(this), this.W("zoom", a));
    }, getZooms: function () {
      g.c.add(this, "getZooms");
      return this.get("zooms", null, !0);
    }, zoomChanged: function () {
      var a = this.get("zooms", null, !0);
      if (a) {
        var b = this.get("zoom");
        b < a[0] || b > a[1] ? this.set("outOfZooms", !0) : this.set("outOfZooms", !1);
        this.A && this.A.mla();
      }
    }, setIcon: function (a) {
      g.c.add(this, "setIcon");
      this.set("icon", a);
    }, getIcon: function () {
      g.c.add(this,
      "getIcon");
      return this.get("icon", null, !0);
    }, setContent: function (a) {
      g.c.add(this, "setContent");
      this.set("content", a);
    }, getContent: function () {
      g.c.add(this, "getContent");
      return this.get("content", null, !0);
    }, getContentDom: function () {return this.get("contentDom", null, !0);}, hide: function () {
      g.c.add(this, "hide");
      this.set("visible", !1);
    }, show: function () {
      g.c.add(this, "show");
      this.set("visible", !0);
    }, setCursor: function (a) {
      g.c.add(this, "setCursor");
      this.set("cursor", a);
    }, setRotation: function (a) {
      g.c.add(this, "setRotation");
      g.l.ee || this.set("angle", a);
    }, setAngle: function (a) {
      g.c.add(this, "setAngle");
      g.l.ee || "number" !== typeof a || this.set("angle", a);
    }, getAngle: function () {
      g.c.add(this, "getAngle");
      return this.get("angle", null, !0);
    }, setOffset: function (a) {
      g.c.add(this, "setOffset");
      this.set("offset", a);
    }, getOffset: function () {
      g.c.add(this, "getOffset");
      return this.get("offset", null, !0);
    }, setTextAlign: function (a) {
      g.c.add(this, "setTextAlign");
      this.set("textAlign", a);
    }, getTextAlign: function () {
      g.c.add(this, "getTextAlign");
      return this.get("textAlign",
      null, !0);
    }, setVerticalAlign: function (a) {
      g.c.add(this, "setVerticalAlign");
      this.set("verticalAlign", a);
    }, getVerticalAlign: function () {
      g.c.add(this, "getVerticalAlign");
      return this.get("verticalAlign", null, !0);
    }, setzIndex: function (a) {
      g.c.add(this, "setzIndex");
      this.set("zIndex", a);
    }, getzIndex: function () {
      g.c.add(this, "getzIndex");
      return this.get("zIndex", null, !0);
    }, setOpacity: function (a) {
      g.c.add(this, "setOpacity");
      this.set("opacity", a);
    }, setDraggable: function (a) {
      g.c.add(this, "setDraggable");
      this.set("draggable",
      a);
    }, getDraggable: function () {
      g.c.add(this, "getDraggable");
      return this.get("draggable", null, !0);
    }, moveTo: function (a, b, c) {
      g.c.add(this, "moveTo");
      a = this.Ha(a);
      this.set("move", { Sf: a, speed: b, rb: c });
    }, moveAlong: function (a, b, c, d) {
      g.c.add(this, "moveAlong");
      this.set("move", { Sf: a, speed: b, rb: c, dfa: d });
    }, stopMove: function () {
      g.c.add(this, "stopMove");
      this.set("move", !1);
    }, pauseMove: function () {
      g.c.add(this, "pauseMove");
      var a = this.get("move");
      if (!a) return !1;
      a.action = "pause";
      this.set("move", a);
      return !0;
    }, resumeMove: function () {
      g.c.add(this,
      "resumeMove");
      var a = this.get("move");
      if (!a) return !1;
      a.action = "resume";
      this.set("move", a);
      return !0;
    }, setShadow: function (a) {
      g.c.add(this, "setShadow");
      this.set("shadow", a);
    }, getShadow: function () {
      g.c.add(this, "getShadow");
      return this.get("shadow", null, !0);
    }, setClickable: function (a) {
      g.c.add(this, "setClickable");
      a !== this.get("clickable", null, !0) && this.set("clickable", a);
    }, getClickable: function () {
      g.c.add(this, "getClickable");
      return this.get("clickable", null, !0);
    }, setTitle: function (a, b) {
      g.c.add(this, "setTitle");
      "string" === typeof a && this.set("title", a, b);
    }, getTitle: function () {
      g.c.add(this, "getTitle");
      return this.get("title", null, !0);
    }, setLabel: function (a) {
      g.c.add(this, "setLabel");
      a && !g.a.Eo(a) && (a = g.extend({}, this.get("label"), a));
      this.set("label", a);
    }, getLabel: function () {
      g.c.add(this, "getLabel");
      return this.get("label", null, !0);
    }, setTop: function (a, b) {
      g.c.add(this, "setTop");
      this.set("isTop", a, b);
    }, getTop: function () {
      g.c.add(this, "getTop");
      return this.get("isTop", null, !0);
    }, setShape: function (a, b) {
      g.c.add(this, "setShape");
      this.set("shape", a, b);
    }, getShape: function () {
      g.c.add(this, "getShape");
      return this.get("shape", null, !0);
    }, setAnimation: function (a, b) {
      g.c.add(this, "setAnimation");
      this.set("animation", a, b);
    }, getAnimation: function () {
      g.c.add(this, "getAnimation");
      return this.get("animation", null, !0);
    }, getMap: function () {
      g.c.add(this, "getMap");
      return this.get("map", null, !0);
    }, markOnAMAP: function (a) {
      g.c.add(this, "markOnAMAP");
      a = a || {};
      var b = {};
      b.name = a.name || this.get("name", null, !0) || "";
      a = this.Ha(a.position) || this.get("position",
      null, !0);
      b.y = a.P;
      b.x = a.R;
      g.mh.dr(g.mh.eia(b));
    }
  });
  z.A.pm = z.A.qh.extend({
    C: { visible: !1, items: [] }, r: function (a) {
      this.CLASS_NAME = "AMap.ContextMenu";
      g.c.ra(this, a);
      this.gg = !0;
      g.a.Hb(this, a);
      this.C.items = [];
      this.Wf(this.C);
    }, addItem: function (a, b, c) {
      g.c.add(this, "addItem");
      this.get("items").push({ k3: a, rb: b, mG: c });
      this.o("items");
    }, removeItem: function (a, b) {
      g.c.add(this, "removeItem");
      var c = this.get("items"), d, e;
      for (e = 0; e < c.length; e += 1) {
        if (d = c[e], d.k3 === a && d.rb === b) {
          c.splice(e, 1);
          break;
        }
      }
      this.o("items");
    }, open: function (a, b) {
      g.c.add(this, "open");
      this.B = !0;
      b = g.a.Ha(b);
      this.set("position", b);
      this.map ? this.map && this.map !== a && (this.map.Kw(this), this.map = a, this.setMap(a)) : (this.map =
      a, this.setMap(a));
      this.o("open", { type: "open", target: this });
      this.B = !1;
    }, close: function () {
      g.c.add(this, "close");
      this.B = !0;
      this.setMap(null);
      this.map && (this.map = this.map.zv = null, this.o("close", { type: "close", target: this }));
      this.B = !1;
    }
  });
  z.A.ye = z.A.qh.extend({
    C: {
      visible: !0,
      offset: new g.G(0, 0),
      showShadow: !1,
      closeWhenClickMap: !1,
      retainWhenClose: !0,
      autoMove: !0,
      altitude: 0
    },
    r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.InfoWindow";
      g.c.ra(this, a);
      a = a || {};
      this.gg = !0;
      a && a.size && (a.size = g.a.Oo(a.size));
      g.a.Hb(this, a);
      this.Wf(this.C);
      a.position && this.set("position", g.a.Ha(a.position), !0);
      a.height && this.set("altitude", this.tM(a.height), !0);
    },
    open: function (a, b, c) {
      g.c.add(this, "open");
      b = g.a.Ha(b);
      if (a && !this.iH && (b = b || this.get("position",
      null, !0))) {
        this.o("change", { type: "change", target: this });
        c = this.tM(c) || this.get("altitude");
        var d = this.get("map", null, !0);
        d && d === a ? (this.set("altitude", c, !0), this.set("position", b)) : (this.map =
        a, a.Uk && a.Uk.close(), this.set("position", b, !0), this.set("altitude", c, !0), this.B =
        !0, this.setMap(a), this.B = !1);
        this.o("open", { type: "open", target: this });
      }
    },
    close: function () {
      g.c.add(this, "close");
      this.A && this.A.map && (this.B = !0, this.setMap(null), this.map = null, this.o("change", {
        type: "change",
        target: this
      }), this.B = !1);
    },
    setContent: function (a) {
      g.c.add(this, "setContent");
      this.set("content", a);
      this.o("change", { type: "change", target: this });
    },
    getContentU: function () {
      g.c.add(this, "getContentU");
      return this.get("content", null, !0);
    },
    getContentDom: function () {return this.get("contentDom", null, !0);},
    getContent: function () {
      g.c.add(this, "getContent");
      return this.get("content", null, !0);
    },
    setPosition: function (a) {
      g.c.add(this, "setPosition");
      a = g.a.Ha(a);
      this.set("position", a);
      this.o("change", { type: "change", target: this });
    },
    setOffset: function (a) {
      g.c.add(this,
      "setOffset");
      this.set("offset", a);
      this.o("change", { type: "change", target: this });
    },
    getPosition: function () {
      g.c.add(this, "getPosition");
      return this.get("position", null, !0);
    },
    setSize: function (a) {
      g.c.add(this, "setSize");
      a = g.a.Oo(a);
      this.set("size", a);
      this.o("change", { type: "change", target: this });
    },
    getSize: function (a) {
      g.c.add(this, "getSize");
      var b = this.get("size", null, !0);
      if (b) return b;
      if (this.A && !a) return new g.gd(this.A.Ch.offsetWidth, this.A.Ch.offsetHeight);
    },
    getIsOpen: function () {
      g.c.add(this, "getIsOpen");
      return !!this.get("map");
    }
  });
  z.A.Ob =
  z.A.eC.extend({
    C: { isOutline: !1, outlineColor: "#000000", geodesic: !1, dirColor: "white", borderWeight: 1 },
    r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.Polyline";
      g.c.ra(this, a);
      this.B = !0;
      z.A.Ob.Lc.r.apply(this, arguments);
      this.gg = !0;
      a = a || {};
      a.zIndex = "number" === typeof a.zIndex ? a.zIndex : 50;
      a.path && (a.path = this.Ha(a.path));
      g.a.Hb(this, a);
      this.setOptions(this.C);
      this.B = !1;
    },
    getLength: function () {
      g.c.add(this, "getLength");
      for (var a = this.get("path"), b = 0, c = 0; c < a.length - 1; c += 1) b += a[c].be(a[c + 1]);
      return parseFloat(b.toFixed(2));
    }
  });
  (function (a) {
    function b (a, b, c, d) {
      if (1 <= a) return d;
      var e = 1 - a;
      return e * e * b + 2 * e * a * c + a * a * d;
    }

    function c (a, b, c, d, e) {
      if (1 <= a) return e;
      var f = 3 * (c[0] - b[0]), h = 3 * (d[0] - c[0]) - f, r = 3 * (c[1] - b[1]);
      c = 3 * (d[1] - c[1]) - r;
      return [
        (e[0] - b[0] - f - h) * Math.pow(a, 3) + h * Math.pow(a, 2) + f * a + b[0],
        (e[1] - b[1] - r - c) * Math.pow(a, 3) + c * Math.pow(a, 2) + r * a + b[1]
      ];
    }

    function d (a, c, d, e) {return [ b(a, c[0], d[0], e[0]), b(a, c[1], d[1], e[1]) ];}

    function e (b, c) {
      c = a.a.Ha(c);
      return b.AA(c, 20).gl();
    }

    function f (b, c) {
      a.a.isArray(c) && (c = new a.G(c[0], c[1]));
      return b.aB(c,
      20);
    }

    function h (b, f, h, n, p, q) {
      var s = null;
      if (b && h && h.length) {
        b = [ b ];
        b.push.apply(b, h);
        b.push(f);
        h = 0;
        for (s = b.length; h < s; h++) b[h] = e(n, b[h]);
        h = a.extend({ tolerance: 4, interpolateNumLimit: [ 3, 300 ] }, q);
        q = h.tolerance;
        h = h.interpolateNumLimit;
        q = Math.max(2, q);
        for (var r = s =
        0, u = 0, w = b.length; u < w - 1; u++) {
          var v = b[u], t = b[u + 1], s = s + Math.abs(t[0] - v[0]), r = r + Math.abs(t[1] - v[1]);
        }
        a:{
          p = Math.min(h[1], Math.max(h[0], Math.round(Math.max(s, r) / p / q)));
          q = null;
          switch (b.length) {
            case 3:
              q = d;
              break;
            case 4:
              q = c;
              break;
            default:
              s = null;
              break a;
          }
          h = [];
          s = [ 0 ].concat(b);
          for (r = 1; r < p - 2; r++) s[0] = r / p, h.push(q.apply(null, s));
          h.push(b[b.length - 1]);
          s = h;
        }
      }
      return s || [ e(n, f) ];
    }

    a.du = {
      Zua: d, ksa: c, SE: function () {
        function a (b, c, d) {return (((1 - 3 * d + 3 * c) * b + (3 * d - 6 * c)) * b + 3 * c) * b;}

        function b (a) {return a;}

        var c = {}, d = "function" === typeof Float32Array;
        return function (e, f, h, r) {
          function u (b) {
            if (0 === b) {
              b = 0;
            } else if (1 === b) {
              b = 1;
            } else {
              for (var c = 0, d = 1; 10 !== d && v[d] <= b; ++d) c += 0.1;
              --d;
              var d = c + (b - v[d]) / (v[d + 1] - v[d]) * 0.1,
              l = 3 * (1 - 3 * h + 3 * e) * d * d + 2 * (3 * h - 6 * e) * d + 3 * e;
              if (0.001 <= l) {
                for (c = 0; 4 > c; ++c) {
                  l = 3 *
                  (1 - 3 * h + 3 * e) * d * d + 2 * (3 * h - 6 * e) * d + 3 * e;
                  if (0 === l) break;
                  d -= (a(d, e, h) - b) / l;
                }
                b = d;
              } else if (0 === l) {
                b = d;
              } else {
                var d = c, c = c + 0.1, m, n = 0;
                do {
                  m = d + (c - d) / 2, l = a(m, e, h) - b, 0 < l ? c = m : d =
                  m;
                } while (1E-7 < Math.abs(l) && 10 > ++n);
                b = m;
              }
              b = a(b, f, r);
            }
            return b;
          }

          if (!(0 <= e && 1 >= e && 0 <= h && 1 >= h)) throw Error("bezier x values must be in [0, 1] range");
          var w = arguments.toString();
          if (c[w]) return c[w];
          if (e === f && h === r) return b;
          for (var v = d ? new Float32Array(11) : Array(11), t = 0; 11 > t; ++t) v[t] = a(0.1 * t, e, h);
          return c[w] = u;
        };
      }(), UY: function (a, b, c, d) {
        var e, f, s = [];
        e = 0;
        for (f =
             a.length; e < f; e += 1) {
          s.push.apply(s, h(a[e - 1], a[e], a[e].controlPoints, b, c, d));
        }
        return s;
      }, Uha: function (a, b, c, d) {
        a = this.UY(a, b, c, d);
        c = [];
        d = 0;
        for (var e = a.length; d < e; d++) c.push(f(b, a[d]));
        return c;
      }
    };
  })(g);
  z.A.zx = z.A.Ob.extend({
    C: { tolerance: 4, interpolateNumLimit: [ 3, 300 ] }, r: function (a) {
      this.CLASS_NAME = "AMap.BezierCurve";
      g.c.ra(this, a);
      z.A.zx.Lc.r.apply(this, arguments);
    }, getLength: function () {
      g.c.add(this, "getLength");
      this.get("map");
      this.B = !0;
      var a = this.getInterpolateLngLats();
      this.B = !1;
      return g.pp.distanceOfLine(a);
    }, getInterpolateLngLats: function () {
      g.c.add(this, "getInterpolateLngLats");
      var a = this.get("map");
      return g.du.Uha(this.get("path"), a && a.li || g.lh.KH, Math.pow(2, 2), this.C);
    }, getSerializedPath: function () {
      g.c.add(this,
      "getSerializedPath");
      for (var a = this.get("path", null, !0), b = [], c = 0, d = a.length; c < d; c++) {
        var e = a[c];
        if (e instanceof g.U) {
          var f = [];
          if (e.controlPoints) for (var h = 0, k = e.controlPoints.length; h < k; h++) f.push(e.controlPoints[h].PM()), f.push(e.controlPoints[h].MM());
          f.push(e.PM());
          f.push(e.MM());
          b.push(f);
        } else {
          b.push(e);
        }
      }
      return b;
    }, Ha: function (a) {
      var b = typeof a[0];
      if (g.a.isArray(a) && "object" === b) {
        for (b = 0; b < a.length; b += 1) a[b] = this.Jba(a[b]);
        return a;
      }
      return [ this.Fua(a) ];
    }, Jba: function (a) {
      var b;
      if (a instanceof g.U) {
        b =
        a;
      } else {
        b = typeof a[0];
        var c, d, e = [];
        if ("string" === b || "number" === b) {
          d = a.length;
          if (d % 2) throw Error("LngLat number should be even, now it's " + d);
          b = new g.U(a[d - 2], a[d - 1]);
          c = 0;
          for (d -= 2; c < d; c += 2) e.push(new g.U(a[c], a[c + 1]));
        } else if (g.a.isArray(a[0])) {
          for (d = a.length, b = new g.U(a[d - 1][0], a[d - 1][1]), c = 0, d -=
          1; c < d; c++) {
            e.push(new g.U(a[c][0], a[c][1]));
          }
        } else {
          throw Error("AMap.LngLat expected, now it's " + a);
        }
        b && e.length && (b.controlPoints = g.a.Ha(e));
      }
      if (b.controlPoints && 2 < b.controlPoints.length) throw Error("Control Points Number should be 1 or 2 !");
      return b;
    }
  });
  z.A.tc = z.A.eC.extend({
    r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.Polygon";
      g.c.ra(this, a);
      this.B = !0;
      z.A.tc.Lc.r.apply(this, arguments);
      this.gg = !0;
      a = a || {};
      a.zIndex = "number" === typeof a.zIndex ? a.zIndex : 10;
      a.path && (a.path = this.Ha(a.path));
      g.a.Hb(this, g.extend({ fillColor: "#FFAA00", fillOpacity: 0.9 }, a));
      this.setOptions(this.C);
      this.B = !1;
    }, WM: function (a) {
      var b = 6378137 * Math.PI / 180, c = 0, d = a.length;
      if (3 > d) return 0;
      for (var e = 0; e < d - 1; e +=
      1) {
        var f = a[e], h = a[e + 1], k = f.R * b * Math.cos(f.P * Math.PI / 180), f = f.P * b, l = h.R *
        b * Math.cos(h.P * Math.PI / 180), c = c + (k * h.P * b - l * f);
      }
      e = a[e];
      a = a[0];
      d = e.R * b * Math.cos(e.P * Math.PI / 180);
      e = e.P * b;
      h = a.R * b * Math.cos(a.P * Math.PI / 180);
      c += d * a.P * b - h * e;
      return 0.5 * Math.abs(c);
    }, getArea: function () {
      g.c.add(this, "getArea");
      var a = this.get("path", null, !0), b;
      if (!a.length || a[0] instanceof g.U) {
        b = this.WM(a);
      } else {
        b = this.WM(a[0]);
        for (var c = 1; c < a.length; c += 1) b -= this.WM(a[c]);
      }
      return Number(b.toFixed(2));
    }, toString: function () {
      g.c.add(this, "toString");
      return this.get("path").join(";");
    }, contains: function (a) {
      g.c.add(this,
      "contains");
      a = g.a.Ha(a);
      var b = this.get("path");
      b.length && b[0] instanceof g.U && (b = [ b ]);
      a = [ a.R, a.P ];
      for (var c, d = 0, e = b.length; d < e && (c = this.Qea(b[d]), g.ed.Co(c) || c.reverse(), c =
      g.ed.ud(a, c, 0 === d ? !0 : !1), 0 < d && (c = !c), c); d += 1) {
        ;
      }
      return c;
    }, Qea: function (a) {
      for (var b = [], c = 0; c < a.length; c += 1) b.push([ a[c].R, a[c].P ]);
      return b;
    }
  });
  z.A.qg = z.A.Sc.extend({
    C: {
      visible: !0,
      zIndex: 10,
      strokeColor: "#006600",
      strokeOpacity: 0.9,
      strokeWeight: 3,
      strokeStyle: "solid",
      strokeDasharray: [ 10, 5 ],
      radius: 1E3,
      fillColor: "#006600",
      fillOpacity: 0.9,
      unit: "miter"
    }, r: function (a) {
      this.CLASS_NAME = this.CLASS_NAME || "AMap.Circle";
      g.c.ra(this, a);
      this.B = !0;
      z.A.qg.Lc.r.apply(this, arguments);
      a = a || {};
      a.center && (a.center = g.a.Ha(a.center));
      a.zIndex = "number" === typeof a.zIndex ? a.zIndex : 10;
      g.a.Yi(a.radius, "string") && (a.radius = parseFloat(a.radius), isNaN(a.radius) && delete a.radius);
      g.a.Hb(this, a);
      this.gg = this.C.center ? !0 : !1;
      this.setOptions(this.C);
      this.B = !1;
    }, setCenter: function (a, b) {
      g.c.add(this, "setCenter");
      (a = g.a.Ha(a)) && a instanceof g.U && (this.set("center", a), this.o("change", {
        type: "change",
        target: this
      }), this.gg || (this.gg = !0, this.get("map") && this.get("map").o("overlays")), b || this.o("setCenter"));
    }, getCenter: function () {
      g.c.add(this, "getCenter");
      var a = this.get("center", null, !0);
      this.A && this.A.get("deltaPos") && (a = this.A.pJ([ a ], this.A.get("deltaPos"))[0]);
      return a;
    }, setRadius: function (a,
                            b) {
      g.c.add(this, "setRadius");
      this.set("radius", a);
      this.o("change", { type: "change", target: this });
      b || this.o("setRadius");
    }, getPath: function (a) {
      g.c.add(this, "getPath");
      a = a || 36;
      for (var b = this.get("center", null, !0), c = this.get("radius", null, !0), d = [], e = 0; e < a; e +=
      1) {
        var f = Math.PI * e / a * 2, h = Math.cos(f) * c, f = Math.sin(f) * c;
        d.push(b.offset(h, f));
      }
      return d;
    }, getRadius: function () {
      g.c.add(this, "getRadius");
      return this.get("radius", null, !0);
    }, getBounds: function () {
      var a = this.get("center"), b = this.get("radius");
      if (!a) return null;
      var c = a.offset(-b, -b), a = a.offset(b, b);
      return new g.le(c, a);
    }, contains: function (a) {
      g.c.add(this, "contains");
      return this.get("center").be(a) <= this.get("radius") ? !0 : !1;
    }
  });
  z.A.zQ = z.A.qg.extend({
    r: function (a) {
      this.CLASS_NAME = "AMap.CircleMarker";
      g.c.ra(this, a);
      a = a || {};
      a.unit = "px";
      void 0 === a.radius ? a.radius = 20 : g.a.Yi(a.radius, "string") && (a.radius =
      parseFloat(a.radius), isNaN(a.radius) && (a.radius = 20));
      z.A.zQ.Lc.r.apply(this, arguments);
    }, getBounds: function () {
      this.B = !0;
      var a = this.getCenter();
      this.B = !1;
      return new g.le(a, a.jb());
    }, contains: function (a) {
      g.c.add(this, "contains");
      this.B = !0;
      var b = this.getMap();
      this.B = !1;
      if (!b) return !1;
      var c = this.get("center");
      b.B = !0;
      var d = !1;
      c.be(a) <=
      this.get("radius") * b.getResolution(c) && (d = !0);
      b.B = !1;
      return d;
    }
  });
  var pc = g.Z.extend({
    r: function (a) {
      var b = Array(3), c;
      c = a instanceof Array ? a : a instanceof g.kk || a instanceof g.Ka ? a.elements : arguments;
      b[0] = c[0] || 0;
      b[1] = c[1] || 0;
      b[2] = c[2] || 0;
      this.elements = b;
    },
    length: function () {return Math.sqrt(this.H_());},
    H_: function () {
      var a = this.elements;
      return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    },
    normalize: function () {
      var a = this.elements, b = a[0], c = a[1], d = a[2], e = Math.sqrt(b * b + c * c + d * d);
      if (e) {if (1 === e) return this;} else return a[0] = 0, a[1] = 0, a[2] = 0, this;
      e = 1 / e;
      a[0] = b * e;
      a[1] = c * e;
      a[2] = d * e;
      return this;
    },
    jb: function () {return new g.Ka(this);},
    copy: function (a) {
      var b = this.elements;
      a = a.elements;
      b[0] = a[0];
      b[1] = a[1];
      b[2] = a[2];
      return this;
    },
    set: function (a, b, c) {
      var d = this.elements;
      d[0] = a;
      d[1] = b;
      d[2] = c;
    },
    eb: function (a) {
      var b = this.elements;
      a = a.elements;
      return b[0] === a[0] && b[1] === a[1] && b[2] === a[2];
    },
    em: function (a) {
      var b = this.elements;
      b[0] *= a;
      b[1] *= a;
      b[2] *= a;
      return this;
    },
    add: function (a) {
      var b = this.elements;
      a = a.elements;
      b[0] += a[0];
      b[1] += a[1];
      b[2] += a[2];
      return this;
    },
    $da: function (a, b) {
      var c = a.elements, d = b.elements,
      e = this.elements;
      e[0] = c[0] + d[0];
      e[1] = c[1] + d[1];
      e[2] = c[2] + d[2];
      return this;
    },
    sub: function (a) {
      a = a.elements;
      var b = this.elements;
      b[0] -= a[0];
      b[1] -= a[1];
      b[2] -= a[2];
      return this;
    },
    ax: function (a, b) {
      var c = a.elements, d = b.elements, e = this.elements;
      e[0] = c[0] - d[0];
      e[1] = c[1] - d[1];
      e[2] = c[2] - d[2];
      return this;
    },
    eq: function (a) {
      a = a.elements;
      var b = this.elements;
      b[0] = b[1] * a[2] - b[2] * a[1];
      b[1] = b[2] * a[0] - b[0] * a[2];
      b[2] = b[0] * a[1] - b[1] * a[0];
      return this;
    },
    Cv: function (a, b) {
      var c = a.elements, d = b.elements, e = this.elements;
      e[0] = c[1] * d[2] -
      c[2] * d[1];
      e[1] = c[2] * d[0] - c[0] * d[2];
      e[2] = c[0] * d[1] - c[1] * d[0];
      return this;
    },
    $e: function (a) {
      a = a.elements;
      var b = this.elements;
      return b[0] * a[0] + b[1] * a[1] + b[2] * a[2];
    },
    be: function (a) {return Math.sqrt(this.aY(a));},
    aY: function (a) {
      var b = a.elements, c = this.elements;
      a = c[0] - b[0];
      var d = c[1] - b[1], b = c[2] - b[2];
      return a * a + d * d + b * b;
    },
    sf: function (a) {
      var b = this.elements[0], c = this.elements[1], d = this.elements[2];
      a = a.elements;
      var e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
      this.elements[0] = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
      this.elements[1] =
      (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
      this.elements[2] = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
      return this;
    }
  });
  g.Ka = pc;
  g.Ka.Dg({
    $e: "dot",
    jb: "clone",
    add: "add",
    sub: "sub",
    $da: "addVectors",
    ax: "subVectors",
    Cv: "crossVectors",
    normalize: "normalize",
    length: "length"
  });
  var qc = g.Z.extend({
    r: function (a) {
      var b = Array(4), c;
      c = a instanceof Array ? a : arguments;
      b[0] = c[0];
      b[1] = c[1];
      b[2] = c[2];
      b[3] = c[3] || 1;
      this.elements = b;
    }, copy: function (a) {
      var b = this.elements;
      a = a.elements;
      b[0] = a[0];
      b[1] = a[1];
      b[2] = a[2];
      b[3] = void 0 !== a[3] ? a[3] : 1;
      return this;
    }, multiply: function (a) {
      var b = this.elements;
      b[0] *= a;
      b[1] *= a;
      b[2] *= a;
      b[3] *= a;
    }, sf: function (a) {
      var b = this.elements[0], c = this.elements[1], d = this.elements[2], e = this.elements[3];
      a = a.elements;
      this.elements[0] = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
      this.elements[1] =
      a[1] * b + a[5] * c + a[9] * d + a[13] * e;
      this.elements[2] = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
      this.elements[3] = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
      return this;
    }
  });
  g.kk = qc;

  function rc (a, b) {
    this.ww = void 0 !== a ? a : new g.Ka(1, 0, 0);
    this.Iz = void 0 !== b ? b : 0;
  }

  g.ou = rc;
  rc.prototype = {
    set: function (a, b) {
      this.ww.copy(a);
      this.Iz = b;
      return this;
    }, normalize: function () {
      var a = 1 / this.ww.length();
      this.ww.em(a);
      this.Iz *= a;
      return this;
    }, KE: function (a) {return this.ww.$e(a) + this.Iz;}
  };

  function sc (a, b, c, d, e) {
    a.ww.set(b, c, d);
    a.Iz = e;
    return a;
  };

  function tc (a, b, c, d, e, f) {
    this.YA =
    [
      void 0 !== a ? a : new g.ou,
      void 0 !== b ? b : new g.ou,
      void 0 !== c ? c : new g.ou,
      void 0 !== d ? d : new g.ou,
      void 0 !== e ? e : new g.ou,
      void 0 !== f ? f : new g.ou
    ];
  }

  g.IQ = tc;
  tc.prototype = {
    set: function (a, b, c, d, e, f) {
      var h = this.YA;
      h[0].copy(a);
      h[1].copy(b);
      h[2].copy(c);
      h[3].copy(d);
      h[4].copy(e);
      h[5].copy(f);
      return this;
    },
    jb: function () {return (new g.IQ).copy(this);},
    copy: function (a) {
      for (var b = this.YA, c = 0; 6 > c; c++) b[c].copy(a.YA[c]);
      return this;
    },
    GF: function () {
      var a = new g.Ka, b = new g.Ka, c = a.elements, d = b.elements;
      return function (e) {
        var f = this.YA, h = e.max.elements;
        e = e.min.elements;
        for (var k = 0; 6 > k; k++) {
          var l = f[k], m = l.ww.elements;
          c[0] = 0 < m[0] ? e[0] : h[0];
          d[0] = 0 < m[0] ? h[0] : e[0];
          c[1] = 0 < m[1] ?
          e[1] : h[1];
          d[1] = 0 < m[1] ? h[1] : e[1];
          c[2] = 0 < m[2] ? e[2] : h[2];
          d[2] = 0 < m[2] ? h[2] : e[2];
          m = l.KE(a);
          l = l.KE(b);
          if (0 > m && 0 > l) return !1;
        }
        return !0;
      };
    }()
  };
  (function (a) {
    function b (a) {this.elements = a || [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];}

    a.WH =
    function (a) {
      this.elements =
      [
        a.elements[0],
        a.elements[1],
        a.elements[2],
        a.elements[4],
        a.elements[5],
        a.elements[6],
        a.elements[8],
        a.elements[9],
        a.elements[10]
      ];
    };
    b.prototype.pP = function () {
      var a = this.elements;
      a[0] = 1;
      a[4] = 0;
      a[8] = 0;
      a[12] = 0;
      a[1] = 0;
      a[5] = 1;
      a[9] = 0;
      a[13] = 0;
      a[2] = 0;
      a[6] = 0;
      a[10] = 1;
      a[14] = 0;
      a[3] = 0;
      a[7] = 0;
      a[11] = 0;
      a[15] = 1;
    };
    b.prototype.set = function (a) {
      if (a.elements !== this.elements) {
        return this.elements = a.elements.slice(0),
        this;
      }
    };
    b.prototype.toFixed =
    function (b) {
      for (var d = this.elements, e = 0; 16 > e; ++e) 0 !== d[e] && (d[e] = a.a.jd(d[e], b));
      return this;
    };
    b.prototype.concat = function (a) {
      var b, e, f, h, k, l, m;
      e = b = this.elements;
      f = a.elements;
      if (b === f) for (f = Array(16), a = 0; 16 > a; ++a) f[a] = b[a];
      for (a = 0; 4 > a; a++) {
        h = e[a], k = e[a + 4], l = e[a + 8], m = e[a + 12], b[a] =
        h * f[0] + k * f[1] + l * f[2] + m * f[3], b[a + 4] = h * f[4] + k * f[5] + l * f[6] + m * f[7], b[a + 8] =
        h * f[8] + k * f[9] + l * f[10] + m * f[11], b[a + 12] = h * f[12] + k * f[13] + l * f[14] + m * f[15];
      }
      return this;
    };
    b.multiply = function (b, d) {
      var e = Array(16), f, h,
      k, l, m, n, p;
      k = h = b.elements;
      l = d.elements;
      if (h === l) for (f = 0; 16 > f; ++f) e[f] = h[f];
      for (f = 0; 4 > f; f++) {
        h = k[f], m = k[f + 4], n = k[f + 8], p = k[f + 12], e[f] =
        h * l[0] + m * l[1] + n * l[2] + p * l[3], e[f + 4] = h * l[4] + m * l[5] + n * l[6] + p * l[7], e[f + 8] =
        h * l[8] + m * l[9] + n * l[10] + p * l[11], e[f + 12] = h * l[12] + m * l[13] + n * l[14] + p * l[15];
      }
      return new a.Jd(e);
    };
    b.prototype.multiply = b.prototype.concat;
    b.prototype.Lg = function (b) {
      var d = this.elements;
      b = b.elements;
      var e = new a.kk, f = e.elements;
      f[0] = b[0] * d[0] + b[1] * d[4] + b[2] * d[8] + b[3] * d[12];
      f[1] = b[0] * d[1] + b[1] * d[5] + b[2] * d[9] + b[3] *
      d[13];
      f[2] = b[0] * d[2] + b[1] * d[6] + b[2] * d[10] + b[3] * d[14];
      f[3] = b[0] * d[3] + b[1] * d[7] + b[2] * d[11] + b[3] * d[15];
      return e;
    };
    b.prototype.hx = function () {
      var a, b;
      a = this.elements;
      b = a[1];
      a[1] = a[4];
      a[4] = b;
      b = a[2];
      a[2] = a[8];
      a[8] = b;
      b = a[3];
      a[3] = a[12];
      a[12] = b;
      b = a[6];
      a[6] = a[9];
      a[9] = b;
      b = a[7];
      a[7] = a[13];
      a[13] = b;
      b = a[11];
      a[11] = a[14];
      a[14] = b;
      return this;
    };
    b.prototype.Bna = function (a) {
      var b, e, f;
      b = a.elements;
      a = this.elements;
      e = [];
      e[0] =
      b[5] * (b[10] * b[15] - b[11] * b[14]) - b[9] * (b[6] * b[15] + b[7] * b[14]) + b[13] * (b[6] * b[11] - b[7] * b[10]);
      e[4] = -b[4] *
      (b[10] * b[15] - b[11] * b[14]) + b[8] * (b[6] * b[15] - b[7] * b[14]) - b[12] * (b[6] * b[11] - b[7] * b[10]);
      e[8] =
      b[4] * (b[9] * b[15] - b[11] * b[13]) - b[8] * (b[5] * b[15] - b[7] * b[13]) + b[12] * (b[5] * b[11] - b[7] * b[9]);
      e[12] =
      -b[4] * (b[9] * b[14] - b[10] * b[13]) + b[8] * (b[5] * b[14] - b[6] * b[13]) - b[12] * (b[5] * b[10] - b[6] * b[9]);
      e[1] =
      -b[1] * (b[10] * b[15] - b[11] * b[14]) + b[9] * (b[2] * b[15] - b[3] * b[14]) - b[13] * (b[2] * b[11] - b[3] * b[10]);
      e[5] =
      b[0] * (b[10] * b[15] - b[11] * b[14]) - b[8] * (b[2] * b[15] - b[3] * b[14]) + b[12] * (b[2] * b[11] - b[3] * b[10]);
      e[9] = -b[0] * (b[9] * b[15] - b[11] * b[13]) + b[8] *
      (b[1] * b[15] - b[3] * b[13]) - b[12] * (b[1] * b[11] - b[3] * b[9]);
      e[13] =
      b[0] * (b[9] * b[14] - b[10] * b[13]) - b[8] * (b[1] * b[14] - b[2] * b[13]) + b[12] * (b[1] * b[10] - b[2] * b[9]);
      e[2] =
      b[1] * (b[6] * b[15] - b[7] * b[14]) - b[5] * (b[2] * b[15] - b[3] * b[14]) + b[13] * (b[2] * b[7] - b[3] * b[6]);
      e[6] =
      -b[0] * (b[6] * b[15] - b[7] * b[14]) + b[4] * (b[2] * b[15] - b[3] * b[14]) - b[12] * (b[2] * b[7] - b[3] * b[6]);
      e[10] =
      b[0] * (b[5] * b[15] - b[7] * b[13]) - b[4] * (b[1] * b[15] - b[3] * b[13]) + b[12] * (b[1] * b[7] - b[3] * b[5]);
      e[14] = -b[0] * (b[5] * b[14] - b[6] * b[13]) + b[4] * (b[1] * b[14] - b[2] * b[13]) - b[12] * (b[1] * b[6] -
      b[2] * b[5]);
      e[3] =
      -b[1] * (b[6] * b[11] - b[7] * b[10]) + b[5] * (b[2] * b[11] - b[3] * b[10]) - b[9] * (b[2] * b[7] - b[3] * b[6]);
      e[7] =
      b[0] * (b[6] * b[11] - b[7] * b[10]) - b[4] * (b[2] * b[11] + b[3] * b[10]) + b[8] * (b[2] * b[7] - b[3] * b[6]);
      e[11] =
      -b[0] * (b[5] * b[11] + b[7] * b[9]) + b[4] * (b[1] * b[11] - b[3] * b[9]) - b[8] * (b[1] * b[7] + b[3] * b[5]);
      e[15] =
      b[0] * (b[5] * b[10] - b[6] * b[9]) - b[4] * (b[1] * b[10] + b[2] * b[9]) + b[8] * (b[1] * b[6] - b[2] * b[5]);
      f = b[0] * e[0] + b[1] * e[4] + b[2] * e[8] + b[3] * e[12];
      if (0 === f) return this;
      f = 1 / f;
      for (b = 0; 16 > b; b++) a[b] = e[b] * f;
      return this;
    };
    b.prototype.Qf = function () {return (new b).Bna(this);};
    b.prototype.sP = function (a, b, e, f, h, k) {
      var l, m, n, p;
      if (a === b || e === f || h === k) throw"null frustum";
      m = 1 / (b - a);
      n = 1 / (f - e);
      p = 1 / (k - h);
      l = this.elements;
      l[0] = 2 * m;
      l[1] = 0;
      l[2] = 0;
      l[3] = 0;
      l[4] = 0;
      l[5] = 2 * n;
      l[6] = 0;
      l[7] = 0;
      l[8] = 0;
      l[9] = 0;
      l[10] = -2 * p;
      l[11] = 0;
      l[12] = -(b + a) * m;
      l[13] = -(f + e) * n;
      l[14] = -(k + h) * p;
      l[15] = 1;
      return this;
    };
    b.prototype.lla = function (a, d, e, f, h, k) {return this.concat((new b).sP(a, d, e, f, h, k));};
    b.prototype.zna = function (a, b, e, f, h, k) {
      var l, m, n, p;
      if (a === b || f === e || h === k) throw"null frustum";
      if (0 >= h) throw"near <= 0";
      if (0 >=
      k) {
        throw"far <= 0";
      }
      m = 1 / (b - a);
      n = 1 / (f - e);
      p = 1 / (k - h);
      l = this.elements;
      l[0] = 2 * h * m;
      l[1] = 0;
      l[2] = 0;
      l[3] = 0;
      l[4] = 0;
      l[5] = 2 * h * n;
      l[6] = 0;
      l[7] = 0;
      l[8] = (b + a) * m;
      l[9] = (f + e) * n;
      l[10] = -(k + h) * p;
      l[11] = -1;
      l[12] = 0;
      l[13] = 0;
      l[14] = -2 * h * k * p;
      l[15] = 0;
      return this;
    };
    b.prototype.CM = function (a, d, e, f, h, k) {return this.concat((new b).zna(a, d, e, f, h, k));};
    b.prototype.h2 = function (a, b, e, f) {
      var h, k;
      if (e === f || 0 === b) throw"null frustum";
      if (0 >= e) throw"near <= 0";
      if (0 >= f) throw"far <= 0";
      a /= 2;
      k = Math.sin(a);
      if (0 === k) throw"null frustum";
      h = 1 / (f - e);
      k = Math.cos(a) /
      k;
      a = this.elements;
      a[0] = k / b;
      a[1] = 0;
      a[2] = 0;
      a[3] = 0;
      a[4] = 0;
      a[5] = k;
      a[6] = 0;
      a[7] = 0;
      a[8] = 0;
      a[9] = 0;
      a[10] = -(f + e) * h;
      a[11] = -1;
      a[12] = 0;
      a[13] = 0;
      a[14] = -2 * e * f * h;
      a[15] = 0;
      return this;
    };
    b.prototype.perspective = function (a, d, e, f) {return this.concat((new b).h2(a, d, e, f));};
    b.prototype.Bt = function (a, b, e) {
      var f = this.elements;
      f[0] = a;
      f[4] = 0;
      f[8] = 0;
      f[12] = 0;
      f[1] = 0;
      f[5] = b;
      f[9] = 0;
      f[13] = 0;
      f[2] = 0;
      f[6] = 0;
      f[10] = e;
      f[14] = 0;
      f[3] = 0;
      f[7] = 0;
      f[11] = 0;
      f[15] = 1;
      return this;
    };
    b.prototype.scale = function (a, b, e) {
      var f = this.elements;
      f[0] *= a;
      f[4] *= b;
      f[8] *= e;
      f[1] *= a;
      f[5] *= b;
      f[9] *= e;
      f[2] *= a;
      f[6] *= b;
      f[10] *= e;
      f[3] *= a;
      f[7] *= b;
      f[11] *= e;
      return this;
    };
    b.prototype.k2 = function (a, b, e) {
      var f = this.elements;
      f[12] = a;
      f[13] = b;
      f[14] = e;
      return this;
    };
    b.prototype.translate = function (a, b, e) {
      var f = this.elements;
      f[12] += f[0] * a + f[4] * b + f[8] * e;
      f[13] += f[1] * a + f[5] * b + f[9] * e;
      f[14] += f[2] * a + f[6] * b + f[10] * e;
      f[15] += f[3] * a + f[7] * b + f[11] * e;
      return this;
    };
    b.prototype.Vw = function (a, b, e, f) {
      var h, k, l, m, n, p, q, s;
      a = Math.PI * a / 180;
      h = this.elements;
      k = Math.sin(a);
      a = Math.cos(a);
      0 !== b && 0 === e && 0 === f ?
      (0 > b && (k = -k), h[0] = 1, h[4] = 0, h[8] = 0, h[12] = 0, h[1] = 0, h[5] = a, h[9] = -k, h[13] = 0, h[2] =
      0, h[6] = k, h[10] = a, h[14] = 0, h[3] = 0, h[7] = 0, h[11] = 0) : 0 === b && 0 !== e && 0 === f ? (0 > e && (k =
      -k), h[0] = a, h[4] = 0, h[8] = k, h[12] = 0, h[1] = 0, h[5] = 1, h[9] = 0, h[13] = 0, h[2] = -k, h[6] =
      0, h[10] = a, h[14] = 0, h[3] = 0, h[7] = 0, h[11] = 0) : 0 === b && 0 === e && 0 !== f ? (0 > f && (k =
      -k), h[0] = a, h[4] = -k, h[8] = 0, h[12] = 0, h[1] = k, h[5] = a, h[9] = 0, h[13] = 0, h[2] = 0, h[6] =
      0, h[10] = 1, h[14] = 0, h[3] = 0, h[7] = 0, h[11] = 0) : (l = Math.sqrt(b * b + e * e + f * f), 1 !== l && (l =
      1 / l, b *= l, e *= l, f *= l), l = 1 - a, m = b * e, n = e * f, p = f * b, q = b * k,
      s = e * k, k *= f, h[0] = b * b * l + a, h[1] = m * l + k, h[2] = p * l - s, h[3] = 0, h[4] = m * l - k, h[5] =
      e * e * l + a, h[6] = n * l + q, h[7] = 0, h[8] = p * l + s, h[9] = n * l - q, h[10] = f * f * l + a, h[11] =
      0, h[12] = 0, h[13] = 0, h[14] = 0);
      h[15] = 1;
      return this;
    };
    b.prototype.rotate = function (a, d, e, f) {return this.concat((new b).Vw(a, d, e, f));};
    b.prototype.Xq = function (a) {return this.rotate(a, 1, 0, 0);};
    b.prototype.Yq = function (a) {return this.rotate(a, 0, 1, 0);};
    b.prototype.Zq = function (a) {return this.rotate(a, 0, 0, 1);};
    a.Jd = b;
  })(g);
  z.A.pr = z.A.tc.extend({
    C: {
      visible: !0,
      zIndex: 10,
      strokeColor: "#006600",
      strokeOpacity: 0.9,
      strokeWeight: 3,
      strokeStyle: "solid",
      strokeDasharray: [ 10, 5 ],
      radius: [ 1E3, 1E3 ],
      fillColor: "#006600",
      fillOpacity: 0.9
    }, r: function () {
      var a = this, b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      this.CLASS_NAME = "AMap.Ellipse";
      g.c.ra(this, b);
      var b = g.extend({}, this.C, b), c = this.Tp(b);
      b.path = c;
      z.A.pr.Lc.r.call(this, b);
      this.set("path", c);
      this.get("center") && this.get("map") || (this.gg = !1);
      this.on("movepoly", function (b) {
        var c =
        a.get("map");
        b = c.we(c.Pb(a.get("center")).add(b.Cw));
        "3D" === c.view.type && a.set("deltaPos", [ 0, 0 ]);
        a.set("center", b);
      });
    }, Tp: function () {
      var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      b = [],
      c = a.center || this.get("center"),
      d = a.map || this.get("map");
      if (c && d) {
        for (var c = g.a.Ha(c), e = a.radius || this.get("radius"), f = d.Pb(c), a = f.x, f = f.y, h = g.a.map(e, function (a) {return a / d.getResolution(c, 20);}), e = h[0], h = h[1], k = g.l.Y, l = (k
        ? 4
        : 1) * Math.PI / 180, m = 0, k = k ? 89 : 359; m <= k; m++) {
          var n = m * l, n = {
            x: a + e * Math.cos(n), y: f + h *
            Math.sin(n)
          };
          b.push(d.we(n));
        }
      }
      return b;
    }, mapChanged: function () {
      g.a.Hh(z.A.pr.Lc.mapChanged) && z.A.pr.Lc.mapChanged.apply(this);
      this.B = !0;
      this.setPath(this.Tp());
      this.B = !1;
      !this.gg && this.get("map") && (this.gg = !0, this.get("map").o("overlays"));
    }, setCenter: function (a, b) {
      g.c.add(this, "setCenter");
      (a = g.a.Ha(a)) && a instanceof g.U && (this.set("center", a), this.set("path", this.Tp()), this.gg || (this.gg =
      !0, this.get("map") && this.get("map")
      .o("overlays")), b || (this.o("setCenter"), this.o("change", { type: "change", target: this })));
    },
    setRadius: function (a) {
      var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1;
      g.c.add(this, "setRadius");
      a && 2 === a.length && (this.set("radius", a), this.set("path", this.Tp()), b || (this.o("change", {
        type: "change",
        target: this
      }), this.o("setPath")));
    }, setOptions: function (a) {
      z.A.pr.Lc.setOptions.call(this, a);
      this.B = !0;
      a.radius && this.setRadius(a.radius, !0);
      a.center && this.setCenter(a.center, !0);
      this.B = !1;
    }, getRadius: function () {
      g.c.add(this, "getRadius");
      return this.get("radius", null, !0);
    }, getCenter: function () {
      g.c.add(this,
      "getCenter");
      var a = this.get("center", null, !0);
      this.A && this.A.get("deltaPos") && this.A.pJ([ a ], this.A.get("deltaPos"))[0];
      return a;
    }
  });
  z.A.tr = z.A.tc.extend({
    C: {
      visible: !0,
      zIndex: 10,
      strokeColor: "#006600",
      strokeOpacity: 0.9,
      strokeWeight: 3,
      strokeStyle: "solid",
      strokeDasharray: [ 10, 5 ],
      fillColor: "#006600",
      fillOpacity: 0.9
    },
    r: function () {
      var a = this, b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      this.CLASS_NAME = "AMap.Rectangle";
      g.c.ra(this, b);
      b = g.extend({}, this.C, b);
      this.B = !0;
      var c = this.Tp(b);
      b.path = c;
      z.A.tr.Lc.r.call(this, b);
      this.setPath(c);
      this.C.bounds && this.get("map") || (this.gg = !1);
      this.on("movepoly", function (b) {
        var c = a.get("map"),
        f = a.get("bounds"), h = c.we(c.Pb(f.pc).add(b.Cw));
        b = c.we(c.Pb(f.$b).add(b.Cw));
        "3D" === c.view.type && a.set("deltaPos", [ 0, 0 ]);
        a.set("bounds", new g.le(h, b));
      });
      this.B = !1;
    },
    Tp: function () {
      var a = [],
      b = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).bounds || this.get("bounds");
      if (b) {
        b.B = !0;
        var c = b.getSouthWest(), d = b.getNorthEast();
        b.B = !1;
        g.a.Lb([
          new g.U(c.R, c.P, !0),
          new g.U(d.R, c.P, !0),
          new g.U(d.R, d.P, !0),
          new g.U(c.R, d.P, !0)
        ], function (b) {return a.push(b);});
      }
      return a;
    },
    mapChanged: function () {
      g.a.Hh(z.A.tr.Lc.mapChanged) &&
      z.A.tr.Lc.mapChanged.apply(this);
      this.B = !0;
      this.setPath(this.Tp());
      this.B = !1;
      !this.gg && this.get("map") && (this.gg = !0, this.get("map").o("overlays"));
    },
    setOptions: function (a) {
      this.B = !0;
      z.A.tr.Lc.setOptions.call(this, a);
      a.bounds && this.setBounds(a.bounds, !0);
      this.B = !1;
    },
    setBounds: function (a) {
      var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1;
      g.c.add(this, "setBounds");
      a && a instanceof g.le && (this.set("bounds", a), this.set("path", this.Tp()), this.gg || (this.gg =
      !0, this.get("map") && this.get("map").o("overlays")),
      b || (this.o("change", { type: "change", target: this }), this.o("setBounds")));
    },
    getBounds: function () {
      g.c.add(this, "getBounds");
      return this.get("bounds", null, !0);
    }
  });
  z.A.eR = z.A.lb.extend({
    C: { text: "", textAlign: "center", verticalAlign: "middle", offset: new g.G(0, 0) },
    r: function (a) {
      this.CLASS_NAME = "AMap.Text";
      g.c.ra(this, a);
      z.A.eR.Lc.r.apply(this, arguments);
      this.v9();
      this.B = !0;
      this.setText(this.get("text"));
      this.setStyle(this.get("style"));
      this.B = !1;
    },
    v9: function () {
      if (!this.pz) {
        var a = document.createElement("div");
        a.className = "amap-overlay-text-container";
        this.pz = a;
      }
    },
    getText: function () {
      g.c.add(this, "getText");
      return this.get("text", null, !0);
    },
    setText: function (a) {
      g.c.add(this,
      "setText");
      a || 0 === a || (a = "");
      g.g.zoa(this.pz, "amap-overlay-text-empty", !a);
      g.c.add(this, "setText");
      this.set("text", a);
      this.pz.innerHTML = a;
      this.n1();
    },
    setStyle: function (a) {
      g.c.add(this, "setStyle");
      g.extend(this.pz.style, a);
      this.n1();
    },
    n1: function () {
      this.B = !0;
      this.setContent(this.pz);
      this.setShadow(this.getShadow());
      this.B = !1;
    }
  });
  g.MQ = {
    find: function (a) {return g.a.find(this.uu || [], a);},
    hF: function () {return this.uu || [];},
    kd: function (a) {return null !== this.find(a);},
    add: function (a) {
      var b = this,
      c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.a.Mq,
      d = this.uu || (this.uu = []);
      g.a.isArray(a) ? g.a.Lb(a, function (a) {b.add(a, c);}) : null === this.find(a) && (d.push(a), c(a));
      return this;
    },
    remove: function (a) {
      var b = this, c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.a.Mq, d = this.uu;
      if (d) {
        if (g.a.isArray(a)) {
          g.a.Lb(a, function (a) {
            b.remove(a,
            c);
          });
        } else {
          var e = g.a.indexOf(d, a);
          -1 !== e && (c(d[e]), d.splice(e, 1));
        }
      }
      return this;
    },
    clear: function () {
      this.Lb(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : g.a.Mq);
      this.uu = [];
      return this;
    },
    Lb: function () {
      var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : g.a.Mq,
      b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
      g.a.Lb(this.uu || [], function () {
        for (var c = arguments.length, d = Array(c), e = 0; e < c; e++) {
          d[e] =
          arguments[e];
        }
        c = d[0];
        g.a.Hh(c.Lb) ? c.Lb(a, b) : a.apply(b || c, d);
      });
      return this;
    },
    en: function (a) {
      for (var b =
      arguments.length, c = Array(1 < b ? b - 1 : 0), d = 1; d < b; d++) {
        c[d - 1] = arguments[d];
      }
      this.Lb(function (b) {b && g.a.Hh(b[a]) && b[a].apply(b, c);});
      return this;
    },
    h: function (a) {
      var b = arguments;
      this.Lb(function (a) {a.on.apply(a, b);});
      return this;
    },
    I: function (a) {
      var b = arguments;
      this.Lb(function (a) {a.off.apply(a, b);});
      return this;
    },
    addListener: function () {this.h.apply(this, arguments);},
    nv: function (a) {
      var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.a.Mq,
      c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      this.Lb(function (d) {
        d.on.call(d,
        event, function () {
          b();
          d.off(a);
        }, c);
      });
    },
    removeListener: function (a) {this.I(a.mM, a.nN, a.Ze);},
    M: function (a, b) {this.Lb(function (c) {c.emit(a, b);});}
  };
  z.A.sm = z.A.qh.extend({
    ga: [ g.MQ ], r: function () {
      var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
      this.CLASS_NAME = "AMap.OverlayGroup";
      g.c.ra(this);
      z.A.sm.Lc.r.apply(this);
      this.map = null;
      this.add(a);
    }, cc: function (a) {
      g.c.add(this, "setMap");
      this.en("setMap", a);
      this.en("setMap", a);
      this.set("map", a);
      this.map = a;
      return this;
    }, mapChanged: function () {}, sz: function (a) {
      var b = this;
      g.c.add(this, "addOverlay");
      this.add(a, function (a) {b.map && (a.B = !0, a.setMap(b.map), a.B = !1);});
      return this;
    }, Kw: function (a) {
      var b =
      this;
      g.c.add(this, "removeOverlay");
      this.remove(a, function (a) {
        a.B = !0;
        a.getMap() === b.map && a.setMap(null);
        a.B = !1;
      });
      return this;
    }, Tc: function () {
      var a = this;
      g.c.add(this, "clearOverlays");
      this.clear(function (b) {
        b.B = !0;
        b.getMap() === a.map && b.setMap(null);
        b.B = !1;
      });
      return this;
    }, ew: function () {
      g.c.add(this, "hide");
      this.en("hide");
      return this;
    }, show: function () {
      g.c.add(this, "show");
      this.en("show");
      return this;
    }, Hb: function () {
      var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      g.c.add(this, "setOptions");
      this.en("setOptions", a);
      return this;
    }
  });
  z.A.sm.Dg({
    find: "getOverlay",
    hF: "getOverlays",
    sz: [ "addOverlay", "addOverlays" ],
    kd: "hasOverlay",
    Kw: [ "removeOverlay", "removeOverlays" ],
    Tc: "clearOverlays",
    Lb: "eachOverlay",
    cc: "setMap",
    Hb: "setOptions",
    show: "show",
    ew: "hide",
    h: "on",
    I: "off"
  });
  (function (a, b) {
    function c (a, b) {
      if (!a.length) return !1;
      for (var c = 0, d = a.length; c < d; c++) {
        var e = a[c];
        if (!("*" === b || e && e.geometry && e.geometry.type === b) || e && e.properties && !e.properties._isAmap) return !1;
      }
      return !0;
    }

    function d (a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) b.push(a[c].geometry.coordinates);
      return b;
    }

    function e (a) {
      if (!a) return [];
      a = b.a.Ha(a);
      for (var c = [], d = 0, e = a.length; d < e; d++) c[d] = a[d].gl();
      return c;
    }

    a.A.JQ = a.A.sm.extend({
      r: function (c) {
        this.CLASS_NAME = "AMap.GeoJSON";
        b.c.ra(this, c);
        a.A.JQ.Lc.r.call(this,
        []);
        this.B = !0;
        this.C =
        b.extend({
          getMarker: function (b, c) {return new a.A.lb({ innerOverlay: !0, position: c });},
          getPolyline: function (b, c) {return new a.A.Ob({ path: c, innerOverlay: !0 });},
          getPolygon: function (b, c) {return new a.A.tc({ path: c, innerOverlay: !0 });},
          coordsToLatLng: function (a) {return a;}
        }, c);
        if (!this.C.coordsToLatLngs) {
          var d = this.C.coordsToLatLng;
          this.C.coordsToLatLngs =
          function (a) {
            for (var b = [], c = 0, e = a.length; c < e; c++) b.push(d.call(null, a[c]));
            return b;
          };
        }
        this.importData(this.C.geoJSON);
        this.B = !1;
      },
      importData: function (a) {
        b.c.add(this,
        "importData");
        if (a && (a = this.r9(a), a.length)) {
          this.clearOverlays();
          this.sz(a);
          var c = this.C.map;
          if (c) for (var d = 0, e = a.length; d < e; d++) a[d].B = !0, a[d].setMap(c), a[d].B = !1;
        }
      },
      toGeoJSON: function () {
        b.c.add(this, "toGeoJSON");
        for (var a = this.hF(), c = [], d = 0, e = a.length; d < e; d++) {
          a[d].B = !0, c[d] = a[d].toGeoJSON(), a[d].B =
          !1;
        }
        return c;
      },
      r9: function (a) {
        if (a) {
          b.a.isArray(a) || (a = [ a ]);
          for (var c = [], d = 0, e = a.length; d < e; d++) {
            var m = this.s9(a[d]);
            m && c.push(m);
          }
          return c;
        }
      },
      SR: function (a) {
        var b = "Feature" === a.type ? a.geometry : a, b = this.C.coordsToLatLng(b ?
        b.coordinates : null), b = this.C.getMarker(a, b);
        this.Mp(a, b);
        return b;
      },
      I6: function (c) {
        for (var d = "Feature" === c.type ? c.geometry : c, d = d
        ? d.coordinates
        : null, e = [], l = 0, m = d.length; l < m; l++) {
          e.push(this.SR(b.extend({}, c, {
            type: "Feature",
            properties: { _isAmap: !0, _pointIndex: l, _parentProperities: c.properties },
            geometry: { type: "Point", coordinates: d[l] }
          })));
        }
        d = new a.A.sm(e);
        this.Mp(c, d);
        return d;
      },
      RR: function (a) {
        var b = "Feature" === a.type ? a.geometry : a,
        b = this.C.coordsToLatLngs(b ? b.coordinates : null),
        b = this.C.getPolyline(a, b);
        this.Mp(a,
        b);
        return b;
      },
      H6: function (c) {
        for (var d = "Feature" === c.type ? c.geometry : c, d = d
        ? d.coordinates
        : null, e = [], l = 0, m = d.length; l < m; l++) {
          e.push(this.RR(b.extend({}, c, {
            type: "Feature",
            properties: { _isAmap: !0, _lineStringIndex: l, _parentProperities: c.properties },
            geometry: { type: "LineString", coordinates: d[l] }
          })));
        }
        d = new a.A.sm(e);
        this.Mp(c, d);
        return d;
      },
      TR: function (a) {
        for (var b = "Feature" === a.type ? a.geometry : a, b = b
        ? b.coordinates
        : null, c = [], d = 0, e = b.length; d < e; d++) {
          c.push(this.C.coordsToLatLngs(b[d]));
        }
        b = this.C.getPolygon(a, c);
        this.Mp(a,
        b);
        return b;
      },
      J6: function (c) {
        for (var d = "Feature" === c.type ? c.geometry : c, d = d
        ? d.coordinates
        : null, e = [], l = 0, m = d.length; l < m; l++) {
          e.push(this.TR(b.extend({}, c, {
            type: "Feature",
            properties: { _isAmap: !0, _polygonIndex: l, _parentProperities: c.properties },
            geometry: { type: "Polygon", coordinates: d[l] }
          })));
        }
        d = new a.A.sm(e);
        this.Mp(c, d);
        return d;
      },
      B6: function (c) {
        for (var d = ("Feature" === c.type
        ? c.geometry
        : c).geometries, e = [], l = 0, m = d.length; l < m; l++) {
          e.push(this.xJ(b.extend({}, c, {
            type: "Feature", properties: {
              _isAmap: !0, _geometryIndex: l,
              _parentProperities: c.properties
            }, geometry: d[l]
          })));
        }
        d = new a.A.sm(e);
        this.Mp(c, d);
        return d;
      },
      s9: function (b) {
        if (b) {
          switch (b.type) {
            case "Feature":
              return this.xJ(b);
            case "FeatureCollection":
              for (var c = b.features, d = [], e = 0, m = c.length; e < m; e++) {
                var n = this.xJ(c[e]);
                n && d.push(n);
              }
              c = new a.A.sm(d);
              this.Mp(b, c);
              return c;
            default:
              throw Error("Invalid GeoJSON object." + b.type);
          }
        }
      },
      Mp: function (a, c) {
        c && a.properties && c.setExtData && (c.B =
        !0, c.setExtData(b.extend({}, c.getExtData() || {}, { _geoJsonProperties: a.properties })), c.B =
        !1);
      },
      xJ: function (a) {
        var b = "Feature" === a.type ? a.geometry : a;
        if (!(b && b.coordinates || b)) return null;
        switch (b.type) {
          case "Point":
            return this.SR(a);
          case "MultiPoint":
            return this.I6(a);
          case "LineString":
            return this.RR(a);
          case "MultiLineString":
            return this.H6(a);
          case "Polygon":
            return this.TR(a);
          case "MultiPolygon":
            return this.J6(a);
          case "GeometryCollection":
            return this.B6(a);
          default:
            throw Error("Invalid GeoJSON geometry." + b.type);
        }
      }
    });
    a.A.sm.wb({
      toGeoJSON: function (a) {
        b.c.add(this, "toGeoJSON");
        a = a || this.hF();
        for (var e = [], k = 0, l = a.length; k < l; k++) {
          a[k].toGeoJSON && (a[k].B = !0, e[k] =
          a[k].toGeoJSON(), a[k].B = !1);
        }
        this.B = !0;
        a = this.getExtData() || {};
        this.B = !1;
        if (c(e, "Point")) {
          e =
          {
            type: "Feature",
            properties: a._geoJsonProperties || {},
            geometry: { type: "MultiPoint", coordinates: d(e) }
          };
        } else if (c(e, "LineString")) {
          e =
          {
            type: "Feature",
            properties: a._geoJsonProperties || {},
            geometry: { type: "MultiLineString", coordinates: d(e) }
          };
        } else if (c(e, "Polygon")) {
          e =
          {
            type: "Feature",
            properties: a._geoJsonProperties || {},
            geometry: { type: "MultiPolygon", coordinates: d(e) }
          };
        } else if (c(e, "*")) {
          a = a._geoJsonProperties || {};
          for (var k = [], l = 0, m = e.length; l < m; l++) k.push(e[l].geometry);
          e = { type: "Feature", properties: a, geometry: { type: "GeometryCollection", geometries: k } };
        } else {
          e = { type: "FeatureCollection", properties: a._geoJsonProperties || {}, features: e };
        }
        return e;
      }
    });
    a.A.lb.wb({
      toGeoJSON: function () {
        b.c.add(this, "toGeoJSON");
        this.B = !0;
        var a = this.getExtData() || {}, c = this.getPosition().gl();
        this.B = !1;
        return { type: "Feature", properties: a._geoJsonProperties || {}, geometry: { type: "Point", coordinates: c } };
      }
    });
    a.A.Ob.wb({
      toGeoJSON: function () {
        b.c.add(this, "toGeoJSON");
        this.B = !0;
        var a = this.getExtData() || {}, c = this.getPath();
        this.B = !1;
        return {
          type: "Feature",
          properties: a._geoJsonProperties || {},
          geometry: { type: "LineString", coordinates: e(c) }
        };
      }
    });
    a.A.tc.wb({
      toGeoJSON: function () {
        b.c.add(this, "toGeoJSON");
        this.B = !0;
        var a = this.getExtData() || {}, c = this.getPath();
        this.B = !1;
        a = a._geoJsonProperties || {};
        if (c) {
          c = b.a.Ha(c);
          b.a.isArray(c[0]) || (c = [ c ]);
          for (var d = [], l = 0, m = c.length; l < m; l++) d[l] = e(c[l]);
          c = d;
        } else {
          c = [];
        }
        return {
          type: "Feature",
          properties: a, geometry: { type: "Polygon", coordinates: c }
        };
      }
    });
  })(z, g);
  z.q.QH = z.q.Hc.extend({
    ga: [ g.MQ ], r: function (a) {
      var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
      this.CLASS_NAME = "AMap.LayerGroup";
      g.c.ra(this, b);
      z.q.QH.Lc.r.call(this, b);
      this.map = null;
      this.add(a);
    }, cc: function (a) {
      g.c.add(this, "setMap");
      this.en("setMap", a);
      this.set("map", a);
      this.map = a;
      return this;
    }, mapChanged: function () {}, fE: function (a) {
      var b = this;
      g.c.add(this, "addLayer");
      this.add(a, function (a) {b.map && (a.B = !0, a.setMap(b.map), a.B = !1);});
      return this;
    }, fj: function (a) {
      var b = this;
      g.c.add(this,
      "removeLayer");
      this.remove(a, function (a) {
        a.B = !0;
        a.getMap() === b.map && a.setMap(null);
        a.B = !1;
      });
      return this;
    }, ifa: function () {
      var a = this;
      g.c.add(this, "clearLayers");
      this.clear(function (b) {
        b.B = !0;
        b.getMap() === a.map && b.setMap(null);
        b.B = !1;
      });
      return this;
    }, ew: function () {
      g.c.add(this, "hide");
      this.en("hide");
      return this;
    }, show: function () {
      g.c.add(this, "show");
      this.en("show");
      return this;
    }, reload: function () {
      this.en("reload");
      return this;
    }, Hb: function () {
      var a = this, b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] :
      {};
      g.c.add(this, "setOptions");
      var c = g.a.keys(b);
      g.a.Lb(c, function (c) {a.en("set", c, b[c]);});
      return this;
    }
  });
  z.q.QH.Dg({
    find: "getLayer",
    hF: "getLayers",
    fE: [ "addLayer", "addLayers" ],
    kd: "hasLayer",
    fj: [ "removeLayer", "removeLayers" ],
    ifa: "clearLayers",
    Lb: "eachLayer",
    cc: "setMap",
    Hb: "setOptions",
    show: "show",
    ew: "hide",
    reload: "reload",
    h: "on",
    I: "off"
  });
  g.T4 = z.Yb.extend({
    r: function (a, b) {
      b && (b.center = b.position, b.zoom = 11);
      arguments.callee.oa.apply(this, arguments);
      window.console && window.console.log && window.console.log("\u9ad8\u5fb7\u5730\u56feJSAPI\u8857\u666f\u5df2\u4e0b\u7ebf\uff0c\u611f\u8c22\u60a8\u7684\u652f\u6301\u3002");
    }
  });
  g.U4 = z.A.lb.extend({ r: function (a) {arguments.callee.oa.apply(this, arguments);} });
  g.ed = {
    iq: function (a, b) {
      for (var c = Infinity, d = 0, e = 1, f = b.length; e < f; d = e, e += 1) {
        c =
        Math.min(c, g.ed.Xna(a, [ b[d], b[e] ]));
      }
      return Math.sqrt(c);
    },
    Xna: function (a, b) {return this.aH(a, this.EX(a, b));},
    aH: function (a, b) {
      var c = a[0] - b[0], d = a[1] - b[1];
      return c * c + d * d;
    },
    Uua: function (a, b, c, d) {
      d = d || 1E-6;
      if (c[0] === b[0]) {
        var e = Math.min(b[1], c[1]);
        b = Math.max(b[1], c[1]);
        return Math.abs(a[0] - c[0]) < d && a[1] >= e && a[1] <= b;
      }
      var e = Math.min(b[0], c[0]), f = Math.max(b[0], c[0]);
      return Math.abs((c[1] - b[1]) / (c[0] - b[0]) * (a[0] - b[0]) + b[1] - a[1]) < d &&
      a[0] >= e && a[0] <= f;
    },
    EX: function (a, b) {
      var c = a[0],
      d = a[1],
      e = b[0],
      f = b[1],
      h = e[0],
      e = e[1],
      k = f[0],
      f = f[1],
      l = k - h,
      m = f - e,
      c = 0 === l && 0 === m ? 0 : (l * (c - h) + m * (d - e)) / (l * l + m * m || 0);
      0 >= c || (1 <= c ? (h = k, e = f) : (h += c * l, e += c * m));
      return [ h, e ];
    },
    Co: function (a) {
      for (var b = a.length, c = 0, d = a[b - 1], e = d[0], d = d[1], f, h, k = 0; k < b; k += 1) {
        h =
        a[k], f = h[0], h = h[1], c += (f - e) * (h + d), e = f, d = h;
      }
      return 0 < c;
    },
    ud: function (a, b, c) {
      var d = a[0];
      a = a[1];
      var e = !1, f, h, k, l, m = b.length, n = 0;
      for (l = m - 1; n < m; l = n, n += 1) {
        var p = !1;
        f = b[n][0];
        h = b[n][1];
        k = b[l][0];
        l = b[l][1];
        if (f === d && h === a || k ===
        d && l === a) {
          return c ? !0 : !1;
        }
        if (h < a === l >= a) {
          f = (k - f) * (a - h) / (l - h) + f;
          if (d === f) return c ? !0 : !1;
          p = d < f;
        }
        p && (e = !e);
      }
      return e;
    },
    Y0: function (a, b) {
      function c (a, b, c, d) {
        var e = [ a[0] - b[0], a[1] - b[1] ], f = [ c[0] - d[0], c[1] - d[1] ];
        a = a[0] * b[1] - a[1] * b[0];
        c = c[0] * d[1] - c[1] * d[0];
        d = 1 / (e[0] * f[1] - e[1] * f[0]);
        return [ (a * f[0] - c * e[0]) * d, (a * f[1] - c * e[1]) * d ];
      }

      function d (a, b, c) {return (c[0] - b[0]) * (a[1] - b[1]) > (c[1] - b[1]) * (a[0] - b[0]);}

      var e, f, h, k, l = a;
      e = b[b.length - 2];
      for (var m = 0, n = b.length - 1; m < n; m++) {
        f = b[m];
        var p = l, l = [];
        h = p[p.length - 1];
        for (var q = 0, s =
        p.length; q < s; q++) {
          k = p[q], d(k, e, f)
          ? (d(h, e, f) || l.push(c(e, f, h, k)), l.push(k))
          : d(h, e, f) && l.push(c(e, f, h, k)), h = k;
        }
        e = f;
      }
      if (3 > l.length) return [];
      l.push(l[0]);
      return l;
    }
  };
  (function (a) {
    function b (b, c) {
      var d;
      a:{
        switch (b) {
          case "EPSG3395":
            d = a.lh.DQ;
            break a;
          case "EPSG4326":
            d = a.lh.EQ;
            break a;
        }
        d = a.lh.KH;
      }
      return {
        project: function (b) {
          a.a.isArray(b) && (b = new a.U(b[0], b[1]));
          return d.AA(b, c).gl();
        }, unproject: function (b) {
          a.a.isArray(b) && (b = new a.G(b[0], b[1]));
          return d.aB(b, c).gl();
        }, normalizePoint: function (b) {return a.a.Ha(b);}, distance: function (b, c) {
          c = this.normalizePoint(c);
          if (a.a.isArray(c)) return this.distanceToLine(b, c);
          b = this.normalizePoint(b);
          var d = a.pl.ys, e = Math.cos, f = b.P * d, h =
          c.P * d, k = 2 * a.pl.gM, d = c.R * d - b.R * d, e = (1 - e(h - f) + (1 - e(d)) * e(f) * e(h)) / 2;
          return k * Math.asin(Math.sqrt(e));
        }, ringArea: function (b) {
          b = this.normalizeLine(b);
          var c = a.pl.gM * a.pl.ys, d = 0, e = b.length;
          if (3 > e) return 0;
          for (var f = 0; f < e - 1; f +=
          1) {
            var h = b[f],
            k = b[f + 1],
            u = h.R * c * Math.cos(h.P * a.pl.ys),
            h = h.P * c,
            w = k.R * c * Math.cos(k.P * a.pl.ys),
            d = d + (u * k.P * c - w * h);
          }
          f = b[f];
          b = b[0];
          e = f.R * c * Math.cos(f.P * a.pl.ys);
          f = f.P * c;
          k = b.R * c * Math.cos(b.P * a.pl.ys);
          d += e * b.P * c - k * f;
          return 0.5 * Math.abs(d);
        }, sphericalCalotteArea: function (b) {
          var c = a.pl.gM;
          b = c - c *
          Math.cos(b / c);
          return 2 * Math.PI * c * b;
        }
      };
    }

    function c () {
      return {
        normalizePoint: function (a) {return a && a.x && a.y ? [ a.x, a.y ] : a;},
        distance: function (a, b) {
          var c = a[0] - b[0], d = a[1] - b[1];
          return Math.sqrt(c * c + d * d);
        },
        project: function (a) {return a;},
        unproject: function (a) {return a;},
        ringArea: function (a) {
          for (var b = [ 0, 0 ], c = [
            0,
            0
          ], d = 0, e = a[0], n = a.length, p = 2; p < n; p++) {
            var q = a[p - 1], s = a[p];
            b[0] = e[0] - s[0];
            b[1] = e[1] - s[1];
            c[0] = e[0] - q[0];
            c[1] = e[1] - q[1];
            d += b[0] * c[1] - b[1] * c[0];
          }
          return d / 2;
        }
      };
    }

    function d (a) {
      for (var b = 0, c = a.length, d = 0; d < c - 1; d++) {
        var e =
        a[d], n = a[d + 1], b = b + (n[0] - e[0]) * (n[1] + e[1]);
      }
      if (a[c - 1][0] !== a[0][0] || a[c - 1][1] !== a[0][1]) {
        e = a[c - 1], n = a[0], b +=
        (n[0] - e[0]) * (n[1] + e[1]);
      }
      return 0 >= b;
    }

    function e (b) {
      this.CLASS_NAME = "AMap.GeometryUtil";
      this.Jb = a.extend({ onSegmentTolerance: 5, crs: "EPSG3857", maxZoom: 20 }, b);
      this.setCrs(this.Jb.crs);
    }

    a.extend(e.prototype, {
      clone: function (b) {return new e(a.extend({}, this.Jb, b));},
      isPoint: function (b) {return b && (b instanceof a.U || a.a.isArray(b) && !isNaN(b[0]));},
      normalizePoint: function (a) {return a;},
      normalizeLine: function (a) {
        for (var b =
        [], c = 0, d = a.length; c < d; c++) {
          b.push(this.normalizePoint(a[c]));
        }
        return b;
      },
      normalizeMultiLines: function (b) {
        a.a.isArray(b) && this.isPoint(b[0]) && (b = [ b ]);
        for (var c = [], d = 0, e = b.length; d < e; d++) c.push(this.normalizeLine(b[d]));
        return c;
      },
      setCrs: function (d) {
        a.extend(this, d && d.project && d.unproject ? d : "plane" === d
        ? c()
        : b(d, this.Jb.maxZoom));
      },
      distance: function () {throw Error("distance Not implemented!");},
      Ru: function (a, b) {
        a = this.normalizeLine(a);
        this.isPoint(a[0]) || (a = a[0]);
        for (var c = [], d = 0, e = a.length; d < e; d++) c.push(this.project(a[d]));
        !0 === b ? c = this.makesureClockwise(c) : !1 === b && (c = this.makesureClockwise(c), c.reverse());
        return c;
      },
      lca: function (a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) b.push(this.unproject(a[c]));
        return b;
      },
      closestOnSegment: function (b, c, d) {
        b = a.ed.EX(this.project(b), this.Ru([ c, d ]));
        return this.unproject(b);
      },
      closestOnLine: function (a, b) {
        b = this.normalizeLine(b);
        for (var c = Infinity, d, e = 0, n = b.length; e < n - 1; e++) {
          var p = this.closestOnSegment(a, b[e], b[e + 1]),
          q = this.distance(a, p);
          q < c && (c = q, d = p);
        }
        return d;
      },
      distanceToSegment: function (a,
                                   b, c) {return this.distanceToLine(a, [ b, c ]);},
      distanceToLine: function (a, b) {
        b = this.normalizeLine(b);
        this.isPoint(b[0]) || (b = b[0]);
        for (var c = Infinity, d = 0, e = b.length; d < e - 1; d++) var n = this.closestOnSegment(a, b[d], b[d + 1]), c = Math.min(c, this.distance(a, n));
        return c;
      },
      distanceToPolygon: function (a, b) {return this.isPointInRing(a, b) ? 0 : this.distanceToLine(a, b);},
      isPointOnSegment: function (a, b, c, d) {
        if (!d && 0 !== d || 0 > d) d = this.Jb.onSegmentTolerance;
        return this.distanceToSegment(a, b, c) <= d;
      },
      isPointOnLine: function (a, b, c) {
        b = this.normalizeLine(b);
        for (var d = 0, e = b.length; d < e - 1; d++) if (this.isPointOnSegment(a, b[d], b[d + 1], c)) return !0;
        return !1;
      },
      isPointOnRing: function (a, b, c) {
        b = this.normalizeLine(b);
        for (var d = 0, e = b.length; d < e; d++) {
          if (this.isPointOnSegment(a, b[d], b[d === e - 1
          ? 0
          : d + 1], c)) {
            return !0;
          }
        }
        return !1;
      },
      isPointOnPolygon: function (a, b, c) {
        b = this.normalizeMultiLines(b);
        for (var d = 0, e = b.length; d < e; d++) if (this.isPointOnRing(a, b[d], c)) return !0;
        return !1;
      },
      makesureClockwise: function (a) {
        d(a) || (a = [].concat(a), a.reverse());
        return a;
      },
      makesureAntiClockwise: function (a) {
        d(a) &&
        (a = [].concat(a), a.reverse());
        return a;
      },
      isPointInRing: function (b, c) {
        c = this.normalizeLine(c);
        var d = this.Ru(c, !0);
        return a.ed.ud(this.project(b), d, !1);
      },
      isRingInRing: function (a, b) {
        for (var c = 0, d = a.length; c < d; c++) if (!this.isPointInRing(a[c], b)) return !1;
        return !0;
      },
      isPointInPolygon: function (a, b) {
        b = this.normalizeMultiLines(b);
        for (var c, d = 0, e = b.length; d < e && (c = this.isPointInRing(a, b[d]), 0 < d && (c = !c), c); d += 1) ;
        return c;
      },
      doesSegmentsIntersect: function (a, b, c, d) {
        var e = this.Ru([ a, b, c, d ]);
        a = e[0];
        b = e[1];
        c = e[2];
        d = e[3];
        var e = !1,
        n = (d[0] - c[0]) * (a[1] - c[1]) - (d[1] - c[1]) * (a[0] - c[0]),
        p = (b[0] - a[0]) * (a[1] - c[1]) - (b[1] - a[1]) * (a[0] - c[0]);
        a = (d[1] - c[1]) * (b[0] - a[0]) - (d[0] - c[0]) * (b[1] - a[1]);
        0 !== a && (b = n / a, p /= a, 0 <= b && 1 >= b && 0 <= p && 1 >= p && (e = !0));
        return e;
      },
      doesSegmentLineIntersect: function (a, b, c) {
        c = this.normalizeLine(c);
        for (var d = 0, e = c.length; d < e - 1; d++) if (this.doesSegmentsIntersect(a, b, c[d], c[d + 1])) return !0;
        return !1;
      },
      doesSegmentRingIntersect: function (a, b, c) {
        c = this.normalizeLine(c);
        for (var d = 0, e = c.length; d < e; d++) {
          if (this.doesSegmentsIntersect(a,
          b, c[d], c[d === e - 1 ? 0 : d + 1])) {
            return !0;
          }
        }
        return !1;
      },
      doesSegmentPolygonIntersect: function (a, b, c) {
        c = this.normalizeMultiLines(c);
        for (var d = 0, e = c.length; d < e; d++) if (this.doesSegmentRingIntersect(a, b, c[d])) return !0;
        return !1;
      },
      doesLineLineIntersect: function (a, b) {
        a = this.normalizeLine(a);
        for (var c = 0, d = a.length; c < d - 1; c++) if (this.doesSegmentLineIntersect(a[c], a[c + 1], b)) return !0;
        return !1;
      },
      doesLineRingIntersect: function (a, b) {
        a = this.normalizeLine(a);
        for (var c = 0, d = a.length; c < d - 1; c++) {
          if (this.doesSegmentRingIntersect(a[c],
          a[c + 1], b)) {
            return !0;
          }
        }
        return !1;
      },
      doesPolygonPolygonIntersect: function (a, b) {
        return this.doesRingRingIntersect(b, a) || this.isRingInRing(a, b) || this.isRingInRing(b, a)
        ? !0
        : !1;
      },
      doesRingRingIntersect: function (a, b) {
        a = this.normalizeLine(a);
        for (var c = 0, d = a.length; c < d; c++) {
          if (this.doesSegmentRingIntersect(a[c], a[c === d - 1
          ? 0
          : c + 1], b)) {
            return !0;
          }
        }
        return !1;
      },
      fS: function (a, b) {
        function c () {
          var a = [ e[0] - n[0], e[1] - n[1] ],
          b = [ p[0] - q[0], p[1] - q[1] ],
          d = e[0] * n[1] - e[1] * n[0],
          f = p[0] * q[1] - p[1] * q[0],
          h = 1 / (a[0] * b[1] - a[1] * b[0]);
          return [
            (d * b[0] - f *
            a[0]) * h, (d * b[1] - f * a[1]) * h
          ];
        }

        function d (a) {return (n[0] - e[0]) * (a[1] - e[1]) > (n[1] - e[1]) * (a[0] - e[0]);}

        a = this.makesureAntiClockwise(a);
        b = this.makesureClockwise(b);
        var e, n, p, q, s = a;
        e = b[b.length - 1];
        for (var r = 0, u = b.length; r < u; r++) {
          n = b[r];
          var w = s, s = [];
          p = w[w.length - 1];
          for (var v = 0, t = w.length; v < t; v++) {
            q = w[v], d(q)
            ? (d(p) || s.push(c()), s.push(q))
            : d(p) && s.push(c()), p = q;
          }
          e = n;
        }
        return s;
      },
      ringRingClip: function (a, b) {
        a = this.Ru(a);
        b = this.Ru(b);
        var c = this.fS(a, b);
        0 == c.length && (c = this.fS(b, a));
        return this.lca(c);
      },
      ringArea: function () {
        throw Error("distance Not implemented!");
      },
      distanceOfLine: function (a) {
        a = this.normalizeLine(a);
        for (var b = 0, c = 0, d = a.length; c < d - 1; c++) b += this.distance(a[c], a[c + 1]);
        return b;
      },
      isClockwise: function (a) {
        a = this.Ru(a);
        return d(a);
      }
    });
    a.pp = new e;
    a.vp = new e;
    a.vp.setCrs("plane");
  })(g);
  g.LQ = function () {
    var a = {};
    (function () {
      a.Zja =
      function (a) {
        for (var c = 0, d = a.length, e = 0; e < d - 1; e++) var f = a[e], h = a[e + 1], c = c + (h[0] - f[0]) * (h[1] + f[1]);
        if (a[d - 1][0] !== a[0][0] || a[d - 1][1] !== a[0][1]) {
          f = a[d - 1], h = a[0], c +=
          (h[0] - f[0]) * (h[1] + f[1]);
        }
        0 >= c && (a = [].concat(a), a.reverse());
        return a;
      };
    })();
    (function () {
      function b (a) {
        var b = a.length;
        2 < b && a[b - 1][0] == a[0][0] && a[b - 1][1] == a[0][1] && a.pop();
      }

      function c (a, b) {for (var c = 0; c < b.length; c++) a.push(b[c][0]), a.push(b[c][1]);}

      a.il = function (a, e) {
        e = e || [];
        var f = [], h = [];
        b(a);
        c(f, a);
        var k =
        a.length;
        e.forEach(b);
        for (var l = 0; l < e.length; l++) h.push(k), k += e[l].length, c(f, e[l]);
        return this.mH(f, h);
      };
    })();
    return a;
  };
  (function (a) {
    a.FQ = function () {
      function a (b, c, d, e, f) {
        for (var h, k = 0, l = c, n = d - e; l < d; l += e) {
          k +=
          (b[n] - b[l]) * (b[l + 1] + b[n + 1]), n = l;
        }
        if (f === 0 < k) {
          for (f = c; f < d; f += e) h = s(f, b[f], b[f + 1], h);
        } else {
          for (f = d - e; f >= c; f -=
          e) {
            h = s(f, b[f], b[f + 1], h);
          }
        }
        h && m(h, h.next) && (r(h), h = h.next);
        return h;
      }

      function c (a, b) {
        if (!a) return a;
        b || (b = a);
        var c = a, d;
        do {
          if (d = !1, c.A2 || !m(c, c.next) && 0 !== l(c.Ca, c, c.next)) {
            c = c.next;
          } else {
            r(c);
            c = b = c.Ca;
            if (c === c.next) break;
            d = !0;
          }
        } while (d || c !== b);
        return b;
      }

      function d (a, b, e, f, s, u, F) {
        if (a) {
          if (!F && u) {
            var H = a, B = H;
            do {
              null === B.z &&
              (B.z = h(B.x, B.y, f, s, u)), B.tn = B.Ca, B = B.Uj = B.next;
            } while (B !== H);
            B.tn.Uj = null;
            B.tn = null;
            var H = B, C, E, D, G, I, J, L = 1;
            do {
              B = H;
              D = H = null;
              for (G = 0; B;) {
                G++;
                E = B;
                for (C = I = 0; C < L && (I++, E = E.Uj, E); C++) ;
                for (J = L; 0 < I || 0 < J && E;) {
                  0 !== I && (0 === J || !E || B.z <= E.z)
                  ? (C = B, B = B.Uj, I--)
                  : (C = E, E = E.Uj, J--), D ? D.Uj = C : H = C, C.tn = D, D = C;
                }
                B = E;
              }
              D.Uj = null;
              L *= 2;
            } while (1 < G);
          }
          for (H = a; a.Ca !== a.next;) {
            B = a.Ca;
            E = a.next;
            if (u) {
              a:if (D = a.Ca, G = a.next, 0 <= l(D, a, G)) {
                D = !1;
              } else {
                I =
                h(D.x < a.x ? D.x < G.x ? D.x : G.x : a.x < G.x ? a.x : G.x, D.y < a.y
                ? D.y < G.y ? D.y : G.y
                : a.y < G.y
                ? a.y
                : G.y, f, s, u);
                L = h(D.x >
                a.x ? D.x > G.x ? D.x : G.x : a.x > G.x ? a.x : G.x, D.y > a.y ? D.y > G.y ? D.y : G.y : a.y > G.y
                ? a.y
                : G.y, f, s, u);
                for (C =
                     a.Uj; C && C.z <= L;) {
                  if (C !== a.Ca && C !== a.next && k(D.x, D.y, a.x, a.y, G.x, G.y, C.x, C.y) && 0 <= l(C.Ca, C, C.next)) {
                    D =
                    !1;
                    break a;
                  }
                  C = C.Uj;
                }
                for (C =
                     a.tn; C && C.z >= I;) {
                  if (C !== a.Ca && C !== a.next && k(D.x, D.y, a.x, a.y, G.x, G.y, C.x, C.y) && 0 <= l(C.Ca, C, C.next)) {
                    D =
                    !1;
                    break a;
                  }
                  C = C.tn;
                }
                D = !0;
              }
            } else {
              a:if (D = a.Ca, G = a.next, 0 <= l(D, a, G)) {
                D = !1;
              } else {
                for (I =
                     a.next.next; I !== a.Ca;) {
                  if (k(D.x, D.y, a.x, a.y, G.x, G.y, I.x, I.y) && 0 <= l(I.Ca, I, I.next)) {
                    D =
                    !1;
                    break a;
                  }
                  I = I.next;
                }
                D = !0;
              }
            }
            if (D) {
              b.push(B.Wd /
              e), b.push(a.Wd / e), b.push(E.Wd / e), r(a), H = a = E.next;
            } else if (a = E, a === H) {
              if (F) {
                if (1 === F) {
                  F = b;
                  H = e;
                  B = a;
                  do {
                    E = B.Ca, D =
                    B.next.next, !m(E, D) && n(E, B, B.next, D) && p(E, D) && p(D, E) && (F.push(E.Wd / H), F.push(B.Wd / H), F.push(D.Wd / H), r(B), r(B.next), B =
                    a = D), B = B.next;
                  } while (B !== a);
                  a = B;
                  d(a, b, e, f, s, u, 2);
                } else {
                  if (2 === F) {
                    a:{
                      F = a;
                      do {
                        for (H = F.next.next; H !== F.Ca;) {
                          if (B = F.Wd !== H.Wd) {
                            if (B = void 0, B = F.next.Wd !== H.Wd) {
                              if (B = void 0, B =
                              F.Ca.Wd !== H.Wd) {
                                B = B = void 0;
                                b:{
                                  B = F;
                                  do {
                                    if (B.Wd !== F.Wd && B.next.Wd !== F.Wd && B.Wd !== H.Wd && B.next.Wd !== H.Wd && n(B, B.next, F,
                                    H)) {
                                      B = !0;
                                      break b;
                                    }
                                    B = B.next;
                                  } while (B !== F);
                                  B = !1;
                                }
                                if (B = !B) {
                                  if (B = void 0, B = p(F, H)) {
                                    if (B = void 0, B = p(H, F)) {
                                      B = F;
                                      E = !1;
                                      D = (F.x + H.x) / 2;
                                      G = (F.y + H.y) / 2;
                                      do {
                                        B.y > G !== B.next.y > G && B.next.y !== B.y && D < (B.next.x - B.x) * (G - B.y) / (B.next.y - B.y) + B.x && (E =
                                        !E), B = B.next;
                                      } while (B !== F);
                                      B = E;
                                    }
                                  }
                                }
                              }
                            }
                          }
                          if (B) {
                            a = q(F, H);
                            F = c(F, F.next);
                            a = c(a, a.next);
                            d(F, b, e, f, s, u);
                            d(a, b, e, f, s, u);
                            break a;
                          }
                          H = H.next;
                        }
                        F = F.next;
                      } while (F !== a);
                    }
                  }
                }
              } else {
                d(c(a), b, e, f, s, u, 1);
              }
              break;
            }
          }
        }
      }

      function e (a, b) {return a.x - b.x;}

      function f (a, b) {
        var c = b, d = a.x, e = a.y, f = -Infinity, h;
        do {
          if (e <= c.y && e >= c.next.y &&
          c.next.y !== c.y) {
            var l = c.x + (e - c.y) * (c.next.x - c.x) / (c.next.y - c.y);
            if (l <= d && l > f) {
              f = l;
              if (l === d) {
                if (e === c.y) return c;
                if (e === c.next.y) return c.next;
              }
              h = c.x < c.next.x ? c : c.next;
            }
          }
          c = c.next;
        } while (c !== b);
        if (!h) return null;
        if (d === f) return h.Ca;
        for (var l = h, m = h.x, n = h.y, s = Infinity, r, c = h.next; c !== l;) {
          d >= c.x && c.x >= m && d !== c.x && k(e < n
          ? d
          : f, e, m, n, e < n ? f : d, e, c.x, c.y) && (r =
          Math.abs(e - c.y) / (d - c.x), (r < s || r === s && c.x > h.x) && p(c, a) && (h = c, s = r)), c = c.next;
        }
        return h;
      }

      function h (a, b, c, d, e) {
        a = 32767 * (a - c) * e;
        b = 32767 * (b - d) * e;
        a = (a | a << 8) & 16711935;
        a = (a | a << 4) & 252645135;
        a = (a | a << 2) & 858993459;
        b = (b | b << 8) & 16711935;
        b = (b | b << 4) & 252645135;
        b = (b | b << 2) & 858993459;
        return (a | a << 1) & 1431655765 | ((b | b << 1) & 1431655765) << 1;
      }

      function k (a, b, c, d, e, f, h, k) {return 0 <= (e - h) * (b - k) - (a - h) * (f - k) && 0 <= (a - h) * (d - k) - (c - h) * (b - k) && 0 <= (c - h) * (f - k) - (e - h) * (d - k);}

      function l (a, b, c) {return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);}

      function m (a, b) {return a.x === b.x && a.y === b.y;}

      function n (a, b, c, d) {
        return m(a, b) && m(c, d) || m(a, d) && m(c, b)
        ? !0
        : 0 < l(a, b, c) !== 0 < l(a, b, d) && 0 < l(c, d, a) !== 0 < l(c, d, b);
      }

      function p (a,
                  b) {
        return 0 > l(a.Ca, a, a.next)
        ? 0 <= l(a, b, a.next) && 0 <= l(a, a.Ca, b)
        : 0 > l(a, b, a.Ca) || 0 > l(a, a.next, b);
      }

      function q (a, b) {
        var c = new u(a.Wd, a.x, a.y), d = new u(b.Wd, b.x, b.y), e = a.next, f = b.Ca;
        a.next = b;
        b.Ca = a;
        c.next = e;
        e.Ca = c;
        d.next = c;
        c.Ca = d;
        f.next = d;
        d.Ca = f;
        return d;
      }

      function s (a, b, c, d) {
        a = new u(a, b, c);
        d ? (a.next = d.next, a.Ca = d, d.next.Ca = a, d.next = a) : (a.Ca = a, a.next = a);
        return a;
      }

      function r (a) {
        a.next.Ca = a.Ca;
        a.Ca.next = a.next;
        a.tn && (a.tn.Uj = a.Uj);
        a.Uj && (a.Uj.tn = a.tn);
      }

      function u (a, b, c) {
        this.Wd = a;
        this.x = b;
        this.y = c;
        this.Uj = this.tn =
        this.z = this.next = this.Ca = null;
        this.A2 = !1;
      }

      return {
        mH: function (h, k, l) {
          l = l || 2;
          var m = k && k.length, n = m ? k[0] * l : h.length, p = a(h, 0, n, l, !0), s = [];
          if (!p) return s;
          var r, u, C, E;
          if (m) {
            var D = l, m = [], G, I, J;
            E = 0;
            for (G = k.length; E < G; E++) {
              I = k[E] * D;
              J = E < G - 1 ? k[E + 1] * D : h.length;
              I = a(h, I, J, D, !1);
              I === I.next && (I.A2 = !0);
              var L = J = I;
              do J.x < L.x && (L = J), J = J.next; while (J !== I);
              m.push(L);
            }
            m.sort(e);
            for (E = 0; E < m.length; E++) {
              k = m[E];
              D = p;
              if (D = f(k, D)) k = q(D, k), c(k, k.next);
              p = c(p, p.next);
            }
          }
          if (h.length > 80 * l) {
            r = C = h[0];
            u = m = h[1];
            for (D = l; D < n; D += l) {
              E = h[D], k =
              h[D + 1], E < r && (r = E), k < u && (u = k), E > C && (C = E), k > m && (m = k);
            }
            C = Math.max(C - r, m - u);
            C = 0 !== C ? 1 / C : 0;
          }
          d(p, s, l, r, u, C);
          return s;
        }
      };
    };
    a.j4 = a.FQ();
  })(g);
  (function (a) {
    function b (a) {
      var b = a.length;
      2 < b && a[b - 1][0] == a[0][0] && a[b - 1][1] == a[0][1] && a.pop();
    }

    function c (a, b) {for (var c = 0; c < b.length; c++) a.push(b[c][0]), a.push(b[c][1]);}

    a.um = {
      dg: function (a) {
        for (var b = a.length, c = 0, h = b - 1, k = 0; k < b; h = k++) {
          c +=
          a[h][0] * a[k][1] - a[k][0] * a[h][1];
        }
        return 0.5 * c;
      }, fja: function (b) {return 0 > a.um.dg(b);}, normalize: function (b) {
        var c;
        if (b) {
          c = [];
          for (var f = 0, h = b.length; f < h; f += 1) {
            c[f] =
            b[f] instanceof Array ? this.normalize(b[f]) : b[f] instanceof a.U
            ? [ b[f].R, b[f].P ]
            : b[f] instanceof a.G
            ? [ b[f].x, b[f].y ]
            :
            b[f];
          }
        }
        return c;
      }, il: function (d, e) {
        e = e || [];
        var f = [], h = [];
        b(d);
        c(f, d);
        var k = d.length;
        e.forEach(b);
        for (var l = 0; l < e.length; l++) h.push(k), k += e[l].length, c(f, e[l]);
        return a.j4.mH(f, h);
      }
    };
  })(g);
  for (var Z = {
    v: "1.4.11",
    Pixel: g.G,
    LngLat: g.U,
    Size: g.gd,
    Bounds: g.le,
    ArrayBounds: g.zn,
    PixelBounds: g.Xe,
    enableVector: g.l.iM,
    Panorama: g.T4,
    PanoramaMarker: g.U4,
    Map: z.Yb,
    View2D: z.mC,
    GroundImage: z.q.LH,
    Marker: z.A.lb,
    ImageMarker: z.A.oqa,
    Text: z.A.eR,
    Icon: z.A.ph,
    MarkerShape: z.A.L4,
    Polyline: z.A.Ob,
    BezierCurve: z.A.zx,
    Polygon: z.A.tc,
    Circle: z.A.qg,
    CircleMarker: z.A.zQ,
    Ellipse: z.A.pr,
    Rectangle: z.A.tr,
    ContextMenu: z.A.pm,
    InfoWindow: z.A.ye,
    Buildings: z.q.a4,
    TileLayer: z.q.ib,
    ImageLayer: z.q.Ix,
    CanvasLayer: z.q.c4,
    VideoLayer: z.q.w5,
    VectorLayer: z.q.Sc,
    MassMarks: z.q.N4,
    LayerGroup: z.q.QH,
    OverlayGroup: z.A.sm,
    GeoJSON: z.A.JQ,
    CANVAS: "canvas",
    DOM: "dom",
    event: { CLASS_NAME: "AMap.event" }
  }, uc = "addDomListener addDomListenerOnce addListener addListenerOnce clearInstanceListeners clearListeners removeListener trigger".split(" "), vc = 0; vc < uc.length; vc +=
       1) {
    Z.event[uc[vc]] = function () {
      var a = g.event[uc[vc]], b = uc[vc];
      return function () {
        g.c.ra(Z.event);
        g.c.add(Z.event, b);
        return a.apply(g.event, Array.prototype.slice.call(arguments));
      };
    }();
  }
  Z.GeometryUtil = { CLASS_NAME: "AMap.GeometryUtil" };
  for (var wc = "distance ringArea isClockwise makesureClockwise makesureAntiClockwise distanceOfLine ringRingClip doesSegmentsIntersect doesSegmentLineIntersect doesSegmentRingIntersect doesSegmentPolygonIntersect doesLineLineIntersect doesLineRingIntersect doesPolygonPolygonIntersect doesRingRingIntersect isPointInRing isRingInRing isPointInPolygon isPointOnSegment isPointOnLine isPointOnRing isPointOnPolygon closestOnSegment closestOnLine distanceToSegment distanceToLine distanceToPolygon".split(" "), vc =
  0; vc < wc.length; vc += 1) {
    Z.GeometryUtil[wc[vc]] = function () {
      var a = g.pp[wc[vc]], b = wc[vc];
      return function () {
        g.c.ra(Z.GeometryUtil);
        g.c.add(Z.GeometryUtil, b);
        return a.apply(g.pp, Array.prototype.slice.call(arguments));
      };
    }();
  }
  Z.GeometryUtil.triangulateShape = function (a, b) {
    g.c.ra(Z.GeometryUtil);
    g.c.add(Z.GeometryUtil, "triangulateShape");
    a = g.um.normalize(a);
    b = g.um.normalize(b);
    return g.um.il(a, b);
  };
  Z.PlaneGeometryUtil = { CLASS_NAME: "AMap.PlaneGeometryUtil" };
  for (vc = 0; vc < wc.length; vc += 1) {
    Z.PlaneGeometryUtil[wc[vc]] = function () {
      var a = g.vp[wc[vc]], b = wc[vc];
      return function () {
        g.c.ra(Z.PlaneGeometryUtil);
        g.c.add(Z.PlaneGeometryUtil, b);
        return a.apply(g.vp, Array.prototype.slice.call(arguments));
      };
    }();
  }
  Z.PlaneGeometryUtil.triangulateShape = function (a, b) {
    g.c.ra(Z.PlaneGeometryUtil);
    g.c.add(Z.PlaneGeometryUtil, "triangulateShape");
    a = g.um.normalize(a);
    b = g.um.normalize(b);
    return g.um.il(a, b);
  };
  Z.plugin = Z.service = z.Yb.prototype.plugin;
  Z.TileLayer.Satellite = z.q.ib.bR;
  Z.TileLayer.RoadNet = z.q.ib.$Q;
  Z.TileLayer.google = z.q.ib.Hx;
  Z.TileLayer.Flexible = z.q.ib.Ex;
  Z.TileLayer.WMS = z.q.ib.x5;
  Z.TileLayer.WMTS = z.q.ib.y5;
  Z.TileLayer.Traffic = z.q.ib.fR;
  Z.Panorama.Events = z.event;
  Z.TileLayer.PanoramaLayer = z.q.ib.uqa;
  Z.UA = { ie: g.l.wq, ielt9: g.l.ee, ielt11: g.l.Kia, mobile: g.l.Y, android: g.l.Dk, ios: g.l.HF };
  Z.Browser = {
    ua: navigator.userAgent,
    mobile: g.l.Y,
    plat: g.l.nt,
    mac: g.l.EA,
    windows: g.l.Npa,
    ios: g.l.HF,
    iPad: g.l.Dia,
    iPhone: g.l.Eia,
    android: g.l.Dk,
    android23: g.l.bea,
    chrome: g.l.chrome,
    firefox: g.l.rM,
    safari: g.l.PG,
    wechat: g.l.K3,
    uc: g.l.epa,
    qq: g.l.dma,
    ie: g.l.wq,
    ie6: g.l.Gh,
    ie7: g.l.xq,
    ie8: g.l.ee && !g.l.xq && !g.l.Gh,
    ie9: g.l.MZ,
    ie10: g.l.LZ,
    ie11: g.l.Hia,
    edge: g.l.Lga,
    ielt9: g.l.ee,
    baidu: g.l.jE,
    isLocalStorage: g.l.Fq,
    isGeolocation: !!navigator.geolocation,
    mobileWebkit: g.l.qka,
    mobileWebkit3d: g.l.b0,
    mobileOpera: !!g.l.pka,
    retina: g.l.nd,
    touch: !!g.l.hf,
    msPointer: !!g.l.d0,
    pointer: !!g.l.GO,
    webkit: g.l.I3,
    ie3d: g.l.Iia,
    webkit3d: g.l.J3,
    gecko3d: g.l.oha,
    opera3d: g.l.fla,
    any3d: g.l.hE,
    isCanvas: g.l.Vk,
    isSvg: g.l.gn,
    isVML: g.l.wq,
    isWorker: !!window.Worker,
    isWebsocket: !!window.WebSocket,
    isWebGL: function () {
      for (var a = document.createElement("canvas"), b = [
        "webgl",
        "experimental-webgl",
        "moz-webgl"
      ], c = null, d = 0; d < b.length; d += 1) {
        try {c = a.getContext(b[d]);} catch (e) {}
        if (c) if (c.drawingBufferWidth !== a.width || c.drawingBufferHeight !== a.height) break; else return !0;
      }
      return !1;
    }
  };
  Z.Util = { CLASS_NAME: "AMap.Util" };
  var yc = {
    colorNameToHex: g.a.yE,
    rgbHex2Rgba: g.a.M1,
    argbHex2Rgba: g.a.Rp,
    isEmpty: g.a.Eo,
    deleteItemFromArray: g.a.Hv,
    deleteItemFromArrayByIndex: g.a.Um,
    indexOf: g.a.indexOf,
    format: g.a.jd,
    isArray: g.a.isArray,
    isDOM: g.a.KF,
    includes: g.a.ga,
    requestIdleCallback: g.a.HG,
    cancelIdleCallback: g.a.EL,
    requestAnimFrame: g.a.Fc,
    cancelAnimFrame: g.a.Bh,
    color2RgbaArray: g.a.eo,
    color2Rgba: g.a.ufa
  };
  for (vc in yc) {
    yc.hasOwnProperty(vc) && "function" == typeof yc[vc] && (Z.Util[vc] = function () {
      var a = vc;
      return function () {
        g.c.ra(Z.Util);
        g.c.add(Z.Util, a);
        return yc[a].apply(g.a, Array.prototype.slice.call(arguments));
      };
    }());
  }
  Z.DomUtil = { CLASS_NAME: "AMap.DomUtil" };
  var zc = {
    getViewport: g.g.tF,
    getViewportOffset: g.g.cN,
    create: g.g.create,
    setClass: g.g.sna,
    hasClass: g.g.Ul,
    addClass: g.g.Ma,
    removeClass: g.g.Xa,
    setOpacity: g.g.Xo,
    rotate: g.g.rotate,
    setCss: g.g.Ra,
    empty: g.g.fB,
    remove: g.g.remove,
    TRANSFORM: g.g.Hf,
    TRANSITION: g.g.hC
  };
  for (vc in zc) {
    zc.hasOwnProperty(vc) && "function" == typeof zc[vc] && (Z.DomUtil[vc] = function () {
      var a = vc;
      return function () {
        g.c.ra(Z.DomUtil);
        g.c.add(Z.DomUtil, a);
        return zc[a].apply(g.g, Array.prototype.slice.call(arguments));
      };
    }());
  }
  var Ac = g.w;
  Z.User = { key: Ac.key };
  window.AMap = Z;
  window.AMap.BuryPoint = g.BuryPoint;
  window.AMap.Class = g.Z;
  if (!Ac.BA && "undefined" !== typeof arguments && arguments.callee) {
    try {
      if (g.l.Fq && window.localStorage) {
        var Bc = window.localStorage["_AMap_" + g.bG];
        Bc && JSON.parse(Bc).version === Ac.Ci || window.localStorage.setItem("_AMap_" + g.bG, JSON.stringify({
          version: Ac.Ci,
          script: "(" + arguments.callee + ")(config)"
        }));
        var Cc = new Image;
        Cc.src = Ac.Db + "/maps/cookie?key=amap_ver&value=" + Ac.Ci;
        document.head.appendChild(Cc);
        Cc.onload = Cc.onerror = Cc.onabort = function () {document.head.removeChild(Cc);};
      }
    } catch (Dc) {}
  }
  ;window.AMap.convertFrom = function (a, b, c) {
    g.c.add({ CLASS_NAME: "convertFrom" }, b);
    var d = g.w.Gd + "/v3/assistant/coordinate/convert";
    a = g.a.Ha(a);
    var e = [];
    if (a instanceof Array) {
      for (var f = 0, h = a.length; f < h; f += 1) e.push(a[f] + "");
      e = e.join(";");
    } else {
      e = a + "";
    }
    b = [ "key=" + g.w.key, "s=rsv3", "locations=" + e, "coordsys=" + (b || "gps") ];
    d += 0 < b.length ? "?" + b.join("&") : "";
    d = new g.bb.qb(d, { callback: "callback" });
    d.h("complete", function (a) {
      if ("1" === a.status) {
        a = a.locations.split(";");
        for (var b = 0; b < a.length; b += 1) {
          var d = a[b].split(",");
          a[b] = new AMap.LngLat(d[0], d[1]);
        }
        c && "function" === typeof c && c("complete", { info: "ok", locations: a });
      } else {
        c && "function" === typeof c && c("error", a.info);
      }
    }, this);
    d.h("error", function (a) {c && "function" === typeof c && c("error", a.info);}, this);
  };
  g.bb = g.bb || {};
  g.bb.aI = g.Z.extend({
    ga: [ g.na ], r: function (a, b) {
      this.C = { callback: "cbk", type: "json", charset: "utf-8" };
      b = b || {};
      g.a.Hb(this, b);
      this.url = a;
      this.send(a, b.Cc, b.Lfa, b.Uma, b.responseType);
    }, send: function (a) {
      var b = g.g.create("script");
      b.type = "text/javascript";
      b.charset = this.C.charset;
      var c = this;
      g.l.ee ? b.onreadystatechange =
      function () {"loaded" !== this.readyState && "complete" !== this.readyState || c.o("complete");} : (b.onload =
      function () {c.o("complete");}, b.onerror =
      function () {c.o("error", { status: 0, info: "service error", url: a });});
      b.src = a;
      document.getElementsByTagName("head")[0].appendChild(b);
    }
  });
  g.bb.qb = g.bb.aI.extend({
    Tea: function () {if (g.a.Z1) return g.a.cH.push(this), !0;},
    Xma: function () {this.o("error", { info: "TIME_OUT_A" });},
    send: function (a, b, c, d) {
      function e () {
        window[f] = null;
        try {window[f] = null;} catch (a) {}
        h.onerror = null;
        h.parentNode && h.parentNode.removeChild(h);
      }

      if (!this.C.sv || !this.Tea()) {
        a = encodeURI(a);
        var f = this.C.fun;
        if (!f || window[f]) f = g.a.RY("jsonp_", 6) + "_";
        var h = document.createElement("script");
        h.type = "text/javascript";
        h.charset = "utf-8";
        h.async = !0;
        var k = this;
        g.l.ee || (h.onerror = function () {
          e();
          k.o("error", { info: "REQUEST_FAILED", url: a });
        });
        window[f] = function (a) {
          e();
          if (k.C.callbackFunction) {
            k.C.callbackFunction.call(k.C.context, a);
          } else if (3E4 === a.errcode && a.data) {
            g.a.Z1 =
            !0, g.pb.load("AMap.AntiCrabFrame", function () {
              g.a.sv || (g.a.sv = new g.W3);
              g.a.cH.push(k);
              g.a.sv.open(k.C.Cc, a.data.host, k.VA || "", k.url);
            });
          } else {
            if (a instanceof Array || "string" === typeof a) a = { data: a };
            a.Rsa = f;
            k.o("complete", a);
          }
        };
        b = "?";
        -1 !== a.indexOf("?") && (b = "&");
        b = a + b + this.C.callback + "=" + f;
        if (-1 !== a.indexOf(g.w.Gd + "/v") || -1 !== a.indexOf("yuntuapi.amap.com/datasearch") ||
        -1 !== a.indexOf("webapi.amap.com/")) {
          b = b + "&platform=JS&logversion=2.0" + ("&appname=" + g.w.Qp), b +=
          "&csid=" + g.a.A3(), b += "&sdkversion=" + g.w.Op;
        }
        if (c = this.C.VE) {
          var l = [], m;
          for (m in c) c.hasOwnProperty(m) && (l.push(m + "=" + c[m]), b += "&" + m + "=" + encodeURIComponent(c[m]));
          k.VA = l.join("&");
        }
        h.src = d ? b + "&rereq=true" : b;
        g.bb.qb.J7 = document.getElementsByTagName("head")[0];
        g.bb.qb.J7.appendChild(h);
      }
    }
  });
  window.AMap.Http = {};
  window.AMap.Http.JSONP = g.bb.qb;
  g.bb.XMLHttpRequest = g.bb.aI.extend({
    send: function (a, b, c, d, e) {
      var f = this;
      if ((g.l.ee || g.l.MZ) && window.XDomainRequest) {
        var h = this.Q3 = new XDomainRequest;
        h.onerror = function (b) {f.o("error", { url: a, data: b });};
        h.onload = function () {f.o("complete", { url: a, data: h.responseText });};
        h.open(b || "GET", a);
        setTimeout(function () {h.send(c || void 0);}, 0);
      } else {
        var k = this.Q3 = new XMLHttpRequest;
        k.onreadystatechange = function () {
          4 === k.readyState && 200 === k.status ? f.o("complete", {
            url: a,
            data: "arraybuffer" === k.responseType ? k.response : k.responseText
          }) :
          404 === k.status && (k.abort(), f.o("error", { url: a, data: "404" }));
        };
        k.onerror = function (b) {
          k.abort();
          f.o("error", { url: a, data: b });
        };
        k.open(b || "GET", a);
        "POST" === b && k.setRequestHeader("Content-Type", d || "application/x-www-form-urlencoded");
        e && (k.responseType = e);
        k.send(c || void 0);
      }
    }, abort: function () {this.Q3.abort();}
  });
  g.Fi = g.Z.extend({
    r: function (a, b, c, d) {
      this.start = a;
      this.end = b;
      this.transition = c;
      this.precision = d || 0;
      this.yt = !1;
      this.update = g.a.bind(this.update, this);
      return this;
    }, jm: function (a) {
      this.tg = this.startTime = +new Date;
      this.frames = 0;
      this.yt = !0;
      this.SW = g.a.Fc(this.update);
      this.aba = g.a.bind(this.Lo, a || this);
    }, update: function () {
      this.frames += 1;
      var a = +new Date,
      b = a - this.startTime,
      b = this.transition ? this.transition(this.start, this.end, b, this.frames, a - this.tg) : null;
      "number" === typeof b && Math.abs(b - this.end) < this.precision ?
      (this.stop(), b = this.end) : this.SW = g.a.Fc(this.update);
      this.tg = a;
      this.aba(b);
    }, stop: function (a) {
      g.a.Bh(this.SW);
      a && this.update();
      this.yt = !1;
    }
  });
  g.Fi.Easing =
  {
    Linear: { None: function (a) {return a;} },
    Bounce: {
      In: function (a) {
        return 1 - (a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -=
        1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -=
        2.625 / 2.75) * a + 0.984375);
      }, Out: function (a) {return g.Fi.Easing.Bounce.In(1 - a);}
    },
    Cubic: {
      In: function (a) {return 1 - a * a * a;}, Out: function (a) {
        a = 1 - a;
        return 1 - a * a * a;
      }
    }
  };
  g.Yb = g.Z.extend({
    ga: [ g.na, g.Ie, g.VF ],
    r: function (a, b) {
      this.bc = g.a.bind(this.bc, this);
      this.F = b;
      this.li = b.li;
      this.dl = "";
      this.sg = this.cg = this.Fj = !1;
      this.xm = {};
      this.J = a;
      this.d$();
      this.Wia();
      this.W("zooms", b, !0);
      this.W("size", b, !0);
      this.W("limitBounds", b);
      this.W("view", b);
      this.W("nolimg", b, !0);
      this.W("mapNumber", b, !0);
      this.W("lang", b, !0);
      this.W("features", b, !0);
      this.W("styleID", b, !0);
      this.W("forceBig", b, !0);
      this.W("mode", b, !0);
      this.W("showBuildingBlock", b, !0);
      this.W("mapStyle", b);
      var c = this.get("mapStyle");
      this.$d = g.w.$d[c] || g.w.$d["default"];
      this.aE = "#a3ccff";
      this.hz = b.get("skyColor") || "#cce0ff";
      this.W("editEnable", b);
      this.kc ? this.W("style", b, !0) : this.W("styleUrl", b);
      this.W("hightlight", b, !0);
      this.W("labelzIndex", b, !0);
      if (g.l.bH) {
        c = new z.q.ib({ innerLayer: !0, zIndex: b.get("labelzIndex"), visible: !1 });
        this.cd = new g.q.Hi(c, this, [ "point", "road" ]);
        this.cd.type = "\u77e2\u91cf\u6807\u6ce8";
        var d = this.F.get("defaultLayer");
        d && c.W("rejectMapMask", d, !0);
        b.labelsLayer = this.cd.X;
        this.cd.X.h("complete", this.Nn, this,
        !0);
        this.cd.X.h("renderComplete", this.Nn, this);
        this.cd.Ey = this.cd.fg = !0;
      }
      this.W("isHotspot", b, !0);
      this.W("layers", b);
      this.W("overlays", b);
      this.W("infos", b, !0);
      this.W("contextmenus", b, !0);
      this.W("controls", b);
      this.W("bounds", b);
      this.W("draw", b);
      this.ze("zoomAndCenter destroy defaultCursor jogEnable animateEnable baseRender overlayRender gridMapForeign".split(" "), b);
      this.ze("rotateEnable pitchEnable dragEnable keyboardEnable doubleClickZoom scrollWheel zoomEnable touchZoom".split(" "), b, !0);
      this.get("jogEnable") ?
      this.Ys = !0 : this.Ys = !1;
      this.u9();
      this.A9();
      this.ET && this.ET();
      this.W("resizeEnable", b);
      this.F.map = this;
      c = this.get("size");
      c = c.width * c.height / 65536;
      g.l.nd && 3 < c && (this.$W = !0);
      this.IG();
    },
    editEnableChanged: function () {this.kc = this.get("editEnable");},
    labelzIndexChanged: function () {this.cd && this.cd.set("zIndex", this.get("labelzIndex"));},
    styleChanged: function () {this.Wk = !0;},
    mapStyleChanged: function () {
      if (this.F.Ih) {
        this.dl && (this.set("style", ""), this.ws = this.dl = "");
        var a = this.get("mapStyle");
        this.Wk = !0;
        this.$d =
        g.w.$d[a] || g.w.$d["default"];
        this.eB();
      }
    },
    styleUrlChanged: function () {
      if (this.F.Ih) {
        var a = this.get("styleUrl") || "";
        if (a !== this.dl) {
          var b = -1 !== a.indexOf("?isPublic=true"), a = a.substr(0, 46), c = a.split("amap://styles/")[1];
          "normal" === c ? (this.dl =
          "", this.set("nolimg", !!this.F.get("nolimg_param")), this.set("style", ""), this.ws = "") : (this.JB =
          !0, this.set("nolimg", !0), b =
          new g.bb.qb(32 > c.length
          ? g.w.Sb + "://webapi.amap.com/style?name=" + c + "&key=" + g.w.key
          : g.w.Sb + "://webapi.amap.com/v4/map/styles?styleid=" + c + "&s=rsv3&key=" +
          g.w.key + (b
          ? "&ispublic=1"
          : ""), { callback: "callback" }), b.h("complete", function (a) {
            a.data && a.data.content
            ? this.set("style", JSON.parse(a.data.content))
            : this.set("style", "");
            this.JB = !1;
          }, this), b.h("error", function () {this.JB = !1;}, this), this.dl = a, this.eB());
        }
      }
    },
    a2: function (a) {this.J.style.background = a;},
    qha: function (a) {
      var b = this.get("center");
      if (a.contains(b)) return null;
      a = g.pp.closestOnLine(b, a.OP().path);
      return new g.U(a[0], a[1]);
    },
    Wea: function () {
      var a = this.get("limitBounds"), b = this.get("bounds");
      b.pc && b.pc.R >
      b.$b.R && (b.$b.R += 360);
      if (!a.contains(b)) {
        if (b instanceof g.zn) return this.qha(a, b);
        var c = this.get("center").jb();
        a.ti() < b.ti() ? c.R = a.$g().R : (a.pc.R > b.pc.R && (c.R += a.pc.R - b.pc.R), a.$b.R < b.$b.R && (c.R +=
        a.$b.R - b.$b.R));
        a.ri() < b.ri() ? c.P = a.$g().P : (a.pc.P > b.pc.P && (c.P += a.pc.P - b.pc.P), a.$b.P < b.$b.P && (c.P +=
        a.$b.P - b.$b.P));
        return c;
      }
    },
    CK: function () {
      var a = this.AP;
      this.F.refreshSize();
      var b = this.get("size");
      b && a && !b.eb(a) && (this.AP = b, this.Dt =
      !0, this.set("display"), this.J1(b), this.get("resizeEnable") && this.ja("resize",
      { Gka: a, k0: b }));
    },
    sV: function () {
      var a = this;
      a.CK();
      a.xK = setTimeout(function () {a.sV();}, 200);
    },
    a7: function () {this.xK && (clearTimeout(this.xK), this.xK = null);},
    d$: function () {
      this.F.B = !0;
      this.AP = this.F.getSize();
      this.F.B = !1;
      if (g.l.ee || g.l.K3 && g.l.HF || g.l.hka) {
        this.sV();
      } else {
        var a = this;
        g.D.Yda(this.J, function (b) {a.CK(b);});
      }
    },
    Wia: function () {
      var a = this.J;
      g.g.Ma(a, "amap-container");
      var b = {};
      b.Pc = g.g.create("div", a, "amap-maps");
      this.rk = g.g.create("div", a);
      this.rk.style.display = "none";
      b.Vp = g.g.create("div", b.Pc, "amap-drags");
      b.q = g.g.create("div", b.Vp, "amap-layers");
      b.A = g.g.create("div", b.Vp, "amap-overlays");
      b.controls = g.g.create("div", a, "amap-controls");
      b.DA = g.g.create("a", a, "amap-logo");
      var c = window.location.host;
      -1 === c.indexOf("amap.com") && -1 === c.indexOf("gaode.com") && (b.DA.href =
      g.l.Y ? "http://m.amap.com" : "http://gaode.com", b.DA.target = "_blank");
      g.g.create("img", b.DA).src = g.l.nd ? this.F.C.logoUrlRetina : this.F.C.logoUrl;
      b.Gk = g.g.create("div", a, "amap-copyright");
      b.Gk.style.display = "none";
      350 < g.g.tF(this.J).width && (b.Gk.innerHTML =
      this.F.C.copyright, b.Gk.Q_ = g.g.create("span", b.Gk, "amap-mcode"), this.eB());
      this.Oa = b;
    },
    eB: function () {
      var a = this.get("layers");
      if (a) {
        for (var b = -1, c = "", d = 0; d < a.length; d += 1) {
          var e = a[d].get("mapNumber"),
          f = a[d].get("zIndex", null, !0);
          e && f > b && a[d].get("visible") && (c = e, b = f);
        }
        this.set("mapNumber", c);
        this.F.B = !0;
        a = this.F.getMapStyle();
        this.F.B = !1;
        "GS(2018)1709" === c && a && "normal" !== a && "amap://styles/normal" !== a && (c =
        "", this.Oa.Gk.style.visibility = "hidden", this.Oa.DA.style.display = "none");
        c && this.Oa.Gk.Q_ && (this.Oa.Gk.Q_.innerHTML =
        "- " + c + "\u53f7", this.Oa.Gk.style.visibility = "visible", this.Oa.DA.style.display = "block");
        return c;
      }
    },
    MS: function () {
      var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !1;
      g.tj && (a ? g.tj.flush() : this.yY || (this.yY = g.a.Fc(function () {
        g.tj.flush();
        this.yY = null;
      }, this)));
    },
    t1: function () {
      var a = this, b = this.F.get("rasterLayer");
      b && (this.F.set("rasterLayer", void 0), this.F.l1 = !0, this.F.ej = this.F.sa, this.af.zF = !1, b.q && (b.q.OA =
      !0), g.a.HG(function () {a.F && a.F.fj(b);}));
    },
    Nn: function () {
      function a () {
        for (var a = d.get("layers"),
             b = d.get("zoom"), c = 0; c < a.length; c += 1) {
          var e = a[c].get("zooms");
          if (!(a[c].ej || a[c].UZ || !e || b > e[1] || b < e[0] || !a[c].get("visible") || a[c].q && a[c].q.ka && 0 === a[c].q.ka.length || a[c].q && a[c].q.OA || a[c].q && a[c].q.sa)) return !1;
        }
        a = d.F.get("features");
        return ("all" === a || g.a.ga(a, "point")) && d.cd && d.cd.get("visible") && 0 < d.cd.ka.length && !d.cd.sa && !d.cd.rD
        ? !1
        : !0;
      }

      function b () {
        var a = { id: d.F.id };
        g.oe.Je.end(g.extend(a, { key: "rds" }));
        g.oe.Je.send(g.extend(a, {
          params: {
            rs: d.get("baseRender"), viewmode: d.F.view.type, fd: 0 === d.TF ?
            1 : 0, raster: d.F.ej ? 1 : 0
          }
        }));
        d.F && d.F.Tk && d.F.Tk.Vy && d.F.Tk.Vy();
        d.F.c1 = 1;
        d.MS();
        d.set("display");
        d.zA = !0;
      }

      function c () {
        g.oe.Je.end({ id: d.F.id, key: "rd" });
        g.a.Fc(function () {this.o("complete");}, d);
        d.F.sa = !0;
        d.set("display");
      }

      if (!this.WL) {
        if (this.zA) {
          1 === this.Dr && 13 === this.get("zoom") && (g.a.aA.stop(this.OC), g.oe.Je.send({
            id: this.F.id,
            params: { fps: this.OC.aA, type: "fps", rs: this.get("baseRender") }
          }), this.Dr = 2), this.MS();
        } else {
          var d = this, e = this.F.get("rasterLayer"), f = a();
          e ? (e.q && e.q.sa && (this.F.sa || c()), f && (this.F.sa ||
          c(), this.t1(), b())) : f && (this.F.sa || c(), b(), this.F.l1 = !0);
        }
      }
    },
    layersChanged: function () {
      this.xa = this.xa || [];
      for (var a = this.get("layers"), b = this.xa.length - 1; 0 <= b; b -=
      1) {
        this.xa[b] === this.wd || this.xa[b] === this.Sq || this.xa[b].Ey || this.xa[b].X.Ey || -1 !== g.a.indexOf(a, this.xa[b].X) || (this.xa[b].Uf(), this.xa[b].ak && this.xa[b].ak.Uf(), this.xa[b].X.I("complete", this.Nn, this), this.xa[b].X.I("renderComplete", this.Nn, this), this.xa =
        g.a.Um(this.xa, b));
      }
      for (var c = !1, d = !0, e = this.get("labelzIndex"), b = 0; b < a.length; b += 1) {
        if (!a[b].UZ) {
          if (a[b].gi) {
            -1 ===
            g.a.indexOf(this.xa, a[b].q) && this.xa.push(a[b].q);
          } else {
            var f = this.yg(a[b]);
            f && (this.xa.push(f), a[b].gi = !0, a[b].q = f);
            a[b].h("complete", this.Nn, this, !0);
            a[b].h("renderComplete", this.Nn, this);
          }
          a[b].Lq && a[b].get("visible") && (c = !0, !1 === a[b].get("detectRetina") && (d = !1), e =
          a[b].get("textIndex") || e);
        }
      }
      this.cd && (c || "3D" !== this.F.view.type ? this.cd.rD = !1 : (c =
      g.a.find(a, function (a) {if (z.q.rr && a instanceof z.q.rr && a.get("visible")) return !0;}), this.cd.rD =
      c = !!c));
      a = g.a.indexOf(this.xa, this.cd);
      c && this.F.get("showLabel") ?
      (-1 === a && this.xa.push(this.cd), this.cd.ma =
      d && g.l.ma, this.cd.zz(this.get("mapStyle") || "normal"), this.cd.set("zIndex", e), this.cd.set("visible", !0), this.F.hA =
      !0, this.F.get("isHotspot") ? this.cd.Zka() : this.cd.ML()) : (this.cd && (this.cd.set("visible", !1), this.F.hA =
      !1, this.cd.ML()), this.F.hA = !1);
      this.F.isHotspotChanged();
      this.set("display", 0);
      this.eB();
    },
    isHotspotChanged: function () {this.layersChanged();},
    controlsChanged: function () {
      var a = this.get("controls"), b, c;
      if (a.add && 0 < a.add.length) {
        for (; 0 < a.add.length;) {
          b =
          a.add.shift(), (c =
          b.hs || b.addTo) && c.call(b, this.F, this.Oa.controls);
        }
      } else if (a.remove && a.remove.length) {
        for (; 0 < a.remove.length;) {
          b =
          a.remove.shift(), (c = b.st || b.removeFrom) && c.call(b, this.F, this.Oa.controls);
        }
      }
    },
    yW: function () {
      if (!this.WL) {
        var a = this;
        this.EW = !1;
        a.wd || (a.wd = new g.q.Sc(new z.q.Sc, a), a.wd.Ue = 36, a.wd.Bf =
        36, a.wd.set("zIndex", 120), a.xa.push(a.wd), a.wd.Sz = !0);
        for (var b = a.get("overlays"), c = [], d = 0; d < a.Qc.length; d +=
        1) {
          -1 === g.a.indexOf(b, a.Qc[d].Wb) && (a.Qc[d].Wb instanceof z.A.ye || a.Qc[d].Wb instanceof
          z.A.pm ? a.Qc[d].Uf() : (a.wd && a.Qc[d] instanceof g.A.lb ? (a.wd.jg =
          g.a.Hv(a.wd.jg, a.Qc[d].L), a.wd.p1([ a.Qc[d].L ])) : a.Sq && a.Sq.p1([ a.Qc[d].L ]), a.Qc[d].L.ca
          ? (g.g.remove(a.Qc[d].L.ca), a.Qc[d].L.ca = null)
          : a.Qc[d].L.Ta && (g.g.remove(a.Qc[d].L.Ta.xf), g.g.remove(a.Qc[d].L.Ta.oc), a.Qc[d].L.Ta =
          null), a.Qc[d].am && a.Qc[d].am.stop(), a.Qc[d].Wb.gi = !1, a.Qc[d].Wb.gp(), a.Qc[d].Wb.Le.map =
          null, a.Qc[d].Wb.A = null, a.Qc[d].Wb = null, a.Qc[d].L.oga(), a.Qc[d].L = null, a.Qc[d].gp(), a.Qc[d].Le =
          null, a.Qc[d].Pi(), a.Qc[d].map = null), c.push(a.Qc[d]));
        }
        for (d = 0; d < c.length; d += 1) a.Qc = g.a.Um(a.Qc, g.a.indexOf(a.Qc, c[d]));
        var e = [], f = [];
        g.a.nna(function (b) {
          if (!b.gi && b.gg) {
            var c = b.A || a.Eea(b);
            c && (a.Qc.push(c), c instanceof g.A.ye || c instanceof g.A.pm ? c.xw(a) : c instanceof g.A.lb
            ? e.push(c.L)
            : f.push(c.L), b.gi = !0);
          }
        }, b);
        e.length && a.wd.mv(e);
        f.length && (a.Sq || (a.Sq = new g.q.Sc(new z.q.Sc, a), a.Sq.set("zIndex", 110), a.xa.push(a.Sq)), a.Sq.mv(f));
        a.set("display", 0);
      }
    },
    overlaysChanged: function () {
      this.Qc = this.Qc || [];
      this.get("overlays") && 0 === this.get("overlays").length ?
      this.yW() : this.EW || (g.a.Fc(this.yW, this), this.EW = !0);
    },
    contextmenusChanged: function () {
      var a = this.get("contextmenu");
      if (a) {
        var b = this;
        g.pb.load("overlay", function () {
          b.zv = new g.A.pm(a, b);
          b.set("display", 0);
        });
      }
    },
    infosChanged: function () {
      var a = this.get("infos");
      if (a) {
        this.Uk = this.Uk || {};
        var b, c = this;
        g.pb.load("overlay", function () {
          for (var d in a) {
            a.hasOwnProperty(d) && (b = a[d], c.Uk[d] =
            c.Uk[d] || new g.A.ye(b, c));
          }
        });
      }
    },
    Eea: function (a) {
      var b = null;
      if (a instanceof z.A.lb) {
        b = new g.A.lb(a, this);
      } else if (a instanceof z.A.pm) {
        b =
        new g.A.pm(a, this);
      } else if (a instanceof z.A.ye) {
        b = new g.A.ye(a, this);
      } else {
        var c = [ "overlay" ];
        "d" === this.get("overlayRender")
        ? (c.push("dvector"), g.l.gn ? c.push("svg") : c.push("vml"))
        : c.push("cvector");
        if (!this.Apa && !g.pb.uA(c)) {
          var d = this;
          g.pb.Ig(c, function () {
            this.Apa = !0;
            d.overlaysChanged();
          });
          return;
        }
        a instanceof z.A.tc ? b = new g.A.tc(a, this) : a instanceof z.A.zx
        ? b = new g.A.zx(a, this)
        : a instanceof z.A.Ob ? b = new g.A.Ob(a, this) : a instanceof z.A.qg
        ? b = new g.A.qg(a, this)
        : a instanceof z.A.pr ? b = new g.A.tc(a, this) :
        a instanceof z.A.tr && (b = new g.A.tc(a, this));
      }
      return b;
    },
    EY: function () {
      var a = this.$d;
      this.ws && (a = "function" === typeof this.ws ? this.ws(this.af.Q.zoom) : this.ws);
      return a;
    },
    Gra: function () {
      function a () {}

      var b = new g.q.Sc, c = [], d = new g.U(116.405467, 39.907761);
      new g.style.Zf.ph;
      for (var e = 0; 100 > e; e += 1) {
        for (var f = 0; 100 > f; f +=
        1) {
          var h = new g.U(d.R + 0.02 * f, d.P + 0.02 * e),
          h = new g.nh({ name: "point" + (100 * e + f), map: this, ba: new g.va.Yf(this.Pb(h)) });
          c[100 * e + f] = h;
          h.h("hover", a, h);
        }
      }
      b.mv(c);
      this.xa.push(b);
    },
    Vb: function () {},
    Fra: function (a) {
      var b =
      new g.q.Sc, c = [], c = (new g.s4({ map: this })).OO(a);
      b.mv(c);
      this.xa.push(b);
      this.set("display", 0);
    },
    yg: function (a) {
      a = a.yg(this);
      if (!a) return null;
      if (a.length && "string" == typeof a[0]) {
        var b = this;
        g.pb.Ig(a, function () {b.layersChanged();});
      } else {
        return a;
      }
      return null;
    },
    nta: function () {return this.Oa;},
    dva: function () {this.set("display", 0);},
    displayChanged: function (a) {this.pW || this.IG(a);},
    IG: function (a) {
      if (a) {
        if (g.a.Bh(this.jB), g.l.Dk) {
          var b = this;
          setTimeout(function () {b.bc();}, 0);
        } else {
          this.bc();
        }
      } else {
        this.Xt || (this.jB =
        g.a.Fc(this.bc), this.Xt = !0);
      }
    },
    bc: function () {
      this.jB = null;
      if (!this.WL) {
        this.o("render");
        this.Xt = !1;
        var a = {};
        if (this.xa && (a.size = this.F.get("size"), a.size.width && a.size.height)) {
          for (var b = this.F.view.type, c = [], d = 0, e = this.xa.length; d < e; d +=
          1) {
            this.xa[d].np && this.xa[d].np !== b
            ? this.xa[d].sa = !0
            : (c.push(this.xa[d]), this.xa[d].ak && c.push(this.xa[d].ak));
          }
          c.sort(function (a, b) {
            var c = a.get("zIndex"), d = b.get("zIndex");
            return c > d ? 1 : c === d ? a.oC > b.oC ? 1 : -1 : -1;
          });
          a.xa = c;
          c = g.l.ma ? Math.min(window.devicePixelRatio || 1, 2) : 1;
          a.uea = 15E5 < a.size.width * a.size.height * c * c;
          a.zF = !!this.F.get("rasterLayer");
          a.Y = g.l.Y;
          a.Q = this.F.sF();
          a.np = b;
          this.F.B = !0;
          a.S = this.F.getResolution([ 0, 0 ]);
          a.Gq = this.F.get("mapStyle");
          a.Wk = this.Wk;
          this.F.B = !1;
          a.$c = this.sg;
          a.vsa = this.xm;
          a.We = this.Fj;
          a.hg = this.cg;
          a.QP = this.cg && g.l.Y;
          a.d3 = g.l.Y && this.Fj;
          a.kH = g.l.Y && this.sg;
          this.kH = a.kH;
          a.nr = a.Q.zoom > this.get("targetLevel");
          a.sua = !0;
          a.$W = this.$W;
          for (var b = !1, f, c = !1, d = 0; d < this.xa.length; d +=
          1) {
            this.xa[d].xi && this.xa[d].X.get("visible") && a.Q.zoom <= this.xa[d].X.get("zooms")[1] &&
            (a.aP = !0), this.xa[d].Qk().nd && (b = !0);
          }
          for (d = 0; d < this.xa.length; d +=
          1) {
            this.xa[d].X.qL && a.aP && (!this.Fj && this.xa[d].X.get("visible") && (f = this.xa[d].X.qL(), f.Jta =
            1, f.zoom = a.Q.zoom), c = !0);
          }
          c ? f && this.Mb !== f && (this.Mb = f) : this.Mb = [];
          a.Mb = this.Mb;
          a.nd = b;
          a.scale = Math.pow(2, a.Q.zoom - a.Q.je);
          this.af = a;
          this.Pd = this.F.get("mask");
          a.Pd = this.Pd;
          if (f = this.lF()) f.bc(a), this.Wk = this.AY = !1;
        }
      }
    },
    lF: function () {
      if (!this.O || this.O.type !== this.F.view.type) {
        if (this.O = null, "3D" == this.F.view.type) {
          var a = this;
          g.pb.load("Map3D", function () {
            a.O ||
            (a.O = new g.Ea.$B(a), a.set("display"));
          });
        } else {
          this.O = new g.N.canvas.Yb(this);
        }
      }
      return this.O;
    },
    Aha: function () {
      var a = [], b = this.get("controls").kd, c;
      for (c in b) b[c].Zv && b[c].Zv() && a.push(b[c].Zv());
      return a;
    },
    destroyChanged: function () {
      this.WL = 1;
      this.T = {};
      this.cd && (this.cd.X.I("complete", this.Nn, this), this.cd.Uf(), this.xa =
      g.a.Um(this.xa, g.a.indexOf(this.xa, this.cd)));
      this.Tca && clearTimeout(this.Tca);
      this.zca();
      this.D$();
      this.hK && this.hK();
      this.Bda();
      this.gp();
      this.F = this.F.map = null;
      this.J = this.J.sI = null;
      this.fe && (this.fe.stop(), this.fe = null);
      this.mf && (this.mf.stop(), this.mf = null);
      this.od && (this.od.stop(), this.od = null);
    },
    Bda: function () {
      var a = this.J;
      this.a7();
      g.D.kfa(a);
      g.g.fB(a);
      this.rk = null;
      g.g.Xa(a, "amap-container");
      this.Oa = null;
    },
    jogEnableChanged: function () {this.get("jogEnable") ? this.Ys = !0 : this.Ys = !1;},
    drawChanged: function () {
      var a = this, b, c, d = this.get("draw");
      if (d) {
        this.Bo || (this.Bo = []);
        b = 0;
        for (c = this.Bo.length; b < c; b += 1) this.Bo[b].vma();
        g.pb.load("interaction", function () {
          var b = new g.pqa({ type: d, q: a.Sq },
          a);
          a.Bo.push(b);
          a.loaded = !0;
        });
      } else if (this.Bo) {
        for (b = 0, c = this.Bo.length; b < c; b +=
        1) {
          this.Bo[b].vma(), this.Bo[b].$ra(), this.I("click", this.Bo[b].Cta, this);
        }
      }
    },
    ve: function (a, b, c) {return this.F.view.ve(a, b, c);},
    Mf: function (a, b, c) {return this.F.view.Mf(a, b, c);},
    jZ: function (a, b) {
      var c = this.get("size"), d = document.createElement("canvas");
      a = a || c.width;
      b = b || c.height;
      d.width = a;
      d.height = b;
      for (var e = -(c.width - a) / 2, c = -(c.height - b) / 2, f = d.getContext("2d"), h = this.Oa.q.childNodes, k = [], l = 0; l < h.length; l +=
      1) {
        k.push(h[l]);
      }
      k.sort(function (a,
                       b) {return a.style.zIndex - b.style.zIndex;});
      for (l = 0; l < k.length; l += 1) {
        var m = k[l];
        if (g.g.Ul(m, "amap-layer") || g.g.Ul(m, "amap-e") || g.g.Ul(m, "amap-labels")) {
          if ("CANVAS" === m.tagName) {
            var h = c,
            n = e,
            p = parseFloat(m.style.width) || m.width,
            q = parseFloat(m.style.height) || m.height,
            s = 1;
            m.style.transform && (s = parseFloat(m.style.transform.split("(")[1]));
            f.drawImage(m, n, h, p * s, q * s);
          } else if ("DIV" === m.tagName) {
            for (var s = m.childNodes, r = parseFloat(m.style.top) || 0 + c, m = parseFloat(m.style.left) || 0 + e, u = 0; u < s.length; u +=
            1) {
              var w = s[u];
              if ("CANVAS" === w.tagName || "IMG" === w.tagName) {
                h = parseFloat(w.style.top) || 0, n =
                parseFloat(w.style.left) || 0, p = parseFloat(w.style.width) || w.width, q =
                parseFloat(w.style.height) || w.height, f.drawImage(w, n + m, h + r, p, q);
              }
            }
          }
        }
      }
      return d.toDataURL();
    }
  });
  g.Yb.wb({
    u9: function () {
      this.Ky = !1;
      g.l.hf && ("3D" === this.F.view.type ? this.q6() : this.o6());
      g.l.Y || this.l6();
    },
    zca: function () {
      g.l.hf && ("3D" === this.F.view.type ? this.J$() : this.I$());
      g.l.Y || this.E$();
    },
    rotateEnableChanged: function () {
      this.dna = this.get("rotateEnable");
      g.l.hf && this.bX && "3D" !== this.F.view.type && (this.dna ? this.bX() : this.Fka());
    },
    zoomEnableChanged: function () {
      this.get("zoomEnable")
      ? (g.l.hf && this.uL && "3D" !== this.F.view.type && this.uL(), g.l.Y || this.n6())
      : (g.l.hf && this.jO && this.jO(), g.l.Y || this.H$());
    },
    mousewheelChanged: function () {},
    XN: function (a) {a && (this.Ky = a.bs);},
    Pt: function () {this.Ky = !1;},
    Mh: function (a, b, c, d) {
      var e, f = {};
      a || (a = window.event);
      var h = g.D.Pk(a, this.Oa.Pc);
      g.l.hf && ("touchend" !== a.type ? this.T.Y9 = h : h = this.T.Y9);
      f.tb = h;
      f.Qa = this.Mf(h);
      f.Qa && (f.Qa = f.Qa.toFixed(3));
      f.Sf = this.we(f.Qa);
      c || (c = this.Ky ? this.Ky ? [ this.Ky ] : null : this.s8(f.Qa, d)) && 0 < c.length && c[0].Jp && (e =
      c[0].Jp, f.bs = c[0]);
      e || (e = this);
      f.td = e;
      f.Sqa = a.altKey;
      f.ctrlKey = a.ctrlKey;
      f.button = void 0 === a.button ? 0 : a.button;
      b || (a.preventDefault ?
      a.preventDefault() : a.returnValue = !1);
      return f;
    },
    HJ: function (a) {return a && a !== this && a !== document;},
    yK: function () {
      var a = this.T;
      a.yf && (a.Ti.tb.x === a.yf.x && a.Ti.tb.y === a.yf.y ? a.cg = !1 : (a.cg =
      !0, a.Kn || (a.po.o("dragstart", a.oo), a.Kn = !0), a.po.o("dragging", a.Ti), a.yf = a.Ti.tb));
    },
    Una: function (a) {
      for (var b = [], c = 0; c < a.length; c += 1) a[c] && (b = b.concat(a[c]));
      return b;
    },
    Dw: function (a, b, c) {return a && b && (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) < (c || 10);},
    s8: function (a, b) {
      var c = this.lF();
      if (!c) return null;
      var d, e = this;
      this.xa.sort(function (a,
                             b) {return a.get("zIndex") > b.get("zIndex") ? -1 : 1;});
      c.Os(a, this.xa, function (a) {
        d = a;
        d = e.Una(d);
      }, function () {d = [];}, b);
      return d;
    }
  });
  g.Yb.wb({
    A9: function () {
      this.xm = {};
      this.h("moveend", this.t0, this);
      g.l.Dk && (g.l.rH || g.l.jE) && this.h("zoomend", this.pQ, this);
      this.h("movestart", this.u0, this);
      this.h("zoomstart", this.z0, this);
      this.h("zoomend", this.y0, this);
      this.xI();
      this.Dr = 0;
      this.OC = {};
      "undefined" === typeof window.requestAnimationFrame && (this.Dr = 2);
    },
    z0: function () {
      2 !== this.Dr && 12 === this.get("zoom") && (this.Dr = 1, g.a.aA.start(this.OC));
      this.Fj = !0;
    },
    y0: function () {
      1 === this.Dr && 13 !== this.get("zoom") && (this.Dr = 0, g.a.aA.cancel(this.OC));
      this.Fj =
      !1;
      this.set("display");
    },
    YV: function (a, b) {
      this.xm.left = 0 < a;
      this.xm.right = 0 > a;
      this.xm.IB = 0 < b;
      this.xm.$L = 0 > b;
    },
    Yr: function () {
      this.xm.left = !1;
      this.xm.right = !1;
      this.xm.IB = !1;
      this.xm.$L = !1;
    },
    D$: function () {
      this.I("moveend", this.t0, this);
      g.l.Dk && (g.l.rH || g.l.jE) && this.I("zoomend", this.pQ, this);
      this.I("movestart", this.u0, this);
      this.I("zoomstart", this.z0, this);
      this.I("zoomend", this.y0, this);
      this.F$();
    },
    t0: function (a) {
      this.cg = !1;
      this.Yr();
      this.J1();
      !a.o_ && this.F.get("limitBounds", null, !0) ? (a = this.Wea()) && !a.eb(this.get("center")) ?
      this.UG(this.get("zoom"), a, !1, !0) : this.ja("moveend") : this.ja("moveend");
      this.set("display");
    },
    u0: function () {
      this.cg = !0;
      this.Yr();
    },
    dragEnableChanged: function () {(this.Tz = this.get("dragEnable")) ? this.wI() : this.gK();},
    ja: function (a, b) {
      if (this.F.Vd(a)) {
        var c;
        b && (c =
        b.k0 ? { type: a, newsize: b.k0, oldsize: b.Gka } : { type: a, pixel: b.tb, target: this.F, lnglat: b.Sf });
        this.F.o(a, c);
      }
    },
    xI: function () {
      this.h("click", this.EU);
      this.h("dblclick", this.IU);
      g.l.hf && this.LR();
      g.l.Y || this.m6();
    },
    F$: function () {
      this.I("click", this.EU);
      this.I("dblclick", this.IU);
      g.l.hf && this.tU();
      g.l.Y || this.G$();
    },
    vD: function (a, b) {
      var c = this.get("targetLevel") || this.get("zoom"),
      c = 0 < b ? Math.floor(c) + 1 : Math.ceil(c) - 1,
      c = Math.min(Math.max(c, this.get("zooms")[0]), this.get("zooms")[1]);
      c === this.get("zoom") || this.mf && this.mf.yt && c === this.mf.end || this.yx(c, !1, a);
    },
    EU: function (a) {this.ja("click", a);},
    IU: function (a) {
      this.get("doubleClickZoom") && this.get("zoomEnable") && this.vD(a.Qa, 1);
      this.ja("dblclick", a);
    },
    rra: function (a) {
      this.vD(a.Uva, a.N2);
      this.ja("touchend",
      a);
    },
    wI: function () {
      this.Tz && ("3D" === this.F.view.type
      ? (this.h("dragstart", this.OU), this.h("dragging", this.KU), this.h("dragend", this.MU))
      : (this.h("dragstart", this.NU), this.h("dragging", this.JU), this.h("dragend", this.LU)));
    },
    gK: function () {
      this.Tz || ("3D" === this.F.view.type
      ? (this.I("dragstart", this.OU), this.I("dragging", this.KU), this.I("dragend", this.MU))
      : (this.I("dragstart", this.NU), this.I("dragging", this.JU), this.I("dragend", this.LU)));
    },
    NU: function (a) {
      this.XN(a);
      this.Yr();
      this.sg = !0;
      this.T.Mv = a.tb.x;
      this.T.Uz =
      a.tb.y;
      this.fe && (this.fe.stop(), this.nq(!0));
      this.ja("dragstart");
      this.ja("movestart");
      this.o("movestart", a);
      this.aoa();
    },
    JU: function () {
      var a = this.T, b = a.Ti.tb.x - a.Mv, c = a.Ti.tb.y - a.Uz;
      if (c || b) {
        this.T.cg = !0;
        this.YV(b, c);
        a.Mv = a.Ti.tb.x;
        a.Uz = a.Ti.tb.y;
        var a = b, d = c, e = this.rotation;
        e && (e *= Math.PI / 180, a = b * Math.cos(e) + Math.sin(e) * c, d = -Math.sin(e) * b + Math.cos(e) * c);
        a = this.get("centerCoords").Wa((new g.G(a, d)).Fd(this.S));
        (d = this.xX(a)) && (c = Math.round(this.ve(d).Wa(this.ve(a)).y));
        this.Kq(this.Oa.Vp, b, c);
        a.x =
        (a.x + g.a.wa) % g.a.wa;
        this.set("centerCoords", a, !0);
        this.set("center", this.we(a), !0);
        this.Ys && (this.tg
        ? (a = new Date, this.Jr = 100 < a - this.tg ? new g.G(0, 0) : new g.G(b, c), this.tg = a)
        : this.tg = new Date);
        this.ja("dragging");
        this.ja("mapmove");
      } else {
        this.T.cg = !1, this.Jr = null, this.Yr();
      }
    },
    Kq: function (a, b, c) {
      if (a && !(1 > Math.abs(b) && 1 > Math.abs(c))) {
        var d = parseFloat(a.style.top) || 0, e = parseFloat(a.style.left) || 0, f = "";
        this.rotation && (f = g.g.er[g.g.Hf] + ":rotate(" + this.rotation + "deg);overflow:visible;");
        a.style.cssText = "position:absolute;top:" +
        (d + c) + "px;left:" + (e + b) + "px;" + f;
      }
    },
    xX: function (a) {
      var b = this.F.view.oR(), c = this.AP.height * this.S / 2;
      return a.y < b.Zb + c ? (a.y = b.Zb + c, a) : a.y > b.sc - c ? (a.y = b.sc - c, a) : null;
    },
    LU: function () {
      this.Pt();
      100 < new Date - this.tg && (this.Jr = null);
      this.T.yf = null;
      this.sg = !1;
      this.Yr();
      this.ja("dragend");
      if (this.Ys && this.Jr) {
        if (this.T.cg) {
          var a = this.Jr, b = new g.G(0, 0);
          this.fe =
          new g.Fi(a, b, function (a, b, e) {return 600 <= e ? b : a.Fd(1 - Math.pow(e / 600, 2)).floor();}, 1);
          this.fe.Lo = function (a) {
            if (2 > Math.abs(a.x) && 2 > Math.abs(a.y)) {
              this.fe.stop(),
              this.o("moveend"), this.nq(), this.Jr = this.tg = null;
            } else {
              var b = a.x, e = a.y, f = this.rotation;
              f && (f *= Math.PI / 180, b = a.x * Math.cos(f) + Math.sin(f) * a.y, e =
              -Math.sin(f) * a.x + Math.cos(f) * a.y);
              b = this.get("centerCoords").Wa((new g.G(b, e)).Fd(this.S));
              e = this.xX(b);
              f = a.y;
              e && (f = Math.round(this.ve(e).Wa(this.ve(b)).y));
              this.Kq(this.Oa.Vp, a.x, f);
              b.x = (b.x + g.a.wa) % g.a.wa;
              this.set("centerCoords", b, !0);
              this.set("center", this.we(b), !0);
              this.ja("mapmove");
            }
          };
          this.fe.jm(this);
        } else {
          this.o("moveend"), this.nq(!0), this.Jr = this.tg = null;
        }
      } else {
        this.o("moveend"), this.nq(), this.Jr = this.tg = null;
      }
    },
    aoa: function () {
      if (!this.T.refresh) {
        var a = this, b = null;
        this.T.refresh = setInterval(function () {b !== a.T.yf && (a.set("display", 0), b = a.T.yf);}, g.l.Y ? 400 : 100);
      }
    },
    pQ: function () {
      if (g.l.Dk && (g.l.rH || g.l.jE)) {
        for (var a = this.Oa.q.childNodes, b = 0; b < a.length; b += 1) {
          var c = a[b];
          c instanceof HTMLCanvasElement && (c.width = 0);
          "amap-e" === c.className && (c.style.height = "0");
        }
        for (b = 0; b < this.xa.length; b += 1) {
          c =
          this.xa[b], "undefined" !== typeof AMap.IndoorMap && c instanceof AMap.IndoorMap &&
          (c.es && (c.es.width = 0), c.hv && (c.hv.width = 0));
        }
      }
    },
    nq: function (a) {
      this.T.refresh && (clearInterval(this.T.refresh), this.T.refresh = null);
      a || (this.pQ(), this.set("display", 0));
    },
    J1: function (a) {this.set("refresh", a);}
  });
  g.Yb.wb({
    setZoomSlow: function (a) {this.UG(a, null, !this.get("animateEnable"));},
    setPanTo: function (a) {this.UG(null, a, !this.get("animateEnable"));},
    zoomAndCenterChanged: function (a) {
      var b = a[0];
      b < this.get("zooms")[0] && (b = this.get("zooms")[0]);
      b > this.get("zooms")[1] && (b = this.get("zooms")[1]);
      this.UG(b, a[1], a[2] || !this.get("animateEnable"));
    },
    zoomChanged: function () {
      this.S = Math.pow(2, 20 - this.get("zoom"));
      this.o("closeOverlays");
      this.set("display");
    },
    rotationChanged: function (a) {
      this.rotation = this.get("rotation");
      this.F.o("rotate", { rotation: this.rotation || 0 });
      !0 !== a && this.set("display", 0);
    },
    pitchChanged: function () {
      this.pitch = this.get("pitch");
      this.F.o("pitch", { pitch: this.pitch || 0 });
      this.set("display", 0);
    },
    centerCoordsChanged: function () {
      this.o("closeOverlays");
      this.Xqa ? this.IG(!0) : this.IG(!1);
    }
  });
  g.hR = g.Z.extend({
    ga: [ g.na, g.Ie ],
    r: function (a, b) {
      this.type = "2D";
      this.Wf(b, !0);
      a && this.vea(a);
    },
    vea: function (a) {
      this.map = a;
      this.ze([ "size", "refresh", "maxPitch" ], a);
      this.centerChanged();
      a.ze([ "zoom", "center", "centerCoords", "rotation", "pitch" ], this);
    },
    oR: function () {
      this.oI || this.Dfa();
      return this.oI;
    },
    Dfa: function () {
      var a;
      if (this.get("center") instanceof g.U) {
        a = new g.le(-180, -85, 180, 85);
        var b = this.map.Pb(a.Vi());
        a = this.map.Pb(a.Zm());
        this.oI = { Bc: b.x, Zb: b.y, Ac: a.x, sc: a.y };
      } else {
        a = this.map.get("limitBounds",
        null, !0), this.oI = { Bc: a[0], Zb: a[1], Ac: a[2], sc: a[3] };
      }
    },
    sF: function () {
      var a = this.map, b = this.get("zoom");
      return {
        zoom: b,
        zg: this.get("center"),
        Fa: this.Nk(),
        mb: this.get("centerCoords"),
        rotation: parseInt(this.get("rotation")),
        ef: a.get("crs"),
        S: Math.pow(2, 20 - b),
        je: Math.round(b),
        zf: Math.pow(2, 20 - Math.round(this.get("zoom")))
      };
    },
    centerChanged: function () {this.set("centerCoords", this.map.Pb(this.get("center")).toFixed(3), !0);},
    centerCoordsChanged: function () {
      var a = this.map;
      a.B = !0;
      var b = this.oR(), c = this.get("centerCoords"),
      d = a.getSize();
      a.B = !1;
      var e = this.get("zoom", null, !0), a = this.get("center", null, !0), d = d.height * Math.pow(2, 20 - e) / 2;
      a instanceof g.U ? c.x = (c.x + 268435456) % 268435456 : 0 > c.x ? c.x = 0 : c.x > b.Ac && (c.x = b.Ac);
      c.y < b.Zb + d ? c.y = b.Zb + d : c.y > b.sc - d && (c.y = b.sc - d);
      this.set("center", this.map.we(c), !0);
    }
  });
  g.mC = g.hR.extend({
    Nk: function () {
      var a = this.get("size"),
      b = this.get("centerCoords"),
      c = parseInt(this.get("rotation")) % 360,
      d = this.get("zoom", null, !0),
      e = Math.pow(2, 20 - d),
      c = Math.PI * c / 180,
      a = new g.G((Math.abs(a.width * Math.cos(c)) + Math.abs(a.height * Math.sin(c))) / 2, (Math.abs(a.width * Math.sin(c)) + Math.abs(a.height * Math.cos(c))) / 2),
      e = new g.Xe(b.Wa(a.Fd(e)), b.add(a.Fd(e))),
      c = this.map.get("targetLevel");
      if (c > d - 1) {
        var f = Math.pow(2, 20 - c);
        e.T3 = new g.Xe(b.Wa(a.Fd(f)), b.add(a.Fd(f)));
      }
      e.L2 = c || d;
      e.mc = a;
      return e;
    }, sha: function (a) {
      var b =
      this.get("size"),
      c = this.get("centerCoords"),
      d = parseInt(this.get("rotation")) % 360,
      d = Math.PI * d / 180,
      b = new g.G((Math.abs(b.width * Math.cos(d)) + Math.abs(b.height * Math.sin(d))) / 2, (Math.abs(b.width * Math.sin(d)) + Math.abs(b.height * Math.cos(d))) / 2);
      a = Math.pow(2, 20 - a);
      return new g.Xe(c.Wa(b.Fd(a)), c.add(b.Fd(a)));
    }, bd: function () {
      var a = this.Nk(), b = a.ld.x, c = a.Qb.y, a = new g.G(a.Qb.x, a.ld.y), b = new g.G(b, c);
      return new g.le(this.map.we(a), this.map.we(b));
    }, zoomChanged: function () {}, ve: function (a, b) {
      this.get("size");
      var c =
      a.jb(), d = this.get("centerCoords"), e = c.Wa(d);
      e.x < -g.a.wa / 2 ? e.x += g.a.wa : e.x > g.a.wa / 2 && (e.x -= g.a.wa);
      var c = this.get("size").xB().Uc(2),
      f = this.get("rotation") * Math.PI / 180,
      d = e.x * Math.cos(f) - Math.sin(f) * e.y,
      e = Math.sin(f) * e.x + Math.cos(f) * e.y;
      return c.add((new g.G(d, e)).Fd(Math.pow(2, (b || this.get("zoom")) - 20)));
    }, Mf: function (a, b) {
      var c = this.get("size").xB().Uc(2),
      d = a.Wa(c),
      e = this.get("rotation") * Math.PI / 180,
      c = d.x * Math.cos(e) + Math.sin(e) * d.y,
      d = -Math.sin(e) * d.x + Math.cos(e) * d.y,
      c = this.get("centerCoords").add((new g.G(c,
      d)).Fd(Math.pow(2, 20 - (b || this.get("zoom")))));
      c.x = (c.x + 268435456) % 268435456;
      return c;
    }
  });
  g.hI = g.hR.extend({
    r: function (a, b) {
      this.Ng = new g.Jd;
      this.Jc = new g.Jd([ 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1 ]);
      arguments.callee.oa.apply(this, arguments);
      this.scale = 1;
      this.type = "3D";
      this.ux = null;
      this.b1 = "";
      this.Q = [ "", 0, 0, "", 0 ];
      this.ux = {};
    },
    refreshChanged: function () {this.jp();},
    zoomChanged: function (a) {
      this.jp();
      this.Q[4] = a;
    },
    centerChanged: function (a) {
      arguments.callee.oa.apply(this, arguments);
      this.jp();
    },
    centerCoordsChanged: function (a) {
      arguments.callee.oa.apply(this, arguments);
      this.jp();
      this.Q[0] = a.toString();
    },
    rotationChanged: function (a) {
      this.jp();
      this.Q[2] = a;
    },
    pitchChanged: function (a) {
      this.Le.pitch = Math.min(this.get("maxPitch"), Math.max(a, 0));
      this.jp();
      this.Q[1] = a;
    },
    jp: function () {
      if (!this.spa() && (this.eQ(), this.pga(), this.map)) {
        var a = this,
        b = function () {
          a.map.camera = a.IY();
          a.map.o("camerachange", { map: a.map, camera: a.map.camera });
        };
        a.map.sa ? b() : this.map.h("complete", b, this);
      }
    },
    IY: function () {
      return {
        height: this.Fk,
        fov: this.kha,
        aspect: this.uz,
        near: this.vw,
        far: this.$E,
        position: this.Mea,
        rotation: this.Le.rotation,
        pitch: this.Le.pitch
      };
    },
    pga: function () {this.Z9 = g.a.Ce();},
    kw: function () {
      var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 300;
      return g.a.Ce() - this.Z9 > a;
    },
    eQ: function () {
      var a = this.get("centerCoords"),
      b = this.get("pitch"),
      c = this.get("rotation"),
      d = (new g.Jd).k2(-a.x + g.a.Ub.x, -a.y + g.a.Ub.y, 0);
      this.Mea = { x: a.x - g.a.Ub.x, y: a.y - g.a.Ub.y };
      a = (new g.Jd).Vw(180 - b, 1, 0, 0);
      this.Nla = (new g.Jd).set(a);
      c = (new g.Jd).Vw(c, 0, 0, 1);
      this.Wq = (new g.Jd).set(c);
      this.jha = d.Qf();
      this.Jc = (new g.Jd).k2(0, 0, -this.Fk).multiply(a.multiply(c.multiply(d))).toFixed(8);
      this.Jc.De = this.Jc.Qf();
    },
    spa: function (a) {
      a = a || this.get("zoom");
      var b = this.get("size"), c = b.width, b = b.height;
      if (!c || !b) return !0;
      this.uz = c /= b;
      b = b / 2 * Math.pow(2, 20 - a);
      a = g.a.jd((56 - a) * Math.PI / 180, 2);
      var d = g.a.jd(b / Math.tan(a / 2), 0);
      2400 > d && (d = 2400, a = 2 * Math.atan(b / d));
      this.kha = a;
      this.Fk = d;
      this.vw = this.Fk / 10;
      this.$E = 50 * this.Fk;
      this.bga = (this.Fk - this.vw) / (this.$E - this.vw);
      this.Ng.h2(a, c, this.vw, this.$E);
      this.Ng.De = this.Ng.Qf();
      a = this.Ng;
      var c = new g.IQ,
      b = c.YA,
      e = this.Ng.elements,
      d = e[0],
      f = e[1],
      h = e[2],
      k = e[3],
      l =
      e[4],
      m = e[5],
      n = e[6],
      p = e[7],
      q = e[8],
      s = e[9],
      r = e[10],
      u = e[11],
      w = e[12],
      v = e[13],
      t = e[14],
      e = e[15];
      sc(b[0], k - d, p - l, u - q, e - w).normalize();
      sc(b[1], k + d, p + l, u + q, e + w).normalize();
      sc(b[2], k + f, p + m, u + s, e + v).normalize();
      sc(b[3], k - f, p - m, u - s, e - v).normalize();
      sc(b[4], k - h, p - n, u - r, e - t).normalize();
      sc(b[5], k + h, p + n, u + r, e + t).normalize();
      a.CM = c;
    },
    sF: function () {
      var a = this.map;
      a.map.Dt && (this.jp(), this.Q[3] = a.get("size").toString());
      var b = this.Q.toString();
      if (b !== this.b1) {
        var c = this.get("zoom"), d = this.ux;
        d.zoom = c;
        d.uz = this.uz;
        d.top =
        this.top;
        d.Fa = this.Nk();
        d.mb = this.get("centerCoords");
        d.rotation = a.get("rotateEnable") && parseInt(this.get("rotation")) || 0;
        d.pitch = this.get("pitch") || 0;
        d.Dwa = this.get("yaw");
        d.ef = a.get("crs");
        d.S = Math.pow(2, 20 - c);
        d.je = Math.round(c);
        d.B0 = Math.floor(c);
        d.zf = Math.pow(2, 20 - d.je);
        d.gla = Math.pow(2, 20 - d.B0);
        d.Ng = this.Ng;
        d.Jc = this.Jc;
        this.b1 = d.key = b;
      }
      this.ux.zg = this.get("center");
      this.ux.fp = g.a.Ce();
      this.ux.kw = this.kw();
      return this.ux;
    },
    Nk: function () {
      var a = this.get("size"), b = a.width, a = a.height;
      if (!b || !a) return null;
      var c, d;
      d = 0;
      var e = new g.G(0, d);
      c = this.Mf(e, !0);
      if (55 < this.Le.pitch || !c) for (; !c;) d += a / 40, e.y = d, c = this.Mf(e, !0);
      this.top = d / a;
      e.x = b;
      d = this.Mf(e, !0);
      var f = 0, h = this.Le.zoom;
      50 <= this.Le.pitch && 18 <= h && (f = 0);
      e.y = a + f;
      f = this.Mf(e, !0);
      e.x = 0;
      h = this.Mf(e, !0);
      c = [ c.gl(), d.gl(), f.gl(), h.gl(), c.gl() ];
      c = new g.h4(c);
      e.x = b / 2;
      e.y = a + 256;
      c.DL = this.Mf(e, !0);
      return c;
    },
    bd: function () {
      var a = this.Nk();
      if (a) {
        for (var b = [], c = 0; c < a.path.length; c +=
        1) {
          var d = this.map.we(new g.G(a.path[c][0], a.path[c][1]));
          b.push(d);
        }
        return new g.zn(b);
      }
    },
    ve: function (a, b, c) {
      a.z = c || 0;
      a = this.e0([ a ]);
      a = a[0];
      return new g.G(a.x, a.y);
    },
    LY: function (a) {
      var b = this.get("size");
      a = new g.kk([ a.x / b.width * 2 - 1, 1 - a.y / b.height * 2, -1, 1 ]);
      a.multiply(this.vw);
      return this.Ng.De.Lg(a);
    },
    Mf: function (a, b, c) {
      var d;
      this.map ? (this.map.B = !0, d = this.map.getSize(!0), this.map.B = !1) : d = this.get("size");
      var e = a.x / d.width * 2 - 1;
      d = 1 - a.y / d.height * 2;
      a = new g.kk([ e, d, -1, 1 ]);
      a.multiply(this.vw);
      if (!this.Ng.De) return null;
      a = this.Ng.De.Lg(a);
      e = new g.kk([ e, d, 1, 1 ]);
      e.multiply(this.$E);
      d = this.Ng.De.Lg(e);
      var f = this.Jc.De, e = f.Lg(a).elements;
      a = f.Lg(d).elements;
      c = (e[2] - (-c || 0)) / (e[2] - a[2]);
      if (0 > a[2] || 0 > c || b && c > 2.5 * this.bga) return null;
      b = e[0] - c * (e[0] - a[0]);
      c = e[1] - c * (e[1] - a[1]);
      return isNaN(b) || isNaN(c) ? null : (new g.G(b, c)).add(g.a.Ub);
    },
    e0: function (a) {
      for (var b = this.get("centerCoords"), c = g.a.Ub.x, d = g.a.Ub.y, e = this.get("size"), f = g.a.wa, h = b.x + f / 2, b = b.x - f / 2, k = [], l = new g.kk([
        0,
        0,
        0,
        1
      ]), m = l.elements, n = new g.G(0, 0), p = g.Jd.multiply(this.Ng, this.Jc), q = 0, s = a.length; q < s; q++) {
        if (a[q]) {
          a[q].concat ? (n.x = a[q][0], n.y = a[q][1],
          n.z = -a[q][2] || 0) : (n.x = a[q].x, n.y = a[q].y, n.z = -a[q].z || 0);
          h < n.x ? n.x -= f : b > n.x && (n.x += f);
          m[0] = n.x - c;
          m[1] = n.y - d;
          m[2] = n.z;
          var r = p.Lg(l);
          r.multiply(1 / r.elements[3]);
          k[q] = { x: (r.elements[0] + 1) / 2 * e.width, y: (-r.elements[1] + 1) / 2 * e.height, z: r.elements[2] };
        }
      }
      return k;
    },
    Ppa: function (a) {
      var b = this.get("size");
      a = this.Ng.Lg(this.Jc.Lg((new g.kk).copy(a)));
      a.multiply(1 / a.elements[3]);
      b = new g.G((a.elements[0] + 1) / 2 * b.width, (-a.elements[1] + 1) / 2 * b.height);
      b.z = a.elements[2];
      return b;
    }
  });
  g.a.Ub = new g.G(215440491, 106744817);
  g.Yb.wb({
    uX: function (a, b, c) {
      var d = this;
      d.BH ? (g.a.EL(d.BH), d.BH = null) : (d.ja("zoomstart", { zoom: a }), d.o("zoomstart"));
      d.BH = g.a.HG(function () {
        d.BH = null;
        d.ja("zoomend", { zoom: a });
        d.ja("zoomchange", { zoom: a });
        d.o("zoomend");
      }, { timeout: 150 });
      a = g.a.jd(a, 2);
      d.yx(a, !0, b, c);
    }, yx: function (a, b, c, d) {
      var e = this.get("zoom");
      if (e !== a) {
        var f = this.get("zooms");
        "3D" !== this.F.view.type && (g.l.Y || g.l.ee) && (b = !0);
        a = a || e;
        a = Math.min(Math.max(a, f[0]), f[1]);
        var h = a !== e, k = !!c;
        this.fe && (this.fe.stop(), this.fe = null);
        c = c || this.get("centerCoords");
        var l = this.ve(c);
        c = function (c) {
          b || (c = g.a.jd(c, 2));
          var d = this.Mf(l);
          this.set("zoom", c);
          var e = this.Mf(l), d = e && e ? e.Wa(d) : new g.G(0, 0);
          this.set("centerCoords", this.get("centerCoords").Wa(d).toFixed(3));
          d.x && d.y && this.ja("mapmove");
          c === a && a << 0 === a && (this.set("targetLevel", null), h && (this.ja("zoomchange"), this.ja("zoomend")), k && this.o("moveend"), this.o("zoomend"), this.mf =
          null);
        };
        var m;
        this.od && this.od.yt && (this.od.stop(), this.od.pN && (d = !0), this.od.gA && (m = !0), this.od =
        null, this.set("targetLevel", null));
        this.mf &&
        this.mf.yt && (this.mf.stop(), d = !0, this.mf.gA && (m = !0), this.mf = null, this.set("targetLevel", null));
        h && !d && this.ja("zoomstart");
        k && !m && this.ja("movestart");
        this.o("zoomstart");
        b ? c.call(this, a) : (this.mf = new g.Fi(e, a, null, 0.04), this.mf.pN = h, this.mf.gA =
        k, this.mf.transition =
        function (a, b, c) {return c >= g.w.gE ? b : (b - a) * (1 - Math.pow(1 - c / g.w.gE, 4)) + a;}, this.mf.Lo =
        c, this.mf.jm(this, !0), this.set("targetLevel", a));
      }
    }, UG: function (a, b, c, d) {
      var e = null;
      a || (a = this.od ? this.od.joa : this.get("targetLevel") || this.get("zoom"));
      var e =
      b ? this.Pb(b).toFixed(3) : this.od ? this.od.K2 : this.get("centerCoords"),
      f = a !== this.get("zoom"),
      h = !e.eb(this.get("centerCoords")),
      k = b = !1;
      this.mf && this.mf.yt && (this.mf.stop(), b = !0, this.mf.gA && (k = !0), this.mf =
      null, this.set("targetLevel", null));
      this.od && this.od.yt && (this.od.stop(), this.od.pN && (b = !0), this.od.gA && (k = !0), this.od =
      null, this.set("targetLevel", null));
      this.fe && (this.fe.stop(), this.fe = null);
      if (f || h) {
        if (!this.F.view.Nk().contains(e) || f && "3D" !== this.F.view.type && (g.l.Y || g.l.ee)) c = !0;
        if (c) {
          f && (b || (this.o("zoomstart"),
          this.ja("zoomstart")), this.set("zoom", a), this.ja("zoomchange"), this.ja("zoomend"), this.o("zoomend")), h && (k || d || (this.ja("movestart"), this.o("movestart")), this.set("centerCoords", e), this.ja("mapmove"), this.o("moveend", { o_: d })), this.set("targetLevel", null);
        } else {
          this.set("targetLevel", a);
          var l = a - this.get("zoom"), m = e.Wa(this.get("centerCoords")).toFixed(3);
          this.od = new g.Fi(1, 0, null, 0.001);
          this.od.pN = f;
          this.od.gA = h;
          this.od.K2 = e;
          this.od.joa = a;
          this.od.transition = function (a, b, c) {
            return Math.pow(1 - Math.min(g.w.gE,
            c) / g.w.gE, 2);
          };
          this.od.Lo =
          function (b) {
            0.02 > b
            ? (this.od && (this.od.stop(), this.od =
            null), f && (this.set("zoom", a), this.ja("zoomchange"), this.ja("zoomend"), f =
            !1, this.o("zoomend")), h && (this.set("centerCoords", e), this.o("mapmove"), this.o("moveend", { o_: d })), this.set("targetLevel", null))
            : (f && this.set("zoom", a - l * b), h && (b =
            e.Wa(m.Fd(b)).toFixed(3), this.set("centerCoords", b), this.ja("mapmove")));
            this.set("display", 1);
          };
          this.od.jm(this);
          f && !b && (this.o("zoomstart"), this.ja("zoomstart"));
          !h || k || d || (this.o("movestart"),
          this.ja("movestart"));
        }
      }
    }
  });
  g.q = {};
  g.q.Hc = g.Z.extend({
    ga: [ g.na, g.Ie ],
    r: function (a, b) {
      this.X = a;
      this.pd = [ 3, 18 ];
      this.oC = g.a.Tb(this);
      a && this.ze([ "opacity", "visible", "zIndex", "zooms" ], a);
      a.np = b.F.view.type;
      this.e = b;
      this.W("display", b);
    },
    Uf: function () {
      this.xi && this.ML();
      if (g.Ba && g.Ba.lp && g.Ba.lp.length) {
        var a = g.a.indexOf(g.Ba.lp, this);
        -1 !== a && (g.Ba.lp = g.a.Um(g.Ba.lp, a));
      }
      if (a = this.Fb) {
        if (a.length) {
          for (var b = 0; b < a.length; b +=
          1) {
            a[b].parentNode && a[b].parentNode.removeChild(a[b]);
          }
        } else {
          a.parentNode && a.parentNode.removeChild(a);
        }
        this.Fb = null;
      }
      this.X.Uf && this.X.Uf();
      this.X.gi = !1;
      this.X.q = null;
      this.gp();
      var c;
      this.N && (this.N.Bs(), this.N = null, c = "-" + this.vc);
      this.al && (this.al.Bs(), this.al = null, c = "-" + this.vc);
      if (c) for (var d in g.Ba.zi) g.a.Tga(d, c) && delete g.Ba.zi[d];
    },
    ja: function (a, b) {this.X.o(a, b);},
    visibleChanged: function () {this.set("display", 0);},
    zIndexChanged: function () {this.set("display", 0);},
    rP: function (a) {g.g.Xo(a, this.opacity);},
    opacityChanged: function () {
      var a = this.get("opacity");
      this.opacity = Math.min(Math.max(0, a), 1);
      if (a = this.Fb) {
        if (a.length) {
          for (var b = 0; b < a.length; b +=
          1) {
            this.rP(a[b]);
          }
        } else {
          this.rP(a);
        }
      }
    },
    vo: function () {return this.e.Pd && !this.X.get("rejectMapMask");},
    KM: function () {
      var a = this.get("bounds");
      if (a) {
        if (a instanceof g.le) {
          var b = a.Vi(),
          a = a.Zm(),
          c = this.e.Pb(new g.U(180, 0)).x,
          d = this.e.Pb(b),
          e = this.e.Pb(a),
          f = this.e.get("center");
          b.R > a.R && (0 < f.R ? e.x += c : d.x -= c);
          this.H = [ d.x, d.y, e.x, e.y ];
        } else {
          a instanceof g.Xe
          ? this.H = [ a.Qb.x, a.Qb.y, a.ld.x, a.ld.y ]
          : a instanceof g.nC && "3D" === this.X.np && (b = a.path[1], d = this.e.Pb(a.path[0]), e =
          this.e.Pb(b), this.H = [ d.x, d.y, e.x, e.y, a.Y1, a.height ]);
        }
        return this.H;
      }
      return null;
    }
  });
  var Ec = function () {
    function a (a) {
      this.jI[g.a.Tb(a)] = a;
      return this;
    }

    function b (a) {
      this.jI[g.a.Tb(a)] = null;
      return this;
    }

    return function () {
      function c () {
        var a = c.jI, b, f = [], h;
        for (h in a) a.hasOwnProperty(h) && f.push(a[h]);
        for (a = f.length - 1; 0 <= a; a -= 1) h = f[a].apply(this, arguments), void 0 !== h && (b = h);
        return b;
      }

      c.jI = {};
      c.KW = a;
      c.bva = b;
      return c;
    };
  }();
  g.Gf = g.Z.extend({
    ga: [ g.na ],
    r: function (a, b) {
      this.On = a | 0;
      this.qC = !!b;
      this.count = 0;
      this.mO = Ec();
      this.clear();
      this.Jy = [];
    },
    Eo: function () {return !this.count;},
    Ita: function () {return this.count >= this.On;},
    Kva: function (a) {this.On !== a && (this.On = a | 0) && this.sW(this.On);},
    kd: function (a) {return !!this.e[a];},
    get: function (a, b) {
      var c = this.JS(a);
      return c ? c.value : b;
    },
    set: function (a, b) {
      var c = this.JS(a);
      c ? c.value = b : (c = new g.Gf.tp(a, b), this.e[a] = c, this.ZC(c), this.count +=
      1, this.count > this.On && this.sW(this.On));
    },
    ip: function (a) {this.remove(a);},
    remove: function (a) {return this.e.hasOwnProperty(a) ? (this.$y(this.e[a]), !0) : !1;},
    forEach: function (a, b) {for (var c = this.Mc.next; c !== this.Mc; c = c.next) a.call(b, c.value, c.key, this);},
    sG: function (a, b) {return this.e.hasOwnProperty(a) ? this.e[a].value : b;},
    Hua: function () {return this.Mc.next.value;},
    Iua: function () {return this.Mc.Ca.value;},
    shift: function () {return this.tV(this.Mc.next);},
    AX: function () {this.Jy.length = 0;},
    CA: function (a) {this.Jy.push(a);},
    push: function (a) {
      a = new g.Gf.tp("", a);
      0 === this.count ? (this.Mc.Ca = null,
      a.Ca = this.Mc, this.Mc.next = a) : (this.nz.next = a, a.Ca = this.nz);
      this.count += 1;
      this.nz = a;
    },
    fpa: function (a) {
      a = new g.Gf.tp("", a);
      0 === this.count ? (this.Mc.Ca = null, a.Ca = this.Mc, this.nz = this.Mc.next = a) : (this.Mc.next.Ca =
      a, a.next = this.Mc.next, a.Ca = this.Mc, this.Mc.next = a);
      this.count += 1;
    },
    Bka: function () {
      if (this.count) {
        this.count -= 1;
        var a = this.Mc.next;
        a.next ? (a.next.Ca = this.Mc, this.Mc.next = a.next) : (this.Mc.next = null, this.nz = this.Mc.Ca = null);
        a.next = null;
        a.Ca = null;
        return a.value;
      }
      return null;
    },
    pop: function () {return this.tV(this.Mc.Ca);},
    JS: function (a) {if (this.e.hasOwnProperty(a)) return a = this.e[a], this.qC && (a.remove(), this.ZC(a)), a;},
    ZC: function (a) {
      this.qC ? (a.next = this.Mc.next, a.Ca = this.Mc, this.Mc.next = a, a.next.Ca = a) : (a.Ca =
      this.Mc.Ca, a.next = this.Mc, this.Mc.Ca = a, a.Ca.next = a);
    },
    sW: function (a) {
      if (!(this.count <= a || this.count < 2 * this.Jy.length)) {
        for (var b = this.qC ? this.Mc.Ca : this.Mc.next, c = {}, d = 0, e = this.Jy.length; d < e; d++) {
          c[this.Jy[d]] =
          !0;
        }
        for (a = Math.ceil(2 * a / 3); b && this.count > a && (d =
        this.qC ? b.Ca : b.next, b.key && !c[b.key] && (this.$y(b), this.mO(b.value)),
        b = d, b !== this.Mc && b !== this.nz);) {
          ;
        }
      }
    },
    $y: function (a) {
      a.remove();
      delete this.e[a.key];
      this.count -= 1;
    },
    tV: function (a) {
      this.Mc !== a && this.$y(a);
      return a.value;
    },
    clear: function () {
      this.e = {};
      this.Mc = new g.Gf.tp("", null);
      this.Mc.Ca = this.Mc.next = this.Mc;
      this.count = 0;
    }
  });
  g.Gf.tp = function (a, b) {
    this.key = a;
    this.value = b;
  };
  g.Gf.tp.prototype.Ca = null;
  g.Gf.tp.prototype.next = null;
  g.Gf.tp.prototype.remove = function () {
    this.Ca.next = this.next;
    this.next.Ca = this.Ca;
    this.next = this.Ca = null;
  };

  function Oc (a, b, c) {
    this.url = a;
    this.yc = b;
    this.xM = c;
    this.Ll = this.JG = !1;
  }

  function Pc (a, b, c) {
    var d = Qc;
    return function () {return d.call(this, a, b, c);};
  }

  function Qc (a, b, c) {
    a.Asa = +new Date;
    a.loaded = b;
    clearTimeout(a.voa);
    var d = a.Tja;
    d.fm.remove(a.url) && d.a$();
    d = a.qja ? a.ka : a.pa;
    a.ka = null;
    (c || b || a.xM) && a.yc(b ? d : null, a);
    a.v_ ? (a.v_.Pi(), a.v_ = null) : d && (d.onload = null, d.onerror = null, d.onabort = null, a.pa = null);
  }

  g.VB = g.Z.extend({
    Uqa: "assets/image/blank.gif",
    r: function (a, b, c) {
      this.timeout = b || 15E3;
      this.Ro = new g.Gf(1024);
      this.fm = new g.Gf(1024);
      this.HX = a;
      this.lM = c;
    },
    FI: function (a) {
      a && this.fm.count >= this.HX && (a =
      this.fm.Mc.Ca.value, a.Ll && (this.fm.remove(a.url), this.vR(a)));
      for (; this.Ro.count && !(this.fm.count >= this.HX);) this.F7(this.Ro.shift());
    },
    a$: function () {
      if (!this.bS) {
        this.bS = !0;
        var a = this;
        setTimeout(function () {
          a.bS = !1;
          a.FI();
        }, 0);
      }
    },
    F7: function (a) {
      var b = document.createElement("img");
      a.lha && (b.crossOrigin = "anonymous");
      b.src = a.url;
      a.pa = b;
      a.Tja = this;
      a.startTime = +new Date;
      a.JG = !0;
      b.complete ? Qc(a, !0) : (this.fm.set(a.url, a), b.onload = Pc(a, !0), b.onerror = Pc(a, !1, !0), b.onabort =
      Pc(a, !1), a.voa = setTimeout(Pc(a, !1, !0), this.timeout));
    },
    vR: function (a) {a.JG && (Qc(a, !1), a.Ll = !0, a.Era = !0);},
    aua: function (a, b, c) {return this.SF(a.url, b, c, !0, a.ta.z + "_" + a.ta.x + "_" + a.ta.y);},
    SF: function (a, b, c, d, e) {
      var f = this.fm.get(a);
      if (f && f.Ll) {
        f.Ll = !1, f.yc = b, f.xM = c;
      } else {
        f = new Oc(a, b, c);
        f.qja = d;
        f.key = e;
        if (this.Ro.get(g.a.Tb(f))) return;
        this.Ro.set(g.a.Tb(f),
        f);
        this.FI(!0);
      }
      return f;
    },
    Nja: function (a, b, c) {
      var d = this.fm.get(a);
      if (d && d.Ll) {
        d.Ll = !1, d.yc = b, d.xM = c;
      } else {
        d = new Oc(a, b, c);
        d.lha = !0;
        if (this.Ro.get(g.a.Tb(d))) return;
        this.Ro.set(g.a.Tb(d), d);
        this.FI(!0);
      }
      return d;
    },
    tX: function (a) {a.Ll || (a.Ll = !0, this.Ro.remove(g.a.Tb(a)));},
    clear: function (a) {
      this.Ro.forEach(function (a) {a.Ll = !0;});
      this.Ro.clear();
      if (a) for (; 0 < this.fm.length;) a = this.fm.pop(), this.vR(a); else this.fm.forEach(function (a) {a.Ll = !0;});
    }
  });

  function Rc (a, b, c) {
    this.z = a;
    this.x = b;
    this.y = c;
  }

  Rc.prototype.jb = function () {return new Rc(this.z, this.x, this.y);};
  Rc.prototype.toString = function () {return this.z + "/" + this.x + "/" + this.y;};
  g.ib = function (a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1;
    this.ta = a;
    this.key = a.toString();
    this.bf = b;
  };
  g.qm = Rc;
  g.q.ib = g.q.Hc.extend({
    r: function (a, b, c, d, e) {
      arguments.callee.oa.apply(this, arguments);
      this.W("tileSize", a);
      this.W("tiles", a);
      this.ze([ "zooms", "type", "detectRetina", "errorUrl" ], a);
      this.W("lang", b, !0);
      this.W("mapStyle", b, !0);
      this.W("style", b, !0);
      this.W("features", b, !0);
      var f = "overlayer" === a.get("type") || !1 === a.get("blend");
      this.uj = !f && !g.l.Y;
      if (g.l.ee || g.l.Awa) this.uj = !1;
      var h = b.get("size"), h = h.width * h.height / 65536;
      this.ma = g.l.Y && g.l.ma && this.get("detectRetina");
      g.l.nd && g.l.Y && 9 < h && (this.uj = !1);
      this.$h =
      !f && !a.ej;
      this.ai = !f && !a.ej;
      this.gH = c;
      this.W("reload", a);
      a.mja ? this.W("createTile", a) : this.W("tileFun", a);
      this.Se = d;
      this.PZ = e;
    },
    langChanged: function () {
      this.set("reload");
      this.X.So();
    },
    mapStyleChanged: function () {
      this.set("reload");
      this.X.So();
    },
    styleChanged: function () {this.e.kc || (this.set("reload"), this.X.So());},
    featuresChanged: function () {
      this.set("reload");
      this.X.So();
    },
    reloadChanged: function () {this.set("display", 0);},
    tileFunChanged: function () {
      var a = this.gH || this.get("tileFun");
      this.Qm = function (b, c, d) {
        var e =
        a(b.ta.x, b.ta.y, b.ta.z);
        if (!b.Aq || b.Aq.Ll) {
          b.loaded = !1, b.Aq =
          ("3D" === this.e.F.view.type ? g.Sk.Nja : g.Sk.SF).call(g.Sk, e, function (a) {
            b.Aq = null;
            a ? c(a) : d();
          }, !1);
        }
      };
    },
    createTileChanged: function () {
      this.X.B = !0;
      var a = this.X.getCreateTile();
      this.X.B = !1;
      this.Qm = function (b, c, d) {a.call(this.j.X, b.ta.x, b.ta.y, b.ta.z, c, d);};
      this.set("reload");
    },
    Qk: function () {
      var a = this.X.get("zooms", null, !0);
      this.X.lja && (a = [ Math.min(a[0], 18), Math.min(a[1], 18) ]);
      return {
        Yc: this.X.get("tileSize"),
        visible: this.X.get("visible"),
        H: this.KM(),
        pd: a,
        nE: this.uj,
        $h: this.$h,
        ai: this.ai,
        opacity: this.X.get("opacity"),
        Qm: this.X.get("createTile"),
        $m: this.gH || this.X.get("tileFun"),
        nd: this.X.Lq ? !1 : this.X.get("detectRetina") && g.l.ma && g.l.Y,
        Pd: this.vo()
      };
    },
    Ml: function (a) {if (g.N.Nd.Vh) return new g.N.Nd.Vh(this, a);}
  });
  g.Sk = new g.VB(6, null);
  g.q.Sc = g.q.Hc.extend({
    r: function (a, b) {
      this.nb = Math.min(2, window.devicePixelRatio || 1);
      this.nd = g.l.ma && !a.wi;
      this.map = b;
      this.dp = 0;
      this.Rk = !1;
      this.Bf = this.Ue = 0;
      this.jg = [];
      arguments.callee.oa.apply(this, arguments);
      this.ht = [];
      this.Ik = new g.q.n4;
      a && (this.W("style", a), this.W("cursor", a, !0), this.Yna =
      a.get("stable") || !1, this.W("dataSources", a), this.W("bubble", a));
      this.W("display", b);
      this.i6();
    },
    Qk: function () {
      return {
        visible: this.get("visible"), pd: this.get("zooms"), opacity: this.get("opacity"), zIndex: this.get("zIndex"),
        pv: this.X.get("alwaysRender") || !1, Pd: this.vo()
      };
    },
    dataSourcesChanged: function () {
      var a = this.get("dataSources");
      a && a.length ? "string" === typeof a ? (new g.bb.qb(a)).h("complete", function (a) {
        this.J0(a.data);
        this.hq = a.data;
        this.Rk = !0;
        this.set("display");
        this.sa = !0;
        this.X.o("complete");
      }, this) : a.length && (this.J0(a), this.hq = a, this.Rk = !0, this.set("display"), this.sa =
      !0, this.X.o("complete")) : this.clear();
    },
    getDatas: function () {return this.hq;},
    mpa: function () {
      if (this.X.wi) {
        var a = this.el;
        this.Ue = a.Ue;
        this.Bf = a.Bf;
      }
    },
    ja: function (a, b) {
      var c = { type: a, data: "mouseout" === a ? this.X9 || null : b.bs.Ya, target: this.X };
      this.X9 = "mouseout" === a ? null : b.bs.Ya;
      this.X.o(a, c);
    },
    rc: function (a) {this.ja(a.type, a);},
    i6: function () {
      this.h("click", this.rc);
      this.h("dblclick", this.rc);
      this.h("mousedown", this.rc);
      this.h("mouseup", this.rc);
      this.h("mouseover", this.rc);
      this.h("mouseout", this.rc);
      this.h("touchstart", this.rc);
      this.h("touchend", this.rc);
    },
    Ara: function () {
      this.I("click", this.rc);
      this.I("dblclick", this.rc);
      this.I("mousedown", this.rc);
      this.I("mouseup",
      this.rc);
      this.I("mouseover", this.rc);
      this.I("mouseout", this.rc);
      this.I("touchstart", this.rc);
      this.I("touchend", this.rc);
    },
    styleChanged: function () {
      this.el = this.get("style");
      this.mpa();
      this.set("display", 0);
    },
    J0: function (a) {
      if (a) {
        this.clear();
        for (var b = 0; b < a.length; b += 1) {
          var c = a[b].lnglat;
          a[b].lnglat = g.a.Ha(c);
          c = this.map.Pb(c);
          c = new g.nh({ name: "point-" + g.a.Tb(this), ba: new g.va.Yf([ c.x, c.y ], !0) });
          c.Jp = this;
          c.Ya = a[b];
          this.eE(c);
        }
      }
    },
    bia: function (a) {
      if ("geojson" === a) return new g.s4({ map: this.map });
      if ("topjson" ===
      a) {
        return new g.Lqa({ map: this.map });
      }
      if ("subway" === a) return new g.Gqa({ map: this.map });
    },
    Hla: function (a) {
      if (a) {
        var b = [], b = [], c = {};
        if (a.rules) {
          for (var b = a.rules, d = 0, e = b.length; d < e; d +=
          1) {
            for (var f = [], h = b[d].symbolizers, k = 0, l = h.length; k < l; k += 1) {
              h[k].fill && (f[k] =
              new g.style.Zf.GQ(h[k].fill)), h[k].stroke && (f[k] = new g.style.Zf.dR(h[k].stroke));
            }
            h = f;
            b[d].dH = h;
            b[d] = new g.style.d5(b[d]);
          }
          c.rules = b;
        }
        if (a.symbolizers) {
          b = a.symbolizers;
          a = 0;
          for (d = b.length; a < d; a += 1) {
            b[a].fill && (b[a] = new g.style.Zf.GQ(b[a].fill)), b[a].stroke &&
            (b[a] = new g.style.Zf.dR(b[a].stroke));
          }
          c.dH = b;
        }
        a = new g.dI(c);
      } else {
        a = new g.dI({});
      }
      this.set("style", a);
      return a;
    },
    xra: function (a, b) {
      var c = new g.bb.qb(a);
      c.h("complete", function (c) {
        c = this.ka[a] = this.bia(b).OO(c);
        this.mv(c);
        this.ja("complete");
      }, this);
      c.h("error", this.Vb, this);
    },
    hma: function (a) {
      "px" === a.target.get("unit") ? (this.Ue = Math.max(a.Zj, this.Ue), this.Bf =
      Math.max(a.Zj, this.Bf)) : a.Zj > this.Iq && (this.Iq = a.Zj, this.tw = this.Iq / this.map.F.li.wo(20));
    },
    eE: function (a) {
      this.Ik.add(a);
      if (!this.Sz && !this.X.wi) {
        if (0 ===
        a.name.indexOf("circle") || 0 === a.name.indexOf("ellipse")) {
          a.h("rad", this.hma, this);
          var b = a.get("radius");
          b.length && (b = Math.max.apply(null, b));
          "px" === a.get("unit") ? (this.Ue = Math.max(b, this.Ue), this.Bf = Math.max(b, this.Bf)) : this.Iq
          ? b > this.Iq && (this.Iq = b, this.tw = this.Iq / this.map.F.li.wo(20))
          : (this.Iq = b, this.tw = this.Iq / this.map.F.li.wo(20));
        }
        b = a.get("strokeWeight") || 0;
        if (!this.uw || b > this.uw) this.uw = b;
      }
      this.Yna || a.W("feature", this, !0);
    },
    mv: function (a) {
      this.Rk = !0;
      for (var b = 0, c = a.length; b < c; b += 1) this.eE(a[b]);
    },
    clear: function () {
      this.Rk = !0;
      this.hq = [];
      this.Ik.clear();
      this.set("display", 0);
    },
    Rl: function (a) {
      var b, c;
      b = this.Ik.Rl([ a[0] + g.a.wa, a[1], a[2] + g.a.wa, a[3] ]);
      c = this.Ik.Rl([ a[0] - g.a.wa, a[1], a[2] - g.a.wa, a[3] ]);
      a = this.Ik.Rl(a);
      return g.extend(a, g.extend(b, c));
    },
    kta: function (a) {
      var b, c = this.get("style"), d = a.bk;
      c instanceof g.dI || (c = this.Hla(c));
      if (d && 0 < d.length) {
        b = c.OX(d, a);
      } else {
        if (c.S1.length || c.bk.length) b = c.Sfa(a);
        b || (b = a.Hha());
      }
      return b;
    },
    gN: function (a) {
      function b (a, b) {return a.Jk - b.Jk;}

      var c = [], d, e, f, h, k, l =
      {};
      for (d in a) {
        if (a.hasOwnProperty(d)) {
          f = a[d];
          h = f.get("zIndex");
          for (e in l) if (l.hasOwnProperty(e) && (k = c[l[e]][2], k === h)) break;
          "undefined" === typeof l[h] && (c.push([ [], [], h ]), l[h] = c.length - 1);
          h = c[l[h]];
          h[0].push(f);
        }
      }
      c.sort(this.Tna);
      a = 0;
      for (d = c.length; a < d; a += 1) c[a][0].sort(b);
      return c;
    },
    featureChanged: function (a) {
      this.Rk = !0;
      var b = a.target, c = b.lc();
      0 !== this.Ik.Nha([ g.a.Tb(b) ]).length && (this.Ik.remove(b, a.jt), c && !a.hga && this.Ik.add(b));
    },
    p1: function (a) {
      this.Rk = !0;
      for (var b, c = 0, d = a.length; c < d; c += 1) {
        b = a[c], b.ba.jt =
        null, b.mq(!0), b.ek("feature");
      }
    },
    Pva: function (a, b) {return a[1].zIndex === b[1].zIndex ? g.a.Tb(a[1]) - g.a.Tb(b[1]) : a[1].zIndex - b[1].zIndex;},
    Tna: function (a, b) {return a[2] - b[2];},
    Dva: function (a) {return a.qta() === g.q.Pqa.Aqa;},
    Ml: function (a) {
      return this.Sz ? new g.N.he.lk(this, a) : "c" === this.map.get("overlayRender") && g.N.canvas.lk
      ? new g.N.canvas.lk(this, a)
      : g.N.Nd.lk && "d" === this.map.get("overlayRender") ? new g.N.Nd.lk(this, a) : null;
    }
  });
  g.q.Sc.wb({
    Nl: function (a) {
      return this.Sz ? new g.Ea.he.lk(this, a) : this.X.wi
      ? new g.Ea.O4(this, a)
      : new g.Ea.lk(this, a);
    }
  });
  g.q.n4 = g.Z.extend({
    r: function () {this.clear();},
    clear: function () {
      this.Ao = [];
      this.LO = new g.sj;
    },
    add: function (a) {
      var b = g.a.Tb(a), c = a.lc();
      this.Ao[b] || (this.count += 1, this.Ao[b] = a, c && !g.H.eb(c.bd(), [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
      ]) && this.LO.hw(c.bd(), a));
    },
    fta: function () {return this.Ao;},
    Rl: function (a) {return this.LO.gna(a);},
    Nha: function (a) {
      var b = a.length, c = [], d;
      for (d = 0; d < b; d += 1) this.Ao[a[d]] && c.push(this.Ao[a[d]]);
      return c;
    },
    remove: function (a, b) {
      var c = g.a.Tb(a).toString(), d = a.lc();
      this.Ao[c] && (this.Ao[c] =
      null, d && (c = "undefined" !== typeof b ? b : d.bd(), this.LO.remove(c, a)));
    }
  });
  g.sj = g.Z.extend({
    r: function (a) {
      this.U_ = "undefined" !== typeof a ? a : 6;
      this.$F = Math.floor(this.U_ / 2);
      this.OG = { H: [ Infinity, Infinity, -Infinity, -Infinity ], yb: [] };
      this.count = 0;
    },
    afa: function (a, b) {
      var c = -1, d = [], e;
      d.push(b);
      var f = b.yb;
      do {
        -1 !== c && (d.push(f[c]), f = f[c].yb, c = -1);
        for (var h = f.length - 1; 0 <= h; h -= 1) {
          var k = f[h];
          if ("undefined" !== typeof k.Ee) {
            c = -1;
            break;
          }
          var l = g.sj.Zw(k.H[2] - k.H[0], k.H[3] - k.H[1], k.yb.length + 1),
          k = g.sj.Zw((k.H[2] > a.H[2] ? k.H[2] : a.H[2]) - (k.H[0] < a.H[0] ? k.H[0] : a.H[0]), (k.H[3] > a.H[3]
          ? k.H[3]
          : a.H[3]) -
          (k.H[1] < a.H[1] ? k.H[1] : a.H[1]), k.yb.length + 2);
          if (0 > c || Math.abs(k - l) < e) e = Math.abs(k - l), c = h;
        }
      } while (-1 !== c);
      return d;
    },
    hw: function (a, b, c) {
      a = { H: a, Ee: b };
      "undefined" !== typeof c && (a.type = c);
      this.$Z(a, this.OG);
      this.count += 1;
    },
    $Z: function (a, b) {
      var c;
      if (0 === b.yb.length) {
        b.H = g.H.jb(a.H), b.yb.push(a);
      } else {
        var d = this.afa(a, b), e = a;
        do {
          if (c && "undefined" !== typeof c.yb && 0 === c.yb.length) {
            var f = c;
            c = d.pop();
            for (var h = 0, k = c.yb.length; h < k; h +=
            1) {
              if (c.yb[h] === f || 0 === c.yb[h].yb.length) {
                c.yb.splice(h, 1);
                break;
              }
            }
          } else {
            c = d.pop();
          }
          f =
          e instanceof Array;
          if ("undefined" !== typeof e.Ee || "undefined" !== typeof e.yb || f) {
            if (f) {
              f = 0;
              for (h = e.length; f < h; f += 1) g.H.extend(c.H, e[f].H);
              c.yb = c.yb.concat(e);
            } else {
              g.H.extend(c.H, e.H), c.yb.push(e);
            }
            if (c.yb.length <= this.U_) {
              if (0 < d.length) e = { H: g.H.jb(c.H) }; else break;
            } else {
              e =
              f = this.Hja(c.yb), 1 > d.length && (c.yb.push(f[0]), d.push(c), e = f[1]);
            }
          } else {
            g.H.extend(c.H, e.H), e = { H: g.H.jb(c.H) };
          }
        } while (0 < d.length);
      }
    },
    Hja: function (a) {
      for (var b = this.Kla(a); 0 < a.length;) this.Lla(a, b[0], b[1]);
      return b;
    },
    Kla: function (a) {
      for (var b =
      a.length - 1, c = 0, d = a.length - 1, e = 0, f = a.length - 2; 0 <= f; f -= 1) {
        var h = a[f];
        h.H[0] > a[c].H[0] ? c = f : h.H[2] < a[b].H[1] && (b = f);
        h.H[1] > a[e].H[1] ? e = f : h.H[3] < a[d].H[3] && (d = f);
      }
      Math.abs(a[b].H[2] - a[c].H[0]) > Math.abs(a[d].H[3] - a[e].H[1]) ? b > c ? (b = a.splice(b, 1)[0], c =
      a.splice(c, 1)[0]) : (c = a.splice(c, 1)[0], b = a.splice(b, 1)[0]) : d > e ? (b = a.splice(d, 1)[0], c =
      a.splice(e, 1)[0]) : (c = a.splice(e, 1)[0], b = a.splice(d, 1)[0]);
      return [ { H: g.H.jb(b.H), yb: [ b ] }, { H: g.H.jb(c.H), yb: [ c ] } ];
    },
    Lla: function (a, b, c) {
      for (var d = g.sj.Zw(b.H[2] - b.H[0], b.H[3] - b.H[1],
      b.yb.length + 1), e = g.sj.Zw(c.H[2] - c.H[0], c.H[3] - c.H[1], c.yb.length + 1), f, h, k, l = a.length - 1; 0 <= l; l -=
           1) {
        var m = a[l],
        n = [
          b.H[0] < m.H[0] ? b.H[0] : m.H[0],
          b.H[2] > m.H[2] ? b.H[2] : m.H[2],
          b.H[1] < m.H[1] ? b.H[1] : m.H[1],
          b.H[3] > m.H[3] ? b.H[3] : m.H[3]
        ],
        n = Math.abs(g.sj.Zw(n[1] - n[0], n[3] - n[2], b.yb.length + 2) - d),
        m = [
          c.H[0] < m.H[0] ? c.H[0] : m.H[0],
          c.H[2] > m.H[2] ? c.H[2] : m.H[2],
          c.H[1] < m.H[1] ? c.H[1] : m.H[1],
          c.H[3] > m.H[3] ? c.H[3] : m.H[3]
        ],
        m = Math.abs(g.sj.Zw(m[1] - m[0], m[3] - m[2], c.yb.length + 2) - e),
        p = Math.abs(m - n);
        if (!h || !f || p < f) {
          h = l, f = p, k = m < n ? c :
          b;
        }
      }
      d = a.splice(h, 1)[0];
      b.yb.length + a.length + 1 <= this.$F
      ? (b.yb.push(d), g.H.extend(b.H, d.H))
      : c.yb.length + a.length + 1 <= this.$F
      ? (c.yb.push(d), g.H.extend(c.H, d.H))
      : (k.yb.push(d), g.H.extend(k.H, d.H));
    },
    remove: function (a, b) {
      var c = [];
      c[0] = { H: a };
      (c[1] = b) || (c[1] = !1);
      c[2] = this.OG;
      this.count -= 1;
      if (!1 === c[1]) {
        var d = 0, e = [];
        do d = e.length, e = e.concat(this.u1.apply(this, c)); while (d !== e.length);
        return e;
      }
      return this.u1.apply(this, c);
    },
    u1: function (a, b, c) {
      var d = [], e = [], f = [];
      if (!a || !g.H.Pf(a.H, c.H)) return f;
      a = g.H.jb(a.H);
      var h;
      e.push(c.yb.length);
      d.push(c);
      do {
        c = d.pop();
        var k = e.pop() - 1;
        if ("undefined" !== typeof b) {
          for (; 0 <= k;) {
            var l = c.yb[k];
            if (g.H.Pf(a, l.H)) {
              if (b && "undefined" !== typeof l.Ee && l.Ee === b || !b && ("undefined" !== typeof l.Ee || g.H.IX(a, l.H))) {
                "undefined" !== typeof l.yb
                ? (f = this.Sw(l, !0, [], l), c.yb.splice(k, 1))
                : f = c.yb.splice(k, 1);
                g.sj.TO(c);
                b = void 0;
                c.yb.length < this.$F && (h = this.Sw(c, !0, [], c));
                break;
              } else {
                "undefined" !== typeof l.yb && (e.push(k), d.push(c), c = l, k = l.yb.length);
              }
            }
            k -= 1;
          }
        } else if ("undefined" !== typeof h) {
          c.yb.splice(k + 1, 1);
          0 < c.yb.length && g.sj.TO(c);
          k = 0;
          for (l = h.length; k < l; k += 1) this.$Z(h[k], c);
          h.length = 0;
          0 === d.length && 1 >= c.yb.length
          ? (h = this.Sw(c, !0, h, c), c.yb.length = 0, d.push(c), e.push(1))
          : 0 < d.length && c.yb.length < this.$F ? (h = this.Sw(c, !0, h, c), c.yb.length = 0) : h = void 0;
        } else {
          g.sj.TO(c);
        }
      } while (0 < d.length);
      return f;
    },
    search: function (a, b) {return this.Sw({ H: a }, !1, [], this.OG, b);},
    gna: function (a, b) {return this.Sw({ H: a }, !1, [], this.OG, b, !0);},
    Sw: function (a, b, c, d, e, f) {
      var h = {}, k = [];
      if (!g.H.Pf(a.H, d.H)) return f ? h : c;
      k.push(d.yb);
      do {
        d = k.pop();
        for (var l = d.length - 1; 0 <= l; l -= 1) {
          var m = d[l];
          if (g.H.Pf(a.H, m.H)) {
            if ("undefined" !== typeof m.yb) {
              k.push(m.yb);
            } else if ("undefined" !== typeof m.Ee) {
              if (b) {
                c.push(m);
              } else if ("undefined" === typeof e || m.type === e) {
                m =
                m.Ee, "undefined" !== typeof f ? h[g.a.Tb(m)] = m : c.push(m);
              }
            }
          }
        }
      } while (0 < k.length);
      return "undefined" !== typeof f ? h : c;
    }
  });
  g.sj.TO = function (a) {
    var b = a.yb.length, c = a.H;
    if (0 === b) {
      g.H.empty(c);
    } else {
      var d = a.yb[0].H;
      c[0] = d[0];
      c[2] = d[2];
      c[1] = d[1];
      c[3] = d[3];
      for (d = 1; d < b; d += 1) g.H.extend(c, a.yb[d].H);
    }
  };
  g.sj.Zw = function (a, b, c) {
    var d = (a + b) / 2;
    a *= b;
    return a * c / (a / (d * d));
  };
  g.A = g.A || {};
  g.A.qh = g.Z.extend({
    ga: [ g.na, g.Ie ],
    tla: [ "position", "altitude", "visible", "clickable", "bubble" ],
    r: function (a, b) {
      this.map = b;
      this.ze(this.tla, a);
      this.W("zIndex", a);
      this.W("draggable", a);
      g.l.hf && this.p6();
      g.l.Y || this.xI();
      this.Wb = a;
      this.Wb.A = this;
    },
    draggableChanged: function () {this.get("draggable") ? this.wI() : this.gK();},
    ja: function (a, b) {
      var c;
      c = b ? { type: a, pixel: b.tb, target: this.Wb, lnglat: b.Sf } : { type: a };
      this.Wb && this.Wb.o(a, c);
    },
    rc: function (a) {
      ("click" !== a.type && "rightclick" !== a.type && "dblclick" !== a.type && "longclick" !==
      a.type || this.get("clickable")) && this.ja(a.type, a);
    },
    vI: function () {
      this.h("click", this.rc);
      this.h("rightclick", this.rc);
      this.h("longclick", this.rc);
      this.h("longpress", this.rc);
      this.h("dblclick", this.rc);
    },
    uW: function () {
      this.I("click", this.rc);
      this.I("rightclick", this.rc);
      this.I("longclick", this.rc);
      this.I("longpress", this.rc);
      this.I("dblclick", this.rc);
    },
    xI: function () {
      this.get("clickable") && this.vI();
      this.h("mousemove", this.rc);
      this.h("mouseout", this.rc);
      this.h("mouseover", this.rc);
      this.h("mousedown",
      this.rc);
      this.h("mouseup", this.rc);
    },
    Bra: function () {
      this.uW();
      this.I("mousemove", this.rc);
      this.I("mouseout", this.rc);
      this.I("mouseover", this.rc);
      this.I("mousedown", this.rc);
      this.I("mouseup", this.rc);
    },
    clickableChanged: function () {this.get("clickable") ? this.vI() : this.uW();},
    p6: function () {
      this.get("clickable") && this.vI();
      this.h("touchstart", this.rc, this);
      this.h("touchmove", this.rc, this);
      this.h("touchend", this.rc, this);
    },
    wI: function () {
      this.h("dragstart", this.Rr);
      this.h("dragging", this.Pr);
      this.h("dragend",
      this.Qr);
    },
    Rr: function (a) {
      this.map.XN(a);
      this.yf = a.tb;
      this.z_ = a.Qa;
      this.y_ = a.Sf;
      this.ja("dragstart", a);
    },
    Pr: function (a) {
      var b = this.map.F.view.type;
      if ("2D" == b) {
        var c = a.tb.Wa(this.yf), b = c.x, c = c.y;
        this.yf = a.tb;
        var d = this.map.get("rotation") * Math.PI / 180,
        e = b * Math.cos(d) + Math.sin(d) * c,
        b = -Math.sin(d) * b + Math.cos(d) * c;
        this.Kq(new g.G(e, b));
        this.ja("dragging", a);
      } else {
        "3D" == b && a.Qa && (c = a.tb.Wa(this.yf), b = c.x, c = c.y, e =
        a.Qa.Wa(this.z_), a.Sf.Wa(this.y_), this.yf = a.tb, "function" === typeof this.HA && this.HA(b, c, e), this.z_ =
        a.Qa, this.y_ = a.Sf, this.ja("dragging", a));
      }
    },
    Qr: function (a) {
      this.map.Pt();
      this.ja("dragend", a);
    },
    gK: function () {
      this.I("dragstart", this.Rr);
      this.I("dragging", this.Pr);
      this.I("dragend", this.Qr);
    },
    jJ: function (a) {
      var b, c, d = [];
      if (a) for (b = 0, c = a.length; b < c; b += 1) d.push(this.kJ(a[b]));
      return d;
    },
    kJ: function (a) {
      a = this.map.Pb(a);
      return [ a.x, a.y ];
    },
    Af: function (a) {
      var b = this.L.fb || this.map.get("centerCoords"), c = Math.pow(2, 20 - this.map.get("zoom"));
      return [ (a[0] - b.x) / c, (a[1] - b.y) / c ];
    },
    pJ: function (a, b) {
      for (var c = this.map.F,
           d = [], e = 0, f = a.length; e < f; e++) {
        var h = c.Pb(a[e]);
        h.x += b[0];
        h.y += b[1];
        d.push(c.we(h));
      }
      return d;
    }
  });
  g.A.lb = g.A.qh.extend({
    VA: "content contentDom icon opacity angle autoRotation offset textAlign verticalAlign shadow title label isTop shape topWhenClick topWhenMouseOver noSelect".split(" "),
    cea: { AMAP_ANIMATION_NONE: !1, AMAP_ANIMATION_DROP: g.Fi.Easing.Bounce, AMAP_ANIMATION_BOUNCE: g.Fi.Easing.Cubic },
    r: function (a, b) {
      arguments.callee.oa.apply(this, arguments);
      this.ze(this.VA, a);
      this.W("move", a);
      this.Hea();
      this.ns();
      this.set("AnimationOffset", new g.G(0, 0), !0);
      this.W("raiseOnDrag", a);
      this.W("animation", a);
    },
    AJ: function (a, b, c) {
      if (this.get("animation") && "AMAP_ANIMATION_NONE" !== this.get("animation")) {
        var d = this;
        this.am = new g.Fi;
        this.am.transition = function (c, f, h) {
          if ("AMAP_ANIMATION_NONE" === d.get("animation")) return 0;
          if (a && 600 <= h) return d.am.stop(), 0;
          c = 0 === Math.floor(h / 600) % 2 ? "Out" : "In";
          "out" === b ? c = "Out" : "in" === b && (c = "In");
          return d.cea[d.get("animation")][c](h % 600 / 600);
        };
        c = c || 40;
        this.am.Lo = function (a) {d.set("AnimationOffset", d.iK.add(new g.G(0, -1 * c * a)));};
        this.iK = new g.G(0, 0);
        this.am.jm();
      }
    },
    AnimationOffsetChanged: function () {this.positionChanged();},
    AV: function () {
      this.am && (this.am.stop(), this.set("AnimationOffset", this.iK));
      this.set("AnimationOffset", new g.G(0, -40));
      if (this.yn) {
        this.yn.set("position", this.get("position"));
      } else {
        var a = new z.A.lb({
          zIndex: this.get("zIndex") - 1,
          icon: new z.A.ph({ image: g.w.Db + "/theme/v1.3/dragCross.png", size: new g.gd(14, 11), innerOverlay: !0 }),
          offset: new g.G(-4, -5),
          position: this.get("position"),
          innerOverlay: !0
        });
        a.qa = !0;
        this.yn = a;
      }
      this.yn.B = !0;
      this.yn.setMap(this.map.F);
      this.yn.B = !1;
    },
    xS: function () {
      this.set("animation", "AMAP_ANIMATION_DROP",
      !0);
      this.AJ(!0, "in");
      this.yn.B = !0;
      this.yn.setMap(null);
      this.yn.B = !1;
    },
    animationChanged: function () {
      this.am && (this.am.stop(), this.set("AnimationOffset", this.iK), this.am = null);
      var a = this.get("animation");
      a && "AMAP_ANIMATION_NONE" !== a && ("AMAP_ANIMATION_DROP" === a ? this.AJ(!0, "in", 100) : this.AJ());
    },
    sg: function () {this.yn && this.yn.set("position", this.get("position"));},
    raiseOnDragChanged: function () {
      this.get("raiseOnDrag")
      ? (this.h("dragstart", this.AV, this), this.h("dragging", this.sg, this), this.h("dragend", this.xS,
      this))
      : (this.I("dragstart", this.AV, this), this.I("dragging", this.sg, this), this.I("dragend", this.xS, this));
    },
    Kq: function (a) {
      var b = this.get("position");
      a = this.map.Pb(b).add(a.Fd(Math.pow(2, 20 - this.map.get("zoom"))));
      b instanceof g.U ? this.set("position", this.map.we(a)) : this.set("position", a);
    },
    HA: function (a, b) {
      var c = this.get("position"),
      d = this.get("altitude"),
      c = this.map.Eq(c, d),
      d = this.map.fo(new g.G(c.x + a, c.y + b), null, d);
      this.set("position", d);
    },
    Hea: function () {
      var a = this.get("content"), b = this.get("shadow"),
      c = this.get("offset"), d = this.get("label"), a = a ? this.hX(a, c) : this.zL(this.get("icon"), c);
      this.set("contentDom", a, !0);
      b && (b = this.mX(b, c), this.set("shadowDom", b, !0));
      d && d.content && this.set("labelDom", this.AL(d.content), !0);
    },
    AL: function (a) {
      var b = document.createElement("div");
      b.className = "amap-marker-label";
      b.innerHTML = a;
      return b;
    },
    ns: function () {
      var a = this.get("position");
      if (this.map && a && !this.L) {
        var b = this.map,
        a = this.map.Pb(a),
        a = this.L = new g.nh({ name: "marker-" + g.a.Tb(this), map: b, ba: new g.va.Yf([ a.x, a.y ]) });
        a.tz = this.Wb.CLASS_NAME;
        a.Jp = this;
        this.W("coords", a, !0);
        a.ze("offset textAlign verticalAlign isTop zIndex params noSelect".split(" "), this);
      }
    },
    getParams: function () {
      return {
        zIndex: this.get("zIndex"),
        qv: this.get("angle"),
        Ag: this.get("contentDom"),
        x_: this.get("labelDom"),
        m2: this.get("shadowDom"),
        opacity: this.get("opacity"),
        altitude: this.get("altitude"),
        title: this.get("title"),
        label: this.get("label"),
        vQ: this.get("AnimationOffset"),
        verticalAlign: this.get("verticalAlign"),
        textAlign: this.get("textAlign"),
        offset: this.get("offset"),
        s_: this.get("isTop"),
        shape: this.get("shape"),
        visible: this.get("visible") && !this.Wb.get("outOfZooms")
      };
    },
    offsetChanged: function () {
      function a (a) {
        var c = b.get("offset"),
        f = b.get("AnimationOffset"),
        h = b.get("verticalAlign"),
        k = b.get("textAlign"),
        l = Math.round(a.x) + c.x + f.x;
        a = Math.round(a.y) + c.y + f.y;
        f = g.g.Sv(b.L.Ag);
        c = f[0];
        f = f[1];
        switch (k) {
          case "center":
            l -= c / 2;
            break;
          case "right":
            l -= c;
        }
        switch (h) {
          case "middle":
            a -= f / 2;
            break;
          case "bottom":
            a -= f;
        }
        b.L.ca.style.left = l + "px";
        b.L.ca.style.top = a +
        "px";
      }

      if (this.L && this.L.ca) {
        var b = this, c = this.map.F.view.type;
        "2D" == c ? (c = this.map.Pb(this.get("position")), c =
        c.Wa(this.L.za)
        .Uc(Math.pow(2, 20 - this.map.get("zoom"))), this.L.ca && (this.L.ca.Sy && this.L.ca.parentNode !== this.L.ca.Sy
        ? this.map.set("display")
        : a(c))) : "3D" == c && (c = this.get("position"), c =
        this.map.Eq(c, this.get("altitude")), this.L.ca && (this.L.ca.Sy && this.L.ca.parentNode !== this.L.ca.Sy
        ? this.map.set("display")
        : a(c)));
      } else {
        this.map.set("display");
      }
    },
    altitudeChanged: function () {this.offsetChanged();},
    positionChanged: function () {
      if (this.L) {
        var a =
        this.map.Pb(this.get("position"));
        this.set("coords", [ a.x, a.y ]);
        this.map && (this.L.X4 = !0, this.offsetChanged());
      }
    },
    textAlignChanged: function () {this.DR();},
    verticalAlignChanged: function () {this.DR();},
    DR: function () {this.L && (this.L.uf = !0, this.map && (this.map.wd.Tl = !0, this.map.set("display")));},
    contentChanged: function () {
      if (this.L) {
        this.map.wd.Tl = !0;
        -1 === g.a.indexOf(this.map.wd.jg, this.L) && this.map.wd.jg.push(this.L);
        var a = this.get("contentDom");
        this.L.ca && this.L.ca === a.parentNode && this.L.ca.removeChild(a);
        var a =
        this.get("content"), b = this.get("offset"), a = this.hX(a, b);
        this.set("contentDom", a);
        this.L.ca && (g.l.Gh && g.a.iepngFix(a), this.L.ca.appendChild(a), this.L.Ag = a);
        this.map && this.map.set("display");
      }
    },
    iconChanged: function () {
      if (this.L && this.L.ca && !this.get("content")) {
        this.map.wd.Tl = !0;
        -1 === g.a.indexOf(this.map.wd.jg, this.L) && this.map.wd.jg.push(this.L);
        this.L.ca && this.get("contentDom") && this.L.ca.removeChild(this.get("contentDom"));
        var a = this.get("icon"), b = this.get("offset"), a = this.zL(a, b);
        this.set("contentDom",
        a);
        this.L.ca
        ? (g.l.Gh && g.a.iepngFix(a), this.L.ca.appendChild(a), this.L.Ag = a)
        : this.map && this.map.set("display");
      }
    },
    shadowChanged: function () {
      if (this.L && this.L.ca) {
        var a = this.get("shadowDom");
        this.L.ca && a && a.parentNode === this.L.ca && this.L.ca.removeChild(a);
        if (a = this.get("shadow")) {
          var b = this.get("offset"), a = this.mX(a, b);
          this.set("shadowDom", a);
          this.L.ca && this.L.ca.appendChild(a);
        }
      }
    },
    titleChanged: function () {
      this.L && this.L.Ag && "string" === typeof this.get("title") && this.L.Ag && this.get("title") && (this.L.Ag.title =
      this.get("title"));
    },
    labelChanged: function (a) {
      a = a || this.get("label");
      if (this.L && this.L.ca) {
        var b = this.L.ca, c = this.get("labelDom");
        c && c.parentNode === b && b.removeChild(c);
        if (a && a.content) {
          c = "";
          if (a.content) {
            var c = this.AL(a.content), d = 0, e = 0;
            a.offset && (d = a.offset.y + "px", e = a.offset.x + "px");
            c.style.top = d;
            c.style.left = e;
            b.appendChild(c);
          }
          this.set("labelDom", c);
        }
      } else {
        a && a.content ? this.set("labelDom", this.AL(a.content), !0) : this.set("labelDom", null);
      }
    },
    isTopChanged: function () {
      var a = this.map.wd.jH, b = this.get("isTop"),
      c = this.get("zIndex");
      a ? a === this ? this.L && this.L.ca && (this.L.ca.style.zIndex = b ? this.map.wd.dp + 10 : c, this.map.wd.jH =
      b ? this : null) : (a.L && a.L.ca && (a.L.ca.style.zIndex =
      b ? a.get("zIndex") : this.map.wd.dp + 10), this.L && this.L.ca && (this.L.ca.style.zIndex =
      b ? this.map.wd.dp + 10 : c), this.map.wd.jH = b ? this : a) : (this.map.wd.jH =
      this, this.L && this.L.ca && (this.L.ca.style.zIndex = b ? this.map.wd.dp + 10 : c));
    },
    visibleChanged: function () {
      this.L && this.L.ca && (this.get("visible") && !this.Wb.get("outOfZooms") ? this.L.ca.style.display = "block" :
      this.L.ca.style.display = "none");
    },
    mla: function () {this.visibleChanged();},
    angleChanged: function () {
      if (!g.l.ee && this.L && this.L.ca) {
        var a = this.L,
        b = a.get("params"),
        c = b.textAlign,
        d = b.verticalAlign,
        e = b.offset,
        b = e.x,
        e = e.y;
        if ("AMap.Text" == a.tz) {
          var e = b = 0, f = g.g.Sv(a.Ag), a = f[0], f = f[1];
          switch (c) {
            case "center":
              b = a / 2;
              break;
            case "right":
              b = a;
          }
          switch (d) {
            case "middle":
              e = f / 2;
              break;
            case "bottom":
              e = f;
          }
        } else {
          b = -b, e = -e;
        }
        g.g.rotate(this.L.ca, this.get("angle") || 0, { x: b, y: e });
      }
    },
    zIndexChanged: function () {
      var a = this.get("zIndex");
      if (a > this.map.wd.dp) {
        this.map.wd.dp = a;
        var b = this.map.wd.jH;
        b && b.L && b.L.ca && (b.L.ca.style.zIndex = a + 10);
      }
      this.L && this.L.ca && (this.L.ca.style.zIndex = this.get("isTop") ? this.map.wd.dp + 10 : this.get("zIndex"));
    },
    opacityChanged: function () {
      var a = this.get("contentDom"), b = this.get("shadowDom");
      a && g.g.Xo(a, this.get("opacity"));
      b && g.g.Xo(b, this.get("opacity"));
    },
    hX: function (a) {
      var b;
      b = document.createElement("div");
      b.className = "amap-marker-content";
      "string" !== typeof a ? b.appendChild(a) : (b.innerHTML = a, b.childNodes[0] &&
      !b.childNodes[0].style && (b.style["white-space"] = "pre"));
      g.g.Xo(b, this.get("opacity"));
      return b;
    },
    zL: function (a) {
      var b, c = 0, d = 0, e, f, h, k;
      a ? ("string" === typeof a ? (b = a, k = !0) : (b = a.get("image"), d = a.get("size"), e = a.get("imageSize"), c =
      d.width, d = d.height, e && (f = e.width, h = e.height)), c || (c = 0), d || (d = 0), a =
      "string" !== typeof a ? a.get("imageOffset") : { x: 0, y: 0 }) : (b = g.w.Jh + "/mark_bs.png", a =
      { x: 0, y: 0 }, c = 19, d = 33, f = 19, h = 33);
      e = document.createElement("div");
      e.className = "amap-icon";
      e.style.position = "absolute";
      k && !g.l.ee && (e.style.overflow =
      "inherit");
      c && (e.style.width = c + "px");
      d && (e.style.height = d + "px");
      c = document.createElement("img");
      c.src = b;
      f && h && (c.style.width = f + "px", c.style.height = h + "px");
      c.style.top = a.y + "px";
      c.style.left = a.x + "px";
      g.l.ee && k || e.appendChild(c);
      g.g.Xo(g.l.ee && k ? c : e, this.get("opacity"));
      return g.l.ee && k ? c : e;
    },
    mX: function (a, b) {
      var c = this.zL(a, b);
      c.style.zIndex = -1;
      return c;
    },
    moveChanged: function () {
      var a = this.get("move");
      if (!1 === a) return this.doa();
      void 0 !== a && ("pause" === a.action ? this.Jla() : "[object Array]" === Object.prototype.toString.call(a.Sf) ?
      a.Sf && ("resume" === a.action && this.hD
      ? this.moveTo(a.Sf[a.Sf.Qn || 0], a.speed, a.rb)
      : (this.hD && this.o("movestop"), a.Sf.Qn =
      0, this.set("position", a.Sf[0]), this.uka(a.Sf, a.speed, a.rb, a.dfa))) : this.moveTo(a.Sf, a.speed, a.rb, !0));
    },
    moveTo: function (a, b, c, d) {
      if (!(0 >= b)) {
        var e = this.get("position");
        a.Wa(e);
        var f = Math.round(a.be(e) / 1E3 / b * 36E5);
        if (0 === f) return this.o("moveend");
        this.Kh && (this.Kh.stop(), this.Kh = null);
        this.Kh = new g.Fi(e, a);
        c = c || function (a) {return a;};
        this.Kh.transition = function (a, b, d) {
          if (d >= f) return b;
          var e = (b.R - a.R) * c(d / f) + a.R;
          a = (b.P - a.P) * c(d / f) + a.P;
          return new g.U(e, a);
        };
        this.Kh.Lo = function (b) {
          this.set("position", b);
          d && this.Wb.o("moving", { passedPath: [ this.Kh.start, this.get("position") ] });
          this.o("moving");
          b.eb(a) && (this.Kh && (this.Kh.stop(), this.Kh = null), this.Wb.o("moveend"), this.o("moveend"));
        };
        this.get("autoRotation") && !g.l.ee && (b =
        "2D" == (this.map.F.view.type || "2D") ? this.p8(e, a) : this.q8(e, a), this.set("angle", b));
        this.Kh.jm(this);
      }
    },
    doa: function () {this.Kh && (this.Kh.stop(), this.Kh = null, this.o("movestop"));},
    Jla: function () {this.Kh && (this.Kh.stop(), this.Kh = null, this.o("movepause"));},
    uka: function (a, b, c, d) {
      function e () {
        var b = a.slice(0, a.Qn || 0);
        b.push(this.get("position"));
        this.Wb.o("moving", { passedPath: b });
      }

      function f () {
        a.Qn < a.length - 1 ? (a.Qn += 1, this.moveTo(a[a.Qn], b, c)) : (this.ja("movealong"), d ? (a.Qn =
        0, this.set("position", a[0]), this.moveTo(a[a.Qn], b, c)) : this.o("movestop"));
      }

      var h = Math.min(a.Qn || 0, a.length - 1);
      this.hD || (this.hD =
      !0, this.h("moving", e, this), this.h("moveend", f, this), this.h("movestop", function l () {
        this.hD =
        !1;
        this.I("moveend", f, this);
        this.I("moving", e, this);
        this.I("movestop", l, this);
      }, this));
      this.moveTo(a[h], b, c);
    },
    q8: function (a, b) {
      var c = this.map, d = c.Eq(a), c = c.Eq(b), e = 0;
      c.be(d);
      var f = c.y - d.y, h = c.x - d.x;
      0 !== c.x - d.x ? (e = Math.atan((c.y - d.y) / (c.x - d.x)), 0 <= f && 0 > h ? e = Math.PI + e : 0 > f && 0 >= h
      ? e = Math.PI + e
      : 0 > f && 0 <= h && (e = 2 * Math.PI + e)) : e = c.y > d.y ? Math.PI / 2 : 3 * Math.PI / 2;
      return g.a.jd(180 * e / Math.PI, 1);
    },
    p8: function (a, b) {
      var c = this.map, d = c.Pb(a), c = c.Pb(b), e = 0;
      c.be(d);
      var f = c.y - d.y, h = c.x - d.x;
      0 !== c.x - d.x ? (e = Math.atan((c.y - d.y) /
      (c.x - d.x)), 0 <= f && 0 > h ? e = Math.PI + e : 0 > f && 0 >= h ? e = Math.PI + e : 0 > f && 0 <= h && (e =
      2 * Math.PI + e)) : e = c.y > d.y ? Math.PI / 2 : 3 * Math.PI / 2;
      return g.a.jd(180 * e / Math.PI, 1);
    }
  });
  g.A.pm = g.A.qh.extend({
    r: function (a, b) {
      arguments.callee.oa.apply(this, arguments);
      this.W("items", a, !0);
      this.W("content", a, !0);
      this.W("resolution", b);
      this.W("centerCoords", b);
      this.Yn = a;
    },
    xw: function (a) {
      this.eg();
      this.ir();
      this.jl();
      this.ek("resolution");
      this.ek("centerCoords");
      this.ek("render");
      this.W("resolution", a);
      this.W("centerCoords", a);
      this.W("render", a);
      this.map.h("movestart", this.zl, this);
      this.map.h("mapmove", this.zl, this);
      this.map.h("zoomstart", this.zl, this);
      this.map.h("click", this.zl, this);
      this.map.h("closeOverlays", this.zl, this);
      this.map.h("rotate", this.zl, this);
    },
    zl: function () {this.Yn.map && (this.Yn.B = !0, this.Yn.close(), this.Yn.B = !1);},
    mapChanged: function () {},
    positionChanged: function () {this.jl();},
    renderChanged: function () {this.jl();},
    eg: function () {
      this.J && (this.J.parentNode && this.J.parentNode.removeChild(this.J), this.J = null);
      var a = g.g.create("div", null, "amap-menu");
      g.D.h(a, "mousedown", function (a) {g.D.stopPropagation(a);}, this);
      this.J = a;
      this.map.Oa.A.appendChild(this.J);
    },
    ir: function () {
      var a =
      this, b = this.J;
      b.innerHTML = "";
      var c = this.get("content");
      if ("object" === typeof c) {
        b.appendChild(c);
      } else if ("string" === typeof c) {
        b.innerHTML = c;
      } else if ((c =
      this.get("items")) && c.length) {
        var d = g.g.create("ul", b, "amap-menu-outer");
        c.sort(function (a, b) {return isNaN(a.mG) || isNaN(b.mG) ? 0 : a.mG - b.mG;});
        for (b = 0; b < c.length; b += 1) {
          (function (b) {
            var c = b.k3, h = b.rb, k = g.g.create("li", d);
            k.innerHTML = c;
            g.D.h(k, "click", function () {
              h.call(k);
              a.Yn.B = !0;
              a.Yn.close();
              a.Yn.B = !1;
            }, k);
          })(c[b]);
        }
      } else {
        this.J.innerHTML = "";
      }
    },
    jl: function () {
      var a =
      this.map, b = this.J;
      a && b && (this.map.get("zoom"), b = this.get("position"), b = a.Eq(b), a = b.y, b = b.x, this.J.style.right =
      "", this.J.style.bottom = "", this.J.style.left = b + "px", this.J.style.top = a + "px");
    },
    Uf: function () {
      this.J && (this.map.I("click", this.Zqa, this), this.map.Oa.A.removeChild(this.J), this.Yn.gi =
      !1, this.J =
      this.Yn.Le.map =
      null, this.map.I("movestart", this.zl, this), this.map.I("zoomstart", this.zl, this), this.map.I("click", this.zl, this), this.map.I("closeOverlays", this.zl, this), this.map.I("rotate", this.zl, this));
    },
    visibleChanged: function () {
      this.J && (this.get("visible")
      ? this.J.style.display = "block"
      : this.J.style.display = "none");
    },
    itemsChanged: function () {this.J && this.ir();}
  });
  g.A.ye = g.A.qh.extend({
    r: function (a, b) {
      arguments.callee.oa.apply(this, arguments);
      this.ze("content contentDom position contentU altitude isCustom autoMove showShadow closeWhenClickMap size offset".split(" "), a);
      this.W("retainWhenClose", a, !0);
      a.W("toBeClose", this);
      this.Oe = a;
    },
    xw: function (a) {
      this.Ifa || (this.eg(), this.ir());
      this.ek("resolution");
      this.ek("centerCoords");
      this.ek("render");
      this.W("resolution", a);
      this.W("centerCoords", a);
      this.W("render", a);
      this.map = a;
      a.Oa.A.appendChild(this.oc);
      this.gQ();
      this.jl();
      this.CR();
      this.Ifa = !0;
      this.tfa();
      this.Wb.o("onAdd", { type: "onAdd", target: this.Wb });
    },
    eg: function () {
      var a = g.g.create("div");
      a.className = "amap-info";
      var b = g.g.create("div", a, "amap-info-shadowContainer"),
      c = g.g.create("div", a),
      d = g.g.create("div", c, "amap-info-contentContainer");
      a.style.position = "absolute";
      c.style.position = "absolute";
      c.style.bottom = "0px";
      c.style.left = "0px";
      b.style.position = "absolute";
      this.oc = a;
      this.xf = c;
      this.vP = b;
      this.Ch = d;
      this.set("contentDom", this.Ch, !0);
    },
    ir: function () {
      var a = this.get("contentU");
      if (a) {
        var b = this.get("isCustom"), c = this.Ch, d = this.vP;
        c.innerHTML = "";
        var e = null;
        if (b) {
          if ("string" === typeof a) {
            c.innerHTML = a;
          } else if (a instanceof Array) {
            for (e = 0; e < a.length; e +=
            1) {
              c.appendChild(a[e]);
            }
          } else {
            c.appendChild(a);
          }
          e = c;
          d.parentNode && d.parentNode.removeChild(d);
        } else {
          e = d = g.g.create("div", c, "amap-info-content amap-info-outer");
          "string" === typeof a ? d.innerHTML = a : d.appendChild(a);
          this.Kfa = d;
          a = g.g.create("a", this.Ch, "amap-info-close");
          a.innerHTML = "\u00d7";
          this.LL = a;
          a.href = "javascript: void(0)";
          g.l.hf && (g.D.h(a,
          "touchstart", function (a) {g.D.stop(a);}, this), g.D.h(a, "touchend", function (a) {
            g.D.stop(a);
            this.Oe.B = !0;
            this.Oe.close();
            this.Oe.B = !1;
          }, this), g.D.h(a, "click", function (a) {
            g.D.stop(a);
            this.Oe.B = !0;
            this.Oe.close();
            this.Oe.B = !1;
          }, this));
          g.l.Y || (g.D.h(a, "mousedown", function (a) {g.D.stop(a);}, this), g.D.h(a, "click", function (a) {
            g.D.stop(a);
            this.Oe.B = !0;
            this.Oe.close();
            this.Oe.B = !1;
          }, this));
          if (a = this.get("size", !0)) {
            0 !== a.width && (d.style.width =
            a.width + "px"), 0 !== a.height && (d.style.height = a.height + "px");
          }
          a = g.g.create("div",
          c, "amap-info-sharp");
          a.style.height = "23px";
          if (g.l.Gh || g.l.xq) a.style.marginLeft = c.childNodes[0].offsetWidth / 2 - 5;
          this.vP.style.display = "block";
        }
        g.D.boa(e);
      }
    },
    gQ: function () {
      var a = this.get("isCustom"), b = this.get("showShadow");
      if (!a && b) {
        var a = this.vP, b = g.g.tF(this.Ch), c = b.height - 23, d = b.width;
        if (g.l.Gh || g.l.xq) c = this.Ch.childNodes[0].offsetHeight, d = this.Ch.childNodes[0].offsetWidth + 26;
        b = "background-image:url(" + g.w.Db + (g.l.Gh ? "/theme/v1.3/iws.gif);" : "/theme/v1.3/iws.png);");
        a.innerHTML = "";
        var e = [], f;
        f = e[1] =
        {};
        f.height = 0.5 * c + 4;
        f.width = d;
        f.offsetX = 400;
        f.offsetY = 16;
        f.top = -f.height - 10 - 15;
        f.left = 23;
        f = e[2] = {};
        f.height = e[1].height;
        f.width = e[1].height;
        f.offsetX = 1075 - f.width;
        f.offsetY = e[1].offsetY;
        f.top = e[1].top;
        f.left = 23 + e[1].width;
        f = e[3] = {};
        f.height = 10;
        f.width = 22;
        f.offsetX = 30;
        f.offsetY = 445;
        f.top = -25;
        f.left = 23 + (g.l.xq || g.l.Gh ? 5 : 0);
        f = e[4] = {};
        f.height = 10;
        f.width = d / 2 - 15 - e[3].left - e[3].width;
        f.offsetX = 132;
        f.offsetY = 445;
        f.top = -25;
        f.left = e[3].left + e[3].width;
        f = e[5] = {};
        f.height = 10;
        f.width = 70;
        f.offsetX = 80;
        f.offsetY =
        445;
        f.top = -25;
        f.left = e[4].left + e[4].width;
        f = e[6] = {};
        f.height = 10;
        f.width = d - e[5].left - e[5].width;
        f.offsetX = 132;
        f.offsetY = 445;
        f.top = -25;
        f.left = e[5].left + e[5].width;
        f = e[7] = {};
        f.height = 10;
        f.width = 30;
        f.offsetX = 621;
        f.offsetY = 445;
        f.top = -25;
        f.left = d;
        f = e[8] = {};
        f.height = 15;
        f.width = 70;
        f.offsetX = 47;
        f.offsetY = 470;
        f.top = -15;
        f.left = d / 2 - 15;
        for (c = 1; 8 >= c; c += 1) {
          d = g.g.create("div", a), f =
          [], f.push("position:absolute;"), f.push(b), f.push("top:" + e[c].top + "px;"), f.push("left:" + e[c].left + "px;"), f.push("width:" + e[c].width + "px;"),
          f.push("height:" + e[c].height + "px;"), f.push("background-position:" + -e[c].offsetX + "px " + -e[c].offsetY + "px;"), d.style.cssText =
          f.join("");
        }
      }
    },
    iwa: function () {},
    jl: function () {
      var a = this.map, b = this.oc, c = this.get("position");
      if (a && b && c) {
        b = a.Eq(c, this.get("altitude"));
        a.get("size");
        c = g.g.tF(this.Ch);
        if (g.l.Gh || g.l.xq) c.width = this.Ch.childNodes[0].offsetWidth + 14;
        a = this.get("offset");
        c = this.get("isCustom") ? c.width / 2 : (c.width - 30) / 2;
        this.oc.style.left = Math.round(b.x - c + (a.x || 0)) + "px";
        this.oc.style.top = Math.round(b.y +
        (a.y || 0)) + "px";
        b = this.Kfa;
        if (this.LL && b.childNodes[0]) {
          for (c = a = 0; c < b.childNodes.length; c += 1) {
            a +=
            b.childNodes[0].clientHeight || 0;
          }
          a > (this.get("size").height || b.clientHeight) ? this.LL.style.right = "20px" : this.LL.style.right = "5px";
        }
      }
    },
    h7: function () {
      var a = new g.G(2 - this.Ch.offsetWidth / 2, 2 - this.Ch.offsetHeight),
      b = this.get("offset") || new g.G(0, 0);
      this.get("isCustom") || (a = a.add(new g.G(0, -23)));
      return a.add(b);
    },
    altitudeChanged: function () {this.jl();},
    CR: function () {
      if (this.get("position") && this.get("autoMove") &&
      this.Ch) {
        for (var a = this.map, b = new g.gd(this.Ch.offsetWidth, this.Ch.offsetHeight), c = a.Eq(this.get("position"), this.get("altitude"))
        .add(this.h7()), d = c.add(b.xB()), e = a.get("size"), f = a.Aha(), h = 0, k = 0, l = 0; l < f.length; l += 1) {
          var m = f[l], n = 0, p = 0;
          0 === m[1] && 0 === m[2] ? (n = m[3] - (c.x + h), p =
          m[0] - (c.y + k), 0 < n && 0 < p && (Math.abs(n) < Math.abs(p) ? h += n : k += p)) : 0 === m[2] && 0 === m[3]
          ? (n = e.ti() - m[1] - (d.x + h), p = m[0] - (c.y + k), 0 > n && 0 < p && (Math.abs(n) < Math.abs(p)
          ? h += n
          : k += p))
          : 0 === m[0] && 0 === m[3] ? (n = e.ti() - m[1] - (d.x + h), p = e.ri() - m[2] - (d.y + k),
          0 > n && 0 > p && (Math.abs(n) < Math.abs(p) ? h += n : k += p)) : 0 === m[0] && 0 === m[1] && (n =
          m[3] - (c.x + h), p = e.ri() - m[2] - (d.y + k), 0 < n && 0 > p && (Math.abs(n) < Math.abs(p) ? h += n : k +=
          p));
        }
        c = c.add(new g.G(h, k));
        d = d.add(new g.G(h, k));
        l = f = 0;
        0 > c.x || b.ti() > e.ti() ? f = 20 - c.x : e.ti() < d.x && (f = e.ti() - d.x - 25);
        0 > c.y || b.ri() > e.ri() ? l = 5 - c.y : e.ri() < d.y && (l = e.ri() - d.y - 15);
        f += h;
        l += k;
        if (f || l) a.F.B = !0, a.F.panBy(f, l), a.F.B = !1;
      }
    },
    tfa: function () {this.get("closeWhenClickMap") && (this.map.h("clickstart", this.GU, this, !1), this.map.h("clickend", this.FU, this, !1));},
    GU: function () {this.Oe.gi && (this.Oe.B = !0, this.Oe.getIsOpen() && (this.Oe.iH = !0), this.Oe.B = !1);},
    FU: function () {this.Oe.gi && (this.Oe.iH && (this.Oe.B = !0, this.Oe.close(), this.Oe.B = !1), this.Oe.iH = !1);},
    Uf: function () {
      this.oc && this.map && (this.Oe.iH =
      !1, this.get("closeWhenClickMap") && (this.map.I("clickstart", this.GU, this), this.map.I("clickend", this.FU, this)), this.get("retainWhenClose")
      ? this.map.rk.appendChild(this.oc)
      : (this.oc.parentNode === this.map.Oa.A && this.map.Oa.A.removeChild(this.oc), this.Oe.A = null), this.map =
      null, this.Oe.gi = !1, this.Wb.o("close", { type: "close", target: this.Wb }));
    },
    gra: function () {
      if (!this.get("isCustom")) return this.Ch.offsetWidth;
      for (var a = this.th, b = a.firstChild, c = a.lastChild; b && c && b.style && c.style && b === c;) {
        a = b, b =
        a.firstChild, c = a.lastChild;
      }
      a = g.g.Ed(a, "width");
      return a = parseInt(a.replace("px", ""), 10);
    },
    renderChanged: function () {this.jl();},
    positionChanged: function () {this.map && this.oc && (this.jl(), this.CR());},
    offsetChanged: function () {this.positionChanged();},
    contentChanged: function () {
      this.ir();
      this.gQ();
      this.jl();
    },
    sizeChanged: function () {
      this.ir();
      this.gQ();
      this.jl();
    }
  });
  g.va = {};
  g.va.me = g.Z.extend({
    ga: [ g.na, g.Ie ],
    r: function () {},
    Ls: function () {
      var a = this.bd();
      a.zg || (a.zg = g.H.$g(a));
      return a.zg;
    },
    jb: function () {return new this.r(this.Na);},
    HM: function () {return this.Na;},
    setCoords: function (a) {this.una(a);},
    una: function (a) {
      this.jt = this.bd();
      this.Lf = null;
      if (g.va.tc && this instanceof g.va.tc) {
        var b = a.length;
        this.Cf = Array(b);
        for (var c, d, e = 0; e < b; e += 1) {
          if (c = a[e], d = new g.va.TQ(c), this.Cf[e] =
          d, 0 === e) {
            if (0 === c.length) break;
            d.Co(c) || c.reverse();
          } else {
            0 !== c.length && d.Co(c) && c.reverse();
          }
        }
      } else {
        this.Na = a;
      }
    }
  });
  g.va.ne =
  g.extend({}, {
    nu: "point",
    NH: "linestring",
    SQ: "linearring",
    bC: "polygon",
    UH: "multipoint",
    TH: "multilinestring",
    ZB: "multipolygon",
    mqa: "geometrycollection"
  });
  g.nh = g.Z.extend({
    ga: [ g.na, g.Ie ],
    r: function (a) {
      a = a || {};
      a.Cy && (this.Cy = a.Cy);
      a.CJ && (this.CJ = a.CJ);
      a.QT && (this.QT = a.QT);
      this.map = a.map;
      this.Jk = a.eJ || g.a.Tb(this);
      this.name = a.name || "";
      this.uf = !1;
      this.set("visible", !0, !0);
      this.oP(a.ba);
      this.bk = a.dH;
      this.style = a.style;
    },
    oga: function () {
      this.style = this.bk = this.Jp = this.E_ = this.ba = this.name = this.map = null;
      this.gp();
      this.Pi();
    },
    mia: function () {return this.bk;},
    Ina: function (a) {
      this.bk = a;
      this.zIndex = this.bk[0].rj || this.zIndex;
    },
    lc: function () {return this.ba;},
    oP: function (a) {
      a &&
      (this.ba =
      a, this.W("coords", a, !0), this.Cy || this.CJ) && (a.W("radius", this), a.W("center", this), a.W("resolution", this), a.W("strokeWeight", this));
    },
    setStyle: function (a) {
      this.Ina(a);
      this.mq();
    },
    coordsChanged: function () {this.mq();},
    radiusChanged: function () {
      this.ba.jt = this.ba.bd();
      this.ba.Lf = null;
      this.mq();
    },
    mq: function (a) {
      this.set("feature", { target: this, hga: a, jt: this.ba.jt || this.ba.bd(), zka: this.ba.bd() });
      this.ba.jt = this.ba.bd();
    },
    visibleChanged: function () {this.mq();},
    vta: function (a) {
      for (var b = 0; b < this.bk.length; b +=
      1) {
        var c = this.bk[b];
        if (a.eb(c.Av(this))) return c;
      }
    },
    Hha: function () {
      var a = this.lc(), b = [];
      a.Eh() === g.va.ne.bC || a.Eh() === g.va.ne.ZB ? b.push(new g.style.Zd.tc({
        fillColor: "#78cdd1",
        Od: 0.2,
        strokeColor: "#122e29",
        gb: 0.5,
        Xb: 1
      })) : a.Eh() === g.va.ne.NH || a.Eh() === g.va.ne.SQ || a.Eh() === g.va.ne.TH
      ? b.push(new g.style.Zd.Bn({ color: "#888888", width: 1, zIndex: 10 }))
      : a.Eh() !== g.va.ne.nu && a.Eh() !== g.va.ne.UH || b.push(new g.style.Zd.ph({
        url: g.w.Db + "/theme/v1.3/markers/0.png",
        width: 36,
        height: 36,
        rotation: 0,
        Bwa: -12,
        Cwa: -36,
        zIndex: 100
      }));
      return b;
    }
  });
  g.nh.hqa = "geometry";
  g.va.Yf = g.va.me.extend({
    r: function (a, b) {
      this.Na = a;
      this.wi = b;
      this.Lf = null;
    }, bd: function () {
      if (!this.Lf) {
        var a = this.Na[0], b = this.Na[1];
        if (this.wi) {
          this.Lf = [ a, b, a, b ];
        } else {
          var c = this.get("radius"),
          d = this.get("resolution") * this.get("strokeWeight") || 0,
          c = c ? c / Math.cos(Math.PI * this.get("center").P / 180) : 0;
          this.Lf = [ a - c - d, b - c - d, a + c + d, b + c + d ];
        }
      }
      return this.Lf;
    }, Eh: function () {return g.va.ne.nu;}
  });
  g.N = { canvas: {}, Nd: {}, pg: {}, he: {} };
  g.N.Hc = g.Z.extend({
    ga: [ g.na, g.Ie ], r: function (a, b) {
      this.j = a;
      this.wi = a.X.wi;
      this.O = b;
      this.e = b.e;
      this.W("display", b);
    }, Bs: function () {
      this.zw && this.zw();
      this.gp();
      this.e = this.O = this.j = null;
    }, Os: function (a, b, c, d) {
      var e = this.zoom;
      c = [];
      var f = this.j;
      if (Math.floor(e) !== e) {
        b(c, f);
      } else {
        a = [ a.x, a.y ];
        if (f.Tl) {
          for (var e = f.jg, h = !0, k = [], l = 0; l < e.length; l += 1) {
            var m = e[l].Ag;
            if (m) {
              if (m.parentNode && m.parentNode.parentNode && this.O && m.parentNode.parentNode !== this.O.rk && "none" !== m.parentNode.style.display) {
                var n = g.g.Sv(m), m =
                n[0], n = n[1];
                if (m && n) {
                  var p = Math.max(Math.abs(e[l].get("offset").x), Math.abs(e[l].get("offset").y)) + Math.max(m, n);
                  f.Ue = Math.max(f.Ue, p);
                  f.Bf = Math.max(f.Bf, p);
                  e[l].width = m;
                  e[l].height = n;
                } else {
                  h = !1, k.push(e[l]);
                }
              } else {
                h = !1, k.push(e[l]);
              }
            }
          }
          h ? (f.Tl = !1, f.jg = []) : f.jg = k;
        }
        e = Math.max(f.Ue, f.uw || 0) * this.S;
        h = Math.max(f.Bf, f.uw || 0) * this.S;
        k = 0;
        f.tw && (k = f.tw / Math.cos(Math.PI * this.e.get("center").P / 180));
        h = Math.max(h, k || 0);
        e = Math.max(e, k || 0);
        if (e = f.Rl([ a[0] - e, a[1] - h, a[0] + e, a[1] + h ])) {
          for (var q in e) {
            if (e.hasOwnProperty(q) &&
            (h = e[q], h.get("visible") && !h.get("noSelect"))) {
              if (k = h.lc(), k instanceof g.va.Yf) {
                if (this.wi) {
                  l = this.j.el;
                  l instanceof Array && (l = "number" === typeof h.Ya.style && l[h.Ya.style] ? l[h.Ya.style] : l[0]);
                  var m = l.size.width * this.S,
                  n = l.size.height * this.S,
                  p = l.anchor.x * this.S,
                  s = l.anchor.y * this.S,
                  k = k.Na,
                  r = l.rotation_,
                  u = [ a[0], a[1] ];
                  if (r) {
                    var w = (a[0] - k[0]) / this.S,
                    v = (a[1] - k[1]) / this.S,
                    t = r,
                    r = Math.cos(-t),
                    x = Math.sin(-t),
                    t = w * r - v * x,
                    w = w * x + v * r;
                    u[0] = k[0] + t * this.S;
                    u[1] = k[1] + w * this.S;
                  }
                  m = g.H.vL([
                    [ u[0] - m + p, u[1] - n + s ], [
                      u[0] + p, u[1] +
                      s
                    ]
                  ]);
                  g.H.ud(m, k) && c.push(h);
                } else if ("undefined" !== typeof k.get("radius")) {
                  l = k.Na, l = new g.G(l[0], l[1]), m =
                  new g.G(a[0], a[1]), k = k.get("radius"), "px" === h.get("unit")
                  ? m.be(l) / Math.pow(2, 20 - this.zoom) < k && c.push(h)
                  : m.be(l) * Math.cos(h.get("center").P * Math.PI / 180) <= k / this.Jo * Math.pow(2, 20 - this.zoom) && c.push(h);
                } else if ("AMap.Text" == h.tz) {
                  l =
                  h.get("params"), l.visible && h.ca && g.g.tA(d, h.ca, "amap-markers") && c.push(h);
                } else {
                  if (l = h.get("params"), l.visible && h.ca) {
                    if (l.shape) {
                      for (k = k.Na, r = l.qv % 360, u =
                      [ a[0], a[1] ], r && (w = (a[0] -
                      k[0]) / this.S, v = (a[1] - k[1]) / this.S, t = Math.PI * r / 180, r = Math.cos(-t), x =
                      Math.sin(-t), t =
                      w * r - v * x, w = w * x + v * r, u[0] = k[0] + t * this.S, u[1] = k[1] + w * this.S), m =
                      h.width * this.S, n = h.height * this.S, p = l.offset.x * this.S, s = l.offset.y * this.S, m =
                      g.H.vL([ [ u[0] - m - p, u[1] - n - s ], [ u[0] - p, u[1] - s ] ]), k[0] instanceof Array || (k =
                      [ k ]), n = k.length - 1; 0 <= n; n -= 1) {
                        if (g.H.ud(m, k[n])) {
                          l.shape
                          ? this.sA(h, u, k) && c.push(h)
                          : c.push(h);
                          break;
                        }
                      }
                    } else {
                      g.g.tA(d, h.ca, "amap-markers") && c.push(h);
                    }
                  }
                }
              } else {
                k.ud ? k.ud(a) && c.push(h) : k.Kv && 1.8 * k.Kv(a) <= h.get("strokeWeight") *
                this.S && c.push(h);
              }
            }
          }
          this.wi
          ? c.sort(function (a, b) {return a.Jk > b.Jk ? -1 : 1;})
          : c.sort(function (a, b) {
            return a.get("isTop") ? -1 : b.get("isTop")
            ? 1
            : a.get("zIndex") > b.get("zIndex") || a.get("zIndex") === b.get("zIndex") && a.Jk > b.Jk ? -1 : 1;
          });
          b(c, f);
        } else {
          b([], f);
        }
      }
    }, sA: function (a, b, c) {
      var d = (b[0] - c[0][0]) / this.S;
      b = (b[1] - c[0][1]) / this.S;
      a = a.get("params");
      c = a.offset;
      var d = [ d - c.x, b - c.y ], e;
      a = a.shape;
      if ("circle" === a.C.type) {
        if (b = a.C.coords[0], c =
        a.C.coords[1], Math.sqrt((d[0] - b) * (d[0] - b) + (d[1] - c) * (d[1] - c)) <= a.C.coords[2]) {
          return !0;
        }
      } else {
        if ("poly" ===
        a.C.type) {
          return e = a.C.coords, e = this.vE(e), g.ed.ud(d, e);
        }
        if ("rect" === a.C.type) {
          return e = a.C.coords, a = e[0], b = e[1], c = e[2], e = e[3], e =
          [ [ a, b ], [ c, b ], [ c, e ], [ a, e ] ], g.ed.ud(d, e);
        }
      }
      return !1;
    }, vE: function (a) {
      for (var b = [], c = 0; c / 2 < a.length / 2; c += 2) b.push([ a[c], a[c + 1] ]);
      return b;
    }, SY: function (a, b, c, d, e, f, h) {
      var k = [ "position:absolute;" ];
      k.push("top:" + Math.round(c) + "px;");
      k.push("left:" + Math.round(b) + "px;");
      k.push("width:" + Math.round(d) + "px;");
      k.push("height:" + Math.round(e) + "px;");
      1 > f && ("opacity" in a.style ? (k.push("opacity"),
      k.push(":"), k.push(f), k.push(";")) : 8 <= document.documentMode
      ? (k.push("-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(opacity="), k.push(Math.ceil(100 * f)), k.push(")';"))
      : (k.push("filter:alpha(opacity="), k.push(Math.ceil(100 * f)), k.push(");")));
      k.push("z-index:" + h + ";");
      k.join("");
      g.g.b2(a, k.join(""));
    }
  });
  g.N.Yb = g.Z.extend({
    ga: [ g.na, g.Ie ],
    r: function (a) {
      this.e = a;
      this.rk = a.rk;
      this.J = a.Oa.q;
      this.W("display", a);
      this.W("rotateEnable", a);
      this.W("style", a);
      this.W("hightlight", a);
    },
    lO: function (a) {this.$d = a || g.a.Gj("ff" + this.e.$d.slice(1));},
    Os: function (a, b, c, d, e) {
      function f (a, d) {
        a.length && (k[g.a.indexOf(b, d)] = a);
        l -= 1;
        0 >= l && (c(k), l = 0);
      }

      for (var h = b.length, k = [], l = 0, m, n = [], p = 0; p < h; p += 1) {
        m =
        b[p], m instanceof g.q.Sc && m.get("visible") && (n.push(this.Qs(m)), l += 1);
      }
      for (h = 0; h < n.length; h += 1) n[h].Os(a, f, d, e);
    }
  });
  g.RX = {
    iF: function (a, b, c) {
      for (var d = null, e = null, f = 0, h = 0, k = 0, l = b.length; k < l; k++) {
        var m = b[k];
        if (m < a) {
          d = c[m], f = m;
        } else {
          e = c[m];
          h = m;
          break;
        }
      }
      null === d ? (d = e, f = h) : null === e && (e = d, h = f);
      return { Hw: f, dG: h, Tq: d, NA: e };
    },
    nia: function (a) {
      var b = this, c = g.a, d = [], e = {};
      c.Lb(a.nodes, function (a) {
        !1 !== a.value && null !== a.value && (e[a.zoom] =
        g.w.Sb + "://" + a.value, d.push(a.zoom));
      });
      return function (a) {
        a = c.jd(a, 1);
        void 0 === e[a] && (e[a] = b.iF(a, d, e).Tq);
        return e[a];
      };
    },
    aia: function (a) {
      var b = this, c = g.a, d = [], e = {}, f = a.transitional;
      c.Lb(a.nodes,
      function (a) {null !== a.value && !1 !== a.value && (e[a.zoom] = a.value, d.push(a.zoom));});
      return function (a) {
        a = c.jd(a, 1);
        if (void 0 === e[a]) {
          var k = b.iF(a, d, e);
          e[a] =
          f && "none" !== f && k.dG !== k.Hw && k.Tq !== k.NA ? c.lZ(k.Tq, k.NA, (a - k.Hw) / (k.dG - k.Hw), f) : k.Tq;
        }
        return e[a];
      };
    },
    rha: function (a) {
      var b = this, c = g.a, d = [], e = {};
      c.Lb(a.nodes, function (a) {null !== a.value && (e[a.zoom] = a.value, d.push(a.zoom));});
      return function (a) {
        a = c.jd(a, 1);
        void 0 === e[a] && (e[a] = b.iF(a, d, e).Tq);
        return e[a];
      };
    },
    yha: function (a, b, c) {
      var d = this, e = g.a, f = [], h = {}, k =
      a.transitional;
      e.Lb(a.nodes, function (a) {
        null !== a.value && !1 !== a.value && (h[a.zoom] =
        e.gea(a.value, c ? "rgba" : "webgl"), f.push(a.zoom));
      });
      return function (a) {
        var b = null;
        a = e.jd(a, 1);
        if (void 0 === h[a]) {
          var b = d.iF(a, f, h), n = b.Tq;
          if (k && "none" !== k && b.Hw !== b.dG && b.Tq.join("") !== b.NA.join("")) {
            for (var n = n.slice(0), p = (a - b.Hw) / (b.dG - b.Hw), q = 0, s = b.NA.length; q < s; q++) {
              n[q] =
              e.lZ(b.Tq[q], b.NA[q], p, k);
            }
          }
          h[a] = n;
        }
        b = h[a];
        return c && b ? "rgba(" + b.join(",") + ")" : b || "";
      };
    },
    qG: function (a, b, c, d) {
      var e = 4 < arguments.length && void 0 !== arguments[4] ?
      arguments[4] : {}, f;
      for (f in c) {
        if (c.hasOwnProperty(f)) {
          var h = c[f];
          void 0 !== b[h]
          ? (b[h].nodes && 1 < b[h].nodes.length && b[h].nodes.sort(function (a, b) {return a.zoom - b.zoom;}), a[f] =
          e.hja ? { pg: d.call(this, b[h], c[f]), canvas: d.call(this, b[h], c[f], !0) } : d.call(this, b[h], c[f]))
          : e.eja && (a[f] = !0);
        }
      }
    },
    Rp: function (a, b) {
      for (var c = [], d = 0, e = a.length; d < e; d += 2) {
        var f = 0,
        f = "str" === b
        ? g.a.jd(parseInt(a.substr(d, 2), 16) / (0 === d ? 255 : 1), 3)
        : g.a.jd(parseInt(a.substr(d, 2), 16) / 255, 3);
        c.push(f);
      }
      return c.length ? (c.push(c.shift()), "str" === b ?
      "rgba(" + c.join(",") + ")" : c) : "";
    },
    M0: function (a, b, c) {
      if (b[c]) {
        console.log("customType repeat!!", c);
      } else {
        var d = {}, e = { visible: "visible", xP: "showLabel", kj: "showIcon" }, f = [
          [ "color", { color: "color" }, { opacity: "opacity" } ],
          [ "fillColor", { fillColor: "fillColor" }, { Od: "fillOpacity" } ],
          [ "strokeColor", { strokeColor: "strokeColor" }, { gb: "strokeOpacity" } ],
          [ "textFillColor", { noa: "textFillColor" }, { ooa: "textFillOpacity" } ],
          [ "textStrokeColor", { poa: "textStrokeColor" }, { qoa: "textStrokeOpacity" } ],
          [
            "backgroundColor", { backgroundColor: "backgroundColor" },
            { nea: "backgroundOpacity" }
          ]
        ];
        if (a.styles) {
          a = a.styles;
          this.qG(d, a, e, this.rha, { eja: !0 });
          for (var e = 0, h = f.length; e < h; e++) {
            var k = f[e];
            a[k[0]] ? this.qG(d, a, k[1], this.yha, { hja: !0 }) : this.qG(d, a, k[2], this.aia);
          }
          a.texture && (this.qG(d, a, { Za: "texture" }, this.nia), d.Hd =
          [], g.a.Lb(a.texture.nodes, function (a) {a.value && d.Hd.push(g.w.Sb + "://" + a.value);}));
        } else {
          for (h in e) e.hasOwnProperty(h) && (k = e[h], d[h] = void 0 === a[k] ? !0 : a[k]);
          e = 0;
          for (h = f.length; e < h; e++) {
            var l = f[e], k = g.a.keys(l[1])[0], m = l[1][k], n = g.a.keys(l[2])[0], l = l[2][n];
            void 0 !== a[m] ? d[k] = { canvas: this.Rp(a[m], "str"), pg: this.Rp(a[m]) } : d[n] = a[l];
          }
          a.texture && (d.Za = g.w.Sb + "://" + a.texture);
        }
        b[c] = d;
      }
    },
    BO: function (a, b, c, d) {
      if (a) {
        for (var e in a) {
          if (a.hasOwnProperty(e) && g.a.Yi(a[e], "object")) {
            var f = a[e], h = e;
            c && (h = c + ":" + e);
            if (f.detailedType) {
              this.M0(f, b, h), this.BO(f.detailedType, b, h, f);
            } else if (f.subType) {
              this.BO(f.subType, b, h);
            } else {
              if (void 0 !== f.code) {
                for (var k in d) {
                  d.hasOwnProperty(k) && !g.a.ga([
                    "isDetailed",
                    "detailedType",
                    "styles"
                  ], k) && void 0 === f[k] && void 0 !== d[k] && (f[k] = d[k]);
                }
                h = c + ":" + f.code;
              }
              this.M0(f, b, h);
            }
          }
        }
      }
    },
    styleChanged: function (a) {
      if (this.e.F.Ih) {
        a = a || this.get("style");
        this.Ok.Vx || (this.Ok = g.a.bind(this.Ok, this), this.so = g.a.bind(this.so, this), this.Ok.Vx = !0);
        var b = g.a, c = {};
        this.BO(a, c);
        this.xs = c;
        a = this.xs["regions:land"];
        var c = this.xs.water, d = this.xs.sky, e = this.xs.buildings, f, h, k, l, m;
        if (a) {
          var n = "rgba(0, 0, 0, 0)";
          if (a.visible) {
            var p = this.so(b.M1(this.e.$d.substr(1)), a.opacity, a.color, !0);
            p && (n = this.wx(p, a.visible, "rgba(0, 0, 0, 0)"), p = this.Ok(b.vt(this.e.$d.substr(1)),
            a.opacity, a.color, !0), f = this.wx(p, a.visible));
          }
          this.e.ws = n;
        } else {
          this.e.ws = "";
        }
        c && c.visible && (h = this.Ok(b.vt(this.e.aE.substr(1)), c.opacity, c.color, !0), h = this.wx(h, c.visible));
        d && d.visible && (k = this.Ok(b.vt(this.e.hz.substr(1)), void 0, d.color, !0), k = this.wx(k, d.visible));
        e && (e.visible ? (l = this.Ok(b.Gj(this.e.rC[0]), void 0, e.fillColor, !0), l = this.wx(l, e.visible), m =
        this.Ok(b.Gj(this.e.rC[1]), void 0, e.strokeColor, !0), m = this.wx(m, e.visible)) : (l = [ 1, 1, 1, 0 ], m =
        [ 1, 1, 1, 0 ]));
        this.lO && this.lO(f, h, k, [ l, m ]);
        this.v3 ? this.v3(this.xs) :
        this.set("display");
      }
    },
    wx: function (a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [ 0, 0, 0, 0 ],
      d = g.a.Hh;
      if (d(a) && d(b)) {
        var e = a;
        a = function (a) {return b(a) ? e(a) : c;};
      }
      return a;
    },
    so: function (a, b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : !1;
      if (a) {
        if (void 0 !== b) {
          var d = a.split(","), e = b;
          "function" === typeof b && (e = b(this.e.af.Q.zoom));
          d[3] = g.a.jd(e, 3) + ")";
          return d.join(",");
        }
        if (c) return "function" === typeof c.canvas ? d ? c.canvas : c.canvas(this.e.af.Q.zoom) : c.canvas;
      }
      return a;
    },
    Ok: function (a,
                  b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : !1;
      if (a) {
        if (b) {
          return d = b, "function" === typeof b && (d = b(this.e.af.Q.zoom)), [
            a[0],
            a[1],
            a[2],
            g.a.jd(d, 3)
          ];
        }
        if (c) return "function" === typeof c.pg ? d ? c.pg : c.pg(this.e.af.Q.zoom) : c.pg;
      }
      return a;
    },
    pF: function (a, b) {
      if (void 0 !== b) {
        var c = this.xs[a + ":" + b];
        if (c) return c;
      }
      return this.xs[a];
    },
    Mk: function (a, b, c, d) {
      var e = null, f = a;
      d = d ? this.so : this.Ok;
      var h = this.e.af.Q.zoom;
      if (e = this.pF(b)) {
        if ("function" === typeof e.visible && !e.visible(h) || !1 === e.visible) {
          f = "";
        } else {
          f =
          1;
          h = "";
          if (c) {
            if (e.fillColor || e.Od) {
              f = e.Od, h = e.fillColor;
            } else {
              if (e.color || e.opacity) {
                f = e.opacity, h =
                e.color;
              }
            }
          } else if (e.strokeColor || e.gb) {
            f = e.gb, h = e.strokeColor;
          } else if (e.color || e.opacity) {
            f = e.opacity, h =
            e.color;
          }
          f = d(a, f, h);
        }
      }
      this.vq === b && (f = this.Ps(f || a));
      return f;
    },
    rq: function (a, b, c) {
      c = c ? this.so : this.Ok;
      var d = null, e = a, f = this.e.af.Q.zoom;
      (d = this.pF(b)) && (e =
      "function" === typeof d.visible && !d.visible(f) || !1 === d.visible ? "" : c(a, d.opacity, d.color));
      this.vq === b && (e = this.Ps(e || a));
      return e;
    },
    Uv: function (a, b, c, d, e) {
      var f =
      a, h = b, k = c, l = !0, m = !0, n = 1, p = this.pF(d, e), q = this.e.af.Q.zoom;
      p && ("function" === typeof p.visible && !p.visible(q) || !1 === p.visible || "function" === typeof p.xP && !p.xP(q) || !1 === p.xP
      ? (m = l = !1, f = h = k = "")
      : (f = this.so(a, p.ooa, p.noa), h = this.so(b, p.qoa, p.poa), k = this.so(c, p.nea, p.backgroundColor), l =
      "function" === typeof p.kj ? p.kj(q) : p.kj));
      p = !1;
      this.vq === d ? p = !0 : void 0 !== e && this.vq === d + "-" + e && (p = !0);
      p && (f = this.Ps(f || a), h = this.Ps(h || b), k = this.Ps(k || c), n = 1 - 1.6 * this.fw, m = l = !0);
      return [ f, h, k, l, m, n ];
    },
    Tv: function (a, b, c, d) {
      var e =
      null, f = a, h = b;
      d = d ? this.so : this.Ok;
      var k = this.e.af.Q.zoom;
      if (e = this.pF(c)) {
        "function" === typeof e.visible && !e.visible(k) || !1 === e.visible ? f = h = "" : (f =
        d(a, e.Od, e.fillColor), h = d(b, e.gb, e.strokeColor));
      }
      this.vq === c && (b = h || b, f = this.Ps(f || a), h = this.Ps(b));
      return [ f, h ];
    }
  };
  g.N.Yb.wb(g.RX);
  g.N.canvas.Yb = g.N.Yb.extend({
    r: function (a) {
      arguments.callee.oa.apply(this, arguments);
      this.type = "2D";
    }, Qs: function (a) {
      if (!a.N) {
        var b = a.Ml(this);
        b && !b.Qfa && (a.N = b);
      }
      return a.N;
    }, bc: function (a) {
      var b = this.e.EY();
      b && this.SO !== b && this.e.F.Ih && (this.e.a2(b), this.SO = b);
      this.e.Oa.Vp.style.cssText = "";
      for (var c = a.xa, b = a.Q, d = this.e.F.get("features"), e = a.size.width, f = a.size.height, h = 0; h < c.length; h +=
      1) {
        var k = c[h], l = this.Qs(k), m = c[h].Qk();
        if (l && l.j) {
          if (!m.visible || k.OA || m.pd[0] > b.zoom || m.pd[1] < b.zoom || k.ka && 0 === k.ka.length) {
            if (l =
            l.Ui()) {
              if (l.length) {
                for (m = 0; m < l.length; m +=
                1) {
                  l[m].parentNode === this.J && this.J.removeChild(l[m]);
                }
              } else {
                l.parentNode === this.J && this.J.removeChild(l);
              }
            }
          } else if (this.IN(k, d)) {
            l.bc(a, m);
            var k = l.Ui(), n, p, q = l.transform;
            if (!q || !k || l.fg && !this.e.F.sa) {
              c[h].Oj && k.parentNode !== this.J && (this.J.appendChild(k), c[h].Fb =
              k);
            } else {
              c[h].Fb = k;
              k.length || (k = [ k ], q = [ q ]);
              for (var s = 0; s < k.length; s += 1) {
                if (n = k[s], p = q[s], !p.ew) {
                  var r = p.translate.x, u = p.translate.y;
                  c[h].LF || (r = g.a.jd(r, 2), u = g.a.jd(u, 2));
                  var w = p.scale;
                  1E-5 > Math.abs(r) &&
                  (r = 0);
                  1E-5 > Math.abs(u) && (u = 0);
                  var v = [];
                  v.push("position:absolute");
                  v.push("z-index:" + (p.rj || c[h].get("zIndex")));
                  c[h].Sz
                  ? (v.push("top:" + Math.floor(f / 2 + u) + "px"), v.push("left:" + Math.floor(e / 2 + r) + "px"))
                  : n.l_
                  ? (v.push("height:" + n.height * w + "px"), v.push("width:" + n.width * w + "px"), v.push("top:" + (f / 2 - u * w) + "px"), v.push("left:" + (e / 2 - r * w) + "px"))
                  : (1 !== w && (v.push(g.g.er[g.g.Hf] + "-origin:" + r + "px " + u + "px"), v.push(g.g.er[g.g.Hf] + ":scale3d(" + w + "," + w + ",1)")), v.push("top:" + Math.floor(f / 2 - u) + "px"), v.push("left:" + Math.floor(e /
                  2 - r) + "px"), l.Fg && (v.push("height:" + n.height + "px"), v.push("width:" + n.width + "px")));
                  l.LF || 1 === m.opacity || "number" !== typeof m.opacity || v.push(g.g.YY(n, m.opacity));
                  n.parentNode !== this.J && this.J.appendChild(n);
                  g.g.b2(n, v.join(";"));
                }
              }
            }
          }
        }
      }
      a = this.e.Oa.Vp;
      k = this.e.Oa.q;
      c = this.e.Oa.A;
      g.g.Hf && "number" === typeof b.rotation && 0 !== b.rotation ? (a.style[g.g.Hf + "Origin"] =
      e / 2 + "px " + f / 2 + "px", a.style[g.g.Hf] = "rotate(" + b.rotation + "deg)", a.style.overflow =
      "visible", k.style.overflow = "visible", c.style.overflow = "visible") : (a.style.cssText =
      "", k.style.cssText = "-webkit-transform: translateZ(0);", c.style.cssText = "");
      this.e.Dt = !1;
    }, IN: function (a, b) {
      if ("all" === b || void 0 === a.Ck) return !0;
      for (var c = 0, d = a.Ck.length; c < d; c++) if (g.a.ga(b, "region" === a.Ck[c] ? "bg" : a.Ck[c])) return !0;
      return !1;
    }
  });
  g.N.Vh = g.N.Hc.extend({
    r: function (a, b) {
      arguments.callee.oa.apply(this, arguments);
      this.W("reload", a, !0);
      var c = a.X.get("cacheSize");
      if (this.e && this.e.F) {
        var d = this.e.F.get("tileCacheSize");
        d && 0 < d && (c = d);
      }
      this.ia = new g.Gf(c);
      var e = this;
      this.ia.mO.KW(function (a) {e.hy(a);});
      this.xc = 1;
      this.Hn = 50;
      this.ER = !0;
      this.j.ia = this.ia;
      this.Sk = new g.VB(6, null, a.lM);
      new g.VB(5, null, a.lM);
    },
    zw: function () {
      this.clear();
      this.ia.clear();
      this.Xc && (this.Xc.I("tiles", this.lG, this), this.Xc.I("ack", this.kG, this), this.Xc.I("disable",
      this.jG, this), this.Xc = null);
      this.Fg && g.D.I(this.Sa, "webglcontextlost", this.QA, this);
      this.e.I("zoomend", this.Lj, this);
      this.e.I("moveend", this.Lj, this);
    },
    reloadChanged: function () {
      this.j && (this.j.sa = !1);
      this.ia.clear();
      this.reload = !0;
      this.set("display");
    },
    gh: function (a, b, c) {
      function d (b) {
        a.loaded = !0;
        e.j && (a.status = "loaded", a.pa = !0, a.fc = b, e.set("display", 0), "function" === typeof c && c());
      }

      var e = this;
      a.status = "loading";
      e.ia.set(a.key, a);
      this.j.Qm && this.j.Qm.call(this, a, d, function () {
        a.loaded = !0;
        e.j && (a.status =
        "loaded", a.pa = !0, "function" === typeof c && c());
      });
    },
    Coa: function (a, b, c, d) {
      var e = [];
      c = c || 18;
      b = Math.pow(2, b - c);
      for (var f = 0; f < a.length; f += 1) {
        var h = a[f].ta, k = Math.floor(h.x / b), h = Math.floor(h.y / b);
        if (d) {if (k = c + "/" + k + "/" + h, (h = this.ia.get(k)) && "loaded" == h.status) continue;} else {
          h =
          new g.qm(c, k, h), k = h + "", h = new g.ib(h);
        }
        !e[k] && h && (e.push(h), e[k] = 1);
      }
      return e;
    },
    $l: function (a) {
      for (var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1, c = a.length - 1; 0 <= c; c -=
      1) {
        var d = a[c];
        if (d.length) {
          if (this.j.oz) {
            for (var e = [],
                 f = d.length - 1; 0 <= f; f -= 1) {
              var h = d[f], k = h.ta;
              this.j.e.zp.vB(k.x, k.y, k.z) ? e.push(d[f]) : (this.ia.set(h.key, h), h.loaded = !0, h.status =
              "loaded", h.pa = !0, h.ya = {});
            }
            d = e;
            a[c] = e;
            if (0 == e.length) continue;
          }
          if (this.xi) {
            if (this.e.JB) break;
            e = d[0].ta.z;
            18 < e && (d = this.Coa(d, e, 18, this.Fg));
            this.Et(d, this.Fg ? 1 : 0);
            for (h = f = 0; f < d.length;) this.WN(d.slice(50 * h, 50 * h + 50), e, b), f += 50, h += 1;
          } else {
            var l = this, e = function () {
              var a = d.length;
              return function () {
                if (0 === --a) {
                  var b = { key: "rb", index: 0, id: l.e.F.id };
                  l.j.X.ej || (g.oe.Je.end(b), g.oe.Je.end(g.extend(b,
                  { index: 1 })));
                }
              };
            }();
            this.Et(d);
            this.Go += d.length;
            for (f = d.length - 1; 0 <= f; f -= 1) this.gh(d[f], this.Sk, e);
          }
        }
      }
    },
    $v: function (a, b) {
      var c = this.ia.get(a + "");
      c || b || (c = new g.ib(a.jb()));
      return c;
    },
    YG: function (a, b) {return this.Yc * Math.pow(2, a - b);},
    hy: function (a) {
      a.Aq && this.Sk.tX(a.Aq);
      a.JG = !1;
      a.loaded = !1;
    },
    yv: function (a, b) {
      var c = (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0) || this.ab,
      d = a.ld.x,
      e = a.ld.y,
      f = a.Qb.x,
      h = a.Qb.y;
      new g.G(0, 0);
      var k = this.YG(20, c);
      b && (f = Math.max(b[0], f) - b[0], h = Math.max(b[1], h) - b[1], d =
      Math.min(b[2], d) - b[0], e = Math.min(b[3], e) - b[1], new g.G(Math.floor(b[0] / k), Math.floor(b[1] / k)));
      d /= k;
      e /= k;
      d =
      {
        Ac: 0 === d % 1 ? d - 1 : Math.floor(d),
        sc: 0 === e % 1 ? e - 1 : Math.floor(e),
        Bc: Math.floor(f / k),
        Zb: Math.floor(h / k)
      };
      d.Jw = d.Ac - d.Bc + 1;
      d.k1 = d.sc - d.Zb + 1;
      d.z = c;
      d.S = this.S * Math.pow(2, this.zoom - c);
      d.vF = Math.ceil(d.Jw / 2);
      return d;
    },
    Xs: function (a, b, c) {return b < a.Bc || b > a.Ac || c < a.Zb || c > a.sc ? !1 : !0;},
    Et: function (a, b) {
      if (a.length) {
        var c = this.mb.Uc(this.Yc << 20 - a[0].ta.z), d = Math.floor(c.x), e = Math.floor(c.y);
        a.sort(function (a, c) {
          var k =
          a.ta, l = c.ta, m = k.x - d, k = k.y - e, n = l.x - d, l = l.y - e;
          return (b ? -1 : 1) * (n * n + l * l - (m * m + k * k));
        });
      }
    },
    clear: function () {this.Sk.clear();},
    hm: function (a, b) {
      this.Kf = !1;
      this.clear();
      this.ai = b.ai;
      this.$h = b.$h;
      this.Yc = b.Yc;
      var c = a.Q;
      this.ef = b.ef || a.Q.ef;
      this.zg = c.zg;
      this.size = a.size;
      this.rotation = c.rotation;
      this.mb = c.mb;
      this.Fa = a.Q.Fa;
      this.zoom && (this.Pq = c.zoom > this.zoom ? "in" : c.zoom < this.zoom ? "out" : !1);
      this.We = a.We;
      this.hg = a.hg;
      this.zoom = c.zoom;
      this.je = c.je;
      this.ab = !1 === this.xi && !this.j.PZ && this.j.ma ? this.je + 1 : this.je;
      this.Se &&
      this.ab > this.Se && (this.ab = this.Se);
      this.ln && this.ab < this.ln && (this.ab = this.ln);
      this.S = c.S;
      this.zf = c.zf;
      c = a.Q.Fa;
      this.Lh = this.yv(c, b.H);
      this.au = c.T3 ? this.yv(c.T3, b.H) : null;
      var c = this.Lh,
      d = this.Fa.L2,
      e = null,
      e = d < this.zoom && this.au ? this.au : c,
      f = [],
      h = [],
      k,
      l = [],
      m = [],
      n = [],
      p = new g.qm(0, 0, 0),
      q,
      s = this.zoom,
      m = this.pk || "",
      r = {},
      u = {},
      w,
      v,
      t,
      x,
      y,
      A;
      this.Rc = 1E6 * Math.random() << 0;
      for (q = m.length - 1; 0 <= q; q -= 1) {
        if (k = m[q], !(k.wu < b.opacity)) {
          if (p.z = k.ta.z, p.x = k.ta.x, p.y =
          k.ta.y, p.z === this.ab) {
            r[p + ""] |= 16;
          } else if (p.z < this.ab) {
            if (r[p +
            ""] |= 64, this.ai) {
              for (x = this.ab - p.z, w = Math.max(c.Bc, p.x << x), s =
              Math.min(c.Ac, (p.x + 1 << x) - 1), v = Math.max(c.Zb, p.y << x), t =
              Math.min(c.sc, (p.y + 1 << x) - 1), p.z =
              this.ab, x = w; x <= s; x += 1) {
                for (p.x = x, y = v; y <= t; y += 1) {
                  p.y = y, A = p + "", r[A] |= 32, u[A] =
                  u[A] ? Math.max(k.ta.z, u[A]) : k.ta.z;
                }
              }
            }
          } else if (this.$h) {
            for (w = 1; p.z >= this.ab;) {
              r[p + ""] |= w;
              w = p.x >> 1;
              v = p.y >> 1;
              s = w << 1;
              t = v << 1;
              k = 0;
              for (x = 2; 0 < x; x -= 1) for (p.x = s + x, y = 2; 0 < y; y -= 1) p.y = t + y, r[p + ""] & 5 && (k += 1);
              p.z -= 1;
              p.x = w;
              p.y = v;
              w = 4 === k ? 4 : 2;
            }
          }
        }
      }
      m = [];
      p.z = this.ab;
      q = !0;
      this.ia.AX();
      for (x = e.Bc; x <= e.Ac; x += 1) {
        for (p.x =
             x, y = e.Zb; y <= e.sc; y += 1) {
          p.y = y, k = this.$v(p), this.Mr(k), w =
          !1, k.pa ? (k.Rc = this.Rc, this.Xs(c, x, y) && (m.push(k), this.uj && (k.xc !== this.xc || 1 > k.wu) && (w =
          !0))) : (q = !1, this.Xs(c, x, y) && (w =
          !0), k.status && !k.bf || this.je !== d || this.au && !this.Xs(this.au, x, y) || l.push(k)), w && n.push(k);
        }
      }
      q ? (this.Yz || (this.Yz = !0), this.j.sa || (k =
      {
        key: this.j.fg ? "rl" : "rb",
        index: 1,
        id: this.e.F.id
      }, this.j.X.ej || (g.oe.Je.end(k), g.oe.Je.push({ key: "ftc", Yd: m.length, id: this.e.F.id })))) : this.j.sa =
      !1;
      this.Kf = q;
      m.length && this.Yz && (f.push(m), m.Kf = q);
      h.push(l);
      d = !1;
      if (this.$h) {
        n = n.slice(0);
        e = [];
        for (q = n.length - 1; 0 <= q; q -= 1) k = n[q], r[k.key] & 4 || e.push(k);
        k = b.pd[1];
        for (s = this.ab + 1; n.length && s <= k; s += 1) {
          m = [];
          l = n;
          n = [];
          p.z = s;
          for (q = l.length - 1; 0 <= q; q -= 1) {
            if (x = l[q], w = r[x.key], w & 7) {
              for (w = x.ta.x << 1, v =
              x.ta.y << 1, x = 1; 0 <= x; x -= 1) {
                for (p.x = w + x, y = 1; 0 <= y; y -= 1) {
                  p.y = v + y, A = p + "", t =
                  this.ia.sG(A), r[A] & 5 && t && t.pa
                  ? (t.Oy = !0, t.Rc = this.Rc, m.push(t), this.Mr(t))
                  : n.push(new g.ib(p.jb()));
                }
              }
            }
          }
          m.length && (d = !0, f.push(m));
        }
        n = e;
      }
      if (!d && this.ai) {
        for (x = !f.length || this.Fg ? b.pd[0] : Math.max(b.pd[0], this.ab - 2),
             Math.max(x, this.ab - this.k$), s = this.ab - 1; n.length && s >= x; s -= 1) {
          m = [];
          y = {};
          l = n;
          n = [];
          for (q = l.length - 1; 0 <= q; q -= 1) {
            k = l[q], p.z = s, p.x = k.ta.x >> 1, p.y = k.ta.y >> 1, k =
            this.$v(p), y[k.key] || (y[k.key] = 1, w = !1, k.pa && (!this.nba || r[k.key] & 64)
            ? (p.x =
            Math.min(c.Ac, Math.max(c.Bc, p.x << this.ab - s)), p.y =
            Math.min(c.sc, Math.max(c.Zb, p.y << this.ab - s)), p.z = this.ab, A =
            p + "", "number" === typeof u[A] && k.ta.z > u[A] ? w = !0 : k.Oy = !0, k.Rc =
            this.Rc, m.push(k), this.Mr(k))
            : w = !0, w && n.push(k));
          }
          m.length && f.push(m);
        }
      }
      this.et = this.Go = 0;
      this.$l(h);
      this.Og = f;
      this.j.set("tiles",
      f);
      this.pt(a, b);
    },
    Mr: function (a) {
      this.ia.CA(a.Xta);
      a.zb && this.ia.CA(a.zb.key);
    },
    XM: function (a, b) {
      for (var c = [], d = this.e.F.getCoordsBoundByZoom(a), d = this.yv(d, b, a), e = d.Bc; e < d.Ac; e++) {
        for (var f = d.Zb; f < d.sc; f++) {
          var h = [
            a,
            e,
            f
          ].join("/");
          this.ia.kd(h) || c.push(new g.ib(new g.qm(a, e, f), !0));
        }
      }
      return c;
    },
    CI: function () {
      var a = this.e.F;
      return a.c1 && a.get("preloadMode") && 200 <= this.ia.On && this.j.X.at() && this.Pq && this.jv && this.jv() && this.zoom !== this.ab;
    },
    pt: function (a, b) {
      var c = b.H, d = b.pd;
      if (this.CI() && this.ab >= d[0] + 1) {
        var d =
        [], e = null, e = "out" === this.Pq ? Math.floor(this.zoom) : Math.ceil(this.zoom), e = this.XM(e, c);
        e.length && d.push(e);
        d.length && this.$l(d, !0);
      }
    }
  });
  g.N.Nd.Vh = g.N.Vh.extend({
    r: function (a, b) {
      arguments.callee.oa.apply(this, arguments);
      this.Hn = 120;
      this.xi = !1;
      this.eg();
      this.Se = a.Se;
      this.ln = a.ln;
    },
    Ui: function () {return this.Fb;},
    eg: function () {
      this.Fb = document.createElement("div");
      this.Fb.className = this.j.X.get("className") || "amap-layer";
      this.Js = document.createDocumentFragment();
    },
    ut: function (a) {
      var b = Math.pow(2, a.Q.zoom - this.Ge), c = a.Q.mb.Wa(this.Bq).Uc(this.hj);
      this.transform = { translate: this.transform.translate.add(c), scale: b, rotate: 0 };
      this.mb = a.Q.mb
    },
    rL: function (a, b) {
      if (!this.za || 3E4 < Math.abs(this.mb.x - this.za.x) / this.S || 3E4 < Math.abs(this.mb.y - this.za.y) / this.S) {
        this.za =
        this.mb;
      }
      this.Ge = this.je;
      this.hj = this.zf;
      this.gj = !1;
      this.currentTime = +new Date;
      this.iQ = b.iQ;
      var c = this.Lh;
      this.uj = this.Hn && b.nE;
      var d = this.Og, e = 256 * c.Jw, c = 256 * c.k1;
      this.We = this.zoom << 0 !== this.zoom;
      var f = this.mb.Wa(this.za);
      f.x < -g.a.wa / 2 ? f.x += g.a.wa : f.x > g.a.wa / 2 && (f.x -= g.a.wa);
      this.GL = f.Uc(this.zf);
      return [ d, e, c, b ]
    },
    Nw: function (a, b) {
      var c = this.rL(a, b);
      this.Vq.apply(this, c);
      this.kf(a);
      this.Kf && !this.j.sa && (c = this.j, c.X.ej || g.oe.Je.end({ key: "rb", index: 2, id: this.e.F.id }), c.sa =
      !0, c.ad ? c.ja("renderComplete") : (c.ad = !0, c.ja("complete")))
    },
    bc: function (a, b) {
      this.nr = a.nr;
      this.hg = a.hg;
      this.hm(a, b);
      this.Bq && g.l.Dk && (a.We || a.hg) ? this.ut(a, b) : this.Nw(a, b);
      this.Bq = this.mb;
      this.gj && this.set("display", 0)
    },
    tt: function () {
      for (var a = this.Fb.childNodes, b = a.length - 1; 0 <= b; b -=
      1) {
        a[b] && a[b].xc !== this.xc && this.Fb.removeChild(a[b])
      }
    },
    yG: function (a, b) {return a.Zb === b.Zb && a.Bc === b.Bc && a.sc === b.sc && a.Ac === b.Ac},
    Vq: function (a) {
      var b = this.xc;
      this.xc += 1;
      var c = !1, d, e, f;
      e = !1;
      var h = [];
      this.za.x - this.mb.x < -g.a.wa / 2
      ? this.za = new g.G(this.za.x + g.a.wa, this.za.y)
      : this.za.x - this.mb.x > g.a.wa / 2 && (this.za = new g.G(this.za.x - g.a.wa, this.za.y));
      for (d = a.length - 1; 0 <= d; d -= 1) {
        if (f = a[d], f.length) {
          e = f[0].ta.z;
          for (var k, l, m = this.YG(this.je, e), n = f.length - 1; 0 <= n; n -= 1) {
            l = f[n];
            this.dP(l);
            if (!l.zb && this.za === l.za && l.Ge === this.Ge) {
              var p = l.fc;
              if (p && p.parentNode === this.Fb && 1 === l.wu) {
                h.push(l);
                p.xc = this.xc;
                l.xc = this.xc;
                continue
              }
            }
            l.za = this.za;
            l.Ge = this.Ge;
            k = l.ta;
            var c = !0,
            q = (new g.G((k.x << 20 - e) * this.Yc, (k.y << 20 - e) * this.Yc)).Wa(this.za),
            q = q.Uc(this.zf);
            q.x = Math.floor(q.x);
            q.y = Math.floor(q.y);
            var s = 1;
            if (!l.yS || this.ER && l.xc !== b) l.yS = this.currentTime;
            this.uj && !l.Oy
            ? (p = Math.max(0, Math.abs(k.z - this.zoom) - 1), s =
            Math.min(1, (this.currentTime - l.yS) / (1 / Math.pow(1.32, p) * this.Hn)), 1 !== s && (this.gj = !0))
            : l.Oy = !1;
            l.xc = this.xc;
            l.wu = s;
            l.pa ? (p = l.fc, !p && l.zb && l.zb.fc && (p =
            l.zb.fc), 0 !== s && p && (this.SY(p, q.x, q.y, m, m, s, k.z), p.parentNode !== this.Fb && (g.l.Gh && "overlayer" ===
            this.j.get("type") && (p.style.display = "none"), this.Js.appendChild(p)), p.xc = this.xc, l.je =
            this.je, h.push(l))) : l.Rc = null
          }
          e = !0
        }
      }
      1 < a.length && (this.gj = !0);
      this.pk = h;
      this.tt();
      this.Fb.appendChild(this.Js);
      return c || !e
    },
    dP: function () {},
    kf: function () {this.transform = { translate: this.GL, scale: Math.pow(2, this.zoom - this.je), rotate: 0 }}
  });
  window.CanvasRenderingContext2D && (window.CanvasRenderingContext2D.prototype.VL = function (a, b, c, d, e) {
    "undefined" === typeof e && (e = [ 10, 10 ]);
    this.moveTo(a, b);
    var f = c - a, h = d - b, k = Math.floor(Math.sqrt(f * f + h * h));
    d = f / k;
    c = h / k;
    e.Rf = 0;
    for (var l = [], f = this.HE, m = 0, n = 0, p = !1, q = h = 0; q < e.length; q += 1) {
      e.Rf += e[q], l[q] =
      { Wz: e[q] * d, Xz: e[q] * c, mw: h += e[q] }, f -= e[q], 0 > f && !p && (m = q, n = -f, p = !0);
    }
    for (p = 0; n + p <= k;) {
      n < e[m] ? (f = n * d, h = n * c) : (f = l[m].Wz, h = l[m].Xz), a += f, b += h, this.tB
      ? this.moveTo(a, b)
      : this.lineTo(a, b), p += n, this.tB = !this.tB, n = e[(m + 1) %
      e.length], m = (m + 1) % e.length;
    }
    k -= p;
    a += k * d;
    b += k * c;
    this.tB ? this.moveTo(a, b) : this.lineTo(a, b);
    this.HE = (this.HE + p + k) % e.Rf
  }, window.CanvasRenderingContext2D.prototype.Zfa = function (a, b, c, d) {
    "undefined" === typeof d && (d = [ 10, 10 ]);
    var e = 2 * Math.PI * c, f = 0 >= d ? e : Math.round(e / (d[0] + d[1])), h = (d[0] + d[1]) / e * 2 * Math.PI;
    d = d[0] / e * 2 * Math.PI;
    for (e = 0; e < f; e += 1) this.beginPath(), this.arc(a, b, c, e * h, e * h + d), this.stroke()
  });
  g.N.he.lk = g.N.Vh.extend({
    r: function (a, b) {
      arguments.callee.oa.apply(this, arguments);
      this.eg()
    },
    aN: function () {return this.cb.IP},
    Ui: function () {return this.Fb},
    eg: function () {
      this.Fb = document.createElement("div");
      this.Fb.className = "amap-markers";
      this.cb = new g.N.he.Sc(this.Fb);
      this.cb.j = this.j;
      this.O.J.appendChild(this.Fb)
    },
    jr: function (a, b) {
      this.Js = b.Js;
      this.ow = b;
      this.ef = a.Q.ef;
      this.S = a.Q.S;
      this.zoom = a.Q.zoom;
      this.size = a.size;
      this.Fa = a.Q.Fa;
      this.Jo = a.S;
      this.fb = a.Q.mb;
      this.zg = a.Q.zg;
      var c = !1;
      if (!this.za ||
      500 < Math.abs(this.fb.x - this.za.x) / this.S || 500 < Math.abs(this.fb.y - this.za.y) / this.S) {
        c = !0;
      }
      if (c || this.zoom << 0 !== this.zoom || this.Ge !== this.zoom) this.za = this.fb, this.Ge = this.zoom
    },
    Ts: function (a) {
      var b = a.Q.Fa.mc.y * this.S;
      a = a.Q.Fa.mc.x * this.S;
      return [ this.fb.x - a, this.fb.y - b, this.fb.x + a, this.fb.y + b ]
    },
    tt: function () {
      if (this.ih && this.ih) {
        for (var a in this.ih) {
          if (this.ih.hasOwnProperty(a)) {
            var b = this.ih[a];
            b.Rc !== this.Rc && b.ca && this.O.rk.appendChild(b.ca)
          }
        }
      }
    },
    bc: function (a, b) {
      this.Rc = 1E6 * Math.random() << 0;
      this.jr(a,
      b);
      this.Q = a.Q;
      this.size = a.size;
      var c = this.j;
      this.Yc = 256;
      var d, e;
      e = this.Ts(a);
      var f = 0;
      c.Tl && (f = 50 * this.S);
      e[0] -= this.j.Ue * this.S + f;
      e[1] -= this.j.Bf * this.S + f;
      e[2] += this.j.Ue * this.S + f;
      e[3] += this.j.Bf * this.S + f;
      c = c.Rl(e);
      for (d in c) c.hasOwnProperty(d) && (c[d].Rc = this.Rc, c[d].E_ = this);
      this.tt(c);
      this.jr.call(this.cb, a, b);
      this.cb.iB(c);
      this.ih = c;
      this.kf(a)
    },
    kf: function () {
      var a = Math.pow(2, this.zoom - this.je);
      this.transform = { translate: this.za.Wa(this.fb).Uc(this.S), scale: a, rotate: 0 }
    }
  });
  g.N.he.Sc = g.Z.extend({
    r: function (a) {this.Wj = a}, iB: function (a, b) {
      var c = document.createDocumentFragment(), d = b && b.EN ? null : {}, e = !0, f;
      for (f in a) {
        if (a.hasOwnProperty(f)) {
          var h = a[f], k, l = h.get("params");
          if (h.ca) {
            k = h.ca;
          } else {
            k = g.g.create("div");
            k.className = "amap-marker";
            var m = l.Ag, n = l.m2;
            m && k.appendChild(m);
            n && k.appendChild(n);
            h.ca = k;
            h.Ag = m;
            if (n = l.title) m.title = n;
            this.j.Tl = !0;
            -1 === g.a.indexOf(this.j.jg, h) && this.j.jg.push(h);
            h.uf = !0
          }
          var m = l.offset, n = m.x, p = m.y, q = l.textAlign, s = l.verticalAlign, m = !1, r, u;
          if ("AMap.Text" == h.tz) {
            if (u = r = 0, k.parentNode !== this.Wj && d && (m = !0, d[f] = h, e = !1), !m) {
              var w = g.g.Sv(h.Ag),
              v = w[0],
              w = w[1];
              switch (q) {
                case "center":
                  r = v / 2;
                  break;
                case "right":
                  r = v
              }
              switch (s) {
                case "middle":
                  u = w / 2;
                  break;
                case "bottom":
                  u = w
              }
              n -= r;
              p -= u
            }
          } else {
            r = -n, u = -p;
          }
          if (h.uf) {
            q = [], s = this.dq(h.ba.Na), h.za = this.za, v = l.vQ, p = Math.round(s[1] + p + v.y), n =
            Math.round(s[0] + n + v.x), q.push("top:" + p + "px"), q.push("left:" + n + "px"), q.push("z-index:" + (l.s_
            ? this.j.dp + 10
            : l.zIndex)), g.l.ee || q.push(g.g.hZ(k, l.qv, { x: r, y: u })), q.push("display:" + (l.visible ? "block" :
            "none") + ";"), k.style.cssText = q.join(";"), (r = l.label) && r.content && (l = l.x_, n =
            p = 0, r.offset && (p = r.offset.y + "px", n = r.offset.x + "px"), l.style.top = p, l.style.left =
            n, k.appendChild(l));
          } else if (h.X4 || this.zoom << 0 !== this.zoom || h.zoom !== this.zoom || k.parentNode !== this.Wj || h.za !== this.za) {
            s =
            this.dq(h.ba.Na), h.za = this.za, v = l.vQ, p = Math.round(s[1] + p + v.y), n =
            Math.round(s[0] + n + v.x), k.style.top = p + "px", k.style.left = n + "px";
          }
          h.zoom = this.zoom;
          k.parentNode !== this.Wj && (g.l.Gh && g.a.iepngFix(k), c.appendChild(k), h.uf = m);
          k.Sy = this.Wj
        }
      }
      this.Wj.appendChild(c);
      e || this.iB(d, { EN: !0 })
    }, dq: function (a) {
      var b = a[0] - this.za.x;
      b > g.a.wa / 2 ? b -= g.a.wa : b < -g.a.wa / 2 && (b += g.a.wa);
      return [ b / this.S, (a[1] - this.za.y) / this.S ]
    }
  });
  var Ac = g.w, Sc = g.l, ec = g.Z.As, Tc = g.Ola, ga = document, Uc = !0, Vc = [];
  Sc.hf && Vc.push("touch");
  Sc.Y || Vc.push("mouse");
  Sc.bH && (Vc.push("vectorlayer", "overlay"), Sc.ap ? Vc.push("wgl") : Vc.push("cmng", "cgl"));
  if (Tc) {
    for (var Wc = [], Xc = Tc.split(","), vc = 0; vc < Xc.length; vc += 1) {
      var Yc = Xc[vc];
      ec[Yc] && Wc.push.apply(Wc, ec[Yc]);
      Wc.push(Yc)
    }
    Vc = Vc.concat(Wc)
  }
  Vc.push("sync");
  console.log(Sc);
  if (Sc.Fq) {
    var Zc = !0, $c = [], ad = [];
    try {
      for (var vc = 0, bd = Vc.length; vc < bd; vc++) {
        var cd = JSON.parse(localStorage.getItem("_AMap_" + Vc[vc]));
        if (cd && cd.version === Ac.Ci) {
          $c.push(cd.script), cd.css && ad.push(cd.css);
        } else {
          $c = void 0;
          Zc = !1;
          break
        }
      }
    } catch (dd) {$c = ad = void 0, Zc = !1}
    if (Zc) {
      try {
        ad.length && ed();
        var fd = $c.join(";");
        eval(fd)
      } catch (gd) {Uc = !1}
    } else {
      Uc = !1
    }
  } else {
    Uc = !1;
  }
  console.log(Uc);
  if (Uc) for (vc = 0; vc < Vc.length; vc += 1) {
    g.pb.Mz(Vc[vc]).status = 1;
  } else Ac.BA = !1, hd();

  function id () {
    console.log("id");
    for (var a = ga.getElementsByTagName("script"), b, c = 0; c < a.length; c +=
    1) {
      if (0 === a[c].src.indexOf(Ac.Db + "/maps?")) {
        b = a[c];
        break
      }
    }
    return Ac.yc || b && b.async
  }

  function hd () {
    var a = Ac.Db + "/maps/modules?v=" + Ac.Op + "&key=" + Ac.key + "&vrs=" + Ac.Ci + "&m=" + Vc.join(",");
    id()
    ? jd(a)
    : (ga.write('<script crossorigin="anonymous" id="amap_plus_js" src="' + a + '" type="text/javascript">\x3c/script>'), setTimeout(function () {ga.getElementById("amap_plus_js") || jd(a)}, 1))
  }

  function jd (a) {
    var b = ga.createElement("script");
    b.charset = "utf-8";
    b.src = a;
    b.id = "amap_plus_js";
    (a = ga.head || ga.getElementsByTagName("head")[0] || ga.body) && a.appendChild(b)
  }

  function ed () {
    var a = ad.join("\n"), b = ga.createElement("style");
    b.type = "text/css";
    -1 === Ac.Db.indexOf("webapi.amap.com") && (a = a.replace(/webapi.amap.com/gi, Ac.Db.split("://")[1]));
    "https" === Ac.Sb && (a = a.replace(/http:/gi, "https:"));
    if (b.styleSheet) {
      var c = function () {try {b.styleSheet.cssText = a} catch (c) {}};
      b.styleSheet.disabled ? setTimeout(c, 10) : c()
    } else {
      b.appendChild(ga.createTextNode(a));
    }
    c = ga.head || ga.getElementsByTagName("head")[0];
    2 > c.childNodes.length ? c.appendChild(b) : c.insertBefore(b, c.childNodes[1])
  }
  ;
})
([
  "fbc043611829448a8d799c0a5fef544a",
  [ 105.28976, 28.160225, 110.199858, 32.201187, 106.504962, 29.533155 ],
  "https://webapi.amap.com",
  1,
  "1.4.11",
  null,
  "500000",
  "AMap.Geocoder,AMap.PlaceSearch",
  true,
  false,
  false,
  true,
  "1568726473-20190807-1",
  false
])
