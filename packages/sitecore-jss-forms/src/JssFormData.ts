export class JssFormData {
  private data = new Array<{ key: string, value: string }>();

  public append(key: string, value: string) {
    this.data.push({ key, value });
  }

  public set(key: string, value: string) {
    this.data = this.data.filter((entry) => entry.key !== key);
    this.append(key, value);
  }

  public mergeOverwritingExisting(values: { [key: string]: string }) {
    Object.keys(values).forEach((key) => {
      this.set(key, values[key]);
    });
  }

  public get() {
    return [...this.data];
  }

  public toMultipartFormData(): FormData {
    const formData = new FormData();
    this.data.forEach((entry) => formData.append(entry.key, entry.value));

    return formData;
  }

  public toUrlEncodedFormData(): string {
    return this.data.map((entry) => `${encodeURIComponent(entry.key)}=${encodeURIComponent(entry.value)}`).join('&').replace(/%20/g, '+');
  }
}
