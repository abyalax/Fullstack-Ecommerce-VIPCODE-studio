import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "./init";

const firestore = getFirestore(app);
const storage = getStorage(app)

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function retrieveDataByField(collectionName: string, field: string, value: string) {
    const q = query(collection(firestore, collectionName), where(field, "==", value))

    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data
}

export async function addData(collectionName: string, data: any, callback: Function) {
    await addDoc(collection(firestore, collectionName), data)
        .then((res) => {
            callback(true, res);
        })
        .catch((error) => {
            callback(false);
        })
}

export async function updateData(collectionName: string, id: string, data: any, callback: Function) {
    const docRef = doc(firestore, collectionName, id)
    await updateDoc(docRef, data).then(() => {
        callback(true)
    }).catch((error) => {
        callback(false)
    })
}

export async function deleteData(collectionName: string, id: string, callback: Function) {
    const docRef = doc(firestore, collectionName, id)
    await deleteDoc(docRef).then(() => {
        callback(true)
    }).catch((error) => {
        callback(false)
    })
}

export async function uploadFile(id: string, file: any, newName: string, collection: string, callback: Function) {
    if (file) {
        if (file.size < 1048576) {
            const storageref = ref(storage, `images/${collection}/${id}/${newName}`);
            const uploadTask = uploadBytesResumable(storageref, file)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, (error) => {
                if (error.code === 'storage/retry-limit-exceeded') {
                    alert('Connection error: Please check your internet connection and try again.');
                } else {
                    alert('An error occurred during upload: ' + error.message);
                }
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
                        callback('success', downloadURL)
                    })
                })
        } else {
            callback('oversize')
        }
    } else {
        callback('error')
    }
    return true
}

export async function deleteFile(url: string, callback: Function) {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef)
        .then(() => {
            return callback(true)
        }).catch((error) => {
            return callback(false)
        })
}