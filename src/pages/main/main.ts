import Menu from './menu';
import './styles/main.scss';

import '../dictionary/dictionaryVIew'  // как подключаться 

class App {
  menu = new Menu();

  start() {
    this.menu.menuStart();
  }
}

const app = new App();
app.start();
