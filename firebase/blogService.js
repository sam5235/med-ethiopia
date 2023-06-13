import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const parseBlog = async (data) => {
  const getHospitalName = await getDoc(
    doc(db, "health_centers", data.data().publisher)
  );
  return { ...data.data(), name: getHospitalName.data().name };
};
export const getBlogs = async () => {
  const blogs = [];
  const snapshot = await getDocs(
    query(collection(db, "blogs"), where("status", "==", "approved"))
  );
  for (const data of snapshot.docs) {
    blogs.push(await parseBlog(data));
  }
  return blogs;
};

export const getAdBlogs = async () => {
  const blogs = [];
  const snapshot = await getDocs(
    query(
      collection(db, "blogs"),
      where("categories", "array-contains", {
        label: "Advert",
        value: "Advert",
      }),
      where("status", "==", "approved")
    )
  );
  for (const data of snapshot.docs) {
    blogs.push(await parseBlog(data));
  }
  return blogs;
};

export const filterBlog = async (queries) => {
  const blogs = [];
  const nameq = query(
    collection(db, "blogs"),
    where("title", ">=", queries),
    where("title", "<=", queries + "\uf8ff")
  );
  const querySnapshot = await getDocs(nameq);
  for (const data of querySnapshot.docs) {
    blogs.push(await parseBlog(data));
  }
  return blogs;
};
