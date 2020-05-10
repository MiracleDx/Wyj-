Component({
  data: {
    value: '',
    area: [
      { text: '全部区域', value: 0 },
      { text: '海淀区', value: 1 },
      { text: '丰台区', value: 2 },
    ],
    level: [
      { text: '全部医院', value: 0 },
      { text: '三甲', value: 1 },
      { text: '二甲', value: 2 },
    ],
    space: [
      { text: '默认距离', value: 0 },
      { text: '最近', value: 1 },
      { text: '最远', value: 2 },
    ],
    areaValue: 0,
    levelValue: 0,
    spaceValue: 0,
    HospitalInfoWidth: 0
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
    console.log(e.detail)
  },

  methods: {
    selectDetail(event) {
      console.log(event)
    },
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      let width = wx.getSystemInfoSync().windowWidth - 95;
      this.setData({
        HospitalInfoWidth: width
      });
    }
  }
});