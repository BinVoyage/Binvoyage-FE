export default function Location() {
  return (
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
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}>
      <img src="src/assets/Location.svg" alt="현재 위치" />
    </button>
  );
}
