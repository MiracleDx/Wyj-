Component({
    
    data: {
        backgrounds: [
            "/pages/article/background.jpg",
            "/pages/article/background2.jpg",
            "/pages/article/background3.jpg"
        ],
        articles: [],
        offset: 0,
        count: 20
    },

    lifetimes: {
        attached() {
            wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
            let that = this;
            let query = async () => {
               return await wx.cloud.callFunction({
                    // 云函数名称
                    name: 'article',
                    // 传给云函数的参数
                    data: {
                        offset: this.data.offset,
                        count: this.data.count,
                    }
                })
            }
            query().then((res) => {
                that.setData({
                    articles: res.result.articles.item
                })
                wx.hideToast()
            })
        }
    },
    
    methods: {
        selectArticle(event) {
            let url = event.currentTarget.dataset.url
            url = encodeURIComponent(url)
            console.log(url)
            wx.navigateTo({
                url: "/pages/article/webview/webview?url=" + url
            })
        },
    }
})