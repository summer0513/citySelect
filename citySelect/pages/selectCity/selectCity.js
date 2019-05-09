
let City = require('../../utils/allcity.js');

Page({

  data: {
    currentLocation: 'GPS定位中',
    city: City,
  },
  onLoad: function () {

  },
  onShow: function () {
    let that = this;
    let selectArea = wx.getStorageSync('selectArea');
  },

  getChooseCity: function (e) {
    let selectArea = e.detail
    wx.setStorageSync('selectArea', selectArea)
    wx.navigateTo({
      url: '../index/index',
    })
  },
})