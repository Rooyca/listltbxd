<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

const responseURL = ref("")
const responseID = reactive({d:[]})
const urlRequest = ref("")
const positionRemainder = reactive({bottom: "18rem"})

const makeRequestURL = url => {
  const config = {url:'https://letbxl.herokuapp.com/lboxdlist/list', method:'POST', data: {"link": url}}
  axios(config)
  .then(res => {
    responseURL.value = res.data.task_id
    positionRemainder.bottom = "10rem"
    urlRequest.value = ""
    })
}

const makeRequestID = () => {
  const config = {url:'https://letbxl.herokuapp.com/lboxdlist/list', method:'POST', data: {"link": "https://letterboxd.com/peterstanley/list/1001-movies-you-must-see-before-you-die/"}}
  axios(config)
  .then(res => {
    responseID.d = res.data
    })
}
</script>

<template>
    <header>
        <div class="txt-all">
        <h1>Convert your <span> LETTERBOXD</span> list to JSON</h1>
        </div>
    <div class="search-box">
        <button class="btn-search" type="button" @click="makeRequestURL(urlRequest)"><i class="fas fa-search"></i></button>
        <input type="text" class="input-search" v-model="urlRequest" placeholder="Enter the URL...">
    </div>
  <div class="container-remainder" :style="positionRemainder">
    <p style="font-family: 'Montserrat', sans-serif;">
      <span style="text-shadow:1px 1px 3px black; color:lightcoral; font-weight: 600; ">REMEMBER: </span> 
          if the list has more than one page please specifie it 
          by putting '<span style="color:greenyellow">/page/1</span>' 
          (where '1' is the page number) at the end of the URL 
    </p>
  </div>
    <div class="txt-response" v-if="responseURL">
        Can track the status of your request with this ID: <p style="font-size: 18px;"><router-link :to="'/check-status?id='+responseURL" >{{responseURL}}</router-link></p>
    </div>
    </header>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,100&display=swap');
input{
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-weight: bolder;
}
.container-remainder::-webkit-scrollbar {
    width: 8px;     
    height: 8px;    
    display: none; 
}
.search-box{
  width: fit-content;
  height: fit-content;
  position: fixed;
  top: 11rem;
  right: 2rem;
}
.container-remainder {
    color:whitesmoke; 
    text-shadow: 0.5px 0.5px 9px whitesmoke; 
    padding: 2%;
    height: 10rem; 
    width: 24rem;
    background-color: rgba(0, 0, 0, 0.5); 
    overflow: auto;
    border-radius: 17px;
    position: absolute;
    left: 3.6%;
}
@media all and (max-width: 500px) {
  .container-remainder {
    padding-top: 9%;
  }
  .txt-response {
    left: 0%;
  }
}

@media all and (max-width: 400px) {
  .container-remainder {
    padding-top: 9%;
    width: 23rem;
    top: 70%;
  }
}
.input-search{
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  background-color: #dd4c3b;
  padding-right: 40px;
  color:#fff;
}
.input-search::placeholder{
  color:rgba(255,255,255,.5);
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search{
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color:#ffffff ;
  background-color:transparent;
  pointer-events: painted;  
}
.btn-search:focus ~ .input-search{
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
.input-search:focus{
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

/*  footer   */
footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida  Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
footer .fa-heart{
    color: red;
}
footer a {
    color: #3c97bf;
    text-decoration: none;
    margin-right:5px;
}
/* footer  */

/* Header */

@font-face {
  font-family: 'Sucrose Bold Two';
  src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/sucrose.woff2') format('woff2');
}

@font-face {
  font-family: 'IM Fell French Canon Pro';
  src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/im-fell-french-canon-pro.woff2') format('woff2');
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

header {
  background: url('/902437.jpg') no-repeat;
  padding-top: 61.93333333%;
  background-size: cover;
  font-family: 'Sucrose Bold Two';
  background-position: center;
}

header h1 {
  position: fixed;
  top: 2rem;
  right: 2rem;
  font-size: 2.4vw;
  line-height: .8;
  margin-top: 0;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 20px #db4a39;
}

header h1 span {
  display: block;
  font-size: 2.75vw;
}

.txt-response {
  color:white;
  position: fixed;
  font-weight: bolder;
  font-size: 15px;
  text-shadow: 1px 1px 3px black;
  bottom:20rem;
  text-align: center;
  margin: 9px;
  padding: 10px;
  padding-top: 23px;
  margin-top: 20px;
  background-color: #974e758a;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  width: 24rem;
  left: 3.3%;
}

@media all and (max-width: 500px) {
  .txt-response {
    left: 0%;
    top: 53%;
    height: 6rem;
    width: 23rem;
    font-size: 13px;
  }
  .txt-response a {
    font-size: 15px;
  }
}
.txt-response a {
  color: #41bd47d3;
}

@media all and (max-width: 1000px) {
  .txt-all span {
    font-size: 10vw;
  }
  .txt-all h1 {
    font-size: 10vw;
    right: 4rem;
    top: 14rem;
  }
  header {
    height: 212vw;
  }
  .search-box{
    position: relative;
    top: 7rem;
    left: 6rem;
  }
  .btn-search ~ .input-search{
  width: 250px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
}
  .btn-search:focus ~ .input-search{
  width: 250px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
}
.input-search{
  width: 250px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
}
.input-search::placeholder{
  color:rgba(255, 255, 255, 1);
  text-shadow: 1px 1px 5px gray;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}
}
@media all and (max-width: 650px) {
  .btn-search ~ .input-search{
    width: 400px;
  }
}
@media all and (max-width: 550px) {
  .btn-search ~ .input-search{
    width: 250px;
  }
}
</style>