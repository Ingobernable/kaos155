function createBaseGraph(n) {
    return root = n, root.x = cx, root.y = cy, root.fixed = !0, nodes = [root], links = [], restorePermalink() || expandNode(root, function (n) {
        addRelationsToGraph(root, n);
        update()
    }), root
}

function addRelationsToGraph(n, t) {
    if (!t || t.Nodes.length > MaxChildrenToExpand) {
        showError("El elemento tiene demasiadas relaciones para mostrarlas.<br/>Haga click en el nombre para abrirlo en una pagina nueva.");
        return
    }
    return n.children = t.Nodes, wireChildren(n), n
}

function wireChildren(n) {
    n !== null && n.children !== null && n.children.forEach(function (t) {
        var i = t.Active & 1,
            r = getTargetNode(t);
        links.push({
            source: n,
            target: r.target,
            active: i,
            roles: t.Roles
        })
    })
}

function getTargetNode(n) {
    var t;
    return contains(nodes, n, function (n) {
        t = n
    }) ? {
            existing: !0,
            target: t
        } : (nodes.push(n), {
            existing: !1,
            target: n
        })
}

function update() {
    force.nodes(nodes).links(links).start();
    svglinks = svglinks.data(links, function (n) {
        return n.source.Id + "->" + n.target.Id
    });
    svglinks.exit().remove();
    svglinks.enter().insert("line").attr("class", function (n) {
        return "link " + (n.active ? "activelink" : "inactivelink")
    }).attr("x1", function (n) {
        return n.source.x
    }).attr("y1", function (n) {
        return n.source.y
    }).attr("x2", function (n) {
        return n.target.x
    }).attr("y2", function (n) {
        return n.target.y
    }).on("mouseenter", showRoles).on("mouseleave", hideRoles);
    svgnodes = svgnodes.data(nodes, function (n) {
        return n.Id
    });
    svgnodes.exit().remove();
    nodesEnter = svgnodes.enter();
    newNodes = nodesEnter.append("g").call(force.drag);
    newNodes.append("circle").attr("r", getNodeRadius).attr("class", getNodeClass).on("click", nodeClick).on("dblclick", nodeDblClick).classed("fixed", function (n) {
        return n.fixed
    });
    newNodes.append("text").attr("y", function (n) {
        return n.Type === 1 ? 30 : n.radius + 15
    }).attr("class", function (n) {
        return "nodetext" + (n.Id === root.Id ? " nopointer" : "")
    }).attr("text-anchor", "middle").text(function (n) {
        return n.Name
    }).on("click", textClick);
    withRelations = newNodes.filter(function (n) {
        return n.Type > 1 && n.ActiveRelations !== undefined && n.ActiveRelations > 1
    });
    withRelations.append("circle").attr("class", "nodenumrelsback").attr("r", 9).attr("cx", function (n) {
        return n.radius * .707106 + 1
    }).attr("cy", function (n) {
        return -(n.radius * .707106 + 1)
    });
    withRelations.append("text").text(function (n) {
        return n.ActiveRelations
    }).attr("class", "nodenumrelstext").attr("text-anchor", "middle").attr("x", function (n) {
        return n.radius * .707106 + 1
    }).attr("y", function (n) {
        return -(n.radius * .707106 + 1) + 3.5
    })
}

function tick() {
    svglinks.attr("x1", function (n) {
        return n.source.x
    }).attr("y1", function (n) {
        return n.source.y
    }).attr("x2", function (n) {
        return n.target.x
    }).attr("y2", function (n) {
        return n.target.y
    });
    svgnodes.attr("transform", transform)
}

function contains(n, t, i) {
    for (var u, r = 0; r < n.length; ++r)
        if (u = n[r], u.Id === t.Id) return i && i(u), !0;
    return !1
}

function getLinkDistance(n) {
    var t, i;
    const r = 150,
        u = 300;
    return (t = n.target, !t.children) ? r : (i = r + t.children.length * 15, i > u ? u : i)
}

function getNodeCharge(n) {
    var t = getNodeRadius(n);
    return -(t * 100)
}

function getNodeClass(n) {
    switch (n.Type) {
        case 1:
            return "node company";
        case 2:
        case 3:
            return "node person" + (n.JuridicId > 0 ? " juridic" : "")
    }
}

