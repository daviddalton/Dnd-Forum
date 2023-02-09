import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import { addSyntheticLeadingComment } from "typescript";
import { firestore } from "../firebase-config";
import { CreatedChar } from "../model/Character/CreatedChar.interface";





export const characterCollection = collection(firestore, "characters")

export const addCharacter = async (characterData: CreatedChar) => {
    const newCharacter = await addDoc(characterCollection, { ...characterData});
    console.log(`New chracter is created at ${newCharacter.path}`)
}

export const deleteCharacter = async (
    id: string | undefined,
    navigate: NavigateFunction
) => {
    const document = doc(firestore, `characters/${id}`);
    await deleteDoc(document);
    console.log('The hotel has been deleted');
    navigate("/create")

}

export const updateCharacter = async (id: string | undefined, docData: any) => {
    const getCharacter = doc(firestore, `characters/${id}`);
    await setDoc(getCharacter, docData, { merge: true });
    console.log("The value has been rewritten")
}