<template>
  <div id="calculator">
    <h2 class="cal-title"><span>简易实时汇率计算器</span><router-link to="/home" class="closeBtn" style="">关闭</router-link></h2>
      <group title="此计算器系上方货币种类转换为下方货币种类，并实时读取货币数据，每天更新一次">
          <popup-radio title="选择转换货币" :options="list1" v-model="cal1"></popup-radio>
          <popup-radio title="选择转换货币" :options="list1" v-model="cal2"></popup-radio>
          <x-input title="输入金额" v-model="num1" type="number"></x-input>
          <cell title="转换后金额" v-model="num2"></cell>
          <cell title="汇率更新时间" v-model="time"></cell>
          <loading :show="isload" :text="loadText"></loading>
          <toast v-model="istoast" >{{ toastText }}</toast>
      </group>
      
      <div class="watchBox">
          
      </div>
  </div>
</template>

<script>
/* 采用 免费 api [https://1forge.com/forex-data-api/api-documentation] */
import { Group, XInput, PopupRadio, Cell, Loading, Toast } from "vux";
export default {
  components: {
    XInput,
    Group,
    PopupRadio,
    Cell,
    Loading,
    Toast
  },
  data() {
    return {
      url: 'http://218.93.207.96:3000',
      apiKey: "fcfc3e8ec3786e71dd638de39e301d0b",
      cal1: "人民币CNY",
      cal2: '菲律宾比索PHP',
      num1: 0,
      nowCurr: 0,
      time: '',
      list1: [],
      isload: false,
      loadText: '加载中',
      istoast: false,
      toastText: '数据出错'
    };
  },
  computed : {
    num2: function () {
      return this.num1 * this.nowCurr;
    }
  },
  watch: {
    cal1: function (item) {
      if (this.cal2 == item) {
        this.istoast = true;
        return this.toastText = '输入同样的货币种类可不行哟';
      }
      this.getCurrency()
    },
    cal2: function (item) {
      if (this.cal1 == item) {
        this.istoast = true;
        return this.toastText = '输入同样的货币种类可不行哟';
      }
      this.getCurrency()
    }
  },
  // ?key=fcfc3e8ec3786e71dd638de39e301d0b&from=${/[a-zA-Z]+/g.exec(this.cal1)}&to=${/[a-zA-Z]+/g.exec(this.cal2)}
  methods: {
    getAllCountry() {
      var _self = this;
      _self.isload = true;
      this.$http.get(_self.url + "/getList").then(res => {
        _self.isload = false;
        if (res.data.error_code === 0) {
          _self.list1 = _self.changeData(res.data.result.list);
        } else {
          console.error("聚合数据请求汇率接口出错");
        }
      });
    },
    // 将汇率数据翻译成想要的样子
    changeData(data) {
      var oData = data && data.length > 0 ? data : [];
      var nData = [];
      oData.forEach(item => {
        nData.push(item.name + item.code);
      });
      return nData;
    },
    getCurrency() {
      var _self = this;
      _self.isload = true;
      this.$http.get(_self.url + `/currency?from=${_self.cal1.match(/[a-zA-Z]+/)}&to=${_self.cal2.match(/[a-zA-Z]+/)}`)
        .then((items) => {
          _self.isload = false;
          var item = items.data;
          if (item.error_code == 0) {
            _self.time = item.result[0].updateTime
            _self.nowCurr = item.result[0].result
          } else {
            console.log('请求实时汇率接口出错')
          }
        })
    }
  },
  mounted: function() {
    this.getAllCountry();
    this.getCurrency();
  }
};
</script>

<style>
  .v-transfer-dom .vux-popup-dialog {
    max-height: 70%;
  }
  .cal-title .closeBtn {
    float: right; 
    font-weight: normal; 
    font-size: .75em;
    padding: 2px 12px;
    border: 1px solid #666;
    background: #ccc;
    border-radius:8px;
  }
  .cal-title {
    padding: 8px;
  }
  .cal-title .closeBtn:active {
    background: red;
    color: white;
    font-weight: bold;
    box-shadow: 6px 6px 10px #ccc;
  }
</style>
