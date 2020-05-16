let app = getApp();

Page({
  data: {
    active: 1,
  },
  
  onChange(event) {
    this.setData({ active: event.detail });
  },
  
  onShow() {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              console.log("index页面查看是否授权", res)
              // todo 从数据获取用户信息
              // 用户已经授权过
              // wx.switchTab({
              //     url: "/pages/index/index"
              // })
              wx.setStorageSync("isAuthorized", true)
            }
          });
        }
      }
    })
  },
})