function getNodeRadius(n) {
    if (n.radius !== undefined) return n.radius;
    if (n.Type === 1) n.radius = 15;
    else {
        var t = 10;
        n.radius = n.ActiveRelations <= 1 ? t : Math.log(n.ActiveRelations) * 3 + t
    }
    return n.radius
}

function transform(n) {
    return "translate(" + n.x + "," + n.y + ")"
}

function dragStart() {
    var n = d3.event.sourceEvent;
    n.stopPropagation();
    dragX = n.x;
    dragY = n.y
}

function dragEnd(n) {
    d3.select(this).select("circle").classed("fixed", n.fixed = !0);
    var t = d3.event.sourceEvent;
    nodeHasMoved = t.x !== dragX || t.y !== dragY
}

function nodeDblClick(n) {
    d3.select(this).classed("fixed", n.fixed = !1)
}

function nodeClick(n) {
    nodeHasMoved || n.children !== undefined || expandNode(n, function (t) {
        addRelationsToGraph(n, t);
        update()
    })
}

function expandNode(n, t) {
    var i = n.ActiveRelations;
    if (i !== undefined && i > MaxChildrenToExpand) {
        showError("El elemento tiene demasiadas relaciones para mostrarlas.<br/>Haga click en el nombre para abrirlo en una pagina nueva.");
        return
    }
    switch (n.Type) {
        case 1:
            d3.json("/Empresa/Relaciones/" + n.CompanyId, t);
            break;
        case 2:
        case 3:
            d3.json("/Directivo/Relaciones/" + n.PersonId, t)
    }
}

function textClick(n) {
    if (!nodeHasMoved && n.Id !== root.Id) switch (n.Type) {
        case 1:
            n.CompanyId !== undefined && window.open("/Empresa/" + n.CompanyId, "_blank");
            break;
        default:
            n.JuridicId === undefined || n.JuridicId === 0 || n.JuridicId === -1 ? window.open("/Directivo/" + n.PersonId, "_blank") : window.open("/Empresa/" + n.JuridicId, "_blank")
    }
}

function showRoles(n) {
    $("#linkroles .roles").text("Cargos: " + n.roles)
}

function hideRoles() {
    $("#linkroles .roles").text("")
}

function zoomed() {
    translate = zoom.translate();
    scale = zoom.scale();
    zoomContainer.attr("transform", "translate(" + translate + ")scale(" + scale + ")")
}

function enableWheelZoom() {
    svg.on("wheel.zoom", oldWheelEvent).on("onwheel.zoom", oldWheelEvent).on("onmousewheel.zoom", oldWheelEvent).on("mousewheel.zoom", oldWheelEvent)
}

function disableWheelZoom() {
    svg.on("dblclick.zoom", null).on("wheel.zoom", null).on("onwheel.zoom", null).on("onmousewheel.zoom", null).on("mousewheel.zoom", null)
}

function showError(n) {
    $("#uierror .grapherror").html(n).clearQueue().fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).delay(2e4).fadeOut()
}

function setupUI() {
    $("#ui #showhelp").click(showHelp);
    $("#ui #closehelp").click(hideHelp);
    $("#ui #options").click(function () {
        $("#uilargeoptions").toggle()
    });
    $("#ui #fullscreen").click(toggleFullScreen);
    $("#ui #pin").click(unpinNodes);
    $("#ui #permalink").click(showPermalink);
    $("#ui #saveimage").click(downloadPng);
    d3.select("#ui #zoomin").on("click", function () {
        setzoom(1)
    });
    d3.select("#ui #zoomout").on("click", function () {
        setzoom(-1)
    });
    checkShowHelp()
}

function checkShowHelp() {
    var n = localStorage.getItem("showHelp");
    n !== undefined && n === "no" ? hideHelp() : showHelp()
}

function showHelp() {
    $("#help").show();
    localStorage.setItem("showHelp", "yes")
}

function hideHelp() {
    $("#help").hide();
    localStorage.setItem("showHelp", "no")
}

function toggleFullScreen() {
    isFullScreen = !isFullScreen;
    var n = d3.select("#graph_container");
    n.classed("fullscreen", isFullScreen);
    isFullScreen ? enableWheelZoom() : disableWheelZoom()
}

