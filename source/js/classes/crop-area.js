'use strict';

crop.factory('cropArea', ['cropCanvas', function(CropCanvas) {
  var CropArea = function(ctx, events) {
    this._ctx=ctx;
    this._events=events;

    this._minSize=80;

    this._cropCanvas=new CropCanvas(ctx);

    this._image=new Image();
    this._x = 0;
    this._y = 0;
    this._size = 200;
    this._ratio = 1;
  };

  /* GETTERS/SETTERS */

  CropArea.prototype.getImage = function () {
    return this._image;
  };
  CropArea.prototype.setImage = function (image) {
    this._image = image;
  };

  CropArea.prototype.getX = function () {
    return this._x;
  };
  CropArea.prototype.setX = function (x) {
    this._x = x;
    this._dontDragOutside();
  };

  CropArea.prototype.getY = function () {
    return this._y;
  };
  CropArea.prototype.setY = function (y) {
    this._y = y;
    this._dontDragOutside();
  };

  CropArea.prototype.getSize = function () {
    return this._size;
  };
  CropArea.prototype.setSize = function (size) {
    this._size = Math.max(this._minSize, size);
    this._dontDragOutside();
  };

  CropArea.prototype.getRatio = function () {
    return this._ratio;
  };
  CropArea.prototype.setRatio = function (ratio) {
    this._ratio = ratio;
    this._dontDragOutside();
  };

  CropArea.prototype.setCrop = function (x, y, size, ratio) {
    this._size = size;
    this._ratio = ratio;
    this._x = x;
    this._y = y;
    this._dontDragOutside();
  };

  CropArea.prototype.getMinSize = function () {
    return this._minSize;
  };
  CropArea.prototype.setMinSize = function (size) {
    this._minSize = size;
    this._size = Math.max(this._minSize, this._size);
    this._dontDragOutside();
  };

  /* FUNCTIONS */
  CropArea.prototype._dontDragOutside=function() {
    var h = this._ctx.canvas.height,
        w = this._ctx.canvas.width;
    if (this._size > w) { this._size = w; }
    if (this._size / this._ratio > h) { this._size = h * this._ratio; }
    var hWidth = this._size / 2,
        hHeight = hWidth / this._ratio;
    if (this._x < hWidth) { this._x = hWidth; }
    if (this._x > w - hWidth) { this._x = w - hWidth; }
    if (this._y < hHeight) { this._y = hHeight; }
    if (this._y > h - hHeight) { this._y = h - hHeight; }
  };

  CropArea.prototype._drawArea=function() {};

  CropArea.prototype.draw=function() {
    // draw crop area
    this._cropCanvas.drawCropArea(this._image,[this._x,this._y],this._size,this._ratio,this._drawArea);
  };

  CropArea.prototype.processMouseMove=function() {};

  CropArea.prototype.processMouseDown=function() {};

  CropArea.prototype.processMouseUp=function() {};

  return CropArea;
}]);