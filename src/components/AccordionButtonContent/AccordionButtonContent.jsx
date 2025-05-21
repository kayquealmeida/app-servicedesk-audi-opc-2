import React, { useState, useEffect } from 'react';
import './AccordionButtonContent.css';
import Button from '@mui/material/Button';

const AccordionButtonContent = ({ subItems, isAdmin = true }) => {

  const [groupedData, setGroupedData] = useState({});

  const handleTitle = (location) => {
    console.log(location)
    if (location !== '') return <span className='location_title'>{location}</span>;
  }

  if (!subItems || subItems.length === 0) {
    console.error("Invalid items:", subItems);
    return null;
  }

  const handleEdit = (item) => {
    console.log('Edit item:', item);
  };

  const handleDelete = (item) => {
    console.log('Delete item:', item);
  };

  useEffect(() => {
    const grouped = subItems.reduce((acc, item) => {
      const { location } = item; // Potential issue if `item` or `location` is undefined
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push({ ...item, toggled: false });
      return acc;
    }, {});

    setGroupedData(grouped);
  }, [subItems]);



  return (
    <>
      <div>
        {Object.entries(groupedData).map(([location, items]) => (
          <React.Fragment key={location}>
            <div className={`${location ? 'location_container' : ''}`}>
              {handleTitle(location)}
              {items.map((item) => (
                <div key={`${item.location}-${item.buttonName}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Button
                    href={item.TemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    size="small"
                    sx={{
                      margin: '0.4rem',
                      borderRadius: '5px',
                      backgroundColor: '#000',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#fff',
                        color: '#000',
                      },
                    }}
                  >
                    {item.buttonName}
                  </Button>

                  {isAdmin && (
                    <div style={{ display: 'block', marginRight: '0.4rem' }}>
                      <Button onClick={() => handleEdit(item)} variant="outlined" size="small" sx={{ marginLeft: '0.4rem' }}>
                        Editar
                      </Button>
                      <Button onClick={() => handleDelete(item)} variant="outlined" size="small" sx={{ marginLeft: '0.4rem' }}>
                        Excluir
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default AccordionButtonContent
