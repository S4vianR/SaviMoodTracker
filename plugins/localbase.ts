// plugins/localbase.ts

import Localbase from 'localbase'
let db = new Localbase('db')
export default (context: any,inject: any) => {
  inject('db', db)
}