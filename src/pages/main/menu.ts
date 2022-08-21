export default class Menu {
  menuStart() {
    const menuBtn = document.querySelector('.menu__title');
    const menu = document.querySelector('.menu');
    menuBtn?.addEventListener('click', () => {
      const menuImage = menuBtn.querySelector('img');
      if (menu && menuImage) {
        if (menu.classList.contains('menu--enabled')) {
          menu.classList.remove('menu--enabled');
          menuImage.src = '../../assets/images/menu-icon.svg';
        } else {
          menu.classList.add('menu--enabled');
          menuImage.src = '../../assets/images/cross-icon.svg';
        }
      }
    });
  }
}
