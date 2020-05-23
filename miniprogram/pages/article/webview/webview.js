Page({
    data: {
        url: ""
    },

    onLoad (options) {
        let url = decodeURIComponent(options.url)
        console.log(url)
        this.setData({
            url: url
        })
    }
})