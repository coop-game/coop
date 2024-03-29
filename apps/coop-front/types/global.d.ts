import { TDUser } from "@coop/draw";
import { Presence } from "@y-presence/client";

declare module "*.scss";

declare global {
  interface IMAGE {
    [x: string]: any;
  }
}

export type TldrawPresence = {
  id: string;
  tdUser?: TDUser;
};

export interface UserPresence {
  cursor?: {
    x: number;
    y: number;
  };
  name: string;
  color: string;
}

// declare global {
//   /**
//    * Now declare things that go in the global namespace,
//    * or augment existing declarations in the global namespace.
//    */
//   interface WebrtcProvider {
//     id: number;
//     name: string;
//     salary: number;
//   }

//   type Person = {
//     name: string;
//     age: number;
//   };
// }
