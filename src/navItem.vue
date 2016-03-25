
 <template lang="jade">
   li(v-bind:class="{'active':active,'disabled':disabled}")
     anchor(v-bind:href='href',
           v-bind:target='target',
           v-bind:on-click='onClick',
           v-bind:disabled="disabled")
       slot
 </template>

 <script>
 /**
  * navItem
  * tag:NavItem
  * 导航菜单
  * @param href {String}
  * @param target {String}
  * @param disabled {Boolean}
  * @param active {Boolean}
  */
   import Anchor from './anchor.vue';
   import LinkMixin from './mixin/linkMixin.js';
   export default{
     mixins:[LinkMixin],
     props:{
       active:{
         type:Boolean,
         default:false
       },
       onClick:{
         type:Function,
         default:()=>{}
       }
     },
     components:{
       Anchor
     }
   }
 </script>
