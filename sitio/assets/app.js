(()=>{function Pi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Nd(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}var Un={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ss={duration:.5,overwrite:!1,delay:0},rh,an,Ce,Kn=1e8,Me=1/Kn,qc=Math.PI*2,_0=qc/4,v0=0,Od=Math.sqrt,x0=Math.cos,y0=Math.sin,We=function(t){return typeof t=="string"},De=function(t){return typeof t=="function"},Li=function(t){return typeof t=="number"},Ha=function(t){return typeof t=="undefined"},Mi=function(t){return typeof t=="object"},Dn=function(t){return t!==!1},sh=function(){return typeof window!="undefined"},La=function(t){return De(t)||We(t)},Fd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ln=Array.isArray,Zc=/(?:-?\.?\d|\.)+/gi,oh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,zr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,kc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ah=/[+-]=-?[.\d]+/,Bd=/[^,'"\[\]\s]+/gi,M0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pe,xi,$c,lh,kn={},Oa={},zd,kd=function(t){return(Oa=Br(t,kn))&&cn},Va=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Co=function(t,e){return!e&&console.warn(t)},Hd=function(t,e){return t&&(kn[t]=e)&&Oa&&(Oa[t]=e)||kn},Ro=function(){return 0},S0={suppressEvents:!0,isStart:!0,kill:!1},Da={suppressEvents:!0,kill:!1},b0={suppressEvents:!0},ch={},or=[],Jc={},Vd,In={},Hc={},Cd=30,Ua=[],hh="",uh=function(t){var e=t[0],n,i;if(Mi(e)||De(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ua.length;i--&&!Ua[i].targetTest(e););n=Ua[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new ph(t[i],n)))||t.splice(i,1);return t},ar=function(t){return t._gsap||uh(Qn(t))[0]._gsap},fh=function(t,e,n){return(n=t[e])&&De(n)?t[e]():Ha(n)&&t.getAttribute&&t.getAttribute(e)||n},vn=function(t,e){return(t=t.split(",")).forEach(e)||t},Ue=function(t){return Math.round(t*1e5)/1e5||0},Je=function(t){return Math.round(t*1e7)/1e7||0},kr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},w0=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Fa=function(){var t=or.length,e=or.slice(0),n,i;for(Jc={},or.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Gd=function(t,e,n,i){or.length&&!an&&Fa(),t.render(e,n,i||an&&e<0&&(t._initted||t._startAt)),or.length&&!an&&Fa()},Wd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Bd).length<2?e:We(t)?t.trim():t},Xd=function(t){return t},jn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},T0=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Br=function(t,e){for(var n in e)t[n]=e[n];return t},Rd=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Mi(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Ba=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},To=function(t){var e=t.parent||Pe,n=t.keyframes?T0(ln(t.keyframes)):jn;if(Dn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},E0=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Yd=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Ga=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},lr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Nr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},A0=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Kc=function(t,e,n,i){return t._startAt&&(an?t._startAt.revert(Da):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},C0=function r(t){return!t||t._ts&&r(t.parent)},Pd=function(t){return t._repeat?bs(t._tTime,t=t.duration()+t._rDelay)*t:0},bs=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},za=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Wa=function(t){return t._end=Je(t._start+(t._tDur/Math.abs(t._ts||t._rts||Me)||0))},Xa=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Je(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Wa(t),n._dirty||Nr(n,t)),t},qd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=za(t.rawTime(),e),(!e._dur||Lo(0,e.totalDuration(),n)-e._tTime>Me)&&e.render(n,!0)),Nr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-Me}},yi=function(t,e,n,i){return e.parent&&lr(e),e._start=Je((Li(n)?n:n||t!==Pe?Jn(t,n,e):t._time)+e._delay),e._end=Je(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Yd(t,e,"_first","_last",t._sort?"_start":0),Qc(e)||(t._recent=e),i||qd(t,e),t._ts<0&&Xa(t,t._tTime),t},Zd=function(t,e){return(kn.ScrollTrigger||Va("scrollTrigger",e))&&kn.ScrollTrigger.create(e,t)},$d=function(t,e,n,i,s){if(_h(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!an&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Vd!==Ln.frame)return or.push(t),t._lazy=[s,i],1},R0=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Qc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},P0=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&R0(t)&&!(!t._initted&&Qc(t))||(t._ts<0||t._dp._ts<0)&&!Qc(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=Lo(0,t._tDur,e),h=bs(l,a),t._yoyo&&h&1&&(o=1-o),h!==bs(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||an||i||t._zTime===Me||!e&&t._zTime){if(!t._initted&&$d(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?Me:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Kc(t,e,n,!0),t._onUpdate&&!n&&zn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&zn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&lr(t,1),!n&&!an&&(zn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},I0=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},ws=function(t,e,n,i){var s=t._repeat,o=Je(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Je(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Xa(t,t._tTime=t._tDur*a),t.parent&&Wa(t),n||Nr(t.parent,t),t},Id=function(t){return t instanceof rn?Nr(t):ws(t,t._dur)},L0={_start:0,endTime:Ro,totalDuration:Ro},Jn=function r(t,e,n){var i=t.labels,s=t._recent||L0,o=t.duration()>=Kn?s.endTime(!1):t._dur,a,l,c;return We(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(ln(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Eo=function(t,e,n){var i=Li(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Dn(l.vars.inherit)&&l.parent;o.immediateRender=Dn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new ze(e[0],o,e[s+1])},cr=function(t,e){return t||t===0?e(t):e},Lo=function(t,e,n){return n<t?t:n>e?e:n},sn=function(t,e){return!We(t)||!(e=M0.exec(t))?"":e[1]},D0=function(t,e,n){return cr(n,function(i){return Lo(t,e,i)})},jc=[].slice,Jd=function(t,e){return t&&Mi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Mi(t[0]))&&!t.nodeType&&t!==xi},U0=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return We(i)&&!e||Jd(i,1)?(s=n).push.apply(s,Qn(i)):n.push(i)})||n},Qn=function(t,e,n){return Ce&&!e&&Ce.selector?Ce.selector(t):We(t)&&!n&&($c||!Ts())?jc.call((e||lh).querySelectorAll(t),0):ln(t)?U0(t,n):Jd(t)?jc.call(t,0):t?[t]:[]},th=function(t){return t=Qn(t)[0]||Co("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Qn(e,n.querySelectorAll?n:n===t?Co("Invalid scope")||lh.createElement("div"):t)}},Kd=function(t){return t.sort(function(){return .5-Math.random()})},Qd=function(t){if(De(t))return t;var e=Mi(t)?t:{each:t},n=Or(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,u=i;return We(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],u=i[1]),function(d,f,_){var g=(_||e).length,p=o[g],m,S,x,y,R,E,b,P,N;if(!p){if(N=e.grid==="auto"?0:(e.grid||[1,Kn])[1],!N){for(b=-Kn;b<(b=_[N++].getBoundingClientRect().left)&&N<g;);N<g&&N--}for(p=o[g]=[],m=l?Math.min(N,g)*h-.5:i%N,S=N===Kn?0:l?g*u/N-.5:i/N|0,b=0,P=Kn,E=0;E<g;E++)x=E%N-m,y=S-(E/N|0),p[E]=R=c?Math.abs(c==="y"?y:x):Od(x*x+y*y),R>b&&(b=R),R<P&&(P=R);i==="random"&&Kd(p),p.max=b-P,p.min=P,p.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(N>g?g-1:c?c==="y"?g/N:N:Math.max(N,g/N))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=sn(e.amount||e.each)||0,n=n&&g<0?ap(n):n}return g=(p[d]-p.min)/p.max||0,Je(p.b+(n?n(g):g)*p.v)+p.u}},eh=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Je(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Li(n)?0:sn(n))}},jd=function(t,e){var n=ln(t),i,s;return!n&&Mi(t)&&(i=n=t.radius||Kn,t.values?(t=Qn(t.values),(s=!Li(t[0]))&&(i*=i)):t=eh(t.increment)),cr(e,n?De(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Kn,h=0,u=t.length,d,f;u--;)s?(d=t[u].x-a,f=t[u].y-l,d=d*d+f*f):d=Math.abs(t[u]-a),d<c&&(c=d,h=u);return h=!i||c<=i?t[h]:o,s||h===o||Li(o)?h:h+sn(o)}:eh(t))},tp=function(t,e,n,i){return cr(ln(t)?!e:n===!0?!!(n=0):!i,function(){return ln(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},N0=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},O0=function(t,e){return function(n){return t(parseFloat(n))+(e||sn(n))}},F0=function(t,e,n){return np(t,e,0,1,n)},ep=function(t,e,n){return cr(n,function(i){return t[~~e(i)]})},B0=function r(t,e,n){var i=e-t;return ln(t)?ep(t,r(0,t.length),e):cr(n,function(s){return(i+(s-t)%i)%i+t})},z0=function r(t,e,n){var i=e-t,s=i*2;return ln(t)?ep(t,r(0,t.length-1),e):cr(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},Es=function(t){for(var e=0,n="",i,s,o,a;~(i=t.indexOf("random(",e));)o=t.indexOf(")",i),a=t.charAt(i+7)==="[",s=t.substr(i+7,o-i-7).match(a?Bd:Zc),n+=t.substr(e,i-e)+tp(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),e=o+1;return n+t.substr(e,t.length-e)},np=function(t,e,n,i,s){var o=e-t,a=i-n;return cr(s,function(l){return n+((l-t)/o*a||0)})},k0=function r(t,e,n,i){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var o=We(t),a={},l,c,h,u,d;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(ln(t)&&!ln(e)){for(h=[],u=t.length,d=u-2,c=1;c<u;c++)h.push(r(t[c-1],t[c]));u--,s=function(_){_*=u;var g=Math.min(d,~~_);return h[g](_-g)},n=e}else i||(t=Br(ln(t)?[]:{},t));if(!h){for(l in e)mh.call(a,t,l,"get",e[l]);s=function(_){return yh(_,a)||(o?t.p:t)}}}return cr(n,s)},Ld=function(t,e,n){var i=t.labels,s=Kn,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},zn=function(t,e,n){var i=t.vars,s=i[e],o=Ce,a=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&or.length&&Fa(),a&&(Ce=a),h=l?s.apply(c,l):s.call(c),Ce=o,h},bo=function(t){return lr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!an),t.progress()<1&&zn(t,"onInterrupt"),t},Ms,ip=[],rp=function(t){if(t)if(t=!t.name&&t.default||t,sh()||t.headless){var e=t.name,n=De(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Ro,render:yh,add:mh,kill:n_,modifier:e_,rawVars:0},o={targetTest:0,get:0,getSetter:Ya,aliases:{},register:0};if(Ts(),t!==i){if(In[e])return;jn(i,jn(Ba(t,s),o)),Br(i.prototype,Br(s,Ba(t,o))),In[i.prop=e]=i,t.targetTest&&(Ua.push(i),ch[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Hd(e,i),t.register&&t.register(cn,i,xn)}else ip.push(t)},ye=255,wo={aqua:[0,ye,ye],lime:[0,ye,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ye],navy:[0,0,128],white:[ye,ye,ye],olive:[128,128,0],yellow:[ye,ye,0],orange:[ye,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ye,0,0],pink:[ye,192,203],cyan:[0,ye,ye],transparent:[ye,ye,ye,0]},Vc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ye+.5|0},sp=function(t,e,n){var i=t?Li(t)?[t>>16,t>>8&ye,t&ye]:0:wo.black,s,o,a,l,c,h,u,d,f,_;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),wo[t])i=wo[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ye,i&ye,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ye,t&ye]}else if(t.substr(0,3)==="hsl"){if(i=_=t.match(Zc),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,s=h*2-o,i.length>3&&(i[3]*=1),i[0]=Vc(l+1/3,s,o),i[1]=Vc(l,s,o),i[2]=Vc(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(oh),n&&i.length<4&&(i[3]=1),i}else i=t.match(Zc)||wo.transparent;i=i.map(Number)}return e&&!_&&(s=i[0]/ye,o=i[1]/ye,a=i[2]/ye,u=Math.max(s,o,a),d=Math.min(s,o,a),h=(u+d)/2,u===d?l=c=0:(f=u-d,c=h>.5?f/(2-u-d):f/(u+d),l=u===s?(o-a)/f+(o<a?6:0):u===o?(a-s)/f+2:(s-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},op=function(t){var e=[],n=[],i=-1;return t.split(Ii).forEach(function(s){var o=s.match(zr)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Dd=function(t,e,n){var i="",s=(t+i).match(Ii),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!s)return t;if(s=s.map(function(d){return(d=sp(d,e,1))&&o+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=op(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Ii,"1").split(zr),u=c.length-1;a<u;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(Ii),u=c.length-1;a<u;a++)i+=c[a]+s[a];return i+c[u]},Ii=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in wo)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),H0=/hsl[a]?\(/,dh=function(t){var e=t.join(" "),n;if(Ii.lastIndex=0,Ii.test(e))return n=H0.test(e),t[1]=Dd(t[1],n),t[0]=Dd(t[0],n,op(t[1])),!0},Po,Ln=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,h,u,d,f,_=function g(p){var m=r()-i,S=p===!0,x,y,R,E;if((m>t||m<0)&&(n+=m-e),i+=m,R=i-n,x=R-o,(x>0||S)&&(E=++u.frame,d=R-u.time*1e3,u.time=R=R/1e3,o+=x+(x>=s?4:s-x),y=1),S||(l=c(g)),y)for(f=0;f<a.length;f++)a[f](R,d,E,p)};return u={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){zd&&(!$c&&sh()&&(xi=$c=window,lh=xi.document||{},kn.gsap=cn,(xi.gsapVersions||(xi.gsapVersions=[])).push(cn.version),kd(Oa||xi.GreenSockGlobals||!xi.gsap&&xi||{}),ip.forEach(rp)),h=typeof requestAnimationFrame!="undefined"&&requestAnimationFrame,l&&u.sleep(),c=h||function(p){return setTimeout(p,o-u.time*1e3+1|0)},Po=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Po=0,c=Ro},lagSmoothing:function(p,m){t=p||1/0,e=Math.min(m||33,t)},fps:function(p){s=1e3/(p||240),o=u.time*1e3+s},add:function(p,m,S){var x=m?function(y,R,E,b){p(y,R,E,b),u.remove(x)}:p;return u.remove(p),a[S?"unshift":"push"](x),Ts(),x},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&f>=m&&f--},_listeners:a},u}(),Ts=function(){return!Po&&Ln.wake()},ae={},V0=/^[\d.\-M][\d.\-,\s]/,G0=/["']/g,W0=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(G0,"").trim():+c,i=l.substr(a+1).trim();return e},X0=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Y0=function(t){var e=(t+"").split("("),n=ae[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[W0(e[1])]:X0(t).split(",").map(Wd)):ae._CE&&V0.test(t)?ae._CE("",t):n},ap=function(t){return function(e){return 1-t(1-e)}},lp=function r(t,e){for(var n=t._first,i;n;)n instanceof rn?r(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?r(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},Or=function(t,e){return t&&(De(t)?t:ae[t]||Y0(t))||e},Hr=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return vn(t,function(a){ae[a]=kn[a]=s,ae[o=a.toLowerCase()]=n;for(var l in s)ae[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ae[a+"."+l]=s[l]}),s},cp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Gc=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/qc*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*y0((h-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:cp(a);return s=qc/s,l.config=function(c,h){return r(t,c,h)},l},Wc=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:cp(n);return i.config=function(s){return r(t,s)},i};vn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;Hr(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ae.Linear.easeNone=ae.none=ae.Linear.easeIn;Hr("Elastic",Gc("in"),Gc("out"),Gc());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};Hr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Hr("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});Hr("Circ",function(r){return-(Od(1-r*r)-1)});Hr("Sine",function(r){return r===1?1:-x0(r*_0)+1});Hr("Back",Wc("in"),Wc("out"),Wc());ae.SteppedEase=ae.steps=kn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-Me;return function(a){return((i*Lo(0,o,a)|0)+s)*n}}};Ss.ease=ae["quad.out"];vn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return hh+=r+","+r+"Params,"});var ph=function(t,e){this.id=v0++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:fh,this.set=e?e.getSetter:Ya},Io=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ws(this,+e.duration,1,1),this.data=e.data,Ce&&(this._ctx=Ce,Ce.data.push(this)),Po||Ln.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,ws(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Ts(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Xa(this,n),!s._dp||s.parent||qd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&yi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Me||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Gd(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Pd(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Pd(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?bs(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-Me?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?za(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Me?0:this._rts,this.totalTime(Lo(-Math.abs(this._delay),this._tDur,s),i!==!1),Wa(this),A0(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ts(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Me&&(this._tTime-=Me)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&yi(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Dn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?za(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=b0);var i=an;return an=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),an=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Id(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Id(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Jn(this,n),Dn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Dn(i))},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Me:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Me,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Me)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this;return new Promise(function(s){var o=De(n)?n:Xd,a=function(){var c=i.then;i.then=null,De(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},t.kill=function(){bo(this)},r}();jn(Io.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Me,_prom:0,_ps:!1,_rts:1});var rn=function(r){Nd(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Dn(n.sortChildren),Pe&&yi(n.parent||Pe,Pi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Zd(Pi(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return Eo(0,arguments,this),this},e.from=function(i,s,o){return Eo(1,arguments,this),this},e.fromTo=function(i,s,o,a){return Eo(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,To(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new ze(i,s,Jn(this,o),1),this},e.call=function(i,s,o){return yi(this,ze.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new ze(i,o,Jn(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,h){return o.runBackwards=1,To(o).immediateRender=Dn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,h)},e.staggerFromTo=function(i,s,o,a,l,c,h,u){return a.startAt=o,To(a).immediateRender=Dn(a.immediateRender),this.staggerTo(i,s,a,l,c,h,u)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Je(i),u=this._zTime<0!=i<0&&(this._initted||!c),d,f,_,g,p,m,S,x,y,R,E,b;if(this!==Pe&&h>l&&i>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),d=h,y=this._start,x=this._ts,m=!x,u&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(d=Je(h%p),h===l?(g=this._repeat,d=c):(g=~~(h/p),g&&g===h/p&&(d=c,g--),d>c&&(d=c)),R=bs(this._tTime,p),!a&&this._tTime&&R!==g&&this._tTime-R*p-this._dur<=0&&(R=g),E&&g&1&&(d=c-d,b=1),g!==R&&!this._lock){var P=E&&R&1,N=P===(E&&g&1);if(g<R&&(P=!P),a=P?0:h%c?c:h,this._lock=1,this.render(a||(b?0:Je(g*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&zn(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,N&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;lp(this,b)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=I0(this,Je(a),Je(d)),S&&(h-=d-(d=S._start))),this._tTime=h,this._time=d,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&d&&!s&&!g&&(zn(this,"onStart"),this._tTime!==h))return this;if(d>=a&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||d>=f._start)&&f._ts&&S!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,o),d!==this._time||!this._ts&&!m){S=0,_&&(h+=this._zTime=-Me);break}}f=_}else{f=this._last;for(var v=i<0?i:d;f;){if(_=f._prev,(f._act||v<=f._end)&&f._ts&&S!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(v-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(v-f._start)*f._ts,s,o||an&&(f._initted||f._startAt)),d!==this._time||!this._ts&&!m){S=0,_&&(h+=this._zTime=v?-Me:Me);break}}f=_}}if(S&&!s&&(this.pause(),S.render(d>=a?0:-Me)._zTime=d>=a?1:-1,this._ts))return this._start=y,Wa(this),this.render(i,s,o);this._onUpdate&&!s&&zn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(y===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&lr(this,1),!s&&!(i<0&&!a)&&(h||a||!l)&&(zn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(Li(s)||(s=Jn(this,s,i)),!(i instanceof Io)){if(ln(i))return i.forEach(function(a){return o.add(a,s)}),this;if(We(i))return this.addLabel(i,s);if(De(i))i=ze.delayedCall(0,i);else return this}return this!==i?yi(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Kn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof ze?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return We(i)?this.removeLabel(i):De(i)?this.killTweensOf(i):(Ga(this,i),i===this._recent&&(this._recent=this._last),Nr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Je(Ln.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Jn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=ze.delayedCall(0,s||Ro,o);return a.data="isPause",this._hasPause=1,yi(this,a,Jn(this,i))},e.removePause=function(i){var s=this._first;for(i=Jn(this,i);s;)s._start===i&&s.data==="isPause"&&lr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)sr!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=Qn(i),l=this._first,c=Li(s),h;l;)l instanceof ze?w0(l._targets,a)&&(c?(!sr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=Jn(o,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,d=l.immediateRender,f,_=ze.to(o,jn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Me,onStart:function(){if(o.pause(),!f){var p=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==p&&ws(_,p,0,1).render(_._time,!0,!0),f=1}h&&h.apply(_,u||[])}},s));return d?_.render(0):_},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,jn({startAt:{time:Jn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Ld(this,Jn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Ld(this,Jn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Me)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Nr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Nr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=Kn,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,yi(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=h/o._ts,o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ws(o,o===Pe&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(Pe._ts&&(Gd(Pe,za(i,Pe)),Vd=Ln.frame),Ln.frame>=Cd){Cd+=Un.autoSleep||120;var s=Pe._first;if((!s||!s._ts)&&Un.autoSleep&&Ln._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ln.sleep()}}},t}(Io);jn(rn.prototype,{_lock:0,_hasPause:0,_forcing:0});var q0=function(t,e,n,i,s,o,a){var l=new xn(this._pt,t,e,0,1,xh,null,s),c=0,h=0,u,d,f,_,g,p,m,S;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Es(i)),o&&(S=[n,i],o(S,t,e),n=S[0],i=S[1]),d=n.match(kc)||[];u=kc.exec(i);)_=u[0],g=i.substring(c,u.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),_!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:g||h===1?g:",",s:p,c:_.charAt(1)==="="?kr(p,_)-p:parseFloat(_)-p,m:f&&f<4?Math.round:0},c=kc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(ah.test(i)||m)&&(l.e=0),this._pt=l,l},mh=function(t,e,n,i,s,o,a,l,c,h){De(i)&&(i=i(s||0,t,o));var u=t[e],d=n!=="get"?n:De(u)?c?t[e.indexOf("set")||!De(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,f=De(u)?c?Q0:fp:vh,_;if(We(i)&&(~i.indexOf("random(")&&(i=Es(i)),i.charAt(1)==="="&&(_=kr(d,i)+(sn(d)||0),(_||_===0)&&(i=_))),!h||d!==i||nh)return!isNaN(d*i)&&i!==""?(_=new xn(this._pt,t,e,+d||0,i-(d||0),typeof u=="boolean"?t_:dp,0,f),c&&(_.fp=c),a&&_.modifier(a,this,t),this._pt=_):(!u&&!(e in t)&&Va(e,i),q0.call(this,t,e,d,i,f,l||Un.stringFilter,c))},Z0=function(t,e,n,i,s){if(De(t)&&(t=Ao(t,s,e,n,i)),!Mi(t)||t.style&&t.nodeType||ln(t)||Fd(t))return We(t)?Ao(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Ao(t[a],s,e,n,i);return o},gh=function(t,e,n,i,s,o){var a,l,c,h;if(In[t]&&(a=new In[t]).init(s,a.rawVars?e[t]:Z0(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new xn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==Ms))for(c=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)c[a._props[h]]=l;return a},sr,nh,_h=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,d=i.keyframes,f=i.autoRevert,_=t._dur,g=t._startAt,p=t._targets,m=t.parent,S=m&&m.data==="nested"?m.vars.targets:p,x=t._overwrite==="auto"&&!rh,y=t.timeline,R,E,b,P,N,v,w,L,k,W,J,V,B;if(y&&(!d||!s)&&(s="none"),t._ease=Or(s,Ss.ease),t._yEase=u?ap(Or(u===!0?s:u,Ss.ease)):0,u&&t._yoyo&&!t._repeat&&(u=t._yEase,t._yEase=t._ease,t._ease=u),t._from=!y&&!!i.runBackwards,!y||d&&!i.stagger){if(L=p[0]?ar(p[0]).harness:0,V=L&&i[L.prop],R=Ba(i,ch),g&&(g._zTime<0&&g.progress(1),e<0&&h&&a&&!f?g.render(-1,!0):g.revert(h&&_?Da:S0),g._lazy=0),o){if(lr(t._startAt=ze.set(p,jn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&Dn(l),startAt:null,delay:0,onUpdate:c&&function(){return zn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(an||!a&&!f)&&t._startAt.revert(Da),a&&_&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&_&&!g){if(e&&(a=!1),b=jn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Dn(l),immediateRender:a,stagger:0,parent:m},R),V&&(b[L.prop]=V),lr(t._startAt=ze.set(p,b)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(an?t._startAt.revert(Da):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,Me,Me);else if(!e)return}for(t._pt=t._ptCache=0,l=_&&Dn(l)||l&&!_,E=0;E<p.length;E++){if(N=p[E],w=N._gsap||uh(p)[E]._gsap,t._ptLookup[E]=W={},Jc[w.id]&&or.length&&Fa(),J=S===p?E:S.indexOf(N),L&&(k=new L).init(N,V||R,t,J,S)!==!1&&(t._pt=P=new xn(t._pt,N,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(D){W[D]=P}),k.priority&&(v=1)),!L||V)for(b in R)In[b]&&(k=gh(b,R,t,J,N,S))?k.priority&&(v=1):W[b]=P=mh.call(t,N,b,"get",R[b],J,S,0,i.stringFilter);t._op&&t._op[E]&&t.kill(N,t._op[E]),x&&t._pt&&(sr=t,Pe.killTweensOf(N,W,t.globalTime(e)),B=!t.parent,sr=0),t._pt&&l&&(Jc[w.id]=1)}v&&Mh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!B,d&&e<=0&&y.render(Kn,!0,!0)},$0=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,d,f;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,f=t._targets.length;f--;){if(h=d[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return nh=1,t.vars[e]="+=0",_h(t,a),nh=0,l?Co(e+" not eligible for reset"):1;c.push(h)}for(f=c.length;f--;)u=c[f],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=Ue(n)+sn(u.e)),u.b&&(u.b=h.s+sn(u.b))},J0=function(t,e){var n=t[0]?ar(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=Br({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},K0=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(ln(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Ao=function(t,e,n,i,s){return De(t)?t.call(e,n,i,s):We(t)&&~t.indexOf("random(")?Es(t):t},hp=hh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",up={};vn(hp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return up[r]=1});var ze=function(r){Nd(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:To(i))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,d=l.stagger,f=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,m=l.yoyoEase,S=i.parent||Pe,x=(ln(n)||Fd(n)?Li(n[0]):"length"in i)?[n]:Qn(n),y,R,E,b,P,N,v,w;if(a._targets=x.length?uh(x):Co("GSAP target "+n+" not found. https://gsap.com",!Un.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,_||d||La(c)||La(h)){if(i=a.vars,y=a.timeline=new rn({data:"nested",defaults:g||{},targets:S&&S.data==="nested"?S.vars.targets:x}),y.kill(),y.parent=y._dp=Pi(a),y._start=0,d||La(c)||La(h)){if(b=x.length,v=d&&Qd(d),Mi(d))for(P in d)~hp.indexOf(P)&&(w||(w={}),w[P]=d[P]);for(R=0;R<b;R++)E=Ba(i,up),E.stagger=0,m&&(E.yoyoEase=m),w&&Br(E,w),N=x[R],E.duration=+Ao(c,Pi(a),R,N,x),E.delay=(+Ao(h,Pi(a),R,N,x)||0)-a._delay,!d&&b===1&&E.delay&&(a._delay=h=E.delay,a._start+=h,E.delay=0),y.to(N,E,v?v(R,N,x):0),y._ease=ae.none;y.duration()?c=h=0:a.timeline=0}else if(_){To(jn(y.vars.defaults,{ease:"none"})),y._ease=Or(_.ease||i.ease||"none");var L=0,k,W,J;if(ln(_))_.forEach(function(V){return y.to(x,V,">")}),y.duration();else{E={};for(P in _)P==="ease"||P==="easeEach"||K0(P,_[P],E,_.easeEach);for(P in E)for(k=E[P].sort(function(V,B){return V.t-B.t}),L=0,R=0;R<k.length;R++)W=k[R],J={ease:W.e,duration:(W.t-(R?k[R-1].t:0))/100*c},J[P]=W.v,y.to(x,J,L),L+=J.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||a.duration(c=y.duration())}else a.timeline=0;return f===!0&&!rh&&(sr=Pi(a),Pe.killTweensOf(x),sr=0),yi(S,Pi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(u||!c&&!_&&a._start===Je(S._time)&&Dn(u)&&C0(Pi(a))&&S.data!=="nested")&&(a._tTime=-Me,a.render(Math.max(0,-h)||0)),p&&Zd(Pi(a),p),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-Me&&!h?l:i<Me?0:i,d,f,_,g,p,m,S,x,y;if(!c)P0(this,i,s,o);else if(u!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h){if(d=u,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+i,s,o);if(d=Je(u%g),u===l?(_=this._repeat,d=c):(_=~~(u/g),_&&_===Je(u/g)&&(d=c,_--),d>c&&(d=c)),m=this._yoyo&&_&1,m&&(y=this._yEase,d=c-d),p=bs(this._tTime,g),d===a&&!o&&this._initted&&_===p)return this._tTime=u,this;_!==p&&(x&&this._yEase&&lp(x,m),this.vars.repeatRefresh&&!m&&!this._lock&&this._time!==g&&this._initted&&(this._lock=o=1,this.render(Je(g*_),!0).invalidate()._lock=0))}if(!this._initted){if($d(this,h?i:d,o,s,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=S=(y||this._ease)(d/c),this._from&&(this.ratio=S=1-S),d&&!a&&!s&&!_&&(zn(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(S,f.d),f=f._next;x&&x.render(i<0?i:x._dur*x._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Kc(this,i,s,o),zn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&zn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Kc(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&lr(this,1),!s&&!(h&&!a)&&(u||a||m)&&(zn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){Po||Ln.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||_h(this,c),h=this._ease(c/this._dur),$0(this,i,s,o,a,h,c,l)?this.resetTo(i,s,o,a,1):(Xa(this,0),this.parent||Yd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?bo(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,sr&&sr.vars.overwrite!==!0)._first||bo(this),this.parent&&o!==this.timeline.totalDuration()&&ws(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Qn(i):a,c=this._ptLookup,h=this._pt,u,d,f,_,g,p,m;if((!s||s==="all")&&E0(a,l))return s==="all"&&(this._pt=0),bo(this);for(u=this._op=this._op||[],s!=="all"&&(We(s)&&(g={},vn(s,function(S){return g[S]=1}),s=g),s=J0(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){d=c[m],s==="all"?(u[m]=s,_=d,f={}):(f=u[m]=u[m]||{},_=s);for(g in _)p=d&&d[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&Ga(this,p,"_pt"),delete d[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&h&&bo(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Eo(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Eo(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return Pe.killTweensOf(i,s,o)},t}(Io);jn(ze.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});vn("staggerTo,staggerFrom,staggerFromTo",function(r){ze[r]=function(){var t=new rn,e=jc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var vh=function(t,e,n){return t[e]=n},fp=function(t,e,n){return t[e](n)},Q0=function(t,e,n,i){return t[e](i.fp,n)},j0=function(t,e,n){return t.setAttribute(e,n)},Ya=function(t,e){return De(t[e])?fp:Ha(t[e])&&t.setAttribute?j0:vh},dp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},t_=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},xh=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},yh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},e_=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},n_=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Ga(this,e,"_pt"):e.dep||(n=1),e=i;return!n},i_=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Mh=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},xn=function(){function r(e,n,i,s,o,a,l,c,h){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||dp,this.d=l||this,this.set=c||vh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=i_,this.m=n,this.mt=s,this.tween=i},r}();vn(hh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ch[r]=1});kn.TweenMax=kn.TweenLite=ze;kn.TimelineLite=kn.TimelineMax=rn;Pe=new rn({sortChildren:!1,defaults:Ss,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Un.stringFilter=dh;var Fr=[],Na={},r_=[],Ud=0,s_=0,Xc=function(t){return(Na[t]||r_).map(function(e){return e()})},ih=function(){var t=Date.now(),e=[];t-Ud>2&&(Xc("matchMediaInit"),Fr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=xi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Xc("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Ud=t,Xc("matchMedia"))},pp=function(){function r(e,n){this.selector=n&&th(n),this.data=[],this._r=[],this.isReverted=!1,this.id=s_++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){De(n)&&(s=i,i=n,n=De);var o=this,a=function(){var c=Ce,h=o.selector,u;return c&&c!==o&&c.data.push(o),s&&(o.selector=th(s)),Ce=o,u=i.apply(o,arguments),De(u)&&o._r.push(u),Ce=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===De?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Ce;Ce=null,n(this),Ce=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof ze&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof rn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ze)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Fr.length;o--;)Fr[o].id===this.id&&Fr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),o_=function(){function r(e){this.contexts=[],this.scope=e,Ce&&Ce.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Mi(n)||(n={matches:n});var o=new pp(0,s||this.scope),a=o.conditions={},l,c,h;Ce&&!o.selector&&(o.selector=Ce.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=xi.matchMedia(n[c]),l&&(Fr.indexOf(o)<0&&Fr.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(ih):l.addEventListener("change",ih)));return h&&i(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ka={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return rp(i)})},timeline:function(t){return new rn(t)},getTweensOf:function(t,e){return Pe.getTweensOf(t,e)},getProperty:function(t,e,n,i){We(t)&&(t=Qn(t)[0]);var s=ar(t||{}).get,o=n?Xd:Wd;return n==="native"&&(n=""),t&&(e?o((In[e]&&In[e].get||s)(t,e,n,i)):function(a,l,c){return o((In[a]&&In[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Qn(t),t.length>1){var i=t.map(function(h){return cn.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var o=In[e],a=ar(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;Ms._pt=0,u.init(t,n?h+n:h,Ms,0,[t]),u.render(1,u),Ms._pt&&yh(1,Ms)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,s=cn.to(t,Br((i={},i[e]="+=0.1",i.paused=!0,i),n||{})),o=function(l,c,h){return s.resetTo(e,l,c,h)};return o.tween=s,o},isTweening:function(t){return Pe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Or(t.ease,Ss.ease)),Rd(Ss,t||{})},config:function(t){return Rd(Un,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!In[a]&&!kn[a]&&Co(e+" effect requires "+a+" plugin.")}),Hc[e]=function(a,l,c){return n(Qn(a),jn(l||{},s),c)},o&&(rn.prototype[e]=function(a,l,c){return this.add(Hc[e](a,Mi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ae[t]=Or(e)},parseEase:function(t,e){return arguments.length?Or(t,e):ae},getById:function(t){return Pe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new rn(t),i,s;for(n.smoothChildTiming=Dn(t.smoothChildTiming),Pe.remove(n),n._dp=0,n._time=n._tTime=Pe._time,i=Pe._first;i;)s=i._next,(e||!(!i._dur&&i instanceof ze&&i.vars.onComplete===i._targets[0]))&&yi(n,i,i._start-i._delay),i=s;return yi(Pe,n,0),n},context:function(t,e){return t?new pp(t,e):Ce},matchMedia:function(t){return new o_(t)},matchMediaRefresh:function(){return Fr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||ih()},addEventListener:function(t,e){var n=Na[t]||(Na[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Na[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:B0,wrapYoyo:z0,distribute:Qd,random:tp,snap:jd,normalize:F0,getUnit:sn,clamp:D0,splitColor:sp,toArray:Qn,selector:th,mapRange:np,pipe:N0,unitize:O0,interpolate:k0,shuffle:Kd},install:kd,effects:Hc,ticker:Ln,updateRoot:rn.updateRoot,plugins:In,globalTimeline:Pe,core:{PropTween:xn,globals:Hd,Tween:ze,Timeline:rn,Animation:Io,getCache:ar,_removeLinkedListItem:Ga,reverting:function(){return an},context:function(t){return t&&Ce&&(Ce.data.push(t),t._ctx=Ce),Ce},suppressOverwrites:function(t){return rh=t}}};vn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ka[r]=ze[r]});Ln.add(rn.updateRoot);Ms=ka.to({},{duration:0});var a_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},l_=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=a_(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},Yc=function(t,e){return{name:t,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(We(s)&&(l={},vn(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}l_(a,s)}}}},cn=ka.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)an?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Yc("roundProps",eh),Yc("modifiers"),Yc("snap",jd))||ka;ze.version=rn.version=cn.version="3.12.5";zd=1;sh()&&Ts();var c_=ae.Power0,h_=ae.Power1,u_=ae.Power2,f_=ae.Power3,d_=ae.Power4,p_=ae.Linear,m_=ae.Quad,g_=ae.Cubic,__=ae.Quart,v_=ae.Quint,x_=ae.Strong,y_=ae.Elastic,M_=ae.Back,S_=ae.SteppedEase,b_=ae.Bounce,w_=ae.Sine,T_=ae.Expo,E_=ae.Circ;var mp,hr,Cs,Ch,Xr,A_,gp,Rh,C_=function(){return typeof window!="undefined"},Ui={},Wr=180/Math.PI,Rs=Math.PI/180,As=Math.atan2,_p=1e8,Ph=/([A-Z])/g,R_=/(left|right|width|margin|padding|x)/i,P_=/[\s,\(]\S/,Si={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},wh=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},I_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},L_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},D_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},wp=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Tp=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},U_=function(t,e,n){return t.style[e]=n},N_=function(t,e,n){return t.style.setProperty(e,n)},O_=function(t,e,n){return t._gsap[e]=n},F_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},B_=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},z_=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Ie="transform",Nn=Ie+"Origin",k_=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Ui&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Si[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Di(i,a)}):this.tfm[t]=o.x?o[t]:Di(i,t),t===Nn&&(this.tfm.zOrigin=o.zOrigin);else return Si.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(Ie)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Nn,e,"")),t=Ie}(s||e)&&this.props.push(t,e,s[t])},Ep=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},H_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Ph,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Rh(),(!s||!s.isStart)&&!n[Ie]&&(Ep(n),i.zOrigin&&n[Nn]&&(n[Nn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Ap=function(t,e){var n={target:t,props:[],revert:H_,save:k_};return t._gsap||cn.core.getCache(t),e&&e.split(",").forEach(function(i){return n.save(i)}),n},Cp,Th=function(t,e){var n=hr.createElementNS?hr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):hr.createElement(t);return n&&n.style?n:hr.createElement(t)},bi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Ph,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ps(e)||e,1)||""},vp="O,Moz,ms,Ms,Webkit".split(","),Ps=function(t,e,n){var i=e||Xr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(vp[o]+t in s););return o<0?null:(o===3?"ms":o>=0?vp[o]:"")+t},Eh=function(){C_()&&window.document&&(mp=window,hr=mp.document,Cs=hr.documentElement,Xr=Th("div")||{style:{}},A_=Th("div"),Ie=Ps(Ie),Nn=Ie+"Origin",Xr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Cp=!!Ps("perspective"),Rh=cn.core.reverting,Ch=1)},Sh=function r(t){var e=Th("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,o;if(Cs.appendChild(e),e.appendChild(this),this.style.display="block",t)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),Cs.removeChild(e),this.style.cssText=s,o},xp=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Rp=function(t){var e;try{e=t.getBBox()}catch{e=Sh.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===Sh||(e=Sh.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+xp(t,["x","cx","x1"])||0,y:+xp(t,["y","cy","y1"])||0,width:0,height:0}:e},Pp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Rp(t))},Yr=function(t,e){if(e){var n=t.style,i;e in Ui&&e!==Nn&&(e=Ie),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Ph,"-$1").toLowerCase())):n.removeAttribute(e)}},ur=function(t,e,n,i,s,o){var a=new xn(t._pt,e,n,0,1,o?Tp:wp);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},yp={deg:1,rad:1,turn:1},V_={grid:1,flex:1},fr=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Xr.style,l=R_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,d=i==="px",f=i==="%",_,g,p,m;if(i===o||!s||yp[i]||yp[o])return s;if(o!=="px"&&!d&&(s=r(t,e,n,"px")),m=t.getCTM&&Pp(t),(f||o==="%")&&(Ui[e]||~e.indexOf("adius")))return _=m?t.getBBox()[l?"width":"height"]:t[h],Ue(f?s/_*u:s/100*_);if(a[l?"width":"height"]=u+(d?o:i),g=~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===hr||!g.appendChild)&&(g=hr.body),p=g._gsap,p&&f&&p.width&&l&&p.time===Ln.time&&!p.uncache)return Ue(s/p.width*u);if(f&&(e==="height"||e==="width")){var S=t.style[e];t.style[e]=u+i,_=t[h],S?t.style[e]=S:Yr(t,e)}else(f||o==="%")&&!V_[bi(g,"display")]&&(a.position=bi(t,"position")),g===t&&(a.position="static"),g.appendChild(Xr),_=Xr[h],g.removeChild(Xr),a.position="absolute";return l&&f&&(p=ar(g),p.time=Ln.time,p.width=g[h]),Ue(d?_*s/u:_&&s?u/_*s:0)},Di=function(t,e,n,i){var s;return Ch||Eh(),e in Si&&e!=="transform"&&(e=Si[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ui[e]&&e!=="transform"?(s=No(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Za(bi(t,Nn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=qa[e]&&qa[e](t,e,n)||bi(t,e)||fh(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?fr(t,e,s,n)+n:s},G_=function(t,e,n,i){if(!n||n==="none"){var s=Ps(e,t,1),o=s&&bi(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=bi(t,"borderTopColor"))}var a=new xn(this._pt,t.style,e,0,1,xh),l=0,c=0,h,u,d,f,_,g,p,m,S,x,y,R;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=t.style[e],t.style[e]=i,i=bi(t,e)||i,g?t.style[e]=g:Yr(t,e)),h=[n,i],dh(h),n=h[0],i=h[1],d=n.match(zr)||[],R=i.match(zr)||[],R.length){for(;u=zr.exec(i);)p=u[0],S=i.substring(l,u.index),_?_=(_+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(_=1),p!==(g=d[c++]||"")&&(f=parseFloat(g)||0,y=g.substr((f+"").length),p.charAt(1)==="="&&(p=kr(f,p)+y),m=parseFloat(p),x=p.substr((m+"").length),l=zr.lastIndex-x.length,x||(x=x||Un.units[e]||y,l===i.length&&(i+=x,a.e+=x)),y!==x&&(f=fr(t,e,g,x)||0),a._pt={_next:a._pt,p:S||c===1?S:",",s:f,c:m-f,m:_&&_<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?Tp:wp;return ah.test(i)&&(a.e=0),this._pt=a,a},Mp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},W_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Mp[n]||n,e[1]=Mp[i]||i,e.join(" ")},X_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Ui[a]&&(l=1,a=a==="transformOrigin"?Nn:Ie),Yr(n,a);l&&(Yr(n,Ie),o&&(o.svg&&n.removeAttribute("transform"),No(n,1),o.uncache=1,Ep(i)))}},qa={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new xn(t._pt,e,n,0,0,X_);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},Uo=[1,0,0,1,0,0],Ip={},Lp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Sp=function(t){var e=bi(t,Ie);return Lp(e)?Uo:e.substr(7).match(oh).map(Ue)},Ih=function(t,e){var n=t._gsap||ar(t),i=t.style,s=Sp(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Uo:s):(s===Uo&&!t.offsetParent&&t!==Cs&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent)&&(c=1,a=t.nextElementSibling,Cs.appendChild(t)),s=Sp(t),l?i.display=l:Yr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Cs.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ah=function(t,e,n,i,s,o){var a=t._gsap,l=s||Ih(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,d=a.yOffset||0,f=l[0],_=l[1],g=l[2],p=l[3],m=l[4],S=l[5],x=e.split(" "),y=parseFloat(x[0])||0,R=parseFloat(x[1])||0,E,b,P,N;n?l!==Uo&&(b=f*p-_*g)&&(P=y*(p/b)+R*(-g/b)+(g*S-p*m)/b,N=y*(-_/b)+R*(f/b)-(f*S-_*m)/b,y=P,R=N):(E=Rp(t),y=E.x+(~x[0].indexOf("%")?y/100*E.width:y),R=E.y+(~(x[1]||x[0]).indexOf("%")?R/100*E.height:R)),i||i!==!1&&a.smooth?(m=y-c,S=R-h,a.xOffset=u+(m*f+S*g)-m,a.yOffset=d+(m*_+S*p)-S):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=R,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Nn]="0px 0px",o&&(ur(o,a,"xOrigin",c,y),ur(o,a,"yOrigin",h,R),ur(o,a,"xOffset",u,a.xOffset),ur(o,a,"yOffset",d,a.yOffset)),t.setAttribute("data-svg-origin",y+" "+R)},No=function(t,e){var n=t._gsap||new ph(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=bi(t,Nn)||"0",h,u,d,f,_,g,p,m,S,x,y,R,E,b,P,N,v,w,L,k,W,J,V,B,D,Q,A,K,St,Gt,q,et;return h=u=d=g=p=m=S=x=y=0,f=_=1,n.svg=!!(t.getCTM&&Pp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ie]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ie]!=="none"?l[Ie]:"")),i.scale=i.rotate=i.translate="none"),b=Ih(t,n.svg),n.svg&&(n.uncache?(D=t.getBBox(),c=n.xOrigin-D.x+"px "+(n.yOrigin-D.y)+"px",B=""):B=!e&&t.getAttribute("data-svg-origin"),Ah(t,B||c,!!B||n.originIsAbsolute,n.smooth!==!1,b)),R=n.xOrigin||0,E=n.yOrigin||0,b!==Uo&&(w=b[0],L=b[1],k=b[2],W=b[3],h=J=b[4],u=V=b[5],b.length===6?(f=Math.sqrt(w*w+L*L),_=Math.sqrt(W*W+k*k),g=w||L?As(L,w)*Wr:0,S=k||W?As(k,W)*Wr+g:0,S&&(_*=Math.abs(Math.cos(S*Rs))),n.svg&&(h-=R-(R*w+E*k),u-=E-(R*L+E*W))):(et=b[6],Gt=b[7],A=b[8],K=b[9],St=b[10],q=b[11],h=b[12],u=b[13],d=b[14],P=As(et,St),p=P*Wr,P&&(N=Math.cos(-P),v=Math.sin(-P),B=J*N+A*v,D=V*N+K*v,Q=et*N+St*v,A=J*-v+A*N,K=V*-v+K*N,St=et*-v+St*N,q=Gt*-v+q*N,J=B,V=D,et=Q),P=As(-k,St),m=P*Wr,P&&(N=Math.cos(-P),v=Math.sin(-P),B=w*N-A*v,D=L*N-K*v,Q=k*N-St*v,q=W*v+q*N,w=B,L=D,k=Q),P=As(L,w),g=P*Wr,P&&(N=Math.cos(P),v=Math.sin(P),B=w*N+L*v,D=J*N+V*v,L=L*N-w*v,V=V*N-J*v,w=B,J=D),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,m=180-m),f=Ue(Math.sqrt(w*w+L*L+k*k)),_=Ue(Math.sqrt(V*V+et*et)),P=As(J,V),S=Math.abs(P)>2e-4?P*Wr:0,y=q?1/(q<0?-q:q):0),n.svg&&(B=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Lp(bi(t,Ie)),B&&t.setAttribute("transform",B))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(f*=-1,S+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,S+=S<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=Ue(f),n.scaleY=Ue(_),n.rotation=Ue(g)+a,n.rotationX=Ue(p)+a,n.rotationY=Ue(m)+a,n.skewX=S+a,n.skewY=x+a,n.transformPerspective=y+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Nn]=Za(c)),n.xOffset=n.yOffset=0,n.force3D=Un.force3D,n.renderTransform=n.svg?q_:Cp?Dp:Y_,n.uncache=0,n},Za=function(t){return(t=t.split(" "))[0]+" "+t[1]},bh=function(t,e,n){var i=sn(e);return Ue(parseFloat(e)+parseFloat(fr(t,"x",n+"px",i)))+i},Y_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Dp(t,e)},Vr="0deg",Do="0px",Gr=") ",Dp=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,m=n.force3D,S=n.target,x=n.zOrigin,y="",R=m==="auto"&&t&&t!==1||m===!0;if(x&&(u!==Vr||h!==Vr)){var E=parseFloat(h)*Rs,b=Math.sin(E),P=Math.cos(E),N;E=parseFloat(u)*Rs,N=Math.cos(E),o=bh(S,o,b*N*-x),a=bh(S,a,-Math.sin(E)*-x),l=bh(S,l,P*N*-x+x)}p!==Do&&(y+="perspective("+p+Gr),(i||s)&&(y+="translate("+i+"%, "+s+"%) "),(R||o!==Do||a!==Do||l!==Do)&&(y+=l!==Do||R?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Gr),c!==Vr&&(y+="rotate("+c+Gr),h!==Vr&&(y+="rotateY("+h+Gr),u!==Vr&&(y+="rotateX("+u+Gr),(d!==Vr||f!==Vr)&&(y+="skew("+d+", "+f+Gr),(_!==1||g!==1)&&(y+="scale("+_+", "+g+Gr),S.style[Ie]=y||"translate(0, 0)"},q_=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,m=n.yOffset,S=n.forceCSS,x=parseFloat(o),y=parseFloat(a),R,E,b,P,N;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Rs,c*=Rs,R=Math.cos(l)*u,E=Math.sin(l)*u,b=Math.sin(l-c)*-d,P=Math.cos(l-c)*d,c&&(h*=Rs,N=Math.tan(c-h),N=Math.sqrt(1+N*N),b*=N,P*=N,h&&(N=Math.tan(h),N=Math.sqrt(1+N*N),R*=N,E*=N)),R=Ue(R),E=Ue(E),b=Ue(b),P=Ue(P)):(R=u,P=d,E=b=0),(x&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(x=fr(f,"x",o,"px"),y=fr(f,"y",a,"px")),(_||g||p||m)&&(x=Ue(x+_-(_*R+g*b)+p),y=Ue(y+g-(_*E+g*P)+m)),(i||s)&&(N=f.getBBox(),x=Ue(x+i/100*N.width),y=Ue(y+s/100*N.height)),N="matrix("+R+","+E+","+b+","+P+","+x+","+y+")",f.setAttribute("transform",N),S&&(f.style[Ie]=N)},Z_=function(t,e,n,i,s){var o=360,a=We(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Wr:1),c=l-i,h=i+c+"deg",u,d;return a&&(u=s.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*_p)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*_p)%o-~~(c/o)*o)),t._pt=d=new xn(t._pt,e,n,i,c,I_),d.e=h,d.u="deg",t._props.push(n),d},bp=function(t,e){for(var n in e)t[n]=e[n];return t},$_=function(t,e,n){var i=bp({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,d,f,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ie]=e,a=No(n,1),Yr(n,Ie),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ie],o[Ie]=e,a=No(n,1),o[Ie]=c);for(l in Ui)c=i[l],h=a[l],c!==h&&s.indexOf(l)<0&&(f=sn(c),_=sn(h),u=f!==_?fr(n,l,c,_):parseFloat(c),d=parseFloat(h),t._pt=new xn(t._pt,a,l,u,d-u,wh),t._pt.u=_||0,t._props.push(l));bp(a,i)};vn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});qa[t>1?"border"+r:r]=function(a,l,c,h,u){var d,f;if(arguments.length<4)return d=o.map(function(_){return Di(a,_,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(h+"").split(" "),f={},o.forEach(function(_,g){return f[_]=d[g]=d[g]||d[(g-1)/2|0]}),a.init(l,f,u)}});var Lh={name:"css",register:Eh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,d,f,_,g,p,m,S,x,y,R,E,b,P;Ch||Eh(),this.styles=this.styles||Ap(t),P=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(h=e[g],!(In[g]&&gh(g,e,n,i,t,s)))){if(f=typeof h,_=qa[g],f==="function"&&(h=h.call(n,i,t,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Es(h)),_)_(this,t,g,h,n)&&(b=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),h+="",Ii.lastIndex=0,Ii.test(c)||(p=sn(c),m=sn(h)),m?p!==m&&(c=fr(t,g,c,m)+m):p&&(h+=p),this.add(a,"setProperty",c,h,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,t,s):l[g],We(c)&&~c.indexOf("random(")&&(c=Es(c)),sn(c+"")||c==="auto"||(c+=Un.units[g]||sn(Di(t,g))||""),(c+"").charAt(1)==="="&&(c=Di(t,g))):c=Di(t,g),d=parseFloat(c),S=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),S&&(h=h.substr(2)),u=parseFloat(h),g in Si&&(g==="autoAlpha"&&(d===1&&Di(t,"visibility")==="hidden"&&u&&(d=0),P.push("visibility",0,a.visibility),ur(this,a,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),g!=="scale"&&g!=="transform"&&(g=Si[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in Ui,x){if(this.styles.save(g),y||(R=t._gsap,R.renderTransform&&!e.parseTransform||No(t,e.parseTransform),E=e.smoothOrigin!==!1&&R.smooth,y=this._pt=new xn(this._pt,a,Ie,0,1,R.renderTransform,R,0,-1),y.dep=1),g==="scale")this._pt=new xn(this._pt,R,"scaleY",R.scaleY,(S?kr(R.scaleY,S+u):u)-R.scaleY||0,wh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(Nn,0,a[Nn]),h=W_(h),R.svg?Ah(t,h,0,E,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==R.zOrigin&&ur(this,R,"zOrigin",R.zOrigin,m),ur(this,a,g,Za(c),Za(h)));continue}else if(g==="svgOrigin"){Ah(t,h,1,E,0,this);continue}else if(g in Ip){Z_(this,R,g,d,S?kr(d,S+h):h);continue}else if(g==="smoothOrigin"){ur(this,R,"smooth",R.smooth,h);continue}else if(g==="force3D"){R[g]=h;continue}else if(g==="transform"){$_(this,h,t);continue}}else g in a||(g=Ps(g)||g);if(x||(u||u===0)&&(d||d===0)&&!P_.test(h)&&g in a)p=(c+"").substr((d+"").length),u||(u=0),m=sn(h)||(g in Un.units?Un.units[g]:p),p!==m&&(d=fr(t,g,c,m)),this._pt=new xn(this._pt,x?R:a,g,d,(S?kr(d,S+u):u)-d,!x&&(m==="px"||g==="zIndex")&&e.autoRound!==!1?D_:wh),this._pt.u=m||0,p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=L_);else if(g in a)G_.call(this,t,g,c,S?S+h:h);else if(g in t)this.add(t,g,c||t[g],S?S+h:h,i,s);else if(g!=="parseTransform"){Va(g,h);continue}x||(g in a?P.push(g,0,a[g]):P.push(g,1,c||t[g])),o.push(g)}}b&&Mh(this)},render:function(t,e){if(e.tween._time||!Rh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Di,aliases:Si,getSetter:function(t,e,n){var i=Si[e];return i&&i.indexOf(",")<0&&(e=i),e in Ui&&e!==Nn&&(t._gsap.x||Di(t,"x"))?n&&gp===n?e==="scale"?F_:O_:(gp=n||{})&&(e==="scale"?B_:z_):t.style&&!Ha(t.style[e])?U_:~e.indexOf("-")?N_:Ya(t,e)},core:{_removeProperty:Yr,_getMatrix:Ih}};cn.utils.checkPrefix=Ps;cn.core.getStyleSaver=Ap;(function(r,t,e,n){var i=vn(r+","+t+","+e,function(s){Ui[s]=1});vn(t,function(s){Un.units[s]="deg",Ip[s]=1}),Si[i[13]]=r+","+t,vn(n,function(s){var o=s.split(":");Si[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");vn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Un.units[r]="px"});cn.registerPlugin(Lh);var he=cn.registerPlugin(Lh)||cn,tw=he.core.Tween;function Up(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function J_(r,t,e){return t&&Up(r.prototype,t),e&&Up(r,e),r}var on,Ka,K_,Hn,dr,pr,Ls,Op,qr,Fo,Fp,Ni,ci,Bp,zp=function(){return on||typeof window!="undefined"&&(on=window.gsap)&&on.registerPlugin&&on},kp=1,Is=[],jt=[],hi=[],Bo=Date.now,Dh=function(t,e){return e},Q_=function(){var t=Fo.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,jt),i.push.apply(i,hi),jt=n,hi=i,Dh=function(o,a){return e[o](a)}},Fi=function(t,e){return~hi.indexOf(t)&&hi[hi.indexOf(t)+1][e]},zo=function(t){return!!~Fp.indexOf(t)},Mn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},yn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},$a="scrollLeft",Ja="scrollTop",Uh=function(){return Ni&&Ni.isPressed||jt.cache++},Qa=function(t,e){var n=function i(s){if(s||s===0){kp&&(Hn.history.scrollRestoration="manual");var o=Ni&&Ni.isPressed;s=i.v=Math.round(s)||(Ni&&Ni.iOS?1:0),t(s),i.cacheID=jt.cache,o&&Dh("ss",s)}else(e||jt.cache!==i.cacheID||Dh("ref"))&&(i.cacheID=jt.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},hn={s:$a,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Qa(function(r){return arguments.length?Hn.scrollTo(r,ke.sc()):Hn.pageXOffset||dr[$a]||pr[$a]||Ls[$a]||0})},ke={s:Ja,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:hn,sc:Qa(function(r){return arguments.length?Hn.scrollTo(hn.sc(),r):Hn.pageYOffset||dr[Ja]||pr[Ja]||Ls[Ja]||0})},Sn=function(t,e){return(e&&e._ctx&&e._ctx.selector||on.utils.toArray)(t)[0]||(typeof t=="string"&&on.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Oi=function(t,e){var n=e.s,i=e.sc;zo(t)&&(t=dr.scrollingElement||pr);var s=jt.indexOf(t),o=i===ke.sc?1:2;!~s&&(s=jt.push(t)-1),jt[s+o]||Mn(t,"scroll",Uh);var a=jt[s+o],l=a||(jt[s+o]=Qa(Fi(t,n),!0)||(zo(t)?i:Qa(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=on.getProperty(t,"scrollBehavior")==="smooth"),l},ja=function(t,e,n){var i=t,s=t,o=Bo(),a=o,l=e||50,c=Math.max(500,l*3),h=function(_,g){var p=Bo();g||p-o>l?(s=i,i=_,a=o,o=p):n?i+=_:i=s+(_-s)/(p-a)*(o-a)},u=function(){s=i=n?0:i,a=o=0},d=function(_){var g=a,p=s,m=Bo();return(_||_===0)&&_!==i&&h(_),o===a||m-a>c?0:(i+(n?p:-p))/((n?m:o)-g)*1e3};return{update:h,reset:u,getVelocity:d}},Oo=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Np=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},Hp=function(){Fo=on.core.globals().ScrollTrigger,Fo&&Fo.core&&Q_()},Vp=function(t){return on=t||zp(),!Ka&&on&&typeof document!="undefined"&&document.body&&(Hn=window,dr=document,pr=dr.documentElement,Ls=dr.body,Fp=[Hn,dr,pr,Ls],K_=on.utils.clamp,Bp=on.core.context||function(){},qr="onpointerenter"in Ls?"pointer":"mouse",Op=Ne.isTouch=Hn.matchMedia&&Hn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Hn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ci=Ne.eventTypes=("ontouchstart"in pr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in pr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return kp=0},500),Hp(),Ka=1),Ka};hn.op=ke;jt.cache=0;var Ne=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){Ka||Vp(on)||console.warn("Please gsap.registerPlugin(Observer)"),Fo||Hp();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,u=n.onStop,d=n.onStopDelay,f=n.ignore,_=n.wheelSpeed,g=n.event,p=n.onDragStart,m=n.onDragEnd,S=n.onDrag,x=n.onPress,y=n.onRelease,R=n.onRight,E=n.onLeft,b=n.onUp,P=n.onDown,N=n.onChangeX,v=n.onChangeY,w=n.onChange,L=n.onToggleX,k=n.onToggleY,W=n.onHover,J=n.onHoverEnd,V=n.onMove,B=n.ignoreCheck,D=n.isNormalizer,Q=n.onGestureStart,A=n.onGestureEnd,K=n.onWheel,St=n.onEnable,Gt=n.onDisable,q=n.onClick,et=n.scrollSpeed,lt=n.capture,rt=n.allowClicks,gt=n.lockAxis,yt=n.onLockAxis;this.target=a=Sn(a)||pr,this.vars=n,f&&(f=on.utils.toArray(f)),i=i||1e-9,s=s||0,_=_||1,et=et||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Hn.getComputedStyle(Ls).lineHeight)||22);var Ht,Ut,Nt,I,ee,Dt,Wt,z=this,Qt=0,Lt=0,C=n.passive||!h,M=Oi(a,hn),Y=Oi(a,ke),j=M(),it=Y(),$=~o.indexOf("touch")&&!~o.indexOf("pointer")&&ci[0]==="pointerdown",wt=zo(a),ot=a.ownerDocument||dr,dt=[0,0,0],Yt=[0,0,0],st=0,Mt=function(){return st=Bo()},bt=function(Et,ce){return(z.event=Et)&&f&&~f.indexOf(Et.target)||ce&&$&&Et.pointerType!=="touch"||B&&B(Et,ce)},Ot=function(){z._vx.reset(),z._vy.reset(),Ut.pause(),u&&u(z)},xt=function(){var Et=z.deltaX=Np(dt),ce=z.deltaY=Np(Yt),pt=Math.abs(Et)>=i,Ft=Math.abs(ce)>=i;w&&(pt||Ft)&&w(z,Et,ce,dt,Yt),pt&&(R&&z.deltaX>0&&R(z),E&&z.deltaX<0&&E(z),N&&N(z),L&&z.deltaX<0!=Qt<0&&L(z),Qt=z.deltaX,dt[0]=dt[1]=dt[2]=0),Ft&&(P&&z.deltaY>0&&P(z),b&&z.deltaY<0&&b(z),v&&v(z),k&&z.deltaY<0!=Lt<0&&k(z),Lt=z.deltaY,Yt[0]=Yt[1]=Yt[2]=0),(I||Nt)&&(V&&V(z),Nt&&(S(z),Nt=!1),I=!1),Dt&&!(Dt=!1)&&yt&&yt(z),ee&&(K(z),ee=!1),Ht=0},qt=function(Et,ce,pt){dt[pt]+=Et,Yt[pt]+=ce,z._vx.update(Et),z._vy.update(ce),c?Ht||(Ht=requestAnimationFrame(xt)):xt()},zt=function(Et,ce){gt&&!Wt&&(z.axis=Wt=Math.abs(Et)>Math.abs(ce)?"x":"y",Dt=!0),Wt!=="y"&&(dt[2]+=Et,z._vx.update(Et,!0)),Wt!=="x"&&(Yt[2]+=ce,z._vy.update(ce,!0)),c?Ht||(Ht=requestAnimationFrame(xt)):xt()},se=function(Et){if(!bt(Et,1)){Et=Oo(Et,h);var ce=Et.clientX,pt=Et.clientY,Ft=ce-z.x,Pt=pt-z.y,Xt=z.isDragging;z.x=ce,z.y=pt,(Xt||Math.abs(z.startX-ce)>=s||Math.abs(z.startY-pt)>=s)&&(S&&(Nt=!0),Xt||(z.isDragging=!0),zt(Ft,Pt),Xt||p&&p(z))}},U=z.onPress=function(Rt){bt(Rt,1)||Rt&&Rt.button||(z.axis=Wt=null,Ut.pause(),z.isPressed=!0,Rt=Oo(Rt),Qt=Lt=0,z.startX=z.x=Rt.clientX,z.startY=z.y=Rt.clientY,z._vx.reset(),z._vy.reset(),Mn(D?a:ot,ci[1],se,C,!0),z.deltaX=z.deltaY=0,x&&x(z))},nt=z.onRelease=function(Rt){if(!bt(Rt,1)){yn(D?a:ot,ci[1],se,!0);var Et=!isNaN(z.y-z.startY),ce=z.isDragging,pt=ce&&(Math.abs(z.x-z.startX)>3||Math.abs(z.y-z.startY)>3),Ft=Oo(Rt);!pt&&Et&&(z._vx.reset(),z._vy.reset(),h&&rt&&on.delayedCall(.08,function(){if(Bo()-st>300&&!Rt.defaultPrevented){if(Rt.target.click)Rt.target.click();else if(ot.createEvent){var Pt=ot.createEvent("MouseEvents");Pt.initMouseEvent("click",!0,!0,Hn,1,Ft.screenX,Ft.screenY,Ft.clientX,Ft.clientY,!1,!1,!1,!1,0,null),Rt.target.dispatchEvent(Pt)}}})),z.isDragging=z.isGesturing=z.isPressed=!1,u&&ce&&!D&&Ut.restart(!0),m&&ce&&m(z),y&&y(z,pt)}},Z=function(Et){return Et.touches&&Et.touches.length>1&&(z.isGesturing=!0)&&Q(Et,z.isDragging)},tt=function(){return(z.isGesturing=!1)||A(z)},ct=function(Et){if(!bt(Et)){var ce=M(),pt=Y();qt((ce-j)*et,(pt-it)*et,1),j=ce,it=pt,u&&Ut.restart(!0)}},ht=function(Et){if(!bt(Et)){Et=Oo(Et,h),K&&(ee=!0);var ce=(Et.deltaMode===1?l:Et.deltaMode===2?Hn.innerHeight:1)*_;qt(Et.deltaX*ce,Et.deltaY*ce,0),u&&!D&&Ut.restart(!0)}},Zt=function(Et){if(!bt(Et)){var ce=Et.clientX,pt=Et.clientY,Ft=ce-z.x,Pt=pt-z.y;z.x=ce,z.y=pt,I=!0,u&&Ut.restart(!0),(Ft||Pt)&&zt(Ft,Pt)}},ve=function(Et){z.event=Et,W(z)},Ee=function(Et){z.event=Et,J(z)},ne=function(Et){return bt(Et)||Oo(Et,h)&&q(z)};Ut=z._dc=on.delayedCall(d||.25,Ot).pause(),z.deltaX=z.deltaY=0,z._vx=ja(0,50,!0),z._vy=ja(0,50,!0),z.scrollX=M,z.scrollY=Y,z.isDragging=z.isGesturing=z.isPressed=!1,Bp(this),z.enable=function(Rt){return z.isEnabled||(Mn(wt?ot:a,"scroll",Uh),o.indexOf("scroll")>=0&&Mn(wt?ot:a,"scroll",ct,C,lt),o.indexOf("wheel")>=0&&Mn(a,"wheel",ht,C,lt),(o.indexOf("touch")>=0&&Op||o.indexOf("pointer")>=0)&&(Mn(a,ci[0],U,C,lt),Mn(ot,ci[2],nt),Mn(ot,ci[3],nt),rt&&Mn(a,"click",Mt,!0,!0),q&&Mn(a,"click",ne),Q&&Mn(ot,"gesturestart",Z),A&&Mn(ot,"gestureend",tt),W&&Mn(a,qr+"enter",ve),J&&Mn(a,qr+"leave",Ee),V&&Mn(a,qr+"move",Zt)),z.isEnabled=!0,Rt&&Rt.type&&U(Rt),St&&St(z)),z},z.disable=function(){z.isEnabled&&(Is.filter(function(Rt){return Rt!==z&&zo(Rt.target)}).length||yn(wt?ot:a,"scroll",Uh),z.isPressed&&(z._vx.reset(),z._vy.reset(),yn(D?a:ot,ci[1],se,!0)),yn(wt?ot:a,"scroll",ct,lt),yn(a,"wheel",ht,lt),yn(a,ci[0],U,lt),yn(ot,ci[2],nt),yn(ot,ci[3],nt),yn(a,"click",Mt,!0),yn(a,"click",ne),yn(ot,"gesturestart",Z),yn(ot,"gestureend",tt),yn(a,qr+"enter",ve),yn(a,qr+"leave",Ee),yn(a,qr+"move",Zt),z.isEnabled=z.isPressed=z.isDragging=!1,Gt&&Gt(z))},z.kill=z.revert=function(){z.disable();var Rt=Is.indexOf(z);Rt>=0&&Is.splice(Rt,1),Ni===z&&(Ni=0)},Is.push(z),D&&zo(a)&&(Ni=z),z.enable(g)},J_(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ne.version="3.12.5";Ne.create=function(r){return new Ne(r)};Ne.register=Vp;Ne.getAll=function(){return Is.slice()};Ne.getById=function(r){return Is.filter(function(t){return t.vars.id===r})[0]};zp()&&on.registerPlugin(Ne);var Tt,Ns,le,Le,ui,we,om,ml,Qo,Yo,Ho,tl,un,xl,Vh,wn,Gp,Wp,Os,am,Nh,lm,bn,Gh,cm,hm,mr,Wh,$h,Fs,Jh,gl,Xh,Oh,el=1,fn=Date.now,Fh=fn(),ni=0,Vo=0,Xp=function(t,e,n){var i=Gn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},Yp=function(t,e){return e&&(!Gn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},j_=function r(){return Vo&&requestAnimationFrame(r)},qp=function(){return xl=1},Zp=function(){return xl=0},wi=function(t){return t},Go=function(t){return Math.round(t*1e5)/1e5||0},um=function(){return typeof window!="undefined"},fm=function(){return Tt||um()&&(Tt=window.gsap)&&Tt.registerPlugin&&Tt},jr=function(t){return!!~om.indexOf(t)},dm=function(t){return(t==="Height"?Jh:le["inner"+t])||ui["client"+t]||we["client"+t]},pm=function(t){return Fi(t,"getBoundingClientRect")||(jr(t)?function(){return pl.width=le.innerWidth,pl.height=Jh,pl}:function(){return Bi(t)})},tv=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=Fi(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?dm(s):t["client"+s])||0}},ev=function(t,e){return!e||~hi.indexOf(t)?pm(t):function(){return pl}},Ti=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=Fi(t,n))?o()-pm(t)()[s]:jr(t)?(ui[n]||we[n])-dm(i):t[n]-t["offset"+i])},nl=function(t,e){for(var n=0;n<Os.length;n+=3)(!e||~e.indexOf(Os[n+1]))&&t(Os[n],Os[n+1],Os[n+2])},Gn=function(t){return typeof t=="string"},En=function(t){return typeof t=="function"},Wo=function(t){return typeof t=="number"},Zr=function(t){return typeof t=="object"},ko=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Bh=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},Ds=Math.abs,mm="left",gm="top",Kh="right",Qh="bottom",Jr="width",Kr="height",qo="Right",Zo="Left",$o="Top",Jo="Bottom",He="padding",ti="margin",zs="Width",jh="Height",Xe="px",ei=function(t){return le.getComputedStyle(t)},nv=function(t){var e=ei(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},$p=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Bi=function(t,e){var n=e&&ei(t)[Vh]!=="matrix(1, 0, 0, 1, 0, 0)"&&Tt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect();return n&&n.progress(0).kill(),i},_l=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},_m=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},iv=function(t){return function(e){return Tt.utils.snap(_m(t),e)}},tu=function(t){var e=Tt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},rv=function(t){return function(e,n){return tu(_m(t))(e,n.direction)}},il=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Qe=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},Ke=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},rl=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Jp={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},sl={toggleActions:"play",anticipatePin:0},vl={top:0,left:0,center:.5,bottom:1,right:1},hl=function(t,e){if(Gn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in vl?vl[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},ol=function(t,e,n,i,s,o,a,l){var c=s.startColor,h=s.endColor,u=s.fontSize,d=s.indent,f=s.fontWeight,_=Le.createElement("div"),g=jr(n)||Fi(n,"pinType")==="fixed",p=t.indexOf("scroller")!==-1,m=g?we:n,S=t.indexOf("start")!==-1,x=S?c:h,y="border-color:"+x+";font-size:"+u+";color:"+x+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((p||l)&&g?"fixed;":"absolute;"),(p||l||!g)&&(y+=(i===ke?Kh:Qh)+":"+(o+parseFloat(d))+"px;"),a&&(y+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=S,_.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),_.style.cssText=y,_.innerText=e||e===0?t+"-"+e:t,m.children[0]?m.insertBefore(_,m.children[0]):m.appendChild(_),_._offset=_["offset"+i.op.d2],ul(_,0,i,S),_},ul=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+zs]=1,s["border"+a+zs]=0,s[n.p]=e+"px",Tt.set(t,s)},te=[],Yh={},jo,Kp=function(){return fn()-ni>34&&(jo||(jo=requestAnimationFrame(zi)))},Us=function(){(!bn||!bn.isPressed||bn.startX>we.clientWidth)&&(jt.cache++,bn?jo||(jo=requestAnimationFrame(zi)):zi(),ni||es("scrollStart"),ni=fn())},zh=function(){hm=le.innerWidth,cm=le.innerHeight},Xo=function(){jt.cache++,!un&&!lm&&!Le.fullscreenElement&&!Le.webkitFullscreenElement&&(!Gh||hm!==le.innerWidth||Math.abs(le.innerHeight-cm)>le.innerHeight*.25)&&ml.restart(!0)},ts={},sv=[],vm=function r(){return Ke(kt,"scrollEnd",r)||$r(!0)},es=function(t){return ts[t]&&ts[t].map(function(e){return e()})||sv},Vn=[],xm=function(t){for(var e=0;e<Vn.length;e+=5)(!t||Vn[e+4]&&Vn[e+4].query===t)&&(Vn[e].style.cssText=Vn[e+1],Vn[e].getBBox&&Vn[e].setAttribute("transform",Vn[e+2]||""),Vn[e+3].uncache=1)},eu=function(t,e){var n;for(wn=0;wn<te.length;wn++)n=te[wn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));gl=!0,e&&xm(e),e||es("revert")},ym=function(t,e){jt.cache++,(e||!Tn)&&jt.forEach(function(n){return En(n)&&n.cacheID++&&(n.rec=0)}),Gn(t)&&(le.history.scrollRestoration=$h=t)},Tn,Qr=0,Qp,ov=function(){if(Qp!==Qr){var t=Qp=Qr;requestAnimationFrame(function(){return t===Qr&&$r(!0)})}},Mm=function(){we.appendChild(Fs),Jh=!bn&&Fs.offsetHeight||le.innerHeight,we.removeChild(Fs)},jp=function(t){return Qo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},$r=function(t,e){if(ni&&!t&&!gl){Qe(kt,"scrollEnd",vm);return}Mm(),Tn=kt.isRefreshing=!0,jt.forEach(function(i){return En(i)&&++i.cacheID&&(i.rec=i())});var n=es("refreshInit");am&&kt.sort(),e||eu(),jt.forEach(function(i){En(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),te.slice(0).forEach(function(i){return i.refresh()}),gl=!1,te.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Xh=1,jp(!0),te.forEach(function(i){var s=Ti(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),jp(!1),Xh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),jt.forEach(function(i){En(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),ym($h,1),ml.pause(),Qr++,Tn=2,zi(2),te.forEach(function(i){return En(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Tn=kt.isRefreshing=!1,es("refresh")},qh=0,fl=1,Ko,zi=function(t){if(t===2||!Tn&&!gl){kt.isUpdating=!0,Ko&&Ko.update(0);var e=te.length,n=fn(),i=n-Fh>=50,s=e&&te[0].scroll();if(fl=qh>s?-1:1,Tn||(qh=s),i&&(ni&&!xl&&n-ni>200&&(ni=0,es("scrollEnd")),Ho=Fh,Fh=n),fl<0){for(wn=e;wn-- >0;)te[wn]&&te[wn].update(0,i);fl=1}else for(wn=0;wn<e;wn++)te[wn]&&te[wn].update(0,i);kt.isUpdating=!1}jo=0},Zh=[mm,gm,Qh,Kh,ti+Jo,ti+qo,ti+$o,ti+Zo,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],dl=Zh.concat([Jr,Kr,"boxSizing","max"+zs,"max"+jh,"position",ti,He,He+$o,He+qo,He+Jo,He+Zo]),av=function(t,e,n){Bs(n);var i=t._gsap;if(i.spacerIsNative)Bs(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},kh=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=Zh.length,o=e.style,a=t.style,l;s--;)l=Zh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Qh]=a[Kh]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Jr]=_l(t,hn)+Xe,o[Kr]=_l(t,ke)+Xe,o[He]=a[ti]=a[gm]=a[mm]="0",Bs(i),a[Jr]=a["max"+zs]=n[Jr],a[Kr]=a["max"+jh]=n[Kr],a[He]=n[He],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},lv=/([A-Z])/g,Bs=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||Tt.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(lv,"-$1").toLowerCase())}},al=function(t){for(var e=dl.length,n=t.style,i=[],s=0;s<e;s++)i.push(dl[s],n[dl[s]]);return i.t=t,i},cv=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},pl={left:0,top:0},tm=function(t,e,n,i,s,o,a,l,c,h,u,d,f,_){En(t)&&(t=t(l)),Gn(t)&&t.substr(0,3)==="max"&&(t=d+(t.charAt(4)==="="?hl("0"+t.substr(3),n):0));var g=f?f.time():0,p,m,S;if(f&&f.seek(0),isNaN(t)||(t=+t),Wo(t))f&&(t=Tt.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,t)),a&&ul(a,n,i,!0);else{En(e)&&(e=e(l));var x=(t||"0").split(" "),y,R,E,b;S=Sn(e,l)||we,y=Bi(S)||{},(!y||!y.left&&!y.top)&&ei(S).display==="none"&&(b=S.style.display,S.style.display="block",y=Bi(S),b?S.style.display=b:S.style.removeProperty("display")),R=hl(x[0],y[i.d]),E=hl(x[1]||"0",n),t=y[i.p]-c[i.p]-h+R+s-E,a&&ul(a,E,i,n-E<20||a._isStart&&E>20),n-=n-E}if(_&&(l[_]=t||-.001,t<0&&(t=0)),o){var P=t+n,N=o._isStart;p="scroll"+i.d2,ul(o,P,i,N&&P>20||!N&&(u?Math.max(we[p],ui[p]):o.parentNode[p])<=P+1),u&&(c=Bi(a),u&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Xe))}return f&&S&&(p=Bi(S),f.seek(d),m=Bi(S),f._caScrollDist=p[i.p]-m[i.p],t=t/f._caScrollDist*d),f&&f.seek(g),f?t:Math.round(t)},hv=/(webkit|moz|length|cssText|inset)/i,em=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===we){t._stOrig=s.cssText,a=ei(t);for(o in a)!+o&&!hv.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;Tt.core.getCache(t).uncache=1,e.appendChild(t)}},Sm=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=o,o}},ll=function(t,e,n){var i={};i[e.p]="+="+n,Tt.set(t,i)},nm=function(t,e){var n=Oi(t,e),i="_scroll"+e.p2,s=function o(a,l,c,h,u){var d=o.tween,f=l.onComplete,_={};c=c||n();var g=Sm(n,c,function(){d.kill(),o.tween=0});return u=h&&u||0,h=h||a-c,d&&d.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+h*d.ratio+u*d.ratio*d.ratio)},l.onUpdate=function(){jt.cache++,o.tween&&zi()},l.onComplete=function(){o.tween=0,f&&f.call(d)},d=o.tween=Tt.to(t,l),d};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Qe(t,"wheel",n.wheelHandler),kt.isTouch&&Qe(t,"touchmove",n.wheelHandler),s},kt=function(){function r(e,n){Ns||r.register(Tt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Wh(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Vo){this.update=this.refresh=this.kill=wi;return}n=$p(Gn(n)||Wo(n)||n.nodeType?{trigger:n}:n,sl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,u=s.scrub,d=s.trigger,f=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,S=s.onSnapComplete,x=s.once,y=s.snap,R=s.pinReparent,E=s.pinSpacer,b=s.containerAnimation,P=s.fastScrollEnd,N=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?hn:ke,w=!u&&u!==0,L=Sn(n.scroller||le),k=Tt.core.getCache(L),W=jr(L),J=("pinType"in n?n.pinType:Fi(L,"pinType")||W&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],B=w&&n.toggleActions.split(" "),D="markers"in n?n.markers:sl.markers,Q=W?0:parseFloat(ei(L)["border"+v.p2+zs])||0,A=this,K=n.onRefreshInit&&function(){return n.onRefreshInit(A)},St=tv(L,W,v),Gt=ev(L,W),q=0,et=0,lt=0,rt=Oi(L,v),gt,yt,Ht,Ut,Nt,I,ee,Dt,Wt,z,Qt,Lt,C,M,Y,j,it,$,wt,ot,dt,Yt,st,Mt,bt,Ot,xt,qt,zt,se,U,nt,Z,tt,ct,ht,Zt,ve,Ee;if(A._startClamp=A._endClamp=!1,A._dir=v,p*=45,A.scroller=L,A.scroll=b?b.time.bind(b):rt,Ut=rt(),A.vars=n,i=i||n.animation,"refreshPriority"in n&&(am=1,n.refreshPriority===-9999&&(Ko=A)),k.tweenScroll=k.tweenScroll||{top:nm(L,ke),left:nm(L,hn)},A.tweenTo=gt=k.tweenScroll[v.p],A.scrubDuration=function(pt){Z=Wo(pt)&&pt,Z?nt?nt.duration(pt):nt=Tt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Z,paused:!0,onComplete:function(){return m&&m(A)}}):(nt&&nt.progress(1).kill(),nt=0)},i&&(i.vars.lazy=!1,i._initted&&!A.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),A.animation=i.pause(),i.scrollTrigger=A,A.scrubDuration(u),se=0,l||(l=i.vars.id)),y&&((!Zr(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in we.style&&Tt.set(W?[we,ui]:L,{scrollBehavior:"auto"}),jt.forEach(function(pt){return En(pt)&&pt.target===(W?Le.scrollingElement||ui:L)&&(pt.smooth=!1)}),Ht=En(y.snapTo)?y.snapTo:y.snapTo==="labels"?iv(i):y.snapTo==="labelsDirectional"?rv(i):y.directional!==!1?function(pt,Ft){return tu(y.snapTo)(pt,fn()-et<500?0:Ft.direction)}:Tt.utils.snap(y.snapTo),tt=y.duration||{min:.1,max:2},tt=Zr(tt)?Yo(tt.min,tt.max):Yo(tt,tt),ct=Tt.delayedCall(y.delay||Z/2||.1,function(){var pt=rt(),Ft=fn()-et<500,Pt=gt.tween;if((Ft||Math.abs(A.getVelocity())<10)&&!Pt&&!xl&&q!==pt){var Xt=(pt-I)/M,Oe=i&&!w?i.totalProgress():Xt,$t=Ft?0:(Oe-U)/(fn()-Ho)*1e3||0,Ae=Tt.utils.clamp(-Xt,1-Xt,Ds($t/2)*$t/.185),Fe=Xt+(y.inertia===!1?0:Ae),Se,xe,me=y,Fn=me.onStart,be=me.onInterrupt,T=me.onComplete;if(Se=Ht(Fe,A),Wo(Se)||(Se=Fe),xe=Math.round(I+Se*M),pt<=ee&&pt>=I&&xe!==pt){if(Pt&&!Pt._initted&&Pt.data<=Ds(xe-pt))return;y.inertia===!1&&(Ae=Se-Xt),gt(xe,{duration:tt(Ds(Math.max(Ds(Fe-Oe),Ds(Se-Oe))*.185/$t/.05||0)),ease:y.ease||"power3",data:Ds(xe-pt),onInterrupt:function(){return ct.restart(!0)&&be&&be(A)},onComplete:function(){A.update(),q=rt(),i&&(nt?nt.resetTo("totalProgress",Se,i._tTime/i._tDur):i.progress(Se)),se=U=i&&!w?i.totalProgress():A.progress,S&&S(A),T&&T(A)}},pt,Ae*M,xe-pt-Ae*M),Fn&&Fn(A,gt.tween)}}else A.isActive&&q!==pt&&ct.restart(!0)}).pause()),l&&(Yh[l]=A),d=A.trigger=Sn(d||f!==!0&&f),Ee=d&&d._gsap&&d._gsap.stRevert,Ee&&(Ee=Ee(A)),f=f===!0?d:Sn(f),Gn(a)&&(a={targets:d,className:a}),f&&(_===!1||_===ti||(_=!_&&f.parentNode&&f.parentNode.style&&ei(f.parentNode).display==="flex"?!1:He),A.pin=f,yt=Tt.core.getCache(f),yt.spacer?Y=yt.pinState:(E&&(E=Sn(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),yt.spacerIsNative=!!E,E&&(yt.spacerState=al(E))),yt.spacer=$=E||Le.createElement("div"),$.classList.add("pin-spacer"),l&&$.classList.add("pin-spacer-"+l),yt.pinState=Y=al(f)),n.force3D!==!1&&Tt.set(f,{force3D:!0}),A.spacer=$=yt.spacer,zt=ei(f),Mt=zt[_+v.os2],ot=Tt.getProperty(f),dt=Tt.quickSetter(f,v.a,Xe),kh(f,$,zt),it=al(f)),D){Lt=Zr(D)?$p(D,Jp):Jp,z=ol("scroller-start",l,L,v,Lt,0),Qt=ol("scroller-end",l,L,v,Lt,0,z),wt=z["offset"+v.op.d2];var ne=Sn(Fi(L,"content")||L);Dt=this.markerStart=ol("start",l,ne,v,Lt,wt,0,b),Wt=this.markerEnd=ol("end",l,ne,v,Lt,wt,0,b),b&&(ve=Tt.quickSetter([Dt,Wt],v.a,Xe)),!J&&!(hi.length&&Fi(L,"fixedMarkers")===!0)&&(nv(W?we:L),Tt.set([z,Qt],{force3D:!0}),Ot=Tt.quickSetter(z,v.a,Xe),qt=Tt.quickSetter(Qt,v.a,Xe))}if(b){var Rt=b.vars.onUpdate,Et=b.vars.onUpdateParams;b.eventCallback("onUpdate",function(){A.update(0,0,1),Rt&&Rt.apply(b,Et||[])})}if(A.previous=function(){return te[te.indexOf(A)-1]},A.next=function(){return te[te.indexOf(A)+1]},A.revert=function(pt,Ft){if(!Ft)return A.kill(!0);var Pt=pt!==!1||!A.enabled,Xt=un;Pt!==A.isReverted&&(Pt&&(ht=Math.max(rt(),A.scroll.rec||0),lt=A.progress,Zt=i&&i.progress()),Dt&&[Dt,Wt,z,Qt].forEach(function(Oe){return Oe.style.display=Pt?"none":"block"}),Pt&&(un=A,A.update(Pt)),f&&(!R||!A.isActive)&&(Pt?av(f,$,Y):kh(f,$,ei(f),bt)),Pt||A.update(Pt),un=Xt,A.isReverted=Pt)},A.refresh=function(pt,Ft,Pt,Xt){if(!((un||!A.enabled)&&!Ft)){if(f&&pt&&ni){Qe(r,"scrollEnd",vm);return}!Tn&&K&&K(A),un=A,gt.tween&&!Pt&&(gt.tween.kill(),gt.tween=0),nt&&nt.pause(),g&&i&&i.revert({kill:!1}).invalidate(),A.isReverted||A.revert(!0,!0),A._subPinOffset=!1;var Oe=St(),$t=Gt(),Ae=b?b.duration():Ti(L,v),Fe=M<=.01,Se=0,xe=Xt||0,me=Zr(Pt)?Pt.end:n.end,Fn=n.endTrigger||d,be=Zr(Pt)?Pt.start:n.start||(n.start===0||!d?0:f?"0 0":"0 100%"),T=A.pinnedContainer=n.pinnedContainer&&Sn(n.pinnedContainer,A),F=d&&Math.max(0,te.indexOf(A))||0,G=F,X,O,at,_t,ft,ut,Ct,Bt,At,oe,ie,ge,$e;for(D&&Zr(Pt)&&(ge=Tt.getProperty(z,v.p),$e=Tt.getProperty(Qt,v.p));G--;)ut=te[G],ut.end||ut.refresh(0,1)||(un=A),Ct=ut.pin,Ct&&(Ct===d||Ct===f||Ct===T)&&!ut.isReverted&&(oe||(oe=[]),oe.unshift(ut),ut.revert(!0,!0)),ut!==te[G]&&(F--,G--);for(En(be)&&(be=be(A)),be=Xp(be,"start",A),I=tm(be,d,Oe,v,rt(),Dt,z,A,$t,Q,J,Ae,b,A._startClamp&&"_startClamp")||(f?-.001:0),En(me)&&(me=me(A)),Gn(me)&&!me.indexOf("+=")&&(~me.indexOf(" ")?me=(Gn(be)?be.split(" ")[0]:"")+me:(Se=hl(me.substr(2),Oe),me=Gn(be)?be:(b?Tt.utils.mapRange(0,b.duration(),b.scrollTrigger.start,b.scrollTrigger.end,I):I)+Se,Fn=d)),me=Xp(me,"end",A),ee=Math.max(I,tm(me||(Fn?"100% 0":Ae),Fn,Oe,v,rt()+Se,Wt,Qt,A,$t,Q,J,Ae,b,A._endClamp&&"_endClamp"))||-.001,Se=0,G=F;G--;)ut=te[G],Ct=ut.pin,Ct&&ut.start-ut._pinPush<=I&&!b&&ut.end>0&&(X=ut.end-(A._startClamp?Math.max(0,ut.start):ut.start),(Ct===d&&ut.start-ut._pinPush<I||Ct===T)&&isNaN(be)&&(Se+=X*(1-ut.progress)),Ct===f&&(xe+=X));if(I+=Se,ee+=Se,A._startClamp&&(A._startClamp+=Se),A._endClamp&&!Tn&&(A._endClamp=ee||-.001,ee=Math.min(ee,Ti(L,v))),M=ee-I||(I-=.01)&&.001,Fe&&(lt=Tt.utils.clamp(0,1,Tt.utils.normalize(I,ee,ht))),A._pinPush=xe,Dt&&Se&&(X={},X[v.a]="+="+Se,T&&(X[v.p]="-="+rt()),Tt.set([Dt,Wt],X)),f&&!(Xh&&A.end>=Ti(L,v)))X=ei(f),_t=v===ke,at=rt(),Yt=parseFloat(ot(v.a))+xe,!Ae&&ee>1&&(ie=(W?Le.scrollingElement||ui:L).style,ie={style:ie,value:ie["overflow"+v.a.toUpperCase()]},W&&ei(we)["overflow"+v.a.toUpperCase()]!=="scroll"&&(ie.style["overflow"+v.a.toUpperCase()]="scroll")),kh(f,$,X),it=al(f),O=Bi(f,!0),Bt=J&&Oi(L,_t?hn:ke)(),_?(bt=[_+v.os2,M+xe+Xe],bt.t=$,G=_===He?_l(f,v)+M+xe:0,G&&(bt.push(v.d,G+Xe),$.style.flexBasis!=="auto"&&($.style.flexBasis=G+Xe)),Bs(bt),T&&te.forEach(function(re){re.pin===T&&re.vars.pinSpacing!==!1&&(re._subPinOffset=!0)}),J&&rt(ht)):(G=_l(f,v),G&&$.style.flexBasis!=="auto"&&($.style.flexBasis=G+Xe)),J&&(ft={top:O.top+(_t?at-I:Bt)+Xe,left:O.left+(_t?Bt:at-I)+Xe,boxSizing:"border-box",position:"fixed"},ft[Jr]=ft["max"+zs]=Math.ceil(O.width)+Xe,ft[Kr]=ft["max"+jh]=Math.ceil(O.height)+Xe,ft[ti]=ft[ti+$o]=ft[ti+qo]=ft[ti+Jo]=ft[ti+Zo]="0",ft[He]=X[He],ft[He+$o]=X[He+$o],ft[He+qo]=X[He+qo],ft[He+Jo]=X[He+Jo],ft[He+Zo]=X[He+Zo],j=cv(Y,ft,R),Tn&&rt(0)),i?(At=i._initted,Nh(1),i.render(i.duration(),!0,!0),st=ot(v.a)-Yt+M+xe,xt=Math.abs(M-st)>1,J&&xt&&j.splice(j.length-2,2),i.render(0,!0,!0),At||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Nh(0)):st=M,ie&&(ie.value?ie.style["overflow"+v.a.toUpperCase()]=ie.value:ie.style.removeProperty("overflow-"+v.a));else if(d&&rt()&&!b)for(O=d.parentNode;O&&O!==we;)O._pinOffset&&(I-=O._pinOffset,ee-=O._pinOffset),O=O.parentNode;oe&&oe.forEach(function(re){return re.revert(!1,!0)}),A.start=I,A.end=ee,Ut=Nt=Tn?ht:rt(),!b&&!Tn&&(Ut<ht&&rt(ht),A.scroll.rec=0),A.revert(!1,!0),et=fn(),ct&&(q=-1,ct.restart(!0)),un=0,i&&w&&(i._initted||Zt)&&i.progress()!==Zt&&i.progress(Zt||0,!0).render(i.time(),!0,!0),(Fe||lt!==A.progress||b||g)&&(i&&!w&&i.totalProgress(b&&I<-.001&&!lt?Tt.utils.normalize(I,ee,0):lt,!0),A.progress=Fe||(Ut-I)/M===lt?0:lt),f&&_&&($._pinOffset=Math.round(A.progress*st)),nt&&nt.invalidate(),isNaN(ge)||(ge-=Tt.getProperty(z,v.p),$e-=Tt.getProperty(Qt,v.p),ll(z,v,ge),ll(Dt,v,ge-(Xt||0)),ll(Qt,v,$e),ll(Wt,v,$e-(Xt||0))),Fe&&!Tn&&A.update(),h&&!Tn&&!C&&(C=!0,h(A),C=!1)}},A.getVelocity=function(){return(rt()-Nt)/(fn()-Ho)*1e3||0},A.endAnimation=function(){ko(A.callbackAnimation),i&&(nt?nt.progress(1):i.paused()?w||ko(i,A.direction<0,1):ko(i,i.reversed()))},A.labelToScroll=function(pt){return i&&i.labels&&(I||A.refresh()||I)+i.labels[pt]/i.duration()*M||0},A.getTrailing=function(pt){var Ft=te.indexOf(A),Pt=A.direction>0?te.slice(0,Ft).reverse():te.slice(Ft+1);return(Gn(pt)?Pt.filter(function(Xt){return Xt.vars.preventOverlaps===pt}):Pt).filter(function(Xt){return A.direction>0?Xt.end<=I:Xt.start>=ee})},A.update=function(pt,Ft,Pt){if(!(b&&!Pt&&!pt)){var Xt=Tn===!0?ht:A.scroll(),Oe=pt?0:(Xt-I)/M,$t=Oe<0?0:Oe>1?1:Oe||0,Ae=A.progress,Fe,Se,xe,me,Fn,be,T,F;if(Ft&&(Nt=Ut,Ut=b?rt():Xt,y&&(U=se,se=i&&!w?i.totalProgress():$t)),p&&f&&!un&&!el&&ni&&(!$t&&I<Xt+(Xt-Nt)/(fn()-Ho)*p?$t=1e-4:$t===1&&ee>Xt+(Xt-Nt)/(fn()-Ho)*p&&($t=.9999)),$t!==Ae&&A.enabled){if(Fe=A.isActive=!!$t&&$t<1,Se=!!Ae&&Ae<1,be=Fe!==Se,Fn=be||!!$t!=!!Ae,A.direction=$t>Ae?1:-1,A.progress=$t,Fn&&!un&&(xe=$t&&!Ae?0:$t===1?1:Ae===1?2:3,w&&(me=!be&&B[xe+1]!=="none"&&B[xe+1]||B[xe],F=i&&(me==="complete"||me==="reset"||me in i))),N&&(be||F)&&(F||u||!i)&&(En(N)?N(A):A.getTrailing(N).forEach(function(at){return at.endAnimation()})),w||(nt&&!un&&!el?(nt._dp._time-nt._start!==nt._time&&nt.render(nt._dp._time-nt._start),nt.resetTo?nt.resetTo("totalProgress",$t,i._tTime/i._tDur):(nt.vars.totalProgress=$t,nt.invalidate().restart())):i&&i.totalProgress($t,!!(un&&(et||pt)))),f){if(pt&&_&&($.style[_+v.os2]=Mt),!J)dt(Go(Yt+st*$t));else if(Fn){if(T=!pt&&$t>Ae&&ee+1>Xt&&Xt+1>=Ti(L,v),R)if(!pt&&(Fe||T)){var G=Bi(f,!0),X=Xt-I;em(f,we,G.top+(v===ke?X:0)+Xe,G.left+(v===ke?0:X)+Xe)}else em(f,$);Bs(Fe||T?j:it),xt&&$t<1&&Fe||dt(Yt+($t===1&&!T?st:0))}}y&&!gt.tween&&!un&&!el&&ct.restart(!0),a&&(be||x&&$t&&($t<1||!Oh))&&Qo(a.targets).forEach(function(at){return at.classList[Fe||x?"add":"remove"](a.className)}),o&&!w&&!pt&&o(A),Fn&&!un?(w&&(F&&(me==="complete"?i.pause().totalProgress(1):me==="reset"?i.restart(!0).pause():me==="restart"?i.restart(!0):i[me]()),o&&o(A)),(be||!Oh)&&(c&&be&&Bh(A,c),V[xe]&&Bh(A,V[xe]),x&&($t===1?A.kill(!1,1):V[xe]=0),be||(xe=$t===1?1:3,V[xe]&&Bh(A,V[xe]))),P&&!Fe&&Math.abs(A.getVelocity())>(Wo(P)?P:2500)&&(ko(A.callbackAnimation),nt?nt.progress(1):ko(i,me==="reverse"?1:!$t,1))):w&&o&&!un&&o(A)}if(qt){var O=b?Xt/b.duration()*(b._caScrollDist||0):Xt;Ot(O+(z._isFlipped?1:0)),qt(O)}ve&&ve(-Xt/b.duration()*(b._caScrollDist||0))}},A.enable=function(pt,Ft){A.enabled||(A.enabled=!0,Qe(L,"resize",Xo),W||Qe(L,"scroll",Us),K&&Qe(r,"refreshInit",K),pt!==!1&&(A.progress=lt=0,Ut=Nt=q=rt()),Ft!==!1&&A.refresh())},A.getTween=function(pt){return pt&&gt?gt.tween:nt},A.setPositions=function(pt,Ft,Pt,Xt){if(b){var Oe=b.scrollTrigger,$t=b.duration(),Ae=Oe.end-Oe.start;pt=Oe.start+Ae*pt/$t,Ft=Oe.start+Ae*Ft/$t}A.refresh(!1,!1,{start:Yp(pt,Pt&&!!A._startClamp),end:Yp(Ft,Pt&&!!A._endClamp)},Xt),A.update()},A.adjustPinSpacing=function(pt){if(bt&&pt){var Ft=bt.indexOf(v.d)+1;bt[Ft]=parseFloat(bt[Ft])+pt+Xe,bt[1]=parseFloat(bt[1])+pt+Xe,Bs(bt)}},A.disable=function(pt,Ft){if(A.enabled&&(pt!==!1&&A.revert(!0,!0),A.enabled=A.isActive=!1,Ft||nt&&nt.pause(),ht=0,yt&&(yt.uncache=1),K&&Ke(r,"refreshInit",K),ct&&(ct.pause(),gt.tween&&gt.tween.kill()&&(gt.tween=0)),!W)){for(var Pt=te.length;Pt--;)if(te[Pt].scroller===L&&te[Pt]!==A)return;Ke(L,"resize",Xo),W||Ke(L,"scroll",Us)}},A.kill=function(pt,Ft){A.disable(pt,Ft),nt&&!Ft&&nt.kill(),l&&delete Yh[l];var Pt=te.indexOf(A);Pt>=0&&te.splice(Pt,1),Pt===wn&&fl>0&&wn--,Pt=0,te.forEach(function(Xt){return Xt.scroller===A.scroller&&(Pt=1)}),Pt||Tn||(A.scroll.rec=0),i&&(i.scrollTrigger=null,pt&&i.revert({kill:!1}),Ft||i.kill()),Dt&&[Dt,Wt,z,Qt].forEach(function(Xt){return Xt.parentNode&&Xt.parentNode.removeChild(Xt)}),Ko===A&&(Ko=0),f&&(yt&&(yt.uncache=1),Pt=0,te.forEach(function(Xt){return Xt.pin===f&&Pt++}),Pt||(yt.spacer=0)),n.onKill&&n.onKill(A)},te.push(A),A.enable(!1,!1),Ee&&Ee(A),i&&i.add&&!M){var ce=A.update;A.update=function(){A.update=ce,I||ee||A.refresh()},Tt.delayedCall(.01,A.update),M=.01,I=ee=0}else A.refresh();f&&ov()},r.register=function(n){return Ns||(Tt=n||fm(),um()&&window.document&&r.enable(),Ns=Vo),Ns},r.defaults=function(n){if(n)for(var i in n)sl[i]=n[i];return sl},r.disable=function(n,i){Vo=0,te.forEach(function(o){return o[i?"kill":"disable"](n)}),Ke(le,"wheel",Us),Ke(Le,"scroll",Us),clearInterval(tl),Ke(Le,"touchcancel",wi),Ke(we,"touchstart",wi),il(Ke,Le,"pointerdown,touchstart,mousedown",qp),il(Ke,Le,"pointerup,touchend,mouseup",Zp),ml.kill(),nl(Ke);for(var s=0;s<jt.length;s+=3)rl(Ke,jt[s],jt[s+1]),rl(Ke,jt[s],jt[s+2])},r.enable=function(){if(le=window,Le=document,ui=Le.documentElement,we=Le.body,Tt&&(Qo=Tt.utils.toArray,Yo=Tt.utils.clamp,Wh=Tt.core.context||wi,Nh=Tt.core.suppressOverwrites||wi,$h=le.history.scrollRestoration||"auto",qh=le.pageYOffset,Tt.core.globals("ScrollTrigger",r),we)){Vo=1,Fs=document.createElement("div"),Fs.style.height="100vh",Fs.style.position="absolute",Mm(),j_(),Ne.register(Tt),r.isTouch=Ne.isTouch,mr=Ne.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Gh=Ne.isTouch===1,Qe(le,"wheel",Us),om=[le,Le,ui,we],Tt.matchMedia?(r.matchMedia=function(l){var c=Tt.matchMedia(),h;for(h in l)c.add(h,l[h]);return c},Tt.addEventListener("matchMediaInit",function(){return eu()}),Tt.addEventListener("matchMediaRevert",function(){return xm()}),Tt.addEventListener("matchMedia",function(){$r(0,1),es("matchMedia")}),Tt.matchMedia("(orientation: portrait)",function(){return zh(),zh})):console.warn("Requires GSAP 3.11.0 or later"),zh(),Qe(Le,"scroll",Us);var n=we.style,i=n.borderTopStyle,s=Tt.core.Animation.prototype,o,a;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",o=Bi(we),ke.m=Math.round(o.top+ke.sc())||0,hn.m=Math.round(o.left+hn.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),tl=setInterval(Kp,250),Tt.delayedCall(.5,function(){return el=0}),Qe(Le,"touchcancel",wi),Qe(we,"touchstart",wi),il(Qe,Le,"pointerdown,touchstart,mousedown",qp),il(Qe,Le,"pointerup,touchend,mouseup",Zp),Vh=Tt.utils.checkPrefix("transform"),dl.push(Vh),Ns=fn(),ml=Tt.delayedCall(.2,$r).pause(),Os=[Le,"visibilitychange",function(){var l=le.innerWidth,c=le.innerHeight;Le.hidden?(Gp=l,Wp=c):(Gp!==l||Wp!==c)&&Xo()},Le,"DOMContentLoaded",$r,le,"load",$r,le,"resize",Xo],nl(Qe),te.forEach(function(l){return l.enable(0,1)}),a=0;a<jt.length;a+=3)rl(Ke,jt[a],jt[a+1]),rl(Ke,jt[a],jt[a+2])}},r.config=function(n){"limitCallbacks"in n&&(Oh=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(tl)||(tl=i)&&setInterval(Kp,i),"ignoreMobileResize"in n&&(Gh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(nl(Ke)||nl(Qe,n.autoRefreshEvents||"none"),lm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Sn(n),o=jt.indexOf(s),a=jr(s);~o&&jt.splice(o,a?6:2),i&&(a?hi.unshift(le,i,we,i,ui,i):hi.unshift(s,i))},r.clearMatchMedia=function(n){te.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Gn(n)?Sn(n):n).getBoundingClientRect(),a=o[s?Jr:Kr]*i||0;return s?o.right-a>0&&o.left+a<le.innerWidth:o.bottom-a>0&&o.top+a<le.innerHeight},r.positionInViewport=function(n,i,s){Gn(n)&&(n=Sn(n));var o=n.getBoundingClientRect(),a=o[s?Jr:Kr],l=i==null?a/2:i in vl?vl[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/le.innerWidth:(o.top+l)/le.innerHeight},r.killAll=function(n){if(te.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ts.killAll||[];ts={},i.forEach(function(s){return s()})}},r}();kt.version="3.12.5";kt.saveStyles=function(r){return r?Qo(r).forEach(function(t){if(t&&t.style){var e=Vn.indexOf(t);e>=0&&Vn.splice(e,5),Vn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Tt.core.getCache(t),Wh())}}):Vn};kt.revert=function(r,t){return eu(!r,t)};kt.create=function(r,t){return new kt(r,t)};kt.refresh=function(r){return r?Xo():(Ns||kt.register())&&$r(!0)};kt.update=function(r){return++jt.cache&&zi(r===!0?2:0)};kt.clearScrollMemory=ym;kt.maxScroll=function(r,t){return Ti(r,t?hn:ke)};kt.getScrollFunc=function(r,t){return Oi(Sn(r),t?hn:ke)};kt.getById=function(r){return Yh[r]};kt.getAll=function(){return te.filter(function(r){return r.vars.id!=="ScrollSmoother"})};kt.isScrolling=function(){return!!ni};kt.snapDirectional=tu;kt.addEventListener=function(r,t){var e=ts[r]||(ts[r]=[]);~e.indexOf(t)||e.push(t)};kt.removeEventListener=function(r,t){var e=ts[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};kt.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,h){var u=[],d=[],f=Tt.delayedCall(i,function(){h(u,d),u=[],d=[]}).pause();return function(_){u.length||f.restart(!0),u.push(_.trigger),d.push(_),s<=u.length&&f.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&En(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return En(s)&&(s=s(),Qe(kt,"refresh",function(){return s=t.batchMax()})),Qo(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(kt.create(c))}),e};var im=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Hh=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Ne.isTouch?" pinch-zoom":""):"none",t===ui&&r(we,e)},cl={auto:1,scroll:1},uv=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Tt.core.getCache(s),a=fn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==we&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(cl[(l=ei(s)).overflowY]||cl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!jr(s)&&(cl[(l=ei(s)).overflowY]||cl[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},bm=function(t,e,n,i){return Ne.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&uv,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Qe(Le,Ne.eventTypes[0],sm,!1,!0)},onDisable:function(){return Ke(Le,Ne.eventTypes[0],sm,!0)}})},fv=/(input|label|select|textarea)/i,rm,sm=function(t){var e=fv.test(t.target.tagName);(e||rm)&&(t._gsapAllow=!0,rm=e)},dv=function(t){Zr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=Sn(t.target)||ui,h=Tt.core.globals().ScrollSmoother,u=h&&h.get(),d=mr&&(t.content&&Sn(t.content)||u&&t.content!==!1&&!u.smooth()&&u.content()),f=Oi(c,ke),_=Oi(c,hn),g=1,p=(Ne.isTouch&&le.visualViewport?le.visualViewport.scale*le.visualViewport.width:le.outerWidth)/le.innerWidth,m=0,S=En(i)?function(){return i(a)}:function(){return i||2.8},x,y,R=bm(c,t.type,!0,s),E=function(){return y=!1},b=wi,P=wi,N=function(){l=Ti(c,ke),P=Yo(mr?1:0,l),n&&(b=Yo(0,Ti(c,hn))),x=Qr},v=function(){d._gsap.y=Go(parseFloat(d._gsap.y)+f.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},w=function(){if(y){requestAnimationFrame(E);var D=Go(a.deltaY/2),Q=P(f.v-D);if(d&&Q!==f.v+f.offset){f.offset=Q-f.v;var A=Go((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+A+", 0, 1)",d._gsap.y=A+"px",f.cacheID=jt.cache,zi()}return!0}f.offset&&v(),y=!0},L,k,W,J,V=function(){N(),L.isActive()&&L.vars.scrollY>l&&(f()>l?L.progress(1)&&f(l):L.resetTo("scrollY",l))};return d&&Tt.set(d,{y:"+=0"}),t.ignoreCheck=function(B){return mr&&B.type==="touchmove"&&w(B)||g>1.05&&B.type!=="touchstart"||a.isGesturing||B.touches&&B.touches.length>1},t.onPress=function(){y=!1;var B=g;g=Go((le.visualViewport&&le.visualViewport.scale||1)/p),L.pause(),B!==g&&Hh(c,g>1.01?!0:n?!1:"x"),k=_(),W=f(),N(),x=Qr},t.onRelease=t.onGestureStart=function(B,D){if(f.offset&&v(),!D)J.restart(!0);else{jt.cache++;var Q=S(),A,K;n&&(A=_(),K=A+Q*.05*-B.velocityX/.227,Q*=im(_,A,K,Ti(c,hn)),L.vars.scrollX=b(K)),A=f(),K=A+Q*.05*-B.velocityY/.227,Q*=im(f,A,K,Ti(c,ke)),L.vars.scrollY=P(K),L.invalidate().duration(Q).play(.01),(mr&&L.vars.scrollY>=l||A>=l-1)&&Tt.to({},{onUpdate:V,duration:Q})}o&&o(B)},t.onWheel=function(){L._ts&&L.pause(),fn()-m>1e3&&(x=0,m=fn())},t.onChange=function(B,D,Q,A,K){if(Qr!==x&&N(),D&&n&&_(b(A[2]===D?k+(B.startX-B.x):_()+D-A[1])),Q){f.offset&&v();var St=K[2]===Q,Gt=St?W+B.startY-B.y:f()+Q-K[1],q=P(Gt);St&&Gt!==q&&(W+=q-Gt),f(q)}(Q||D)&&zi()},t.onEnable=function(){Hh(c,n?!1:"x"),kt.addEventListener("refresh",V),Qe(le,"resize",V),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=_.smooth=!1),R.enable()},t.onDisable=function(){Hh(c,!0),Ke(le,"resize",V),kt.removeEventListener("refresh",V),R.kill()},t.lockAxis=t.lockAxis!==!1,a=new Ne(t),a.iOS=mr,mr&&!f()&&f(1),mr&&Tt.ticker.add(wi),J=a._dc,L=Tt.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Sm(f,f(),function(){return L.pause()})},onUpdate:zi,onComplete:J.vars.onComplete}),a};kt.sort=function(r){return te.sort(r||function(t,e){return(t.vars.refreshPriority||0)*-1e6+t.start-(e.start+(e.vars.refreshPriority||0)*-1e6)})};kt.observe=function(r){return new Ne(r)};kt.normalizeScroll=function(r){if(typeof r=="undefined")return bn;if(r===!0&&bn)return bn.enable();if(r===!1){bn&&bn.kill(),bn=r;return}var t=r instanceof Ne?r:dv(r);return bn&&bn.target===t.target&&bn.kill(),jr(t.target)&&(bn=t),t};kt.core={_getVelocityProp:ja,_inputObserver:bm,_scrollers:jt,_proxies:hi,bridge:{ss:function(){ni||es("scrollStart"),ni=fn()},ref:function(){return un}}};fm()&&Tt.registerPlugin(kt);function Tm(r,t,e){return Math.max(r,Math.min(t,e))}var nu=class{constructor(){this.isRunning=!1,this.value=0,this.from=0,this.to=0,this.currentTime=0}advance(t){var e;if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=t;let i=Tm(0,this.currentTime/this.duration,1);n=i>=1;let s=n?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=function(s,o,a,l){return function(h,u,d){return(1-d)*h+d*u}(s,o,1-Math.exp(-a*l))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),(e=this.onUpdate)===null||e===void 0||e.call(this,this.value,n)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:n,duration:i,easing:s,onStart:o,onUpdate:a}){this.from=this.value=t,this.to=e,this.lerp=n,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=a}},iu=class{constructor(t,e,{autoResize:n=!0,debounce:i=250}={}){this.wrapper=t,this.content=e,this.width=0,this.height=0,this.scrollHeight=0,this.scrollWidth=0,this.resize=()=>{this.onWrapperResize(),this.onContentResize()},this.onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)},this.onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)},n&&(this.debouncedResize=function(o,a){let l;return function(...c){let h=this;clearTimeout(l),l=setTimeout(()=>{l=void 0,o.apply(h,c)},a)}}(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var t,e;(t=this.wrapperResizeObserver)===null||t===void 0||t.disconnect(),(e=this.contentResizeObserver)===null||e===void 0||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},yl=class{constructor(){this.events={}}emit(t,...e){var n;let i=this.events[t]||[];for(let s=0,o=i.length;s<o;s++)(n=i[s])===null||n===void 0||n.call(i,...e)}on(t,e){var n;return!((n=this.events[t])===null||n===void 0)&&n.push(e)||(this.events[t]=[e]),()=>{var i;this.events[t]=(i=this.events[t])===null||i===void 0?void 0:i.filter(s=>e!==s)}}off(t,e){var n;this.events[t]=(n=this.events[t])===null||n===void 0?void 0:n.filter(i=>e!==i)}destroy(){this.events={}}},wm=100/6,gr={passive:!1},ru=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){this.element=t,this.options=e,this.touchStart={x:0,y:0},this.lastDelta={x:0,y:0},this.window={width:0,height:0},this.emitter=new yl,this.onTouchStart=n=>{let{clientX:i,clientY:s}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=i,this.touchStart.y=s,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})},this.onTouchMove=n=>{let{clientX:i,clientY:s}=n.targetTouches?n.targetTouches[0]:n,o=-(i-this.touchStart.x)*this.options.touchMultiplier,a=-(s-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=i,this.touchStart.y=s,this.lastDelta={x:o,y:a},this.emitter.emit("scroll",{deltaX:o,deltaY:a,event:n})},this.onTouchEnd=n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})},this.onWheel=n=>{let{deltaX:i,deltaY:s,deltaMode:o}=n;i*=o===1?wm:o===2?this.window.width:1,s*=o===1?wm:o===2?this.window.height:1,i*=this.options.wheelMultiplier,s*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})},this.onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}},window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,gr),this.element.addEventListener("touchstart",this.onTouchStart,gr),this.element.addEventListener("touchmove",this.onTouchMove,gr),this.element.addEventListener("touchend",this.onTouchEnd,gr)}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,gr),this.element.removeEventListener("touchstart",this.onTouchStart,gr),this.element.removeEventListener("touchmove",this.onTouchMove,gr),this.element.removeEventListener("touchend",this.onTouchEnd,gr)}},Ml=class{constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:n=t,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:a=35,duration:l,easing:c=y=>Math.min(1,1.001-Math.pow(2,-10*y)),lerp:h=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:_=1,wheelMultiplier:g=1,autoResize:p=!0,prevent:m,virtualScroll:S,__experimental__naiveDimensions:x=!1}={}){this._isScrolling=!1,this._isStopped=!1,this._isLocked=!1,this._preventNextNativeScrollEvent=!1,this._resetVelocityTimeout=null,this.time=0,this.userData={},this.lastVelocity=0,this.velocity=0,this.direction=0,this.animate=new nu,this.emitter=new yl,this.onPointerDown=y=>{y.button===1&&this.reset()},this.onVirtualScroll=y=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(y)===!1)return;let{deltaX:R,deltaY:E,event:b}=y;if(this.emitter.emit("virtual-scroll",{deltaX:R,deltaY:E,event:b}),b.ctrlKey)return;let P=b.type.includes("touch"),N=b.type.includes("wheel");if(this.isTouching=b.type==="touchstart"||b.type==="touchmove",this.options.syncTouch&&P&&b.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();let v=R===0&&E===0,w=this.options.gestureOrientation==="vertical"&&E===0||this.options.gestureOrientation==="horizontal"&&R===0;if(v||w)return;let L=b.composedPath();L=L.slice(0,L.indexOf(this.rootElement));let k=this.options.prevent;if(L.find(B=>{var D,Q,A,K,St;return B instanceof HTMLElement&&(typeof k=="function"&&(k==null?void 0:k(B))||((D=B.hasAttribute)===null||D===void 0?void 0:D.call(B,"data-lenis-prevent"))||P&&((Q=B.hasAttribute)===null||Q===void 0?void 0:Q.call(B,"data-lenis-prevent-touch"))||N&&((A=B.hasAttribute)===null||A===void 0?void 0:A.call(B,"data-lenis-prevent-wheel"))||((K=B.classList)===null||K===void 0?void 0:K.contains("lenis"))&&!(!((St=B.classList)===null||St===void 0)&&St.contains("lenis-stopped")))}))return;if(this.isStopped||this.isLocked)return void b.preventDefault();if(!(this.options.syncTouch&&P||this.options.smoothWheel&&N))return this.isScrolling="native",void this.animate.stop();b.preventDefault();let W=E;this.options.gestureOrientation==="both"?W=Math.abs(E)>Math.abs(R)?E:R:this.options.gestureOrientation==="horizontal"&&(W=R);let J=P&&this.options.syncTouch,V=P&&b.type==="touchend"&&Math.abs(W)>5;V&&(W=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+W,Object.assign({programmatic:!1},J?{lerp:V?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent)this._preventNextNativeScrollEvent=!1;else if(this.isScrolling===!1||this.isScrolling==="native"){let y=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-y,this.direction=Math.sign(this.animatedScroll-y),this.isScrolling="native",this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}},window.lenisVersion="1.1.13",t&&t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,eventsTarget:n,smoothWheel:i,syncTouch:s,syncTouchLerp:o,touchInertiaMultiplier:a,duration:l,easing:c,lerp:h,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:_,wheelMultiplier:g,autoResize:p,prevent:m,virtualScroll:S,__experimental__naiveDimensions:x},this.dimensions=new iu(t,e,{autoResize:p}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new ru(n,{touchMultiplier:_,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName()}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){let e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:n=!1,lock:i=!1,duration:s=this.options.duration,easing:o=this.options.easing,lerp:a=this.options.lerp,onStart:l,onComplete:c,force:h=!1,programmatic:u=!0,userData:d}={}){if(!this.isStopped&&!this.isLocked||h){if(typeof t=="string"&&["top","left","start"].includes(t))t=0;else if(typeof t=="string"&&["bottom","right","end"].includes(t))t=this.limit;else{let f;if(typeof t=="string"?f=document.querySelector(t):t instanceof HTMLElement&&(t!=null&&t.nodeType)&&(f=t),f){if(this.options.wrapper!==window){let g=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?g.left:g.top}let _=f.getBoundingClientRect();t=(this.isHorizontal?_.left:_.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=e,t=Math.round(t),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):t=Tm(0,t,this.limit),t===this.targetScroll)return l==null||l(this),void(c==null||c(this));if(this.userData=d!=null?d:{},n)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),void(this.userData={});u||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:s,easing:o,lerp:a,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(f,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(e,n){return(e%n+n)%n}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};var nd="169";var pv=0,Em=1,mv=2;var Ug=1,gv=2,Xi=3,Ar=0,gn=1,qi=2,Tr=0,io=1,Am=2,Cm=3,Rm=4,_v=5,cs=100,vv=101,xv=102,yv=103,Mv=104,Sv=200,bv=201,wv=202,Tv=203,Bu=204,zu=205,Ev=206,Av=207,Cv=208,Rv=209,Pv=210,Iv=211,Lv=212,Dv=213,Uv=214,ku=0,Hu=1,Vu=2,lo=3,Gu=4,Wu=5,Xu=6,Yu=7,Ng=0,Nv=1,Ov=2,Er=0,Fv=1,Bv=2,zv=3,id=4,kv=5,Hv=6,Vv=7;var Og=300,co=301,ho=302,qu=303,Zu=304,Rc=306,$u=1e3,us=1001,Ju=1002,On=1003,Gv=1004;var Sl=1005;var mi=1006,su=1007;var fs=1008;var Ji=1009,Fg=1010,Bg=1011,fa=1012,rd=1013,ds=1014,Ai=1015,Sa=1016,sd=1017,od=1018,uo=1020,zg=35902,kg=1021,Hg=1022,gi=1023,Vg=1024,Gg=1025,ro=1026,fo=1027,ad=1028,ld=1029,Wg=1030,cd=1031;var hd=1033,Ql=33776,jl=33777,tc=33778,ec=33779,Ku=35840,Qu=35841,ju=35842,tf=35843,ef=36196,nf=37492,rf=37496,sf=37808,of=37809,af=37810,lf=37811,cf=37812,hf=37813,uf=37814,ff=37815,df=37816,pf=37817,mf=37818,gf=37819,_f=37820,vf=37821,nc=36492,xf=36494,yf=36495,Xg=36283,Mf=36284,Sf=36285,bf=36286;var rc=2300,wf=2301,ou=2302,Pm=2400,Im=2401,Lm=2402;var Wv=3200,Xv=3201;var Yg=0,Yv=1,br="",ri="srgb",Lr="srgb-linear",ud="display-p3",Pc="display-p3-linear",sc="linear",Te="srgb",oc="rec709",ac="p3";var ks=7680;var Dm=519,qv=512,Zv=513,$v=514,qg=515,Jv=516,Kv=517,Qv=518,jv=519,Um=35044;var Nm="300 es",Zi=2e3,lc=2001,Cr=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Om=1234567,so=Math.PI/180,da=180/Math.PI;function vo(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dn[r&255]+dn[r>>8&255]+dn[r>>16&255]+dn[r>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[e&63|128]+dn[e>>8&255]+"-"+dn[e>>16&255]+dn[e>>24&255]+dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]).toLowerCase()}function Rn(r,t,e){return Math.max(t,Math.min(e,r))}function fd(r,t){return(r%t+t)%t}function tx(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function ex(r,t,e){return r!==t?(e-r)/(t-r):0}function ha(r,t,e){return(1-e)*r+e*t}function nx(r,t,e,n){return ha(r,t,1-Math.exp(-e*n))}function ix(r,t=1){return t-Math.abs(fd(r,t*2)-t)}function rx(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function sx(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function ox(r,t){return r+Math.floor(Math.random()*(t-r+1))}function ax(r,t){return r+Math.random()*(t-r)}function lx(r){return r*(.5-Math.random())}function cx(r){r!==void 0&&(Om=r);let t=Om+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hx(r){return r*so}function ux(r){return r*da}function fx(r){return(r&r-1)===0&&r!==0}function dx(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function px(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function mx(r,t,e,n,i){let s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),_=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*_,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*_,a*c);break;case"ZYZ":r.set(l*_,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function eo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function An(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Ic={DEG2RAD:so,RAD2DEG:da,generateUUID:vo,clamp:Rn,euclideanModulo:fd,mapLinear:tx,inverseLerp:ex,lerp:ha,damp:nx,pingpong:ix,smoothstep:rx,smootherstep:sx,randInt:ox,randFloat:ax,randFloatSpread:lx,seededRandom:cx,degToRad:hx,radToDeg:ux,isPowerOfTwo:fx,ceilPowerOfTwo:dx,floorPowerOfTwo:px,setQuaternionFromProperEuler:mx,normalize:An,denormalize:eo},ue=class r{constructor(t=0,e=0){r.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Rn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Kt=class r{constructor(t,e,n,i,s,o,a,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],_=n[8],g=i[0],p=i[3],m=i[6],S=i[1],x=i[4],y=i[7],R=i[2],E=i[5],b=i[8];return s[0]=o*g+a*S+l*R,s[3]=o*p+a*x+l*E,s[6]=o*m+a*y+l*b,s[1]=c*g+h*S+u*R,s[4]=c*p+h*x+u*E,s[7]=c*m+h*y+u*b,s[2]=d*g+f*S+_*R,s[5]=d*p+f*x+_*E,s[8]=d*m+f*y+_*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,_=e*u+n*d+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/_;return t[0]=u*g,t[1]=(i*c-h*n)*g,t[2]=(a*n-i*o)*g,t[3]=d*g,t[4]=(h*e-i*l)*g,t[5]=(i*s-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(au.makeScale(t,e)),this}rotate(t){return this.premultiply(au.makeRotation(-t)),this}translate(t,e){return this.premultiply(au.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},au=new Kt;function Zg(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function cc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gx(){let r=cc("canvas");return r.style.display="block",r}var Fm={};function ic(r){r in Fm||(Fm[r]=!0,console.warn(r))}function _x(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function vx(r){let t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xx(r){let t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Bm=new Kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),zm=new Kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ta={[Lr]:{transfer:sc,primaries:oc,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[ri]:{transfer:Te,primaries:oc,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Pc]:{transfer:sc,primaries:ac,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(zm),fromReference:r=>r.applyMatrix3(Bm)},[ud]:{transfer:Te,primaries:ac,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(zm),fromReference:r=>r.applyMatrix3(Bm).convertLinearToSRGB()}},yx=new Set([Lr,Pc]),de={enabled:!0,_workingColorSpace:Lr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!yx.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;let n=ta[t].toReference,i=ta[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return ta[r].primaries},getTransfer:function(r){return r===br?sc:ta[r].transfer},getLuminanceCoefficients:function(r,t=this._workingColorSpace){return r.fromArray(ta[t].luminanceCoefficients)}};function oo(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function lu(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Hs,Tf=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Hs===void 0&&(Hs=cc("canvas")),Hs.width=t.width,Hs.height=t.height;let n=Hs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=cc("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=oo(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(oo(e[n]/255)*255):e[n]=oo(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Mx=0,hc=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mx++}),this.uuid=vo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(cu(i[o].image)):s.push(cu(i[o]))}else s=cu(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function cu(r){return typeof HTMLImageElement!="undefined"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&r instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&r instanceof ImageBitmap?Tf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Sx=0,Yn=class r extends Cr{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=us,i=us,s=mi,o=fs,a=gi,l=Ji,c=r.DEFAULT_ANISOTROPY,h=br){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=vo(),this.name="",this.source=new hc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Og)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $u:t.x=t.x-Math.floor(t.x);break;case us:t.x=t.x<0?0:1;break;case Ju:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $u:t.y=t.y-Math.floor(t.y);break;case us:t.y=t.y<0?0:1;break;case Ju:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=Og;Yn.DEFAULT_ANISOTROPY=1;var _e=class r{constructor(t=0,e=0,n=0,i=1){r.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,y=(f+1)/2,R=(m+1)/2,E=(h+d)/4,b=(u+g)/4,P=(_+p)/4;return x>y&&x>R?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=E/n,s=b/n):y>R?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=E/i,s=P/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=b/s,i=P/s),this.set(n,i,s,e),this}let S=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(p-_)/S,this.y=(u-g)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ef=class extends Cr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Yn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new hc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ki=class extends Ef{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},uc=class extends Yn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=On,this.minFilter=On,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Af=class extends Yn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=On,this.minFilter=On,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ci=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[o+0],f=s[o+1],_=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=_,t[e+3]=g;return}if(u!==g||l!==d||c!==f||h!==_){let p=1-a,m=l*d+c*f+h*_+u*g,S=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){let R=Math.sqrt(x),E=Math.atan2(R,m*S);p=Math.sin(p*E)/R,a=Math.sin(a*E)/R}let y=a*S;if(l=l*p+d*y,c=c*p+f*y,h=h*p+_*y,u=u*p+g*y,p===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],_=s[o+3];return t[e]=a*_+h*u+l*f-c*d,t[e+1]=l*_+h*d+c*u-a*f,t[e+2]=c*_+h*f+a*d-l*u,t[e+3]=h*_-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"YXZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"ZXY":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"ZYX":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"YZX":this._x=d*h*u+c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u-d*f*_;break;case"XZY":this._x=d*h*u-c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Rn(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class r{constructor(t=0,e=0,n=0){r.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(km.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(km.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return hu.copy(this).projectOnVector(t),this.sub(hu)}reflect(t){return this.sub(hu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Rn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},hu=new H,km=new Ci,Qi=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=fi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,fi):fi.fromBufferAttribute(s,o),fi.applyMatrix4(t.matrixWorld),this.expandByPoint(fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bl.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bl.copy(n.boundingBox)),bl.applyMatrix4(t.matrixWorld),this.union(bl)}let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fi),fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ea),wl.subVectors(this.max,ea),Vs.subVectors(t.a,ea),Gs.subVectors(t.b,ea),Ws.subVectors(t.c,ea),_r.subVectors(Gs,Vs),vr.subVectors(Ws,Gs),ns.subVectors(Vs,Ws);let e=[0,-_r.z,_r.y,0,-vr.z,vr.y,0,-ns.z,ns.y,_r.z,0,-_r.x,vr.z,0,-vr.x,ns.z,0,-ns.x,-_r.y,_r.x,0,-vr.y,vr.x,0,-ns.y,ns.x,0];return!uu(e,Vs,Gs,Ws,wl)||(e=[1,0,0,0,1,0,0,0,1],!uu(e,Vs,Gs,Ws,wl))?!1:(Tl.crossVectors(_r,vr),e=[Tl.x,Tl.y,Tl.z],uu(e,Vs,Gs,Ws,wl))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ki=[new H,new H,new H,new H,new H,new H,new H,new H],fi=new H,bl=new Qi,Vs=new H,Gs=new H,Ws=new H,_r=new H,vr=new H,ns=new H,ea=new H,wl=new H,Tl=new H,is=new H;function uu(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){is.fromArray(r,s);let a=i.x*Math.abs(is.x)+i.y*Math.abs(is.y)+i.z*Math.abs(is.z),l=t.dot(is),c=e.dot(is),h=n.dot(is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var bx=new Qi,na=new H,fu=new H,ji=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bx.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;na.subVectors(t,this.center);let e=na.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(na,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(na.copy(t.center).add(fu)),this.expandByPoint(na.copy(t.center).sub(fu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Hi=new H,du=new H,El=new H,xr=new H,pu=new H,Al=new H,mu=new H,pa=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Hi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hi.copy(this.origin).addScaledVector(this.direction,e),Hi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){du.copy(t).add(e).multiplyScalar(.5),El.copy(e).sub(t).normalize(),xr.copy(this.origin).sub(du);let s=t.distanceTo(e)*.5,o=-this.direction.dot(El),a=xr.dot(this.direction),l=-xr.dot(El),c=xr.lengthSq(),h=Math.abs(1-o*o),u,d,f,_;if(h>0)if(u=o*l-a,d=o*a-l,_=s*h,u>=0)if(d>=-_)if(d<=_){let g=1/h;u*=g,d*=g,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(du).addScaledVector(El,d),f}intersectSphere(t,e){Hi.subVectors(t.center,this.origin);let n=Hi.dot(this.direction),i=Hi.dot(Hi)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Hi)!==null}intersectTriangle(t,e,n,i,s){pu.subVectors(e,t),Al.subVectors(n,t),mu.crossVectors(pu,Al);let o=this.direction.dot(mu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xr.subVectors(this.origin,t);let l=a*this.direction.dot(Al.crossVectors(xr,Al));if(l<0)return null;let c=a*this.direction.dot(pu.cross(xr));if(c<0||l+c>o)return null;let h=-a*xr.dot(mu);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pe=class r{constructor(t,e,n,i,s,o,a,l,c,h,u,d,f,_,g,p){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,f,_,g,p)}set(t,e,n,i,s,o,a,l,c,h,u,d,f,_,g,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Xs.setFromMatrixColumn(t,0).length(),s=1/Xs.setFromMatrixColumn(t,1).length(),o=1/Xs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let d=o*h,f=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+_*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=_+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,_=c*h,g=c*u;e[0]=d+g*a,e[4]=_*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-_,e[6]=g+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,_=c*h,g=c*u;e[0]=d-g*a,e[4]=-o*u,e[8]=_+f*a,e[1]=f+_*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=_*c-f,e[8]=d*c+g,e[1]=l*u,e[5]=g*c+d,e[9]=f*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=g-d*u,e[8]=_*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+_,e[10]=d-g*u}else if(t.order==="XZY"){let d=o*l,f=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+g,e[5]=o*h,e[9]=f*u-_,e[2]=_*u-f,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(wx,t,Tx)}lookAt(t,e,n){let i=this.elements;return Wn.subVectors(t,e),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),yr.crossVectors(n,Wn),yr.lengthSq()===0&&(Math.abs(n.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),yr.crossVectors(n,Wn)),yr.normalize(),Cl.crossVectors(Wn,yr),i[0]=yr.x,i[4]=Cl.x,i[8]=Wn.x,i[1]=yr.y,i[5]=Cl.y,i[9]=Wn.y,i[2]=yr.z,i[6]=Cl.z,i[10]=Wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],_=n[2],g=n[6],p=n[10],m=n[14],S=n[3],x=n[7],y=n[11],R=n[15],E=i[0],b=i[4],P=i[8],N=i[12],v=i[1],w=i[5],L=i[9],k=i[13],W=i[2],J=i[6],V=i[10],B=i[14],D=i[3],Q=i[7],A=i[11],K=i[15];return s[0]=o*E+a*v+l*W+c*D,s[4]=o*b+a*w+l*J+c*Q,s[8]=o*P+a*L+l*V+c*A,s[12]=o*N+a*k+l*B+c*K,s[1]=h*E+u*v+d*W+f*D,s[5]=h*b+u*w+d*J+f*Q,s[9]=h*P+u*L+d*V+f*A,s[13]=h*N+u*k+d*B+f*K,s[2]=_*E+g*v+p*W+m*D,s[6]=_*b+g*w+p*J+m*Q,s[10]=_*P+g*L+p*V+m*A,s[14]=_*N+g*k+p*B+m*K,s[3]=S*E+x*v+y*W+R*D,s[7]=S*b+x*w+y*J+R*Q,s[11]=S*P+x*L+y*V+R*A,s[15]=S*N+x*k+y*B+R*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],_=t[3],g=t[7],p=t[11],m=t[15];return _*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+g*(+e*l*f-e*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+p*(+e*c*u-e*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+m*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],_=t[12],g=t[13],p=t[14],m=t[15],S=u*p*c-g*d*c+g*l*f-a*p*f-u*l*m+a*d*m,x=_*d*c-h*p*c-_*l*f+o*p*f+h*l*m-o*d*m,y=h*g*c-_*u*c+_*a*f-o*g*f-h*a*m+o*u*m,R=_*u*l-h*g*l-_*a*d+o*g*d+h*a*p-o*u*p,E=e*S+n*x+i*y+s*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/E;return t[0]=S*b,t[1]=(g*d*s-u*p*s-g*i*f+n*p*f+u*i*m-n*d*m)*b,t[2]=(a*p*s-g*l*s+g*i*c-n*p*c-a*i*m+n*l*m)*b,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*b,t[4]=x*b,t[5]=(h*p*s-_*d*s+_*i*f-e*p*f-h*i*m+e*d*m)*b,t[6]=(_*l*s-o*p*s-_*i*c+e*p*c+o*i*m-e*l*m)*b,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*f+e*l*f)*b,t[8]=y*b,t[9]=(_*u*s-h*g*s-_*n*f+e*g*f+h*n*m-e*u*m)*b,t[10]=(o*g*s-_*a*s+_*n*c-e*g*c-o*n*m+e*a*m)*b,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*f-e*a*f)*b,t[12]=R*b,t[13]=(h*g*i-_*u*i+_*n*d-e*g*d-h*n*p+e*u*p)*b,t[14]=(_*a*i-o*g*i-_*n*l+e*g*l+o*n*p-e*a*p)*b,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*b,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,_=s*u,g=o*h,p=o*u,m=a*u,S=l*c,x=l*h,y=l*u,R=n.x,E=n.y,b=n.z;return i[0]=(1-(g+m))*R,i[1]=(f+y)*R,i[2]=(_-x)*R,i[3]=0,i[4]=(f-y)*E,i[5]=(1-(d+m))*E,i[6]=(p+S)*E,i[7]=0,i[8]=(_+x)*b,i[9]=(p-S)*b,i[10]=(1-(d+g))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Xs.set(i[0],i[1],i[2]).length(),o=Xs.set(i[4],i[5],i[6]).length(),a=Xs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],di.copy(this);let c=1/s,h=1/o,u=1/a;return di.elements[0]*=c,di.elements[1]*=c,di.elements[2]*=c,di.elements[4]*=h,di.elements[5]*=h,di.elements[6]*=h,di.elements[8]*=u,di.elements[9]*=u,di.elements[10]*=u,e.setFromRotationMatrix(di),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Zi){let l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),f,_;if(a===Zi)f=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===lc)f=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Zi){let l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,f=(n+i)*h,_,g;if(a===Zi)_=(o+s)*u,g=-2*u;else if(a===lc)_=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xs=new H,di=new pe,wx=new H(0,0,0),Tx=new H(1,1,1),yr=new H,Cl=new H,Wn=new H,Hm=new pe,Vm=new Ci,Ri=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Rn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Rn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Rn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Rn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Rn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Rn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Hm.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hm,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Vm.setFromEuler(this),this.setFromQuaternion(Vm,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ri.DEFAULT_ORDER="XYZ";var fc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ex=0,Gm=new H,Ys=new Ci,Vi=new pe,Rl=new H,ia=new H,Ax=new H,Cx=new Ci,Wm=new H(1,0,0),Xm=new H(0,1,0),Ym=new H(0,0,1),qm={type:"added"},Rx={type:"removed"},qs={type:"childadded",child:null},gu={type:"childremoved",child:null},Ye=class r extends Cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ex++}),this.uuid=vo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new H,e=new Ri,n=new Ci,i=new H(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new pe},normalMatrix:{value:new Kt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.premultiply(Ys),this}rotateX(t){return this.rotateOnAxis(Wm,t)}rotateY(t){return this.rotateOnAxis(Xm,t)}rotateZ(t){return this.rotateOnAxis(Ym,t)}translateOnAxis(t,e){return Gm.copy(t).applyQuaternion(this.quaternion),this.position.add(Gm.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Wm,t)}translateY(t){return this.translateOnAxis(Xm,t)}translateZ(t){return this.translateOnAxis(Ym,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Rl.copy(t):Rl.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(ia,Rl,this.up):Vi.lookAt(Rl,ia,this.up),this.quaternion.setFromRotationMatrix(Vi),i&&(Vi.extractRotation(i.matrixWorld),Ys.setFromRotationMatrix(Vi),this.quaternion.premultiply(Ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qm),qs.child=t,this.dispatchEvent(qs),qs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rx),gu.child=t,this.dispatchEvent(gu),gu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qm),qs.child=t,this.dispatchEvent(qs),qs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,t,Ax),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,Cx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Ye.DEFAULT_UP=new H(0,1,0);Ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pi=new H,Gi=new H,_u=new H,Wi=new H,Zs=new H,$s=new H,Zm=new H,vu=new H,xu=new H,yu=new H,Mu=new _e,Su=new _e,bu=new _e,wr=class r{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),pi.subVectors(t,e),i.cross(pi);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){pi.subVectors(i,e),Gi.subVectors(n,e),_u.subVectors(t,e);let o=pi.dot(pi),a=pi.dot(Gi),l=pi.dot(_u),c=Gi.dot(Gi),h=Gi.dot(_u),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,_=(o*h-a*l)*d;return s.set(1-f-_,_,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Wi)===null?!1:Wi.x>=0&&Wi.y>=0&&Wi.x+Wi.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Wi.x),l.addScaledVector(o,Wi.y),l.addScaledVector(a,Wi.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return Mu.setScalar(0),Su.setScalar(0),bu.setScalar(0),Mu.fromBufferAttribute(t,e),Su.fromBufferAttribute(t,n),bu.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Mu,s.x),o.addScaledVector(Su,s.y),o.addScaledVector(bu,s.z),o}static isFrontFacing(t,e,n,i){return pi.subVectors(n,e),Gi.subVectors(t,e),pi.cross(Gi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pi.subVectors(this.c,this.b),Gi.subVectors(this.a,this.b),pi.cross(Gi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;Zs.subVectors(i,n),$s.subVectors(s,n),vu.subVectors(t,n);let l=Zs.dot(vu),c=$s.dot(vu);if(l<=0&&c<=0)return e.copy(n);xu.subVectors(t,i);let h=Zs.dot(xu),u=$s.dot(xu);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Zs,o);yu.subVectors(t,s);let f=Zs.dot(yu),_=$s.dot(yu);if(_>=0&&f<=_)return e.copy(s);let g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(n).addScaledVector($s,a);let p=h*_-f*u;if(p<=0&&u-h>=0&&f-_>=0)return Zm.subVectors(s,i),a=(u-h)/(u-h+(f-_)),e.copy(i).addScaledVector(Zm,a);let m=1/(p+g+d);return o=g*m,a=d*m,e.copy(n).addScaledVector(Zs,o).addScaledVector($s,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},$g={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mr={h:0,s:0,l:0},Pl={h:0,s:0,l:0};function wu(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var Vt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=fd(t,1),e=Rn(e,0,1),n=Rn(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=wu(o,s,t+1/3),this.g=wu(o,s,t),this.b=wu(o,s,t-1/3)}return de.toWorkingColorSpace(this,i),this}setStyle(t,e=ri){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ri){let n=$g[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oo(t.r),this.g=oo(t.g),this.b=oo(t.b),this}copyLinearToSRGB(t){return this.r=lu(t.r),this.g=lu(t.g),this.b=lu(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return de.fromWorkingColorSpace(pn.copy(this),t),Math.round(Rn(pn.r*255,0,255))*65536+Math.round(Rn(pn.g*255,0,255))*256+Math.round(Rn(pn.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(pn.copy(this),e);let n=pn.r,i=pn.g,s=pn.b,o=Math.max(n,i,s),a=Math.min(n,i,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(pn.copy(this),e),t.r=pn.r,t.g=pn.g,t.b=pn.b,t}getStyle(t=ri){de.fromWorkingColorSpace(pn.copy(this),t);let e=pn.r,n=pn.g,i=pn.b;return t!==ri?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Mr),this.setHSL(Mr.h+t,Mr.s+e,Mr.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mr),t.getHSL(Pl);let n=ha(Mr.h,Pl.h,e),i=ha(Mr.s,Pl.s,e),s=ha(Mr.l,Pl.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pn=new Vt;Vt.NAMES=$g;var Px=0,tr=class extends Cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Px++}),this.uuid=vo(),this.name="",this.type="Material",this.blending=io,this.side=Ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bu,this.blendDst=zu,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==io&&(n.blending=this.blending),this.side!==Ar&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bu&&(n.blendSrc=this.blendSrc),this.blendDst!==zu&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==lo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Rr=class extends tr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.combine=Ng,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ve=new H,Il=new ue,tn=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Um,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Il.fromBufferAttribute(this,e),Il.applyMatrix3(t),this.setXY(e,Il.x,Il.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=eo(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=eo(e,this.array)),e}setX(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=eo(e,this.array)),e}setY(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=eo(e,this.array)),e}setZ(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=eo(e,this.array)),e}setW(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),i=An(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),i=An(i,this.array),s=An(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Um&&(t.usage=this.usage),t}};var dc=class extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var pc=class extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Pn=class extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ix=0,ii=new pe,Tu=new Ye,Js=new H,Xn=new Qi,ra=new Qi,je=new H,_n=class r extends Cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=vo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zg(t)?pc:dc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Kt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ii.makeRotationFromQuaternion(t),this.applyMatrix4(ii),this}rotateX(t){return ii.makeRotationX(t),this.applyMatrix4(ii),this}rotateY(t){return ii.makeRotationY(t),this.applyMatrix4(ii),this}rotateZ(t){return ii.makeRotationZ(t),this.applyMatrix4(ii),this}translate(t,e,n){return ii.makeTranslation(t,e,n),this.applyMatrix4(ii),this}scale(t,e,n){return ii.makeScale(t,e,n),this.applyMatrix4(ii),this}lookAt(t){return Tu.lookAt(t),Tu.updateMatrix(),this.applyMatrix4(Tu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Pn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];Xn.setFromBufferAttribute(s),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ji);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(Xn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];ra.setFromBufferAttribute(a),this.morphTargetsRelative?(je.addVectors(Xn.min,ra.min),Xn.expandByPoint(je),je.addVectors(Xn.max,ra.max),Xn.expandByPoint(je)):(Xn.expandByPoint(ra.min),Xn.expandByPoint(ra.max))}Xn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)je.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(je));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)je.fromBufferAttribute(a,c),l&&(Js.fromBufferAttribute(t,c),je.add(Js)),i=Math.max(i,n.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new H,l[P]=new H;let c=new H,h=new H,u=new H,d=new ue,f=new ue,_=new ue,g=new H,p=new H;function m(P,N,v){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,v),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,N),_.fromBufferAttribute(s,v),h.sub(c),u.sub(c),f.sub(d),_.sub(d);let w=1/(f.x*_.y-_.x*f.y);isFinite(w)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(w),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(w),a[P].add(g),a[N].add(g),a[v].add(g),l[P].add(p),l[N].add(p),l[v].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let P=0,N=S.length;P<N;++P){let v=S[P],w=v.start,L=v.count;for(let k=w,W=w+L;k<W;k+=3)m(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let x=new H,y=new H,R=new H,E=new H;function b(P){R.fromBufferAttribute(i,P),E.copy(R);let N=a[P];x.copy(N),x.sub(R.multiplyScalar(R.dot(N))).normalize(),y.crossVectors(E,N);let w=y.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,w)}for(let P=0,N=S.length;P<N;++P){let v=S[P],w=v.start,L=v.count;for(let k=w,W=w+L;k<W;k+=3)b(t.getX(k+0)),b(t.getX(k+1)),b(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new H,s=new H,o=new H,a=new H,l=new H,c=new H,h=new H,u=new H;if(t)for(let d=0,f=t.count;d<f;d+=3){let _=t.getX(d+0),g=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,_=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let m=0;m<h;m++)d[_++]=c[f++]}return new tn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$m=new pe,rs=new pa,Ll=new ji,Jm=new H,Dl=new H,Ul=new H,Nl=new H,Eu=new H,Ol=new H,Km=new H,Fl=new H,Ge=class extends Ye{constructor(t=new _n,e=new Rr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){Ol.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(Eu.fromBufferAttribute(u,t),o?Ol.addScaledVector(Eu,h):Ol.addScaledVector(Eu.sub(e),h))}e.add(Ol)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ll.copy(n.boundingSphere),Ll.applyMatrix4(s),rs.copy(t.ray).recast(t.near),!(Ll.containsPoint(rs.origin)===!1&&(rs.intersectSphere(Ll,Jm)===null||rs.origin.distanceToSquared(Jm)>(t.far-t.near)**2))&&($m.copy(s).invert(),rs.copy(t.ray).applyMatrix4($m),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,rs)))}_computeIntersections(t,e,n){let i,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){let p=d[_],m=o[p.materialIndex],S=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let y=S,R=x;y<R;y+=3){let E=a.getX(y),b=a.getX(y+1),P=a.getX(y+2);i=Bl(this,m,t,n,c,h,u,E,b,P),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let _=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){let S=a.getX(p),x=a.getX(p+1),y=a.getX(p+2);i=Bl(this,o,t,n,c,h,u,S,x,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){let p=d[_],m=o[p.materialIndex],S=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=S,R=x;y<R;y+=3){let E=y,b=y+1,P=y+2;i=Bl(this,m,t,n,c,h,u,E,b,P),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){let S=p,x=p+1,y=p+2;i=Bl(this,o,t,n,c,h,u,S,x,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function Lx(r,t,e,n,i,s,o,a){let l;if(t.side===gn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Ar,a),l===null)return null;Fl.copy(a),Fl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Fl);return c<e.near||c>e.far?null:{distance:c,point:Fl.clone(),object:r}}function Bl(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Dl),r.getVertexPosition(l,Ul),r.getVertexPosition(c,Nl);let h=Lx(r,t,e,n,Dl,Ul,Nl,Km);if(h){let u=new H;wr.getBarycoord(Km,Dl,Ul,Nl,u),i&&(h.uv=wr.getInterpolatedAttribute(i,a,l,c,u,new ue)),s&&(h.uv1=wr.getInterpolatedAttribute(s,a,l,c,u,new ue)),o&&(h.normal=wr.getInterpolatedAttribute(o,a,l,c,u,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new H,materialIndex:0};wr.getNormal(Dl,Ul,Nl,d.normal),h.face=d,h.barycoord=u}return h}var _i=class r extends _n{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;_("z","y","x",-1,-1,n,e,t,o,s,0),_("z","y","x",1,-1,n,e,-t,o,s,1),_("x","z","y",1,1,t,n,e,i,o,2),_("x","z","y",1,-1,t,n,-e,i,o,3),_("x","y","z",1,-1,t,e,n,i,s,4),_("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Pn(c,3)),this.setAttribute("normal",new Pn(h,3)),this.setAttribute("uv",new Pn(u,2));function _(g,p,m,S,x,y,R,E,b,P,N){let v=y/b,w=R/P,L=y/2,k=R/2,W=E/2,J=b+1,V=P+1,B=0,D=0,Q=new H;for(let A=0;A<V;A++){let K=A*w-k;for(let St=0;St<J;St++){let Gt=St*v-L;Q[g]=Gt*S,Q[p]=K*x,Q[m]=W,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[p]=0,Q[m]=E>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(St/b),u.push(1-A/P),B+=1}}for(let A=0;A<P;A++)for(let K=0;K<b;K++){let St=d+K+J*A,Gt=d+K+J*(A+1),q=d+(K+1)+J*(A+1),et=d+(K+1)+J*A;l.push(St,Gt,et),l.push(Gt,q,et),D+=6}a.addGroup(f,D,N),f+=D,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function po(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Cn(r){let t={};for(let e=0;e<r.length;e++){let n=po(r[e]);for(let i in n)t[i]=n[i]}return t}function Dx(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Jg(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}var Ux={clone:po,merge:Cn},Nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ox=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,si=class extends tr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nx,this.fragmentShader=Ox,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=po(t.uniforms),this.uniformsGroups=Dx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},mc=class extends Ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Zi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Sr=new H,Qm=new ue,jm=new ue,mn=class extends mc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=da*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return da*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Sr.x,Sr.y).multiplyScalar(-t/Sr.z),Sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Sr.x,Sr.y).multiplyScalar(-t/Sr.z)}getViewSize(t,e){return this.getViewBounds(t,Qm,jm),e.subVectors(jm,Qm)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(so*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ks=-90,Qs=1,Cf=class extends Ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new mn(Ks,Qs,t,e);i.layers=this.layers,this.add(i);let s=new mn(Ks,Qs,t,e);s.layers=this.layers,this.add(s);let o=new mn(Ks,Qs,t,e);o.layers=this.layers,this.add(o);let a=new mn(Ks,Qs,t,e);a.layers=this.layers,this.add(a);let l=new mn(Ks,Qs,t,e);l.layers=this.layers,this.add(l);let c=new mn(Ks,Qs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===Zi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===lc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},gc=class extends Yn{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:co,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Rf=class extends Ki{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new gc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:mi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new _i(5,5,5),s=new si({name:"CubemapFromEquirect",uniforms:po(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:Tr});s.uniforms.tEquirect.value=e;let o=new Ge(i,s),a=e.minFilter;return e.minFilter===fs&&(e.minFilter=mi),new Cf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},Au=new H,Fx=new H,Bx=new Kt,Yi=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Au.subVectors(n,e).cross(Fx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Au),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Bx.getNormalMatrix(t),i=this.coplanarPoint(Au).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ss=new ji,zl=new H,ma=class{constructor(t=new Yi,e=new Yi,n=new Yi,i=new Yi,s=new Yi,o=new Yi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Zi){let n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],_=i[9],g=i[10],p=i[11],m=i[12],S=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,p-f,y-m).normalize(),n[1].setComponents(l+s,d+c,p+f,y+m).normalize(),n[2].setComponents(l+o,d+h,p+_,y+S).normalize(),n[3].setComponents(l-o,d-h,p-_,y-S).normalize(),n[4].setComponents(l-a,d-u,p-g,y-x).normalize(),e===Zi)n[5].setComponents(l+a,d+u,p+g,y+x).normalize();else if(e===lc)n[5].setComponents(a,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(t){return ss.center.set(0,0,0),ss.radius=.7071067811865476,ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(zl.x=i.normal.x>0?t.max.x:t.min.x,zl.y=i.normal.y>0?t.max.y:t.min.y,zl.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(zl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Kg(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function zx(r){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,_)=>f.start-_.start);let d=0;for(let f=1;f<u.length;f++){let _=u[d],g=u[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++d,u[d]=g)}u.length=d+1;for(let f=0,_=u.length;f<_;f++){let g=u[f];r.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var er=class r extends _n{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],_=[],g=[],p=[];for(let m=0;m<h;m++){let S=m*d-o;for(let x=0;x<c;x++){let y=x*u-s;_.push(y,-S,0),g.push(0,0,1),p.push(x/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<a;S++){let x=S+c*m,y=S+c*(m+1),R=S+1+c*(m+1),E=S+1+c*m;f.push(x,y,E),f.push(y,R,E)}this.setIndex(f),this.setAttribute("position",new Pn(_,3)),this.setAttribute("normal",new Pn(g,3)),this.setAttribute("uv",new Pn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}},kx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$x=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ty=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ey=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ny=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ry=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ay=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ly=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,uy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,py=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,my=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gy="gl_FragColor = linearToOutputTexel( gl_FragColor );",_y=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,My=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,by=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ey=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ay=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ry=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Py=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Iy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ly=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Dy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ny=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Oy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,By=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ky=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$y=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ky=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_M=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,MM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,SM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,TM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,EM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,AM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,RM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,PM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,IM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,DM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,NM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,FM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,BM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,YM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ZM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$M=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,JM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,oS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,aS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_S=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:kx,alphahash_pars_fragment:Hx,alphamap_fragment:Vx,alphamap_pars_fragment:Gx,alphatest_fragment:Wx,alphatest_pars_fragment:Xx,aomap_fragment:Yx,aomap_pars_fragment:qx,batching_pars_vertex:Zx,batching_vertex:$x,begin_vertex:Jx,beginnormal_vertex:Kx,bsdfs:Qx,iridescence_fragment:jx,bumpmap_pars_fragment:ty,clipping_planes_fragment:ey,clipping_planes_pars_fragment:ny,clipping_planes_pars_vertex:iy,clipping_planes_vertex:ry,color_fragment:sy,color_pars_fragment:oy,color_pars_vertex:ay,color_vertex:ly,common:cy,cube_uv_reflection_fragment:hy,defaultnormal_vertex:uy,displacementmap_pars_vertex:fy,displacementmap_vertex:dy,emissivemap_fragment:py,emissivemap_pars_fragment:my,colorspace_fragment:gy,colorspace_pars_fragment:_y,envmap_fragment:vy,envmap_common_pars_fragment:xy,envmap_pars_fragment:yy,envmap_pars_vertex:My,envmap_physical_pars_fragment:Ly,envmap_vertex:Sy,fog_vertex:by,fog_pars_vertex:wy,fog_fragment:Ty,fog_pars_fragment:Ey,gradientmap_pars_fragment:Ay,lightmap_pars_fragment:Cy,lights_lambert_fragment:Ry,lights_lambert_pars_fragment:Py,lights_pars_begin:Iy,lights_toon_fragment:Dy,lights_toon_pars_fragment:Uy,lights_phong_fragment:Ny,lights_phong_pars_fragment:Oy,lights_physical_fragment:Fy,lights_physical_pars_fragment:By,lights_fragment_begin:zy,lights_fragment_maps:ky,lights_fragment_end:Hy,logdepthbuf_fragment:Vy,logdepthbuf_pars_fragment:Gy,logdepthbuf_pars_vertex:Wy,logdepthbuf_vertex:Xy,map_fragment:Yy,map_pars_fragment:qy,map_particle_fragment:Zy,map_particle_pars_fragment:$y,metalnessmap_fragment:Jy,metalnessmap_pars_fragment:Ky,morphinstance_vertex:Qy,morphcolor_vertex:jy,morphnormal_vertex:tM,morphtarget_pars_vertex:eM,morphtarget_vertex:nM,normal_fragment_begin:iM,normal_fragment_maps:rM,normal_pars_fragment:sM,normal_pars_vertex:oM,normal_vertex:aM,normalmap_pars_fragment:lM,clearcoat_normal_fragment_begin:cM,clearcoat_normal_fragment_maps:hM,clearcoat_pars_fragment:uM,iridescence_pars_fragment:fM,opaque_fragment:dM,packing:pM,premultiplied_alpha_fragment:mM,project_vertex:gM,dithering_fragment:_M,dithering_pars_fragment:vM,roughnessmap_fragment:xM,roughnessmap_pars_fragment:yM,shadowmap_pars_fragment:MM,shadowmap_pars_vertex:SM,shadowmap_vertex:bM,shadowmask_pars_fragment:wM,skinbase_vertex:TM,skinning_pars_vertex:EM,skinning_vertex:AM,skinnormal_vertex:CM,specularmap_fragment:RM,specularmap_pars_fragment:PM,tonemapping_fragment:IM,tonemapping_pars_fragment:LM,transmission_fragment:DM,transmission_pars_fragment:UM,uv_pars_fragment:NM,uv_pars_vertex:OM,uv_vertex:FM,worldpos_vertex:BM,background_vert:zM,background_frag:kM,backgroundCube_vert:HM,backgroundCube_frag:VM,cube_vert:GM,cube_frag:WM,depth_vert:XM,depth_frag:YM,distanceRGBA_vert:qM,distanceRGBA_frag:ZM,equirect_vert:$M,equirect_frag:JM,linedashed_vert:KM,linedashed_frag:QM,meshbasic_vert:jM,meshbasic_frag:tS,meshlambert_vert:eS,meshlambert_frag:nS,meshmatcap_vert:iS,meshmatcap_frag:rS,meshnormal_vert:sS,meshnormal_frag:oS,meshphong_vert:aS,meshphong_frag:lS,meshphysical_vert:cS,meshphysical_frag:hS,meshtoon_vert:uS,meshtoon_frag:fS,points_vert:dS,points_frag:pS,shadow_vert:mS,shadow_frag:gS,sprite_vert:_S,sprite_frag:vS},mt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Ei={basic:{uniforms:Cn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Cn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Cn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Cn([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Cn([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Cn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Cn([mt.points,mt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Cn([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Cn([mt.common,mt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Cn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Cn([mt.sprite,mt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Cn([mt.common,mt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Cn([mt.lights,mt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Ei.physical={uniforms:Cn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var kl={r:0,b:0,g:0},os=new Ri,xS=new pe;function yS(r,t,e,n,i,s,o){let a=new Vt(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function _(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function g(S){let x=!1,y=_(S);y===null?m(a,l):y&&y.isColor&&(m(y,1),x=!0);let R=r.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(S,x){let y=_(x);y&&(y.isCubeTexture||y.mapping===Rc)?(h===void 0&&(h=new Ge(new _i(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:po(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,E,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),os.copy(x.backgroundRotation),os.x*=-1,os.y*=-1,os.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xS.makeRotationFromEuler(os)),h.material.toneMapped=de.getTransfer(y.colorSpace)!==Te,(u!==y||d!==y.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ge(new er(2,2),new si({name:"BackgroundMaterial",uniforms:po(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:Ar,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=de.getTransfer(y.colorSpace)!==Te,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,x){S.getRGB(kl,Jg(r)),n.buffers.color.setClear(kl.r,kl.g,kl.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(a,l)},render:g,addToRenderList:p}}function MS(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,o=!1;function a(v,w,L,k,W){let J=!1,V=u(k,L,w);s!==V&&(s=V,c(s.object)),J=f(v,k,L,W),J&&_(v,k,L,W),W!==null&&t.update(W,r.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(v,w,L,k),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function h(v){return r.deleteVertexArray(v)}function u(v,w,L){let k=L.wireframe===!0,W=n[v.id];W===void 0&&(W={},n[v.id]=W);let J=W[w.id];J===void 0&&(J={},W[w.id]=J);let V=J[k];return V===void 0&&(V=d(l()),J[k]=V),V}function d(v){let w=[],L=[],k=[];for(let W=0;W<e;W++)w[W]=0,L[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:L,attributeDivisors:k,object:v,attributes:{},index:null}}function f(v,w,L,k){let W=s.attributes,J=w.attributes,V=0,B=L.getAttributes();for(let D in B)if(B[D].location>=0){let A=W[D],K=J[D];if(K===void 0&&(D==="instanceMatrix"&&v.instanceMatrix&&(K=v.instanceMatrix),D==="instanceColor"&&v.instanceColor&&(K=v.instanceColor)),A===void 0||A.attribute!==K||K&&A.data!==K.data)return!0;V++}return s.attributesNum!==V||s.index!==k}function _(v,w,L,k){let W={},J=w.attributes,V=0,B=L.getAttributes();for(let D in B)if(B[D].location>=0){let A=J[D];A===void 0&&(D==="instanceMatrix"&&v.instanceMatrix&&(A=v.instanceMatrix),D==="instanceColor"&&v.instanceColor&&(A=v.instanceColor));let K={};K.attribute=A,A&&A.data&&(K.data=A.data),W[D]=K,V++}s.attributes=W,s.attributesNum=V,s.index=k}function g(){let v=s.newAttributes;for(let w=0,L=v.length;w<L;w++)v[w]=0}function p(v){m(v,0)}function m(v,w){let L=s.newAttributes,k=s.enabledAttributes,W=s.attributeDivisors;L[v]=1,k[v]===0&&(r.enableVertexAttribArray(v),k[v]=1),W[v]!==w&&(r.vertexAttribDivisor(v,w),W[v]=w)}function S(){let v=s.newAttributes,w=s.enabledAttributes;for(let L=0,k=w.length;L<k;L++)w[L]!==v[L]&&(r.disableVertexAttribArray(L),w[L]=0)}function x(v,w,L,k,W,J,V){V===!0?r.vertexAttribIPointer(v,w,L,W,J):r.vertexAttribPointer(v,w,L,k,W,J)}function y(v,w,L,k){g();let W=k.attributes,J=L.getAttributes(),V=w.defaultAttributeValues;for(let B in J){let D=J[B];if(D.location>=0){let Q=W[B];if(Q===void 0&&(B==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),B==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor)),Q!==void 0){let A=Q.normalized,K=Q.itemSize,St=t.get(Q);if(St===void 0)continue;let Gt=St.buffer,q=St.type,et=St.bytesPerElement,lt=q===r.INT||q===r.UNSIGNED_INT||Q.gpuType===rd;if(Q.isInterleavedBufferAttribute){let rt=Q.data,gt=rt.stride,yt=Q.offset;if(rt.isInstancedInterleavedBuffer){for(let Ht=0;Ht<D.locationSize;Ht++)m(D.location+Ht,rt.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ht=0;Ht<D.locationSize;Ht++)p(D.location+Ht);r.bindBuffer(r.ARRAY_BUFFER,Gt);for(let Ht=0;Ht<D.locationSize;Ht++)x(D.location+Ht,K/D.locationSize,q,A,gt*et,(yt+K/D.locationSize*Ht)*et,lt)}else{if(Q.isInstancedBufferAttribute){for(let rt=0;rt<D.locationSize;rt++)m(D.location+rt,Q.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let rt=0;rt<D.locationSize;rt++)p(D.location+rt);r.bindBuffer(r.ARRAY_BUFFER,Gt);for(let rt=0;rt<D.locationSize;rt++)x(D.location+rt,K/D.locationSize,q,A,K*et,K/D.locationSize*rt*et,lt)}}else if(V!==void 0){let A=V[B];if(A!==void 0)switch(A.length){case 2:r.vertexAttrib2fv(D.location,A);break;case 3:r.vertexAttrib3fv(D.location,A);break;case 4:r.vertexAttrib4fv(D.location,A);break;default:r.vertexAttrib1fv(D.location,A)}}}}S()}function R(){P();for(let v in n){let w=n[v];for(let L in w){let k=w[L];for(let W in k)h(k[W].object),delete k[W];delete w[L]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;let w=n[v.id];for(let L in w){let k=w[L];for(let W in k)h(k[W].object),delete k[W];delete w[L]}delete n[v.id]}function b(v){for(let w in n){let L=n[w];if(L[v.id]===void 0)continue;let k=L[v.id];for(let W in k)h(k[W].object),delete k[W];delete L[v.id]}}function P(){N(),o=!0,s!==i&&(s=i,c(s.object))}function N(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:N,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:b,initAttributes:g,enableAttribute:p,disableUnusedAttributes:S}}function SS(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let _=0;_<u;_++)f+=h[_];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],h[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let _=0;for(let g=0;g<u;g++)_+=h[g];for(let g=0;g<d.length;g++)e.update(_,n,d[g])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function bS(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(b){return!(b!==gi&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){let P=b===Sa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Ji&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Ai&&!P)}function l(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){let b=t.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}let f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:R,maxSamples:E}}function wS(r){let t=this,e=null,n=0,i=!1,s=!1,o=new Yi,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,m=r.get(u);if(!i||_===null||_.length===0||s&&!p)s?h(null):c();else{let S=s?0:n,x=S*4,y=m.clippingState||null;l.value=y,y=h(_,d,x,f);for(let R=0;R!==x;++R)y[R]=e[R];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,_){let g=u!==null?u.length:0,p=null;if(g!==0){if(p=l.value,_!==!0||p===null){let m=f+g*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,y=f;x!==g;++x,y+=4)o.copy(u[x]).applyMatrix4(S,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function TS(r){let t=new WeakMap;function e(o,a){return a===qu?o.mapping=co:a===Zu&&(o.mapping=ho),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===qu||a===Zu)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Rf(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var _c=class extends mc{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},no=4,tg=[.125,.215,.35,.446,.526,.582],hs=20,Cu=new _c,eg=new Vt,Ru=null,Pu=0,Iu=0,Lu=!1,ls=(1+Math.sqrt(5))/2,js=1/ls,ng=[new H(-ls,js,0),new H(ls,js,0),new H(-js,0,ls),new H(js,0,ls),new H(0,ls,-js),new H(0,ls,js),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],vc=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ru=this._renderer.getRenderTarget(),Pu=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ru,Pu,Iu),this._renderer.xr.enabled=Lu,t.scissorTest=!1,Hl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===co||t.mapping===ho?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ru=this._renderer.getRenderTarget(),Pu=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:Sa,format:gi,colorSpace:Lr,depthBuffer:!1},i=ig(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ig(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ES(s)),this._blurMaterial=AS(s,t,e)}return i}_compileMaterial(t){let e=new Ge(this._lodPlanes[0],t);this._renderer.compile(e,Cu)}_sceneToCubeUV(t,e,n,i){let a=new mn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(eg),h.toneMapping=Er,h.autoClear=!1;let f=new Rr({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),_=new Ge(new _i,f),g=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,g=!0):(f.color.copy(eg),g=!0);for(let m=0;m<6;m++){let S=m%3;S===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):S===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));let x=this._cubeSize;Hl(i,S*x,m>2?x:0,x,x),h.setRenderTarget(i),g&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===co||t.mapping===ho;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=sg()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rg());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ge(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;Hl(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Cu)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ng[(i-s-1)%ng.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ge(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*hs-1),g=s/_,p=isFinite(s)?1+Math.floor(h*g):hs;p>hs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hs}`);let m=[],S=0;for(let b=0;b<hs;++b){let P=b/g,N=Math.exp(-P*P/2);m.push(N),b===0?S+=N:b<p&&(S+=2*N)}for(let b=0;b<m.length;b++)m[b]=m[b]/S;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;let y=this._sizeLods[i],R=3*y*(i>x-no?i-x+no:0),E=4*(this._cubeSize-y);Hl(e,R,E,3*y,2*y),l.setRenderTarget(e),l.render(u,Cu)}};function ES(r){let t=[],e=[],n=[],i=r,s=r-no+1+tg.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>r-no?l=tg[o-r+no-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,_=6,g=3,p=2,m=1,S=new Float32Array(g*_*f),x=new Float32Array(p*_*f),y=new Float32Array(m*_*f);for(let E=0;E<f;E++){let b=E%3*2/3-1,P=E>2?0:-1,N=[b,P,0,b+2/3,P,0,b+2/3,P+1,0,b,P,0,b+2/3,P+1,0,b,P+1,0];S.set(N,g*_*E),x.set(d,p*_*E);let v=[E,E,E,E,E,E];y.set(v,m*_*E)}let R=new _n;R.setAttribute("position",new tn(S,g)),R.setAttribute("uv",new tn(x,p)),R.setAttribute("faceIndex",new tn(y,m)),t.push(R),i>no&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ig(r,t,e){let n=new Ki(r,t,e);return n.texture.mapping=Rc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hl(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function AS(r,t,e){let n=new Float32Array(hs),i=new H(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:hs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:dd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function rg(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function sg(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function dd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function CS(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===qu||l===Zu,h=l===co||l===ho;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new vc(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new vc(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function RS(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&ic("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function PS(r,t,e,n){let i={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let _ in d.attributes)t.remove(d.attributes[_]);for(let _ in d.morphAttributes){let g=d.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)t.remove(g[p])}d.removeEventListener("dispose",o),delete i[d.id];let f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let _ in d)t.update(d[_],r.ARRAY_BUFFER);let f=u.morphAttributes;for(let _ in f){let g=f[_];for(let p=0,m=g.length;p<m;p++)t.update(g[p],r.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,_=u.attributes.position,g=0;if(f!==null){let S=f.array;g=f.version;for(let x=0,y=S.length;x<y;x+=3){let R=S[x+0],E=S[x+1],b=S[x+2];d.push(R,E,E,b,b,R)}}else if(_!==void 0){let S=_.array;g=_.version;for(let x=0,y=S.length/3-1;x<y;x+=3){let R=x+0,E=x+1,b=x+2;d.push(R,E,E,b,b,R)}}else return;let p=new(Zg(d)?pc:dc)(d,1);p.version=g;let m=s.get(u);m&&t.remove(m),s.set(u,p)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function IS(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function c(d,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,d*o,_),e.update(f,n,_))}function h(d,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];e.update(p,n,1)}function u(d,f,_,g){if(_===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,g,0,_);let m=0;for(let S=0;S<_;S++)m+=f[S];for(let S=0;S<g.length;S++)e.update(m,n,g[S])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function LS(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function DS(r,t,e){let n=new WeakMap,i=new _e;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let N=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",N)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],x=0;f===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let y=a.attributes.position.count*x,R=1;y>t.maxTextureSize&&(R=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let E=new Float32Array(y*R*4*u),b=new uc(E,y,R,u);b.type=Ai,b.needsUpdate=!0;let P=x*4;for(let v=0;v<u;v++){let w=p[v],L=m[v],k=S[v],W=y*R*4*v;for(let J=0;J<w.count;J++){let V=J*P;f===!0&&(i.fromBufferAttribute(w,J),E[W+V+0]=i.x,E[W+V+1]=i.y,E[W+V+2]=i.z,E[W+V+3]=0),_===!0&&(i.fromBufferAttribute(L,J),E[W+V+4]=i.x,E[W+V+5]=i.y,E[W+V+6]=i.z,E[W+V+7]=0),g===!0&&(i.fromBufferAttribute(k,J),E[W+V+8]=i.x,E[W+V+9]=i.y,E[W+V+10]=i.z,E[W+V+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:b,size:new ue(y,R)},n.set(a,d),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let g=0;g<c.length;g++)f+=c[g];let _=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function US(r,t,e,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}var xc=class extends Yn{constructor(t,e,n,i,s,o,a,l,c,h=ro){if(h!==ro&&h!==fo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ro&&(n=ds),n===void 0&&h===fo&&(n=uo),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:On,this.minFilter=l!==void 0?l:On,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Qg=new Yn,og=new xc(1,1),jg=new uc,t0=new Af,e0=new gc,ag=[],lg=[],cg=new Float32Array(16),hg=new Float32Array(9),ug=new Float32Array(4);function xo(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=ag[i];if(s===void 0&&(s=new Float32Array(i),ag[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function qe(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ze(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Lc(r,t){let e=lg[t];e===void 0&&(e=new Int32Array(t),lg[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function NS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function OS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;r.uniform2fv(this.addr,t),Ze(e,t)}}function FS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(qe(e,t))return;r.uniform3fv(this.addr,t),Ze(e,t)}}function BS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;r.uniform4fv(this.addr,t),Ze(e,t)}}function zS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ze(e,t)}else{if(qe(e,n))return;ug.set(n),r.uniformMatrix2fv(this.addr,!1,ug),Ze(e,n)}}function kS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ze(e,t)}else{if(qe(e,n))return;hg.set(n),r.uniformMatrix3fv(this.addr,!1,hg),Ze(e,n)}}function HS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ze(e,t)}else{if(qe(e,n))return;cg.set(n),r.uniformMatrix4fv(this.addr,!1,cg),Ze(e,n)}}function VS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function GS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;r.uniform2iv(this.addr,t),Ze(e,t)}}function WS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;r.uniform3iv(this.addr,t),Ze(e,t)}}function XS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;r.uniform4iv(this.addr,t),Ze(e,t)}}function YS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function qS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;r.uniform2uiv(this.addr,t),Ze(e,t)}}function ZS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;r.uniform3uiv(this.addr,t),Ze(e,t)}}function $S(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;r.uniform4uiv(this.addr,t),Ze(e,t)}}function JS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(og.compareFunction=qg,s=og):s=Qg,e.setTexture2D(t||s,i)}function KS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||t0,i)}function QS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||e0,i)}function jS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||jg,i)}function tb(r){switch(r){case 5126:return NS;case 35664:return OS;case 35665:return FS;case 35666:return BS;case 35674:return zS;case 35675:return kS;case 35676:return HS;case 5124:case 35670:return VS;case 35667:case 35671:return GS;case 35668:case 35672:return WS;case 35669:case 35673:return XS;case 5125:return YS;case 36294:return qS;case 36295:return ZS;case 36296:return $S;case 35678:case 36198:case 36298:case 36306:case 35682:return JS;case 35679:case 36299:case 36307:return KS;case 35680:case 36300:case 36308:case 36293:return QS;case 36289:case 36303:case 36311:case 36292:return jS}}function eb(r,t){r.uniform1fv(this.addr,t)}function nb(r,t){let e=xo(t,this.size,2);r.uniform2fv(this.addr,e)}function ib(r,t){let e=xo(t,this.size,3);r.uniform3fv(this.addr,e)}function rb(r,t){let e=xo(t,this.size,4);r.uniform4fv(this.addr,e)}function sb(r,t){let e=xo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function ob(r,t){let e=xo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function ab(r,t){let e=xo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function lb(r,t){r.uniform1iv(this.addr,t)}function cb(r,t){r.uniform2iv(this.addr,t)}function hb(r,t){r.uniform3iv(this.addr,t)}function ub(r,t){r.uniform4iv(this.addr,t)}function fb(r,t){r.uniform1uiv(this.addr,t)}function db(r,t){r.uniform2uiv(this.addr,t)}function pb(r,t){r.uniform3uiv(this.addr,t)}function mb(r,t){r.uniform4uiv(this.addr,t)}function gb(r,t,e){let n=this.cache,i=t.length,s=Lc(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),Ze(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Qg,s[o])}function _b(r,t,e){let n=this.cache,i=t.length,s=Lc(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),Ze(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||t0,s[o])}function vb(r,t,e){let n=this.cache,i=t.length,s=Lc(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),Ze(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||e0,s[o])}function xb(r,t,e){let n=this.cache,i=t.length,s=Lc(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),Ze(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||jg,s[o])}function yb(r){switch(r){case 5126:return eb;case 35664:return nb;case 35665:return ib;case 35666:return rb;case 35674:return sb;case 35675:return ob;case 35676:return ab;case 5124:case 35670:return lb;case 35667:case 35671:return cb;case 35668:case 35672:return hb;case 35669:case 35673:return ub;case 5125:return fb;case 36294:return db;case 36295:return pb;case 36296:return mb;case 35678:case 36198:case 36298:case 36306:case 35682:return gb;case 35679:case 36299:case 36307:return _b;case 35680:case 36300:case 36308:case 36293:return vb;case 36289:case 36303:case 36311:case 36292:return xb}}var Pf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=tb(e.type)}},If=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yb(e.type)}},Lf=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},Du=/(\w+)(\])?(\[|\.)?/g;function fg(r,t){r.seq.push(t),r.map[t.id]=t}function Mb(r,t,e){let n=r.name,i=n.length;for(Du.lastIndex=0;;){let s=Du.exec(n),o=Du.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){fg(e,c===void 0?new Pf(a,r,t):new If(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Lf(a),fg(e,u)),e=u}}}var ao=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Mb(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function dg(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var Sb=37297,bb=0;function wb(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Tb(r){let t=de.getPrimaries(de.workingColorSpace),e=de.getPrimaries(r),n;switch(t===e?n="":t===ac&&e===oc?n="LinearDisplayP3ToLinearSRGB":t===oc&&e===ac&&(n="LinearSRGBToLinearDisplayP3"),r){case Lr:case Pc:return[n,"LinearTransferOETF"];case ri:case ud:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function pg(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+wb(r.getShaderSource(t),o)}else return i}function Eb(r,t){let e=Tb(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ab(r,t){let e;switch(t){case Fv:e="Linear";break;case Bv:e="Reinhard";break;case zv:e="Cineon";break;case id:e="ACESFilmic";break;case Hv:e="AgX";break;case Vv:e="Neutral";break;case kv:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Vl=new H;function Cb(){de.getLuminanceCoefficients(Vl);let r=Vl.x.toFixed(4),t=Vl.y.toFixed(4),e=Vl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function Pb(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ib(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ca(r){return r!==""}function mg(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gg(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Lb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Df(r){return r.replace(Lb,Ub)}var Db=new Map;function Ub(r,t){let e=Jt[t];if(e===void 0){let n=Db.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Df(e)}var Nb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _g(r){return r.replace(Nb,Ob)}function Ob(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function vg(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Fb(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ug?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===gv?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Xi&&(t="SHADOWMAP_TYPE_VSM"),t}function Bb(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case co:case ho:t="ENVMAP_TYPE_CUBE";break;case Rc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function zb(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ho:t="ENVMAP_MODE_REFRACTION";break}return t}function kb(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ng:t="ENVMAP_BLENDING_MULTIPLY";break;case Nv:t="ENVMAP_BLENDING_MIX";break;case Ov:t="ENVMAP_BLENDING_ADD";break}return t}function Hb(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Vb(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Fb(e),c=Bb(e),h=zb(e),u=kb(e),d=Hb(e),f=Rb(e),_=Pb(s),g=i.createProgram(),p,m,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ca).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ca).join(`
`),m.length>0&&(m+=`
`)):(p=[vg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),m=[vg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Er?"#define TONE_MAPPING":"",e.toneMapping!==Er?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Er?Ab("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Eb("linearToOutputTexel",e.outputColorSpace),Cb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ca).join(`
`)),o=Df(o),o=mg(o,e),o=gg(o,e),a=Df(a),a=mg(a,e),a=gg(a,e),o=_g(o),a=_g(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Nm?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let x=S+p+o,y=S+m+a,R=dg(i,i.VERTEX_SHADER,x),E=dg(i,i.FRAGMENT_SHADER,y);i.attachShader(g,R),i.attachShader(g,E),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function b(w){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(g).trim(),k=i.getShaderInfoLog(R).trim(),W=i.getShaderInfoLog(E).trim(),J=!0,V=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(J=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,R,E);else{let B=pg(i,R,"vertex"),D=pg(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+L+`
`+B+`
`+D)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(k===""||W==="")&&(V=!1);V&&(w.diagnostics={runnable:J,programLog:L,vertexShader:{log:k,prefix:p},fragmentShader:{log:W,prefix:m}})}i.deleteShader(R),i.deleteShader(E),P=new ao(i,g),N=Ib(i,g)}let P;this.getUniforms=function(){return P===void 0&&b(this),P};let N;this.getAttributes=function(){return N===void 0&&b(this),N};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(g,Sb)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=bb++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=E,this}var Gb=0,Uf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Nf(t),e.set(t,n)),n}},Nf=class{constructor(t){this.id=Gb++,this.code=t,this.usedTimes=0}};function Wb(r,t,e,n,i,s,o){let a=new fc,l=new Uf,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.reverseDepthBuffer,f=i.vertexTextures,_=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,w,L,k,W){let J=k.fog,V=W.geometry,B=v.isMeshStandardMaterial?k.environment:null,D=(v.isMeshStandardMaterial?e:t).get(v.envMap||B),Q=D&&D.mapping===Rc?D.image.height:null,A=g[v.type];v.precision!==null&&(_=i.getMaxPrecision(v.precision),_!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",_,"instead."));let K=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,St=K!==void 0?K.length:0,Gt=0;V.morphAttributes.position!==void 0&&(Gt=1),V.morphAttributes.normal!==void 0&&(Gt=2),V.morphAttributes.color!==void 0&&(Gt=3);let q,et,lt,rt;if(A){let Rt=Ei[A];q=Rt.vertexShader,et=Rt.fragmentShader}else q=v.vertexShader,et=v.fragmentShader,l.update(v),lt=l.getVertexShaderID(v),rt=l.getFragmentShaderID(v);let gt=r.getRenderTarget(),yt=W.isInstancedMesh===!0,Ht=W.isBatchedMesh===!0,Ut=!!v.map,Nt=!!v.matcap,I=!!D,ee=!!v.aoMap,Dt=!!v.lightMap,Wt=!!v.bumpMap,z=!!v.normalMap,Qt=!!v.displacementMap,Lt=!!v.emissiveMap,C=!!v.metalnessMap,M=!!v.roughnessMap,Y=v.anisotropy>0,j=v.clearcoat>0,it=v.dispersion>0,$=v.iridescence>0,wt=v.sheen>0,ot=v.transmission>0,dt=Y&&!!v.anisotropyMap,Yt=j&&!!v.clearcoatMap,st=j&&!!v.clearcoatNormalMap,Mt=j&&!!v.clearcoatRoughnessMap,bt=$&&!!v.iridescenceMap,Ot=$&&!!v.iridescenceThicknessMap,xt=wt&&!!v.sheenColorMap,qt=wt&&!!v.sheenRoughnessMap,zt=!!v.specularMap,se=!!v.specularColorMap,U=!!v.specularIntensityMap,nt=ot&&!!v.transmissionMap,Z=ot&&!!v.thicknessMap,tt=!!v.gradientMap,ct=!!v.alphaMap,ht=v.alphaTest>0,Zt=!!v.alphaHash,ve=!!v.extensions,Ee=Er;v.toneMapped&&(gt===null||gt.isXRRenderTarget===!0)&&(Ee=r.toneMapping);let ne={shaderID:A,shaderType:v.type,shaderName:v.name,vertexShader:q,fragmentShader:et,defines:v.defines,customVertexShaderID:lt,customFragmentShaderID:rt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:_,batching:Ht,batchingColor:Ht&&W._colorsTexture!==null,instancing:yt,instancingColor:yt&&W.instanceColor!==null,instancingMorph:yt&&W.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:gt===null?r.outputColorSpace:gt.isXRRenderTarget===!0?gt.texture.colorSpace:Lr,alphaToCoverage:!!v.alphaToCoverage,map:Ut,matcap:Nt,envMap:I,envMapMode:I&&D.mapping,envMapCubeUVHeight:Q,aoMap:ee,lightMap:Dt,bumpMap:Wt,normalMap:z,displacementMap:f&&Qt,emissiveMap:Lt,normalMapObjectSpace:z&&v.normalMapType===Yv,normalMapTangentSpace:z&&v.normalMapType===Yg,metalnessMap:C,roughnessMap:M,anisotropy:Y,anisotropyMap:dt,clearcoat:j,clearcoatMap:Yt,clearcoatNormalMap:st,clearcoatRoughnessMap:Mt,dispersion:it,iridescence:$,iridescenceMap:bt,iridescenceThicknessMap:Ot,sheen:wt,sheenColorMap:xt,sheenRoughnessMap:qt,specularMap:zt,specularColorMap:se,specularIntensityMap:U,transmission:ot,transmissionMap:nt,thicknessMap:Z,gradientMap:tt,opaque:v.transparent===!1&&v.blending===io&&v.alphaToCoverage===!1,alphaMap:ct,alphaTest:ht,alphaHash:Zt,combine:v.combine,mapUv:Ut&&p(v.map.channel),aoMapUv:ee&&p(v.aoMap.channel),lightMapUv:Dt&&p(v.lightMap.channel),bumpMapUv:Wt&&p(v.bumpMap.channel),normalMapUv:z&&p(v.normalMap.channel),displacementMapUv:Qt&&p(v.displacementMap.channel),emissiveMapUv:Lt&&p(v.emissiveMap.channel),metalnessMapUv:C&&p(v.metalnessMap.channel),roughnessMapUv:M&&p(v.roughnessMap.channel),anisotropyMapUv:dt&&p(v.anisotropyMap.channel),clearcoatMapUv:Yt&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:st&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:qt&&p(v.sheenRoughnessMap.channel),specularMapUv:zt&&p(v.specularMap.channel),specularColorMapUv:se&&p(v.specularColorMap.channel),specularIntensityMapUv:U&&p(v.specularIntensityMap.channel),transmissionMapUv:nt&&p(v.transmissionMap.channel),thicknessMapUv:Z&&p(v.thicknessMap.channel),alphaMapUv:ct&&p(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(z||Y),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!V.attributes.uv&&(Ut||ct),fog:!!J,useFog:v.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:d,skinning:W.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Gt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ee,decodeVideoTexture:Ut&&v.map.isVideoTexture===!0&&de.getTransfer(v.map.colorSpace)===Te,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===qi,flipSided:v.side===gn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ve&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&v.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function S(v){let w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(let L in v.defines)w.push(L),w.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(x(w,v),y(w,v),w.push(r.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function x(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function y(v,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.alphaToCoverage&&a.enable(20),v.push(a.mask)}function R(v){let w=g[v.type],L;if(w){let k=Ei[w];L=Ux.clone(k.uniforms)}else L=v.uniforms;return L}function E(v,w){let L;for(let k=0,W=h.length;k<W;k++){let J=h[k];if(J.cacheKey===w){L=J,++L.usedTimes;break}}return L===void 0&&(L=new Vb(r,w,v,s),h.push(L)),L}function b(v){if(--v.usedTimes===0){let w=h.indexOf(v);h[w]=h[h.length-1],h.pop(),v.destroy()}}function P(v){l.remove(v)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:S,getUniforms:R,acquireProgram:E,releaseProgram:b,releaseShaderCache:P,programs:h,dispose:N}}function Xb(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Yb(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function xg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function yg(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,_,g,p){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},r[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=g,m.group=p),t++,m}function a(u,d,f,_,g,p){let m=o(u,d,f,_,g,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(u,d,f,_,g,p){let m=o(u,d,f,_,g,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||Yb),n.length>1&&n.sort(d||xg),i.length>1&&i.sort(d||xg)}function h(){for(let u=t,d=r.length;u<d;u++){let f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function qb(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new yg,r.set(n,[o])):i>=s.length?(o=new yg,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function Zb(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new Vt};break;case"SpotLight":e={position:new H,direction:new H,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new H,halfWidth:new H,halfHeight:new H};break}return r[t.id]=e,e}}}function $b(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var Jb=0;function Kb(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Qb(r){let t=new Zb,e=$b(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let i=new H,s=new pe,o=new pe;function a(c){let h=0,u=0,d=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,S=0,x=0,y=0,R=0,E=0,b=0;c.sort(Kb);for(let N=0,v=c.length;N<v;N++){let w=c[N],L=w.color,k=w.intensity,W=w.distance,J=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=L.r*k,u+=L.g*k,d+=L.b*k;else if(w.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(w.sh.coefficients[V],k);b++}else if(w.isDirectionalLight){let V=t.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let B=w.shadow,D=e.get(w);D.shadowIntensity=B.intensity,D.shadowBias=B.bias,D.shadowNormalBias=B.normalBias,D.shadowRadius=B.radius,D.shadowMapSize=B.mapSize,n.directionalShadow[f]=D,n.directionalShadowMap[f]=J,n.directionalShadowMatrix[f]=w.shadow.matrix,S++}n.directional[f]=V,f++}else if(w.isSpotLight){let V=t.get(w);V.position.setFromMatrixPosition(w.matrixWorld),V.color.copy(L).multiplyScalar(k),V.distance=W,V.coneCos=Math.cos(w.angle),V.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),V.decay=w.decay,n.spot[g]=V;let B=w.shadow;if(w.map&&(n.spotLightMap[R]=w.map,R++,B.updateMatrices(w),w.castShadow&&E++),n.spotLightMatrix[g]=B.matrix,w.castShadow){let D=e.get(w);D.shadowIntensity=B.intensity,D.shadowBias=B.bias,D.shadowNormalBias=B.normalBias,D.shadowRadius=B.radius,D.shadowMapSize=B.mapSize,n.spotShadow[g]=D,n.spotShadowMap[g]=J,y++}g++}else if(w.isRectAreaLight){let V=t.get(w);V.color.copy(L).multiplyScalar(k),V.halfWidth.set(w.width*.5,0,0),V.halfHeight.set(0,w.height*.5,0),n.rectArea[p]=V,p++}else if(w.isPointLight){let V=t.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),V.distance=w.distance,V.decay=w.decay,w.castShadow){let B=w.shadow,D=e.get(w);D.shadowIntensity=B.intensity,D.shadowBias=B.bias,D.shadowNormalBias=B.normalBias,D.shadowRadius=B.radius,D.shadowMapSize=B.mapSize,D.shadowCameraNear=B.camera.near,D.shadowCameraFar=B.camera.far,n.pointShadow[_]=D,n.pointShadowMap[_]=J,n.pointShadowMatrix[_]=w.shadow.matrix,x++}n.point[_]=V,_++}else if(w.isHemisphereLight){let V=t.get(w);V.skyColor.copy(w.color).multiplyScalar(k),V.groundColor.copy(w.groundColor).multiplyScalar(k),n.hemi[m]=V,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==p||P.hemiLength!==m||P.numDirectionalShadows!==S||P.numPointShadows!==x||P.numSpotShadows!==y||P.numSpotMaps!==R||P.numLightProbes!==b)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=p,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+R-E,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=b,P.directionalLength=f,P.pointLength=_,P.spotLength=g,P.rectAreaLength=p,P.hemiLength=m,P.numDirectionalShadows=S,P.numPointShadows=x,P.numSpotShadows=y,P.numSpotMaps=R,P.numLightProbes=b,n.version=Jb++)}function l(c,h){let u=0,d=0,f=0,_=0,g=0,p=h.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){let x=c[m];if(x.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(x.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(x.isRectAreaLight){let y=n.rectArea[_];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){let y=n.hemi[g];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function Mg(r){let t=new Qb(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function jb(r){let t=new WeakMap;function e(i,s=0){let o=t.get(i),a;return o===void 0?(a=new Mg(r),t.set(i,[a])):s>=o.length?(a=new Mg(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Of=class extends tr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ff=class extends tr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},t1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function n1(r,t,e){let n=new ma,i=new ue,s=new ue,o=new _e,a=new Of({depthPacking:Xv}),l=new Ff,c={},h=e.maxTextureSize,u={[Ar]:gn,[gn]:Ar,[qi]:qi},d=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:t1,fragmentShader:e1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let _=new _n;_.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Ge(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ug;let m=this.type;this.render=function(E,b,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let N=r.getRenderTarget(),v=r.getActiveCubeFace(),w=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Tr),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let k=m!==Xi&&this.type===Xi,W=m===Xi&&this.type!==Xi;for(let J=0,V=E.length;J<V;J++){let B=E[J],D=B.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);let Q=D.getFrameExtents();if(i.multiply(Q),s.copy(D.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Q.x),i.x=s.x*Q.x,D.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Q.y),i.y=s.y*Q.y,D.mapSize.y=s.y)),D.map===null||k===!0||W===!0){let K=this.type!==Xi?{minFilter:On,magFilter:On}:{};D.map!==null&&D.map.dispose(),D.map=new Ki(i.x,i.y,K),D.map.texture.name=B.name+".shadowMap",D.camera.updateProjectionMatrix()}r.setRenderTarget(D.map),r.clear();let A=D.getViewportCount();for(let K=0;K<A;K++){let St=D.getViewport(K);o.set(s.x*St.x,s.y*St.y,s.x*St.z,s.y*St.w),L.viewport(o),D.updateMatrices(B,K),n=D.getFrustum(),y(b,P,D.camera,B,this.type)}D.isPointLightShadow!==!0&&this.type===Xi&&S(D,P),D.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(N,v,w)};function S(E,b){let P=t.update(g);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ki(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(b,null,P,d,g,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(b,null,P,f,g,null)}function x(E,b,P,N){let v=null,w=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(w!==void 0)v=w;else if(v=P.isPointLight===!0?l:a,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){let L=v.uuid,k=b.uuid,W=c[L];W===void 0&&(W={},c[L]=W);let J=W[k];J===void 0&&(J=v.clone(),W[k]=J,b.addEventListener("dispose",R)),v=J}if(v.visible=b.visible,v.wireframe=b.wireframe,N===Xi?v.side=b.shadowSide!==null?b.shadowSide:b.side:v.side=b.shadowSide!==null?b.shadowSide:u[b.side],v.alphaMap=b.alphaMap,v.alphaTest=b.alphaTest,v.map=b.map,v.clipShadows=b.clipShadows,v.clippingPlanes=b.clippingPlanes,v.clipIntersection=b.clipIntersection,v.displacementMap=b.displacementMap,v.displacementScale=b.displacementScale,v.displacementBias=b.displacementBias,v.wireframeLinewidth=b.wireframeLinewidth,v.linewidth=b.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let L=r.properties.get(v);L.light=P}return v}function y(E,b,P,N,v){if(E.visible===!1)return;if(E.layers.test(b.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Xi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);let k=t.update(E),W=E.material;if(Array.isArray(W)){let J=k.groups;for(let V=0,B=J.length;V<B;V++){let D=J[V],Q=W[D.materialIndex];if(Q&&Q.visible){let A=x(E,Q,N,v);E.onBeforeShadow(r,E,b,P,k,A,D),r.renderBufferDirect(P,null,k,A,E,D),E.onAfterShadow(r,E,b,P,k,A,D)}}}else if(W.visible){let J=x(E,W,N,v);E.onBeforeShadow(r,E,b,P,k,J,null),r.renderBufferDirect(P,null,k,J,E,null),E.onAfterShadow(r,E,b,P,k,J,null)}}let L=E.children;for(let k=0,W=L.length;k<W;k++)y(L[k],b,P,N,v)}function R(E){E.target.removeEventListener("dispose",R);for(let P in c){let N=c[P],v=E.target.uuid;v in N&&(N[v].dispose(),delete N[v])}}}var i1={[ku]:Hu,[Vu]:Xu,[Gu]:Yu,[lo]:Wu,[Hu]:ku,[Xu]:Vu,[Yu]:Gu,[Wu]:lo};function r1(r){function t(){let U=!1,nt=new _e,Z=null,tt=new _e(0,0,0,0);return{setMask:function(ct){Z!==ct&&!U&&(r.colorMask(ct,ct,ct,ct),Z=ct)},setLocked:function(ct){U=ct},setClear:function(ct,ht,Zt,ve,Ee){Ee===!0&&(ct*=ve,ht*=ve,Zt*=ve),nt.set(ct,ht,Zt,ve),tt.equals(nt)===!1&&(r.clearColor(ct,ht,Zt,ve),tt.copy(nt))},reset:function(){U=!1,Z=null,tt.set(-1,0,0,0)}}}function e(){let U=!1,nt=!1,Z=null,tt=null,ct=null;return{setReversed:function(ht){nt=ht},setTest:function(ht){ht?lt(r.DEPTH_TEST):rt(r.DEPTH_TEST)},setMask:function(ht){Z!==ht&&!U&&(r.depthMask(ht),Z=ht)},setFunc:function(ht){if(nt&&(ht=i1[ht]),tt!==ht){switch(ht){case ku:r.depthFunc(r.NEVER);break;case Hu:r.depthFunc(r.ALWAYS);break;case Vu:r.depthFunc(r.LESS);break;case lo:r.depthFunc(r.LEQUAL);break;case Gu:r.depthFunc(r.EQUAL);break;case Wu:r.depthFunc(r.GEQUAL);break;case Xu:r.depthFunc(r.GREATER);break;case Yu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}tt=ht}},setLocked:function(ht){U=ht},setClear:function(ht){ct!==ht&&(r.clearDepth(ht),ct=ht)},reset:function(){U=!1,Z=null,tt=null,ct=null}}}function n(){let U=!1,nt=null,Z=null,tt=null,ct=null,ht=null,Zt=null,ve=null,Ee=null;return{setTest:function(ne){U||(ne?lt(r.STENCIL_TEST):rt(r.STENCIL_TEST))},setMask:function(ne){nt!==ne&&!U&&(r.stencilMask(ne),nt=ne)},setFunc:function(ne,Rt,Et){(Z!==ne||tt!==Rt||ct!==Et)&&(r.stencilFunc(ne,Rt,Et),Z=ne,tt=Rt,ct=Et)},setOp:function(ne,Rt,Et){(ht!==ne||Zt!==Rt||ve!==Et)&&(r.stencilOp(ne,Rt,Et),ht=ne,Zt=Rt,ve=Et)},setLocked:function(ne){U=ne},setClear:function(ne){Ee!==ne&&(r.clearStencil(ne),Ee=ne)},reset:function(){U=!1,nt=null,Z=null,tt=null,ct=null,ht=null,Zt=null,ve=null,Ee=null}}}let i=new t,s=new e,o=new n,a=new WeakMap,l=new WeakMap,c={},h={},u=new WeakMap,d=[],f=null,_=!1,g=null,p=null,m=null,S=null,x=null,y=null,R=null,E=new Vt(0,0,0),b=0,P=!1,N=null,v=null,w=null,L=null,k=null,W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,V=0,B=r.getParameter(r.VERSION);B.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(B)[1]),J=V>=1):B.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),J=V>=2);let D=null,Q={},A=r.getParameter(r.SCISSOR_BOX),K=r.getParameter(r.VIEWPORT),St=new _e().fromArray(A),Gt=new _e().fromArray(K);function q(U,nt,Z,tt){let ct=new Uint8Array(4),ht=r.createTexture();r.bindTexture(U,ht),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<Z;Zt++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(nt,0,r.RGBA,1,1,tt,0,r.RGBA,r.UNSIGNED_BYTE,ct):r.texImage2D(nt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ct);return ht}let et={};et[r.TEXTURE_2D]=q(r.TEXTURE_2D,r.TEXTURE_2D,1),et[r.TEXTURE_CUBE_MAP]=q(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[r.TEXTURE_2D_ARRAY]=q(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),et[r.TEXTURE_3D]=q(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),lt(r.DEPTH_TEST),s.setFunc(lo),Dt(!1),Wt(Em),lt(r.CULL_FACE),I(Tr);function lt(U){c[U]!==!0&&(r.enable(U),c[U]=!0)}function rt(U){c[U]!==!1&&(r.disable(U),c[U]=!1)}function gt(U,nt){return h[U]!==nt?(r.bindFramebuffer(U,nt),h[U]=nt,U===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=nt),U===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=nt),!0):!1}function yt(U,nt){let Z=d,tt=!1;if(U){Z=u.get(nt),Z===void 0&&(Z=[],u.set(nt,Z));let ct=U.textures;if(Z.length!==ct.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let ht=0,Zt=ct.length;ht<Zt;ht++)Z[ht]=r.COLOR_ATTACHMENT0+ht;Z.length=ct.length,tt=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,tt=!0);tt&&r.drawBuffers(Z)}function Ht(U){return f!==U?(r.useProgram(U),f=U,!0):!1}let Ut={[cs]:r.FUNC_ADD,[vv]:r.FUNC_SUBTRACT,[xv]:r.FUNC_REVERSE_SUBTRACT};Ut[yv]=r.MIN,Ut[Mv]=r.MAX;let Nt={[Sv]:r.ZERO,[bv]:r.ONE,[wv]:r.SRC_COLOR,[Bu]:r.SRC_ALPHA,[Pv]:r.SRC_ALPHA_SATURATE,[Cv]:r.DST_COLOR,[Ev]:r.DST_ALPHA,[Tv]:r.ONE_MINUS_SRC_COLOR,[zu]:r.ONE_MINUS_SRC_ALPHA,[Rv]:r.ONE_MINUS_DST_COLOR,[Av]:r.ONE_MINUS_DST_ALPHA,[Iv]:r.CONSTANT_COLOR,[Lv]:r.ONE_MINUS_CONSTANT_COLOR,[Dv]:r.CONSTANT_ALPHA,[Uv]:r.ONE_MINUS_CONSTANT_ALPHA};function I(U,nt,Z,tt,ct,ht,Zt,ve,Ee,ne){if(U===Tr){_===!0&&(rt(r.BLEND),_=!1);return}if(_===!1&&(lt(r.BLEND),_=!0),U!==_v){if(U!==g||ne!==P){if((p!==cs||x!==cs)&&(r.blendEquation(r.FUNC_ADD),p=cs,x=cs),ne)switch(U){case io:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Am:r.blendFunc(r.ONE,r.ONE);break;case Cm:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Rm:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case io:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Am:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Cm:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Rm:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}m=null,S=null,y=null,R=null,E.set(0,0,0),b=0,g=U,P=ne}return}ct=ct||nt,ht=ht||Z,Zt=Zt||tt,(nt!==p||ct!==x)&&(r.blendEquationSeparate(Ut[nt],Ut[ct]),p=nt,x=ct),(Z!==m||tt!==S||ht!==y||Zt!==R)&&(r.blendFuncSeparate(Nt[Z],Nt[tt],Nt[ht],Nt[Zt]),m=Z,S=tt,y=ht,R=Zt),(ve.equals(E)===!1||Ee!==b)&&(r.blendColor(ve.r,ve.g,ve.b,Ee),E.copy(ve),b=Ee),g=U,P=!1}function ee(U,nt){U.side===qi?rt(r.CULL_FACE):lt(r.CULL_FACE);let Z=U.side===gn;nt&&(Z=!Z),Dt(Z),U.blending===io&&U.transparent===!1?I(Tr):I(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),i.setMask(U.colorWrite);let tt=U.stencilWrite;o.setTest(tt),tt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Qt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(r.SAMPLE_ALPHA_TO_COVERAGE):rt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(U){N!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),N=U)}function Wt(U){U!==pv?(lt(r.CULL_FACE),U!==v&&(U===Em?r.cullFace(r.BACK):U===mv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):rt(r.CULL_FACE),v=U}function z(U){U!==w&&(J&&r.lineWidth(U),w=U)}function Qt(U,nt,Z){U?(lt(r.POLYGON_OFFSET_FILL),(L!==nt||k!==Z)&&(r.polygonOffset(nt,Z),L=nt,k=Z)):rt(r.POLYGON_OFFSET_FILL)}function Lt(U){U?lt(r.SCISSOR_TEST):rt(r.SCISSOR_TEST)}function C(U){U===void 0&&(U=r.TEXTURE0+W-1),D!==U&&(r.activeTexture(U),D=U)}function M(U,nt,Z){Z===void 0&&(D===null?Z=r.TEXTURE0+W-1:Z=D);let tt=Q[Z];tt===void 0&&(tt={type:void 0,texture:void 0},Q[Z]=tt),(tt.type!==U||tt.texture!==nt)&&(D!==Z&&(r.activeTexture(Z),D=Z),r.bindTexture(U,nt||et[U]),tt.type=U,tt.texture=nt)}function Y(){let U=Q[D];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function wt(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ot(U){St.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),St.copy(U))}function xt(U){Gt.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),Gt.copy(U))}function qt(U,nt){let Z=l.get(nt);Z===void 0&&(Z=new WeakMap,l.set(nt,Z));let tt=Z.get(U);tt===void 0&&(tt=r.getUniformBlockIndex(nt,U.name),Z.set(U,tt))}function zt(U,nt){let tt=l.get(nt).get(U);a.get(nt)!==tt&&(r.uniformBlockBinding(nt,tt,U.__bindingPointIndex),a.set(nt,tt))}function se(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},D=null,Q={},h={},u=new WeakMap,d=[],f=null,_=!1,g=null,p=null,m=null,S=null,x=null,y=null,R=null,E=new Vt(0,0,0),b=0,P=!1,N=null,v=null,w=null,L=null,k=null,St.set(0,0,r.canvas.width,r.canvas.height),Gt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:lt,disable:rt,bindFramebuffer:gt,drawBuffers:yt,useProgram:Ht,setBlending:I,setMaterial:ee,setFlipSided:Dt,setCullFace:Wt,setLineWidth:z,setPolygonOffset:Qt,setScissorTest:Lt,activeTexture:C,bindTexture:M,unbindTexture:Y,compressedTexImage2D:j,compressedTexImage3D:it,texImage2D:Mt,texImage3D:bt,updateUBOMapping:qt,uniformBlockBinding:zt,texStorage2D:Yt,texStorage3D:st,texSubImage2D:$,texSubImage3D:wt,compressedTexSubImage2D:ot,compressedTexSubImage3D:dt,scissor:Ot,viewport:xt,reset:se}}function Sg(r,t,e,n){let i=s1(n);switch(e){case kg:return r*t;case Vg:return r*t;case Gg:return r*t*2;case ad:return r*t/i.components*i.byteLength;case ld:return r*t/i.components*i.byteLength;case Wg:return r*t*2/i.components*i.byteLength;case cd:return r*t*2/i.components*i.byteLength;case Hg:return r*t*3/i.components*i.byteLength;case gi:return r*t*4/i.components*i.byteLength;case hd:return r*t*4/i.components*i.byteLength;case Ql:case jl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case tc:case ec:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Qu:case tf:return Math.max(r,16)*Math.max(t,8)/4;case Ku:case ju:return Math.max(r,8)*Math.max(t,8)/2;case ef:case nf:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case rf:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case sf:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case of:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case af:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case lf:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case cf:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case hf:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case uf:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ff:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case df:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case pf:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case mf:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case gf:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case _f:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case vf:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case nc:case xf:case yf:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Xg:case Mf:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Sf:case bf:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function s1(r){switch(r){case Ji:case Fg:return{byteLength:1,components:1};case fa:case Bg:case Sa:return{byteLength:2,components:1};case sd:case od:return{byteLength:2,components:4};case ds:case rd:case Ai:return{byteLength:4,components:1};case zg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function o1(r,t,e,n,i,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,M){return f?new OffscreenCanvas(C,M):cc("canvas")}function g(C,M,Y){let j=1,it=Lt(C);if((it.width>Y||it.height>Y)&&(j=Y/Math.max(it.width,it.height)),j<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let $=Math.floor(j*it.width),wt=Math.floor(j*it.height);u===void 0&&(u=_($,wt));let ot=M?_($,wt):u;return ot.width=$,ot.height=wt,ot.getContext("2d").drawImage(C,0,0,$,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+$+"x"+wt+")."),ot}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==On&&C.minFilter!==mi}function m(C){r.generateMipmap(C)}function S(C,M,Y,j,it=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let $=M;if(M===r.RED&&(Y===r.FLOAT&&($=r.R32F),Y===r.HALF_FLOAT&&($=r.R16F),Y===r.UNSIGNED_BYTE&&($=r.R8)),M===r.RED_INTEGER&&(Y===r.UNSIGNED_BYTE&&($=r.R8UI),Y===r.UNSIGNED_SHORT&&($=r.R16UI),Y===r.UNSIGNED_INT&&($=r.R32UI),Y===r.BYTE&&($=r.R8I),Y===r.SHORT&&($=r.R16I),Y===r.INT&&($=r.R32I)),M===r.RG&&(Y===r.FLOAT&&($=r.RG32F),Y===r.HALF_FLOAT&&($=r.RG16F),Y===r.UNSIGNED_BYTE&&($=r.RG8)),M===r.RG_INTEGER&&(Y===r.UNSIGNED_BYTE&&($=r.RG8UI),Y===r.UNSIGNED_SHORT&&($=r.RG16UI),Y===r.UNSIGNED_INT&&($=r.RG32UI),Y===r.BYTE&&($=r.RG8I),Y===r.SHORT&&($=r.RG16I),Y===r.INT&&($=r.RG32I)),M===r.RGB_INTEGER&&(Y===r.UNSIGNED_BYTE&&($=r.RGB8UI),Y===r.UNSIGNED_SHORT&&($=r.RGB16UI),Y===r.UNSIGNED_INT&&($=r.RGB32UI),Y===r.BYTE&&($=r.RGB8I),Y===r.SHORT&&($=r.RGB16I),Y===r.INT&&($=r.RGB32I)),M===r.RGBA_INTEGER&&(Y===r.UNSIGNED_BYTE&&($=r.RGBA8UI),Y===r.UNSIGNED_SHORT&&($=r.RGBA16UI),Y===r.UNSIGNED_INT&&($=r.RGBA32UI),Y===r.BYTE&&($=r.RGBA8I),Y===r.SHORT&&($=r.RGBA16I),Y===r.INT&&($=r.RGBA32I)),M===r.RGB&&Y===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),M===r.RGBA){let wt=it?sc:de.getTransfer(j);Y===r.FLOAT&&($=r.RGBA32F),Y===r.HALF_FLOAT&&($=r.RGBA16F),Y===r.UNSIGNED_BYTE&&($=wt===Te?r.SRGB8_ALPHA8:r.RGBA8),Y===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),Y===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(C,M){let Y;return C?M===null||M===ds||M===uo?Y=r.DEPTH24_STENCIL8:M===Ai?Y=r.DEPTH32F_STENCIL8:M===fa&&(Y=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ds||M===uo?Y=r.DEPTH_COMPONENT24:M===Ai?Y=r.DEPTH_COMPONENT32F:M===fa&&(Y=r.DEPTH_COMPONENT16),Y}function y(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==On&&C.minFilter!==mi?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function R(C){let M=C.target;M.removeEventListener("dispose",R),b(M),M.isVideoTexture&&h.delete(M)}function E(C){let M=C.target;M.removeEventListener("dispose",E),N(M)}function b(C){let M=n.get(C);if(M.__webglInit===void 0)return;let Y=C.source,j=d.get(Y);if(j){let it=j[M.__cacheKey];it.usedTimes--,it.usedTimes===0&&P(C),Object.keys(j).length===0&&d.delete(Y)}n.remove(C)}function P(C){let M=n.get(C);r.deleteTexture(M.__webglTexture);let Y=C.source,j=d.get(Y);delete j[M.__cacheKey],o.memory.textures--}function N(C){let M=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let it=0;it<M.__webglFramebuffer[j].length;it++)r.deleteFramebuffer(M.__webglFramebuffer[j][it]);else r.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)r.deleteFramebuffer(M.__webglFramebuffer[j]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let Y=C.textures;for(let j=0,it=Y.length;j<it;j++){let $=n.get(Y[j]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(Y[j])}n.remove(C)}let v=0;function w(){v=0}function L(){let C=v;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),v+=1,C}function k(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function W(C,M){let Y=n.get(C);if(C.isVideoTexture&&z(C),C.isRenderTargetTexture===!1&&C.version>0&&Y.__version!==C.version){let j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Gt(Y,C,M);return}}e.bindTexture(r.TEXTURE_2D,Y.__webglTexture,r.TEXTURE0+M)}function J(C,M){let Y=n.get(C);if(C.version>0&&Y.__version!==C.version){Gt(Y,C,M);return}e.bindTexture(r.TEXTURE_2D_ARRAY,Y.__webglTexture,r.TEXTURE0+M)}function V(C,M){let Y=n.get(C);if(C.version>0&&Y.__version!==C.version){Gt(Y,C,M);return}e.bindTexture(r.TEXTURE_3D,Y.__webglTexture,r.TEXTURE0+M)}function B(C,M){let Y=n.get(C);if(C.version>0&&Y.__version!==C.version){q(Y,C,M);return}e.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture,r.TEXTURE0+M)}let D={[$u]:r.REPEAT,[us]:r.CLAMP_TO_EDGE,[Ju]:r.MIRRORED_REPEAT},Q={[On]:r.NEAREST,[Gv]:r.NEAREST_MIPMAP_NEAREST,[Sl]:r.NEAREST_MIPMAP_LINEAR,[mi]:r.LINEAR,[su]:r.LINEAR_MIPMAP_NEAREST,[fs]:r.LINEAR_MIPMAP_LINEAR},A={[qv]:r.NEVER,[jv]:r.ALWAYS,[Zv]:r.LESS,[qg]:r.LEQUAL,[$v]:r.EQUAL,[Qv]:r.GEQUAL,[Jv]:r.GREATER,[Kv]:r.NOTEQUAL};function K(C,M){if(M.type===Ai&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===mi||M.magFilter===su||M.magFilter===Sl||M.magFilter===fs||M.minFilter===mi||M.minFilter===su||M.minFilter===Sl||M.minFilter===fs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,D[M.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,D[M.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,D[M.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,Q[M.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,Q[M.minFilter]),M.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,A[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===On||M.minFilter!==Sl&&M.minFilter!==fs||M.type===Ai&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let Y=t.get("EXT_texture_filter_anisotropic");r.texParameterf(C,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function St(C,M){let Y=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",R));let j=M.source,it=d.get(j);it===void 0&&(it={},d.set(j,it));let $=k(M);if($!==C.__cacheKey){it[$]===void 0&&(it[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),it[$].usedTimes++;let wt=it[C.__cacheKey];wt!==void 0&&(it[C.__cacheKey].usedTimes--,wt.usedTimes===0&&P(M)),C.__cacheKey=$,C.__webglTexture=it[$].texture}return Y}function Gt(C,M,Y){let j=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=r.TEXTURE_3D);let it=St(C,M),$=M.source;e.bindTexture(j,C.__webglTexture,r.TEXTURE0+Y);let wt=n.get($);if($.version!==wt.__version||it===!0){e.activeTexture(r.TEXTURE0+Y);let ot=de.getPrimaries(de.workingColorSpace),dt=M.colorSpace===br?null:de.getPrimaries(M.colorSpace),Yt=M.colorSpace===br||ot===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let st=g(M.image,!1,i.maxTextureSize);st=Qt(M,st);let Mt=s.convert(M.format,M.colorSpace),bt=s.convert(M.type),Ot=S(M.internalFormat,Mt,bt,M.colorSpace,M.isVideoTexture);K(j,M);let xt,qt=M.mipmaps,zt=M.isVideoTexture!==!0,se=wt.__version===void 0||it===!0,U=$.dataReady,nt=y(M,st);if(M.isDepthTexture)Ot=x(M.format===fo,M.type),se&&(zt?e.texStorage2D(r.TEXTURE_2D,1,Ot,st.width,st.height):e.texImage2D(r.TEXTURE_2D,0,Ot,st.width,st.height,0,Mt,bt,null));else if(M.isDataTexture)if(qt.length>0){zt&&se&&e.texStorage2D(r.TEXTURE_2D,nt,Ot,qt[0].width,qt[0].height);for(let Z=0,tt=qt.length;Z<tt;Z++)xt=qt[Z],zt?U&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,xt.width,xt.height,Mt,bt,xt.data):e.texImage2D(r.TEXTURE_2D,Z,Ot,xt.width,xt.height,0,Mt,bt,xt.data);M.generateMipmaps=!1}else zt?(se&&e.texStorage2D(r.TEXTURE_2D,nt,Ot,st.width,st.height),U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,st.width,st.height,Mt,bt,st.data)):e.texImage2D(r.TEXTURE_2D,0,Ot,st.width,st.height,0,Mt,bt,st.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){zt&&se&&e.texStorage3D(r.TEXTURE_2D_ARRAY,nt,Ot,qt[0].width,qt[0].height,st.depth);for(let Z=0,tt=qt.length;Z<tt;Z++)if(xt=qt[Z],M.format!==gi)if(Mt!==null)if(zt){if(U)if(M.layerUpdates.size>0){let ct=Sg(xt.width,xt.height,M.format,M.type);for(let ht of M.layerUpdates){let Zt=xt.data.subarray(ht*ct/xt.data.BYTES_PER_ELEMENT,(ht+1)*ct/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,ht,xt.width,xt.height,1,Mt,Zt,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,xt.width,xt.height,st.depth,Mt,xt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,Ot,xt.width,xt.height,st.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?U&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,xt.width,xt.height,st.depth,Mt,bt,xt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Z,Ot,xt.width,xt.height,st.depth,0,Mt,bt,xt.data)}else{zt&&se&&e.texStorage2D(r.TEXTURE_2D,nt,Ot,qt[0].width,qt[0].height);for(let Z=0,tt=qt.length;Z<tt;Z++)xt=qt[Z],M.format!==gi?Mt!==null?zt?U&&e.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,xt.width,xt.height,Mt,xt.data):e.compressedTexImage2D(r.TEXTURE_2D,Z,Ot,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?U&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,xt.width,xt.height,Mt,bt,xt.data):e.texImage2D(r.TEXTURE_2D,Z,Ot,xt.width,xt.height,0,Mt,bt,xt.data)}else if(M.isDataArrayTexture)if(zt){if(se&&e.texStorage3D(r.TEXTURE_2D_ARRAY,nt,Ot,st.width,st.height,st.depth),U)if(M.layerUpdates.size>0){let Z=Sg(st.width,st.height,M.format,M.type);for(let tt of M.layerUpdates){let ct=st.data.subarray(tt*Z/st.data.BYTES_PER_ELEMENT,(tt+1)*Z/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,tt,st.width,st.height,1,Mt,bt,ct)}M.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Mt,bt,st.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ot,st.width,st.height,st.depth,0,Mt,bt,st.data);else if(M.isData3DTexture)zt?(se&&e.texStorage3D(r.TEXTURE_3D,nt,Ot,st.width,st.height,st.depth),U&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Mt,bt,st.data)):e.texImage3D(r.TEXTURE_3D,0,Ot,st.width,st.height,st.depth,0,Mt,bt,st.data);else if(M.isFramebufferTexture){if(se)if(zt)e.texStorage2D(r.TEXTURE_2D,nt,Ot,st.width,st.height);else{let Z=st.width,tt=st.height;for(let ct=0;ct<nt;ct++)e.texImage2D(r.TEXTURE_2D,ct,Ot,Z,tt,0,Mt,bt,null),Z>>=1,tt>>=1}}else if(qt.length>0){if(zt&&se){let Z=Lt(qt[0]);e.texStorage2D(r.TEXTURE_2D,nt,Ot,Z.width,Z.height)}for(let Z=0,tt=qt.length;Z<tt;Z++)xt=qt[Z],zt?U&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,Mt,bt,xt):e.texImage2D(r.TEXTURE_2D,Z,Ot,Mt,bt,xt);M.generateMipmaps=!1}else if(zt){if(se){let Z=Lt(st);e.texStorage2D(r.TEXTURE_2D,nt,Ot,Z.width,Z.height)}U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Mt,bt,st)}else e.texImage2D(r.TEXTURE_2D,0,Ot,Mt,bt,st);p(M)&&m(j),wt.__version=$.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function q(C,M,Y){if(M.image.length!==6)return;let j=St(C,M),it=M.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+Y);let $=n.get(it);if(it.version!==$.__version||j===!0){e.activeTexture(r.TEXTURE0+Y);let wt=de.getPrimaries(de.workingColorSpace),ot=M.colorSpace===br?null:de.getPrimaries(M.colorSpace),dt=M.colorSpace===br||wt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let Yt=M.isCompressedTexture||M.image[0].isCompressedTexture,st=M.image[0]&&M.image[0].isDataTexture,Mt=[];for(let tt=0;tt<6;tt++)!Yt&&!st?Mt[tt]=g(M.image[tt],!0,i.maxCubemapSize):Mt[tt]=st?M.image[tt].image:M.image[tt],Mt[tt]=Qt(M,Mt[tt]);let bt=Mt[0],Ot=s.convert(M.format,M.colorSpace),xt=s.convert(M.type),qt=S(M.internalFormat,Ot,xt,M.colorSpace),zt=M.isVideoTexture!==!0,se=$.__version===void 0||j===!0,U=it.dataReady,nt=y(M,bt);K(r.TEXTURE_CUBE_MAP,M);let Z;if(Yt){zt&&se&&e.texStorage2D(r.TEXTURE_CUBE_MAP,nt,qt,bt.width,bt.height);for(let tt=0;tt<6;tt++){Z=Mt[tt].mipmaps;for(let ct=0;ct<Z.length;ct++){let ht=Z[ct];M.format!==gi?Ot!==null?zt?U&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,0,0,ht.width,ht.height,Ot,ht.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,qt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,0,0,ht.width,ht.height,Ot,xt,ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct,qt,ht.width,ht.height,0,Ot,xt,ht.data)}}}else{if(Z=M.mipmaps,zt&&se){Z.length>0&&nt++;let tt=Lt(Mt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,nt,qt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(st){zt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Mt[tt].width,Mt[tt].height,Ot,xt,Mt[tt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,Mt[tt].width,Mt[tt].height,0,Ot,xt,Mt[tt].data);for(let ct=0;ct<Z.length;ct++){let Zt=Z[ct].image[tt].image;zt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,0,0,Zt.width,Zt.height,Ot,xt,Zt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,qt,Zt.width,Zt.height,0,Ot,xt,Zt.data)}}else{zt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ot,xt,Mt[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,Ot,xt,Mt[tt]);for(let ct=0;ct<Z.length;ct++){let ht=Z[ct];zt?U&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,0,0,Ot,xt,ht.image[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,ct+1,qt,Ot,xt,ht.image[tt])}}}p(M)&&m(r.TEXTURE_CUBE_MAP),$.__version=it.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function et(C,M,Y,j,it,$){let wt=s.convert(Y.format,Y.colorSpace),ot=s.convert(Y.type),dt=S(Y.internalFormat,wt,ot,Y.colorSpace);if(!n.get(M).__hasExternalTextures){let st=Math.max(1,M.width>>$),Mt=Math.max(1,M.height>>$);it===r.TEXTURE_3D||it===r.TEXTURE_2D_ARRAY?e.texImage3D(it,$,dt,st,Mt,M.depth,0,wt,ot,null):e.texImage2D(it,$,dt,st,Mt,0,wt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),Wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,it,n.get(Y).__webglTexture,0,Dt(M)):(it===r.TEXTURE_2D||it>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,it,n.get(Y).__webglTexture,$),e.bindFramebuffer(r.FRAMEBUFFER,null)}function lt(C,M,Y){if(r.bindRenderbuffer(r.RENDERBUFFER,C),M.depthBuffer){let j=M.depthTexture,it=j&&j.isDepthTexture?j.type:null,$=x(M.stencilBuffer,it),wt=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=Dt(M);Wt(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,$,M.width,M.height):Y?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,$,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,$,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,wt,r.RENDERBUFFER,C)}else{let j=M.textures;for(let it=0;it<j.length;it++){let $=j[it],wt=s.convert($.format,$.colorSpace),ot=s.convert($.type),dt=S($.internalFormat,wt,ot,$.colorSpace),Yt=Dt(M);Y&&Wt(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt,dt,M.width,M.height):Wt(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Yt,dt,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,dt,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function rt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W(M.depthTexture,0);let j=n.get(M.depthTexture).__webglTexture,it=Dt(M);if(M.depthTexture.format===ro)Wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,it):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(M.depthTexture.format===fo)Wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,it):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function gt(C){let M=n.get(C),Y=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let j=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){let it=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",it)};j.addEventListener("dispose",it),M.__depthDisposeCallback=it}M.__boundDepthTexture=j}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");rt(M.__webglFramebuffer,C)}else if(Y){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=r.createRenderbuffer(),lt(M.__webglDepthbuffer[j],C,!1);else{let it=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,it,r.RENDERBUFFER,$)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),lt(M.__webglDepthbuffer,C,!1);else{let j=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,it=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,it),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,it)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function yt(C,M,Y){let j=n.get(C);M!==void 0&&et(j.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Y!==void 0&&gt(C)}function Ht(C){let M=C.texture,Y=n.get(C),j=n.get(M);C.addEventListener("dispose",E);let it=C.textures,$=C.isWebGLCubeRenderTarget===!0,wt=it.length>1;if(wt||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=M.version,o.memory.textures++),$){Y.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(M.mipmaps&&M.mipmaps.length>0){Y.__webglFramebuffer[ot]=[];for(let dt=0;dt<M.mipmaps.length;dt++)Y.__webglFramebuffer[ot][dt]=r.createFramebuffer()}else Y.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ot=0;ot<M.mipmaps.length;ot++)Y.__webglFramebuffer[ot]=r.createFramebuffer()}else Y.__webglFramebuffer=r.createFramebuffer();if(wt)for(let ot=0,dt=it.length;ot<dt;ot++){let Yt=n.get(it[ot]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=r.createTexture(),o.memory.textures++)}if(C.samples>0&&Wt(C)===!1){Y.__webglMultisampledFramebuffer=r.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ot=0;ot<it.length;ot++){let dt=it[ot];Y.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Y.__webglColorRenderbuffer[ot]);let Yt=s.convert(dt.format,dt.colorSpace),st=s.convert(dt.type),Mt=S(dt.internalFormat,Yt,st,dt.colorSpace,C.isXRRenderTarget===!0),bt=Dt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,bt,Mt,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,Y.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(Y.__webglDepthRenderbuffer=r.createRenderbuffer(),lt(Y.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){e.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),K(r.TEXTURE_CUBE_MAP,M);for(let ot=0;ot<6;ot++)if(M.mipmaps&&M.mipmaps.length>0)for(let dt=0;dt<M.mipmaps.length;dt++)et(Y.__webglFramebuffer[ot][dt],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,dt);else et(Y.__webglFramebuffer[ot],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(M)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let ot=0,dt=it.length;ot<dt;ot++){let Yt=it[ot],st=n.get(Yt);e.bindTexture(r.TEXTURE_2D,st.__webglTexture),K(r.TEXTURE_2D,Yt),et(Y.__webglFramebuffer,C,Yt,r.COLOR_ATTACHMENT0+ot,r.TEXTURE_2D,0),p(Yt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ot=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,j.__webglTexture),K(ot,M),M.mipmaps&&M.mipmaps.length>0)for(let dt=0;dt<M.mipmaps.length;dt++)et(Y.__webglFramebuffer[dt],C,M,r.COLOR_ATTACHMENT0,ot,dt);else et(Y.__webglFramebuffer,C,M,r.COLOR_ATTACHMENT0,ot,0);p(M)&&m(ot),e.unbindTexture()}C.depthBuffer&&gt(C)}function Ut(C){let M=C.textures;for(let Y=0,j=M.length;Y<j;Y++){let it=M[Y];if(p(it)){let $=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,wt=n.get(it).__webglTexture;e.bindTexture($,wt),m($),e.unbindTexture()}}}let Nt=[],I=[];function ee(C){if(C.samples>0){if(Wt(C)===!1){let M=C.textures,Y=C.width,j=C.height,it=r.COLOR_BUFFER_BIT,$=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,wt=n.get(C),ot=M.length>1;if(ot)for(let dt=0;dt<M.length;dt++)e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let dt=0;dt<M.length;dt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(it|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(it|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,wt.__webglColorRenderbuffer[dt]);let Yt=n.get(M[dt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Yt,0)}r.blitFramebuffer(0,0,Y,j,0,0,Y,j,it,r.NEAREST),l===!0&&(Nt.length=0,I.length=0,Nt.push(r.COLOR_ATTACHMENT0+dt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Nt.push($),I.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Nt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let dt=0;dt<M.length;dt++){e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,wt.__webglColorRenderbuffer[dt]);let Yt=n.get(M[dt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,Yt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let M=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function Dt(C){return Math.min(i.maxSamples,C.samples)}function Wt(C){let M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function z(C){let M=o.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Qt(C,M){let Y=C.colorSpace,j=C.format,it=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||Y!==Lr&&Y!==br&&(de.getTransfer(Y)===Te?(j!==gi||it!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),M}function Lt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=w,this.setTexture2D=W,this.setTexture2DArray=J,this.setTexture3D=V,this.setTextureCube=B,this.rebindTextures=yt,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=Wt}function a1(r,t){function e(n,i=br){let s,o=de.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===sd)return r.UNSIGNED_SHORT_4_4_4_4;if(n===od)return r.UNSIGNED_SHORT_5_5_5_1;if(n===zg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Fg)return r.BYTE;if(n===Bg)return r.SHORT;if(n===fa)return r.UNSIGNED_SHORT;if(n===rd)return r.INT;if(n===ds)return r.UNSIGNED_INT;if(n===Ai)return r.FLOAT;if(n===Sa)return r.HALF_FLOAT;if(n===kg)return r.ALPHA;if(n===Hg)return r.RGB;if(n===gi)return r.RGBA;if(n===Vg)return r.LUMINANCE;if(n===Gg)return r.LUMINANCE_ALPHA;if(n===ro)return r.DEPTH_COMPONENT;if(n===fo)return r.DEPTH_STENCIL;if(n===ad)return r.RED;if(n===ld)return r.RED_INTEGER;if(n===Wg)return r.RG;if(n===cd)return r.RG_INTEGER;if(n===hd)return r.RGBA_INTEGER;if(n===Ql||n===jl||n===tc||n===ec)if(o===Te)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ql)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===tc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ec)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ql)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===tc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ec)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ku||n===Qu||n===ju||n===tf)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ku)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ju)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ef||n===nf||n===rf)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ef||n===nf)return o===Te?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===rf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sf||n===of||n===af||n===lf||n===cf||n===hf||n===uf||n===ff||n===df||n===pf||n===mf||n===gf||n===_f||n===vf)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===sf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===of)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===af)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ff)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===df)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_f)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vf)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===nc||n===xf||n===yf)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===nc)return o===Te?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xg||n===Mf||n===Sf||n===bf)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===nc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Mf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===uo?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var Bf=class extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},$i=class extends Ye{constructor(){super(),this.isGroup=!0,this.type="Group"}},l1={type:"move"},ua=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let g of t.hand.values()){let p=e.getJointPose(g,n),m=this._getHandJoint(c,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(l1)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new $i;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},c1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,h1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,zf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Yn,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new si({vertexShader:c1,fragmentShader:h1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ge(new er(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kf=class extends Cr{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,_=null,g=new zf,p=e.getContextAttributes(),m=null,S=null,x=[],y=[],R=new ue,E=null,b=new mn;b.layers.enable(1),b.viewport=new _e;let P=new mn;P.layers.enable(2),P.viewport=new _e;let N=[b,P],v=new Bf;v.layers.enable(1),v.layers.enable(2);let w=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let et=x[q];return et===void 0&&(et=new ua,x[q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(q){let et=x[q];return et===void 0&&(et=new ua,x[q]=et),et.getGripSpace()},this.getHand=function(q){let et=x[q];return et===void 0&&(et=new ua,x[q]=et),et.getHandSpace()};function k(q){let et=y.indexOf(q.inputSource);if(et===-1)return;let lt=x[et];lt!==void 0&&(lt.update(q.inputSource,q.frame,c||o),lt.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",J);for(let q=0;q<x.length;q++){let et=y[q];et!==null&&(y[q]=null,x[q].disconnect(et))}w=null,L=null,g.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,S=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",W),i.addEventListener("inputsourceschange",J),p.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(R),i.renderState.layers===void 0){let et={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ki(f.framebufferWidth,f.framebufferHeight,{format:gi,type:Ji,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let et=null,lt=null,rt=null;p.depth&&(rt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=p.stencil?fo:ro,lt=p.stencil?uo:ds);let gt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(gt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new Ki(d.textureWidth,d.textureHeight,{format:gi,type:Ji,depthTexture:new xc(d.textureWidth,d.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Gt.setContext(i),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function J(q){for(let et=0;et<q.removed.length;et++){let lt=q.removed[et],rt=y.indexOf(lt);rt>=0&&(y[rt]=null,x[rt].disconnect(lt))}for(let et=0;et<q.added.length;et++){let lt=q.added[et],rt=y.indexOf(lt);if(rt===-1){for(let yt=0;yt<x.length;yt++)if(yt>=y.length){y.push(lt),rt=yt;break}else if(y[yt]===null){y[yt]=lt,rt=yt;break}if(rt===-1)break}let gt=x[rt];gt&&gt.connect(lt)}}let V=new H,B=new H;function D(q,et,lt){V.setFromMatrixPosition(et.matrixWorld),B.setFromMatrixPosition(lt.matrixWorld);let rt=V.distanceTo(B),gt=et.projectionMatrix.elements,yt=lt.projectionMatrix.elements,Ht=gt[14]/(gt[10]-1),Ut=gt[14]/(gt[10]+1),Nt=(gt[9]+1)/gt[5],I=(gt[9]-1)/gt[5],ee=(gt[8]-1)/gt[0],Dt=(yt[8]+1)/yt[0],Wt=Ht*ee,z=Ht*Dt,Qt=rt/(-ee+Dt),Lt=Qt*-ee;if(et.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Lt),q.translateZ(Qt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),gt[10]===-1)q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let C=Ht+Qt,M=Ut+Qt,Y=Wt-Lt,j=z+(rt-Lt),it=Nt*Ut/M*C,$=I*Ut/M*C;q.projectionMatrix.makePerspective(Y,j,it,$,C,M),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Q(q,et){et===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(et.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let et=q.near,lt=q.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(lt=g.depthFar)),v.near=P.near=b.near=et,v.far=P.far=b.far=lt,(w!==v.near||L!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),w=v.near,L=v.far);let rt=q.parent,gt=v.cameras;Q(v,rt);for(let yt=0;yt<gt.length;yt++)Q(gt[yt],rt);gt.length===2?D(v,b,P):v.projectionMatrix.copy(b.projectionMatrix),A(q,v,rt)};function A(q,et,lt){lt===null?q.matrix.copy(et.matrixWorld):(q.matrix.copy(lt.matrixWorld),q.matrix.invert(),q.matrix.multiply(et.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=da*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(v)};let K=null;function St(q,et){if(h=et.getViewerPose(c||o),_=et,h!==null){let lt=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let rt=!1;lt.length!==v.cameras.length&&(v.cameras.length=0,rt=!0);for(let yt=0;yt<lt.length;yt++){let Ht=lt[yt],Ut=null;if(f!==null)Ut=f.getViewport(Ht);else{let I=u.getViewSubImage(d,Ht);Ut=I.viewport,yt===0&&(t.setRenderTargetTextures(S,I.colorTexture,d.ignoreDepthValues?void 0:I.depthStencilTexture),t.setRenderTarget(S))}let Nt=N[yt];Nt===void 0&&(Nt=new mn,Nt.layers.enable(yt),Nt.viewport=new _e,N[yt]=Nt),Nt.matrix.fromArray(Ht.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(Ht.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),yt===0&&(v.matrix.copy(Nt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),rt===!0&&v.cameras.push(Nt)}let gt=i.enabledFeatures;if(gt&&gt.includes("depth-sensing")){let yt=u.getDepthInformation(lt[0]);yt&&yt.isValid&&yt.texture&&g.init(t,yt,i.renderState)}}for(let lt=0;lt<x.length;lt++){let rt=y[lt],gt=x[lt];rt!==null&&gt!==void 0&&gt.update(rt,et,c||o)}K&&K(q,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),_=null}let Gt=new Kg;Gt.setAnimationLoop(St),this.setAnimationLoop=function(q){K=q},this.dispose=function(){}}},as=new Ri,u1=new pe;function f1(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Jg(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,S,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,S,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===gn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===gn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let S=t.get(m),x=S.envMap,y=S.envMapRotation;x&&(p.envMap.value=x,as.copy(y),as.x*=-1,as.y*=-1,as.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),p.envMapRotation.value.setFromMatrix4(u1.makeRotationFromEuler(as)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===gn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){let S=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function d1(r,t,e,n){let i={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){let y=x.program;n.uniformBlockBinding(S,y)}function c(S,x){let y=i[S.id];y===void 0&&(_(S),y=h(S),i[S.id]=y,S.addEventListener("dispose",p));let R=x.program;n.updateUBOMapping(S,R);let E=t.render.frame;s[S.id]!==E&&(d(S),s[S.id]=E)}function h(S){let x=u();S.__bindingPointIndex=x;let y=r.createBuffer(),R=S.__size,E=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,R,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let x=i[S.id],y=S.uniforms,R=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let E=0,b=y.length;E<b;E++){let P=Array.isArray(y[E])?y[E]:[y[E]];for(let N=0,v=P.length;N<v;N++){let w=P[N];if(f(w,E,N,R)===!0){let L=w.__offset,k=Array.isArray(w.value)?w.value:[w.value],W=0;for(let J=0;J<k.length;J++){let V=k[J],B=g(V);typeof V=="number"||typeof V=="boolean"?(w.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,L+W,w.__data)):V.isMatrix3?(w.__data[0]=V.elements[0],w.__data[1]=V.elements[1],w.__data[2]=V.elements[2],w.__data[3]=0,w.__data[4]=V.elements[3],w.__data[5]=V.elements[4],w.__data[6]=V.elements[5],w.__data[7]=0,w.__data[8]=V.elements[6],w.__data[9]=V.elements[7],w.__data[10]=V.elements[8],w.__data[11]=0):(V.toArray(w.__data,W),W+=B.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,w.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(S,x,y,R){let E=S.value,b=x+"_"+y;if(R[b]===void 0)return typeof E=="number"||typeof E=="boolean"?R[b]=E:R[b]=E.clone(),!0;{let P=R[b];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return R[b]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function _(S){let x=S.uniforms,y=0,R=16;for(let b=0,P=x.length;b<P;b++){let N=Array.isArray(x[b])?x[b]:[x[b]];for(let v=0,w=N.length;v<w;v++){let L=N[v],k=Array.isArray(L.value)?L.value:[L.value];for(let W=0,J=k.length;W<J;W++){let V=k[W],B=g(V),D=y%R,Q=D%B.boundary,A=D+Q;y+=Q,A!==0&&R-A<B.storage&&(y+=R-A),L.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=B.storage}}}let E=y%R;return E>0&&(y+=R-E),S.__size=y,S.__cache={},this}function g(S){let x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){let x=S.target;x.removeEventListener("dispose",p);let y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(let S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}var yc=class{constructor(t={}){let{canvas:e=gx(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let f=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,m=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ri,this.toneMapping=Er,this.toneMappingExposure=1;let x=this,y=!1,R=0,E=0,b=null,P=-1,N=null,v=new _e,w=new _e,L=null,k=new Vt(0),W=0,J=e.width,V=e.height,B=1,D=null,Q=null,A=new _e(0,0,J,V),K=new _e(0,0,J,V),St=!1,Gt=new ma,q=!1,et=!1,lt=new pe,rt=new pe,gt=new H,yt=new _e,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ut=!1;function Nt(){return b===null?B:1}let I=n;function ee(T,F){return e.getContext(T,F)}try{let T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${nd}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",ht,!1),I===null){let F="webgl2";if(I=ee(F,T),I===null)throw ee(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Dt,Wt,z,Qt,Lt,C,M,Y,j,it,$,wt,ot,dt,Yt,st,Mt,bt,Ot,xt,qt,zt,se,U;function nt(){Dt=new RS(I),Dt.init(),zt=new a1(I,Dt),Wt=new bS(I,Dt,t,zt),z=new r1(I),Wt.reverseDepthBuffer&&z.buffers.depth.setReversed(!0),Qt=new LS(I),Lt=new Xb,C=new o1(I,Dt,z,Lt,Wt,zt,Qt),M=new TS(x),Y=new CS(x),j=new zx(I),se=new MS(I,j),it=new PS(I,j,Qt,se),$=new US(I,it,j,Qt),Ot=new DS(I,Wt,C),st=new wS(Lt),wt=new Wb(x,M,Y,Dt,Wt,se,st),ot=new f1(x,Lt),dt=new qb,Yt=new jb(Dt),bt=new yS(x,M,Y,z,$,d,l),Mt=new n1(x,$,Wt),U=new d1(I,Qt,Wt,z),xt=new SS(I,Dt,Qt),qt=new IS(I,Dt,Qt),Qt.programs=wt.programs,x.capabilities=Wt,x.extensions=Dt,x.properties=Lt,x.renderLists=dt,x.shadowMap=Mt,x.state=z,x.info=Qt}nt();let Z=new kf(x,I);this.xr=Z,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let T=Dt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Dt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(J,V,!1))},this.getSize=function(T){return T.set(J,V)},this.setSize=function(T,F,G=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=T,V=F,e.width=Math.floor(T*B),e.height=Math.floor(F*B),G===!0&&(e.style.width=T+"px",e.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(J*B,V*B).floor()},this.setDrawingBufferSize=function(T,F,G){J=T,V=F,B=G,e.width=Math.floor(T*G),e.height=Math.floor(F*G),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(v)},this.getViewport=function(T){return T.copy(A)},this.setViewport=function(T,F,G,X){T.isVector4?A.set(T.x,T.y,T.z,T.w):A.set(T,F,G,X),z.viewport(v.copy(A).multiplyScalar(B).round())},this.getScissor=function(T){return T.copy(K)},this.setScissor=function(T,F,G,X){T.isVector4?K.set(T.x,T.y,T.z,T.w):K.set(T,F,G,X),z.scissor(w.copy(K).multiplyScalar(B).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(T){z.setScissorTest(St=T)},this.setOpaqueSort=function(T){D=T},this.setTransparentSort=function(T){Q=T},this.getClearColor=function(T){return T.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor.apply(bt,arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha.apply(bt,arguments)},this.clear=function(T=!0,F=!0,G=!0){let X=0;if(T){let O=!1;if(b!==null){let at=b.texture.format;O=at===hd||at===cd||at===ld}if(O){let at=b.texture.type,_t=at===Ji||at===ds||at===fa||at===uo||at===sd||at===od,ft=bt.getClearColor(),ut=bt.getClearAlpha(),Ct=ft.r,Bt=ft.g,At=ft.b;_t?(f[0]=Ct,f[1]=Bt,f[2]=At,f[3]=ut,I.clearBufferuiv(I.COLOR,0,f)):(_[0]=Ct,_[1]=Bt,_[2]=At,_[3]=ut,I.clearBufferiv(I.COLOR,0,_))}else X|=I.COLOR_BUFFER_BIT}F&&(X|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(X|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),dt.dispose(),Yt.dispose(),Lt.dispose(),M.dispose(),Y.dispose(),$.dispose(),se.dispose(),U.dispose(),wt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",ce),Z.removeEventListener("sessionend",pt),Ft.stop()};function tt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;let T=Qt.autoReset,F=Mt.enabled,G=Mt.autoUpdate,X=Mt.needsUpdate,O=Mt.type;nt(),Qt.autoReset=T,Mt.enabled=F,Mt.autoUpdate=G,Mt.needsUpdate=X,Mt.type=O}function ht(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Zt(T){let F=T.target;F.removeEventListener("dispose",Zt),ve(F)}function ve(T){Ee(T),Lt.remove(T)}function Ee(T){let F=Lt.get(T).programs;F!==void 0&&(F.forEach(function(G){wt.releaseProgram(G)}),T.isShaderMaterial&&wt.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,G,X,O,at){F===null&&(F=Ht);let _t=O.isMesh&&O.matrixWorld.determinant()<0,ft=me(T,F,G,X,O);z.setMaterial(X,_t);let ut=G.index,Ct=1;if(X.wireframe===!0){if(ut=it.getWireframeAttribute(G),ut===void 0)return;Ct=2}let Bt=G.drawRange,At=G.attributes.position,oe=Bt.start*Ct,ie=(Bt.start+Bt.count)*Ct;at!==null&&(oe=Math.max(oe,at.start*Ct),ie=Math.min(ie,(at.start+at.count)*Ct)),ut!==null?(oe=Math.max(oe,0),ie=Math.min(ie,ut.count)):At!=null&&(oe=Math.max(oe,0),ie=Math.min(ie,At.count));let ge=ie-oe;if(ge<0||ge===1/0)return;se.setup(O,X,ft,G,ut);let $e,re=xt;if(ut!==null&&($e=j.get(ut),re=qt,re.setIndex($e)),O.isMesh)X.wireframe===!0?(z.setLineWidth(X.wireframeLinewidth*Nt()),re.setMode(I.LINES)):re.setMode(I.TRIANGLES);else if(O.isLine){let It=X.linewidth;It===void 0&&(It=1),z.setLineWidth(It*Nt()),O.isLineSegments?re.setMode(I.LINES):O.isLineLoop?re.setMode(I.LINE_LOOP):re.setMode(I.LINE_STRIP)}else O.isPoints?re.setMode(I.POINTS):O.isSprite&&re.setMode(I.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)re.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Dt.get("WEBGL_multi_draw"))re.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let It=O._multiDrawStarts,nn=O._multiDrawCounts,fe=O._multiDrawCount,li=ut?j.get(ut).bytesPerElement:1,ys=Lt.get(X).currentProgram.getUniforms();for(let Bn=0;Bn<fe;Bn++)ys.setValue(I,"_gl_DrawID",Bn),re.render(It[Bn]/li,nn[Bn])}else if(O.isInstancedMesh)re.renderInstances(oe,ge,O.count);else if(G.isInstancedBufferGeometry){let It=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,nn=Math.min(G.instanceCount,It);re.renderInstances(oe,ge,nn)}else re.render(oe,ge)};function ne(T,F,G){T.transparent===!0&&T.side===qi&&T.forceSinglePass===!1?(T.side=gn,T.needsUpdate=!0,Fe(T,F,G),T.side=Ar,T.needsUpdate=!0,Fe(T,F,G),T.side=qi):Fe(T,F,G)}this.compile=function(T,F,G=null){G===null&&(G=T),p=Yt.get(G),p.init(F),S.push(p),G.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==G&&T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();let X=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let at=O.material;if(at)if(Array.isArray(at))for(let _t=0;_t<at.length;_t++){let ft=at[_t];ne(ft,G,O),X.add(ft)}else ne(at,G,O),X.add(at)}),S.pop(),p=null,X},this.compileAsync=function(T,F,G=null){let X=this.compile(T,F,G);return new Promise(O=>{function at(){if(X.forEach(function(_t){Lt.get(_t).currentProgram.isReady()&&X.delete(_t)}),X.size===0){O(T);return}setTimeout(at,10)}Dt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Rt=null;function Et(T){Rt&&Rt(T)}function ce(){Ft.stop()}function pt(){Ft.start()}let Ft=new Kg;Ft.setAnimationLoop(Et),typeof self!="undefined"&&Ft.setContext(self),this.setAnimationLoop=function(T){Rt=T,Z.setAnimationLoop(T),T===null?Ft.stop():Ft.start()},Z.addEventListener("sessionstart",ce),Z.addEventListener("sessionend",pt),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(F),F=Z.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,F,b),p=Yt.get(T,S.length),p.init(F),S.push(p),rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Gt.setFromProjectionMatrix(rt),et=this.localClippingEnabled,q=st.init(this.clippingPlanes,et),g=dt.get(T,m.length),g.init(),m.push(g),Z.enabled===!0&&Z.isPresenting===!0){let at=x.xr.getDepthSensingMesh();at!==null&&Pt(at,F,-1/0,x.sortObjects)}Pt(T,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(D,Q),Ut=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Ut&&bt.addToRenderList(g,T),this.info.render.frame++,q===!0&&st.beginShadows();let G=p.state.shadowsArray;Mt.render(G,T,F),q===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){let at=F.cameras;if(O.length>0)for(let _t=0,ft=at.length;_t<ft;_t++){let ut=at[_t];Oe(X,O,T,ut)}Ut&&bt.render(T);for(let _t=0,ft=at.length;_t<ft;_t++){let ut=at[_t];Xt(g,T,ut,ut.viewport)}}else O.length>0&&Oe(X,O,T,F),Ut&&bt.render(T),Xt(g,T,F);b!==null&&(C.updateMultisampleRenderTarget(b),C.updateRenderTargetMipmap(b)),T.isScene===!0&&T.onAfterRender(x,T,F),se.resetDefaultState(),P=-1,N=null,S.pop(),S.length>0?(p=S[S.length-1],q===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Pt(T,F,G,X){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Gt.intersectsSprite(T)){X&&yt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(rt);let _t=$.update(T),ft=T.material;ft.visible&&g.push(T,_t,ft,G,yt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Gt.intersectsObject(T))){let _t=$.update(T),ft=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),yt.copy(T.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),yt.copy(_t.boundingSphere.center)),yt.applyMatrix4(T.matrixWorld).applyMatrix4(rt)),Array.isArray(ft)){let ut=_t.groups;for(let Ct=0,Bt=ut.length;Ct<Bt;Ct++){let At=ut[Ct],oe=ft[At.materialIndex];oe&&oe.visible&&g.push(T,_t,oe,G,yt.z,At)}}else ft.visible&&g.push(T,_t,ft,G,yt.z,null)}}let at=T.children;for(let _t=0,ft=at.length;_t<ft;_t++)Pt(at[_t],F,G,X)}function Xt(T,F,G,X){let O=T.opaque,at=T.transmissive,_t=T.transparent;p.setupLightsView(G),q===!0&&st.setGlobalState(x.clippingPlanes,G),X&&z.viewport(v.copy(X)),O.length>0&&$t(O,F,G),at.length>0&&$t(at,F,G),_t.length>0&&$t(_t,F,G),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function Oe(T,F,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Ki(1,1,{generateMipmaps:!0,type:Dt.has("EXT_color_buffer_half_float")||Dt.has("EXT_color_buffer_float")?Sa:Ji,minFilter:fs,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));let at=p.state.transmissionRenderTarget[X.id],_t=X.viewport||v;at.setSize(_t.z,_t.w);let ft=x.getRenderTarget();x.setRenderTarget(at),x.getClearColor(k),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),Ut&&bt.render(G);let ut=x.toneMapping;x.toneMapping=Er;let Ct=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),q===!0&&st.setGlobalState(x.clippingPlanes,X),$t(T,G,X),C.updateMultisampleRenderTarget(at),C.updateRenderTargetMipmap(at),Dt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let At=0,oe=F.length;At<oe;At++){let ie=F[At],ge=ie.object,$e=ie.geometry,re=ie.material,It=ie.group;if(re.side===qi&&ge.layers.test(X.layers)){let nn=re.side;re.side=gn,re.needsUpdate=!0,Ae(ge,G,X,$e,re,It),re.side=nn,re.needsUpdate=!0,Bt=!0}}Bt===!0&&(C.updateMultisampleRenderTarget(at),C.updateRenderTargetMipmap(at))}x.setRenderTarget(ft),x.setClearColor(k,W),Ct!==void 0&&(X.viewport=Ct),x.toneMapping=ut}function $t(T,F,G){let X=F.isScene===!0?F.overrideMaterial:null;for(let O=0,at=T.length;O<at;O++){let _t=T[O],ft=_t.object,ut=_t.geometry,Ct=X===null?_t.material:X,Bt=_t.group;ft.layers.test(G.layers)&&Ae(ft,F,G,ut,Ct,Bt)}}function Ae(T,F,G,X,O,at){T.onBeforeRender(x,F,G,X,O,at),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(x,F,G,X,T,at),O.transparent===!0&&O.side===qi&&O.forceSinglePass===!1?(O.side=gn,O.needsUpdate=!0,x.renderBufferDirect(G,F,X,O,T,at),O.side=Ar,O.needsUpdate=!0,x.renderBufferDirect(G,F,X,O,T,at),O.side=qi):x.renderBufferDirect(G,F,X,O,T,at),T.onAfterRender(x,F,G,X,O,at)}function Fe(T,F,G){F.isScene!==!0&&(F=Ht);let X=Lt.get(T),O=p.state.lights,at=p.state.shadowsArray,_t=O.state.version,ft=wt.getParameters(T,O.state,at,F,G),ut=wt.getProgramCacheKey(ft),Ct=X.programs;X.environment=T.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(T.isMeshStandardMaterial?Y:M).get(T.envMap||X.environment),X.envMapRotation=X.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ct===void 0&&(T.addEventListener("dispose",Zt),Ct=new Map,X.programs=Ct);let Bt=Ct.get(ut);if(Bt!==void 0){if(X.currentProgram===Bt&&X.lightsStateVersion===_t)return xe(T,ft),Bt}else ft.uniforms=wt.getUniforms(T),T.onBeforeCompile(ft,x),Bt=wt.acquireProgram(ft,ut),Ct.set(ut,Bt),X.uniforms=ft.uniforms;let At=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(At.clippingPlanes=st.uniform),xe(T,ft),X.needsLights=be(T),X.lightsStateVersion=_t,X.needsLights&&(At.ambientLightColor.value=O.state.ambient,At.lightProbe.value=O.state.probe,At.directionalLights.value=O.state.directional,At.directionalLightShadows.value=O.state.directionalShadow,At.spotLights.value=O.state.spot,At.spotLightShadows.value=O.state.spotShadow,At.rectAreaLights.value=O.state.rectArea,At.ltc_1.value=O.state.rectAreaLTC1,At.ltc_2.value=O.state.rectAreaLTC2,At.pointLights.value=O.state.point,At.pointLightShadows.value=O.state.pointShadow,At.hemisphereLights.value=O.state.hemi,At.directionalShadowMap.value=O.state.directionalShadowMap,At.directionalShadowMatrix.value=O.state.directionalShadowMatrix,At.spotShadowMap.value=O.state.spotShadowMap,At.spotLightMatrix.value=O.state.spotLightMatrix,At.spotLightMap.value=O.state.spotLightMap,At.pointShadowMap.value=O.state.pointShadowMap,At.pointShadowMatrix.value=O.state.pointShadowMatrix),X.currentProgram=Bt,X.uniformsList=null,Bt}function Se(T){if(T.uniformsList===null){let F=T.currentProgram.getUniforms();T.uniformsList=ao.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function xe(T,F){let G=Lt.get(T);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function me(T,F,G,X,O){F.isScene!==!0&&(F=Ht),C.resetTextureUnits();let at=F.fog,_t=X.isMeshStandardMaterial?F.environment:null,ft=b===null?x.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Lr,ut=(X.isMeshStandardMaterial?Y:M).get(X.envMap||_t),Ct=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Bt=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),At=!!G.morphAttributes.position,oe=!!G.morphAttributes.normal,ie=!!G.morphAttributes.color,ge=Er;X.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(ge=x.toneMapping);let $e=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,re=$e!==void 0?$e.length:0,It=Lt.get(X),nn=p.state.lights;if(q===!0&&(et===!0||T!==N)){let $n=T===N&&X.id===P;st.setState(X,T,$n)}let fe=!1;X.version===It.__version?(It.needsLights&&It.lightsStateVersion!==nn.state.version||It.outputColorSpace!==ft||O.isBatchedMesh&&It.batching===!1||!O.isBatchedMesh&&It.batching===!0||O.isBatchedMesh&&It.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&It.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&It.instancing===!1||!O.isInstancedMesh&&It.instancing===!0||O.isSkinnedMesh&&It.skinning===!1||!O.isSkinnedMesh&&It.skinning===!0||O.isInstancedMesh&&It.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&It.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&It.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&It.instancingMorph===!1&&O.morphTexture!==null||It.envMap!==ut||X.fog===!0&&It.fog!==at||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==st.numPlanes||It.numIntersection!==st.numIntersection)||It.vertexAlphas!==Ct||It.vertexTangents!==Bt||It.morphTargets!==At||It.morphNormals!==oe||It.morphColors!==ie||It.toneMapping!==ge||It.morphTargetsCount!==re)&&(fe=!0):(fe=!0,It.__version=X.version);let li=It.currentProgram;fe===!0&&(li=Fe(X,F,O));let ys=!1,Bn=!1,Fc=!1,Be=li.getUniforms(),rr=It.uniforms;if(z.useProgram(li.program)&&(ys=!0,Bn=!0,Fc=!0),X.id!==P&&(P=X.id,Bn=!0),ys||N!==T){Wt.reverseDepthBuffer?(lt.copy(T.projectionMatrix),vx(lt),xx(lt),Be.setValue(I,"projectionMatrix",lt)):Be.setValue(I,"projectionMatrix",T.projectionMatrix),Be.setValue(I,"viewMatrix",T.matrixWorldInverse);let $n=Be.map.cameraPosition;$n!==void 0&&$n.setValue(I,gt.setFromMatrixPosition(T.matrixWorld)),Wt.logarithmicDepthBuffer&&Be.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Be.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),N!==T&&(N=T,Bn=!0,Fc=!0)}if(O.isSkinnedMesh){Be.setOptional(I,O,"bindMatrix"),Be.setOptional(I,O,"bindMatrixInverse");let $n=O.skeleton;$n&&($n.boneTexture===null&&$n.computeBoneTexture(),Be.setValue(I,"boneTexture",$n.boneTexture,C))}O.isBatchedMesh&&(Be.setOptional(I,O,"batchingTexture"),Be.setValue(I,"batchingTexture",O._matricesTexture,C),Be.setOptional(I,O,"batchingIdTexture"),Be.setValue(I,"batchingIdTexture",O._indirectTexture,C),Be.setOptional(I,O,"batchingColorTexture"),O._colorsTexture!==null&&Be.setValue(I,"batchingColorTexture",O._colorsTexture,C));let Bc=G.morphAttributes;if((Bc.position!==void 0||Bc.normal!==void 0||Bc.color!==void 0)&&Ot.update(O,G,li),(Bn||It.receiveShadow!==O.receiveShadow)&&(It.receiveShadow=O.receiveShadow,Be.setValue(I,"receiveShadow",O.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(rr.envMap.value=ut,rr.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(rr.envMapIntensity.value=F.environmentIntensity),Bn&&(Be.setValue(I,"toneMappingExposure",x.toneMappingExposure),It.needsLights&&Fn(rr,Fc),at&&X.fog===!0&&ot.refreshFogUniforms(rr,at),ot.refreshMaterialUniforms(rr,X,B,V,p.state.transmissionRenderTarget[T.id]),ao.upload(I,Se(It),rr,C)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ao.upload(I,Se(It),rr,C),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Be.setValue(I,"center",O.center),Be.setValue(I,"modelViewMatrix",O.modelViewMatrix),Be.setValue(I,"normalMatrix",O.normalMatrix),Be.setValue(I,"modelMatrix",O.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let $n=X.uniformsGroups;for(let zc=0,g0=$n.length;zc<g0;zc++){let Ad=$n[zc];U.update(Ad,li),U.bind(Ad,li)}}return li}function Fn(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function be(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(T,F,G){Lt.get(T.texture).__webglTexture=F,Lt.get(T.depthTexture).__webglTexture=G;let X=Lt.get(T);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=G===void 0,X.__autoAllocateDepthBuffer||Dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,F){let G=Lt.get(T);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,G=0){b=T,R=F,E=G;let X=!0,O=null,at=!1,_t=!1;if(T){let ut=Lt.get(T);if(ut.__useDefaultFramebuffer!==void 0)z.bindFramebuffer(I.FRAMEBUFFER,null),X=!1;else if(ut.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(ut.__hasExternalTextures)C.rebindTextures(T,Lt.get(T.texture).__webglTexture,Lt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let At=T.depthTexture;if(ut.__boundDepthTexture!==At){if(At!==null&&Lt.has(At)&&(T.width!==At.image.width||T.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}let Ct=T.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(_t=!0);let Bt=Lt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Bt[F])?O=Bt[F][G]:O=Bt[F],at=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?O=Lt.get(T).__webglMultisampledFramebuffer:Array.isArray(Bt)?O=Bt[G]:O=Bt,v.copy(T.viewport),w.copy(T.scissor),L=T.scissorTest}else v.copy(A).multiplyScalar(B).floor(),w.copy(K).multiplyScalar(B).floor(),L=St;if(z.bindFramebuffer(I.FRAMEBUFFER,O)&&X&&z.drawBuffers(T,O),z.viewport(v),z.scissor(w),z.setScissorTest(L),at){let ut=Lt.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,ut.__webglTexture,G)}else if(_t){let ut=Lt.get(T.texture),Ct=F||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ut.__webglTexture,G||0,Ct)}P=-1},this.readRenderTargetPixels=function(T,F,G,X,O,at,_t){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(ft=ft[_t]),ft){z.bindFramebuffer(I.FRAMEBUFFER,ft);try{let ut=T.texture,Ct=ut.format,Bt=ut.type;if(!Wt.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-X&&G>=0&&G<=T.height-O&&I.readPixels(F,G,X,O,zt.convert(Ct),zt.convert(Bt),at)}finally{let ut=b!==null?Lt.get(b).__webglFramebuffer:null;z.bindFramebuffer(I.FRAMEBUFFER,ut)}}},this.readRenderTargetPixelsAsync=async function(T,F,G,X,O,at,_t){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(ft=ft[_t]),ft){let ut=T.texture,Ct=ut.format,Bt=ut.type;if(!Wt.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=T.width-X&&G>=0&&G<=T.height-O){z.bindFramebuffer(I.FRAMEBUFFER,ft);let At=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,At),I.bufferData(I.PIXEL_PACK_BUFFER,at.byteLength,I.STREAM_READ),I.readPixels(F,G,X,O,zt.convert(Ct),zt.convert(Bt),0);let oe=b!==null?Lt.get(b).__webglFramebuffer:null;z.bindFramebuffer(I.FRAMEBUFFER,oe);let ie=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await _x(I,ie,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,At),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,at),I.deleteBuffer(At),I.deleteSync(ie),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,F=null,G=0){T.isTexture!==!0&&(ic("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,T=arguments[1]);let X=Math.pow(2,-G),O=Math.floor(T.image.width*X),at=Math.floor(T.image.height*X),_t=F!==null?F.x:0,ft=F!==null?F.y:0;C.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,_t,ft,O,at),z.unbindTexture()},this.copyTextureToTexture=function(T,F,G=null,X=null,O=0){T.isTexture!==!0&&(ic("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,T=arguments[1],F=arguments[2],O=arguments[3]||0,G=null);let at,_t,ft,ut,Ct,Bt;G!==null?(at=G.max.x-G.min.x,_t=G.max.y-G.min.y,ft=G.min.x,ut=G.min.y):(at=T.image.width,_t=T.image.height,ft=0,ut=0),X!==null?(Ct=X.x,Bt=X.y):(Ct=0,Bt=0);let At=zt.convert(F.format),oe=zt.convert(F.type);C.setTexture2D(F,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);let ie=I.getParameter(I.UNPACK_ROW_LENGTH),ge=I.getParameter(I.UNPACK_IMAGE_HEIGHT),$e=I.getParameter(I.UNPACK_SKIP_PIXELS),re=I.getParameter(I.UNPACK_SKIP_ROWS),It=I.getParameter(I.UNPACK_SKIP_IMAGES),nn=T.isCompressedTexture?T.mipmaps[O]:T.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,nn.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,nn.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ft),I.pixelStorei(I.UNPACK_SKIP_ROWS,ut),T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,O,Ct,Bt,at,_t,At,oe,nn.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,O,Ct,Bt,nn.width,nn.height,At,nn.data):I.texSubImage2D(I.TEXTURE_2D,O,Ct,Bt,at,_t,At,oe,nn),I.pixelStorei(I.UNPACK_ROW_LENGTH,ie),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ge),I.pixelStorei(I.UNPACK_SKIP_PIXELS,$e),I.pixelStorei(I.UNPACK_SKIP_ROWS,re),I.pixelStorei(I.UNPACK_SKIP_IMAGES,It),O===0&&F.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),z.unbindTexture()},this.copyTextureToTexture3D=function(T,F,G=null,X=null,O=0){T.isTexture!==!0&&(ic("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,X=arguments[1]||null,T=arguments[2],F=arguments[3],O=arguments[4]||0);let at,_t,ft,ut,Ct,Bt,At,oe,ie,ge=T.isCompressedTexture?T.mipmaps[O]:T.image;G!==null?(at=G.max.x-G.min.x,_t=G.max.y-G.min.y,ft=G.max.z-G.min.z,ut=G.min.x,Ct=G.min.y,Bt=G.min.z):(at=ge.width,_t=ge.height,ft=ge.depth,ut=0,Ct=0,Bt=0),X!==null?(At=X.x,oe=X.y,ie=X.z):(At=0,oe=0,ie=0);let $e=zt.convert(F.format),re=zt.convert(F.type),It;if(F.isData3DTexture)C.setTexture3D(F,0),It=I.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)C.setTexture2DArray(F,0),It=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);let nn=I.getParameter(I.UNPACK_ROW_LENGTH),fe=I.getParameter(I.UNPACK_IMAGE_HEIGHT),li=I.getParameter(I.UNPACK_SKIP_PIXELS),ys=I.getParameter(I.UNPACK_SKIP_ROWS),Bn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ge.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ge.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ut),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ct),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Bt),T.isDataTexture||T.isData3DTexture?I.texSubImage3D(It,O,At,oe,ie,at,_t,ft,$e,re,ge.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(It,O,At,oe,ie,at,_t,ft,$e,ge.data):I.texSubImage3D(It,O,At,oe,ie,at,_t,ft,$e,re,ge),I.pixelStorei(I.UNPACK_ROW_LENGTH,nn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,fe),I.pixelStorei(I.UNPACK_SKIP_PIXELS,li),I.pixelStorei(I.UNPACK_SKIP_ROWS,ys),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Bn),O===0&&F.generateMipmaps&&I.generateMipmap(It),z.unbindTexture()},this.initRenderTarget=function(T){Lt.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),z.unbindTexture()},this.resetState=function(){R=0,E=0,b=null,z.reset(),se.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===ud?"display-p3":"srgb",e.unpackColorSpace=de.workingColorSpace===Pc?"display-p3":"srgb"}},Mc=class r{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Vt(t),this.density=e}clone(){return new r(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Sc=class extends Ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ri,this.environmentIntensity=1,this.environmentRotation=new Ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Hf=class extends Yn{constructor(t=null,e=1,n=1,i,s,o,a,l,c=On,h=On,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bc=class extends tn{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},to=new pe,bg=new pe,Gl=[],wg=new Qi,p1=new pe,sa=new Ge,oa=new ji,mo=class extends Ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new bc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,p1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Qi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,to),wg.copy(t.boundingBox).applyMatrix4(to),this.boundingBox.union(wg)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,to),oa.copy(t.boundingSphere).applyMatrix4(to),this.boundingSphere.union(oa)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(sa.geometry=this.geometry,sa.material=this.material,sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oa.copy(this.boundingSphere),oa.applyMatrix4(n),t.ray.intersectsSphere(oa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,to),bg.multiplyMatrices(n,to),sa.matrixWorld=bg,sa.raycast(t,Gl);for(let o=0,a=Gl.length;o<a;o++){let l=Gl[o];l.instanceId=s,l.object=this,e.push(l)}Gl.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new bc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hf(new Float32Array(i*this.count),i,this.count,ad,Ai));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var go=class extends tr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},wc=new H,Tc=new H,Tg=new pe,aa=new pa,Wl=new ji,Uu=new H,Eg=new H,Vf=class extends Ye{constructor(t=new _n,e=new go){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)wc.fromBufferAttribute(e,i-1),Tc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=wc.distanceTo(Tc);t.setAttribute("lineDistance",new Pn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wl.copy(n.boundingSphere),Wl.applyMatrix4(i),Wl.radius+=s,t.ray.intersectsSphere(Wl)===!1)return;Tg.copy(i).invert(),aa.copy(t.ray).applyMatrix4(Tg);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let g=f,p=_-1;g<p;g+=c){let m=h.getX(g),S=h.getX(g+1),x=Xl(this,t,aa,l,m,S);x&&e.push(x)}if(this.isLineLoop){let g=h.getX(_-1),p=h.getX(f),m=Xl(this,t,aa,l,g,p);m&&e.push(m)}}else{let f=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let g=f,p=_-1;g<p;g+=c){let m=Xl(this,t,aa,l,g,g+1);m&&e.push(m)}if(this.isLineLoop){let g=Xl(this,t,aa,l,_-1,f);g&&e.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Xl(r,t,e,n,i,s){let o=r.geometry.attributes.position;if(wc.fromBufferAttribute(o,i),Tc.fromBufferAttribute(o,s),e.distanceSqToSegment(wc,Tc,Uu,Eg)>n)return;Uu.applyMatrix4(r.matrixWorld);let l=t.ray.origin.distanceTo(Uu);if(!(l<t.near||l>t.far))return{distance:l,point:Eg.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}var Ag=new H,Cg=new H,ga=class extends Vf{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Ag.fromBufferAttribute(e,i),Cg.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ag.distanceTo(Cg);t.setAttribute("lineDistance",new Pn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Pr=class extends tr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Rg=new pe,Gf=new pa,Yl=new ji,ql=new H,ps=class extends Ye{constructor(t=new _n,e=new Pr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yl.copy(n.boundingSphere),Yl.applyMatrix4(i),Yl.radius+=s,t.ray.intersectsSphere(Yl)===!1)return;Rg.copy(i).invert(),Gf.copy(t.ray).applyMatrix4(Rg);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let _=d,g=f;_<g;_++){let p=c.getX(_);ql.fromBufferAttribute(u,p),Pg(ql,p,l,i,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let _=d,g=f;_<g;_++)ql.fromBufferAttribute(u,_),Pg(ql,_,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Pg(r,t,e,n,i,s,o){let a=Gf.distanceSqToPoint(r);if(a<e){let l=new H;Gf.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Zl=new H,$l=new H,Nu=new H,Jl=new wr,_a=class extends _n{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),s=Math.cos(so*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);let{a:g,b:p,c:m}=Jl;if(g.fromBufferAttribute(a,c[0]),p.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Jl.getNormal(Nu),u[0]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){let x=(S+1)%3,y=u[S],R=u[x],E=Jl[h[S]],b=Jl[h[x]],P=`${y}_${R}`,N=`${R}_${y}`;N in d&&d[N]?(Nu.dot(d[N].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(b.x,b.y,b.z)),d[N]=null):P in d||(d[P]={index0:c[S],index1:c[x],normal:Nu.clone()})}}for(let _ in d)if(d[_]){let{index0:g,index1:p}=d[_];Zl.fromBufferAttribute(a,g),$l.fromBufferAttribute(a,p),f.push(Zl.x,Zl.y,Zl.z),f.push($l.x,$l.y,$l.z)}this.setAttribute("position",new Pn(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var va=class r extends _n{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new H,d=new H,f=[],_=[],g=[],p=[];for(let m=0;m<=n;m++){let S=[],x=m/n,y=0;m===0&&o===0?y=.5/e:m===n&&l===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){let E=R/e;u.x=-t*Math.cos(i+E*s)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+E*s)*Math.sin(o+x*a),_.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),p.push(E+y,1-x),S.push(c++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<e;S++){let x=h[m][S+1],y=h[m][S],R=h[m+1][S],E=h[m+1][S+1];(m!==0||o>0)&&f.push(x,y,E),(m!==n-1||l<Math.PI)&&f.push(y,R,E)}this.setIndex(f),this.setAttribute("position",new Pn(_,3)),this.setAttribute("normal",new Pn(g,3)),this.setAttribute("uv",new Pn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ir=class extends tr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yg,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Kl(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function m1(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var _o=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Wf=class extends _o{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pm,endingEnd:Pm}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Im:s=t,a=2*e-n;break;case Lm:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Im:o=t,l=2*n-e;break;case Lm:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,_=(n-e)/(i-e),g=_*_,p=g*_,m=-d*p+2*d*g-d*_,S=(1+d)*p+(-1.5-2*d)*g+(-.5+d)*_+1,x=(-1-f)*p+(1.5+f)*g+.5*_,y=f*p-f*g;for(let R=0;R!==a;++R)s[R]=m*o[h+R]+S*o[c+R]+x*o[l+R]+y*o[u+R];return s}},Xf=class extends _o{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},Yf=class extends _o{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},vi=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Kl(e,this.TimeBufferType),this.values=Kl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Kl(t.times,Array),values:Kl(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Yf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Xf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Wf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case rc:e=this.InterpolantFactoryMethodDiscrete;break;case wf:e=this.InterpolantFactoryMethodLinear;break;case ou:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return rc;case this.InterpolantFactoryMethodLinear:return wf;case this.InterpolantFactoryMethodSmooth:return ou}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&m1(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ou,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let _=0;_!==n;++_){let g=e[u+_];if(g!==e[d+_]||g!==e[f+_]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=wf;var ms=class extends vi{constructor(t,e,n){super(t,e,n)}};ms.prototype.ValueTypeName="bool";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=rc;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;var qf=class extends vi{};qf.prototype.ValueTypeName="color";var Zf=class extends vi{};Zf.prototype.ValueTypeName="number";var $f=class extends _o{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ci.slerpFlat(s,0,o,c-a,o,c,l);return s}},Ec=class extends vi{InterpolantFactoryMethodLinear(t){return new $f(this.times,this.values,this.getValueSize(),t)}};Ec.prototype.ValueTypeName="quaternion";Ec.prototype.InterpolantFactoryMethodSmooth=void 0;var gs=class extends vi{constructor(t,e,n){super(t,e,n)}};gs.prototype.ValueTypeName="string";gs.prototype.ValueBufferType=Array;gs.prototype.DefaultInterpolation=rc;gs.prototype.InterpolantFactoryMethodLinear=void 0;gs.prototype.InterpolantFactoryMethodSmooth=void 0;var Jf=class extends vi{};Jf.prototype.ValueTypeName="vector";var Kf=class{constructor(t,e,n){let i=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],_=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return _}return null}}},g1=new Kf,Qf=class{constructor(t){this.manager=t!==void 0?t:g1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Qf.DEFAULT_MATERIAL_NAME="__DEFAULT";var xa=class extends Ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ac=class extends xa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Ou=new pe,Ig=new H,Lg=new H,Cc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ma,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ig.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ig),Lg.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lg),e.updateMatrixWorld(),Ou.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ou),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ou)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Dg=new pe,la=new H,Fu=new H,jf=class extends Cc{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new _e(2,1,1,1),new _e(0,1,1,1),new _e(3,1,1,1),new _e(1,1,1,1),new _e(3,0,1,1),new _e(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),la.setFromMatrixPosition(t.matrixWorld),n.position.copy(la),Fu.copy(n.position),Fu.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Fu),n.updateMatrixWorld(),i.makeTranslation(-la.x,-la.y,-la.z),Dg.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dg)}},ya=class extends xa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new jf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},td=class extends Cc{constructor(){super(new _c(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ma=class extends xa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.target=new Ye,this.shadow=new td}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var pd="\\[\\]\\.:\\/",_1=new RegExp("["+pd+"]","g"),md="[^"+pd+"]",v1="[^"+pd.replace("\\.","")+"]",x1=/((?:WC+[\/:])*)/.source.replace("WC",md),y1=/(WCOD+)?/.source.replace("WCOD",v1),M1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",md),S1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",md),b1=new RegExp("^"+x1+y1+M1+S1+"$"),w1=["material","materials","bones","map"],ed=class{constructor(t,e,n){let i=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_1,"")}static parseTrackName(t){let e=b1.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);w1.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=ed;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ow=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nd}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nd);var ba=48,_s=3.2,oi=14,qn=10,ai=ba*_s;function E1(r){let t=r>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function n0(r){let t=window.matchMedia("(max-width: 760px)").matches,e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=new yc({canvas:r,antialias:!t,alpha:!1,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,t?1.5:1.75)),n.outputColorSpace=ri,n.toneMapping=id,n.toneMappingExposure=1.05;let i=new Sc,s=new Vt("#2a2338");i.fog=new Mc(s,.0032);let o=new mn(t?52:42,1,.5,2e3),a=E1(48),l=new va(900,32,16),c=new si({side:gn,depthWrite:!1,fog:!1,uniforms:{top:{value:new Vt("#04060c")},mid:{value:new Vt("#121a33")},low:{value:new Vt("#6b3f3a")},sun:{value:new H(-.6,.02,-.8).normalize()}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 mid; uniform vec3 low; uniform vec3 sun; varying vec3 vP;
      void main(){ float h = vP.y; vec3 c = mix(low, mid, smoothstep(-0.02, 0.18, h)); c = mix(c, top, smoothstep(0.18, 0.75, h));
      float g = pow(max(dot(normalize(vec3(vP.x, max(vP.y,0.0)*0.6, vP.z)), sun), 0.0), 12.0); c += vec3(0.9,0.45,0.25) * g * 0.35 * (1.0 - smoothstep(0.0, 0.35, h));
      gl_FragColor = vec4(c, 1.0); }`});i.add(new Ge(l,c));{let B=t?700:1500,D=new Float32Array(B*3);for(let A=0;A<B;A++){let K=a()*Math.PI*2,St=Math.acos(a()*.85+.15);D.set([Math.cos(K)*Math.sin(St)*800,Math.cos(St)*800,Math.sin(K)*Math.sin(St)*800],A*3)}let Q=new _n;Q.setAttribute("position",new tn(D,3)),i.add(new ps(Q,new Pr({color:13621503,size:1.6,sizeAttenuation:!1,transparent:!0,opacity:.7,fog:!1})))}i.add(new Ac(5926042,658192,.65));let h=new Ma(12374271,1.1);h.position.set(80,160,60),i.add(h);let u=new Ma(16751211,.7);u.position.set(-200,20,-260),i.add(u);let d=new Ge(new er(1800,1800),new Ir({color:461070,roughness:1}));d.rotation.x=-Math.PI/2,i.add(d);let f=new Ge(new er(1800,900),new Ir({color:726052,roughness:.22,metalness:.85}));f.rotation.x=-Math.PI/2,f.position.set(0,.05,-520),i.add(f);{let D=new Float32Array(660);for(let A=0;A<220;A++){let K=-600+A/220*1200;D.set([K,.6,-72+Math.sin(K*.006)*14],A*3)}let Q=new _n;Q.setAttribute("position",new tn(D,3)),i.add(new ps(Q,new Pr({color:16761466,size:2.4,sizeAttenuation:!1})))}let _=new $i;i.add(_);{let B=t?420:900,D=new _i(1,1,1);D.translate(0,.5,0);let Q=new Ir({color:1317414,roughness:.85,metalness:.1}),A=new mo(D,Q,B),K=new pe,St=new Ci,Gt=new H,q=new H,et=[],lt=0;for(;lt<B;){let gt=(a()-.5)*900,yt=-60+a()*600;if(Math.abs(gt)<26&&yt<30)continue;let Ht=Math.hypot(gt,yt),Ut=4+Math.pow(a(),3)*(Ht<160?60:28),Nt=6+a()*12,I=6+a()*12;q.set(gt,0,yt),Gt.set(Nt,Ut,I),K.compose(q,St.setFromAxisAngle(new H(0,1,0),(a()-.5)*.3),Gt),A.setMatrixAt(lt++,K);let ee=Math.floor(Ut/6);for(let Dt=0;Dt<ee;Dt++)a()<.55&&et.push(gt+(a()-.5)*Nt,2+a()*(Ut-2),yt+(a()<.5?-I/2-.1:I/2+.1))}_.add(A);let rt=new _n;rt.setAttribute("position",new tn(new Float32Array(et),3)),_.add(new ps(rt,new Pr({color:16767392,size:1.5,sizeAttenuation:!1,transparent:!0,opacity:.85})))}let g=new $i;i.add(g);let p=new Ge(new _i(oi,ai,qn),new Ir({color:858668,metalness:.9,roughness:.18,emissive:330260}));p.position.y=ai/2,g.add(p);{let B=new _i(oi+.7,.28,qn+.7),D=new Ir({color:12169892,roughness:.6,metalness:.1,emissive:2761752}),Q=new mo(B,D,ba+1),A=new pe;for(let K=0;K<=ba;K++)A.makeTranslation(0,K*_s,0),Q.setMatrixAt(K,A);g.add(Q)}let m=new Vt(1,.74,.46),S=new Vt(1,.88,.7),x=new Vt(.04,.07,.12),y=[];{let Q=_s-.55,A=[{n:Math.floor(oi/(1.25+.18)),len:oi,z:qn/2+.02,rot:0,axis:"x"},{n:Math.floor(oi/(1.25+.18)),len:oi,z:-qn/2-.02,rot:Math.PI,axis:"x"},{n:Math.floor(qn/(1.25+.18)),len:qn,z:oi/2+.02,rot:Math.PI/2,axis:"z"},{n:Math.floor(qn/(1.25+.18)),len:qn,z:-oi/2-.02,rot:-Math.PI/2,axis:"z"}],K=A.reduce((rt,gt)=>rt+gt.n,0)*ba,St=new er(1.25,Q),Gt=new Rr({toneMapped:!1}),q=new mo(St,Gt,K),et=new Ye,lt=0;for(let rt=0;rt<ba;rt++)for(let gt of A){let yt=gt.len/gt.n;for(let Ht=0;Ht<gt.n;Ht++){let Ut=-gt.len/2+yt*(Ht+.5);gt.axis==="x"?et.position.set(Ut,rt*_s+_s/2+.1,gt.z):et.position.set(gt.z,rt*_s+_s/2+.1,Ut),et.rotation.set(0,gt.rot,0),et.updateMatrix(),q.setMatrixAt(lt,et.matrix);let Nt=a()<(rt<2?.9:.42),I=Nt?(a()<.3?S:m).clone().multiplyScalar(.55+a()*.6):x;q.setColorAt(lt,I),y.push(Nt),lt++}}q.instanceColor.needsUpdate=!0,g.add(q),g.userData.windows=q}{let B=new ga(new _a(new _i(oi+.72,ai,qn+.72)),new go({color:13215083,transparent:!0,opacity:.55}));B.position.y=ai/2,g.add(B);let D=new ga(new _a(new _i(oi+.7,6,qn+.7)),new go({color:15124623}));D.position.y=ai+3,g.add(D);let Q=new Ge(new er(oi*.62,qn*.45),new Rr({color:new Vt(.25,.85,1),toneMapped:!1}));Q.rotation.x=-Math.PI/2,Q.position.set(-1.5,ai+.2,1),g.add(Q);let A=new ya(7331071,60,30,2);A.position.set(-1.5,ai+2,1),g.add(A);let K=new ya(16757611,120,40,2);K.position.set(0,3,qn/2+6),g.add(K);let St=new Ge(new va(.45,12,8),new Rr({color:16734794,toneMapped:!1}));St.position.set(oi/2,ai+6.4,qn/2),g.add(St),g.userData.beacon=St}let R;{let B=t?160:360,D=new Float32Array(B*3);for(let A=0;A<B;A++){let K=a()*Math.PI*2,St=14+a()*30;D.set([Math.cos(K)*St,a()*(ai+30),Math.sin(K)*St],A*3)}let Q=new _n;Q.setAttribute("position",new tn(D,3)),R=new ps(Q,new Pr({color:15124623,size:.18,transparent:!0,opacity:.55,depthWrite:!1})),i.add(R)}let E=0,b=0,P={x:0,y:0,sx:0,sy:0},N=new H;function v(B){let D=B<.5?4*B*B*B:1-Math.pow(-2*B+2,3)/2,Q=Ic.lerp(3.5,ai+22,D),A=.55+D*2.1+P.sx*.06,K=Ic.lerp(t?58:46,t?70:58,Math.sin(D*Math.PI)*.6+D*.4);o.position.set(Math.sin(A)*K,Q+P.sy*1.5,Math.cos(A)*K);let St=B<.02?26:Ic.lerp(26,ai-6,D);N.set((t?-7:-16)*(1-D*.7),St,0),o.lookAt(N)}function w(){let B=r.clientWidth||window.innerWidth,D=r.clientHeight||window.innerHeight;n.setSize(B,D,!1),o.aspect=B/D,o.updateProjectionMatrix()}w(),window.addEventListener("resize",w),window.addEventListener("pointermove",B=>{P.x=B.clientX/window.innerWidth-.5,P.y=B.clientY/window.innerHeight-.5},{passive:!0});let L=!0,k=0,W=performance.now(),J=new Vt;function V(B){if(k=requestAnimationFrame(V),!L)return;let D=Math.min((B-W)/1e3,.05);W=B,b+=(E-b)*(e?1:Math.min(D*3.2,1)),P.sx+=(P.x-P.sx)*.04,P.sy+=(P.y-P.sy)*.04,v(b);let Q=R.geometry.attributes.position;if(!e){for(let A=0;A<Q.count;A++){let K=Q.getY(A)+D*1.6;K>ai+30&&(K=0),Q.setY(A,K)}if(Q.needsUpdate=!0,Math.random()<.25){let A=g.userData.windows,K=Math.floor(Math.random()*A.count);y[K]=!y[K],A.setColorAt(K,y[K]?J.copy(m).multiplyScalar(.6+Math.random()*.5):x),A.instanceColor.needsUpdate=!0}g.userData.beacon.visible=Math.floor(B/900)%2===0}n.render(i,o)}return k=requestAnimationFrame(V),{setProgress(B){E=Math.max(0,Math.min(1,B))},setVisible(B){L=B},destroy(){cancelAnimationFrame(k),n.dispose()}}}function A1(r){let t=r>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function C1(r,t=2){let e=Math.min(window.devicePixelRatio||1,t),n=Math.max(1,Math.round(r.clientWidth*e)),i=Math.max(1,Math.round(r.clientHeight*e));return(r.width!==n||r.height!==i)&&(r.width=n,r.height=i),{ctx:r.getContext("2d"),w:n,h:i}}function wa(r,t,e,n,i){let s=r.createLinearGradient(0,0,0,i);n.forEach(([o,a])=>s.addColorStop(o,a)),r.fillStyle=s,r.fillRect(0,0,t,i+2)}function yo(r,t,e,n,i,s=1){let o=r.createRadialGradient(t,e,0,t,e,n);o.addColorStop(0,i),o.addColorStop(1,"rgba(0,0,0,0)"),r.globalAlpha=s,r.fillStyle=o,r.fillRect(t-n,e-n,n*2,n*2),r.globalAlpha=1}function Dc(r,t,e,n,i){r.fillStyle="rgba(230,235,255,0.8)";for(let s=0;s<n;s++){let o=i()*1.4+.3;r.globalAlpha=.3+i()*.7,r.fillRect(i()*t,i()*e,o,o)}r.globalAlpha=1}function gd(r,t,e,n,i,s,o,a=[]){let l=r.createLinearGradient(0,n,0,e);l.addColorStop(0,i),l.addColorStop(1,s),r.fillStyle=l,r.fillRect(0,n,t,e-n);for(let c of a)for(let h=0;h<40;h++){let u=n+2+Math.pow(o(),1.4)*(e-n),d=(c.w||20)*(.4+o()*1.2)*(1+(u-n)/(e-n));r.globalAlpha=(.15+o()*.5)*(1-(u-n)/(e-n)*.7),r.fillStyle=c.c,r.fillRect(c.x-d/2+(o()-.5)*10,u,d,Math.max(1,e*.003))}r.globalAlpha=1}function Mo(r,t,e,n,i,s,o,a,l=.5,c="255,196,130"){let h=n/s,u=i/o;for(let d=0;d<o;d++)for(let f=0;f<s;f++){let _=a()<l;r.fillStyle=_?`rgba(${c},${.55+a()*.45})`:"rgba(30,40,60,0.55)",r.fillRect(t+f*h+h*.12,e+d*u+u*.18,h*.76,u*.62)}}function i0(r,t,e,n,i){r.fillStyle=i,r.strokeStyle=i,r.lineWidth=n*.05,r.beginPath(),r.moveTo(t,e),r.quadraticCurveTo(t+n*.05,e-n*.5,t-n*.02,e-n*.75),r.stroke();let s=[[0,-.85,.55,.16],[-.35,-.8,.35,.12],[.38,-.78,.38,.12],[.1,-.95,.4,.12],[-.15,-.72,.3,.09]];for(let[o,a,l,c]of s)r.beginPath(),r.ellipse(t+o*n,e+a*n,l*n,c*n,0,0,Math.PI*2),r.fill()}var r0={tower(r,t,e,n){let i=e*.66;wa(r,t,e,[[0,"#0b1022"],[.5,"#3a2c4a"],[.82,"#c46a4e"],[1,"#f0a46a"]],i),Dc(r,t,i*.5,60,n),yo(r,t*.22,i,t*.45,"rgba(255,170,110,0.55)");let s=t*.17,o=t*.56,a=e*.58;r.fillStyle="#121726",r.fillRect(o,i-a,s,a),r.fillStyle="rgba(255,190,140,0.18)",r.fillRect(o,i-a,s*.18,a),Mo(r,o+s*.05,i-a+8,s*.9,a-12,6,30,n,.5),r.fillStyle="#c9a56b",r.fillRect(o-2,i-a-3,s+4,3),r.fillStyle="#0e1220",r.fillRect(o+s+t*.04,i-a*.45,t*.1,a*.45),Mo(r,o+s+t*.045,i-a*.45+6,t*.09,a*.45-8,4,12,n,.35),r.fillStyle="#0a0d16",r.fillRect(0,i-e*.04,t,e*.04),gd(r,t,e,i,"#3a2a3c","#0a0d18",n,[{x:o+s/2,c:"#ffc48a",w:s*.6},{x:t*.22,c:"#ffb27a",w:t*.2}])},villa(r,t,e,n){let i=e*.62;wa(r,t,e,[[0,"#0d1530"],[.6,"#2b3a62"],[1,"#8c7a8e"]],i),Dc(r,t,i*.6,80,n),r.fillStyle="#1a2236",r.beginPath(),r.moveTo(0,i),r.quadraticCurveTo(t*.3,i-e*.05,t*.6,i-e*.02),r.lineTo(t,i-e*.04),r.lineTo(t,i),r.fill(),r.fillStyle="#0b0f19",r.fillRect(0,i,t,e-i);let s=t*.12,o=i-e*.02,a=t*.76;r.fillStyle="#20242c",r.fillRect(s-t*.04,o-e*.16,a+t*.08,e*.025);let l=r.createLinearGradient(0,o-e*.135,0,o);l.addColorStop(0,"#ffd39a"),l.addColorStop(1,"#c7834a"),r.fillStyle=l,r.fillRect(s,o-e*.135,a*.62,e*.135),r.fillStyle="#151922",r.fillRect(s+a*.62,o-e*.135,a*.38,e*.135),r.fillStyle="rgba(10,12,18,0.7)";for(let h=1;h<6;h++)r.fillRect(s+a*.62/6*h,o-e*.135,2,e*.135);yo(r,s+a*.3,o-e*.05,t*.35,"rgba(255,190,120,0.35)");let c=r.createLinearGradient(0,o+e*.03,0,o+e*.1);c.addColorStop(0,"#6fe0ff"),c.addColorStop(1,"#1e7fa6"),r.fillStyle=c,r.fillRect(s+a*.05,o+e*.035,a*.7,e*.06),yo(r,s+a*.4,o+e*.06,t*.3,"rgba(111,224,255,0.25)"),i0(r,t*.8,i+e*.02,e*.45,"#070a10"),i0(r,t*.06,i+e*.03,e*.3,"#080b12")},residences(r,t,e,n){let i=e*.7;wa(r,t,e,[[0,"#0a1226"],[.55,"#24365e"],[1,"#6e86a8"]],i),yo(r,t*.78,e*.2,t*.12,"rgba(230,235,255,0.9)",.6),r.fillStyle="#e9ecf6",r.beginPath(),r.arc(t*.78,e*.2,t*.025,0,Math.PI*2),r.fill(),Dc(r,t,i*.6,60,n),r.fillStyle="#0b0f18",r.fillRect(0,i,t,e-i);let s=[[.1,.28,.32],[.3,.42,.3],[.55,.34,.28]];for(let[o,a,l]of s){let c=t*o,h=i-e*a,u=t*l;r.fillStyle="#1a2232",r.fillRect(c,h,u,e*a);let d=Math.round(a*26);for(let f=0;f<d;f++){let _=h+e*a/d*f;r.fillStyle="#c9c2b3",r.globalAlpha=.5,r.fillRect(c-6,_,u+12,2),r.globalAlpha=1}Mo(r,c+4,h+4,u-8,e*a-6,7,d,n,.45)}for(let o=0;o<9;o++)r.fillStyle="#070a10",r.beginPath(),r.ellipse(t*(.05+o*.11),i+2,t*.06,e*.05,0,0,Math.PI*2),r.fill()},promovida(r,t,e,n){let i=e*.64;wa(r,t,e,[[0,"#0c0f1e"],[.5,"#2c2846"],[.85,"#a0566a"],[1,"#e08a6a"]],i),yo(r,t*.8,i,t*.4,"rgba(255,150,110,0.45)");let s=t*.2,o=t*.42,a=e*.42,l=i-a;r.fillStyle="#171c2a",r.fillRect(s,l,o,a);let c=12,h=6;for(let u=0;u<c;u++)r.fillStyle="#d8d1c2",r.globalAlpha=.6,r.fillRect(s-4,l+a/c*u,o+8,2.5),r.globalAlpha=1;Mo(r,s+3,l+3,o-6,a-4,h,c,n,.5),r.fillStyle="#11151f",r.fillRect(s+o+t*.02,i-a*.6,t*.16,a*.6),Mo(r,s+o+t*.025,i-a*.6+4,t*.15,a*.6-6,4,8,n,.4),gd(r,t,e,i,"#2a2440","#080b14",n,[{x:s+o/2,c:"#ffc48a",w:o*.5},{x:t*.8,c:"#ff9e7a",w:t*.2}]),r.strokeStyle="#0a0c14",r.lineWidth=Math.max(1,t*.004);for(let u=0;u<6;u++){let d=t*(.08+u*.16+n()*.04),f=e*(.1+n()*.12);r.beginPath(),r.moveTo(d,i+e*.06),r.lineTo(d,i+e*.06-f),r.stroke(),r.fillStyle="#0a0c14",r.fillRect(d-t*.03,i+e*.055,t*.06,e*.012)}},ledger(r,t,e,n){let i=r.createLinearGradient(0,0,t,e);i.addColorStop(0,"#0d1220"),i.addColorStop(1,"#05070d"),r.fillStyle=i,r.fillRect(0,0,t,e),r.strokeStyle="rgba(236,230,217,0.06)",r.lineWidth=1;let s=Math.max(24,t/18);for(let a=0;a<t;a+=s)r.beginPath(),r.moveTo(a,0),r.lineTo(a,e),r.stroke();for(let a=0;a<e;a+=s)r.beginPath(),r.moveTo(0,a),r.lineTo(t,a),r.stroke();r.font=`${Math.max(10,t*.018)}px "IBM Plex Mono", monospace`;for(let a=0;a<70;a++)r.fillStyle=`rgba(236,230,217,${.05+n()*.15})`,r.fillText((n()*99999).toFixed(2).replace(".",","),Math.floor(n()*12)*s+6,Math.floor(n()*24)*s+s*.6);let o=[["#c9a56b",.004,.62],["rgba(143,216,255,0.7)",.0025,.72],["rgba(236,230,217,0.4)",.0015,.8]];for(let[a,l,c]of o){r.strokeStyle=a,r.lineWidth=Math.max(1.2,t*l),r.beginPath();let h=e*c;for(let u=0;u<=t;u+=t/40)h-=(n()-.32)*e*.03,r.lineTo(u,h);r.stroke()}yo(r,t*.7,e*.35,t*.5,"rgba(201,165,107,0.18)")},skyline(r,t,e,n){let i=e*.6;wa(r,t,e,[[0,"#05070e"],[.6,"#1c2140"],[1,"#7a4a4a"]],i),Dc(r,t,i*.7,120,n);let s=0;for(;s<t;){let o=t*(.03+n()*.06),a=e*(.06+Math.pow(n(),2)*.32);r.fillStyle="#0d111c",r.fillRect(s,i-a,o,a),Mo(r,s+1,i-a+2,o-2,a-2,Math.max(2,Math.round(o/9)),Math.max(3,Math.round(a/10)),n,.35),s+=o+t*.004}r.fillStyle="#ffc27a";for(let o=0;o<80;o++){let a=o/80*t;r.globalAlpha=.9,r.fillRect(a,i+2+Math.sin(o*.2)*3,2,2)}r.globalAlpha=1,gd(r,t,e,i+6,"#1a1a2e","#05070d",n,Array.from({length:8},(o,a)=>({x:t*(a+.5)/8,c:"#ffcf95",w:t*.05})))}};function Ta(r,t,e=7,n){let{ctx:i,w:s,h:o}=C1(r);if(i.clearRect(0,0,s,o),(r0[t]||r0.tower)(i,s,o,A1(e)),n){let a=new Image;a.crossOrigin="anonymous",a.onload=()=>{let l=Math.max(s/a.width,o/a.height);i.drawImage(a,(s-a.width*l)/2,(o-a.height*l)/2,a.width*l,a.height*l)},a.src=n}}he.registerPlugin(kt);var vt=(r,t=document)=>t.querySelector(r),Zn=(r,t=document)=>[...t.querySelectorAll(r)],en=window.matchMedia("(prefers-reduced-motion: reduce)").matches,R1=window.matchMedia("(hover: hover) and (pointer: fine)").matches,Nc=r=>"USD "+Math.round(r).toLocaleString("es-UY"),So=r=>r>=1e6?`USD ${(r/1e6).toLocaleString("es-UY",{maximumFractionDigits:2})} M`:Nc(r),s0=(r,t=1)=>r.toLocaleString("es-UY",{minimumFractionDigits:t,maximumFractionDigits:t})+"%",nr=null;en||(nr=new Ml({duration:1.15,easing:r=>Math.min(1,1.001-Math.pow(2,-10*r)),smoothWheel:!0}),nr.on("scroll",kt.update),he.ticker.add(r=>nr.raf(r*1e3)),he.ticker.lagSmoothing(0));function h0(r,t=0){if(nr)nr.scrollTo(r,{offset:t,duration:1.6});else{let e=typeof r=="number"?r:r.getBoundingClientRect().top+window.scrollY+t;window.scrollTo({top:e,behavior:en?"auto":"smooth"})}}Zn('a[href^="#"]').forEach(r=>r.addEventListener("click",t=>{let e=r.getAttribute("href");if(e.length<2)return;let n=vt(e);n&&(t.preventDefault(),Td(),h0(e==="#inicio"?0:n))}));var Pa=null;try{Pa=n0(vt("#scene"))}catch{vt("#scene").remove()}function P1(r){let t=e=>{[...e.childNodes].forEach(n=>{if(n.nodeType===3){let i=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(s=>{if(!s)return;if(/^\s+$/.test(s)){i.appendChild(document.createTextNode(" "));return}let o=document.createElement("span");o.className="rl",o.style.display="inline-block";let a=document.createElement("span");a.textContent=s,o.appendChild(a),i.appendChild(o)}),n.replaceWith(i)}else n.nodeType===1&&t(n)})};return t(r),Zn(".rl > span",r)}Zn(".reveal-lines").forEach(r=>{let t=P1(r);en||he.from(t,{yPercent:115,rotate:4,duration:1.2,ease:"expo.out",stagger:.06,scrollTrigger:{trigger:r,start:"top 85%"}})});var Ca=vt("#loader");function I1(){he.timeline().to(Ca,{clipPath:"inset(0 0 100% 0)",duration:1.1,ease:"expo.inOut"}).add(()=>{Ca.classList.add("is-done"),Ca.hidden=!0,document.body.classList.remove("is-loading"),kt.refresh()}).from(".hero__title .word",{yPercent:110,duration:1.4,ease:"expo.out",stagger:.12},"-=0.45").from(".hero__meta, .hero__lead, .hero__ctas, .hero__scroll",{y:24,opacity:0,duration:1,ease:"expo.out",stagger:.08},"-=1.0").from("#nav",{yPercent:-100,opacity:0,duration:1,ease:"expo.out"},"-=1.1")}if(en)Ca.hidden=!0,document.body.classList.remove("is-loading");else{Ca.style.clipPath="inset(0 0 0% 0)";let r={v:0},t=document.fonts?document.fonts.ready:Promise.resolve(),e=new Promise(n=>setTimeout(n,1500));he.to(r,{v:92,duration:1.4,ease:"power2.inOut",onUpdate:()=>{vt("#loaderCount").textContent=String(Math.round(r.v)).padStart(3,"0"),vt("#loaderBar").style.width=r.v+"%"}}),Promise.race([Promise.all([t,e]),new Promise(n=>setTimeout(n,3500))]).then(()=>{he.to(r,{v:100,duration:.4,ease:"power1.out",onUpdate:()=>{vt("#loaderCount").textContent=String(Math.round(r.v)).padStart(3,"0"),vt("#loaderBar").style.width=r.v+"%"},onComplete:I1})})}var xd=vt("#nav"),L1=vt(".wa"),Ra=vt("#burger"),Ia=vt("#menu"),o0=0;kt.create({start:0,end:"max",onUpdate:r=>{let t=r.scroll();xd.classList.toggle("is-scrolled",t>40),L1.classList.toggle("is-on",t>window.innerHeight*.7),xd.classList.toggle("is-hidden",t>o0&&t>400&&Ia.hidden),o0=t,vt("#progressBar").style.transform=`scaleX(${r.progress})`}});kt.create({trigger:"#proyectos",start:"top 60px",end:"bottom 60px",toggleClass:{targets:xd,className:"on-light"}});function Td(){Ia.hidden||(Ia.hidden=!0,Ra.setAttribute("aria-expanded","false"),Ra.setAttribute("aria-label","Abrir men\xFA"),nr&&nr.start())}Ra.addEventListener("click",()=>{if(!Ia.hidden)return Td();Ia.hidden=!1,Ra.setAttribute("aria-expanded","true"),Ra.setAttribute("aria-label","Cerrar men\xFA"),nr&&nr.stop(),en||he.from("#menu a",{yPercent:60,opacity:0,duration:.8,ease:"expo.out",stagger:.05})});document.addEventListener("keydown",r=>{r.key==="Escape"&&Td()});if(R1&&!en){let r=vt("#cursor"),t=vt("#cursorLabel"),e=he.quickTo(r,"x",{duration:.35,ease:"power3"}),n=he.quickTo(r,"y",{duration:.35,ease:"power3"});window.addEventListener("pointermove",i=>{r.classList.add("is-on"),e(i.clientX),n(i.clientY)},{passive:!0}),document.addEventListener("pointerleave",()=>r.classList.remove("is-on")),Zn("[data-cursor]").forEach(i=>{i.addEventListener("pointerenter",()=>{t.textContent=i.dataset.cursor,r.classList.add("is-big")}),i.addEventListener("pointerleave",()=>r.classList.remove("is-big"))}),Zn("[data-magnetic]").forEach(i=>{let s=he.quickTo(i,"x",{duration:.6,ease:"elastic.out(1, 0.4)"}),o=he.quickTo(i,"y",{duration:.6,ease:"elastic.out(1, 0.4)"});i.addEventListener("pointermove",a=>{let l=i.getBoundingClientRect();s((a.clientX-l.left-l.width/2)*.3),o((a.clientY-l.top-l.height/2)*.4)}),i.addEventListener("pointerleave",()=>{s(0),o(0)})})}var xs=Zn(".floor"),D1=xs.map(r=>+r.dataset.level),Uc=0;function U1(r){if(r===Uc)return;let t=xs[Uc],e=xs[r],n=r>Uc?1:-1;t.classList.remove("is-active"),e.classList.add("is-active"),he.to(t,{opacity:0,y:-40*n,filter:"blur(6px)",duration:.6,ease:"power3.out",overwrite:!0}),he.fromTo(e,{opacity:0,y:50*n,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1,ease:"expo.out",overwrite:!0}),Uc=r}he.set(xs,{opacity:0,yPercent:-50});he.set(xs[0],{opacity:1});var N1=vt("#levelNum"),O1=vt("#railDot"),yd={v:0},a0=0;function Md(){let r=Math.round(yd.v);N1.textContent=r===0?"PB":String(r).padStart(2,"0")}function F1(r){if(r!==a0){if(a0=r,en){yd.v=r,Md();return}he.to(yd,{v:r,duration:1.1,ease:"power3.out",onUpdate:Md,overwrite:!0})}}Md();kt.create({trigger:"#hero",start:"top top",endTrigger:"#ascend",end:"bottom bottom",onUpdate:r=>Pa&&Pa.setProgress(r.progress)});kt.create({trigger:"#ascend",start:"top top",end:"bottom bottom",onUpdate:r=>{let t=r.progress;O1.style.bottom=`calc(${t*100}% - 4px)`;let e=Math.min(xs.length-1,Math.floor(t*xs.length*.999));U1(e),F1(D1[e])}});kt.create({trigger:".paths",start:"top bottom",end:"top top",onUpdate:r=>{let t=1-r.progress;vt("#scene").style.opacity=t,vt(".scene-veil").style.opacity=t,Pa&&Pa.setVisible(t>.01)}});function u0(){Zn(".path__art").forEach((r,t)=>Ta(r,r.dataset.art,11+t))}u0();Zn(".service").forEach(r=>{let t=vt(".service__row",r);t.addEventListener("click",()=>{let e=!r.classList.contains("is-open");Zn(".service.is-open").forEach(n=>{n!==r&&(n.classList.remove("is-open"),vt(".service__row",n).setAttribute("aria-expanded","false"))}),r.classList.toggle("is-open",e),t.setAttribute("aria-expanded",String(e))})});en||he.from(".service",{y:40,opacity:0,duration:1,ease:"expo.out",stagger:.08,scrollTrigger:{trigger:".services",start:"top 85%"}});var B1={c:{r:.04,vol:.04,mix:[["Renta fija",70],["Acciones globales",15],["Real estate",10],["Liquidez",5]]},m:{r:.065,vol:.09,mix:[["Renta fija",45],["Acciones globales",35],["Real estate",15],["Liquidez",5]]},d:{r:.09,vol:.15,mix:[["Renta fija",20],["Acciones globales",60],["Real estate",17],["Liquidez",3]]}},Ur={cap:vt("#simCap"),monthly:vt("#simMonthly"),years:vt("#simYears")},Ea=vt("#simChart"),Sd={t:1},Dr=null;function z1(r){r.style.setProperty("--fill",(r.value-r.min)/(r.max-r.min)*100+"%")}function k1(){let r=B1[vt('input[name="profile"]:checked').value],t=+Ur.cap.value,e=+Ur.monthly.value,n=+Ur.years.value,i=Math.pow(1+r.r,1/12)-1,s=[],o=t,a=t;s.push({t:0,v:o,c:a,lo:o,hi:o});for(let l=1;l<=n*12;l++)if(o=o*(1+i)+e,a+=e,l%3===0||l===n*12){let c=l/12,h=1.28*r.vol*Math.sqrt(c);s.push({t:c,v:o,c:a,lo:o*Math.exp(-h),hi:o*Math.exp(h*.9)})}return{pts:s,final:o,contrib:a,yrs:n,p:r}}function Oc(r=!0){Object.values(Ur).forEach(z1),vt("#simCapOut").textContent=Nc(+Ur.cap.value),vt("#simMonthlyOut").textContent=Nc(+Ur.monthly.value),vt("#simYearsOut").textContent=Ur.years.value+(Ur.years.value==="1"?" a\xF1o":" a\xF1os"),Dr=k1(),vt("#kpiFinal").textContent=So(Dr.final),vt("#kpiContrib").textContent=So(Dr.contrib),vt("#kpiGain").textContent="+"+So(Dr.final-Dr.contrib),vt("#simMix").innerHTML=Dr.p.mix.map(([t,e])=>`<div><dt>${t}</dt><dd>${e}%</dd><span class="bar"><i style="width:${e}%"></i></span></div>`).join(""),r&&!en?(Sd.t=0,he.to(Sd,{t:1,duration:1.1,ease:"expo.out",onUpdate:bd,overwrite:!0})):bd()}function bd(){if(!Dr)return;let r=Math.min(window.devicePixelRatio||1,2),t=Ea.clientWidth,e=Ea.clientHeight;Ea.width=t*r,Ea.height=e*r;let n=Ea.getContext("2d");n.setTransform(r,0,0,r,0,0),n.clearRect(0,0,t,e);let i={l:8,r:64,t:16,b:26},{pts:s,yrs:o}=Dr,a=Math.max(...s.map(p=>p.hi))*1.05,l=p=>i.l+p/o*(t-i.l-i.r),c=p=>e-i.b-p/a*(e-i.t-i.b),h=Math.max(2,Math.ceil(s.length*Sd.t)),u=s.slice(0,h);n.font='11px "IBM Plex Mono", monospace',n.fillStyle="rgba(138,146,163,1)",n.strokeStyle="rgba(236,230,217,0.08)",n.lineWidth=1;let d=4;for(let p=1;p<=d;p++){let m=a/d*p,S=Math.round(c(m))+.5;n.beginPath(),n.moveTo(i.l,S),n.lineTo(t-i.r+6,S),n.stroke(),n.fillText(m>=1e6?(m/1e6).toFixed(1)+"M":Math.round(m/1e3)+"k",t-i.r+12,S+4)}let f=o<=10?o<=5?1:2:5;for(let p=0;p<=o;p+=f)n.fillText(p===0?"Hoy":"A"+p,l(p)-(p===0?0:8),e-6);n.beginPath(),u.forEach((p,m)=>m?n.lineTo(l(p.t),c(p.hi)):n.moveTo(l(p.t),c(p.hi))),[...u].reverse().forEach(p=>n.lineTo(l(p.t),c(p.lo))),n.closePath();let _=n.createLinearGradient(0,i.t,0,e);_.addColorStop(0,"rgba(201,165,107,0.38)"),_.addColorStop(1,"rgba(201,165,107,0.04)"),n.fillStyle=_,n.fill(),n.setLineDash([4,5]),n.strokeStyle="rgba(138,146,163,0.9)",n.lineWidth=1.2,n.beginPath(),u.forEach((p,m)=>m?n.lineTo(l(p.t),c(p.c)):n.moveTo(l(p.t),c(p.c))),n.stroke(),n.setLineDash([]),n.strokeStyle="#e6c88f",n.lineWidth=2,n.beginPath(),u.forEach((p,m)=>m?n.lineTo(l(p.t),c(p.v)):n.moveTo(l(p.t),c(p.v))),n.stroke();let g=u[u.length-1];n.fillStyle="#06080f",n.strokeStyle="#e6c88f",n.lineWidth=2,n.beginPath(),n.arc(l(g.t),c(g.v),5,0,Math.PI*2),n.fill(),n.stroke(),n.fillStyle="rgba(230,200,143,0.25)",n.beginPath(),n.arc(l(g.t),c(g.v),11,0,Math.PI*2),n.fill()}vt("#simForm").addEventListener("input",()=>Oc(!1));Zn('input[name="profile"]').forEach(r=>r.addEventListener("change",()=>Oc(!0)));Oc(!1);kt.create({trigger:".sim",start:"top 75%",once:!0,onEnter:()=>Oc(!0)});var ir=[{name:"Torre Mirador",place:"Punta del Este \xB7 Playa Brava",type:"tower",lat:[34,57,46],lng:"54\xB056\u203202\u2033O",desc:"Departamentos frente al mar con amenities de hotel. Alta demanda de alquiler en temporada y valorizaci\xF3n sostenida.",facts:[["Desde","USD 390.000"],["Renta bruta est.","5 \u2013 6% anual"],["Unidades","2 a 4 dormitorios"],["Entrega","2028"]]},{name:"Chacra Laguna",place:"Jos\xE9 Ignacio \xB7 Laguna Garz\xF3n",type:"villa",lat:[34,48,21],lng:"54\xB035\u203240\u2033O",desc:"Villas de autor sobre lotes de 5 hect\xE1reas entre laguna y oc\xE9ano. Un activo escaso pensado para preservar capital.",facts:[["Desde","USD 1.200.000"],["Perfil","Plusval\xEDa largo plazo"],["Superficie","Lotes de 5 ha"],["Estado","Preventa"]]},{name:"Residencias Carrasco",place:"Montevideo \xB7 Carrasco",type:"residences",lat:[34,53,9],lng:"56\xB003\u203218\u2033O",desc:"Edificio boutique de baja altura a metros de la rambla, para vivir o alquilar a ejecutivos y familias.",facts:[["Desde","USD 520.000"],["Renta bruta est.","4,5 \u2013 5,5% anual"],["Unidades","3 y 4 dormitorios"],["Entrega","2027"]]},{name:"Puerto Buceo",place:"Montevideo \xB7 Vivienda promovida",type:"promovida",lat:[34,54,32],lng:"56\xB007\u203244\u2033O",desc:"Proyecto bajo la Ley 18.795 con exoneraciones tributarias sobre la renta. Ticket accesible y demanda de alquiler estable.",facts:[["Desde","USD 145.000"],["Renta bruta est.","6 \u2013 7% anual"],["Beneficio","Exoneraciones 10 a\xF1os"],["Entrega","Inmediata"]]}],wd=vt("#orbA"),H1=vt("#orbB"),Aa=wd,vs=-1;vt("#estTot").textContent=String(ir.length).padStart(2,"0");vt("#estIndex").innerHTML=ir.map((r,t)=>`<li><button type="button" data-i="${t}" aria-current="false">${String(t+1).padStart(2,"0")} \xB7 ${r.name}</button></li>`).join("");var V1=([r,t,e])=>`${r}\xB0${String(t).padStart(2,"0")}\u2032${String(e).padStart(2,"0")}\u2033S`,_d;function G1(r){let t=vt("#estCoords"),e=`${V1(r.lat)} \xB7 ${r.lng}`;if(en){t.textContent=e;return}_d&&_d.kill();let n={p:0};_d=he.to(n,{p:1,duration:.9,ease:"power2.out",onUpdate:()=>{let i=Math.floor(e.length*n.p);t.textContent=e.split("").map((s,o)=>o<i||!/\d/.test(s)?s:Math.floor(Math.random()*10)).join("")}})}function f0(r){if(r===vs)return;let t=r>vs?1:-1;vs=r;let e=ir[r],n=Aa===wd?H1:wd;Ta(n,e.type,21+r,e.img),n.style.zIndex=2,Aa.style.zIndex=1,n.classList.remove("is-on"),n.offsetWidth,n.classList.add("is-on");let i=Aa;setTimeout(()=>i.classList.remove("is-on"),1200),Aa=n,en||he.fromTo(n,{scale:1.25,rotate:-8*t},{scale:1,rotate:0,duration:1.4,ease:"expo.out"});let s=[vt("#estPlace"),vt("#estName"),vt("#estDesc"),vt("#estFacts")],o=()=>{vt("#estPlace").textContent=e.place,vt("#estName").textContent=e.name,vt("#estDesc").textContent=e.desc,vt("#estFacts").innerHTML=e.facts.map(([a,l])=>`<div><dt>${a}</dt><dd>${l}</dd></div>`).join("")};en?o():he.timeline().to(s,{y:-20*t,opacity:0,duration:.3,ease:"power2.in",stagger:.03}).add(o).fromTo(s,{y:26*t,opacity:0},{y:0,opacity:1,duration:.8,ease:"expo.out",stagger:.06}),G1(e),vt("#estCur").textContent=String(r+1).padStart(2,"0"),Zn("#estIndex button").forEach((a,l)=>a.setAttribute("aria-current",String(l===r)))}var vd=kt.create({trigger:"#proyectos",start:"top top",end:"bottom bottom",onUpdate:r=>{f0(Math.min(ir.length-1,Math.floor(r.progress*ir.length*.999))),he.set(".orb__ring",{rotate:r.progress*120}),he.set(".orb__diag",{rotate:-38+r.progress*10})}});f0(0);function Ed(r){r=(r+ir.length)%ir.length;let t=vd.end-vd.start;h0(vd.start+t*((r+.5)/ir.length))}vt("#estPrev").addEventListener("click",()=>Ed(vs-1));vt("#estNext").addEventListener("click",()=>Ed(vs+1));vt("#estIndex").addEventListener("click",r=>{let t=r.target.closest("button");t&&Ed(+t.dataset.i)});function d0(){Ta(vt("#uyArt"),"villa",5)}d0();en||(he.from(".uy__grid i",{scaleY:0,duration:1.6,ease:"expo.inOut",stagger:.08,scrollTrigger:{trigger:".uy",start:"top 70%"}}),he.fromTo("#uyArt",{scale:1.15},{scale:1,ease:"none",scrollTrigger:{trigger:".uy",start:"top bottom",end:"bottom top",scrub:!0}}));Zn("[data-count]").forEach(r=>{let t=+r.dataset.count,e=r.dataset.suffix||"",n=s=>r.innerHTML=Math.round(s)+(e?`<small>${e}</small>`:"");if(n(t),en||t===0)return;let i={v:0};kt.create({trigger:r,start:"top 85%",once:!0,onEnter:()=>he.to(i,{v:t,duration:2,ease:"expo.out",onUpdate:()=>n(i.v)})})});en||he.from(".cell",{y:50,opacity:0,duration:1.2,ease:"expo.out",stagger:.1,scrollTrigger:{trigger:".uy__cells",start:"top 85%"}});var W1=["roiPrice","roiRent","roiCost","roiApp","roiYears"];function p0(){let[r,t,e,n,i]=W1.map(f=>Math.max(0,parseFloat(vt("#"+f).value)||0)),s=Math.min(25,Math.max(1,Math.round(i))),o=t*12*(1-Math.min(e,100)/100),a=(parseFloat(vt("#roiApp").value)||0)/100,l=r*Math.pow(1+a,s),c=o*s+(l-r);vt("#roiNet").textContent=Nc(o),vt("#roiCap").textContent=r?s0(o/r*100):"\u2014",vt("#roiFv").textContent=So(l),vt("#roiTotal").textContent=(c>=0?"+":"")+So(c)+(r?` \xB7 ${s0(c/r*100,0)}`:"");let h=Array.from({length:s},(f,_)=>{let g=_+1;return{y:g,r:o*g,a:Math.max(0,r*Math.pow(1+a,g)-r)}}),u=Math.max(1,...h.map(f=>f.r+f.a)),d=vt("#roiBars");d.children.length!==s&&(d.innerHTML=h.map(f=>`<div class="roi__bar"><i class="r" style="height:0"></i><i class="a" style="height:0"></i><b>A${f.y}</b><span class="tip"></span></div>`).join("")),[...d.children].forEach((f,_)=>{let g=h[_];f.children[0].style.height=g.r/u*100+"%",f.children[1].style.height=g.a/u*100+"%",f.querySelector(".tip").textContent=`A\xF1o ${g.y}: ${So(g.r+g.a)}`})}vt("#roiForm").addEventListener("input",p0);p0();var m0=vt("#processTrack");function X1(){return Math.max(0,m0.scrollWidth-window.innerWidth)}he.to(m0,{x:()=>-X1(),ease:"none",scrollTrigger:{trigger:"#proceso",start:"top top",end:"bottom bottom",scrub:en?!0:.6,invalidateOnRefresh:!0}});var Y1=vt("#contactForm"),l0={email:"hola@altura.uy",wa:"59899000000"};Y1.addEventListener("submit",r=>{r.preventDefault();let t=vt("#formErr"),e=vt("#cName").value.trim(),n=vt("#cEmail").value.trim(),i=Zn('input[name="interes"]:checked').map(a=>a.value);if(!e){t.textContent="Escrib\xED tu nombre para que sepamos a qui\xE9n responder.",vt("#cName").focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){t.textContent="Revis\xE1 el email: parece incompleto.",vt("#cEmail").focus();return}if(!i.length){t.textContent="Eleg\xED al menos un \xE1rea de inter\xE9s.";return}t.textContent="";let s=`Hola, soy ${e} (${n}).
Me interesa: ${i.join(", ")}.
Capital: ${vt("#cTicket").value}.
${vt("#cMsg").value.trim()}`;vt("#sendWa").href=`https://wa.me/${l0.wa}?text=${encodeURIComponent(s)}`,vt("#sendMail").href=`mailto:${l0.email}?subject=${encodeURIComponent("Consulta desde la web")}&body=${encodeURIComponent(s)}`;let o=vt("#formDone");o.hidden=!1,en||he.from(o,{y:20,opacity:0,duration:.8,ease:"expo.out"})});vt("#year").textContent=new Date().getFullYear();en||he.from(".footer__word",{yPercent:40,opacity:0,duration:1.6,ease:"expo.out",scrollTrigger:{trigger:".footer",start:"top 90%"}});var c0;window.addEventListener("resize",()=>{clearTimeout(c0),c0=setTimeout(()=>{u0(),d0(),bd();let r=ir[vs];Ta(Aa,r.type,21+vs,r.img),kt.refresh()},200)});window.addEventListener("load",()=>kt.refresh());})();
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
