import React, {useState, useRef} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import Error from './Error';

function EditarProducto(props) {
    //Destructuring de props
    const {history, producto, guardarRecargarProductos} = props;
    //Generar los refs
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef('');

    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');

    const editarProducto = async e => {
        e.preventDefault();
        //Validacion
        const nuevoNombrePlatillo = nombrePlatilloRef.current.value,
              nuevoPrecioPlatillo = precioPlatilloRef.current.value;
        //Revisar si cambio la catgeoria de lo contrario asignar el mismo valor
        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;
        if(nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //Obtener los valores del formulario
        const editarPlatillo = {
            precioPlatillo : nuevoPrecioPlatillo,
            nombrePlatillo : nuevoNombrePlatillo,
            categoria : categoriaPlatillo
        }
        //Enviar el Request
        const url = `http://localhost:4000/Restaurant/${producto.id}`;
        try {
            const resultado = await axios.put(url, editarPlatillo);
            if(resultado.status === 200) {
                Swal.fire(
                    '¡Producto editado!',
                    '¡El producto fue edito correctamente!',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelva a intentarlo.'
            })
        }
        //Redirigir al usuario, consultar API
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Postres"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Postres')}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Bebida"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Bebida')}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Cortes"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Cortes')}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Ensalada"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProducto);