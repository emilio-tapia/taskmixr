import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function initDriver() {

  const driverObj = driver({
    showProgress: true,
    showButtons: ['next', 'previous'],
    steps: [
      {
        popover: {
          title: 'Welcome to TASKMIXR',
          description:
            "Want to split task/items randomly? <br> This is the right app for you.",
          align: 'center',
        },
      },
      {
        element: '#users',
        popover: {
          title: "Let's begin...",
          description:
            "First, enter all the names that are going to do a task.",
        },
      },
      {
        element: '#chores',
        popover: {
          title: 'Fill all your tasks',
          description:
            "Write down all tasks you have to do.",
        },
      },
      {
        element: '.mainBtn',
        popover: {
          title: 'Random Button',
          description:
            "Push it to get random results.",
        },
      },
      {
        element: '.results__container',
        popover: {
          title: 'Results',
          description:
            "The random results will be displayed here.",
        },
      },
      {
        element: '.saveBtn',
        popover: {
          title: 'Save Button',
          description:
            "If you are happy with the results, push here to save it locally.",
        },
      },
      {
        element: '#results__title',
        popover: {
          title: 'Custom Title',
          description:
            "Optionally, you can store your results with a custom title.",
        },
      },
      {
        element: '.sr__card',
        popover: {
          title: 'Saved Results',
          description:
            "Here will be displayed all the results that are stored.",
        },
      },
      {
        popover: {
          title: 'Thanks for your time!',
          description:
            'And one more thing, have fun.',
        },
      },
    ],
  });
  driverObj.refresh();


  driverObj.drive();
}
