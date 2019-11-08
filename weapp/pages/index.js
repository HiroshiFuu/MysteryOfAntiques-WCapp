"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _eventHub = _interopRequireDefault(require('../common/eventHub.js'));

var _x = require('../vendor.js')(4);

var _store = _interopRequireDefault(require('../store/index.js'));

var _test = _interopRequireDefault(require('../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  config: {
    navigationBarTitleText: 'test'
  },
  hooks: {
    // Page 级别 hook, 只对当前 Page 的 setData 生效。
    'before-setData': function beforeSetData(dirty) {
      console.log('page setData dirty: ', dirty);

      if (Math.random() < 0.2) {
        console.log('page setData canceled');
        return false; // Cancel setData
      }

      dirty.time = +new Date();
      return dirty;
    }
  },
  mixins: [_test["default"]],
  data: {
    userInfo: {
      nickName: '加载中...'
    },
    req_res: '',
    game_created: false
  },
  methods: {
    bindGetUserInfo: function bindGetUserInfo(e) {
      console.log('bindGetUserInfo', e.$wx.detail.userInfo); // this.data.userinfo = e.$wx.detail.userInfo;
    },
    handleViewTap: function handleViewTap(e) {
      console.log('handleViewTap', e);
    },
    nav_test: function nav_test() {
      console.log('nav_test');
      this.$navigate({
        url: '/pages/test'
      }); // wx.navigateTo({
      //   url:'pages/test'
      // });
    },
    request_create: function request_create() {
      var self = this;
      self.req_res = 'wait';
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/CreateGame/',
        success: function success(res) {
          console.log('request_create', res);

          if (res.statusCode !== 200) {
            self.req_res = res.errMsg;
          } else {
            self.req_res = 'Room ID: ' + res.data.room_id;
            self.game_created = true;
            console.log('request_create', self.req_res, self.game_created);
          }
        }
      });
    }
  },
  created: function created() {
    var self = this;
    wx.getUserInfo({
      success: function success(res) {
        console.log('getUserInfo', res.userInfo);
        self.userInfo = res.userInfo;
      }
    });
  }
}, {info: {"components":{"list":{"path":"..\\components\\wepy-list"},"group":{"path":"..\\components\\group"},"panel":{"path":"..\\components\\panel"},"counter":{"path":"..\\components\\counter"},"slide-view":{"path":"..\\$vendor\\miniprogram-slide-view\\miniprogram_dist\\index"}},"on":{}}, handlers: {'7-93': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleViewTap($event)
      })();
    
  }},'7-94': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.nav_test($event)
      })();
    
  }},'7-95': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.request_create($event)
      })();
    
  }}}, models: {} });