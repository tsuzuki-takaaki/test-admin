import { Admin, GetListResult, Resource, testDataProvider } from 'react-admin'
import { UserList } from './UserList'
import { UserCreate } from './UserCreate'
import { UserEdit } from './UserEdit'

describe('<UserList />', () => {
  it('hello world', () => {
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
    cy.get('td.column-id > span').should('have.text', '1')
    cy.get('td.column-name > span').should('have.text', 'hello world')
  })
})
