import { useState } from 'react';
import CitasEst from './CitasEst';
import ConsultasEst from './ConsultasEst';

const ConsultasContainer = () => {
  const [selectedCita, setSelectedCita] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);

  const handleBackdropClick = () => {
    setSelectedCita(null);
    setSelectedTreatment(null);
    setDetailModalOpen(false);
    setOptionsModalOpen(false);
  };

  const onClose = () => {
    setSelectedCita(null);
    setSelectedTreatment(null);
    setDetailModalOpen(false);
    setOptionsModalOpen(false);
  };

  return (
    <div>
      <CitasEst
        selectedCita={selectedCita}
        setSelectedCita={setSelectedCita}
        handleBackdropClick={handleBackdropClick}
        onClose={onClose}
      />
      <ConsultasEst
        selectedTreatment={selectedTreatment}
        setSelectedTreatment={setSelectedTreatment}
        detailModalOpen={detailModalOpen}
        setDetailModalOpen={setDetailModalOpen}
        optionsModalOpen={optionsModalOpen}
        setOptionsModalOpen={setOptionsModalOpen}
        handleBackdropClick={handleBackdropClick}
        onClose={onClose}
      />
    </div>
  );
};

export default ConsultasContainer;
