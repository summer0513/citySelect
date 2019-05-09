var QQMapWX = require('qqmap-wx-jssdk.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: '5U5BZ-S7WWF-6SLJK-JF4L3-JCK77-2OFUX'
});
var api = {};
/**获取当前定位 */
api.getLocationCity = function (callback) {
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
}


module.exports = {
  api: api
}