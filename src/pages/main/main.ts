import Menu from './menu';
import './styles/main.scss';

class App {
  menu = new Menu();

  start() {
    this.menu.menuStart();
  }
}

const app = new App();
app.start();