// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL = 'https://API_URL/api';


/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * The URL of storage bucket.
   */
  storageUrl: string;

  /**
   * Url and Api key for Google maps places search
   *
   */
  // placesUrl: string;
  // placesApiKey: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;

  /**
   * Default page size for pagination enabled apis
   *
   */
  pageSize: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  storageUrl: STORAGE_URL,
  timeout: 10000,
  pageSize: 5,
};
