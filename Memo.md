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

### Writing A Custom Field
> In react-admin, fields are just React components. When rendered, they grab the record fetched from the API (e.g. { "id": 2, "name": "Ervin Howell", "website": "anastasia.net", ... })

これ使っていい感じにカスタムできる

> For each row, `<Datagrid>` creates a RecordContext and stores the current record in it. useRecordContext allows to read that record.

↑ 行ごとで持てる

### Customizing Styles
> React-admin relies on Material UI, a set of React components modeled after Google’s Material Design Guidelines.

>  All Material UI components (and most react-admin components) support a prop called sx, which allows custom inline styles. Let’s take advantage of the sx prop to remove the underline from the link and add an icon:

`css in js`記法でかく

### Handling Relationships
relationもいけちゃう
> React-admin knows how to take advantage of these foreign keys to fetch references.

`ListGusser`を使ってみてみる

![スクリーンショット 2023-08-08 0 18 22](https://github.com/tsuzuki-takaaki/test-admin/assets/77610894/699305d6-b807-41e8-a03b-dae52b0bc631)

↑に基づいてpost用のコンポーネントを作ってみる

```tsx
  import { Datagrid, List, ReferenceField, TextField } from "react-admin";

  export const PostList = () => (
    <List>
      <Datagrid rowClick="edit">
        <ReferenceField source="userId" reference="users" />
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
      </Datagrid>
    </List>
  );
```
```tsx
  const App = () => (
      <Admin dataProvider={dataProvider}>
          <Resource name="posts" list={PostList} />
  -       <Resource name="users" list={UserList} />
  +       <Resource name="users" list={UserList} recordRepresentation="name" />
      </Admin>
  );
```
postにuserのリレーションがある時にnameを表示するようになる
> The `<ReferenceField>` component fetches the reference data, creates a RecordContext with the result, and renders the record representation (or its children).

Networkタブてuserにリクエストが飛んでるのがわかる

### Adding Editing Capabilities
`ListGusser`だけでなく、`EditGusser`もある
```tsx
  <Resource name="posts" list={PostList} edit={EditGuesser}/>
```
edit画面を開くと、consoleにgusserがanalyzeした結果が表示される

![スクリーンショット 2023-08-08 0 46 08](https://github.com/tsuzuki-takaaki/test-admin/assets/77610894/cfca2ca9-a1fb-4b16-b6a9-77e523b1ebd8)

↑ に基づいて`PostEdit`を作成する
```tsx
  <Resource name="posts" list={PostList} edit={PostEdit} />
```
> If you’ve understood the `<List>` component, the `<Edit>` component will be no surprise. It’s responsible for fetching the record, and displaying the page title. It passes the record down to the `<SimpleForm>` component, which is responsible for the form layout, default values, and validation.

### Adding Creation Capabilities
fetchだけでなく、post, put, patchできるようにする
EditとCraeteの違いはidぐらい

```tsx
  export const PostCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="userId" reference="users" />
        <TextInput source="title" />
        <TextInput source="body" multiline rows={5} />
      </SimpleForm>
    </Create>
  );
```
- 呼ぶ側はcreate optionを指定するだけ
```tsx
  <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
```
> Tip: The`<PostEdit>` and the `<PostCreate>` components use almost the same child form, except for the additional id input in `<PostEdit>`. In most cases, the forms for creating and editing a record are a bit different, because most APIs create primary keys server-side. But if the forms are the same, you can share a common form component in `<PostEdit>` and `<PostCreate>`.

### Optimistic Rendering And Undo
↑ の例では実際にpostされていない => JSONPlaceholder is a read-only API

なのにlistに表示されたのはなぜか？

↓

react-adminがいい感じにoptimizeしてるから

> That’s because react-admin uses optimistic updates. When a user edits a record and hits the “Save” button, the UI shows a confirmation and displays the updated data before sending the update query to server. T


### 結論
- `Resource`: Routing
- `List`: Data Fetch
- `Nested component by List`: rendering the children
- `Edit`: Data Fetch
