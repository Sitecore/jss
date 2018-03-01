export default function(manifest) {
  /**
   * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
   * items will be created for any placeholders explicitly added, or discovered in your routes and renderings.
   */

  manifest.addPlaceholder({ name: "main", displayName: "Main" });
}
