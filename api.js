const fs = require('fs');

class Api{

    constructor(app) {
        this.app = app;
        this.apiRoutes();
    }
    readDb(){
        let jsonDb = fs.readFileSync(__dirname + '/db/db.json', 'utf8');
        return JSON.parse(jsonDb);
    }

    writeDb(notes){

        fs.writeFileSync(__dirname + '/db/db.json',JSON.stringify(notes))
    }
    assignNewId(notes){
        let notesCopy = [...notes];
        let lastEntry = notesCopy.pop();
        let nextId = 1;ç
        if(typeof lastEntry !== 'undefined'){
          nextId = lastEntry.id + 1;
        }
        return nextId;
      }
    apiRoutes(){
        this.app.get('/api/notes', (req, res) => {
            let notes = this.readDb();
            res.send(notes)
        });
        this.app.post('/api/notes', (req, res) =>{
            let notes = this.readDb();
            req.body.id = this.assignNewId(notes);
            notes.push(req.body);
            this.writeDb(notes);
            res.send(req.body);
        });
        this.app.delete('/api/notes/:id', (req, res) =>{
            let notes = this.readDb();
            let newNotes = [];

            notes.forEach((note,i) =>{
                if(Number(note.id) !==  Number(req.params.id)){
                    newNotes.push(note);
                }
            });
            this.writeDb(newNotes);
            res.send(newNotes);
        })
    }
}
module.exports = Api;