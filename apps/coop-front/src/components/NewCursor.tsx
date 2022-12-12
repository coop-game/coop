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