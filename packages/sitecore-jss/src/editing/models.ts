import { LayoutServicePageState } from '../layout';

/**
 * Query parameters appended to the page route URL
 * Appended when XMCloud Pages preview (editing) Metadata Edit Mode is used
 */
export interface RenderMetadataQueryParams {
  [key: string]: unknown;
  secret: string;
  sc_lang: string;
  sc_itemid: string;
  sc_site: string;
  route: string;
  mode: Exclude<LayoutServicePageState, 'normal'>;
  sc_layoutKind?: 'final' | 'shared';
  sc_variant?: string;
  sc_version?: string;
}
