import { Typography } from "@mui/material";
import { formatDate } from "../utils/util";
import { useSelector } from "react-redux";
import { auth } from "../features/Login.reducer";
import { serviceProviderRole } from "../constants";

const LogDesc = ({ log }) => {
  const user = useSelector(auth);
  const userRole = user.role;
  const getUpdatedBy = (role) => {
    if (userRole === role) return "Self";
    if (userRole === serviceProviderRole) {
      return "Customer";
    } else {
      return "Service Provider";
    }
  };
  return (
    <Typography variant="h6">
      Moved To {log.orderStatus.status} Status On{" "}
      {formatDate(log.updatedOn, false)} By {getUpdatedBy(log.updatedBy)}
    </Typography>
  );
};

export default LogDesc;
