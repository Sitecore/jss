/**
 * Stores the serialized state of a JSS form before it is POSTed back to the server.
 * Similar API to FormData but supports urlencoded forms (needed for Sitecore antiforgery support),
 * and supports append/get which not all browsers do as of this writing.
 */
export class JssFormData {
  private data = new Array<{ key: string, value: string | File }>();

  /**
	 * Appends a new key/value to the form data. Value will be added to any existing value that may exist.
	 * @param {string} key
	 * @param {string | File} value
	 */
  public append(key: string, value: string | File) {
    this.data.push({ key, value });
  }

  /**
	 * Sets a key/value, removing any existing value(s) set for that key.
	 * @param {string} key
	 * @param {string | File} value
	*/
  public set(key: string, value: string | File) {
    this.data = this.data.filter((entry) => entry.key !== key);
    this.append(key, value);
  }

  /**
	 * Merges form data from a client-side state store (i.e. the user-specified values), overwriting any existing values for the keys
	 * @param {Object} values
	*/
  public mergeOverwritingExisting(values: { [key: string]: string | string[] | boolean | File[] }) {
    Object.keys(values).forEach((key) => {
      const value = values[key];

      // for multi-valued fields, like checkbox lists,
      // we can receive an array of selected values.
      // we want to _set_ the first one to override anything existing,
      // but _append_ anything after that to avoid overwriting our own values
      if (Array.isArray(value)) {
        value.forEach((v: string | File, index: number) => {
          if (index === 0) {
            this.set(key, v);
          } else {
            this.append(key, v);
          }
        });
      } else {
        this.set(key, value.toString());
      }
    });
  }

  /**
	 * Gets all key/values in the store. Duplicate keys with different values are possible.
	 * @returns {Object} data
	*/
  public get() {
    return [...this.data];
  }

  /**
   * Converts the store into a FormData that can be POST-ed with fetch as multipart/form-data.
	 * @returns {FormData} form data
   */
  public toMultipartFormData(): FormData {
    const formData = new FormData();
    this.data.forEach((entry) => formData.append(entry.key, entry.value));

    return formData;
  }

  /**
   * Converts the store into a URL-encoded string suitable to POST as application/x-www-form-urlencoded.
	 * @returns {string} url encoded form data
   */
  public toUrlEncodedFormData(): string {
    return this.data.map((entry) => `${encodeURIComponent(entry.key)}=${encodeURIComponent(entry.value.toString())}`).join('&').replace(/%20/g, '+');
  }
}
