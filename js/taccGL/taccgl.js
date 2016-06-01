// Built 1409151356
/*  
 taccgl(TM)    version 0.58  - 140915
 see http://www.taccgl.org for Examples, Tutorial, Documentation

 H.E.I. Informationssysteme GmbH
 Wimpfener Strasse 23
 68259 Mannheim
 Germany
 http://www.taccgl.org
 Sales Tax ID: DE185233091
 HRB Mannheim 7273
 Geschaeftssfuehrer: Dr. Helmut Emmelmann
 Phone: +49 - 621 - 79 51 41
 Fax:   +49 - 621 - 79 51 61

 Copyright (c) by H.E.I. Informationssysteme GmbH, Mannheim
 Germany, contributors and suppliers All rights reserved

 Redistribution and use in source and binary forms, with or without
 modification are permitted provided that the following conditions are
 met: Redistribution of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer
 Redistribution in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY H.E.I. ITS SUPPLIERS AND CONTRIBUTORS „AS
 IS“ AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 PARTICULAR PURPOSE ARE DISCLAIMED, IN NO EVEN SHALL H.E.I. SUPPLIERS
 OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDED BUT NOT LIMITED
 TO, PROCUREMENT OF SUBSITITE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF SUCH DAMAGE.


 This is BETA Software and known to contain bugs. It is probably
 not implemented completely and will probably not run on all
 browsers and client computers. It will switch off itself on
 certain client computers and browsers. In addition some client
 computers might run animations slowly, animations may appear
 choppy or jumpy, or even client computers might get overloaded or
 even crash. */

var taccgl_epwarning =
/*
 * M E D I C A L W A R N I N G Note that taccgl allows you to add fast flashing
 * and video game like animations to web pages. A small percentage of the
 * population may experience epileptic symptoms when exposed to such animations.
 * You might want to, or you may even be required to, add / show an epileptic
 * warning message on your web site before showing such animations and you might
 * want to or you may even be required to avoid certain types of animations on
 * your web site. Please protect yourself when programming animations and
 * protect the users of your web site and take the following warning message
 * seriously:
 */
"     EPILEPSY WARNING, READ BEFORE VIEWING THE FOLLOWING ANIMATIONS,";

// var taccgl_texCanWidth=1200;
// var taccgl_texCanHeight=2048;
// var taccgl_texCanWidth=512;
// var taccgl_texCanHeight=512;
var taccgl_3d = true; // normally true, false for testing 2D mode
var taccgl_maxQ = 3; // normally 3, 2 or 1 for testing these quality levels
var taccgl_frontfacing = false; // if false does not even try to make a shader
								// with frontfacing
var taccgl_advCompileTimeChrome = 80; // ms, if compiling the fast shader
										// takes longer, we do not even try
										// compiling the advanced shader
var taccgl_advCompileTime = 600; // ms, if compiling the fast shader takes
									// longer, we do not even try compiling the
									// advanced shader
// var taccgl_debug=true; // taccgl_debug can be enabled here or after including
// the lib
if (!window.taccgl_debugButtons)
	var taccgl_debugButtons = false;
if (!window.taccgl_showShader)
	var taccgl_showShader = false;

if (!window.taccgl_debug) {
	var taccgl_debug = false
}
function taccgl_onscroll() {
	taccgl.resizeBody();
	taccgl.draw_meaIgnore = 3
}
function taccgl_onresize() {
	if (taccgl.winOuterWidth == window.outerWidth
			&& taccgl.winOuterHeight == window.outerHeight) {
		return
	}
	taccgl.winOuterWidth = window.outerWidth;
	taccgl.winOuterHeight = window.outerHeight;
	taccgl.resizeBody();
	if (taccgl.resizeTimer) {
		clearTimeout(taccgl.resizeTimer)
	}
	taccgl.resizeTimer = setTimeout(function() {
		taccgl.resizeTimer = null;
		taccgl.tonresize()
	}, taccgl.resizeTime)
}
function taccgl_onmousemove(a) {
	if (taccgl.controller && taccgl.controller.bodyOnMouseMove) {
		taccgl.controller.bodyOnMouseMove(a)
	}
}
function taccgl_create() {
	var i;
	this.foreground_zIndex = 1000;
	this.background_zIndex = "-1";
	this.draw_running = false;
	this.busy = false;
	this.showWarning = false;
	this.timeScale = 1;
	this.endMode = "hide";
	this.endStyle = {
		transition : "opacity 0.25s, visibility 0.25s",
		opacity : "0",
		visibility : "hidden"
	};
	this.ddfx = this.ddfy = -0.1;
	this.textureCanvasshanged = false;
	this.textureCanvasChanged2 = false;
	this.texcanvas = null;
	this.texc = null;
	this.vBgControl = false;
	this.ddmode = this.dddmode = false;
	this.compatmode = true;
	this.initialized = false;
	this.webglerror = false;
	this.shddmode = this.shdddmode = null;
	this.drawerrcheck = false;
	this.onTerm = null;
	this.onBeforeDraw3D = null;
	this.delno = 1;
	this.qualityCnt = Array(4);
	for (i = 0; i < 4; i++) {
		this.qualityCnt[i] = 0
	}
	var c = document.cookie;
	if (c.match(/taccgl_epack=true/)) {
		this.epack = true
	}
	if (c.match(/taccgl_epack=false/)) {
		this.epack = false
	}
	
	this.heightExtension = 0;
	this.resizeTime = 200;
	this.meaAS = 256;
	this.meaA = Array(this.meaAS);
	this.meaAA = Array(this.meaAS);
	this.softFailQ = this.hardFailQ = taccgl_maxQ + 1;
	this.softFailCnt = 0;
	this.winOuterWidth = window.outerWidth;
	this.winOuterHeight = window.outerHeight;
	this.clog = function(s) {
		if (window.console) {
			console.log(s)
		}
	};
	this.tlog = function(s) {
		if (window.console) {
			console.log(taccgl.perfnow().toFixed(1) + ":::" + s)
		}
	};
	this.defaultLighting = function() {
		this.lightAmbient = 0.7;
		this.lightDiffuse = 0.3;
		this.lightSpecular = 0.3;
		this.lightShininess = 256
	};
	this.defaultLighting();
	this.defaultEye = function() {
		this.eyeX = this.eyeY = 0;
		this.eyeZ = -5000;
		if (this.stdsc) {
			this.createShaders();
			this.adjustQuality()
		}
	};
	this.defaultEye();
	this.defaultShadowZRange = function() {
		this.zBack = 4000;
		this.zFront = -2000
	};
	this.defaultShadowZRange();
	this.setShadowZRange = function(front, back) {
		this.zBack = back;
		this.zFront = front;
		this.adjustShcvp()
	};
	this.init1 = function() {
		var cv = document.getElementById("taccgl_canvas3d");
		if (!cv) {
			if (window.devicePixelRatio) {
				this.pr = window.devicePixelRatio
			} else {
				this.pr = 1
			}
			if (!window.taccgl_texCanWidth) {
				taccgl_texCanWidth = 1200
			}
			if (!window.taccgl_texCanHeight) {
				taccgl_texCanHeight = 1424
			}
			if (!window.taccgl_mipmap) {
				taccgl_mipmap = false
			}
			if (!window.taccgl_immediateStop) {
				taccgl_immediateStop = 4
			}
			if (document.body.insertAdjacentHTML) {
				document.body
						.insertAdjacentHTML(
								"afterbegin",
								'<canvas id="taccgl_canvas3d" width="10" height="10" style="position:absolute; top:0px; left:0px; z-index:-1;display:none;visibility:visible " onmousemove="taccgl.canvasOnMouseMove(event)"></canvas>');
				cv = document.getElementById("taccgl_canvas3d");
				var wpr = Math.round(taccgl_texCanWidth * this.pr), hpr = Math
						.round(taccgl_texCanHeight * this.pr);
				document.body
						.insertAdjacentHTML(
								"afterbegin",
								'<canvas id="taccgl_textureCanvas" width="'
										+ wpr
										+ '" height="'
										+ hpr
										+ '" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:black;width:'
										+ taccgl_texCanWidth
										+ "px;height:"
										+ taccgl_texCanHeight
										+ 'px" crossorigin onclick="taccgl.HideTexCanvas(1)"></canvas><canvas id="taccgl_textureCanvas2" width="'
										+ wpr
										+ '" height="'
										+ hpr
										+ '" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:black;width:'
										+ taccgl_texCanWidth
										+ "px;height:"
										+ taccgl_texCanHeight
										+ 'px" crossorigin onclick="taccgl.HideTexCanvas(2)"></canvas><canvas id="taccgl_scratchCanvas" width=1 height=1 style="display:none;position:absolute;top:0px;left:0px;z-index:1000;background-color:cyan; width:3; height:3" ></canvas>');
				this.scratchcanvas = document
						.getElementById("taccgl_scratchCanvas");
				if (this.scratchcanvas) {
					this.scratchc = this.scratchcanvas.getContext("2d")
				}
			}
			this.texTo(2);
			if (this.texc) {
				taccgl.texTransform(1, 0, 0, 1, 0, 0)
			}
			this.texTo(1);
			if (this.texc) {
				taccgl.texTransform(1, 0, 0, 1, 0, 0)
			}
		}
		if (window.requestAnimationFrame) {
			window.taccgl_requestAnimationFrame = requestAnimationFrame
		} else {
			if (window.webkitRequestAnimationFrame) {
				window.taccgl_requestAnimationFrame = webkitRequestAnimationFrame
			} else {
				if (window.mozRequestAnimationFrame) {
					window.taccgl_requestAnimationFrame = mozRequestAnimationFrame
				} else {
					if (window.msRequestAnimationFrame) {
						window.taccgl_requestAnimationFrame = msRequestAnimationFrame
					} else {
						if (window.oRequestAnimationFrame) {
							window.taccgl_requestAnimationFrame = oRequestAnimationFrame
						}
					}
				}
			}
		}
		if (window.cancelAnimationFrame) {
			window.taccgl_cancelAnimationFrame = cancelAnimationFrame
		} else {
			if (window.webkitCancelAnimationFrame) {
				window.taccgl_cancelAnimationFrame = webkitCancelAnimationFrame
			} else {
				if (window.mozCancelAnimationFrame) {
					window.taccgl_cancelAnimationFrame = mozCancelAnimationFrame
				} else {
					if (window.msCancelAnimationFrame) {
						window.taccgl_cancelAnimationFrame = msCancelAnimationFrame
					} else {
						if (window.oCancelAnimationFrame) {
							window.taccgl_cancelAnimationFrame = oCancelAnimationFrame
						}
					}
				}
			}
		}
		if (cv && cv.getContext) {
			var g = null;
			if (taccgl_3d) {
				try {
					var opt = {
						antialias : true,
						stencil : false,
						premultipliedAlpha : true,
						preserveDrawingBuffer : false,
						failIfMajorPerformanceCaveat : true
					};
					g = cv.getContext("experimental-webgl", opt);
					if (!g) {
						g = cv.getContext("webgl", opt)
					}
					if (!g) {
						g = cv.getContext("webkit-3d", opt)
					}
				} catch (e) {
					g = null
				} finally {
				}
			}
			if (g && taccgl_3d) {
				this.g = g;
				this.cv = cv;
				this.dddmode = true;
				this.ddmode = false;
				this.compatmode = false
			} else {
				g = cv.getContext("2d");
				if (g) {
					this.g = g;
					this.cv = cv;
					this.dddmode = false;
					this.ddmode = true;
					this.compatmode = false
				}
			}
		}
		this.dddCanvas = new this.createDDDCanvas();
		this.controller = new this.createForwardingController();
		this.controller.attach();
		this.stdLight = this.lightSource();
		this.initialized = true;
		this.quality = 2;
		this.TM = this.m44I();
		this.TM_1T = this.m33I()
	};
	this.perfnow = function() {
		if (window.performance && window.performance.now) {
			return window.performance.now()
		} else {
			return new Date().getTime()
		}
	};
	this.epWarningText = function() {
		return "<form><h2>"
				+ taccgl_epwarning.replace(/ONLINE/, "ONLINE</h2>")
				+ '<p><ul> <li> <button name="Disable" type="button" onclick="taccgl.epDisable()">Disable</button>Animations on this page <li> <button name="Acknowlege Warning" type="button" onclick="taccgl.epEnable()"/>Acknowledge Warning</button> and enable animation on your own risk </ul><input type="checkbox" name="taccgl_epcookie" value="x"> Apply selection to all pages of this website (requires setting a cookie)</form>'
	};
	this.epWarningStyle = function() {
		if (window.screen && window.screen.width && window.screen.width < 800) {
			return "position:absolute; top:0px; left:0px; z-index:10000;display:none;background-color:white; font-size:12px;padding:20px; border: ridge 3px silver; width:"
					+ (window.screen.width - 60) + "px"
		} else {
			return "position:fixed; width:700px; top:20px; left:20px; z-index:10000;display:none;background-color:white; font-size:16px;padding:20px; border: ridge 3px silver"
		}
	};
	this.epWarning = function() {
		if (document.body.insertAdjacentHTML) {
			var w = document.getElementById("taccgl_epwarning");
			if (!w) {
				document.body.insertAdjacentHTML("afterbegin",
						'<div id="taccgl_epwarning" style="'
								+ this.epWarningStyle() + '">'
								+ this.epWarningText() + "</div>")
			}
		}
	};
	this.disabledWarningStyle = function() {
		return "position:fixed; width:120px; font-size:12px; top:0px; left:0px; z-index:10000;display:none;background-color:white;padding:2px; border-right: ridge 1px silver; border-bottom: ridge 1px silver; vertical-align:middle;"
	};
	this.disabledWarningText = function() {
		var x = 'Animations&nbsp;<a href="javascript:taccgl.epUnset();" title="click to enable">disabled</a>';
		return x
	};
	this.disabledWarning = function() {
		if (document.body.insertAdjacentHTML) {
			var w = document.getElementById("taccgl_disabledWarning");
			if (!w) {
				document.body.insertAdjacentHTML("afterbegin",
						'<div id="taccgl_disabledWarning" style="'
								+ this.disabledWarningStyle() + '">'
								+ this.disabledWarningText() + "</div>")
			}
		}
	};
	this.showEpWarning = function() {
		var w = document.getElementById("taccgl_epwarning");
		w.style.display = "";
		this.busy = true;
		this.showWarning = true
	};
	this.showDisabledWarning = function() {
		this.disabledWarning();
		var w = document.getElementById("taccgl_disabledWarning");
		w.style.display = "";
		this.busy = false
	};
	this.epcheck = function() {
		if (this.epack) {
			return true
		}
		if (this.epack == false) {
			this.showDisabledWarning();
			return false
		}
		this.epWarning();
		this.cancelDraw();
		this.showEpWarning();
		return "wait"
	};
	this.hideEpWarning = function() {
		var w = document.getElementById("taccgl_epwarning");
		w.style.display = "none";
		this.showWarning = false
	};
	this.hidedisabledWarning = function() {
		var w = document.getElementById("taccgl_disabledWarning");
		w.style.display = "none"
	};
	this.epEnable = function() {
		var cb = document.getElementsByName("taccgl_epcookie")[0];
		if (cb && cb.checked) {
			document.cookie = "taccgl_epack=true"
		}
		this.epack = true;
		this.hideEpWarning();
		if (this.draw_running) {
			this.continueDraw();
			this.beginIgnoreDrop();
			this.endIgnoreDrop(true)
		}
		this.start()
	};
	this.epDisable = function() {
		var cb = document.getElementsByName("taccgl_epcookie")[0];
		if (cb && cb.checked) {
			document.cookie = "taccgl_epack=false";
			this.showDisabledWarning()
		}
		this.epack = false;
		this.hideEpWarning();
		this.start()
	};
	this.epUnset = function() {
		this.epack = null;
		document.cookie = "taccgl_epack=";
		this.hidedisabledWarning()
	};
	this.canvasOnMouseMove = function(e) {
		if (!e) {
			e = window.event
		}
		this.mouseX = e.clientX;
		this.mouseY = e.clientY
	};
	this.ddFallBack = function() {
		if (this.dddmode || this.ddmode) {
			return
		}
		var cv = document.getElementById("taccgl_canvas3d");
		if (!cv) {
			return
		}
		if (!cv.getContext) {
			return
		}
		if (this.webglerror) {
			document.body.removeChild(cv);
			if (document.body.insertAdjacentHTML) {
				document.body
						.insertAdjacentHTML(
								"afterbegin",
								'<canvas id="taccgl_canvas3d" width="10" height="10" style="position:absolute; top:0px; left:0px; z-index:-1"></canvas>')
			}
			cv = document.getElementById("taccgl_canvas3d")
		}
		var g = cv.getContext("2d");
		if (g) {
			this.g = g;
			this.cv = cv;
			this.dddmode = false;
			this.ddmode = true;
			this.compatmode = false;
			this.resizeBody()
		}
	};
	this.showHideComments = function() {
		var e;
		if (this.ddmode == this.shddmode && this.dddmode == this.shdddmode) {
			return
		}
		this.shddmode = this.ddmode;
		this.shdddmode = this.dddmode;
		if (e = document.getElementById("taccgl_CommentImage")) {
			if (this.ddmode) {
				e.src = taccgl_Com_ddmode
			}
			if (this.dddmode) {
				e.src = taccgl_Com_dddmode
			}
			if (!(this.dddmode || this.ddmode)) {
				e.src = taccgl_Com_off
			}
		}
		if (document.getElementsByClassName) {
			var s = document.getElementsByClassName("taccgl_cl_ddmode");
			for (i = 0; i < s.length; i++) {
				s[i].style.display = this.ddmode ? "inherit" : "none"
			}
			s = document.getElementsByClassName("taccgl_cl_dddmode");
			for (i = 0; i < s.length; i++) {
				s[i].style.display = this.dddmode ? "inherit" : "none"
			}
			s = document.getElementsByClassName("taccgl_cl_active");
			for (i = 0; i < s.length; i++) {
				s[i].style.display = (this.ddmode || this.dddmode) ? "inherit"
						: "none"
			}
			s = document.getElementsByClassName("taccgl_cl_inactive");
			for (i = 0; i < s.length; i++) {
				s[i].style.display = (!(this.ddmode || this.dddmode)) ? "inherit"
						: "none"
			}
			s = document.getElementsByClassName("taccgl_cl_can3derror");
			for (i = 0; i < s.length; i++) {
				s[i].style.display = (this.can3derror) ? "inherit" : "none"
			}
		} else {
			var i, all, el;
			if (document.all) {
				all = document.all
			} else {
				all = document.getElementsByTagName("*")
			}
			for (i = 0; i < all.length; i++) {
				el = all[i];
				if (el.className) {
					if (el.className.match(/taccgl_cl_inactive/)) {
						el.style.display = "block"
					}
				}
			}
		}
	};
	this.tonresize = function() {
		this.doHook(this.onResize)
	};
	this.resizeBody = function() {
		this.adjustQuality();
		return
	};
	this.adjustEye = function(x, y, z) {
		taccgl.eyeX = x;
		taccgl.eyeY = y;
		taccgl.eyeZ = z;
		if (this.stdsc) {
			this.createShaders();
			this.adjustQuality()
		}
	};
	this.adjustCanvasRaw = function(x, y, w, h) {
		if (!this.cv) {
			return
		}
		if (window.taccgl_maxCanHeight) {
			if (h > taccgl_maxCanHeight) {
				h = taccgl_maxCanHeight
			}
		}
		if (window.taccgl_maxCanWidth) {
			if (w > taccgl_maxCanWidth) {
				w = taccgl_maxCanWidth
			}
		}
		if (x == this.canvasX && y == this.canvasY && w == this.canvasW
				&& h == this.canvasH && this.canvasPr == this.pr) {
			return
		}
		var wpr = Math.round(w * this.pr), hpr = Math.round(h * this.pr), w1pr = Math
				.round(w / this.pr), h1pr = Math.round(h / this.pr);
		if (this.canvasW != w || this.canvasH != h) {
			this.cv.width = wpr;
			this.cv.style.width = w + "px";
			this.cv.height = hpr;
			this.cv.style.height = h + "px"
		}
		this.cv.style.top = y + "px";
		this.cv.style.left = x + "px";
		this.canvasX = x;
		this.canvasY = y;
		this.canvasW = w;
		this.canvasH = h;
		this.canvasPr = this.pr;
		if (this.dddmode) {
			this.g.viewport(0, 0, wpr, hpr)
		}
		this.setCanvasDim(x, y, w, h)
	};
	this.adjustCanvas = function(x, y, w, h) {
		var b = document.body, st = b.scrollTop, sl = b.scrollLeft;
		if (window.pageXOffset) {
			sl = window.pageXOffset
		}
		if (window.pageYOffset) {
			st = window.pageYOffset
		}
		if (x < sl) {
			x = sl
		}
		if (y < st) {
			y = st
		}
		var x1 = x + w, y1 = y + h;
		if (x1 > window.innerWidth + sl) {
			x1 = window.innerWidth + sl;
			x = x1 - w
		}
		if (y1 > window.innerHeight + st) {
			y1 = window.innerHeight + st;
			y = y1 - h
		}
		if (x < sl) {
			x = sl
		}
		if (y < st) {
			y = st
		}
		this.adjustCanvasRaw(x, y, x1 - x, y1 - y)
	};
	this.adjustLowQuality = function() {
		if (this.lqc_w) {
			this.adjustCanvas(this.lqc_x, this.lqc_y, this.lqc_w, this.lqc_h)
		} else {
			var x = 0, y = 0, b = document.body;
			var h = window.innerHeight, w = window.innerWidth;
			var st = b.scrollTop, sl = b.scrollLeft;
			if (window.pageXOffset) {
				sl = window.pageXOffset
			}
			if (window.pageYOffset) {
				st = window.pageYOffset
			}
			x = sl;
			y = st;
			var mw = 512, mh = 512;
			if (window.innerWidth > mw) {
				x = sl + Math.floor((window.innerWidth - mw) / 2);
				w = mw
			}
			if (window.innerHeight > mh) {
				y = st + Math.floor((window.innerHeight - mh) / 2);
				h = mh
			}
			this.adjustCanvas(x, y, w, h)
		}
	};
	this.adjustNormalQuality = function() {
		if (this.nqc_w) {
			this.adjustCanvas(this.nqc_x, this.nqc_y, this.nqc_w, this.nqc_h)
		} else {
			var x = 0, y = 0, w = document.body.clientWidth, h = document.body.clientHeight;
			var mw = 1024;
			if (w > mw) {
				x = Math.floor((w - mw) / 2);
				w = mw
			}
			this.adjustCanvas(x, y, w, h)
		}
	};
	this.adjustHighQuality = function() {
		this.adjustCanvas(0, 0, document.body.clientWidth,
				document.body.clientHeight + this.heightExtension)
	};
	this.adjustQuality = function() {
		if (this.quality >= taccgl.hardFailQ) {
			this.quality = taccgl.hardFailQ - 1
		}
		if (this.quality == 1) {
			this.adjustLowQuality()
		}
		if (this.quality == 2) {
			this.adjustNormalQuality()
		}
		if (this.quality == 3) {
			this.adjustHighQuality()
		}
	};
	this.LQCanvas = function(x, y, w, h) {
		this.lqc_x = x;
		this.lqc_y = y;
		this.lqc_w = w;
		this.lqc_h = h;
		if (this.quality == 1) {
			this.adjustQuality()
		}
	};
	this.NQCanvas = function(x, y, w, h) {
		this.nqc_x = x;
		this.nqc_y = y;
		this.nqc_w = w;
		this.nqc_h = h;
		if (this.quality == 2) {
			this.adjustQuality()
		}
	};
	this.beginIgnoreDrop = function() {
		this.startTimeIGD = this.perfnow()
	};
	this.endIgnoreDrop = function(pause) {
		if (!this.startTimeIGD) {
			return
		}
		var now = this.perfnow();
		if (pause) {
			var d = now
					- (this.currenttime * this.draw_duration + this.draw_startTime);
			this.draw_startTime += d
		} else {
		}
		this.draw_meaIgnore = 3
	};
	this.setHandlers = function() {
		window.onscroll = taccgl_onscroll;
		window.onresize = taccgl_onresize;
		document.body.onresize = taccgl_onresize;
		document.body.onmousemove = taccgl_onmousemove
	};
	this.init = function() {
		this.init1();
		this.setHandlers();
		this.createShaders();
		this.ddFallBack()
	};
	this.createVertexShader = function(t) {
		var g = this.g;
		if (!t.match(/\n/)) {
			var el = document.getElementById(t);
			if (el) {
				t = el.innerText;
				if (!t) {
					t = el.text
				}
			}
		}
		var vs = g.createShader(g.VERTEX_SHADER);
		g.shaderSource(vs, t);
		g.compileShader(vs);
		if (!g.getShaderParameter(vs, g.COMPILE_STATUS)) {
			this.webglerror = true
		}
		return vs
	};
	this.logNumberedText = function(t) {
		var a = t.split("\n");
		var i = 0, r = "";
		while (i < a.length) {
			r += (i + 1) + "\t" + a[i] + "\n";
			i++
		}
		taccgl.clog(r)
	};
	this.createFragmentShader = function(t) {
		if (!this.dddmode) {
			return null
		}
		if (!t.match(/\n/)) {
			var el = document.getElementById(t);
			if (el) {
				t = el.innerText;
				if (!t) {
					t = el.text
				}
			}
		}
		var fs = this.g.createShader(this.g.FRAGMENT_SHADER);
		this.g.shaderSource(fs, t);
		this.g.compileShader(fs);
		if (!this.g.getShaderParameter(fs, this.g.COMPILE_STATUS)) {
			this.webglerror = true
		}
		return fs
	};
	this.bindProgramAttributes = function(p) {
		var g = this.g;
		g.bindAttribLocation(p, 0, "pos");
		g.bindAttribLocation(p, 1, "origin");
		g.bindAttribLocation(p, 2, "texpos");
		g.bindAttribLocation(p, 3, "rotP");
		g.bindAttribLocation(p, 4, "rotA");
		g.bindAttribLocation(p, 5, "color");
		g.bindAttribLocation(p, 6, "texmix");
		g.bindAttribLocation(p, 7, "accel");
		g.bindAttribLocation(p, 8, "normal")
	};
	this.createShaderProgram = function(vs, fs) {
		var g = this.g, p = g.createProgram();
		g.attachShader(p, vs);
		g.attachShader(p, fs);
		this.bindProgramAttributes(p);
		g.linkProgram(p);
		if (!g.isProgram(p) || !g.getProgramParameter(p, g.LINK_STATUS)) {
			console.timeEnd("createShaderProgram");
			this.webglerror = true;
			g.detachShader(p, vs);
			g.detachShader(p, fs);
			g.deleteProgram(p);
			return null
		}
		g.validateProgram(p);
		if (!g.isProgram(p) || !g.getProgramParameter(p, g.LINK_STATUS)
				|| !g.getProgramParameter(p, g.VALIDATE_STATUS)) {
			this.webglerror = true;
			g.detachShader(p, vs);
			g.detachShader(p, fs);
			g.deleteProgram(p);
			return null
		}
		return p
	};
	this.newShaderConfigPrototype = function() {
		if (this.shaderConfigPrototype) {
			return
		}
		var pt = this.shaderConfigPrototype = new taccglShaderConfigPrototype();
		pt.initShader();
		taccglShaderConfigEmpty.prototype = pt
	};
	this.createShaderConfig = function() {
		this.newShaderConfigPrototype();
		return new taccglShaderConfigEmpty()
	};
	this.createStdShaderConfig = this.ssc = function(n) {
		if (!this.initialized) {
			this.begin()
		}
		this.newShaderConfigPrototype();
		var sc = new taccglShaderConfigEmpty();
		if (n) {
			sc.extendShader(n)
		}
		return sc
	};
	this.cvxmin = function(z) {
		return ((this.eyeX - this.cvpx) * z + this.cvpx * this.eyeZ)
				/ this.eyeZ
	};
	this.cvxmax = function(z) {
		return -((this.cvpw - this.eyeX + this.cvpx) * z - this.eyeZ
				* this.cvpw - this.cvpx * this.eyeZ)
				/ this.eyeZ
	};
	this.cvymin = function(z) {
		return ((this.eyeY - this.cvpy) * z + this.cvpy * this.eyeZ)
				/ this.eyeZ
	};
	this.cvymax = function(z) {
		return -((this.cvph - this.eyeY + this.cvpy) * z - this.eyeZ
				* this.cvph - this.cvpy * this.eyeZ)
				/ this.eyeZ
	};
	this.adjustShcvp = function() {
		var zfront = this.zFront, zback = this.zBack;
		var xmin = this.cvxmin(zfront), xmax = this.cvxmax(zfront);
		this.shcvpw = (this.stdLight.z * xmin - this.stdLight.z * xmax)
				/ (zfront - this.stdLight.z);
		this.shcvpx = (this.stdLight.x * zfront - this.stdLight.z * xmin)
				/ (zfront - this.stdLight.z);
		xmin = this.cvxmin(zback);
		xmax = this.cvxmax(zback);
		var cx = (this.stdLight.x * zback - this.stdLight.z * xmin)
				/ (zback - this.stdLight.z);
		if (cx < this.shcvpx) {
			this.shcvpw += this.shcvpx - cx;
			this.shcvpx = cx
		}
		var cw = (this.stdLight.z * xmin - this.stdLight.z * xmax)
				/ (zback - this.stdLight.z);
		if (cx + cw > this.shcvpx + this.shcvpw) {
			this.shcvpw = cx + cw - this.shcvpx
		}
		var ymin = this.cvymin(zfront), ymax = this.cvymax(zfront);
		this.shcvph = (this.stdLight.z * ymin - this.stdLight.z * ymax)
				/ (zfront - this.stdLight.z);
		this.shcvpy = (this.stdLight.y * zfront - this.stdLight.z * ymin)
				/ (zfront - this.stdLight.z);
		ymin = this.cvymin(zback);
		ymax = this.cvymax(zback);
		var cy = (this.stdLight.y * zback - this.stdLight.z * ymin)
				/ (zback - this.stdLight.z);
		if (cy < this.shcvpy) {
			this.shcvph += this.shcvpy - cy;
			this.shcvpy = cy
		}
		var ch = (this.stdLight.z * ymin - this.stdLight.z * ymax)
				/ (zback - this.stdLight.z);
		if (cy + ch > this.shcvpy + this.shcvph) {
			this.shcvph = cy + ch - this.shcvpy
		}
	};
	this.setCanvasDim = function(cpx, cpy, w, h) {
		this.cvpx = cpx;
		this.cvpy = cpy;
		this.cvpw = w;
		this.cvph = h;
		this.adjustShcvp()
	};
	this.createShaders = function() {
		if (this.stdsc) {
			this.stdsc.freeCompiled()
		} else {
			this.stdsc = this.createStdShaderConfig("taccgl_Shaders")
		}
		this.stdsc.compile();
		this.p = this.stdsc.p;
		if (!this.p) {
			this.dddmode = false
		}
		if (this.stdsc.advProg) {
			this.shadowEna = true
		} else {
			this.shadowEna = false
		}
	};
	this.replaceShaderVariables = function(t) {
		t = t.replace(/\$\$EYEX/g, Math.floor(this.eyeX) + ".0");
		t = t.replace(/\$\$EYEY/g, Math.floor(this.eyeY) + ".0");
		t = t.replace(/\$\$EYEZ/g, Math.floor(this.eyeZ) + ".0");
		t = t.replace(/\$\$TEXTURECANVASWIDTH/g, taccgl_texCanWidth + ".0");
		t = t.replace(/\$\$TEXTURECANVASHEIGHT/g, taccgl_texCanHeight + ".0");
		return t
	};
	this.setupTextures = function() {
		if (!this.dddmode) {
			return
		}
		var g = taccgl.g;
		var e;
		var tcv = document.getElementById("taccgl_textureCanvas"), tcv2 = document
				.getElementById("taccgl_textureCanvas2");
		if (tcv.getContext) {
			if (!this.draw_texturecanvas) {
				this.draw_texturecanvas = g.createTexture();
				this.textureCanvasChanged = true
			}
			if (!this.draw_texturecanvas2) {
				this.draw_texturecanvas2 = g.createTexture();
				this.textureCanvasChanged2 = true
			}
			if (this.textureCanvasChanged) {
				var tex = this.draw_texturecanvas;
				g.activeTexture(g.TEXTURE0);
				g.bindTexture(g.TEXTURE_2D, tex);
				var t = tcv.getContext("2d");
				g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
				if ((e = g.getError()) != 0) {
					this.dddmode = false;
					this.webglerror = true;
					return
				}
				g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE,
						tcv);
				if ((e = g.getError()) != 0) {
					this.dddmode = false;
					this.webglerror = true;
					return
				}
				if (taccgl_mipmap) {
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER,
							g.LINEAR);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER,
							g.LINEAR_MIPMAP_NEAREST);
					g.generateMipmap(g.TEXTURE_2D);
					if ((e = g.getError()) != 0) {
						this.dddmode = false;
						this.webglerror = true;
						return
					}
				} else {
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER,
							g.LINEAR);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER,
							g.LINEAR);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S,
							g.CLAMP_TO_EDGE);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T,
							g.CLAMP_TO_EDGE)
				}
				this.textureCanvasChanged = false
			}
			if (this.textureCanvasChanged2) {
				tex = this.draw_texturecanvas2;
				g.activeTexture(g.TEXTURE1);
				g.bindTexture(g.TEXTURE_2D, tex);
				t = tcv2.getContext("2d");
				g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
				if ((e = g.getError()) != 0) {
					alert("Error " + e + " before texImage2D texturecanvas 2")
				}
				g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE,
						tcv2);
				if ((e = g.getError()) != 0) {
					this.dddmode = false;
					this.webglerror = true;
					return
				}
				if (taccgl_mipmap) {
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER,
							g.LINEAR);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER,
							g.LINEAR_MIPMAP_NEAREST);
					g.generateMipmap(g.TEXTURE_2D)
				} else {
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER,
							g.LINEAR);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER,
							g.LINEAR);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S,
							g.CLAMP_TO_EDGE);
					g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T,
							g.CLAMP_TO_EDGE)
				}
				this.textureCanvasChanged2 = false
			}
		}
		this.draw_meaIgnore = 3
	};
	this.cvert = function(r, g, b, o) {
	};
	this.nvertAcceleration = function(x, y, z) {
		this.vertAcceleration[4 * this.vertI - 4] = x;
		this.vertAcceleration[4 * this.vertI - 3] = y;
		this.vertAcceleration[4 * this.vertI - 2] = z
	};
	this.nvertTexMove = function(s, t) {
		this.vertTexPos[4 * this.vertI - 2] = s;
		this.vertTexPos[4 * this.vertI - 1] = t
	};
	this.nvertTexMove4 = function(s0, t0, s1, t1) {
		this.vertTexPos[4 * this.vertI - 4] = s0;
		this.vertTexPos[4 * this.vertI - 3] = t0;
		this.vertTexPos[4 * this.vertI - 2] = s1;
		this.vertTexPos[4 * this.vertI - 1] = t1
	};
	this.nvertRot = function(px, py, pz, ax, ay, az, from, to) {
		this.vertRotP[4 * this.vertI - 4] = px;
		this.vertRotP[4 * this.vertI - 3] = py;
		this.vertRotP[4 * this.vertI - 2] = pz;
		this.vertRotP[4 * this.vertI - 1] = from;
		this.vertRotA[4 * this.vertI - 4] = ax;
		this.vertRotA[4 * this.vertI - 3] = ay;
		this.vertRotA[4 * this.vertI - 2] = az;
		this.vertRotA[4 * this.vertI - 1] = to
	};
	this.nvertTime = function(basetime, duration, flags) {
		this.vertOrigin[4 * this.vertI + 3] = basetime;
		this.vertPos[4 * this.vertI + 3] = flags;
		this.vertAcceleration[4 * this.vertI + 3] = duration;
		this.vertI += 1
	};
	this.nvertMove = function(x0, y0, z0, x, y, z, nx, ny, nz, spec, s, t,
			flags, basetime, duration) {
		if (16 * this.vertI >= this.vertBufferSize) {
			this.ResizeVertexBuffers(2 * this.vertBufferSize)
		}
		this.vertOrigin[4 * this.vertI] = x0;
		this.vertOrigin[4 * this.vertI + 1] = y0;
		this.vertOrigin[4 * this.vertI + 2] = z0;
		this.vertOrigin[4 * this.vertI + 3] = basetime;
		this.vertPos[4 * this.vertI] = x;
		this.vertPos[4 * this.vertI + 1] = y;
		this.vertPos[4 * this.vertI + 2] = z;
		this.vertPos[4 * this.vertI + 3] = flags;
		this.vertTexPos[4 * this.vertI] = s;
		this.vertTexPos[4 * this.vertI + 1] = t;
		this.vertTexPos[4 * this.vertI + 2] = s;
		this.vertTexPos[4 * this.vertI + 3] = t;
		this.vertRotA[4 * this.vertI + 3] = 0;
		this.vertAcceleration[4 * this.vertI] = 0;
		this.vertAcceleration[4 * this.vertI + 1] = 0;
		this.vertAcceleration[4 * this.vertI + 2] = 0;
		this.vertAcceleration[4 * this.vertI + 3] = duration;
		this.vertNormal[4 * this.vertI + 0] = nx;
		this.vertNormal[4 * this.vertI + 1] = ny;
		this.vertNormal[4 * this.vertI + 2] = nz;
		this.vertNormal[4 * this.vertI + 3] = spec;
		this.vertI += 1
	};
	this.nvertColor = function(c0s, c0t, c1s, c1t, m0, m1, mm0, mm1) {
		var i = 4 * this.vertI, vc = this.vertColor, tm = this.vertTexmix;
		vc[i - 4] = c0s;
		vc[i - 3] = c0t;
		vc[i - 2] = c1s;
		vc[i - 1] = c1t;
		tm[i - 4] = m0;
		tm[i - 3] = mm0;
		tm[i - 2] = m1;
		tm[i - 1] = mm1
	};
	this.nvertColor3 = function(c0s, c0t, c1s, c1t, m0, m1, mm0, mm1) {
		var i = 4 * this.vertI, vc = this.vertColor, tm = this.vertTexmix;
		vc[i - 4] = c0s;
		vc[i - 3] = c0t;
		vc[i - 2] = c1s;
		vc[i - 1] = c1t;
		tm[i - 4] = m0;
		tm[i - 3] = mm0;
		tm[i - 2] = m1;
		tm[i - 1] = mm1;
		vc[i - 8] = c0s;
		vc[i - 7] = c0t;
		vc[i - 6] = c1s;
		vc[i - 5] = c1t;
		tm[i - 8] = m0;
		tm[i - 7] = mm0;
		tm[i - 6] = m1;
		tm[i - 5] = mm1;
		vc[i - 12] = c0s;
		vc[i - 11] = c0t;
		vc[i - 10] = c1s;
		vc[i - 9] = c1t;
		tm[i - 12] = m0;
		tm[i - 11] = mm0;
		tm[i - 10] = m1;
		tm[i - 9] = mm1
	};
	this.nvertColor6 = function(c0s, c0t, c1s, c1t, m0, m1, mm0, mm1) {
		var i = 4 * this.vertI, vc = this.vertColor, tm = this.vertTexmix;
		vc[i - 4] = c0s;
		vc[i - 3] = c0t;
		vc[i - 2] = c1s;
		vc[i - 1] = c1t;
		tm[i - 4] = m0;
		tm[i - 3] = mm0;
		tm[i - 2] = m1;
		tm[i - 1] = mm1;
		vc[i - 8] = c0s;
		vc[i - 7] = c0t;
		vc[i - 6] = c1s;
		vc[i - 5] = c1t;
		tm[i - 8] = m0;
		tm[i - 7] = mm0;
		tm[i - 6] = m1;
		tm[i - 5] = mm1;
		vc[i - 12] = c0s;
		vc[i - 11] = c0t;
		vc[i - 10] = c1s;
		vc[i - 9] = c1t;
		tm[i - 12] = m0;
		tm[i - 11] = mm0;
		tm[i - 10] = m1;
		tm[i - 9] = mm1;
		vc[i - 16] = c0s;
		vc[i - 15] = c0t;
		vc[i - 14] = c1s;
		vc[i - 13] = c1t;
		tm[i - 16] = m0;
		tm[i - 15] = mm0;
		tm[i - 14] = m1;
		tm[i - 13] = mm1;
		vc[i - 20] = c0s;
		vc[i - 19] = c0t;
		vc[i - 18] = c1s;
		vc[i - 17] = c1t;
		tm[i - 20] = m0;
		tm[i - 19] = mm0;
		tm[i - 18] = m1;
		tm[i - 17] = mm1;
		vc[i - 24] = c0s;
		vc[i - 23] = c0t;
		vc[i - 22] = c1s;
		vc[i - 21] = c1t;
		tm[i - 24] = m0;
		tm[i - 23] = mm0;
		tm[i - 22] = m1;
		tm[i - 21] = mm1
	};
	this.nvertNormal = function(nx, ny, nz, spec) {
		this.vertNormal[4 * this.vertI - 4] = nx;
		this.vertNormal[4 * this.vertI - 3] = ny;
		this.vertNormal[4 * this.vertI - 2] = nz;
		this.vertNormal[4 * this.vertI - 1] = spec
	};
	this.nvertOffset = function(i) {
		this.vertI += i
	};
	this.AllocateVertexBuffers = function(size) {
		size = Math.ceil(size / 16) * 16;
		var vertPosBuffer = new ArrayBuffer(size);
		this.vertPos = new Float32Array(vertPosBuffer);
		var vertOriginBuffer = new ArrayBuffer(size);
		this.vertOrigin = new Float32Array(vertOriginBuffer);
		var vertTexPosBuffer = new ArrayBuffer(size);
		this.vertTexPos = new Float32Array(vertTexPosBuffer);
		var vertRotPBuffer = new ArrayBuffer(size);
		this.vertRotP = new Float32Array(vertRotPBuffer);
		var vertRotABuffer = new ArrayBuffer(size);
		this.vertRotA = new Float32Array(vertRotABuffer);
		var vertcolorBuffer = new ArrayBuffer(size);
		this.vertColor = new Float32Array(vertcolorBuffer);
		var verttexmixBuffer = new ArrayBuffer(size);
		this.vertTexmix = new Float32Array(verttexmixBuffer);
		var vertAccelerationBuffer = new ArrayBuffer(size);
		this.vertAcceleration = new Float32Array(vertAccelerationBuffer);
		var vertnormalBuffer = new ArrayBuffer(size);
		this.vertNormal = new Float32Array(vertnormalBuffer);
		this.vertBufferSize = size
	};
	this.ResizeVertexBuffers = function(size) {
		var vertPos = this.vertPos;
		var vertOrigin = this.vertOrigin;
		var vertTexPos = this.vertTexPos;
		var vertRotP = this.vertRotP;
		var vertRotA = this.vertRotA;
		var vertColor = this.vertColor;
		var vertTexmix = this.vertTexmix;
		var vertAcceleration = this.vertAcceleration;
		var vertNormal = this.vertNormal;
		this.AllocateVertexBuffers(size);
		var cs = size;
		if (this.vertBufferSize < cs) {
			cs = this.vertBufferSize
		}
		this.vertPos.set(vertPos);
		this.vertOrigin.set(vertOrigin);
		this.vertTexPos.set(vertTexPos);
		this.vertRotP.set(vertRotP);
		this.vertRotA.set(vertRotA);
		this.vertColor.set(vertColor);
		this.vertTexmix.set(vertTexmix);
		this.vertAcceleration.set(vertAcceleration);
		this.vertNormal.set(vertNormal);
		this.vertBufferSize = size
	};
	this.StartRender = function() {
		if (!this.initialized) {
			this.init()
		}
		this.delno++;
		if (this.dddmode) {
			if (!this.vertPos) {
				var size;
				if (window.taccgl_vertexMem) {
					size = taccgl_vertexMem
				} else {
					size = 500000
				}
				this.AllocateVertexBuffers(size)
			}
			this.vertI = 0;
			this.shprog = Array(0);
			this.shprogfrom = Array(0);
			this.shprog.push(this.stdsc);
			this.shprogfrom.push(0)
		}
		if (this.ddmode) {
			this.AA = Array(0);
			this.AAstartedLength = 0
		}
		this.duration = 0;
		this.foregroundCnt = 0;
		this.currenttime = 0;
		this.doat = Array(0);
		this.showAfterAnimation = Array(0);
		this.renderingStarted = true;
		this.adjustQuality();
		this.lqc_w = null
	};
	this.BgControl = function(b) {
		this.vBgControl = b
	};
	this.setEndMode = function(m) {
		this.endMode = m
	};
	this.setEndStyle = function(st) {
		if (st) {
			this.endStyle = st
		} else {
			this.endStyle = {
				transition : "opacity 0.25s, visibility 0.25s",
				opacity : "0",
				visibility : "hidden"
			}
		}
	};
	this.begin = function() {
		if (!this.initialized) {
			this.init();
			this.StartRender()
		}
	};
	this.adjustForeground = function() {
		if (this.foregroundCnt > 0) {
			this.cv.style.zIndex = this.foreground_zIndex
		} else {
			this.cv.style.zIndex = this.background_zIndex
		}
	};
	this.incForeground = function() {
		this.foregroundCnt++;
		if (this.foregroundCnt == 1) {
			this.adjustForeground()
		}
	};
	this.decForeground = function() {
		this.foregroundCnt--;
		if (this.foregroundCnt == 0) {
			this.adjustForeground()
		}
		if (this.foregroundCnt == -1) {
			alert("decForeground called more often that incForeground")
		}
	};
	this.bindDraw = function(g, p) {
		var e;
		if ((e = g.getError()) != 0) {
			alert("Error " + e + " before clearColor")
		}
		g.clearColor(0, 0, 0, 0);
		if ((e = g.getError()) != 0) {
			this.webglerror = true;
			this.dddmode = false;
			this.drawImmediateTerm()
		}
		g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
		if ((e = g.getError()) != 0) {
			this.webglerror = true;
			this.dddmode = false;
			this.drawImmediateTerm()
		}
		g.enable(g.DEPTH_TEST);
		g.depthFunc(g.LEQUAL);
		g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA);
		g.enable(g.BLEND);
		this.draw_locTime = g.getUniformLocation(p, "uTime");
		this.draw_locCvp = g.getUniformLocation(p, "cvp");
		this.draw_locpos = g.getAttribLocation(p, "pos");
		this.draw_locOrigin = g.getAttribLocation(p, "origin");
		this.draw_loctexpos = g.getAttribLocation(p, "texpos");
		this.draw_locrotp = g.getAttribLocation(p, "rotP");
		this.draw_locrota = g.getAttribLocation(p, "rotA");
		this.draw_loccolor = g.getAttribLocation(p, "color");
		this.draw_loctexmix = g.getAttribLocation(p, "texmix");
		this.draw_locnormal = g.getAttribLocation(p, "normal");
		this.draw_locacceleration = g.getAttribLocation(p, "accel");
		this.draw_locuTexture = g.getUniformLocation(p, "uTexture");
		this.draw_locuTexture2 = g.getUniformLocation(p, "uTexture2");
		this.draw_vertexPosBufferObjekt = g.createBuffer();
		g.enableVertexAttribArray(this.draw_locpos);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexPosBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertPos, g.DYNAMIC_DRAW);
		this.draw_originBufferObjekt = g.createBuffer();
		g.enableVertexAttribArray(this.draw_locOrigin);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_originBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertOrigin, g.DYNAMIC_DRAW);
		this.draw_vertexTexPosBufferObjekt = g.createBuffer();
		g.enableVertexAttribArray(this.draw_loctexpos);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexTexPosBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertTexPos, g.DYNAMIC_DRAW);
		if (this.draw_locrotp >= 0) {
			this.draw_rotPBufferObjekt = g.createBuffer();
			g.enableVertexAttribArray(this.draw_locrotp);
			g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotPBufferObjekt);
			g.bufferData(g.ARRAY_BUFFER, this.vertRotP, g.DYNAMIC_DRAW)
		}
		this.draw_accelerationBufferObjekt = g.createBuffer();
		g.enableVertexAttribArray(this.draw_locacceleration);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_accelerationBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertAcceleration, g.DYNAMIC_DRAW);
		if (this.draw_locrotp >= 0) {
			this.draw_rotABufferObjekt = g.createBuffer();
			g.enableVertexAttribArray(this.draw_locrota);
			g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotABufferObjekt);
			g.bufferData(g.ARRAY_BUFFER, this.vertRotA, g.DYNAMIC_DRAW)
		}
		if (this.draw_loccolor >= 0) {
			this.draw_colorBufferObjekt = g.createBuffer();
			g.enableVertexAttribArray(this.draw_loccolor);
			g.bindBuffer(g.ARRAY_BUFFER, this.draw_colorBufferObjekt);
			g.bufferData(g.ARRAY_BUFFER, this.vertColor, g.DYNAMIC_DRAW)
		}
		if (this.draw_loctexmix >= 0) {
			this.draw_texmixBufferObjekt = g.createBuffer();
			g.enableVertexAttribArray(this.draw_loctexmix);
			g.bindBuffer(g.ARRAY_BUFFER, this.draw_texmixBufferObjekt);
			g.bufferData(g.ARRAY_BUFFER, this.vertTexmix, g.DYNAMIC_DRAW);
			if ((e = g.getError()) != 0) {
				alert("Error " + e + " on bufferData texmix")
			}
		}
		if (this.draw_locnormal >= 0) {
			this.draw_normalBufferObjekt = g.createBuffer();
			g.enableVertexAttribArray(this.draw_locnormal);
			g.bindBuffer(g.ARRAY_BUFFER, this.draw_normalBufferObjekt);
			g.bufferData(g.ARRAY_BUFFER, this.vertNormal, g.DYNAMIC_DRAW)
		}
		this.cv.style.transition = "";
		this.cv.style.display = this.epack != false ? "" : "none";
		this.cv.style.opacity = 1;
		this.cv.style.visibility = "visible";
		this.draw_vertexnumber = this.vertI;
		this.draw_shprognumber = this.shprog.length;
		var jaccobj = taccgl;
		g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_vertexPosBufferObjekt);
		g.vertexAttribPointer(jaccobj.draw_locpos, 4, g.FLOAT, false, 0, 0);
		g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_originBufferObjekt);
		g.vertexAttribPointer(jaccobj.draw_locOrigin, 4, g.FLOAT, false, 0, 0);
		g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_vertexTexPosBufferObjekt);
		g.vertexAttribPointer(jaccobj.draw_loctexpos, 4, g.FLOAT, false, 0, 0);
		if (jaccobj.draw_locrotp >= 0) {
			g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_rotPBufferObjekt);
			g
					.vertexAttribPointer(jaccobj.draw_locrotp, 4, g.FLOAT,
							false, 0, 0)
		}
		if (jaccobj.draw_locrota >= 0) {
			g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_rotABufferObjekt);
			g
					.vertexAttribPointer(jaccobj.draw_locrota, 4, g.FLOAT,
							false, 0, 0)
		}
		if (jaccobj.draw_loccolor >= 0) {
			g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_colorBufferObjekt);
			g.vertexAttribPointer(jaccobj.draw_loccolor, 4, g.FLOAT, false, 0,
					0)
		}
		if (jaccobj.draw_loctexmix >= 0) {
			g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_texmixBufferObjekt);
			g.vertexAttribPointer(jaccobj.draw_loctexmix, 4, g.FLOAT, false, 0,
					0)
		}
		if (jaccobj.draw_locnormal >= 0) {
			g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_normalBufferObjekt);
			g.vertexAttribPointer(jaccobj.draw_locnormal, 4, g.FLOAT, false, 0,
					0)
		}
		g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_accelerationBufferObjekt);
		g.vertexAttribPointer(jaccobj.draw_locacceleration, 4, g.FLOAT, false,
				0, 0);
		g.activeTexture(g.TEXTURE0);
		g.bindTexture(g.TEXTURE_2D, jaccobj.draw_texturecanvas);
		g.activeTexture(g.TEXTURE1);
		g.bindTexture(g.TEXTURE_2D, jaccobj.draw_texturecanvas2)
	};
	this.setupShadow = function() {
		var g = this.g;
		var h = this.shadowH = 2048;
		var w = this.shadowW = 2048;
		this.shadowfb = g.createFramebuffer();
		g.bindFramebuffer(g.FRAMEBUFFER, this.shadowfb);
		this.shadowdb = g.createRenderbuffer();
		g.bindRenderbuffer(g.RENDERBUFFER, this.shadowdb);
		g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, w, h);
		g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT,
				g.RENDERBUFFER, this.shadowdb);
		this.shadowtex = g.createTexture();
		g.activeTexture(g.TEXTURE2);
		g.bindTexture(g.TEXTURE_2D, this.shadowtex);
		g.activeTexture(g.TEXTURE2);
		g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE,
				null);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
		g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0,
				g.TEXTURE_2D, this.shadowtex, 0)
	};
	this.startDraw = function(g, p) {
		var e;
		if (g.isContextLost() || ((e = g.getError()) != 0)) {
			this.dddmode = false;
			this.webglerror = true;
			return
		}
		this.adjustQuality();
		g = this.g;
		p = this.p;
		if (!this.vBgControl) {
			this.incForeground()
		} else {
			this.adjustForeground()
		}
		this.draw_duration = 1000;
		this.doatI = 0;
		var plug = new taccglAnimPlug();
		plug.attime = this.duration;
		this.newDoat(plug);
		this.draw_frames = this.draw_meaFrames = 0;
		this.slowStartupTime = 0;
		this.slowStartupFrames = 0;
		this.bindDraw(g, p);
		if (this.webglerror) {
			return
		}
		this.draw_startTime = this.draw_meaTime = this.perfnow();
		this.draw_meaAdjust = 0;
		this.draw_meaIgnore = 0;
		this.loadTest = false;
		this.loadTestl = 0;
		if (this.shadow) {
			this.setupShadow()
		}
		if (g.isContextLost() || ((e = g.getError()) != 0)) {
			this.dddmode = false;
			this.webglerror = true;
			return
		}
		this.draw_running = true;
		this.busy = true;
		taccgl_draw3d()
	};
	this.updateDraw = function() {
		var g = this.g, e;
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexPosBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertPos, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_originBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertOrigin, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexTexPosBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertTexPos, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotPBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertRotP, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotABufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertRotA, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_colorBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertColor, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_texmixBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertTexmix, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_normalBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertNormal, g.DYNAMIC_DRAW);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_accelerationBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertAcceleration, g.DYNAMIC_DRAW);
		this.doat[this.doat.length - 1].attime = this.duration;
		this.draw_vertexnumber = this.vertI;
		this.draw_shprognumber = this.shprog.length;
		taccgl.draw_meaIgnore = 3
	};
	this.updateDrawDD = function() {
		this.doat[this.doat.length - 1].attime = this.duration;
		this.AAstartedLength = this.AA.length
	};
	this.measureQuality = function() {
		this.qualityCnt[this.quality]++;
		var s = this.qualityCnt[1] + this.qualityCnt[2] + this.qualityCnt[3], me = document
				.getElementById("taccgl_ImmediateMeasureImage");
		if (me) {
			me.src = taccgl_ImmediateMeasureImage + this.quality + ".png";
			var q = this.quality;
			if (q == 0) {
				me.title = "Slow taccGL Animations Disabled."
			}
			if (q == 1) {
				me.title = "For performance reasons taccGL Animations run on a small portion of the window only. Shadows are disabled."
			}
			if (q == 2) {
				me.title = "For performance reasons taccGL Animations are simplified and do not run full window but still on a big portion of the window. Shadows are disabled."
			}
			if (q == 3) {
				me.title = "taccGL Animations run full speed in full window "
						+ (this.shadowEna ? "with" : "without") + " shadows."
			}
		}
		if (s == 10) {
			var p = this.qualityCnt[1] + this.qualityCnt[2] * 2
					+ this.qualityCnt[3] * 3;
			q = Math.round(p / s);
			me = document.getElementById("taccgl_MeasureImage");
			if (me) {
				me.src = taccgl_MeasureImage + q + ".png"
			}
		}
	};
	this.applyObjStyle = function(el, st) {
		var n;
		for (n in st) {
			el.style[n] = st[n]
		}
	};
	this.drawTerminated = function() {
		if (taccgl.endMode == "background") {
			this.foregroundCnt = 0;
			this.adjustForeground()
		} else {
			if (taccgl.endMode == "foreground") {
				this.incForeground()
			} else {
				this.applyObjStyle(this.cv, this.endStyle);
				if (taccgl.controller && taccgl.controller.invisibleCanvas) {
					taccgl.controller.invisibleCanvas()
				}
			}
		}
		this.foregroundCnt = 0;
		this.g.deleteBuffer(this.draw_vertexPosBufferObjekt);
		this.g.deleteBuffer(this.draw_originBufferObjekt);
		this.g.deleteBuffer(this.draw_vertexTexPosBufferObjekt);
		this.g.deleteBuffer(this.draw_rotPBufferObjekt);
		this.g.deleteBuffer(this.draw_rotABufferObjekt);
		this.g.deleteBuffer(this.draw_colorBufferObjekt);
		this.g.deleteBuffer(this.draw_texmixBufferObjekt);
		this.g.deleteBuffer(this.draw_normalBufferObjekt);
		this.g.deleteBuffer(this.draw_accelerationBufferObjekt);
		this.g.deleteTexture(this.draw_texturecanvas);
		this.draw_texturecanvas = null;
		this.g.deleteTexture(this.draw_texturecanvas2);
		this.draw_texturecanvas2 = null;
		this.draw_running = false;
		this.busy = false;
		var vel = document.getElementById("taccglVertexNumber");
		if (vel) {
			vel.innerHTML = this.draw_vertexnumber + "/" + this.draw_frames
					+ "/" + this.draw_meaFrames
					/ (this.perfnow() - this.draw_meaTime) * 1000
		}
		for (i = 0; i < this.showAfterAnimation.length; i++) {
			var pv = this.showAfterAnimation[i].el.taccgl.postVisibility;
			var ov = this.showAfterAnimation[i].el.taccgl.postOpacity;
			if (pv || pv == "") {
				this.showAfterAnimation[i].el.style.visibility = pv
			}
			if (ov || ov == "") {
				this.showAfterAnimation[i].el.style.opacity = ov
			}
		}
		this.measureQuality();
		var uTime = (this.perfnow() - taccgl.draw_meaTime)
				/ taccgl.draw_duration, frate = taccgl.draw_meaFrames / uTime;
		if (frate > 50 && taccgl.quality < 3) {
			taccgl.quality++
		}
		this.showHideComments();
		this.StartRender()
	};
	this.drawImmediateTerm = function() {
		if (this.reqAnimFrameId) {
			window.taccgl_cancelAnimationFrame(this.reqAnimFrameId)
		}
		clearInterval(this.interval);
		this.cv.style.display = "none";
		if (taccgl.controller && taccgl.controller.invisibleCanvas) {
			taccgl.controller.invisibleCanvas()
		}
		this.foregroundCnt = 0;
		this.draw_running = false;
		this.busy = false;
		this.dddmode = false;
		this.compatmode = true;
		this.quality = 0;
		this.ddFallBack();
		this.nullDraw();
		this.showHideComments();
		this.measureQuality()
	};
	this.doHook = function(h, a, b, c, d, e, f, g) {
		if (typeof (h) == "function") {
			return h(a, b, c, d, e, f, g)
		} else {
			if (typeof (h) == "string") {
				return eval(h)
			} else {
				if (h && typeof (h) == "object") {
					if (h.length || h.length == 0) {
						var i;
						for (i = 0; i < h.length; i++) {
							this.doHook(h[i], a, b, c, d, e, f, g)
						}
					} else {
						h.todo(a, b, c, d, e, f, g)
					}
				}
			}
		}
	};
	this.doat = new Array(0);
	this.newDoat = function(a) {
		var i = this.doat.length - 1;
		while (i >= 0 && this.doat[i].attime > a.attime) {
			this.doat[i + 1] = this.doat[i];
			i--
		}
		this.doat[i + 1] = a
	};
	this.adjustDoat = function(i, t) {
		this.doat[i].attime = t;
		while (this.doat[i + 1].attime < t) {
			var x = this.doat[i + 1];
			this.doat[i + 1] = this.doat[i];
			this.doat[i] = x;
			i++
		}
	};
	this.findInDoat = function(a) {
		var f = 0, t = this.doat.length - 1;
		var v = a.attime;
		if (!v && v != 0) {
			return null
		}
		if (t < 0) {
			return null
		}
		while (true) {
			var m = Math.floor((f + t) / 2);
			if (this.doat[m].attime < v) {
				f = m
			} else {
				if (this.doat[m].attime > v) {
					t = m
				} else {
					var i = m;
					while (this.doat[i] != a && this.doat[i - 1].attime == v) {
						i--
					}
					if (this.doat[i] == a) {
						return i
					}
					i = m + 1;
					while (this.doat[i] != a && this.doat[i + 1].attime == v) {
						i++
					}
					if (this.doat[i] == a) {
						return i
					}
					return null
				}
			}
		}
	};
	this.deleteFromDoat = function(a) {
		var i = this.findInDoat(a);
		if (i != null) {
			if (this.doatI > i) {
				this.doatI--
			}
			this.doat.splice(i, 1)
		}
	};
	this.checkDoat = function() {
		var i;
		if (this.draw_running) {
			if (!this.doat[this.doat.length - 1].isPlug) {
				alert("missing plug")
			}
		}
		for (i = 0; i < this.doat.length - 1; i++) {
			if (this.doat[i].isPlug) {
				alert("plug not at end")
			}
			if (!this.doat[i].attime && this.doat[i].attime != 0) {
				alert("doat null")
			}
			if (!(this.doat[i].attime <= this.doat[i + 1].attime)) {
				alert("doat sort error ")
			}
		}
	};
	this.setDuration = function(d) {
		this.duration = d
	};
	this.setShader = function(p) {
		if (this.shprogfrom[this.shprogfrom.length - 1] == this.vertI) {
			this.shprog[this.shprogfrom.length - 1] = p
		} else {
			if (this.shprog[this.shprogfrom.length - 1] != p) {
				this.shprog.push(p);
				this.shprogfrom.push(this.vertI)
			}
		}
	};
	this.startDD = function() {
		if (!this.vBgControl) {
			this.incForeground()
		}
		this.draw_duration = 1000;
		this.doatI = 0;
		this.adjustQuality();
		if (!this.vBgControl) {
			this.incForeground()
		} else {
			this.adjustForeground()
		}
		var plug = new taccglAnimPlug();
		plug.attime = this.duration;
		this.newDoat(plug);
		this.draw_running = true;
		this.busy = true;
		this.cv.style.transition = "";
		this.cv.style.display = this.epack != false ? "" : "none";
		this.cv.style.opacity = 1;
		this.cv.style.visibility = "visible";
		this.draw_frames = this.draw_meaFrames = 0;
		this.slowStartupTime = 0;
		this.slowStartupFrames = 0;
		this.draw_startTime = this.draw_meaTime = this.perfnow();
		this.draw_meaAdjust = 0;
		this.draw_meaIgnore = 0;
		this.loadTest = false;
		this.loadTestl = 0;
		this.AAstartedLength = this.AA.length;
		if (!window.taccgl_requestAnimationFrame) {
			this.interval = setInterval(taccgl_draw2d, 16)
		}
		taccgl_draw2d()
	};
	this.drawTerminatedDD = function() {
		clearInterval(this.interval);
		this.cv.style.display = "none";
		if (taccgl.controller && taccgl.controller.invisibleCanvas) {
			taccgl.controller.invisibleCanvas()
		}
		this.foregroundCnt = 0;
		this.draw_running = false;
		this.busy = false;
		for (i = 0; i < this.showAfterAnimation.length; i++) {
			var pv = this.showAfterAnimation[i].el.taccgl.postVisibility;
			var ov = this.showAfterAnimation[i].el.taccgl.postOpacity;
			if (pv || pv == "") {
				this.showAfterAnimation[i].el.style.visibility = pv
			}
			if (ov || ov == "" || ov == 0) {
				this.showAfterAnimation[i].el.style.opacity = ov
			}
		}
		var vel = document.getElementById("taccglVertexNumber");
		if (vel) {
			vel.innerHTML = this.draw_meaFrames
					+ " "
					+ this.draw_meaFrames
					/ (this.perfnow() - this.draw_meaTime - this.draw_meaAdjust)
					* 1000
		}
		this.measureQuality();
		var uTime = (this.perfnow() - taccgl.draw_meaTime - this.draw_meaAdjust)
				/ taccgl.draw_duration, frate = taccgl.draw_meaFrames / uTime;
		if (frate > 50 && taccgl.quality < 3) {
			taccgl.quality++
		}
		this.showHideComments();
		this.StartRender()
	};
	this.drawImmediateTermDD = function() {
		clearInterval(this.interval);
		this.cv.style.display = "none";
		if (taccgl.controller && taccgl.controller.invisibleCanvas) {
			taccgl.controller.invisibleCanvas()
		}
		this.foregroundCnt = 0;
		this.draw_running = false;
		this.busy = false;
		this.ddmode = false;
		this.compatmode = true;
		this.quality = 0;
		this.nullDraw();
		this.showHideComments();
		this.measureQuality()
	};
	this.doAllDoats = function() {
		var i;
		for (i = 0; i < this.doat.length; i++) {
			var t = this.doat[i];
			if (t.elshowatend) {
				var pv = t.postVisibility;
				var ov = t.postOpacity;
				if (pv || pv == "") {
					t.elshowatend.style.visibility = pv
				}
				if (ov || ov == "" || ov == 0) {
					t.elshowatend.style.opacity = ov
				}
			}
		}
	};
	this.nullDraw = function() {
		var i;
		this.foregroundCnt = 0;
		this.draw_running = false;
		this.busy = false;
		this.doAllDoats();
		for (i = 0; i < this.showAfterAnimation.length; i++) {
			var pv = this.showAfterAnimation[i].el.taccgl.postVisibility;
			var ov = this.showAfterAnimation[i].el.taccgl.postOpacity;
			if (pv || pv == "") {
				this.showAfterAnimation[i].el.style.visibility = pv
			}
			if (ov || ov == "") {
				this.showAfterAnimation[i].el.style.opacity = ov
			}
		}
		this.StartRender();
		this.doHook(this.onTerm);
		if (this.cv) {
			this.cv.style.display = "none"
		}
	};
	this.cancelDraw = function() {
		if (this.reqAnimFrameId) {
			window.taccgl_cancelAnimationFrame(this.reqAnimFrameId)
		}
		clearInterval(this.interval)
	};
	this.continueDraw = function() {
		if (window.taccgl_requestAnimationFrame) {
			this.reqAnimFrameId = taccgl_requestAnimationFrame(this.dddmode ? taccgl_draw3d
					: taccgl_draw2d)
		} else {
			this.interval = setInterval(this.dddmode ? taccgl_draw3d
					: taccgl_draw2d, 16)
		}
	};
	this.stop = function() {
		this.cancelDraw();
		if (!taccgl.draw_running) {
			return
		}
		this.doAllDoats();
		if (this.dddmode) {
			this.drawTerminated()
		} else {
			if (this.ddmode) {
				this.drawTerminatedDD()
			}
		}
		this.doHook(this.onStop)
	};
	this.start = function(s) {
		if (s != "no epilepsy warning" || taccgl.epack == false
				|| this.showWarning) {
			if (this.ddmode || this.dddmode) {
				var w = this.epcheck();
				if (w == "wait") {
					return
				}
				if (!w) {
					if (this.draw_running) {
						this.stop()
					} else {
						this.nullDraw()
					}
					this.cv.style.display = "none";
					return
				}
			}
		}
		this.showHideComments();
		if (this.ddmode && this.epack != false) {
			if (!taccgl.draw_running) {
				this.startDD()
			} else {
				taccgl.updateDrawDD()
			}
		} else {
			if (this.dddmode && this.epack != false) {
				taccgl.setupTextures();
				if (this.webglerror && !this.dddmode) {
					this.drawImmediateTerm()
				} else {
					if (!taccgl.draw_running) {
						taccgl.startDraw(taccgl.g, taccgl.p)
					} else {
						taccgl.updateDraw()
					}
				}
			} else {
				this.nullDraw()
			}
		}
	};
	this.restart = function() {
		if (!taccgl.draw_running) {
			this.start()
		} else {
			this.draw_startTime = this.perfnow()
		}
	};
	this.ShowTexCanvas = function(i, bg) {
		var c;
		if (i == 1) {
			c = document.getElementById("taccgl_textureCanvas")
		} else {
			if (i == 2) {
				c = document.getElementById("taccgl_textureCanvas2")
			}
		}
		c.style.display = "";
		c.style.backgroundColor = bg
	};
	this.Bg3DCanvas = function(bg) {
		var c = document.getElementById("taccgl_canvas3d");
		c.style.backgroundColor = bg
	};
	this.Display3DCanvas = function(d) {
		var c = document.getElementById("taccgl_canvas3d");
		c.style.display = d
	};
	this.ZIndex3DCanvas = function(d) {
		var c = document.getElementById("taccgl_canvas3d");
		c.style.zIndex = d
	};
	this.HideTexCanvas = function() {
		document.getElementById("taccgl_textureCanvas").style.display = "none";
		document.getElementById("taccgl_textureCanvas2").style.display = "none"
	};
	this.texTo = function(i) {
		this.texcanvasi = i;
		if (i == 1) {
			this.texcanvas = document.getElementById("taccgl_textureCanvas")
		} else {
			if (i == 2) {
				this.texcanvas = document
						.getElementById("taccgl_textureCanvas2")
			}
		}
		if (this.texcanvas && this.texcanvas.getContext) {
			this.texc = this.texcanvas.getContext("2d")
		}
	};
	this.texTransform = function(a, b, c, d, e, f) {
		var p = this.pr;
		this.texc.setTransform(p * a, p * b, p * c, p * d, p * e, p * f)
	};
	this.markCanvasChanged = function() {
		if (this.texcanvasi == 1) {
			this.textureCanvasChanged = true
		} else {
			if (this.texcanvasi == 2) {
				this.textureCanvasChanged2 = true
			}
		}
	};
	this.texClear = function(i) {
		var el;
		if (!this.initialized) {
			this.begin()
		}
		if (i == 1) {
			el = document.getElementById("taccgl_textureCanvas");
			this.textureCanvasChanged = true
		}
		if (i == 2) {
			el = document.getElementById("taccgl_textureCanvas2");
			this.textureCanvasChanged2 = true
		}
		if (el) {
			el.width = el.width
		}
		if (this.texcanvasi == i) {
			if (this.texc) {
				taccgl.texTransform(1, 0, 0, 1, 0, 0)
			}
		} else {
			var x = this.texcanvas;
			this.texTo(i);
			if (this.texc) {
				taccgl.texTransform(1, 0, 0, 1, 0, 0)
			}
			this.texTo(x)
		}
	};
	this.texClearAll = function() {
		if (!this.initialized) {
			this.begin()
		}
		this.texClear(1);
		this.texClear(2);
		this.texTo(1)
	};
	this.a = function(el, k) {
		if (!this.initialized) {
			this.begin()
		}
		if (!k) {
			k = this.taccglAnim
		}
		if (typeof (k) == "object") {
			k.actorInit(el);
			return k
		} else {
			return new k(el)
		}
	};
	this.actorHide = function(el, k) {
		if (!this.initialized) {
			this.begin()
		}
		if (!k) {
			k = this.taccglAnim
		}
		var a;
		if (typeof (k) == "object") {
			k.actorInit(el);
			a = k
		} else {
			a = new k(el)
		}
		a.hide();
		a.textureDraw();
		return a
	};
	this.actor = function(el, k, v, t) {
		if (!this.initialized) {
			this.begin()
		}
		if (!k) {
			k = this.taccglAnim
		}
		if (!t) {
			t = 1
		}
		var a;
		if (typeof (k) == "object") {
			k.actorInit(el);
			a = k
		} else {
			a = new k(el)
		}
		a.hideAtBegin();
		taccgl.texTo(t);
		a.textureDraw();
		if (v) {
			a.visatend(v)
		} else {
			taccgl.taccglAttach(a.el);
			if (!a.el.taccgl.preVisibility && a.el.taccgl.preVisibility != "") {
				a.el.taccgl.preVisibility = a.el.style.visibility
			}
			a.visatend(a.el.taccgl.preVisibility)
		}
		if (t == 2) {
			a.blend(0, 1)
		}
		return a
	};
	this.shadow = function(el, k) {
		if (typeof (el) == "string") {
			var xel = document.getElementById(el);
			if (!xel) {
				alert("No Element with id " + el);
				return
			}
			el = xel
		}
		if (!this.initialized) {
			this.begin()
		}
		if (!k) {
			k = this.taccglAnim
		}
		this.taccglAttach(el);
		if (el.taccgl.asShadow) {
			return el.taccgl.asShadow
		} else {
			var r;
			if (typeof (k) == "object") {
				k.actorInit(el);
				r = k
			} else {
				r = new k(el)
			}
			el.taccgl.asShadow = r;
			return r
		}
	};
	this.getShadow = function(el) {
		if (typeof (el) == "string") {
			var xel = document.getElementById(el);
			if (!xel) {
				alert("No Element with id " + el);
				return
			}
			el = xel
		}
		if (!el) {
			return null
		}
		if (!el.taccgl) {
			return null
		}
		var as;
		if (!(as = el.taccgl.asShadow)) {
			return null
		}
		return as
	};
	this.taccglAnim = function(el) {
		this.init(el)
	};
	var tap = new taccglAnimPrototype();
	tap.taccglAnimClone.prototype = tap;
	this.taccglAnim.prototype = tap;
	this.flexiBorder = function(el) {
		this.init(el)
	};
	this.multiFace = function(el) {
		this.init(el)
	};
	this.dddBox = function(el) {
		this.init(el)
	};
	this.mEmpty = function() {
		return new taccglMultiEmpty()
	};
	this.mSingle = function(a) {
		return new taccglMultiElement(a)
	};
	this.ma = function(el, k) {
		return new taccglMultiElement(this.a(el, k))
	};
	this.mClass = function(cl, k) {
		return new taccglMultiSet(document.getElementsByClassName(cl), k)
	};
	this.mName = function(cl, k) {
		return new taccglMultiSet(document.getElementsByName(cl), k)
	};
	this.mTagName = function(cl, k) {
		return new taccglMultiSet(document.getElementsByTagName(cl), k)
	};
	this.paintTextNode = function(el) {
		var r = document.createRange(), tcel = el.textContent;
		r.selectNode(el);
		var i = tcel.search(/\S+/);
		if (i > 0) {
			r.setStart(el, i)
		}
		var rects = r.getClientRects(), t = this.texc;
		if (rects.length >= 1) {
			var cs = null, font;
			if (!cs) {
				if (el.parentElement) {
					cs = getComputedStyle(el.parentElement)
				} else {
					cs = getComputedStyle(el.parentNode)
				}
			}
			if (cs.fontStyle) {
				font = cs.fontStyle + " " + cs.fontVariant + " "
						+ cs.fontWeight + " " + cs.fontSize + " "
						+ cs.fontFamily
			} else {
				font = cs["font-style"] + " " + cs["font-variant"] + " "
						+ cs["font-weight"] + " " + cs["font-size"] + " "
						+ cs["font-family"]
			}
			t.lineWidth = 1;
			font = font.replace(/Calibri/, "calibri");
			t.font = font;
			t.fillStyle = cs.color;
			var lh = parseInt(cs["line-height"]);
			if (typeof (lh) != "number" || isNaN(lh)) {
				lh = parseInt(cs.lineHeight)
			}
			if (typeof (lh) != "number" || isNaN(lh)) {
				lh = 1.2 * parseInt(cs["font-size"])
			}
			if (typeof (lh) != "number" || isNaN(lh)) {
				lh = 19
			}
			t.textBaseline = "bottom"
		}
		if (rects.length == 1) {
			var x = rects[0].left, y = rects[0].bottom;
			x += document.body.scrollLeft
					|| document.documentElement.scrollLeft;
			y += document.body.scrollTop || document.documentElement.scrollTop;
			var tc = el.textContent;
			tc = r.toString();
			tc = tc.replace(/\s+/g, " ");
			t.fillText(tc, x, y)
		} else {
			if (rects.length > 1) {
				var regex = /\S+/g, res, j = 0;
				while ((res = regex.exec(tcel)) && j < 1000) {
					r.setStart(el, res.index);
					r.setEnd(el, res.index + res[0].length);
					rects = r.getClientRects();
					tc = r.toString(), x = rects[0].left;
					y = rects[0].bottom;
					x += document.body.scrollLeft
							|| document.documentElement.scrollLeft;
					y += document.body.scrollTop
							|| document.documentElement.scrollTop;
					t.fillText(tc, x, y);
					j++
				}
			}
		}
	};
	this.paintBackground = function(el) {
		var t = this.texc, cs = getComputedStyle(el), c = cs.backgroundColor;
		if (c == "none" || c == "rgba(0, 0, 0, 0)" || c == "transparent") {
			return
		}
		t.fillStyle = c;
		var par = el, x = el.offsetLeft, y = el.offsetTop;
		while (par.offsetParent) {
			par = par.offsetParent;
			x += par.offsetLeft;
			y += par.offsetTop
		}
		var btlr = this.getPxProp(cs.borderTopLeftRadius, 0), btrr = this
				.getPxProp(cs.borderTopRightRadius, 0), bblr = this.getPxProp(
				cs.borderBottomLeftRadius, 0), bbrr = this.getPxProp(
				cs.borderBottomRightRadius, 0), ww = 0.5;
		var wi = el.offsetWidth, he = el.offsetHeight;
		if (el.tagName == "TD") {
			var cr = el.getClientRects();
			wi = cr[0].width;
			he = cr[0].height;
			x = cr[0].left;
			y = cr[0].top;
			x += document.body.scrollLeft
					|| document.documentElement.scrollLeft;
			y += document.body.scrollTop || document.documentElement.scrollTop
		}
		if (btlr == 0 && btrr == 0 && bblr == 0 && bbrr == 0) {
			t.fillRect(x, y, wi, he)
		} else {
			t.beginPath();
			var d = (1 - Math.sqrt(0.5)) * btlr;
			if (btlr > 0) {
				t.moveTo(x + d + ww, y + d + ww);
				t.arcTo(x + d + d + ww, y + ww, x + btlr + ww, y + ww, btlr)
			} else {
				t.moveTo(x + ww, y + ww)
			}
			t.lineTo(x + wi - btrr - ww, y + ww);
			d = (1 - Math.sqrt(0.5)) * btrr;
			if (btrr > 0) {
				t.arcTo(x + wi - d - d - ww, y + ww, x + wi - d - ww, y + ww
						+ d, btrr)
			} else {
				t.lineTo(x + wi, y + ww)
			}
			d = (1 - Math.sqrt(0.5)) * btrr;
			if (btrr > 0) {
				t.arcTo(x + wi - ww, y + d + d + ww, x + wi - ww,
						y + btrr + ww, btrr)
			}
			t.lineTo(x + wi - ww, y + he - bbrr - ww);
			d = (1 - Math.sqrt(0.5)) * bbrr;
			if (bbrr > 0) {
				t.arcTo(x + wi - ww, y + he - d - d - ww, x + wi - d - ww, y
						+ he - ww - d, bbrr)
			}
			d = (1 - Math.sqrt(0.5)) * bbrr;
			if (bbrr > 0) {
				t.arcTo(x + wi - d - d - ww, y + he - ww, x + wi - bbrr - ww, y
						+ he - ww, bbrr)
			}
			t.lineTo(x + bblr + ww, y + he - ww);
			d = (1 - Math.sqrt(0.5)) * bblr;
			if (bblr > 0) {
				t.arcTo(x + d + d + ww, y + he - ww, x + d + ww, y + he - d
						- ww, bblr)
			}
			d = (1 - Math.sqrt(0.5)) * bblr;
			if (bblr > 0) {
				t.arcTo(x + ww, y + he - d - d - ww, x + ww, y + he - bblr,
						bblr)
			}
			t.lineTo(x + ww, y + btlr + ww);
			d = (1 - Math.sqrt(0.5)) * btlr;
			if (btlr > 0) {
				t.arcTo(x + ww, y + d + d + ww, x + ww + d, y + d + ww, btlr)
			}
			t.fill()
		}
	};
	this.getPxProp = function(s, d) {
		var r = parseInt(s);
		if (typeof (r) != "number") {
			return d
		}
		if (r < 0) {
			return d
		}
		return r
	};
	this.paintBorder = function(el) {
		var t = this.texc, cs = getComputedStyle(el), c = cs.borderTopColor, cr;
		if (c != "none" || c != "rgba(0, 0, 0, 0)" || c != "transparent") {
			var btlr = this.getPxProp(cs.borderTopLeftRadius, 0), btrr = this
					.getPxProp(cs.borderTopRightRadius, 0);
			var w = this.getPxProp(cs.borderTopWidth, 0);
			var ww = w * 0.5;
			if (w > 0) {
				var wi = el.offsetWidth, he = el.offsetHeight, x, y;
				if (el.tagName == "TD") {
					cr = el.getClientRects();
					wi = cr[0].width;
					he = cr[0].height;
					x = cr[0].left;
					y = cr[0].top;
					x += document.body.scrollLeft
							|| document.documentElement.scrollLeft;
					y += document.body.scrollTop
							|| document.documentElement.scrollTop
				} else {
					var par = el;
					x = el.offsetLeft, y = el.offsetTop;
					while (par.offsetParent) {
						par = par.offsetParent;
						x += par.offsetLeft;
						y += par.offsetTop
					}
				}
				t.beginPath();
				t.strokeStyle = c;
				t.lineWidth = w;
				var d = (1 - Math.sqrt(0.5)) * btlr;
				if (btlr > 0) {
					t.moveTo(x + d + ww, y + d + ww);
					t
							.arcTo(x + d + d + ww, y + ww, x + btlr + ww, y
									+ ww, btlr)
				} else {
					t.moveTo(x, y + ww)
				}
				t.lineTo(x + wi - btrr - ww, y + ww);
				d = (1 - Math.sqrt(0.5)) * btrr;
				if (btrr > 0) {
					t.arcTo(x + wi - d - d - ww, y + ww, x + wi - d - ww, y
							+ ww + d, btrr)
				} else {
					t.lineTo(x + wi, y + ww)
				}
				t.stroke()
			}
		}
		c = cs.borderRightColor;
		if (c != "none" || c != "rgba(0, 0, 0, 0)" || c != "transparent") {
			btrr = this.getPxProp(cs.borderTopRightRadius, 0);
			var bbrr = this.getPxProp(cs.borderBottomRightRadius, 0);
			w = this.getPxProp(cs.borderRightWidth, 0);
			ww = w * 0.5;
			if (w > 0) {
				if (el.tagName == "TD") {
					cr = el.getClientRects();
					wi = cr[0].width;
					he = cr[0].height;
					x = cr[0].left;
					y = cr[0].top;
					x += document.body.scrollLeft
							|| document.documentElement.scrollLeft;
					y += document.body.scrollTop
							|| document.documentElement.scrollTop
				} else {
					par = el;
					x = el.offsetLeft, y = el.offsetTop, he = el.offsetHeight,
							wi = el.offsetWidth;
					while (par.offsetParent) {
						par = par.offsetParent;
						x += par.offsetLeft;
						y += par.offsetTop
					}
				}
				x += wi;
				t.beginPath();
				t.strokeStyle = c;
				t.lineWidth = w;
				d = (1 - Math.sqrt(0.5)) * btrr;
				if (btrr > 0) {
					t.moveTo(x - d - ww, y + d + ww);
					t
							.arcTo(x - ww, y + d + d + ww, x - ww, y + btrr
									+ ww, btrr)
				} else {
					t.moveTo(x - ww, y)
				}
				t.lineTo(x - ww, y + he - bbrr - ww);
				d = (1 - Math.sqrt(0.5)) * bbrr;
				if (bbrr > 0) {
					t.arcTo(x - ww, y + he - d - d - ww, x - d - ww, y + he
							- ww - d, bbrr)
				} else {
					t.lineTo(x - ww, y + he)
				}
				t.stroke()
			}
		}
		c = cs.borderBottomColor;
		if (c != "none" || c != "rgba(0, 0, 0, 0)" || c != "transparent") {
			var bblr = this.getPxProp(cs.borderBottomLeftRadius, 0);
			bbrr = this.getPxProp(cs.borderBottomRightRadius, 0), w = this
					.getPxProp(cs.borderBottomWidth, 0), ww = w * 0.5;
			if (w > 0) {
				if (el.tagName == "TD") {
					cr = el.getClientRects();
					wi = cr[0].width;
					he = cr[0].height;
					x = cr[0].left;
					y = cr[0].top;
					x += document.body.scrollLeft
							|| document.documentElement.scrollLeft;
					y += document.body.scrollTop
							|| document.documentElement.scrollTop
				} else {
					par = el, x = el.offsetLeft, y = el.offsetTop;
					he = el.offsetHeight;
					wi = el.offsetWidth;
					while (par.offsetParent) {
						par = par.offsetParent;
						x += par.offsetLeft;
						y += par.offsetTop
					}
				}
				t.beginPath();
				t.strokeStyle = c;
				t.lineWidth = w;
				y += he;
				d = (1 - Math.sqrt(0.5)) * bblr;
				if (bblr > 0) {
					t.moveTo(x + d + ww, y - d - ww);
					t
							.arcTo(x + d + d + ww, y - ww, x + bblr + ww, y
									- ww, bblr)
				} else {
					t.moveTo(x, y - ww)
				}
				t.lineTo(x + wi - bbrr - ww, y - ww);
				d = (1 - Math.sqrt(0.5)) * bbrr;
				if (bbrr > 0) {
					t.arcTo(x + wi - d - d - ww, y - ww, x + wi - d - ww, y
							- ww - d, bbrr)
				} else {
					t.lineTo(x + wi, y - ww)
				}
				t.stroke()
			}
		}
		c = cs.borderLeftColor;
		if (c != "none" || c != "rgba(0, 0, 0, 0)" || c != "transparent") {
			btlr = this.getPxProp(cs.borderTopLeftRadius, 0);
			bblr = this.getPxProp(cs.borderBottomLeftRadius, 0);
			w = this.getPxProp(cs.borderLeftWidth, 0), ww = w * 0.5;
			if (w > 0) {
				if (el.tagName == "TD") {
					cr = el.getClientRects();
					wi = cr[0].width;
					he = cr[0].height;
					x = cr[0].left;
					y = cr[0].top;
					x += document.body.scrollLeft
							|| document.documentElement.scrollLeft;
					y += document.body.scrollTop
							|| document.documentElement.scrollTop
				} else {
					par = el, x = el.offsetLeft, y = el.offsetTop,
							he = el.offsetHeight, wi = el.offsetWidth;
					while (par.offsetParent) {
						par = par.offsetParent;
						x += par.offsetLeft;
						y += par.offsetTop
					}
				}
				t.beginPath();
				t.strokeStyle = c;
				t.lineWidth = w;
				d = (1 - Math.sqrt(0.5)) * btlr;
				if (btlr > 0) {
					t.moveTo(x + d + ww, y + d + ww);
					t
							.arcTo(x + ww, y + d + d + ww, x + ww, y + btlr
									+ ww, btlr)
				} else {
					t.moveTo(x + ww, y)
				}
				t.lineTo(x + ww, y + he - bblr - ww);
				d = (1 - Math.sqrt(0.5)) * bblr;
				if (bblr > 0) {
					t.arcTo(x + ww, y + he - d - d - ww, x + d + ww, y + he
							- ww - d, bblr)
				} else {
					t.lineTo(x + ww, y + he)
				}
				t.stroke()
			}
		}
	};
	this.paintImg = function(el) {
		var cs = getComputedStyle(el), pl = this.getPxProp(cs.paddingLeft, 0), pt = this
				.getPxProp(cs.paddingTop, 0), pr = this.getPxProp(
				cs.paddingRight, 0), pb = this.getPxProp(cs.paddingBottom, 0), par = el, x0 = el.clientLeft
				+ el.offsetLeft, y0 = el.clientTop + el.offsetTop;
		while (par.offsetParent) {
			par = par.offsetParent;
			x0 += par.offsetLeft;
			y0 += par.offsetTop
		}
		taccgl.texc.drawImage(el, x0 + pl, y0 + pt, el.clientWidth - pl - pr,
				el.clientHeight - pt - pb)
	};
	this.paintElement = function(el, ignoreHidden) {
		var needsRestore = false;
		if (!(this.ddmode || this.dddmode)) {
			return
		}
		this.markCanvasChanged();
		if (typeof (el) == "string") {
			el = document.getElementById(el)
		}
		if (el.nodeType == 3) {
			this.paintTextNode(el)
		} else {
			if (el.nodeType == 1) {
				var cs = getComputedStyle(el);
				if (el.style.visibility == "hidden" && !ignoreHidden) {
					return
				}
				if (cs.display == "none") {
					return
				}
				if (el.style.visibility != "visible" && !ignoreHidden) {
					if (!this.hiddenClasses) {
						this.calcHiddenClasses()
					}
					var cns = el.className.split(" "), i;
					for (i = 0; i < cns.length; i++) {
						var c = cns[i];
						if (this.hiddenClasses["." + c] == "hidden") {
							return
						}
						if (this.hiddenClasses[(el.tagName.toUpperCase() + "." + c)] == "hidden") {
							return
						}
						if (this.hiddenClasses["#" + el.id] == "hidden") {
							return
						}
					}
				}
				var t;
				if (((t = cs.webkitTransform) || (t = cs.mozTransform)
						|| (t = cs.msTransform) || (t = cs.transform))
						&& (t != "none")) {
					needsRestore = true;
					this.texc.save();
					var m;
					var savekind, to;
					if (t = cs.transform) {
						m = taccgl.m32parse(t);
						to = cs.transformOrigin;
						savekind = "trans";
						el.style.transform = "none"
					} else {
						if (t = cs.webkitTransform) {
							m = taccgl.m32parse(t);
							to = cs.webkitTransformOrigin;
							savekind = "webkit";
							el.style.webkitTransform = "none"
						} else {
							if (t = cs.mozTransform) {
								m = taccgl.m32parse(t);
								to = cs.mozTransformOrigin;
								savekind = "moz";
								el.style.mozTransform = "none"
							} else {
								if (t = cs.mstTransform) {
									m = taccgl.m32parse(t);
									to = cs.msTransformOrigin;
									savekind = "ms";
									el.style.msTransform = "none"
								}
							}
						}
					}
					var savetrans = "matrix(" + m[0].toFixed(20) + ","
							+ m[3].toFixed(20) + "," + m[1].toFixed(20) + ","
							+ m[4].toFixed(20) + "," + m[2].toFixed(20) + ","
							+ m[5].toFixed(20) + ")";
					var toa = to.split(" ");
					var tox = parseFloat(toa[0]), toy = parseFloat(toa[1]);
					var cr = el.getClientRects();
					var x = cr[0].left, y = cr[0].top;
					x += document.body.scrollLeft
							|| document.documentElement.scrollLeft;
					y += document.body.scrollTop
							|| document.documentElement.scrollTop;
					this.texc.translate(x + tox, y + toy);
					this.texc.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
					this.texc.translate(-x - tox, -y - toy)
				}
				this.paintBackground(el);
				this.paintBorder(el);
				var n = el.tagName;
				if (n == "IMG") {
					this.paintImg(el)
				}
			}
		}
		c = el.firstChild;
		while (c) {
			this.paintElement(c, false);
			c = c.nextSibling
		}
		if (needsRestore) {
			this.texc.restore();
			if (savekind == "trans") {
				el.style.transform = savetrans
			} else {
				if (savekind == "webkit") {
					el.style.webkitTransform = savetrans
				} else {
					if (savekind == "moz") {
						el.style.mozTransform = savetrans
					} else {
						if (savekind == "ms") {
							el.style.msTransform = savetrans
						}
					}
				}
			}
		}
	};
	this.hiddenClassesConstr = function() {
	};
	this.calcHiddenClasses = function() {
		this.hiddenClasses = new this.hiddenClassesConstr();
		var ss = window.document.styleSheets, i, s;
		for (i = 0; i < ss.length; i++) {
			s = ss[i];
			if (!s.disabled && s.type == "text/css") {
				var j, r;
				for (j = 0; j < s.cssRules.length; j++) {
					r = s.cssRules[j];
					if (r.selectorText
							&& r.selectorText
									.match(/([^.:]*\.[^.:]+)|(#[^.:]+)/)) {
						this.hiddenClasses[r.selectorText] = r.style.visibility
					}
				}
			}
		}
	};
	this.taccglAttachment = function() {
		this.delno = taccgl.delno
	};
	this.taccglAttach = function(el) {
		if (el.taccgl && el.taccgl.delno == this.delno) {
			return
		}
		if (!el.taccgl) {
			var t;
			t = new this.taccglAttachment();
			el.taccgl = t
		}
		el.taccgl.delno = taccgl.delno;
		el.taccgl.preVisibility = el.taccgl.postVisibility = el.taccgl.preOpacity = el.taccgl.postOpacity = null;
		el.taccgl.asShadow = null
	};
	this.m32IConst = [ 1, 0, 0, 0, 1, 0 ];
	this.m32I = function() {
		return this.m32IConst.slice(0)
	};
	this.m32add = function(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
		a[4] += b[4];
		a[5] += b[5];
		return a
	};
	this.m32mulx = function(m, v) {
		var a = m;
		return a[0] * v[0] + a[1] * v[1] + a[2]
	};
	this.m32muly = function(m, v) {
		var a = m;
		return a[3] * v[0] + a[4] * v[1] + a[5]
	};
	this.m32parse = function(t) {
		var regex = /matrix\(([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*)\)/;
		var a = regex.exec(t);
		if (a && a.length == 7) {
			return ([ parseFloat(a[1]), parseFloat(a[3]), parseFloat(a[5]),
					parseFloat(a[2]), parseFloat(a[4]), parseFloat(a[6]) ])
		}
		return null
	};
	this.m33IConst = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
	this.m33I = function() {
		return this.m33IConst.slice(0)
	};
	this.m33Add = function(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
		a[4] += b[4];
		a[5] += b[5];
		a[6] += b[6];
		a[7] += b[7];
		a[8] += b[8];
		return a
	};
	this.m33Mul = function(a, b) {
		var x = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
		var y = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
		var z = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];
		a[0] = x;
		a[1] = y;
		a[2] = z;
		x = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
		y = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
		z = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];
		a[3] = x;
		a[4] = y;
		a[5] = z;
		x = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
		y = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
		z = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];
		a[6] = x;
		a[7] = y;
		a[8] = z;
		return a
	};
	this.m33T = function(a) {
		var x = a[3];
		a[3] = a[1];
		a[1] = x;
		x = a[2];
		a[2] = a[6];
		a[6] = x;
		x = a[5];
		a[5] = a[7];
		a[7] = x;
		return a
	};
	this.m33Inverse = function(a) {
		var d = a[0] * (a[4] * a[8] - a[5] * a[7]) - a[1]
				* (a[3] * a[8] - a[5] * a[6]) + a[2]
				* (a[3] * a[7] - a[4] * a[6]);
		var di = 1 / d;
		return [ (a[4] * a[8] - a[5] * a[7]) * di,
				(a[2] * a[7] - a[1] * a[8]) * di,
				(a[1] * a[5] - a[2] * a[4]) * di,
				(a[5] * a[6] - a[3] * a[8]) * di,
				(a[0] * a[8] - a[2] * a[6]) * di,
				(a[2] * a[3] - a[0] * a[5]) * di,
				(a[3] * a[7] - a[4] * a[6]) * di,
				(a[1] * a[6] - a[0] * a[7]) * di,
				(a[0] * a[4] - a[1] * a[3]) * di ]
	};
	this.m33Rotation = function(alpha, ax, ay, az) {
		var s = Math.sin(alpha), c = Math.cos(alpha), mc = 1 - c;
		return [ c + ax * ax * mc, ax * ay * mc - az * s,
				ax * az * mc + ay * s, ax * ay * mc + az * s, c + ay * ay * mc,
				ay * az * mc - ax * s, az * ax * mc - ay * s,
				az * ay * mc + ax * s, c + az * az * mc ]
	};
	this.m44IConst = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
	this.m44I = function() {
		return this.m44IConst.slice(0)
	};
	this.m44Add = function(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
		a[4] += b[4];
		a[5] += b[5];
		a[6] += b[6];
		a[7] += b[7];
		a[8] += b[8];
		a[9] += b[9];
		a[10] += b[10];
		a[11] += b[11];
		a[12] += b[12];
		a[13] += b[13];
		a[14] += b[14];
		a[15] += b[15];
		return a
	};
	this.m44Mul = function(a, b) {
		var x = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
		var y = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
		var z = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
		var w = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
		a[0] = x;
		a[1] = y;
		a[2] = z;
		a[3] = w;
		x = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
		y = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
		z = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
		w = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
		a[4] = x;
		a[5] = y;
		a[6] = z;
		a[7] = w;
		x = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
		y = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
		z = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
		w = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
		a[8] = x;
		a[9] = y;
		a[10] = z;
		a[11] = w;
		x = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
		y = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
		z = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
		w = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
		a[12] = x;
		a[13] = y;
		a[14] = z;
		a[15] = w;
		return a
	};
	this.m44MulV = function(a, v) {
		return [ a[0] * v[0] + a[1] * v[1] + a[2] * v[2] + a[3] * v[3],
				a[4] * v[0] + a[5] * v[1] + a[6] * v[2] + a[7] * v[3],
				a[8] * v[0] + a[9] * v[1] + a[10] * v[2] + a[11] * v[3],
				a[12] * v[0] + a[13] * v[1] + a[14] * v[2] + a[15] * v[3] ]
	};
	this.m33FromM44 = function(a) {
		return [ a[0], a[1], a[2], a[4], a[5], a[6], a[8], a[9], a[10] ]
	};
	this.m44FromM33 = function(a, x, y, z) {
		return [ a[0], a[1], a[2], x, a[3], a[4], a[5], y, a[6], a[7], a[8], z,
				0, 0, 0, 1 ]
	};
	this.m44Translation = function(x, y, z) {
		return [ 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1 ]
	};
	this.m44T = function(a) {
		var x = a[1];
		a[1] = a[4];
		a[4] = x;
		x = a[2];
		a[2] = a[8];
		a[8] = x;
		x = a[3];
		a[3] = a[12];
		a[12] = x;
		x = a[6];
		a[6] = a[9];
		a[9] = x;
		x = a[7];
		a[7] = a[13];
		a[13] = x;
		x = a[11];
		a[11] = a[14];
		a[14] = x;
		return a
	};
	this.setTMorth = function(tm) {
		this.TM = tm;
		this.TM_1T = this.m33FromM44(this.TM)
	};
	this.setTM = function(tm) {
		this.TM = tm;
		this.TM_1T = this.m33Inverse(this.m33T(this.m33FromM44(this.TM)))
	};
	this.projectionMatrix = function() {
		return [ 1, 0, -this.eyeX / this.eyeZ, 0, 0, 1, -this.eyeY / this.eyeZ,
				0, 0, 0, 1, 0, 0, 0, -1 / this.eyeZ, 1 ]
	};
	this.projectX = function(x, y, z) {
		var w = z * (-1 / this.eyeZ) + 1;
		return (x + z * (-this.eyeX / this.eyeZ)) / w
	};
	this.projectY = function(x, y, z) {
		var w = z * (-1 / this.eyeZ) + 1;
		return (y + z * (-this.eyeY / this.eyeZ)) / w
	}
}
var taccgl = new taccgl_create();
function taccglAnimPlug() {
	this.isPlug = true;
	this.doPreDraw = function() {
		taccgl.doatI++;
		return true
	}
}
function taccglAnimPrototype(a) {
	this.init = function(c) {
		if (typeof (c) == "string") {
			var d = document.getElementById(c);
			if (!d) {
				alert("No Element with id " + c);
				return
			}
			c = d
		}
		var b = c;
		this.el = c;
		this.x0 = c.offsetLeft;
		this.y0 = c.offsetTop;
		while (b.offsetParent) {
			b = b.offsetParent;
			this.x0 += b.offsetLeft;
			this.y0 += b.offsetTop
		}
		this.x1 = this.x0;
		this.y1 = this.y0;
		this.z0 = this.z1 = 0;
		this.w = this.wx0 = this.wx1 = c.offsetWidth;
		this.wy0 = this.wz1 = this.wz0 = this.hx1 = 0;
		this.h = this.hy0 = this.hy1 = c.offsetHeight;
		this.hx0 = this.hz1 = this.wy1 = this.hz0 = 0;
		this.dx0 = this.dx1 = this.dy0 = this.dy1 = this.dz0 = this.dz1 = 0;
		this.x = this.s0 = this.x0;
		this.y = this.t0 = this.y0;
		this.ws0 = this.wx0;
		this.ht0 = this.hy0;
		this.rotation = false;
		this.flags = 0;
		this.basetime = taccgl.currenttime;
		this.vduration = taccgl.timeScale;
		this.isforeground = false;
		this.elshowatend = false;
		this.elhideatbegin = false;
		this.p = taccgl.stdsc;
		this.lightSpecular = taccgl.lightSpecular;
		this.lightShininess = taccgl.lightShininess
	};
	this.pclone = function() {
		if (typeof (this.attime) == "number") {
			return this.clone()
		} else {
			this.astepdelno = null;
			return this
		}
	};
	this.pnclone = function() {
		var b;
		if (typeof (this.attime) == "number") {
			b = this.clone()
		} else {
			b = this
		}
		if (this.vertEndIndex) {
			b.vertindex = this.vertEndIndex
		}
		return b
	};
	this.specLight = function(b, c) {
		this.lightSpecular = b % 1;
		this.lightShininess = Math.floor(c);
		return this
	};
	this.shadowOnly = function(c) {
		if (c == false) {
			this.flags &= ~128
		} else {
			this.flags |= 128
		}
		return this
	};
	this.castShadow = function(c) {
		if (c) {
			this.flags &= ~256
		} else {
			this.flags |= 256
		}
		return this
	};
	this.useTM = function(c) {
		if (c == false) {
			this.flags &= ~8
		} else {
			this.flags |= 8
		}
		return this
	};
	this.foreground = function() {
		if (taccgl.vBgControl) {
			this.isforeground = true;
			this.special = true
		}
		return this
	};
	this.ddstop = function() {
		var c = taccgl;
		taccgl.AA.splice(this.ddindex, 1);
		for (var b = this.ddindex; b < c.AA.length; b++) {
			c.AA[b].ddindex = b
		}
		c.AAstartedLength--
	};
	this.dddstop = function() {
		var b = taccgl;
		var d = b.vertI;
		b.vertI = this.vertindex;
		var c = this.flags &= ~2;
		while (b.vertI < this.vertEndIndex) {
			b.nvertTime(-2, 1, c)
		}
		b.vertI = d
	};
	this.stop = function() {
		if (this.astepdelno == taccgl.delno) {
			if (taccgl.dddmode) {
				this.dddstop()
			} else {
				this.ddstop()
			}
		}
		taccgl.deleteFromDoat(this);
		this.attime = null
	};
	this.cposClientRects = function() {
		var e = this.el.getClientRects();
		var b = e[0].left, f = e[0].top, c = e[0].width, d = e[0].height;
		b += document.body.scrollLeft || document.documentElement.scrollLeft;
		f += document.body.scrollTop || document.documentElement.scrollTop;
		this.x = this.s0 = this.x0 = b;
		this.y = this.t0 = this.y0 = f;
		this.x1 = this.x0;
		this.y1 = this.y0;
		this.w = this.ws0 = this.wx0 = this.wx1 = c;
		this.h = this.ht0 = this.hy0 = this.hy1 = d
	};
	this.cposTransform = function() {
		var g = getComputedStyle(this.el);
		var j = this.x, i = this.y, k = this.w, f = this.h;
		var o, l, b = null;
		if (o = g.transform) {
			b = taccgl.m32parse(o);
			l = g.transformOrigin
		} else {
			if (o = g.webkitTransform) {
				b = taccgl.m32parse(o);
				l = g.webkitTransformOrigin
			} else {
				if (o = g.mozTransform) {
					b = taccgl.m32parse(o);
					l = g.mozTransformOrigin
				} else {
					if (o = g.mstTransform) {
						b = taccgl.m32parse(o);
						l = g.msTransformOrigin
					}
				}
			}
		}
		var e = l.split(" ");
		var d = parseFloat(e[0]), c = parseFloat(e[1]);
		if (b) {
			var n = [ j - j - d, i - i - c ];
			j = taccgl.m32mulx(b, n) + j + d;
			i = taccgl.m32muly(b, n) + c + i;
			this.x = this.s0 = this.x0 = j;
			this.y = this.t0 = this.y0 = i;
			this.x1 = this.x0;
			this.y1 = this.y0;
			n = [ k, 0 ];
			this.wx1 = this.wx0 = this.ws0 = taccgl.m32mulx(b, n);
			this.wy1 = this.wy0 = this.wt0 = taccgl.m32muly(b, n);
			n = [ 0, f ];
			this.hx1 = this.hx0 = this.hs0 = taccgl.m32mulx(b, n);
			this.hy1 = this.hy0 = this.ht0 = taccgl.m32muly(b, n);
			this.w = Math.sqrt(this.wx0 * this.wx0 + this.wy0 * this.wy0);
			this.h = Math.sqrt(this.hx0 * this.hx0 + this.hy0 * this.hy0)
		}
	};
	this.flyHome = function() {
		var b = this.el;
		this.x1 = this.el.offsetLeft;
		this.y1 = this.el.offsetTop;
		this.z1 = 0;
		while (b.offsetParent) {
			b = b.offsetParent;
			this.x1 += b.offsetLeft;
			this.y1 += b.offsetTop
		}
		return this
	};
	this.rotateHome = function() {
		this.wx1 = this.el.offsetWidth;
		this.wz1 = this.hx1 = 0;
		this.hy1 = this.el.offsetHeight;
		this.hz1 = this.wy1 = 0;
		return this
	};
	this.flyToElement = function(c) {
		if (typeof (c) == "string") {
			c = document.getElementById(c)
		}
		var b = c;
		this.x1 = c.offsetLeft;
		this.y1 = c.offsetTop;
		this.z1 = 0;
		while (b.offsetParent) {
			b = b.offsetParent;
			this.x1 += b.offsetLeft;
			this.y1 += b.offsetTop
		}
		this.wx1 = c.offsetWidth;
		this.wz1 = this.hx1 = 0;
		this.hy1 = c.offsetHeight;
		this.hz1 = this.wy1 = 0;
		return this
	};
	this.hvec = function(b, d, c) {
		this.hx0 = this.hx1 = b;
		this.hy0 = this.hy1 = d;
		this.hz0 = this.hz1 = c;
		return this
	};
	this.hvec1 = function(b, d, c) {
		this.hx1 = b;
		this.hy1 = d;
		this.hz1 = c;
		return this
	};
	this.wvec = function(b, d, c) {
		this.wx0 = this.wx1 = b;
		this.wy0 = this.wy1 = d;
		this.wz0 = this.wz1 = c;
		return this
	};
	this.wvec1 = function(b, d, c) {
		this.wx1 = b;
		this.wy1 = d;
		this.wz1 = c;
		return this
	};
	this.dvec = function(b, d, c) {
		this.dx0 = this.dx1 = b;
		this.dy0 = this.dy1 = d;
		this.dz0 = this.dz1 = c;
		return this
	};
	this.dvec1 = function(b, d, c) {
		this.dx1 = b;
		this.dy1 = d;
		this.dz1 = c;
		return this
	};
	this.depth = function(f, e) {
		if (typeof (f) == "number") {
			var c = Math.sqrt(this.dx0 * this.dx0 + this.dy0 * this.dy0
					+ this.dz0 * this.dz0);
			if (typeof (e) != "number") {
				e = f
			}
			if (c < 0.000001) {
				this.dx0 = 0;
				this.dy0 = 0;
				this.dz0 = f
			} else {
				this.dx0 *= f / c;
				this.dy0 *= f / c;
				this.dz0 *= f / c
			}
		}
		if (typeof (e) == "number") {
			var b = Math.sqrt(this.dx1 * this.dx1 + this.dy1 * this.dy1
					+ this.dz1 * this.dz1);
			if (b < 0.000001) {
				this.dx1 = 0;
				this.dy1 = 0;
				this.dz1 = e
			} else {
				this.dx1 *= e / b;
				this.dy1 *= e / b;
				this.dz1 *= e / b
			}
		}
		return this
	};
	this.LQCanvas = function(c, b, e, d) {
		return this.SetQCanvas(c, b, e, d, taccgl.LQCanvas)
	};
	this.NQCanvas = function(c, b, e, d) {
		return this.SetQCanvas(c, b, e, d, taccgl.NQCanvas)
	};
	this.SetQCanvas = function(d, c, n, l, g) {
		if (!d) {
			d = 0
		}
		if (!c && c != 0) {
			c = d
		}
		if (!n && n != 0) {
			n = d
		}
		if (!l && l != 0) {
			l = n
		}
		var k = this.x - d, i = this.y - n, b = this.x + this.w + c, j = this.y
				+ this.h + l;
		if (k < 0) {
			k = 0
		}
		if (i < 0) {
			i = 0
		}
		var m = b - k, e = j - i;
		g.call(taccgl, k, i, m, e);
		return this
	};
	this.shader = function(b) {
		this.p = b
	};
	this.sc = function(b) {
		if (!taccgl.dddmode) {
			return this
		}
		if (!b.p) {
			b.compile()
		}
		this.p = b;
		if (!b.p && taccgl.webglerror) {
			this.p = taccgl.stdsc;
			taccgl.webglerror = false;
			taccgl.dddmode = true
		}
		this.special = true;
		return this
	};
	this.doAtBegin = function() {
		if (this.elhideatbegin) {
			if (this.opaqueLevelBegin || this.opaqueLevelBegin == 0) {
				this.elhideatbegin.style.opacity = this.opaqueLevelBegin
			} else {
				this.elhideatbegin.style.visibility = "hidden"
			}
		}
		if (this.isforeground) {
			taccgl.incForeground()
		}
		if (this.todoAtBegin) {
			var b, c;
			for (b = 0; b < this.todoAtBegin.length; b++) {
				c = this.todoAtBegin[b];
				this.todo = c;
				this.todo()
			}
		}
	};
	this.doAtEnd = function() {
		if (this.elshowatend) {
			var f = this.postVisibility;
			var e = this.postOpacity;
			if (f || f == "") {
				this.elshowatend.style.visibility = f
			}
			if (e || e == "" || e == 0) {
				this.elshowatend.style.opacity = e
			}
			var b;
			if (this.el.taccgl && (b = this.el.taccgl.asShadow)
					&& f != "hidden" && e !== 0) {
				if (!b.hbStarted || !b.inTime()) {
					b.showafter();
					b.start();
					if (taccgl.dddmode) {
						taccgl.updateDraw()
					} else {
						taccgl.updateDrawDD()
					}
				}
			}
		}
		if (this.isforeground) {
			taccgl.decForeground()
		}
		if (this.todoAtEnd) {
			var c, g;
			for (c = 0; c < this.todoAtEnd.length; c++) {
				g = this.todoAtEnd[c];
				if (typeof (g) == "function") {
					g.call(this)
				} else {
					g(this)
				}
			}
		}
	};
	this.registerBegin = this.onBegin = function(b) {
		if (!this.todoAtBegin) {
			this.todoAtBegin = Array(0)
		}
		this.todoAtBegin.push(b);
		this.special = true;
		return this
	};
	this.registerEnd = this.onEnd = function(b) {
		if (!this.todoAtEnd) {
			this.todoAtEnd = Array(0)
		}
		this.todoAtEnd.push(b);
		this.special = true;
		return this
	};
	this.doPreDraw = function(b) {
		if (this.draw_running) {
			this.doAtEndDone = true;
			this.doAtEnd();
			taccgl.doatI++
		} else {
			this.doAtBegin();
			this.draw_running = true;
			taccgl.adjustDoat(b, this.basetime + this.vduration)
		}
	};
	this.registerBeginEnd = function() {
		if (!this.attime && this.attime != 0) {
			var c = this.vduration + this.basetime;
			if (taccgl.duration < c) {
				taccgl.setDuration(c)
			}
			var b = taccgl.doat[taccgl.doat.length - 1];
			if (b && b.isPlug && b.attime < c) {
				b.attime = c
			}
			this.attime = this.basetime;
			taccgl.newDoat(this)
		}
	};
	this.acceleration = function(c, e, d) {
		var b = this.vduration * this.vduration;
		this.ax = c * b;
		this.ay = e * b;
		this.az = d * b;
		this.doacceleration = true;
		this.flags |= 4;
		return this
	};
	this.scalarAcceleration = function(b) {
		this.ax = (this.x1 - this.x0) * b;
		this.ay = (this.y1 - this.y0) * b;
		this.az = (this.z1 - this.z0) * b;
		this.doacceleration = true;
		this.flags |= 4;
		return this
	};
	this.vBegin = function(b, d, c) {
		this.ax = (this.x1 - this.x0) * 2 - 2 * this.vduration * b;
		this.ay = (this.y1 - this.y0) * 2 - 2 * this.vduration * d;
		this.az = (this.z1 - this.z0) * 2 - 2 * this.vduration * c;
		this.doacceleration = true;
		this.flags |= 4;
		return this
	};
	this.vEnd = function(b, d, c) {
		this.ax = -(this.x1 - this.x0) * 2 + 2 * this.vduration * b;
		this.ay = -(this.y1 - this.y0) * 2 + 2 * this.vduration * d;
		this.az = -(this.z1 - this.z0) * 2 + 2 * this.vduration * c;
		this.doacceleration = true;
		this.flags |= 4;
		return this
	};
	this.rotate = function(d, c, b, g, f, e) {
		this.rotation = true;
		this.rotpx = d;
		this.rotpy = c;
		this.rotpz = b;
		this.rotax = g;
		this.rotay = f;
		this.rotaz = e;
		this.rotfrom = 0;
		this.rotto = 2 * Math.PI;
		return this
	};
	this.rotateMiddle = function(d, c, b) {
		this.rotate(this.x1 + this.wx1 / 2, this.y1 + this.hy1 / 2, this.z1
				+ this.dz1 / 2, d, c, b);
		return this
	};
	this.rotatePart = function(c, b) {
		this.rotfrom = c;
		this.rotto = b;
		return this
	};
	this.restrict = function(b, e, c, d) {
		this.s0 += (b - this.x0) * (this.ws0 / this.wx0);
		this.t0 += (e - this.y0) * (this.ht0 / this.hy0);
		this.ht0 = d * (this.ht0 / this.hy0);
		this.ws0 = c * (this.ws0 / this.wx0);
		this.x0 = this.x1 = b;
		this.y0 = this.y1 = e;
		this.wx0 = this.wx1 = c;
		this.hy0 = this.hy1 = d;
		return this
	};
	this.clipA = function(c, e, b, d) {
		this.dotexmove = true;
		this.s1 = this.s0;
		this.ws1 = this.ws0;
		this.t1 = this.t0;
		this.ht1 = this.ht0;
		if (c) {
			this.wx0 = c
		} else {
			this.wx0 = 0
		}
		if (e) {
			this.hy0 = e
		} else {
			this.hy0 = 0
		}
		if (b || b == 0) {
			this.wx1 = b
		}
		if (d || d == 0) {
			this.hy1 = d
		}
		this.ws0 = this.wx0;
		this.ht0 = this.hy0;
		this.ws1 = this.wx1;
		this.ht1 = this.hy1;
		return this
	};
	this.growA = function(c, e, b, d) {
		if (c || c == 0) {
			this.wx0 = c
		} else {
			this.wx0 = 0
		}
		if (e || e == 0) {
			this.hy0 = e
		} else {
			this.hy0 = 0
		}
		if (b || b == 0) {
			this.wx1 = b
		}
		if (d || d == 0) {
			this.hy1 = d
		}
		return this
	};
	this.resize = function(d, g, c, f) {
		if (typeof (g) == "number") {
			var j = Math.sqrt(this.hx0 * this.hx0 + this.hy0 * this.hy0
					+ this.hz0 * this.hz0);
			if (j < 0.000001) {
				this.hy0 = g;
				this.hx0 = 0;
				this.hz0 = 0
			} else {
				this.hx0 *= g / j;
				this.hy0 *= g / j;
				this.hz0 *= g / j
			}
			if (typeof (f) != "number") {
				f = g
			}
		}
		if (typeof (f) == "number") {
			var i = Math.sqrt(this.hx1 * this.hx1 + this.hy1 * this.hy1
					+ this.hz1 * this.hz1);
			if (i < 0.000001) {
				this.hy1 = g;
				this.hx1 = 0;
				this.hz1 = 0
			} else {
				this.hx1 *= f / i;
				this.hy1 *= f / i;
				this.hz1 *= f / i
			}
		}
		if (typeof (d) == "number") {
			var e = Math.sqrt(this.wx0 * this.wx0 + this.wy0 * this.wy0
					+ this.wz0 * this.wz0);
			if (typeof (c) != "number") {
				c = d
			}
			if (e < 0.000001) {
				this.wx0 = d;
				this.wy0 = 0;
				this.wz0 = 0
			} else {
				this.wx0 *= d / e;
				this.wy0 *= d / e;
				this.wz0 *= d / e
			}
		}
		if (typeof (c) == "number") {
			var b = Math.sqrt(this.wx1 * this.wx1 + this.wy1 * this.wy1
					+ this.wz1 * this.wz1);
			if (b < 0.000001) {
				this.wx1 = d;
				this.wy1 = 0;
				this.wz1 = 0
			} else {
				this.wx1 *= c / b;
				this.wy1 *= c / b;
				this.wz1 *= c / b
			}
		}
		return this
	};
	this.resizeZ = function(c, b) {
		if (!taccgl.dddmode) {
			return this
		}
		if (!c && c != 0) {
			c = this.z0
		}
		if (!b && b != 0) {
			b = c
		}
		if (c == "out") {
			b = c = this.z1
		} else {
			if (c == "both") {
				c = this.z0;
				b = this.z1
			}
		}
		var d = (taccgl.eyeZ - c) / taccgl.eyeZ;
		this.hx0 *= d;
		this.hy0 *= d;
		this.hz0 *= d;
		this.wx0 *= d;
		this.wy0 *= d;
		this.wz0 *= d;
		d = (taccgl.eyeZ - b) / taccgl.eyeZ;
		this.hx1 *= d;
		this.hy1 *= d;
		this.hz1 *= d;
		this.wx1 *= d;
		this.wy1 *= d;
		this.wz1 *= d;
		return this
	};
	this.posZ = function(c, b) {
		if (!b && b != 0) {
			b = c
		}
		if (taccgl.dddmode) {
			this.x0 = ((taccgl.eyeZ - c) / (taccgl.eyeZ - this.z0)
					* (taccgl.eyeZ * this.x0 - this.z0 * taccgl.eyeX) + c
					* taccgl.eyeX)
					/ taccgl.eyeZ;
			this.y0 = ((taccgl.eyeZ - c) / (taccgl.eyeZ - this.z0)
					* (taccgl.eyeZ * this.y0 - this.z0 * taccgl.eyeY) + c
					* taccgl.eyeY)
					/ taccgl.eyeZ;
			this.x1 = ((taccgl.eyeZ - b) / (taccgl.eyeZ - this.z1)
					* (taccgl.eyeZ * this.x1 - this.z1 * taccgl.eyeX) + b
					* taccgl.eyeX)
					/ taccgl.eyeZ;
			this.y1 = ((taccgl.eyeZ - b) / (taccgl.eyeZ - this.z1)
					* (taccgl.eyeZ * this.y1 - this.z1 * taccgl.eyeY) + b
					* taccgl.eyeY)
					/ taccgl.eyeZ
		} else {
			this.x0 -= taccgl.ddfx * (c - this.z0);
			this.y0 -= taccgl.ddfy * (c - this.z0);
			this.x1 -= taccgl.ddfx * (b - this.z1);
			this.y1 -= taccgl.ddfy * (b - this.z1)
		}
		this.z0 = c;
		this.z1 = b;
		return this
	};
	this.texmove = function(c, b, e, d) {
		this.dotexmove = true;
		this.s1 = e;
		this.ws1 = this.ws0;
		this.t1 = d;
		this.ht1 = this.ht0;
		this.s0 = c;
		this.t0 = b;
		return this
	};
	this.flyIn = function(b, c, d) {
		this.x0 = b;
		this.y0 = c;
		this.z0 = d;
		return this
	};
	this.flyOut = function(b, d, c) {
		this.x1 = b;
		this.y1 = d;
		this.z1 = c;
		return this
	};
	this.position = function(b, d, c) {
		this.x1 = b;
		this.y1 = d;
		this.z1 = c;
		this.x0 = b;
		this.y0 = d;
		this.z0 = c;
		return this
	};
	this.reverseLMotion = function() {
		var b = this.x0, d = this.y0, c = this.z0;
		this.x0 = this.x1;
		this.y0 = this.y1;
		this.z0 = this.z1;
		this.x1 = b;
		this.y1 = d;
		this.z1 = c;
		return this
	};
	this.textureDraw = function() {
		taccgl.paintElement(this.el, true);
		return this
	};
	this.texClear = function(b) {
		if (!b) {
			b = 1
		}
		taccgl.texTo(b);
		if (!taccgl.texc) {
			return this
		}
		taccgl.markCanvasChanged();
		if (this.s0 != this.x || this.t0 != this.y || this.ws0 != this.w
				|| this.ht0 != this.h) {
			var d = this.ws0 / this.w;
			var c = this.ht0 / this.h;
			taccgl.texTransform(d, 0, 0, c, (this.s0 - this.x * d),
					(this.t0 - this.y * c));
			taccgl.texc.clearRect(this.x, this.y, this.w, this.h);
			taccgl.texTransform(1, 0, 0, 1, 0, 0)
		} else {
			taccgl.texc.clearRect(this.x, this.y, this.w, this.h)
		}
		return this
	};
	this.paint = function(b, c) {
		if (c != false) {
			c = true
		}
		if (!b) {
			b = 1
		}
		if (!(taccgl.ddmode || taccgl.dddmode)) {
			return this
		}
		taccgl.texTo(b);
		if (this.s0 != this.x || this.t0 != this.y || this.ws0 != this.w
				|| this.ht0 != this.h) {
			var e = this.ws0 / this.w;
			var d = this.ht0 / this.h;
			taccgl.texTransform(e, 0, 0, d, (this.s0 - this.x * e),
					(this.t0 - this.y * d));
			taccgl.paintElement(this.el, c);
			taccgl.texTransform(1, 0, 0, 1, 0, 0)
		} else {
			taccgl.paintElement(this.el, c)
		}
		return this
	};
	this.hide = function() {
		taccgl.taccglAttach(this.el);
		if (!this.el.taccgl.preVisibility && this.el.taccgl.preVisibility != "") {
			this.el.taccgl.preVisibility = this.el.style.visibility
		}
		this.el.style.visibility = "hidden";
		var b;
		if (b = this.el.taccgl.asShadow) {
			b.showafter(false);
			b.starttime(-1);
			b.dur(0.001);
			b.start()
		}
		return this
	};
	this.opacity = function(c) {
		if (!c) {
			c = 0
		}
		taccgl.taccglAttach(this.el);
		if (!this.el.taccgl.preOpacity && this.el.taccgl.preOpacity != 0) {
			this.el.taccgl.preOpacity = this.el.style.opacity
		}
		this.el.style.opacity = c;
		var b;
		if (c == 0 && (b = this.el.taccgl.asShadow)) {
			b.showafter(false);
			b.starttime(-1);
			b.dur(0.001);
			b.start()
		}
		return this
	};
	this.visatend = this.visAtEnd = function(b) {
		taccgl.taccglAttach(this.el);
		if (b != null) {
			this.postVisibility = b
		} else {
			if (this.el.taccgl.preVisibility != null) {
				this.postVisibility = this.el.taccgl.preVisibility
			} else {
				this.postVisibility = this.el.style.visibility
			}
		}
		this.elshowatend = this.el;
		this.special = true;
		return this
	};
	this.opacityatend = this.opacityAtEnd = function(b) {
		taccgl.taccglAttach(this.el);
		if (b != null) {
			this.postOpacity = b
		} else {
			if (this.el.taccgl.preOpacity != null) {
				this.postOpacity = this.el.taccgl.preOpacity
			} else {
				this.postOpacity = this.el.style.opacity
			}
		}
		this.elshowatend = this.el;
		this.special = true;
		return this
	};
	this.hideAtBegin = function() {
		this.elhideatbegin = this.el;
		this.special = true;
		return this
	};
	this.opacityAtBegin = function(c) {
		if (!c) {
			c = 0
		}
		this.elhideatbegin = this.el;
		this.opaqueLevelBegin = c;
		this.special = true;
		var b;
		if (b = this.el.taccgl.asShadow) {
			b.showafter(false);
			b.dur(this.basetime - b.basetime);
			b.start()
		}
		return this
	};
	this.visFinal = function(b) {
		taccgl.taccglAttach(this.el);
		if (b) {
			this.el.taccgl.postVisibility = b
		} else {
			if (this.el.taccgl.preVisibility != null) {
				this.el.taccgl.postVisibility = this.el.taccgl.preVisibility
			} else {
				this.el.taccgl.postVisibility = this.el.style.visibility
			}
		}
		taccgl.showAfterAnimation.push(this);
		return this
	};
	this.opacityFinal = function(b) {
		taccgl.taccglAttach(this.el);
		if (b) {
			this.el.taccgl.postOpacity = b
		} else {
			if (this.el.taccgl.preOpacity != null) {
				this.el.taccgl.postOpacity = this.el.taccgl.preOpacity
			} else {
				this.el.taccgl.postOpacity = this.el.style.opacity
			}
		}
		taccgl.showAfterAnimation.push(this);
		return this
	};
	this.starttime = this.startTime = function(b) {
		if (!b) {
			b = 0
		}
		this.basetime = b + taccgl.currenttime;
		return this
	};
	this.absStartTime = function(b) {
		this.basetime = b;
		return this
	};
	this.duration = this.dur = function(b) {
		this.vduration = b * taccgl.timeScale;
		return this
	};
	this.until = function(b) {
		this.dur(b + taccgl.currenttime - this.basetime);
		return this
	};
	this.untilEo = function(b) {
		this.until(b.basetime + b.vduration);
		return this
	};
	this.untilBo = function(b) {
		this.until(b.basetime);
		return this
	};
	this.untilaLEo = function(b) {
		if (b.basetime + b.vduration > this.basetime + this.vduration) {
			this.until(b.basetime + b.vduration)
		}
		return this
	};
	this.untilaLBo = function(b) {
		if (b.basetime > this.basetime + this.vduration) {
			this.until(b.basetime)
		}
		return this
	};
	this.untilaMEo = function(b) {
		if (b.basetime + b.vduration < this.basetime + this.vduration) {
			this.until(b.basetime + b.vduration)
		}
		return this
	};
	this.untilaMBo = function(b) {
		if (b.basetime < this.basetime + this.vduration) {
			this.until(b.basetime)
		}
		return this
	};
	this.showbefore = this.showBefore = function(c) {
		if (c == false) {
			this.flags &= ~1
		} else {
			this.flags |= 1
		}
		return this
	};
	this.showafter = this.showAfter = function(c) {
		if (c == false) {
			this.flags &= ~2
		} else {
			this.flags |= 2
		}
		return this
	};
	this.blend = function(e, d, b, c) {
		if (!this.docolor) {
			this.col0s = this.col0t = this.col1s = this.col1t = -128 * 256
		}
		this.docolor = true;
		this.flags |= 16;
		this.mix0 = e;
		this.mix1 = e;
		if (!d) {
			d = 0
		}
		this.mixs0 = d;
		this.mixs1 = d;
		if (typeof (b) == "number") {
			this.mix1 = b
		}
		if (typeof (c) == "number") {
			this.mixs1 = c
		}
		return this
	};
	this.blendA = function(c, b, e, d) {
		if (!this.docolor) {
			this.col0s = this.col0t = this.col1s = this.col1t = -128 * 256
		}
		this.docolor = true;
		this.flags |= 16;
		this.mix0 = c;
		this.mix1 = b;
		if (!e) {
			e = 0
		}
		if (!d) {
			d = 0
		}
		this.mixs0 = e;
		this.mixs1 = d;
		return this
	};
	this.color = function(k, f) {
		var j, i, h, d, e;
		if (!this.docolor) {
			this.mix1 = this.mix0 = 1;
			this.mixs0 = this.mixs1 = 0
		}
		this.docolor = true;
		this.flags |= 16;
		this.flags &= ~32;
		this.flags &= ~64;
		this.ddcolor0 = this.ddcolor1 = k;
		if (f) {
			this.ddcolor1 = f
		}
		if (k && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = k;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			j = taccgl.scratchc.getImageData(0, 0, 1, 1), i = j.data[0],
					h = j.data[1], d = j.data[2], e = j.data[3];
			this.col0s = this.col1s = i + 256 * (h - 128);
			this.col0t = this.col1t = e + 256 * (d - 128)
		}
		if (f && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = f;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			j = taccgl.scratchc.getImageData(0, 0, 1, 1), i = j.data[0],
					h = j.data[1], d = j.data[2], e = j.data[3];
			this.col1s = i + 256 * (h - 128);
			this.col1t = e + 256 * (d - 128)
		}
		return this
	};
	this.colorA = function(k, f) {
		var j, i, h, d, e;
		if (!this.docolor) {
			this.mix1 = this.mix0 = 1;
			this.mixs0 = this.mixs1 = 0
		}
		this.docolor = true;
		this.flags |= 16;
		this.flags &= ~32;
		this.flags &= ~64;
		this.ddcolor0 = k;
		this.ddcolor1 = f;
		if (k && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = k;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			j = taccgl.scratchc.getImageData(0, 0, 1, 1), i = j.data[0],
					h = j.data[1], d = j.data[2], e = j.data[3];
			this.col0s = i + 256 * (h - 128);
			this.col0t = e + 256 * (d - 128)
		}
		if (f && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = f;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			j = taccgl.scratchc.getImageData(0, 0, 1, 1), i = j.data[0],
					h = j.data[1], d = j.data[2], e = j.data[3];
			this.col1s = i + 256 * (h - 128);
			this.col1t = e + 256 * (d - 128)
		}
		return this
	};
	this.lightAmbDiff = function(e, b, d, c) {
		this.color(e, b);
		this.ddcolor0 = b;
		this.ddcolor1 = b;
		if (!d && d != 0) {
			d = 0
		}
		if (!c && c != 0) {
			c = 0
		}
		if (d > 1) {
			d = 1
		}
		if (c > 1) {
			c = 1
		}
		if (d < 0) {
			d = 0
		}
		if (c < 0) {
			c = 0
		}
		this.col0t = Math.floor(this.col0t / 256) * 256 + d * 255;
		this.col1t = Math.floor(this.col1t / 256) * 256 + c * 255;
		this.flags |= 32;
		this.flags &= ~64;
		return this
	};
	this.lightBgAmbDiff = function(j, m, l, f, e) {
		if (!this.docolor) {
			this.mix1 = this.mix0 = 1;
			this.mixs0 = this.mixs1 = 0
		}
		this.docolor = true;
		this.flags |= 16 + 32 + 64;
		this.ddcolor0 = j;
		this.ddcolor1 = j;
		if (!f && f != 0) {
			f = 1
		}
		if (!e && e != 0) {
			e = 1
		}
		if (f > 1) {
			f = 1
		}
		if (e > 1) {
			e = 1
		}
		if (f < 0) {
			f = 0
		}
		if (e < 0) {
			e = 0
		}
		if (j && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = j;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			var h = taccgl.scratchc.getImageData(0, 0, 1, 1), d = h.data[0], i = h.data[1], k = h.data[2];
			this.col0s = d + 256 * (i - 128);
			this.col0t = Math.floor(f * 255) + 256 * (k - 128)
		}
		if (m > 1) {
			m = 1
		}
		if (l > 1) {
			l = 1
		}
		if (m < 0) {
			m = 0
		}
		if (l < 0) {
			l = 0
		}
		m = Math.floor(m * 255);
		l = Math.floor(l * 255);
		this.col1s = m + 256 * (l - 128);
		this.col1t = Math.floor(e * 255);
		return this
	};
	this.material = function(b) {
		b.applyToAnim(this);
		return this
	};
	this.map = function(e, c, b, d) {
		if (e || e == 0) {
			this.s0 = e
		}
		if (c || c == 0) {
			this.t0 = c
		}
		if (b && d) {
			this.ws0 = b;
			this.ht0 = d
		} else {
			if (b) {
				this.ws0 = b;
				this.ht0 *= b / this.ws0
			} else {
				if (d) {
					this.ws0 *= d / this.ht0;
					this.ht0 = d
				}
			}
		}
		return this
	};
	this.mapScale = function(b) {
		this.ws0 *= b;
		this.ht0 *= b;
		return this
	};
	this.map1 = function(e, c, b, d) {
		this.dotexmove = true;
		if (e) {
			this.s1 = e
		}
		if (c) {
			this.t1 = c
		}
		if (b) {
			this.ws1 = b
		}
		if (d) {
			this.ht1 = d
		}
		return this
	};
	this.mapA = function() {
		this.dotexmove = true;
		this.s1 = this.s0;
		this.t1 = this.t0;
		this.ws1 = this.ws0;
		this.ht1 = this.ht0;
		return this
	};
	this.mapElement = function(e) {
		if (typeof (e) == "string") {
			e = document.getElementById(e)
		}
		var d = e, c, b;
		c = e.offsetLeft;
		b = e.offsetTop;
		while (d.offsetParent) {
			d = d.offsetParent;
			c += d.offsetLeft;
			b += d.offsetTop
		}
		this.map(c, b, e.offsetWidth, e.offsetHeight);
		return this
	};
	this.mapActor = function(c, b) {
		if (typeof (c) == "string") {
			c = document.getElementById(c)
		}
		if (!b) {
			b = 1
		}
		taccgl.texTo(b);
		taccgl.paintElement(c, true);
		if (b == 2) {
			this.blend(0, 1)
		}
		return this.mapElement(c)
	};
	this.mapMirrorY = function() {
		var b = this.s0;
		this.s0 = b + this.ws0;
		this.ws0 = -this.ws0;
		return this
	};
	this.mapMirrorX = function() {
		var b = this.t0;
		this.t0 = b + this.ht0;
		this.ht0 = -this.ht0;
		return this
	};
	this.mapRelative = function(e, c, b, d) {
		if (!b && b != 0) {
			b = this.ws0
		}
		if (!d && d != 0) {
			d = this.ht0
		}
		this.s0 += e;
		this.t0 += c;
		this.ws0 = b;
		this.ht0 = d;
		return this
	};
	this.mapClip = function(b, c, e, d) {
		if (d != "b" && d != "br") {
			if (c > this.ht0) {
				c = this.ht0
			}
		}
		if (d != "r" && d != "br") {
			if (b > this.ws0) {
				b = this.ws0
			}
		}
		if (e == "tl") {
		} else {
			if (e == "t") {
				b = this.ws0
			} else {
				if (e == "tr") {
					this.s0 += this.ws0 - b
				} else {
					if (e == "l") {
						c = this.ht0
					} else {
						if (e == "r") {
							this.s0 += this.ws0 - b;
							c = this.ht0
						} else {
							if (e == "bl") {
								this.t0 += this.ht0 - c
							} else {
								if (e == "b") {
									this.t0 += this.ht0 - c;
									b = this.ws0
								} else {
									if (e == "br") {
										this.t0 += this.ht0 - c;
										this.s0 += this.ws0 - b
									}
								}
							}
						}
					}
				}
			}
		}
		this.ws0 = b;
		this.ht0 = c;
		return this
	};
	this.mapClipToElement = function(e, d) {
		var c = Math.sqrt(this.hx0 * this.hx0 + this.hy0 * this.hy0 + this.hz0
				* this.hz0), b = Math.sqrt(this.wx0 * this.wx0 + this.wy0
				* this.wy0 + this.wz0 * this.wz0);
		this.mapClip(b, c, e, d);
		return this
	};
	this.copyTiming = function(b) {
		this.absStartTime(b.basetime);
		this.dur(b.vduration);
		return this
	};
	this.copyMotion = function(b) {
		this.rotate(b.rotpx, b.rotpy, b.rotpz, b.rotax, b.rotay, b.rotaz);
		this.rotatePart(b.rotfrom, b.rotto);
		return this
	};
	this.hbStarted = function() {
		if (!this.astepdelno) {
			return false
		}
		return this.astepdelno == taccgl.delno
	};
	this.inTime = function(b) {
		if (!b && b != 0) {
			b = taccgl.currenttime
		}
		if (b < this.basetime && ((this.flags & 1) == 0)) {
			return false
		}
		if (b > this.basetime + this.vduration && ((this.flags & 2) == 0)) {
			return false
		}
		return true
	};
	this.calcBounds0 = function() {
		var c = taccgl.projectX(this.x0, this.y0, this.z0);
		var f = c;
		var d = c;
		var c = taccgl.projectX(this.x0 + this.hx0, this.y0 + this.hy0, this.z0
				+ this.hz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		var c = taccgl.projectX(this.x0 + this.wx0, this.y0 + this.wy0, this.z0
				+ this.wz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		var c = taccgl.projectX(this.x0 + this.dx0, this.y0 + this.dy0, this.z0
				+ this.dz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		var c = taccgl.projectX(this.x0 + this.hx0 + this.wx0, this.y0
				+ this.hy0 + this.wy0, this.z0 + this.hz0 + this.wz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		var c = taccgl.projectX(this.x0 + this.hx0 + this.dx0, this.y0
				+ this.hy0 + this.dy0, this.z0 + this.hz0 + this.dz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		var c = taccgl.projectX(this.x0 + this.dx0 + this.wx0, this.y0
				+ this.dy0 + this.wy0, this.z0 + this.dz0 + this.wz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		var c = taccgl.projectX(this.x0 + this.hx0 + this.wx0 + this.dx0,
				this.y0 + this.hy0 + this.wy0 + this.dy0, this.z0 + this.hz0
						+ this.wz0 + this.dz0);
		if (c < f) {
			f = c
		}
		if (c > d) {
			d = c
		}
		this.pxmin = f;
		this.pxmax = d;
		var g = taccgl.projectY(this.x0, this.y0, this.z0);
		var e = g;
		var b = g;
		var g = taccgl.projectY(this.x0 + this.hx0, this.y0 + this.hy0, this.z0
				+ this.hz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		var g = taccgl.projectY(this.x0 + this.wx0, this.y0 + this.wy0, this.z0
				+ this.wz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		var g = taccgl.projectY(this.x0 + this.dx0, this.y0 + this.dy0, this.z0
				+ this.dz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		var g = taccgl.projectY(this.x0 + this.hx0 + this.wx0, this.y0
				+ this.hy0 + this.wy0, this.z0 + this.hz0 + this.wz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		var g = taccgl.projectY(this.x0 + this.hx0 + this.dx0, this.y0
				+ this.hy0 + this.dy0, this.z0 + this.hz0 + this.dz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		var g = taccgl.projectY(this.x0 + this.dx0 + this.wx0, this.y0
				+ this.dy0 + this.wy0, this.z0 + this.dz0 + this.wz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		var g = taccgl.projectY(this.x0 + this.hx0 + this.wx0 + this.dx0,
				this.y0 + this.hy0 + this.wy0 + this.dy0, this.z0 + this.hz0
						+ this.wz0 + this.dz0);
		if (g < e) {
			e = g
		}
		if (g > b) {
			b = g
		}
		this.pymin = e;
		this.pymax = b;
		return this
	};
	this.ddstart = function() {
		var b = taccgl, g = this.vduration + this.basetime;
		if (this.special) {
			this.startSpecialDD()
		}
		if (!taccgl.ddmode) {
			return
		}
		if (this.flags & 128) {
			return
		}
		if (b.duration < g) {
			b.setDuration(g)
		}
		if (!this.doacceleration) {
			this.ax = this.ay = this.az = 0
		}
		if (!this.dotexmove) {
			this.s1 = this.s0;
			this.ws1 = this.ws0;
			this.t1 = this.t0;
			this.ht1 = this.ht0
		}
		if (this.face) {
			var c;
			for (c = 0; c < this.face.length; c++) {
				var d = this.face[c];
				if (!d.dotexmove) {
					d.s1 = d.s0
				}
				d.ws1 = d.ws0;
				d.t1 = d.t0;
				d.ht1 = d.ht0
			}
		}
		if (this.astepdelno != b.delno) {
			b.AA.push(this);
			this.ddindex = b.AA.length - 1
		}
		this.astepdelno = b.delno;
		return this
	};
	this.startSpecialDD = function() {
		if (this.isforeground || this.todoAtBegin || this.todoAtEnd
				|| this.elshowatend || this.elhideatbegin) {
			this.registerBeginEnd()
		}
	};
	this.startSpecial = function() {
		if (this.p != taccgl.stdsc) {
			taccgl.setShader(this.p)
		}
		if (this.isforeground || this.todoAtBegin || this.todoAtEnd
				|| this.elshowatend || this.elhideatbegin) {
			this.registerBeginEnd()
		}
		var b;
		if (this.elhideatbegin && (b = this.el.taccgl.asShadow)) {
			if (this.basetime - b.basetime > 0) {
				b.showafter(false);
				b.dur(this.basetime - b.basetime);
				b.start()
			}
		}
	};
	this.start = function() {
		var d = taccgl;
		if (!d.dddmode) {
			this.ddstart();
			return this
		}
		var f = null;
		if (this.astepdelno == d.delno) {
			f = d.vertI;
			d.vertI = this.vertindex
		} else {
			this.vertindex = d.vertI;
			this.astepdelno = d.delno
		}
		if (this.special) {
			this.startSpecial()
		}
		var b = this.hy0 * this.wz0 - this.hz0 * this.wy0, g = this.hz0
				* this.wx0 - this.hx0 * this.wz0, e = this.hx0 * this.wy0
				- this.hy0 * this.wx0;
		var c = this.lightSpecular + this.lightShininess;
		d.nvertMove(this.x0, this.y0, this.z0, this.x1, this.y1, this.z1, b, g,
				e, c, this.s0, this.t0, this.flags, this.basetime,
				this.vduration);
		d.nvertMove(this.x0 + this.hx0, this.y0 + this.hy0, this.z0 + this.hz0,
				this.x1 + this.hx1, this.y1 + this.hy1, this.z1 + this.hz1, b,
				g, e, c, this.s0, this.t0 + this.ht0, this.flags,
				this.basetime, this.vduration);
		d.nvertMove(this.x0 + this.wx0, this.y0 + this.wy0, this.z0 + this.wz0,
				this.x1 + this.wx1, this.y1 + this.wy1, this.z1 + this.wz1, b,
				g, e, c, this.s0 + this.ws0, this.t0, this.flags,
				this.basetime, this.vduration);
		d.nvertMove(this.x0 + this.wx0 + this.hx0, this.y0 + this.wy0
				+ this.hy0, this.z0 + this.wz0 + this.hz0, this.x1 + this.wx1
				+ this.hx1, this.y1 + this.hy1 + this.wy1, this.z1 + this.wz1
				+ this.hz1, b, g, e, c, this.s0 + this.ws0, this.t0 + this.ht0,
				this.flags, this.basetime, this.vduration);
		d.nvertMove(this.x0 + this.wx0, this.y0 + this.wy0, this.z0 + this.wz0,
				this.x1 + this.wx1, this.y1 + this.wy1, this.z1 + this.wz1, b,
				g, e, c, this.s0 + this.ws0, this.t0, this.flags,
				this.basetime, this.vduration);
		d.nvertMove(this.x0 + this.hx0, this.y0 + this.hy0, this.z0 + this.hz0,
				this.x1 + this.hx1, this.y1 + this.hy1, this.z1 + this.hz1, b,
				g, e, c, this.s0, this.t0 + this.ht0, this.flags,
				this.basetime, this.vduration);
		this.startRest();
		this.vertEndIndex = d.vertI;
		if (f) {
			d.vertI = f
		}
		return this
	};
	this.startRest = function() {
		var b = taccgl, c, d = this.vduration + this.basetime;
		if (b.duration < d) {
			b.setDuration(d)
		}
		if (this.rotation) {
			for (c = 1; c <= 6; c++) {
				b.nvertRot(this.rotpx, this.rotpy, this.rotpz, this.rotax,
						this.rotay, this.rotaz, this.rotfrom, this.rotto);
				b.nvertOffset(-1)
			}
			b.nvertOffset(6)
		}
		if (this.doacceleration) {
			for (c = 1; c <= 6; c++) {
				b.nvertAcceleration(this.ax, this.ay, this.az);
				b.nvertOffset(-1)
			}
			b.nvertOffset(6)
		}
		if (this.dotexmove) {
			b.nvertOffset(-5);
			b.nvertTexMove(this.s1, this.t1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1, this.t1 + this.ht1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1 + this.ws1, this.t1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1 + this.ws1, this.t1 + this.ht1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1 + this.ws1, this.t1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1, this.t1 + this.ht1)
		}
		if (this.docolor) {
			b.nvertColor6(this.col0s, this.col0t, this.col1s, this.col1t,
					this.mix0, this.mix1, this.mixs0, this.mixs1)
		}
		if (this.p != b.stdsc) {
			b.setShader(b.stdsc)
		}
	};
	this.startRestTriangle = function() {
		var b = taccgl, c, d = this.vduration + this.basetime;
		if (b.duration < d) {
			b.setDuration(d)
		}
		if (this.rotation) {
			for (c = 1; c <= 3; c++) {
				b.nvertRot(this.rotpx, this.rotpy, this.rotpz, this.rotax,
						this.rotay, this.rotaz, this.rotfrom, this.rotto);
				b.nvertOffset(-1)
			}
			b.nvertOffset(3)
		}
		if (this.doacceleration) {
			for (c = 1; c <= 3; c++) {
				b.nvertAcceleration(this.ax, this.ay, this.az);
				b.nvertOffset(-1)
			}
			b.nvertOffset(3)
		}
		if (this.dotexmove) {
			b.nvertOffset(-2);
			b.nvertTexMove(this.s1, this.t1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1 + this.ws1, this.t1);
			b.nvertOffset(1);
			b.nvertTexMove(this.s1, this.t1 + this.ht1)
		}
		if (this.docolor) {
			b.nvertColor3(this.col0s, this.col0t, this.col1s, this.col1t,
					this.mix0, this.mix1, this.mixs0, this.mixs1)
		}
		if (this.p != b.stdsc) {
			b.setShader(b.stdsc)
		}
	};
	this.startFixNormal = function() {
		var e = taccgl;
		var m = this.lightSpecular + this.lightShininess;
		e.nvertOffset(-3);
		var l = e.vertOrigin[4 * e.vertI + 4] - e.vertOrigin[4 * e.vertI], g = e.vertOrigin[4 * e.vertI + 5]
				- e.vertOrigin[4 * e.vertI + 1], c = e.vertOrigin[4 * e.vertI + 6]
				- e.vertOrigin[4 * e.vertI + 2], b = e.vertOrigin[4 * e.vertI + 8]
				- e.vertOrigin[4 * e.vertI], k = e.vertOrigin[4 * e.vertI + 9]
				- e.vertOrigin[4 * e.vertI + 1], d = e.vertOrigin[4 * e.vertI + 10]
				- e.vertOrigin[4 * e.vertI + 2], i = g * d - c * k, h = c * b
				- l * d, f = l * k - g * b;
		e.nvertOffset(1);
		e.nvertNormal(i, h, f, m);
		e.nvertOffset(1);
		e.nvertNormal(i, h, f, m);
		e.nvertOffset(1);
		e.nvertNormal(i, h, f, m)
	};
	this.a = function(c, b) {
		var d = taccgl.a(c, b);
		d.absStartTime(this.basetime + this.vduration);
		return (d)
	};
	this.actor = function(d, c, b, f) {
		var e = taccgl.actor(d, c, b, f);
		e.absStartTime(this.basetime + this.vduration);
		return (e)
	};
	this.vecsize = function(b, d, c) {
		return Math.sqrt(b * b + d * d + c * c)
	};
	this.contIntern = function(c, b) {
		c.absStartTime(this.basetime + this.vduration);
		if (!b) {
			this.calcRotEndPoints();
			c.flyIn(this.roex, this.roey, this.roez);
			c.hvec(this.rohx, this.rohy, this.rohz);
			c.wvec(this.rowx, this.rowy, this.rowz);
			c.dvec(this.rodx, this.rody, this.rodz);
			c.flyOut(this.roex, this.roey, this.roez);
			if (this.docolor) {
				c.blend(this.mix1, this.mixs1);
				if (this.flags & 96) {
					c.col0s = this.col0s;
					c.col1s = this.col1s;
					c.col0t = this.col0t;
					c.col1t = this.col1t
				} else {
					c.col0s = this.col1s;
					c.col1s = this.col1s;
					c.col0t = this.col1t;
					c.col1t = this.col1t
				}
				c.flags |= this.flags & (16 + 32 + 64)
			}
			c.s0 = this.s0;
			c.t0 = this.t0;
			c.ws0 = this.ws0;
			c.ht0 = this.ht0;
			c.p = this.p
		}
		return (c)
	};
	this.contShiftAtEndAction = function(b) {
		if (this.elshowatend) {
			b.elshowatend = this.elshowatend;
			this.elshowatend = null;
			b.special = true;
			if (this.postVisibility || this.postVisibility == "") {
				b.postVisibility = this.postVisibility
			}
			if (this.postOpacity || this.postOpacity == 0
					|| this.postOpacity == "") {
				b.postOpacity = this.postOpacity
			}
		}
	};
	this.cont = function() {
		var c = this.el, b = new taccgl.taccglAnim(c);
		if (this.elshowatend) {
			this.contShiftAtEndAction(b)
		}
		return (this.contIntern(b, null))
	};
	this.baseCont = function() {
		var c = this.el, b = new taccgl.taccglAnim(c);
		return (this.contIntern(b, null))
	};
	this.calcRotation = function(g, b, i, f) {
		var h = Math.cos(-g), e = (1 - h), d = Math.sin(-g);
		b -= this.rotpx;
		i -= this.rotpy;
		f -= this.rotpz;
		this.resx = (h + this.rotax * this.rotax * e) * b
				+ (this.rotax * this.rotay * e - this.rotaz * d) * i
				+ (this.rotax * this.rotaz * e + this.rotay * d) * f;
		this.resy = (this.rotax * this.rotay * e + this.rotaz * d) * b
				+ (h + this.rotay * this.rotay * e) * i
				+ (this.rotay * this.rotaz * e - this.rotax * d) * f;
		this.resz = (this.rotaz * this.rotax * e - this.rotay * d) * b
				+ (this.rotaz * this.rotay * e + this.rotax * d) * i
				+ (h + this.rotaz * this.rotaz * e) * f;
		this.resx += this.rotpx;
		this.resy += this.rotpy;
		this.resz += this.rotpz
	};
	this.calcRotEndPoints = function() {
		if (this.rotation) {
			this.calcRotation(this.rotto, this.x1, this.y1, this.z1);
			this.roex = this.resx;
			this.roey = this.resy;
			this.roez = this.resz;
			this.calcRotation(this.rotto, this.x1 + this.hx1, this.y1
					+ this.hy1, this.z1 + this.hz1);
			this.rohx = this.resx - this.roex;
			this.rohy = this.resy - this.roey;
			this.rohz = this.resz - this.roez;
			this.calcRotation(this.rotto, this.x1 + this.wx1, this.y1
					+ this.wy1, this.z1 + this.wz1);
			this.rowx = this.resx - this.roex;
			this.rowy = this.resy - this.roey;
			this.rowz = this.resz - this.roez;
			this.calcRotation(this.rotto, this.x1 + this.dx1, this.y1
					+ this.dy1, this.z1 + this.dz1);
			this.rodx = this.resx - this.roex;
			this.rody = this.resy - this.roey;
			this.rodz = this.resz - this.roez
		} else {
			this.roex = this.x1;
			this.roey = this.y1;
			this.roez = this.z1;
			this.rohx = this.hx1;
			this.rohy = this.hy1;
			this.rohz = this.hz1;
			this.rowx = this.wx1;
			this.rowy = this.wy1;
			this.rowz = this.wz1;
			this.rodx = this.dx1;
			this.rody = this.dy1;
			this.rodz = this.dz1
		}
	};
	this.vEnd_x = function() {
		return ((this.ax * 0.5 + this.x1 - this.x0) / this.vduration)
	};
	this.vEnd_y = function() {
		return ((this.ay * 0.5 + this.y1 - this.y0) / this.vduration)
	};
	this.vEnd_z = function() {
		return ((this.az * 0.5 + this.z1 - this.z0) / this.vduration)
	};
	this.contAccel = function(b, g, f, e) {
		var c = new taccgl.taccglAnim(this.el);
		c.absStartTime(this.basetime + this.vduration);
		c.flyIn(this.x1, this.y1, this.z1).duration(e).flyOut(b, g, f);
		c.vBegin(this.vEnd_x(), this.vEnd_y(), this.vEnd_z());
		c.hvec(this.hx1, this.hy1, this.hz1);
		c.wvec(this.wx1, this.wy1, this.wz1);
		c.dvec(this.dx1, this.dy1, this.hd1);
		if (this.docolor) {
			c.blend(this.mix1, this.mixs1);
			if (this.flags & 96) {
				c.col0s = this.col0s;
				c.col1s = this.col1s;
				c.col0t = this.col0t;
				c.col1t = this.col1t
			} else {
				c.col0s = this.col1s;
				c.col1s = this.col1s;
				c.col0t = this.col1t;
				c.col1t = this.col1t
			}
			c.flags |= this.flags & (16 + 32 + 64)
		}
		if (this.elshowatend) {
			c.elshowatend = this.elshowatend;
			this.elshowatend = null;
			c.special = true;
			if (this.postVisibility || this.postVisibility == "") {
				c.postVisibility = this.postVisibility
			}
			if (this.postOpacity || this.postOpacity == 0
					|| this.postOpacity == "") {
				c.postOpacity = this.postOpacity
			}
		}
		return (c)
	};
	this.clone = function() {
		return new this.taccglAnimClone(this)
	};
	this.taccglAnimClone = function(b) {
		this.el = b.el;
		this.x = b.x;
		this.y = b.y;
		this.w = b.w;
		this.h = b.h;
		this.x0 = b.x0;
		this.y0 = b.y0;
		this.z0 = b.z0;
		this.s0 = b.s0;
		this.t0 = b.t0;
		this.wx0 = b.wx0;
		this.wy0 = b.wy0;
		this.wz0 = b.wz0;
		this.hx0 = b.hx0;
		this.hy0 = b.hy0;
		this.hz0 = b.hz0;
		this.dx0 = b.dx0;
		this.dy0 = b.dy0;
		this.dz0 = b.dz0;
		this.ws0 = b.ws0;
		this.ht0 = b.ht0;
		this.x1 = b.x1;
		this.y1 = b.y1;
		this.z1 = b.z1;
		this.s1 = b.s1;
		this.t1 = b.t1;
		this.wx1 = b.wx1;
		this.wy1 = b.wy1;
		this.wz1 = b.wz1;
		this.hx1 = b.hx1;
		this.hy1 = b.hy1;
		this.hz1 = b.hz1;
		this.dx1 = b.dx1;
		this.dy1 = b.dy1;
		this.dz1 = b.dz1;
		this.ws1 = b.ws1;
		this.ht1 = b.ht1;
		this.rotation = b.rotation;
		this.flags = b.flags;
		this.basetime = b.basetime;
		this.vduration = b.vduration;
		this.isforeground = b.isforeground;
		this.elshowatend = b.elshowatend;
		this.doacceleration = b.doacceleration;
		this.dotexmove = b.dotexmove;
		this.docolor = b.docolor;
		this.p = b.p;
		this.lightSpecular = b.lightSpecular;
		this.lightShininess = b.lightShininess;
		if (this.doacceleration) {
			this.ax = b.ax;
			this.ay = b.ay;
			this.az = b.az
		}
		if (this.rotation) {
			this.rotpx = b.rotpx;
			this.rotpy = b.rotpy;
			this.rotpz = b.rotpz;
			this.rotax = b.rotax;
			this.rotay = b.rotay;
			this.rotaz = b.rotaz;
			this.rotfrom = b.rotfrom;
			this.rotto = b.rotto
		}
		if (this.docolor) {
			this.mix1 = b.mix1;
			this.mix0 = b.mix0;
			this.mixs0 = b.mixs0;
			this.mixs1 = b.mixs1;
			this.col0s = b.col0s;
			this.col0t = b.col0t;
			this.col1s = b.col1s;
			this.col1t = b.col1t
		}
		if (b.attime || b.attime == 0) {
			this.attime = b.attime;
			taccgl.newDoat(this)
		}
	}
}
function taccglFlexiBorderPrototype(a) {
	this.initSuper = taccgl.taccglAnim.prototype.init;
	this.init = function(b) {
		this.initSuper(b);
		this.vnparts = 100;
		this.vtest2 = false
	};
	this.nparts = function(b) {
		this.vnparts = b;
		return this
	};
	this.startH = function() {
		var e = taccgl, d = this.vnparts, f, g, k, b, h, l, c;
		for (f = 0; f <= d; f++) {
			if (this.vtest2 && f % 2 == 1) {
				continue
			}
			if (f < d) {
				this.borderFun1(this.x1 + this.wx1 / d * f, this.y1 + this.wy1
						/ d * f, this.z1 + this.wz1 / d * f, f / d, 0);
				g = this.resx;
				b = this.resy;
				k = this.resz;
				this.borderFun0(this.x0 + this.wx0 / d * f, this.y0 + this.wy0
						/ d * f, this.z0 + this.wz0 / d * f, f / d, 0);
				h = this.resx;
				c = this.resy;
				l = this.resz;
				e.nvertMove(h, c, l, g, b, k, 0, 0, 0, 0, this.s0 + this.ws0
						/ d * f, this.t0, this.flags, this.basetime,
						this.vduration);
				this.borderFun1(this.x1 + this.wx1 / d * f + this.hx1, this.y1
						+ this.wy1 / d * f + this.hy1, this.z1 + this.wz1 / d
						* f + this.hz1, f / d, 1);
				g = this.resx;
				b = this.resy;
				k = this.resz;
				this.borderFun0(this.x0 + this.wx0 / d * f + this.hx0, this.y0
						+ this.wy0 / d * f + this.hy0, this.z0 + this.wz0 / d
						* f + this.hz0, f / d, 1);
				h = this.resx;
				c = this.resy;
				l = this.resz;
				e.nvertMove(h, c, l, g, b, k, 0, 0, 0, 0, this.s0 + this.ws0
						/ d * f, this.t0 + this.ht0, this.flags, this.basetime,
						this.vduration);
				f++;
				this.borderFun1(this.x1 + this.wx1 / d * f, this.y1 + this.wy1
						/ d * f, this.z1 + this.wz1 / d * f, f / d, 0);
				g = this.resx;
				b = this.resy;
				k = this.resz;
				this.borderFun0(this.x0 + this.wx0 / d * f, this.y0 + this.wy0
						/ d * f, this.z0 + this.wz0 / d * f, f / d, 0);
				h = this.resx;
				c = this.resy;
				l = this.resz;
				e.nvertMove(h, c, l, g, b, k, 0, 0, 0, 0, this.s0 + this.ws0
						/ d * f, this.t0, this.flags, this.basetime,
						this.vduration);
				f--;
				this.startFixNormal();
				this.borderFun1(this.x1 + this.wx1 / d * f + this.hx1, this.y1
						+ this.wy1 / d * f + this.hy1, this.z1 + this.wz1 / d
						* f + this.hz1, f / d, 1);
				g = this.resx;
				b = this.resy;
				k = this.resz;
				this.borderFun0(this.x0 + this.wx0 / d * f + this.hx0, this.y0
						+ this.wy0 / d * f + this.hy0, this.z0 + this.wz0 / d
						* f + this.hz0, f / d, 1);
				h = this.resx;
				c = this.resy;
				l = this.resz;
				e.nvertMove(h, c, l, g, b, k, 0, 0, 0, 0, this.s0 + this.ws0
						/ d * f, this.t0 + this.ht0, this.flags, this.basetime,
						this.vduration);
				f++;
				this.borderFun1(this.x1 + this.wx1 / d * f + this.hx1, this.y1
						+ this.wy1 / d * f + this.hy1, this.z1 + this.wz1 / d
						* f + this.hz1, f / d, 1);
				g = this.resx;
				b = this.resy;
				k = this.resz;
				this.borderFun0(this.x0 + this.wx0 / d * f + this.hx0, this.y0
						+ this.wy0 / d * f + this.hy0, this.z0 + this.wz0 / d
						* f + this.hz0, f / d, 1);
				h = this.resx;
				c = this.resy;
				l = this.resz;
				e.nvertMove(h, c, l, g, b, k, 0, 0, 0, 0, this.s0 + this.ws0
						/ d * f, this.t0 + this.ht0, this.flags, this.basetime,
						this.vduration);
				f--;
				f++;
				this.borderFun1(this.x1 + this.wx1 / d * f, this.y1 + this.wy1
						/ d * f, this.z1 + this.wz1 / d * f, f / d, 0);
				g = this.resx;
				b = this.resy;
				k = this.resz;
				this.borderFun0(this.x0 + this.wx0 / d * f, this.y0 + this.wy0
						/ d * f, this.z0 + this.wz0 / d * f, f / d, 0);
				h = this.resx;
				c = this.resy;
				l = this.resz;
				e.nvertMove(h, c, l, g, b, k, 0, 0, 0, 0, this.s0 + this.ws0
						/ d * f, this.t0, this.flags, this.basetime,
						this.vduration);
				f--;
				this.startFixNormal();
				this.startRest()
			}
		}
	};
	this.startC = function() {
		var E = taccgl, B = this.vnparts, h = this.x0 + this.wx0 / 2, q = this.y0
				+ this.hy0 / 2, I = this.z0, g = this.x1 + this.wx1 / 2, m = this.y1
				+ this.hy1 / 2, H = this.z1, A = this.s0 + this.ws0 * 0.5, x = this.t0
				+ this.ht0 * 0.5, F, v, u, r, G, f, o, N, M, J, l, z, P, C, y, b, O;
		for (F = 0; F <= B; F++) {
			var D = Math.PI * 2 * F / B, t = Math.sin(D), L = Math.cos(D), p = 1, e, d;
			G = g + (L * p * this.wx1);
			f = m + (t * p * this.hy1);
			o = this.z1;
			e = L;
			d = t;
			if (t <= -0.5) {
				f = m - this.hy1 * 0.5;
				G = g - 0.5 * this.wx1 * L / t;
				d = 0;
				e = 0.5 - 0.5 * L / t
			}
			if (t >= 0.5) {
				f = m + this.hy1 * 0.5;
				G = g + 0.5 * this.wx1 * L / t;
				d = 1;
				e = 0.5 + 0.5 * L / t
			}
			if (G > g + this.wx1 / 2) {
				G = g + this.wx1 / 2;
				f = m + 0.5 * this.hy1 * t / L;
				e = 1;
				d = 0.5 + 0.5 * t / L
			}
			if (G < g - this.wx1 / 2) {
				G = g - this.wx1 / 2;
				f = m - 0.5 * this.hy1 * t / L;
				e = 0;
				d = 0.5 - 0.5 * t / L
			}
			this.borderFun1(G, f, o, e, d);
			G = this.resx;
			f = this.resy;
			o = this.resz;
			var K = h + L * this.wx0, k;
			e = L;
			d = t;
			if (t <= -0.5) {
				k = q - this.hy0 * 0.5;
				K = h - 0.5 * this.wx0 * L / t;
				d = 0;
				e = 0.5 - 0.5 * L / t
			}
			if (t >= 0.5) {
				k = q + this.hy0 * 0.5;
				K = h + 0.5 * this.wx0 * L / t;
				d = 1;
				e = 0.5 + 0.5 * L / t
			}
			if (K < h - this.wx0 * 0.5) {
				K = h - this.wx0 * 0.5;
				k = q - 0.5 * this.hy0 * t / L;
				e = 1;
				d = 0.5 + 0.5 * t / L
			}
			if (K > h + this.wx0 * 0.5) {
				K = h + this.wx0 * 0.5;
				k = q + 0.5 * this.hy0 * t / L;
				e = 0;
				d = 0.5 - 0.5 * t / L
			}
			v = K;
			u = k;
			r = this.z0;
			this.borderFun0(v, u, r, e, d);
			v = this.resx;
			u = this.resy;
			r = this.resz;
			C = A + L * this.ws0;
			if (t <= -0.5) {
				y = x - this.ht0 * 0.5;
				C = A - 0.5 * this.ws0 * L / t
			}
			if (t >= 0.5) {
				y = x + this.ht0 * 0.5;
				C = A + 0.5 * this.ws0 * L / t
			}
			if (C < A - this.ws0 * 0.5) {
				C = A - this.ws0 * 0.5;
				y = x - 0.5 * this.ht0 * t / L
			}
			if (C > A + this.ws0 * 0.5) {
				C = A + this.ws0 * 0.5;
				y = x + 0.5 * this.ht0 * t / L
			}
			if (F > 0 && (!this.vtest2 || (F % 2 != 1))) {
				E.nvertMove(N, M, J, l, z, P, 0, 0, 0, 0, b, O, this.flags,
						this.basetime, this.vduration);
				E.nvertMove(v, u, r, G, f, o, 0, 0, 0, 0, C, y, this.flags,
						this.basetime, this.vduration);
				E.nvertMove(h, q, I, g, m, H, 0, 0, 0, 0, this.s0 + this.ws0
						/ 2, this.t0 + this.ht0 / 2, this.flags, this.basetime,
						this.vduration);
				this.startFixNormal();
				this.startRestTriangle()
			}
			N = v;
			M = u;
			J = r;
			l = G;
			z = f;
			P = o;
			b = C;
			O = y
		}
		return this
	};
	this.renderFun = this.startH;
	this.start = function() {
		if (taccgl.dddmode) {
			if (this.special) {
				this.startSpecial()
			}
			var c = null, b = taccgl;
			if (this.astepdelno == b.delno) {
				c = b.vertI;
				b.vertI = this.vertindex
			} else {
				this.vertindex = b.vertI;
				this.astepdelno = b.delno
			}
			this.renderFun();
			this.vertEndIndex = b.vertI;
			if (c) {
				b.vertI = c
			}
			if (this.p != b.stdsc) {
				b.setShader(b.stdsc)
			}
		} else {
			this.ddstart()
		}
		return this
	};
	this.horizontal = function() {
		this.renderFun = this.startH;
		return this
	};
	this.vertical = function() {
		this.renderFun = this.startV;
		return this
	};
	this.circular = function() {
		this.renderFun = this.startC;
		return this
	};
	this.test2 = function() {
		this.vtest2 = true;
		return this
	};
	this.borderRect = function(b, d, c) {
		this.resx = b;
		this.resy = d;
		this.resz = c
	};
	this.borderRelRect0 = function(b, f, e, d, c) {
		this.resx = this.x0 + this.wx0 * d + this.hx0 * c;
		this.resy = this.y0 + this.wy0 * d + this.hy0 * c;
		this.resz = this.z0 + this.wz0 * d + this.hz0 * c
	};
	this.borderRelRect1 = function(b, f, e, d, c) {
		this.resx = this.x1 + this.wx1 * d + this.hx1 * c;
		this.resy = this.y1 + this.wy1 * d + this.hy1 * c;
		this.resz = this.z1 + this.wz1 * d + this.hz1 * c
	};
	this.borderCircle1 = function(j, i, h) {
		var l = this.x1 + this.wx1 * 0.5, k = this.y1 + this.hy1 * 0.5, g = j
				- l, f = i - k, c = g, b = Math.sqrt(this.hy1 * this.hy1 * 0.25
				- this.hy1 * this.hy1 / this.wx1 / this.wx1 * g * g);
		if (f < 0) {
			b = -b
		}
		if (isNaN(b)) {
			b = 0
		}
		this.resx = l + c;
		this.resy = k + b;
		this.resz = this.z1
	};
	this.borderCircle0 = function(j, i, h) {
		var l = this.x0 + this.wx0 * 0.5, k = this.y0 + this.hy0 * 0.5, g = j
				- l, f = i - k, c = g, b = Math.sqrt(this.hy0 * this.hy0 * 0.25
				- this.hy0 * this.hy0 / this.wx0 / this.wx0 * g * g);
		if (isNaN(b)) {
			b = 0
		}
		if (f < 0) {
			b = -b
		}
		this.resx = l + c;
		this.resy = k + b;
		this.resz = this.z0
	};
	this.borderResize = function(j, i, h) {
		var l = this.x1 + this.wx1 * 0.5, k = this.y1 + this.hy1 * 0.5, g = j
				- l, f = i - k, c = g + 0.01 * f * f, b = f + 0.001 * g * g;
		this.resx = l + c;
		this.resy = k + b;
		this.resz = this.z1
	};
	this.borderWave0 = function(l, k, j) {
		var n = this.x0 + this.wx0 * 0.5, m = this.y0 + this.hy0 * 0.5, i = l
				- n, h = k - m, b = (l - this.x0) / this.wx0, g = this.wavefv0
				* (1 - b) + this.wavetv0 * b, c, f;
		if (h > 0) {
			c = h + Math.sin(g) * this.ampb0
		} else {
			c = h + Math.sin(g) * this.ampt0
		}
		b = (k - this.y0) / this.hy0, g = this.wavefh0 * (1 - b) + this.waveth0
				* b;
		if (i > 0) {
			f = i + Math.sin(g) * this.ampl0
		} else {
			f = i + Math.sin(g) * this.ampr0
		}
		this.resx = n + f;
		this.resy = m + c;
		this.resz = j
	};
	this.borderWave1 = function(l, k, j) {
		var n = this.x1 + this.wx1 * 0.5, m = this.y1 + this.hy1 * 0.5, i = l
				- n, h = k - m, b = (l - this.x1) / this.wx1, g = this.wavefv1
				* (1 - b) + this.wavetv1 * b, c, f;
		if (h > 0) {
			c = h + Math.sin(g) * this.ampb1
		} else {
			c = h + Math.sin(g) * this.ampt1
		}
		b = (k - this.y1) / this.hy1, g = this.wavefh1 * (1 - b) + this.waveth1
				* b;
		if (i > 0) {
			f = i + Math.sin(g) * this.ampl1
		} else {
			f = i + Math.sin(g) * this.ampr1
		}
		this.resx = n + f;
		this.resy = m + c;
		this.resz = j
	};
	this.borderZWave0 = function(j, i, h) {
		var l = this.x0 + this.wx0 * 0.5, k = this.y0 + this.hy0 * 0.5, g = j
				- l, f = i - k, b = (j - this.x0) / this.wx0, c = this.wavefv0
				* (1 - b) + this.wavetv0 * b;
		if (f > 0) {
			h = h + Math.sin(c) * this.ampb0
		} else {
			h = h + Math.sin(c) * this.ampt0
		}
		b = (i - this.y0) / this.hy0, c = this.wavefh0 * (1 - b) + this.waveth0
				* b;
		if (g > 0) {
			h = h + Math.sin(c) * this.ampl0
		} else {
			h = h + Math.sin(c) * this.ampr0
		}
		this.resx = j;
		this.resy = i;
		this.resz = h
	};
	this.borderZWave1 = function(j, i, h) {
		var l = this.x1 + this.wx1 * 0.5, k = this.y1 + this.hy1 * 0.5, g = j
				- l, f = i - k, b = (j - this.x1) / this.wx1, c = this.wavefv1
				* (1 - b) + this.wavetv1 * b;
		if (f > 0) {
			h = h + Math.sin(c) * this.ampb1
		} else {
			h = h + Math.sin(c) * this.ampt1
		}
		b = (i - this.y1) / this.hy1, c = this.wavefh1 * (1 - b) + this.waveth1
				* b;
		if (g > 0) {
			h = h + Math.sin(c) * this.ampl1
		} else {
			h = h + Math.sin(c) * this.ampr1
		}
		this.resx = j;
		this.resy = i;
		this.resz = h
	};
	this.borderFlip1x = function(b, h, g) {
		var d;
		if (h < this.y1 + 0.5 * this.hy1) {
			d = this.flipt1
		} else {
			d = this.flipb1
		}
		var c = this.x1 + this.wx1 * d;
		if (b < c) {
			this.resx = b;
			this.resy = h;
			this.resz = g;
			return
		}
		var e = (b - c) / (this.wx1 * (1 - d));
		b = c + Math.cos(Math.PI * (1 - e) * 0.5) * ((1 - d) * this.wx1)
				/ Math.PI * 2;
		g += (-1 + Math.sin(Math.PI * (1 - e) * 0.5)) * ((1 - d) * 1000)
				/ Math.PI * 2;
		this.resx = b;
		this.resy = h;
		this.resz = g
	};
	this.borderFlip1 = function(s, r, o) {
		var m, c, b;
		if (r < this.y1 + 0.5 * this.hy1) {
			m = this.flipt1
		} else {
			m = this.flipb1
		}
		var j = this.x1 + this.wx1 * m, i = this.y1 + this.wy1 * m, d = this.z1
				+ this.wz1 * m;
		if (r > this.y1 + 0.5 * this.hy1) {
			j += this.hx1;
			i += this.hy1;
			d += this.hz1
		}
		if (this.wx1 > this.wy1 && this.wx1 > this.wz1) {
			b = (s - this.x1) / (this.wx1)
		} else {
			if (this.wy1 > this.wx1 && this.wy1 > this.wz1) {
				b = (r - this.y1) / (this.wy1)
			} else {
				b = (o - this.x1) / (this.wz1)
			}
		}
		if (b < m) {
			this.resx = s;
			this.resy = r;
			this.resz = o;
			return
		}
		c = (b - m) / (1 - m);
		var n = Math.sqrt(this.wx1 * this.wx1 + this.wy1 * this.wy1 + this.wz1
				* this.wz1)
				* (1 - m), l = Math.cos(Math.PI * (1 - c) * 0.5) * (1 - m)
				/ Math.PI * 2, k = (-1 + Math.sin(Math.PI * (1 - c) * 0.5)) * n
				/ Math.PI * 2;
		s = j + l * this.wx1 + k * this.dx1;
		r = i + l * this.wy1 + k * this.dy1;
		o = d + l * this.wz1 + k * this.dz1;
		this.resx = s;
		this.resy = r;
		this.resz = o
	};
	this.borderFlip0 = function(s, r, o) {
		var m, c, b;
		if (r < this.y0 + 0.5 * this.hy0) {
			m = this.flipt0
		} else {
			m = this.flipb0
		}
		var j = this.x0 + this.wx0 * m, i = this.y0 + this.wy0 * m, d = this.z0
				+ this.wz0 * m;
		if (r > this.y0 + 0.5 * this.hy0) {
			j += this.hx0;
			i += this.hy0;
			d += this.hz0
		}
		if (this.wx0 > this.wy0 && this.wx0 > this.wz0) {
			b = (s - this.x0) / (this.wx0)
		} else {
			if (this.wy0 > this.wx0 && this.wy0 > this.wz0) {
				b = (r - this.y0) / (this.wy0)
			} else {
				b = (o - this.x0) / (this.wz0)
			}
		}
		if (b < m) {
			this.resx = s;
			this.resy = r;
			this.resz = o;
			return
		}
		c = (b - m) / (1 - m);
		var n = Math.sqrt(this.wx0 * this.wx0 + this.wy0 * this.wy0 + this.wz0
				* this.wz0)
				* (1 - m), l = Math.cos(Math.PI * (1 - c) * 0.5) * (1 - m)
				/ Math.PI * 2, k = (-1 + Math.sin(Math.PI * (1 - c) * 0.5)) * n
				/ Math.PI * 2;
		s = j + l * this.wx0 + k * this.dx0;
		r = i + l * this.wy0 + k * this.dy0;
		o = d + l * this.wz0 + k * this.dz0;
		this.resx = s;
		this.resy = r;
		this.resz = o
	};
	this.Flip = function(c, b) {
		this.flipt1 = c;
		this.flipb1 = b;
		this.flipt0 = c;
		this.flipb0 = b;
		this.borderFun1 = this.borderFlip1;
		this.borderFun0 = this.borderFlip0;
		return this
	};
	this.Flip1 = function(c, b) {
		this.flipt1 = c;
		this.flipb1 = b;
		this.borderFun1 = this.borderFlip1;
		return this
	};
	this.borderFun1 = this.borderRect;
	this.borderFun0 = this.borderRect;
	this.Circle = function() {
		this.borderFun0 = this.borderCircle0;
		this.borderFun1 = this.borderCircle1;
		return this
	};
	this.Circle1 = function() {
		this.borderFun1 = this.borderCircle1;
		return this
	};
	this.Rect = function() {
		this.borderFun0 = this.borderRect;
		this.borderFun1 = this.borderRect;
		return this
	};
	this.Rect1 = function() {
		this.borderFun1 = this.borderRect;
		return this
	};
	this.RelRect = function() {
		this.borderFun0 = this.borderRelRect0;
		this.borderFun1 = this.borderRelRect1;
		return this
	};
	this.RelRect1 = function() {
		this.borderFun1 = this.borderRelRect1;
		return this
	};
	this.Wave = function(g, d, h, c, e, i, b, f) {
		this.Wave1(g, d, h, c, e, i, b, f);
		if (g + "" == "undefined") {
			g = this.ht1 / 2
		}
		if (d + "" == "undefined") {
			d = this.ht1 / 2
		}
		if (e + "" == "undefined") {
			e = 0
		}
		if (i + "" == "undefined") {
			i = 0
		}
		if (c + "" == "undefined") {
			c = Math.PI * 2
		}
		if (!h) {
			h = 0
		}
		if (f + "" == "undefined") {
			f = Math.PI * 2
		}
		if (!b) {
			b = 0
		}
		this.ampt0 = g;
		this.ampb0 = d;
		this.ampl0 = e;
		this.ampr0 = i;
		this.wavefh0 = b;
		this.waveth0 = f;
		this.wavefv0 = h;
		this.wavetv0 = c;
		this.borderFun0 = this.borderWave0;
		return this
	};
	this.Wave1 = function(g, d, h, c, e, i, b, f) {
		if (g + "" == "undefined") {
			g = this.ht1 / 2
		}
		if (d + "" == "undefined") {
			d = this.ht1 / 2
		}
		if (e + "" == "undefined") {
			e = 0
		}
		if (i + "" == "undefined") {
			i = 0
		}
		if (c + "" == "undefined") {
			c = Math.PI * 2
		}
		if (!h) {
			h = 0
		}
		if (f + "" == "undefined") {
			f = Math.PI * 2
		}
		if (!b) {
			b = 0
		}
		this.ampt1 = g;
		this.ampb1 = d;
		this.ampl1 = e;
		this.ampr1 = i;
		this.wavefh1 = b;
		this.waveth1 = f;
		this.wavefv1 = h;
		this.wavetv1 = c;
		this.borderFun1 = this.borderWave1;
		return this
	};
	this.ZWave = function(g, d, h, c, e, i, b, f) {
		this.ZWave1(g, d, h, c, e, i, b, f);
		if (g + "" == "undefined") {
			g = this.ht1 / 2
		}
		if (d + "" == "undefined") {
			d = this.ht1 / 2
		}
		if (e + "" == "undefined") {
			e = 0
		}
		if (i + "" == "undefined") {
			i = 0
		}
		if (c + "" == "undefined") {
			c = Math.PI * 2
		}
		if (!h) {
			h = 0
		}
		if (f + "" == "undefined") {
			f = Math.PI * 2
		}
		if (!b) {
			b = 0
		}
		this.ampt0 = g;
		this.ampb0 = d;
		this.ampl0 = e;
		this.ampr0 = i;
		this.wavefh0 = b;
		this.waveth0 = f;
		this.wavefv0 = h;
		this.wavetv0 = c;
		this.borderFun0 = this.borderZWave0;
		return this
	};
	this.ZWave1 = function(g, d, h, c, e, i, b, f) {
		if (g + "" == "undefined") {
			g = this.ht1 / 2
		}
		if (d + "" == "undefined") {
			d = this.ht1 / 2
		}
		if (e + "" == "undefined") {
			e = 0
		}
		if (i + "" == "undefined") {
			i = 0
		}
		if (c + "" == "undefined") {
			c = Math.PI * 2
		}
		if (!h) {
			h = 0
		}
		if (f + "" == "undefined") {
			f = Math.PI * 2
		}
		if (!b) {
			b = 0
		}
		this.ampt1 = g;
		this.ampb1 = d;
		this.ampl1 = e;
		this.ampr1 = i;
		this.wavefh1 = b;
		this.waveth1 = f;
		this.wavefv1 = h;
		this.wavetv1 = c;
		this.borderFun1 = this.borderZWave1;
		return this
	};
	this.cont = function(b) {
		var d = b;
		if (!b) {
			d = this.el
		}
		var c = new taccgl.flexiBorder(d);
		if (this.elshowatend) {
			this.contShiftAtEndAction(c)
		}
		this.contIntern(c, b);
		c.nparts(this.vnparts);
		c.renderFun = this.renderFun;
		c.vtest2 = this.vtest2;
		if (this.borderFun1 == this.borderCircle1) {
			c.Circle()
		} else {
			if (this.borderFun1 == this.borderWave1) {
				c.Wave(this.ampt1, this.ampb1, this.wavefv1, this.wavetv1,
						this.ampl1, this.ampr1, this.wavefh1, this.waveth1)
			} else {
				if (this.borderFun1 == this.borderZWave1) {
					c.ZWave(this.ampt1, this.ampb1, this.wavefv1, this.wavetv1,
							this.ampl1, this.ampr1, this.wavefh1, this.waveth1)
				} else {
					if (this.borderFun1 == this.borderFlip1) {
						c.Flip(this.flipt1, this.flipb1)
					}
				}
			}
		}
		return (c)
	};
	this.clone = function(b) {
		return new this.taccglFlexiBorderClone(this)
	};
	this.taccglFlexiBorderClone = function(b) {
		this.taccglAnimClone(b);
		this.vnparts = b.vnparts;
		this.vtest2 = b.vtest2;
		this.renderFun = b.renderFun;
		this.borderFun1 = b.borderFun1;
		this.borderFun0 = b.borderFun0;
		if (this.borderFun1 == this.borderWave1
				|| this.borderFun1 == this.borderZWave1) {
			this.ampt1 = b.ampt1;
			this.ampb1 = b.ampb1;
			this.wavefv1 = b.wavefv1;
			this.wavetv1 = b.wavetv1;
			this.ampl1 = b.ampl1;
			this.ampr1 = b.ampr1;
			this.wavefh1 = b.wavefh1;
			this.waveth1 = b.waveth1
		} else {
			if (this.borderFun1 == this.borderFlip1) {
				this.flipt1 = b.flipt1;
				this.flipb1 = b.flipb1
			}
		}
		if (this.borderFun0 == this.borderWave0
				|| this.borderFun0 == this.borderZWave0) {
			this.ampt0 = b.ampt0;
			this.ampb0 = b.ampb0;
			this.wavefv0 = b.wavefv0;
			this.wavetv0 = b.wavetv0;
			this.ampl0 = b.ampl0;
			this.ampr0 = b.ampr0;
			this.wavefh0 = b.wavefh0;
			this.waveth0 = b.waveth0
		} else {
			if (this.borderFun0 == this.borderFlip0) {
				this.flipt0 = b.flipt0;
				this.flipb0 = b.flipb0
			}
		}
	}
}
taccglFlexiBorderPrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.flexiBorder.prototype = new taccglFlexiBorderPrototype();
taccgl.flexiBorder.prototype.taccglFlexiBorderClone.prototype = taccgl.flexiBorder.prototype;
function taccglMultiFacePrototype(a) {
	this.initSuper = taccgl.taccglAnim.prototype.init;
	this.init = function(b) {
		this.face = Array(0);
		this.initSuper(b)
	};
	this.createFace = function(c, f, i, l, m, d, g, j, k, b, e, h) {
		this.xtl = c;
		this.ytl = f;
		this.ztl = i;
		this.xtr = l;
		this.ytr = m;
		this.ztr = d;
		this.xbl = g;
		this.ybl = j;
		this.zbl = k;
		this.xbr = b;
		this.ybr = e;
		this.zbr = h
	};
	this.newFace = function(c, g, j, n, o, d, h, k, m, b, e, i) {
		var l = new this.createFace(c, g, j, n, o, d, h, k, m, b, e, i);
		if (!this.dotexmove) {
			this.s1 = this.s0;
			this.ws1 = this.ws0;
			this.t1 = this.t0;
			this.ht1 = this.ht0
		}
		l.flags = this.flags;
		l.s0 = this.s0;
		l.t0 = this.t0;
		l.ws0 = this.ws0;
		l.ht0 = this.ht0;
		l.s1 = this.s1;
		l.t1 = this.t1;
		l.ws1 = this.ws1;
		l.ht1 = this.ht1;
		l.docolor = this.docolor;
		if (this.docolor) {
			l.ddcolor0 = this.ddcolor0;
			l.ddcolor1 = this.ddcolor1;
			l.mix0 = this.mix0;
			l.mix1 = this.mix1;
			l.mixs0 = this.mixs0;
			l.mixs1 = this.mixs1
		}
		l.lightSpecular = taccgl.lightSpecular;
		l.lightShininess = taccgl.lightShininess;
		this.face.push(l);
		this.selFace(this.face.length - 1);
		return l
	};
	this.cloneFaces = function(c) {
		var e, b, d;
		for (b = 0; b < this.face.length; b++) {
			e = this.face[b], d = c.newFace(e.xtl, e.ytl, e.ztl, e.xtr, e.ytr,
					e.ztr, e.xbl, e.ybl, e.zbl, e.xbr, e.ybr, e.zbr);
			d.s0 = e.s0;
			d.t0 = e.t0;
			d.ws0 = e.ws0;
			d.ht0 = e.ht0;
			d.s1 = e.s1;
			d.t1 = e.t1;
			d.ws1 = e.ws1;
			d.ht1 = e.ht1;
			d.flags = e.flags;
			d.docolor = e.docolor;
			if (e.docolor) {
				d.ddcolor0 = e.ddcolor0;
				d.ddcolor1 = e.ddcolor1;
				d.mix0 = e.mix0;
				d.mix1 = e.mix1;
				d.mixs0 = e.mixs0;
				d.mixs1 = e.mixs1;
				d.col0s = e.col0s;
				d.col0t = e.col0t;
				d.col1s = e.col1s;
				d.col1t = e.col1t
			}
		}
	};
	this.selFace = function(b) {
		this.curface = this.face[b];
		this.curfacei = b;
		return this
	};
	this.blend = function(e, d, b, c) {
		if (!this.curface.docolor) {
			this.curface.col0s = this.curface.col0t = this.curface.col1s = this.curface.col1t = -128 * 256
		}
		this.curface.docolor = true;
		this.curface.flags |= 16;
		this.curface.mix0 = e;
		this.curface.mix1 = e;
		if (!d) {
			d = 0
		}
		this.curface.mixs0 = d;
		this.curface.mixs1 = d;
		if (typeof (b) == "number") {
			this.curface.mix1 = b
		}
		if (typeof (c) == "number") {
			this.curface.mixs1 = c
		}
		return this
	};
	this.color = function(k, f) {
		var j, i, h, d, e;
		if (!this.curface.docolor) {
			this.curface.mix1 = this.curface.mix0 = 1;
			this.curface.mixs0 = this.curface.mixs1 = 0
		}
		this.curface.docolor = true;
		this.curface.flags |= 16;
		this.flags &= ~32;
		this.flags &= ~64;
		this.curface.ddcolor0 = k;
		this.curface.ddcolor1 = k;
		if (f) {
			this.curface.ddcolor1 = f
		}
		if (k && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = k;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			j = taccgl.scratchc.getImageData(0, 0, 1, 1), i = j.data[0],
					h = j.data[1], d = j.data[2], e = j.data[3];
			this.curface.col1s = this.curface.col0s = i + 256 * (h - 128);
			this.curface.col1t = this.curface.col0t = e + 256 * (d - 128)
		}
		if (f && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = f;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			j = taccgl.scratchc.getImageData(0, 0, 1, 1), i = j.data[0],
					h = j.data[1], d = j.data[2], e = j.data[3];
			this.curface.col1s = i + 256 * (h - 128);
			this.curface.col1t = e + 256 * (d - 128)
		}
		return this
	};
	this.specLight = function(b, c) {
		this.curface.lightSpecular = b % 1;
		this.curface.lightShininess = Math.floor(c);
		return this
	};
	this.lightAmbDiff = function(e, b, d, c) {
		this.color(e, b);
		this.curface.ddcolor0 = b;
		this.curface.ddcolor1 = b;
		if (!d && d != 0) {
			d = 0
		}
		if (!c && c != 0) {
			c = 0
		}
		if (d > 1) {
			d = 1
		}
		if (c > 1) {
			c = 1
		}
		if (d < 0) {
			d = 0
		}
		if (c < 0) {
			c = 0
		}
		this.curface.col0t = Math.floor(this.curface.col0t / 256) * 256 + d
				* 255;
		this.curface.col1t = Math.floor(this.curface.col1t / 256) * 256 + c
				* 255;
		this.curface.flags |= 32;
		this.curface.flags &= ~64;
		return this
	};
	this.lightBgAmbDiff = function(j, m, l, f, e) {
		if (!this.curface.docolor) {
			this.mix1 = this.mix0 = 1;
			this.mixs0 = this.mixs1 = 0
		}
		this.curface.docolor = true;
		this.curface.flags |= 16 + 32 + 64;
		this.curface.ddcolor0 = j;
		this.curface.ddcolor1 = j;
		if (!f && f != 0) {
			f = 1
		}
		if (!e && e != 0) {
			e = 1
		}
		if (f > 1) {
			f = 1
		}
		if (e > 1) {
			e = 1
		}
		if (f < 0) {
			f = 0
		}
		if (e < 0) {
			e = 0
		}
		if (j && taccgl.scratchc) {
			taccgl.scratchc.fillStyle = j;
			taccgl.scratchc.clearRect(0, 0, 1, 1);
			taccgl.scratchc.fillRect(0, 0, 1, 1);
			var h = taccgl.scratchc.getImageData(0, 0, 1, 1), d = h.data[0], i = h.data[1], k = h.data[2];
			this.curface.col0s = d + 256 * (i - 128);
			this.curface.col0t = Math.floor(f * 255) + 256 * (k - 128)
		}
		if (m > 1) {
			m = 1
		}
		if (l > 1) {
			l = 1
		}
		if (m < 0) {
			m = 0
		}
		if (l < 0) {
			l = 0
		}
		m = Math.floor(m * 255);
		l = Math.floor(l * 255);
		this.curface.col1s = m + 256 * (l - 128);
		this.curface.col1t = Math.floor(e * 255);
		return this
	};
	this.map = function(e, c, b, d) {
		this.curface.s0 = e;
		this.curface.t0 = c;
		this.curface.ws0 = b;
		this.curface.ht0 = d;
		return this
	};
	this.map1 = function(e, c, b, d) {
		this.curface.dotexmove = true;
		this.curface.s1 = e;
		this.curface.t1 = c;
		this.curface.ws1 = b;
		this.curface.ht1 = d;
		return this
	};
	this.mapA = function() {
		this.curface.dotexmove = true;
		this.curface.s1 = this.curface.s0;
		this.curface.t1 = this.curface.t0;
		this.curface.ws1 = this.curface.ws0;
		this.curface.ht1 = this.curface.ht0;
		return this
	};
	this.mapMirrorY = function() {
		var b = this.curface.s0;
		this.curface.s0 = b + this.curface.ws0;
		this.curface.ws0 = -this.curface.ws0;
		return this
	};
	this.mapMirrorX = function() {
		var b = this.curface.t0;
		this.curface.t0 = b + this.curface.ht0;
		this.curface.ht0 = -this.curface.ht0;
		return this
	};
	this.mapRelative = function(e, c, b, d) {
		this.curface.s0 += e;
		this.curface.t0 += c;
		this.curface.ws0 = b;
		this.curface.ht0 = d;
		return this
	};
	this.mapClip = function(b, c, e, d) {
		if (d != "b" && d != "br") {
			if (c > this.curface.ht0) {
				c = this.curface.ht0
			}
		}
		if (d != "r" && d != "br") {
			if (b > this.curface.ws0) {
				b = this.curface.ws0
			}
		}
		if (e == "tl") {
		} else {
			if (e == "t") {
				b = this.curface.ws0
			} else {
				if (e == "tr") {
					this.curface.s0 += this.curface.ws0 - b
				} else {
					if (e == "l") {
						c = this.curface.ht0
					} else {
						if (e == "r") {
							this.s0 += this.curface.ws0 - b;
							c = this.curface.ht0
						} else {
							if (e == "bl") {
								this.curface.t0 += this.curface.ht0 - c
							} else {
								if (e == "b") {
									this.t0 += this.curface.ht0 - c;
									b = this.curface.ws0
								} else {
									if (e == "br") {
										this.curface.t0 += this.curface.ht0 - c;
										this.curface.s0 += this.curface.ws0 - b
									}
								}
							}
						}
					}
				}
			}
		}
		this.curface.ws0 = b;
		this.curface.ht0 = c;
		return this
	};
	this.restrict = function(b, f, c, e) {
		this.x0 = this.x1 = b;
		this.y0 = this.y1 = f;
		this.wx0 = this.wx1 = c;
		this.hy0 = this.hy1 = e;
		this.s0 = this.x0;
		this.t0 = this.y0;
		this.ws0 = this.wx0;
		this.ht0 = this.hy0;
		var d;
		for (d = 0; d < this.face.length; d++) {
			this.selFace(d);
			this.map(b, f, c, e)
		}
		return this
	};
	this.cont = function(b) {
		var d = b;
		if (!b) {
			d = this.el
		}
		var c = new taccgl.multiFace(d);
		if (this.elshowatend) {
			this.contShiftAtEndAction(c)
		}
		this.contIntern(c, b);
		this.cloneFaces(c);
		return (c)
	};
	this.startFace = function(o) {
		var g = taccgl, k, p = this.vduration + this.basetime;
		if (g.duration < p) {
			g.setDuration(p)
		}
		var r = this.wx0 * o.xbl + this.hx0 * o.ybl + this.dx0 * o.zbl
				- this.wx0 * o.xtl - this.hx0 * o.ytl - this.dx0 * o.ztl, l = this.wy0
				* o.xbl
				+ this.hy0
				* o.ybl
				+ this.dy0
				* o.zbl
				- this.wy0
				* o.xtl - this.hy0 * o.ytl - this.dy0 * o.ztl, c = this.wz0
				* o.xbl + this.hz0 * o.ybl + this.dz0 * o.zbl - this.wz0
				* o.xtl - this.hz0 * o.ytl - this.dz0 * o.ztl, b = this.wx0
				* o.xtr + this.hx0 * o.ytr + this.dx0 * o.ztr - this.wx0
				* o.xtl - this.hx0 * o.ytl - this.dx0 * o.ztl, q = this.wy0
				* o.xtr + this.hy0 * o.ytr + this.dy0 * o.ztr - this.wy0
				* o.xtl - this.hy0 * o.ytl - this.dy0 * o.ztl, d = this.wz0
				* o.xtr + this.hz0 * o.ytr + this.dz0 * o.ztr - this.wz0
				* o.xtl - this.hz0 * o.ytl - this.dz0 * o.ztl, n = l * d - c
				* q, m = c * b - r * d, h = r * q - l * b, s = this.lightSpecular
				+ this.lightShininess;
		g.nvertMove(this.x0 + this.wx0 * o.xtl + this.hx0 * o.ytl + this.dx0
				* o.ztl, this.y0 + this.wy0 * o.xtl + this.hy0 * o.ytl
				+ this.dy0 * o.ztl, this.z0 + this.wz0 * o.xtl + this.hz0
				* o.ytl + this.dz0 * o.ztl, this.x1 + this.wx1 * o.xtl
				+ this.hx1 * o.ytl + this.dx1 * o.ztl, this.y1 + this.wy1
				* o.xtl + this.hy1 * o.ytl + this.dy1 * o.ztl, this.z1
				+ this.wz1 * o.xtl + this.hz1 * o.ytl + this.dz1 * o.ztl, n, m,
				h, s, o.s0, o.t0, o.flags | this.flags, this.basetime,
				this.vduration);
		g.nvertMove(this.x0 + this.wx0 * o.xbl + this.hx0 * o.ybl + this.dx0
				* o.zbl, this.y0 + this.wy0 * o.xbl + this.hy0 * o.ybl
				+ this.dy0 * o.zbl, this.z0 + this.wz0 * o.xbl + this.hz0
				* o.ybl + this.dz0 * o.zbl, this.x1 + this.wx1 * o.xbl
				+ this.hx1 * o.ybl + this.dx1 * o.zbl, this.y1 + this.wy1
				* o.xbl + this.hy1 * o.ybl + this.dy1 * o.zbl, this.z1
				+ this.wz1 * o.xbl + this.hz1 * o.ybl + this.dz1 * o.zbl, n, m,
				h, s, o.s0, o.t0 + o.ht0, o.flags | this.flags, this.basetime,
				this.vduration);
		g.nvertMove(this.x0 + this.wx0 * o.xtr + this.hx0 * o.ytr + this.dx0
				* o.ztr, this.y0 + this.wy0 * o.xtr + this.hy0 * o.ytr
				+ this.dy0 * o.ztr, this.z0 + this.wz0 * o.xtr + this.hz0
				* o.ytr + this.dz0 * o.ztr, this.x1 + this.wx1 * o.xtr
				+ this.hx1 * o.ytr + this.dx1 * o.ztr, this.y1 + this.wy1
				* o.xtr + this.hy1 * o.ytr + this.dy1 * o.ztr, this.z1
				+ this.wz1 * o.xtr + this.hz1 * o.ytr + this.dz1 * o.ztr, n, m,
				h, s, o.s0 + o.ws0, o.t0, o.flags | this.flags, this.basetime,
				this.vduration);
		g.nvertMove(this.x0 + this.wx0 * o.xbr + this.hx0 * o.ybr + this.dx0
				* o.zbr, this.y0 + this.wy0 * o.xbr + this.hy0 * o.ybr
				+ this.dy0 * o.zbr, this.z0 + this.wz0 * o.xbr + this.hz0
				* o.ybr + this.dz0 * o.zbr, this.x1 + this.wx1 * o.xbr
				+ this.hx1 * o.ybr + this.dx1 * o.zbr, this.y1 + this.wy1
				* o.xbr + this.hy1 * o.ybr + this.dy1 * o.zbr, this.z1
				+ this.wz1 * o.xbr + this.hz1 * o.ybr + this.dz1 * o.zbr, n, m,
				h, s, o.s0 + o.ws0, o.t0 + o.ht0, o.flags | this.flags,
				this.basetime, this.vduration);
		g.nvertMove(this.x0 + this.wx0 * o.xtr + this.hx0 * o.ytr + this.dx0
				* o.ztr, this.y0 + this.wy0 * o.xtr + this.hy0 * o.ytr
				+ this.dy0 * o.ztr, this.z0 + this.wz0 * o.xtr + this.hz0
				* o.ytr + this.dz0 * o.ztr, this.x1 + this.wx1 * o.xtr
				+ this.hx1 * o.ytr + this.dx1 * o.ztr, this.y1 + this.wy1
				* o.xtr + this.hy1 * o.ytr + this.dy1 * o.ztr, this.z1
				+ this.wz1 * o.xtr + this.hz1 * o.ytr + this.dz1 * o.ztr, n, m,
				h, s, o.s0 + o.ws0, o.t0, o.flags | this.flags, this.basetime,
				this.vduration);
		g.nvertMove(this.x0 + this.wx0 * o.xbl + this.hx0 * o.ybl + this.dx0
				* o.zbl, this.y0 + this.wy0 * o.xbl + this.hy0 * o.ybl
				+ this.dy0 * o.zbl, this.z0 + this.wz0 * o.xbl + this.hz0
				* o.ybl + this.dz0 * o.zbl, this.x1 + this.wx1 * o.xbl
				+ this.hx1 * o.ybl + this.dx1 * o.zbl, this.y1 + this.wy1
				* o.xbl + this.hy1 * o.ybl + this.dy1 * o.zbl, this.z1
				+ this.wz1 * o.xbl + this.hz1 * o.ybl + this.dz1 * o.zbl, n, m,
				h, s, o.s0, o.t0 + o.ht0, o.flags | this.flags, this.basetime,
				this.vduration);
		if (this.rotation) {
			for (k = 1; k <= 6; k++) {
				g.nvertRot(this.rotpx, this.rotpy, this.rotpz, this.rotax,
						this.rotay, this.rotaz, this.rotfrom, this.rotto);
				g.nvertOffset(-1)
			}
			g.nvertOffset(6)
		}
		if (this.doacceleration) {
			for (k = 1; k <= 6; k++) {
				g.nvertAcceleration(this.ax, this.ay, this.az);
				g.nvertOffset(-1)
			}
			g.nvertOffset(6)
		}
		if (o.dotexmove) {
			g.nvertOffset(-5);
			g.nvertTexMove(o.s1, o.t1);
			g.nvertOffset(1);
			g.nvertTexMove(o.s1 + o.ws1, o.t1);
			g.nvertOffset(1);
			g.nvertTexMove(o.s1, o.t1 + o.ht1);
			g.nvertOffset(1);
			g.nvertTexMove(o.s1 + o.ws1, o.t1 + o.ht1);
			g.nvertOffset(1);
			g.nvertTexMove(o.s1, o.t1 + o.ht1);
			g.nvertOffset(1);
			g.nvertTexMove(o.s1 + o.ws1, o.t1)
		}
		if (o.docolor) {
			g.nvertColor6(o.col0s, o.col0t, o.col1s, o.col1t, o.mix0, o.mix1,
					o.mixs0, o.mixs1)
		}
		return this
	};
	this.start = function() {
		var b, d, c;
		if (!taccgl.dddmode) {
			this.ddstart();
			return this
		}
		var e = null;
		b = taccgl;
		if (this.astepdelno == b.delno) {
			e = b.vertI;
			b.vertI = this.vertindex
		} else {
			this.vertindex = b.vertI;
			this.astepdelno = b.delno
		}
		if (this.special) {
			this.startSpecial()
		}
		for (c = 0; c < this.face.length; c++) {
			d = this.face[c];
			this.startFace(d)
		}
		this.vertEndIndex = b.vertI;
		if (e) {
			b.vertI = e
		}
		if (this.p != b.stdsc) {
			b.setShader(b.stdsc)
		}
		return this
	};
	this.clone = function(b) {
		return new this.taccglMultiFaceClone(this)
	};
	this.taccglMultiFaceClone = function(b) {
		this.taccglAnimClone(b);
		this.face = Array(0);
		b.cloneFaces(this)
	}
}
taccglMultiFacePrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.multiFace.prototype = new taccglMultiFacePrototype();
taccgl.multiFace.prototype.taccglMultiFaceClone.prototype = taccgl.multiFace.prototype;
function taccglDddBoxPrototype(a) {
	this.initSuper2 = taccgl.multiFace.prototype.init;
	this.startSuper = taccgl.multiFace.prototype.start;
	this.init = function(b) {
		this.initSuper2(b);
		this.newFace(0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0);
		this.newFace(1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1);
		this.newFace(1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1);
		this.newFace(0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0);
		this.newFace(0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0);
		this.newFace(0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1);
		this.dx0 = this.dx1 = 0;
		this.dy0 = this.dy1 = 0;
		this.dz0 = this.dz1 = this.hy0
	};
	this.selFront = function() {
		return this.selFace(0)
	};
	this.selRight = function() {
		return this.selFace(1)
	};
	this.selBack = function() {
		return this.selFace(2)
	};
	this.selLeft = function() {
		return this.selFace(3)
	};
	this.selTop = function() {
		return this.selFace(4)
	};
	this.selBottom = function() {
		return this.selFace(5)
	};
	this.cont = function(b) {
		var d = b;
		if (!b) {
			d = this.el
		}
		var c = new taccglDddBoxSuper2(d);
		if (this.elshowatend) {
			this.contShiftAtEndAction(c)
		}
		this.contIntern(c, b);
		this.cloneFaces(c);
		return (c)
	};
	this.clone = function(b) {
		return new this.taccglDddBoxClone(this)
	};
	this.taccglDddBoxClone = function(b) {
		this.taccglMultiFaceClone(b)
	}
}
taccglDddBoxPrototype.prototype = taccgl.multiFace.prototype;
taccgl.dddBox.prototype = new taccglDddBoxPrototype();
taccglDddBoxSuper2 = function(a) {
	this.initSuper2(a)
};
taccglDddBoxSuper2.prototype = taccgl.dddBox.prototype;
taccgl.dddBox.prototype.taccglDddBoxClone.prototype = taccgl.dddBox.prototype;
function taccglShaderConfigPrototype() {
	var x = this;
	if (x) {
	}
	x.dummy = "\n";
	x.stdUniformsBg = function() {
		return "\nuniform   sampler2D uTexture;\nuniform   sampler2D uTexture2;\n"
	};
	x.stdUniformsEnd = function() {
		return "\n" + this.ins(this.genUniforms) + "\n"
				+ this.ins(this.genConsts) + "\n"
	};
	x.stdVertexUniforms = function() {
		return "\n"
				+ this.ins(this.stdUniformsBg)
				+ "\nuniform   float uTime;\n"
				+ ((!this.inShadow) ? (" \nuniform   vec4   cvp;\n") : "")
				+ "\n"
				+ ((this.inShadow) ? (" \nuniform   highp vec4   shcvp;\n")
						: "") + "\n" + ((this.sp.useTM) ? ("\n") : "") + "\n"
				+ this.ins(this.stdUniformsEnd) + " \n"
	};
	x.stdFragmentUniforms = function() {
		return "\n"
				+ this.ins(this.stdUniformsBg)
				+ "\n"
				+ ((this.inShadow || this.sp.showShadow) ? (" \nuniform   mediump vec4  fshcvp;\n")
						: "")
				+ "\n"
				+ ((this.sp.showShadow) ? ("\nuniform   sampler2D uShadowMap;\n")
						: "") + "\n" + this.ins(this.stdUniformsEnd) + " \n"
	};
	x.stdAttributes = function() {
		return "\nattribute vec4 pos;\nattribute vec4 origin;\nattribute vec4 texpos;\nattribute vec4 rotP;\nattribute vec4 accel;\nattribute vec4 rotA;\nattribute vec4 color;\nattribute vec4 texmix;\nattribute vec4 normal;\n"
	};
	x.stdVarying = function() {
		return "\nvarying   vec2 vtexpos;\nvarying   vec4 vAmbColor;\nvarying   vec4 vDiffColor;\nvarying   vec2 vmix;\nvarying   vec4 times;\n"
				+ ((this.sp.lightingPerVertex) ? ("\nvarying   vec3 vLight;\n")
						: "")
				+ "\n"
				+ ((this.sp.lightingPerFragment) ? ("\nvarying vec3 vnormal;\nvarying vec3 v3Dpos;\nvarying vec4 vLightingPar;\n")
						: "") + "\n"
	};
	x.DoRotation = function() {
		return "\nvec3 tnormal;\nvec4 \nDoRotation (vec4 p, float t)\n{\n   float from = rotP.w;\n   float to   = rotA.w; \n   float b    = mix (from,to,t); \n   vec3  q = vec3(p) - vec3(rotP);\n   float c = cos(b); float mc= (1.0-c);\n   float s = sin(b);\n   mat3 Mrot = mat3 (c+rotA.x*rotA.x*mc,            rotA.x*rotA.y*mc-rotA.z*s,    rotA.x*rotA.z*mc+rotA.y*s,\n                     rotA.x*rotA.y*mc+rotA.z*s,     c+rotA.y*rotA.y*mc,           rotA.y*rotA.z*mc-rotA.x*s,\n                     rotA.z*rotA.x*mc-rotA.y*s,     rotA.z*rotA.y*mc+rotA.x*s,    c+rotA.z*rotA.z*mc);\n   q = Mrot * q;\n   tnormal = Mrot * tnormal;\n   q=q+vec3(rotP);    return vec4( q.x, q.y, q.z, p.w);\n}\n"
	};
	x.stdVertexHead = function() {
		return "\nvoid main()\n{\n    vec4 a = vec4 (vec3(pos),1.0);  \n    flags = int(pos.w);\n    float basetime = times.s= origin.w;\n    float duration = times.t= accel.w;\n    mat4 pm;\n    float rt = times.p = (uTime-basetime)/duration;\n    float t  = times.q = clamp(rt,0.0,1.0);\n    tnormal = normal.xyz;\n"
	};
	x.stdVertexCondition = function() {
		return "\n  if (  (((flags/2)*2 == flags) && (rt<0.0)) || (((flags/4)*4 == (flags/2)*2)) && (rt>1.0)) {\n        gl_Position = vec4(0.0,0.0,0.0,1.0);\n  } else {\n"
	};
	x.stdVertexMotionAnimation = function() {
		return "\n    if (rotA.w!=0.0) {\n       vec4 ra = DoRotation (a,t);\n       a = vec4 ((mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel)-vec3(a)+vec3(ra)),1.0);\n    } else {\n       a = vec4 (mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel),1.0);       }\n"
				+ ((this.sp.useTM) ? ("\n    if ((flags/16)*16 != (flags/8)*8) {\n      a=uTM*a;\n      tnormal = uTM_1T * tnormal;\n    }\n")
						: "") + "\n"
	};
	x.stdVertex3DmappingEye = function() {
		return "\n    const float ex=" + this.ins(this.EYEX)
				+ ";     const float ey=" + this.ins(this.EYEY)
				+ ";     const float ez=" + this.ins(this.EYEZ) + ";\n"
	};
	x.stdVertex3DmappingBase = function() {
		return "\n    pm = mat4   (    cvp.p,                            0.0,                            0.0,    0.0,  \n                             0.0,                       -  cvp.q,                            0.0,    0.0,\n                        ((1.0+cvp.p*(cvp.s-ex))/ez),   ((-1.0+cvp.q*(ey-cvp.t))/ez),          0.0,   -1.0/ez,\n                         -cvp.p*cvp.s-1.0,              cvp.q*cvp.t+1.0,              ez/65536.0,    1.0);\n                     \n    vec4 pos; \n    pos = pm*a;\n    gl_Position = pos;\n"
	};
	x.stdVertexTexmix = function() {
		return "\n    vtexpos=mix (texpos.st,texpos.pq,t);\n    vtexpos=vec2(vtexpos.s/"
				+ this.ins(this.TEXTURECANVASWIDTH)
				+ ",vtexpos.t/"
				+ this.ins(this.TEXTURECANVASHEIGHT) + ");\n"
	};
	x.stdVertexLighting = function() {
		return "\n    if ((flags/32)*2 != (flags/16)) {\n       vec4 c0 = vec4( mod(color.s,256.0)/255.0 , (floor(color.s*(1.0/256.0))+128.0)*(1.0/255.0), \n                 (floor(color.t*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.t,256.0) *(1.0/255.0));\n       vec4 c1 = vec4( mod(color.p,256.0)/255.0 , (floor(color.p*(1.0/256.0))+128.0)*(1.0/255.0), \n                 (floor(color.q*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.q,256.0) *(1.0/255.0));\n       vec4 m = texmix;\n       if ((flags/64)*2 != (flags/32)) {\n"
				+ ((this.sp.lightingPerFragment) ? ("\n          if ((flags/128)*2 != (flags/64)) {\n             vDiffColor = vec4(c1.r,c1.g,0.0,0.0);\n               vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t);\n          } else {\n             vDiffColor = vec4(c1.rgb,1.0);\n             vAmbColor  = vec4(c0.rgb, mix(c0.w,c1.w,t));\n          }\n")
						: "")
				+ "\n       } else {\n"
				+ ((this.sp.lightingPerFragment) ? ("\n          vDiffColor = vec4 (uLightingPar.x, uLightingPar.y, 0.0, 0.0);\n")
						: "")
				+ "\n          vAmbColor  = mix (c0,c1,t);\n       }\n       vmix   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);\n    } else {\n       vAmbColor = vec4(0.0,0.0,0.0,0.0);\n"
				+ ((this.sp.lightingPerFragment) ? ("\n       vDiffColor = vec4(uLightingPar.x, uLightingPar.y,0.0,0.0);\n")
						: "")
				+ "\n       vmix   = vec2(1.0,0.0);\n    }\n"
				+ ((this.sp.lightingPerVertex) ? ("\n  vec3 lightPos = vec3 (0.0,2000.0,-8000.0);\n  vec3 lightDir = normalize(lightPos - a.xyz);\n  vLight = vec3 (.5,.5,.5) +  vec3 (.5,.5,.5) * ( clamp(   (dot(normalize(tnormal.xyz), lightDir )), 0.0, 1.0));\n")
						: "")
				+ "\n"
				+ ((this.sp.lightingPerFragment) ? ("\n   v3Dpos=a.xyz; vnormal=normalize(tnormal.xyz);\n   vLightingPar = vec4((((flags/256)*2 != (flags/128)) ? 1.0 : 0.0 ), 0.0, fract(normal.w), floor(normal.w));\n")
						: "") + "\n"
	};
	x.stdVertexConditionEnd = function() {
		return "\n  }\n"
	};
	x.stdVertexFoot = function() {
		return "\n}\n"
	};
	x.stdVertex3Dmapping = function() {
		return "\n   " + this.ins(this.stdVertex3DmappingEye) + "\n   "
				+ this.ins(this.stdVertex3DmappingBase) + "\n"
	};
	x.SHCVP = function() {
		return "\n" + ((this.inFragment) ? ("fshcvp") : "") + ""
				+ ((this.inVertex) ? ("shcvp") : "") + "\n"
	};
	x.stdShadow3Dmapping = function() {
		return "\n      mat4 shadowPM = \n          mat4 (      "
				+ this.ins(this.SHCVP)
				+ ".p,                                                             0.0,                                  0.0,    0.0,  \n                          0.0,                                                            -  "
				+ this.ins(this.SHCVP)
				+ ".q,                            0.0,    0.0,\n               ((1.0+"
				+ this.ins(this.SHCVP)
				+ ".p*("
				+ this.ins(this.SHCVP)
				+ ".s-uLightPos.x))/uLightPos.z), ((-1.0+"
				+ this.ins(this.SHCVP)
				+ ".q*(uLightPos.y-"
				+ this.ins(this.SHCVP)
				+ ".t))/uLightPos.z),      0.0,   -shF/uLightPos.z,\n               -"
				+ this.ins(this.SHCVP) + ".p*" + this.ins(this.SHCVP)
				+ ".s-1.0,                                       "
				+ this.ins(this.SHCVP) + ".q*" + this.ins(this.SHCVP)
				+ ".t+1.0,                  uLightPos.z/65536.0,    shF);\n"
	};
	x.vertexShaderCode = function() {
		return "\n" + this.ins(this.stdVertexUniforms) + "\n"
				+ this.ins(this.stdAttributes) + "\n"
				+ this.ins(this.stdVarying) + "\nint flags;\n"
				+ this.ins(this.vertexVar) + "\n" + this.ins(this.DoRotation)
				+ "\n" + this.ins(this.stdVertexHead) + " \n   "
				+ this.ins(this.stdVertexCondition) + "\n   "
				+ this.ins(this.pos) + "\n   "
				+ this.ins(this.stdVertexMotionAnimation) + "\n   "
				+ this.ins(this.stdVertex3Dmapping) + "\n   "
				+ this.ins(this.stdVertexTexmix) + " \n   "
				+ this.ins(this.stdVertexLighting) + "\n"
				+ this.ins(this.stdVertexConditionEnd) + "\n"
				+ this.ins(this.stdVertexFoot) + "\n"
	};
	x.shadowVertexShaderCode = function() {
		return "\n"
				+ this.ins(this.stdVertexUniforms)
				+ "\n"
				+ this.ins(this.stdAttributes)
				+ "\n"
				+ this.ins(this.stdVarying)
				+ "\nint flags;\n"
				+ this.ins(this.vertexVar)
				+ "\n"
				+ this.ins(this.DoRotation)
				+ "\n"
				+ this.ins(this.stdVertexHead)
				+ " \n"
				+ this.ins(this.stdVertexCondition)
				+ "\n   "
				+ this.ins(this.pos)
				+ "\n    if ((flags/512)*2 != (flags/256)) {\n        gl_Position = vec4(0.0,0.0,0.0,1.0);\n    } else {\n   "
				+ this.ins(this.stdVertexMotionAnimation)
				+ "\n   const float shF=1.0;\n   "
				+ this.ins(this.stdShadow3Dmapping)
				+ "\n   gl_Position=shadowPM*a;\n   v3Dpos=a.xyz; vnormal=normalize(tnormal.xyz);\n   "
				+ this.ins(this.stdVertexTexmix)
				+ " \n    if ((flags/32)*2 != (flags/16)) {\n       vec4 m = texmix;\n       vmix   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);\n       float c0a =  mod(color.t,256.0) *(1.0/255.0);\n       float c1a =  mod(color.q,256.0) *(1.0/255.0);\n       vAmbColor = vec4(0.0,0.0,0.0,mix(c0a,c1a,t));\n    } else {\n       vAmbColor = vec4(0.0,0.0,0.0,0.0);\n       vmix   = vec2(1.0,0.0);\n    }\n"
				+ this.ins(this.stdVertexConditionEnd) + "\n    }\n"
				+ this.ins(this.stdVertexFoot) + "\n"
	};
	x.framentDefs = function() {
		return "\n#define TS(S) ((S)*(1.0/" + this.ins(this.TEXTURECANVASWIDTH)
				+ "))\n#define TT(T) ((T)*(1.0/"
				+ this.ins(this.TEXTURECANVASHEIGHT) + "))\n"
	};
	x.fragmentShaderCode = function() {
		return "\nprecision mediump float;\n"
				+ this.ins(this.stdFragmentUniforms)
				+ "\n"
				+ this.ins(this.framentDefs)
				+ "\n"
				+ this.ins(this.ifragDef)
				+ "\n"
				+ this.ins(this.fragDef)
				+ "\n"
				+ this.ins(this.stdVarying)
				+ "\nvoid main()\n{\n   vec4 c, d, e;\n   float s=vtexpos.s; float t=vtexpos.t;\n   "
				+ this.ins(this.ifragVar)
				+ "\n   "
				+ this.ins(this.fragVar)
				+ "\n   "
				+ this.ins(this.fragPos)
				+ "\n   c  = texture2D(uTexture,  vec2(s, t));\n  "
				+ ((this.sp.showShadow) ? ("\n      const float shF=2.0;\n      "
						+ this.ins(this.stdShadow3Dmapping) + "\n      vec4 sp4=shadowPM * vec4(v3Dpos,1.0);\n      vec3 sp=(sp4.xyz/sp4.w) + vec3(0.5,0.5,0.5); \n   vec4 sm  = texture2D(uShadowMap,  sp.xy);\n   float hasShadow = (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n#if 1\n   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,1.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,-1.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,0.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,0.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,1.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,1.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,-1.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,-1.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,5.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,-5.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,0.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,0.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,5.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,5.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,-5.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,-5.0/2048.0));\n   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n#endif\n   hasShadow *= uShadowFactor;\n  ")
						: "")
				+ "\n  "
				+ ((this.sp.mixtex) ? ("				\n   d = texture2D(uTexture2, vtexpos);\n   float da = vmix.t; float ca = vmix.s;\n   "
						+ this.ins(this.mix) + "\n   float dam=d.a*da; float cam=c.a*ca;\n   e = vec4 (c.rgb * ca * (1.0-dam) + d.rgb*da, 1.0-(1.0-dam)*(1.0-cam)); \n  ")
						: "")
				+ "\n  "
				+ ((!this.sp.mixtex) ? ("\n   float ca = vmix.s;\n   "
						+ this.ins(this.mix) + "\n   float cam=c.a*ca; float dam=0.0;\n   e = vec4 (c.rgb * ca,  cam);\n  ")
						: "")
				+ "\n  "
				+ ((this.sp.lightingPerFragment) ? ("\n     bool  colormode= vDiffColor.w!=0.0; \n   vec4  bgcolor  = colormode ? vec4(1.0,1.0,1.0,1.0)*vAmbColor.w : vAmbColor;\n  ")
						: "")
				+ "\n  "
				+ ((!this.sp.lightingPerFragment) ? ("\n   vec4  bgcolor  = vAmbColor;\n  ")
						: "")
				+ "\n   float a =  1.0  -(1.0-bgcolor.a)*(1.0-e.a);\n   vec3 col = e.rgb + bgcolor.rgb * ((1.0-dam)*(1.0-cam));  \n   "
				+ this.ins(this.color)
				+ "\n   if (a<0.01) discard;\n  "
				+ ((this.sp.lightingPerFragment) ? ("\n   vec3 lightDir = normalize(uLightPos.xyz - v3Dpos);\n   vec3 normal;\n  "
						+ ((this.sp.frontfacing) ? ("\n   if (gl_FrontFacing) normal=vnormal; else normal=-vnormal;\n  ")
								: "")
						+ "\n  "
						+ ((!this.sp.frontfacing) ? ("\n   normal=vnormal;					\n  ")
								: "")
						+ "\n  normal=normalize(normal);\n   \n  vec3 Light =  (colormode ? vDiffColor.rgb : uLightingColor * vDiffColor.y) *\n  	          pow ( ( clamp( ( "
						+ ((!this.sp.frontfacing) ? ("abs") : "")
						+ "(dot(normal, lightDir ))), 0.0, 1.0)), uLightPos.w);\n  vec3 eye = vec3 ("
						+ this.ins(this.EYEX)
						+ ", "
						+ this.ins(this.EYEY)
						+ ", "
						+ this.ins(this.EYEZ)
						+ ");\n  Light +=  uLightingColor * vLightingPar.z * pow ( clamp ( dot ( reflect (-lightDir, normal), normalize(eye - v3Dpos) ), 0.0, 1.0), vLightingPar.w) ; \n  col *= ( Light   "
						+ ((this.sp.showShadow) ? (" * (1.0-hasShadow) ") : "") + " + (colormode ? vAmbColor.rgb : uLightingAmbientColor * vDiffColor.x));\n  ")
						: "")
				+ "\n  "
				+ ((this.sp.lightingPerVertex) ? ("  \n   col *= Light;  \n  ")
						: "")
				+ "\n  "
				+ ((this.sp.lightingPerFragment) ? ("\n   if (vLightingPar.x>0.0) {\n      col=vec3(0.0,0.0,0.0);\n      a =  "
						+ ((this.sp.showShadow) ? ("hasShadow*(Light.r+Light.g+Light.b)/3.0+")
								: "") + "0.0;\n   }\n  ")
						: "") + "\n   " + this.ins(this.finalcolor) + "\n  "
				+ ((this.sp.showShadow) ? ("\n  ") : "")
				+ "  \n      gl_FragColor = vec4(col,a);\n}\n"
	};
	x.shadowFragmentShaderCode = function() {
		return "\nprecision mediump float;\n"
				+ this.ins(this.stdUniformsBg)
				+ " "
				+ this.ins(this.stdUniformsEnd)
				+ "\n"
				+ this.ins(this.framentDefs)
				+ "\n"
				+ this.ins(this.ifragDef)
				+ "\n"
				+ this.ins(this.fragDef)
				+ "\n"
				+ this.ins(this.stdVarying)
				+ "\nvoid main()\n{\n   vec4 c, d, e;\n   float s=vtexpos.s; float t=vtexpos.t;\n   "
				+ this.ins(this.ifragVar)
				+ "\n   "
				+ this.ins(this.fragVar)
				+ "\n   "
				+ this.ins(this.fragPos)
				+ "\n   c  = texture2D(uTexture,  vec2(s, t));\n  "
				+ ((this.sp.mixtex) ? ("				\n   d = texture2D(uTexture2, vtexpos);\n   float da = vmix.t; float ca = vmix.s;\n   "
						+ this.ins(this.mix) + "\n   float dam=d.a*da; float cam=c.a*ca;\n   float ea = 1.0-(1.0-dam)*(1.0-cam); \n  ")
						: "")
				+ "\n  "
				+ ((!this.sp.mixtex) ? ("\n   float ca = vmix.s;\n   "
						+ this.ins(this.mix) + "\n   float cam=c.a*ca; float dam=0.0;\n   float ea = cam;\n  ")
						: "")
				+ "\n   float bgcolora = vAmbColor.a; \n   float a =  1.0  -(1.0-bgcolora)*(1.0-ea);\n   "
				+ this.ins(this.color)
				+ "\n   if (a<0.01) discard;\n   gl_FragColor = floor ( fract( gl_FragCoord.z*vec4(1.0,256.0,65536.0,256.0*65536.0) ) * 256.0 ) * (1.0/255.0);\n}\n"
	};
	this.init = function() {
		this.p = null;
		this.ifragDef = "";
		this.ifragVar = "";
		this.lighting = true;
		this.lightingPerFragment = true;
		this.lightingPerVertex = false;
		this.mixtex = true;
		this.frontfacing = taccgl_frontfacing;
		if (window.taccgl_TM || window.taccgl_TM == false) {
			this.useTM = window.taccgl_TM
		} else {
			this.useTM = true
		}
		this.consts = new this.empty();
		this.uniforms = new this.empty();
		this.showShadow = true;
		this.castShadow = true
	};
	this.empty = function() {
	};
	this.setLighting = function(ena, perVertex) {
		if (ena) {
			this.lighting = true;
			if (perVertex) {
				this.lightingPerFragment = false;
				this.lightingPerVertex = true
			} else {
				this.lightingPerFragment = true;
				this.lightingPerVertex = false
			}
		} else {
			this.lighting = false;
			this.lightingPerFragment = false;
			this.lightingPerVertex = false;
			this.showShadow = false
		}
	};
	this.initShader = function() {
		if (!taccgl.dddmode) {
			return
		}
		var x = this;
		if (x) {
		}
		var s = this.prepShader(this.getShader("taccgl_Shaders"));
		eval(s)
	};
	this.extendShader = function(n) {
		if (!taccgl.dddmode) {
			return
		}
		if (n == "taccgl_Shaders") {
			return
		}
		var x = this;
		if (x) {
		}
		eval(this.prepShader(this.getShader(n)))
	};
	this.el = function(pre, el) {
		if (!taccgl.dddmode) {
			return this
		}
		if (typeof (el) == "string") {
			el = document.getElementById(el)
		}
		var par = el, x = el.offsetLeft, y = el.offsetTop;
		while (par.offsetParent) {
			par = par.offsetParent;
			x += par.offsetLeft;
			y += par.offsetTop
		}
		this.ifragDef += "#define " + pre + "S TS(" + x + ".0)\n#define " + pre
				+ "T TT(" + y + ".0)\n#define " + pre + "W TS("
				+ el.offsetWidth + ".0)\n#define " + pre + "H TT("
				+ el.offsetHeight + ".0)\n#define " + pre + "MS TS(" + x
				+ ".0+" + el.offsetWidth + ".0/2.0)\n#define " + pre + "MT TT("
				+ y + ".0+" + el.offsetHeight + ".0/2.0)\n";
		return this
	};
	this.times = function() {
		if (!taccgl.dddmode) {
			return this
		}
		this.ifragVar += "float basetime = times.s; float duration = times.t; float rt = times.p; float ct = times.q;\nfloat mct= 1.0-ct;\n";
		return this
	};
	this.fragCoord = function() {
		if (!taccgl.dddmode) {
			return this
		}
		this.ifragVar += "float fx=gl_FragCoord.x; float fy=gl_FragCoord.y; float fz=gl_FragCoord.z; float fw=gl_FragCoord.w;\n";
		return this
	};
	this.ins = function(h, a, b, c, d, e, f, g) {
		if (typeof (h) == "function") {
			this.h = h;
			var r = this.h(a, b, c, d, e, f, g);
			this.h = null;
			return r
		} else {
			if (typeof (h) == "string") {
				return h
			} else {
				if (typeof (h) == "number") {
					var s = "" + h;
					if (s.match(/\./)) {
						return s
					}
					return s + ".0"
				} else {
					if (h && typeof (h) == "object") {
						if (h.length) {
							var x = "", i;
							for (i = 0; i < h.length; i++) {
								x += this.ins(h[i], a, b, c, d, e, f, g)
							}
							return x
						} else {
							return h.gen(a, b, c, d, e, f, g)
						}
					}
				}
			}
		}
	};
	this.prepShader = function(s) {
		var t;
		t = "{x.dummy='" + s;
		t = t.replace(/\n:([A-Za-z0-9]+)/g,
				"//-----\n';}; x.$1=function(){return '//+++++ $1 ");
		t = t.replace(/\n/g, "\\n'+\n'");
		t = t.replace(/\$\$([A-Za-z0-9]+)/g, "'+this.ins(this.$1)+'");
		t = t.replace(/\$\$\[/g, "'+");
		t = t.replace(/\$\$\]/g, "+'");
		t = t.replace(/\$\$\?([A-Za-z0-9!|.]+)\{/g, "'+(($1)?('");
		t = t.replace(/\$\$\?\}/g, "'):'')+'");
		t += "';}";
		s = '/*\n<script id="taccgl_Shaders" type="x-gsgl/x-vertex">' + s
				+ "<\/script>\n*/\n";
		if (taccgl_showShader) {
			document.body.insertAdjacentHTML("afterbegin",
					'<div style="z-index:100000; position:relative"><textarea cols="80" rows="5">'
							+ s + t + "</textarea></div>")
		}
		return (t)
	};
	this.getShader = function(n) {
		var el = document.getElementById(n), t = " ";
		if (el) {
			t = el.innerHTML;
			if (!t) {
				t = el.text
			}
		}
		return (t)
	};
	this.TEXTURECANVASWIDTH = function() {
		return taccgl_texCanWidth + ".0"
	};
	this.TEXTURECANVASHEIGHT = function() {
		return taccgl_texCanHeight + ".0"
	};
	this.EYEX = function() {
		return Math.floor(taccgl.eyeX) + ".0"
	};
	this.EYEY = function() {
		return Math.floor(taccgl.eyeY) + ".0"
	};
	this.EYEZ = function() {
		return Math.floor(taccgl.eyeZ) + ".0"
	};
	this.fragDef = "/* fragDef */";
	this.fragVar = "/* fragVar */";
	this.fragPos = "/* fragPos */";
	this.mix = "/* mix */";
	this.color = "/* color */";
	this.finalcolor = "/* finalcolor */";
	this.vertexVar = "/* vertexVar */";
	this.pos = "/* pos */";
	this.genUniforms = function() {
		var s = "", n;
		for (n in this.uniforms) {
			var u = this.uniforms[n];
			s += "uniform ";
			if (u.d == 1) {
				s += " float "
			} else {
				if (u.d <= 4) {
					s += " mediump vec" + u.d
				} else {
					s += " mediump mat" + (u.d - 100)
				}
			}
			s += " " + u.name + ";\n"
		}
		return s
	};
	this.genConsts = function() {
		var s = "", n;
		for (n in this.consts) {
			var u = this.consts[n];
			s += "const  ";
			if (u.d == 1) {
				s += " float "
			} else {
				s += " vec" + u.d
			}
			s += " " + u.name + " = ";
			if (u.d == 1) {
				s += u.jcx
			} else {
				s += " vec" + u.d + "(";
				s += u.jcx;
				if (u.jcy) {
					s += "," + u.jcy
				}
				if (u.jcz) {
					s += "," + u.jcz
				}
				if (u.jcw) {
					s += "," + u.jcw
				}
				s += ")"
			}
			s += ";\n"
		}
		return s
	};
	this.shaderPar = function(sc) {
		this.lighting = sc.lighting;
		this.lightingPerFragment = sc.lightingPerFragment;
		this.lightingPerVertex = sc.lightingPerVertex;
		this.mixtex = sc.mixtex;
		this.frontfacing = sc.frontfacing;
		this.useTM = sc.useTM;
		this.showShadow = sc.showShadow;
		this.castShadow = sc.castShadow
	};
	this.newUniform = function(name, d, jcx, jcy, jcz, jcw) {
		this.name = name;
		this.jcx = jcx;
		this.jcy = jcy;
		this.jcz = jcz;
		this.jcw = jcw;
		this.d = d
	};
	this.newConst = function(name, d, jcx, jcy, jcz, jcw) {
		this.name = name;
		this.jcx = jcx;
		this.jcy = jcy;
		this.jcz = jcz;
		this.jcw = jcw;
		this.d = d
	};
	this.createUniform = function(name, jcx, jcy, jcz, jcw) {
		var d = 1;
		if (jcy) {
			d = 2
		}
		if (jcz) {
			d = 3
		}
		if (jcw) {
			d = 4
		}
		this.uniforms[name] = new this.newUniform(name, d, jcx, jcy, jcz, jcw)
	};
	this.createUniformMatrix = function(name, d, transpose, m) {
		this.uniforms[name] = new this.newUniform(name, 100 + d, transpose, m)
	};
	this.createConst = function(name, jcx, jcy, jcz, jcw) {
		var d = 1;
		if (jcy) {
			d = 2
		}
		if (jcz) {
			d = 3
		}
		if (jcw) {
			d = 4
		}
		this.consts[name] = new this.newConst(name, d, jcx, jcy, jcz, jcw)
	};
	this.setupGen = function() {
		if (this.sp.lighting) {
			this.createUniform("uLightingPar", "taccgl.lightAmbient",
					"taccgl.lightDiffuse", "taccgl.lightSpecular",
					"taccgl.lightShininess");
			this.createUniform("uLightPos", "taccgl.stdLight.x",
					"taccgl.stdLight.y", "taccgl.stdLight.z",
					"taccgl.stdLight.focus");
			if (!this.uniforms.uLightingAmbientColor) {
				this.createConst("uLightingAmbientColor", "1.0", "1.0", "1.0")
			}
			if (!this.uniforms.uLightingColor) {
				this.createConst("uLightingColor", "1.0", "1.0", "1.0")
			}
			if (!window.taccgl_shadowFactor) {
				taccgl_shadowFactor = 0.8
			}
			if (!this.uniforms.uShadowFactor) {
				this.createConst("uShadowFactor", taccgl_shadowFactor
						.toFixed(5))
			}
		}
		if (this.sp.useTM) {
			this.createUniformMatrix("uTM", 4, "false", "taccgl.TM");
			this.createUniformMatrix("uTM_1T", 3, "false", "taccgl.TM_1T")
		}
	};
	this.trycompile = function(par) {
		taccgl.webglerror = false;
		this.sp = par;
		this.setupGen();
		this.inShadow = false;
		this.inFragment = false;
		this.inVertex = true;
		this.vstext = this.vertexShaderCode();
		this.inVertex = false;
		this.inFragment = true;
		this.inVertex = false;
		this.fstext = this.fragmentShaderCode();
		this.inFragment = false;
		this.inShadow = null;
		if (taccgl_showShader) {
			document.body.insertAdjacentHTML("afterbegin",
					'<textarea cols="80" rows="2" style="z-index:100000; position:relative">'
							+ this.fstext + "</textarea>");
			document.body.insertAdjacentHTML("afterbegin",
					'<textarea cols="80" rows="2" style="z-index:100000; position:relative">'
							+ this.vstext + "</textarea>")
		}
		this.vertexShader = taccgl.createVertexShader(taccgl
				.replaceShaderVariables(this.vstext));
		if (this.vertexShader == null || taccgl.webglerror) {
			return null
		}
		this.fragmentShader = taccgl.createFragmentShader(taccgl
				.replaceShaderVariables(this.fstext));
		if (this.fragmentShader == null || taccgl.webglerror) {
			return null
		}
		return taccgl.createShaderProgram(this.vertexShader,
				this.fragmentShader)
	};
	this.compileShadowShader = function() {
		this.shadowP = null;
		taccgl.webglerror = false;
		this.inShadow = true;
		this.inFragment = false;
		this.inVertex = true;
		var vstext = this.shadowVertexShaderCode();
		this.inVertex = false;
		this.inFragment = true;
		this.inVertex = false;
		var fstext = this.shadowFragmentShaderCode();
		this.inFragment = false;
		this.inShadow = null;
		var vs = taccgl.createVertexShader(taccgl
				.replaceShaderVariables(vstext));
		if (this.vertexShader == null || taccgl.webglerror) {
			return
		}
		var fs = taccgl.createFragmentShader(taccgl
				.replaceShaderVariables(fstext));
		this.shadowP = taccgl.createShaderProgram(vs, fs)
	};
	this.newLocs = function(p, shadowmap, genshadowmap) {
		var g = taccgl.g;
		this.uTime = g.getUniformLocation(p, "uTime");
		if (genshadowmap) {
			this.shcvp = g.getUniformLocation(p, "shcvp")
		} else {
			this.cvp = g.getUniformLocation(p, "cvp")
		}
		this.uTexture = g.getUniformLocation(p, "uTexture");
		this.uTexture2 = g.getUniformLocation(p, "uTexture2");
		if (shadowmap) {
			this.uShadowMap = g.getUniformLocation(p, "uShadowMap");
			this.shcvp = g.getUniformLocation(p, "shcvp");
			this.fshcvp = g.getUniformLocation(p, "fshcvp")
		}
	};
	this.compileUniforms = function() {
		this.fastLoc = new this.newLocs(this.fastProg, this.fastPar.showShadow,
				false);
		if (this.advProg) {
			this.advLoc = new this.newLocs(this.advProg,
					this.advPar.showShadow, false)
		}
		if (this.shadowP) {
			this.shadowLoc = new this.newLocs(this.shadowP, false, true)
		}
		var s = "x.passUniforms=function (loc) {var g=taccgl.g;\n", n, u;
		for (n in this.uniforms) {
			u = this.uniforms[n];
			if (u.d > 100) {
				s += "g.uniformMatrix" + (u.d - 100) + "fv(loc." + u.name + ","
						+ u.jcx + "," + u.jcy + ");\n"
			} else {
				s += "g.uniform" + u.d + "f(loc." + u.name + "," + u.jcx;
				if (u.jcy) {
					s += "," + u.jcy
				}
				if (u.jcz) {
					s += "," + u.jcz
				}
				if (u.jcw) {
					s += "," + u.jcw
				}
				s += ");\n"
			}
			this.fastLoc[u.name] = taccgl.g.getUniformLocation(this.fastProg,
					u.name);
			if (this.advProg) {
				this.advLoc[u.name] = taccgl.g.getUniformLocation(this.advProg,
						u.name)
			}
		}
		s += "};\n";
		if (this.shadowP) {
			s += "x.shadowPassUniforms=function () {var g=taccgl.g;\n";
			for (n in this.uniforms) {
				u = this.uniforms[n];
				if (u.d > 100) {
					s += "g.uniformMatrix" + (u.d - 100) + "fv(this.shadowLoc."
							+ u.name + "," + u.jcx + "," + u.jcy + ");\n"
				} else {
					s += "g.uniform" + u.d + "f(this.shadowLoc." + u.name + ","
							+ u.jcx;
					if (u.jcy) {
						s += "," + u.jcy
					}
					if (u.jcz) {
						s += "," + u.jcz
					}
					if (u.jcw) {
						s += "," + u.jcw
					}
					s += ");\n"
				}
				this.shadowLoc[u.name] = taccgl.g.getUniformLocation(
						this.shadowP, u.name)
			}
			s += "}"
		}
		var x = this;
		eval(s);
		if (x) {
		}
	};
	this.compile = function() {
		if (!taccgl.dddmode) {
			return this
		}
		var fastCompileStart = taccgl.perfnow();
		this.fastPar = new this.shaderPar(this);
		this.fastPar.showShadow = false;
		this.fastProg = this.trycompile(this.fastPar);
		if (!this.fastProg) {
			this.fastPar.frontfacing = false;
			this.fastProg = this.trycompile(this.fastPar)
		}
		if (!this.fastProg && this.fastPar.lighting) {
			this.fastPar.lighting = false;
			this.fastPar.lightingPerFragment = false;
			this.fastPar.lightingPerVertex = false;
			this.fastProg = this.trycompile(this.fastPar)
		}
		if (!this.fastProg || taccgl.webglerror) {
			return
		}
		var fastCompileTime = taccgl.perfnow() - fastCompileStart;
		var n = navigator.appVersion;
		var aT;
		if (n.match(/Chrome/)) {
			aT = taccgl_advCompileTimeChrome
		} else {
			aT = taccgl_advCompileTime
		}
		if (this.showShadow && this.fastPar.lighting && fastCompileTime < aT) {
			this.advPar = new this.shaderPar(this);
			this.advPar.frontfacing = this.fastPar.frontfacing;
			this.advProg = this.trycompile(this.advPar);
			if (!this.advProg) {
				taccgl.webglerror = false
			}
		} else {
			this.advProg = null
		}
		if (this.castShadow && this.advProg) {
			this.sp = this.advPar;
			this.compileShadowShader()
		}
		this.compileUniforms();
		if (this.advProg != null) {
			this.p = this.advProg;
			this.loc = this.advLoc
		} else {
			this.p = this.fastProg;
			this.loc = this.fastLoc
		}
		this.qp = new Array(4);
		this.qLoc = new Array(4);
		this.qp[1] = this.fastProg;
		this.qLoc[1] = this.fastLoc;
		this.qp[2] = this.fastProg;
		this.qLoc[2] = this.fastLoc;
		this.qp[3] = this.fastProg;
		this.qLoc[3] = this.fastLoc;
		if (this.advProg != null) {
			this.qp[3] = this.advProg;
			this.qLoc[3] = this.advLoc
		}
	};
	this.freeCompiled = function() {
		if (!taccgl.dddmode) {
			return this
		}
		taccgl.g.useProgram(null);
		taccgl.g.detachShader(this.p, this.vertexShader);
		taccgl.g.detachShader(this.p, this.fragmentShader);
		taccgl.g.deleteProgram(this.p)
	}
}
function taccglShaderConfigEmpty() {
	this.init()
}
function taccglMultiPrototype() {
	this.start = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.start(h, g, p, n, l, k)
		}
		return this
	};
	this.stop = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.stop(h, g, p, n, l, k)
		}
		return this
	};
	this.hide = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.hide(h, g, p, n, l, k)
		}
		return this
	};
	this.cposClientRects = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.cposClientRects(h, g, p, n, l, k)
		}
		return this
	};
	this.cposTransform = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.cposTransform(h, g, p, n, l, k)
		}
		return this
	};
	this.opacity = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.opacity(h, g, p, n, l, k)
		}
		return this
	};
	this.textureDraw = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.textureDraw(h, g, p, n, l, k)
		}
		return this
	};
	this.paint = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.paint(h, g, p, n, l, k)
		}
		return this
	};
	this.texClear = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.texClear(h, g, p, n, l, k)
		}
		return this
	};
	this.rotate = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.rotate(h, g, p, n, l, k)
		}
		return this
	};
	this.rotateMiddle = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.rotateMiddle(h, g, p, n, l, k)
		}
		return this
	};
	this.rotatePart = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.rotatePart(h, g, p, n, l, k)
		}
		return this
	};
	this.foreground = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.foreground(h, g, p, n, l, k)
		}
		return this
	};
	this.visatend = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.visatend(h, g, p, n, l, k)
		}
		return this
	};
	this.visAtEnd = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.visAtEnd(h, g, p, n, l, k)
		}
		return this
	};
	this.opacityatend = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.opacityatend(h, g, p, n, l, k)
		}
		return this
	};
	this.opacityAtEnd = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.opacityAtEnd(h, g, p, n, l, k)
		}
		return this
	};
	this.showafter = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.showafter(h, g, p, n, l, k)
		}
		return this
	};
	this.showbefore = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.showbefore(h, g, p, n, l, k)
		}
		return this
	};
	this.showAfter = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.showAfter(h, g, p, n, l, k)
		}
		return this
	};
	this.showBefore = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.showBefore(h, g, p, n, l, k)
		}
		return this
	};
	this.visFinal = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.visFinal(h, g, p, n, l, k)
		}
		return this
	};
	this.opacityFinal = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.opacityFinal(h, g, p, n, l, k)
		}
		return this
	};
	this.posZ = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.posZ(h, g, p, n, l, k)
		}
		return this
	};
	this.resizeZ = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.resizeZ(h, g, p, n, l, k)
		}
		return this
	};
	this.flyIn = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.flyIn(h, g, p, n, l, k)
		}
		return this
	};
	this.flyOut = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.flyOut(h, g, p, n, l, k)
		}
		return this
	};
	this.position = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.position(h, g, p, n, l, k)
		}
		return this
	};
	this.depth = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.depth(h, g, p, n, l, k)
		}
		return this
	};
	this.resize = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.resize(h, g, p, n, l, k)
		}
		return this
	};
	this.starttime = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.starttime(h, g, p, n, l, k)
		}
		return this
	};
	this.startTime = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.startTime(h, g, p, n, l, k)
		}
		return this
	};
	this.duration = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.duration(h, g, p, n, l, k)
		}
		return this
	};
	this.dur = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.dur(h, g, p, n, l, k)
		}
		return this
	};
	this.flyHome = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.flyHome(h, g, p, n, l, k)
		}
		return this
	};
	this.color = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.color(h, g, p, n, l, k)
		}
		return this
	};
	this.shadowOnly = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.shadowOnly(h, g, p, n, l, k)
		}
		return this
	};
	this.castShadow = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.castShadow(h, g, p, n, l, k)
		}
		return this
	};
	this.lightAmbDiff = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.lightAmbDiff(h, g, p, n, l, k)
		}
		return this
	};
	this.lightBgAmbDiff = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.lightBgAmbDiff(h, g, p, n, l, k)
		}
		return this
	};
	this.specLight = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.specLight(h, g, p, n, l, k)
		}
		return this
	};
	this.material = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.material(h, g, p, n, l, k)
		}
		return this
	};
	this.blend = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.blend(h, g, p, n, l, k)
		}
		return this
	};
	this.acceleration = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.acceleration(h, g, p, n, l, k)
		}
		return this
	};
	this.vEnd = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.vEnd(h, g, p, n, l, k)
		}
		return this
	};
	this.vBegin = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.vBegin(h, g, p, n, l, k)
		}
		return this
	};
	this.scalarAcceleration = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.scalarAcceleration(h, g, p, n, l, k)
		}
		return this
	};
	this.until = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.until(h, g, p, n, l, k)
		}
		return this
	};
	this.untilEo = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.untilEo(h, g, p, n, l, k)
		}
		return this
	};
	this.untilBo = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.untilBo(h, g, p, n, l, k)
		}
		return this
	};
	this.untilaLEo = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.untilaLEo(h, g, p, n, l, k)
		}
		return this
	};
	this.untilaMEo = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.untilaMEo(h, g, p, n, l, k)
		}
		return this
	};
	this.untilaLBo = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.untilalBo(h, g, p, n, l, k)
		}
		return this
	};
	this.untilaMBo = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.untilaMBo(h, g, p, n, l, k)
		}
		return this
	};
	this.LQCanvas = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.LQCanvas(h, g, p, n, l, k)
		}
		return this
	};
	this.map = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.map(h, g, p, n, l, k)
		}
		return this
	};
	this.mapScale = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.mapScale(h, g, p, n, l, k)
		}
		return this
	};
	this.mapRelative = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.mapRelative(h, g, p, n, l, k)
		}
		return this
	};
	this.copyTiming = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.copyTiming(h, g, p, n, l, k)
		}
		return this
	};
	this.copyMotion = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.copyMotion(h, g, p, n, l, k)
		}
		return this
	};
	this.copyMotion = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			m.copyMotion(h, g, p, n, l, k)
		}
		return this
	};
	this.opacity3D = function(h, g, p, n, l, k) {
		var j;
		for (j = 0; j < this.ar.length; j++) {
			var m = (this.ar[j]);
			if (m.opacity3D) {
				m.opacity3D(h, g, p, n, l, k)
			}
		}
		return this
	};
	this.selVisible = function() {
		var c = Array(0);
		var a;
		for (a = 0; a < this.ar.length; a++) {
			var b = getComputedStyle(this.ar[a].el);
			if (b.visibility == "visible") {
				c.push(this.ar[a])
			}
		}
		return new taccglMultiIntClone(c)
	};
	this.mp = function(e, g) {
		var c;
		for (c = 0; c < this.ar.length; c++) {
			var b = this.ar[c];
			e(b, c, g, this)
		}
		return this
	};
	this.select = function(g, h) {
		var e = Array(0);
		var c;
		for (c = 0; c < this.ar.length; c++) {
			var b = this.ar[c];
			if (g(b, c, h, this)) {
				e.push(b)
			}
		}
		return new taccglMultiIntClone(e)
	};
	this.selModulo = function(b, h, e) {
		var g = Array(0);
		var d;
		if (!h) {
			h = 0
		}
		if (!e) {
			e = h
		}
		for (d = 0; d < this.ar.length; d++) {
			var c = this.ar[d];
			if (h <= d % b && d % b <= e) {
				g.push(c)
			}
		}
		return new taccglMultiIntClone(g)
	};
	this.cont = function() {
		var d = Array(0);
		var c;
		for (c = 0; c < this.ar.length; c++) {
			var b = this.ar[c];
			d.push(b.cont())
		}
		return new taccglMultiIntClone(d)
	};
	this.clone = function() {
		var d = Array(0);
		var c;
		for (c = 0; c < this.ar.length; c++) {
			var b = this.ar[c];
			d.push(b.clone())
		}
		return new taccglMultiIntClone(d)
	};
	this.a = this.ma = function(d, c) {
		if (!c) {
			c = taccgl.taccglAnim
		}
		var b;
		if (typeof (c) == "object") {
			c.actorInit(d);
			b = c
		} else {
			b = new c(d)
		}
		this.ar.push(b);
		return this
	};
	this.add = this.mSingle = function(b) {
		this.ar.push(b);
		return this
	};
	this.mClass = function(a, b) {
		this.union(taccgl.mClass(a, b));
		return this
	};
	this.mName = function(a, b) {
		this.union(taccgl.mName(a.k));
		return this
	};
	this.mTagName = function(a, b) {
		this.union(taccgl.mTagName(a.k));
		return this
	};
	this.union = function(a) {
		this.ar = this.ar.concat(a.ar);
		return this
	};
	this.sequence = function(j, f) {
		if (!f) {
			f = 0
		}
		var k = this.ar.length, e;
		var h = (j - (k - 1) * f) / k, c = this.ar[0].basetime;
		for (e = 0; e < this.ar.length; e++) {
			var b = this.ar[e];
			b.dur(h);
			b.absStartTime(c + e * (h + f))
		}
		return this
	};
	this.sliceV = function(e, l, u, m) {
		if (!l) {
			l = 0
		}
		if (!u) {
			u = 0
		}
		if (!m) {
			m = 1
		}
		var c = Array(0);
		var k, h;
		for (k = 0; k < this.ar.length; k++) {
			var q = this.ar[k], p, o;
			if (m == 1) {
				o = e
			} else {
				o = (1 - Math.pow(m, e)) / (1 - m)
			}
			var t = (q.wx0 - l * (e - 1)) / o - e * u / 2 + u / 2;
			for (h = 0; h < e; h++) {
				if (h != e - 1) {
					p = q.clone()
				} else {
					p = q
				}
				if (m == 1) {
					p.restrict(q.x0 + h * (t + l) + h * (h - 1) / 2 * u, q.y0,
							t + u * h, q.hy0)
				} else {
					p.restrict(q.x0 + t * (1 - Math.pow(m, h)) / (1 - m) + h
							* l + h * (h - 1) / 2 * u, q.y0, Math.pow(m, h) * t
							+ u * h, q.hy0)
				}
				c.push(p)
			}
		}
		this.ar = c;
		return this
	};
	this.sliceH = function(e, l, u, m) {
		if (!l) {
			l = 0
		}
		if (!u) {
			u = 0
		}
		if (!m) {
			m = 1
		}
		var c = Array(0), k, h;
		for (k = 0; k < this.ar.length; k++) {
			var q = this.ar[k], p, o;
			if (m == 1) {
				o = e
			} else {
				o = (1 - Math.pow(m, e)) / (1 - m)
			}
			var t = (q.hy0 - l * (e - 1)) / o - e * u / 2 + u / 2;
			for (h = 0; h < e; h++) {
				if (h != e - 1) {
					p = q.clone()
				} else {
					p = q
				}
				if (m == 1) {
					p.restrict(q.x0, q.y0 + h * (t + l) + h * (h - 1) / 2 * u,
							q.wx0, t + u * h)
				} else {
					p.restrict(q.x0, q.y0 + t * (1 - Math.pow(m, h)) / (1 - m)
							+ h * l + h * (h - 1) / 2 * u, q.wx0, Math
							.pow(m, h)
							* t + u * h)
				}
				c.push(p)
			}
		}
		this.ar = c;
		return this
	};
	return this
}
function taccglMultiEmpty() {
	this.ar = Array(0);
	return this
}
function taccglMultiElement(a) {
	this.ar = Array(1);
	this.ar[0] = a;
	return this
}
function taccglMultiSet(c, a) {
	var b;
	this.ar = Array(c.length);
	if (!taccgl.cv) {
		taccgl.begin()
	}
	if (!a) {
		a = taccgl.taccglAnim
	}
	for (b = 0; b < c.length; b++) {
		this.ar[b] = new a(c[b])
	}
	return this
}
function taccglMultiIntClone(a) {
	this.ar = a;
	return this
}
taccglMultiEmpty.prototype = taccglMultiElement.prototype = taccglMultiSet.prototype = taccglMultiIntClone.prototype = new taccglMultiPrototype();
function taccglMaterialPrototype() {
	this.color = function(b, a) {
		this.colkind = "color";
		this.c = b;
		this.c1 = a;
		return this
	};
	this.lightAmbDiff = function(d, a, c, b) {
		this.colkind = "lightAmbDiff";
		this.ambCol = d;
		this.diffCol = a;
		this.a0 = c;
		this.a1 = b;
		return this
	};
	this.lightBgAmbDiff = function(f, d, e, b, a) {
		this.colkind = "lightBgAmbDiff";
		this.c = f;
		this.amb = d;
		this.diff = e;
		this.a0 = b;
		this.a1 = a;
		return this
	};
	this.specLight = function(a, b) {
		this.doSpecLight = true;
		this.spec = a;
		this.shini = b;
		return this
	};
	this.applyToAnim = function(b) {
		if (this.colkind == "color") {
			b.color(this.c, this.c1)
		}
		if (this.colkind == "lightAmbDiff") {
			b.lightAmbDiff(this.ambCol, this.diffCol, this.a0, this.a1)
		}
		if (this.colkind == "lightBgAmbDiff") {
			b.lightBgAmbDiff(this.c, this.amb, this.diff, this.a0, this.a1)
		}
		if (this.doSpecLight) {
			b.specLight(this.spec, this.shini)
		}
	}
}
function taccglMaterial() {
	this.colkind = null;
	this.doSpecLight = false;
	return this
}
taccglMaterial.prototype = new taccglMaterialPrototype();
taccgl.material = function() {
	return new taccglMaterial()
};
function taccglLightSourcePrototype() {
	this.setPos = function(a, c, b) {
		this.x = a;
		this.y = c;
		this.z = b;
		taccgl.adjustShcvp()
	};
	this.setShadowZRange = function(b, a) {
		this.zBack = a;
		this.zFront = b;
		this.adjustShcvp()
	};
	this.setFocus = function(a) {
		this.focus = a
	}
}
function taccglLightSource() {
	this.x = -200;
	this.y = -200;
	this.z = -5000;
	this.focus = 1;
	return this
}
taccglLightSource.prototype = new taccglLightSourcePrototype();
taccgl.lightSource = function() {
	return new taccglLightSource()
};
function taccgl_drawShadow(j) {
	var e = taccgl.g;
	var d = taccgl, a = d.pr;
	e.bindFramebuffer(e.FRAMEBUFFER, d.shadowfb);
	e.viewport(0, 0, 2048, 2048);
	e.disable(e.BLEND);
	e.clearColor(1, 1, 1, 1);
	e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
	var i;
	for (i = 0; i < d.draw_shprognumber; i++) {
		var h = d.shprogfrom[i], c;
		if (i < d.draw_shprognumber - 1) {
			c = d.shprogfrom[i + 1] - h
		} else {
			c = d.draw_vertexnumber - h
		}
		var f = d.shprog[i], b = f.shadowP;
		if (b) {
			e.useProgram(b);
			e.uniform1f(f.shadowLoc.uTime, j);
			e.uniform4f(f.shadowLoc.shcvp, d.shcvpx, d.shcvpy, 2 / d.shcvpw,
					2 / d.shcvph);
			e.uniform1i(f.shadowLoc.uTexture, 0);
			e.uniform1i(f.shadowLoc.uTexture2, 1);
			if (f.shadowPassUniforms) {
				f.shadowPassUniforms()
			}
			e.drawArrays(e.TRIANGLES, h, c)
		}
	}
	e.enable(e.BLEND);
	e.bindFramebuffer(e.FRAMEBUFFER, null);
	e
			.viewport(0, 0, Math.round(d.canvasW * d.pr), Math.round(d.canvasH
					* d.pr))
}
function taccgl_draw3d(i) {
	var s;
	var f = 1;
	var h = taccgl, k = h.g, m;
	if (taccgl.drawerrcheck) {
		if ((m = k.getError()) != 0) {
			h.webglerror = true;
			h.drawImmediateTerm()
		}
	}
	if (!s) {
		if (window.performance && window.performance.now) {
			s = window.performance.now()
		} else {
			s = new Date().getTime()
		}
	}
	var u = (s - h.draw_startTime) / h.draw_duration;
	h.currenttime = u;
	var p = false;
	while (u > h.doat[h.doatI].attime) {
		p = h.doat[h.doatI].doPreDraw(h.doatI) || p;
		if (h.doatI >= h.doat.length) {
			break
		}
	}
	if (p) {
		h.drawTerminated();
		h.doHook(h.onTerm);
		return
	}
	h.draw_frames++;
	if (h.draw_meaIgnore-- > 0 && h.draw_meaFrames >= 0) {
		h.draw_meaAdjust += s - h.meaA[h.draw_meaFrames % h.meaAS]
	}
	h.draw_meaFrames++;
	h.meaA[h.draw_meaFrames % h.meaAS] = s;
	h.meaAA[h.draw_meaFrames % h.meaAS] = s - h.draw_meaAdjust;
	var a, o;
	if (h.draw_meaFrames <= 0) {
		h.draw_meaTime = s;
		o = 30;
		a = 0
	} else {
		a = (s - h.draw_meaTime - h.draw_meaAdjust) / h.draw_duration;
		o = h.draw_meaFrames / a
	}
	if (h.draw_frames == 2) {
		if ((h.loadTest === false && (!(h.quality == 3 && u < 0.02))
				|| h.slowStartupFrames < 4 || (h.loadTest > 0 && u > 0.02))
				&& h.slowStartupTime < 3000) {
			if (h.loadTest == false) {
				if (h.slowStartupFrames > 2 && u < 0.02) {
					f = 4;
					h.loadTest = 6
				}
			} else {
				f = 4;
				h.loadTest--
			}
			h.slowStartupTime += s - h.draw_startTime;
			h.slowStartupFrames += 1;
			h.draw_startTime = h.draw_meaTime = s;
			u = 0;
			h.draw_frames = 1;
			h.draw_meaFrames = 0;
			h.draw_meaAdjust = 0;
			h.draw_meaIgnore = 0
		} else {
			if (h.quality == 3 && u < 0.02) {
			} else {
				if (h.loadTest === false) {
					h.quality = 1;
					h.adjustQuality();
					h.draw_meaFrames = -3;
					h.draw_meaAdjust = 0;
					h.draw_meaIgnore = 0;
					h.loadTest = 0
				} else {
					h.loadTest = false;
					if (u < 0.02) {
						h.quality++;
						h.adjustQuality();
						h.draw_meaFrames = -3;
						h.draw_meaAdjust = 0;
						h.draw_meaIgnore = 0
					} else {
					}
				}
			}
		}
	} else {
		if ((h.draw_frames >= 2)
				&& ((u > 0.2 && (h.draw_meaFrames > 10 || a > 1)) || u < 0.02 || h.draw_frames == 2)) {
			if (o < taccgl_immediateStop && h.quality == 1) {
				h.webglerror = true;
				h.drawImmediateTerm();
				return
			}
			if (o < 20 && h.quality > 1) {
				if ((h.draw_meaFrames < 5 || 5 / (s
						- h.meaAA[(h.draw_meaFrames - 5) % h.meaAS] - h.draw_meaAdjust) < 0.02)
						&& (h.draw_meaFrames < 2 || 2 / (s
								- h.meaAA[(h.draw_meaFrames - 2) % h.meaAS] - h.draw_meaAdjust) < 0.02)) {
					if (h.draw_meaFrames < 60) {
						if (h.quality < h.softFailQ) {
							h.softFailQ = h.quality;
							h.softFailCnt = 0
						}
						h.softFailCnt++;
						if (h.softFailCnt > 1) {
							h.hardFailQ = h.softFailQ
						}
					}
					h.quality--;
					h.adjustQuality();
					h.draw_meaFrames = -3;
					h.draw_meaAdjust = 0;
					h.draw_meaIgnore = 0
				}
			}
			if (o > 50 && h.quality < h.hardFailQ - 1 && h.epack) {
				if (h.loadTestl < -60) {
					h.loadTestl = 6
				} else {
					if (h.loadTestl >= 0 && h.loadTestl < 2) {
						if ((h.draw_meaFrames < 5 || 5 / (s - h.meaA[(h.draw_meaFrames - 5)
								% h.meaAS]) > 0.05)
								&& (h.draw_meaFrames < 2 || 2 / (s - h.meaA[(h.draw_meaFrames - 2)
										% h.meaAS]) > 0.05)) {
							h.quality++;
							h.adjustQuality();
							h.draw_meaFrames = -3;
							h.draw_meaAdjust = 0;
							h.draw_meaIgnore = 0;
							h.loadTestl = 0
						}
					}
				}
			}
			if (h.loadTestl-- > 0) {
				f = 4
			}
			if (o < 30 && h.quality > 2 && h.epack && h.draw_meaFrames > 60) {
				if ((h.draw_meaFrames < 5 || 5 / (s
						- h.meaAA[(h.draw_meaFrames - 5) % h.meaAS] - h.draw_meaAdjust) < 0.03)
						&& (h.draw_meaFrames < 2 || 2 / (s
								- h.meaAA[(h.draw_meaFrames - 2) % h.meaAS] - h.draw_meaAdjust) < 0.03)) {
					if (h.draw_meaFrames < 60) {
						if (h.quality < h.softFailQ) {
							h.softFailQ = h.quality;
							h.softFailCnt = 0
						}
						h.softFailCnt++;
						if (h.softFailCnt > 1) {
							h.hardFailQ = h.softFailQ
						}
					}
					h.quality--;
					h.adjustQuality();
					h.draw_meaFrames = -3;
					h.draw_meaAdjust = 0;
					h.draw_meaIgnore = 0
				}
			}
		}
	}
	var j;
	if (h.shadowEna && (h.quality > 2 || ((f > 1) && (h.quality == 2)))) {
		for (j = 0; j < f; j++) {
			taccgl_drawShadow(u)
		}
	}
	k.bindFramebuffer(k.FRAMEBUFFER, null);
	k.clearColor(0, 0, 0, 0);
	k.clear(k.COLOR_BUFFER_BIT | k.DEPTH_BUFFER_BIT);
	h.doHook(taccgl.onBeforeDraw3D, u);
	var r;
	for (j = 0; j < f; j++) {
		for (r = 0; r < h.draw_shprognumber; r++) {
			var q = h.shprogfrom[r], d;
			if (r < h.draw_shprognumber - 1) {
				d = h.shprogfrom[r + 1] - q
			} else {
				d = h.draw_vertexnumber - q
			}
			var n = h.shprog[r], c = n.qp[h.quality];
			k.useProgram(c);
			var l = n.qLoc[h.quality];
			k.uniform1f(l.uTime, u);
			k.uniform4f(l.cvp, h.cvpx, h.cvpy, 2 / h.cvpw, 2 / h.cvph);
			k.uniform1i(l.uTexture, 0);
			k.uniform1i(l.uTexture2, 1);
			if (n.passUniforms) {
				n.passUniforms(l)
			}
			if (h.shadowEna) {
				k.uniform1i(l.uShadowMap, 2);
				k.uniform4f(l.fshcvp, h.shcvpx, h.shcvpy, 2 / h.shcvpw,
						2 / h.shcvph)
			}
			k.drawArrays(k.TRIANGLES, q, d)
		}
		if (f > 1) {
			if ((m = k.getError()) != 0) {
				h.webglerror = true;
				h.drawImmediateTerm()
			}
			if (j == f - 1) {
				k.depthFunc(k.LEQUAL)
			} else {
				k.depthFunc(k.LESS)
			}
		}
	}
	if ((m = k.getError()) != 0) {
		h.webglerror = true;
		h.dddmode = false;
		h.drawImmediateTerm();
		return
	}
	if (window.taccgl_requestAnimationFrame) {
		h.reqAnimFrameId = taccgl_requestAnimationFrame(taccgl_draw3d)
	}
}
function taccgl_draw2d(K) {
	var e = taccgl, af = e.g, c = 1, s = e.pr;
	if (!e.draw_running) {
		return
	}
	if (!K) {
		if (window.performance && window.performance.now) {
			K = window.performance.now()
		} else {
			K = new Date().getTime()
		}
	}
	var J = (K - e.draw_startTime) / e.draw_duration;
	e.currenttime = J;
	var ai = false, ac, aj, S, G, P, O, N;
	var w = document.getElementById("taccgl_textureCanvas");
	var r = document.getElementById("taccgl_textureCanvas2");
	while (J > e.doat[e.doatI].attime) {
		ai = e.doat[e.doatI].doPreDraw(e.doatI) || ai;
		if (e.doatI >= e.doat.length) {
			break
		}
	}
	if (ai) {
		e.drawTerminatedDD();
		e.doHook(e.onTerm);
		return
	}
	e.draw_frames++;
	if (e.draw_meaIgnore-- > 0 && e.draw_meaFrames >= 0) {
		e.draw_meaAdjust += K - e.meaA[e.draw_meaFrames % e.meaAS]
	}
	e.draw_meaFrames++;
	e.meaA[e.draw_meaFrames % e.meaAS] = K;
	e.meaAA[e.draw_meaFrames % e.meaAS] = K - e.draw_meaAdjust;
	var d, Q;
	if (e.draw_meaFrames <= 0) {
		e.draw_meaTime = K;
		Q = 30;
		d = 0
	} else {
		d = (K - e.draw_meaTime - e.draw_meaAdjust) / e.draw_duration;
		Q = e.draw_meaFrames / d
	}
	if (e.draw_frames == 2) {
		if ((e.loadTest === false && (!(e.quality == 3 && J < 0.02))
				|| e.slowStartupFrames < 4 || (e.loadTest > 0 && J > 0.02))
				&& e.slowStartupTime < 3000) {
			if (e.loadTest == false) {
				if (e.slowStartupFrames > 2 && J < 0.02) {
					c = 8;
					e.loadTest = 6
				}
			} else {
				c = 8;
				e.loadTest--
			}
			e.slowStartupTime += K - e.draw_startTime;
			e.slowStartupFrames += 1;
			e.draw_startTime = e.draw_meaTime = K;
			S = 0;
			e.draw_frames = 1;
			e.draw_meaFrames = 0;
			e.draw_meaAdjust = 0;
			e.draw_meaIgnore = 0
		} else {
			if (e.quality == 3 && J < 0.02) {
			} else {
				if (e.loadTest === false) {
					e.quality = 1;
					e.adjustQuality();
					e.draw_meaFrames = -3;
					e.draw_meaAdjust = 0;
					e.draw_meaIgnore = 0;
					e.loadTest = 0
				} else {
					e.loadTest = false;
					if (J < 0.02) {
						e.quality++;
						e.adjustQuality();
						e.draw_meaFrames = -3;
						e.draw_meaAdjust = 0;
						e.draw_meaIgnore = 0
					} else {
					}
				}
			}
		}
	} else {
		if ((e.draw_frames >= 2)
				&& ((J > 0.2 && (e.draw_meaFrames > 10 || d > 1)) || J < 0.02 || e.draw_frames == 2)) {
			if (Q < taccgl_immediateStop && e.quality == 1) {
				e.webglerror = true;
				e.drawImmediateTerm();
				return
			}
			if (Q < 20 && e.quality > 1) {
				if ((e.draw_meaFrames < 5 || 5 / (K
						- e.meaAA[(e.draw_meaFrames - 5) % e.meaAS] - e.draw_meaAdjust) < 0.02)
						&& (e.draw_meaFrames < 2 || 2 / (K
								- e.meaAA[(e.draw_meaFrames - 2) % e.meaAS] - e.draw_meaAdjust) < 0.02)) {
					if (e.draw_meaFrames < 60) {
						if (e.quality < e.softFailQ) {
							e.softFailQ = e.quality;
							e.softFailCnt = 0
						}
						e.softFailCnt++;
						if (e.softFailCnt > 1) {
							e.hardFailQ = e.softFailQ
						}
					}
					e.quality--;
					e.adjustQuality();
					e.draw_meaFrames = -3;
					e.draw_meaAdjust = 0;
					e.draw_meaIgnore = 0
				}
			}
			if (Q > 50 && e.quality < e.hardFailQ - 1 && e.epack) {
				if (e.loadTestl < -60) {
					e.loadTestl = 6
				} else {
					if (e.loadTestl >= 0 && e.loadTestl < 2) {
						if ((e.draw_meaFrames < 5 || 5 / (K - e.meaA[(e.draw_meaFrames - 5)
								% e.meaAS]) > 0.05)
								&& (e.draw_meaFrames < 2 || 2 / (K - e.meaA[(e.draw_meaFrames - 2)
										% e.meaAS]) > 0.05)) {
							e.quality++;
							e.adjustQuality();
							e.draw_meaFrames = -3;
							e.draw_meaAdjust = 0;
							e.draw_meaIgnore = 0;
							e.loadTestl = 0
						}
					}
				}
			}
			if (e.loadTestl-- > 0) {
				c = 8
			}
			if (Q < 30 && e.quality > 2 && e.epack && e.draw_meaFrames > 60) {
				if ((e.draw_meaFrames < 5 || 5 / (K
						- e.meaAA[(e.draw_meaFrames - 5) % e.meaAS] - e.draw_meaAdjust) < 0.03)
						&& (e.draw_meaFrames < 2 || 2 / (K
								- e.meaAA[(e.draw_meaFrames - 2) % e.meaAS] - e.draw_meaAdjust) < 0.03)) {
					if (e.draw_meaFrames < 60) {
						if (e.quality < e.softFailQ) {
							e.softFailQ = e.quality;
							e.softFailCnt = 0
						}
						e.softFailCnt++;
						if (e.softFailCnt > 1) {
							e.hardFailQ = e.softFailQ
						}
					}
					e.quality--;
					e.adjustQuality();
					e.draw_meaFrames = -3;
					e.draw_meaAdjust = 0;
					e.draw_meaIgnore = 0
				}
			}
		}
	}
	for (var u = 0; u < c; u++) {
		af.clearRect(0, 0, e.cv.width, e.cv.height);
		ac = 0;
		while (ac < e.AAstartedLength) {
			aj = e.AA[ac];
			var A = aj.flags;
			S = G = (J - aj.basetime) / aj.vduration;
			if (S < 0) {
				S = 0;
				if ((A & 1) == 0) {
					ac++;
					continue
				}
			}
			if (S > 1) {
				S = 1;
				if ((A & 2) == 0) {
					ac++;
					continue
				}
			}
			var ah = 1 - S;
			if ((!aj.rotation) && !aj.face && aj.wy0 == 0 && aj.wz0 == 0
					&& aj.hx0 == 0 && aj.hz0 == 0 && aj.wy1 == 0 && aj.wz1 == 0
					&& aj.hx1 == 0 && aj.hz1 == 0) {
				var q = aj.wx0 * ah + aj.wx1 * S, h = aj.hy0 * ah + aj.hy1 * S;
				P = aj.x0 * ah + aj.x1 * S - 0.5 * S * ah * aj.ax;
				O = aj.y0 * ah + aj.y1 * S - 0.5 * S * ah * aj.ay;
				N = aj.z0 * ah + aj.z1 * S - 0.5 * S * ah * aj.az;
				P = P + e.ddfx * N;
				O = O + e.ddfy * N;
				if (q > 0 && h > 0) {
					if (aj.docolor) {
						if ((ah > 0) && aj.ddcolor0) {
							af.fillStyle = aj.ddcolor0;
							af.globalAlpha = 1;
							af.fillRect((P - e.canvasX) * s, (O - e.canvasY)
									* s, q * s, h * s)
						}
						if ((S > 0) && aj.ddcolor1) {
							af.fillStyle = aj.ddcolor1;
							af.globalAlpha = S;
							af.fillRect((P - e.canvasX) * s, (O - e.canvasY)
									* s, q * s, h * s)
						}
						var L = (1 - S) * aj.mix0 + S * aj.mix1;
						if (L > 0) {
							af.globalAlpha = L;
							af.drawImage(w, (aj.s0 * ah + aj.s1 * S) * s,
									(aj.t0 * ah + aj.t1 * S) * s,
									(aj.ws0 * ah + aj.ws1 * S) * s, (aj.ht0
											* ah + aj.ht1 * S)
											* s, (P - e.canvasX) * s,
									(O - e.canvasY) * s, q * s, h * s)
						}
						var M = (1 - S) * aj.mixs0 + S * aj.mixs1;
						if (M > 0) {
							af.globalAlpha = M;
							af.drawImage(r, (aj.s0 * ah + aj.s1 * S) * s,
									(aj.t0 * ah + aj.t1 * S) * s,
									(aj.ws0 * ah + aj.ws1 * S) * s, (aj.ht0
											* ah + aj.ht1 * S)
											* s, (P - e.canvasX) * s,
									(O - e.canvasY) * s, q * s, h * s)
						}
					} else {
						af.globalAlpha = 1;
						af.drawImage(w, (aj.s0 * ah + aj.s1 * S) * s, (aj.t0
								* ah + aj.t1 * S)
								* s, (aj.ws0 * ah + aj.ws1 * S) * s, (aj.ht0
								* ah + aj.ht1 * S)
								* s, (P - e.canvasX) * s, (O - e.canvasY) * s,
								q * s, h * s)
					}
				}
			} else {
				af.save();
				var V = aj.hx0 * ah + aj.hx1 * S, U = aj.hy0 * ah + aj.hy1 * S, T = aj.hz0
						* ah + aj.hz1 * S, ae = aj.wx0 * ah + aj.wx1 * S, ad = aj.wy0
						* ah + aj.wy1 * S, ab = aj.wz0 * ah + aj.wz1 * S, n = aj.dx0
						* ah + aj.dx1 * S, l = aj.dy0 * ah + aj.dy1 * S, k = aj.dz0
						* ah + aj.dz1 * S;
				if (aj.rotation) {
					var Y = aj.rotfrom * ah + aj.rotto * S;
					var F, E, D, Z, X, W;
					aj.calcRotation(Y, aj.x1, aj.y1, aj.z1);
					F = aj.resx;
					E = aj.resy;
					D = aj.resz;
					Z = aj.x0 * ah + aj.x1 * S - 0.5 * S * ah * aj.ax - aj.x1
							+ F;
					X = aj.y0 * ah + aj.y1 * S - 0.5 * S * ah * aj.ay - aj.y1
							+ E;
					W = aj.z0 * ah + aj.z1 * S - 0.5 * S * ah * aj.az - aj.z1
							+ D;
					aj.calcRotation(Y, aj.x1 + aj.hx1, aj.y1 + aj.hy1, aj.z1
							+ aj.hz1);
					F = aj.resx;
					E = aj.resy;
					D = aj.resz;
					V = aj.x0 * ah + aj.x1 * S - 0.5 * S * ah * aj.ax - aj.x1
							+ F - Z;
					U = aj.y0 * ah + aj.y1 * S - 0.5 * S * ah * aj.ay - aj.y1
							+ E - X;
					T = aj.z0 * ah + aj.z1 * S - 0.5 * S * ah * aj.az - aj.z1
							+ D - W;
					aj.calcRotation(Y, aj.x1 + aj.wx1, aj.y1 + aj.wy1, aj.z1
							+ aj.wz1);
					F = aj.resx;
					E = aj.resy;
					D = aj.resz;
					ae = aj.x0 * ah + aj.x1 * S - 0.5 * S * ah * aj.ax - aj.x1
							+ F - Z;
					ad = aj.y0 * ah + aj.y1 * S - 0.5 * S * ah * aj.ay - aj.y1
							+ E - X;
					ab = aj.z0 * ah + aj.z1 * S - 0.5 * S * ah * aj.az - aj.z1
							+ D - W;
					aj.calcRotation(Y, aj.x1 + aj.dx1, aj.y1 + aj.dy1, aj.z1
							+ aj.dz1);
					F = aj.resx;
					E = aj.resy;
					D = aj.resz;
					n = aj.x0 * ah + aj.x1 * S - 0.5 * S * ah * aj.ax - aj.x1
							+ F - Z;
					l = aj.y0 * ah + aj.y1 * S - 0.5 * S * ah * aj.ay - aj.y1
							+ E - X;
					k = aj.z0 * ah + aj.z1 * S - 0.5 * S * ah * aj.az - aj.z1
							+ D - W;
					P = Z;
					O = X;
					N = W
				} else {
					P = aj.x0 * ah + aj.x1 * S - 0.5 * S * ah * aj.ax;
					O = aj.y0 * ah + aj.y1 * S - 0.5 * S * ah * aj.ay;
					N = aj.z0 * ah + aj.z1 * S - 0.5 * S * ah * aj.az
				}
				P = P + e.ddfx * N;
				O = O + e.ddfy * N;
				V = V + e.ddfx * T;
				U = U + e.ddfy * T;
				ae = ae + e.ddfx * ab;
				ad = ad + e.ddfy * ab;
				n = n + e.ddfx * k;
				l = l + e.ddfy * k;
				af.setTransform(ae / 4096 * s, ad / 4096 * s, V / 4096 * s, U
						/ 4096 * s, (P - e.canvasX) * s, (O - e.canvasY) * s);
				if (!aj.face) {
					if (aj.docolor) {
						if ((ah > 0) && aj.ddcolor0) {
							af.fillStyle = aj.ddcolor0;
							af.globalAlpha = 1;
							af.fillRect(0, 0, 4096, 4096)
						}
						if ((S > 0) && aj.ddcolor1) {
							af.fillStyle = aj.ddcolor1;
							af.globalAlpha = S;
							af.fillRect(0, 0, 4096, 4096)
						}
						L = (1 - S) * aj.mix0 + S * aj.mix1;
						if (L > 0) {
							af.globalAlpha = L;
							af.drawImage(w, (aj.s0 * ah + aj.s1 * S) * s,
									(aj.t0 * ah + aj.t1 * S) * s,
									(aj.ws0 * ah + aj.ws1 * S) * s, (aj.ht0
											* ah + aj.ht1 * S)
											* s, 0, 0, 4096, 4096)
						}
						M = (1 - S) * aj.mixs0 + S * aj.mixs1;
						if (M > 0) {
							af.globalAlpha = M;
							af.drawImage(r, (aj.s0 * ah + aj.s1 * S) * s,
									(aj.t0 * ah + aj.t1 * S) * s,
									(aj.ws0 * ah + aj.ws1 * S) * s, (aj.ht0
											* ah + aj.ht1 * S)
											* s, 0, 0, 4096, 4096)
						}
					} else {
						af.globalAlpha = 1;
						af.drawImage(w, (aj.s0 * ah + aj.s1 * S) * s, (aj.t0
								* ah + aj.t1 * S)
								* s, (aj.ws0 * ah + aj.ws1 * S) * s, (aj.ht0
								* ah + aj.ht1 * S)
								* s, 0, 0, 4096, 4096)
					}
				} else {
					var aa, ag, v = Array(aj.face.length), C = Array(aj.face.length);
					for (aa = 0; aa < aj.face.length; aa++) {
						ag = aj.face[aa];
						var R = N, B = N + ab * ag.xtr + T * ag.ytr + k
								* ag.ztr, m = N + ab * ag.xbl + T * ag.ybl + k
								* ag.zbl, I = (R + B + m) / 3;
						v[aa] = I;
						C[aa] = ag
					}
					var p = false;
					while (!p) {
						p = true;
						for (aa = 1; aa < C.length; aa++) {
							if (v[aa - 1] < v[aa]) {
								var H;
								H = v[aa];
								v[aa] = v[aa - 1];
								v[aa - 1] = H;
								H = C[aa];
								C[aa] = C[aa - 1];
								C[aa - 1] = H;
								p = false
							}
						}
					}
					for (aa = 0; aa < aj.face.length; aa++) {
						ag = C[aa];
						af
								.setTransform((ae / 4096 * (ag.xtr - ag.xtl)
										+ V / 4096 * (ag.ytr - ag.ytl) + n
										/ 4096 * (ag.ztr - ag.ztl))
										* s, (ad / 4096 * (ag.xtr - ag.xtl) + U
										/ 4096 * (ag.ytr - ag.ytl) + l / 4096
										* (ag.ztr - ag.ztl))
										* s, (ae / 4096 * (ag.xbl - ag.xtl) + V
										/ 4096 * (ag.ybl - ag.ytl) + n / 4096
										* (ag.zbl - ag.ztl))
										* s, (ad / 4096 * (ag.xbl - ag.xtl) + U
										/ 4096 * (ag.ybl - ag.ytl) + l / 4096
										* (ag.zbl - ag.ztl))
										* s, (P + ae * ag.xtl + V * ag.ytl + n
										* ag.ztl - e.canvasX)
										* s, (O + ad * ag.xtl + U * ag.ytl + l
										* ag.ztl - e.canvasY)
										* s);
						if (ag.docolor) {
							if ((ah > 0) && ag.ddcolor0) {
								af.fillStyle = ag.ddcolor0;
								af.globalAlpha = 1;
								af.fillRect(0, 0, 4096, 4096)
							}
							if ((S > 0) && ag.ddcolor1) {
								af.fillStyle = ag.ddcolor1;
								af.globalAlpha = S;
								af.fillRect(0, 0, 4096, 4096)
							}
							L = (1 - S) * ag.mix0 + S * ag.mix1;
							if (L > 0) {
								af.globalAlpha = L;
								af.drawImage(w, s * (ag.s0 * ah + ag.s1 * S), s
										* (ag.t0 * ah + ag.t1 * S), s
										* (ag.ws0 * ah + ag.ws1 * S), s
										* (ag.ht0 * ah + ag.ht1 * S), 0, 0,
										4096, 4096)
							}
							M = (1 - S) * ag.mixs0 + S * ag.mixs1;
							if (M > 0) {
								af.globalAlpha = M;
								af.drawImage(r, s * (ag.s0 * ah + ag.s1 * S), s
										* (ag.t0 * ah + ag.t1 * S), s
										* (ag.ws0 * ah + ag.ws1 * S), s
										* (ag.ht0 * ah + ag.ht1 * S), 0, 0,
										4096, 4096)
							}
						} else {
							af.globalAlpha = 1;
							af.drawImage(w, s * (ag.s0 * ah + ag.s1 * S), s
									* (ag.t0 * ah + ag.t1 * S), s
									* (ag.ws0 * ah + ag.ws1 * S), s
									* (ag.ht0 * ah + ag.ht1 * S), 0, 0, 4096,
									4096)
						}
					}
				}
				af.restore()
			}
			ac++
		}
	}
	if (window.taccgl_requestAnimationFrame) {
		e.reqAnimFrameId = taccgl_requestAnimationFrame(taccgl_draw2d)
	}
}
function taccglObjFile() {
	this.onload = this.onreadystatechange = null;
	this.vready = "init";
	this.verror = false;
	this.loadmtl = true;
	this.read = function(a, c) {
		this.faces = Array(0);
		if (!taccgl.dddmode) {
			this.vready = this.verror = "ddmode";
			this.mtl = new taccglMtlFile();
			this.mtl.vready = this.mtl.verror = "ddmode";
			var b = this;
			setTimeout(function() {
				taccgl.doHook(b.onload, b)
			}, 1);
			return
		}
		if (!c) {
			c = false
		}
		if (window.taccgl_nocache) {
			var d = new Date().getTime();
			a += "?t=" + d
		}
		this.url = a;
		this.req = null;
		if ("ActiveXObject" in window) {
			this.req = new ActiveXObject("MSXML2.XMLHTTP.6.0")
		}
		if (!this.req) {
			this.req = new XMLHttpRequest()
		}
		this.req.open("GET", a, c);
		this.vready = "loading";
		if (c) {
			var e = this;
			this.req.onreadystatechange = function() {
				e.readyStateChange()
			}
		}
		this.req.send();
		if (!c) {
			this.processRequest(this.req);
			if (this.vready == "ready" && this.loadmtl) {
				this.mtl = new taccglMtlFile();
				this.mtl.read(this.mtlurl(), c)
			}
		}
	};
	this.ready = function() {
		return this.vready
	};
	this.error = function() {
		return this.verror
	};
	this.mtlurl = function() {
		if (/\//.test(this.url)) {
			return (this.url.replace(/^(.*)\/([^\/]+)$/, "$1/" + this.mtllib))
		} else {
			return this.mtllib
		}
	};
	this.readyStateChange = function() {
		taccgl.doHook(this.onreadystatechange, this);
		if (this.req.readyState == 4) {
			this.processRequest(this.req);
			if (this.vready == "ready" && this.loadmtl) {
				this.mtl = new taccglMtlFile();
				this.mtl.obj = this;
				this.mtl.read(this.mtlurl(), true);
				this.vready = "loading"
			} else {
				taccgl.doHook(this.onload, this)
			}
		}
	};
	this.initvb = function(a) {
		this.vb = new ArrayBuffer(a);
		this.vf = new Float32Array(this.vb);
		this.vbsize = a
	};
	this.resizevb = function() {
		var a = this.vf, d = this.vbsize;
		this.initvb(2 * d);
		var c, b = d / 4;
		for (c = 0; c < b; c++) {
			this.vf[c] = a[c]
		}
	};
	this.initfb = function(a) {
		this.fb = new ArrayBuffer(a);
		this.fi = new Int32Array(this.fb);
		this.fbsize = a
	};
	this.resizefb = function() {
		var d = this.fi, c = this.fbsize;
		this.initfb(2 * c);
		var b, a = c / 4;
		for (b = 0; b < a; b++) {
			this.fi[b] = d[b]
		}
	};
	this.initData = function() {
		var a = 100;
		this.initvb(a);
		this.initfb(a);
		this.facesMaterial = Array(0);
		this.objects = new this.createObjects();
		this.currentObject = null
	};
	this.createObject = function() {
	};
	this.createObjects = function() {
	};
	this.processRequest = function(b) {
		if (b.status != 200 && b.status != 0) {
			this.vready = "error";
			this.verror = b.statusText;
			return
		}
		this.initData();
		var c = 0, w = 0, u = 0, m = 0, l;
		var k = /(\#.*)|(mtllib .*)|(o .*)|(vt?n?) ([0-9.-]+) ([0-9.-]+)( ([0-9.-]*))?$|([0-9.-]+)|(usemtl .*)|(f .*)|(s .*)/gm;
		var o = /(\n)|([0-9-]+)(\/([0-9-]*)(\/([0-9-]+))?)?/g;
		var v, t;
		var j = b.responseText;
		while ((v = k.exec(j)) != null) {
			if (v[4]) {
				var g = parseFloat(v[5]);
				var f = parseFloat(v[6]);
				var e = parseFloat(v[7]);
				if (v[4] == "v") {
					l = c * 9;
					c++
				}
				if (v[4] == "vt") {
					l = 3 + w * 9;
					w++
				}
				if (v[4] == "vn") {
					l = 6 + u * 9;
					u++
				}
				if (4 * l + 12 >= this.vbsize) {
					this.resizevb()
				}
				this.vf[l] = g;
				this.vf[l + 1] = f;
				this.vf[l + 2] = e
			}
			if (v[11]) {
				this.faces.push(m);
				this.facesMaterial.push(i);
				while ((t = o.exec(v[11])) != null && t[1] == null) {
					var d = parseInt(t[2]);
					var s = parseInt(t[4]);
					if (isNaN(s)) {
						s = 0
					}
					var h = parseInt(t[6]);
					if (isNaN(h)) {
						h = 0
					}
					if (12 * m + 12 >= this.fbsize) {
						this.resizefb()
					}
					this.fi[3 * m] = d;
					if (d < 0) {
						alert("Cannot handle negative vertex index")
					}
					this.fi[3 * m + 1] = s;
					this.fi[3 * m + 2] = h;
					m++
				}
			} else {
				if (v[3]) {
					var q = v[3].replace(/o /, "");
					if (this.currentObject) {
						this.currentObject.endFace = this.faces.length - 1;
						this.currentObject.endf = m;
						this.currentObject.endv = w;
						this.currentObject.endvn = u;
						this.currentObject.endvt = w
					}
					this.objects[q] = this.currentObject = new this.createObject();
					this.currentObject.startFace = this.faces.length;
					this.currentObject.bgf = m;
					this.currentObject.bgv = w;
					this.currentObject.bgvn = u;
					this.currentObject.bgvt = w
				} else {
					if (v[10]) {
						var i = v[10].replace(/usemtl /, "")
					} else {
						if (v[2]) {
							this.mtllib = v[2].replace(/mtllib /, "")
						}
					}
				}
			}
			if (k.lastIndex == 0) {
				return
			}
		}
		if (this.currentObject) {
			this.currentObject.endFace = this.faces.length - 1;
			this.currentObject.endf = m;
			this.currentObject.endv = w;
			this.currentObject.endvn = u;
			this.currentObject.endvt = w
		}
		this.faceNumber = m;
		this.vready = "ready"
	};
	this.scene = function() {
		var b = new taccgl.DDDObject(this, true);
		return b
	};
	this.objs = function(c) {
		var b = new taccgl.DDDObject(this, c);
		return b
	}
}
taccgl.objFile = function(a, b, d) {
	if (!this.initialized) {
		this.begin()
	}
	var c = new taccglObjFile();
	if (d) {
		c.onload = d
	}
	c.read(a, b);
	return (c)
};
function taccglMtlFile() {
	this.onload = this.onreadystatechange = null;
	this.vready = "init";
	this.verror = false;
	this.ready = function() {
		return this.vready
	};
	this.error = function() {
		return this.verror
	};
	this.read = function(a, b) {
		if (!b) {
			b = false
		}
		if (window.taccgl_nocache) {
			var c = new Date().getTime();
			a += "?t=" + c
		}
		this.req = null;
		if ("ActiveXObject" in window) {
			this.req = new ActiveXObject("MSXML2.XMLHTTP.6.0")
		}
		if (!this.req) {
			this.req = new XMLHttpRequest()
		}
		this.req.open("GET", a, b);
		if (b) {
			var d = this;
			this.req.onreadystatechange = function() {
				d.readyStateChange()
			}
		}
		this.req.send();
		if (!b) {
			this.processRequest(this.req)
		}
	};
	this.readyStateChange = function() {
		taccgl.doHook(this.onreadystatechange, this);
		if (this.req.readyState == 4) {
			this.processRequest(this.req);
			var a = this.obj;
			if (a) {
				a.vready = this.vready;
				taccgl.doHook(a.onload, a)
			} else {
				taccgl.doHook(this.onload, this)
			}
		}
	};
	this.initData = function() {
		this.materials = new this.createMaterials()
	};
	this.createMaterial = function() {
	};
	this.createMaterials = function() {
	};
	this.processRequest = function(i) {
		if (i.status != 200 && i.status != 0) {
			this.vready = "error";
			this.verror = i.statusText;
			return
		}
		this.initData();
		var b = /(\#.*)|(newmtl .*)|(Ns .*)|(Ni .*)|(Ka?d?s?) ([0-9.-]+) ([0-9.-]+) ([0-9.-]+)|(d .*)|(illum .*)/g;
		var j, d, k;
		var g = false;
		while ((j = b.exec(i.responseText)) != null) {
			if (j[5]) {
				var h = parseFloat(j[6]);
				var c = parseFloat(j[7]);
				var f = parseFloat(j[8]);
				if (j[5] == "Ka") {
					d.ambR = h;
					d.ambG = c;
					d.ambB = f;
					if (h > 0 || c > 0 || f > 0) {
						g = false
					}
				}
				if (j[5] == "Kd") {
					d.diffR = h;
					d.diffG = c;
					d.diffB = f
				}
				if (j[5] == "Ks") {
					d.specR = h;
					d.specG = c;
					d.specB = f
				}
			} else {
				if (j[3]) {
					k = j[3].replace(/Ns /, "");
					d.Ns = parseFloat(k)
				} else {
					if (j[4]) {
						k = j[4].replace(/Ni /, "");
						d.Ni = parseFloat(k)
					} else {
						if (j[2]) {
							var e = j[2].replace(/newmtl /, "");
							d = new this.createMaterial();
							this.materials[e] = d
						} else {
							if (j[10]) {
								k = j[10].replace(/illum /, "");
								d.illum = parseInt(k)
							} else {
								if (j[9]) {
									k = j[9].replace(/d /, "");
									k = k.replace(/Tr /, "");
									d.transp = parseFloat(k)
								} else {
									if (j[1]) {
										if (j[1].match(/Blender/)) {
											g = true
										}
									}
								}
							}
						}
					}
				}
			}
		}
		this.vready = "ready";
		if (g) {
			this.ambientAdjust(0.6, 0.6)
		}
	};
	this.defaultSpec = function(e, c, b) {
		var d, a;
		if (!b) {
			b = 0
		}
		for (d in this.materials) {
			a = this.materials[d];
			if (a.Ns <= b) {
				a.Ns = c;
				a.specR = a.specB = a.specG = e
			}
		}
	};
	this.ambientAdjust = function(c, g, b) {
		if (!g && g != 0) {
			g = 1
		}
		if (!b && b != 0) {
			b = 1
		}
		var e, a;
		for (e in this.materials) {
			a = this.materials[e];
			a.ambc = c;
			a.diffc = g;
			a.specc = b
		}
	}
}
taccgl.mtlFile = function(a, b) {
	var c = new taccglMtlFile();
	c.read(a, b);
	return (c)
};
function taccgl3DObjectPrototype() {
	this.initSuper = taccgl.taccglAnim.prototype.init;
	this.init = function(a) {
		this.initSuper(a);
		this.objt = null;
		this.dz0 = this.dz1 = this.hy0;
		this.flags = 16;
		this.docolor = true;
		this.col0s = -32768;
		this.col0t = -32768;
		this.col1s = -32768;
		this.col1t = -32768;
		this.mix0 = 1;
		this.mix1 = 1;
		this.mixs0 = 0;
		this.mixs1 = 0;
		this.dddo0 = this.dddo1 = 1
	};
	this.actorInit = function(a) {
		this.init(a)
	};
	this.contInit = function(a) {
		this.init(a)
	};
	this.getModMat = function() {
		if (!this.objt) {
			this.objt = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ]
		}
		return this.objt
	};
	this.setModMat = function(a) {
		this.objt = a;
		return this
	};
	this.dMMVertex = function(c) {
		var b = (c - 1) * 9;
		var a = this.ofi.vf[b];
		var e = this.ofi.vf[b + 1];
		var d = this.ofi.vf[b + 2];
		if (a < this.obj_xmin) {
			this.obj_xmin = a
		}
		if (e < this.obj_ymin) {
			this.obj_ymin = e
		}
		if (d < this.obj_zmin) {
			this.obj_zmin = d
		}
		if (a > this.obj_xmax) {
			this.obj_xmax = a
		}
		if (e > this.obj_ymax) {
			this.obj_ymax = e
		}
		if (d > this.obj_zmax) {
			this.obj_zmax = d
		}
	};
	this.dMMFace = function(c, b) {
		var a;
		for (a = c; a < b; a++) {
			this.dMMVertex(this.ofi.fi[3 * a])
		}
	};
	this.dMMFaces = function(c, b) {
		var a;
		for (a = c; a <= b; a++) {
			var d;
			if (a < this.ofi.faces.length - 1) {
				d = this.ofi.faces[a + 1]
			} else {
				d = this.ofi.faceNumber
			}
			this.dMMFace(this.ofi.faces[a], d)
		}
	};
	this.determineMinMax = function(a) {
		this.obj_xmax = -1e+39;
		this.obj_ymax = -1e+39;
		this.obj_zmax = -1e+39;
		this.obj_xmin = 1e+39;
		this.obj_ymin = 1e+39;
		this.obj_zmin = 1e+39;
		if (!a) {
			a = this.selObjects
		}
		if (a == true) {
			this.dMMFaces(0, this.ofi.faces.length - 1)
		} else {
			var d = new RegExp(a);
			var c;
			for (c in this.ofi.objects) {
				if (d.test(c)) {
					var b = this.ofi.objects[c];
					this.dMMFaces(b.startFace, b.endFace)
				}
			}
		}
	};
	this.makeFit = function(b, c, a) {
		this.modFit(c, b, a);
		return this
	};
	this.modFit = function(h, f, b) {
		if (!taccgl.dddmode) {
			this.objt = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ];
			return this
		}
		if (!f) {
			f = "xyz"
		}
		this.determineMinMax(b);
		if (!h) {
			this.objt = [ 1 / (this.obj_xmax - this.obj_xmin), 0, 0,
					-this.obj_xmin / (this.obj_xmax - this.obj_xmin), 0,
					1 / (this.obj_ymax - this.obj_ymin), 0,
					-this.obj_ymin / (this.obj_ymax - this.obj_ymin), 0, 0,
					1 / (this.obj_zmax - this.obj_zmin),
					-this.obj_zmin / (this.obj_zmax - this.obj_zmin), 0, 0, 0,
					1 ]
		} else {
			if (f.match(/x|X|y|Y|z|Z/)) {
				var e = 1e+39;
				var a;
				var g = Math.sqrt(this.hx0 * this.hx0 + this.hy0 * this.hy0
						+ this.hz0 * this.hz0);
				var d = Math.sqrt(this.wx0 * this.wx0 + this.wy0 * this.wy0
						+ this.wz0 * this.wz0);
				var c = Math.sqrt(this.dx0 * this.dx0 + this.dy0 * this.dy0
						+ this.dz0 * this.dz0);
				if (f.match(/x|X/)) {
					a = d / (this.obj_xmax - this.obj_xmin);
					if (a < e) {
						e = a
					}
				}
				if (f.match(/y|Y/)) {
					a = g / (this.obj_ymax - this.obj_ymin);
					if (a < e) {
						e = a
					}
				}
				if (f.match(/z|Z/)) {
					a = c / (this.obj_zmax - this.obj_zmin);
					if (a < e) {
						e = a
					}
				}
				this.objt = [ e / d, 0, 0, -this.obj_xmin * e / d, 0, e / g, 0,
						-this.obj_ymin * e / g, 0, 0, e / c,
						-this.obj_zmin * e / c, 0, 0, 0, 1 ];
				if (h.length < 3) {
					h += "   "
				}
				if (h[0].match(/r|b/)) {
					a = (this.obj_xmax - this.obj_xmin) * e / d;
					this.objt[3] += 1 - a
				} else {
					if (h[0].match(/L|T/)) {
						a = (this.obj_xmax - this.obj_xmin) * e / d;
						this.objt[3] += -a
					} else {
						if (h[0].match(/c/)) {
							a = (this.obj_xmax - this.obj_xmin) * e / d;
							this.objt[3] += -a / 2
						} else {
							if (h[0].match(/R|B/)) {
								a = (this.obj_xmax - this.obj_xmin) * e / d;
								this.objt[3] += 1
							} else {
								if (h[0].match(/m|M/)) {
									a = (this.obj_xmax - this.obj_xmin) * e
											* 0.5 / d;
									this.objt[3] += 0.5 - a
								} else {
									if (h[0].match(/C/)) {
										a = (this.obj_xmax - this.obj_xmin) * e
												* 0.5 / d;
										this.objt[3] += 1 - a
									} else {
										if (h[0].match(/s/)) {
											this.objt[3] = -this.obj_xmin
													/ (this.obj_xmax - this.obj_xmin);
											this.objt[0] = 1 / (this.obj_xmax - this.obj_xmin)
										} else {
											if (h[0].match(/S/)) {
												this.objt[3] = -this.obj_xmin
														/ (this.obj_xmax - this.obj_xmin)
														- 1;
												this.objt[0] = 1 / (this.obj_xmax - this.obj_xmin)
											}
										}
									}
								}
							}
						}
					}
				}
				if (h[1].match(/r|b/)) {
					a = (this.obj_ymax - this.obj_ymin) * e / g;
					this.objt[7] += 1 - a
				} else {
					if (h[1].match(/L|T/)) {
						a = (this.obj_ymax - this.obj_ymin) * e / g;
						this.objt[7] += -a
					} else {
						if (h[1].match(/c/)) {
							a = (this.obj_ymax - this.obj_ymin) * e / g;
							this.objt[7] += -a / 2
						} else {
							if (h[1].match(/B/)) {
								a = (this.obj_ymax - this.obj_ymin) * e * 0.5
										/ g;
								this.objt[7] += 1
							} else {
								if (h[1].match(/m|M/)) {
									a = (this.obj_ymax - this.obj_ymin) * e
											* 0.5 / g;
									this.objt[7] += 0.5 - a
								} else {
									if (h[1].match(/C/)) {
										a = (this.obj_ymax - this.obj_ymin) * e
												* 0.5 / g;
										this.objt[7] += 1 - a
									} else {
										if (h[1].match(/s/)) {
											this.objt[7] = -this.obj_ymin
													/ (this.obj_ymax - this.obj_ymin);
											this.objt[5] = 1 / (this.obj_ymax - this.obj_ymin)
										} else {
											if (h[1].match(/S/)) {
												this.objt[7] = -this.obj_ymin
														/ (this.obj_ymax - this.obj_ymin)
														- 1;
												this.objt[5] = 1 / (this.obj_xmax - this.obj_xmin)
											}
										}
									}
								}
							}
						}
					}
				}
				if (h[2].match(/b/)) {
					a = (this.obj_zmax - this.obj_zmin) * e / c;
					this.objt[11] += 1 - a
				} else {
					if (h[2].match(/c/)) {
						a = (this.obj_zmax - this.obj_zmin) * e / c;
						this.objt[11] += -a / 2
					} else {
						if (h[2].match(/F/)) {
							a = (this.obj_zmax - this.obj_zmin) * e / c;
							this.objt[11] += -a
						} else {
							if (h[2].match(/m/)) {
								a = (this.obj_zmax - this.obj_zmin) * e * 0.5
										/ c;
								this.objt[11] += 0.5 - a
							} else {
								if (h[2].match(/C/)) {
									a = (this.obj_zmax - this.obj_zmin) * e
											* 0.5 / c;
									this.objt[11] += 1 - a
								} else {
									if (h[2].match(/B/)) {
										a = (this.obj_zmax - this.obj_zmin) * e
												* 0.5 / c;
										this.objt[11] += 1
									} else {
										if (h[2].match(/s/)) {
											this.objt[11] = -this.obj_zmin
													/ (this.obj_zmax - this.obj_zmin);
											this.objt[10] = 1 / (this.obj_zmax - this.obj_zmin)
										} else {
											if (h[2].match(/S/)) {
												this.objt[11] = -this.obj_zmin
														/ (this.obj_zmax - this.obj_zmin)
														- 1;
												this.objt[10] = 1 / (this.obj_zmax - this.obj_zmin)
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return this
	};
	this.opacity3D = function(b, a) {
		if (typeof (b) == "number") {
			this.dddo0 = b;
			this.dddo1 = b
		}
		if (typeof (a) == "number") {
			this.dddo1 = a
		}
	};
	this.cont = function() {
		var a = new taccgl.DDDObject(this.ofi, this.selObjects);
		a.contInit(this.el);
		a.objt = this.objt.slice(0);
		if (this.elshowatend) {
			this.contShiftAtEndAction(a)
		}
		this.contIntern(a);
		return (a)
	};
	this.getVertexCoord = function(d) {
		var b = (d - 1) * 9;
		var e = this.ofi.vf[b];
		var f = this.ofi.vf[b + 1];
		var a = this.ofi.vf[b + 2];
		var c = this.objt0;
		this.ox = e * c[0] + f * c[1] + a * c[2] + c[3];
		this.oy = e * c[4] + f * c[5] + a * c[6] + c[7];
		this.oz = e * c[8] + f * c[9] + a * c[10] + c[11]
	};
	this.startVertex = function(d, q, i) {
		var p = (d - 1) * 9;
		var c = this.ofi.vf[p];
		var o = this.ofi.vf[p + 1];
		var w = this.ofi.vf[p + 2];
		var n = this.objt0;
		var h = c * n[0] + o * n[1] + w * n[2] + n[3];
		var g = c * n[4] + o * n[5] + w * n[6] + n[7];
		var f = c * n[8] + o * n[9] + w * n[10] + n[11];
		n = this.objt1;
		var r = c * n[0] + o * n[1] + w * n[2] + n[3];
		var b = c * n[4] + o * n[5] + w * n[6] + n[7];
		var m = c * n[8] + o * n[9] + w * n[10] + n[11];
		var v = 0, u = 0, s = 0, e = this.flightSpecular + this.flightShininess;
		if (i) {
			p = (i - 1) * 9;
			c = this.ofi.vf[p + 6];
			o = this.ofi.vf[p + 6 + 1];
			w = this.ofi.vf[p + 6 + 2];
			n = this.objt0inv;
			v = c * n[0] + o * n[1] + w * n[2];
			u = c * n[3] + o * n[4] + w * n[5];
			s = c * n[6] + o * n[7] + w * n[8]
		} else {
			v = this.nx;
			u = this.ny;
			s = this.nz
		}
		var a = this.s0, k = this.t0;
		var l = this.mix0;
		if (q) {
			p = (q - 1) * 9;
			a += this.ofi.vf[p + 3] * this.ws0;
			k += (1 - this.ofi.vf[p + 4]) * this.ht0;
			l = 1
		}
		taccgl.nvertMove(h, g, f, r, b, m, v, u, s, e, a, k, this.fflags,
				this.basetime, this.vduration);
		if (this.rotation) {
			taccgl.nvertRot(this.rotpx, this.rotpy, this.rotpz, this.rotax,
					this.rotay, this.rotaz, this.rotfrom, this.rotto)
		}
		if (this.doacceleration) {
			taccgl.nvertAcceleration(this.ax, this.ay, this.az)
		}
	};
	this.startTriangle = function(u, m, n, t, s, d, r, h, i) {
		if (n == 0 || d == 0 || i == 0) {
			this.getVertexCoord(u);
			var l = this.ox;
			var k = this.oy;
			var j = this.oz;
			this.getVertexCoord(t);
			var q = this.ox;
			var p = this.oy;
			var o = this.oz;
			this.getVertexCoord(r);
			var g = this.ox;
			var f = this.oy;
			var e = this.oz;
			this.nx = (p - k) * (e - j) - (o - j) * (f - k);
			this.ny = (o - j) * (g - l) - (q - l) * (e - j);
			this.nz = (q - l) * (f - k) - (p - k) * (g - l)
		}
		this.startVertex(u, m, n);
		this.startVertex(t, s, d);
		this.startVertex(r, h, i);
		taccgl.nvertColor3(this.fcol0s, this.fcol0t, this.fcol1s, this.fcol1t,
				this.fmix0, this.fmix1, this.fmixs0, this.fmixs1)
	};
	this.startMapElement = function() {
		var a = taccgl;
		if (!this.dotexmove) {
			this.s1 = this.s0;
			this.t1 = this.t0;
			this.ws1 = this.ws0;
			this.ht1 = this.ht0
		}
		a.nvertOffset(-5);
		a.nvertTexMove4(this.s0, this.t0 + this.ht0, this.s1, this.t1
				+ this.ht1);
		a.nvertOffset(1);
		a.nvertTexMove4(this.s0 + this.ws0, this.t0 + this.ht0, this.s1
				+ this.ws1, this.t1 + this.ht1);
		a.nvertOffset(1);
		a.nvertTexMove4(this.s0 + this.ws0, this.t0, this.s1 + this.ws1,
				this.t1);
		a.nvertOffset(1);
		a.nvertTexMove4(this.s0, this.t0 + this.ht0, this.s1, this.t1
				+ this.ht1);
		a.nvertOffset(1);
		a.nvertTexMove4(this.s0 + this.ws0, this.t0, this.s1 + this.ws1,
				this.t1);
		a.nvertOffset(1);
		a.nvertTexMove4(this.s0, this.t0, this.s1, this.t1)
	};
	this.startFace = function(l, g, e) {
		var f;
		var a = this.ofi.mtl.materials;
		var c = null;
		if (a) {
			c = a[e]
		}
		if (e == "HTML") {
			if (g - l == 4 || this.ofi.fi[3 * l + 1] != 0) {
				c = null
			}
		}
		if (c) {
			var p, d, o;
			if (!c.ambc) {
				p = 0
			} else {
				p = c.ambc
			}
			if (!c.diffc && c.diffc != 0) {
				d = 1
			} else {
				d = c.diffc
			}
			if (!c.specc && c.specc != 0) {
				o = 1
			} else {
				o = c.specc
			}
			var h = c.ambR + c.diffR * p;
			var n = c.ambG + c.diffG * p;
			var b = c.ambB + p * c.diffB;
			if (h > 1) {
				h = 1
			}
			if (n > 1) {
				n = 1
			}
			if (b > 1) {
				b = 1
			}
			this.fflags = (this.flags | 48) & ~64;
			this.fcol0s = Math.floor(h * 255) + 256
					* (Math.floor(n * 255) - 128);
			this.fcol0t = this.dddo0 * 255 + 256 * (Math.floor(255 * b) - 128);
			this.fcol1s = Math.floor(d * c.diffR * 255) + 256
					* (Math.floor(d * c.diffG * 255) - 128);
			this.fcol1t = this.dddo1 * 255 + 256
					* (Math.floor(d * 255 * c.diffB) - 128);
			this.flightSpecular = Math.min((c.specR + c.specG + c.specB) / 3,
					0.999)
					* o;
			this.flightShininess = Math.round(c.Ns);
			this.fmix0 = 0;
			this.fmix1 = 0;
			this.fmixs0 = 0;
			this.fmixs1 = 0
		} else {
			this.fflags = this.flags;
			this.fcol0s = this.col0s;
			this.fcol0t = this.col0t;
			this.fcol1s = this.col1s;
			this.fcol1t = this.col1t;
			this.flightSpecular = this.lightSpecular;
			this.flightShininess = Math.round(this.lightShininess);
			this.fmix0 = this.mix0;
			this.fmix1 = this.mix1;
			this.fmixs0 = this.mixs0;
			this.fmixs1 = this.mixs1
		}
		for (f = l + 2; f < g; f++) {
			this.startTriangle(this.ofi.fi[3 * l], this.ofi.fi[3 * l + 1],
					this.ofi.fi[3 * l + 2], this.ofi.fi[3 * (f - 1)],
					this.ofi.fi[3 * (f - 1) + 1], this.ofi.fi[3 * (f - 1) + 2],
					this.ofi.fi[3 * f], this.ofi.fi[3 * f + 1],
					this.ofi.fi[3 * f + 2])
		}
		if (g - l == 4 && e == "HTML" && this.ofi.fi[3 * l + 1] == 0) {
			this.startMapElement()
		}
	};
	this.startFaces = function(c, b) {
		var a;
		for (a = c; a <= b; a++) {
			var d;
			if (a < this.ofi.faces.length - 1) {
				d = this.ofi.faces[a + 1]
			} else {
				d = this.ofi.faceNumber
			}
			this.startFace(this.ofi.faces[a], d, this.ofi.facesMaterial[a])
		}
	};
	this.start = function() {
		if (!taccgl.dddmode) {
			return this
		}
		var d = null, a = taccgl;
		if (this.astepdelno == a.delno) {
			d = a.vertI;
			a.vertI = this.vertindex
		} else {
			this.vertindex = a.vertI;
			this.astepdelno = a.delno
		}
		var b = this.vduration + this.basetime;
		if (taccgl.duration < b) {
			taccgl.setDuration(b)
		}
		if (this.special) {
			this.startSpecial()
		}
		if (!this.objt) {
			this.objt = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ]
		}
		this.objt0 = taccgl.m44Mul([ this.wx0, this.hx0, this.dx0, this.x0,
				this.wy0, this.hy0, this.dy0, this.y0, this.wz0, this.hz0,
				this.dz0, this.z0, 0, 0, 0, 1 ], this.objt);
		this.objt1 = taccgl.m44Mul([ this.wx1, this.hx1, this.dx1, this.x1,
				this.wy1, this.hy1, this.dy1, this.y1, this.wz1, this.hz1,
				this.dz1, this.z1, 0, 0, 0, 1 ], this.objt);
		this.objt0inv = taccgl.m33T(taccgl.m33Inverse(taccgl
				.m33FromM44(this.objt0)));
		if (this.selObjects == true) {
			this.startFaces(0, this.ofi.faces.length - 1)
		} else {
			var g = new RegExp(this.selObjects);
			var f;
			for (f in this.ofi.objects) {
				if (g.test(f)) {
					var c = this.ofi.objects[f];
					this.startFaces(c.startFace, c.endFace)
				}
			}
		}
		this.vertEndIndex = a.vertI;
		if (d) {
			a.vertI = d
		}
		if (this.p != a.stdsc) {
			a.setShader(a.stdsc)
		}
		return this
	};
	this.clone = function(b) {
		return new this.taccglDDDObjectClone(this)
	};
	this.taccglDDDObjectClone = function(b) {
		this.taccglAnimClone(b);
		this.objt = b.objt.slice(0);
		this.dddo0 = b.dddo0;
		this.dddo1 = b.dddo1;
		this.obj_xmin = b.obj_xmin;
		this.obj_ymin = b.obj_ymin;
		this.obj_zmin = b.obj_zmin;
		this.obj_xmax = b.obj_xmax;
		this.obj_ymax = b.obj_ymax;
		this.obj_zmax = b.obj_zmax;
		this.ofi = b.ofi;
		this.selObjects = b.selObjects
	}
}
taccgl.DDDObject = function(b, a) {
	this.ofi = b;
	this.selObjects = a
};
taccgl3DObjectPrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.DDDObject.prototype = new taccgl3DObjectPrototype();
taccgl.DDDObject.prototype.taccglDDDObjectClone.prototype = taccgl.DDDObject.prototype;
function taccglControllerPrototype() {
	this.baseinit = function() {
		this.can = document.getElementById("taccgl_canvas3d");
		if (!taccgl.overs) {
			taccgl.overs = new Array(0)
		}
		this.automaticMouseMoveOut = true
	};
	this.init = function() {
		this.baseinit()
	};
	this.attachEventForwarding = function() {
	};
	this.detachEventForwarding = function() {
	};
	this.attach = function() {
		this.baseAttach()
	};
	this.baseAttach = function() {
		this.can = document.getElementById("taccgl_canvas3d");
		this.attachEventForwarding()
	};
	this.detach = function() {
		this.baseDetach()
	};
	this.baseDetach = function() {
		this.detachEventForwarding()
	};
	this.instMouseOverFilterClass = function(g, f, a, b) {
		if (!document.getElementsByClassName) {
			return
		}
		var e = document.getElementsByClassName(g);
		for (var d = 0; d < e.length; d++) {
			this.instMouseOverFilter(e[d], f, a, b)
		}
	};
	this.elstr = function(a) {
		if (!a) {
			return a + ""
		}
		var b = "";
		if (a.tagName) {
			b += a.tagName
		}
		b += "#";
		if (a.id && a.id + "" != "undefined") {
			b += a.id
		}
		b += " ";
		return b
	};
	this.instMouseOverFilter = function(g, f, b, d) {
		if (typeof (g) == "string") {
			g = document.getElementById(g)
		}
		var e = g.onmouseover;
		var c = g.onmouseout;
		var a = this;
		if (!d) {
			d = 0
		}
		if (e && !e.istaccglfilter) {
			g.onmouseover = function(j) {
				if (!j) {
					j = window.event
				}
				a.prevFound = j.target;
				if (!j.fromElement || j.fromElement.id != "taccgl_canvas3d") {
					var h = 0;
					while (h < taccgl.overs.length && taccgl.overs[h] != g) {
						h++
					}
					if (h < taccgl.overs.length) {
						if (f) {
							return
						}
					} else {
						taccgl.overs.push(g)
					}
					if (d == 0) {
						e(j)
					} else {
						if (g.outTimer) {
							clearTimeout(g.outTimer);
							g.outTimer = null
						} else {
							g.overTimer = setTimeout(function() {
								g.overTimer = null;
								e(j)
							}, d)
						}
					}
				}
			};
			g.onmouseover.istaccglfilter = true
		}
		if (c && !c.istaccglfilter) {
			g.onmouseout = function(j) {
				if (!j) {
					j = window.event
				}
				if (!j.toElement || j.toElement.id != "taccgl_canvas3d") {
					if (a.prevFound == g) {
						a.prevFound = null
					}
					var h = 0;
					while (h < taccgl.overs.length && taccgl.overs[h] != g) {
						h++
					}
					if (h >= taccgl.overs.length) {
						if (b) {
							return
						}
					} else {
						taccgl.overs.splice(h, 1)
					}
					if (d == 0) {
						c(j)
					} else {
						if (g.overTimer) {
							clearTimeout(g.overTimer);
							g.overTimer = null
						} else {
							g.outTimer = setTimeout(function() {
								g.outTimer = null;
								c(j)
							}, d)
						}
					}
				}
			};
			g.onmouseout.istaccglfilter = true
		}
	};
	this.bodyOnMouseMove = function(h) {
		if (!h) {
			h = window.event
		}
		if (!this.automaticMouseMoveOut) {
			return
		}
		if (!document.createEvent) {
			return
		}
		var g = h.target;
		if (!g) {
			h = h.srcElement
		}
		if (g && g.id && g.id == "taccgl_canvas3d") {
			return
		}
		var d = new Array(0);
		while (g) {
			d.push(g);
			g = g.parentElement
		}
		var c = 0;
		while (c < taccgl.overs.length) {
			var a = 0;
			while (a < d.length && d[a] != taccgl.overs[c]) {
				a++
			}
			if (a >= d.length) {
				var b = taccgl.overs[c];
				if (document.createEvent) {
					var f = document.createEvent("MouseEvents");
					f.initMouseEvent("mouseout", h.cancelBubble, h.cancelable,
							h.view, h.detail, h.screenX, h.screenY, h.clientX,
							h.clientY, h.ctrlKey, h.altKey, h.shiftKey,
							h.metaKey, h.button, h.target);
					taccgl.overs[c].dispatchEvent(f);
					f = document.createEvent("MouseEvents");
					f
							.initMouseEvent("mouseleave", h.cancelBubble,
									h.cancelable, h.view, h.detail, h.screenX,
									h.screenY, h.clientX, h.clientY, h.ctrlKey,
									h.altKey, h.shiftKey, h.metaKey, h.button,
									h.target);
					b.dispatchEvent(f)
				}
				if (taccgl.overs[c] == b) {
					taccgl.overs.splice(c, 1)
				}
			} else {
				c++
			}
		}
	}
}
function taccglForwardingControllerPrototype() {
	this.init = function() {
		this.baseinit()
	};
	this.invisibleCanvas = function() {
	};
	this.attachEventForwarding = function() {
		var a = this;
		if (this.can) {
			this.can.onclick = function(b) {
				a.fwonclick(b, "click")
			};
			this.can.ondblclick = function(b) {
				a.fwonclick(b, "dblclick")
			};
			this.can.onmouseup = function(b) {
				a.fwonclick(b, "mouseup")
			};
			this.can.onmousedown = function(b) {
				a.fwonclick(b, "mousedown")
			};
			this.can.onmousemove = function(b) {
				a.fwonmousemove(b)
			};
			this.can.style.pointerEvents = "none"
		}
	};
	this.detachEventForwarding = function() {
		if (this.can) {
			this.can.onclick = this.can.ondblclick = this.can.onmouseup = this.can.onmousedown = this.can.onmousemove = null;
			this.can.style.pointerEvents = "all"
		}
	};
	this.findElement = function(a, h, d, g, f, e, b, c) {
		this.can.style.visibility = "hidden";
		this.foundEl = document.elementFromPoint(a, h);
		this.can.style.visibility = "visible"
	};
	this.fwonclick = function(c, a) {
		this.foundEl = null;
		this.findElement(c.clientX, c.clientY);
		var b = document.createEvent("MouseEvents");
		b.initMouseEvent(a, c.cancelBubble, c.cancelable, c.view, c.detail,
				c.screenX, c.screenY, c.clientX, c.clientY, c.ctrlKey,
				c.altKey, c.shiftKey, c.metaKey, c.button, c.relatedTarget);
		b.toElement = this.foundEl;
		if (this.foundEl) {
			this.foundEl.dispatchEvent(b)
		}
	};
	this.fwonmouseout = function(c, a) {
		var b = document.createEvent("MouseEvents");
		b.initMouseEvent("mouseout", c.cancelBubble, c.cancelable, c.view,
				c.detail, c.screenX, c.screenY, c.clientX, c.clientY,
				c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button,
				this.foundEl);
		a.dispatchEvent(b);
		b = document.createEvent("MouseEvents");
		b.initMouseEvent("mouseleave", c.cancelBubble, c.cancelable, c.view,
				c.detail, c.screenX, c.screenY, c.clientX, c.clientY,
				c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button,
				this.foundEl);
		a.dispatchEvent(b)
	};
	this.fwonmouseover = function(c, a) {
		var b = document.createEvent("MouseEvents");
		b.initMouseEvent("mouseover", c.cancelBubble, c.cancelable, c.view,
				c.detail, c.screenX, c.screenY, c.clientX, c.clientY,
				c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button,
				this.prevFound);
		a.dispatchEvent(b);
		b = document.createEvent("MouseEvents");
		b.initMouseEvent("mouseenter", c.cancelBubble, c.cancelable, c.view,
				c.detail, c.screenX, c.screenY, c.clientX, c.clientY,
				c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button,
				this.prevFound);
		a.dispatchEvent(b)
	};
	this.fwonmousemove = function(b) {
		this.foundEl = null;
		this.findElement(b.clientX, b.clientY);
		this.doHoverChain(b, this.prevFound, this.foundEl);
		if (this.foundEl) {
			var a = document.createEvent("MouseEvents");
			a.initMouseEvent("move", b.cancelBubble, b.cancelable, b.view,
					b.detail, b.screenX, b.screenY, b.clientX, b.clientY,
					b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button,
					b.relatedTarget);
			a.toElement = this.foundEl;
			this.foundEl.dispatchEvent(a)
		}
		this.prevFound = this.foundEl
	};
	this.matchesOnElement = function(p, d) {
		var b = /(,?([A-Za-z0-9][-_A-Za-z0-9]*))|(\.([A-Za-z0-9][-_A-Za-z0-9]*))|(#([A-Za-z0-9][-_A-Za-z0-9]*))|(:([A-Za-z0-9][-_A-Za-z0-9]*))/g;
		var n = d.tagName.toLowerCase(), c = d.id, h = false, f = false, m = false, i = false, g = false, o = false, k, j = d.className
				.toLowerCase();
		while ((k = b.exec(p)) != null) {
			if (k[1]) {
				i = true;
				if (k[2].toLowerCase() == n) {
					h = true
				}
			} else {
				if (k[3]) {
					g = true;
					var e = k[4].toLowerCase();
					if (e == j || j.indexOf(" " + e) != -1
							|| j.indexOf(e + " ") != -1) {
						o = true
					}
				} else {
					if (k[5]) {
						f = true;
						if (k[6] == c) {
							m = true
						}
					}
				}
			}
		}
		return ((f && m) || (!f && ((((i && h) || !i) && (!g || o)))))
	};
	this.styleText = function(d) {
		var c = d.cssText;
		var e = /{([^}]*)}/g;
		var b = e.exec(c);
		if (!b) {
			return ""
		}
		if (!b[1]) {
			return ""
		}
		return b[1]
	};
	this.doHoverChain = function(h, a, d) {
		var i = new Array(0), f = new Array(0), b = a, j = d;
		while (b) {
			i.push(b);
			b = b.parentElement
		}
		while (j) {
			f.push(j);
			j = j.parentElement
		}
		var c = f.length, g = i.length;
		while (c > 0 && g > 0 && i[g] === f[c]) {
			c--;
			g--
		}
		while (g > 0) {
			g--;
			this.unHover(h, i[g])
		}
		while (c > 0) {
			c--;
			this.doHover(h, f[c])
		}
	};
	this.doHover = function(h, b) {
		this.fwonmouseover(h, b);
		var g, l = document.styleSheets;
		if (b.tagName.toLowerCase() == "a") {
			this.can.style.cursor = "pointer"
		}
		for (g = 0; g < l.length; g++) {
			var m = l[g], f;
			var d = m.cssRules;
			for (f = 0; f < d.length; f++) {
				var a = d[f], k = a.selectorText;
				if (a.type == a.STYLE_RULE && k.match(/:hover/)) {
					if (this.matchesOnElement(k, b)) {
						if (!b.taccglNoHoverStyle) {
							b.taccglNoHoverStyle = b.style.cssText
						}
						var c = this.styleText(a);
						if (b.tagName.toLowerCase() == "a") {
							this.can.style.cursor = "pointer";
							c = "cursor:pointer;" + c
						}
						b.style.cssText = b.taccglNoHoverStyle + ";" + c
					}
				}
			}
		}
	};
	this.unHover = function(b, a) {
		if (!a) {
			return
		}
		this.fwonmouseout(b, a);
		if (a.taccglNoHoverStyle || a.taccglNoHoverStyle == "") {
			a.style.cssText = a.taccglNoHoverStyle
		}
		a.taccglNoHoverStyle = null;
		this.can.style.cursor = ""
	}
}
taccgl.createController = function() {
	this.init()
};
taccgl.createController.prototype = new taccglControllerPrototype();
taccglForwardingControllerPrototype.prototype = new taccglControllerPrototype();
taccgl.createForwardingController = function() {
	this.init()
};
taccgl.createForwardingController.prototype = new taccglForwardingControllerPrototype();
taccgl.blockingController = function() {
	return new this.createController()
};
taccgl.forwardingController = function() {
	return new this.createForwardingController()
};
function taccgl3DCanvasPrototype() {
	this.init = function() {
	}
}
taccgl.createDDDCanvas = function() {
	this.init()
};
taccgl.createDDDCanvas.prototype = new taccgl3DCanvasPrototype();
taccgl.useController = function(a) {
	if (!this.initialized) {
		this.begin()
	}
	this.controller.detach();
	this.previousController = this.controller;
	this.controller = a;
	this.controller.attach()
};
function taccglTransformControllerPrototype() {
	this.init = function() {
		this.baseinit();
		this.rcx = 500;
		this.rcy = 500;
		this.rcz = 0;
		this.vexitOnMouseout = false
	};
	this.attachEventForwarding = function() {
		var c = this;
		var b = document.getElementById("taccgl_mouseTrap");
		if (!b) {
			if (document.body.insertAdjacentHTML) {
				document.body
						.insertAdjacentHTML(
								"afterbegin",
								"<div id='taccgl_mouseTrap' style=\"cursor:crosshair;xbackground-color:rgba(100,0,0,0.5); height:100%; width:100%; position:fixed;z-index:9999; display:none\"></div>")
			}
		}
		b = document.getElementById("taccgl_mouseTrap");
		if (!b) {
			return
		}
		b.onmousedown = function(d) {
			c.tronmousedown(d)
		};
		b.onmouseup = function(d) {
			c.tronmouseup(d)
		};
		b.onmousemove = function(d) {
			c.tronmousemove(d)
		};
		b.onclick = function(d) {
			c.tronclick(d)
		};
		b.oncontextmenu = function() {
			return false
		};
		b.style.display = "";
		var a = b.clientWidth;
		b.style.opacity = 1
	};
	this.detachEventForwarding = function() {
		var a = document.getElementById("taccgl_mouseTrap");
		if (a) {
			a.style.display = "none";
			a.style.opacity = 0
		}
	};
	this.rotationCenter = function(a, c, b) {
		this.rcx = a;
		this.rcy = c;
		this.rcz = b
	};
	this.mouseBox = function(a, c, b, d) {
		this.mbxmin = a;
		this.mbxmax = c;
		this.mbymin = b;
		this.mbymax = d
	};
	this.exitOnMouseout = function(a) {
		if (a != false) {
			a = true
		}
		this.vexitOnMouseout = a
	};
	this.tronmousedown = function(a) {
		if (!a) {
			a = event
		}
		this.vexitOnMouseout = false;
		this.cX = a.clientX;
		this.cY = a.clientY;
		this.button = a.which;
		this.IM = taccgl.m44T(taccgl.TM.slice());
		a.cancelBubble = true;
		if (a.stopPropagation) {
			a.stopPropagation()
		}
		return false
	};
	this.tronmousemove = function(f) {
		if (this.vexitOnMouseout) {
			var b = f.pageX;
			var h = f.pageY;
			if (b > this.mbxmax || b < this.mbxmin || h > this.mbymax
					|| h < this.mbymin) {
				this.doexit()
			}
		}
		if (this.button == 1 || this.button == 3) {
			var c = f.clientX - this.cX, a = f.clientY - this.cY;
			if (f.shiftKey) {
				c /= 10;
				a /= 10
			}
			if (this.button == 1 && !f.ctrlKey) {
				var d = taccgl.m33Rotation(-c / 300 * Math.PI, 0, 1, 0);
				d = taccgl.m33Mul(d, taccgl.m33Rotation(a / 300 * Math.PI, 1,
						0, 0));
				var g = taccgl.m44MulV(this.IM, [ this.rcx, this.rcy, this.rcz,
						1 ]);
				this.TM = taccgl.m44Mul(taccgl.m44FromM33(d, g[0], g[1], g[2]),
						taccgl.m44Translation(-g[0], -g[1], -g[2]))
			} else {
				if (this.button == 1 && f.ctrlKey) {
					var d = taccgl.m33Rotation(c / 300 * Math.PI, 0, 1, 0);
					d = taccgl.m33Mul(d, taccgl.m33Rotation(a / 300 * Math.PI,
							0, 0, 1));
					var g = taccgl.m44MulV(this.IM, [ this.rcx, this.rcy,
							this.rcz, 1 ]);
					this.TM = taccgl.m44Mul(taccgl.m44FromM33(d, g[0], g[1],
							g[2]), taccgl.m44Translation(-g[0], -g[1], -g[2]))
				} else {
					if (this.button == 3 && !f.ctrlKey) {
						this.TM = taccgl.m44Translation(c, a, 0)
					} else {
						if (this.button == 3 && f.ctrlKey) {
							this.TM = taccgl.m44Translation(c, 0, -a * 10)
						}
					}
				}
			}
			taccgl.setTM(taccgl.m44T(taccgl.m44Mul(this.TM, this.IM)))
		}
		f.cancelBubble = true;
		if (f.stopPropagation) {
			f.stopPropagation()
		}
		return false
	};
	this.tronmouseup = function(a) {
		this.button = 0;
		a.cancelBubble = true;
		if (a.stopPropagation) {
			a.stopPropagation()
		}
		return false
	};
	this.tronclick = function(c) {
		var b = c.clientX - this.cX, a = c.clientY - this.cY;
		if (b == 0 && a == 0) {
			this.doexit()
		}
		c.cancelBubble = true;
		if (c.stopPropagation) {
			c.stopPropagation()
		}
		return false
	};
	this.doexit = function() {
		this.nextController = taccgl.previousController;
		taccgl.doHook(this.onTerm);
		if (this.nextController) {
			taccgl.useController(this.nextController)
		}
	};
	this.onTerm = null
}
taccglTransformControllerPrototype.prototype = taccglForwardingControllerPrototype.prototype;
taccgl.createTransformController = function() {
	this.init()
};
taccgl.createTransformController.prototype = new taccglTransformControllerPrototype();
taccgl.transformController = function() {
	return new this.createTransformController()
};