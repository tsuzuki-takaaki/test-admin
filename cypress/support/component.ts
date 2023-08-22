import './commands'
import { mount, MountReturn } from 'cypress/react18'
import { DataProvider, LegacyDataProvider } from 'react-admin'

type MountWithAdminContext = (
  dataProvider: DataProvider | LegacyDataProvider,
  resource: string,
  component: JSX.Element
) => Cypress.Chainable<MountReturn>

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      mountWithAdminContext: MountWithAdminContext
    }
  }
}

Cypress.Commands.add('mount', mount)
