module.exports = {
    middlewareA: (req, res, next) => {
        console.log("Passando pela Middleare A")
        next()
    },

    middlewareB: (req, res, next) => {
        console.log("Passando pela Middleare B")
        next()
    }

    
        
}
