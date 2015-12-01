/**
 * navItem
 * tag:NavItem
 */
 <template lang="jade">
   li(v-bind:class='disabled')
     anchor(v-bind:href='href',v-bind:target='target',v-bind:click-handle='clickHandle')
       slot
 </template>

 <script>
   import Anchor from './anchor.vue';
   import LinkMixin from './mixin/linkMixin.js';
   export default{
     mixins:[LinkMixin],
     props:{
       disabled:{
         type:Boolean,
         default:false
       }
     },
     components:{
       Anchor
     }
   }
 </script>
