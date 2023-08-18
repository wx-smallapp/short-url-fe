<script setup lang="ts">
import axios, { type HeadersDefaults } from "axios"
import { ref } from "vue";
let originUrl = ref("");
let shortUrlResult = ref("");
function genShortUrl() {
    axios.defaults.headers = {
        "Content-Type": "application/json"
    } as any
    // https://meumfj-sqgvog-3000.preview.myide.io/gen
    axios.post("/gen", { originUrl: originUrl.value }).then((response) => {
        console.log(response.data)
        // if (response.data?.result?.shortUrl) {
        //     shortUrlResult.value = response.data.result.shortUrl
        // } else {
        //     shortUrlResult.value = ""
        // }
        if (response.data.status == 1) {
            shortUrlResult.value = response.data.data.shortUrl
        } else {
            shortUrlResult.value = ""
        }
    }).catch(error => {
        console.log(error)
    })
}
</script>

<template>
    <div class="container">
        <div class="box">
            <input v-model="originUrl">
            <button @click="genShortUrl">生成短地址</button>
            <div v-if="shortUrlResult != ''">
                恭喜您，您的短地址是: <a :href="shortUrlResult">{{ shortUrlResult }}</a>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    height: 100vh;
    background-color: #f8f8f8;
}
.container .box {}
</style>
