import { useRef, useState } from "react/cjs/react.development";
import ModalDialog from "./ModalDialog";
import TestComp from "./TestComp";

export default function EditCardForm({ data }) {

  // if (!data) return <div>Loading...</div>

  const [name, setName] = useState(data.name)

  const [toggled, setToggled] = useState('none');

  async function handleSubmit(e) {
    e.preventDefault();
    setToggled('none');
    alert(name);
  }

  return (
    <div className="container">
      <ModalDialog toggled={toggled} title="Edit Form">
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <button type="button" onClick={() => setToggled('none')}>Close</button>
          <button>Check</button>
        </form>
      </ModalDialog>
      <button type="button" onClick={() => setToggled('flex')}>Check</button>
    </div>
  )
}
