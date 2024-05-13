const arto = {
    name : 'Daniel',
    age : 23,
    growOlder: function(){this.age += 1}
}

arto.education = 'PhD'

console.log(arto.age)
arto.growOlder()
console.log(arto.age)
console.log(arto)

