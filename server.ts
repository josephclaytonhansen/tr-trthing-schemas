import express from 'express'
import Person from './things/person/person'

const app = express()
const port = 3000

app.get('/person', (req, res) => {
    let returns:any = {}
    try{
        const person = new Person('1', 'avatar')
        let details = person.get('details')
        details.name = 'John Doe'
        details.age = 24
        returns.person2 = person.json()
        returns.undo = person.undo()
        returns.person3 = new Person('3', 'npc').json()
        const secondPerson = new Person('2', 'enemy')
        returns.person4 = secondPerson.json()
        returns.bake = secondPerson.bake('sixteencharacter')
        returns.unbake = secondPerson.unbake(returns.bake, 'sixteencharacter')
    }

    catch (e) {
        console.log(e)
    }
    res.send(returns)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})