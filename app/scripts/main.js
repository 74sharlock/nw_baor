import tray from './tray';
import win from './window';
import logic from './logic'

// 界面逻辑
R(function () {
  // 系统托盘
  let trayObj = tray();

  // 窗体载入
  let winObj = win();
  logic(winObj, trayObj);
});

