import {
  ADD_LIST_BTN,
  ADD_LIST_INPUT,
  ADD_TASK_BTN,
  ADD_TASK_INPUT,
  DEL_ALL_TASKS_BTN,
  DEL_TASK_BTN,
  TASK_CHECKBOX,
  TASK_TITLE,
} from "../support/constants";

describe("Работа с задачами в списках", () => {
  beforeEach(() => {
    cy.visit("");
    // предварительная настройка: добавление списка для работы с задачами
    const listName = "Тестовый список";
    cy.typeOnInput(ADD_LIST_INPUT, listName);
    cy.clickBtn(ADD_LIST_BTN);
  });

  it("Новая задача корректно добавляется в список", () => {
    const taskText = "Новая задача";
    cy.typeOnInput(ADD_TASK_INPUT, taskText);
    cy.clickBtn(ADD_TASK_BTN);

    cy.checkCardTasksLength(1);
    cy.getDataCy(TASK_TITLE).should("contain.text", taskText);
  });

  it("Существующий список корректно переключает состояние задачи (завершенная/незавершенная)", () => {
    const taskText = "Задача для завершения";
    cy.typeOnInput(ADD_TASK_INPUT, taskText);
    cy.clickBtn(ADD_TASK_BTN);

    cy.getDataCy(TASK_CHECKBOX)
      .find('input[type="checkbox"]')
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked");
  });

  it("Существующая задача корректно удаляется", () => {
    const taskText = "Задача для удаления";
    cy.typeOnInput(ADD_TASK_INPUT, taskText);
    cy.clickBtn(ADD_TASK_BTN);

    cy.getDataCy(DEL_TASK_BTN).should("be.hidden").click({ force: true });

    cy.checkCardTasksLength(0);
  });

  it("Все задачи в конкретном списке корректно удаляются", () => {
    const taskNames = ["Задача 1", "Задача 2"];

    taskNames.forEach((task) => {
      cy.typeOnInput(ADD_TASK_INPUT, task);
      cy.clickBtn(ADD_TASK_BTN);
    });

    cy.getDataCy(DEL_ALL_TASKS_BTN).click();

    cy.checkCardTasksLength(0);
    cy.getDataCy(DEL_ALL_TASKS_BTN).should("not.exist");
  });
});
