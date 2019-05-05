const fs = require('fs');
const deflate = require('deflate-js');
const b64 = require('js-base64').Base64;


let decode = ()=>{
	fs.readFile('gamedata',(err,data)=>{
		if(err) return console.log(err);
		let temp = [...deflate.inflate(data)].slice(31).map(c=>String.fromCharCode(c)).join('');
		let str = b64.decode(temp);
		fs.writeFileSync('out',str);
	});
}
let encode = ()=>{
	fs.readFile('out',(err,data)=>{
		if(err) return console.log(err);
		let encoded = ("a".repeat(32) + b64.encode([...data].map(c=>String.fromCharCode(c)).join('')));
		let arr = deflate.deflate(new Buffer(encoded));
		fs.writeFileSync('newgamedata',new Buffer(arr));
	});
}
//decode()
encode();
