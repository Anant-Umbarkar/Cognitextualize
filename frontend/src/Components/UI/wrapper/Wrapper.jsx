import React from 'react'

const Wrapper = ({children,mode}) => {
  return (
    <div style={{width:"100vw",height:"100%",padding:"2em", background:(mode=="dark")?"#282828":"white", color:(mode=="dark")?"white":"black"}}>{children}</div>
  )
}

export default Wrapper