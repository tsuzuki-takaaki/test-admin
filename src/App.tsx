import { Admin, ListGuesser, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./UserList";
import { PostList } from "./PostList";

export const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} recordRepresentation="name" />
      <Resource name="posts" list={PostList} />
    </Admin>
  );
};
