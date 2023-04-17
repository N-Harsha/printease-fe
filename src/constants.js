const baseUrl = "http://localhost:8080/api";

export const loginApi = baseUrl + "/auth/login";
export const signUp = baseUrl + "/auth/register";
export const getAllServicesApi = baseUrl + "/v1/services";
export const getAllOrdersApi = baseUrl + "/v1/orders";

export const primaryColor = "#ff6c37";

export const drawerWidth = 240;
export const serviceProviderRole = "ROLE_SERVICE_PROVIDER";
export const customerRole = "ROLE_CUSTOMER";
export const adminRole = "ROLE_ADMIN";

export const statusList = ["Pending", "Accepted", "In Progress", "Completed"];
