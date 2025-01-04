import express from "express" ;

const handler = (controller) =>{
    return (req , res) => {
        const payload = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {}),
            userId: req.userId, 
        };
        controller(payload)
            .then(async(result) => {
                if (result.data && result.data.redirectUrl) {
                    return res.redirect(result.data.redirectUrl) ; 
                }
                res.status(result.statusCode).json(result) ;
            })
            .catch(async(error) => {
                res.status(error.statusCode || 500 ).json(error) ;
            }) ;
    } ;
} ;


export async function expressStartup(app) {

    app.use(express.json()) ;
    app.get( "/" , (req, res) => {
        res.send("This is test project Backend") ;
    } );
}



