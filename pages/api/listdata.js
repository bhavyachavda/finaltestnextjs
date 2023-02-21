import con from "../../Model/db";

export default async function handler(req, res) {
   switch (req.method) { 
       case 'GET':
        try{   
             let query=`select * from users19 where isactive=1`;
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
                  const query=`select * from users19 where isactive=1"` 
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