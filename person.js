function Person(first, last, age, gender, interests){
    this.name = {
        'first': first,
        'last': last
    }
    this.age= age
    this.gender = gender
    this.interests = interests
    this.bio = function() {
         return this.name.first
    }
    this.greeting = function() {
        console.log('hi' + this.name + "")
    }
}

const person1 = new Person('stano', 'njenga', 11, 'male', 'reading')
const person2 = Object.create(person1)
console.log(person2.__proto__)
const getBooksbyID  = (author) => {
  return author
}



const getBooks =  (title, description, callback => {
    callback(getBooksbyID)
})