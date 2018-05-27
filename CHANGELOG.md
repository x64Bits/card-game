# Changelog
Todos los cambios del proyecto se veran reflejados en este archivo.

## [0.0.1] - 27-05-2018
### Added
- EndPoint para el registro de nuevo usuario.
- EndPoint para mostrar un usuario en especifico.
- Los nuevos usuario se le asignaran 5 cartas de la coleccion 'starting'.
- EndPoint para cambiar la contraseña.
- Semillas para agregar 5 cartas de juego al azar cuando se necesite.

### Changed
- La funcion que añade 5 cartas al usuario al momento de registrarse, se separo del metodo de registro para mejor lectura del codigo.
- Las cartas ahora pertenecen a una coleccion para diferenciar un lote de las mismas.


### Removed
- Las cartas de usuario traian un valor por defecto en el campo de dmg, se ha eliminado y ahora toma el valor que la carta de juego tenga como base.

## [Unreleased]