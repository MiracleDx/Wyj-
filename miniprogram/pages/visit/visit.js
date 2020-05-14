let app = getApp();

Component({
  data: {
    value: '',
    area: [{ text: '全部区域', value: 'all' }],
    level: [{ text: '全部医院', value: 'all' }],
    space: [
      { text: '默认距离', value: 0 },
      { text: '最近', value: 1 },
      { text: '最远', value: 2 },
    ],
    areaValue: "all",
    levelValue: "all",
    spaceValue: 0,
    HospitalInfoWidth: 0,
    hospitalDetailHeight: 0,
    height: 0,
    hospitals: [],
    hospitals_tmp: []
  },

  methods: {
    selectDetail(event) {
      console.log(event.currentTarget.dataset.gid)
    },

    // 搜索栏change事件
    onChangeSearch(e) {
      this.setData({
        value: e.detail,
      });
      console.log(e.detail)
    },

    // 选项卡area change事件 todo 处理距离排序
    onChangeAreaOption(e) {
      // 都选中全部 恢复数组
      if (e.detail === 'all' && this.data.levelValue === 'all') {
        this.setData({
          hospitals: this.data.hospitals_tmp,
          areaValue: e.detail
        })
        return;
      }

      let arr = this.data.hospitals_tmp
      
      if (e.detail !== 'all') {
        arr = arr.filter(data => data.area === e.detail)
      }

      // 等级处理
      if (this.data.levelValue !== 'all') {
        arr = arr.filter(data => data.level === this.data.levelValue)
      }

      this.setData({
        hospitals: arr,
        areaValue: e.detail
      })
    },

    // 选项卡level change事件 todo 处理距离排序
    onChangeLevelOption(e) {
      // 都选中全部 恢复数组
      if (e.detail === 'all' && this.data.areaValue === 'all') {
        this.setData({
          hospitals: this.data.hospitals_tmp,
          levelValue: e.detail
        })
        return;
      }

      let arr = this.data.hospitals_tmp

      if (e.detail !== 'all') {
        arr = arr.filter(data => data.level === e.detail)
      }

      // 区域处理
      if (this.data.areaValue !== 'all') {
        arr = arr.filter(data => data.area === this.data.areaValue)
      }

      this.setData({
        hospitals: arr,
        levelValue: e.detail
      })
    },

    // 选项卡距离 change事件 todo 处理距离排序
    onChangeSpaceOption(e) {
      console.log(e)
    },
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
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
      wx.createSelectorQuery()
          .in(this)
          .select(".tool")
          .boundingClientRect()
          .selectViewport()
          .scrollOffset().exec((res) => height = height - res[0].height);
      // 减去医院详情和顶部工具栏的间隔 tab栏的距离 两个预估的hospital距离
      height = height - 10 - app.globalData.tabBarHeight - 140;
      this.setData({
        hospitalDetailHeight: height
      });
      
      
      // 获取数据库引用
      const db = wx.cloud.database();
      // 查询数据
      let that = this
      db.collection('hospital').get({
        success(res) {
          // 获取医院信息
          let hospitals = []
          for (let i = 0; i < 20; i++) {
            res.data.forEach(data => {
              hospitals.push(data)
            })
          }

          // 异步处理选项卡的任务
          let func = function(arr) {
            return new Promise(((resolve, reject) => {
              let temp = [];
              if (arr) {
                let t = [...new Set(arr)];
                t.forEach(data => {
                  temp.push({
                    "text": data,
                    "value": data
                  })
                });
                // 成功回调
                return resolve(temp)
              } else {
                // 失败回调
                return reject(temp)
              }
            }))
          };
          
          // todo 计算距离
          
          // 设置区域
          func(hospitals.map(data => data.area))
              .then(data => {
                data.unshift({"text": "全部区域", "value": "all"})
                that.setData({
                  area: data
                })
              });
          // 设置等级
          func(hospitals.map(data => data.level))
              .then(data => {
                data.unshift({"text": "全部医院", "value": "all"})
                that.setData({
                  level: data,
                })
              })
          
          // 赋值医院变量
          that.setData({
            hospitals: hospitals,
            hospitals_tmp: hospitals
          })
        }
      });
    }
  }
});