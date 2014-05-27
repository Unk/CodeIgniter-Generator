/*!
 * VERSION: 0.4.1
 * DATE: 2013-07-10
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";var t,e,i,r={setScale:1,setShadowOffset:1,setFillPatternOffset:1,setOffset:1,setFill:2,setStroke:2,setShadowColor:2},s={},n={},a={},o=/(\d|\.)+/g,l=/(?:_cw|_ccw|_short)/,h=window._gsDefine.globals.com.greensock.plugins,u={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},_=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},f=function(t){if(""===t||null==t||"none"===t)return u.transparent;if(u[t])return u[t];if("number"==typeof t)return[t>>16,255&t>>8,255&t];if("#"===t.charAt(0))return 4===t.length&&(t="#"+t.charAt(1)+t.charAt(1)+t.charAt(2)+t.charAt(2)+t.charAt(3)+t.charAt(3)),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t];if("hsl"===t.substr(0,3)){t=t.match(o);var e=Number(t[0])%360/360,i=Number(t[1])/100,r=Number(t[2])/100,s=.5>=r?r*(i+1):r+i-r*i,n=2*r-s;return t.length>3&&(t[3]=Number(t[3])),t[0]=_(e+1/3,n,s),t[1]=_(e,n,s),t[2]=_(e-1/3,n,s),t}for(var a=t.match(o)||u.transparent,l=a.length;--l>-1;)a[l]=Number(a[l]);return a},p=function(t,e,i,r){this.getter=e,this.setter=i;var s=f(t[e]());this.proxy={r:s[0],g:s[1],b:s[2],a:s.length>3?s[3]:1},r&&(this._next=r,r._prev=this)},c=[],d=function(){var i=c.length;if(0!==i){for(;--i>-1;)c[i].draw(),c[i]._gsDraw=!1;c.length=0}else t.removeEventListener("tick",d),e=!1},m=function(t,e){var i="x"===e?"y":"x",r=e.toUpperCase(),o="get"+t.substr(3),l="_gs_"+t;s[t+r]=o+r,n[t+r]=function(){return this[o]()[e]},a[t+r]=function(r){var s=this[o](),n=this[l];return n||(n=this[l]={}),n[e]=r,n[i]=s[i],this[t](n),this}},g=function(t,e){var i,o,l,h,u,_=[];for(i in e)if(l=e[i],"bezier"!==i&&"autoDraw"!==i&&"set"!==i.substr(0,3)&&void 0===t[i]&&(_.push(i),delete e[i],i="set"+i.charAt(0).toUpperCase()+i.substr(1),e[i]=l),o=s[i]){if(1===r[i])return e[i+"X"]=e[i+"Y"]=e[i],delete e[i],g(t,e);!t[i]&&a[i]&&(u=t.prototype||t,u[i]=a[i],u[o]=n[i])}else if("bezier"===i)for(l=l instanceof Array?l:l.values||[],h=l.length;--h>-1;)0===h?_=_.concat(g(t,l[h])):g(t,l[h]);return _},v=function(t){var e,i={};for(e in t)i[e]=t[e];return i};for(i in r)s[i]="get"+i.substr(3),1===r[i]&&(m(i,"x"),m(i,"y"));window._gsDefine.plugin({propName:"kinetic",API:2,init:function(e,i,n){var a,o,u,_,c,d;this._overwriteProps=g(e,i),this._target=e,this._layer=i.autoDraw!==!1?e.getLayer():null,!t&&this._layer&&(t=n.constructor.ticker);for(a in i){if(o=i[a],2===r[a])u=s[a],_=this._firstSP=new p(e,u,a,this._firstSP),o=f(o),_.proxy.r!==o[0]&&this._addTween(_.proxy,"r",_.proxy.r,o[0],a),_.proxy.g!==o[1]&&this._addTween(_.proxy,"g",_.proxy.g,o[1],a),_.proxy.b!==o[2]&&this._addTween(_.proxy,"b",_.proxy.b,o[2],a),(o.length>3||1!==_.proxy.a)&&_.proxy.a!==o[3]&&this._addTween(_.proxy,"a",_.proxy.a,o.length>3?o[3]:1,a);else if("bezier"===a){if(c=h.BezierPlugin,!c)throw"BezierPlugin not loaded";c=this._bezier=new c,"object"==typeof o&&o.autoRotate===!0&&(o.autoRotate=["setX","setY","setRotation",0,!0]),c._onInitTween(e,o,n),this._overwriteProps=this._overwriteProps.concat(c._overwriteProps),this._addTween(c,"setRatio",0,1,a)}else if("setRotation"!==a&&"setRotationDeg"!==a||"string"!=typeof o||!l.test(o))"autoDraw"!==a&&this._addTween(e,a,("function"==typeof e[a]?e["get"+a.substr(3)]():e[a])||0,o,a);else{if(d=h.DirectionalRotationPlugin,!d)throw"DirectionalRotationPlugin not loaded";d=this._directionalRotation=new d,u={useRadians:"setRotation"===a},u[a]=o,d._onInitTween(e,u,n),this._addTween(d,"setRatio",0,1,a)}this._overwriteProps.push(a)}return!0},kill:function(t){return t=v(t),g(this._target,t),this._bezier&&this._bezier._kill(t),this._directionalRotation&&this._directionalRotation._kill(t),this._super._kill.call(this,t)},round:function(t,e){return t=v(t),g(this._target,t),this._bezier&&this._bezier._roundProps(t,e),this._super._roundProps.call(this,t,e)},set:function(i){this._super.setRatio.call(this,i);var r,s,n=this._firstSP,a=this._layer;if(n)for(r=this._target;n;)s=n.proxy,r[n.setter]((1!==s.a?"rgba(":"rgb(")+(0|s.r)+", "+(0|s.g)+", "+(0|s.b)+(1!==s.a?", "+s.a:"")+")"),n=n._next;a&&!a._gsDraw&&(c.push(a),a._gsDraw=!0,e||(t.addEventListener("tick",d),e=!0))}})}),window._gsDefine&&window._gsQueue.pop()();