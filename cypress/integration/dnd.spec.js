import 'cypress-drag-drop';

describe('Функциональный тест для конструктора бургеров', () => {
    before(function () {
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('getIngredients');
        cy.visit('http://localhost:3000');
        cy.wait('@getIngredients').then(() => {
            cy.wait(20000);
        });
    });
    it('должен отображать ингредиенты в контейнере', function () {
        cy.get('[data-testid="burger-ingredients-container"]')
            .should('exist')
            .and('be.visible');
        cy.get('[data-testid^="ingredient-item-"]', {timeout: 20000})
            .should('have.length.greaterThan', 0);
        cy.get('[data-testid="section-buns"]').scrollIntoView().should('exist').and('be.visible');
        cy.get('[data-testid="section-sauces"]').scrollIntoView().should('exist').and('be.visible');
        cy.get('[data-testid="section-fillings"]').scrollIntoView().should('exist').and('be.visible');
    });

    it('должен позволять перетаскивать ингредиенты в конструктор', function () {
        cy.get('[data-testid^="ingredient-item-"]').contains('Соус Spicy-X').first().drag('[data-testid="burger-constructor-container"]');
        cy.get('[data-testid^="ingredient-item-"]').contains('Кристаллы марсианских альфа-сахаридов').first().drag('[data-testid="burger-constructor-container"]');
        cy.get('[data-testid^="ingredient-item-"]').contains('Соус с шипами Антарианского плоскоходца').first().drag('[data-testid="burger-constructor-container"]');
        cy.get('[data-testid^="ingredient-item-"]', {timeout: 10000})
            .contains('Краторная булка N-200i')
            .first()
            .drag('[data-testid="burger-constructor-container"]');
        cy.wait(1000);
        cy.get('[data-testid="burger-components"]')
            .find('[data-testid^="ingredient-"]', {timeout: 10000})
            .should('have.length', 3);
        cy.get('[data-testid="burger-components"]')
            .find('[data-testid^="bun-top"]', {timeout: 10000})
            .should('have.length', 1);
        cy.get('[data-testid="burger-components"]')
            .find('[data-testid^="bun-bottom"]', {timeout: 10000})
            .should('have.length', 1);
    });

    it('должен показывать модальное окно при клике на ингредиент', function () {
        cy.get('[data-testid^="ingredient-item-"]')
            .contains('булка')
            .first()
            .click();
        cy.get('[data-testid="ingredient-details"]')
            .should('exist')
            .and('be.visible');
        cy.get('[data-testid="ingredient-details"]')
            .contains('булка')
            .should('exist');
    });
    it('должен отображать кнопку оформления заказа', function () {
        cy.get('[data-testid="order-button"]')
            .should('exist')
            .and('be.visible');
    });
});
