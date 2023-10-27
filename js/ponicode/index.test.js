const rewire = require("rewire")
const index = rewire("../index")
const vremeIsporuke = index.__get__("vremeIsporuke")
// @ponicode
describe("vremeIsporuke", () => {
    test("0", () => {
        let result = vremeIsporuke("Spectacled Caiman", "Saltwater Crocodile")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = vremeIsporuke("Saltwater Crocodile", "Spectacled Caiman")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = vremeIsporuke("Nile Crocodile", "Spectacled Caiman")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = vremeIsporuke("Saltwater Crocodile", "Nile Crocodile")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = vremeIsporuke("Dwarf Crocodile", "Dwarf Crocodile")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = vremeIsporuke("", "")
        expect(result).toMatchSnapshot()
    })
})
