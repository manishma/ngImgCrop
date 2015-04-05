/*! ngImgCropWix v0.3.3 License: MIT */!function(){"use strict";var e=angular.module("ngImgCrop",[]);e.factory("cropAreaCircle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._boxResizeBaseSize=20,this._boxResizeNormalRatio=.9,this._boxResizeHoverRatio=1.2,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._boxResizeNormalSize=this._boxResizeBaseSize*this._boxResizeNormalRatio,this._boxResizeHoverSize=this._boxResizeBaseSize*this._boxResizeHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._boxResizeIsHover=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.setRatio=function(){e.prototype.setRatio.call(this,1)},t.prototype.setCrop=function(t,i,r){e.prototype.setCrop.call(this,t,i,r,1)},t.prototype._calcCirclePerimeterCoords=function(e){var t=this._size/2,i=e*(Math.PI/180),r=this._x+t*Math.cos(i),s=this._y+t*Math.sin(i);return[r,s]},t.prototype._calcResizeIconCenterCoords=function(){return this._calcCirclePerimeterCoords(-45)},t.prototype._isCoordWithinArea=function(e){return Math.sqrt((e[0]-this._x)*(e[0]-this._x)+(e[1]-this._y)*(e[1]-this._y))<this._size/2},t.prototype._isCoordWithinBoxResize=function(e){var t=this._calcResizeIconCenterCoords(),i=this._boxResizeHoverSize/2;return e[0]>t[0]-i&&e[0]<t[0]+i&&e[1]>t[1]-i&&e[1]<t[1]+i},t.prototype._drawArea=function(e,t,i){e.arc(t[0],t[1],i/2,0,2*Math.PI)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio),this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(),this._boxResizeBaseSize,this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio)},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._boxResizeIsHover=!1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._boxResizeIsDragging){i="nesw-resize";var s,o,a;o=e-this._posResizeStartX,a=this._posResizeStartY-t,s=o>a?this._posResizeStartSize+2*a:this._posResizeStartSize+2*o,this._size=Math.max(this._minSize,s),this._boxResizeIsHover=!0,r=!0,this._events.trigger("area-resize")}else this._isCoordWithinBoxResize([e,t])?(i="nesw-resize",this._areaIsHover=!1,this._boxResizeIsHover=!0,r=!0):this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0);return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){this._isCoordWithinBoxResize([e,t])?(this._areaIsDragging=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!0,this._boxResizeIsHover=!0,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._boxResizeIsDragging=!1,this._boxResizeIsHover=!1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._boxResizeIsDragging&&(this._boxResizeIsDragging=!1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._boxResizeIsHover=!1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaRectangle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._posResizeStartRatio=1,this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype._calcSquareCorners=function(){var e=this._size/2,t=e/this._ratio;return[[this._x-e,this._y-t],[this._x+e,this._y-t],[this._x-e,this._y+t],[this._x+e,this._y+t]]},t.prototype._calcSquareDimensions=function(){var e=this._size/2,t=e/this._ratio;return{left:this._x-e,top:this._y-t,right:this._x+e,bottom:this._y+t}},t.prototype._isCoordWithinArea=function(e){var t=this._calcSquareDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcSquareCorners(),i=-1,r=0,s=t.length;s>r;r++){var o=t[r];if(e[0]>o[0]-this._resizeCtrlHoverRadius&&e[0]<o[0]+this._resizeCtrlHoverRadius&&e[1]>o[1]-this._resizeCtrlHoverRadius&&e[1]<o[1]+this._resizeCtrlHoverRadius){i=r;break}}return i},t.prototype._drawArea=function(e,t,i,r){var s=i/2,o=s/r;e.rect(t[0]-s,t[1]-o,2*s,2*o)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var t=this._calcSquareCorners(),i=0,r=t.length;r>i;i++){var s=t[i];this._cropCanvas.drawIconResizeCircle(s,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var s,o;switch(this._resizeCtrlIsDragging){case 0:s=-1,o=-1,i="nwse-resize";break;case 1:s=1,o=-1,i="nesw-resize";break;case 2:s=-1,o=1,i="nesw-resize";break;case 3:s=1,o=1,i="nwse-resize"}var a=this._size,n=this._size/this._ratio,h=(e-this._posResizeStartX)*s,c=(t-this._posResizeStartY)*o;this._fixedRatio&&(h/this._ratio>c?h=c*this._ratio:c=h/this._ratio);var g=this._minSize,l=this._fixedRatio?g/this._ratio:this._minSize,u=this._ctx.canvas.width,p=this._ctx.canvas.height,_=Math.min(u,Math.max(g,h+this._posResizeStartSize)),d=Math.min(p,Math.max(l,c+this._posResizeStartSize/this._posResizeStartRatio));console.log({newWidth:_,newHight:d}),this._size=_,this._fixedRatio||(this._ratio=_/d),this._x+=s*(_-a)/2,this._y+=o*(d-n)/2,this._resizeCtrlIsHover=this._resizeCtrlIsDragging,r=!0,this._events.trigger("area-resize")}else{var f=this._isCoordWithinResizeCtrl([e,t]);if(f>-1){switch(f){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=f,r=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0)}return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);i>-1?(this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._posResizeStartRatio=this._ratio,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaSquare",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.setRatio=function(){e.prototype.setRatio.call(this,1)},t.prototype.setCrop=function(t,i,r){e.prototype.setCrop.call(this,t,i,r,1)},t.prototype._calcSquareCorners=function(){var e=this._size/2;return[[this._x-e,this._y-e],[this._x+e,this._y-e],[this._x-e,this._y+e],[this._x+e,this._y+e]]},t.prototype._calcSquareDimensions=function(){var e=this._size/2;return{left:this._x-e,top:this._y-e,right:this._x+e,bottom:this._y+e}},t.prototype._isCoordWithinArea=function(e){var t=this._calcSquareDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcSquareCorners(),i=-1,r=0,s=t.length;s>r;r++){var o=t[r];if(e[0]>o[0]-this._resizeCtrlHoverRadius&&e[0]<o[0]+this._resizeCtrlHoverRadius&&e[1]>o[1]-this._resizeCtrlHoverRadius&&e[1]<o[1]+this._resizeCtrlHoverRadius){i=r;break}}return i},t.prototype._drawArea=function(e,t,i){var r=i/2;e.rect(t[0]-r,t[1]-r,i,i)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var t=this._calcSquareCorners(),i=0,r=t.length;r>i;i++){var s=t[i];this._cropCanvas.drawIconResizeCircle(s,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var s,o;switch(this._resizeCtrlIsDragging){case 0:s=-1,o=-1,i="nwse-resize";break;case 1:s=1,o=-1,i="nesw-resize";break;case 2:s=-1,o=1,i="nesw-resize";break;case 3:s=1,o=1,i="nwse-resize"}var a,n=(e-this._posResizeStartX)*s,h=(t-this._posResizeStartY)*o;a=n>h?this._posResizeStartSize+h:this._posResizeStartSize+n;var c=this._size;this._size=Math.max(this._minSize,a);var g=(this._size-c)/2;this._x+=g*s,this._y+=g*o,this._resizeCtrlIsHover=this._resizeCtrlIsDragging,r=!0,this._events.trigger("area-resize")}else{var l=this._isCoordWithinResizeCtrl([e,t]);if(l>-1){switch(l){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=l,r=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0)}return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);i>-1?(this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropArea",["cropCanvas",function(e){var t=function(t,i){this._ctx=t,this._events=i,this._minSize=80,this._cropCanvas=new e(t),this._image=new Image,this._x=0,this._y=0,this._size=200,this._ratio=1,this._fixedRatio=!1};return t.prototype.getImage=function(){return this._image},t.prototype.setImage=function(e){this._image=e},t.prototype.getX=function(){return this._x},t.prototype.setX=function(e){this._x=e,this._dontDragOutside()},t.prototype.getY=function(){return this._y},t.prototype.setY=function(e){this._y=e,this._dontDragOutside()},t.prototype.getSize=function(){return this._size},t.prototype.setSize=function(e){this._size=Math.max(this._minSize,e),this._dontDragOutside()},t.prototype.getRatio=function(){return this._ratio},t.prototype.setRatio=function(e){this._ratio=e,this._dontDragOutside()},t.prototype.setCrop=function(e,t,i,r){this._size=i,this._ratio=r,this._x=e,this._y=t,this._dontDragOutside()},t.prototype.setFixedRatio=function(e){this._fixedRatio=e},t.prototype.getMinSize=function(){return this._minSize},t.prototype.setMinSize=function(e){this._minSize=e,this._size=Math.max(this._minSize,this._size),this._dontDragOutside()},t.prototype._dontDragOutside=function(){var e=this._ctx.canvas.height,t=this._ctx.canvas.width;this._size>t&&(this._size=t),this._size/this._ratio>e&&(this._size=e*this._ratio);var i=this._size/2,r=i/this._ratio;this._x<i&&(this._x=i),this._x>t-i&&(this._x=t-i),this._y<r&&(this._y=r),this._y>e-r&&(this._y=e-r)},t.prototype._drawArea=function(){},t.prototype.draw=function(){this._cropCanvas.drawCropArea(this._image,[this._x,this._y],this._size,this._ratio,this._drawArea)},t.prototype.processMouseMove=function(){},t.prototype.processMouseDown=function(){},t.prototype.processMouseUp=function(){},t}]),e.factory("cropCanvas",[function(){var e=[[-.5,-2],[-3,-4.5],[-.5,-7],[-7,-7],[-7,-.5],[-4.5,-3],[-2,-.5]],t=[[.5,-2],[3,-4.5],[.5,-7],[7,-7],[7,-.5],[4.5,-3],[2,-.5]],i=[[-.5,2],[-3,4.5],[-.5,7],[-7,7],[-7,.5],[-4.5,3],[-2,.5]],r=[[.5,2],[3,4.5],[.5,7],[7,7],[7,.5],[4.5,3],[2,.5]],s=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]],o=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]],a=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]],n=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]],h={areaOutline:"#fff",resizeBoxStroke:"#fff",resizeBoxFill:"#444",resizeBoxArrowFill:"#fff",resizeCircleStroke:"#fff",resizeCircleFill:"#444",moveIconFill:"#fff"};return function(c){var g=function(e,t,i){return[i*e[0]+t[0],i*e[1]+t[1]]},l=function(e,t,i,r){c.save(),c.fillStyle=t,c.beginPath();var s,o=g(e[0],i,r);c.moveTo(o[0],o[1]);for(var a in e)a>0&&(s=g(e[a],i,r),c.lineTo(s[0],s[1]));c.lineTo(o[0],o[1]),c.fill(),c.closePath(),c.restore()};this.drawIconMove=function(e,t){l(s,h.moveIconFill,e,t),l(o,h.moveIconFill,e,t),l(a,h.moveIconFill,e,t),l(n,h.moveIconFill,e,t)},this.drawIconResizeCircle=function(e,t,i){var r=t*i;c.save(),c.strokeStyle=h.resizeCircleStroke,c.lineWidth=2,c.fillStyle=h.resizeCircleFill,c.beginPath(),c.arc(e[0],e[1],r,0,2*Math.PI),c.fill(),c.stroke(),c.closePath(),c.restore()},this.drawIconResizeBoxBase=function(e,t,i){var r=t*i;c.save(),c.strokeStyle=h.resizeBoxStroke,c.lineWidth=2,c.fillStyle=h.resizeBoxFill,c.fillRect(e[0]-r/2,e[1]-r/2,r,r),c.strokeRect(e[0]-r/2,e[1]-r/2,r,r),c.restore()},this.drawIconResizeBoxNESW=function(e,r,s){this.drawIconResizeBoxBase(e,r,s),l(t,h.resizeBoxArrowFill,e,s),l(i,h.resizeBoxArrowFill,e,s)},this.drawIconResizeBoxNWSE=function(t,i,s){this.drawIconResizeBoxBase(t,i,s),l(e,h.resizeBoxArrowFill,t,s),l(r,h.resizeBoxArrowFill,t,s)},this.drawCropArea=function(e,t,i,r,s){var o=e.width/c.canvas.width,a=e.height/c.canvas.height,n=t[0]-i/2,g=t[1]-i/r/2;c.save(),c.strokeStyle=h.areaOutline,c.lineWidth=2,c.beginPath(),s(c,t,i,r),c.stroke(),c.clip(),i>0&&c.drawImage(e,n*o,g*a,i*o,i*a/r,n,g,i,i/r),c.beginPath(),s(c,t,i,r),c.stroke(),c.clip(),c.restore()}}}]),e.service("cropEXIF",[function(){function e(e){return!!e.exifdata}function t(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var i=atob(e),r=i.length,s=new ArrayBuffer(r),o=new Uint8Array(s),a=0;r>a;a++)o[a]=i.charCodeAt(a);return s}function i(e,t){var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="blob",i.onload=function(){(200==this.status||0===this.status)&&t(this.response)},i.send()}function r(e,r){function a(t){var i=s(t),a=o(t);e.exifdata=i||{},e.iptcdata=a||{},r&&r.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var n=t(e.src);a(n)}else if(/^blob\:/i.test(e.src)){var h=new FileReader;h.onload=function(e){a(e.target.result)},i(e.src,function(e){h.readAsArrayBuffer(e)})}else{var c=new XMLHttpRequest;c.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";a(c.response),c=null},c.open("GET",e.src,!0),c.responseType="arraybuffer",c.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var h=new FileReader;h.onload=function(e){l&&console.log("Got file of length "+e.target.result.byteLength),a(e.target.result)},h.readAsArrayBuffer(e)}}function s(e){var t=new DataView(e);if(l&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return l&&console.log("Not a valid JPEG"),!1;for(var i,r=2,s=e.byteLength;s>r;){if(255!=t.getUint8(r))return l&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(i=t.getUint8(r+1),l&&console.log(i),225==i)return l&&console.log("Found 0xFFE1 marker"),g(t,r+4,t.getUint16(r+2)-2);r+=2+t.getUint16(r+2)}}function o(e){var t=new DataView(e);if(l&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return l&&console.log("Not a valid JPEG"),!1;for(var i=2,r=e.byteLength,s=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>i;){if(s(t,i)){var o=t.getUint8(i+7);o%2!==0&&(o+=1),0===o&&(o=4);var n=i+8+o,h=t.getUint16(i+6+o);return a(e,n,h)}i++}}function a(e,t,i){for(var r,s,o,a,n,h=new DataView(e),g={},l=t;t+i>l;)28===h.getUint8(l)&&2===h.getUint8(l+1)&&(a=h.getUint8(l+2),a in f&&(o=h.getInt16(l+3),n=o+5,s=f[a],r=c(h,l+5,o),g.hasOwnProperty(s)?g[s]instanceof Array?g[s].push(r):g[s]=[g[s],r]:g[s]=r)),l++;return g}function n(e,t,i,r,s){var o,a,n,c=e.getUint16(i,!s),g={};for(n=0;c>n;n++)o=i+12*n+2,a=r[e.getUint16(o,!s)],!a&&l&&console.log("Unknown tag: "+e.getUint16(o,!s)),g[a]=h(e,o,t,i,s);return g}function h(e,t,i,r,s){var o,a,n,h,g,l,u=e.getUint16(t+2,!s),p=e.getUint32(t+4,!s),_=e.getUint32(t+8,!s)+i;switch(u){case 1:case 7:if(1==p)return e.getUint8(t+8,!s);for(o=p>4?_:t+8,a=[],h=0;p>h;h++)a[h]=e.getUint8(o+h);return a;case 2:return o=p>4?_:t+8,c(e,o,p-1);case 3:if(1==p)return e.getUint16(t+8,!s);for(o=p>2?_:t+8,a=[],h=0;p>h;h++)a[h]=e.getUint16(o+2*h,!s);return a;case 4:if(1==p)return e.getUint32(t+8,!s);for(a=[],h=0;p>h;h++)a[h]=e.getUint32(_+4*h,!s);return a;case 5:if(1==p)return g=e.getUint32(_,!s),l=e.getUint32(_+4,!s),n=new Number(g/l),n.numerator=g,n.denominator=l,n;for(a=[],h=0;p>h;h++)g=e.getUint32(_+8*h,!s),l=e.getUint32(_+4+8*h,!s),a[h]=new Number(g/l),a[h].numerator=g,a[h].denominator=l;return a;case 9:if(1==p)return e.getInt32(t+8,!s);for(a=[],h=0;p>h;h++)a[h]=e.getInt32(_+4*h,!s);return a;case 10:if(1==p)return e.getInt32(_,!s)/e.getInt32(_+4,!s);for(a=[],h=0;p>h;h++)a[h]=e.getInt32(_+8*h,!s)/e.getInt32(_+4+8*h,!s);return a}}function c(e,t,i){for(var r="",s=t;t+i>s;s++)r+=String.fromCharCode(e.getUint8(s));return r}function g(e,t){if("Exif"!=c(e,t,4))return l&&console.log("Not valid EXIF data! "+c(e,t,4)),!1;var i,r,s,o,a,h=t+6;if(18761==e.getUint16(h))i=!1;else{if(19789!=e.getUint16(h))return l&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;i=!0}if(42!=e.getUint16(h+2,!i))return l&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var g=e.getUint32(h+4,!i);if(8>g)return l&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(h+4,!i)),!1;if(r=n(e,h,h+g,p,i),r.ExifIFDPointer){o=n(e,h,h+r.ExifIFDPointer,u,i);for(s in o){switch(s){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":o[s]=d[s][o[s]];break;case"ExifVersion":case"FlashpixVersion":o[s]=String.fromCharCode(o[s][0],o[s][1],o[s][2],o[s][3]);break;case"ComponentsConfiguration":o[s]=d.Components[o[s][0]]+d.Components[o[s][1]]+d.Components[o[s][2]]+d.Components[o[s][3]]}r[s]=o[s]}}if(r.GPSInfoIFDPointer){a=n(e,h,h+r.GPSInfoIFDPointer,_,i);for(s in a){switch(s){case"GPSVersionID":a[s]=a[s][0]+"."+a[s][1]+"."+a[s][2]+"."+a[s][3]}r[s]=a[s]}}return r}var l=!1,u=this.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},p=this.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},_=this.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},d=this.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},f={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};this.getData=function(t,i){return(t instanceof Image||t instanceof HTMLImageElement)&&!t.complete?!1:(e(t)?i&&i.call(t):r(t,i),!0)},this.getTag=function(t,i){return e(t)?t.exifdata[i]:void 0},this.getAllTags=function(t){if(!e(t))return{};var i,r=t.exifdata,s={};for(i in r)r.hasOwnProperty(i)&&(s[i]=r[i]);return s},this.pretty=function(t){if(!e(t))return"";var i,r=t.exifdata,s="";for(i in r)r.hasOwnProperty(i)&&(s+="object"==typeof r[i]?r[i]instanceof Number?i+" : "+r[i]+" ["+r[i].numerator+"/"+r[i].denominator+"]\r\n":i+" : ["+r[i].length+" values]\r\n":i+" : "+r[i]+"\r\n");return s},this.readFromBinaryFile=function(e){return s(e)}}]),e.factory("cropHost",["$document","cropAreaCircle","cropAreaSquare","cropAreaRectangle","cropEXIF",function(e,t,i,r,s){var o=function(e){var t=e.getBoundingClientRect(),i=document.body,r=document.documentElement,s=window.pageYOffset||r.scrollTop||i.scrollTop,o=window.pageXOffset||r.scrollLeft||i.scrollLeft,a=r.clientTop||i.clientTop||0,n=r.clientLeft||i.clientLeft||0,h=t.top+s-a,c=t.left+o-n;return{top:Math.round(h),left:Math.round(c)}};return function(a,n,h){function c(){g.clearRect(0,0,g.canvas.width,g.canvas.height),null!==l&&(g.drawImage(l,0,0,g.canvas.width,g.canvas.height),g.save(),g.fillStyle="rgba(0, 0, 0, 0.65)",g.fillRect(0,0,g.canvas.width,g.canvas.height),g.restore(),_.draw())}var g=null,l=null,u=null,p=0,_=null,d=[100,100],f=[300,300],v=0,m="image/png",z=null,S=function(){if(null!==l){_.setImage(l);var e=[l.width,l.height],t=l.width/l.height,i=e;if(i[0]>f[0]?(i[0]=f[0],i[1]=i[0]/t):i[0]<d[0]&&(i[0]=d[0],i[1]=i[0]/t),i[1]>f[1]?(i[1]=f[1],i[0]=i[1]*t):i[1]<d[1]&&(i[1]=d[1],i[0]=i[1]*t),a.prop("width",i[0]).prop("height",i[1]).css({"margin-left":-i[0]/2+"px","margin-top":-i[1]/2+"px"}),u){var r=g.canvas.width*u.x,s=g.canvas.height*u.y,o=g.canvas.width*u.w,n=g.canvas.height*u.h;_.setCrop(r+o/2,s+n/2,o,p||o/n)}else _.setX(g.canvas.width/2),_.setY(g.canvas.height/2),_.setSize(Math.min(200,g.canvas.width/2,g.canvas.height/2)),_.setRatio(p||t);_.setFixedRatio(!!p)}else a.prop("width",0).prop("height",0).css({"margin-top":0});c()},R=function(e){return angular.isDefined(e.changedTouches)?e.changedTouches:e.originalEvent.changedTouches},C=function(e){if(null!==l){var t,i,r=o(g.canvas);"touchmove"===e.type?(t=R(e)[0].pageX,i=R(e)[0].pageY):(t=e.pageX,i=e.pageY),_.processMouseMove(t-r.left,i-r.top),c()}},y=function(e){if(e.preventDefault(),e.stopPropagation(),null!==l){var t,i,r=o(g.canvas);"touchstart"===e.type?(t=R(e)[0].pageX,i=R(e)[0].pageY):(t=e.pageX,i=e.pageY),_.processMouseDown(t-r.left,i-r.top),c()}},I=function(e){if(null!==l){var t,i,r=o(g.canvas);"touchend"===e.type?(t=R(e)[0].pageX,i=R(e)[0].pageY):(t=e.pageX,i=e.pageY),_.processMouseUp(t-r.left,i-r.top),c()}};this.getCrop=function(){if(l){var e=_.getSize(),t=_.getSize()/_.getRatio(),i=_.getX()-e/2,r=_.getY()-t/2;return{x:i/g.canvas.width,y:r/g.canvas.height,w:e/g.canvas.width,h:t/g.canvas.height}}},this.setCrop=function(e){u=e,S()},this.setAspectRatio=function(e){e=parseFloat(e),isNaN(e)||(p=e,S())},this.getResultImageDataURI=function(){if(l){var e,t,i=angular.element("<canvas></canvas>")[0],r=i.getContext("2d"),s=l.width/g.canvas.width,o=l.height/g.canvas.height;return v?_.getRatio()>=1?(e=v,t=e/_.getRatio()):(t=v,e=t*_.getRatio()):(e=_.getSize()*s,t=_.getSize()*o/_.getRatio()),i.width=e,i.height=t,r.drawImage(l,(_.getX()-_.getSize()/2)*s,(_.getY()-_.getSize()/_.getRatio()/2)*o,_.getSize()*s,_.getSize()*o/_.getRatio(),0,0,e,t),null!==z?i.toDataURL(m,z):i.toDataURL(m)}},this.setNewImageSource=function(e){if(l=null,S(),h.trigger("image-updated"),e){var t=new Image;"http"===e.substring(0,4).toLowerCase()&&(t.crossOrigin="anonymous"),t.onload=function(){h.trigger("load-done"),s.getData(t,function(){var e=s.getTag(t,"Orientation");if([3,6,8].indexOf(e)>-1){var i=document.createElement("canvas"),r=i.getContext("2d"),o=t.width,a=t.height,n=0,c=0,g=0;switch(e){case 3:n=-t.width,c=-t.height,g=180;break;case 6:o=t.height,a=t.width,c=-t.height,g=90;break;case 8:o=t.height,a=t.width,n=-t.width,g=270}i.width=o,i.height=a,r.rotate(g*Math.PI/180),r.drawImage(t,n,c),l=new Image,l.src=i.toDataURL("image/png")}else l=t;S(),h.trigger("image-updated")})},t.onerror=function(){h.trigger("load-error")},h.trigger("load-start"),t.src=e}},this.setMaxDimensions=function(e,t){if(f=[e,t],null!==l){var i=g.canvas.width,r=g.canvas.height,s=[l.width,l.height],o=l.width/l.height,n=s;n[0]>f[0]?(n[0]=f[0],n[1]=n[0]/o):n[0]<d[0]&&(n[0]=d[0],n[1]=n[0]/o),n[1]>f[1]?(n[1]=f[1],n[0]=n[1]*o):n[1]<d[1]&&(n[1]=d[1],n[0]=n[1]*o),a.prop("width",n[0]).prop("height",n[1]).css({"margin-left":-n[0]/2+"px","margin-top":-n[1]/2+"px"});var h=g.canvas.width/i,u=g.canvas.height/r,p=Math.min(h,u);_.setX(_.getX()*h),_.setY(_.getY()*u),_.setSize(_.getSize()*p)}else a.prop("width",0).prop("height",0).css({"margin-top":0});c()},this.setAreaMinSize=function(e){e=parseInt(e,10),isNaN(e)||(_.setMinSize(e),c())},this.setResultImageSize=function(e){e=parseInt(e,10),isNaN(e)||(v=e)},this.setResultImageFormat=function(e){m=e},this.setResultImageQuality=function(e){e=parseFloat(e),!isNaN(e)&&e>=0&&1>=e&&(z=e)},this.setAreaType=function(e){var s=_.getSize(),o=_.getRatio(),a=_.getMinSize(),n=_.getX(),u=_.getY(),d=t;"square"===e?d=i:"rectangle"===e&&(d=r),_=new d(g,h),_.setMinSize(a),_.setSize(s),_.setRatio(p||o),_.setX(n),_.setY(u),_.setFixedRatio(!!p),null!==l&&_.setImage(l),c()},g=a[0].getContext("2d"),_=new t(g,h),e.on("mousemove",C),a.on("mousedown",y),e.on("mouseup",I),e.on("touchmove",C),a.on("touchstart",y),e.on("touchend",I),this.destroy=function(){e.off("mousemove",C),a.off("mousedown",y),e.off("mouseup",C),e.off("touchmove",C),a.off("touchstart",y),e.off("touchend",C),a.remove()
}}}]),e.factory("cropPubSub",[function(){return function(){var e={};this.on=function(t,i){return t.split(" ").forEach(function(t){e[t]||(e[t]=[]),e[t].push(i)}),this},this.trigger=function(t,i){return angular.forEach(e[t],function(e){e.call(null,i)}),this}}}]),e.directive("imgCrop",["$timeout","cropHost","cropPubSub",function(e,t,i){return{restrict:"E",scope:{image:"=",crop:"=",resultImage:"=",changeOnFly:"=",areaType:"@",aspectRatio:"=",areaMinSize:"=",resultImageSize:"=",resultImageFormat:"@",resultImageQuality:"=",onChange:"&",onLoadBegin:"&",onLoadDone:"&",onLoadError:"&"},template:"<canvas></canvas>",controller:["$scope",function(e){e.events=new i}],link:function(i,r){var s,o=i.events,a=new t(r.find("canvas"),{},o),n=function(e){var t=a.getResultImageDataURI();s!==t&&(s=t,angular.isDefined(e.resultImage)&&(e.resultImage=t||""),e.onChange({$dataURI:t,$crop:a.getCrop()}))},h=function(t){return function(){e(function(){i.$apply(function(e){t(e)})})}};o.on("load-start",h(function(e){e.onLoadBegin({})})).on("load-done",h(function(e){e.onLoadDone({})})).on("load-error",h(function(e){e.onLoadError({})})).on("area-move area-resize",h(function(e){e.changeOnFly&&n(e)})).on("area-move-end area-resize-end",h(function(e){e.crop=a.getCrop()})).on("image-updated",h(function(e){n(e)})),i.$watch("image",function(){a.setNewImageSource(i.image)}),i.$watch("areaType",function(){a.setAreaType(i.areaType),n(i)}),i.$watch("areaMinSize",function(){a.setAreaMinSize(i.areaMinSize),n(i)}),i.$watch("resultImageSize",function(){a.setResultImageSize(i.resultImageSize),n(i)}),i.$watch("resultImageFormat",function(){a.setResultImageFormat(i.resultImageFormat),n(i)}),i.$watch("resultImageQuality",function(){a.setResultImageQuality(i.resultImageQuality),n(i)}),i.$watch("crop",function(){a.setCrop(i.crop),n(i)}),i.$watch("aspectRatio",function(){a.setAspectRatio(i.aspectRatio),n(i)}),i.$watch(function(){return[r[0].clientWidth,r[0].clientHeight]},function(e){a.setMaxDimensions(e[0],e[1]),n(i)},!0),i.$on("$destroy",function(){a.destroy()})}}}])}();