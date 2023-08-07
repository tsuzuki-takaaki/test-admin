// in src/MyUrlField.tsx
import { useRecordContext } from "react-admin";

export const MyUrlField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  // ↑ JSのobject(e.g. { "id": 2, "name": "Ervin Howell", "website": "anastasia.net", ... })
  if (!record) return null;
  return <a href={record[source]}>{record[source]}</a>;
};
