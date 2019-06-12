// pages/studyplan/addplan/addplan.js
var datas;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTime: '点击选择计划完成日期',
    currentTime: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index);
    this.index = options.index;
    datas = wx.getStorageSync('key');
    if (!datas) {
      datas = new Array();
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var curTime = new Date().Format('YYYY-MM-dd');
    this.setData({ currentTime: curTime });
  },


  submit1: function (event) {
    var item = new Object();
    item.isShow = false;
    item.text = event.detail.value.input;
    item.time = event.detail.value.picker;
    item.remainTime = "";
    if (!item.text) {
      wx.showModal({
        title: '请输入计划名称',
        content: "",
        showCancel: false
      });
      return;
    }

    if (item.text.length > 20) {
      wx.showModal({
        title: '计划名称过长',
        content: '请不要超过20个字符',
        showCancel: false
      })
      return;
    }

    if (item.time == "点击选择计划完成日期") {
      wx.showModal({
        title: '请选择日期',
        content: "",
        showCancel: false
      });
      return;
    }

    datas.push(item);
    wx.setStorageSync('key', datas);
    wx.navigateBack({

    })
  },


  selectTime: function (event) {
    console.log(event);
    this.setData({ selectTime: event.detail.value });
  }



})


//自己封装的一个时间格式转换函数
//prototype 属性可以使我们有能力向对象添加属性和方法
//语法: object.prototype.name = value
Date.prototype.Format = function (formatStr) {
  var str = formatStr;
  var week = ['日', '一', '二', '三', '四', '五', '六'];

  //stringObject.replace(regexp/substr,replacement)
  //替换一个与正则表达式匹配的子串
  str = str.replace(/yyyy|YYYY/, this.getFullYear().toString());//从 Date 对象以四位数字返回年份。
  //function定义在Date内部,this指向Date

  str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));

  str = str.replace(/w|W/, week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());

  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getMinutes());

  return str;
}