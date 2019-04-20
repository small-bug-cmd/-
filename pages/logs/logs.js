var index_js = require("/../index/index");
var setup_js = require("/../setup/setup");

function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
Page({
  data: {
    pathsetup: "/pages/image/setup.png",
    value: "操作之前可先看一下说明",
    valueup: "1",
    valuedown: "2",
    valueleft: "3",
    valueright: "4",
    valuestop: "0"
  },
  BLECharacteristicValueUp(deviceId, serviceId, characteristicId) {
    var deviceId = index_js.deviceId();
    var serviceId = index_js.serviceId();
    var characteristicId = index_js.characteristicId();
    let buffer = new ArrayBuffer(1);
    let dataView = new DataView(buffer);
    dataView.setUint8(0, this.data.valueup);
    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      value: buffer,
      success: function (res) {
        console.log("发送成功------------------------" + res.errMsg);
      },
      fail: function (res) {
        console.log("发送失败------------------------" + res.errMsg);
        wx.showModal({
          title: '无法发送指令',
          content: '原因：未连接蓝牙设备或者设备的特征值为不可发送数据'
        })
      }
    })
  },
  BLECharacteristicValueDown(deviceId, serviceId, characteristicId) {
    var deviceId = index_js.deviceId();
    var serviceId = index_js.serviceId();
    var characteristicId = index_js.characteristicId();
    let buffer = new ArrayBuffer(1);
    let dataView = new DataView(buffer);
    dataView.setUint8(0, this.data.valuedown);
    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      value: buffer,
      success: function (res) {
        console.log("发送成功------------------------" + res.errMsg);
      },
      fail: function (res) {
        console.log("发送失败------------------------" + res.errMsg);
        wx.showModal({
          title: '无法发送指令',
          content: '原因：未连接蓝牙设备或者设备的特征值为不可发送数据'
        })
      }
    })
  },
  BLECharacteristicValueLeft(deviceId, serviceId, characteristicId) {
    var deviceId = index_js.deviceId();
    var serviceId = index_js.serviceId();
    var characteristicId = index_js.characteristicId();
    let buffer = new ArrayBuffer(1);
    let dataView = new DataView(buffer);
    dataView.setUint8(0, this.data.valueleft);
    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      value: buffer,
      success: function (res) {
        console.log("发送成功------------------------" + res.errMsg);
      },
      fail: function (res) {
        console.log("发送失败------------------------" + res.errMsg);
        wx.showModal({
          title: '无法发送指令',
          content: '原因：未连接蓝牙设备或者设备的特征值为不可发送数据',
        })
      }
    })
  },
  BLECharacteristicValueRight(deviceId, serviceId, characteristicId) {
    var deviceId = index_js.deviceId();
    var serviceId = index_js.serviceId();
    var characteristicId = index_js.characteristicId();
    let buffer = new ArrayBuffer(1);
    let dataView = new DataView(buffer);
    dataView.setUint8(0, this.data.valueright);
    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      value: buffer,
      success: function (res) {
        console.log("发送成功------------------------" + res.errMsg);
      },
      fail: function (res) {
        console.log("发送失败------------------------" + res.errMsg);
        wx.showModal({
          title: '无法发送指令',
          content: '原因：未连接蓝牙设备或者设备的特征值为不可发送数据'
        })
      }
    })
  },
  BLECharacteristicValueStop(deviceId, serviceId, characteristicId) {
    var deviceId = index_js.deviceId();
    var serviceId = index_js.serviceId();
    var characteristicId = index_js.characteristicId();
    let buffer = new ArrayBuffer(1);
    let dataView = new DataView(buffer);
    dataView.setUint8(0, this.data.valuestop);
    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      value: buffer,
      success: function (res) {
        console.log("发送成功------------------------" + res.errMsg);
      },
      fail: function (res) {
        console.log("发送失败------------------------" + res.errMsg);
        wx.showModal({
          title: '无法发送指令',
          content: '原因：未连接蓝牙设备或者设备的特征值为不可发送数据'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    this.setData({
      valueup: setup_js.changeUp(),
      valuedown: setup_js.changeDown(),
      valueleft: setup_js.changeLeft(),
      valueright: setup_js.changeRight(),
      valuestop: setup_js.changeStop()
    })
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