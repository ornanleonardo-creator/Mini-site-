// Configuration simple
const AdminConfig = {
    // Paramètres de base
    siteName: "Mon Site",
    adminEmail: "admin@monsite.com",
    
    // Utilisateurs autorisés
    users: [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "editor", password: "edit123", role: "editor" }
    ],
    
    // Permissions par rôle
    permissions: {
        admin: ["*"], // Tout
        editor: ["articles.create", "articles.edit", "comments.moderate"]
    },
    
    // Fonctions utilitaires
    checkPermission: function(role, action) {
        if (this.permissions[role].includes("*")) return true;
        return this.permissions[role].includes(action);
    },
    
    // Sauvegarde simple
    backup: function() {
        const data = {
            articles: JSON.parse(localStorage.getItem('articles') || '[]'),
            settings: JSON.parse(localStorage.getItem('settings') || '{}'),
            date: new Date().toISOString()
        };
        
        // Crée un fichier de sauvegarde téléchargeable
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        return "Sauvegarde créée avec succès !";
    }
};
