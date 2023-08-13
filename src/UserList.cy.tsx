import { Admin, GetListResult, Resource, testDataProvider } from 'react-admin'
import { UserList } from './UserList'
import { UserCreate } from './UserCreate'
import { UserEdit } from './UserEdit'

describe('<UserList />', () => {
  beforeEach(() => {
    cy.mount(
      <Admin
        dataProvider={testDataProvider({
          getList: () => 
            Promise.resolve<GetListResult>({
              data: [
                {
                  id: '1',
                  name: 'hello world'
                }
              ],
              total: 1
            })
        })}
      >
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
      </Admin>
    )
  })

  it('displays id and name', () => {
    cy.get('td.column-id > span').should('have.text', '1')
    cy.get('td.column-name > span').should('have.text', 'hello world')
  })

  context('when click new record button', () => {
    it('chages url to show one', () => {
      cy.get('a.RaCreateButton-floating').click()
      cy.url().should('include', 'create')
    })
  })
})
