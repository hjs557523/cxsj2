//app.js是项目的入口文件
//每个小程序都需要在app.js中调用App方法注册小程序示例，绑定生命周期回调函数、错误监听和页面不存在监听函数等
//整个小程序只有一个App实例，是全部页面共享的
//开发者可以通过getApp方法获取到全局唯一的App示例，获取App上的数据或调用开发者注册在App上的函数
App({
  //全局只触发一次
  //不要在 onLaunch 的时候调用 getCurrentPage()，此时 page 还没有生成。
  onLaunch: function() {

    this.globalData.phoneInfo.windowHeight = wx.getSystemInfoSync().windowHeight;

    var logs = wx.getStorageSync('logs') || [];
    var first = wx.getStorageSync('first');

    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);    

    //缓存没有记录
    if (!first) {
      var datas = new Array();

      var data0 = new Object();
      data0.isShow = false;
      data0.text = "打一场篮球赛";
      data0.time = "2020-02-02";
      //datas.push(data0);

      var data1 = new Object();
      data1.isShow = false;
      data1.text = "学习go语言";
      data1.time = "2020-03-03";
      //datas.push(data1);

      var data2 = new Object();
      data2.isShow = false;
      data2.text = "完成一次实习";
      data2.time = "2020-04-04";
      //datas.push(data2);

      var data3 = new Object();
      data3.isShow = false;
      data3.text = "完成一次旅行";
      data3.time = "2020-05-05";
      //datas.push(data3);

      datas.push(data0, data1, data2, data3);
      wx.setStorageSync('key', datas);
      wx.setStorageSync('first', true);
    }

    var datas = wx.getStorageSync('key');
    var finishes = wx.getStorageSync('finishedata');

    if (datas) {
      if (!finishes) {
        finishes = new Array();
      }
      this.handleOverTime(datas, finishes);
    }

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      openid: 'oLM575X8DAwc6rxmZMOJ4rPxbMdM',
      evn: 'hjs-vfa14',
      userInfo: null,
      requestUrl: "https://route.showapi.com/255-1",
      appid: "97256",
      apiKey: "5fc769d0e6434843a8a70c566aacb7e1",
      tText: '29',
      tImg: '10',
      tAudio: '31',
      tVideo: '41'
        
    }
  },

  //处理超时任务的函数
  handleOverTime: function (datas, finishes) {
    var dataCur = new Date();
    dataCur.setHours(0, 0, 0, 0);
    //dateObject.setHours(hour,min,sec,millisec)
    var dataCurrent = dataCur.valueOf();
    //dateObject.valueOf():返回date的毫秒表示
    console.log('valueOf1', dataCurrent);
    for (var i = datas.length - 1; i >= 0; i--) {
      console.log('sssss', datas);
      //console.log()支持的输出格式标志有:
      // %s     字符串
      // %d/%i  整数
      // %f     浮点数
      // %o/%O  object对象
      // %c     css样式
      // eg:console.log('%d + %d = %d',1,1,2)
      // 输出：1 + 1 = 2
      var dataPlan = new Date(datas[i].time).valueOf();
      console.log('valueOf2', dataPlan);
      if (dataCurrent > dataPlan) {
        var finish = new Object();
        finish.text = datas[i].text;
        finish.time = datas[i].time;
        finish.completeTime = -1;
        finishes.push(finish);
        datas.splice(i, 1);
        //arrayObject.splice(index,howmany,item1,...,itemX):删除从数组下标index开始长度为howmany的数组元素
      }
    }

    console.log('fin', finishes);
    console.log('da', datas);
    wx.setStorageSync('key', datas);
    wx.setStorageSync('finishedata', finishes);
  },

  globalData: {
    openid: "",
    userInfo: null,
    requestUrl: "https://route.showapi.com/255-1",
    appid: "97256",
    apiKey: "5fc769d0e6434843a8a70c566aacb7e1",
    tText: '29',
    tImg: '10',
    tAudio: '31',
    tVideo: '41',
    imageUrl: '',
    defaultImageUrl: '',
    phoneInfo: {
      windowHeight: wx.getSystemInfoSync().windowHeight
    }

  }
})

//整个小程序只有一个App实例,全部页面共享。开发者可以通过getApp方法获取到全局唯一的App实例，并获取App上的数据或调用开发者注册在App上的函数
//eg:
//xxx.js
//const appInstance = getApp();
//console.log(appInstance.globalData);
