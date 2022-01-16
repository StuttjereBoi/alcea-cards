import { useRef } from "react/cjs/react.development"
import CardForm from "./CardForm"
import styles from "./../styles/ModalDialog.module.scss"

export default function ModalDialog({ toggled, children }) {
  return (
    <div className={styles.backdrop} style={{display: toggled}}>
      <div className={styles.dialog}>
        {children}
      </div>
    </div>
  )
}


