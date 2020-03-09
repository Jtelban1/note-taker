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
    apiRoutes(){
        this.app.get('/api/notes', (req, res) => {
            let notes = this.readDb();
            console.log(notes);
            res.send(notes)
        });
        this.app.post('/api/notes', (req, res) =>{
            let notes = this.readDb();
            notes.push(req.body);
            this.writeDb(notes);
            res.send(req.body);
        });
        this.app.delete('/api/notes/:id', (req, res) =>{
            let notes = this.readDb();
          
            notes.forEach((note,i) =>{
              if(note.id ===  req.params.id){
                notes.splice(i,1);
              }
            });
            this.writeDb(notes);
            res.send(req.body);
          })
        
    }
}
module.exports = Api;