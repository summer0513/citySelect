# citySelect微信小程序城市定位与选择
主要功能：
1）默认定位到当前城市
2）用户可以自由切换城市和筛选。

准备工作
1）用户需要到腾讯定位服务设置key参数：https://lbs.qq.com/console/mykey.html
2）用户需要再微信公众号平台设置服务器域名，添加request合法域名：https://apis.map.qq.com
3) 用户需要了解一下组件的使用，包括如何传值和获取选中的值，链接如下：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
4）需要在app.json中允许使用地理位置，配置如下：
 "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序的接口展示"
    }
  }

使用
1）首页用户需要调用微信接口wx.getSetting来判断是否授权
1）首页用户需要调用微信接口wx.getSetting来判断是否授权
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
         
        }
      }
    })
    
 2)调用wx.getLocation接口来获取当前位置经纬度，传给腾讯地图接口解析处城市。
 注意：使用腾讯地图接口需要引入qqmap-wx-jssdk.js，同时实例化

var QQMapWX = require('qqmap-wx-jssdk.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: '5U5BZ-S7WWF-6SLJK-JF4L3-JCK77-2OFUX'
});

wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res) {
          callback && callback(res);
        },
        fail: function (res) {
          wx.showModal({
            title: '信息提示',
            content: JSON.stringify(res),
          });
        },
        complete: function (res) {
          // console.log(res);
        }
      });
    },
    fail: function (res) {
      console.log('fail' + JSON.stringify(res))
    }
  })



