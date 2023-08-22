import { UserCreate } from "./UserCreate"

describe('<UserCreate />', () => {
  beforeEach(() => {
    cy.mountWithAdminContext({
      resource: 'users',
      component: <UserCreate />
    })
  })

  it('displays name input and can type', () => {
    cy.get('input#name').should('exist')
    cy.get('input#name').type('hello world')
    // please check the change of submit button when type input field
  })
})
