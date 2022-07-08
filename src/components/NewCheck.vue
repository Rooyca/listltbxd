<script setup>
import { useRouter } from 'vue-router';
import { toRefs } from 'vue';
import axios from 'axios';

const props = defineProps({
  url: String
})

const { url } = toRefs(props);

const router = useRouter();

const pushScan = myUrl => {
    router.push(`/check-status?id=${myUrl}`)
}
</script>

<template>
    <button type="button" class="btn btn-primary" @click="pushScan(url)">Check</button>
</template>