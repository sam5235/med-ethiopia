import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

export const getApptsByHospitalAndDate = async (hospitalId, date) => {
  const Lists = [];
  const searchQ = query(
    collection(db, "appointments"),
    where("hospitalId", "==", hospitalId),
    where("date", "==", date)
  );
  const querySnapshot = await getDocs(searchQ);

  for (const data of querySnapshot.docs) {
    Lists.push(data.data());
  }

  return Lists;
};
