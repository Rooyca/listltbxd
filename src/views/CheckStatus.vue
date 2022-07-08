<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import NewCheck from '../components/NewCheck.vue'
import router from '../router';

const route = useRoute()

const showJson = ref(false)
const urlNew = ref("")
const statusRequest = reactive({d:["..."]})
const jsonCopied = ref(false)
const jsonError = ref(false)

onMounted(() => {
    if(route.query.id){
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
    } else {
        statusRequest.d = 'NONE'
    }
})

const copyTestingCode = () => {
          let testingCodeToCopy = document.querySelector('#testing-code')
          testingCodeToCopy.setAttribute('type', 'text')   
          testingCodeToCopy.select()

          try {
            var successful = document.execCommand('copy');
            jsonCopied.value = !jsonCopied.value
          } catch (err) {
            jsonError.value = !jsonError.value
          }
          testingCodeToCopy.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        }

const reloadPage = () => {
    setTimeout(function() {
        router.go()
    }, 1000)
}
</script>

<template>
<header>
    <!-- Button trigger modal -->
    <button class="btn btn-primary boton-check"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            v-if="statusRequest.d !== 'NONE' & statusRequest.d.task_status === 'SUCCESS'"
            >
        Check ID
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Check one ID</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <input class="modal-input" type="text" v-model="urlNew" placeholder="Please enter one ID..."/>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <NewCheck :url="urlNew" data-bs-dismiss="modal" @click="reloadPage"/>
        </div>
        </div>
    </div>
    </div>
    <div class="container" v-if="statusRequest.d.task_status === 'SUCCESS'">
        <div class="">
            <div class="boton-copy">
                <div>
                    <span class="btn btn-success text-white" @click="copyTestingCode">Copy JSON</span>
                    <input type="hidden" id="testing-code" :value="JSON.stringify(statusRequest.d.task_result)">
                </div>
            </div>
        </div>}
        <div class="">
            <div class="boton-show">
                <div>
                    <span class="btn btn-info text-white" @click="showJson = !showJson">{{showJson ? "Hide JSON" : "Show JSON"}}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="container-respose" v-if="statusRequest.d.task_status === 'SUCCESS' & !showJson">
        <p style="text-align:center; color: greenyellow; font-size: 30px;">About this list</p>
        <p>There are {{statusRequest.d.task_result.length-1}} Movies on this list, some of then are: </p>
        <p><span class="span-movies">◙</span> {{statusRequest.d.task_result[1].name}} ({{statusRequest.d.task_result[1].release_date[0]}}) [{{statusRequest.d.task_result[1].rating_value[0]}}/5]</p>
        <p><span class="span-movies">◙</span> {{statusRequest.d.task_result[2].name}} ({{statusRequest.d.task_result[2].release_date[0]}}) [{{statusRequest.d.task_result[2].rating_value[0]}}/5]</p>
        <p><span class="span-movies">◙</span> {{statusRequest.d.task_result[3].name}} ({{statusRequest.d.task_result[3].release_date[0]}}) [{{statusRequest.d.task_result[3].rating_value[0]}}/5]</p>
        <p><span class="span-movies">◙</span> {{statusRequest.d.task_result[4].name}} ({{statusRequest.d.task_result[4].release_date[0]}}) [{{statusRequest.d.task_result[4].rating_value[0]}}/5]</p>
        <p><span class="span-movies">◙</span> {{statusRequest.d.task_result[5].name}} ({{statusRequest.d.task_result[5].release_date[0]}}) [{{statusRequest.d.task_result[5].rating_value[0]}}/5]</p>
        <p style="font-family: 'Montserrat', sans-serif;">
            <span style="text-shadow:1px 1px 3px black; color:lightcoral; font-weight: 600; ">REMEMBER: </span> 
                if the list has more than one page please specifie it 
                by putting '<span style="color:greenyellow">/page/1</span>' (where '1' is the page number) at the end of the URL 
            </p>
    </div>
    <div v-if="statusRequest.d.task_status !== 'SUCCESS' & !showJson & statusRequest.d !== 'NONE'" class="card-not-success">
        <p>Your status request is: <span class="text-warning">{{statusRequest.d}}!</span></p>
        <button class="btn btn-light" @click="this.$router.go()">Reload</button>
    </div>
    <div v-if="statusRequest.d === 'NONE'" class="card-not-success">
        <p>Your are not processing any <span class="text-warning">ID</span></p>
        <button class="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                > Check One
        </button>
    </div>
    <div v-if="showJson" class="container-respose">
        <vue-json-pretty :data="statusRequest.d.task_result"></vue-json-pretty>
    </div>
    <div v-if="jsonCopied" class="alert alert-success text-center mx-3 s-a" role="alert">
        JSON copied successfully!
        <button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div v-if="jsonError" class="alert alert-danger text-center mx-3 s-a" role="alert">
        Something went wrong! Please try again.
        <button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</header>
<footer>

</footer>  
</template>

<style scoped>
.modal-input{
    border: none;
    border-bottom: 1px solid rgb(65, 65, 65);
    width: 100%;
}
.container-respose::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
    display: none;  /* Ocultar scroll */
}
    .s-a {
        position: fixed;
        bottom: 6rem;
        width: 92%;
    }
    .card-not-success {
        color: antiquewhite;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        margin-left: 30px;
        margin-right: 30px;
        padding: 4%;
        border-radius: 17px;
        position: absolute;
        width: 30rem;
        top: 50%;
        right: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @media all and (max-width: 500px) {
        .card-not-success{
            width: 24rem;
            margin: 0;
        }
    }

    .container-respose {
        color:whitesmoke; 
        text-shadow: 0.5px 0.5px 9px whitesmoke; 
        padding: 2%;
        height: 30rem; 
        width: 30rem;
        background-color: rgba(0, 0, 0, 0.5); 
        overflow: auto;
        border-radius: 17px;
        position: absolute;
        top: 40%;
        left: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
    }
    @media all and (max-width: 500px) {
        .container-respose {
            width: 24rem;
            padding: 4%;
        }
    }
    @media all and (max-width: 400px) {
        .container-respose {
            height: 32rem;
            padding: 4%;
            top: 43%;
        }
    }
    .boton-copy {
        position: fixed;
        bottom: 25%;
        left: 57.2%
    }
    .boton-check {
        position: fixed;
        bottom: 25%;
        left: 45.7%
    }
    .boton-show {
        position: fixed;
        bottom: 25%;
        left: 51%;
    }
    @media all and (max-width: 1500px) {
        .boton-copy {
            left: 68%;
        }
        .boton-check {
            left: 16%;
        }
        .boton-show{
            left: 40%;
        }
    }
    @media all and (max-width: 400px) {
        .boton-copy, .boton-check, .boton-show {
            bottom: 15%
        }
    }
    .span-movies {
        color:red;
        font-weight: bolder;
    }
</style>