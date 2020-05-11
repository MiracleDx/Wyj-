let app = getApp();

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
    HospitalInfoWidth: 0,
    hospitalDetailHeight: 0,
    height: 0
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
      console.log("aa", app.globalData)
      
      // 修改hospital距离
      let width = wx.getSystemInfoSync().windowWidth - 95;
      this.setData({
        HospitalInfoWidth: width
      });
      
      // 防止页面出现滚动条
      let height = wx.getSystemInfoSync().windowHeight;
      this.setData({
        height: height - 5
      });
      // 减去顶部工具栏距离
      wx.createSelectorQuery().in(this).select(".tool").boundingClientRect().selectViewport().scrollOffset().exec((res) => height = height - res[0].height);
      // 减去医院详情和顶部工具栏的间隔 tab栏的距离 两个预估的hospital距离
      height = height - 10 - app.globalData.tabBarHeight - 140;
      this.setData({
        hospitalDetailHeight: height
      })
    }
  }
});