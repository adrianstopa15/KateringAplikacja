import { useState } from "react";
import CateringModal from "./cateringModal";


export default function CateringPresets() {

    const [mode, setMode] = useState("meal");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedMealType, setSelectedMealType] = useState(null);


    const mealTypes = ["Śniadania", "Drugie śniadania", "Obiady", "Desery", "Kolacje"];

    const handleOpenModal = (meal, index) => {
        setSelectedMeal(meal);
        setSelectedMealType(index + 1);
        setModalIsOpen(true);
    }

    return (
        <div>
            <div className="ml-s mt-s">
                {mode === "meal" ? (
                    <>
                        <h1 className="h1-regular mb-m">Zapisane posiłki</h1>
                        {mealTypes.map((meal, index) => (
                            <div
                                key={index}
                                className="catering-display--element"
                                style={{ marginBottom: "1rem" }}
                                onClick={() => handleOpenModal(meal, index)}
                            >
                                {meal}
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h1 className="h1-regular mb-m">Zapisane dni</h1>
                    </>
                )}
            </div>

            <CateringModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                mealName={selectedMeal}
                mealType={selectedMealType}
            />
        </div>
    );
}
  