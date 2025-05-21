import React, { useState, useEffect } from 'react';
import AccordionExpand from '../AccordionExpand/AccordionExpand';
import ModalContent from '../ModalContent/ModalContent';
import { Button, Checkbox } from '@mui/material';

const Form = ({ isAdmin = true }) => {
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false); // Estado do modal
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonUrl = `${import.meta.env.BASE_URL}links-list.json`;
        const response = await fetch(jsonUrl);
        const jsonData = await response.json();

        const uniqueCategories = [...new Set(jsonData.map((item) => item.Category))].sort();
        setCategories(uniqueCategories);
        setData(jsonData);
      } catch (error) {
        console.error('Erro ao carregar os dados do JSON:', error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const items = data
      .filter((item) => item.Category === category)
      .sort((a, b) => a.SubCategory.localeCompare(b.SubCategory));
    setFilteredItems(items);
  };

  const handleModalSubCatText = (category) => {
    const modalCont = data.filter((item) => item.isPopUP).filter((item) => item.Category === category);
    setModalContent(modalCont[0] || {}); // Evita passar undefined
    setOpen(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const items = data.filter((item) => item.SubCategory.toLowerCase().includes(searchTerm));
    if (selectedCategory) {
      setSelectedCategory('');
    }
    setFilteredItems(items);

    if (searchTerm === '') {
      setFilteredItems([]);
    }
  };

  const handleEditCategory = () => {

  };

  return (
    <>

      <div className="search-section">
        <h2 className="category-title">Selecione uma Categoria:</h2>
        <div className="input-image">
          <input
            id="search"
            type="text"
            placeholder="Pesquise por termo (ex: Windows 10)"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <label htmlFor="search" className="search-icon">
            <img
              src={`${import.meta.env.BASE_URL}assets/search.png`}
              className="icon-magnifier"
              alt="Search"
            />
          </label>
        </div>
      </div>
      {isAdmin && (
        <div className="edit-button-container">
          <Button
            onClick={handleEditCategory}
            variant="outlined"
            size="medium"
            sx={{}}
          >
            Editar
          </Button>
        </div>
      )}

      <div className="categoryTable-content">

        <div className="category-section">
          {categories.map((category) => (
            <div key={category} className="category-button-container">
              <a
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  if (category === 'Salesforce' || category === 'Dealers') {
                    handleModalSubCatText(category);
                  } else {
                    handleCategoryChange(category);
                  }
                }}
                onMouseEnter={(e) => {
                  const imgElement = e.currentTarget.querySelector('img');
                  imgElement.src = `${import.meta.env.BASE_URL}assets/${category}-white.png`;
                }}
                onMouseLeave={(e) => {
                  const imgElement = e.currentTarget.querySelector('img');
                  if (selectedCategory !== category) {
                    imgElement.src = `${import.meta.env.BASE_URL}assets/${category}.png`;
                  }
                }}
              >
                <img
                  src={
                    selectedCategory === category
                      ? `${import.meta.env.BASE_URL}assets/${category}-white.png`
                      : `${import.meta.env.BASE_URL}assets/${category}.png`
                  }
                  className="category-icon"
                  alt={category}
                />
                {category}
              </a>
            </div>
          ))}
        </div>

        {filteredItems.length > 0 ? (
          <section className="accordion-content">
            <AccordionExpand items={filteredItems} />
          </section>
        ) : (
          <div className="middle-img">
            {/* <img className="middle-img" src={AudiBlack} alt="Logo AUDI black" /> */}
          </div>
        )}
      </div>

      {/* Modal para mostrar informações, se necessário */}
      <ModalContent open={open} onClose={() => setOpen(false)} title={modalContent?.ModalTitle || ''} text={modalContent?.ModalText || ''} modalImg={modalContent?.ModalImg || ''} />
    </>
  );
};

export default Form;
