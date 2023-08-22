import { Edit, SimpleForm, TextInput } from "react-admin"

// fix props
export const UserEdit = (props: any) => (
  <Edit id={props.id}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
)
