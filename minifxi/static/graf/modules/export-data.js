/*
 Highcharts JS v6.2.0 (2018-10-17)
 Exporting module

 (c) 2010-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (e) {
    "object" === typeof module && module.exports ? module.exports = e : "function" === typeof define && define.amd ? define(function () {
        return e
    }) : e(Highcharts)
})(function (e) {
    (function (a) {
        a.ajax = function (e) {
            var c = a.merge(!0, {
                url: !1,
                type: "GET",
                dataType: "json",
                success: !1,
                error: !1,
                data: !1,
                headers: {}
            }, e);
            e = {
                json: "application/json",
                xml: "application/xml",
                text: "text/plain",
                octet: "application/octet-stream"
            };
            var m = new XMLHttpRequest;
            if (!c.url) return !1;
            m.open(c.type.toUpperCase(), c.url, !0);
            m.setRequestHeader("Content-Type", e[c.dataType] || e.text);
            a.objectEach(c.headers, function (a, c) {
                m.setRequestHeader(c, a)
            });
            m.onreadystatechange = function () {
                var a;
                if (4 === m.readyState) {
                    if (200 === m.status) {
                        a = m.responseText;
                        if ("json" === c.dataType) try {
                            a = JSON.parse(a)
                        } catch (g) {
                            c.error && c.error(m, g);
                            return
                        }
                        return c.success && c.success(a)
                    }
                    c.error && c.error(m, m.responseText)
                }
            };
            try {
                c.data = JSON.stringify(c.data)
            } catch (t) {}
            m.send(c.data || !0)
        }
    })(e);
    (function (a) {
        var e = a.defined,
            c = a.each,
            m = a.pick,
            t = a.win,
            g = t.document,
            p = a.seriesTypes,
            E = void 0 !== g.createElement("a").download;
        a.setOptions({
            exporting: {
                csv: {
                    columnHeaderFormatter: null,
                    dateFormat: "%d-%m-%Y %H:%M:%S",
                    decimalPoint: null,
                    itemDelimiter: null,
                    lineDelimiter: "\n"
                },
                showTable: !1,
                useMultiLevelHeaders: !0,
                useRowspanHeaders: !0
            },
            lang: {
                downloadCSV: "Descargar CSV",
                downloadXLS: "Descargar XLS",
                openInCloud: "Abrir en Highcharts Nube",
                viewData: "Ver tabla de datos"
            }
        });
        a.addEvent(a.Chart, "render", function () {
            this.options && this.options.exporting && this.options.exporting.showTable && this.viewData()
        });
        a.Chart.prototype.setUpKeyToAxis = function () {
            p.arearange && (p.arearange.prototype.keyToAxis = {
                low: "y",
                high: "y"
            })
        };
        a.Chart.prototype.getDataRows = function (f) {
            var u = this.time,
                h = this.options.exporting && this.options.exporting.csv || {},
                d, l = this.xAxis,
                q = {},
                g = [],
                n, C = [],
                v = [],
                z, w, k, D = function (b, d, k) {
                    if (h.columnHeaderFormatter) {
                        var u = h.columnHeaderFormatter(b, d, k);
                        if (!1 !== u) return u
                    }
                    return b ? b instanceof a.Axis ? b.options.title && b.options.title.text || (b.isDatetimeAxis ? "DateTime" : "Category") : f ? {
                        columnTitle: 1 < k ? d : b.name,
                        topLevelColumnTitle: b.name
                    } : b.name + (1 < k ? " (" + d + ")" : "") : "Category"
                },
                A = [];
            w = 0;
            this.setUpKeyToAxis();
            c(this.series, function (b) {
                var d = b.options.keys || b.pointArrayMap || ["y"],
                    k = d.length,
                    x = !b.requireSorting && {},
                    n = {},
                    g = {},
                    e = a.inArray(b.xAxis, l),
                    y, r;
                c(d, function (d) {
                    var a = (b.keyToAxis && b.keyToAxis[d] || d) + "Axis";
                    n[d] = b[a] && b[a].categories || [];
                    g[d] = b[a] && b[a].isDatetimeAxis
                });
                if (!1 !== b.options.includeInCSVExport && !b.options.isInternal && !1 !== b.visible) {
                    a.find(A, function (b) {
                        return b[0] === e
                    }) || A.push([e, w]);
                    for (r = 0; r < k;) z = D(b, d[r], d.length), v.push(z.columnTitle || z), f && C.push(z.topLevelColumnTitle || z), r++;
                    y = {
                        chart: b.chart,
                        autoIncrement: b.autoIncrement,
                        options: b.options,
                        pointArrayMap: b.pointArrayMap
                    };
                    c(b.options.data, function (a, f) {
                        var c, l;
                        l = {
                            series: y
                        };
                        b.pointClass.prototype.applyOptions.apply(l, [a]);
                        a = l.x;
                        c = b.data[f] && b.data[f].name;
                        x && (x[a] && (a += "|" + f), x[a] = !0);
                        r = 0;
                        b.xAxis && "name" !== b.exportKey || (a = c);
                        q[a] || (q[a] = [], q[a].xValues = []);
                        q[a].x = l.x;
                        q[a].name = c;
                        for (q[a].xValues[e] = l.x; r < k;) f = d[r], c = l[f], q[a][w + r] = m(n[f][c], g[f] ? u.dateFormat(h.dateFormat, c) : null, c), r++
                    });
                    w += r
                }
            });
            for (n in q) q.hasOwnProperty(n) && g.push(q[n]);
            var x, y;
            n = f ? [C, v] : [v];
            for (w = A.length; w--;) x = A[w][0], y = A[w][1], d = l[x], g.sort(function (b, a) {
                return b.xValues[x] - a.xValues[x]
            }), k = D(d), n[0].splice(y, 0, k), f && n[1] && n[1].splice(y, 0, k), c(g, function (b) {
                var a = b.name;
                d && !e(a) && (d.isDatetimeAxis ? (b.x instanceof Date && (b.x = b.x.getTime()), a = u.dateFormat(h.dateFormat, b.x)) : a = d.categories ? m(d.names[b.x], d.categories[b.x], b.x) : b.x);
                b.splice(y, 0, a)
            });
            n = n.concat(g);
            a.fireEvent(this, "exportData", {
                dataRows: n
            });
            return n
        };
        a.Chart.prototype.getCSV = function (a) {
            var f = "",
                h = this.getDataRows(),
                d = this.options.exporting.csv,
                l = m(d.decimalPoint, "," !== d.itemDelimiter && a ? (1.1).toLocaleString()[1] : "."),
                e = m(d.itemDelimiter, "," === l ? ";" : ","),
                g = d.lineDelimiter;
            c(h, function (a, d) {
                for (var c, u = a.length; u--;) c = a[u], "string" === typeof c && (c = '"' + c + '"'), "number" === typeof c && "." !== l && (c = c.toString().replace(".", l)), a[u] = c;
                f += a.join(e);
                d < h.length - 1 && (f += g)
            });
            return f
        };
        a.Chart.prototype.getTable = function (a) {
            var f = "\x3ctable\x3e",
                h = this.options,
                d = a ? (1.1).toLocaleString()[1] : ".",
                l = m(h.exporting.useMultiLevelHeaders, !0);
            a = this.getDataRows(l);
            var e = 0,
                g = l ? a.shift() : null,
                n = a.shift(),
                p = function (a, c, f, l) {
                    var k = m(l, "");
                    c = "text" + (c ? " " + c : "");
                    "number" === typeof k ? (k = k.toString(), "," === d && (k = k.replace(".", d)), c = "number") : l || (c = "empty");
                    return "\x3c" + a + (f ? " " + f : "") + ' class\x3d"' + c + '"\x3e' + k + "\x3c/" + a + "\x3e"
                };
            !1 !== h.exporting.tableCaption && (f += '\x3ccaption class\x3d"highcharts-table-caption"\x3e' + m(h.exporting.tableCaption, h.title.text ? h.title.text.replace(/&/g, "\x26amp;").replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;").replace(/"/g, "\x26quot;").replace(/'/g, "\x26#x27;").replace(/\//g, "\x26#x2F;") : "Chart") + "\x3c/caption\x3e");
            for (var v = 0, t = a.length; v < t; ++v) a[v].length > e && (e = a[v].length);
            f += function (a, d, c) {
                var f = "\x3cthead\x3e",
                    e = 0;
                c = c || d && d.length;
                var k, b, g = 0;
                if (b = l && a && d) {
                    a: if (b = a.length, d.length === b) {
                        for (; b--;)
                            if (a[b] !== d[b]) {
                                b = !1;
                                break a
                            }
                        b = !0
                    } else b = !1;b = !b
                }
                if (b) {
                    for (f += "\x3ctr\x3e"; e < c; ++e) b = a[e], k = a[e + 1], b === k ? ++g : g ? (f += p("th", "highcharts-table-topheading", 'scope\x3d"col" colspan\x3d"' + (g + 1) + '"', b), g = 0) : (b === d[e] ? h.exporting.useRowspanHeaders ? (k = 2, delete d[e]) : (k = 1, d[e] = "") : k = 1, f += p("th", "highcharts-table-topheading", 'scope\x3d"col"' + (1 < k ? ' valign\x3d"top" rowspan\x3d"' + k + '"' : ""), b));
                    f += "\x3c/tr\x3e"
                }
                if (d) {
                    f += "\x3ctr\x3e";
                    e = 0;
                    for (c = d.length; e < c; ++e) void 0 !== d[e] && (f += p("th", null, 'scope\x3d"col"', d[e]));
                    f += "\x3c/tr\x3e"
                }
                return f + "\x3c/thead\x3e"
            }(g, n, Math.max(e, n.length));
            f += "\x3ctbody\x3e";
            c(a, function (a) {
                f += "\x3ctr\x3e";
                for (var d = 0; d < e; d++) f += p(d ? "td" : "th", null, d ? "" : 'scope\x3d"row"', a[d]);
                f += "\x3c/tr\x3e"
            });
            return f += "\x3c/tbody\x3e\x3c/table\x3e"
        };
        a.Chart.prototype.fileDownload = function (c, e, h) {
            var d;
            d = this.options.exporting.filename ? this.options.exporting.filename : this.title && this.title.textStr ? this.title.textStr.replace(/ /g, "-").toLowerCase() : "chart";
            t.Blob && t.navigator.msSaveOrOpenBlob ? (c = new t.Blob(["\ufeff" + h], {
                type: "text/csv"
            }), t.navigator.msSaveOrOpenBlob(c, d + "." + e)) : E ? (h = g.createElement("a"), h.href = c, h.download = d + "." + e, this.container.appendChild(h), h.click(), h.remove()) : a.error("The browser doesn't support downloading files")
        };
        a.Chart.prototype.downloadCSV = function () {
            var a = this.getCSV(!0);
            this.fileDownload("data:text/csv,\ufeff" + encodeURIComponent(a), "csv", a, "text/csv")
        };
        a.Chart.prototype.downloadXLS = function () {
            var a = '\x3chtml xmlns:o\x3d"urn:schemas-microsoft-com:office:office" xmlns:x\x3d"urn:schemas-microsoft-com:office:excel" xmlns\x3d"http://www.w3.org/TR/REC-html40"\x3e\x3chead\x3e\x3c!--[if gte mso 9]\x3e\x3cxml\x3e\x3cx:ExcelWorkbook\x3e\x3cx:ExcelWorksheets\x3e\x3cx:ExcelWorksheet\x3e\x3cx:Name\x3eArk1\x3c/x:Name\x3e\x3cx:WorksheetOptions\x3e\x3cx:DisplayGridlines/\x3e\x3c/x:WorksheetOptions\x3e\x3c/x:ExcelWorksheet\x3e\x3c/x:ExcelWorksheets\x3e\x3c/x:ExcelWorkbook\x3e\x3c/xml\x3e\x3c![endif]--\x3e\x3cstyle\x3etd{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}\x3c/style\x3e\x3cmeta name\x3dProgId content\x3dExcel.Sheet\x3e\x3cmeta charset\x3dUTF-8\x3e\x3c/head\x3e\x3cbody\x3e' + this.getTable(!0) + "\x3c/body\x3e\x3c/html\x3e";
            this.fileDownload("data:application/vnd.ms-excel;base64," + t.btoa(unescape(encodeURIComponent(a))), "xls", a, "application/vnd.ms-excel")
        };
        a.Chart.prototype.viewData = function () {
            this.dataTableDiv || (this.dataTableDiv = g.createElement("div"), this.dataTableDiv.className = "highcharts-data-table", this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling));
            this.dataTableDiv.innerHTML = this.getTable()
        };
        a.Chart.prototype.openInCloud = function () {
            function c(d) {
                Object.keys(d).forEach(function (e) {
                    "function" === typeof d[e] && delete d[e];
                    a.isObject(d[e]) && c(d[e])
                })
            }
            var e, h;
            e = a.merge(this.userOptions);
            c(e);
            e = {
                name: e.title && e.title.text || "Chart title",
                options: e,
                settings: {
                    constructor: "Chart",
                    dataProvider: {
                        csv: this.getCSV()
                    }
                }
            };
            h = JSON.stringify(e);
            (function () {
                var a = g.createElement("form");
                g.body.appendChild(a);
                a.method = "post";
                a.action = "https://cloud-api.highcharts.com/openincloud";
                a.target = "_blank";
                var c = g.createElement("input");
                c.type = "hidden";
                c.name = "chart";
                c.value = h;
                a.appendChild(c);
                a.submit();
                g.body.removeChild(a)
            })()
        };
        var B = a.getOptions().exporting;
        B && (a.extend(B.menuItemDefinitions, {
            downloadCSV: {
                textKey: "downloadCSV",
                onclick: function () {
                    this.downloadCSV()
                }
            },
            downloadXLS: {
                textKey: "downloadXLS",
                onclick: function () {
                    this.downloadXLS()
                }
            },
            viewData: {
                textKey: "viewData",
                onclick: function () {
                    this.viewData()
                }
            },
            openInCloud: {
                textKey: "openInCloud",
                onclick: function () {
                    this.openInCloud()
                }
            }
        }), B.buttons.contextButton.menuItems.push("separator", "downloadCSV", "downloadXLS", "viewData", "openInCloud"));
        p.map && (p.map.prototype.exportKey = "name");
        p.mapbubble && (p.mapbubble.prototype.exportKey = "name");
        p.treemap && (p.treemap.prototype.exportKey = "name")
    })(e)
});
//# sourceMappingURL=export-data.js.map