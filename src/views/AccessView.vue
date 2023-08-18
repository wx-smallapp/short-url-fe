<script setup lang="ts">
import axios from "axios"

import { onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

let randomCode = ref("")

let errorMessage = ref("")

let shortUrlExist = ref(true)

// 点击链接 => 前端拿到随机码 => 访问后端 /t/[randomCode] => 后端查库 => 查到对应长地址重定向

// 点击链接 变成/t/originUrl nginx 返回502 后端报错  (nginx拦截了) => (前端有匹配路由，/t 但是，同时也被nginx拦截了) => 改成hash模式
onMounted(async () => {
    console.log(route.params.randomCode)
    randomCode.value = route.params.randomCode as string;

    // https://meumfj-sqgvog-3000.preview.myide.io
    // try {
    //     let result = await axios.get(`/backend/${route.params.randomCode}`)
    //     console.log(result.data)
    //     window.location.href = result.data.data.originUrl
    // } catch (error: AxiosError) {
    //     if (error.response.data.status == 0) {
    //         shortUrlExist.value = false
    //         errorMessage.value = error.response.data.message
    //     }
    // }

    axios.get(`/backend/${route.params.randomCode}`).then((result) => {
        console.log(result.data)
        window.location.href = result.data.data.originUrl
    }).catch((error) => {
        if (error.response.data.status == 0) {
            shortUrlExist.value = false
            errorMessage.value = error.response.data.message
        }
    })
})

</script>

<template>
    <div>
        <span v-if="!shortUrlExist">抱歉, 此短链接不存在</span>
        AccessView
    </div>
</template>
