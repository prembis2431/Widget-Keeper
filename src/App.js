import React, { useEffect, useState, useContext, useRef } from "react";
import { DashboardContext } from "./context/GlobalContext";
import { addCategoryToFirestore } from "./Firestore"; // Assuming you have this service

const App = () => {
  const {
    data,
    addWidget,
    removeWidget,
    addCategory,
    removeCategory,
    searchTerm,
    updateSearchTerm,
  } = useContext(DashboardContext);

  const widgetNameRef = useRef("");
  const widgetTextRef = useRef("");
  const categoryNameRef = useRef("");


  // Load data from localStorage on initial render
  useEffect(() => {
   
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.categories.length > 0) {
        parsedData.categories.forEach((category) => {
          addCategory(category.name, category.id, category.widgets);
        });
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save data to localStorage whenever the data object changes
  useEffect(() => {
    console.log("knjaudhfowefqew ", data )
    localStorage.setItem("dashboardData", JSON.stringify(data));
  }, [])  

  // Filtered categories based on search term
  const filteredCategories = data.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const handleAddWidget = (categoryId) => {
    const widgetName = widgetNameRef.current?.value.trim();
    const widgetText = widgetTextRef.current?.value.trim();
    console.log('Widget Name:', widgetName);
    console.log('Widget Text:', widgetText);

    if (widgetName !== "" && widgetText !== "") {
      addWidget(categoryId, widgetName, widgetText);
      widgetNameRef.current.value = "";
      widgetTextRef.current.value = "";
    }
  };

  const handleAddCategory = () => {
    const newCategoryName = categoryNameRef.current.value.trim();

    if (newCategoryName !== "") {
      addCategory(newCategoryName);
      categoryNameRef.current.value = "";
    } 
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Widgets</h1>
        <input
          type="text"
          placeholder="Search Widgets..."
          value={searchTerm}
          onChange={(e) => updateSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </header>

      {/* Add New Category */}
      <div style={styles.addCategoryContainer}>
        <h2 style={styles.subTitle}>Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          ref={categoryNameRef}
          style={styles.input}
        />
        <button onClick={handleAddCategory} style={styles.addButton}>
        + Add Category
        </button>
      </div>

      {/* Display Categories and Widgets */}
      <div style={styles.categoriesContainer}>
        {filteredCategories.map((category) => (
          <div key={category.id} style={styles.categoryBox}>
            <div style={styles.categoryHeader}>
              <h2 style={styles.categoryTitle}>{category.name}</h2>
              <button
                onClick={() => removeCategory(category.id)}
                style={styles.removeCategoryButton}
              >
                X
              </button>
            </div>

            {/* Widgets */}
            <div style={styles.widgetsContainer}>
              {category.widgets.map((widget) => (
                <div key={widget.id} style={styles.widgetBox}>
                  <h4 style={styles.widgetTitle}>{widget.name}</h4>
                  <p style={styles.widgetText}>{widget.text}</p>
                  <button
                    onClick={() => removeWidget(category.id, widget.id)}
                    style={styles.removeWidgetButton}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Widget to This Category */}
            <div style={styles.addWidgetContainer}>
              <input
                type="text"
                placeholder="Widget Name"
                ref={widgetNameRef}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Widget Text"
                ref={widgetTextRef}
                style={styles.input}
              />
              <button
                onClick={() => handleAddWidget(category.id)}
                style={styles.addButton}
              >
                + Add Widget
              </button>

              {
                <>
                <span>
                  {data.categories.map(e=>{
                    <div>{e.id}</div>
                  })}
                </span> 
                </>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#F5F7FA",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  addCategoryContainer: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginRight: "10px",
  },
  input: {
    marginTop: "10px",
    padding: "10px",
    marginRight: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
    flex: "1",
  },
  addButton: {
    marginTop: "5px",
    padding: "10px 20px",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  categoriesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  categoryBox: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  categoryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  removeCategoryButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#f44336",
    cursor: "pointer",
  },
  widgetsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  widgetBox: {
    backgroundColor: "#f1f1f1",
    borderRadius: "18px",
    padding: "15px",
    position: "relative",
  },
  widgetTitle: {
    fontSize: "16px",
    fontWeight: "500",
  },
  widgetText: {
    fontSize: "14px",
    color: "#555",
  },
  removeWidgetButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#f44336",
    cursor: "pointer",
  },
  addWidgetContainer: {
    marginTop: "20px",
  },
};

export default App;
