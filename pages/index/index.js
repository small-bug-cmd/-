function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}
var _serviceId_ = null;
var _deviceId_ = null;
var _characteristicId_ = null;
Page({
  data: {
    devices: [],
    services: [],
    deviceId: "",
    name: "",
    canWrite: "",
    isdevice: false
  },
  begin() {
    var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("初始化成功-------------------------------------------");
        that.startBluetoothDevicesDiscovery();
      },
      fail: function (res) {
        console.log("蓝牙适配器不可用--------------------------------------------");
        wx.showModal({
          title: '扫描失败',
          content: '错误原因：蓝牙适配器不可用',
        })
      },
      complete: function (res) { }
    })

  },
  startBluetoothDevicesDiscovery() {
    var that = this;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      success: function (res) {
        console.log(JSON.stringify(res));
        that.setData({
          start: "初始化成功，开始扫描..."
        })
        that.onBluetoothDeviceFound();
      },
      fail: function (res) {
        console.log("服务已断开-----------------------------------------" + JSON.stringify(res));
      },
      complete: function (res) { },
    })
  },
  getBluetoothDevices() {
    var that = this;
    wx.getBluetoothDevices({
      success: function (res) {
        that.setData({
          devices: res.devices,
        })
      },
      fail: function (res) {
        console("获取失败---------------------------------------" + JSON.stringify(res));
      },
      complete: function (res) { },
    })
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device
        } else {
          data[`devices[${idx}]`] = device
        }
        this.setData(data)
      })
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset;
    const deviceId = ds.deviceId;
    const name = ds.name;
    var th = this;
    wx.createBLEConnection({
      deviceId: deviceId,
      success: (res) => {
        this.setData({
          name,
          deviceId,
          isdevice: true
        })
        var that = res;
        wx.showModal({
          title: '自平衡小车',
          content: `是否连接${name}?`,
          success: function (res) {
            if (res.confirm) {
              th.getBLEDeviceServices(deviceId);
            } else {
              th.closeBLEConnectionCancel();
            }
          }
        })
      },
      fail: function (res) {
        console.log("连接失败" + res.errMsg);
        wx.showModal({
          title: '连接失败',
          content: '错误信息：' + res.errMsg + '(连接超时)',
        })
      },
      complete: function (res) { },
    })
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) { },
    })
  },
  closeBLEConnectionCancel(e) {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId,
    })
    wx.showModal({
      title: '未连接状态',
      content: '已取消对' + this.data.name + '的连接',
    })
  },
  closeBLEConnection(e) {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId,
    })
    if (this.data.isdevice) {
      wx.showModal({
        title: '未连接状态',
        content: '已断开对' + this.data.name + '的连接',
      })
      this.setData({
        isdevice: false
      })
    } else {
      wx.showModal({
        title: '未连接蓝牙设备',
        content: '请先连接蓝牙设备',
      })
    }
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return;
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i];
          if (item.properties.write) {
            wx.showModal({
              title: '已连接' + this.data.name,
              content: '第' + (i + 1) + '个特征值:' + item.uuid + '的状态：可发送数据',
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            _deviceId_ = deviceId;
            _serviceId_ = serviceId;
            _characteristicId_ = item.uuid;
          } else {
            wx.showModal({
              title: '已连接' + this.data.name,
              content: '第' + (i + 1) + '个特征值:' + item.uuid + '的状态：不可发送数据',
            })
          }
        }
      }
    })
  },
  onLoad: function (options) {
    /*let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 'a'.charCodeAt());
    console.log(dataView.getUint8(0));*/
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
           * 生命周期函数--监听页面卸载
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

  },
})

function deviceId() {
  return _deviceId_;
}

function serviceId() {
  return _serviceId_;
}

function characteristicId() {
  return _characteristicId_;
}
module.exports.deviceId = deviceId;
module.exports.serviceId = serviceId;
module.exports.characteristicId = characteristicId;