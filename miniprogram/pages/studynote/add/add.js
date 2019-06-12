// pages/studynote/add/add.js
// 第一次新增笔记页面
const util = require('../../../utils/util.js')
const shareData = require('../../../utils/shareData.js')
Page({

  /**
   * 页面的初始数据
   * 需要在页面上渲染的数据
   */
  data: {
    title: '',//获取笔记记录的标题
    value: '',
    time: '',
    memoLists: [] //数组存放所有笔记记录
  },

  /**
   * 生命周期函数--监听页面加载
   * 初始化渲染出页面的笔记数据
   */
  onLoad: function (options) {
    var that = this;
    try {
      var value = wx.getStorageSync('memoLists');
      if (value) {//非空
        that.setData({
          memoLists: value
        })
      }
    } catch (e) { }

  },

  //点击返回键返回首页
  back: function () {
    wx.redirectTo({
      url: '/pages/studynote/index/index'
    })
    console.log('add.js的back函数被执行了');
  },


  //获取笔记记录标题
  memoTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },


  //获取笔记记录详细值
  getMemoValue: function (e) {
    this.setData({
      value: e.detail.value
    })
  },


  //保存备忘录
  saveMemo: function () {
    var that = this;
    var stamp = +new Date(); //获取当前毫秒时间戳
    //js中若单独调用new Date(),显示这种格式 April 21 10:10:43 UTC+0800 2019
    //获取时间戳有如下几种推荐方法
    //var timestamp = (new Date()).valueOf();  返回Date对象的原始值
    //var timestamp = new Date().getTime();    返回1970.1.1至今的毫秒数
    //var timestamp += new Date();             new Date()参与计算会自动转换为1970.1.1开始的毫秒数

    var time = util.format(stamp);//转换成标准时间格式
    var title = that.data.title;
    var memo_value = that.data.value;

    if (title == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1000
      })
    } else {
      //数组开头加入一条新纪录{"title": title,"text": memo_value,"time": time},格式为JSON对象格式
      that.data.memoLists.unshift({ "title": title, "text": memo_value, "time": time });
      //arrayObject.unshift(newelement1,newelement2,....,newelementX)  向数组的开头添加一个或多个元素,并返回新的长度
      //arrayObject.push(newelement1,newelement2,....,newelementX)     向数组的末尾添加一个或多个元素,并返回新的长度
      //arrayObject.shift()  把数组第一个元素从其中删除,并返回第一个元素的值
      //arrayObject.pop()  把数组最后一个元素从其中删除,并返回最后一个元素的值
      try {
        wx.setStorageSync('memoLists', that.data.memoLists)
      } catch (e) {
        wx.showToast({
          title: '保存失败',
          icon: 'error',
          duration: 2000
        })
      }
      wx.redirectTo({
        url: '/pages/studynote/index/index'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    //关于 "==" 和 "===" 
    //"==":类型不同，会自动转换类型，再做值比较
    //"===":必须类型相同和值相同,不同直接返回false
    if (res.from === 'button') {
      //来自页面内的转发按钮
      console.log(res.target);
    }
    return {
      title: shareData[Math.round(Math.random() * (shareData.length - 1))],
      //Math.round(x)   把数字x舍入为最接近的整数
      //Math.random()   返回介于 0（包含） ~ 1（不包含） 之间的一个随机数
      path: '/pages/index/index',
      imageUrl: '../../../images/share.png',
      success: function (res) {
        console.log('已转发');
      },
      fail: function (res) {
        console.log('用户取消转发');
      }
    }
  }
})