<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";

const responseLIST = reactive({ d: [] });

onMounted(() => {
  const config = {
    url: "https://letbxl.herokuapp.com/lboxdlist/ids",
    method: "GET",
  };
  axios(config).then((res) => {
    responseLIST.d = res.data;
  });
});
</script>

<template>
  <header>
    <div class="div-con">
      <table class="table table-dark table-hover mx-auto style-table">
        <thead>
          <tr class="text-center">
            <th scope="col"></th>
            <th scope="col">URL</th>
            <th scope="col">ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="element, idx in responseLIST.d" v-bind:key="element">
            <th scope="row" class="text-center">{{idx+1}}</th>
            <td>{{element.url.split('/list/').pop().replace(/-/g,' ')}}</td>
            <td><router-link :to="'/check-status?id='+element.id" style="text-decoration:none; color:white; border-bottom:1px solid white">{{element.id}}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </header>
</template>

<style lang="scss" scoped>
*{
    font-family: 'Montserrat', sans-serif;
}
.div-con::-webkit-scrollbar {
    width: 8px;     
    height: 8px;    
    display: none; 
}
.div-con{
    position: absolute;
    height: 45rem;
    width: 50rem;
    top: 30rem;
    overflow: auto;
    font-size:13px;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
}
.style-table {
    opacity: 0.85;
}
td {
    word-wrap: break-word;
    word-break: break-word;
    padding: 10px;
}
th {
    margin: 0;
    padding: 5px;
}
@media all and (max-width: 500px) {
    th {
        padding: 9px;
    }
    .div-con{
        width: 95%;
        font-size:10px;
    }
}
@media all and (max-width: 400px) {
    .div-con{
        top: 62%

    }
}
</style>