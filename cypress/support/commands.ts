/// <reference types="cypress" />

import { CARD_LIST, TODO_CARD, TODOLISTS } from "./constants";

// простые действия
// выбрать по значению атрибута data-cy
Cypress.Commands.add("getDataCy", (dataCySelector) => {
  return cy.get(`[data-cy=${dataCySelector}]`);
});
// выбрать все списки todo (карточки)
Cypress.Commands.add("getTodoCards", () => {
  return cy.getDataCy(TODOLISTS).find(`[data-cy=${TODO_CARD}]`);
});
// найти внутри первой карточки по значению атрибута data-cy
Cypress.Commands.add("findDataCyInFirstCard", (dataCySelector) => {
  return cy.getTodoCards().eq(0).find(`[data-cy=${dataCySelector}]`);
});

// вбить в нужный инпут текст
Cypress.Commands.add("typeOnInput", (inputSelector, inputText) => {
  cy.getDataCy(inputSelector).type(inputText);
});
// нажать нужную кнопку
Cypress.Commands.add("clickBtn", (btnSelector) => {
  cy.getDataCy(btnSelector).click();
});

// проверки
// проверка длины списка карточек todo
Cypress.Commands.add("checkTodoListLength", (expectedLength) => {
  cy.getTodoCards().should("have.length", expectedLength);
});

Cypress.Commands.add("checkCardTasksLength", (expectedLength) => {
  cy.getDataCy(CARD_LIST).within(() => {
    cy.get("li").should("have.length", expectedLength);
  });
});
