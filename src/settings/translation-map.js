export const LANGUAGES = {
    de: [
        { value: 'en', label: 'Englisch' },
        { value: 'fr', label: 'Französisch' },
        { value: 'de', label: 'Deutsch' },
        { value: 'it', label: 'Italienisch' },
        { value: 'ru', label: 'Russisch' },
        { value: 'es', label: 'Spanisch' }
    ],
    en: [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'it', label: 'Italian' },
        { value: 'ru', label: 'Russian' },
        { value: 'es', label: 'Spanish' }
    ],
    es: [
        { value: 'de', label: 'Alemán' },
        { value: 'en', label: 'Inglés' },
        { value: 'es', label: 'Español' },
        { value: 'fr', label: 'Francés' },
        { value: 'it', label: 'Italiano' },
        { value: 'ru', label: 'Ruso' }
    ],
    fr: [
        { value: 'de', label: 'Allemand' },
        { value: 'en', label: 'Anglais' },
        { value: 'es', label: 'Espagnol' },
        { value: 'fr', label: 'Français' },
        { value: 'it', label: 'Italien' },
        { value: 'ru', label: 'Russe' }
    ],
    it: [
        { value: 'de', label: 'Tedesco' },
        { value: 'en', label: 'Inglese' },
        { value: 'es', label: 'Spagnolo' },
        { value: 'fr', label: 'Francese' },
        { value: 'it', label: 'Italiano' },
        { value: 'ru', label: 'Russo' }
    ],
    ru: [
        { value: 'en', label: 'Английский' },
        { value: 'fr', label: 'Французский' },
        { value: 'de', label: 'Немецкий' },
        { value: 'it', label: 'Итальянский' },
        { value: 'ru', label: 'Русский' },
        { value: 'es', label: 'испанский' }
    ],
};

export const TEXT_MAP = {
    de: {
        about: {
            dvp: 'Über David',
            cod: 'Über COD'
        },
        heading: 'Einstellungen',
        label: {
            languageUsed: 'Verwendete Sprache',
            filenameModifier: 'Benutzerdefinierter Dateinamenmodifikator (Buchstaben/Zahlen/Unterstrich)',
        },
        button: 'Aktualisieren',
        switch: '.cif-Modus',
        storageEvent: {
            success: 'Ihre aktualisierten Einstellungen wurden gespeichert',
            fail: 'Es wurde kein Update durchgeführt'
        },
        noStorage: 'Lokale Speicherung wird von diesem Browser nicht unterstützt.'
    },
    en: {
        about: {
            dvp: 'About David',
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
            dvp: 'Acerca de David',
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
            dvp: 'À propos David',
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
            dvp: 'Di David',
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
    },
    ru: {
        about: {
            dvp: 'О Дэвиде',
            cod: 'О COD'
        },
        heading: 'Настройки',
        label: {
            languageUsed: 'Используемый язык',
            filenameModifier: 'Пользовательский модификатор имени файла (буквы/цифры/подчеркивание)'
        },
        button: 'Обновлять',
        switch: 'Режим .cif',
        storageEvent: {
            success: 'Обновленные настройки сохранены.',
            fail: 'Обновление не было сделано'
        },
        noStorage: 'Локальное хранилище не поддерживается этим браузером.'
    }
};

export const LANGUAGE_INFO = {
    LANGUAGES,
    TEXT_MAP
};

export default LANGUAGE_INFO;
