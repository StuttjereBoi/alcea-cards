
export default function TestComp({ toggled, setToggled, text }) {
  return (
    <div style={{ display: toggled }}>
      <h1>{text}</h1>
      <button onClick={() => setToggled('none')}>Nee</button>
    </div>
  )
}
