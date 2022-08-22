import Menu from './menu';
import Authorization from './authorization/authApp';
import './styles/main.scss';

class App {
  menu = new Menu();

  auth = new Authorization();

  start() {
    this.menu.menuStart();
    Authorization.addAuthHandlers();
  }
}

const app = new App();
app.start();
