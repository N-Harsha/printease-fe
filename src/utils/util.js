import { customerRole, statusList } from "../constants";

export function formatDate(isoDateString, giveLineBreak = true) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  let hours = date.getHours();
  const amPm = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return giveLineBreak ? (
    <div>
      <div>{`${day}/${month}/${year}`}</div>
      <div>{`${hours}:${minutes} ${amPm}`}</div>
    </div>
  ) : (
    <div>{`${day}/${month}/${year} ${hours}:${minutes} ${amPm}`}</div>
  );
}

export const getColor = (status) => {
  switch (status) {
    case "Pending":
      return "info.main";
    case "Accepted":
    case "In Progress":
      return "success.main";
    case "Rejected":
    case "Cancelled":
      return "error.main";
    default:
      return "black";
  }
};

export function getFileExtension(contentType) {
  if (contentType === "application/pdf") {
    return "pdf";
  } else if (
    contentType === "application/msword" ||
    contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  } else if (
    contentType === "application/vnd.ms-excel" ||
    contentType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "xlsx";
  } else if (
    contentType === "application/vnd.ms-powerpoint" ||
    contentType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return "pptx";
  } else if (contentType === "text/plain") {
    return "txt";
  } else if (contentType === "application/rtf") {
    return "rtf";
  } else if (contentType === "text/html") {
    return "html";
  } else if (contentType === "image/jpeg" || contentType === "image/jpg") {
    return "jpg";
  } else if (contentType === "image/png") {
    return "png";
  } else if (contentType === "image/gif") {
    return "gif";
  } else {
    console.error(`Unsupported file type: ${contentType}`);
    return null;
  }
}

export function nextStatus(currStatus) {
  const idx = statusList.findIndex((item) => item === currStatus);
  return parseStatus(statusList[idx + 1]);
}
const parseStatus = (status) => {
  switch (status) {
    case "Accepted":
      return "Accept";
    case "In Progress":
      return "Move to In Progress";
    case "Completed":
      return "Move to Completed";
    default:
      return "";
  }
};

export function showActions(role, currStatus) {
  if (role === customerRole) return false;
  if (
    currStatus === "Completed" ||
    currStatus === "Rejected" ||
    currStatus === "Cancelled"
  )
    return false;
  return true;
}
