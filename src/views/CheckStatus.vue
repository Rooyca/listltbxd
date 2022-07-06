<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const route = useRoute()

const statusRequest = reactive({d:[]})

onMounted(() => {
    axios
    .get('https://letbxl.herokuapp.com/lboxdlist/task/'+route.query.id)
    .then(r => {
        if(r.data.task_status === 'SUCCESS'){
            statusRequest.d = r.data
        }
        else{
            statusRequest.d = r.data.task_status
        }
    })
})
</script>

<template>
<header>
    <div class="container-respose" v-if="statusRequest.d.task_status === 'SUCCESS'">
        <vue-json-pretty :data="statusRequest.d.task_result"></vue-json-pretty>
    </div>
    <div v-else style="color:antiquewhite">
        <p>Your status request is: <span>{{statusRequest.d}}!</span></p>
    </div>
</header>
<footer>

</footer>  
</template>

<style scoped>
    .container-respose {
        color:whitesmoke; 
        text-shadow: 0.5px 0.5px 9px whitesmoke; 
        padding: 2%;
        width: 100%; 
        height: 100%; 
        background-color: rgba(0, 0, 0, 0.5); 
        overflow: auto;
        border-radius: 17px;
        position: absolute;
        top: 5%;
    }
</style>