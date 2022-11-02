import debug from '../debug'

export class WildCardExp {
    private parts: string[];
    
    disableTrailingWildcard: boolean = false;
  
    constructor(protected pattern: string) {
      this.parts = this.parse(pattern || '');
    }
  
    private parse(pattern: string): string[] {
      if (pattern.length <= 0) {
          return [];
      }
  
      let result = [];
      let pieces = pattern.split('*');
      let inWildCard = false;
  
      for (let index = 0; index < pieces.length; index++) {
        let piece = pieces[index];
        if (piece.length > 0) {
          result.push(piece);
          inWildCard = false;
        }
        if (!inWildCard && (piece.length == 0 || index < pieces.length - 1)) {
          result.push('*');
          inWildCard = true;
        }
      }
  
      return result;
    }
  
    public matches(str: string = ''): boolean {
      debug.multisite('matching: %o', {
        disableTrailingWildcard: this.disableTrailingWildcard,
        str
      });
      if (str.length > 0 && this.parts.length > 0)
      {
        let inWildCard = false;
        for (let index = 0; index < this.parts.length; index++) {
          let part = this.parts[index];
          if (part == '*') {
            inWildCard = true;
          }
          else {
            let index = str.indexOf(part);
            if (index < 0 || (index > 0 && !inWildCard)) {
              return false;
            }
            str = str.substring(index + part.length);
          }
        }
      }
      return str.length == 0 || !this.disableTrailingWildcard;
    }
  };
  