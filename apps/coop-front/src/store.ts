import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { TDBinding, TDShape } from "@coop/draw";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";
const VERSION = 1;

// Create the doc
export const doc = new Y.Doc();

export const roomID = `y-tldraw-${VERSION}`;

export const provider = new WebrtcProvider(roomID, doc, {
  signaling: ["ws://krkorea.iptime.org:3012"],
  password: null,
  awareness: new awarenessProtocol.Awareness(doc),
  maxConns: 20 + math.floor(random.rand() * 15),
  filterBcConns: true,
  peerOpts: {
    config: {
      iceServers: [
        {
          urls: ["turn:turn.my-first-programming.kr"],
          username: "test",
          credential: "test1234",
        },
      ],
    },
  },
});

// Export the provider's awareness API
export const awareness = provider.awareness;
console.log(awareness);

export const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
export const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");

// Create an undo manager for the shapes and binding maps
export const undoManager = new Y.UndoManager([yShapes, yBindings]);
