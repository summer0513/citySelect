//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    location: 'GPS定位中',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    this.getUserLocation();
  },
  onShow: function() {
    //获取选择的城市
    this.getSelectCity()
  },

  /*判断是否授权 未授权就发起授权页面 */
  getUserLocation: function() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              console.log(res)
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function(res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.geo();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          that.geo();
        } else {
          console.log('授权成功')
          //调用wx.getLocation的API
          //that.geo();
        }
      }
    })
  },

  /**获取当前定位 */
  geo: function() {
    let that = this;
    wx.api.api.getLocationCity(function(res) {
      let city = res.result.ad_info.city
      that.setData({
        location: city,
      })
      let textLegth = city.length
      let winWid = wx.getSystemInfoSync().windowWidth;
      that.setData({
        searchwidth: winWid - 85 - 16 * textLegth
      })
      wx.setStorageSync("location", city)
    })
  },

  /**选择城市 */
  selectCity: function() {
    wx.navigateTo({
      url: '../selectCity/selectCity',
    })
  },

  getSelectCity: function() {
    let that = this;
    //手动选择城市
    let selectlocation = wx.getStorageSync('selectArea');
    console.log()
    //定位城市
    let location = wx.getStorageSync("location")
    that.setData({
      location: selectlocation
    })

  }

})