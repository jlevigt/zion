export default function TextInput({ label, Ref }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <br />
      <input type="text" ref={Ref} />
    </div>
  );
}
