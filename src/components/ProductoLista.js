import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductoLista({producto, guardarRecargarProductos}) {
    const eliminarProducto = id => {
        console.log('Eliminando: ',id);
        //TODO: Eliminar los registros
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Es una accion irreversible!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminalo!'
        }).then( async (result) => {
            if(result.value) {
                try {
                    const url = `http://localhost:4000/Restaurant/${id}`;
                    const resulltado = await axios.delete(url);
                    if(resulltado.status === 200) {
                        Swal.fire(
                            '¡Eliminado!',
                            '¡El producto fue eliminado!',
                            'success'
                        )
                        //Consultar la API nuevamente
                        guardarRecargarProductos(true);
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, vuelva a intentarlo.'
                    })
                }
            }

        })
    }
    return (
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-weight-bold">
            <p>
                {producto.nombrePlatillo} {'  '}
                <span className="font-weight-bold">${producto.precioPlatillo}</span>
            </p>
            <div>
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-success mr-2">
                    Editar
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
                    Eliminar &times;
                </button>
            </div>
        </li>
        
    )
}

export default ProductoLista;