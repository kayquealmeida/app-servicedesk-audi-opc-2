import React, { useState, useEffect } from 'react';
import './AdmView.css';
import CategoryCreate from './CategoryCreate/CategoryCreate';
import SubCategoryCreate from './SubCategoryCreate/SubCategoryCreate';
import LinkCreate from './LinkCreate/LinkCreate';
import AdminPanel from './AdminPanel/AdminPanel';

const AdmView = () => {
  const [mode, setMode] = useState('view');
  const [editStep, setEditStep] = useState(null);
  const [editData, setEditData] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLinksData = async () => {
      try {
        const response = await fetch('/links-list.json');
        const data = await response.json();

        const categoriasUnicas = [...new Set(data.map(item => item.Category))];
        const subCatsComValor = data.filter(item => item.SubCategory);

        setCategorias(categoriasUnicas);
        setSubCategorias(subCatsComValor);
        setLinks(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLinksData();
  }, []);

  const handleEditAction = (action) => {
    setEditStep(action.type);
    setEditData(action.data);
    setMode('edit');
  };

  const handleSave = (newData) => {
    let updatedLinks = [...links];

    if (editStep === 'category') {
      // Se for popup, atualiza/remove o registro existente
      if (newData.isPopUP) {
        updatedLinks = updatedLinks.filter(item =>
          !(item.Category === (editData?.Category || newData.Category) &&
            item.isPopUP &&
            !item.SubCategory)
        );
        updatedLinks.push(newData);
      }

      // Atualiza lista de categorias se for nova
      if (!categorias.includes(newData.Category)) {
        setCategorias([...categorias, newData.Category]);
      }
    }
    else if (editStep === 'subcategory') {
      // Não cria link vazio - apenas atualiza a lista de subcategorias
      const exists = subCategorias.some(sub =>
        sub.Category === newData.Category &&
        sub.SubCategory === newData.SubCategory
      );

      if (!exists) {
        setSubCategorias([...subCategorias, {
          Category: newData.Category,
          SubCategory: newData.SubCategory
        }]);
      }
    }
    else if (editStep === 'link') {
      // Remove link existente se estiver editando
      if (editData?.buttonName) {
        updatedLinks = updatedLinks.filter(item =>
          !(item.Category === newData.Category &&
            (newData.SubCategory ? item.SubCategory === newData.SubCategory : !item.SubCategory) &&
            item.buttonName === editData.buttonName)
        );
      }

      // Adiciona o novo link
      updatedLinks.push(newData);
    }

    setLinks(updatedLinks);
    setMode('view');
    setEditStep(null);
    setEditData(null);
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="admView">
      <div className="admContent">
        {mode === 'view' ? (
          <AdminPanel
            categories={categorias}
            subCategories={subCategorias}
            links={links}
            onEditCategory={(action) => handleEditAction({ ...action, type: 'category' })}
            onEditSubCategory={(action) => handleEditAction({ ...action, type: 'subcategory' })}
            onEditLink={(action) => handleEditAction({ ...action, type: 'link' })}
          />
        ) : (
          <div className="editPanel">
            {editStep === 'category' && (
              <CategoryCreate
                categories={categorias}
                initialData={editData}
                onSave={handleSave}
                onCancel={() => setMode('view')}
              />
            )}

            {editStep === 'subcategory' && (
              <SubCategoryCreate
                categories={categorias}
                initialData={editData}
                onSave={handleSave}
                onCancel={() => setMode('view')}
              />
            )}

            {editStep === 'link' && (
              <LinkCreate
                categories={categorias}
                subCategories={subCategorias}
                initialData={editData}
                onSave={handleSave}
                onCancel={() => setMode('view')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmView;