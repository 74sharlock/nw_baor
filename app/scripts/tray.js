import trayMenu from './trayMenu';

export default function () {
  let tray = new nw.Tray({title: 'baor', icon: '/dist/images/icon.png'});

  tray.tooltip = '宝的记账软件';

  let menu = new nw.Menu();

  trayMenu.forEach(function (item) {
    menu.append(new nw.MenuItem(item));
  });

  tray.menu = menu;

  return tray;
};
