import { Show, SimpleShowLayout, TextField } from "react-admin"
export const UserShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" /> 
      </SimpleShowLayout>
   </Show>
  )
}
