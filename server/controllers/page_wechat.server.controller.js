/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var smsLib = require('../../libraries/sms');


var userLogic = require('../logics/user');
var wechatLogic = require('../logics/wechat_new');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();


exports.home = function (req, res, next) {
  wechatLogic.getUserAccessToken(req.query.code, function (err, result) {
    if (result.openid) {
      cookieLib.setCookie(res, 'openid', result.openid);
      cookieLib.setCookie(res, 'user_access_token', result.access_token);
    }

    var filepath = path.join(__dirname, '../../web/c_wechat/views/home.client.view.html');
    req.cookies.city = req.params.city || req.cookies.city || '';
    cookieLib.setCookie(res, 'city', req.cookies.city);
    cookieLib.setCookie(res, 'device', req.query.device);
    return res.render(filepath, { city: req.cookies.city, device: req.query.device || '' });
  });
};
