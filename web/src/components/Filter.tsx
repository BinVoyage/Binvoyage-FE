import {styled} from 'styled-components';
import TrashRoundSvg from '../assets/TrashRoundSvg';
import RecycleRoundSvg from '../assets/RecycleRoundSvg';


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
      <RecycleBox>
        <RecycleRoundSvg width="26px" height="26px"/>
        recycling
        </RecycleBox>
      <TrashBox>
        <TrashRoundSvg width="26px" height="26px"/>
        Trash
        </TrashBox>
    </div>
    // </div>
  );
}

const RecentBox = styled.section`
 display: inline-flex;
height: 30px;
margin: 8px 10px;
justify-content: center;
align-items: center;
gap: 4px;
flex-shrink: 0;
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
 background-color: white;
 width: 101px;
 height: 30px;
 border-radius: 22px;
 text-align: center;
 font-size: 14px;
 box-shadow: 0px 2px 6px 0px #00000033;
 display: inline-flex;
 height: 30px;
 margin: 8px 10px 8px 2px;
 justify-content: center;
 align-items: center;
 gap: 4px;
 flex-shrink: 0;
`


const TrashBox = styled.section`
background-color: white;
 width: 76px;
 height: 30px;
 border-radius: 22px;
 text-align: center;
 font-size: 14px;
 box-shadow: 0px 2px 6px 0px #00000033;
 display: inline-flex;
 height: 30px;
 margin: 8px 10px 8px 2px;
 justify-content: center;
 align-items: center;
 gap: 4px;
 flex-shrink: 0;
`
