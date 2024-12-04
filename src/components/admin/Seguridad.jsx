import { useState, useEffect } from "react";
import { useAnalisisStore } from "../../store/analisisStore";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Banner from "../../shared/Banner2"; 
import logo from "../../assets/img4.gif";
import { Bar, Pie, Line, PolarArea } from "react-chartjs-2"; // Importar los componentes de gráficos
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);
const Seguridad = () => {
  
    const { fetchAnalisis, analisisList, createAnalisis, updateAnalisis, deleteAnalisis } = useAnalisisStore();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnalisis, setCurrentAnalisis] = useState({
    activo: "",
    amenaza: "",
    consecuencia: "",
    probabilidad: "",
    impacto: "",
    riesgoInherente: "",
    nivelRiesgo: "",
    tratamiento: "",
    controles: "",
    tipo: "",
    nivel: "",
    frecuencia: "",
    probabilidadResidual: "",
    impactoResidual: "",
    riesgoResidual: "",
    nivelRiesgoResidual: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchAnalisis(token);
  }, [fetchAnalisis]);

  const openModal = (analisis = null) => {
    if (analisis) {
      setIsEditing(true);
      setCurrentAnalisis({ ...analisis });
    } else {
      setIsEditing(false);
      setCurrentAnalisis({
        activo: "",
        amenaza: "",
        consecuencia: "",
        probabilidad: "",
        impacto: "",
        riesgoInherente: "",
        nivelRiesgo: "",
        tratamiento: "",
        controles: "",
        tipo: "",
        nivel: "",
        frecuencia: "",
        probabilidadResidual: "",
        impactoResidual: "",
        riesgoResidual: "",
        nivelRiesgoResidual: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculateRisk = (probabilidad, impacto) => {
    const riesgo = probabilidad * impacto;
    let nivelRiesgo = "";

    if (riesgo >= 1 && riesgo <= 4) nivelRiesgo = "Bajo";
    else if (riesgo >= 5 && riesgo <= 9) nivelRiesgo = "Moderado";
    else if (riesgo >= 10 && riesgo <= 16) nivelRiesgo = "Alto";
    else if (riesgo >= 20) nivelRiesgo = "Extremo";

    return { riesgo, nivelRiesgo };
  };

  const handleInputChange = (field, value) => {
    const updatedAnalisis = { ...currentAnalisis, [field]: value };

    // Calcular riesgos inherentes y residuales
    if (field === "probabilidad" || field === "impacto") {
      const { riesgo, nivelRiesgo } = calculateRisk(
        updatedAnalisis.probabilidad,
        updatedAnalisis.impacto
      );
      updatedAnalisis.riesgoInherente = riesgo;
      updatedAnalisis.nivelRiesgo = nivelRiesgo;
    }

    if (field === "probabilidadResidual" || field === "impactoResidual") {
      const { riesgo, nivelRiesgo } = calculateRisk(
        updatedAnalisis.probabilidadResidual,
        updatedAnalisis.impactoResidual
      );
      updatedAnalisis.riesgoResidual = riesgo;
      updatedAnalisis.nivelRiesgoResidual = nivelRiesgo;
    }

    setCurrentAnalisis(updatedAnalisis);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este análisis?"
    );
    if (!confirmDelete) return;
  
    const token = localStorage.getItem("token");
    try {
      await deleteAnalisis(id, token); // Llama al método del servicio
      alert("El análisis fue eliminado correctamente.");
      fetchAnalisis(token); // Actualiza la lista de análisis
    } catch (error) {
      console.error("Error al eliminar el análisis:", error);
      alert("Hubo un error al intentar eliminar el análisis.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    const payload = {
      ...currentAnalisis,
      createdAt: isEditing ? currentAnalisis.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  
    try {
      if (isEditing) {
        await updateAnalisis(payload, token); // Actualiza
      } else {
        await createAnalisis(payload, token); // Crea
      }
      setShowModal(false);
      fetchAnalisis(token); // Recarga la lista
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Hubo un error al guardar el análisis.");
    }
  };
  
  
  return (
    <div className="p-4 max-w-screen-2xl mx-auto mt-10">
      <div className="md:px-10 p-4 max-w-screen-2xl mx-auto mb-44" id="home">
        <Banner
          banner={logo}
          heading="Análisis de Riesgos"
          subheading="Registra y gestiona incidentes de seguridad, proporcionando un módulo basado en una tabla de Análisis de Riesgos de Seguridad de la Información."
          bt1="Agregar una incidencia"
          onBt1Click={() => openModal()}
        />
      </div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        className="mb-8 mt-12"
      >
        <div className="shadow-lg bg-white rounded-lg p-6 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4">
            Matriz de Análisis de Riesgos
          </h1>
          <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
  <tr>
    <th className="px-4 py-2">Activo</th>
    <th className="px-4 py-2">Amenaza</th>
    <th className="px-4 py-2">Consecuencia</th>
    <th className="px-4 py-2">P</th>
    <th className="px-4 py-2">I</th>
    <th className="px-4 py-2">Riesgo Inherente</th>
    <th className="px-4 py-2">Nivel de Riesgo</th>
    <th className="px-4 py-2">Tratamiento</th>

    <th className="px-4 py-2">Controles</th>
    <th className="px-4 py-2">Tipo</th>
    <th className="px-4 py-2">Nivel</th>
    <th className="px-4 py-2">Frecuencia</th>
    <th className="px-4 py-2">P</th>
    <th className="px-4 py-2">I</th>
    <th className="px-4 py-2">Riesgo Residual</th>
    <th className="px-4 py-2">Nivel de Riesgo</th>
    <th className="px-4 py-2"></th>
  </tr>
</thead>
<tbody>
  {analisisList.map((analisis) => (
    <tr key={analisis.id} className="border-t">
      <td className="px-4 py-2">{analisis.activo}</td>
      <td className="px-4 py-2">{analisis.amenaza}</td>
      <td className="px-4 py-2">{analisis.consecuencia}</td>
      <td className="px-4 py-2">{analisis.probabilidad}</td>
      <td className="px-4 py-2">{analisis.impacto}</td>
      <td className="px-4 py-2">{analisis.riesgoInherente}</td>
      <td className="px-4 py-2">{analisis.nivelRiesgo}</td>
      
      <td className="px-2 py-2">{analisis.tratamiento}</td>


      <td className="px-4 py-2">{analisis.controles}</td>
      <td className="px-4 py-2">{analisis.tipo}</td>
      <td className="px-4 py-2">{analisis.nivel}</td>
      <td className="px-4 py-2">{analisis.frecuencia}</td>
      <td className="px-4 py-2">{analisis.probabilidadResidual}</td>
      <td className="px-4 py-2">{analisis.impactoResidual}</td>
      <td className="px-4 py-2">{analisis.riesgoResidual}</td>
      <td className="px-4 py-2">{analisis.nivelRiesgoResidual}</td>
      <td className="px-4 py-2 flex space-x-2">
  <button
    className="text-blue-500 hover:text-blue-700"
    onClick={() => openModal(analisis)}
  >
    ✏️
  </button>
  
</td>
<td className="px-4 py-2 flex space-x-2">
  
  <button
    className="text-red-500 hover:text-red-700"
    onClick={() => handleDelete(analisis.id)}
  >
    🗑️
  </button>
</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </motion.div>

      {showModal && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Editar Incidencia" : "Agregar Incidencia"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              Activo de Información:
              <input
                type="text"
                value={currentAnalisis.activo}
                onChange={(e) => handleInputChange("activo", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Amenaza/Vulnerabilidad:
              <input
                type="text"
                value={currentAnalisis.amenaza}
                onChange={(e) => handleInputChange("amenaza", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Consecuencia:
              <input
                type="text"
                value={currentAnalisis.consecuencia}
                onChange={(e) => handleInputChange("consecuencia", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Probabilidad:
              <input
                type="number"
                min="1"
                max="5"
                value={currentAnalisis.probabilidad}
                onChange={(e) => handleInputChange("probabilidad", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Impacto:
              <input
                type="number"
                min="1"
                max="5"
                value={currentAnalisis.impacto}
                onChange={(e) => handleInputChange("impacto", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Tratamiento:
              <input
                type="text"
                value={currentAnalisis.tratamiento}
                onChange={(e) => handleInputChange("tratamiento", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div className="sm:col-span-2 flex justify-between gap-4">
            <div className="w-1/2">
              <label className="block mb-2">
                Riesgo Inherente (calculado):
                <input
                  type="text"
                  value={currentAnalisis.riesgoInherente}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </label>
            </div>
            <div className="w-1/2">
              <label className="block mb-2">
                Nivel de Riesgo (calculado):
                <input
                  type="text"
                  value={currentAnalisis.nivelRiesgo}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </label>
            </div>
          </div>
          
          <div>
            <label className="block mb-2">
              Mitigacion:
              <input
                type="text"
                value={currentAnalisis.controles}
                onChange={(e) => handleInputChange("controles", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Tipo:
              <select
                value={currentAnalisis.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Preventivo">Preventivo</option>
                <option value="Detectivo">Detectivo</option>
                <option value="Correctivo">Correctivo</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Nivel:
              <select
                value={currentAnalisis.nivel}
                onChange={(e) => handleInputChange("nivel", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Automatico">Automatico</option>
                <option value="Semiautomatico">Semiautomatico</option>
                <option value="Manual">Manual</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Frecuencia:
              <input
                type="text"
                value={currentAnalisis.frecuencia}
                onChange={(e) => handleInputChange("frecuencia", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Probabilidad Residual:
              <input
                type="number"
                min="1"
                max="5"
                value={currentAnalisis.probabilidadResidual}
                onChange={(e) =>
                  handleInputChange("probabilidadResidual", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              Impacto Residual:
              <input
                type="number"
                min="1"
                max="5"
                value={currentAnalisis.impactoResidual}
                onChange={(e) =>
                  handleInputChange("impactoResidual", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
          <div className="sm:col-span-2 flex justify-between gap-4">
            <div className="w-1/2">
              <label className="block mb-2">
                Riesgo Residual (calculado):
                <input
                  type="text"
                  value={currentAnalisis.riesgoResidual}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </label>
            </div>
            <div className="w-1/2">
              <label className="block mb-2">
                Nivel de Riesgo Residual (calculado):
                <input
                  type="text"
                  value={currentAnalisis.nivelRiesgoResidual}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
<motion.div
  variants={fadeIn("right", 0.2)}
  initial="hidden"
  whileInView="show"
  className="mb-8 mt-12"
>
  <div className="shadow-lg bg-white rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Visualización Gráfica</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Gráfico de barras */}
      <div className="p-4 border rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Análisis por Nivel de Riesgo Residual (Barras)</h3>
        <Bar
          data={{
            labels: ["Bajo", "Moderado", "Alto", "Extremo"],
            datasets: [
              {
                label: "Cantidad de Análisis",
                data: [
                  analisisList.filter(a => a.nivelRiesgoResidual === "Bajo").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Moderado").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Alto").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Extremo").length,
                ],
                backgroundColor: ["#4CAF50", "#FFC107", "#FF5722", "#E91E63"],
                borderColor: ["#388E3C", "#FFA000", "#D32F2F", "#C2185B"],
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>

      {/* Gráfico de pastel */}
      <div className="p-4 border rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Distribución de Niveles de Riesgo (Pastel)</h3>
        <Pie
          data={{
            labels: ["Bajo", "Moderado", "Alto", "Extremo"],
            datasets: [
              {
                data: [
                  analisisList.filter(a => a.nivelRiesgoResidual === "Bajo").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Moderado").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Alto").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Extremo").length,
                ],
                backgroundColor: ["#4CAF50", "#FFC107", "#FF5722", "#E91E63"],
                borderColor: ["#388E3C", "#FFA000", "#D32F2F", "#C2185B"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* Gráfico de líneas */}
      <div className="p-4 border rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Tendencia de Análisis (Línea)</h3>
        <Line
          data={{
            labels: ["Bajo", "Moderado", "Alto", "Extremo"],
            datasets: [
              {
                label: "Cantidad de Análisis",
                data: [
                  analisisList.filter(a => a.nivelRiesgoResidual === "Bajo").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Moderado").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Alto").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Extremo").length,
                ],
                borderColor: "#42A5F5",
                backgroundColor: "rgba(66, 165, 245, 0.2)",
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>

      {/* Gráfico polar */}
      <div className="p-4 border rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Distribución Polar de Niveles de Riesgo</h3>
        <PolarArea
          data={{
            labels: ["Bajo", "Moderado", "Alto", "Extremo"],
            datasets: [
              {
                data: [
                  analisisList.filter(a => a.nivelRiesgoResidual === "Bajo").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Moderado").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Alto").length,
                  analisisList.filter(a => a.nivelRiesgoResidual === "Extremo").length,
                ],
                backgroundColor: ["#4CAF50", "#FFC107", "#FF5722", "#E91E63"],
                borderColor: ["#388E3C", "#FFA000", "#D32F2F", "#C2185B"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
      <div className="p-4 border rounded-lg shadow-lg">
  <h3 className="text-lg font-semibold mb-4">Distribución por Tipo (Barras)</h3>
  <Bar
    data={{
      labels: ["Preventivo", "Detectivo", "Correctivo"],
      datasets: [
        {
          label: "Cantidad de Análisis",
          data: [
            analisisList.filter((a) => a.tipo === "Preventivo").length,
            analisisList.filter((a) => a.tipo === "Detectivo").length,
            analisisList.filter((a) => a.tipo === "Correctivo").length,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderWidth: 2,
        },
      ],
    }}
  />
</div>
<div className="p-4 border rounded-lg shadow-lg">
  <h3 className="text-lg font-semibold mb-4">Distribución por Nivel (Polar)</h3>
  <PolarArea
    data={{
      labels: ["Automático", "Semiautomático", "Manual"],
      datasets: [
        {
          data: [
            analisisList.filter((a) => a.nivel === "Automatico").length,
            analisisList.filter((a) => a.nivel === "Semiautomatico").length,
            analisisList.filter((a) => a.nivel === "Manual").length,
          ],
          backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56"],
          borderColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          borderWidth: 1,
        },
      ],
    }}
  />
</div>

    </div>
  </div>
</motion.div>
    </div>
  );
};

export default Seguridad;
