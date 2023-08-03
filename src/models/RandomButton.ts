import { results, users } from "../helpers/data";
import { ButtonClick } from "./ButtonClick";

export class RandomButton extends ButtonClick {
    constructor(selector: string) {
      super(selector);
    }

    async handleBtnClick(e: Event) {
      try {
        
      let usersChecked = Array.from(users); // HANDLE USERS IS FROM OUTSIDE
      for (let i = 0; i < results.length; i++) {
        let randomIndex = Math.floor(Math.random() * usersChecked.length);

        // const randomNumbers = setInterval(() => {
        //   randomIndex = Math.floor(Math.random() * usersChecked.length);
        //           let selectedUser = usersChecked[randomIndex].displayName;

        // // UPDATE THE UI
        // results[i].updateUser(selectedUser);
        // }, 100);

        // setTimeout(() => {
        //   clearInterval(randomNumbers);
        // }, 5000);

        let selectedUser = usersChecked[randomIndex].displayName;

        // UPDATE THE UI
        results[i].updateUser(selectedUser);

        // GET USER CHECKED
        let removedItem = usersChecked.splice(randomIndex, 1)[0];

        // UPDATE CHECK ARRAY WITHOUT CHECK USER
        usersChecked = usersChecked.filter(
          (user) => user.inputId !== removedItem.inputId
        );
        // RESER USER CHECKED ARRAY
        if (usersChecked.length === 0) {
          usersChecked = users.map((user) => user);
          // console.log(usersChecked, 'RESET');
        }
      }

      const saveBtn = document.getElementById('saveBtn');
      saveBtn?.removeAttribute('disabled');
      return e;
      } catch (error) {
        
      }
    }
  }