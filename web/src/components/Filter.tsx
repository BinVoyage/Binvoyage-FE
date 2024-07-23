import {styled} from 'styled-components';
import TrashRoundSvg from '../assets/TrashRoundSvg';
import RecycleRoundSvg from '../assets/RecycleRoundSvg';


export default function Filter() {

  return (
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
      <RecentBox>
        <Text>
        Recently Visited
        </Text>
        </RecentBox>
      <RecycleButtons>
        <RecycleBox>
          <RecycleRoundSvg width="26px" height="26px"/>
          <Text>recycling</Text>
        </RecycleBox>
      </RecycleButtons>
      <TrashButtons>
        <TrashBox>
          <TrashRoundSvg width="26px" height="26px"/>
          <Text>Trash</Text> 
        </TrashBox>
      </TrashButtons>
    </div>
  );
}


const Text = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.07px;
`



const RecentBox = styled.button`
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
  box-shadow: 0px 2px 6px 0px #00000033;
  padding-top: 4px;
  color: black;
`

const RecycleButtons =  styled.button`
  display: inline-flex;
  margin: 8px 10px 8px 2px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  background-color: white;
  width: 101px;
  height: 30px;
  box-shadow: 0px 2px 6px 0px #00000033;
  border-radius: 22px;
`


const RecycleBox = styled.section`
  background-color: white;
  border-radius: 22px;
  text-align: center;
  font-size: 14px;
  display: inline-flex;
  height: 30px;
  margin: 8px 10px 8px 2px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: black;
`

const TrashButtons =  styled.button`
  display: inline-flex;
  height: 30px;
  margin: 8px 10px 8px 2px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  background-color: white;
  width: 76px;
  height: 30px;
  box-shadow: 0px 2px 6px 0px #00000033;
  border-radius: 22px;
`


const TrashBox = styled.section`
  background-color: white;
  width: 76px;
  height: 30px;
  border-radius: 22px;
  text-align: center;
  font-size: 14px;
  display: inline-flex;
  height: 30px;
  margin: 8px 10px 8px 2px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: black;
`
