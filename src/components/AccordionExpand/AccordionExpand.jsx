import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, ButtonGroup } from '@mui/material';
import './AccordionExpand.css';

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
      {Object.entries(groupedData).map(([subCategory, subItems], index) => (
        <React.Fragment key={subCategory}>
          <Accordion
            sx={{
              marginBottom: "0",
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              onClick={() => handleAccordionToggle(subCategory)}
            >
              <Typography component="span">{subCategory}</Typography>
            </AccordionSummary>
            <AccordionDetails

            >
              <div
                variant="contained"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}>

                {/* <div className="accordion-buttons"> */}
                {subItems
                  .filter((item) => item.toggled)
                  .map((item) => (
                    <Button
                      href={item.TemplateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.id || `${subCategory}-${item.Patch}`}
                      variant="contained"
                      size="small"
                      sx={{
                        margin: "0.4rem",
                        borderRadius: "5px",
                        backgroundColor: "#000",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#000",
                        },

                      }}
                    >
                      {item.SubPatch}
                      {/* {console.log('itemSubpatch: ', item.SubPatch)} */}
                    </Button>
                  ))}
                {/* </div> */}
              </div>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ))}
    </>
  );
};

export default AccordionExpand;
