// ==UserScript==
// @name         Melon Hub (bloxd.io)
// @namespace    https://github.com/OfficiallyMelon/Melon-Hub
// @version      2025-01-31
// @description  like steroids for bloxd.io (shit release, minimum features, no themes/settings yet.)
// @author       melon
// @match        https://bloxd.io*
// @icon         https://bloxd.io*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(() => {
        "use strict";
        var e = {
                d: (t, n) => {
                        for (var o in n) e.o(n, o) && !e
                                .o(t, o) && Object
                                .defineProperty(t, o, {
                                        enumerable:
                                                !
                                                0,
                                        get: n[o]
                                })
                },
                o: (e, t) => Object.prototype.hasOwnProperty
                        .call(e, t)
        };
        e.d({}, {
                n9: () => C,
                oP: () => I
        });
        var t, n, o, i = {
                coordinates: [null, null, null],
                methods: {},
                CurrentlyInjected: !1,
                freecamPosition: [0, 0, 0]
        };
        n = function () {
                for (var e = [], t = 0; t < arguments
                        .length; t++) e[t] = arguments[t];
                var n = !1;
                try {
                        void 0 !== e[2].swingDuration && (n = !
                                0)
                }
                catch (e) {}
                var o = !1;
                try {
                        void 0 !== e[1].__id && (o = !0)
                }
                catch (e) {}
                n && o && 4 === e.length && 200 === e[2]
                        .swingDuration && 1 === e[1].__id && (i
                                .hookedObject = e[0],
                                setTimeout((function () {
                                        i.babylonEngine =
                                                window
                                                .BABYLON,
                                                i
                                                .noaInstance =
                                                i
                                                .hookedObject
                                                .heldItem
                                                .noa,
                                                i
                                                .CurrentlyInjected = !
                                                0,
                                                C("Injection State:",
                                                        i
                                                        .noaInstance ?
                                                        "Successfully hooked noa!" :
                                                        "Unsuccessful, try reloading the page."
                                                        ),
                                                console
                                                .log("Successfully hooked noa!",
                                                        i
                                                        .noaInstance
                                                        ),
                                                window
                                                .noa =
                                                i
                                                .noaInstance,
                                                i
                                                .genericPlayerState =
                                                i
                                                .noaInstance
                                                .ents
                                                ._storage
                                                .genericLifeForm
                                                .hash[i.noaInstance
                                                        .playerEntity
                                                        ],
                                                setTimeout(
                                                        (function () {
                                                                I.style.cssText =
                                                                        "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:green;border-radius:50%;"
                                                        }),
                                                        100
                                                        )
                                }), 1))
        }, o = (t = Object)["assign"], t.assign = new Proxy(o, {
                apply: function (e, t, o) {
                        return n.apply(void 0,
                                        o),
                                Reflect.apply(e,
                                        t, o)
                }
        });
        var a = null,
                r = null;
        var s = function () {
                        function e() {}
                        return e.prototype.simulateLeftClick =
                                function (e) {
                                        var t = new MouseEvent(
                                                "mousedown", {
                                                        button: 0,
                                                        bubbles: !
                                                                0,
                                                        cancelable:
                                                                !
                                                                0
                                                });
                                        e.dispatchEvent(t);
                                        var n = new MouseEvent(
                                                "mouseup", {
                                                        button: 0,
                                                        bubbles: !
                                                                0,
                                                        cancelable:
                                                                !
                                                                0
                                                });
                                        e.dispatchEvent(n)
                                }, e.prototype.simulateRightClick =
                                function (e) {
                                        var t = new MouseEvent(
                                                "mousedown", {
                                                        button: 2,
                                                        bubbles: !
                                                                0,
                                                        cancelable:
                                                                !
                                                                0
                                                });
                                        e.dispatchEvent(t);
                                        var n = new MouseEvent(
                                                "mouseup", {
                                                        button: 2,
                                                        bubbles: !
                                                                0,
                                                        cancelable:
                                                                !
                                                                0
                                                });
                                        e.dispatchEvent(n)
                                }, e.prototype.distanceBetween =
                                function (e, t) {
                                        var n = t[0] - e[0],
                                                o = t[1] - e[1],
                                                i = t[2] - e[2];
                                        return n * n + o * o + i * i
                                }, e.prototype.distanceBetweenSqrt =
                                function (e, t) {
                                        return Math.sqrt(this
                                                .distanceBetween(
                                                        e, t))
                                }, e.prototype.ChangeCrouchSpeed =
                                function (e) {
                                        i.noaInstance.serverSettings
                                                .crouchingSpeed = e
                                }, e.prototype.ChangeWalkSpeed =
                                function (e) {
                                        i.noaInstance.serverSettings
                                                .walkingSpeed = e
                                }, e.prototype.InstantRespawn =
                                function () {
                                        var e;
                                        i.noaInstance && (i.noaInstance
                                                .serverSettings
                                                .secsToRespawn =
                                                0, null === (e =
                                                        document
                                                        .querySelector(
                                                                ".NewButton.BlueButton.RespawnButton"
                                                                )
                                                        ) ||
                                                void 0 === e ||
                                                e.click())
                                }, e.prototype.normalizeVector =
                                function (e) {
                                        var t = e[0] * e[0] + e[1] * e[
                                                1] + e[2] * e[2];
                                        if (t > 0) {
                                                var n = 1 / Math.sqrt(
                                                t);
                                                return [e[0] * n, e[1] *
                                                        n, e[
                                                        2] * n
                                                ]
                                        }
                                        return e
                                }, e.prototype.killaura = function (e) {
                                        var t = function () {
                                                        var e = i
                                                                .noaInstance,
                                                                t = e
                                                                .playerNames,
                                                                n = e
                                                                .playerEntity,
                                                                o = e
                                                                .ents,
                                                                a = [];
                                                        for (var r in t)
                                                                if (t.hasOwnProperty(
                                                                                r
                                                                                )) {
                                                                        var s = Number(
                                                                                r);
                                                                        s !== n &&
                                                                                o
                                                                                .hasComponent(
                                                                                        s,
                                                                                        "position"
                                                                                        ) &&
                                                                                o
                                                                                .hasComponent(
                                                                                        s,
                                                                                        "genericLifeformState"
                                                                                        ) &&
                                                                                o
                                                                                .genericLifeformState(
                                                                                        s
                                                                                        )
                                                                                .isAlive &&
                                                                                a
                                                                                .push(
                                                                                        s)
                                                                } return a
                                                }()
                                                .filter((function (e) {
                                                        var
                                                        t;
                                                        return null ===
                                                                (t = i.noaInstance
                                                                        .otherPlayerSettings[
                                                                                i
                                                                                .noaInstance
                                                                                .playerEntity
                                                                                ]
                                                                        [
                                                                                e]
                                                                        ) ||
                                                                void 0 ===
                                                                t ?
                                                                void 0 :
                                                                t
                                                                .canAttack
                                                }));
                                        if (0 !== t.length) {
                                                var n = function (e) {
                                                                for (var t = i.noaInstance
                                                                                .ents
                                                                                .getPosition(
                                                                                        i
                                                                                        .noaInstance
                                                                                        .playerEntity
                                                                                        ),
                                                                                n =
                                                                                void 0,
                                                                                o =
                                                                                1 /
                                                                                0,
                                                                                a =
                                                                                0,
                                                                                r =
                                                                                e; a <
                                                                        r
                                                                        .length; a++
                                                                        ) {
                                                                        var s = r[
                                                                                        a],
                                                                                l =
                                                                                c
                                                                                .distanceBetween(
                                                                                        t,
                                                                                        i
                                                                                        .noaInstance
                                                                                        .ents
                                                                                        .getPosition(
                                                                                                s
                                                                                                )
                                                                                        );
                                                                        (void 0 ===
                                                                                n ||
                                                                                l <
                                                                                o
                                                                                ) &&
                                                                        (n = s, o =
                                                                                l
                                                                                )
                                                                }
                                                                return n
                                                        }(t),
                                                        o = i
                                                        .noaInstance
                                                        .ents
                                                        .getPosition(i
                                                                .noaInstance
                                                                .playerEntity
                                                                ),
                                                        a = i
                                                        .noaInstance
                                                        .ents
                                                        .getPositionData(
                                                                n)
                                                        .position;
                                                if (c.distanceBetweenSqrt(
                                                                o, a) <=
                                                        5) {
                                                        var r = i
                                                                .noaInstance
                                                                .camera
                                                                ._dirVector;
                                                        i.noaInstance
                                                                .camera
                                                                ._dirVector =
                                                                c
                                                                .normalizeVector(
                                                                        [a[0] - o[
                                                                                        0],
                                                                                a[
                                                                                        1] -
                                                                                o[
                                                                                        1],
                                                                                a[
                                                                                        2] -
                                                                                o[
                                                                                        2]
                                                                        ]
                                                                        );
                                                        var s = document
                                                                .querySelector(
                                                                        "#noa-canvas"
                                                                        );
                                                        s && this
                                                                .simulateLeftClick(
                                                                        s
                                                                        ),
                                                                i
                                                                .noaInstance
                                                                .camera
                                                                ._dirVector =
                                                                r
                                                }
                                        }
                                        else C("No targets found")
                                }, e.prototype.removeAllCookies =
                                function () {
                                        for (var e = 0, t = document
                                                        .cookie.split(
                                                                ";"
                                                                ); e < t
                                                .length; e++) {
                                                var n = t[e],
                                                        o = n.indexOf(
                                                                "="),
                                                        i = o > -1 ? n
                                                        .substr(0, o) :
                                                        n;
                                                document.cookie = i +
                                                        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
                                        }
                                }, e
                }(),
                l = !1,
                c = new s,
                u = [{
                        type: "Combat",
                        title: "Kill Aura",
                        desc: "Detects and attacks nearby entities (BROKEN)",
                        pertick: function (e) {
                                e && c.killaura(30)
                        }
                }, {
                        type: "Combat",
                        title: "Auto Clicker",
                        desc: "Automatically clicks for you",
                        pertick: function () {
                                if (i.CurrentlyInjected &&
                                        i.noaInstance) {
                                        var e = document
                                                .querySelector(
                                                        "#noa-canvas"
                                                        );
                                        e && (e.dispatchEvent(new MouseEvent(
                                                        "mousedown", {
                                                                button: 0,
                                                                bubbles: !
                                                                        0,
                                                                cancelable:
                                                                        !
                                                                        0
                                                        }
                                                        )),
                                                e
                                                .dispatchEvent(
                                                        new MouseEvent(
                                                                "mouseup", {
                                                                        button: 0,
                                                                        bubbles: !
                                                                                0,
                                                                        cancelable:
                                                                                !
                                                                                0
                                                                }
                                                                )
                                                        )
                                                )
                                }
                        }
                }, {
                        type: "Combat",
                        title: "Anti Shake",
                        desc: "Disables camera shake on hit",
                        pertick: function (e) {
                                e && i.CurrentlyInjected &&
                                        i.noaInstance &&
                                        (i.noaInstance
                                                .entities
                                                .getState(
                                                        i
                                                        .noaInstance
                                                        .playerEntity,
                                                        "cameraShake"
                                                        )
                                                .shakePower =
                                                0)
                        }
                }, {
                        type: "Player",
                        title: "Scaffold",
                        desc: "Automatically places blocks under you. (BROKEN)",
                        pertick: function (e) {
                                if (e && i
                                        .CurrentlyInjected &&
                                        i.noaInstance) {
                                        var t = i
                                                .noaInstance
                                                .playerEntity,
                                                n = i
                                                .noaInstance
                                                .ents
                                                .getPosition(
                                                        t
                                                        ),
                                                o = i
                                                .noaInstance
                                                .getBlock(
                                                        n[
                                                                0],
                                                        n[
                                                                1] -
                                                        1,
                                                        n[
                                                                2]
                                                        ),
                                                s = i
                                                .noaInstance
                                                .ents
                                                .getInventoryState(
                                                        i
                                                        .noaInstance
                                                        .playerEntity
                                                        )
                                                .selectedItem,
                                                l = !
                                                s ||
                                                "CubeBlock" !==
                                                s
                                                .typeObj
                                                .type &&
                                                "TwoDBlock" !==
                                                s
                                                .typeObj
                                                .type &&
                                                "SlabBlock" !==
                                                s
                                                .typeObj
                                                .type ?
                                                null : s
                                                .typeObj
                                                .id;
                                        if (0 === o) {
                                                var c = [Math.floor(n[
                                                                0]),
                                                        Math
                                                        .floor(n[
                                                                        1] -
                                                                1
                                                                ),
                                                        Math
                                                        .floor(n[
                                                                2])
                                                ];
                                                C("Placing block at",
                                                                c
                                                                .toString()
                                                                ),
                                                        C("Block ID",
                                                                o
                                                                ),
                                                        l &&
                                                        (u = {
                                                                        pos: c,
                                                                        toBlock: l,
                                                                        checker: ""
                                                                },
                                                                a &&
                                                                r ?
                                                                a
                                                                .apply(r,
                                                                        [114,
                                                                                u]
                                                                        ) :
                                                                console
                                                                .error(
                                                                        "[HOOK ERROR] hookedSend is null"),
                                                                i
                                                                .noaInstance
                                                                .setBlock(
                                                                        c[
                                                                                0],
                                                                        c[
                                                                                1],
                                                                        c[
                                                                                2],
                                                                        l
                                                                        )
                                                                )
                                        }
                                }
                                var u
                        }
                }, {
                        type: "Player",
                        title: "Instant Respawn",
                        desc: "Instantly respawns you when you die.",
                        pertick: function () {
                                i.CurrentlyInjected && i
                                        .noaInstance &&
                                        c
                                        .InstantRespawn()
                        }
                }, {
                        type: "Combat",
                        title: "Auto Trigger",
                        desc: "Auto trigger for Aimbot (BROKEN)",
                        pertick: function (e) {
                                if (e && l) {
                                        var t = document
                                                .querySelector(
                                                        "#noa-canvas"
                                                        );
                                        t && (t.dispatchEvent(new MouseEvent(
                                                        "mousedown", {
                                                                button: 0,
                                                                bubbles: !
                                                                        0,
                                                                cancelable:
                                                                        !
                                                                        0
                                                        }
                                                        )),
                                                t
                                                .dispatchEvent(
                                                        new MouseEvent(
                                                                "mouseup", {
                                                                        button: 0,
                                                                        bubbles: !
                                                                                0,
                                                                        cancelable:
                                                                                !
                                                                                0
                                                                }
                                                                )
                                                        )
                                                )
                                }
                        }
                }, {
                        type: "Player",
                        title: "Account Gen",
                        desc: "Generates accounts for you to use. (Requires Refresh)",
                        pertick: function () {
                                c.removeAllCookies(),
                                        location
                                        .reload()
                        }
                }, {
                        type: "Combat",
                        title: "Aimbot",
                        desc: "Automatically aims at the nearest player.",
                        pertick: function (e) {
                                if (e) {
                                        var t = null,
                                                n = 1 /
                                                0;
                                        if (i.noaInstance
                                                .entities
                                                ._storage
                                                .position
                                                .list
                                                .forEach(
                                                        (function (
                                                                e) {
                                                                if ("number" !=
                                                                        typeof e
                                                                        .__id &&
                                                                        1 !=
                                                                        e
                                                                        .__id &&
                                                                        e
                                                                        .__id !==
                                                                        i
                                                                        .noaInstance
                                                                        .serverPlayerEntity
                                                                        ) {
                                                                        console.log(e
                                                                                .__id);
                                                                        var o = i
                                                                                .noaInstance
                                                                                .entities
                                                                                .getGenericLifeformState(
                                                                                        e
                                                                                        .__id
                                                                                        );
                                                                        if (o && o
                                                                                .isAlive
                                                                                ) {
                                                                                var a = i
                                                                                        .noaInstance
                                                                                        .entities
                                                                                        .getPosition(
                                                                                                1
                                                                                                ),
                                                                                        r =
                                                                                        e
                                                                                        .position,
                                                                                        s = {
                                                                                                x: a[0],
                                                                                                y: a[1],
                                                                                                z: a[2]
                                                                                        },
                                                                                        l = {
                                                                                                x: r[0],
                                                                                                y: r[1],
                                                                                                z: r[2]
                                                                                        };
                                                                                if (a[0] ===
                                                                                        r[
                                                                                                0] &&
                                                                                        a[
                                                                                                1] ===
                                                                                        r[
                                                                                                1] &&
                                                                                        a[
                                                                                                2] ===
                                                                                        r[
                                                                                                2]
                                                                                        )
                                                                                        return;
                                                                                var c = (d = (p =
                                                                                                l)
                                                                                        .x -
                                                                                        (u =
                                                                                                s)
                                                                                        .x,
                                                                                        f =
                                                                                        p
                                                                                        .y -
                                                                                        u
                                                                                        .y,
                                                                                        m =
                                                                                        p
                                                                                        .z -
                                                                                        u
                                                                                        .z,
                                                                                        Math
                                                                                        .sqrt(Math
                                                                                                .pow(d,
                                                                                                        2) +
                                                                                                Math
                                                                                                .pow(f,
                                                                                                        2) +
                                                                                                Math
                                                                                                .pow(m,
                                                                                                        2)
                                                                                                )
                                                                                        );
                                                                                c < n && (n = c, t =
                                                                                        r
                                                                                        )
                                                                        }
                                                                }
                                                                var u, p,
                                                                        d,
                                                                        f,
                                                                        m
                                                        })
                                                        ),
                                                t &&
                                                n <= 20
                                                ) {
                                                var o = i
                                                        .noaInstance
                                                        .entities
                                                        .getPosition(
                                                                1
                                                                );
                                                a = (c = [t[0] - o[0], t[
                                                                                1] -
                                                                        o[
                                                                                1],
                                                                        t[
                                                                                2] -
                                                                        o[
                                                                                2]
                                                                ],
                                                                0 ===
                                                                (u = Math
                                                                        .sqrt(Math
                                                                                .pow(c[0],
                                                                                        2
                                                                                        ) +
                                                                                Math
                                                                                .pow(c[1],
                                                                                        2
                                                                                        ) +
                                                                                Math
                                                                                .pow(c[2],
                                                                                        2
                                                                                        )
                                                                                )
                                                                        ) ?
                                                                [0, 0,
                                                                        0] :
                                                                c
                                                                .map((function (e) {
                                                                        return e /
                                                                                u
                                                                }))
                                                                ),
                                                        r =
                                                        Math
                                                        .atan2(a[
                                                                        0],
                                                                a[
                                                                        2]
                                                                ),
                                                        s =
                                                        Math
                                                        .asin(-a[
                                                                1]),
                                                        i
                                                        .noaInstance
                                                        .camera
                                                        .heading =
                                                        r,
                                                        i
                                                        .noaInstance
                                                        .camera
                                                        .pitch =
                                                        s
                                        }
                                        l = !0
                                }
                                var a, r, s, c, u;
                                l = !1
                        }
                }, {
                        type: "Movement",
                        title: "Auto Sprint",
                        desc: "Automatically sprints when moving.",
                        pertick: function () {
                                i.CurrentlyInjected && i
                                        .noaInstance &&
                                        c
                                        .ChangeWalkSpeed(
                                                i
                                                .noaInstance
                                                .serverSettings
                                                .runningSpeed
                                                )
                        }
                }, {
                        type: "Movement",
                        title: "Fast Crouch",
                        desc: "Increase crouching speed.",
                        pertick: function (e) {
                                e ? i.CurrentlyInjected &&
                                        i.noaInstance &&
                                        c
                                        .ChangeCrouchSpeed(
                                                i
                                                .noaInstance
                                                .serverSettings
                                                .runningSpeed
                                                ) : i
                                        .CurrentlyInjected &&
                                        i.noaInstance &&
                                        c
                                        .ChangeCrouchSpeed(
                                                2)
                        }
                }, {
                        type: "Movement",
                        title: "Auto Speed",
                        desc: "Increase walking speed.",
                        pertick: function (e) {
                                e ? i.CurrentlyInjected &&
                                        i.noaInstance &&
                                        c
                                        .ChangeWalkSpeed(
                                                7.4) : i
                                        .CurrentlyInjected &&
                                        i.noaInstance &&
                                        c
                                        .ChangeWalkSpeed(
                                                4.5)
                        }
                }, {
                        type: "Movement",
                        title: "Infinite Jump",
                        desc: "Jump infinitely. (only works going up blocks)",
                        pertick: function (e) {
                                e ? i.CurrentlyInjected &&
                                        i.noaInstance &&
                                        (i.noaInstance
                                                .serverSettings
                                                .airJumpCount =
                                                1 / 0) :
                                        i
                                        .CurrentlyInjected &&
                                        i.noaInstance &&
                                        (i.noaInstance
                                                .serverSettings
                                                .airJumpCount =
                                                0)
                        }
                }, {
                        type: "Exploit",
                        title: "Spider (VERY EXPERIMENTAL)",
                        desc: "Climb walls.",
                        pertick: function (e) {
                                if (e && i
                                        .CurrentlyInjected &&
                                        i.noaInstance) {
                                        var t = i
                                                .noaInstance,
                                                n = t
                                                .playerEntity,
                                                o = t
                                                .ents
                                                .getPosition(
                                                        n
                                                        ),
                                                a = o[
                                                0],
                                                r = o[
                                                1],
                                                s = o[
                                                2];
                                        0 !== t.getBlock(
                                                        a,
                                                        r,
                                                        s +
                                                        1
                                                        ) &&
                                                t.ents
                                                .getPhysicsBody(
                                                        n
                                                        )
                                                .applyImpulse(
                                                        [0, .08 *
                                                                t
                                                                .serverSettings
                                                                .jumpAmount,
                                                                0
                                                        ]
                                                        )
                                }
                        }
                }, {
                        type: "Settings",
                        title: "Soon",
                        desc: "Coming soon",
                        pertick: function () {}
                }],
                p = function () {
                        function e() {}
                        return e.saveBoolean = function (e, t, n) {
                                void 0 === n && (n = !0), (n ||
                                                null ===
                                                localStorage
                                                .getItem(e)) &&
                                        localStorage.setItem(e,
                                                JSON.stringify(
                                                        t))
                        }, e.importBoolean = function (e) {
                                var t = localStorage.getItem(e);
                                return !!t && JSON.parse(t)
                        }, e.saveString = function (e, t) {
                                localStorage.setItem(e, t)
                        }, e.importString = function (e) {
                                return localStorage.getItem(e)
                        }, e.saveObject = function (e, t) {
                                localStorage.setItem(e, JSON
                                        .stringify(t))
                        }, e.importObject = function (e) {
                                var t = localStorage.getItem(e);
                                return t ? JSON.parse(t) : null
                        }, e
                }(),
                d = document.createElement("link");
        d.rel = "stylesheet", d.href =
                "https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500&display=swap";
        var f = document.createElement("div");
        f.style.cssText =
                "position:fixed;top:10px;right:10px;width:697.5px;height:448.5px;background-color:transparent;border-radius:10px;overflow:hidden;z-index:2147483646";
        var m = document.createElement("img");
        m.src = "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMelon.png?raw=true",
                m.style.cssText = "width:697.5px;height:448.5px", m
                .style.position = "relative";
        var g = document.createElement("img");
        g.src = "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMelon.png?raw=true",
                g.style.cssText =
                "position:fixed;top:10px;right:495px;width:217.5px;height:448.5px;z-index:2147483646";
        var h = document.createElement("div");
        h.innerText = "Melon Hub", h.style.cssText =
                "position:absolute; top: 20px; left: 34px; font-family: Inter, sans-serif; font-size: 22px; font-weight: 500; color: white; z-index: 2147483647;";
        var b = document.createElement("div");
        b.innerText = "1.0", b.style.cssText =
                "position:absolute; top: 20px; left: 145px; font-family: Inter, sans-serif; font-size: 14px; font-weight: 300; color: white; z-index: 2147483647;";
        var y = document.createElement("div");
        y.style.cssText =
                "position:absolute;top:60px;left:-25px;width:217.5px;height:448.5px;z-index:2147483651;";
        var x = document.createElement("div");
        x.id = "rightButtonContainer", x.style.cssText =
                "position: absolute; top: 50px; right: 10px; width: 470px; height: 380px; z-index: 2147483649; overflow-y: auto; overflow-x: hidden; padding-right: 10px; box-sizing: border-box;";
        var v = document.createElement("div");
        v.id = "miniConsole", v.style.cssText =
                "position: absolute; top: 40px; right: 5px; width: 470px; height: 380px; background-color: black; color: green; overflow-y: auto; padding: 10px; box-sizing: border-box; font-family: monospace; font-size: 14px; border: 2px solid gray; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: none; z-index: 20000000000;";
        var w, I = document.createElement("div");
        I.id = "injectionStatus", I.style.cssText =
                "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:red;border-radius:50%;",
                document.head.appendChild(d), f.appendChild(m), f
                .appendChild(g), f.appendChild(h), f.appendChild(b), f
                .appendChild(y), f.appendChild(x), f.appendChild(v), f
                .appendChild(I), document.body.appendChild(f), w =
                Object.defineProperty, Object.defineProperty =
                function (e, t, n) {
                        try {
                                "send" === t && "function" == typeof n
                                        .value && (console.log(
                                                        "[HOOK] Defining property: send"
                                                        ), a = n.value,
                                                n.value = function () {
                                                        for (var e = [], t =
                                                                        0; t <
                                                                arguments
                                                                .length; t++
                                                                ) e[t] =
                                                                arguments[
                                                                        t
                                                                        ];
                                                        if (a) return r =
                                                                this,
                                                                a
                                                                .apply(this,
                                                                        e
                                                                        );
                                                        console.error(
                                                                "[HOOK ERROR] hookedSend is null")
                                                })
                        }
                        catch (e) {
                                console.error("[HOOK ERROR] Failed to hook send:",
                                        e)
                        }
                        return w.apply(this, arguments)
                }, Object.defineProperty(window, "getHookedSend", {
                        value: function () {
                                return a
                        },
                        writable: !1,
                        configurable: !1
                });
        var k = [];

        function C() {
                for (var e = [], t = 0; t < arguments.length; t++) e[
                        t] = arguments[t];
                var n = e.join(" "),
                        o = document.createElement("div");
                o.textContent = "> ".concat(n), o.style.color = "green",
                        o.style.marginBottom = "5px", v.appendChild(o),
                        v.scrollTop = v.scrollHeight, k.push({
                                text: n,
                                type: "output"
                        })
        }
        var M = !1,
                E = 0,
                S = 0;
        f.addEventListener("mousedown", (function (e) {
                M = !0, E = e.clientX - f
                        .getBoundingClientRect()
                        .left, S = e.clientY - f
                        .getBoundingClientRect()
                        .top, f.style.cursor =
                        "grabbing"
        })), document.addEventListener("mousemove", (function (
                e) {
                if (M) {
                        var t = "".concat(e
                                        .clientX -
                                        E, "px"
                                        ),
                                n = "".concat(e
                                        .clientY -
                                        S, "px"
                                        );
                        f.style.left = t, f
                                .style.top = n,
                                g.style.left =
                                "".concat(e
                                        .clientX -
                                        E, "px"
                                        ), g
                                .style.top = ""
                                .concat(e
                                        .clientY -
                                        S, "px")
                }
        })), document.addEventListener("mouseup", (function () {
                M = !1, f.style.cursor =
                        "default"
        }));
        var T = {};

        function O(e) {
                void 0 === e && (e = ""), console.log("active" + e);
                var t = document.getElementById("rightButtonContainer");
                if (t) {
                        for (; t.firstChild;) t.removeChild(t
                                .firstChild);
                        v.style.display = "Debug" === e ? "block" :
                                "none", "Themes" === e && B.forEach((
                                        function (e) {
                                                t.appendChild(function (t,
                                                                n,
                                                                o
                                                                ) {
                                                                var i = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                i.style.cssText =
                                                                        "\n  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;\n  transition:transform 0.2s;cursor:pointer;\n  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;\n  transform-origin: top;\n",
                                                                        i
                                                                        .onmouseenter =
                                                                        function () {
                                                                                return i.style
                                                                                        .transform =
                                                                                        "scaleY(1.05)"
                                                                        },
                                                                        i
                                                                        .onmouseleave =
                                                                        function () {
                                                                                return i.style
                                                                                        .transform =
                                                                                        "scaleY(1)"
                                                                        };
                                                                var a = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                a.style.cssText =
                                                                        "position:absolute;top:5px;left:5px;display:flex;align-items:center;",
                                                                        i
                                                                        .appendChild(
                                                                                a
                                                                                );
                                                                var r = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                r.innerText =
                                                                        t,
                                                                        r
                                                                        .style
                                                                        .cssText =
                                                                        "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;",
                                                                        a
                                                                        .appendChild(
                                                                                r
                                                                                );
                                                                var s = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                s.innerText =
                                                                        "(Theme)",
                                                                        s
                                                                        .style
                                                                        .cssText =
                                                                        "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);",
                                                                        a
                                                                        .appendChild(
                                                                                s
                                                                                );
                                                                var l = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                return l.innerText =
                                                                        o,
                                                                        l
                                                                        .style
                                                                        .cssText =
                                                                        "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);",
                                                                        i
                                                                        .appendChild(
                                                                                l
                                                                                ),
                                                                        t in
                                                                        T ||
                                                                        (T[t] = !
                                                                                1
                                                                                ),
                                                                        i
                                                                        .onclick =
                                                                        function () {
                                                                                T[t] = !T[
                                                                                                t],
                                                                                        p
                                                                                        .saveObject(
                                                                                                "buttonStates",
                                                                                                T
                                                                                                ),
                                                                                        C("Theme",
                                                                                                e
                                                                                                .name,
                                                                                                "is now active."
                                                                                                ),
                                                                                        g
                                                                                        .src =
                                                                                        e
                                                                                        .LeftImage,
                                                                                        m
                                                                                        .src =
                                                                                        e
                                                                                        .RightImage,
                                                                                        p
                                                                                        .saveString(
                                                                                                "activeTheme",
                                                                                                e
                                                                                                .name
                                                                                                )
                                                                        },
                                                                        i
                                                        }
                                                        (e.name, 0,
                                                                e
                                                                .desc
                                                                )
                                                        )
                                        })), "Settings" === e &&
                                function (e, t, n, o) {
                                        var i = document.createElement(
                                                "div");
                                        i.style.cssText =
                                                "\n  position:relative;width:450px;height:100px;margin-bottom:10px;border-radius: 10px; right: -5px;\n  transition:transform 0.2s;cursor:pointer;\n  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;\n  transform-origin: top;\n",
                                                i.onmouseenter =
                                                function () {
                                                        return i.style
                                                                .transform =
                                                                "scaleY(1.05)"
                                                }, i.onmouseleave =
                                                function () {
                                                        return i.style
                                                                .transform =
                                                                "scaleY(1)"
                                                };
                                        var a = document.createElement(
                                                "div");
                                        a.style.cssText =
                                                "position:absolute;top:5px;left:5px;display:flex;align-items:center;",
                                                i.appendChild(a);
                                        var r = document.createElement(
                                                "div");
                                        r.innerText = e, r.style
                                                .cssText =
                                                "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;",
                                                a.appendChild(r);
                                        var s = document.createElement(
                                                "div");
                                        s.innerText = "(Player)", s
                                                .style.cssText =
                                                "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);",
                                                a.appendChild(s);
                                        var l = document.createElement(
                                                "div");
                                        l.innerText =
                                                "Change your walk speed.",
                                                l.style.cssText =
                                                "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);",
                                                i.appendChild(l);
                                        var c = document.createElement(
                                                "input");
                                        c.type = "range", c.min = 16.
                                                .toString(), c.max =
                                                100..toString(), c
                                                .value = 16..toString(),
                                                c.style.cssText =
                                                "position:absolute;bottom:5px;right:5px;width:200px;",
                                                i.appendChild(c), c
                                                .oninput = function () {
                                                        var e = parseInt(
                                                                c
                                                                .value,
                                                                10
                                                                );
                                                        o(e)
                                                }, i.onclick =
                                                function () {
                                                        T[e] = !T[e], p
                                                                .saveObject(
                                                                        "buttonStates",
                                                                        T
                                                                        );
                                                        var t = parseInt(
                                                                c
                                                                .value,
                                                                10
                                                                );
                                                        o(t)
                                                }
                                }("WalkSpeed", 0, 0, (function (e) {
                                        console.log(e)
                                })), u.forEach((function (n) {
                                        n.type !== e &&
                                                "" !==
                                                e || t
                                                .appendChild(
                                                        function (
                                                                e,
                                                                t,
                                                                n,
                                                                o
                                                                ) {
                                                                var i = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                i.style.cssText =
                                                                        "\n  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;\n  transition:transform 0.2s;cursor:pointer;\n  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;\n  transform-origin: top;\n",
                                                                        i
                                                                        .onmouseenter =
                                                                        function () {
                                                                                return i.style
                                                                                        .transform =
                                                                                        "scaleY(1.05)"
                                                                        },
                                                                        i
                                                                        .onmouseleave =
                                                                        function () {
                                                                                return i.style
                                                                                        .transform =
                                                                                        "scaleY(1)"
                                                                        };
                                                                var a = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                a.style.cssText =
                                                                        "position:absolute;top:5px;left:5px;display:flex;align-items:center;",
                                                                        i
                                                                        .appendChild(
                                                                                a
                                                                                );
                                                                var r = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                r.innerText =
                                                                        e,
                                                                        r
                                                                        .style
                                                                        .cssText =
                                                                        "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;",
                                                                        a
                                                                        .appendChild(
                                                                                r
                                                                                );
                                                                var s = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                s.innerText =
                                                                        t,
                                                                        s
                                                                        .style
                                                                        .cssText =
                                                                        "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);",
                                                                        a
                                                                        .appendChild(
                                                                                s
                                                                                );
                                                                var l = document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                l.innerText =
                                                                        n,
                                                                        l
                                                                        .style
                                                                        .cssText =
                                                                        "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);",
                                                                        i
                                                                        .appendChild(
                                                                                l
                                                                                );
                                                                var c, u =
                                                                        document
                                                                        .createElement(
                                                                                "div"
                                                                                );
                                                                return u.style
                                                                        .cssText =
                                                                        "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:red;border-radius:50%;",
                                                                        i
                                                                        .appendChild(
                                                                                u
                                                                                ),
                                                                        e in
                                                                        T ||
                                                                        (T[e] = !
                                                                                1
                                                                                ),
                                                                        u
                                                                        .style
                                                                        .backgroundColor =
                                                                        T[
                                                                                e] ?
                                                                        "green" :
                                                                        "red",
                                                                        i
                                                                        .onclick =
                                                                        function () {
                                                                                T[e] = !T[
                                                                                                e],
                                                                                        p
                                                                                        .saveObject(
                                                                                                "buttonStates",
                                                                                                T
                                                                                                ),
                                                                                        p
                                                                                        .importBoolean(
                                                                                                e
                                                                                                ) ||
                                                                                        p
                                                                                        .saveBoolean(
                                                                                                e,
                                                                                                T[
                                                                                                        e],
                                                                                                !
                                                                                                0
                                                                                                ),
                                                                                        u
                                                                                        .style
                                                                                        .backgroundColor =
                                                                                        T[
                                                                                                e] ?
                                                                                        "green" :
                                                                                        "red",
                                                                                        C("Toggled",
                                                                                                e,
                                                                                                "to",
                                                                                                T[
                                                                                                        e] ?
                                                                                                "on" :
                                                                                                "off"
                                                                                                ),
                                                                                        "Account Gen" ===
                                                                                        e ?
                                                                                        void 0 ===
                                                                                        c &&
                                                                                        (o(T[e]),
                                                                                                c =
                                                                                                window
                                                                                                .setTimeout(
                                                                                                        (
                                                                                                        function () {}),
                                                                                                        1
                                                                                                        )
                                                                                                ) :
                                                                                        void 0 ===
                                                                                        c ?
                                                                                        c =
                                                                                        window
                                                                                        .setInterval(
                                                                                                (function () {
                                                                                                        o(T[e])
                                                                                                }),
                                                                                                1
                                                                                                ) :
                                                                                        (window.clearInterval(
                                                                                                        c
                                                                                                        ),
                                                                                                c =
                                                                                                void 0
                                                                                                )
                                                                        },
                                                                        i
                                                        }
                                                        (n.title,
                                                                "("
                                                                .concat(n
                                                                        .type,
                                                                        ")"
                                                                        ),
                                                                n
                                                                .desc,
                                                                n
                                                                .pertick
                                                                )
                                                        )
                                }))
                }
        }
        var B = [{
                name: "(Default) Melon Hub",
                LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMelon.png?raw=true",
                RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMelon.png?raw=true",
                desc: "The default Melon Hub theme."
        }, {
                name: "Netflix",
                LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftNetflix.png?raw=true",
                RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RIghtNetflix.png?raw=true",
                desc: "Netflix theme including Red and Black colors, and Netlix logos."
        }, {
                name: "McDonalds",
                LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMaccas.png?raw=true",
                RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMaccas.png?raw=true",
                desc: "I ran out of theme ideas lmao"
        }, {
                name: "Minecraft",
                LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMinecraft.png?raw=true",
                RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMinecraft.png?raw=true",
                desc: "Minecraft theme including grass and dirt blocks."
        }, {
                name: "Hatsune Miku",
                LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMiku.png?raw=true",
                RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMiku.png?raw=true",
                desc: "I'm thinking Miku, Miku, oo-ee-oo"
        }];
        [{
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/AllBTN.png?raw=true",
                style: "top:15px;",
                onClick: function () {
                        return O("")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/CombatBTN.png?raw=true",
                style: "top:72px;",
                onClick: function () {
                        return O("Combat")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/MovementBTN.png?raw=true",
                style: "top:119px;",
                onClick: function () {
                        return O("Movement")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/PlayerBTN.png?raw=true",
                style: "top:166px;",
                onClick: function () {
                        return O("Player")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/ExploitBTN.png?raw=true",
                style: "top:213px;",
                onClick: function () {
                        return O("Exploit")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/OtherBTN.png?raw=true",
                style: "top:260px;",
                onClick: function () {
                        return O("Other")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/SettingsBTN.png?raw=true",
                style: "top:354px;",
                onClick: function () {
                        return O("Settings")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/ThemesBTN.png?raw=true",
                style: "top:401px;",
                onClick: function () {
                        return O("Themes")
                }
        }, {
                src: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/DebugBTN.png?raw=true",
                style: "top:401px;",
                onClick: function () {
                        return O("Debug")
                }
        }].forEach((function (e, t) {
                var n = document.createElement(
                        "img");
                n.src = e.src, n.style.cssText =
                        "position: absolute; width: 104px; height: 23.3px; left: 50%; transform: translateX(-50%); top: "
                        .concat(15 + 35 * t,
                                "px; z-index: 2147483652; transition: transform 0.2s, scale 0.2s; cursor: pointer;"
                                ), n
                        .addEventListener(
                                "mouseenter", (
                                        function () {
                                                return n.style
                                                        .transform =
                                                        "translateX(-50%) scale(1.05)"
                                        })), n
                        .addEventListener(
                                "mouseleave", (
                                        function () {
                                                return n.style
                                                        .transform =
                                                        "translateX(-50%) scale(1)"
                                        })), n
                        .addEventListener(
                                "click", e
                                .onClick), y
                        .appendChild(n)
        })), O(""), window.ondragstart = function () {
                return !1
        };
        var A = p.importString("activeTheme");
        if (A) {
                var R = B.find((function (e) {
                        return e.name === A
                }));
                R && (g.src = R.LeftImage, m.src = R.RightImage)
        }
})();
