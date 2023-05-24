import { startComponentFactoryCreator } from './component-factory/startComponentFactoryCreator'

/*
  This script supports utilizes factory creator in watch mode.
  In watch mode, the component factory creator source folder is watched, and componentFactoryCreator.ts is
  regenerated whenever files are added or deleted.

  For manual component factory generation run bootstrap
*/

startComponentFactoryCreator(true);
