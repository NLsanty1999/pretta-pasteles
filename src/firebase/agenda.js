import {

    doc,

    getDoc

} from "firebase/firestore";

import { db } from "./config";

export async function getAgendaConfig() {

    const snapshot = await getDoc(

        doc(db, "agenda", "config")

    );

    if (!snapshot.exists()) {

        return null;

    }

    return snapshot.data();

}