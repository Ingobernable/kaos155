window.graph = {
    height: 500,
    MaxChildrenToExpand: 5000,
    translate: [0, 0],
    scale: 0.3,
    isFullScreen: !1,
    root: null,
    svglinks: null,
    svgnodes: null,
    nodes: null,
    links: null,
    dragX: null,
    dragY: null,
    nodeHasMoved: null,
    zoom: null,
    oldWheelEvent: null,
    lastWidth: null,
    lastHeight: null,
    applyRefCount: null,
    urlParams: null,
    refresh: function (gravity) {
        if (this.svg && this.svg.length>0)
            this.svg.selectAll('*').remove();

        this.force = d3.layout.force()
            .size([this.width, this.height])
            .linkDistance(this.getLinkDistance)
            .charge(this.getNodeCharge)
            .gravity(gravity)
            .on("tick", this.tick)
    },
    prepare: function (gravity) {
        this.width = d3.select("body").node().getBoundingClientRect().width
        this.cx = this.width / 2 - 50
        this.cy = this.height / 2
        //debugger
        this.refresh(gravity)

        this.drag = this.force.drag() //.on("dragstart", dragStart).on("dragend", dragEnd),
        this.svg = d3.select("#relations")
        this.ui = this.svg.append("g").attr("z-order", "1000")
        this.zoomContainer = this.svg.append("g")
        this.zoomContainer.append("g").attr("id", "links");
        this.zoomContainer.append("g").attr("id", "nodes");
        this.zoomContainer.append("g").attr("id", "nodetexts");
        this.svglinks = this.zoomContainer.select("#links").selectAll(".link");
        this.svgnodes = this.zoomContainer.select("#nodes").selectAll(".node");
        //this.setupUI();
        this.nodeHasMoved = !1;
        this.zoom = d3.behavior.zoom().scaleExtent([.3, 1.5]).on("zoom", this.zoomed);
        this.svg.call(this.zoom);
        //this.oldWheelEvent = this.svg.on("wheel.zoom");
        //this.disableWheelZoom();
        this.applyRefCount = 0;

    },
    callbackLoadNodes: function (Nodes) {
        //rutina injectada
    },
    callbackMarkNodes: function (Nodes) {
        //rutina injectada
    },

    createBaseGraph: function (n, _cb,_cbMark ) {

        this.callbackLoadNodes = _cb
        this.callbackMarkNodes = _cbMark


        var _root = this.root = n
        //debugger
        return this.root = n,
            this.root.x = this.cx,
            this.root.y = this.cy,
            this.root.fixed = !0,
            this.nodes = [this.root],
            this.links = [],
            this.callbackLoadNodes(this.root),
            this.restorePermalink() || this.expandNode(this.root, function (n) {

            App.root.prepare(3)
            window.graph.addRelationsToGraph(_root, n)
                //debugger
                window.graph.update()

            }), _root
    },
    addRelationsToGraph: function (n, t) {
        //if (!t || t.Nodes.length > this.MaxChildrenToExpand) {
        //    this.showError("El elemento tiene demasiadas relaciones para mostrarlas.<br/>Haga click en el nombre para abrirlo en una pagina nueva.");
        //    return
        //}
        //t.x = 0
        //t.y=0
        //if (t.Type == 2)
        //    debugger
        //debugger
        this.callbackLoadNodes(t.Nodes, n )
        return n.children = t.Nodes, this.wireChildren(n), n
    },
    getLinkDistance: function (n) {
        var t, i;
        const r = 130,
            u = 300;

        var  _resp = (t = n.target, !t.children) ? r : (i = r + t.children.length * 10, i > u ? u : i)
        //console.log(_resp)

        //console.log(_resp)
        return _resp
    },
    getNodeCharge: function (n) {
        var t = window.graph.getNodeRadius(n);
        return -(t * 300)
    },
    getNodeRadius: function (n) {
        if (n.radius !== undefined) return n.radius;
        if (n.Type === 1) n.radius = 10;
        else {
            var t = 10;
            n.radius = t //n.ActiveRelations <= 1 ? t : Math.log(n.ActiveRelations) * 3 + t
        }
        return n.radius
    },
    wireChildren: function (n) {
        //if (_.isNaN(n.x) || _.isNaN(n.y))
            //debugger
        n !== null && n.children !== null && n.children.forEach(function (t) {
            var i = t.Active & 1,
                r = window.graph.getTargetNode(t);

            //if (_.isNaN(n.x) || _.isNaN(r.target.x))
            //    debugger

            window.graph.links.push({
                source: n,
                target: r.target,
                active: i,
                roles: t.Roles
            })
        })
    },
    tick: function () {
        window.graph.svglinks.attr("x1", function (n) {
            return n.source.x
        }).attr("y1", function (n) {
            return n.source.y
        }).attr("x2", function (n) {
            return n.target.x
        }).attr("y2", function (n) {
            return n.target.y
        });
        window.graph.svgnodes.attr("transform", window.graph.transform)
    },
    transform: function (n) {
        return "translate(" + n.x + "," + n.y + ")"
    },
    getTargetNode: function (n) {
        var t;
        return this.contains(this.nodes, n, function (n) {
            t = n
        }) ? {
                existing: !0,
                target: t
            } : (this.nodes.push(n), {
                existing: !1,
                target: n
            })
    },
    contains: function (n, t, i) {
        for (var u, r = 0; r < n.length; ++r)
            if (u = n[r], u.Id === t.Id) return i && i(u), !0;
        return !1
    },
    restorePermalink: function () {
        var t = this.urlParams.chart,
            n;
        return t === undefined ? !1 : (n = this.deserializePermaList(t), this.restorePosition(n.shift()), applyPermalink(root, n, update), !0)
    },
    serializePermaList: function (n) {
        return btoa(JSON.stringify(n))
    },
    deserializePermaList: function (n) {
        var t = atob(n);
        return JSON.parse(t)
    },
    applyPermalink: function (n, t, i) {
        var _this = this
        for (var r, f, u = 0; u < t.length; ++u)
            if ((r = t[u], r !== null) && n.Id === r[0]) {
                if (n.x = r[1], n.y = r[2], n.fixed = r[3] && 1, t[u] = null, f = (r[3] && 2) >> 1, !f) break;
                _this.applyRefCount++;
                _this.expandNode(n, function (r) {
                    _this.addRelationsToGraph(n, r);
                    n.children !== undefined && n.children.forEach(function (n) {
                        _this.applyPermalink(n, t, i)
                    });
                    _this.applyRefCount--;
                    _this.applyRefCount === 0 && i && i()
                });
                break
            }
    },
    nodeClick(n) {
        window.graph.nodeHasMoved || n.children !== undefined 
    },
    expandNode: function (n, t) {
       // var i = n.ActiveRelations;
       // if (i !== undefined && i > this.MaxChildrenToExpand) {
       //     this.showError("El elemento tiene demasiadas relaciones para mostrarlas.<br/>Haga click en el nombre para abrirlo en una pagina nueva.");
       //     return
       // }
        if(!n.Mark)
            if (n.Nodes != null || n.Type>1) {
                t(n)
            } else {
                //d3.json("/relations/" + n.id, t);
                var url = '/relations/' + $('#stateAsk').val() + '/' + n.Id + '/' + $('#parent').val()
                console.log(url)
                d3.json(url, t);

                
            }
    },
    update: function () {
        this.force.nodes(this.nodes).links(this.links).start();
        this.svglinks = this.svglinks.data(this.links, function (n) {
            return n.source.Id + "->" + n.target.Id
        });
        this.svglinks.exit().remove();
        this.svglinks.enter().insert("line").attr("class", function (n) {
            //console.log(n)
            return "link " + (n.active ? "activelink" : "inactivelink") //+ (n.Mark?" Mark":"")
        }).attr("x1", function (n) {
            return n.source.x
        }).attr("y1", function (n) {
            return n.source.y
        }).attr("x2", function (n) {
            return n.target.x
        }).attr("y2", function (n) {
            return n.target.y
        }).attr("data_source", function (n) {
            return n.source.Id
        }).attr("data_target", function (n) {
            return n.target.Id 
        }) //.on("mouseenter", showRoles).on("mouseleave", hideRoles)

        this.svgnodes = this.svgnodes.data(this.nodes, function (n) {
            return n.Id
        });

        this.svgnodes.exit().remove();
        this.nodesEnter = this.svgnodes.enter();
        this.newNodes = this.nodesEnter.append("g").call(this.force.drag);
        this.newNodes.append("circle")
            .attr("r", this.getNodeRadius)
            .attr("class", this.getNodeClass)
            .attr("data_key", function (n) {
                return n.Id
            })
            .on("click", this.nodeClick)
            //.on("dblclick", nodeDblClick)
            .classed("fixed", function (n) {
                return n.fixed
            });

        this.newNodes.append("text").attr("y", function (n) {
            return n.Type === 1 ? 22 : -12
        }).attr("class", function (n) {
            return "nodetext" + (n.Id === window.graph.root.Id ? " nopointer" : "")
        }).attr("text-anchor", "middle").text(function (n) {
            return n.Name
        }).attr("data_key", function (n) {
            return n.Id
        }) //.on("click", textClick);

        this.withRelations = this.newNodes.filter(function (n) {
            return n.Type > 1 && n.ActiveRelations !== undefined && n.ActiveRelations > 1
        });
     /*   this.withRelations.append("circle").attr("class", "nodenumrelsback").attr("r", 9).attr("cx", function (n) {
            return n.radius * .707106 + 1
        }).attr("cy", function (n) {
            return -(n.radius * .707106 + 1)
        }).attr("data_key", function (n) {
            return n.Id
        });
   
        this.withRelations.append("text").text(function (n) {
            return n.ActiveRelations
        }).attr("class", "nodenumrelstext").attr("text-anchor", "middle").attr("x", function (n) {
            return n.radius * .707106 + 1
        }).attr("y", function (n) {
            return -(n.radius * .707106 + 1) + 3.5
        }).attr("data_key", function (n) {
            return n.Id
        })
        //this.callbackLoadNodes(this.nodes)
     */
    },
    getNodeClass: function (n) {
        if (n.Mark)
            App.root.callbackMarkNodes(n)

        console.log(n.Type)
        switch (n.Type) {
            case 0:
                return "node company" + (n.Mark ? " Mark" : "");
            case 1:
                return "node person" + (n.JuridicId > 0 ? " juridic" : "") +  (n.Mark ? " Mark" : "") 
        }
    },
    zoomed: function () {
        window.graph.translate = window.graph.zoom.translate();
        window.graph.scale = window.graph.zoom.scale();
        window.graph.zoomContainer.attr("transform", "translate(" + window.graph.translate + ")scale(" + window.graph.scale + ")")
    },
    searchParent: function (parent, data) {
        var root = this.root
        var _exit = root
        //debugger
        if (parent != "/")
            $(parent.split("/")[0]).each(function (i, item) {

            })
        return _exit
    },
    showError: function (text) {

    },
    urlParams: function (n) {
        var r, t, i;
        if (n == "") return {};
        for (r = {}, t = 0; t < n.length; ++t) i = n[t].split("=", 2), r[i[0]] = i.length == 1 ? "" : decodeURIComponent(i[1].replace(/\+/g, " "));
        return r
    }(window.location.search.substr(1).split("&"))
}
