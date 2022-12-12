import { TDUser } from "@coop/draw";
import { Presence } from "@y-presence/client";

declare global {
  interface IMAGE {
    [x: string]: any;
  }
}

export type TldrawPresence = {
  id: string;
  tdUser?: TDUser;
}
declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface WebrtcProvider {
    id: number;
    name: string;
    salary: number;
  }

  type Person = {
    name: string;
    age: number;
  };
}
