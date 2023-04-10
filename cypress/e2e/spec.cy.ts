/// <reference types="cypress" />

describe('Main page', () => {
  beforeEach(() => {
    cy.intercept('https://api.coincap.io/v2/assets?limit=10&offset=0').as('getList')
    cy.intercept('https://api.coincap.io/v2/assets?limit=3').as('getPopular')
    cy.visit('/');
    cy.wait('@getList')
    cy.wait('@getPopular')
  });

  describe('1920x1080', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });

    it('Check desktop', () => {
      cy.get('[data-cypress=header]').should('be.exist').screenshot('header-desktop')
      cy.get('[data-cypress=coins-list-body]').should('be.exist').screenshot('coins-list-body-desktop')
      cy.get('[data-cypress=coins-list-item]').should('be.exist')
      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-desktop')
    })
  });

  describe('768x576', () => {
    beforeEach(() => {
      cy.viewport(768, 576);
    });

    it('Check tablet', () => {
      cy.get('[data-cypress=header]').should('be.exist').screenshot('header-tablet')
      cy.get('[data-cypress=coins-list-body]').should('be.exist').screenshot('coins-list-body-tablet')
      cy.get('[data-cypress=coins-list-item]').should('be.exist')
      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-tablet')
    })
  });

  describe('375x667', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('Check mobile', () => {
      cy.get('[data-cypress=header]').should('be.exist').screenshot('header-mobile')
      cy.get('[data-cypress=coins-list-body]').should('be.exist').screenshot('coins-list-body-mobile')
      cy.get('[data-cypress=coins-list-item]').should('be.exist')
      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-mobile')
    })
  });

  describe('Popular coins', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });

    it('Check getting popular coins', () => {
      cy.intercept('https://api.coincap.io/v2/assets?limit=3').as('popular')

      cy.visit('/');
      cy.get('[data-cypress=header]>div').first().should('be.exist')
        .filter(':contains("Popular coins:")').contains('0').not('div')
      cy.wait('@popular')
      cy.get('[data-cypress=header]>div').first().should('be.exist').filter(':contains("Popular coins:")')
        .screenshot('popular-coins')
        .within(() => {
          cy.get('div').should('have.length', 3).contains(/[A-Z]{3,4}/gm).contains(/\$[\d]{1,9}\.[\d]{1,3}/gm)
        })
    })
  });

  describe('Buying', () => {
    it('Check empty portfolio', () => {
      cy.get('[data-cypress=header]').should('be.exist')
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=portfolio-button]').should('be.exist').contains('$0.0', { matchCase: false })
        .screenshot('portfolio-button-empty-main-page').click()
      cy.get('[data-cypress=modal]').should('be.visible').screenshot('modal-portfolio-empty')
      cy.get('[data-cypress=warning]').should('be.exist')
      cy.get('[data-cypress=modal-close]').should('be.exist').click()
      cy.get('[data-cypress=modal]').should('not.be.exist')
    })
    it('Check buying and selling', () => {
      cy.intercept('https://api.coincap.io/v2/assets/*').as('coin')

      cy.get('[data-cypress=header]').should('be.exist')
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=coins-list-item]').should('be.exist').first().find('[data-cypress=button]').should('exist').click()
      cy.get('[data-cypress=modal]').should('be.exist').screenshot('modal-buying-clicked-coin')
      cy.get('[data-cypress=form]').should('be.exist').within(() => {
        cy.get('[data-cypress=input]').should('be.exist').click().type('10').blur()
        cy.get('[data-cypress=button]').should('be.exist').click()
      })
      cy.wait('@coin')
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=portfolio-button]').should('be.exist').screenshot('portfolio-button-not-empty-main-page').click()
      cy.get('[data-cypress=warning]').should('not.be.exist')
      cy.get('[data-cypress=modal]').should('be.exist')
        .screenshot('modal-portfolio-not-empty')
        .find('[data-cypress=button]').click()
      cy.get('[data-cypress=warning]').should('be.exist')
      cy.get('[data-cypress=modal-close]').should('be.exist').click()
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=portfolio-button]').should('be.exist').contains('$0.0', { matchCase: false })
        .screenshot('portfolio-button-empty-again-main-page')
    })
  });

  describe('Pagination', () => {
    it('Pagination typed', () => {
      cy.intercept('GET', 'https://api.coincap.io/v2/assets?limit=10&offset=10').as('page2')
      cy.intercept('GET', 'https://api.coincap.io/v2/assets?limit=10&offset=0').as('page1')

      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-first-page').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('1', { matchCase:false })
        cy.get('[data-cypress=button]').contains('prev', { matchCase:false }).should('be.disabled');
        cy.get('[data-cypress=button]').contains('next', { matchCase:false }).should('be.enabled').click();
        cy.wait('@page2')
      })
      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-second-page').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('2', { matchCase:false })
        cy.get('[data-cypress=button]').contains('prev', { matchCase:false }).should('be.enabled').click();
        cy.wait('@page1')
      })
      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-first-page-again').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('1', { matchCase:false })
        cy.get('[data-cypress=button]').contains('prev', { matchCase:false }).should('be.disabled');
      })
    })
    it('Pagination from search params', () => {
      cy.intercept('GET', 'https://api.coincap.io/v2/assets?limit=10&offset=0').as('page1')
      cy.intercept('GET', 'https://api.coincap.io/v2/assets?limit=10&offset=990').as('page100')
      cy.intercept('GET', 'https://api.coincap.io/v2/assets?limit=10&offset=99990').as('page10000')
      cy.intercept('GET', 'https://api.coincap.io/v2/assets?limit=3').as('popular')

      cy.visit('/?page=100')
      cy.wait('@page100')
      cy.get('[data-cypress=coins-list-body]').should('be.exist').screenshot('coins-list-on-100-page')
      cy.get('[data-cypress=coins-list-item]').should('be.exist')
      cy.get('[data-cypress=pagination]').should('be.exist').screenshot('pagination-on-100-page').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('100', { matchCase:false })
      })

      cy.visit('/?page=10000')
      cy.wait('@page10000')
      cy.wait('@popular')
      cy.get('[data-cypress=coins-list-item]').should('not.be.exist')
      cy.get('[data-cypress=coins-list-body]').should('be.exist').screenshot('coins-list-on-10000').within(() => {
        cy.get('[data-cypress=button]').contains('go to the first page', { matchCase: false }).should('be.exist')
        cy.get('[data-cypress=button]').contains('go to the previous page', { matchCase: false }).should('be.exist').as('prevPageButton')
        cy.get('@prevPageButton').should('be.exist').click()
      })

      cy.wait('@page100')
      cy.wait('@popular')
      cy.get('[data-cypress=pagination]').should('be.exist').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('100', { matchCase:false })
      })

      cy.visit('/?page=10000')
      cy.wait('@page10000')
      cy.wait('@popular')
      cy.get('[data-cypress=coins-list-item]').should('not.be.exist')
      cy.get('[data-cypress=coins-list-body]').should('be.exist').within(() => {
        cy.get('[data-cypress=button]').contains('go to the previous page', { matchCase: false }).should('be.exist')
        cy.get('[data-cypress=button]').contains('go to the first page', { matchCase: false }).should('be.exist').as('firstPageButton')
        cy.get('@firstPageButton').should('be.exist').click()
      })

      cy.wait('@page1')
      cy.get('[data-cypress=pagination]').should('be.exist').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('1', { matchCase:false })
      })

      cy.visit('/?page=wrongPageNumber')
      cy.wait('@page1')
      cy.get('[data-cypress=pagination]').should('be.exist').within(() => {
        cy.get('[data-cypress=pagination-current]').contains('1', { matchCase:false })
      })
    })
  })
});

