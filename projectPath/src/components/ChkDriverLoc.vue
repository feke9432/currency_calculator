<template>
  <div class="ChkDriverLoc">
      <group>
        <cell title="name" v-model="name"></cell>
        <cell title="CarNum" v-model="carNum"></cell>
        <popup-radio title="chooseStatus" :options="statusList" v-model="nowstats"></popup-radio>
      </group>

      <div class="box">
        <swiper height="200px" @on-index-change="changeStatus">
          <swiper-item>
            <div class="stayStatus">
              <h3>I Am Staying</h3>
              <popup-radio title="choosePlace" :options="placeList" v-model="stayplace"></popup-radio>
            </div>
          </swiper-item>
          <swiper-item class="runStatus">
            <h3>I Am On The Way</h3>
            <popup-radio title="Old" :options="placeList" v-model="runoldplace" @on-hide="isSames"></popup-radio>
            <popup-radio title="New" :options="placeList" v-model="runwillplace" @on-hide="isSames"></popup-radio>
          </swiper-item>
          <swiper-item class="offStatus">
            <h3>I Am Off The Work.</h3>
            <img src="../assets/liedown.jpg" alt="">
          </swiper-item>
        </swiper>
      </div>

      <div class="rainbow"></div>

      <toast type="warn" v-model="istoast" >{{ toastText }}</toast>
  </div>
</template>

<script>
import { Group, XInput, Cell, Loading, Toast, PopupRadio, Swiper, SwiperItem } from "vux";
export default {
  components: {
    XInput,
    Group,
    Cell,
    Loading,
    Toast,
    PopupRadio,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      name: 'Ecro',
      carNum: 771,
      statusList: ['stay', 'run', 'offwork'],
      nowstats: '',
      stayplace: 'pearl plaza',
      placeList: ['pearl plaza', 'sea', 'solaier', 'solamarry', 'shore'],
      runoldplace: 'pearl plaza',
      runwillplace: 'sea',
      istoast: false,
      toastText: 'Choose Same'
    }
  },
  methods: {
    isSames () {
      var flag = this.runoldplace === this.runwillplace;
      if (flag) {
        this.istoast = true;
      }
    },
    changeStatus (inx) {
      if (inx === 0) {
        console.log('滑到stay')
        this.stayplace = this.runwillplace;
      } else if(inx === 1) {
        console.log('滑到run')
        this.runoldplace = this.stayplace;
      } else if (inx === 2) {
        console.log('滑到offwork')
      }
    }
  }
};
</script>

<style >
  .ChkDriverLoc .vux-cell-value {
    font-size: 20px;
    color: white;
  }
  .ChkDriverLoc h3 {
    padding: 8px;
    text-align: center;
    font-size: 28px;
  }
  .stayStatus {
    position: relative;
    height: 100%;
    background: #04be02 ;
    color: white;
  }
  .stayStatus .stayplace {
    position: absolute;
    width: 92%;
    transform: translate(0, -50%);
    top: 50%;
    left: 0;
  }
  .runStatus {
    color: white;
    background: #37aefc;
  }
  .offStatus {
    color: white;
    background: #fc378c;
  }
  .rainbow {
    height: 100px;
    width: 100%;
    background: -webkit-image-set()
  }
</style>
