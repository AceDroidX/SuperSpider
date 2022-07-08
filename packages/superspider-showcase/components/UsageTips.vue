<template>
  <p class="text-body-2" @click="updateTips()">
    <v-icon dense>mdi-lightbulb-on-outline</v-icon>{{ tipsText }}
  </p>
</template>

<script>
export default {
  name: 'UsageTips',
  data() {
    return {
      allText: [
        '点我看下一条使用提示',
        'SC显示数量的最大限制为1000条',
        '网页是动态自适应的！因此您可以在各种设备上使用，或者将浏览器窗口调整到您所需的大小',
        '您可以复制链接并粘贴进OBS浏览器源使用',
        '点击一条SC即可标记为已读',
        '点击头像可以跳转至用户主页',
        '您可以点击工具栏的太阳图标(右上角)切换亮/暗色主题',
        '网页的亮/暗色主题可以跟随系统设置',
      ],
      tipsText: '',
    }
  },
  mounted() {
    this.updateTips()
  },
  methods: {
    updateTips() {
      this.tipsText =
        this.allText[Math.floor(Math.random() * this.allText.length)]
    },
  },
}
</script>

<style>
</style>
