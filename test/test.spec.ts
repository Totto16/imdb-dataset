import assert from "assert"

import { TSVParser } from "../src"

function getFilePath(path: string): string {
    return `${__dirname}/files/${path}`
}

function isImdbId(str: string): boolean {
    return /tt(\d){7}/.test(str)
}

function isUndefinedOrNull(something: any): boolean {
    return something === null || something === undefined
}

describe("imdb dataset", () => {
    const lines = 8

    it("should parse the ratings dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("title.ratings.tsv"),
            type: "title.ratings",
        })

        let i = 0
        for await (const rating of parser) {
            assert(rating.tconst)
            assert(rating.averageRating)
            assert(rating.numVotes)

            assert.strictEqual(typeof rating.tconst, "string")
            assert(isImdbId(rating.tconst))
            assert.strictEqual(typeof rating.averageRating, "number")
            assert.strictEqual(typeof rating.numVotes, "number")
            assert(Number.isInteger(rating.numVotes))
            i++
        }

        assert.strictEqual(lines, i)
    })

    it("should parse the basics dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("title.basics.tsv"),
            type: "title.basics",
        })

        let i = 0
        for await (const basic of parser) {
            assert(basic.tconst)
            assert(basic.titleType)
            assert(basic.primaryTitle)
            assert(basic.originalTitle)
            assert(!isUndefinedOrNull(basic.isAdult))
            assert(basic.startYear)
            assert(basic.endYear !== undefined)
            assert(basic.runtimeMinutes !== undefined)
            assert(basic.genres)

            assert.strictEqual(typeof basic.tconst, "string")
            assert(isImdbId(basic.tconst))
            //TODO better tests here

            i++
        }

        assert.strictEqual(lines, i)
    })

    it("should parse the akas dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("title.akas.tsv"),
            type: "title.akas",
        })

        let i = 0
        for await (const alternate of parser) {
            assert(alternate.titleId)
            assert(alternate.ordering)
            //TODO better tests here

            i++
        }

        assert.strictEqual(lines, i)
    })

    it("should parse the crew dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("title.crew.tsv"),
            type: "title.crew",
        })

        let i = 0
        for await (const crew of parser) {
            assert(crew.tconst)
            //TODO better tests here

            i++
        }

        assert.strictEqual(lines, i)
    })

    it("should parse the episode dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("title.episode.tsv"),
            type: "title.episode",
        })

        let i = 0
        for await (const episode of parser) {
            assert(episode.tconst)
            assert(episode.parentTconst)
            //TODO better tests here

            i++
        }

        assert.strictEqual(lines, i)
    })

    it("should parse the principal dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("title.pricipals.tsv"),
            type: "title.principals",
        })

        let i = 0
        for await (const principal of parser) {
            assert(principal.tconst)
            assert(principal.ordering)
            assert(principal.nconst)
            //TODO better tests here

            i++
        }

        assert.strictEqual(lines, i)
    })

    it("should parse the name dataset", async () => {
        const parser = new TSVParser({
            filePath: getFilePath("name.basics.tsv"),
            type: "name.basics",
        })

        let i = 0
        for await (const principal of parser) {
            assert(principal.primaryName)
            assert(principal.birthYear)
            assert(principal.nconst)
            //TODO better tests here

            i++
        }

        assert.strictEqual(lines, i)
    })
})
