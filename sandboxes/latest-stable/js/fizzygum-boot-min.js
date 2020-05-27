var BUILDFLAG_LOAD_TESTS,MixedClassKeywords,addLineToLogDiv,addLogDiv,arrayShallowCopy,arrayShallowCopyAndReverse,boot,compileFGCode,compileSource,createImageFromImageData,createWorldAndStartStepping,decamelize,degreesToRadians,emptyLogDiv,extend,fontHeight,generateInclusionOrder,generate_inclusion_order,getDocumentPositionOf,getMinimumFontHeight,getParameterByName,getRandomInt,hashCode,howManySourcesCompiledAndEvalled,howManyTestManifestsLoaded,isFunction,isObject,isString,loadJSFile,loadJSFilesWithCoffeescriptSources,loadSourcesAndPotentiallyCompileThem,morphicVersion,newCanvas,nil,noOperation,nop,radiansToDegrees,removeLogDiv,sizeOf,tick,trackChanges,uniqueKeepOrder,untick,visit,waitNextTurn,world,indexOf=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},hasProp={}.hasOwnProperty;BUILDFLAG_LOAD_TESTS=!1,world={},window.srcLoadsSteps=[],window.srcLoadCompileDebugWrites=!1,MixedClassKeywords=["onceAddedClassProperties","included"],nil=void 0,HTMLCanvasElement.prototype.deepCopy=function(e,t,n,o){var i,r,s;return(r=t.indexOf(this))>=0?e?"$"+r:n[r]:(s=t.length,t.push(this),(i=newCanvas(new Point(this.width,this.height))).getContext("2d").drawImage(this,0,0),e&&(i={}),n.push(i),e?(i.className="Canvas",i.width=this.width,i.height=this.height,i.data=this.toDataURL(),"$"+s):i)},CanvasRenderingContext2D.prototype.rebuildDerivedValue=function(e,t){return e[t]=e[t.replace("Context","")].getContext("2d")},CanvasGradient.prototype.deepCopy=function(e,t,n,o){var i,r,s;return(r=t.indexOf(this))>=0?e?"$"+r:n[r]:(s=t.length,t.push(this),i=nil,n.push(i),e?"$"+s:i)},Date.prototype.deepCopy=function(e,t,n,o){var i,r,s;return(r=t.indexOf(this))>=0?e?"$"+r:n[r]:(s=t.length,t.push(this),i=new Date(this.getTime()),n.push(i),e?"$"+s:i)},tick="✓ ",untick="    ",void 0===String.prototype.isTicked&&(String.prototype.isTicked=function(){return this.startsWith(tick)}),void 0===String.prototype.tick&&(String.prototype.tick=function(){return this.isTicked()?this:this.isUnticked()?this.toggleTick():tick+this}),void 0===String.prototype.untick&&(String.prototype.untick=function(){return this.startsWith(untick)?this:this.isTicked()?this.toggleTick():untick+this}),void 0===String.prototype.isUnticked&&(String.prototype.isUnticked=function(){return!this.isTicked()}),void 0===String.prototype.toggleTick&&(String.prototype.toggleTick=function(){return this.isTicked()?this.replace(tick,untick):this.startsWith(untick)?this.replace(untick,tick):tick+this}),CanvasRenderingContext2D.prototype.clipToRectangle=function(e,t,n,o){return this.beginPath(),this.moveTo(Math.round(e),Math.round(t)),this.lineTo(Math.round(e+n),Math.round(t)),this.lineTo(Math.round(e+n),Math.round(t+o)),this.lineTo(Math.round(e),Math.round(t+o)),this.lineTo(Math.round(e),Math.round(t)),this.closePath(),this.clip()},decamelize=function(e,t){if("string"!=typeof e)throw new TypeError("Expected a string");return e.replace(/([a-z\d])([A-Z])/g,"$1"+(t||"_")+"$2").toLowerCase()},getParameterByName=function(e){var t;return e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),null!=(t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search))?decodeURIComponent(t[1].replace(/\+/g," ")):nil},arrayShallowCopy=function(e){return e.concat()},arrayShallowCopyAndReverse=function(e){return e.concat().reverse()},hashCode=function(e){var t,n,o,i;if(t=0,0===e.length)return t;for(n=o=0,i=e.length;0<=i?o<i:o>i;n=0<=i?++o:--o)t=(t<<5)-t+e.charCodeAt(n),t&=t;return t},nop=function(){return function(){return nil}},noOperation=function(){return nil},isFunction=function(e){return"function"==typeof e},sizeOf=function(e){var t,n;for(t in n=0,t=void 0,e)Object.prototype.hasOwnProperty.call(e,t)&&(n+=1);return n},isString=function(e){return"string"==typeof e||e instanceof String},isObject=function(e){return null!=e&&("object"==typeof e||e instanceof Object)},degreesToRadians=function(e){return e*Math.PI/180},radiansToDegrees=function(e){return 180*e/Math.PI},fontHeight=function(e){var t;return t=Math.max(e,WorldMorph.preferencesAndSettings.minimumFontHeight),Math.ceil(1.2*t)},newCanvas=function(e){var t,n;return null!=e&&e.debugIfFloats(),n=e||{x:0,y:0},(t=document.createElement("canvas")).width=Math.ceil(n.x),t.height=Math.ceil(n.y),t},getMinimumFontHeight=function(){var e,t,n,o,i,r,s,a;for("I",50,(e=document.createElement("canvas")).width=50,e.height=50,(t=e.getContext("2d")).font="1px serif",i=Math.ceil(t.measureText("I").width),t.fillStyle="black",t.textBaseline="bottom",t.fillText("I",0,50),a=n=0,50;n<50;a=++n)for(s=o=0,r=i;0<=r?o<r:o>r;s=0<=r?++o:--o)if(0!==t.getImageData(s,a,1,1).data[3])return 50-a+1;return 0},getDocumentPositionOf=function(e){var t,n;if(null==e)return{x:0,y:0};for(n={x:e.offsetLeft,y:e.offsetTop},t=e.offsetParent;null!=t;)n.x+=t.offsetLeft,n.y+=t.offsetTop,t!==document.body&&t!==document.documentElement&&(n.x-=t.scrollLeft,n.y-=t.scrollTop),t=t.offsetParent;return n},howManyTestManifestsLoaded=0,howManySourcesCompiledAndEvalled=0,loadJSFile=function(e,t){return new Promise((function(t,n){var o;return(o=document.createElement("script")).src=e,o.async=!0,o.onload=function(){return addLineToLogDiv("loading "+this.src),srcLoadCompileDebugWrites&&console.log("loading "+this.src),t(o)},document.head.appendChild(o),o.onerror=function(){return n(o)}}))},loadJSFilesWithCoffeescriptSources=function(){var e,t,n,o;for(n=Promise.resolve(),e=t=0,o=numberOfSourceBatches;0<=o?t<o:t>o;e=0<=o?++t:--t)n=(n=n.then(waitNextTurn())).then(loadJSFile("js/sourceCode/sources_batch_"+e+".js"));return n},compileFGCode=function(e,t){var n,o;performance.now();try{n=CoffeeScript.compile(e,{bare:t})}catch(t){throw o="error in compiling:\n",o+=e+"\n",o+="error:\n",o+=t+"\n",new Error(o)}return performance.now(),n},boot=function(){var e;return window.stillLoadingSources=!0,window.ceilPixelRatio=Math.ceil(window.devicePixelRatio),e=[loadJSFile("js/sourceCode/Class_coffeSource.js"),loadJSFile("js/sourceCode/Mixin_coffeSource.js"),loadJSFile("js/sourceCode/sourceCodeManifest.js"),loadJSFile("js/libs/coffee-script_2.0.3.js"),loadJSFile("js/pre-compiled.js"),loadJSFile("js/libs/Mousetrap.min.js")],(BUILDFLAG_LOAD_TESTS||window.location.href.includes("generatePreCompiled"))&&(e.push(loadJSFile("js/libs/FileSaver.min.js")),e.push(loadJSFile("js/libs/jszip.min.js")),e.push(loadJSFile("js/tests/testsManifest.js")),e.push(loadJSFile("js/tests/testsAssetsManifest.js"))),Promise.all(e).then((function(){return window.preCompiled?createWorldAndStartStepping():addLogDiv()})).then((function(){return eval.call(window,compileFGCode(window.Mixin_coffeSource,!0))})).then((function(){return eval.call(window,compileFGCode(window.Class_coffeSource,!0))})).then((function(){return loadJSFilesWithCoffeescriptSources()})).then((function(){return window.preCompiled?loadSourcesAndPotentiallyCompileThem(!0).then((function(){if(window.stillLoadingSources=!1,"undefined"!=typeof Automator&&null!==Automator&&(Automator.testsManifest=testsManifest,Automator.testsAssetsManifest=testsAssetsManifest),null!=getParameterByName("startupActions"))return world.nextStartupAction()})):loadSourcesAndPotentiallyCompileThem(!1).then((function(){if(window.stillLoadingSources=!1,"undefined"!=typeof Automator&&null!==Automator)return Automator.testsManifest=testsManifest,Automator.testsAssetsManifest=testsAssetsManifest})).then((function(){if(createWorldAndStartStepping(),null!=getParameterByName("startupActions"))return world.nextStartupAction()}))}))},visit=function(e,t,n){var o,i,r,s;if(null!=e[t])for(o=0,r=(s=e[t]).length;o<r;o++)i=s[o],indexOf.call(n,i)>=0||visit(e,i,n);if(indexOf.call(n,t)<0)return n.push(t)},generate_inclusion_order=function(e){var t,n;for(n in t=[],e)visit(e,n,t);return srcLoadCompileDebugWrites&&console.log("inclusion_order: "+t),t},waitNextTurn=function(){return function(){return window.preCompiled?new Promise((function(e,t){return window.srcLoadsSteps.push(e)})):new Promise((function(e,t){return setTimeout((function(){return e(arguments)}),1)}))}},generateInclusionOrder=function(){var e,t,n,o,i,r,s,a,l,u;for(o=[],n=/\sREQUIRES\s*(\w+)/,t=/\sextends\s*(\w+)/,e=/\s\w+:\s*new\s*(\w+)/,/\s*class\s+(\w+)/,/'''/,s=0,a=sourcesManifests.length;s<a;s++)if("Class"!==(i=(i=sourcesManifests[s]).replace("_coffeSource",""))&&"Mixin"!==i)for(srcLoadCompileDebugWrites&&console.log(i+" - "),o[i]=[],window[i+"_coffeSource"],l=window[i+"_coffeSource"].split("\n"),r=0;r<l.length;)null!=(u=l[r].match(t))&&(o[i].push(u[1]),srcLoadCompileDebugWrites&&console.log(i+" extends "+u[1])),null!=(u=l[r].match(n))&&(o[i].push(u[1]),srcLoadCompileDebugWrites&&console.log(i+" requires "+u[1])),null!=(u=l[r].match(e))&&(o[i].push(u[1]),srcLoadCompileDebugWrites&&console.log(i+" has class init in instance variable "+u[1])),r++;return generate_inclusion_order(o)},loadSourcesAndPotentiallyCompileThem=function(e){var t,n,o,i,r,s,a;for(emptyLogDiv(),srcLoadCompileDebugWrites&&console.log("--------------------------------"),i=generateInclusionOrder(),window.hasProp={}.hasOwnProperty,window.indexOf=[].indexOf,window.slice=[].slice,n=function(e,t){return function(){return compileSource(e,t)}},a=Promise.resolve(),r=0,s=i.length;r<s;r++)"Class"!==(o=i[r])&&"Mixin"!==o&&"globalFunctions"!==o&&(t=n(o,e),a=(a=a.then(waitNextTurn())).then(t));return a.then((function(){var e;return window.location.href.includes("generatePreCompiled")&&((e=new JSZip).file("pre-compiled.js","window.preCompiled = true;\n\n"+window.JSSourcesContainer.content),e.generateAsync({type:"blob"}).then((function(e){saveAs(e,"pre-compiled.zip")}))),removeLogDiv()})),a},compileSource=function(e,t){var n,o,i;if(null==window.CS1CompiledClasses&&(window.CS1CompiledClasses=[]),null==window.JSSourcesContainer&&(window.JSSourcesContainer={content:""}),n=window[e+"_coffeSource"],o=performance.now(),srcLoadCompileDebugWrites&&console.log("checking whether "+e+" is already in the system "),/^class[ \t]*([a-zA-Z_$][0-9a-zA-Z_$]*)/m.test(n)?t?new Class(n,!1,!1):new Class(n,!0,!0):/^  onceAddedClassProperties:/m.test(n)&&(t?new Mixin(n,!1,!1):new Mixin(n,!0,!0)),srcLoadCompileDebugWrites&&console.log("compiling and evalling "+e+" from souce code"),emptyLogDiv(),addLineToLogDiv("compiling and evalling "+e),i=performance.now(),srcLoadCompileDebugWrites)return console.log("loadSourcesAndPotentiallyCompileThem call time: "+(i-o)+" milliseconds.")},trackChanges=[!0],window.healingRectanglesPhase=!1,window.morphsThatMaybeChangedGeometryOrPosition=[],window.morphsThatMaybeChangedFullGeometryOrPosition=[],window.morphsThatMaybeChangedLayout=[],createWorldAndStartStepping=function(){var e;return(world=window.location.href.includes("worldWithSystemTestHarness")?new WorldMorph(worldCanvas,!1):new WorldMorph(worldCanvas,!0)).isDevMode=!0,window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},(e=function(){requestAnimFrame(e),world.doOneCycle()})(),window.location.href.includes("worldWithSystemTestHarness")&&"undefined"!=typeof SystemTestsControlPanelUpdater&&null!==SystemTestsControlPanelUpdater&&new SystemTestsControlPanelUpdater,window.menusHelper=new MenusHelper,world.removeSpinnerAndFakeDesktop(),world.createDesktop()},createImageFromImageData=function(e){return new Promise((function(t,n){var o;return(o=new Image).onload=function(){return t(o)},o.onerror=function(){return n(o)},o.src=e}))},extend=function(e,t){var n,o;for(o in n=function(){this.constructor=e},t)hasProp.call(t,o)&&(e[o]=t[o]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},getRandomInt=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)},Array.prototype.filter||(Array.prototype.filter=function(e){var t,n,o,i;for(this,i=[],n=0,o=this.length;n<o;n++)e(t=this[n])&&i.push(t);return i}),Array.prototype.deepCopy=function(e,t,n,o){var i,r,s,a,l,u;if((r=t.indexOf(this))>=0)return e?"$"+r:n[r];for(l=t.length,t.push(this),i=[],n.push(i),s=a=0,u=this.length;0<=u?a<u:a>u;s=0<=u?++a:--a)null==this[s]?i[s]=nil:"object"==typeof this[s]?(this[s].deepCopy,i[s]=this[s].deepCopy(e,t,n,o)):i[s]=this[s];return e?"$"+l:i},Array.prototype.chunk=function(e){var t;return t=this,[].concat.apply([],t.map((function(n,o){return o%e?[]:[t.slice(o,o+e)]})))},Array.prototype.remove=function(e){var t;return-1!==(t=this.indexOf(e))&&this.splice(t,1),this},Array.prototype.unique=function(){var e,t,n,o,i,r;for(n={},t=e=0,o=this.length;0<=o?e<o:e>o;t=0<=o?++e:--e)n[this[t]]=this[t];for(t in i=[],n)r=n[t],i.push(r);return i},uniqueKeepOrder=function(e,t,n){return n.indexOf(e)===t},Array.prototype.uniqueKeepOrder=function(){return this.filter(uniqueKeepOrder)},void 0===String.prototype.isLetter&&(String.prototype.isLetter=function(){return 1===this.length&&this.match(/[a-z]/i)}),Object.prototype.augmentWith=function(e,t){var n,o,i;for(n in e)i=e[n],indexOf.call(MixedClassKeywords,n)<0&&(this[n]=i);return null!=(o=e.onceAddedClassProperties)&&o.apply(this,[t]),this},Object.prototype.addInstanceProperties=function(e,t){var n,o,i;for(n in t)hasProp.call(t,n)&&(i=t[n],indexOf.call(MixedClassKeywords,n)<0&&(this.prototype[n]=i,null!=e&&isFunction(i)&&(this.prototype[n+"_class_injected_in"]=e,srcLoadCompileDebugWrites&&console.log("addingClassToMixin "+n+"_class_injected_in"))));return null!=(o=t.included)&&o.apply(this),this},Number.prototype.timesWithVariable=function(e,t){var n,o,i;for(i=this.valueOf(),n=0,o=[];n<i;)t.call(e,n),o.push(n++);return o},Number.prototype.times=function(e,t){var n,o,i;for(i=this.valueOf(),n=0,o=[];n<i;)t.call(e,n),o.push(n++);return o},addLogDiv=function(){var e;return(e=document.createElement("div")).id="loadingLog",e.style.position="absolute",e.style.width="960px",e.style.backgroundColor="rgb(245, 245, 245)",e.style.top="0px",e.style.top="0px",document.getElementsByTagName("body")[0].appendChild(e)},removeLogDiv=function(){var e;return null!=(e=document.getElementById("loadingLog"))?e.parentElement.removeChild(e):void 0},emptyLogDiv=function(){var e;return null!=(e=document.getElementById("loadingLog"))?e.innerHTML="":void 0},addLineToLogDiv=function(e){var t;return null!=(t=document.getElementById("loadingLog"))?t.innerHTML+=e+"</br>":void 0},morphicVersion="version of Wed May 27 20:58:42 BST 2020";