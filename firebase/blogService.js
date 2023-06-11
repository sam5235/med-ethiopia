import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {db} from "../config/firebase";

const parseBlog = async (data)=>{
      const getHospitalName = await getDoc(doc(db, "health_centers", data.data().publisher));
        return {...data.data(), name : getHospitalName.data().name }
}
export const getBlogs = async ()=> {
    const blogs = [];
    const snapshot = await getDocs(collection(db, "blogs"));
    for(const data of snapshot.docs){
      
        // const blog = await parseBlog(data);
        blogs.push(await parseBlog(data));
    };
    console.log(snapshot);
    return blogs;

};
