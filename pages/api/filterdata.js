import con from "../../Model/db";

export default async function handler(req, res) {
   switch (req.method) { 
       case 'GET':
        try{   
             let query=`select * from users19`;
                  const ans= await con.queryRunner(query);   
              res.send(ans);  
           } 
       catch(err){    
                  console.log(err)     
               }      
               break;  
          case 'POST':   
           try{ 
              const id = req.body.id;  
                  console.log(id)    
                  const query=`select * from users19 where code="${id}"` 
                           // console.log(results);      
                  res.send(ans);      
                  } 
          catch(err){    
                      console.log(err)   
                   }    
                   break;
                     default:   
                     res.status(405).end(`Method ${method} Not Allowed`); 
                       break; 
  }
}


// app.get("/filterdata", async(req,res) => {
//     try{
//         const searchvalue = req.query.searchdata;
//         const hobbies = req.query.hobbies;
//         const gender = req.query.gender;
//         console.log(req.query);
//         const dispstatus = req.query.dispstatus;
//         let sqlquery = ``;
//         if(searchvalue != "" && searchvalue)
//           { sqlquery = sqlquery + ` where code like "%${searchvalue}%" or firstname like "%${searchvalue}%" or lastname like "%${searchvalue}%" or email like "%${searchvalue}%"`}
//         if(hobbies != "" && hobbies)
//         {
//           if(sqlquery=="")
//           { sqlquery = sqlquery + ` where hobbies like "%${hobbies}%"` }
//           else
//           { sqlquery = sqlquery + ` and hobbies like "%${hobbies}%" ` }
//         }
//         if(gender != "" && gender)
//         { 
//           if(sqlquery=="")
//           { sqlquery = sqlquery + ` where gender = "${gender}" `}
//           else
//           { sqlquery = sqlquery + ` and gender = "${gender}" ` } 
//         } 
//         if(dispstatus != "" && dispstatus) 
//         {
//           if(sqlquery=="")
//           { sqlquery = sqlquery + ` where isactive = "${dispstatus}" `}
//           else
//           { sqlquery = sqlquery + ` and isactive = "${dispstatus}" ` } 
//         }
//         let sqlquery2 = `select * from users19 `+sqlquery;
//          console.log(sqlquery2) 
//         //  const ans = await queryRunner(sqlquery2); 
//         //  res.status(200).send(ans); 
//          console.log(sqlquery2);
//          con.query(sqlquery2,(err,result)=>{
//           if (err) throw err;
//           res.json(result);
//          })
//       } 
//       catch(err)
//       {
//         res.status(400).send(err); 
//         console.log(err); 
//       }
//     } )