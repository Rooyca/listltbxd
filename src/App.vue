<script setup>

</script>

<template>
    <nav class="navbar navbar-expand bg-white-50 position-absolute top-0 start-0 w-100">
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/check-status">Status</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/get-list-ID">All</router-link>
                </li>
            </ul>
         </div>
    </nav>
  <router-view></router-view>
  <footer>
    <p>
            Created with <i class="fa fa-heart"></i> by
            <a target="_blank" href="https://linktr.ee/rooyca">rooyca</a>
        </p>
    </footer>
</template>

<style scoped>
.navbar-collapse a {
    color: whitesmoke;
    text-shadow: 1px 2px 1px black;
    font-size: 20px;
}
.navbar-collapse ul {
    position: relative;
    left: 50%;
    transform: translate(-50%);
}
ul{
	display: flex;
  text-align: center;
  justify-content: center;
	width: 100%;
	max-width: 1000px;
  font-family: 'Sucrose Bold Two';
}
li {
  text-transform: uppercase;
  cursor: pointer;
  color: #ebebeb;
  border-radius: 10%;
}

li:hover {
  background-color: rgba(190, 71, 71, 0.658);
  background-size: 100% 100%;
  color: #27262c;
  animation: spring 300ms ease-out;
  text-shadow: 0 -1px 0 #ef816c;
	font-weight: bold;
}

@keyframes spring {
  15% {
    -webkit-transform-origin: center center;
    -webkit-transform: scale(1.2, 1.1);
  }
  40% {
    -webkit-transform-origin: center center;
    -webkit-transform: scale(0.95, 0.95);
  }
  75% {
    -webkit-transform-origin: center center;
    -webkit-transform: scale(1.05, 1);
  }
  100% {
    -webkit-transform-origin: center center;
    -webkit-transform: scale(1, 1);
  }
}
</style>