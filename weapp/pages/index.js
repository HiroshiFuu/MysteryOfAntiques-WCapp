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
    navigationBarTitleText: 'MoA'
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
    request_create_res: '',
    game_created: false,
    room_id: '',
    test_load_character_res: ''
  },
  onLoad: function onLoad() {},
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
      self.request_create_res = 'wait';
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/CreateGame/',
        success: function success(res) {
          console.log('request_create', res);

          if (res.statusCode !== 200) {
            self.request_create_res = res.errMsg;
          } else {
            self.room_id = res.data.room_id;
            self.request_create_res = 'Room ID: ' + self.room_id;
            self.game_created = true;
            console.log('request_create', self.room_id, self.game_created);
          }
        }
      });
    },
    test_load_character: function test_load_character() {
      var self = this;
      self.test_load_character_res = 'wait';
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/SetupGame/' + self.room_id,
        success: function success(res) {
          console.log('test_load_characters', res);

          if (res.statusCode !== 200) {
            console.log('test_load_character Err', res.errMsg);
          } else {
            self.test_load_character_res = res.data.player.color + ' ' + res.data.character.name + ' ' + res.data.character.skill_description;
            console.log('test_load_character', res.data.player.color + ' ' + res.data.character.name + ' ' + res.data.character.skill_description);
            console.log('test_load_character player_code', res.data.player.player_code);
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
}, {info: {"components":{"list":{"path":"..\\components\\wepy-list"},"group":{"path":"..\\components\\group"},"panel":{"path":"..\\components\\panel"},"counter":{"path":"..\\components\\counter"},"slide-view":{"path":"..\\$vendor\\miniprogram-slide-view\\miniprogram_dist\\index"}},"on":{}}, handlers: {'7-108': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleViewTap($event)
      })();
    
  }},'7-109': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.nav_test($event)
      })();
    
  }},'7-110': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.request_create($event)
      })();
    
  }},'7-111': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.test_load_character()
      })();
    
  }}}, models: {} });