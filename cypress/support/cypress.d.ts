// определяем namespace Cypress отдельно, чтоб можно было импортировать переменные в файл с командами

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getDataCy(dataCySelector: string): Chainable<JQuery<HTMLElement>>;
      getTodoCards(): Chainable<JQuery<HTMLLIElement>>;
      findDataCyInFirstCard(
        dataCySelector: string
      ): Chainable<JQuery<HTMLElement>>;

      typeOnInput(
        inputSelector: string,
        inputText: string
      ): Chainable<JQuery<HTMLInputElement>>;
      clickBtn(btnSelector: string): Chainable<JQuery<HTMLButtonElement>>;

      checkTodoListLength(
        expectedLength: number
      ): Chainable<JQuery<HTMLElement>>;
      checkCardTasksLength(
        expectedLength: number
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
