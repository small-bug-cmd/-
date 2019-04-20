var _inputValueUp = "1";
var _inputValueDown = "2";
var _inputValueLeft = "3";
var _inputValueRight = "4";
var _inputValueStop = "0";
Page({
  data: {
    inputValueUp: "1",
    inputValueDown: "2",
    inputValueLeft: "3",
    inputValueRight: "4",
    inputValueStop: "0",
    turn: true,
  },
  bindKeyInputUp: function (e) {
    this.setData({
      inputValueUp: e.detail.value
    })
    _inputValueUp = e.detail.value;
  },
  bindKeyInputDown: function (e) {
    this.setData({
      inputValueDown: e.detail.value
    })
    _inputValueDown = e.detail.value;
  },
  bindKeyInputLeft: function (e) {
    this.setData({
      inputValueLeft: e.detail.value
    })
    _inputValueLeft = e.detail.value;
  },
  bindKeyInputRight: function (e) {
    this.setData({
      inputValueRight: e.detail.value
    })
    _inputValueRight = e.detail.value;
  },
  bindKeyInputStop: function (e) {
    this.setData({
      inputValueStop: e.detail.value
    })
    _inputValueStop = e.detail.value;
  },
  control: function (e) {
    this.judge();
    if (this.data.turn) {
      wx.showModal({
        title: '保存成功',
        content: '',
      })
    }
  },
  judge() {
    var array = [this.data.inputValueUp, this.data.inputValueDown, this.data.inputValueLeft, this.data.inputValueRight, this.data.inputValueStop];
    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 5; j++) {
        if (array[i] == array[j]) {
          this.setData({
            turn: false
          })
          this.tips();
          return;
        } else {
          this.setData({
            turn: true
          })
        }
      }
    }

  },
  tips() {
    wx.showModal({
      title: '保存失败',
      content: '错误原因：输入的编码不能一样',
    })
  },
  onLoad: function (options) {
    this.setData({
      inputValueUp: _inputValueUp,
      inputValueDown: _inputValueDown,
      inputValueLeft: _inputValueLeft,
      inputValueRight: _inputValueRight,
      inputValueStop: _inputValueStop
    })
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

function changeUp() {
  return _inputValueUp;
}

function changeDown() {
  return _inputValueDown;
}

function changeLeft() {
  return _inputValueLeft;
}

function changeRight() {
  return _inputValueRight;
}

function changeStop() {
  return _inputValueStop;
}
module.exports.changeUp = changeUp;
module.exports.changeDown = changeDown;
module.exports.changeLeft = changeLeft;
module.exports.changeRight = changeRight;
module.exports.changeStop = changeStop;