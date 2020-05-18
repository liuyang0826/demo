<template>
  <div class="content" ref="contentRef" :class="{pack: showBtn}">
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
    const contentRef = ref(null);
    onMounted(() => {
      let { lineHeight, height } = getComputedStyle(contentRef.value);
      console.log(height, lineHeight);
      showBtn.value = parseFloat(height) / parseFloat(lineHeight) > 2;
    });
    return {
      contentRef,
      showBtn
    };
  }
}
</script>

<style scoped>
.content {
  line-height: 24px;
  overflow: hidden;
  position: relative;
  background: url("./logo.png");
}

.pack {
  height: 48px;
}

.btn {
  position: absolute;
  right: 0;
  bottom: 0;
  line-height: 24px;
  background: #fff;
}
</style>
