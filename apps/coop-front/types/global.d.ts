import { TDUser } from "@coop/draw";

declare global {
  interface IMAGE {
    [x: string]: any;
  }
}

export interface TldrawPresence {
  id: string;
  tdUser: TDUser;
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
