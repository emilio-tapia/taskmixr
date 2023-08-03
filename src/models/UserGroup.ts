  // ================== USERS GROUP CLASS ============== //

import type { Input } from "./Input";
import { InputGroup } from "./InputGroup";

  export class UserGroup extends InputGroup {
    constructor(storeArray: Array<Input>, selector: string, elementClass: any) {
      super(storeArray, selector, elementClass);
    }
  }