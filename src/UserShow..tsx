import { Show, SimpleShowLayout, TextField } from "react-admin"

export const UserShow = (props: any) => {
  return (
    // this maybe not working and anti pattern
    <Show id={props.id}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" /> 
      </SimpleShowLayout>
   </Show>
  )
}
