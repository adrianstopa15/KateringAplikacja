import ReactDom from "react-dom";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: "60%",
  maxWidth: "600px",
  borderRadius: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .7",
  zIndex: 1000,
};

export default function UserPreferencesModal({ open, children, onClose, selectedGoal }) {

  const { 
        handleEditPreferences} = useAuth();
   

        const handleSave = async () => {
          try {
            await handleEditPreferences();
            MySwal.fire({
              title: "Sukces!",
              text: "Preferencje zostały zapisane.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              onClose(); 
              window.location.reload(); 
            });
          } catch (error) {
            console.error("Error saving preferences:", error);
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "Nie udało sie zapisać preferencji, spróbuj ponownie później.",
            });
          }
        };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
        <div className="flex-c mt-sm">
          <button onClick={handleSave} disabled={!selectedGoal} className="button-27-save" type="button">
            Zapisz
          </button>
          <button onClick={onClose} className="button-27-d ml-s">
            Anuluj
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
