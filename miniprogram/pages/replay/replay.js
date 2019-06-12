var that
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    openid: '',
    content: '',
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;//发帖者id
    that.jugdeUserLogin();
  },

  bindKeyInput(e) {
    that.data.content = e.detail.value;
    console.log("内容：" + that.data.content)

  },

  saveReplay: function() {
    db.collection('replay').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: that.data.content,
        date: new Date(),
        r_id: that.data.id,
        u_id: that.data.openid,//回复者id
        t_id: that.data.id,
        user: that.data.user
      },
      success: function(res) {
        wx.showToast({
          title: '发射成功',
        })
        setTimeout(function() {
          wx.navigateBack({
            url: "../homeDetail/homeDetail?id=" + that.data.id + "&openid=" + that.data.openid
          })
        }, 1500)

      },
      fail: console.error
    })
  },

  /**
   * 判断用户是否登录
   */
  jugdeUserLogin: function (event) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.data.user = res.userInfo;
              console.log(that.data.user);
            }
          })
        }
      }
    })
  },

})