import {
  ADD_LIST_BTN,
  ADD_LIST_INPUT,
  CARD_HEADER,
  DEL_ALL_LISTS_BTN,
  DEL_LIST_BTN,
  LIST_TITLE,
  MODAL_CANCEL_BTN,
  MODAL_SUBMIT_BTN,
  RENAME_LIST_INPUT,
  RENAME_LIST_RESET_BTN,
  RENAME_LIST_SUBMIT_BTN,
} from "../support/constants";

describe("Работа со списками", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Новый список корректно создается", () => {
    cy.checkTodoListLength(0);
    const inputText = "Новый список";
    cy.typeOnInput(ADD_LIST_INPUT, inputText);
    cy.clickBtn(ADD_LIST_BTN);

    cy.checkTodoListLength(1);
    cy.getDataCy(LIST_TITLE).should("contain.text", inputText);
  });

  it("Существующий список корректно переименовывается", () => {
    const listName = "Изначальный список";
    const newListName = "Переименованный список";

    cy.typeOnInput(ADD_LIST_INPUT, listName);
    cy.clickBtn(ADD_LIST_BTN);

    cy.getDataCy(CARD_HEADER).click();
    cy.typeOnInput(RENAME_LIST_INPUT, newListName); // вбили значение
    cy.clickBtn(RENAME_LIST_SUBMIT_BTN); //нажали на кнопку подтверждения

    // Заголовок должен поменяться
    cy.getDataCy(LIST_TITLE)
      .should("contain.text", newListName)
      .and("not.contain.text", listName);
  });

  it("Сброс переименования проходит верно", () => {
    const listName = "Изначальный список";
    const newListName = "Не должно сохраниться";

    cy.typeOnInput(ADD_LIST_INPUT, listName);
    cy.clickBtn(ADD_LIST_BTN);

    cy.getDataCy(CARD_HEADER).click();
    cy.typeOnInput(RENAME_LIST_INPUT, newListName); // вбили значение
    cy.clickBtn(RENAME_LIST_RESET_BTN); //нажали на кнопку отмены

    // Заголовок НЕ должен поменяться
    cy.getDataCy(LIST_TITLE)
      .should("contain.text", listName)
      .and("not.contain.text", newListName);
  });

  it("Существующий список корректно удаляется", () => {
    const listName = "Удаляемый список";
    cy.typeOnInput(ADD_LIST_INPUT, listName);
    cy.clickBtn(ADD_LIST_BTN);
    cy.checkTodoListLength(1);

    cy.getDataCy(DEL_LIST_BTN).click();
    cy.clickBtn(MODAL_SUBMIT_BTN); // подтверждение удаления
    cy.checkTodoListLength(0);
  });

  it("Удаление списка корректно отменяется", () => {
    const listName = "Удаляемый список";
    cy.typeOnInput(ADD_LIST_INPUT, listName);
    cy.clickBtn(ADD_LIST_BTN);
    cy.checkTodoListLength(1);

    cy.getDataCy(DEL_LIST_BTN).click();
    cy.clickBtn(MODAL_CANCEL_BTN); // отмена удаления
    cy.checkTodoListLength(1);
  });

  it("Несколько списков корректно удаляются вручную", () => {
    const listNames = ["Список 1", "Список 2", "Список 3"];

    listNames.forEach((name) => {
      cy.typeOnInput(ADD_LIST_INPUT, name);
      cy.clickBtn(ADD_LIST_BTN);
    });
    cy.checkTodoListLength(3);

    listNames.forEach(() => {
      cy.getDataCy(DEL_LIST_BTN).first().click(); // жмем каждый раз на первую кнопку удаления
      cy.clickBtn(MODAL_SUBMIT_BTN); // и подтверждаем удаление
    });

    cy.checkTodoListLength(0);
  });

  it("Все списки корректно удаляются по кнопке", () => {
    const listNames = ["Список 1", "Список 2", "Список 3"];

    listNames.forEach((name) => {
      cy.typeOnInput(ADD_LIST_INPUT, name);
      cy.clickBtn(ADD_LIST_BTN);
    });
    cy.checkTodoListLength(3);

    cy.getDataCy(DEL_ALL_LISTS_BTN).click(); // жмем каждый раз на первую кнопку удаления
    cy.clickBtn(MODAL_SUBMIT_BTN); // и подтверждаем удаление

    cy.checkTodoListLength(0);
  });

  it("Удаление всех списков корректно отменяется", () => {
    const listNames = ["Список 1", "Список 2", "Список 3"];

    listNames.forEach((name) => {
      cy.typeOnInput(ADD_LIST_INPUT, name);
      cy.clickBtn(ADD_LIST_BTN);
    });
    cy.checkTodoListLength(3);

    cy.getDataCy(DEL_ALL_LISTS_BTN).click(); // удаляем одним нажатием
    cy.clickBtn(MODAL_CANCEL_BTN); // отмена удаления

    cy.checkTodoListLength(3);
  });
});
