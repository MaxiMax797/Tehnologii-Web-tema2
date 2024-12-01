/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values){
    //cerinta 2
    if(!verifica(input, values))
    {
        throw new Error("InvalidType");
    }
    //cerinta 1
    if(Object.keys(input).length === 0)
    {
        return "";
    }
    //cerinta 5
    return Object.entries(input).map(([tag, content]) =>{
        if(typeof content === "object")
        {
            const content_nested = Object.entries(content)
            .map(([tag_nested, val_nested]) => render({ [tag_nested]: val_nested}, values))
            .join("");
            return `<${tag}>${content_nested}</${tag}>`;
        }

        const content_rendered = interpolaredeString(content, values);
        return `<${tag}>${content_rendered}</${tag}>`;
    })
    .join("");
}


//cerinta 3
//     const [tag, content] = Object.entries(input)[0];
//     return `<${tag}>${content}</${tag}>`;

//cerinta 4
//     if (!content.includes("${")) {return `<${tag}>${content}</${tag}>`};
    
//     const content_rendered = interpolaredeString(content, values);

//     return `<${tag}>${content_rendered}</${tag}>`;



// }

module.exports = {
    render
}


function verifica(param1, param2) {
    return (param1 instanceof Object && param2 instanceof Object);
        //&& typeof param1 == "object" && typeof param2 =="object");
    }
    // return (
    //     (typeof param1 === "object" && param1 !== null) || param1 instanceof Object
    // ) && (
    //     (typeof param2 === "object" && param2 !== null) || param2 instanceof Object
    // );
  // }

  function interpolaredeString(text, val)
  {
    return text.replace(/\$\{([a-zA-Z0-9_-]+)\}/g, (original, key) =>
    {
        if(val.hasOwnProperty(key)){
            return val[key];
        }
        else{
            throw new Error(`Lipseste valoarea de la token-ul: ${key}`);
        }
    });
  }


//exemple
console.log(render({ title: 'Hello, world!' }, {}));
console.log(render({ salut: 'Salut ${nume}' }, { nume: 'Victor' }));
console.log(render({
    html: {
        body: {
            h1: 'Welcome ${user}',
            p: 'This is a ${adjectiv} day!'
        }
    }
}, { user: 'Anton', adjectiv: 'sunny' }));
console.log(render({ container: {} }, {}));
console.log(render({
    root: {
        level1: {
            level2: {
                level3: 'Final ${key}'
            }
        }
    }
}, { key: 'Value' }));
console.log(render({ mixat: 'Hello ${firstn} ${lastn}!' }, { firstn: 'Ion', lastn: 'Popescu' }));
console.log(render({
    title: '${comun}',
    body: 'Informatii despre ${comun}'
}, { comun: 'carti' }));