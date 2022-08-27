export default class Footer {
  footer: HTMLElement = document.createElement('div');

  drawFooter() {
    this.footer.classList.add('footer');
    this.footer.innerHTML = ` <div class="footer__inner">
    <div class="footer__logo"><img src="./assets/images/course-logo.svg" alt="Course Logo"></div>
    <div class="footer__link"><a target="_blank" href="https://github.com/Ilyxxxaa">Ilyxxxa</a></div>
    <div class="footer__link"><a target="_blank" href="https://github.com/aminkka">aminkka</a></div>
    <div class="footer__link"><a target="_blank" href="https://github.com/maxkovalenko97">maxkovalenko97</a></div>
    <div class="footer__logo-course"><a target="_blank" href="https://rs.school/js/">© Rolling Scopes School,
        2022</a></div>
  </div>`;
    const pageContent = document.querySelector('.page__content');

    if (pageContent) {
      pageContent.append(this.footer);
    }
  }
}
