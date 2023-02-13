import { getCols } from "./util"
import { IMappedTypes } from "./types"
import { AvailableInterfaces } from "./columns"

export class Model<T extends AvailableInterfaces> {
    private readonly _mappedType: IMappedTypes<T>

    constructor(mappedType: IMappedTypes<T>) {
        this._mappedType = mappedType
    }

    parseLine(line: string): T {
        const cols = getCols(line)

        const parsedLine: Partial<T> = {}
        const order = this._mappedType.order
        if (order.length !== Object.keys(this._mappedType.declaration).length) {
            throw new Error(
                `The Map Definition is incorrect, oder and the keys of the declaration object have not the same length!`
            )
        }
        for (let i = 0; i < order.length; ++i) {
            const columnName = order[i]
            const parserFn = this._mappedType.declaration[columnName]
            try {
                const value = (parsedLine[columnName] = parserFn(cols[i]))
                parsedLine[columnName] = value
            } catch (e) {
                throw new Error(
                    `Error in parsing ${columnName as string}: ${
                        (e as Error).message
                    }`
                )
            }
        }

        return parsedLine as T
    }
}
