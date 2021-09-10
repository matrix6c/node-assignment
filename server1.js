const {createServer} = require('http')
const PORT = 80
const fs = require('fs')


fs.writeFile('index.html',`<h1>This is my index page </h1>
<p>welcome to this page</p>`, (error, data) => {
    if(error){ 
        console.log('Error occured')
    }
    console.log('creation of file successful')
})


const requestListener = (req, res) =>{
    let {url} = req

    switch(url){
        case '/':
            res.statusCode = 200
            //READING THE CONTENT OF A FILE
            fs.readFile(`index.html`,(error, response) =>{
                if(error) {
                    res.writeHead(200, {'content-Type' : 'text/plain'})
                    res.write('Error 500 : Internal server Error')
                    res.end()
                }else{
                    res.writeHead(200, {'content-Type' : 'text/html'})
                    res.write(response)
                    res.end()
                }  
            })
            break;
        case '/contact':
            res.writeHead(500, {'content-Type' : 'text/html'})
            res.write('<h1>This is my coutact us page </h1><p>wlecome to contact us</p>')
            res.end()
            break;
        default:
            res.statusCode = 404
            res.setHeader('content-Type', 'text/html')
            res.write('<h1>Error 404</h1>')
            res.write('<p>return to home</p>')
            res.end()        
    }
}



/**
 * Create a web server that does the following
 * 1. listens on port 80
 * 2. Handles request to the root of the application by serving an index.html file
 * 3.Handles request that hits the contact-is route by sending "welcome to contact us"
 */



createServer(requestListener)
.listen(PORT, () => console.log(`your request is listening on host: ${PORT}`))