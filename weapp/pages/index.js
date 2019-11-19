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
    create_game_res: '',
    game_created: false,
    room_id: '',
    test_load_character_res: '',
    player_loaded: false,
    player_code: '',
    curZodiacs: [],
    inspected_zodiac_res: '',
    zodiacs_inspected: false,
    next_player_select_res: ''
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
    create_game: function create_game() {
      var self = this;
      self.create_game_res = 'wait';
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/CreateGame/',
        success: function success(res) {
          console.log('create_game', res);

          if (res.statusCode !== 200) {
            self.create_game_res = res.errMsg;
          } else {
            self.room_id = res.data.room_id;
            self.create_game_res = 'Room ID: ' + self.room_id;
            self.game_created = true;
            console.log('create_game', self.room_id, self.game_created);
          }
        }
      });
    },
    test_load_game: function test_load_game() {
      var self = this;
      self.room_id = 29698;
      self.create_game_res = 'Room ID: ' + self.room_id;
      self.game_created = true;
      console.log('test_load_game', self.room_id, self.game_created);
    },
    test_load_character: function test_load_character() {
      var self = this;
      self.test_load_character_res = 'wait';
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/SetupGame/' + self.room_id + '/',
        success: function success(res) {
          console.log('test_load_character', res);

          if (res.statusCode !== 200) {
            console.log('test_load_character Err', res.errMsg);
          } else {
            self.test_load_character_res = res.data.player.color + ' ' + res.data.character.name + ' ' + res.data.character.skill_description;
            console.log('test_load_character', res.data.player.color + ' ' + res.data.character.name + ' ' + res.data.character.skill_description);
            self.player_code = res.data.player.player_code;
            console.log('test_load_character player_code', self.player_code);
            self.player_loaded = true;
          }
        }
      });
    },
    test_reload_character: function test_reload_character() {
      var self = this;
      self.player_code = 766;
      self.test_load_character_res = self.player_code;
      self.player_loaded = true;
      console.log('test_reload_character player_code', self.player_code);
    },
    test_load_zodiacs: function test_load_zodiacs() {
      var self = this;
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/TestLoadZodiacs/' + self.room_id + '/' + self.player_code,
        success: function success(res) {
          console.log('test_load_zodiacs', res);

          if (res.statusCode !== 201) {
            console.log('test_load_zodiacs Err', res.errMsg);
          } else {
            self.curZodiacs = res.data.zodiacs;
            console.log('test_load_zodiacs', self.curZodiacs);
          }
        }
      });
    },
    inspect_zodiac: function inspect_zodiac(pk, name) {
      var self = this;
      console.log('inspect_zodiac', pk, name);
      wx.request({
        url: 'http://127.0.0.1:8000/GameMaster/InspectZodiac/' + pk + '/',
        success: function success(res) {
          console.log('inspect_zodiac', res);

          if (res.statusCode !== 200) {
            console.log('inspect_zodiac Err', res.errMsg);
          } else {
            self.inspected_zodiac_res = '验证' + name + '为：' + res.data.genuine ? '真品' : '赝品';
            self.zodiacs_inspected = true;
            console.log('inspect_zodiac', self.zodiacs_inspected);
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
}, {info: {"components":{"list":{"path":"..\\components\\wepy-list"},"group":{"path":"..\\components\\group"},"panel":{"path":"..\\components\\panel"},"counter":{"path":"..\\components\\counter"},"slide-view":{"path":"..\\$vendor\\miniprogram-slide-view\\miniprogram_dist\\index"}},"on":{}}, handlers: {'7-523': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleViewTap($event)
      })();
    
  }},'7-524': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.nav_test($event)
      })();
    
  }},'7-525': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.create_game($event)
      })();
    
  }},'7-526': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_load_game($event)
      })();
    
  }},'7-527': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_load_character($event)
      })();
    
  }},'7-528': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_reload_character($event)
      })();
    
  }},'7-529': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_load_zodiacs($event)
      })();
    
  }},'7-530': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.inspect_zodiac(item.pk, item.name)
      })();
    
  }}}, models: {} }, {info: {"components":{"list":{"path":"..\\components\\wepy-list"},"group":{"path":"..\\components\\group"},"panel":{"path":"..\\components\\panel"},"counter":{"path":"..\\components\\counter"},"slide-view":{"path":"..\\$vendor\\miniprogram-slide-view\\miniprogram_dist\\index"}},"on":{}}, handlers: {'7-523': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleViewTap($event)
      })();
    
  }},'7-524': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.nav_test($event)
      })();
    
  }},'7-525': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.create_game($event)
      })();
    
  }},'7-526': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_load_game($event)
      })();
    
  }},'7-527': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_load_character($event)
      })();
    
  }},'7-528': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_reload_character($event)
      })();
    
  }},'7-529': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.test_load_zodiacs($event)
      })();
    
  }},'7-530': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.inspect_zodiac(item.pk, item.name)
      })();
    
  }}}, models: {} });