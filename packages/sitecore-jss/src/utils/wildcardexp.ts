export class WildCardExp {
  disableTrailingWildcard = false;

  private parts: string[];

  constructor(protected pattern: string) {
    this.parts = this.parse(pattern || '');
  }

  public matches(str = ''): boolean {
    if (str.length > 0 && this.parts.length > 0) {
      let inWildCard = false;
      for (let index = 0; index < this.parts.length; index++) {
        const part = this.parts[index];
        if (part === '*') {
          inWildCard = true;
        } else {
          const index = str.indexOf(part);
          if (index < 0 || (index > 0 && !inWildCard)) {
            return false;
          }
          str = str.substring(index + part.length);
        }
      }
    }
    return str.length === 0 || !this.disableTrailingWildcard;
  }

  private parse(pattern: string): string[] {
    if (pattern.length <= 0) {
      return [];
    }

    const result = [];
    const pieces = pattern.split('*');
    let inWildCard = false;

    for (let index = 0; index < pieces.length; index++) {
      const piece = pieces[index];
      if (piece.length > 0) {
        result.push(piece);
        inWildCard = false;
      }
      if (!inWildCard && (piece.length === 0 || index < pieces.length - 1)) {
        result.push('*');
        inWildCard = true;
      }
    }

    return result;
  }
}
