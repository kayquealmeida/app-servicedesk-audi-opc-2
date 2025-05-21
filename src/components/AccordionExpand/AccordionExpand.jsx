import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModalContent from '../ModalContent/ModalContent';
import TooltipContent from '../TooltipContent/TooltipContent';
import './AccordionExpand.css';
import AccordionButtonContent from '../AccordionButtonContent/AccordionButtonContent';

const AccordionExpand = ({ items, keepOtherOpen, isAdmin }) => {
  const [groupedData, setGroupedData] = useState({});
  const [open, setOpen] = useState(false); // Estado para controle do modal
  const [modalContent, setModalContent] = useState({}); // Conteúdo do modal
  const [expanded, setExpanded] = useState(null); // Estado para controlar qual accordion está expandido

  useEffect(() => {
    const grouped = items.reduce((acc, item) => {
      const { SubCategory } = item;

      if (!acc[SubCategory]) {
        acc[SubCategory] = [];
      }

      console.log('acc[SubCategory]: ', acc[SubCategory])

      acc[SubCategory].push({
        ...item,
        toggled: false,
        toolTip: item.ToolTip,
        location: item.location || '',
      });

      return acc;
    }, {});

    setGroupedData(grouped);
  }, [items]);


  // Manipular o toggle do accordion
  const handleAccordionToggle = (subCategory, item) => {
    if (item?.isPopUP) {
      setModalContent(item);  // Passa o item para o conteúdo do modal
      setOpen(true);  // Abre o modal
      // console.log("Item com isPopUP:", item);
    } else {
      setGroupedData((prevGrouped) => {
        const updated = { ...prevGrouped };

        updated[subCategory] = updated[subCategory].map((accItem) => ({
          ...accItem,
          toggled: keepOtherOpen
            ? !accItem.toggled
            : accItem.SubCategory === subCategory && !accItem.toggled,
        }));

        return updated;
      });
    }
  };

  return (
    <>
      {Object.entries(groupedData).map(([subCategory, subItems], index) => (
        <React.Fragment key={subCategory}>
          <TooltipContent id="my-tooltip-children-multiline" text={subItems[0].ToolTip}>
            <Accordion
              sx={{
                marginBottom: "0",
              }}
              expanded={expanded === subCategory} // Controla qual accordion está expandido
              onChange={() => {
                // Verifica se o item tem isPopUP
                const itemWithPopUp = subItems.find(item => item.isPopUP);

                if (itemWithPopUp) {
                  // Impede a expansão do accordion e abre o modal
                  setExpanded(null); // Não expande o accordion se tiver isPopUP
                  handleAccordionToggle(subCategory, itemWithPopUp);
                  // console.log("Item com isPopUP: abrir o modal", itemWithPopUp);
                } else {
                  // Expande ou fecha o accordion normalmente
                  setExpanded(expanded === subCategory ? null : subCategory);
                  // console.log("Accordion expandido", subCategory);
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography component="span" fontWeight="550" color="#000">
                  {subCategory}

                </Typography>
              </AccordionSummary>


              <AccordionDetails>
                <div
                  variant="contained"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >

                  <AccordionButtonContent subItems={subItems} isAdmin={isAdmin} />

                </div>
              </AccordionDetails>
            </Accordion>
          </TooltipContent>
        </React.Fragment>
      ))}

      {/* Modal que é exibido caso o item tenha isPopUP como true */}
      <ModalContent open={open} onClose={() => setOpen(false)} title={modalContent?.ModalTitle || ''} text={modalContent?.ModalText || ''} modalImg={modalContent?.ModalImg || ''} />
    </>
  );
};

export default AccordionExpand;
