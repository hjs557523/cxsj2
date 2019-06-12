// pages/studyplan/studying/studying.js
//获取应用实例
//全局变量
var app = getApp();
var datas;
var finishdatas;
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    haha: 'my var',
    list: [],
    textresult: "sdfsfsdf",
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../myview/myview',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面第一次加载时触发,之后从二级页面回来时不会触发
   */
  onLoad: function (options) {
    that = this;//初始化全局变量,指向该对象

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 每次小程序启动,或从后台进入前台显示,或从二级页面回来时都会触发
   */
  onShow: function () {
    var date = new Date();
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var str = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + week[date.getDay()];
    this.setData({
      date: str
    });


    //要注意.这里取出来的是值的复制
    datas = wx.getStorageSync('key');
    console.log('datas', datas);
    this.calculateRemain(datas);
    finishdatas = wx.getStorageSync('finishedata');
    if (datas) {
      this.setData({ list: datas });
    }
  },



  addPlan: function () {
    var path = '../addplan/addplan';
    wx.navigateTo({
      url: path,
    })
  },


  //点击出现下拉菜单
  tapList: function (event) {
    var id = event.currentTarget.id;
    var flag = !datas[id].isShow;
    for (var i = 0; i < datas.length; i++) {
      datas[i].isShow = false;
    }
    datas[id].isShow = flag;
    this.setData({
      list: datas
    });
  },


  //点击完成任务
  tapFinish: function (event) {
    console.log('event', event)
    this.finish(event.currentTarget.id);
  },


  //点击放弃任务
  tapAbandon: function (event) {
    console.log('tapAbandon');
    this.abandon(event.currentTarget.id);
  },

  calculateRemain: function (list) {
    list.map(function (value, index, array) {
      console.log('value', value);
      console.log('object', array[index]);
      var finishTime = new Date(value.time);//年月日
      var currentTime = new Date();
      var remain = finishTime - currentTime;

      array[index].remainTime = Math.floor(remain / 1000 / 60 / 60 / 24) + 1;
    });

    console.log('list', list);
  },


  //定义完成任务函数
  finish: function (id) {
    wx.showModal({
      title: '完成任务',
      content: '请确认您已经完成了任务，不要作弊哦!',
      success: function (res) {
        if (res.confirm) {
          var data = datas.splice(id, 1);//从待执行任务数组中删除并返回被删除的所有元素(数组形式)

          //如果没有缓存内容
          if (!finishdatas) {
            finishdatas = new Array();
          }

          data[0].completeTime = new Date().getDate;//返回月份中的某一天
          var d = new Object();
          d.text = data[0].text;
          d.time = data[0].time;
          var dt = new Date();
          d.completeTime = dt.Format('YYYY-MM-dd');
          console.log('d', d);
          finishdatas.push(d);

          //之前操作的是值的复制品,并没有直接修改缓存里的内容,即不是修改指针指向的内容,所以要进行重新保存
          wx.setStorageSync('key', datas);
          wx.setStorageSync('finishedata', finishdatas);

          //更新页面数据
          that.setData({ list: datas });
        }
      }
    })
  },


  //定义放弃任务函数
  abandon: function (id) {
    wx.showModal({
      title: '放弃任务',
      content: '坚持就是胜利，您真的要放弃该计划吗？',
      success: function (res) {
        if (res.confirm) {
          var data = datas.splice(id, 1);
          wx.setStorageSync('key', datas);

          //更新页面数据
          that.setData({ list: datas })
        }
      }
    })
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