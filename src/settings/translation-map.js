export const LANGUAGES = {
    en: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'it', label: 'Italian' }
    ],
    es: [
        { value: 'en', label: 'Inglés' },
        { value: 'es', label: 'Español' },
        { value: 'fr', label: 'Francés' },
        { value: 'it', label: 'Italiano' }
    ],
    fr: [
        { value: 'en', label: 'Anglais' },
        { value: 'es', label: 'Espagnol' },
        { value: 'fr', label: 'Français' },
        { value: 'it', label: 'Italien' }
    ],
    it: [
        { value: 'en', label: 'Inglese' },
        { value: 'es', label: 'Spagnolo' },
        { value: 'fr', label: 'Francese' },
        { value: 'it', label: 'Italiano' }
    ]
};

export const TEXT_MAP = {
    en: {
        about: {
            dvp: 'About DVP',
            cod: 'About COD'
        },
        heading: 'Settings',
        label: {
            languageUsed: 'Language Used',
            filenameModifier: 'Custom filename modifier (letters/numbers/underscore)'
        },
        button: 'Update',
        switch: '.cif Mode',
        storageEvent: {
            success: 'Your updated settings have been saved',
            fail: 'No update was made'
        },
        noStorage: 'Local storage is not supported by this browser.'
    },
    es: {
        about: {
            dvp: 'Acerca de DVP',
            cod: 'Acerca de COD'
        },
        heading: 'Ajustes',
        label: {
            languageUsed: 'Idioma Usado',
            filenameModifier: 'Modificador de nombre de archivo personalizado (letras/números/guion bajo)'
        },
        button: 'Actualizar',
        switch: 'Modo .cif',
        storageEvent: {
            success: 'Tus configuraciones actualizadas han sido guardadas',
            fail: 'No se realizó ninguna actualización'
        },
        noStorage: 'El almacenamiento local no es compatible con este navegador.'
    },
    fr: {
        about: {
            dvp: 'À propos DVP',
            cod: 'À propos COD'
        },
        heading: 'Paramètres',
        label: {
            languageUsed: 'Langue Utilisée',
            filenameModifier: 'Modificateur de nom de fichier personnalisé (lettres/chiffres/trait de soulignement)'
        },
        button: 'Mettre à Jour',
        switch: 'Mode .cif',
        storageEvent: {
            success: 'Vos paramètres mis à jour ont été enregistrés',
            fail: 'Aucune mise à jour n\'a été effectuée'
        },
        noStorage: 'Le stockage local n\'est pas pris en charge par ce navigateur.'
    },
    it: {
        about: {
            dvp: 'Di DVP',
            cod: 'Di COD'
        },
        heading: 'Impostazioni',
        label: {
            languageUsed: 'Lingua Utilizzata',
            filenameModifier: 'Modificatore nome file personalizzato (lettere/numeri/trattino basso)'
        },
        button: 'Aggiornare',
        switch: 'Modalità .cif',
        storageEvent: {
            success: 'Le tue impostazioni aggiornate sono state salvate',
            fail: 'Non è stato effettuato alcun aggiornamento'
        },
        noStorage: 'L\'archiviazone locale non è supportate da questo browser.'
    }
};

export const LANGUAGE_INFO = {
    LANGUAGES,
    TEXT_MAP
};

export default LANGUAGE_INFO;
