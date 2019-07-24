import { ViewModel } from './ViewModel';

export interface FormModel extends ViewModel {
  isTrackingEnabled: boolean;
  title: string;
  cssClass: string;
}
