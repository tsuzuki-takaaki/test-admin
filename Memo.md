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

※ これschemaあったら嬉しいかもなと思った
```
  % curl https://jsonplaceholder.typicode.com/users/2
```
```
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  }
```
### Composing Components
```tsx
  export const UserList = () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        ...
      </Datagrid>
    </List>
  );
```
- `List`component
  - reads the query parameters from the URL
  - calls the API based on these parameters
  - puts the result in a **React context**
  -  It also builds a set of callbacks allowing child components to modify the list filters, pagination, and sorting.
  - めちゃくちゃいろんなことができる

```tsx
  <List>
    {/* children */}
  </List>
```
↑ この構造を意識するのがいいらしい

- 複雑になるのが嫌なので、`<List>`はdata fetchの責任のみを持つようにする
- => renderingはその子コンポーネントに委託するようにする
- ↑ の例で言うと、`<Datagrid>`に委託してる
- `<Datagrid>`以外にも`SimpleList`って言うのもある
  - これはたくさんあってUIをカスタムできる

### Writing A Custom List Component
responsiveもできる
`useMediaQuery`とかを使えばよしなにやってくれる
※ 割愛

### Selecting Columns
> Each Field component maps a different field in the API response, specified by the source prop.

### Using Field Types
- Fieldのオプションは結構ある
  - https://marmelab.com/react-admin/Fields.html
- options
  - `source`: Name of the property to display
  - `label`: Used as a Datagrid column header or in a Show layout
  - `record`: Object containing the properties to display, to override the record from the current RecordContext
  - `sortable`: When used in a List, should the list be sortable using the source attribute? Setting it to false disables the click handler on the column header.
  - `sortBy`: When used in a List, specifies the actual source to be used for sorting when the user clicks the column header
  - ... 

### 結論
- `Resource`: Routing
- `List`: Data Fetch
- `Nested component by List`: rendering the children
