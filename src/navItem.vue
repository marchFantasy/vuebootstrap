/**
 * navItem
 * tag:NavItem
 */
 <template lang="jade">
   li(v-bind:class='disabled')
     v-link(v-bind:href='href',v-bind:target='target',v-bind:click-handle='clickHandle')
       slot
 </template>

 <script>
   import VLink from './link.vue';
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
       VLink
     }
   }
 </script>
