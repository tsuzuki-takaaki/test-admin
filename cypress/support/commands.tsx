/// <reference types="cypress" />
import { AdminContext, ResourceContextProvider } from "react-admin"

Cypress.Commands.add('mountWithAdminContext', (params) => {
  cy.mount(
    <AdminContext dataProvider={params.dataProvider}>
      <ResourceContextProvider value={params.resource}>
        {params.component}
      </ResourceContextProvider>
    </AdminContext>
  )
})
