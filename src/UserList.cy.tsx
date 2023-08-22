import { Admin, AdminContext, GetListResult, Resource, ResourceContextProvider, testDataProvider } from 'react-admin'
import { UserList } from './UserList'
import { UserCreate } from './UserCreate'
import { UserEdit } from './UserEdit'

const testData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    },
  },
]

describe('<UserList />', () => {
  beforeEach(() => {
    cy.mount(
      <AdminContext
        dataProvider={testDataProvider({
          getList: () => 
            Promise.resolve<GetListResult>({
              data: testData,
              total: 1
            })
        })}
      >
        <ResourceContextProvider value='users'>
          <UserList />
        </ResourceContextProvider>
      </AdminContext>
    )
  })

  context('when visit /users', () => {
    it('displays user list', () => {
      cy.get('td.column-id > span').should('have.text', '1')
      cy.get('td.column-name > span').should('have.text', 'Leanne Graham')
    })
  })

  // when click target record, cypress not return any response and will sleep
  // that's why comment out this context
  // context('when click target record', () => {
  //   it('redirects to show page', () => {
  //     cy.get('tr.RaDatagrid-clickableRow').click()
  //     cy.url().should('include', '/users/1')
  //   })
  // })

  // Need <Admin> not <AdminContext> because depends on <AdminUi> included in <Admin>
  // context('when click create button', () => {
  //   it('redirects to create page', () => {
  //     cy.get('[aria-label="Create"]').click()
  //     cy.url().should('include', '/users/create')
  //   })
  // })
})
