import { useState } from "react";
import FormularioSolicitud from "../FormularioSolicitud";
import ControlPublicacion from "../ControlPublicacion";

function Home() {

   const [isFormVisible, setIsFormVisible] = useState(false);

   return (

      <div>
         <ControlPublicacion />

         <button
            className="fixed bottom-5 right-5 duration-300 bg-rojo text-white p-4 hover:scale-105 font-bold xt-center rounded-lg w-40 self-center"
            onClick={() => setIsFormVisible(!isFormVisible)}
         >
            {isFormVisible ? 'Cancelar' : 'Realizar solicitud'}
         </button>
         {isFormVisible && (
            <FormularioSolicitud closeForm={() => setIsFormVisible(false)} />
         )}
      </div>
   )
}

export default Home
