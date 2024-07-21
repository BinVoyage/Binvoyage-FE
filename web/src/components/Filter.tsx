import {styled} from 'styled-components';
import TrashmarkSvg from '../assets/TrashmarkSvg';
import  { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import CurLocation from "./CurLocation";
import getAddr from "./CurAdress";


export default function Filter() {

  return (
//   <div>
  <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        cursor: "pointer",
        width: "400px",
        maxWidth:"1200px",
        height: "44px",
        display: "flex",
        alignContent:"space-between",
        margin:"112px 0 0 0 ",
        color:"black",
      }}
    >
      <RecentBox>Recently Visited</RecentBox>
      <RecycleBox>recycling</RecycleBox>
      <TrashBox>Trash</TrashBox>
    </div>
    // </div>
  );
}

const RecentBox = styled.section`
 margin-left: 8px;
 margin-bottom:10px;
 margin-top:10px;
 background-color: white;
 width: 141px;
 height: 30px;
 border-radius: 22px;
 text-align: center;
 font-size: 14px;
 box-shadow: 0px 2px 6px 0px #00000033;
 padding-top: 4px;
`


const RecycleBox = styled.section`
 margin-left: 12px;
 margin-bottom:10px;
 margin-top:10px;
 background-color: white;
 width: 101px;
 height: 30px;
 border-radius: 22px;
 text-align: center;
 font-size: 14px;
 box-shadow: 0px 2px 6px 0px #00000033;
 padding-top: 4px;
`

const TrashBox = styled.section`
 margin-left: 12px;
 margin-bottom:10px;
 margin-top:10px;
 background-color: white;
 width: 76px;
 height: 30px;
 border-radius: 22px;
 text-align: center;
 font-size: 14px;
 box-shadow: 0px 2px 6px 0px #00000033;
 padding-top: 4px;
`
