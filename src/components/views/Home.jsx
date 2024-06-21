import { useState } from "react";
import FormularioSolicitud from "../FormularioSolicitud";
import ControlPublicacion from "../ControlPublicacion";
import CargarExcel from "../CargarExcel";
import MisSolicitudes from "../MisSolicitudes";

function Home() {

   const [isFormVisible, setIsFormVisible] = useState(false);
   const [isForm2Visible, setIsForm2Visible] = useState(false);
   const [showOptions, setShowOptions] = useState(false);
   const [isConsultaVisible, setIsConsultaVisible] = useState(false);

   const handleSolicitudClick = () => {
      if (showOptions || isFormVisible || isForm2Visible) {
         setShowOptions(false);
         setIsFormVisible(false);
         setIsForm2Visible(false);
      } else {
         setShowOptions(true);
      }
   };

   const handleOptionClick = (option) => {
      setShowOptions(false);
      if (option === "single") {
         setIsFormVisible(true);
         setIsForm2Visible(false);
      } else if (option === "multiple") {
         setIsForm2Visible(true);
         setIsFormVisible(false);
      }
   };

   const handleConsultaClick = () => {
      setIsConsultaVisible(!isConsultaVisible);
   };

   return (

      <div>
         <ControlPublicacion />

         <button
            className="fixed bottom-5 left-5 duration-300 bg-rojo text-white p-4 hover:scale-105 font-bold xt-center rounded-lg w-50 self-center"
            onClick={handleConsultaClick}
         >
            Consultar solicitudes
         </button>

         <button
            className="fixed bottom-5 right-5 duration-300 bg-rojo text-white p-4 hover:scale-105 font-bold xt-center rounded-lg w-40 self-center"
            onClick={handleSolicitudClick}
         >
            {(showOptions || isFormVisible || isForm2Visible) ? 'Cancelar' : 'Realizar solicitud'}
         </button>
         {showOptions && (
            <div className="fixed bottom-20 right-5 bg-white p-4 rounded-lg shadow-lg w-64 border-2 border-rojo">
               <button
                  className="block w-full text-left p-2 hover:bg-gray-200"
                  onClick={() => handleOptionClick('single')}
               >
                  Solicitud única
               </button>
               <button
                  className="block w-full text-left p-2 hover:bg-gray-200"
                  onClick={() => handleOptionClick('multiple')}
               >
                  Múltiples solicitudes (Excel)
               </button>
            </div>
         )}
         {isFormVisible && (
            <FormularioSolicitud closeForm={() => setIsFormVisible(false)} />
         )}
         {isForm2Visible && (
            <CargarExcel closeForm={() => setIsForm2Visible(false)} />
         )}
         {isConsultaVisible && (
            <MisSolicitudes closeForm={() => setIsConsultaVisible(false)} />
         )}
      </div>
   )
}

export default Home
