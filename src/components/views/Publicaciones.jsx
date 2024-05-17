//import React from 'react'
import Publicacion from "../Publicacion"
import getPublicaciones from "../data/data.js"

function Home() {
   
   // const publicaciones = [
   //    {
   //       id: 1,
   //       titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae elit feugiat libero scelerisque hendrerit eget sed neque.',
   //       descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
   //       imagen: 'https://editorialjbernavil.com/wp-content/uploads/2024/01/imagen-archivo-libros_98.webp'
   //    },
   //    {
   //       id: 2,
   //       titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, sem vel euismod iaculis, purus nunc commodo justo, nec placerat nisi turpis vitae libero. Nunc vel maximus mauris. Ut tortor augue, luctus ullamcorper eleifend vel, rutrum ac tortor. Morbi ultrices lorem non lobortis venenatis. Nunc vitae sollicitudin lacus. Curabitur porttitor vulputate ligula eleifend tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus at nunc at nisl porta feugiat vel vitae quam. Quisque vitae elit feugiat libero scelerisque hendrerit eget sed neque.',
   //       descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, sem vel euismod iaculis, purus nunc commodo justo, nec placerat nisi turpis vitae libero. Nunc vel maximus mauris. Ut tortor augue, luctus ullamcorper eleifend vel, rutrum ac tortor. Morbi ultrices lorem non lobortis venenatis. Nunc vitae sollicitudin lacus. Curabitur porttitor vulputate ligula eleifend tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus at nunc at nisl porta feugiat vel vitae quam. Quisque vitae elit feugiat libero scelerisque hendrerit eget sed neque. Etiam risus nisl, eleifend eu laoreet quis, aliquam vel nisl. Ut ut eros lacus. Etiam vitae sodales ipsum. Donec sit amet pellentesque nisi. Sed sapien sapien, ornare nec felis in, tincidunt commodo sapien. Donec convallis, lorem vel cursus fringilla, purus nisi facilisis lacus, et dictum urna lectus id velit. Nam ipsum orci, faucibus et luctus id, faucibus eu lacus. Pellentesque malesuada turpis sit amet venenatis egestas. Nunc vel rhoncus sapien. Donec finibus congue tortor, sit amet ultrices erat convallis nec. Morbi vitae erat est. Sed suscipit odio risus, sed aliquet odio hendrerit in. Pellentesque sed erat pellentesque, tempus ex dapibus, finibus nibh. Suspendisse libero urna, sagittis a consectetur id, placerat id metus. Nam aliquam dignissim nisi, sed suscipit ligula vestibulum vestibulum. Mauris malesuada varius pharetra. Nulla congue pulvinar iaculis. Nam vehicula leo a felis condimentum, cursus ultricies arcu venenatis. Nulla arcu tortor, fringilla id tortor at, vestibulum rhoncus libero. Suspendisse ut est velit. In hac habitasse platea dictumst. Cras eget dignissim sapien, porttitor fermentum nunc. Donec ultricies augue vitae ante viverra, in condimentum tellus ornare. Aenean justo purus, blandit at ligula non, convallis dapibus metus. Aliquam interdum, eros id interdum varius, nisi lorem tincidunt libero, non condimentum quam arcu a eros. Morbi in eros quis urna porta aliquet. Morbi sit amet laoreet justo. Integer quis laoreet lorem. Praesent rutrum nibh vitae nisi dictum, et lobortis turpis fermentum. Donec iaculis aliquam odio. Etiam tempor erat nec justo mollis vulputate nec ac justo. Ut fermentum et lectus at efficitur. Maecenas quis bibendum nulla. Aenean sem ante, mollis eget aliquam eu, tincidunt non libero. In tincidunt bibendum libero, sed imperdiet ligula varius et. Vestibulum sem est, tincidunt id augue sit amet, auctor cursus augue. Sed quis lacus ut purus fringilla maximus. Nullam non scelerisque eros.',
   //       imagen: 'https://www.educaciontrespuntocero.com/wp-content/uploads/2022/06/clasicos.jpg'
   //    },
   //    {
   //       id: 3,
   //       titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, sem vel euismod iaculis, purus nunc commodo justo, nec placerat nisi turpis vitae libero. Nunc vel maximus mauris. Ut tortor augue, luctus ullamcorper eleifend vel, rutrum ac tortor. Morbi ultrices lorem non lobortis venenatis. Nunc vitae sollicitudin lacus. Curabitur porttitor vulputate ligula eleifend tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus at nunc at nisl porta feugiat vel vitae quam. Quisque vitae elit feugiat libero scelerisque hendrerit eget sed neque.',
   //       descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, sem vel euismod iaculis, purus nunc commodo justo, nec placerat nisi turpis vitae libero. Nunc vel maximus mauris. Ut tortor augue, luctus ullamcorper eleifend vel, rutrum ac tortor. Morbi ultrices lorem non lobortis venenatis. Nunc vitae sollicitudin lacus. Curabitur porttitor vulputate ligula eleifend tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus at nunc at nisl porta feugiat vel vitae quam. Quisque vitae elit feugiat libero scelerisque hendrerit eget sed neque. Etiam risus nisl, eleifend eu laoreet quis, aliquam vel nisl. Ut ut eros lacus. Etiam vitae sodales ipsum. Donec sit amet pellentesque nisi. Sed sapien sapien, ornare nec felis in, tincidunt commodo sapien. Donec convallis, lorem vel cursus fringilla, purus nisi facilisis lacus, et dictum urna lectus id velit. Nam ipsum orci, faucibus et luctus id, faucibus eu lacus. Pellentesque malesuada turpis sit amet venenatis egestas. Nunc vel rhoncus sapien. Donec finibus congue tortor, sit amet ultrices erat convallis nec. Morbi vitae erat est. Sed suscipit odio risus, sed aliquet odio hendrerit in. Pellentesque sed erat pellentesque, tempus ex dapibus, finibus nibh. Suspendisse libero urna, sagittis a consectetur id, placerat id metus. Nam aliquam dignissim nisi, sed suscipit ligula vestibulum vestibulum. Mauris malesuada varius pharetra. Nulla congue pulvinar iaculis. Nam vehicula leo a felis condimentum, cursus ultricies arcu venenatis. Nulla arcu tortor, fringilla id tortor at, vestibulum rhoncus libero. Suspendisse ut est velit. In hac habitasse platea dictumst. Cras eget dignissim sapien, porttitor fermentum nunc. Donec ultricies augue vitae ante viverra, in condimentum tellus ornare. Aenean justo purus, blandit at ligula non, convallis dapibus metus. Aliquam interdum, eros id interdum varius, nisi lorem tincidunt libero, non condimentum quam arcu a eros. Morbi in eros quis urna porta aliquet. Morbi sit amet laoreet justo. Integer quis laoreet lorem. Praesent rutrum nibh vitae nisi dictum, et lobortis turpis fermentum. Donec iaculis aliquam odio. Etiam tempor erat nec justo mollis vulputate nec ac justo. Ut fermentum et lectus at efficitur. Maecenas quis bibendum nulla. Aenean sem ante, mollis eget aliquam eu, tincidunt non libero. In tincidunt bibendum libero, sed imperdiet ligula varius et. Vestibulum sem est, tincidunt id augue sit amet, auctor cursus augue. Sed quis lacus ut purus fringilla maximus. Nullam non scelerisque eros.',
   //       imagen: 'https://static.vecteezy.com/system/resources/previews/009/871/916/non_2x/three-books-and-one-open-cartoon-illustration-vector.jpg'
   //    }
   // ];

   const publicaciones = React.useMemo(() => getPublicaciones(), []);
   return (
      <>
         {publicaciones.map(publicacion => (
            <Publicacion
               key={publicacion.id}
               titulo={publicacion.titulo}
               descripcion={publicacion.descripcion}
               imagen={publicacion.imagen}
            />
         ))}
      </>

   )
}

export default Home
