const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json());

let movieList = []

app.get('/movie', (req, res) => {
    res.send(movieList)
})

app.get('/movie/:id', (req, res) => {
    const imdbID = req.params.id
    if(imdbID){
        res.send(movieList.find(movie => movie.imdbID === imdbID))
    }
})

app.get('/movie', (req, res) => {
    const name = req.query.name
    if(name){
        res.send(movieList.find(movie => movie.Title === name))
    }
})

app.post('/movie', (req, res) => {
    const title = req.body.Title
    const year = req.body.Year
    const imdbID =  req.body.imdbID
    const type = req.body.Type
    const poster = req.body.Poster
    const newMovie = {'Title': title, 'Year': year, 'imdbID' : imdbID, 'Type': type, 'Poster': poster}
    movieList.push(newMovie)
    res.send(newMovie)
})

app.delete('/movie', (req, res) => {
    const id = req.query.id
    let del = {}
    movieList = movieList.filter(movie => {
        if(movie.imdbID === id){
            del = movie
        }
        return movie.imdbID !== id
    })
    res.send(del)
})

app.put('/movie/:id', (req, res) => {
    const id = req.params.id
    const upTitle = req.body.Title
    const upYear = req.body.Year
    const upImdbID =  req.body.imdbID
    const upType = req.body.Type
    const upPoster = req.body.Poster
    let edited = {}
    movieList.forEach(movie => {
        if(movie.imdbID === id){
            if(upTitle){                
                movie.Title = upTitle
            }
            if(upYear){
                movie.Year = upYear
            }
            if(upImdbID){
                movie.imdbID = upImdbID
            }
            if(upType){
                movie.Type = upType
            }
            if(upPoster){
                movie.upPoster = upPoster
            }
            edited = movie
        }
    })
    res.send(edited)
})

app.listen(port, () => {
    try{
        const jsonString = fs.readFileSync('./public/movies.json', 'utf8')
        movieList = JSON.parse(jsonString)
        // console.log(typeof movieList)
    }
    catch (error){
        console.error('Error reading file: ', error)
    }
})

process.on('SIGINT', () => {
    fs.writeFileSync('./public/movies.json', JSON.stringify(movieList, null, 2))
    console.log(JSON.stringify(movieList))
    console.log('writing to movies.json')
    process.exit()
})