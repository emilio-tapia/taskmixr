  // ================== RESULT CLASS ============== //

  export interface Result {
    chore: string;
    user: string;
    choreId: string;
    resultElement: HTMLElement;
    resultsSection: HTMLElement;
  }

  // -------------

  export class Result {
    constructor(chore: string, user: string, choreId: string) {
      this.chore = chore;
      this.user = user;
      this.choreId = choreId;
      this.resultsSection = document
        .getElementById('results')
        ?.querySelector('ul') as HTMLElement;
      this.resultElement = this.createResult();
      this.displayResult();
    }

    createResult() {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const spanChore = document.createElement('span');
      spanChore.className = `chore_${this.choreId}`;
      spanChore.textContent = this.chore;
      const spanUser = document.createElement('span');
      spanUser.textContent = this.user;
      spanUser.className = `user_${this.choreId}`;

      div.appendChild(spanChore);
      div.appendChild(spanUser);
      li.appendChild(div);

      return li;
    }

    displayResult() {
      this.resultsSection.appendChild(this.resultElement);
    }

    removeResult() {
      this.resultElement.remove();
    }

    updateChore(value: string) {
      this.chore = value;

      const choreSpan = this.resultElement.querySelector(
        `.chore_${this.choreId}`
      );

      if (choreSpan?.textContent != undefined) {
        choreSpan.textContent = this.chore;
      }
    }

    updateUser(value: string) {
      this.user = value;

      const choreUser = this.resultElement.querySelector(
        `.user_${this.choreId}`
      );

      if (choreUser?.textContent != undefined) {
        choreUser.textContent = this.user;
      }

      return this.user;
    }
  }