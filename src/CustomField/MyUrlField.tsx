// in src/MyUrlField.tsx
import { Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useRecordContext } from "react-admin";

export const MyUrlField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  // ↑ JSのobject(e.g. { "id": 2, "name": "Ervin Howell", "website": "anastasia.net", ... })
  return record ? (
    <Link href={record[source]} sx={{ textDecoration: "none" }}>
      {record[source]}
      <LaunchIcon sx={{ fontSize: 15, ml: 1 }} />
    </Link>
  ) : null;
};
