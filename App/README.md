# App

Tarea a realizar:

	recolección de datos

		node app.js ACCION TIPO AÑO

		ACCION: SCRAP	extracción de los datos de orien y guardado de textos para su porterior PARSER
				PARSER	obtención de las tablas definitivas desde ld DB de textos (en construcción)

		TIPO:	BOE		boletin oficial del estado
				BORME	boletin del registro mercantil
				BOCM	boletin de la comunidad de madrid
		
	ejemplos
		
		node app.js SCRAP BOE 	2001		-> recolección de datos del BOE el año	2001
		node app.js SCRAP BORME	2009		-> recolección de datos del BORME al año 2009
		node app.js SCRAP BOCM	2010		-> recolección de datos del BOCM al año 2010

	existen unos años iniciales
		Mins: { BOE: 2001, BOCM: 2010, BORME: 2009 },
	
	Se pueden lanzar simultaneamente distintos años y distintos tipos

	Puedes usar el script scraping.sh para lanzarlos todos.
