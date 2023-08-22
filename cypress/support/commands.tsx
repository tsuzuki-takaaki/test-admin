/// <reference types="cypress" />
import { AdminContext, ResourceContextProvider } from "react-admin"

Cypress.Commands.add('mountWithAdminContext', (dataProvider, resource, component) => {
  cy.mount(
    <AdminContext dataProvider={dataProvider}>
      <ResourceContextProvider value={resource}>
        {component}
      </ResourceContextProvider>
    </AdminContext>
  )
})
