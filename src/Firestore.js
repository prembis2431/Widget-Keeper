import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";

// Add a new category
export const addCategoryToFirestore = async (categoryName) => {
  const docRef = await addDoc(collection(db, "categories"), {
    name: categoryName,
    widgets: [],
  });
  return docRef.id;
};

// Get all categories
export const getCategoriesFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return categories;
};

// Add a widget to a specific category
export const addWidgetToFirestore = async (categoryId, widgetName, widgetText) => {
  const categoryRef = doc(db, "categories", categoryId);
  const categorySnapshot = await getDoc(categoryRef);

  if (categorySnapshot.exists()) {
    const categoryData = categorySnapshot.data();
    const newWidgetId = new Date().toISOString(); // Or use a more robust unique ID generator
    const updatedWidgets = [...categoryData.widgets, { id: newWidgetId, name: widgetName, text: widgetText }];
    await updateDoc(categoryRef, { widgets: updatedWidgets });
    return newWidgetId;
  }
};

// Remove a category
export const removeCategoryFromFirestore = async (categoryId) => {
  await deleteDoc(doc(db, "categories", categoryId));
};

// Remove a widget from a specific category
export const removeWidgetFromFirestore = async (categoryId, widgetId) => {
  const categoryRef = doc(db, "categories", categoryId);
  const categorySnapshot = await getDoc(categoryRef);

  if (categorySnapshot.exists()) {
    const categoryData = categorySnapshot.data();
    const updatedWidgets = categoryData.widgets.filter(widget => widget.id !== widgetId);
    await updateDoc(categoryRef, { widgets: updatedWidgets });
  }
};