function unpinNodes() {
    nodes.forEach(function (n) {
        n !== root && (svgnodes.classed("fixed", !1), n.fixed = !1)
    });
    force.start()
}

function showPermalink() {
    $("#ui #permalinkbox").show();
    $("#ui #permalinkbox input").attr("value", getPermalink()).select()
}

function interpolateZoom(n, t) {
    var i = this;
    return d3.transition().duration(350).tween("zoom", function () {
        var i = d3.interpolate(zoom.translate(), n),
            r = d3.interpolate(zoom.scale(), t);
        return function (n) {
            zoom.scale(r(n)).translate(i(n));
            zoomed()
        }
    })
}

function setzoom(n) {
    var s = d3.event.target,
        i = 1,
        r = [width / 2, height / 2],
        e = zoom.scaleExtent(),
        o = zoom.translate(),
        u = [],
        f = [],
        t = {
            x: o[0],
            y: o[1],
            k: zoom.scale()
        };
    if (d3.event.preventDefault(), i = zoom.scale() * (1 + .2 * n), i < e[0] || i > e[1]) return !1;
    u = [(r[0] - t.x) / t.k, (r[1] - t.y) / t.k];
    t.k = i;
    f = [u[0] * t.k + t.x, u[1] * t.k + t.y];
    t.x += r[0] - f[0];
    t.y += r[1] - f[1];
    interpolateZoom([t.x, t.y], t.k)
}

function downloadPng() {
    for (var t, e, i, r, l, f = "\n", a = ["graph.css"], u = 0; u < document.styleSheets.length; u++)
        if (t = document.styleSheets[u], t.href && (e = t.href.split("/").pop(), a.indexOf(e) != -1 && (i = t.rules, i)))
            for (r = 0; r < i.length; r++) f += i[r].cssText + "\n";
    var o = d3.select("svg"),
        s = d3.select("#graph_container"),
        n = new Image,
        v = new XMLSerializer,
        h = s.node().clientWidth,
        c = s.node().clientHeight;
    o.insert("defs", ":first-child");
    d3.select("svg defs").append("style").attr("type", "text/css").html(f);
    l = v.serializeToString(o.node());
    d3.select("svg defs style").remove();
    n.onload = function () {
        var s = d3.select("body").append("canvas").attr("id", "tmpcanvas").style("display", "none"),
            t = document.getElementById("tmpcanvas"),
            e = t.getContext("2d"),
            f, r, o, i, u;
        t.width = h;
        t.height = c;
        e.drawImage(n, 0, 0);
        f = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
        f ? (r = t.toDataURL("image/png;base64"), o = window.open(r, "download"), window.location = r) : (i = document.createElement("a"), i.download = "diagrama_de_relaciones.png", i.href = t.toDataURL("image/png;base64"), u = document.createEvent("MouseEvents"), u.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), i.dispatchEvent(u));
        d3.select("#tmpcanvas").remove()
    };
    n.width = h;
    n.height = c;
    n.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(l)))
}

function restorePermalink() {
    var t = urlParams.chart,
        n;
    return t === undefined ? !1 : (n = deserializePermaList(t), restorePosition(n.shift()), applyPermalink(root, n, update), !0)
}

function restorePosition(n) {
    zoom.translate([n[0], n[1]]);
    zoom.scale([n[2]]);
    zoom.event(svg)
}

function applyPermalink(n, t, i) {
    for (var r, f, u = 0; u < t.length; ++u)
        if ((r = t[u], r !== null) && n.Id === r[0]) {
            if (n.x = r[1], n.y = r[2], n.fixed = r[3] && 1, t[u] = null, f = (r[3] && 2) >> 1, !f) break;
            applyRefCount++;
            expandNode(n, function (r) {
                addRelationsToGraph(n, r);
                n.children !== undefined && n.children.forEach(function (n) {
                    applyPermalink(n, t, i)
                });
                applyRefCount--;
                applyRefCount === 0 && i && i()
            });
            break
        }
}

function getPermalink() {
    var n = [
        [translate[0], translate[1], scale]
    ],
        t;
    return getPermalinkList(root, n), t = window.location.href.split("?")[0], t + "?chart=" + serializePermaList(n)
}

