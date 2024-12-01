export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button
      aria-label={`Die is value ${props.value} ,${
        props.isHeld ? "held" : "Not held"
      }`}
      aria-pressed={props.isHeld}
      style={styles}
      name={props.id}
      onClick={() => props.hold(props.id)}
    >
      {props.value}
    </button>
  );
}
