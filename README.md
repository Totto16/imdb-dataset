# imdb-dataset
Parse data coming from https://www.imdb.com/interfaces/

This library works only with .tsv files, it will read the file line by line and return a mapped object.

[List with types of objects](src/types.ts)

[List with parsers](src/columns.ts)

[List with tests](test/test.spec.ts)

Usage:
```typescript
import {
  TSVParser,
} from 'imdb-dataset';

const parser = new TSVParser({
  type:'title.ratings',
  filePath: './title.ratings.tsv',
});

async function test() {
  for await (const rating of parser) {
    // rating is automatically of type ITitleRating
    console.log(rating);
  }
}

test().catch(console.log);
```
