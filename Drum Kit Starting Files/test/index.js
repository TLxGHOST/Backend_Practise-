
import { writeFile, readFile } from "node:fs";
import {randomSuperhero} from 'superheroes';




const data = "I am "+randomSuperhero()+" !!";
writeFile('read.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
  readFile('read.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
});




