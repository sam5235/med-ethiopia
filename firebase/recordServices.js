import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const parseRecord = async (data) => {
  const hospitalSnapShot = await getDoc(
    doc(db, "health_centers", data.data().hospital)
  );
  return {
    ...data.data(),
    hospital: hospitalSnapShot.data().name,
    hospitalAddress: hospitalSnapShot.data().address,
  };
};

export const getRecords = async () => {
  const records = [];
  const snapshot = await getDocs(
    query(
      collection(db, "records"),
      where("patientId", "==", auth.currentUser.uid)
    )
  );

  for (const data of snapshot.docs) {
    records.push(await parseRecord(data));
  }
  return records;
};

export const getRecordsByDate = async (date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - 1);

  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  const from = Timestamp.fromDate(start);
  const to = Timestamp.fromDate(end);

  const records = [];
  const snapshot = await getDocs(
    query(
      collection(db, "records"),
      where("patientId", "==", auth.currentUser.uid),
      where("createdAt", ">", from),
      where("createdAt", "<", to)
    )
  );

  for (const data of snapshot.docs) {
    records.push(await parseRecord(data));
  }

  console.log({ records: snapshot.docs });
  return records;
};
