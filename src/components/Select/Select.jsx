import React, { useState, useEffect } from 'react';
import AccordionExpand from '../AccordionExpand/AccordionExpand';
import Caption from '../Caption/Caption';
import AudiBlack from '/assets/Audi_Rings_black.png';
import ModalContent from '../ModalContent/ModalContent';

const Form = () => {
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false); // Estado do modal

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
      .sort((a, b) => a.Patch.localeCompare(b.Patch));
    setFilteredItems(items);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const items = data.filter((item) => item.Patch.toLowerCase().includes(searchTerm));
    if (selectedCategory) {
      setSelectedCategory('');
    }
    setFilteredItems(items);

    if (searchTerm === '') {
      setFilteredItems([]);
    }
  };

  return (
    <>
      <div className="search-section">
        <h2 className="category-title">Selecione uma Categoria:</h2>
        <div className="input-image">
          <label htmlFor="search" className="search-icon">
            <img
              src={`${import.meta.env.BASE_URL}assets/search.png`}
              className="icon-magnifier"
              alt="Search"
            />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Pesquise por termo (ex: Windows 10)"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <div className="categoryTable-content">
        <div className="category-section">
          {categories.map((category) => (
            <a
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                if (category === 'Sales Force') {
                  setOpen(true);
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
          ))}
        </div>
        {
          console.log('Filtred Item: ', filteredItems)
        }

        {filteredItems.length > 0 ? (
          <section className="accordion-content">
            <AccordionExpand items={filteredItems} />
          </section>
        ) : (
          <div className="middle-img">
            <img className="middle-img" src={AudiBlack} alt="Logo AUDI black" />
          </div>
        )}
      </div>

      {/* Modal conectado ao estado */}
      <ModalContent open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Form;
