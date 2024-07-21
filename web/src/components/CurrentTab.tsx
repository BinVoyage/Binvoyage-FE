import {styled} from 'styled-components';
import TrashmarkSvg from '../assets/TrashmarkSvg';
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
      <TrashmarkSvg width="24" height="24" />
      {children}
    </CurrentBox>
    </div>

  );
}

const CurrentBox = styled.section`
 margin-left: 12px;
 margin-bottom:8px;
 margin-top:6px;
`

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   input: {
//     width: '80%',
//     height: 56,
//     padding: 16,
//     borderWidth: 1,
//     backgroundColor: '#ffffff',
//     borderColor: '#ffffff',
//     marginBottom: 16,
//     borderRadius: 30,
//   },
// });

// const Wrapper = styled.SafeAreaView`
//   margin-top: 56px;
//   color: white;
// `;

// const CurrentBox = styled.div`
//   margin-top: 56px;
//   position: 'absolute';
//   /* display: flex; */
//   z-index: 1000;
//   margin-left: 12px;
//   padding: 10px 12px;
//   align-items: center;
//   gap: 10px;
//   flex-shrink: 0;
//   align-items: left;
//   align-content: space-between;
//   border-radius: 10px;
//   background-color: white;
//   width: 334px;
//   height: 44px;
//   box-shadow: 0px 2px 6px 0px;
// `;
