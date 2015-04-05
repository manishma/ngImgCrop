'use strict';

crop.factory('cropAreaRectangle', ['cropArea', function(CropArea) {
  var CropAreaRectangle = function() {
    CropArea.apply(this, arguments);

    this._resizeCtrlBaseRadius = 10;
    this._resizeCtrlNormalRatio = 0.75;
    this._resizeCtrlHoverRatio = 1;
    this._iconMoveNormalRatio = 0.9;
    this._iconMoveHoverRatio = 1.2;

    this._resizeCtrlNormalRadius = this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio;
    this._resizeCtrlHoverRadius = this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio;

    this._posDragStartX=0;
    this._posDragStartY=0;
    this._posResizeStartX=0;
    this._posResizeStartY=0;
    this._posResizeStartSize=0;
    this._posResizeStartRatio = 1;

    this._resizeCtrlIsHover = -1;
    this._areaIsHover = false;
    this._resizeCtrlIsDragging = -1;
    this._areaIsDragging = false;
  };

  CropAreaRectangle.prototype = new CropArea();

  CropAreaRectangle.prototype._calcSquareCorners=function() {
    var hWidth = this._size / 2,
        hHeight = hWidth / this._ratio;
    return [
      [this._x - hWidth, this._y - hHeight],
      [this._x + hWidth, this._y - hHeight],
      [this._x - hWidth, this._y + hHeight],
      [this._x + hWidth, this._y + hHeight]
    ];
  };

  CropAreaRectangle.prototype._calcSquareDimensions=function() {
    var hWidth = this._size / 2,
        hHeight = hWidth / this._ratio;
    return {
      left: this._x - hWidth,
      top: this._y - hHeight,
      right: this._x + hWidth,
      bottom: this._y + hHeight
    };
  };

  CropAreaRectangle.prototype._isCoordWithinArea=function(coord) {
    var squareDimensions=this._calcSquareDimensions();
    return (coord[0]>=squareDimensions.left&&coord[0]<=squareDimensions.right&&coord[1]>=squareDimensions.top&&coord[1]<=squareDimensions.bottom);
  };

  CropAreaRectangle.prototype._isCoordWithinResizeCtrl=function(coord) {
    var resizeIconsCenterCoords=this._calcSquareCorners();
    var res=-1;
    for(var i=0,len=resizeIconsCenterCoords.length;i<len;i++) {
      var resizeIconCenterCoords=resizeIconsCenterCoords[i];
      if(coord[0] > resizeIconCenterCoords[0] - this._resizeCtrlHoverRadius && coord[0] < resizeIconCenterCoords[0] + this._resizeCtrlHoverRadius &&
         coord[1] > resizeIconCenterCoords[1] - this._resizeCtrlHoverRadius && coord[1] < resizeIconCenterCoords[1] + this._resizeCtrlHoverRadius) {
        res=i;
        break;
      }
    }
    return res;
  };

  CropAreaRectangle.prototype._drawArea=function(ctx,centerCoords,size, ratio) {
    var hWidth = size / 2,
        hHeight = hWidth / ratio;
    ctx.rect(centerCoords[0] - hWidth, centerCoords[1] - hHeight, hWidth * 2, hHeight * 2);
  };

  CropAreaRectangle.prototype.draw=function() {
    CropArea.prototype.draw.apply(this, arguments);

    // draw move icon
    this._cropCanvas.drawIconMove([this._x,this._y], this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);

    // draw resize cubes
    var resizeIconsCenterCoords=this._calcSquareCorners();
    for(var i=0,len=resizeIconsCenterCoords.length;i<len;i++) {
      var resizeIconCenterCoords=resizeIconsCenterCoords[i];
      this._cropCanvas.drawIconResizeCircle(resizeIconCenterCoords, this._resizeCtrlBaseRadius, this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio);
    }
  };

  CropAreaRectangle.prototype.processMouseMove=function(mouseCurX, mouseCurY) {
    var cursor='default';
    var res=false;

    this._resizeCtrlIsHover = -1;
    this._areaIsHover = false;

    if (this._areaIsDragging) {
      this._x = mouseCurX - this._posDragStartX;
      this._y = mouseCurY - this._posDragStartY;
      this._areaIsHover = true;
      cursor='move';
      res=true;
      this._events.trigger('area-move');
    } else if (this._resizeCtrlIsDragging>-1) {
      var xMulti, yMulti;
      switch (this._resizeCtrlIsDragging) {
        case 0: // Top Left
          xMulti = -1;
          yMulti = -1;
          cursor = 'nwse-resize';
          break;
        case 1: // Top Right
          xMulti = 1;
          yMulti = -1;
          cursor = 'nesw-resize';
          break;
        case 2: // Bottom Left
          xMulti = -1;
          yMulti = 1;
          cursor = 'nesw-resize';
          break;
        case 3: // Bottom Right
          xMulti = 1;
          yMulti = 1;
          cursor = 'nwse-resize';
          break;
      }
      var wasWidth = this._size,
          wasHeight = this._size / this._ratio,
          iFX = (mouseCurX - this._posResizeStartX) * xMulti,
          iFY = (mouseCurY - this._posResizeStartY) * yMulti;

      if(this._fixedRatio) {
        if (iFX / this._ratio > iFY) {
          iFX = iFY * this._ratio;
        } else {
          iFY = iFX / this._ratio;
        }
      }
      var minWidth = this._minSize,
          minHeigth = this._fixedRatio ? minWidth/this._ratio : this._minSize,
          maxWidth = this._ctx.canvas.width,
          maxHeigth = this._ctx.canvas.height,
          newWidth = Math.min(maxWidth, Math.max(minWidth, iFX + this._posResizeStartSize)),
          newHight = Math.min(maxHeigth, Math.max(minHeigth, iFY + this._posResizeStartSize / this._posResizeStartRatio));
      console.log({newWidth: newWidth, newHight: newHight});
      this._size = newWidth;
      if (!this._fixedRatio) {
        this._ratio = newWidth / newHight;
      }
      this._x += xMulti * (newWidth - wasWidth) / 2;
      this._y += yMulti * (newHight - wasHeight) / 2;
      this._resizeCtrlIsHover = this._resizeCtrlIsDragging;
      res = true;
      this._events.trigger('area-resize');
    } else {
      var hoveredResizeBox=this._isCoordWithinResizeCtrl([mouseCurX,mouseCurY]);
      if (hoveredResizeBox>-1) {
        switch(hoveredResizeBox) {
          case 0:
            cursor = 'nwse-resize';
            break;
          case 1:
            cursor = 'nesw-resize';
            break;
          case 2:
            cursor = 'nesw-resize';
            break;
          case 3:
            cursor = 'nwse-resize';
            break;
        }
        this._areaIsHover = false;
        this._resizeCtrlIsHover = hoveredResizeBox;
        res=true;
      } else if(this._isCoordWithinArea([mouseCurX,mouseCurY])) {
        cursor = 'move';
        this._areaIsHover = true;
        res=true;
      }
    }

    this._dontDragOutside();
    angular.element(this._ctx.canvas).css({'cursor': cursor});

    return res;
  };

  CropAreaRectangle.prototype.processMouseDown=function(mouseDownX, mouseDownY) {
    var isWithinResizeCtrl=this._isCoordWithinResizeCtrl([mouseDownX,mouseDownY]);
    if (isWithinResizeCtrl>-1) {
      this._areaIsDragging = false;
      this._areaIsHover = false;
      this._resizeCtrlIsDragging = isWithinResizeCtrl;
      this._resizeCtrlIsHover = isWithinResizeCtrl;
      this._posResizeStartX=mouseDownX;
      this._posResizeStartY=mouseDownY;
      this._posResizeStartSize = this._size;
      this._posResizeStartRatio = this._ratio;
      this._events.trigger('area-resize-start');
    } else if (this._isCoordWithinArea([mouseDownX,mouseDownY])) {
      this._areaIsDragging = true;
      this._areaIsHover = true;
      this._resizeCtrlIsDragging = -1;
      this._resizeCtrlIsHover = -1;
      this._posDragStartX = mouseDownX - this._x;
      this._posDragStartY = mouseDownY - this._y;
      this._events.trigger('area-move-start');
    }
  };

  CropAreaRectangle.prototype.processMouseUp=function(/*mouseUpX, mouseUpY*/) {
    if(this._areaIsDragging) {
      this._areaIsDragging = false;
      this._events.trigger('area-move-end');
    }
    if(this._resizeCtrlIsDragging>-1) {
      this._resizeCtrlIsDragging = -1;
      this._events.trigger('area-resize-end');
    }
    this._areaIsHover = false;
    this._resizeCtrlIsHover = -1;

    this._posDragStartX = 0;
    this._posDragStartY = 0;
  };


  return CropAreaRectangle;
}]);