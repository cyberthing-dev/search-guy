import fs from 'fs';

class Database {
    filename: string;
    data: {
        [key: string]: any;
    };
    autoSaveTimer = setInterval(() => {
        try { this.saveData(); }
        catch (err) { console.log(`Error when autosave: ${err}`); }
    }, 30000);;

    constructor(filename: string) {
        this.filename = filename;
        this.data = {};
    }

    loadData() {
        if (fs.existsSync(this.filename))
            this.data = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
    }

    saveData() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data), 'utf8');
    }

    stopAutoSave() {
        clearInterval(this.autoSaveTimer);
    }
}

export { Database };
