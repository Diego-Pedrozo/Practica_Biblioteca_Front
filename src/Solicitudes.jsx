import React from "react";
import Table from "./Table";
import getData from "./data/data.js"

function Solicitudes() {

    // Pendiente reemplazar estas columnas por los datos que necesitamos
    const columns = React.useMemo(
        () => [
          {
            Header: "Título",
            accessor: "name",
          },
          {
            Header: "Autor",
            accessor: "title",
          },
          {
            Header: "Editorial",
            accessor: "status",
          },
          {
            Header: "Estado",
            accessor: "role",
          },
        ],
        []
      );
    
      const data = React.useMemo(() => getData(), []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
              <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
            </div>
            <div className="mt-4">
              <Table columns={columns} data={data} />
            </div>
          </main>
        </div>
      );

}

export default Solicitudes;