// pages/studynote/index/index.js
//获取应用实例
const app = getApp();
const util = require('../../../utils/util.js');//引入util模块
const shareData = require('../../../utils/shareData.js');//引入shareData模块
Page({
  data: {
    height: 20,
    option: '编辑',
    topText: true, //用于动态修改css格式
    isEdit: false, //用于动态修改css格式
    isShow: false, //用于动态修改css格式
    isNull: true,  //用于动态修改css格式
    primarySize: 'default',
    memoLists: [],  //存放笔记记录
    delLists: [],   //用户选中的笔记记录的索引数组,将用于删除记录
    newLists: [],
    allLength: '0', //统计笔记记录数量
    checkboxLength: '',
    btnText: '删除全部',
    delFunc: 'delAllMemo'
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../logs/logs',
    })
  },

  //页面初始化时自动调用
  onLoad: function () {
    var that = this;//先保留下this的指向(Page对象),以免丢失
    try {
      var value = wx.getStorageSync('memoLists');//在本地缓存中根据指定的key获得value
      if (value) {
        that.data.memoLists.push(value);//放进数组里
        that.setData({
          memoLists: that.data.memoLists,
          allLength: util.count(that.data.memoLists[0]),//调用util模块统计数组长度
          isNull: false
        })
      } else {

      }

    } catch (e) {
      wx.showToast({
        title: '获取数据失败',
        icon: 'none',
        duration: 1500 //提示的延迟时间,不加设置默认为1500ms
      })
    };

    //小程序置顶
    wx.setTopBarText({
      text: '随时随地记载您的学习心得！',
    })

  },


  //使用说明
  instruction: function () {
    //设置操作反馈(模态弹窗)
    wx.showModal({
      title: '关于笔记记录功能',
      content: '方便使用者随时随地记录自己的学习心得或重要事项，方便快捷。所有信息均保存在手机缓存中,可以放心使用。',
      showCancel: false,//不显示取消按钮
      confirmText: '知道了',//确定按钮文字
      //接口调用成功的回调函数
      success: function (res) {

        console.log('用户点击确定');
      }
    })
  },

  //编辑列表
  editCheckBox: function (e) {
    var that = this;
    this.setData({
      topText: (!that.data.topText)
    })
    if (this.data.topText) {
      this.setData({
        option: '编辑',
        isEdit: false,
        isShow: false
      })
    } else {
      this.setData({
        option: '取消',
        isEdit: true,
        isShow: true
      })
    }
  },


  //添加新笔记记录，跳转到新页面
  addMemoLists: function () {
    wx.redirectTo({
      url: '/pages/studynote/add/add',
    })
  },


  //记录选择删除
  checkboxChange: function (e) {
    console.log('checkboxChange函数被执行了');
    try {
      wx.setStorageSync('delLists', e.detail.value)
    } catch (e) {
      wx.showToast({
        title: '保存失败',
        icon: 'error',
        duration: 2000
      })
    }

    this.setData({
      checkboxLength: e.detail.value.length,
      btnText: '删除' + e.detail.value.length + '条',
      delFunc: 'delMemoLists'
    });

    if (this.data.checkboxLength == 0) {
      this.setData({
        btnText: '删除全部',
        delFunc: 'delAllMemo'
      })
    }
  },


  //删除全部笔记
  delAllMemo: function () {
    var that = this;
    wx.showModal({
      title: '删除全部',
      content: '确认删除' + that.data.allLength + '条记录吗?',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 500
          });
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/studynote/index/index'
            });
          }, 500);//删除成功后,延时500ms重定向到index页面
        }
      }
    })
  },

  //删除单条笔记记录
  delMemoLists: function (e) {
    console.log('delMemoLists函数被执行了');
    var that = this;
    try {
      wx.showModal({
        title: '',
        content: '确认删除这' + that.data.checkboxLength + '条吗？',
        success: function (res) {
          if (res.confirm) {
            try {
              var delValue = wx.getStorageSync('delLists');
              //数组从大到小排列
              delValue.sort(function (a, b) {
                return a < b;
              })

              if (delValue) {
                if (that.data.allLength == that.data.checkboxLength) {
                  wx.removeStorage({
                    key: 'memoLists'
                  });
                } else {
                  for (var i = 0; i < delValue.length; i++) {
                    try {
                      that.data.memoLists[0].splice(delValue[i] - 1, 1);   //删除指定下标的值
                      //array.splice(index,howmany,item1,.....,itemX)
                      //index:必需。规定从何处添加/删除元素。该参数是开始插入和（或）删除的数组元素的下标，必须是数字。
                      //howmany:必需。规定应该删除多少元素。必须是数字，但可以是 "0"。如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。
                      //item1...:可选。要添加到数组的新元素
                      wx.setStorageSync('memoLists', that.data.memoLists[0]);//异步更新列表缓存
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 500
                      });
                    } catch (e) { }
                  }
                }
                //删除后刷新页面
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/studynote/index/index',
                    success: function (e) {
                      //var page = getCurrentPages().pop();
                      //if (page == undefined || page == null) return;
                      //page.onLoad();
                      console.log('success!!!!');
                    }
                  });

                  console.log('成功执行刷新跳转');
                }, 500);
              } else {
                wx.showToast({
                  title: '获取数据失败',
                  icon: 'none',
                  duration: 1000
                });
              }
            } catch (e) {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 1500
              })
            }
          }
        }
      })
    } catch (e) {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        duration: 1500
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      //来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: shareData[Math.round(Math.random() * (shareData.length - 1))],
      path: '/pages/studynote/index/index',
      imageUrl: '/images/share.png',
      success: function (res) {
        console.log('已转发');
      },
      fail: function (res) {
        console.log('用户取消转发')
      }
    }
  },
})