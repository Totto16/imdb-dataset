# imdb-dataset
Parse data coming from https://www.imdb.com/interfaces/

This library works only with .tsv files, it will read the file line by line and return a mapped object.

[List with types of objects](src/types.ts)

[List with parsers](src/columns.ts)

[List with parsers](test/test.spec.ts)

Usage:
```javascript
import {
  TSVParser,
} from 'imdb-dataset';

const parser = new TSVParser({
  type:'title.basics',
  filePath: './title.basics.tsv',
});

async function test() {
  for await (const rating of parser) {
    console.log(rating);
  }
}

test().catch(console.log);
```
