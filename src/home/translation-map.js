export const TEXT_MAP = {
	en: {
		heading: {
			formula: 'Chemical Formula Parameters',
			lattice: 'Lattice Parameters',
			journal: 'Journal Parameters',
			additional: 'Additional Parameters',
			filters: 'Filters'
		},
		menu: {
			heading: 'Search Parameters',
			button: {
				formula: 'Formula',
				lattice: 'Lattice',
				journal: 'Journal',
				additional: 'Additional',
				filters: 'Filters',
				reset: 'Reset',
				search: 'Search'
			}
		},
		processing: {
			text: 'Processing...'
		},
		validation: {
			error: {
				api: 'An error was encountered while retrieving the data!',
				noData: 'These search parameters did not return any data!',
				oneParameter: 'At least one search parameter must be used!'
			},
			labels: {
				chemicalFormula: 'Invalid chemical formula (Hill notation)',
				dateCannotExceedToday: 'Need today\'s date or earlier',
				doi: 'Invalid DOI format',
				elementPresentAbsentContradiction: 'One or more elements present is also set as absent',
				minCannotExceedMax: 'Minimum exceeds maximum',
				minDateCannotExceedMaxDate: 'Min date exceeds max date',
				positiveInteger: 'Need integer >= 1',
				positiveNumber: 'Need number > 0'
			},
			success: {
				downloaded: 'Your search data was downloaded!'
			}
		}
	},
	es: {
		heading: {
			formula: 'Parámetros de Fórmula Química',
			lattice: 'Parámetros de Red',
			journal: 'Parámetros de la Revista',
			additional: 'Parámetros Adicionales',
			filters: 'Filtros'
		},
		menu: {
			heading: 'Parámetros de Búsqueda',
			button: {
				formula: 'Fórmula',
				lattice: 'Enrejado',
				journal: 'Revista',
				additional: 'Adicional',
				filters: 'Filtros',
				reset: 'Reiniciar',
				search: 'Buscar'
			}
		},
		processing: {
			text: 'Procesando...'
		},
		validation: {
			error: {
				api: '¡Se encontró un error al recuperar los datos!',
				noData: '¡Estos parámetros de búsqueda no arrojaron ningún dato!',
				oneParameter: '¡Se debe utilizar al menos un parámetro de búsqueda!'
			},
			labels: {
				chemicalFormula: 'Fórmula química no válida (notación Hill)',
				dateCannotExceedToday: 'Necesita la fecha de hoy o antes',
				doi: 'Formato DOI no válido',
				elementPresentAbsentContradiction: 'Uno o más elementos presentes también se establecen como ausentes',
				minCannotExceedMax: 'Mínimo excede máximo',
				minDateCannotExceedMaxDate: 'La fecha mínima supera la fecha máxima',
				positiveInteger: 'Necesita un número entero >= 1',
				positiveNumber: 'Necesita número > 0'
			},
			success: {
				downloaded: '¡Tus datos de búsqueda fueron descargados!'
			}
		}
	},
	fr: {
		heading: {
			formula: 'Paramètres de Formule Chimique',
			lattice: 'Paramètres de Réseau',
			journal: 'Paramètres du Journal',
			additional: 'Paramètres Supplémentaires',
			filters: 'Filtres'
		},
		menu: {
			heading: 'Paramètres de Recherche',
			button: {
				formula: 'Formule',
				lattice: 'Réseau',
				journal: 'Journal',
				additional: 'Supplémentaire',
				filters: 'Filtres',
				reset: 'Réinitialiser',
				search: 'Recherche'
			}
		},
		processing: {
			text: 'Traitement...'
		},
		validation: {
			error: {
				api: 'Une erreur s\'est produite lors de la récupération des données!',
				noData: 'Ces paramètres de recherche n\'ont renvoyé aucune donnée!',
				oneParameter: 'Au moins un paramètre de recherche doit être utilisé!'
			},
			labels: {
				chemicalFormula: 'Formule chimique invalide (notation Hill)',
				dateCannotExceedToday: 'Besoin de la date d\'aujourd\'hui ou avant',
				doi: 'Format DOI invalide',
				elementPresentAbsentContradiction: 'Un ou plusieurs éléments présents sont également définis comme absents',
				minCannotExceedMax: 'Le minimum dépasse le maximum',
				minDateCannotExceedMaxDate: 'La date minimale dépasse la date maximale',
				positiveInteger: 'Besoin d\'un entier >= 1',
				positiveNumber: 'Besoin d\'un numéro > 0'
			},
			success: {
				downloaded: 'Vos données de recherche ont été téléchargées!'
			}
		}
	},
	it: {
		heading: {
			formula: 'Parametri delle Formule Chimiche',
			lattice: 'Parametri del Reticolo',
			journal: 'Parametri del Giornale',
			additional: 'Parametri Aggiuntivi',
			filters: 'Filtri'
		},
		menu: {
			heading: 'Parametri di Ricerca',
			button: {
				formula: 'Formule',
				lattice: 'Reticolo',
				journal: 'Giornale',
				additional: 'Ulteriori',
				filters: 'Filtri',
				reset: 'Ripristina',
				search: 'Ricerca'
			}
		},
		processing: {
			text: 'In Lavorazione...'
		},
		validation: {
			error: {
				api: 'Si è verificato un errore durante il recupero dei dati!',
				noData: 'Questi parametri di ricerca non hanno restituito alcun dato!',
				oneParameter: 'È necessario utilizzare almeno un parametro di ricerca!'
			},
			labels: {
				chemicalFormula: 'Formula chimica non valida (notazione Hill)',
				dateCannotExceedToday: 'È necessaria la data odierna o precedente',
				doi: 'Formato DOI non valido',
				elementPresentAbsentContradiction: 'Anche uno o più elementi presenti vengono impostati come assenti',
				minCannotExceedMax: 'Il minimo supera il massimo',
				minDateCannotExceedMaxDate: 'La data minima supera la data massima',
				positiveInteger: 'È necessario un numero intero >= 1',
				positiveNumber: 'È necessario un numero > 0'
			},
			success: {
				downloaded: 'I tuoi dati di ricerca sono stati scaricati!'
			}
		}
	}
};

export default TEXT_MAP;
