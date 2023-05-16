//api constants
const baseUrl = "http://localhost:8080/api";

export const loginApi = baseUrl + "/auth/login";

export const signUp = baseUrl + "/auth/register";

export const getAllServicesApi = baseUrl + "/v1/services";

export const getAllOrdersApi = baseUrl + "/v1/orders";

export const promoteOrderStatusApi = (id) =>
  baseUrl + `/v1/orders/${id}/promote`;

export const cancelOrderStatusApi = (id) => baseUrl + `/v1/orders/${id}/cancel`;

export const specificOrderDetailsApi = (id) => baseUrl + `/v1/orders/${id}`;

export const getAssociatedServicesApi = baseUrl + "/v1/associatedServices";

export const createAssociatedServiceApi = baseUrl + "/v1/associatedServices";

export const editAssociatedServiceApi = baseUrl + `/v1/associatedServices`;

export const deleteAssociatedServiceApi = (associatedServiceId) =>
  baseUrl + `/v1/associatedServices/${associatedServiceId}`;

export const specificServiceDetailsApi = (id) => baseUrl + `/v1/services/${id}`;

export const noOfPagesApi = baseUrl + `/v1/files/pages`;

export const createOrderApi = baseUrl + "/v1/orders";

export const recommendedServiceProvidersApi =
  baseUrl + "/v1/associatedServices/recommended?";

//general constants
export const primaryColor = "#ff6c37";

export const drawerWidth = 240;
export const serviceProviderRole = "ROLE_SERVICE_PROVIDER";
export const customerRole = "ROLE_CUSTOMER";
export const adminRole = "ROLE_ADMIN";

export const statusList = ["Pending", "Accepted", "In Progress", "Completed"];

export const serviceConfig = [
  { key: "printTypes", label: "Print Types" },
  { key: "printSides", label: "Print Sides" },
  { key: "paperSizes", label: "Paper Sizes" },
  { key: "paperTypes", label: "Paper Types" },
  { key: "orientations", label: "Orientations" },
  { key: "bindingTypes", label: "Binding Types" },
];
