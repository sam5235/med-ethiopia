import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

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

export const addOrRemoveAppointment = async (appt) => {
  return await updateAppointment(appt);
};

export const updateAppointment = async (appt) => {
  return await setDoc(doc(db, "appointments", appt.id), appt, {
    merge: true,
  });
};

const getHealthCare = async (data) => {
  const hospitalSnapshot = await getDoc(
    doc(db, "health_centers", data.data().hospitalId)
  );
  return { ...data.data(), hospital: hospitalSnapshot.data().name };
};

export const getBookedAppointment = async () => {
  const appointments = [];
  const snapshots = await getDocs(
    query(
      collection(db, "appointments"),
      where("patientsId", "array-contains", auth.currentUser.uid)
    )
  );

  for (const data of snapshots.docs) {
    appointments.push(await getHealthCare(data));
  }

  return appointments;
};
