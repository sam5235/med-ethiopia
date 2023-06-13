import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import moment from "moment";

const parseMoreData = async (data) => {
  const patinetDoc = await getDoc(doc(db, "patients", data.data().patientId));
  return { ...data.data(), _patient: patinetDoc.data() };
};

export const getRecords = async (diseases, start, end) => {
  const searchQ = query(
    collection(db, "records"),
    where("diseases", "array-contains-any", diseases),
    where("createdAt", ">=", new Date(start)),
    where("createdAt", "<=", new Date(end)),
    orderBy("createdAt")
  );

  const Lists = [];
  const querySnapshot = await getDocs(searchQ);

  for (const data of querySnapshot.docs) {
    Lists.push(await parseMoreData(data));
  }

  const area_data = getAreaData(diseases, Lists);
  const scatered_data = getScatteredData(diseases, Lists);

  return { scatered_data, area_data };
};

const getAreaData = (diseases, Lists) => {
  const data = {};

  Lists.forEach((record) => {
    const createdAt = record.createdAt.toDate();
    const dateKey = moment(createdAt).format("MMM YYYY");

    if (!data[dateKey]) {
      data[dateKey] = {};
    }

    record.diseases.forEach((des) => {
      if (diseases.includes(des)) {
        if (!data[dateKey][des]) {
          data[dateKey][des] = 0;
        }

        data[dateKey][des]++;
      }
    });
  });

  const newData = Object.keys(data).map((month) => {
    const _d = { ...data[month], month };

    diseases.forEach((des) => {
      if (!_d[des]) {
        _d[des] = 0;
      }
    });

    return _d;
  });

  return newData;
};

const getScatteredData = (diseases, Lists) => {
  const data = {};

  diseases.forEach((des) => {
    data[des] = [];
  });

  diseases.forEach((des) => {
    Lists.forEach((record) => {
      if (record.diseases.includes(des)) {
        data[des].push({
          height: record._patient.height,
          weight: record._patient.weight,
          diseases: des,
        });
      }
    });
  });

  return data;
};
