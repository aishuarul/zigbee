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

var taccgl_epwarning=
/*    M E D I C A L     W A R N I N G   
      Note that taccgl allows you to add fast flashing and video game like animations to web pages. A small percentage of 
      the population may experience epileptic symptoms when exposed to such animations. You might want to, or you may even 
      be required to, add / show an epileptic warning message on your web site before showing such animations and you might 
      want to or you may even be required to avoid certain types of animations on your web site. Please protect yourself 
      when programming animations and protect the users of your web site and take the following warning message seriously:  
*/
"     EPILEPSY WARNING, READ BEFORE VIEWING THE FOLLOWING ANIMATIONS,                                                       "+
"     BEFORE USING A VIDEO GAME SYSTEM, BEFORE PROGRAMMING, WATCHING AND PUTTING ANIMATIONS ONLINE                          "+
"                                                                                                                           "+ 
"     MEDICAL RESEARCH INDICATES A SMALL PERCENTAGE OF THE POPULATION MAY EXPERIENCE EPILEPTIC SEIZURES OR SEIZURE-LIKE     "+
"     SYMPTOMS  EXPOSED TO CERTAIN STIMULI, INCLUDING, WITHOUT LIMITATION, LIGHT PATTERNS, FLASHING LIGHTS OR CERTAIN       "+
"     PATTERNS OF BACKGROUND ON A TELEVISION SCREEN, OR VIDEO MONITOR. EXPOSURE TO THESE STIMULI WHILE PLAYING VIDEO GAMES  "+
"     OR WATCHING ANIMATIONS MAY INDUCE AN EPILEPTIC SEIZURE OR SEIZURE LIKE SYMPTOMS IN THESE INDIVIDUALS. CERTAIN         "+
"     CONDITIONS MAY INDUCE EPILEPTIC SYMPTOMS EVEN IN PERSONS WHO HAVE NO PRIOR HISTORY OF SEIZURES OF EPILEPSY. IF YOU    "+
"     EXPERIENCE ANY OF THE FOLLOWING SYMPTOMS WHILE PLAYING A VIDEO GAME OR WATCH ANIMATIONS --- DIZZINESS, ALTERED VISION,"+
"     EYE OR MUSCLE TWITCHES, LOSS OF AWARENESS, DISORIENTATION, AND INVOLUNTARY MOVEMENT OR CONVULSIONS ---                "+
"     IMMEDIATELY DISCONTINUE USE AND CONSULT YOUR PHYSICAN BEFORE PLAY OR WATCHING ANIMATIONS.                             ";
 
// var taccgl_texCanWidth=1200; 
// var taccgl_texCanHeight=2048;
// var taccgl_texCanWidth=512;
// var taccgl_texCanHeight=512; 
var taccgl_3d=true;            // normally true, false for testing 2D mode
var taccgl_maxQ=3;             // normally 3, 2 or 1 for testing these quality levels
var taccgl_frontfacing=false;  // if false does not even try to make a shader with frontfacing 
var taccgl_advCompileTimeChrome=80;  // ms, if compiling the fast shader takes longer, we do not even try compiling the advanced shader
var taccgl_advCompileTime=600;  // ms, if compiling the fast shader takes longer, we do not even try compiling the advanced shader
// var taccgl_debug=true;     // taccgl_debug can be enabled here or after including the lib
if (!window.taccgl_debugButtons) var taccgl_debugButtons=false;
if (!window.taccgl_showShader)   var taccgl_showShader=false;

//  start compression here
if (!window.taccgl_errcheck)     var taccgl_errcheck=false;
if (!window.taccgl_debug)        var taccgl_debug= false; 

/* To compress this file you can basically use any javascript compressor, but should leave all the lines
   before the //  start compression here  comment untouched.
   
   As an additional code compression (which does not gain much) you can throw out the taccgl_errcheck
   and taccgl_debug code : 
      delete all code parts starting from (taccgl_debug) until // taccgl_debug_end
      and you can delete all lines containing  taccgl_errcheck

   Here is a possible Linux gnu Makefile for compression:

obj/taccgl.js:	obj/taccgl.js-HEAD obj/taccgl.js-compressed-FOOT
	cat $^ > $@
	wc taccgl.js
	wc obj/taccgl.js

obj/taccgl.js-HEAD:	taccgl.js
	echo 1,/start compression here/-1p | ed taccgl.js > $@ 
obj/taccgl.js-FOOT:	taccgl.js
	echo /start compression here/,$$ p | ed taccgl.js > $@ 

obj/taccgl.js-FOOT1: obj/taccgl.js-FOOT
	echo "1,\$$g/taccgl_errcheck/d" > obj/x
	echo "1,\$$g/^'\\/\\//d" >> obj/x
	echo "1,\$$s/^''+//" >> obj/x	
	echo "1,\$$s/ *\\/\\/.*.n'+/\\\\\\\\n'+/" >> obj/x	
	echo "1,\$$g/^'.n'+/d" >> obj/x
	echo "1,\$$p" >> obj/x
	cat obj/x | ed $^ > $@

obj/taccgl.js-FOOT2: obj/taccgl.js-FOOT1
	echo "1,\$$g/(taccgl_debug.*)/d\\" > obj/x
	echo ".,/taccgl_debug_end/d" >> obj/x
	echo "1,\$$p" >> obj/x
	cat obj/x | ed $^ > $@

obj/taccgl.js-compressed-FOOT:	obj/taccgl.js-FOOT2
	cat $^ | yui-compressor -v --type js  -o $@  
	wc taccgl.js
	wc $^
*/


if (taccgl_debug) {
    var taccgl_timestep = Array(100000), taccgl_timestepi= 0;
    var taccgl_debug_paint = false;      // test output when painting HTML elements on 2D canvas
    var taccgl_debug_drawloop = 30;   // test output during draw loop
    var taccgl_debug_old = false;        // old test output
    var taccgl_Qframe = true;            // put stylesheed frame around 3D canvas for debugging quality levels
} // taccgl_debug_end
function taccgl_onscroll(){
    if (taccgl_debug) {
	taccgl.clog (taccgl.perfnow().toFixed(1)+":::onscroll event ");
    } // taccgl_debug_end
    taccgl.resizeBody(); taccgl.draw_meaIgnore=3;
}
function taccgl_onresize(){
    if (taccgl_debug) {
	taccgl.clog (taccgl.perfnow().toFixed(1)+":::onresize event " + window.devicePixelRatio + "," + window.outerWidth + "," + window.outerHeight +
		     "," + taccgl.winOuterWidth + "," +  taccgl.winOuterHeight
		    );
    } // taccgl_debug_end
    if (taccgl.winOuterWidth==window.outerWidth && taccgl.winOuterHeight==window.outerHeight) {
	if (taccgl_debug) {
	    taccgl.tlog ("non-size-changing onresize ignored"); 
	} // taccgl_debug_end
	return;
    }
    taccgl.winOuterWidth=window.outerWidth; taccgl.winOuterHeight=window.outerHeight;

    taccgl.resizeBody();
    if (taccgl.resizeTimer) clearTimeout(taccgl.resizeTimer);
    taccgl.resizeTimer=setTimeout(function(){taccgl.resizeTimer=null;taccgl.tonresize()},taccgl.resizeTime);
}
function taccgl_onmousemove(e){if (taccgl.controller&&taccgl.controller.bodyOnMouseMove) taccgl.controller.bodyOnMouseMove(e);}

function taccgl_create ()
{
    var i;
    this.foreground_zIndex= 1000;
    this.background_zIndex= '-1';
    this.draw_running=false; this.busy=false; this.showWarning=false;
    this.timeScale = 1.0;

    this.endMode="hide"; this.endStyle = {transition : "opacity 0.25s, visibility 0.25s", opacity : "0", visibility:"hidden"};
    this.ddfx=this.ddfy=-0.1;
    this.textureCanvasshanged = false;
    this.textureCanvasChanged2 = false;

    this.texcanvas = null;
    this.texc = null;
    this.vBgControl = false;
    this.ddmode=this.dddmode=false; this.compatmode=true;
    this.initialized=false; this.webglerror=false;

    this.shddmode = this.shdddmode=null;
    this.drawerrcheck = false;

    this.onTerm = null; this.onBeforeDraw3D=null;
    this.delno=1;
    this.qualityCnt = Array(4); for (i=0; i<4; i++) this.qualityCnt[i]=0;

    var c = document.cookie;
    if (c.match(/taccgl_epack=true/)) this.epack=true;
    if (c.match(/taccgl_epack=false/)) this.epack=false;

    this.heightExtension=0;
    this.resizeTime=200;

    this.meaAS=256;
    this.meaA = Array (this.meaAS);
    this.meaAA = Array (this.meaAS);
    this.softFailQ=this.hardFailQ=taccgl_maxQ+1; this.softFailCnt=0;
    this.winOuterWidth=window.outerWidth; this.winOuterHeight=window.outerHeight;

    this.clog = function (s){if (window.console) console.log(s); }
    this.tlog = function (s){if (window.console) console.log(taccgl.perfnow().toFixed(1)+":::"+s); }

    this.defaultLighting = function () {
	this.lightAmbient=0.7;
	this.lightDiffuse=0.3;
	this.lightSpecular=0.3;
	this.lightShininess=256;
    }
    this.defaultLighting();

    this.defaultEye = function () {
	this.eyeX=this.eyeY=0; this.eyeZ=-5000; if (this.stdsc) {this.createShaders(); this.adjustQuality();}
    }
    this.defaultEye();

    this.defaultShadowZRange = function () {
	this.zBack = 4000;
	this.zFront = -2000;
    }
    this.defaultShadowZRange();

//    this.setLightPos = function (x,y,z) {
//	this.lightX=x; this.lightY=y; this.lightZ=z;
//	this.adjustShcvp();
//    }

    this.setShadowZRange = function (front, back){
	this.zBack=back; this.zFront=front;
	this.adjustShcvp();
    }

    this.init1 = function () {
	// alert ('init1');

        var cv= document.getElementById ("taccgl_canvas3d"); 
        if (!cv){
	    if (window.devicePixelRatio) this.pr= window.devicePixelRatio; else this.pr=1;
//	    this.pr=0.5;

	    if (!window.taccgl_texCanWidth)  taccgl_texCanWidth = 1200;
	    if (!window.taccgl_texCanHeight) taccgl_texCanHeight= 1424;
	    if (!window.taccgl_mipmap) taccgl_mipmap=false;
	    if (!window.taccgl_immediateStop) taccgl_immediateStop=4;


	    if (document.body.insertAdjacentHTML) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<canvas id="taccgl_canvas3d" width="10" height="10" style="position:absolute; top:0px; left:0px; z-index:-1;display:none;visibility:visible " onmousemove="taccgl.canvasOnMouseMove(event)"></canvas>');
		cv= document.getElementById ("taccgl_canvas3d");

		if (taccgl_debug) {
		    if (taccgl_Qframe && cv) cv.style.border = " 1px solid blue";
		} // taccgl_debug_end
		var wpr=Math.round(taccgl_texCanWidth*this.pr), hpr=Math.round(taccgl_texCanHeight*this.pr);
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<canvas id="taccgl_textureCanvas" width="'+wpr+'" height="'+hpr+
			'" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:black;width:'+
			taccgl_texCanWidth+'px;height:'+taccgl_texCanHeight+
			'px" crossorigin onclick="taccgl.HideTexCanvas(1)"></canvas>'+
		    '<canvas id="taccgl_textureCanvas2" width="'+wpr+'" height="'+hpr+
			'" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:black;width:'+
			taccgl_texCanWidth+'px;height:'+taccgl_texCanHeight+
			'px" crossorigin onclick="taccgl.HideTexCanvas(2)"></canvas>'+
// 		    '<canvas id="taccgl_textureCanvas2" width="'+taccgl_texCanWidth+'" height="'+taccgl_texCanHeight+'" style="display:none;position:absolute;top:0px;left:0px;z-index:9999;background-color:black" crossorigin onclick="taccgl.HideTexCanvas(2)"></canvas>'+
		    '<canvas id="taccgl_scratchCanvas" width=1 height=1 style="display:none;position:absolute;top:0px;left:0px;z-index:1000;background-color:cyan; width:3; height:3" ></canvas>'
		);
	        this.scratchcanvas = document.getElementById ("taccgl_scratchCanvas");
	        if (this.scratchcanvas) this.scratchc = this.scratchcanvas.getContext("2d");
	        if (taccgl_debugButtons) {
		    document.body.insertAdjacentHTML (
			"afterbegin",
			'<div style="position:absolute; z-index:20000; top:0px">' +
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'black\')" title="Show Texture Canvas 1 Black">1B</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'cyan\')" title="Show Texture Canvas 1 Black">1C</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'white\')" title="Show Texture Canvas 1 Black">1W</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(1,\'\')" title="Show Texture Canvas 1 Black">1T</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(2,\'black\')" title="Show Texture Canvas 2 Black">2B</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(2,\'cyan\')" title="Show Texture Canvas 2 Black">2C</a>  '+
			'<a href="javascript:taccgl.ShowTexCanvas(2,\'white\')" title="Show Texture Canvas 2 Black">2W</a>  '+
			'<a href="javascript:taccgl.HideTexCanvas(\'\')">Hide</a> ' +
			'<a href="javascript:taccgl.Bg3DCanvas(\'black\')" title="3D Canvas Background Black">B</a>  '+
			'<a href="javascript:taccgl.Bg3DCanvas(\'cyan\')" title="3D Canvas Background Cyan">C</a>  '+
			'<a href="javascript:taccgl.Bg3DCanvas(\'white\')" title="3D Canvas Background White">W</a>  '+
			'<a href="javascript:taccgl.Bg3DCanvas(\'\')" title="3D Canvas Background Transparent">T</a>  '+
			'<a href="javascript:taccgl.Display3DCanvas(\'\')" title="3D Canvas Show">S</a>  '+
			'<a href="javascript:taccgl.Display3DCanvas(\'none\')" title="3D Canvas Hide">H</a>  '+
			'<a href="javascript:taccgl.ZIndex3DCanvas(-10000)" title="3D Canvas Background">Bg</a>  '+
			'<a href="javascript:taccgl.ZIndex3DCanvas(0)" title="3D Canvas Middle">M</a>  '+
			'<a href="javascript:taccgl.ZIndex3DCanvas(1000)" title="3D Canvas Foreground">Fg</a>  '+
			'</div>'
		    );
		} // taccgl_debug_end
	    }
	    this.texTo(2); if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
	    this.texTo(1); if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
	}

	if (window.requestAnimationFrame) window.taccgl_requestAnimationFrame = requestAnimationFrame; else
	    if (window.webkitRequestAnimationFrame)  window.taccgl_requestAnimationFrame = webkitRequestAnimationFrame; else
		if (window.mozRequestAnimationFrame) window.taccgl_requestAnimationFrame =  mozRequestAnimationFrame; else
		    if (window.msRequestAnimationFrame) window.taccgl_requestAnimationFrame =  msRequestAnimationFrame; else
			if (window.oRequestAnimationFrame)  window.taccgl_requestAnimationFrame = oRequestAnimationFrame;
	if (window.cancelAnimationFrame) window.taccgl_cancelAnimationFrame = cancelAnimationFrame; else
	    if (window.webkitCancelAnimationFrame)  window.taccgl_cancelAnimationFrame = webkitCancelAnimationFrame; else
		if (window.mozCancelAnimationFrame) window.taccgl_cancelAnimationFrame =  mozCancelAnimationFrame; else
		    if (window.msCancelAnimationFrame) window.taccgl_cancelAnimationFrame =  msCancelAnimationFrame; else
			if (window.oCancelAnimationFrame)  window.taccgl_cancelAnimationFrame = oCancelAnimationFrame;


        if (cv && cv.getContext){
 	    var g=null;
	    if (taccgl_3d)
		try {
		    var opt={ antialias:true, stencil:false, premultipliedAlpha:true, preserveDrawingBuffer:false, failIfMajorPerformanceCaveat:true};
		    g = cv.getContext("experimental-webgl",opt);   
		    if (!g)  g = cv.getContext("webgl",opt); 
                    if (!g)  g = cv.getContext("webkit-3d",opt); 
		} catch (e) {
		    g=null;
		} finally {}
            if (g&&taccgl_3d) {
		this.g = g; this.cv=cv;
		this.dddmode=true; this.ddmode=false; this.compatmode=false;
            } else { 
 		g = cv.getContext('2d');
		if (g) {
		    this.g = g; this.cv=cv;
		    this.dddmode=false; this.ddmode=true; this.compatmode=false;
		}
            }
        }
        this.dddCanvas = new this.createDDDCanvas(); 
        this.controller = new this.createForwardingController(); this.controller.attach();
	this.stdLight = this.lightSource();
	this.initialized=true;
//	this.showHideComments();
	this.quality=2;
        this.TM=this.m44I(); this.TM_1T=this.m33I(); // this.TM[0]=2.0;
//	this.showShaders();
//	this.dddmode=false;
    };


    this.perfnow = function () {
	if (window.performance && window.performance.now) {
//	    var o=window.performance;
//	    var t=window.performance.now();
	    return window.performance.now();
	}
	else {
	    return new Date().getTime();
	}
    }

    this.epWarningText = function () {
        return 	"<form><h2>"+taccgl_epwarning.replace(/ONLINE/, "ONLINE</h2>")+
          "<p><ul> <li> <button name=\"Disable\" type=\"button\" onclick=\"taccgl.epDisable()\">Disable</button>Animations on this page "+
        "<li> <button name=\"Acknowlege Warning\" type=\"button\" onclick=\"taccgl.epEnable()\"/>Acknowledge Warning</button> and enable animation on your own risk </ul>"+
            "<input type=\"checkbox\" name=\"taccgl_epcookie\" value=\"x\"> Apply selection to all pages of this website (requires setting a cookie)</form>" ;
    }
    this.epWarningStyle = function  () {
	if (window.screen && window.screen.width && window.screen.width<800)
            return "position:absolute; top:0px; left:0px; z-index:10000;display:none;background-color:white; font-size:12px;"+
               "padding:20px; border: ridge 3px silver; width:"+ (window.screen.width-60)+"px";
	else
            return "position:fixed; width:700px; top:20px; left:20px; z-index:10000;display:none;background-color:white; font-size:16px;"+
            "padding:20px; border: ridge 3px silver";
    }

    this.epWarning = function () {
	if (document.body.insertAdjacentHTML) {
	    var w=document.getElementById("taccgl_epwarning");
	    if (!w) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<div id="taccgl_epwarning" style="'+this.epWarningStyle()+'">'+this.epWarningText()+'</div>'
		);
	    }
	}
    }
    this.disabledWarningStyle=function  () {
        return "position:fixed; width:120px; font-size:12px; top:0px; left:0px; z-index:10000;display:none;background-color:white;"+
               "padding:2px; border-right: ridge 1px silver; border-bottom: ridge 1px silver; vertical-align:middle;";
    }
    this.disabledWarningText = function () {
	var x = "Animations&nbsp;<a href=\"javascript:taccgl.epUnset();\" title=\"click to enable\">disabled</a>"; 
            // <button name=\"taccgl_AnimationsDisabled\" type=\"button\" onclick=\"taccgl.epUnset()\">Enable</button> ";
	return x;
    }

    this.disabledWarning = function () {
	if (document.body.insertAdjacentHTML) {
	    var w=document.getElementById("taccgl_disabledWarning");
	    if (!w) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<div id="taccgl_disabledWarning" style="'+this.disabledWarningStyle()+'">'+this.disabledWarningText()+'</div>'
		);
	    }
	}
    }

    this.showEpWarning = function () {
	var w=document.getElementById("taccgl_epwarning");
	w.style.display=''; this.busy=true; this.showWarning=true;
    }
    this.showDisabledWarning = function () {
	this.disabledWarning();
	var w=document.getElementById("taccgl_disabledWarning");
	w.style.display=''; this.busy=false;
    }
	
    this.epcheck = function () {
	if (this.epack) return true;
	if (this.epack==false)  {  this.showDisabledWarning(); return false;}
        this.epWarning ();
	this.cancelDraw();
        this.showEpWarning();
	return "wait";
    }
    this.hideEpWarning = function () {
	var w=document.getElementById("taccgl_epwarning");
	w.style.display='none'; this.showWarning=false;
    }
    this.hidedisabledWarning = function () {
	var w=document.getElementById("taccgl_disabledWarning");
	w.style.display='none';
    }

    this.epEnable = function() {
	var cb=document.getElementsByName ("taccgl_epcookie")[0];
	if (cb && cb.checked) {
	    document.cookie = "taccgl_epack=true";
	}
	this.epack=true; this.hideEpWarning(); 
	if (this.draw_running) { this.continueDraw(); this.beginIgnoreDrop();  this.endIgnoreDrop(true); }
	this.start();
    }
    this.epDisable = function() {
	var cb=document.getElementsByName ("taccgl_epcookie")[0];
	if (cb && cb.checked) {
	    document.cookie = "taccgl_epack=false";
	    this.showDisabledWarning();
	}
	this.epack=false; this.hideEpWarning(); this.start();
    }
    this.epUnset = function (){
	this.epack=null;
	document.cookie = "taccgl_epack=";
	this.hidedisabledWarning();
    }
    this.canvasOnMouseMove = function (e) {
	if (!e) e=window.event;
	this.mouseX = e.clientX; this.mouseY = e.clientY;
    }
    
    this.ddFallBack = function () {
	if (this.dddmode || this.ddmode) return;
//	if (this.ddmode) return;
        var cv= document.getElementById ("taccgl_canvas3d");
        if (!cv) return;
	if (!cv.getContext) return;
	if (this.webglerror) {
	    document.body.removeChild(cv);
	    if (document.body.insertAdjacentHTML)
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    '<canvas id="taccgl_canvas3d" width="10" height="10" style="position:absolute; top:0px; left:0px; z-index:-1"></canvas>');
	    cv= document.getElementById ("taccgl_canvas3d");
	}
	var g = cv.getContext('2d');
	if (g) {
	    this.g = g; this.cv=cv;
	    this.dddmode=false; this.ddmode=true; this.compatmode=false;
	    this.resizeBody();
	}
    }

    this.showHideComments = function () {
	var e;

	if (this.ddmode==this.shddmode && this.dddmode==this.shdddmode) return;
	this.shddmode=this.ddmode; this.shdddmode=this.dddmode;

	if (e=document.getElementById("taccgl_CommentImage")) {
	    if (this.ddmode)   { e.src=taccgl_Com_ddmode;}
	    if (this.dddmode)  { e.src=taccgl_Com_dddmode;}
	    if (!(this.dddmode||this.ddmode))  { e.src=taccgl_Com_off;}
	}
        if  (document.getElementsByClassName) {
	    var s = document.getElementsByClassName("taccgl_cl_ddmode");
	    for (i=0; i<s.length; i++) {s[i].style.display= this.ddmode ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_dddmode");
	    for (i=0; i<s.length; i++) {s[i].style.display= this.dddmode ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_active");
	    for (i=0; i<s.length; i++) {s[i].style.display= (this.ddmode||this.dddmode) ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_inactive");
	    for (i=0; i<s.length; i++) {s[i].style.display= (!(this.ddmode||this.dddmode)) ? 'inherit' : 'none';}
	    s = document.getElementsByClassName("taccgl_cl_can3derror");
	    for (i=0; i<s.length; i++) {s[i].style.display= (this.can3derror) ? 'inherit' : 'none';}
	} else { 
//	    var el=document.getElementById ('taccglCommentStyle');
//	    if (!el) {
//		document.body.insertAdjacentHTML (
//		    "afterbegin",
//  	            "<style id='taccglCommentStyle'>.taccgl_cl_inactive {display:block; color:red}</style>"
//		);
//	    }
	    var i, all, el;
	    if (document.all) all=document.all; else all=document.getElementsByTagName("*");
	    for (i=0; i<all.length; i++) {
		el=all[i];
		if (el.className) {
		    if (el.className.match(/taccgl_cl_inactive/)) {
			el.style.display= 'block';
		    }
		}
	    }
	}
    }

    this.tonresize = function () {
	this.doHook(this.onResize);
    }

    this.resizeBody = function () {
	this.adjustQuality(); 
	return;
    }
    this.adjustEye = function (x,y,z) {
	taccgl.eyeX=x; taccgl.eyeY=y; taccgl.eyeZ=z; if (this.stdsc) {this.createShaders(); this.adjustQuality();}
    }

    this.adjustCanvasRaw = function (x,y,w,h) {
	if (!this.cv) return;
//	if (window.devicePixelRatio) this.pr= window.devicePixelRatio; else this.pr=1;
	if (window.taccgl_maxCanHeight) { if (h>taccgl_maxCanHeight) h=taccgl_maxCanHeight;}
	if (window.taccgl_maxCanWidth) { if (w>taccgl_maxCanWidth) w=taccgl_maxCanWidth;}
	if (x==this.canvasX && y==this.canvasY && w==this.canvasW && h==this.canvasH && this.canvasPr==this.pr) return;
	var wpr=Math.round(w*this.pr), hpr=Math.round(h*this.pr),
	w1pr=Math.round(w/this.pr), h1pr=Math.round(h/this.pr); 
	if (this.canvasW!=w || this.canvasH!=h) {
	    this.cv.width=wpr;  this.cv.style.width=w+"px";
	    this.cv.height=hpr; this.cv.style.height=h+"px";
	    if (taccgl_debug) {
		taccgl.clog ("Adjust Canvas Raw "+this.quality+" ration="+this.pr + " style.width="+w+ " style.height="+h+
			     " width="+wpr+ " height="+hpr);
	    } // taccgl_debug_end
	}
	this.cv.style.top=y+"px";
	this.cv.style.left=x+"px"; 
	this.canvasX=x; this.canvasY=y; this.canvasW=w; this.canvasH=h; this.canvasPr=this.pr;
	if (this.dddmode) {
	    var e; if (taccgl_errcheck) { if ((e=this.g.getError())!=0) alert ("Error "+e+" before viewport"); }
	    this.g.viewport (0,0,wpr,hpr);
  	    if (taccgl_errcheck) { if ((e=this.g.getError())!=0) alert ("Error "+e+" after viewport "+w+","+h); }
	}
//	this.setCanvasDim (x,y,Math.round(w/this.pr),Math.round(h/this.pr));
//	this.setCanvasDim (x,y-h,w1pr,h1pr);
//	this.setCanvasDim (x,y-(h1pr-h),w1pr,h1pr); works with normal viewport
	this.setCanvasDim (x,y,w,h);
    }

    this.adjustCanvas = function (x,y,w,h) {
	var b=document.body,  st = b.scrollTop, sl = b.scrollLeft;
	if (window.pageXOffset) sl=window.pageXOffset;
	if (window.pageYOffset) st=window.pageYOffset;

	if (x<sl) x=sl;
	if (y<st) y=st;

	var  x1=x+w, y1=y+h;
	if (x1> window.innerWidth+sl)  { x1 = window.innerWidth+sl;  x=x1-w;}
	if (y1> window.innerHeight+st) { y1 = window.innerHeight+st; y=y1-h;}
	if (x<sl) x=sl;
	if (y<st) y=st;

	this.adjustCanvasRaw (x,y,x1-x,y1-y);
    }

    this.adjustLowQuality = function () {
	if (this.lqc_w) {
	    this.adjustCanvas (this.lqc_x, this.lqc_y, this.lqc_w, this.lqc_h);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="red";
	    } // taccgl_debug_end
	} else {
            var x=0, y=0, b=document.body;
//	    var w= document.body.clientWidth; var h= document.body.clientHeight;
	    var h= window.innerHeight, w= window.innerWidth;
	    
	    var st = b.scrollTop, sl = b.scrollLeft;
	    if (window.pageXOffset) sl=window.pageXOffset;
	    if (window.pageYOffset) st=window.pageYOffset;
	    x=sl; y=st;

	    var mw=512, mh=512;
  	    if (window.innerWidth  > mw) { x=sl+Math.floor((window.innerWidth-mw)/2);  w=mw;}
  	    if (window.innerHeight > mh) { y=st+Math.floor((window.innerHeight-mh)/2); h=mh;}

	    // if (w>mw) { x=Math.floor((w-mw)/2); w=mw;}
	    // if (h>mh) { y=Math.floor((h-mh)/2); h=mh;}
	    this.adjustCanvas (x,y,w,h);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="pink";
	    } // taccgl_debug_end
	}
    }

    this.adjustNormalQuality = function () {
	if (this.nqc_w) {
	    this.adjustCanvas (this.nqc_x, this.nqc_y, this.nqc_w, this.nqc_h);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="blue";
	    } // taccgl_debug_end
	} else {
            var x=0, y=0, w= document.body.clientWidth, h= document.body.clientHeight;
	    var mw=1024; // , mh=1024;
	    if (w>mw) { x=Math.floor((w-mw)/2); w=mw;}
	    // if (h>mh) { y=Math.floor((h-mh)/2); h=mh;}
	    this.adjustCanvas (x,y,w,h);
	    if (taccgl_debug) {
		if (taccgl_Qframe && this.cv) this.cv.style.borderColor="cyan";
	    } // taccgl_debug_end
	}
    }

    this.adjustHighQuality = function () {
	this.adjustCanvas (0, 0,  document.body.clientWidth,  document.body.clientHeight+this.heightExtension);
	if (taccgl_debug) {
	    if (taccgl_Qframe && this.cv) this.cv.style.borderColor="green";
	} // taccgl_debug_end
    }

    this.adjustQuality = function () {
	if (this.quality>=taccgl.hardFailQ) this.quality=taccgl.hardFailQ-1;
	if (taccgl_debug) {
	    taccgl.tlog ("************ Adjust Quality="+this.quality+
			 " time="+this.currenttime+
			 " frames="+this.draw_frames + " framerate=" + 
			 this.draw_meaFrames * this.draw_duration / (this.perfnow()-this.draw_meaTime-this.draw_meaAdjust));
	    this.dumpTiming();
	} // taccgl_debug_end

	if (this.quality==1) this.adjustLowQuality();
	if (this.quality==2) this.adjustNormalQuality();
	if (this.quality==3) this.adjustHighQuality();
    }

    this.LQCanvas = function(x,y,w,h) {this.lqc_x=x;this.lqc_y=y; this.lqc_w=w; this.lqc_h=h; if (this.quality==1) this.adjustQuality();}
    this.NQCanvas = function(x,y,w,h) {this.nqc_x=x;this.nqc_y=y; this.nqc_w=w; this.nqc_h=h; if (this.quality==2) this.adjustQuality();}

    this.beginIgnoreDrop = function () {
//	if (window.performance && window.performance.now) 
//	    this.startTimeIGD =  window.performance.now();
//	else
//	    this.startTimeIGD =  new Date().getTime();
	this.startTimeIGD=this.perfnow();
    }

    this.endIgnoreDrop = function (pause) {
	if (!this.startTimeIGD) return;
	var now=this.perfnow();
	if (taccgl_debug) {
	    var estimateDropped = (now-this.startTimeIGD)*this.draw_frames/this.currenttime/this.draw_duration;
	    taccgl.clog ("endIgnoreDrop  droptime = "+(now-this.startTimeIGD)+"  estimateDropped = "+estimateDropped + " Quality="+this.quality+ 
			 " time="+this.currenttime+
			 " frames="+this.draw_frames + " framerate=" + this.draw_frames / this.currenttime);
	} // taccgl_debug_end
	if (pause) {
	    var d = now-(this.currenttime*this.draw_duration+this.draw_startTime); 
	    this.draw_startTime += d;
	} else {
//	    this.draw_frames+=Math.floor(estimateDropped);
	}
//	this.draw_meaFrames=-3;this.draw_meaAdjust=0; this.draw_meaIgnore=0;
	this.draw_meaIgnore=3;
    }


    if (taccgl_debug){

    this.showGLParameters = function() {
	var a = [ 
"ACTIVE_TEXTURE",
"ALIASED_LINE_WIDTH_RANGE",
"ALIASED_POINT_SIZE_RANGE",
"ALPHA_BITS",
"ARRAY_BUFFER_BINDING",
"BLEND",
"BLEND_COLOR",
"BLEND_DST_ALPHA",
"BLEND_DST_RGB",
"BLEND_EQUATION_ALPHA",
"BLEND_EQUATION_RGB",
"BLEND_SRC_ALPHA",
"BLEND_SRC_RGB",
"BLUE_BITS",
"COLOR_CLEAR_VALUE",
"COLOR_WRITEMASK",
"COMPRESSED_TEXTURE_FORMATS",
"CULL_FACE",
"CULL_FACE_MODE",
"CURRENT_PROGRAM",
"DEPTH_BITS",
"DEPTH_CLEAR_VALUE",
"DEPTH_FUNC",
"DEPTH_RANGE",
"DEPTH_TEST",
"DEPTH_WRITEMASK",
"DITHER",
"ELEMENT_ARRAY_BUFFER_BINDING",
"FRAMEBUFFER_BINDING",
"FRONT_FACE",
"GENERATE_MIPMAP_HINT",
"GREEN_BITS",
"LINE_WIDTH",
"MAX_COMBINED_TEXTURE_IMAGE_UNITS",
"MAX_CUBE_MAP_TEXTURE_SIZE",
"MAX_FRAGMENT_UNIFORM_VECTORS",
"MAX_RENDERBUFFER_SIZE",
"MAX_TEXTURE_IMAGE_UNITS",
"MAX_TEXTURE_SIZE",
"MAX_VARYING_VECTORS",
"MAX_VERTEX_ATTRIBS",
"MAX_VERTEX_TEXTURE_IMAGE_UNITS",
"MAX_VERTEX_UNIFORM_VECTORS",
"MAX_VIEWPORT_DIMS",
"NUM_COMPRESSED_TEXTURE_FORMATS",
"PACK_ALIGNMENT",
"POLYGON_OFFSET_FACTOR",
"POLYGON_OFFSET_FILL",
"POLYGON_OFFSET_UNITS",
"RED_BITS",
"RENDERBUFFER_BINDING",
"RENDERER",
"SAMPLE_BUFFERS",
"SAMPLE_COVERAGE_INVERT",
"SAMPLE_COVERAGE_VALUE",
"SAMPLES",
"SCISSOR_BOX",
"SCISSOR_TEST",
"SHADING_LANGUAGE_VERSION",
"STENCIL_BACK_FAIL",
"STENCIL_BACK_FUNC",
"STENCIL_BACK_PASS_DEPTH_FAIL",
"STENCIL_BACK_PASS_DEPTH_PASS",
"STENCIL_BACK_REF",
"STENCIL_BACK_VALUE_MASK",
"STENCIL_BACK_WRITEMASK",
"STENCIL_BITS",
"STENCIL_CLEAR_VALUE",
"STENCIL_FAIL",
"STENCIL_FUNC",
"STENCIL_PASS_DEPTH_FAIL",
"STENCIL_PASS_DEPTH_PASS",
"STENCIL_REF",
"STENCIL_TEST",
"STENCIL_VALUE_MASK",
"STENCIL_WRITEMASK",
"SUBPIXEL_BITS",
"TEXTURE_BINDING_2D",
"TEXTURE_BINDING_CUBE_MAP",
"UNPACK_ALIGNMENT",
"UNPACK_COLORSPACE_CONVERSION_WEBGL",
"UNPACK_FLIP_Y_WEBGL",
"UNPACK_PREMULTIPLY_ALPHA_WEBGL",
"VENDOR",
"VERSION",
"VIEWPORT"];
	var s="", i, j;

        for (i=0; i<a.length; i++) {
	    var n=a[i], v=this.g.getParameter (this.g[n]);
	    s=s+n+"=";
	    if (v && v.length) {
		for (j=0; j<v.length; j++) s+=v[j]+" ";
	    } else 
		s=s+v+"\n";
            if (i%32==31) {this.clog(s); s="";}
	}
	this.clog (s);
    };

	this.frameRateF = function (f) {
	    if (f>this.draw_meaFrames) f=this.draw_meaFrames;
	    return (f * 1000 / (this.meaA[ (this.draw_meaFrames) % this.meaAS ] - 
				this.meaA[ (this.draw_meaFrames-f) % this.meaAS ] ));
	}

	this.dumpTiming = function() {
	    var s = "meaFrames = "+this.draw_meaFrames+ " draw_meaTime "+this.draw_meaTime +" rate="+
		this.draw_meaFrames/(this.perfnow()-this.draw_meaTime-this.draw_meaAdjust)*1000 + 
		" softFailQ="+taccgl.softFailQ+" softFailCnt="+taccgl.softFailCnt+" hardFailQ="+taccgl.hardFailQ +
		" draw_meaIgnore="+this.draw_meaIgnore+" draw_meaAdjust="+this.draw_meaAdjust +
		" rate(120)="+this.frameRateF(120)+
	    	" rate(60)="+this.frameRateF(60)+
		" rate(10)="+this.frameRateF(10)+
		" rate(5)="+this.frameRateF(5)+
		" rate(2)="+this.frameRateF(2);
	    console.log ("Timing "+s);
	    
	    s = ""; var sd="", sj="", saa='', saad='';
	    for (var i=0; i<=40; i++) {
		if (this.draw_meaFrames + i - 40 > 0 ) {
		    var j = (this.draw_meaFrames +taccgl.meaAS + i - 40 )  % this.meaAS; 
		    var k = (j - 1 + this.meaAS)  % this.meaAS; 
		    if (i>20) {
			s += taccgl.meaA[j].toFixed(0)+",";
			saa += taccgl.meaAA[j].toFixed(0)+",";
		    }
		    sd += (taccgl.meaA[j]-taccgl.meaA[k]).toFixed(0)+",";
		    saad += (taccgl.meaAA[j]-taccgl.meaAA[k]).toFixed(0)+",";
		    sj += j+",";
		}
	    }
	    console.log (sj);
	    console.log (s);
	    console.log (sd);
	    console.log (saa);
	    console.log (saad);

	}


    } // taccgl_debug_end

    this.setHandlers = function () {
//	document.body.onscroll="alert(33); taccgl.resizeBody();"; this does not seem to work on some IE
//      must use windows.onscroll and must assign a function, not a string
	window.onscroll=taccgl_onscroll;
	window.onresize=taccgl_onresize;
	document.body.onresize=taccgl_onresize; 
	document.body.onmousemove=taccgl_onmousemove;
    }

    this.init = function () {
	if (taccgl_debug) {
	    taccgl.tlog ("taccgl Main Initialization started");
	}  // taccgl_debug_end
	this.init1();
	this.setHandlers();
//	this.resizeBody ();
	this.createShaders();
	this.ddFallBack();
//	this.showGLParameters ();
	if (taccgl_debug) {
	    taccgl.tlog ("taccgl Main Initialization finished" + (this.ddmode ? " 2D Mode detected" : "") + (this.dddmode ? " 3D Mode detected" : "")
			 + ( !(this.ddmode||this.dddmode) ? " neither 2D nor 3D Mode detected!":"") + ( " initial quality level " + taccgl.quality));
	}  // taccgl_debug_end
    };


    this.createVertexShader = function (t) {
//	console.time("createVertexShader");
	var g = this.g;
        if (!t.match(/\n/)){ 
	    var el = document.getElementById(t);
	    if (el) {
		t = el.innerText; 
		if (!t) t=el.text;
	    }
	} 
	var vs = g.createShader (g.VERTEX_SHADER);
	g.shaderSource (vs, t); 
	g.compileShader (vs);
	if (!g.getShaderParameter(vs, g.COMPILE_STATUS)) {
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog ("Vertex Shader Compilation failed");
		taccgl.clog (this.g.getShaderInfoLog(vs));
		this.logNumberedText(t);
		taccgl.clog ("**** END");
	    }  // taccgl_debug_end
	}
//	console.timeEnd("createVertexShader");
	return vs;
    }

    this.logNumberedText = function (t) {
	var a = t.split("\n");
	var i = 0, r="";
	while (i<a.length) {
	    r +=  (i+1)+"\t"+a[i]+"\n";
	    i++;
	}
	taccgl.clog(r);
    }
    
    this.createFragmentShader = function (t) {
//	console.time("createFrgamentShader");
	if (!this.dddmode) return null;
        if (!t.match(/\n/)){ 
	    var el = document.getElementById(t);
	    if (el) {
		t = el.innerText; 
		if (!t) t=el.text;
	    }
	} 
	var fs = this.g.createShader (this.g.FRAGMENT_SHADER);
        this.g.shaderSource (fs,t);
	this.g.compileShader (fs); 
	if (!this.g.getShaderParameter(fs, this.g.COMPILE_STATUS)) {
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog ("Fragment Shader Compilation failed");
		taccgl.clog (this.g.getShaderInfoLog(fs));
		this.logNumberedText(t);
		taccgl.clog ("**** END");
	    }  // taccgl_debug_end
	}
//	console.timeEnd("createFrgamentShader");
	return fs;
    }

    this.bindProgramAttributes = function (p)
    {
	var g=this.g;
	g.bindAttribLocation (p, 0, "pos");
	g.bindAttribLocation (p, 1, "origin");
	g.bindAttribLocation (p, 2, "texpos");
	g.bindAttribLocation (p, 3, "rotP");
	g.bindAttribLocation (p, 4, "rotA");
	g.bindAttribLocation (p, 5, "color");
	g.bindAttribLocation (p, 6, "texmix");
	g.bindAttribLocation (p, 7, "accel");
	g.bindAttribLocation (p, 8, "normal");
    }

    this.createShaderProgram = function (vs, fs) {
//	console.time("createShaderProgram");
	var g = this.g,
	p = g.createProgram();
	g.attachShader(p, vs);
	g.attachShader(p, fs);
	this.bindProgramAttributes(p); g.linkProgram(p);
	// alert (g.isProgram(p));
	// alert (g.getProgramParameter(p, g.LINK_STATUS));
        if (!g.isProgram(p) || !g.getProgramParameter(p, g.LINK_STATUS)) {
	    console.timeEnd("createShaderProgram");
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog('Shader Program Linking failed:\n'+ g.getProgramInfoLog(p));
	    }  // taccgl_debug_end
	    g.detachShader(p,vs); g.detachShader(p,fs); g.deleteProgram(p);
	    return null;
	}
//	console.timeEnd("createShaderProgram");
	g.validateProgram(p);
        if (!g.isProgram(p) || !g.getProgramParameter(p, g.LINK_STATUS)|| !g.getProgramParameter(p, g.VALIDATE_STATUS)) {
	    this.webglerror=true;
	    if (taccgl_debug) {
		taccgl.clog('Shader Program Validation failed:\n'+g.getProgramInfoLog(p));
	    }  // taccgl_debug_end
	    g.detachShader(p,vs); g.detachShader(p,fs); g.deleteProgram(p);
	    return null;
	}
        if (taccgl_errcheck) { 	var e=this.g.getError(); if (e!=0) taccgl.clog ("Error "+e+" after linking shader"); }

	return p;
    }

    this.newShaderConfigPrototype = function ()
    {
	if (this.shaderConfigPrototype) return;
	var pt = this.shaderConfigPrototype = new taccglShaderConfigPrototype ();
	pt.initShader();
	taccglShaderConfigEmpty.prototype = pt;
    }

    this.createShaderConfig = function () {
	this.newShaderConfigPrototype ();
	return new taccglShaderConfigEmpty();
    }
//    this.createShaderConfig.prototype = new taccglShaderConfigPrototype();
    this.createStdShaderConfig = this.ssc = function (n) {
	if (!this.initialized) this.begin();
	this.newShaderConfigPrototype ();
	var sc = new taccglShaderConfigEmpty();
	if (n) {
	    sc.extendShader(n);
	} 
	return sc;
    }

    this.cvxmin = function (z) { return ((this.eyeX-this.cvpx)*z+this.cvpx*this.eyeZ) / this.eyeZ; }
    this.cvxmax = function (z) { return -((this.cvpw-this.eyeX+this.cvpx)*z-this.eyeZ*this.cvpw-this.cvpx*this.eyeZ)/this.eyeZ; }
    this.cvymin = function (z) { return ((this.eyeY-this.cvpy)*z+this.cvpy*this.eyeZ) / this.eyeZ; }
    this.cvymax = function (z) { return -((this.cvph-this.eyeY+this.cvpy)*z-this.eyeZ*this.cvph-this.cvpy*this.eyeZ)/this.eyeZ; }

    this.adjustShcvp = function (){
//	this.shcvpx=this.cvpx; this.shcvpy=this.cvpy; this.shcvpw=this.cvpw; this.shcvph=this.cvph;
//	taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);
//	return;


	var zfront=this.zFront, zback=this.zBack;
	var xmin= this.cvxmin(zfront),
  	    xmax= this.cvxmax(zfront);
	this.shcvpw = (this.stdLight.z*xmin-this.stdLight.z*xmax)/(zfront-this.stdLight.z);
	this.shcvpx = (this.stdLight.x*zfront-this.stdLight.z*xmin)/(zfront-this.stdLight.z);
//	taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);

	xmin= this.cvxmin(zback);
	xmax= this.cvxmax(zback);
	var cx = (this.stdLight.x*zback-this.stdLight.z*xmin)/(zback-this.stdLight.z);
	if (cx < this.shcvpx) {	this.shcvpw += this.shcvpx-cx; this.shcvpx=cx; }
	var cw =  (this.stdLight.z*xmin-this.stdLight.z*xmax)/(zback-this.stdLight.z);
	if (cx+cw >this.shcvpx+this.shcvpw) this.shcvpw = cx+cw-this.shcvpx; 

	var ymin= this.cvymin(zfront),
  	    ymax= this.cvymax(zfront);
	this.shcvph = (this.stdLight.z*ymin-this.stdLight.z*ymax)/(zfront-this.stdLight.z);
	this.shcvpy = (this.stdLight.y*zfront-this.stdLight.z*ymin)/(zfront-this.stdLight.z);
//	taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);

	ymin= this.cvymin(zback);
	ymax= this.cvymax(zback);
	var cy = (this.stdLight.y*zback-this.stdLight.z*ymin)/(zback-this.stdLight.z);
	if (cy < this.shcvpy) {	this.shcvph += this.shcvpy-cy; this.shcvpy=cy; }
	var ch =  (this.stdLight.z*ymin-this.stdLight.z*ymax)/(zback-this.stdLight.z);
	if (cy+ch >this.shcvpy+this.shcvph) this.shcvph = cy+ch-this.shcvpy; 

	if (taccgl_debug) {
	    taccgl.clog ("setShadowCanvasDim "+this.shcvpx+", "+this.shcvpy+", "+this.shcvpw+", "+this.shcvph);
	}  // taccgl_debug_end
    }

    this.setCanvasDim = function (cpx,cpy,w,h) {
	this.cvpx=cpx; this.cvpy=cpy; this.cvpw=w; this.cvph=h;
	if (taccgl_debug) {
	    taccgl.clog ("setCanvasDim "+cpx+", "+cpy+", "+w+", "+h+" pr="+this.pr);
	}  // taccgl_debug_end
	this.adjustShcvp();
    }
    this.createShaders = function (){
	if (this.stdsc) this.stdsc.freeCompiled(); else this.stdsc = this.createStdShaderConfig ("taccgl_Shaders");
	this.stdsc.compile();
	this.p = this.stdsc.p;
	if (!this.p) this.dddmode=false;
	if (this.stdsc.advProg) this.shadowEna=true; else this.shadowEna=false;
    }

    this.replaceShaderVariables = function (t) {
	t=t.replace(/\$\$EYEX/g,Math.floor(this.eyeX)+".0");
	t=t.replace(/\$\$EYEY/g,Math.floor(this.eyeY)+".0");
	t=t.replace(/\$\$EYEZ/g,Math.floor(this.eyeZ)+".0");
	t=t.replace(/\$\$TEXTURECANVASWIDTH/g,taccgl_texCanWidth+".0");
	t=t.replace(/\$\$TEXTURECANVASHEIGHT/g,taccgl_texCanHeight+".0");
	return t;
    }

/*
    this.showShader = function (t){
//	var el = document.getElementById('vertexShaderScript');
//	var t = el.innerText; 

        if (taccgl_showShader) {
  	   t=t.replace(/\</g,"&lt;");
   	   t=t.replace(/\'/g,"\\\'");
	   t="t='"+t.replace(/\n/g,"\\n'+\n'")+"';"; 
           document.body.insertAdjacentHTML (
	       "afterbegin",
	       '<textarea cols="80" rows="5">'+t+'</textarea>'
	   )
        }
    }
*/



    this.setupTextures = function ()
    {
	if (!this.dddmode) return;
	var g=taccgl.g;
	if (taccgl_debug) {
            var timestr = "Load Textures into GPU (setupTextures) ";
	    if (this.textureCanvasChanged==false) timestr += "TextureCanvas1 unchanged ";
	    if (this.textureCanvasChanged2==false) timestr += "TextureCanvas2 unchanged ";
	    if (console.time) console.time(timestr);
	} // taccgl_debug_end

	var e;
	var tcv= document.getElementById ("taccgl_textureCanvas"),
	tcv2= document.getElementById ("taccgl_textureCanvas2");
	//	    tcv3= document.getElementById ("taccgl_textureCanvas3");

//	var t = tcv3.getContext('2d');
//	t.drawImage (tcv,0,0);

	if (tcv.getContext){

//	  g.deleteTexture ( this.draw_texturecanvas);  this.draw_texturecanvas = null;
//	  g.deleteTexture ( this.draw_texturecanvas2);  this.draw_texturecanvas2 = null;

          if (!this.draw_texturecanvas) {
	      this.draw_texturecanvas = g.createTexture(); this.textureCanvasChanged=true; 
	  }
          if (!this.draw_texturecanvas2) { 
	      this.draw_texturecanvas2 = g.createTexture(); this.textureCanvasChanged2=true
	  }

//	  this.textureCanvasChanged=true; this.textureCanvasChanged2=true; 

	    if (taccgl_debug_old) { // (taccgl_debug) need this to delete during make
		taccgl.clog ("Setup Textures "+this.textureCanvasChanged+" "+this.textureCanvasChanged2);
	    } // taccgl_debug_end
	  if (this.textureCanvasChanged) {
	    var tex = this.draw_texturecanvas;
    	    g.activeTexture(g.TEXTURE0);
  	    if (taccgl_errcheck) {     if ((e=g.getError())!=0) alert ("Error "+e+" activeTexture0");}
 	    g.bindTexture   (g.TEXTURE_2D, tex);
	    var t = tcv.getContext("2d");
	    //    g.pixelStorei   (g.UNPACK_FLIP_Y_WEBGL, true);
	    //    g.pixelStorei   (g.UNPACK_COLORSPACE_CONVERSION_WEBGL, g.NONE);
	    g.pixelStorei   (g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  	    if ((e=g.getError())!=0) {
		this.dddmode=false;this.webglerror=true;
		if (taccgl_debug) {
		    alert ("Error "+e+" before texImage2D texturecanvas 1");
		}  // taccgl_debug_end
		return;
	    }
	    g.texImage2D    (g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, tcv);
  	    if ((e=g.getError())!=0) {
		this.dddmode=false;this.webglerror=true;
		if (taccgl_debug) {
		    alert ("Error "+e+" on texImage2D texturecanvas 1");
		}  // taccgl_debug_end
		return;
	    }
	    if (taccgl_mipmap) {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR_MIPMAP_NEAREST);
		g.generateMipmap(g.TEXTURE_2D);
		if ((e=g.getError())!=0){
		    this.dddmode=false;this.webglerror=true;
		    if (taccgl_debug) {
			alert ("Error "+e+" on generateMipmap");
		    }  // taccgl_debug_end
		    return;
		}
	    } else {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
	    }
	    this.textureCanvasChanged=false;
	  }


	  if (this.textureCanvasChanged2) {
	    tex = this.draw_texturecanvas2;
  	    g.activeTexture(g.TEXTURE1);
  	    if (taccgl_errcheck) {     if ((e=g.getError())!=0) alert ("Error "+e+" activeTexture0");}
            g.bindTexture   (g.TEXTURE_2D, tex);
	    t = tcv2.getContext("2d");
	    //    g.pixelStorei   (g.UNPACK_FLIP_Y_WEBGL, true);
	    g.pixelStorei   (g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  	    if ((e=g.getError())!=0) alert ("Error "+e+" before texImage2D texturecanvas 2");
	    g.texImage2D    (g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, tcv2);
  	    if ((e=g.getError())!=0) {
		this.dddmode=false;this.webglerror=true;
		if (taccgl_debug) {
		    alert ("Error "+e+" on texImage2D texturecanvas 2");
		}  // taccgl_debug_end
		return;
	    }
	    if (taccgl_mipmap) {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR_MIPMAP_NEAREST);
		g.generateMipmap(g.TEXTURE_2D);
	    } else {
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
	    }
	    this.textureCanvasChanged2=false;
          }
	}
	this.draw_meaIgnore=3;
	if (taccgl_debug) {
	    if (console.timeEnd) console.timeEnd(timestr);
	} // taccgl_debug_end
    }
 
    this.cvert = function (r,g,b,o)
    {
    }

    this.nvertAcceleration = function (x,y,z)
    {
	this.vertAcceleration[4*this.vertI-4]=x;
	this.vertAcceleration[4*this.vertI-3]=y;
	this.vertAcceleration[4*this.vertI-2]=z;
    }

    this.nvertTexMove = function (s,t){
	this.vertTexPos[4*this.vertI-2]=s;
	this.vertTexPos[4*this.vertI-1]=t;
    }
    this.nvertTexMove4 = function (s0,t0,s1,t1){
	this.vertTexPos[4*this.vertI-4]=s0;
	this.vertTexPos[4*this.vertI-3]=t0;
	this.vertTexPos[4*this.vertI-2]=s1;
	this.vertTexPos[4*this.vertI-1]=t1;
    }
    this.nvertRot = function (px,py,pz, ax,ay,az, from,to)
    {
	this.vertRotP[4*this.vertI-4]=px;
	this.vertRotP[4*this.vertI-3]=py;
	this.vertRotP[4*this.vertI-2]=pz;
	this.vertRotP[4*this.vertI-1]=from;
	this.vertRotA[4*this.vertI-4]=ax;
	this.vertRotA[4*this.vertI-3]=ay;
	this.vertRotA[4*this.vertI-2]=az;
	this.vertRotA[4*this.vertI-1]=to;
    }
    this.nvertTime = function (basetime,duration,flags) 
    {
	this.vertOrigin [4*this.vertI+3]=basetime;
	this.vertPos [4*this.vertI+3]=flags;
	this.vertAcceleration[4*this.vertI+3]=duration;
	this.vertI+=1;
    }
    this.nvertMove = function (x0,y0,z0,x,y,z,nx,ny,nz,spec,s,t,flags,basetime,duration) 
    {
	if (16*this.vertI >= this.vertBufferSize) this.ResizeVertexBuffers(2*this.vertBufferSize);
	this.vertOrigin [4*this.vertI]=x0;
	this.vertOrigin [4*this.vertI+1]=y0;
	this.vertOrigin [4*this.vertI+2]=z0;
	this.vertOrigin [4*this.vertI+3]=basetime;
	this.vertPos [4*this.vertI]=x;
	this.vertPos [4*this.vertI+1]=y;
	this.vertPos [4*this.vertI+2]=z;
	this.vertPos [4*this.vertI+3]=flags;
	this.vertTexPos [4*this.vertI]=s;
	this.vertTexPos [4*this.vertI+1]=t;
	this.vertTexPos [4*this.vertI+2]=s;
	this.vertTexPos [4*this.vertI+3]=t;
/*
        this.vertRotP[4*this.vertI+0]=55.55; // avoid uninitialized
        this.vertRotP[4*this.vertI+1]=55.55; // avoid uninitialized
        this.vertRotP[4*this.vertI+2]=55.55; // avoid uninitialized
	this.vertRotP[4*this.vertI+3]=55.55; // avoid uninitialized
        this.vertRotA[4*this.vertI+0]=55.55; // avoid uninitialized
        this.vertRotA[4*this.vertI+1]=55.55; // avoid uninitialized
        this.vertRotA[4*this.vertI+2]=55.55; // avoid uninitialized
*/
	this.vertRotA[4*this.vertI+3]=0.0;
/*
        this.vertTexmix[4*this.vertI+0]=55.55; // avoid uninitialized
        this.vertTexmix[4*this.vertI+1]=55.55; // avoid uninitialized
        this.vertTexmix[4*this.vertI+2]=55.55; // avoid uninitialized
	this.vertTexmix[4*this.vertI+3]=55.55; // avoid uninitialized
*/
	this.vertAcceleration[4*this.vertI]=0.0;
	this.vertAcceleration[4*this.vertI+1]=0.0;
	this.vertAcceleration[4*this.vertI+2]=0.0;
	this.vertAcceleration[4*this.vertI+3]=duration;
        this.vertNormal[4*this.vertI+0]=nx;
        this.vertNormal[4*this.vertI+1]=ny;
        this.vertNormal[4*this.vertI+2]=nz;
	this.vertNormal[4*this.vertI+3]=spec;
	this.vertI+=1;
//        document.getElementById ("status") .insertAdjacentHTML (
//	    "beforeend",
//	    '<div>'+x0+','+	y0+','+z0+','+x+','+y+','+z+','+s+','+t+' :: '+basetime+','+duration+','+flags+'</div>');
    }
    this.nvertColor = function (c0s,c0t,c1s,c1t,m0,m1,mm0,mm1)
    {
	var i=4*this.vertI, vc=this.vertColor, tm=this.vertTexmix;
	vc [i-4]=c0s;	vc [i-3]=c0t;	vc [i-2]=c1s;	vc [i-1]=c1t;	tm [i-4]=m0;	tm [i-3]=mm0;	tm [i-2]=m1;	tm [i-1]=mm1;
    }
    this.nvertColor3 = function (c0s,c0t,c1s,c1t,m0,m1,mm0,mm1)
    {
	var i=4*this.vertI, vc=this.vertColor, tm=this.vertTexmix;
	vc [i-4]=c0s;	vc [i-3]=c0t;	vc [i-2]=c1s;	vc [i-1]=c1t;	tm [i-4]=m0;	tm [i-3]=mm0;	tm [i-2]=m1;	tm [i-1]=mm1;
	vc [i-8]=c0s;	vc [i-7]=c0t;	vc [i-6]=c1s;	vc [i-5]=c1t;	tm [i-8]=m0;	tm [i-7]=mm0;	tm [i-6]=m1;	tm [i-5]=mm1;
	vc [i-12]=c0s;	vc [i-11]=c0t;	vc [i-10]=c1s;	vc [i-9]=c1t;	tm [i-12]=m0;	tm [i-11]=mm0;	tm [i-10]=m1;	tm [i-9]=mm1;
    }
    this.nvertColor6 = function (c0s,c0t,c1s,c1t,m0,m1,mm0,mm1)
    {
	var i=4*this.vertI, vc=this.vertColor, tm=this.vertTexmix;
	vc [i-4]=c0s;	vc [i-3]=c0t;	vc [i-2]=c1s;	vc [i-1]=c1t;	tm [i-4]=m0;	tm [i-3]=mm0;	tm [i-2]=m1;	tm [i-1]=mm1;
	vc [i-8]=c0s;	vc [i-7]=c0t;	vc [i-6]=c1s;	vc [i-5]=c1t;	tm [i-8]=m0;	tm [i-7]=mm0;	tm [i-6]=m1;	tm [i-5]=mm1;
	vc [i-12]=c0s;	vc [i-11]=c0t;	vc [i-10]=c1s;	vc [i-9]=c1t;	tm [i-12]=m0;	tm [i-11]=mm0;	tm [i-10]=m1;	tm [i-9]=mm1;
	vc [i-16]=c0s;	vc [i-15]=c0t;	vc [i-14]=c1s;	vc [i-13]=c1t;	tm [i-16]=m0;	tm [i-15]=mm0;	tm [i-14]=m1;	tm [i-13]=mm1;
	vc [i-20]=c0s;	vc [i-19]=c0t;	vc [i-18]=c1s;	vc [i-17]=c1t;	tm [i-20]=m0;	tm [i-19]=mm0;	tm [i-18]=m1;	tm [i-17]=mm1;
	vc [i-24]=c0s;	vc [i-23]=c0t;	vc [i-22]=c1s;	vc [i-21]=c1t;	tm [i-24]=m0;	tm [i-23]=mm0;	tm [i-22]=m1;	tm [i-21]=mm1;
    }

    this.nvertNormal = function (nx,ny,nz,spec)
    {
	this.vertNormal [4*this.vertI-4]=nx;
	this.vertNormal [4*this.vertI-3]=ny;
	this.vertNormal [4*this.vertI-2]=nz;
	this.vertNormal [4*this.vertI-1]=spec;
    }

    this.nvertOffset = function (i){
	this.vertI+=i;
    }

/*    this.nvert = function (x,y,z,s,t,flags,basetime,duration){
	this.vertOrigin [4*this.vertI]=0.0;
	this.vertOrigin [4*this.vertI+1]=y;
	this.vertOrigin [4*this.vertI+2]=z;
	this.vertOrigin [4*this.vertI+3]=basetime;
	this.vertPos [4*this.vertI]=x;
	this.vertPos [4*this.vertI+1]=y;
	this.vertPos [4*this.vertI+2]=z;
	this.vertPos [4*this.vertI+3]=flags;
	this.vertTexPos [4*this.vertI]=s;
	this.vertTexPos [4*this.vertI+1]=t;
	this.vertTexPos [4*this.vertI+2]=s;
	this.vertTexPos [4*this.vertI+3]=t;
	this.vertRotA[4*this.vertI+3]=0.0;
	this.vertRotA[4*this.vertI+0]=0.0;
	this.vertRotA[4*this.vertI+1]=0.0;
	this.vertRotA[4*this.vertI+2]=0.0;
	this.vertAcceleration[4*this.vertI]=0.0;
	this.vertAcceleration[4*this.vertI+1]=0.0;
	this.vertAcceleration[4*this.vertI+2]=0.0;
	this.vertAcceleration[4*this.vertI+3]=duration;
	this.vertI+=1;
    }
*/

    this.AllocateVertexBuffers = function (size) {
	size = Math.ceil(size/16)*16;
	var vertPosBuffer = new ArrayBuffer(size);
	this.vertPos = new Float32Array (vertPosBuffer);
	var vertOriginBuffer = new ArrayBuffer(size);
	this.vertOrigin = new Float32Array (vertOriginBuffer);
	var vertTexPosBuffer = new ArrayBuffer(size);
	this.vertTexPos = new Float32Array (vertTexPosBuffer);
	var vertRotPBuffer = new ArrayBuffer(size);
	this.vertRotP = new Float32Array (vertRotPBuffer);
	var vertRotABuffer = new ArrayBuffer(size);
	this.vertRotA = new Float32Array (vertRotABuffer);
	var vertcolorBuffer = new ArrayBuffer(size);
	this.vertColor = new Float32Array (vertcolorBuffer);
	var verttexmixBuffer = new ArrayBuffer(size);
	this.vertTexmix = new Float32Array (verttexmixBuffer);
	var vertAccelerationBuffer = new ArrayBuffer(size);
	this.vertAcceleration = new Float32Array (vertAccelerationBuffer);
	var vertnormalBuffer = new ArrayBuffer(size);
	this.vertNormal = new Float32Array (vertnormalBuffer);
	this.vertBufferSize=size;
    }

    this.ResizeVertexBuffers = function (size) {
	var vertPos = this.vertPos;
	var vertOrigin = this.vertOrigin;
	var vertTexPos = this.vertTexPos;
	var vertRotP = 	this.vertRotP;
	var vertRotA = 	this.vertRotA;
	var vertColor=	this.vertColor; 
	var vertTexmix = this.vertTexmix;
	var vertAcceleration = this.vertAcceleration;
	var vertNormal = this.vertNormal;
	this.AllocateVertexBuffers (size);
	var cs = size; if (this.vertBufferSize < cs) cs=this.vertBufferSize;
	this.vertPos.set(vertPos);
	this.vertOrigin.set(vertOrigin);
	this.vertTexPos.set(vertTexPos);
	this.vertRotP.set(vertRotP);
	this.vertRotA.set(vertRotA);
	this.vertColor.set(vertColor);
	this.vertTexmix.set(vertTexmix);
	this.vertAcceleration.set(vertAcceleration);
	this.vertNormal.set(vertNormal);
/*
	for (i=0;i<cs;i++) {
//	    this.vertPos[i]=vertPos[i];
	    this.vertOrigin[i]=vertOrigin[i];
	    this.vertTexPos[i]=vertTexPos[i];
	    this.vertRotP[i]=vertRotP[i];
	    this.vertRotA[i]=vertRotA[i];
	    this.vertColor[i]=vertColor[i];
	    this.vertTexmix[i]=vertTexmix[i];
	    this.vertAcceleration[i]=vertAcceleration[i];
	    this.vertNormal[i]=vertNormal[i];
	}
*/
	if (taccgl_debug) {
	    taccgl.tlog ("Resized Vertex Buffers to "+size+" bytes  "+size/16+" vertices");
	} // taccgl_debug_end
	this.vertBufferSize=size;
//	if (this.draw_running) this.bindDraw(this.g,this.p);
    }

    this.StartRender = function (){
	if (!this.initialized) this.init();
	this.delno ++;
        // var g=this.g; 
	if (this.dddmode) {
	    if (!this.vertPos) {
		var size;
		if (window.taccgl_vertexMem) size = taccgl_vertexMem; else size=500000;
		this.AllocateVertexBuffers (size);
	    }
	    this.vertI = 0; 
	    this.shprog=Array(0); this.shprogfrom=Array(0);
	    this.shprog.push(this.stdsc); this.shprogfrom.push(0);
	}
	if (this.ddmode) {
	    this. AA=Array(0); this.AAstartedLength=0;
	}
	this.duration = 0;
	this.foregroundCnt = 0;
	this.currenttime=0;
	this.doat=Array(0); this.showAfterAnimation = Array(0);
	this.renderingStarted = true;
	this.adjustQuality();
	this.lqc_w=null;
    }

    this.BgControl = function (b) {
	this.vBgControl = b;
    }
 
    this.setEndMode = function (m) {
	this.endMode=m;
    }
    this.setEndStyle = function (st) {
	if (st) this.endStyle=st; else this.endStyle = {transition : "opacity 0.25s, visibility 0.25s", opacity : "0", visibility:"hidden"}; 
    }

    this.begin = function () {
	if (!this.initialized) {this.init(); this.StartRender();}
    }

    this.adjustForeground = function () {
//	this.cv.style.visibility='hidden';
	if (this.foregroundCnt>0) {
	    this.cv.style.zIndex=this.foreground_zIndex; 
	    if (taccgl_debug) {
		taccgl.clog ("3D Canvas moved to foreground");
	    } // taccgl_debug_end
	} else {
	    this.cv.style.zIndex=this.background_zIndex;
	    if (taccgl_debug) {
		taccgl.clog ("3D Canvas moved to background");
	    } // taccgl_debug_end
	}
//	this.cv.style.visibility='visible';
    }

    this.incForeground = function () {
	this.foregroundCnt++;
	if (this.foregroundCnt==1) this.adjustForeground();
    }
    this.decForeground = function () {
	this.foregroundCnt--;
	if (this.foregroundCnt==0) this.adjustForeground();
	if (this.foregroundCnt==-1)
	    alert ("decForeground called more often that incForeground");
    }

    this.bindDraw = function (g,p) {
if (taccgl_debug) {
    var ts="Load Vertex Buffers into GPU (bindDraw) "+this.vertI+" size="+ this.vertBufferSize;
	if (console.time) console.time(ts);
} // taccgl_debug_end
	var e;
	if ((e=g.getError())!=0) alert ("Error "+e+" before clearColor");
	g.clearColor (0.0,0.0,0.0,0.0);
	if ((e=g.getError())!=0) {
	    this.webglerror=true; this.dddmode=false;
	    if (taccgl_debug) {
		alert ("Error "+e+" on clearColor");
	    }   // taccgl_debug_end
	    this.drawImmediateTerm();
	}
	g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
	if ((e=g.getError())!=0) {
	    this.webglerror=true; this.dddmode=false;
	    if (taccgl_debug) {
		alert ("Error "+e+" on clear");
	    }   // taccgl_debug_end
	    this.drawImmediateTerm();
	}
	g.enable(g.DEPTH_TEST); g.depthFunc (g.LEQUAL); 
        g.blendFunc (g.ONE,g.ONE_MINUS_SRC_ALPHA); 
	g.enable(g.BLEND);
	if (taccgl_errcheck) {if ((e=g.getError())!=0) alert ("Error "+e+" on enable");}
	this.draw_locTime = g.getUniformLocation(p,"uTime");
	this.draw_locCvp = g.getUniformLocation(p,"cvp");
	this.draw_locpos = g.getAttribLocation (p, "pos");
	this.draw_locOrigin = g.getAttribLocation (p, "origin");
	this.draw_loctexpos = g.getAttribLocation (p, "texpos");
	this.draw_locrotp = g.getAttribLocation (p, "rotP");
	this.draw_locrota = g.getAttribLocation (p, "rotA");
	this.draw_loccolor = g.getAttribLocation (p, "color");
	this.draw_loctexmix = g.getAttribLocation (p, "texmix");
	this.draw_locnormal = g.getAttribLocation (p, "normal");
	this.draw_locacceleration = g.getAttribLocation (p, "accel");
	this.draw_locuTexture = g.getUniformLocation(p,"uTexture");
	this.draw_locuTexture2 = g.getUniformLocation(p,"uTexture2");
	this.draw_vertexPosBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_locpos);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexPosBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertPos, g.DYNAMIC_DRAW);
	this.draw_originBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_locOrigin);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_originBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertOrigin, g.DYNAMIC_DRAW);
	
	this.draw_vertexTexPosBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_loctexpos);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_vertexTexPosBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertTexPos, g.DYNAMIC_DRAW);   
	
	if (this.draw_locrotp>=0) {
		this.draw_rotPBufferObjekt = g.createBuffer();
		g.enableVertexAttribArray (this.draw_locrotp);
		g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotPBufferObjekt);
		g.bufferData(g.ARRAY_BUFFER, this.vertRotP, g.DYNAMIC_DRAW);
	}
	
	this.draw_accelerationBufferObjekt = g.createBuffer();
	g.enableVertexAttribArray (this.draw_locacceleration);
	g.bindBuffer(g.ARRAY_BUFFER, this.draw_accelerationBufferObjekt);
	g.bufferData(g.ARRAY_BUFFER, this.vertAcceleration, g.DYNAMIC_DRAW);
	if (taccgl_errcheck) {if ((e=g.getError())!=0) alert ("Error "+e+" on bufferData acceleration");}

	if (this.draw_locrotp>=0) {
	    this.draw_rotABufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_locrota);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_rotABufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertRotA, g.DYNAMIC_DRAW);
	    if (taccgl_errcheck) {if ((e=g.getError())!=0) alert ("Error "+e+" on bufferData rota");}
	}
 
	if (this.draw_loccolor>=0) {
	    this.draw_colorBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_loccolor);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_colorBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertColor, g.DYNAMIC_DRAW);
	    if (taccgl_errcheck){if ((e=g.getError())!=0) alert ("Error "+e+" on bufferData color");}
	}

	if (this.draw_loctexmix>=0) {
	    this.draw_texmixBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_loctexmix);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_texmixBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertTexmix, g.DYNAMIC_DRAW);
	    if ((e=g.getError())!=0) alert ("Error "+e+" on bufferData texmix");
	}

	if (this.draw_locnormal>=0) {
	    this.draw_normalBufferObjekt = g.createBuffer();
	    g.enableVertexAttribArray (this.draw_locnormal);
	    g.bindBuffer(g.ARRAY_BUFFER, this.draw_normalBufferObjekt);
	    g.bufferData(g.ARRAY_BUFFER, this.vertNormal, g.DYNAMIC_DRAW);
	    if (taccgl_errcheck){if ((e=g.getError())!=0) alert ("Error "+e+" on bufferData normal");}
	}

	this.cv.style.transition=""; this.cv.style.display=this.epack!=false?'':'none'; this.cv.style.opacity=1;this.cv.style.visibility='visible';
	if (taccgl_debug) {
	    taccgl.clog ("Display 3D Canvas");
	} // taccgl_debug_end
	this.draw_vertexnumber=this.vertI; this.draw_shprognumber=this.shprog.length;

	var jaccobj=taccgl;

	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_vertexPosBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_locpos,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer pos"); }
	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_originBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_locOrigin,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {      if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer origin"); }
	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_vertexTexPosBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_loctexpos,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {      if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer texpos"); }
	if (jaccobj.draw_locrotp>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_rotPBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_locrotp,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {          if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer rotp");}
	}
	if (jaccobj.draw_locrota>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_rotABufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_locrota,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer rota");}
	}
	if (jaccobj.draw_loccolor>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_colorBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_loccolor,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {          if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer color");}
	}
	if (jaccobj.draw_loctexmix>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_texmixBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_loctexmix,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer texmix");}
	}
	if (jaccobj.draw_locnormal>=0){
	    g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_normalBufferObjekt);
	    g.vertexAttribPointer (jaccobj.draw_locnormal,4,g.FLOAT,false, 0,0);
	    if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer normal");}
	}
	g.bindBuffer(g.ARRAY_BUFFER, jaccobj.draw_accelerationBufferObjekt);
	g.vertexAttribPointer (jaccobj.draw_locacceleration,4,g.FLOAT,false, 0,0);
	if (taccgl_errcheck) {       if (taccgl_errcheck) {      if ((e=g.getError())!=0) alert ("Error "+e+" on vertexAttribPointer acceleration");}}

//	if (jaccobj.draw_texturecanvas) {
	g.activeTexture(g.TEXTURE0);
  	if (taccgl_errcheck) {     if ((e=g.getError())!=0) alert ("Error "+e+" activeTexture0");}
	g.bindTexture(g.TEXTURE_2D, jaccobj.draw_texturecanvas);
  	if (taccgl_errcheck) {     if ((e=g.getError())!=0) alert ("Error "+e+" bindTexture0");}
//	}
//	if (jaccobj.draw_texturecanvas2) {
	g.activeTexture(g.TEXTURE1);
  	if (taccgl_errcheck) {     if ((e=g.getError())!=0) alert ("Error "+e+" activeTexture1");}
	g.bindTexture(g.TEXTURE_2D, jaccobj.draw_texturecanvas2);
  	if (taccgl_errcheck) {     if ((e=g.getError())!=0) alert ("Error "+e+" bindTexture1"); }
//	}
	if (taccgl_errcheck) {       if ((e=g.getError())!=0) alert ("Error "+e+" on bindTexture");}
if (taccgl_debug) {
	if (console.time) console.timeEnd(ts);
} // taccgl_debug_end
    }
	
    this.setupShadow = function () {
	var g=this.g;
	var h=this.shadowH=2048;
	var w=this.shadowW=2048;
	this.shadowfb = g.createFramebuffer();
	g.bindFramebuffer (g.FRAMEBUFFER, this.shadowfb);
	this.shadowdb = g.createRenderbuffer();
	g.bindRenderbuffer (g.RENDERBUFFER, this.shadowdb);
	g.renderbufferStorage (g.RENDERBUFFER, g.DEPTH_COMPONENT16, w,h);
	g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, this.shadowdb);
	this.shadowtex = g.createTexture();
        g.activeTexture(g.TEXTURE2);
	g.bindTexture (g.TEXTURE_2D,this.shadowtex);
        g.activeTexture(g.TEXTURE2);
	g.texImage2D  (g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, null);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
//	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.REPEAT);
//	g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.REPEAT);
	g.framebufferTexture2D (g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, this.shadowtex, 0)
    }

    this.startDraw = function (g,p) {
	var e;
//	if ((e=g.getError())!=0) alert ("Error "+e+" before startDraw");
	if (g.isContextLost()  || ((e=g.getError())!=0) ) {
	    if (taccgl_errcheck) {  if (e!=0) alert ("Error "+e+" before startDraw"); }
	    this.dddmode=false;this.webglerror=true;
	    if (taccgl_debug && e==0) {
		alert ("Context Lost");
	    }  // taccgl_debug_end
	    return;
	}
        // var attr = g.getContextAttributes();  // get attr to inspect in debugger when needed 
	if (taccgl_errcheck) { if ((e=g.getError())!=0) alert ("Error "+e+" before adjustQuality"); }
	this.adjustQuality(); g=this.g; p=this.p;
	if (taccgl_errcheck) { if ((e=g.getError())!=0) alert ("Error "+e+" after adjustQuality"); }

	if (!this.vBgControl) this.incForeground(); else this.adjustForeground();

	
	this.draw_duration =1000;
	this.doatI=0;

        var plug = new taccglAnimPlug();
	plug.attime = this.duration;
	this.newDoat(plug);

	this.draw_frames=this.draw_meaFrames=0; this.slowStartupTime=0; this.slowStartupFrames=0;

	if (taccgl_errcheck) { if ((e=g.getError())!=0) alert ("Error "+e+" before bind Draw"); }
	this.bindDraw(g,p);
	if (this.webglerror) return;
	this.draw_startTime = this.draw_meaTime= this.perfnow();  this.draw_meaAdjust=0; this.draw_meaIgnore=0;
        this.loadTest=false; this.loadTestl=0;
	if (taccgl_debug) 
	    taccgl_timestepi=0;  
        // taccgl_debug_end

	if (this.shadow) this.setupShadow();

	if (g.isContextLost()  || ((e=g.getError())!=0) ) {
	    if (taccgl_errcheck) {  if (e!=0) alert ("Error "+e+" at end startDraw"); }
	    this.dddmode=false;this.webglerror=true;
	    if (taccgl_debug && e==0) {
		alert ("Context Lost");
	    }  // taccgl_debug_end
	    return;
	}
 
        this.draw_running=true; this.busy=true;
	if (taccgl_debug) {
	    taccgl.tlog ("++++++++++++++++++ 3D Rendering Loop Started +++++++++++++++++++");
	} // taccgl_debug_end
	taccgl_draw3d();
    }

    this.updateDraw = function () {
	if (taccgl_debug) {
	    var ts="Load Vertex Buffers into GPU (updateDraw) "+this.vertI+" size="+ this.vertBufferSize;
	    if (console.time) console.time(ts);
	} // taccgl_debug_end
	var g= this.g, e;
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
	if (taccgl_errcheck){ if ((e=g.getError())!=0) alert ("Error "+e+" on bufferData acceleration");}
	this.doat[this.doat.length-1].attime = this.duration;
	this.draw_vertexnumber=this.vertI; this.draw_shprognumber=this.shprog.length;
	taccgl.draw_meaIgnore=3;
	if (taccgl_debug) {
	    if (console.time) console.timeEnd(ts);
	} // taccgl_debug_end
    }
    this.updateDrawDD = function () {
//	taccgl.clog ("updateDrawDD "+this.duration);
	this.doat[this.doat.length-1].attime = this.duration;
	this.AAstartedLength = this.AA.length;
    }

    this.measureQuality = function () {
	this.qualityCnt[this.quality]++;
	var s = this.qualityCnt[1] + this.qualityCnt[2] + this.qualityCnt[3],
            me= document.getElementById ("taccgl_ImmediateMeasureImage"); 
        if (me) {
	    me.src = taccgl_ImmediateMeasureImage + this.quality + '.png'; 
	    var q=this.quality;
	    if (q==0) me.title="Slow taccGL Animations Disabled.";
	    if (q==1) me.title="For performance reasons taccGL Animations run on a small portion of the window only. Shadows are disabled.";
	    if (q==2) me.title="For performance reasons taccGL Animations are simplified and do not run full window but still on a big portion of the window. Shadows are disabled.";
	    if (q==3) me.title="taccGL Animations run full speed in full window " + (this.shadowEna ? "with" : "without")+" shadows.";
	}
	if (s==10) {
	    var p = this.qualityCnt[1] + this.qualityCnt[2]*2 + this.qualityCnt[3]*3;
	    q=Math.round(p/s);
            me= document.getElementById ("taccgl_MeasureImage"); 
	    if (me) {
		me.src = taccgl_MeasureImage + q + '.png'; 
	    }
	}
    }

    this.applyObjStyle = function(el, st) {
	var n;
	for (n in st) el.style[n]=st[n];
    }

    this.drawTerminated = function () {
	if (taccgl.endMode=="background") {
	    this.foregroundCnt=0; this.adjustForeground();
	} else if (taccgl.endMode=="foreground") {
	    this.incForeground();
	} else {
	    // this.cv.style.display='none'; 
	    // this.cv.style.transition = "opacity 0.5s"; this.cv.style.opacity = 0;
	    this.applyObjStyle (this.cv,this.endStyle);
	    if (taccgl_debug) {
		taccgl.clog ("Non-Display 3D Canvas");
	    } // taccgl_debug_end
	    if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
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

	this.g.deleteTexture ( this.draw_texturecanvas);  this.draw_texturecanvas = null;
	this.g.deleteTexture ( this.draw_texturecanvas2);  this.draw_texturecanvas2 = null;

        this.draw_running=false; this.busy=false;
        var vel = document.getElementById('taccglVertexNumber');
        if (vel) vel.innerHTML = this.draw_vertexnumber + '/' + this.draw_frames + "/"+ this.draw_meaFrames / (this.perfnow() - this.draw_meaTime) * 1000;
	//		     + " T "+ this.timeofdraw;

	for (i=0; i<this.showAfterAnimation.length; i++) {
	    var pv=this.showAfterAnimation[i].el.taccgl.postVisibility
	    var ov=this.showAfterAnimation[i].el.taccgl.postOpacity
	    if (taccgl_debug) { 
		taccgl.clog ("Apply postVisibility "+this.showAfterAnimation[i].el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	    } // taccgl_debug_end
	    if (pv||pv=="") this.showAfterAnimation[i].el.style.visibility= pv;
	    if (ov||ov=="") this.showAfterAnimation[i].el.style.opacity= ov;
	}

	this.measureQuality();
        var uTime = (this.perfnow() - taccgl.draw_meaTime) / taccgl.draw_duration,
	    frate = taccgl.draw_meaFrames / uTime;
	if (frate > 50 && taccgl.quality < 3) {taccgl.quality++;}
//	taccgl.quality=2;

	this.showHideComments();
	if (taccgl_debug) {
	    taccgl.tlog ("------------------ 3D Rendering Loop Terminated ----------------");
	} // taccgl_debug_end
        this.StartRender();
    }
    this.drawImmediateTerm = function () {
	if (this.reqAnimFrameId) window.taccgl_cancelAnimationFrame (this.reqAnimFrameId);
	clearInterval(this.interval);
	this.cv.style.display='none'; 
	if (taccgl_debug) {
	    taccgl.clog ("Non-Display 3D Canvas");
	} // taccgl_debug_end
	if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	this.dddmode=false; this.compatmode=true; this.quality=0; 
	this.ddFallBack();
	this.nullDraw();
	if (taccgl_debug) {
	    taccgl.clog ("------------------ 3D Rendering Loop Aborted (because or Error or slow Timing Quality) ------------");
	} // taccgl_debug_end
	this.showHideComments();
	this.measureQuality();
    }
 

    this.doHook = function (h,a,b,c,d,e,f,g) {
	if (typeof (h) == "function") return h(a,b,c,d,e,f,g);
	else if (typeof (h) == "string") return eval(h);
	else if (h && typeof (h) == "object") 
	    if (h.length||h.length==0) {
		var i;
		for (i=0;i<h.length;i++) this.doHook(h[i],a,b,c,d,e,f,g)
	    } else {
		h.todo(a,b,c,d,e,f,g);
	    }
    }

    this.doat = new Array (0);

    this.newDoat = function (a) {
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
	var i=this.doat.length-1;
        while (i>=0 && this.doat[i].attime>a.attime) { this.doat[i+1]=this.doat[i]; i--;}
	this.doat[i+1]=a;
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
    }

    this.adjustDoat = function (i,t) {
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
	this.doat[i].attime=t;
	while (this.doat[i+1].attime<t) {
	    var x=this.doat[i+1]; this.doat[i+1]=this.doat[i]; this.doat[i]=x;
	    i++;
	}
	/* if (i==this.doatI)  this.doatI--; */
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
    }

    this.findInDoat = function (a) {
	var f=0, t=this.doat.length-1;
	var v=a.attime;
	if (!v && v!=0) return null;
	if (t<0) return null;
	
	while (true) {
	    var m=Math.floor((f+t)/2);
	    if ( this.doat[m].attime < v ) f=m; else 
		if ( this.doat[m].attime > v ) t=m; else {
		    var i=m;
		    while ( this.doat[i]!=a && this.doat[i-1].attime == v) i--;
		    if (this.doat[i]==a) return i;
		    i=m+1;
		    while ( this.doat[i]!=a && this.doat[i+1].attime == v) i++;
		    if (this.doat[i]==a) return i;
		    return null;
		}
	}
    }

    this.deleteFromDoat = function (a) {
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
	var i=this.findInDoat (a);
	if (i!=null) {
	    if (this.doatI>i)this.doatI--; 
	    this.doat.splice(i,1);
	}
	if (taccgl_debug) {
	    this.checkDoat();
	} // taccgl_debug_end
    }

    this.checkDoat = function () {
	var i; 
	if (this.draw_running)
	    if (! this.doat[this.doat.length-1].isPlug) {
		alert("missing plug");
	    }
	for (i=0; i<this.doat.length-1; i++) {
	    if (this.doat[i].isPlug) {
		alert("plug not at end");
	    }
	    if ( !this.doat[i].attime && this.doat[i].attime!=0) 
		alert ("doat null");
	    if (! (this.doat[i].attime <= this.doat[i+1].attime)) {
		alert ("doat sort error ");
	    }
	}
    }

    this.setDuration = function (d) {
	this.duration = d;
    }

    this.setShader = function (p){
//	return;
	if (this.shprogfrom[this.shprogfrom.length-1]==this.vertI) {
	    this.shprog[this.shprogfrom.length-1]=p;
	} else if (this.shprog[this.shprogfrom.length-1]!=p) {
	    this.shprog.push(p);
	    this.shprogfrom.push(this.vertI);
	}
    }

    this.startDD = function () {
	if (!this.vBgControl) this.incForeground();
	this.draw_duration =1000;
	this.doatI=0;

	this.adjustQuality();
	if (!this.vBgControl) this.incForeground(); else this.adjustForeground();

        var plug = new taccglAnimPlug();
	plug.attime = this.duration;
	this.newDoat(plug);
        this.draw_running=true; this.busy=true;

	this.cv.style.transition=""; this.cv.style.display=this.epack!=false?'':'none'; this.cv.style.opacity=1; this.cv.style.visibility='visible';
	if (taccgl_debug) {
	    taccgl.clog ("Display 3D Canvas");
	} // taccgl_debug_end
	this.draw_frames=this.draw_meaFrames=0; this.slowStartupTime=0;this.slowStartupFrames=0;
	this.draw_startTime = this.draw_meaTime = this.perfnow(); this.draw_meaAdjust=0; this.draw_meaIgnore=0;
	this.loadTest=false; this.loadTestl=0;
	this.AAstartedLength=this.AA.length;
	
	// if (mozRequestAnimationFrame) taccgl_requestAnimationFrame=null;  

	if (!window.taccgl_requestAnimationFrame) this.interval = setInterval (taccgl_draw2d,16); 
	if (taccgl_debug) {
	    taccgl.clog ("++++++++++++++++++ 2D Rendering Loop Started +++++++++++++++++++");
	} // taccgl_debug_end
        taccgl_draw2d();
    }

    this.drawTerminatedDD = function () {
	clearInterval(this.interval);
	this.cv.style.display='none'; 
	if (taccgl_debug) {
	    taccgl.clog ("Non-Display 3D Canvas");
	} // taccgl_debug_end
	if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	for (i=0; i<this.showAfterAnimation.length; i++) {
	    var pv=this.showAfterAnimation[i].el.taccgl.postVisibility
	    var ov=this.showAfterAnimation[i].el.taccgl.postOpacity
	    if (taccgl_debug) {
		taccgl.clog ("Apply postVisibility "+this.showAfterAnimation[i].el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	    } // taccgl_debug_end
	    if (pv||pv=="") this.showAfterAnimation[i].el.style.visibility= pv;
	    if (ov||ov==""||ov==0) this.showAfterAnimation[i].el.style.opacity= ov;
	}

        var vel = document.getElementById('taccglVertexNumber');
        if (vel) vel.innerHTML = this.draw_meaFrames /* + " " +(new Date().getTime() - this.draw_meaTime) */ + " " +
		     this.draw_meaFrames / (this.perfnow() - this.draw_meaTime - this.draw_meaAdjust) * 1000;

	this.measureQuality();

        var uTime = (this.perfnow()- taccgl.draw_meaTime - this.draw_meaAdjust) / taccgl.draw_duration,
	    frate = taccgl.draw_meaFrames / uTime;
	if (frate > 50 && taccgl.quality < 3) {taccgl.quality++;}

	if (taccgl_debug) {
	    taccgl.clog ("------------------ 2D Rendering Loop Terminated ----------------");
	} // taccgl_debug_end
	this.showHideComments();
        this.StartRender();
    }
    this.drawImmediateTermDD = function () {
	clearInterval(this.interval);
	this.cv.style.display='none'; 
	if (taccgl_debug) {
	    taccgl.clog ("Non-display 3D Canvas");
	} // taccgl_debug_end
	if (taccgl.controller && taccgl.controller.invisibleCanvas) taccgl.controller.invisibleCanvas();
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	this.ddmode=false; this.compatmode=true; this.quality=0;
	this.nullDraw();
	if (taccgl_debug) {
	    taccgl.clog ("------------------ 2D Rendering Loop Aborted  (because of Error or slow timing) ----------------");
	} // taccgl_debug_end
	this.showHideComments();
	this.measureQuality();
    }
    this.doAllDoats = function () {
	var i;
	for (i=0; i<this.doat.length;i++) {
	    var t=this.doat[i];
//	    if (t.elshowatend) t.elshowatend.style.visibility= t.elshowatend.taccgl.postVisibility;
	    if (t.elshowatend) {
		var pv = t.postVisibility;
		var ov = t.postOpacity;
   	        if (taccgl_debug) {
	           taccgl.clog ("doAllDoats Apply postVisibility "+t.el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	        } // taccgl_debug_end

		if (pv||pv=="") t.elshowatend.style.visibility=pv;
		if (ov||ov==""||ov==0) t.elshowatend.style.opacity=ov;
	    }	   
 	}
    }
    this.nullDraw = function () {
	var i;
	this.foregroundCnt = 0;
        this.draw_running=false; this.busy=false;
	this.doAllDoats();
	for (i=0; i<this.showAfterAnimation.length; i++) {
	    var pv=this.showAfterAnimation[i].el.taccgl.postVisibility
	    var ov=this.showAfterAnimation[i].el.taccgl.postOpacity
	    if (taccgl_debug) {
	        taccgl.clog ("NullDraw Apply postVisibility "+this.showAfterAnimation[i].el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	    } // taccgl_debug_end
	    if (pv||pv=="") this.showAfterAnimation[i].el.style.visibility= pv;
	    if (ov||ov=="") this.showAfterAnimation[i].el.style.opacity= ov;
	}
        this.StartRender();
	this.doHook(this.onTerm);
	// this.showHideComments(); Do not show comments if there was no animation actually running
       	if (this.cv) this.cv.style.display='none'; 
    }
    this.cancelDraw = function () {
	if (this.reqAnimFrameId) window.taccgl_cancelAnimationFrame (this.reqAnimFrameId);
	clearInterval(this.interval);
    }
    this.continueDraw = function () {
	if (window.taccgl_requestAnimationFrame) {
	    this.reqAnimFrameId= taccgl_requestAnimationFrame (this.dddmode?taccgl_draw3d:taccgl_draw2d); 
	} else {
	    this.interval = setInterval (this.dddmode?taccgl_draw3d:taccgl_draw2d,16);
	}
    }
    this.stop = function () {
	this.cancelDraw();
	if (!taccgl.draw_running) return;
	this.doAllDoats();
	if (this.dddmode) {
	    this.drawTerminated();
	} else if (this.ddmode) {
	    this.drawTerminatedDD();
	}
	this.doHook(this.onStop);
    }

    this.start = function (s) {
//	if (s!="no epilepsy warning" || (taccgl.busy && !taccgl.draw_running)) {
	if (s!="no epilepsy warning" || taccgl.epack==false || this.showWarning) {
            if (this.ddmode || this.dddmode) {
		var w = this.epcheck();
		if (w=="wait") return;
		if (!w) { 
		    if (this.draw_running) this.stop(); else this.nullDraw(); 
		    this.cv.style.display='none'; 
		    return;
		}
	    }
	}
	this.showHideComments();
	if (this.ddmode && this.epack!=false ) {
	    if (!taccgl.draw_running) this.startDD(); else taccgl.updateDrawDD(); 
	} else 	if (this.dddmode && this.epack!=false ) {
	    taccgl.setupTextures();
	    if (this.webglerror && !this.dddmode) {
		this.drawImmediateTerm();
	    } else 
		if (!taccgl.draw_running) taccgl.startDraw(taccgl.g,taccgl.p); else taccgl.updateDraw();
	} else {
	    this.nullDraw();
	}
    }
    this.restart = function (){
	if (!taccgl.draw_running) this.start(); else this.draw_startTime = this.perfnow();
    }

//  Debug Functions
    this.ShowTexCanvas = function (i,bg) {
	var c;
	if (i==1)
	    c = document.getElementById ("taccgl_textureCanvas");
	else if (i==2)
	    c = document.getElementById ("taccgl_textureCanvas2");
	c.style.display='';
	c.style.backgroundColor=bg;
    }
    this.Bg3DCanvas = function (bg) {
	var c = document.getElementById ("taccgl_canvas3d");
	c.style.backgroundColor=bg;
    }
    this.Display3DCanvas = function (d) {
	var c = document.getElementById ("taccgl_canvas3d");
	c.style.display=d;
    }
    this.ZIndex3DCanvas = function (d) {
	var c = document.getElementById ("taccgl_canvas3d");
	c.style.zIndex=d;
    }
    this.HideTexCanvas = function () {
	document.getElementById ('taccgl_textureCanvas').style.display='none';
	document.getElementById ('taccgl_textureCanvas2').style.display='none';
    }
// End Debug Functions

    this.texTo = function (i) {
	this.texcanvasi=i;
	if (i==1)
	    this.texcanvas = document.getElementById ("taccgl_textureCanvas");
	else if (i==2)
	    this.texcanvas = document.getElementById ("taccgl_textureCanvas2");
        if (this.texcanvas && this.texcanvas.getContext){
          this.texc = this.texcanvas.getContext("2d");
        }
    }
    this.texTransform = function (a,b,c,d,e,f) {
//	this.texc.setTransform(a,b,c,d,e,f);
	var p=this.pr;
	this.texc.setTransform(p*a,p*b,p*c,p*d,p*e,p*f);
    }

    this.markCanvasChanged = function (){
	if (this.texcanvasi==1) this.textureCanvasChanged = true; else
	    if (this.texcanvasi==2) this.textureCanvasChanged2 = true;
    }

    this.texClear = function (i) {
	var el;
	if (!this.initialized) this.begin();
	if (i==1) {
	    el = document.getElementById ("taccgl_textureCanvas");
	    this.textureCanvasChanged = true;
	} if (i==2) {
	    el = document.getElementById ("taccgl_textureCanvas2");
	    this.textureCanvasChanged2 = true;
	}
	if (el) el.width=el.width;
	if (this.texcanvasi==i) {
	    if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    var x=this.texcanvas;
	    this.texTo(i); if (this.texc) taccgl.texTransform (1,0,0,1,0,0);
	    this.texTo(x);
	}
    }

    this.texClearAll = function () {
	if (!this.initialized) this.begin();
	this.texClear(1);
	this.texClear(2);
	this.texTo(1);
    }

    this.a = function (el,k) {
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	if (typeof (k) == "object" ) {k.actorInit(el); return k;} else return new k(el);
    }

    this.actorHide = function (el,k) {
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	var a; 
	if (typeof (k) == "object" )  {k.actorInit(el); a=k;} else a = new k (el);
	a.hide(); a.textureDraw ();
	return a;
    }

    this.actor = function (el,k,v,t){
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	if (!t) t=1;
	var a; 
	if (typeof (k) == "object" )  {k.actorInit(el); a=k;} else a = new k (el);
	a.hideAtBegin(); taccgl.texTo(t); a.textureDraw (); 
	if (v) { a.visatend(v); } else {
	    taccgl.taccglAttach(a.el);
	    if (!a.el.taccgl.preVisibility&&a.el.taccgl.preVisibility!="") {a.el.taccgl.preVisibility=a.el.style.visibility;}
	    a.visatend(a.el.taccgl.preVisibility);
	}
//	if (v) {a.el.taccgl.postVisibility=v; } else {a.el.taccgl.postVisibility=a.el.taccgl.preVisibility;}
//	this.showAfterAnimation.push(a);
	if (t==2) a.blend(0,1);
	return a;
    }
    this.shadow = function (el,k) {
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel) { alert ("No Element with id "+el); return}
	    el=xel;
	}
	if (!this.initialized) this.begin();
	if (!k) k=this.taccglAnim;
	this.taccglAttach(el);
	if (el.taccgl.asShadow) { return el.taccgl.asShadow;} 
	else {
	    var r;
	    if (typeof (k) == "object" ) {k.actorInit(el); r=k;} else r= new k(el);
	    el.taccgl.asShadow=r;
	    return r;
	}
    }

    this.getShadow = function (el) {
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel) { alert ("No Element with id "+el); return}
	    el=xel;
	}
	if (!el) return null;
	if (!el.taccgl) return null;
	var as;
	if (!(as=el.taccgl.asShadow)) return null;
	return as;
    }

    this.taccglAnim = function (el){
	this.init(el);
    }
    var tap=new taccglAnimPrototype();
    tap.taccglAnimClone.prototype = tap;
    this.taccglAnim.prototype = tap;

    this.flexiBorder = function (el) {
	this.init(el);
    }
    this.multiFace = function (el) {
	this.init(el);
    }
    this.dddBox = function (el) {
	this.init(el);
    }

    this.mEmpty = function ()       { return new taccglMultiEmpty (); }
    this.mSingle= function (a)      { return new taccglMultiElement (a); }
    this.ma     = function (el,k)   { return new taccglMultiElement (this.a(el,k));}
    this.mClass = function (cl,k)   { return new taccglMultiSet ( document.getElementsByClassName(cl),k);}
    this.mName  = function (cl,k)   { return new taccglMultiSet ( document.getElementsByName(cl),k);}
    this.mTagName = function (cl,k) { return new taccglMultiSet ( document.getElementsByTagName(cl),k);}

    
 
    this.paintTextNode = function (el){
	var r = document.createRange(),
            tcel = el.textContent; 
//        if (tcel.match(/Currently/)) 
//	    var breakhere=1;
	r.selectNode (el);
        var i =tcel.search(/\S+/); 
        if (i>0) r.setStart (el,i);
	var rects = r.getClientRects(),
	    t=this.texc;

	if (rects.length>=1) { /* one line paint at once */
	   var cs=null,  /* getComputedStyle(el) does not work  */ font;
	   if (!cs) { 
	       if (el.parentElement)
		   cs=getComputedStyle(el.parentElement);
	       else
		   cs=getComputedStyle(el.parentNode);
	   } 
           if (cs["fontStyle"]) {
  	      font =   cs["fontStyle"] + " " 
	       + cs["fontVariant"] +  " "  + cs["fontWeight"]  +  " " + cs["fontSize"] + " " + cs["fontFamily"];
	   } else {
	      font =  cs["font-style"] + " " 
	      + cs["font-variant"] + " " + cs["font-weight"]  + " " + cs["font-size"] + " " + cs["font-family"];
	   }
	    t.lineWidth=1;
          font=font.replace(/Calibri/,"calibri");
  	  t.font = font;
	    if (taccgl_debug_paint) { // (taccgl_debug)
		taccgl.clog(font+" <-> "+t.font);
	    }  // taccgl_debug_end
	  t.fillStyle = cs.color;
	  var lh = parseInt(cs["line-height"]); 
	  if (typeof (lh)!="number" || isNaN(lh)) lh=parseInt(cs["lineHeight"]); 
	  if (typeof (lh)!="number" || isNaN(lh)) lh=1.2*parseInt(cs["font-size"]);
	  if (typeof (lh)!="number" || isNaN(lh)) lh=19;
	  t.textBaseline = "bottom";
	}

	if (rects.length==1) { /* one line paint at once */
          var x= rects[0].left, y=rects[0].bottom;
	  x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
	  var tc = el.textContent; 
	  tc = r.toString();
	    tc = tc.replace (/\s+/g," ");  
	  t.fillText (tc,x,y);
	  // t.strokeRect (x,y-rects[0].height,rects[0].width,rects[0].height);
	} else if (rects.length>1) { /* paint word by word */
  	   var regex = /\S+/g,
	       res, j=0; 
	   while ((res = regex.exec(tcel)) && j<1000) {
                r.setStart (el,res.index);
                r.setEnd   (el,res.index+res[0].length);
	        rects = r.getClientRects();
	        tc = r.toString(), x= rects[0].left; y=rects[0].bottom;
 	        x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
 	        t.fillText (tc,x,y);
 	        // t.strokeRect (x,y-rects[0].height,rects[0].width,rects[0].height);
		j++;
	   }
	}

    }

    this.paintBackground = function (el) {
	var t=this.texc,
	    cs=getComputedStyle(el),
	    c = cs.backgroundColor;
	if (c=='none' || c=='rgba(0, 0, 0, 0)' || c=="transparent") return;
        t.fillStyle = c;
        var par=el, x= el.offsetLeft, y=el.offsetTop;
        while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
        var btlr = this.getPxProp (cs.borderTopLeftRadius,0),
	    btrr = this.getPxProp (cs.borderTopRightRadius,0),
	    bblr = this.getPxProp (cs.borderBottomLeftRadius,0),
	    bbrr = this.getPxProp (cs.borderBottomRightRadius,0),
	    ww=0.5;

	var wi=el.offsetWidth, he= el.offsetHeight;
	if (el.tagName=="TD") {
	    var  cr=el.getClientRects();
	    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
            x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
	}

	if (btlr==0 && btrr==0 && bblr==0 && bbrr==0) {
	    t.fillRect (x,y,wi,he);
	} else {
	    t.beginPath();
	    /* top */
	    var d = (1-Math.sqrt(0.5))*btlr;
	    if (btlr>0) { t.moveTo ( x+d+ww,  y+d+ww ); t.arcTo ( x+d+d+ww,  y+ww, x+btlr+ww,y+ww, btlr ) } else t.moveTo (x+ww,y+ww);
	    t.lineTo ( x+wi - btrr-ww, y+ww );
   	    d = (1-Math.sqrt(0.5))*btrr;
	    if (btrr>0) { t.arcTo (   x+wi-d-d-ww,  y+ww, x+wi-d-ww, y+ww+d,  btrr ) } else t.lineTo ( x+wi, y+ww );
  	    
	    /* right side */
	    d = (1-Math.sqrt(0.5))*btrr;
	    if (btrr>0) { t.arcTo ( x+wi-ww,  y+d+d+ww, x+wi-ww, y+btrr+ww, btrr ) };
  	    t.lineTo ( x+wi-ww, y+he-bbrr-ww );
   	    d = (1-Math.sqrt(0.5))*bbrr;
	    if (bbrr>0) { t.arcTo (  x+wi-ww,  y+he-d-d-ww, x+wi-d-ww, y+he-ww-d,  bbrr ) };

	    /* bottom side */
	    d = (1-Math.sqrt(0.5))*bbrr;
	    if (bbrr>0) { t.arcTo (  x+wi-d-d-ww,  y+he-ww,  x+wi - bbrr-ww,  y+he-ww, bbrr ) }; 
	    t.lineTo ( x+ bblr+ww, y+he-ww );
	    d = (1-Math.sqrt(0.5))*bblr;
	    if (bblr>0) { t.arcTo ( x+d+d+ww,  y+he-ww,  x+d+ww, y+he-d-ww,  bblr ) } 

	    /* left side */
   	    d = (1-Math.sqrt(0.5))*bblr;
	    if (bblr>0) { t.arcTo (  x+ww,  y+he-d-d-ww, x+ww, y+he-bblr, bblr ) };
            
	    t.lineTo ( x+ww, y+btlr+ww );
	    d = (1-Math.sqrt(0.5))*btlr;
	    if (btlr>0) { t.arcTo ( x+ww,  y+d+d+ww, x+ww+d, y+d+ww, btlr ) }
  	    t.fill();

	}
    }

    this.getPxProp = function (s,d) {
	var r = parseInt (s);
	if (typeof (r) != 'number') return d;
        if (r<0) return d;
	return r;
    }

    this.paintBorder = function (el) {
	var t=this.texc,
  	cs=getComputedStyle(el),
        c= cs.borderTopColor,cr;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    var btlr = this.getPxProp (cs.borderTopLeftRadius,0),
	        btrr = this.getPxProp (cs.borderTopRightRadius,0);

	    var w =  this.getPxProp (cs.borderTopWidth,0); var ww=w*0.5;
	    if (w>0) {
		var wi=el.offsetWidth, he= el.offsetHeight,x ,y;
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    var par=el; x= el.offsetLeft, y=el.offsetTop;
                    while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w;
		var d = (1-Math.sqrt(0.5))*btlr;
		if (btlr>0) { t.moveTo ( x+d+ww,  y+d+ww ); t.arcTo ( x+d+d+ww,  y+ww, x+btlr+ww,y+ww, btlr ) } else t.moveTo (x,y+ww);
		t.lineTo ( x+wi - btrr-ww, y+ww );
		d = (1-Math.sqrt(0.5))*btrr;
		if (btrr>0) { t.arcTo (   x+wi-d-d-ww,  y+ww, x+wi-d-ww, y+ww+d,  btrr ) } else t.lineTo ( x+wi, y+ww );
		t.stroke();
	    }
	}
	c = cs.borderRightColor;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    btrr = this.getPxProp (cs.borderTopRightRadius,0);
	    var bbrr = this.getPxProp (cs.borderBottomRightRadius,0);
	    w =  this.getPxProp (cs.borderRightWidth,0); ww=w*0.5;
	    if (w>0) {
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    // var wi,he,x,y;
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    par=el; x= el.offsetLeft, y=el.offsetTop, he=el.offsetHeight, wi=el.offsetWidth;
                    while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		x += wi;
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w;
		d = (1-Math.sqrt(0.5))*btrr;
		if (btrr>0) { t.moveTo ( x-d-ww,  y+d+ww ); t.arcTo ( x-ww,  y+d+d+ww, x-ww, y+btrr+ww, btrr ) } else t.moveTo (x-ww,y);
		t.lineTo ( x-ww, y+he-bbrr-ww );
		d = (1-Math.sqrt(0.5))*bbrr;
		if (bbrr>0) { t.arcTo (  x-ww,  y+he-d-d-ww, x-d-ww, y+he-ww-d,  bbrr ) } else t.lineTo ( x-ww, y+he);
		t.stroke();
	    }
	}
	c = cs.borderBottomColor;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    var bblr = this.getPxProp (cs.borderBottomLeftRadius,0);
  	    bbrr = this.getPxProp (cs.borderBottomRightRadius,0),
	    w =  this.getPxProp (cs.borderBottomWidth,0), ww=w*0.5;
	    if (w>0) {
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    par=el, x= el.offsetLeft, y=el.offsetTop; he=el.offsetHeight; wi=el.offsetWidth;
                    while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w; y+=he;
		d = (1-Math.sqrt(0.5))*bblr;
		if (bblr>0) { t.moveTo ( x+d+ww,  y-d-ww ); t.arcTo ( x+d+d+ww,  y-ww, x+bblr+ww,y-ww, bblr ) } else t.moveTo (x,y-ww);
		t.lineTo ( x+wi - bbrr-ww, y-ww );
		d = (1-Math.sqrt(0.5))*bbrr;
		if (bbrr>0) { t.arcTo (   x+wi-d-d-ww,  y-ww, x+wi-d-ww, y-ww-d,  bbrr ) } else	t.lineTo ( x+wi, y-ww ); 
		t.stroke();
	    }
	}

	c = cs.borderLeftColor;
	if (c!='none' || c!='rgba(0, 0, 0, 0)' || c!="transparent"){
	    btlr = this.getPxProp (cs.borderTopLeftRadius,0);
	    bblr = this.getPxProp (cs.borderBottomLeftRadius,0);

	    w =  this.getPxProp (cs.borderLeftWidth,0), ww=w*0.5;
	    if (w>0) {
		if (el.tagName=="TD") {
		    cr=el.getClientRects();
		    // var wi, he, x,y;
		    wi=cr[0].width; he=cr[0].height; x=cr[0].left; y=cr[0].top;
		    x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
		} else {
                    par=el, x= el.offsetLeft, y=el.offsetTop, he=el.offsetHeight, wi=el.offsetWidth;
                    while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}
		}
		//		t.fillRect (x+btlr,y,wi-btlr-btrr, w);
		t.beginPath();
		t.strokeStyle = c;
		t.lineWidth = w;
		d = (1-Math.sqrt(0.5))*btlr;
		if (btlr>0) { t.moveTo ( x+d+ww,  y+d+ww ); t.arcTo ( x+ww,  y+d+d+ww, x+ww, y+btlr+ww, btlr ) } else t.moveTo (x+ww,y);
		t.lineTo ( x+ww, y+he-bblr-ww );
		d = (1-Math.sqrt(0.5))*bblr;
		if (bblr>0) { t.arcTo (   x+ww,  y+he-d-d-ww, x+d+ww, y+he-ww-d,  bblr ) } else t.lineTo ( x+ww, y+he);
		t.stroke();
	    }
	}
     }

    this.paintImg = function (el) {
	var cs=getComputedStyle(el),
	    pl= this.getPxProp (cs.paddingLeft,0),
	    pt= this.getPxProp (cs.paddingTop,0),
	    pr= this.getPxProp (cs.paddingRight,0),
	    pb= this.getPxProp (cs.paddingBottom,0),
	    par=el, x0=el.clientLeft+el.offsetLeft, y0= el.clientTop+el.offsetTop;
	while (par.offsetParent) { par=par.offsetParent; x0+=par.offsetLeft; y0+=par.offsetTop;}
	taccgl.texc.drawImage(el, x0+pl, y0+pt, el.clientWidth-pl-pr, el.clientHeight-pt-pb );
    }

    this.paintElement = function (el,ignoreHidden) {
	var needsRestore=false;
	if (!(this.ddmode || this.dddmode)) return;
       this.markCanvasChanged();
       if (typeof (el)=="string") el=document.getElementById(el);
       if (el.nodeType==3) {
	   this.paintTextNode(el);
       } else if (el.nodeType==1) {
  	   var cs=getComputedStyle(el);
	   if (el.style.visibility=='hidden' && !ignoreHidden) return;
	   if (cs.display== 'none') return;
	   	   
//	   if (el.id=='MOvery_fast')
//	       var breakhere=1;
	   if (el.style.visibility!='visible' && !ignoreHidden) {
	       if (!this.hiddenClasses) this.calcHiddenClasses();
	       var cns = el.className.split(" "), i;
	       for (i=0; i<cns.length; i++) {
		   var c=cns[i];
		   if (this.hiddenClasses["."+c]=='hidden') return;
		   if (this.hiddenClasses[(el.tagName.toUpperCase()+"."+c)]=='hidden') return;
		   if (this.hiddenClasses["#"+el.id]=='hidden') return;
	       }
	   }
	   
	   var t;
	   if ( ((t=cs.webkitTransform) || (t=cs.mozTransform) || (t=cs.msTransform) || (t=cs.transform)) && (t!="none") ) {
	       needsRestore=true;
	       this.texc.save();
	       var m;
	       var savekind, to;
	       if ( t = cs.transform) { m= taccgl.m32parse(t); to=cs.transformOrigin; savekind="trans"; el.style.transform="none";} else
		   if ( t = cs.webkitTransform) { m= taccgl.m32parse(t); to=cs.webkitTransformOrigin; savekind="webkit";el.style.webkitTransform= "none";} else 
		       if ( t = cs.mozTransform) { m= taccgl.m32parse(t);to=cs.mozTransformOrigin; savekind="moz";el.style.mozTransform= "none"; } else
			   if ( t = cs.mstTransform) { m= taccgl.m32parse(t);to=cs.msTransformOrigin; savekind="ms"; el.style.msTransform= "none";}
	       var savetrans="matrix("+m[0].toFixed(20)+","+m[3].toFixed(20)+","+m[1].toFixed(20)+","+ m[4].toFixed(20)+","+ m[2].toFixed(20)+","+ m[5].toFixed(20)+")";
               var toa=to.split(" ");
	       var tox=parseFloat(toa[0]), toy=parseFloat(toa[1]);
//	       var savetrans= el.style.webkitTransform; el.style.webkitTransform= "none";
	       var cr=el.getClientRects();
	       var x = cr[0].left, y = cr[0].top;
               x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;
	       if (taccgl_debug_paint) { // (taccgl_debug)
		   taccgl.clog(cr[0]); taccgl.clog (t); taccgl.clog(m); taccgl.clog(toa);
	       }  // taccgl_debug_end
//	       this.texc.translate( 50,50 );
	       this.texc.translate( x+tox, y+toy); 
	       this.texc.transform (m[0], m[3], m[1], m[4], m[2], m[5]);
//	       this.texc.transform (1, 0, 0, 2, 0, 0);
//	       this.texc.transform (0, 1, 1, 0, 0, 0);
	       this.texc.translate( -x-tox, -y-toy);
	   }
	   this.paintBackground(el); this.paintBorder(el);

	   var n=el.tagName;
           if (n=="IMG") { this.paintImg(el);
	   }
       }

       c=el.firstChild;
       while (c) {
	   this.paintElement(c,false);
	   c=c.nextSibling;
       }
	if (needsRestore) {
	    this.texc.restore();
	    if (savekind=="trans") el.style.transform=savetrans;
	    else if (savekind=="webkit")  el.style.webkitTransform=savetrans;
	    else if (savekind=="moz")  el.style.mozTransform=savetrans;
	    else if (savekind=="ms")  el.style.msTransform=savetrans;
	}
    }

    this.hiddenClassesConstr= function () {}
    this.calcHiddenClasses = function () {
	this.hiddenClasses = new this.hiddenClassesConstr();
	var ss = window.document.styleSheets, i,s;
        for (i=0; i<ss.length; i++) {
	    s = ss[i];
	    if (!s.disabled && s.type=="text/css") {
		var j,r;
		for (j=0; j<s.cssRules.length; j++) {
		    r = s.cssRules[j];
		    if (r.selectorText && r.selectorText.match (/([^.:]*\.[^.:]+)|(#[^.:]+)/)) {
			this.hiddenClasses[r.selectorText]=r.style.visibility;
		    }
		}
	    }
	}

    }

    this.taccglAttachment = function (){
	this.delno=taccgl.delno;
    }

    this.taccglAttach = function (el) {
	if (el.taccgl && el.taccgl.delno==this.delno) return;
	if (!el.taccgl) { 
	    var t;
	    t = new this.taccglAttachment();
	    el.taccgl = t;
	}
	el.taccgl.delno=taccgl.delno;
	el.taccgl.preVisibility=el.taccgl.postVisibility=el.taccgl.preOpacity=el.taccgl.postOpacity=null;
	el.taccgl.asShadow=null;
    }

    // Math utilities
    this.m32IConst = [1,0,0,0,1,0];
    this.m32I = function () { return this.m32IConst.slice(0);} 
    this.m32add = function (a,b) {
	a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];a[3]+=b[3];
	a[4]+=b[4];a[5]+=b[5];return a;
    }
    this.m32mulx = function (m,v) { var a=m; return a[0]*v[0]+a[1]*v[1]+a[2]; }
    this.m32muly = function (m,v) { var a=m; return a[3]*v[0]+a[4]*v[1]+a[5]; }
    this.m32parse = function (t) {
	var regex= /matrix\(([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*),([- 0-9.Ee]*)\)/;
	var a=regex.exec(t);
	if (a && a.length==7) {
	    return ([ parseFloat(a[1]), parseFloat(a[3]),parseFloat(a[5]),parseFloat(a[2]),parseFloat(a[4]),parseFloat(a[6])] );
	}
	return null;
    }

    this.m33IConst = [1,0,0,0,1,0,0,0,1];
    this.m33I = function () { return this.m33IConst.slice(0);}
    this.m33Add = function (a,b) {
	a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];a[3]+=b[3];
	a[4]+=b[4];a[5]+=b[5];a[6]+=b[6];a[7]+=b[7];a[8]+=b[8];return a;
    }
    this.m33Mul = function (a,b) {
	var x=a[0]*b[0]+a[1]*b[3]+a[2]*b[6];
	var y=a[0]*b[1]+a[1]*b[4]+a[2]*b[7];
	var z=a[0]*b[2]+a[1]*b[5]+a[2]*b[8];
	a[0]=x; a[1]=y; a[2]=z;
	x= a[3]*b[0]+a[4]*b[3]+a[5]*b[6];
	y= a[3]*b[1]+a[4]*b[4]+a[5]*b[7];
	z= a[3]*b[2]+a[4]*b[5]+a[5]*b[8];
	a[3]=x; a[4]=y; a[5]=z;
	x= a[6]*b[0]+a[7]*b[3]+a[8]*b[6];
	y= a[6]*b[1]+a[7]*b[4]+a[8]*b[7];
	z= a[6]*b[2]+a[7]*b[5]+a[8]*b[8];
	a[6]=x; a[7]=y; a[8]=z; return a;
    }
    this.m33T = function(a) {
	var x=a[3];a[3]=a[1];a[1]=x;
	x=a[2];a[2]=a[6];a[6]=x;
	x=a[5];a[5]=a[7];a[7]=x;return a;
    }
    this.m33Inverse = function(a) {
	var d=a[0]*(a[4]*a[8]-a[5]*a[7])-a[1]*(a[3]*a[8]-a[5]*a[6])+a[2]*(a[3]*a[7]-a[4]*a[6]);
	var di=1/d;
	return [(a[4]*a[8]-a[5]*a[7])*di, (a[2]*a[7]-a[1]*a[8])*di, (a[1]*a[5]-a[2]*a[4])*di,
		(a[5]*a[6]-a[3]*a[8])*di, (a[0]*a[8]-a[2]*a[6])*di, (a[2]*a[3]-a[0]*a[5])*di,
		(a[3]*a[7]-a[4]*a[6])*di, (a[1]*a[6]-a[0]*a[7])*di, (a[0]*a[4]-a[1]*a[3])*di];
    }
    this.m33Rotation = function(alpha,ax,ay,az){
	var s = Math.sin(alpha), c=Math.cos(alpha), mc=1-c;
	return [c+ax*ax*mc,        ax*ay*mc-az*s,    ax*az*mc+ay*s,
                ax*ay*mc+az*s,     c+ay*ay*mc,       ay*az*mc-ax*s,
                az*ax*mc-ay*s,     az*ay*mc+ax*s,    c+az*az*mc]
    }

    if (taccgl_debug) {
	this.m33ToString=function (a){
	    return '['+a[0]+','+a[1]+','+a[2]+',\n'+a[3]+','+a[4]+','+a[5]+',\n'+a[6]+','+a[7]+','+a[8]+']'
	}
	this.m33Test=function(){
	    taccgl.clog (this.m33ToString(this.m33I()));
	    taccgl.clog (this.m33ToString(this.m33Add(this.m33I(),this.m33I())));
	    taccgl.clog (this.m33ToString(this.m33Mul(this.m33I(),this.m33Add(this.m33I(),this.m33I()))));
	    taccgl.clog (this.m33ToString(this.m33Mul([1,2,3,4,5,6,7,8,9],[1,0,0,1,0,0,1,0,0])));
	    taccgl.clog (this.m33ToString(this.m33Inverse(this.m33I())));
	    var i = this.m33Inverse([1,2,3,4,5,6,7,9,8]);
	    taccgl.clog (this.m33ToString(i));
	    taccgl.clog (this.m33ToString(this.m33Mul([1,2,3,4,5,6,7,9,8],i)));
	}
	// this.m33Test();
	
    } // taccgl_debug_end

    this.m44IConst = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    this.m44I = function () { return this.m44IConst.slice(0);}
    this.m44Add = function (a,b) {
	a[0]+=b[0];a[1]+=b[1];a[2]+=b[2];a[3]+=b[3];
	a[4]+=b[4];a[5]+=b[5];a[6]+=b[6];a[7]+=b[7];a[8]+=b[8];
	a[9]+=b[9];a[10]+=b[10];a[11]+=b[11];a[12]+=b[12];a[13]+=b[13];
	a[14]+=b[14];a[15]+=b[15];
	return a;
    }
    this.m44Mul = function (a,b) {
	var x=a[0]*b[0]+a[1]*b[4]+a[2]*b[8]+a[3]*b[12];
	var y=a[0]*b[1]+a[1]*b[5]+a[2]*b[9]+a[3]*b[13];
	var z=a[0]*b[2]+a[1]*b[6]+a[2]*b[10]+a[3]*b[14];
	var w=a[0]*b[3]+a[1]*b[7]+a[2]*b[11]+a[3]*b[15];
	a[0]=x; a[1]=y; a[2]=z; a[3]=w;
	x=a[4]*b[0]+a[5]*b[4]+a[6]*b[8]+a[7]*b[12];
	y=a[4]*b[1]+a[5]*b[5]+a[6]*b[9]+a[7]*b[13];
	z=a[4]*b[2]+a[5]*b[6]+a[6]*b[10]+a[7]*b[14];
	w=a[4]*b[3]+a[5]*b[7]+a[6]*b[11]+a[7]*b[15];
	a[4]=x; a[5]=y; a[6]=z; a[7]=w;
	x=a[8]*b[0]+a[9]*b[4]+a[10]*b[8]+a[11]*b[12];
	y=a[8]*b[1]+a[9]*b[5]+a[10]*b[9]+a[11]*b[13];
	z=a[8]*b[2]+a[9]*b[6]+a[10]*b[10]+a[11]*b[14];
	w=a[8]*b[3]+a[9]*b[7]+a[10]*b[11]+a[11]*b[15];
	a[8]=x; a[9]=y; a[10]=z; a[11]=w;
	x=a[12]*b[0]+a[13]*b[4]+a[14]*b[8]+a[15]*b[12];
	y=a[12]*b[1]+a[13]*b[5]+a[14]*b[9]+a[15]*b[13];
	z=a[12]*b[2]+a[13]*b[6]+a[14]*b[10]+a[15]*b[14];
	w=a[12]*b[3]+a[13]*b[7]+a[14]*b[11]+a[15]*b[15];
	a[12]=x; a[13]=y; a[14]=z; a[15]=w; return a;
    }
    this.m44MulV = function (a,v){
	return  [ a[0]*v[0]+a[1]*v[1]+a[2]*v[2]+a[3]*v[3], 
		  a[4]*v[0]+a[5]*v[1]+a[6]*v[2]+a[7]*v[3],
		  a[8]*v[0]+a[9]*v[1]+a[10]*v[2]+a[11]*v[3],
		  a[12]*v[0]+a[13]*v[1]+a[14]*v[2]+a[15]*v[3] ]
    }
    this.m33FromM44=function (a) {
	return [a[0],a[1],a[2],a[4],a[5],a[6],a[8],a[9],a[10]];
    }
    this.m44FromM33 = function (a,x,y,z) {
	return [a[0],a[1],a[2],x, 
                a[3],a[4],a[5],y, 
		a[6],a[7],a[8],z,
	        0,0,0,1]
    }
    this.m44Translation = function (x,y,z) {
	return [1,0,0,x,
	        0,1,0,y,
	        0,0,1,z,
	        0,0,0,1]
    }
    this.m44T = function(a) {
	var x=a[1];a[1]=a[4];a[4]=x;
	x=a[2];a[2]=a[8];a[8]=x;
	x=a[3];a[3]=a[12];a[12]=x;
	x=a[6];a[6]=a[9];a[9]=x;
	x=a[7];a[7]=a[13];a[13]=x;
	x=a[11];a[11]=a[14];a[14]=x;
	return a;
    }

    if (taccgl_debug) {
	this.m44ToString=function (a){
	    return '['+a[0]+','+a[1]+','+a[2]+','+a[3]+',\n'+a[4]+','+a[5]+','+a[6]+','+a[7]+',\n'
		+a[8]+','+a[9]+','+a[10]+','+a[11]+',\n'+a[12]+','+a[13]+','+a[14]+','+a[15]+']';
	}
	this.m44Test=function(){
	    taccgl.clog (this.m44ToString(this.m44I()));
	    taccgl.clog (this.m44ToString(this.m44Add(this.m44I(),this.m44I())));
	    taccgl.clog (this.m44ToString(this.m44Mul(this.m44I(),this.m44Add(this.m44I(),this.m44I()))));
	    taccgl.clog (this.m44ToString(this.m44Mul([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0])));
//	    taccgl.clog (this.m44ToString(this.m44inv(this.m44I())));
//	    var i = this.m44inv([1,2,3,4,5,6,7,9,8]);
//	    taccgl.clog (this.m44ToString(i));
//	    taccgl.clog (this.m44ToString(this.m44Mul([1,2,3,4,5,6,7,9,8],i)));
	}
	// this.m44Test();
	
    } // taccgl_debug_end

    this.setTMorth = function (tm){
	this.TM=tm;
	this.TM_1T= this.m33FromM44(this.TM);
    }
    this.setTM = function (tm){
	this.TM=tm;
	this.TM_1T= this.m33Inverse(this.m33T(this.m33FromM44(this.TM)));

//	var p = this.TM.slice(0);
//	p = this.m44Mul (p, this.m44FromM33(this.m33T(this.TM_1T.slice(0)),0,0,0));
//	console.log(p);
    }

    this. projectionMatrix = function () {
	return [1,0,-this.eyeX/this.eyeZ,0,
		0,1,-this.eyeY/this.eyeZ,0,
		0,0,1,0,
		0,0,-1/this.eyeZ,1]
    }
    this.projectX = function (x,y,z) {
	var w=z*(-1/this.eyeZ)+1;
	return (x+z*(-this.eyeX/this.eyeZ))/w;
    }
    this.projectY = function (x,y,z) {
	var w=z*(-1/this.eyeZ)+1;
	return (y+z*(-this.eyeY/this.eyeZ))/w;
    }
}

var taccgl = new taccgl_create();

function taccglAnimPlug () {
    this.isPlug = true;
    this.doPreDraw = function () {taccgl.doatI++; return true;}
}

function taccglAnimPrototype (el)
{
    this.init = function (el) {
	if (typeof (el)=="string") { 
	    var xel=document.getElementById(el); 
	    if (!xel) { alert ("No Element with id "+el); return}
	    el=xel;
	}
	var par=el;
	this.el=el;
	this.x0= el.offsetLeft; this.y0= el.offsetTop;
	while (par.offsetParent) { par=par.offsetParent; this.x0+=par.offsetLeft; this.y0+=par.offsetTop;}
	this.x1=this.x0; this.y1=this.y0
	this.z0=this.z1=0.0;
	this.w=this.wx0=this.wx1= el.offsetWidth; this.wy0=this.wz1=this.wz0=this.hx1=0;
	this.h=this.hy0=this.hy1= el.offsetHeight; this.hx0=this.hz1=this.wy1=this.hz0=0;
	this.dx0=this.dx1=this.dy0=this.dy1=this.dz0=this.dz1=0;
	this.x=this.s0=this.x0;
	this.y=this.t0=this.y0;
	this.ws0=this.wx0;
	this.ht0=this.hy0
	this.rotation = false;
	this.flags = 0;
	this.basetime = taccgl.currenttime;
	this.vduration = taccgl.timeScale;
	this.isforeground = false;
	this.elshowatend = false;
	this.elhideatbegin = false;
	this.p=taccgl.stdsc;
	this.lightSpecular=taccgl.lightSpecular;
	this.lightShininess=taccgl.lightShininess;
    }

    this.pclone = function () {
	if ( typeof (this.attime) == "number") {
	   return this.clone();
       } else {
	   this.astepdelno=null; return this;
       }
    }
    this.pnclone = function () {
	var x
	if ( typeof (this.attime) == "number") {
	    x = this.clone();
	} else {
	    x = this;
	}
	if (this.vertEndIndex)
	    x. vertindex = this.vertEndIndex;
	return x;
    }

    this.specLight = function (s, shini) {
	this.lightSpecular=s%1;
	this.lightShininess=Math.floor(shini); return this;
    }
    this.shadowOnly = function (b) {
	if (b==false) this.flags &= ~128; else 	this.flags |= 128; return this;
    }
    this.castShadow = function (b) {
	if (b) this.flags &= ~256; else this.flags|=256; return this;
    }

    this.useTM = function (b){
	if (b==false) this.flags &= ~8; else this.flags |= 8; return this;
    }

    this.foreground = function (){
	if (taccgl.vBgControl) { this.isforeground=true; this.special=true; /* this.registerBeginEnd(); */ }
	return this;
    }

    this.ddstop = function () {
	var t=taccgl;
	taccgl.AA.splice(this.ddindex,1);
	for (var i=this.ddindex; i<t.AA.length; i++) {
	    t.AA[i].ddindex= i;
	}
	t.AAstartedLength--;
    }
    this.dddstop = function () {
	var j=taccgl;
	var maxindex= j.vertI; j.vertI=this.vertindex;
	var f=this.flags&=~2;
	while (j.vertI<this.vertEndIndex){
	    j.nvertTime (-2,1,f);
	    // Deactivate animation step using a negative starting time.
	    // Currently this works fine, but in future negative starting times
	    // might be used to encode something else and then this cannot be 
	    // used any more.
	    // formerly duration and starttime 0 was used that might cause
	    // a flashing effect on the first frame if a step is stopped
	    // before the complete animation was started.
	}
	j.vertI=maxindex;	
    }
    this.stop = function () {
        // taccgl.clog ("stop ",this.astepdelno==taccgl.delno);
	if (this.astepdelno==taccgl.delno){
 	    // this.doAtEndDone=false;
	    // this.dur(1); this.absStartTime(-2); this.flags&=~2; 
	    // this.start(); we cannot call start here, because 
	    if (taccgl.dddmode) this.dddstop(); else this.ddstop();
	}
	// this.elshowatend=null;
	taccgl.deleteFromDoat (this); this.attime=null;
    }

    this.cposClientRects = function () {
	var cr=this.el.getClientRects();
	var x = cr[0].left, y = cr[0].top, w = cr[0].width, h = cr[0].height;
        x+=document.body.scrollLeft || document.documentElement.scrollLeft; y+=document.body.scrollTop || document.documentElement.scrollTop;

	this.x=this.s0=this.x0=x;
	this.y=this.t0=this.y0=y;
	this.x1=this.x0; this.y1=this.y0

	this.w=this.ws0=this.wx0=this.wx1= w;
	this.h=this.ht0=this.hy0=this.hy1= h;
    }

    this.cposTransform = function () {
	var cs=getComputedStyle(this.el);
	var x = this.x, y = this.y, w = this.w, h = this.h;
	var t, to, m=null;

	if ( t = cs.transform) { m= taccgl.m32parse(t); to=cs.transformOrigin;} else
	    if ( t = cs.webkitTransform) { m= taccgl.m32parse(t); to=cs.webkitTransformOrigin;} else 
		if ( t = cs.mozTransform) { m= taccgl.m32parse(t);to=cs.mozTransformOrigin;} else
		    if ( t = cs.mstTransform) { m= taccgl.m32parse(t);to=cs.msTransformOrigin;}
        var toa=to.split(" ");
	var tox=parseFloat(toa[0]), toy=parseFloat(toa[1]);

	if (m) {
	    var v=[x-x-tox,y-y-toy]; x = taccgl.m32mulx(m,v)+x+tox; y = taccgl.m32muly(m,v)+toy+y;
	    
	    this.x=this.s0=this.x0=x;
	    this.y=this.t0=this.y0=y;
	    this.x1=this.x0; this.y1=this.y0

	    v=[w,0]; this.wx1=this.wx0 = this.ws0 = taccgl.m32mulx(m,v); this.wy1=this.wy0 = this.wt0 = taccgl.m32muly(m,v);
	    v=[0,h]; this.hx1=this.hx0 = this.hs0 = taccgl.m32mulx(m,v); this.hy1=this.hy0 = this.ht0 = taccgl.m32muly(m,v);

	    this.w=Math.sqrt (this.wx0*this.wx0+this.wy0*this.wy0);
	    this.h=Math.sqrt (this.hx0*this.hx0+this.hy0*this.hy0);
	}
    }

    this.flyHome = function (){
	var par=this.el;
	this.x1=this.el.offsetLeft; this.y1= this.el.offsetTop; this.z1=0;
	while (par.offsetParent) { par=par.offsetParent; this.x1+=par.offsetLeft; this.y1+=par.offsetTop;}
	return this;
    }
    this.rotateHome = function (){
	this.wx1= this.el.offsetWidth; this.wz1=this.hx1=0;
	this.hy1= this.el.offsetHeight; this.hz1=this.wy1=0;
	return this;
    }

   this.flyToElement = function (el) {
      if (typeof (el)=="string") el=document.getElementById(el);
      var par=el;
      this.x1= el.offsetLeft; this.y1= el.offsetTop; this.z1=0;
      while (par.offsetParent) { par=par.offsetParent; this.x1+=par.offsetLeft; this.y1+=par.offsetTop;}
      this.wx1= el.offsetWidth; this.wz1=this.hx1=0;
      this.hy1= el.offsetHeight; this.hz1=this.wy1=0;
      return this;
   }


   this.hvec = function (x,y,z){
       this.hx0=this.hx1=x; this.hy0=this.hy1=y; this.hz0=this.hz1=z; return this;
   }
   this.hvec1 = function (x,y,z){
       this.hx1=x; this.hy1=y; this.hz1=z; return this;
   }
   this.wvec = function (x,y,z){
       this.wx0=this.wx1=x; this.wy0=this.wy1=y; this.wz0=this.wz1=z; return this;
   }
   this.wvec1 = function (x,y,z){
       this.wx1=x; this.wy1=y; this.wz1=z; return this;
   }
   this.dvec = function (x,y,z){
       this.dx0=this.dx1=x; this.dy0=this.dy1=y; this.dz0=this.dz1=z;return this;
   }
   this.dvec1 = function (x,y,z){
       this.dx1=x; this.dy1=y; this.dz1=z;return this;
   }

   this.depth = function (d,d1) {
       /*	this.dx0=this.dx1=this.dy0=this.dy1=0; this.dz1=this.dz0=d;return this; */
       if (typeof(d)=="number") {
	   var ds0=  Math.sqrt(this.dx0*this.dx0+this.dy0*this.dy0+this.dz0*this.dz0);
	   if (typeof(d1)!="number") d1=d;
	   if (ds0<0.000001) {
	       this.dx0=0; this.dy0=0; this.dz0=d;}
	   else {
	       this.dx0*=d/ds0;this.dy0*=d/ds0;this.dz0*=d/ds0;
	   }
       }
       if (typeof(d1)=="number") {
	   var ds1=  Math.sqrt(this.dx1*this.dx1+this.dy1*this.dy1+this.dz1*this.dz1);
	   if (ds1<0.000001) {
	       this.dx1=0; this.dy1=0; this.dz1=d1;}
	   else {
	       this.dx1*=d1/ds1;this.dy1*=d1/ds1;this.dz1*=d1/ds1;
	   }
       }

       return this;

    }
    this.LQCanvas = function (x0,x1,y0,y1){return this.SetQCanvas (x0,x1,y0,y1,taccgl.LQCanvas);}
    this.NQCanvas = function (x0,x1,y0,y1){return this.SetQCanvas (x0,x1,y0,y1,taccgl.NQCanvas);}

    this.SetQCanvas = function (x0,x1,y0,y1,f){
        if (!x0) x0=0;
        if (!x1 && x1!=0) x1=x0;
	if (!y0 && y0!=0) y0=x0;
	if (!y1 && y1!=0) y1=y0;

	var x=this.x-x0, y=this.y-y0, xend=this.x+this.w+x1, yend=this.y+this.h+y1;
        
	if (x<0) x=0;
	if (y<0) y=0; 

	var w=xend-x, h=yend-y;
	f.call(taccgl,x,y,w,h);
	return this;
    }

   this.shader = function (p) { this.p = p; }
   this.sc = function (sc) { if (!taccgl.dddmode) return this;
			      if (!sc.p) sc.compile(); 
			         this.p = sc; 
			      if (!sc.p&&taccgl.webglerror) {this.p=taccgl.stdsc; taccgl.webglerror=false;taccgl.dddmode=true;}
			      this.special=true; return this;}

   this.doAtBegin = function () {
//       document.getElementById('status').innerHTML='BG';
       if (this.elhideatbegin) 
	   if (this.opaqueLevelBegin||this.opaqueLevelBegin==0) this.elhideatbegin.style.opacity=this.opaqueLevelBegin;
	       else  this.elhideatbegin.style.visibility="hidden";
       if (this.isforeground) taccgl.incForeground();
       if (this.todoAtBegin) {
	   var i,d;
	   for (i=0; i<this.todoAtBegin.length; i++) {
	       d = this.todoAtBegin[i];
	       /* if (typeof (d) == "") {*/ this.todo=d; this.todo(); /* } else d(this); */
	   }
       }
   }

   this.doAtEnd = function () {
//       document.getElementById('status').innerHTML='END';
       if (this.elshowatend) {
	   var pv = this.postVisibility;
	   var ov = this.postOpacity;
	   if (taccgl_debug) {
	       taccgl.clog ("doAtEnd Apply postVisibility "+this.el.id+' postVisibility="'+pv+'" postOpacity="'+ov+'"');
	   } // taccgl_debug_end
	   if (pv||pv=="") this.elshowatend.style.visibility=pv;
	   if (ov||ov==""||ov==0) this.elshowatend.style.opacity=ov;
	   var as;
           if (this.el.taccgl && (as=this.el.taccgl.asShadow) && pv!="hidden" && ov!==0) {
	       if (taccgl_debug) {
		taccgl.clog ("showAtEnd  asShadow "+this.el.id);
	       } // taccgl_debug_end
	       if (!as.hbStarted || !as.inTime()) {
		   as.showafter(); as.start();
		   if (taccgl.dddmode) taccgl.updateDraw(); else taccgl.updateDrawDD();
	       }
	   }
       }
       if (this.isforeground) taccgl.decForeground();
       if (this.todoAtEnd) {
	   var i,d;
	   for (i=0; i<this.todoAtEnd.length; i++) {
	       d = this.todoAtEnd[i];
	       if (typeof (d) == "function") { d.call(this); } else d(this);
	   }
       }
   }

   this.registerBegin = this.onBegin = function (d) {
       if (!this.todoAtBegin) this.todoAtBegin=Array(0);
       this.todoAtBegin.push(d); this.special=true;
       // this.registerBeginEnd(); 
       return this;
   }
   this.registerEnd = this.onEnd = function (d) {
       if (!this.todoAtEnd) this.todoAtEnd=Array(0);
       this.todoAtEnd.push(d);this.special=true;
       // this.registerBeginEnd(); 
       return this;
   }

   this.doPreDraw = function (i) {
       if (taccgl_debug) {
	   if  (this.draw_running) s='End   '; else s='Begin ';
	   if  (this.el && this.el.id) s+= "id="+this.el.id;
	   taccgl.tlog ("on"+s+' '+i+ (this.doAtEndDone ? " doAtEndDone="+this.doAtEndDone : ""));
       } // taccgl_debug_end
       if (this.draw_running) {
	   if (taccgl_debug) {
	       if (this.doAtEndDone)  
		   taccgl.tlog(" !!!!!!!!!!!!!!!!!!! doAtEnd called twice");
	   } // taccgl_debug_end
	   this.doAtEndDone=true;
	   this.doAtEnd(); 
	   taccgl.doatI++;
       } else {
	   this.doAtBegin(); this.draw_running=true;
	   taccgl.adjustDoat(i,this.basetime+this.vduration);
       }
   }

   this.registerBeginEnd = function (){
       if (!this.attime && this.attime!=0) {
	   // set the duration of the complete animation
           var e = this.vduration + this.basetime;
	   if (taccgl.duration < e) taccgl.setDuration(e);
	   // and possibly fix the time of the plug in doat
	   var a=taccgl.doat[taccgl.doat.length-1];
	   if (a && a.isPlug && a.attime<e) {a.attime=e;}
	   // now insert the animation step into doat
	   this.attime= this.basetime; taccgl.newDoat (this);
       }
   }

   this.acceleration = function (x,y,z) {
       var dd=this.vduration*this.vduration;
       this.ax=x*dd; this.ay=y*dd; this.az=z*dd;  this.doacceleration=true; this.flags|=4; return this;
   }

   this.scalarAcceleration = function (r) {
       this.ax = (this.x1-this.x0)*r; 
       this.ay = (this.y1-this.y0)*r; 
       this.az = (this.z1-this.z0)*r; this.doacceleration=true; this.flags|=4;return this;
   }

   this.vBegin = function (x,y,z) {
       this.ax = (this.x1-this.x0)*2 - 2*this.vduration*x; 
       this.ay = (this.y1-this.y0)*2 - 2*this.vduration*y; 
       this.az = (this.z1-this.z0)*2 - 2*this.vduration*z; this.doacceleration=true; this.flags|=4;
       return this;
   }
   this.vEnd = function (x,y,z) {
       this.ax = -(this.x1-this.x0)*2 + 2*this.vduration*x; 
       this.ay = -(this.y1-this.y0)*2 + 2*this.vduration*y; 
       this.az = -(this.z1-this.z0)*2 + 2*this.vduration*z; this.doacceleration=true; this.flags|=4;
       return this;
   }



   this.rotate = function (px,py,pz, ax,ay,az){
      this.rotation = true;
      this.rotpx=px;
      this.rotpy=py;
      this.rotpz=pz;
      this.rotax=ax;
      this.rotay=ay;
      this.rotaz=az;
      this.rotfrom=0;
      this.rotto=2*Math.PI;
      return this;
   }
   this.rotateMiddle = function (ax,ay,az){
      this.rotate (this.x1+this.wx1/2.0, this.y1+this.hy1/2.0, this.z1+this.dz1/2, ax,ay,az);return this;
   }

   this.rotatePart = function (from, to){
       this.rotfrom=from; this.rotto=to; return this;
   }

   this.restrict = function (x,y,w,h) {

       this.s0 += (x-this.x0)*(this.ws0/this.wx0);
       this.t0 += (y-this.y0)*(this.ht0/this.hy0);
       this.ht0 = h*(this.ht0/this.hy0);
       this.ws0 = w*(this.ws0/this.wx0);

  /*
       this.s0 += (x-this.x0)*(this.ws0/this.w);
       this.t0 += (y-this.y0)*(this.ht0/this.h);
       this.ht0 = h*(this.ht0/this.h);
       this.ws0 = w*(this.ws0/this.w);
  */

	this.x0=this.x1= x;	
	this.y0=this.y1= y;
	this.wx0=this.wx1=w;
	this.hy0=this.hy1= h;

/*
	this.s0=this.x0; 
	this.t0=this.y0;
        this.ws0=this.wx0;
	this.ht0=this.hy0;
*/
	return this;
    }


   this.clipA = function (w0,h0,w1,h1) {
       this.dotexmove=true;
       this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;
       if (w0) this.wx0=w0; else this.wx0=0;
       if (h0) this.hy0=h0; else this.hy0=0;
       if (w1||w1==0) this.wx1=w1; 
       if (h1||h1==0) this.hy1=h1;
       this.ws0=this.wx0;
       this.ht0=this.hy0;
       this.ws1=this.wx1;
       this.ht1=this.hy1;
       return this;
   }

   this.growA = function (w0,h0,w1,h1) {
       // this.dotexmove=true;
       // this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;
       if (w0 || w0==0) this.wx0=w0; else this.wx0=0;
       if (h0 || h0==0) this.hy0=h0; else this.hy0=0;
       if (w1 || w1==0) this.wx1=w1; 
       if (h1 || h1==0) this.hy1=h1;
       return this;
   }

   this.resize = function (w,h,w1,h1) {
       if (typeof(h)=="number") {
	   var hs0=  Math.sqrt(this.hx0*this.hx0+this.hy0*this.hy0+this.hz0*this.hz0);
	   if (hs0<0.000001) {
	       this.hy0=h; this.hx0=0; this.hz0=0;}
	   else {
	       this.hx0*=h/hs0;this.hy0*=h/hs0;this.hz0*=h/hs0;
	   }
	   if (typeof(h1)!="number") h1=h;
       }

       if (typeof(h1)=="number") {
	   var hs1=  Math.sqrt(this.hx1*this.hx1+this.hy1*this.hy1+this.hz1*this.hz1);
	   if (hs1<0.000001) {
	       this.hy1=h; this.hx1=0; this.hz1=0;}
	   else {
	       this.hx1*=h1/hs1;this.hy1*=h1/hs1;this.hz1*=h1/hs1;
	   }
       }

       if (typeof(w)=="number") {
	   var ws0=  Math.sqrt(this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
	   if (typeof(w1)!="number") w1=w;
	   if (ws0<0.000001) {
	       this.wx0=w; this.wy0=0; this.wz0=0;}
	   else {
	       this.wx0*=w/ws0;this.wy0*=w/ws0;this.wz0*=w/ws0;
	   }
       }
       if (typeof(w1)=="number") {
	   var ws1=  Math.sqrt(this.wx1*this.wx1+this.wy1*this.wy1+this.wz1*this.wz1);
	   if (ws1<0.000001) {
	       this.wx1=w; this.wy1=0; this.wz1=0;}
	   else {
	       this.wx1*=w1/ws1;this.wy1*=w1/ws1;this.wz1*=w1/ws1;
	   }
       }

       return this;
   }

   this.resizeZ = function (z0,z1) {
       if (!taccgl.dddmode) return this;
       if (!z0&&z0!=0) z0=this.z0;
       if (!z1&&z1!=0) z1=z0;
       if (z0=="out") { z1=z0=this.z1; } else if (z0=="both") {z0=this.z0; z1=this.z1;}
       var scale = (taccgl.eyeZ-z0)/taccgl.eyeZ;
//       this.resize (scale*this.w,scale*this.h);
       this.hx0*=scale;this.hy0*=scale;this.hz0*=scale;
       this.wx0*=scale;this.wy0*=scale;this.wz0*=scale;
       scale = (taccgl.eyeZ-z1)/taccgl.eyeZ;
       this.hx1*=scale;this.hy1*=scale;this.hz1*=scale;
       this.wx1*=scale;this.wy1*=scale;this.wz1*=scale;
       return this;
   }

    this.posZ = function (z0,z1) {
	if (!z1&&z1!=0) z1=z0;

	if (taccgl.dddmode) {
	    this.x0  =  ((taccgl.eyeZ-z0)/(taccgl.eyeZ-this.z0) * (taccgl.eyeZ*this.x0-this.z0* taccgl.eyeX) + z0*taccgl.eyeX)/taccgl.eyeZ;
	    this.y0  =  ((taccgl.eyeZ-z0)/(taccgl.eyeZ-this.z0) * (taccgl.eyeZ*this.y0-this.z0* taccgl.eyeY) + z0*taccgl.eyeY)/taccgl.eyeZ;
	    this.x1  =  ((taccgl.eyeZ-z1)/(taccgl.eyeZ-this.z1) * (taccgl.eyeZ*this.x1-this.z1* taccgl.eyeX) + z1*taccgl.eyeX)/taccgl.eyeZ;
	    this.y1  =  ((taccgl.eyeZ-z1)/(taccgl.eyeZ-this.z1) * (taccgl.eyeZ*this.y1-this.z1* taccgl.eyeY) + z1*taccgl.eyeY)/taccgl.eyeZ;
	} else {
	    this.x0  -= taccgl.ddfx*(z0-this.z0);
	    this.y0  -= taccgl.ddfy*(z0-this.z0);
	    this.x1  -= taccgl.ddfx*(z1-this.z1);
	    this.y1  -= taccgl.ddfy*(z1-this.z1);
	}
	this.z0  =  z0;
	this.z1  =  z1;
	return this;
    }

   this.texmove = function (s,t,p,q) {
       this.dotexmove=true;
       this.s1=p; this.ws1=this.ws0; this.t1=q; this.ht1=this.ht0;
       this.s0=s; this.t0=t;return this;
   }

   this.flyIn = function (x0,y0,z0){
      this.x0=x0; this.y0=y0; this.z0=z0;return this;
   }

   this.flyOut = function (x,y,z){
      this.x1=x; this.y1=y; this.z1=z;return this;
   }

   this.position = function (x,y,z){
      this.x1=x; this.y1=y; this.z1=z;this.x0=x; this.y0=y; this.z0=z;return this;
   }
    
    this.reverseLMotion = function(){
	var x=this.x0, y=this.y0, z=this.z0;
	this.x0=this.x1; this.y0=this.y1; this.z0=this.z1;
	this.x1=x; this.y1=y; this.z1=z;
	return this;
    }
    

    this.textureDraw = function () {
	taccgl.paintElement(this.el,true); return this;
    }

    this.texClear = function (canvas) {
	if (!canvas) canvas=1;
	taccgl.texTo (canvas);
	if (!taccgl.texc) return this;
        taccgl.markCanvasChanged();
	if (this.s0!=this.x || this.t0!=this.y || this.ws0!=this.w || this.ht0!=this.h) {
	    var sx=this.ws0/this.w; var sy=this.ht0/this.h;
	    taccgl.texTransform (sx,0,0,sy,(this.s0-this.x*sx),(this.t0-this.y*sy));
	    taccgl.texc.clearRect(this.x,this.y,this.w,this.h);
	    taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    taccgl.texc.clearRect(this.x,this.y,this.w,this.h);
	}
	return this;
    }

    this.paint = function (canvas,ignorehide){
	if (ignorehide!=false) ignorehide=true;
	if (!canvas) canvas=1;
	if (!(taccgl.ddmode || taccgl.dddmode)) return this;
	taccgl.texTo (canvas);
	if (this.s0!=this.x || this.t0!=this.y || this.ws0!=this.w || this.ht0!=this.h) {
	    var sx=this.ws0/this.w; var sy=this.ht0/this.h;
	    taccgl.texTransform (sx,0,0,sy,(this.s0-this.x*sx),(this.t0-this.y*sy));
	    taccgl.paintElement(this.el,ignorehide);
	    taccgl.texTransform (1,0,0,1,0,0);
	} else {
	    taccgl.paintElement(this.el,ignorehide);
	}
	return this;
    }

   this.hide = function () {
       taccgl.taccglAttach(this.el);
       if (!this.el.taccgl.preVisibility&&this.el.taccgl.preVisibility!="") {this.el.taccgl.preVisibility=this.el.style.visibility;}
//       this.el.style.opacity=0;return this;
       this.el.style.visibility="hidden";
       var as;
       if (as=this.el.taccgl.asShadow) {
	   if (taccgl_debug) {
		taccgl.clog ("Use asShadow "+this.el.id);
	   } // taccgl_debug_end
	   as.showafter(false);  as.starttime(-1); as.dur(0.001); as.start();
       }
       return this;
   }
    this.opacity = function (o){
	if (!o) o=0;
	taccgl.taccglAttach(this.el);
        if (!this.el.taccgl.preOpacity&&this.el.taccgl.preOpacity!=0) {this.el.taccgl.preOpacity=this.el.style.opacity;}
        this.el.style.opacity=o;
	var as;
	if (o==0 && (as=this.el.taccgl.asShadow)) {
	    as.showafter(false); as.starttime(-1);  as.dur(0.001); as.start();
	}
	return this;
    }
   this.visatend = this.visAtEnd = function (v) {
       taccgl.taccglAttach(this.el);
       if (v!=null) {this.postVisibility=v; } else {
	   if (this.el.taccgl.preVisibility!=null) {
	      this.postVisibility=this.el.taccgl.preVisibility;
           } else {
	      this.postVisibility=this.el.style.visibility
	   }
       }
       this.elshowatend=this.el; this.special=true;// this.registerBeginEnd();
       return this;
   }
   this.opacityatend = this.opacityAtEnd = function (v) {
       taccgl.taccglAttach(this.el);
       if (v!=null) {this.postOpacity=v; } else {
	   if (this.el.taccgl.preOpacity!=null) {
	      this.postOpacity=this.el.taccgl.preOpacity;
           } else {
	      this.postOpacity=this.el.style.opacity
	   }
       }
       this.elshowatend=this.el; this.special=true;// this.registerBeginEnd();
       return this;
   }
   this.hideAtBegin = function () {
       this.elhideatbegin=this.el; this.special=true;// this.registerBeginEnd();
/*     moved into startSpecial because a correct basetime is needed
       if (this.el.taccgl && (as=this.el.taccgl.asShadow)) {
	   if (taccgl_debug) {
		taccgl.clog ("hideAtBegin  asShadow "+this.el.id);
	   } // taccgl_debug_end
	   as.showafter(false);  as.dur(this.basetime-as.basetime); as.start();
       }
*/
       return this;
   }
   this.opacityAtBegin = function (o) {
       if (!o) o=0;
       this.elhideatbegin=this.el; this.opaqueLevelBegin=o;this.special=true; // this.registerBeginEnd();
       var as;
       if (as=this.el.taccgl.asShadow) {
	   if (taccgl_debug) {
		taccgl.clog ("opacityAtBegin  asShadow "+this.el.id);
	   } // taccgl_debug_end
	   as.showafter(false);  as.dur(this.basetime-as.basetime); as.start();
       }
       return this;
   }
   this.visFinal = function (v) {
       taccgl.taccglAttach(this.el);
       if (v) {this.el.taccgl.postVisibility=v; } else {
	   if (this.el.taccgl.preVisibility!=null) {
	      this.el.taccgl.postVisibility=this.el.taccgl.preVisibility;
           } else {
	      this.el.taccgl.postVisibility=this.el.style.visibility
	   }
       }
       taccgl.showAfterAnimation.push(this);
       return this;
    }
    this.opacityFinal = function (v) {
       taccgl.taccglAttach(this.el);
       if (v) {this.el.taccgl.postOpacity=v; } else {
	   if (this.el.taccgl.preOpacity!=null) {
	      this.el.taccgl.postOpacity=this.el.taccgl.preOpacity;
           } else {
	      this.el.taccgl.postOpacity=this.el.style.opacity
	   }
       }
       taccgl.showAfterAnimation.push(this);
       return this;
    }
 
   this.starttime = this.startTime = function (basetime) {
       if (!basetime) basetime=0;
       this.basetime=basetime+taccgl.currenttime;
       //  var e = basetime + this.vduration;
       //       if (taccgl.duration < e) taccgl.setDuration(e);
       // if (this.attime || this.attime==0) {taccgl.deleteFromDoat (this); this.attime=null;}
       return this;
   }
   this.absStartTime = function (basetime) {
       this.basetime=basetime;
       //  var e = basetime + this.vduration;
       // if (taccgl.duration < e) taccgl.setDuration(e);
//       if (this.attime || this.attime==0) {taccgl.deleteFromDoat (this); this.attime=null;}
       return this;
   }

   this.duration = this.dur = function (d) {
       this.vduration=d*taccgl.timeScale;
       // var e = this.vduration + this.basetime;
       // if (taccgl.duration < e) taccgl.setDuration(e);
//       if (this.attime || this.attime==0) {taccgl.deleteFromDoat (this); this.attime=null;}
       return this;
   }

    this.until = function (t) {
	this.dur (t+taccgl.currenttime-this.basetime); return this;
    }
    this.untilEo = function (e) {   // until end of
	this.until (e.basetime+e.vduration);return this;
    }
    this.untilBo = function (e) {   // until begin of
	this.until (e.basetime);return this;
    }
    this.untilaLEo = function (e) {  // until at least end of
	if (e.basetime+e.vduration > this.basetime+this.vduration)
	    this.until (e.basetime+e.vduration);
	return this;
    }
    this.untilaLBo = function (e) {  // until at least begin of
	if (e.basetime > this.basetime+this.vduration)
	    this.until (e.basetime);
	return this;
    }
    this.untilaMEo = function (e) {  // until at most end of
	if (e.basetime+e.vduration < this.basetime+this.vduration)
	    this.until (e.basetime+e.vduration);
	return this;
    }
    this.untilaMBo = function (e) {  // until at most begin of
	if (e.basetime < this.basetime+this.vduration)
	    this.until (e.basetime);
	return this;
    }

   this.showbefore = this.showBefore = function (b){  if (b==false) this.flags&=~1; else this.flags|=1;return this;}
   this.showafter  = this.showAfter  = function (b){ if (b==false) this.flags&=~2; else this.flags|=2;return this;}


   this.blend      = function (f,s,f1,s1) {
       if (!this.docolor) {       this.col0s= this.col0t=this.col1s=this.col1t=-128*256; }
       this.docolor=true; this.flags|=16;
       this.mix0=f; this.mix1=f;
       if (!s) s=0;
       this.mixs0=s; this.mixs1=s;
       if (typeof (f1)=="number" )  this.mix1=f1;
       if (typeof (s1)=="number" )  this.mixs1=s1;
       return this;
   }
   this.blendA     = function (f0,f1,s0,s1) {
       if (!this.docolor) {       this.col0s= this.col0t=this.col1s=this.col1t=-128*256; }
       this.docolor=true; this.flags|=16;
       this.mix0=f0; this.mix1=f1;
       if (!s0) s0=0; if (!s1) s1=0;
       this.mixs0=s0; this.mixs1=s1;
       return this;
   }
   this.color      = function (c,c1) {
       var idata,r,g,b,a;
       if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
       this.docolor=true; this.flags|=16;this.flags &= ~32;this.flags &= ~64;
       this.ddcolor0=this.ddcolor1=c;
       if (c1) this.ddcolor1=c1;
       if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.col0s= this.col1s = r+256*(g-128); this.col0t=this.col1t=a+256*(b-128);
       }
       if (c1 && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c1;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1), r = idata.data[0], g = idata.data[1],
	   b = idata.data[2], a = idata.data[3];
	   this.col1s = r+256*(g-128); this.col1t=a+256*(b-128);
       }
       return this;
   }
   this.colorA      = function (c,c1) {
       var idata,r,g,b,a;
       if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
       this.docolor=true; this.flags|=16;this.flags &= ~32;this.flags &= ~64;
       this.ddcolor0=c; this.ddcolor1=c1;
       if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.col0s = r+256*(g-128); this.col0t=a+256*(b-128);
       }
       if (c1 && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c1;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.col1s = r+256*(g-128); this.col1t=a+256*(b-128);
       }
       return this;
   }

    this.lightAmbDiff = function (ambCol, diffCol, a0, a1) {
	this.color(ambCol, diffCol);
        this.ddcolor0=diffCol; this.ddcolor1=diffCol;
	if (!a0 && a0!=0.0) a0=0.0;
	if (!a1 && a1!=0.0) a1=0.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
	this.col0t = Math.floor (this.col0t / 256) * 256 + a0*255;
	this.col1t = Math.floor (this.col1t / 256) * 256 + a1*255;
	this.flags |=32; this.flags &= ~64; return this;
    }
    this.lightBgAmbDiff = function (c,amb,diff, a0, a1) {
        if (!this.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
        this.docolor=true; this.flags|=16+32+64;
        this.ddcolor0=c; this.ddcolor1=c;
	if (!a0 && a0!=0.0) a0=1.0;
	if (!a1 && a1!=0.0) a1=1.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
        if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   var idata = taccgl.scratchc.getImageData(0,0,1,1),
	       r = idata.data[0],
	       g = idata.data[1],
	       b = idata.data[2]; 
	       // a = idata.data[3]; 
	    this.col0s = r+256*(g-128); this.col0t=Math.floor(a0*255)+256*(b-128);
        }
	if (amb>1) amb=1;
	if (diff>1) diff=1;
	if (amb<0) amb=0;
	if (diff<0) diff=0; 
	amb=Math.floor(amb*255); diff=Math.floor(diff*255);
	this.col1s = amb+256*(diff-128); this.col1t=Math.floor(a1*255); return this;
   }
   this.material = function (m) {m.applyToAnim(this); return this;}
   
   this.map = function (s,t,w,h) {
       if (s||s==0) this.s0=s; if (t||t==0) this.t0=t; 
       if (w && h) { this.ws0=w; this.ht0=h;}
       else if (w) { this.ws0=w; this.ht0*=w/this.ws0;} 
       else if (h) { this.ws0*=h/this.ht0; this.ht0=h;}
       return this;
   }
    this.mapScale = function (s) {
	this.ws0*=s; this.ht0*=s; return this;
    }
   this.map1 = function (s,t,w,h) {
       this.dotexmove=true;
       if (s) this.s1=s; if (t) this.t1=t; if (w) this.ws1=w; if (h) this.ht1=h; return this;
   }
   this.mapA = function () {
       this.dotexmove=true;
       this.s1=this.s0; this.t1=this.t0; this.ws1=this.ws0; this.ht1=this.ht0; return this;
   }
   this.mapElement = function (el) {
 	if (typeof (el)=="string") el=document.getElementById(el);
       var par=el,s,t;
	s= el.offsetLeft; t=el.offsetTop;
	while (par.offsetParent) { par=par.offsetParent; s+=par.offsetLeft; t+=par.offsetTop;}
	this.map (s,t,el.offsetWidth,el.offsetHeight);
	return this;
   }
    this.mapActor = function (el,t) {
        if (typeof (el)=="string") el=document.getElementById(el);
        if (!t) t=1;
        taccgl.texTo(t);
        taccgl.paintElement (el,true);
 	if (t==2) this.blend(0,1);
        return this.mapElement(el);
   }
   this.mapMirrorY = function () {
       var x = this.s0;
       this.s0 = x+this.ws0; this.ws0=-this.ws0;
       return this;
   }
   this.mapMirrorX = function () {
       var y = this.t0;
       this.t0 = y+this.ht0; this.ht0=-this.ht0;
       return this;
   }
   this.mapRelative = function (s,t,w,h) {
       if (!w && w!=0) w=this.ws0;
       if (!h && h!=0) h=this.ht0;
       this.s0+=s; this.t0+=t; this.ws0 = w; this.ht0 = h; return this;
   }

   this.mapClip = function (w,h,pos,overflow) {
       if (overflow != "b" && overflow != 'br'){
	   if (h>this.ht0) h=this.ht0;
       } 
       if (overflow != "r" && overflow != 'br'){
	   if (w>this.ws0) w=this.ws0;
       } 
       
       if (pos=="tl") {
       } else if (pos=="t") {
	   w=this.ws0;
       } else if (pos=="tr") {
	   this.s0 += this.ws0-w;
       } else if (pos=="l") {
	   h=this.ht0;
       } else if (pos=="r") {
	   this.s0 += this.ws0-w; h=this.ht0;
       } else if (pos=="bl") {
	   this.t0 += this.ht0-h;
       } else if (pos=="b") {
	   this.t0 += this.ht0-h;  w=this.ws0;
       } else if (pos=="br") {
	   this.t0 += this.ht0-h;  this.s0 += this.ws0-w;
       }
       this.ws0 = w; this.ht0 = h;
       return this;
   }

   this.mapClipToElement = function (pos,overflow) {
       var h = Math.sqrt (this.hx0*this.hx0+this.hy0*this.hy0+this.hz0*this.hz0),
           w = Math.sqrt (this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
       this.mapClip (w,h,pos,overflow); return this;
   }

    this.copyTiming = function (a){
	this.absStartTime (a.basetime);
	this.dur (a.vduration);
	return this;
    }

    this.copyMotion = function (a) {
	this.rotate (a.rotpx, a.rotpy, a.rotpz, a.rotax, a.rotay, a.rotaz);
	this.rotatePart (a.rotfrom, a.rotto); return this;
    }

   /* query methods */

    this.hbStarted = function () {
	if (!this.astepdelno) return false;
	return this.astepdelno==taccgl.delno;
    }
    this.inTime = function (t) {
	if (!t && t!=0) t=taccgl.currenttime;
	if (t<this.basetime && ((this.flags&1)==0)) return false;
	if (t>this.basetime+this.vduration && ((this.flags&2)==0)) return false
	return true;
    }

   this.calcBounds0 = function () {
       var x= taccgl.projectX (this.x0,this.y0,this.z0);
       var xmin=x; var xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0,this.y0+this.hy0,this.z0+this.hz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.wx0,this.y0+this.wy0,this.z0+this.wz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.dx0,this.y0+this.dy0,this.z0+this.dz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0+this.wx0,this.y0+this.hy0+this.wy0,this.z0+this.hz0+this.wz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0+this.dx0,this.y0+this.hy0+this.dy0,this.z0+this.hz0+this.dz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.dx0+this.wx0,this.y0+this.dy0+this.wy0,this.z0+this.dz0+this.wz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       var x= taccgl.projectX (this.x0+this.hx0+this.wx0+this.dx0,this.y0+this.hy0+this.wy0+this.dy0,this.z0+this.hz0+this.wz0+this.dz0);
       if (x<xmin) xmin=x;
       if (x>xmax) xmax=x;
       this.pxmin = xmin; this.pxmax=xmax;

       var y= taccgl.projectY (this.x0,this.y0,this.z0);
       var ymin=y; var ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0,this.y0+this.hy0,this.z0+this.hz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.wx0,this.y0+this.wy0,this.z0+this.wz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.dx0,this.y0+this.dy0,this.z0+this.dz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0+this.wx0,this.y0+this.hy0+this.wy0,this.z0+this.hz0+this.wz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0+this.dx0,this.y0+this.hy0+this.dy0,this.z0+this.hz0+this.dz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.dx0+this.wx0,this.y0+this.dy0+this.wy0,this.z0+this.dz0+this.wz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       var y= taccgl.projectY (this.x0+this.hx0+this.wx0+this.dx0,this.y0+this.hy0+this.wy0+this.dy0,this.z0+this.hz0+this.wz0+this.dz0);
       if (y<ymin) ymin=y;
       if (y>ymax) ymax=y;
       this.pymin = ymin; this.pymax=ymax;
       return this;
   }
	

   /* start methods */

   this.ddstart = function () {
       var j = taccgl,
           e = this.vduration + this.basetime;
       if (this.special) this.startSpecialDD();
       if (!taccgl.ddmode) return;
       if (this.flags&128) return; // ignore shadowOnly steps
       if (j.duration < e) j.setDuration(e);
       if (!this.doacceleration) {this.ax=this.ay=this.az=0;}
       if (!this.dotexmove) {
	   this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;
       }
       if (this.face){
	   var i;
 	   for (i=0; i<this.face.length; i++){
	       var f=this.face[i];
	       if (!f.dotexmove)
		   f.s1=f.s0; f.ws1=f.ws0; f.t1=f.t0; f.ht1=f.ht0;
	   }
       }
       if (this.astepdelno!=j.delno) { j.AA.push(this); this.ddindex=j.AA.length-1;}
       this.astepdelno=j.delno;
       return this; 
   }

    this.startSpecialDD = function (){
	if (this.isforeground || this.todoAtBegin || this.todoAtEnd || this.elshowatend || this.elhideatbegin)
	    this.registerBeginEnd();
    }
    this.startSpecial = function (){
	if (this.p!=taccgl.stdsc) taccgl.setShader(this.p);
	if (this.isforeground || this.todoAtBegin || this.todoAtEnd || this.elshowatend || this.elhideatbegin)
	    this.registerBeginEnd();
	var as;
	if (this.elhideatbegin&& (as=this.el.taccgl.asShadow)){
	   if (taccgl_debug) {
		taccgl.clog ("hideAtBegin  asShadow "+this.el.id);
	   } // taccgl_debug_end
           if (this.basetime-as.basetime>0){
   	      as.showafter(false);  as.dur(this.basetime-as.basetime); as.start();
	   }
	}
    }

   this.start = function () {
       var j = taccgl;
       if (!j.dddmode) {
	   this.ddstart();
	   return this; 
       }

       var maxindex=null;
       if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}

//     if (this.p!=j.stdsc) j.setShader(this.p);
       if (this.special) this.startSpecial();

       var nx = this.hy0*this.wz0 - this.hz0*this.wy0,
           ny = this.hz0*this.wx0 - this.hx0*this.wz0,
           nz = this.hx0*this.wy0 - this.hy0*this.wx0;
       var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer

       j.nvertMove (this.x0, this.y0, this.z0                              ,this.x1, this.y1, this.z1
		    ,nx,ny,nz,spec,  this.s0,this.t0,  this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.hx0, this.y0+this.hy0, this.z0+this.hz0   ,this.x1+this.hx1, this.y1+this.hy1, this.z1+this.hz1   
		    ,nx,ny,nz,spec, this.s0,this.t0+this.ht0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0, this.y0+this.wy0, this.z0+this.wz0   ,this.x1+this.wx1, this.y1+this.wy1, this.z1+this.wz1  
		    ,nx,ny,nz,spec,  this.s0+this.ws0 ,this.t0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0+this.hx0, this.y0+this.wy0+this.hy0, this.z0+this.wz0+this.hz0  
                    ,this.x1+this.wx1+this.hx1, this.y1+this.hy1+this.wy1, this.z1+this.wz1+this.hz1    
		    ,nx,ny,nz,spec, this.s0+this.ws0, this.t0+this.ht0, this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0, this.y0+this.wy0, this.z0+this.wz0   ,this.x1+this.wx1, this.y1+this.wy1, this.z1+this.wz1   
		    ,nx,ny,nz,spec, this.s0+this.ws0, this.t0 
		    ,this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.hx0, this.y0+this.hy0, this.z0+this.hz0   ,this.x1+this.hx1,  this.y1+this.hy1, this.z1+this.hz1  
		    ,nx,ny,nz,spec, this.s0, this.t0+this.ht0, this.flags,this.basetime,this.vduration);

       this.startRest();
       this.vertEndIndex=j.vertI;
       if (maxindex) j.vertI=maxindex;
       return this;
   }

   this.startRest = function () {
      var j = taccgl, i,
          e = this.vduration + this.basetime;
      if (j.duration < e) j.setDuration(e);
      if (this.rotation) {
         for (i=1; i<=6; i++) {
	     j.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (this.doacceleration){
         for (i=1; i<=6; i++) {
	     j.nvertAcceleration(this.ax,this.ay,this.az); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (this.dotexmove) {
           j.nvertOffset (-5); 
	   j.nvertTexMove (this.s1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1,this.t1+this.ht1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1+this.ht1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1,this.t1+this.ht1); 
       }
       if (this.docolor) {
	   j.nvertColor6 (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); 
/*
           j.nvertOffset (-5); 
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); 
*/
       }
       if (this.p!=j.stdsc) j.setShader(j.stdsc);
   }

   this.startRestTriangle = function () {
      var j = taccgl, i,
          e = this.vduration + this.basetime;
      if (j.duration < e) j.setDuration(e);
      if (this.rotation) {
         for (i=1; i<=3; i++) {
	     j.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto); j.nvertOffset(-1);
	 }
         j.nvertOffset (3); 
       }
       if (this.doacceleration){
         for (i=1; i<=3; i++) {
	     j.nvertAcceleration(this.ax,this.ay,this.az); j.nvertOffset(-1);
	 }
         j.nvertOffset (3); 
       }
       if (this.dotexmove) {
           j.nvertOffset (-2); 
	   j.nvertTexMove (this.s1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1+this.ws1,this.t1); j.nvertOffset(1);
	   j.nvertTexMove (this.s1,this.t1+this.ht1); 
       }
       if (this.docolor) {
	   j.nvertColor3 (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1);
/*
           j.nvertOffset (-2); 
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); j.nvertOffset(1);
	   j.nvertColor (this.col0s,this.col0t,this.col1s, this.col1t, this.mix0, this.mix1, this.mixs0, this.mixs1); 
*/
       }
       if (this.p!=j.stdsc) j.setShader(j.stdsc);
   }

    this.startFixNormal = function () {
	var j = taccgl;
	var spec=this.lightSpecular + this.lightShininess; // Setters must ensure that lightSpecular is fractional and Shininess integer

	j.nvertOffset (-3);
	var hx0 = j.vertOrigin [4*j.vertI+4] - j.vertOrigin [4*j.vertI],
	    hy0 = j.vertOrigin [4*j.vertI+5] - j.vertOrigin [4*j.vertI+1],
	    hz0 = j.vertOrigin [4*j.vertI+6] - j.vertOrigin [4*j.vertI+2],
	    wx0 = j.vertOrigin [4*j.vertI+8] - j.vertOrigin [4*j.vertI],
	    wy0 = j.vertOrigin [4*j.vertI+9] - j.vertOrigin [4*j.vertI+1],
	    wz0 = j.vertOrigin [4*j.vertI+10] - j.vertOrigin [4*j.vertI+2],
            nx = hy0*wz0 - hz0*wy0,
            ny = hz0*wx0 - hx0*wz0,
            nz = hx0*wy0 - hy0*wx0; j.nvertOffset(1);
        j.nvertNormal (nx,ny,nz,spec); j.nvertOffset(1);
        j.nvertNormal (nx,ny,nz,spec); j.nvertOffset(1);
        j.nvertNormal (nx,ny,nz,spec); 
    }

    /* continuation methods */

    this.a = function (el,k) {
	var an = taccgl.a(el,k);
 	an.absStartTime (this.basetime+this.vduration);
	return (an)
    }

    this.actor = function (el,k,v,n) {
	var an = taccgl.actor(el,k,v,n);
 	an.absStartTime (this.basetime+this.vduration);
	return (an)
    }

    this.vecsize = function (x,y,z) {
	return Math.sqrt(x*x+y*y+z*z);
    }

    this.contIntern = function (an,el) {
	an.absStartTime (this.basetime+this.vduration);
	if (!el) {
	    this.calcRotEndPoints();
//	    taccgl.clog ("RotEndPoints "+this.roex+","+this.roey+","+this.roez+",H"+this.rohx+","+this.rohy+","+this.rohz+",W"+this.rowx+","+this.rowy+","+this.rowz+",D"+this.rodx+","+this.rody+","+this.rodz);
//	    taccgl.clog ("|H|"+this.vecsize(this.rohx,this.rohy,this.rohz)+"|W|"+this.vecsize(this.rowx,this.rowy,this.rowz)+"|D|"+this.vecsize(this.rodx,this.rody,this.rodz));
	    an.flyIn  (this.roex,this.roey,this.roez);
	    an.hvec   (this.rohx,this.rohy,this.rohz);
	    an.wvec   (this.rowx,this.rowy,this.rowz);
	    an.dvec   (this.rodx,this.rody,this.rodz);
	    an.flyOut (this.roex,this.roey,this.roez);
	    //	    an.resize (this.wx1, this.hy1);
	    if (this.docolor) {
		an.blend  (this.mix1, this.mixs1);
		if (this.flags & 96) {
		    an.col0s=this.col0s; an.col1s=this.col1s;
		    an.col0t=this.col0t; an.col1t=this.col1t;
		} else {
		    an.col0s=this.col1s; an.col1s=this.col1s;
		    an.col0t=this.col1t; an.col1t=this.col1t;
		}
		an.flags |= this.flags & (16+32+64);
	    }
	    an.s0  = this.s0; 
	    an.t0  = this.t0; 
	    an.ws0 = this.ws0; 
	    an.ht0 = this.ht0; 
	    an.p   = this.p;
	}
	return (an)
    }
    this.contShiftAtEndAction = function(an){
	if (this.elshowatend) { an.elshowatend = this.elshowatend;  this.elshowatend=null; an.special=true; 
				if (this.postVisibility||this.postVisibility=="") an.postVisibility=this.postVisibility;
				if (this.postOpacity||this.postOpacity==0||this.postOpacity=="") an.postOpacity=this.postOpacity;
			      }
    }

    this.cont = function () {
        var e=this.el, an = new taccgl.taccglAnim (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	return (this.contIntern (an,null));
    }

    this.baseCont  = function () {
        var e=this.el, an = new taccgl.taccglAnim (e);
	return (this.contIntern (an,null));
    }

    this.calcRotation = function (o,x,y,z) {
	var c = Math.cos(-o), mc=(1-c),
	    s = Math.sin(-o);
        x-=this.rotpx; y-=this.rotpy; z-=this.rotpz;
        this.resx= (c+this.rotax*this.rotax*mc)*x                + (this.rotax*this.rotay*mc-this.rotaz*s)*y + (this.rotax*this.rotaz*mc+this.rotay*s)*z;
	this.resy= (this.rotax*this.rotay*mc+this.rotaz*s)*x +     (c+this.rotay*this.rotay*mc)*y+             (this.rotay*this.rotaz*mc-this.rotax*s) * z;
	this.resz= (this.rotaz*this.rotax*mc-this.rotay*s) * x+    (this.rotaz*this.rotay*mc+this.rotax*s)*y+  (c+this.rotaz*this.rotaz*mc) * z;
	this.resx += this.rotpx;
	this.resy += this.rotpy;
	this.resz += this.rotpz;
    }

    this.calcRotEndPoints = function () {
	if (this.rotation) {
           this.calcRotation(this.rotto,this.x1,this.y1,this.z1);
           this.roex=this.resx;
	   this.roey=this.resy;
	   this.roez=this.resz;
	   this.calcRotation(this.rotto,this.x1+this.hx1,this.y1+this.hy1,this.z1+this.hz1);
	   this.rohx=this.resx-this.roex;
	   this.rohy=this.resy-this.roey;
	   this.rohz=this.resz-this.roez;
	   this.calcRotation(this.rotto,this.x1+this.wx1,this.y1+this.wy1,this.z1+this.wz1);
	   this.rowx=this.resx-this.roex;
	   this.rowy=this.resy-this.roey;
	   this.rowz=this.resz-this.roez;
	   this.calcRotation(this.rotto,this.x1+this.dx1,this.y1+this.dy1,this.z1+this.dz1);
	   this.rodx=this.resx-this.roex;
	   this.rody=this.resy-this.roey;
	   this.rodz=this.resz-this.roez;
        } else {
           this.roex=this.x1;
	   this.roey=this.y1;
	   this.roez=this.z1;
 	   this.rohx=this.hx1;
	   this.rohy=this.hy1;
	   this.rohz=this.hz1;
 	   this.rowx=this.wx1;
	   this.rowy=this.wy1;
	   this.rowz=this.wz1;
 	   this.rodx=this.dx1;
	   this.rody=this.dy1;
	   this.rodz=this.dz1;
       }
    }

    this.vEnd_x = function () { return((this.ax*0.5 + this.x1-this.x0)/this.vduration);}
    this.vEnd_y = function () { return((this.ay*0.5 + this.y1-this.y0)/this.vduration);}
    this.vEnd_z = function () { return((this.az*0.5 + this.z1-this.z0)/this.vduration);}

    this.contAccel = function (x,y,z,d) {
	var an = new taccgl.taccglAnim (this.el);
	an.absStartTime (this.basetime+this.vduration);
	an.flyIn (this.x1,this.y1,this.z1).duration(d).flyOut(x,y,z);
	an.vBegin (this.vEnd_x(),this.vEnd_y(),this.vEnd_z());
	an.hvec(this.hx1,this.hy1,this.hz1);
	an.wvec(this.wx1,this.wy1,this.wz1);
	an.dvec(this.dx1,this.dy1,this.hd1);
	if (this.docolor) {
	    an.blend  (this.mix1, this.mixs1);
	    if (this.flags & 96) {
		an.col0s=this.col0s; an.col1s=this.col1s;
		an.col0t=this.col0t; an.col1t=this.col1t;
	    } else {
		an.col0s=this.col1s; an.col1s=this.col1s;
		an.col0t=this.col1t; an.col1t=this.col1t;
	    }
	    an.flags |= this.flags & (16+32+64);
	}

	if (this.elshowatend) { an.elshowatend = this.elshowatend;  this.elshowatend=null; an.special=true;
				if (this.postVisibility||this.postVisibility=="") an.postVisibility=this.postVisibility;
				if (this.postOpacity||this.postOpacity==0||this.postOpacity=="") an.postOpacity=this.postOpacity;
			      }
	return (an)
    }

    this.clone = function () {
	return new this.taccglAnimClone (this);
    }

    this.taccglAnimClone = function  (a)
    {
	this.el = a.el; this.x=a.x; this.y=a.y; this.w=a.w; this.h=a.h;
	
	this.x0 = a.x0; this.y0 = a.y0; this.z0=a.z0; this.s0 = a.s0; this.t0 = a.t0;
	this.wx0 = a.wx0; this.wy0 = a.wy0; this.wz0=a.wz0; 
	this.hx0 = a.hx0; this.hy0 = a.hy0; this.hz0=a.hz0; 
	this.dx0 = a.dx0; this.dy0 = a.dy0; this.dz0=a.dz0; 
	this.ws0 = a.ws0; this.ht0 = a.ht0;
	
	this.x1 = a.x1; this.y1 = a.y1; this.z1=a.z1; this.s1 = a.s1; this.t1 = a.t1;
	this.wx1 = a.wx1; this.wy1 = a.wy1; this.wz1=a.wz1; 
	this.hx1 = a.hx1; this.hy1 = a.hy1; this.hz1=a.hz1; 
	this.dx1 = a.dx1; this.dy1 = a.dy1; this.dz1=a.dz1; 
	this.ws1 = a.ws1; this.ht1 = a.ht1;
	
	this.rotation = a.rotation;
	this.flags = a.flags;
	this.basetime = a.basetime;
	this.vduration = a.vduration;
	this.isforeground = a.isforeground;
	this.elshowatend = a.elshowatend;
	this.doacceleration = a.doacceleration;
	this.dotexmove = a.dotexmove;
	this.docolor = a.docolor;
	this.p = a.p;
	this.lightSpecular = a.lightSpecular;
	this.lightShininess= a.lightShininess;

	if (this.doacceleration)  {this.ax=a.ax; this.ay=a.ay; this.az=a.az;}

	if (this.rotation) {      this.rotpx=a.rotpx; this.rotpy=a.rotpy; this.rotpz=a.rotpz;
				  this.rotax=a.rotax; this.rotay=a.rotay;  this.rotaz=a.rotaz;
				  this.rotfrom=a.rotfrom; this.rotto=a.rotto; }

	if (this.docolor) {
	    this.mix1=a.mix1; this.mix0=a.mix0; this.mixs0=a.mixs0; this.mixs1=a.mixs1;
	    this.col0s=a.col0s;
	    this.col0t=a.col0t;
	    this.col1s=a.col1s;
	    this.col1t=a.col1t;
	}
	if (a.attime || a.attime==0) {
	    this.attime = a.attime; taccgl.newDoat (this);
	}
    }
}

// taccglAnimClone.prototype = new taccglAnimPrototype();


function taccglFlexiBorderPrototype (el)
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
	this.initSuper(el);
	this.vnparts=100; this.vtest2=false;
    }
    this.nparts = function (n){
	this.vnparts = n; return this;
    }

    this.startH = function () {
        var j = taccgl, n = this.vnparts, i, px1, pz1, py1, px0, pz0, py0; 
	for (i=0; i<=n; i++) {
	    if (this.vtest2 && i%2==1) continue;
	    //	    qx = this.x0 + this.hx0/n*i;
            if (i < n  ) {
/*		var nx = this.hy0*this.wz0 - this.hz0*this.wy0,
		    ny = this.hz0*this.wx0 - this.hx0*this.wz0,
		    nz = this.hx0*this.wy0 - this.hy0*this.wx0; */

		this.borderFun1 (this.x1 + this.wx1/n*i, this.y1 + this.wy1/n*i, this.z1 + this.wz1/n*i, i/n, 0);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		this.borderFun0 (this.x0 + this.wx0/n*i, this.y0 + this.wy0/n*i, this.z0 + this.wz0/n*i, i/n, 0);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, 0,0,0,0,
			     this.s0 + this.ws0/n*i, this.t0,
			     this.flags,this.basetime,this.vduration);

		this.borderFun1 (this.x1 + this.wx1/n*i+this.hx1, this.y1 + this.wy1/n*i+this.hy1, this.z1 + this.wz1/n*i+this.hz1, i/n, 1);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		this.borderFun0 (this.x0 + this.wx0/n*i+this.hx0, this.y0 + this.wy0/n*i+this.hy0, this.z0 + this.wz0/n*i+this.hz0, i/n, 1);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, 0,0,0,0,
			     this.s0 + this.ws0/n*i, this.t0 + this.ht0,
			     this.flags,this.basetime,this.vduration);

		i++; this.borderFun1 (this.x1 + this.wx1/n*i, this.y1 + this.wy1/n*i, this.z1 + this.wz1/n*i, i/n, 0);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		this.borderFun0 (this.x0 + this.wx0/n*i, this.y0 + this.wy0/n*i, this.z0 + this.wz0/n*i, i/n, 0);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, 0,0,0,0, 
			     this.s0 + this.ws0/n*i, this.t0,
			     this.flags,this.basetime,this.vduration); i--;
		this.startFixNormal();

		this.borderFun1 (this.x1 + this.wx1/n*i+this.hx1, this.y1 + this.wy1/n*i+this.hy1, this.z1 + this.wz1/n*i+this.hz1, i/n, 1);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		this.borderFun0 (this.x0 + this.wx0/n*i+this.hx0, this.y0 + this.wy0/n*i+this.hy0, this.z0 + this.wz0/n*i+this.hz0, i/n, 1);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, 0,0,0,0, 
			     this.s0 + this.ws0/n*i, this.t0 + this.ht0,
			     this.flags,this.basetime,this.vduration);
		i++; this.borderFun1 (this.x1 + this.wx1/n*i+this.hx1, this.y1 + this.wy1/n*i+this.hy1, this.z1 + this.wz1/n*i+this.hz1, i/n, 1);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		this.borderFun0 (this.x0 + this.wx0/n*i+this.hx0, this.y0 + this.wy0/n*i+this.hy0, this.z0 + this.wz0/n*i+this.hz0, i/n, 1);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, 0,0,0,0,
			     this.s0 + this.ws0/n*i, this.t0 + this.ht0,
			     this.flags,this.basetime,this.vduration); i--;
		i++; this.borderFun1 (this.x1 + this.wx1/n*i, this.y1 + this.wy1/n*i, this.z1 + this.wz1/n*i, i/n, 0);
		px1=this.resx; py1=this.resy; pz1=this.resz;
		this.borderFun0 (this.x0 + this.wx0/n*i, this.y0 + this.wy0/n*i, this.z0 + this.wz0/n*i, i/n, 0);
		px0=this.resx; py0=this.resy; pz0=this.resz;
		j.nvertMove (px0, py0, pz0, px1, py1, pz1, 0,0,0,0,
			     this.s0 + this.ws0/n*i, this.t0,
			     this.flags,this.basetime,this.vduration); i--;

		this.startFixNormal();
		this.startRest();
	    }
	}
   }


    this.startC = function (){
        var j = taccgl, n = this.vnparts,
            mx0=this.x0+this.wx0/2, my0=this.y0+this.hy0/2, mz0=this.z0,
            mx1=this.x1+this.wx1/2, my1=this.y1+this.hy1/2, mz1=this.z1,
            ms=this.s0+this.ws0*0.5, mt=this.t0+this.ht0*0.5,
	    i,px,py,pz,px1,py1,pz1,
	    qx,qy,qz,qx1,qy1,qz1,
	    ps,pt,qs,qt;

        for (i=0; i<=n; i++) {
	    var al= Math.PI*2*i/n,
	        s = Math.sin(al), c=Math.cos(al),
	        w=1, relx, rely;

            px1= mx1+(c*w*this.wx1);    py1 =my1+(s*w*this.hy1);  pz1= this.z1; relx=c; rely=s;

	    if (s<=-0.5) { py1=my1-this.hy1*0.5; px1= mx1-0.5*this.wx1*c/s; rely=0; relx=0.5-0.5*c/s;} 
	    if (s>=0.5)  { py1=my1+this.hy1*0.5; px1= mx1+0.5*this.wx1*c/s; rely=1; relx=0.5+0.5*c/s;} 
	    if (px1>mx1+this.wx1/2) { px1=mx1+this.wx1/2; py1= my1+0.5*this.hy1*s/c; relx=1; rely=0.5+0.5*s/c;}
	    if (px1<mx1-this.wx1/2) { px1=mx1-this.wx1/2; py1= my1-0.5*this.hy1*s/c; relx=0; rely=0.5-0.5*s/c;}


	    this.borderFun1 (px1,py1,pz1,relx,rely);
	    px1=this.resx; py1=this.resy; pz1=this.resz;


	    var rx0=mx0+c*this.wx0, ry0 /*=my0+s*this.hy0*/ ; // coordinates of point on rectangle x0,y0,wx0,hy0
	    relx=c; rely=s;
            if (s<=-0.5) {ry0=my0-this.hy0*0.5; rx0=mx0-0.5*this.wx0*c/s;rely=0; relx=0.5-0.5*c/s;}
	    if (s>=0.5)  {ry0=my0+this.hy0*0.5; rx0=mx0+0.5*this.wx0*c/s;rely=1; relx=0.5+0.5*c/s;}
	    if (rx0<mx0-this.wx0*0.5)  {rx0=mx0-this.wx0*0.5; ry0=my0-0.5*this.hy0*s/c;relx=1; rely=0.5+0.5*s/c;}
	    if (rx0>mx0+this.wx0*0.5)  {rx0=mx0+this.wx0*0.5; ry0=my0+0.5*this.hy0*s/c;relx=0; rely=0.5-0.5*s/c;}
	    px=rx0; py=ry0;pz= this.z0;

	    this.borderFun0 (px,py,pz,relx,rely);
	    px=this.resx; py=this.resy; pz=this.resz;

	    // ps and pt become coordinates of point in texture on rectangle s0,t0,ws0,ht0
	    ps=ms+c*this.ws0;
            if (s<=-0.5) {pt=mt-this.ht0*0.5; ps=ms-0.5*this.ws0*c/s;}
	    if (s>=0.5)  {pt=mt+this.ht0*0.5; ps=ms+0.5*this.ws0*c/s;}
	    if (ps<ms-this.ws0*0.5)  {ps=ms-this.ws0*0.5; pt=mt-0.5*this.ht0*s/c;}
	    if (ps>ms+this.ws0*0.5)  {ps=ms+this.ws0*0.5; pt=mt+0.5*this.ht0*s/c;}

            if (i>0   && (!this.vtest2 || (i%2!=1))  ) { /* FIXME nvertMove */
//		alert("FIXME 487456");
		j.nvertMove (qx,qy,qz, qx1,qy1,qz1, 0,0,0,0, qs,qt   
  		         ,this.flags,this.basetime,this.vduration);
		j.nvertMove (px,py,pz, px1,py1,pz1, 0,0,0,0, ps, pt 
  		         ,this.flags,this.basetime,this.vduration);
		j.nvertMove (mx0,my0,mz0, mx1,my1,mz1, 0,0,0,0,  this.s0+this.ws0/2, this.t0+this.ht0/2  
  		         ,this.flags,this.basetime,this.vduration);
  	       this.startFixNormal();
	       this.startRestTriangle ();
	    }
	    qx=px; qy=py; qz=pz;
	    qx1=px1; qy1=py1; qz1=pz1; qs=ps; qt=pt;
       }
       return this;
    }

    this.renderFun= this.startH;

    this.start = function () {
	if (taccgl.dddmode) {
	    if (this.special) this.startSpecial();
            var maxindex=null, j=taccgl;
            if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}
	    this.renderFun(); 
	    this.vertEndIndex=j.vertI;
	    if (maxindex) j.vertI=maxindex;
	    if (this.p!=j.stdsc) j.setShader(j.stdsc);
	} else
	    this.ddstart(); 
	return this;
    }

    this.horizontal = function () { this.renderFun=this.startH; return this;}
    this.vertical   = function () { this.renderFun=this.startV; return this;}
    this.circular   = function () { this.renderFun=this.startC; return this;}
    this.test2      = function () { this.vtest2=true; return this;}


    this.borderRect = function (x,y,z) {
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderRelRect0 = function (x,y,z,rx,ry) {
	this.resx=this.x0+this.wx0*rx+this.hx0*ry;
	this.resy=this.y0+this.wy0*rx+this.hy0*ry; 
	this.resz=this.z0+this.wz0*rx+this.hz0*ry;
    }
    this.borderRelRect1 = function (x,y,z,rx,ry) {
	this.resx=this.x1+this.wx1*rx+this.hx1*ry;
	this.resy=this.y1+this.wy1*rx+this.hy1*ry; 
	this.resz=this.z1+this.wz1*rx+this.hz1*ry;
    }

    this.borderCircle1 = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
//	    r = this.wx1*0.5,
	    nd=d,
	    ne = Math.sqrt (this.hy1*this.hy1*0.25 - this.hy1*this.hy1/this.wx1/this.wx1*d*d);
	if (e<0) ne=-ne;
	if (isNaN(ne)) ne=0;
	this.resx=mx+nd; this.resy=my+ne; this.resz=this.z1;
    }
	
    this.borderCircle0 = function (x,y,z) {
	var mx= this.x0+this.wx0*0.5,
	    my= this.y0+this.hy0*0.5,
	    d= x-mx, e=y-my,
//	    r = this.wx0*0.5,

	    nd=d,
	    ne = Math.sqrt (this.hy0*this.hy0*0.25 - this.hy0*this.hy0/this.wx0/this.wx0*d*d);
	if (isNaN(ne)) ne=0;
	if (e<0) ne=-ne;
	this.resx=mx+nd; this.resy=my+ne; this.resz=this.z0;
    }

    this.borderResize = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
	
 	    nd=d+0.01*e*e,
	    ne=e+0.001*d*d;

	this.resx=mx+nd; this.resy=my+ne; this.resz=this.z1;
    }

    this.borderWave0 = function (x,y,z) {
	var mx= this.x0+this.wx0*0.5,
	    my= this.y0+this.hy0*0.5,
	    d= x-mx, e=y-my,
	    p=(x-this.x0)/this.wx0,
	    al = this.wavefv0*(1-p)+this.wavetv0*p, ne ,nd;
	if (e>0) 
	    ne = e+ Math.sin(al)*this.ampb0; 
	else
	    ne = e+ Math.sin(al)*this.ampt0; 
	p=(y-this.y0)/this.hy0,
	al = this.wavefh0*(1-p)+this.waveth0*p;
	if (d>0) 
	    nd = d+ Math.sin(al)*this.ampl0; 
	else
	    nd = d+ Math.sin(al)*this.ampr0; 
	this.resx=mx+nd; this.resy=my+ne; this.resz=z;
    }
    this.borderWave1 = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
	    p=(x-this.x1)/this.wx1,
	al = this.wavefv1*(1-p)+this.wavetv1*p, ne, nd;
	if (e>0) 
	    ne = e+ Math.sin(al)*this.ampb1; 
	else
	    ne = e+ Math.sin(al)*this.ampt1; 
	p=(y-this.y1)/this.hy1,
	al = this.wavefh1*(1-p)+this.waveth1*p;
	if (d>0) 
	    nd = d+ Math.sin(al)*this.ampl1; 
	else
	    nd = d+ Math.sin(al)*this.ampr1; 
	this.resx=mx+nd; this.resy=my+ne; this.resz=z;
    }

    this.borderZWave0 = function (x,y,z) {
	var mx= this.x0+this.wx0*0.5,
	    my= this.y0+this.hy0*0.5,
	    d= x-mx, e=y-my,
	    p=(x-this.x0)/this.wx0,
	    al = this.wavefv0*(1-p)+this.wavetv0*p;
	if (e>0) 
	    z = z + Math.sin(al)*this.ampb0; 
	else
	    z = z + Math.sin(al)*this.ampt0; 
	p=(y-this.y0)/this.hy0,
	al = this.wavefh0*(1-p)+this.waveth0*p;
	if (d>0) 
	    z = z + Math.sin(al)*this.ampl0; 
	else
	    z = z + Math.sin(al)*this.ampr0; 
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderZWave1 = function (x,y,z) {
	var mx= this.x1+this.wx1*0.5,
	    my= this.y1+this.hy1*0.5,
	    d= x-mx, e=y-my,
	    p=(x-this.x1)/this.wx1,
	    al = this.wavefv1*(1-p)+this.wavetv1*p;
	if (e>0) 
	    z = z + Math.sin(al)*this.ampb1; 
	else
	    z = z + Math.sin(al)*this.ampt1; 
	p=(y-this.y1)/this.hy1,
	al = this.wavefh1*(1-p)+this.waveth1*p;
	if (d>0) 
	    z = z + Math.sin(al)*this.ampl1; 
	else
	    z = z + Math.sin(al)*this.ampr1; 
	this.resx=x; this.resy=y; this.resz=z;
    }

    this.borderFlip1x = function (x,y,z) {
	var f;
	if (y < this.y1+0.5*this.hy1) f = this.flipt1; else f = this.flipb1;

	var fx= this.x1+this.wx1*f;
//	    fy= this.y1+this.hy1*f;
	
	if (x<fx  /* || y<fy */ ) {
	    this.resx=x; this.resy=y; this.resz=z;
	    return;
	}
	 
	var p = (x - fx) / (this.wx1*(1-f));

        x = fx + Math.cos (Math.PI * (1-p) * 0.5 ) *((1-f)*this.wx1) / Math.PI * 2;
	//        z += (- 1 + Math.sin (Math.PI * (1-p) * 0.5 )) *((1-f)*this.wx1) / Math.PI *2;
        z += (- 1 + Math.sin (Math.PI * (1-p) * 0.5 )) *((1-f)*1000) / Math.PI *2;
       
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderFlip1 = function (x,y,z) {
	var f,p,q;

	if (y < this.y1+0.5*this.hy1) f = this.flipt1; else f = this.flipb1;

	var fx= this.x1+this.wx1*f, fy= this.y1+this.wy1*f, fz= this.z1+this.wz1*f;

	if (y > this.y1+0.5*this.hy1) {fx+=this.hx1; fy+=this.hy1; fz+=this.hz1;}
	
	if (this.wx1 > this.wy1 && this.wx1>this.wz1) 
	    q = (x - this.x1)  / (this.wx1);
	else if (this.wy1 > this.wx1 && this.wy1>this.wz1)
	    q = (y - this.y1)  / (this.wy1);
	else
	    q = (z - this.x1)  / (this.wz1);

	if (q<f) {
	    this.resx=x; this.resy=y; this.resz=z;
	    return;
	}
	 
	p = (q-f)/(1-f);


	var e = Math.sqrt (this.wx1*this.wx1+this.wy1*this.wy1+this.wz1*this.wz1)*(1-f),
	    g =  Math.cos (Math.PI * (1-p) * 0.5 ) * (1-f) / Math.PI * 2,
	    h =  (- 1 + Math.sin (Math.PI * (1-p) * 0.5 )) *e / Math.PI *2;

	x = fx + g*this.wx1 + h*this.dx1;
	y = fy + g*this.wy1 + h*this.dy1;
	z = fz + g*this.wz1 + h*this.dz1;
	//        x = fx + Math.cos (Math.PI * (1-p) * 0.5 ) *((1-f)*this.wx0) / Math.PI * 2;
	this.resx=x; this.resy=y; this.resz=z;
    }
    this.borderFlip0 = function (x,y,z) {
	var f,p,q;

	if (y < this.y0+0.5*this.hy0) f = this.flipt0; else f = this.flipb0;

	var fx= this.x0+this.wx0*f, fy= this.y0+this.wy0*f, fz= this.z0+this.wz0*f;

	if (y > this.y0+0.5*this.hy0) {fx+=this.hx0; fy+=this.hy0; fz+=this.hz0;}
	
	if (this.wx0 > this.wy0 && this.wx0>this.wz0) 
	    q = (x - this.x0)  / (this.wx0);
	else if (this.wy0 > this.wx0 && this.wy0>this.wz0)
	    q = (y - this.y0)  / (this.wy0);
	else
	    q = (z - this.x0)  / (this.wz0);

	if (q<f) {
	    this.resx=x; this.resy=y; this.resz=z;
	    return;
	}
	 
	p = (q-f)/(1-f);


	var e = Math.sqrt (this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0)*(1-f),
	    g =  Math.cos (Math.PI * (1-p) * 0.5 ) * (1-f) / Math.PI * 2,
	    h =  (- 1 + Math.sin (Math.PI * (1-p) * 0.5 )) *e / Math.PI *2;

	x = fx + g*this.wx0 + h*this.dx0;
	y = fy + g*this.wy0 + h*this.dy0;
	z = fz + g*this.wz0 + h*this.dz0;
	//        x = fx + Math.cos (Math.PI * (1-p) * 0.5 ) *((1-f)*this.wx0) / Math.PI * 2;
	this.resx=x; this.resy=y; this.resz=z;
    }

    this.Flip = function (ft,fb) {
	this.flipt1=ft; this.flipb1=fb
	this.flipt0=ft; this.flipb0=fb
	this.borderFun1 = this.borderFlip1; 
	this.borderFun0 = this.borderFlip0; 
	return this;
    }
    this.Flip1 = function (ft,fb) {
	this.flipt1=ft; this.flipb1=fb
	this.borderFun1 = this.borderFlip1; 
	return this;
    }

    this.borderFun1 = this.borderRect;
    this.borderFun0 = this.borderRect;

    this.Circle = function (){
        this.borderFun0 = this.borderCircle0;this.borderFun1 = this.borderCircle1; return this;
    }
    this.Circle1 = function (){
        this.borderFun1 = this.borderCircle1; return this;
    }
    this.Rect = function (){
        this.borderFun0 = this.borderRect;this.borderFun1 = this.borderRect; return this;
    }
    this.Rect1 = function (){
        this.borderFun1 = this.borderRect; return this;
    }
    this.RelRect = function (){
        this.borderFun0 = this.borderRelRect0;this.borderFun1 = this.borderRelRect1; return this;
    }
    this.RelRect1 = function (){
        this.borderFun1 = this.borderRelRect1; return this;
    }

    this.Wave = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	this.Wave1 (ampt,ampb,fv,tv,ampl,ampr,fh,th);
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt0=ampt; 
	this.ampb0=ampb; 
	this.ampl0=ampl; 
	this.ampr0=ampr; 
	this.wavefh0=fh;
	this.waveth0=th;
	this.wavefv0=fv;
	this.wavetv0=tv;
        this.borderFun0 = this.borderWave0; return this;
    }
    this.Wave1 = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt1=ampt; 
	this.ampb1=ampb; 
	this.ampl1=ampl; 
	this.ampr1=ampr; 
	this.wavefh1=fh;
	this.waveth1=th;
	this.wavefv1=fv;
	this.wavetv1=tv;
        this.borderFun1 = this.borderWave1; return this;
    }
    this.ZWave = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	this.ZWave1  (ampt,ampb,fv,tv,ampl,ampr,fh,th);
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt0=ampt; 
	this.ampb0=ampb; 
	this.ampl0=ampl; 
	this.ampr0=ampr; 
	this.wavefh0=fh;
	this.waveth0=th;
	this.wavefv0=fv;
	this.wavetv0=tv;
        this.borderFun0 = this.borderZWave0; return this;
    }
    this.ZWave1 = function (ampt,ampb,fv,tv,ampl,ampr,fh,th){
	if (ampt+''=='undefined') ampt = this.ht1/2;
	if (ampb+''=='undefined') ampb = this.ht1/2;
	if (ampl+''=='undefined') ampl = 0;
	if (ampr+''=='undefined') ampr = 0;
	if (tv+''=='undefined') tv=Math.PI*2;
	if (!fv) fv=0;
	if (th+''=='undefined') th=Math.PI*2;
	if (!fh) fh=0;
	this.ampt1=ampt; 
	this.ampb1=ampb; 
	this.ampl1=ampl; 
	this.ampr1=ampr; 
	this.wavefh1=fh;
	this.waveth1=th;
	this.wavefv1=fv;
	this.wavetv1=tv;
        this.borderFun1 = this.borderZWave1; return this;
    }


    this.cont = function (el) {
	var e = el;
        if (!el) e=this.el;
	var an = new taccgl.flexiBorder (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an,el);  
	an.nparts (this.vnparts);
	an.renderFun = this.renderFun; an.vtest2=this.vtest2;
	if (this.borderFun1==this.borderCircle1) {
	    an.Circle();
	} else 	if (this.borderFun1==this.borderWave1) {
	    an.Wave( this.ampt1, this.ampb1, this.wavefv1, this.wavetv1, this.ampl1, this.ampr1, this.wavefh1, this.waveth1)
	} else 	if (this.borderFun1==this.borderZWave1) {
	    an.ZWave( this.ampt1, this.ampb1, this.wavefv1, this.wavetv1, this.ampl1, this.ampr1, this.wavefh1, this.waveth1)
	} else 	if (this.borderFun1==this.borderFlip1) {
	    an.Flip (this.flipt1, this.flipb1);
	}

	return (an);
    }

    this.clone = function (a) { return new this.taccglFlexiBorderClone (this); }
    this.taccglFlexiBorderClone = function (a) {
	this.taccglAnimClone (a);
	this.vnparts= a.vnparts;
	this.vtest2= a.vtest2;
	this.renderFun = a.renderFun;
	this.borderFun1 = a.borderFun1;
	this.borderFun0 = a.borderFun0;
	if (this.borderFun1==this.borderWave1 || this.borderFun1==this.borderZWave1) {
	    this.ampt1=a.ampt1; this.ampb1=a.ampb1; this.wavefv1=a.wavefv1; this.wavetv1=a.wavetv1; 
	    this.ampl1=a.ampl1; this.ampr1=a.ampr1; this.wavefh1=a.wavefh1; this.waveth1=a.waveth1;
	} else 	if (this.borderFun1==this.borderFlip1) {
	    this.flipt1=a.flipt1; this.flipb1=a.flipb1;
	}
	if (this.borderFun0==this.borderWave0 || this.borderFun0==this.borderZWave0) {
	    this.ampt0=a.ampt0; this.ampb0=a.ampb0; this.wavefv0=a.wavefv0; this.wavetv0=a.wavetv0; 
	    this.ampl0=a.ampl0; this.ampr0=a.ampr0; this.wavefh0=a.wavefh0; this.waveth0=a.waveth0;
	} else 	if (this.borderFun0==this.borderFlip0) {
	    this.flipt0=a.flipt0; this.flipb0=a.flipb0;
	}
    }
}
taccglFlexiBorderPrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.flexiBorder.prototype = new taccglFlexiBorderPrototype();
taccgl.flexiBorder.prototype.taccglFlexiBorderClone.prototype = taccgl.flexiBorder.prototype;


function taccglMultiFacePrototype (el)
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
	this.face = Array(0);
	this.initSuper(el);
    }
    this.createFace = function (xtl,ytl,ztl,xtr,ytr,ztr,xbl,ybl,zbl,xbr,ybr,zbr){
	this.xtl=xtl;this.ytl=ytl;this.ztl=ztl;
	this.xtr=xtr;this.ytr=ytr;this.ztr=ztr;
	this.xbl=xbl;this.ybl=ybl;this.zbl=zbl;
	this.xbr=xbr;this.ybr=ybr;this.zbr=zbr;
    }
    this.newFace = function(xtl,ytl,ztl,xtr,ytr,ztr,xbl,ybl,zbl,xbr,ybr,zbr){
	var f = new this.createFace(xtl,ytl,ztl,xtr,ytr,ztr,xbl,ybl,zbl,xbr,ybr,zbr);
        if (!this.dotexmove) {this.s1=this.s0; this.ws1=this.ws0; this.t1=this.t0; this.ht1=this.ht0;}
	f.flags=this.flags;
	f.s0=this.s0; f.t0=this.t0;
	f.ws0=this.ws0; f.ht0=this.ht0;
	f.s1=this.s1; f.t1=this.t1;
	f.ws1=this.ws1; f.ht1=this.ht1;
	f.docolor=this.docolor; 
	if (this.docolor) {
	    f.ddcolor0=this.ddcolor0; f.ddcolor1=this.ddcolor1;
	    f.mix0=this.mix0; f.mix1=this.mix1; 
	    f.mixs0=this.mixs0; f.mixs1=this.mixs1; 
	}
	f.lightSpecular=taccgl.lightSpecular;
	f.lightShininess=taccgl.lightShininess;

	this.face.push (f)
	this.selFace (this.face.length-1);
	return f;
    }
    this.cloneFaces = function (an){
	var f,j,nf;
	for (j=0;j<this.face.length;j++){
	    f = this.face[j], nf=an.newFace (f.xtl,f.ytl,f.ztl,f.xtr,f.ytr,f.ztr,f.xbl,f.ybl,f.zbl,f.xbr,f.ybr,f.zbr);
	    nf.s0=f.s0; nf.t0=f.t0;
	    nf.ws0=f.ws0; nf.ht0=f.ht0;
	    nf.s1=f.s1; nf.t1=f.t1;
	    nf.ws1=f.ws1; nf.ht1=f.ht1;
	    nf.flags=f.flags;
	    nf.docolor=f.docolor;
	    if (f.docolor) {
		nf.ddcolor0=f.ddcolor0; nf.ddcolor1=f.ddcolor1;
		nf.mix0=f.mix0; nf.mix1=f.mix1; 
		nf.mixs0=f.mixs0; nf.mixs1=f.mixs1; 
		nf.col0s=f.col0s;
		nf.col0t=f.col0t;
		nf.col1s=f.col1s;
		nf.col1t=f.col1t;
	    }
	}
    }
    this.selFace = function (j) {
	this.curface = this.face[j];
	this.curfacei = j; return this;
    }
   this.blend     = function (f,s,f1,s1) {
       if (!this.curface.docolor) {       this.curface.col0s= this.curface.col0t=this.curface.col1s=this.curface.col1t=-128*256; }
       this.curface.docolor=true; this.curface.flags|=16;
       this.curface.mix0=f; this.curface.mix1=f;
       if (!s) s=0;
       this.curface.mixs0=s; this.curface.mixs1=s;
       if (typeof (f1)=="number" )  this.curface.mix1=f1;
       if (typeof (s1)=="number" )  this.curface.mixs1=s1;
       return this;
   }
   this.color      = function (c,c1) {
       var idata,r,g,b,a;
       if (!this.curface.docolor) {this.curface.mix1=this.curface.mix0=1; this.curface.mixs0=this.curface.mixs1=0;}
       this.curface.docolor=true; this.curface.flags|=16;this.flags &= ~32;this.flags &= ~64;
       this.curface.ddcolor0=c; this.curface.ddcolor1=c;
       if (c1) this.curface.ddcolor1=c1;
       if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.curface.col1s =this.curface.col0s = r+256*(g-128); this.curface.col1t= this.curface.col0t=a+256*(b-128);
       }
       if (c1 && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c1;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   idata = taccgl.scratchc.getImageData(0,0,1,1),
	   r = idata.data[0],
	   g = idata.data[1],
	   b = idata.data[2],
	   a = idata.data[3];
	   this.curface.col1s = r+256*(g-128); this.curface.col1t=a+256*(b-128);
       }
       return this;
   }
    this.specLight = function (s, shini) {
	this.curface.lightSpecular=s%1;
	this.curface.lightShininess=Math.floor(shini); return this;
    }
    this.lightAmbDiff = function (ambCol, diffCol, a0, a1) {
	this.color(ambCol, diffCol);
        this.curface.ddcolor0=diffCol; this.curface.ddcolor1=diffCol;
	if (!a0 && a0!=0.0) a0=0.0;
	if (!a1 && a1!=0.0) a1=0.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
	this.curface.col0t = Math.floor (this.curface.col0t / 256) * 256 + a0*255;
	this.curface.col1t = Math.floor (this.curface.col1t / 256) * 256 + a1*255;
	this.curface.flags |=32; this.curface.flags &= ~64; return this;
    }
    this.lightBgAmbDiff = function (c,amb,diff, a0, a1) {
        if (!this.curface.docolor) {this.mix1=this.mix0=1; this.mixs0=this.mixs1=0;}
        this.curface.docolor=true; this.curface.flags|=16+32+64;
        this.curface.ddcolor0=c; this.curface.ddcolor1=c;
	if (!a0 && a0!=0.0) a0=1.0;
	if (!a1 && a1!=0.0) a1=1.0;
	if (a0>1) a0=1;
	if (a1>1) a1=1;
	if (a0<0) a0=0;
	if (a1<0) a1=0;
        if (c && taccgl.scratchc) {
	   taccgl.scratchc.fillStyle=c;
	   taccgl.scratchc.clearRect(0,0,1,1);
	   taccgl.scratchc.fillRect(0,0,1,1);
	   var idata = taccgl.scratchc.getImageData(0,0,1,1),
	       r = idata.data[0],
	       g = idata.data[1],
	       b = idata.data[2];
	       // a = idata.data[3]; 
	    this.curface.col0s = r+256*(g-128); this.curface.col0t=Math.floor(a0*255)+256*(b-128);
        }
	if (amb>1) amb=1;
	if (diff>1) diff=1;
	if (amb<0) amb=0;
	if (diff<0) diff=0; 
	amb=Math.floor(amb*255); diff=Math.floor(diff*255);
	this.curface.col1s = amb+256*(diff-128); this.curface.col1t=Math.floor(a1*255); return this;
   }
   this.map = function (s,t,w,h) {
       this.curface.s0=s; this.curface.t0=t; this.curface.ws0=w; this.curface.ht0=h; return this;
   }
   this.map1 = function (s,t,w,h) {
       this.curface.dotexmove=true;
       this.curface.s1=s; this.curface.t1=t; this.curface.ws1=w; this.curface.ht1=h; return this;
   }
   this.mapA = function () {
       this.curface.dotexmove=true;
       this.curface.s1=this.curface.s0; this.curface.t1=this.curface.t0; this.curface.ws1=this.curface.ws0; this.curface.ht1=this.curface.ht0; return this;
   }
   this.mapMirrorY = function () {
       var x = this.curface.s0;
       this.curface.s0 = x+this.curface.ws0; this.curface.ws0=-this.curface.ws0;
       return this;
   }
   this.mapMirrorX = function () {
       var y = this.curface.t0;
       this.curface.t0 = y+this.curface.ht0; this.curface.ht0=-this.curface.ht0;
       return this;
   }
   this.mapRelative = function (s,t,w,h) {
       this.curface.s0+=s; this.curface.t0+=t; this.curface.ws0 = w; this.curface.ht0 = h; return this;
   }

   this.mapClip = function (w,h,pos,overflow) {
       if (overflow != "b" && overflow != 'br'){
	   if (h>this.curface.ht0) h=this.curface.ht0;
       } 
       if (overflow != "r" && overflow != 'br'){
	   if (w>this.curface.ws0) w=this.curface.ws0;
       } 
       
       if (pos=="tl") {
       } else if (pos=="t") {
	   w=this.curface.ws0;
       } else if (pos=="tr") {
	   this.curface.s0 += this.curface.ws0-w;
       } else if (pos=="l") {
	   h=this.curface.ht0;
       } else if (pos=="r") {
	   this.s0 += this.curface.ws0-w; h=this.curface.ht0;
       } else if (pos=="bl") {
	   this.curface.t0 += this.curface.ht0-h;
       } else if (pos=="b") {
	   this.t0 += this.curface.ht0-h;  w=this.curface.ws0;
       } else if (pos=="br") {
	   this.curface.t0 += this.curface.ht0-h;
	   this.curface.s0 += this.curface.ws0-w;
       }
       this.curface.ws0 = w; this.curface.ht0 = h;
       return this;
   }
    this.restrict = function (x,y,w,h) {
	this.x0=this.x1= x;	
	this.y0=this.y1= y;
	this.wx0=this.wx1=w;
	this.hy0=this.hy1= h;
	this.s0=this.x0; 
	this.t0=this.y0;
	this.ws0=this.wx0;
	this.ht0=this.hy0;
	var i;
	for (i=0; i<this.face.length; i++) {
	    this.selFace (i);
	    this.map(x,y,w,h);
	}
	return this;
    }

    this.cont = function (el) {
	var e = el;
        if (!el) e=this.el;
	var an = new taccgl.multiFace (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an,el);  this.cloneFaces(an);
	return (an);
    }
    this.startFace = function (f) {
       var j = taccgl, i,
           e = this.vduration + this.basetime;
       if (j.duration < e) j.setDuration(e);

       var hx0= this.wx0*f.xbl+this.hx0*f.ybl+this.dx0*f.zbl - this.wx0*f.xtl-this.hx0*f.ytl-this.dx0*f.ztl,
	   hy0= this.wy0*f.xbl+this.hy0*f.ybl+this.dy0*f.zbl - this.wy0*f.xtl-this.hy0*f.ytl-this.dy0*f.ztl,
	   hz0= this.wz0*f.xbl+this.hz0*f.ybl+this.dz0*f.zbl - this.wz0*f.xtl-this.hz0*f.ytl-this.dz0*f.ztl,
	   wx0= this.wx0*f.xtr+this.hx0*f.ytr+this.dx0*f.ztr - this.wx0*f.xtl-this.hx0*f.ytl-this.dx0*f.ztl,
	   wy0= this.wy0*f.xtr+this.hy0*f.ytr+this.dy0*f.ztr - this.wy0*f.xtl-this.hy0*f.ytl-this.dy0*f.ztl,
	   wz0= this.wz0*f.xtr+this.hz0*f.ytr+this.dz0*f.ztr - this.wz0*f.xtl-this.hz0*f.ytl-this.dz0*f.ztl,
	   nx = hy0*wz0 - hz0*wy0,
	   ny = hz0*wx0 - hx0*wz0,
           nz = hx0*wy0 - hy0*wx0,
	   spec=this.lightSpecular + this.lightShininess;
	
       j.nvertMove (this.x0+this.wx0*f.xtl+this.hx0*f.ytl+this.dx0*f.ztl,  this.y0+this.wy0*f.xtl+this.hy0*f.ytl+this.dy0*f.ztl, 
		       this.z0+this.wz0*f.xtl+this.hz0*f.ytl+this.dz0*f.ztl
                    ,this.x1+this.wx1*f.xtl+this.hx1*f.ytl+this.dx1*f.ztl, this.y1+this.wy1*f.xtl+this.hy1*f.ytl+this.dy1*f.ztl, 
		       this.z1+this.wz1*f.xtl+this.hz1*f.ytl+this.dz1*f.ztl
		    ,nx,ny,nz,spec, f.s0, f.t0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xbl+this.hx0*f.ybl+this.dx0*f.zbl,  this.y0+this.wy0*f.xbl+this.hy0*f.ybl+this.dy0*f.zbl, 
		       this.z0+this.wz0*f.xbl+this.hz0*f.ybl+this.dz0*f.zbl
                    ,this.x1+this.wx1*f.xbl+this.hx1*f.ybl+this.dx1*f.zbl, this.y1+this.wy1*f.xbl+this.hy1*f.ybl+this.dy1*f.zbl, 
		       this.z1+this.wz1*f.xbl+this.hz1*f.ybl+this.dz1*f.zbl
		    ,nx,ny,nz,spec, f.s0, f.t0+f.ht0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xtr+this.hx0*f.ytr+this.dx0*f.ztr,  this.y0+this.wy0*f.xtr+this.hy0*f.ytr+this.dy0*f.ztr, 
		       this.z0+this.wz0*f.xtr+this.hz0*f.ytr+this.dz0*f.ztr
                    ,this.x1+this.wx1*f.xtr+this.hx1*f.ytr+this.dx1*f.ztr, this.y1+this.wy1*f.xtr+this.hy1*f.ytr+this.dy1*f.ztr, 
		       this.z1+this.wz1*f.xtr+this.hz1*f.ytr+this.dz1*f.ztr
		    ,nx,ny,nz,spec ,f.s0+f.ws0, f.t0, f.flags|this.flags,this.basetime,this.vduration);

       j.nvertMove (this.x0+this.wx0*f.xbr+this.hx0*f.ybr+this.dx0*f.zbr,  this.y0+this.wy0*f.xbr+this.hy0*f.ybr+this.dy0*f.zbr, 
		       this.z0+this.wz0*f.xbr+this.hz0*f.ybr+this.dz0*f.zbr
                    ,this.x1+this.wx1*f.xbr+this.hx1*f.ybr+this.dx1*f.zbr, this.y1+this.wy1*f.xbr+this.hy1*f.ybr+this.dy1*f.zbr, 
		       this.z1+this.wz1*f.xbr+this.hz1*f.ybr+this.dz1*f.zbr
		    ,nx,ny,nz,spec ,f.s0+f.ws0, f.t0+f.ht0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xtr+this.hx0*f.ytr+this.dx0*f.ztr,  this.y0+this.wy0*f.xtr+this.hy0*f.ytr+this.dy0*f.ztr, 
		       this.z0+this.wz0*f.xtr+this.hz0*f.ytr+this.dz0*f.ztr
                    ,this.x1+this.wx1*f.xtr+this.hx1*f.ytr+this.dx1*f.ztr, this.y1+this.wy1*f.xtr+this.hy1*f.ytr+this.dy1*f.ztr, 
		       this.z1+this.wz1*f.xtr+this.hz1*f.ytr+this.dz1*f.ztr
		    ,nx,ny,nz,spec ,f.s0+f.ws0, f.t0, f.flags|this.flags,this.basetime,this.vduration);
       j.nvertMove (this.x0+this.wx0*f.xbl+this.hx0*f.ybl+this.dx0*f.zbl,  this.y0+this.wy0*f.xbl+this.hy0*f.ybl+this.dy0*f.zbl, 
		       this.z0+this.wz0*f.xbl+this.hz0*f.ybl+this.dz0*f.zbl
                    ,this.x1+this.wx1*f.xbl+this.hx1*f.ybl+this.dx1*f.zbl, this.y1+this.wy1*f.xbl+this.hy1*f.ybl+this.dy1*f.zbl, 
		       this.z1+this.wz1*f.xbl+this.hz1*f.ybl+this.dz1*f.zbl
		    ,nx,ny,nz,spec  ,f.s0, f.t0+f.ht0, f.flags|this.flags,this.basetime,this.vduration);

      if (this.rotation) {
         for (i=1; i<=6; i++) {
	     j.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (this.doacceleration){
         for (i=1; i<=6; i++) {
	     j.nvertAcceleration(this.ax,this.ay,this.az); j.nvertOffset(-1);
	 }
         j.nvertOffset (6); 
       }
       if (f.dotexmove) {
           j.nvertOffset (-5); 
	   j.nvertTexMove (f.s1,f.t1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.ws1,f.t1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1,f.t1+f.ht1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.ws1,f.t1+f.ht1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1,f.t1+f.ht1); j.nvertOffset(1);
	   j.nvertTexMove (f.s1+f.ws1,f.t1); 
       }
       if (f.docolor) {
	   j.nvertColor6 (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1);
/*
           j.nvertOffset (-5); 
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); j.nvertOffset(1);
	   j.nvertColor (f.col0s,f.col0t,f.col1s, f.col1t, f.mix0, f.mix1, f.mixs0, f.mixs1); 
*/
       }
 
       return this;
    }
    this.start = function () {
	var j,f,i;  
	if (!taccgl.dddmode) {this.ddstart(); return this;}
        var maxindex=null; j=taccgl;
        if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}
        if (this.special) this.startSpecial();
	for (i=0; i<this.face.length; i++){
	    f = this.face[i];
	    this.startFace (f);
	}
	this.vertEndIndex=j.vertI;
	if (maxindex) j.vertI=maxindex;
        if (this.p!=j.stdsc) j.setShader(j.stdsc);
	return this;
    }
    this.clone = function(a) {return new this.taccglMultiFaceClone(this);}
    this.taccglMultiFaceClone = function (a){
	this.taccglAnimClone(a);
	this.face = Array(0);
	a.cloneFaces(this);
    }
}
taccglMultiFacePrototype.prototype = taccgl.taccglAnim.prototype;
taccgl.multiFace.prototype =  new taccglMultiFacePrototype();
taccgl.multiFace.prototype.taccglMultiFaceClone.prototype = taccgl.multiFace.prototype;

function taccglDddBoxPrototype (el)
{
    this.initSuper2 =taccgl.multiFace.prototype.init;
    this.startSuper =taccgl.multiFace.prototype.start;
    this.init = function (el){
	this.initSuper2(el);
	this.newFace (0,0,0, 1,0,0, 0,1,0, 1,1,0); // front 
	this.newFace (1,0,0, 1,0,1, 1,1,0, 1,1,1); // right
	this.newFace (1,0,1, 0,0,1, 1,1,1, 0,1,1); // back
	this.newFace (0,0,1, 0,0,0, 0,1,1, 0,1,0); // left
	this.newFace (0,0,1, 1,0,1, 0,0,0, 1,0,0); // top
	this.newFace (0,1,0, 1,1,0, 0,1,1, 1,1,1); // bottom
	this.dx0=this.dx1=0; this.dy0=this.dy1=0; this.dz0=this.dz1=this.hy0;
    }
    this.selFront = function (){return this.selFace(0);}
    this.selRight = function (){return this.selFace(1);}
    this.selBack  = function (){return this.selFace(2);}
    this.selLeft  = function (){return this.selFace(3);}
    this.selTop   = function (){return this.selFace(4);}
    this.selBottom= function (){return this.selFace(5);}
    this.cont = function (el) {
	var e = el;
        if (!el) e=this.el;
	var an = new taccglDddBoxSuper2 (e);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an,el);  this.cloneFaces(an);
	return (an);
    }
    this.clone = function(a) {return new this.taccglDddBoxClone(this);}
    this.taccglDddBoxClone = function (a){
	this.taccglMultiFaceClone(a);
    }
}

taccglDddBoxPrototype.prototype = taccgl.multiFace.prototype;
taccgl.dddBox.prototype =  new taccglDddBoxPrototype();
taccglDddBoxSuper2=function (el) {this.initSuper2(el);}
taccglDddBoxSuper2.prototype =taccgl.dddBox.prototype;
taccgl.dddBox.prototype.taccglDddBoxClone.prototype=taccgl.dddBox.prototype;

/* Shader Configurations */
function taccglShaderConfigPrototype () {
    var x=this; if(x){} // artificially use x to avoid tools the cannot handle eval complaining about unused x

/* To work on the shaders, cut and paste the following script block into your HTML page.
   To incorporate the changed shaders in here, set taccgl_showShaders = true, run
   an animation and cut and paste the content of the third shader field into here 
   replacing all text up to the init function. */
/*
/* 
<script id="taccgl_Shaders" type="x-gsgl/x-vertex">


:stdUniformsBg                    
//=====   Uniforms used by almost all Shaders
uniform   sampler2D uTexture;     //: first and 
uniform   sampler2D uTexture2;    //: second texture canvas

:stdUniformsEnd
//=====   Generated Uniforms
$$genUniforms
//=====   Generated Constants
$$genConsts


:stdVertexUniforms                
//=====   Uniforms used by almost all vertex Shaders
$$stdUniformsBg
uniform   float uTime;            //: time in seconds since start of the animation
$$?!this.inShadow{ 
uniform   vec4   cvp;             //: (p,q) size of the animation canvas p=2/w q=2/h
                                  //: (s,t) position of the animation canvas
$$?}
$$?this.inShadow{ 
uniform   highp vec4   shcvp;     //: (p,q) size of the animation canvas p=2/w q=2/h
                                  //: (s,t) position of the animation canvas
$$?}
$$?this.sp.useTM{
$$?}
$$stdUniformsEnd 


:stdFragmentUniforms
$$stdUniformsBg
$$?this.inShadow||this.sp.showShadow{ 
uniform   mediump vec4  fshcvp;    //: (p,q) size of the animation canvas p=2/w q=2/h
                                   //: (s,t) position of the animation canvas
                                   //: this is identical to the shcvp except for the precision mediump
$$?}
$$?this.sp.showShadow{
uniform   sampler2D uShadowMap;    //: second texture canvas
$$?}
$$stdUniformsEnd 



:stdAttributes
//=====  Attributes used by standard vertex shader 
//:   flags:
//:      1     showBefore
//:      2     showAfter
//:      8     useTM
//:     16     color or texmix are set
//:     32  0  color animation mode backgroundcolor changes from c0 to c1,
//:            ambient and diffuse factors are given in uLightingPar.xy
//:     32  1
//:      64 0  c1.r and c1.g give ambient and diffuse factors
//:            c0 is background color with alpha value mix(c0.w,c1.w,t)
//:      64 1  c1 diffuse color c0 ambient color background color is white * mix(c0.w,c1.w,t)
//:     128    show shadows on triangle
//:     256    suppress casting a shadow

attribute vec4 pos;       //: 1 available: flags
attribute vec4 origin;    //: 1 available: basetime
attribute vec4 texpos;    //: 2 available: st starting and pq final texture coordinates
attribute vec4 rotP;      //: 1 available: from Rotation
attribute vec4 accel;     //: 1 available: duration
attribute vec4 rotA;      //: 1 available: to Rotation
attribute vec4 color;     //: c0=(s,t) first and c1=(p,q) second color
attribute vec4 texmix;    //: factors mixing textures and animation
attribute vec4 normal;    //: 1 available: ligthting parameters interger part: shininess, fractional part: 



:stdVarying
//=====  Varyings used by almost all Shaders
varying   vec2 vtexpos;   //: texture position
varying   vec4 vAmbColor; //: ambient color
varying   vec4 vDiffColor;//: diffuse color 
varying   vec2 vmix;      //: factors mixing both textures
varying   vec4 times;     //: passing on timing information for user shaders

$$?this.sp.lightingPerVertex{
varying   vec3 vLight;    //: vertex lighting
$$?}

$$?this.sp.lightingPerFragment{
varying vec3 vnormal;     //: normal vector
varying vec3 v3Dpos;      //: 3D position of fragment
varying vec4 vLightingPar;//: Lighting parameters
$$?}




:DoRotation
//: H E L P E R    F U N C T I O N S

vec3 tnormal;

vec4 
DoRotation (vec4 p, float t)
//: rotate vector p and normal vector tnormal according to rotP and rotA
//: t denotes the point in time within the animation step scaled to 0..1
{
   float from = rotP.w;
   float to   = rotA.w; 
   float b    = mix (from,to,t); 

   vec3  q = vec3(p) - vec3(rotP);
   float c = cos(b); float mc= (1.0-c);
   float s = sin(b);

   mat3 Mrot = mat3 (c+rotA.x*rotA.x*mc,            rotA.x*rotA.y*mc-rotA.z*s,    rotA.x*rotA.z*mc+rotA.y*s,
                     rotA.x*rotA.y*mc+rotA.z*s,     c+rotA.y*rotA.y*mc,           rotA.y*rotA.z*mc-rotA.x*s,
                     rotA.z*rotA.x*mc-rotA.y*s,     rotA.z*rotA.y*mc+rotA.x*s,    c+rotA.z*rotA.z*mc);



   q = Mrot * q;
   tnormal = Mrot * tnormal;

   q=q+vec3(rotP);    return vec4( q.x, q.y, q.z, p.w);
}




:stdVertexHead
//: 
//: S T D    V E R T E X   S H A D E R
//: 

//:  Standard Vertex Shader Main
void main()
{
    vec4 a = vec4 (vec3(pos),1.0);  
    flags = int(pos.w);
    float basetime = times.s= origin.w;
    float duration = times.t= accel.w;
    mat4 pm;

//:  Time transformation
    float rt = times.p = (uTime-basetime)/duration;
    float t  = times.q = clamp(rt,0.0,1.0);
    tnormal = normal.xyz;

:stdVertexCondition   
  if (  (((flags/2)*2 == flags) && (rt<0.0)) || (((flags/4)*4 == (flags/2)*2)) && (rt>1.0)) {
        gl_Position = vec4(0.0,0.0,0.0,1.0);
  } else {

:stdVertexMotionAnimation
//:  Possibly do a rotation animation
    if (rotA.w!=0.0) {
       vec4 ra = DoRotation (a,t);
       a = vec4 ((mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel)-vec3(a)+vec3(ra)),1.0);   //: accelerated motion using builtin function mix
    } else {

       a = vec4 (mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel),1.0);       }
$$?this.sp.useTM{
    if ((flags/16)*16 != (flags/8)*8) {
      a=uTM*a;
      tnormal = uTM_1T * tnormal;
    }
$$?}

:stdVertex3DmappingEye
//:  3d -> 2d mapping
    const float ex=$$EYEX;     const float ey=$$EYEY;     const float ez=$$EYEZ;

:stdVertex3DmappingBase





    pm = mat4   (    cvp.p,                            0.0,                            0.0,    0.0,  
                             0.0,                       -  cvp.q,                            0.0,    0.0,
                        ((1.0+cvp.p*(cvp.s-ex))/ez),   ((-1.0+cvp.q*(ey-cvp.t))/ez),          0.0,   -1.0/ez,
                         -cvp.p*cvp.s-1.0,              cvp.q*cvp.t+1.0,              ez/65536.0,    1.0);
                     
    vec4 pos; 
    pos = pm*a;

    gl_Position = pos;

:stdVertexTexmix    
    vtexpos=mix (texpos.st,texpos.pq,t);
    vtexpos=vec2(vtexpos.s/$$TEXTURECANVASWIDTH,vtexpos.t/$$TEXTURECANVASHEIGHT);

:stdVertexLighting
    if ((flags/32)*2 != (flags/16)) {
       vec4 c0 = vec4( mod(color.s,256.0)/255.0 , (floor(color.s*(1.0/256.0))+128.0)*(1.0/255.0), 
                 (floor(color.t*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.t,256.0) *(1.0/255.0));
       vec4 c1 = vec4( mod(color.p,256.0)/255.0 , (floor(color.p*(1.0/256.0))+128.0)*(1.0/255.0), 
                 (floor(color.q*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.q,256.0) *(1.0/255.0));


       vec4 m = texmix;
       if ((flags/64)*2 != (flags/32)) {
$$?this.sp.lightingPerFragment{
          if ((flags/128)*2 != (flags/64)) { //: background color and factors given
             vDiffColor = vec4(c1.r,c1.g,0.0,0.0);
               vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t);
          } else { //: ambient and diffuse color given
             vDiffColor = vec4(c1.rgb,1.0);
             vAmbColor  = vec4(c0.rgb, mix(c0.w,c1.w,t));
          }
$$?}
       } else { //: Color Animation Mode
$$?this.sp.lightingPerFragment{
          vDiffColor = vec4 (uLightingPar.x, uLightingPar.y, 0.0, 0.0);
$$?}
          vAmbColor  = mix (c0,c1,t);
       }
       vmix   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);
    } else {
       vAmbColor = vec4(0.0,0.0,0.0,0.0);
$$?this.sp.lightingPerFragment{
       vDiffColor = vec4(uLightingPar.x, uLightingPar.y,0.0,0.0);
$$?}
       vmix   = vec2(1.0,0.0);
    }

$$?this.sp.lightingPerVertex{
  vec3 lightPos = vec3 (0.0,2000.0,-8000.0);
  vec3 lightDir = normalize(lightPos - a.xyz);
  vLight = vec3 (.5,.5,.5) +  vec3 (.5,.5,.5) * ( clamp(   (dot(normalize(tnormal.xyz), lightDir )), 0.0, 1.0));
$$?}

$$?this.sp.lightingPerFragment{
   v3Dpos=a.xyz; vnormal=normalize(tnormal.xyz);
   vLightingPar = vec4((((flags/256)*2 != (flags/128)) ? 1.0 : 0.0 ), 0.0, fract(normal.w), floor(normal.w));
$$?}



:stdVertexConditionEnd
  }
:stdVertexFoot
}

:stdVertex3Dmapping
   $$stdVertex3DmappingEye
   $$stdVertex3DmappingBase

:SHCVP
$$?this.inFragment{fshcvp$$?}$$?this.inVertex{shcvp$$?}

:stdShadow3Dmapping
//:   Shadow Mapping Matrix (transposed)
      mat4 shadowPM = 
          mat4 (      $$SHCVP.p,                                                             0.0,                                  0.0,    0.0,  
                          0.0,                                                            -  $$SHCVP.q,                            0.0,    0.0,
               ((1.0+$$SHCVP.p*($$SHCVP.s-uLightPos.x))/uLightPos.z), ((-1.0+$$SHCVP.q*(uLightPos.y-$$SHCVP.t))/uLightPos.z),      0.0,   -shF/uLightPos.z,
               -$$SHCVP.p*$$SHCVP.s-1.0,                                       $$SHCVP.q*$$SHCVP.t+1.0,                  uLightPos.z/65536.0,    shF);

//:
//:
//:  Normal Vertex Shader starts here
//:
//:
:vertexShaderCode
$$stdVertexUniforms
$$stdAttributes
$$stdVarying

int flags;

$$vertexVar
$$DoRotation

$$stdVertexHead 
   $$stdVertexCondition
   $$pos
   $$stdVertexMotionAnimation
   $$stdVertex3Dmapping
   $$stdVertexTexmix 
   $$stdVertexLighting
$$stdVertexConditionEnd
$$stdVertexFoot



//:
//:
//: Shadow Vertex Shader Starts Here
//:
//:
:shadowVertexShaderCode
$$stdVertexUniforms
$$stdAttributes
$$stdVarying

int flags;

$$vertexVar
$$DoRotation

$$stdVertexHead 
$$stdVertexCondition
   $$pos
    if ((flags/512)*2 != (flags/256)) {   //: flag 256 suppresses shadow of element
        gl_Position = vec4(0.0,0.0,0.0,1.0);
    } else {
   $$stdVertexMotionAnimation
   const float shF=1.0;
   $$stdShadow3Dmapping
   gl_Position=shadowPM*a;
   v3Dpos=a.xyz; vnormal=normalize(tnormal.xyz);
   $$stdVertexTexmix 
    //: for the shadow map shader it is sufficient to calculate the alpha values, so the 
    //: following code is the part of stdVertexLighting code calculating the alpha
    //: values and vmix which the frament shader needs to calculate alpha values
    if ((flags/32)*2 != (flags/16)) {
       vec4 m = texmix;
       vmix   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);
       float c0a =  mod(color.t,256.0) *(1.0/255.0);
       float c1a =  mod(color.q,256.0) *(1.0/255.0);
       vAmbColor = vec4(0.0,0.0,0.0,mix(c0a,c1a,t));
    } else {
       vAmbColor = vec4(0.0,0.0,0.0,0.0);
       vmix   = vec2(1.0,0.0);
    }
$$stdVertexConditionEnd
    }
$$stdVertexFoot




//:
//:
//: Standard Fragment Shader
//:
//:

:framentDefs
#define TS(S) ((S)*(1.0/$$TEXTURECANVASWIDTH))
#define TT(T) ((T)*(1.0/$$TEXTURECANVASHEIGHT))


:fragmentShaderCode
precision mediump float;

$$stdFragmentUniforms

$$framentDefs
$$ifragDef
$$fragDef


$$stdVarying



void main()
{
   vec4 c, d, e;
   float s=vtexpos.s; float t=vtexpos.t;

   $$ifragVar
   $$fragVar
   $$fragPos

   c  = texture2D(uTexture,  vec2(s, t));

  $$?this.sp.showShadow{
      const float shF=2.0;
      $$stdShadow3Dmapping
      vec4 sp4=shadowPM * vec4(v3Dpos,1.0);
      vec3 sp=(sp4.xyz/sp4.w) + vec3(0.5,0.5,0.5); 


   vec4 sm  = texture2D(uShadowMap,  sp.xy);
//:   bool  hasShadow = sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0));
   float hasShadow = (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;
#if 1
   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,1.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,-1.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,0.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,0.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,1.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,1.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,-1.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,-1.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;


   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,5.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,-5.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,0.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,0.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,5.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,5.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,-5.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,-5.0/2048.0));
   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;
#endif

   hasShadow *= uShadowFactor;


//:   sm=vec4(0.0,0.0,0.0,1.0);					
//:   bool hasShadow = vShadowPos.z > 0.4845;
//:   bool hasShadow = sm.r >  0.4862;
//:   vec4 sm  = texture2D(uShadowMap,  vec2((gl_FragCoord.x+1.0)*0.01, (gl_FragCoord.y+1.0)*0.01));
//:   vec4 sm  = vec4 ((gl_FragCoord.x+1.0)*0.001, (gl_FragCoord.y+1.0)*0.001, 0.0, 1.0);
//:   vec4 sm  = texture2D(uShadowMap,  vec2(s, 1.0-t));
//:     if (s<0.1) sm=vec4(1.0,0.0,0.0,1.0);
//:     if (t<0.1) sm=vec4(0.0,1.0,0.0,1.0);
  $$?}

  $$?this.sp.mixtex{				
   d = texture2D(uTexture2, vtexpos);
   float da = vmix.t; float ca = vmix.s;
   $$mix
   float dam=d.a*da; float cam=c.a*ca;
   e = vec4 (c.rgb * ca * (1.0-dam) + d.rgb*da, 1.0-(1.0-dam)*(1.0-cam)); 
  $$?}

  $$?!this.sp.mixtex{
   float ca = vmix.s;
   $$mix
   float cam=c.a*ca; float dam=0.0;
   e = vec4 (c.rgb * ca,  cam);
  $$?}

   //: if !colormode
   //:    vec4(vAmbColor) is the background color
   //:    vDiffColor.x    ambientLightFactor
   //:    vDiffColor.y    diffuseLightFactor
   //:    vDiffColor.z    unused
   //:    vDiffColor.w    0  (flag for colormode)
   //: if colormode
   //:    vAmbColor.xyz   ambient Color
   //:    vDiffColor.xyz  diffuse Color
   //:    vAmbColor.w     background color is (1,1,1,1)*vAmbColor.z
   //:    vDiffColor.w    1  (flag for colormode)

  $$?this.sp.lightingPerFragment{
     bool  colormode= vDiffColor.w!=0.0; 
   vec4  bgcolor  = colormode ? vec4(1.0,1.0,1.0,1.0)*vAmbColor.w : vAmbColor;
  $$?}
  $$?!this.sp.lightingPerFragment{
   vec4  bgcolor  = vAmbColor;
  $$?}

   float a =  1.0  -(1.0-bgcolor.a)*(1.0-e.a);
   vec3 col = e.rgb + bgcolor.rgb * ((1.0-dam)*(1.0-cam));  
   $$color

   if (a<0.01) discard;

  $$?this.sp.lightingPerFragment{
   vec3 lightDir = normalize(uLightPos.xyz - v3Dpos);
   vec3 normal;
  $$?this.sp.frontfacing{
   if (gl_FrontFacing) normal=vnormal; else normal=-vnormal;
  $$?}
  $$?!this.sp.frontfacing{
   normal=vnormal;					
  $$?}
  normal=normalize(normal);
   
  vec3 Light =  (colormode ? vDiffColor.rgb : uLightingColor * vDiffColor.y) *
  	          pow ( ( clamp( ( $$?!this.sp.frontfacing{abs$$?}(dot(normal, lightDir ))), 0.0, 1.0)), uLightPos.w);

  vec3 eye = vec3 ($$EYEX, $$EYEY, $$EYEZ);
  Light +=  uLightingColor * vLightingPar.z * pow ( clamp ( dot ( reflect (-lightDir, normal), normalize(eye - v3Dpos) ), 0.0, 1.0), vLightingPar.w) ; 


  col *= ( Light   $$?this.sp.showShadow{ * (1.0-hasShadow) $$?} + (colormode ? vAmbColor.rgb : uLightingAmbientColor * vDiffColor.x));
  $$?}
  $$?this.sp.lightingPerVertex{  
   col *= Light;  
  $$?}


  $$?this.sp.lightingPerFragment{
   if (vLightingPar.x>0.0) {
      col=vec3(0.0,0.0,0.0);
      a =  $$?this.sp.showShadow{hasShadow*(Light.r+Light.g+Light.b)/3.0+$$?}0.0;
   }
  $$?}

   $$finalcolor
  $$?this.sp.showShadow{
  $$?}  
      gl_FragColor = vec4(col,a);
}




//:
//:
//:  Shadow map Fragment Shader
//:
//:
:shadowFragmentShaderCode
precision mediump float;

$$stdUniformsBg $$stdUniformsEnd
$$framentDefs
$$ifragDef
$$fragDef

$$stdVarying

void main()
{
   vec4 c, d, e;
   float s=vtexpos.s; float t=vtexpos.t;

   $$ifragVar
   $$fragVar
   $$fragPos

   c  = texture2D(uTexture,  vec2(s, t));
  $$?this.sp.mixtex{				
   d = texture2D(uTexture2, vtexpos);
   float da = vmix.t; float ca = vmix.s;
   $$mix
   float dam=d.a*da; float cam=c.a*ca;
   float ea = 1.0-(1.0-dam)*(1.0-cam); 
  $$?}
  $$?!this.sp.mixtex{
   float ca = vmix.s;
   $$mix
   float cam=c.a*ca; float dam=0.0;
   float ea = cam;
  $$?}
   float bgcolora = vAmbColor.a; 
   float a =  1.0  -(1.0-bgcolora)*(1.0-ea);
   $$color
   if (a<0.01) discard;


   gl_FragColor = floor ( fract( gl_FragCoord.z*vec4(1.0,256.0,65536.0,256.0*65536.0) ) * 256.0 ) * (1.0/255.0);

}



</script>
*/
{x.dummy='\n'+
'\n'+
'//-----\n'+
'';}; x.stdUniformsBg=function(){return '//+++++ stdUniformsBg                     \n'+
'//=====   Uniforms used by almost all Shaders\n'+
'uniform   sampler2D uTexture;     //: first and \n'+
'uniform   sampler2D uTexture2;    //: second texture canvas\n'+
'//-----\n'+
'';}; x.stdUniformsEnd=function(){return '//+++++ stdUniformsEnd \n'+
'//=====   Generated Uniforms\n'+
''+this.ins(this.genUniforms)+'\n'+
'//=====   Generated Constants\n'+
''+this.ins(this.genConsts)+'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVertexUniforms=function(){return '//+++++ stdVertexUniforms                 \n'+
'//=====   Uniforms used by almost all vertex Shaders\n'+
''+this.ins(this.stdUniformsBg)+'\n'+
'uniform   float uTime;            //: time in seconds since start of the animation\n'+
''+((!this.inShadow)?(' \n'+
'uniform   vec4   cvp;             //: (p,q) size of the animation canvas p=2/w q=2/h\n'+
'                                  //: (s,t) position of the animation canvas\n'+
''):'')+'\n'+
''+((this.inShadow)?(' \n'+
'uniform   highp vec4   shcvp;     //: (p,q) size of the animation canvas p=2/w q=2/h\n'+
'                                  //: (s,t) position of the animation canvas\n'+
''):'')+'\n'+
''+((this.sp.useTM)?('\n'+
''):'')+'\n'+
''+this.ins(this.stdUniformsEnd)+' \n'+
'\n'+
'//-----\n'+
'';}; x.stdFragmentUniforms=function(){return '//+++++ stdFragmentUniforms \n'+
''+this.ins(this.stdUniformsBg)+'\n'+
''+((this.inShadow||this.sp.showShadow)?(' \n'+
'uniform   mediump vec4  fshcvp;    //: (p,q) size of the animation canvas p=2/w q=2/h\n'+
'                                   //: (s,t) position of the animation canvas\n'+
'                                   //: this is identical to the shcvp except for the precision mediump\n'+
''):'')+'\n'+
''+((this.sp.showShadow)?('\n'+
'uniform   sampler2D uShadowMap;    //: second texture canvas\n'+
''):'')+'\n'+
''+this.ins(this.stdUniformsEnd)+' \n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdAttributes=function(){return '//+++++ stdAttributes \n'+
'//=====  Attributes used by standard vertex shader \n'+
'//:   flags:\n'+
'//:      1     showBefore\n'+
'//:      2     showAfter\n'+
'//:      8     useTM\n'+
'//:     16     color or texmix are set\n'+
'//:     32  0  color animation mode backgroundcolor changes from c0 to c1,\n'+
'//:            ambient and diffuse factors are given in uLightingPar.xy\n'+
'//:     32  1\n'+
'//:      64 0  c1.r and c1.g give ambient and diffuse factors\n'+
'//:            c0 is background color with alpha value mix(c0.w,c1.w,t)\n'+
'//:      64 1  c1 diffuse color c0 ambient color background color is white * mix(c0.w,c1.w,t)\n'+
'//:     128    show shadows on triangle\n'+
'//:     256    suppress casting a shadow\n'+
'\n'+
'attribute vec4 pos;       //: 1 available: flags\n'+
'attribute vec4 origin;    //: 1 available: basetime\n'+
'attribute vec4 texpos;    //: 2 available: st starting and pq final texture coordinates\n'+
'attribute vec4 rotP;      //: 1 available: from Rotation\n'+
'attribute vec4 accel;     //: 1 available: duration\n'+
'attribute vec4 rotA;      //: 1 available: to Rotation\n'+
'attribute vec4 color;     //: c0=(s,t) first and c1=(p,q) second color\n'+
'attribute vec4 texmix;    //: factors mixing textures and animation\n'+
'attribute vec4 normal;    //: 1 available: ligthting parameters interger part: shininess, fractional part: \n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVarying=function(){return '//+++++ stdVarying \n'+
'//=====  Varyings used by almost all Shaders\n'+
'varying   vec2 vtexpos;   //: texture position\n'+
'varying   vec4 vAmbColor; //: ambient color\n'+
'varying   vec4 vDiffColor;//: diffuse color \n'+
'varying   vec2 vmix;      //: factors mixing both textures\n'+
'varying   vec4 times;     //: passing on timing information for user shaders\n'+
'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'varying   vec3 vLight;    //: vertex lighting\n'+
''):'')+'\n'+
'\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'varying vec3 vnormal;     //: normal vector\n'+
'varying vec3 v3Dpos;      //: 3D position of fragment\n'+
'varying vec4 vLightingPar;//: Lighting parameters\n'+
''):'')+'\n'+
'\n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.DoRotation=function(){return '//+++++ DoRotation \n'+
'//: H E L P E R    F U N C T I O N S\n'+
'\n'+
'vec3 tnormal;\n'+
'\n'+
'vec4 \n'+
'DoRotation (vec4 p, float t)\n'+
'//: rotate vector p and normal vector tnormal according to rotP and rotA\n'+
'//: t denotes the point in time within the animation step scaled to 0..1\n'+
'{\n'+
'   float from = rotP.w;\n'+
'   float to   = rotA.w; \n'+
'   float b    = mix (from,to,t); \n'+
'\n'+
'   vec3  q = vec3(p) - vec3(rotP);\n'+
'   float c = cos(b); float mc= (1.0-c);\n'+
'   float s = sin(b);\n'+
'\n'+
'   mat3 Mrot = mat3 (c+rotA.x*rotA.x*mc,            rotA.x*rotA.y*mc-rotA.z*s,    rotA.x*rotA.z*mc+rotA.y*s,\n'+
'                     rotA.x*rotA.y*mc+rotA.z*s,     c+rotA.y*rotA.y*mc,           rotA.y*rotA.z*mc-rotA.x*s,\n'+
'                     rotA.z*rotA.x*mc-rotA.y*s,     rotA.z*rotA.y*mc+rotA.x*s,    c+rotA.z*rotA.z*mc);\n'+
'\n'+
'\n'+
'\n'+
'   q = Mrot * q;\n'+
'   tnormal = Mrot * tnormal;\n'+
'\n'+
'   q=q+vec3(rotP);    return vec4( q.x, q.y, q.z, p.w);\n'+
'}\n'+
'\n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVertexHead=function(){return '//+++++ stdVertexHead \n'+
'//: \n'+
'//: S T D    V E R T E X   S H A D E R\n'+
'//: \n'+
'\n'+
'//:  Standard Vertex Shader Main\n'+
'void main()\n'+
'{\n'+
'    vec4 a = vec4 (vec3(pos),1.0);  \n'+
'    flags = int(pos.w);\n'+
'    float basetime = times.s= origin.w;\n'+
'    float duration = times.t= accel.w;\n'+
'    mat4 pm;\n'+
'\n'+
'//:  Time transformation\n'+
'    float rt = times.p = (uTime-basetime)/duration;\n'+
'    float t  = times.q = clamp(rt,0.0,1.0);\n'+
'    tnormal = normal.xyz;\n'+
'//-----\n'+
'';}; x.stdVertexCondition=function(){return '//+++++ stdVertexCondition    \n'+
'  if (  (((flags/2)*2 == flags) && (rt<0.0)) || (((flags/4)*4 == (flags/2)*2)) && (rt>1.0)) {\n'+
'        gl_Position = vec4(0.0,0.0,0.0,1.0);\n'+
'  } else {\n'+
'//-----\n'+
'';}; x.stdVertexMotionAnimation=function(){return '//+++++ stdVertexMotionAnimation \n'+
'//:  Possibly do a rotation animation\n'+
'    if (rotA.w!=0.0) {\n'+
'       vec4 ra = DoRotation (a,t);\n'+
'       a = vec4 ((mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel)-vec3(a)+vec3(ra)),1.0);   //: accelerated motion using builtin function mix\n'+
'    } else {\n'+
'\n'+
'       a = vec4 (mix (vec3(origin),vec3(a),t)+0.5*t*(t-1.0)*vec3(accel),1.0);       }\n'+
''+((this.sp.useTM)?('\n'+
'    if ((flags/16)*16 != (flags/8)*8) {\n'+
'      a=uTM*a;\n'+
'      tnormal = uTM_1T * tnormal;\n'+
'    }\n'+
''):'')+'\n'+
'//-----\n'+
'';}; x.stdVertex3DmappingEye=function(){return '//+++++ stdVertex3DmappingEye \n'+
'//:  3d -> 2d mapping\n'+
'    const float ex='+this.ins(this.EYEX)+';     const float ey='+this.ins(this.EYEY)+';     const float ez='+this.ins(this.EYEZ)+';\n'+
'//-----\n'+
'';}; x.stdVertex3DmappingBase=function(){return '//+++++ stdVertex3DmappingBase \n'+
'\n'+
'\n'+
'\n'+
'\n'+
'\n'+
'    pm = mat4   (    cvp.p,                            0.0,                            0.0,    0.0,  \n'+
'                             0.0,                       -  cvp.q,                            0.0,    0.0,\n'+
'                        ((1.0+cvp.p*(cvp.s-ex))/ez),   ((-1.0+cvp.q*(ey-cvp.t))/ez),          0.0,   -1.0/ez,\n'+
'                         -cvp.p*cvp.s-1.0,              cvp.q*cvp.t+1.0,              ez/65536.0,    1.0);\n'+
'                     \n'+
'    vec4 pos; \n'+
'    pos = pm*a;\n'+
'\n'+
'    gl_Position = pos;\n'+
'//-----\n'+
'';}; x.stdVertexTexmix=function(){return '//+++++ stdVertexTexmix     \n'+
'    vtexpos=mix (texpos.st,texpos.pq,t);\n'+
'    vtexpos=vec2(vtexpos.s/'+this.ins(this.TEXTURECANVASWIDTH)+',vtexpos.t/'+this.ins(this.TEXTURECANVASHEIGHT)+');\n'+
'//-----\n'+
'';}; x.stdVertexLighting=function(){return '//+++++ stdVertexLighting \n'+
'    if ((flags/32)*2 != (flags/16)) {\n'+
'       vec4 c0 = vec4( mod(color.s,256.0)/255.0 , (floor(color.s*(1.0/256.0))+128.0)*(1.0/255.0), \n'+
'                 (floor(color.t*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.t,256.0) *(1.0/255.0));\n'+
'       vec4 c1 = vec4( mod(color.p,256.0)/255.0 , (floor(color.p*(1.0/256.0))+128.0)*(1.0/255.0), \n'+
'                 (floor(color.q*(1.0/256.0))+128.0)*(1.0/255.0), mod(color.q,256.0) *(1.0/255.0));\n'+
'\n'+
'\n'+
'       vec4 m = texmix;\n'+
'       if ((flags/64)*2 != (flags/32)) {\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'          if ((flags/128)*2 != (flags/64)) { //: background color and factors given\n'+
'             vDiffColor = vec4(c1.r,c1.g,0.0,0.0);\n'+
'               vAmbColor  = vec4(c0.rgb, 1.0) * mix(c0.w,c1.w,t);\n'+
'          } else { //: ambient and diffuse color given\n'+
'             vDiffColor = vec4(c1.rgb,1.0);\n'+
'             vAmbColor  = vec4(c0.rgb, mix(c0.w,c1.w,t));\n'+
'          }\n'+
''):'')+'\n'+
'       } else { //: Color Animation Mode\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'          vDiffColor = vec4 (uLightingPar.x, uLightingPar.y, 0.0, 0.0);\n'+
''):'')+'\n'+
'          vAmbColor  = mix (c0,c1,t);\n'+
'       }\n'+
'       vmix   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);\n'+
'    } else {\n'+
'       vAmbColor = vec4(0.0,0.0,0.0,0.0);\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'       vDiffColor = vec4(uLightingPar.x, uLightingPar.y,0.0,0.0);\n'+
''):'')+'\n'+
'       vmix   = vec2(1.0,0.0);\n'+
'    }\n'+
'\n'+
''+((this.sp.lightingPerVertex)?('\n'+
'  vec3 lightPos = vec3 (0.0,2000.0,-8000.0);\n'+
'  vec3 lightDir = normalize(lightPos - a.xyz);\n'+
'  vLight = vec3 (.5,.5,.5) +  vec3 (.5,.5,.5) * ( clamp(   (dot(normalize(tnormal.xyz), lightDir )), 0.0, 1.0));\n'+
''):'')+'\n'+
'\n'+
''+((this.sp.lightingPerFragment)?('\n'+
'   v3Dpos=a.xyz; vnormal=normalize(tnormal.xyz);\n'+
'   vLightingPar = vec4((((flags/256)*2 != (flags/128)) ? 1.0 : 0.0 ), 0.0, fract(normal.w), floor(normal.w));\n'+
''):'')+'\n'+
'\n'+
'\n'+
'//-----\n'+
'';}; x.stdVertexConditionEnd=function(){return '//+++++ stdVertexConditionEnd \n'+
'  }//-----\n'+
'';}; x.stdVertexFoot=function(){return '//+++++ stdVertexFoot \n'+
'}\n'+
'//-----\n'+
'';}; x.stdVertex3Dmapping=function(){return '//+++++ stdVertex3Dmapping \n'+
'   '+this.ins(this.stdVertex3DmappingEye)+'\n'+
'   '+this.ins(this.stdVertex3DmappingBase)+'\n'+
'//-----\n'+
'';}; x.SHCVP=function(){return '//+++++ SHCVP \n'+
''+((this.inFragment)?('fshcvp'):'')+''+((this.inVertex)?('shcvp'):'')+'\n'+
'//-----\n'+
'';}; x.stdShadow3Dmapping=function(){return '//+++++ stdShadow3Dmapping \n'+
'//:   Shadow Mapping Matrix (transposed)\n'+
'      mat4 shadowPM = \n'+
'          mat4 (      '+this.ins(this.SHCVP)+'.p,                                                             0.0,                                  0.0,    0.0,  \n'+
'                          0.0,                                                            -  '+this.ins(this.SHCVP)+'.q,                            0.0,    0.0,\n'+
'               ((1.0+'+this.ins(this.SHCVP)+'.p*('+this.ins(this.SHCVP)+'.s-uLightPos.x))/uLightPos.z), ((-1.0+'+this.ins(this.SHCVP)+'.q*(uLightPos.y-'+this.ins(this.SHCVP)+'.t))/uLightPos.z),      0.0,   -shF/uLightPos.z,\n'+
'               -'+this.ins(this.SHCVP)+'.p*'+this.ins(this.SHCVP)+'.s-1.0,                                       '+this.ins(this.SHCVP)+'.q*'+this.ins(this.SHCVP)+'.t+1.0,                  uLightPos.z/65536.0,    shF);\n'+
'\n'+
'//:\n'+
'//:\n'+
'//:  Normal Vertex Shader starts here\n'+
'//:\n'+
'//://-----\n'+
'';}; x.vertexShaderCode=function(){return '//+++++ vertexShaderCode \n'+
''+this.ins(this.stdVertexUniforms)+'\n'+
''+this.ins(this.stdAttributes)+'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'int flags;\n'+
'\n'+
''+this.ins(this.vertexVar)+'\n'+
''+this.ins(this.DoRotation)+'\n'+
'\n'+
''+this.ins(this.stdVertexHead)+' \n'+
'   '+this.ins(this.stdVertexCondition)+'\n'+
'   '+this.ins(this.pos)+'\n'+
'   '+this.ins(this.stdVertexMotionAnimation)+'\n'+
'   '+this.ins(this.stdVertex3Dmapping)+'\n'+
'   '+this.ins(this.stdVertexTexmix)+' \n'+
'   '+this.ins(this.stdVertexLighting)+'\n'+
''+this.ins(this.stdVertexConditionEnd)+'\n'+
''+this.ins(this.stdVertexFoot)+'\n'+
'\n'+
'\n'+
'\n'+
'//:\n'+
'//:\n'+
'//: Shadow Vertex Shader Starts Here\n'+
'//:\n'+
'//://-----\n'+
'';}; x.shadowVertexShaderCode=function(){return '//+++++ shadowVertexShaderCode \n'+
''+this.ins(this.stdVertexUniforms)+'\n'+
''+this.ins(this.stdAttributes)+'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'int flags;\n'+
'\n'+
''+this.ins(this.vertexVar)+'\n'+
''+this.ins(this.DoRotation)+'\n'+
'\n'+
''+this.ins(this.stdVertexHead)+' \n'+
''+this.ins(this.stdVertexCondition)+'\n'+
'   '+this.ins(this.pos)+'\n'+
'    if ((flags/512)*2 != (flags/256)) {   //: flag 256 suppresses shadow of element\n'+
'        gl_Position = vec4(0.0,0.0,0.0,1.0);\n'+
'    } else {\n'+
'   '+this.ins(this.stdVertexMotionAnimation)+'\n'+
'   const float shF=1.0;\n'+
'   '+this.ins(this.stdShadow3Dmapping)+'\n'+
'   gl_Position=shadowPM*a;\n'+
'   v3Dpos=a.xyz; vnormal=normalize(tnormal.xyz);\n'+
'   '+this.ins(this.stdVertexTexmix)+' \n'+
'    //: for the shadow map shader it is sufficient to calculate the alpha values, so the \n'+
'    //: following code is the part of stdVertexLighting code calculating the alpha\n'+
'    //: values and vmix which the frament shader needs to calculate alpha values\n'+
'    if ((flags/32)*2 != (flags/16)) {\n'+
'       vec4 m = texmix;\n'+
'       vmix   = clamp (mix (m.st,m.pq,t), 0.0, 1.0);\n'+
'       float c0a =  mod(color.t,256.0) *(1.0/255.0);\n'+
'       float c1a =  mod(color.q,256.0) *(1.0/255.0);\n'+
'       vAmbColor = vec4(0.0,0.0,0.0,mix(c0a,c1a,t));\n'+
'    } else {\n'+
'       vAmbColor = vec4(0.0,0.0,0.0,0.0);\n'+
'       vmix   = vec2(1.0,0.0);\n'+
'    }\n'+
''+this.ins(this.stdVertexConditionEnd)+'\n'+
'    }\n'+
''+this.ins(this.stdVertexFoot)+'\n'+
'\n'+
'\n'+
'\n'+
'\n'+
'//:\n'+
'//:\n'+
'//: Standard Fragment Shader\n'+
'//:\n'+
'//:\n'+
'//-----\n'+
'';}; x.framentDefs=function(){return '//+++++ framentDefs \n'+
'#define TS(S) ((S)*(1.0/'+this.ins(this.TEXTURECANVASWIDTH)+'))\n'+
'#define TT(T) ((T)*(1.0/'+this.ins(this.TEXTURECANVASHEIGHT)+'))\n'+
'\n'+
'//-----\n'+
'';}; x.fragmentShaderCode=function(){return '//+++++ fragmentShaderCode \n'+
'precision mediump float;\n'+
'\n'+
''+this.ins(this.stdFragmentUniforms)+'\n'+
'\n'+
''+this.ins(this.framentDefs)+'\n'+
''+this.ins(this.ifragDef)+'\n'+
''+this.ins(this.fragDef)+'\n'+
'\n'+
'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'\n'+
'\n'+
'void main()\n'+
'{\n'+
'   vec4 c, d, e;\n'+
'   float s=vtexpos.s; float t=vtexpos.t;\n'+
'\n'+
'   '+this.ins(this.ifragVar)+'\n'+
'   '+this.ins(this.fragVar)+'\n'+
'   '+this.ins(this.fragPos)+'\n'+
'\n'+
'   c  = texture2D(uTexture,  vec2(s, t));\n'+
'\n'+
'  '+((this.sp.showShadow)?('\n'+
'      const float shF=2.0;\n'+
'      '+this.ins(this.stdShadow3Dmapping)+'\n'+
'      vec4 sp4=shadowPM * vec4(v3Dpos,1.0);\n'+
'      vec3 sp=(sp4.xyz/sp4.w) + vec3(0.5,0.5,0.5); \n'+
'\n'+
'\n'+
'   vec4 sm  = texture2D(uShadowMap,  sp.xy);\n'+
'//:   bool  hasShadow = sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0));\n'+
'   float hasShadow = (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.2 :0.0;\n'+
'#if 1\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,1.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,-1.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,0.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,0.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,1.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,1.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-1.0/2048.0,-1.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(1.0/2048.0,-1.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'\n'+
'\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,5.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(0.0,-5.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,0.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,0.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,5.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,5.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(5.0/2048.0,-5.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'   sm = texture2D(uShadowMap,  sp.xy + vec2(-5.0/2048.0,-5.0/2048.0));\n'+
'   hasShadow += (sp.z - 0.0001 > dot (sm,vec4(255.0/256.0,255.0/256.0/256.0,255.0/65536.0/256.0,255.0/65536.0/65536.0))) ? 0.05 :0.0;\n'+
'#endif\n'+
'\n'+
'   hasShadow *= uShadowFactor;\n'+
'\n'+
'\n'+
'//:   sm=vec4(0.0,0.0,0.0,1.0);					\n'+
'//:   bool hasShadow = vShadowPos.z > 0.4845;\n'+
'//:   bool hasShadow = sm.r >  0.4862;\n'+
'//:   vec4 sm  = texture2D(uShadowMap,  vec2((gl_FragCoord.x+1.0)*0.01, (gl_FragCoord.y+1.0)*0.01));\n'+
'//:   vec4 sm  = vec4 ((gl_FragCoord.x+1.0)*0.001, (gl_FragCoord.y+1.0)*0.001, 0.0, 1.0);\n'+
'//:   vec4 sm  = texture2D(uShadowMap,  vec2(s, 1.0-t));\n'+
'//:     if (s<0.1) sm=vec4(1.0,0.0,0.0,1.0);\n'+
'//:     if (t<0.1) sm=vec4(0.0,1.0,0.0,1.0);\n'+
'  '):'')+'\n'+
'\n'+
'  '+((this.sp.mixtex)?('				\n'+
'   d = texture2D(uTexture2, vtexpos);\n'+
'   float da = vmix.t; float ca = vmix.s;\n'+
'   '+this.ins(this.mix)+'\n'+
'   float dam=d.a*da; float cam=c.a*ca;\n'+
'   e = vec4 (c.rgb * ca * (1.0-dam) + d.rgb*da, 1.0-(1.0-dam)*(1.0-cam)); \n'+
'  '):'')+'\n'+
'\n'+
'  '+((!this.sp.mixtex)?('\n'+
'   float ca = vmix.s;\n'+
'   '+this.ins(this.mix)+'\n'+
'   float cam=c.a*ca; float dam=0.0;\n'+
'   e = vec4 (c.rgb * ca,  cam);\n'+
'  '):'')+'\n'+
'\n'+
'   //: if !colormode\n'+
'   //:    vec4(vAmbColor) is the background color\n'+
'   //:    vDiffColor.x    ambientLightFactor\n'+
'   //:    vDiffColor.y    diffuseLightFactor\n'+
'   //:    vDiffColor.z    unused\n'+
'   //:    vDiffColor.w    0  (flag for colormode)\n'+
'   //: if colormode\n'+
'   //:    vAmbColor.xyz   ambient Color\n'+
'   //:    vDiffColor.xyz  diffuse Color\n'+
'   //:    vAmbColor.w     background color is (1,1,1,1)*vAmbColor.z\n'+
'   //:    vDiffColor.w    1  (flag for colormode)\n'+
'\n'+
'  '+((this.sp.lightingPerFragment)?('\n'+
'     bool  colormode= vDiffColor.w!=0.0; \n'+
'   vec4  bgcolor  = colormode ? vec4(1.0,1.0,1.0,1.0)*vAmbColor.w : vAmbColor;\n'+
'  '):'')+'\n'+
'  '+((!this.sp.lightingPerFragment)?('\n'+
'   vec4  bgcolor  = vAmbColor;\n'+
'  '):'')+'\n'+
'\n'+
'   float a =  1.0  -(1.0-bgcolor.a)*(1.0-e.a);\n'+
'   vec3 col = e.rgb + bgcolor.rgb * ((1.0-dam)*(1.0-cam));  \n'+
'   '+this.ins(this.color)+'\n'+
'\n'+
'   if (a<0.01) discard;\n'+
'\n'+
'  '+((this.sp.lightingPerFragment)?('\n'+
'   vec3 lightDir = normalize(uLightPos.xyz - v3Dpos);\n'+
'   vec3 normal;\n'+
'  '+((this.sp.frontfacing)?('\n'+
'   if (gl_FrontFacing) normal=vnormal; else normal=-vnormal;\n'+
'  '):'')+'\n'+
'  '+((!this.sp.frontfacing)?('\n'+
'   normal=vnormal;					\n'+
'  '):'')+'\n'+
'  normal=normalize(normal);\n'+
'   \n'+
'  vec3 Light =  (colormode ? vDiffColor.rgb : uLightingColor * vDiffColor.y) *\n'+
'  	          pow ( ( clamp( ( '+((!this.sp.frontfacing)?('abs'):'')+'(dot(normal, lightDir ))), 0.0, 1.0)), uLightPos.w);\n'+
'\n'+
'  vec3 eye = vec3 ('+this.ins(this.EYEX)+', '+this.ins(this.EYEY)+', '+this.ins(this.EYEZ)+');\n'+
'  Light +=  uLightingColor * vLightingPar.z * pow ( clamp ( dot ( reflect (-lightDir, normal), normalize(eye - v3Dpos) ), 0.0, 1.0), vLightingPar.w) ; \n'+
'\n'+
'\n'+
'  col *= ( Light   '+((this.sp.showShadow)?(' * (1.0-hasShadow) '):'')+' + (colormode ? vAmbColor.rgb : uLightingAmbientColor * vDiffColor.x));\n'+
'  '):'')+'\n'+
'  '+((this.sp.lightingPerVertex)?('  \n'+
'   col *= Light;  \n'+
'  '):'')+'\n'+
'\n'+
'\n'+
'  '+((this.sp.lightingPerFragment)?('\n'+
'   if (vLightingPar.x>0.0) {\n'+
'      col=vec3(0.0,0.0,0.0);\n'+
'      a =  '+((this.sp.showShadow)?('hasShadow*(Light.r+Light.g+Light.b)/3.0+'):'')+'0.0;\n'+
'   }\n'+
'  '):'')+'\n'+
'\n'+
'   '+this.ins(this.finalcolor)+'\n'+
'  '+((this.sp.showShadow)?('\n'+
'  '):'')+'  \n'+
'      gl_FragColor = vec4(col,a);\n'+
'}\n'+
'\n'+
'\n'+
'\n'+
'\n'+
'//:\n'+
'//:\n'+
'//:  Shadow map Fragment Shader\n'+
'//:\n'+
'//://-----\n'+
'';}; x.shadowFragmentShaderCode=function(){return '//+++++ shadowFragmentShaderCode \n'+
'precision mediump float;\n'+
'\n'+
''+this.ins(this.stdUniformsBg)+' '+this.ins(this.stdUniformsEnd)+'\n'+
''+this.ins(this.framentDefs)+'\n'+
''+this.ins(this.ifragDef)+'\n'+
''+this.ins(this.fragDef)+'\n'+
'\n'+
''+this.ins(this.stdVarying)+'\n'+
'\n'+
'void main()\n'+
'{\n'+
'   vec4 c, d, e;\n'+
'   float s=vtexpos.s; float t=vtexpos.t;\n'+
'\n'+
'   '+this.ins(this.ifragVar)+'\n'+
'   '+this.ins(this.fragVar)+'\n'+
'   '+this.ins(this.fragPos)+'\n'+
'\n'+
'   c  = texture2D(uTexture,  vec2(s, t));\n'+
'  '+((this.sp.mixtex)?('				\n'+
'   d = texture2D(uTexture2, vtexpos);\n'+
'   float da = vmix.t; float ca = vmix.s;\n'+
'   '+this.ins(this.mix)+'\n'+
'   float dam=d.a*da; float cam=c.a*ca;\n'+
'   float ea = 1.0-(1.0-dam)*(1.0-cam); \n'+
'  '):'')+'\n'+
'  '+((!this.sp.mixtex)?('\n'+
'   float ca = vmix.s;\n'+
'   '+this.ins(this.mix)+'\n'+
'   float cam=c.a*ca; float dam=0.0;\n'+
'   float ea = cam;\n'+
'  '):'')+'\n'+
'   float bgcolora = vAmbColor.a; \n'+
'   float a =  1.0  -(1.0-bgcolora)*(1.0-ea);\n'+
'   '+this.ins(this.color)+'\n'+
'   if (a<0.01) discard;\n'+
'\n'+
'\n'+
'   gl_FragColor = floor ( fract( gl_FragCoord.z*vec4(1.0,256.0,65536.0,256.0*65536.0) ) * 256.0 ) * (1.0/255.0);\n'+
'\n'+
'}\n'+
'\n'+
'\n'+
'\n'+
'';}

// END taccgl_shader

    this.init = function () {
	this.p=null;
	this.ifragDef="";
	this.ifragVar="";
//	this.lighting=false; this.lightingPerFragment=false; this.lightingPerVertex=false;
	this.lighting=true; this.lightingPerFragment=true; this.lightingPerVertex=false;
        this.mixtex=true; this.frontfacing=taccgl_frontfacing;
	if (window.taccgl_TM || window.taccgl_TM==false) this.useTM=window.taccgl_TM;  else this.useTM=true;
	this.consts=new this.empty();
	this.uniforms=new this.empty();
//	this.shadow=  true;  
	this.showShadow = true;
	this.castShadow = true;
    }
    this.empty = function () {};

    this.setLighting = function (ena, perVertex){
	if (ena) {
	    this.lighting=true;
	    if (perVertex) { 
		 this.lightingPerFragment=false; this.lightingPerVertex=true;
	    } else {
		 this.lightingPerFragment=true; this.lightingPerVertex=false;
	    }
	} else {
	    this.lighting=false;  this.lightingPerFragment=false; this.lightingPerVertex=false;
	    this.showShadow=false;
	}
    }

    this.initShader = function (){
	if (!taccgl.dddmode) return;
        var x = this;if(x){} // artificially use x to avoid tools the cannot handle eval complaining about unused x
	var s=this.prepShader(this.getShader('taccgl_Shaders'));
//	taccgl.clog(s);
	eval(s);
    }
    this.extendShader = function (n){
	if (!taccgl.dddmode) return;
	if (n=='taccgl_Shaders') return;
        var x = this;if(x){} // artificially use x to avoid tools the cannot handle eval complaining about unused x
	eval(this.prepShader(this.getShader(n)));
    }
    this.el = function (pre, el) {
	if (!taccgl.dddmode) return this;
        if (typeof (el)=="string") el=document.getElementById(el);
        var par=el, x= el.offsetLeft, y=el.offsetTop;
        while (par.offsetParent) { par=par.offsetParent; x+=par.offsetLeft; y+=par.offsetTop;}

        this.ifragDef += "#define "+pre+"S TS("+x+".0)\n"+
            "#define "+pre+"T TT("+y+".0)\n"+
            "#define "+pre+"W TS("+el.offsetWidth+".0)\n"+
	    "#define "+pre+"H TT("+el.offsetHeight+".0)\n"+
            "#define "+pre+"MS TS("+x+".0+"+el.offsetWidth+".0/2.0)\n"+
            "#define "+pre+"MT TT("+y+".0+"+el.offsetHeight+".0/2.0)\n";
	return this;
    }
    this.times = function () {
	if (!taccgl.dddmode) return this;
//	this.ifragVar+="float basetime = times.s; float duration = times.t; float rt = (uTime-basetime)/duration;  float ct = clamp(rt,0.0,1.0);\n"+
//	    "float mct= 1.0-ct;\n";
	this.ifragVar+="float basetime = times.s; float duration = times.t; float rt = times.p; float ct = times.q;\n"+
	    "float mct= 1.0-ct;\n";
	return this;
    }
    this.fragCoord = function () {
	if (!taccgl.dddmode) return this;
	this.ifragVar+="float fx=gl_FragCoord.x; float fy=gl_FragCoord.y; float fz=gl_FragCoord.z; float fw=gl_FragCoord.w;\n";
	return this;
    }

    this.ins = function (h,a,b,c,d,e,f,g) {
	if (typeof (h) == "function") {this.h=h; var r= this.h(a,b,c,d,e,f,g); this.h=null; return r;}
	else if (typeof (h) == "string") return h;
	else if (typeof (h) == "number") {
	    var s=""+h;
	    if (s.match(/\./)) return s;
	    return s+".0";
	}
	else if (h && typeof (h) == "object") 
	    if (h.length) {
		var x="", i;
		for (i=0;i<h.length;i++) x+=this.ins(h[i],a,b,c,d,e,f,g)
		return x;
	    } else {
		return h.gen(a,b,c,d,e,f,g);
	    }
    }


    this.prepShader = function (s) {
	var t;
	t="{x.dummy='"+s;
	t=t.replace(/\n:([A-Za-z0-9]+)/g,"//-----\n';}; x.$1=function(){return '//+++++ $1 ")
	t=t.replace(/\n/g,"\\n'+\n'")
	t=t.replace(/\$\$([A-Za-z0-9]+)/g,"'+this.ins(this.$1)+'")
	t=t.replace(/\$\$\[/g,"'+")
	t=t.replace(/\$\$\]/g,"+'")
	t=t.replace(/\$\$\?([A-Za-z0-9!|.]+)\{/g,"'+(($1)?('")
	t=t.replace(/\$\$\?\}/g,"'):'')+'")
	t+="';}"; 

	s='/*\n<script id="taccgl_Shaders" type="x-gsgl/x-vertex">'+s+'</script>\n*/\n'
	if (taccgl_showShader)
            document.body.insertAdjacentHTML (
		"afterbegin",
		'<div style="z-index:100000; position:relative"><textarea cols="80" rows="5">'+s+t+'</textarea></div>'
	    )
	return (t);
    }
    this.getShader = function (n) {
	var el = document.getElementById(n), t = " ";
	if (el) {
	    t = el.innerHTML; 
	    if (!t) t=el.text;
	}
	return (t);
    }

    this.TEXTURECANVASWIDTH = function() {return taccgl_texCanWidth+".0";}
    this.TEXTURECANVASHEIGHT = function() {return taccgl_texCanHeight+".0";}
    this.EYEX = function() {return Math.floor(taccgl.eyeX)+".0";}
    this.EYEY = function() {return Math.floor(taccgl.eyeY)+".0";}
    this.EYEZ = function() {return Math.floor(taccgl.eyeZ)+".0";}
    this.fragDef = "/* fragDef */";
    this.fragVar = "/* fragVar */";
    this.fragPos = "/* fragPos */";
    this.mix = "/* mix */";
    this.color = "/* color */";
    this.finalcolor = "/* finalcolor */";
    this.vertexVar = "/* vertexVar */";
    this.pos = "/* pos */";

    this.genUniforms = function () {
	var s="", n;
	for (n in this.uniforms) {
	    var u=this.uniforms[n];
	    s += "uniform ";
	    if (u.d==1) s+=" float "; else if (u.d<=4) s+=" mediump vec"+u.d; else s+=" mediump mat"+(u.d-100);
	    s += " " + u.name + ";\n";
	}
	return s;
    }
    this.genConsts = function () {
	var s="", n;
	for (n in this.consts) {
	    var u=this.consts[n];
	    s += "const  ";
	    if (u.d==1) s+=" float "; else s+=" vec"+u.d;
	    s += " " + u.name + " = ";
	    if (u.d==1) s+=u.jcx; else  {
		s+=" vec"+u.d + "(";
		s+=u.jcx;
		if (u.jcy) s+= ","+u.jcy;
		if (u.jcz) s+= ","+u.jcz;
		if (u.jcw) s+= ","+u.jcw;
		s+=")";
	    }
 	    s += ";\n";
	}
	return s;
    }

    this.shaderPar  = function (sc) {
	this.lighting=sc.lighting; this.lightingPerFragment=sc.lightingPerFragment; this.lightingPerVertex=sc.lightingPerVertex;
        this.mixtex=sc.mixtex; this.frontfacing=sc.frontfacing; this.useTM=sc.useTM;
//	this.consts=new this.empty();
//	this.uniforms=new this.empty();
//	this.shadow=  sc.shadow;  
	this.showShadow = sc.showShadow;
	this.castShadow = sc.castShadow;
	if (taccgl_debug) {
	    this.toString = function () {
		var s="[";
		if (this.lighting) s+="lighting, ";
		if (this.lightingPerFragment) s+="lightingPerFragment, ";
		if (this.lightingPerVertex) s+="lightingPerVertex, ";
		if (this.mixtex) s+="mixtex, ";
		if (this.frontfacing) s+="frontfacing, ";
		if (this.showShadow) s+="showShadow, ";
		if (this.castShadow) s+="castShadow, ";
		return s+"]";
	    }
	}  // taccgl_debug_end
    }

    this.newUniform = function  (name, d, jcx, jcy, jcz, jcw) {
	this.name=name; this.jcx=jcx; this.jcy=jcy; this.jcz=jcz; this.jcw=jcw; this.d=d;
    }
    this.newConst = function  (name, d, jcx, jcy, jcz, jcw) {
	this.name=name; this.jcx=jcx; this.jcy=jcy; this.jcz=jcz; this.jcw=jcw; this.d=d
    }
    this.createUniform = function (name, jcx, jcy, jcz, jcw) {
	var d=1; if (jcy) d=2; if (jcz) d=3; if (jcw) d=4;
	this.uniforms[name] =  new this.newUniform(name, d, jcx, jcy, jcz, jcw);
    }
    this.createUniformMatrix = function (name, d, transpose, m) {
	// d can be 2,3 or 4
	this.uniforms[name] =  new this.newUniform(name, 100+d, transpose, m);
    }
    this.createConst = function (name, jcx, jcy, jcz, jcw) {
	var d=1; if (jcy) d=2; if (jcz) d=3; if (jcw) d=4;
	this.consts[name] =  new this.newConst(name, d, jcx, jcy, jcz, jcw);
    }

    this.setupGen = function () {
	if (this.sp.lighting) {
	    this.createUniform ("uLightingPar", "taccgl.lightAmbient", "taccgl.lightDiffuse", "taccgl.lightSpecular", "taccgl.lightShininess");
	    this.createUniform ("uLightPos", "taccgl.stdLight.x", "taccgl.stdLight.y", "taccgl.stdLight.z", "taccgl.stdLight.focus");
	    if (!this.uniforms.uLightingAmbientColor) this.createConst ("uLightingAmbientColor", "1.0", "1.0", "1.0");
	    if (!this.uniforms.uLightingColor) this.createConst ("uLightingColor", "1.0", "1.0", "1.0");
	    if (!window.taccgl_shadowFactor) taccgl_shadowFactor=0.8;
	    if (!this.uniforms.uShadowFactor) this.createConst ("uShadowFactor", taccgl_shadowFactor.toFixed(5));
	}
	if (this.sp.useTM){
	    this.createUniformMatrix ("uTM", 4, "false", "taccgl.TM");
	    this.createUniformMatrix ("uTM_1T", 3, "false", "taccgl.TM_1T");
	}
    }

    this.trycompile = function (par) {
	taccgl.webglerror=false;
	this.sp= par; // during compilation this.sp contains the current compile parameters
	this.setupGen();
	this.inShadow=false;
	this.inFragment=false; this.inVertex=true; this.vstext=this.vertexShaderCode(); this.inVertex=false;
	this.inFragment=true; this.inVertex=false; this.fstext=this.fragmentShaderCode(); this.inFragment=false;
	this.inShadow=null;
	if (taccgl_showShader) {
            document.body.insertAdjacentHTML (
 		"afterbegin",
		'<textarea cols="80" rows="2" style="z-index:100000; position:relative">'+this.fstext+'</textarea>'
	    )
            document.body.insertAdjacentHTML (
 		"afterbegin",
		'<textarea cols="80" rows="2" style="z-index:100000; position:relative">'+this.vstext+'</textarea>'
	    )
	}

	this.vertexShader = taccgl.createVertexShader(taccgl.replaceShaderVariables(this.vstext));
	if (this.vertexShader==null || taccgl.webglerror) return null;
	this.fragmentShader = taccgl.createFragmentShader(taccgl.replaceShaderVariables(this.fstext));
	if (this.fragmentShader==null || taccgl.webglerror) return null;
	return taccgl.createShaderProgram (this.vertexShader, this.fragmentShader);
    }
    this.compileShadowShader = function () {
	this.shadowP=null; taccgl.webglerror=false;
	this.inShadow=true;
	this.inFragment=false; this.inVertex=true; var vstext=this.shadowVertexShaderCode();this.inVertex=false;
	this.inFragment=true; this.inVertex=false; var fstext=this.shadowFragmentShaderCode(); this.inFragment=false;
	this.inShadow=null;
	// taccgl.clog("Listing Shadow Shaders");
	// taccgl.logNumberedText(vstext);
	// taccgl.logNumberedText(fstext);
	var vs = taccgl.createVertexShader(taccgl.replaceShaderVariables(vstext));
	if (this.vertexShader==null || taccgl.webglerror) return;
	var fs = taccgl.createFragmentShader(taccgl.replaceShaderVariables(fstext));
	this.shadowP = taccgl.createShaderProgram (vs, fs);
    }
    this.newLocs = function (p,shadowmap,genshadowmap) {
	var g = taccgl.g;
	this.uTime =g.getUniformLocation(p,"uTime");
	if (genshadowmap)
	    this.shcvp= g.getUniformLocation(p,"shcvp")
	else
	    this.cvp= g.getUniformLocation(p,"cvp")
	this.uTexture = g.getUniformLocation(p,"uTexture");
	this.uTexture2 = g.getUniformLocation(p,"uTexture2");
	if (shadowmap) {
	    this.uShadowMap = g.getUniformLocation(p,"uShadowMap");
	    this.shcvp = g.getUniformLocation(p,"shcvp");
	    this.fshcvp = g.getUniformLocation(p,"fshcvp");
	}
    }
    this.compileUniforms = function () {
	this.fastLoc=new this.newLocs(this.fastProg, this.fastPar.showShadow, false);
	if (this.advProg)
	    this.advLoc=new this.newLocs(this.advProg, this.advPar.showShadow, false);
	if (this.shadowP) 
	    this.shadowLoc = new this.newLocs(this.shadowP, false, true);
	
	var s="x.passUniforms=function (loc) {var g=taccgl.g;\n", n, u;
        for (n in this.uniforms) {
	    u=this.uniforms[n];
	    if (u.d>100){
	        s += "g.uniformMatrix"+(u.d-100)+"fv(loc."+u.name+","+u.jcx+","+u.jcy+");\n";	
	    } else {
		s += "g.uniform"+u.d+"f(loc."+u.name+","+u.jcx;
		if (u.jcy) s+=","+u.jcy;
		if (u.jcz) s+=","+u.jcz;
		if (u.jcw) s+=","+u.jcw;
		s+=");\n";
	    }
	    this.fastLoc[u.name]= taccgl.g.getUniformLocation(this.fastProg,u.name); 
	    if (this.advProg)
		this.advLoc[u.name]= taccgl.g.getUniformLocation(this.advProg,u.name); 
	}
	s += "};\n";

        if (this.shadowP){
	    s+="x.shadowPassUniforms=function () {var g=taccgl.g;\n";
            for (n in this.uniforms) {
		u=this.uniforms[n];
		if (u.d>100){
	            s += "g.uniformMatrix"+(u.d-100)+"fv(this.shadowLoc."+u.name+","+u.jcx+","+u.jcy+");\n";	
		} else {
		    s += "g.uniform"+u.d+"f(this.shadowLoc."+u.name+","+u.jcx;
		    if (u.jcy) s+=","+u.jcy;
		    if (u.jcz) s+=","+u.jcz;
		    if (u.jcw) s+=","+u.jcw;
		    s+=");\n";
		}
		this.shadowLoc[u.name]= taccgl.g.getUniformLocation(this.shadowP,u.name); 
	    }
	    s += "}";
	}
	var x=this; eval(s); if(x){} // artificially use x to avoid tools that cannot handle eval complaining about unused x
    }
    this.compile = function () {
	if (!taccgl.dddmode) return this;

	/* Create the fastProg with fastPar and possibly the advProg with advPar.
	   The fastProg usually does not show shadows while the advProg does.
	   If either prog does not compile with frontfacing disable and try again.
	   If the fastProg does not compile with lighting, disable it and then shadows 
	   and advProg makes no sense.
	   */

	if (taccgl_debug) {
	    taccgl.tlog("Start compiling shaders");
	}  // taccgl_debug_end
	var fastCompileStart = taccgl.perfnow();

        this.fastPar = new this.shaderPar(this);
	this.fastPar.showShadow=false; 
	this.fastProg = this.trycompile(this.fastPar);
        if (!this.fastProg) {
	    if (taccgl_debug) {
		taccgl.tlog ("Compilation of fastProg failed, now try without frontfacing "+this.fastPar.toString()+"\n\n");
	    }  // taccgl_debug_end
	    this.fastPar.frontfacing=false; this.fastProg=this.trycompile(this.fastPar);
	    if (taccgl_debug) {
		if (!this.fastProg) {
		    taccgl.tlog ("Compilation of fastProg without frontfacing failed, try without lighting "+this.fastPar.toString()+"\n\n");
		}
	    }  // taccgl_debug_end
	}
	if (!this.fastProg && this.fastPar.lighting) {
	    this.fastPar.lighting=false;  this.fastPar.lightingPerFragment=false; this.fastPar.lightingPerVertex=false;
	    this.fastProg = this.trycompile(this.fastPar);
	    if (taccgl_debug) {
		if (!this.fastProg) {
		    taccgl.tlog ("Compilation of fastProg without lighting failed "+this.fastPar.toString()+"\n\n");
		}
	    }  // taccgl_debug_end
	}
	if (!this.fastProg || taccgl.webglerror) return;

	var fastCompileTime = taccgl.perfnow()-fastCompileStart;

	if (taccgl_debug) {
	    taccgl.tlog("Start compiling advanced Shaders - fastCompileTime="+fastCompileTime);
	}  // taccgl_debug_end

	var n=navigator.appVersion;
	var aT;
	if (n.match(/Chrome/)) aT=taccgl_advCompileTimeChrome; else aT=taccgl_advCompileTime;

	if (this.showShadow && this.fastPar.lighting && fastCompileTime < aT) {
            this.advPar  = new this.shaderPar(this); 
	    this.advPar.frontfacing = this.fastPar.frontfacing;
  	    this.advProg = this.trycompile(this.advPar);
            if (!this.advProg) {
		if (taccgl_debug) {
		    taccgl.tlog ("Compilation of advProg without frontfacing failed, run without shadows "+this.advPar.toString()+"\n\n");
//		    taccgl.clog ("Compilation of advProg failed, try without frontfacing "+this.advPar.toString()+"\n\n");
		}  // taccgl_debug_end
		taccgl.webglerror=false; /* ignore error, can work without advanced shader */
		/*
		this.advPar.frontfacing=false; this.p = this.trycompile(this.advPar);
		if (taccgl_debug) {
		    if (!this.advProg) {
			taccgl.clog ("Compilation of advProg without frontfacing failed, run without shadows "+this.advPar.toString()+"\n\n");
		    }
		}  // taccgl_debug_end
		*/
	    }
        } else 
	    this.advProg = null;
    
        if (this.castShadow && this.advProg) {
	    this.sp=this.advPar;
	    this.compileShadowShader(); 
//	    if (!this.shadowP) {
//		this.shadow=false; this.advPar.shadow=false;
//		this.p = this.trycompile(this.advPar);
//		if (!this.p || taccgl.webglerror) return;
//	    }
	}
	
	this.compileUniforms();

        if (this.advProg != null) {this.p=this.advProg; this.loc=this.advLoc;} else {this.p=this.fastProg; this.loc=this.fastLoc;}

	this.qp=new Array(4); this.qLoc=new Array(4);
	this.qp[1]=this.fastProg; this.qLoc[1]=this.fastLoc;
	this.qp[2]=this.fastProg; this.qLoc[2]=this.fastLoc;
	this.qp[3]=this.fastProg; this.qLoc[3]=this.fastLoc;
        if (this.advProg != null) {this.qp[3]=this.advProg; this.qLoc[3]=this.advLoc;}
    }
    this.freeCompiled = function () {
	if (!taccgl.dddmode) return this;
	taccgl.g.useProgram (null);
	taccgl.g.detachShader(this.p,this.vertexShader);
	taccgl.g.detachShader(this.p,this.fragmentShader);
	taccgl.g.deleteProgram(this.p);
    }
}
function taccglShaderConfigEmpty () {
    this.init();
}
// taccglShaderConfigEmpty.prototype=new taccglShaderConfigPrototype ();




/* Multiples */
function taccglMultiPrototype () { 
    this.start = function (a,b,c,d,e,f) { 
	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var o = (this.ar[i]);
	    o.start(a,b,c,d,e,f);
	} 
	return this;
    }
    this.stop = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.stop(a,b,c,d,e,f);}; return this;}
    this.hide = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.hide(a,b,c,d,e,f);}; return this;}
    this.cposClientRects = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.cposClientRects(a,b,c,d,e,f);}; return this;}
    this.cposTransform = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.cposTransform(a,b,c,d,e,f);}; return this;}
    this.opacity = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacity(a,b,c,d,e,f);}; return this;}
    this.textureDraw = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.textureDraw(a,b,c,d,e,f);}; return this;}
    this.paint = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.paint(a,b,c,d,e,f);}; return this;}
    this.texClear = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.texClear(a,b,c,d,e,f);}; return this;}
    this.rotate = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotate(a,b,c,d,e,f);}; return this;}
    this.rotateMiddle = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotateMiddle(a,b,c,d,e,f);}; return this;}
    this.rotatePart = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.rotatePart(a,b,c,d,e,f);}; return this;}
    this.foreground = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.foreground(a,b,c,d,e,f);}; return this;}
    this.visatend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.visatend(a,b,c,d,e,f);}; return this;}
    this.visAtEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.visAtEnd(a,b,c,d,e,f);}; return this;}
    this.opacityatend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacityatend(a,b,c,d,e,f);}; return this;}
    this.opacityAtEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacityAtEnd(a,b,c,d,e,f);}; return this;}
    this.showafter= function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showafter(a,b,c,d,e,f);}; return this;}
    this.showbefore = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showbefore(a,b,c,d,e,f);}; return this;}
    this.showAfter= function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showAfter(a,b,c,d,e,f);}; return this;}
    this.showBefore = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.showBefore(a,b,c,d,e,f);}; return this;}
    this.visFinal = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.visFinal(a,b,c,d,e,f);}; return this;}
    this.opacityFinal = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.opacityFinal(a,b,c,d,e,f);}; return this;}
    this.posZ = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.posZ(a,b,c,d,e,f);}; return this;}
    this.resizeZ = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.resizeZ(a,b,c,d,e,f);}; return this;}
    this.flyIn = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.flyIn(a,b,c,d,e,f);}; return this;}
    this.flyOut = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.flyOut(a,b,c,d,e,f);}; return this;}
    this.position = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.position(a,b,c,d,e,f);}; return this;}
    this.depth = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.depth(a,b,c,d,e,f);}; return this;}
    this.resize = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.resize(a,b,c,d,e,f);}; return this;}
    this.starttime = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.starttime(a,b,c,d,e,f);}; return this;}
    this.startTime = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.startTime(a,b,c,d,e,f);}; return this;}
    this.duration = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.duration(a,b,c,d,e,f);}; return this;}
    this.dur = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.dur(a,b,c,d,e,f);}; return this;}
    this.flyHome = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.flyHome(a,b,c,d,e,f);}; return this;}
    this.color = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.color(a,b,c,d,e,f);}; return this;}
    this.shadowOnly = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.shadowOnly(a,b,c,d,e,f);}; return this;}
    this.castShadow = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.castShadow(a,b,c,d,e,f);}; return this;}
    this.lightAmbDiff = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.lightAmbDiff(a,b,c,d,e,f);}; return this;}
    this.lightBgAmbDiff = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.lightBgAmbDiff(a,b,c,d,e,f);}; return this;}
    this.specLight = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.specLight(a,b,c,d,e,f);}; return this;}
    this.material = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.material(a,b,c,d,e,f);}; return this;}
    this.blend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.blend(a,b,c,d,e,f);}; return this;}
    this.acceleration = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.acceleration(a,b,c,d,e,f);}; return this;}
    this.vEnd = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.vEnd(a,b,c,d,e,f);}; return this;}
    this.vBegin = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.vBegin(a,b,c,d,e,f);}; return this;}
    this.scalarAcceleration = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.scalarAcceleration(a,b,c,d,e,f);}; return this;}
//    this.blend = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.blend(a,b,c,d,e,f);}; return this;}
    this.until = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.until(a,b,c,d,e,f);}; return this;}
    this.untilEo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilEo(a,b,c,d,e,f);}; return this;}
    this.untilBo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilBo(a,b,c,d,e,f);}; return this;}
    this.untilaLEo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilaLEo(a,b,c,d,e,f);}; return this;}
    this.untilaMEo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilaMEo(a,b,c,d,e,f);}; return this;}
    this.untilaLBo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilalBo(a,b,c,d,e,f);}; return this;}
    this.untilaMBo = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.untilaMBo(a,b,c,d,e,f);}; return this;}
    this.LQCanvas = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.LQCanvas(a,b,c,d,e,f);}; return this;}
    this.map = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.map(a,b,c,d,e,f);}; return this;}
    this.mapScale = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapScale(a,b,c,d,e,f);}; return this;}
    this.mapRelative = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.mapRelative(a,b,c,d,e,f);}; return this;}
    this.copyTiming = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.copyTiming(a,b,c,d,e,f);}; return this;}
    this.copyMotion = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.copyMotion(a,b,c,d,e,f);}; return this;}
    this.copyMotion = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); o.copyMotion(a,b,c,d,e,f);}; return this;}
    this.opacity3D = function (a,b,c,d,e,f) { var i; for (i=0; i<this.ar.length; i++) { var o = (this.ar[i]); if (o.opacity3D) o.opacity3D(a,b,c,d,e,f);}; return this;}


    this.selVisible = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var cs=getComputedStyle(this.ar[i].el);
	    if (cs.visibility=='visible') r.push(this.ar[i]);
	}
	return new taccglMultiIntClone(r);
    }

    this.mp = function (f,d) {
	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    f(a,i,d,this);
	}
	return this;
    }

    this.select =  function (f,d) {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    if (f(a,i,d,this)) r.push(a);
	}
	return new taccglMultiIntClone(r);
    }

    this.selModulo =  function (m,f,t) {
	var r=Array(0);	var i; 
	if (!f) f=0;
	if (!t) t=f;
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    if (f<=i%m  && i%m<=t) r.push(a);
	}
	return new taccglMultiIntClone(r);
    }

    this.cont = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    r.push ( a.cont() );
	}
	return new taccglMultiIntClone(r);
    }
    this.clone = function () {
	var r=Array(0);	var i; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    r.push ( a.clone() );
	}
	return new taccglMultiIntClone(r);
    }


    this.a = this.ma = function (el,k) {
	if (!k) k=taccgl.taccglAnim; 
	var a;
	if (typeof (k) == "object" ) {k.actorInit(el);a=k;} else a = new k (el);
	this.ar.push (a); 
	return this;
    }

    this.add = this.mSingle = function (a) {this.ar.push(a); return this;}
    this.mClass = function (cl,k) { this.union ( taccgl.mClass(cl,k) ); return this; }
    this.mName  = function (cl,k) { this.union ( taccgl.mName(cl.k) ); return this;}
    this.mTagName = function (cl,k) { this.union ( taccgl.mTagName(cl.k) ); return this;}

    this.union = function (s) {	this.ar = this.ar.concat (s.ar); return this;}

    this.sequence = function (d,g) {
	if (!g) g=0;
	var n = this.ar.length, i;
	//  n*sd + (n-1)*g = d    sd + (sd+g)*(n-1) = d 
	var sd = (d-(n-1)*g)/n,
	    st = this.ar[0].basetime;
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i];
	    a.dur(sd);
	    a.absStartTime (st+i*(sd+g));
	}
	return this;
    }

    this.sliceV = function (n,g,s,f) {
	if (!g) g=0;
	if (!s) s=0;
	if (!f) f=1;
	var r=Array(0);	var i,j; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i], b, d;
	    if (f==1) {d=n;} else { d=(1-Math.pow(f,n))/(1-f);}
	    var w = (a.wx0 - g*(n-1))/ d - n*s/2 + s/2;
	    for (j=0; j<n; j++) {
		if (j!=n-1) b=a.clone(); else b=a;
		if (f==1)
		    b.restrict (a.x0 + j*(w+g)+j*(j-1)/2*s, a.y0, w+s*j, a.hy0); 
		else
		    b.restrict (a.x0 + w*(1-Math.pow(f,j))/(1-f)+ j*g+j*(j-1)/2*s, a.y0, Math.pow(f,j)*w+s*j, a.hy0); 
		r.push(b);
	    }
	}
	this.ar=r; return this;
    }

    this.sliceH = function (n,g,s,f) {
	if (!g) g=0;
	if (!s) s=0;
	if (!f) f=1;
	var r=Array(0), i,j; 
	for (i=0; i<this.ar.length; i++) {
	    var a=this.ar[i], b, d;
	    if (f==1) {d=n;} else { d=(1-Math.pow(f,n))/(1-f);}
	    var w = (a.hy0 - g*(n-1))/ d - n*s/2 + s/2;
	    for (j=0; j<n; j++) {
		if (j!=n-1) b=a.clone(); else b=a;
		if (f==1)
		    b.restrict (a.x0, a.y0 + j*(w+g)+j*(j-1)/2*s, a.wx0, w+s*j); 
		else
		    b.restrict (a.x0, a.y0 + w*(1-Math.pow(f,j))/(1-f)+ j*g+j*(j-1)/2*s, a.wx0, Math.pow(f,j)*w+s*j); 
		r.push(b);
	    }
	}
	this.ar=r; return this;
    }


    return this;
} 



function taccglMultiEmpty ()    { this.ar=Array(0); return this;}
function taccglMultiElement (e) { this.ar=Array(1); this.ar[0]=e; return this;}
function taccglMultiSet (s,k)     { 
    var i; this.ar=Array(s.length); 
    if (!taccgl.cv) taccgl.begin();
    if (!k) k=taccgl.taccglAnim;
    for (i=0; i<s.length; i++) {this.ar[i]=new k(s[i]);} return this;}
function taccglMultiIntClone (ar){this.ar=ar; return this;}
taccglMultiEmpty.prototype =taccglMultiElement.prototype= taccglMultiSet.prototype=
taccglMultiIntClone.prototype=new taccglMultiPrototype();

// Materials 

function taccglMaterialPrototype () { 
    this.color          = function (c,c1) {
	this.colkind='color'; this.c=c; this.c1=c1; return this;}
    this.lightAmbDiff   = function (ambCol, diffCol, a0, a1) {
	this.colkind='lightAmbDiff'; this.ambCol=ambCol; this.diffCol=diffCol; this.a0=a0; this.a1=a1; return this;}
    this.lightBgAmbDiff = function (c,amb,diff, a0, a1){
	this.colkind='lightBgAmbDiff'; this.c=c; this.amb=amb; this.diff=diff; this.a0=a0; this.a1=a1; return this;}
    this.specLight = function (s, shini) {
	this.doSpecLight=true; this.spec=s; this.shini=shini; return this;}
    this.applyToAnim = function (a) {
	if (this.colkind=='color') {a.color(this.c,this.c1);}
	if (this.colkind=='lightAmbDiff') {a.lightAmbDiff (this.ambCol, this.diffCol, this.a0, this.a1);}
	if (this.colkind=='lightBgAmbDiff') {a.lightBgAmbDiff (this.c,this.amb,this.diff, this.a0, this.a1);}
	if (this.doSpecLight) {a.specLight(this.spec, this.shini);}
    }
}
function taccglMaterial () { this.colkind=null; this.doSpecLight=false;return this;}
taccglMaterial.prototype= new taccglMaterialPrototype();
taccgl.material = function () {return new taccglMaterial();}

function taccglLightSourcePrototype () { 
    this.setPos = function (x,y,z) {this.x=x; this.y=y; this.z=z; taccgl.adjustShcvp();}
    this.setShadowZRange = function (front, back){this.zBack=back; this.zFront=front;this.adjustShcvp(); }
    this.setFocus = function (f) {this.focus=f;}
}
function taccglLightSource () { this.x = -200; this.y=-200; this.z=-5000; this.focus=1; return this;}
taccglLightSource.prototype= new taccglLightSourcePrototype();
taccgl.lightSource = function () {return new taccglLightSource();}


function taccgl_drawShadow (t)
{
    var g=taccgl.g; var jaccobj=taccgl, pr=jaccobj.pr;
    g.bindFramebuffer (g.FRAMEBUFFER, jaccobj.shadowfb);
//    g.bindFramebuffer (g.FRAMEBUFFER, null);

    g.viewport (0,0,2048,2048);
    g.disable(g.BLEND); // g.disable(g.SAMPLE_COVERAGE);

    g.clearColor (1.0,1.0, 1.0 ,1.0);
//   g.clearColor (0.0, ldt>1/30 ? 1.0 : 0.0, 0.0 ,0.0);
    g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
   var ii; 
   for (ii=0; ii<jaccobj.draw_shprognumber; ii++) {
       var dff=jaccobj.shprogfrom[ii], cnt;
       if (ii<jaccobj.draw_shprognumber-1) 
	   cnt=jaccobj.shprogfrom[ii+1]-dff;
       else
	   cnt= jaccobj.draw_vertexnumber-dff;
       var sc=jaccobj.shprog[ii], pp=sc.shadowP; 
       if (pp) {
	   g.useProgram(pp);
	   g.uniform1f(sc.shadowLoc.uTime,t);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on uniform1f "); }
	   g.uniform4f(sc.shadowLoc.shcvp,jaccobj.shcvpx,jaccobj.shcvpy,2/jaccobj.shcvpw,2/jaccobj.shcvph);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on uniform4f "); }
	   g.uniform1i(sc.shadowLoc.uTexture,0);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli"); }
	   g.uniform1i(sc.shadowLoc.uTexture2,1);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli");}
	   if (sc.shadowPassUniforms) sc.shadowPassUniforms();
	   g.drawArrays (g.TRIANGLES, dff, cnt);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on drawArrays in drawShadow"); }
       }
   }
   g.enable(g.BLEND);
   g.bindFramebuffer (g.FRAMEBUFFER, null);
   g.viewport (0,0,Math.round(jaccobj.canvasW*jaccobj.pr),Math.round(jaccobj.canvasH*jaccobj.pr));
}

function taccgl_draw3d (xcurt)
{
    var curt;
//    console.time("draw3d");
    var lF=1;
    var jaccobj=taccgl, g=jaccobj.g, e;
    if (taccgl_errcheck) {   if ((e=g.getError())!=0) { alert ("Error "+e+" on start of draw3d ");  taccgl.clog("Error "+e+" on start of draw3d "); return; }  }
    if (taccgl.drawerrcheck) {  if ((e=g.getError())!=0){ jaccobj.webglerror=true; jaccobj.drawImmediateTerm(); } }
    if (!curt)  {
	if (window.performance && window.performance.now) 
	    curt =  window.performance.now();
	else
	    curt =  new Date().getTime();
    }
    var t = (curt - jaccobj.draw_startTime) / jaccobj.draw_duration;
    if (taccgl_debug) {
	var ldt = t-jaccobj.currenttime; 
    }  // taccgl_debug_end
    jaccobj.currenttime=t;
    if (taccgl_debug) 
	taccgl_timestep[taccgl_timestepi++] = t; 
    // taccgl_debug_end

    // t= 0.01666 * Math.floor(taccgl_timestepi);

    var b=false;

    while (t > jaccobj.doat[jaccobj.doatI].attime) {
	b = jaccobj.doat[jaccobj.doatI].doPreDraw(jaccobj.doatI) || b;
	if (jaccobj.doatI>=jaccobj.doat.length) break;
    }
    
    if (b) {
	jaccobj.drawTerminated(); 
	jaccobj.doHook(jaccobj.onTerm);
	return;
    }
    jaccobj.draw_frames++;  
    if ( jaccobj.draw_meaIgnore-->0 &&jaccobj.draw_meaFrames>=0 ) {
	jaccobj.draw_meaAdjust += curt -  jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ];
    }
    jaccobj.draw_meaFrames++;
    jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt;
    jaccobj.meaAA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt-jaccobj.draw_meaAdjust;
    var tmea, frate;
    if ( jaccobj.draw_meaFrames <= 0 ) {
	jaccobj.draw_meaTime=curt; // jaccobj.perfnow(); 
	frate=30; tmea=0;
    } else {
	tmea = (curt - jaccobj.draw_meaTime -jaccobj.draw_meaAdjust ) / jaccobj.draw_duration; frate = jaccobj.draw_meaFrames/tmea;
    }

    if (taccgl_debug) {
	if (jaccobj.draw_meaFrames < taccgl_debug_drawloop ||  jaccobj.draw_meaIgnore-->=0) {
	    taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+
		     '/meaIgnore='+jaccobj.draw_meaIgnore+
		     '/meaAdjust='+jaccobj.draw_meaAdjust+
		     '/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	}
    }  // taccgl_debug_end
    if  (jaccobj.draw_frames==2) {
	// Frame #1 has been drawn, now we are at frame #2, possibly decide to redo #1
	if (taccgl_debug) {
	    taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    taccgl.clog ("Checking for slowStartUp  slowStartupFrames="+jaccobj.slowStartupFrames+" slowStartupTime="+jaccobj.slowStartupTime);
	}  // taccgl_debug_end
	if ( ( jaccobj.loadTest===false && (!(jaccobj.quality==3 && t<0.02))
	       ||jaccobj.slowStartupFrames<4 || (jaccobj.loadTest>0&&t>0.02)) && jaccobj.slowStartupTime<3000) { 
	    // if we are at the very beginning and have not done the loadTest yet we go here,
	    // or if we are doing the loadTest right now, and it was not yet successful
	    // unless the startup is really slow and the  maximal slowStartupTime is reached
	    if (jaccobj.loadTest==false) {
		if (jaccobj.slowStartupFrames>2 && t<0.02) {
		// if the last frame was slow we just repeat showing the first frame, until
		// it either gets fast or we reach the maximal slowStartupTime
		// otherwise we come here and perform the loadTest
		    lF=4; jaccobj.loadTest=6;
		}
	    } else {
		lF=4; jaccobj.loadTest--;
	    }
	    jaccobj.slowStartupTime += curt-jaccobj.draw_startTime;
	    jaccobj.slowStartupFrames +=1;
	    jaccobj.draw_startTime=jaccobj.draw_meaTime=curt; t=0; jaccobj.draw_frames=1; 
	    jaccobj.draw_meaFrames=0; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; // lets redo the first frame	
	    if (taccgl_debug) {
		taccgl.clog ("Redo first frame instead of second one, loadTest="+ jaccobj.loadTest);
	    }  // taccgl_debug_end
	} else 
	    // we either come here if the loadTest was done or if the max slowStartupTime was reached
	    if (jaccobj.quality==3 && t<0.02) { 
		// if we are already on quality level 3 just go on
	    } else if (jaccobj.loadTest===false) {
		// max slowStartupTime was reached, so use Q1
		jaccobj.quality=1; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
                jaccobj.loadTest=0;
	    } else {
		// loadTest was performed
		jaccobj.loadTest=false;
		if  (t<0.02) {
		    // and fast, use Q3
		    jaccobj.quality++; jaccobj.adjustQuality();
		    jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
		} else { 
		    // loadTest was slow, so stay in Q2
		}
	    }
    } else if ( (jaccobj.draw_frames>=2) && ((t>0.2 && (jaccobj.draw_meaFrames>10 || tmea>1)) || t<0.02 || jaccobj.draw_frames==2) ) {
//	var frate = jaccobj.draw_frames / t;
	if (frate < taccgl_immediateStop && jaccobj.quality==1) { 
	    jaccobj.webglerror=true; jaccobj.drawImmediateTerm(); return; 
	}
	if (frate < 20 && jaccobj.quality > 1) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end

	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.020 ) && 
		 (jaccobj.draw_meaFrames < 2 ||  2 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.020 ) ) {

		if (jaccobj.draw_meaFrames<60) {
		    // apparently this quality failed
		    if (jaccobj.quality<jaccobj.softFailQ) {jaccobj.softFailQ=jaccobj.quality; jaccobj.softFailCnt=0;}
		    jaccobj.softFailCnt++;
		    if ( jaccobj.softFailCnt > 1 )  jaccobj.hardFailQ= jaccobj.softFailQ;
		}
		jaccobj.quality--; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
	    }
	}
//	if (jaccobj.draw_frames / (new Date().getTime() - jaccobj.draw_startTime) * 1000 > 50 ) {
	if (frate > 50 && jaccobj.quality < jaccobj.hardFailQ-1 && jaccobj.epack ) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+ '/rate=' + frate.toFixed(4) + '/' + jaccobj.quality + 
			     " loadTestl="+ jaccobj.loadTestl);
	    }  // taccgl_debug_end
	    if (jaccobj.loadTestl<-60) {
		jaccobj.loadTestl=6;
	    } else {
		if (jaccobj.loadTestl>=0 && jaccobj.loadTestl<2) {
		    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ]) > 0.050 ) && 
			 (jaccobj.draw_meaFrames < 2 ||  2 / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ]) > 0.050 ) ) {
		    
			jaccobj.quality++; jaccobj.adjustQuality();
			jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;jaccobj.loadTestl=0;
		    }
		}
	    }
	}
        if (jaccobj.loadTestl-->0){ lF=4; }
	if (frate < 30 && jaccobj.quality > 2 && jaccobj.epack && jaccobj.draw_meaFrames>60) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + t.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end
	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.030 ) && 
		     (jaccobj.draw_meaFrames < 2 ||  2 / 
		      (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.030 ) ) {
		
		if (jaccobj.draw_meaFrames<60) {
		    // apparently this quality failed
		    if (jaccobj.quality<jaccobj.softFailQ) {jaccobj.softFailQ=jaccobj.quality; jaccobj.softFailCnt=0;}
		    jaccobj.softFailCnt++;
		    if ( jaccobj.softFailCnt > 1 )  jaccobj.hardFailQ= jaccobj.softFailQ;
		}
		jaccobj.quality--; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
	    }
	}
//	}
    } 

    var jj;
    if (jaccobj.shadowEna && (jaccobj.quality>2 || ((lF>1)&&(jaccobj.quality==2))) ) {
	for (jj=0; jj<lF; jj++) 
	    taccgl_drawShadow(t);
    }
    if (taccgl_errcheck) {   if ((e=g.getError())!=0) 	alert ("Error "+e+" on vertexAttribPointer draw3D before bindFramebuffer "); }
    g.bindFramebuffer (g.FRAMEBUFFER, null);
    if (taccgl_errcheck) {   if ((e=g.getError())!=0) 	alert ("Error "+e+" on vertexAttribPointer draw3D bindFramebuffer ");     }

//    if ( taccgl_timestepi % 2 != 0) return ;

    // Most devices do not need an explicit clear but FF on Android does
    g.clearColor (0.0,0.0, 0.0 ,0.0);
//   g.clearColor (0.0, ldt>1/30 ? 1.0 : 0.0, 0.0 ,0.0);
    g.clear (g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
    if (taccgl_errcheck) {   if ((e=g.getError())!=0) 	alert ("Error "+e+" on vertexAttribPointer draw3D clear ");     }

//   var x = g.getProgramParameter(p, g.LINK_STATUS);
//   x = g.getProgramParameter(p, g.VALIDATE_STATUS);
//   x = g.getProgramParameter(p, g.ATTACHED_SHADERS);
//   x = g.getProgramParameter(p, g.ACTIVE_ATTRIBUTES);
//   x = g.getProgramParameter(p, g.ACTIVE_UNIFORMS);

//    g.enable(g.DEPTH_TEST);

   jaccobj. doHook (taccgl.onBeforeDraw3D, t);

   var ii; 
    for (jj=0; jj<lF; jj++) {
     for (ii=0; ii<jaccobj.draw_shprognumber; ii++) {
       var dff=jaccobj.shprogfrom[ii], cnt;
       if (ii<jaccobj.draw_shprognumber-1) 
	   cnt=jaccobj.shprogfrom[ii+1]-dff;
       else
	   cnt= jaccobj.draw_vertexnumber-dff;
       var sc=jaccobj.shprog[ii], pp=sc.qp[jaccobj.quality]; g.useProgram(pp);
       var loc=sc.qLoc[jaccobj.quality];
       g.uniform1f(loc.uTime,t);
       if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on uniform1f "); }
       g.uniform4f(loc.cvp,jaccobj.cvpx,jaccobj.cvpy,2/jaccobj.cvpw,2/jaccobj.cvph);
       if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on uniform4f "); }
       g.uniform1i(loc.uTexture,0);
       if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli"); }
       g.uniform1i(loc.uTexture2,1);
       if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli");}
       if (sc.passUniforms) sc.passUniforms(loc);
       if (jaccobj.shadowEna) {
	   g.uniform1i(loc.uShadowMap,2);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli");}
//	   g.uniform4f(loc.shcvp,jaccobj.shcvpx,jaccobj.shcvpy,2/jaccobj.shcvpw,2/jaccobj.shcvph);
//	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifoml4f shcvp");}
	   g.uniform4f(loc.fshcvp,jaccobj.shcvpx,jaccobj.shcvpy,2/jaccobj.shcvpw,2/jaccobj.shcvph);
	   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifoml4f fshcvp");}
       }
       g.drawArrays (g.TRIANGLES, dff, cnt);
//       for unkonwn reasons the error check below does not run in chrome
//       if (taccgl_errcheck) {      if ((e=g.getError())!=0) 
//	   if (e!=1285)
//	       alert ("Error "+e+" on drawArrays");
//   
     }
	if (lF>1) {
	    if ((e=g.getError())!=0){ jaccobj.webglerror=true; jaccobj.drawImmediateTerm(); } 
	    if (jj==lF-1) g.depthFunc (g.LEQUAL); else g.depthFunc (g.LESS); 
        }
   } 
//   if (jaccobj.shprogfrom[jaccobj.draw_shprognumber-1] >= jaccobj.draw_vertexnumber) 
//       alert(55);
//   if ( jaccobj.draw_vertexnumber > 240) 
//       alert (jaccobj.draw_vertexnumber + ","+jaccobj.vertI);
//   g.drawArrays (g.TRIANGLES, jaccobj.shprogfrom[jaccobj.draw_shprognumber-1], jaccobj.draw_vertexnumber-1);
/*   var df=  jaccobj.shprogfrom[jaccobj.draw_shprognumber-1]; 
   g.useProgram(jaccobj.shprog[jaccobj.draw_shprognumber-1]);
   g.uniform1f(jaccobj.draw_locTime,t);
   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on uniform1f "); }
   g.uniform1i(jaccobj.draw_locuTexture,0);
   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli"); }
   g.uniform1i(jaccobj.draw_locuTexture2,1);
   if (taccgl_errcheck) {   if ((e=g.getError())!=0) alert ("Error "+e+" on unifomli");}
   g.drawArrays (g.TRIANGLES, df, jaccobj.draw_vertexnumber-df);
*/
    if ((e=g.getError())!=0) {
	jaccobj.webglerror=true; jaccobj.dddmode=false;
	if (taccgl_debug) {
	    alert ("Error "+e+" on drawArrays");
	}   // taccgl_debug_end
	jaccobj.drawImmediateTerm(); return;
    }
//   if (taccgl_errcheck) {      if ((e=g.getError())!=0)        if (e!=1285)	   alert ("Error "+e+" on drawArrays");   }


    // var vel = document.getElementById('taccglVertexNumber');
    // if (vel) vel.innerHTML = jaccobj.draw_vertexnumber + '/' + jaccobj.draw_frames;
    // jaccobj.timeofdraw = new Date().getTime() - curt;
//    console.timeEnd("draw3d");

    if (window.taccgl_requestAnimationFrame) {
//	if (jaccobj.draw_frames<10) {
//	    setTimeout(taccgl_draw3d,0);  jaccobj.reqAnimFrameId=null;
//	} else 
	    jaccobj.reqAnimFrameId= taccgl_requestAnimationFrame (taccgl_draw3d); 
    } 
}

function taccgl_draw2d (curt)
{
    var jaccobj=taccgl, g=jaccobj.g, lF=1, pr=jaccobj.pr;
    if (!jaccobj.draw_running) return;
    if (!curt)  {
	if (window.performance && window.performance.now) 
	    curt =  window.performance.now();
	else
	    curt =  new Date().getTime();
    }
    var uTime = (curt - jaccobj.draw_startTime) / jaccobj.draw_duration;
    if (taccgl_debug) {
	var ldt = uTime-jaccobj.currenttime; 
    }  // taccgl_debug_end

//    alert("draw2d " +uTime);
    jaccobj.currenttime=uTime;
    if (taccgl_debug) 
	taccgl_timestep[taccgl_timestepi++] = uTime;  
    // taccgl_debug_end
    var b=false, i, a, t, rt, x,y,z;
    var tcan = document.getElementById ('taccgl_textureCanvas');
    var tcan2 =	document.getElementById ('taccgl_textureCanvas2');


    while (uTime > jaccobj.doat[jaccobj.doatI].attime) {
	b = jaccobj.doat[jaccobj.doatI].doPreDraw(jaccobj.doatI) || b;
	if (jaccobj.doatI>=jaccobj.doat.length) break;
    }
    
    if (b) {
	jaccobj.drawTerminatedDD(); 
	jaccobj.doHook(jaccobj.onTerm);
	return; 
    }
    jaccobj.draw_frames++; 
    if ( jaccobj.draw_meaIgnore-->0 &&jaccobj.draw_meaFrames>=0 ) {
	jaccobj.draw_meaAdjust += curt -  jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ];
    }
    jaccobj.draw_meaFrames++;
    jaccobj.meaA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt;
    jaccobj.meaAA[ jaccobj.draw_meaFrames % jaccobj.meaAS ] =  curt-jaccobj.draw_meaAdjust;
    var tmea, frate;
    if ( jaccobj.draw_meaFrames <= 0 ) {
	jaccobj.draw_meaTime=curt; // jaccobj.perfnow(); 
	frate=30; tmea=0;
    } else {
	tmea = (curt - jaccobj.draw_meaTime -jaccobj.draw_meaAdjust ) / jaccobj.draw_duration; frate = jaccobj.draw_meaFrames/tmea;
    }

    if (taccgl_debug) {
	if (jaccobj.draw_meaFrames < taccgl_debug_drawloop ||  jaccobj.draw_meaIgnore-->=0) {
	    taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /uTime= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+
		     '/meaIgnore='+jaccobj.draw_meaIgnore+
		     '/meaAdjust='+jaccobj.draw_meaAdjust+
		     '/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	}
    }  // taccgl_debug_end


/*  old draw2d quality code 
    if  (jaccobj.draw_frames==2) {
        // taccgl.clog('at 2nd frame');
	// Frame #1 has been drawn, now we do #2
	if (uTime>0.02 && jaccobj.slowStartupTime<1) { // but the startup was slow ...
            // taccgl.clog('repeat');
	    jaccobj.slowStartupTime += curt-jaccobj.draw_startTime;
	    jaccobj.draw_startTime=curt; uTime=0; jaccobj.draw_frames=1;  // lets redo the first frame	
	}
    } 
    if ( uTime>0.1 ) {
	var frate = jaccobj.draw_frames / uTime;
	if (frate < taccgl_immediateStop) { 
	    jaccobj.drawImmediateTermDD(); return; 
	}
	if (frate < 20 && jaccobj.quality > 1) {
	    jaccobj.quality--; jaccobj.adjustQuality(); 
	}
	if (frate > 50 && jaccobj.quality < 3 && jaccobj.epack) {
	    jaccobj.quality++; jaccobj.adjustQuality(); 
	}
    }
*/
    if  (jaccobj.draw_frames==2) {
	// Frame #1 has been drawn, now we are at frame #2, possibly decide to redo #1
	if (taccgl_debug) {
	    taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
		     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    taccgl.clog ("Checking for slowStartUp  slowStartupFrames="+jaccobj.slowStartupFrames+" slowStartupTime="+jaccobj.slowStartupTime);
	}  // taccgl_debug_end
	if ( ( jaccobj.loadTest===false && (!(jaccobj.quality==3 && uTime<0.02))
	       ||jaccobj.slowStartupFrames<4 || (jaccobj.loadTest>0&&uTime>0.02)) && jaccobj.slowStartupTime<3000) { 
	    // if we are at the very beginning and have not done the loadTest yet we go here,
	    // or if we are doing the loadTest right now, and it was not yet successful
	    // unless the startup is really slow and the  maximal slowStartupTime is reached
	    if (jaccobj.loadTest==false) {
		if (jaccobj.slowStartupFrames>2 && uTime<0.02) {
		// if the last frame was slow we just repeat showing the first frame, until
		// it either gets fast or we reach the maximal slowStartupTime
		// otherwise we come here and perform the loadTest
		    lF=8; jaccobj.loadTest=6;
		}
	    } else {
		lF=8; jaccobj.loadTest--;
	    }
	    jaccobj.slowStartupTime += curt-jaccobj.draw_startTime;
	    jaccobj.slowStartupFrames +=1;
	    jaccobj.draw_startTime=jaccobj.draw_meaTime=curt; t=0; jaccobj.draw_frames=1; 
	    jaccobj.draw_meaFrames=0; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0; // lets redo the first frame	
	    if (taccgl_debug) {
		taccgl.clog ("Redo first frame instead of second one, loadTest="+ jaccobj.loadTest);
	    }  // taccgl_debug_end
	} else 
	    // we either come here if the loadTest was done or if the max slowStartupTime was reached
	    if (jaccobj.quality==3 && uTime<0.02) { 
		// if we are already on quality level 3 just go on
	    } else if (jaccobj.loadTest===false) {
		// max slowStartupTime was reached, so use Q1
		jaccobj.quality=1; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
                jaccobj.loadTest=0;
	    } else {
		// loadTest was performed
		jaccobj.loadTest=false;
		if  (uTime<0.02) {
		    // and fast, use Q3
		    jaccobj.quality++; jaccobj.adjustQuality();
		    jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
		} else { 
		    // loadTest was slow, so stay in Q2
		}
	    }
    } else if ( (jaccobj.draw_frames>=2) && ((uTime>0.2 && (jaccobj.draw_meaFrames>10 || tmea>1)) || uTime<0.02 || jaccobj.draw_frames==2) ) {
	if (frate < taccgl_immediateStop && jaccobj.quality==1) { 
	    jaccobj.webglerror=true; jaccobj.drawImmediateTerm(); return; 
	}
	if (frate < 20 && jaccobj.quality > 1) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /t= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end

	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.020 ) && 
		 (jaccobj.draw_meaFrames < 2 ||  2 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.020 ) ) {

		if (jaccobj.draw_meaFrames<60) {
		    // apparently this quality failed
		    if (jaccobj.quality<jaccobj.softFailQ) {jaccobj.softFailQ=jaccobj.quality; jaccobj.softFailCnt=0;}
		    jaccobj.softFailCnt++;
		    if ( jaccobj.softFailCnt > 1 )  jaccobj.hardFailQ= jaccobj.softFailQ;
		}
		jaccobj.quality--; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
	    }
	}
	if (frate > 50 && jaccobj.quality < jaccobj.hardFailQ-1 && jaccobj.epack ) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /uTime= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+ '/rate=' + frate.toFixed(4) + '/' + jaccobj.quality + 
			     " loadTestl="+ jaccobj.loadTestl);
	    }  // taccgl_debug_end
	    if (jaccobj.loadTestl<-60) {
		jaccobj.loadTestl=6;
	    } else {
		if (jaccobj.loadTestl>=0 && jaccobj.loadTestl<2) {
		    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ]) > 0.050 ) && 
			 (jaccobj.draw_meaFrames < 2 ||  2 / 
			  (curt - jaccobj.meaA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ]) > 0.050 ) ) {
		    
			jaccobj.quality++; jaccobj.adjustQuality();
			jaccobj.draw_meaFrames=-3; jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;jaccobj.loadTestl=0;
		    }
		}
	    }
	}
        if (jaccobj.loadTestl-->0){ lF=8; }
	if (frate < 30 && jaccobj.quality > 2 && jaccobj.epack && jaccobj.draw_meaFrames>60) {
	    if (taccgl_debug) {
		taccgl.clog (curt.toFixed(1)+":::"+jaccobj.draw_frames + ' /uTime= ' + uTime.toFixed(4) + "("+ldt.toFixed(4)+
			     ')/meaFrames='+jaccobj.draw_meaFrames+'/rate=' + frate.toFixed(4) + '/' + jaccobj.quality);
	    }  // taccgl_debug_end
	    if ( (jaccobj.draw_meaFrames < 5 ||  5 / 
		  (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-5) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.030 ) && 
		     (jaccobj.draw_meaFrames < 2 ||  2 / 
		      (curt - jaccobj.meaAA[ (jaccobj.draw_meaFrames-2) % jaccobj.meaAS ] - jaccobj.draw_meaAdjust) < 0.030 ) ) {
		
		if (jaccobj.draw_meaFrames<60) {
		    // apparently this quality failed
		    if (jaccobj.quality<jaccobj.softFailQ) {jaccobj.softFailQ=jaccobj.quality; jaccobj.softFailCnt=0;}
		    jaccobj.softFailCnt++;
		    if ( jaccobj.softFailCnt > 1 )  jaccobj.hardFailQ= jaccobj.softFailQ;
		}
		jaccobj.quality--; jaccobj.adjustQuality(); 
		jaccobj.draw_meaFrames=-3;jaccobj.draw_meaAdjust=0; jaccobj.draw_meaIgnore=0;
	    }
	}
    } 




//    g.fillStyle = "rgba(0,0,0,0)";
//    g.fillRect (0,0, jaccobj.cv.width, jaccobj.cv.height);
    for (var jj=0; jj<lF; jj++){

    g.clearRect (0,0, jaccobj.cv.width, jaccobj.cv.height);

    i=0; 
    while (i<jaccobj.AAstartedLength) {
	a = jaccobj.AA[i];
	var flags = a.flags;
	t = rt = (uTime - a.basetime) / a.vduration;
	if (t<0) { t=0; if ((flags & 1) == 0) {i++; continue;} }
	if (t>1) {
	    t=1; 
	    if ((flags & 2) == 0) {
		i++; continue;
	    } 
	}
	var tt=1-t;

	if ((!a.rotation) && !a.face && a.wy0==0 && a.wz0==0 && a.hx0==0 && a.hz0==0 && a.wy1==0 && a.wz1==0 && a.hx1==0 && a.hz1==0) {
	    var wtex=a.wx0*tt+a.wx1*t, htex=a.hy0*tt+a.hy1*t;

	    x= a.x0*tt+a.x1*t-0.5*t*tt*a.ax;
	    y= a.y0*tt+a.y1*t-0.5*t*tt*a.ay;
	    z= a.z0*tt+a.z1*t-0.5*t*tt*a.az;

	    x=x+jaccobj.ddfx*z;
	    y=y+jaccobj.ddfy*z;
	    if (wtex>0 && htex>0)
  		if (a.docolor) {
		    if ((tt>0) && a.ddcolor0) {
			g.fillStyle=a.ddcolor0;
			g.globalAlpha=1;
			g.fillRect ((x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    }
		    if ((t>0) && a.ddcolor1) {
			g.fillStyle=a.ddcolor1;
			g.globalAlpha=t;
			g.fillRect ((x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    }
		    
		    var alpha0 = (1-t)*a.mix0 + t*a.mix1;
		    if (alpha0>0.0) {
			g.globalAlpha = alpha0;
			g.drawImage (tcan, 
				     (a.s0*tt+a.s1*t)*pr, (a.t0*tt+a.t1*t)*pr,
				     (a.ws0*tt+a.ws1*t)*pr, (a.ht0*tt+a.ht1*t)*pr,
				     (x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    } 
		    var alpha1 = (1-t)*a.mixs0 + t*a.mixs1;
		    if (alpha1>0.0) {
			g.globalAlpha = alpha1;
			g.drawImage (tcan2, 
				     (a.s0*tt+a.s1*t)*pr, (a.t0*tt+a.t1*t)*pr,
				     (a.ws0*tt+a.ws1*t)*pr, (a.ht0*tt+a.ht1*t)*pr,
				     (x-jaccobj.canvasX)*pr,(y-jaccobj.canvasY)*pr,wtex*pr,htex*pr);
		    } 
		}	else  {
		    g.globalAlpha=1.0;
		    g.drawImage (tcan,
				 (a.s0*tt+a.s1*t)*pr, (a.t0*tt+a.t1*t)*pr,
				 (a.ws0*tt+a.ws1*t)*pr, (a.ht0*tt+a.ht1*t)*pr,
				 (x-jaccobj.canvasX)*pr, (y-jaccobj.canvasY)*pr, wtex*pr, htex*pr );
		}
	} else {
	    g.save();
	    // g.translate (x,y);

	    var hx= a.hx0*tt+a.hx1*t,
	        hy= a.hy0*tt+a.hy1*t,
	        hz= a.hz0*tt+a.hz1*t,
	        wx= a.wx0*tt+a.wx1*t,
	        wy= a.wy0*tt+a.wy1*t,
	        wz= a.wz0*tt+a.wz1*t,
	        dx= a.dx0*tt+a.dx1*t,
	        dy= a.dy0*tt+a.dy1*t,
	        dz= a.dz0*tt+a.dz1*t;

	    if (a.rotation) {
		var o = a.rotfrom*tt + a.rotto*t;

		/*
		var rx, ry, rz;
		a.calcRotation (o,x,y,z); rx=a.resx; ry=a.resy; rz=a.resz;
		a.calcRotation (o,x+hx,y+hy,z+hz); hx=a.resx-rx; hy=a.resy-ry; hz=a.resz-rz;
		a.calcRotation (o,x+wx,y+wy,z+wz); wx=a.resx-rx; wy=a.resy-ry; wz=a.resz-rz;
		*/

		var rx, ry, rz, nx, ny, nz;
		a.calcRotation (o,a.x1,a.y1,a.z1); rx=a.resx; ry=a.resy; rz=a.resz;
		nx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx;
		ny= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry;
		nz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz;

		a.calcRotation (o,a.x1+a.hx1,a.y1+a.hy1,a.z1+a.hz1); rx=a.resx; ry=a.resy; rz=a.resz;
		hx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx -nx;
		hy= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry -ny;
		hz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz -nz;

		a.calcRotation (o,a.x1+a.wx1,a.y1+a.wy1,a.z1+a.wz1); rx=a.resx; ry=a.resy; rz=a.resz;
		wx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx -nx;
		wy= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry -ny;
		wz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz -nz;

		a.calcRotation (o,a.x1+a.dx1,a.y1+a.dy1,a.z1+a.dz1); rx=a.resx; ry=a.resy; rz=a.resz;
		dx= a.x0*tt+a.x1*t-0.5*t*tt*a.ax - a.x1 + rx -nx;
		dy= a.y0*tt+a.y1*t-0.5*t*tt*a.ay - a.y1 + ry -ny;
		dz= a.z0*tt+a.z1*t-0.5*t*tt*a.az - a.z1 + rz -nz;

		x=nx; y=ny; z=nz;
	    } else {
		x= a.x0*tt+a.x1*t-0.5*t*tt*a.ax;
		y= a.y0*tt+a.y1*t-0.5*t*tt*a.ay;
		z= a.z0*tt+a.z1*t-0.5*t*tt*a.az;
	    }

	    x=x+jaccobj.ddfx*z;
	    y=y+jaccobj.ddfy*z;

	    hx=hx+jaccobj.ddfx*hz;
	    hy=hy+jaccobj.ddfy*hz;
	    wx=wx+jaccobj.ddfx*wz;
	    wy=wy+jaccobj.ddfy*wz;
	    dx=dx+jaccobj.ddfx*dz;
	    dy=dy+jaccobj.ddfy*dz;

  	    g.setTransform (wx/4096*pr, wy/4096*pr,hx/4096*pr, hy/4096*pr, (x-jaccobj.canvasX)*pr, (y-jaccobj.canvasY)*pr);

	    if (!a.face) {
  	      if (a.docolor) {
		if ((tt>0) && a.ddcolor0) {
		    g.fillStyle=a.ddcolor0;
		    g.globalAlpha=1;
		    g.fillRect (0,0,4096,4096);
		}
		if ((t>0) && a.ddcolor1) {
		    g.fillStyle=a.ddcolor1;
		    g.globalAlpha=t;
		    g.fillRect (0,0,4096,4096);
		}
		    
		alpha0 = (1-t)*a.mix0 + t*a.mix1;
		if (alpha0>0.0) {
		    g.globalAlpha = alpha0;
		    g.drawImage (tcan, 
				 (a.s0*tt+a.s1*t)*pr, (a.t0*tt+a.t1*t)*pr,
				 (a.ws0*tt+a.ws1*t)*pr, (a.ht0*tt+a.ht1*t)*pr,
				 0, 0, 4096, 4096 );
		} 
		alpha1 = (1-t)*a.mixs0 + t*a.mixs1;
		if (alpha1>0.0) {
		    g.globalAlpha = alpha1;
		    g.drawImage (tcan2, 
				 (a.s0*tt+a.s1*t)*pr, (a.t0*tt+a.t1*t)*pr,
				 (a.ws0*tt+a.ws1*t)*pr, (a.ht0*tt+a.ht1*t)*pr,
				 0, 0, 4096, 4096 );
		} 

	      }	else  {
		  g.globalAlpha=1;
		  g.drawImage (tcan, 
			       (a.s0*tt+a.s1*t)*pr, (a.t0*tt+a.t1*t)*pr,
			       (a.ws0*tt+a.ws1*t)*pr, (a.ht0*tt+a.ht1*t)*pr,
			       0, 0, 4096, 4096 );
	      }
	    } else {
		var j, f,
		    da = Array(a.face.length),
		    sa = Array(a.face.length);
		for (j=0; j<a.face.length; j++){
		    f = a.face[j];
		    var p1z = z,
		        p2z = z + wz*f.xtr + hz*f.ytr + dz*f.ztr,
		        p3z = z + wz*f.xbl + hz*f.ybl + dz*f.zbl,
		        zest =( p1z+p2z+p3z ) / 3;
		    da [j] = zest; sa [j] = f;
		}
		var stable = false;
		while (!stable) {
		    stable=true;
		    for (j=1; j<sa.length; j++){
			if (da[j-1]<da[j]) {
			    var swap;
			    swap=da[j]; da[j]=da[j-1]; da[j-1]=swap;
			    swap=sa[j]; sa[j]=sa[j-1]; sa[j-1]=swap; stable = false;
			}
		    }
		}
		for (j=0; j<a.face.length; j++){
		    f=sa[j];
		    g.setTransform ((wx/4096*(f.xtr-f.xtl)+hx/4096*(f.ytr-f.ytl)+dx/4096*(f.ztr-f.ztl))*pr, 
				    (wy/4096*(f.xtr-f.xtl)+hy/4096*(f.ytr-f.ytl)+dy/4096*(f.ztr-f.ztl))*pr, 
                                    (wx/4096*(f.xbl-f.xtl)+hx/4096*(f.ybl-f.ytl)+dx/4096*(f.zbl-f.ztl))*pr, 
				    (wy/4096*(f.xbl-f.xtl)+hy/4096*(f.ybl-f.ytl)+dy/4096*(f.zbl-f.ztl))*pr,
				    (x+wx*f.xtl+hx*f.ytl+dx*f.ztl-jaccobj.canvasX)*pr,
				    (y+wy*f.xtl+hy*f.ytl+dy*f.ztl-jaccobj.canvasY)*pr);
		    if (f.docolor) {
			if ((tt>0) && f.ddcolor0) {
			    g.fillStyle=f.ddcolor0;
			    g.globalAlpha=1;
			    g.fillRect (0,0,4096,4096);
			}
			if ((t>0) && f.ddcolor1) {
			    g.fillStyle=f.ddcolor1;
			    g.globalAlpha=t;
			    g.fillRect (0,0,4096,4096);
			}
			
			alpha0 = (1-t)*f.mix0 + t*f.mix1;
			if (alpha0>0.0) {
			    g.globalAlpha = alpha0;
			    g.drawImage (tcan, 
					 pr*(f.s0*tt+f.s1*t), pr*(f.t0*tt+f.t1*t),
					 pr*(f.ws0*tt+f.ws1*t), pr*(f.ht0*tt+f.ht1*t),
					 0, 0, 4096, 4096 );
			} 
			alpha1 = (1-t)*f.mixs0 + t*f.mixs1;
			if (alpha1>0.0) {
			    g.globalAlpha = alpha1;
			    g.drawImage (tcan2, 
					 pr*(f.s0*tt+f.s1*t), pr*(f.t0*tt+f.t1*t),
					 pr*(f.ws0*tt+f.ws1*t), pr*(f.ht0*tt+f.ht1*t),
					 0, 0, 4096, 4096 );
			} 
			
		    }	else  {
			g.globalAlpha=1;
			g.drawImage (tcan, 
				     pr*(f.s0*tt+f.s1*t), pr*(f.t0*tt+f.t1*t),
				     pr*(f.ws0*tt+f.ws1*t), pr*(f.ht0*tt+f.ht1*t),
				     0, 0, 4096, 4096 );
		    }
		}
	    }
		
	    g.restore();

	}
	i++;
    }
    }

    if (window.taccgl_requestAnimationFrame) {
	jaccobj.reqAnimFrameId=taccgl_requestAnimationFrame (taccgl_draw2d); 
    } 

//   var uTimeEnd = (curt - jaccobj.draw_startTime) / jaccobj.draw_duration;
//   alert(uTimeEnd - uTime);
//   if (uTimeEnd - uTime > 1.0) {
//	jaccobj.drawImmediateTermDD()
//   }

 //   var vel = document.getElementById('taccglVertexNumber');
 //   if (vel) vel.innerHTML = jaccobj.draw_vertexnumber + '/' + jaccobj.draw_frames;
}

// OBJ File taccgl Module
function taccglObjFile () {
    this.onload = this.onreadystatechange=null; this.vready="init"; this.verror=false;
    this.loadmtl = true;
    this.read = function (url, async){
	this.faces = Array(0);
	if (!taccgl.dddmode) {
	    this.vready=this.verror="ddmode"; 
	    this.mtl = new taccglMtlFile (); this.mtl.vready=this.mtl.verror="ddmode"; 
	    var t=this;
            setTimeout (function () {
                taccgl.doHook(t.onload,t);
	    },1);
	    return; 
	}
	if (!async) async=false;
	if (window.taccgl_nocache) { 	 
	    var curt =  new Date().getTime();
	    url += "?t="+curt
	}
	this.url = url;
	this.req=null;
	if ("ActiveXObject" in window) this.req = new ActiveXObject("MSXML2.XMLHTTP.6.0");
	if (!this.req) this.req = new XMLHttpRequest();
	this.req.open ("GET",url,async); this.vready="loading";
	if (async) {
	    var objfile = this;
	    this.req.onreadystatechange = function () {
		objfile.readyStateChange();
	    }
	}
	this.req.send();
	if (!async) {
	    this.processRequest(this.req);
	    if (this.vready=="ready" && this.loadmtl) {
		this.mtl = new taccglMtlFile ();
		this.mtl.read(this.mtlurl(),async);
	    }
	}
    }
    this.ready  = function () {return this.vready;}
    this.error  = function () {return this.verror;}
    this.mtlurl = function() {
	if (/\//.test(this.url)) return (this.url.replace (/^(.*)\/([^\/]+)$/,"$1/"+this.mtllib));
	else return this.mtllib;
    }
    this.readyStateChange = function (){
	// note this becomes not a method of the taccglObjFile but of the reqest
	taccgl.doHook(this.onreadystatechange,this);
	if (this.req.readyState==4) {
	    this.processRequest(this.req);
	    if (this.vready=="ready" && this.loadmtl) {
		this.mtl = new taccglMtlFile ();
		this.mtl.obj=this;
		this.mtl.read(this.mtlurl(),true);
		this.vready="loading";
	    } else {
		taccgl.doHook(this.onload,this);
	    }
//	    alert ("request finished");
	}
    }
    this.initvb = function (n){
	this.vb =  new ArrayBuffer(n);
	this.vf =  new Float32Array (this.vb);
	this.vbsize=n;
    }
    this.resizevb = function (){
	var vf=this.vf, vbsize=this.vbsize;
        this.initvb (2*vbsize);
        var i, k=vbsize/4;
	for (i=0; i<k; i++) {this.vf[i]=vf[i];}
    }
    this.initfb = function (n){
	this.fb =  new ArrayBuffer(n);
	this.fi =  new Int32Array (this.fb);
	this.fbsize=n;
    }
    this.resizefb = function (){
	var fi=this.fi, fbsize=this.fbsize;
        this.initfb (2*fbsize);
        var i, k=fbsize/4;
	for (i=0; i<k; i++) {this.fi[i]=fi[i];}
    }
    this.initData = function () {
	var size=100;
	this.initvb(size); this.initfb(size);
	this.facesMaterial =Array(0);
	this.objects = new this.createObjects();
	this.currentObject = null;
    }
    this.createObject = function (){};
    this.createObjects = function (){};
    this.processRequest = function(req) {
	if (req.status!=200 && req.status!=0) {
	    this.vready="error"; this.verror = req.statusText; return;
	}
        this.initData();
	var nextv=0, nextvt=0, nextvn=0, nextf=0, p;

//	alert ("request finished");
	var r = /(\#.*)|(mtllib .*)|(o .*)|(vt?n?) ([0-9.-]+) ([0-9.-]+)( ([0-9.-]*))?$|([0-9.-]+)|(usemtl .*)|(f .*)|(s .*)/gm;
	var rf = /(\n)|([0-9-]+)(\/([0-9-]*)(\/([0-9-]+))?)?/g;
	var a, af;
	var rtxt = req.responseText;
	while ((a = r.exec (rtxt))!=null) {
            if (a[4]) {
		var x= parseFloat (a[5]);
		var y= parseFloat (a[6]);
		var z= parseFloat (a[7]);
		if (a[4]=="v")  { p= nextv*9; nextv++;}
		if (a[4]=="vt") { 
		    p= 3+nextvt*9; nextvt++;}
		if (a[4]=="vn") { p= 6+nextvn*9; nextvn++;}
		if (4*p+12>=this.vbsize) this.resizevb();
		this.vf[p]=x; this.vf[p+1]=y; this.vf[p+2]=z;
	    }
	    if (a[11]){
//		rf.lastIndex=r.lastIndex;
		this.faces.push(nextf); this.facesMaterial.push(currentMaterial);
//		taccgl.clog ("New Face at "+nextf);
		while ((af = rf.exec (a[11]))!=null && af[1]==null) {
		    var vnr=parseInt(af[2]);
		    var vtnr=parseInt(af[4]); if(isNaN(vtnr)) vtnr=0;
		    var vnnr=parseInt(af[6]); if(isNaN(vnnr)) vnnr=0;
		    if (12*nextf+12>=this.fbsize) 
			this.resizefb();
		    this.fi [3*nextf]=vnr;
		    if (vnr<0) alert ("Cannot handle negative vertex index");
		    this.fi [3*nextf+1]=vtnr;
		    this.fi [3*nextf+2]=vnnr;
		    nextf++;
//		    taccgl.clog (a[0]);
		}
//		r.lastIndex = rf.lastIndex; 
//		this.fi [3*(nextf-1)]=-vnr;
	    } else 
		if (a[3]) {
		    var n=a[3].replace(/o /,"");
		    if (this.currentObject){
			this.currentObject.endFace=this.faces.length-1;
			this.currentObject.endf=nextf; this.currentObject.endv=nextvt; this.currentObject.endvn=nextvn; this.currentObject.endvt=nextvt;
		    }
		    this.objects[n]=this.currentObject=new this.createObject();
		    this.currentObject.startFace=this.faces.length;
		    this.currentObject.bgf=nextf; this.currentObject.bgv=nextvt; this.currentObject.bgvn=nextvn; this.currentObject.bgvt=nextvt;
		} else if (a[10]) {
		    var currentMaterial=a[10].replace(/usemtl /,"");
		} else if (a[2]) {
		    this.mtllib=a[2].replace(/mtllib /,"")
		}  

//	    taccgl.clog (a[0]);

//	    taccgl.clog (a[1]);
//	    taccgl.clog (r.lastIndex);
	    if (r.lastIndex==0) return;
	}
	if (this.currentObject){
	    this.currentObject.endFace=this.faces.length-1;
	    this.currentObject.endf=nextf; this.currentObject.endv=nextvt; this.currentObject.endvn=nextvn; this.currentObject.endvt=nextvt;
	}
	this.faceNumber = nextf;
	this.vready="ready";
    }
    this. scene = function () {
	var a=new taccgl.DDDObject(this,true); return a;
    }
    this. objs = function (o) {
	var a=new taccgl.DDDObject(this,o); return a;
    }
}

taccgl.objFile = function (url, async, onload) {
    if (!this.initialized) this.begin();
    var f = new taccglObjFile ();
    if (onload) f.onload=onload;
    f.read(url,async);
    return (f);
}

function taccglMtlFile () {
    // this part was copied unchanged so far from OBJ File, consider inheriting
    this.onload = this. onreadystatechange=null; this.vready="init"; this.verror=false;
    this.ready  = function () {return this.vready;}
    this.error  = function () {return this.verror;}
    this.read = function (url, async){
	if (!async) async=false;
	if (window.taccgl_nocache) { 	 
	    var curt =  new Date().getTime();
	    url += "?t="+curt
	}
	this.req=null;
	if ("ActiveXObject" in window) this.req = new ActiveXObject("MSXML2.XMLHTTP.6.0");
	if (!this.req)	this.req = new XMLHttpRequest();
	this.req.open ("GET",url,async);
	if (async) {
	    var mtlfile=this;
	    this.req.onreadystatechange = function () {
		mtlfile.readyStateChange();
	    }
	}
	this.req.send();
	if (!async) {
	    this.processRequest(this.req);
	}
    }
    this.readyStateChange = function (){
	// note this becomes a method of the taccglObjFile but of the reqest
	taccgl.doHook(this.onreadystatechange,this);
	if (this.req.readyState==4) {
	    this.processRequest(this.req);
	    var obj=this.obj;
	    if (obj) {
		obj.vready=this.vready;
		taccgl.doHook(obj.onload,obj);
	    } else
		taccgl.doHook(this.onload,this);
//	    alert ("request finished");
	}
    }
    // end copied part
    this.initData = function () {
	this.materials = new this.createMaterials();
    }
    this.createMaterial = function (){};
    this.createMaterials = function (){};
    this.processRequest = function(req) {
	if (req.status!=200 && req.status!=0) {
	    this.vready="error"; this.verror = req.statusText; return;
	}
        this.initData();
	var r = /(\#.*)|(newmtl .*)|(Ns .*)|(Ni .*)|(Ka?d?s?) ([0-9.-]+) ([0-9.-]+) ([0-9.-]+)|(d .*)|(illum .*)/g;
	var a, m, s;
	var autoAmbAdjust = false;
        // console.log ("MTL Text="+req.responseText);
	while ((a = r.exec (req.responseText))!=null) {
	    if (a[5]) {
		var cr=parseFloat (a[6]);
		var cg=parseFloat (a[7]);
		var cb=parseFloat (a[8]);
		if (a[5]=="Ka") {m.ambR=cr; m.ambG=cg; m.ambB=cb;
				 if (cr>0 || cg >0 || cb>0)  autoAmbAdjust = false;
				}
		if (a[5]=="Kd") {m.diffR=cr; m.diffG=cg; m.diffB=cb;}
		if (a[5]=="Ks") {m.specR=cr; m.specG=cg; m.specB=cb;}
	    } else if (a[3]) {
		s=a[3].replace(/Ns /,"");
		m.Ns=parseFloat (s);
	    } else if (a[4]) {
		s=a[4].replace(/Ni /,"");
		m.Ni=parseFloat (s);
	    } else if (a[2]) {
		var mn=a[2].replace(/newmtl /,"");
		m = new this.createMaterial(); this.materials[mn]=m;
	    } else if (a[10]) {
		s=a[10].replace(/illum /,"");
		m.illum=parseInt (s);
	    } else if (a[9]) {
		s=a[9].replace(/d /,""); s=s.replace(/Tr /,"");
		m.transp=parseFloat (s);
	    } else if (a[1]) {
		if (a[1].match(/Blender/)) autoAmbAdjust = true; 
	    }
		
	}
	this.vready="ready";
        if ( autoAmbAdjust ) this.ambientAdjust (0.6,0.6);
    }
    this.defaultSpec = function (specular, shininess, min) {
	var mn,m;
	if (!min) min=0;
	for (mn in this.materials){
	    m = this.materials[mn];
	    if (m.Ns <= min) {
		m.Ns=shininess;
		m.specR=m.specB=m.specG=specular;
	    }
	}
    }
    this.ambientAdjust = function (f,d,s) {
	if (!d && d!=0) d=1;
	if (!s && s!=0) s=1;
	var mn,m;
	for (mn in this.materials){
	    m = this.materials[mn];
	    m.ambc=f; m.diffc=d; m.specc=s;
	}
    }
}

taccgl.mtlFile = function (url, async) {
    var f = new taccglMtlFile ();
    f.read(url,async);
    return (f);
}



// var to = new taccglImportObj();
// to.read("http://taccgl.h-e-i.de/objtest/objtestempty.obj");

function taccgl3DObjectPrototype ()
{
    this.initSuper = taccgl.taccglAnim.prototype.init;
    this.init = function (el){
//	this.face = Array(0);
	this.initSuper(el);
	this.objt=null;
	this.dz0=this.dz1=this.hy0;
	this.flags=16; this.docolor=true;
	this.col0s=-32768; this.col0t=-32768; this.col1s=-32768; this.col1t=-32768; this.mix0=1; this.mix1=1; this.mixs0=0; this.mixs1=0;
	this.dddo0=this.dddo1=1;
    }
    this.actorInit = function (el){ this.init(el);}
    this.contInit = function (el) { this.init(el);}

    this.getModMat = function () {
	if (!this.objt) {this.objt = [1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1];} 
	return this.objt;
    }
    this.setModMat = function (t) {
	this.objt = t; return this;
    }

    this.dMMVertex = function (vnr) {
	var j=(vnr-1)*9;
	var x = this.ofi.vf[j];
	var y = this.ofi.vf[j+1];
	var z = this.ofi.vf[j+2];
	if (x<this.obj_xmin) this.obj_xmin=x; 
	if (y<this.obj_ymin) this.obj_ymin=y; 
	if (z<this.obj_zmin) this.obj_zmin=z; 
	if (x>this.obj_xmax) this.obj_xmax=x; 
	if (y>this.obj_ymax) this.obj_ymax=y; 
	if (z>this.obj_zmax) this.obj_zmax=z; 
    }
    this.dMMFace = function (i,j) {
	var k;
	for (k=i;k<j;k++) {
	    this.dMMVertex(this.ofi.fi[3*k]);
	}
    }
    this.dMMFaces = function (f,t){
	var i;
	for (i=f; i<=t; i++) {
	    var e;
	    if (i<this.ofi.faces.length-1) e=this.ofi.faces[i+1]; else e=this.ofi.faceNumber;
	    this.dMMFace (this.ofi.faces[i],e);
	}
    }
    this.determineMinMax = function (selObjects) {
	this.obj_xmax=-1E39;this.obj_ymax=-1E39;this.obj_zmax=-1E39;
	this.obj_xmin=1E39;this.obj_ymin=1E39;this.obj_zmin=1E39;

	if (!selObjects) selObjects=this.selObjects;
	if (selObjects==true) {
	    this.dMMFaces (0,this.ofi.faces.length-1)
	} else {
	    var rex=new RegExp(selObjects);
	    var n;
	    for (n in this.ofi.objects) {
		if (rex.test(n)) {
		    var o=this.ofi.objects[n];
		    this.dMMFaces (o.startFace,o.endFace)
		}
	    }
	}
/*
	var i;

	for (i=0; i<this.ofi.faces.length-1; i++) {
	    this.dMMFace (this.ofi.faces[i],this.ofi.faces[i+1]);
	}
	if (this.ofi.faces.length>0)
	    this.dMMFace(this.ofi.faces[this.ofi.faces.length-1],this.ofi.faceNumber);
*/


    }

    

    this.makeFit = function (axis, align, selObjects) {
	this.modFit (align,axis,selObjects); return this;
    }

    this.modFit  = function (align, axis, selObjects) { 
	if (!taccgl.dddmode) {this.objt=[1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1]; return this;}
	if (!axis) axis="xyz";
	this.determineMinMax(selObjects);
	
	if (!align) {
	    this.objt =  [1/(this.obj_xmax-this.obj_xmin),0,0,-this.obj_xmin/(this.obj_xmax-this.obj_xmin), 
			  0,1/(this.obj_ymax-this.obj_ymin),0,-this.obj_ymin/(this.obj_ymax-this.obj_ymin), 
			  0,0,1/(this.obj_zmax-this.obj_zmin),-this.obj_zmin/(this.obj_zmax-this.obj_zmin),  0,0,0,1];
	} else if (axis.match(/x|X|y|Y|z|Z/)) {
	    var s=1E39; var m;
  	    var hs0=  Math.sqrt(this.hx0*this.hx0+this.hy0*this.hy0+this.hz0*this.hz0);
	    var ws0=  Math.sqrt(this.wx0*this.wx0+this.wy0*this.wy0+this.wz0*this.wz0);
	    var ds0=  Math.sqrt(this.dx0*this.dx0+this.dy0*this.dy0+this.dz0*this.dz0);
	    if (axis.match(/x|X/)) { m = ws0/(this.obj_xmax-this.obj_xmin); if (m<s) s=m;}
	    if (axis.match(/y|Y/)) { m = hs0/(this.obj_ymax-this.obj_ymin); if (m<s) s=m;}
	    if (axis.match(/z|Z/)) { m = ds0/(this.obj_zmax-this.obj_zmin); if (m<s) s=m;}
	    this.objt =  [s/ws0,0,0,-this.obj_xmin*s/ws0, 
			  0,s/hs0,0,-this.obj_ymin*s/hs0, 
			  0,0,s/ds0,-this.obj_zmin*s/ds0, 0,0,0,1];
	    if (align.length<3) align+="   ";
	    if (align[0].match(/r|b/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; this.objt[3]+= 1-m;
	    } else if (align[0].match(/L|T/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; this.objt[3]+= -m;
	    } else if (align[0].match(/c/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; this.objt[3]+= -m/2;
	    } else if (align[0].match(/R|B/)) {
		m = (this.obj_xmax-this.obj_xmin)*s/ws0; this.objt[3]+= 1;
	    } else  if (align[0].match(/m|M/)) {
		m = (this.obj_xmax-this.obj_xmin)*s*0.5/ws0; this.objt[3]+= 0.5-m;
	    } else  if (align[0].match(/C/)) {
		m = (this.obj_xmax-this.obj_xmin)*s*0.5/ws0; this.objt[3]+= 1-m;
	    } else  if (align[0].match(/s/)) {
		this.objt[3] = -this.obj_xmin/(this.obj_xmax-this.obj_xmin);
		this.objt[0] = 1/(this.obj_xmax-this.obj_xmin);
	    } else  if (align[0].match(/S/)) {
		this.objt[3] = -this.obj_xmin/(this.obj_xmax-this.obj_xmin)-1;
		this.objt[0] = 1/(this.obj_xmax-this.obj_xmin);
	    }
	    if (align[1].match(/r|b/)) {
		m = (this.obj_ymax-this.obj_ymin)*s/hs0; this.objt[7]+= 1-m;
	    } else if (align[1].match(/L|T/)) {
		m = (this.obj_ymax-this.obj_ymin)*s/hs0; this.objt[7]+= -m;
	    } else if (align[1].match(/c/)) {
		m = (this.obj_ymax-this.obj_ymin)*s/hs0; this.objt[7]+= -m/2;
	    } else  if (align[1].match(/B/)) {
		m = (this.obj_ymax-this.obj_ymin)*s*0.5/hs0; this.objt[7]+= 1;
	    } else  if (align[1].match(/m|M/)) {
		m = (this.obj_ymax-this.obj_ymin)*s*0.5/hs0; this.objt[7]+= 0.5-m;
	    } else  if (align[1].match(/C/)) {
		m = (this.obj_ymax-this.obj_ymin)*s*0.5/hs0; this.objt[7]+= 1-m;
	    } else  if (align[1].match(/s/)) {
		this.objt[7] = -this.obj_ymin/(this.obj_ymax-this.obj_ymin);
		this.objt[5] = 1/(this.obj_ymax-this.obj_ymin);
	    } else  if (align[1].match(/S/)) {
		this.objt[7] = -this.obj_ymin/(this.obj_ymax-this.obj_ymin)-1;
		this.objt[5] = 1/(this.obj_xmax-this.obj_xmin);
	    }
	    if (align[2].match(/b/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; this.objt[11]+= 1-m;
	    } else if (align[2].match(/c/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; this.objt[11]+= -m/2;
	    } else if (align[2].match(/F/)) {
		m = (this.obj_zmax-this.obj_zmin)*s/ds0; this.objt[11]+= -m;
	    } else  if (align[2].match(/m/)) {
		m = (this.obj_zmax-this.obj_zmin)*s*0.5/ds0; this.objt[11]+= 0.5-m;
	    } else  if (align[2].match(/C/)) {
		m = (this.obj_zmax-this.obj_zmin)*s*0.5/ds0; this.objt[11]+= 1-m;
	    } else  if (align[2].match(/B/)) {
		m = (this.obj_zmax-this.obj_zmin)*s*0.5/ds0; this.objt[11]+= 1;
	    } else  if (align[2].match(/s/)) {
		this.objt[11] = -this.obj_zmin/(this.obj_zmax-this.obj_zmin);
		this.objt[10] = 1/(this.obj_zmax-this.obj_zmin);
	    } else  if (align[2].match(/S/)) {
		this.objt[11] = -this.obj_zmin/(this.obj_zmax-this.obj_zmin)-1;
		this.objt[10] = 1/(this.obj_zmax-this.obj_zmin);
	    }

	}
	return this;
    }

    this.opacity3D = function (o0, o1) {
	if (typeof (o0)=="number") { this.dddo0 = o0; this.dddo1=o0; }
	if (typeof (o1)=="number") this.dddo1 = o1;
    }

    this.cont = function () {
	var an = new taccgl.DDDObject (this.ofi,this.selObjects);
	an.contInit(this.el);
	an.objt = this.objt.slice(0);
	if (this.elshowatend) this.contShiftAtEndAction(an);
	this.contIntern (an); 
	return (an);
    }


    // triangle generation follows
    this.getVertexCoord = function (vnr) {
	var j=(vnr-1)*9;
	var xx = this.ofi.vf[j];
	var yy = this.ofi.vf[j+1];
	var zz = this.ofi.vf[j+2];
	/*
	var t=this.objt;
	var x = xx*t[0]+yy*t[1]+zz*t[2]+t[3];
	var y = xx*t[4]+yy*t[5]+zz*t[6]+t[7];
	var z = xx*t[8]+yy*t[9]+zz*t[10]+t[11];
	this.ox = x*this.wx0+y*this.hx0+z*this.dx0+ this.x0;
	this.oy = x*this.wy0+y*this.hy0+z*this.dy0+ this.y0;
	this.oz = x*this.wz0+y*this.hz0+z*this.dz0+ this.z0;
	*/
	var t=this.objt0;
	this.ox = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; // +this.x0;
	this.oy = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; // +this.y0;
	this.oz = xx*t[8]+yy*t[9]+zz*t[10]+t[11]; // +this.z0;
    }
    this.startVertex = function (vnr,vtnr,vnnr) {
	var j=(vnr-1)*9;
	var xx = this.ofi.vf[j];
	var yy = this.ofi.vf[j+1];
	var zz = this.ofi.vf[j+2];
/*	var t=this.objt;
	var xt = xx*t[0]+yy*t[1]+zz*t[2]+t[3];
	var yt = xx*t[4]+yy*t[5]+zz*t[6]+t[7];
	var zt = xx*t[8]+yy*t[9]+zz*t[10]+t[11];
	var x = xt*this.wx0+yt*this.hx0+zt*this.dx0+this.x0;
	var y = xt*this.wy0+yt*this.hy0+zt*this.dy0+this.y0;
	var z = xt*this.wz0+yt*this.hz0+zt*this.dz0+this.z0;
	var x1 = xt*this.wx1+yt*this.hx1+zt*this.dx1+this.x1;
	var y1 = xt*this.wy1+yt*this.hy1+zt*this.dy1+this.y1;
	var z1 = xt*this.wz1+yt*this.hz1+zt*this.dz1+this.z1;
//	x = x1+this.x0;	y = y1+this.y0;	z = z1+this.z0;
//	x1= x1+this.x1;	y1= y1+this.y1;	z1= z1+this.z1;
*/
	var t=this.objt0;
	var x = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; // +this.x0;
	var y = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; // +this.y0;
	var z = xx*t[8]+yy*t[9]+zz*t[10]+t[11]; // +this.z0;
	t=this.objt1;
	var x1 = xx*t[0]+yy*t[1]+zz*t[2]+t[3]; // +this.x1;
	var y1 = xx*t[4]+yy*t[5]+zz*t[6]+t[7]; // +this.y1;
	var z1 = xx*t[8]+yy*t[9]+zz*t[10]+t[11]; // +this.z1;
	
	var nx=0, ny=0, nz=0, spec=this.flightSpecular + this.flightShininess;
	if (vnnr) {
	    j=(vnnr-1)*9;
	    xx = this.ofi.vf[j+6]; yy = this.ofi.vf[j+6+1]; zz = this.ofi.vf[j+6+2]; 	
	    t=this.objt0inv;
	    nx = xx*t[0]+yy*t[1]+zz*t[2];
	    ny = xx*t[3]+yy*t[4]+zz*t[5];
	    nz = xx*t[6]+yy*t[7]+zz*t[8];
	    /* var xt = xx*t[0]+yy*t[1]+zz*t[2];
	    var yt = xx*t[4]+yy*t[5]+zz*t[6];
	    var zt = xx*t[8]+yy*t[9]+zz*t[10];
	    var nx = xt*this.wx0+yt*this.hx0+zt*this.dx0;
	    var ny = xt*this.wy0+yt*this.hy0+zt*this.dy0;
	    var nz = xt*this.wz0+yt*this.hz0+zt*this.dz0; */
	} else {
            nx = this.nx; ny = this.ny; nz = this.nz;
 	}
	var s0=this.s0, t0=this.t0; var mix=this.mix0;
	if (vtnr) {
	    j=(vtnr-1)*9;
	    s0 += this.ofi.vf[j+3]*this.ws0; t0 += (1-this.ofi.vf[j+4])*this.ht0; mix=1;
	} 
        taccgl.nvertMove (x, y, z   ,x1, y1, z1
			  ,nx,ny,nz,spec,  s0,t0,  this.fflags,this.basetime,this.vduration);
//	taccgl.nvertColor (this.fcol0s,this.fcol0t,this.fcol1s, this.fcol1t, this.fmix0, this.fmix1, this.fmixs0, this.fmixs1); 

        if (this.rotation) {
	     taccgl.nvertRot(this.rotpx,this.rotpy,this.rotpz,this.rotax,this.rotay,this.rotaz,this.rotfrom,this.rotto);
	}
	if (this.doacceleration){
	    taccgl.nvertAcceleration(this.ax,this.ay,this.az); 
	}
    }
    this.startTriangle = function (a,at,an,b,bt,bn,c,ct,cn) {
//	an=bn=cn=0;
	if (an==0 || bn==0 || cn==0) {
	    this.getVertexCoord (a); var ax=this.ox; var ay=this.oy; var az=this.oz;
	    this.getVertexCoord (b); var bx=this.ox; var by=this.oy; var bz=this.oz;
	    this.getVertexCoord (c); var cx=this.ox; var cy=this.oy; var cz=this.oz;
	    this.nx = (by-ay)*(cz-az) - (bz-az)*(cy-ay);
            this.ny = (bz-az)*(cx-ax) - (bx-ax)*(cz-az);
            this.nz = (bx-ax)*(cy-ay) - (by-ay)*(cx-ax);
	}
//	console.log("Triangle "+a+","+b+","+c+"vertI="+taccgl.vertI);
	this.startVertex (a,at,an);
	this.startVertex (b,bt,bn);
	this.startVertex (c,ct,cn);
	taccgl.nvertColor3 (this.fcol0s,this.fcol0t,this.fcol1s, this.fcol1t, this.fmix0, this.fmix1, this.fmixs0, this.fmixs1); 
    }
    this.startMapElement = function () {
	var t=taccgl;
	if (!this.dotexmove) {this.s1=this.s0; this.t1=this.t0; this.ws1=this.ws0; this.ht1=this.ht0;}
	t.nvertOffset(-5);
/*
	t.nvertTexMove4 (this.s0,this.t0,this.s1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0,this.s1+this.ws1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.ht0,this.s1+this.ws1,this.t1+this.ht1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0,this.s1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.ht0,this.s1+this.ws1,this.t1+this.ht1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0+this.ht0,this.s1,this.t1+this.ht1);
*/
	t.nvertTexMove4 (this.s0,this.t0+this.ht0,this.s1,this.t1+this.ht1);t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0+this.ht0,this.s1+this.ws1,this.t1+this.ht1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0,this.s1+this.ws1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0+this.ht0,this.s1,this.t1+this.ht1);t.nvertOffset(1);
	t.nvertTexMove4 (this.s0+this.ws0,this.t0,this.s1+this.ws1,this.t1); t.nvertOffset(1);
	t.nvertTexMove4 (this.s0,this.t0,this.s1,this.t1); 
    }
    this.startFace = function (i,j,mn) {
//	taccgl.clog("start Face "+i+","+j);
	var k;
	var ms=this.ofi.mtl.materials;
	var m=null;
	if (ms) { m=ms[mn];}
	if (mn=="HTML")  if ( j-i==4 || this.ofi.fi[3*i+1]!=0 ) m=null;
//	if (this.ofi.fi[3*i+1]!=0) m=null;
	if (m) {
	    var ambc, diffc, specc;
	    if (!m.ambc) ambc=0; else ambc=m.ambc;
	    if (!m.diffc && m.diffc!=0) diffc=1; else diffc=m.diffc;
	    if (!m.specc && m.specc!=0) specc=1; else specc=m.specc;
	    var R=m.ambR+m.diffR*ambc;
	    var G=m.ambG+m.diffG*ambc;
	    var B=m.ambB+ambc*m.diffB;
	    if (R>1) R=1;
	    if (G>1) G=1;
	    if (B>1) B=1;
	    this.fflags = (this.flags | 48 ) & ~64;
	    this.fcol0s = Math.floor(R*255)+256*(Math.floor(G*255)-128); 
	    this.fcol0t = this.dddo0*255+256*(Math.floor(255*B)-128);
	    this.fcol1s = Math.floor(diffc*m.diffR*255)+256*(Math.floor(diffc*m.diffG*255)-128); 
	    this.fcol1t = this.dddo1*255+256*(Math.floor(diffc*255*m.diffB)-128);
	    this.flightSpecular=Math.min((m.specR+m.specG+m.specB)/3,0.999)*specc; 
	    this.flightShininess=Math.round(m.Ns);
	    this.fmix0=0; this.fmix1=0; this.fmixs0=0; this.fmixs1=0;
	} else {
	    this.fflags = this.flags;
	    this.fcol0s = this.col0s; 
	    this.fcol0t = this.col0t;
	    this.fcol1s = this.col1s;
	    this.fcol1t = this.col1t;
	    this.flightSpecular= this.lightSpecular;
	    this.flightShininess= Math.round(this.lightShininess);
	    this.fmix0=this.mix0; this.fmix1=this.mix1; this.fmixs0=this.mixs0; this.fmixs1=this.mixs1;
	}

	// this.mix0=1; this.mix1=1;
	for (k=i+2;k<j;k++) {
	    this.startTriangle(this.ofi.fi[3*i],this.ofi.fi[3*i+1],this.ofi.fi[3*i+2], 
			       this.ofi.fi[3*(k-1)],this.ofi.fi[3*(k-1)+1],this.ofi.fi[3*(k-1)+2], 
			       this.ofi.fi[3*k],this.ofi.fi[3*k+1],this.ofi.fi[3*k+2]);
	}

	if (j-i==4 && mn=="HTML" && this.ofi.fi[3*i+1]==0) this.startMapElement();
    }
    this.startFaces = function (f,t){
	var i;
	for (i=f; i<=t; i++) {
	    var e;
	    if (i<this.ofi.faces.length-1) e=this.ofi.faces[i+1]; else e=this.ofi.faceNumber;
	    this.startFace (this.ofi.faces[i],e,this.ofi.facesMaterial[i]);
	}
    }
    this.start = function () {
	if (!taccgl.dddmode) return this;

        var maxindex=null, j=taccgl;
        if (this.astepdelno==j.delno) {maxindex= j.vertI; j.vertI=this.vertindex;} else {this.vertindex=j.vertI;this.astepdelno=j.delno}

        var e = this.vduration + this.basetime;
        if (taccgl.duration < e) taccgl.setDuration(e);

	if (this.special) this.startSpecial();

//	if (!this.objt) {this.objt = [1,0,0,0, 0,1,0,0, 0,0,1,0];}
//	if (!this.objt) {this.objt = [0.1,0,0,0.5, 0,0.1,0,1, 0,0,0.1,1, 0,0,0,1];}
	if (!this.objt) {this.objt = [1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1];}

/*
	this.objt0 = taccgl.m44Mul ([this.wx0, this.wy0, this.wz0, 0, this.hx0, this.hy0, this.hz0, 0, this.dx0, this.dy0, this.dz0, 0,
				     this.x0, this.y0, this.z0, 1], this.objt);
	this.objt1 = taccgl.m44Mul ([this.wx1, this.wy1, this.wz1, 0, this.hx1, this.hy1, this.hz1, 0, this.dx1, this.dy1, this.dz1, 0,
				     this.x1, this.y1, this.z1, 1], this.objt);

*/

	this.objt0 = taccgl.m44Mul ([this.wx0, this.hx0, this.dx0, this.x0,
				     this.wy0, this.hy0, this.dy0, this.y0,
				     this.wz0, this.hz0, this.dz0, this.z0,
				     0, 0,  0, 1], this.objt);

	this.objt1 = taccgl.m44Mul ([this.wx1, this.hx1, this.dx1, this.x1,
				     this.wy1, this.hy1, this.dy1, this.y1,
				     this.wz1, this.hz1, this.dz1, this.z1,
				     0, 0,  0, 1], this.objt);


	this.objt0inv = taccgl.m33T(taccgl.m33Inverse(taccgl.m33FromM44(this.objt0)));
//	if (taccgl_debug) {
//	    taccgl.clog (taccgl.m33ToString(this.objt0inv));
//        } // taccgl_debug_end


	if (this.selObjects==true) {
	    this.startFaces (0,this.ofi.faces.length-1)
	} else {
	    var rex=new RegExp(this.selObjects);
	    var n;
	    for (n in this.ofi.objects) {
		if (rex.test(n)) {
		    var o=this.ofi.objects[n];
		    this.startFaces (o.startFace,o.endFace)
		}
	    }
	}
	this.vertEndIndex=j.vertI;
	if (maxindex) j.vertI=maxindex;
	if (this.p!=j.stdsc) j.setShader(j.stdsc);
	return this;
    }
    this.clone = function (a) { return new this.taccglDDDObjectClone (this); }
    this.taccglDDDObjectClone = function (a) {
	this.taccglAnimClone (a);
	this.objt=a.objt.slice(0);
	this.dddo0=a.dddo0; this.dddo1=a.dddo1;
	this.obj_xmin=a.obj_xmin;
	this.obj_ymin=a.obj_ymin;
	this.obj_zmin=a.obj_zmin;
	this.obj_xmax=a.obj_xmax;
	this.obj_ymax=a.obj_ymax;
	this.obj_zmax=a.obj_zmax;
	this.ofi=a.ofi;
	this.selObjects=a.selObjects;
    }
}
taccgl.DDDObject = function(f,objects) {this.ofi=f;this.selObjects=objects;}
taccgl3DObjectPrototype.prototype =  taccgl.taccglAnim.prototype;
taccgl.DDDObject.prototype=new taccgl3DObjectPrototype();
taccgl.DDDObject.prototype.taccglDDDObjectClone.prototype = taccgl.DDDObject.prototype;

function taccglControllerPrototype ()
{
    this.baseinit = function () {
	this.can=document.getElementById ("taccgl_canvas3d");
	if (!taccgl.overs) taccgl.overs=new Array(0);
	this.automaticMouseMoveOut=true;
    }
    this.init= function () { this.baseinit();}
    this.attachEventForwarding = function() { }
    this.detachEventForwarding = function() { }
    this.attach = function() { this.baseAttach(); }
    this.baseAttach = function (){
	this.can=document.getElementById ("taccgl_canvas3d");
	this.attachEventForwarding ();
    }
    this.detach = function() { this.baseDetach(); }
    this.baseDetach = function (){
	this.detachEventForwarding ();
    }


    this.instMouseOverFilterClass = function (c,elimDoubleOver,elimSpontanousOut,delay){
	if (!document.getElementsByClassName) return;
	var s = document.getElementsByClassName(c);
	for (var i=0; i<s.length; i++) this.instMouseOverFilter(s[i],elimDoubleOver,elimSpontanousOut,delay);
    }

    this.elstr = function (e) {
	if (!e) return e+"";
	var str="";
	if (e.tagName) str+=e.tagName;
	str+="#";
	if (e.id && e.id+""!="undefined") str+=e.id;
	str+=" ";
	return str;
    }
    

    this.instMouseOverFilter = function (el,elimDoubleOver,elimSpontanousOut,delay) {
	if (typeof (el)=="string") el=document.getElementById(el);
	var ov=el.onmouseover;
        var out=el.onmouseout;
	var con=this;
	if (!delay) delay=0;
	if (ov && !ov.istaccglfilter) {
	    el.onmouseover=function(e){
		if (!e) e=window.event;
		if (taccgl_debug) {
		    taccgl.clog("filtered mouseover"+ " fromElement="+taccgl.controller.elstr(e.fromElement) + 
			    "toElement="+taccgl.controller.elstr(e.toElement) + 
			    "target="+taccgl.controller.elstr(e.target) + 
			    "relatedTarget="+taccgl.controller.elstr(e.relatedTarget) );
		} // taccgl_debug_end
		con.prevFound=e.target;
		if (!e.fromElement || e.fromElement.id!="taccgl_canvas3d") {
		    var i=0; while (i<taccgl.overs.length && taccgl.overs[i]!=el) i++;
		    if (i<taccgl.overs.length) {
			if (elimDoubleOver) return;
		    } else taccgl.overs.push(el);
		    if (delay==0) {ov(e)} else {
			if (el.outTimer) {
			    clearTimeout (el.outTimer); el.outTimer=null;
			} else {
			    el.overTimer = setTimeout (
				function () { el.overTimer=null; ov(e)}, 
				delay);
			}
		    }
		}
	    }
	    el.onmouseover.istaccglfilter=true;
	}
	if (out && !out.istaccglfilter) {
	    el.onmouseout=function(e){
		if (!e) e=window.event;
		if (taccgl_debug) {
		    taccgl.clog("filtered mouseout"+ " fromElement="+taccgl.controller.elstr(e.fromElement) + 
				"toElement="+taccgl.controller.elstr(e.toElement) + 
				"target="+taccgl.controller.elstr(e.target) + 
				"relatedTarget="+taccgl.controller.elstr(e.relatedTarget) );
		} // taccgl_debug_end
		if (!e.toElement || e.toElement.id!="taccgl_canvas3d") {
		    if (con.prevFound==el) con.prevFound=null;
		    var i=0; while (i<taccgl.overs.length && taccgl.overs[i]!=el) i++;
		    if (i>=taccgl.overs.length) {
			if (elimSpontanousOut) { /* taccgl.clog("eliminate mouseout");*/ return;}
		    } else 
			taccgl.overs.splice(i,1);
		    if (delay==0) { /* taccgl.clog("forward mouseout immediately"); */ out(e);} else {
			if (el.overTimer){
			    // taccgl.clog("clear mouseover and do not mouseout");
			    clearTimeout (el.overTimer); el.overTimer=null;
			} else {
			    // taccgl.clog("pending mouseout");
			    el.outTimer = setTimeout (
				function () { el.outTimer=null;/* taccgl.clog("forward delayed mouseout"); */ out(e)}, 
				delay);
			}
		    }
		}
	    }
	    el.onmouseout.istaccglfilter=true;
	}
    }

    this.bodyOnMouseMove = function (e) {
	if (!e) e=window.event;
	if (!this.automaticMouseMoveOut) return;
	if (!document.createEvent) return;
	var p=e.target;
	if (!p) e=e.srcElement;
	if (p && p.id && p.id=="taccgl_canvas3d") return;
	var ov=new Array(0);
	while (p) {ov.push(p); p=p.parentElement;}
	var i=0; 
	while (i<taccgl.overs.length) {
	    var j=0;
	    while (j<ov.length && ov[j]!=taccgl.overs[i]) j++;
	    if (j>=ov.length) {
		var ovleave=taccgl.overs[i]; 
		if (document.createEvent) {
		    var ne=document.createEvent("MouseEvents");
		    ne.initMouseEvent ("mouseout",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
				       e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.target);
		    // Version following the newest standard not understood by older browsers
		    // var ne=new MouseEvent ("mouseout", {'view' : window, 'bubbles' : true, 'cancelable' : true });
		    if (taccgl_debug) {
			taccgl.clog("body.mouseMoveOut Dispach Mouseout to  prevFound="+this.elstr(taccgl.overs[i])+" foundEl="+this.elstr(this.foundEl)+" relatedTarget="+this.elstr(e.target));
		    } // taccgl_debug_end
		    
		    taccgl.overs[i].dispatchEvent (ne);;
		    // Version following the newest standard not understood by older browsers
		    // var ne=new MouseEvent ("mouseleave", {'view' : window, 'bubbles' : true, 'cancelable' : true });
		    ne=document.createEvent("MouseEvents");
		    ne.initMouseEvent ("mouseleave",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
				       e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.target);
		    ovleave.dispatchEvent (ne);
		}
		if (taccgl.overs[i]==ovleave) taccgl.overs.splice(i,1);
	    } else 
		i++;
	}
    }
}

function taccglForwardingControllerPrototype ()
{
    this.init = function () {
	this.baseinit();
    }

    this.invisibleCanvas = function (){
    }

    this.attachEventForwarding = function() {
	var t=this;
	if (this.can) {
	    this.can.onclick=function(e){t.fwonclick(e,"click");};
	    this.can.ondblclick=function(e){t.fwonclick(e,"dblclick");};
	    this.can.onmouseup=function(e){t.fwonclick(e,"mouseup");};
	    this.can.onmousedown=function(e){t.fwonclick(e,"mousedown");};
	    this.can.onmousemove=function(e){t.fwonmousemove(e);};
	    this.can.style.pointerEvents = "none";
	}
    }
    this.detachEventForwarding = function() {
	if (this.can) {
	    this.can.onclick= this.can.ondblclick= this.can.onmouseup= this.can.onmousedown=
		this.can.onmousemove=null;
	    this.can.style.pointerEvents = "all";
	}
    }

    this.findElement = function (x,y,el,op,bx,by,hid,zindex){
	this.can.style.visibility = "hidden";
	this.foundEl = document.elementFromPoint (x,y);
	this.can.style.visibility = "visible";
    }


    this.fwonclick = function(e,k) {
	this.foundEl=null;
	this.findElement(e.clientX, e.clientY);

	var ne=document.createEvent("MouseEvents");
	ne.initMouseEvent (k,e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);
	ne.toElement=this.foundEl;

        /* new std code not supported by IE 10
	var ne=new MouseEvent (k, {'view' : window, 'bubbles' : true, 'cancelable' : true });
        */
	if (this.foundEl) {
	    if (taccgl_debug) {
		taccgl.clog ("Dispatch onclick "+this.elstr(this.foundEl));
	    } // taccgl_debug_end
            this.foundEl.dispatchEvent (ne);
	}
    }
    this.fwonmouseout  = function(e,el) {
	var ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseout",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.foundEl);
	// ne.toElement=this.prevFound;
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseout", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	if (taccgl_debug) {
	    taccgl.clog("Dispach Mouseout to "+this.elstr(el)+" prevFound="+this.elstr(this.prevFound)+" foundEl="+this.elstr(this.foundEl)+" relatedTarget="+this.elstr(e.relatedTarget));
	} // taccgl_debug_end
        el.dispatchEvent (ne);
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseleave", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseleave",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.foundEl);
	// ne.toElement=this.prevFound;
        el.dispatchEvent (ne);
    }
    this.fwonmouseover = function(e,el) {
	var ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseover",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.prevFound);
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseover", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	if (taccgl_debug) {
	    taccgl.clog("Dispach Mouseover to "+this.elstr(el)+" foundEl="+this.elstr(this.foundEl)+" prevFound="+this.elstr(this.prevFound)+" relatedTarget="+this.elstr(e.relatedTarget));
	} // taccgl_debug_end
        el.dispatchEvent (ne);
	// Version following the newest standard not understood by older browsers
	// var ne=new MouseEvent ("mouseenter", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	ne=document.createEvent("MouseEvents");
	ne.initMouseEvent ("mouseenter",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			   e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,this.prevFound);
        el.dispatchEvent (ne);
    }
    this.fwonmousemove = function(e) {
	this.foundEl=null;
//	this.findElementTree(e.pageX, e.pageY, document.body, document.body, 0,0, false, "0");
	this.findElement(e.clientX, e.clientY);

	this.doHoverChain (e, this.prevFound, this.foundEl);
//	if (this.prevFound && this.prevFound != this.foundEl) this.fwonmouseout(e);

//	var ne=new MouseEvent ("mousemove", {'view' : window, 'bubbles' : true, 'cancelable' : true });
	if (this.foundEl) {
//	    taccgl.clog (this.foundEl.id + this.foundEl.tagName);
//            this.foundEl.dispatchEvent (ne);
//	    if (this.prevFound != this.foundEl) this.fwonmouseover(e);
	    var ne=document.createEvent("MouseEvents");
	    ne.initMouseEvent ("move",e.cancelBubble,e.cancelable,e.view,e.detail,e.screenX,e.screenY,
			       e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);
	    ne.toElement=this.foundEl;
            this.foundEl.dispatchEvent (ne);
	}
	this.prevFound = this.foundEl;
    }
    this.matchesOnElement = function (st,el) {
	var rx=/(,?([A-Za-z0-9][-_A-Za-z0-9]*))|(\.([A-Za-z0-9][-_A-Za-z0-9]*))|(#([A-Za-z0-9][-_A-Za-z0-9]*))|(:([A-Za-z0-9][-_A-Za-z0-9]*))/g;
	var tn=el.tagName.toLowerCase(), id=el.id, tagNameMatch=false, idSelector=false, idMatch=false, tagNameSelector=false,
	classSelector=false, classMatch=false, a, cn=el.className.toLowerCase();
	while ((a=rx.exec(st))!=null) {
	    if (a[1]) {
		tagNameSelector=true;
		if (a[2].toLowerCase()==tn) tagNameMatch=true;
		if (taccgl_debug) {
		    taccgl.clog (st+"/"+l+"/"+tn+"TAGNAME");
		} // taccgl_debug_end
	    } else if (a[3]) {
		classSelector=true;
		var l=a[4].toLowerCase();
		if (taccgl_debug) {
		    taccgl.clog (st+"/"+l+"/"+cn+"CLASSNAME");
		} // taccgl_debug_end
		if (l==cn || cn.indexOf (" "+l) != -1 || cn.indexOf (l+" ") != -1 ) classMatch=true;
	    } else if (a[5]) {
		idSelector=true;
		if (a[6]==id) idMatch=true;
	    }
	}
	return ( (idSelector && idMatch) ||
		 (!idSelector && (
		     (( (tagNameSelector && tagNameMatch) || !tagNameSelector) && (!classSelector || classMatch) ) 
		 )))
    }
    this.styleText = function (r){
	var cst = r.cssText;
	var rex=/{([^}]*)}/g;
	var a=rex.exec(cst);
	if (!a) return "";
	if (!a[1]) return "";
	return a[1];
    }
    this.doHoverChain = function (e,p,n) {
	var pc=new Array(0), nc=new Array(0), pp=p, nn=n;
	while (pp) {pc.push(pp); pp=pp.parentElement;}
	while (nn) {nc.push(nn); nn=nn.parentElement;}
	var ni=nc.length, pi=pc.length;
	while (ni>0 && pi>0 && pc[pi]===nc[ni]) {ni--; pi--}
	while (pi>0) { pi--; this.unHover(e,pc[pi]);}
	while (ni>0) { ni--; this.doHover(e,nc[ni]);}
    }
    this.doHover = function (e,el){
        this.fwonmouseover(e,el);
	var i,ss = document.styleSheets;
	if (el.tagName.toLowerCase()=="a") {  this.can.style.cursor = "pointer"; }
	for (i=0; i<ss.length; i++) {
	    var s=ss[i], j;
	    var rs = s.cssRules;
	    for (j=0; j<rs.length; j++) {
		var r=rs[j], st=r.selectorText;
		if (r.type==r.STYLE_RULE && st.match(/:hover/)) {
		    if (this.matchesOnElement(st,el)){
			if (!el.taccglNoHoverStyle) el.taccglNoHoverStyle=el.style.cssText;
			var as=this.styleText(r);
			if (el.tagName.toLowerCase()=="a") {
			    this.can.style.cursor = "pointer";
			    as = "cursor:pointer;"+as;
			}
			el.style.cssText=el.taccglNoHoverStyle+";"+as;
			if (taccgl_debug) {
			    taccgl.clog (el.tagName + " " + r.selectorText + " || " + r.cssText + " = " +as);
			} // taccgl_debug_end
		    }
		}
	    }
	}
    }
    this.unHover = function (e,el) {
	if (!el) return;
        this.fwonmouseout(e,el);
	if (taccgl_debug) {
	    taccgl.clog ("UnHover "+el.tagName+" " +el.taccglNoHoverStyle);
	} // taccgl_debug_end
	if (el.taccglNoHoverStyle || el.taccglNoHoverStyle=="") el.style.cssText=el.taccglNoHoverStyle;
	el.taccglNoHoverStyle=null;
	this.can.style.cursor = "";
    }
}
taccgl.createController = function() { this.init(); }
taccgl.createController.prototype=new taccglControllerPrototype();
taccglForwardingControllerPrototype.prototype =  new taccglControllerPrototype();
taccgl.createForwardingController = function() { this.init(); }
taccgl.createForwardingController.prototype=new taccglForwardingControllerPrototype();
taccgl.blockingController = function() {return new this.createController();}
taccgl.forwardingController = function() {return new this.createForwardingController();}


function taccgl3DCanvasPrototype (){
    this.init = function () {}
}
taccgl.createDDDCanvas = function() { this.init(); }
taccgl.createDDDCanvas.prototype=new taccgl3DCanvasPrototype();
taccgl.useController = function (c) {
    if (!this.initialized) this.begin();
    this.controller.detach();
    this.previousController=this.controller; this.controller=c;
    this.controller.attach();
}


function taccglTransformControllerPrototype (){
    this.init = function () {
	this.baseinit();
	this.rcx = 500; this.rcy =500; this.rcz=0; this.vexitOnMouseout=false;
    }

    this.attachEventForwarding = function() {
	var t=this;
	var mt=document.getElementById('taccgl_mouseTrap');
	if (!mt) {
	    if (document.body.insertAdjacentHTML) {
		document.body.insertAdjacentHTML (
		    "afterbegin",
		    "<div id='taccgl_mouseTrap' style=\"cursor:crosshair;xbackground-color:rgba(100,0,0,0.5); height:100%; width:100%; position:fixed;z-index:9999; display:none\"></div>");
	    }
	}
	mt=document.getElementById('taccgl_mouseTrap');
	if (!mt) return;
	mt.onmousedown=function(e){ t.tronmousedown(e)}
	mt.onmouseup=function(e){ t.tronmouseup(e)}
	mt.onmousemove=function(e){ t.tronmousemove(e)}
	mt.onclick=function(e){ t.tronclick(e)}
	mt.oncontextmenu=function(){ return false;}
	mt.style.display=''; 
	var x=mt.clientWidth;
	mt.style.opacity=1;
    }
    this.detachEventForwarding = function() {
	var mt=document.getElementById('taccgl_mouseTrap');
	if (mt) {
	    mt.style.display='none'; mt.style.opacity=0;
	}
    }
    this.rotationCenter=function(x,y,z){
	this.rcx=x; this.rcy=y; this.rcz=z;	
    }
    this.mouseBox=function(mbxmin,mbxmax,mbymin,mbymax){
	this.mbxmin=mbxmin; this.mbxmax=mbxmax; this.mbymin=mbymin; this.mbymax=mbymax;
    }
    this.exitOnMouseout=function(b){
	if (b!=false) b=true;
	this.vexitOnMouseout= b;
    }
    this.tronmousedown=function(e){
	if (!e) e=event;
	this.vexitOnMouseout=false;
//	console.log ("Mouse Down Event",e,e.which,e.button,e.buttons);
	this.cX=e.clientX; this.cY=e.clientY; this.button=e.which;
	this.IM=taccgl.m44T(taccgl.TM.slice());
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
    }
    this.tronmousemove=function(e){
//	console.log ("move ",e,e.which);
	if (this.vexitOnMouseout) {
	    var x=e.pageX; var y=e.pageY;
	    if (x > this.mbxmax || x<this.mbxmin || y>this.mbymax  || y<this.mbymin) this.doexit();
	}
	if (this.button==1 || this.button==3) {
	    var dX=e.clientX-this.cX, dY=e.clientY-this.cY;
	    if (e.shiftKey) {
		dX/=10; dY/=10;
	    }
	    if (this.button==1 && !e.ctrlKey) {
		var rm=taccgl.m33Rotation (-dX/300*Math.PI, 0,1,0);
		rm = taccgl.m33Mul(rm,taccgl.m33Rotation (dY/300*Math.PI, 1,0,0));
		
//		var rcx= this.rcx+this.IM[3], rcy=this.rcy+this.IM[7], rcz=this.rcz+this.IM[11];
//		this.TM= taccgl.m44Mul ( taccgl.m44FromM33 (rm,rcx,rcy,rcz), taccgl.m44Translation (-rcx,-rcy,-rcz) );
		var rv = taccgl.m44MulV(this.IM,[this.rcx, this.rcy, this.rcz, 1]);
		this.TM= taccgl.m44Mul ( taccgl.m44FromM33 (rm,rv[0],rv[1],rv[2]), taccgl.m44Translation (-rv[0],-rv[1],-rv[2]) );
	    } else  if (this.button==1 && e.ctrlKey) {
		var rm=taccgl.m33Rotation (dX/300*Math.PI, 0,1,0);
		rm = taccgl.m33Mul(rm,taccgl.m33Rotation (dY/300*Math.PI, 0,0,1));
//		var rcx= this.rcx+this.IM[3], rcy=this.rcy+this.IM[7], rcz=this.rcz+this.IM[11];
//		this.TM= taccgl.m44Mul ( taccgl.m44FromM33 (rm,rcx,rcy,rcz), taccgl.m44Translation (-rcx,-rcy,-rcz) );
		var rv = taccgl.m44MulV(this.IM,[this.rcx, this.rcy, this.rcz, 1]);
		this.TM= taccgl.m44Mul ( taccgl.m44FromM33 (rm,rv[0],rv[1],rv[2]), taccgl.m44Translation (-rv[0],-rv[1],-rv[2]) );
	    } else if (this.button==3 && !e.ctrlKey) {
    	        this.TM=taccgl.m44Translation (dX,dY,0); 
	    } else if (this.button==3 && e.ctrlKey) {
    	        this.TM=taccgl.m44Translation (dX,0,-dY*10); 
	    }
	    

	    taccgl.setTM( taccgl.m44T(taccgl.m44Mul(this.TM,this.IM)) );
	    // showControlTM();
	}	
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
    }
    this.tronmouseup=function(e){
	this.button=0;
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
	
    }
    this.tronclick=function(e){
        var dX=e.clientX-this.cX, dY=e.clientY-this.cY;
	if (dX==0&&dY==0) this.doexit();
	e.cancelBubble=true; if (e.stopPropagation) e.stopPropagation(); return false;
    }
    this.doexit = function(){
	this.nextController=taccgl.previousController; 
	taccgl.doHook (this.onTerm)
	if (this.nextController) taccgl.useController(this.nextController);
    }
    this.onTerm = null;
}

taccglTransformControllerPrototype.prototype=taccglForwardingControllerPrototype.prototype;
taccgl.createTransformController = function() { this.init(); }
taccgl.createTransformController.prototype=new taccglTransformControllerPrototype();
taccgl.transformController = function() {return new this.createTransformController();}

