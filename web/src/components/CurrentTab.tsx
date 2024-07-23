import {styled} from 'styled-components';
import CurrentTabSvg from '../assets/CurrenttabSvg';
// import  { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
// import CurLocation from "./CurLocation";
// import getAddr from "./CurAdress";

type TabProps = {
  children?:React.ReactNode;
  address?:string;
}

export default function CurrentTab({children}:TabProps) {

  return (
  
  <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        cursor: "pointer",
        width: "334px",
        maxWidth:"1200px",
        height: "44px",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        alignContent:"space-between",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        margin:"56px 0 0 12px ",
        color:"black",
      }}
    >
      <CurrentBox>
      <CurrentTabSvg width="24" height="24" />
      {children}
    </CurrentBox>
    </div>

  );
}

const CurrentBox = styled.section`
 margin-left: 12px;
 margin-bottom:10px;
 margin-top:10px;
 display: flex;
`