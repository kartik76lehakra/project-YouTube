/* 
when we use database everytime we have to talk to DB and we have to use try,catch (OR Promises) to see if working properly or not so
we have to write try catch code every time to avoid that we are writing this function
*/


const asyncHandler = (requesthandler)=>{

    (req,res,nex)=>{
        Promise.resolve(requesthandler(req,res,next)).
        catch((err)=>next(err))
    }
}


export {asyncHandler}









//const asyncHandler = ()=>{}

// this is same as const asyncHandler = (fn)=>{async()=>{}}    we just removed the {} we are passing the function in to further function
/*
const asyncHandler = (fn)=> async(req,res,next)=>{

    try {
        await fn(req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({
            success:false,
            message: err.message
        })
    }

} 

*/



