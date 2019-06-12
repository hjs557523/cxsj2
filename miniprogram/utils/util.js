//微信自带的封装写法：
const formatTime = date => {
  const year = date.getFullYear()   //从Date对象获取当前年份的4位数字
  const month = date.getMonth() + 1 //从Date对象返回当前月份(0-11),需要+1处理
  const day = date.getDate()        //从Date对象返回当前月份第几天(1-31)
  const hour = date.getHours()      //从Date对象返回当前天的第几小时(0-23)
  const minute = date.getMinutes()  //从Date对象返回当前小时的第几分钟(0-59)
  const second = date.getSeconds()  //从Date对象返回当前分钟的秒数(0-59)

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

  //笔记：
  //arr.map(function(currentValue,index,arr),thisValue);
  //map方法返回一个新数组,数组中的元素为原始数组元素按顺序调用函数处理的后值;
  //currentValue：必选,当前元素值
  //index：可选,为当前元素的索引值
  //arr：可选,当前元素的数组对象

  //arr.join(separator);
  //join方法把数组中所有元素放入一个字符串中,并以指定分隔符separator进行分割,若无指定,默认为逗号分割符
}

//在单数字前面加0
const formatNumber = n => {
  n = n.toString()//转化为字符串
  return n[1] ? n : '0' + n 
}



function add0(m) {
  return m < 10? '0' + m : m
}

/**
 * 封装将毫秒时间戳转化为标准时间格式的函数
 */
const format = date => {
  //时间戳是整数,否则需要做parseInt转换
  var time = new Date(date);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

//获取数组、对象的长度
const count = obj => {
  var objType = typeof obj;
  if(objType == "string"){
    return obj.length;
  } else if (objType == "object") {//遍历对象的每个动态属性或数组中的每个元素
    var objLen = 0;
    for(var i in obj){
      objLen++;
    }
    return objLen;
  } else{
    return false;
  }
}


//设置为引用模块
module.exports = {
  formatTime: formatTime,
  format:format,
  count:count
}
