import React, { useState, useEffect } from 'react';

const EditCategorySubcategoryLinks = ({ category, subcategories, links, onSave, onCancel }) => {
  const [categoryName, setCategoryName] = useState(category.name || '');
  const [subcategoriesState, setSubcategoriesState] = useState(subcategories);
  const [linksState, setLinksState] = useState(links);

  useEffect(() => {
    setCategoryName(category.name);
    setSubcategoriesState(subcategories);
    setLinksState(links);
  }, [category, subcategories, links]);

  const handleLinkChange = (linkIndex, field, value) => {
    const updatedLinks = [...linksState];
    updatedLinks[linkIndex][field] = value;
    setLinksState(updatedLinks);
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...subcategoriesState];
    updatedSubcategories[index].name = value;
    setSubcategoriesState(updatedSubcategories);
  };

  const handleSave = () => {
    onSave({
      category: { ...category, name: categoryName },
      subcategories: subcategoriesState,
      links: linksState,
    });
  };

  return (
    <div className="editCategory">
      <h3>Editar Categoria e Itens</h3>

      {/* Editar Categoria */}
      <div className="categoryEditSection">
        <h4>Editar Categoria</h4>
        <label>
          Nome da Categoria:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
      </div>

      {/* Editar Subcategorias */}
      <div className="subcategoryEditSection">
        <h4>Subcategorias</h4>
        {subcategoriesState.map((sub, index) => (
          <div key={index} className="subcategoryItem">
            <label>
              Nome da Subcategoria:
              <input
                type="text"
                value={sub.name}
                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
              />
            </label>
            {/* Editar Links da Subcategoria */}
            <div className="linksEditSection">
              <h5>Links</h5>
              {sub.links.map((link, linkIndex) => (
                <div key={linkIndex} className="linkItem">
                  <label>
                    Nome do Link:
                    <input
                      type="text"
                      value={link.linkName}
                      onChange={(e) => handleLinkChange(linkIndex, 'linkName', e.target.value)}
                    />
                  </label>
                  <label>
                    URL do Link:
                    <input
                      type="text"
                      value={link.linkURL}
                      onChange={(e) => handleLinkChange(linkIndex, 'linkURL', e.target.value)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botões */}
      <div className="adminButtons">
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditCategorySubcategoryLinks;
