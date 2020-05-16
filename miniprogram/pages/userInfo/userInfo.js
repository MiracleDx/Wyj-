let app = getApp();

Component({
    data: {
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isAuthorized: false
    },

    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached() {
            let that = this;
            // 查看是否授权
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: function (res) {
                                console.log("用户信息页查看是否授权", res)
                                // todo 从数据获取用户信息
                                // 用户已经授权过
                                // wx.switchTab({
                                //     url: "/pages/index/index"
                                // })
                                that.setData({
                                    isAuthorized: true
                                })

                                wx.setStorageSync("isAuthorized", true)
                                // 获取用户地理位置
                                wx.getLocation({
                                    success: (res) => {
                                        console.log('用户信息页已获取授权并获取地理位置成功：', res)
                                    },
                                    fail: (res) => {
                                        console.log('失败：', res)
                                    },
                                })
                            }
                        });
                    }
                }
            })
        }
    },
    
    methods: {
        bindGetUserInfo(e) {
            if (e.detail.userInfo) {
                console.log("登陆查看是否授权", e.detail.userInfo)
                // 用户按了允许授权按钮
                // todo 可以插数据进入数据库 
                // 授权成功后，跳转进入小程序首页
                // wx.switchTab({
                //     url: "/pages/index/index"
                // })
                this.setData({
                    isAuthorized: true
                })

                wx.setStorageSync("isAuthorized", true)
                // 获取用户地理位置
                wx.getLocation({
                    success: (res) => {
                        console.log('登陆已获取授权并获取地理位置成功：', res)
                    },
                    fail: (res) => {
                        console.log('失败：', res)
                    },
                })
            } else {
                //用户按了拒绝按钮
                wx.showModal({
                    title:'用户授权',
                    content:'拒绝授权将无法体验完整功能，建议打开授权',
                    showCancel:false,
                    confirmText:'返回授权',
                    success:function(res){
                        if (res.confirm) {
                            console.log('用户点击了返回授权')
                        }
                    }
                })
            }
        },

        //获取用户信息接口
        queryUserInfo: function () {

        },
    }
   
})
