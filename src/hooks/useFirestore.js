import { useState, useEffect } from "react";
import { firestore } from "../service/firebase";

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = firestore.collection(collection)
        .orderBy('createdAt','desc')
        .onSnapshot((snap) => {
            const documents = [];
            snap.forEach(doc => {
                if (doc.data().privacyValue == 0) {
                    documents.push({...doc.data(), id: doc.id})
                }
            });
            setDocs(documents);
        });

        return () => unsub();

    }, [collection])

    return {docs};
}

export  default useFirestore;