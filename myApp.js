require('dotenv').config();
const { Schema } = require('mongoose');
var mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new Schema( {
  name:{type:String, required:true},
  age:{type:Number  },
  favoriteFoods:[{type:String}]
});


const Person =  mongoose.model("Person", personSchema);

var arrayOfPeople = [
  new Person({
    name: "Jane Doe",
    age: 14,
    favoriteFoods: ["Chockolate","Watermelon"],
  }),
  new Person({
    name: "Johny Doe",
    age: 15,
    favoriteFoods: ["Chockolate","Watermelon"],
  }),
  new Person({
    name: "Johanna Doe",
    age: 16,
    favoriteFoods: ["Chockolate","Watermelon"],
  }), 
  new Person({
    name: "Joy Doe",
    age: 17,
    favoriteFoods: ["Chockolate","Watermelon", "Cookies"],
  })
]



const createAndSavePerson = (done) => {
  var johnDoe = new Person({
    name: "John Doe",
    age: 14,
    favoriteFoods: ["Chockolate","Watermelon"],
  });

  johnDoe.save((err,data) => {
    if(err) return err;
    return done(null , data );
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, (err,data) => {
    if(err) return err;
    return done(null , data );
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, result) => {
    if(err) return err;
    console.log("Result: ", result)
    done(null, result);
  }) 
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,result)=> {
    if(err) return err;
    console.log("Result: ", JSON.stringify(result))
    done(null, result);
  })
  
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,result) => {
    if(err) return err;
    console.log("Result: ", JSON.stringify(result))
    done(null, result);
  })
  
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,result) => {
    if(err) return err;
    result.favoriteFoods.push(foodToAdd)

    result.save((err,data)=> {
      if(err) return err;
      done(null , data)
    })
  } 
  )};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}, (err,result) => {
    if(err) return err
    done(null, result);  
  })  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,result) => {
    if(err) return err
    done(null, result);  
  })
 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, result) => {
    if(err) return err
    done(null, JSON.stringify(result))
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
