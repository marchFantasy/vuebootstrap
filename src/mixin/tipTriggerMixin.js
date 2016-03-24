var elOffset = require('../util/elOffset.js');
module.exports = {
  props:{
    trigger:{
      type:String,
      default:'hover'
    },
    placement:{
      type:String,
      default:'top'
    },
    content:{
      type:String,
      default:'',
      required:true
    }
  },
  data:function(){
    return{
      show:false,
      tipPosition:{}
    }
  },
  ready:function(){
    var btnEl = this.$children[0].$el;

    //动态绑定事件
    switch(this.trigger){
      case 'hover':
        btnEl.addEventListener('mouseover',this.toggle);
        btnEl.addEventListener('mouseout',this.toggle);
        break;
      case 'click':
        btnEl.addEventListener('click',this.toggle);
        break;
      default:
        btnEl.addEventListener('focus',this.toggle);
        btnEl.addEventListener('blur',this.toggle);
    };

  },
  methods:{
    toggle:function(e){
      var self = this;
      self.show = !self.show;
      //等tooltip出现在dom以后才能获取
      this.$nextTick(function(){
        if(self.show){
          var vButton = self.$children[0];
          var vTooltip = self.$refs[self.tag] || self.$children[1];

          var btnElset = new elOffset(vButton.$el);
          var btnElPosition = btnElset.getPosition();

          vTooltip.fadeIn();

          var tipElset = new elOffset(vTooltip.$el);
          var tipElPosition = tipElset.getPosition();

          self.placement = self.placement === 'top' && tipElPosition.height > btnElPosition.top ? 'bottom' :
                           self.placement === 'bottom' && tipElPosition.height > btnElPosition.bottom ? 'top' :
                           self.placement === 'left' && tipElPosition.width > btnElPosition.left ? 'right' :
                           self.placement === 'right' && tipElPosition.width > btnElPosition.right ? 'left' :
                           self.placement;

          if(vTooltip.bPlacement !== self.placement){
            vTooltip.bPlacement = self.placement;
          }


          self.tipPosition = self.placement === 'top' ? {
            left: Math.round(btnElPosition.left-Math.abs(tipElPosition.width-btnElPosition.width)/2)+'px',
            top:btnElPosition.top-btnElPosition.height+'px'
          }:self.placement === 'bottom' ? {
            left:Math.round(btnElPosition.left-Math.abs(tipElPosition.width-btnElPosition.width)/2)+'px',
            top:btnElPosition.top+btnElPosition.height+'px'
          }:self.placement === 'left' ? {
            left:Math.abs(btnElPosition.left-tipElPosition.width)+'px',
            top:Math.round(btnElPosition.top+(btnElPosition.height-tipElPosition.height)/2)+'px',
          }:{
            left:btnElPosition.left+tipElPosition.width+'px',
            top:Math.round(btnElPosition.top+(btnElPosition.height-tipElPosition.height)/2)+'px',
          }

          vTooltip.animateIn();
        }
      });


    }
  }
};