describe('Coin page', () => {
  beforeEach(() => {
    cy.intercept('https://api.coincap.io/v2/assets/*').as('getCoin')
    cy.intercept('https://api.coincap.io/v2/assets?limit=3').as('getPopular')
    cy.intercept('https://api.coincap.io/v2/assets/*/history?interval=d1').as('getHistory')
    cy.visit('/bitcoin');
    cy.wait('@getCoin')
    cy.wait('@getPopular')
    cy.wait('@getHistory')
    cy.wait(2000)
  });

  describe('1920x1080', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });

    it('Check desktop', () => {
      cy.get('[data-cypress=header]').should('be.exist')
      cy.get('[data-cypress=diagram]').should('be.exist').screenshot('diagram-desktop')
      cy.get('[data-cypress=form]').should('be.exist').screenshot('form-desktop')
      cy.get('[data-cypress=coin-full]').should('be.exist').screenshot('coin-full-desktop')
      cy.get('[data-cypress=button]').contains('back', { matchCase: false }).should('be.exist')
    })
  });

  describe('768x576', () => {
    beforeEach(() => {
      cy.viewport(768, 576);
    });

    it('Check tablet', () => {
      cy.get('[data-cypress=header]').should('be.exist')
      cy.get('[data-cypress=diagram]').should('be.exist').screenshot('diagram-tablet')
      cy.get('[data-cypress=form]').should('be.exist').screenshot('form-tablet')
      cy.get('[data-cypress=coin-full]').should('be.exist').screenshot('coin-full-tablet')
      cy.get('[data-cypress=button]').contains('back', { matchCase: false }).should('be.exist')
    })
  });

  describe('375x667', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('Check mobile', () => {
      cy.get('[data-cypress=header]').should('be.exist')
      cy.get('[data-cypress=diagram]').should('be.exist').screenshot('diagram-mobile')
      cy.get('[data-cypress=form]').should('be.exist').screenshot('form-mobile')
      cy.get('[data-cypress=coin-full]').should('be.exist').screenshot('coin-full-mobile')
      cy.get('[data-cypress=button]').contains('back', { matchCase: false }).should('be.exist')
    })
  });

  describe('Coin data', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });

    it('Undefined coin', () => {
      cy.intercept('https://api.coincap.io/v2/assets/undefinedCoin').as('getUndefinedCoin')
      cy.intercept('https://api.coincap.io/v2/assets/undefinedCoin/history?interval=d1').as('getUndefinedCoinHistory')

      cy.visit('/undefinedCoin')
      cy.wait('@getUndefinedCoin')
      cy.wait('@getUndefinedCoinHistory')

      cy.get('[data-cypress=diagram]').should('not.be.exist')
      cy.get('[data-cypress=form]').should('not.be.exist')
      cy.get('[data-cypress=coin-full]').should('not.be.exist')

      cy.get('[data-cypress=warning]').should('be.exist').screenshot('undefined-coin-warning')
    })
    it('Bitcoin', () => {
      cy.intercept('https://api.coincap.io/v2/assets/bitcoin').as('getBitcoin')
      cy.intercept('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1').as('getBitcoinHistoryD1')

      cy.visit('/bitcoin')
      cy.wait('@getBitcoin')
      cy.wait('@getBitcoinHistoryD1')

      cy.get('[data-cypress=warning]').should('not.be.exist')
      cy.get('[data-cypress=diagram]').should('be.exist')
      cy.get('[data-cypress=form]').should('be.exist')
      cy.get('[data-cypress=coin-full]').should('be.exist').within(() => {
        cy.get('span').contains('bitcoin', { matchCase:false })
      })
    })
    it('Diagram with intervals', () => {
      cy.intercept('https://api.coincap.io/v2/assets/bitcoin').as('getBitcoin')
      cy.intercept('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1').as('getBitcoinHistoryD1')
      cy.intercept('https://api.coincap.io/v2/assets/bitcoin/history?interval=m1').as('getBitcoinHistoryM1')

      cy.visit('/bitcoin')

      cy.wait('@getBitcoin')
      cy.wait('@getBitcoinHistoryD1')
      cy.wait(2000)
      cy.get('[data-cypress=diagram]').should('be.exist').within(() => {
        cy.get('svg').screenshot('diagram-bitcoin-interval-d1')
        cy.get('[data-cypress=interval]').first().click()
      })
      cy.wait('@getBitcoinHistoryM1')
      cy.wait(2000)
      cy.get('[data-cypress=diagram]').should('be.exist').within(() => {
        cy.get('svg').screenshot('diagram-bitcoin-interval-m1')
      })
    })
  });

  describe('Buying', () => {
    it('Check empty portfolio', () => {
      cy.get('[data-cypress=header]').should('be.exist')
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=portfolio-button]').should('be.exist').contains('$0.0', { matchCase: false })
        .screenshot('portfolio-button-empty-coin-page').click()
      cy.get('[data-cypress=modal]').should('be.visible')
      cy.get('[data-cypress=warning]').should('be.exist')
      cy.get('[data-cypress=modal-close]').should('be.exist').click()
      cy.get('[data-cypress=modal]').should('not.be.exist')
    })
    it('Check buying and selling', () => {
      cy.get('[data-cypress=form]').should('be.exist').within(() => {
        cy.get('[data-cypress=input]').should('be.exist').click().type('10').blur()
        cy.get('[data-cypress=button]').should('be.exist').click()
      })
      cy.wait('@getCoin')
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=portfolio-button]').should('be.exist')
        .screenshot('portfolio-button-not-empty-coin-page').click()
      cy.get('[data-cypress=warning]').should('not.be.exist')

      cy.get('[data-cypress=modal]').should('be.exist').within(() => {
        cy.get('div>p').contains('bitcoin', { matchCase:false }).next('ul').within(() => {
          cy.get('li>div').contains('count', { matchCase:false }).find('span').contains('10')
        })
      })
      cy.get('[data-cypress=modal]').should('be.exist').find('[data-cypress=button]').click()
      cy.get('[data-cypress=warning]').should('be.exist')
      cy.get('[data-cypress=modal-close]').should('be.exist').click()
      cy.get('[data-cypress=modal]').should('not.be.exist')
      cy.get('[data-cypress=portfolio-button]').should('be.exist').contains('$0.0', { matchCase: false })
        .screenshot('portfolio-button-empty-again-coin-page')
    })
  });

  describe('Back button', () => {
    it('Return to previous page', () => {
      cy.visit('/ethereum');
      cy.wait('@getCoin')

      cy.get('[data-cypress=coin-full]').should('be.exist').within(() => {
        cy.get('span').contains('ethereum', { matchCase:false })
      }).screenshot('coin-data-of-new-coin-page')

      cy.get('[data-cypress=button]').contains('back', { matchCase:false }).click()
      cy.wait('@getCoin')

      cy.get('[data-cypress=coin-full]').should('be.exist').within(() => {
        cy.get('span').contains('bitcoin', { matchCase:false })
      }).screenshot('coin-data-of-previous-coin-page')
    })
  });
})
