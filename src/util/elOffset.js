var ElOffset = function(el){
  this.el = el;
  this.left = 0;
  this.top = 0;
  this.right = 0;
  this.bottom = 0;
}
ElOffset.prototype = {
  setEl:function(el){
    this.el = el;
  },
  getPosition:function(){
    if(!this.el)return;
    if('getClientRects' in this.el){
      return this.el.getClientRects()[0];
    }
    return{
      height:this.el.offsetHeight,
      width:this.el.offsetWidth,
      top:getOffsetTop(this.el),
      left:getOffsetLeft(this.el),
      right:getOffsetRight(this.el),
      bottom:getOffsetBottom(this.el)
    }
  }
};

var getOffsetLeft = function(){
  var   l=obj.offsetLeft;
  while(obj.offsetParent != null){
     obj = obj.offsetParent;
     l += obj.offsetLeft;
  }
  return l;
}
var getOffsetTop = function(){
  var   l=obj.offsetTop;
  while(obj.offsetParent != null){
     obj = obj.offsetParent;
     l += obj.offsetTop;
  }
  return l;
}
var getOffsetRight = function(){
  var   l=obj.offsetRight;
  while(obj.offsetParent != null){
     obj = obj.offsetParent;
     l += obj.offsetRight;
  }
  return l;
}
var getOffsetBottom = function(){
  var   l=obj.offsetBottom;
  while(obj.offsetParent != null){
     obj = obj.offsetParent;
     l += obj.offsetBottom;
  }
  return l;
}
module.exports = ElOffset;
