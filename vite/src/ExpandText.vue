<template>
  <div class="content" ref="content" :class="{pack: showBtn}">
    {{ text }}
    <span v-show="showBtn" class="btn">
      ...<span style="color: blue;cursor: pointer;" @click="showBtn = false">更多</span>
    </span>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    text: String
  },
  setup () {
    const showBtn = ref(false);
    const content = ref(null);

    onMounted(() => {
      let { lineHeight, height } = getComputedStyle(content.value);
      showBtn.value = parseFloat(height) / parseFloat(lineHeight) > 2;
    });

    return {
      content,
      showBtn
    };
  }
}
</script>

<style scoped>
button { color: red }

.content {
  line-height: 24px;
  overflow: hidden;
  position: relative;
}

.btn {
  position: absolute;
  right: 0;
  bottom: 0;
  line-height: 24px;
  background: #fff;
}
</style>
