import {
  ADD_LIST_BTN,
  ADD_LIST_INPUT,
  ADD_TASK_BTN,
  ADD_TASK_INPUT,
  APP_TITLE,
  CARD_HEADER,
  CARD_LIST,
  DEL_ALL_LISTS_BTN,
  DEL_ALL_TASKS_BTN,
  DEL_LIST_BTN,
  DEL_TASK_BTN,
  EDIT_LIST_BTN,
  LIST_TITLE,
  RENAME_LIST_INPUT,
  TASK_CHECKBOX,
  TASK_TITLE,
  TODO_DATE,
} from "../support/constants";

describe("Приложение корректно загружается", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Проверка элементов после первой загрузки", () => {
    // Заголовок приложения на месте
    cy.getDataCy(APP_TITLE)
      .should("have.prop", "tagName", "H1")
      .and("contain.text", "TODO APP");

    // Инпут для добавления нового списка пуст
    cy.getDataCy(ADD_LIST_INPUT).should("not.have.value");

    // Кнопка удаления всех списков заблокирована (разблочится после добавления списка)
    cy.getDataCy(DEL_ALL_LISTS_BTN).should("be.disabled");

    // Списков нет
    cy.getTodoCards().should("not.exist");
    cy.checkTodoListLength(0);

    // Добавляем список
    const inputText = "Список 1";
    cy.typeOnInput(ADD_LIST_INPUT, inputText); // вбили значение
    cy.clickBtn(ADD_LIST_BTN); //нажали на кнопку

    // Проверка элементов после добавления списка
    // Должна добавиться одна карточка
    cy.checkTodoListLength(1);

    // Заголовок соответствует введенному
    cy.getDataCy(LIST_TITLE)
      .should("have.prop", "tagName", "H2")
      .and("contain.text", inputText);

    // Дата отображается
    cy.getDataCy(TODO_DATE).should("exist");

    // В новом списке нет задач
    cy.findDataCyInFirstCard(CARD_LIST).find("li").should("not.exist");

    // Кнопка удаления списка доступна
    cy.getDataCy(DEL_LIST_BTN).should("not.be.disabled");

    // Кнопка удаления всех списков доступна
    cy.getDataCy(DEL_ALL_LISTS_BTN).should("not.be.disabled");

    // Кнопка удаления всех задач отсутствует (появится при добавлении задач)
    cy.getDataCy(DEL_ALL_TASKS_BTN).should("not.exist");

    // Редактирование возможно при клике на заголовок
    cy.getDataCy(EDIT_LIST_BTN).should("be.hidden");
    cy.getDataCy(RENAME_LIST_INPUT).should("not.exist");
    cy.getDataCy(CARD_HEADER).click();
    cy.getDataCy(RENAME_LIST_INPUT).should("exist");

    // Проверка элементов после добавления задачи в список
    // Добавляем задачу
    const taskText = "Задача 1";
    cy.typeOnInput(ADD_TASK_INPUT, taskText); // вбили значение
    cy.clickBtn(ADD_TASK_BTN); //нажали на кнопку
    cy.checkTodoListLength(1); // должен добавиться 1

    // Чекбокс добавленной задачи не отмечен (false)
    cy.getDataCy(TASK_CHECKBOX)
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    // Текст добавленной задачи соответствует введенному в инпут
    cy.getDataCy(TASK_TITLE).should("contain.text", taskText);

    // Кнопка удаления задачи доступна
    cy.getDataCy(DEL_TASK_BTN).should("not.be.disabled");

    // Кнопка удаления всех задач доступна
    cy.getDataCy(DEL_ALL_TASKS_BTN).should("not.be.disabled");
  });
});
