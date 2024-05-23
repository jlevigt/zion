import { forwardRef } from "react";

function TextInput({ label }, ref) {
  return (
    <div>
      {label && <label>{label}</label>}
      <br />
      <input type="text" ref={ref} />
    </div>
  );
}

const ForwardedTextInput = forwardRef(TextInput);

export default ForwardedTextInput;
