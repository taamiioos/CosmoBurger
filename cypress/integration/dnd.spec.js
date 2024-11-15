import 'cypress-drag-drop';
import {
    TEST_URL,
    INGREDIENTS_URL,
    BURGER_COMPONENTS
} from './../support/constants';

describe('Функциональный тест для конструктора', () => {
    before(function () {
        cy.intercept('GET', INGREDIENTS_URL).as('getIngredients');
        cy.visit(TEST_URL);
        cy.wait('@getIngredients').then(() => {
            cy.wait(20000);
        });
    });

    it('должен отображать ингредиенты в контейнере', function () {
        cy.checkBurgerIngredientsContainer();
        cy.checkSectionsExist();
    });

    it('должен позволять перетаскивать ингредиенты в конструктор', function () {
        cy.dragIngredientToConstructor('Соус Spicy-X');
        cy.dragIngredientToConstructor('Кристаллы марсианских альфа-сахаридов');
        cy.dragIngredientToConstructor('Соус с шипами Антарианского плоскоходца');
        cy.dragIngredientToConstructor('Краторная булка N-200i');
        cy.wait(1000);
        cy.get(BURGER_COMPONENTS)
            .find('[data-testid^="ingredient-"]', {timeout: 10000})
            .should('have.length', 3);
        cy.get(BURGER_COMPONENTS)
            .find('[data-testid^="bun-top"]', {timeout: 10000})
            .should('have.length', 1);
        cy.get(BURGER_COMPONENTS)
            .find('[data-testid^="bun-bottom"]', {timeout: 10000})
            .should('have.length', 1);
    });

    it('должен показывать модальное окно при клике на ингредиент', function () {
        cy.checkModalForIngredient('булка');
    });

    it('должен отображать кнопку оформления заказа', function () {
        cy.checkOrderButton();
    });
});
