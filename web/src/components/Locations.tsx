export default function Location() {
  return (
    // <Buttons>
    <button
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '15px',
        zIndex: 1000,
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        float:"right",
        marginLeft:300,
        marginRight:16,
        border:"none",
        outline:"none",
      }}>
      <img src="image/Location.svg" alt="현재 위치" />
    </button>
    // </Buttons>
  );
}



// const Buttons =  styled.button`
//   position: fixed;
//   display: flex;
//   z-index: 1000;
//   width: 40px;
//   height: 40px;
//   margin-left:"1450px";
//   margin-right:"16px";
//   margin-bottom: "40px";
//   bottom: 0;
//   padding-left: 15px;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
//   flex-shrink: 0;
//   background-color: white;
//   cursor: 'pointer';
//   box-shadow: 0px 2px 6px 0px #00000033;
//   border-radius: 50%;
// `


// const LocationBox = styled.section`
//  position: fixed;
//   display: flex;
//   z-index: 1000;
//   width: 40px;
//   height: 40px;
//   margin-left:"1450px";
//   margin-right:"16px";
//   margin-bottom: "40px";
//   bottom: 0;
//   padding-left: 15px;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
//   flex-shrink: 0;
//   background-color: white;
//   cursor: 'pointer';
//   /* box-shadow: 0px 2px 6px 0px #00000033; */
//   border-radius: 50%;
// `

