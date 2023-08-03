export interface ButtonClick {
    btnElement: HTMLElement | null;
  }

  export class ButtonClick {
    constructor(selector: string) {
      this.btnElement = document.getElementById(selector);
      this.btnEvents();
    }

    btnEvents() {
      this.btnElement?.addEventListener(
        'click',
        this.handleBtnClick.bind(this)
      );
    }

    async handleBtnClick(e: Event) {
      try {
        return e;
      } catch (error) {
        return error
      }
    }

  disableButton(){
    this.btnElement?.setAttribute('disabled', 'true');
  }
  }