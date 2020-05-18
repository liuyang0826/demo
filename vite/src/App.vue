<template>
  <div>
    <expand-text text="品管圈（QCC）就是由相同、相近或互补性质的工作场所的人们自动自发组成数人一圈的小圈团体（又称QC小组，一般6人左右），全体合作、集思广益，按照一定的活动程序来解决工作现场、管理、文化等方面所发生的问题及课题。它是一种比较活泼的品管形式。目的在于提高产品质量和提高工作效率。" />
    <div @click="handleAdd">点击</div>
    <div v-for="(item, index) in dataList" :key="index" @click="item.content = {},item.content.text = 'aaa'">
      内容{{item.content?.text}}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ExpandText from "./ExpandText.vue";

export default {
  components: { ExpandText },
  setup () {
    let dataList = ref([]);
    let handleAdd = () => {
      dataList.value[0] = {};
    };
    return {
      dataList,
      handleAdd
    };
  }
};
</script>

<style scoped>
button { color: red }

.content {
  line-height: 24px;
  overflow: hidden;
  position: relative;
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
