let nw = {
  global: '[object Window]',
  process: '[object process]',
  Buffer: function Buffer(arg, encodingOrOffset, length) {
  // Common case.
    if (typeof arg === 'number') return Buffer.allocUnsafe(arg);
    return Buffer.from(arg, encodingOrOffset, length);
  },
  root: '[object Window]',
  require: function () {
    if (arguments[0] === 'nw.gui') {
      return nw;
    } else {
      return realrequire.apply(self, [].slice.call(arguments, 0));
    }
  },
  App: '[object Object]',
  Clipboard: function NWClipboard() { },
  Menu: function Menu(option) {
    if (!(this instanceof Menu)) {
      return new Menu(option);
    }
    if (typeof option != 'object' || !option) option = { type: 'contextmenu' };
    if (option.type != 'contextmenu' && option.type != 'menubar') throw new TypeError('Invalid menu type: ' + option.type);
    var id = contextMenuNatives.GetNextContextMenuId();
    option.generatedId = id;
    this.id = id;
    this.type = option.type; privates(this).items = [];
    privates(this).option = option;
    nw.Obj.create(id, 'Menu', option);
    messagingNatives.BindToGC(this, nw.Obj.destroy.bind(undefined, id), -1);
  },
  MenuItem: function MenuItem(option) {
    if (!(this instanceof MenuItem)) {
      return new MenuItem(option);
    }
    EventEmitter.apply(this);
    if (typeof option != 'object') throw new TypeError('Invalid option.');
    if (!option.hasOwnProperty('type')) option.type = 'normal';
    if (option.type != 'normal' && option.type != 'checkbox' && option.type != 'separator') throw new TypeError('Invalid MenuItem type: ' + option.type);
    if (option.type == 'normal' || option.type == 'checkbox') {
      if (option.type == 'checkbox') option.checked = Boolean(option.checked);
      if (!option.hasOwnProperty('label')) throw new TypeError('A normal MenuItem must have a label'); else option.label = String(option.label);
      if (option.hasOwnProperty('icon')) {
        option.shadowIcon = String(option.icon);
        option.icon = nwNative.getAbsolutePath(option.icon);
      }
      if (option.hasOwnProperty('iconIsTemplate')) option.iconIsTemplate = Boolean(option.iconIsTemplate); else option.iconIsTemplate = true;
      if (option.hasOwnProperty('tooltip')) option.tooltip = String(option.tooltip);
      if (option.hasOwnProperty('enabled')) option.enabled = Boolean(option.enabled);
      if (option.hasOwnProperty('submenu')) { // Transfer only object id
        privates(this).submenu = option.submenu;
        option.submenu = option.submenu.id;
      }
      if (option.hasOwnProperty('click')) {
        if (typeof option.click != 'function') throw new TypeError("'click' must be a valid Function"); else this.click = option.click;
      }
    } else if (option.type == 'separator') { o
      ption = { type: 'separator' };
    }
    var id = contextMenuNatives.GetNextContextMenuId();
    this.id = id;
    privates(this).option = option;
    menuItems.objs[id] = this;
    // All properties must be set after initialization.
    if (!option.hasOwnProperty('icon')) option.shadowIcon = '';
    if (!option.hasOwnProperty('tooltip')) option.tooltip = '';
    if (!option.hasOwnProperty('enabled')) option.enabled = true;
    if (!option.hasOwnProperty('key')) option.key = "";
    if (!option.hasOwnProperty('modifiers')) option.modifiers = "";
    nw.Obj.create(id, 'MenuItem', option);
    messagingNatives.BindToGC(this, nw.Obj.destroy.bind(undefined, id), -1);
  },
  Obj: '[object Object]',
  Screen: '[object Object]',
  Shell: '[object Object]',
  Shortcut: function Shortcut(option) {
    if (!(this instanceof Shortcut)) {
      return new Shortcut(option);
    }
    EventEmitter.apply(this, arguments);
    if (typeof option != 'object') throw new TypeError(OPTION_INVALID);
    if (!option.key) throw new TypeError(OPTION_KEY_REQUIRED);
    if (option.hasOwnProperty('active')) {
      if (typeof option.active != 'function') throw new TypeError(OPTION_ACTIVE_INVALID);
    }
    if (option.hasOwnProperty('failed')) {
      if (typeof option.failed != 'function') throw new TypeError(OPTION_FAILED_INVALID);
    }
    var self = this;
    this.on('active', function() {
      if (!self.active) return;
      if (typeof self.active != 'function') throw new TypeError(OPTION_ACTIVE_INVALID);
      self.active.apply(self, arguments);
    });
    this.on('failed', function() {
      if (!self.failed) return;
      if (typeof self.failed != 'function') throw new TypeError(OPTION_FAILED_INVALID);
      self.failed.apply(self, arguments);
    });
    this.key = option.key;
    this.active = option.active;
    this.failed = option.failed;
    this._accelerator = keyToAccelerator(option.key);
  },
  Tray: function Tray(option) {
    if (!(this instanceof Tray)) {
      return new Tray(option);
    }
    EventEmitter.apply(this);
    if (typeof option != 'object') throw new TypeError('Invalid option.');
    if (!option.hasOwnProperty('title') && !option.hasOwnProperty('icon')) throw new TypeError("Must set 'title' or 'icon' field in option");
    if (!option.hasOwnProperty('title')) option.title = ''; else option.title = String(option.title);
    if (option.hasOwnProperty('icon')) {
      option.shadowIcon = String(option.icon);
      option.icon = nwNative.getAbsolutePath(option.icon);
    }
    if (option.hasOwnProperty('alticon')) {
      option.shadowAlticon = String(option.alticon);
      option.alticon = nwNative.getAbsolutePath(option.alticon);
    }
    if (option.hasOwnProperty('iconsAreTemplates')) option.iconsAreTemplates = Boolean(option.iconsAreTemplates); else option.iconsAreTemplates = true;
    if (option.hasOwnProperty('tooltip')) option.tooltip = String(option.tooltip);
    if (option.hasOwnProperty('click')) {
      if (typeof option.click != 'function') {
        throw new TypeError("'click' must be a valid Function");
      } else {
        this.click = option.click;
      }
    }
    if (option.hasOwnProperty('menu')) {
      if (option.menu.constructor.name != 'Menu') throw new TypeError("'menu' must be a valid Menu");
      // Transfer only object id
      privates(this).menu = option.menu; option.menu = option.menu.id;
    }
    var id = contextMenuNatives.GetNextContextMenuId();
    this.id = id;
    privates(this).option = option;
    // All properties must be set after initialization.
    if (!option.hasOwnProperty('icon')) option.shadowIcon = '';
    if (!option.hasOwnProperty('alticon')) option.shadowAlticon = '';
    if (!option.hasOwnProperty('tooltip')) option.tooltip = '';
    nw.Obj.create(id, 'Tray', option);
    messagingNatives.BindToGC(this, nw.Obj.destroy.bind(undefined, id), -1);
    trayEvents.objs[this.id] = this;
  },
  Window: '[object Object]',
  test: '[object Object]',
  __filename: 'D:\SYSTEM~2\nw15332_6467/dist/index.html',
  __dirname: 'D:\SYSTEM~2\nw15332_6467'
};
