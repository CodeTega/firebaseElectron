import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "./fire";

export const createTodo = async (data) => {
  try {
    const docRef = collection(db, "todo");
    const res = await addDoc(docRef, data);
    return { res, status: 200 };
  } catch (error) {
    return error;
  }
};

export const getAllTodo = async () => {
  try {
    const todosCol = collection(db, "todo");
    const q = query(todosCol);
    const querySnapshot = await getDocs(q);

    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });

    return { todos, status: 200 };
  } catch (error) {
    return error;
  }
};
