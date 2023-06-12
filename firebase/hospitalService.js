import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const getAppointments = async () => {
  const Lists = [];
  const searchQ = query(
    collection(db, "appointments"),
    where("patientsId", "array-contains", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(searchQ);

  for (const data of querySnapshot.docs) {
    Lists.push(await getHealthCare(data));
  }
  return Lists;
};

export const filterHospital = async (queries) => {
  const Lists = [];
  const nameq = query(
    collection(db, "health_centers"),
    where("name", ">=", queries), where('name', "<=", queries + '\uf8ff')
    // where("name", "==", queries)
  );
  const querySnapshot = await getDocs(nameq);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    Lists.push(doc.data());
  });
  return Lists;
};

const getHealthCare = async (data) => {
  const getHospitalName = await getDoc(doc(db, "health_centers", data.id));
  return { ...data.data(), name: getHospitalName.data().name };
};

export const getHealthCareCenters = async () => {
  const centers = [];
  const querySnapshot = await getDocs(collection(db, "health_centers"));

  querySnapshot.forEach((doc) => {
    centers.push({ id: doc.id, ...doc.data() });
  });

  return centers;
};
