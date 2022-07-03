<template>
  <div>
    <transition name="appMain" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.appMain-enter-active {
  animation: move .5s;
}

.appMain-leave-active {
  animation: move .5s reverse;
}

@keyframes move {
  0% {
    opacity: 0;
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
