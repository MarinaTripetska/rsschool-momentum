const toDoListOpen = document.getElementById('toDoListOpen');
const toDoWindow = document.getElementById('toDoWindow');
const btnAddElem = document.getElementById("todo-button-add");
         const inputElem = document.getElementById("input-txt");
      const tasksList = document.querySelector(".tasks-list");
      const notificationElem = document.querySelector(".notification");

      function createMarkup(text) {
        const task = document.createElement("li");
        task.classList.add("task-item");
        // task.textContent = value;
        const taskInputEl = document.createElement("input");
        taskInputEl.classList.add("task-item__content");
        taskInputEl.value = text;
        const btnRemove = document.createElement("button");
        btnRemove.textContent = "x";
        btnRemove.classList.add("btn-remove");
        task.append(taskInputEl, btnRemove);
        tasksList.append(task);
      }

      function createTask() {
        const createdTasksList = [...tasksList.children];

        if (inputElem.value.trim() !== "") {
          if (createdTasksList.length === 0) {
            createMarkup(inputElem.value);
          } else {
            createdTasksList.forEach((el) => {
              const contentEl = el.querySelector(".task-item__content");

              if (contentEl.value === inputElem.value) {
                notificationElem.textContent = "You already create this task";
                return;
              }
            });
            if (notificationElem.textContent === "") {
              createMarkup(inputElem.value);
            }
          }
        } else {
          notificationElem.textContent =
            "Please, enter name of your task before creating element!";
        }
      }
      function removeTask(ev) {
        if (ev.target.nodeName === "BUTTON") {
          ev.target.parentNode.remove();
        }
      }

      btnAddElem.addEventListener("click", createTask);

      inputElem.addEventListener("focus", () => {
        notificationElem.textContent = "";
      });

      tasksList.addEventListener("click", removeTask);

      window.addEventListener("beforeunload", () => {
        const valueArr = [];
        const taskElemArr = [...tasksList.children];

        taskElemArr.forEach((el) => {
          const contentEl = el.querySelector(".task-item__content");
          valueArr.push(contentEl.value);
        });
        localStorage.setItem("taskList", JSON.stringify(valueArr));
      });

      window.addEventListener("load", () => {
        const valueArr = JSON.parse(localStorage.getItem("taskList"));
        if (valueArr && valueArr.length !== 0) {
          valueArr.forEach((value) => {
            createMarkup(value);
          });
        }
      });
toDoListOpen.addEventListener('click', () => {
         toDoWindow.classList.toggle('hidden') 
      })