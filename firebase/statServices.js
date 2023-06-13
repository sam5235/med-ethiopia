import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../config/firebase";

export const getMeditopiaStats = async () => {
  const health_centers_col = collection(db, "health_centers");
  const health_centers_snapshot = await getCountFromServer(health_centers_col);
  const health_centers = health_centers_snapshot.data().count;

  const patients_col = collection(db, "patients");
  const patients_snapshot = await getCountFromServer(patients_col);
  const patients = patients_snapshot.data().count;

  const records_col = collection(db, "records");
  const records_snapshot = await getCountFromServer(records_col);
  const records = records_snapshot.data().count;

  const blog_col = collection(db, "blogs");
  const blogs_snapshot = await getCountFromServer(blog_col);
  const blogs = blogs_snapshot.data().count;

  return { health_centers, patients, records, blogs };
};
