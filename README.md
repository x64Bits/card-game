# TCG modern game

Juego de cartas moderno, épico y totalmente adictivo.

1. Batalla contra otros jugadores o la IA.
2. Mas de 1.000 cartas diferentes y con diferentes efectos.
3. Un diseño único y moderno que diferencia de otros juegos del mismo genero.
4. Batallas en tiempo real de corta duración pero de desenfrenada acción.
5. Rankings para competir con tus amigos, tienda para vender tus cartas y mas.


Técnicamente el juego sera un TCG multiplataformas orientado a partidas rápidas y el intercambio de cartas entre jugadores.

### Diseño básico para funcionalidad del juego en el back-end:

* #### Registro de cuenta

	* Controlador: **UserController**
	* Modelo: **User**
		* Relacion: **User** Tiene muchas **CardPlayer**
	* Campos a llenar en el registro:

		* Username
		* Email
		* Password

	* **Explicacion:**

		* Se envía todo el request del registro para posteriormente ser manejado por el método de 'storage', el cual va a crear el registro del usuario con sus respectivos datos por default al momento de la creación, durante ese proceso se le darán las primeras 5 cartas de inicio relacionadas a la cuenta.

---
* #### Cartas del Jugador

	* Controlador: **CardPlayerController**
	* Modelo: **CardPlayer**
		* Relacion: **CardPlayer** pertenece a **User**
	* Campos en la base de datos:

		* user_id: de tipo __integer__ que representa la relación entre la carta y el jugador.
		* card_id: de tipo __integer__ que representa la relación entre la carta del jugador y la carta del juego la cual contiene toda la informacion base de la misma.
		* level: de tipo __integer__ que representa el level de la carta.
		* exp : de tipo __integer__ que representa la experiencia de la carta para subir de nivel.
		* dmg: de tipo __integer__ que representa el daño de la carta contra otra carta.

	* El controlador se encargara de listar las cartas del jugador.

	* También tendrá un método para ver detalles de la carta que se seleccione.

	* El controlador de encargara de manejar la experiencia y el nivel de las cartas.

	* Cuando se necesite, **CardPlayer** se unira con **CardGame** para hacer una carta completa, es decir: siempre que se necesite listar las cartas del jugador, con un join se logra perfectamente el resultado deseado.

---
* #### Cartas del Juego

	* Controlador: **CardController**
	* Modelo: **Card**
	* Campos en la base de datos:

		* id: de tipo __integer__ que representa el id de la carta.
		* name: de tipo __string__ que representa el nombre de la carta.
		* tale: de tipo __string__ que representa una breve descripcion de la carta.
		* dmg: de tipo __integer__ que representa el daño base que tiene la carta.

	
---
* #### Market Place

	* Controlador: **MarketController**
	* Modelo: **Market**

		* **Explicación:**

			* En el mercado los jugadores podrán intercambiar cartas de sus cuentas con el progreso logrado de cada carta la experiencia, el nivel y el aspecto.

			* Vender sus cartas y crear una economía basada en la dificultad de conseguir ciertas cartas.

---
* #### Batallas entre jugadores

	* Controlador: **BattleController**
	* Modelo: **Battle**

		* **Explicación:**

			* Las batallas contra jugadores serán de corta duración, 3 cartas para cada jugador y la sabia elección del jugador decidira la batalla, cada jugador podrá ver las cartas de contrincante, sera por turnos: cuando un jugador seleccione la carta a jugar el contrincante podrá ver la jugada pero no la **Potencia** que el jugador esta otorgando a esa carta haciendo que la estrategia recaiga en este ultimo punto.

		* **Potencia:** el multiplicador de poder de la carta seleccionada, por ejemplo una carta tiene **2** de daño y se le añade **2** de potencia, ese **2** es multiplicado por **2** de potencia lo cual da como resultado un daño de **4** contra la carta del adversario, a cada jugador se le es otorgado 12 puntos de **Potencia** para ser gastado en las cartas como multiplicadores de daño, van disminuyendo a medida que se usan el numero de ellos.

		* Las batallas serán manejadas por Websockets para resultados instantáneos y sin recargar el website, serán manejadas por el controlador **BattleController** el cual llevara toda la carga de la lógica de las batallas.

		* Al momento de elegir una carta y su potencia en la jugada, entraran en batalla, el jugador que resulte perdedor en esa jugada se le reducirán sus __life poins__ igual al daño de la carta ganadora menos el daño de la carta perdedora, **Ejemplo:** la carta ganadora tiene **8** de daño en total y la carta perdedora tiene **6** de daño en total, al jugador que perdió la jugada se le reducirán **2** de sus __life points__.

		* La batalla puede terminar por que el jugador perdedor se quedo sin __life poins__ o por que se acabaron las cartas que jugar, en ese ultimo caso el jugador con mayor numero de __life points__ es el ganador.

		* Al terminar una batalla se le asigna experiencia a cada jugador, el jugador que resulte perdedor se le otorgara el 30% de la experiencia que obtenga el jugador que gane la batalla, también se le otorgara oro y experiencia a las cartas que se jugaron en la batalla.

		* #### Arena

			* Pueden apostarse oro o cartas en las batalla entre jugadores que quieran unirse a la arena y obtener mejores beneficios al ganar batallas, estas batallas en la arena no darán beneficios a los jugadores que resulten perdedores de una batalla.

				* Al apostar cartas, ambos jugadores deberán estar de acuerdo en jugar la batalla y ganar la carta del contrincante.

				* El oro apostado sera el mismo para ambos jugadores, se deberá disponer de la cantidad que se este apostando.

