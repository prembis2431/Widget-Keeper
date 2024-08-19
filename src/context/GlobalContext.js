import { createContext, useState, useEffect } from "react";
import { 
  getCategoriesFromFirestore, 
  addCategoryToFirestore, 
  addWidgetToFirestore, 
  removeCategoryFromFirestore, 
  removeWidgetFromFirestore 
} from "../Firestore";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [data, setData] = useState({ categories: [] });

  console.log("stored data ",    )

  // Fetch data only once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategoriesFromFirestore();
      setData({ categories });
    };
    fetchData();
  }, [data]); // Empty dependency array ensures this runs only once 

  const addCategory = async (name) => {
    const newCategoryId = await addCategoryToFirestore(name);
    setData((prevData) => ({
      categories: [...prevData.categories, { id: newCategoryId, name, widgets: [] }],
    }));
  };

  const addWidget = async (categoryId, widgetName, widgetText) => {
    const newWidgetId = await addWidgetToFirestore(categoryId, widgetName, widgetText);
    setData((prevData) => {
      const updatedCategories = prevData.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, { id: newWidgetId, name: widgetName, text: widgetText }] }
          : category
      );
      return { categories: updatedCategories };
    });
  };

  const removeCategory = async (categoryId) => {
    await removeCategoryFromFirestore(categoryId);
    setData((prevData) => ({
      categories: prevData.categories.filter((category) => category.id !== categoryId),
    }));
  };

  const removeWidget = async (categoryId, widgetId) => {
    await removeWidgetFromFirestore(categoryId, widgetId);
    setData((prevData) => {
      const updatedCategories = prevData.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
          : category
      );
      return { categories: updatedCategories };
    });
  };

  return (
    <DashboardContext.Provider value={{ data, addCategory, addWidget, removeCategory, removeWidget }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
