let app = getApp()
Page(({
  data: {
    value: '',
    hospital: '',
    HospitalInfoWidth: 0,
    mainActiveIndex: 0,
    activeId: null,
    items: [
      {
        // 导航名称
        text: '内科',
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
        ],
      },
      {
        // 导航名称
        text: '内科',
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
        ],
      },
      {
        // 导航名称
        text: '内科',
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
          {
            // 名称
            text: '骨科',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '胸外科',
            id: 2,
          },
        ],
      }
    ],
    treeHeight: 0
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },
  
  onLoad(options) {
    console.log(options)
    let HospitalInfoWidth = JSON.parse(options.HospitalInfoWidth) 
    this.setData({
      hospital: options.hospital,
      HospitalInfoWidth: HospitalInfoWidth
    })

    // 获取屏幕长度
    let height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: height
    })

    // 减去顶部工具栏距离
    wx.createSelectorQuery()
        .in(this)
        .select(".header-container")
        .boundingClientRect()
        .selectViewport()
        .scrollOffset().exec((res) => height = height - res[0].height);

    let isPhoneX = false
    wx.getSystemInfo({
      success(res) {
        let model = res.model
        let iphoneArr = ['iPhone X', 'iPhone 11']
        iphoneArr.forEach(phone => {
          // iPhone X以上机型需要额外处理
          if (model.search(phone) !== -1) {
            isPhoneX = true
          }
        })
      }
    })
    height = height - 30 - (isPhoneX ? 150 : 80);
    this.setData({
      treeHeight: height
    })
  }
}))