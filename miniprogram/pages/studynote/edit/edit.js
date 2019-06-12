// pages/studynote/edit/edit.js
// 修改笔记页面
const util = require('../../../utils/util.js');//引入util模块
const shareData = require('../../../utils/shareData.js');//引入shareData模块

//Page(Object object)
//注册小程序中的一个页面。接受一个Object类型参数,其指定页面的初始数据、声明周期回调、事件处理函数等
Page({
  /**
   * (1)页面第一次渲染时的初始数据,页面加载时，data 将会以JSON字符串的形式由逻辑层传至渲染层，
   * (2)因此data中的数据必须是可以转成JSON的类型：字符串，数字，布尔值，对象，数组。
   * (3)渲染层可以通过WXML对数据进行绑定
   */
  data: {
    id: '',
    title: '',
    value: '',
    time: '',
    memoLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   * 作用:页面加载时触发。一个页面只会调用一次,可以在onLoad的参数中获取打开当前页面路径中的参数
   * 参数:options:Object类型,包含当前页面路由过程中传递的参数,这里是接收从index.wxml传过来的参数
   * 
   */
  onLoad: function (options) {
    var that = this;
    if (that.data.title != 'undefined' || that.data.title != '' || that.data.value != 'undefined' || that.data.value != '') {
      that.setData({
        id: options.id,      //获取选中的该笔记记录的id
        title: options.title,//获取选中的该笔记记录的标题
        value: options.value,//获取选中的该笔记记录的内容
        time: options.time   //获取选中的该笔记记录上一次的编辑时间
      });
      console.log('edit.js的onLoad函数被加载');
      console.log('从index页面传过来的参数:' + that.data);
    }
    try {
      var value = wx.getStorageSync('memoLists');
      if (value) {
        that.setData({
          memoLists: value
        })
        console.log('缓存中存储的数据:' + memoLists);
      }
    } catch (e) { }

  },

  /**
   * 返回首页
   */
  back: function () {

    wx.redirectTo({
      url: '/pages/studynote/index/index'
    });
    console.log('edit.js的back函数被执行了');

  },

  /**
   * 获取笔记记录新标题
   */
  memoTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
    console.log(e.detail.value);
    console.log('edit.js的memoTitle被执行了');
  },

  /**
   * 获取笔记记录新内容
   */
  getMemoValue: function (e) {
    this.setData({
      value: e.detail.value
    })
    console.log(e.detail.value);
    console.log('edit.js的getMemoValue被执行了');
  },

  /**
   * 保存修改后的笔记
   */
  saveMemo: function () {
    var that = this;
    var stamp = +new Date();          //获取当前时间戳
    var time = util.format(stamp);    //转换成标准时间格式
    var title = that.data.title;      //获取当前页面笔记新标题
    var memo_value = that.data.value; //获取当前页面笔记新内容
    var editMemo = that.data.memoLists[that.data.id];//根据笔记记录id获得对应的原笔记记录

    if (title == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 800
      })
    }

    else {//如果笔记标题更改,或内容更改
      if (editMemo.title != title || editMemo.text != memo_value) {
        editMemo.time = time;//修改为当前新的编辑时间
      } else {
        editMemo.time = that.data.time;//保存为上一次的编辑时间
      }
      editMemo.title = title;
      editMemo.text = memo_value;

      try {
        wx.setStorageSync('memoLists', that.data.memoLists);//保存修改后的笔记
        wx.navigateTo({
          url: '/pages/studynote/index/index'
        })
      } catch (e) {
        wx.showToast({
          title: '保存失败',
          icon: 'error',
          duration: 2000
        })
      }
    }

    console.log('edit.js的saveMemo函数被执行了');
  },

  //删除笔记记录
  delMemo: function () {
    var that = this;
    try {
      that.data.memoLists.splice(that.data.id, 1);//删除指定下标的值
      wx.setStorageSync('memoLists', that.data.memoLists); //同步更新列表缓存
      if (that.data.memoLists.length == 0) {
        wx.clearStorageSync();//同步清理本地数据缓存
      }
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 800
      });
      //删除成功后刷新页面
      setTimeout(function () {
        wx.redirectTo({
          url: '/pages/studynote/index/index'
        });
      }, 500);
    } catch (e) { }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})