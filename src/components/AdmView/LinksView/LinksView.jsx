import React from 'react';
import './LinksView.css';

const LinksView = ({ data }) => {
  // Organiza os dados hierarquicamente
  const organizedData = data.reduce((acc, item) => {
    // Encontra ou cria a categoria
    let category = acc.find(cat => cat.name === item.Category);
    if (!category) {
      category = {
        name: item.Category,
        isPopUP: item.isPopUP,
        ModalImg: item.ModalImg,
        ModalTitle: item.ModalTitle,
        ModalText: item.ModalText,
        subCategories: []
      };
      acc.push(category);
    }

    // Se tiver subcategoria, adiciona
    if (item.SubCategory) {
      let subCategory = category.subCategories.find(sub => sub.name === item.SubCategory);
      if (!subCategory) {
        subCategory = {
          name: item.SubCategory,
          links: []
        };
        category.subCategories.push(subCategory);
      }

      // Se tiver link, adiciona
      if (item.buttonName && item.TemplateUrl) {
        subCategory.links.push({
          name: item.buttonName,
          url: item.TemplateUrl,
          location: item.location,
          isInternal: item.isInternal,
          ToolTip: item.ToolTip
        });
      }
    }

    return acc;
  }, []);

  return (
    <div className="links-view-container">
      <h2>Catálogo de Links</h2>

      {organizedData.map((category, catIndex) => (
        <div key={catIndex} className="category-card">
          <div className="category-header">
            <h3>{category.name}</h3>
            {category.isPopUP && (
              <div className="popup-info">
                {category.ModalImg && (
                  <img src={category.ModalImg} alt={category.ModalTitle} />
                )}
                <h4>{category.ModalTitle}</h4>
                <p>{category.ModalText}</p>
              </div>
            )}
          </div>

          {category.subCategories.map((subCategory, subIndex) => (
            <div key={subIndex} className="subcategory-card">
              <h4>{subCategory.name}</h4>

              <div className="links-grid">
                {subCategory.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-card"
                    title={link.ToolTip}
                  >
                    <span>{link.name}</span>
                    {link.location && (
                      <small className="location">{link.location}</small>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LinksView;