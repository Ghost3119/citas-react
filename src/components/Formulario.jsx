import {useState, useEffect} from 'react';
import Error from './Error';

const generarId = () => {
  const random = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);

  return random + fecha;
}

function Formulario({pacientes, setPacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      console.log('Hay campos vacios');

      setError(true);
      return;
    }
    setError(false);

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //ediatamos el registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
    
      setPacientes(pacientesActualizados);
      setPaciente({});

    }else{
      // nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes,objetoPaciente])
    }



    // Reiniciar el form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimineto Pacientes</h2>
      <p className="mb-10 text-lg mt-5 text-center">
        Añade pacientes y {' '}
        <span className="text-amber-400 font-bold">Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && 
        <Error><p>Todos los campos son obligatorios</p></Error>
        }
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input 
          id="mascota"
          type="text"
          placeholder="Nombre Mascota"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-lg"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input 
          id="propietario"
          type="text"
          placeholder="Nombre del Propietario"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-lg"
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input 
          id="email"
          type="email"
          placeholder="Email contacto propietario"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Alta
          </label>
          <input 
          id="alta"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-lg"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-slate-500 rounded-lg"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
        type="submit"
        className="bg-amber-400 w-full p-3 text-white uppercase font-bold hover:bg-amber-500 rounded-lg cursor-pointer transition-all"
        value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
    
  )
}

export default Formulario