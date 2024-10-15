import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/organizations/';

// Get all users in an organization (admin only)
export const getUsersByOrganization = async (organizationId) => {
  return fetchHandler(`${baseUrl}${organizationId}/users`);
};