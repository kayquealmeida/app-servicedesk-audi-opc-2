import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AccordionExpand = ({ items, keepOtherOpen }) => {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const grouped = items.reduce((acc, item) => {
      const { SubCategory } = item;

      if (!acc[SubCategory]) {
        acc[SubCategory] = [];
      }

      acc[SubCategory].push({
        ...item,
        toggled: false,
      });

      return acc;
    }, {});

    setGroupedData(grouped);
  }, [items]);

  // Manipular o toggle do accordion
  const handleAccordionToggle = (subCategory) => {
    setGroupedData((prevGrouped) => {
      const updated = { ...prevGrouped };

      updated[subCategory] = updated[subCategory].map((item) => ({
        ...item,
        toggled: keepOtherOpen
          ? !item.toggled
          : item.SubCategory === subCategory && !item.toggled,
      }));

      return updated;
    });
  };

  return (
    < >
      {Object.entries(groupedData).map(([subCategory, subItems]) => (
        <React.Fragment key={subCategory}>
          <tr className="accordion-header" onClick={() => handleAccordionToggle(subCategory)}>
            <td>{subCategory}</td>
            {/* <td>{subItems[0]?.SubPatch || 'N/A'}</td> */}
            {/* <td
              className="toggle"
              onClick={() => handleAccordionToggle(subCategory)}
            >
              <p>{subItems.some((item) => item.toggled) ? '-' : '+'}</p>
            </td> */}
          </tr>

          {subItems
            .filter((item) => item.toggled)
            .map((item) => (
              <tr key={item.id || `${subCategory}-${item.Patch}`} className="accordion-content sub-accordion">

                <td>
                  <a
                    href={item.TemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.SubPatch}
                  </a>
                </td>
              </tr>
            ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default AccordionExpand;
