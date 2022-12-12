import React from "react"

export interface TLUser<T = any> {
    id: string
    color: string
    point: number[]
    selectedIds: string[]
    session?: boolean
    metadata?: T
  }

export type CursorComponent<T = any> = (props: Pick<TLUser<T>, 'id' | 'color' | 'metadata'>) => any

const NewCursor: CursorComponent = ({id,color}) => {
    return (
        <div style={{
            position:"relative"
            }}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" fill="none" fillRule="evenodd">
                <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
                <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
                <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
                </g>
                <g fill="white">
                <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
                <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
                </g>
                <g fill={color}>
                <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
                <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
                </g>
            </svg> */}
            <svg
        className="cursor"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
            <div
                style={{
                backgroundColor: color,
                borderRadius: 4,
                position: "absolute",
                top: 14,
                left: 4,
                padding: "5px 10px"
                }}
            >
                <p
                    style={{
                        whiteSpace: "nowrap",
                        fontSize: 13,
                        color: "white"
                    }}
                    >
                    {id.split('|')[1]}
                </p>
            </div>
        </div>
      
    )
  }
export default React.memo(NewCursor);