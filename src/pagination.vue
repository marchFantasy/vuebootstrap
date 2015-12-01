<template lang='jade'>
ul(v-bind:class='classes')
  nav-item(
    v-for='instance in pages',
    v-bind:class='{active:instance.val === activePage,disabled:instance.disabled}',
    @click='onSelect(instance)')
    {{instance.val}}
</template>
<script>
  import NavItem from './navItem.vue';
  /**
   * pagination
   * @tag:pagination
   * @param bsSize 尺寸
   * @param activePage 当前页码
   * @param items  页数
   * @param maxButtons 显示页码数量
   * @param ellipsis items > maxButtons 显示省略号
   * @param onSelect 选中事件
   * @description
   *
   */

  class Pager{
    /**
     * 页码类
     * [constructor description]
     * @param  {[type]} val            [值]
     * @param  {[type]} name           [简称]
     * @param  {[type]} active=false   [当前页]
     * @param  {[type]} disabled=false [是否可选]
     * @return {[type]}                [类]
     */
    constructor(val,name,active=false,disabled=false){
      this.val = val;
      this.name = name || val;
      this.active = active;
      this.disabled = disabled;
    }
  }
  import BsMixin from './mixin/bsMixin.js';
  export default{
    mixins:[BsMixin],
    props:{
      activePage:{
        type:Number,
        default:1,
        validator(value){
          return value > 0;
        }
      },
      items:{
        type:Number,
        required:true,
        validator(value){
          return value > 0;
        }
      },
      maxButtons:{
        type:Number,
        default:5
      },
      ellipsis:{
        type:Boolean,
        default:true
      },
      onSelect:{
        type:Function
      }
    },
    data(){
      return {
        tag:'pagination',
        classes:{},
        pages:[]
      }
    },
    computed:{
      bPage:{
        get(){
          return this.pages;
        },
        set(pager){
          this.pages.push(pager);
        }
      }
    },
    created(){
      if(this.activePage === 1){
        this.bPage = this.createPagerInstance('上一页','prev',false,true);
      }else{
        this.bPage = this.createPagerInstance('上一页','prev');
      }

      var n = 1;
      /**
       * 1.总页数小于最大数，直接循环输出
       * 2.当前页小于最大数的一半（向上取整）
       */
      if((this.items <= this.maxButtons) || (this.activePage <=Math.ceil(this.maxButtons/2))){
        /**
         * 1.第一个条件：直接输出n值，从1开始
         * 2.第二个条件：值小于最大数
         */
        while(this.items >= n && n <= this.maxButtons){
          this.bPage = this.createPagerInstance(n);
          n++;
        }
        //显示省略号
        //当items远远大于最大数时
        if(this.ellipsis){
            if(this.items > this.maxButtons){
              this.bPage = this.createPagerInstance('...','ellipsis',false,true);
            }
        }
      }else{
          /**
           * 页数大于最大显示值
           */
          let limitDown = Math.floor(this.maxButtons/2);
          //下次循环前应去处当前页，所以减1
          let limitUp = this.maxButtons - limitDown -1;
          let downVal = Math.abs(this.activePage - limitDown);
          let upVal = this.activePage+1;

          if(this.ellipsis){
            this.bPage = this.createPagerInstance('...','ellipsis',false,true);
          }
          //当前页接近末页
          if((this.items - this.activePage) <= limitUp){
            n = this.items - this.maxButtons+1;
            while(n <= this.items){
              this.bPage = this.createPagerInstance(n++);
            }
          }else{
            while(n <= limitDown){
              this.bPage = this.createPagerInstance(downVal++);
              n++;
            }
            n = 1;
            this.bPage = this.createPagerInstance(this.activePage);
            while(n <= limitUp){
              this.bPage = this.createPagerInstance(upVal++);
              n++;
            }
            //显示省略号
            if(this.ellipsis){
                this.bPage = this.createPagerInstance('...','ellipsis',false,true);
            }
          }


      }

      if(this.activePage === this.items){
        this.bPage = this.createPagerInstance('下一页','next',false,true);
      }else{
        this.bPage = this.createPagerInstance('下一页','next');
      }
    },
    methods:{
      createPagerInstance(val,name,isActive=false,disabled=false){
        return new Pager(val,name,isActive,disabled);
      }

    },
    components:{
      NavItem
    }
  }
</script>
