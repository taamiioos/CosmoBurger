import {
    INGREDIENT_ITEM,
    BURGER_CONSTRUCTOR_CONTAINER,
    BURGER_COMPONENTS,
    ORDER_BUTTON,
    INGREDIENT_DETAILS,
    SECTION_BUNS,
    SECTION_SAUCES,
    SECTION_FILLINGS
} from './constants';

Cypress.Commands.add('dragIngredientToConstructor', (ingredientName) => {
    cy.get(INGREDIENT_ITEM)
        .contains(ingredientName)
        .first()
        .drag(BURGER_CONSTRUCTOR_CONTAINER);
});
Cypress.Commands.add('checkBurgerIngredientsContainer', () => {
    cy.get('[data-testid="burger-ingredients-container"]')
        .should('exist')
        .and('be.visible');
    cy.get(INGREDIENT_ITEM, {timeout: 20000})
        .should('have.length.greaterThan', 0);
});

Cypress.Commands.add('checkSectionsExist', () => {
    cy.get(SECTION_BUNS).scrollIntoView().should('exist').and('be.visible');
    cy.get(SECTION_SAUCES).scrollIntoView().should('exist').and('be.visible');
    cy.get(SECTION_FILLINGS).scrollIntoView().should('exist').and('be.visible');
});
Cypress.Commands.add('checkModalForIngredient', (ingredientName) => {
    cy.get(INGREDIENT_ITEM)
        .contains(ingredientName)
        .first()
        .click();
    cy.get(INGREDIENT_DETAILS)
        .should('exist')
        .and('be.visible');
    cy.get(INGREDIENT_DETAILS)
        .contains(ingredientName)
        .should('exist');
});
Cypress.Commands.add('checkOrderButton', () => {
    cy.get(ORDER_BUTTON)
        .should('exist')
        .and('be.visible');
});
