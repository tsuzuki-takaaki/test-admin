- React-admin apps are single-Page-Apps (SPAs) running in the browser, and fetching data from an API. 
-  an `<Admin>` component, which is the root component of a react-admin application.
- dataProvider
  - Since there is no standard for data exchanges between computers, react-admin needs an adapter to talk to your API. This adapter is called a Data Provider.
  - このtutorialでは`ra-data-json-server`を使う
    - https://github.com/marmelab/react-admin/blob/master/packages/ra-data-json-server/README.md
  - 他のdata-providerの候補
    - https://marmelab.com/react-admin/DataProviderList.html

### Resource
```tsx
  import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
  import { dataProvider } from './dataProvider';

  export const App = () => (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
```
- `<Resource name="users" />`にすると、`dataProviderのurl/users`にリクエストが飛ぶ
  - この例では、`https://jsonplaceholder.typicode.com/users?_end=10&_order=ASC&_sort=id&_start=0`こんな感じのリクエストが飛んでる
  - `list={ListGuesser}`はapiからのdataからいい感じに推測して、表示する
  - headerとかを触るとクエリパラメータが変わる
  - => nameでエンドポイントを指定して、クエリパラメータに関してはよしなにやってくれる
- `Mapping API Endpoints With Resources` <- これが全て

### Writing A Page Component
↑ の例では`ListGuesser`を使ったが、これはproduction用ではない(簡単に構築したい時用)
=> `ListGuesser`をreplaceする必要がある
`ListGuesser`は天才なので、consoleに予想されるcomponentの構造を出力している

![スクリーンショット 2023-08-07 22 57 52](https://github.com/tsuzuki-takaaki/test-admin/assets/77610894/ed9d92c0-3653-4664-a511-56ccb1727c77)

↑ これを元にcomponentを構築してみる