function getPermalinkList(n, t) {
    n !== undefined && (n.fixed && t.push(getPermalinkNodeData(n)), n.children !== undefined) && n.children.forEach(function (n) {
        n.children !== undefined && (n.fixed || t.push(getPermalinkNodeData(n)), getPermalinkList(n, t))
    })
}

function getPermalinkNodeData(n) {
    var t = (n.children !== undefined) << 1;
    return [n.Id, Math.round(n.x), Math.round(n.y), n.fixed + t]
}

function serializePermaList(n) {
    return btoa(JSON.stringify(n))
}

function deserializePermaList(n) {
    var t = atob(n);
    return JSON.parse(t)
}
var MaxChildrenToExpand = 100,
    width = d3.select(".body-content").node().getBoundingClientRect().width,
    height = 500,
    cx = width / 2 - 50,
    cy = height / 2,
    translate = [0, 0],
    scale = 1,
    isFullScreen = !1,
    force = d3.layout.force().size([width, height]).linkDistance(getLinkDistance).charge(getNodeCharge).gravity(.01).on("tick", tick),
    drag = force.drag().on("dragstart", dragStart).on("dragend", dragEnd),
    svg = d3.select("#relations"),
    ui = svg.append("g").attr("z-order", "1000"),
    zoomContainer = svg.append("g"),
    root, svglinks, svgnodes, nodes, links, dragX, dragY, nodeHasMoved, zoom, oldWheelEvent, lastWidth, lastHeight, applyRefCount, urlParams;
zoomContainer.append("g").attr("id", "links");
zoomContainer.append("g").attr("id", "nodes");
zoomContainer.append("g").attr("id", "nodetexts");
svglinks = zoomContainer.select("#links").selectAll(".link");
svgnodes = zoomContainer.select("#nodes").selectAll(".node");
setupUI();
nodeHasMoved = !1;
zoom = d3.behavior.zoom().scaleExtent([.3, 1.5]).on("zoom", zoomed);
svg.call(zoom);
oldWheelEvent = svg.on("wheel.zoom");
disableWheelZoom();
applyRefCount = 0;
urlParams = function (n) {
    var r, t, i;
    if (n == "") return {};
    for (r = {}, t = 0; t < n.length; ++t) i = n[t].split("=", 2), r[i[0]] = i.length == 1 ? "" : decodeURIComponent(i[1].replace(/\+/g, " "));
    return r
}(window.location.search.substr(1).split("&"));
$(function () {
    function f() {
        for (var i = "", r = t - 2008, n = 2009; n <= t; ++n) i += '<span class="tl-date" style="width: ' + 100 / r + '%;">' + n + "<\/span>";
        return i
    }

    function e(t) {
        var l = t.attr("timeline-startdate"),
            e = t.attr("timeline-enddate"),
            o = u(l),
            s = u(e),
            f;
        if (s === undefined && (f = new Date, s = new Date(f.getFullYear(), f.getMonth(), f.getDate()), e = "Hoy"), n <= o && o <= i) {
            t.removeClass("date");
            t.addClass("tl-start");
            t.parent().find("td").addClass("tl-nowrap");
            var a = t.width(),
                h = r(o, a),
                v = r(s, a),
                c = v - h;
            c < 10 && (c = 10, h -= 5);
            t.html('<span class="tl-active" title="' + l + " - " + e + '" style="width: ' + c + "px; margin-left: " + h + 'px;"><\/span>')
        }
    }

    function r(t, r) {
        var f = 5,
            e = t - n,
            o = i - n,
            u = Math.round(e / o * r);
        return u > r - f && (u = r - f), u
    }

    function u(n) {
        if (n !== undefined) {
            var t = n.match(/(\d+)\/(\d+)\/(\d+)/);
            return new Date(t[3], t[2] - 1, t[1])
        }
    }
    var n = new Date(2009, 0, 1),
        t = (new Date).getFullYear(),
        i = new Date(t, 11, 31);
    $(".timelineheader").removeClass("date").addClass("tl-header").html(f());
    $(".timelinestart").each(function () {
        e($(this))
    })
});