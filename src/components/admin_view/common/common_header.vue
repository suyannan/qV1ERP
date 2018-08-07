<template>
  <div class="child_title">
  <h4 class="child-h3">{{title+'--'}}</h4><h4 class="child-h4"> {{title1}}</h4>
  </div>
</template>

<script>
    export default {
      props:{
        title:'',
        title1:''
      }
    }
</script>
<style>
.child-h3,.child-h4{
  display: inline-block;
  font-weight: bold;
}
.child-h4{
  color:#2c2e43;
}
</style>
