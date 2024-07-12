// plugins/localbase.ts

import Localbase from 'localbase';
let db = new Localbase('db');
db.config.debug = false;
export default (context: any,inject: any) => {
  inject('db', db);
}