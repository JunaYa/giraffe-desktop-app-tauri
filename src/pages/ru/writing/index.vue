<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useScreenOrientation } from '@vueuse/core'
import type { Ref } from 'vue'
import { useLogto } from '@logto/vue'
import type { WritingKnowledge } from '~/@types/report'
import { getUnitData, getUserHomework, getUserUnitLearnReport } from '~/apis/modules/report'
import { getSignature } from '~/apis/modules/wechat'

const { signIn, signOut, isAuthenticated } = useLogto()
const onClickSignIn = () => signIn('http://169.254.59.208:3333/callback')
const onClickSignOut = () => signOut('http://169.254.59.208:3333')
const isLoading = ref(true)
const urlQuery = ref()
const data = ref()
const info = ref()
const userAnswer = ref('')
const knowledgeList: Ref<WritingKnowledge[]> = ref([])

const { isSupported, lockOrientation } = useScreenOrientation()
if (isSupported)
  lockOrientation('portrait-primary')

useHead({
  title: '学习报告',
  meta: [
    {
      name: 'description',
      content: '核桃写字学习报告',
    },
  ],
})

function loadImg(name: string) {
  return `//static.hetaoimg.com/tc3xej/${name}`
}

function bgImage(name: string): string {
  return `background-image: url(${loadImg(name)});`
}

interface Payload {
  params?: string[]
  ignores?: string[]
}

function getRoutePayload(query: Record<string, any>, { params, ignores }: Payload): String {
  let str = ''
  if (!query)
    return str

  const keys = Object.keys(query)
  if (keys.length) {
    keys.forEach((key, index) => {
      if (ignores && ignores.includes(key))
        return

      if (params?.includes(key)) {
        str += `${key}=${query[key]}`
        if (index !== keys.length - 1)
          str += '&'
      }
    })
  }
  return str
}
const route = useRoute()
urlQuery.value = route.query
onMounted (async () => {
  isLoading.value = true
  const requiredParams = ['userId', 'subjectId', 'classId', 'unitId', 'templateId', 'homeworkId', 'tenantId']
  const query = route.query
  const payload = getRoutePayload(query, { params: requiredParams })
  data.value = await getUserUnitLearnReport(getRoutePayload(query, { params: requiredParams, ignores: ['homeworkId'] }))
  userAnswer.value = await getUserHomework(payload)
  info.value = data.value.errCode === 0 ? data.value.data : {}
  knowledgeList.value = await getUnitData<WritingKnowledge>(payload)
  isLoading.value = false
  await getSignature()
})
</script>

<template>
  <PageLoading v-if="isLoading" background="#FFF" />
  <SingleScroll
    v-if="!isLoading && !!info" v-track="'userinfo'" stats-user_id="10010"
    stats-user_name="核桃111"
    bgimg-top
    class="pb-8 max-w-lg min-h-100vh text-center"
    :style="`${bgImage('3KJY74UBQ2.png')} background-color: #FDF7ED; color: #744426;`"
  >
    <SafeArea>
      <!-- header -->
      <div frb h-18>
        <div pl-4 @click="onBack">
          <img w-5 h-5 :src="loadImg('FESWQKY98B.png')">
        </div>
        <div frc bgimg :style="bgImage('6VSY4DLK3Y.png')">
          学习报告
        </div>
        <div pr-4 w-5 />
      </div>
    </SafeArea>
    <div v-if="isAuthenticated">
      <div>已登录</div>
      <button @click="onClickSignOut">
        退出登录
      </button>
    </div>
    <div v-else>
      <button @click="onClickSignIn">
        登录
      </button>
    </div>
    <div text-center text-xl font-medium mt-6 mb-15 style="color: #537E71;">
      {{ info.unitName }}
    </div>
    <div v-track="'userinfo'" stats-user_id="10010" stats-user_name="核桃222" :stats-query="urlQuery" relative w-24 h-24 ml-auto mr-auto frc @click="() => {}">
      <img rounded-20 w-20 h-20 :src="info.userAvatar || loadImg('LV3V6KIHSL.png')" class="avatar">
      <div absolute z-1 top-0 left-0 rounded w-24 h-24 bgimg :style="bgImage('XDPQUFJAXU.png')" />
    </div>
    <div mb-6 font-bold style="color: #8BB0A5">
      {{ info.userName || '小核桃' }}
    </div>
    <!-- 用户作业 -->
    <div ml-4 mr-4 mb-4 pl-6 pr-6 pt-6 pb-6 rounded-3 class="board">
      <div frc mb-6>
        <img h-12 :src="loadImg('DITXSYFVLZ.png')">
      </div>
      <img v-track.stop="'user-praise'" stats-user_id="1003" absolute top-12 left--4 w-24 h-24 :src="loadImg('2FJZO73EHW.png')">

      <template v-if="!userAnswer">
        <img :src="loadImg('45KYFY3Y3V.png')">
        <div>快去提交作业吧~</div>
      </template>
      <template v-else>
        <div relative rounded-2 p-1 class="wrapper" style="background-color: #fee7c7;">
          <img rounded-2 :src="userAnswer">
          <img animate-zoom-in animate-duration-300 absolute top--4 right--4 w-18 h-18 z-1 :src="loadImg('J3JTD6SB8Q.png')">
        </div>
        <img ml-auto mr--6 mb-1 h-6 block :src="loadImg('L4ZKJDQ855.png')">
        <div v-track.prevent="'selected_context'" stats-user_id="10014" text-left>
          希望你无所畏惧，大步向前，未来可期！
        </div>
      </template>
    </div>
    <!-- 坚持成果 -->
    <div ml-4 mr-4 mb-4 pl-4 pr-4 pt-6 pb-6 rounded-3 overflow-hidden class="board">
      <div frc mb-12>
        <img h-12 :src="loadImg('6TBK8IWAJS.png')">
      </div>
      <div fra font-medium>
        <div>
          <div>
            <span text-2xl class="mr-0.5">{{ info.duration || 0 }}</span>
            <span font-normal text-xs>分钟</span>
          </div>
          <div text-sm>
            完课时长
          </div>
        </div>
        <div>
          <div>
            <span text-2xl class="mr-0.5">{{ info.count || 0 }}</span>
            <span font-normal text-xs>道</span>
          </div>
          <div text-sm>
            互动答题
          </div>
        </div>
      </div>
      <img absolute left-0 top-0 w-auto h-48 :src="loadImg('J8ZMKKKOXD.png')">
      <img absolute right-0 top-0 bottom-0 w-28 :src="loadImg('4K38QF9LQZ.png')">
    </div>
    <!-- 知识掌握 -->
    <div ml-4 mr-4 mb-4 pl-4 pr-4 pt-6 pb-6 rounded-3 overflow-hidden class="board">
      <div frc mb-6>
        <img h-12 :src="loadImg('6TBK8IWAJS.png')">
      </div>
      <div v-for="(item, index) in knowledgeList" :key="index" frb mb-4 pl-1 pr-1>
        <img max-w-30 max-h-30 :src="item.webThumbnailUrl">
        <ul h-30 fca items-start grow text-left pl-4>
          <li v-for="(w, j) in item.writePointArr" :key="j">
            {{ w }}
          </li>
        </ul>
      </div>
    </div>
  </SingleScroll>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Confetti v-if="!isLoading" />
  </Teleport>
</template>

<style scoped>
.board {
  position: relative;
  background: #FFFFFF;
  box-shadow: 0 0 .14rem 0 #F5E6C3;
}
</style>
