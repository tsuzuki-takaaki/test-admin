// in src/users.tsx
import { List, SimpleList, Datagrid, TextField } from "react-admin";

export const UserList = () => {
  const isSmall = null //useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
        </Datagrid>
      )}
    </List>
  );
};
